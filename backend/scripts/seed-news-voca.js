/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[CNN] 폴 펠로시 뺑소니 사고 연루 | 캘리포니아 와인 산지 교통사고와 경범죄 혐의',
  slug: 'paul-pelosi-hit-and-run-california-cnn',
  metaDescription:
  '낸시 펠로시 전 하원의장의 남편 폴 펠로시가 캘리포니아 나파카운티에서 주차된 차량을 들이받은 뒤 현장을 떠난 사고에 연루됐습니다. 이 글에서는 misdemeanor, octogenarian, restitution 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_paul_pelosi_hit_and_run_california_cnn',
  datePublished: '2026-07-04',
  
  intro: [
  '기사는 낸시 펠로시 전 하원의장의 남편 폴 펠로시가 캘리포니아 나파카운티에서 주차된 차량을 들이받은 뒤 현장을 떠난 사고에 연루됐고, 당국이 경범죄 혐의를 권고했다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. misdemeanor',
  word: { en: 'misdemeanor', ko: '경범죄, 비교적 가벼운 범죄', pron: '미스디미너' },
  example: {
  en: 'Authorities recommended a misdemeanor charge after the hit-and-run incident.',
  ko: '당국은 그 뺑소니 사고 이후 경범죄 혐의를 권고했습니다.',
  },
  phrases: [
  { en: 'Authorities', ko: '당국은' },
  { en: 'recommended', ko: '권고했습니다' },
  { en: 'a misdemeanor charge', ko: '경범죄 혐의를' },
  { en: 'after the hit-and-run incident', ko: '그 뺑소니 사고 이후에' },
  ],
  },
  {
  title: '중요 단어 2. octogenarian',
  word: { en: 'octogenarian', ko: '80대 노인, 80대인 사람', pron: '악터저네리언' },
  example: {
  en: 'The octogenarian told officers that he knew he had hit something.',
  ko: '그 80대 남성은 경찰관들에게 자신이 무언가를 쳤다는 것은 알고 있었다고 말했습니다.',
  },
  phrases: [
  { en: 'The octogenarian', ko: '그 80대 남성은' },
  { en: 'told officers', ko: '경찰관들에게 말했습니다' },
  { en: 'that he knew', ko: '자신이 알고 있었다고' },
  { en: 'he had hit something', ko: '무언가를 쳤다는 것을' },
  ],
  },
  {
  title: '중요 단어 3. restitution',
  word: { en: 'restitution', ko: '배상, 피해 보상', pron: '레스티튜션' },
  example: {
  en: 'He was previously ordered to pay victim restitution after a DUI case.',
  ko: '그는 이전 음주운전 사건 이후 피해자 배상금을 내라는 명령을 받은 적이 있습니다.',
  },
  phrases: [
  { en: 'He', ko: '그는' },
  { en: 'was previously ordered', ko: '이전에 명령을 받았습니다' },
  { en: 'to pay', ko: '지불하라는' },
  { en: 'victim restitution', ko: '피해자 배상금을' },
  { en: 'after a DUI case', ko: '음주운전 사건 이후에' },
  ],
  },
  ],
  
  source: {
  text: 'CNN | Paul Pelosi involved in hit and run in California and could face charges, authorities say | By Associated Press',
  url: 'https://edition.cnn.com/2026/07/04/politics/paul-pelosi-hit-and-run',
  },
  
  };


// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
