const PAGE_TITLE_HTML = `<span class="title-main">시사 영단어</span>
<span class="title-sub-row">
  <span class="title-accent title-sub">'신문기사에서 배우는 어휘'</span>
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
<span class="title-meta">( 2026/08/01 )</span>`;

const VISIBLE_COUNT = 2;
const EN_KO_PASS_COUNT = 1;
const EN_PREVIEW_LETTERS = 3;
const DEFAULT_STARS = 5;

///영어만 읽는 버젼.
// 예문: exampleEn + exampleKo (화면) / cf는 영어 TTS용 괄호 문장
const json1 =


[

  { "title1": "" },

  {
"en": "paradox",
"ko": "역설",
"hint": "모순, 역설적 상황, 모순된 인물, 양면성",
"pronunciation": "패러닥스",
"ipa": "/ˈpærədɑːks/",
"pos": "명",
"stars": 4,
"exampleEn": "He was a paradox—a loner who loved to chat with strangers.",
"exampleKo": "그는 낯선 사람들과 대화하기를 좋아하는 외톨이라는 모순적인 인물이었습니다.",
"cf": "(He was a paradox—a loner who loved to chat with strangers.)",
"image": ""
},

{
"en": "contradiction",
"ko": "모순",
"hint": "불일치, 상충, 반대, 모순된 진술",
"pronunciation": "칸트러딕션",
"ipa": "/ˌkɑːntrəˈdɪkʃən/",
"pos": "명",
"stars": 4,
"exampleEn": "There is a contradiction between the two sets of figures.",
"exampleKo": "두 통계 자료 사이에는 모순이 있습니다.",
"cf": "(There is a contradiction between the two sets of figures.)",
"image": ""
},

{
"en": "divisive",
"ko": "분열을 초래하는",
"hint": "논쟁적인, 편을 가르는, 분열을 일으키는, 갈등을 조장하는",
"pronunciation": "디바이시브",
"ipa": "/dɪˈvaɪsɪv/",
"pos": "형",
"stars": 4,
"exampleEn": "He is very divisive.",
"exampleKo": "그는 매우 분열을 일으키는 사람입니다.",
"cf": "(He is very divisive.)",
"image": ""
},

{
"en": "bigot",
"ko": "편견주의자",
"hint": "고집쟁이, 편협한 사람, 독선적인 사람, 차별주의자",
"pronunciation": "비것",
"ipa": "/ˈbɪɡət/",
"pos": "명",
"stars": 5,
"exampleEn": "He was known to be a loud-mouthed, opinionated bigot.",
"exampleKo": "그는 목소리가 크고 독선적인 편견주의자로 알려져 있었습니다.",
"cf": "(He was known to be a loud-mouthed, opinionated bigot.)",
"image": ""
},


{
"en": "polemic",
"ko": "논쟁",
"hint": "논박, 격론, 공격적 주장, 논쟁적 글",
"pronunciation": "펄레믹",
"ipa": "/pəˈlemɪk/",
"pos": "명",
"stars": 5,
"exampleEn": "We want to work on real problems, not on stupid polemics.",
"exampleKo": "우리는 어리석은 논쟁이 아니라 실제 문제를 해결하고 싶습니다.",
"cf": "(We want to work on real problems, not on stupid polemics.)",
"image": ""
},

{
"en": "ruse",
"ko": "계략",
"hint": "속임수, 책략, 위계, 기만책",
"pronunciation": "루즈",
"ipa": "/ruːz/",
"pos": "명",
"stars": 5,
"exampleEn": "I have brought you here by a ruse.",
"exampleKo": "나는 계략을 써서 당신을 이곳으로 데려왔습니다.",
"cf": "(I have brought you here by a ruse.)",
"image": ""
},

{
"en": "confound",
"ko": "혼란시키다",
"hint": "당황하게 하다, 좌절시키다, 어리둥절하게 하다, 뒤엉키게 하다",
"pronunciation": "컨파운드",
"ipa": "/kənˈfaʊnd/",
"pos": "동",
"stars": 5,
"exampleEn": "This ruse will confound the enemy.",
"exampleKo": "이 계략은 적을 혼란에 빠뜨릴 것입니다.",
"cf": "(This ruse will confound the enemy.)",
"image": ""
},

{
"en": "drivel",
"ko": "헛소리",
"hint": "허튼소리, 시시한 말, 무의미한 내용, 터무니없는 소리",
"pronunciation": "드리벌",
"ipa": "/ˈdrɪvəl/",
"pos": "명",
"stars": 5,
"exampleEn": "How can you watch that drivel on TV?",
"exampleKo": "어떻게 저런 헛소리같은 방송을 보고 있는 거야?",
"cf": "(How can you watch that drivel on TV?)",
"image": ""
},

{
"en": "self-serving",
"ko": "자기 잇속만 차리는",
"hint": "자기중심적인, 사익을 위한, 자기변호적인, 자신에게 유리한",
"pronunciation": "셀프 서빙",
"ipa": "/ˌself ˈsɜːrvɪŋ/",
"pos": "형",
"stars": 4,
"exampleEn": "With respect, that is a self-serving delusion.",
"exampleKo": "외람되지만, 그것은 본인 이속만 차린 망상일 뿐입니다.",
"cf": "(With respect, that is a self-serving delusion.)",
"image": ""
},

{
"en": "flimsy",
"ko": "허술한",
"hint": "약한, 빈약한, 설득력 없는, 쉽게 부서지는",
"pronunciation": "플림지",
"ipa": "/ˈflɪmzi/",
"pos": "형",
"stars": 4,
"exampleEn": "The accusation was based on flimsy evidence.",
"exampleKo": "그 혐의는 빈약한 증거에 근거하고 있었습니다.",
"cf": "(The accusation was based on flimsy evidence.)",
"image": ""
}



]
  
    ;


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
const PAGE_BG_IMAGE = "";
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.03;
const BGM_START_SEC = 25; // 0:25
/** exampleEn 전체 읽은 뒤, 핵심 절만 한 번 더 읽는 표시 번호 (1-based) */
const EXAMPLE_CORE_REREAD_NUMS = new Set([3, 6]);
const EXAMPLE_CORE_REREAD_RATE = 0.87;
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

function buildStarsHtml(count = DEFAULT_STARS) {
  const n = Math.max(0, Math.min(5, Number(count) || DEFAULT_STARS));
  return `<span class="star-row" aria-label="${n} stars">${"★".repeat(n)}</span>`;
}

function updateProgress(current, total) {
  const label = document.getElementById("progress-label");
  const fill = document.getElementById("progress-fill");
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  if (label) label.textContent = `진행도 ${safeCurrent} / ${safeTotal}`;
  if (fill) {
    const pct = safeTotal > 0 ? (safeCurrent / safeTotal) * 100 : 0;
    fill.style.width = `${pct}%`;
  }
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

  let detailHtml = `<div class="meaning-hint">hint : ${escapeHtml(hint)}</div>`;
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
    el.classList.remove("en-reserving", "en-hand", "en-writing");
    el.style.removeProperty("--en-write-p");
    const fullEn = el.closest(".en-main")?.dataset.fullEn || "";
    if (fullEn) el.textContent = fullEn;
  });
}

/** KO 재생 중: 영어 폭만 잡고 ✍️는 왼쪽에서 대기 */
function reserveEnSlot(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main", "en-writing");
  enTextEl.style.setProperty("--en-write-p", "0");
  enTextEl.classList.add("en-reserving", "en-hand");
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

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 (발음·IPA 동시 노출) */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  if (!text) {
    revealEnText(enTextEl, fallback);
    if (pronTextEl) revealPronText(pronTextEl);
    return;
  }

  const escapeHtml = (s) => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  preparePronForWriting(pronTextEl);

  enTextEl.classList.remove("hidden-en-main", "en-reserving");
  enTextEl.classList.add("en-hand", "en-writing");
  enTextEl.innerHTML = `<span class="en-write-ink">${escapeHtml(text)}</span>`;
  enTextEl.style.setProperty("--en-write-p", "0");
  if (pronTextEl) pronTextEl.style.setProperty("--en-write-p", "0");
  void enTextEl.offsetWidth;

  const letters = text.replace(/\s/g, "").length;
  const duration = Math.min(2100, Math.max(700, letters * 110));
  const curve = makeIrregularHandwriteCurve(Math.max(letters, text.length));
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
  enTextEl.classList.remove("en-writing");
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
  enTextEl?.classList.remove("en-hand", "en-reserving", "en-writing");
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
    audio.currentTime = BGM_START_SEC;
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
    bgmAudio.currentTime = BGM_START_SEC;
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

  await startBgm();
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

      await sleep(300);

      // 한글 TTS — 노란 하이라이트 없음
      await playKoTTS(wordData.ko);

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
          // 3·6번만 2회: 학습 단어가 들어 있는 핵심 절만
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

  // 단어가 끝나도 음악이 끝날 때까지 대기 후 종료
  await waitForBgmEnd();
  stopBgm();

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
