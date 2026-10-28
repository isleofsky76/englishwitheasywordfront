/**
 * 산업뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-industry-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadIndustryNews } from './industry-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '2,000달러짜리 새 아이폰 듀오를 개봉했는데 고장이 났다',

  slug: 'hinge-crease-tolerance-debris-lemon-repairable-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 아이폰 듀오·폴더블 고장·힌지·디스플레이 관련 시사 영단어. hinge, crease, tolerance, debris, delicate, pry, sever, faulty, defect, lemon, adhesive, repairable, straightforward 등.',

  password: 'seed_industry_hinge-crease-tolerance-debris-lemon-related-words',

  datePublished: '2026-10-27',

  intro: [
    '약 2,000달러짜리 새 아이폰 듀오를 개봉하자마자 힌지와 화면이 고장 났다는 소비자 사례를 다룬 월스트리트저널(WSJ) 기사에서 주요 시사 영단어를 정리합니다. 경첩 허용 오차, 이물질, 불량품 여부, 수리 가능성 관련 표현을 살펴봅니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. 경첩(**hinge**)이 45도 각도에서 멈췄다. cf. hinge: 경첩, 접히는 연결 부품',
      ],
    },
    {
      narrative: [
        '2. 문제는 접힌 자국(**crease**)을 따라 나타났다. cf. crease: 접힌 자국, 주름',
      ],
    },
    {
      narrative: [
        '3. 일관된 증상은 힌지 허용 오차(**tolerances**)에 민감할 가능성을 가리킨다. cf. tolerance: 허용 오차',
      ],
    },
    {
      narrative: [
        '4. 끼인 이물질(**debris**)이나 힌지 제조 결함이 플렉서블 디스플레이를 손상할 수 있다. cf. debris: 이물질, 작은 파편',
      ],
    },
    {
      narrative: [
        '5. 한마디로, 휘어지는 화면은 손상되기 쉽다(**delicate**). cf. delicate: 연약한, 손상되기 쉬운',
      ],
    },
    {
      narrative: [
        '6. Dalton은 힘을 주어 벌리려(**pry**) 하다가 큰 소리를 들었다. cf. pry: 힘을 주어 벌리다, 비집어 열다',
      ],
    },
    {
      narrative: [
        '7. 이 메커니즘이 깨지면 핵심 회로가 끊길(**sever**) 수 있다. cf. sever: 끊다, 절단하다',
      ],
    },
    {
      narrative: [
        '8. 나는 끈적이는 힌지나 결함 있는(**faulty**) 디스플레이를 겪지 않았다. cf. faulty: 결함이 있는',
      ],
    },
    {
      narrative: [
        '9. 힌지의 제조 결함(**defect**)이 플렉서블 디스플레이를 손상할 수 있다. cf. defect: 결함, 하자',
      ],
    },
    {
      narrative: [
        '10. 이 제품들이 그냥 불량품(**lemons**)인지, 아니면 구조적 문제의 일부인지가 관건이다. cf. lemon: 불량품',
      ],
    },
    {
      narrative: [
        '11. 배터리는 비집거나 알코올이 필요 없는 접착제(**adhesive**)로 고정되어 있다. cf. adhesive: 접착제',
      ],
    },
    {
      narrative: [
        '12. Mokhtari는 듀오가 자신이 점검한 폴더블 중 가장 수리하기 쉽다(**repairable**)고 했다. cf. repairable: 수리할 수 있는',
      ],
    },
    {
      narrative: [
        '13. 진입 과정은 복잡하지 않고 간단했다(**straightforward**). cf. straightforward: 복잡하지 않은, 간단한',
      ],
    },
  ],

  source: {
    text: "The Wall Street Journal | ‘I Felt Blind Panic.’ They Opened Their New $2,000 iPhone Duo—and It Broke. | By Nicole Nguyen",
    url: 'https://www.wsj.com/tech/personal-tech/iphone-duo-broken-hinge-screen-31b2b28a',
  },

  youtube: 'https://youtube.com/shorts/nhzRfKKfoAE',
};
// ===============================

uploadIndustryNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
