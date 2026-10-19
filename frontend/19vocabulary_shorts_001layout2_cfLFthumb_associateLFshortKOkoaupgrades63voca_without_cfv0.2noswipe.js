/* =====================================================================
   🔊 TTS 음성 설정 (제일 위)
   ---------------------------------------------------------------------
   enVoice / koVoice : 숫자(고정) 또는 "sequential" / "random"
   "sequential" (기본) → 1→2→3… 번호 순서, 한 바퀴 끝나면 다시 1부터
   "random" → 목록을 섞은 뒤 순서대로 (한 바퀴 끝나면 다시 섞음)
   ===================================================================== */

/** 영어 TTS 음성 목록 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D",                 // 남 · 미국
  2: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  3: "en-US-Chirp3-HD-Enceladus",        // 남 · 미국 허스키
  4: "en-US-Chirp-HD-F",                 // 여 · 미국
  5: "en-US-Chirp3-HD-Despina",          // 여 · 미국
  6: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  7: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  8: "en-GB-Chirp-HD-D",                 // 남 · 영국
  9: "en-GB-Neural2-B",                  // 남 · 영국
  10: "en-GB-Wavenet-N",                 // 여 · 영국
};

/** 한글 TTS 음성 목록 */
const KO_TTS_VOICE_IDS = {
  1: "ko-KR-Chirp3-HD-Zephyr",           // 여 · 부드러운
  2: "ko-KR-Neural2-C",                  // 남 · Neural2
  3: "ko-KR-Chirp3-HD-Achernar",         // 여 · 차분
  4: "ko-KR-Chirp3-HD-Achird",           // 여 · 밝은
  5: "ko-KR-Chirp3-HD-Vindemiatrix",     // 여 · 성숙
  6: "ko-KR-Chirp3-HD-Zubenelgenubi",    // 남 · Chirp3
  7: "ko-KR-Chirp3-HD-Charon",           // 남 · Chirp3
  8: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  9: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  10: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  11: "ko-KR",                            // 기본
};

/**
 * 영어 음성 — 1~10 또는 "sequential" / "random"
 * 한글 음성 — 1~8 또는 "sequential" / "random"
 */
const TTS_CONFIG = {
  enVoice: "sequential",
  koVoice: "sequential",
};

/**
 * 화면 표시 — swipe 없이 n개씩 페이지 전환
 * ★ 이 파일(…without_cfv0.2noswipe.js)의 wordsPerPage만 적용됩니다.
 *    without_cfv0.2.js 를 바꿔도 이 HTML에는 반영되지 않습니다.
 * wordsPerPage — 한 화면에 보이는 개수 n (예: 3 → 1·2·3만 보임 → 다음 4·5·6)
 */
const DISPLAY_CONFIG = {
  wordsPerPage: 4,
};

/**
 * 타이밍(초) — ★ 여기 숫자만 바꾸세요
 * exampleHoldSec — example(예문) 보인 뒤 → 다음 단어로 넘어가기 전 대기
 *                  기본 0.2 = 기존 WORD_GAP(200ms)와 동일
 */
const TIMING_CONFIG = {
  exampleHoldSec: 0.2,
};

/**
 * 학습 패스 on/off
 * pass1 — true: 한글 숨김 → 영어 읽기 → 한글 노출·읽기
 * pass2 — true: 영어 숨김 → 한글 읽기 → 영어(+발음·예문) 노출·읽기
 * 둘 다 true면 1 → 2 순서로 진행
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: false,
};

/**
 * noswipe — 단어별 퇴장(swipe/rise) 없음
 * 페이지(n개) 단위로만 다음 JSON 구간으로 전환
 */
const EXIT_CONFIG = {
  riseOut: false,
  swipeOut: false,
};

/** swipeOut용 퇴장 스타일 순환 */
const SWIPE_OUT_STYLES = [
  "swipe-rise",
  "swipe-drift-l",
  "swipe-drift-r",
  "swipe-spring",
  "swipe-fade",
  "swipe-tilt",
  "swipe-elastic",
  "swipe-snap",
];
let swipeOutStyleCursor = 0;

/* =====================================================================
   ✏️ 콘텐츠 — colourchange words[] + upgrades6 REVIEW_QUIZ 동일 JSON
   ---------------------------------------------------------------------
   페이지 공통: badge / title / source / sourceMark / outro
   단어 항목: en, ko, pos, reading, ipa, defs, example, highlight,
              translation, image, icon, spark, note
   퀴즈 quiz[]: { en, ko, answer, answerKo, image } — upgrades6과 동일
   ===================================================================== */
const WORDS = {
  badge: "시사 영단어",

  /* 날짜 — ★ 여기 문자열만 바꾸세요 (예: "Oct. 18, 2026")
   * 비우면("") 오늘 날짜 자동
   */
  date: "Oct. 19, 2026",

  /* [강조]=노랑, (강조)=미백, 그 밖=라임(녹색) — colourchange와 동일 3색
   * titleSize — 제목 글자 크기(px). ★ 여기 숫자만 바꾸세요
   * 줄마다 다르게 할 때만 size 추가: { text: "...", size: 72 }
   */
  titleSize: 70,
  title: [
    { text: "[조깅하는 사람들은]  " },
    { text: "부상을 피할 수 있을까 (#부상 관련어휘)" },
  ],

  /* 가을에 만나는 또 다른 그리스,<br>펠로폰네소스 자동차 여행
    제목 옆 증명사진(3.5×4.5) — ★ 여기 경로를 바꾸면 이미지가 바뀜
   * 비우면 재생 중 현재 단어의 image / 초기에는 words[0].image
   */
  titlePhoto: "",

  source: "출처 : The Economist",
  sourceMark: "추출 어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* colourchange cardData.words 와 동일 구조 */
  words: [
    
   
  
    {
      en: "overuse",
      ko: "과사용, 과도한 사용",
      pos: "명",
      reading: "오버유스",
      ipa: "/ˌoʊvərˈjuːs/",
      defs: ["신체 부위나 물건을 지나치게 많이 사용함", "명사 앞에서 과사용으로 인한 것임을 나타냄"],
      example: "“overuse” injuries",
      cf: "",
      enRepeat: 2,
      highlight: "overuse",
      translation: "‘과사용’으로 인한 부상들",
      image: "",
      icon: "🔁",
      spark: "red",
      note: {
        phrase: "overuse<br>injuries",
        text: "같은 부위를 지나치게 사용해<br>발생하는 부상들"
      }
    },
    {
      en: "ache",
      ko: "쑤심, 통증 ",
      pos: "명",
      reading: "에이크",
      ipa: "/eɪk/",
      defs: ["지속적으로 느껴지는 둔하고 쑤시는 통증"],
      example: "an ache around the kneecap",
      cf: "",
      enRepeat: 2,
      highlight: "ache",
      translation: "무릎뼈 주변의<br>쑤시는 통증",
      image: "",
      icon: "🦵",
      spark: "red",
      note: {
        phrase: "an ache<br>around the kneecap",
        text: "무릎뼈 주변에서 느껴지는<br>지속적인 통증"
      }
    },
    {
      en: "knee pain",
      ko: "무릎 통증",
      pos: "명사구",
      reading: "니 페인",
      ipa: "/ˈniː peɪn/",
      defs: ["무릎 부위에서 느껴지는 통증"],
      example: "KNEE PAIN in joggers",
      cf: "",
      enRepeat: 2,
      highlight: "KNEE PAIN",
      translation: "조깅하는 사람들의<br>무릎 통증",
      image: "",
      icon: "🦵",
      spark: "red",
      note: {
        phrase: "knee pain<br>in joggers",
        text: "조깅하는 사람들에게<br>나타나는 무릎 통증"
      }
    },
   
    {
      en: "kneecap",
      ko: "슬개골, 무릎뼈",
      pos: "명",
      reading: "니캡",
      ipa: "/ˈniːkæp/",
      defs: ["무릎 관절 앞쪽에 있는 작은 뼈", "슬개골"],
      example: "around the kneecap",
      cf: "",
      enRepeat: 2,
      highlight: "kneecap",
      translation: "무릎뼈 주변에",
      image: "",
      icon: "🦴",
      spark: "yellow",
      note: {
        phrase: "around<br>the kneecap",
        text: "무릎 앞쪽에 있는 뼈인<br>슬개골 주변에"
      }
    },
    {
      en: "twinge",
      ko: "찌릿한 통증",
      pos: "명",
      reading: "트윈지",
      ipa: "/twɪndʒ/",
      defs: ["갑자기 잠깐 느껴지는 날카롭거나 찌릿한 통증"],
      example: "report a twinge",
      cf: "",
      enRepeat: 2,
      highlight: "twinge",
      translation: "찌릿한 통증이<br>있다고 말하다",
      image: "",
      icon: "⚡",
      spark: "red",
      note: {
        phrase: "report<br>a twinge",
        text: "순간적으로 찌릿한 통증을<br>느꼈다고 보고하다"
      }
    },

    {
      en: "stress fracture",
      ko: "피로골절",
      pos: "명사구",
      reading: "스트레스 프랙처",
      ipa: "/ˈstres ˌfræktʃər/",
      defs: ["반복적인 부담으로 뼈에 작은 금이 생기는 부상"],
      example: "stress fractures",
      cf: "",
      enRepeat: 2,
      highlight: "stress fractures",
      translation: "피로골절",
      image: "",
      icon: "🦴",
      spark: "red",
      note: {
        phrase: "stress<br>fractures",
        text: "반복적인 부담으로 생기는<br>뼈의 미세한 골절"
      }
    },
    {
      en: "cartilage",
      ko: "연골",
      pos: "명",
      reading: "카털리지",
      ipa: "/ˈkɑːrtəlɪdʒ/",
      defs: ["관절 등에서 뼈의 끝을 덮고 충격을 완화하는 탄력 있는 조직"],
      example: "knee cartilage",
      cf: "",
      enRepeat: 2,
      highlight: "cartilage",
      translation: "무릎 연골",
      image: "",
      icon: "🦵",
      spark: "yellow",
      note: {
        phrase: "knee<br>cartilage",
        text: "무릎 관절에서 충격을<br>완화하는 연골"
      }
    },
   
    {
      en: "arthritis",
      ko: "관절염",
      pos: "명",
      reading: "아스라이티스",
      ipa: "/ɑːrˈθraɪtɪs/",
      defs: ["관절에 염증이 생겨 통증이나 부종 등을 일으키는 질환"],
      example: "lead to arthritis",
      cf: "",
      enRepeat: 2,
      highlight: "arthritis",
      translation: "관절염으로 이어지다",
      image: "",
      icon: "🦵",
      spark: "red",
      note: {
        phrase: "lead to<br>arthritis",
        text: "결과적으로 관절염이<br>생기게 하다"
      }
    },
    
  
   
   
    
  ],

  /**
   * Review 퀴즈 — 최신 words 기준 2문제
   * { en, ko, answer, answerKo, image }
   */
  // quiz: [

  //   {
  //     en: "The Mayor says shops have been ran______ and supports local business owners.",
  //     ko: "시장은 상점들이 (마구 털려 엉망이 됐다)며 지역 상인들에 대한 지지를 표명했다.",
  //     answer: "ransacked",
  //     answerKo: "샅샅이 뒤져 엉망으로 만들다",
  //     image: "resources/ransack.jpg",
  //   },
  // ],
};

const WORD_COLORS = ["#e06a4f", "#3e6fd8", "#3a9a6b", "#c23b3b", "#8b5cf6", "#0d9488"];

const ARROW_SVG =
  '<svg class="arrow" width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">' +
  '<path d="M3 12 H 28 M20 4 L 29 12 L 20 20" fill="none" stroke="#2d4f9e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** 영어가 공백 기준 2단어 이상(합성어·구)인지 */
function isMultiWordEn(en) {
  return String(en || "").trim().split(/\s+/).filter(Boolean).length >= 2;
}

/** 한 줄에 영어+한글이 비좁은 긴 단어 (예: commoditize) */
const LONG_EN_CHARS = 10;

/** 합성어·긴 단어 — 한글 뜻을 영어 아래에 */
function needsStackedMeaning(en) {
  const s = String(en || "").trim();
  if (!s) return false;
  if (isMultiWordEn(s)) return true;
  return s.replace(/[^A-Za-z]/g, "").length >= LONG_EN_CHARS;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** escape 후 &lt;br&gt; 만 실제 줄바꿈 태그로 복원 (화면에 &lt;br&gt; 문자 노출 없음) */
function allowBreakTags(escapedHtml) {
  return String(escapedHtml || "").replace(/&lt;br\s*\/?&gt;/gi, "<br>");
}

/** 예문 영어만 — 괄호 안 한글 뜻은 키워드 강조 대상에서 제외 */
function splitExampleEnglish(sentence) {
  const raw = String(sentence || "");
  const koParen = raw.search(/\([^)]*[\uAC00-\uD7A3][^)]*\)/);
  if (koParen < 0) return { english: raw, rest: "" };
  return { english: raw.slice(0, koParen), rest: raw.slice(koParen) };
}

/** 예문 영어의 highlight/en 키워드만 mark (활용형도 stem 매칭) */
function highlightSentence(sentence, target, fallback) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  const { english, rest } = splitExampleEnglish(raw);
  const safeEn = allowBreakTags(escapeHtml(english));
  const safeRest = allowBreakTags(escapeHtml(rest));
  const candidates = [...new Set(
    [target, fallback].map((v) => String(v || "").trim()).filter(Boolean)
  )];
  if (!candidates.length) return safeEn + safeRest;

  for (const t of candidates) {
    const re = new RegExp(`\\b(${escapeRegExp(t)})\\b`, "i");
    if (re.test(safeEn)) return safeEn.replace(re, "<mark>$1</mark>") + safeRest;
  }

  const stem = candidates.slice().sort((a, b) => a.length - b.length)[0];
  if (stem.length >= 4) {
    const re = new RegExp(`\\b(${escapeRegExp(stem)}[a-zA-Z']*)\\b`, "i");
    if (re.test(safeEn)) return safeEn.replace(re, "<mark>$1</mark>") + safeRest;
  }
  return safeEn + safeRest;
}

/** 예문 괄호 안 한글 — 중첩 괄호의 영어 풀이까지 포함해 한 덩어리로 */
function wrapExampleKoParens(html) {
  const s = String(html || "");
  let out = "";
  let i = 0;
  while (i < s.length) {
    const open = s.indexOf("(", i);
    if (open < 0) {
      out += s.slice(i);
      break;
    }
    let depth = 0;
    let close = -1;
    for (let j = open; j < s.length; j++) {
      if (s[j] === "(") depth++;
      else if (s[j] === ")") {
        depth--;
        if (depth === 0) {
          close = j;
          break;
        }
      }
    }
    if (close < 0) {
      out += s.slice(i);
      break;
    }
    const inner = s.slice(open + 1, close);
    if (/[\uAC00-\uD7A3]/.test(inner.replace(/<[^>]+>/g, ""))) {
      out += s.slice(i, open) + `<span class="ex-ko">(${inner})</span>`;
      i = close + 1;
    } else {
      out += s.slice(i, open + 1);
      i = open + 1;
    }
  }
  return out;
}

function getWordList() {
  return Array.isArray(WORDS.words) ? WORDS.words : [];
}

function renderHoles() {
  const holes = document.getElementById("holes");
  for (let i = 0; i < 14; i++) holes.appendChild(document.createElement("span"));
}

function renderHead() {
  const badge = document.getElementById("badge");
  if (badge) badge.textContent = WORDS.badge || "시사 영단어";

  const source = document.getElementById("sourceLabel");
  if (source) source.textContent = WORDS.source || "";

  const mark = document.getElementById("sourceMark");
  if (mark) mark.textContent = WORDS.sourceMark || "";
}

/** `[강조]` → title-hl(노랑), `(강조)` → title-plain(미백). 괄호는 화면에서 제거 */
function formatTitleMarks(text) {
  const raw = String(text || "");
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const openSq = raw.indexOf("[", i);
    const openParen = raw.indexOf("(", i);
    let open = -1;
    let closeCh = "";
    let cls = "";
    if (openSq >= 0 && (openParen < 0 || openSq <= openParen)) {
      open = openSq;
      closeCh = "]";
      cls = "title-hl";
    } else if (openParen >= 0) {
      open = openParen;
      closeCh = ")";
      cls = "title-plain";
    }
    if (open < 0) {
      out += escapeHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf(closeCh, open + 1);
    if (close < 0) {
      out += escapeHtml(raw.slice(i));
      break;
    }
    out += escapeHtml(raw.slice(i, open));
    out += `<span class="${cls}">${escapeHtml(raw.slice(open + 1, close))}</span>`;
    i = close + 1;
  }
  return out;
}

function getTitleBaseSize() {
  const n = Number(WORDS.titleSize);
  return Number.isFinite(n) && n > 0 ? n : 84;
}

function renderTitle() {
  const titleEl = document.getElementById("title");
  if (!titleEl) return;

  const baseSize = getTitleBaseSize();
  /* CSS·캐시와 무관하게 인라인으로 강제 적용 */
  titleEl.style.setProperty("--title-size", `${baseSize}px`);
  titleEl.style.setProperty("font-size", `${baseSize}px`, "important");

  const lines = (WORDS.title || [])
    .map((line) => {
      let html = "";
      let lineSize = baseSize;
      if (typeof line === "string") {
        html = formatTitleMarks(line);
      } else {
        const parts = [];
        if (line.hl) parts.push(formatTitleMarks(line.hl));
        if (line.after) parts.push(formatTitleMarks(line.after));
        if (line.text && !line.hl) parts.push(formatTitleMarks(line.text));
        html = parts.join("");
        const n = Number(line.size);
        if (Number.isFinite(n) && n > 0) lineSize = n;
      }
      if (!html) return "";
      return (
        `<span class="title-line" style="font-size:${lineSize}px !important">` +
        html +
        `</span>`
      );
    })
    .filter(Boolean);

  titleEl.innerHTML = lines.join("<br>");
  renderTitlePhoto();
}

const TITLE_PHOTO_GAP_ABOVE_MEANING_PX = 10;
const TITLE_GAP_BELOW_BADGE_PX = 20;
/* 이미지 Y — 페이지마다 한 번, 이후 단어 교체 시 재사용 */
let cachedTitlePhotoTranslateY = null;

function getStageScale() {
  const stage = document.getElementById("stage");
  if (!stage) return 1;
  const m = String(stage.style.transform || "").match(/scale\(([^)]+)\)/);
  if (m) {
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return Math.min(window.innerWidth / 1080, window.innerHeight / 1920) || 1;
}

function applyTitlePhotoTranslateY(deltaY) {
  const photo = document.getElementById("title-photo");
  if (!photo) return;
  const y = Number.isFinite(deltaY) ? deltaY : 0;
  photo.style.transform = `translateY(${y}px)`;
}

/**
 * 제목 = badge 아래 20px.
 * 제목이 올라간 만큼 출처·단어도 같이 당겨 X 빈 공간 제거.
 */
function alignTitleBelowBadge() {
  const title = document.getElementById("title");
  const stage = document.getElementById("stage");
  const badge = document.getElementById("badge");
  const source = document.querySelector(".source-row");
  const words = document.getElementById("words");
  if (!title || !stage || !badge) return;

  title.style.transform = "translateY(0)";
  if (source) source.style.transform = "translateY(0)";
  if (words) words.style.transform = "translateY(0)";
  void title.offsetWidth;

  const scale = getStageScale();
  const stageRect = stage.getBoundingClientRect();
  const titleRect = title.getBoundingClientRect();
  const badgeRect = badge.getBoundingClientRect();

  const badgeBottom = (badgeRect.bottom - stageRect.top) / scale;
  const titleTop = (titleRect.top - stageRect.top) / scale;
  const deltaY = badgeBottom + TITLE_GAP_BELOW_BADGE_PX - titleTop;

  title.style.transform = `translateY(${deltaY}px)`;
  if (source) source.style.transform = `translateY(${deltaY}px)`;
  if (words) words.style.transform = `translateY(${deltaY}px)`;
}

/**
 * 이미지 하단 = 페이지 첫 단어 한글 바로 위 10px
 * force=false면 캐시된 Y 재사용
 */
function alignTitlePhotoAboveFirstMeaning(force = false) {
  const photo = document.getElementById("title-photo");
  const stage = document.getElementById("stage");
  if (!photo || !stage || photo.hidden) return;

  if (!force && cachedTitlePhotoTranslateY != null) {
    applyTitlePhotoTranslateY(cachedTitlePhotoTranslateY);
    return;
  }

  const meaning = document.querySelector(
    "#words .word:not(.is-page-hidden):not(.is-gone) .meaning"
  ) || document.querySelector("#words .word:not(.is-page-hidden) .meaning");
  if (!meaning) return;

  applyTitlePhotoTranslateY(0);
  void photo.offsetWidth;

  const scale = getStageScale();
  const stageRect = stage.getBoundingClientRect();
  const photoRect = photo.getBoundingClientRect();
  const meaningRect = meaning.getBoundingClientRect();

  const meaningTop = (meaningRect.top - stageRect.top) / scale;
  const photoBottom = (photoRect.bottom - stageRect.top) / scale;
  const deltaY = meaningTop - TITLE_PHOTO_GAP_ABOVE_MEANING_PX - photoBottom;

  cachedTitlePhotoTranslateY = deltaY;
  applyTitlePhotoTranslateY(deltaY);
}

/** 제목 옆 증명사진 — src 변경 시 캐시 무시하고 강제 로드 */
function setTitlePhoto(src) {
  const wrap = document.getElementById("title-photo");
  const img = document.getElementById("title-photo-img");
  if (!wrap || !img) return;

  const path = String(src || "").trim();
  if (!path) {
    wrap.hidden = true;
    img.removeAttribute("src");
    img.dataset.baseSrc = "";
    return;
  }

  /* 같은 파일이어도 내용이 바뀌면 보이게 cache-bust */
  const bust = `${path}${path.includes("?") ? "&" : "?"}v=${Date.now()}`;
  img.alt = "";
  img.dataset.baseSrc = path;
  img.onload = () => {
    wrap.hidden = false;
    /* 이미지 바뀌어도 같은 Y 유지 */
    alignTitlePhotoAboveFirstMeaning(false);
  };
  img.onerror = () => {
    console.warn("title photo load failed:", path);
    wrap.hidden = true;
  };
  /* 이전 src 제거 후 재지정 — 브라우저 캐시·미갱신 방지 */
  img.removeAttribute("src");
  img.src = bust;
  wrap.hidden = false;
  alignTitlePhotoAboveFirstMeaning(false);
}

function renderTitlePhoto(wordImage) {
  const fixed = String(WORDS.titlePhoto || "").trim();
  const fromWord = String(wordImage || getWordList()[0]?.image || "").trim();
  setTitlePhoto(fixed || fromWord);
}

/** 첫 페이지 노출 개수 (DISPLAY_CONFIG.wordsPerPage) */
function getWordsPerPage() {
  const n = Number(DISPLAY_CONFIG?.wordsPerPage);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 5;
}

/** 페이지별 노출 개수 — 0페이지는 wordsPerPage, 이후는 nextPageSize */
function getPageSize(pageIndex) {
  const first = getWordsPerPage();
  if (pageIndex <= 0) return first;
  const next = Number(DISPLAY_CONFIG?.nextPageSize);
  if (Number.isFinite(next) && next > 0) return Math.floor(next);
  return first;
}

/** [{ start, end, page, size }, …] — 가변 페이지 크기 반영 */
function buildPageRanges(total) {
  const count = Math.max(0, Number(total) || 0);
  const ranges = [];
  let start = 0;
  let page = 0;
  while (start < count) {
    const size = getPageSize(page);
    const end = Math.min(start + size, count);
    ranges.push({ start, end, page, size: end - start });
    start = end;
    page += 1;
  }
  return ranges.length ? ranges : [{ start: 0, end: 0, page: 0, size: 0 }];
}

function showWordPage(wordEls, pageIndex, ranges) {
  const list = Array.isArray(ranges) && ranges.length
    ? ranges
    : buildPageRanges(wordEls.length);
  const range = list[pageIndex] || list[0] || { start: 0, end: wordEls.length };
  const start = range.start;
  const end = range.end;
  wordEls.forEach((wordEl, i) => {
    const onPage = i >= start && i < end;
    wordEl.classList.toggle("is-page-hidden", !onPage);
    if (onPage) {
      wordEl.classList.remove(
        "is-gone",
        "is-swiping-out",
        "is-finale-pending",
        "is-revealing-down"
      );
    }
  });
  cachedTitlePhotoTranslateY = null;
  requestAnimationFrame(() => {
    fitVisibleMeaningFonts();
    alignTitleBelowBadge();
    alignTitlePhotoAboveFirstMeaning(true);
  });
}

function showAllWords(wordEls) {
  wordEls.forEach((wordEl) => wordEl.classList.remove("is-page-hidden"));
}

function renderWords() {
  const list = document.getElementById("words");
  if (!list) return;
  list.textContent = "";

  const pageSize = getWordsPerPage();
  getWordList().forEach((w, i) => {
    const li = el("li", "word");
    /* 처음엔 1~n만 표시 */
    if (i >= pageSize) li.classList.add("is-page-hidden");

    const row = el("div", "word-row");
    const num = el("span", "num", String(i + 1));
    num.style.background = w.color || WORD_COLORS[i % WORD_COLORS.length];
    row.appendChild(num);

    const hlClass = w.hl || (i % 2 === 0 ? "hl" : "hlpink");
    /* 자리는 ghost로 확보 — 영어는 처음 숨김, 재생 시 왼쪽에서 날아옴 */
    const enSlot = el("span", "en-slot");
    const enGhost = el("span", "en-ghost", w.en);
    enGhost.setAttribute("aria-hidden", "true");
    const enFly = el("span", "en en-fly " + hlClass, w.en);
    enFly.setAttribute("aria-hidden", "true");
    enSlot.appendChild(enGhost);
    enSlot.appendChild(enFly);
    row.appendChild(enSlot);
    if (needsStackedMeaning(w.en)) {
      /* 합성어·긴 단어 — 한글 뜻을 영어 아래에 */
      row.classList.add("is-compound");
      li.classList.add("is-compound");
      const meaningRow = el("div", "word-meaning-row");
      meaningRow.insertAdjacentHTML("beforeend", ARROW_SVG);
      meaningRow.appendChild(el("span", "meaning", w.ko));
      row.appendChild(meaningRow);
    } else {
      row.insertAdjacentHTML("beforeend", ARROW_SVG);
      row.appendChild(el("span", "meaning", w.ko));
    }
    li.appendChild(row);

    const pron = el("div", "pron");
    pron.appendChild(el("span", null, "[" + (w.reading || "") + "]"));
    pron.appendChild(el("span", "ipa", w.ipa || ""));
    if (w.pos) {
      pron.appendChild(el("span", "pos", "〈" + w.pos + "〉"));
    }
    li.appendChild(pron);

    /* 발음 바로 아래 — ex. + example */
    if (w.example) {
      const exBlock = el("div", "example-block");
      const ex = el("p", "example");
      const label = el("span", "ex-label", "ex. ");
      const inner = el("span", "example-inner");
      inner.innerHTML = wrapExampleKoParens(
        highlightSentence(w.example, w.highlight || w.en, w.en)
      );
      ex.appendChild(label);
      ex.appendChild(inner);
      exBlock.appendChild(ex);
      li.appendChild(exBlock);
    }

    list.appendChild(li);
  });
}

/** 해당 단어를 아래에서 위로 스와이프하며 사라지게 */
function swipeWordOutUp(wordEl) {
  return new Promise((resolve) => {
    if (!wordEl || wordEl.classList.contains("is-gone")) {
      resolve();
      return;
    }
    const style = wordEl.dataset.swipeStyle || "swipe-rise";
    wordEl.classList.add("is-swiping-out", style);

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      wordEl.classList.remove("is-swiping-out", style);
      wordEl.classList.add("is-gone");
      wordEl.removeEventListener("animationend", done);
      resolve();
    };
    wordEl.addEventListener("animationend", done);
    setTimeout(done, 900);
  });
}

/** EXIT_CONFIG에 따라 뜻 낭독 후 퇴장 */
async function exitWordAfterMeaning(wordEl) {
  const riseOut = EXIT_CONFIG?.riseOut === true;
  const swipeOut = EXIT_CONFIG?.swipeOut === true;
  if (!riseOut && !swipeOut) return;
  if (!wordEl) return;

  if (swipeOut) {
    const style = SWIPE_OUT_STYLES[swipeOutStyleCursor % SWIPE_OUT_STYLES.length];
    swipeOutStyleCursor += 1;
    wordEl.dataset.swipeStyle = style;
  } else {
    wordEl.dataset.swipeStyle = "swipe-rise";
  }
  await swipeWordOutUp(wordEl);
}

/** 마지막 — 동일 디자인으로 위에서 아래로 부드럽게 하나씩 재노출 */
function revealWordDown(wordEl) {
  return new Promise((resolve) => {
    if (!wordEl) {
      resolve();
      return;
    }
    wordEl.classList.remove("is-gone", "is-swiping-out");
    wordEl.classList.add("is-revealed", "is-finale-pending");
    void wordEl.offsetWidth;
    wordEl.classList.remove("is-finale-pending");
    wordEl.classList.add("is-revealing-down");

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      wordEl.classList.remove("is-revealing-down");
      wordEl.classList.add("is-finale-in");
      wordEl.removeEventListener("animationend", done);
      resolve();
    };
    wordEl.addEventListener("animationend", done);
    setTimeout(done, 900);
  });
}

/** 상단(뱃지·제목·출처·추출 어휘)은 유지, 단어 목록만 숨김 */
function hideWordsOnly() {
  const words = document.getElementById("words");
  if (!words) return;
  words.classList.remove("is-fading-out");
  words.classList.add("is-fully-hidden");
  words.style.visibility = "hidden";
  words.style.display = "none";
}

/** 단어 목록만 서서히 흐림 (페이지 넘김·summary 공통) */
async function fadeOutWordsList() {
  const words = document.getElementById("words");
  if (!words || words.classList.contains("is-fully-hidden")) return;
  words.classList.add("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
}

/** 흐려진 단어 목록을 summary와 같은 리듬으로 다시 밝힘 */
async function fadeInWordsList() {
  const words = document.getElementById("words");
  if (!words) return;
  words.classList.remove("is-fully-hidden");
  words.style.visibility = "";
  words.style.display = "";
  words.classList.add("is-fading-out");
  void words.offsetWidth;
  words.classList.remove("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
}

/** 마지막 단어 페이지 — summary처럼 서서히 흐려진 뒤 완전 숨김 */
async function fadeOutWordsOnly() {
  const words = document.getElementById("words");
  if (!words || words.classList.contains("is-fully-hidden")) return;
  await fadeOutWordsList();
  words.classList.add("is-fully-hidden");
  words.style.visibility = "hidden";
  words.style.display = "none";
  words.classList.remove("is-fading-out");
}

/**
 * n개 페이지 → 다음 페이지: summary 전환과 같이
 * 페이드아웃 → 페이지 교체 → 페이드인
 */
async function goToWordPage(
  wordEls,
  pageIndex,
  pageRanges,
  { first = false, skipFadeOut = false } = {}
) {
  if (!first && !skipFadeOut) {
    await fadeOutWordsList();
  }
  showWordPage(wordEls, pageIndex, pageRanges);
  if (first) {
    await sleep(PAGE_ENTER_FIRST_MS);
    return;
  }
  await fadeInWordsList();
}

/** quiz/summary 오버레이가 헤더 아래에서 시작하도록 top 동기화 */
function syncOverlayTop() {
  const stage = document.getElementById("stage");
  const content = document.querySelector(".content");
  const head = document.getElementById("content-head");
  if (!stage || !content || !head) return;
  const top = content.offsetTop + head.offsetTop + head.offsetHeight + 20;
  stage.style.setProperty("--overlay-top", `${Math.max(320, top)}px`);
}

function formatSummaryKo(ko) {
  return String(ko || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/* 슥슥 연타 느낌 — 짧고 빠르게 */
/* 기존 150ms 대비 +30% 느리게 */
const SUMMARY_EN_FLY_MS = 195;
const SUMMARY_EN_FILL_GAP_MS = 28;

function renderSummaryList(words) {
  const listEl = document.getElementById("summary-list");
  if (!listEl) return;
  const list = Array.isArray(words) ? words : [];
  listEl.innerHTML = list
    .map((word, index) => {
      const en = String(word?.en || "").trim();
      const ko = formatSummaryKo(word?.ko);
      const color = word?.color || WORD_COLORS[index % WORD_COLORS.length];
      const safeEn = escapeHtml(en);
      const safeKo = escapeHtml(ko);
      const compound = needsStackedMeaning(en);
      const enSlot =
        `<span class="en-slot" data-full-en="${safeEn}">` +
        `<span class="en-ghost" aria-hidden="true">${safeEn}</span>` +
        `<span class="en-fly" aria-hidden="true">${safeEn}</span>` +
        `</span>`;
      if (compound) {
        /* 합성어·긴 단어 — 한글 먼저(위), →·영어는 아래 */
        return (
          `<div class="summary-row is-compound" data-summary-index="${index}">` +
          `<span class="num" style="background:${color}">${index + 1}</span>` +
          `<span class="ko" data-full-ko="${safeKo}">${safeKo}</span>` +
          `<div class="summary-en-row">` +
          ARROW_SVG +
          enSlot +
          `</div>` +
          `</div>`
        );
      }
      return (
        `<div class="summary-row" data-summary-index="${index}">` +
        `<span class="num" style="background:${color}">${index + 1}</span>` +
        /* 번호. 한국어 → 영어 — 화살표·자리는 미리, 한글·영어는 한꺼번에 착지 */
        `<span class="ko" data-full-ko="${safeKo}">${safeKo}</span>` +
        ARROW_SVG +
        enSlot +
        `</div>`
      );
    })
    .join("");
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

/** summary — 한글 한꺼번에 착지 */
async function flyInSummaryKorean(rows) {
  const list = Array.from(rows || []);
  list.forEach((row) => row.classList.remove("is-ko-in"));
  void document.body.offsetWidth;
  list.forEach((row) => row.classList.add("is-ko-in"));
  await sleep(SUMMARY_EN_FLY_MS);
}

/** summary — 한 행 영어만 오른쪽→왼쪽 착지 */
async function flyInSummaryEnglishRow(row) {
  if (!row) return;
  row.classList.remove("is-en-in");
  void row.offsetWidth;
  row.classList.add("is-en-in");
  await sleep(SUMMARY_EN_FLY_MS);
}

/**
 * summary:
 *  1) 한글만 한꺼번에 보임 (영어 숨김)
 *  2) 행마다 한글 낭독 → 영어가 왼쪽에서 오른쪽으로 날아옴 → 영어 낭독
 */
async function runSummaryRecallFlow(words) {
  const rows = document.querySelectorAll("#summary-list .summary-row");
  if (!rows.length) return;
  const list = Array.isArray(words) ? words : [];

  rows.forEach((row) => {
    row.classList.remove("is-active", "is-en-in", "is-ko-in");
  });

  /* 최초 — 한글만 한꺼번에, 영어는 숨김 유지 */
  await flyInSummaryKorean(rows);
  await sleep(SUMMARY_EN_FILL_GAP_MS);

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const item = list[i] || {};
    const en = stripHtml(item.en);
    const ko = getKoSpeakText(item.ko || row.querySelector(".ko")?.dataset?.fullKo || "");

    row.classList.add("is-active");
    try {
      (row.querySelector(".ko") || row).scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (_) {}

    if (ko) await playKoTTS(ko);

    /* 한글 읽은 뒤 — 영어가 왼쪽→오른쪽으로 착지 */
    await flyInSummaryEnglishRow(row);
    if (en) await playEnTTS(en);

    row.classList.remove("is-active");
  }
}

/** 요약 — 이미지 숨김, 한글 먼저 → 읽은 뒤 영어(왼쪽→오른쪽) */
async function playSummaryScreen() {
  const root = document.getElementById("summary-root");
  const review = document.getElementById("review-root");
  const countdown = document.getElementById("summary-countdown");
  const titlePhoto = document.getElementById("title-photo");
  const words = getWordList();
  if (!root) return;

  hideWordsOnly();
  syncOverlayTop();
  /* display:none 대신 자리만 유지 — 제목이 위로 올라가지 않게 */
  if (titlePhoto) titlePhoto.classList.add("is-summary-hidden");
  if (review) review.hidden = true;
  if (countdown) countdown.hidden = true;
  root.classList.remove("is-fading-out", "is-ko-revealing", "is-all-revealed");
  renderSummaryList(words);
  root.hidden = false;
  void root.offsetWidth;
  await sleep(200);

  await runSummaryRecallFlow(words);
  root.classList.add("is-all-revealed");
}

/** summary 서서히 흐려진 뒤 숨김 */
async function fadeOutSummary() {
  const root = document.getElementById("summary-root");
  const titlePhoto = document.getElementById("title-photo");
  if (!root || root.hidden) return;
  root.classList.add("is-fading-out");
  await sleep(SUMMARY_FADE_OUT_MS);
  root.hidden = true;
  root.classList.remove("is-fading-out");
  if (titlePhoto) titlePhoto.classList.remove("is-summary-hidden");
}

function renderMeta() {
  const outro = document.getElementById("outro");
  if (!outro) return;
  const n = getWordList().length;
  outro.textContent = String(WORDS.outro || "").replace("{n}", String(n));
  outro.classList.remove("is-visible");
}

/** 마지막 — outro 가운데 노출 */
function showOutro() {
  const outro = document.getElementById("outro");
  if (!outro) return;
  const n = getWordList().length;
  outro.textContent = String(WORDS.outro || "").replace("{n}", String(n));
  outro.classList.remove("is-visible");
  void outro.offsetWidth;
  outro.classList.add("is-visible");
}

/** 오늘 날짜 — WORDS.date 가 비었을 때만 사용 */
function today() {
  const d = new Date();
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function renderDate() {
  const el = document.getElementById("dateLabel");
  if (!el) return;
  const manual = String(WORDS.date || "").trim();
  el.textContent = manual || today();
}

function fitStage() {
  const stage = document.getElementById("stage");
  const scale = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
  stage.style.transform = "scale(" + scale + ")";
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

/** 한글 뜻 — 남은 가로 폭에 맞게 font-size 축소 */
const MEANING_FONT_MAX = 58;
const MEANING_FONT_MIN = 28;
function fitMeaningFontSize(meaningEl, maxPx, minPx) {
  if (!meaningEl) return;
  const max = Number(maxPx) || MEANING_FONT_MAX;
  const min = Number(minPx) || MEANING_FONT_MIN;
  meaningEl.style.fontSize = `${max}px`;

  const row = meaningEl.parentElement;
  if (!row) return;
  const rowW = row.clientWidth;
  if (rowW <= 0) return;

  let used = 0;
  const children = [...row.children];
  children.forEach((child) => {
    if (child === meaningEl) return;
    used += child.getBoundingClientRect().width;
  });
  const style = getComputedStyle(row);
  const gap = parseFloat(style.columnGap || style.gap) || 0;
  const gapTotal = Math.max(0, children.length - 1) * gap;
  const avail = Math.floor(rowW - used - gapTotal);
  if (avail <= 0) return;

  meaningEl.style.maxWidth = `${avail}px`;

  let size = max;
  while (size > min && meaningEl.scrollWidth > avail + 1) {
    size -= 1;
    meaningEl.style.fontSize = `${size}px`;
  }
}

function fitVisibleMeaningFonts() {
  /* 학습 단어 뜻만 폭에 맞춤 — 요약 en/ko 는 CSS 고정 크기 유지 */
  document.querySelectorAll(".word:not(.is-page-hidden) .meaning").forEach((el) => {
    fitMeaningFontSize(el, MEANING_FONT_MAX, MEANING_FONT_MIN);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =====================================================================
   TTS 엔진 — 백엔드 generate-audio · TTS_CONFIG 기반
   ===================================================================== */
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[1];
let activeKoTtsVoiceId = KO_TTS_VOICE_IDS[1];
/** autoplay 시작 시 처음 잡힌 EN 음성 — quiz에서 동일하게 사용 */
let firstEnTtsVoiceId = EN_TTS_VOICE_IDS[1];
let enVoiceCycleMode = true;
let koVoiceCycleMode = true;
let enVoiceShuffleMode = false;
let koVoiceShuffleMode = false;
let enVoiceQueue = [];
let koVoiceQueue = [];
let enVoiceCursor = 0;
let koVoiceCursor = 0;

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;

/* ---------- 리듬 타이밍 (빈 대기만 짧게, TTS는 그대로) ---------- */
const AUTOPLAY_START_WAIT_MS = 1900;
const EN_TO_KO_GAP_MS = 250;
const WORD_GAP_MS = 200;
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const PAGE_ENTER_FIRST_MS = 200;
const PAGE_ENTER_MS = 350;
const PAGE_DONE_MS = 1500;
const PASS_GAP_MS = 400;
const SECTION_GAP_MS = 320;

/** TIMING_CONFIG.exampleHoldSec → ms (기본 = WORD_GAP_MS) */
function getExampleHoldMs() {
  const sec = Number(TIMING_CONFIG?.exampleHoldSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return WORD_GAP_MS;
}

/** summary 끝난 뒤 quiz 시작 전 대기 */
const SUMMARY_TO_QUIZ_MS = 1500;
/** summary → quiz 페이드아웃 */
const SUMMARY_FADE_OUT_MS = 1100;
/** 마지막 단어 → summary 페이드아웃 (summary와 동일 리듬) */
const WORDS_FADE_OUT_MS = 1100;

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getKoSpeakText(rawKo) {
  const text = stripHtml(rawKo);
  if (!text) return "";
  const beforeSlash = text.split("/")[0].trim();
  const firstExpr = beforeSlash.split(",")[0].trim();
  return firstExpr
    .replace(/~(?=로)/g, "무엇으")
    .replace(/~/g, "무엇");
}

function randomInt(maxExclusive) {
  const n = Number(maxExclusive) || 0;
  if (n <= 0) return 0;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

/** Fisher–Yates shuffle */
function shuffleList(list) {
  const arr = Array.isArray(list) ? list.slice() : [];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function isCyclingVoiceSetting(raw) {
  return (
    raw === "sequential" ||
    raw === "sequence" ||
    raw === "random" ||
    raw === "auto" ||
    raw == null ||
    raw === ""
  );
}

function isRandomVoiceSetting(raw) {
  return raw === "random" || raw === "auto";
}

function resolveVoiceIdFromSetting(raw, voiceMap, fallbackId) {
  if (typeof raw === "number" || /^\d+$/.test(String(raw).trim())) {
    const id = voiceMap[Number(raw)];
    if (id) return id;
  }
  const name = String(raw || "").trim();
  const known = Object.values(voiceMap);
  if (known.includes(name)) return name;
  if (/^(en|ko)-/i.test(name)) return name;
  return fallbackId;
}

/** 번호 키 오름차순(1,2,3…) 목록 */
function voiceIdsInNumberOrder(voiceMap) {
  return Object.keys(voiceMap)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b)
    .map((n) => voiceMap[n])
    .filter(Boolean);
}

function refillEnVoiceQueue() {
  const ordered = voiceIdsInNumberOrder(EN_TTS_VOICE_IDS);
  enVoiceQueue = enVoiceShuffleMode ? shuffleList(ordered) : ordered;
  enVoiceCursor = 0;
  console.info("[63voca] EN voice queue", enVoiceShuffleMode ? "(shuffled)" : "(1→N)", enVoiceQueue);
}

function refillKoVoiceQueue() {
  const ordered = voiceIdsInNumberOrder(KO_TTS_VOICE_IDS);
  koVoiceQueue = koVoiceShuffleMode ? shuffleList(ordered) : ordered;
  koVoiceCursor = 0;
  console.info("[63voca] KO voice queue", koVoiceShuffleMode ? "(shuffled)" : "(1→N)", koVoiceQueue);
}

/** sequential/random: 큐에서 다음 음성 / 고정: 항상 같은 음성 */
function nextEnVoice() {
  if (!enVoiceCycleMode) return activeEnTtsVoiceId;
  if (!enVoiceQueue.length || enVoiceCursor >= enVoiceQueue.length) refillEnVoiceQueue();
  activeEnTtsVoiceId = enVoiceQueue[enVoiceCursor];
  enVoiceCursor += 1;
  console.info("[63voca] EN voice →", activeEnTtsVoiceId);
  return activeEnTtsVoiceId;
}

function nextKoVoice() {
  if (!koVoiceCycleMode) return activeKoTtsVoiceId;
  if (!koVoiceQueue.length || koVoiceCursor >= koVoiceQueue.length) refillKoVoiceQueue();
  activeKoTtsVoiceId = koVoiceQueue[koVoiceCursor];
  koVoiceCursor += 1;
  console.info("[63voca] KO voice →", activeKoTtsVoiceId);
  return activeKoTtsVoiceId;
}

function resolveConfiguredEnVoice() {
  const raw = TTS_CONFIG?.enVoice;
  enVoiceCycleMode = isCyclingVoiceSetting(raw);
  enVoiceShuffleMode = isRandomVoiceSetting(raw);
  if (enVoiceCycleMode) {
    refillEnVoiceQueue();
    activeEnTtsVoiceId = enVoiceQueue[0] || EN_TTS_VOICE_IDS[1];
    firstEnTtsVoiceId = activeEnTtsVoiceId;
    console.info("[63voca] EN voice mode=", enVoiceShuffleMode ? "random" : "sequential", "· first=", activeEnTtsVoiceId);
    return activeEnTtsVoiceId;
  }
  enVoiceCycleMode = false;
  activeEnTtsVoiceId = resolveVoiceIdFromSetting(raw, EN_TTS_VOICE_IDS, EN_TTS_VOICE_IDS[1]);
  firstEnTtsVoiceId = activeEnTtsVoiceId;
  console.info("[63voca] EN voice (fixed)", activeEnTtsVoiceId);
  return activeEnTtsVoiceId;
}

function resolveConfiguredKoVoice() {
  const raw = TTS_CONFIG?.koVoice;
  koVoiceCycleMode = isCyclingVoiceSetting(raw);
  koVoiceShuffleMode = isRandomVoiceSetting(raw);
  if (koVoiceCycleMode) {
    refillKoVoiceQueue();
    activeKoTtsVoiceId = koVoiceQueue[0] || KO_TTS_VOICE_IDS[1];
    console.info("[63voca] KO voice mode=", koVoiceShuffleMode ? "random" : "sequential", "· first=", activeKoTtsVoiceId);
    return activeKoTtsVoiceId;
  }
  koVoiceCycleMode = false;
  activeKoTtsVoiceId = resolveVoiceIdFromSetting(raw, KO_TTS_VOICE_IDS, KO_TTS_VOICE_IDS[1]);
  console.info("[63voca] KO voice (fixed)", activeKoTtsVoiceId);
  return activeKoTtsVoiceId;
}

function resolveEnTtsVoiceId(langKey) {
  const values = Object.values(EN_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  const isEn = langKey === "en" || langKey === "en-US" || (typeof langKey === "string" && /^en-/i.test(langKey));
  if (!isEn) return langKey;
  return activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
}

function resolveKoTtsVoiceId(langKey) {
  const values = Object.values(KO_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  if (typeof langKey === "string" && /^ko-KR-/i.test(langKey)) return langKey;
  const isKo = langKey === "ko" || langKey === "ko-KR" || (typeof langKey === "string" && /^ko-/i.test(langKey));
  if (!isKo) return langKey;
  return activeKoTtsVoiceId || KO_TTS_VOICE_IDS[1];
}

function getTTSUrl(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  const langParam = isEn
    ? resolveEnTtsVoiceId(normalizedLang || "en-US")
    : resolveKoTtsVoiceId(normalizedLang || "ko-KR");
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

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
  if (ttsAudioCache.has(url)) return ttsAudioCache.get(url);

  const loadPromise = (async () => {
    let lastErr;
    for (let attempt = 0; attempt < TTS_MAX_RETRIES; attempt += 1) {
      try {
        return await fetchTTSAudio(url);
      } catch (err) {
        lastErr = err;
        if (isNonRetryableTTSError(err) || attempt >= TTS_MAX_RETRIES - 1) throw err;
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
  } catch (err) {
    console.warn("[63voca] TTS play failed", err);
  }
}

async function playEnTTS(text) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = nextEnVoice() || activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  await playBackendTTS(enText, voice, 1);
}

/** quiz 전용 — autoplay 첫 EN 음성과 동일 (큐 소비 없음) */
async function playEnTTSQuiz(text) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = firstEnTtsVoiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  console.info("[63voca] quiz EN voice (locked first)=", voice);
  await playBackendTTS(enText, voice, 1);
}

async function playKoTTS(rawKo) {
  const koText = getKoSpeakText(rawKo);
  if (!koText) return;
  const voice = nextKoVoice() || activeKoTtsVoiceId || resolveKoTtsVoiceId("ko-KR");
  await playBackendTTS(koText, voice, 1);
}

function preloadAutoplayAudio(words) {
  /* random이면 섞인 큐 순서대로 미리 받아 둠 (커서 소비 없음) */
  const enPool = enVoiceCycleMode && enVoiceQueue.length
    ? enVoiceQueue
    : [activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1]];
  const koPool = koVoiceCycleMode && koVoiceQueue.length
    ? koVoiceQueue
    : [activeKoTtsVoiceId || KO_TTS_VOICE_IDS[1]];

  (words || []).forEach((word, i) => {
    const en = stripHtml(word?.en);
    const ko = getKoSpeakText(word?.ko);
    const enVoice = enPool[i % enPool.length];
    const koVoice = koPool[i % koPool.length];
    if (en) {
      loadBackendTTSAudio(en, enVoice).catch(() => {});
      /* 2회차에서도 같은 en 텍스트를 다시 읽으므로 다음 음성도 워밍 */
      if (enPool.length > 1) {
        loadBackendTTSAudio(en, enPool[(i + words.length) % enPool.length]).catch(() => {});
      }
    }
    if (ko) {
      loadBackendTTSAudio(ko, koVoice).catch(() => {});
      if (koPool.length > 1) {
        loadBackendTTSAudio(ko, koPool[(i + words.length) % koPool.length]).catch(() => {});
      }
    }
  });
}

/** 1회차용: 영어 낭독 + 하이라이트 칠하기 */
async function paintAndSpeakEn(wordEl, en) {
  const enEl = wordEl.querySelector(".en");
  wordEl.classList.add("is-speaking");
  if (enEl) {
    enEl.classList.remove("is-hl-on", "is-hl-painting");
    void enEl.offsetWidth;
    enEl.classList.add("is-hl-painting");
  }
  await playEnTTS(en);
  if (enEl) {
    enEl.classList.remove("is-hl-painting");
    enEl.classList.add("is-hl-on");
  }
  wordEl.classList.remove("is-speaking");
}

/** 한글 뜻 공개 애니메이션 */
function revealMeaning(wordEl) {
  const meaningEl = wordEl.querySelector(".meaning");
  wordEl.classList.add("is-revealed");
  if (!meaningEl) return;
  meaningEl.classList.remove("is-meaning-swipe");
  void meaningEl.offsetWidth;
  meaningEl.classList.add("is-meaning-swipe");
}

/** 2회차용: 숨겼던 영어 + 발음기호(ipa/pron) 함께 노출 */
function revealEnWithIpa(wordEl) {
  /* revealing 먼저 건 뒤 hidden 제거 — 한 프레임 영어 깜빡임 방지 */
  wordEl.classList.add("is-en-revealing");
  void wordEl.offsetWidth;
  wordEl.classList.remove("is-en-hidden", "is-pron-hidden");
  const enEl = wordEl.querySelector(".en");
  if (enEl && !enEl.classList.contains("is-hl-on")) {
    enEl.classList.add("is-hl-on");
  }
}

/** 2회차 시작 전 — 한글 보임, 영어·발음 숨김 (화살표 → 유지) */
function prepareSecondPass(wordEls) {
  const stage = document.getElementById("stage");
  stage?.classList.remove("hide-meaning");
  wordEls.forEach((wordEl) => {
    wordEl.classList.remove(
      "is-gone",
      "is-swiping-out",
      "is-finale-pending",
      "is-revealing-down",
      "is-finale-in",
      "is-en-revealing"
    );
    wordEl.classList.add("is-revealed", "is-en-hidden", "is-pron-hidden", "is-finale-in");
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-painting");
    /* 하이라이트는 유지하되, 숨김 상태에서 보이지 않음 */
  });
}

/**
 * 페이지 영어 1회차 등장 — 랜덤 2모드
 *  - all: 페이지 단어 전부 한꺼번에 왼쪽→오른쪽
 *  - sequential: 단어별로 순차 왼쪽→오른쪽
 */
async function flyInPageEnglish(pageEls) {
  const list = Array.isArray(pageEls) ? pageEls : [];
  if (!list.length) return;

  list.forEach((wordEl) => wordEl.classList.remove("is-en-in"));
  void document.body.offsetWidth;

  const mode = Math.random() < 0.5 ? "all" : "sequential";
  if (mode === "all") {
    list.forEach((wordEl) => wordEl.classList.add("is-en-in"));
    await sleep(SUMMARY_EN_FLY_MS);
    return;
  }

  for (const wordEl of list) {
    wordEl.classList.remove("is-en-in");
    void wordEl.offsetWidth;
    wordEl.classList.add("is-en-in");
    await sleep(SUMMARY_EN_FLY_MS);
  }
}

/** 페이지(최대 5개) 1회차: 영어 L→R 등장(랜덤 전체/순차) → 영어 낭독 → 한글 */
async function runPass1OnPage(pageEls, pageItems, startIndex = 0) {
  const stage = document.getElementById("stage");
  stage?.classList.add("hide-meaning");
  pageEls.forEach((wordEl) => {
    wordEl.classList.remove(
      "is-revealed",
      "is-en-hidden",
      "is-pron-hidden",
      "is-en-revealing",
      "is-en-in"
    );
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-on", "is-hl-painting");
  });

  /* 영어 먼저 왼쪽→오른쪽 (전체 동시 or 단어별 순차, 랜덤) */
  await flyInPageEnglish(pageEls);

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    /* titlePhoto가 비어 있을 때만 단어별 image로 교체 */
    if (!String(WORDS.titlePhoto || "").trim() && item.image) {
      setTitlePhoto(item.image);
    }

    await paintAndSpeakEn(wordEl, en);
    await sleep(EN_TO_KO_GAP_MS);

    /* 한글 노출과 동시에 낭독 */
    revealMeaning(wordEl);
    if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
    await playKoTTS(ko);
    await exitWordAfterMeaning(wordEl);
    /* example 읽기 시간 — TIMING_CONFIG.exampleHoldSec */
    await sleep(getExampleHoldMs());
  }
}

/** 페이지(최대 5개) 2회차: 영어는 이미 숨긴 상태 → 한글 → 영어(+발음) */
async function runPass2OnPage(pageEls, pageItems, startIndex = 0) {
  /* EN 숨김은 페이지 표시 전에 prepareSecondPass(전체)로 처리됨 */
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    await playKoTTS(ko);
    await sleep(EN_TO_KO_GAP_MS);

    /* 영어·발음·예문 노출과 동시에 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(en);
    wordEl.classList.remove("is-speaking");
    /* example 읽기 시간 — TIMING_CONFIG.exampleHoldSec */
    await sleep(getExampleHoldMs());
  }
}

async function runAutoplay() {
  const btn = document.getElementById("autoplay");
  if (btn) {
    btn.hidden = true;
    btn.remove();
  }

  const stage = document.getElementById("stage");
  stage.classList.add("hide-meaning");

  resolveConfiguredEnVoice();
  resolveConfiguredKoVoice();
  preloadAutoplayAudio(getWordList());

  await sleep(AUTOPLAY_START_WAIT_MS);

  const wordEls = Array.from(stage.querySelectorAll(".word"));
  const items = getWordList();
  const pageRanges = buildPageRanges(wordEls.length);
  const pageCount = pageRanges.length;

  const doPass1 = PASS_CONFIG?.pass1 !== false;
  const doPass2 = PASS_CONFIG?.pass2 !== false;

  /* path1: 한글 숨김 → EN → KO */
  if (doPass1) {
    for (let page = 0; page < pageCount; page += 1) {
      const { start, end } = pageRanges[page];
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      await goToWordPage(wordEls, page, pageRanges, { first: page === 0 });
      await runPass1OnPage(pageEls, pageItems, start);
      /* 다음 페이지/패스로 갈 때 goToWordPage·fadeOutWordsOnly가 페이드 처리 */
    }
  }

  /* path2: 영어 숨김 → KO → EN(+발음·예문) */
  if (doPass2) {
    if (doPass1) {
      /* 1회차 끝 — 이미 페이드아웃 후 2회차 1페이지로 교체 */
      await fadeOutWordsList();
      prepareSecondPass(wordEls);
    } else {
      prepareSecondPass(wordEls);
      await sleep(SECTION_GAP_MS);
    }

    for (let page = 0; page < pageCount; page += 1) {
      const { start, end } = pageRanges[page];
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      prepareSecondPass(pageEls);
      await goToWordPage(wordEls, page, pageRanges, {
        first: page === 0 && !doPass1,
        skipFadeOut: page === 0 && doPass1,
      });
      await runPass2OnPage(pageEls, pageItems, start);
    }
  }

  /* summary 직전 — 마지막 이미지·대기 잔상 없이 바로 숨김 */
  document.getElementById("title-photo")?.classList.add("is-summary-hidden");
  await fadeOutWordsOnly();
  syncOverlayTop();

  await playSummaryScreen();

  /* quiz가 있을 때만 summary 페이드 후 quiz / 없으면 summary 유지 */
  const quizzes = getQuizList();
  if (quizzes.length > 0) {
    await sleep(SUMMARY_TO_QUIZ_MS);
    await fadeOutSummary();
    await startReviewQuiz();
  }
}

const QUIZ_COUNTDOWN_SEC = 3;
const QUIZ_ANSWER_HOLD_MS = 900;
/** 카운터 틱 소리 — false면 완전 무음 */
const COUNTDOWN_TICK_ENABLED = false;
const COUNTDOWN_TICK_SRC = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;

let countdownTickAudio = null;

function getQuizList() {
  return Array.isArray(WORDS.quiz)
    ? WORDS.quiz.filter((q) => q && q.en && q.answer)
    : [];
}

function getReviewCountdownEls() {
  const wrap = document.getElementById("countdown-wrap");
  return {
    wrap,
    num: document.getElementById("countdown-num"),
    ring: document.getElementById("countdown-ring-progress"),
  };
}

function setCountdownRing(sec, total) {
  const { ring } = getReviewCountdownEls();
  if (!ring) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  ring.style.strokeDashoffset = String(Math.min(100, Math.max(0, spent)));
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

function startCountdownTickSound(src) {
  if (!COUNTDOWN_TICK_ENABLED) {
    stopCountdownTickSound();
    return;
  }
  stopCountdownTickSound();
  const tickSrc = String(src || "").trim() || COUNTDOWN_TICK_SRC;
  try {
    countdownTickAudio = new Audio(tickSrc);
    countdownTickAudio.loop = true;
    countdownTickAudio.volume = COUNTDOWN_TICK_VOLUME;
    countdownTickAudio.preload = "auto";
    const playPromise = countdownTickAudio.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  } catch (_) {}
}

function hideCountdownUi() {
  const { wrap, num, ring } = getReviewCountdownEls();
  stopCountdownTickSound();
  if (num) {
    num.textContent = "";
    num.classList.remove("is-anim");
  }
  if (ring) {
    ring.style.transition = "none";
    ring.style.strokeDashoffset = "100";
  }
  /* wrap만 숨김 — 슬롯 높이는 유지해서 예문이 위로 안 올라옴 */
  if (wrap) {
    wrap.hidden = true;
    wrap.style.display = "none";
    wrap.setAttribute("hidden", "");
  }
}

function showCountdownUi() {
  const { wrap, ring } = getReviewCountdownEls();
  if (ring) ring.style.transition = "";
  if (wrap) {
    wrap.style.display = "";
    wrap.removeAttribute("hidden");
    wrap.hidden = false;
  }
}

async function runCountdown(seconds, onTick = null) {
  const { wrap, num } = getReviewCountdownEls();
  if (!wrap || !num) return;
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  showCountdownUi();
  /* 카운트 틱 소리 없음 — 숫자·링만 */
  stopCountdownTickSound();
  setCountdownRing(total, total);

  try {
    /* 3 → 2 → 1 → 0 각 1초씩 전부 센 뒤 사라짐 */
    for (let sec = total; sec >= 0; sec -= 1) {
      num.textContent = String(sec);
      setCountdownRing(sec, total);
      bumpCountdownAnim();
      if (typeof onTick === "function") {
        try {
          onTick(sec, total);
        } catch (_) {}
      }
      await sleep(1000);
    }
  } finally {
    hideCountdownUi();
  }
}

function escapeQuizHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 앞글자(pro) 고정 + 나머지 슬롯 폭 예약 → 문장 레이아웃 흔들림 방지 */
function buildQuizBlankHtml(answer, restRevealed, { revealRest = false } = {}) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);
  const n = revealRest
    ? rest.length
    : Math.max(0, Math.min(rest.length, Number(restRevealed) || 0));
  const shown = rest.slice(0, n);
  const hidden = rest.slice(n);
  const layerInner = revealRest
    ? `<span class="rv-blank-rest is-revealing">${escapeQuizHtml(rest)}</span>`
    : (shown ? `<span class="rv-blank-rest">${escapeQuizHtml(shown)}</span>` : "") +
      (hidden ? `<span class="rv-blank-marks">${"_".repeat(hidden.length)}</span>` : "");
  return (
    `<span class="rv-blank${revealRest ? " rv-blank-final" : ""}">` +
    `<span class="rv-blank-prefix">${escapeQuizHtml(prefix)}</span>` +
    `<span class="rv-blank-rest-slot">` +
    `<span class="rv-blank-rest-ghost" aria-hidden="true">${escapeQuizHtml(rest || "\u00a0")}</span>` +
    `<span class="rv-blank-rest-layer">${layerInner}</span>` +
    `</span>` +
    `</span>`
  );
}

/** dou_ / ham_____ 등 — 밑줄(_)이 1개 이상 있으면 blank 토큰 */
const QUIZ_BLANK_TOKEN_RE = /[A-Za-z]{1,3}_{1,}/g;
const QUIZ_BLANK_ONLY_RE = /_{1,}/g;

function replaceQuizBlankToken(text, replacement) {
  const src = String(text || "");
  const replaced = src.replace(QUIZ_BLANK_TOKEN_RE, replacement);
  return replaced !== src ? replaced : src.replace(QUIZ_BLANK_ONLY_RE, replacement);
}

function formatQuizEnHtml(en, answer, restRevealed) {
  const blankHtml = buildQuizBlankHtml(answer, restRevealed);
  let html = allowBreakTags(escapeQuizHtml(String(en || "")));
  if (!blankHtml) return html;
  return replaceQuizBlankToken(html, blankHtml);
}

function formatQuizKoHtml(ko) {
  return allowBreakTags(escapeQuizHtml(String(ko || "").trim())).replace(
    /\(([^)]+)\)/g,
    '(<span class="rv-ko-hl">$1</span>)'
  );
}

function buildQuizSpeakText(en) {
  return replaceQuizBlankToken(
    String(en || "").replace(/<br\s*\/?>/gi, " "),
    "blank"
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** 빈칸에 정답을 넣은 전체 문장 (TTS용) */
function buildQuizFullSentenceSpeak(en, answer) {
  const ans = String(answer || "").trim();
  let text = String(en || "").replace(/<br\s*\/?>/gi, " ");
  if (ans) text = replaceQuizBlankToken(text, ans);
  return text.replace(/\s+/g, " ").trim();
}

/** 마지막 — 앞글자 유지, 남은 글자(____)만 자연스럽게 노출 */
function formatQuizEnFinalHtml(en, answer) {
  const answerHtml = buildQuizBlankHtml(answer, 0, { revealRest: true });
  let html = allowBreakTags(escapeQuizHtml(String(en || "")));
  if (!answerHtml) return html;
  return replaceQuizBlankToken(html, answerHtml);
}

/** upgrades6 startReviewQuiz — 상단 헤더(출처·추출 어휘) 고정 */
async function startReviewQuiz() {
  const quizzes = getQuizList();
  if (!quizzes.length) return;

  const root = document.getElementById("review-root");
  const summary = document.getElementById("summary-root");
  const titleEl = document.getElementById("rv-title");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  if (!root || !enEl || !koEl) return;

  hideWordsOnly();
  syncOverlayTop();
  if (summary && !summary.hidden) {
    summary.hidden = true;
    summary.classList.remove("is-fading-out");
  }
  document.getElementById("title-photo")?.classList.remove("is-summary-hidden");
  root.hidden = false;

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    const ans = String(q.answer || "").trim();

    if (titleEl) titleEl.textContent = `Review ${i + 1}/${quizzes.length}`;
    if (koEl) koEl.innerHTML = formatQuizKoHtml(q.ko);
    /* 카운트 동안 빈칸 유지 */
    enEl.innerHTML = formatQuizEnHtml(q.en, ans, 0);

    const speakText = buildQuizSpeakText(q.en);
    if (speakText) await playEnTTSQuiz(speakText);
    await sleep(280); /* -20% from 350 */

    /* 3→2→1→0 전부 센 뒤 1초 대기 → 정답 노출 */
    await runCountdown(QUIZ_COUNTDOWN_SEC);
    await sleep(1000);

    enEl.innerHTML = formatQuizEnFinalHtml(q.en, ans);
    const fullSpeak = buildQuizFullSentenceSpeak(q.en, ans);
    if (fullSpeak) await playEnTTSQuiz(fullSpeak);
    await sleep(QUIZ_ANSWER_HOLD_MS);
  }

  hideCountdownUi();
  /* 마지막 정답 문장 노출 상태로 quiz 화면 유지 */
  root.hidden = false;
}

function setupAutoplay() {
  const btn = document.getElementById("autoplay");
  if (!btn) return;
  btn.addEventListener(
    "click",
    () => {
      runAutoplay().catch((err) => console.warn("autoplay error", err));
    },
    { once: true }
  );
}

renderHead();
renderTitle();
renderWords();
renderMeta();
renderDate();
setupAutoplay();
fitStage();
syncOverlayTop();
requestAnimationFrame(() => {
  fitVisibleMeaningFonts();
  cachedTitlePhotoTranslateY = null;
  alignTitleBelowBadge();
  alignTitlePhotoAboveFirstMeaning(true);
});
window.addEventListener("resize", () => {
  fitStage();
  syncOverlayTop();
  cachedTitlePhotoTranslateY = null;
  alignTitleBelowBadge();
  alignTitlePhotoAboveFirstMeaning(true);
});
