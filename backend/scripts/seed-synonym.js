/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '불어넣다, 스며들게 하다와 심어주다',

  slug: 'imbue-related-words',

  metaDescription:
    'imbue, infuse, immerse, instill, impart, indoctrinate 뜻·발음 유의어 모음.',

  password: 'seed_synonym_imbue-related-words',

  datePublished: '2026-09-05',

  intro: [
    '감정이나 생각, 지식, 태도 등을 사람이나 대상에 불어넣거나 스며들게 할 때 쓰이는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 불어넣다·스며들게 하다',
      narrative: [
        '**imbue**(ɪmˈbjuː / 임뷰)',
      ],
    },

    {
      title: '2. 스며들게 하다·가득 채우다',
      narrative: [
        '**infuse**(ɪnˈfjuːz / 인퓨즈)',
      ],
    },

    {
      title: '3. 몰입시키다·푹 빠지게 하다',
      narrative: [
        '**immerse**(ɪˈmɜːrs / 이머스)',
      ],
    },

    {
      title: '4. 심어주다·주입하다',
      narrative: [
        '**instill**(ɪnˈstɪl / 인스틸)',
      ],
    },

    {
      title: '5. 전하다·나누어 주다',
      narrative: [
        '**impart**(ɪmˈpɑːrt / 임파트)',
      ],
    },

    {
      title: '6. 주입시키다·세뇌하다',
      narrative: [
        '**indoctrinate**(ɪnˈdɑːktrəneɪt / 인닥트러네이트)',
      ],
    },
  ],

  youtube: 'https://youtube.com/shorts/ArJFVz0QUI8',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
