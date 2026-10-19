const PAGE_TITLE_HTML = `<span class="title-main">시사 영단어</span>
<span class="title-accent title-sub">시사하다, 암시하다, 넌지시 말하다<br><span class="title-green">연관단어</span></span><span class="title-meta"></span>
<span class="progress-wrap" aria-live="polite">
  <span class="progress-label" id="progress-label">진행도 0 / 5</span>
  <span class="progress-track">
    <span class="progress-fill" id="progress-fill">
      <span class="progress-runner" id="progress-runner" data-motion="walk" aria-hidden="true">🚶🏻‍♂️</span>
      <span class="progress-pct" id="progress-pct">0%</span>
    </span>
  </span>
</span>`;

const VISIBLE_COUNT = 4;
const EN_KO_PASS_COUNT = 2;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** 진행 바 이모지 A/B — autoplay마다 랜덤 */
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
  }
];
let activeProgressBarTheme = PROGRESS_BAR_THEMES[0];

///영어만 읽는 버젼.
// cf는 화면 표시만 (TTS 없음)
const json1 = 


[

  { "title1": "" },

  {
    "en": "possessions",
    "ko": "소유물, 소지품",
    "hint": "my precious possessions",
    "pronunciation": "퍼제션즈",
    "ipa": "/pəˈzeʃənz/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "my precious possessions",
    "cf2": "",
    "image": "possessions.jpg"
  },
  {
    "en": "will",
    "ko": "유언장",
    "hint": "discussed his will",
    "pronunciation": "윌",
    "ipa": "/wɪl/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "discussed his will",
    "cf2": "",
    "image": "will.jpg"
  },
  {
    "en": "inheritance",
    "ko": "상속, 유산",
    "hint": "inheritance money",
    "pronunciation": "인헤리턴스",
    "ipa": "/ɪnˈherɪtəns/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "inheritance money",
    "cf2": "",
    "image": "inheritance.jpg"
  },
  {
    "en": "organisation",
    "ko": "단체, 기관",
    "hint": "go to organisations",
    "pronunciation": "오거나이제이션",
    "ipa": "/ˌɔːrɡənəˈzeɪʃən/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "go to organisations",
    "cf2": "",
    "image": "organisation.jpg"
  },
  
]
  
    ;


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
/** true면 json1.image를 하단 #page-bg에 단어마다 교체 */
const PAGE_BG_USE_WORD_IMAGES = true;
const PAGE_BG_WORD_FADE_MS = 850;
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
/** 영어 TTS: autoplay 시작 시 EN_TTS_VOICE_IDS 중 하나를 랜덤 선택 후 세션 내내 유지 — 미국 남·여 각 3개 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D", // 남 · 미국
  2: "en-US-Chirp3-HD-Algenib", // 남 · 허스키
  3: "en-US-Chirp3-HD-Enceladus", // 남 · 허스키
  4: "en-US-Chirp-HD-F", // 여 · 미국
  5: "en-US-Chirp3-HD-Despina", // 여
  6: "en-US-Chirp3-HD-Gacrux" // 여 · 허스키
};
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[EN_TTS_VOICE];

function pickRandomVoiceFromPool(voices, currentId) {
  const list = Array.isArray(voices) ? voices.filter(Boolean) : [];
  if (!list.length) return currentId || "";
  if (list.length === 1) return list[0];
  let next = list[Math.floor(Math.random() * list.length)];
  let guard = 0;
  while (next === currentId && guard < 16) {
    next = list[Math.floor(Math.random() * list.length)];
    guard += 1;
  }
  return next;
}

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = pickRandomVoiceFromPool(voices, activeEnTtsVoiceId);
  console.info("[01g] EN voice", activeEnTtsVoiceId);
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

/** 출처: (BBC, 2026/07/29) 또는 *BBC, 2026/07/29 → body / source 분리 */
function splitCfBodyAndSource(cfText) {
  const text = String(cfText || "").trim();
  if (!text) return { body: "", source: "" };
  const m = text.match(/^(.*?)\s*(?:\(([^)]+)\)|\*([^*\n]+))\s*$/);
  if (!m) return { body: text, source: "" };
  const candidate = String(m[2] || m[3] || "").trim();
  const looksLikeSource =
    /\d{4}\s*[\/.\-]/.test(candidate) ||
    /^(BBC|NPR|Time|WSJ|CNN|Reuters|AP|NYT|Yahoo|The\s)/i.test(candidate);
  if (!looksLikeSource) return { body: text, source: "" };
  return { body: m[1].trim(), source: candidate };
}

/** cf 영어 문장(+출처)을 span으로 감싸 읽기 중 단어별 하이라이트용 */
function wrapCfParenEnglish(cfHtml) {
  const raw = String(cfHtml || "");
  const { body, source } = splitCfBodyAndSource(raw.replace(/<[^>]+>/g, ""));
  if (source) {
    // underline 등은 body 구간에만 유지
    const bodyHtml = raw.replace(/\s*(?:\([^)]+\)|\*[^*\n]+)\s*$/, "").trim();
    const wrapped = /[A-Za-z]/.test(body)
      ? `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(bodyHtml)}</span>`
      : bodyHtml;
    return `${wrapped} <span class="cf-source">*${escapeEnHtml(source)}</span>`;
  }
  let idx = 0;
  return raw.replace(/\(([^)]+)\)/g, (full, inner) => {
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

function pickRandomProgressBarTheme() {
  const i = Math.floor(Math.random() * PROGRESS_BAR_THEMES.length);
  return PROGRESS_BAR_THEMES[i] || PROGRESS_BAR_THEMES[0];
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
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
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

/** 15자 초과 → 한글을 아래로, ':'는 EN 바로 뒤 */
function shouldStackKoUnderEn(en) {
  const text = String(en || "").trim();
  if (!text) return false;
  return text.length > 15;
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
  const showPreview = mode === "second-pass";
  const enHiddenClass = showPreview ? " hidden-en-main" : "";
  const previewHiddenClass = showPreview ? "" : " hidden-en-preview";
  const mask = buildEnPreviewMask(item.en);
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  const koContent = mode === "second-pass" ? (item.ko || "") : "";
  const num = getWordDisplayNumber(globalIndex);
  const multiWordClass = shouldStackKoUnderEn(item.en) ? " multi-word-en" : "";
  const wordLine = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview${previewHiddenClass}">${escapeEnHtml(mask)}</span><span class="en-main-text${enHiddenClass}">${escapeEnHtml(item.en)}</span></span> <span class="word-suffix"><span class="word-colon">:</span> <span class="ko-text${koHiddenClass}" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(koContent)}</span></span>`;
  /* cf/cf2 영어는 하단 #page-bg-cf(이미지 상단과 겹치는 자막)에만 표시 */
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
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span></div></div>`;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <span class="order-num" aria-hidden="true">${num}.</span>
      <div class="word-content">
        <div class="word-line${multiWordClass}">${wordLine}</div>
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
  return PAGE_BG_COLOR_DEFAULT;
}

/** "broadside.jpg" → resources/broadside.jpg 절대 href */
function resolveWordImageHref(fileName) {
  const file = String(fileName || "").trim();
  if (!file) return "";
  const rel = file.includes("/") ? file : `${WORD_FLASH_IMAGE_DIR}${file}`;
  try {
    const url = new URL(rel, document.baseURI);
    url.pathname = url.pathname
      .split("/")
      .map((seg) => {
        try {
          return encodeURIComponent(decodeURIComponent(seg));
        } catch (_) {
          return encodeURIComponent(seg);
        }
      })
      .join("/");
    url.searchParams.set("v", "20261013u5bg");
    return url.href;
  } catch (_) {
    return encodeURI(rel);
  }
}

function resolvePageBgPhotoPath(wordItem) {
  if (PAGE_BG_USE_WORD_IMAGES && wordItem && isWordItem(wordItem)) {
    const file = String(wordItem.image || "").trim();
    if (file) return file.includes("/") ? file : `${WORD_FLASH_IMAGE_DIR}${file}`;
  }
  return String(PAGE_BG_IMAGE || "").trim();
}

function getPageBgPhotoEl() {
  const bgEl = document.getElementById("page-bg");
  if (!bgEl) return null;
  let img = document.getElementById("page-bg-photo");
  if (!img) {
    img = document.createElement("img");
    img.id = "page-bg-photo";
    img.alt = "";
    img.decoding = "async";
    img.draggable = false;
    bgEl.appendChild(img);
  }
  return img;
}

let pageBgPhotoToken = 0;

async function setPageBgPhoto(photoPath, { fade = true } = {}) {
  const pageBgColor = resolvePageBgColor();
  const href = resolveWordImageHref(photoPath);
  const token = ++pageBgPhotoToken;

  document.documentElement.style.setProperty("--page-bg-color", pageBgColor);
  document.documentElement.style.setProperty("--page-bg-base-image", "none");
  document.documentElement.style.setProperty("--page-bg-image", href ? `url("${href}")` : "none");
  document.documentElement.style.setProperty("background-color", pageBgColor, "important");
  document.documentElement.style.setProperty("background-image", "none", "important");
  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  const img = getPageBgPhotoEl();
  if (bgEl) {
    bgEl.style.backgroundImage = "none";
    bgEl.style.setProperty("--page-bg-color", pageBgColor);
    bgEl.hidden = !href;
    document.body?.classList.toggle("has-page-bg-photo", Boolean(href));
  }
  if (!img) return;

  const prevSrc = img.getAttribute("src") || "";
  const changing = Boolean(href) && Boolean(prevSrc) && prevSrc !== href;
  const revealing = Boolean(href) && !prevSrc;
  if (fade && changing && PAGE_BG_WORD_FADE_MS > 0) {
    img.classList.add("is-fading");
    await sleep(PAGE_BG_WORD_FADE_MS);
    if (token !== pageBgPhotoToken) return;
  }

  if (!href) {
    img.removeAttribute("src");
    img.classList.remove("is-fading");
  } else if (prevSrc !== href) {
    if (fade && revealing && PAGE_BG_WORD_FADE_MS > 0) {
      img.classList.add("is-fading");
      void img.offsetWidth;
    }
    await new Promise((resolve) => {
      const done = () => {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
        resolve();
      };
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      img.src = href;
      if (img.complete) done();
    });
    if (token !== pageBgPhotoToken) return;
  }
  void img.offsetWidth;
  img.classList.remove("is-fading");
  if (fade && Boolean(href) && (changing || revealing) && PAGE_BG_WORD_FADE_MS > 0) {
    await sleep(PAGE_BG_WORD_FADE_MS);
    if (token !== pageBgPhotoToken) return;
  }
  if (bgEl) bgEl.style.opacity = href ? "1" : "0";
}

function setPageBgForWordIndex(globalIndex, options) {
  const item = json1[globalIndex];
  if (!isWordItem(item)) return;
  const file = String(item.image || "").trim();
  const path = file
    ? file.includes("/")
      ? file
      : `${WORD_FLASH_IMAGE_DIR}${file}`
    : resolvePageBgPhotoPath(item);
  void setPageBgPhoto(path, options);
  /* cf/cf2는 이미지와 함께 미리 노출 */
  setPageBgCf(item);
}

function getPageBgCfEl() {
  return document.getElementById("page-bg-cf");
}

function normalizePageBgCfTokenCore(token) {
  return String(token || "")
    .replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, "")
    .toLowerCase();
}

/** hint(문자열·배열) → 비교용 단어 배열 목록 */
function getPageBgCfHintPhraseLists(hintField) {
  const rawList = Array.isArray(hintField)
    ? hintField
    : String(hintField || "").trim()
      ? [hintField]
      : [];
  return rawList
    .map((p) =>
      String(p || "")
        .trim()
        .split(/\s+/)
        .map(normalizePageBgCfTokenCore)
        .filter(Boolean)
    )
    .filter((parts) => parts.length > 0)
    .sort((a, b) => b.length - a.length);
}

/** cf 토큰 중 hint 구문(연속 단어)과 일치하는 인덱스 */
function markPageBgCfHintTokens(words, hintField) {
  const flags = new Array(words.length).fill(false);
  const phrases = getPageBgCfHintPhraseLists(hintField);
  for (const phrase of phrases) {
    for (let i = 0; i <= words.length - phrase.length; i += 1) {
      let matched = true;
      for (let j = 0; j < phrase.length; j += 1) {
        if (normalizePageBgCfTokenCore(words[i + j]) !== phrase[j]) {
          matched = false;
          break;
        }
      }
      if (matched) {
        for (let j = 0; j < phrase.length; j += 1) flags[i + j] = true;
      }
    }
  }
  return flags;
}

/** cf 영어 — hint 구문은 .cf-en-key(노랑) */
function fillPageBgCfLines(textEl, enText, hintField = "") {
  const words = String(enText || "").trim().split(/\s+/).filter(Boolean);
  textEl.replaceChildren();
  if (!words.length) return;
  const isHint = markPageBgCfHintTokens(words, hintField);
  for (let i = 0; i < words.length; i += 1) {
    if (i > 0) textEl.appendChild(document.createTextNode(" "));
    const tok = words[i];
    if (isHint[i]) {
      const key = document.createElement("span");
      key.className = "cf-en-key";
      key.textContent = tok;
      textEl.appendChild(key);
    } else {
      textEl.appendChild(document.createTextNode(tok));
    }
  }
}

/** cf2 — 괄호 안 단어만 노란색(괄호 기호는 화면에서 제거) */
function formatPageBgCf2Html(cf2) {
  return escapeEnHtml(String(cf2 || "").trim()).replace(
    /\(([^)]+)\)/g,
    '<span class="page-bg-cf2-hl">$1</span>'
  );
}

/** cf 본문 영어(한글 괄호·한글 문자 제거) */
function getCfEnSpeakText(word) {
  const cf = String(word?.cf || "").trim();
  if (!cf) return "";
  return cf
    .replace(/\([\uAC00-\uD7A3\u3131-\u318E][^)]*\)/g, "")
    .replace(/[\uAC00-\uD7A3\u3131-\u318E]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** cf 영어 문장 → 이미지 바로 위 자막. cf2는 비어 있지 않을 때만 */
function setPageBgCf(word) {
  const el = getPageBgCfEl();
  if (!el) return;
  const enText = getCfEnSpeakText(word) || String(word?.cf || "").trim();
  const cf2Text = String(word?.cf2 || "").trim();
  const hasCf = Boolean(enText && /[A-Za-z]/.test(enText));
  if (!hasCf && !cf2Text) {
    clearPageBgCf();
    return;
  }
  el.replaceChildren();
  if (hasCf) {
    const textEl = document.createElement("span");
    textEl.className = "page-bg-cf-text";
    fillPageBgCfLines(textEl, enText, word?.hint);
    el.appendChild(textEl);
  }
  if (cf2Text) {
    const cf2El = document.createElement("span");
    cf2El.className = "page-bg-cf-text page-bg-cf2-text";
    cf2El.innerHTML = formatPageBgCf2Html(cf2Text);
    el.appendChild(cf2El);
  }
  el.hidden = false;
  el.setAttribute("aria-hidden", "false");
}

function clearPageBgCf() {
  const el = getPageBgCfEl();
  if (!el) return;
  el.innerHTML = "";
  el.hidden = true;
  el.setAttribute("aria-hidden", "true");
}

function preloadWordPageBgImages() {
  if (!PAGE_BG_USE_WORD_IMAGES) return;
  json1.forEach((item) => {
    if (!isWordItem(item)) return;
    const file = String(item.image || "").trim();
    if (!file) return;
    const href = resolveWordImageHref(file.includes("/") ? file : `${WORD_FLASH_IMAGE_DIR}${file}`);
    if (!href) return;
    const probe = new Image();
    probe.decoding = "async";
    probe.src = href;
  });
}

function applyPageBackground() {
  if (PAGE_BG_USE_WORD_IMAGES) {
    const firstIdx = json1.findIndex((it) => isWordItem(it));
    if (firstIdx >= 0) {
      setPageBgForWordIndex(firstIdx, { fade: false });
      return;
    }
  }
  clearPageBgCf();
  void setPageBgPhoto(resolvePageBgPhotoPath(null), { fade: false });
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
  const voice = activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  for (let i = 0; i < rateList.length; i += 1) {
    if (i > 0) await sleep(160);
    await playBackendTTS(enText, voice, rateList[i], wordEls);
  }
}

function preloadKoTTS(word) {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  loadBackendTTSAudio(koText, "ko-KR").catch(() => {});
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
  const stacked = Boolean(koTextEl.closest(".multi-word-en"));
  // 한글 음절은 시각적으로 넓음 + 아래 줄일 때 더 여유 → 20% 빠르게
  const perLetter = stacked ? 192 : 144;
  const duration = Math.max(stacked ? 720 : 560, Math.min(2720, 320 + letters * perLetter));
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
  const long = charCount >= 10;
  const n = Math.max(16, Math.round(charCount * (long ? 4 : 5)));
  const speeds = [];
  for (let i = 0; i < n; i += 1) {
    const r = Math.random();
    let s;
    if (long) {
      // 긴 단어: 급가속/급정지를 줄여 손이 덜 튀게
      if (r < 0.08) s = 0.35 + Math.random() * 0.2;
      else if (r < 0.22) s = 1.15 + Math.random() * 0.35;
      else s = 0.7 + Math.random() * 0.4;
    } else if (r < 0.14) s = 0.18 + Math.random() * 0.22; // 망설임/멈칫
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

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 불규칙하게 씀 */
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
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">` +
    `<span class="en-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  enTextEl.style.setProperty("--en-write-p", "0");
  if (pronTextEl) pronTextEl.style.setProperty("--en-write-p", "0");
  void enTextEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  // 긴 단어는 상한(1800)에 걸려 손이 너무 빨라지던 문제 → 글자 수에 맞게 늘림
  const duration = Math.max(500, Math.min(3600, 320 + letters * 125));
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
  const enMain = enTextEl.closest(".en-main");
  const text = enMain?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main", "en-partial-preview");
  hideEnPreview(enTextEl);
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  pickRandomEnTtsVoice();
  activeProgressBarTheme = pickRandomProgressBarTheme();
  console.info("[01g] progress bar:", activeProgressBarTheme.id);

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
  hideAllCfText();
  preloadWordsAhead(0, json1.length);
  if (PAGE_BG_USE_WORD_IMAGES) {
    preloadWordPageBgImages();
    const firstWordIdx = groups[0]?.wordIndices?.[0];
    if (Number.isFinite(firstWordIdx)) setPageBgForWordIndex(firstWordIdx, { fade: false });
  }
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
    hideAllEnText();
    hideAllPronText();
    hideAllCfText();

    for (let w = 0; w < group.wordIndices.length; w += 1) {
      const globalIndex = group.wordIndices[w];
      if (w > 0 && w % WORDS_PER_PAGE === 0) {
        await shiftGroupWordsDown(group, w, "second-pass");
        showKoAsDefault();
        hideAllEnText();
        hideAllPronText();
        hideAllCfText();
      }

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      // 하단 bg: 현재 단어 json image + cf/cf2
      if (PAGE_BG_USE_WORD_IMAGES) setPageBgForWordIndex(globalIndex);

      const enTextEl = item.querySelector(".en-main-text");
      const pronTextEl = item.querySelector(".pron-text");

      item.classList.add("is-word-active");
      preloadEnTTS(json1[globalIndex]);
      reserveEnSlot(enTextEl, item.dataset.en || "");
      // 한글은 노출만 (TTS 없음) → 영어 손 쓰기 후 EN만 읽기
      await writeEnWithHand(enTextEl, item.dataset.en || "", pronTextEl);
      await sleep(120);
      enTextEl?.classList.add("is-speaking");
      try {
        await playEnTTS(getEnSpeakText(json1[globalIndex]));
      } finally {
        enTextEl?.classList.remove("is-speaking");
      }

      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      moveEnHandToNext(group, w);
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
      hideAllCfText();

      for (let w = 0; w < group.wordIndices.length; w += 1) {
        const globalIndex = group.wordIndices[w];
        if (w > 0 && w % WORDS_PER_PAGE === 0) {
          await shiftGroupWordsDown(group, w, "normal");
          hideAllKoText();
          hideAllCfText();
        }

        preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

        const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
        if (!item || item.dataset.itemType !== "word") continue;

        if (PAGE_BG_USE_WORD_IMAGES) setPageBgForWordIndex(globalIndex);

        const ko = item.dataset.ko || "";
        const koTextEl = item.querySelector(".ko-text");

        item.classList.add("is-word-active");
        reserveKoSlot(koTextEl, ko);
        const enMainEl = item.querySelector(".en-main-text");
        if (enMainEl) enMainEl.classList.add("is-speaking");
        try {
          await playEnTTS(getEnSpeakText(json1[globalIndex]));
        } finally {
          if (enMainEl) enMainEl.classList.remove("is-speaking");
        }
        if (koTextEl) {
          await writeKoWithHand(koTextEl, ko);
        }
        await sleep(120);
        // 한글은 노출만 (TTS 없음) → 손은 다음 단어로 미리 이동
        moveKoHandToNext(group, w);
        await showWordFlashImage(globalIndex);
        await sleep(120);
        await markWordAsRead(globalIndex);
        doneCount += 1;
        updateProgress(doneCount, progressTotal);
        await sleep(80);
      }
    }
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
