/**
 * 여행뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-travel-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadTravelNews } from './travel-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '그리스 펠로폰네소스 가을 자동차 여행',

  slug: 'hairpin-bend-causeway-circuit-pass-related-words',

  metaDescription:
    'The Guardian 여행 기사에서 추출한 그리스 펠로폰네소스 자동차 여행 관련 영어 표현. hairpin bend, causeway, circuit, pass, studded with, sidetrack, shoulder season 등.',

  password: 'seed_travel_peloponnese-autumn-roadtrip-related-words',

  datePublished: '2026-10-17',

  intro: [
    '그리스 펠로폰네소스반도의 아름다운 가을 풍경과 해안도로, 산길, 역사적인 마을을 자동차로 여행한 The Guardian 기사에서 주요 영어 표현을 정리합니다. 칼라마타에서 출발해 타이게토스 산길과 모넴바시아 요새 섬, 폴릴림니오 폭포 등을 둘러보며 가을 여행의 매력과 비성수기 여행의 장점을 소개합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 그리스 펠로폰네소스의 구불구불한 산길에서는 급커브(**hairpin bend**)를 돌 때마다 바다 풍경과 꽃, 석회암 지형이 눈앞에 펼쳐졌다. cf. hairpin bend: (특히 산길의) 급커브',
      ],
    },
    {
      narrative: [
        '2. 여행자는 작은 요새 섬 모넴바시아와 펠로폰네소스 남동부 해안을 연결하는 둑길(**causeway**)을 차로 건넜다. 사방에서는 에게해가 반짝이고 있었다. cf. causeway: 둑길, 제방 위에 만든 도로',
      ],
    },
    {
      narrative: [
        '3. 여행자는 녹음이 우거진 항구도시 칼라마타에서 출발해 펠로폰네소스 해안도로를 따라 순회하는 여행 경로(**circuit**)에 올랐다. cf. circuit: 순환로, 순회 노선',
      ],
    },
    {
      narrative: [
        '4. 모넴바시아까지 이어지는 두 시간의 드라이브는 타이게토스 산의 고갯길(**pass**)에서 시작됐다. 길은 마을과 절벽 옆 터널을 구불구불 지나갔다. cf. pass: 고개, 산길',
      ],
    },
    {
      narrative: [
        '5. 펠로폰네소스의 산골짜기에는 소나무 숲과 들꽃이 펼쳐져 있었고, 드넓은 녹지 곳곳에는 소박한 석회암 집들이 점점이 들어서(**studded with**) 있었다. cf. studded with: ~이 곳곳에 박힌, ~이 여기저기 흩어져 있는',
      ],
    },
    {
      narrative: [
        '6. 여행자는 원래의 자동차 여행 경로에서 옆길로 빠져(**sidetracked**) 아름다운 폴릴림니오 폭포로 향했다. cf. sidetrack: 옆길로 새다, 본래 경로에서 벗어나다',
      ],
    },
    {
      narrative: [
        '7. 성수기와 비수기 사이의 여행 시기(**shoulder season**)에는 날씨가 선선해 긴 산책을 즐기기 좋고, 기온이 약 25도여서 바다에서 수영하기에도 적합했다. cf. shoulder season: 성수기와 비수기 사이 시기, 준성수기',
      ],
    },
  ],

  source: {
    text: 'The Guardian | A Greece for all seasons: my autumn roadtrip through the Peloponnese | By Chris Cotonou',
    url: 'https://www.theguardian.com/travel/2026/oct/17/peloponnese-greece-road-trip-autumn',
  },

  youtube: 'https://youtube.com/shorts/YOsCAM-nEoA',
};
// ===============================

uploadTravelNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
