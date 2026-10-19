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
 * 화면 표시
 * wordsPerPage — 한 화면에 보이는 단어 수 (예: 5 → 1~5, 다음 6~10)
 */
const DISPLAY_CONFIG = {
  wordsPerPage: 5,
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
 * 뜻 노출·낭독 후 퇴장 연출 (true / false)
 * riseOut  — true: 단어가 하나씩 위로 올라가며 사라지고, 아래 단어가 위로 붙음
 * swipeOut — true: 좌우·스프링 등 다양한 swipe 스타일로 퇴장
 * 둘 다 false면 자리 유지 / 둘 다 true면 swipeOut 우선
 */
const EXIT_CONFIG = {
  riseOut: true,
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

  /* [강조]=노랑, (강조)=미백, 그 밖=라임(녹색) — colourchange와 동일 3색 */
  title: [
    { text: "[프랑스 시위] 현장" },
    { text: "(충돌·방화·약탈) 관련 어휘" },
  ],

  source: "출처 : BBC",
  sourceMark: "추출 어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /* colourchange cardData.words 와 동일 구조 */
  words: [
    {
      en: "inhale",
      ko: "들이마시다",
      pos: "동",
      reading: "인헤일",
      ipa: "/ɪnˈheɪl/",
      defs: ["공기나 연기 등을 폐로 들이마시다"],
      example: "left her coughing rather than inhaling",
      cf: "",
      enRepeat: 2,
      highlight: "inhaling",
      translation: "그녀가 연기를 들이마시기보다는<br>기침을 하게 했다",
      image: "resources/inhale.png",
      icon: "🌬️",
      spark: "yellow",
      note: {
        phrase: "rather than<br>inhaling",
        text: "들이마시기<br>보다는"
      }
    },
    {
      en: "trigger",
      ko: "유발하다, 촉발하다",
      pos: "동",
      reading: "트리거",
      ipa: "/ˈtrɪɡər/",
      defs: ["어떤 반응이나 증상을 일으키다"],
      example: "triggers withdrawal symptoms",
      cf: "",
      enRepeat: 2,
      highlight: "triggers",
      translation: "금단 증상을<br>유발한다",
      image: "resources/trigger.png",
      icon: "⚡",
      spark: "red",
      note: {
        phrase: "trigger<br>withdrawal symptoms",
        text: "금단 증상을<br>유발하다"
      }
    },
    {
      en: "regulate",
      ko: "조절하다, 통제하다",
      pos: "동",
      reading: "레귤레이트",
      ipa: "/ˈreɡjəleɪt/",
      defs: ["상태나 활동을 일정하게 조절하다", "규칙이나 기준으로 통제하다"],
      example: "to regulate their emotions",
      cf: "",
      enRepeat: 2,
      highlight: "regulate",
      translation: "자신들의 감정을<br>조절하기 위해",
      image: "resources/regulate.png",
      icon: "🎛️",
      spark: "yellow",
      note: {
        phrase: "regulate<br>their emotions",
        text: "자신들의 감정을<br>조절하다"
      }
    },
    {
      en: "dull",
      ko: "감각을 무디게 하다",
      pos: "동",
      reading: "덜",
      ipa: "/dʌl/",
      defs: ["감각이나 감정의 강도를 약하게 하다"],
      example: "dulling her senses",
      cf: "",
      enRepeat: 2,
      highlight: "dulling",
      translation: "그녀의 감각을<br>무디게 하는",
      image: "resources/dull.png",
      icon: "🌫️",
      spark: "red",
      note: {
        phrase: "dull<br>her senses",
        text: "그녀의 감각을<br>무디게 하다"
      }
    },
    {
      en: "divert",
      ko: "방향을 돌리다, 전환시키다",
      pos: "동",
      reading: "다이버트",
      ipa: "/daɪˈvɜːrt/",
      defs: ["다른 방향이나 대상으로 돌리다", "특정 행동에서 벗어나게 하다"],
      example: "diverted them away from a more harmful behaviour",
      cf: "",
      enRepeat: 2,
      highlight: "diverted",
      translation: "그들이 더 해로운 행동에서<br>벗어나게 했다",
      image: "resources/divert.png",
      icon: "↪️",
      spark: "yellow",
      note: {
        phrase: "divert someone<br>away from ~",
        text: "누군가가 ~에서<br>벗어나게 하다"
      }
    },
    {
      en: "infer",
      ko: "추론하다",
      pos: "동",
      reading: "인퍼",
      ipa: "/ɪnˈfɜːr/",
      defs: ["증거나 정보를 바탕으로 결론을 이끌어 내다"],
      example: "We can infer from that",
      cf: "",
      enRepeat: 2,
      highlight: "infer",
      translation: "우리는 그것으로부터<br>추론할 수 있다",
      image: "resources/infer.png",
      icon: "🔍",
      spark: "yellow",
      note: {
        phrase: "infer<br>from that",
        text: "그것을 근거로<br>추론하다"
      }
    },
    {
      en: "fuel",
      ko: "부추기다, 가속화하다",
      pos: "동",
      reading: "퓨얼",
      ipa: "/ˈfjuːəl/",
      defs: ["감정이나 현상을 더욱 강하게 만들다", "확산이나 성장을 부추기다"],
      example: "helped to fuel a “misconception”",
      cf: "",
      enRepeat: 2,
      highlight: "fuel",
      translation: "‘잘못된 인식’을<br>부추기는 데 일조했다",
      image: "resources/fuel.png",
      icon: "🔥",
      spark: "red",
      note: {
        phrase: "fuel<br>a misconception",
        text: "잘못된 인식을<br>부추기다"
      }
    },
    {
      en: "withdrawal",
      ko: "금단",
      pos: "명",
      reading: "위드드로얼",
      ipa: "/wɪðˈdrɔːəl/",
      defs: ["의존하던 물질의 사용을 줄이거나 끊는 것", "그 과정에서 나타나는 신체적·정신적 반응"],
      example: "withdrawal symptoms",
      cf: "",
      enRepeat: 2,
      highlight: "withdrawal",
      translation: "금단 증상",
      image: "resources/withdrawal.png",
      icon: "🚭",
      spark: "red",
      note: {
        phrase: "withdrawal<br>symptoms",
        text: "의존하던 물질을 끊을 때<br>나타나는 증상"
      }
    },
    {
      en: "irritability",
      ko: "짜증, 과민함",
      pos: "명",
      reading: "이리터빌러티",
      ipa: "/ˌɪrɪtəˈbɪləti/",
      defs: ["쉽게 짜증을 내거나 화를 내는 상태"],
      example: "irritability and anxiety",
      cf: "",
      enRepeat: 2,
      highlight: "irritability",
      translation: "짜증과 불안",
      image: "resources/irritability.png",
      icon: "😠",
      spark: "red",
      note: {
        phrase: "irritability<br>and anxiety",
        text: "쉽게 짜증이 나는 상태와<br>불안"
      }
    },
    {
      en: "dependence",
      ko: "의존",
      pos: "명",
      reading: "디펜던스",
      ipa: "/dɪˈpendəns/",
      defs: ["특정 물질이나 대상에 의지하는 상태", "없으면 어려움을 느낄 정도로 의존하는 상태"],
      example: "psychological dependence",
      cf: "",
      enRepeat: 2,
      highlight: "dependence",
      translation: "심리적 의존",
      image: "resources/dependence.png",
      icon: "🔗",
      spark: "red",
      note: {
        phrase: "psychological<br>dependence",
        text: "심리적으로<br>의지하는 상태"
      }
    },
    {
      en: "dummy",
      ko: "공갈젖꼭지",
      pos: "명",
      reading: "더미",
      ipa: "/ˈdʌmi/",
      defs: ["아기를 달래기 위해 물리는 공갈젖꼭지", "영국 영어 표현으로 미국 영어의 pacifier"],
      example: "an adult’s version of a dummy",
      cf: "",
      enRepeat: 2,
      highlight: "dummy",
      translation: "어른용 공갈젖꼭지",
      image: "resources/dummy.png",
      icon: "👶",
      spark: "yellow",
      note: {
        phrase: "an adult’s version<br>of a dummy",
        text: "공갈젖꼭지의<br>어른 버전"
      }
    },
    {
      en: "misconception",
      ko: "오해, 잘못된 인식",
      pos: "명",
      reading: "미스컨셉션",
      ipa: "/ˌmɪskənˈsepʃən/",
      defs: ["잘못된 이해나 정보에서 비롯된 생각"],
      example: "a “misconception” that they are safe",
      cf: "",
      enRepeat: 2,
      highlight: "misconception",
      translation: "그것들이 안전하다는<br>‘잘못된 인식’",
      image: "resources/misconception.png",
      icon: "❓",
      spark: "red",
      note: {
        phrase: "a misconception<br>that they are safe",
        text: "그것들이 안전하다는<br>오해"
      }
    },
    {
      en: "consultation",
      ko: "의견 수렴, 협의",
      pos: "명",
      reading: "칸설테이션",
      ipa: "/ˌkɑːnsəlˈteɪʃən/",
      defs: ["정책 결정 전에 관계자나 대중의 의견을 듣는 과정", "전문가 등과 상의하는 것"],
      example: "a recent government consultation",
      cf: "",
      enRepeat: 2,
      highlight: "consultation",
      translation: "최근 정부의<br>의견 수렴 절차",
      image: "resources/consultation.png",
      icon: "💬",
      spark: "yellow",
      note: {
        phrase: "government<br>consultation",
        text: "정부가 정책에 관한<br>의견을 수렴하는 절차"
      }
    },
    {
      en: "driver",
      ko: "동인, 주요 원인",
      pos: "명",
      reading: "드라이버",
      ipa: "/ˈdraɪvər/",
      defs: ["변화나 성장을 일으키는 주요 요인"],
      example: "a key driver in the rise of youth vaping",
      cf: "",
      enRepeat: 2,
      highlight: "driver",
      translation: "청소년 전자담배 사용 증가의<br>핵심 요인",
      image: "resources/driver.png",
      icon: "⚙️",
      spark: "yellow",
      note: {
        phrase: "a key driver<br>in the rise",
        text: "증가를 이끄는<br>핵심 요인"
      }
    },
    {
      en: "cessation",
      ko: "중단, 끊기",
      pos: "명",
      reading: "세세이션",
      ipa: "/seˈseɪʃən/",
      defs: ["행동이나 활동을 중단하는 것"],
      example: "vaping cessation support",
      cf: "",
      enRepeat: 2,
      highlight: "cessation",
      translation: "전자담배를 끊기 위한<br>지원",
      image: "resources/cessation.png",
      icon: "🚭",
      spark: "yellow",
      note: {
        phrase: "vaping cessation<br>support",
        text: "전자담배 사용 중단을 돕는<br>지원"
      }
    },
    {
      en: "appeal",
      ko: "매력, 호소력",
      pos: "명",
      reading: "어필",
      ipa: "/əˈpiːl/",
      defs: ["관심이나 호감을 끄는 힘"],
      example: "reduce the appeal of vaping",
      cf: "",
      enRepeat: 2,
      highlight: "appeal",
      translation: "전자담배의<br>매력을 줄이다",
      image: "resources/appeal.png",
      icon: "✨",
      spark: "yellow",
      note: {
        phrase: "reduce the appeal<br>of vaping",
        text: "전자담배에 대한<br>매력을 낮추다"
      }
    },
    {
      en: "vocal",
      ko: "의견을 거리낌 없이 밝히는",
      pos: "형",
      reading: "보컬",
      ipa: "/ˈvoʊkəl/",
      defs: ["자신의 의견을 분명하고 공개적으로 표현하는"],
      example: "she was vocal about the fact",
      cf: "",
      enRepeat: 2,
      highlight: "vocal",
      translation: "그녀는 그 사실에 대해<br>거리낌 없이 말했다",
      image: "resources/vocal.png",
      icon: "📣",
      spark: "yellow",
      note: {
        phrase: "be vocal<br>about ~",
        text: "~에 관한 의견을<br>공개적으로 밝히다"
      }
    },
    {
      en: "repulsive",
      ko: "혐오스러운",
      pos: "형",
      reading: "리펄시브",
      ipa: "/rɪˈpʌlsɪv/",
      defs: ["강한 혐오감이나 불쾌감을 일으키는"],
      example: "as repulsive as smoking",
      cf: "",
      enRepeat: 2,
      highlight: "repulsive",
      translation: "흡연만큼<br>혐오스러운",
      image: "resources/repulsive.png",
      icon: "🤢",
      spark: "red",
      note: {
        phrase: "as repulsive<br>as smoking",
        text: "흡연과 같은 정도로<br>혐오스러운"
      }
    },
    {
      en: "addictive",
      ko: "중독성 있는",
      pos: "형",
      reading: "어딕티브",
      ipa: "/əˈdɪktɪv/",
      defs: ["계속 사용하거나 반복하고 싶게 만드는", "중독을 일으킬 수 있는"],
      example: "a highly addictive substance",
      cf: "",
      enRepeat: 2,
      highlight: "addictive",
      translation: "중독성이 매우 강한<br>물질",
      image: "resources/addictive.png",
      icon: "🔗",
      spark: "red",
      note: {
        phrase: "a highly addictive<br>substance",
        text: "중독성이 매우 강한<br>물질"
      }
    },
    {
      en: "mindless",
      ko: "무심코 하는, 생각 없는",
      pos: "형",
      reading: "마인드리스",
      ipa: "/ˈmaɪndləs/",
      defs: ["별다른 생각이나 주의 없이 하는"],
      example: "a “mindless action”",
      cf: "",
      enRepeat: 2,
      highlight: "mindless",
      translation: "‘무심코 하는 행동’",
      image: "resources/mindless.png",
      icon: "💭",
      spark: "yellow",
      note: {
        phrase: "a mindless<br>action",
        text: "생각 없이 무심코<br>하는 행동"
      }
    },
    {
      en: "habitual",
      ko: "습관적인",
      pos: "형",
      reading: "허비추얼",
      ipa: "/həˈbɪtʃuəl/",
      defs: ["습관이 되어 반복되는", "평소에 늘 하는"],
      example: "the habitual aspect of regular vaping",
      cf: "",
      enRepeat: 2,
      highlight: "habitual",
      translation: "전자담배를 정기적으로 사용하는 데 따르는<br>습관적인 측면",
      image: "resources/habitual.png",
      icon: "🔄",
      spark: "yellow",
      note: {
        phrase: "the habitual<br>aspect",
        text: "습관적으로 반복되는<br>측면"
      }
    },
    {
      en: "demotivated",
      ko: "의욕을 잃은",
      pos: "형(과거분사)",
      reading: "디모티베이티드",
      ipa: "/diːˈmoʊtɪveɪtɪd/",
      defs: ["행동하거나 노력할 동기를 잃은"],
      example: "leaving her demotivated",
      cf: "",
      enRepeat: 2,
      highlight: "demotivated",
      translation: "그녀가 의욕을<br>잃게 만드는",
      image: "resources/demotivated.png",
      icon: "😞",
      spark: "red",
      note: {
        phrase: "leaving her<br>demotivated",
        text: "그녀의 의욕을<br>떨어뜨리는"
      }
    },
    {
      en: "reliant",
      ko: "의존하는",
      pos: "형",
      reading: "릴라이언트",
      ipa: "/rɪˈlaɪənt/",
      defs: ["도움이나 지원을 특정 대상에 의지하는"],
      example: "how reliant she had become",
      cf: "",
      enRepeat: 2,
      highlight: "reliant",
      translation: "그녀가 얼마나<br>의존하게 됐는지",
      image: "resources/reliant.png",
      icon: "🔗",
      spark: "red",
      note: {
        phrase: "become reliant<br>on ~",
        text: "~에<br>의존하게 되다"
      }
    },
    {
      en: "prominent",
      ko: "두드러진, 눈에 띄는",
      pos: "형",
      reading: "프라미넌트",
      ipa: "/ˈprɑːmɪnənt/",
      defs: ["쉽게 눈에 띄는", "두드러지거나 중요한"],
      example: "marketing which is very prominent",
      cf: "",
      enRepeat: 2,
      highlight: "prominent",
      translation: "매우 눈에 띄는<br>마케팅",
      image: "resources/prominent.png",
      icon: "👀",
      spark: "yellow",
      note: {
        phrase: "very prominent<br>marketing",
        text: "매우 두드러지는<br>마케팅"
      }
    },
    {
      en: "disposable",
      ko: "일회용의",
      pos: "형",
      reading: "디스포저블",
      ipa: "/dɪˈspoʊzəbəl/",
      defs: ["한 번 또는 짧은 기간 사용한 뒤 버리도록 만든"],
      example: "Disposable vapes were banned",
      cf: "",
      enRepeat: 2,
      highlight: "Disposable",
      translation: "일회용 전자담배가<br>금지됐다",
      image: "resources/disposable.png",
      icon: "🗑️",
      spark: "yellow",
      note: {
        phrase: "disposable<br>vapes",
        text: "사용 후 버리는<br>일회용 전자담배"
      }
    },
    {
      en: "patchy",
      ko: "고르지 못한, 들쭉날쭉한",
      pos: "형",
      reading: "패치",
      ipa: "/ˈpætʃi/",
      defs: ["질이나 제공 수준이 일정하지 않은", "일부 지역이나 부분에만 있는"],
      example: "professional support is patchy",
      cf: "",
      enRepeat: 2,
      highlight: "patchy",
      translation: "전문적인 지원이<br>고르게 제공되지 않는다",
      image: "resources/patchy.png",
      icon: "🧩",
      spark: "red",
      note: {
        phrase: "professional support<br>is patchy",
        text: "전문적인 지원이<br>들쭉날쭉하다"
      }
    },
    {
      en: "preventable",
      ko: "예방 가능한",
      pos: "형",
      reading: "프리벤터블",
      ipa: "/prɪˈventəbəl/",
      defs: ["미리 조치하면 발생을 막을 수 있는"],
      example: "preventable illness",
      cf: "",
      enRepeat: 2,
      highlight: "preventable",
      translation: "예방 가능한 질병",
      image: "resources/preventable.png",
      icon: "🛡️",
      spark: "yellow",
      note: {
        phrase: "preventable<br>illness",
        text: "미리 막을 수 있는<br>질병"
      }
    },
    {
      en: "premature",
      ko: "때 이른, 조기의",
      pos: "형",
      reading: "프리머추어",
      ipa: "/ˌpriːməˈtʃʊr/",
      defs: ["정상적이거나 예상되는 시기보다 이른"],
      example: "premature death",
      cf: "",
      enRepeat: 2,
      highlight: "premature",
      translation: "조기 사망",
      image: "resources/premature.png",
      icon: "⏳",
      spark: "red",
      note: {
        phrase: "premature<br>death",
        text: "예상보다 이른<br>사망"
      }
    },
    {
      en: "year-on-year",
      ko: "전년 대비",
      pos: "부",
      reading: "이어 온 이어",
      ipa: "/ˌjɪr ɑːn ˈjɪr/",
      defs: ["이전 해의 같은 기간과 비교하여"],
      example: "has risen year-on-year",
      cf: "",
      enRepeat: 2,
      highlight: "year-on-year",
      translation: "전년 대비<br>증가해 왔다",
      image: "resources/year-on-year.png",
      icon: "📅",
      spark: "yellow",
      note: {
        phrase: "has risen<br>year-on-year",
        text: "전년 같은 기간보다<br>증가했다"
      }
    },
    {
      en: "steadily",
      ko: "꾸준히",
      pos: "부",
      reading: "스테딜리",
      ipa: "/ˈstedɪli/",
      defs: ["큰 변동이나 중단 없이 지속적으로"],
      example: "continues to steadily fall",
      cf: "",
      enRepeat: 2,
      highlight: "steadily",
      translation: "계속해서 꾸준히<br>감소하고 있다",
      image: "resources/steadily.png",
      icon: "📉",
      spark: "yellow",
      note: {
        phrase: "steadily<br>fall",
        text: "꾸준히<br>감소하다"
      }
    },
    {
      en: "gradually",
      ko: "점차, 서서히",
      pos: "부",
      reading: "그래주얼리",
      ipa: "/ˈɡrædʒuəli/",
      defs: ["시간이 흐르면서 조금씩"],
      example: "gradually formed a vaping habit",
      cf: "",
      enRepeat: 2,
      highlight: "gradually",
      translation: "서서히 전자담배를 사용하는<br>습관이 생겼다",
      image: "resources/gradually.png",
      icon: "⏳",
      spark: "yellow",
      note: {
        phrase: "gradually formed<br>a vaping habit",
        text: "전자담배 사용 습관이<br>서서히 생겼다"
      }
    },
    {
      en: "otherwise",
      ko: "그렇지 않았다면",
      pos: "부",
      reading: "어더와이즈",
      ipa: "/ˈʌðərwaɪz/",
      defs: ["앞서 말한 상황이 아니었다면", "그와 다른 경우에는"],
      example: "wouldn’t have smoked otherwise",
      cf: "",
      enRepeat: 2,
      highlight: "otherwise",
      translation: "그렇지 않았다면<br>담배를 피우지 않았을 것이다",
      image: "resources/otherwise.png",
      icon: "↔️",
      spark: "yellow",
      note: {
        phrase: "wouldn’t have smoked<br>otherwise",
        text: "그런 상황이 아니었다면<br>흡연하지 않았을 것이다"
      }
    },
    {
      en: "take off",
      ko: "급격히 유행하다",
      pos: "동사구",
      reading: "테이크 오프",
      ipa: "/teɪk ɔːf/",
      defs: ["인기나 활동이 급격히 증가하다", "빠르게 성공하거나 확산되다"],
      example: "When vaping first took off",
      cf: "",
      enRepeat: 2,
      highlight: "took off",
      translation: "전자담배가 처음<br>급격히 유행하기 시작했을 때",
      image: "resources/take-off.png",
      icon: "🚀",
      spark: "yellow",
      note: {
        phrase: "vaping first<br>took off",
        text: "전자담배가 처음<br>급격히 유행했다"
      }
    },
    {
      en: "take up",
      ko: "습관·취미를 시작하다",
      pos: "동사구",
      reading: "테이크 업",
      ipa: "/teɪk ʌp/",
      defs: ["새로운 활동이나 습관을 시작하다"],
      example: "she too had taken it up",
      cf: "",
      enRepeat: 2,
      highlight: "taken it up",
      translation: "그녀 역시<br>그것을 시작했다",
      image: "resources/take-up.png",
      icon: "▶️",
      spark: "yellow",
      note: {
        phrase: "take up<br>vaping",
        text: "전자담배 사용을<br>시작하다"
      }
    },
    {
      en: "get hooked (on)",
      ko: "~에 중독되다, 푹 빠지다",
      pos: "동사구",
      reading: "겟 훅트 온",
      ipa: "/ɡet hʊkt ɑːn/",
      defs: ["특정 물질이나 활동에 중독되다", "무언가에 강하게 빠져들다"],
      example: "what got her hooked",
      cf: "",
      enRepeat: 2,
      highlight: "got her hooked",
      translation: "그녀를 중독되게<br>만든 것",
      image: "resources/get-hooked.png",
      icon: "🪝",
      spark: "red",
      note: {
        phrase: "get hooked<br>on vaping",
        text: "전자담배에<br>중독되다"
      }
    },
    {
      en: "go hand in hand with",
      ko: "~와 밀접하게 함께하다",
      pos: "관용구",
      reading: "고 핸드 인 핸드 위드",
      ipa: "/ɡoʊ hænd ɪn hænd wɪð/",
      defs: ["두 현상이 밀접하게 연결되어 함께 나타나다"],
      example: "went hand in hand with doomscrolling",
      cf: "",
      enRepeat: 2,
      highlight: "went hand in hand with",
      translation: "부정적인 소식을 계속 찾아보는<br>둠스크롤링과 맞물려 있었다",
      image: "resources/go-hand-in-hand-with.png",
      icon: "🔗",
      spark: "yellow",
      note: {
        phrase: "went hand in hand<br>with doomscrolling",
        text: "둠스크롤링과<br>밀접하게 연결돼 있었다"
      }
    },
    {
      en: "alarm bells ring",
      ko: "경고 신호가 울리다",
      pos: "관용구",
      reading: "얼람 벨즈 링",
      ipa: "/əˈlɑːrm belz rɪŋ/",
      defs: ["위험이나 문제를 알아차리게 되다", "무언가 잘못됐다는 경각심이 들다"],
      example: "“alarm bells” may ring",
      cf: "",
      enRepeat: 2,
      highlight: "alarm bells",
      translation: "‘경고 신호’가<br>울릴 수 있다",
      image: "resources/alarm-bells-ring.png",
      icon: "🔔",
      spark: "red",
      note: {
        phrase: "alarm bells<br>may ring",
        text: "문제가 있다는<br>경각심이 들 수 있다"
      }
    },
    {
      en: "in due course",
      ko: "때가 되면, 적절한 시기에",
      pos: "부사구",
      reading: "인 듀 코스",
      ipa: "/ɪn duː kɔːrs/",
      defs: ["적절한 시간이 지나거나 절차를 거친 뒤에"],
      example: "expected to give a response in due course",
      cf: "",
      enRepeat: 2,
      highlight: "in due course",
      translation: "적절한 시기에<br>답변할 것으로 예상되는",
      image: "resources/in-due-course.png",
      icon: "🕒",
      spark: "yellow",
      note: {
        phrase: "give a response<br>in due course",
        text: "적절한 시기에<br>답변하다"
      }
    },
    {
      en: "give up",
      ko: "그만두다, 끊다",
      pos: "동사구",
      reading: "기브 업",
      ipa: "/ɡɪv ʌp/",
      defs: ["계속하던 행동이나 습관을 그만두다", "사용하던 것을 끊다"],
      example: "giving up vaping can be a struggle",
      cf: "",
      enRepeat: 2,
      highlight: "giving up",
      translation: "전자담배를 끊는 것은<br>힘겨운 일일 수 있다",
      image: "resources/give-up.png",
      icon: "🚭",
      spark: "yellow",
      note: {
        phrase: "giving up<br>vaping",
        text: "전자담배를<br>끊는 것"
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
  //     image: "resources/ransack.png",
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

/** 예문 — highlight/en 키워드 mark (활용형도 stem 매칭) */
function highlightSentence(sentence, target, fallback) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  const safe = allowBreakTags(escapeHtml(raw));
  const candidates = [...new Set(
    [target, fallback].map((v) => String(v || "").trim()).filter(Boolean)
  )];
  if (!candidates.length) return safe;

  for (const t of candidates) {
    const re = new RegExp(`\\b(${escapeRegExp(t)})\\b`, "i");
    if (re.test(safe)) return safe.replace(re, "<mark>$1</mark>");
  }

  /* containing → contained 등: 짧은 쪽을 stem으로 활용형 매칭 */
  const stem = candidates.slice().sort((a, b) => a.length - b.length)[0];
  if (stem.length >= 4) {
    const re = new RegExp(`\\b(${escapeRegExp(stem)}[a-zA-Z']*)\\b`, "i");
    if (re.test(safe)) return safe.replace(re, "<mark>$1</mark>");
  }
  return safe;
}

/** 예문 괄호 안 한글 — 영어보다 4px 작게 */
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

function renderTitle() {
  const titleEl = document.getElementById("title");
  if (!titleEl) return;

  const lines = (WORDS.title || [])
    .map((line) => {
      if (typeof line === "string") return formatTitleMarks(line);
      const parts = [];
      if (line.hl) parts.push(formatTitleMarks(line.hl));
      if (line.after) parts.push(formatTitleMarks(line.after));
      if (line.text && !line.hl) parts.push(formatTitleMarks(line.text));
      return parts.join("");
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
    wordEl.classList.toggle("is-page-hidden", i < start || i >= end);
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
    /* 하이라이트는 낭독 시 칠해짐 — 처음엔 미도포 */
    row.appendChild(el("span", "en " + hlClass, w.en));
    row.insertAdjacentHTML("beforeend", ARROW_SVG);
    row.appendChild(el("span", "meaning", w.ko));
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

  /* 한글·V 미노출 → EN 낭독 → 한글 노출 → 비스듬한 V */
  rows.forEach((row) => {
    row.classList.remove(
      "is-checked",
      "is-drawing-check",
      "is-check-done",
      "is-active",
      "is-ko-revealed"
    );
  });

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const en = stripHtml(list[i]?.en);

    row.classList.add("is-active");
    try {
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (_) {}

    /* 1) 영어 낭독 (한글은 아직 숨김) */
    if (en) await playEnTTS(en);

    /* 2) 한글 노출 */
    row.classList.add("is-ko-revealed");
    await sleep(280);

    /* 3) 비스듬한 V */
    row.classList.add("is-checked");
    row.classList.remove("is-check-done");
    void row.offsetWidth;
    row.classList.add("is-drawing-check");
    await sleep(SUMMARY_CHECK_DRAW_MS);
    row.classList.remove("is-drawing-check");
    row.classList.add("is-check-done");

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
    /* quiz 후 재표시 — 한글·V 이미 완료 상태 */
    document.querySelectorAll("#summary-list .summary-row").forEach((row) => {
      row.classList.add("is-ko-revealed", "is-checked", "is-check-done");
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
const WORD_GAP_MS = 200;
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
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

/** 페이지(최대 5개) 1회차: 한글 숨김 → 영어 → 한글 (자리 유지) */
async function runPass1OnPage(pageEls, pageItems) {
  const stage = document.getElementById("stage");
  stage?.classList.add("hide-meaning");
  pageEls.forEach((wordEl) => {
    wordEl.classList.remove("is-revealed", "is-en-hidden", "is-pron-hidden", "is-en-revealing");
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-on", "is-hl-painting");
  });

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    await paintAndSpeakEn(wordEl, en);
    await sleep(EN_TO_KO_GAP_MS);

    /* 한글 노출과 동시에 낭독 */
    revealMeaning(wordEl);
    if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
    await playKoTTS(ko);
    await exitWordAfterMeaning(wordEl);
    await sleep(WORD_GAP_MS);
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

    await playKoTTS(ko);
    await sleep(EN_TO_KO_GAP_MS);

    /* 영어·발음·예문 노출과 동시에 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(en);
    wordEl.classList.remove("is-speaking");
    await sleep(WORD_GAP_MS);
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

  const doPass1 = PASS_CONFIG?.pass1 !== false;
  const doPass2 = PASS_CONFIG?.pass2 !== false;

  /* path1: 한글 숨김 → EN → KO */
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

  /* 마지막 단어 부드럽게 페이드 → 요약 → quiz(종료 후 유지) */
  await fadeOutWordsOnly();
  syncOverlayTop();
  await sleep(SECTION_GAP_MS);

  await playSummaryScreen({ animateChecks: true });

  await sleep(SUMMARY_TO_QUIZ_MS);
  await fadeOutSummary();
  await startReviewQuiz();
  /* quiz 화면 유지 — 더 이상 넘어가지 않음 */
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
