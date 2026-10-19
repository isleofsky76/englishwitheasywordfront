const PAGE_TITLE_HTML = `<span class="title-main">단어장</span>
<span class="title-accent title-sub">'유가 급등, 경제와 공화당의 <br>중간선거 전망에 위협'<br></span><span class="title-meta">( The Wall Street Journal | 2026//07/23)</span><br><br>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 3;
const INTRO_EXIT_MS = 900;
const INTRO_HOLD_MS = 5000;
/** JSON 첫 화면이 나타난 뒤 읽기 시작까지 대기 */
const POST_INTRO_READ_DELAY_MS = 1000;

// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
const json1 = 


[
  { "title1": "유가 100달러 돌파와 인플레이션 압박" },

  
  
  
  
  { "en": "bedevil", "ko": "괴롭히다", "koExtra": "계속 문제를 일으키며 어렵게 만들다", "pronunciation": "비데벌", "ipa": "/bɪˈdɛvəl/", "pos": "동", "cf": "미국 경제를 괴롭히다(bedevil the U.S. economy)", "image": "" },
  
  
  { "title2": "가솔린·디젤 가격 상승으로 소비자 부담 확대" },
  
  
  
  { "en": "unleaded", "ko": "무연의", "koExtra": "납 성분이 들어 있지 않은 휘발유의", "pronunciation": "언레디드", "ipa": "/ʌnˈlɛdɪd/", "pos": "형", "cf": "무연 휘발유(unleaded gasoline)", "image": "" },
  
  { "en": "bite", "ko": "부담", "koExtra": "돈이나 생활에 주는 압박", "pronunciation": "바이트", "ipa": "/baɪt/", "pos": "명", "cf": "미국인들의 지갑을 더 압박하다(taking a bigger bite out of Americans’ wallets)", "image": "" },
  
  
  { "title3": "국채 금리 급등과 모기지 금리 상승 전망" },
  
  
  { "en": "Treasury", "ko": "미국 국채", "koExtra": "미국 정부가 발행하는 채권", "pronunciation": "트레저리", "ipa": "/ˈtrɛʒəri/", "pos": "명", "cf": "10년 만기 미국 국채(10-year Treasury)", "image": "" },
  
  { "en": "mortgage", "ko": "주택담보대출", "koExtra": "집을 담보로 빌리는 대출", "pronunciation": "모기지", "ipa": "/ˈmɔːrɡɪdʒ/", "pos": "명", "cf": "모기지 금리(mortgage rates)", "image": "" },
  
  
  
  
  { "title4": "연준의 고금리 장기화 우려" },
  
  { "en": "Federal Reserve", "ko": "연방준비제도", "koExtra": "미국의 중앙은행 역할을 하는 기관", "pronunciation": "페더럴 리저브", "ipa": "/ˈfɛdərəl rɪˈzɜːrv/", "pos": "명", "cf": "연방준비제도(the Federal Reserve)", "image": "" },
  
   
  { "en": "in check", "ko": "통제된", "koExtra": "더 커지지 않도록 억제된 상태", "pronunciation": "인 체크", "ipa": "/ɪn tʃɛk/", "pos": "형", "cf": "인플레이션이 통제된 상태로 남다(inflation remains in check)", "image": "" },
  
  
  { "title5": "연료비 상승이 항공사 실적 전망을 흔들다" },
  
  
  
  { "en": "temper", "ko": "낮추다", "koExtra": "기대나 전망을 조정해 약하게 만들다", "pronunciation": "템퍼", "ipa": "/ˈtɛmpər/", "pos": "동", "cf": "올해 전망을 낮췄다(tempered their guidance for the year)", "image": "" }

  { "en": "guidance", "ko": "실적 전망", "koExtra": "기업이 제시하는 향후 매출·이익 예상치", "pronunciation": "가이던스", "ipa": "/ˈɡaɪdəns/", "pos": "명", "cf": "올해 실적 전망(guidance for the year)", "image": "" },
  
  

]

  
    ;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
const wordFlashVideoEl = document.getElementById("word-flash-video");
const quizIntroEl = document.getElementById("quiz-intro");
const quizScreenEl = document.querySelector(".wrapper");
const quizControlsEl = document.getElementById("quiz-controls") || document.querySelector(".controls");
let isAutoplayRunning = false;
const readWordIndices = new Set();
const ITEM_TRANSITION_MS = 900;
/** 왼쪽 220ms + 오른쪽 지연 200ms + 오른쪽 420ms */
const WORD_READ_CHECK_DRAW_MS = 640;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_IMAGE = "resources/bg.jpeg";
const WORD_FLASH_FADE_IN_MS = 950;
const WORD_FLASH_DISPLAY_MS = 1800;
const WORD_FLASH_FADE_OUT_MS = 1100;
/** 흰 가림막이 사라지며 단어가 드러나는 시간 */
const WORD_UNMASK_MS = 720;
/** 한글 노출은 조금 더 길게·부드럽게 */
const WORD_UNMASK_KO_MS = 980;
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

/** cf 괄호 안 영어만 span으로 감싸 읽기 중 배경색 표시용 */
function wrapCfParenEnglish(cfHtml) {
  return String(cfHtml || "").replace(/\(([^)]+)\)/g, (full, inner) => {
    if (!/[A-Za-z]/.test(inner)) return full;
    return `<span class="cf-en-paren">(${inner})</span>`;
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

const WORDS_PER_PAGE = Math.max(1, VISIBLE_COUNT - 1);

/** 현재 슬롯 수에서 VISIBLE_COUNT까지, startAfterGlobalIndex 다음 json 항목으로 채움 */
function appendFillUntilVisible(startAfterGlobalIndex, animateIn, mode, currentCount) {
  let count = currentCount;
  for (let i = startAfterGlobalIndex + 1; i < json1.length && count < VISIBLE_COUNT; i += 1) {
    const item = json1[i];
    if (!isTitleItem(item) && !isWordItem(item)) continue;
    const el = createEntryElement(item, i, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  }
}

function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  const titleEl = createEntryElement(group.titleItem, group.titleIndex, mode);
  if (animateIn) titleEl.classList.add("slide-in");
  tickerEl.appendChild(titleEl);
  let count = 1;

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
  const titleEl = tickerEl.querySelector(
    `.ticker-item[data-index="${group.titleIndex}"][data-item-type="title"]`
  );
  const leaving = Array.from(tickerEl.children).filter((el) => el !== titleEl);
  leaving.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  leaving.forEach((el) => el.remove());

  let count = titleEl ? 1 : 0;
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

function renderStaticList() {
  const groups = buildGroups();
  if (!groups.length) return;
  renderGroupWindow(groups[0], 0, false, "normal");
}

async function markWordAsRead(globalIndex, animate = true) {
  readWordIndices.add(globalIndex);
  const item = tickerEl.querySelector(
    `.ticker-item[data-index="${globalIndex}"][data-item-type="word"]`
  );
  if (!item) return;

  item.classList.add("is-word-read");
  if (!animate) {
    item.classList.add("is-check-done");
    return;
  }

  item.classList.remove("is-check-done");
  void item.offsetWidth;
  item.classList.add("is-drawing-check");

  await new Promise((resolve) => {
    window.setTimeout(() => {
      if (item.classList.contains("is-word-read")) {
        item.classList.remove("is-drawing-check");
        item.classList.add("is-check-done");
      }
      resolve();
    }, WORD_READ_CHECK_DRAW_MS);
  });
}

const READ_MARK_SVG = `<svg class="word-read-mark" viewBox="0 0 22 32" aria-hidden="true"><defs><linearGradient id="word-read-mark-grad" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/><stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs><path class="word-read-mark-left" pathLength="100" d="M3.4 20.3L7 28"/><path class="word-read-mark-right" pathLength="100" d="M7 28L19.3 1.7"/></svg>`;

function createReadMarkSvg() {
  return READ_MARK_SVG;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("second-pass-mode");
  if (readWordIndices.has(globalIndex) && mode !== "second-pass") {
    el.classList.add("is-word-read", "is-check-done");
  }
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const enMainClass = mode === "second-pass" ? "en-main-text is-masked" : "en-main-text";
  const koTextClass = mode === "second-pass" ? "ko-text" : "ko-text is-masked";
  const wordLine = `<span class="en-main" data-full-en="${item.en}">${createReadMarkSvg()}<span class="${enMainClass}">${item.en}</span></span> : <span class="${koTextClass}" data-full-ko="${item.ko}">${item.ko}</span>`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfParenEnglish(underlineTargetInCf(cfText, targetWord));
  const cfHtml = cfText ? `<span class="cf-note hidden-cf">cf. ${cfTextWithUnderline}</span>` : "";
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
  const bgSrc = new URL(PAGE_BG_IMAGE, document.baseURI).href;
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

/** cfSpeakRates가 있는 단어만 cf 괄호 영어를 읽음 (없으면 읽지 않음) */
function shouldSpeakCfEnglish(word) {
  return Array.isArray(word?.cfSpeakRates) && word.cfSpeakRates.length > 0;
}

function getCfEnglishSpeakText(word) {
  if (!shouldSpeakCfEnglish(word)) return "";
  return extractCfParenEnglish(word?.cf);
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

async function playEnTTS(text, rates = [1]) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  for (let i = 0; i < rateList.length; i += 1) {
    if (i > 0) await sleep(160);
    await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i]);
  }
}

function preloadKoTTS(word, pass = "first") {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  const koLang = pass === "second" ? "ko-KR-Chirp3-HD-Achernar" : "ko-KR";
  loadBackendTTSAudio(koText, koLang).catch(() => {});
}

function preloadCfEnglishTTS(word) {
  const cfEn = getCfEnglishSpeakText(word);
  if (!cfEn) return;
  loadBackendTTSAudio(cfEn, resolveEnTtsVoiceId("en-US")).catch(() => {});
}

function preloadWordTTS(word, pass = "first", globalIndex = -1) {
  preloadEnTTS(word);
  preloadKoTTS(word, pass);
  if (pass === "first" && globalIndex >= 0) preloadCfEnglishTTS(word);
}

function preloadWordsAhead(startIndex, count, pass = "first") {
  let loaded = 0;
  for (let i = startIndex; i < json1.length && loaded < count; i += 1) {
    if (!isWordItem(json1[i])) continue;
    preloadWordTTS(json1[i], pass, i);
    loaded += 1;
  }
}

async function playAudioElement(audio, playbackRate = 1) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
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

async function playBackendTTS(text, languageKey, playbackRate = 1) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate);
  } catch (_) {}
}

function applyWordMask(el, text) {
  if (!el) return;
  if (text != null) el.textContent = text;
  el.classList.remove("hidden-ko", "hidden-en-main", "is-unmasking");
  el.classList.add("is-masked");
}

async function revealMaskedText(el, durationMs = WORD_UNMASK_MS) {
  if (!el) return;
  el.classList.remove("hidden-ko", "hidden-en-main");
  if (!el.classList.contains("is-masked")) return;
  // 다음 프레임에 시작해 transition이 자연스럽게 붙도록
  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  });
  el.classList.add("is-unmasking");
  await sleep(durationMs);
  el.classList.remove("is-masked", "is-unmasking");
}

function hideAllKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const el = item.querySelector(".ko-text");
    if (!el) return;
    applyWordMask(el, item.dataset.ko || el.dataset.fullKo || "");
  });
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

async function typeKoLikeHuman(koTextEl, text) {
  if (!koTextEl) return;
  await revealMaskedText(koTextEl);
  if (koTextEl.textContent === text) return;
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
    const textEl = el.querySelector(".en-main-text");
    if (!textEl) return;
    applyWordMask(textEl, el.dataset.fullEn || "");
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

function hideAllPronText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .pron-text').forEach((el) => {
    el.classList.add("hidden-pron-text");
    restorePronHtml(el);
  });
}

function showKoAsDefault() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const cfNoteEl = item.querySelector(".cf-note");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.remove("hidden-ko", "is-masked", "is-unmasking");
    koTextEl.textContent = ko;
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
  });
}

async function typeEnLikeHuman(enTextEl, text) {
  if (!enTextEl) return;
  await revealMaskedText(enTextEl);
  if (enTextEl.textContent === text) return;
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
  restorePronHtml(pronTextEl);
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;

  const groups = buildGroups();
  if (!groups.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  // 인트로 5초 유지 후 JSON 화면으로 전환 → 1초만 대기 → 1번부터 읽기
  preloadWordsAhead(0, json1.length, "first");
  await sleep(INTRO_HOLD_MS);
  if (!isAutoplayRunning) return;

  dismissIntroScreen();
  autoplayBtn.textContent = "playing...";
  hideAllKoText();
  hideAllCfText();
  readWordIndices.clear();
  tickerEl.querySelectorAll(".ticker-item.is-word-read").forEach((el) => {
    el.classList.remove("is-word-read", "is-check-done", "is-drawing-check");
  });

  // JSON 1번이 보이는 상태에서 1초만 대기 후 바로 읽기
  await sleep(POST_INTRO_READ_DELAY_MS);
  if (!isAutoplayRunning) return;

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

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE, "first");

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      const ko = item.dataset.ko || "";
      const koTextEl = item.querySelector(".ko-text");

      preloadKoTTS(json1[globalIndex], "first");
      preloadCfEnglishTTS(json1[globalIndex]);
      await playEnTTS(getEnSpeakText(json1[globalIndex]));
      if (koTextEl) {
        applyWordMask(koTextEl, ko);
        await revealMaskedText(koTextEl, WORD_UNMASK_KO_MS);
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      await sleep(120);
      await playBackendTTS(getKoSpeakText(ko), "ko-KR");
      const cfEn = getCfEnglishSpeakText(json1[globalIndex]);
      if (cfEn) {
        await sleep(120);
        const parenEls = item.querySelectorAll(".cf-en-paren");
        parenEls.forEach((el) => el.classList.add("is-speaking"));
        try {
          await playEnTTS(cfEn, getCfSpeakRates(json1[globalIndex]));
        } finally {
          parenEls.forEach((el) => el.classList.remove("is-speaking"));
        }
      }
      await showWordFlashImage(globalIndex);
      await sleep(300);
      await markWordAsRead(globalIndex);
      await sleep(120);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 1차(EN→KO) 완료 후 2차(KO→EN) 시작 전 대기
  await sleep(1500);

  // 2차: 첫번째와 동일 레이아웃, 순서만 반대로 (KO -> EN) — 이미지 없음
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

      preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE, "second");

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      const ko = item.dataset.ko || "";
      const enTextEl = item.querySelector(".en-main-text");
      const pronTextEl = item.querySelector(".pron-text");

      preloadEnTTS(json1[globalIndex]);
      await playBackendTTS(getKoSpeakText(ko), "ko-KR-Chirp3-HD-Achernar");
      if (enTextEl) {
        applyWordMask(enTextEl, item.dataset.en || "");
        await revealMaskedText(enTextEl);
      }
      if (pronTextEl) {
        restorePronHtml(pronTextEl);
        pronTextEl.classList.remove("hidden-pron-text");
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      await sleep(120);
      await playEnTTS(getEnSpeakText(json1[globalIndex]));
      await sleep(300);
      await markWordAsRead(globalIndex);
      await sleep(120);
    }
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

function dismissIntroScreen() {
  if (!quizIntroEl || quizIntroEl.classList.contains("is-hidden")) {
    quizScreenEl?.classList.remove("is-behind-intro", "is-revealing");
    quizControlsEl?.classList.remove("is-intro-visible");
    return;
  }

  // JSON 화면을 바로 보이게 한 뒤, 인트로 퇴장 애니메이션은 백그라운드에서 정리
  quizScreenEl?.classList.remove("is-behind-intro");
  quizScreenEl?.classList.add("is-revealing");
  void quizScreenEl?.offsetWidth;
  quizScreenEl?.classList.add("is-visible");
  quizIntroEl.classList.add("is-leaving");
  quizControlsEl?.classList.remove("is-intro-visible");

  window.setTimeout(() => {
    quizIntroEl.classList.add("is-hidden");
    quizScreenEl?.classList.remove("is-revealing", "is-visible");
  }, INTRO_EXIT_MS);
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
