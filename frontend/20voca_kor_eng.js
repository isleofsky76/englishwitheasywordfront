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
  // 2: "en-US-Casual-K",                 // 여 · 미국
  // 3: "en-US-Chirp3-HD-Achird",                 // 여 · 미국
  // 1: "en-US-News-N",                 // 남 · 미국
  // 2: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  // 3: "en-US-Chirp3-HD-Enceladus",        // 남 · 미국 허스키
  // 4: "en-US-Chirp-HD-F",                 // 여 · 미국
  // 5: "en-US-Chirp3-HD-Despina",          // 여 · 미국
  // 6: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  // 7: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  // 8: "en-GB-Chirp-HD-D",                 // 남 · 영국
  // 9: "en-GB-Neural2-B",                  // 남 · 영국
  // 10: "en-GB-Wavenet-N",                 // 여 · 영국
  // 11: "en-US-News-N",                    // 남 · 미국 뉴스
  // 12: "en-US-News-K",                    // 여 · 미국 뉴스
//   en-US-Chirp-HD-D
// en-US-Casual-K
// en-US-Chirp3-HD-Achird
};

/** 한글 TTS 음성 목록 */
const KO_TTS_VOICE_IDS = {
  1: "ko-KR-Chirp3-HD-Zephyr",           // 여 · 부드러운
  // 2: "ko-KR-Neural2-C",                  // 남 · Neural2
  // 3: "ko-KR-Chirp3-HD-Achernar",         // 여 · 차분
  // 4: "ko-KR-Chirp3-HD-Achird",           // 여 · 밝은
  // 5: "ko-KR-Chirp3-HD-Vindemiatrix",     // 여 · 성숙
  // 6: "ko-KR-Chirp3-HD-Zubenelgenubi",    // 남 · Chirp3
  // 7: "ko-KR-Chirp3-HD-Charon",           // 남 · Chirp3
  // 8: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  // 9: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  // 10: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  // 11: "ko-KR",                            // 기본
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
 * 화면 표시
 * wordsPerPage — 한 화면에 보이는 단어 수 (예: 5 → 1~5, 다음 6~10)
 */
const DISPLAY_CONFIG = {
  wordsPerPage: 1,
};

/**
 * 학습 패스 on/off — 20voca_kor_eng: 한글 → 영어
 * pass1 — true: 한글 낭독 → 1.5초 → 영어(+예문·번역) 노출·낭독
 * pass2 — 미사용
 * speakKo — true면 한글 TTS
 * runSummary — false면 summary·quiz 없이 단어 패스 후 멈춤
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: false,
  speakKo: true,
  runSummary: false,
};

/**
 * 타이밍 (초)
 * wordGapSec     — 단어 → 다음 단어로 넘어가기 전 대기
 * koHoldSec      — 한글 낭독 후 → 영어 노출 전 대기 (1.5초)
 * enRepeatGapSec — enRepeat 반복 낭독 사이 간격 (기본 1)
 */
const TIMING_CONFIG = {
  wordGapSec: 1,
  koHoldSec: 1.5,
  enRepeatGapSec: 1,
};

/** 영어 미리보기: 앞 3글자 + 나머지 _ , 괄호 표시. 3글자 이하는 미리보기 없음 */
const EN_PREVIEW_LETTERS = 3;

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

  title: [
    { hl: "자녀 성적 때문에 학교를 고소하는 부모들 #갈등 #소송 #연관단어" },
    { hl: "" },
  ],

  source: "출처 : The Wall Street Journal",
  sourceMark: "추출 어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* WSJ — 갈등·소송 어휘 20 (예문=원문) */
  words: [
    {
      "en": "sue",
      "ko": "고소하다",
      "pos": "동",
      "reading": "수",
      "ipa": "/suː/",
      "defs": "",
      "example": "The Parents Suing Schools Because Their Kids Got Bad Grades",
      "cf": "(1) sue for(…을 이유로 고소하다)",
      "enRepeat": 1,
      "highlight": "Suing",
      "translation": "자녀가 나쁜 성적을 받았다고<br>학교를 고소하는 부모들",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "stack": false,
      "note": ""
    },
    {
      "en": "lawsuit",
      "ko": "소송, 고소",
      "pos": "명",
      "reading": "로수트",
      "ipa": "/ˈlɔːsuːt/",
      "defs": "",
      "example": "In a lawsuit filed in October, Luo calls the teacher’s comments “inaccurate and unsubstantiated”...",
      "cf": "(1) file a lawsuit(소송을 제기하다)",
      "enRepeat": 1,
      "highlight": "lawsuit",
      "translation": "10월에 제기된 소송에서 루오는<br>교사 평가를 “부정확하고<br>근거 없다”고 주장한다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "spat",
      "ko": "말다툼, 티격태격",
      "pos": "명",
      "reading": "스팻",
      "ipa": "/spæt/",
      "defs": "",
      "example": "What began last fall as a playground spat between third-graders has now escalated into a courtroom brawl...",
      "cf": "(1) escalate(격화되다) (2) courtroom brawl(법정 공방)",
      "enRepeat": 1,
      "highlight": "spat",
      "translation": "작년 가을 초등 3학년들의<br>운동장 티격태격에서 시작된 일이<br>이제는 법정 공방으로 번졌다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "escalate",
      "ko": "격화되다, 악화되다",
      "pos": "동",
      "reading": "에스컬레이트",
      "ipa": "/ˈeskəleɪt/",
      "defs": "",
      "example": "...has now escalated into a courtroom brawl: In a lawsuit filed in October...",
      "cf": "(1) escalate into(…으로 번지다)",
      "enRepeat": 1,
      "highlight": "escalated",
      "translation": "이제는 법정 공방으로 격화됐다.<br>10월에 제기된 소송에서…",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "courtroom brawl",
      "ko": "법정 공방, 법정 다툼",
      "pos": "명",
      "reading": "코트룸 브롤",
      "ipa": "/ˈkɔːrtruːm brɔːl/",
      "defs": "",
      "example": "...has now escalated into a courtroom brawl...",
      "cf": "(1) brawl(싸움·격렬한 다툼)",
      "enRepeat": 1,
      "highlight": "courtroom brawl",
      "translation": "이제는 법정 공방으로 번졌다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "adversarial",
      "ko": "적대적인, 대립적인",
      "pos": "형",
      "reading": "애드버세리얼",
      "ipa": "/ˌædvərˈseriəl/",
      "defs": "",
      "example": "Today, they often take a more adversarial approach, educators say...",
      "cf": "(1) approach(태도·접근)",
      "enRepeat": 1,
      "highlight": "adversarial",
      "translation": "오늘날 부모들은 더 적대적인<br>태도를 취한다고 교육자들은 말한다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "lean on",
      "ko": "압박하다, 압력을 넣다",
      "pos": "구",
      "reading": "린 온",
      "ipa": "/liːn ɑːn/",
      "defs": "",
      "example": "...leaning on teachers and administrators to change grades in disputes that can even spill into court.",
      "cf": "(1) dispute(분쟁) (2) spill into(…으로 번지다)",
      "enRepeat": 1,
      "highlight": "leaning on",
      "translation": "교사·행정가에게 성적 변경을 압박하며,<br>그 분쟁은 법정으로까지 번질 수 있다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "dispute",
      "ko": "분쟁, 다툼",
      "pos": "명",
      "reading": "디스퓨트",
      "ipa": "/dɪˈspjuːt/",
      "defs": "",
      "example": "...to change grades in disputes that can even spill into court.",
      "cf": "(1) resolve a dispute(분쟁을 해결하다)",
      "enRepeat": 1,
      "highlight": "disputes",
      "translation": "법정으로까지 번질 수 있는<br>성적 변경 분쟁에서…",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "spill into",
      "ko": "(갈등 등이) …로 번지다",
      "pos": "구",
      "reading": "스필 인투",
      "ipa": "/spɪl ˈɪntuː/",
      "defs": "",
      "example": "...in disputes that can even spill into court.",
      "cf": "(1) spill over(확산되다)",
      "enRepeat": 1,
      "highlight": "spill into",
      "translation": "법정으로까지 번질 수 있는 분쟁에서…",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "pressure",
      "ko": "압력, 압박",
      "pos": "명",
      "reading": "프레셔",
      "ipa": "/ˈpreʃər/",
      "defs": "",
      "example": "Four in 10 American teachers report facing pressure from moms and dads to change grades...",
      "cf": "(1) face pressure(압력에 직면하다)",
      "enRepeat": 1,
      "highlight": "pressure",
      "translation": "미국 교사 10명 중 4명이<br>성적 변경을 요구하는<br>학부모 압력에 시달린다고 답했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "go to battle",
      "ko": "싸움을 걸다, 맞서 싸우다",
      "pos": "구",
      "reading": "고 투 배틀",
      "ipa": "/ɡoʊ tə ˈbætl/",
      "defs": "",
      "example": "“Especially if they get a bad grade,” she added, “the parents go to battle for them.”",
      "cf": "(1) go to bat for(~을 위해 나서다)",
      "enRepeat": 1,
      "highlight": "go to battle",
      "translation": "“특히 나쁜 성적을 받으면<br>부모들이 아이들을 위해<br>싸움을 건다”고 그녀는 덧붙였다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "accuse",
      "ko": "비난하다, 고발하다",
      "pos": "동",
      "reading": "어큐즈",
      "ipa": "/əˈkjuːz/",
      "defs": "",
      "example": "Her resignation letter accused district officials of fabricating a grade to “appease an irate parent”...",
      "cf": "(1) accuse A of B(A를 B로 비난하다)",
      "enRepeat": 1,
      "highlight": "accused",
      "translation": "사직서에서 그녀는 교육구 관계자들이<br>성적을 조작했다고 비난했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "fabricate",
      "ko": "조작하다, 날조하다",
      "pos": "동",
      "reading": "패브리케이트",
      "ipa": "/ˈfæbrɪkeɪt/",
      "defs": "",
      "example": "...accused district officials of fabricating a grade to “appease an irate parent”...",
      "cf": "(1) fabricate evidence(증거를 조작하다)",
      "enRepeat": 1,
      "highlight": "fabricating",
      "translation": "화난 학부모를 달래려고<br>성적을 조작했다고 비난했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "appease",
      "ko": "달래다, 무마하다",
      "pos": "동",
      "reading": "어피즈",
      "ipa": "/əˈpiːz/",
      "defs": "",
      "example": "...fabricating a grade to “appease an irate parent”...",
      "cf": "(1) appease anger(분노를 가라앉히다)",
      "enRepeat": 1,
      "highlight": "appease",
      "translation": "“격노한 학부모를 달래기 위해”<br>성적을 조작했다는 내용이다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "irate",
      "ko": "분노한, 격노한",
      "pos": "형",
      "reading": "아이레이트",
      "ipa": "/aɪˈreɪt/",
      "defs": "",
      "example": "...to “appease an irate parent” whose child had repeatedly failed to turn in an art assignment...",
      "cf": "(1) an irate customer(화난 고객)",
      "enRepeat": 1,
      "highlight": "irate",
      "translation": "과제를 반복해 내지 않은<br>자녀를 둔 격노한 학부모를<br>달래려 했다는 것이다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "accountability",
      "ko": "책임, 책임성",
      "pos": "명",
      "reading": "어카운터빌리티",
      "ipa": "/əˌkaʊntəˈbɪləti/",
      "defs": "",
      "example": "“There’s no accountability, so they learn that it doesn’t matter what their work ethic is,” Hardcastle told The Wall Street Journal.",
      "cf": "(1) hold someone accountable(책임을 묻다)",
      "enRepeat": 1,
      "highlight": "accountability",
      "translation": "“책임이 없으니 아이들은<br>노력 윤리가 중요하지 않다고<br>배운다”고 하드캐슬은 말했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "litigation",
      "ko": "소송, 법적 공방",
      "pos": "명",
      "reading": "리티게이션",
      "ipa": "/ˌlɪtɪˈɡeɪʃn/",
      "defs": "",
      "example": "After months of litigation, Kato dropped the suit in September.",
      "cf": "(1) drop the suit(소송을 취하하다)",
      "enRepeat": 1,
      "highlight": "litigation",
      "translation": "수개월간의 법적 공방 끝에<br>카토는 9월에 소송을 취하했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "due process",
      "ko": "적법 절차",
      "pos": "명",
      "reading": "듀 프로세스",
      "ipa": "/ˌduː ˈprɑːses/",
      "defs": "",
      "example": "If you’re going to accuse a student of using AI you need to ... give them the proper due process.",
      "cf": "(1) accuse(비난·고발하다)",
      "enRepeat": 1,
      "highlight": "due process",
      "translation": "학생이 AI를 썼다고 비난하려면<br>적절한 적법 절차를 보장해야 한다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "unsubstantiated",
      "ko": "근거 없는, 입증되지 않은",
      "pos": "형",
      "reading": "언섭스탠시에이티드",
      "ipa": "/ˌʌnsəbˈstænʃieɪtɪd/",
      "defs": "",
      "example": "...Luo calls the teacher’s comments “inaccurate and unsubstantiated,” and is asking a judge to order the district to rehear her case.",
      "cf": "(1) inaccurate(부정확한) (2) rehear(재심하다)",
      "enRepeat": 1,
      "highlight": "unsubstantiated",
      "translation": "루오는 교사 평가가 “부정확하고<br>근거 없다”며 판사에게<br>재심을 명령해 달라고 요청한다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
    {
      "en": "petition",
      "ko": "청원, 신청서",
      "pos": "명",
      "reading": "퍼티션",
      "ipa": "/pəˈtɪʃn/",
      "defs": "",
      "example": "“The district follows that process and will respond to the petition in court,” White said.",
      "cf": "(1) challenge grades(성적에 이의를 제기하다)",
      "enRepeat": 1,
      "highlight": "petition",
      "translation": "“교육구는 그 절차를 따르며<br>법정에서 청원에 답변할 것”이라고<br>화이트는 말했다.",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": ""
    },
  ],

  /**
   * Review 퀴즈 — 최신 words 기준 2문제
   * { en, ko, answer, answerKo, image }
   */
  // quiz: [
  //   {
  //     en: "The system cannot que___ the public thirst<br> for locking people up.",
  //     ko: "현재 시스템은 사람들을 가두려는<br>  대중의 갈증을 (해소하지) 못한다.",
  //     answer: "quench",
  //     answerKo: "갈증·욕구를 해소하다",
  //     image: "quench.png",
  //   },
  //   {
  //     en: "It would take bravery to end the pre_____<br> that prison works.",
  //     ko: "교도소가 효과 있다는 (가장)을<br>  끝내려면 용기가 필요하다.",
  //     answer: "pretence",
  //     answerKo: "…인 체함, 주장, 과시",
  //     image: "pretence.png",
  //   },
  // ],
};

const WORD_COLORS = ["#e06a4f", "#3e6fd8", "#3a9a6b", "#c23b3b", "#8b5cf6", "#0d9488"];

const ARROW_SVG =
  '<svg class="arrow" width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">' +
  '<path d="M3 12 H 28 M20 4 L 29 12 L 20 20" fill="none" stroke="#2d4f9e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function allowBreakTags(escapedHtml) {
  return String(escapedHtml || "").replace(/&lt;br\s*\/?&gt;/gi, "<br>");
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 예문 — highlight 단어 mark */
function highlightSentence(sentence, target) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  const safe = escapeHtml(raw);
  const t = String(target || "").trim();
  if (!t) return safe;
  const re = new RegExp(`\\b(${escapeRegExp(t)})\\b`, "i");
  return safe.replace(re, "<mark>$1</mark>");
}

/** 예문 괄호 안 한글 — 영어보다 4px 작게 */
function wrapExampleKoParens(html) {
  return String(html || "").replace(
    /\(([^)]*[\uAC00-\uD7A3][^)]*)\)/g,
    '<span class="ex-ko">($1)</span>'
  );
}

function normalizeExampleToken(word) {
  return String(word || "")
    .replace(/^[^A-Za-z0-9$%']+|[^A-Za-z0-9$%']+$/g, "")
    .toLowerCase();
}

function isThousandsComma(raw, index) {
  return (
    raw[index] === "," &&
    /\d/.test(raw[index - 1] || "") &&
    /\d/.test(raw[index + 1] || "")
  );
}

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
    if (ch === "|") {
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

const READ_PHRASE_BOUNDARY_RE =
  /^(?:and|but|or|nor|yet|so|that|which|who|whom|whose|when|where|while|because|although|though|if|unless|than|to|of|for|with|from|into|onto|upon|by|at|in|on|as|about|over|under|after|before|without|within|through|during|against|between|among)$/i;
const READ_PHRASE_MAX_WORDS = 1;

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

function splitExampleSpeechSegments(sentence) {
  const breathParts = splitByBreathMarks(sentence);
  if (!breathParts.length) return [];
  const out = [];
  for (const part of breathParts) out.push(...splitClauseIntoReadPhrases(part));
  return out.length ? out : breathParts;
}

/** 읽는 구간 span + 핵심 단어 mark */
function renderExampleHtml(sentence, highlight) {
  const chunks = splitExampleSpeechSegments(sentence);
  if (!chunks.length) return "";
  return chunks
    .map((chunk) => {
      const inner = highlightSentence(chunk, highlight);
      return `<span class="ex-phrase">${wrapExampleKoParens(inner)}</span>`;
    })
    .join(" ");
}

/** en 글자 수 + ko(공백 제외) — 이 값 이상이면 화살표·뜻을 영어 아래 줄에
 * word.stack === true 강제 아래 / false 강제 한 줄
 */
const STACK_EN_KO_CHAR_LIMIT = 18;

function needsStackedMeaning(en, ko, word) {
  if (word && word.stack === true) return true;
  if (word && word.stack === false) return false;
  const enLen = String(en || "").trim().length;
  const koLen = String(ko || "").replace(/\s+/g, "").length;
  return enLen + koLen >= STACK_EN_KO_CHAR_LIMIT;
}

function getWordList() {
  return Array.isArray(WORDS.words) ? WORDS.words : [];
}

function renderHoles() {
  const holes = document.getElementById("holes");
  if (!holes) return;
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

function renderTitle() {
  const titleEl = document.getElementById("title");
  if (!titleEl) return;
  titleEl.textContent = "";

  (WORDS.title || []).forEach((line, i) => {
    if (i > 0) titleEl.appendChild(document.createElement("br"));
    if (line.hl) {
      titleEl.appendChild(el("span", "hl", line.hl));
    }
    if (line.after) {
      titleEl.appendChild(document.createTextNode(line.after));
    }
    if (line.text && !line.hl) {
      titleEl.appendChild(document.createTextNode(line.text));
    }
  });
}

function getWordsPerPage() {
  const n = Number(DISPLAY_CONFIG?.wordsPerPage);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 5;
}

function showWordPage(wordEls, pageIndex) {
  const pageSize = getWordsPerPage();
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  wordEls.forEach((wordEl, i) => {
    wordEl.classList.toggle("is-page-hidden", i < start || i >= end);
  });
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

function showAllWords(wordEls) {
  wordEls.forEach((wordEl) => wordEl.classList.remove("is-page-hidden"));
}

/** 영어 미리보기: (law_____) — 앞 3글자 + 나머지 _. 3글자 이하(sue 등)는 빈 문자열 */
function buildEnPreviewHint(en) {
  const raw = String(en || "").trim();
  const total = countEnLetters(raw);
  if (total <= EN_PREVIEW_LETTERS) return "";
  const body = buildEnPartialReveal(raw, EN_PREVIEW_LETTERS);
  return "(" + body + ")";
}

/** 글자 단위로 n개 영어 알파벳까지 노출, 나머지는 _ */
function buildEnPartialReveal(en, letterCount) {
  const raw = String(en || "");
  let seen = 0;
  let out = "";
  for (let i = 0; i < raw.length; i += 1) {
    const ch = raw[i];
    if (/[A-Za-z]/.test(ch)) {
      seen += 1;
      out += seen <= letterCount ? ch : "_";
    } else {
      out += ch;
    }
  }
  return out;
}

function countEnLetters(en) {
  return (String(en || "").match(/[A-Za-z]/g) || []).length;
}

function renderWords() {
  const list = document.getElementById("words");
  if (!list) return;
  list.textContent = "";

  const pageSize = getWordsPerPage();
  getWordList().forEach((w, i) => {
    const li = el("li", "word is-answer-hidden is-ex-hidden is-pron-hidden is-revealed");
    /* 처음엔 1~n만 표시 */
    if (i >= pageSize) li.classList.add("is-page-hidden");

    const row = el("div", "word-row word-row--ko-first");
    const num = el("span", "num", String(i + 1));
    num.style.background = w.color || WORD_COLORS[i % WORD_COLORS.length];
    row.appendChild(num);

    /* KO 먼저 (질문) */
    row.appendChild(el("span", "meaning", w.ko));
    row.insertAdjacentHTML("beforeend", ARROW_SVG);

    const hlClass = w.hl || (i % 2 === 0 ? "hl" : "hlpink");
    const enWrap = el("span", "en-wrap");
    const hint = buildEnPreviewHint(w.en);
    const preview = el("span", "en-preview", hint);
    if (!hint) preview.hidden = true;
    const enFull = el("span", "en " + hlClass, w.en);
    enFull.dataset.full = w.en;
    enWrap.appendChild(preview);
    enWrap.appendChild(enFull);
    row.appendChild(enWrap);
    li.appendChild(row);

    const pron = el("div", "pron");
    pron.appendChild(el("span", null, "[" + (w.reading || "") + "]"));
    pron.appendChild(el("span", "ipa", w.ipa || ""));
    if (w.pos) {
      pron.appendChild(el("span", "pos", "〈" + w.pos + "〉"));
    }
    li.appendChild(pron);

    /* 예문 + 번역 — 영어 노출과 함께 표시 */
    const cfText = String(w.cf || "").trim();
    const translation = String(w.translation || "").trim();
    if (w.example || cfText || translation) {
      const exBlock = el("div", "example-block");
      if (w.example) {
        const ex = el("p", "example");
        const label = el("span", "ex-label", "ex. ");
        const inner = el("span", "example-inner");
        inner.innerHTML = renderExampleHtml(w.example, w.highlight || w.en);
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
      if (translation) {
        const tr = el("p", "translation");
        tr.innerHTML = allowBreakTags(escapeHtml(translation));
        exBlock.appendChild(tr);
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
  words.style.visibility = "hidden";
}

/** 마지막 단어 페이지 — summary처럼 서서히 흐려진 뒤 숨김 */
async function fadeOutWordsOnly() {
  const words = document.getElementById("words");
  if (!words || words.style.visibility === "hidden") return;
  words.classList.add("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
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

/** 비스듬한 V 체크 — colourchange와 동일 (짧은 획 → 긴 획) */
function summaryCheckSvg(index) {
  const gid = `summary-check-grad-${index}`;
  return (
    `<svg class="summary-check" viewBox="0 0 22 32" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/>` +
    `<stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs>` +
    `<path class="summary-check-left" pathLength="100" stroke="url(#${gid})" d="M3.4 20.3L7 28"/>` +
    `<path class="summary-check-right" pathLength="100" stroke="url(#${gid})" d="M7 28L21.2 1.4"/>` +
    `</svg>`
  );
}

const EN_KO_WRAP_CHAR_LIMIT = 20;
const SUMMARY_CHECK_DRAW_MS = 640;
const SUMMARY_CHECK_GAP_MS = 300; /* 리듬: 500→300 */

function syncSummaryKoWrap() {
  document.querySelectorAll("#summary-list .summary-titles").forEach((wrap) => {
    const en = wrap.querySelector(".en");
    const ko = wrap.querySelector(".ko");
    if (!en || !ko) {
      wrap.classList.remove("is-ko-wrapped");
      return;
    }
    const count =
      String(en.textContent || "").trim().length +
      String(ko.textContent || "").replace(/\s+/g, "").length;
    wrap.classList.toggle("is-ko-wrapped", count > EN_KO_WRAP_CHAR_LIMIT);
  });
}

function renderSummaryList(words) {
  const listEl = document.getElementById("summary-list");
  if (!listEl) return;
  const list = Array.isArray(words) ? words : [];
  listEl.innerHTML = list
    .map((word, index) => {
      const en = String(word?.en || "").trim();
      const ko = formatSummaryKo(word?.ko);
      const color = word?.color || WORD_COLORS[index % WORD_COLORS.length];
      return (
        `<div class="summary-row" data-summary-index="${index}">` +
        `<span class="num" style="background:${color}">${index + 1}</span>` +
        `<div class="summary-titles">` +
        `<span class="en">${en}</span>` +
        `<span class="ko">${ko}${summaryCheckSvg(index)}</span>` +
        `</div></div>`
      );
    })
    .join("");
  syncSummaryKoWrap();
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

async function paintSummaryChecks(words) {
  const rows = document.querySelectorAll("#summary-list .summary-row");
  if (!rows.length) return;
  const list = Array.isArray(words) ? words : [];

  /* 처음부터 체크 안 된 상태로 — 하나씩 읽으며 tick */
  rows.forEach((row) => {
    row.classList.remove("is-checked", "is-drawing-check", "is-check-done", "is-active");
  });

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const en = stripHtml(list[i]?.en);

    row.classList.add("is-active");
    try {
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (_) {}

    row.classList.add("is-checked");
    row.classList.remove("is-check-done");
    void row.offsetWidth;
    row.classList.add("is-drawing-check");

    const drawDone = sleep(SUMMARY_CHECK_DRAW_MS).then(() => {
      row.classList.remove("is-drawing-check");
      row.classList.add("is-check-done");
    });
    const speakDone = en ? playEnTTS(en) : Promise.resolve();

    await Promise.all([drawDone, speakDone]);
    row.classList.remove("is-active");
    if (i < rows.length - 1) await sleep(SUMMARY_CHECK_GAP_MS);
  }
}

/** 요약 — 상단 헤더 고정, colourchange 스타일, 화면 유지 */
async function playSummaryScreen({ animateChecks = true } = {}) {
  const root = document.getElementById("summary-root");
  const review = document.getElementById("review-root");
  const words = getWordList();
  if (!root) return;

  hideWordsOnly();
  syncOverlayTop();
  if (review) review.hidden = true;
  renderSummaryList(words);
  root.classList.remove("is-fading-out");
  root.hidden = false;
  void root.offsetWidth;
  await sleep(300);
  if (animateChecks) {
    await paintSummaryChecks(words);
  } else {
    /* quiz 후 재표시 — V 체크는 이미 그린 상태로 */
    document.querySelectorAll("#summary-list .summary-row").forEach((row) => {
      row.classList.add("is-checked", "is-check-done");
    });
  }
  /* 요약은 사라지지 않음 · 헤더(출처·추출 어휘)는 그대로 */
}

/** summary 서서히 흐려진 뒤 숨김 */
async function fadeOutSummary() {
  const root = document.getElementById("summary-root");
  if (!root || root.hidden) return;
  root.classList.add("is-fading-out");
  await sleep(SUMMARY_FADE_OUT_MS);
  root.hidden = true;
  root.classList.remove("is-fading-out");
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

/** 오늘 날짜 — 매번 현재 시각 기준 자동 */
function today() {
  const d = new Date();
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function renderDate() {
  const el = document.getElementById("dateLabel");
  if (el) el.textContent = today() + " · Vocab Note";
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
const WORD_GAP_MS = 200; /* TIMING_CONFIG.wordGapSec 없을 때 폴백 */
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */

/** TIMING_CONFIG 초 → ms (기본 1초) */
function timingSecToMs(key, fallbackSec = 1) {
  const sec = Number(TIMING_CONFIG?.[key]);
  const n = Number.isFinite(sec) && sec >= 0 ? sec : fallbackSec;
  return Math.round(n * 1000);
}

function getWordGapMs() {
  if (TIMING_CONFIG && Object.prototype.hasOwnProperty.call(TIMING_CONFIG, "wordGapSec")) {
    return timingSecToMs("wordGapSec", 1);
  }
  return WORD_GAP_MS;
}

function getKoHoldMs() {
  if (TIMING_CONFIG && Object.prototype.hasOwnProperty.call(TIMING_CONFIG, "koHoldSec")) {
    return timingSecToMs("koHoldSec", 1);
  }
  return 1000;
}

function getEnRepeatGapMs() {
  if (TIMING_CONFIG && Object.prototype.hasOwnProperty.call(TIMING_CONFIG, "enRepeatGapSec")) {
    return timingSecToMs("enRepeatGapSec", 1);
  }
  return 1000;
}
const PAGE_ENTER_FIRST_MS = 200;
const PAGE_ENTER_MS = 350;
/** 1–3 → 4–6 → 7–9 페이지 넘김 대기 */
const PAGE_DONE_MS = 1500;
const PASS_GAP_MS = 400;
const SECTION_GAP_MS = 320;
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
    if (Array.isArray(phraseEls) && phraseEls.length) {
      await detectSpeechBoundsFromAudio(audio).catch(() => null);
    }
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
    const example = getExampleSpeakText(word);
    const enVoice = enPool[i % enPool.length];
    const koVoice = koPool[i % koPool.length];
    if (en) {
      loadBackendTTSAudio(en, enVoice).catch(() => {});
      /* 2회차에서도 같은 en 텍스트를 다시 읽으므로 다음 음성도 워밍 */
      if (enPool.length > 1) {
        loadBackendTTSAudio(en, enPool[(i + words.length) % enPool.length]).catch(() => {});
      }
    }
    if (example) loadBackendTTSAudio(example, enVoice).catch(() => {});
    if (ko && PASS_CONFIG?.speakKo === true) {
      loadBackendTTSAudio(ko, koVoice).catch(() => {});
      if (koPool.length > 1) {
        loadBackendTTSAudio(ko, koPool[(i + words.length) % koPool.length]).catch(() => {});
      }
    }
  });
}

/** enRepeat — 1~3회 (없으면 1) */
function getWordEnRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.max(1, Math.min(3, Math.round(n)));
}

/** 예문 TTS 텍스트 */
function getExampleSpeakText(word) {
  return stripHtml(word?.exampleTts || word?.example || "").trim();
}

function getExamplePhraseEls(wordEl) {
  if (!wordEl) return [];
  return [...wordEl.querySelectorAll(".example .ex-phrase")];
}

/**
 * TTS 버퍼 RMS로 발화 시작·끝 측정 → 밑줄 sync
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
      const win = Math.max(1, Math.floor(sr * 0.01));
      let peak = 0;
      for (let i = 0; i < ch.length; i += Math.max(1, Math.floor(win / 2))) {
        const a = Math.abs(ch[i]);
        if (a > peak) peak = a;
      }
      if (peak < 1e-5) return null;
      const thrOn = peak * 0.028;
      const thrOff = peak * 0.022;
      const windowRms = (from, to) => {
        let sum = 0;
        const a = Math.max(0, from);
        const b = Math.min(ch.length, to);
        if (b <= a) return 0;
        for (let j = a; j < b; j += 1) sum += Math.abs(ch[j]);
        return sum / (b - a);
      };
      let onsetSamp = 0;
      for (let i = 0; i < ch.length; i += win) {
        if (windowRms(i, i + win) >= thrOn) {
          onsetSamp = Math.max(0, i - win);
          break;
        }
      }
      let offsetSamp = ch.length;
      for (let i = ch.length; i > 0; i -= win) {
        const start = Math.max(0, i - win);
        if (windowRms(start, i) >= thrOff) {
          offsetSamp = Math.min(ch.length, i + win);
          break;
        }
      }
      const dur = decoded.duration || ch.length / sr;
      const lead = Math.max(0, Math.min(onsetSamp / sr, dur * 0.35));
      const spokenEnd = Math.max(lead + 0.05, Math.min(offsetSamp / sr, dur));
      const trail = Math.max(0, Math.min(dur - spokenEnd, dur * 0.35));
      const bounds = { lead, trail, spokenEnd, duration: dur };
      audio.__speechBounds = bounds;
      return bounds;
    } catch (_) {
      return null;
    }
  })();

  return audio.__speechBoundsPromise;
}

function countSyllablesEn(word) {
  let w = String(word || "").toLowerCase().replace(/[^a-z']/g, "");
  if (!w) return 1;
  w = w.replace(/'/g, "");
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|[^laeiouy]ed)$/, "");
  if (/[aeiouy][^aeiouy]e$/.test(w)) w = w.slice(0, -1);
  w = w.replace(/^y/, "");
  const groups = w.match(/[aeiouy]+/g);
  return Math.max(1, groups ? groups.length : 1);
}

function spokenTextTimingWeight(spoken) {
  const words = String(spoken || "")
    .toLowerCase()
    .match(/[a-z']+/g);
  if (!words || !words.length) return 1;
  return Math.max(
    1,
    words.reduce((sum, w) => sum + countSyllablesEn(w) * 3.55 + Math.min(1.1, w.length * 0.1), 0)
  );
}

function punctuationPauseWeight(text) {
  const t = String(text || "").trim();
  if (!t) return 0;
  if (/(\.\.\.|…)$/.test(t)) return 3.2;
  if (/[,;:]$/.test(t)) return 2.4;
  if (/[—–-]$/.test(t)) return 2.0;
  if (/[.!?]$/.test(t)) return 3.6;
  return 0;
}

const SHORT_FUNCTION_WORD_RE =
  /^(a|an|the|of|to|in|on|at|for|and|or|but|as|by|from|with|is|are|was|were|be|been|being|that|this|these|those|it|its|than|then|so|if|or)$/i;

function stripExampleTokenPunct(text) {
  return String(text || "").replace(/^[^A-Za-z0-9$£€¥%]+|[^A-Za-z0-9$£€¥%]+$/g, "");
}

function estimateSpokenHighlightWeight(text) {
  const raw = String(text || "")
    .replace(/\([^)]*[\uAC00-\uD7A3][^)]*\)/g, " ")
    .trim();
  if (!raw) return 1;
  const token = stripExampleTokenPunct(raw);
  if (SHORT_FUNCTION_WORD_RE.test(token)) return 1.6;
  let weight = 0;
  let remaining = raw;
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\b/g, (m) => {
    weight += Math.max(2, String(m).replace(/,/g, "").length * 1.2);
    return " ";
  });
  const words = remaining.match(/[A-Za-z']+/g) || [];
  if (words.length) weight += spokenTextTimingWeight(words.join(" "));
  else if (!weight) weight = 1;
  return Math.max(1, weight);
}

function phraseHighlightWeightText(el) {
  if (!el) return "";
  const ko = el.querySelectorAll?.(".ex-ko");
  if (!ko || !ko.length) return el.textContent || "";
  const clone = el.cloneNode(true);
  clone.querySelectorAll(".ex-ko").forEach((n) => n.remove());
  return clone.textContent || "";
}

const PHRASE_HL_LEAD_IN_SEC = 0.05;
const PHRASE_HL_TRAIL_SEC = 0.08;
const PHRASE_HL_LOOKAHEAD_SEC = 0;
const PHRASE_HL_WORD_GAP = 0.12;

function estimatePhraseHighlightWeights(texts) {
  const n = texts.length;
  return texts.map((text, i) => {
    let w = estimateSpokenHighlightWeight(text);
    w += punctuationPauseWeight(text);
    if (i < n - 1) w += PHRASE_HL_WORD_GAP;
    return Math.max(0.8, w);
  });
}

function startPhraseHighlightSync(audio, phraseEls) {
  if (!audio || !Array.isArray(phraseEls) || !phraseEls.length) return () => {};
  const texts = phraseEls.map((el) => phraseHighlightWeightText(el));
  const weights = estimatePhraseHighlightWeights(texts);
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  const ends = new Array(weights.length);
  let run = 0;
  for (let i = 0; i < weights.length; i += 1) {
    run += weights[i] / total;
    ends[i] = run;
  }
  let current = -1;
  let raf = 0;
  let spokenStart = PHRASE_HL_LEAD_IN_SEC;
  let spokenEnd = null;
  let trailFallback = PHRASE_HL_TRAIL_SEC;
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
    const p = Math.min(0.999999, Math.max(0, progress));
    let lo = 0;
    let hi = ends.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (p < ends[mid]) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  };
  const applyMeasuredBounds = (measured) => {
    if (!measured || stopped) return;
    const mediaDur = Number(audio.duration);
    const measDur = Number(measured.duration);
    const scale =
      Number.isFinite(mediaDur) && mediaDur > 0 && Number.isFinite(measDur) && measDur > 0
        ? mediaDur / measDur
        : 1;
    const cap = Number.isFinite(mediaDur) && mediaDur > 0 ? mediaDur * 0.4 : 0.5;
    const lead = Math.min(Math.max(0, (Number(measured.lead) || 0) * scale), cap);
    let end = Number.isFinite(measured.spokenEnd)
      ? measured.spokenEnd * scale
      : (Number.isFinite(mediaDur) ? mediaDur : measDur * scale) -
        Math.min(Math.max(0, (Number(measured.trail) || 0) * scale), cap);
    spokenStart = lead;
    spokenEnd = Math.max(lead + 0.05, end);
    trailFallback = Math.min(Math.max(0, (Number(measured.trail) || 0) * scale), cap);
  };

  if (audio.__speechBounds) applyMeasuredBounds(audio.__speechBounds);
  else detectSpeechBoundsFromAudio(audio).then(applyMeasuredBounds).catch(() => null);

  const update = () => {
    raf = 0;
    const dur = Number(audio.duration);
    if (Number.isFinite(dur) && dur > 0) {
      const start = Math.min(spokenStart, dur * 0.4);
      const end =
        spokenEnd != null && Number.isFinite(spokenEnd)
          ? Math.min(Math.max(start + 0.05, spokenEnd), dur)
          : Math.max(start + 0.05, dur - Math.min(trailFallback, dur * 0.4));
      const effective = Math.max(0.08, end - start);
      const rate = Number(audio.playbackRate);
      const look = PHRASE_HL_LOOKAHEAD_SEC * (Number.isFinite(rate) && rate > 0 ? rate : 1);
      const t = audio.currentTime + look;
      if (t < start) {
        if (current >= 0) clear();
      } else {
        setActive(indexAtProgress(Math.min(1, Math.max(0, (t - start) / effective))));
      }
    } else if (current < 0) {
      setActive(0);
    }
    if (!stopped && !audio.paused && !audio.ended) raf = requestAnimationFrame(update);
  };

  const onTimeUpdate = () => {
    if (!raf && !stopped) raf = requestAnimationFrame(update);
  };
  clear();
  audio.addEventListener("timeupdate", onTimeUpdate);
  audio.addEventListener("playing", onTimeUpdate);
  raf = requestAnimationFrame(update);
  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    raf = 0;
    audio.removeEventListener("timeupdate", onTimeUpdate);
    audio.removeEventListener("playing", onTimeUpdate);
    clear();
  };
}

/** 예문을 enRepeat회 낭독 + 읽는 위치 노란 밑줄 */
async function speakExampleTimes(text, times, voiceId, wordEl) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const n = Math.max(1, Math.min(3, Math.round(Number(times)) || 1));
  const voice = voiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  const exampleEl = wordEl?.querySelector?.(".example");
  const phraseEls = getExamplePhraseEls(wordEl);
  exampleEl?.classList.add("is-reading-example");
  try {
    for (let i = 0; i < n; i += 1) {
      await playBackendTTS(enText, voice, 1, phraseEls);
      if (i < n - 1) await sleep(getEnRepeatGapMs());
    }
  } finally {
    exampleEl?.classList.remove("is-reading-example");
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
  }
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

/** 미리보기(___ + 3글자) → 나머지 글자 채우며 마지막 글자 노출 (+예문·번역 동시) */
async function revealEnLettersFromPreview(wordEl, en) {
  const enEl = wordEl.querySelector(".en");
  const previewEl = wordEl.querySelector(".en-preview");
  if (!enEl) return;
  const total = countEnLetters(en);
  const start = Math.min(EN_PREVIEW_LETTERS, total);
  /* 미리보기 종료 — 영어·예문·번역·발음 함께 노출 시작 */
  wordEl.classList.add("is-revealing-answer");
  wordEl.classList.remove("is-answer-hidden", "is-ex-hidden", "is-pron-hidden");
  if (previewEl) previewEl.hidden = true;
  for (let n = start; n <= total; n += 1) {
    enEl.textContent = buildEnPartialReveal(en, n);
    if (n < total) await sleep(55);
  }
  enEl.textContent = en;
  wordEl.classList.remove("is-revealing-answer");
}

/** 영어·발음·예문·번역 함께 노출 */
function revealAnswerBundle(wordEl) {
  wordEl.classList.remove("is-answer-hidden", "is-ex-hidden", "is-pron-hidden");
  wordEl.classList.add("is-en-revealing");
  const enEl = wordEl.querySelector(".en");
  if (enEl && !enEl.classList.contains("is-hl-on")) {
    enEl.classList.add("is-hl-on");
  }
}

/** 페이지 1회차: 한글 낭독 → 1.5초 → 영어(+예문·번역) 노출·낭독 */
async function runPass1OnPage(pageEls, pageItems) {
  const stage = document.getElementById("stage");
  stage?.classList.remove("hide-meaning");
  pageEls.forEach((wordEl) => {
    wordEl.classList.add("is-answer-hidden", "is-ex-hidden", "is-pron-hidden", "is-revealed");
    wordEl.classList.remove("is-en-hidden", "is-en-revealing", "is-revealing-answer");
    const enEl = wordEl.querySelector(".en");
    const previewEl = wordEl.querySelector(".en-preview");
    const full = enEl?.dataset?.full || enEl?.textContent || "";
    if (enEl) {
      enEl.textContent = full;
      enEl.classList.remove("is-hl-on", "is-hl-painting");
    }
    if (previewEl) {
      const hint = buildEnPreviewHint(full);
      previewEl.textContent = hint;
      previewEl.hidden = !hint;
    }
  });

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.dataset?.full || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    /* 1) 한글 읽기 */
    if (PASS_CONFIG?.speakKo !== false) await playKoTTS(ko);
    /* 2) 1.5초 대기 */
    await sleep(getKoHoldMs());

    /* 3) 마지막 글자까지 채우며 영어 노출 + 예문·번역 함께 */
    await revealEnLettersFromPreview(wordEl, en);
    revealAnswerBundle(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);

    /* 4) 영어 낭독 → 예문 낭독 */
    const times = getWordEnRepeatCount(item);
    const enVoice = activeEnTtsVoiceId;
    await paintAndSpeakEn(wordEl, en);
    for (let r = 1; r < times; r += 1) {
      await sleep(getEnRepeatGapMs());
      if (en) await playBackendTTS(en, enVoice, 1);
    }
    const exampleSpeak = getExampleSpeakText(item);
    if (exampleSpeak) await speakExampleTimes(exampleSpeak, times, enVoice, wordEl);

    await sleep(getWordGapMs());
  }
}

/** 페이지(최대 5개) 2회차: 영어는 이미 숨긴 상태 → 한글 → 영어(+발음) */
async function runPass2OnPage(pageEls, pageItems) {
  /* EN 숨김은 페이지 표시 전에 prepareSecondPass(전체)로 처리됨 */
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    if (PASS_CONFIG?.speakKo === true) await playKoTTS(ko);
    await sleep(getKoHoldMs());
    await sleep(EN_TO_KO_GAP_MS);

    /* 영어·발음·예문 노출과 동시에 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(en);
    const times = getWordEnRepeatCount(item);
    const enVoice = activeEnTtsVoiceId;
    for (let r = 1; r < times; r += 1) {
      await sleep(getEnRepeatGapMs());
      if (en) await playBackendTTS(en, enVoice, 1);
    }
    /* ex — enRepeat 횟수만큼 낭독 + 밑줄 sync */
    const exampleSpeak = getExampleSpeakText(item);
    if (exampleSpeak) await speakExampleTimes(exampleSpeak, times, enVoice, wordEl);
    wordEl.classList.remove("is-speaking");
    await sleep(getWordGapMs());
  }
}

async function runAutoplay() {
  const btn = document.getElementById("autoplay");
  if (btn) {
    btn.hidden = true;
    btn.remove();
  }

  const stage = document.getElementById("stage");
  /* kor_eng: 한글은 처음부터 보임 */
  stage.classList.remove("hide-meaning");

  resolveConfiguredEnVoice();
  resolveConfiguredKoVoice();
  preloadAutoplayAudio(getWordList());

  await sleep(AUTOPLAY_START_WAIT_MS);

  const wordEls = Array.from(stage.querySelectorAll(".word"));
  const items = getWordList();
  const pageSize = getWordsPerPage();
  const pageCount = Math.max(1, Math.ceil(wordEls.length / pageSize));

  const doPass1 = PASS_CONFIG?.pass1 !== false;
  const doPass2 = PASS_CONFIG?.pass2 !== false;

  /* path1: KO 낭독 → 1.5초 → EN(+예문·번역) */
  if (doPass1) {
    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      showWordPage(wordEls, page);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass1OnPage(pageEls, pageItems);
      await sleep(PAGE_DONE_MS);
    }
  }

  /* path2: 영어 숨김 → KO → EN(+발음·예문) */
  if (doPass2) {
    if (doPass1) await sleep(PASS_GAP_MS);

    /* 페이지를 띄우기 전에 전체 영어·발음 숨김 */
    prepareSecondPass(wordEls);
    await sleep(SECTION_GAP_MS);

    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      prepareSecondPass(pageEls);
      showWordPage(wordEls, page);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass2OnPage(pageEls, pageItems);
      await sleep(PAGE_DONE_MS);
    }
  }

  /* summary·quiz — runSummary true일 때만 */
  if (PASS_CONFIG?.runSummary === true) {
    await fadeOutWordsOnly();
    syncOverlayTop();
    await sleep(SECTION_GAP_MS);

    await playSummaryScreen({ animateChecks: true });

    await sleep(SUMMARY_TO_QUIZ_MS);
    await fadeOutSummary();
    await startReviewQuiz();
    /* quiz 화면 유지 — 더 이상 넘어가지 않음 */
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

/** escape 후 &lt;br&gt; 만 실제 줄바꿈 태그로 복원 (화면에 &lt;br&gt; 문자 노출 없음) */
function allowQuizBreakTags(escapedHtml) {
  return String(escapedHtml || "").replace(/&lt;br\s*\/?&gt;/gi, "<br>");
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
  let html = allowQuizBreakTags(escapeQuizHtml(String(en || "")));
  if (!blankHtml) return html;
  return replaceQuizBlankToken(html, blankHtml);
}

function formatQuizKoHtml(ko) {
  return allowQuizBreakTags(escapeQuizHtml(String(ko || "").trim())).replace(
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
  let html = allowQuizBreakTags(escapeQuizHtml(String(en || "")));
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

renderHoles();
renderHead();
renderTitle();
renderWords();
renderMeta();
renderDate();
setupAutoplay();
fitStage();
syncOverlayTop();
requestAnimationFrame(() => fitVisibleMeaningFonts());
window.addEventListener("resize", () => {
  fitStage();
  syncOverlayTop();
});
