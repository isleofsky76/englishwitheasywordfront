/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title:
    '[WSJ 국제영어] 영국 해군 드론·중국 부품 논란 | underscore · compromise · probe 어휘',

  slug: 'underscore-related-words',

  metaDescription:
    'underscore(강조하다), compromise(손상시키다), probe(조사), provenance(출처), scour(샅샅이 찾다), ubiquitous(어디에나 존재하는) 등 드론·군사 공급망 관련 시사 어휘 10개를 정리합니다.',

  password: 'password_seed_underscore_related_words',

  datePublished: '2026-08-31',

  intro: [
    '군사 장비와 드론의 **공급망·부품 출처·중국 의존 문제**를 다룬 WSJ 기사에서 사용된 시사 어휘를 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. underscore',
      narrative: [
        'underscore(ˌʌndərˈskɔːr / 언더스코어)는 **강조하다**, **부각하다**라는 뜻입니다.',
        '*The finding underscores worries about military supply chains.*',
        '**The finding** 그 발견은 / **underscores worries** 우려를 강조한다 / **about military supply chains** 군사 공급망에 대한.',
      ],
    },
    {
      title: '2. compromise',
      narrative: [
        'compromise(ˈkɑːmprəmaɪz / 캄프러마이즈)는 **손상시키다**, **위태롭게 하다**라는 뜻입니다.',
        '*No evidence of being accessed, compromised or transmitted externally.*',
        '**No evidence** 증거가 없다 / **of being accessed** 접근되거나 / **compromised** 손상되거나 / **or transmitted externally** 외부로 전송된.',
      ],
    },
    {
      title: '3. probe',
      narrative: [
        'probe(proʊb / 프로브)는 **조사**, **철저한 수사**라는 뜻입니다.',
        '*In the U.S., a congressional probe previously found that Chinese cargo cranes...*',
        '**In the U.S.** 미국에서 / **a congressional probe** 의회 조사는 / **previously found** 이전에 발견했다 / **that Chinese cargo cranes...** 중국 화물 크레인이…라는 것을.',
      ],
    },
    {
      title: '4. provenance',
      narrative: [
        'provenance(ˈprɑːvənəns / 프라버넌스)는 **출처**, **기원**, **유래**라는 뜻입니다.',
        '*Establishing the provenance of tiny components in the drone sector is challenging.*',
        '**Establishing the provenance** 출처를 파악하는 것은 / **of tiny components** 작은 부품의 / **in the drone sector** 드론 분야에서 / **is challenging** 어렵다.',
      ],
    },
    {
      title: '5. scour',
      narrative: [
        'scour(ˈskaʊər / 스카우어)는 **샅샅이 뒤지다**, **찾아다니다**라는 뜻입니다.',
        '*Scour the world for new stockpiles.*',
        '**Scour the world** 세계 곳곳을 샅샅이 찾아다니다 / **for new stockpiles** 새로운 비축량을 찾기 위해.',
      ],
    },
    {
      title: '6. ubiquitous',
      narrative: [
        'ubiquitous(juːˈbɪkwɪtəs / 유비쿼터스)는 **어디에나 존재하는**, **아주 흔한**이라는 뜻입니다.',
        '*Drones and parts from China remain ubiquitous.*',
        '**Drones and parts from China** 중국산 드론과 부품은 / **remain ubiquitous** 여전히 어디에나 존재한다.',
      ],
    },
    {
      title: '7. root',
      narrative: [
        'root(ruːt / 루트)는 **뿌리내리다**, **기반을 두다**라는 뜻입니다.',
        '*Arx has now rooted its supply chain in Europe.*',
        '**Arx** Arx는 / **has now rooted its supply chain** 이제 공급망을 뿌리내렸다 / **in Europe** 유럽에.',
      ],
    },
    {
      title: '8. install',
      narrative: [
        'install(ɪnˈstɔːl / 인스톨)은 **설치하다**, **장착하다**라는 뜻입니다.',
        '*Cameras installed on British naval drones sent data to an internet address in China.*',
        '**Cameras installed on British naval drones** 영국 해군 드론에 설치된 카메라는 / **sent data** 데이터를 전송했다 / **to an internet address** 인터넷 주소로 / **in China** 중국에 있는.',
      ],
    },
    {
      title: '9. wean off',
      narrative: [
        'wean off(wiːn ɔːf / 윈 오프)는 **의존에서 벗어나게 하다**, **서서히 끊다**라는 뜻입니다.',
        '*Defense companies have spent around a decade trying to wean themselves off Chinese components.*',
        '**Defense companies** 방위산업체들은 / **have spent around a decade** 약 10년을 보냈다 / **trying to wean themselves off** 의존에서 벗어나려고 노력하면서 / **Chinese components** 중국산 부품에 대한.',
      ],
    },
    {
      title: '10. trace',
      narrative: [
        'trace(treɪs / 트레이스)는 **추적하다**, **출처를 밝혀내다**라는 뜻입니다.',
        '*It is really, really hard to trace where the stuff comes from.*',
        '**It is really, really hard** 정말로 매우 어렵다 / **to trace** 추적하는 것은 / **where the stuff comes from** 그 물건이 어디에서 오는지를.',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | U.K. Discovers Component in Its Naval Drones Sent Signals to China',
    url: 'https://www.wsj.com/world/uk-discovers-component-in-its-naval-drones-sent-signals-to-china',
  },

  youtube:
    'https://www.youtube.com/watch?v=NaJFLTZNYjQ&list=PLSlq2Lkls6sY&index=3',
};
// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
