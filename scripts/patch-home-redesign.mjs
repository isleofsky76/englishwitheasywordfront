/**
 * index.html 본문을 시안형 홈 구조로 교체 (head meta·AdSense 유지)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const NEW_BODY_INNER = `
    <script>
        (function () {
            function syncNavbarHeight() {
                var nav = document.getElementById('navbar');
                if (!nav) return;
                var h = Math.ceil(nav.getBoundingClientRect().height);
                if (h > 0) document.documentElement.style.setProperty('--navbar-height', h + 'px');
            }
            function syncSoon() {
                syncNavbarHeight();
                requestAnimationFrame(syncNavbarHeight);
            }
            window.addEventListener('resize', syncSoon);
            if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncSoon);
            else syncSoon();
            window.addEventListener('load', syncSoon);
        })();
    </script>
    <nav id="navbar" class="navbar navbar-expand site-masthead" aria-label="주 메뉴"></nav>
    <div id="yt-billboard-slot" class="yt-billboard-slot" aria-hidden="true"></div>

    <div class="rd-wrap" id="rd-home">
      <div class="rd-datebar">
        <div class="rd-datebar-inner">
          <span id="rd-date-label">오늘의 학습</span>
          <span>WSJ · Economist · CNN · Korea Herald · Korea Times 기사로 배우는 영어</span>
        </div>
      </div>

      <section class="rd-hero" aria-label="오늘의 단어와 기사">
        <div class="rd-hero-word" id="rd-hero-word">
          <span class="rd-kicker">WORD OF THE DAY · 오늘의 단어</span>
          <h1>…</h1>
          <div class="rd-hero-meta"><span class="meaning">불러오는 중</span></div>
          <p class="rd-hero-example">오늘의 단어를 준비하고 있습니다.</p>
          <div class="rd-hero-actions">
            <a class="rd-btn rd-btn-solid" href="word-of-the-day-list.html?api=prod">단어장 보기</a>
            <a class="rd-btn rd-btn-outline" href="vocabulary-quiz-list.html">오늘의 퀴즈 풀기</a>
          </div>
        </div>
        <a class="rd-hero-article" id="rd-hero-article" href="news-voca-list.html">
          <span class="rd-kicker">오늘의 기사 · 국제</span>
          <div class="rd-hero-article-img">[기사 대표 이미지]</div>
          <span class="rd-hero-article-title">최신 국제 뉴스 어휘</span>
          <span class="rd-hero-article-desc">기사를 불러오는 중…</span>
          <span class="rd-hero-article-cta">어휘와 함께 읽기 →</span>
        </a>
      </section>

      <section class="rd-paths" aria-label="학습 경로">
        <div class="rd-paths-inner">
          <div class="rd-path-card">
            <span class="rd-path-num">01</span>
            <h2>뉴스로 배우기</h2>
            <p>실제 영문 기사에서 뽑은 시사 어휘를 주제별로 읽습니다.</p>
            <div class="rd-chips">
              <a class="rd-chip" href="news-voca-list.html">국제</a>
              <a class="rd-chip" href="korea-news-list.html">한국</a>
              <a class="rd-chip" href="defense-news-list.html">국방</a>
              <a class="rd-chip" href="culture-voca-list.html">컬쳐</a>
              <a class="rd-chip" href="ranking-news-list.html">랭킹</a>
            </div>
          </div>
          <div class="rd-path-card">
            <span class="rd-path-num">02</span>
            <h2>단어 다지기</h2>
            <p>매일 한 단어, 비슷한 말과 퀴즈로 확실히 내 것으로 만듭니다.</p>
            <div class="rd-chips">
              <a class="rd-chip" href="word-of-the-day-list.html?api=prod">단어장</a>
              <a class="rd-chip" href="english-synonym-list.html">연관단어</a>
              <a class="rd-chip" href="vocabulary-quiz-list.html">퀴즈</a>
            </div>
          </div>
          <div class="rd-path-card">
            <span class="rd-path-num">03</span>
            <h2>표현 익히기</h2>
            <p>일상과 토론에서 바로 쓰는 영어 표현을 상황별로 익힙니다.</p>
            <div class="rd-chips">
              <a class="rd-chip" href="popular-voca-list.html">이럴 땐 영어로?</a>
              <a class="rd-chip" href="situational-english-list.html">상황</a>
              <a class="rd-chip" href="pros-cons-list.html">Pros &amp; Cons</a>
              <a class="rd-chip" href="photo-english-list.html">포토</a>
            </div>
          </div>
        </div>
      </section>

      <section class="rd-section" aria-label="최신 뉴스 어휘">
        <div class="rd-section-head">
          <h2>최신 뉴스 어휘</h2>
          <a href="news-voca-list.html">전체 보기 →</a>
        </div>
        <div class="rd-news-cards" id="rd-news-cards"></div>
        <div class="rd-news-list" id="rd-news-list"></div>
      </section>

      <div class="rd-quiz-banner-wrap">
        <div class="rd-quiz-banner" id="rd-quiz-banner">
          <div>
            <span class="label">TODAY'S QUIZ</span>
            <span class="words">오늘의 퀴즈</span>
            <span class="desc">불러오는 중…</span>
          </div>
          <a class="rd-btn" href="vocabulary-quiz-list.html">퀴즈 시작하기</a>
        </div>
      </div>

      <section class="rd-section" aria-label="이럴 땐 영어로">
        <div class="rd-section-head">
          <h2>이럴 땐 영어로?</h2>
          <a href="popular-voca-list.html">전체 보기 →</a>
        </div>
        <div class="rd-phrase-grid" id="rd-phrase-grid"></div>
      </section>

      <section class="rd-section rd-reading" aria-label="천천히 읽을거리">
        <div class="rd-section-head">
          <h2>천천히 읽을거리</h2>
        </div>
        <div class="rd-reading-grid">
          <div class="rd-reading-col" id="rd-read-opinions"></div>
          <div class="rd-reading-col" id="rd-read-culture"></div>
          <div class="rd-reading-col" id="rd-read-calm"></div>
          <div class="rd-reading-col" id="rd-read-quotes"></div>
        </div>
      </section>

      <section id="site-search-page" hidden>
        <article>
          <div id="site-search-page-list" role="region" aria-label="검색 결과"></div>
        </article>
      </section>

      <!-- SEO/레거시 미리보기 앵커 — 숨김 유지, home-board-preview 캐시용 -->
      <section id="home-previews" hidden aria-hidden="true">
        <div id="wordofday-preview-list"></div>
        <div id="news-voca-preview-list"></div>
        <div id="best-views-preview-list"></div>
        <div id="recent-updates-preview-list"></div>
      </section>
    </div>

    <footer class="rd-footer" role="contentinfo" aria-label="사이트 정보">
      <div class="rd-footer-inner">
        <div class="rd-footer-brand">
          <span class="name">시사영단어</span>
          <span class="desc">뉴스로 배우는 시사 영어. 뉴스 어휘, 오늘의 단어, 유의어, 퀴즈를 무료로.</span>
        </div>
        <div class="rd-footer-links">
          <a href="https://www.youtube.com/@istudyeng" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://x.com/istudyengli" target="_blank" rel="noopener noreferrer">X</a>
          <a href="about.html">사이트 소개</a>
          <a href="privacy.html">개인정보처리방침</a>
          <a href="terms.html">이용약관</a>
          <a href="english-directory.html">학습 사이트 디렉터리</a>
        </div>
      </div>
      <div class="rd-footer-copy">© 2026 시사영단어 · News English Lab</div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="viewpost-seo.js?v=20260702"></script>
    <link rel="stylesheet" href="site-footer.css?v=20261013a">
    <script src="nav-home-menu.js?v=20261013legal"></script>
    <script src="site-masthead.js?v=20261019rd"></script>
    <script src="site-footer.js?v=20261013a"></script>
    <script src="home-board-preview.js?v=20261019rd"></script>
    <script src="home-redesign.js?v=20261019rd"></script>
`;

// Update head stylesheets / fonts
html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Sans\+KR[^"]+" rel="stylesheet">/,
  '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+KR:wght@400;500;600&family=Noto+Serif+KR:wght@600;700;900&family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">\n' +
    '    <link rel="stylesheet" href="redesign-tokens.css?v=20261019rd">\n' +
    '    <link rel="stylesheet" href="site-masthead.css?v=20261019rd">\n' +
    '    <link rel="stylesheet" href="redesign-home.css?v=20261019rd">\n' +
    '    <link rel="stylesheet" href="navbar-unified.css">'
);

// Soften old inline :root page-bg to match
html = html.replace(/--page-bg:\s*#[A-Fa-f0-9]+;/, '--page-bg: #F6F3EC;');

// Replace from <body> content through end (keep <body> attrs)
const bodyOpen = html.match(/<body[^>]*>/i);
if (!bodyOpen) throw new Error('no body');
const bodyStart = html.indexOf(bodyOpen[0]) + bodyOpen[0].length;
const bodyEnd = html.lastIndexOf('</body>');
if (bodyEnd < 0) throw new Error('no /body');

const newHtml =
  html.slice(0, bodyStart) +
  '\n' +
  NEW_BODY_INNER +
  '\n' +
  html.slice(bodyEnd);

// Ensure body has rd-home class
let out = newHtml.replace(/<body([^>]*)>/i, (m, attrs) => {
  if (/class=/.test(attrs)) {
    return `<body${attrs.replace(/class="([^"]*)"/, 'class="$1 rd-home"')}>`;
  }
  return `<body class="rd-home"${attrs}>`;
});

fs.writeFileSync(indexPath, out, 'utf8');
console.log('Patched index.html for redesign home');
