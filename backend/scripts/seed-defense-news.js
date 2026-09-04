/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '트럼프의 한미 연합군사훈련 축소 방침과 북한·이란 전쟁',

  slug: 'trump-korea-military-drills-related-words',

  metaDescription:
    'BBC 기사에서 추출한 국방·외교 표현. substantially, deployment, rehearsal, diplomacy, precedent, armistice, defuse 등.',

  password: 'seed_defense_trump-korea-military-drills-related-words',

  datePublished: '2026-09-04',

  intro: [
    '트럼프 대통령의 한미 연합군사훈련 축소 방침과 북한·이란 전쟁·한미동맹 문제를 다룬 BBC 기사에서 사용된 국방·외교 어휘를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 한미 연합군사훈련을 상당히(**substantially**) 줄인다.',
      ],
    },
    {
      narrative: [
        '2. 북한 지도자 김정은과의 매우 좋은 관계를 이유로 들었다(**cite**).',
      ],
    },
    {
      narrative: [
        '3. 이러한 훈련이 완전히 부적절한(**inappropriate**) 신호를 보낸다고 말했다.',
      ],
    },
    {
      narrative: [
        '4. 이러한 훈련이 적대적인(**hostile**) 신호를 보낸다고 비판했다.',
      ],
    },
    {
      narrative: [
        '5. 러시아의 우크라이나 전쟁을 지원하기 위한 병력 배치(**deployment**)이다.',
      ],
    },
    {
      narrative: [
        '6. 북한은 한미 연합군사훈련을 강력히 규탄했다(**condemn**).',
      ],
    },
    {
      narrative: [
        '7. 북한은 연합군사훈련을 침략 전쟁을 위한 예행연습(**rehearsal**)으로 본다.',
      ],
    },
    {
      narrative: [
        '8. 김정은의 트럼프 대통령과의 고위급 외교(**diplomacy**)가 다시 주목받고 있다.',
      ],
    },
    {
      narrative: [
        '9. 트럼프 대통령은 다른 동맹국들이 분쟁에 개입하기를 주저한 것(**hesitance**)에 불만을 나타냈다.',
      ],
    },
    {
      narrative: [
        '10. 한미 연합군사훈련을 축소하려는 움직임은 선례(**precedent**)가 없는 것은 아니다.',
      ],
    },
    {
      narrative: [
        '11. 트럼프 대통령은 2018년 연합군사훈련을 완전히 중단했다(**suspend**).',
      ],
    },
    {
      narrative: [
        '12. 당시 트럼프 대통령은 연례 군사훈련이 도발적(**provocative**)이라고 평가했다.',
      ],
    },
    {
      narrative: [
        '13. 한국전쟁은 1953년 정전협정(**armistice**)이 체결됐지만 공식적인 평화협정으로 끝난 것은 아니다.',
      ],
    },
    {
      narrative: [
        '14. 한국에 주둔한(**station**) 미군 병력은 대비 태세를 유지하고 있다.',
      ],
    },
    {
      narrative: [
        '15. 한국 정부는 올해 긴장을 완화하려고 노력해 왔다(**defuse**).',
      ],
    },
    {
      narrative: [
        '16. 한국은 미국에 3,500억 달러를 투자하기로 약속했다(**commit**).',
      ],
    },
  ],

  source: {
    text: 'BBC | Trump says US to scale back South Korea military drills after it stayed out of Iran war | Brandon Drenon and Jake Kwon',
    url: 'https://www.bbc.com/news/articles/cx2lll7zvn0o',
  },

  youtube: 'https://www.youtube.com/watch?v=QMJAbMxz-ic',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
