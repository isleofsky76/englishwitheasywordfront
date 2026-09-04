/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '영국 해군 드론·중국 부품 논란',

  slug: 'underscore-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 국방·공급망 관련 표현. underscore, compromise, probe, provenance, scour, ubiquitous, wean off, trace 등.',

  password: 'seed_defense_underscore-related-words',

  datePublished: '2026-08-31',

  intro: [
    '군사 장비와 드론의 공급망·부품 출처·중국 의존 문제를 다룬 WSJ 기사에서 사용된 시사 어휘를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 영국 해군 드론에 사용된 부품에서 중국과의 연결 가능성이 발견되면서, 군사 장비 공급망에 대한 우려가 더욱 부각됐다(**underscore**).',
      ],
    },
    {
      narrative: [
        '2. 조사 결과 해당 장비의 데이터가 외부에서 접근되거나 보안이 손상된(**compromise**) 증거는 발견되지 않았다.',
      ],
    },
    {
      narrative: [
        '3. 미국에서도 과거 중국산 화물 크레인과 관련해 의회 차원의 조사(**probe**)가 진행된 바 있다.',
      ],
    },
    {
      narrative: [
        '4. 드론에는 수많은 소형 전자부품이 들어가기 때문에 각각의 부품이 어디에서 만들어졌는지 출처를 확인하는 일(**provenance**)이 쉽지 않다. cf. 기원, 출처, 유래 (=origin)',
      ],
    },
    {
      narrative: [
        '5. 각국과 방위산업체들은 중국산 부품을 대체할 새로운 공급처와 비축 물량을 찾기 위해 세계 곳곳을 샅샅이 뒤지고 있다(**scour**).',
      ],
    },
    {
      narrative: [
        '6. 중국산 드론과 전자부품은 글로벌 시장 전반에 너무 널리 퍼져 있어 여전히 거의 어디에서나(**ubiquitous**) 발견된다.',
      ],
    },
    {
      narrative: [
        '7. 독일 방산기업 Arx는 중국 의존도를 낮추기 위해 공급망의 기반을 유럽에 두기 시작했다(**root**). cf. 뿌리를 내리다, 뿌리 내리게 하다',
      ],
    },
    {
      narrative: [
        '8. 영국 해군 드론에 장착된(**installed**) 카메라가 중국에 있는 인터넷 주소로 데이터를 전송한 사실이 발견되면서 논란이 커졌다.',
      ],
    },
    {
      narrative: [
        '9. 서방 방위산업체들은 약 10년 동안 중국산 전자부품에 대한 의존에서 벗어나기 위해 노력해 왔다(**wean off**). cf. wean somebody off/from something ~가 ~을 끊게[그만두게] 하다',
      ],
    },
    {
      narrative: [
        '10. 드론에 들어가는 부품이 여러 국가와 공급업체를 거치기 때문에 실제로 어디에서 생산됐는지 추적하는 것(**trace**)은 매우 어렵다. cf. 추적하다, (추적하여) 찾아내다 (=track down)',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | U.K. Discovers Component in Its Naval Drones Sent Signals to China',
    url: 'https://www.wsj.com/world/uk/u-k-discovers-component-in-its-naval-drones-sent-signals-to-china-6ae60578',
  },

  youtube: 'https://www.youtube.com/watch?v=NaJFLTZNYjQ',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
