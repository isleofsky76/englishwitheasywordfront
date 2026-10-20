/**
 * 여행뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-travel-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadTravelNews } from './travel-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '여행 뉴스 제목을 입력하세요',

  slug: 'travel-sample-related-words',

  metaDescription:
    '여행·관광 관련 시사 영단어. 아래에 단어·예문을 채워 업로드하세요.',

  password: 'seed_travel_sample-related-words',

  datePublished: '2026-10-20',

  intro: [
    '여행·관광 영문 기사에서 뽑은 시사 영단어를 정리합니다. 이 샘플을 실제 기사 내용으로 바꾼 뒤 업로드하세요.',
  ],

  words: [
    {
      narrative: [
        '1. 샘플 문장에 핵심 표현을(**sample**) 넣으세요. cf. sample: 샘플',
      ],
    },
  ],

  source: {
    text: '출처 매체 | 기사 제목 | By Author',
    url: 'https://example.com',
  },

  youtube: '',
};
// ===============================

uploadTravelNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
