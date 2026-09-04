/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '미국의 조선 능력 부족은 해군에 걸림돌이 된다',

  slug: 'bulwark-related-words',

  metaDescription:
    'Economist 기사에서 추출한 국방·조선 관련 표현. bulwark, prowess, eclipse, hamper, intertwine, commonality, complementary 등.',

  password: 'seed_defense_bulwark-related-words',

  datePublished: '2026-08-31',

  intro: [
    '미국·중국·유럽의 상업 조선업과 해군력의 관계를 다룬 Economist 기사에서 사용된 국방·조선 관련 시사 어휘를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 영국 해군은 한때 섬나라를 지키는 떠다니는 보루(**bulwark**)로 묘사됐다.',
      ],
    },
    {
      narrative: [
        '2. 미국의 상업 조선 분야에서의 뛰어난 능력(**prowess**) 부족은 미 해군에 큰 비용을 초래했다.',
      ],
    },
    {
      narrative: [
        '3. 유럽의 세계적인 조선소들은 먼저 일본에, 이후 한국에 추월당했다(**eclipse**).',
      ],
    },
    {
      narrative: [
        '4. 미국의 미약한 상업 조선업은 미 해군이 경쟁 속도를 따라가는 능력을 저해하고 있다(**hamper**).',
      ],
    },
    {
      narrative: [
        '5. 중국의 상업 조선업은 중국 해군과 밀접하게 얽혀 있다(**intertwine**).',
      ],
    },
    {
      narrative: [
        '6. 여러 선박에 적용되는 기본 플랫폼에는 많은 공통점(**commonality**)이 있다.',
      ],
    },
    {
      narrative: [
        '7. 상업 조선업과 군함 건조 산업은 제조 기술·조선소·공급망 측면에서 매우 상호 보완적이다(**complementary**).',
      ],
    },
  ],

  source: {
    text: 'The Economist | America’s lack of shipbuilding prowess is a problem for its navy',
    url: 'https://www.economist.com/business/2026/08/06/americas-lack-of-shipbuilding-prowess-is-a-problem-for-its-navy',
  },

  youtube: 'https://www.youtube.com/watch?v=LRXVMotNybA',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
