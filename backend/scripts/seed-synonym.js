/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '불굴의, 천하무적의와 난공불락의',

  slug: 'indomitable-related-words',

  metaDescription:
    'indomitable, invincible, impregnable, inexorable, unassailable 뜻·발음 유의어 모음.',

  password: 'seed_synonym_indomitable-related-words',

  datePublished: '2026-09-05',

  intro: [
    '쉽게 꺾이지 않거나 무너뜨리기 어렵고, 멈추기 힘든 상태를 나타내는 단어들을 모아 봤습니다.',
  ],

  words: [
    {
      title: '1. 불굴의·꺾이지 않는',
      narrative: [
        '**indomitable**(ɪnˈdɑːmɪtəbəl / 인다머터블)',
      ],
    },

    {
      title: '2. 천하무적의·아무도 꺾을 수 없는',
      narrative: [
        '**invincible**(ɪnˈvɪnsəbəl / 인빈서블)',
      ],
    },

    {
      title: '3. 난공불락의·뚫을 수 없는',
      narrative: [
        '**impregnable**(ɪmˈpreɡnəbəl / 임프레그너블)',
      ],
    },

    {
      title: '4. 멈출 수 없는·거침없는',
      narrative: [
        '**inexorable**(ɪnˈeksərəbəl / 이넥서러블)',
      ],
    },

    {
      title: '5. 난공불락의·흔들 수 없는',
      narrative: [
        '**unassailable**(ˌʌnəˈseɪləbəl / 어너세일러블)',
      ],
    },
  ],

  youtube: 'https://youtube.com/shorts/TVwodMKmkSQ',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
