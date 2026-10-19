// AI로 인한 일자리 감축 예측을 뒤엎고 대기업들이 다시 채용을 시작하고 있다.

const PAGE_TITLE_HTML = `<span class="title-main">신문기사에서 배우는 어휘</span>
<span class="title-accent title-sub"><span class="hl"> 반도체 제조업체, 상장 첫날 주가 <br>466% 급등하며 중국 증시 1위 등극</span>

<span class="title-meta">( The Wall Street Journal | 2026/07/27 )</span>
<span class="title-note"></span>`;
///저개발 국가들은 고령화가 빠르게 진행되고 있지만, 그에 따른 비용을 감당하지 못하고 있습니다
const VISIBLE_COUNT = 3;
const EN_KO_PASS_OPTIONS = {
  1: "1차만 (EN→KO)",
  2: "2차까지 (KO→EN)"
};
const EN_KO_PASS_COUNT = 1;
const EN_SPEAK_COUNT = 1;
/** 여기에 넣은 EN만 2회 재생 (예: "scrape by", "bedridden") */
const EN_SPEAK_TWICE = [
  "vigorously",
  "vet",
  "scramble",
];


const json1 = 

[

{ "en": "initial public offering", "ko": "기업공개", "koExtra": "", "pronunciation": "이니셜 퍼블릭 오퍼링", "ipa": "/ɪˈnɪʃəl ˈpʌblɪk ˈɔːfərɪŋ/", "pos": "명", "cf": "", "image": "" },

{ "en": "sport", "ko": "~을 자랑해 보이다", "koExtra": "", "pronunciation": "스포트", "ipa": "/spɔːrt/", "pos": "동", "cf": "4,840억 달러에 달하는 시가총액을 자랑해 보였습니다/기록했습니다(sported a market capitalization equivalent to $484 billion.)", "image": "" },

{ "en": "skyrocket", "ko": "급등하다", "koExtra": "", "pronunciation": "스카이로킷", "ipa": "/ˈskaɪˌrɑːkət/", "pos": "동", "cf": "", "image": "" },


{ "en": "pitch", "ko": "제안하다", "koExtra": "", "pronunciation": "피치", "ipa": "/pɪtʃ/", "pos": "동", "cf": "애플 경영진은 미국 밖에서 판매되는 애플 제품에 중국산 칩을 쓰는 방안을 트럼프 대통령과 미국 당국자들에게 제안했다(Apple Chief Executive Tim Cook and top executives have pitched President Trump  on a plan to use CXMT)", "image": "" },


{ "en": "exuberant", "ko": "열광적인", "koExtra": "", "pronunciation": "익주버런트", "ipa": "/ɪɡˈzuːbərənt/", "pos": "형", "cf": "CXMT의 상하이 기업공개에 대한 투자자들의 열광적인 반응(The exuberant investor response to CXMT’s initial public offering in Shanghai)", "image": "" },

{ "en": "torrid", "ko": "폭발적인", "koExtra": "", "pronunciation": "토리드", "ipa": "/ˈtɔːrɪd/", "pos": "형", "cf": "최근 몇 분기 회사의 폭발적 성장 뒤에 나왔다(followed the company’s torrid growth in recent quarters.)", "image": "" }

]
    ;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 900;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_COLOR = "#2F3543";
const PAGE_BG_BASE_IMAGE = "resources/bg.jpeg";
/** .jpg / .jpeg 둘 다 지원 — 있는 것 중 더 최신(또는 .jpg 우선) 사용 */
const PAGE_BG_IMAGE_CANDIDATES = [
  "resources/news.jpg",
  "resources/news.jpeg",
];
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

/** cf 괄호 안 영어를 단어 span으로 감싸 순차 하이라이트용 */
function wrapCfEnglishWords(innerHtml) {
  return String(innerHtml || "").replace(/(<[^>]+>)|([^<]+)/g, (full, tag, text) => {
    if (tag) return tag;
    return String(text).replace(/[A-Za-z]+(?:'[A-Za-z]+)?(?:-[A-Za-z]+)*/g, (word) => (
      `<span class="cf-en-word">${word}</span>`
    ));
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

/** cf(숨김 포함) 실제 높이만큼 단어 슬롯을 잠가, 다음 단어 간격을 cf 길이로 확보 */
function lockWordSlotHeights() {
  const items = tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]');
  items.forEach((el) => {
    el.style.minHeight = "";
  });
  void tickerEl.offsetHeight;
  items.forEach((el) => {
    const h = Math.ceil(el.getBoundingClientRect().height);
    if (h > 0) el.style.minHeight = `${h}px`;
  });
}

/** 현재 화면의 첫 EN(json 첫 단어) top을 기준점으로 고정 */
let fixedFirstEnTopPx = null;
let tickerPinOffsetPx = 0;

function getFirstVisibleEnEl() {
  return tickerEl?.querySelector('.ticker-item[data-item-type="word"] .en-main') || null;
}

/** 첫 번째 보이는 단어의 EN 시작 Y를 항상 같은 위치로 맞춤 */
function alignFirstEnToFixedStart() {
  const firstEn = getFirstVisibleEnEl();
  if (!firstEn || !tickerEl) return;

  void tickerEl.offsetHeight;
  const top = firstEn.getBoundingClientRect().top;

  if (fixedFirstEnTopPx == null || !Number.isFinite(fixedFirstEnTopPx)) {
    // 최초 1회: 지금 보이는 json 첫 EN 위치를 고정 시작점으로 저장
    fixedFirstEnTopPx = top;
    document.documentElement.style.setProperty("--fixed-first-en-top", `${fixedFirstEnTopPx}px`);
    document.documentElement.style.setProperty("--ticker-pin-y", "0px");
    tickerPinOffsetPx = 0;
    return;
  }

  const delta = fixedFirstEnTopPx - top;
  if (Math.abs(delta) < 0.5) return;

  tickerPinOffsetPx += delta;
  document.documentElement.style.setProperty("--ticker-pin-y", `${tickerPinOffsetPx}px`);
}

function settleWordLayout() {
  lockWordSlotHeights();
  alignFirstEnToFixedStart();
  // 폰트/줄바꿈 안정화 후 한 번 더 맞춤
  requestAnimationFrame(() => {
    lockWordSlotHeights();
    alignFirstEnToFixedStart();
  });
}

function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  if (group.titleItem) {
    const titleEl = createEntryElement(group.titleItem, group.titleIndex, mode);
    if (animateIn) titleEl.classList.add("slide-in");
    tickerEl.appendChild(titleEl);
  }

  const perPage = wordsPerPageFor(group);
  group.wordIndices
    .slice(wordStartInGroup, wordStartInGroup + perPage)
    .forEach((globalIndex) => {
      const el = createEntryElement(json1[globalIndex], globalIndex, mode);
      if (animateIn) el.classList.add("slide-in");
      tickerEl.appendChild(el);
    });
  settleWordLayout();
}

async function shiftGroupWordsDown(group, nextWordStartInGroup, mode = "normal") {
  const wordItems = Array.from(tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]'));
  wordItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  wordItems.forEach((el) => el.remove());

  const perPage = wordsPerPageFor(group);
  group.wordIndices
    .slice(nextWordStartInGroup, nextWordStartInGroup + perPage)
    .forEach((globalIndex) => {
      const el = createEntryElement(json1[globalIndex], globalIndex, mode);
      el.classList.add("slide-in");
      tickerEl.appendChild(el);
    });
  settleWordLayout();
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
  const enHiddenClass = mode === "second-pass" ? " hidden-en-main" : "";
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  // 한글도 처음부터 DOM에 두어(hidden-ko) 줄바꿈·높이까지 미리 확보
  const koContent = item.ko || "";
  const wordLine = `<span class="en-main${enHiddenClass}" data-full-en="${item.en}">${item.en}</span><span class="word-sep" aria-hidden="true"> : </span><span class="ko-text${koHiddenClass}" data-full-ko="${item.ko}">${koContent}</span>`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfParenEnglish(underlineTargetInCf(cfText, targetWord));
  // cf는 항상 DOM에 두어(없어도 슬롯 유지), hidden-cf로 공간을 미리 확보
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf">cf. ${cfTextWithUnderline}</span>`
    : `<span class="cf-note hidden-cf" aria-hidden="true"></span>`;
  const pronHiddenClass = mode === "second-pass" ? " hidden-pron-text" : "";
  const pronunciation = String(item.pronunciation || "").trim();
  const ipa = String(item.ipa || "").trim();
  const koExtra = String(item.koExtra || "").trim();
  const escapeHtml = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
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
  // 예문 슬롯은 항상 두어, 문장 유무로 EN 단어 간격이 흔들리지 않게 함
  const koExtraHtml = koExtra
    ? `<span class="pron-extra">${underlineTargetInCf(escapeHtml(koExtra), targetWord)}</span>`
    : `<span class="pron-extra" aria-hidden="true"></span>`;
  const pronDisplay = pronHtmlParts.join(" ");
  const pronPlain = pronPlainParts.join(" ");
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${koExtraHtml}</div>${cfHtml}</div>`;
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

async function canLoadImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

/** news.jpg / news.jpeg 중 로드 가능한 것 사용. Last-Modified가 있으면 더 최신 파일 우선 */
async function resolvePageBgImageSrc() {
  const probed = await Promise.all(
    PAGE_BG_IMAGE_CANDIDATES.map(async (path) => {
      const url = new URL(path, document.baseURI);
      let mtime = 0;
      try {
        const res = await fetch(url.href, { method: "HEAD", cache: "no-store" });
        if (!res.ok) return null;
        const lm = res.headers.get("last-modified");
        if (lm) mtime = Date.parse(lm) || 0;
      } catch (_) {
        // file:// 등에서는 HEAD 실패 → 이미지 로드로만 확인
      }
      url.searchParams.set("v", String(mtime || Date.now()));
      const href = url.href;
      if (!(await canLoadImage(href))) return null;
      const isJpg = /\.jpg(?:\?|$)/i.test(path);
      return { href, mtime, isJpg };
    })
  );
  const ok = probed.filter(Boolean);
  if (!ok.length) {
    const fallback = new URL(PAGE_BG_IMAGE_CANDIDATES[0], document.baseURI);
    fallback.searchParams.set("v", String(Date.now()));
    return fallback.href;
  }
  ok.sort((a, b) => (b.mtime - a.mtime) || (Number(b.isJpg) - Number(a.isJpg)));
  return ok[0].href;
}

async function applyPageBackground() {
  const baseSrc = new URL(PAGE_BG_BASE_IMAGE, document.baseURI).href;
  const photoSrc = await resolvePageBgImageSrc();

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

async function playEnTTS(text, word = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const times = getEnSpeakCount(word || text);
  for (let i = 0; i < times; i += 1) {
    if (i > 0) await sleep(180);
    await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"));
  }
}

function getEnSpeakCount(wordOrText) {
  const key = String(wordOrText?.en || wordOrText || "").trim().toLowerCase();
  if (!key) return Math.max(1, Number(EN_SPEAK_COUNT) || 1);
  const twice = EN_SPEAK_TWICE.some(
    (w) => String(w || "").trim().toLowerCase() === key
  );
  if (twice) return 2;
  return Math.max(1, Number(EN_SPEAK_COUNT) || 1);
}

function preloadKoTTS(word, pass = "first") {
  if (!word) return;
  const koText = getKoSpeakText(word);
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
    const core = String(el.textContent || "").replace(/[^a-zA-Z0-9']/g, "");
    let w = Math.max(1, core.length || 1);
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
    el.classList.remove("ko-reserving", "ko-hand", "ko-writing");
    el.style.removeProperty("--ko-write-p");
    el.textContent = "";
  });
  // 한글 비워도 첫 EN 시작점은 유지
  alignFirstEnToFixedStart();
}

/** EN 재생 전에 한글 폭만큼 자리를 잡아 ✍️ 최종 위치 고정 */
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
  // 한글 노출 후에도 손은 유지 (다음 단어로 옮길 때까지)
  koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.add("ko-hand");
}

/** 손이 왼쪽→오른쪽으로 천천히 이동하며 한글이 드러남 */
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

  // 글자 수에 비례하되 너무 짧거나 길지 않게
  const duration = Math.min(1700, Math.max(550, text.replace(/\s/g, "").length * 110));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - (1 - t) ** 1.45; // 살짝 ease-out
      koTextEl.style.setProperty("--ko-write-p", String(p));
      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        resolve();
      }
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

  const perPage = wordsPerPageFor(group);
  // 다음 페이지로 넘어가야 하면 DOM에 아직 없음 → 페이지 전환 후 reserve
  if (nextWordIndexInGroup % perPage === 0) return;

  const nextGlobalIndex = group.wordIndices[nextWordIndexInGroup];
  const nextItem = tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`);
  if (!nextItem || nextItem.dataset.itemType !== "word") return;

  const nextKoTextEl = nextItem.querySelector(".ko-text");
  reserveKoSlot(nextKoTextEl, nextItem.dataset.ko || "");
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
  const full = String(text || "");
  const reservedWidth = enTextEl.offsetWidth;
  const escapeHtml = (s) => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  enTextEl.classList.remove("hidden-en-main");
  enTextEl.classList.add("is-typing");
  if (reservedWidth > 0) {
    enTextEl.style.minWidth = `${reservedWidth}px`;
  }

  let typed = "";
  enTextEl.innerHTML = `<span class="typing-caret" aria-hidden="true"></span>`;
  // 치기 시작 전 짧은 망설임
  await sleep(280 + Math.floor(Math.random() * 220));

  for (let i = 0; i < full.length; i += 1) {
    typed += full[i];
    enTextEl.innerHTML = `${escapeHtml(typed)}<span class="typing-caret" aria-hidden="true"></span>`;
    const ch = full[i];
    const isPauseChar = [",", ".", "/", " ", ")", "(", "-", "'"].includes(ch);
    // 사람 타이핑 속도: 일반 글자 ~150–280ms, 공백·구두점 ~320–580ms
    const delay = isPauseChar
      ? 320 + Math.floor(Math.random() * 260)
      : 150 + Math.floor(Math.random() * 130);
    await sleep(delay);
  }

  enTextEl.textContent = full;
  enTextEl.classList.remove("is-typing");
  enTextEl.style.minWidth = "";
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
      reserveKoSlot(koTextEl, ko);
      enTextEl?.classList.add("is-speaking");
      try {
        await playEnTTS(getEnSpeakText(json1[globalIndex]), json1[globalIndex]);
      } finally {
        enTextEl?.classList.remove("is-speaking");
      }
      if (koTextEl) {
        await writeKoWithHand(koTextEl, ko);
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      await sleep(120);
      koTextEl?.classList.add("is-speaking");
      try {
        await playBackendTTS(getKoSpeakText(json1[globalIndex] || ko), resolveKoTtsVoiceId("ko-KR"));
      } finally {
        koTextEl?.classList.remove("is-speaking");
      }
      // KO 읽기 완료 → 손은 사라지지 않고 다음 단어로 미리 이동
      moveKoHandToNext(group, w);
      const cfEn = getCfEnglishSpeakText(json1[globalIndex]);
      if (cfEn) {
        await sleep(120);
        const wordEls = item.querySelectorAll(".cf-en-paren .cf-en-word");
        await playCfEnglishWithWordHighlight(cfEn, wordEls);
      }
      await showWordFlashImage(globalIndex);
      item.classList.remove("is-active");
      // cf 다 읽고 다음 단어로 넘어가기 전 1초 대기
      await sleep(1000);
    }
  }

  resetWordFlashImage();
  tickerEl.classList.remove("is-playing");

  if (EN_KO_PASS_COUNT >= 2) {
    // 1차(EN→KO) 완료 후 2차(KO→EN) 시작 전 대기
    await sleep(1500);

    // 2차: 한글 먼저 노출 → 한글 TTS → 영어 노출 → 영어 TTS (이미지 없음)
    for (let g = 0; g < groups.length; g += 1) {
      const group = groups[g];
      const perPage = wordsPerPageFor(group);
      if (g === 0) {
        renderGroupWindow(group, 0, false, "second-pass");
      } else {
        await shiftToNextGroup(group, "second-pass");
      }

      showKoAsDefault();
      hideAllEnText();
      hideAllPronText();
      hideAllCfText();
      tickerEl.classList.add("is-playing");

      for (let w = 0; w < group.wordIndices.length; w += 1) {
        const globalIndex = group.wordIndices[w];
        if (w > 0 && w % perPage === 0) {
          await shiftGroupWordsDown(group, w, "second-pass");
          showKoAsDefault();
          hideAllEnText();
          hideAllPronText();
          hideAllCfText();
          tickerEl.classList.add("is-playing");
        }

        preloadWordsAhead(globalIndex + 1, perPage, "second");

        const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
        if (!item || item.dataset.itemType !== "word") continue;

        item.classList.add("is-active");

        const ko = item.dataset.ko || "";
        const koTextEl = item.querySelector(".ko-text");
        const enTextEl = item.querySelector(".en-main");
        const pronTextEl = item.querySelector(".pron-text");

        preloadEnTTS(json1[globalIndex]);
        koTextEl?.classList.add("is-speaking");
        try {
          await playBackendTTS(getKoSpeakText(json1[globalIndex] || ko), resolveKoTtsVoiceId("ko-KR"));
        } finally {
          koTextEl?.classList.remove("is-speaking");
        }

        if (enTextEl) {
          await typeEnLikeHuman(enTextEl, item.dataset.en || "");
        }
        if (pronTextEl) {
          restorePronHtml(pronTextEl);
          pronTextEl.classList.remove("hidden-pron-text");
        }
        const cfNoteEl = item.querySelector(".cf-note");
        if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
        await sleep(120);
        enTextEl?.classList.add("is-speaking");
        try {
          await playEnTTS(getEnSpeakText(json1[globalIndex]), json1[globalIndex]);
        } finally {
          enTextEl?.classList.remove("is-speaking");
        }

        item.classList.remove("is-active");
        await sleep(1000);
      }
    }

    tickerEl.classList.remove("is-playing");
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
