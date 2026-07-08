/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[WSJ] 원유 공급 과잉이 이란의 협상력을 약화시키다',
  slug: 'oil-glut-weakens-iran-hand-hormuz-talks-wsj',
  metaDescription:
  '원유 가격이 하락하고 호르무즈 해협 유조선 통항이 회복되면서 각국이 석유 비축분을 다시 채울 기회가 생기고 있습니다. 이 글에서는 storage, restock, traffic 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_oil_glut_weakens_iran_hand_hormuz_talks_wsj',
  datePublished: '2026-07-05',
  
  intro: [
  '기사는 원유 공급이 늘고 가격이 하락하면서 각국이 석유 비축분을 다시 채울 수 있게 되었고, 그 결과 호르무즈 해협을 이용한 이란의 협상력이 약해질 수 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. storage',
  word: { en: 'storage', ko: '저장, 비축, 보관', pron: '스토리지' },
  example: {
  en: 'The amount of oil in storage around the world is playing a central role in the U.S.-Iran power dynamics.',
  ko: '전 세계의 석유 비축량은 미국과 이란 간의 권력 역학 관계에서 핵심적인 역할을 하고 있습니다.',
  },
  phrases: [
  { en: 'The amount of oil', ko: '석유의 양은' },
  { en: 'in storage', ko: '비축되어 있는' },
  { en: 'around the world', ko: '전 세계에' },
  { en: 'is playing', ko: '하고 있습니다' },
  { en: 'a central role', ko: '핵심적인 역할을' },
  { en: 'in the U.S.-Iran power dynamics', ko: '미국과 이란 간의 권력 역학 관계에서' },
  ],
  },
  {
  title: '중요 단어 2. restock',
  word: { en: 'restock', ko: '다시 채우다, 재비축하다', pron: '리스탁' },
  example: {
  en: 'The faster countries restock their buffers of crude, the weaker Iran’s ability to threaten the world economy by holding the Strait of Hormuz hostage.',
  ko: '각국이 원유 비축분을 더 빨리 채워 넣을수록, 호르무즈 해협을 볼모로 세계 경제를 위협하는 이란의 능력은 더 약해집니다.',
  },
  phrases: [
  { en: 'The faster countries restock', ko: '각국이 더 빨리 다시 채워 넣을수록' },
  { en: 'their buffers of crude', ko: '자국의 원유 비축분을' },
  { en: 'the weaker', ko: '더 약해집니다' },
  { en: 'Iran’s ability', ko: '이란의 능력은' },
  { en: 'to threaten the world economy', ko: '세계 경제를 위협하는' },
  { en: 'by holding the Strait of Hormuz hostage', ko: '호르무즈 해협을 볼모로 잡음으로써' },
  ],
  },
  {
  title: '중요 단어 3. traffic',
  word: { en: 'traffic', ko: '통행량, 통항량, 교통량', pron: '트래픽' },
  example: {
  en: 'Tanker traffic out of the Strait of Hormuz has entered a new normal, which is less than before the war, but enough to relieve pressure.',
  ko: '호르무즈 해협을 빠져나가는 유조선 통항량은 새로운 정상화 단계에 접어들었으며, 이는 전쟁 전보다는 적지만 시장의 압박을 완화하기에는 충분한 수준입니다.',
  },
  phrases: [
  { en: 'Tanker traffic', ko: '유조선 통항량은' },
  { en: 'out of the Strait of Hormuz', ko: '호르무즈 해협을 빠져나가는' },
  { en: 'has entered', ko: '접어들었습니다' },
  { en: 'a new normal', ko: '새로운 정상화 단계에' },
  { en: 'which is less than before the war', ko: '그것은 전쟁 전보다 적지만' },
  { en: 'but enough to relieve pressure', ko: '압박을 완화하기에는 충분합니다' },
  ],
  },
  ],
  source: {
  text: 'WSJ | A Sudden Glut of Oil Threatens to Weaken Iran’s Hand in Talks | By Rebecca Feng and Georgi Kantchev',
  url: 'https://www.wsj.com/finance/commodities-futures/a-sudden-glut-of-oil-threatens-to-weaken-irans-hand-in-talks-adfcf7c0',
  },
  
  youtube: 'https://youtube.com/shorts/y2BiZYvX2TU',
};




// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
