/**
 * 산업뉴스 — iPhone Duo hinge / WSJ
 *   cd backend && node scripts/seed-industry-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadIndustryNews } from './industry-news-format.js';

const article = {
  title: '2,000달러짜리 새 아이폰 듀오를 개봉했는데 고장이 났다',

  slug: 'hinge-crease-tolerance-debris-lemon-repairable-related-words',

  metaDescription:
    'WSJ 아이폰 듀오·힌지·폴더블 고장 기사 어휘. hinge, crease, tolerance, debris, delicate, pry, sever, faulty, defect, lemon, adhesive, repairable, straightforward.',

  password: 'seed_industry_hinge-crease-tolerance-debris-lemon-related-words',

  datePublished: '2026-10-27',

  intro: [
    '약 2,000달러짜리 새 아이폰 듀오를 개봉하자마자 힌지와 화면이 고장 났다는 소비자 사례를 다룬 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. …the **hinge** got stuck at a 45-degree angle. / 경첩이 45도 각도에서 멈췄다. cf. hinge: 경첩, 접히는 연결 부품 (명)',
      ],
    },
    {
      narrative: [
        '2. …one along the **crease**. / 접힌 자국을 따라 문제가 나타났다. cf. crease: 접힌 자국, 주름 (명)',
      ],
    },
    {
      narrative: [
        '3. The consistency points to a possible sensitivity in the hinge **tolerance**s. / 일관된 증상은 힌지 허용 오차에 민감할 가능성을 가리킨다. cf. tolerance: 허용 오차 (명)',
      ],
    },
    {
      narrative: [
        '4. …trapped **debris** or a manufacturing defect in the hinge could damage the flexible display. / 끼인 이물질이나 힌지 제조 결함이 플렉서블 디스플레이를 손상할 수 있다. cf. debris: 이물질, 작은 파편 (명)',
      ],
    },
    {
      narrative: [
        '5. In other words, bendy screens are **delicate**. / 한마디로, 휘어지는 화면은 손상되기 쉽다. cf. delicate: 연약한, 손상되기 쉬운 (형)',
      ],
    },
    {
      narrative: [
        '6. Dalton tried to **pry** it open and heard a loud pop. / Dalton은 힘을 주어 벌리려 하다가 큰 소리를 들었다. cf. pry: 힘을 주어 벌리다, 비집어 열다 (동)',
      ],
    },
    {
      narrative: [
        '7. If this mechanism breaks, it could **sever** critical circuits. / 이 메커니즘이 깨지면 핵심 회로가 끊길 수 있다. cf. sever: 끊다, 절단하다 (동)',
      ],
    },
    {
      narrative: [
        '8. I haven’t experienced sticky hinges or **faulty** displays. / 나는 끈적이는 힌지나 결함 있는 디스플레이를 겪지 않았다. cf. faulty: 결함이 있는 (형)',
      ],
    },
    {
      narrative: [
        '9. …a manufacturing **defect** in the hinge could damage the flexible display. / 힌지의 제조 결함이 플렉서블 디스플레이를 손상할 수 있다. cf. defect: 결함, 하자 (명)',
      ],
    },
    {
      narrative: [
        '10. Are these units just **lemon**s—or are they part of a systemic issue? / 이 제품들이 그냥 불량품인지, 아니면 구조적 문제의 일부인지가 관건이다. cf. lemon: 불량품 (명)',
      ],
    },
    {
      narrative: [
        '11. …the batteries are secured with an **adhesive** that doesn’t require prying or alcohol. / 배터리는 비집거나 알코올이 필요 없는 접착제로 고정되어 있다. cf. adhesive: 접착제 (명)',
      ],
    },
    {
      narrative: [
        '12. Mokhtari did say the Duo is the most **repairable** foldable he’s inspected. / Mokhtari는 듀오가 자신이 점검한 폴더블 중 가장 수리하기 쉽다고 했다. cf. repairable: 수리할 수 있는 (형)',
      ],
    },
    {
      narrative: [
        '13. The entry process was **straightforward**. / 진입 과정은 복잡하지 않고 간단했다. cf. straightforward: 복잡하지 않은, 간단한 (형)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'hinge',
      meaning: '경첩, 접히는 연결 부품',
      exampleEn: 'the hinge got stuck at a 45-degree angle',
      exampleKo: '경첩이 45도 각도에서 멈췄다.',
    },
    {
      num: 2,
      expression: 'crease',
      meaning: '접힌 자국, 주름',
      exampleEn: 'one along the crease',
      exampleKo: '접힌 자국을 따라 문제가 나타났다.',
    },
    {
      num: 3,
      expression: 'tolerance',
      meaning: '허용 오차',
      exampleEn:
        'The consistency points to a possible sensitivity in the hinge tolerances',
      exampleKo: '일관된 증상은 힌지 허용 오차에 민감할 가능성을 가리킨다.',
    },
    {
      num: 4,
      expression: 'debris',
      meaning: '이물질, 작은 파편',
      exampleEn:
        'trapped debris or a manufacturing defect in the hinge could damage the flexible display',
      exampleKo: '끼인 이물질이나 힌지 제조 결함이 플렉서블 디스플레이를 손상할 수 있다.',
    },
    {
      num: 5,
      expression: 'delicate',
      meaning: '연약한, 손상되기 쉬운',
      exampleEn: 'In other words, bendy screens are delicate.',
      exampleKo: '한마디로, 휘어지는 화면은 손상되기 쉽다.',
    },
    {
      num: 6,
      expression: 'pry',
      meaning: '힘을 주어 벌리다, 비집어 열다',
      exampleEn: 'Dalton tried to pry it open and heard a loud pop.',
      exampleKo: 'Dalton은 힘을 주어 벌리려 하다가 큰 소리를 들었다.',
    },
    {
      num: 7,
      expression: 'sever',
      meaning: '끊다, 절단하다',
      exampleEn: 'If this mechanism breaks, it could sever critical circuits',
      exampleKo: '이 메커니즘이 깨지면 핵심 회로가 끊길 수 있다.',
    },
    {
      num: 8,
      expression: 'faulty',
      meaning: '결함이 있는',
      exampleEn: 'I haven’t experienced sticky hinges or faulty displays.',
      exampleKo: '나는 끈적이는 힌지나 결함 있는 디스플레이를 겪지 않았다.',
    },
    {
      num: 9,
      expression: 'defect',
      meaning: '결함, 하자',
      exampleEn:
        'a manufacturing defect in the hinge could damage the flexible display',
      exampleKo: '힌지의 제조 결함이 플렉서블 디스플레이를 손상할 수 있다.',
    },
    {
      num: 10,
      expression: 'lemon',
      meaning: '불량품',
      exampleEn:
        'Are these units just lemons—or are they part of a systemic issue?',
      exampleKo: '이 제품들이 그냥 불량품인지, 아니면 구조적 문제의 일부인지가 관건이다.',
    },
    {
      num: 11,
      expression: 'adhesive',
      meaning: '접착제',
      exampleEn:
        'the batteries are secured with an adhesive that doesn’t require prying or alcohol',
      exampleKo: '배터리는 비집거나 알코올이 필요 없는 접착제로 고정되어 있다.',
    },
    {
      num: 12,
      expression: 'repairable',
      meaning: '수리할 수 있는',
      exampleEn:
        'Mokhtari did say the Duo is the most repairable foldable he’s inspected.',
      exampleKo: 'Mokhtari는 듀오가 자신이 점검한 폴더블 중 가장 수리하기 쉽다고 했다.',
    },
    {
      num: 13,
      expression: 'straightforward',
      meaning: '복잡하지 않은, 간단한',
      exampleEn: 'The entry process was straightforward',
      exampleKo: '진입 과정은 복잡하지 않고 간단했다.',
    },
  ],

  source: {
    text: "The Wall Street Journal | ‘I Felt Blind Panic.’ They Opened Their New $2,000 iPhone Duo—and It Broke. | By Nicole Nguyen | Oct. 27, 2026",
    url: 'https://www.wsj.com/tech/personal-tech/iphone-duo-broken-hinge-screen-31b2b28a',
  },

  youtube: 'https://youtube.com/shorts/nhzRfKKfoAE',
  videoId: 'nhzRfKKfoAE',
};

uploadIndustryNews(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/industry-news/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
