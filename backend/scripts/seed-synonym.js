/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '불굴의 용기, 끈기와 강인함',

  slug: 'fortitude-related-words',

  metaDescription:
    'fortitude, perseverance, stalwart, formidable, homage, grit 뜻·발음 유의어 모음.',

  password: 'seed_synonym_fortitude-related-words',

  datePublished: '2026-09-03',

  intro: [
    '용기와 끈기, 강인함을 나타내는 표현과 함께 기사에서 자주 만나는 관련 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 불굴의 용기·강인함',
      narrative: [
        '**fortitude**(ˈfɔːrtɪtuːd / 포터튜드) — 불굴의 용기, 강인함',
        '**grit**(ɡrɪt / 그릿) — 투지, 끈기, 강인함',
      ],
    },

    {
      title: '2. 인내·끈기',
      narrative: [
        '**perseverance**(ˌpɜːrsəˈvɪrəns / 퍼서비어런스) — 인내, 끈기',
      ],
    },

    {
      title: '3. 굳건한·충실한',
      narrative: [
        '**stalwart**(ˈstɔːlwərt / 스톨워트) — 충실한, 굳건한',
      ],
    },

    {
      title: '4. 만만치 않은·강력한',
      narrative: [
        '**formidable**(ˈfɔːrmɪdəbəl / 포미더블) — 만만치 않은, 엄청난',
      ],
    },

    {
      title: '5. 경의·찬사',
      narrative: [
        '**homage**(ˈhɑːmɪdʒ / 하미지) — 경의, 찬사',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=N3uIDgXIEj4',
};

// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
