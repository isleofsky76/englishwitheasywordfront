const PAGE_TITLE_HTML = `<span class="title-main">시사 영단어</span>
<span class="title-accent title-sub">'데이터센터 패닉과 <br>미국의 쇠퇴'</span><span class="title-meta">(The Wall Street Journal | 2026/08/31)</span>
<span class="progress-wrap" aria-live="polite">
  <span class="progress-label" id="progress-label">진행도 0 / 5</span>
  <span class="progress-track">
    <span class="progress-fill" id="progress-fill">
      <span class="progress-runner" id="progress-runner" data-motion="walk" aria-hidden="true">🚶🏻‍♂️</span>
      <span class="progress-pct" id="progress-pct">0%</span>
    </span>
  </span>
</span>`;

/** 부제(title-sub) · 메타(title-meta) 글자 크기 (px) */
const THUMB_TITLE_SUB_FONT_PX = 46;
const THUMB_TITLE_META_FONT_PX = 16;

/** 쇼츠 thumb 전용 — layout 대비 제목·en·ko·cf.영어 각 +4px */
const THUMB_FONT_BOOST_PX = 4;
const THUMB_TITLE_MAIN_FONT_PX = 15 + THUMB_FONT_BOOST_PX;
const THUMB_EN_MAIN_EXTRA_PX = 1 + THUMB_FONT_BOOST_PX;
/** EN : KO 한 줄 — KO는 EN 대비 4px 작게 (extra -2px) */
const THUMB_KO_EXTRA_PX = THUMB_FONT_BOOST_PX - 4;
const THUMB_CF_EN_EXTRA_PX = 4 + THUMB_FONT_BOOST_PX;
/** cf. 영어 문장만 — THUMB_CF_EN_EXTRA_PX 대비 +2px */
const THUMB_CF_EN_SENTENCE_EXTRA_PX = THUMB_CF_EN_EXTRA_PX + 2;
/** cf 괄호(영·한) — 기존 대비 +2px */
const THUMB_CF_PAREN_BONUS_PX = 2;

/** 쇼츠 상단 배너 (layout1thumb2 전용) */
const SHORTS_BANNER_PART_A = "시사";
const SHORTS_BANNER_PART_B = "영단어";

function escapeTitleHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function applyPageTitle() {
  const bannerTitle = document.querySelector(".shorts-banner__title");
  if (bannerTitle) {
    bannerTitle.innerHTML =
      `<span class="shorts-banner__part">${escapeTitleHtml(SHORTS_BANNER_PART_A)}</span>` +
      `<span class="shorts-banner__word">${escapeTitleHtml(SHORTS_BANNER_PART_B)}</span>`;
  }
  if (!pageTitleEl) return;
  pageTitleEl.innerHTML = PAGE_TITLE_HTML;
}

function applyThumbTypography() {
  const styleId = "layout1thumb2-typography";
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }
  style.textContent = `
    body.shorts-thumb .page-header .title-main {
      font-size: ${THUMB_TITLE_MAIN_FONT_PX}px !important;
    }
    body.shorts-thumb .page-header .title-sub {
      font-size: ${THUMB_TITLE_SUB_FONT_PX}px !important;
    }
    body.shorts-thumb .page-header .title-meta {
      font-size: ${THUMB_TITLE_META_FONT_PX}px !important;
    }
    body.shorts-thumb .en-main-text,
    body.shorts-thumb .en-preview {
      font-size: calc(1em + ${THUMB_EN_MAIN_EXTRA_PX}px);
    }
    body.shorts-thumb .ko-text {
      font-size: calc(0.92em + ${THUMB_KO_EXTRA_PX}px);
      font-weight: 700;
      line-height: 1.18;
      letter-spacing: -0.015em;
    }
    body.shorts-thumb .cf-note .cf-hint {
      font-size: 16px;
    }
    body.shorts-thumb .word-line,
    body.shorts-thumb .word-line .en-row,
    body.shorts-thumb .word-line .ko-text,
    body.shorts-thumb .pron-row {
      line-height: 1.2;
    }
    body.shorts-thumb .pron-line {
      margin-top: 0.08em;
    }
    body.shorts-thumb .cf-note {
      font-size: calc(0.82em + ${THUMB_CF_EN_EXTRA_PX}px);
      line-height: 1.5;
      color: var(--color-cf-en, #f5c842);
    }
    body.shorts-thumb .preview-stack-cf-en .cf-note,
    body.shorts-thumb .cf-note > .cf-line {
      font-size: calc(0.82em + ${THUMB_CF_EN_SENTENCE_EXTRA_PX}px);
    }
    body.shorts-thumb .cf-note .cf-abbr,
    body.shorts-thumb .cf-note .cf-en-word {
      color: var(--color-cf-en, #f5c842);
      text-shadow: none;
    }
    body.shorts-thumb .cf-note .cf-en-paren {
      color: var(--color-cf-en, #f5c842);
      text-shadow: none;
      font-size: calc(1em + ${2 + THUMB_CF_PAREN_BONUS_PX}px);
    }
    body.shorts-thumb .cf-note .cf-ko-paren {
      font-size: calc(1em - 5.5px + ${THUMB_CF_PAREN_BONUS_PX}px);
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: var(--color-cf-ko, var(--color-ko-trans));
      text-shadow: var(--shadow-ko-trans);
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
    }
    body.shorts-thumb .cf-note .cf-ko,
    body.shorts-thumb .cf-note .cf-ko-block {
      font-size: calc(1em - 5.5px);
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: var(--color-cf-ko, var(--color-ko-trans));
      text-shadow: var(--shadow-ko-trans);
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
    }
  `;
}

const VISIBLE_COUNT = 1;
/** 영어+한글 합산 글자 수가 이 값 이상이면 2줄 배치 (기본 15 + 8) */
const WORD_LINE_STACK_MIN_CHARS = 23;
const EN_KO_PASS_COUNT = 1;
/** autoplay — 단어 하나 처리 후 다음 단어로 넘어가기 전 대기(ms) */
const WORD_STEP_PAUSE_MS = 3000;
/** cf 노출 후 다음 단어로 넘어가기 전 대기(ms) */
const CF_READ_PAUSE_MS = 5000;
/** enRepeat≥1: cf 영어 TTS 전 대기 */
const CF_KO_AFTER_EN_PAUSE_MS = 1000;
/** autoplay — 단어 ko 미읽기, EN → cf(영어)만 TTS */
const AUTOPLAY_READ_WORD_KO = false;
const AUTOPLAY_READ_CF_KO = false;
/** 손글씨 속도 (ms). 값 키울수록 느려짐 — 사람 손 필기 속도 기준 */
const HAND_WRITE_MS_PER_LETTER = 143;
const HAND_WRITE_MS_MIN = 857;
const HAND_WRITE_MS_MAX = 2857;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** grandom과 동일한 진행 바 이모지: 걷기 → 뛰기 */
const PROGRESS_BAR_STAGES = [
  ["🚶🏻‍♂️", "walk"],
  ["🚶🏻‍♂️", "walk"],
  ["🏃🏻‍♂️", "run"],
  ["🏃🏻‍♂️", "run"],
  ["🏃🏻‍♂️", "run"],
  ["🏃🏻‍♂️", "run"]
];

///영어만 읽는 버젼. 
// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],

const json1 = 

[
  { "title1": "" },
  // {
  //   "en": "compromise",
  //   "ko": "(안전·번영 등을) 위태롭게 하다, 손상시키다",
  //   "hint": "",
  //   "pronunciation": "콤프러마이즈",
  //   "ipa": "/ˈkɑːmprəmaɪz/",
  //   "pos": "동",
  //   "stars": 5,
  //   "enRepeat": 1,
  //   "exampleEn": "",
  //   "exampleKo": "",
  //   "cf": "Without the energy and the data centers to power it, America’s safety and prosperity will be compromised. (동력을 공급하다 - Power)",
  //   "cf2": "",
  //   "image": ""
  //   },
    {
    "en": "run scared",
    "ko": "(미국 구어) 두려움에 사로잡혀 행동하다, 겁을 먹고 전전긍긍하다",
    "hint": "",
    "pronunciation": "런 스케어드",
    "ipa": "/rʌn skerd/",
    "pos": "구동",
    "stars": 4,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "We’re running scared over investment that creates jobs and pays local property taxes.",
    "cf2": "",
    "image": ""
    },
    
    {
    "en": "halt",
    "ko": "중단, 정지",
    "hint": "",
    "pronunciation": "홀트",
    "ipa": "/hɔːlt/",
    "pos": "명",
    "stars": 4,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The political backlash started on the left, and Bernie Sanders now wants a nationwide halt to new data centers.",
    "cf2": "",
    "image": ""
    },
    {
    "en": "turn a cold shoulder",
    "ko": "냉대하다, 차갑게 외면하다",
    "hint": "",
    "pronunciation": "턴 어 콜드 숄더",
    "ipa": "/tɜːrn ə koʊld ˈʃoʊldər/",
    "pos": "구동",
    "stars": 4,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Illinois Gov. JB Pritzker once courted data centers but now has turned them a cold shoulder.",
    "cf2": "",
    "image": ""
    },
    {
    "en": "fear-mongering",
    "ko": " 공포 조장, 공포 유발",
    "hint": "",
    "pronunciation": "피어 멍거리нг",
    "ipa": "/ˈfɪr mʌŋɡərɪŋ/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "“Our lakes run dry, family farms paved over,” says the fear-mongering spot.",
    "cf2": "",
    "image": ""
    },
   
    {
    "en": "scant",
    "ko": "거의 없는, 매우 부족한",
    "hint": "",
    "pronunciation": "스캔트",
    "ipa": "/skænt/",
    "pos": "형",
    "stars": 4,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Data centers also generate scant pollution.",
    "cf2": "",
    "image": ""
    },
    {
    "en": "recirculate",
    "ko": "(물·공기 등을) 다시 순환시키다, 재순환시키다",
    "hint": "",
    "pronunciation": "리서큘레이트",
    "ipa": "/ˌriːˈsɜːrkjəleɪt/",
    "pos": "동",
    "stars": 4,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Data centers also deploy efficient systems to recirculate wastewater.",
    "cf2": "",
    "image": ""
    },
    {
    "en": "culprit",
    "ko": "(문제·피해를 일으킨) 원인, 주범",
    "hint": "",
    "pronunciation": "컬프릿",
    "ipa": "/ˈkʌlprɪt/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Americans are understandably concerned about rising electric bills, but data centers aren’t the culprit.",
    "cf2": "",
    "image": ""
    },
    {
    "en": "bipartisan",
    "ko": "양당이 공동으로 지지하는, 초당적인",
    "hint": "",
    "pronunciation": "바이파티즌",
    "ipa": "/ˌbaɪˈpɑːrtɪzən/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The President rightly notes that if the bipartisan campaign against data centers succeeds, the winner will be the Chinese Communist Party.",
    "cf2": "",
    "image": ""
    }
];

/**
 * 학습 종료 후 Review 퀴즈
 */
// const REVIEW_QUIZ = [

// {
//   // dragnet(7) → dra____
//   en: "Many law-abiding immigrants have been caught in the dra____, tearing apart families and hurting employers.",
//   ko: "법을 지키며 살아온 많은 이민자들도 대규모 (단속망/수사망/포위망)에 걸려 가족이 뿔뿔이 흩어지고 고용주들도 피해를 입었습니다.",
//   answer: "dragnet",
//   answerKo: "대규모 단속망, 검거망"
// },

  
// ];





const REVIEW_FADE_MS = 520;
/** 퀴즈(Review) 카운트다운 초 */
const COUNTDOWN_SEC = 3;
const REVIEW_REVEAL_DELAY_MS = 1000;
const COUNTDOWN_MODES = ["pop", "ring", "bars"];
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;
const COUNTDOWN_TICK_FADE_MS = 480;
const REVIEW_COUNTDOWN_TICK = "resources/mixkit-bell-tick-tock-timer-1046.wav";
let countdownTickAudio = null;

const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
const wordFlashVideoEl = document.getElementById("word-flash-video");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 550;
const WORD_FLASH_IMAGE_DIR = "resources/";
/** 프리셋 B — 현재 버전 (뮤트 실버 배경 + 종이 질감) */
const PAGE_BG_COLOR_DEFAULT = "#d8d4cc";
/** 프리셋 A — layout2_cfLFthumb_associate cf 색 */
const THUMB_CF_COLOR_ASSOCIATE = {
  cfEn: "#f5c842",
  cfKo: "#c9d6e4",
};
/** 프리셋 A — thumball_long 배경 + associate cf 영·한글 */
const THUMB_TEXT_COLOR_PRESET_A = {
  banner: "#ff5248",
  bannerTop: "#ff5c54",
  bannerBottom: "#ff4840",
  bannerText: "#ffffff",
  title: "#b0bec5",
  subtitle: "#adff2f",
  titleHl: "#adff2f",
  titleMeta: "#ffd966",
  en: "#ffffff",
  ko: "#ffffff",
  pron: "#e8a75a",
  pronIpa: "#e8a75a",
  pronPos: "#d8ff8a",
  pronExtra: "#f0d08a",
  ...THUMB_CF_COLOR_ASSOCIATE,
  progressLabel: "#ff8fab",
  progressBarA: "#ff6b9d",
  progressBarB: "#ff8fab",
  progressPct: "#fff7fb",
};
/** 프리셋 A 배경 — thumball_long / associate (#2F3543) */
const THUMB_APPEARANCE_PRESET_A_BG = "#2f3543";
const THUMB_APPEARANCE_PRESET_STORAGE_KEY = "mark3read_thumb2_appearance_preset_v1";
/** 프리셋 B 텍스트 — #D8D4CC 뮤트 실버 조화 팔레트 (D키·기본값) */
const THUMB_TEXT_COLOR_DEFAULTS = {
  banner: "#945248",
  bannerTop: "#a05a50",
  bannerBottom: "#844038",
  bannerText: "#fffaf8",
  title: "#3d3934",
  subtitle: "#2d4a36",
  titleHl: "#766048",
  titleMeta: "#4a3f32",
  en: "#1b2d3e",
  ko: "#171f1a",
  pron: "#4a3824",
  pronIpa: "#2f3834",
  pronPos: "#3d4a38",
  pronExtra: "#6b5230",
  cfEn: "#f5c842",
  cfKo: "#a67c00",
  progressLabel: "#5c2838",
  progressBarA: "#a86070",
  progressBarB: "#c08088",
  progressPct: "#fffaf8",
};
const PAGE_BG_IMAGE = "resources/news.jpg";
const WORD_FLASH_FADE_IN_MS = 500;
const WORD_FLASH_DISPLAY_MS = 900;
const WORD_FLASH_FADE_OUT_MS = 550;
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

/** 한국어 TTS: 4=Chirp3-HD-Zephyr (여 · 부드러운, 자연스러운 설명) */
const KO_TTS_VOICE = 4;
const KO_TTS_PLAYBACK_RATE = 0.94;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar",
  4: "ko-KR-Chirp3-HD-Zephyr",
  5: "ko-KR-Chirp3-HD-Vindemiatrix"
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
  slide: ["slid"],
};

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
  } else {
    forms.add(`${w}ing`);
  }
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(lower) && !/e$/.test(lower)) {
    forms.add(`${w}${w.slice(-1)}ing`);
  }

  (IRREGULAR_VERB_FORMS[lower] || []).forEach((form) => forms.add(form));

  if (/e$/.test(lower)) {
    forms.add(`${w}d`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ied`);
  } else {
    forms.add(`${w}ed`);
  }
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(lower) && !/e$/.test(lower) && !/y$/.test(lower)) {
    forms.add(`${w}${w.slice(-1)}ed`);
  }

  return [...forms];
}

/** cf 영어 본문 끝 ↔ 한글 번역 괄호 사이 공백을 정확히 한 칸으로 */
function normalizeCfEnKoSpacing(cfText) {
  return String(cfText || "").replace(
    /([A-Za-z0-9.,;:!?'")\]}>])\s*(\([\uAC00-\uD7A3\u3131-\u318E])/g,
    "$1 $2"
  );
}

function forEachTopLevelParen(text, fn) {
  const s = String(text || "");
  let i = 0;
  while (i < s.length) {
    if (s[i] !== "(") {
      i += 1;
      continue;
    }
    let depth = 1;
    let j = i + 1;
    while (j < s.length && depth > 0) {
      if (s[j] === "(") depth += 1;
      else if (s[j] === ")") depth -= 1;
      j += 1;
    }
    if (depth !== 0) break;
    fn(s.slice(i, j), s.slice(i + 1, j - 1), i, j);
    i = j;
  }
}

/** cf — 영어 본문 / 끝 한글 번역 괄호 분리 */
function splitCfEnKoParts(cfText) {
  const text = normalizeCfEnKoSpacing(String(cfText || "").trim());
  if (!text) return { enPart: "", koPart: "" };
  let lastKoParen = null;
  forEachTopLevelParen(text, (full, inner, start, end) => {
    if (/[\uAC00-\uD7A3\u3131-\u318E]/.test(inner)) {
      lastKoParen = { full, start, end };
    }
  });
  if (!lastKoParen) return { enPart: text, koPart: "" };
  if (!/^\s*$/.test(text.slice(lastKoParen.end))) {
    return { enPart: text, koPart: "" };
  }
  return {
    enPart: text.slice(0, lastKoParen.start).trim(),
    koPart: lastKoParen.full.trim(),
  };
}

function buildCfEnOnlyHtml(enPart, targetWord) {
  const text = String(enPart || "").trim();
  if (!text) return "";
  return wrapCfRemainingEnglish(wrapCfParenEnglish(underlineTargetInCf(text, targetWord)));
}

function underlineTargetInCf(cfText, targetWord) {
  const text = String(cfText || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  const forms = generateEnglishForms(target)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (!forms.length) return text;

  return text.replace(
    new RegExp(`\\b(${forms.join("|")})\\b`, "gi"),
    (match) => `<u>${match}</u>`
  );
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

/** cf 괄호 그룹 — 중첩 (휴가) 등도 바깥 괄호 한 덩어리로 처리 */
function replaceCfParenGroups(text, transform) {
  const src = String(text || "");
  let result = "";
  let i = 0;
  while (i < src.length) {
    if (src[i] !== "(") {
      const next = src.indexOf("(", i);
      if (next === -1) {
        result += src.slice(i);
        break;
      }
      result += src.slice(i, next);
      i = next;
      continue;
    }
    let depth = 1;
    let j = i + 1;
    while (j < src.length && depth > 0) {
      if (src[j] === "(") depth += 1;
      else if (src[j] === ")") depth -= 1;
      j += 1;
    }
    const full = src.slice(i, j);
    const inner = full.slice(1, -1);
    result += transform(full, inner);
    i = j;
  }
  return result;
}

/** cf 한글 번역 괄호 — 괄호·한글 색·크기 일치 */
function wrapCfKoParenBlocks(cfHtml) {
  return replaceCfParenGroups(cfHtml, (full, inner) => {
    if (!/[\uAC00-\uD7A3\u3131-\u318E]/.test(inner)) return full;
    return `<span class="cf-ko-paren">${full}</span>`;
  });
}

/** cf 괄호 안 영어만 span으로 감싸 읽기 중 단어별 하이라이트용 */
function wrapCfParenEnglish(cfHtml) {
  let idx = 0;
  return replaceCfParenGroups(cfHtml, (full, inner) => {
    if (/[\uAC00-\uD7A3\u3131-\u318E]/.test(inner)) return full;
    if (!/[A-Za-z]/.test(inner)) return full;
    const i = idx;
    idx += 1;
    return `<span class="cf-en-paren" data-cf-index="${i}">(${wrapCfEnglishWords(inner)})</span>`;
  });
}

/** cf 안 한글만 별도 span — 나눔 바른펜·크기 조정용 */
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

/** cf 본문 영어(괄호 밖·이미 감싼 괄호 제외)를 cf-en-word로 감싸 색상·TTS 하이라이트용 */
function wrapCfRemainingEnglish(html) {
  const temp = document.createElement("span");
  temp.innerHTML = String(html || "");
  const wrapTextNode = (node) => {
    const text = node.nodeValue;
    if (!text) return;
    const frag = document.createDocumentFragment();
    const wordRe = /[A-Za-z0-9][A-Za-z0-9.'-]*/g;
    let last = 0;
    let m;
    while ((m = wordRe.exec(text))) {
      if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
      const span = document.createElement("span");
      span.className = "cf-en-word";
      span.textContent = m[0];
      frag.appendChild(span);
      last = m.index + m[0].length;
    }
    if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    if (last === 0) frag.appendChild(document.createTextNode(text));
    node.parentNode.replaceChild(frag, node);
  };
  const walk = (parent) => {
    Array.from(parent.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) wrapTextNode(n);
      else if (
        n.nodeType === Node.ELEMENT_NODE &&
        !n.classList.contains("cf-en-paren") &&
        !n.classList.contains("cf-ko-paren")
      ) {
        walk(n);
      }
    });
  };
  walk(temp);
  return temp.innerHTML;
}

/** 한글이 포함된 cf 괄호(번역 블록) — 안의 중첩 영어도 나눔 바른펜 적용용 */
function markCfKoreanBlocks(html) {
  const temp = document.createElement("span");
  temp.innerHTML = String(html || "");
  temp.querySelectorAll(".cf-en-paren").forEach((el) => {
    if (el.querySelector(".cf-ko")) el.classList.add("cf-ko-block");
  });
  return temp.innerHTML;
}

function createTitleElement(item, globalIndex, mode = "normal") {
  const titleInfo = getTitleInfo(item);
  const el = document.createElement("article");
  el.className = "ticker-item group-title-item";
  el.dataset.index = String(globalIndex);
  el.dataset.itemType = "title";
  const initialText = titleInfo.text;
  el.innerHTML = `
    <div class="group-title-banner">
      <span class="group-title-text" data-full-title="${titleInfo.text}">${initialText}</span>
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

function buildGroups() {
  const groups = [];
  let current = null;
  json1.forEach((item, index) => {
    if (isTitleItem(item)) {
      current = { titleIndex: index, titleItem: item, wordIndices: [] };
      groups.push(current);
    } else if (isWordItem(item) && current) {
      current.wordIndices.push(index);
    }
  });
  return groups;
}

/** title은 그룹핑만 하고 화면에는 노출하지 않음 → 슬롯 전부 단어로 채움 */
const WORDS_PER_PAGE = Math.max(1, VISIBLE_COUNT);

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

  const stage = PROGRESS_BAR_STAGES[stageIndex];
  runner.textContent = stage[0];
  runner.dataset.motion = stage[1];
  runner.dataset.barTheme = "barA";
}

function getTotalWordCount() {
  return json1.filter(isWordItem).length;
}

/** 진행도 total = JSON 단어 수 × 반복(패스) 횟수 */
function getProgressTotal() {
  return getTotalWordCount() * Math.max(1, EN_KO_PASS_COUNT);
}

function updateProgress(current, total = getProgressTotal()) {
  const label = document.getElementById("progress-label");
  const fill = document.getElementById("progress-fill");
  const pctEl = document.getElementById("progress-pct");
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  const pct = safeTotal > 0 ? Math.round((safeCurrent / safeTotal) * 100) : 0;

  if (label) label.textContent = `진행도 ${safeCurrent} / ${safeTotal}`;
  if (fill) {
    fill.style.width = `${pct}%`;
    fill.classList.toggle("has-pct", pct > 0);
    if (pct >= 100 && fill.dataset.confettiDone !== "true") {
      fill.dataset.confettiDone = "true";
      burstProgressConfetti();
    } else if (pct < 100) {
      fill.dataset.confettiDone = "false";
    }
  }
  if (pctEl) pctEl.textContent = `${pct}%`;
  updateProgressRunner(pct);
}

function renderStaticList() {
  const groups = buildGroups();
  if (!groups.length) return;
  document.body.classList.add("is-preview-all");
  renderGroupWindow(groups[0], 0, false, "preview-all");
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

/** 영어 스펠링 수 + 한글 글자 수 ≥ WORD_LINE_STACK_MIN_CHARS 이면 2줄 배치 */
function shouldStackWordLine(en, ko) {
  return countEnSpellLetters(en) + countKoChars(ko) >= WORD_LINE_STACK_MIN_CHARS;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const num = getWordDisplayNumber(globalIndex);
  const targetWord = String(item.en || "").trim();
  const cfRaw = normalizeCfEnKoSpacing(String(item.cf || "").trim());
  const hintText = String(item.hint || "").trim();

  if (mode === "preview-all") {
    el.classList.add("preview-all-item", "ko-first-mode");
    const { enPart, koPart } = splitCfEnKoParts(cfRaw);
    const cfEnHtml = buildCfEnOnlyHtml(enPart, targetWord);
    const enMainHtml = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-main-text">${escapeEnHtml(item.en)}</span></span>`;
    const pronunciation = String(item.pronunciation || "").trim();
    const ipaVal = String(item.ipa || "").trim();
    const pronHtmlParts = [];
    const pronPlainParts = [];
    if (pronunciation) {
      pronHtmlParts.push(`|${pronunciation}|`);
      pronPlainParts.push(`|${pronunciation}|`);
    }
    if (ipaVal) {
      pronHtmlParts.push(`<span class="pron-ipa">${ipaVal}</span>`);
      pronPlainParts.push(ipaVal);
    }
    const pronDisplay = pronHtmlParts.join(" ");
    const pronPlain = pronPlainParts.join(" ");
    const pronLine = pronDisplay
      ? `<div class="pron-line preview-stack-block preview-stack-pron"><div class="pron-row"><span class="pron-text" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span></div></div>`
      : "";
    const koLine = `<div class="word-line word-line-stack preview-stack-block preview-stack-ko"><span class="ko-text" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(item.ko || "")}</span></div>`;
    const cfEnLine = cfEnHtml
      ? `<div class="preview-stack-block preview-stack-cf-en"><div class="pron-line"><div class="pron-row"><span class="cf-note"><span class="cf-line">${cfEnHtml}</span></span></div></div></div>`
      : "";
    const cfKoLine = koPart
      ? `<div class="preview-stack-block preview-stack-cf-ko"><div class="pron-line"><div class="pron-row"><span class="cf-note"><span class="cf-ko-paren">${escapeEnHtml(koPart)}</span></span></div></div></div>`
      : "";
    const hintLine = hintText
      ? `<div class="preview-stack-block preview-stack-hint"><span class="cf-note"><span class="cf-hint">${escapeEnHtml(hintText)}</span></span></div>`
      : "";

    el.innerHTML = `
      <div class="word-row word-row-no-num">
        <span class="order-num" aria-hidden="true">${num}.</span>
        <div class="word-content word-content-preview">
          <div class="word-line word-line-stack preview-stack-block preview-stack-en">${enMainHtml}</div>
          ${pronLine}
          ${koLine}
          ${cfEnLine}
          ${cfKoLine}
          ${hintLine}
        </div>
      </div>
    `;
    return el;
  }

  if (mode === "second-pass") el.classList.add("ko-first-mode", "second-pass-mode");
  const showPreview = mode === "second-pass";
  const enHiddenClass = showPreview ? " hidden-en-main" : "";
  const previewHiddenClass = showPreview ? "" : " hidden-en-preview";
  const mask = buildEnPreviewMask(item.en);
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  const koContent = mode === "second-pass" ? (item.ko || "") : "";
  const enMainHtml = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview${previewHiddenClass}">${escapeEnHtml(mask)}</span><span class="en-main-text${enHiddenClass}">${escapeEnHtml(item.en)}</span></span>`;
  const koHtml = `<span class="ko-text${koHiddenClass}" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(koContent)}</span>`;
  const stack = shouldStackWordLine(item.en, item.ko);
  const wordLine = stack
    ? `<span class="en-row">${enMainHtml}<span class="en-colon"> :</span></span>${koHtml}`
    : `${enMainHtml} : ${koHtml}`;
  const wordLineClass = stack ? "word-line word-line-stack" : "word-line";
  const cfText = cfRaw;
  const cfTextWithUnderline = wrapCfRemainingEnglish(
    wrapCfParenEnglish(wrapCfKoParenBlocks(underlineTargetInCf(cfText, targetWord)))
  );
  const hintHtml = hintText
    ? `<span class="cf-hint hidden-cf-hint" data-full-hint="${escapeAttr(hintText)}">${escapeEnHtml(hintText)}</span>`
    : "";
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf"><span class="cf-line"><span class="cf-abbr">cf.</span> ${cfTextWithUnderline}</span>${hintHtml}</span>`
    : "";
  const pronHiddenClass = mode === "second-pass" ? " hidden-pron-text" : "";
  const pronunciation = String(item.pronunciation || "").trim();
  const ipa = String(item.ipa || "").trim();
  const pronHtmlParts = [];
  const pronPlainParts = [];
  if (pronunciation) {
    pronHtmlParts.push(`|${pronunciation}|`);
    pronPlainParts.push(`|${pronunciation}|`);
  }
  if (ipa) {
    pronHtmlParts.push(`<span class="pron-ipa">${ipa}</span>`);
    pronPlainParts.push(ipa);
  }
  const pronDisplay = pronHtmlParts.join(" ");
  const pronPlain = pronPlainParts.join(" ");
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${cfHtml}</div></div>`;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <span class="order-num" aria-hidden="true">${num}.</span>
      <div class="word-content">
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

function resolvePageBgColor() {
  if (window.Mark3readPageBg && typeof window.Mark3readPageBg.getPageBgColor === "function") {
    return window.Mark3readPageBg.getPageBgColor();
  }
  return PAGE_BG_COLOR_DEFAULT;
}

function initSharedThumbTextColorPicker() {
  if (!window.Mark3readThumbTextColors) {
    window.setTimeout(initSharedThumbTextColorPicker, 50);
    return;
  }
  window.Mark3readThumbTextColors.initPicker({
    storageKey: "mark3read_thumb_text_colors_layout1thumb2_v6",
    defaults: THUMB_TEXT_COLOR_DEFAULTS,
    onApply: () => applyThumbTypography(),
  });
}

function resolveThumbAppearancePresetFromBg(bgHex) {
  const norm = String(bgHex || "").trim().toLowerCase();
  return norm === THUMB_APPEARANCE_PRESET_A_BG ? "A" : "B";
}

function updateThumbAppearancePresetUi(activePreset) {
  const root = document.getElementById("thumb-appearance-presets");
  if (!root) return;
  root.querySelectorAll(".thumb-appearance-presets__btn").forEach((btn) => {
    const on = btn.dataset.preset === activePreset;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
}

function syncThumbAppearancePresetUi() {
  updateThumbAppearancePresetUi(resolveThumbAppearancePresetFromBg(resolvePageBgColor()));
}

function applyThumbAppearancePreset(preset) {
  const key = preset === "A" ? "A" : "B";
  const bgHex = key === "A" ? THUMB_APPEARANCE_PRESET_A_BG : PAGE_BG_COLOR_DEFAULT;
  window.Mark3readPageBg?.setPageBgColor?.(bgHex, true);
  applyPageBackground();
  applyThumbTypography();
  try {
    window.localStorage.setItem(THUMB_APPEARANCE_PRESET_STORAGE_KEY, key);
  } catch (_) {}
  updateThumbAppearancePresetUi(key);
}

function resetThumbAppearanceDefaults() {
  applyThumbAppearancePreset("B");
}

function initThumbAppearancePresetButtons() {
  if (document.getElementById("thumb-appearance-presets")) return;

  const root = document.createElement("div");
  root.id = "thumb-appearance-presets";
  root.className = "thumb-appearance-presets";
  root.setAttribute("role", "group");
  root.setAttribute("aria-label", "외형 프리셋 A/B");

  [
    {
      id: "A",
      title: "A — thumball_long 배경·텍스트 전체 초기화 (#2F3543)",
    },
    {
      id: "B",
      title: "B — 뮤트 실버 배경·텍스트 (현재 버전)",
    },
  ].forEach(({ id, title }) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "thumb-appearance-presets__btn";
    btn.dataset.preset = id;
    btn.textContent = id;
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.addEventListener("click", () => applyThumbAppearancePreset(id));
    root.appendChild(btn);
  });

  document.body.appendChild(root);
  syncThumbAppearancePresetUi();
}

function initThumbDefaultKeyListener() {
  window.addEventListener("keydown", (e) => {
    if (e.defaultPrevented || e.repeat) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const tag = String(e.target?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || e.target?.isContentEditable) return;
    if (e.key === "d" || e.key === "D") {
      resetThumbAppearanceDefaults();
    }
    if (e.key === "a" || e.key === "A") {
      applyThumbAppearancePreset("A");
    }
    if (e.key === "b" || e.key === "B") {
      applyThumbAppearancePreset("B");
    }
  });
}

function hideThumbPickers() {
  window.Mark3readPageBg?.hidePageBgPicker?.();
  window.Mark3readThumbTextColors?.hidePicker?.();
  document.getElementById("thumb-appearance-presets")?.classList.add("thumb-appearance-presets--hidden");
}

function initSharedPageBgPicker() {
  if (!window.Mark3readPageBg) {
    window.setTimeout(initSharedPageBgPicker, 50);
    return;
  }
  window.Mark3readPageBg.configure({
    defaultHex: PAGE_BG_COLOR_DEFAULT,
    onApply: () => {
      applyPageBackground();
      syncThumbAppearancePresetUi();
    },
  });
  window.Mark3readPageBg.mountPageBgColorPicker();
}

function applyPageBackground() {
  const pageBgColor = resolvePageBgColor();
  const photoUrl = new URL(PAGE_BG_IMAGE, document.baseURI);
  photoUrl.searchParams.set("v", String(Date.now()));
  const photoSrc = photoUrl.href;

  document.documentElement.style.setProperty("--page-bg-color", pageBgColor);
  document.documentElement.style.setProperty("--page-bg-base-image", "none");
  document.documentElement.style.setProperty("--page-bg-image", `url("${photoSrc}")`);
  document.documentElement.style.setProperty("background-color", pageBgColor, "important");
  document.documentElement.style.setProperty("background-image", "none", "important");
  document.documentElement.classList.toggle(
    "is-light-page-bg",
    window.Mark3readPageBg?.isLightPageBg?.(pageBgColor) ?? false
  );
  document.documentElement.classList.add("has-paper-bg");

  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundColor = pageBgColor;
    bgEl.style.backgroundImage = `url("${photoSrc}")`;
    bgEl.style.setProperty("--page-bg-color", pageBgColor);
  }

  window.Mark3readPageBg?.updatePageBgPickerUi?.();
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

function getTTSUrl(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
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

/** cfSpeakRates: cf 괄호 영어 재생 속도 (예: [1.3, 0.85] = 빠르게 1번 + 천천히 1번) */
function getCfSpeakRates(word) {
  if (!Array.isArray(word?.cfSpeakRates) || !word.cfSpeakRates.length) return [1];
  const rates = word.cfSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
  return rates.length ? rates : [1];
}

/** cf 괄호 안 영어 구문 배열 (한글만 있는 괄호는 제외) */
function extractCfParenEnglishParts(cfText) {
  const text = String(cfText || "");
  const parts = [];
  const re = /\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const inner = String(match[1] || "").trim();
    if (inner && /[A-Za-z]/.test(inner)) parts.push(inner);
  }
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
  return [];
}

/** 괄호 안 영어 구문이 있으면 cf 영어를 읽음. cfSpeakRates가 있으면 그 속도로 재생 */
function shouldSpeakCfEnglish(word) {
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getWordEnRepeat(word) {
  const n = Math.floor(Number(word?.enRepeat));
  return Number.isFinite(n) && n >= 0 ? n : 1;
}

/** preview autoplay용 — cf 본문 영어(끝 한글 괄호 제외) */
function getCfEnSpeakText(word) {
  const cf = normalizeCfEnKoSpacing(String(word?.cf || "").trim());
  if (!cf) return "";
  const { enPart } = splitCfEnKoParts(cf);
  if (enPart && /[A-Za-z]/.test(enPart)) return enPart;
  const parenParts = extractCfParenEnglishParts(cf);
  if (parenParts.length) return parenParts.join(" ");
  return "";
}

function shouldAutoplayCf(word) {
  if (getWordEnRepeat(word) < 1) return false;
  if (shouldSpeakCf2(word)) return Boolean(getCf2EnSpeakText(word));
  return Boolean(getCfEnSpeakText(word));
}

/** cf2 — 2차 읽기 (cf2Lines 우선, 없으면 cf2 문자열) */
function shouldSpeakCf2(word) {
  if (Array.isArray(word?.cf2Lines) && word.cf2Lines.length) return true;
  return Boolean(String(word?.cf2 || "").trim());
}

function getCf2SpeakSegments(word) {
  const lines = word?.cf2Lines;
  if (Array.isArray(lines) && lines.length) {
    const segments = [];
    lines.forEach((row) => {
      const en = String(row?.en || "").trim();
      const ko = String(row?.ko || "").trim();
      if (en) segments.push({ lang: "en", text: en });
      if (ko) segments.push({ lang: "ko", text: ko });
    });
    return segments;
  }
  return parseCf2SpeakSegments(word?.cf2);
}

function parseCf2SpeakSegments(cf2Text) {
  const text = String(cf2Text || "").trim();
  if (!text) return [];
  const segments = [];
  let i = 0;
  while (i < text.length) {
    const open = text.indexOf("(", i);
    if (open < 0) {
      const tail = text.slice(i).replace(/\s+/g, " ").trim();
      if (tail) {
        const lang = /[가-힣]/.test(tail) && !/[A-Za-z]/.test(tail) ? "ko" : "en";
        segments.push({ lang, text: tail.replace(/\.\s*$/, "").trim() || tail });
      }
      break;
    }
    const enPart = text.slice(i, open).replace(/\s+/g, " ").trim();
    if (enPart) segments.push({ lang: "en", text: enPart });
    const close = text.indexOf(")", open + 1);
    if (close < 0) break;
    const inner = text.slice(open + 1, close).replace(/\s+/g, " ").trim();
    if (inner) {
      segments.push({ lang: /[가-힣]/.test(inner) ? "ko" : "en", text: inner });
    }
    i = close + 1;
  }
  return segments.filter((s) => s.text);
}

function getCf2EnSpeakText(word) {
  const seg = getCf2SpeakSegments(word).find((s) => s.lang === "en");
  return String(seg?.text || "").replace(/\.\s*$/, "").trim();
}

function getCf2KoSpeakText(word) {
  const raw = getCf2SpeakSegments(word)
    .filter((s) => s.lang === "ko")
    .map((s) => String(s.text || "").trim())
    .filter(Boolean)
    .join(" ");
  return extractKoFromCf2CommaText(raw);
}

/** cf2 괄호 — "Experts, 전문가들은, weekend, 주말에" 형식에서 한글만 추출 */
function extractKoFromCf2CommaText(text) {
  const t = String(text || "").trim();
  if (!t) return "";
  if (!t.includes(",")) return t;
  const parts = t.split(",").map((s) => s.trim()).filter(Boolean);
  const hasEnKoPairs = parts.some((p) => /^[A-Za-z0-9]/.test(p))
    && parts.some((p) => /[\uAC00-\uD7A3]/.test(p));
  if (!hasEnKoPairs) return t;
  return parts.filter((p) => /[\uAC00-\uD7A3]/.test(p)).join(", ");
}

function parseCf2ParenSegment(part) {
  const text = String(part || "").trim();
  if (!text) return { en: "", ko: "" };
  const hangulIdx = text.search(/[\uAC00-\uD7A3]/);
  if (hangulIdx < 0) return { en: text, ko: "" };
  if (hangulIdx === 0) return { en: "", ko: text };
  return {
    en: text.slice(0, hangulIdx).trim(),
    ko: text.slice(hangulIdx).trim(),
  };
}

function getCf2ParenPairs(innerText) {
  const parts = String(innerText || "").split(",").map((s) => s.trim()).filter(Boolean);
  return parts.map(parseCf2ParenSegment).filter((p) => p.en || p.ko);
}

function getCfHighlightElsForPhrase(allCfWords, phrase, startIndex = 0) {
  if (!allCfWords.length) return [];
  const slice = allCfWords.slice(Math.max(0, startIndex));
  let els = getWordElsMatchingSpeakText(slice, phrase);
  if (els.length) return els;
  const trimmed = String(phrase || "").replace(/\.\s*$/, "").trim();
  if (trimmed && trimmed !== phrase) {
    els = getWordElsMatchingSpeakText(slice, trimmed);
    if (els.length) return els;
  }
  return [];
}

function getCfDisplayWordEls(itemEl) {
  const cfNote = itemEl?.querySelector(".preview-stack-cf-en .cf-note, .cf-note");
  if (!cfNote) return [];
  return Array.from(cfNote.querySelectorAll(".cf-line .cf-en-word, .cf-en-word"));
}

/**
 * cf2 TTS — 화면은 cf, 읽기는 cf2.
 * 본문 영어(괄호 앞)는 EN TTS·밑줄 없음.
 * 괄호 속 영어·한글은 모두 KO 여성 TTS(단어 ko와 동일), 영어 읽을 때 cf 밑줄.
 */
async function playCf2PreviewSpeak(itemEl, word) {
  const segments = getCf2SpeakSegments(word);
  if (!segments.length || !itemEl) return;
  const allCfWords = getCfDisplayWordEls(itemEl);
  const enRates = getCfSpeakRates(word);
  let activeHighlightEls = [];

  const clearCf2Underline = () => {
    activeHighlightEls.forEach((el) => {
      el.classList.remove("is-cf2-speaking");
      el.closest("u")?.classList.remove("is-cf2-speaking");
    });
    itemEl.querySelectorAll(".cf-note .is-cf2-speaking").forEach((el) => {
      el.classList.remove("is-cf2-speaking");
    });
    activeHighlightEls = [];
  };

  /** cf2 괄호 영어는 문장 순서와 다를 수 있어 매번 cf 처음부터 검색 */
  const underlineCfPhrase = (phrase) => {
    clearCf2Underline();
    const highlightEls = getCfHighlightElsForPhrase(allCfWords, phrase, 0);
    activeHighlightEls = highlightEls;
    highlightEls.forEach((el) => {
      el.classList.add("is-cf2-speaking");
      el.closest("u")?.classList.add("is-cf2-speaking");
    });
  };

  try {
    for (let i = 0; i < segments.length; i += 1) {
      const seg = segments[i];
      if (seg.lang === "en") {
        const speakText = String(seg.text || "").replace(/\.\s*$/, "").trim();
        if (!speakText) continue;
        try {
          await playEnTTS(speakText, enRates, null);
        } catch (_) {}
      } else if (AUTOPLAY_READ_CF_KO) {
        await sleep(CF_KO_AFTER_EN_PAUSE_MS);
        const pairs = getCf2ParenPairs(seg.text);
        for (let p = 0; p < pairs.length; p += 1) {
          const pair = pairs[p];
          const enTok = String(pair.en || "").trim();
          const koTok = String(pair.ko || "").trim();
          let keepUnderline = false;
          if (enTok && /[A-Za-z]/.test(enTok)) {
            underlineCfPhrase(enTok);
            keepUnderline = true;
            try {
              await playCf2ParenKoTTS(enTok, word);
            } catch (_) {}
          }
          if (koTok && /[\uAC00-\uD7A3]/.test(koTok)) {
            try {
              await playCf2ParenKoTTS(koTok, word);
            } catch (_) {}
          }
          if (keepUnderline) clearCf2Underline();
          if (p < pairs.length - 1) await sleep(80);
        }
      }
      if (i < segments.length - 1 && seg.lang === "en") await sleep(120);
    }
  } finally {
    clearCf2Underline();
  }
}

function prepareExampleKoForTts(text) {
  let t = String(text || "").trim();
  if (!t) return "";
  t = t.replace(/[''""「」『』]/g, "");
  t = t.replace(/~(?=로)/g, "무엇으").replace(/~/g, "무엇");
  t = t.replace(/([가-힣]{2,})의(?=\s+[가-힣])/g, "$1의");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

/** cf2 괄호 한글 — TTS용 (영어 표기 → 한글 발음 보정) */
function prepareCf2KoForTts(text, word = null) {
  let t = prepareExampleKoForTts(text);
  if (!t) return "";

  t = t.replace(/여기\s+저기/g, "여기저기");
  t = t.replace(/뜻\s+(입니다|이에요|예요)/g, "뜻$1");
  t = t.replace(/([가-힣]+다)\s+뜻(입니다|이에요|예요)/g, "$1는 뜻$2");
  t = t.replace(/용감한\s+용맹한/g, "용감하고 용맹한");
  t = t.replace(/명확하지\s+않습니다/g, "명확하지 않습니다");

  const pron = String(word?.pronunciation || "").trim();
  const en = String(word?.en || "").trim();
  if (en && pron) {
    generateEnglishForms(en)
      .sort((a, b) => b.length - a.length)
      .forEach((form) => {
        t = t.replace(new RegExp(`\\b${escapeRegExp(form)}\\b`, "gi"), pron);
      });
  }

  t = t.replace(/([가-힣]+)\s+(동사|명사|형용사|부사)(로)/g, "$1, $2$3");
  t = t.replace(/([가-힣]+)\s+(용감|어원)/g, "$1, $2");
  if (/단어에서\s*$/.test(t)) {
    t = t.replace(/단어에서\s*$/, "단어에서 유래했습니다");
  }

  t = t.replace(/\s+\./g, ".");
  t = t.replace(/\.\s+/g, ". ");
  t = t.replace(/,\s*,/g, ",");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

async function playCf2ParenKoTTS(text, word) {
  const raw = String(text || "").trim();
  if (!raw) return;
  const speakText = /[\uAC00-\uD7A3]/.test(raw)
    ? prepareCf2KoForTts(raw, word)
    : raw;
  await playKoTTS(speakText);
}

async function playCf2KoTTS(rawText, word) {
  await playCf2ParenKoTTS(rawText, word);
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  return extractCfParenEnglishParts(word?.cf);
}

/** 구문별로 TTS 재생하며 읽는 영어 단어를 순서대로 하이라이트 */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null, options = null) {
  const parts = getCfEnglishSpeakParts(word);
  if (!parts.length || !itemEl) return;
  const coreOnly = Boolean(options?.coreOnly);
  const rates = Array.isArray(ratesOverride) && ratesOverride.length
    ? ratesOverride
    : getCfSpeakRates(word);
  for (let i = 0; i < parts.length; i += 1) {
    const speakText = coreOnly
      ? extractCfCoreEnglish(parts[i], word?.en)
      : parts[i];
    if (!String(speakText || "").trim()) continue;
    const parenEl = itemEl.querySelector(`.cf-en-paren[data-cf-index="${i}"]`);
    const allWordEls = parenEl
      ? Array.from(parenEl.querySelectorAll(".cf-en-word"))
      : [];
    const wordEls = coreOnly
      ? getWordElsMatchingSpeakText(allWordEls, speakText)
      : allWordEls;
    try {
      await playEnTTS(speakText, rates, wordEls);
    } finally {
      wordEls.forEach((el) => el.classList.remove("is-speaking"));
    }
    if (i < parts.length - 1) await sleep(120);
  }
}

/** preview-all: cf 본문 영어 TTS + .cf-en-word 하이라이트 */
async function playPreviewCfEnglishWithHighlight(itemEl, word) {
  const speakText = getCfEnSpeakText(word);
  if (!speakText || !itemEl) return;
  const cfBlock = itemEl.querySelector(".preview-stack-cf-en");
  const wordEls = cfBlock ? Array.from(cfBlock.querySelectorAll(".cf-en-word")) : [];
  try {
    await playEnTTS(speakText, getCfSpeakRates(word), wordEls.length ? wordEls : null);
  } finally {
    wordEls.forEach((el) => el.classList.remove("is-speaking"));
  }
}

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;

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
  const blob = await response.blob();
  const audio = new Audio(URL.createObjectURL(blob));
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

async function playEnTTS(text, rates = [1], wordEls = null, highlightClass = "is-speaking") {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  for (let i = 0; i < rateList.length; i += 1) {
    if (i > 0) await sleep(160);
    await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i], wordEls, highlightClass);
  }
}

async function playKoTTS(textOrWord) {
  const voice = resolveKoTtsVoiceId("ko-KR");
  let rawKo = textOrWord;
  if (textOrWord && typeof textOrWord === "object") {
    const override = String(textOrWord.koTts || "").trim();
    if (override) {
      await playBackendTTS(override, voice, KO_TTS_PLAYBACK_RATE);
      return;
    }
    rawKo = textOrWord.ko;
  }
  const koText = getKoSpeakText(rawKo);
  if (!koText) return;
  await playBackendTTS(koText, voice, KO_TTS_PLAYBACK_RATE);
}

function getCfKoSpeakText(word) {
  const cf = String(word?.cf || "").trim();
  if (!cf) return "";
  const { koPart } = splitCfEnKoParts(cf);
  if (!koPart) return "";
  return koPart.replace(/^\(|\)$/g, "").trim();
}

function preloadKoTTS(word) {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadCf2TTS(word) {
  if (!shouldSpeakCf2(word)) return;
  const voice = resolveEnTtsVoiceId("en-US");
  const enText = getCf2EnSpeakText(word);
  if (enText) loadBackendTTSAudio(enText, voice).catch(() => {});
  const koText = prepareCf2KoForTts(getCf2KoSpeakText(word), word);
  if (koText) loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadCfEnglishTTS(word) {
  if (shouldSpeakCf2(word)) {
    preloadCf2TTS(word);
    return;
  }
  const voice = resolveEnTtsVoiceId("en-US");
  const enText = getCfEnSpeakText(word);
  if (enText) {
    loadBackendTTSAudio(enText, voice).catch(() => {});
    const core = extractCfCoreEnglish(enText, word?.en);
    if (core && core !== enText) {
      loadBackendTTSAudio(core, voice).catch(() => {});
    }
    return;
  }
  const parts = getCfEnglishSpeakParts(word);
  parts.forEach((part) => {
    loadBackendTTSAudio(part, voice).catch(() => {});
    const core = extractCfCoreEnglish(part, word?.en);
    if (core && core !== part) {
      loadBackendTTSAudio(core, voice).catch(() => {});
    }
  });
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadEnTTS(word);
  preloadKoTTS(word);
  if (globalIndex >= 0 && shouldAutoplayCf(word)) preloadCfEnglishTTS(word);
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

function startWordHighlightSync(audio, wordEls, highlightClass = "is-speaking") {
  if (!audio || !Array.isArray(wordEls) || !wordEls.length) return () => {};
  const weights = wordEls.map((el) => estimateSpokenHighlightWeight(el.textContent));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let current = -1;
  let raf = 0;

  const setActive = (idx) => {
    if (idx === current) return;
    if (current >= 0 && wordEls[current]) {
      wordEls[current].classList.remove(highlightClass);
      if (highlightClass === "is-cf2-speaking") {
        wordEls[current].closest("u")?.classList.remove(highlightClass);
      }
    }
    current = idx;
    if (current >= 0 && wordEls[current]) {
      wordEls[current].classList.add(highlightClass);
      if (highlightClass === "is-cf2-speaking") {
        wordEls[current].closest("u")?.classList.add(highlightClass);
      }
    }
  };

  const clear = () => {
    wordEls.forEach((el) => {
      el.classList.remove(highlightClass);
      if (highlightClass === "is-cf2-speaking") {
        el.closest("u")?.classList.remove(highlightClass);
      }
    });
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

async function playAudioElement(audio, playbackRate = 1, wordEls = null, highlightClass = "is-speaking") {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.currentTime = 0;

  const stopHighlight = startWordHighlightSync(audio, wordEls, highlightClass);

  try {
    await audio.play();
  } catch (_) {
    stopHighlight();
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  stopHighlight();
  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

async function playBackendTTS(text, languageKey, playbackRate = 1, wordEls = null, highlightClass = "is-speaking") {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate, wordEls, highlightClass);
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
  clearKoHand(koTextEl);
}

/** 손이 왼쪽→오른쪽으로 이동하며 한글이 드러남 — 실제 필기처럼 불규칙한 속도 */
async function writeKoWithHand(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
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
  clearKoHand(koTextEl);
}

function clearKoHand(koTextEl) {
  koTextEl?.classList.remove("ko-hand", "ko-reserving", "ko-writing");
  koTextEl?.style.removeProperty("--ko-write-p");
}

/** 한글 읽기 직후: 현재 손 제거 → 같은 페이지의 다음 단어에 손 미리 배치 */
function moveKoHandToNext(group, wordIndexInGroup) {
  const currentGlobalIndex = group.wordIndices[wordIndexInGroup];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  clearKoHand(currentItem?.querySelector(".ko-text"));

  const nextWordIndexInGroup = wordIndexInGroup + 1;
  if (nextWordIndexInGroup >= group.wordIndices.length) return;

  // 다음 페이지로 넘어가야 하면 DOM에 아직 없음 → 페이지 전환 후 reserve
  if (nextWordIndexInGroup % WORDS_PER_PAGE === 0) return;

  const nextGlobalIndex = group.wordIndices[nextWordIndexInGroup];
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

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 불규칙하게 씀
 *  발음(IPA 포함)은 영어 쓰기 시작과 동시에 한번에 노출
 */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  if (!text) {
    revealEnText(enTextEl, fallback);
    if (pronTextEl) revealPronText(pronTextEl);
    return;
  }

  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);
  // 발음은 타이핑/클립 없이 한꺼번에 표시
  revealPronText(pronTextEl);

  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.remove("hidden-en-main", "en-reserving", "en-writing", "en-partial-preview");
    clearEnHand(enTextEl);
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
  clearEnHand(enTextEl);
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

/** 영어 읽기 직후: 현재 손 제거 → 같은 페이지의 다음 단어 영어에 손 미리 배치 */
function moveEnHandToNext(group, wordIndexInGroup) {
  const currentGlobalIndex = group.wordIndices[wordIndexInGroup];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  clearEnHand(currentItem?.querySelector(".en-main-text"));

  const nextWordIndexInGroup = wordIndexInGroup + 1;
  if (nextWordIndexInGroup >= group.wordIndices.length) return;
  if (nextWordIndexInGroup % WORDS_PER_PAGE === 0) return;

  const nextGlobalIndex = group.wordIndices[nextWordIndexInGroup];
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

function revealEnText(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const enMain = enTextEl.closest(".en-main");
  const text = enMain?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main", "en-partial-preview");
  hideEnPreview(enTextEl);
}

function triggerSoftReveal(el) {
  if (!el) return;
  el.classList.remove("is-reveal-in");
  void el.offsetWidth;
  el.classList.add("is-reveal-in");
  el.addEventListener(
    "animationend",
    () => {
      el.classList.remove("is-reveal-in");
    },
    { once: true }
  );
}

function revealCfNote(cfNoteEl) {
  if (!cfNoteEl) return;
  if (!cfNoteEl.classList.contains("hidden-cf")) return;
  cfNoteEl.classList.remove("hidden-cf");
  triggerSoftReveal(cfNoteEl);
}

function revealCfHint(cfNoteEl) {
  if (!cfNoteEl) return;
  const cfHintEl = cfNoteEl.querySelector(".cf-hint");
  if (!cfHintEl || !cfHintEl.classList.contains("hidden-cf-hint")) return;
  const text = cfHintEl.dataset.fullHint || "";
  if (text) cfHintEl.textContent = text;
  cfHintEl.classList.remove("hidden-cf-hint");
  triggerSoftReveal(cfHintEl);
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.remove("is-reveal-in");
    el.classList.add("hidden-cf");
    el.querySelectorAll(".cf-hint").forEach((hint) => {
      hint.classList.add("hidden-cf-hint");
      hint.classList.remove("is-reveal-in");
    });
  });
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  hideThumbPickers();
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  pickRandomEnTtsVoice();

  document.body.classList.add("is-preview-all", "is-preview-read");
  document.body.classList.remove("is-review-mode");
  const prevReview = document.getElementById("review-root");
  if (prevReview) {
    prevReview.hidden = true;
    prevReview.classList.remove("is-visible");
  }
  const wrapper = document.querySelector("main.wrapper");
  if (wrapper) {
    wrapper.style.visibility = "";
    wrapper.classList.remove("is-fading-out", "is-review-dim");
  }

  const groups = buildGroups();
  const progressTotal = getProgressTotal();
  let doneCount = 0;
  updateProgress(0, progressTotal);

  if (!groups.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  preloadWordsAhead(0, json1.length);
  await sleep(800);

  for (let g = 0; g < groups.length; g += 1) {
    const group = groups[g];
    if (g === 0) {
      renderGroupWindow(group, 0, false, "preview-all");
    } else {
      await shiftToNextGroup(group, "preview-all");
    }

    for (let w = 0; w < group.wordIndices.length; w += 1) {
      const globalIndex = group.wordIndices[w];
      if (w > 0 && w % WORDS_PER_PAGE === 0) {
        await shiftGroupWordsDown(group, w, "preview-all");
      }

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      item.classList.add("is-word-active");
      const wordData = json1[globalIndex];
      preloadEnTTS(wordData);
      if (AUTOPLAY_READ_WORD_KO) preloadKoTTS(wordData);
      if (shouldAutoplayCf(wordData)) preloadCfEnglishTTS(wordData);

      try {
        await playEnTTS(getEnSpeakText(wordData));
      } catch (_) {}

      if (AUTOPLAY_READ_WORD_KO) {
        await sleep(350);
        try {
          await playKoTTS(wordData);
        } catch (_) {}
      }

      if (shouldAutoplayCf(wordData)) {
        if (AUTOPLAY_READ_WORD_KO) await sleep(350);
        if (shouldSpeakCf2(wordData)) {
          await playCf2PreviewSpeak(item, wordData);
        } else {
          await playPreviewCfEnglishWithHighlight(item, wordData);
          if (AUTOPLAY_READ_CF_KO) {
            const cfKoText = getCfKoSpeakText(wordData);
            if (cfKoText) {
              await sleep(CF_KO_AFTER_EN_PAUSE_MS);
              try {
                await playBackendTTS(cfKoText, resolveKoTtsVoiceId("ko-KR"), KO_TTS_PLAYBACK_RATE);
              } catch (_) {}
            }
          }
        }
      }

      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      await sleep(CF_READ_PAUSE_MS);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  await startReviewQuiz();

  document.body.classList.remove("is-preview-read");
  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

/** 정답 → 앞 3글자 + 나머지 글자 수만큼 _. 폭은 정답 sizer로 고정 */
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
  if (!blankHtml) return html;
  const replaced = html.replace(/[A-Za-z]{1,3}_+/g, blankHtml);
  if (replaced !== html) return replaced;
  return html.replace(/_{2,}/g, blankHtml);
}

/** 한글 문장에서 정답에 해당하는 어휘에 미리 밑줄 */
function formatReviewKoHtml(ko, answerKo) {
  const text = String(ko || "").trim();
  const target = String(answerKo || "").trim();
  if (!text) return "";
  const escaped = escapeEnHtml(text);
  if (!target) return escaped;
  const escTarget = escapeEnHtml(target);
  if (!escTarget || !escaped.includes(escTarget)) return escaped;
  return escaped.replace(escTarget, `<u class="rv-ko-answer">${escTarget}</u>`);
}

function buildReviewSpeakText(en) {
  return String(en || "")
    .replace(/[A-Za-z]{1,3}_+/g, "blank")
    .replace(/_{2,}/g, "blank")
    .trim();
}

/** 문장 빈칸 — 접두는 두고 _만 ✍️. 폭은 sizer로 고정해 주변 문장 위치 불변 */
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
    blankEl.classList.remove("rv-blank-writing", "rv-blank-partial", "rv-blank-hand");
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
  blankEl.classList.remove("rv-blank-writing", "rv-blank-partial", "rv-blank-hand");
  blankEl.classList.add("rv-blank-filled");
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
            <span class="countdown-num" id="countdown-num" aria-hidden="true">${COUNTDOWN_SEC}</span>
            <div class="countdown-bars" id="countdown-bars" aria-hidden="true">
              ${Array.from({ length: COUNTDOWN_SEC }, () => "<i></i>").join("")}
            </div>
          </div>
        </div>
      </div>
      <div class="rv-stack" id="rv-stack"></div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

function createReviewCard(q, index, total) {
  const card = document.createElement("div");
  card.className = "rv-card";
  card.dataset.reviewIndex = String(index);
  card.innerHTML = `
    <div class="rv-title">Review ${index + 1}/${total}</div>
    <div class="rv-en">${formatReviewEnHtml(q.en, q.answer)}</div>
    <div class="rv-ko">${formatReviewKoHtml(q.ko, q.answerKo)}</div>
    <div class="rv-answer is-hidden">${escapeEnHtml(String(q.answer || "").trim())}</div>
  `;
  return card;
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

function getCountdownStyle(item) {
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

async function fadeOutCountdownTickSound(ms = COUNTDOWN_TICK_FADE_MS) {
  const audio = countdownTickAudio;
  if (!audio) return;
  const startVol = Number(audio.volume) || 0;
  const steps = 10;
  const stepMs = Math.max(16, Math.floor(ms / steps));
  try {
    for (let i = 1; i <= steps; i += 1) {
      if (countdownTickAudio !== audio) return;
      audio.volume = Math.max(0, startVol * (1 - i / steps));
      await sleep(stepMs);
    }
  } catch (_) {}
  if (countdownTickAudio === audio) stopCountdownTickSound();
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
  const total = Math.max(1, Math.floor(Number(seconds) || COUNTDOWN_SEC));
  const style = COUNTDOWN_MODES.includes(mode) ? mode : "ring";
  setCountdownMode(style);
  wrap.hidden = false;
  startCountdownTickSound(tickSrc);

  if (style === "ring") setCountdownRing(total, total);
  if (style === "bars") setCountdownBars(total);

  try {
    // 0까지 포함한 뒤 1초 유지 — 틱 사운드가 0 표시 전에 끊기지 않도록
    for (let sec = total; sec >= 0; sec -= 1) {
      if (!isAutoplayRunning) break;
      num.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, total);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
  } finally {
    await fadeOutCountdownTickSound(COUNTDOWN_TICK_FADE_MS);
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
  const stackEl = document.getElementById("rv-stack");
  const panelEl = root.querySelector(".rv-panel");
  const wrapper = document.querySelector("main.wrapper");
  if (stackEl) stackEl.innerHTML = "";

  const showCard = async (q, index) => {
    if (!stackEl) return null;
    // 같은 자리에 한 장만 표시 — 이전 카드 제거
    stackEl.innerHTML = "";
    const card = createReviewCard(q, index, quizzes.length);
    stackEl.appendChild(card);
    void card.offsetWidth;
    card.classList.add("is-shown");
    if (index > 0) await sleep(REVIEW_FADE_MS * 0.55);
    return card;
  };

  const firstCard = await showCard(quizzes[0], 0);
  await fadeReviewIn(root, wrapper);

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    let card = i === 0 ? firstCard : null;
    if (i > 0) card = await showCard(q, i);
    if (!card) continue;

    const enEl = card.querySelector(".rv-en");
    const speakText = buildReviewSpeakText(q.en);
    if (speakText) {
      try {
        await playEnTTS(speakText);
      } catch (_) {}
    }
    await sleep(400);

    await runCountdown(
      COUNTDOWN_SEC,
      getCountdownStyle(q),
      q.countdownTick || REVIEW_COUNTDOWN_TICK
    );

    await sleep(REVIEW_REVEAL_DELAY_MS);
    await writeReviewAnswerInBlank(enEl, q.answer);
    card.classList.add("is-done");
    if (q.answer) {
      try {
        await playEnTTS(q.answer);
      } catch (_) {}
    }
    await sleep(1800);
  }

  stopCountdownTickSound();
  const { wrap } = getReviewCountdownEls();
  if (wrap) wrap.hidden = true;
  if (panelEl) panelEl.classList.remove("is-switching", "is-shown");
}

function bootThumbShell() {
  applyPageBackground();
  initSharedPageBgPicker();
  initSharedThumbTextColorPicker();
  initThumbAppearancePresetButtons();
  applyThumbTypography();
  initThumbDefaultKeyListener();
}

bootThumbShell();
if (pageTitleEl) applyPageTitle();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
