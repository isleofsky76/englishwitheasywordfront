/**
 * 여행뉴스 — 28년 세계 도보 / The Guardian
 *   cd backend && node scripts/seed-travel-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadTravelNews } from './travel-news-format.js';

const article = {
  title: '28년 세계 도보를 마친 영국인에게 쏟아진 영웅의 환영',

  slug: 'odyssey-expedition-journey-voyage-trek-itinerary-related-words',

  metaDescription:
    'The Guardian 28년 세계 도보 기사 어휘. odyssey, expedition, journey, voyage, trek, itinerary, sojourn, pilgrimage, wayfaring.',

  password: 'seed_travel_odyssey-expedition-journey-voyage-trek',

  datePublished: '2026-11-02',

  intro: [
    '28년간 세계를 걸어 돌아온 영국인에게 영웅의 환영이 쏟아졌다는 The Guardian 기사에서 여정·탐험 관련 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. After a 28-year **odyssey** spanning 29 countries / 29개국에 걸친 28년간의 대장정 끝에 cf. odyssey: 대장정, 긴 여정 (명)',
      ],
    },
    {
      narrative: [
        '2. led a scientific **expedition** across the frozen tundra / 얼어붙은 툰드라를 가로지르는 과학 탐험을 이끌었다. cf. expedition: 탐험, 원정 (명)',
      ],
    },
    {
      narrative: [
        '3. embarked on an arduous **journey** across the continent / 대륙을 가로지르는 고된 여정에 나섰다. cf. journey: 여정, 장거리 여행 (명)',
      ],
    },
    {
      narrative: [
        '4. completed a solo sea **voyage** around the globe / 단독 세계 일주 항해를 마쳤다. cf. voyage: 항해, 긴 여행 (명)',
      ],
    },
    {
      narrative: [
        '5. survived a grueling **trek** through the dense jungle / 빽빽한 밀림을 통과하는 몹시 고된 도보 여정을 견뎌냈다. cf. trek: 길고 힘든 도보 여행 (명)',
      ],
    },
    {
      narrative: [
        '6. mapped out a strict **itinerary** covering five major cities / 주요 도시 다섯 곳을 방문하는 엄격한 여행 일정을 짰다. cf. itinerary: 여행 일정표, 여행 경로 (명)',
      ],
    },
    {
      narrative: [
        '7. cut short a brief **sojourn** in a remote mountain village / 외딴 산골 마을에서의 짧은 체류를 예정보다 일찍 끝냈다. cf. sojourn: 일시적인 체류, 체재 (명)',
      ],
    },
    {
      narrative: [
        '8. undertook a spiritual **pilgrimage** to the sacred peak / 성스러운 산봉우리를 향해 영적인 순례에 나섰다. cf. pilgrimage: 순례, 성지 참배 (명)',
      ],
    },
    {
      narrative: [
        '9. recounted tales from years of solitary **wayfaring** / 수년간 홀로 걸어서 여행하며 겪은 이야기들을 들려주었다. cf. wayfaring: 도보 여행, 여행하는 (명·형)',
      ],
    },
  ],

  source: {
    text: "The Guardian | ‘It’s been a while’: hero’s welcome for UK man after 28-year walk across the world | By Josh Halliday | Mon 2 Nov 2026",
    url: 'https://www.theguardian.com/uk-news/2026/nov/02/karl-bushby-uk-hull-28-year-walk-across-world',
  },

  youtube: 'https://youtube.com/shorts/brYK43Y4Osw',
  videoId: 'brYK43Y4Osw',
};

uploadTravelNews(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/travel-news/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
