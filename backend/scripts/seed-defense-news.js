/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '요격 미사일이 떨어지면 어떻게 될까요?',

  slug: 'vulnerable-related-words',

  metaDescription:
    'Economist 기사에서 추출한 표현. vulnerable, boast, deplete, attritional, proliferation, formidable 등.',

  password: 'seed_defense_vulnerable-related-words',

  datePublished: '2026-08-31',

  intro: [
    '이 표현들은 Economist 기사 "요격 미사일이 떨어지면 어떻게 될까요?"에서 추출한 표현들입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 군사기지가 취약(**vulnerable**)해지고, 심지어 강대국들도 군사작전을 제한해야 할 수 있다.',
      ],
    },
    {
      narrative: [
        '2. 3월에 우크라이나는 탄도미사일의 약 70%를 요격했다고 성과를 내세웠다(**boast**).',
      ],
    },
    {
      narrative: [
        '3. 곤경(**plight**)에 처해 있다.',
      ],
    },
    {
      narrative: [
        '4. 그것들을 다른 임무로 돌린다(**divert**).',
      ],
    },
    {
      narrative: [
        '5. 보유 비축량을 소진했다(**deplete**).',
      ],
    },
    {
      narrative: [
        '6. 소모전(**attritional**)이다.',
      ],
    },
    {
      narrative: [
        '7. 가장 가까운(**proximate**) 원인이다.',
      ],
    },
    {
      narrative: [
        '8. 막대한(**prodigious**) 사용이다.',
      ],
    },
    {
      narrative: [
        '9. 현실을 직시해야 하는 순간을 앞당겼다(**hasten**).',
      ],
    },
    {
      narrative: [
        '10. 전 세계적인 확산(**proliferation**)이다.',
      ],
    },
    {
      narrative: [
        '11. 안일함(**complacency**)이 문제이다.',
      ],
    },
    {
      narrative: [
        '12. 엄청나게 거대한(**gargantuan**) 1조 5천억 달러 규모의 국방예산이다.',
      ],
    },
    {
      narrative: [
        '13. 예상치 못한 문제(**hitch**)가 있다.',
      ],
    },
    {
      narrative: [
        '14. 하나의 체계를 즉석에서 만들었다(**improvise**).',
      ],
    },
    {
      narrative: [
        '15. 다른 것에 의해 능가당한다(**upstage**).',
      ],
    },
    {
      narrative: [
        '16. 민첩한(**nimble**) 방어이다.',
      ],
    },
    {
      narrative: [
        '17. 신생(**upstart**) 기업들이다.',
      ],
    },
    {
      narrative: [
        '18. 회의론자들이 많이 존재한다(**abound**).',
      ],
    },
    {
      narrative: [
        '19. 만만치 않은(**formidable**) 상대이다.',
      ],
    },
  ],

  source: {
    text: 'The Economist',
    url: 'https://www.economist.com/international/2026/08/18/what-happens-when-interceptor-missiles-run-out',
  },

  youtube: 'https://www.youtube.com/watch?v=A8Vot6kHG_0',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
