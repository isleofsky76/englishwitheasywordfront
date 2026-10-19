const PAGE_TITLE_HTML = `<span class="title-main">시사 영단어</span>
<span class="title-accent title-sub">전직갱단<br></span><span class="title-meta">(The Economist | 2026/08/27)</span>
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
const THUMB_KO_EXTRA_PX = THUMB_FONT_BOOST_PX;
const THUMB_CF_EN_EXTRA_PX = 4 + THUMB_FONT_BOOST_PX;
/** cfKoLines 영어 구절(en) — 기본 +3px 위에 추가 (전체 en 공통) */
const CF_KO_LINES_EN_BASE_EXTRA_PX = 3;
const CF_KO_LINES_EN_EXTRA_PX = 1.5;

/** 쇼츠 상단 배너 (layout1thumball 전용) */
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
  const styleId = "layout1thumball-typography";
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
      font-size: calc(0.88em + ${THUMB_KO_EXTRA_PX}px);
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
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
      font-size: calc(0.82em + ${THUMB_CF_EN_EXTRA_PX}px);
      line-height: 1.5;
    }
    body.shorts-thumb .cf-note .cf-en-paren,
    body.shorts-thumb .cf-note .cf-en-word {
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
    }
    body.shorts-thumb .cf-ko-pair-en {
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
      font-size: calc(0.78em + ${CF_KO_LINES_EN_BASE_EXTRA_PX + CF_KO_LINES_EN_EXTRA_PX}px) !important;
    }
    body.shorts-thumb .cf-ko-pair-ko {
      font-family: 'NanumBarunPen', 'Pretendard', 'Noto Sans KR', sans-serif;
      font-style: normal;
      font-size: calc(0.72em + ${THUMB_KO_EXTRA_PX}px);
      font-weight: 700;
    }
  `;
}

const VISIBLE_COUNT = 1;
/** 영어+한글 합산 글자 수가 이 값 이상이면 2줄 배치 (기본 15 + 8) */
const WORD_LINE_STACK_MIN_CHARS = 23;
const EN_KO_PASS_COUNT = 1;
/** autoplay — 단어 ko 미읽기, EN → cf(영어)만 TTS */
const AUTOPLAY_READ_WORD_KO = false;
const AUTOPLAY_READ_CF_KO = false;
/** thumball: cf·발음·IPA 항상 노출 + cf 영어 전체 TTS */
const CF_ALWAYS_VISIBLE = true;
const PRON_ALWAYS_VISIBLE = true;
const SPEAK_CF_FULL_ENGLISH = true;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** false — 영어 처음부터 전체 표시, 손글씨 채우기 없이 TTS만 */
const EN_USE_HANDWRITE = false;
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

  
  {
    "en": "orchestrate",
    "ko": "(복잡한 계획·행사를 세심히 또는 은밀히) 조직하다",
    "hint": "",
    "pronunciation": "오케스트레이트",
    "ipa": "/ˈɔːrkɪstreɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "A Nevada jury finds Duane ‘Keffe D’ Davis orchestrated the 1996 drive-by shooting of the legendary rapper.",
    "cf2": "",
    "image": ""
  },
  {
    "en": "find",
    "ko": "(법원·배심원이 심리 후 공식적으로) 판단하다, 판결을 내리다",
    "hint": "",
    "pronunciation": "파인드",
    "ipa": "/faɪnd/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The jury found him guilty as charged. (find a person guilty ...유죄라고 평결하다, find + 목적어 + 보어)",
    "cf2": "",
    "image": ""
    },
  {
    "en": "implicate",
    "ko": "(나쁜 짓·범죄에) 연루되었음을 보여주다",
    "hint": "",
    "pronunciation": "임플리케이트",
    "ipa": "/ˈɪmplɪkeɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The prosecutors said over the past 18 years, Davis implicated himself on four separate occasions through interviews, documentary appearances, and his memoir.",
    "cf2": "",
    "image": ""
  },
  
  {
    "en": "corroborate",
    "ko": "증거로 뒷받침하다, 확증[입증]하다(confirm)",
    "hint": "",
    "pronunciation": "커라버레이트",
    "ipa": "/kəˈrɑːbəreɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The defense attorney insisted there was little evidence to corroborate his client’s written claims.",
    "cf2": "",
    "image": ""
  },
  {
    "en": "liable",
    "ko": "법적 책임이 있는",
    "hint": "",
    "pronunciation": "라이어블",
    "ipa": "/ˈlaɪəbəl/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Why would he create a story that makes him legally liable for murder?",
    "cf2": "",
    "image": ""
  },
  {
    "en": "procure",
    "ko": "(특히 어렵게) 구하다[입수하다]",
    "hint": "",
    "pronunciation": "프러큐어",
    "ipa": "/prəˈkjʊr/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "A Nevada jury found that he procured a gun and ordered a fellow gang member to shoot Shakur and Marion in an act of revenge.",
    "cf2": "",
    "image": ""
  },
  {
    "en": "self-aggrandizing",
    "ko": "자기과시적인, 자신을 실제보다 대단하게 보이려는",
    "hint": "",
    "pronunciation": "셀프 어그랜다이징",
    "ipa": "/ˌself əˈɡrændɪzɪŋ/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The defense attorney argued Davis’s book was a self-aggrandizing fiction designed to profit.",
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
const PAGE_BG_COLOR_DEFAULT = "#2F3543";
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

const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird", // 여 · 밝은 톤
  3: "ko-KR-Chirp3-HD-Achernar", // 여 · 차분
  4: "ko-KR-Chirp3-HD-Zephyr", // 여 · 부드러운
  5: "ko-KR-Chirp3-HD-Vindemiatrix" // 여 · 성숙
};
/** exampleKo 긴 해설 — Chirp3-HD Zephyr (여 · 부드러운) */
const EXAMPLE_KO_TTS_VOICE = 4;
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

/** 괄호 없는 영어 cf도 하이라이트·TTS용 span으로 감쌈 */
function wrapCfForDisplay(cfHtml) {
  const wrapped = wrapCfParenEnglish(cfHtml);
  if (/cf-en-paren/.test(wrapped)) return wrapped;
  if (!/[A-Za-z]/.test(wrapped)) return wrapped;
  return `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(wrapped)}</span>`;
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
  renderGroupWindow(groups[0], 0, false, "second-pass");
  showKoAsDefault();
  if (EN_USE_HANDWRITE) hideAllEnText();
  else showAllEnText();
  applyPronVisibility();
  applyCfVisibility();
  showAllCfKoBreakdownKo();
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

function buildCfKoBreakdownHtml(item) {
  const lines = item?.cfKoLines;
  if (!Array.isArray(lines) || !lines.length) return "";
  const pairs = lines
    .map((row) => {
      const en = String(row?.en || "").trim();
      const ko = String(row?.ko || "").trim();
      if (!en && !ko) return "";
      const enHtml = en ? `<div class="cf-ko-pair-en">${escapeEnHtml(en)}</div>` : "";
      const koHtml = ko ? `<div class="cf-ko-pair-ko">${escapeEnHtml(ko)}</div>` : "";
      return `<div class="cf-ko-pair">${enHtml}${koHtml}</div>`;
    })
    .filter(Boolean)
    .join("");
  if (!pairs) return "";
  return `<div class="cf-ko-breakdown">${pairs}</div>`;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("ko-first-mode", "second-pass-mode");
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const showPreview = mode === "second-pass" && EN_USE_HANDWRITE;
  const enHiddenClass = showPreview ? " hidden-en-main" : "";
  const previewHiddenClass = showPreview ? "" : " hidden-en-preview";
  const mask = buildEnPreviewMask(item.en);
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  const koContent = mode === "second-pass" ? (item.ko || "") : "";
  const num = getWordDisplayNumber(globalIndex);
  const enMainHtml = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview${previewHiddenClass}">${escapeEnHtml(mask)}</span><span class="en-main-text${enHiddenClass}">${escapeEnHtml(item.en)}</span></span>`;
  const koHtml = `<span class="ko-text${koHiddenClass}" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(koContent)}</span>`;
  const stack = shouldStackWordLine(item.en, item.ko);
  const wordLine = stack
    ? `<span class="en-row">${enMainHtml}<span class="en-colon"> :</span></span>${koHtml}`
    : `${enMainHtml} : ${koHtml}`;
  const wordLineClass = stack ? "word-line word-line-stack" : "word-line";
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfForDisplay(underlineTargetInCf(cfText, targetWord));
  const cfHiddenClass = CF_ALWAYS_VISIBLE ? "" : " hidden-cf";
  const cfHtml = cfText
    ? `<span class="cf-note${cfHiddenClass}">cf. ${cfTextWithUnderline}</span>`
    : "";
  const pronHiddenClass = PRON_ALWAYS_VISIBLE ? "" : (mode === "second-pass" ? " hidden-pron-text" : "");
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
  const cfKoBreakdownHtml = buildCfKoBreakdownHtml(item);
  const exampleKoText = String(item.exampleKo || "").trim();
  let belowCfHtml = cfKoBreakdownHtml;
  if (exampleKoText) {
    belowCfHtml += `<div class="example-ko hidden-example-ko">${escapeEnHtml(exampleKoText)}</div>`;
  }
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${cfHtml}</div>${belowCfHtml}</div>`;
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

function initSharedPageBgPicker() {
  if (!window.Mark3readPageBg) return;
  window.Mark3readPageBg.configure({
    defaultHex: PAGE_BG_COLOR_DEFAULT,
    onApply: applyPageBackground,
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

  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${photoSrc}")`;
    bgEl.style.setProperty("--page-bg-color", pageBgColor);
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

function resolveExampleKoTtsVoiceId() {
  try {
    const qp = new URLSearchParams(window.location.search || "");
    const raw = qp.get("kovo");
    if (raw) {
      const n = Number(raw);
      if (KO_TTS_VOICE_IDS[n]) return KO_TTS_VOICE_IDS[n];
      if (/^ko-KR/i.test(raw)) return raw;
    }
  } catch (_) {}
  return KO_TTS_VOICE_IDS[Number(EXAMPLE_KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[4];
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

/** exampleKo TTS — 따옴표 제거·한국어 발음 보정 (화면 표시용 exampleKo와 분리) */
function prepareExampleKoForTts(text) {
  let t = String(text || "").trim();
  if (!t) return "";
  t = t.replace(/[''""「」『』]/g, "");
  t = t.replace(/~(?=로)/g, "무엇으").replace(/~/g, "무엇");
  t = t.replace(/([가-힣]{2,})의(?=\s+[가-힣])/g, "$1의");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

/** cf2 괄호 한글 — TTS용 자연스러운 읽기 (영어 표기 → 한글 발음, 쉼·띄어쓰기 보정) */
function prepareCf2KoForTts(text, word = null) {
  let t = prepareExampleKoForTts(text);
  if (!t) return "";

  t = t.replace(/여기\s+저기/g, "여기저기");
  t = t.replace(/뜻\s+(입니다|이에요|예요)/g, "뜻$1");
  t = t.replace(/([가-힣]+다)\s+뜻(입니다|이에요|예요)/g, "$1는 뜻$2");
  t = t.replace(/용감한\s+용맹한/g, "용감하고 용맹한");
  t = t.replace(/명확하지\s+않습니다/g, "명확하지 않습니다");

  const CF2_EN_PHONETIC = { gallant: "갤런트" };
  t = t.replace(/\b([a-zA-Z][a-zA-Z'-]*)\b/g, (m) => {
    const key = m.toLowerCase();
    if (CF2_EN_PHONETIC[key]) return CF2_EN_PHONETIC[key];
    return m;
  });

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

async function playCf2KoTTS(rawText, word) {
  const prepared = prepareCf2KoForTts(rawText, word);
  if (!prepared) return;
  const sentences = prepared.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
  const chunks = sentences.length ? sentences : [prepared];
  const voice = resolveExampleKoTtsVoiceId();
  const rate = 0.94;
  for (let i = 0; i < chunks.length; i += 1) {
    await playBackendTTS(chunks[i], voice, rate);
    if (i < chunks.length - 1) await sleep(320);
  }
}

/** exampleKo 전문 TTS용 — 슬래시·쉼표 분할 없이 전체 읽기 (cfKoLines만 있으면 ko 구절 연결) */
function getExampleKoSpeakText(word) {
  const direct = String(word?.exampleKo || "").trim();
  if (direct) return prepareExampleKoForTts(direct);
  const lines = word?.cfKoLines;
  if (Array.isArray(lines) && lines.length) {
    const koText = lines.map((row) => String(row?.ko || "").trim()).filter(Boolean).join(" ");
    if (koText) return prepareExampleKoForTts(koText);
  }
  return "";
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

/** cf TTS용 영어 구문 — 괄호 없으면 cf 전체 (thumball) */
function extractCfEnglishSpeakParts(cfText) {
  const text = String(cfText || "");
  const parts = [];
  const re = /\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const inner = String(match[1] || "").trim();
    if (inner && /[A-Za-z]/.test(inner)) parts.push(inner);
  }
  if (parts.length) return parts;
  if (!SPEAK_CF_FULL_ENGLISH) return [];
  const spoken = text.replace(/\s+/g, " ").trim();
  if (spoken && /[A-Za-z]/.test(spoken)) return [spoken];
  return [];
}

/** @deprecated — extractCfEnglishSpeakParts 사용 */
function extractCfParenEnglishParts(cfText) {
  return extractCfEnglishSpeakParts(cfText);
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

/** 핵심 문장 TTS에 맞춰 하이라이트할 .cf-en-word 구간만 고름 (startIndex부터 순서 검색) */
function getWordElsMatchingSpeakText(wordEls, speakText, startIndex = 0) {
  const els = Array.from(wordEls || []);
  const want = String(speakText || "")
    .split(/\s+/)
    .map(normalizeCfSpeakToken)
    .filter(Boolean);
  if (!els.length || !want.length) return [];

  const have = els.map((el) => normalizeCfSpeakToken(el.textContent));
  const from = Math.max(0, Number(startIndex) || 0);
  outer: for (let start = from; start <= have.length - want.length; start += 1) {
    for (let i = 0; i < want.length; i += 1) {
      if (have[start + i] !== want[i]) continue outer;
    }
    return els.slice(start, start + want.length);
  }
  return [];
}

/** cf 영어를 읽음 (괄호 구문 또는 영어 cf 전체) */
function shouldSpeakCfEnglish(word) {
  return extractCfEnglishSpeakParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  return extractCfEnglishSpeakParts(word?.cf);
}

/** cf2 — 2차 cf 읽기 (cf2Lines 우선, 없으면 cf2 문자열 파싱) */
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

async function playCf2Speak(word, itemEl) {
  const segments = getCf2SpeakSegments(word);
  if (!segments.length) return;
  const enRates = getCfSpeakRates(word);
  const allCfWords = itemEl ? getCfNoteWordEls(itemEl) : [];
  let cfWordCursor = 0;
  let activeHighlightEls = [];

  const clearCf2Underline = () => {
    activeHighlightEls.forEach((el) => {
      el.classList.remove("is-cf2-speaking");
      el.closest("u")?.classList.remove("is-cf2-speaking");
    });
    if (itemEl) {
      itemEl.querySelectorAll(".cf-note .is-cf2-speaking").forEach((el) => {
        el.classList.remove("is-cf2-speaking");
      });
    }
    activeHighlightEls = [];
  };

  const underlineCfPhrase = (phrase) => {
    clearCf2Underline();
    if (!itemEl) return [];
    let highlightEls = getCfHighlightElsForPhrase(allCfWords, phrase, cfWordCursor);
    activeHighlightEls = highlightEls;
    highlightEls.forEach((el) => {
      el.classList.add("is-cf2-speaking");
      el.closest("u")?.classList.add("is-cf2-speaking");
    });
    if (highlightEls.length) {
      const lastIdx = allCfWords.indexOf(highlightEls[highlightEls.length - 1]);
      if (lastIdx >= 0) cfWordCursor = lastIdx + 1;
    }
    return highlightEls;
  };

  for (let i = 0; i < segments.length; i += 1) {
    const seg = segments[i];
    try {
      if (seg.lang === "ko") {
        if (AUTOPLAY_READ_CF_KO) {
          await playCf2KoTTS(seg.text, word);
        }
      } else {
        let phrase = String(seg.text || "").trim();
        underlineCfPhrase(phrase);
        const trimmed = phrase.replace(/\.\s*$/, "").trim();
        if (trimmed && trimmed !== phrase) phrase = trimmed;
        await playEnTTS(phrase, enRates, null);
      }
    } catch (_) {}
    if (i < segments.length - 1) await sleep(120);
  }
  clearCf2Underline();
}

function getCfNoteWordEls(itemEl) {
  const cfNote = itemEl?.querySelector(".cf-note");
  if (!cfNote) return [];
  return Array.from(cfNote.querySelectorAll(".cf-en-paren .cf-en-word"));
}

function getCfHighlightElsForPhrase(allCfWords, phrase, startIndex = 0) {
  if (!allCfWords.length) return [];
  let els = getWordElsMatchingSpeakText(allCfWords, phrase, startIndex);
  if (els.length) return els;
  const trimmed = String(phrase || "").replace(/\.\s*$/, "").trim();
  if (trimmed && trimmed !== phrase) {
    els = getWordElsMatchingSpeakText(allCfWords, trimmed, startIndex);
    if (els.length) return els;
  }
  return [];
}

function preloadCf2TTS(word) {
  if (!shouldSpeakCf2(word)) return;
  const segments = getCf2SpeakSegments(word);
  segments.forEach((seg) => {
    if (seg.lang === "ko") {
      if (!AUTOPLAY_READ_CF_KO) return;
      const koText = prepareCf2KoForTts(seg.text, word);
      if (koText) loadBackendTTSAudio(koText, resolveExampleKoTtsVoiceId()).catch(() => {});
    } else {
      const enText = String(seg.text || "").replace(/\.\s*$/, "").trim() || seg.text;
      loadBackendTTSAudio(enText, resolveEnTtsVoiceId("en-US")).catch(() => {});
    }
  });
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

function preloadKoTTS(word) {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadExampleKoTTS(word) {
  if (!word) return;
  const koText = getExampleKoSpeakText(word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveExampleKoTtsVoiceId()).catch(() => {});
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
  if (AUTOPLAY_READ_CF_KO) preloadExampleKoTTS(word);
  if (globalIndex >= 0) {
    preloadCfEnglishTTS(word);
    preloadCf2TTS(word);
  }
}

async function playExampleKoTTS(word) {
  const koText = getExampleKoSpeakText(word);
  if (!koText) return;
  await playBackendTTS(koText, resolveExampleKoTtsVoiceId());
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
  const duration = Math.min(1800, Math.max(550, letters * 110));
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
  const duration = Math.min(1800, Math.max(450, letters * 110));
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

function showAllPronText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .pron-text').forEach((el) => {
    el.classList.remove("hidden-pron-text", "pron-writing");
    el.style.removeProperty("--en-write-p");
    restorePronHtml(el);
  });
}

function applyPronVisibility() {
  if (PRON_ALWAYS_VISIBLE) showAllPronText();
  else hideAllPronText();
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
  enTextEl.classList.remove("hidden-en-main", "en-partial-preview", "en-reserving", "en-writing", "en-hand");
  enTextEl.style.removeProperty("--en-write-p");
  hideEnPreview(enTextEl);
}

function showAllEnText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    revealEnText(item.querySelector(".en-main-text"), item.dataset.en || "");
  });
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

function hideAllExampleKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .example-ko').forEach((el) => {
    el.classList.add("hidden-example-ko");
  });
}

function showAllCfKoBreakdownKo() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-ko-pair-ko').forEach((el) => {
    el.classList.remove("hidden-cf-ko-ko");
  });
}

function revealCfKoBreakdownForItem(item) {
  if (!item) return;
  item.querySelectorAll(".cf-ko-pair-ko").forEach((el) => {
    el.classList.remove("hidden-cf-ko-ko");
  });
}

function revealExampleKo(exampleKoEl) {
  if (!exampleKoEl) return;
  exampleKoEl.classList.remove("hidden-example-ko");
}

function showAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.remove("hidden-cf");
  });
}

function applyCfVisibility() {
  if (CF_ALWAYS_VISIBLE) {
    showAllCfText();
    showAllCfKoBreakdownKo();
  } else hideAllCfText();
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  window.Mark3readPageBg?.hidePageBgPicker?.();
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  pickRandomEnTtsVoice();

  // 이전 퀴즈 화면이 남아 있으면 정리
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

  // 시작 대기 동안에도 미리보기(영어 마스크 + 한글)는 그대로 보이게 유지
  showKoAsDefault();
  applyPronVisibility();
  applyCfVisibility();
  hideAllExampleKoText();
  preloadWordsAhead(0, json1.length);
  await sleep(3000);

  // 1패스: 한글 먼저 노출 → 영어 손 쓰기 → EN만 읽기
  for (let g = 0; g < groups.length; g += 1) {
    const group = groups[g];
    if (g === 0) {
      renderGroupWindow(group, 0, false, "second-pass");
    } else {
      await shiftToNextGroup(group, "second-pass");
    }

    showKoAsDefault();
    if (EN_USE_HANDWRITE) hideAllEnText();
    else showAllEnText();
    applyPronVisibility();
    applyCfVisibility();

    for (let w = 0; w < group.wordIndices.length; w += 1) {
      const globalIndex = group.wordIndices[w];
      if (w > 0 && w % WORDS_PER_PAGE === 0) {
        await shiftGroupWordsDown(group, w, "second-pass");
        showKoAsDefault();
        if (EN_USE_HANDWRITE) hideAllEnText();
        else showAllEnText();
        applyPronVisibility();
        applyCfVisibility();
      }

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      const enTextEl = item.querySelector(".en-main-text");
      const pronTextEl = item.querySelector(".pron-text");

      item.classList.add("is-word-active");
      preloadWordTTS(json1[globalIndex], globalIndex);
      if (EN_USE_HANDWRITE) {
        reserveEnSlot(enTextEl, item.dataset.en || "");
        await writeEnWithHand(enTextEl, item.dataset.en || "", pronTextEl);
      } else {
        revealEnText(enTextEl, item.dataset.en || "");
        revealPronText(pronTextEl);
      }
      applyCfVisibility();
      revealCfKoBreakdownForItem(item);
      await sleep(120);
      const wordData = json1[globalIndex];
      try {
        await playEnTTS(getEnSpeakText(wordData));
      } catch (_) {}
      if (shouldSpeakCfEnglish(wordData)) {
        await sleep(350);
        await playCfEnglishWithHighlight(item, wordData);
      }
      if (shouldSpeakCf2(wordData)) {
        await sleep(350);
        await playCf2Speak(wordData, item);
      }
      const exampleKoEl = item.querySelector(".example-ko");
      const cfKoBreakdownEl = item.querySelector(".cf-ko-breakdown");
      if (getExampleKoSpeakText(wordData)) {
        if (exampleKoEl) {
          revealExampleKo(exampleKoEl);
          if (AUTOPLAY_READ_CF_KO) {
            exampleKoEl.classList.add("is-speaking");
            try {
              await playExampleKoTTS(wordData);
            } finally {
              exampleKoEl.classList.remove("is-speaking");
            }
          }
        } else if (cfKoBreakdownEl) {
          if (AUTOPLAY_READ_CF_KO) {
            cfKoBreakdownEl.classList.add("is-speaking");
            try {
              await playExampleKoTTS(wordData);
            } finally {
              cfKoBreakdownEl.classList.remove("is-speaking");
            }
          }
        }
      }

      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      if (EN_USE_HANDWRITE) moveEnHandToNext(group, w);
      await sleep(400);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 2패스: 영어 먼저 읽기 → 한글 손 쓰기 노출
  if (EN_KO_PASS_COUNT >= 2) {
    await sleep(700);

    for (let g = 0; g < groups.length; g += 1) {
      const group = groups[g];
      if (g === 0) {
        renderGroupWindow(group, 0, false, "normal");
      } else {
        await shiftToNextGroup(group, "normal");
      }

      hideAllKoText();
      applyCfVisibility();
      hideAllExampleKoText();

      for (let w = 0; w < group.wordIndices.length; w += 1) {
        const globalIndex = group.wordIndices[w];
        if (w > 0 && w % WORDS_PER_PAGE === 0) {
          await shiftGroupWordsDown(group, w, "normal");
          hideAllKoText();
          applyCfVisibility();
          hideAllExampleKoText();
        }

        preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

        const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
        if (!item || item.dataset.itemType !== "word") continue;

        const ko = item.dataset.ko || "";
        const koTextEl = item.querySelector(".ko-text");

        item.classList.add("is-word-active");
        preloadCfEnglishTTS(json1[globalIndex]);
        reserveKoSlot(koTextEl, ko);
        try {
          await playEnTTS(getEnSpeakText(json1[globalIndex]));
        } catch (_) {}
        if (koTextEl) {
          await writeKoWithHand(koTextEl, ko);
        }
        const cfNoteEl = item.querySelector(".cf-note");
        if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
        await sleep(120);
        // 한글은 노출만 (TTS 없음) → 손은 다음 단어로 미리 이동
        moveKoHandToNext(group, w);
        if (shouldSpeakCfEnglish(json1[globalIndex])) {
          await sleep(350);
          await playCfEnglishWithHighlight(item, json1[globalIndex]);
        }
        if (shouldSpeakCf2(json1[globalIndex])) {
          await sleep(350);
          await playCf2Speak(json1[globalIndex], item);
        } else if (shouldSpeakCfEnglish(json1[globalIndex])) {
          await sleep(350);
          await playCfEnglishWithHighlight(item, json1[globalIndex], [0.87], { coreOnly: true });
        }
        await showWordFlashImage(globalIndex);
        await sleep(120);
        await markWordAsRead(globalIndex);
        doneCount += 1;
        updateProgress(doneCount, progressTotal);
        await sleep(80);
      }
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  await startReviewQuiz();

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

applyPageBackground();
initSharedPageBgPicker();
applyThumbTypography();
if (pageTitleEl) applyPageTitle();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
