/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';



// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ 국제영어] 미 국방부 1200억 달러 무기 계약 | covert · thwart · earmark 어휘',
  slug: 'pentagon-120-billion-patriot-missiles-vocabulary',
  metaDescription:
    '미 국방부의 1200억 달러 규모 패트리엇 미사일·잠수함 계약 WSJ 뉴스를 통해 covert, thwart, skepticism, appropriation, earmark 등 핵심 시사영어를 배웁니다.',
  password: 'password_seed_pentagon_120_billion_patriot_missiles_vocabulary',
  datePublished: '2026-08-18',

  intro: [
    '미 국방부가 패트리엇 미사일과 잠수함 등을 포함한 대규모 무기 조달 계획에 1200억 달러 이상을 투입하기로 했습니다. 이번 WSJ 기사에서는 군사 작전과 미사일 방어, 정부 예산과 계약 관련 뉴스에서 자주 등장하는 핵심 시사영어 표현을 배워봅니다.',
  ],

  words: [
    {
      title: '중요 단어 1. covert',
      word: {
        en: 'covert',
        ko: '은밀한, 비밀리에 이루어지는',
        pron: '코버트',
      },
      example: {
        en: 'Allow commanders to launch covert strikes.',
        ko: '지휘관들이 은밀한 공격을 감행하도록 허용합니다.',
      },
      phrases: [
        { en: 'Allow commanders', ko: '지휘관들이 ~하도록 허용합니다' },
        { en: 'to launch covert strikes', ko: '은밀한 공격을 감행하도록' },
      ],
    },

    {
      title: '중요 단어 2. thwart',
      word: {
        en: 'thwart',
        ko: '저지하다, 좌절시키다',
        pron: '스워트',
      },
      example: {
        en: 'Capable of thwarting ballistic missiles.',
        ko: '탄도미사일을 저지할 수 있습니다.',
      },
      phrases: [
        { en: 'Capable of', ko: '~할 수 있습니다' },
        { en: 'thwarting ballistic missiles', ko: '탄도미사일을 저지할' },
      ],
    },

    {
      title: '중요 단어 3. skepticism',
      word: {
        en: 'skepticism',
        ko: '회의론, 회의적인 태도',
        pron: '스켑터시즘',
      },
      example: {
        en: 'Democrats and some Republicans have expressed skepticism about.',
        ko: '민주당원과 일부 공화당원이 이에 대해 회의적인 태도를 나타냈습니다.',
      },
      phrases: [
        {
          en: 'Democrats and some Republicans',
          ko: '민주당원과 일부 공화당원이',
        },
        {
          en: 'have expressed skepticism about',
          ko: '이에 대해 회의적인 태도를 나타냈습니다',
        },
      ],
    },

    {
      title: '중요 표현 4. subject to',
      word: {
        en: 'subject to',
        ko: '~을 조건으로 하는, ~에 따라 달라지는',
        pron: '섭젝트 투',
      },
      example: {
        en: 'Subject to further talks over finalized terms.',
        ko: '최종 조건에 대한 추가 협상을 조건으로 합니다.',
      },
      phrases: [
        {
          en: 'Subject to',
          ko: '~을 조건으로 합니다',
        },
        {
          en: 'further talks over finalized terms',
          ko: '최종 조건에 대한 추가 협상을',
        },
      ],
    },

    {
      title: '중요 단어 5. appropriation',
      word: {
        en: 'appropriation',
        ko: '예산 배정, 세출 승인',
        pron: '어프로프리에이션',
      },
      example: {
        en: 'Lack full appropriations from Congress.',
        ko: '의회로부터 완전한 예산 배정을 받지 못했습니다.',
      },
      phrases: [
        {
          en: 'Lack',
          ko: '받지 못했습니다',
        },
        {
          en: 'full appropriations from Congress',
          ko: '의회로부터 완전한 예산 배정을',
        },
      ],
    },

    {
      title: '중요 단어 6. earmark',
      word: {
        en: 'earmark',
        ko: '특정 목적을 위해 배정하다',
        pron: '이어마크',
      },
      example: {
        en: 'The Pentagon on Wednesday earmarked more than $120 billion for contractors.',
        ko: '미 국방부는 수요일 계약업체들을 위해 1200억 달러 이상을 배정했습니다.',
      },
      phrases: [
        {
          en: 'The Pentagon',
          ko: '미 국방부는',
        },
        {
          en: 'on Wednesday',
          ko: '수요일',
        },
        {
          en: 'for contractors',
          ko: '계약업체들을 위해',
        },
        {
          en: 'earmarked more than $120 billion',
          ko: '1200억 달러 이상을 배정했습니다',
        },
      ],
    },

    {
      title: '중요 단어 7. value',
      word: {
        en: 'value',
        ko: '가치·가격을 평가하다',
        pron: '밸류',
      },
      example: {
        en: 'The Patriot contract with missile maker Lockheed Martin is now valued at nearly $59 billion.',
        ko: '미사일 제조업체 록히드마틴과의 패트리엇 계약은 현재 약 590억 달러 규모로 평가됩니다.',
      },
      phrases: [
        {
          en: 'The Patriot contract with missile maker Lockheed Martin',
          ko: '미사일 제조업체 록히드마틴과의 패트리엇 계약은',
        },
        {
          en: 'now',
          ko: '현재',
        },
        {
          en: 'is valued at nearly $59 billion',
          ko: '약 590억 달러 규모로 평가됩니다',
        },
      ],
    },

    {
      title: '중요 단어 8. weaponry',
      word: {
        en: 'weaponry',
        ko: '무기류, 무기 체계',
        pron: '웨퍼너리',
      },
      example: {
        en: 'Annual purchases to guarantee a smoother supply of weaponry over time.',
        ko: '장기간에 걸쳐 무기류를 더욱 원활하게 공급하기 위한 연간 구매입니다.',
      },
      phrases: [
        {
          en: 'Annual purchases',
          ko: '연간 구매입니다',
        },
        {
          en: 'over time',
          ko: '장기간에 걸쳐',
        },
        {
          en: 'to guarantee a smoother supply of weaponry',
          ko: '무기류를 더욱 원활하게 공급하기 위한',
        },
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Pentagon Commits Over $120 Billion for Patriot Missiles, Submarines | By Drew FitzGerald and Marcus Weisgerber',
    url: 'https://www.wsj.com/politics/national-security/pentagon-widens-patriot-missile-order-to-nearly-59-billion-b3da2e01',
  },

  youtube: 'https://www.youtube.com/shorts/5HvLP-bF3Oc',
};

// =================================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
