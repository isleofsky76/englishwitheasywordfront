/**
 * 산업뉴스 — Airline suites / Wi-Fi / WSJ
 *   cd backend && node scripts/seed-industry-news-airline-frills.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadIndustryNews } from './industry-news-format.js';

const article = {
  title: '항공사는 고급 스위트와 빠른 와이파이를 홍보한다. 왜 이렇게 오래 걸리나?',

  slug: 'tease-frill-related-words',

  metaDescription:
    'WSJ 항공사 스위트·와이파이 기사 어휘. tease, frill.',

  password: 'seed_industry_tease-frill',

  datePublished: '2026-10-27',

  intro: [
    '항공사들이 고급 스위트와 빠른 와이파이를 앞세워 홍보하지만 실제 도입은 더디다는 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. The new products are **tease**d early and often but the rollouts are slow given the size and complexity of their fleets and, for lounges, lengthy construction timetables. / 신제품은 일찍부터 자주 살짝 공개되지만, 항공기 규모와 복잡성 때문에—라운지의 경우 긴 공사 일정 때문에—실제 도입은 더디다. cf. tease: 살짝 공개하다, 정보를 흘리다 (동)',
      ],
    },
    {
      narrative: [
        '2. The reality is that many of the new **frill**s you’re hearing about today are two years away, longer in some cases if you’re not in a top-tier market. / 현실은 지금 들리는 새로운 부가 혜택 상당수가 2년은 더 있어야 한다는 것이고, 주요 시장이 아니면 더 오래 걸릴 수도 있다. cf. frill: 부가 혜택, 추가 편의 서비스 (명)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'tease',
      meaning: '살짝 공개하다, 정보를 흘리다',
      exampleEn:
        'The new products are teased early and often but the rollouts are slow given the size and complexity of their fleets and, for lounges, lengthy construction timetables.',
      exampleKo:
        '신제품은 일찍부터 자주 살짝 공개되지만, 항공기 규모와 복잡성 때문에—라운지의 경우 긴 공사 일정 때문에—실제 도입은 더디다.',
    },
    {
      num: 2,
      expression: 'frill',
      meaning: '부가 혜택, 추가 편의 서비스',
      exampleEn:
        'The reality is that many of the new frills you’re hearing about today are two years away, longer in some cases if you’re not in a top-tier market.',
      exampleKo:
        '현실은 지금 들리는 새로운 부가 혜택 상당수가 2년은 더 있어야 한다는 것이고, 주요 시장이 아니면 더 오래 걸릴 수도 있다.',
    },
  ],

  source: {
    text: 'The Wall Street Journal | Airlines Are Touting Fancy Suites and Fast Wi-Fi. Why’s It Taking So Long? | By Dawn Gilbertson | Oct. 27, 2026',
    url: 'https://www.wsj.com/lifestyle/travel/the-frustrating-wait-for-the-fancy-suites-and-fast-wi-fi-airlines-are-hyping-e16f570c?mod=lifestyle_feat1_travel_pos1',
  },

  youtube: 'https://www.youtube.com/shorts/jv6wSNlHOQ8',
  videoId: 'jv6wSNlHOQ8',
};

uploadIndustryNews(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/industry-news/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
