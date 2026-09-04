/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '교착상태, 정체와 완전한 중단',

  slug: 'stalemate-related-words',

  metaDescription:
    'stalemate, stagnant, deadlock, impasse, gridlock, standstill 뜻·발음 유의어 모음.',

  password: 'seed_synonym_stalemate-related-words',

  datePublished: '2026-09-05',

  intro: [
    '전쟁과 정치, 협상, 교통처럼 상황이 더 이상 앞으로 나아가지 못할 때 자주 쓰이는 교착·정체 표현들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 교착상태',
      narrative: [
        '**stalemate**(ˈsteɪlmeɪt / 스테일메이트)',
      ],
    },

    {
      title: '2. 정체된·변화가 없는',
      narrative: [
        '**stagnant**(ˈstæɡnənt / 스태그넌트)',
      ],
    },

    {
      title: '3. 완전한 교착상태',
      narrative: [
        '**deadlock**(ˈdedlɑːk / 데드락)',
      ],
    },

    {
      title: '4. 막다른 교착상태',
      narrative: [
        '**impasse**(ˈɪmpæs / 임패스)',
      ],
    },

    {
      title: '5. 교통·정치적 교착',
      narrative: [
        '**gridlock**(ˈɡrɪdlɑːk / 그리드락)',
      ],
    },

    {
      title: '6. 정지·완전한 중단',
      narrative: [
        '**standstill**(ˈstændstɪl / 스탠드스틸) ',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=RwPEjicRxCM',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
