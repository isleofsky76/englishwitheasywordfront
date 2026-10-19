const PAGE_TITLE_MAIN = "시사 영단어";
const PAGE_TITLE_SUB = "XXL 사이즈 옷들은 다 어디로 갔을까요?";
const PAGE_TITLE_META = "( The Guardian | 2026/08/20 )";

/** 제목 부제를 글자 수 균형에 맞춰 항상 2줄로 나눔 */
function splitTitleSubIntoTwoLines(raw) {
  const text = String(raw || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return ["", ""];

  const chars = Array.from(text);
  const n = chars.length;
  if (n <= 2) return [text, ""];

  const lo = Math.max(1, Math.floor(n * 0.32));
  const hi = Math.min(n - 1, Math.ceil(n * 0.68));
  let bestIdx = Math.floor(n / 2);
  let bestScore = Infinity;

  for (let i = lo; i <= hi; i += 1) {
    const prev = chars[i - 1] || "";
    const curr = chars[i] || "";
    const breakAfterSpace = /\s/.test(prev);
    const breakAfterPunct = /[?!.，。？！、…'"]/.test(prev);
    const breakBeforeSpace = /\s/.test(curr);
    const isSoftBreak = breakAfterSpace || breakAfterPunct || breakBeforeSpace;
    const lenDiff = Math.abs(i - (n - i));
    const score = lenDiff + (isSoftBreak ? 0 : 10);
    if (score < bestScore) {
      bestScore = score;
      bestIdx = breakBeforeSpace && !breakAfterSpace ? i + 1 : i;
      if (bestIdx >= n) bestIdx = i;
    }
  }

  const line1 = chars.slice(0, bestIdx).join("").replace(/\s+/g, " ").trim();
  const line2 = chars.slice(bestIdx).join("").replace(/\s+/g, " ").trim();
  if (!line2) {
    const mid = Math.floor(n / 2);
    return [
      chars.slice(0, mid).join("").trim(),
      chars.slice(mid).join("").trim()
    ];
  }
  return [line1, line2];
}

function buildPageTitleHtml() {
  const [line1, line2] = splitTitleSubIntoTwoLines(PAGE_TITLE_SUB);
  const subHtml = line2
    ? `<span class="title-line">${line1}</span><span class="title-line">${line2}</span>`
    : `<span class="title-line">${line1}</span>`;
  return `<span class="title-main">${PAGE_TITLE_MAIN}</span>
<span class="title-sub-row">
  <span class="title-sub-box" aria-hidden="false">
    <span class="title-accent title-sub">${subHtml}</span>
  </span>
  <div class="title-countdown-wrap" id="title-countdown-wrap" aria-hidden="true">
    <div class="title-clock title-clock-quiet" id="title-countdown-clock">
      <svg class="title-clock-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle class="title-clock-ring-track" cx="24" cy="24" r="20"></circle>
        <circle class="title-clock-ring-progress" id="title-countdown-ring" cx="24" cy="24" r="20"
          pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"></circle>
      </svg>
      <span id="title-countdown" class="title-clock-num" aria-live="polite"></span>
    </div>
  </div>
</span>
<span class="title-meta">${PAGE_TITLE_META}</span>`;
}

/** 보이지 않는 2줄 상자에 맞춰 title-sub 글자 크기 자동 조절 */
function fitTitleSubToBox() {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  if (!box || !sub) return;

  const lines = Array.from(sub.querySelectorAll(".title-line"));
  if (!lines.length) return;

  const maxPx = Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-max-size")) || 34;
  const minPx = Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-min-size")) || 15;
  let lo = minPx;
  let hi = maxPx;
  let best = minPx;

  const fits = (size) => {
    sub.style.fontSize = `${size}px`;
    void sub.offsetWidth;
    const boxW = box.clientWidth;
    const boxH = box.clientHeight;
    if (sub.scrollHeight > boxH + 1) return false;
    return lines.every((line) => line.scrollWidth <= boxW + 1);
  };

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (fits(mid)) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  sub.style.fontSize = `${best}px`;
}

function applyPageTitle() {
  if (!pageTitleEl) return;
  pageTitleEl.innerHTML = buildPageTitleHtml();
  requestAnimationFrame(() => {
    fitTitleSubToBox();
    requestAnimationFrame(fitTitleSubToBox);
  });
}

const VISIBLE_COUNT = 1;
const EN_KO_PASS_COUNT = 1;
const EN_PREVIEW_LETTERS = 3;
const DEFAULT_STARS = 5;
/** exampleEn 핵심단어 mark 손그리기 */
const CF_MARK_DELAY_MS = 300;
const CF_MARK_MS_PER_LETTER = 110;
const CF_MARK_MS_MIN = 800;
const CF_MARK_MS_MAX = 2200;

/** 진행 바 이모지 테마 — autoplay마다 랜덤 */
const PROGRESS_BAR_THEMES = [
  {
    id: "barA",
    stages: [
      ["🚶🏻‍♂️", "walk"],
      ["🚶🏻‍♂️", "walk"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"]
    ]
  },
  {
    id: "barB",
    stages: [
      ["🚴", "bike"],
      ["🚴", "bike"],
      ["🚴", "bike"],
      ["🚴", "bike"],
      ["🚴", "bike"],
      ["🚴", "bike"]
    ]
  },
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
  {
    id: "rocket",
    stages: [
      ["🚀", "rocket"],
      ["🚀", "rocket"],
      ["🚀", "rocket"],
      ["🚀", "rocket"],
      ["🚀", "rocket"],
      ["🚀", "rocket"]
    ]
  }
];
let activeProgressBarTheme = PROGRESS_BAR_THEMES[0];
let lastProgressBarThemeId = null;

// ============================================================
// With You BGM 시작 시각 (json1 바로 위 — 여기서 수동 조정)
//   초 단위.  80=1:20  90=1:30  100=1:40  110=1:50
//   null 이면 예문 수 자동 (6개→1:20, 1개 늘면 -10초 / 줄면 +10초)
// ============================================================
const BGM_START_SEC = 52; // ← 현재 시작: 1:40 (100초)
const BGM_AUTO_BASE_WORDS = 6;
const BGM_AUTO_BASE_SEC = 80; // 1:20 @ 6단어
const BGM_AUTO_SEC_PER_WORD = 10;

///영어만 읽는 버젼.
// 예문: exampleEn + exampleKo (화면) / cf는 영어 TTS용 괄호 문장
const json1 =


[

  { "title1": "" },
  {
    "en": "inventory",
    "ko": "재고",
    "hint": "재고·상품 재고",
    "pronunciation": "인벤토리",
    "ipa": "/ˈɪnvəntɔːri/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "Last year, 3XL and 4XL made up 2% of the new inventory. This year those sizes were entirely absent.",
    "exampleKo": "지난해에는 3XL과 4XL이 신규 재고의 2%를 차지했지만, 올해는 해당 사이즈가 완전히 사라졌다.",
    "cf": "",
    "image": ""
  },
 
  {
    "en": "secondhand",
    "ko": "중고의",
    "hint": "중고의, 고물의; 중고품 매매의",
    "pronunciation": "세컨드핸드",
    "ipa": "/ˌsekəndˈhænd/",
    "pos": "형",
    "stars": 4,
    "enRepeat": 2,
    "exampleEn": "Many plus-sized customers have given up on new clothes and are turning to the secondhand market.",
    "exampleKo": "많은 플러스 사이즈 소비자들은 새 옷을 포기하고 중고시장으로 향하고 있다.",
    "cf": "",
    "image": ""
  },
  {
    "en": "perspective",
    "ko": "관점",
    "hint": "관점, 시각 (=viewpoint)",
    "pronunciation": "퍼스펙티브",
    "ipa": "/pərˈspektɪv/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "Brittany Steiger says that GLP-1s are affecting the market – but that impact should be kept in perspective.",
    "exampleKo": "민텔의 소매 및 전자상거래 부문 부책임자인 브리트니 스타이거는 GLP-1 약물이 시장에 영향을 미치고 있는 것은 사실이지만, 그 영향력을 과장 없이 객관적이고 균형 잡힌 시각으로 바라보아야 한다고 말한다.",
    "cf": "",
    "image": ""
  },
  {
    "en": "inclusivity",
    "ko": "포용성",
    "hint": "",
    "pronunciation": "인클루시비티",
    "ipa": "/ˌɪnkluːˈsɪvəti/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "GLP-1s are changing the size curve, but they’re not eliminating the need for size inclusivity.",
    "exampleKo": "GLP-1 계열 약물이 소비자의 사이즈 분포 곡선을 변화시키고 있는 것은 맞지만, 그렇다고 해서 다양한 체형을 포용하는 '사이즈 포용성(size inclusivity)'에 대한 필요성 자체를 없애고 있는 것 아니다.",
    "cf": "",
    "image": ""
  }

];

/** 학습 종료 후 Review 퀴즈 (layout2이모지와 동일: Review N/M + 빈칸 + 한글 + 정답) */
// const REVIEW_QUIZ = [
  
//   {
//     en: "There is a cry___ inside the memorial.",
//     ko: "그 기념관 안에는 지하실(예배실·납골당)이 있습니다.",
//     answer: "crypt",
//     answerKo: "지하실(예배실·납골당)"
//   },
  
// ];

const REVIEW_FADE_MS = 520;
const COUNTDOWN_SEC = 2;
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
let bgmAudio = null;
const ITEM_TRANSITION_MS = 550;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_COLOR = "#1E5943";
/** bgg.jpg / bgg.jpeg 중 Last-Modified가 더 최신인 파일 사용 */
const PAGE_BG_BASE_CANDIDATES = ["resources/bgg.jpg", "resources/bgg.jpeg"];
const PAGE_BG_BASE_FALLBACK = "resources/bgg.jpeg";
/** 하단 고정 사진 상자 (layout2이모지와 동일 프레임) */
const PAGE_BG_IMAGE = "resources/news.jpg";
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.03;
/** exampleEn 전체 읽은 뒤, 핵심 절만 한 번 더 읽는 표시 번호 (1-based) */
const EXAMPLE_CORE_REREAD_NUMS = new Set([3, 6]);
const EXAMPLE_CORE_REREAD_RATE = 1.0;
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

const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};
/** 영어 TTS (audio TTS)
 *  EN_TTS_VOICE: "random" = autoplay 시작 시 풀에서 1개 고르고 전체 세션에 동일 사용
 *                1~N = EN_TTS_VOICE_IDS 고정
 */
const EN_TTS_VOICE = "random";
const EN_TTS_VOICE_IDS = {
  3: "en-US-Chirp3-HD-Pulcherrima",// neutral
  4: "en-US-Chirp3-HD-Vindemiatrix",//good
  5: "en-US-Chirp3-HD-Sulafat",//good
  6: "en-US-Chirp3-HD-Algenib",
  7: "en-US-Chirp3-HD-Enceladus",
  9: "en-US-Chirp3-HD-Umbriel", //good
  10: "en-US-Chirp3-HD-Charon",
  11: "en-US-Chirp3-HD-Orus", ///very good
  12: "en-US-Chirp-HD-D",
  14: "en-US-News-N",
  15: "en-US-Wavenet-C",
  17: "en-GB-News-M",
  18: "en-GB-News-H",
  19: "en-GB-Neural2-B",
  21: "en-GB-News-I",
  22: "en-GB-Wavenet-N",
  23: "en-AU-News-G"
};
let activeEnTtsVoiceId =
  EN_TTS_VOICE === "random" ? null : EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = voices[Math.floor(Math.random() * voices.length)];
  return activeEnTtsVoiceId;
}

function resolveSessionEnTtsVoice() {
  if (String(EN_TTS_VOICE) === "random") {
    if (activeEnTtsVoiceId) return activeEnTtsVoiceId;
    return pickRandomEnTtsVoice();
  }
  activeEnTtsVoiceId = EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
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

/** en 표제어(활용형) — 세션당 mark1/10/12 중 하나만 사용 */
const CF_KEY_MARK_TYPES = ["mark1", "mark10", "mark12"];
let activeCfMarkType = null;
let prevCfMarkType = null;

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

/** 한 번의 코드 진행(세션)에 쓸 마킹 타입 지정. forceNew=true면 이전 세션과 다른 타입 */
function assignSessionCfMarkType(forceNew = false) {
  if (!forceNew && activeCfMarkType) return activeCfMarkType;
  if (forceNew && activeCfMarkType) prevCfMarkType = activeCfMarkType;
  activeCfMarkType = pickSessionCfMarkType();
  return activeCfMarkType;
}

/** en에 해당하는 예문/cf 단어 1곳에만 세션 마킹 1개. 없으면 그대로 반환 */
function applyCfWordMarks(cfText, targetWord) {
  const text = String(cfText || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  let re;
  if (/\s/.test(target)) {
    const phrases = [target, ...(IRREGULAR_VERB_FORMS[target.toLowerCase()] || [])];
    const alts = phrases
      .map((p) =>
        String(p)
          .split(/\s+/)
          .map(escapeRegExp)
          .filter(Boolean)
          .join("\\s+")
      )
      .filter(Boolean);
    if (!alts.length) return text;
    re = new RegExp(`\\b(?:${alts.join("|")})\\b`, "i");
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

/** cf 괄호 안 영어만 span으로 감싸 읽기 중 단어별 하이라이트용 */
function wrapCfParenEnglish(cfHtml) {
  let idx = 0;
  return String(cfHtml || "").replace(/\(([^)]+)\)/g, (full, inner) => {
    if (!/[A-Za-z]/.test(inner)) return full;
    const i = idx;
    idx += 1;
    return `<span class="cf-en-paren" data-cf-index="${i}">(${wrapCfEnglishWords(inner)})</span>`;
  });
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

function getWordDisplayNumber(globalIndex) {
  let n = 0;
  for (let i = 0; i <= globalIndex && i < json1.length; i += 1) {
    if (isWordItem(json1[i])) n += 1;
  }
  return n;
}

function getTotalWordCount() {
  return json1.filter(isWordItem).length;
}

/** "scut work" → "scu_ ____" (앞 3글자 공개, 나머지 글자는 _) */
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

function buildStarsHtml(count = DEFAULT_STARS) {
  const n = Math.max(0, Math.min(5, Number(count) || DEFAULT_STARS));
  return `<span class="star-row" aria-label="${n} stars">${"★".repeat(n)}</span>`;
}

function pickRandomProgressBarTheme() {
  const pool =
    PROGRESS_BAR_THEMES.length > 1
      ? PROGRESS_BAR_THEMES.filter((t) => t.id !== lastProgressBarThemeId)
      : PROGRESS_BAR_THEMES;
  const picked = pool[Math.floor(Math.random() * pool.length)] || PROGRESS_BAR_THEMES[0];
  lastProgressBarThemeId = picked.id;
  return picked;
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

  const stage =
    activeProgressBarTheme?.stages?.[stageIndex] ||
    PROGRESS_BAR_THEMES[0].stages[stageIndex];
  runner.textContent = stage[0];
  runner.dataset.motion = stage[1];
  runner.dataset.barTheme = activeProgressBarTheme?.id || "barA";
}

let progressDisplayPct = 0;
let progressTargetPct = 0;
let progressAnimRaf = null;
let progressLabelCurrent = 0;
let progressLabelTotal = 0;

function getProgressTotal() {
  return getTotalWordCount() * Math.max(1, EN_KO_PASS_COUNT);
}

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

/** 단어 처리 중: doneCount 기준으로 lead만큼 미리 전진 (0~1) */
function nudgeProgressSoft(doneCount, total = getProgressTotal(), lead = 0.55) {
  const safeTotal = Math.max(1, total);
  const soft = Math.min(doneCount + lead, safeTotal);
  setProgressTargetPct((soft / safeTotal) * 100);
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
  const groups = buildGroups();
  if (!groups.length) return;
  renderGroupWindow(groups[0], 0, false, "preview");
  updateProgress(0, getTotalWordCount());
  updateProgressRunner(0);
}

async function markWordAsRead(_globalIndex, _animate = true) {
  // 읽음 표시(비스듬한 V 체크) 없음
}

function createItemElement(item, globalIndex, mode = "preview") {
  const el = document.createElement("article");
  el.className = "ticker-item is-preview";
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const num = getWordDisplayNumber(globalIndex);
  const escapeHtml = (s) => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const escapeAttr = (s) => escapeHtml(s).replace(/"/g, "&quot;");
  const mask = buildEnPreviewMask(item.en);
  const stars = buildStarsHtml(item.stars ?? DEFAULT_STARS);
  const hint = String(item.hint || item.koExtra || item.ko || "").trim();
  const exampleEn = String(item.exampleEn || "").trim();
  const exampleKo = String(item.exampleKo || "").trim();
  const targetWord = String(item.en || "").trim();

  const wordLine = `<span class="word-num">${num}.</span><span class="ko-text" data-full-ko="${escapeAttr(item.ko)}">${escapeHtml(item.ko)}</span><span class="word-sep" aria-hidden="true">:</span><span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview">(${escapeHtml(mask)})</span><span class="en-main-text hidden-en-main">${escapeHtml(item.en)}</span></span>`;

  let detailHtml = `<div class="meaning-hint">- ${escapeHtml(hint)}</div>`;
  if (exampleEn) {
    const markedRaw = applyCfWordMarks(exampleEn, targetWord);
    const markedEscaped = mapCfTextOutsideTags(markedRaw, escapeHtml);
    const enMarked = wrapCfEnglishWords(markedEscaped);
    const koPart = exampleKo ? `<span class="example-ko">(${escapeHtml(exampleKo)})</span>` : "";
    detailHtml += `<div class="example-block hidden-example"><span class="cf-note example-note"><span class="cf-en-paren example-en" data-cf-index="0">${enMarked}</span>${koPart}</span></div>`;
  } else {
    detailHtml += `<div class="example-block hidden-example" aria-hidden="true"></div>`;
  }

  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <div class="word-content">
        <div class="word-line">${wordLine}</div>
        <div class="word-follow">
          <div class="meta-line">${stars}</div>
          <div class="detail-slot">${detailHtml}</div>
        </div>
      </div>
    </div>
  `;
  return el;
}

function setItemRevealed(itemEl, revealed, options = {}) {
  if (!itemEl) return;
  const revealEn = options.revealEn !== false;
  itemEl.classList.toggle("is-preview", !revealed);
  itemEl.classList.toggle("is-revealed", revealed);
  const preview = itemEl.querySelector(".en-preview");
  const enText = itemEl.querySelector(".en-main-text");
  const hint = itemEl.querySelector(".meaning-hint");
  const example = itemEl.querySelector(".example-block");
  const cfNoteEl = itemEl.querySelector(".cf-note");
  if (preview) preview.classList.toggle("hidden-en-preview", revealed);
  if (enText) {
    if (!revealed) {
      enText.classList.add("hidden-en-main");
      clearEnHand(enText);
      const fullEn = enText.closest(".en-main")?.dataset.fullEn || "";
      if (fullEn) enText.textContent = fullEn;
    } else if (revealEn) {
      enText.classList.remove("hidden-en-main");
    }
  }
  if (hint) hint.classList.toggle("hidden-hint", revealed);
  if (example) example.classList.toggle("hidden-example", !revealed);
  if (revealed) {
    prepareCfMark(cfNoteEl);
  } else {
    resetCfMarkState(cfNoteEl);
  }
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

async function probePageBgCandidate(path) {
  const url = new URL(path, document.baseURI);
  // 캐시된 HEAD/GET으로 옛 날짜가 나오지 않게
  url.searchParams.set("_probe", String(Date.now()));
  try {
    let res = await fetch(url.href, { method: "HEAD", cache: "no-store" });
    // 일부 서버/file:// 은 HEAD 미지원 → GET으로 재시도
    if (!res.ok || res.status === 405) {
      res = await fetch(url.href, { method: "GET", cache: "no-store" });
    }
    if (!res.ok) return null;
    const lm = res.headers.get("last-modified");
    const mtime = lm ? Date.parse(lm) : NaN;
    const lenHeader = res.headers.get("content-length");
    const length = lenHeader ? Number(lenHeader) : 0;
    // body를 받은 경우 바로 소비해 연결 정리 (Range 없이 GET한 경우)
    if (res.body && typeof res.body.cancel === "function") {
      try { await res.body.cancel(); } catch (_) {}
    }
    return {
      path,
      mtime: Number.isFinite(mtime) ? mtime : 0,
      length: Number.isFinite(length) ? length : 0
    };
  } catch (_) {
    // file:// 등 fetch 불가 → 이미지 로드로 존재만 확인
    return await new Promise((resolve) => {
      const img = new Image();
      const imgUrl = new URL(path, document.baseURI);
      imgUrl.searchParams.set("_probe", String(Date.now()));
      const done = (ok) => {
        img.onload = null;
        img.onerror = null;
        resolve(ok ? { path, mtime: 0, length: 0 } : null);
      };
      img.onload = () => done(true);
      img.onerror = () => done(false);
      img.src = imgUrl.href;
    });
  }
}

async function resolveNewestPageBgImage(candidates = PAGE_BG_BASE_CANDIDATES) {
  const results = (await Promise.all(candidates.map(probePageBgCandidate))).filter(Boolean);
  if (!results.length) {
    return { path: PAGE_BG_BASE_FALLBACK, mtime: Date.now(), length: 0 };
  }
  results.sort((a, b) => {
    if (b.mtime !== a.mtime) return b.mtime - a.mtime;
    if (b.length !== a.length) return b.length - a.length;
    // 날짜 정보 없을 때 jpg 우선
    const rank = (p) => (/\.jpg$/i.test(p) ? 0 : 1);
    return rank(a.path) - rank(b.path);
  });
  return results[0];
}

function withBgCacheBust(path, mtime = Date.now()) {
  const url = new URL(path, document.baseURI);
  url.searchParams.set("v", String(mtime || Date.now()));
  return url.href;
}

async function applyPageBackground() {
  const chosen = await resolveNewestPageBgImage();
  const baseSrc = withBgCacheBust(chosen.path, chosen.mtime || Date.now());
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
  return resolveSessionEnTtsVoice();
}

function getTTSUrl(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  const langParam = isEn ? resolveEnTtsVoiceId(normalizedLang) : resolveKoTtsVoiceId(normalizedLang);
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

function getKoSpeakText(rawKoOrWord) {
  // 단어 객체면 koTts 우선 (화면 표기와 TTS 발음이 다를 때)
  if (rawKoOrWord && typeof rawKoOrWord === "object") {
    const override = String(rawKoOrWord.koTts || "").trim();
    if (override) return override;
    rawKoOrWord = rawKoOrWord.ko;
  }
  const text = String(rawKoOrWord || "").trim();
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
 * EN 예문 발음 횟수/속도
 * - enSpeakRates: [1, 0.85] → 배열 길이만큼 재생
 * - enRepeat: 3 → 속도 1로 n번
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
  return els;
}

/** 예문/cf 표시용 태그(u, markN 등) — TTS·매칭에는 넣지 않음 */
function stripMarkupTags(text) {
  return String(text || "")
    .replace(/<\/?(?:u|mark\d+)\b[^>]*>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 예문 영어(exampleEn) 또는 cf 괄호 영어가 있으면 읽음 */
function shouldSpeakCfEnglish(word) {
  if (stripMarkupTags(word?.exampleEn)) return true;
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  const exampleEn = stripMarkupTags(word?.exampleEn);
  if (exampleEn) return [exampleEn];
  return extractCfParenEnglishParts(word?.cf);
}

function getExampleEnSpeakText(word) {
  return stripMarkupTags(word?.exampleEn) || getCfEnglishSpeakParts(word)[0] || "";
}

function preloadExampleEnTTS(word) {
  const text = getExampleEnSpeakText(word);
  if (!text) return;
  const voice = resolveEnTtsVoiceId("en-US");
  loadBackendTTSAudio(text, voice).catch(() => {});
  const core = extractCfCoreEnglish(text, word?.en);
  if (core && core !== text) {
    loadBackendTTSAudio(core, voice).catch(() => {});
  }
}

/** 예문 영어 TTS (하이라이트 없음) — enRepeat(또는 enSpeakRates) 횟수만큼 */
async function playExampleEnTTS(word) {
  const text = getExampleEnSpeakText(word);
  if (!text) return;
  await playEnTTS(text, getEnSpeakRates(word));
}

/** 학습 단어가 들어 있는 핵심 절만 TTS — 1회차와 동일 속도 1.0 */
async function playExampleEnCoreTTS(itemEl, word, rate = EXAMPLE_CORE_REREAD_RATE) {
  await playCfEnglishWithHighlight(itemEl, word, [rate], { coreOnly: true });
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

async function playEnTTS(text, rates = [1], wordEls = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  for (let i = 0; i < rateList.length; i += 1) {
    if (i > 0) await sleep(160);
    await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i], wordEls);
  }
}

async function playKoTTS(text) {
  const koText = getKoSpeakText(text);
  if (!koText) return;
  await playBackendTTS(koText, resolveKoTtsVoiceId("ko-KR"));
}

/** 제목 위 quiet ring 카운트 — 제자리, 레이아웃 고정 */
async function runTitleCountdown(seconds = 3) {
  const wrap = document.getElementById("title-countdown-wrap");
  const clock = document.getElementById("title-countdown-clock");
  const el = document.getElementById("title-countdown");
  const ring = document.getElementById("title-countdown-ring");
  if (!wrap || !el) {
    await sleep(Math.max(0, seconds) * 1000);
    return;
  }
  wrap.classList.add("is-counting");
  wrap.setAttribute("aria-hidden", "false");
  for (let n = seconds; n >= 0; n -= 1) {
    el.textContent = String(n);
    if (ring) {
      const remain = seconds > 0 ? (n / seconds) * 100 : 0;
      ring.style.strokeDashoffset = String(100 - remain);
    }
    if (clock) {
      el.classList.remove("is-anim");
      void el.offsetWidth;
      el.classList.add("is-anim");
    }
    await sleep(1000);
  }
  el.textContent = "";
  el.classList.remove("is-anim");
  if (ring) ring.style.strokeDashoffset = "100";
  wrap.classList.remove("is-counting");
  wrap.setAttribute("aria-hidden", "true");
}

function preloadKoTTS(word) {
  if (!word) return;
  const koText = getKoSpeakText(word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadCfEnglishTTS(word) {
  const parts = getCfEnglishSpeakParts(word);
  const voice = resolveEnTtsVoiceId("en-US");
  parts.forEach((part) => {
    loadBackendTTSAudio(part, voice).catch(() => {});
    const core = extractCfCoreEnglish(part, word?.en);
    if (core && core !== part) {
      loadBackendTTSAudio(core, voice).catch(() => {});
    }
  });
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadKoTTS(word);
  preloadEnTTS(word);
  preloadExampleEnTTS(word);
  if (globalIndex >= 0) preloadCfEnglishTTS(word);
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

async function playAudioElement(audio, playbackRate = 1, wordEls = null) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.currentTime = 0;

  const stopHighlight = startWordHighlightSync(audio, wordEls);

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

/** 손이 왼쪽→오른쪽으로 이동하며 한글이 드러남 */
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

  const duration = Math.min(1700, Math.max(550, text.replace(/\s/g, "").length * 110));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - (1 - t) ** 1.45;
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
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .en-main-text').forEach((el) => {
    el.classList.add("hidden-en-main");
    el.classList.remove("en-reserving", "en-hand", "en-writing", "en-partial-preview");
    el.style.removeProperty("--en-write-p");
    const fullEn = el.closest(".en-main")?.dataset.fullEn || "";
    if (fullEn) el.textContent = fullEn;
  });
}

function hideEnPreview(enTextEl) {
  const preview = enTextEl?.closest(".en-main")?.querySelector(".en-preview");
  if (preview) preview.classList.add("hidden-en-preview");
}

/** 나머지 자리에 밑줄 슬롯 — 글자 폭과 동일하게 맞춤 */
function buildEnBlankMarks(rest) {
  return String(rest || "");
}

function buildEnWriteSlotHtml(prefix, rest, { withInk = false } = {}) {
  const blanks = buildEnBlankMarks(rest);
  const inkHtml = withInk
    ? `<span class="en-write-ink">${escapeEnHtml(rest)}</span>`
    : "";
  return (
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">` +
    `<span class="en-write-sizer">${escapeEnHtml(rest)}</span>` +
    `<span class="en-write-blank-marks" aria-hidden="true">${escapeEnHtml(blanks)}</span>` +
    inkHtml +
    `</span>`
  );
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
  enTextEl.innerHTML = buildEnWriteSlotHtml(prefix, rest, { withInk: false });
}

/** 손글씨처럼 불규칙한 진행 곡선 (0→1) */
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

function getCfMarkDrawDurationMs(text) {
  const n = Math.max(1, String(text || "").replace(/\s/g, "").length);
  return Math.min(CF_MARK_MS_MAX, Math.max(CF_MARK_MS_MIN, n * CF_MARK_MS_PER_LETTER));
}

function queryCfMarkEl(cfNoteEl) {
  return cfNoteEl?.querySelector("mark1, mark10, mark12") || null;
}

function isCfNoteHidden(cfNoteEl) {
  if (!cfNoteEl) return true;
  if (cfNoteEl.classList.contains("hidden-cf")) return true;
  const block = cfNoteEl.closest(".example-block");
  if (block?.classList.contains("hidden-example")) return true;
  return false;
}

function resetCfMarkState(cfNoteEl) {
  if (!cfNoteEl) return;
  cfNoteEl.classList.remove("cf-mark-pending", "cf-mark-drawing", "cf-mark-done");
  cfNoteEl.querySelectorAll("mark1, mark10, mark12").forEach((el) => {
    el.style.removeProperty("--cf-mark-p");
  });
}

/** 예문 노출 시 마크는 아직 그리지 않음(pending) */
function prepareCfMark(cfNoteEl) {
  if (!cfNoteEl) return;
  resetCfMarkState(cfNoteEl);
  if (queryCfMarkEl(cfNoteEl)) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
}

async function animateCfMarkDraw(cfNoteEl) {
  const markEl = queryCfMarkEl(cfNoteEl);
  if (!markEl) {
    cfNoteEl?.classList.remove("cf-mark-pending");
    return;
  }

  await sleep(CF_MARK_DELAY_MS);
  if (!cfNoteEl.isConnected || isCfNoteHidden(cfNoteEl)) return;

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
      if (!cfNoteEl.isConnected || isCfNoteHidden(cfNoteEl)) {
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

  if (!cfNoteEl.isConnected || isCfNoteHidden(cfNoteEl)) return;

  cfNoteEl.classList.remove("cf-mark-drawing");
  cfNoteEl.classList.add("cf-mark-done");
  markEl.style.removeProperty("--cf-mark-p");
}

/** 손글씨 완료 후·TTS 시작 전 — 핵심단어 마크 손그리기 */
async function startCfMarkDraw(cfNoteEl) {
  if (!cfNoteEl || isCfNoteHidden(cfNoteEl)) return;
  if (!queryCfMarkEl(cfNoteEl)) return;
  if (!cfNoteEl.classList.contains("cf-mark-pending")) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
  await animateCfMarkDraw(cfNoteEl);
}

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 씀 */
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
  preparePronForWriting(pronTextEl);

  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.remove("hidden-en-main", "en-reserving", "en-writing", "en-partial-preview");
    enTextEl.classList.add("en-hand");
    enTextEl.style.removeProperty("--en-write-p");
    if (pronTextEl) {
      pronTextEl.style.setProperty("--en-write-p", "1");
      finishPronWriting(pronTextEl);
    }
    return;
  }

  enTextEl.classList.remove("hidden-en-main", "en-reserving");
  enTextEl.classList.add("en-hand", "en-writing", "en-partial-preview");
  enTextEl.innerHTML = buildEnWriteSlotHtml(prefix, rest, { withInk: true });
  enTextEl.style.setProperty("--en-write-p", "0");
  if (pronTextEl) pronTextEl.style.setProperty("--en-write-p", "0");
  void enTextEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = Math.min(1800, Math.max(450, letters * 110));
  const curve = makeIrregularHandwriteCurve(Math.max(letters, rest.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      enTextEl.style.setProperty("--en-write-p", String(p));
      if (pronTextEl) pronTextEl.style.setProperty("--en-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  enTextEl.textContent = text;
  enTextEl.classList.remove("en-writing", "en-partial-preview");
  enTextEl.style.removeProperty("--en-write-p");
  enTextEl.classList.add("en-hand");
  finishPronWriting(pronTextEl);
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
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main");
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
    resetCfMarkState(el);
  });
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

/** 음악이 끝까지 재생될 때까지 대기 (이미 끝났으면 즉시 반환) */
function waitForBgmEnd() {
  const audio = bgmAudio;
  if (!audio) return Promise.resolve();
  if (audio.paused || audio.ended) return Promise.resolve();
  return new Promise((resolve) => {
    const finish = () => {
      audio.removeEventListener("ended", finish);
      audio.removeEventListener("error", finish);
      resolve();
    };
    audio.addEventListener("ended", finish, { once: true });
    audio.addEventListener("error", finish, { once: true });
  });
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

  const groups = buildGroups();
  const totalWords = getTotalWordCount();
  if (!groups.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  // audio TTS: random이면 세션 시작 시 1개 고르고, 단어/예문/리뷰 전부 동일 음성 사용
  if (String(EN_TTS_VOICE) === "random") {
    pickRandomEnTtsVoice();
  } else {
    resolveSessionEnTtsVoice();
  }

  await startBgm();
  activeProgressBarTheme = pickRandomProgressBarTheme();
  assignSessionCfMarkType(true);
  preloadWordsAhead(0, json1.length);
  updateProgress(0, totalWords);
  await sleep(800);

  let doneCount = 0;

  // 미리보기 → 한글 TTS → 제목 옆 3초 카운트 → 영어/예문 노출 → EN TTS
  for (let g = 0; g < groups.length; g += 1) {
    const group = groups[g];
    if (g === 0) {
      renderGroupWindow(group, 0, false, "preview");
    } else {
      await shiftToNextGroup(group, "preview");
    }

    for (let w = 0; w < group.wordIndices.length; w += 1) {
      const globalIndex = group.wordIndices[w];
      if (w > 0 && w % WORDS_PER_PAGE === 0) {
        await shiftGroupWordsDown(group, w, "preview");
      }

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      const wordData = json1[globalIndex];
      const enTextEl = item.querySelector(".en-main-text");
      preloadKoTTS(wordData);
      preloadEnTTS(wordData);

      // 단어 처리 시작부터 바를 조금씩 미리 전진
      nudgeProgressSoft(doneCount, totalWords, 0.2);

      await sleep(300);

      // 한글 TTS — 노란 하이라이트 없음
      await playKoTTS(wordData);
      nudgeProgressSoft(doneCount, totalWords, 0.4);

      await runTitleCountdown(3);
      nudgeProgressSoft(doneCount, totalWords, 0.55);

      // 예문 노출 + 영어는 손글씨(좌→우)로 드러냄 → 마크 손그리기 → EN TTS
      setItemRevealed(item, true, { revealEn: false });
      reserveEnSlot(enTextEl, wordData.en || "");
      await writeEnWithHand(enTextEl, wordData.en || "");
      nudgeProgressSoft(doneCount, totalWords, 0.7);
      const cfNoteEl = item.querySelector(".cf-note");
      await startCfMarkDraw(cfNoteEl);
      nudgeProgressSoft(doneCount, totalWords, 0.8);
      try {
        await playEnTTS(getEnSpeakText(wordData));
      } finally {
        clearEnHand(enTextEl);
      }
      nudgeProgressSoft(doneCount, totalWords, 0.9);

      // 예문(exampleEn) 영어 읽기 — 스피커는 번호 아래(문장 비침범)
      if (getExampleEnSpeakText(wordData)) {
        await sleep(350);
        const exampleBlock = item.querySelector(".example-block");
        const displayNum = getWordDisplayNumber(globalIndex);
        exampleBlock?.classList.add("is-example-speaking");
        try {
          // enRepeat 횟수만큼 예문 전체
          await playExampleEnTTS(wordData);
          // 3·6번만 추가로: 학습 단어가 들어 있는 핵심 절만
          if (EXAMPLE_CORE_REREAD_NUMS.has(displayNum)) {
            await sleep(350);
            await playExampleEnCoreTTS(item, wordData);
          }
        } finally {
          exampleBlock?.classList.remove("is-example-speaking");
        }
      }

      doneCount += 1;
      updateProgress(doneCount, totalWords);
      await sleep(500);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();
  stopBgm();

  await startReviewQuiz();

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

function escapeEnHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 정답 빈칸 HTML — 접두 최대 3글자, 미리보기는 항상 _ _ _ (3칸) */
function buildReviewBlankHtml(answer, prefixLen) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const len = Math.min(3, ans.length);
  const prefix = ans.slice(0, len);
  const marks = "_ _ _";
  const marksHtml = ` <span class="rv-blank-marks">${escapeEnHtml(marks)}</span>`;
  return `<span class="rv-blank" data-answer="${escapeEnHtml(ans)}" data-prefix-len="${len}"><span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>${marksHtml}</span>`;
}

function formatReviewEnHtml(en, answer) {
  const ans = String(answer || "").trim();
  const blankHtml = buildReviewBlankHtml(ans);
  let html = escapeEnHtml(String(en || ""));
  if (!blankHtml) return html;
  const replaced = html.replace(/[A-Za-z]{1,3}_{2,}/g, blankHtml);
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
    .replace(/[A-Za-z]{1,3}_{2,}/g, "blank")
    .replace(/_{2,}/g, "blank")
    .trim();
}

/** 문장 빈칸 — 이미 보이는 접두(rus / ru 등)는 두고 _ 자리만 ✍️로 채움 */
async function writeReviewAnswerInBlank(enEl, answer) {
  if (!enEl) return;
  const ans = String(answer || "").trim();
  if (!ans) return;

  let blankEl = enEl.querySelector(".rv-blank");
  if (!blankEl) {
    blankEl = document.createElement("span");
    blankEl.className = "rv-blank";
    blankEl.dataset.prefixLen = String(Math.min(3, ans.length));
    enEl.appendChild(blankEl);
  }

  const prefixFromDom = blankEl.querySelector(".rv-blank-prefix")?.textContent || "";
  const prefixLenAttr = Number(blankEl.dataset.prefixLen);
  let prefixLen = Number.isFinite(prefixLenAttr) && prefixLenAttr >= 0
    ? prefixLenAttr
    : prefixFromDom.length;
  if (!Number.isFinite(prefixLen) || prefixLen < 0) {
    prefixLen = Math.min(3, ans.length);
  }
  prefixLen = Math.min(prefixLen, ans.length);

  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);

  blankEl.classList.add("rv-blank-hand", "rv-blank-writing", "rv-blank-partial");
  if (!rest) {
    blankEl.innerHTML = `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>`;
    blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
    blankEl.classList.add("rv-blank-filled");
    return;
  }

  // 접두는 그대로 두고, _ 영역만 손글씨로 채움 (전체를 다시 쓰지 않음)
  blankEl.innerHTML =
    `<span class="rv-blank-prefix rv-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="rv-write-ink-wrap" data-hand-host="1">` +
    `<span class="rv-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  blankEl.style.setProperty("--rv-write-p", "0");
  void blankEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = Math.min(1800, Math.max(450, letters * 110));
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

  blankEl.innerHTML =
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
    for (let sec = total; sec >= 1; sec -= 1) {
      if (!isAutoplayRunning) break;
      num.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, total);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
    num.textContent = "0";
    if (style === "ring") setCountdownRing(0, total);
    if (style === "bars") setCountdownBars(0);
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

  const appendCard = async (q, index) => {
    if (!stackEl) return null;
    const card = createReviewCard(q, index, quizzes.length);
    stackEl.appendChild(card);
    void card.offsetWidth;
    card.classList.add("is-shown");
    if (index > 0) await sleep(REVIEW_FADE_MS * 0.55);
    return card;
  };

  const firstCard = await appendCard(quizzes[0], 0);
  await fadeReviewIn(root, wrapper);

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    let card = i === 0 ? firstCard : null;
    if (i > 0) {
      card = await appendCard(q, i);
    }
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
      getCountdownStyle(q, i),
      q.countdownTick || REVIEW_COUNTDOWN_TICK
    );

    // 종소리 페이드 후 1초 대기 → 정답 노출
    await sleep(REVIEW_REVEAL_DELAY_MS);

    // 정답은 빈칸에만 채움 — 하단 answer 텍스트는 노출하지 않음
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

applyPageBackground();
assignSessionCfMarkType();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
applyPageTitle();
initPenDraw();
window.addEventListener("resize", () => {
  fitTitleSubToBox();
});

/** 펜: 탭=켜기/끄기 · 길게=빨강↔노랑 · 두번탭=전체 지우기 */
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
  let penStopped = false;

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
    drawingEnabled = Boolean(on) && !penStopped;
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

  const fadeClearPenDrawings = (durationMs = ITEM_TRANSITION_MS) => {
    const ms = Math.max(0, Number(durationMs) || ITEM_TRANSITION_MS);
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

  const stopPenDrawing = () => {
    penStopped = true;
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    setDrawing(false);
    clearCanvas();
    btn.disabled = true;
    btn.classList.remove("is-on");
    pointer.classList.remove("is-on");
    movePointer(-100, -100);
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
    if (penStopped || !drawingEnabled) return;
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
    if (penStopped || !drawingEnabled) return;
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

  /** 「시사 영단어」제목 바로 옆에 펜 버튼 배치 */
  const placePenNearWord = () => {
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
    if (!penStopped) {
      btn.style.setProperty("pointer-events", "auto", "important");
    }
    canvas.style.setProperty("z-index", "100100", "important");
    pointer.style.setProperty("z-index", "100120", "important");
    if (rect && rect.width > 0 && rect.height > 0) {
      const x = rect.right + 12;
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
  window.stopPenDrawing = stopPenDrawing;

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
    if (penStopped || btn.disabled) return;
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
    if (penStopped || btn.disabled) {
      cancelLongPress();
      return;
    }
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