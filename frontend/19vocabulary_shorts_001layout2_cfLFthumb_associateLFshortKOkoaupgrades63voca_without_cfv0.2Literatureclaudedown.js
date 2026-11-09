/* =====================================================================
   🔊 TTS 음성 설정 (제일 위)
   ---------------------------------------------------------------------
   enVoice / koVoice : 숫자(고정) 또는 "sequential" / "random"
   "sequential" (기본) → 1→2→3… 번호 순서, 한 바퀴 끝나면 다시 1부터
   "random" → 목록을 섞은 뒤 순서대로 (한 바퀴 끝나면 다시 섞음)
   ===================================================================== */

/** 영어 TTS 음성 목록 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Fenrir",           // 남 · 미국 · 낮고 허스키
  2: "en-US-Chirp3-HD-Charon",           // 남 · 미국 · 따뜻한 대화형
  3: "en-US-Chirp3-HD-Orus",             // 남 · 미국 · 성숙·안정
  4: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  5: "en-US-Chirp3-HD-Enceladus",        // 남 · 미국 허스키
  6: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  7: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  8: "en-GB-Wavenet-N",                 // 여 · 영국
  9: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  10: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  11: "en-GB-Wavenet-N",                 // 여 · 영국
  12: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  12: "en-GB-Chirp-HD-D",                 // 남 · 영국
  14: "en-GB-Wavenet-N",                 // 여 · 영국
  15: "en-GB-Wavenet-N",                 // 여 · 영국

};

// const EN_TTS_VOICE_IDS = {
//   1: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
//   2: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
//   3: "en-GB-Wavenet-N",                 // 여 · 영국
//   4: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
//   5: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
//   6: "en-GB-Wavenet-N",                 // 여 · 영국
//   7: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
//   8: "en-GB-Chirp-HD-D",                 // 남 · 영국
//   9: "en-GB-Wavenet-N",                 // 여 · 영국
//   10: "en-GB-Wavenet-N",                 // 여 · 영국
// };




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
 * 영어 음성 — 1~15 또는 "sequential" / "random"
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
  page1: 3,
  page2: 3,
  page3: 3,
  page4: 3,
  page5: 3,
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
  enToKoSec: 1.5,
  wordHoldSec: 3.5,
  summaryWordHoldSec: 1.5,
};

/**
 * 학습 패스 on/off
 * pass1 — true: 한글 숨김 → 영어 읽기 → 한글 노출·읽기
 * pass2 — true: 영어 숨김 → 한글 읽기 → 영어(+발음·예문) 노출·읽기
 * 둘 다 true면 1 → 2 순서로 진행
 * ko — true: 한글 뜻 TTS 낭독 / false: 한글 TTS 끔 (뜻은 화면에만 노출)
 * summary — true: 마지막 summary 실행 / false: summary 건너뜀 (quiz 있으면 quiz로)
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: false,
  ko: false, /* false면 한글 TTS off (화면 노출은 유지) */
  summary: false, /* false면 summary 생략 → quiz로 */
};

/**
 * BGM — colourchange와 동일
 * BGM_ENABLED: false=끔 / true=켬 (화면 BGM 버튼으로도 토글)
 * BGM_START_SEC: 시작 초 (화면 start로도 변경 가능)
 */
const BGM_ENABLED = false;
const BGM_START_SEC = 110;
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.02;
let bgmEnabled = BGM_ENABLED;
let bgmStartSec = Math.max(0, Math.round(Number(BGM_START_SEC) || 0));
let bgmAudio = null;

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
   단어 항목: en, ko, pos, reading, ipa, defs, example, enRepeat(1|2|3),
              highlight, translation, image,
              icon(공란 아니면 다음 단어 전 단어 위 비스듬한 V=중요), spark, note
   퀴즈 quiz[]: { en, ko, answer, answerKo, image } — upgrades6과 동일
   ===================================================================== */
const WORDS = {
  badge: "시사 영단어",

  /* 날짜 — ★ 여기 문자열만 바꾸세요 (예: "Oct. 18, 2026")  ···
   * 비우면("") 오늘 날짜 자동
   */
  date: "Nov. 08, 2026",

  /* [강조]=노랑, (강조)=미백, 그 밖=라임(녹색) — colourchange와 동일 3색
   * titleSize — 제목 글자 크기(px). ★ 여기 숫자만 바꾸세요
   * 줄마다 다르게 할 때만 size 추가: { text: "...", size: 72 }
   * 미국의 수개월간의 봉쇄로 이란의 섀도우 탱커 선단이 석유가 바닥났다.
   */
  titleSize: 70,
  title: [
    { text: "[텍사스에서 일어난 정치 혁명]" },
    { text: "#핵심어휘" },
  ],

  /* 제목 옆 증명사진(3.5×4.5) — ★ 여기 경로를 바꾸면 이미지가 바뀜
   * 비우면 재생 중 현재 단어의 image / 초기에는 words[0].image
   */
  titlePhoto: "",

  source: "The Economist",
  sourceMark: "추출어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* colourchange cardData.words 와 동일 구조 */
  words: [
    {
      "en": "iconic",
      "ko": "상징적인",
      "pos": "형",
      "reading": "아이코닉",
      "ipa": "/aɪˈkɒnɪk/",
      "defs": ["어떤 장소·시대·집단을 대표하는 상징으로 널리 알려진"],
      "example": "What will Democrats do with control of America’s most iconic red state?",
      "cf": "",
      "enRepeat": 1,
      "highlight": "iconic",
      "translation": "민주당은 미국 가장 상징적인<br>공화당 주의 권력을 어떻게 쓸 것인가?",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "America’s most<br>iconic red state",
        "text": "미국의 가장<br>상징적인 공화당 주"
      }
    },
    {
      "en": "reckon",
      "ko": "(~일 것이라고) 여기다, 추정하다",
      "pos": "동",
      "reading": "레큰",
      "ipa": "/ˈrekən/",
      "defs": ["가능성이나 결과를 어림잡아 생각하다"],
      "example": "pundits(전문가들) had reckoned he could win only narrowly.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "reckoned",
      "translation": "평론가들은 그가<br>겨우 근소하게 이길 수 있다고 여겼다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "pundits had<br>reckoned",
        "text": "평론가들은<br>~라고 추정했다"
      }
    },
    {
      "en": "sweep",
      "ko": "압승하다",
      "pos": "동",
      "reading": "스윕",
      "ipa": "/swiːp/",
      "defs": ["선거 등에서 상대를 압도하며 자리들을 휩쓸어 차지하다"],
      "example": "Democrats had swept Texas, claiming the Senate seat by a 12-point margin.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "swept",
      "translation": "민주당은 텍사스를 휩쓸며<br>상원 의석을 12포인트 차로 가져갔다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "had swept<br>Texas",
        "text": "텍사스를<br>압승으로 휩쓸었다"
      }
    },
   
    {
      "en": "dispel",
      "ko": "(오해·신화 등을) 없애다, 불식하다",
      "pos": "동",
      "reading": "디스펠",
      "ipa": "/dɪˈspel/",
      "defs": ["잘못된 생각이나 두려움 등을 없애 버리다"],
      "example": "The task now is to start dispelling these myths that they perpetuate(영속화하는, 지속하는) through Fox News.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "dispelling",
      "translation": "이제 할 일은 Fox News가 퍼뜨리는<br>이런 신화들을 불식하기 시작하는 것이다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "start dispelling<br>these myths",
        "text": "이런 신화들을<br>불식하기 시작하다"
      }
    },
    {
      "en": "steward",
      "ko": "(책임 있는) 관리자, 수호자",
      "pos": "명",
      "reading": "스튜어드",
      "ipa": "/ˈstjuːəd/",
      "defs": ["자원·제도 등을 책임감 있게 맡아 관리하는 사람"],
      "example": "…but instead be responsible stewards.(대신 책임 있는 관리자가 되는 것이다.)",
      "cf": "",
      "enRepeat": 1,
      "highlight": "stewards",
      "translation": "…그 대신 책임 있는<br>관리자가 되는 것이다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "responsible<br>stewards",
        "text": "책임 있는<br>관리자들"
      }
    },
    {
      "en": "abysmal",
      "ko": "최악의, 최저의",
      "pos": "형",
      "reading": "어비즈멀",
      "ipa": "/əˈbɪzməl/",
      "defs": ["수준이 극히 낮아 매우 형편없거나 최악인"],
      "example": "Ken Paxton, the Republican Senate nominee, was an abysmal candidate.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "abysmal",
      "translation": "공화당 상원 후보 켄 팩스턴은<br>형편없는 후보였다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {
        "phrase": "an abysmal<br>candidate",
        "text": "형편없는<br>후보"
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

/** icon 공란이 아니면 중요 표시(비스듬한 V) — 이모지는 쓰지 않음 */
function hasImportantIcon(item) {
  return String(item?.icon ?? "").trim().length > 0;
}

/** 번호 위 비스듬한 V — 왼쪽 획·오른쪽 획을 더 기울임 */
function wordImportantCheckSvg(index) {
  const gid = `word-check-grad-${index}`;
  return (
    `<svg class="word-important-check" viewBox="0 0 26 34" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="2" y1="32" x2="24" y2="0" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/>` +
    `<stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs>` +
    /* 왼쪽 조금 더 · 오른쪽 조금 더 벌어지게 */
    `<path class="word-check-left" pathLength="100" stroke="url(#${gid})" d="M1.2 17.8L7.2 29.5"/>` +
    `<path class="word-check-right" pathLength="100" stroke="url(#${gid})" d="M7.2 29.5L24.8 0.8"/>` +
    `</svg>`
  );
}

const WORD_IMPORTANT_CHECK_DRAW_MS = 640;

/** 다음 단어 전 — icon이 있으면 단어 위에 비스듬한 V 그리기 */
async function markImportantIfNeeded(wordEl, item) {
  if (!wordEl || !hasImportantIcon(item)) return;
  const check = wordEl.querySelector(".word-important-check");
  if (!check) return;
  wordEl.classList.add("is-important-checked");
  wordEl.classList.remove("is-important-check-done");
  void wordEl.offsetWidth;
  wordEl.classList.add("is-drawing-important-check");
  await sleep(WORD_IMPORTANT_CHECK_DRAW_MS);
  wordEl.classList.remove("is-drawing-important-check");
  wordEl.classList.add("is-important-check-done");
}

/* =====================================================================
   v0.3 쇼츠 업그레이드 — 진행 바 + 지금 읽는 단어 강조
   ===================================================================== */
const PROGRESS_TRACK_MAX_PX = 330; /* 진행 바 최대 폭 — 단어가 많으면 칸이 자동으로 좁아짐 */

function renderProgress() {
  const row = document.querySelector(".head-row");
  if (!row) return;
  let wrap = document.getElementById("progress");
  if (!wrap) {
    wrap = el("div", "progress");
    wrap.id = "progress";
    row.appendChild(wrap);
  }
  const total = getWordList().length;
  wrap.hidden = total === 0;
  const gap = 6;
  const segW = Math.max(8, Math.min(26, Math.floor((PROGRESS_TRACK_MAX_PX - 18 - (total - 1) * gap) / Math.max(1, total))));
  const track = el("div", "progress-track");
  for (let i = 0; i < total; i += 1) {
    const seg = el("span", "progress-seg");
    seg.style.width = `${segW}px`;
    track.appendChild(seg);
  }
  wrap.textContent = "";
  wrap.appendChild(track);
  wrap.appendChild(el("span", "progress-count"));
  setProgress(-1, 0);
}

/** current: 지금 읽는 단어 index(-1=없음), doneCount: 끝난 단어 수 */
function setProgress(current, doneCount) {
  const segs = document.querySelectorAll("#progress .progress-seg");
  const total = segs.length;
  segs.forEach((seg, i) => {
    seg.classList.toggle("is-current", i === current);
    seg.classList.toggle("is-done", i !== current && i < doneCount);
    seg.style.width = "";
  });
  const count = document.querySelector("#progress .progress-count");
  if (count) {
    const shown = current >= 0 ? current + 1 : doneCount;
    count.innerHTML = `<b>${shown}</b>/${total}`;
  }
  /* 칸 폭 — 현재 칸만 넓게 */
  const base = Math.max(8, Math.min(26, Math.floor((PROGRESS_TRACK_MAX_PX - 18 - (total - 1) * 6) / Math.max(1, total))));
  segs.forEach((seg, i) => {
    seg.style.width = `${i === current ? base + 18 : base}px`;
  });
}

function setActiveWord(wordEl, index) {
  document.querySelectorAll("#words .word.is-active-word").forEach((w) => {
    if (w !== wordEl) w.classList.remove("is-active-word");
  });
  if (!wordEl) return;
  wordEl.classList.remove("is-done-word");
  wordEl.classList.add("is-active-word");
  setProgress(index, index);
}

function setWordDone(wordEl, index) {
  if (!wordEl) return;
  wordEl.classList.remove("is-active-word");
  wordEl.classList.add("is-done-word");
  setProgress(-1, index + 1);
}

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
    /* icon 공란이 아니면 — 번호 위에 비스듬한 V(이모지 대신, 다음 단어 전에 그림) */
    if (hasImportantIcon(w)) {
      li.classList.add("has-important-icon");
      num.classList.add("has-important-icon");
      num.insertAdjacentHTML("beforeend", wordImportantCheckSvg(i));
    }
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
      pron.appendChild(el("span", "pos", w.pos)); /* v0.3 — 칩 형태라 〈〉 생략 */
    }
    li.appendChild(pron);

    /* 발음 바로 아래 — ex. + example */
    if (w.example) {
      const exBlock = el("div", "example-block");
      const ex = el("p", "example");
      const label = el("span", "ex-label", "ex. ");
      const inner = el("span", "example-inner");
      const line = el("span", "example-line example-line-main");
      line.innerHTML = wrapExampleKoParens(
        highlightSentence(w.example, w.en, w.highlight)
      );
      inner.appendChild(line);
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
  words.classList.add("is-done-hidden");
  words.style.visibility = "hidden";
  words.style.display = "none";
}

/** 마지막 단어 페이지 — 서서히 흐려진 뒤 완전 숨김 (잔상 방지) */
async function fadeOutWordsOnly() {
  const words = document.getElementById("words");
  if (!words || words.classList.contains("is-done-hidden")) return;
  words.classList.add("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
  hideWordsOnly();
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
/* EN 왼쪽→떨림 착지 — CSS wordEnFlyIn / summaryEnFlyIn 과 동일 */
/* EN 왼쪽→안착 — 약 55%에 자리 잡힘. 짧은 떨림 직후 낭독 */
const EN_FLY_MS = 480;
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

      /* 영어만 추가하며 낭독 — enRepeat회 (한글 TTS 없음) */
      await flyInSummaryEnglishRow(row);
      if (en) {
        const times = getWordEnRepeatCount(item);
        const voice = nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
        await speakEnTimes(en, times, voice);
      }

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
const MEANING_FONT_MAX = 56;
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

/** v0.3 — 한 줄에서 뜻이 이 크기(px)보다 작아지면 영어 아래 줄로 내림 */
const MEANING_STACK_BELOW_PX = 46;

/** 한 줄(EN → KO) 행을 EN 위 · → KO 아래로 전환 (영어 크기는 유지) */
function stackWordRow(row) {
  if (!row || row.classList.contains("is-compound")) return false;
  const arrow = row.querySelector(":scope > .arrow");
  const meaning = row.querySelector(":scope > .meaning");
  if (!meaning) return false;
  const meaningRow = el("div", "word-meaning-row");
  if (arrow) meaningRow.appendChild(arrow);
  meaningRow.appendChild(meaning);
  row.appendChild(meaningRow);
  row.classList.add("is-compound", "is-auto-stacked");
  row.closest(".word")?.classList.add("is-compound");
  return true;
}

/** 자동 스택 되돌리기 — 폰트 로드 후 다시 판단할 수 있게 */
function unstackWordRow(row) {
  if (!row || !row.classList.contains("is-auto-stacked")) return;
  const meaningRow = row.querySelector(":scope > .word-meaning-row");
  if (meaningRow) {
    while (meaningRow.firstChild) row.appendChild(meaningRow.firstChild);
    meaningRow.remove();
  }
  row.classList.remove("is-compound", "is-auto-stacked");
  row.closest(".word")?.classList.remove("is-compound");
}

function fitVisibleMeaningFonts() {
  /* 학습 단어 뜻만 폭에 맞춤 — 요약 en/ko 는 CSS 고정 크기 유지 */
  document.querySelectorAll(".word:not(.is-page-hidden) .word-row.is-auto-stacked").forEach(unstackWordRow);
  document.querySelectorAll(".word:not(.is-page-hidden) .meaning").forEach((el) => {
    fitMeaningFontSize(el, MEANING_FONT_MAX, MEANING_FONT_MIN);
    const size = parseFloat(el.style.fontSize) || MEANING_FONT_MAX;
    const row = el.closest(".word-row");
    if (size < MEANING_STACK_BELOW_PX && row && !row.classList.contains("is-pass2-layout") && stackWordRow(row)) {
      fitMeaningFontSize(el, MEANING_FONT_MAX, MEANING_FONT_MIN);
    }
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
const EN_REPEAT_GAP_MS = 280; /* enRepeat 추가 낭독 사이 간격 */
const EN_REPEAT_DEFAULT = 1;
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
/** 마지막 단어 → summary 페이드아웃 (summary와 동일 리듬) */
const WORDS_FADE_OUT_MS = 1100;

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** enRepeat: 1|2|3 (미지정·비정상 → 1) */
function getWordEnRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n)) return EN_REPEAT_DEFAULT;
  return Math.max(1, Math.min(3, Math.round(n)));
}

/** EN 텍스트를 times회 낭독 (같은 음성 고정) */
async function speakEnTimes(text, times, voiceId) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const n = Math.max(1, Math.min(3, Math.round(Number(times)) || EN_REPEAT_DEFAULT));
  const voice = voiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  for (let i = 0; i < n; i += 1) {
    await playBackendTTS(enText, voice, 1);
    if (i < n - 1) await sleep(EN_REPEAT_GAP_MS);
  }
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
  if (PASS_CONFIG?.ko === false) return;
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
    if (ko && PASS_CONFIG?.ko !== false) {
      loadBackendTTSAudio(ko, koVoice).catch(() => {});
      if (koPool.length > 1) {
        loadBackendTTSAudio(ko, koPool[(i + words.length) % koPool.length]).catch(() => {});
      }
    }
  });
}

/** EX 글자색 칠 — 한 자씩, 쓰는 속도 (배경 없음 · TTS 없음) */
const EX_CHAR_MS = 80;

/** 예문 텍스트 노드를 글자 단위 <span.ex-ch> 로 감싸기 (mark·ex-ko 유지) */
function wrapExChars(root) {
  if (!root || root.dataset.exChars === "1") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const texts = [];
  while (walker.nextNode()) texts.push(walker.currentNode);
  for (const textNode of texts) {
    const raw = textNode.nodeValue;
    if (raw == null || raw === "") continue;
    const frag = document.createDocumentFragment();
    for (const ch of raw) {
      const span = document.createElement("span");
      span.className = "ex-ch";
      span.textContent = ch;
      frag.appendChild(span);
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
  root.dataset.exChars = "1";
}

/** EX 예문 — 음성·배경 없이 soft mint 글자색을 한 자씩 칠하기 */
async function paintExample(wordEl) {
  const lines = Array.from(wordEl?.querySelectorAll(".example-line") || []);
  if (!lines.length) return;
  for (const line of lines) {
    wrapExChars(line);
    const chars = Array.from(line.querySelectorAll(".ex-ch"));
    for (const ch of chars) {
      ch.classList.add("is-painted");
      await sleep(EX_CHAR_MS);
    }
  }
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
  try {
    const voice = voiceId || nextEnVoice() || activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
    await playBackendTTS(String(en || "").trim(), voice, 1);
    if (enEl) {
      enEl.classList.remove("is-hl-painting");
      enEl.classList.add("is-hl-on");
    }
  } finally {
    wordEl.classList.remove("is-speaking");
  }
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

/**
 * path2 화면 순서 — 한글 왼쪽 · 영어 오른쪽 (한 줄), 발음은 영어 아래
 * (path1의 EN → KO 와 반대)
 */
function applyPass2WordLayout(wordEl) {
  if (!wordEl || wordEl.dataset.pass2Layout === "1") return;
  const row = wordEl.querySelector(".word-row");
  if (!row) return;

  const num = row.querySelector(".num");
  const enSlot = row.querySelector(".en-slot");
  const meaningRow = row.querySelector(".word-meaning-row");
  let meaning = row.querySelector(":scope > .meaning") || meaningRow?.querySelector(".meaning");
  let arrow = row.querySelector(":scope > .arrow") || meaningRow?.querySelector(".arrow");

  if (!num || !enSlot || !meaning) return;

  if (meaningRow) meaningRow.remove();
  Array.from(row.querySelectorAll(":scope > .arrow")).forEach((a) => a.remove());
  meaning.remove();
  enSlot.remove();

  row.classList.add("is-compound", "is-pass2-layout");
  row.appendChild(num);

  const koLine = el("div", "word-meaning-row word-ko-line");
  koLine.appendChild(meaning);
  row.appendChild(koLine);

  const enLine = el("div", "word-meaning-row word-en-line");
  if (arrow) {
    enLine.appendChild(arrow);
  } else {
    enLine.insertAdjacentHTML("beforeend", ARROW_SVG);
  }
  enLine.appendChild(enSlot);
  row.appendChild(enLine);

  /* 발음·예문은 이미 word-row 아래 형제 — 영어 아래에 그대로 */
  wordEl.dataset.pass2Layout = "1";
}

/** 2회차 시작 전 — 한글 보임, 영어·발음 숨김, KO→EN 레이아웃 */
function prepareSecondPass(wordEls) {
  const stage = document.getElementById("stage");
  stage?.classList.remove("hide-meaning");
  stage?.classList.add("is-pass2");
  wordEls.forEach((wordEl) => {
    wordEl.classList.remove(
      "is-gone",
      "is-swiping-out",
      "is-finale-pending",
      "is-revealing-down",
      "is-finale-in",
      "is-en-revealing",
      "is-active-word",
      "is-done-word"
    );
    wordEl.classList.add("is-revealed", "is-en-hidden", "is-pron-hidden", "is-finale-in");
    applyPass2WordLayout(wordEl);
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-painting");
    /* 하이라이트는 유지하되, 숨김 상태에서 보이지 않음 */
  });
  requestAnimationFrame(() => {
    fitVisibleMeaningFonts();
    alignTitlePhotoAboveFirstMeaning(true);
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

/** 페이지(최대 5개) 1회차: 영어 한꺼번에 날아옴 → 착지 후 바로 EN 낭독 → 한글 */
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
      "is-active-word",
      "is-done-word"
    );
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-on", "is-hl-painting");
  });

  /* 한꺼번에 날아오는 동안 첫 단어 TTS 미리 준비 */
  const firstItem = pageItems[0] || {};
  const firstEn = stripHtml(firstItem.en || pageEls[0]?.querySelector(".en")?.textContent || "");
  const firstVoice = nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  const firstReady = firstEn
    ? loadBackendTTSAudio(firstEn, firstVoice).catch(() => null)
    : Promise.resolve(null);
  /* 나머지 단어도 날아오는 동안 워밍 (음성은 읽을 때 확정) */
  for (let i = 1; i < pageEls.length; i += 1) {
    const t = stripHtml(pageItems[i]?.en || pageEls[i]?.querySelector(".en")?.textContent || "");
    if (t) loadBackendTTSAudio(t, firstVoice).catch(() => {});
  }

  flyInPageEnglish(pageEls);
  await Promise.all([sleep(EN_FLY_MS), firstReady]);

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const enText = stripHtml(item.en || wordEl.querySelector(".en")?.textContent || "");
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    /* titlePhoto가 비어 있을 때만 단어별 image로 교체 */
    if (!String(WORDS.titlePhoto || "").trim() && item.image) {
      setTitlePhoto(item.image);
    }

    const times = getWordEnRepeatCount(item);
    const enVoice = i === 0
      ? firstVoice
      : (nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1]);
    if (i > 0 && enText) {
      await loadBackendTTSAudio(enText, enVoice).catch(() => null);
    }
    /* 지금 읽는 단어 강조 + 진행 바 */
    setActiveWord(wordEl, startIndex + i);
    /* EN 1회차: 하이라이트 + 낭독, 이후 enRepeat만큼 같은 음성으로 추가 낭독 */
    await paintAndSpeakEn(wordEl, enText, enVoice);
    for (let r = 1; r < times; r += 1) {
      await sleep(EN_REPEAT_GAP_MS);
      await playBackendTTS(enText, enVoice, 1);
    }
    await sleep(getEnToKoGapMs());

    /* 한글 노출과 동시에 낭독 */
    revealMeaning(wordEl);
    if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
    await playKoTTS(ko);
    /* EX — 음성 없이 soft mint 글자색을 한 자씩 칠하기 */
    await paintExample(wordEl);
    await exitWordAfterMeaning(wordEl);
    await sleep(getWordHoldMs());
    /* icon 있으면 — 다음 단어로 넘어가기 바로 전에 중요 V */
    await markImportantIfNeeded(wordEl, item);
    setWordDone(wordEl, startIndex + i);
  }
}

/** 페이지(최대 5개) 2회차: KO 먼저 보임 → 영어(+발음은 영어 아래) 노출·낭독 */
async function runPass2OnPage(pageEls, pageItems, startIndex = 0) {
  /* EN 숨김·KO→EN 레이아웃은 페이지 표시 전에 prepareSecondPass(전체)로 처리됨 */
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = stripHtml(item.en || wordEl.querySelector(".en")?.textContent || "");
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";
    const times = getWordEnRepeatCount(item);

    setActiveWord(wordEl, startIndex + i);
    await playKoTTS(ko);
    await sleep(getEnToKoGapMs());

    /* 영어·발음 노출과 동시에 enRepeat회 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    const enVoice = nextEnVoice() || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
    await speakEnTimes(en, times, enVoice);
    wordEl.classList.remove("is-speaking");
    /* EX — 음성 없이 soft mint 글자색을 한 자씩 칠하기 */
    await paintExample(wordEl);
    await sleep(getWordHoldMs());
    /* icon 있으면 — 다음 단어로 넘어가기 바로 전에 중요 V */
    await markImportantIfNeeded(wordEl, item);
    setWordDone(wordEl, startIndex + i);
  }
}

function ensureBgmAudio() {
  if (bgmAudio) return bgmAudio;
  bgmAudio = new Audio(encodeURI(BGM_SRC));
  bgmAudio.loop = false;
  bgmAudio.preload = "auto";
  bgmAudio.volume = BGM_VOLUME;
  return bgmAudio;
}

function getBgmStartSec() {
  return Math.max(0, Math.round(Number(bgmStartSec) || 0));
}

function clampBgmStartSec(sec, duration) {
  let startSec = Math.max(0, Math.round(Number(sec) || 0));
  if (Number.isFinite(duration) && duration > 1) {
    startSec = Math.max(0, Math.min(startSec, duration - 1));
  }
  return startSec;
}

function formatBgmStartLabel(sec) {
  const total = Math.max(0, Math.round(Number(sec) || 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function syncBgmStartInput() {
  const input = document.getElementById("bgm-start-sec");
  const label = document.getElementById("bgm-start-label");
  const value = getBgmStartSec();
  if (input && document.activeElement !== input) {
    input.value = String(value);
  }
  if (label) label.textContent = formatBgmStartLabel(value);
}

function setBgmStartSecFromInput(rawValue, { restartIfPlaying = true } = {}) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed < 0) {
    syncBgmStartInput();
    return;
  }
  bgmStartSec = Math.max(0, Math.round(parsed));
  syncBgmStartInput();
  if (!bgmAudio) return;
  try {
    const startSec = clampBgmStartSec(bgmStartSec, Number(bgmAudio.duration));
    const wasPlaying = !bgmAudio.paused && !bgmAudio.ended;
    bgmAudio.currentTime = startSec;
    if (restartIfPlaying && wasPlaying && bgmEnabled) {
      void bgmAudio.play().catch(() => {});
    }
  } catch (_) {}
}

function hideBgmControls() {
  const bgmBtn = document.getElementById("bgm-btn");
  const startWrap = document.getElementById("bgm-start-wrap");
  if (bgmBtn) bgmBtn.hidden = true;
  if (startWrap) {
    startWrap.hidden = true;
    startWrap.style.display = "none";
  }
}

async function startBgm() {
  if (!bgmEnabled) {
    stopBgm();
    return;
  }
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
    audio.currentTime = clampBgmStartSec(getBgmStartSec(), Number(audio.duration));
    await audio.play();
  } catch (_) {
    /* 자동재생 정책 등으로 실패해도 TTS는 진행 */
  }
}

function stopBgm() {
  if (!bgmAudio) return;
  try {
    bgmAudio.pause();
    bgmAudio.currentTime = clampBgmStartSec(getBgmStartSec(), Number(bgmAudio.duration));
  } catch (_) {}
}

function syncBgmButton() {
  const btn = document.getElementById("bgm-btn");
  if (!btn) return;
  btn.classList.toggle("is-on", bgmEnabled);
  btn.classList.toggle("is-off", !bgmEnabled);
  btn.setAttribute("aria-pressed", bgmEnabled ? "true" : "false");
  btn.title = bgmEnabled
    ? "With You - Everet Almond on (클릭=끔)"
    : "With You - Everet Almond off (클릭=켬)";
  btn.textContent = bgmEnabled ? "BGM on" : "BGM off";
  syncBgmStartInput();
}

async function toggleBgm() {
  bgmEnabled = !bgmEnabled;
  syncBgmButton();
  if (bgmEnabled) {
    await startBgm();
  } else {
    stopBgm();
  }
}

function setupBgmControls() {
  syncBgmButton();
  document.getElementById("bgm-btn")?.addEventListener("click", () => {
    toggleBgm().catch(() => {});
  });
  const bgmStartInput = document.getElementById("bgm-start-sec");
  if (bgmStartInput) {
    bgmStartInput.addEventListener("change", () => {
      setBgmStartSecFromInput(bgmStartInput.value);
    });
    bgmStartInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setBgmStartSecFromInput(bgmStartInput.value);
        bgmStartInput.blur();
      }
    });
  }
}

async function runAutoplay() {
  const btn = document.getElementById("autoplay");
  if (btn) {
    btn.hidden = true;
    btn.remove();
  }
  hideBgmControls();

  const stage = document.getElementById("stage");
  stage.classList.add("hide-meaning", "is-playing");

  resolveConfiguredEnVoice();
  resolveConfiguredKoVoice();
  preloadAutoplayAudio(getWordList());

  if (bgmEnabled) {
    await startBgm();
  } else {
    stopBgm();
  }

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
    setProgress(-1, 0);
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

  /* summary/quiz로 넘어갈 때만 단어 숨김 — 없으면 예문 끝난 화면 그대로 유지 */
  if (doSummary || quizzes.length > 0) {
    document.getElementById("title-photo")?.classList.add("is-summary-hidden");
    await fadeOutWordsOnly();
    syncOverlayTop();
  }

  if (doSummary) {
    await playSummaryScreen();
  }

  if (quizzes.length > 0) {
    if (doSummary) {
      await sleep(SUMMARY_TO_QUIZ_MS);
      await fadeOutSummary();
    }
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
renderProgress();
renderTitle();
renderWords();
renderMeta();
renderDate();
setupBgmControls();
setupAutoplay();
fitStage();
syncOverlayTop();
requestAnimationFrame(() => {
  fitVisibleMeaningFonts();
  cachedTitlePhotoTranslateY = null;
  alignTitleBelowBadge();
  alignTitlePhotoAboveFirstMeaning(true);
});
/* 웹폰트 로드 후 폭 재계산 — 대체 폰트 기준으로 잘못 줄바꿈되는 것 방지 */
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => {
    fitVisibleMeaningFonts();
    cachedTitlePhotoTranslateY = null;
    alignTitleBelowBadge();
    alignTitlePhotoAboveFirstMeaning(true);
  });
}
window.addEventListener("resize", () => {
  fitStage();
  syncOverlayTop();
  cachedTitlePhotoTranslateY = null;
  alignTitleBelowBadge();
  alignTitlePhotoAboveFirstMeaning(true);
});
