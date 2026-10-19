const PAGE_TITLE_HTML = `<span class="title-main">시사 영단어</span>
<span class="title-accent title-sub"><span class="hl">인도의 Z세대</span> 시위대가 <br>모디 정부로부터 승리를 쟁취했다</span>
<span class="title-meta">( The Wall Street Journal | 2026/07/25 )</span>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 2;
/** 화면 레이아웃 기준 슬롯 수 — VISIBLE_COUNT가 2·3이어도 첫 단어 Y 위치 고정 */
const LAYOUT_SLOT_COUNT = 3;
/** cf 괄호 안 영어 TTS 횟수 */
const CF_SPEAK_COUNT = 2;


const json1 = 

[

  
  { "en": "sport", "ko": "갖추고 있다", "koExtra": "", "pronunciation": "스포트", "ipa": "/spɔːrt/", "pos": "동", "cf": "", "image": "" },

{ "en": "market capitalization", "ko": "시가총액", "koExtra": "", "pronunciation": "마켓 캐퍼털러제이션", "ipa": "/ˈmɑːrkət ˌkæpətələˈzeɪʃən/", "pos": "명", "cf": "", "image": "" },

{ "en": "equivalent", "ko": "동등한", "koExtra": "", "pronunciation": "이퀴벌런트", "ipa": "/ɪˈkwɪvələnt/", "pos": "형", "cf": "", "image": "" },

{ "en": "opening day", "ko": "첫 거래일", "koExtra": "", "pronunciation": "오프닝 데이", "ipa": "/ˈoʊpənɪŋ deɪ/", "pos": "명", "cf": "", "image": "" },

{ "en": "trading", "ko": "거래", "koExtra": "", "pronunciation": "트레이딩", "ipa": "/ˈtreɪdɪŋ/", "pos": "명", "cf": "", "image": "" },

{ "en": "dynamic random-access memory", "ko": "동적 임의 접근 메모리", "koExtra": "", "pronunciation": "다이내믹 랜덤 액세스 메모리", "ipa": "/daɪˈnæmɪk ˈrændəm ˈækses ˈmeməri/", "pos": "명", "cf": "", "image": "" },

{ "en": "DRAM", "ko": "디램", "koExtra": "", "pronunciation": "디램", "ipa": "/ˈdiːræm/", "pos": "명", "cf": "", "image": "" },

{ "en": "skyrocket", "ko": "급등하다", "koExtra": "", "pronunciation": "스카이로킷", "ipa": "/ˈskaɪˌrɑːkət/", "pos": "동", "cf": "", "image": "" },

{ "en": "owing to", "ko": "~때문에", "koExtra": "", "pronunciation": "오잉 투", "ipa": "/ˈoʊɪŋ tuː/", "pos": "전", "cf": "", "image": "" },

{ "en": "demand", "ko": "수요", "koExtra": "", "pronunciation": "디맨드", "ipa": "/dɪˈmænd/", "pos": "명", "cf": "", "image": "" },

{ "en": "price-conscious", "ko": "가격에 민감한", "koExtra": "", "pronunciation": "프라이스 칸셔스", "ipa": "/ˈpraɪs ˌkɑːnʃəs/", "pos": "형", "cf": "", "image": "" },

{ "en": "consumer", "ko": "소비자", "koExtra": "", "pronunciation": "컨수머", "ipa": "/kənˈsuːmər/", "pos": "명", "cf": "", "image": "" },

{ "en": "executive", "ko": "임원", "koExtra": "", "pronunciation": "이그제큐티브", "ipa": "/ɪɡˈzekjətɪv/", "pos": "명", "cf": "", "image": "" },

{ "en": "pitch", "ko": "제안하다", "koExtra": "", "pronunciation": "피치", "ipa": "/pɪtʃ/", "pos": "동", "cf": "", "image": "" },

{ "en": "official", "ko": "당국자", "koExtra": "", "pronunciation": "어피셜", "ipa": "/əˈfɪʃəl/", "pos": "명", "cf": "", "image": "" },

{ "en": "exuberant", "ko": "열광적인", "koExtra": "", "pronunciation": "익주버런트", "ipa": "/ɪɡˈzuːbərənt/", "pos": "형", "cf": "", "image": "" },

{ "en": "investor response", "ko": "투자자 반응", "koExtra": "", "pronunciation": "인베스터 리스판스", "ipa": "/ɪnˈvestər rɪˈspɑːns/", "pos": "명", "cf": "", "image": "" },

{ "en": "initial public offering", "ko": "기업공개", "koExtra": "", "pronunciation": "이니셜 퍼블릭 오퍼링", "ipa": "/ɪˈnɪʃəl ˈpʌblɪk ˈɔːfərɪŋ/", "pos": "명", "cf": "", "image": "" },

{ "en": "torrid", "ko": "폭발적인", "koExtra": "", "pronunciation": "토리드", "ipa": "/ˈtɔːrɪd/", "pos": "형", "cf": "", "image": "" },

{ "en": "quarter", "ko": "분기", "koExtra": "", "pronunciation": "쿼터", "ipa": "/ˈkwɔːrtər/", "pos": "명", "cf": "", "image": "" }
  
]
    ;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 900;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_IMAGE = "resources/news.jpg";
const WORD_FLASH_FADE_IN_MS = 950;
const WORD_FLASH_DISPLAY_MS = 1800;
const WORD_FLASH_FADE_OUT_MS = 1100;
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

/** 한국어 TTS: KO_TTS_VOICE 번호로 선택 — 1=Neural2-C(여), 2=Achird(남), 3=Achernar(여) */
const KO_TTS_VOICE = 3;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};
/** 영어 TTS: EN_TTS_VOICE 번호로 선택 — 1=미국 남성, 2=영국 남성 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D",
  2: "en-GB-Chirp-HD-D"
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

/** cf 괄호 안 영어를 단어·숫자 span으로 감싸 순차 하이라이트용 */
function wrapCfEnglishWords(innerHtml) {
  return String(innerHtml || "").replace(/(<[^>]+>)|([^<]+)/g, (full, tag, text) => {
    if (tag) return tag;
    // 영단어 + 숫자(300,000 / $90 / 12.5% 등)를 각각 하이라이트 토큰으로
    return String(text).replace(
      /\$?\d{1,3}(?:,\d{3})+(?:\.\d+)?%?|\$?\d+(?:\.\d+)?%?|[A-Za-z]+(?:'[A-Za-z]+)?(?:-[A-Za-z]+)*/g,
      (word) => `<span class="cf-en-word">${word}</span>`
    );
  });
}

/** cf 괄호 안 영어만 span으로 감싸 EN/KO 색 분리 + 단어 단위 하이라이트 */
function wrapCfParenEnglish(cfHtml) {
  return String(cfHtml || "").replace(/\(([^)]+)\)/g, (full, inner) => {
    if (!/[A-Za-z]/.test(inner)) return full;
    return `<span class="cf-en-paren">(${wrapCfEnglishWords(inner)})</span>`;
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
      <span class="group-title-num">${titleInfo.num}.</span>
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

  // title이 없고 단어만 있는 데이터도 한 그룹으로 재생
  if (!groups.length) {
    const wordIndices = [];
    json1.forEach((item, index) => {
      if (isWordItem(item)) wordIndices.push(index);
    });
    if (wordIndices.length) {
      groups.push({ titleIndex: -1, titleItem: null, wordIndices });
    }
  }
  return groups;
}

function wordsPerPageFor(group) {
  // title이 있으면 한 칸을 차지하고, 없으면 VISIBLE_COUNT만큼 단어만 표시
  const hasTitle = Boolean(group?.titleItem);
  return Math.max(1, hasTitle ? VISIBLE_COUNT - 1 : VISIBLE_COUNT);
}

function createLayoutSpacerElement() {
  const el = document.createElement("article");
  el.className = "ticker-item ticker-slot-spacer";
  el.dataset.itemType = "spacer";
  el.setAttribute("aria-hidden", "true");
  return el;
}

function removeLayoutSpacers() {
  tickerEl.querySelectorAll(".ticker-slot-spacer").forEach((el) => el.remove());
}

/** title + 단어 슬롯을 LAYOUT_SLOT_COUNT까지 보이지 않는 칸으로 채워 첫 단어 위치 고정 */
function appendLayoutSpacers(currentSlotCount) {
  removeLayoutSpacers();
  const needed = LAYOUT_SLOT_COUNT - currentSlotCount;
  for (let i = 0; i < needed; i += 1) {
    tickerEl.appendChild(createLayoutSpacerElement());
  }
}

function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  let slotCount = 0;
  if (group.titleItem) {
    const titleEl = createEntryElement(group.titleItem, group.titleIndex, mode);
    if (animateIn) titleEl.classList.add("slide-in");
    tickerEl.appendChild(titleEl);
    slotCount += 1;
  }

  const perPage = wordsPerPageFor(group);
  group.wordIndices
    .slice(wordStartInGroup, wordStartInGroup + perPage)
    .forEach((globalIndex) => {
      const el = createEntryElement(json1[globalIndex], globalIndex, mode);
      if (animateIn) el.classList.add("slide-in");
      tickerEl.appendChild(el);
      slotCount += 1;
    });
  appendLayoutSpacers(slotCount);
}

async function shiftGroupWordsDown(group, nextWordStartInGroup, mode = "normal") {
  removeLayoutSpacers();
  const wordItems = Array.from(tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]'));
  wordItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  wordItems.forEach((el) => el.remove());

  let slotCount = group.titleItem ? 1 : 0;
  const perPage = wordsPerPageFor(group);
  group.wordIndices
    .slice(nextWordStartInGroup, nextWordStartInGroup + perPage)
    .forEach((globalIndex) => {
      const el = createEntryElement(json1[globalIndex], globalIndex, mode);
      el.classList.add("slide-in");
      tickerEl.appendChild(el);
      slotCount += 1;
    });
  appendLayoutSpacers(slotCount);
}

async function shiftToNextGroup(group, mode = "normal") {
  const oldItems = Array.from(tickerEl.querySelectorAll(".ticker-item"));
  oldItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  renderGroupWindow(group, 0, true, mode);
}

function renderStaticList() {
  const groups = buildGroups();
  if (!groups.length) return;
  renderGroupWindow(groups[0], 0, false, "normal");
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("second-pass-mode");
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const wordLine = `<span class="en-main" data-full-en="${item.en}">${item.en}</span><span class="word-sep" aria-hidden="true"> : </span><span class="ko-text hidden-ko" data-full-ko="${item.ko}"></span>`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfParenEnglish(underlineTargetInCf(cfText, targetWord));
  // cf 슬롯은 항상 두어, 예문 유무로 EN 단어 간격이 흔들리지 않게 함
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf">cf. ${cfTextWithUnderline}</span>`
    : `<span class="cf-note hidden-cf" aria-hidden="true"></span>`;
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
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const pronLine = `<div class="pron-line"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${cfHtml}</div>`;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <div class="word-content">
        <div class="word-line">${wordLine}</div>
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
  // 같은 파일명(news.jpg)으로 이미지를 교체해도 즉시 반영되도록 캐시 무효화
  const bgUrl = new URL(PAGE_BG_IMAGE, document.baseURI);
  bgUrl.searchParams.set("v", String(Date.now()));
  const bgSrc = bgUrl.href;
  document.documentElement.style.setProperty("--page-bg-image", `url("${bgSrc}")`);
  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${bgSrc}")`;
  }
}

function resetWordFlashImage() {
  if (!wordFlashImgEl) return;
  wordFlashImgEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashImgEl.style.clipPath = "";
}

async function canLoadImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

async function showWordFlashImage(wordIndex) {
  if (!wordFlashImgEl) return;
  const src = getWordFlashImageSrc(wordIndex);
  resetWordFlashImage();
  if (!src || !(await canLoadImage(src))) return;

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

function getTTSUrl(text, languageKey, { marks = false } = {}) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  const langParam = isEn ? resolveEnTtsVoiceId(normalizedLang) : resolveKoTtsVoiceId(normalizedLang);
  const marksQ = marks ? "&marks=1" : "";
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}${marksQ}`;
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

/** cf 괄호 안 영어만 추출 (한글만 있는 괄호는 제외) */
function extractCfParenEnglish(cfText) {
  const text = String(cfText || "");
  const parts = [];
  const re = /\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const inner = String(match[1] || "").trim();
    if (inner && /[A-Za-z]/.test(inner)) parts.push(inner);
  }
  return parts.join(". ");
}

/**
 * 화면 `.cf-en-word` 토큰과 TTS mark 단어 수를 맞추기 위한 정규화.
 * - em/en dash(— –)는 화면에서 단어가 갈라지므로 공백으로
 * - AI → A.I. (백엔드가 AI를 "A I" 두 단어로 쪼개지 않게)
 */
function normalizeCfEnglishForTts(text) {
  return String(text || "")
    .replace(/[—–]/g, " ")
    .replace(/\bAI\b/gi, "A.I.")
    .replace(/\s+/g, " ")
    .trim();
}

function getCfEnglishSpeakText(word) {
  return normalizeCfEnglishForTts(extractCfParenEnglish(word?.cf));
}

const ttsAudioCache = new Map();
const ttsMarksCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;
/** cf 하이라이트가 음성보다 앞서지 않도록 (초) — 값이 클수록 하이라이트가 느려짐 */
const CF_HIGHLIGHT_LAG_SEC = 0.06;

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

function normalizeTtsTimepoints(rawList) {
  return (Array.isArray(rawList) ? rawList : [])
    .map((tp) => ({
      markName: String(tp.markName ?? tp.mark_name ?? ""),
      timeSeconds: Number(tp.timeSeconds ?? tp.time_seconds ?? 0),
    }))
    .filter((tp) => tp.markName)
    .sort((a, b) => a.timeSeconds - b.timeSeconds);
}

function parseTtsMarkWordIndex(markName) {
  const m = /^w(\d+)$/.exec(String(markName || "").trim());
  return m ? parseInt(m[1], 10) : -1;
}

function resolveTtsWordIndexAtTime(timepoints, currentTime) {
  if (!timepoints?.length || !Number.isFinite(currentTime)) return 0;
  const t = Math.max(0, currentTime);
  let idx = 0;
  for (let i = 0; i < timepoints.length; i += 1) {
    const wi = parseTtsMarkWordIndex(timepoints[i].markName);
    if (wi < 0) continue;
    if (t >= timepoints[i].timeSeconds) idx = wi;
    else break;
  }
  return idx;
}

function mapTtsWordIndexToDisplay(ttsWordIdx, ttsWordCount, displayWordCount) {
  const ttsTotal = Math.max(1, ttsWordCount || 1);
  const displayTotal = Math.max(1, displayWordCount || 1);
  if (ttsTotal === displayTotal) {
    return Math.min(displayTotal - 1, Math.max(0, ttsWordIdx));
  }
  const mapped = Math.floor((ttsWordIdx / ttsTotal) * displayTotal);
  return Math.min(displayTotal - 1, Math.max(0, mapped));
}

function getWeightedWordIndex(ratio, weights) {
  const total = weights.reduce((sum, w) => sum + w, 0) || 1;
  let acc = 0;
  const r = Math.min(0.9999, Math.max(0, ratio));
  for (let i = 0; i < weights.length; i += 1) {
    acc += weights[i] / total;
    if (r <= acc) return i;
  }
  return Math.max(0, weights.length - 1);
}

async function fetchMarksTTSEntry(text, languageKey) {
  const url = getTTSUrl(text, languageKey, { marks: true });
  if (!url) return null;
  if (ttsMarksCache.has(url)) return ttsMarksCache.get(url);

  const loadPromise = (async () => {
    let lastErr;
    for (let attempt = 0; attempt < TTS_MAX_RETRIES; attempt += 1) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          const detail = await response.text().catch(() => "");
          const quotaHit = response.status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(detail);
          throw new Error(quotaHit ? "TTS quota exhausted" : `TTS HTTP ${response.status}`);
        }
        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          const b64 = String(data.audio || "");
          const binary = atob(b64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
          const blob = new Blob([bytes], { type: "audio/mpeg" });
          const objectUrl = URL.createObjectURL(blob);
          const timepoints = normalizeTtsTimepoints(data.timepoints);
          return {
            objectUrl,
            timepoints: timepoints.length ? timepoints : null,
            ttsWordCount: Number(data.wordCount) || timepoints.length || 0,
          };
        }
        // marks 미지원 시 plain audio fallback
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        return { objectUrl, timepoints: null, ttsWordCount: 0 };
      } catch (err) {
        lastErr = err;
        if (isNonRetryableTTSError(err) || attempt >= TTS_MAX_RETRIES - 1) throw err;
        await sleep(TTS_RETRY_BASE_MS * (attempt + 1));
      }
    }
    throw lastErr;
  })().catch((err) => {
    ttsMarksCache.delete(url);
    throw err;
  });

  ttsMarksCache.set(url, loadPromise);
  return loadPromise;
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

function preloadCfEnglishTTS(word) {
  const cfEn = getCfEnglishSpeakText(word);
  if (!cfEn) return;
  const voice = resolveEnTtsVoiceId("en-US");
  // EN과 동일 Chirp 음성만 프리로드 (marks는 다른 음성이라 싱크에 쓰지 않음)
  loadBackendTTSAudio(cfEn, voice).catch(() => {});
}

async function playEnTTS(text) {
  const enText = String(text || "").trim();
  if (!enText) return;
  await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"));
}

function preloadKoTTS(word, pass = "first") {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadWordTTS(word, pass = "first") {
  preloadEnTTS(word);
  preloadKoTTS(word, pass);
  if (pass === "first") preloadCfEnglishTTS(word);
}

function preloadWordsAhead(startIndex, count, pass = "first") {
  let loaded = 0;
  for (let i = startIndex; i < json1.length && loaded < count; i += 1) {
    if (!isWordItem(json1[i])) continue;
    preloadWordTTS(json1[i], pass);
    loaded += 1;
  }
}

async function playAudioElement(audio) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  audio.currentTime = 0;

  try {
    await audio.play();
  } catch (_) {
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

/** TTS timepoints(또는 가중 fallback)로 재생 시간에 맞춰 단어 span을 순차 하이라이트 */
async function playAudioWithWordHighlight(audio, wordEls, { timepoints = null, ttsWordCount = 0, speakText = "" } = {}) {
  const words = Array.from(wordEls || []).filter(Boolean);
  if (!words.length) {
    await playAudioElement(audio);
    return;
  }

  words.forEach((el) => el.classList.remove("is-speaking"));
  // 글자 수 + 구두점 뒤 짧은 휴지 가중 (Chirp 재생과 체감 싱크)
  const spoken = String(speakText || "").trim();
  const spokenTokens = spoken ? spoken.split(/\s+/).filter(Boolean) : [];
  const weights = words.map((el, i) => {
    const raw = String(el.textContent || "").trim();
    const core = raw.replace(/[^a-zA-Z0-9']/g, "");
    let w = Math.max(1, core.length || 1);
    // 숫자는 TTS가 풀어 읽으므로(300,000 → three hundred thousand) 가중치 상향
    if (/^\(?\$?\d[\d,.%]*\)?$/.test(raw)) {
      const digits = (raw.match(/\d/g) || []).length;
      w = Math.max(w, digits * 4 + Math.floor(Math.max(0, digits - 1) / 3) * 8);
    }
    const tok = spokenTokens[i] || "";
    if (/[,;:]$/.test(tok)) w += 2;
    if (/[.!?]$/.test(tok)) w += 4;
    return w;
  });
  const marks = Array.isArray(timepoints) && timepoints.length ? timepoints : null;
  const markWordCount = ttsWordCount || marks?.length || 0;
  let lastIdx = -1;
  let animationFrame = 0;

  const syncHighlight = () => {
    const duration = Number(audio.duration);
    if (Number.isFinite(duration) && duration > 0) {
      const t = Math.max(0, audio.currentTime - CF_HIGHLIGHT_LAG_SEC);
      let idx;
      if (marks) {
        const ttsIdx = resolveTtsWordIndexAtTime(marks, t);
        idx = mapTtsWordIndexToDisplay(ttsIdx, markWordCount, words.length);
      } else {
        idx = getWeightedWordIndex(Math.min(0.9999, t / duration), weights);
      }
      if (idx !== lastIdx) {
        if (lastIdx >= 0) words[lastIdx].classList.remove("is-speaking");
        words[idx]?.classList.add("is-speaking");
        lastIdx = idx;
      }
    }
    if (!audio.ended && !audio.paused) {
      animationFrame = requestAnimationFrame(syncHighlight);
    }
  };

  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  audio.currentTime = 0;

  try {
    await audio.play();
  } catch (_) {
    words.forEach((el) => el.classList.remove("is-speaking"));
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return;
  }

  animationFrame = requestAnimationFrame(syncHighlight);

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  cancelAnimationFrame(animationFrame);
  words.forEach((el) => el.classList.remove("is-speaking"));
  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
}

async function playBackendTTS(text, languageKey) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio);
  } catch (_) {}
}

async function playCfEnglishWithWordHighlight(text, wordEls) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = resolveEnTtsVoiceId("en-US");
  try {
    // Chirp 재생 + 동일 음성 길이 기준 글자 가중 하이라이트
    // (Neural2 marks를 Chirp에 스케일하면 단어 박자가 어긋남)
    const audio = await loadBackendTTSAudio(enText, voice);
    if (!audio) return;
    await waitForAudioReady(audio);
    await playAudioWithWordHighlight(audio, wordEls, {
      timepoints: null,
      ttsWordCount: 0,
      speakText: enText,
    });
  } catch (_) {}
}

function hideAllKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .ko-text').forEach((el) => {
    el.classList.add("hidden-ko");
    el.textContent = "";
  });
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

async function typeKoLikeHuman(koTextEl, text) {
  if (!koTextEl) return;
  koTextEl.classList.remove("hidden-ko");
  koTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    koTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }
}

function hideAllEnText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .en-main').forEach((el) => {
    el.classList.add("hidden-en-main");
    el.textContent = el.dataset.fullEn || "";
  });
}

function hideAllPronText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .pron-text').forEach((el) => {
    el.classList.add("hidden-pron-text");
    restorePronHtml(el);
  });
}

function restorePronHtml(pronTextEl) {
  if (!pronTextEl) return;
  const html = pronTextEl.dataset.fullPronHtml;
  if (html) {
    pronTextEl.innerHTML = html;
  } else {
    pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
  }
}

function showKoAsDefault() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const cfNoteEl = item.querySelector(".cf-note");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.remove("hidden-ko");
    koTextEl.textContent = ko;
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
  });
}

async function typeEnLikeHuman(enTextEl, text) {
  if (!enTextEl) return;
  enTextEl.classList.remove("hidden-en-main");
  enTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    enTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }
}

async function typePronLikeHuman(pronTextEl, text) {
  if (!pronTextEl) return;
  pronTextEl.classList.remove("hidden-pron-text");
  pronTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    pronTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "(", "|"].includes(ch);
    const delay = isPauseChar
      ? 150 + Math.floor(Math.random() * 110)
      : 72 + Math.floor(Math.random() * 62);
    await sleep(delay);
  }
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  autoplayBtn.classList.add("is-hidden");

  const groups = buildGroups();
  if (!groups.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    autoplayBtn.classList.remove("is-hidden");
    isAutoplayRunning = false;
    return;
  }

  hideAllKoText();
  hideAllCfText();
  preloadWordsAhead(0, json1.length, "first");
  await sleep(4000);

  for (let g = 0; g < groups.length; g += 1) {
    const group = groups[g];
    const perPage = wordsPerPageFor(group);
    if (g === 0) {
      renderGroupWindow(group, 0, false, "normal");
    } else {
      await shiftToNextGroup(group, "normal");
    }

    hideAllKoText();
    hideAllCfText();
    tickerEl.classList.add("is-playing");

    for (let w = 0; w < group.wordIndices.length; w += 1) {
      const globalIndex = group.wordIndices[w];
      if (w > 0 && w % perPage === 0) {
        await shiftGroupWordsDown(group, w, "normal");
        hideAllKoText();
        hideAllCfText();
        tickerEl.classList.add("is-playing");
      }

      preloadWordsAhead(globalIndex + 1, perPage, "first");

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      item.classList.add("is-active");

      const ko = item.dataset.ko || "";
      const koTextEl = item.querySelector(".ko-text");
      const enTextEl = item.querySelector(".en-main");

      preloadKoTTS(json1[globalIndex], "first");
      preloadCfEnglishTTS(json1[globalIndex]);
      enTextEl?.classList.add("is-speaking");
      try {
        await playEnTTS(getEnSpeakText(json1[globalIndex]));
      } finally {
        enTextEl?.classList.remove("is-speaking");
      }
      if (koTextEl) {
        koTextEl.textContent = ko;
        koTextEl.classList.remove("hidden-ko");
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      await sleep(120);
      koTextEl?.classList.add("is-speaking");
      try {
        await playBackendTTS(getKoSpeakText(ko), resolveKoTtsVoiceId("ko-KR"));
      } finally {
        koTextEl?.classList.remove("is-speaking");
      }
      const cfEn = getCfEnglishSpeakText(json1[globalIndex]);
      if (cfEn) {
        await sleep(120);
        const wordEls = item.querySelectorAll(".cf-en-paren .cf-en-word");
        const cfTimes = Math.max(1, Number(CF_SPEAK_COUNT) || 1);
        for (let c = 0; c < cfTimes; c += 1) {
          if (c > 0) await sleep(180);
          await playCfEnglishWithWordHighlight(cfEn, wordEls);
        }
      }
      await showWordFlashImage(globalIndex);
      item.classList.remove("is-active");
      // cf 다 읽고 다음 단어로 넘어가기 전 1초 대기
      await sleep(1000);
    }
  }

  resetWordFlashImage();
  tickerEl.classList.remove("is-playing");
  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
