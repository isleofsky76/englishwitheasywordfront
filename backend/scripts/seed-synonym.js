/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========


const article = {
  title: '군사정권, 비밀 파벌과 무장 반란',

  slug: 'junta-related-words',

  metaDescription:
    'junta, cabal, calumny, melee, insurgency 뜻·발음 유의어 모음.',

  password: 'seed_synonym_junta-related-words',

  datePublished: '2026-09-05',

  intro: [
    '군사정권과 비밀 권력 집단부터 중상모략, 난투극, 무장 반란까지 정치·분쟁 기사에서 자주 만나는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 군사정권·군부 집단',
      narrative: [
        '**junta**(ˈhʊntə / 훈타) ',
      ],
    },

    {
      title: '2. 비밀 파벌·권력 집단',
      narrative: [
        '**cabal**(kəˈbɑːl / 커발)',
      ],
    },

    {
      title: '3. 중상모략·악의적인 비방',
      narrative: [
        '**calumny**(ˈkæləmni / 캘럼니)',
      ],
    },

    {
      title: '4. 난투극·혼전',
      narrative: [
        '**melee**(ˈmeɪleɪ / 메일레이',
      ],
    },

    {
      title: '5. 반란·무장 반정부 활동',
      narrative: [
        '**insurgency**(ɪnˈsɜːrdʒənsi / 인서전시) ',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=QuPTE5oO5RE',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
