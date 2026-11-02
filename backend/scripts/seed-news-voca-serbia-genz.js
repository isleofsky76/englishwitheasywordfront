/**
 * News Voca — Serbia Gen Z / WSJ
 *   cd backend && node scripts/seed-news-voca-serbia-genz.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

const article = {
  title: '세르비아 Z세대 학생들이 강자를 무너뜨렸다. 이제부터가 진짜 난관이다',

  slug: 'canopy-corruption-oust-propel-related-words',

  metaDescription:
    'WSJ 세르비아 Gen Z 학생 운동 기사 어휘. canopy, corruption, oust, propel.',

  password: 'seed_news_voca_canopy-corruption-oust-propel',

  datePublished: '2026-11-01',

  intro: [
    '세르비아 Z세대 학생 운동이 장기 집권 지도자를 축출한 뒤, 정국 운영이라는 더 어려운 과제에 직면했다는 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. On Nov. 1, 2024, a **canopy** collapsed at the newly renovated train station in Serbia’s second city of Novi Sad, killing 16 people. / 2024년 11월 1일, 세르비아 제2의 도시 노비사드에서 새로 보수한 기차역의 차양이 무너져 16명이 사망했다. cf. canopy: 차양, 덮개 지붕 (명)',
      ],
    },
    {
      narrative: [
        '2. For many Serbians, it became a symbol of alleged **corruption** and a state that had failed to protect its citizens. / 많은 세르비아인에게 이 사고는 부패 의혹과 시민을 보호하지 못한 국가의 상징이 되었다. cf. corruption: 부패, 비리 (명)',
      ],
    },
    {
      narrative: [
        '3. Serbia’s Gen Z student movement pulled off what the country’s opposition parties couldn’t in 14 years: **oust**ing one of Europe’s most entrenched populist and authoritarian leaders. / 세르비아의 Z세대 학생 운동은 야당들이 14년 동안 해내지 못한 일을 해냈다. 유럽에서 가장 공고하게 권력을 다져 온 포퓰리즘·권위주의 지도자 중 한 명을 축출한 것이다. cf. oust: 축출하다 (동)',
      ],
    },
    {
      narrative: [
        '4. The student movement has yet to choose a prime minister, much less assemble a cabinet or even decide how it can influence the lawmakers it **propel**led into office. / 학생 운동은 아직 총리를 선택하지 못했다. 내각 구성은커녕, 자신들이 당선시킨 의원들에게 어떻게 영향력을 행사할지조차 정하지 못했다. cf. propel: 나아가게 하다, 특정 지위에 오르게 하다 (동)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'canopy',
      meaning: '차양, 덮개 지붕',
      exampleEn:
        'On Nov. 1, 2024, a canopy collapsed at the newly renovated train station in Serbia’s second city of Novi Sad, killing 16 people.',
      exampleKo:
        '2024년 11월 1일, 세르비아 제2의 도시 노비사드에서 새로 보수한 기차역의 차양이 무너져 16명이 사망했다.',
    },
    {
      num: 2,
      expression: 'corruption',
      meaning: '부패, 비리',
      exampleEn:
        'For many Serbians, it became a symbol of alleged corruption and a state that had failed to protect its citizens.',
      exampleKo:
        '많은 세르비아인에게 이 사고는 부패 의혹과 시민을 보호하지 못한 국가의 상징이 되었다.',
    },
    {
      num: 3,
      expression: 'oust',
      meaning: '축출하다',
      exampleEn:
        'Serbia’s Gen Z student movement pulled off what the country’s opposition parties couldn’t in 14 years: ousting one of Europe’s most entrenched populist and authoritarian leaders.',
      exampleKo:
        '세르비아의 Z세대 학생 운동은 야당들이 14년 동안 해내지 못한 일을 해냈다. 유럽에서 가장 공고하게 권력을 다져 온 포퓰리즘·권위주의 지도자 중 한 명을 축출한 것이다.',
    },
    {
      num: 4,
      expression: 'propel',
      meaning: '나아가게 하다, 특정 지위에 오르게 하다',
      exampleEn:
        'The student movement has yet to choose a prime minister, much less assemble a cabinet or even decide how it can influence the lawmakers it propelled into office.',
      exampleKo:
        '학생 운동은 아직 총리를 선택하지 못했다. 내각 구성은커녕, 자신들이 당선시킨 의원들에게 어떻게 영향력을 행사할지조차 정하지 못했다.',
    },
  ],

  source: {
    text: 'The Wall Street Journal | Serbia’s Gen Z Students Toppled a Strongman. Now Comes the Hard Part. | By Georgi Kantchev | Nov. 1, 2026',
    url: 'https://www.wsj.com/world/europe/serbias-gen-z-students-toppled-a-strongman-now-comes-the-hard-part-0f40dd7a',
  },

  youtube: 'https://www.youtube.com/shorts/pKWTm8hEdcY',
  videoId: 'pKWTm8hEdcY',
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
