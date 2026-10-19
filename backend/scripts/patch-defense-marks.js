/**
 * narrative 본문의 괄호 영어(mark 누락)를 <mark>로 감싸 API+SEO 갱신
 *   node scripts/patch-defense-marks.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE, getSeedPassword, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFENSE_DIR = path.resolve(__dirname, '../../defense-news');
const JS_VER = '20261020rd14';

function wrapParenEnglish(html) {
  return String(html || '').replace(
    /\((?!<mark)([A-Za-z][A-Za-z0-9'/.\s-]{0,80})\)/g,
    (full, word) => {
      const w = word.replace(/\s+/g, ' ').trim();
      if (!w || /^[A-Z0-9]{2,6}$/.test(w)) return full; /* THAAD 유지 */
      return `(<mark class="nv-hl nv-hl--soft">${w}</mark>)`;
    }
  );
}

async function tryUpdate(entry, message, passwords) {
  for (const password of passwords) {
    const res = await fetch(`${API_BASE}/defense-news-updatepost`, {
      method: 'POST',
      headers: writeAuthHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' }),
      body: JSON.stringify({
        id: entry._id,
        password,
        title: entry.title,
        message,
        nickname: entry.nickname || 'admin',
        isSecret: !!entry.isSecret,
        slug: entry.slug,
        metaDescription: entry.metaDescription || '',
      }),
    });
    if (res.ok) return password;
  }
  return null;
}

async function main() {
  const seedPwd = getSeedPassword();
  const listRes = await fetch(`${API_BASE}/defense-news`, { headers: { Accept: 'application/json' } });
  const listData = await listRes.json();
  const entries = listData.entries || listData.data || [];

  for (const entry of entries) {
    const slug = String(entry.slug || '');
    const message = String(entry.message || '');
    if (!slug || !/nv-narrative/.test(message)) continue;

    const next = wrapParenEnglish(message);
    if (next === message) continue;

    const passwords = [
      `seed_defense_${slug}`,
      seedPwd,
      process.env.SEED_WORD_PASSWORD,
      process.env.SEED_PASSWORD_DELIBERATE,
    ].filter(Boolean);

    const used = await tryUpdate(entry, next, passwords);
    if (!used) {
      console.warn(`  update fail (password): ${slug}`);
      continue;
    }
    console.log(`  API ok: ${slug}`);

    applySeoAfterUpload('defense-news', {
      title: entry.title,
      slug,
      metaDescription: entry.metaDescription || '',
      datePublished: toIsoDateOnly(entry.date ? new Date(entry.date) : undefined),
      message: next,
    });

    const seoFile = path.join(DEFENSE_DIR, slug, 'index.html');
    if (fs.existsSync(seoFile)) {
      let html = fs.readFileSync(seoFile, 'utf8');
      html = html.replace(/defense-news\.js\?v=[^"']+/g, `defense-news.js?v=${JS_VER}`);
      fs.writeFileSync(seoFile, html, 'utf8');
    }
  }
  console.log('완료.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
