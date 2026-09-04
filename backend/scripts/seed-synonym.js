/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '모순, 부조화와 비유 표현',

  slug: 'contradiction-related-words',

  metaDescription:
    'contradiction, incongruity, oxymoron, hyperbole, euphemism, analogy 뜻·발음 유의어 모음.',

  password: 'seed_synonym_contradiction-related-words',

  datePublished: '2026-09-05',

  intro: [
    '모순과 부조화부터 과장, 완곡어법, 비유까지 글과 기사에서 자주 쓰이는 표현들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 모순·상충',
      narrative: [
        '**contradiction**(ˌkɑːntrəˈdɪkʃən / 칸트러딕션)',
      ],
    },

    {
      title: '2. 부조화·불일치',
      narrative: [
        '**incongruity**(ˌɪnkənˈɡruːəti / 인컨그루어티)',
      ],
    },

    {
      title: '3. 모순된 표현',
      narrative: [
        '**oxymoron**(ˌɑːksɪˈmɔːrɑːn / 악시모론)',
      ],
    },

    {
      title: '4. 과장·과장법',
      narrative: [
        '**hyperbole**(haɪˈpɜːrbəli / 하이퍼벌리)',
      ],
    },

    {
      title: '5. 완곡한 표현',
      narrative: [
        '**euphemism**(ˈjuːfəmɪzəm / 유퍼미즘)',
      ],
    },

    {
      title: '6. 비유·유추',
      narrative: [
        '**analogy**(əˈnælədʒi / 어낼러지)',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=DgnZ_E_IXog',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
