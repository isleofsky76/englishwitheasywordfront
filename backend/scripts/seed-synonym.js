/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '돌진하다, 달려들다와 살짝 유도하다',

  slug: 'lunge-related-words',

  metaDescription:
    'lunge, thrust, pounce, lurch, nudge 뜻·발음 유의어 모음.',

  password: 'seed_synonym_lunge-related-words',

  datePublished: '2026-09-05',

  intro: [
    '갑자기 움직이거나 달려드는 동작부터, 무언가를 떠맡기거나 살짝 유도하는 표현까지 함께 묶어 봤습니다.',
  ],

  words: [
    {
      title: '1. 갑자기 치닫다·돌진하다',
      narrative: [
        '**lunge**(lʌndʒ / 런지) ',
      ],
    },

    {
      title: '2. 억지로 떠맡기다',
      narrative: [
        '**thrust**(θrʌst / 쓰러스트) ',
      ],
    },

    {
      title: '3. 달려들다·즉각 덮치다',
      narrative: [
        '**pounce**(paʊns / 파운스) ',
      ],
    },

    {
      title: '4. 급격한 변화·쏠림',
      narrative: [
        '**lurch**(lɜːrtʃ / 러치) ',
      ],
    },

    {
      title: '5. 살짝 유도하다·부추기다',
      narrative: [
        '**nudge**(nʌdʒ / 너지)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=xGfOus3ULcg',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
