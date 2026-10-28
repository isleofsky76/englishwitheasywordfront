/**
 * 스포츠뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-sports-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSportsNews } from './sports-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '해리 케인, 잉글랜드 25년 만의 발롱도르…추세를 거스른 이유',

  slug: 'accolade-prestigious-contender-buck-the-trend-rack-up-related-words',

  metaDescription:
    'BBC·이코노미스트 기사에서 추출한 해리 케인 발롱도르 수상 관련 시사 영단어. accolade, prestigious, nomination, contender, frontrunner, favourite, gruelling, relentless, bide one’s time, come through, buck the trend, stand out, unmatched, brilliance, outscore, notch, net, tally, rack up, carry weight 등.',

  password: 'seed_sports_kane-ballon-dor-accolade-buck-the-trend-related-words',

  datePublished: '2026-10-26',

  intro: [
    '해리 케인이 잉글랜드 선수로는 25년 만에 발롱도르를 받으며 일반적인 추세를 거스른 이유를 다룬 BBC·이코노미스트 기사에서 주요 시사 영단어를 정리합니다. 수상 후보·경쟁, 득점 기록, 챔피언스리그와 프리미어리그의 경쟁 강도 관련 표현을 살펴봅니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. 프리미어리그의 경쟁이 치열해 발롱도르 수상자에게 기대되는 영예(**accolades**)와 골을 쌓기 어렵기 때문이다. cf. accolade: 영예, 포상, 칭찬',
      ],
    },
    {
      narrative: [
        '2. 남자 발롱도르는 세계 축구에서 가장 권위 있는(**prestigious**) 개인상이다. cf. prestigious: 권위 있는, 명망 높은',
      ],
    },
    {
      narrative: [
        '3. 챔피언스리그는 발롱도르 후보 지명(**nominations**)에서 큰 비중을 차지한다. cf. nomination: 수상 후보 지명',
      ],
    },
    {
      narrative: [
        '4. 케인은 이제 잉글랜드 역사상 가장 위대한 선수 후보로서 유력한 경쟁자(**contender**)가 됐다. cf. contender: 유력 경쟁자, 수상 후보',
      ],
    },
    {
      narrative: [
        '5. 발롱도르 수상자가 없었던 아스널과 파리 생제르맹은 챔피언스리그 우승의 다른 선두 주자(**frontrunners**)다. cf. frontrunner: 선두 주자, 유력한 우승 후보',
      ],
    },
    {
      narrative: [
        '6. 스페인과 월드컵을 우승한 라미네 야말은 유력 후보(**favourites**) 중 하나였지만 케인에게 밀렸다. cf. favourite: 우승·수상이 유력한 후보',
      ],
    },
    {
      narrative: [
        '7. 재능이 더 고르게 퍼진 프리미어리그 시즌은 몹시 고되고 힘들다(**gruelling**). cf. gruelling: 몹시 고되고 힘든',
      ],
    },
    {
      narrative: [
        '8. 그의 득점은 기세가 꺾이지 않고(**relentless**) 훌륭했다. cf. relentless: 기세가 꺾이지 않는, 끊임없는',
      ],
    },
    {
      narrative: [
        '9. 그는 때를 기다리며(**bide my time**) 열심히 일해야 했다고 말했다. cf. bide one’s time: 때를 기다리다',
      ],
    },
    {
      narrative: [
        '10. 자신과의 싸움에서 어려움을 이겨내야(**come through**) 했다. cf. come through: 어려움을 이겨내다',
      ],
    },
    {
      narrative: [
        '11. 케인은 잉글랜드의 25년 발롱도르 가뭄을 끝내며 일반적 추세를 거스렀다(**bucked the trend**). cf. buck the trend: 일반적인 추세를 거스르다',
      ],
    },
    {
      narrative: [
        '12. 바이에른 뮌헨의 슈퍼스타들 사이에서도 케인은 두드러진다(**stands out**). cf. stand out: 두드러지다',
      ],
    },
    {
      narrative: [
        '13. 개인 성과 면에서 지난 시즌 케인은 필적할 상대가 없었다(**unmatched**). cf. unmatched: 필적할 상대가 없는',
      ],
    },
    {
      narrative: [
        '14. 케인만의 탁월한 기량(**brilliance**)은 새삼스러운 것이 아니다. cf. brilliance: 탁월한 기량',
      ],
    },
    {
      narrative: [
        '15. 2017년 토트넘에서 그는 한 해 동안 메시와 호날두보다 더 많은 골을 넣으며(**outscore**) 7년 만에 그 기록을 세웠다. cf. outscore: 상대보다 더 많은 골을 넣다',
      ],
    },
    {
      narrative: [
        '16. 사실 호날두가 11년 전 레알 마드리드에서 61골을 올린(**notched**) 이후 가장 많은 기록이다. cf. notch: 득점·기록을 올리다',
      ],
    },
    {
      narrative: [
        '17. 독일 슈퍼컵에서도 그는 한 골을 넣었다(**netted**). cf. net: 골을 넣다',
      ],
    },
    {
      narrative: [
        '18. 케인은 지난 시즌 바이에른에서 61골을 넣었고, 이는 2014-15 시즌 이후 최고 총득점(**tally**)이다. cf. tally: 총득점 수, 합계',
      ],
    },
    {
      narrative: [
        '19. 리그의 경쟁이 치열해 발롱도르 수상자에게 기대되는 영예와 골을 쌓기(**rack up**) 어렵다. cf. rack up: 득점·수상 실적을 쌓다',
      ],
    },
    {
      narrative: [
        '20. 챔피언스리그는 발롱도르 후보 지명에서 큰 영향력(**carries a lot of weight**)을 갖는다. cf. carry weight: 큰 영향력·중요성을 갖다',
      ],
    },
  ],

  source: {
    text: "BBC Sport | Kane ends England's 25-year Ballon d'Or wait — how he bucked the trend · The Economist | Did Harry Kane have to leave England to win the Ballon d’Or?",
    url: 'https://www.bbc.com/sport/football/articles/cqlye4jpzzxyo',
  },

  youtube: 'https://youtube.com/shorts/B7O6GBJwbnI',
};
// ===============================

uploadSportsNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
