/**
 * 게시판 공통 SEO — 정적 페이지, sitemap
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 운영 사이트(main)는 저장소 루트에 배포. SITE_ROOT 환경변수로 경로 지정 가능.
export const FRONTEND_ROOT = process.env.SITE_ROOT
  ? path.resolve(process.env.SITE_ROOT)
  : path.join(__dirname, '..', '..');
export const SITE_ORIGIN = 'https://englisheasystudy.com';

export const BOARD_SEO = {
  'news-voca': {
    label: 'News Voca',
    cssFile: 'news-voca.css',
    cssVersion: '20260622a',
    jsFile: 'news-voca.js',
    jsVersion: '20260622a',
    listHtml: 'news-voca-list.html',
  },
  'cooking-voca': {
    label: 'Cooking Voca',
    cssFile: 'cooking-voca.css',
    cssVersion: '20260622a',
    jsFile: 'cooking-voca.js',
    jsVersion: '20260622a',
    listHtml: 'cooking-voca-list.html',
  },
  'culture-voca': {
    label: 'Culture Voca',
    cssFile: 'culture-voca.css',
    cssVersion: '20260622a',
    jsFile: 'culture-voca.js',
    jsVersion: '20260622a',
    listHtml: 'culture-voca-list.html',
  },
  'ranking-news': {
    label: 'Ranking News',
    cssFile: 'ranking-news.css',
    cssVersion: '20260622a',
    jsFile: 'page30_viewpost_ranking_news.js',
    jsVersion: '20260622a',
    listHtml: 'ranking-news-list.html',
  },
  'popular-voca': {
    label: 'Popular Voca',
    cssFile: 'page30_viewpost_v.css',
    cssVersion: '20260628',
    jsFile: 'page30_viewpost_v_easy.js',
    jsVersion: '20260622a',
    listHtml: 'popular-voca-list.html',
  },
  'word-of-the-day': {
    label: 'Word of the Day',
    cssFile: 'page30_viewpost_wordofday.css',
    cssVersion: '20260611a',
    jsFile: 'page30_viewpost_wordofday.js',
    jsVersion: '20260720c',
    listHtml: 'word-of-the-day-list.html',
  },
};

export function toIsoDateOnly(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildArticleJsonLd({ title, slug, boardPath, metaDescription, datePublished }) {
  const headline = String(title || '').replace(/^\[(AP|CNN|BBC)\]\s*/i, '').trim();
  const pageUrl = `${SITE_ORIGIN}/${boardPath}/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: metaDescription,
    author: { '@type': 'Organization', name: 'English Easy Study' },
    publisher: { '@type': 'Organization', name: 'English Easy Study', url: SITE_ORIGIN },
    datePublished: datePublished || toIsoDateOnly(),
    dateModified: datePublished || toIsoDateOnly(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: ['ko', 'en'],
  };
}

export function buildSeoPageHtml(boardPath, config) {
  const board = BOARD_SEO[boardPath];
  if (!board) throw new Error(`Unknown boardPath: ${boardPath}`);

  const { title, slug, metaDescription } = config;
  const pageUrl = `${SITE_ORIGIN}/${boardPath}/${slug}`;
  const datePublished = config.datePublished || toIsoDateOnly();
  const docTitle = `${title} | ${board.label} · English Easy Study`;
  const jsonLd = buildArticleJsonLd({ title, slug, boardPath, metaDescription, datePublished });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(docTitle)}</title>
    <meta name="description" content="${escapeHtml(metaDescription)}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="English Easy Study">
    <link rel="canonical" href="${escapeHtml(pageUrl)}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="English Easy Study">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(metaDescription)}">
    <meta property="og:url" content="${escapeHtml(pageUrl)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
    <meta name="google-adsense-account" content="ca-pub-6108574897789788">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108574897789788" crossorigin="anonymous"></script>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../page30_viewpost.css?v=20260628">
    <link rel="stylesheet" href="../../${board.cssFile}?v=${board.cssVersion}">
    <link rel="stylesheet" href="../../title-text-sharp.css?v=20260610">
    <link rel="stylesheet" href="../../viewpost-like.css?v=20260625">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260617">
    <link rel="stylesheet" href="../../navbar-unified.css?v=20260612c">
    <link rel="stylesheet" href="../../weather-banner.css?v=20260612g">
    <link rel="stylesheet" href="../../world-clock.css?v=20260612g">
</head>
<body data-nv-slug="${escapeHtml(slug)}" data-nv-board="${escapeHtml(boardPath)}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="주 메뉴">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../${board.listHtml}">${escapeHtml(board.label)}</a>
            <div data-nav-home-menu class="nav-home-menu-slot ms-auto"></div>
        </div>
    </nav>
    <main id="post-container" role="main">
        <header id="post-header">
            <h1 id="post-title"></h1>
            <p id="post-meta"></p>
        </header>
        <article id="post-content">
            <div id="post-message" class="post-message-body"></div>
        </article>
    </main>
    <script src="../../page30-api-config.js"></script>
    <script src="../../viewpost-seo.js?v=20260622a"></script>
    <script src="../../viewpost-meta.js?v=20260627"></script>
    <script src="../../viewpost-like.js?v=20260627"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../nav-home-menu.js?v=20260720a"></script>
    <script src="../../${board.jsFile}?v=${board.jsVersion}"></script>
    <script src="../../weather-banner.js?v=20260612e" defer></script>
    <script src="../../world-clock.js?v=20260612g" defer></script>
</body>
</html>
`;
}

export function writeSeoPage(boardPath, config) {
  const slug = config.slug;
  if (!slug) return null;
  const dir = path.join(FRONTEND_ROOT, boardPath, slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, buildSeoPageHtml(boardPath, config), 'utf8');
  return filePath;
}

const BOARD_HTML = {
  'news-voca': 'news-voca.html',
  'cooking-voca': 'cooking-voca.html',
  'culture-voca': 'culture-voca.html',
  'ranking-news': 'ranking-news.html',
  'english-synonym': 'english-synonym.html',
  'popular-voca': 'popular-voca.html',
  'situational-english': 'situational-english.html',
  'pros-cons': 'pros-cons.html',
  'word-of-the-day': 'word-of-the-day.html',
  'photo-english': 'photo-english.html',
};

/** API 경로 → sitemap boardPath (slug 있는 글만 수집) */
export const BOARD_API_ENDPOINTS = [
  { apiPath: '/guestbook', boardPath: 'news-voca', label: '뉴스 어휘' },
  { apiPath: '/wordofday', boardPath: 'word-of-the-day', label: '오늘의 단어장' },
  { apiPath: '/photo-english', boardPath: 'photo-english', label: '사진 영어' },
  { apiPath: '/ranking-news', boardPath: 'ranking-news', label: '랭킹 뉴스' },
  { apiPath: '/cooking-voca', boardPath: 'cooking-voca', label: '요리 어휘' },
  { apiPath: '/culture-voca', boardPath: 'culture-voca', label: '컬쳐 어휘' },
  { apiPath: '/vocabulary', boardPath: 'english-synonym', label: '유의어' },
  { apiPath: '/easy-voca', boardPath: 'popular-voca', label: '인기 어휘' },
  { apiPath: '/situational-english', boardPath: 'situational-english', label: '상황별 영어' },
  { apiPath: '/pros-cons', boardPath: 'pros-cons', label: '장단점' },
];

/** slug별 고유 canonical이 있는 정적 SEO 경로 (/board/slug/) */
const BOARD_SITEMAP_PATH = new Set([
  'news-voca',
  'cooking-voca',
  'culture-voca',
  'ranking-news',
  'english-synonym',
  'popular-voca',
  'situational-english',
  'pros-cons',
  'word-of-the-day',
  'photo-english',
]);

export function sitemapUrlForSlug(boardPath, slug) {
  if (BOARD_SITEMAP_PATH.has(boardPath)) {
    return `${SITE_ORIGIN}/${boardPath}/${encodeURIComponent(slug)}/`;
  }
  const html = BOARD_HTML[boardPath] || `${boardPath}.html`;
  return `${SITE_ORIGIN}/${html}?slug=${encodeURIComponent(slug)}`;
}

const SITEMAP_STATIC_URLS = [
  { loc: `${SITE_ORIGIN}/`, priority: '1.0' },
  { loc: `${SITE_ORIGIN}/index.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/news-voca-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/cooking-voca-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/culture-voca-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/ranking-news-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/english-synonym-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/popular-voca-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/situational-english-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/pros-cons-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/word-of-the-day-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/photo-english-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/vocabulary-quiz.html`, priority: '0.8' },
];

function entryLastmod(entry) {
  if (entry?.date) {
    const d = new Date(entry.date);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return toIsoDateOnly();
}

function readExistingSitemapUrls() {
  const sitemapPath = path.join(FRONTEND_ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return [];

  const raw = fs.readFileSync(sitemapPath, 'utf8');
  const re = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g;
  const existing = [];
  let m;
  while ((m = re.exec(raw)) !== null) {
    existing.push({ loc: m[1], lastmod: m[2] });
  }
  return existing;
}

function buildSitemapUrlMap({ slugEntries = [], preserveExisting = true } = {}) {
  const entries = Array.isArray(slugEntries) ? slugEntries : [slugEntries];
  const byLoc = new Map();

  for (const u of SITEMAP_STATIC_URLS) {
    byLoc.set(u.loc, { loc: u.loc, lastmod: toIsoDateOnly(), priority: u.priority });
  }
  if (preserveExisting) {
    for (const e of readExistingSitemapUrls()) {
      if (!byLoc.has(e.loc)) byLoc.set(e.loc, { ...e, priority: e.priority || '0.7' });
    }
  }
  for (const e of entries) {
    if (!e?.slug) continue;
    const loc = sitemapUrlForSlug(e.boardPath || 'news-voca', e.slug);
    byLoc.set(loc, {
      loc,
      lastmod: e.lastmod || toIsoDateOnly(),
      priority: e.priority || '0.8',
    });
  }

  return byLoc;
}

function writeSitemapFile(byLoc) {
  const sitemapPath = path.join(FRONTEND_ROOT, 'sitemap.xml');
  const urls = [...byLoc.values()].sort((a, b) => a.loc.localeCompare(b.loc));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>
`;
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  return { sitemapPath, urlCount: urls.length };
}

export async function fetchAllSlugEntries(apiBase) {
  const slugEntries = [];
  const counts = {};

  for (const { apiPath, boardPath, label } of BOARD_API_ENDPOINTS) {
    const res = await fetch(`${apiBase}${apiPath}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(120000),
    });
    const ct = res.headers.get('content-type') || '';
    const text = await res.text();
    if (!ct.includes('application/json')) {
      throw new Error(`${apiPath}: JSON이 아닌 응답 (HTTP ${res.status})`);
    }
    const data = JSON.parse(text);
    if (!res.ok) {
      throw new Error(`${apiPath}: ${data.error || `HTTP ${res.status}`}`);
    }

    const entries = Array.isArray(data.entries) ? data.entries : [];
    const withSlug = entries.filter((e) => String(e.slug || '').trim());
    counts[label] = withSlug.length;

    for (const entry of withSlug) {
      slugEntries.push({
        boardPath,
        slug: String(entry.slug).trim(),
        lastmod: entryLastmod(entry),
      });
    }
  }

  return { slugEntries, counts };
}

/** API에서 slug 있는 글 전체를 읽어 sitemap.xml을 처음부터 재생성 */
export async function rebuildSitemapFromApi(apiBase) {
  const { slugEntries, counts } = await fetchAllSlugEntries(apiBase);
  const byLoc = buildSitemapUrlMap({ slugEntries, preserveExisting: false });
  const { sitemapPath, urlCount } = writeSitemapFile(byLoc);
  return { sitemapPath, urlCount, slugCount: slugEntries.length, counts };
}

export function updateSitemap(slugEntries) {
  const byLoc = buildSitemapUrlMap({ slugEntries, preserveExisting: true });
  const { sitemapPath } = writeSitemapFile(byLoc);
  return sitemapPath;
}

export function applySeoAfterUpload(boardPath, config) {
  if (!config.slug || !config.metaDescription) return null;
  const seoPath = BOARD_SEO[boardPath]
    ? writeSeoPage(boardPath, {
        title: config.title,
        slug: config.slug,
        metaDescription: config.metaDescription,
        datePublished: config.datePublished || toIsoDateOnly(),
      })
    : null;
  const sitemapPath = updateSitemap({
    boardPath,
    slug: config.slug,
    lastmod: config.datePublished || toIsoDateOnly(),
  });
  return { sitemapPath, seoPath, url: sitemapUrlForSlug(boardPath, config.slug) };
}
