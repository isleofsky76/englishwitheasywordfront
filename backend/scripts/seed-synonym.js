/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '튼튼한, 원기 왕성한',

  slug: 'robust-related-words',

  metaDescription:
    'robust와 비슷한 영어 단어. sturdy, solid, durable, resilient, powerful, vigorous, muscular, rigid 뜻과 뉘앙스를 담백하게 정리합니다.',

  password: 'seed_synonym_robust-related-words',

  datePublished: '2026-09-05',

  intro: [
    '무언가를 **단단하고**, **오래가며**, **힘 있게** 말할 때 자주 나오는 단어들을 모아 봤습니다. 뜻은 비슷해도 쓰이는 장면이 조금씩 다릅니다.',
  ],

  words: [
    {
      title: '1. 견고한·튼튼한',
      narrative: [
        '**robust** — 탄탄한, 견고한',
        '**sturdy** — 튼튼한, 견고한',
        '**solid** — 견조한, 탄탄한',
        '**durable** — 내구성이 강한',
        '**rugged** — 거친 환경에도 견디는',
        '**hardwearing** — 쉽게 닳지 않는, 내구성 강한',
      ],
    },

    {
      title: '2. 회복력·지속성',
      narrative: [
        '**resilient** — 회복력이 강한',
        '**resistant** — 저항력이 있는',
        '**enduring** — 오래 지속되는',
        '**persistent** — 끈질기게 지속되는',
      ],
    },

    {
      title: '3. 강력한·영향력 있는',
      narrative: [
        '**strong** — 강한',
        '**powerful** — 강력한, 영향력 있는',
        '**potent** — 강력한, 효과가 강한',
        '**mighty** — 막강한',
        '**forceful** — 강력한, 힘 있는',
      ],
    },

    {
      title: '4. 활기찬·건강한',
      narrative: [
        '**vigorous** — 활발한, 활기찬',
        '**energetic** — 활기찬, 에너지 넘치는',
        '**healthy** — 건전한, 건강한',
        '**hearty** — 원기 왕성한, 푸짐한',
        '**vibrant** — 활기 넘치는',
        '**lively** — 활발한, 생기 있는',
      ],
    },

    {
      title: '5. 건장한·육체적으로 튼튼한',
      narrative: [
        '**muscular** — 근육질의, 강력한',
        '**brawny** — 근육이 우람한',
        '**burly** — 몸집이 크고 건장한',
        '**beefy** — 두툼하고 튼튼한, 건장한',
        '**strapping** — 키 크고 건장한',
        '**well-built** — 체격이 좋은',
      ],
    },

    {
      title: '6. 경직된·완강한·빡빡한',
      narrative: [
        '**rigid** — 경직된, 융통성 없는',
        '**stiff** — 강한, 치열한 / 뻣뻣한',
        '**unyielding** — 완강한, 굽히지 않는',
        '**tight** — 빠듯한, 여유가 없는',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=eyR2w5rPvvg',
};

// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
