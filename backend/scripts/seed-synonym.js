/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '용납하다, 참다와 허용하다',

  slug: 'brook-related-words',

  metaDescription:
    'brook, tolerate, abide, stomach, countenance 뜻·발음 유의어 모음.',

  password: 'seed_synonym_brook-related-words',

  datePublished: '2026-09-05',

  intro: [
    '어떤 행동이나 상황을 용납하거나 참고 견디고, 규칙을 따르거나 허용할 때 쓰이는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 용납하다·참다',
      narrative: [
        '**brook**(brʊk / 브룩)',
      ],
    },

    {
      title: '2. 용인하다·참다',
      narrative: [
        '**tolerate**(ˈtɑːləreɪt / 탈러레이트)',
      ],
    },

    {
      title: '3. 준수하다·따르다',
      narrative: [
        '**abide**(əˈbaɪd / 어바이드)',
      ],
    },

    {
      title: '4. 참다·견디다',
      narrative: [
        '**stomach**(ˈstʌmək / 스터먹)',
      ],
    },

    {
      title: '5. 찬성하다·허용하다',
      narrative: [
        '**countenance**(ˈkaʊntənəns / 카운터넌스)',
      ],
    },
  ],

  youtube: 'https://youtube.com/shorts/FqxeoDF7lbU',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
