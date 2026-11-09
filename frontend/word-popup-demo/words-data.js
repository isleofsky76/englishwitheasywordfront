/*
 * words-data.js — 내 사이트 단어 데이터 (예시)
 * 실제 사이트에서는 단어장 데이터를 이 형식으로 내보내면 됩니다.
 *   '단어(기본형, 소문자)': { pos: '품사', meaning: '뜻' }
 */
window.DICT_WORDS = {
  company:    { pos: '명사', meaning: '회사, 기업' },
  decide:     { pos: '동사', meaning: '결정하다' },
  postpone:   { pos: '동사', meaning: '연기하다, 미루다' },
  launch:     { pos: '명사', meaning: '출시, 개시' },
  spring:     { pos: '명사', meaning: '봄' },
  proposal:   { pos: '명사', meaning: '제안, 제의' },
  intense:    { pos: '형용사', meaning: '강렬한, 극심한' },
  scrutiny:   { pos: '명사', meaning: '정밀 조사, 감시' },
  regulator:  { pos: '명사', meaning: '규제 기관, 규제 당국자' },
  official:   { pos: '명사', meaning: '공무원, 관리' },
  seek:       { pos: '동사', meaning: '찾다, 추구하다, ~하려고 노력하다' },
  mitigate:   { pos: '동사', meaning: '완화하다, 경감하다' },
  impact:     { pos: '명사', meaning: '영향, 충격' },
  rise:       { pos: '동사', meaning: '오르다, 상승하다' },
  price:      { pos: '명사', meaning: '가격, 물가' },
  leader:     { pos: '명사', meaning: '지도자, 정상' },
  agree:      { pos: '동사', meaning: '동의하다, 합의하다' },
  resume:     { pos: '동사', meaning: '재개하다, 다시 시작하다' },
  talk:       { pos: '명사', meaning: '(복수형 talks) 회담, 협상' },
  month:      { pos: '명사', meaning: '달, 월' },
};

/* 규칙대로 바뀌지 않는 형태 → 기본형 */
window.DICT_IRREGULAR = {
  sought: 'seek',
  rising: 'rise',
};
