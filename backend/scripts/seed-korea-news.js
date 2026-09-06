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
  title: '장관 후보자 논란',

  slug: 'minister-nominees-confirmation-hearings-lee-cabinet-koreatimes',

  metaDescription:
    'The Korea Times 기사에서 추출한 장관 후보자 인사청문회 관련 문장. minister nominees, mounting questions, confirmation hearings, fails to pass the hearing, steps down, deal a blow, Cabinet reshuffle, falling approval ratings.',

  password: 'password_seed_minister_nominees_confirmation_hearings_lee_cabinet_koreatimes',

  datePublished: '2026-09-06',

  intro: [
    '두 장관 후보자가 인사청문회를 앞두고 논란에 직면했다는 The Korea Times 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 두 명의 장관 후보자들(**Two minister nominees**)은 인사청문회를(**confirmation hearings**) 통과할 수 있는지(**whether they can survive**)를 둘러싸고 증가하는 의문들(**mounting questions**)에 직면하고 있습니다(**are facing**).',
      ],
    },
    {
      narrative: [
        '2. 만약 그들 중 단 한 명이라도 청문회 통과에 실패하거나(**fails to pass the hearing**) 후보 지명에서 사퇴한다면(**steps down from the nomination**), 그것은 이재명 대통령에게 타격을 입힐 것입니다(**will deal a blow to**).',
      ],
    },
    {
      narrative: [
        '3. 대통령은 내각 개편(**the Cabinet reshuffle**)이 하락하는 지지율 속에서(**amid falling approval ratings**) 자신의 정책들을 위한 동력을 되찾는 데 도움이 되기를 바랐습니다(**would help him regain momentum for his policies**).',
      ],
    },
  ],

  source: {
    text: "The Korea Times | Controversies cloud confirmation prospects for Lee's Cabinet nominees | By Yi Whan-woo",
    url: 'https://www.koreatimes.co.kr/southkorea/politics/20260906/controversies-cloud-confirmation-prospects-for-lees-cabinet-nominees',
  },

  
};



// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
