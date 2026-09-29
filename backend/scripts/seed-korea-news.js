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
  title: '영화 어쌔신, 추석 흥행과 역사 논쟁',

  slug: 'assassins-chuseok-box-office-partisan-battle-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 영화 The Assassin(s)의 추석 흥행과 역사 논쟁 관련 문장. shot dead during a live broadcast, holiday box office hit, flashpoint, partisan battle, topped a crowded Chuseok frame, sold 1.4 million tickets.',

  password: 'password_seed_assassins_chuseok_box_office_koreaherald',

  datePublished: '2026-09-28',

  intro: [
    '영부인 육영수 피격 사건을 다룬 영화 The Assassin(s)가 추석 박스오피스 1위가 되고 역사 논쟁의 불씨가 됐다는 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 한국의 영부인이 국가 행사 생중계 도중 총에 맞아 숨진 지 반세기가 넘은 뒤(**more than half a century after ... was shot dead during a live broadcast**), 그 사건을 다룬 영화가 명절 박스오피스 최대 흥행작이 되었습니다(**the country\'s biggest holiday box office hit**).',
      ],
    },
    {
      narrative: [
        '2. 이 영화는 한국이 자기 역사를 두고 오래 벌여 온 당파 싸움의 가장 최근 불씨가 되기도 했습니다(**the latest flashpoint in Korea\'s long-running partisan battle**).',
      ],
    },
    {
      narrative: [
        '3. 영화진흥위원회 실시간 집계에 따르면, 이 영화는 나흘간의 추석 연휴 동안 140만 장의 표를 팔며(**sold 1.4 million tickets over the four-day holiday**) 북적인 추석 상영작들 사이에서 1위를 차지했습니다(**topped a crowded Chuseok frame**).',
      ],
    },
  ],

  source: {
    text: 'The Korea Herald | Korean holiday hit about a 1974 assassination draws fire from conservatives | By Moon Ki-hoon',
    url: 'https://www.koreaherald.com/article/10886459',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
