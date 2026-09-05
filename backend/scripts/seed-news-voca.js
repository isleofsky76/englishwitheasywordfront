/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '연준의 금리 경고',

  slug: 'fed-officials-risks-higher-rates-inflation-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 연준 금리와 인플레이션 관련 문장. faces a dilemma, inflationary pressure, overlapping waves, central-bank instinct, lasting imprint.',

  password: 'password_seed_fed_officials_risks_higher_rates_inflation_wsj',

  datePublished: '2026-07-09',

  intro: [
    '연준이 인플레이션 압력과 금리 위험을 경고한 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 연준은 딜레마에 직면해 있습니다(**The Fed faces a dilemma**). 노동 시장이 물가 상승 압력의 명백한 원인(**an obvious source of inflationary pressure**)은 아니지만, 인플레이션을 끌어내리는 데(**to pull inflation down**) 확실하게 기여하고 있는 것도 아닙니다.',
      ],
    },
    {
      narrative: [
        '2. 관세, 그다음 유가, 그리고 이제는 AI 붐이(**Tariffs, then oil, and now the AI boom**) 겹겹이 밀려오는 파도처럼 타격을 주고 있습니다(**have hit in overlapping waves**).',
      ],
    },
    {
      narrative: [
        '3. 각각의 충격은 일시적인 물가 상승을 간과하려는(**to look past a one-time price jump**) 중앙은행의 본능(**the central-bank instinct**)을 시험하고 있습니다.',
      ],
    },
    {
      narrative: [
        '4. 그것들은 한데 쌓이면(**stacked together**) 가계와 기업이 임금과 가격을 책정하는 방식에(**how households and businesses set wages and prices**) 더 지속적인 영향을 남길 수 있다는 우려를 키우고 있습니다(**leave a more lasting imprint**).',
      ],
    },
  ],

  source: {
    text: 'WSJ | Fed Officials Flagged Risks That Would Warrant Higher Rates',
    url: 'https://www.wsj.com/economy/central-banking/fed-officials-flagged-risks-that-would-warrant-higher-rates-6f584cba?mod=lead_feature_below_a_pos3',
  },

  youtube: 'https://www.youtube.com/watch?v=T88YmzKltv4',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
