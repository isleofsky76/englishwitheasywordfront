/**
 * News Voca — Shopping Bots / Amazon / WSJ
 *   cd backend && node scripts/seed-news-voca-shopping-bots.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

const article = {
  title: '쇼핑 봇이 아마존을 노린다',

  slug: 'undermine-sway-disrupt-related-words',

  metaDescription:
    'WSJ 쇼핑 봇·아마존 광고 기사 어휘. undermine, sway, disrupt.',

  password: 'seed_news_voca_undermine-sway-disrupt',

  datePublished: '2026-11-01',

  intro: [
    '인공지능 쇼핑 에이전트 Muse가 아마존의 광고 수익 모델을 흔들 수 있다는 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. The threat lies in Muse’s potential to **undermine** one of Amazon’s most lucrative businesses: advertising. / 위협은 뮤즈가 아마존의 가장 수익성 높은 사업 중 하나인 광고 사업의 기반을 흔들 수 있다는 데 있다. cf. undermine: 약화시키다, 기반을 흔들다 (동)',
      ],
    },
    {
      narrative: [
        '2. Artificial-intelligence agents evaluate product details and prices to determine what to buy rather than taking in advertising that can **sway** humans. / 인공지능 에이전트는 사람의 마음을 움직일 수 있는 광고를 받아들이는 대신, 상품의 세부 정보와 가격을 평가해 무엇을 살지 결정한다. cf. sway: 마음을 움직이다, 판단에 영향을 주다 (동)',
      ],
    },
    {
      narrative: [
        '3. Despite Muse and other agents’ ability to discover products in new ways, Amazon’s business model could be tough to **disrupt**. / 뮤즈와 다른 에이전트들이 새로운 방식으로 상품을 찾아낼 수 있더라도, 아마존의 사업 모델을 뒤흔들기는 어려울 수 있다. cf. disrupt: 뒤흔들다, 기존 방식을 무너뜨리다 (동)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'undermine',
      meaning: '약화시키다, 기반을 흔들다',
      exampleEn:
        'The threat lies in Muse’s potential to undermine one of Amazon’s most lucrative businesses: advertising.',
      exampleKo:
        '위협은 뮤즈가 아마존의 가장 수익성 높은 사업 중 하나인 광고 사업의 기반을 흔들 수 있다는 데 있다.',
    },
    {
      num: 2,
      expression: 'sway',
      meaning: '마음을 움직이다, 판단에 영향을 주다',
      exampleEn:
        'Artificial-intelligence agents evaluate product details and prices to determine what to buy rather than taking in advertising that can sway humans.',
      exampleKo:
        '인공지능 에이전트는 사람의 마음을 움직일 수 있는 광고를 받아들이는 대신, 상품의 세부 정보와 가격을 평가해 무엇을 살지 결정한다.',
    },
    {
      num: 3,
      expression: 'disrupt',
      meaning: '뒤흔들다, 기존 방식을 무너뜨리다',
      exampleEn:
        'Despite Muse and other agents’ ability to discover products in new ways, Amazon’s business model could be tough to disrupt.',
      exampleKo:
        '뮤즈와 다른 에이전트들이 새로운 방식으로 상품을 찾아낼 수 있더라도, 아마존의 사업 모델을 뒤흔들기는 어려울 수 있다.',
    },
  ],

  source: {
    text: 'The Wall Street Journal | The Shopping Bots Are Coming for Amazon | By Isabella Simonetti and Suzanne Vranica | Nov. 1, 2026',
    url: 'https://www.wsj.com/tech/the-shopping-bots-are-coming-for-amazon-701caa57',
  },

  youtube: 'https://www.youtube.com/shorts/hXRIui2Gr_Y',
  videoId: 'hXRIui2Gr_Y',
};

uploadNewsVoca(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/news-voca/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
