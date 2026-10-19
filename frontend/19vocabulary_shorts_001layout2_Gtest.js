const PAGE_TITLE_MAIN = "시사 영단어";
/** 제목(부제) — 줄별로 수정. [단어]는 주황 강조 */
const PAGE_TITLE_SUB_LINE1 = "비행기 소란 승객 ";
const PAGE_TITLE_SUB_LINE2 =  "좌석에 테이프로 묶여";
/** 제목 바로 아래: (출판사 | 날짜) */
const PAGE_TITLE_PUBLISHER = "CNN";
const PAGE_TITLE_DATE = "2026/09/05";
/** 부제 최대 글자 크기 (autofit이 이 값 이하로 맞춤) */
const PAGE_TITLE_SUB_FONT_PX = 34;


// "[트럼프 대통령], 암살 피하려 기내식 [트럭에 숨어] 군용기 갈아타";
// const PAGE_TITLE_META = "(BBC / WSJ | 2026/08/11)";
// const PAGE_TITLE_MAIN = "신문기사에서 배우는 어휘";
// /** 제목(부제) — `[단어]`는 주황 강조 (대괄호는 화면에서 제거) */
// const PAGE_TITLE_SUB =
//   "25,000달러의 피해를 입힌 [‘배심원 소환’ 사기 극]";
// const PAGE_TITLE_META = "(The Wall Street Journal | 2026/08/08)";



function escapeTitleHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `[강조할 단어]` → title-hl span (대괄호는 화면에서 제거) */
function formatTitleLineMarks(text) {
  const raw = String(text || "");
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const open = raw.indexOf("[", i);
    if (open < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf("]", open + 1);
    if (close < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    out += escapeTitleHtml(raw.slice(i, open));
    const marked = raw.slice(open + 1, close);
    out += `<span class="title-hl">${escapeTitleHtml(marked)}</span>`;
    i = close + 1;
  }
  return out;
}

function buildPageTitleMeta() {
  const publisher = String(PAGE_TITLE_PUBLISHER || "").trim();
  const date = String(PAGE_TITLE_DATE || "").trim();
  if (!publisher && !date) return "";
  if (publisher && date) return `(${publisher} | ${date})`;
  return `(${publisher || date})`;
}

function buildPageTitleHtml() {
  const line1 = formatTitleLineMarks(PAGE_TITLE_SUB_LINE1);
  const line2 = formatTitleLineMarks(PAGE_TITLE_SUB_LINE2);
  const meta = buildPageTitleMeta();
  const subHtml = String(PAGE_TITLE_SUB_LINE2 || "").trim()
    ? `<span class="title-line">${line1}</span><span class="title-line">${line2}</span>`
    : `<span class="title-line">${line1}</span>`;
  const metaHtml = meta ? `<span class="title-meta">${meta}</span>` : "";
  return `<span class="title-main">${PAGE_TITLE_MAIN}</span>
<span class="title-sub-box" aria-hidden="false">
  <span class="title-accent title-sub">${subHtml}</span>
</span>${metaHtml}
<span class="progress-wrap" aria-live="polite">
  <span class="progress-label" id="progress-label">진행도 0 / 5</span>
  <span class="progress-track">
    <span class="progress-fill" id="progress-fill">
      <span class="progress-runner" id="progress-runner" data-motion="scooter" aria-hidden="true">🛵</span>
      <span class="progress-pct" id="progress-pct">0%</span>
    </span>
  </span>
</span>`;
}

/** 상자 폭에 맞춰 부제 글자 크기 autofit (최대 PAGE_TITLE_SUB_FONT_PX) */
function fitTitleSubToBox() {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  if (!box || !sub) return;

  const lines = Array.from(sub.querySelectorAll(".title-line"));
  if (!lines.length) return;

  const maxPx = Math.max(
    10,
    Number(PAGE_TITLE_SUB_FONT_PX) ||
      Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-max-size")) ||
      34
  );
  const minPx =
    Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-min-size")) || 15;
  box.style.setProperty("--title-sub-max-size", String(maxPx));

  const fits = (el, size) => {
    el.style.fontSize = `${size}px`;
    void el.offsetWidth;
    return el.scrollWidth <= box.clientWidth + 1;
  };

  sub.style.fontSize = `${maxPx}px`;
  lines.forEach((line) => {
    let lo = minPx;
    let hi = maxPx;
    let best = minPx;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (fits(line, mid)) {
        best = mid;
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }
    // 라임(#adff2f)이 주황 강조보다 얇아 보여, 강조 없는 줄은 +3px
    const optical = line.querySelector(".title-hl") ? 0 : 3;
    line.style.fontSize = `${best + optical}px`;
  });
}

function applyPageTitle() {
  if (!pageTitleEl) return;
  pageTitleEl.innerHTML = buildPageTitleHtml();
  requestAnimationFrame(() => {
    fitTitleSubToBox();
    requestAnimationFrame(fitTitleSubToBox);
  });
}

const VISIBLE_COUNT = 9;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** 진행 바 테마 — bar마다 이모지 1개, autoplay마다 랜덤 */
const PROGRESS_BAR_THEMES = [
  {
    id: "scooter",
    stages: [
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"]
    ]
  },
  {
    id: "car",
    stages: [
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"]
    ]
  },
  {
    id: "train",
    stages: [
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"]
    ]
  },
  
];
let activeProgressBarTheme = PROGRESS_BAR_THEMES[0];

// ============================================================
// 패스 / BGM (json1 바로 위 — 여기서 수동 조정)
//   EN_KO_PASS_COUNT:
//     1 = 1패스(한글→영어)만 하고 바로 Review 퀴즈
//     2 = 1패스 후 2패스(영어→한글)까지 하고 퀴즈
//   BGM_ENABLED: false=음악 끔 / true=켬
//   BGM_START_SEC: 초 단위.  80=1:20  90=1:30  100=1:40  110=1:50
//   null 이면 예문 수 자동 (6개→1:20, 1개 늘면 -10초 / 줄면 +10초)
// ============================================================
const EN_KO_PASS_COUNT = 1; // ← 1=퀴즈 바로 / 2=2패스까지
const BGM_ENABLED = false; // ← false=끔 / true=켬
const BGM_START_SEC = 95; // ← 현재 시작: 1:20 (80초)
const BGM_AUTO_BASE_WORDS = 6;
const BGM_AUTO_BASE_SEC = 80; // 1:20 @ 6단어
const BGM_AUTO_SEC_PER_WORD = 10;

///영어만 읽는 버젼.
// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
// EN 단어 발음 반복 (단어마다 지정):
//   "enRepeat": 2              → 정상 속도로 2번 (배너: ×2 → ×1 → 숨김)
//   "enRepeat": 5              → 5번 (배너: ×5 → … → ×1 → 숨김)
//   "enSpeakRates": [1, 0.85]  → 1번 + 느리게 1번 (배열 길이 = 횟수)
//   "enTts": "in-RICH"         → 화면 en과 다르게 읽기 (강세 교정 등)
// cf 추가 밑줄 (단어 en 자동 밑줄과 별도):
//   "cfUnderline": "has been thrust upon"
//   "cfUnderline": ["has been thrust upon", "thrust upon"]
// 단어 전환 swipe (없으면 단어마다 랜덤):
//   "swipe": "swipe-up" | "flip-h" | "flip-v" | "pop" | "zoom"
const json1 = 

[
  { "title1": "#기내에서 난동을 부린 승객을 덕트테이프로 제압해 비상착륙한 사건 기사에서 추출한 어휘입니다" },
  
  {
    "en": "restrain",
    "ko": "(물리력을 동원) 저지하다",
    "hint": "",
    "pronunciation": "리스트레인",
    "ipa": "/rɪˈstreɪn/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "A disruptive passenger was restrained with flexible handcuffs and duct-taped to a seat. (난동 승객(disruptive passenger)은 수갑으로 결박되었고(restrained), 좌석에 덕트테이프로 고정됐습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "act up",
    "ko": "(사람이) 말을 안 듣다",
    "hint": "",
    "pronunciation": "액트 업",
    "ipa": "/ækt ʌp/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "He had to quickly return “because the man started acting up again.” (그 남성이 다시 말썽을 부리기(acting up) 시작했기 때문에 그는 서둘러 돌아와야 했습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "belligerent",
    "ko": "적대적인, 공격적인",
    "hint": "",
    "pronunciation": "벌리저런트",
    "ipa": "/bəˈlɪdʒərənt/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "A man two rows behind them in the first-class section started to become belligerent. (일등석에서 그들보다 두 줄 뒤에 있던 한 남성이 점점 공격적인 태도(belligerent)를 보이기 시작했습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "agitate",
    "ko": "불안하게[동요하게] 만들다",
    "hint": "",
    "pronunciation": "애지테이트",
    "ipa": "/ˈædʒɪteɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The man got increasingly agitated, started to hit the passenger next to him and then hit a woman who tried to intervene. (그 남성은 점점 더 흥분했고(get agitated), 옆 승객을 때리기 시작한 뒤 말리려던(intervene) 여성까지 폭행했습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "profanity",
    "ko": "비속한[불경스런] 말",
    "hint": "",
    "pronunciation": "프러패너티",
    "ipa": "/prəˈfænəti/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "He was starting to become abusive and started using profanity,” Olenick said. (그는 폭력적으로(abustive) 변하기 시작하고 있었고, 욕설(profanity)도 사용하기 시작했다고 올레닉은 말했습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "lessen",
    "ko": "줄이다, 감소시키다",
    "hint": "",
    "pronunciation": "레슨",
    "ipa": "/ˈlesən/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Physically it lessened his ability to move for sure, but it did not solve the issue. (물리적으로 그의 움직임을 확실히 제한하긴 했지만(lessened), 문제 자체를 해결하지는 못했습니다)",
    "cf2": "",
    "image": ""
  },
  
];



// const REVIEW_QUIZ = [

//   {
//     // entrant(7) → entr___
//     en: "Alaska is a new West Coast ent____ in the competitive trans-Atlantic market.",
//     ko: "알래스카항공은 경쟁이 치열한 대서양 횡단 시장에 새롭게 진입한 서부 해안의 (기업)입니다.",
//     answer: "entrant",
//     answerKo: "새로 진입한 기업·참가자"
//   },

  

  
// ];


// const REVIEW_QUIZ = [

//   {
//     // ad nauseam → ad ______
//     en: "Stock markets, Wall Street-wary politicians and like-minded commentators repeat ad ______, are not the real economy.",
//     ko: "주식시장은 실물경제가 아니라는 말을 정치인과 논평가들이 (지겹도록 반복합니다).",
//     answer: "nauseam",
//     answerKo: "ad nauseam = 지겹도록 반복해서"
//   },
  
//   ];




const REVIEW_FADE_MS = 280;
const COUNTDOWN_SEC = 2;
const COUNTDOWN_MODES = ["pop", "ring", "bars"];
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;
const REVIEW_COUNTDOWN_TICK = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const REVIEW_PRE_COUNTDOWN_MS = 120;
const REVIEW_ANSWER_HOLD_MS = 700;
let countdownTickAudio = null;

const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
const wordFlashVideoEl = document.getElementById("word-flash-video");
let isAutoplayRunning = false;
let bgmAudio = null;
const ITEM_TRANSITION_MS = 300;
/** 위 단어: 흐릿하게 페이드 */
const ITEM_FADE_MS = 360;
/** 페이드 후 자리 접히며 아래가 올라옴 */
const ITEM_COLLAPSE_MS = 220;
/** 단어 전환 swipe — json1.swipe 없거나 "random"이면 단어마다 랜덤 */
const SWIPE_STYLE_IDS = ["swipe-up", "flip-h", "flip-v", "pop", "zoom"];
const SWIPE_STYLE_TIMING = {
  "swipe-up": { outMs: 320, collapseMs: 220 },
  "flip-h": { outMs: 280, collapseMs: 200 },
  "flip-v": { outMs: 280, collapseMs: 200 },
  pop: { outMs: 260, collapseMs: 200 },
  zoom: { outMs: 260, collapseMs: 190 }
};
/** 쇼츠 템포: 빈 대기만 줄임 (TTS·발음은 그대로) */
const SHORTS_INTRO_MS = 700;
const PASS_GAP_MS = 280;
const TTS_REPEAT_GAP_MS = 70;
/** 손글씨만 천천히 — 끝난 뒤 TTS */
const HAND_WRITE_MS_PER_LETTER = 170;
const HAND_WRITE_MS_MIN = 1100;
const HAND_WRITE_MS_MAX = 2800;
/** cf 노출 후 다음 단어로 넘어가기 전 대기 (ms) */
const CF_READ_PAUSE_MS = 3000;
/** cf 노출 후 핵심단어 mark 손그리기 시작까지 */
const CF_MARK_DELAY_MS = 300;
const CF_MARK_MS_PER_LETTER = 110;
const CF_MARK_MS_MIN = 800;
const CF_MARK_MS_MAX = 2200;
/** 발음·발음기호 착지 */
const PRON_HOLD_MS = 140;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_COLOR = "#2F3543";
const PAGE_BG_BASE_IMAGE = "resources/bgbg.jpeg";
const PAGE_BG_IMAGE = "resources/news.jpg";
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.02;
const WORD_FLASH_FADE_IN_MS = 280;
const WORD_FLASH_DISPLAY_MS = 480;
const WORD_FLASH_FADE_OUT_MS = 260;
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};
/** 영어 TTS: autoplay 시작 시 EN_TTS_VOICE_IDS 중 하나를 랜덤 선택 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Despina",
  2: "en-US-Chirp3-HD-Gacrux"
};
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[EN_TTS_VOICE];

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = voices[Math.floor(Math.random() * voices.length)];
  return activeEnTtsVoiceId;
}

function getTitleInfo(item) {
  if (!item || typeof item !== "object") return null;
  const key = Object.keys(item).find((k) => /^title\d+$/i.test(k));
  if (!key) return null;
  const num = parseInt(key.replace(/^title/i, ""), 10);
  return { key, num, text: String(item[key] || "").trim() };
}

function isTitleItem(item) {
  return getTitleInfo(item) !== null;
}

function isWordItem(item) {
  return Boolean(item && typeof item.en === "string");
}

function escapeRegExp(text) {
  return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 불규칙 과거·과거분사 (학습 단어 → cf에서 찾을 형태) */
const IRREGULAR_VERB_FORMS = {
  bring: ["brought"],
};

/** 단음절 CVC·VC 등 — 어미 자음 중복 (up→upping, run→running) */
function shouldDoubleFinalConsonant(lower) {
  const w = String(lower || "");
  if (!w || /e$/.test(w)) return false;
  if (!/[aeiou][^aeiouwxy]$/.test(w)) return false;
  if (/[aeiou]{2}[^aeiouwxy]$/.test(w)) return false;
  if (w.length === 2) return /^[aeiou][^aeiouwxy]$/.test(w);
  return /[^aeiou][aeiou][^aeiouwxy]$/.test(w);
}

function generateEnglishForms(word) {
  const forms = new Set();
  const w = String(word || "").trim();
  if (!w) return [];

  if (/\s/.test(w)) {
    const parts = w.split(/\s+/);
    const headForms = generateEnglishForms(parts[0]);
    const tail = parts.slice(1).join(" ");
    headForms.forEach((head) => forms.add(tail ? `${head} ${tail}` : head));
    return [...forms];
  }

  forms.add(w);
  const lower = w.toLowerCase();
  const double = shouldDoubleFinalConsonant(lower);

  if (/[sxz]$/.test(lower) || /[cs]h$/.test(lower)) {
    forms.add(`${w}es`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ies`);
  } else {
    forms.add(`${w}s`);
  }

  if (/ie$/.test(lower)) {
    forms.add(`${w.slice(0, -2)}ying`);
  } else if (/e$/.test(lower) && !/ee$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ing`);
  } else if (double) {
    forms.add(`${w}${w.slice(-1)}ing`);
  } else {
    forms.add(`${w}ing`);
  }

  (IRREGULAR_VERB_FORMS[lower] || []).forEach((form) => forms.add(form));

  if (/e$/.test(lower)) {
    forms.add(`${w}d`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ied`);
  } else if (double) {
    forms.add(`${w}${w.slice(-1)}ed`);
  } else {
    forms.add(`${w}ed`);
  }

  return [...forms];
}

/** en 표제어(활용형) — 세션당 mark1/10/12 중 하나만 사용 */
const CF_KEY_MARK_TYPES = ["mark1", "mark10", "mark12"];
let activeCfMarkType = null;
let prevCfMarkType = null;

/** 이미 <u>·<markN>…</> 된 구간은 건드리지 않고 나머지에만 mapper 적용 */
function mapCfTextOutsideTags(text, mapper) {
  const parts = String(text || "").split(/(<(?:u|mark\d+)>[\s\S]*?<\/(?:u|mark\d+)>)/gi);
  return parts
    .map((part) => (/^<(u|mark\d+)>/i.test(part) ? part : mapper(part)))
    .join("");
}

function pickSessionCfMarkType() {
  const pool = prevCfMarkType
    ? CF_KEY_MARK_TYPES.filter((m) => m !== prevCfMarkType)
    : CF_KEY_MARK_TYPES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** 한 번의 코드 진행(세션)에 쓸 cf 마킹 타입 지정. forceNew=true면 이전 세션과 다른 타입 */
function assignSessionCfMarkType(forceNew = false) {
  if (!forceNew && activeCfMarkType) return activeCfMarkType;
  if (forceNew && activeCfMarkType) prevCfMarkType = activeCfMarkType;
  activeCfMarkType = pickSessionCfMarkType();
  return activeCfMarkType;
}

/** en에 해당하는 cf 단어 1곳에만 세션 마킹 1개. cf에 en 없으면 그대로 반환 */
function applyCfWordMarks(cfText, targetWord) {
  const text = String(cfText || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  // 다단어 구(aisle access 등)는 활용형 확장 없이 구문 그대로 매칭
  let re;
  if (/\s/.test(target)) {
    const parts = target.split(/\s+/).map(escapeRegExp).filter(Boolean);
    if (!parts.length) return text;
    re = new RegExp(`\\b${parts.join("\\s+")}\\b`, "i");
  } else {
    const forms = generateEnglishForms(target)
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp);
    if (!forms.length) return text;
    re = new RegExp(`\\b(${forms.join("|")})\\b`, "i");
  }
  if (!re.test(text)) return text;

  const markType = activeCfMarkType || assignSessionCfMarkType();
  let marked = false;
  return mapCfTextOutsideTags(text, (chunk) =>
    chunk.replace(re, (match) => {
      if (marked) return match;
      marked = true;
      return `<${markType}>${match}</${markType}>`;
    })
  );
}

/** item.cfUnderline: 문자열 또는 문자열 배열 → 추가 밑줄 구문 목록 */
function getCfUnderlinePhrases(item) {
  const raw = item?.cfUnderline;
  if (Array.isArray(raw)) {
    return raw.map((s) => String(s || "").trim()).filter(Boolean);
  }
  const one = String(raw || "").trim();
  return one ? [one] : [];
}

/** 지정 구문(여러 단어 가능)을 긴 것부터 밑줄. 공백은 유연 매칭 */
function underlinePhrasesInCf(cfText, phrases) {
  let text = String(cfText || "");
  const sorted = [...(phrases || [])]
    .map((p) => String(p || "").trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  for (const phrase of sorted) {
    const parts = phrase.split(/\s+/).map(escapeRegExp).filter(Boolean);
    if (!parts.length) continue;
    const re = new RegExp(`\\b${parts.join("\\s+")}\\b`, "gi");
    text = mapCfTextOutsideTags(text, (chunk) =>
      chunk.replace(re, (match) => `<u>${match}</u>`)
    );
  }
  return text;
}

function underlineTargetInCf(cfText, targetWord) {
  const text = String(cfText || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  const forms = generateEnglishForms(target)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (!forms.length) return text;

  const re = new RegExp(`\\b(${forms.join("|")})\\b`, "gi");
  return mapCfTextOutsideTags(text, (chunk) =>
    chunk.replace(re, (match) => `<u>${match}</u>`)
  );
}

/** cfUnderline 구문 먼저 → 그다음 표제어(en) 형태 밑줄 */
function applyCfUnderlines(cfText, targetWord, extraPhrases) {
  const withPhrases = underlinePhrasesInCf(cfText, extraPhrases);
  return underlineTargetInCf(withPhrases, targetWord);
}

function wrapCfEnglishWords(innerHtml) {
  const temp = document.createElement("span");
  temp.innerHTML = String(innerHtml || "");
  const wrapTextNode = (node) => {
    const text = node.nodeValue;
    if (!text) return;
    const frag = document.createDocumentFragment();
    const tokens = text.split(/(\s+)/);
    for (const tok of tokens) {
      if (!tok) continue;
      if (/^\s+$/.test(tok) || !/[A-Za-z0-9]/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        continue;
      }
      const span = document.createElement("span");
      span.className = "cf-en-word";
      span.textContent = tok;
      frag.appendChild(span);
    }
    node.parentNode.replaceChild(frag, node);
  };
  const walk = (parent) => {
    Array.from(parent.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) wrapTextNode(n);
      else if (n.nodeType === Node.ELEMENT_NODE) walk(n);
    });
  };
  walk(temp);
  return temp.innerHTML;
}

/** cf 안 한글만 별도 span — 영어 크기는 유지하고 한글만 축소 */
function wrapCfKoreanText(html) {
  const temp = document.createElement("span");
  temp.innerHTML = String(html || "");
  const hangulRe = /[\uAC00-\uD7A3\u3131-\u318E]+/g;
  const wrapTextNode = (node) => {
    const text = node.nodeValue;
    if (!text || !/[\uAC00-\uD7A3\u3131-\u318E]/.test(text)) return;
    const frag = document.createDocumentFragment();
    let last = 0;
    hangulRe.lastIndex = 0;
    let m;
    while ((m = hangulRe.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement("span");
      span.className = "cf-ko";
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  };
  const walk = (parent) => {
    Array.from(parent.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) wrapTextNode(n);
      else if (n.nodeType === Node.ELEMENT_NODE && !n.classList.contains("cf-ko")) walk(n);
    });
  };
  walk(temp);
  return temp.innerHTML;
}

/** 괄호/* 안이 언론사·날짜 출처인지 */
function looksLikeCfSource(text) {
  const t = String(text || "").trim();
  if (!t) return false;
  if (/\d{4}\s*[\/.\-]/.test(t)) return true;
  if (/^(BBC|NPR|Time|WSJ|CNN|Reuters|AP|NYT|Yahoo|Economist|Slate|Guardian|FT|Forbes|Bloomberg|Politico|Axios|WaPo|Washington Post|LA Times|Los Angeles Times|NY Times|New York Times|The\s)/i.test(t)) {
    return true;
  }
  const words = t.split(/\s+/);
  return (
    words.length <= 4 &&
    t.length <= 40 &&
    words.every((w) => /^[A-Z0-9][A-Za-z0-9.&'-]*$/.test(w))
  );
}

/** 문장 / 출처 분리: "... (Economist)" 또는 "... *WSJ, 2026/08/11" */
function splitCfBodyAndSource(cfText) {
  const text = String(cfText || "").trim();
  if (!text) return { body: "", source: "" };
  const m = text.match(/^(.*?)\s*(?:\(([^)]+)\)|\*([^*\n]+))\s*$/);
  if (!m) return { body: text, source: "" };
  const candidate = String(m[2] || m[3] || "").trim();
  if (!looksLikeCfSource(candidate)) return { body: text, source: "" };
  return { body: String(m[1] || "").trim(), source: candidate };
}

/** 끝 괄호(중첩 포함) — 한글 번역 블록 분리용 */
function findTrailingTopLevelParen(text) {
  const s = String(text || "");
  const closeAt = s.lastIndexOf(")");
  if (closeAt === -1 || s.slice(closeAt + 1).trim()) return null;
  let depth = 0;
  for (let i = closeAt; i >= 0; i -= 1) {
    const ch = s[i];
    if (ch === ")") depth += 1;
    else if (ch === "(") {
      depth -= 1;
      if (depth === 0) {
        return {
          start: i,
          end: closeAt + 1,
          inner: s.slice(i + 1, closeAt),
          full: s.slice(i, closeAt + 1)
        };
      }
    }
  }
  return null;
}

/** 한글 번역 괄호 안의 (grit) 같은 영어 괄호만 별도 표시 */
function wrapInlineEnglishParens(html) {
  return String(html || "").replace(/\(([^()]*)\)/g, (full, inner) => {
    const t = String(inner || "").trim();
    if (!/[A-Za-z]/.test(t) || /[\uAC00-\uD7A3\u3131-\u318E]/.test(t)) return full;
    return `<span class="cf-inline-en-paren">(${inner})</span>`;
  });
}

/** cf 영어 문장(+출처)을 span으로 감싸 읽기 중 단어별 하이라이트용. 출처는 괄호로 표시 */
function wrapCfParenEnglish(cfHtml) {
  const raw = String(cfHtml || "");
  const { body, source } = splitCfBodyAndSource(raw.replace(/<[^>]+>/g, ""));
  if (source) {
    const bodyHtml = raw.replace(/\s*(?:\([^)]+\)|\*[^*\n]+)\s*$/, "").trim();
    const wrapped = /[A-Za-z]/.test(body)
      ? `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(bodyHtml)}</span>`
      : bodyHtml;
    return `${wrapped} <span class="cf-source">(${escapeEnHtml(source)})</span>`;
  }

  let sentence = raw.trim();
  let cite = "";
  let koTail = "";
  const trailingParen = findTrailingTopLevelParen(sentence);
  if (
    trailingParen &&
    /[\uAC00-\uD7A3\u3131-\u318E]/.test(trailingParen.inner) &&
    !looksLikeCfSource(String(trailingParen.inner || "").trim())
  ) {
    sentence = sentence.slice(0, trailingParen.start).trim();
    koTail = ` <span class="cf-ko-paren">${wrapInlineEnglishParens(trailingParen.full)}</span>`;
  }

  const starAt = sentence.search(/\*/);
  if (starAt >= 0) {
    cite = sentence.slice(starAt);
    sentence = sentence.slice(0, starAt).trim();
  }

  if (sentence && /[A-Za-z]/.test(sentence)) {
    return `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(sentence)}</span>${koTail}${cite ? ` ${cite}` : ""}`;
  }
  return `${sentence}${koTail}${cite ? ` ${cite}` : ""}`;
}

function createTitleElement(item, globalIndex, mode = "normal") {
  const titleInfo = getTitleInfo(item);
  const el = document.createElement("article");
  el.className = "ticker-item group-title-item";
  el.dataset.index = String(globalIndex);
  el.dataset.itemType = "title";
  const initialText = titleInfo?.text || "";
  el.innerHTML = `
    <div class="group-title-banner">
      <span class="group-title-text" data-full-title="${escapeAttr(initialText)}">${escapeEnHtml(initialText)}</span>
    </div>
  `;
  return el;
}

function createEntryElement(item, globalIndex, mode = "normal") {
  if (isTitleItem(item)) return createTitleElement(item, globalIndex, mode);
  return createItemElement(item, globalIndex, mode);
}

/** "opulence" → "opu_____" (앞 3글자 공개, 나머지 글자는 _) */
function buildEnPreviewMask(en, previewLetters = EN_PREVIEW_LETTERS) {
  const text = String(en || "");
  let shown = 0;
  let out = "";
  for (const ch of text) {
    if (/[A-Za-z0-9]/.test(ch)) {
      if (shown < previewLetters) {
        out += ch;
        shown += 1;
      } else {
        out += "_";
      }
    } else if (/\s/.test(ch)) {
      out += " ";
    } else {
      out += shown < previewLetters ? ch : "_";
    }
  }
  return out;
}

/** 미리보기에 이미 공개된 앞부분 / 손글씨로 쓸 나머지 */
function getEnPreviewSplit(en, previewLetters = EN_PREVIEW_LETTERS) {
  const text = String(en || "");
  const mask = buildEnPreviewMask(text, previewLetters);
  let splitAt = text.length;
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === "_") {
      splitAt = i;
      break;
    }
  }
  return {
    prefix: text.slice(0, splitAt),
    rest: text.slice(splitAt)
  };
}

function escapeEnHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function buildGroups() {
  const groups = [];
  let current = null;
  json1.forEach((item, index) => {
    if (isTitleItem(item)) {
      current = { titleIndex: index, titleItem: item, wordIndices: [] };
      groups.push(current);
    } else if (isWordItem(item)) {
      if (!current) {
        current = { titleIndex: -1, titleItem: null, wordIndices: [] };
        groups.push(current);
      }
      current.wordIndices.push(index);
    }
  });
  return groups;
}

/** title은 그룹핑만 하고 화면에는 노출하지 않음 → 슬롯 전부 단어로 채움 */
const WORDS_PER_PAGE = Math.max(1, VISIBLE_COUNT);

function getAllWordIndices() {
  const indices = [];
  for (let i = 0; i < json1.length; i += 1) {
    if (isWordItem(json1[i])) indices.push(i);
  }
  return indices;
}

function getVisibleTitleIndices() {
  const indices = [];
  for (let i = 0; i < json1.length; i += 1) {
    const info = getTitleInfo(json1[i]);
    if (info && info.text) indices.push(i);
  }
  return indices;
}

/** 연속 피드: startIndex부터 VISIBLE_COUNT개 표시. 맨 앞에 title1 노출 */
function renderWordFeed(wordIndices, startIndex = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  if (startIndex === 0) {
    getVisibleTitleIndices().forEach((titleIndex) => {
      const el = createTitleElement(json1[titleIndex], titleIndex, mode);
      if (animateIn) el.classList.add("slide-in");
      tickerEl.appendChild(el);
    });
  }
  wordIndices.slice(startIndex, startIndex + VISIBLE_COUNT).forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
  });
}

const swipeStyleByIndex = new Map();

function pickRandomSwipeStyle(excludeId = "") {
  const ids = SWIPE_STYLE_IDS.filter((id) => id !== excludeId);
  const pool = ids.length ? ids : SWIPE_STYLE_IDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** json 단어마다 swipe 배정. "random"/없음 → 연속 중복 없이 랜덤, 고정값은 그대로 */
function assignSwipeStyles() {
  swipeStyleByIndex.clear();
  let prev = "";
  json1.forEach((item, index) => {
    if (!isWordItem(item)) return;
    const specified = String(item.swipe || "random").trim();
    const id =
      specified && specified !== "random" && SWIPE_STYLE_TIMING[specified]
        ? specified
        : pickRandomSwipeStyle(prev);
    swipeStyleByIndex.set(index, id);
    prev = id;
  });
}

function getItemSwipeStyle(globalIndex) {
  return swipeStyleByIndex.get(globalIndex) || pickRandomSwipeStyle();
}

/** 위 단어는 해당 json.swipe 효과로 사라진 뒤 자리만 접혀 아래가 올라옴 */
async function swipeUpWordAndAppend(completedGlobalIndex, nextGlobalIndex, mode = "normal") {
  const style = getItemSwipeStyle(completedGlobalIndex);
  const timing = SWIPE_STYLE_TIMING[style] || SWIPE_STYLE_TIMING["swipe-up"];
  const completedEl = tickerEl.querySelector(`.ticker-item[data-index="${completedGlobalIndex}"]`);

  const appendNext = () => {
    if (nextGlobalIndex == null || nextGlobalIndex < 0) return;
    if (!isWordItem(json1[nextGlobalIndex])) return;
    if (tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`)) return;
    const el = createEntryElement(json1[nextGlobalIndex], nextGlobalIndex, mode);
    el.classList.add("is-swiping-in", `swipe-in-${style}`);
    tickerEl.appendChild(el);
  };

  if (!completedEl) {
    appendNext();
    return;
  }

  completedEl.classList.remove("slide-in", "is-swiping-in", "slide-out", "is-fading-out", "is-collapsing");
  Array.from(completedEl.classList).forEach((cls) => {
    if (cls.startsWith("swipe-in-") || cls.startsWith("swipe-out-")) {
      completedEl.classList.remove(cls);
    }
  });
  completedEl.classList.add("is-swiping-out", `swipe-out-${style}`);
  const penFade =
    typeof window.fadeClearPenDrawings === "function"
      ? window.fadeClearPenDrawings(timing.outMs)
      : Promise.resolve();
  await Promise.all([sleep(timing.outMs), penFade]);

  // 2) 자리만 접기 → 아래 항목이 부드럽게 올라옴
  const gap = Number.parseFloat(getComputedStyle(tickerEl).rowGap) || 0;
  const height = completedEl.getBoundingClientRect().height;
  completedEl.style.boxSizing = "border-box";
  completedEl.style.overflow = "hidden";
  completedEl.style.flexShrink = "0";
  completedEl.style.height = `${height}px`;
  completedEl.style.marginBottom = "0px";
  void completedEl.offsetHeight;

  completedEl.classList.add("is-collapsing");
  completedEl.style.height = "0px";
  completedEl.style.paddingTop = "0px";
  completedEl.style.paddingBottom = "0px";
  completedEl.style.marginBottom = `-${gap}px`;

  appendNext();
  await sleep(timing.collapseMs);
  completedEl.remove();
}

/** 현재 슬롯 수에서 VISIBLE_COUNT까지, startAfterGlobalIndex 다음 json 항목으로 채움 */
function appendFillUntilVisible(startAfterGlobalIndex, animateIn, mode, currentCount) {
  let count = currentCount;
  for (let i = startAfterGlobalIndex + 1; i < json1.length && count < VISIBLE_COUNT; i += 1) {
    const item = json1[i];
    if (isTitleItem(item) || !isWordItem(item)) continue;
    const el = createEntryElement(item, i, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  }
}

function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  let count = 0;

  const wordSlice = group.wordIndices.slice(
    wordStartInGroup,
    wordStartInGroup + WORDS_PER_PAGE
  );
  wordSlice.forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  });

  const lastIndex = wordSlice.length
    ? wordSlice[wordSlice.length - 1]
    : group.titleIndex;
  appendFillUntilVisible(lastIndex, animateIn, mode, count);
}

async function shiftGroupWordsDown(group, nextWordStartInGroup, mode = "normal") {
  const leaving = Array.from(tickerEl.children);
  leaving.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  leaving.forEach((el) => el.remove());

  let count = 0;
  const wordSlice = group.wordIndices.slice(
    nextWordStartInGroup,
    nextWordStartInGroup + WORDS_PER_PAGE
  );
  wordSlice.forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  });

  const lastIndex = wordSlice.length
    ? wordSlice[wordSlice.length - 1]
    : group.titleIndex;
  appendFillUntilVisible(lastIndex, true, mode, count);
}

async function shiftToNextGroup(group, mode = "normal") {
  const oldItems = Array.from(tickerEl.querySelectorAll(".ticker-item"));
  oldItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  renderGroupWindow(group, 0, true, mode);
}

function burstProgressConfetti() {
  const track = document.querySelector(".progress-track");
  if (!track) return;

  const rect = track.getBoundingClientRect();
  const colors = ["#ff8fab", "#ffd24d", "#9fe8d8", "#adff2f", "#f5efe7"];

  const burstOnce = (burstIndex) => {
    const layer = document.createElement("div");
    layer.className = "progress-confetti";
    layer.setAttribute("aria-hidden", "true");
    const xOffset = (burstIndex - 2) * 7;
    const yOffset = burstIndex % 2 === 0 ? 0 : -8;
    layer.style.setProperty("--confetti-x", `${rect.right - 8 + xOffset}px`);
    layer.style.setProperty("--confetti-y", `${rect.top + rect.height / 2 + yOffset}px`);

    for (let i = 0; i < 22; i += 1) {
      const piece = document.createElement("i");
      const angle = Math.random() * Math.PI * 2;
      const distance = 55 + Math.random() * 105;
      piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      piece.style.setProperty("--dy", `${Math.sin(angle) * distance - 28}px`);
      piece.style.setProperty("--rot", `${Math.round(Math.random() * 540 - 270)}deg`);
      piece.style.setProperty("--delay", `${Math.random() * 70}ms`);
      piece.style.setProperty("--piece-color", colors[(i + burstIndex) % colors.length]);
      layer.appendChild(piece);
    }

    document.body.appendChild(layer);
    window.setTimeout(() => layer.remove(), 1500);
  };

  for (let burstIndex = 0; burstIndex < 5; burstIndex += 1) {
    window.setTimeout(() => burstOnce(burstIndex), burstIndex * 260);
  }
}

function pickRandomProgressBarTheme() {
  const i = Math.floor(Math.random() * PROGRESS_BAR_THEMES.length);
  return PROGRESS_BAR_THEMES[i] || PROGRESS_BAR_THEMES[0];
}

let progressDisplayPct = 0;
let progressTargetPct = 0;
let progressAnimRaf = null;
let progressLabelCurrent = 0;
let progressLabelTotal = 0;

function applyProgressVisual(pct) {
  const fill = document.getElementById("progress-fill");
  const pctEl = document.getElementById("progress-pct");
  const label = document.getElementById("progress-label");
  const shown = Math.max(0, Math.min(100, pct));
  const rounded = Math.round(shown);

  if (fill) {
    fill.style.width = `${shown}%`;
    fill.classList.toggle("has-pct", shown > 0.05);
    if (shown >= 99.5 && fill.dataset.confettiDone !== "true") {
      fill.dataset.confettiDone = "true";
      burstProgressConfetti();
    } else if (shown < 99.5) {
      fill.dataset.confettiDone = "false";
    }
  }
  if (pctEl) pctEl.textContent = `${rounded}%`;
  if (label && progressLabelTotal > 0) {
    label.textContent = `진행도 ${progressLabelCurrent} / ${progressLabelTotal}`;
  }
  updateProgressRunner(shown);
}

function ensureProgressAnim() {
  if (progressAnimRaf) return;
  const tick = () => {
    const diff = progressTargetPct - progressDisplayPct;
    if (Math.abs(diff) < 0.08) {
      progressDisplayPct = progressTargetPct;
      applyProgressVisual(progressDisplayPct);
      progressAnimRaf = null;
      return;
    }
    // 남은 거리의 일부씩 따라가며 끊김 없이 전진
    progressDisplayPct += diff * 0.085;
    applyProgressVisual(progressDisplayPct);
    progressAnimRaf = requestAnimationFrame(tick);
  };
  progressAnimRaf = requestAnimationFrame(tick);
}

function setProgressTargetPct(pct) {
  progressTargetPct = Math.max(0, Math.min(100, pct));
  ensureProgressAnim();
}

/** 단어 처리 중: 다음 칸의 중간쯤까지 살짝 미리 전진 */
function nudgeProgressSoft(doneCount, total = getProgressTotal()) {
  const safeTotal = Math.max(1, total);
  const soft = Math.min(doneCount + 0.55, safeTotal);
  setProgressTargetPct((soft / safeTotal) * 100);
}

function updateProgressRunner(pct) {
  const runner = document.getElementById("progress-runner");
  if (!runner) return;

  let stageIndex = 0;
  if (pct >= 100) stageIndex = 5;
  else if (pct > 80) stageIndex = 4;
  else if (pct > 60) stageIndex = 4;
  else if (pct > 40) stageIndex = 3;
  else if (pct > 20) stageIndex = 2;
  else if (pct > 0) stageIndex = 1;

  const theme = activeProgressBarTheme || PROGRESS_BAR_THEMES[0];
  const stage = theme.stages[stageIndex] || theme.stages[0];
  runner.textContent = stage[0];
  runner.dataset.motion = stage[1];
  runner.dataset.barTheme = theme.id;
}

function getTotalWordCount() {
  return json1.filter(isWordItem).length;
}

/** 진행도 total = JSON 단어 수 × 반복(패스) 횟수 */
function getProgressTotal() {
  return getTotalWordCount() * Math.max(1, EN_KO_PASS_COUNT);
}

function updateProgress(current, total = getProgressTotal()) {
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  progressLabelCurrent = safeCurrent;
  progressLabelTotal = safeTotal;
  const pct = safeTotal > 0 ? (safeCurrent / safeTotal) * 100 : 0;
  if (safeCurrent === 0) {
    progressDisplayPct = 0;
    progressTargetPct = 0;
    if (progressAnimRaf) {
      cancelAnimationFrame(progressAnimRaf);
      progressAnimRaf = null;
    }
    applyProgressVisual(0);
    return;
  }
  setProgressTargetPct(pct);
}

function renderStaticList() {
  assignSwipeStyles();
  const wordIndices = getAllWordIndices();
  if (!wordIndices.length) return;
  renderWordFeed(wordIndices, 0, false, "normal");
  showAllAsDefault();
  updateProgress(0);
}

async function markWordAsRead(_globalIndex, _animate = true) {
  // 읽음 표시(비스듬한 V 체크) 없음
}

function getWordDisplayNumber(globalIndex) {
  let n = 0;
  for (let i = 0; i <= globalIndex && i < json1.length; i += 1) {
    if (isWordItem(json1[i])) n += 1;
  }
  return n;
}

function countEnSpellLetters(en) {
  return (String(en || "").match(/[A-Za-z]/g) || []).length;
}

function countKoChars(ko) {
  return (String(ko || "").match(/[가-힣]/g) || []).length;
}

/** 영어 스펠링 수 + 한글 글자 수 ≥ 22 이면 2줄 배치 */
function shouldStackWordLine(en, ko) {
  return countEnSpellLetters(en) + countKoChars(ko) >= 22;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("ko-first-mode", "second-pass-mode");
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const showPreview = false;
  const enHiddenClass = "";
  const previewHiddenClass = " hidden-en-preview";
  const mask = buildEnPreviewMask(item.en);
  const koHiddenClass = "";
  const koContent = item.ko || "";
  const enMainHtml = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview${previewHiddenClass}">${escapeEnHtml(mask)}</span><span class="en-main-text${enHiddenClass}">${escapeEnHtml(item.en)}</span></span>`;
  const koHtml = `<span class="ko-text${koHiddenClass}" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(koContent)}</span>`;
  const stack = shouldStackWordLine(item.en, item.ko);
  const enWithColon = `<span class="en-pair">${enMainHtml}<span class="en-colon">:</span></span>`;
  const wordLine = stack
    ? `<span class="en-row">${enWithColon}</span>${koHtml}`
    : `${enWithColon}${koHtml}`;
  const wordLineClass = stack ? "word-line word-line-stack" : "word-line";
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfKoreanText(
    wrapCfParenEnglish(applyCfWordMarks(cfText, targetWord))
  );
  const cfHtml = cfText
    ? `<span class="cf-note"><span class="cf-abbr">cf.</span> ${cfTextWithUnderline}</span>`
    : "";
  if (cfText) el.classList.add("has-cf");
  const enRepeatBannerCount = getEnRepeatBannerCount(item);
  const enRepeatBannerHtml = enRepeatBannerCount > 0
    ? `<span class="en-repeat-banner" data-en-repeat="${enRepeatBannerCount}" aria-hidden="true"><span class="en-repeat-count">${formatEnRepeatCountdown(enRepeatBannerCount)}</span></span>`
    : "";
  // 발음·IPA·cf는 처음부터 노출
  const pronunciation = String(item.pronunciation || "").trim();
  const ipa = String(item.ipa || "").trim();
  const pronHtmlParts = [];
  const pronPlainParts = [];
  if (pronunciation) {
    pronHtmlParts.push(`|${pronunciation}|`);
    pronPlainParts.push(`|${pronunciation}|`);
  }
  if (ipa) {
    pronHtmlParts.push(`<span class="pron-ipa">${escapeEnHtml(ipa)}</span>`);
    pronPlainParts.push(ipa);
  }
  const pronDisplay = pronHtmlParts.join(" ");
  const pronPlain = pronPlainParts.join(" ");
  const pronTextHtml = pronDisplay
    ? `<span class="pron-text" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>`
    : "";
  const pronLine = (pronTextHtml || cfHtml)
    ? `<div class="pron-line"><div class="pron-row">${pronTextHtml}${cfHtml}</div></div>`
    : "";
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <div class="word-content">
        ${enRepeatBannerHtml}
        <div class="${wordLineClass}">${wordLine}</div>
        ${pronLine}
      </div>
    </div>
  `;
  return el;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordFlashImageSrc(wordIndex) {
  const item = json1[wordIndex];
  if (!isWordItem(item)) return null;
  const file = String(item?.image || "").trim();
  if (!file) return null;
  return `${WORD_FLASH_IMAGE_DIR}${file}`;
}

function applyPageBackground() {
  const baseSrc = new URL(PAGE_BG_BASE_IMAGE, document.baseURI).href;
  const photoUrl = new URL(PAGE_BG_IMAGE, document.baseURI);
  photoUrl.searchParams.set("v", String(Date.now()));
  const photoSrc = photoUrl.href;

  document.documentElement.style.setProperty("--page-bg-color", PAGE_BG_COLOR);
  document.documentElement.style.setProperty("--page-bg-base-image", `url("${baseSrc}")`);
  document.documentElement.style.setProperty("--page-bg-image", `url("${photoSrc}")`);

  for (const el of [document.documentElement, document.body]) {
    el.style.backgroundColor = PAGE_BG_COLOR;
    el.style.backgroundImage = `url("${baseSrc}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundAttachment = "fixed";
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${photoSrc}")`;
  }
}

function resetWordFlashImage() {
  if (!wordFlashImgEl) return;
  wordFlashImgEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashImgEl.style.clipPath = "";
}

function resetWordFlashVideo() {
  if (!wordFlashVideoEl) return;
  wordFlashVideoEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashVideoEl.pause();
  wordFlashVideoEl.currentTime = 0;
}

async function canLoadImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

function isVideoFile(src) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

async function showWordFlashVideo(src) {
  if (!wordFlashVideoEl) return;
  resetWordFlashVideo();
  resetWordFlashImage();

  wordFlashVideoEl.volume = 0.2;
  wordFlashVideoEl.src = src;
  wordFlashVideoEl.load();
  await new Promise((resolve) => {
    wordFlashVideoEl.oncanplay = resolve;
    wordFlashVideoEl.onerror = resolve;
  });

  void wordFlashVideoEl.offsetWidth;
  wordFlashVideoEl.classList.add("is-fading-in");
  wordFlashVideoEl.play();
  await sleep(WORD_FLASH_FADE_IN_MS);
  wordFlashVideoEl.classList.remove("is-fading-in");
  wordFlashVideoEl.classList.add("is-visible");

  await new Promise((resolve) => {
    wordFlashVideoEl.onended = resolve;
    wordFlashVideoEl.onerror = resolve;
  });

  wordFlashVideoEl.classList.remove("is-visible");
  wordFlashVideoEl.classList.add("is-fading-out");
  await sleep(WORD_FLASH_FADE_OUT_MS);
  resetWordFlashVideo();
}

async function showWordFlashImage(wordIndex) {
  const src = getWordFlashImageSrc(wordIndex);
  if (!src) return;

  if (isVideoFile(src)) {
    await showWordFlashVideo(src);
    return;
  }

  if (!wordFlashImgEl) return;
  resetWordFlashImage();
  resetWordFlashVideo();
  if (!(await canLoadImage(src))) return;

  wordFlashImgEl.src = src;
  void wordFlashImgEl.offsetWidth;
  wordFlashImgEl.classList.add("is-fading-in");
  await sleep(WORD_FLASH_FADE_IN_MS);
  wordFlashImgEl.classList.remove("is-fading-in");
  wordFlashImgEl.classList.add("is-visible");
  await sleep(WORD_FLASH_DISPLAY_MS);
  wordFlashImgEl.classList.remove("is-visible");
  wordFlashImgEl.classList.add("is-fading-out");
  await sleep(WORD_FLASH_FADE_OUT_MS);
  resetWordFlashImage();
}

function resolveKoTtsVoiceId(langKey) {
  if (typeof langKey === "string" && /^ko-KR-Chirp3-HD-/i.test(langKey)) return langKey;
  const isKo = langKey === "ko" || langKey === "ko-KR" || (typeof langKey === "string" && /^ko-/i.test(langKey));
  if (!isKo) return langKey;
  return KO_TTS_VOICE_IDS[Number(KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[1];
}

function resolveEnTtsVoiceId(langKey) {
  const values = Object.values(EN_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  const isEn = langKey === "en" || langKey === "en-US" || (typeof langKey === "string" && /^en-/i.test(langKey));
  if (!isEn) return langKey;
  return activeEnTtsVoiceId || EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
}

/** 영어 TTS가 앞음절 강세로 읽는 단어 교정 (화면 표기는 그대로) */
function applyEnTtsRespell(text) {
  return String(text || "")
    .replace(/\benriching\b/gi, "in-RICHing")
    .replace(/\benriched\b/gi, "in-RICHT")
    .replace(/\benriches\b/gi, "in-RICHez")
    .replace(/\benrich\b/gi, "in-RICH");
}

function getTTSUrl(text, languageKey) {
  let raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  if (isEn) raw = applyEnTtsRespell(raw);
  const langParam = isEn ? resolveEnTtsVoiceId(normalizedLang) : resolveKoTtsVoiceId(normalizedLang);
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

function getKoSpeakText(rawKo) {
  const text = String(rawKo || "").trim();
  if (!text) return "";
  // "단어/단어", "단어, 단어" 형태는 앞 항목만 읽기
  const beforeSlash = text.split("/")[0].trim();
  const firstExpr = beforeSlash.split(",")[0].trim();
  // 물결표(~): TTS용 — ~로→무엇으로(무엇으+로), 그 외→무엇
  return firstExpr
    .replace(/~(?=로)/g, "무엇으")
    .replace(/~/g, "무엇");
}

function getEnSpeakText(word) {
  if (!word) return "";
  return String(word.enTts || word.en || "").trim();
}

/**
 * EN 단어 발음 횟수/속도 지정
 * - enSpeakRates: [1, 0.85] → 배열 길이만큼 재생 (속도별)
 * - enRepeat: 2 → 정상 속도(1)로 n번
 * - 둘 다 없으면 1번
 */
function getEnSpeakRates(word) {
  if (Array.isArray(word?.enSpeakRates) && word.enSpeakRates.length) {
    const rates = word.enSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
    if (rates.length) return rates;
  }
  const n = Math.floor(Number(word?.enRepeat));
  if (Number.isFinite(n) && n >= 1) {
    return Array.from({ length: Math.min(n, 10) }, () => 1);
  }
  return [1];
}

/** enRepeat/enSpeakRates로 2회 이상일 때만 배너용 횟수 (그 외 0) */
function getEnRepeatBannerCount(word) {
  const n = getEnSpeakRates(word).length;
  return n > 1 ? n : 0;
}

/** remaining=5 → "×5" (하나씩 표기: ×5 → ×4 → … → ×1 → 숨김) */
function formatEnRepeatCountdown(remaining) {
  const n = Math.floor(Number(remaining));
  if (!Number.isFinite(n) || n < 1) return "";
  return `×${n}`;
}

function updateEnRepeatBanner(itemEl, remaining) {
  const banner = itemEl?.querySelector?.(".en-repeat-banner");
  if (!banner) return;
  const countEl = banner.querySelector(".en-repeat-count");
  if (remaining > 0) {
    banner.classList.add("is-active");
    banner.classList.remove("is-done");
    if (countEl) {
      countEl.textContent = formatEnRepeatCountdown(remaining);
      countEl.classList.remove("is-tick");
      void countEl.offsetWidth;
      countEl.classList.add("is-tick");
    }
  } else {
    banner.classList.remove("is-active");
    banner.classList.add("is-done");
    if (countEl) countEl.textContent = "";
  }
}

/** cfSpeakRates: cf 괄호 영어 재생 속도 (예: [1.3, 0.85] = 빠르게 1번 + 천천히 1번) */
function getCfSpeakRates(word) {
  if (!Array.isArray(word?.cfSpeakRates) || !word.cfSpeakRates.length) return [1];
  const rates = word.cfSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
  return rates.length ? rates : [1];
}

/** cf 영어 문장 배열. 끝 괄호 출처는 제외하고 본문만 사용 */
function extractCfParenEnglishParts(cfText) {
  const text = String(cfText || "");
  const { body, source } = splitCfBodyAndSource(text);
  if (source) {
    const spoken = body.replace(/[.,;:\s]+$/g, "").trim();
    return spoken && /[A-Za-z]/.test(spoken) ? [spoken] : [];
  }

  const parts = [];
  const re = /\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const inner = String(match[1] || "").trim();
    if (
      inner &&
      /[A-Za-z]/.test(inner) &&
      !looksLikeCfSource(inner) &&
      !/[\uAC00-\uD7A3\u3131-\u318E]/.test(inner)
    ) {
      parts.push(inner);
    }
  }
  if (parts.length) return parts;

  // "English sentence. *WSJ, ..." 형태 → 출처(*) 앞 영어 문장
  const beforeCite = text.split(/\*/)[0]
    .replace(/\s*\([^()]*[\uAC00-\uD7A3\u3131-\u318E][^()]*\)\s*$/, "")
    .trim()
    .replace(/[.,;:\s]+$/g, "")
    .trim();
  if (beforeCite && /[A-Za-z]/.test(beforeCite)) return [beforeCite];
  return parts;
}

function normalizeCfSpeakToken(text) {
  return String(text || "").replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

/**
 * 전체 영어 문장에서 학습 단어가 들어 있는 핵심 절만 추출.
 * 예: 콤마 절, when/because 등 종속절 우선.
 */
function extractCfCoreEnglish(fullEn, targetWord) {
  const text = String(fullEn || "").replace(/\s+/g, " ").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  const forms = generateEnglishForms(target).sort((a, b) => b.length - a.length);
  if (!forms.length) return text;
  const formRe = new RegExp(`\\b(${forms.map(escapeRegExp).join("|")})\\b`, "i");
  const hit = formRe.exec(text);
  if (!hit) return text;

  const cleanClause = (clause) => String(clause || "")
    .replace(/^(and|but|or|so)\s+/i, "")
    .replace(/^[,;\s]+|[,;\s]+$/g, "")
    .trim();

  const byComma = text.split(/[,;]\s+/);
  if (byComma.length > 1) {
    const clause = byComma.find((c) => formRe.test(c));
    if (clause) {
      const core = cleanClause(clause);
      if (core) return core;
    }
  }

  const before = text.slice(0, hit.index);
  const subWordRe = /\b(when|while|where|because|although|though|if|unless|since|after|before)\b/gi;
  let lastSub = -1;
  let sm;
  while ((sm = subWordRe.exec(before)) !== null) lastSub = sm.index;
  if (lastSub >= 0) {
    const core = cleanClause(text.slice(lastSub));
    if (core) return core;
  }

  const after = text.slice(hit.index + hit[0].length);
  const nextSub = /\b(when|while|where|because|although|though|if|unless|since|after|before)\b/i.exec(after);
  if (nextSub) {
    const core = cleanClause(text.slice(0, hit.index + hit[0].length + nextSub.index));
    if (core) return core;
  }

  return text;
}

/** 핵심 문장 TTS에 맞춰 하이라이트할 .cf-en-word 구간만 고름 */
function getWordElsMatchingSpeakText(wordEls, speakText) {
  const els = Array.from(wordEls || []);
  const want = String(speakText || "")
    .split(/\s+/)
    .map(normalizeCfSpeakToken)
    .filter(Boolean);
  if (!els.length || !want.length) return els;

  const have = els.map((el) => normalizeCfSpeakToken(el.textContent));
  outer: for (let start = 0; start <= have.length - want.length; start += 1) {
    for (let i = 0; i < want.length; i += 1) {
      if (have[start + i] !== want[i]) continue outer;
    }
    return els.slice(start, start + want.length);
  }
  return els;
}

/** 괄호 안 영어 구문이 있으면 cf 영어를 읽음. cfSpeakRates가 있으면 그 속도로 재생 */
function shouldSpeakCfEnglish(word) {
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  return extractCfParenEnglishParts(word?.cf);
}

/** 구문별로 TTS 재생하며 읽는 영어 단어를 순서대로 하이라이트 */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null, options = null) {
  // TTS 비활성 — 읽는 기능 제거
}

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;
const TTS_FADE_IN_SEC = 0.02;
const TTS_FADE_OUT_SEC = 0.045;
let ttsAudioCtx = null;
let ttsActiveSource = null;
let ttsActiveGain = null;

function getTtsAudioContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!ttsAudioCtx) ttsAudioCtx = new Ctx();
  return ttsAudioCtx;
}

async function unlockTtsAudioContext() {
  const ctx = getTtsAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (_) {}
  }
}

function stopTtsSource() {
  const source = ttsActiveSource;
  const gain = ttsActiveGain;
  ttsActiveSource = null;
  ttsActiveGain = null;
  const ctx = ttsAudioCtx;
  if (source && gain && ctx) {
    const now = ctx.currentTime;
    const fade = TTS_FADE_OUT_SEC;
    try {
      const cur = Math.max(0.0001, Number(gain.gain.value) || 1);
      gain.gain.cancelScheduledValues(now);
      gain.gain.setValueAtTime(cur, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + fade);
      source.stop(now + fade);
      return;
    } catch (_) {}
  }
  if (source) {
    try {
      source.stop();
    } catch (_) {}
  }
}

function waitForAudioReady(audio) {
  return new Promise((resolve, reject) => {
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }
    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("Audio load error"));
    };
    const cleanup = () => {
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("error", onError);
    };
    audio.addEventListener("canplay", onReady, { once: true });
    audio.addEventListener("error", onError, { once: true });
  });
}

function isNonRetryableTTSError(err) {
  const msg = String(err?.message || err || "");
  return /quota exhausted|RESOURCE_EXHAUSTED/i.test(msg);
}

async function fetchTTSAudio(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const quotaHit = response.status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(detail);
    throw new Error(quotaHit ? "TTS quota exhausted" : `TTS HTTP ${response.status}`);
  }
  const arr = await response.arrayBuffer();
  const ctx = getTtsAudioContext();
  if (ctx) {
    try {
      await unlockTtsAudioContext();
      const buffer = await ctx.decodeAudioData(arr.slice(0));
      return { buffer };
    } catch (_) {}
  }
  const audio = new Audio(URL.createObjectURL(new Blob([arr])));
  audio.preload = "auto";
  await waitForAudioReady(audio);
  return audio;
}

async function loadBackendTTSAudio(text, languageKey) {
  const url = getTTSUrl(text, languageKey);
  if (!url) return null;

  if (ttsAudioCache.has(url)) {
    return ttsAudioCache.get(url);
  }

  const loadPromise = (async () => {
    let lastErr;
    for (let attempt = 0; attempt < TTS_MAX_RETRIES; attempt += 1) {
      try {
        return await fetchTTSAudio(url);
      } catch (err) {
        lastErr = err;
        if (isNonRetryableTTSError(err) || attempt >= TTS_MAX_RETRIES - 1) {
          throw err;
        }
        await sleep(TTS_RETRY_BASE_MS * (attempt + 1));
      }
    }
    throw lastErr;
  })().catch((err) => {
    ttsAudioCache.delete(url);
    throw err;
  });

  ttsAudioCache.set(url, loadPromise);
  return loadPromise;
}

function preloadEnTTS(word) {
  if (!word) return;
  const enText = getEnSpeakText(word);
  if (!enText) return;
  loadBackendTTSAudio(enText, resolveEnTtsVoiceId("en-US")).catch(() => {});
}

async function playEnTTS(text, rates = [1], wordEls = null, onRepeatTick = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  try {
    for (let i = 0; i < rateList.length; i += 1) {
      const remaining = rateList.length - i;
      if (typeof onRepeatTick === "function") onRepeatTick(remaining, rateList.length);
      if (i > 0) await sleep(TTS_REPEAT_GAP_MS);
      await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i], wordEls);
    }
  } finally {
    if (typeof onRepeatTick === "function") onRepeatTick(0, rateList.length);
  }
}

function preloadKoTTS(word) {
  // 한글 TTS 없음
}

function preloadCfEnglishTTS(word) {
  // cf TTS 비활성
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadEnTTS(word);
}

function preloadWordsAhead(startIndex, count) {
  let loaded = 0;
  for (let i = startIndex; i < json1.length && loaded < count; i += 1) {
    if (!isWordItem(json1[i])) continue;
    preloadWordTTS(json1[i], i);
    loaded += 1;
  }
}

/** 숫자 → 영어 발화형 (하이라이트 가중치용; TTS와 비슷한 길이) */
const HIGHLIGHT_ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"
];
const HIGHLIGHT_TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
];

function numberToSpokenWordsEn(n) {
  const num = parseInt(n, 10);
  if (!Number.isFinite(num) || num < 0) return "";
  if (num === 0) return "zero";
  if (num < 20) return HIGHLIGHT_ONES[num];
  if (num < 100) {
    return HIGHLIGHT_TENS[Math.floor(num / 10)] + (num % 10 ? "-" + HIGHLIGHT_ONES[num % 10] : "");
  }
  if (num < 1000) {
    return HIGHLIGHT_ONES[Math.floor(num / 100)] + " hundred"
      + (num % 100 ? " " + numberToSpokenWordsEn(num % 100) : "");
  }
  if (num < 1e6) {
    return numberToSpokenWordsEn(Math.floor(num / 1000)) + " thousand"
      + (num % 1000 ? " " + numberToSpokenWordsEn(num % 1000) : "");
  }
  if (num < 1e9) {
    return numberToSpokenWordsEn(Math.floor(num / 1e6)) + " million"
      + (num % 1e6 ? " " + numberToSpokenWordsEn(num % 1e6) : "");
  }
  return String(num);
}

function amountNumToSpokenWordsEn(numStr) {
  const cleaned = String(numStr || "").replace(/,/g, "").trim();
  if (!cleaned) return "";
  if (!/\./.test(cleaned)) {
    const n = parseInt(cleaned, 10);
    return Number.isFinite(n) ? numberToSpokenWordsEn(n) : "";
  }
  const [intPart, fracPart = ""] = cleaned.split(".");
  const intN = parseInt(intPart, 10);
  if (!Number.isFinite(intN)) return "";
  let spoken = numberToSpokenWordsEn(intN);
  const fracDigits = fracPart.replace(/\D/g, "");
  if (fracDigits) {
    const digitWords = [...fracDigits].map((ch) => {
      const d = parseInt(ch, 10);
      return Number.isFinite(d) ? (d === 0 ? "zero" : HIGHLIGHT_ONES[d]) : "";
    }).filter(Boolean);
    if (digitWords.length) spoken += " point " + digitWords.join(" ");
  }
  return spoken;
}

function spokenTextLetterWeight(spoken) {
  return Math.max(1, String(spoken || "").replace(/[^A-Za-z']/g, "").length);
}

/**
 * TTS 하이라이트 가중치.
 * $135 은 글자 4지만 실제로는 "one hundred thirty-five dollars"처럼 길게 읽히므로
 * 통화·소수·퍼센트는 발화형 글자 수로 맞춘다.
 */
function estimateSpokenHighlightWeight(text) {
  const raw = String(text || "").trim();
  if (!raw) return 1;

  let weight = 0;
  let remaining = raw;

  remaining = remaining.replace(/\$[\d,]+(?:\.\d+)?/g, (m) => {
    const spoken = amountNumToSpokenWordsEn(m.slice(1));
    weight += spokenTextLetterWeight(spoken ? `${spoken} dollars` : m);
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\s*%/g, (m) => {
    const num = m.replace(/[^\d.,]/g, "");
    const spoken = amountNumToSpokenWordsEn(num);
    weight += spokenTextLetterWeight(spoken ? `${spoken} percent` : m);
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\b/g, (m) => {
    const spoken = amountNumToSpokenWordsEn(m);
    weight += spokenTextLetterWeight(spoken || m);
    return " ";
  });
  weight += remaining.replace(/[^A-Za-z0-9']/g, "").length;
  return Math.max(1, weight);
}

function startWordHighlightSync(audio, wordEls) {
  if (!audio || !Array.isArray(wordEls) || !wordEls.length) return () => {};
  const weights = wordEls.map((el) => estimateSpokenHighlightWeight(el.textContent));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let current = -1;
  let raf = 0;

  const setActive = (idx) => {
    if (idx === current) return;
    if (current >= 0 && wordEls[current]) wordEls[current].classList.remove("is-speaking");
    current = idx;
    if (current >= 0 && wordEls[current]) wordEls[current].classList.add("is-speaking");
  };

  const clear = () => {
    wordEls.forEach((el) => el.classList.remove("is-speaking"));
    current = -1;
  };

  const update = () => {
    const dur = audio.duration;
    if (Number.isFinite(dur) && dur > 0) {
      const progress = Math.min(1, Math.max(0, audio.currentTime / dur));
      let cum = 0;
      let idx = wordEls.length - 1;
      for (let i = 0; i < weights.length; i += 1) {
        const next = cum + weights[i] / total;
        if (progress < next || i === weights.length - 1) {
          idx = i;
          break;
        }
        cum = next;
      }
      setActive(idx);
    } else if (current < 0) {
      setActive(0);
    }
    if (!audio.paused && !audio.ended) raf = requestAnimationFrame(update);
  };

  clear();
  setActive(0);
  raf = requestAnimationFrame(update);
  return () => {
    cancelAnimationFrame(raf);
    clear();
  };
}

async function playTtsBuffer(entry, playbackRate = 1, wordEls = null) {
  const ctx = getTtsAudioContext();
  if (!ctx || !entry?.buffer) return false;
  await unlockTtsAudioContext();
  stopTtsSource();

  const rate = Number(playbackRate);
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  const source = ctx.createBufferSource();
  source.buffer = entry.buffer;
  source.playbackRate.value = safeRate;
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(1, now + TTS_FADE_IN_SEC);
  source.connect(gain);
  gain.connect(ctx.destination);
  ttsActiveSource = source;
  ttsActiveGain = gain;

  const duration = entry.buffer.duration / safeRate;
  const startedAt = ctx.currentTime;
  let stopped = false;
  const clock = {
    get duration() {
      return duration;
    },
    get currentTime() {
      return Math.min(duration, Math.max(0, ctx.currentTime - startedAt));
    },
    get paused() {
      return stopped;
    },
    get ended() {
      return stopped;
    },
    pause() {
      if (stopped) return;
      stopped = true;
      stopTtsSource();
    }
  };
  window.__shortsCurrentAudio = clock;
  const stopHighlight = startWordHighlightSync(clock, wordEls);

  await new Promise((resolve) => {
    source.onended = () => resolve();
    try {
      source.start(0);
    } catch (_) {
      resolve();
    }
  });

  stopped = true;
  if (ttsActiveSource === source) {
    ttsActiveSource = null;
    ttsActiveGain = null;
  }
  stopHighlight();
  if (window.__shortsCurrentAudio === clock) window.__shortsCurrentAudio = null;
  return true;
}

async function playAudioElement(audio, playbackRate = 1, wordEls = null) {
  if (audio?.buffer) {
    return playTtsBuffer(audio, playbackRate, wordEls);
  }

  stopTtsSource();
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.volume = 0;
  audio.currentTime = 0;

  const stopHighlight = startWordHighlightSync(audio, wordEls);

  try {
    await audio.play();
  } catch (_) {
    stopHighlight();
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  const fadeMs = TTS_FADE_IN_SEC * 1000;
  const fadeStart = performance.now();
  await new Promise((resolve) => {
    const step = () => {
      if (window.__shortsCurrentAudio !== audio) {
        resolve();
        return;
      }
      const p = Math.min(1, (performance.now() - fadeStart) / fadeMs);
      audio.volume = p;
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  stopHighlight();
  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

async function playBackendTTS(text, languageKey, playbackRate = 1, wordEls = null) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate, wordEls);
  } catch (_) {}
}

function hideAllKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .ko-text').forEach((el) => {
    el.classList.add("hidden-ko");
    el.classList.remove("ko-reserving", "ko-hand", "ko-writing");
    el.style.removeProperty("--ko-write-p");
    el.textContent = "";
  });
}

/** EN 재생 전에 한글 폭만큼 자리를 잡아 ✍️ 최종 위치 고정 (손은 왼쪽에서 대기) */
function reserveKoSlot(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (text) koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-writing");
  koTextEl.style.setProperty("--ko-write-p", "0");
  koTextEl.classList.add("ko-reserving", "ko-hand");
}

function revealKoText(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (text) koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.add("ko-hand");
}

/** 손이 왼쪽→오른쪽으로 이동하며 한글이 드러남 — 실제 필기처럼 불규칙한 속도 */
async function writeKoWithHand(koTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  // 한글 손글씨 시작과 동시에 발음·IPA·cf 노출 (마크는 TTS 때)
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
  if (!text) {
    revealKoText(koTextEl, fallback);
    return;
  }

  const escapeHtml = (s) => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  koTextEl.classList.remove("hidden-ko", "ko-reserving");
  koTextEl.classList.add("ko-hand", "ko-writing");
  koTextEl.innerHTML = `<span class="ko-write-ink">${escapeHtml(text)}</span>`;
  koTextEl.style.setProperty("--ko-write-p", "0");
  void koTextEl.offsetWidth;

  const letters = text.replace(/\s/g, "").length;
  const duration = getHandWriteDurationMs(letters);
  const curve = makeIrregularHandwriteCurve(Math.max(letters, text.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      koTextEl.style.setProperty("--ko-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  koTextEl.textContent = text;
  koTextEl.classList.remove("ko-writing");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.add("ko-hand");
}

function clearKoHand(koTextEl) {
  koTextEl?.classList.remove("ko-hand", "ko-reserving", "ko-writing");
  koTextEl?.style.removeProperty("--ko-write-p");
}

/** 한글 읽기 직후: 현재 손 제거 → 피드의 다음 단어에 손 미리 배치 */
function moveKoHandToNext(wordIndices, wordIndex) {
  const currentGlobalIndex = wordIndices[wordIndex];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  const currentKo = currentItem?.querySelector(".ko-text");
  if (!currentKo?.classList.contains("ko-writing")) {
    clearKoHand(currentKo);
  }

  const nextWordIndex = wordIndex + 1;
  if (nextWordIndex >= wordIndices.length) return;

  const nextGlobalIndex = wordIndices[nextWordIndex];
  const nextItem = tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`);
  if (!nextItem || nextItem.dataset.itemType !== "word") return;

  const nextKoTextEl = nextItem.querySelector(".ko-text");
  reserveKoSlot(nextKoTextEl, nextItem.dataset.ko || "");
}

function hideAllEnText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const enMain = item.querySelector(".en-main");
    const enTextEl = item.querySelector(".en-main-text");
    if (!enTextEl) return;
    const fullEn = enMain?.dataset.fullEn || item.dataset.en || "";
    enTextEl.classList.add("hidden-en-main");
    enTextEl.classList.remove("en-reserving", "en-hand", "en-writing", "en-partial-preview");
    enTextEl.style.removeProperty("--en-write-p");
    if (fullEn) enTextEl.textContent = fullEn;

    let preview = enMain?.querySelector(".en-preview");
    if (!preview && enMain) {
      preview = document.createElement("span");
      preview.className = "en-preview";
      enMain.insertBefore(preview, enTextEl);
    }
    if (preview) {
      preview.textContent = buildEnPreviewMask(fullEn);
      preview.classList.remove("hidden-en-preview");
    }
  });
}

function hideEnPreview(enTextEl) {
  const preview = enTextEl?.closest(".en-main")?.querySelector(".en-preview");
  if (preview) preview.classList.add("hidden-en-preview");
}

/** KO 재생 중: 미리보기 공개분은 보이고, 나머지는 폭만 잡고 손은 그 앞에서 대기 */
function reserveEnSlot(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);
  enTextEl.classList.remove("hidden-en-main", "en-writing");
  enTextEl.style.removeProperty("--en-write-p");
  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.add("en-reserving", "en-hand");
    return;
  }
  enTextEl.classList.add("en-reserving", "en-hand", "en-partial-preview");
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">${escapeEnHtml(rest)}</span>`;
}

/** 손글씨처럼 불규칙한 진행 곡선 (0→1) — 망설임/빠른 획/느린 획이 섞임 */
function makeIrregularHandwriteCurve(charCount) {
  const n = Math.max(16, Math.round(charCount * 5));
  const speeds = [];
  for (let i = 0; i < n; i += 1) {
    const r = Math.random();
    let s;
    if (r < 0.14) s = 0.18 + Math.random() * 0.22; // 망설임/멈칫
    else if (r < 0.32) s = 1.55 + Math.random() * 0.95; // 빠른 획
    else if (r < 0.48) s = 0.45 + Math.random() * 0.25; // 느린 획
    else s = 0.75 + Math.random() * 0.55;
    speeds.push(s);
  }
  const sum = speeds.reduce((a, b) => a + b, 0) || 1;
  const curve = [0];
  let acc = 0;
  for (const s of speeds) {
    acc += s / sum;
    curve.push(Math.min(1, acc));
  }
  curve[curve.length - 1] = 1;
  return curve;
}

function sampleHandwriteCurve(curve, t) {
  const x = Math.min(1, Math.max(0, t)) * (curve.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = curve[i] ?? 0;
  const b = curve[Math.min(i + 1, curve.length - 1)] ?? 1;
  return a + (b - a) * f;
}

function getHandWriteDurationMs(letters) {
  const n = Math.max(0, Number(letters) || 0);
  return Math.min(HAND_WRITE_MS_MAX, Math.max(HAND_WRITE_MS_MIN, n * HAND_WRITE_MS_PER_LETTER));
}

function getCfMarkDrawDurationMs(text) {
  const n = Math.max(1, String(text || "").replace(/\s/g, "").length);
  return Math.min(CF_MARK_MS_MAX, Math.max(CF_MARK_MS_MIN, n * CF_MARK_MS_PER_LETTER));
}

function queryCfMarkEl(cfNoteEl) {
  return cfNoteEl?.querySelector("mark1, mark10, mark12") || null;
}

function resetCfMarkState(cfNoteEl) {
  if (!cfNoteEl) return;
  cfNoteEl.classList.remove("cf-mark-pending", "cf-mark-drawing", "cf-mark-done");
  cfNoteEl.querySelectorAll("mark1, mark10, mark12").forEach((el) => {
    el.style.removeProperty("--cf-mark-p");
  });
}

async function animateCfMarkDraw(cfNoteEl) {
  const markEl = queryCfMarkEl(cfNoteEl);
  if (!markEl) {
    cfNoteEl?.classList.remove("cf-mark-pending");
    return;
  }

  await sleep(CF_MARK_DELAY_MS);
  if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) return;

  cfNoteEl.classList.remove("cf-mark-pending");
  cfNoteEl.classList.add("cf-mark-drawing");

  const letters = markEl.textContent.replace(/\s/g, "").length || 4;
  const duration = getCfMarkDrawDurationMs(markEl.textContent);
  const curve = makeIrregularHandwriteCurve(Math.max(letters, 6));
  markEl.style.setProperty("--cf-mark-p", "0");
  void markEl.offsetWidth;
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) {
        resolve();
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      markEl.style.setProperty("--cf-mark-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) return;

  cfNoteEl.classList.remove("cf-mark-drawing");
  cfNoteEl.classList.add("cf-mark-done");
  markEl.style.removeProperty("--cf-mark-p");
}

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 불규칙하게 씀
 *  발음·IPA·cf는 손글씨 시작과 동시 노출, 마크(밑줄)는 TTS 발음 때
 */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  // 발음·IPA·cf는 시작 시 한 번에 전체 노출 (마크는 TTS 때)
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
  if (!text) {
    revealEnText(enTextEl, fallback);
    return;
  }

  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);

  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.remove("hidden-en-main", "en-reserving", "en-writing", "en-partial-preview");
    enTextEl.classList.add("en-hand");
    enTextEl.style.removeProperty("--en-write-p");
    return;
  }

  enTextEl.classList.remove("hidden-en-main", "en-reserving");
  enTextEl.classList.add("en-hand", "en-writing", "en-partial-preview");
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">` +
    `<span class="en-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  enTextEl.style.setProperty("--en-write-p", "0");
  void enTextEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = getHandWriteDurationMs(letters);
  const curve = makeIrregularHandwriteCurve(Math.max(letters, rest.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      enTextEl.style.setProperty("--en-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  enTextEl.textContent = text;
  enTextEl.classList.remove("en-writing", "en-partial-preview");
  enTextEl.style.removeProperty("--en-write-p");
  enTextEl.classList.add("en-hand");
}

function preparePronForWriting(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  const html = pronTextEl.dataset.fullPronHtml;
  pronTextEl.classList.remove("hidden-pron-text");
  pronTextEl.classList.add("pron-writing");
  if (html) {
    pronTextEl.innerHTML = `<span class="pron-write-ink">${html}</span>`;
  }
}

function finishPronWriting(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  pronTextEl.classList.remove("pron-writing");
  pronTextEl.style.removeProperty("--en-write-p");
}

function revealPronText(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  pronTextEl.classList.remove("hidden-pron-text", "pron-writing");
  pronTextEl.style.removeProperty("--en-write-p");
}

function clearEnHand(enTextEl) {
  enTextEl?.classList.remove("en-hand", "en-reserving", "en-writing", "en-partial-preview");
  enTextEl?.style.removeProperty("--en-write-p");
}

/** 영어 읽기 직후: 현재 손 제거 → 피드의 다음 단어 영어에 손 미리 배치 */
function moveEnHandToNext(wordIndices, wordIndex) {
  const currentGlobalIndex = wordIndices[wordIndex];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  const currentEn = currentItem?.querySelector(".en-main-text");
  if (!currentEn?.classList.contains("en-writing")) {
    clearEnHand(currentEn);
  }

  const nextWordIndex = wordIndex + 1;
  if (nextWordIndex >= wordIndices.length) return;

  const nextGlobalIndex = wordIndices[nextWordIndex];
  const nextItem = tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`);
  if (!nextItem || nextItem.dataset.itemType !== "word") return;

  const nextEnTextEl = nextItem.querySelector(".en-main-text");
  reserveEnSlot(nextEnTextEl, nextItem.dataset.en || "");
}

function hideAllPronText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .pron-text').forEach((el) => {
    el.classList.add("hidden-pron-text");
    el.classList.remove("pron-writing");
    el.style.removeProperty("--en-write-p");
    restorePronHtml(el);
  });
}

function restorePronHtml(pronTextEl) {
  if (!pronTextEl) return;
  const html = pronTextEl.dataset.fullPronHtml;
  if (html) pronTextEl.innerHTML = html;
  else pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
}

function showKoAsDefault() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.remove("hidden-ko", "ko-reserving");
    koTextEl.textContent = ko;
  });
}

/** Gtest: 영어·한글·발음·cf 전부 미리 노출 */
function showAllAsDefault() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const enTextEl = item.querySelector(".en-main-text");
    const koTextEl = item.querySelector(".ko-text");
    const pronTextEl = item.querySelector(".pron-text");
    const cfNoteEl = item.querySelector(".cf-note");
    revealEnText(enTextEl, item.dataset.en || "");
    if (koTextEl) {
      const ko = item.dataset.ko || "";
      koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing", "ko-hand");
      koTextEl.style.removeProperty("--ko-write-p");
      koTextEl.textContent = ko;
    }
    if (pronTextEl) {
      pronTextEl.classList.remove("hidden-pron-text", "pron-writing");
      restorePronHtml(pronTextEl);
    }
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
  });
}

function revealEnText(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const enMain = enTextEl.closest(".en-main");
  const text = enMain?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main", "en-partial-preview");
  hideEnPreview(enTextEl);
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    resetCfMarkState(el);
    el.classList.add("hidden-cf");
  });
}

/** cf 본문만 노출 — 마크는 아직 그리지 않음(pending) */
function revealCfNote(cfNoteEl) {
  if (!cfNoteEl) return;
  resetCfMarkState(cfNoteEl);
  cfNoteEl.classList.remove("hidden-cf");
  cfNoteEl.style.animation = "none";
  void cfNoteEl.offsetWidth;
  cfNoteEl.style.animation = "";

  if (queryCfMarkEl(cfNoteEl)) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
}

/** TTS 발음 읽기와 함께 핵심단어 마크 손그리기 */
async function startCfMarkDraw(cfNoteEl) {
  if (!cfNoteEl || cfNoteEl.classList.contains("hidden-cf")) return;
  if (!queryCfMarkEl(cfNoteEl)) return;
  if (!cfNoteEl.classList.contains("cf-mark-pending")) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
  await animateCfMarkDraw(cfNoteEl);
}

function ensureBgmAudio() {
  if (bgmAudio) return bgmAudio;
  bgmAudio = new Audio(encodeURI(BGM_SRC));
  bgmAudio.loop = false;
  bgmAudio.preload = "auto";
  bgmAudio.volume = BGM_VOLUME;
  return bgmAudio;
}

function getAutoBgmStartSec(wordCount = getTotalWordCount()) {
  const count = Math.max(0, Number(wordCount) || 0);
  return Math.max(0, BGM_AUTO_BASE_SEC + (BGM_AUTO_BASE_WORDS - count) * BGM_AUTO_SEC_PER_WORD);
}

/** json1 위 BGM_START_SEC 우선. null이면 예문 수 자동 */
function getBgmStartSec(wordCount = getTotalWordCount()) {
  if (BGM_START_SEC != null && Number.isFinite(Number(BGM_START_SEC))) {
    return Math.max(0, Math.round(Number(BGM_START_SEC)));
  }
  return getAutoBgmStartSec(wordCount);
}

async function startBgm() {
  if (!BGM_ENABLED) {
    stopBgm();
    return;
  }
  const audio = ensureBgmAudio();
  audio.volume = BGM_VOLUME;
  const startSec = getBgmStartSec();
  try {
    if (audio.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise((resolve, reject) => {
        const onLoaded = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.removeEventListener("error", onError);
          resolve();
        };
        const onError = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.removeEventListener("error", onError);
          reject(new Error("bgm load failed"));
        };
        audio.addEventListener("loadedmetadata", onLoaded, { once: true });
        audio.addEventListener("error", onError, { once: true });
        audio.load();
      });
    }
    audio.currentTime = startSec;
    if (audio.paused) await audio.play();
  } catch (_) {
    // 브라우저 자동재생 정책 등으로 실패해도 TTS는 진행
  }
}

function stopBgm() {
  if (!bgmAudio) return;
  try {
    bgmAudio.pause();
    bgmAudio.currentTime = getBgmStartSec();
  } catch (_) {}
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  pickRandomEnTtsVoice();
  await unlockTtsAudioContext();
  assignSessionCfMarkType(true);
  activeProgressBarTheme = pickRandomProgressBarTheme();

  const wordIndices = getAllWordIndices();
  const progressTotal = getProgressTotal();
  let doneCount = 0;
  updateProgress(0, progressTotal);

  if (!wordIndices.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  assignSwipeStyles();
  await startBgm();

  // 시작: 영어·한글·발음·cf 전부 미리 노출
  renderWordFeed(wordIndices, 0, false, "normal");
  showAllAsDefault();
  preloadWordsAhead(0, json1.length);
  await sleep(SHORTS_INTRO_MS);

  // 1패스: 이미 노출된 상태에서 EN 읽기 → swipe up
  for (let i = 0; i < wordIndices.length; i += 1) {
    const globalIndex = wordIndices[i];
    preloadWordsAhead(globalIndex + 1, VISIBLE_COUNT);

    const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
    if (!item || item.dataset.itemType !== "word") continue;

    const enTextEl = item.querySelector(".en-main-text");
    const cfNoteEl = item.querySelector(".cf-note");

    item.classList.add("is-word-active");
    // 선은 단어 페이드 때 fadeClearPenDrawings로 지움 (여기서 즉시 지우면 늦게 느껴짐)
    if (typeof window.placePenNearWord === "function") {
      window.placePenNearWord(item);
    }
    nudgeProgressSoft(doneCount, progressTotal);
    preloadEnTTS(json1[globalIndex]);
    enTextEl?.classList.add("is-speaking");
    const markPromise = startCfMarkDraw(cfNoteEl);
    try {
      const wordData = json1[globalIndex];
      await playEnTTS(
        getEnSpeakText(wordData),
        getEnSpeakRates(wordData),
        null,
        (remaining) => updateEnRepeatBanner(item, remaining)
      );
    } finally {
      enTextEl?.classList.remove("is-speaking");
      updateEnRepeatBanner(item, 0);
    }
    await markPromise;

    doneCount += 1;
    updateProgress(doneCount, progressTotal);
    if (cfNoteEl) await sleep(CF_READ_PAUSE_MS);
    else await sleep(PRON_HOLD_MS);

    const nextFill = i + VISIBLE_COUNT < wordIndices.length ? wordIndices[i + VISIBLE_COUNT] : null;
    if (i < wordIndices.length - 1) {
      await swipeUpWordAndAppend(globalIndex, nextFill, "normal");
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 2패스: 한글 손 쓰기(+발음·IPA·cf) → TTS 발음과 함께 마크 → swipe up (cf TTS 없음)
  if (EN_KO_PASS_COUNT >= 2) {
    await sleep(PASS_GAP_MS);

    renderWordFeed(wordIndices, 0, true, "normal");
    showAllAsDefault();

    for (let i = 0; i < wordIndices.length; i += 1) {
      const globalIndex = wordIndices[i];
      preloadWordsAhead(globalIndex + 1, VISIBLE_COUNT);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      item.classList.add("is-word-active");
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord(item);
      }
      nudgeProgressSoft(doneCount, progressTotal);
      const cfNoteEl = item.querySelector(".cf-note");
      const enMainEl = item.querySelector(".en-main-text");
      if (enMainEl) enMainEl.classList.add("is-speaking");
      const markPromise = startCfMarkDraw(cfNoteEl);
      try {
        const wordData = json1[globalIndex];
        await playEnTTS(
          getEnSpeakText(wordData),
          getEnSpeakRates(wordData),
          null,
          (remaining) => updateEnRepeatBanner(item, remaining)
        );
      } finally {
        if (enMainEl) enMainEl.classList.remove("is-speaking");
        updateEnRepeatBanner(item, 0);
      }
      await markPromise;
      await showWordFlashImage(globalIndex);
      await markWordAsRead(globalIndex);
      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      if (cfNoteEl) await sleep(CF_READ_PAUSE_MS);
      else await sleep(PRON_HOLD_MS);

      const nextFill = i + VISIBLE_COUNT < wordIndices.length ? wordIndices[i + VISIBLE_COUNT] : null;
      if (i < wordIndices.length - 1) {
        await swipeUpWordAndAppend(globalIndex, nextFill, "normal");
      }
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();
  stopBgm();
  if (typeof window.clearPenDrawings === "function") {
    window.clearPenDrawings();
  }

  await startReviewQuiz();

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

function formatReviewKoHtml(ko, answerKo) {
  const text = String(ko || "").trim();
  if (!text) return "";
  let html = escapeEnHtml(text);
  const target = String(answerKo || "").trim();
  if (target) {
    const escTarget = escapeEnHtml(target);
    if (escTarget && html.includes(escTarget)) {
      html = html.replace(escTarget, `<span class="rv-ko-answer">${escTarget}</span>`);
    }
  }
  html = html.replace(/\(([^)]+)\)/g, (_full, inner) => {
    const hint = String(inner || "").trim();
    const reveal = target || hint;
    return (
      `<span class="rv-ko-blank" data-ko-answer="${escapeAttr(reveal)}">` +
      `(${escapeEnHtml(hint)})` +
      `</span>`
    );
  });
  return html;
}

function revealReviewKoAnswer(koEl, answerKo) {
  if (!koEl) return;
  const target = String(answerKo || "").trim();
  if (!target) return;
  koEl.querySelectorAll(".rv-ko-blank").forEach((blankEl) => {
    blankEl.textContent = target;
    blankEl.classList.remove("rv-ko-blank");
    blankEl.classList.add("rv-ko-answer");
    blankEl.removeAttribute("data-ko-answer");
  });
}

/** 정답 → 앞 3글자 + 나머지 글자 수만큼 _ (붙여쓰기). 폭은 정답 sizer로 고정 */
function buildReviewBlankHtml(answer) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);
  const marks = rest ? "_".repeat(rest.length) : "";
  const marksHtml = marks
    ? `<span class="rv-blank-marks">${escapeEnHtml(marks)}</span>`
    : "";
  return (
    `<span class="rv-blank" data-answer="${escapeEnHtml(ans)}">` +
    `<span class="rv-blank-sizer" aria-hidden="true">${escapeEnHtml(ans)}</span>` +
    `<span class="rv-blank-face">` +
    `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>` +
    marksHtml +
    `</span></span>`
  );
}

function formatReviewEnHtml(en, answer) {
  const blankHtml = buildReviewBlankHtml(answer);
  let html = escapeEnHtml(String(en || ""));
  if (blankHtml) {
    const replaced = html.replace(/[A-Za-z]{1,3}_{2,}/g, blankHtml);
    if (replaced !== html) return replaced;
    return html.replace(/_{2,}/g, blankHtml);
  }
  return html;
}

/** 첫 낭독용: 빈칸은 항상 "blank"로만 읽음 (정답·접두 힌트 미포함) */
function buildReviewSpeakText(en) {
  return String(en || "")
    .replace(/[A-Za-z]{1,3}_{2,}/g, "blank")
    .replace(/_{2,}/g, "blank")
    .replace(/\s+/g, " ")
    .trim();
}

/** 문장 빈칸에 ✍️ 손으로 정답 쓰기 — 앞글자(접두)는 두고 빈 곳만 채움. 폭은 sizer로 고정 */
async function writeReviewAnswerInBlank(enEl, answer) {
  if (!enEl) return;
  const ans = String(answer || "").trim();
  if (!ans) return;

  let blankEl = enEl.querySelector(".rv-blank");
  if (!blankEl) {
    blankEl = document.createElement("span");
    blankEl.className = "rv-blank";
    blankEl.dataset.answer = ans;
    enEl.appendChild(blankEl);
  }

  let sizerEl = blankEl.querySelector(".rv-blank-sizer");
  let faceEl = blankEl.querySelector(".rv-blank-face");
  if (!sizerEl || !faceEl) {
    blankEl.innerHTML =
      `<span class="rv-blank-sizer" aria-hidden="true">${escapeEnHtml(ans)}</span>` +
      `<span class="rv-blank-face"></span>`;
    sizerEl = blankEl.querySelector(".rv-blank-sizer");
    faceEl = blankEl.querySelector(".rv-blank-face");
  }
  sizerEl.textContent = ans;

  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);

  blankEl.classList.add("rv-blank-hand", "rv-blank-writing", "rv-blank-partial");
  if (!rest) {
    faceEl.innerHTML = `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>`;
    blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
    blankEl.classList.add("rv-blank-filled");
    return;
  }

  faceEl.innerHTML =
    `<span class="rv-blank-prefix rv-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="rv-write-ink-wrap" data-hand-host="1">` +
    `<span class="rv-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  blankEl.style.setProperty("--rv-write-p", "0");
  void blankEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = getHandWriteDurationMs(letters);
  const curve = makeIrregularHandwriteCurve(Math.max(letters, rest.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      blankEl.style.setProperty("--rv-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  faceEl.innerHTML =
    `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>` +
    `<span class="rv-blank-rest">${escapeEnHtml(rest)}</span>`;
  blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
  blankEl.classList.add("rv-blank-filled", "rv-blank-hand");
  blankEl.style.removeProperty("--rv-write-p");
}

function ensureReviewRoot() {
  let root = document.getElementById("review-root");
  if (root) return root;
  root = document.createElement("div");
  root.id = "review-root";
  root.hidden = true;
  root.innerHTML = `
    <div class="rv-panel">
      <div class="rv-countdown-slot">
        <div class="countdown-wrap" id="countdown-wrap" hidden>
          <div class="countdown-stage" data-mode="ring">
            <svg class="countdown-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="countdown-ring-track" cx="60" cy="60" r="52"></circle>
              <circle class="countdown-ring-progress" id="countdown-ring-progress" cx="60" cy="60" r="52"
                pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"></circle>
            </svg>
            <span class="countdown-num" id="countdown-num" aria-hidden="true">3</span>
            <div class="countdown-bars" id="countdown-bars" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>
      </div>
      <div id="rv-title"></div>
      <div id="rv-en"></div>
      <div id="rv-ko"></div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

function getReviewCountdownEls() {
  const wrap = document.getElementById("countdown-wrap");
  return {
    wrap,
    num: document.getElementById("countdown-num"),
    ring: document.getElementById("countdown-ring-progress"),
    bars: document.getElementById("countdown-bars"),
    stage: wrap ? wrap.querySelector(".countdown-stage") : null
  };
}

function getCountdownStyle(item, index = 0) {
  const style = String(item?.countdownStyle || "").trim().toLowerCase();
  if (COUNTDOWN_MODES.includes(style)) return style;
  return "ring";
}

function setCountdownRing(sec, total) {
  const { ring } = getReviewCountdownEls();
  if (!ring) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  ring.style.strokeDashoffset = String(Math.min(100, Math.max(0, spent)));
}

function setCountdownBars(sec) {
  const { bars } = getReviewCountdownEls();
  if (!bars) return;
  [...bars.querySelectorAll("i")].forEach((bar, idx) => {
    bar.classList.toggle("is-on", idx < sec);
  });
}

function bumpCountdownAnim() {
  const { num } = getReviewCountdownEls();
  if (!num) return;
  num.classList.remove("is-anim");
  void num.offsetWidth;
  num.classList.add("is-anim");
}

function stopCountdownTickSound() {
  if (!countdownTickAudio) return;
  try {
    countdownTickAudio.pause();
    countdownTickAudio.currentTime = 0;
  } catch (_) {}
  countdownTickAudio = null;
}

function startCountdownTickSound(src) {
  stopCountdownTickSound();
  const tickSrc = String(src || "").trim() || COUNTDOWN_TICK_FALLBACK_SRC;
  try {
    countdownTickAudio = new Audio(tickSrc);
    countdownTickAudio.loop = true;
    countdownTickAudio.volume = COUNTDOWN_TICK_VOLUME;
    countdownTickAudio.preload = "auto";
    const playPromise = countdownTickAudio.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  } catch (_) {}
}

function setCountdownMode(mode) {
  const { stage } = getReviewCountdownEls();
  if (stage) stage.dataset.mode = mode;
}

async function runCountdown(seconds, mode = "ring", tickSrc = "") {
  const { wrap, num } = getReviewCountdownEls();
  if (!wrap || !num) return;
  const style = COUNTDOWN_MODES.includes(mode) ? mode : "ring";
  setCountdownMode(style);
  wrap.hidden = false;
  startCountdownTickSound(tickSrc);

  if (style === "ring") setCountdownRing(seconds, seconds);
  if (style === "bars") setCountdownBars(seconds);

  try {
    for (let sec = seconds; sec >= 0; sec -= 1) {
      if (!isAutoplayRunning) break;
      num.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, seconds);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
  } finally {
    stopCountdownTickSound();
    wrap.hidden = true;
    num.classList.remove("is-anim");
  }
}

async function fadeReviewIn(root, wrapper) {
  document.body.classList.add("is-review-mode");
  if (wrapper) {
    wrapper.classList.add("is-fading-out");
    await sleep(REVIEW_FADE_MS);
    wrapper.style.visibility = "hidden";
    wrapper.classList.remove("is-fading-out");
  }
  root.hidden = false;
  root.classList.remove("is-visible");
  void root.offsetWidth;
  root.classList.add("is-visible");
  await sleep(REVIEW_FADE_MS);
}

async function startReviewQuiz() {
  const quizzes = Array.isArray(REVIEW_QUIZ)
    ? REVIEW_QUIZ.filter((q) => q && q.en && q.answer)
    : [];
  if (!quizzes.length) return;

  const root = ensureReviewRoot();
  const titleEl = document.getElementById("rv-title");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  const panelEl = root.querySelector(".rv-panel");
  const wrapper = document.querySelector("main.wrapper");

  const renderQuiz = (q, index) => {
    if (titleEl) titleEl.textContent = `Review ${index + 1}/${quizzes.length}`;
    if (enEl) enEl.innerHTML = formatReviewEnHtml(q.en, q.answer);
    if (koEl) koEl.innerHTML = formatReviewKoHtml(q.ko, q.answerKo);
  };

  renderQuiz(quizzes[0], 0);
  await fadeReviewIn(root, wrapper);
  if (typeof window.placePenNearWord === "function") {
    window.placePenNearWord(enEl || panelEl);
  }

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    if (i > 0) {
      if (typeof window.clearPenDrawings === "function") {
        window.clearPenDrawings();
      }
      if (panelEl) {
        panelEl.classList.add("is-switching");
        await sleep(REVIEW_FADE_MS * 0.55);
      }
      renderQuiz(q, i);
      if (panelEl) {
        panelEl.classList.remove("is-switching");
        void panelEl.offsetWidth;
        panelEl.classList.add("is-shown");
        await sleep(REVIEW_FADE_MS * 0.55);
        panelEl.classList.remove("is-shown");
      }
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord(enEl || panelEl);
      }
    }

    const speakText = buildReviewSpeakText(q.en);
    if (speakText) {
      try {
        await playEnTTS(speakText);
      } catch (_) {}
    }
    await sleep(REVIEW_PRE_COUNTDOWN_MS);

    await runCountdown(
      COUNTDOWN_SEC,
      getCountdownStyle(q, i),
      q.countdownTick || REVIEW_COUNTDOWN_TICK
    );

    await writeReviewAnswerInBlank(enEl, q.answer);
    revealReviewKoAnswer(koEl, q.answerKo);
    if (q.answer) {
      try {
        await playEnTTS(q.answer);
      } catch (_) {}
    }
    await sleep(REVIEW_ANSWER_HOLD_MS);
  }

  stopCountdownTickSound();
  const { wrap } = getReviewCountdownEls();
  if (wrap) wrap.hidden = true;
  // 마지막 문제 후 Review 화면에 그대로 종료
}

applyPageBackground();
if (pageTitleEl) {
  applyPageTitle();
  window.addEventListener("resize", () => {
    fitTitleSubToBox();
  });
}
assignSessionCfMarkType();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
initPenDraw();

/** 펜: 탭=켜기/끄기 · 길게=빨강↔노랑 · 두번탭=전체 지우기 (gmgreen과 동일) */
function initPenDraw() {
  const canvas = document.getElementById("pen-canvas");
  const btn = document.getElementById("pen-btn");
  let pointer = document.getElementById("pen-pointer");
  if (!canvas || !btn) return;

  if (!pointer) {
    pointer = document.createElement("div");
    pointer.id = "pen-pointer";
    pointer.className = "pen-pointer";
    pointer.setAttribute("aria-hidden", "true");
    document.body.appendChild(pointer);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = {
    red: "#ff2d2d",
    yellow: "#ffd400"
  };
  let colorKey = "red";
  let drawingEnabled = false;
  let isStroke = false;
  let lastX = 0;
  let lastY = 0;
  let longPressTimer = null;
  let longPressFired = false;
  let lastTapAt = 0;

  const syncSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const movePointer = (x, y) => {
    pointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const setColor = (key) => {
    colorKey = key === "yellow" ? "yellow" : "red";
    btn.dataset.color = colorKey;
    pointer.dataset.color = colorKey;
    btn.style.setProperty("--pen-color", COLORS[colorKey]);
    pointer.style.setProperty("--pen-color", COLORS[colorKey]);
  };

  const setDrawing = (on) => {
    drawingEnabled = Boolean(on);
    canvas.classList.toggle("is-drawing", drawingEnabled);
    btn.classList.toggle("is-on", drawingEnabled);
    pointer.classList.toggle("is-on", drawingEnabled);
    document.body.classList.toggle("is-pen-drawing", drawingEnabled);
    canvas.setAttribute("aria-hidden", drawingEnabled ? "false" : "true");
    if (!drawingEnabled) {
      movePointer(-100, -100);
    }
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /** 단어 페이드와 동일 타이밍으로 선이 서서히 사라진 뒤 버퍼 비움 */
  const fadeClearPenDrawings = (durationMs = ITEM_FADE_MS) => {
    const ms = Math.max(0, Number(durationMs) || ITEM_FADE_MS);
    return new Promise((resolve) => {
      canvas.style.transition = `opacity ${ms}ms ease`;
      void canvas.offsetWidth;
      canvas.style.opacity = "0";
      window.setTimeout(() => {
        clearCanvas();
        canvas.style.transition = "none";
        canvas.style.opacity = "1";
        resolve();
      }, ms);
    });
  };

  const pointFromEvent = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches[0]) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const beginStroke = (e) => {
    if (!drawingEnabled) return;
    if (e.target === btn) return;
    const p = pointFromEvent(e);
    isStroke = true;
    lastX = p.x;
    lastY = p.y;
    movePointer(p.x, p.y);
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX + 0.01, lastY + 0.01);
    ctx.stroke();
    e.preventDefault();
  };

  const moveStroke = (e) => {
    if (!drawingEnabled) return;
    const p = pointFromEvent(e);
    movePointer(p.x, p.y);
    if (!isStroke) return;
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
    e.preventDefault();
  };

  const endStroke = () => {
    isStroke = false;
  };

  const placePenNearWord = () => {
    // "신문기사에서 배우는 어휘" 글자 바로 옆 20px
    const anchor = document.querySelector(".page-header .title-main");
    let rect = null;
    if (anchor) {
      try {
        const range = document.createRange();
        range.selectNodeContents(anchor);
        const textRect = range.getBoundingClientRect();
        if (textRect.width > 0 && textRect.height > 0) rect = textRect;
      } catch (_) {
        /* ignore */
      }
      if (!rect) rect = anchor.getBoundingClientRect();
    }
    btn.style.setProperty("position", "fixed", "important");
    btn.style.setProperty("right", "auto", "important");
    btn.style.setProperty("bottom", "auto", "important");
    btn.style.setProperty("transform", "translateY(-50%)", "important");
    btn.style.setProperty("z-index", "100110", "important");
    btn.style.setProperty("pointer-events", "auto", "important");
    canvas.style.setProperty("z-index", "100100", "important");
    pointer.style.setProperty("z-index", "100120", "important");
    if (rect && rect.width > 0 && rect.height > 0) {
      const x = rect.right + 20;
      const y = rect.top + rect.height / 2;
      btn.style.setProperty("left", `${Math.max(8, x)}px`, "important");
      btn.style.setProperty("top", `${y}px`, "important");
    } else {
      btn.style.setProperty("left", "auto", "important");
      btn.style.setProperty("right", "12px", "important");
      btn.style.setProperty("top", "30%", "important");
    }
  };

  window.clearPenDrawings = clearCanvas;
  window.fadeClearPenDrawings = fadeClearPenDrawings;
  window.placePenNearWord = placePenNearWord;

  syncSize();
  setColor("red");
  setDrawing(false);
  placePenNearWord();
  window.addEventListener("resize", () => {
    syncSize();
    placePenNearWord();
  });
  window.addEventListener("scroll", () => placePenNearWord(), { passive: true });
  window.setTimeout(() => placePenNearWord(), 100);
  window.setTimeout(() => placePenNearWord(), 500);
  window.setTimeout(() => placePenNearWord(), 1200);

  canvas.addEventListener("pointerdown", beginStroke, { passive: false });
  canvas.addEventListener("pointermove", moveStroke, { passive: false });
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
  canvas.addEventListener("pointerleave", endStroke);

  btn.addEventListener("pointerdown", (e) => {
    longPressFired = false;
    longPressTimer = window.setTimeout(() => {
      longPressFired = true;
      setColor(colorKey === "red" ? "yellow" : "red");
      if (!drawingEnabled) setDrawing(true);
      btn.animate(
        [
          { transform: "translateY(-50%) scale(1)" },
          { transform: "translateY(-50%) scale(1.18)" },
          { transform: "translateY(-50%) scale(1.08)" }
        ],
        { duration: 220 }
      );
    }, 480);
    e.preventDefault();
  });

  const cancelLongPress = () => {
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  btn.addEventListener("pointerup", (e) => {
    cancelLongPress();
    if (longPressFired) {
      longPressFired = false;
      e.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastTapAt < 320) {
      clearCanvas();
      lastTapAt = 0;
      e.preventDefault();
      return;
    }
    lastTapAt = now;
    setDrawing(!drawingEnabled);
    e.preventDefault();
  });

  btn.addEventListener("pointercancel", cancelLongPress);
  btn.addEventListener("pointerleave", cancelLongPress);
  btn.addEventListener("contextmenu", (e) => e.preventDefault());
}
