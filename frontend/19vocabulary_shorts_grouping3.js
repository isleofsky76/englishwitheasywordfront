const PAGE_TITLE_HTML = `<span class="title-main">📰 뉴스 영단어</span>
<span class="title-accent title-sub">'월드컵의 경제학'<br></span><span class="title-meta">( The Wall Street Journal  | 2026/07/24)</span><br><br>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 1;

// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
const json1 = 


[

  { "title1": "" },


  

  { "en": "dissolve", "ko": "사라지다, 녹다, 용해하다", "koExtra": "경계·관계·조직 등이 풀리거나 없어지다", "pronunciation": "디졸브", "ipa": "/dɪˈzɑːlv/", "pos": "동", "cf": "한 경기장에서 사람들이 함께 노래했다고 해서 국경이 사라지는 것은 아니며, 그날 밤 매사추세츠주 폭스버러에서 조약이 체결된 것도 아니었다(Borders don’t dissolve because a stadium sang together, and no treaty was signed in Foxborough, Mass., that night.)", "image": "" },
  
  { "en": "hatred", "ko": "증오", "koExtra": "누군가나 어떤 집단을 매우 싫어하고 적대시하는 감정", "pronunciation": "헤이트리드", "ipa": "/ˈheɪtrɪd/", "pos": "명", "cf": "우리는 편견이 반드시 증오를 필요로 하지는 않는다는 점을 발견했다(We found that prejudice needs no hatred.)", "image": "" },
  
  { "en": "get lumped", "ko": "한데 묶이다", "koExtra": "개별 차이가 무시된 채 큰 덩어리로 함께 분류되다", "pronunciation": "겟 럼프트", "ipa": "/ɡet lʌmpt/", "pos": "동", "cf": "자주 만나는 사람들은 세분화된 범주로 분류하고, 나머지는 대략적인 범주로 묶는다.(You sort the people you meet often into fine categories; the rest get lumped into coarse blocks.) cf. coarse = 거친, 정밀하지 않은 | lump = A와 B와 묶다, 덩어리, 응어리", "image": "" },

  { "en": "oversell", "ko": "과장해서 말하다", "koExtra": "가치·효과·장점을 실제보다 크게 부풀려 설명하다", "pronunciation": "오버셀", "ipa": "/ˌoʊvərˈsel/", "pos": "동", "cf": "제가 처음으로 월드컵에 간 이유는 그 가치를 평가해 보기 위해서였습니다. 월드컵의 혜택이 과대평가되었는지 알아보기 위해서였죠. 과대평가된 건 사실입니다. 하지만 그건 본질을 파악하는 기준이 아니죠.(I went to my first World Cup to price it—to see if the benefits were oversold. They are. But that measures the wrong thing.)", "image": "" },

  { "en": "weep", "ko": "눈물을 흘리다", "koExtra": "강한 감정 때문에 울다", "pronunciation": "위프", "ipa": "/wiːp/", "pos": "동", "cf": "진정한 성과는 호텔 객실 점유율이나 갈비 판매량에 있는 것이 아니라, 4천만 이라크 국민이 한 사람에게 집중했던 90분, 아무 의미도 없으면서 모든 의미를 지닌 골을 넣고 눈물을 흘린 한 남자에게 있는 것입니다.(The real return isn’t in hotel occupancy or pounds of ribs sold; it’s in the 90 minutes when 40 million Iraqis narrowed to one—a man weeping over a goal that meant nothing and everything.)", "image": "" },
  

]
;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const controlsEl = document.querySelector(".controls");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
const wordFlashVideoEl = document.getElementById("word-flash-video");
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

/** cf를 이미지형 예문 레이아웃(영문 위, 한글 아래)으로 구성 */
function createCfExampleHtml(cfText, targetWord) {
  const source = String(cfText || "").trim();
  if (!source) return "";

  const englishParts = [];
  const koreanText = source
    .replace(/\(([^)]+)\)/g, (full, inner) => {
      if (!/[A-Za-z]/.test(inner)) return full;
      const index = englishParts.length;
      const underlined = underlineTargetInCf(String(inner || "").trim(), targetWord);
      englishParts.push(
        `<span class="cf-en-paren" data-cf-index="${index}">${wrapCfEnglishWords(underlined)}</span>`
      );
      return " ";
    })
    .replace(/\s+([.,!?…])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

  const englishHtml = englishParts.length
    ? `<div class="cf-example-en">${englishParts.join(" ")}</div>`
    : "";
  const koreanHtml = koreanText
    ? `<div class="cf-example-ko">${koreanText}</div>`
    : "";

  return `
    <div class="cf-note hidden-cf">
      ${englishHtml}
      ${koreanHtml}
    </div>
  `;
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

const READ_MARK_SVG = `<svg class="word-read-mark" viewBox="0 0 22 32" aria-hidden="true"><defs><linearGradient id="word-read-mark-grad" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="#5ba3c4"/><stop offset="52%" stop-color="#2b7a9b"/><stop offset="100%" stop-color="#1a2332"/></linearGradient></defs><path class="word-read-mark-left" pathLength="100" d="M3.4 20.3L7 28"/><path class="word-read-mark-right" pathLength="100" d="M7 28L19.3 1.7"/></svg>`;

function createReadMarkSvg() {
  return READ_MARK_SVG;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (readWordIndices.has(globalIndex)) {
    el.classList.add("is-word-read", "is-check-done");
  }
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const wordLine = `<span class="en-main" data-full-en="${item.en}">${createReadMarkSvg()}<span class="en-main-text">${item.en}</span></span>`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfHtml = createCfExampleHtml(cfText, targetWord);
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
  const pronLine = `
    <div class="pron-line">
      <div class="pron-row">
        <span class="pron-text" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>
      </div>
    </div>
  `;
  const meaningHtml = `
    <div class="meaning-section">
      <div class="meaning-box">
        <span class="ko-text hidden-ko" data-full-ko="${escapeAttr(item.ko)}"></span>
      </div>
    </div>
  `;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <div class="word-content">
        <div class="word-line">${wordLine}</div>
        ${pronLine}
        ${meaningHtml}
        ${cfHtml}
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
  document.documentElement.style.setProperty("--page-bg-color", "#1a2332");
  document.documentElement.style.setProperty("--page-bg-image", "none");
  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundColor = "#1a2332";
    bgEl.style.backgroundImage = "none";
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

/** 괄호 안 영어 구문이 있으면 cf 영어를 읽음. cfSpeakRates가 있으면 그 속도로 재생 */
function shouldSpeakCfEnglish(word) {
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  return extractCfParenEnglishParts(word?.cf);
}

/** 구문별로 TTS 재생하며 읽는 영어 단어를 순서대로 하이라이트 */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null) {
  const parts = getCfEnglishSpeakParts(word);
  if (!parts.length || !itemEl) return;
  const rates = Array.isArray(ratesOverride) && ratesOverride.length
    ? ratesOverride
    : getCfSpeakRates(word);
  for (let i = 0; i < parts.length; i += 1) {
    const parenEl = itemEl.querySelector(`.cf-en-paren[data-cf-index="${i}"]`);
    const wordEls = parenEl
      ? Array.from(parenEl.querySelectorAll(".cf-en-word"))
      : [];
    try {
      // 화면 토큰($135 등)과 동일한 발화형으로 TTS → 하이라이트 가중치와 길이 일치
      await playEnTTS(expandEnTextForSpeech(parts[i]), rates, wordEls);
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
  loadBackendTTSAudio(koText, "ko-KR").catch(() => {});
}

function preloadCfEnglishTTS(word) {
  const parts = getCfEnglishSpeakParts(word);
  parts.forEach((part) => {
    const speakText = expandEnTextForSpeech(part);
    if (!speakText) return;
    loadBackendTTSAudio(speakText, resolveEnTtsVoiceId("en-US")).catch(() => {});
  });
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadEnTTS(word);
  preloadKoTTS(word);
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

/** 숫자 → 영어 발화형 (TTS·하이라이트 공통) */
const HIGHLIGHT_ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"
];
const HIGHLIGHT_TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
];
const MONTH_ABBREV_TO_SPOKEN = {
  jan: "January", feb: "February", mar: "March", apr: "April",
  may: "May", jun: "June", jul: "July", aug: "August",
  sep: "September", sept: "September", oct: "October",
  nov: "November", dec: "December"
};
/** 미국 주 약어 → TTS 발화형 (예: Mass. → Massachusetts) */
const STATE_ABBREV_TO_SPOKEN = {
  mass: "Massachusetts"
};
/** 하이라이트가 음성보다 살짝 앞서 보이도록 (초) */
const CF_HIGHLIGHT_LEAD_SEC = 0.06;

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

/** 화면 토큰 → TTS가 읽을 발화형 ($135 → one hundred thirty-five dollars) */
function expandEnTokenForSpeech(rawTok) {
  const tok = String(rawTok || "").trim();
  if (!tok) return "";

  let m = tok.match(/^\$([\d,]+(?:\.\d+)?)(?:[^\w%]*)$/);
  if (m) {
    const spoken = amountNumToSpokenWordsEn(m[1]);
    return spoken ? `${spoken} dollars` : tok;
  }

  m = tok.match(/^([\d,]+(?:\.\d+)?)\s*%(?:[^\w]*)$/);
  if (m) {
    const spoken = amountNumToSpokenWordsEn(m[1]);
    return spoken ? `${spoken} percent` : tok;
  }

  m = tok.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?$/i);
  if (m) {
    return MONTH_ABBREV_TO_SPOKEN[m[1].toLowerCase()] || m[1];
  }

  m = tok.match(/^(Mass)\.?(?:[,;:!?…]+)?$/i);
  if (m) {
    return STATE_ABBREV_TO_SPOKEN[m[1].toLowerCase()] || m[1];
  }

  m = tok.match(/^([\d,]+(?:\.\d+)?)(?:[^\w%]*)$/);
  if (m) {
    const spoken = amountNumToSpokenWordsEn(m[1]);
    return spoken || tok;
  }

  // ....which / highs.) / truck... → 순수 단어만
  let core = tok.replace(/^\.+/, "").replace(/^[("'\[{]+/, "");
  core = core.replace(/[)\]}"'\.,;:!?…]+$/g, "");
  if (STATE_ABBREV_TO_SPOKEN[core.toLowerCase()]) {
    return STATE_ABBREV_TO_SPOKEN[core.toLowerCase()];
  }
  return core || tok;
}

/** cf 영어 문장 전체를 TTS용 발화형으로 변환 */
function expandEnTextForSpeech(text) {
  return String(text || "")
    .split(/(\s+)/)
    .map((tok) => {
      if (!tok || /^\s+$/.test(tok)) return tok;
      if (!/[A-Za-z0-9$]/.test(tok)) return "";
      return expandEnTokenForSpeech(tok);
    })
    .join("")
    .replace(/\s+/g, " ")
    .trim();
}

function spokenTextLetterWeight(spoken) {
  return Math.max(1, String(spoken || "").replace(/[^A-Za-z']/g, "").length);
}

/** 화면 토큰 하이라이트 가중치 = 같은 토큰의 TTS 발화형 글자 수 */
function estimateSpokenHighlightWeight(text) {
  return spokenTextLetterWeight(expandEnTokenForSpeech(text));
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
      const t = Math.min(dur, Math.max(0, audio.currentTime + CF_HIGHLIGHT_LEAD_SEC));
      const progress = Math.min(1, Math.max(0, t / dur));
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
    el.textContent = "";
  });
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
  controlsEl?.classList.add("is-hidden");

  const groups = buildGroups();
  if (!groups.length) {
    isAutoplayRunning = false;
    return;
  }

  hideAllKoText();
  hideAllCfText();
  readWordIndices.clear();
  tickerEl.querySelectorAll(".ticker-item.is-word-read").forEach((el) => {
    el.classList.remove("is-word-read", "is-check-done", "is-drawing-check");
  });
  preloadWordsAhead(0, json1.length);
  await sleep(4000);

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

      const ko = item.dataset.ko || "";
      const koTextEl = item.querySelector(".ko-text");

      preloadKoTTS(json1[globalIndex]);
      preloadCfEnglishTTS(json1[globalIndex]);
      const enMainEl = item.querySelector(".en-main-text");
      if (enMainEl) enMainEl.classList.add("is-speaking");
      try {
        await playEnTTS(getEnSpeakText(json1[globalIndex]));
      } finally {
        if (enMainEl) enMainEl.classList.remove("is-speaking");
      }
      if (koTextEl) {
        koTextEl.textContent = ko;
        koTextEl.classList.remove("hidden-ko");
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      await sleep(120);
      await playBackendTTS(getKoSpeakText(ko), "ko-KR");
      if (shouldSpeakCfEnglish(json1[globalIndex])) {
        await sleep(1000);
        await playCfEnglishWithHighlight(item, json1[globalIndex]);
        await sleep(1000);
        await playCfEnglishWithHighlight(item, json1[globalIndex], [0.87]);
      }
      await showWordFlashImage(globalIndex);
      await sleep(300);
      await markWordAsRead(globalIndex);
      await sleep(120);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
