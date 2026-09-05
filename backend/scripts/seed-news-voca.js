/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '소매업체의 상품 줄이기',

  slug: 'retailers-ditch-variety-supply-chain-costs-tariffs-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 소매업체와 공급망 비용 관련 문장. abandoning certain product lines, grappling with product shortages, overstocks, new levies, surging fuel costs, weighed on margins.',

  password: 'password_seed_retailers_ditch_variety_supply_chain_costs_tariffs_wsj',

  datePublished: '2026-09-01',

  intro: [
    '소매업체들이 공급망 비용과 관세 부담 때문에 상품 종류를 줄이고 있다는 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 일부 소매업체들은 팬데믹 기간 동안 제품 부족 문제와 씨름한 뒤(**after grappling with product shortages**), 특정 제품군을 포기하기 시작했습니다(**began abandoning certain product lines**).',
      ],
    },
    {
      narrative: [
        '2. 그들은 제품 부족뿐 아니라 과잉재고 문제(**overstocks**)도 겪었습니다.',
      ],
    },
    {
      narrative: [
        '3. 이러한 움직임은 지난 18개월 동안 더 빨라졌습니다(**accelerated over the past 18 months**).',
      ],
    },
    {
      narrative: [
        '4. 새로운 부담금과 급등한 연료비, 불확실한 소비자 수요가(**new levies, surging fuel costs and uncertain consumer demand**) 수익성을 압박했기 때문입니다(**weighed on margins**).',
      ],
    },
  ],

  source: {
    text: 'WSJ | Retailers Ditch Variety to Beat Supply-Chain Costs and Tariffs | By Liz Young',
    url: 'https://www.wsj.com/logistics-report/retailers-ditch-variety-to-beat-supply-chain-costs-and-tariffs-c96f9d42',
  },

  youtube: 'https://youtube.com/shorts/mkqMbG0k_e8',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
