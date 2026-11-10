/**
 * 빈 목록 페이지: AdSense 제거 + 홈 리디렉션 (AdSense 빈 페이지 정책)
 *
 *   cd backend
 *   node scripts/strip-empty-list-ads.js
 */
import fs from 'fs';
import path from 'path';
import { FRONTEND_ROOT } from './voca-seo.js';

/** 글 0건인 보드 목록 — 광고 금지 · 홈으로 보냄 */
const EMPTY_LIST_PAGES = [
  'health-news-list.html',
  'weather-news-list.html',
  'literature-news-list.html',
  'politics-news-list.html',
  'ai-news-list.html',
  'incident-news-list.html',
  'retail-news-list.html',
  'ukraine-news-list.html',
];

function redirectHtml(title) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} · 시사영단어</title>
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0;url=/">
  <link rel="canonical" href="https://englisheasystudy.com/">
  <script>location.replace('/');</script>
</head>
<body>
  <p>게시글이 없어 홈으로 이동합니다. <a href="/">홈으로</a></p>
</body>
</html>
`;
}

const TITLE_MAP = {
  'health-news-list.html': '건강 뉴스',
  'weather-news-list.html': '날씨/환경 뉴스',
  'literature-news-list.html': '문학 뉴스',
  'politics-news-list.html': '정치 뉴스',
  'ai-news-list.html': '인공지능 뉴스',
  'incident-news-list.html': '사건사고 뉴스',
  'retail-news-list.html': '유통 뉴스',
  'ukraine-news-list.html': '우크라이나/러시아 뉴스',
};

function main() {
  let n = 0;
  for (const file of EMPTY_LIST_PAGES) {
    const filePath = path.join(FRONTEND_ROOT, file);
    if (!fs.existsSync(filePath)) {
      console.warn('  skip missing', file);
      continue;
    }
    fs.writeFileSync(filePath, redirectHtml(TITLE_MAP[file] || file), 'utf8');
    console.log('  ✅', file, '→ home redirect (no AdSense)');
    n++;
  }
  console.log(`완료: ${n}개`);
}

main();
