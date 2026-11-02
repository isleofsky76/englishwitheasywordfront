/**
 * 산업뉴스 — iPhone Duo hinge / WSJ
 *   cd backend && node scripts/seed-industry-news.js
 *
 * 유튜브 설명: 예문은 영어만. 한글 문장 번역 없으면 비움. 뜻은 cf.에만.
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
        '1. the **hinge** got stuck at a 45-degree angle cf. hinge: 경첩, 접히는 연결 부품 (명)',
      ],
    },
    {
      narrative: [
        '2. one along the **crease** cf. crease: 접힌 자국, 주름 (명)',
      ],
    },
    {
      narrative: [
        '3. The consistency points to a possible sensitivity in the hinge **tolerance**s cf. tolerance: 허용 오차 (명)',
      ],
    },
    {
      narrative: [
        '4. trapped **debris** or a manufacturing defect in the hinge could damage the flexible display cf. debris: 이물질, 작은 파편 (명)',
      ],
    },
    {
      narrative: [
        '5. In other words, bendy screens are **delicate**. cf. delicate: 연약한, 손상되기 쉬운 (형)',
      ],
    },
    {
      narrative: [
        '6. Dalton tried to **pry** it open and heard a loud pop. cf. pry: 힘을 주어 벌리다, 비집어 열다 (동)',
      ],
    },
    {
      narrative: [
        '7. If this mechanism breaks, it could **sever** critical circuits cf. sever: 끊다, 절단하다 (동)',
      ],
    },
    {
      narrative: [
        '8. I haven’t experienced sticky hinges or **faulty** displays. cf. faulty: 결함이 있는 (형)',
      ],
    },
    {
      narrative: [
        '9. a manufacturing **defect** in the hinge could damage the flexible display cf. defect: 결함, 하자 (명)',
      ],
    },
    {
      narrative: [
        '10. Are these units just **lemon**s—or are they part of a systemic issue? cf. lemon: 불량품 (명)',
      ],
    },
    {
      narrative: [
        '11. the batteries are secured with an **adhesive** that doesn’t require prying or alcohol cf. adhesive: 접착제 (명)',
      ],
    },
    {
      narrative: [
        '12. Mokhtari did say the Duo is the most **repairable** foldable he’s inspected. cf. repairable: 수리할 수 있는 (형)',
      ],
    },
    {
      narrative: [
        '13. The entry process was **straightforward** cf. straightforward: 복잡하지 않은, 간단한 (형)',
      ],
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
