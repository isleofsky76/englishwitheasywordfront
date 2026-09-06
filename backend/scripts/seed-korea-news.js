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
  title: '한국 관광객 불만 사상 최고',

  slug: 'tourist-complaints-korea-record-high-travel-boom-koreatimes',

  metaDescription:
    'The Korea Times 기사에서 추출한 한국 관광객 불만 관련 문장. complaints hit a record high, reckless taxi driving, overcharging, surpass, come up with measures, accommodations, account for.',

  password: 'password_seed_tourist_complaints_korea_record_high_travel_boom_koreatimes',

  datePublished: '2026-09-06',

  intro: [
    '한국의 관광객 불만이 여행 회복세 속에서 사상 최고치를 기록했다는 The Korea Times 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 한국의 관광객 불만(**complaints**)이 올해 사상 최고치를 기록했습니다(**hit a record high**).',
      ],
    },
    {
      narrative: [
        '2. 난폭한 택시 운전(**reckless taxi driving**)부터 쇼핑몰 바가지요금(**overcharging**)까지 다양한 문제가 제기됐습니다.',
      ],
    },
    {
      narrative: [
        '3. 올해 1월부터 7월까지 접수된 불만은 1,753건으로(**1,753 complaints were filed nationwide between January and July**), 이미 지난해 전체 1,744건을 넘어섰습니다(**surpassing the 1,744 cases reported last year**).',
      ],
    },
    {
      narrative: [
        '4. 관광 서비스 개선을 위한 대책을 마련해야 한다는 요구가 커지고 있습니다(**come up with measures to improve tourism services**).',
      ],
    },
    {
      narrative: [
        '5. 숙박 관련 불만(**accommodations**)이 가장 많았으며, 일방적 예약 취소(**one-sided reservation cancellations**)와 과도한 취소 수수료(**excessive cancellation fees**) 관련 사례가 500건이었습니다.',
      ],
    },
    {
      narrative: [
        '6. 택시기사가 미터기 사용을 거부하거나 난폭하게 운전하는 불만(**drive recklessly**)은 182건이었습니다.',
      ],
    },
    {
      narrative: [
        '7. 외국인 관광객이 전체 불만의 84.3%를 차지했습니다(**account for 84.3 percent of all complaints**).',
      ],
    },
    {
      narrative: [
        '8. 정부와 민간 부문 모두(**both the government and the private sector**) 관광객 만족도를 높이기 위해 노력해야 한다는 지적이 나왔습니다.',
      ],
    },
    {
      narrative: [
        '9. 관광객과 관광산업이 성장하면서 불만과 부정적 지표(**negative indicators**)도 함께 증가했습니다.',
      ],
    },
    {
      narrative: [
        '10. SNS에 공유된 부정적인 경험이 빠르게 확산돼 관광산업에 악영향을 미칠 수 있습니다(**hurt the tourism industry**).',
      ],
    },
  ],

  source: {
    text: 'The Korea Times | Tourist complaints in Korea hit record high amid travel boom | By Yonhap',
    url: 'https://www.koreatimes.co.kr/southkorea/20260906/tourist-complaints-in-korea-hit-record-high-amid-travel-boom',
  },

};

// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
