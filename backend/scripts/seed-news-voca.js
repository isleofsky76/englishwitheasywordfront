/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '중간선거 결과 전망',

  slug: 'novice-polling-error-partisan-pundit-pollster-generic-ballot-augury-impregnable',

  metaDescription:
    'The Economist 기사에서 추출한 시사 영단어. novice, polling error, partisan, pundit, pollster, generic ballot, augury, impregnable, spoiler candidate, out-raise, eke out.',

  password: 'seed_news_voca_novice-polling-error-partisan-pundit-pollster',

  datePublished: '2026-10-28',

  intro: [
    '중간선거 결과 전망 주제를 다룬 The Economist 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. ... was replaced by his sister Darline, a political **novice**. / 그의 여동생 달린(정치 초보자)으로 교체되었다 cf. novice: 초보자, 경험이 없는 사람 (명)',
      ],
    },
    {
      narrative: [
        '2. from a nationwide **polling error** / 전국적인 여론조사 오차로 인해 cf. polling error: 여론조사 오차 (명)',
      ],
    },
    {
      narrative: [
        '3. ... can implement a **partisan** agenda. / 편파적인 의제를 실행할 수 있다 cf. partisan: 편파[당파]적인 (형)',
      ],
    },
    {
      narrative: [
        '4. **pundits** have assumed that... (**pundit**) / 평론가들은 …라고 가정해 왔다 cf. pundit: 정치·시사 평론가 (명)',
      ],
    },
    {
      narrative: [
        '5. America’s most prominent team of **pollsters** (**pollster**) / 미국에서 가장 유명한 여론조사 전문가 팀 cf. pollster: 여론조사 전문가 (명)',
      ],
    },
    {
      narrative: [
        '6. when the **generic ballot** vastly overstated the Democratic advantage... / 정당 지지도 조사가 민주당의 우세를 크게 과장했을 때 cf. generic ballot: 후보 대신 정당 지지도를 묻는 조사 (명)',
      ],
    },
    {
      narrative: [
        '7. The **auguries** are good for Democrats. (**augury**) / 민주당에게 앞날을 암시하는 징조가 좋다 cf. augury: 앞일을 암시하는 징조 (명)',
      ],
    },
    {
      narrative: [
        '8. Republicans’ seemingly **impregnable** Senate map / 공화당의 겉보기엔 난공불락인 상원 지도 cf. impregnable: 난공불락의 (형)',
      ],
    },
    {
      narrative: [
        '9. her team planted **spoiler candidates** on the ballot... (**spoiler candidate**) / 그녀의 팀이 투표용지에 표를 잠식하는 후보들을 심어 놓았다 cf. spoiler candidate: 망치는 후보, 표를 잠식하는 후보 (명)',
      ],
    },
    {
      narrative: [
        '10. **out-raise** cf. out-raise: 상대보다 더 많은 선거자금을 모으다 (동)',
      ],
    },
    {
      narrative: [
        '11. ...where we reward their nominee for **eking out** a narrow financial advantage. (**eke out**) / 가까스로 얻은 근소한 자금 우위에 대해 후보에게 가산점을 주는 경우 cf. eke out: 가까스로 얻어 내다 (동)',
      ],
    },
    {
      narrative: [
        '12. they also have a marked tendency to **overshoot**... / 그들은 또한 (목표보다) 더 가는 뚜렷한 경향이 있다 cf. overshoot: (목표 지점보다) 더 가다 (동)',
      ],
    },
    {
      narrative: [
        '13. ...the **probability** of the Senate changing hands at just 53%. / 상원이 바뀌는 확률을 겨우 53%로 본다 cf. probability: 확률, 가능성 (명)',
      ],
    },
    {
      narrative: [
        '14. a 94% chance of gaining control of the **House of Representatives**... / 하원 장악 확률 94% cf. House of Representatives: 미국 하원 (명)',
      ],
    },
    {
      narrative: [
        '15. Winning the Senate would enable them to block his **judicial nominees** as well. / 상원을 차지하면 그의 판사 지명자들까지 막을 수 있다 cf. judicial nominees: 판사 지명자들 (명)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'novice',
      meaning: '초보자, 경험이 없는 사람',
      exampleEn: '... was replaced by his sister Darline, a political novice.',
      exampleKo: '',
    },
    {
      num: 2,
      expression: 'polling error',
      meaning: '여론조사 오차',
      exampleEn: 'from a nationwide polling error',
      exampleKo: '',
    },
    {
      num: 3,
      expression: 'partisan',
      meaning: '편파[당파]적인',
      exampleEn: '... can implement a partisan agenda.',
      exampleKo: '',
    },
    {
      num: 4,
      expression: 'pundit',
      meaning: '정치·시사 평론가',
      exampleEn: 'pundits have assumed that...',
      exampleKo: '',
    },
    {
      num: 5,
      expression: 'pollster',
      meaning: '여론조사 전문가',
      exampleEn: 'America’s most prominent team of pollsters',
      exampleKo: '',
    },
    {
      num: 6,
      expression: 'generic ballot',
      meaning: '후보 대신 정당 지지도를 묻는 조사',
      exampleEn: 'when the generic ballot vastly overstated the Democratic advantage...',
      exampleKo: '',
    },
    {
      num: 7,
      expression: 'augury',
      meaning: '앞일을 암시하는 징조',
      exampleEn: 'The auguries are good for Democrats.',
      exampleKo: '',
    },
    {
      num: 8,
      expression: 'impregnable',
      meaning: '난공불락의',
      exampleEn: 'Republicans’ seemingly impregnable Senate map',
      exampleKo: '',
    },
    {
      num: 9,
      expression: 'spoiler candidate',
      meaning: '망치는 후보, 표를 잠식하는 후보',
      exampleEn: 'her team planted spoiler candidates on the ballot...',
      exampleKo: '',
    },
    {
      num: 10,
      expression: 'out-raise',
      meaning: '상대보다 더 많은 선거자금을 모으다',
      exampleEn: '',
      exampleKo: '',
    },
    {
      num: 11,
      expression: 'eke out',
      meaning: '가까스로 얻어 내다',
      exampleEn:
        '...where we reward their nominee for eking out a narrow financial advantage.',
      exampleKo: '',
    },
    {
      num: 12,
      expression: 'overshoot',
      meaning: '(목표 지점보다) 더 가다',
      exampleEn: 'they also have a marked tendency to overshoot...',
      exampleKo: '',
    },
    {
      num: 13,
      expression: 'probability',
      meaning: '확률, 가능성',
      exampleEn: '...the probability of the Senate changing hands at just 53%.',
      exampleKo: '',
    },
    {
      num: 14,
      expression: 'House of Representatives',
      meaning: '미국 하원',
      exampleEn: 'a 94% chance of gaining control of the House of Representatives...',
      exampleKo: '',
    },
    {
      num: 15,
      expression: 'judicial nominees',
      meaning: '판사 지명자들',
      exampleEn: 'Winning the Senate would enable them to block his judicial nominees as well.',
      exampleKo: '',
    },
  ],

  source: {
    text: "The Economist | Our forecast of the midterms’ outcome | Oct 28th 2026",
    url: 'https://www.economist.com/united-states/2026/10/28/our-forecast-of-the-midterms-outcome',
  },

  youtube: 'https://www.youtube.com/shorts/TQtC56XcQuc',
  videoId: 'TQtC56XcQuc',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
