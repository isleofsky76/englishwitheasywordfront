/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========



const article = {
  title: '구부러진, 비뚤어진과 고르지 않은',

  slug: 'crooked-related-words',

  metaDescription:
    'crooked, wonky, askew, lopsided, uneven 뜻·발음 유의어 모음.',

  password: 'seed_synonym_crooked-related-words',

  datePublished: '2026-09-05',

  intro: [
    '모양이나 방향이 곧지 않거나 한쪽으로 치우치고 고르지 않을 때 쓰이는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 구부러진·비뚤어진',
      narrative: [
        '**crooked**(ˈkrʊkɪd / 크루키드)',
      ],
    },

    {
      title: '2. 비뚤어진·고르지 않은',
      narrative: [
        '**wonky**(ˈwɑːŋki / 웡키)',
      ],
    },

    {
      title: '3. 비뚤어진·한쪽으로 기울어진',
      narrative: [
        '**askew**(əˈskjuː / 어스큐)',
      ],
    },

    {
      title: '4. 한쪽으로 치우친·불균형한',
      narrative: [
        '**lopsided**(ˌlɑːpˈsaɪdɪd / 랍사이디드)',
      ],
    },

    {
      title: '5. 고르지 않은·울퉁불퉁한',
      narrative: [
        '**uneven**(ʌnˈiːvən / 언이븐)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=yeKSvY9r_4c',
};


// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
