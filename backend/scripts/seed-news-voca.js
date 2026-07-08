/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[WSJ] 전기차 배터리 수명이 예상보다 오래간다 | EV 구매 불안과 배터리 내구성',
  slug: 'ev-batteries-defying-expectations-long-lasting-wsj',
  metaDescription:
  '최신 전기차 배터리가 수십만 마일을 달린 뒤에도 예상보다 신뢰성과 수명을 잘 유지하고 있다는 분석이 나왔습니다. 이 글에서는 reliable, steer clear, regulation 세 가지 핵심 영어 표현을 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_ev_batteries_defying_expectations_long_lasting_wsj',
  datePublished: '2026-07-04',
  
  intro: [
  '기사는 최신 전기차 배터리가 업계 예상보다 오래가고 신뢰성도 높다는 데이터가 나오고 있지만, 소비자들은 여전히 배터리 교체 비용을 걱정해 전기차 구매를 망설이고 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. reliable',
  word: { en: 'reliable', ko: '신뢰할 수 있는, 믿을 만한', pron: '릴라이어블' },
  example: {
  en: 'Modern electric-vehicle batteries are proving exceptionally reliable and long-lasting, performing better than many in the auto industry expected.',
  ko: '현대적인 전기차 배터리는 매우 신뢰할 수 있고 오래 지속된다는 것을 입증하고 있으며, 자동차 업계의 많은 이들이 예상했던 것보다 더 나은 성능을 보여주고 있습니다.',
  },
  phrases: [
  { en: 'Modern electric-vehicle batteries', ko: '현대적인 전기차 배터리는' },
  { en: 'are proving', ko: '입증하고 있습니다' },
  { en: 'exceptionally reliable and long-lasting', ko: '매우 신뢰할 수 있고 오래 지속된다는 것을' },
  { en: 'performing better', ko: '더 나은 성능을 보여주며' },
  { en: 'than many in the auto industry expected', ko: '자동차 업계의 많은 이들이 예상했던 것보다' },
  ],
  },
  {
  title: '중요 표현 2. steer clear',
  word: { en: 'steer clear', ko: '피하다, 가까이하지 않다', pron: '스티어 클리어' },
  example: {
  en: 'Potential new car buyers’ fear of having to pay for a battery replacement is the number one reason they choose to steer clear of EVs.',
  ko: '잠재적인 신차 구매자들이 배터리 교체 비용을 지불해야 할지도 모른다는 두려움은 그들이 전기차를 피하기로 선택하는 가장 큰 이유입니다.',
  },
  phrases: [
  { en: 'Potential new car buyers’ fear', ko: '잠재적인 신차 구매자들의 두려움은' },
  { en: 'of having to pay', ko: '지불해야 할지도 모른다는' },
  { en: 'for a battery replacement', ko: '배터리 교체 비용을' },
  { en: 'is the number one reason', ko: '가장 큰 이유입니다' },
  { en: 'they choose', ko: '그들이 선택하는' },
  { en: 'to steer clear of EVs', ko: '전기차를 피하기로' },
  ],
  },
  {
  title: '중요 단어 3. regulation',
  word: { en: 'regulation', ko: '조절, 규제, 관리', pron: '레귤레이션' },
  example: {
  en: 'Improvements in car batteries’ chemical contents, battery-management systems and thermal regulation have been the difference in making batteries last longer and cost less.',
  ko: '자동차 배터리의 화학 성분, 배터리 관리 시스템, 열 관리의 개선이 배터리를 더 오래 지속되게 하고 비용을 낮추는 차이를 만들어냈습니다.',
  },
  phrases: [
  { en: 'Improvements', ko: '개선은' },
  { en: 'in car batteries’ chemical contents', ko: '자동차 배터리의 화학 성분에서의' },
  { en: 'battery-management systems', ko: '배터리 관리 시스템에서의' },
  { en: 'and thermal regulation', ko: '그리고 열 관리에서의' },
  { en: 'have been the difference', ko: '차이를 만들어냈습니다' },
  { en: 'in making batteries last longer and cost less', ko: '배터리를 더 오래 지속되게 하고 비용을 낮추는 데' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | EV Batteries Are Defying Expectations After Hundreds of Thousands of Miles | By Ellie Davis',
  url: 'https://www.wsj.com/business/autos/ev-batteries-are-defying-expectations-after-hundreds-of-thousands-of-miles-8579de13?mod=hp_trendingnow_article_pos1',
  },
  
  youtube: 'https://youtube.com/shorts/Pt2-uG7gBEo',
  };


// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
