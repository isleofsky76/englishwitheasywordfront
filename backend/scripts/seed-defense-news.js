/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[Economist 국제영어] 미국의 조선 능력 부족은 해군에 걸림돌이 된다. | prowess · eclipse · hamper · intertwine',

  slug: 'bulwark-related-words',

  metaDescription:
    'bulwark(보루), prowess(뛰어난 능력), eclipse(능가하다), hamper(방해하다), intertwine(밀접하게 얽히다), commonality(공통점), complementary(상호 보완적인)의 뜻과 뉴스 예문을 정리합니다.',

  password: 'seed_defense_bulwark-related-words',

  datePublished: '2026-08-31',

  intro: [
    '미국·중국·유럽의 **상업 조선업과 해군력의 관계**를 다룬 기사에서 사용된 국방·조선 관련 시사 어휘를 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. bulwark',
      narrative: [
        'bulwark(ˈbʊlwərk / 불워크)는 **보루**, **방벽**, **요새**라는 뜻입니다.',

        '*“The floating bulwark of our island” is how William Blackstone, an 18th-century British politician, described the Royal Navy.*',

        '**“The floating bulwark of our island”** “우리 섬의 떠다니는 보루”는 / **is how William Blackstone described the Royal Navy** 윌리엄 블랙스톤이 영국 해군을 묘사한 표현이다 / **an 18th-century British politician** 그는 18세기 영국 정치인이었다.',
      ],
    },

    {
      title: '2. prowess',
      narrative: [
        'prowess(ˈpraʊəs / 프라우어스)는 **뛰어난 능력**, **탁월한 실력**이라는 뜻입니다.',

        '*America’s lack of commercial-shipbuilding prowess has proved costly for its navy, whose shipyards have been unable to deliver vessels on time and on budget.*',

        '**America’s lack of commercial-shipbuilding prowess** 미국의 상업 조선 능력 부족은 / **has proved costly for its navy** 미 해군에 큰 대가를 치르게 했다 / **whose shipyards have been unable to deliver vessels** 해군 조선소들은 함정을 인도하지 못하고 있다 / **on time and on budget** 제때 그리고 정해진 예산에 맞춰.',
      ],
    },

    {
      title: '3. eclipse',
      narrative: [
        'eclipse(ɪˈklɪps / 이클립스)는 **능가하다**, **빛을 잃게 하다**, **추월하다**라는 뜻입니다.',

        '*After the second world war Europe’s world-leading shipyards were eclipsed first by Japan, using cheap steel and labour along with new manufacturing methods, then by South Korea.*',

        '**After the second world war** 2차 세계대전 이후 / **Europe’s world-leading shipyards were eclipsed first by Japan** 유럽의 세계적인 조선소들은 일본에 먼저 추월당했고 / **using cheap steel and labour along with new manufacturing methods** 일본은 값싼 철강과 노동력, 새로운 제조 방식을 활용했다 / **then by South Korea** 이후에는 한국에 추월당했다.',
      ],
    },

    {
      title: '4. hamper',
      narrative: [
        'hamper(ˈhæmpər / 햄퍼)는 **방해하다**, **저해하다**라는 뜻입니다.',

        '*America’s commercial-shipbuilding industry, by contrast, barely registers, hampering the ability of its navy to keep pace.*',

        '**America’s commercial-shipbuilding industry, by contrast** 반면 미국의 상업 조선업은 / **barely registers** 거의 존재감이 없으며 / **hampering the ability of its navy** 미 해군의 능력을 저해하고 있다 / **to keep pace** 경쟁 속도를 따라갈 수 있는.',
      ],
    },

    {
      title: '5. intertwine',
      narrative: [
        'intertwine(ˌɪntərˈtwaɪn / 인터트와인)은 **밀접하게 얽히다**, **서로 연결되다**라는 뜻입니다.',

        '*Matthew Funaiole of the Centre for Strategic and International Studies, a think-tank in Washington, explains that China’s commercial-shipbuilding industry is “closely intertwined” with its navy.*',

        '**Matthew Funaiole of the Centre for Strategic and International Studies** 전략국제문제연구소의 매슈 푸나이올은 / **a think-tank in Washington** 워싱턴에 있는 싱크탱크인 / **explains that China’s commercial-shipbuilding industry** 중국의 상업 조선업이 / **is “closely intertwined” with its navy** 중국 해군과 “밀접하게 얽혀 있다”고 설명한다.',
      ],
    },

    {
      title: '6. commonality',
      narrative: [
        'commonality(ˌkɑːməˈnæləti / 카머낼러티)는 **공통점**, **공통성**이라는 뜻입니다.',

        '*The underlying “platform” across vessels has many commonalities, points out Marzio Forlini of Bain, a consultancy.*',

        '**The underlying “platform” across vessels** 여러 선박에 공통으로 적용되는 기본 “플랫폼”에는 / **has many commonalities** 많은 공통점이 있다고 / **points out Marzio Forlini of Bain** 베인의 마르지오 포를리니가 지적한다 / **a consultancy** 베인은 컨설팅회사이다.',
      ],
    },

    {
      title: '7. complementary',
      narrative: [
        'complementary(ˌkɑːmpləˈmentəri / 캄플러멘터리)는 **상호 보완적인**, **서로 보충하는**이라는 뜻입니다.',

        '*Pierroberto Folgiero, boss of Fincantieri, Europe’s biggest shipbuilder, agrees that the two industries are highly complementary, pointing to manufacturing skills, the availability of shipyards and overlapping supply chains.*',

        '**Pierroberto Folgiero, boss of Fincantieri** 핀칸티에리의 CEO 피에로베르토 폴지에로는 / **Europe’s biggest shipbuilder** 핀칸티에리는 유럽 최대 조선업체이며 / **agrees that the two industries are highly complementary** 두 산업이 매우 상호 보완적이라고 본다 / **pointing to manufacturing skills** 제조 기술과 / **the availability of shipyards** 조선소의 가용성 / **and overlapping supply chains** 그리고 서로 겹치는 공급망을 근거로.',
      ],
    },
  ],

  youtube:
    'https://www.youtube.com/watch?v=LRXVMotNybA&list=PLSlq2Lkls6sY&index=2',

  source: {
    text: "The Economist | America's lack of shipbuilding prowess is a problem for its navy",
    url: 'https://www.economist.com/business/2026/08/06/americas-lack-of-shipbuilding-prowess-is-a-problem-for-its-navy',
  },
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
