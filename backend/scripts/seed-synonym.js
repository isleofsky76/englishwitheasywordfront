/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========

const article = {
  title: 'crooked 연관단어 모음 : wonky, askew, lopsided, uneven',

  slug: 'crooked-related-words',

  metaDescription:
    'crooked 연관단어 모음. wonky, askew, lopsided, uneven 뜻·발음·예문.',

  password: 'seed_synonym_crooked-related-words',

  datePublished: '2026-08-31',

  intro: [
    'crooked 연관단어: wonky, askew, lopsided, uneven',
  ],

  words: [
    {
      title: '1. crooked',
      narrative: [
        'crooked(ˈkrʊkɪd / 크루키드)는 **구부러진**, **비뚤어진**',

        '*Straight trees have crooked roots.*',

        '**Straight trees** 곧게 자란 나무도',
        '**have crooked roots** 구불구불한 뿌리를 가지고 있다.',
      ],
    },

    {
      title: '2. wonky',
      narrative: [
        'wonky(ˈwɑːŋki / 웡키)는 **비뚤어진**, **고르지 않은**',

        '*My teeth are wonky, discoloured and gappy.*',

        '**My teeth** 내 치아는',
        '**are wonky** 삐뚤어져 있고',
        '**discoloured and gappy** 변색돼 있으며 사이도 벌어져 있다.',
      ],
    },

    {
      title: '3. askew',
      narrative: [
        'askew(əˈskjuː / 어스큐)는 **비뚤어진**, **한쪽으로 기울어진**',

        '*Her hat was slightly askew.*',

        '**Her hat** 그녀의 모자는',
        '**was slightly askew** 약간 한쪽으로 비뚤어져 있었다.',
      ],
    },

    {
      title: '4. lopsided',
      narrative: [
        'lopsided(ˌlɑːpˈsaɪdɪd / 랍사이디드)는 **한쪽으로 치우친**, **불균형한**',

        '*The article presents a somewhat lopsided view of events.*',

        '**The article** 그 기사는',
        '**presents** 제시한다',
        '**a somewhat lopsided view of events** 사건을 다소 한쪽으로 치우친 시각에서.',
      ],
    },

    {
      title: '5. uneven',
      narrative: [
        'uneven(ʌnˈiːvən / 언이븐)은 **고르지 않은**, **울퉁불퉁한**',

        '*The floor felt uneven under his feet.*',

        '**The floor** 바닥이',
        '**felt uneven** 고르지 않게 느껴졌다',
        '**under his feet** 그의 발밑에서.',
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
