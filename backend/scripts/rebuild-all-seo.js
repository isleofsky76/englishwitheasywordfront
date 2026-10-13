/**
 * 전체 게시판 SEO 페이지 + sitemap 재생성
 *
 * slug·metaDescription 있는 글 → /{board}/{slug}/index.html
 *
 * 사용법:
 *   cd backend
 *   node scripts/rebuild-all-seo.js
 *
 * 생성 위치: 저장소 루트 (SITE_ROOT 미설정 시 C:\langchain)
 */
import { API_BASE } from './loadEnv.js';
import { writeNewsVocaSeoPage } from './news-voca-format.js';
import {
  BOARD_API_ENDPOINTS,
  FRONTEND_ROOT,
  rebuildSitemapFromApi,
  SITE_ORIGIN,
  writeSeoPage,
} from './voca-seo.js';

const apiBase = (API_BASE || '').replace(/\/$/, '');

function entryDate(entry) {
  if (!entry?.date) return undefined;
  const d = new Date(entry.date);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}

async function main() {
  console.log(`전체 SEO 페이지 재생성... API: ${apiBase}`);
  console.log(`출력 경로: ${FRONTEND_ROOT}`);

  let totalPages = 0;

  for (const { apiPath, boardPath, label } of BOARD_API_ENDPOINTS) {
    const res = await fetch(`${apiBase}${apiPath}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(120000),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`${apiPath}: ${data.error || `HTTP ${res.status}`}`);

    const entries = Array.isArray(data.entries) ? data.entries : [];
    let written = 0;
    let skipped = 0;

    for (const entry of entries) {
      const slug = String(entry.slug || '').trim();
      const metaDescription = String(entry.metaDescription || '').trim();
      if (!slug || !metaDescription) {
        skipped++;
        continue;
      }

      const config = {
        title: entry.title,
        slug,
        metaDescription,
        datePublished: entryDate(entry),
        message: entry.message || '',
      };

      if (boardPath === 'news-voca') {
        writeNewsVocaSeoPage(config);
      } else {
        writeSeoPage(boardPath, config);
      }
      written++;
    }

    totalPages += written;
    console.log(`  ${label}: SEO ${written}개 (slug/meta 없음 ${skipped}개 건너뜀)`);
  }

  const { sitemapPath, urlCount, counts } = await rebuildSitemapFromApi(apiBase);

  console.log(`\n✅ SEO 페이지 총 ${totalPages}개`);
  console.log(`✅ ${sitemapPath} — URL ${urlCount}개`);
  console.log('   게시판별 slug:', counts);
  console.log(`\n다음: git push (main 브랜치) 후 ${SITE_ORIGIN}/sitemap.xml 확인`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
