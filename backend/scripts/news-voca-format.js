/**
 * 뉴스 어휘 — JSON / text → HTML + sitemap
 *
 * JSON (seed-news-voca.js):
 *   title, slug, metaDescription, password, datePublished
 *   intro[]
 *   words[] — title, word{en,ko,pron}, example{en,ko}, phrases[{en,ko}]
 *   source{text,url}, youtube
 *
 * text (대안):
 *   intro / 중요 단어 N. / word | pron / 예문 / 구문별 번역 / en - ko / 출처 / 유튜브
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { updateSitemap, FRONTEND_ROOT, SITE_ORIGIN } from './voca-seo.js';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NV_HL_VARIANTS = [
  'nv-hl--paint',
  'nv-hl--marker',
  'nv-hl--wave',
  'nv-hl--ink',
  'nv-hl--oval-slant',
  'nv-hl--box',
  'nv-hl--box-round',
  'nv-hl--dash',
];

function parseInline(text) {
  const src = String(text ?? '');
  let out = '';
  let i = 0;
  let hlIndex = 0;

  const pushHighlight = (inner) => {
    const variant = NV_HL_VARIANTS[hlIndex % NV_HL_VARIANTS.length];
    hlIndex += 1;
    out += `<mark class="nv-hl ${variant}">${escapeHtml(inner)}</mark>`;
  };

  while (i < src.length) {
    const boldOpen = src.indexOf('**', i);
    const italicOpen = (() => {
      let j = i;
      while (j < src.length) {
        const at = src.indexOf('*', j);
        if (at === -1) return -1;
        // skip ** bold markers
        if (src[at + 1] === '*') {
          j = at + 2;
          continue;
        }
        return at;
      }
      return -1;
    })();

    let nextType = null;
    let nextAt = -1;
    if (boldOpen !== -1 && (italicOpen === -1 || boldOpen <= italicOpen)) {
      nextType = 'bold';
      nextAt = boldOpen;
    } else if (italicOpen !== -1) {
      nextType = 'italic';
      nextAt = italicOpen;
    }

    if (nextAt === -1) {
      out += escapeHtml(src.slice(i));
      break;
    }

    out += escapeHtml(src.slice(i, nextAt));

    if (nextType === 'bold') {
      const close = src.indexOf('**', nextAt + 2);
      if (close === -1) {
        out += escapeHtml(src.slice(nextAt));
        break;
      }
      pushHighlight(src.slice(nextAt + 2, close));
      i = close + 2;
      continue;
    }

    // single *italic*
    const close = src.indexOf('*', nextAt + 1);
    if (close === -1 || src[close + 1] === '*') {
      out += escapeHtml(src.slice(nextAt, nextAt + 1));
      i = nextAt + 1;
      continue;
    }
    out += `<em class="nv-quote">${escapeHtml(src.slice(nextAt + 1, close))}</em>`;
    i = close + 1;
  }
  return out;
}

function extractUrl(line) {
  const md = String(line).match(/\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
  if (md) return md[1];
  const plain = String(line).match(/(https?:\/\/[^\s)\]]+)/);
  return plain ? plain[1].replace(/[.,]+$/, '') : '';
}

function extractYoutubeVideoId(url) {
  const m = String(url || '').match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

function isWordTitleLine(line) {
  const t = line.trim();
  return /^중요\s*단어\s*\d+\./i.test(t) || /^##\s+/.test(t);
}

function isPhraseStart(line) {
  return /^구문별\s*번역\s*[:：]?$/i.test(line.trim());
}

function parsePhraseLine(line) {
  const t = line.trim();
  const m = t.match(/^(.+?)\s*-\s*(.+)$/);
  if (!m) return null;
  return { en: m[1].trim(), ko: m[2].trim() };
}

function isExampleStart(line) {
  return /^예문\s*[:：]?$/i.test(line.trim());
}

function isMeaningStart(line) {
  return /^기사에서의\s*의미\s*[:：]?$/i.test(line.trim());
}

function isSourceStart(line) {
  return /^출처\s*[:：]?(\s|$)/i.test(line.trim());
}

function isYoutubeStart(line) {
  return /^유튜브(?:\s*보기)?\s*[:：]?(\s|$)/i.test(line.trim());
}

function isWordLine(line) {
  const t = line.trim();
  if (!t || /^(예문|출처|유튜브|기사에서|구문별)/i.test(t) || /^##/.test(t) || isWordTitleLine(t)) return false;
  const parts = t.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
  if (parts.length < 2 || parts.length > 4) return false;
  return /[A-Za-z]/.test(parts[0]);
}

function parseWordEn(text) {
  const t = String(text).trim();
  const m = t.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (m) return { en: m[1].trim(), ko: m[2].trim() };
  return { en: t, ko: '' };
}

function parseTextBody(text) {
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const intro = [];
  const sections = [];
  const sourceLines = [];
  let youtubeUrl = '';

  let currentSection = null;
  let introParagraph = [];
  let inExample = false;
  let inMeaning = false;
  let inSource = false;
  let inYoutube = false;
  let inPhrases = false;
  let examplePending = null;
  let meaningLines = [];
  let phraseLines = [];
  let seenHeading = false;

  const flushIntroParagraph = () => {
    const joined = introParagraph.join(' ').trim();
    if (joined && !seenHeading) intro.push(joined);
    introParagraph = [];
  };

  const flushExample = () => {
    if (examplePending && currentSection) {
      currentSection.example = { ...examplePending };
      examplePending = null;
    }
  };

  const flushSection = () => {
    if (!currentSection) return;
    if (meaningLines.length) currentSection.meaning = meaningLines.join(' ').trim();
    if (phraseLines.length) currentSection.phrases = [...phraseLines];
    sections.push(currentSection);
    currentSection = null;
    meaningLines = [];
    phraseLines = [];
    inExample = false;
    inMeaning = false;
    inPhrases = false;
    examplePending = null;
  };

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) {
      if (inExample && examplePending?.en && !examplePending.ko) flushExample();
      if (!seenHeading) flushIntroParagraph();
      continue;
    }

    if (inYoutube) {
      const url = extractUrl(trimmed);
      if (url) youtubeUrl = url;
      continue;
    }

    if (inSource) {
      if (isYoutubeStart(trimmed)) {
        inSource = false;
        inYoutube = true;
        const inline = trimmed.replace(/^유튜브(?:\s*보기)?\s*[:：]?\s*/i, '');
        const url = extractUrl(inline);
        if (url) youtubeUrl = url;
        continue;
      }
      sourceLines.push(trimmed);
      continue;
    }

    if (isYoutubeStart(trimmed)) {
      flushIntroParagraph();
      flushExample();
      flushSection();
      inSource = false;
      inYoutube = true;
      const inline = trimmed.replace(/^유튜브(?:\s*보기)?\s*[:：]?\s*/i, '');
      const url = extractUrl(inline);
      if (url) youtubeUrl = url;
      continue;
    }

    if (isSourceStart(trimmed)) {
      flushIntroParagraph();
      flushExample();
      flushSection();
      inExample = false;
      inMeaning = false;
      inSource = true;
      const inline = trimmed.replace(/^출처\s*[:：]?\s*/i, '').trim();
      if (inline) sourceLines.push(inline);
      continue;
    }

    if (isWordTitleLine(trimmed)) {
      flushIntroParagraph();
      flushExample();
      flushSection();
      seenHeading = true;
      const title = trimmed.replace(/^##\s+/, '');
      currentSection = { title, word: null, example: null, meaning: '', phrases: [] };
      continue;
    }

    if (isPhraseStart(trimmed)) {
      flushExample();
      inExample = false;
      inMeaning = false;
      inPhrases = true;
      continue;
    }

    if (isMeaningStart(trimmed)) {
      flushExample();
      inExample = false;
      inMeaning = true;
      continue;
    }

    if (isExampleStart(trimmed)) {
      inExample = true;
      inMeaning = false;
      inPhrases = false;
      continue;
    }

    if (inPhrases && currentSection) {
      const phrase = parsePhraseLine(trimmed);
      if (phrase) phraseLines.push(phrase);
      continue;
    }

    if (inMeaning && currentSection) {
      meaningLines.push(trimmed);
      continue;
    }

    if (inExample && currentSection) {
      if (!examplePending) {
        examplePending = { en: trimmed, ko: '' };
      } else if (!examplePending.ko) {
        examplePending.ko = trimmed;
        flushExample();
      } else {
        flushExample();
        examplePending = { en: trimmed, ko: '' };
      }
      continue;
    }

    if (isWordLine(trimmed) && currentSection) {
      const parts = trimmed.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
      const { en, ko } = parseWordEn(parts[0]);
      currentSection.word = { en, ko, pron: parts[1] || '', ipa: parts[2] || '' };
      continue;
    }

    if (!seenHeading) introParagraph.push(trimmed);
  }

  flushIntroParagraph();
  flushExample();
  flushSection();

  let sourceUrl = '';
  const sourceTextParts = [];
  for (const line of sourceLines) {
    const url = extractUrl(line);
    if (url && !sourceUrl) sourceUrl = url;
    const textOnly = line
      .replace(/\[[^\]]*\]\([^)]+\)/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .trim();
    if (textOnly) sourceTextParts.push(textOnly);
  }

  return {
    intro,
    sections,
    sourceText: sourceTextParts.join(' '),
    sourceUrl,
    youtubeUrl,
  };
}

function formatWordHtml(en, ko, pron, ipa) {
  const koHtml = ko ? `<span class="nv-ko">${escapeHtml(ko)}</span>` : '';
  const ipaHtml = ipa ? `<span class="nv-ipa">${escapeHtml(ipa)}</span>` : '';
  return `<div class="nv-word">
  <div class="nv-word-main">
    <span class="nv-en">${escapeHtml(en)}</span>${koHtml}
  </div>
  <div class="nv-word-meta">
    <span class="nv-pron">${escapeHtml(pron)}</span>
    ${ipaHtml}
  </div>
</div>`;
}

function buildSourceHtml(sourceText, sourceUrl) {
  const text = String(sourceText ?? '').trim();
  const url = String(sourceUrl ?? '').trim();
  if (!text && !url) return '';

  const linkHtml = url
    ? `<p class="nv-source-link-wrap"><a class="nv-source-link" href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">기사 원문 보기</a></p>`
    : '';

  return `<footer class="nv-source">
  <p class="nv-source-label">출처</p>
  <p class="nv-source-text">${escapeHtml(text)}</p>
  ${linkHtml}
</footer>`;
}

function buildYoutubeHtml(youtubeUrl) {
  const videoId = extractYoutubeVideoId(youtubeUrl);
  if (!videoId) return '';

  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
  return `<footer class="nv-youtube nv-youtube--link">
  <p class="nv-youtube-text"><a class="nv-youtube-link" href="${escapeHtml(watchUrl)}" rel="noopener noreferrer" target="_blank"><span aria-hidden="true">📺</span> 유튜브 보기</a></p>
</footer>`;
}

function buildLeadHtml(intro) {
  const lines = Array.isArray(intro) ? intro.filter(Boolean) : [];
  if (!lines.length) return '';
  const paras = lines.map((t) => `<p class="nv-lead-text">${parseInline(t)}</p>`).join('\n');
  return `<div class="nv-lead">\n${paras}\n</div>`;
}

function buildPhrasesHtml(phrases) {
  const list = Array.isArray(phrases) ? phrases.filter((p) => p?.en || p?.ko) : [];
  if (!list.length) return '';

  const items = list
    .map(
      (p) => `<li class="nv-phrase-item">
    <span class="nv-phrase-en">${escapeHtml(p.en || '')}</span>
    <span class="nv-phrase-sep" aria-hidden="true">-</span>
    <span class="nv-phrase-ko">${escapeHtml(p.ko || '')}</span>
  </li>`
    )
    .join('\n');

  return `<div class="nv-subsection nv-phrase-breakdown">
  <h3 class="nv-subsection-title">구문별 번역</h3>
  <div class="nv-subsection-body">
    <ul class="nv-phrase-list">${items}
    </ul>
  </div>
</div>`;
}

function buildWordSectionHtml(section) {
  const title = section?.title || '';
  const rawNarrative = section?.narrative;
  const narrativeLines = Array.isArray(rawNarrative)
    ? rawNarrative.map((t) => String(t ?? '').trim()).filter(Boolean)
    : String(rawNarrative ?? '')
        .split(/\n+/)
        .map((t) => t.trim())
        .filter(Boolean);

  if (narrativeLines.length) {
    const paras = narrativeLines
      .map((t) => `<p class="nv-narrative-text">${parseInline(t)}</p>`)
      .join('\n');
    return `<section class="nv-word-section nv-narrative">
  <h2 class="nv-section-title">${escapeHtml(title)}</h2>
  ${paras}
  <hr class="nv-section-rule" />
</section>`;
  }

  const word = section?.word;
  const example = section?.example;
  const meaning = String(section?.meaning ?? '').trim();
  const phrases = section?.phrases;

  const wordHtml = word
    ? formatWordHtml(word.en, word.ko, word.pron, word.ipa)
    : '';

  const exampleHtml =
    example?.en || example?.ko
      ? `<div class="nv-subsection nv-word-example">
  <h3 class="nv-subsection-title">예문</h3>
  <div class="nv-subsection-body">
    ${example.en ? `<p class="nv-ex-en">${escapeHtml(example.en)}</p>` : ''}
    ${example.ko ? `<p class="nv-ex-ko">${escapeHtml(example.ko)}</p>` : ''}
  </div>
</div>`
      : '';

  const phrasesHtml = buildPhrasesHtml(phrases);

  const meaningHtml =
    !phrasesHtml && meaning
      ? `<div class="nv-subsection nv-word-meaning">
  <h3 class="nv-subsection-title">기사에서의 의미</h3>
  <div class="nv-subsection-body">
    <p class="nv-meaning-text">${parseInline(meaning)}</p>
  </div>
</div>`
      : '';

  return `<section class="nv-word-section">
  <h2 class="nv-section-title">${escapeHtml(title)}</h2>
  ${wordHtml}
  ${exampleHtml}
  ${phrasesHtml}
  ${meaningHtml}
</section>`;
}

function resolveArticleData(config) {
  if (Array.isArray(config.words) && config.words.length) {
    const source = config.source || {};
    return {
      intro: config.intro || [],
      sections: config.words,
      sourceText: source.text || '',
      sourceUrl: source.url || config.sourceUrl || '',
      youtubeUrl: config.youtube || config.youtubeUrl || '',
    };
  }

  const parsed = parseTextBody(config.text ?? '');
  return {
    intro: parsed.intro,
    sections: parsed.sections,
    sourceText: parsed.sourceText,
    sourceUrl: parsed.sourceUrl,
    youtubeUrl: parsed.youtubeUrl,
  };
}

function toIsoDateOnly(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

function buildArticleJsonLd({ title, slug, metaDescription, datePublished }) {
  const headline = String(title || '').replace(/^\[AP\]\s*/, '').trim();
  const pageUrl = `${SITE_ORIGIN}/news-voca/${slug}/`;
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

export function buildNewsVocaMessage(config) {
  const { intro, sections, sourceText, sourceUrl, youtubeUrl } = resolveArticleData(config);

  const sourceHtml = buildSourceHtml(sourceText, config.sourceUrl || sourceUrl);
  const leadHtml = buildLeadHtml(intro);
  const sectionsHtml = sections.map(buildWordSectionHtml).join('\n');
  const bodyHtml = sectionsHtml ? `<div class="nv-body">\n${sectionsHtml}\n</div>` : '';
  const youtubeHtml = buildYoutubeHtml(config.youtube || config.youtubeUrl || youtubeUrl);

  if (config.sourceAtEnd) {
    return `<article class="nv-text">
${leadHtml}
${bodyHtml}
${youtubeHtml}
${sourceHtml}
</article>`;
  }

  return `<article class="nv-text">
${sourceHtml}
${leadHtml}
${bodyHtml}
${youtubeHtml}
</article>`;
}

export function buildNewsVocaSeoPageHtml(config) {
  const { title, slug, metaDescription } = config;
  const pageUrl = `${SITE_ORIGIN}/news-voca/${slug}/`;
  const datePublished = config.datePublished || toIsoDateOnly();
  const docTitle = `${title} | News Voca · English Easy Study`;
  const jsonLd = buildArticleJsonLd({ title, slug, metaDescription, datePublished });

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
    <link rel="stylesheet" href="../../page30_viewpost.css?v=20260702e">
    <link rel="stylesheet" href="../../news-voca.css?v=20260821blog">
    <link rel="stylesheet" href="../../title-text-sharp.css?v=20260610">
    <link rel="stylesheet" href="../../viewpost-like.css?v=20260625">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260617">
    <link rel="stylesheet" href="../../navbar-unified.css?v=20260612c">
    <link rel="stylesheet" href="../../weather-banner.css?v=20260612g">
    <link rel="stylesheet" href="../../world-clock.css?v=20260612g">
</head>
<body data-nv-slug="${escapeHtml(slug)}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="주 메뉴">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../news-voca-list.html">뉴스 어휘</a>
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
    <script src="../../viewpost-meta.js?v=20260627"></script>
    <script src="../../viewpost-like.js?v=20260627"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../nav-home-menu.js?v=20260618"></script>
    <script src="../../news-voca.js?v=20260702e"></script>
    <script src="../../weather-banner.js?v=20260612e" defer></script>
    <script src="../../world-clock.js?v=20260612g" defer></script>
</body>
</html>
`;
}

export function writeNewsVocaSeoPage(config) {
  const slug = config.slug;
  if (!slug) return null;

  const dir = path.join(FRONTEND_ROOT, 'news-voca', slug);
  fs.mkdirSync(dir, { recursive: true });
  const filePath = path.join(dir, 'index.html');
  fs.writeFileSync(filePath, buildNewsVocaSeoPageHtml(config), 'utf8');
  return filePath;
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
        '/guestbook API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export async function uploadNewsVoca(config, apiBase) {
  const message = buildNewsVocaMessage(config);
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

  console.log('뉴스 어휘 업로드 중...', apiBase);
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
      const delRes = await fetch(`${apiBase}/guestbook/delete-by-slug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ slug: config.slug, password: config.password }),
        signal: AbortSignal.timeout(60000),
      });
      const delData = await parseApiJson(delRes, 'POST /guestbook/delete-by-slug');
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
        console.warn('  ⚠️ delete-by-slug API 미배포 — 느린 방식으로 재시도합니다. 백엔드를 재배포하면 빨라집니다.');
        const delRes = await fetch(`${apiBase}/deleteposts-by-password`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: config.password }),
          signal: AbortSignal.timeout(120000),
        });
        const delData = await delRes.json();
        if (delRes.ok && delData.deleted > 0) {
          console.log(`  기존 글(동일 비밀번호) ${delData.deleted}개 삭제됨. (${elapsed()})`);
        }
      } else {
        throw e;
      }
    }
  } else {
    console.log('  기존 글 삭제 중 (비밀번호 전체 스캔 — 글이 많으면 느림)...');
    const delRes = await fetch(`${apiBase}/deleteposts-by-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: config.password }),
      signal: AbortSignal.timeout(120000),
    });
    const delData = await delRes.json();
    if (delRes.ok && delData.deleted > 0) {
      console.log(`  기존 글(동일 비밀번호) ${delData.deleted}개 삭제됨. (${elapsed()})`);
    } else {
      console.log(`  삭제할 기존 글 없음. (${elapsed()})`);
    }
  }

  const payloadKb = (JSON.stringify(post).length / 1024).toFixed(1);
  console.log(`  서버에 업로드 중... (${payloadKb} KB)`);

  const res = await fetch(`${apiBase}/guestbook`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
    signal: AbortSignal.timeout(180000),
  });

  const data = await parseApiJson(res, 'POST /guestbook');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  console.log(`  "${post.title}" 추가됨 (${elapsed()})`);

  if (config.slug && config.metaDescription) {
    const seoPagePath = writeNewsVocaSeoPage(config);
    if (seoPagePath) console.log(`  SEO page: ${seoPagePath}`);

    const sitemapPath = updateSitemap({
      boardPath: 'news-voca',
      slug: config.slug,
      lastmod: datePublished,
    });
    console.log(`  sitemap: ${sitemapPath}`);
    console.log(`  URL: ${SITE_ORIGIN}/news-voca/${encodeURIComponent(config.slug)}/`);
    console.log('  → sitemap.xml에 URL이 추가되었습니다. frontend를 배포하면 Google이 sitemap으로 자동 수집합니다.');
    console.log('     Search Console 사이트맵 등록은 최초 1회만: https://englisheasystudy.com/sitemap.xml');
  }
}
