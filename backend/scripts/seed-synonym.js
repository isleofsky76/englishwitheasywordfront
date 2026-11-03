/**
 * 유의어(연관단어) 업로드 — 신랄함·질책·냉담 관련어
 *
 *   cd backend && node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

const article = {
  title: '신랄함 · 혹독한 질책 #연관단어',

  slug: 'asperity-castigation-castigate-lambaste-callous-related-words',

  metaDescription:
    '신랄함·질책·냉담 관련 연관단어. asperity, castigation, castigate, castigatory, lambaste, cantankerous, callous, impervious.',

  password: 'seed_synonym_asperity-castigation-castigate-lambaste',

  datePublished: '2026-11-03',

  intro: [
    '신랄함·혹독한 질책·냉담함과 관련된 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. She answered my question with **asperity**. / 그녀는 내 질문에 쌀쌀맞고 날카롭게 대답했다. cf. asperity: 신랄함, 거침 (명)',
      ],
    },
    {
      narrative: [
        '2. He received a severe **castigation**. / 그는 혹독한 질책을 받았다. cf. castigation: 혹독한 질책, 호된 비난 (명)',
      ],
    },
    {
      narrative: [
        '3. He would **castigate** me for even the slightest mistakes. / 그는 아주 사소한 실수에도 나를 호되게 질책하곤 했다. cf. castigate: 호되게 질책하다, 혹평하다 (동)',
      ],
    },
    {
      narrative: [
        '4. There was a **castigatory** tone to his words. / 그의 말에는 질책하는 어조가 담겨 있었다. cf. castigatory: 질책하는, 징벌적인 (형)',
      ],
    },
    {
      narrative: [
        '5. It is the media that immediately starts to sully and **lambaste** in order to end debate instantly. / 논쟁을 즉시 끝내려고 곧바로 평판을 더럽히고 맹비난하기 시작하는 것은 바로 언론이다. cf. lambaste: 맹렬히 비난하다, 혹평하다 (동)',
      ],
    },
    {
      narrative: [
        '6. The **cantankerous** old man won\'t pay his rent. / 그 까다롭고 시비를 거는 노인은 집세를 내려고 하지 않는다. cf. cantankerous: 성미가 고약한 (형)',
      ],
    },
    {
      narrative: [
        '7. I am **callous** to their abuse. / 나는 그들의 학대에 무감각해져 있다. cf. callous: 냉담한, 무감각한 (형)',
      ],
    },
    {
      narrative: [
        '8. This plant can grow as tall as eight feet and is **impervious** to drought. / 이 식물은 높이가 8피트까지 자랄 수 있으며 가뭄에도 끄떡없다. cf. impervious: 영향을 받지 않는, 끄떡없는 (형)',
      ],
    },
  ],

  source: {
    text:
      'All sentences are sourced from global news outlets for English practice. They do not reflect my personal views or financial/political advice. We constantly provide content featuring key English vocabulary from the latest issues of major news outlets such as The Guardian, BBC, CNN, WSJ, and The Economist. | englisheasystudy.com',
    url: 'https://englisheasystudy.com',
  },

  youtube: 'https://youtube.com/shorts/r49p_LV886M',
  videoId: 'r49p_LV886M',
};

uploadSynonym(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/english-synonym/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
