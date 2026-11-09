/* =====================================================================
   🔊 TTS 음성 설정 (제일 위)
   ---------------------------------------------------------------------
   enVoice / koVoice : 숫자(고정) 또는 "sequential" / "random"
   "sequential" (기본) → 1→2→3… 번호 순서, 한 바퀴 끝나면 다시 1부터
   "random" → 목록을 섞은 뒤 순서대로 (한 바퀴 끝나면 다시 섞음)
   ===================================================================== */

/** 영어 TTS 음성 목록 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Umbriel",          // 남 · 미국 · 깊고 잔잔
  2: "en-US-Chirp3-HD-Puck",             // 남 · 미국 · 밝고 경쾌
  3: "en-US-Chirp3-HD-Enceladus",        // 남 · 미국 허스키
  4: "en-GB-Wavenet-N",                 // 여 · 영국
  5: "en-US-Chirp3-HD-Despina",          // 여 · 미국
  6: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  7: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  8: "en-GB-Chirp-HD-D",                 // 남 · 영국
  9: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
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
 * 화면 표시
 * wordsPerPage — 한 화면에 보이는 단어 수 (예: 5 → 1~5, 다음 6~10)
 */
const DISPLAY_CONFIG = {
  wordsPerPage: 4,
};

/**
 * 타이밍(초) — ★ 여기 숫자만 바꾸세요
 * koToExampleSec — 한글 노출 뒤 → EX 배경 칠 시작 전 대기 (기본 0.5)
 * exampleHoldSec — EX 배경 칠 끝난 뒤 → 다음 단어로 넘어가기 전 대기
 *                  기본 0.5 = 칠 완료 후 500ms
 * pass2DelaySec  — path1 끝난 뒤 → path2 시작 전 대기 (기본 0.25)
 */
const TIMING_CONFIG = {
  koToExampleSec: 0.5,
  exampleHoldSec: 1.5,
  pass2DelaySec: 2.5,
};

/**
 * 학습 패스 on/off (true인 것만 실행, summary 없음)
 * pass1 — true: 한글 숨김 → EN만 낭독 → 한글 뜻 노출(TTS 없음) · example/highlight 미낭독
 * pass2 — true: 영어 숨김 → 한글 보임(TTS 없음) → 영어(+발음) 노출·EN만 낭독
 * 둘 다 true면 1 → 2 순서로 진행 후 quiz(있으면)
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: true,
};

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

  /* 날짜 — ★ 여기 문자열만 바꾸세요 (예: "Oct. 27, 2026")
   * 비우면("") 오늘 날짜 자동
   */
  date: "Nov. 06, 2026",

  title: [
    { hl: "benefactor 후원자" },
    { hl: "#연관단어" },
  ],


  source: "",
  sourceMark: "추출 어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* colourchange cardData.words 와 동일 구조 */
  words: [
    
    {
      "en": "philanthropy",
      "ko": "자선 활동, 박애",
      "pos": "명",
      "reading": "필랜스러피",
      "ipa": "/fɪˈlænθrəpi/",
      "defs": ["다른 사람들의 복지를 위해 돈이나 자원을 기부하는 활동이나 정신"],
      "example": "Your family has a history of philanthropy.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
    {
      "en": "generosity",
      "ko": "관대함, 너그러움",
      "pos": "명",
      "reading": "제너로서티",
      "ipa": "/ˌdʒenəˈrɒsəti/",
      "defs": ["돈이나 시간, 도움 등을 아끼지 않고 기꺼이 베푸는 성품"],
      "example": "Your generosity is overwhelming.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
    {
      "en": "fundraising",
      "ko": "모금 활동",
      "pos": "명",
      "reading": "펀드레이징",
      "ipa": "/ˈfʌndreɪzɪŋ/",
      "defs": ["단체의 활동이나 특정 목적에 필요한 돈을 모으는 활동"],
      "example": "fundraising bazaars",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
    {
      "en": "sponsor",
      "ko": "후원하다, 후원자",
      "pos": "동·명",
      "reading": "스폰서",
      "ipa": "/ˈspɒnsə/",
      "defs": ["사람이나 행사, 활동 등에 자금이나 자원을 제공하다; 그러한 지원을 하는 사람이나 단체"],
      "example": "",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
    {
      "en": "beneficiary",
      "ko": "수혜자, 수익자",
      "pos": "명",
      "reading": "베너피셔리",
      "ipa": "/ˌbenɪˈfɪʃəri/",
      "defs": ["지원이나 기부, 유산, 보험금 등으로 혜택이나 재산을 받는 사람이나 단체"],
      "example": "Who will be the main beneficiary of the cuts in income tax?",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
   
    {
      "en": "endowment",
      "ko": "기부금, 기금",
      "pos": "명",
      "reading": "인다우먼트",
      "ipa": "/ɪnˈdaʊmənt/",
      "defs": ["대학이나 기관 등에 기부되어 장기적인 운영과 활동의 재원으로 쓰이는 돈이나 재산"],
      "example": "the university endowment",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
    {
      "en": "benefactor",
      "ko": "후원자, 은인",
      "pos": "명",
      "reading": "베너팩터",
      "ipa": "/ˈbenɪfæktə/",
      "defs": ["다른 사람이나 기관에 돈이나 도움을 베푸는 사람"],
      "example": "He's our chief carpenter, also our chief benefactor.",
      "cf": "",
      "enRepeat": 1,
      "highlight": "",
      "translation": "",
      "image": "",
      "icon": "",
      "spark": "yellow",
      "note": {"phrase": "", "text": ""}
    },
 
 
  

    // ② 걸다·묶다·채우다 — 17개
    // {
    //   "en": "hang",
    //   "ko": "걸다, 매달다",
    //   "pos": "동",
    //   "reading": "행",
    //   "ipa": "/hæŋ/",
    //   "defs": ["물건의 윗부분 등을 고정해 아래로 늘어뜨리거나 걸어 두다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🖼️",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "clip",
    //   "ko": "클립으로 집어 고정하다",
    //   "pos": "동",
    //   "reading": "클립",
    //   "ipa": "/klɪp/",
    //   "defs": ["클립이나 집게로 물려 붙이거나 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "📎",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "pin",
    //   "ko": "핀으로 고정하다",
    //   "pos": "동",
    //   "reading": "핀",
    //   "ipa": "/pɪn/",
    //   "defs": ["핀을 꽂아 무언가를 붙이거나 움직이지 않게 하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "📌",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "tack",
    //   "ko": "압정으로 붙이다, 시침질하다",
    //   "pos": "동",
    //   "reading": "택",
    //   "ipa": "/tæk/",
    //   "defs": ["압정이나 작은 못으로 붙이거나 성긴 바느질로 임시 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "📍",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "staple",
    //   "ko": "스테이플러로 철하다",
    //   "pos": "동",
    //   "reading": "스테이플",
    //   "ipa": "/ˈsteɪpəl/",
    //   "defs": ["ㄷ자 모양의 철심을 박아 종이나 물건을 묶거나 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🗃️",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "button",
    //   "ko": "단추를 채우다",
    //   "pos": "동",
    //   "reading": "버튼",
    //   "ipa": "/ˈbʌtən/",
    //   "defs": ["단추를 단춧구멍에 끼워 옷 등을 여미다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "👔",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "do up",
    //   "ko": "잠그다, 여미다",
    //   "pos": "구동사",
    //   "reading": "두 업",
    //   "ipa": "/duː ʌp/",
    //   "defs": ["옷이나 신발 등의 단추, 지퍼, 끈을 채우거나 묶다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🧥",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "toggle",
    //   "ko": "토글 단추로 채우다",
    //   "pos": "동",
    //   "reading": "토글",
    //   "ipa": "/ˈtɒɡəl/",
    //   "defs": ["막대 모양의 단추를 고리나 구멍에 끼워 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🧥",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "clasp",
    //   "ko": "걸쇠로 채우다",
    //   "pos": "동",
    //   "reading": "클라스프",
    //   "ipa": "/klɑːsp/",
    //   "defs": ["목걸이나 가방 등의 잠금쇠를 채워 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "📿",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "latch",
    //   "ko": "걸쇠를 걸다",
    //   "pos": "동",
    //   "reading": "래치",
    //   "ipa": "/lætʃ/",
    //   "defs": ["문이나 대문 등에 달린 걸쇠를 걸어 닫힌 상태로 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🚪",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "hasp",
    //   "ko": "걸쇠로 잠그다",
    //   "pos": "동",
    //   "reading": "하스프",
    //   "ipa": "/hɑːsp/",
    //   "defs": ["고리에 끼우는 금속 걸쇠로 문이나 뚜껑 등을 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔒",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "tie",
    //   "ko": "묶다",
    //   "pos": "동",
    //   "reading": "타이",
    //   "ipa": "/taɪ/",
    //   "defs": ["끈이나 밧줄 등으로 매듭을 지어 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🎀",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "lace",
    //   "ko": "끈을 꿰어 묶다",
    //   "pos": "동",
    //   "reading": "레이스",
    //   "ipa": "/leɪs/",
    //   "defs": ["신발 등의 구멍에 끈을 통과시켜 조이거나 묶다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "👟",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "strap",
    //   "ko": "끈이나 벨트로 고정하다",
    //   "pos": "동",
    //   "reading": "스트랩",
    //   "ipa": "/stræp/",
    //   "defs": ["끈이나 띠, 벨트로 묶어 움직이지 않도록 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🎒",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "cinch",
    //   "ko": "바짝 조이다",
    //   "pos": "동",
    //   "reading": "신치",
    //   "ipa": "/sɪntʃ/",
    //   "defs": ["띠나 끈 등을 단단히 당겨 조이거나 매다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🪢",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "lash",
    //   "ko": "밧줄로 단단히 묶다",
    //   "pos": "동",
    //   "reading": "래시",
    //   "ipa": "/læʃ/",
    //   "defs": ["밧줄이나 끈으로 사물을 단단히 묶어 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🪢",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "refasten",
    //   "ko": "다시 채우다, 다시 묶다",
    //   "pos": "동",
    //   "reading": "리파슨",
    //   "ipa": "/ˌriːˈfɑːsən/",
    //   "defs": ["풀리거나 열린 것을 다시 채우거나 묶어 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔐",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
  
    // // ③ 단단히 고정하다·구속하다 — 15개
    // {
    //   "en": "fasten",
    //   "ko": "고정하다, 채우다",
    //   "pos": "동",
    //   "reading": "파슨",
    //   "ipa": "/ˈfɑːsən/",
    //   "defs": ["무언가를 닫거나 연결해 떨어지거나 움직이지 않게 하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔐",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "fix",
    //   "ko": "고정하다",
    //   "pos": "동",
    //   "reading": "픽스",
    //   "ipa": "/fɪks/",
    //   "defs": ["무언가를 특정 위치에 단단히 붙이거나 움직이지 않게 하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔧",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "clamp",
    //   "ko": "죔쇠로 꽉 고정하다",
    //   "pos": "동",
    //   "reading": "클램프",
    //   "ipa": "/klæmp/",
    //   "defs": ["죔쇠 등의 도구로 꽉 눌러 움직이지 않게 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🗜️",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "nail",
    //   "ko": "못으로 박아 고정하다",
    //   "pos": "동",
    //   "reading": "네일",
    //   "ipa": "/neɪl/",
    //   "defs": ["못을 박아 물건을 붙이거나 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔨",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "screw",
    //   "ko": "나사로 조여 고정하다",
    //   "pos": "동",
    //   "reading": "스크루",
    //   "ipa": "/skruː/",
    //   "defs": ["나사를 돌려 박아 물건을 연결하거나 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🪛",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "bolt",
    //   "ko": "볼트로 단단히 고정하다",
    //   "pos": "동",
    //   "reading": "볼트",
    //   "ipa": "/bəʊlt/",
    //   "defs": ["볼트로 부품이나 구조물을 단단히 연결하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔩",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "rivet",
    //   "ko": "리벳으로 접합하다",
    //   "pos": "동",
    //   "reading": "리빗",
    //   "ipa": "/ˈrɪvɪt/",
    //   "defs": ["금속 핀을 구멍에 넣고 끝을 변형해 부품들을 단단히 결합하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "⚙️",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "clinch",
    //   "ko": "못 끝 등을 구부려 고정하다",
    //   "pos": "동",
    //   "reading": "클린치",
    //   "ipa": "/klɪntʃ/",
    //   "defs": ["박힌 못이나 금속 핀의 튀어나온 끝을 구부리거나 두드려 빠지지 않게 하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔨",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "batten",
    //   "ko": "덧대를 대어 고정하다",
    //   "pos": "동",
    //   "reading": "배튼",
    //   "ipa": "/ˈbætən/",
    //   "defs": ["가늘고 긴 나무나 금속 등을 덧대어 고정하거나 보강하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🪵",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "belay",
    //   "ko": "밧줄을 감아 고정하다, 확보하다",
    //   "pos": "동",
    //   "reading": "빌레이",
    //   "ipa": "/bɪˈleɪ/",
    //   "defs": [
    //     "항해에서 밧줄을 고정 장치에 감아 묶다",
    //     "등반에서 로프를 제어해 등반자의 추락을 막다"
    //   ],
    //   "example": "",
    //   "cf": "항해·등반 용어",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🧗",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "harness",
    //   "ko": "마구·안전띠를 채우다",
    //   "pos": "동",
    //   "reading": "하니스",
    //   "ipa": "/ˈhɑːnɪs/",
    //   "defs": ["마구나 안전띠를 채워 몸을 고정하거나 다른 대상에 연결하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🧗",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "yoke",
    //   "ko": "멍에로 연결하다",
    //   "pos": "동",
    //   "reading": "요크",
    //   "ipa": "/jəʊk/",
    //   "defs": ["동물들을 멍에로 함께 묶거나 서로 다른 대상을 연결하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🐂",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "shackle",
    //   "ko": "족쇄를 채우다, 구속하다",
    //   "pos": "동",
    //   "reading": "샤클",
    //   "ipa": "/ˈʃækəl/",
    //   "defs": ["족쇄나 쇠고랑을 채우거나 자유로운 행동을 제한하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "⛓️",
    //   "spark": "red",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "refix",
    //   "ko": "다시 고정하다",
    //   "pos": "동",
    //   "reading": "리픽스",
    //   "ipa": "/ˌriːˈfɪks/",
    //   "defs": ["떨어지거나 위치가 바뀐 것을 다시 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔧",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
    // {
    //   "en": "resecure",
    //   "ko": "다시 단단히 고정하다",
    //   "pos": "동",
    //   "reading": "리시큐어",
    //   "ipa": "/ˌriːsɪˈkjʊə/",
    //   "defs": ["느슨해지거나 풀린 것을 다시 안전하고 단단하게 고정하다"],
    //   "example": "",
    //   "cf": "",
    //   "enRepeat": 1,
    //   "highlight": "",
    //   "translation": "",
    //   "image": "",
    //   "icon": "🔒",
    //   "spark": "yellow",
    //   "note": {"phrase": "", "text": ""}
    // },
  ],

  /**
   * Review 퀴즈 — 현재 words 기준 (중복 제외)
   * { en, ko, answer, answerKo, image }
   */
  quiz: [
    // {
    //   en: "Four friends testified against him, then rec_____ their testimony.",
    //   ko: "친구 네 명이 그에게 불리한 증언을 했다가 나중에 그 증언을 (철회했다).",
    //   answer: "recanted",
    //   answerKo: "증언을 철회하다, 주장을 번복하다",
    //   image: "",
    // },
  ],
};

const WORD_COLORS = ["#e06a4f", "#3e6fd8", "#3a9a6b", "#c23b3b", "#8b5cf6", "#0d9488"];

const ARROW_SVG =
  '<svg class="arrow" width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">' +
  '<path d="M3 12 H 28 M20 4 L 29 12 L 20 20" fill="none" stroke="#2d4f9e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** en 글자 수 + ko(공백 제외) 글자 수 — 이 값 이상이면 화살표·뜻을 영어 아래 줄에
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

/** 예문 — highlight 단어 mark (한 줄 조각용, br 없음) */
function highlightSentence(sentence, target) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  let safe = escapeHtml(raw);
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

/**
 * 예문 HTML — &lt;br&gt; / (맥락 앞을 줄 단위로 분리해 block 렌더
 * (맥락…은 항상 다음 줄)
 */
function renderExampleInnerHtml(example, highlight) {
  let raw = String(example || "").trim();
  if (!raw) return "";
  /* (맥락 앞 강제 줄바꿈 후, 연속 br 정리 */
  raw = raw.replace(/\s*(\(\s*맥락)/gi, "<br>$1");
  raw = raw.replace(/(?:<br\s*\/?>\s*)+/gi, "<br>");
  const parts = raw.split(/<br\s*\/?>/gi).map((p) => p.trim()).filter(Boolean);
  return parts
    .map((part, i) => {
      const html = wrapExampleKoParens(highlightSentence(part, highlight));
      /* 첫 영어 예문만 큰 글씨 — (맥락)·*주석은 note */
      const isNote =
        i > 0 ||
        /^\(\s*맥락/i.test(part) ||
        /^\*+/.test(part);
      const cls = isNote
        ? "example-line example-line-note"
        : "example-line example-line-main";
      return `<span class="${cls}">${html}</span>`;
    })
    .join("");
}

function getWordList() {
  return Array.isArray(WORDS.words) ? WORDS.words : [];
}

function renderHead() {
  const badge = document.getElementById("badge");
  if (badge) badge.textContent = WORDS.badge || "시사 영단어";

  const source = document.getElementById("sourceLabel");
  if (source) source.textContent = WORDS.source || "";

  const mark = document.getElementById("sourceMark");
  if (mark) mark.textContent = WORDS.sourceMark || "";
}

/** `[강조]` → title-hl, `(강조)` → title-plain, 그 밖 → 기본(title-accent). 괄호는 화면에서 제거 */
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

function renderTitle() {
  const titleEl = document.getElementById("title");
  if (!titleEl) return;

  const lines = (WORDS.title || [])
    .map((line) => {
      let html = "";
      if (typeof line === "string") {
        html = formatTitleMarks(line);
      } else {
        const parts = [];
        if (line.hl) parts.push(formatTitleMarks(line.hl));
        if (line.after) parts.push(formatTitleMarks(line.after));
        if (line.text && !line.hl) parts.push(formatTitleMarks(line.text));
        html = parts.join("");
      }
      if (!html) return "";
      return `<span class="title-line">${html}</span>`;
    })
    .filter(Boolean);

  titleEl.innerHTML = lines.join("<br>");
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
    const onPage = i >= start && i < end;
    wordEl.classList.toggle("is-page-hidden", !onPage);
    /* 다음 페이지 EN이 다시 한꺼번에 날아오도록 착지 상태만 초기화 */
    if (onPage) wordEl.classList.remove("is-en-in");
  });
  requestAnimationFrame(() => fitVisibleMeaningFonts());
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
    /* 자리는 ghost로 확보 — EN은 왼쪽에서 날아와 착지 */
    const enSlot = el("span", "en-slot");
    const enGhost = el("span", "en-ghost", w.en);
    enGhost.setAttribute("aria-hidden", "true");
    const enFly = el("span", "en en-fly " + hlClass, w.en);
    enFly.setAttribute("aria-hidden", "true");
    enSlot.appendChild(enGhost);
    enSlot.appendChild(enFly);
    row.appendChild(enSlot);
    if (needsStackedMeaning(w.en, w.ko, w)) {
      /* en+ko ≥ 한도 — → 화살표·뜻을 영어 아래 줄에 */
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
      const label = el("span", "ex-label", "ex.");
      const inner = el("span", "example-inner");
      inner.innerHTML = renderExampleInnerHtml(
        w.example,
        w.highlight || w.en
      );
      /* EN과 같은 형광색으로 예문 줄 칠하기 */
      inner.querySelectorAll(".example-line").forEach((line) => {
        line.classList.add(hlClass);
      });
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

/** path1→path2 전환용 — 짧게 페이드아웃 (레이아웃 꼬임이 보이지 않게) */
async function fadeOutWordsForPassChange() {
  const words = document.getElementById("words");
  if (!words || words.style.visibility === "hidden") return;
  words.classList.add("is-pass-fade");
  void words.offsetWidth;
  words.classList.add("is-fading-out");
  await sleep(PASS_CROSSFADE_MS);
  words.style.visibility = "hidden";
  words.classList.remove("is-fading-out", "is-pass-fade");
}

/** path2 시작 직전 — 1페이지(한글만) 준비한 뒤 페이드인 */
async function fadeInWordsForPassChange() {
  const words = document.getElementById("words");
  if (!words) return;
  words.classList.add("is-pass-fade", "is-fading-out");
  words.style.visibility = "";
  void words.offsetWidth;
  words.classList.remove("is-fading-out");
  await sleep(PASS_CROSSFADE_MS);
  words.classList.remove("is-pass-fade");
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
  el.textContent = (manual || today()) + " · Vocab Note";
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
/* EN 왼쪽→떨림 착지 — CSS wordEnFlyIn 과 동일 */
const EN_FLY_MS = 720;
const WORD_GAP_MS = 200;
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const PAGE_ENTER_FIRST_MS = 200;
const PAGE_ENTER_MS = 350;
/** 1–3 → 4–6 → 7–9 페이지 넘김 대기 */
const PAGE_DONE_MS = 1500;
const PASS_GAP_MS = 400;
const SECTION_GAP_MS = 320;

/** TIMING_CONFIG.koToExampleSec → ms (기본 500) */
function getKoToExampleMs() {
  const sec = Number(TIMING_CONFIG?.koToExampleSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return 500;
}

/** TIMING_CONFIG.exampleHoldSec → ms (기본 = WORD_GAP_MS) */
function getExampleHoldMs() {
  const sec = Number(TIMING_CONFIG?.exampleHoldSec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return WORD_GAP_MS;
}

/** TIMING_CONFIG.pass2DelaySec → ms (기본 = PASS_GAP_MS) */
function getPass2DelayMs() {
  const sec = Number(TIMING_CONFIG?.pass2DelaySec);
  if (Number.isFinite(sec) && sec >= 0) return Math.round(sec * 1000);
  return PASS_GAP_MS;
}
/** 단어(JSON) 학습 종료 후 quiz 시작 전 대기 */
const WORDS_TO_QUIZ_MS = 2000;
/** summary → quiz 페이드아웃 */
const SUMMARY_FADE_OUT_MS = 1100;
/** 마지막 단어 → summary 페이드아웃 (summary와 동일 리듬) */
const WORDS_FADE_OUT_MS = 1100;
/** path1 → path2 전환 페이드 (ms) */
const PASS_CROSSFADE_MS = 420;

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** EN TTS용 — 화면 표기(en) 유지, enTts 있으면 낭독만 교정 (gape → gayp = /ɡeɪp/) */
function getEnSpeakText(wordOrText) {
  if (wordOrText && typeof wordOrText === "object") {
    const override = stripHtml(wordOrText.enTts);
    if (override) return override;
    return stripHtml(wordOrText.en);
  }
  const text = stripHtml(wordOrText);
  /* 단독 단어 gape를 gap(/ɡæp/)처럼 읽는 TTS 교정 */
  if (/^gape$/i.test(text)) return "gayp";
  return text.replace(/\bgape\b/gi, "gayp");
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

/** enRepeat: 1|2|3 — highlight 낭독 횟수 */
function getWordEnRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n) || n < 1) return 1;
  return Math.max(1, Math.min(3, Math.round(n)));
}

/** highlight 문구 (없으면 en) */
function getWordHighlightSpeak(word) {
  const hl = stripHtml(word?.highlight);
  if (hl) return hl;
  return stripHtml(word?.en);
}

/**
 * highlight만 enRepeat회 영어 낭독
 * voiceId — 직전에 쓴 en 음성과 동일하게 고정 (큐 소비 없음)
 */
async function playHighlightRepeats(word, voiceId) {
  const text = getWordHighlightSpeak(word);
  if (!text) return;
  const times = getWordEnRepeatCount(word);
  const voice =
    voiceId ||
    activeEnTtsVoiceId ||
    firstEnTtsVoiceId ||
    EN_TTS_VOICE_IDS[1];
  console.info("[63voca] highlight ×", times, text, "voice=", voice);
  for (let r = 0; r < times; r += 1) {
    await playBackendTTS(text, voice, 1);
    if (r < times - 1) await sleep(180);
  }
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
    const en = getEnSpeakText(word);
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

/** 페이지 EN — 왼쪽에서 한꺼번에 날아와 착지 (다음 페이지도 동일) */
function flyInPageEnglish(pageEls) {
  const list = Array.isArray(pageEls) ? pageEls : [];
  if (!list.length) return;
  list.forEach((wordEl) => wordEl.classList.remove("is-en-in"));
  void document.body.offsetWidth;
  list.forEach((wordEl) => wordEl.classList.add("is-en-in"));
}

const HL_PAINT_DEFAULT_MS = 850;
/** EX 배경 칠 — 글자당 일정 속도(사람 하이라이터처럼, TTS 무관) */
const EX_PAINT_MS_PER_CHAR = 80;
const EX_PAINT_MIN_MS = 1200;
const EX_PAINT_MAX_MS = 14000;

/** EX 텍스트 길이 → 일정 속도 칠하기 시간 */
function estimateExPaintMs(text) {
  const t = stripHtml(String(text || "")).replace(/\s+/g, " ").trim();
  if (!t) return 0;
  return Math.min(
    EX_PAINT_MAX_MS,
    Math.max(EX_PAINT_MIN_MS, Math.round(t.length * EX_PAINT_MS_PER_CHAR))
  );
}

/** 요소에 EN과 같은 형광 배경을 durationMs 동안 칠하기 */
async function paintHighlight(el, durationMs = HL_PAINT_DEFAULT_MS) {
  if (!el || !(durationMs > 0)) return;
  el.style.setProperty("--hl-paint-ms", `${durationMs}ms`);
  el.classList.remove("is-hl-on", "is-hl-painting");
  void el.offsetWidth;
  el.classList.add("is-hl-painting");
  await sleep(durationMs);
  el.classList.remove("is-hl-painting");
  el.classList.add("is-hl-on");
}

/** EX 예문 — 음성 없이 줄마다 일정 속도로 천천히 칠하기 */
async function paintExample(wordEl) {
  const lines = Array.from(wordEl?.querySelectorAll(".example-line") || []);
  if (!lines.length) return;
  for (const line of lines) {
    const ms = estimateExPaintMs(line.textContent);
    if (ms > 0) await paintHighlight(line, ms);
  }
}

function clearHighlightPaint(root) {
  root?.querySelectorAll(".is-hl-on, .is-hl-painting").forEach((node) => {
    node.classList.remove("is-hl-on", "is-hl-painting");
    node.style.removeProperty("--hl-paint-ms");
  });
}

/** 1회차용: 영어 낭독 + 하이라이트 칠하기 */
async function paintAndSpeakEn(wordEl, en) {
  const enEl = wordEl.querySelector(".en");
  wordEl.classList.add("is-speaking");
  if (enEl) {
    enEl.style.setProperty("--hl-paint-ms", `${HL_PAINT_DEFAULT_MS}ms`);
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
  wordEl.classList.add("is-en-in");
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
    wordEl.classList.remove("is-en-in");
    /* EN 하이라이트는 유지하되, 숨김 상태에서 보이지 않음 */
    wordEl.querySelector(".en")?.classList.remove("is-hl-painting");
    /* EX는 2회차에서 다시 칠하므로 초기화 */
    wordEl.querySelectorAll(".example-line").forEach((line) => {
      line.classList.remove("is-hl-on", "is-hl-painting");
      line.style.removeProperty("--hl-paint-ms");
    });
  });
}

/** 페이지(최대 5개) 1회차: 한글 숨김 → EN 한꺼번에 날아와 착지 → 순차 낭독 → 뜻 노출 */
async function runPass1OnPage(pageEls, pageItems) {
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
    clearHighlightPaint(wordEl);
  });

  /* 날아오는 동안 첫 EN TTS 미리 준비 (다음 페이지도 동일) */
  const firstItem = pageItems[0] || {};
  const firstSpeak = getEnSpeakText(firstItem) ||
    stripHtml(firstItem.en || pageEls[0]?.querySelector(".en")?.textContent || "");
  const firstReady = firstSpeak
    ? loadBackendTTSAudio(firstSpeak, activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1]).catch(() => null)
    : Promise.resolve(null);
  for (let i = 1; i < pageEls.length; i += 1) {
    const t = getEnSpeakText(pageItems[i] || {}) ||
      stripHtml(pageItems[i]?.en || pageEls[i]?.querySelector(".en")?.textContent || "");
    if (t) loadBackendTTSAudio(t, activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1]).catch(() => {});
  }

  /* 페이지 EN 한꺼번에 날아와 안착 */
  flyInPageEnglish(pageEls);
  await Promise.all([sleep(EN_FLY_MS), firstReady]);

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const enSpeak = getEnSpeakText(item) ||
      stripHtml(item.en || wordEl.querySelector(".en")?.textContent || "");

    await paintAndSpeakEn(wordEl, enSpeak);
    /* enRepeat — 같은 EN 추가 낭독 (highlight 대신) */
    const times = getWordEnRepeatCount(item);
    const enVoice = activeEnTtsVoiceId;
    for (let r = 1; r < times; r += 1) {
      if (enSpeak) await playBackendTTS(enSpeak, enVoice, 1);
      if (r < times - 1) await sleep(180);
    }
    await sleep(EN_TO_KO_GAP_MS);

    revealMeaning(wordEl);
    if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
    /* 한글 노출 → 500ms → EX 배경 칠 → 500ms → 다음 단어 */
    await sleep(getKoToExampleMs());
    await paintExample(wordEl);
    await sleep(getExampleHoldMs());
  }
}

/** 페이지(최대 5개) 2회차: 영어는 이미 숨긴 상태 → 한글 → 영어(+발음) */
async function runPass2OnPage(pageEls, pageItems) {
  /* EN 숨김은 페이지 표시 전에 prepareSecondPass(전체)로 처리됨 — 한글 TTS 없음 */
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const enSpeak = getEnSpeakText(item) ||
      stripHtml(item.en || wordEl.querySelector(".en")?.textContent || "");

    /* 영어·발음 노출·EN 낭독 → EX 칠(TTS 없음) → 1초 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(enSpeak);
    wordEl.classList.remove("is-speaking");
    await paintExample(wordEl);
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
  const pageSize = getWordsPerPage();
  const pageCount = Math.max(1, Math.ceil(wordEls.length / pageSize));

  /* true로 지정한 패스만 실행 */
  const doPass1 = PASS_CONFIG?.pass1 === true;
  const doPass2 = PASS_CONFIG?.pass2 === true;

  /* path1: 한글 숨김 → EN → KO → highlight */
  if (doPass1) {
    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);
      const isLastOfAll = !doPass2 && page === pageCount - 1;

      showWordPage(wordEls, page);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass1OnPage(pageEls, pageItems);
      if (!isLastOfAll) await sleep(PAGE_DONE_MS);
    }
  }

  /* path2: 영어 숨김 → 한글 보임(미낭독) → EN(+발음) */
  if (doPass2) {
    if (doPass1) {
      await sleep(getPass2DelayMs());
      /* EN 사라진 빈칸·페이지 점프가 안 보이게 페이드 뒤에 준비 */
      await fadeOutWordsForPassChange();
      prepareSecondPass(wordEls);
      showWordPage(wordEls, 0);
      await fadeInWordsForPassChange();
      await sleep(SECTION_GAP_MS);
    } else {
      prepareSecondPass(wordEls);
      await sleep(SECTION_GAP_MS);
    }

    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);
      const isLastOfAll = page === pageCount - 1;

      prepareSecondPass(pageEls);
      showWordPage(wordEls, page);
      await sleep(page === 0 ? (doPass1 ? 120 : PAGE_ENTER_FIRST_MS) : PAGE_ENTER_MS);
      await runPass2OnPage(pageEls, pageItems);
      if (!isLastOfAll) await sleep(PAGE_DONE_MS);
    }
  }

  /* summary 없음 — 종료 후 2초 대기 → 바로 quiz */
  const quizzes = getQuizList();
  if (!quizzes.length) return;

  await sleep(WORDS_TO_QUIZ_MS);
  await fadeOutWordsOnly();
  syncOverlayTop();
  await startReviewQuiz();
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

    /* 한글·highlight 낭독 없음 — blank 문장 1회 → 카운트 → 정답 노출 → 전체 낭독 */
    const speakText = buildQuizSpeakText(q.en);
    if (speakText) await playEnTTSQuiz(speakText);
    await sleep(280);

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
requestAnimationFrame(() => fitVisibleMeaningFonts());
window.addEventListener("resize", () => {
  fitStage();
  syncOverlayTop();
});
