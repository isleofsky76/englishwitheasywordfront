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
  title: '두 살 전 스마트폰 시작, 영유아 절반',

  slug: 'toddlers-under-2-smartphone-use-mind-survey-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 만 2세 미만 스마트폰 시작 조사 관련 문장. before turning two, 50.98 percent, 12 to 23 months, younger age, no sedentary screen time.',

  password: 'password_seed_toddlers_under_2_smartphones_koreaherald',

  datePublished: '2026-09-28',

  intro: [
    '만 5세 미만 아동의 절반 이상이 두 돌 전에 스마트폰을 쓰기 시작했다는 국립정신건강센터 조사 결과를 전한 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 국립정신건강센터 정신건강연구소의 MIND 보고서는 2~5세 한국 아동 400명의 부모를 조사했고(**surveyed the parents of 400 Korean children aged 2 to 5**), 만 5세 미만의 절반 이상이 두 돌 전에 스마트폰을 쓰기 시작했다고 밝혔습니다(**More than half of children under five began using smartphones before turning two**).',
      ],
    },
    {
      narrative: [
        '2. 12~23개월에 시작했다는 응답이 37.18%로 가장 많았고(**began using smartphones at 12 to 23 months old**), 0~11개월은 13.8%여서 두 살 전 시작이 50.98%였습니다(**50.98 percent began using smartphones before turning two**).',
      ],
    },
    {
      narrative: [
        '3. 스마트폰 사용 고위험군 어머니의 자녀는 저위험군 어머니의 자녀보다 더 어린 나이에 스마트폰을 시작하는 경향이 있었고(**tended to start using smartphones at a younger age**), 세계보건기구 2019년 지침은 만 2세 미만에게 앉아서 하는 화면 시청을 하지 말 것을 권합니다(**no sedentary screen time for children under two**).',
      ],
    },
  ],

  source: {
    text: 'The Korea Herald | More toddlers under 2 start to use smartphones | By Hwang Sun-jun',
    url: 'https://www.koreaherald.com/article/10886387',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
