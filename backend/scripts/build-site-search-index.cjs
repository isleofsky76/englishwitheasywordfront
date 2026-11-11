#!/usr/bin/env node
/**
 * 사이트 검색용 단어 인덱스 생성
 * 소스: 오늘의 단어(WOTD), 시사영단어 기사 feed/폴더, 연관단어, 용어집
 * 출력: /site-search-index.json
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'site-search-index.json');

const NEWS_DIRS = [
  'news-voca',
  'korea-news',
  'defense-news',
  'economy-news',
  'travel-news',
  'sports-news',
  'us-news',
  'industry-news',
  'culture-voca',
  'health-news',
  'retail-news',
  'ai-news',
  'incident-news',
  'ukraine-news',
  'weather-news',
  'literature-news',
  'politics-news',
  'ranking-news',
];

const LABEL_BY_DIR = {
  'news-voca': '국제',
  'korea-news': '한국',
  'defense-news': '국방',
  'economy-news': '경제',
  'travel-news': '여행',
  'sports-news': '스포츠',
  'us-news': '미국',
  'industry-news': '산업',
  'culture-voca': '컬쳐',
  'health-news': '건강',
  'retail-news': '유통',
  'ai-news': 'AI',
  'incident-news': '사건',
  'ukraine-news': '우크라이나',
  'weather-news': '날씨',
  'literature-news': '문학',
  'politics-news': '정치',
  'ranking-news': '랭킹',
  'word-of-the-day': '단어장',
  'english-synonym': '연관단어',
  glossary: '용어집',
};

function read(file) {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch (_) {
    return '';
  }
}

function stripHtml(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function pushWord(map, item) {
  const word = String(item.word || '').trim();
  if (!word || word.length < 2) return;
  const key = word.toLowerCase();
  const prev = map.get(key);
  const next = {
    word,
    meaning: String(item.meaning || '').trim(),
    label: item.label || '',
    href: item.href || '',
    source: item.source || '',
    tags: item.tags || [],
    searchText: '',
  };
  next.searchText = [next.word, next.meaning, next.label, ...(next.tags || [])]
    .filter(Boolean)
    .join(' ');
  if (!prev) {
    map.set(key, next);
    return;
  }
  if (!prev.meaning && next.meaning) prev.meaning = next.meaning;
  /* WOTD·기사 링크를 용어집보다 우선 */
  const rank = (s) =>
    s === 'word-of-the-day' ? 3 : s === 'english-synonym' ? 2 : s === 'glossary' ? 0 : 1;
  if (!prev.href || rank(next.source) > rank(prev.source)) {
    prev.href = next.href || prev.href;
    if (next.label) prev.label = next.label;
    if (next.source) prev.source = next.source;
    if (next.word) prev.word = next.word;
  }
  if (!prev.label && next.label) prev.label = next.label;
  const tagSet = new Set([...(prev.tags || []), ...(next.tags || [])]);
  prev.tags = [...tagSet];
  if (!prev.source) prev.source = next.source;
  prev.searchText = [prev.word, prev.meaning, prev.label, ...(prev.tags || [])]
    .filter(Boolean)
    .join(' ');
}

function extractMarkedWords(html) {
  const out = [];
  const re = /<mark[^>]*class="[^"]*nv-hl[^"]*"[^>]*>([\s\S]*?)<\/mark>/gi;
  let m;
  while ((m = re.exec(html))) {
    const w = stripHtml(m[1]).replace(/\s+/g, ' ').trim();
    if (w && /[A-Za-z]/.test(w) && w.length < 60) out.push(w);
  }
  return out;
}

function extractCfPairs(html) {
  const out = [];
  const re = /cf\.\s*([^:：<\n]+)\s*[:：]\s*([^<\n(]+)/gi;
  let m;
  while ((m = re.exec(html))) {
    const word = String(m[1] || '').trim();
    const meaning = String(m[2] || '').trim();
    if (word && /[A-Za-z]/.test(word)) out.push({ word, meaning });
  }
  return out;
}

function addFromGlossary(map) {
  const src = read(path.join(ROOT, 'home-glossary-words.js'));
  const re = /\{\s*word:\s*"([^"]+)"\s*,\s*pos:\s*"([^"]*)"\s*,\s*meaning:\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(src))) {
    pushWord(map, {
      word: m[1],
      meaning: m[3],
      label: '용어집',
      href: 'home-glossary.html#w-' + encodeURIComponent(m[1].toLowerCase()),
      source: 'glossary',
      tags: [m[2]].filter(Boolean),
    });
  }
}

function addFromWotd(map) {
  const dir = path.join(ROOT, 'word-of-the-day');
  if (!fs.existsSync(dir)) return;
  for (const slug of fs.readdirSync(dir)) {
    const index = path.join(dir, slug, 'index.html');
    if (!fs.existsSync(index)) continue;
    const html = read(index);
    const title =
      (html.match(/<title>([^|<]+)/i) || [])[1] ||
      slug;
    const word = String(title).trim().split(/\s+/)[0];
    const og =
      (html.match(/og:title"\s+content="([^"]+)"/i) || [])[1] || '';
    let meaning = '';
    const parts = og.split('|');
    if (parts.length > 1) meaning = parts.slice(1).join('|').trim();
    pushWord(map, {
      word: /[A-Za-z]/.test(word) ? word : slug.replace(/-/g, ' '),
      meaning,
      label: '단어장',
      href: 'word-of-the-day/' + slug + '/',
      source: 'word-of-the-day',
      tags: [slug],
    });
  }
}

function addFromSynonym(map) {
  const dir = path.join(ROOT, 'english-synonym');
  if (!fs.existsSync(dir)) return;
  for (const slug of fs.readdirSync(dir)) {
    const index = path.join(dir, slug, 'index.html');
    if (!fs.existsSync(index)) continue;
    const words = slug
      .replace(/-related-words$/i, '')
      .replace(/-synonyms$/i, '')
      .split('-')
      .filter(Boolean);
    const html = read(index);
    const title = ((html.match(/<title>([^|<]+)/i) || [])[1] || '').trim();
    words.forEach((w) => {
      pushWord(map, {
        word: w,
        meaning: title,
        label: '연관단어',
        href: 'english-synonym/' + slug + '/',
        source: 'english-synonym',
        tags: words,
      });
    });
  }
}

function addFromNewsDir(map, dirName) {
  const dir = path.join(ROOT, dirName);
  if (!fs.existsSync(dir)) return;
  const label = LABEL_BY_DIR[dirName] || dirName;
  const feedPath = path.join(dir, 'feed.json');
  if (fs.existsSync(feedPath)) {
    try {
      const feed = JSON.parse(read(feedPath));
      const entries = Array.isArray(feed) ? feed : feed.entries || feed.data || [];
      entries.forEach((entry) => {
        const html = String(entry.message || entry.body || '');
        const href =
          entry.href ||
          (entry.slug ? dirName + '/' + entry.slug + '/' : dirName + '-list.html');
        extractMarkedWords(html).forEach((w) => {
          pushWord(map, {
            word: w,
            meaning: '',
            label,
            href,
            source: dirName,
            tags: [entry.title || entry.slug || ''].filter(Boolean),
          });
        });
        extractCfPairs(html).forEach((pair) => {
          pushWord(map, {
            word: pair.word,
            meaning: pair.meaning,
            label,
            href,
            source: dirName,
            tags: [entry.title || ''].filter(Boolean),
          });
        });
      });
    } catch (e) {
      console.warn('feed parse fail', dirName, e.message);
    }
  }
  for (const slug of fs.readdirSync(dir)) {
    const index = path.join(dir, slug, 'index.html');
    if (!fs.existsSync(index)) continue;
    const html = read(index);
    const href = dirName + '/' + slug + '/';
    extractMarkedWords(html).forEach((w) => {
      pushWord(map, {
        word: w,
        meaning: '',
        label,
        href,
        source: dirName,
        tags: [slug],
      });
    });
    extractCfPairs(html).forEach((pair) => {
      pushWord(map, {
        word: pair.word,
        meaning: pair.meaning,
        label,
        href,
        source: dirName,
        tags: [slug],
      });
    });
  }
}

function main() {
  const map = new Map();
  addFromWotd(map);
  addFromSynonym(map);
  NEWS_DIRS.forEach((d) => addFromNewsDir(map, d));
  addFromGlossary(map);

  const words = [...map.values()].sort((a, b) =>
    a.word.toLowerCase().localeCompare(b.word.toLowerCase())
  );
  const payload = {
    generatedAt: new Date().toISOString(),
    count: words.length,
    words,
  };
  fs.writeFileSync(OUT, JSON.stringify(payload), 'utf8');
  const frontendCopy = path.join(ROOT, 'frontend', 'site-search-index.json');
  try {
    fs.writeFileSync(frontendCopy, JSON.stringify(payload), 'utf8');
  } catch (_) {}
  console.log('Wrote', OUT, 'words=', words.length);
  const smitten = words.find((w) => w.word.toLowerCase() === 'smitten');
  console.log('smitten=', smitten || null);
}

main();
