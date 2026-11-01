/**
 * 문장 피드 로컬 폴백 (API /onesentence 실패 시에만 사용)
 * 실제 누적은 MongoDB onesentence 컬렉션입니다.
 * 추가: cd backend && node scripts/append-one-sentence.js --word … --en …
 * 자동: cd backend && node scripts/auto-onesentence.js --count 10
 */
window.ONE_SENTENCE_FEED = [
  {
    "word": "smitten",
    "pos": "형용사",
    "meaning": "홀딱 반한, 푹 빠진",
    "ko": "그는 그녀를 처음 만난 순간부터 홀딱 반했다.",
    "en": "He was smitten with her from the moment they met.",
    "highlight": "smitten",
    "cf": [
      {
        "word": "smite",
        "pos": "동사",
        "meaning": "(세게) 치다; 반하게 하다"
      }
    ]
  },
  {
    "word": "requite",
    "pos": "동사",
    "meaning": "보답하다, 갚다",
    "ko": "그녀는 그의 친절을 잊지 않았고, 몇 년 뒤 그 은혜를 갚았다.",
    "en": "She never forgot his kindness and requited it years later.",
    "highlight": "requited",
    "cf": []
  },
  {
    "word": "weathered",
    "pos": "형용사",
    "meaning": "풍화된, 햇볕·바람에 그을린",
    "ko": "바위들이 풍화되어 기이하고 멋진 형태로 변해 있다.",
    "en": "The rocks are weathered into fantastic forms.",
    "highlight": "weathered",
    "cf": [
      {
        "word": "weather",
        "pos": "동사",
        "meaning": "견뎌내다"
      }
    ]
  },
  {
    "word": "piquant",
    "pos": "형용사",
    "meaning": "톡 쏘는, 매콤한, 자극적인",
    "ko": "그는 생선에 톡 쏘는 소스를 곁들여 냈다.",
    "en": "He served the fish with a piquant sauce.",
    "highlight": "piquant",
    "cf": []
  },
  {
    "word": "tragicomic",
    "pos": "형용사",
    "meaning": "비극적이면서도 우스운, 희비극의",
    "ko": "마지막에 비극적이면서도 우스운 장면이 몇 개 있었다.",
    "en": "There were a few tragicomic final scenes.",
    "highlight": "tragicomic",
    "cf": [
      {
        "word": "tragic",
        "pos": "형용사",
        "meaning": "비극적인"
      },
      {
        "word": "comic",
        "pos": "형용사",
        "meaning": "우스운, 희극적인"
      }
    ]
  },
  {
    "word": "idyll",
    "pos": "명사",
    "meaning": "목가, 전원적인 시·생활",
    "ko": "그녀의 시는 농장 생활에 대한 목가였다.",
    "en": "Her poem was an idyll about her life on a farm.",
    "highlight": "idyll",
    "cf": [
      {
        "word": "idyllic",
        "pos": "형용사",
        "meaning": "목가적인"
      }
    ]
  },
  {
    "word": "deliberate",
    "pos": "형용사",
    "meaning": "신중한, 차분한",
    "ko": "그녀는 천천히 신중한 태도로 말을 했다.",
    "en": "She spoke in a slow and deliberate way.",
    "highlight": "deliberate",
    "cf": [
      {
        "word": "deliberate",
        "pos": "동사",
        "meaning": "숙고하다",
        "_id": "6ae6b17138b65fd044b76605"
      }
    ]
  },
  {
    "word": "reticent",
    "pos": "형용사",
    "meaning": "과묵한, 말수가 적은",
    "ko": "그는 앞으로의 계획에 대해 말수가 적었다.",
    "en": "He was reticent about his plans for the future.",
    "highlight": "reticent",
    "cf": [
      {
        "word": "reticence",
        "pos": "명사",
        "meaning": "과묵함",
        "_id": "6ae6b2af029fed4167224bd0"
      }
    ]
  },
  {
    "word": "adapt",
    "pos": "동사",
    "meaning": "적응하다",
    "ko": "많은 동물들이 다양한 환경에 적응할 수 있다.",
    "en": "Many animals can adapt to different environments.",
    "highlight": "adapt",
    "cf": []
  },
  {
    "word": "gather",
    "pos": "동사",
    "meaning": "모으다",
    "ko": "우리는 내일 회의를 위해 모일 것입니다.",
    "en": "We will gather for a meeting tomorrow.",
    "highlight": "gather",
    "cf": []
  },
  {
    "word": "convey",
    "pos": "동사",
    "meaning": "전달하다",
    "ko": "나는 당신에게 고마움을 전달하고 싶습니다.",
    "en": "I want to convey my thanks to you.",
    "highlight": "convey",
    "cf": []
  },
  {
    "word": "essential",
    "pos": "형용사",
    "meaning": "필수적인",
    "ko": "물은 생명에 필수적입니다.",
    "en": "Water is essential for life.",
    "highlight": "essential",
    "cf": []
  },
  {
    "word": "obtain",
    "pos": "동사",
    "meaning": "얻다",
    "ko": "나는 더 많은 정보를 얻어야 합니다.",
    "en": "I need to obtain more information.",
    "highlight": "obtain",
    "cf": []
  },
  {
    "word": "remarkable",
    "pos": "형용사",
    "meaning": "주목할 만한",
    "ko": "그녀는 음악에 대한 주목할 만한 재능이 있습니다.",
    "en": "She has a remarkable talent for music.",
    "highlight": "remarkable",
    "cf": []
  },
  {
    "word": "navigate",
    "pos": "동사",
    "meaning": "항해하다, 길을 찾다",
    "ko": "이 지도를 길 찾는 데 도와주세요.",
    "en": "Please help me navigate this map.",
    "highlight": "navigate",
    "cf": []
  },
  {
    "word": "persuade",
    "pos": "동사",
    "meaning": "설득하다",
    "ko": "나는 그를 우리에게 합류하도록 설득하려고 할 것입니다.",
    "en": "I will try to persuade him to join us.",
    "highlight": "persuade",
    "cf": []
  },
  {
    "word": "contribute",
    "pos": "동사",
    "meaning": "기여하다",
    "ko": "모두가 프로젝트에 기여할 수 있습니다.",
    "en": "Everyone can contribute to the project.",
    "highlight": "contribute",
    "cf": []
  },
  {
    "word": "anticipate",
    "pos": "동사",
    "meaning": "기대하다",
    "ko": "나는 축제에서 좋은 시간을 기대합니다.",
    "en": "I anticipate a great time at the festival.",
    "highlight": "anticipate",
    "cf": []
  },
  {
    "word": "analyze",
    "pos": "동사",
    "meaning": "분석하다",
    "ko": "우리는 데이터를 신중하게 분석해야 합니다.",
    "en": "We need to analyze the data carefully.",
    "highlight": "analyze",
    "cf": []
  }
];
