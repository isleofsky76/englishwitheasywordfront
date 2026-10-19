/** 제목 텍스트 */
const PAGE_TITLE_MAIN = "시사 영단어";
/** 제목(부제) — `[단어]`는 주황 강조 (대괄호는 화면에서 제거) */
const PAGE_TITLE_SUB = "[Business 기사] <br>추출 어휘  ";
const PAGE_TITLE_META = "";
const PAGE_TITLE_NOTE = "";

/** 제목 글자 크기 (px) — 여기서 조절 */
const TITLE_MAIN_FONT_PX = 18;
const TITLE_SUB_FONT_PX = 38;
const TITLE_META_FONT_PX = 18;
const TITLE_NOTE_FONT_PX = 16;
/** 모바일(768px 이하) — null이면 위 데스크톱 값과 동일 */
const TITLE_SUB_FONT_PX_MOBILE = null;
const TITLE_META_FONT_PX_MOBILE = null;

function getTitleFontSizes() {
  const mobile = window.matchMedia("(max-width: 768px)").matches;
  return {
    main: TITLE_MAIN_FONT_PX,
    sub: mobile && TITLE_SUB_FONT_PX_MOBILE != null ? TITLE_SUB_FONT_PX_MOBILE : TITLE_SUB_FONT_PX,
    meta: mobile && TITLE_META_FONT_PX_MOBILE != null ? TITLE_META_FONT_PX_MOBILE : TITLE_META_FONT_PX,
    note: TITLE_NOTE_FONT_PX,
  };
}

function escapeTitleHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `[강조할 단어]` → title-hl span (대괄호는 화면에서 제거) */
function formatTitleLineMarks(text) {
  const raw = String(text || "");
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const open = raw.indexOf("[", i);
    if (open < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf("]", open + 1);
    if (close < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    out += escapeTitleHtml(raw.slice(i, open));
    const marked = raw.slice(open + 1, close);
    out += `<span class="title-hl">${escapeTitleHtml(marked)}</span>`;
    i = close + 1;
  }
  return out;
}

function formatTitleSubHtml(raw, fontPx) {
  const size = Number(fontPx) || TITLE_SUB_FONT_PX;
  return String(raw || "")
    .split(/<br\s*\/?>/gi)
    .map((part) => part.replace(/\s+/g, " ").trim())
    .filter((part) => part.length > 0)
    .map((part, i) => {
      const px = i === 0 ? size + 1 : size;
      return `<span class="title-line" style="font-size:${px}px!important">${formatTitleLineMarks(part)}</span>`;
    })
    .join("");
}

function buildPageTitleHtml() {
  const sizes = getTitleFontSizes();
  const noteHtml = PAGE_TITLE_NOTE
    ? `<span class="title-note" style="font-size:${sizes.note}px!important">${escapeTitleHtml(PAGE_TITLE_NOTE)}</span>`
    : `<span class="title-note" style="font-size:${sizes.note}px!important"></span>`;
  return (
    `<span class="title-main" style="font-size:${sizes.main}px!important">${escapeTitleHtml(PAGE_TITLE_MAIN)}</span>` +
    `<span class="title-accent title-sub" style="font-size:${sizes.sub}px!important">${formatTitleSubHtml(PAGE_TITLE_SUB, sizes.sub)}</span>` +
    `<span class="title-meta" style="font-size:${sizes.meta}px!important">${escapeTitleHtml(PAGE_TITLE_META)}</span><br><br>` +
    noteHtml
  );
}

function applyTitleTypography() {
  const el = document.getElementById("page-title");
  if (!el) return;
  const sizes = getTitleFontSizes();
  el.style.setProperty("font-size", `${sizes.sub}px`, "important");
  document.documentElement.style.setProperty("--0g-title-main-font", `${sizes.main}px`);
  document.documentElement.style.setProperty("--0g-title-sub-font", `${sizes.sub}px`);
  document.documentElement.style.setProperty("--0g-title-meta-font", `${sizes.meta}px`);
  document.documentElement.style.setProperty("--0g-title-note-font", `${sizes.note}px`);
}

function applyPageTitle() {
  const el = document.getElementById("page-title");
  if (!el) return;
  el.innerHTML = buildPageTitleHtml();
  applyTitleTypography();
}

function initPage() {
  initSharedPageBgPicker();
  applyPageBackground();
  pickRandomEnTtsVoice();
  renderStaticList();
  applyPageTitle();
  autoplayBtn?.addEventListener("click", runAutoplay);
  window.addEventListener("resize", applyPageTitle);
}

const VISIBLE_COUNT = 3;
const EN_KO_PASS_COUNT = 1;
/** 영어 스펠링 + 한글 글자 합이 이 값 이상이면 KO를 아래 줄로. 기본 15 + 10 */
const WORD_LINE_STACK_MIN_CHARS = 25;

// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
const json1 = 


[

  { "title1": "" },


  {
    "en": "sleep deprivation",
    "ko": "수면 부족",
    "hint": "",
    "pronunciation": "슬립 데프리베이션",
    "ipa": "/ˈsliːp ˌdeprɪˈveɪʃən/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
 
  {
    "en": "catatonic",
    "ko": "(의학) 긴장증적인",
    "hint": "",
    "pronunciation": "캐터타닉",
    "ipa": "/ˌkætəˈtɑːnɪk/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "a state of catatonic exhaustion",
    "image": ""
  },
  {
    "en": "evaporate",
    "ko": "사라지다, 무산되다",
    "hint": "",
    "pronunciation": "이배퍼레이트",
    "ipa": "/ɪˈvæpəreɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "ripple effect",
    "ko": "연쇄 파급효과",
    "hint": "",
    "pronunciation": "리플 이펙트",
    "ipa": "/ˈrɪpəl ɪˌfekt/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "pre-dawn",
    "ko": "동트기 전(의)",
    "hint": "",
    "pronunciation": "프리 돈",
    "ipa": "/ˌpriː ˈdɔːn/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "their pre-dawn activity",
    "image": ""
  },
  {
    "en": "cascade effect",
    "ko": "연쇄 효과",
    "hint": "",
    "pronunciation": "캐스케이드 이펙트",
    "ipa": "/kæˈskeɪd ɪˌfekt/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "dispatch",
    "ko": "발송하다, 파견하다",
    "hint": "",
    "pronunciation": "디스패치",
    "ipa": "/dɪˈspætʃ/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "nous",
    "ko": "(비격식) 지성, 상식",
    "hint": "",
    "pronunciation": "나우스",
    "ipa": "/naʊs/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "a concerning lack of technological nous.(기술적 상식(nous)의 우려스러운 결여)",
    "image": ""
  },
 
  {
    "en": "nod off",
    "ko": "깜빡 졸다, 잠깐 잠들다",
    "hint": "",
    "pronunciation": "낟 오프",
    "ipa": "/nɑːd ɔːf/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "intervention",
    "ko": "개입 조치, 개입",
    "hint": "",
    "pronunciation": "인터벤션",
    "ipa": "/ˌɪntərˈvenʃən/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
 
  {
    "en": "subset",
    "ko": "부분집합, 일부 집단",
    "hint": "",
    "pronunciation": "섭셋",
    "ipa": "/ˈsʌbset/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "a subset of volunteers",
    "image": ""
  },
  {
    "en": "void",
    "ko": "무효로 하다",
    "hint": "",
    "pronunciation": "보이드",
    "ipa": "/vɔɪd/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "this trial has therefore been voided.",
    "image": ""
  },
  {
    "en": "precautionary",
    "ko": "예방 차원의",
    "hint": "",
    "pronunciation": "프리코셔네리",
    "ipa": "/prɪˈkɔːʃəneri/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "litigation",
    "ko": "소송, 법적 분쟁",
    "hint": "",
    "pronunciation": "리티게이션",
    "ipa": "/ˌlɪtɪˈɡeɪʃən/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "intrusive",
    "ko": "거슬리는, 침입적인",
    "hint": "",
    "pronunciation": "인트루시브",
    "ipa": "/ɪnˈtruːsɪv/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "",
    "image": ""
  },
  {
    "en": "evangelical",
    "ko": "(자신의 견해를) 열렬히 전파하려는, 전도자 같은",
    "hint": "",
    "pronunciation": "이밴젤리컬",
    "ipa": "/ˌiːvænˈdʒelɪkəl/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "how evangelical Stew he is about his own sleep routine...",
    "image": ""
  },
]
  
    ;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
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
/** cf 노출 후 다음 진행 전 대기 (ms) */
const CF_REVEAL_WAIT_MS = 3000;
/** 한글 blur→선명 노출 후 다음 단어로 가기 전 대기 (ms) */
const KO_REVEAL_HOLD_MS = 500;
const KO_BLUR_REVEAL_MS = 850;
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
  2: "ko-KR-Chirp3-HD-Achird", // 여 · 밝은
  3: "ko-KR-Chirp3-HD-Achernar", // 여 · 차분
  4: "ko-KR-Chirp3-HD-Zephyr", // 여 · 부드럽고 자연스러운
  5: "ko-KR-Chirp3-HD-Vindemiatrix" // 여 · 성숙
};
/** cf 괄호 한글 TTS — false면 재생 안 함 */
const AUTOPLAY_READ_CF_KO = false;
/** cf 괄호 한글 TTS — Zephyr (자연스러운 여성) */
const CF_KO_TTS_VOICE = 4;
const CF_KO_TTS_PLAYBACK_RATE = 0.94;
/** 영어 TTS: 로드·autoplay 시 EN_TTS_VOICE_IDS 중 하나를 랜덤 선택 후 세션 유지 */
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
  console.info("[0g] EN voice", activeEnTtsVoiceId);
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

/** cf 괄호 그룹 — 중첩 괄호도 바깥 괄호 한 덩어리로 처리 */
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

/** cf 한글 괄호 — 인라인 gloss·끝 번역 모두 분홍 */
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

/** 단어 옆 gloss — underhanded(공정…) · for(~할…) 등 (문장 번역 괄호와 구분) */
function isInlineCfKoParen(text, parenStart) {
  const before = String(text || "").slice(0, parenStart).replace(/\s+$/, "");
  if (!before) return false;
  return /[A-Za-z0-9]$/.test(before);
}

/** cf — 영어 본문 / 문장 번역 한글 괄호 / 괄호 뒤 꼬리(출처 등) 분리 */
function splitCfEnKoParts(cfText) {
  const text = normalizeCfEnKoSpacing(String(cfText || "").trim());
  if (!text) return { enPart: "", koPart: "", tailPart: "" };
  let lastSentenceKoParen = null;
  forEachTopLevelParen(text, (full, inner, start, end) => {
    if (/[\uAC00-\uD7A3\u3131-\u318E]/.test(inner) && !isInlineCfKoParen(text, start)) {
      lastSentenceKoParen = { full, start, end };
    }
  });
  if (!lastSentenceKoParen) return { enPart: text, koPart: "", tailPart: "" };
  return {
    enPart: text.slice(0, lastSentenceKoParen.start).trim(),
    koPart: lastSentenceKoParen.full.trim(),
    tailPart: text.slice(lastSentenceKoParen.end).trim(),
  };
}

function buildCfHtml(cfText, targetWord) {
  const text = String(cfText || "").trim();
  if (!text) return "";
  return wrapCfRemainingEnglish(
    wrapCfParenEnglish(wrapCfKoParenBlocks(underlineTargetInCf(text, targetWord)))
  );
}

/** cf 본문 영어(괄호 밖·이미 감싼 괄호 제외)를 cf-en-word로 감싸 TTS 하이라이트용 */
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

async function markWordAsRead(_globalIndex, _animate = true) {
  // 읽음 표시(비스듬한 V 체크) 없음
}

function countEnSpellLetters(en) {
  return (String(en || "").match(/[A-Za-z]/g) || []).length;
}

function countKoChars(ko) {
  return (String(ko || "").match(/[가-힣]/g) || []).length;
}

/** 짧으면 EN 오른쪽, 길면(≥ WORD_LINE_STACK_MIN_CHARS) KO만 아래 줄 */
function shouldStackWordLine(en, ko) {
  return countEnSpellLetters(en) + countKoChars(ko) >= WORD_LINE_STACK_MIN_CHARS;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("ko-first-mode", "second-pass-mode");
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const enHiddenClass = mode === "second-pass" ? " hidden-en-main" : "";
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  // 자리 예약 — 빈 문자열이면 KO 등장 시 줄바꿈이 튀며 위로 올라감
  const koContent = item.ko || "";
  const stack = shouldStackWordLine(item.en, item.ko);
  const enMainHtml = `<span class="en-main" data-full-en="${item.en}"><span class="en-main-text${enHiddenClass}">${item.en}</span></span>`;
  const colonHtml = `<span class="en-colon">:</span>`;
  const koHtml = `<span class="ko-text${koHiddenClass}" data-full-ko="${item.ko}">${koContent}</span>`;
  const wordLine = stack
    ? `<span class="en-row">${enMainHtml}${colonHtml}</span>${koHtml}`
    : `${enMainHtml}${colonHtml}${koHtml}`;
  const wordLineClass = stack ? "word-line word-line-stack" : "word-line";
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfBodyHtml = cfText ? buildCfHtml(cfText, targetWord) : "";
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf"><span class="cf-label">cf.</span> ${cfBodyHtml}</span>`
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
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${cfHtml}</div></div>`;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
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

  document.documentElement.style.setProperty("background-color", pageBgColor, "important");
  document.documentElement.style.setProperty("background-image", "none", "important");
  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${photoSrc}")`;
    bgEl.style.setProperty("--page-bg-color", pageBgColor);
    bgEl.hidden = false;
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

function resolveCfKoTtsVoiceId() {
  return KO_TTS_VOICE_IDS[Number(CF_KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[4];
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
  return els;
}

/** TTS용 — 괄호 한글·한글 문자 제거 */
function stripHangulFromSpeakText(text) {
  return String(text || "")
    .replace(/\([\uAC00-\uD7A3\u3131-\u318E][^)]*\)/g, "")
    .replace(/[\uAC00-\uD7A3\u3131-\u318E]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** cf 본문 영어(인라인·문장 번역 한글 괄호 제외, 출처 꼬리 제외) */
function getCfEnSpeakText(word) {
  const cf = normalizeCfEnKoSpacing(String(word?.cf || "").trim());
  if (!cf) return "";
  const { enPart, tailPart } = splitCfEnKoParts(cf);
  let speak = enPart && /[A-Za-z]/.test(enPart) ? enPart : cf;
  if (tailPart && /[A-Za-z]/.test(tailPart) && !/[\uAC00-\uD7A3\u3131-\u318E]/.test(tailPart)) {
    speak = `${speak} ${tailPart}`.replace(/\s+/g, " ").trim();
  }
  speak = stripHangulFromSpeakText(speak);
  if (speak && /[A-Za-z]/.test(speak)) return speak;
  const parenParts = extractCfParenEnglishParts(cf);
  if (parenParts.length) return stripHangulFromSpeakText(parenParts.join(" "));
  return "";
}

function getCfKoSpeakText(word) {
  const cf = String(word?.cf || "").trim();
  if (!cf) return "";
  const { koPart } = splitCfEnKoParts(cf);
  if (!koPart) return "";
  return koPart.replace(/^\(|\)$/g, "").trim();
}

/** cf 영어가 있으면 읽음. cfSpeakRates가 있으면 그 속도로 재생 */
function shouldSpeakCfEnglish(word) {
  return Boolean(getCfEnSpeakText(word));
}

/** cf 영어 TTS (단어별 하이라이트 없음) */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null, options = null) {
  const speakText = getCfEnSpeakText(word);
  if (!speakText || !itemEl) return;
  const coreOnly = Boolean(options?.coreOnly);
  const text = coreOnly ? extractCfCoreEnglish(speakText, word?.en) : speakText;
  if (!String(text || "").trim()) return;
  const rates = Array.isArray(ratesOverride) && ratesOverride.length
    ? ratesOverride
    : getCfSpeakRates(word);
  await playEnTTS(text, rates, null);
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
  const koText = getKoSpeakText(word.ko || word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

async function playKoTTS(textOrWord) {
  const koText = getKoSpeakText(textOrWord?.ko || textOrWord);
  if (!koText) return;
  await playBackendTTS(koText, resolveKoTtsVoiceId("ko-KR"));
}

function preloadCfEnglishTTS(word) {
  const voice = resolveEnTtsVoiceId("en-US");
  const enText = getCfEnSpeakText(word);
  if (!enText) return;
  loadBackendTTSAudio(enText, voice).catch(() => {});
  const core = extractCfCoreEnglish(enText, word?.en);
  if (core && core !== enText) {
    loadBackendTTSAudio(core, voice).catch(() => {});
  }
}

function preloadCfKoTTS(word) {
  const koText = getCfKoSpeakText(word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveCfKoTtsVoiceId()).catch(() => {});
}

async function playCfKoTTS(word) {
  const cfKoText = getCfKoSpeakText(word);
  if (!cfKoText) return;
  await playBackendTTS(cfKoText, resolveCfKoTtsVoiceId(), CF_KO_TTS_PLAYBACK_RATE);
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadEnTTS(word);
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
    const text = el.dataset.fullKo || "";
    if (text) el.textContent = text;
    el.classList.add("hidden-ko");
    el.classList.remove("ko-reserving", "ko-hand", "ko-writing", "ko-blur-in");
    el.style.removeProperty("--ko-write-p");
  });
}

function revealKoText(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (text) koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing", "ko-hand", "ko-blur-in");
  koTextEl.style.removeProperty("--ko-write-p");
}

/** 한글이 blur → 선명하게 자연스럽게 드러남 */
async function revealKoWithBlur(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (!text) {
    revealKoText(koTextEl, fallback);
    return;
  }

  koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing", "ko-hand");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.remove("ko-blur-in");
  void koTextEl.offsetWidth;
  koTextEl.classList.add("ko-blur-in");

  await new Promise((resolve) => {
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      koTextEl.removeEventListener("animationend", onEnd);
      resolve();
    };
    const onEnd = (e) => {
      if (e.target !== koTextEl) return;
      done();
    };
    koTextEl.addEventListener("animationend", onEnd);
    setTimeout(done, KO_BLUR_REVEAL_MS + 80);
  });
}

function clearKoReveal(koTextEl) {
  koTextEl?.classList.remove("ko-hand", "ko-reserving", "ko-writing", "ko-blur-in");
  koTextEl?.style.removeProperty("--ko-write-p");
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

  const duration = Math.min(1700, Math.max(550, text.replace(/\s/g, "").length * 95));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = 1 - (1 - t) ** 1.45;
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
    koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-blur-in");
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

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  pickRandomEnTtsVoice();
  window.Mark3readPageBg?.hidePageBgPicker?.();

  const groups = buildGroups();
  if (!groups.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  hideAllKoText();
  hideAllCfText();
  preloadWordsAhead(0, json1.length);
  await sleep(1500);

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
      const enTextEl = item.querySelector(".en-main-text");
      const wordData = json1[globalIndex];

      preloadWordTTS(wordData, globalIndex);
      enTextEl?.classList.add("is-speaking");
      try {
        await playEnTTS(getEnSpeakText(wordData));
      } finally {
        enTextEl?.classList.remove("is-speaking");
      }
      if (koTextEl) {
        await revealKoWithBlur(koTextEl, ko);
      }
      const cfNoteEl = item.querySelector(".cf-note");
      if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
      clearKoReveal(koTextEl);
      if (KO_REVEAL_HOLD_MS > 0) await sleep(KO_REVEAL_HOLD_MS);
      await markWordAsRead(globalIndex);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  if (EN_KO_PASS_COUNT >= 2) {
    await sleep(700);

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

        const enTextEl = item.querySelector(".en-main-text");
        const pronTextEl = item.querySelector(".pron-text");

        preloadEnTTS(json1[globalIndex]);
        reserveEnSlot(enTextEl, item.dataset.en || "");

        await writeEnWithHand(enTextEl, item.dataset.en || "", pronTextEl);
        const cfNoteEl = item.querySelector(".cf-note");
        if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
        if (CF_REVEAL_WAIT_MS > 0) await sleep(CF_REVEAL_WAIT_MS);
        enTextEl?.classList.add("is-speaking");
        try {
          await playEnTTS(getEnSpeakText(json1[globalIndex]));
        } finally {
          enTextEl?.classList.remove("is-speaking");
        }

        moveEnHandToNext(group, w);
        await sleep(400);
      }
    }
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

initPage();
