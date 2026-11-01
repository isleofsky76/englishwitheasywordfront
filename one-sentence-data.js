/**
 * 문장으로 익히는 단어 — 피드 데이터
 * ---------------------------------------------------------------
 * ★ 여기만 수정하면 됩니다. 배열 맨 위 = 001, 아래로 002, 003…
 * 새 문장 추가: 객체 하나를 배열 맨 아래(또는 위)에 넣고 push.
 *
 * 필드:
 *   word, pos, meaning, ko, en, highlight(영문에서 노란 표시할 부분)
 *
 * 수동 추가 예:
 *   { word: 'smitten', pos: '형용사', meaning: '홀딱 반한, 푹 빠진',
 *     ko: '…', en: 'He was smitten …', highlight: 'smitten' }
 *
 * CLI로 한 줄 추가 (backend):
 *   node scripts/append-one-sentence.js --word smitten --pos 형용사 --meaning "홀딱 반한, 푹 빠진" --ko "…" --en "…" --highlight smitten
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
  }
];
