/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '무뚝뚝한, 직설적인과 까칠한',

  slug: 'brusque-related-words',

  metaDescription:
    'brusque, gruff, blunt, cantankerous, spiky, matter-of-fact 뜻·발음 유의어 모음.',

  password: 'seed_synonym_brusque-related-words',

  datePublished: '2026-09-05',

  intro: [
    '무뚝뚝하고 퉁명스러운 말투부터 직설적이거나 괴팍하고 까칠한 태도까지 사람의 말투와 성격을 나타내는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 무뚝뚝한·퉁명스러운',
      narrative: [
        '**brusque**(brʌsk / 브러스크)',
      ],
    },

    {
      title: '2. 거친·퉁명스러운',
      narrative: [
        '**gruff**(ɡrʌf / 그러프)',
      ],
    },

    {
      title: '3. 직설적인·퉁명스러운',
      narrative: [
        '**blunt**(blʌnt / 블런트)',
      ],
    },

    {
      title: '4. 성미가 고약한·괴팍한',
      narrative: [
        '**cantankerous**(kænˈtæŋkərəs / 캔탱커러스)',
      ],
    },

    {
      title: '5. 까칠한·날카로운',
      narrative: [
        '**spiky**(ˈspaɪki / 스파이키)',
      ],
    },

    {
      title: '6. 담담한·사무적인',
      narrative: [
        '**matter-of-fact**(ˌmætər əv ˈfækt / 매터 어브 팩트)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=_rmid16JetI',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
