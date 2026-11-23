/**
 * 영어 명언 전체 동기화 (DB + SEO)
 *
 *   cd C:\langchain\backend
 *   node scripts/sync-englishquotes-from-seed.js
 *
 * english-quotes-seed.json 기준으로:
 * 1) 같은 title/slug 글 삭제 후 DB 재등록
 * 2) /english-quotes/{slug}/ SEO HTML + sitemap 갱신
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SEED_PATH = path.join(__dirname, 'english-quotes-seed.json');
const API_PATH = '/english-quotes';
const BOARD_PATH = 'english-quotes';

async function deleteMatching({ title, slug, password }) {
  const listRes = await fetch(`${API_BASE}${API_PATH}`);
  const listData = await listRes.json();
  const list = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  const targets = list.filter(
    (e) => e?._id && (e.title === title || (slug && e.slug === slug))
  );

  let deleted = 0;
  for (const e of targets) {
    const delRes = await fetch(`${API_BASE}${API_PATH}/deletepost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e._id, password }),
    });
    if (delRes.ok) {
      deleted += 1;
      console.log(`  삭제: "${e.title}"`);
    } else {
      const err = await delRes.json().catch(() => ({}));
      console.log(`  삭제 실패: "${e.title}"`, err.error || delRes.status);
    }
  }
  return deleted;
}

async function upsertOne(entry) {
  const {
    title,
    message,
    nickname = 'admin',
    password,
    isSecret = false,
    slug,
    metaDescription,
    datePublished,
  } = entry;

  console.log(`\n→ ${slug || title}`);
  await deleteMatching({ title, slug, password });

  const res = await fetch(`${API_BASE}${API_PATH}`, {
    method: 'POST',
    headers: writeAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({ title, message, nickname, password, isSecret, slug, metaDescription }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.log('  DB 실패:', data.error || res.status);
    return false;
  }
  console.log('  DB 등록:', title);

  if (slug && metaDescription) {
    const seo = applySeoAfterUpload(BOARD_PATH, {
      title,
      slug,
      metaDescription,
      datePublished: datePublished || toIsoDateOnly(),
      message,
    });
    if (seo?.seoPath) console.log('  SEO:', seo.seoPath);
    if (seo?.url) console.log('  URL:', seo.url);
    else console.log(`  URL: ${SITE_ORIGIN}/${BOARD_PATH}/${encodeURIComponent(slug)}/`);
  }
  return true;
}

async function run() {
  if (!fs.existsSync(SEED_PATH)) {
    console.error('시드 없음:', SEED_PATH);
    process.exit(1);
  }
  const entries = JSON.parse(fs.readFileSync(SEED_PATH, 'utf8'));
  if (!Array.isArray(entries) || !entries.length) {
    console.error('시드가 비어 있습니다.');
    process.exit(1);
  }

  console.log('영어 명언 전체 동기화', API_BASE, `(${entries.length}건)`);
  let ok = 0;
  for (const entry of entries) {
    if (await upsertOne(entry)) ok += 1;
  }
  console.log(`\n완료: ${ok}/${entries.length}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
