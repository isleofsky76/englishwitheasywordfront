const PAGE_TITLE_MAIN = "신문기사에서 배우는 어휘";
/** 제목(부제) — `[단어]`는 주황 강조 (대괄호는 화면에서 제거) */
const PAGE_TITLE_SUB =
  "[새로운 미국-캐나다 관세의 영향을 받는 품목은 무엇일까요?]";
const PAGE_TITLE_META = "(The Wall Street Journal | 2026/08/22)";

/**
 * Review 카운트다운 설정 — 쓰는 줄만 남기고 나머지는 // 처리
 */
const COUNTDOWN_SEC = 3;
const COUNTDOWN_STYLE = "ring";
// const COUNTDOWN_STYLE = "pop";
// const COUNTDOWN_STYLE = "bars";
// const COUNTDOWN_TICK_SRC = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const COUNTDOWN_TICK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
// const COUNTDOWN_TICK_SRC = "resources/mixkit-classic-melodic-clock-strike-1058.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;
/** 손글씨 속도 (ms). 값 키울수록 느려짐 */
const HAND_WRITE_MS_PER_LETTER = 143;
const HAND_WRITE_MS_MIN = 857;
const HAND_WRITE_MS_MAX = 2857;
/** cf 노출 후 핵심단어 mark 손그리기 시작까지 */
const CF_MARK_DELAY_MS = 300;
const CF_MARK_MS_PER_LETTER = 110;
const CF_MARK_MS_MIN = 800;
const CF_MARK_MS_MAX = 2200;

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

/** 라틴/한글 혼용 제목의 시각 폭 추정 (칸 위·아래 균등 분할용) */
function estimateTitleCharWidth(ch) {
  if (!ch || /\s/.test(ch)) return 0.35;
  if (/[A-Za-z0-9]/.test(ch)) return 0.62;
  if (/[()[\]{}.,'":;!?/\\-]/.test(ch)) return 0.4;
  return 1;
}

/** 제목 부제를 위·아래 시각 폭이 균등하도록 항상 2줄로 나눔 */
function splitTitleSubIntoTwoLines(raw) {
  const text = String(raw || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return ["", ""];

  const chars = Array.from(text);
  const n = chars.length;
  if (n <= 2) return [text, ""];

  const widths = chars.map(estimateTitleCharWidth);
  const totalW = widths.reduce((a, b) => a + b, 0);
  const prefixW = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i += 1) prefixW[i + 1] = prefixW[i] + widths[i];

  // 괄호 깊이: break 위치 i 직전까지의 열린 괄호 수
  const depthBefore = new Array(n + 1).fill(0);
  let depth = 0;
  for (let i = 0; i < n; i += 1) {
    depthBefore[i] = depth;
    const ch = chars[i];
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
  }
  depthBefore[n] = depth;

  const lo = Math.max(1, Math.floor(n * 0.28));
  const hi = Math.min(n - 1, Math.ceil(n * 0.72));

  const softBreaks = [];
  for (let i = lo; i <= hi; i += 1) {
    const prev = chars[i - 1] || "";
    const curr = chars[i] || "";
    const afterSpace = /\s/.test(prev);
    const afterPunct = /[,?!.，。？！、…'")\]]/.test(prev);
    const beforeSpace = /\s/.test(curr);
    if (!(afterSpace || afterPunct || beforeSpace)) continue;
    let idx = beforeSpace && !afterSpace ? i + 1 : i;
    if (idx < 1 || idx >= n) idx = i;
    // 열린 괄호 안에서는 줄바꿈 후보 제외
    if (depthBefore[idx] > 0) continue;
    softBreaks.push(idx);
  }

  const pickBest = (indices) => {
    let bestIdx = Math.floor(n / 2);
    let bestScore = Infinity;
    for (const i of indices) {
      const score = Math.abs(prefixW[i] - (totalW - prefixW[i]));
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  const bestIdx = softBreaks.length
    ? pickBest(softBreaks)
    : pickBest(Array.from({ length: hi - lo + 1 }, (_, k) => lo + k));

  const line1 = chars.slice(0, bestIdx).join("").replace(/\s+/g, " ").trim();
  const line2 = chars.slice(bestIdx).join("").replace(/\s+/g, " ").trim();
  if (!line2) {
    const mid = Math.floor(n / 2);
    return [
      chars.slice(0, mid).join("").trim(),
      chars.slice(mid).join("").trim()
    ];
  }
  return [line1, line2];
}

function buildPageTitleHtml() {
  const [line1, line2] = splitTitleSubIntoTwoLines(PAGE_TITLE_SUB);
  const marked1 = formatTitleLineMarks(line1);
  const marked2 = formatTitleLineMarks(line2);
  const subHtml = line2
    ? `<span class="title-line">${marked1}</span><span class="title-line">${marked2}</span>`
    : `<span class="title-line">${marked1}</span>`;
  return `<span class="title-main">${PAGE_TITLE_MAIN}</span>
<span class="title-sub-box" aria-hidden="false">
  <span class="title-accent title-sub">${subHtml}</span>
</span><span class="title-meta">${PAGE_TITLE_META}</span>
<span class="progress-wrap" aria-live="polite">
  <span class="progress-label" id="progress-label">진행도 0 / 5</span>
  <span class="progress-track">
    <span class="progress-fill" id="progress-fill">
      <span class="progress-runner" id="progress-runner" data-motion="scooter" aria-hidden="true">🛵</span>
      <span class="progress-pct" id="progress-pct">0%</span>
    </span>
  </span>
</span>`;
}

/** 보이지 않는 2줄 상자에 맞춰 title-sub 글자 크기 자동 조절 */
function fitTitleSubToBox() {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  if (!box || !sub) return;

  const lines = Array.from(sub.querySelectorAll(".title-line"));
  if (!lines.length) return;

  const maxPx = Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-max-size")) || 34;
  const minPx = Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-min-size")) || 15;
  let lo = minPx;
  let hi = maxPx;
  let best = minPx;

  const fits = (size) => {
    sub.style.fontSize = `${size}px`;
    // 레이아웃 반영 후 측정
    void sub.offsetWidth;
    const boxW = box.clientWidth;
    const boxH = box.clientHeight;
    if (sub.scrollHeight > boxH + 1) return false;
    return lines.every((line) => line.scrollWidth <= boxW + 1);
  };

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (fits(mid)) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  sub.style.fontSize = `${best}px`;
}

function applyPageTitle() {
  if (!pageTitleEl) return;
  pageTitleEl.innerHTML = buildPageTitleHtml();
  requestAnimationFrame(() => {
    fitTitleSubToBox();
    requestAnimationFrame(fitTitleSubToBox);
  });
}

const VISIBLE_COUNT = 2
const EN_KO_PASS_COUNT = 1;
// ============================================================
// BGM (json1 바로 위 — 여기서 수동 조정)
//   BGM_ENABLED: false=음악 끔 / true=켬
//   BGM_START_SEC: 초 단위.  80=1:20  90=1:30  100=1:40  110=1:50
//   null 이면 예문 수 자동 (6개→1:20, 1개 늘면 -10초 / 줄면 +10초)
// ============================================================
const BGM_ENABLED = true; // ← false=끔 / true=켬
const BGM_START_SEC = 93; // ← 현재 시작: 1:52 (112초)
const BGM_AUTO_BASE_WORDS = 6;
const BGM_AUTO_BASE_SEC = 75 ; // 1:20 @ 6단어
const BGM_AUTO_SEC_PER_WORD = 10;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** 화면 스타일 변형 — 재생할 때마다 랜덤
 *  STYLE_VARIANT_ID: "" | "random" = 랜덤
 *  고정하려면: 0 = 기본 (KO 흰색, EN 앞글자 유지 + 노란 하이라이트)
 *              2 = EN 앞글자 유지 + 남은 _만 손글씨, 노란 하이라이트 없음
 *  KO는 항상 흰색 (골드 변형 없음)
 *  손글씨는 항상 미리보기 앞글자 다음의 _ 구간만 씀 (처음부터 다시 쓰지 않음)
 */
const STYLE_VARIANT_ID = "random";
const STYLE_VARIANTS = [0, 2];
let activeStyleVariant = 0;
/** 영어 TTS 재생 속도 (1=기본) */
const EN_TTS_RATE = 1;
/** 진행 바 테마 — 재생할 때마다 목록에서 랜덤
 *  PROGRESS_BAR_THEME_ID: "" | "random" = 랜덤
 *  고정하려면: "barA" | "bike" | "scooter" | "car" | "train" | "walk&run"
 *  (구버전 별칭: "barB" = "bike")
 */
const PROGRESS_BAR_THEME_ID = "random";
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
    id: "bike",
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
    id: "walk&run",
    stages: [
      ["🚶🏻‍♂️", "walk"],
      ["🚶🏻‍♂️", "walk"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"],
      ["🏃🏻‍♂️", "run"]
    ]
  }
];
let activeProgressBarTheme = resolveProgressBarTheme();

///영어만 읽는 버젼.
// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
// EN 단어 발음 반복 (단어마다 지정):
//   "enRepeat": 2              → 정상 속도로 2번 (배너: ×2 → ×1 → 숨김)
//   "enRepeat": 5              → 5번 (배너: ×5 → … → ×1 → 숨김)
//   "enSpeakRates": [1, 0.85]  → 1번 + 느리게 1번 (배열 길이 = 횟수)
///stretched: ‘늘어난’, ‘당겨진’ (동사 stretch의 과거분사형)thin: ‘얇은’, ‘가느다란’


const json1 = 

[
  
  { "title1": "" },
 
  {
    "en": "nickname",
    "ko": "별명을 붙이다",
    "hint": "",
    "pronunciation": "닉네임",
    "ipa": "/ˈnɪkneɪm/",
    "pos": "동",
    "stars": 4,
    "enRepeat": 2,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "유타에서 자랄 때 나는 너무 활동적이어서 부모님이 나에게 'The Blur'라는 별명을 붙였다(nicknamed me “The Blur”).",
    "image": ""
  },
  {
    "en": "haul",
    "ko": "(아주 힘들여) 끌다",
    "hint": "",
    "pronunciation": "홀",
    "ipa": "/hɔːl/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "15살이 되었을 무렵 나는 절벽을 힘겹게 기어올라가고 있었다(hauling myself up cliff faces).",
    "image": ""
  },
  {
    "en": "boulder",
    "ko": " (물이나 비바람에 씻겨 반들반들해진) 바위",
    "hint": "",
    "pronunciation": "볼더",
    "ipa": "/ˈboʊldər/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "친구 트레버와 나는 물가를 내려다보는 바위 하나(rocky boulder)에 올라가 물속으로 뛰어들기로 했다(decided to jump in).",
    "image": ""
  },
  {
    "en": "count on",
    "ko": "예상하다·기대하다",
    "hint": "",
    "pronunciation": "카운트 온",
    "ipa": "/kaʊnt ɑːn/",
    "pos": "구",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "우리가 예상하지 못했던 것(hadn’t counted on)은 바위를 미끄럽게 만든 이끼층(a layer of moss)이었다.",
    "image": ""
  },
 
  
  {
    "en": "plummet",
    "ko": "곤두박질치다·급락하다",
    "hint": "",
    "pronunciation": "플러밋",
    "ipa": "/ˈplʌmɪt/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "바깥쪽으로 뛰어오르는 대신(Instead of leaping outwards) 몸이 옆으로 틀어지면서(twisted sideways) 그대로 아래로 추락하기 시작했다(started plummeting straight down).",
    "image": ""
  },
  {
    "en": "slam",
    "ko": "세게 부딪치다·내리치다",
    "hint": "",
    "pronunciation": "슬램",
    "ipa": "/slæm/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "바위에 너무 세게 부딪혀(slamming so hard into the rock)",
    "image": ""
  },
  {
    "en": "pelvis",
    "ko": "골반",
    "hint": "",
    "pronunciation": "펠비스",
    "ipa": "/ˈpelvɪs/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "골반(pelvis)이 부러졌다는 것은 분명했다(It was clear).",
    "image": ""
  },
  {
    "en": "gurney",
    "ko": "환자 운반용 들것·이동식 들것",
    "hint": "",
    "pronunciation": "거니",
    "ipa": "/ˈɡɜːrni/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "구급대원들이 나를 들것에 고정하는 동안(strapped me to a gurney) 뼈들이 서로 갈리는(grinding together) 느낌이 들었다.",
    "image": ""
  },
  {
    "en": "intact",
    "ko": "온전한·손상되지 않은",
    "hint": "",
    "pronunciation": "인택트",
    "ipa": "/ɪnˈtækt/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "병원에서 엑스레이를 찍은 결과 척추는 온전했지만(was intact) 골반은 산산조각 나 있었다.",
    "image": ""
  },
  
  {
    "en": "stickler",
    "ko": ".(~에) 까다로운[엄격한] 사람",
    "hint": "",
    "pronunciation": "스티클러",
    "ipa": "/ˈstɪklər/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "자신감을 되찾는 데 몇 년이 걸렸지만, 그 추락 사고는 나를 더 나은 등반가이자 안전을 철저히 지키는 사람(stickler for safety)으로 만들었다.",
    "image": ""
  },
  {
    "en": "fulfilling",
    "ko": "보람 있는·만족감을 주는",
    "hint": "",
    "pronunciation": "풀필링",
    "ipa": "/fʊlˈfɪlɪŋ/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 3,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "그 사고는 결국 나를 지금의 보람 있는 삶(fulfilling life)으로 이끌었다.",
    "image": ""
  }
 
];


// const REVIEW_QUIZ = [


//   {
//     en: "Gross U.S. debt has surp____ $40 trillion, a new milestone in the country’s struggle to control its finances.",
//     ko: "미국의 총부채는 40조 달러를 (넘어섰습니다).",
//     answer: "surpassed",
//     answerKo: "넘어섰다"
//   },

  
//   ];

  
const REVIEW_FADE_MS = 520;
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
const COUNTDOWN_MODES = ["pop", "ring", "bars"];
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
const PAGE_BG_COLOR = "#183538";
const PAGE_BG_IMAGE = "resources/news.jpg";
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.02;
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
/** 영어 TTS — 01black2voice 카탈로그 + layout4 Chirp3-HD + gmgreen 밤·허스키 US 남성
 *  EN_TTS_VOICE: "random" = autoplay 시작 시 풀에서 랜덤 · 1~N = EN_TTS_VOICE_IDS 고정
 */
const EN_TTS_VOICE = "random";
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Despina",
  2: "en-US-Chirp3-HD-Gacrux",
  3: "en-US-Chirp3-HD-Pulcherrima",
  4: "en-US-Chirp3-HD-Vindemiatrix",
  5: "en-US-Chirp3-HD-Sulafat",
  6: "en-US-Chirp3-HD-Algenib", // 차분 저음 (gmgreen)
  7: "en-US-Chirp3-HD-Enceladus", // 바리톤 · 심야 FM (gmgreen)
  8: "en-US-Chirp3-HD-Fenrir", // 낮고 허스키 (gmgreen)
  9: "en-US-Chirp3-HD-Umbriel", // 깊고 잔잔 (gmgreen)
  10: "en-US-Chirp3-HD-Charon", // 따뜻한 대화형 (gmgreen)
  11: "en-US-Chirp3-HD-Orus", // 성숙·안정 (gmgreen)
  12: "en-US-Chirp-HD-D",
  13: "en-US-Chirp-HD-F",
  14: "en-US-News-N",
  15: "en-US-Wavenet-C",
  16: "en-GB-Chirp-HD-D",
  17: "en-GB-News-M",
  18: "en-GB-News-H",
  19: "en-GB-Neural2-B",
  20: "en-GB-Chirp3-HD-Zubenelgenubi",
  21: "en-GB-News-I",
  22: "en-GB-Wavenet-N",
  23: "en-AU-News-G"
};
let activeEnTtsVoiceId =
  EN_TTS_VOICE === "random" ? null : EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
/** 단어(globalIndex 등)별 영어 TTS 음성 — random 모드에서 preload·재생 일치 */
const enTtsVoiceByWordKey = new Map();

function clearEnTtsVoiceAssignments() {
  enTtsVoiceByWordKey.clear();
  activeEnTtsVoiceId =
    EN_TTS_VOICE === "random" ? null : EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
}

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = voices[Math.floor(Math.random() * voices.length)];
  return activeEnTtsVoiceId;
}

/** wordKey: json1 globalIndex(숫자) 또는 review 등 문자열 키 */
function assignEnTtsVoiceForWord(wordKey) {
  if (String(EN_TTS_VOICE) !== "random") {
    activeEnTtsVoiceId = EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
    return activeEnTtsVoiceId;
  }
  if (enTtsVoiceByWordKey.has(wordKey)) {
    activeEnTtsVoiceId = enTtsVoiceByWordKey.get(wordKey);
    return activeEnTtsVoiceId;
  }
  const voice = pickRandomEnTtsVoice();
  enTtsVoiceByWordKey.set(wordKey, voice);
  return voice;
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
  "lose out": ["losing out", "loosing out"],
};

/** 단음절 CVC·VC 등 — 어미 자음 중복 (up→upping, run→running) */
function shouldDoubleFinalConsonant(lower) {
  const w = String(lower || "");
  if (!w || /e$/.test(w)) return false;
  if (!/[aeiou][^aeiouwxy]$/.test(w)) return false;
  if (/[aeiou]{2}[^aeiouwxy]$/.test(w)) return false;
  if (w.length === 2) return /^[aeiou][^aeiouwxy]$/.test(w);
  return /[^aeiou][aeiou][^aeiouwxy]$/.test(w);
}

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
  const double = shouldDoubleFinalConsonant(lower);

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
  } else if (double) {
    forms.add(`${w}${w.slice(-1)}ing`);
  } else {
    forms.add(`${w}ing`);
  }

  (IRREGULAR_VERB_FORMS[lower] || []).forEach((form) => forms.add(form));

  if (/e$/.test(lower)) {
    forms.add(`${w}d`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ied`);
  } else if (double) {
    forms.add(`${w}${w.slice(-1)}ed`);
  } else {
    forms.add(`${w}ed`);
  }

  return [...forms];
}

/** en 표제어(활용형) — 세션당 mark1/10/12 중 하나만 사용 */
const CF_KEY_MARK_TYPES = ["mark1", "mark10", "mark12"];
let activeCfMarkType = null;
let prevCfMarkType = null;

function mapCfTextOutsideTags(text, mapper) {
  const parts = String(text || "").split(/(<(?:u|mark\d+)>[\s\S]*?<\/(?:u|mark\d+)>)/gi);
  return parts
    .map((part) => (/^<(u|mark\d+)>/i.test(part) ? part : mapper(part)))
    .join("");
}

function pickSessionCfMarkType() {
  const pool = prevCfMarkType
    ? CF_KEY_MARK_TYPES.filter((m) => m !== prevCfMarkType)
    : CF_KEY_MARK_TYPES;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** 한 번의 코드 진행(세션)에 쓸 cf 마킹 타입 지정. forceNew=true면 이전 세션과 다른 타입 */
function assignSessionCfMarkType(forceNew = false) {
  if (!forceNew && activeCfMarkType) return activeCfMarkType;
  if (forceNew && activeCfMarkType) prevCfMarkType = activeCfMarkType;
  activeCfMarkType = pickSessionCfMarkType();
  return activeCfMarkType;
}

/** en에 해당하는 cf 단어 1곳에만 세션 마킹 1개. cf에 en 없으면 그대로 반환 */
function applyCfWordMarks(cfText, targetWord) {
  const text = String(cfText || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  // 다단어 구(off course 등)는 활용형 확장 없이 구문 그대로 매칭
  // (IRREGULAR_VERB_FORMS에 구 단위로 적힌 형태만 추가 매칭)
  let re;
  if (/\s/.test(target)) {
    const phrases = [target, ...(IRREGULAR_VERB_FORMS[target.toLowerCase()] || [])];
    const alts = phrases
      .map((p) =>
        String(p)
          .split(/\s+/)
          .map(escapeRegExp)
          .filter(Boolean)
          .join("\\s+")
      )
      .filter(Boolean);
    if (!alts.length) return text;
    re = new RegExp(`\\b(?:${alts.join("|")})\\b`, "i");
  } else {
    const forms = generateEnglishForms(target)
      .sort((a, b) => b.length - a.length)
      .map(escapeRegExp);
    if (!forms.length) return text;
    re = new RegExp(`\\b(${forms.join("|")})\\b`, "i");
  }
  if (!re.test(text)) return text;

  const markType = activeCfMarkType || assignSessionCfMarkType();
  let marked = false;
  return mapCfTextOutsideTags(text, (chunk) =>
    chunk.replace(re, (match) => {
      if (marked) return match;
      marked = true;
      return `<${markType}>${match}</${markType}>`;
    })
  );
}

function wrapCfEnglishWords(innerHtml) {
  const temp = document.createElement("span");
  temp.innerHTML = String(innerHtml || "");
  const appendCfPart = (frag, part) => {
    if (!part) return;
    if (/[\uAC00-\uD7A3]/.test(part)) {
      const span = document.createElement("span");
      span.className = "cf-ko";
      span.textContent = part;
      frag.appendChild(span);
      return;
    }
    if (/[A-Za-z0-9]/.test(part)) {
      const span = document.createElement("span");
      span.className = "cf-en-word";
      span.textContent = part;
      frag.appendChild(span);
      return;
    }
    frag.appendChild(document.createTextNode(part));
  };
  const wrapTextNode = (node) => {
    const text = node.nodeValue;
    if (!text) return;
    const frag = document.createDocumentFragment();
    const tokens = text.split(/(\s+)/);
    for (const tok of tokens) {
      if (!tok) continue;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        continue;
      }
      const parts = tok.split(/(\([^)]*[\uAC00-\uD7A3][^)]*\)|[\uAC00-\uD7A3]+)/);
      parts.forEach((part) => appendCfPart(frag, part));
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

/** cf 괄호 안 영어만 span으로 감싸 읽기 중 단어별 하이라이트용. 없으면 *출처 앞 문장 사용 */
function wrapCfParenEnglish(cfHtml) {
  const raw = String(cfHtml || "");
  let idx = 0;
  const withParens = raw.replace(/\(([^)]+)\)/g, (full, inner) => {
    if (!/[A-Za-z]/.test(inner)) return full;
    const i = idx;
    idx += 1;
    return `<span class="cf-en-paren" data-cf-index="${i}">(${wrapCfEnglishWords(inner)})</span>`;
  });
  if (idx > 0) return withParens;

  const starAt = raw.search(/\*/);
  const sentence = (starAt >= 0 ? raw.slice(0, starAt) : raw).trim();
  const cite = starAt >= 0 ? raw.slice(starAt) : "";
  if (sentence && /[A-Za-z]/.test(sentence)) {
    return `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(sentence)}</span>${cite ? ` ${cite}` : ""}`;
  }
  return withParens;
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
function buildEnPreviewMask(en, previewLetters = getActiveEnPreviewLetters()) {
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
function getEnPreviewSplit(en, previewLetters = getActiveEnPreviewLetters()) {
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
    } else if (isWordItem(item)) {
      if (!current) {
        current = { titleIndex: -1, titleItem: null, wordIndices: [] };
        groups.push(current);
      }
      current.wordIndices.push(index);
    }
  });
  return groups;
}

/** title은 그룹핑만 하고 화면에는 노출하지 않음 → 슬롯 전부 단어로 채움 */
const WORDS_PER_PAGE = Math.max(1, VISIBLE_COUNT);

/**
 * json 항목을 한꺼번에 VISIBLE_COUNT개 채우지 않고,
 * 1 → 2 → 3 … 순으로 추가 (이전 항목은 유지).
 */
function appendWordInGroup(group, wordIndexInGroup, animateIn = true, mode = "normal") {
  const globalIndex = group.wordIndices[wordIndexInGroup];
  if (globalIndex == null) return null;
  const existing = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
  if (existing) return existing;
  const onScreen = tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').length;
  if (onScreen >= VISIBLE_COUNT) return null;
  if (!isWordItem(json1[globalIndex])) return null;
  const el = createEntryElement(json1[globalIndex], globalIndex, mode);
  if (animateIn) el.classList.add("slide-in");
  tickerEl.appendChild(el);
  return el;
}

/** 같은 페이지의 다음 단어만 추가 (페이지 경계면 추가하지 않음) */
function revealNextWordInPage(group, wordIndexInGroup, mode = "normal") {
  const nextWordIndexInGroup = wordIndexInGroup + 1;
  if (nextWordIndexInGroup >= group.wordIndices.length) return null;
  if (nextWordIndexInGroup % WORDS_PER_PAGE === 0) return null;
  return appendWordInGroup(group, nextWordIndexInGroup, true, mode);
}

/** 페이지 시작: 첫 단어만 표시 (나머지는 진행하며 하나씩 추가) */
function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  const globalIndex = group.wordIndices[wordStartInGroup];
  if (globalIndex == null || !isWordItem(json1[globalIndex])) return;
  const el = createEntryElement(json1[globalIndex], globalIndex, mode);
  if (animateIn) el.classList.add("slide-in");
  tickerEl.appendChild(el);
}

async function shiftGroupWordsDown(group, nextWordStartInGroup, mode = "normal") {
  const leaving = Array.from(tickerEl.children);
  leaving.forEach((el) => el.classList.add("slide-out"));
  const penFade =
    typeof window.fadeClearPenDrawings === "function"
      ? window.fadeClearPenDrawings(ITEM_TRANSITION_MS)
      : Promise.resolve();
  await Promise.all([sleep(ITEM_TRANSITION_MS), penFade]);
  leaving.forEach((el) => el.remove());
  renderGroupWindow(group, nextWordStartInGroup, true, mode);
}

async function shiftToNextGroup(group, mode = "normal") {
  const oldItems = Array.from(tickerEl.querySelectorAll(".ticker-item"));
  oldItems.forEach((el) => el.classList.add("slide-out"));
  const penFade =
    typeof window.fadeClearPenDrawings === "function"
      ? window.fadeClearPenDrawings(ITEM_TRANSITION_MS)
      : Promise.resolve();
  await Promise.all([sleep(ITEM_TRANSITION_MS), penFade]);
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

function resolveProgressBarTheme(themeId = PROGRESS_BAR_THEME_ID) {
  const id = String(themeId || "").trim();
  if (!id || id === "random") return pickRandomProgressBarTheme();
  const aliases = { barB: "bike" };
  const key = aliases[id] || id;
  const found =
    PROGRESS_BAR_THEMES.find((t) => t.id === key) ||
    PROGRESS_BAR_THEMES.find((t) => (t.stages?.[0]?.[1] || "") === key);
  return found || pickRandomProgressBarTheme();
}

function pickRandomStyleVariant() {
  return STYLE_VARIANTS[Math.floor(Math.random() * STYLE_VARIANTS.length)] ?? 0;
}

function resolveStyleVariant(id = STYLE_VARIANT_ID) {
  const raw = String(id ?? "").trim().toLowerCase();
  if (!raw || raw === "random") return pickRandomStyleVariant();
  const n = Number(raw);
  if (STYLE_VARIANTS.includes(n)) return n;
  return pickRandomStyleVariant();
}

function applyStyleVariant(variant = activeStyleVariant) {
  const n = Number(variant);
  activeStyleVariant = STYLE_VARIANTS.includes(n) ? n : 0;
  const root = document.body;
  if (!root) return;
  root.classList.remove("style-ko-gold");
  root.classList.toggle("style-en-full-write", activeStyleVariant === 2);
}

function getActiveEnPreviewLetters() {
  return EN_PREVIEW_LETTERS;
}

function shouldHighlightEnSpeaking() {
  return activeStyleVariant !== 2;
}

let progressDisplayPct = 0;
let progressTargetPct = 0;
let progressAnimRaf = null;
let progressLabelCurrent = 0;
let progressLabelTotal = 0;

function applyProgressVisual(pct) {
  const fill = document.getElementById("progress-fill");
  const pctEl = document.getElementById("progress-pct");
  const label = document.getElementById("progress-label");
  const shown = Math.max(0, Math.min(100, pct));
  const rounded = Math.round(shown);

  if (fill) {
    fill.style.width = `${shown}%`;
    fill.classList.toggle("has-pct", shown > 0.05);
    if (shown >= 99.5 && fill.dataset.confettiDone !== "true") {
      fill.dataset.confettiDone = "true";
      burstProgressConfetti();
    } else if (shown < 99.5) {
      fill.dataset.confettiDone = "false";
    }
  }
  if (pctEl) pctEl.textContent = `${rounded}%`;
  if (label && progressLabelTotal > 0) {
    label.textContent = `진행도 ${progressLabelCurrent} / ${progressLabelTotal}`;
  }
  updateProgressRunner(shown);
}

function ensureProgressAnim() {
  if (progressAnimRaf) return;
  const tick = () => {
    const diff = progressTargetPct - progressDisplayPct;
    if (Math.abs(diff) < 0.08) {
      progressDisplayPct = progressTargetPct;
      applyProgressVisual(progressDisplayPct);
      progressAnimRaf = null;
      return;
    }
    // 남은 거리의 일부씩 따라가며 끊김 없이 전진
    progressDisplayPct += diff * 0.085;
    applyProgressVisual(progressDisplayPct);
    progressAnimRaf = requestAnimationFrame(tick);
  };
  progressAnimRaf = requestAnimationFrame(tick);
}

function setProgressTargetPct(pct) {
  progressTargetPct = Math.max(0, Math.min(100, pct));
  ensureProgressAnim();
}

/** 단어 처리 중: 다음 칸의 중간쯤까지 살짝 미리 전진 */
function nudgeProgressSoft(doneCount, total = getProgressTotal()) {
  const safeTotal = Math.max(1, total);
  const soft = Math.min(doneCount + 0.55, safeTotal);
  setProgressTargetPct((soft / safeTotal) * 100);
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
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  progressLabelCurrent = safeCurrent;
  progressLabelTotal = safeTotal;
  const pct = safeTotal > 0 ? (safeCurrent / safeTotal) * 100 : 0;
  if (safeCurrent === 0) {
    progressDisplayPct = 0;
    progressTargetPct = 0;
    if (progressAnimRaf) {
      cancelAnimationFrame(progressAnimRaf);
      progressAnimRaf = null;
    }
    applyProgressVisual(0);
    return;
  }
  setProgressTargetPct(pct);
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

function countEnSpellLetters(en) {
  return (String(en || "").match(/[A-Za-z]/g) || []).length;
}

function countKoChars(ko) {
  return (String(ko || "").match(/[가-힣]/g) || []).length;
}

/** 영어 스펠링 수 + 한글 글자 수 ≥ 15 이면 2줄 배치 */
function shouldStackWordLine(en, ko) {
  return countEnSpellLetters(en) + countKoChars(ko) >= 15;
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
  // 화면 대기용 미리보기는 항상 앞 N글자 (전체 손글씨 변형과 분리)
  const mask = buildEnPreviewMask(item.en, EN_PREVIEW_LETTERS);
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
  const cfTextWithUnderline = wrapCfParenEnglish(applyCfWordMarks(cfText, targetWord));
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf"><i class="cf-abbr">cf.</i> ${cfTextWithUnderline}</span>`
    : "";
  if (cfText) el.classList.add("has-cf");
  const enRepeatBannerCount = getEnRepeatBannerCount(item);
  const enRepeatBannerHtml = enRepeatBannerCount > 0
    ? `<span class="en-repeat-banner" data-en-repeat="${enRepeatBannerCount}" aria-hidden="true"><span class="en-repeat-count">${formatEnRepeatCountdown(enRepeatBannerCount)}</span></span>`
    : "";
  const pronHiddenClass = " hidden-pron-text";
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
  const pronLine = `<div class="pron-line"><div class="pron-row"><span class="pron-text${pronHiddenClass}" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>${cfHtml}</div></div>`;
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <span class="order-num" aria-hidden="true">${num}.</span>
      <div class="word-content">
        ${enRepeatBannerHtml}
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

function applyPageBackground() {
  const photoUrl = new URL(PAGE_BG_IMAGE, document.baseURI);
  photoUrl.searchParams.set("v", String(Date.now()));
  const photoSrc = photoUrl.href;

  document.documentElement.style.setProperty("--page-bg-color", PAGE_BG_COLOR);
  document.documentElement.style.setProperty("--page-bg-base-image", "none");
  document.documentElement.style.setProperty("--page-bg-image", `url("${photoSrc}")`);

  // html은 CSS 은은한 그라데이션 유지 — 인라인으로 덮지 않음
  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${photoSrc}")`;
    bgEl.style.setProperty("--page-bg-color", PAGE_BG_COLOR);
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
  if (String(EN_TTS_VOICE) === "random") {
    if (activeEnTtsVoiceId) return activeEnTtsVoiceId;
    return pickRandomEnTtsVoice();
  }
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

/**
 * EN 단어 발음 횟수/속도 지정
 * - enSpeakRates: [1, 0.85] → 배열 길이만큼 재생 (속도별)
 * - enRepeat: 2 → EN_TTS_RATE로 n번
 * - 둘 다 없으면 1번
 */
function getEnSpeakRates(word) {
  const base = Number(EN_TTS_RATE) > 0 ? Number(EN_TTS_RATE) : 1;
  if (Array.isArray(word?.enSpeakRates) && word.enSpeakRates.length) {
    const rates = word.enSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
    if (rates.length) return rates;
  }
  const n = Math.floor(Number(word?.enRepeat));
  if (Number.isFinite(n) && n >= 1) {
    return Array.from({ length: Math.min(n, 10) }, () => base);
  }
  return [base];
}

/** enRepeat/enSpeakRates로 2회 이상일 때만 배너용 횟수 (그 외 0) */
function getEnRepeatBannerCount(word) {
  const n = getEnSpeakRates(word).length;
  return n > 1 ? n : 0;
}

/** remaining=5 → "×5" (하나씩 표기: ×5 → ×4 → … → ×1 → 숨김) */
function formatEnRepeatCountdown(remaining) {
  const n = Math.floor(Number(remaining));
  if (!Number.isFinite(n) || n < 1) return "";
  return `×${n}`;
}

function updateEnRepeatBanner(itemEl, remaining) {
  const banner = itemEl?.querySelector?.(".en-repeat-banner");
  if (!banner) return;
  const countEl = banner.querySelector(".en-repeat-count");
  if (remaining > 0) {
    banner.classList.add("is-active");
    banner.classList.remove("is-done");
    if (countEl) {
      countEl.textContent = formatEnRepeatCountdown(remaining);
      countEl.classList.remove("is-tick");
      void countEl.offsetWidth;
      countEl.classList.add("is-tick");
    }
  } else {
    banner.classList.remove("is-active");
    banner.classList.add("is-done");
    if (countEl) countEl.textContent = "";
  }
}

/** cfSpeakRates: cf 괄호 영어 재생 속도 (예: [1.3, 0.85] = 빠르게 1번 + 천천히 1번) */
function getCfSpeakRates(word) {
  if (!Array.isArray(word?.cfSpeakRates) || !word.cfSpeakRates.length) return [1];
  const rates = word.cfSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
  return rates.length ? rates : [1];
}

/** 괄호/텍스트가 한글 번역 위주인지 */
function isPrimarilyKorean(text) {
  const t = String(text || "").trim();
  if (!t) return false;
  const hangul = (t.match(/[\uAC00-\uD7A3\u3131-\u318E]/g) || []).length;
  const latin = (t.match(/[A-Za-z]/g) || []).length;
  return hangul > 0 && hangul >= latin;
}

/** cf TTS용 — 한글 번역·한글 글자 제거, 영어만 남김 */
function stripCfKoreanForSpeak(text) {
  let t = String(text || "");
  t = t.replace(/\([^)]*[\uAC00-\uD7A3\u3131-\u318E][^)]*\)/g, " ");
  t = t.replace(/（[^）]*[\uAC00-\uD7A3\u3131-\u318E][^）]*）/g, " ");
  t = t.replace(/[\uAC00-\uD7A3\u3131-\u318E]+/g, " ");
  t = t.replace(/\s+/g, " ").replace(/^[,.;:\s]+|[,.;:\s]+$/g, "").trim();
  return t;
}

/** cf 영어 문장 배열. 끝 괄호 출처·한글 번역은 제외하고 영어만 사용 */
function extractCfParenEnglishParts(cfText) {
  const text = String(cfText || "");
  const parts = [];
  const re = /\(([^)]+)\)/g;
  let match;
  while ((match = re.exec(text)) !== null) {
    const inner = String(match[1] || "").trim();
    if (!inner || isPrimarilyKorean(inner)) continue;
    if (/[A-Za-z]/.test(inner)) {
      const spoken = stripCfKoreanForSpeak(inner);
      if (spoken) parts.push(spoken);
    }
  }
  if (parts.length) return parts;

  // "English. (한글 번역) — WSJ" / "English *WSJ..." → 괄호·출처 앞 영어만
  let beforeCite = text.split(/\*/)[0];
  const parenAt = beforeCite.search(/[（(]/);
  if (parenAt >= 0) beforeCite = beforeCite.slice(0, parenAt);
  beforeCite = beforeCite.replace(/\s*[—–-]\s*[A-Za-z].*$/, "").trim();
  const spoken = stripCfKoreanForSpeak(beforeCite);
  if (spoken && /[A-Za-z]/.test(spoken)) return [spoken];
  return [];
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

/** layout4: cf는 화면 노출·마크만, TTS로 읽지 않음 */
const SPEAK_CF_ENGLISH = false;

/** 괄호 안 영어 구문이 있으면 cf 영어를 읽음. cfSpeakRates가 있으면 그 속도로 재생 */
function shouldSpeakCfEnglish(word) {
  if (!SPEAK_CF_ENGLISH) return false;
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  return extractCfParenEnglishParts(word?.cf);
}

/** 구문별로 TTS 재생 — 배경 하이라이트 없이(마크만), enRepeat 횟수만큼 */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null, options = null) {
  const parts = getCfEnglishSpeakParts(word);
  if (!parts.length || !itemEl) return;
  const coreOnly = Boolean(options?.coreOnly);
  const rates = Array.isArray(ratesOverride) && ratesOverride.length
    ? ratesOverride
    : getEnSpeakRates(word);
  const onRepeatTick = typeof options?.onRepeatTick === "function" ? options.onRepeatTick : null;
  for (let i = 0; i < parts.length; i += 1) {
    const speakText = stripCfKoreanForSpeak(
      coreOnly ? extractCfCoreEnglish(parts[i], word?.en) : parts[i]
    );
    if (!String(speakText || "").trim() || !/[A-Za-z]/.test(speakText)) continue;
    try {
      await playEnTTS(speakText, rates, null, onRepeatTick);
    } finally {
      itemEl.querySelectorAll(".cf-en-word.is-speaking, .cf-en-paren.is-speaking").forEach((el) => {
        el.classList.remove("is-speaking");
      });
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
  if (!word) return null;
  const enText = getEnSpeakText(word);
  if (!enText) return null;
  return loadBackendTTSAudio(enText, resolveEnTtsVoiceId("en-US")).catch(() => null);
}

/** 오토플레이 시작 직후 첫 영어 TTS를 미리 받아 첫 재생 지연을 줄임 */
async function warmFirstEnTTS() {
  const firstIndex = json1.findIndex((item) => isWordItem(item));
  if (firstIndex < 0) return;
  assignEnTtsVoiceForWord(firstIndex);
  await preloadEnTTS(json1[firstIndex]);
}

async function playEnTTS(text, rates = [EN_TTS_RATE], wordEls = null, onRepeatTick = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [EN_TTS_RATE];
  try {
    for (let i = 0; i < rateList.length; i += 1) {
      const remaining = rateList.length - i;
      if (typeof onRepeatTick === "function") onRepeatTick(remaining, rateList.length);
      if (i > 0) await sleep(160);
      await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i], wordEls);
    }
  } finally {
    if (typeof onRepeatTick === "function") onRepeatTick(0, rateList.length);
  }
}

function preloadKoTTS(word) {
  // 한글 TTS 없음
}

function preloadCfEnglishTTS(word) {
  if (!word) return;
  const voice = resolveEnTtsVoiceId("en-US");
  getCfEnglishSpeakParts(word).forEach((part) => {
    const text = String(part || "").trim();
    if (!text) return;
    loadBackendTTSAudio(text, voice).catch(() => {});
  });
}

function preloadWordTTS(word, globalIndex = -1) {
  if (globalIndex >= 0) assignEnTtsVoiceForWord(globalIndex);
  preloadEnTTS(word);
  preloadCfEnglishTTS(word);
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
async function writeKoWithHand(koTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  // 한글 손글씨 시작과 동시에 발음·IPA·cf 노출 (마크는 TTS 때)
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
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
  const duration = getHandWriteDurationMs(letters);
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
      preview.textContent = buildEnPreviewMask(fullEn, EN_PREVIEW_LETTERS);
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
    if (r < 0.18) s = 0.22 + Math.random() * 0.2; // 망설임/멈칫
    else if (r < 0.3) s = 1.05 + Math.random() * 0.35; // 약간 빠른 획
    else if (r < 0.55) s = 0.4 + Math.random() * 0.25; // 느린 획
    else s = 0.65 + Math.random() * 0.4;
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

function getHandWriteDurationMs(letters) {
  const n = Math.max(0, Number(letters) || 0);
  return Math.min(HAND_WRITE_MS_MAX, Math.max(HAND_WRITE_MS_MIN, n * HAND_WRITE_MS_PER_LETTER));
}

function getCfMarkDrawDurationMs(text) {
  const n = Math.max(1, String(text || "").replace(/\s/g, "").length);
  return Math.min(CF_MARK_MS_MAX, Math.max(CF_MARK_MS_MIN, n * CF_MARK_MS_PER_LETTER));
}

function queryCfMarkEl(cfNoteEl) {
  return cfNoteEl?.querySelector("mark1, mark10, mark12") || null;
}

function resetCfMarkState(cfNoteEl) {
  if (!cfNoteEl) return;
  cfNoteEl.classList.remove("cf-mark-pending", "cf-mark-drawing", "cf-mark-done");
  cfNoteEl.querySelectorAll("mark1, mark10, mark12").forEach((el) => {
    el.style.removeProperty("--cf-mark-p");
  });
}

async function animateCfMarkDraw(cfNoteEl) {
  const markEl = queryCfMarkEl(cfNoteEl);
  if (!markEl) {
    cfNoteEl?.classList.remove("cf-mark-pending");
    return;
  }

  await sleep(CF_MARK_DELAY_MS);
  if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) return;

  cfNoteEl.classList.remove("cf-mark-pending");
  cfNoteEl.classList.add("cf-mark-drawing");

  const letters = markEl.textContent.replace(/\s/g, "").length || 4;
  const duration = getCfMarkDrawDurationMs(markEl.textContent);
  const curve = makeIrregularHandwriteCurve(Math.max(letters, 6));
  markEl.style.setProperty("--cf-mark-p", "0");
  void markEl.offsetWidth;
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) {
        resolve();
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      markEl.style.setProperty("--cf-mark-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  if (!cfNoteEl.isConnected || cfNoteEl.classList.contains("hidden-cf")) return;

  cfNoteEl.classList.remove("cf-mark-drawing");
  cfNoteEl.classList.add("cf-mark-done");
  markEl.style.removeProperty("--cf-mark-p");
}

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 불규칙하게 씀
 *  발음·IPA·cf는 손글씨 시작과 동시 노출, 마크·TTS는 손글씨 완료 후
 */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
  if (!text) {
    revealEnText(enTextEl, fallback);
    return;
  }

  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);

  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.remove("hidden-en-main", "en-reserving", "en-writing", "en-partial-preview");
    enTextEl.classList.add("en-hand");
    enTextEl.style.removeProperty("--en-write-p");
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
  const duration = getHandWriteDurationMs(letters);
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
  enTextEl.style.removeProperty("--en-write-p");
  enTextEl.classList.add("en-hand");
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

/** cf 본문만 노출 — 마크는 아직 그리지 않음(pending). 이미 보이면 상태 유지 */
function revealCfNote(cfNoteEl) {
  if (!cfNoteEl) return;
  if (!cfNoteEl.classList.contains("hidden-cf")) return;
  resetCfMarkState(cfNoteEl);
  cfNoteEl.classList.remove("hidden-cf");
  cfNoteEl.style.animation = "none";
  void cfNoteEl.offsetWidth;
  cfNoteEl.style.animation = "";

  if (queryCfMarkEl(cfNoteEl)) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
}

/** 손글씨 완료 후·TTS 시작 전 — 핵심단어 마크 손그리기 */
async function startCfMarkDraw(cfNoteEl) {
  if (!cfNoteEl || cfNoteEl.classList.contains("hidden-cf")) return;
  if (!queryCfMarkEl(cfNoteEl)) return;
  if (!cfNoteEl.classList.contains("cf-mark-pending")) {
    cfNoteEl.classList.add("cf-mark-pending");
  }
  await animateCfMarkDraw(cfNoteEl);
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
    resetCfMarkState(el);
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

function getAutoBgmStartSec(wordCount = getTotalWordCount()) {
  const count = Math.max(0, Number(wordCount) || 0);
  return Math.max(0, BGM_AUTO_BASE_SEC + (BGM_AUTO_BASE_WORDS - count) * BGM_AUTO_SEC_PER_WORD);
}

/** json1 위 BGM_START_SEC 우선. null이면 예문 수 자동 */
function getBgmStartSec(wordCount = getTotalWordCount()) {
  if (BGM_START_SEC != null && Number.isFinite(Number(BGM_START_SEC))) {
    return Math.max(0, Math.round(Number(BGM_START_SEC)));
  }
  return getAutoBgmStartSec(wordCount);
}

async function startBgm() {
  if (!BGM_ENABLED) {
    stopBgm();
    return;
  }
  const audio = ensureBgmAudio();
  audio.volume = BGM_VOLUME;
  const startSec = getBgmStartSec();
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
    audio.currentTime = startSec;
    if (audio.paused) await audio.play();
  } catch (_) {
    // 브라우저 자동재생 정책 등으로 실패해도 TTS는 진행
  }
}

function stopBgm() {
  if (!bgmAudio) return;
  try {
    bgmAudio.pause();
    bgmAudio.currentTime = getBgmStartSec();
  } catch (_) {}
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  clearEnTtsVoiceAssignments();
  assignSessionCfMarkType(true);
  activeProgressBarTheme = resolveProgressBarTheme();
  applyStyleVariant(resolveStyleVariant());

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

  // 시작: 첫 단어(1.)만 표시한 뒤 대기 — 2·3…은 진행하며 하나씩 추가
  // 동시에 첫 단어 TTS를 미리 받아 첫 발화가 끊기지 않게 함
  await startBgm();
  renderGroupWindow(groups[0], 0, false, "second-pass");
  showKoAsDefault();
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
  preloadWordsAhead(0, json1.length);
  await Promise.all([sleep(3000), warmFirstEnTTS()]);

  // 1패스: 한글 먼저 노출 → 영어 손 쓰기·마크 → EN 읽기 → cf 영어 읽기
  for (let g = 0; g < groups.length; g += 1) {
    const group = groups[g];
    if (g === 0) {
      // 대기 전에 이미 첫 단어만 그려 둠
      showKoAsDefault();
      hideAllEnText();
      hideAllPronText();
      hideAllCfText();
    } else {
      await shiftToNextGroup(group, "second-pass");
      showKoAsDefault();
      hideAllEnText();
      hideAllPronText();
      hideAllCfText();
    }

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
      const cfNoteEl = item.querySelector(".cf-note");

      item.classList.add("is-word-active");
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord();
      }
      nudgeProgressSoft(doneCount, progressTotal);
      assignEnTtsVoiceForWord(globalIndex);
      preloadWordTTS(json1[globalIndex], globalIndex);
      reserveEnSlot(enTextEl, item.dataset.en || "");
      // 한글은 노출만 → 영어 손 쓰기 시작 때 발음·IPA·cf 한꺼번에 노출
      // 손글씨(빈칸 채우기) + 마크 손그리기 완료 후 TTS 시작
      await writeEnWithHand(enTextEl, item.dataset.en || "", pronTextEl, cfNoteEl);
      await startCfMarkDraw(cfNoteEl);
      try {
        const wordData = json1[globalIndex];
        if (shouldHighlightEnSpeaking()) enTextEl?.classList.add("is-speaking");
        await playEnTTS(
          getEnSpeakText(wordData),
          getEnSpeakRates(wordData),
          null,
          (remaining) => updateEnRepeatBanner(item, remaining)
        );
        enTextEl?.classList.remove("is-speaking");
        updateEnRepeatBanner(item, 0);
        if (shouldSpeakCfEnglish(wordData)) {
          await playCfEnglishWithHighlight(
            item,
            wordData,
            getEnSpeakRates(wordData),
            { onRepeatTick: (remaining) => updateEnRepeatBanner(item, remaining) }
          );
        }
      } finally {
        enTextEl?.classList.remove("is-speaking");
        updateEnRepeatBanner(item, 0);
      }

      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      // 같은 페이지 다음 번호(2. 3. …) 추가 — 이전 항목 유지
      revealNextWordInPage(group, w, "second-pass");
      moveEnHandToNext(group, w);
      await sleep(400);
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 2패스: 한글 손 쓰기·마크 → 영어 읽기 (cf TTS 없음)
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
      hideAllPronText();
      hideAllCfText();

      for (let w = 0; w < group.wordIndices.length; w += 1) {
        const globalIndex = group.wordIndices[w];
        if (w > 0 && w % WORDS_PER_PAGE === 0) {
          await shiftGroupWordsDown(group, w, "normal");
          hideAllKoText();
          hideAllPronText();
          hideAllCfText();
        }

        preloadWordsAhead(globalIndex + 1, WORDS_PER_PAGE);

        const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
        if (!item || item.dataset.itemType !== "word") continue;

        const ko = item.dataset.ko || "";
        const koTextEl = item.querySelector(".ko-text");
        const pronTextEl = item.querySelector(".pron-text");
        const cfNoteEl = item.querySelector(".cf-note");

        item.classList.add("is-word-active");
        if (typeof window.placePenNearWord === "function") {
          window.placePenNearWord();
        }
        nudgeProgressSoft(doneCount, progressTotal);
        assignEnTtsVoiceForWord(globalIndex);
        reserveKoSlot(koTextEl, ko);
        const enMainEl = item.querySelector(".en-main-text");
        // 2패스: 한글 손글씨·마크 완료 후 EN TTS
        if (koTextEl) {
          await writeKoWithHand(koTextEl, ko, pronTextEl, cfNoteEl);
        } else {
          revealPronText(pronTextEl);
          revealCfNote(cfNoteEl);
        }
        await startCfMarkDraw(cfNoteEl);
        if (enMainEl && shouldHighlightEnSpeaking()) enMainEl.classList.add("is-speaking");
        try {
          const wordData = json1[globalIndex];
          await playEnTTS(
            getEnSpeakText(wordData),
            getEnSpeakRates(wordData),
            null,
            (remaining) => updateEnRepeatBanner(item, remaining)
          );
        } finally {
          if (enMainEl) enMainEl.classList.remove("is-speaking");
          updateEnRepeatBanner(item, 0);
        }
        await sleep(120);
        // 같은 페이지 다음 번호 추가 후 손 이동 (이전 항목 유지)
        revealNextWordInPage(group, w, "normal");
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

  stopBgm();
  await startReviewQuiz();

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

/** 정답 → 앞 3글자 + 나머지 글자 수만큼 _ (붙여쓰기). 폭은 정답 sizer로 고정 */
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
  if (blankHtml) {
    const replaced = html.replace(/[A-Za-z]{1,3}_{2,}/g, blankHtml);
    if (replaced !== html) return replaced;
    return html.replace(/_{2,}/g, blankHtml);
  }
  return html;
}

function buildReviewSpeakText(en) {
  return String(en || "")
    .replace(/[A-Za-z]{1,3}_{2,}/g, "blank")
    .replace(/_{2,}/g, "blank")
    .trim();
}

/** 문장 빈칸에 ✍️ 손으로 정답 쓰기 — 앞글자(접두)는 두고 빈 곳만 채움. 폭은 sizer로 고정 */
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
    blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
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
  const duration = Math.min(
    HAND_WRITE_MS_MAX,
    Math.max(HAND_WRITE_MS_MIN, letters * HAND_WRITE_MS_PER_LETTER)
  );
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
          <div class="countdown-stage" data-mode="${COUNTDOWN_STYLE}">
            <svg class="countdown-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="countdown-ring-track" cx="60" cy="60" r="52"></circle>
              <circle class="countdown-ring-progress" id="countdown-ring-progress" cx="60" cy="60" r="52"
                pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"></circle>
            </svg>
            <span class="countdown-num" id="countdown-num" aria-hidden="true">${COUNTDOWN_SEC}</span>
            <div class="countdown-bars" id="countdown-bars" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>
      </div>
      <div id="rv-title"></div>
      <div id="rv-en"></div>
      <div id="rv-ko"></div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
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

function getCountdownStyle(item, index = 0) {
  const style = String(item?.countdownStyle || COUNTDOWN_STYLE || "")
    .trim()
    .toLowerCase();
  if (COUNTDOWN_MODES.includes(style)) return style;
  return COUNTDOWN_MODES.includes(COUNTDOWN_STYLE) ? COUNTDOWN_STYLE : "ring";
}

function getCountdownTickSrc(item) {
  const src = String(item?.countdownTick || COUNTDOWN_TICK_SRC || "").trim();
  return src || COUNTDOWN_TICK_FALLBACK_SRC;
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

function startCountdownTickSound(src) {
  stopCountdownTickSound();
  const tickSrc =
    String(src || "").trim() || COUNTDOWN_TICK_SRC || COUNTDOWN_TICK_FALLBACK_SRC;
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

async function runCountdown(seconds, mode = COUNTDOWN_STYLE, tickSrc = COUNTDOWN_TICK_SRC) {
  const { wrap, num } = getReviewCountdownEls();
  if (!wrap || !num) return;
  const style = COUNTDOWN_MODES.includes(mode) ? mode : getCountdownStyle(null);
  setCountdownMode(style);
  wrap.hidden = false;
  startCountdownTickSound(tickSrc || COUNTDOWN_TICK_SRC);

  if (style === "ring") setCountdownRing(seconds, seconds);
  if (style === "bars") setCountdownBars(seconds);

  try {
    for (let sec = seconds; sec >= 0; sec -= 1) {
      if (!isAutoplayRunning) break;
      num.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, seconds);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
  } finally {
    stopCountdownTickSound();
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
  const titleEl = document.getElementById("rv-title");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  const panelEl = root.querySelector(".rv-panel");
  const wrapper = document.querySelector("main.wrapper");

  const renderQuiz = (q, index) => {
    if (titleEl) titleEl.textContent = `Review ${index + 1}/${quizzes.length}`;
    if (enEl) enEl.innerHTML = formatReviewEnHtml(q.en, q.answer);
    if (koEl) koEl.textContent = String(q.ko || "").trim();
  };

  renderQuiz(quizzes[0], 0);
  await fadeReviewIn(root, wrapper);
  if (typeof window.placePenNearWord === "function") {
    window.placePenNearWord();
  }

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    if (i > 0) {
      if (typeof window.clearPenDrawings === "function") {
        window.clearPenDrawings();
      }
      if (panelEl) {
        panelEl.classList.add("is-switching");
        await sleep(REVIEW_FADE_MS * 0.55);
      }
      renderQuiz(q, i);
      if (panelEl) {
        panelEl.classList.remove("is-switching");
        void panelEl.offsetWidth;
        panelEl.classList.add("is-shown");
        await sleep(REVIEW_FADE_MS * 0.55);
        panelEl.classList.remove("is-shown");
      }
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord();
      }
    }

    const speakText = buildReviewSpeakText(q.en);
    if (speakText) {
      try {
        await playEnTTS(speakText);
      } catch (_) {}
    }
    await sleep(400);

    await runCountdown(
      COUNTDOWN_SEC,
      getCountdownStyle(q, i),
      getCountdownTickSrc(q)
    );

    await writeReviewAnswerInBlank(enEl, q.answer);
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
  if (typeof window.stopPenDrawing === "function") {
    window.stopPenDrawing();
  }
  // 마지막 문제 후 Review 화면에 그대로 종료
}

applyPageBackground();
if (pageTitleEl) {
  applyPageTitle();
  window.addEventListener("resize", () => {
    fitTitleSubToBox();
  });
}
assignSessionCfMarkType();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
initPenDraw();

/** 펜: 탭=켜기/끄기 · 길게=빨강↔노랑 · 두번탭=전체 지우기 (001layout2_cf와 동일) */
function initPenDraw() {
  const canvas = document.getElementById("pen-canvas");
  const btn = document.getElementById("pen-btn");
  let pointer = document.getElementById("pen-pointer");
  if (!canvas || !btn) return;

  if (!pointer) {
    pointer = document.createElement("div");
    pointer.id = "pen-pointer";
    pointer.className = "pen-pointer";
    pointer.setAttribute("aria-hidden", "true");
    document.body.appendChild(pointer);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = {
    red: "#ff2d2d",
    yellow: "#ffd400"
  };
  let colorKey = "red";
  let drawingEnabled = false;
  let isStroke = false;
  let lastX = 0;
  let lastY = 0;
  let longPressTimer = null;
  let longPressFired = false;
  let lastTapAt = 0;
  let penStopped = false;

  const syncSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const movePointer = (x, y) => {
    pointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const setColor = (key) => {
    colorKey = key === "yellow" ? "yellow" : "red";
    btn.dataset.color = colorKey;
    pointer.dataset.color = colorKey;
    btn.style.setProperty("--pen-color", COLORS[colorKey]);
    pointer.style.setProperty("--pen-color", COLORS[colorKey]);
  };

  const setDrawing = (on) => {
    drawingEnabled = Boolean(on) && !penStopped;
    canvas.classList.toggle("is-drawing", drawingEnabled);
    btn.classList.toggle("is-on", drawingEnabled);
    pointer.classList.toggle("is-on", drawingEnabled);
    document.body.classList.toggle("is-pen-drawing", drawingEnabled);
    canvas.setAttribute("aria-hidden", drawingEnabled ? "false" : "true");
    if (!drawingEnabled) {
      movePointer(-100, -100);
    }
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const fadeClearPenDrawings = (durationMs = ITEM_TRANSITION_MS) => {
    const ms = Math.max(0, Number(durationMs) || ITEM_TRANSITION_MS);
    return new Promise((resolve) => {
      canvas.style.transition = `opacity ${ms}ms ease`;
      void canvas.offsetWidth;
      canvas.style.opacity = "0";
      window.setTimeout(() => {
        clearCanvas();
        canvas.style.transition = "none";
        canvas.style.opacity = "1";
        resolve();
      }, ms);
    });
  };

  const stopPenDrawing = () => {
    penStopped = true;
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
    setDrawing(false);
    clearCanvas();
    btn.disabled = true;
    btn.classList.remove("is-on");
    pointer.classList.remove("is-on");
    movePointer(-100, -100);
  };

  const pointFromEvent = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches[0]) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const beginStroke = (e) => {
    if (penStopped || !drawingEnabled) return;
    if (e.target === btn) return;
    const p = pointFromEvent(e);
    isStroke = true;
    lastX = p.x;
    lastY = p.y;
    movePointer(p.x, p.y);
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX + 0.01, lastY + 0.01);
    ctx.stroke();
    e.preventDefault();
  };

  const moveStroke = (e) => {
    if (penStopped || !drawingEnabled) return;
    const p = pointFromEvent(e);
    movePointer(p.x, p.y);
    if (!isStroke) return;
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
    e.preventDefault();
  };

  const endStroke = () => {
    isStroke = false;
  };

  const placePenNearWord = () => {
    const anchor = document.querySelector(".page-header .title-main");
    let rect = null;
    if (anchor) {
      try {
        const range = document.createRange();
        range.selectNodeContents(anchor);
        const textRect = range.getBoundingClientRect();
        if (textRect.width > 0 && textRect.height > 0) rect = textRect;
      } catch (_) {
        /* ignore */
      }
      if (!rect) rect = anchor.getBoundingClientRect();
    }
    btn.style.setProperty("position", "fixed", "important");
    btn.style.setProperty("right", "auto", "important");
    btn.style.setProperty("bottom", "auto", "important");
    btn.style.setProperty("transform", "translateY(-50%)", "important");
    btn.style.setProperty("z-index", "100110", "important");
    if (!penStopped) {
      btn.style.setProperty("pointer-events", "auto", "important");
    }
    canvas.style.setProperty("z-index", "100100", "important");
    pointer.style.setProperty("z-index", "100120", "important");
    if (rect && rect.width > 0 && rect.height > 0) {
      const x = rect.right + 20;
      const y = rect.top + rect.height / 2;
      btn.style.setProperty("left", `${Math.max(8, x)}px`, "important");
      btn.style.setProperty("top", `${y}px`, "important");
    } else {
      btn.style.setProperty("left", "auto", "important");
      btn.style.setProperty("right", "12px", "important");
      btn.style.setProperty("top", "30%", "important");
    }
  };

  window.clearPenDrawings = clearCanvas;
  window.fadeClearPenDrawings = fadeClearPenDrawings;
  window.placePenNearWord = placePenNearWord;
  window.stopPenDrawing = stopPenDrawing;

  syncSize();
  setColor("red");
  setDrawing(false);
  placePenNearWord();
  window.addEventListener("resize", () => {
    syncSize();
    placePenNearWord();
  });
  window.addEventListener("scroll", () => placePenNearWord(), { passive: true });
  window.setTimeout(() => placePenNearWord(), 100);
  window.setTimeout(() => placePenNearWord(), 500);
  window.setTimeout(() => placePenNearWord(), 1200);

  canvas.addEventListener("pointerdown", beginStroke, { passive: false });
  canvas.addEventListener("pointermove", moveStroke, { passive: false });
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
  canvas.addEventListener("pointerleave", endStroke);

  btn.addEventListener("pointerdown", (e) => {
    if (penStopped || btn.disabled) return;
    longPressFired = false;
    longPressTimer = window.setTimeout(() => {
      longPressFired = true;
      setColor(colorKey === "red" ? "yellow" : "red");
      if (!drawingEnabled) setDrawing(true);
      btn.animate(
        [
          { transform: "translateY(-50%) scale(1)" },
          { transform: "translateY(-50%) scale(1.18)" },
          { transform: "translateY(-50%) scale(1.08)" }
        ],
        { duration: 220 }
      );
    }, 480);
    e.preventDefault();
  });

  const cancelLongPress = () => {
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  btn.addEventListener("pointerup", (e) => {
    if (penStopped || btn.disabled) {
      cancelLongPress();
      return;
    }
    cancelLongPress();
    if (longPressFired) {
      longPressFired = false;
      e.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastTapAt < 320) {
      clearCanvas();
      lastTapAt = 0;
      e.preventDefault();
      return;
    }
    lastTapAt = now;
    setDrawing(!drawingEnabled);
    e.preventDefault();
  });

  btn.addEventListener("pointercancel", cancelLongPress);
  btn.addEventListener("pointerleave", cancelLongPress);
  btn.addEventListener("contextmenu", (e) => e.preventDefault());
}
