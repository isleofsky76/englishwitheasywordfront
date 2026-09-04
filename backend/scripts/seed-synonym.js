/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '충동적인, 건방진과 주제넘은',

  slug: 'impetuous-related-words',

  metaDescription:
    'impetuous, impudent, insolent, impertinent, presumptuous 뜻·발음 유의어 모음.',

  password: 'seed_synonym_impetuous-related-words',

  datePublished: '2026-09-05',

  intro: [
    '충동적이거나 성급한 행동부터, 건방지고 무례하거나 주제넘은 태도를 나타내는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 충동적인·성급한',
      narrative: [
        '**impetuous**(ɪmˈpetʃuəs / 임페추어스) ',
      ],
    },

    {
      title: '2. 뻔뻔한·건방진',
      narrative: [
        '**impudent**(ˈɪmpjədənt / 임퓨던트)',
      ],
    },

    {
      title: '3. 오만불손한·무례한',
      narrative: [
        '**insolent**(ˈɪnsələnt / 인설런트) ',
      ],
    },

    {
      title: '4. 버릇없는·주제넘은',
      narrative: [
        '**impertinent**(ɪmˈpɜːrtənənt / 임퍼티넌트)',
      ],
    },

    {
      title: '5. 주제넘은·지나치게 나서는',
      narrative: [
        '**presumptuous**(prɪˈzʌmptʃuəs / 프리점프추어스)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=GEbiEh38JTY',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
