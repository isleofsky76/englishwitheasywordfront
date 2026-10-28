/**
 * nv-narrative 국방뉴스 SEO defense-news.js 버전 패치만 수행.
 * 복습 퀴즈 자동 생성은 하지 않음 (연관단어 퀴즈만 유지).
 *
 *   cd backend && node scripts/sync-defense-review-quizzes.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE } from './loadEnv.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DEFENSE_DIR = path.join(ROOT, 'defense-news');
const JS_VER = '20261020rd15';

function patchSeoJsVersion(slug) {
  const file = path.join(DEFENSE_DIR, slug, 'index.html');
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, 'utf8');
  if (!/nv-narrative/.test(html)) return false;
  const next = html.replace(
    /defense-news\.js\?v=[^"']+/g,
    `defense-news.js?v=${JS_VER}`
  );
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    return true;
  }
  return false;
}

async function main() {
  const listRes = await fetch(`${API_BASE}/defense-news`, {
    headers: { Accept: 'application/json' },
  });
  const listData = await listRes.json();
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  let patched = 0;
  for (const entry of entries) {
    const slug = String(entry.slug || '').trim();
    const message = String(entry.message || '');
    if (!slug || !/nv-narrative/.test(message)) continue;
    if (patchSeoJsVersion(slug)) {
      patched += 1;
      console.log(`  SEO js: ${slug}`);
    }
  }

  if (fs.existsSync(DEFENSE_DIR)) {
    for (const name of fs.readdirSync(DEFENSE_DIR)) {
      if (patchSeoJsVersion(name)) {
        patched += 1;
        console.log(`  SEO js (local): ${name}`);
      }
    }
  }

  console.log(`완료. SEO patched=${patched} (퀴즈 생성 없음)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
