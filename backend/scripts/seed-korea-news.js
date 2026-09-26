/**
 * 한국뉴스 업로드 (국방 / 국제)
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-korea-news.js
 * category: '국방' | '국제'  (제목에 [국방]/[국제] 자동 접두)
 */
import { API_BASE } from './loadEnv.js';
import { uploadKoreaNews } from './korea-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '추석 해외여행 1위 일본',

  slug: 'koreans-traveling-chuseok-japan-top-destination-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 추석 여행 관련 문장. most popular overseas destination, short-haul options, extending the break, personal leave, measles cases, checking vaccination records.',

  password: 'password_seed_koreans_chuseok_travel_japan_top_destination_koreaherald',

  datePublished: '2026-09-22',

  intro: [
    '올해 추석 연휴 한국인들이 가장 많이 찾은 해외 여행지와 일본 여행 시 주의사항을 다룬 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 일본은 올해 추석 연휴 동안(**during this year’s Chuseok holiday**) 한국인들에게 가장 인기 있는 해외 여행지였으며(**the most popular overseas destination**), 오사카·후쿠오카·도쿄가 상위 3개 도시에 올랐습니다(**ranking as the top three cities**).',
      ],
    },
    {
      narrative: [
        '2. 예약 데이터는 가까운 여행지(**nearby destinations**)와 국내의 소도시(**smaller domestic cities**)에 대한 뚜렷한 선호(**a clear preference**)를 보여주었습니다.',
      ],
    },
    {
      narrative: [
        '3. 많은 여행객이 연휴를 스스로 연장했으며(**extending the break on their own**), 일부는 휴가를 내서(**took personal leave**) 쉬는 기간을 늘린 것으로 보입니다(**stretch out their time off**).',
      ],
    },
  
  ],

  source: {
    text: 'The Korea Herald | Where are Koreans traveling for Chuseok? This country tops the list | By Jung Seo-young',
    url: 'https://www.koreaherald.com/article/10881960',
  },
};

// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
