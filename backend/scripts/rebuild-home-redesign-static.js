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
  return { source: '', title: raw };
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
    .join('');
}

function newsListHtml(items) {
  return items
    .slice(4, 8)
    .map((item) => {
      const cat = item.label + (item.source ? ` · ${item.source}` : '');
      return (
        `<a href="${esc(item.href)}">` +
        `<span class="cat">${esc(cat)}</span>` +
        `<span class="title">${esc(item.title)}</span>` +
        `</a>`
      );
    })
    .join('');
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
        : ko;
      return (
        `<a class="rd-phrase-card" href="${esc(hrefFor('popular-voca', 'popular-voca.html', entry, origIdx))}">` +
        `<span class="ko">${esc(ko)}</span>` +
        `<span class="en">${esc(en)}</span>` +
        `</a>`
      );
    })
    .join('');
}

function readingColHtml(listHref, label, entries, postPath, page) {
  const items = reverseSlice(entries, 2)
    .map((entry, i) => {
      const origIdx = entries.length - 1 - i;
      const parts = parseTitleParts(entry.title);
      return `<a class="item" href="${esc(hrefFor(postPath, page, entry, origIdx))}">${esc(parts.title)}</a>`;
    })
    .join('');
  return `<a class="col-link" href="${esc(listHref)}">${esc(label)} →</a>${items}`;
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
    `<div>` +
    `<span class="label">TODAY'S QUIZ</span>` +
    `<span class="words">${esc(words)}</span>` +
    `<span class="desc">세 단어, 영어로 알고 있나요? 1분이면 확인할 수 있어요.</span>` +
    `</div>` +
    `<a class="rd-btn" href="${esc(href)}">퀴즈 시작하기</a>`
  );
}

function patchInner(html, id, inner) {
  const re = new RegExp(
    `(<div(?:\\s[^>]*)?\\sid="${id}"(?:\\s[^>]*)?>)([\\s\\S]*?)(</div>)`,
    'i'
  );
  if (!re.test(html)) throw new Error(`Missing #${id}`);
  return html.replace(re, (_m, open, _old, close) => `${open}${inner}${close}`);
}

async function main() {
  console.log('홈 리디자인 정적 링크 … API:', apiBase);
  const [intl, korea, defense, economy, quiz, phrases, opinions, culture, calm, quotes] =
    await Promise.all([
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

  html = patchInner(html, 'rd-news-cards', newsCardsHtml(news));
  html = patchInner(html, 'rd-news-list', newsListHtml(news));
  html = patchInner(html, 'rd-phrase-grid', phrasesHtml(phrases));
  html = patchInner(html, 'rd-quiz-banner', quizBannerHtml(quiz));
  html = patchInner(
    html,
    'rd-read-opinions',
    readingColHtml('english-opinions-list.html', '오피니언', opinions, 'english-opinions', 'english-opinions.html')
  );
  html = patchInner(
    html,
    'rd-read-culture',
    readingColHtml('culture-voca-list.html', '컬쳐', culture, 'culture-voca', 'culture-voca.html')
  );
  html = patchInner(
    html,
    'rd-read-calm',
    readingColHtml('calm-mind-list.html', '마음 다스리는 글', calm, 'calm-mind', 'calm-mind.html')
  );
  html = patchInner(
    html,
    'rd-read-quotes',
    readingColHtml('english-quotes-list.html', '영어 명언', quotes, 'english-quotes', 'english-quotes.html')
  );

  fs.writeFileSync(indexPath, html, 'utf8');
  console.log(`✅ ${indexPath}`);
  console.log(`   뉴스 카드 ${Math.min(4, news.length)} + 리스트 ${Math.max(0, Math.min(4, news.length - 4))} 링크`);
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
