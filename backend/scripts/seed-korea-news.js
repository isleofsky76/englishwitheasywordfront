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
  category: '국방', // '국방' | '국제'

  title: '한미 연합훈련과 억제력',

  slug: 'korea-us-joint-drills-deterrence-sample',

  metaDescription:
    '한국 국방 관련 뉴스에서 추출한 문장 샘플. joint drills, deterrence, readiness, alliance.',

  password: 'password_seed_korea_news_joint_drills_sample',

  datePublished: '2026-09-06',

  intro: [
    '한미 연합훈련과 억제력을 다룬 기사에서 추출한 문장 샘플입니다. (양식 확인용)',
  ],

  words: [
    {
      narrative: [
        '1. 양국은 연합훈련을(**joint drills**) 통해 준비태세를 점검했습니다(**checked readiness**).',
      ],
    },
    {
      narrative: [
        '2. 당국은 억제력 강화가(**strengthening deterrence**) 동맹의 핵심이라고 밝혔습니다(**said it remains central to the alliance**).',
      ],
    },
    {
      narrative: [
        '3. 이번 훈련은 지역 안정을 위한(**for regional stability**) 정기적인 조치로 설명됐습니다(**was described as a routine measure**).',
      ],
    },
  ],

  source: {
    text: 'Sample | Korea News (Defense) seed',
    url: 'https://englisheasystudy.com/korea-news-list.html',
  },

  youtube: '',
};

// 국제 샘플을 올리려면 위 article 을 아래처럼 바꿔 실행하세요.
// const article = {
//   category: '국제',
//   title: '한반도 외교와 대화 모색',
//   slug: 'korea-diplomacy-dialogue-sample',
//   ...
// };

// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
