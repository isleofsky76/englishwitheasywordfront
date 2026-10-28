/**
 * 문학뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-literature-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadLiteratureNews } from './literature-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '',

  slug: '',

  metaDescription: '',

  password: 'seed_literature-news_',

  datePublished: '2026-10-28',

  intro: [
    '',
  ],

  words: [
    {
      narrative: [
        '1. ',
      ],
    },
  ],

  source: {
    text: '',
    url: '',
  },

  youtube: '',
};
// ===============================

uploadLiteratureNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
