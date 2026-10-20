/**
 * 경제뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-economy-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadEconomyNews } from './economy-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: 'AI 투자에서 가장 위험한 영역, 금리 상승에 직면하다',

  slug: 'stare-down-immune-prominent-weather-vane-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 AI 투자·금리 상승·주식시장 관련 시사 영단어. stare down, immune, prominent, weather vane, endure, dour, whirlwind, retreat, mirror 등.',

  password: 'seed_finance_ai-trade-higher-rates-related-words',

  datePublished: '2026-10-15',

  intro: [
    '금리 상승과 차입비용 증가가 AI 데이터센터 기업들의 주가에 미치는 영향을 분석한 월스트리트저널(WSJ) 기사에서 주요 시사 영단어를 정리합니다. 코어위브(CoreWeave)를 비롯한 AI 인프라 관련 기업들이 시장 혼란과 주가 하락을 겪으면서, 막대한 차입에 의존하는 AI 투자 구조의 위험성이 부각되고 있습니다.',
  ],

  words: [
    {
      narrative: [
        '1. 투자자들은 AI 관련 기업들의 자금조달에 부담을 주는 높은 차입비용에 직면하고(**staring down**) 있었다. cf. stare down: 맞서다, 직면하다',
      ],
    },
    {
      narrative: [
        '2. 투자자들은 AI 데이터센터 기업들이 높은 차입비용의 영향을 받지 않을(**immune**) 것이라고 믿었다. cf. immune to: ~의 영향을 받지 않는',
      ],
    },
    {
      narrative: [
        '3. 높은 차입비용의 영향을 받지 않을 것이라는 기대에도 예외가 있었으며, 그중 코어위브(CoreWeave)가 가장 두드러진(**prominent**) 사례였다. cf. prominent: 두드러진, 중요한',
      ],
    },
    {
      narrative: [
        '4. 코어위브는 AI 투자에서 가장 위험한 영역의 시장 상황을 보여주는 풍향계(**weather vane**)와 같은 존재가 됐다. cf. weather vane: 풍향계, 상황이나 변화의 방향을 보여주는 지표',
      ],
    },
    {
      narrative: [
        '5. 코어위브는 이번 주 주식시장에서 발생한 거센 혼란을 견뎌야(**endured**) 했다. cf. endure: 견디다, 겪다',
      ],
    },
    {
      narrative: [
        '6. 목요일에는 AI 관련 기업들에 대한 시장 분위기가 가장 침울하고 비관적인(**dour**) 상태에 이르렀다. cf. dour: 침울한, 비관적인',
      ],
    },
    {
      narrative: [
        '7. 이번 급격한 시장 혼란(**whirlwind**)은 AI 관련 기업들의 주가가 차입비용 변화에 얼마나 민감한지를 드러냈다. cf. whirlwind: 회오리바람, 소용돌이, 급격한 혼란',
      ],
    },
    {
      narrative: [
        '8. AI 인프라 관련 기업인 네비우스 그룹(Nebius Group)의 주가는 15% 하락했다(**retreated**). cf. retreat: 후퇴하다, 하락하다',
      ],
    },
    {
      narrative: [
        '9. 네비우스와 아이렌(IREN)의 주가 하락은 코어위브의 15% 하락과 대체로 비슷한 양상을 보였다(**mirrored**). cf. mirror: 반영하다, 비슷한 양상을 보이다',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | The Riskiest Corner of the AI Trade Is Crashing Into Higher Rates | By David Uberti, Jack Pitcher and Sam Goldfarb',
    url: 'https://www.wsj.com/finance/stocks/the-riskiest-corner-of-the-ai-trade-is-crashing-into-higher-rates-fcdaad37',
  },

  youtube: 'https://youtube.com/shorts/UgfdyCx5FT0',
};
// ===============================

uploadEconomyNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
