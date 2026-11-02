/**
 * 홈 index.html 리디자인 섹션에 최신 글 링크를 정적으로 미리 넣음 (크롤러/AdSense용)
 *
 *   cd backend
 *   node scripts/rebuild-home-redesign-static.js
 */
import fs from 'fs';
import path from 'path';
import { API_BASE } from './loadEnv.js';
import { FRONTEND_ROOT } from './voca-seo.js';

const apiBase = (API_BASE || '').replace(/\/$/, '');

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseTitleParts(title) {
  const raw = String(title || '').trim();
  const m = raw.match(/^\[([^\]]+)\]\s*(.*)$/);
  if (m) return { source: m[1].trim(), title: (m[2] || '').trim() || raw };
  const pipe = raw.split(/\s*\|\s*/);
  if (pipe.length >= 2) {
    return { source: '', title: pipe[0].trim(), meaning: pipe.slice(1).join(' | ').trim() };
  }
  return { source: '', title: raw, meaning: '' };
}

function reverseSlice(entries, n) {
  if (!entries?.length) return [];
  return entries.slice().reverse().slice(0, n);
}

function hrefFor(postPath, page, entry, index) {
  const slug = String(entry?.slug || '').trim();
  if (page === 'vocabulary-quiz.html' && slug) {
    return `${page}?slug=${encodeURIComponent(slug)}`;
  }
  if (page === 'word-of-the-day.html' && slug) {
    return `${postPath}/${encodeURIComponent(slug)}/`;
  }
  if (slug && postPath) return `${postPath}/${encodeURIComponent(slug)}/`;
  if (slug) return `${page}?slug=${encodeURIComponent(slug)}`;
  return `${page}?index=${index}`;
}

async function fetchEntries(apiPath) {
  const res = await fetch(`${apiBase}${apiPath}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(120000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${apiPath}: ${data.error || res.status}`);
  return Array.isArray(data.entries) ? data.entries : [];
}

function extractImage(message) {
  const raw = String(message || '');
  const m = raw.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function mixNews(boards) {
  const items = [];
  for (const { entries, label, postPath, page, take } of boards) {
    reverseSlice(entries, take).forEach((entry, i) => {
      const origIdx = entries.length - 1 - i;
      const parts = parseTitleParts(entry.title);
      items.push({
        label,
        title: parts.title,
        source: parts.source,
        href: hrefFor(postPath, page, entry, origIdx),
        image: extractImage(entry.message),
        date: entry.date,
      });
    });
  }
  items.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  return items;
}

function newsCardsHtml(items) {
  return items
    .slice(0, 4)
    .map((item) => {
      const cat = item.label + (item.source ? ` · ${item.source}` : '');
      return (
        `<a class="rd-news-card" href="${esc(item.href)}">` +
        `<div class="rd-news-card-img">${item.image ? `<img src="${esc(item.image)}" alt="">` : '[이미지]'}</div>` +
        `<span class="cat">${esc(cat)}</span>` +
        `<span class="title">${esc(item.title)}</span>` +
        `</a>`
      );
    })
    .join('\n');
}

function newsListHtml(items) {
  return items
    .slice(4, 10)
    .map((item) => {
      const cat = item.label + (item.source ? ` · ${item.source}` : '');
      return (
        `<a href="${esc(item.href)}">` +
        `<span class="cat">${esc(cat)}</span>` +
        `<span class="title">${esc(item.title)}</span>` +
        `</a>`
      );
    })
    .join('\n');
}

function phrasesHtml(entries) {
  return reverseSlice(entries, 5)
    .map((entry, i) => {
      const origIdx = entries.length - 1 - i;
      const ko = String(entry.title || '').replace(/\s*영어로\??\s*$/i, '').trim() || '표현';
      const en = entry.slug
        ? String(entry.slug)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .replace(/\bDont\b/g, "Don't")
        : ko;
      return (
        `<a class="rd-phrase-card" href="${esc(hrefFor('popular-voca', 'popular-voca.html', entry, origIdx))}">` +
        `<span class="ko">${esc(ko)}</span>` +
        `<span class="en">${esc(en)}</span>` +
        `</a>`
      );
    })
    .join('\n');
}

function readingColHtml(listHref, label, entries, postPath, page) {
  const items = reverseSlice(entries, 2)
    .map((entry, i) => {
      const origIdx = entries.length - 1 - i;
      const parts = parseTitleParts(entry.title);
      return `<a class="item" href="${esc(hrefFor(postPath, page, entry, origIdx))}">${esc(parts.title)}</a>`;
    })
    .join('\n');
  return `<a class="col-link" href="${esc(listHref)}">${esc(label)} →</a>\n${items}`;
}

function quizBannerHtml(entries) {
  const entry = entries.length ? entries[entries.length - 1] : null;
  let words = '오늘의 단어 퀴즈';
  let href = 'vocabulary-quiz-list.html';
  if (entry) {
    words = String(entry.title || words).replace(/\s*\|\s*/g, ' · ');
    href = hrefFor(null, 'vocabulary-quiz.html', entry, entries.length - 1);
  }
  return (
    `\n          <div>\n` +
    `            <span class="label">TODAY'S QUIZ</span>\n` +
    `            <span class="words">${esc(words)}</span>\n` +
    `            <span class="desc">세 단어, 영어로 알고 있나요? 1분이면 확인할 수 있어요.</span>\n` +
    `          </div>\n` +
    `          <a class="rd-btn" href="${esc(href)}">퀴즈 시작하기</a>\n        `
  );
}

function extractWotdFields(entry) {
  const parts = parseTitleParts(entry.title);
  const word = parts.title || 'Word';
  let meaning = parts.meaning || '';
  const msg = String(entry.message || '');
  const text = stripHtml(msg);
  if (!meaning) {
    const mm =
      text.match(/뜻(?:\(명사\)|\(동사\)|\(형용사\)|\(부사\))?\s*[:：]\s*([^\n.]+)/) ||
      text.match(/명사\s*[:：]\s*([^\n/]+)/);
    if (mm) meaning = mm[1].trim();
  }
  let example = '';
  const ex =
    msg.match(/예문\s*1[\s\S]*?<p[^>]*>([^<]+)<\/p>/i) ||
    msg.match(/wotd-example-heading[\s\S]*?<span[^>]*>[\s\S]*?([A-Za-z][^<]{20,160})/i);
  if (ex) example = stripHtml(ex[1] || ex[0]).slice(0, 180);
  if (!example) {
    const enLine = text.match(/\b([A-Z][^.]{30,160}\.)/);
    if (enLine) example = enLine[1];
  }
  let pos = '';
  if (/명사|noun/i.test(text)) pos = 'noun';
  else if (/동사|verb/i.test(text)) pos = 'verb';
  else if (/형용사|adjective/i.test(text)) pos = 'adjective';
  const image = extractImage(msg);
  const slug = String(entry.slug || word)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-');
  return {
    word,
    meaning: meaning || '오늘의 단어',
    pos,
    example: example || '기사와 예문으로 의미를 확인해 보세요.',
    image: image || (slug ? `/resources/${slug}.jpg` : ''),
    slug,
  };
}

function heroWordHtml(entry, index) {
  const f = extractWotdFields(entry);
  const href = hrefFor('word-of-the-day', 'word-of-the-day.html', entry, index);
  return (
    `\n          <span class="rd-kicker">WORD OF THE DAY · 오늘의 단어</span>\n` +
    `          <h1>${esc(f.word)}</h1>\n` +
    `          <div class="rd-hero-meta">` +
    (f.pos ? `<span class="pos">${esc(f.pos)}</span>` : '') +
    `<span class="meaning">${esc(f.meaning)}</span></div>\n` +
    `          <p class="rd-hero-example">${esc(f.example)}</p>\n` +
    `          <div class="rd-hero-actions">\n` +
    `            <a class="rd-btn rd-btn-solid" href="${esc(href)}">단어 자세히 보기</a>\n` +
    `          </div>\n        `
  );
}

function heroMediaHtml(entry, index) {
  const f = extractWotdFields(entry);
  const href = hrefFor('word-of-the-day', 'word-of-the-day.html', entry, index);
  if (!f.image) {
    return {
      href,
      inner:
        `\n          <div class="rd-hero-media-img is-empty"></div>\n` +
        `          <span class="rd-hero-media-cta">단어 자세히 보기 →</span>\n        `,
    };
  }
  return {
    href,
    inner:
      `\n          <div class="rd-hero-media-img">\n` +
      `            <img src="${esc(f.image)}" alt="${esc(f.word)}" ` +
      `onerror="this.onerror=null;this.closest('.rd-hero-media-img').classList.add('is-empty');this.remove();">\n` +
      `          </div>\n        `,
  };
}

/** nested div-safe: replace element by id including all descendants */
function patchElementById(html, id, innerHtml, tagName = 'div') {
  const openRe = new RegExp(`<${tagName}\\b([^>]*\\bid="${id}"[^>]*)>`, 'i');
  const m = openRe.exec(html);
  if (!m) throw new Error(`Missing #${id}`);
  const startOpen = m.index;
  const startInner = m.index + m[0].length;
  const openTag = tagName.toLowerCase();
  let i = startInner;
  let depth = 1;
  const lower = html.toLowerCase();
  while (i < html.length && depth > 0) {
    const nextOpen = lower.indexOf(`<${openTag}`, i);
    const nextClose = lower.indexOf(`</${openTag}`, i);
    if (nextClose === -1) throw new Error(`Unclosed #${id}`);
    if (nextOpen !== -1 && nextOpen < nextClose) {
      const after = lower[nextOpen + openTag.length + 1];
      if (after === ' ' || after === '>' || after === '\n' || after === '\t' || after === '/') {
        // self-closing or real open
        const slice = html.slice(nextOpen, nextOpen + 200);
        if (!/\/>/.test(slice.match(/^[^>]*>/)?.[0] || '')) depth += 1;
      }
      i = nextOpen + openTag.length + 1;
    } else {
      depth -= 1;
      if (depth === 0) {
        const endClose = lower.indexOf('>', nextClose) + 1;
        return (
          html.slice(0, startOpen) +
          `<${tagName}${m[1]}>` +
          innerHtml +
          `</${tagName}>` +
          html.slice(endClose)
        );
      }
      i = nextClose + openTag.length + 3;
    }
  }
  throw new Error(`Could not patch #${id}`);
}

function patchAnchorById(html, id, href, innerHtml) {
  const openRe = new RegExp(`<a\\b([^>]*\\bid="${id}"[^>]*)>`, 'i');
  const m = openRe.exec(html);
  if (!m) throw new Error(`Missing #${id}`);
  let attrs = m[1].replace(/\s+href="[^"]*"/i, '');
  attrs = `${attrs} href="${esc(href)}"`;
  const startOpen = m.index;
  const startInner = m.index + m[0].length;
  const lower = html.toLowerCase();
  const closeAt = lower.indexOf('</a>', startInner);
  if (closeAt === -1) throw new Error(`Unclosed #${id}`);
  return (
    html.slice(0, startOpen) +
    `<a${attrs}>` +
    innerHtml +
    `</a>` +
    html.slice(closeAt + 4)
  );
}

async function main() {
  console.log('홈 리디자인 정적 링크 … API:', apiBase);
  const [wotd, intl, korea, defense, economy, quiz, phrases, opinions, culture, calm, quotes] =
    await Promise.all([
      fetchEntries('/wordofday'),
      fetchEntries('/guestbook'),
      fetchEntries('/korea-news'),
      fetchEntries('/defense-news'),
      fetchEntries('/economy-news'),
      fetchEntries('/vocabulary-quiz'),
      fetchEntries('/easy-voca'),
      fetchEntries('/opinions'),
      fetchEntries('/culture-voca'),
      fetchEntries('/calm-mind'),
      fetchEntries('/english-quotes'),
    ]);

  const news = mixNews([
    { entries: intl, label: '국제', postPath: 'news-voca', page: 'news-voca.html', take: 3 },
    { entries: korea, label: '한국', postPath: 'korea-news', page: 'korea-news.html', take: 2 },
    { entries: defense, label: '국방', postPath: 'defense-news', page: 'defense-news.html', take: 2 },
    { entries: economy, label: '경제', postPath: 'economy-news', page: 'economy-news.html', take: 3 },
  ]);

  const indexPath = path.join(FRONTEND_ROOT, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  // Fix previously broken quiz wrap (orphan button outside banner)
  html = html.replace(
    /<div class="rd-quiz-banner-wrap">[\s\S]*?<\/div>\s*<\/div>/,
    `<div class="rd-quiz-banner-wrap">
        <div class="rd-quiz-banner" id="rd-quiz-banner">
          <div>
            <span class="label">TODAY'S QUIZ</span>
            <span class="words">오늘의 퀴즈</span>
            <span class="desc">불러오는 중…</span>
          </div>
          <a class="rd-btn" href="vocabulary-quiz-list.html">퀴즈 바로 풀기</a>
        </div>
      </div>`
  );

  html = patchElementById(html, 'rd-news-cards', newsCardsHtml(news));
  html = patchElementById(html, 'rd-news-list', newsListHtml(news));
  html = patchElementById(html, 'rd-phrase-grid', phrasesHtml(phrases));
  html = patchElementById(html, 'rd-quiz-banner', quizBannerHtml(quiz));
  html = patchElementById(
    html,
    'rd-read-opinions',
    readingColHtml('english-opinions-list.html', '오피니언', opinions, 'english-opinions', 'english-opinions.html')
  );
  html = patchElementById(
    html,
    'rd-read-culture',
    readingColHtml('culture-voca-list.html', '컬쳐', culture, 'culture-voca', 'culture-voca.html')
  );
  html = patchElementById(
    html,
    'rd-read-calm',
    readingColHtml('calm-mind-list.html', '마음 다스리는 글', calm, 'calm-mind', 'calm-mind.html')
  );
  html = patchElementById(
    html,
    'rd-read-quotes',
    readingColHtml('english-quotes-list.html', '영어 명언', quotes, 'english-quotes', 'english-quotes.html')
  );

  if (wotd.length) {
    const idx = wotd.length - 1;
    const latest = wotd[idx];
    html = patchElementById(html, 'rd-hero-word', heroWordHtml(latest, idx));
    const media = heroMediaHtml(latest, idx);
    html = patchAnchorById(html, 'rd-hero-media', media.href, media.inner);
  }

  fs.writeFileSync(indexPath, html, 'utf8');
  const linkCount = (html.match(/id="rd-news-cards"[\s\S]*?<\/div>/) || [''])[0].match(/<a /g)?.length || 0;
  console.log(`✅ ${indexPath}`);
  console.log(`   뉴스 카드/리스트 링크 ${news.length}건 중 표시, cards≈${linkCount}, WOTD ${wotd.length ? 'filled' : 'skip'}`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
