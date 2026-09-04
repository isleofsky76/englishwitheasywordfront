/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '부추기다, 선동하다와 촉발하다',

  slug: 'foment-related-words',

  metaDescription:
    'foment, incite, instigate, goad, galvanize, provoke 뜻·발음 유의어 모음.',

  password: 'seed_synonym_foment-related-words',

  datePublished: '2026-09-05',

  intro: [
    '사람이나 상황을 자극해 어떤 행동이나 감정을 일으키는 표현들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 부추기다·조장하다',
      narrative: [
        '**foment**(foʊˈment / 포멘트)',
      ],
    },

    {
      title: '2. 선동하다·부추기다',
      narrative: [
        '**incite**(ɪnˈsaɪt / 인사이트)',
      ],
    },

    {
      title: '3. 일으키다·선동하다',
      narrative: [
        '**instigate**(ˈɪnstɪɡeɪt / 인스티게이트)',
      ],
    },

    {
      title: '4. 부추기다·몰아붙이다',
      narrative: [
        '**goad**(ɡoʊd / 고우드)',
      ],
    },

    {
      title: '5. 고무하다·행동하도록 자극하다',
      narrative: [
        '**galvanize**(ˈɡælvənaɪz / 갤버나이즈)',
      ],
    },

    {
      title: '6. 유발하다·촉발하다',
      narrative: [
        '**provoke**(prəˈvoʊk / 프로보우크)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=cwh2b_h0ggM',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
