/**
 * 헬스뉴스 — JSON / text → HTML + sitemap
 *
 * JSON (seed-health-news.js):
 *   title, slug, metaDescription, password, datePublished
 *   intro[]
 *   words[] — title, narrative (서술형) 또는 title, word, example, phrases (카드형)
 *   source{text,url}, youtube
 *
 * 본문 HTML은 국제뉴스(news-voca)와 동일한 nv-* 마크업을 씁니다.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildNewsVocaMessage } from './news-voca-format.js';
import { applySeoAfterUpload, toIsoDateOnly, FRONTEND_ROOT } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEED_PATH = path.join(FRONTEND_ROOT || path.join(__dirname, '../..'), 'health-news', 'feed.json');

function upsertStaticFeed(entry) {
  fs.mkdirSync(path.dirname(FEED_PATH), { recursive: true });
  let feed = { entries: [] };
  try {
    if (fs.existsSync(FEED_PATH)) {
      feed = JSON.parse(fs.readFileSync(FEED_PATH, 'utf8'));
      if (!Array.isArray(feed.entries)) feed.entries = [];
    }
  } catch (_) {
    feed = { entries: [] };
  }
  const slug = entry.slug || '';
  feed.entries = feed.entries.filter((e) => e && e.slug !== slug);
  feed.entries.push({
    _id: entry._id || `static-${slug || Date.now()}`,
    title: entry.title,
    message: entry.message,
    slug: entry.slug || '',
    metaDescription: entry.metaDescription || '',
    date: entry.date || new Date().toISOString(),
    views: entry.views || 0,
    likes: entry.likes || 0,
    nickname: entry.nickname || 'admin',
    isSecret: false,
  });
  fs.writeFileSync(FEED_PATH, JSON.stringify(feed, null, 2), 'utf8');
  console.log(`  정적 피드: ${FEED_PATH}`);
  return FEED_PATH;
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
        '/health-news API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export function buildHealthNewsMessage(config) {
  return buildNewsVocaMessage({ ...config, sourceAtEnd: true });
}

export async function uploadHealthNews(config, apiBase) {
  const message = buildHealthNewsMessage(config);
  const sectionCount = (message.match(/nv-word-section/g) || []).length;
  const datePublished = config.datePublished || toIsoDateOnly();

  const post = {
    title: config.title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
  };

  console.log('헬스뉴스 업로드 중...', apiBase);
  if (/localhost|127\.0\.0\.1/.test(apiBase)) {
    console.warn(
      '  ⚠️ localhost에만 올라갑니다. englisheasystudy.com 에 반영하려면 .env 의 API_BASE 를 Cloudtype URL로 바꾸고 다시 실행하세요.'
    );
  }

  console.log(`  title: ${post.title}`);
  if (post.slug) console.log(`  slug: ${post.slug}`);
  console.log(`  words: ${sectionCount}`);

  const t0 = Date.now();
  const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

  if (config.slug) {
    console.log('  기존 글 삭제 중 (slug)...');
    try {
      const delRes = await fetch(`${apiBase}/health-news/delete-by-slug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ slug: config.slug, password: config.password }),
        signal: AbortSignal.timeout(60000),
      });
      const delData = await parseApiJson(delRes, 'POST /health-news/delete-by-slug');
      if (!delRes.ok) {
        throw new Error(delData.error || `HTTP ${delRes.status}`);
      }
      if (delData.deleted > 0) {
        console.log(`  기존 글 ${delData.deleted}개 삭제됨. (${elapsed()})`);
      } else {
        console.log(`  삭제할 기존 글 없음. (${elapsed()})`);
      }
    } catch (e) {
      if (/JSON이 아닌 응답|HTTP 404|404/.test(String(e.message || ''))) {
        console.warn('  ⚠️ delete-by-slug API 미배포 — 삭제 생략 후 SEO·정적 피드로 계속합니다.');
      } else {
        throw e;
      }
    }
  } else {
    console.log('  기존 글 삭제 중 (동일 비밀번호)...');
    try {
      await deleteMatchingEntries(apiBase, config);
    } catch (e) {
      if (/JSON이 아닌 응답|HTTP 404|404/.test(String(e.message || ''))) {
        console.warn('  ⚠️ 목록 API 미배포 — 삭제 생략.');
      } else {
        throw e;
      }
    }
  }

  const payloadKb = (JSON.stringify(post).length / 1024).toFixed(1);
  console.log(`  서버에 업로드 중... (${payloadKb} KB)`);

  let savedEntry = null;
  try {
    const res = await fetch(`${apiBase}/health-news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(post),
      signal: AbortSignal.timeout(180000),
    });

    if (res.status === 404) {
      console.warn(
        '  ⚠️ Cloudtype에 /health-news API가 아직 없습니다. SEO·정적 피드만 갱신합니다. 백엔드 재배포 후 다시 업로드하세요.'
      );
    } else {
      const data = await parseApiJson(res, 'POST /health-news');
      if (!res.ok) {
        console.log('  실패:', data.error || res.status);
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      savedEntry = data.entry || null;
      console.log(`  "${post.title}" 추가됨 (${elapsed()})`);
    }
  } catch (e) {
    if (/JSON이 아닌 응답|HTTP 404|404/.test(String(e.message || ''))) {
      console.warn('  ⚠️ API 업로드 생략:', e.message);
    } else {
      throw e;
    }
  }

  const seo = applySeoAfterUpload('health-news', {
    title: config.title,
    slug: config.slug,
    metaDescription: config.metaDescription,
    datePublished,
    message: post.message,
  });
  if (seo) {
    if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
    console.log(`  sitemap: ${seo.sitemapPath}`);
    console.log(`  URL: ${seo.url}`);
  }

  upsertStaticFeed({
    _id: savedEntry?._id,
    title: config.title,
    message: post.message,
    slug: config.slug,
    metaDescription: config.metaDescription,
    date: datePublished,
    views: savedEntry?.views || 0,
    likes: savedEntry?.likes || 0,
    nickname: post.nickname,
  });
}

async function deleteMatchingEntries(apiBase, config) {
  const listRes = await fetch(`${apiBase}/health-news`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /health-news');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    const sameSlug = config.slug && entry.slug === config.slug;
    if (config.slug && !sameSlug) continue;
    try {
      const delRes = await fetch(`${apiBase}/health-news-deletepost`, {
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
