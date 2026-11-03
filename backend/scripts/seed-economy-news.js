/**
 * 경제뉴스 — 유럽 연금 계약 위기 / WSJ
 *   cd backend && node scripts/seed-economy-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadEconomyNews } from './economy-news-format.js';

const article = {
  title: '유럽의 연금 사회계약이 흔들리며 퍼지는 공포와 분노',

  slug: 'covenant-sovereign-debt-demographics-statutory-rite-related-words',

  metaDescription:
    'WSJ 유럽 연금·재정 기사 어휘. covenant, sovereign debt, demographics, top, statutory, rite.',

  password: 'seed_economy_covenant-sovereign-debt-demographics-statutory',

  datePublished: '2026-11-01',

  intro: [
    '빠듯한 재정과 고령화가 유럽의 연금 사회계약을 흔든다는 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. Stretched public finances and a rapidly aging population are threatening this **covenant**... / 빠듯한 국가 재정과 급속한 인구 고령화가 이러한 사회적 약속을 위협하고 있다. cf. covenant: 사회적 약속, 합의 (명)',
      ],
    },
    {
      narrative: [
        '2. This in turn is driving up **sovereign debt** and borrowing costs. / 이는 다시 국가채무와 차입 비용을 끌어올리고 있다. cf. sovereign debt: 국가채무 (명)',
      ],
    },
    {
      narrative: [
        '3. **Demographics** is the only science that never lies. / 인구 통계는 결코 거짓말하지 않는 유일한 과학이다. cf. demographics: 인구 통계, 인구 구조 (명)',
      ],
    },
    {
      narrative: [
        "4. ...requiring tens of billions in fresh borrowing for a country whose debt already **tops** 117% of GDP. / 이미 국가채무가 GDP의 117%를 넘는 나라에 수백억 규모의 추가 차입을 요구하면서. cf. top: 넘다, 초과하다 (동)",
      ],
    },
    {
      narrative: [
        '5. French voters enjoy both one of the world\'s longest life expectancies and some of its earliest **statutory** retirement ages. / 프랑스 유권자들은 세계에서 가장 긴 수준의 기대수명과 가장 이른 편에 속하는 법정 은퇴 연령을 모두 누리고 있다. cf. statutory: 법으로 정한, 법정의 (형)',
      ],
    },
    {
      narrative: [
        '6. Reaching pension age in the country is widely considered a **rite** of passage into a second phase of life... / 그 나라에서 연금 수급 연령에 도달하는 것은 인생의 두 번째 단계로 들어가는 통과의례로 널리 여겨진다. cf. rite: 의례, 의식 (명)',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Panic and Anger Spread as Europe’s Great Pension Covenant Unravels | By Tom Fairless and Noemie Bisserbe | Nov. 1, 2026',
    url: 'https://www.wsj.com/world/europe/panic-and-anger-spread-as-europes-great-pension-covenant-unravels-69a94ed7?mod=hp_trendingnow_article_pos5',
  },

  youtube: 'https://youtube.com/shorts/OX2teVqvMno',
  videoId: 'OX2teVqvMno',
};

uploadEconomyNews(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/economy-news/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
