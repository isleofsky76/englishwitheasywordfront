/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '합치다, 통합하다와 융합하다',

  slug: 'coalesce-related-words',

  metaDescription:
    'coalesce, amalgamate, fuse, merge, coalition, blend 뜻·발음 유의어 모음.',

  password: 'seed_synonym_coalesce-related-words',

  datePublished: '2026-09-05',

  intro: [
    '여러 요소가 하나로 합쳐지거나 통합되고, 서로 섞이거나 연합하는 상황에서 쓰이는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 합치다·합체하다',
      narrative: [
        '**coalesce**(ˌkoʊəˈles / 코얼레스)',
      ],
    },

    {
      title: '2. 합병하다·통합하다',
      narrative: [
        '**amalgamate**(əˈmælɡəmeɪt / 어맬거메이트)',
      ],
    },

    {
      title: '3. 융합하다·결합되다',
      narrative: [
        '**fuse**(fjuːz / 퓨즈)',
      ],
    },

    {
      title: '4. 합병하다·합쳐지다',
      narrative: [
        '**merge**(mɜːrdʒ / 머지)',
      ],
    },

    {
      title: '5. 연합·연립',
      narrative: [
        '**coalition**(ˌkoʊəˈlɪʃən / 코얼리션)',
      ],
    },

    {
      title: '6. 섞이다·조화를 이루다',
      narrative: [
        '**blend**(blend / 블렌드)',
      ],
    },
  ],

  youtube: 'https://youtube.com/shorts/baedHLPW8zE',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
