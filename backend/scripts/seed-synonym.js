/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '약탈하다, 훔치다와 횡령하다',

  slug: 'ransack-related-words',

  metaDescription:
    'ransack, pillage, pilfer, purloin, embezzle, loot, burglarize 뜻·발음 유의어 모음.',

  password: 'seed_synonym_ransack-related-words',

  datePublished: '2026-09-05',

  intro: [
    '물건을 마구 뒤지거나 약탈하고, 몰래 훔치거나 횡령하는 상황에서 쓰이는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 마구 뒤지다·난장판으로 만들다',
      narrative: [
        '**ransack**(ˈrænˌsæk / 랜색)',
      ],
    },

    {
      title: '2. 조직적으로 약탈하다',
      narrative: [
        '**pillage**(ˈpɪlɪdʒ / 필리지)',
      ],
    },

    {
      title: '3. 슬쩍슬쩍 훔치다',
      narrative: [
        '**pilfer**(ˈpɪlfər / 필퍼)',
      ],
    },

    {
      title: '4. 교묘하게 훔치다',
      narrative: [
        '**purloin**(pərˈlɔɪn / 펄로인)',
      ],
    },

    {
      title: '5. 횡령하다',
      narrative: [
        '**embezzle**(ɪmˈbezəl / 임베즐)',
      ],
    },

    {
      title: '6. 폭동·혼란 속에서 약탈하다',
      narrative: [
        '**loot**(luːt / 루트)',
      ],
    },

    {
      title: '7. 빈집을 털다',
      narrative: [
        '**burglarize**(ˈbɜːrɡləraɪz / 벌글러라이즈)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=VrTOygCp4C4',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
