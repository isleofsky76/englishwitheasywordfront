/* =====================================================================
   🔊 TTS 음성 설정 (제일 위)
   ---------------------------------------------------------------------
   enVoice / koVoice : 숫자(고정) 또는 "sequential" / "random"
   "sequential" (기본) → 1→2→3… 번호 순서, 한 바퀴 끝나면 다시 1부터
   "random" → 목록을 섞은 뒤 순서대로 (한 바퀴 끝나면 다시 섞음)
   ===================================================================== */

/** 영어 TTS 음성 목록 */
const EN_TTS_VOICE_IDS = {
  // 1: "en-US-Chirp3-HD-Fenrir",           // 남 · 미국 · 낮고 허스키
  1: "en-US-News-N",           // 여 · 미국 허스키   en-US-News-N  en-GB-News-J
  // 1: "en-US-Chirp3-HD-Orus",             // 남 · 미국 · 성숙·안정
  2: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  3: "en-GB-News-J",           // GB남 
  // 3: "en-US-Chirp3-HD-Fenrir",           // 남 · 미국 · 낮고 허스키
  4: "en-GB-Wavenet-N",                 // 여 · 영국
  5: "en-US-Chirp3-HD-Despina",          // 여 · 미국
  6: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  7: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  8: "en-GB-Chirp-HD-D",                 // 남 · 영국
  9: "en-GB-Wavenet-N",                 // 여 · 영국
  10: "en-GB-Wavenet-N",                 // 여 · 영국
  11: "en-US-Chirp3-HD-Fenrir",           // 남 · 미국 · 낮고 허스키
  12: "en-US-Chirp3-HD-Charon",           // 남 · 미국 · 따뜻한 대화형
  13: "en-US-Chirp3-HD-Orus",             // 남 · 미국 · 성숙·안정
};

// en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키

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
 * 영어 음성 — 1~13 또는 "sequential" / "random"
 * 한글 음성 — 1~8 또는 "sequential" / "random"
 */
const TTS_CONFIG = {
  enVoice: "sequential",
  koVoice: "sequential",
};

/**
 * 화면 표시 (페이지 배치) — ★ 여기 숫자만 바꾸세요
 * page1~page5 — 학습·summary 공통, 1~5페이지 각각 한 화면에 보이는 단어 개수
 * 5페이지 이후가 더 있으면 page5 값을 반복
 * 예) { page1: 5, page2: 2, page3: 2, page4: 2, page5: 2 }
 */
const DISPLAY_CONFIG = {
  page1: 2,
  page2: 2,
  page3: 3,
  page4: 2,
  // page4: 1,
  // page5: 1,
};

/**
 * 타이밍(초) — ★ 여기 숫자만 바꾸세요
 * autoplayStartSec   — autoplay 누른 뒤 EN 날아오기 전 대기 (기본 0.2)
 * enToKoSec          — 영어 노출·낭독 후 → 한글 노출 전 대기 (기본 0.25 = 250ms)
 * wordHoldSec        — 영어·한글 노출 후 → 다음 단어로 넘어가기 전 대기 (기본 0.2 = 200ms)
 * summaryWordHoldSec — summary에서 단어 1개 노출 후 → 다음 단어 전 대기 (기본 1.5초)
 */
const TIMING_CONFIG = {
  autoplayStartSec: 2,
  enToKoSec: 0.5,
  wordHoldSec: 5.0,
  summaryWordHoldSec: 1.5,
};

/**
 * 학습 패스 on/off
 * pass1 — true: 한글 숨김 → 영어 읽기 → 한글 노출·읽기
 * pass2 — true: 영어 숨김 → 한글 읽기 → 영어(+발음·예문) 노출·읽기
 * 둘 다 true면 1 → 2 순서로 진행
 * ko — true: 한글 뜻 TTS 낭독 / false: 한글 TTS 끔 (뜻은 화면에만 노출)
 * summary — true: 마지막 summary 실행 / false: summary 건너뜀 (quiz 있으면 quiz로)
 * exCountdown — true: 예문 낭독 전 원형 카운터(5→0) / false: 카운터 끔
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: false,
  ko: false, /* false면 한글 TTS off (화면 노출은 유지) */
  summary: false, /* false면 summary 생략 → 바로 quiz */
  exCountdown: false, /* false: 예문 카운터 off */
  translation: false, /* false: 예문 한글 번역(translation) 미노출 */
};

/**
 * 뜻 노출·낭독 후 퇴장 연출 (true / false)
 * riseOut  — true: 위로 사라지는 방식 (단어가 위로 올라가며 사라지고, 아래가 위로 붙음)
 * swipeOut — true: 좌우·스프링 등 다양한 swipe 스타일로 퇴장
 * 둘 다 false면 자리 유지 / 둘 다 true면 swipeOut 우선
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
   퀴즈 quiz[]: { en(영어정의), ko, answer, answerKo, choices[4], image }
   ===================================================================== */
const WORDS = {
  badge: "시사 영단어",

  /* 날짜 — ★ 여기 문자열만 바꾸세요 (예: "Oct. 18, 2026")
   * 비우면("") 오늘 날짜 자동
   */
  date: "Nov. 06, 2026",

  /* [강조]=노랑, (강조)=미백, 그 밖=라임(녹색) — colourchange와 동일 3색
   * titleSize — 제목 글자 크기(px). ★ 여기 숫자만 바꾸세요
   * 줄마다 다르게 할 때만 size 추가: { text: "...", size: 72 }
   */
  titleSize: 70,
  title: [
    { text: "[월가, 기술주 사상 최대 ]" },
    { text: "(폭락 사태 발생) #핵심어휘" },
  ],

  /* 제목 옆 증명사진(3.5×4.5) — ★ 여기 경로를 바꾸면 이미지가 바뀜
   * 비우면 재생 중 현재 단어의 image / 초기에는 words[0].image
   */
  titlePhoto: "",

  source: "The Wall Street Journal",
  sourceMark: "추출",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* colourchange cardData.words 와 동일 구조 */
  words: [
   
    {
      "en": "shed",
      "ko": "잃다, 줄어들다",
      "pos": "동",
      "reading": "셰드",
      "ipa": "/ʃed/",
      "defs": ["가치나 규모, 수량 등이 줄어들거나 사라지다"],
      "example": "The Nasdaq composite stumbled into correction territory, shedding an estimated $2.5 trillion in total market value.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "shedding",
      "translation": "나스닥 종합지수가 조정 국면에 진입하면서<br>전체 시가총액이 약 2조 5천억 달러 줄었다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "shedding an estimated<br>$2.5 trillion",
        "text": "약 2조 5천억 달러를<br>잃으며"
      }
    },
    {
      "en": "unscathed",
      "ko": "피해를 입지 않은, 타격을 받지 않은",
      "pos": "형",
      "reading": "언스케이브드",
      "ipa": "/ʌnˈskeɪðd/",
      "defs": ["위험하거나 어려운 상황에서도 손상이나 피해를 입지 않은"],
      "example": "Thursday’s stock-market wipeout left few corners of the tech sector unscathed.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "unscathed",
      "translation": "목요일 증시 폭락으로<br>기술 업종에서 타격을 피한 분야는<br>거의 없었다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "left few corners<br>unscathed",
        "text": "타격을 피한 분야가<br>거의 없었다"
      }
    },
    
    {
      "en": "tremor",
      "ko": "진동, 불안의 파장",
      "pos": "명",
      "reading": "트레머",
      "ipa": "/ˈtremə/",
      "defs": ["작은 흔들림이나 진동. 비유적으로 충격이나 불안이 퍼지는 현상"],
      "example": "Underwhelming earnings reports by Amazon and Alphabet sent tremors across trading desks.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "tremors",
      "translation": "아마존과 알파벳의 기대에 못 미친 실적 발표가<br>증권사 매매 부서 전반에<br>불안의 파장을 일으켰다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "sent tremors<br>across trading desks",
        "text": "매매 부서 전반에<br>불안의 파장을 일으켰다"
      }
    },
    {
      "en": "stall",
      "ko": "진행이 멈추다, 정체되다",
      "pos": "동",
      "reading": "스톨",
      "ipa": "/stɔːl/",
      "defs": ["일이나 계획이 더 이상 진척되지 않고 멈추다"],
      "example": "Some projects will stall.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "stall",
      "translation": "일부 프로젝트는<br>진행이 멈출 것이다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "projects<br>will stall",
        "text": "프로젝트의 진행이<br>멈출 것이다"
      }
    },
    {
      "en": "mechanical selling",
      "ko": "기계적인 매도",
      "pos": "명사구",
      "reading": "머캐니컬 셀링",
      "ipa": "/məˈkænɪkəl ˈselɪŋ/",
      "defs": ["개별적인 판단보다 미리 정해진 규칙이나 조건에 따라 자동적·일률적으로 이루어지는 매도"],
      "example": "Mechanical selling amplified the losses, said Ben Emons, founder and chief investment officer at FedWatch Advisors.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "Mechanical selling",
      "translation": "페드워치 어드바이저스의 창업자이자<br>최고투자책임자인 벤 에먼스는<br>기계적인 매도가 손실을 키웠다고 말했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "Mechanical selling<br>amplified the losses",
        "text": "기계적인 매도가<br>손실을 키웠다"
      }
    },
    {
      "en": "unwind",
      "ko": "투자 포지션의 청산",
      "pos": "명",
      "reading": "언와인드",
      "ipa": "/ˈʌnwaɪnd/",
      "defs": ["기존 투자 거래나 포지션을 정리하여 투자 노출을 줄이거나 없애는 것"],
      "example": "The unwind of bullish bets using borrowed money compounded the pressure.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "unwind",
      "translation": "빌린 돈으로 주가 상승에 베팅한<br>투자 포지션이 청산되면서<br>매도 압력이 더욱 커졌다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "The unwind<br>of bullish bets",
        "text": "상승에 베팅한<br>투자 포지션의 청산"
      }
    },
    
  ],

  /**
   * Review 퀴즈 — 영어 의문문 정의 → 4지선다 (최신 words 기준)
   * { en: What/의문문 질문, ko, answer, answerKo, choices[4], image }
   */
  // quiz: [
  //   {
  //     en: "Which word means a sharp expression of criticism or strong disapproval?",
  //     ko: "질책, 강한 비판",
  //     answer: "rebuke",
  //     answerKo: "질책, 강한 비판",
  //     choices: ["rebuke", "upheaval", "subpoena", "praise"],
  //     image: "",
  //   },
    
  // ],
};


//나중에 다시하자 어렵네....
// {
//   "en": "dearer",
//   "ko": "더 비싼",
//   "pos": "형",
//   "reading": "디어러",
//   "ipa": "/ˈdɪərə/",
//   "defs": ["가격이나 비용이 다른 것보다 더 높은"],
//   "example": "Existing owners do not want to sell, since moving would mean swapping a cheap mortgage for a dearer one.",
//   "cf": "",
//   "enRepeat": 2,
//   "highlight": "swapping",
//   "translation": "(1) dear 값 비싼 (high-priced, costly) <br> (2) dearer 더 비싼 (dear비교급)",
//   "image": "",
//   "icon": "🔄",
//   "spark": "yellow",
//   "note": {
//     "phrase": "swapping a cheap mortgage<br>for a dearer one",
//     "text": "저렴한 주택담보대출을<br>더 비싼 대출로 바꾸는 것"
//   }
// },
// {
//   "en": "port",
//   "ko": "이전하다, 옮기다",
//   "pos": "동",
//   "reading": "포트",
//   "ipa": "/pɔːt/",
//   "defs": ["기존 주택담보대출의 조건을 유지하면서 담보 대상을 새 부동산으로 이전하다"],
//   "example": "But, unlike borrowers in Britain and Canada, Americans cannot generally “port” their mortgages to a new property, forcing those with cheap loans to pay higher rates when they move.",
//   "cf": "",
//   "enRepeat": 2,
//   "highlight": "port",
//   "translation": "(1) Port 이전하다, 옮기다",
//   "image": "",
//   "icon": "🏡",
//   "spark": "yellow",
//   "note": {
//     "phrase": "“port” their mortgages<br>to a new property",
//     "text": "기존 주택담보대출을<br>새 부동산으로 옮기다"
//   }
// },
// {
//   "en": "discourage",
//   "ko": "단념시키다",
//   "pos": "동",
//   "reading": "디스커리지",
//   "ipa": "/dɪsˈkʌrɪdʒ/",
//   "defs": ["어떤 행동을 하려는 의욕이나 의지를 줄이다"],
//   "example": "Such costs discourage Americans from moving, even when doing so would otherwise be worthwhile — for a better job, say, or to buy a bigger home for a growing family.",
//   "cf": "",
//   "enRepeat": 2,
//   "highlight": "discourage",
//   "translation": "그런 비용(이사하면서 늘어나는 대출 이자 부담)은 미국인들이 이사를 꺼리게 한다. 그렇게 하는 것(이사하는 것)이, 그렇지 않다면(그런 추가 비용 부담이 없다면) 가치가 있을 경우에도 — 예를 들어 더 좋은 일자리를 얻거나, 늘어나는 가족을 위해 더 큰 집을 사려는 경우에도",
//   "image": "",
//   "icon": "✋",
//   "spark": "red",
//   "note": {
//     "phrase": "discourage Americans<br>from moving",
//     "text": "미국인들이<br>이사를 꺼리게 하다"
//   }

const WORD_COLORS = ["#e06a4f", "#3e6fd8", "#3a9a6b", "#c23b3b", "#8b5cf6", "#0d9488"];

const ARROW_SVG =
  '<svg class="arrow" width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">' +
  '<path d="M3 12 H 28 M20 4 L 29 12 L 20 20" fill="none" stroke="#2d4f9e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** en+ko 글자수 합이 20 이상이면 한글 뜻을 영어 아래에
 * ko는 공백 제외 글자수
 * 영어 12자+(공백 포함)도 아래 — underwhelming, cannon fodder 등
 * 짧은 구(red flag)는 한 줄 — 띄어쓰기·음절 수로는 스택하지 않음
 * word.stack === true 강제 아래 / false 강제 한 줄
 */
const STACK_EN_KO_CHAR_LIMIT = 20;
const STACK_EN_MIN_LEN = 12;

function needsStackedMeaning(en, ko, word) {
  if (word && word.stack === true) return true;
  if (word && word.stack === false) return false;
  const enStr = String(en || "").trim();
  const enLen = enStr.length;
  const koLen = String(ko || "").replace(/\s+/g, "").length;
  /* hotch-potch 등 하이픈 합성어는 공백 구와 같이 아래로 */
  if (enStr.includes("-") && enLen + koLen >= 18) return true;
  if (enLen >= STACK_EN_MIN_LEN) return true;
  return enLen + koLen >= STACK_EN_KO_CHAR_LIMIT;
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

/** EN 구의 복수 변형 (recruitment quota → recruitment quotas) */
function enMatchCandidates(en, highlight) {
  const out = [];
  const push = (v) => {
    const t = String(v || "").trim();
    if (!t) return;
    if (!out.some((x) => x.toLowerCase() === t.toLowerCase())) out.push(t);
  };
  push(en);
  push(highlight);
  const base = String(en || "").trim();
  if (base && /\s/.test(base)) {
    const parts = base.split(/\s+/);
    const last = parts[parts.length - 1];
    const head = parts.slice(0, -1).join(" ");
    if (!/s$/i.test(last)) {
      push(`${head} ${last}s`);
      if (/(?:s|x|z|ch|sh)$/i.test(last)) push(`${head} ${last}es`);
    }
  }
  return out;
}

/**
 * 읽는 구문 분할로 multi-word highlight가 잘렸을 때
 * (예: "down the road" → "… down" + "the road") 조각만 <mark>
 */
function highlightPhraseFragments(safeHtml, phrase) {
  const pWords = String(phrase || "").trim().split(/\s+/).filter(Boolean);
  if (pWords.length < 2) return safeHtml;

  /* the/a/of 단독은 오하이라이트 방지 — 2단어 이상 우선, 내용어 1단어만 허용 */
  const STOP = /^(?:the|a|an|of|to|in|on|at|for|and|or|it|is|are|be)$/i;
  for (let len = pWords.length - 1; len >= 1; len -= 1) {
    for (let i = 0; i <= pWords.length - len; i += 1) {
      const sub = pWords.slice(i, i + len).join(" ");
      if (len === 1 && STOP.test(sub)) continue;
      const re = new RegExp(`\\b(${escapeRegExp(sub)})\\b`, "gi");
      if (re.test(safeHtml)) {
        re.lastIndex = 0;
        return safeHtml.replace(re, "<mark>$1</mark>");
      }
    }
  }
  return safeHtml;
}

/** 예문 — 핵심 EN(·활용·복수)만 <mark> */
function highlightSentence(sentence, en, highlight) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  const safe = allowBreakTags(escapeHtml(raw));
  const candidates = enMatchCandidates(en, highlight);
  if (!candidates.length) return safe;

  for (const t of candidates) {
    const reExact = new RegExp(`\\b(${escapeRegExp(t)})\\b`, "gi");
    if (reExact.test(safe)) {
      reExact.lastIndex = 0;
      return safe.replace(reExact, "<mark>$1</mark>");
    }
  }

  /* 구문 단위 분할로 잘린 multi-word 구 */
  for (const t of candidates) {
    if (!/\s/.test(t)) continue;
    const frag = highlightPhraseFragments(safe, t);
    if (frag !== safe) return frag;
  }

  /* flee → fleeing 등: 단일어 EN stem */
  const stem = String(en || "").trim();
  if (stem.length >= 3 && !/\s/.test(stem)) {
    const reStem = new RegExp(`\\b(${escapeRegExp(stem)}[a-zA-Z']*)\\b`, "gi");
    if (reStem.test(safe)) {
      reStem.lastIndex = 0;
      return safe.replace(reStem, "<mark>$1</mark>");
    }
  }
  return safe;
}

/** 토큰 비교용 — 앞뒤 문장부호 제거 */
function normalizeExampleToken(word) {
  return String(word || "")
    .replace(/^[^A-Za-z0-9$%']+|[^A-Za-z0-9$%']+$/g, "")
    .toLowerCase();
}

/** 숫자 천단위 쉼표(1,000)인지 — 읽는 구간 분할에서 제외 */
function isThousandsComma(raw, index) {
  return (
    raw[index] === "," &&
    /\d/.test(raw[index - 1] || "") &&
    /\d/.test(raw[index + 1] || "")
  );
}

/**
 * 숨 고르는 지점(, ; : — – | · 줄바꿈)으로 1차 분할.
 * 구분자는 앞 구간에 붙인다.
 */
function splitByBreathMarks(sentence) {
  const raw = String(sentence || "")
    .replace(/<br\s*\/?>/gi, "|")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/\s+/g, " ")
    .trim();
  if (!raw) return [];

  const parts = [];
  let buf = "";
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (ch === "|" ) {
      const t = buf.trim();
      if (t) parts.push(t);
      buf = "";
      continue;
    }
    buf += ch;
    if ((ch === "," || ch === ";" || ch === ":") && !isThousandsComma(raw, i)) {
      const t = buf.trim();
      if (t) parts.push(t);
      buf = "";
      continue;
    }
    if (ch === "—" || ch === "–") {
      const t = buf.trim();
      if (t) parts.push(t);
      buf = "";
    }
  }
  const tail = buf.trim();
  if (tail) parts.push(tail);
  return parts.length ? parts : [raw];
}

/** 구문 시작어 — 앞에 이미 단어가 있으면 여기서 새 구문 */
const READ_PHRASE_BOUNDARY_RE =
  /^(?:and|but|or|nor|yet|so|that|which|who|whom|whose|when|where|while|because|although|though|if|unless|than|to|of|for|with|from|into|onto|upon|by|at|in|on|as|about|over|under|after|before|without|within|through|during|against|between|among)$/i;

/** 한 구문 최대 단어 수 (밑줄이 너무 길어지지 않게) */
const READ_PHRASE_MAX_WORDS = 3;

/** 1단어 꼬리만, 합쳐도 최대 길이 넘지 않을 때 앞 구문에 붙임 */
function mergeTinyReadPhrases(chunks) {
  const out = [];
  for (const chunk of chunks) {
    const n = (String(chunk).match(/\S+/g) || []).length;
    if (!out.length) {
      out.push(chunk);
      continue;
    }
    const prevN = (out[out.length - 1].match(/\S+/g) || []).length;
    if (n === 1 && prevN + n <= READ_PHRASE_MAX_WORDS) {
      out[out.length - 1] = `${out[out.length - 1]} ${chunk}`;
    } else {
      out.push(chunk);
    }
  }
  return out;
}

/**
 * 절을 읽는 구문(2~4단어)으로 분할.
 * 전치사·접속·관계사 앞에서 끊고, 길면 최대 단어 수로 자른다.
 */
function splitClauseIntoReadPhrases(part) {
  const words = String(part || "").match(/\S+/g) || [];
  if (!words.length) return [];
  if (words.length <= 2) return [words.join(" ")];

  const chunks = [];
  let cur = [];
  for (let i = 0; i < words.length; i += 1) {
    const w = words[i];
    const core = normalizeExampleToken(w);
    const startNew =
      cur.length > 0 &&
      (READ_PHRASE_BOUNDARY_RE.test(core) || cur.length >= READ_PHRASE_MAX_WORDS);
    if (startNew) {
      chunks.push(cur.join(" "));
      cur = [w];
    } else {
      cur.push(w);
    }
  }
  if (cur.length) chunks.push(cur.join(" "));
  return mergeTinyReadPhrases(chunks);
}

/**
 * 예문을 읽는 구문 단위로 분할.
 * 하이라이트 sync가 TTS 진행에 맞춰 구문별로 이동.
 */
function splitExampleSpeechSegments(sentence) {
  const breathParts = splitByBreathMarks(sentence);
  if (!breathParts.length) return [];

  const out = [];
  for (const part of breathParts) {
    out.push(...splitClauseIntoReadPhrases(part));
  }
  return out.length ? out : breathParts;
}

/** 읽는 구간 span + 핵심 단어 mark 유지 */
function renderExampleHtml(sentence, en, highlight) {
  const chunks = splitExampleSpeechSegments(sentence);
  if (!chunks.length) return "";
  return chunks
    .map((chunk) => {
      const inner = highlightSentence(chunk, en, highlight);
      return `<span class="ex-phrase">${wrapExampleKoParens(inner)}</span>`;
    })
    .join(" ");
}

/** 예문 괄호 안 한글 — 영어보다 6px 작게 */
function wrapExampleKoParens(html) {
  return String(html || "").replace(
    /\(([^)]*[\uAC00-\uD7A3][^)]*)\)/g,
    '<span class="ex-ko">($1)</span>'
  );
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

/** DISPLAY_CONFIG.page1~page5 배열 (유효한 양수만, 최대 5개) */
function getPageSizeList() {
  const cfg = DISPLAY_CONFIG || {};
  const list = [];
  for (let i = 1; i <= 5; i += 1) {
    const n = Number(cfg[`page${i}`]);
    if (Number.isFinite(n) && n > 0) list.push(Math.floor(n));
  }
  /* 구버전 호환: wordsPerPage / nextPageSize */
  if (!list.length) {
    const first = Number(cfg.wordsPerPage);
    if (Number.isFinite(first) && first > 0) list.push(Math.floor(first));
  }
  if (!list.length) list.push(5);
  if (list.length === 1) {
    const next = Number(cfg.nextPageSize);
    if (Number.isFinite(next) && next > 0) list.push(Math.floor(next));
  }
  return list;
}

/** 첫 페이지 노출 개수 */
function getWordsPerPage() {
  return getPageSizeList()[0];
}

/** 페이지별 노출 개수 — page1~page5, 이후는 page5 반복 */
function getPageSize(pageIndex) {
  const list = getPageSizeList();
  const i = Math.max(0, Number(pageIndex) || 0);
  if (i < list.length) return list[i];
  return list[list.length - 1];
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
    if (needsStackedMeaning(w.en, w.ko, w)) {
      /* 긴 EN·구·stack:true — 한글 뜻을 영어 아래에 */
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

    /* 발음 바로 아래 — ex. + example + cf (+ translation은 PASS_CONFIG.translation) */
    const showTranslation = PASS_CONFIG?.translation !== false && w.translation;
    const cfText = String(w.cf || "").trim();
    if (w.example || showTranslation || cfText) {
      const exBlock = el("div", "example-block");
      if (w.example) {
        const ex = el("p", "example");
        /* 스피커 이모지 — absolute라 ex./예문 위치는 밀리지 않음 */
        const speakIcon = el("span", "ex-speak", "\uD83D\uDD0A"); /* 🔊 */
        speakIcon.setAttribute("aria-hidden", "true");
        const label = el("span", "ex-label", "ex. ");
        const inner = el("span", "example-inner");
        inner.innerHTML = renderExampleHtml(w.example, w.en, w.highlight);
        ex.appendChild(speakIcon);
        ex.appendChild(label);
        ex.appendChild(inner);
        exBlock.appendChild(ex);
      }
      if (cfText) {
        const cf = el("p", "ex-cf");
        cf.appendChild(el("span", "ex-cf-label", "cf. "));
        const cfBody = el("span", "ex-cf-text");
        cfBody.innerHTML = allowBreakTags(escapeHtml(cfText));
        cf.appendChild(cfBody);
        exBlock.appendChild(cf);
      }
      if (showTranslation) {
        const trans = el("p", "trans");
        const transText = el("span", "trans-text");
        transText.innerHTML = String(w.translation);
        trans.appendChild(transText);
        exBlock.appendChild(trans);
      }
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
  words.classList.add("is-quiz-hidden");
  words.style.visibility = "hidden";
}

/** 마지막 단어 페이지 — summary/quiz 직전 서서히 흐려진 뒤 숨김 */
async function fadeOutWordsOnly() {
  const words = document.getElementById("words");
  if (!words || words.classList.contains("is-quiz-hidden")) return;
  words.classList.add("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
  words.classList.add("is-quiz-hidden");
  words.style.visibility = "hidden";
  words.classList.remove("is-fading-out");
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
/* EN 왼쪽→안착 — 약 55%에 자리 잡힘(≈0.4s). 짧은 떨림 직후 낭독 */
const EN_FLY_MS = 480;
const EN_REPEAT_GAP_MS = 280;
const EN_REPEAT_DEFAULT = 1;
/* 예문 등장 — CSS ex-reveal 과 동일 (느리게 페이드·상승) */
const EX_REVEAL_MS = 1800;
/* 예문 뒤 원형 카운터 — 5→0 (각 1초) */
const EX_COUNTDOWN_FROM = 5;
const EX_COUNTDOWN_STEP_MS = 1000;

/** enRepeat: 1|2|3 — 예문 TTS 횟수에만 적용 (단어 EN은 항상 1회) */
function getWordEnRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n)) return EN_REPEAT_DEFAULT;
  return Math.max(1, Math.min(3, Math.round(n)));
}
const SUMMARY_EN_FLY_MS = EN_FLY_MS;
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
      const compound = needsStackedMeaning(en, ko, word);
      const enSlot =
        `<span class="en-slot" data-full-en="${safeEn}">` +
        `<span class="en-ghost" aria-hidden="true">${safeEn}</span>` +
        `<span class="en-fly" aria-hidden="true">${safeEn}</span>` +
        `</span>`;
      if (compound) {
        /* en+ko ≥ 22 — 한글 먼저(위), →·영어는 아래 */
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

/** summary — 한 행 영어 착지 */
async function flyInSummaryEnglishRow(row) {
  if (!row) return;
  row.classList.remove("is-en-in");
  void row.offsetWidth;
  row.classList.add("is-en-in");
  await sleep(SUMMARY_EN_FLY_MS);
}

/** summary 페이지 — DISPLAY_CONFIG.page1~page5 구간만 표시, 한글은 미리 노출 */
function showSummaryPage(rows, pageIndex, ranges) {
  const list = Array.from(rows || []);
  const range = (ranges && ranges[pageIndex]) || { start: 0, end: list.length };
  list.forEach((row, i) => {
    const onPage = i >= range.start && i < range.end;
    row.classList.toggle("is-page-hidden", !onPage);
    row.classList.remove("is-active", "is-en-in");
    if (onPage) {
      /* 한글은 페이지 진입 시 이미 보임 — 영어만 나중에 추가 */
      row.classList.add("is-ko-in");
    } else {
      row.classList.remove("is-ko-in");
    }
  });
}

/**
 * summary: DISPLAY_CONFIG n개씩 페이지
 * 한글 미리 노출 → 단어별 영어만 추가·낭독 → summaryWordHoldSec 대기
 */
async function runSummaryRecallFlow(words) {
  const rows = Array.from(document.querySelectorAll("#summary-list .summary-row"));
  if (!rows.length) return;
  const list = Array.isArray(words) ? words : [];
  const pageRanges = buildPageRanges(rows.length);
  const holdMs = getSummaryWordHoldMs();

  rows.forEach((row) => {
    row.classList.remove("is-active", "is-en-in", "is-ko-in", "is-page-hidden");
  });

  for (let page = 0; page < pageRanges.length; page += 1) {
    const { start, end } = pageRanges[page];
    showSummaryPage(rows, page, pageRanges);
    await sleep(page === 0 ? 200 : PAGE_ENTER_MS);

    for (let i = start; i < end; i += 1) {
      const row = rows[i];
      const item = list[i] || {};
      const en = stripHtml(item.en);

      row.classList.add("is-active");
      try {
        (row.querySelector(".ko") || row).scrollIntoView({ behavior: "smooth", block: "nearest" });
      } catch (_) {}

      /* 영어만 추가하며 낭독 (한글 TTS 없음) */
      await flyInSummaryEnglishRow(row);
      if (en) await playEnTTS(en);

      await sleep(holdMs);
      row.classList.remove("is-active");
    }
  }
}

/** 요약 — 이미지 숨김, DISPLAY_CONFIG n개씩·단어별 summaryWordHoldSec */
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
    /* layout 폭 사용 — getBoundingClientRect는 stage scale에 줄어듦 / SVG는 offsetWidth 없음 */
    used += child.offsetWidth || child.clientWidth || 0;
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
const AUTOPLAY_START_WAIT_MS = 200; /* TIMING_CONFIG.autoplayStartSec 미지정 시 기본 */
const EN_TO_KO_GAP_MS = 250; /* TIMING_CONFIG.enToKoSec 미지정 시 기본 */
const WORD_GAP_MS = 200; /* TIMING_CONFIG.wordHoldSec 미지정 시 기본 */
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const PAGE_ENTER_FIRST_MS = 0; /* 첫 페이지 — EN 바로 날아와 낭독 */
const PAGE_ENTER_MS = 350;
/** 1–3 → 4–6 → 7–9 페이지 넘김 대기 */
const PAGE_DONE_MS = 1500;
const PASS_GAP_MS = 400;
const SECTION_GAP_MS = 320;

/** TIMING_CONFIG.autoplayStartSec → ms */
function getAutoplayStartMs() {
  const sec = Number(TIMING_CONFIG?.autoplayStartSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return AUTOPLAY_START_WAIT_MS;
}

/** TIMING_CONFIG.enToKoSec → ms */
function getEnToKoGapMs() {
  const sec = Number(TIMING_CONFIG?.enToKoSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return EN_TO_KO_GAP_MS;
}

/** TIMING_CONFIG.wordHoldSec → ms (영어·한글 노출 후 다음 단어) */
function getWordHoldMs() {
  const sec = Number(TIMING_CONFIG?.wordHoldSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return WORD_GAP_MS;
}

/** TIMING_CONFIG.summaryWordHoldSec → ms (summary 단어별 노출) */
function getSummaryWordHoldMs() {
  const sec = Number(TIMING_CONFIG?.summaryWordHoldSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return 1500;
}
/** summary 끝난 뒤 quiz 시작 전 대기 */
const SUMMARY_TO_QUIZ_MS = 1500;
/** summary → quiz 페이드아웃 */
const SUMMARY_FADE_OUT_MS = 1100;
/** 마지막 예문 → quiz 크로스페이드 */
const WORDS_FADE_OUT_MS = 900;
const EXAMPLE_TO_QUIZ_BREATH_MS = 200;
const QUIZ_FADE_IN_MS = 900;

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** 예문 TTS용 — 화면 표기는 유지, 낭독만 교정 (Nadeau’s → Nado's / 나도스) */
function getExampleSpeakText(exampleOrWord) {
  const raw =
    exampleOrWord && typeof exampleOrWord === "object"
      ? exampleOrWord.exampleTts || exampleOrWord.example
      : exampleOrWord;
  return stripHtml(raw)
    .replace(/Nadeau['’]s/gi, "Nado's")
    .replace(/Nadeau/gi, "Nado")
    /* Republicans’ majority — 소유격 /z/ 유지, 아포스트로피에서만 끊기지 않게 */
    .replace(/\bRepublicans['’]\s+majority\b/gi, "Republicans majority");
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
  /* 예문 카라오케용 — 실제 발화 시작/끝 미리 측정 */
  detectSpeechBoundsFromAudio(audio).catch(() => null);
  return audio;
}

/**
 * TTS 버퍼에서 실제 발화 시작·끝(초)을 RMS로 측정.
 * 고정 lead/trail 추정보다 밑줄↔발음 정렬이 정확해짐.
 */
async function detectSpeechBoundsFromAudio(audio) {
  if (!audio) return null;
  if (audio.__speechBounds) return audio.__speechBounds;
  if (audio.__speechBoundsPromise) return audio.__speechBoundsPromise;

  audio.__speechBoundsPromise = (async () => {
    try {
      const src = audio.currentSrc || audio.src;
      if (!src) return null;
      const res = await fetch(src);
      if (!res.ok) return null;
      const ab = await res.arrayBuffer();
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      const ctx = new AC();
      let decoded;
      try {
        decoded = await ctx.decodeAudioData(ab.slice(0));
      } finally {
        try {
          await ctx.close();
        } catch (_) {}
      }
      const ch = decoded.numberOfChannels > 0 ? decoded.getChannelData(0) : null;
      if (!ch || !ch.length) return null;
      const sr = decoded.sampleRate || 24000;
      const win = Math.max(1, Math.floor(sr * 0.012)); /* 12ms */
      let peak = 0;
      for (let i = 0; i < ch.length; i += 1) {
        const a = Math.abs(ch[i]);
        if (a > peak) peak = a;
      }
      if (peak < 1e-5) return null;
      const thr = peak * 0.035;

      let onsetSamp = 0;
      for (let i = 0; i < ch.length; i += win) {
        let sum = 0;
        const end = Math.min(ch.length, i + win);
        for (let j = i; j < end; j += 1) sum += Math.abs(ch[j]);
        if (sum / (end - i) >= thr) {
          onsetSamp = i;
          break;
        }
      }

      let offsetSamp = ch.length;
      for (let i = ch.length - 1; i >= 0; i -= win) {
        let sum = 0;
        const start = Math.max(0, i - win + 1);
        for (let j = start; j <= i; j += 1) sum += Math.abs(ch[j]);
        if (sum / (i - start + 1) >= thr) {
          offsetSamp = i + 1;
          break;
        }
      }

      const dur = decoded.duration || ch.length / sr;
      const lead = Math.max(0, Math.min(onsetSamp / sr, dur * 0.4));
      const spokenEnd = Math.max(lead + 0.05, Math.min(offsetSamp / sr, dur));
      const trail = Math.max(0, Math.min(dur - spokenEnd, dur * 0.4));
      const bounds = { lead, trail, spokenEnd, duration: dur };
      audio.__speechBounds = bounds;
      return bounds;
    } catch (_) {
      return null;
    }
  })();

  return audio.__speechBoundsPromise;
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

/** 영문 알파벳 이름 발화 길이 (K→kay=3 …) — ALL-CAPS 약어 TTS용 */
const LETTER_NAME_WEIGHT = {
  A: 3, B: 3, C: 3, D: 3, E: 2, F: 3, G: 3, H: 5, I: 2, J: 3, K: 3, L: 2, M: 2,
  N: 2, O: 2, P: 3, Q: 3, R: 2, S: 3, T: 3, U: 3, V: 3, W: 7, X: 3, Y: 3, Z: 3
};

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

/** 영어 음절 수 추정 — TTS 타이밍은 글자수보다 음절에 더 가깝다 */
function countSyllablesEn(word) {
  let w = String(word || "").toLowerCase().replace(/[^a-z']/g, "");
  if (!w) return 1;
  w = w.replace(/'/g, "");
  if (w.length <= 3) return 1;
  /* 흔한 접미는 모음 묶음이 과대계상되므로 먼저 정규화 */
  w = w.replace(/tiones?$/, "shun");
  w = w.replace(/siones?$/, "zhun");
  w = w.replace(/(?:cious|tious)$/, "shus");
  w = w.replace(/cial$/, "shul");
  w = w.replace(/ture$/, "cher");
  w = w.replace(/(?:[^laeiouy]es|[^laeiouy]ed)$/, "");
  /* silent e: make/time — 단 VCe 이고 어간이 짧은 경우만 */
  if (/[aeiouy][^aeiouy]e$/.test(w) && !/(?:ate|ite|ute|ote|yle)$/.test(w)) {
    w = w.slice(0, -1);
  }
  w = w.replace(/^y/, "");
  const groups = w.match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

/** 발화 문자열 → TTS 가중치 (음절 기반) */
function spokenTextTimingWeight(spoken) {
  const words = String(spoken || "")
    .toLowerCase()
    .match(/[a-z']+/g);
  if (!words || !words.length) return 1;
  /* 음절×3.55 + 짧은 길이 보정 — neural TTS 길이와 맞춤 */
  return Math.max(
    1,
    words.reduce((sum, w) => sum + countSyllablesEn(w) * 3.55 + Math.min(1.1, w.length * 0.1), 0)
  );
}

/** 토큰 끝 문장부호 → TTS 휴지 가중치 (밑줄은 그 단어에 머묾) */
function punctuationPauseWeight(text) {
  const t = String(text || "").trim();
  if (!t) return 0;
  if (/(\.\.\.|…)$/.test(t)) return 3.2;
  if (/[,;:]$/.test(t)) return 2.4;
  if (/[—–-]$/.test(t)) return 2.0;
  if (/[.!?]$/.test(t)) return 3.6;
  return 0;
}

const MONEY_SCALE_RE = /^(thousand|million|billion|trillion)s?$/i;
const CURRENCY_AMOUNT_RE = /^[\$£€¥][\d,]+(?:\.\d+)?$/;
const CURRENCY_UNIT_NAME = { $: "dollars", "£": "pounds", "€": "euros", "¥": "yen" };
/** 짧게 읽히는 기능어 — 최소 가중치만 */
const SHORT_FUNCTION_WORD_RE =
  /^(a|an|the|of|to|in|on|at|for|and|or|but|as|by|from|with|is|are|was|were|be|been|being|that|this|these|those|it|its|than|then|so|if|or)$/i;

function stripExampleTokenPunct(text) {
  return String(text || "").replace(/^[^A-Za-z0-9$£€¥%]+|[^A-Za-z0-9$£€¥%]+$/g, "");
}

/**
 * TTS 하이라이트용 발화 길이 추정 (음절 중심).
 * $9.1 → "nine point one dollars", $9.1 billion → 옆 단어와 합쳐 읽힘,
 * 12% → "twelve percent", KFC → 알파벳 이름. 한글 괄호 주석 제외.
 * @param {{ nextIsMoneyScale?: boolean, moneyScaleWithUnit?: string }} [ctx]
 */
function estimateSpokenHighlightWeight(text, ctx = {}) {
  const raw = String(text || "")
    .replace(/\([^)]*[\uAC00-\uD7A3][^)]*\)/g, " ")
    .trim();
  if (!raw) return 1;

  const token = stripExampleTokenPunct(raw);

  /* billion / million … 바로 앞이 $9.1 이면 "billion dollars"로 읽힘 */
  if (ctx.moneyScaleWithUnit && MONEY_SCALE_RE.test(token)) {
    const scale = token.toLowerCase().replace(/s$/i, "");
    return spokenTextTimingWeight(`${scale} ${ctx.moneyScaleWithUnit}`);
  }

  if (SHORT_FUNCTION_WORD_RE.test(token)) {
    return 1.6;
  }

  let weight = 0;
  let remaining = raw;

  remaining = remaining.replace(/[\$£€¥]\s*[\d,]+(?:\.\d+)?/g, (m) => {
    const compact = m.replace(/\s+/g, "");
    const sym = compact[0];
    const spoken = amountNumToSpokenWordsEn(compact.slice(1));
    const unit = CURRENCY_UNIT_NAME[sym] || "dollars";
    /* $9.1 billion → 달러 단위는 scale 쪽에 붙임 */
    if (ctx.nextIsMoneyScale) {
      weight += spokenTextTimingWeight(spoken || compact);
    } else {
      weight += spokenTextTimingWeight(spoken ? `${spoken} ${unit}` : compact);
    }
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\s*%/g, (m) => {
    const num = m.replace(/[^\d.,]/g, "");
    const spoken = amountNumToSpokenWordsEn(num);
    weight += spokenTextTimingWeight(spoken ? `${spoken} percent` : m);
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\b/g, (m) => {
    const spoken = amountNumToSpokenWordsEn(m);
    weight += spokenTextTimingWeight(spoken || m);
    return " ";
  });

  const letters = remaining.replace(/[^A-Za-z']/g, "");
  if (/^[A-Z]{2,}$/.test(letters)) {
    weight += [...letters].reduce((sum, ch) => sum + (LETTER_NAME_WEIGHT[ch] || 3), 0);
  } else {
    const words = remaining.match(/[A-Za-z']+/g) || [];
    if (words.length) {
      weight += spokenTextTimingWeight(words.join(" "));
    } else if (!weight) {
      weight = 1;
    }
  }
  return Math.max(1, weight);
}

/** phrase span에서 낭독 가중치용 텍스트 (한글 주석 span 제외) */
function phraseHighlightWeightText(el) {
  if (!el) return "";
  const ko = el.querySelectorAll?.(".ex-ko");
  if (!ko || !ko.length) return el.textContent || "";
  const clone = el.cloneNode(true);
  clone.querySelectorAll(".ex-ko").forEach((n) => n.remove());
  return clone.textContent || "";
}

/** 인접 단어 맥락($9.1 billion)을 반영한 단어별 발화 가중치 */
function estimatePhraseHighlightWeights(texts) {
  const norms = texts.map((t) => stripExampleTokenPunct(String(t || "").trim()));
  const n = texts.length;
  return texts.map((text, i) => {
    const cur = norms[i];
    const next = norms[i + 1] || "";
    const prev = norms[i - 1] || "";
    const nextIsMoneyScale = MONEY_SCALE_RE.test(next);
    let moneyScaleWithUnit = "";
    if (MONEY_SCALE_RE.test(cur) && CURRENCY_AMOUNT_RE.test(prev)) {
      moneyScaleWithUnit = CURRENCY_UNIT_NAME[prev[0]] || "dollars";
    }
    let w = estimateSpokenHighlightWeight(text, { nextIsMoneyScale, moneyScaleWithUnit });
    w += punctuationPauseWeight(text);
    /* neural TTS 단어 사이 짧은 간격 */
    if (i < n - 1) w += PHRASE_HL_WORD_GAP;
    return Math.max(0.8, w);
  });
}

/** 예문 밑줄 ↔ TTS 동기 — 실측 묵음·lookahead·음절·휴지 가중치 */
const PHRASE_HL_LEAD_IN_SEC = 0.09; /* 실측 실패 시 앞 묵음 fallback */
const PHRASE_HL_TRAIL_SEC = 0.12; /* 실측 실패 시 끝 묵음 fallback */
/** 음수면 밑줄을 TTS보다 살짝 늦게 (체감상 앞서는 느낌 보정) */
const PHRASE_HL_LOOKAHEAD_SEC = -0.04;
const PHRASE_HL_WORD_GAP = 0.55; /* 단어 간 미세 간격 가중치 */

/** 예문 단어 span을 오디오 진행에 맞춰 순차 하이라이트 */
function startPhraseHighlightSync(audio, phraseEls) {
  if (!audio || !Array.isArray(phraseEls) || !phraseEls.length) return () => {};
  const texts = phraseEls.map((el) => phraseHighlightWeightText(el));
  const weights = estimatePhraseHighlightWeights(texts);
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  /* 누적 경계 [0..1] — 이진 탐색용 */
  const bounds = new Array(weights.length);
  let run = 0;
  for (let i = 0; i < weights.length; i += 1) {
    run += weights[i] / total;
    bounds[i] = run;
  }
  let current = -1;
  let raf = 0;
  let leadSec = Math.min(PHRASE_HL_LEAD_IN_SEC, 0.2);
  let trailSec = Math.min(PHRASE_HL_TRAIL_SEC, 0.25);
  let stopped = false;

  const setActive = (idx) => {
    if (idx === current) return;
    if (current >= 0 && phraseEls[current]) phraseEls[current].classList.remove("is-reading");
    current = idx;
    if (current >= 0 && phraseEls[current]) phraseEls[current].classList.add("is-reading");
  };

  const clear = () => {
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
    current = -1;
  };

  const indexAtProgress = (progress) => {
    const p = Math.min(1, Math.max(0, progress));
    let lo = 0;
    let hi = bounds.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (p < bounds[mid]) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };

  const applyMeasuredBounds = (measured) => {
    if (!measured || stopped) return;
    const dur = Number(audio.duration);
    const cap = Number.isFinite(dur) && dur > 0 ? dur * 0.4 : 0.5;
    if (Number.isFinite(measured.lead)) leadSec = Math.min(Math.max(0, measured.lead), cap);
    if (Number.isFinite(measured.trail)) trailSec = Math.min(Math.max(0, measured.trail), cap);
  };

  if (audio.__speechBounds) applyMeasuredBounds(audio.__speechBounds);
  else {
    detectSpeechBoundsFromAudio(audio)
      .then(applyMeasuredBounds)
      .catch(() => null);
  }

  const update = () => {
    raf = 0;
    const dur = audio.duration;
    if (Number.isFinite(dur) && dur > 0) {
      const lead = Math.min(leadSec, dur * 0.4);
      const trail = Math.min(trailSec, dur * 0.4);
      const effective = Math.max(0.08, dur - lead - trail);
      const rate = Number(audio.playbackRate);
      const look = PHRASE_HL_LOOKAHEAD_SEC * (Number.isFinite(rate) && rate > 0 ? rate : 1);
      const t = audio.currentTime + look;
      const progress = Math.min(1, Math.max(0, (t - lead) / effective));
      setActive(indexAtProgress(progress));
    } else if (current < 0) {
      setActive(0);
    }
    if (!stopped && !audio.paused && !audio.ended) raf = requestAnimationFrame(update);
  };

  const onTimeUpdate = () => {
    if (!raf && !stopped) raf = requestAnimationFrame(update);
  };

  clear();
  setActive(0);
  audio.addEventListener("timeupdate", onTimeUpdate);
  raf = requestAnimationFrame(update);
  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    audio.removeEventListener("timeupdate", onTimeUpdate);
    clear();
  };
}

function getExamplePhraseEls(wordEl) {
  if (!wordEl) return [];
  return [...wordEl.querySelectorAll(".example .ex-phrase")];
}

async function playAudioElement(audio, playbackRate = 1, phraseEls = null) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.currentTime = 0;

  const stopHighlight = startPhraseHighlightSync(audio, phraseEls);

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

async function playBackendTTS(text, languageKey, playbackRate = 1, phraseEls = null) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate, phraseEls);
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

/** quiz 전용 — autoplay 첫 EN 음성과 동일 (큐 소비 없음). phraseEls면 예문과 동일 밑줄 sync */
async function playEnTTSQuiz(text, phraseEls = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = firstEnTtsVoiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  console.info("[63voca] quiz EN voice (locked first)=", voice);
  await playBackendTTS(enText, voice, 1, phraseEls);
}

async function playKoTTS(rawKo) {
  if (PASS_CONFIG?.ko === false) return;
  const koText = getKoSpeakText(rawKo);
  if (!koText) return;
  const voice = nextKoVoice() || activeKoTtsVoiceId || resolveKoTtsVoiceId("ko-KR");
  await playBackendTTS(koText, voice, 1);
}

function getQuizSpeakVoice() {
  return firstEnTtsVoiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
}

/** 퀴즈 질문·정답 단어 TTS 미리 받기 — 화면 뜬 뒤 로딩 대기 방지 */
function preloadQuizAudio() {
  const voice = getQuizSpeakVoice();
  getQuizList().forEach((q) => {
    const question = String(q?.en || "").replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
    const answer = String(q?.answer || "").trim();
    if (question) loadBackendTTSAudio(question, voice).catch(() => {});
    if (answer) loadBackendTTSAudio(answer, voice).catch(() => {});
  });
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
    const example = getExampleSpeakText(word);
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
    if (example) {
      loadBackendTTSAudio(example, enVoice).catch(() => {});
    }
    if (ko && PASS_CONFIG?.ko !== false) {
      loadBackendTTSAudio(ko, koVoice).catch(() => {});
      if (koPool.length > 1) {
        loadBackendTTSAudio(ko, koPool[(i + words.length) % koPool.length]).catch(() => {});
      }
    }
  });
  preloadQuizAudio();
}

/** 1회차용: 영어 낭독 + 하이라이트 칠하기 (고정 voiceId면 그 음성으로) */
async function paintAndSpeakEn(wordEl, en, voiceId) {
  const enEl = wordEl.querySelector(".en");
  wordEl.classList.add("is-speaking");
  if (enEl) {
    enEl.classList.remove("is-hl-on", "is-hl-painting");
    void enEl.offsetWidth;
    enEl.classList.add("is-hl-painting");
  }
  const voice = voiceId || nextEnVoice() || activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  await playBackendTTS(String(en || "").trim(), voice, 1);
  if (enEl) {
    enEl.classList.remove("is-hl-painting");
    enEl.classList.add("is-hl-on");
  }
  wordEl.classList.remove("is-speaking");
}

/** 같은 EN 음성으로 text를 times회 낭독 — wordEl 있으면 스피커·음성구간 하이라이트 */
async function speakEnTimes(text, times, voiceId, wordEl) {
  const speak = stripHtml(text);
  if (!speak) return;
  const n = Math.max(1, Math.min(3, Math.round(Number(times)) || EN_REPEAT_DEFAULT));
  const voice = voiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  const icon = wordEl?.querySelector?.(".ex-speak");
  const exampleEl = wordEl?.querySelector?.(".example");
  const phraseEls = getExamplePhraseEls(wordEl);
  icon?.classList.add("is-speaking-ex");
  exampleEl?.classList.add("is-reading-example");
  try {
    for (let i = 0; i < n; i += 1) {
      await playBackendTTS(speak, voice, 1, phraseEls);
      if (i < n - 1) await sleep(EN_REPEAT_GAP_MS);
    }
  } finally {
    icon?.classList.remove("is-speaking-ex");
    exampleEl?.classList.remove("is-reading-example");
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
  }
}

/** 예문 낭독 전 원형 카운터 — 5→0 (자리는 항상 확보) */
async function runExampleCountdown(wordEl) {
  if (PASS_CONFIG?.exCountdown === false) return;
  const cd = wordEl?.querySelector(".ex-countdown");
  const numEl = cd?.querySelector(".ex-countdown-num");
  if (!cd || !numEl) return;
  cd.classList.add("is-on");
  for (let n = EX_COUNTDOWN_FROM; n >= 0; n -= 1) {
    numEl.textContent = String(n);
    numEl.classList.remove("is-tick");
    void numEl.offsetWidth;
    numEl.classList.add("is-tick");
    await sleep(EX_COUNTDOWN_STEP_MS);
  }
  cd.classList.remove("is-on");
  numEl.classList.remove("is-tick");
  numEl.textContent = String(EX_COUNTDOWN_FROM);
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

/** 2회차용: 숨겼던 영어 + 발음기호(ipa/pron) + 예문 함께 노출 */
function revealEnWithIpa(wordEl) {
  /* revealing 먼저 건 뒤 hidden 제거 — 한 프레임 영어 깜빡임 방지 */
  wordEl.classList.add("is-en-revealing", "is-ex-in");
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

/** 페이지 영어 — 왼쪽에서 한꺼번에 부드럽게 착지 */
function flyInPageEnglish(pageEls) {
  const list = Array.isArray(pageEls) ? pageEls : [];
  if (!list.length) return;
  list.forEach((wordEl) => wordEl.classList.remove("is-en-in"));
  void document.body.offsetWidth;
  list.forEach((wordEl) => wordEl.classList.add("is-en-in"));
}

/** 페이지(최대 5개) 1회차: 영어 한꺼번에 날아옴 → 착지 후 EN 낭독 → 한글 → 예문 */
async function runPass1OnPage(pageEls, pageItems, startIndex = 0) {
  const stage = document.getElementById("stage");
  stage?.classList.add("hide-meaning");
  pageEls.forEach((wordEl) => {
    wordEl.classList.remove(
      "is-revealed",
      "is-en-hidden",
      "is-pron-hidden",
      "is-en-revealing",
      "is-en-in",
      "is-ex-in"
    );
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-on", "is-hl-painting");
  });

  /* 날아오기 전에 EN TTS를 전부 받아 둠 → 착지 직후 바로 재생 */
  const pageVoices = pageEls.map((_, i) =>
    i === 0
      ? (nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1])
      : (nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1])
  );
  const preloadJobs = [];
  for (let i = 0; i < pageEls.length; i += 1) {
    const item = pageItems[i] || {};
    const enText = stripHtml(item.en || pageEls[i]?.querySelector(".en")?.textContent || "");
    const example = getExampleSpeakText(item);
    const voice = pageVoices[i];
    if (enText) preloadJobs.push(loadBackendTTSAudio(enText, voice).catch(() => null));
    if (example) preloadJobs.push(loadBackendTTSAudio(example, voice).catch(() => null));
  }
  const allReady = Promise.all(preloadJobs);

  flyInPageEnglish(pageEls);
  /* 착지(≈55%)·TTS 준비 끝나는 즉시 낭독 — 착지 후 추가 대기 없음 */
  await Promise.all([sleep(Math.round(EN_FLY_MS * 0.55)), allReady]);

  const allItems = getWordList();
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const enText = stripHtml(item.en || wordEl.querySelector(".en")?.textContent || "");
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";
    const exampleSpeak = getExampleSpeakText(item);
    const globalIdx = startIndex + i;
    const prevEn = globalIdx > 0
      ? stripHtml(String(allItems[globalIdx - 1]?.en || "")).trim().toLowerCase()
      : "";
    const sameEnAsPrev =
      !!enText && !!prevEn && enText.trim().toLowerCase() === prevEn;

    /* titlePhoto가 비어 있을 때만 단어별 image로 교체 */
    if (!String(WORDS.titlePhoto || "").trim() && item.image) {
      setTitlePhoto(item.image);
    }

    const times = getWordEnRepeatCount(item);
    const enVoice = pageVoices[i];

    if (sameEnAsPrev) {
      /* 앞 단어와 EN이 같으면 EN·한글 낭독 생략 → 뜻만 열고 예문으로 */
      const enEl = wordEl.querySelector(".en");
      enEl?.classList.add("is-hl-on");
      revealMeaning(wordEl);
      if (exampleSpeak) {
        await speakEnTimes(exampleSpeak, times, enVoice, wordEl);
      }
    } else {
      /* 단어 EN은 무조건 1회 — 캐시된 오디오 즉시 재생 */
      await paintAndSpeakEn(wordEl, enText, enVoice);

      /* EN 후 → 한글 노출 (예문은 default로 이미 노출) */
      revealMeaning(wordEl);
      if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
      await playKoTTS(ko);
      await sleep(getEnToKoGapMs());

      /* 예문: enRepeat 횟수만큼 낭독 (스피커 펄스) */
      if (exampleSpeak) {
        await speakEnTimes(exampleSpeak, times, enVoice, wordEl);
      }
    }

    await exitWordAfterMeaning(wordEl);
    await sleep(getWordHoldMs());
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
    await sleep(getEnToKoGapMs());

    /* 영어·발음·예문 노출과 동시에 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(en);
    wordEl.classList.remove("is-speaking");
    await sleep(getWordHoldMs());
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

  await sleep(getAutoplayStartMs());

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

      showWordPage(wordEls, page, pageRanges);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass1OnPage(pageEls, pageItems, start);
      /* 마지막 패스의 마지막 페이지는 PAGE_DONE 대기 생략 → 이미지 잔상 방지 */
      const isLastBeforeSummary = !doPass2 && page === pageCount - 1;
      if (!isLastBeforeSummary) await sleep(PAGE_DONE_MS);
    }
  }

  /* path2: 영어 숨김 → KO → EN(+발음·예문) */
  if (doPass2) {
    if (doPass1) await sleep(PASS_GAP_MS);

    /* 페이지를 띄우기 전에 전체 영어·발음 숨김 */
    prepareSecondPass(wordEls);
    await sleep(SECTION_GAP_MS);

    for (let page = 0; page < pageCount; page += 1) {
      const { start, end } = pageRanges[page];
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      prepareSecondPass(pageEls);
      showWordPage(wordEls, page, pageRanges);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass2OnPage(pageEls, pageItems, start);
      if (page < pageCount - 1) await sleep(PAGE_DONE_MS);
    }
  }

  const doSummary = PASS_CONFIG?.summary !== false;
  const quizzes = getQuizList();

  if (doSummary) {
    document.getElementById("title-photo")?.classList.add("is-summary-hidden");
    await fadeOutWordsOnly();
    syncOverlayTop();
    await playSummaryScreen();
    if (quizzes.length > 0) {
      await sleep(SUMMARY_TO_QUIZ_MS);
      await fadeOutSummary();
      await startReviewQuiz();
    }
    return;
  }

  /* summary off — 마지막 예문에서 quiz로 자연스럽게 크로스페이드 */
  if (quizzes.length > 0) {
    const enter = await transitionExampleToQuiz();
    await startReviewQuiz({
      alreadyEntered: true,
      skipFirstSpeak: Boolean(enter?.firstQuestionSpoken),
    });
  } else {
    document.getElementById("title-photo")?.classList.add("is-summary-hidden");
    await fadeOutWordsOnly();
  }
}

const QUIZ_COUNTDOWN_SEC = 5;
const QUIZ_ANSWER_HOLD_MS = 900;
/** 카운터 틱 소리 — false면 완전 무음 */
const COUNTDOWN_TICK_ENABLED = false;
const COUNTDOWN_TICK_SRC = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;

let countdownTickAudio = null;

function getQuizList() {
  return Array.isArray(WORDS.quiz)
    ? WORDS.quiz.filter((q) => q && q.en && q.answer && Array.isArray(q.choices) && q.choices.length >= 2)
    : [];
}

const QUIZ_CHOICE_KEYS = ["A", "B", "C", "D"];

function normalizeQuizChoices(q) {
  const ans = String(q?.answer || "").trim();
  const raw = Array.isArray(q?.choices) ? q.choices.map((c) => String(c || "").trim()).filter(Boolean) : [];
  const uniq = [];
  for (const c of raw) {
    if (!uniq.some((x) => x.toLowerCase() === c.toLowerCase())) uniq.push(c);
  }
  if (ans && !uniq.some((x) => x.toLowerCase() === ans.toLowerCase())) {
    uniq.unshift(ans);
  }
  return uniq.slice(0, 4);
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

/** 4지선다 보기 HTML */
function buildQuizChoicesHtml(choices, { revealAnswer = "", dimWrong = false } = {}) {
  const ans = String(revealAnswer || "").trim().toLowerCase();
  return choices
    .slice(0, 4)
    .map((choice, i) => {
      const key = QUIZ_CHOICE_KEYS[i] || String(i + 1);
      const text = String(choice || "").trim();
      const isCorrect = ans && text.toLowerCase() === ans;
      const cls = [
        "rv-choice",
        isCorrect ? "is-correct" : "",
        dimWrong && ans && !isCorrect ? "is-dim" : "",
      ]
        .filter(Boolean)
        .join(" ");
      return (
        `<div class="${cls}" role="listitem" data-choice="${escapeQuizHtml(text)}">` +
        `<span class="rv-choice-key">${key}</span>` +
        `<span class="rv-choice-text">${escapeQuizHtml(text)}</span>` +
        `</div>`
      );
    })
    .join("");
}

/** 퀴즈 질문 — 예문과 동일하게 읽는 구문(.ex-phrase)으로 분할 */
function formatQuizQuestionHtml(en) {
  const raw = String(en || "").trim();
  if (!raw) return "";
  const chunks = splitExampleSpeechSegments(raw);
  if (!chunks.length) return allowBreakTags(escapeQuizHtml(raw));
  return chunks
    .map((chunk) => {
      const inner = allowBreakTags(escapeQuizHtml(chunk));
      return `<span class="ex-phrase">${inner}</span>`;
    })
    .join(" ");
}

function getQuizQuestionPhraseEls() {
  const enEl = document.getElementById("rv-en");
  if (!enEl) return [];
  return [...enEl.querySelectorAll(".ex-phrase")];
}

/** 첫 quiz 문항 UI 채우기 (크로스페이드 중에도 보이게) — 영어 정의 + 4지선다 */
function fillReviewQuizCard(q, index, total, { reveal = false } = {}) {
  const titleEl = document.getElementById("rv-title");
  const promptEl = document.getElementById("rv-prompt");
  const enEl = document.getElementById("rv-en");
  const choicesEl = document.getElementById("rv-choices");
  const koEl = document.getElementById("rv-ko");
  if (!q || !enEl || !koEl) return;
  const ans = String(q.answer || "").trim();
  const choices = normalizeQuizChoices(q);
  if (titleEl) titleEl.textContent = `Review ${index + 1}/${total}`;
  if (promptEl) {
    promptEl.textContent = "";
    promptEl.hidden = true;
  }
  enEl.innerHTML = formatQuizQuestionHtml(q.en);
  if (choicesEl) {
    choicesEl.innerHTML = buildQuizChoicesHtml(choices, {
      revealAnswer: reveal ? ans : "",
      dimWrong: reveal,
    });
  }
  /* 정답 문구는 항상 넣어 두고, 노출만 opacity로 — 레이아웃 점프 방지 */
  const meaning = String(q.answerKo || q.ko || "").trim();
  koEl.hidden = false;
  koEl.innerHTML = meaning
    ? `<span class="rv-ko-hl">${escapeQuizHtml(ans)}</span> — ${escapeQuizHtml(meaning)}`
    : `<span class="rv-ko-hl">${escapeQuizHtml(ans)}</span>`;
  koEl.classList.toggle("is-revealed", Boolean(reveal));
}

/** 퀴즈 질문 낭독 (구문 밑줄 sync) */
async function speakQuizQuestion(q) {
  const enEl = document.getElementById("rv-en");
  const defSpeak = String(q?.en || "").replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
  if (!defSpeak) return;
  const phraseEls = getQuizQuestionPhraseEls();
  enEl?.classList.add("is-reading-example");
  try {
    await playEnTTSQuiz(defSpeak, phraseEls);
  } finally {
    enEl?.classList.remove("is-reading-example");
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
  }
}

/** 마지막 예문 → quiz 크로스페이드 — 보이자마자 질문 낭독 시작 */
async function transitionExampleToQuiz() {
  const quizzes = getQuizList();
  if (!quizzes.length) return { firstQuestionSpoken: false };

  const words = document.getElementById("words");
  const root = document.getElementById("review-root");
  const summary = document.getElementById("summary-root");
  if (!root) return { firstQuestionSpoken: false };

  await sleep(EXAMPLE_TO_QUIZ_BREATH_MS);

  document.getElementById("title-photo")?.classList.add("is-summary-hidden");
  syncOverlayTop();
  if (summary && !summary.hidden) {
    summary.hidden = true;
    summary.classList.remove("is-fading-out");
  }

  fillReviewQuizCard(quizzes[0], 0, quizzes.length);
  const speakText = String(quizzes[0].en || "").replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim();
  const voice = getQuizSpeakVoice();
  /* 페이드 전에 오디오 준비 — 뜬 직후 바로 재생 */
  if (speakText) {
    try {
      await loadBackendTTSAudio(speakText, voice);
    } catch (_) {}
  }

  root.hidden = false;
  root.classList.remove("is-ready");
  root.classList.add("is-entering");
  words?.classList.add("is-fading-out");

  /* 페이드와 동시에 질문 낭독 (끝날 때까지 여기서 대기하지 않음) */
  const speakPromise = speakQuizQuestion(quizzes[0]);

  await sleep(Math.max(WORDS_FADE_OUT_MS, QUIZ_FADE_IN_MS));

  hideWordsOnly();
  words?.classList.remove("is-fading-out");
  root.classList.remove("is-entering");
  root.classList.add("is-ready");

  await speakPromise;
  return { firstQuestionSpoken: Boolean(speakText) };
}

/** upgrades6 startReviewQuiz — 상단 헤더(출처·추출 어휘) 고정 */
async function startReviewQuiz(opts = {}) {
  const quizzes = getQuizList();
  if (!quizzes.length) return;

  const root = document.getElementById("review-root");
  const summary = document.getElementById("summary-root");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  if (!root || !enEl || !koEl) return;

  if (!opts.alreadyEntered) {
    hideWordsOnly();
    syncOverlayTop();
    if (summary && !summary.hidden) {
      summary.hidden = true;
      summary.classList.remove("is-fading-out");
    }
    document.getElementById("title-photo")?.classList.remove("is-summary-hidden");
    root.hidden = false;
    root.classList.add("is-ready");
  }

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    const ans = String(q.answer || "").trim();

    /* 크로스페이드로 이미 1번 문항이 채워진 경우 다시 그리지 않음 */
    if (!(opts.alreadyEntered && i === 0)) {
      fillReviewQuizCard(q, i, quizzes.length);
    }

    /* 전환 중 이미 읽은 1번 질문은 다시 읽지 않음 */
    if (!(opts.skipFirstSpeak && i === 0)) {
      await speakQuizQuestion(q);
      await sleep(280);
    }

    /* 다음 문항 TTS 미리 받기 */
    const next = quizzes[i + 1];
    if (next?.en) {
      loadBackendTTSAudio(
        String(next.en).replace(/<br\s*\/?>/gi, " ").replace(/\s+/g, " ").trim(),
        getQuizSpeakVoice()
      ).catch(() => {});
    }

    /* 5→…→0 전부 센 뒤 1초 대기 → 정답 보기 하이라이트 */
    await runCountdown(QUIZ_COUNTDOWN_SEC);
    await sleep(1000);

    fillReviewQuizCard(q, i, quizzes.length, { reveal: true });
    if (ans) await playEnTTSQuiz(ans);
    await sleep(QUIZ_ANSWER_HOLD_MS);
  }

  hideCountdownUi();
  /* 마지막 정답 노출 상태로 quiz 화면 유지 */
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
