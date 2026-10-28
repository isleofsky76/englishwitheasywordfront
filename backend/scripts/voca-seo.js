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
    cssVersion: '20261020rd21',
    jsFile: 'news-voca.js',
    jsVersion: '20261020auto2',
    listHtml: 'news-voca-list.html',
  },
  'cooking-voca': {
    label: 'Cooking Voca',
    cssFile: 'cooking-voca.css',
    cssVersion: '20260622a',
    jsFile: 'cooking-voca.js',
    jsVersion: '20260903d',
    listHtml: 'cooking-voca-list.html',
  },
  'culture-voca': {
    label: 'Culture Voca',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'culture-voca.js',
    jsVersion: '20261020auto2',
    listHtml: 'culture-voca-list.html',
    extraCss: [{ file: 'culture-voca.css', version: '20260617' }],
  },
  'defense-news': {
    label: '국방뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'defense-news.js',
    jsVersion: '20261020auto2',
    listHtml: 'defense-news-list.html',
  },
  'economy-news': {
    label: '경제뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'economy-news.js',
    jsVersion: '20261020feed1',
    listHtml: 'economy-news-list.html',
  },
  'travel-news': {
    label: '여행뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'travel-news.js',
    jsVersion: '20261020travel2',
    listHtml: 'travel-news-list.html',
  },
  'sports-news': {
    label: '스포츠뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'sports-news.js',
    jsVersion: '20261028sports1',
    listHtml: 'sports-news-list.html',
  },
  'us-news': {
    label: '미국뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'us-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'us-news-list.html',
  },
  'weather-news': {
    label: '날씨환경뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'weather-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'weather-news-list.html',
  },
  'retail-news': {
    label: '유통뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'retail-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'retail-news-list.html',
  },
  'literature-news': {
    label: '문학뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'literature-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'literature-news-list.html',
  },
  'health-news': {
    label: '헬스뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'health-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'health-news-list.html',
  },
  'politics-news': {
    label: '정치뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'politics-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'politics-news-list.html',
  },
  'industry-news': {
    label: '산업뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'industry-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'industry-news-list.html',
  },
  'ai-news': {
    label: '인공지능뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'ai-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'ai-news-list.html',
  },
  'incident-news': {
    label: '사건사고뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'incident-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'incident-news-list.html',
  },
  'ukraine-news': {
    label: '우크라이나러시아뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'ukraine-news.js',
    jsVersion: '20261028cat1',
    listHtml: 'ukraine-news-list.html',
  },
  'korea-news': {
    label: '한국뉴스',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: 'korea-news.js',
    jsVersion: '20261020auto2',
    listHtml: 'korea-news-list.html',
  },
  'shorts-bg-image': {
    label: '신문읽는 이미지',
    cssFile: 'shorts-bg-image.css',
    cssVersion: '20261020sbgi3',
    jsFile: 'shorts-bg-image.js',
    jsVersion: '20261021sbgi5',
    listHtml: 'shorts-bg-image-list.html',
    articleLayout: 'header-only',
  },
  'ranking-news': {
    label: 'Ranking News',
    cssFile: 'ranking-news.css',
    cssVersion: '20260622a',
    jsFile: 'page30_viewpost_ranking_news.js',
    jsVersion: '20261020auto2',
    listHtml: 'ranking-news-list.html',
  },
  'english-synonym': {
    label: '유의어',
    cssFile: 'page30_viewpost_v.css',
    cssVersion: '20260903e',
    jsFile: 'page30_viewpost_v.js',
    jsVersion: '20261020rd23',
    listHtml: 'english-synonym-list.html',
    extraCss: [{ file: 'news-voca.css', version: '20260926barun' }],
  },
  'english-opinions': {
    label: '오피니언',
    cssFile: 'page30_viewpost_opinions.css',
    cssVersion: '20260816a',
    jsFile: 'page30_viewpost_opinions.js',
    jsVersion: '20261020rd23',
    listHtml: 'english-opinions-list.html',
  },
  'calm-mind': {
    label: '마음 다스리는 글',
    cssFile: 'page30_viewpost_calm_mind.css',
    cssVersion: '20260828a',
    jsFile: 'page30_viewpost_calm_mind.js',
    jsVersion: '20260903d',
    listHtml: 'calm-mind-list.html',
    articleLayout: 'header-only',
  },
  'english-quotes': {
    label: '영어 명언',
    cssFile: 'page30_viewpost_english_quotes.css',
    cssVersion: '20261013a',
    jsFile: 'page30_viewpost_english_quotes.js',
    jsVersion: '20261013a',
    listHtml: 'english-quotes-list.html',
    articleLayout: 'header-only',
  },
  'popular-voca': {
    label: '이럴 땐 영어로?',
    cssFile: 'page30_viewpost_v.css',
    cssVersion: '20260628',
    jsFile: 'page30_viewpost_v_easy.js',
    jsVersion: '20261020rd24',
    listHtml: 'popular-voca-list.html',
    articleLayout: 'header-only',
  },
  'word-of-the-day': {
    label: 'Word of the Day',
    cssFile: 'page30_viewpost_wordofday.css',
    cssVersion: '20261020pad1',
    jsFile: 'page30_viewpost_wordofday.js',
    jsVersion: '20261020rd30',
    listHtml: 'word-of-the-day-list.html',
    articleLayout: 'word-detail',
  },
  'photo-english': {
    label: '포토영어',
    cssFile: 'page30_viewpost_photo_english.css',
    cssVersion: '20260727r',
    jsFile: 'page30_viewpost_photo_english.js',
    jsVersion: '20261020rd24',
    listHtml: 'photo-english-list.html',
    extraCss: [{ file: 'photo-english.css', version: '20260727r' }],
    articleLayout: 'header-only',
  },
  'vocabulary-quiz': {
    label: '영어 단어 퀴즈',
    cssFile: 'vocabulary-quiz.css',
    cssVersion: '20261020quiz1',
    jsFile: 'vocabulary-quiz.js',
    jsVersion: '20261020quiz1',
    listHtml: 'vocabulary-quiz-list.html',
    pageKind: 'quiz',
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

const BOARD_STATIC_MESSAGE_CLASS = {
  'english-quotes': 'post-message-body cm-blog',
  'calm-mind': 'post-message-body cm-blog',
};

function formatStaticMetaDateTime(datePublished) {
  if (!datePublished) return '-';
  const raw = String(datePublished);
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(raw) ? `${raw}T00:00:00` : raw);
  if (Number.isNaN(d.getTime())) return raw;
  const y = d.getFullYear();
  const m = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  const h = ('0' + d.getHours()).slice(-2);
  const min = ('0' + d.getMinutes()).slice(-2);
  return `${y}.${m}.${day}  ${h}:${min}`;
}

/** 크롤러용: slug SEO 페이지 main 안에 제목·메타·본문 HTML 인라인 */
export function buildStaticPostMainHtml(config, boardPath) {
  const message = String(config.message || '').trim();
  const msgClass = BOARD_STATIC_MESSAGE_CLASS[boardPath] || 'post-message-body';
  const headingTag = boardPath === 'news-voca' || boardPath === 'ranking-news' ? 'h1' : 'h1';

  if (!message) {
    return `        <header id="post-header">
            <${headingTag} id="post-title"></${headingTag}>
            <p id="post-meta"></p>
        </header>
        <article id="post-content">
            <div id="post-message" class="${msgClass}"></div>
        </article>`;
  }

  const title = escapeHtml(config.title || '제목 없음');
  const datePublished = config.datePublished || toIsoDateOnly();
  const dateTimeStr = formatStaticMetaDateTime(datePublished);
  const meta = `<p id="post-meta"><time datetime="${escapeHtml(String(datePublished))}">${escapeHtml(dateTimeStr)}</time><span class="post-meta-sep" aria-hidden="true"> · </span><span class="post-meta-part">조회 <span class="post-meta-views-num">0</span></span><span class="post-meta-sep" aria-hidden="true"> · </span><span class="post-meta-part">추천수 <span class="post-meta-likes-num">0</span></span></p>`;

  return `        <header id="post-header">
            <${headingTag} id="post-title">${title}</${headingTag}>
            ${meta}
        </header>
        <article id="post-content">
            <div id="post-message" class="${msgClass}">${message}</div>
        </article>`;
}

export function buildArticleJsonLd({ title, slug, boardPath, metaDescription, datePublished }) {
  const headline = String(title || '').replace(/^\[(AP|CNN|BBC)\]\s*/i, '').trim();
  const pageUrl = `${SITE_ORIGIN}/${boardPath}/${slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description: metaDescription,
    author: { '@type': 'Organization', name: '시사영단어', alternateName: 'News English Lab' },
    publisher: { '@type': 'Organization', name: '시사영단어', alternateName: 'News English Lab', url: SITE_ORIGIN },
    datePublished: datePublished || toIsoDateOnly(),
    dateModified: datePublished || toIsoDateOnly(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    inLanguage: ['ko', 'en'],
  };
}

function buildSeoHead({ docTitle, title, slug, boardPath, metaDescription, pageUrl, jsonLd }) {
  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(docTitle)}</title>
    <meta name="description" content="${escapeHtml(metaDescription)}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="시사영단어">
    <link rel="canonical" href="${escapeHtml(pageUrl)}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="시사영단어">
    <meta property="og:title" content="${escapeHtml(title)}">
    <meta property="og:description" content="${escapeHtml(metaDescription)}">
    <meta property="og:url" content="${escapeHtml(pageUrl)}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${escapeHtml(title)}">
    <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
    <meta name="google-adsense-account" content="ca-pub-6108574897789788">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108574897789788" crossorigin="anonymous"></script>
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;
}

function buildQuizSeoPageHtml(boardPath, board, config) {
  const { title, slug, metaDescription } = config;
  const pageUrl = `${SITE_ORIGIN}/${boardPath}/${slug}/`;
  const datePublished = config.datePublished || toIsoDateOnly();
  const docTitle = `${title} | ${board.label} · 시사영단어`;
  const jsonLd = buildArticleJsonLd({ title, slug, boardPath, metaDescription, datePublished });
  const head = buildSeoHead({ docTitle, title, slug, boardPath, metaDescription, pageUrl, jsonLd });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
${head}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../../redesign-tokens.css?v=20261020quiz1">
    <link rel="stylesheet" href="../../site-masthead.css?v=20261020quiz1">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260815j">
    <link rel="stylesheet" href="../../${board.cssFile}?v=${board.cssVersion}">
</head>
<body class="rd-quiz" data-nv-slug="${escapeHtml(slug)}" data-nv-board="${escapeHtml(boardPath)}">
    <nav id="navbar" class="navbar navbar-expand site-masthead" aria-label="주 메뉴"></nav>
    <main class="vocabulary-quiz-main">
        <div id="vocabulary-quiz-entries"></div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../page30-api-config.js?v=20260721"></script>
    <script src="../../site-masthead.js?v=20261020quiz1"></script>
    <script src="../../site-footer.js?v=20261013a"></script>
    <script src="../../nav-home-menu.js?v=20260816d"></script>
    <script src="../../${board.jsFile}?v=${board.jsVersion}"></script>
</body>
</html>
`;
}

export function buildSeoPageHtml(boardPath, config) {
  const board = BOARD_SEO[boardPath];
  if (!board) throw new Error(`Unknown boardPath: ${boardPath}`);

  if (board.pageKind === 'quiz') {
    return buildQuizSeoPageHtml(boardPath, board, config);
  }

  const { title, slug, metaDescription } = config;
  const pageUrl = `${SITE_ORIGIN}/${boardPath}/${slug}`;
  const datePublished = config.datePublished || toIsoDateOnly();
  const docTitle = `${title} | ${board.label} · 시사영단어`;
  const jsonLd = buildArticleJsonLd({ title, slug, boardPath, metaDescription, datePublished });
  const head = buildSeoHead({ docTitle, title, slug, boardPath, metaDescription, pageUrl, jsonLd });

  return `<!DOCTYPE html>
<html lang="ko">
<head>
${head}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../page30_viewpost.css?v=20260628">
    <link rel="stylesheet" href="../../${board.cssFile}?v=${board.cssVersion}">
${(board.extraCss || []).map((c) => `    <link rel="stylesheet" href="../../${c.file}?v=${c.version}">`).join('\n')}
    <link rel="stylesheet" href="../../title-text-sharp.css?v=20260610">
    <link rel="stylesheet" href="../../viewpost-like.css?v=20260906gray">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260617">
    <link rel="stylesheet" href="../../navbar-unified.css?v=20260612c">
    <link rel="stylesheet" href="../../weather-banner.css?v=20260612g">
    <link rel="stylesheet" href="../../world-clock.css?v=20260612g">
    <link rel="stylesheet" href="../../redesign-tokens.css?v=20261020rd27">
    <link rel="stylesheet" href="../../redesign-article.css?v=20261028path1">
    <link rel="preload" href="../../redesign-article.js?v=20261028path1" as="script">
    <style id="rd-fouc-guard">
      /* SEO 구형 본문이 redesign 전에 깜빡이지 않도록 (!important 금지: 키프레임 fallback이 무시됨) */
      body[data-nv-board]:not(.rd-ready) #post-container {
        visibility: hidden;
      }
      /* QUICK REVIEW 배너 강제 숨김 */
      .rd-review { display: none !important; }
    </style>
    <script>
    (function () {
      function rdReady() {
        document.documentElement.classList.add('rd-ready');
        if (document.body) document.body.classList.add('rd-ready');
      }
      /* header-only 보드가 rd-ready를 안 켜도 본문이 영구 숨김되지 않게 */
      setTimeout(rdReady, 1200);
    })();
    </script>
    <noscript><style>body[data-nv-board] #post-container{visibility:visible!important}</style></noscript>
</head>
<body class="${board.articleLayout === 'header-only' ? 'rd-article rd-article--header-only' : ''}" data-nv-slug="${escapeHtml(slug)}" data-nv-board="${escapeHtml(boardPath)}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="주 메뉴">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../${board.listHtml}">${escapeHtml(board.label)}</a>
            <div data-nav-home-menu class="nav-home-menu-slot ms-auto"></div>
        </div>
    </nav>
    <main id="post-container" role="main">
${buildStaticPostMainHtml(config, boardPath)}
    </main>
    <script src="../../page30-api-config.js"></script>
    <script src="../../viewpost-seo.js?v=20260622a"></script>
    <script src="../../viewpost-meta.js?v=20260627"></script>
    <script src="../../viewpost-like.js?v=20260906gray"></script>
    <script src="../../viewpost-rd-ready.js?v=20261020rd24"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../nav-home-menu.js?v=20261020travel2"></script>
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
  'defense-news': 'defense-news.html',
  'economy-news': 'economy-news.html',
  'travel-news': 'travel-news.html',
  'sports-news': 'sports-news.html',
  'us-news': 'us-news.html',
  'weather-news': 'weather-news.html',
  'retail-news': 'retail-news.html',
  'literature-news': 'literature-news.html',
  'health-news': 'health-news.html',
  'politics-news': 'politics-news.html',
  'industry-news': 'industry-news.html',
  'ai-news': 'ai-news.html',
  'incident-news': 'incident-news.html',
  'ukraine-news': 'ukraine-news.html',
  'korea-news': 'korea-news.html',
  'shorts-bg-image': 'shorts-bg-image.html',
  'ranking-news': 'ranking-news.html',
  'english-synonym': 'english-synonym.html',
  'english-opinions': 'english-opinions.html',
  'calm-mind': 'calm-mind.html',
  'english-quotes': 'english-quotes.html',
  'popular-voca': 'popular-voca.html',
  'situational-english': 'situational-english.html',
  'pros-cons': 'pros-cons.html',
  'word-of-the-day': 'word-of-the-day.html',
  'photo-english': 'photo-english.html',
  'vocabulary-quiz': 'vocabulary-quiz.html',
};

/** API 경로 → sitemap boardPath (slug 있는 글만 수집) */
export const BOARD_API_ENDPOINTS = [
  { apiPath: '/guestbook', boardPath: 'news-voca', label: '뉴스 어휘' },
  { apiPath: '/wordofday', boardPath: 'word-of-the-day', label: '오늘의 단어장' },
  { apiPath: '/photo-english', boardPath: 'photo-english', label: '사진 영어' },
  { apiPath: '/ranking-news', boardPath: 'ranking-news', label: '랭킹 뉴스' },
  { apiPath: '/cooking-voca', boardPath: 'cooking-voca', label: '요리 어휘' },
  { apiPath: '/culture-voca', boardPath: 'culture-voca', label: '컬쳐 어휘' },
  { apiPath: '/defense-news', boardPath: 'defense-news', label: '국방뉴스' },
  { apiPath: '/economy-news', boardPath: 'economy-news', label: '경제뉴스' },
  { apiPath: '/travel-news', boardPath: 'travel-news', label: '여행뉴스' },
  { apiPath: '/sports-news', boardPath: 'sports-news', label: '스포츠뉴스' },
  { apiPath: '/us-news', boardPath: 'us-news', label: '미국뉴스' },
  { apiPath: '/weather-news', boardPath: 'weather-news', label: '날씨환경뉴스' },
  { apiPath: '/retail-news', boardPath: 'retail-news', label: '유통뉴스' },
  { apiPath: '/literature-news', boardPath: 'literature-news', label: '문학뉴스' },
  { apiPath: '/health-news', boardPath: 'health-news', label: '헬스뉴스' },
  { apiPath: '/politics-news', boardPath: 'politics-news', label: '정치뉴스' },
  { apiPath: '/industry-news', boardPath: 'industry-news', label: '산업뉴스' },
  { apiPath: '/ai-news', boardPath: 'ai-news', label: '인공지능뉴스' },
  { apiPath: '/incident-news', boardPath: 'incident-news', label: '사건사고뉴스' },
  { apiPath: '/ukraine-news', boardPath: 'ukraine-news', label: '우크라이나러시아뉴스' },
  { apiPath: '/korea-news', boardPath: 'korea-news', label: '한국뉴스' },
  { apiPath: '/shorts-bg-image', boardPath: 'shorts-bg-image', label: '신문읽는 이미지' },
  { apiPath: '/vocabulary', boardPath: 'english-synonym', label: '유의어' },
  { apiPath: '/opinions', boardPath: 'english-opinions', label: '오피니언' },
  { apiPath: '/calm-mind', boardPath: 'calm-mind', label: '마음 다스리는 글' },
  { apiPath: '/english-quotes', boardPath: 'english-quotes', label: '영어 명언' },
  { apiPath: '/easy-voca', boardPath: 'popular-voca', label: '이럴 땐 영어로?' },
  { apiPath: '/situational-english', boardPath: 'situational-english', label: '상황별 영어' },
  { apiPath: '/pros-cons', boardPath: 'pros-cons', label: '장단점' },
  { apiPath: '/vocabulary-quiz', boardPath: 'vocabulary-quiz', label: '영어 단어 퀴즈' },
];

/** slug별 고유 canonical이 있는 정적 SEO 경로 (/board/slug/) */
const BOARD_SITEMAP_PATH = new Set([
  'news-voca',
  'cooking-voca',
  'culture-voca',
  'defense-news',
  'economy-news',
  'travel-news',
  'sports-news',
  'us-news',
  'weather-news',
  'retail-news',
  'literature-news',
  'health-news',
  'politics-news',
  'industry-news',
  'ai-news',
  'incident-news',
  'ukraine-news',
  'korea-news',
  'shorts-bg-image',
  'ranking-news',
  'english-synonym',
  'english-opinions',
  'calm-mind',
  'english-quotes',
  'popular-voca',
  'situational-english',
  'pros-cons',
  'word-of-the-day',
  'photo-english',
  'vocabulary-quiz',
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
  { loc: `${SITE_ORIGIN}/defense-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/economy-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/travel-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/sports-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/us-news-list.html`, priority: '0.9' },
  /* 빈 보드 목록은 사이트맵에서 제외 — 요청 시 복원 */
  { loc: `${SITE_ORIGIN}/industry-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/korea-news-list.html`, priority: '0.9' },
  { loc: `${SITE_ORIGIN}/shorts-bg-image-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/ranking-news-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/english-synonym-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/english-opinions-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/calm-mind-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/english-quotes-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/popular-voca-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/situational-english-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/pros-cons-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/word-of-the-day-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/photo-english-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/vocabulary-quiz-list.html`, priority: '0.8' },
  { loc: `${SITE_ORIGIN}/about.html`, priority: '0.6' },
  { loc: `${SITE_ORIGIN}/privacy.html`, priority: '0.5' },
  { loc: `${SITE_ORIGIN}/terms.html`, priority: '0.5' },
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
        message: config.message,
      })
    : null;
  const sitemapPath = updateSitemap({
    boardPath,
    slug: config.slug,
    lastmod: config.datePublished || toIsoDateOnly(),
  });
  return { sitemapPath, seoPath, url: sitemapUrlForSlug(boardPath, config.slug) };
}
