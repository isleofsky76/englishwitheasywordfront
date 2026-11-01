/**
 * 문장 피드 로컬 폴백 (API /onesentence 실패 시에만 사용)
 * 실제 누적은 MongoDB onesentence 컬렉션입니다.
 * 추가: cd backend && node scripts/append-one-sentence.js --word … --en …
 */
window.ONE_SENTENCE_FEED = [
  {
    word: 'smitten',
    pos: '형용사',
    meaning: '홀딱 반한, 푹 빠진',
    ko: '그는 그녀를 처음 만난 순간부터 홀딱 반했다.',
    en: 'He was smitten with her from the moment they met.',
    highlight: 'smitten'
  },
  {
    word: 'requite',
    pos: '동사',
    meaning: '보답하다, 갚다',
    ko: '그녀는 그의 친절을 잊지 않았고, 몇 년 뒤 그 은혜를 갚았다.',
    en: 'She never forgot his kindness and requited it years later.',
    highlight: 'requited'
  },
  {
    word: 'weathered',
    pos: '형용사',
    meaning: '풍화된, 햇볕·바람에 그을린',
    ko: '바위들이 풍화되어 기이하고 멋진 형태로 변해 있다.',
    en: 'The rocks are weathered into fantastic forms.',
    highlight: 'weathered'
  },
  {
    word: 'piquant',
    pos: '형용사',
    meaning: '톡 쏘는, 매콤한, 자극적인',
    ko: '그는 생선에 톡 쏘는 소스를 곁들여 냈다.',
    en: 'He served the fish with a piquant sauce.',
    highlight: 'piquant'
  },
  {
    word: 'tragicomic',
    pos: '형용사',
    meaning: '비극적이면서도 우스운, 희비극의',
    ko: '마지막에 비극적이면서도 우스운 장면이 몇 개 있었다.',
    en: 'There were a few tragicomic final scenes.',
    highlight: 'tragicomic'
  }
];
