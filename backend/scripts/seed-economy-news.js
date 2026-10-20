/**
 * 경제뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-economy-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadEconomyNews } from './economy-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: 'AI 주식시장 흔들림이 주는 경고: 이번에도 다르지 않다',

  slug: 'be-alive-to-mirage-drastically-deflate-materialize-interlude-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 AI 투자·주식시장 관련 시사 영단어. be alive to, mirage, drastically, deflate, materialize, interlude 등.',

  password: 'seed_finance_ai-stock-market-wobble-related-words',

  datePublished: '2026-10-18',

  intro: [
    'AI 관련 주식시장의 최근 하락을 계기로 수조 달러 규모의 AI 설비투자에 대한 기대와 잠재적 위험을 분석한 월스트리트저널(WSJ) 기사에서 주요 시사 영단어를 정리합니다. AI 인프라 투자가 예상보다 부진하면 기업 실적과 주가에 타격을 줄 수 있지만, 반대로 대규모 투자가 지속되더라도 과잉투자와 높은 주식 가치평가에 따른 위험이 존재한다는 점을 다룹니다.',
  ],

  words: [
    {
      narrative: [
        '1. 투자자들은 수조 달러 규모의 AI 설비투자가 기대에 미치지 못할 수 있다는 주요 위험을 인식하고(**be alive to**) 있었다. cf. be alive to: ~을 인식하다, 알아차리다',
      ],
    },
    {
      narrative: [
        '2. AI 관련 기업들이 현재 벌어들이는 막대한 이익은 단순한 환상이나 신기루(**mirage**)가 아니라 실제로 존재하는 수익이다. cf. mirage: 신기루, 환상',
      ],
    },
    {
      narrative: [
        '3. 몇 년 뒤 AI 데이터센터 등 인프라 구축이 완료되면 유지보수와 업그레이드 비용은 신규 건설보다 적게 들기 때문에 설비투자는 급격히(**drastically**) 감소할 수 있다. cf. drastically: 급격하게, 대폭',
      ],
    },
    {
      narrative: [
        '4. AI 관련 기업들의 이익이 줄어들면(**deflate**), 현재 주식에 반영된 높은 가치평가 수준이 더욱 뚜렷하게 드러날 것이다. cf. deflate: 줄어들다, 거품이 빠지다',
      ],
    },
    {
      narrative: [
        '5. 최근 주가 움직임은 기대했던 AI 설비투자가 실제로 이루어지지(**materialize**) 않을 경우 시장이 얼마나 큰 타격을 받을 수 있는지 보여준다. cf. materialize: 현실화되다, 실제로 이루어지다',
      ],
    },
    {
      narrative: [
        '6. 최근의 주가 하락이 거센 AI 강세장 속 일시적인 조정(**interlude**)에 불과하고 데이터센터 건설이 예상대로 지속되더라도, 과잉투자 등으로 인해 또 다른 위험이 발생할 수 있다. cf. interlude: 막간, 일시적인 중단·조정',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | The AI Stock Market Wobble Is a Reminder: This Time Isn’t Different | By James Mackintosh',
    url: 'https://www.wsj.com/finance/stocks/the-ai-stock-market-wobble-is-a-reminder-this-time-isnt-different-d3ea7f07',
  },

  youtube: 'https://youtube.com/shorts/tkwXENfK-KU',
};
// ===============================

uploadEconomyNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
