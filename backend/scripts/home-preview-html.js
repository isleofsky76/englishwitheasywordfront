/**
 * 홈 index.html 섹션별 미리보기 HTML (크롤러용 정적 스냅샷)
 */
import fs from 'fs';
import path from 'path';
import { FRONTEND_ROOT } from './voca-seo.js';

/** 게시판별 최신 N건 — index.html HOME_PREVIEW_SECTIONS 순서 */
export const HOME_PREVIEW_SECTIONS = [
  {
    key: 'synonym',
    listId: 'synonym-preview-list',
    apiPath: '/vocabulary',
    postPage: 'english-synonym.html',
    postPath: 'english-synonym',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'defense',
    listId: 'defense-news-preview-list',
    apiPath: '/defense-news',
    postPage: 'defense-news.html',
    postPath: 'defense-news',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'korea',
    listId: 'korea-news-preview-list',
    apiPath: '/korea-news',
    postPage: 'korea-news.html',
    postPath: 'korea-news',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'news',
    listId: 'news-voca-preview-list',
    apiPath: '/guestbook',
    postPage: 'news-voca.html',
    postPath: 'news-voca',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'culture',
    listId: 'culture-voca-preview-list',
    apiPath: '/culture-voca',
    postPage: 'culture-voca.html',
    postPath: 'culture-voca',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'opinions',
    listId: 'opinions-preview-list',
    apiPath: '/opinions',
    postPage: 'english-opinions.html',
    postPath: 'english-opinions',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'shorts',
    listId: 'shorts-bg-image-preview-list',
    apiPath: '/shorts-bg-image',
    postPage: 'shorts-bg-image.html',
    postPath: 'shorts-bg-image',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'calm',
    listId: 'calm-mind-preview-list',
    apiPath: '/calm-mind',
    postPage: 'calm-mind.html',
    postPath: 'calm-mind',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'quotes',
    listId: 'english-quotes-preview-list',
    apiPath: '/english-quotes',
    postPage: 'english-quotes.html',
    postPath: 'english-quotes',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'wordofday',
    listId: 'wordofday-preview-list',
    apiPath: '/wordofday',
    postPage: 'word-of-the-day.html',
    postPath: 'word-of-the-day',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'quiz',
    listId: 'vocabulary-quiz-preview-list',
    apiPath: '/vocabulary-quiz',
    postPage: 'vocabulary-quiz.html',
    postPath: null,
    emptyMessage: '등록된 퀴즈가 없습니다.',
    limit: 5,
    quiz: true,
  },
  {
    key: 'easy',
    listId: 'easy-voca-preview-list',
    apiPath: '/easy-voca',
    postPage: 'popular-voca.html',
    postPath: 'popular-voca',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'situational',
    listId: 'situational-english-preview-list',
    apiPath: '/situational-english',
    postPage: 'situational-english.html',
    postPath: 'situational-english',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'cooking',
    listId: 'cooking-voca-preview-list',
    apiPath: '/cooking-voca',
    postPage: 'cooking-voca.html',
    postPath: 'cooking-voca',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'ranking',
    listId: 'ranking-news-preview-list',
    apiPath: '/ranking-news',
    postPage: 'ranking-news.html',
    postPath: 'ranking-news',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'photo',
    listId: 'photo-english-preview-list',
    apiPath: '/photo-english',
    postPage: 'photo-english.html',
    postPath: 'photo-english',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'proscons',
    listId: 'pros-cons-preview-list',
    apiPath: '/pros-cons',
    postPage: 'pros-cons.html',
    postPath: 'pros-cons',
    emptyMessage: '게시글이 없습니다.',
    limit: 5,
  },
  {
    key: 'best',
    listId: 'best-views-preview-list',
    kind: 'best',
    emptyMessage: '게시글이 없습니다.',
    limit: 8,
  },
  {
    key: 'recent',
    listId: 'recent-updates-preview-list',
    kind: 'recent',
    emptyMessage: '게시글이 없습니다.',
    limit: 8,
  },
];

/** Best / 최신용 — home-board-preview.js getPreviewBoards + 영어 명언 */
const COMBINED_BOARDS = [
  { path: '/wordofday', page: 'word-of-the-day.html', postPath: 'word-of-the-day', label: '단어장' },
  { path: '/guestbook', page: 'news-voca.html', postPath: 'news-voca', label: '국제' },
  { path: '/defense-news', page: 'defense-news.html', postPath: 'defense-news', label: '국방뉴스' },
  { path: '/korea-news', page: 'korea-news.html', postPath: 'korea-news', label: '한국뉴스' },
  { path: '/vocabulary-quiz', page: 'vocabulary-quiz.html', label: '퀴즈', quiz: true },
  { path: '/vocabulary', page: 'english-synonym.html', postPath: 'english-synonym', label: '연관단어' },
  { path: '/opinions', page: 'english-opinions.html', postPath: 'english-opinions', label: '오피니언' },
  { path: '/shorts-bg-image', page: 'shorts-bg-image.html', postPath: 'shorts-bg-image', label: '신문읽는 이미지' },
  { path: '/calm-mind', page: 'calm-mind.html', postPath: 'calm-mind', label: '마음 다스리는 글' },
  { path: '/english-quotes', page: 'english-quotes.html', postPath: 'english-quotes', label: '영어 명언' },
  { path: '/easy-voca', page: 'popular-voca.html', postPath: 'popular-voca', label: '이럴 땐 영어로?' },
  { path: '/situational-english', page: 'situational-english.html', postPath: 'situational-english', label: '상황' },
  { path: '/cooking-voca', page: 'cooking-voca.html', postPath: 'cooking-voca', label: '요리' },
  { path: '/culture-voca', page: 'culture-voca.html', postPath: 'culture-voca', label: '컬쳐' },
  { path: '/ranking-news', page: 'ranking-news.html', postPath: 'ranking-news', label: '랭킹' },
  { path: '/photo-english', page: 'photo-english.html', postPath: 'photo-english', label: '포토' },
  { path: '/pros-cons', page: 'pros-cons.html', postPath: 'pros-cons', label: 'Pros & Cons' },
];

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatMetaStatsHtml(views, likes) {
  const viewCount = Number(views) || 0;
  const likeCount = parseInt(likes, 10) || 0;
  return (
    '<span class="preview-meta-stats preview-meta-stats--hidden">' +
    `<span class="preview-views"><span class="preview-views-icon" aria-hidden="true">👁</span> ${viewCount}</span>` +
    '<span class="preview-sep preview-sep--stats" aria-hidden="true"> </span>' +
    `<span class="preview-likes"><span class="preview-like-heart" aria-hidden="true">♥</span> ${likeCount}</span>` +
    '</span>'
  );
}

function buildPreviewTitleHtml(title, fallbackLabel) {
  const rawTitle = String(title || '제목 없음');
  const sourceMatch = rawTitle.match(/^\[([^\]]+)\]\s*(.*)$/);
  const source = sourceMatch ? sourceMatch[1].trim() : String(fallbackLabel || '').trim();
  let mainTitle = sourceMatch ? (sourceMatch[2] || '').trim() : rawTitle;
  if (!mainTitle) mainTitle = '제목 없음';
  const titleParts = [];
  if (source) {
    titleParts.push(`<span class="preview-source">${escapeHtml(source)}</span>`);
    titleParts.push('<span class="preview-sep" aria-hidden="true"> | </span>');
  }
  titleParts.push(`<span class="preview-title-text">${escapeHtml(mainTitle)}</span>`);
  return titleParts.join('');
}

export function buildPreviewRow(title, views, href, likes) {
  const titleHtml = buildPreviewTitleHtml(title, '');
  const safeHref = String(href).replace(/"/g, '&quot;');
  return (
    `<li class="preview-card"><a href="${safeHref}">` +
    '<span class="preview-body">' +
    `<span class="preview-title">${titleHtml}</span>` +
    formatMetaStatsHtml(views, likes) +
    '</span>' +
    '<span class="preview-arrow" aria-hidden="true">›</span>' +
    '</a></li>'
  );
}

function buildBestPreviewRow(label, title, views, href, likes) {
  const titleHtml = buildPreviewTitleHtml(title, label);
  const safeHref = String(href).replace(/"/g, '&quot;');
  return (
    `<li class="preview-card"><a href="${safeHref}">` +
    '<span class="preview-body">' +
    `<span class="preview-title">${titleHtml}</span>` +
    formatMetaStatsHtml(views, likes) +
    '</span>' +
    '<span class="preview-arrow" aria-hidden="true">›</span>' +
    '</a></li>'
  );
}

function buildRecentPreviewRow(label, title, views, href, isNew, likes) {
  const titleHtml = buildPreviewTitleHtml(title, label);
  const newHtml = isNew ? '<span class="preview-new">NEW</span>' : '';
  const safeHref = String(href).replace(/"/g, '&quot;');
  return (
    `<li class="preview-card preview-card--recent"><a href="${safeHref}">` +
    '<span class="preview-body">' +
    (newHtml ? `<span class="preview-meta">${newHtml}</span>` : '') +
    `<span class="preview-title">${titleHtml}</span>` +
    formatMetaStatsHtml(views, likes) +
    '</span>' +
    '<span class="preview-arrow" aria-hidden="true">›</span>' +
    '</a></li>'
  );
}

export function buildPreviewHref(entry, postPage, origIdx, postPath, quiz) {
  const slug = entry && String(entry.slug || '').trim();
  if (quiz && slug) {
    return `${postPage}?slug=${encodeURIComponent(slug)}`;
  }
  if (slug && postPath) {
    return `${postPath}/${encodeURIComponent(slug)}/`;
  }
  if (slug) return `${postPage}?slug=${encodeURIComponent(slug)}`;
  return `${postPage}?index=${origIdx}`;
}

function parseEntries(data) {
  if (Array.isArray(data)) return data;
  if (data && data.entries) return data.entries;
  if (data && data.data) return Array.isArray(data.data) ? data.data : [];
  return [];
}

function parseEntrySortTime(entry, index) {
  if (entry?.date) {
    const time = new Date(entry.date).getTime();
    if (!Number.isNaN(time)) return time;
  }
  return index;
}

export function buildSectionPreviewListHtml(entries, section) {
  const total = entries.length;
  const reversed = entries.slice().reverse();
  const preview = reversed.slice(0, section.limit || 5);
  if (preview.length === 0) {
    return `<ul class="preview-list"><li class="preview-empty">${escapeHtml(section.emptyMessage)}</li></ul>`;
  }
  const rows = preview.map((entry, idx) => {
    const origIdx = total - 1 - idx;
    const href = buildPreviewHref(entry, section.postPage, origIdx, section.postPath, section.quiz);
    return buildPreviewRow(entry.title, entry.views, href, entry.likes);
  });
  return `<ul class="preview-list">${rows.join('')}</ul>`;
}

async function fetchJson(apiBase, apiPath) {
  const res = await fetch(`${apiBase.replace(/\/$/, '')}${apiPath}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(120000),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${apiPath}: ${data.error || `HTTP ${res.status}`}`);
  return data;
}

export async function fetchCombinedPreviewItems(apiBase) {
  const results = await Promise.allSettled(
    COMBINED_BOARDS.map(async (board) => {
      const data = await fetchJson(apiBase, board.path);
      return { board, entries: parseEntries(data) };
    })
  );

  const combined = [];
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const { board, entries } = result.value;
    entries.forEach((entry, index) => {
      combined.push({
        label: board.label,
        title: entry.title,
        views: entry.views || 0,
        likes: entry.likes || 0,
        date: entry.date,
        href: buildPreviewHref(entry, board.page, index, board.postPath, board.quiz),
        sortTime: parseEntrySortTime(entry, index),
      });
    });
  }
  return combined;
}

function buildCombinedListHtml(items, section) {
  if (!items.length) {
    return `<ul class="preview-list"><li class="preview-empty">${escapeHtml(section.emptyMessage)}</li></ul>`;
  }
  let rows;
  if (section.kind === 'best') {
    rows = items.map((item) =>
      buildBestPreviewRow(item.label, item.title, item.views, item.href, item.likes)
    );
  } else {
    rows = items.map((item, idx) =>
      buildRecentPreviewRow(item.label, item.title, item.views, item.href, idx < 2, item.likes)
    );
  }
  return `<ul class="preview-list">${rows.join('')}</ul>`;
}

export async function fetchSectionPreviewHtml(apiBase, section, combinedCache) {
  if (section.kind === 'best' || section.kind === 'recent') {
    const combined = combinedCache || (await fetchCombinedPreviewItems(apiBase));
    const max = section.limit || 8;
    let sorted;
    if (section.kind === 'best') {
      sorted = combined.slice().sort((a, b) => {
        const viewDiff = (b.views || 0) - (a.views || 0);
        if (viewDiff !== 0) return viewDiff;
        return b.sortTime - a.sortTime;
      });
    } else {
      sorted = combined.slice().sort((a, b) => b.sortTime - a.sortTime);
    }
    return buildCombinedListHtml(sorted.slice(0, max), section);
  }

  const data = await fetchJson(apiBase, section.apiPath);
  return buildSectionPreviewListHtml(parseEntries(data), section);
}

export function patchIndexHomePreview(sectionKey, listInnerHtml) {
  const section = HOME_PREVIEW_SECTIONS.find((s) => s.key === sectionKey);
  if (!section) throw new Error(`Unknown section: ${sectionKey}`);

  const indexPath = path.join(FRONTEND_ROOT, 'index.html');
  let html = fs.readFileSync(indexPath, 'utf8');

  const openRe = new RegExp(`(<div id="${section.listId}"[^>]*)(>)`, 'i');
  if (!openRe.test(html)) throw new Error(`Missing #${section.listId} in index.html`);

  html = html.replace(openRe, (_m, before, gt) => {
    const cleaned = before.replace(/\s*data-home-preview-static="1"/g, '');
    return `${cleaned} data-home-preview-static="1"${gt}`;
  });

  const blockRe = new RegExp(
    `(<div id="${section.listId}"[^>]*>\\s*)` +
      `(?:<!-- home-preview:${section.key} START -->[\\s\\S]*?<!-- home-preview:${section.key} END -->|[\\s\\S]*?)` +
      `(\\s*</div>)`,
    'i'
  );
  if (!blockRe.test(html)) {
    throw new Error(`Could not patch #${section.listId}`);
  }
  html = html.replace(blockRe, (_m, open, close) => {
    return (
      `${open}<!-- home-preview:${section.key} START -->\n` +
      `${listInnerHtml}\n` +
      `<!-- home-preview:${section.key} END -->${close}`
    );
  });
  fs.writeFileSync(indexPath, html, 'utf8');
  return indexPath;
}
