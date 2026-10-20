/**
 * 오피니언 SEO 페이지만 재생성
 */
import { API_BASE } from './loadEnv.js';
import { writeSeoPage } from './voca-seo.js';

const apiBase = (API_BASE || '').replace(/\/$/, '');

async function main() {
  const res = await fetch(`${apiBase}/opinions`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(60000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  const entries = Array.isArray(data.entries) ? data.entries : [];
  let n = 0;
  for (const entry of entries) {
    const slug = String(entry.slug || '').trim();
    const metaDescription = String(entry.metaDescription || '').trim();
    if (!slug || !metaDescription) continue;
    writeSeoPage('english-opinions', {
      title: entry.title,
      slug,
      metaDescription,
      datePublished: entry.date
        ? new Date(entry.date).toISOString().slice(0, 10)
        : undefined,
      message: entry.message || '',
    });
    n += 1;
  }
  console.log(`✅ english-opinions SEO ${n}개`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
