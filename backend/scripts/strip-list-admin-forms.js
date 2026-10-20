/**
 * 공개 목록 HTML에서 글쓰기/수정 폼 마크업 제거 + admin-list-forms.js 연결
 *
 *   cd backend
 *   node scripts/strip-list-admin-forms.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '..');

const LIST_FILES = [
  'news-voca-list.html',
  'defense-news-list.html',
  'economy-news-list.html',
  'travel-news-list.html',
  'korea-news-list.html',
  'cooking-voca-list.html',
  'culture-voca-list.html',
  'english-synonym-list.html',
  'english-opinions-list.html',
  'english-quotes-list.html',
  'calm-mind-list.html',
  'shorts-bg-image-list.html',
  'ranking-news-list.html',
  'popular-voca-list.html',
  'situational-english-list.html',
  'pros-cons-list.html',
  'photo-english-list.html',
  'word-of-the-day-list.html',
];

const ADMIN_SCRIPT = '<script src="admin-list-forms.js?v=20261013a"></script>';

function stripById(html, id) {
  const openRe = new RegExp(
    `<div[^>]*\\bid=["']${id}["'][^>]*>`,
    'i'
  );
  const m = openRe.exec(html);
  if (!m) return html;
  const start = m.index;
  let i = start + m[0].length;
  let depth = 1;
  while (i < html.length && depth > 0) {
    const nextOpen = html.indexOf('<div', i);
    const nextClose = html.indexOf('</div>', i);
    if (nextClose === -1) break;
    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth++;
      i = nextOpen + 4;
    } else {
      depth--;
      i = nextClose + 6;
    }
  }
  return html.slice(0, start) + html.slice(i);
}

function ensureAdminScript(html) {
  if (html.includes('admin-list-forms.js')) return html;
  // bootstrap 직전 또는 body 끝 직전
  if (html.includes('bootstrap.bundle.min.js')) {
    return html.replace(
      /(<script[^>]*bootstrap\.bundle\.min\.js[^>]*><\/script>)/i,
      `${ADMIN_SCRIPT}\n    $1`
    );
  }
  return html.replace(/<\/body>/i, `    ${ADMIN_SCRIPT}\n</body>`);
}

function processFile(rel) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.log(`  skip (없음): ${rel}`);
    return;
  }
  let html = fs.readFileSync(filePath, 'utf8');
  const before = html.length;
  for (const id of [
    'write-post-modal',
    'edit-post-modal',
    'write-post-container',
    'edit-post-container',
  ]) {
    html = stripById(html, id);
  }
  // 주석 잔여 정리
  html = html.replace(/\s*<!--\s*Write Post Modal\s*-->\s*/gi, '\n');
  html = html.replace(/\s*<!--\s*기존 컨테이너는 숨김[^>]*-->\s*/gi, '\n');
  html = ensureAdminScript(html);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`  ✅ ${rel} (${before} → ${html.length} bytes)`);
}

console.log('목록 페이지 관리자 폼 제거…');
for (const f of LIST_FILES) processFile(f);
console.log('완료. 관리자: 목록 URL에 ?admin=1 추가');
