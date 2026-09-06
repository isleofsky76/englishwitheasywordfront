/**
 * 한국뉴스 — JSON → HTML + sitemap
 * 국방뉴스와 동일 마크업(nv-*), category: '국방' | '국제'
 */
import { buildNewsVocaMessage } from './news-voca-format.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
        '/korea-news API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

function normalizeCategory(cat) {
  return cat === '국방' || cat === '국제' ? cat : '';
}

function withCategoryTitle(title, category) {
  const t = String(title || '').trim();
  const cat = normalizeCategory(category);
  if (!cat) return t;
  if (/^\[(국방|국제)\]/.test(t)) return t;
  return `[${cat}] ${t}`;
}

export function buildKoreaNewsMessage(config) {
  return buildNewsVocaMessage({ ...config, sourceAtEnd: true });
}

export async function uploadKoreaNews(config, apiBase) {
  const category = normalizeCategory(config.category);
  const title = withCategoryTitle(config.title, category);
  const message = buildKoreaNewsMessage(config);
  const sectionCount = (message.match(/nv-word-section/g) || []).length;
  const datePublished = config.datePublished || toIsoDateOnly();

  const post = {
    title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
    category,
  };

  console.log('한국뉴스 업로드 중...', apiBase);
  if (/localhost|127\.0\.0\.1/.test(apiBase)) {
    console.warn(
      '  ⚠️ localhost에만 올라갑니다. englisheasystudy.com 에 반영하려면 .env 의 API_BASE 를 Cloudtype URL로 바꾸고 다시 실행하세요.'
    );
  }

  console.log(`  title: ${post.title}`);
  if (post.category) console.log(`  category: ${post.category}`);
  if (post.slug) console.log(`  slug: ${post.slug}`);
  console.log(`  words: ${sectionCount}`);

  const t0 = Date.now();
  const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

  if (config.slug) {
    console.log('  기존 글 삭제 중 (slug)...');
    try {
      const delRes = await fetch(`${apiBase}/korea-news/delete-by-slug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ slug: config.slug, password: config.password }),
        signal: AbortSignal.timeout(60000),
      });
      const delData = await parseApiJson(delRes, 'POST /korea-news/delete-by-slug');
      if (!delRes.ok) {
        throw new Error(delData.error || `HTTP ${delRes.status}`);
      }
      if (delData.deleted > 0) {
        console.log(`  기존 글 ${delData.deleted}개 삭제됨. (${elapsed()})`);
      } else {
        console.log(`  삭제할 기존 글 없음. (${elapsed()})`);
      }
    } catch (e) {
      if (/JSON이 아닌 응답/.test(e.message)) {
        console.warn('  ⚠️ delete-by-slug API 미배포 — 목록에서 같은 slug를 찾아 삭제합니다.');
        await deleteMatchingEntries(apiBase, config);
      } else {
        throw e;
      }
    }
  } else {
    console.log('  기존 글 삭제 중 (동일 비밀번호)...');
    await deleteMatchingEntries(apiBase, config);
  }

  const payloadKb = (JSON.stringify(post).length / 1024).toFixed(1);
  console.log(`  서버에 업로드 중... (${payloadKb} KB)`);

  const res = await fetch(`${apiBase}/korea-news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
    signal: AbortSignal.timeout(180000),
  });

  const data = await parseApiJson(res, 'POST /korea-news');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  console.log(`  "${post.title}" 추가됨 (${elapsed()})`);

  const seo = applySeoAfterUpload('korea-news', {
    title: post.title,
    slug: config.slug,
    metaDescription: config.metaDescription,
    datePublished,
  });
  if (seo) {
    if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
    console.log(`  sitemap: ${seo.sitemapPath}`);
    console.log(`  URL: ${seo.url}`);
  }
}

async function deleteMatchingEntries(apiBase, config) {
  const listRes = await fetch(`${apiBase}/korea-news`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /korea-news');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    const sameSlug = config.slug && entry.slug === config.slug;
    if (config.slug && !sameSlug) continue;
    try {
      const delRes = await fetch(`${apiBase}/korea-news-deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password: config.password }),
      });
      if (delRes.ok) deleted++;
    } catch (_) {}
  }
  if (deleted > 0) console.log(`  기존 글 ${deleted}개 삭제됨.`);
  else console.log('  삭제할 기존 글 없음.');
}
