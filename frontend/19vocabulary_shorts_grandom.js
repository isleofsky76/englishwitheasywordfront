const PAGE_TITLE_HTML = `<div class="title-countdown-wrap" id="title-countdown-wrap" aria-hidden="true">
  <div class="title-clock title-clock-quiet" id="title-countdown-clock">
    <svg class="title-clock-ring" viewBox="0 0 48 48" aria-hidden="true">
      <circle class="title-clock-ring-track" cx="24" cy="24" r="20"></circle>
      <circle class="title-clock-ring-progress" id="title-countdown-ring" cx="24" cy="24" r="20"
        pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"></circle>
    </svg>
    <span id="title-countdown" class="title-clock-num" aria-live="polite"></span>
  </div>
</div>
<span class="title-main">시사 영단어</span>
<span class="title-sub-row">
  <span class="title-accent title-sub">'신문기사에서 배우는 어휘'</span>
</span>
<span class="title-meta">(WSJ, 부의 창출에 관한 간략한 역사)</span>`;

const VISIBLE_COUNT = 2;
const EN_KO_PASS_COUNT = 1;
const EN_PREVIEW_LETTERS = 3;
const DEFAULT_STARS = 5;

/** autoplay마다 1개만 랜덤 적용 — 사소한 디자인/흐름 차이 */
const SHORTS_VARIANTS = [
  { id: 1, key: "white-preview", whitePreview: true },
  { id: 2, key: "mint-ko", mintKo: true },
  { id: 3, key: "title-random-voca", titleRandomVoca: true }
];
const SHORTS_VARIANT_BODY_PREFIX = "shorts-variant-";
let activeShortsVariant = null;

/** 카운터 효과: autoplay마다 반드시 다른 것으로 순환 */
const COUNT_EFFECTS = ["flip", "glitch", "stamp"];
const COUNT_EFFECT_BODY_PREFIX = "count-effect-";
let activeCountEffect = null;
let countEffectQueue = [];
let lastCountEffect = null;

/** 카운터 위치: autoplay마다 랜덤 (직전과 다르게) */
const COUNT_POSITIONS = ["top", "sub-end"];
const COUNT_POSITION_BODY_PREFIX = "count-pos-";
let activeCountPosition = "top";
let lastCountPosition = null;

/** 진행 바 이모지 테마 — autoplay마다 랜덤 (layout2·01g 등 테마 포함) */
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

let lastShortsVariantId = null;

function getForcedOption(name) {
  if (typeof window === "undefined") return "";
  try {
    return new URL(window.location.href).searchParams.get(name) || "";
  } catch (_) {
    return "";
  }
}

/** 직전 재생과 같은 값은 피해서 매번 다르게 보이도록 */
function pickRandomShortsVariant() {
  const forced = getForcedOption("variant");
  if (forced) {
    const hit = SHORTS_VARIANTS.find(
      (v) => v.key === forced || String(v.id) === forced
    );
    if (hit) return hit;
  }
  const pool =
    SHORTS_VARIANTS.length > 1
      ? SHORTS_VARIANTS.filter((v) => v.id !== lastShortsVariantId)
      : SHORTS_VARIANTS;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  lastShortsVariantId = picked.id;
  return picked;
}

function refillCountEffectQueue() {
  countEffectQueue = COUNT_EFFECTS.slice();
  for (let i = countEffectQueue.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [countEffectQueue[i], countEffectQueue[j]] = [countEffectQueue[j], countEffectQueue[i]];
  }
  // 직전과 같은 효과가 맨 앞에 오면 뒤로 보냄
  if (countEffectQueue.length > 1 && countEffectQueue[0] === lastCountEffect) {
    countEffectQueue.push(countEffectQueue.shift());
  }
}

function pickRandomCountEffect() {
  const forced = getForcedOption("count");
  if (COUNT_EFFECTS.includes(forced)) {
    lastCountEffect = forced;
    return forced;
  }
  if (!countEffectQueue.length) refillCountEffectQueue();
  const picked = countEffectQueue.shift();
  lastCountEffect = picked;
  return picked;
}

function pickRandomCountPosition() {
  const forced = String(getForcedOption("countPos") || "").trim().toLowerCase();
  if (COUNT_POSITIONS.includes(forced)) {
    lastCountPosition = forced;
    return forced;
  }
  const pool =
    COUNT_POSITIONS.length > 1
      ? COUNT_POSITIONS.filter((p) => p !== lastCountPosition)
      : COUNT_POSITIONS;
  const picked = pool[Math.floor(Math.random() * pool.length)];
  lastCountPosition = picked;
  return picked;
}

function clearCountPosition() {
  const body = document.body;
  if (body) {
    Array.from(body.classList).forEach((cls) => {
      if (cls.startsWith(COUNT_POSITION_BODY_PREFIX)) body.classList.remove(cls);
    });
  }
  placeCountdownWrap("top");
  activeCountPosition = "top";
}

function placeCountdownWrap(position) {
  const wrap = document.getElementById("title-countdown-wrap");
  if (!wrap || !pageTitleEl) return;
  if (position === "sub-end") {
    const subRow = pageTitleEl.querySelector(".title-sub-row");
    if (subRow && wrap.parentElement !== subRow) subRow.appendChild(wrap);
    return;
  }
  const titleMain = pageTitleEl.querySelector(".title-main");
  if (titleMain && wrap.parentElement === pageTitleEl) {
    pageTitleEl.insertBefore(wrap, titleMain);
  } else if (titleMain) {
    pageTitleEl.insertBefore(wrap, titleMain);
  } else {
    pageTitleEl.prepend(wrap);
  }
}

function applyCountPosition(position) {
  const pos = COUNT_POSITIONS.includes(position) ? position : "top";
  const body = document.body;
  if (body) {
    Array.from(body.classList).forEach((cls) => {
      if (cls.startsWith(COUNT_POSITION_BODY_PREFIX)) body.classList.remove(cls);
    });
    body.classList.add(`${COUNT_POSITION_BODY_PREFIX}${pos}`);
  }
  placeCountdownWrap(pos);
  activeCountPosition = pos;
}

/** 단어 JSON의 count 우선, 없으면 순환 랜덤 */
function resolveCountEffectForWord(word) {
  const fromWord = String(word?.count || word?.countEffect || "").trim().toLowerCase();
  if (COUNT_EFFECTS.includes(fromWord)) return fromWord;
  return pickRandomCountEffect();
}

function pickRandomProgressBarTheme() {
  const forced = String(getForcedOption("bar") || "").trim().toLowerCase();
  if (forced) {
    const hit = PROGRESS_BAR_THEMES.find(
      (t) => t.id.toLowerCase() === forced || String(t.id) === forced
    );
    if (hit) {
      lastProgressBarThemeId = hit.id;
      return hit;
    }
  }
  const pool =
    PROGRESS_BAR_THEMES.length > 1
      ? PROGRESS_BAR_THEMES.filter((t) => t.id !== lastProgressBarThemeId)
      : PROGRESS_BAR_THEMES;
  const picked = pool[Math.floor(Math.random() * pool.length)] || PROGRESS_BAR_THEMES[0];
  lastProgressBarThemeId = picked.id;
  return picked;
}

function clearCountEffect() {
  const body = document.body;
  if (body) {
    Array.from(body.classList).forEach((cls) => {
      if (cls.startsWith(COUNT_EFFECT_BODY_PREFIX)) body.classList.remove(cls);
    });
  }
  activeCountEffect = null;
}

function applyCountEffect(effect) {
  clearCountEffect();
  if (!COUNT_EFFECTS.includes(effect)) return;
  activeCountEffect = effect;
  document.body?.classList.add(`${COUNT_EFFECT_BODY_PREFIX}${effect}`);
}

function clearShortsVariant() {
  const body = document.body;
  if (body) {
    Array.from(body.classList).forEach((cls) => {
      if (cls.startsWith(SHORTS_VARIANT_BODY_PREFIX)) body.classList.remove(cls);
    });
  }
  const titleMain = pageTitleEl?.querySelector(".title-main");
  if (titleMain) titleMain.textContent = "시사 영단어";
  activeShortsVariant = null;
}

function applyShortsVariant(variant) {
  clearShortsVariant();
  activeShortsVariant = variant || null;
  if (!variant) return;
  document.body?.classList.add(`${SHORTS_VARIANT_BODY_PREFIX}${variant.key}`);
  if (variant.titleRandomVoca) {
    const titleMain = pageTitleEl?.querySelector(".title-main");
    if (titleMain) titleMain.textContent = "랜덤 보카";
  }
}

///영어만 읽는 버젼.
// 예문: exampleEn + exampleKo (화면) / cf는 영어 TTS용 괄호 문장
const json1 =


[

  { "title1": "" },

  {
    "en": "grandeur",
    "ko": "웅장함",
    "hint": "장엄함 (=splendour)",
    "pronunciation": "그랜저",
    "ipa": "/ˈɡrændʒər/",
    "pos": "명",
    "stars": 4,
    "exampleEn": "The grandeur of the Roman Empire was built on the aggregation of wealth.",
    "exampleKo": "로마 제국의 웅장함은 부의 축적을 기반으로 이루어졌습니다.",
    "cf": "(The grandeur of the Roman Empire was built on the aggregation of wealth.)",
    "image": ""
  },

  {
    "en": "falter",
    "ko": "흔들리기 시작하다",
    "hint": "불안정해지다, 흔들리다 (=waver)",
    "pronunciation": "폴터",
    "ipa": "/ˈfɔːltər/",
    "pos": "동",
    "stars": 4,
    "exampleEn": "When the empire ran out of neighbors, the Roman economy began to falter.",
    "exampleKo": "제국이 더 이상 정복할 이웃 국가를 찾지 못하자 로마 경제는 흔들리기 시작했습니다.",
    "cf": "(When the empire ran out of neighbors, the Roman economy began to falter.)",
    "image": ""
  },

  {
    "en": "fortune",
    "ko": "막대한 재산",
    "hint": "막대한 재산, (특히 사람의 삶에 영향을 미치는) 운[행운]",
    "pronunciation": "포천",
    "ipa": "/ˈfɔːrtʃən/",
    "pos": "명",
    "stars": 3,
    "exampleEn": "Before the Industrial Revolution, fortunes were based on land or trade.",
    "exampleKo": "산업혁명 이전에는 막대한 재산이 토지나 무역을 기반으로 형성되었습니다.",
    "cf": "(Before the Industrial Revolution, fortunes were based on land or trade.)",
    "image": ""
  },

  {
    "en": "baron",
    "ko": "(특정 산업 분야의) 부호[거물]",
    "hint": "거물, 특정 산업의 막강한 사업가, 귀족 작위인 남작, 강력한 영향력을 가진 인물",
    "pronunciation": "배런",
    "ipa": "/ˈbærən/",
    "pos": "명",
    "stars": 4,
    "exampleEn": "Benjamin Disraeli popularized the word ‘millionaire’ to describe the new industrial barons.",
    "exampleKo": "벤저민 디즈레일리는 새로운 산업계 거물들을 묘사하기 위해 ‘백만장자’라는 단어를 널리 퍼뜨렸습니다.",
    "cf": "(Benjamin Disraeli popularized the word ‘millionaire’ to describe the new industrial barons.)",
    "image": ""
  },

  {
    "en": "precipitously",
    "ko": "가파르게",
    "hint": "급격하게,	가파르게 , 낭떠러지 같이.",
    "pronunciation": "프리시피터슬리",
    "ipa": "/prɪˈsɪpɪtəsli/",
    "pos": "부",
    "stars": 5,
    "exampleEn": "The cost of overland shipping dropped precipitously.",
    "exampleKo": "육상 운송 비용은 급격하게 하락했습니다.",
    "cf": "(The cost of overland shipping dropped precipitously.)",
    "image": ""
  },

  {
    "en": "retrieval",
    "ko": "(정보의) 검색",
    "hint": "검색, 회수, 저장된 정보나 물건을 찾아 가져오는 과정, 데이터 불러오기",
    "pronunciation": "리트리벌",
    "ipa": "/rɪˈtriːvəl/",
    "pos": "명",
    "stars": 4,
    "exampleEn": "The cost of the storage, retrieval and manipulation of data began to collapse.",
    "exampleKo": "데이터의 저장·검색·처리 비용이 급격히 하락하기 시작했습니다.",
    "cf": "(The cost of the storage, retrieval and manipulation of data began to collapse.)",
    "image": ""
  }

];

/**
 * 학습 종료 후 Review 퀴즈
 *
 * 빈칸 규칙:
 * [answer 앞 3글자][나머지 글자 수만큼 _]
 */
const REVIEW_QUIZ = [
  {
    en: "The gra_____ of the Roman Empire was built on the aggregation of wealth.",
    ko: "로마 제국의 웅장함은 부의 축적을 기반으로 이루어졌습니다.",
    answer: "grandeur",
    answerKo: "웅장함"
  },
  {
    en: "When the empire ran out of neighbors, the Roman economy began to fal___.",
    ko: "제국이 더 이상 정복할 이웃 국가를 찾지 못하자 로마 경제는 흔들리기 시작했습니다.",
    answer: "falter",
    answerKo: "흔들리기 시작하다"
  },
  {
    en: "The cost of overland shipping dropped pre__________.",
    ko: "육상 운송 비용은 가파르게 하락했습니다.",
    answer: "precipitously",
    answerKo: "가파르게"
  }
];

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
let bgmAudio = null;
const ITEM_TRANSITION_MS = 550;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_COLOR = "#2F3543";
const PAGE_BG_BASE_IMAGE = "resources/bg.jpeg";
const PAGE_BG_IMAGE = "";
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.03;
const BGM_START_SEC = 70; // 1:10 (단어 3개 이하)
/** 단어(json) 4개 이상일 때 With You 시작 지점 */
const BGM_START_SEC_WHEN_4_PLUS = 73;

function getBgmStartSec() {
  const wordCount = json1.filter((item) => item && typeof item.en === "string").length;
  if (wordCount >= 4) return BGM_START_SEC_WHEN_4_PLUS;
  return BGM_START_SEC;
}
/** exampleEn 전체 읽은 뒤, 핵심 절만 한 번 더 읽는 개수 (표시 번호는 autoplay마다 랜덤) */
const EXAMPLE_CORE_REREAD_COUNT = 2;
const EXAMPLE_CORE_REREAD_RATE = 1;
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
/** 영어 TTS: EN_TTS_VOICE 번호로 선택 — 1=미국 남성, 2=미국 여성(Wavenet-C), 3=영국 남성 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D",
  2: "en-US-Wavenet-C",
  3: "en-GB-Chirp-HD-D"
};

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

function escapeEnHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildStarsHtml(count = DEFAULT_STARS) {
  const n = Math.max(0, Math.min(5, Number(count) || DEFAULT_STARS));
  return `<span class="star-row" aria-label="${n} stars">${"★".repeat(n)}</span>`;
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

function updateProgress(current, total) {
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
  renderGroupWindow(groups[0], 0, false, "preview");
  updateProgress(0, getTotalWordCount());
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
    const enMarked = wrapCfEnglishWords(underlineTargetInCf(escapeHtml(exampleEn), targetWord));
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

  document.documentElement.style.setProperty("--page-bg-color", PAGE_BG_COLOR);
  document.documentElement.style.setProperty("--page-bg-base-image", `url("${baseSrc}")`);
  document.documentElement.style.setProperty("--page-bg-image", "none");

  for (const el of [document.documentElement, document.body]) {
    el.style.backgroundColor = PAGE_BG_COLOR;
    el.style.backgroundImage = `url("${baseSrc}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.style.backgroundRepeat = "no-repeat";
    el.style.backgroundAttachment = "fixed";
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
  return EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
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
  return els;
}

/** 예문 영어(exampleEn) 또는 cf 괄호 영어가 있으면 읽음 */
function shouldSpeakCfEnglish(word) {
  if (String(word?.exampleEn || "").trim()) return true;
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  const exampleEn = String(word?.exampleEn || "").trim();
  if (exampleEn) return [exampleEn];
  return extractCfParenEnglishParts(word?.cf);
}

function getExampleEnSpeakText(word) {
  return String(word?.exampleEn || "").trim() || getCfEnglishSpeakParts(word)[0] || "";
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

/** 예문 영어 TTS (하이라이트 없음) */
async function playExampleEnTTS(word) {
  const text = getExampleEnSpeakText(word);
  if (!text) return;
  await playEnTTS(text);
}

/** 학습 단어가 들어 있는 핵심 절만 TTS (0g/01g와 동일) */
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

/** quiet ring 카운트 — 위치는 autoplay 옵션(top / sub-end) */
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
  const koText = getKoSpeakText(word.ko);
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
    el.classList.remove("en-reserving", "en-hand", "en-writing");
    el.style.removeProperty("--en-write-p");
    const fullEn = el.closest(".en-main")?.dataset.fullEn || "";
    if (fullEn) el.textContent = fullEn;
  });
}

/** KO 재생 중: 미리보기 공개분은 보이고, 나머지는 폭만 잡고 ✍️는 그 앞에서 대기 */
function reserveEnSlot(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  const { prefix, rest } = getEnPreviewSplit(text);
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

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 미리보기 공개분은 이미 보인 채, 나머지만 씀 */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  if (!text) {
    revealEnText(enTextEl, fallback);
    if (pronTextEl) revealPronText(pronTextEl);
    return;
  }

  const { prefix, rest } = getEnPreviewSplit(text);
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
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">` +
    `<span class="en-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
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

async function startBgm() {
  const audio = ensureBgmAudio();
  audio.volume = BGM_VOLUME;
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
    audio.currentTime = getBgmStartSec();
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

/** exampleEn이 있는 단어 표시 번호 중 N개를 랜덤 선택 */
function pickRandomExampleCoreRereadNums(count = EXAMPLE_CORE_REREAD_COUNT) {
  const candidates = [];
  for (let i = 0; i < json1.length; i += 1) {
    if (!isWordItem(json1[i])) continue;
    if (!getExampleEnSpeakText(json1[i])) continue;
    candidates.push(getWordDisplayNumber(i));
  }
  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  const n = Math.min(Math.max(0, count), candidates.length);
  return new Set(candidates.slice(0, n));
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

  const variant = pickRandomShortsVariant();
  applyShortsVariant(variant);
  const countPosition = pickRandomCountPosition();
  applyCountPosition(countPosition);
  activeProgressBarTheme = pickRandomProgressBarTheme();
  console.info(
    "[grandom] shorts variant:",
    variant.id,
    variant.key,
    "| countPos:",
    countPosition,
    "| bar:",
    activeProgressBarTheme.id
  );

  const exampleCoreRereadNums = pickRandomExampleCoreRereadNums();
  ensureBgmAudio();
  preloadWordsAhead(0, json1.length);
  updateProgress(0, totalWords);

  let doneCount = 0;
  let isFirstWord = true;

  // 음악 시작과 동시에 첫 단어(rein in) 카운터 → EN TTS (한글 TTS 없음)
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
      preloadEnTTS(wordData);

      // 첫 단어: 음악 시작과 동시에 카운터. 이후 단어만 짧게 텀
      if (isFirstWord) {
        await startBgm();
      } else {
        await sleep(300);
      }

      const countEffect = resolveCountEffectForWord(wordData);
      applyCountEffect(countEffect);
      console.info("[grandom] word:", wordData.en, "| count:", countEffect);
      await runTitleCountdown(3);

      // 예문 노출 + 영어는 손글씨(좌→우)로 드러냄
      setItemRevealed(item, true, { revealEn: false });
      reserveEnSlot(enTextEl, wordData.en || "");
      await writeEnWithHand(enTextEl, wordData.en || "");
      try {
        await playEnTTS(getEnSpeakText(wordData));
      } finally {
        clearEnHand(enTextEl);
      }

      // 예문(exampleEn) 영어 읽기 — 스피커는 번호 아래(문장 비침범)
      if (getExampleEnSpeakText(wordData)) {
        await sleep(350);
        const exampleBlock = item.querySelector(".example-block");
        const displayNum = getWordDisplayNumber(globalIndex);
        exampleBlock?.classList.add("is-example-speaking");
        try {
          // 1회: 예문 전체
          await playExampleEnTTS(wordData);
          // 랜덤 2개 단어만 2회: 학습 단어가 들어 있는 핵심 절만
          if (exampleCoreRereadNums.has(displayNum)) {
            await sleep(350);
            await playExampleEnCoreTTS(item, wordData);
          }
        } finally {
          exampleBlock?.classList.remove("is-example-speaking");
        }
      }

      isFirstWord = false;
      doneCount += 1;
      updateProgress(doneCount, totalWords);
      await sleep(500);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 단어가 끝나도 음악이 끝날 때까지 대기 후 종료
  await waitForBgmEnd();
  stopBgm();
  clearShortsVariant();
  clearCountEffect();
  clearCountPosition();

  await startReviewQuiz();

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

/** 정답 빈칸 HTML — 접두 최대 3글자 공개, 나머지 글자 수만큼 _ 표시 */
function buildReviewBlankHtml(answer) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const len = Math.min(3, ans.length);
  const prefix = ans.slice(0, len);
  const restCount = Math.max(0, ans.length - len);
  const marks = restCount > 0 ? Array(restCount).fill("_").join(" ") : "";
  const marksHtml = marks
    ? ` <span class="rv-blank-marks">${escapeEnHtml(marks)}</span>`
    : "";
  return `<span class="rv-blank" data-answer="${escapeEnHtml(ans)}" data-prefix-len="${len}"><span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>${marksHtml}</span>`;
}

function formatReviewEnHtml(en, answer) {
  const ans = String(answer || "").trim();
  const blankHtml = buildReviewBlankHtml(ans);
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

/** 문장 빈칸 — 이미 보이는 접두는 두고 _ 자리만 ✍️로 채움 */
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

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
