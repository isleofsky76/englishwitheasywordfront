/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '말만 번지르르한, 수다스러운',

  slug: 'glib-related-words',

  metaDescription:
    'glib, gregarious, garrulous, laconic, facile, gratuitous, goad 뜻을 짧게 묶은 유의어 모음.',

  password: 'seed_synonym_glib-related-words',

  datePublished: '2026-08-16',

  intro: [
    '말투와 태도에서 자주 나오는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 말만 번지르르한·피상적인',
      narrative: [
        '**glib** — 말만 번지르르한, 피상적으로 그럴듯한',
        '**facile** — 피상적인, 지나치게 손쉬운',
      ],
    },

    {
      title: '2. 사교적인·수다스러운',
      narrative: [
        '**gregarious** — 사교적인, 사람들과 어울리기 좋아하는',
        '**garrulous** — 수다스러운, 말이 많은',
      ],
    },

    {
      title: '3. 말수가 적은',
      narrative: [
        '**laconic** — 말수가 적은, 간결한',
      ],
    },

    {
      title: '4. 불필요한·과도한',
      narrative: [
        '**gratuitous** — 불필요한, 쓸데없이 과도한',
      ],
    },

    {
      title: '5. 부추기다',
      narrative: [
        '**goad** — 부추기다, 도발하다',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=lL6H4OptGDE',
};

// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
