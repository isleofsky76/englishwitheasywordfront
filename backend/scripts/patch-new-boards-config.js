/**
 * new-boards.json 기준으로 board-list / SEO / nav / home / netlify 패치
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../..');
const boards = JSON.parse(fs.readFileSync(path.join(__dirname, 'new-boards.json'), 'utf8'));

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
}
function write(rel, content) {
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8');
  console.log('patched', rel);
}

function mustReplace(c, from, to, label) {
  if (!c.includes(from)) {
    throw new Error(`replace failed: ${label}\n--- expected snippet ---\n${from.slice(0, 120)}`);
  }
  return c.split(from).join(to);
}

function patchBoardListConfig() {
  let c = read('board-list-config.js');
  if (c.includes("'us-news'")) {
    console.log('board-list-config.js already has us-news');
    return;
  }

  const tabLines = boards
    .map((b) => `    { key: '${b.key}', label: '${b.label}', href: '${b.key}-list.html' },`)
    .join('\n');
  c = mustReplace(
    c,
    "    { key: 'sports-news', label: '스포츠', href: 'sports-news-list.html' },",
    `    { key: 'sports-news', label: '스포츠', href: 'sports-news-list.html' },\n${tabLines}`,
    'NEWS_TABS sports'
  );

  const blocks = boards
    .map(
      (b) => `    '${b.key}': {
      key: '${b.key}',
      labelEn: '${b.labelEn}',
      title: '${b.title}',
      description: '${b.description}',
      tabLabel: '${b.label}',
      categoryLabel: '${b.label}',
      listPage: '${b.key}-list.html',
      postPage: '${b.key}.html',
      postPath: '${b.key}',
      board: '${b.key}',
      apiPath: '/${b.key}',
      navGroup: 'news',
      tabs: NEWS_TABS,
      articleLayout: 'auto',
      breadcrumbParent: { label: '뉴스 영어', href: 'news-voca-list.html' }
    }`
    )
    .join(',\n');

  c = mustReplace(
    c,
    "    'culture-voca': {\n      key: 'culture-voca',",
    `${blocks},\n    'culture-voca': {\n      key: 'culture-voca',`,
    'BOARDS culture-voca'
  );
  write('board-list-config.js', c);
}

function patchVocaSeo() {
  let c = read('backend/scripts/voca-seo.js');
  if (c.includes("'us-news'")) {
    console.log('voca-seo.js already has us-news');
    return;
  }

  const seoBlocks = boards
    .map(
      (b) => `  '${b.key}': {
    label: '${b.labelFull}',
    cssFile: 'news-voca.css',
    cssVersion: '20261020rd21',
    jsFile: '${b.key}.js',
    jsVersion: '20261028cat1',
    listHtml: '${b.key}-list.html',
  }`
    )
    .join(',\n');
  c = mustReplace(
    c,
    "  'korea-news': {\n    label: '한국뉴스',",
    `${seoBlocks},\n  'korea-news': {\n    label: '한국뉴스',`,
    'BOARD_SEO korea'
  );

  const htmlLines = boards.map((b) => `  '${b.key}': '${b.key}.html',`).join('\n');
  c = mustReplace(
    c,
    "  'korea-news': 'korea-news.html',",
    `${htmlLines}\n  'korea-news': 'korea-news.html',`,
    'BOARD_HTML korea'
  );

  const apiLines = boards
    .map((b) => `  { apiPath: '/${b.key}', boardPath: '${b.key}', label: '${b.labelFull}' },`)
    .join('\n');
  c = mustReplace(
    c,
    "  { apiPath: '/korea-news', boardPath: 'korea-news', label: '한국뉴스' },",
    `${apiLines}\n  { apiPath: '/korea-news', boardPath: 'korea-news', label: '한국뉴스' },`,
    'BOARD_API korea'
  );

  const pathLines = boards.map((b) => `  '${b.key}',`).join('\n');
  c = mustReplace(
    c,
    "  'korea-news',\n  'shorts-bg-image',",
    `${pathLines}\n  'korea-news',\n  'shorts-bg-image',`,
    'BOARD_SITEMAP_PATH korea'
  );

  const sitemapLines = boards
    .map((b) => `  { loc: \`\${SITE_ORIGIN}/${b.key}-list.html\`, priority: '0.9' },`)
    .join('\n');
  c = mustReplace(
    c,
    '  { loc: `${SITE_ORIGIN}/korea-news-list.html`, priority: \'0.9\' },',
    `${sitemapLines}\n  { loc: \`\${SITE_ORIGIN}/korea-news-list.html\`, priority: '0.9' },`,
    'SITEMAP_STATIC korea'
  );

  write('backend/scripts/voca-seo.js', c);
}

function patchSiteMasthead() {
  let c = read('site-masthead.js');
  if (c.includes('us-news-list.html')) {
    console.log('site-masthead.js already has us-news');
    return;
  }

  const primaryPages = boards
    .map((b) => `        '${b.key}-list.html', '${b.key}.html',`)
    .join('\n');
  c = mustReplace(
    c,
    "        'sports-news-list.html', 'sports-news.html',",
    `        'sports-news-list.html', 'sports-news.html',\n${primaryPages}`,
    'PRIMARY_NAV pages'
  );

  const extraItems = boards
    .map(
      (b) =>
        `    { href: '${b.key}-list.html', label: '${b.labelFull}', tone: 'news', pages: ['${b.key}-list.html', '${b.key}.html'] },`
    )
    .join('\n');
  c = mustReplace(
    c,
    "    { href: 'sports-news-list.html', label: '스포츠뉴스', tone: 'news', pages: ['sports-news-list.html', 'sports-news.html'] },",
    `    { href: 'sports-news-list.html', label: '스포츠뉴스', tone: 'news', pages: ['sports-news-list.html', 'sports-news.html'] },\n${extraItems}`,
    'EXTRA_NAV sports'
  );

  const folderMap = boards.map((b) => `      '${b.key}': '${b.key}.html',`).join('\n');
  c = mustReplace(
    c,
    "      'sports-news': 'sports-news.html',",
    `      'sports-news': 'sports-news.html',\n${folderMap}`,
    'folderMap sports'
  );

  write('site-masthead.js', c);
}

function patchIndexHtml() {
  let c = read('index.html');
  if (c.includes('us-news-list.html')) {
    console.log('index.html already has us-news');
    return;
  }
  const chips = boards
    .map((b) => `              <a class="rd-chip" href="${b.key}-list.html">${b.label}</a>`)
    .join('\n');
  c = mustReplace(
    c,
    '              <a class="rd-chip" href="sports-news-list.html">스포츠</a>',
    `              <a class="rd-chip" href="sports-news-list.html">스포츠</a>\n${chips}`,
    'index chips'
  );
  write('index.html', c);
}

function patchHomePreview() {
  let c = read('home-board-preview.js');
  if (c.includes('/us-news')) {
    console.log('home-board-preview.js already has us-news');
    return;
  }
  const boardsLines = boards
    .map(
      (b) =>
        `      { path: '/${b.key}', page: '${b.key}.html', postPath: '${b.key}', label: '${b.labelFull}' },`
    )
    .join('\n');
  c = mustReplace(
    c,
    "      { path: '/sports-news', page: 'sports-news.html', postPath: 'sports-news', label: '스포츠뉴스' },",
    `      { path: '/sports-news', page: 'sports-news.html', postPath: 'sports-news', label: '스포츠뉴스' },\n${boardsLines}`,
    'home boards'
  );

  const feedLines = boards.map((b) => `    '/${b.key}': '/${b.key}/feed.json'`).join(',\n');
  c = mustReplace(
    c,
    "    '/sports-news': '/sports-news/feed.json'\n  };",
    `    '/sports-news': '/sports-news/feed.json',\n${feedLines}\n  };`,
    'static feeds'
  );
  write('home-board-preview.js', c);
}

function patchStripList() {
  let c = read('backend/scripts/strip-list-admin-forms.js');
  if (c.includes("'us-news-list.html'")) return;
  const lines = boards.map((b) => `  '${b.key}-list.html',`).join('\n');
  c = mustReplace(
    c,
    "  'sports-news-list.html',",
    `  'sports-news-list.html',\n${lines}`,
    'strip list'
  );
  write('backend/scripts/strip-list-admin-forms.js', c);
}

function patchNetlify() {
  let c = read('netlify.toml');
  if (c.includes('/us-news/*')) return;
  const redirects = boards
    .map(
      (b) => `
[[redirects]]
  from = "/${b.key}/*"
  to = "/${b.key}.html"
  status = 200
  force = false`
    )
    .join('\n');
  c = mustReplace(
    c,
    `[[redirects]]
  from = "/sports-news/*"
  to = "/sports-news.html"
  status = 200
  force = false`,
    `[[redirects]]
  from = "/sports-news/*"
  to = "/sports-news.html"
  status = 200
  force = false
${redirects}`,
    'netlify redirects'
  );
  write('netlify.toml', c);
}

function bumpSitemapStatic() {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) return;
  let c = fs.readFileSync(sitemapPath, 'utf8');
  let added = 0;
  for (const b of boards) {
    const loc = `https://englisheasystudy.com/${b.key}-list.html`;
    if (c.includes(loc)) continue;
    const entry = `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    if (!c.includes('</urlset>')) throw new Error('sitemap missing urlset');
    c = c.replace('</urlset>', `${entry}</urlset>`);
    added++;
  }
  if (added) {
    fs.writeFileSync(sitemapPath, c, 'utf8');
    console.log('patched sitemap.xml (+', added, 'list urls)');
  }
}

try {
  patchBoardListConfig();
  patchVocaSeo();
  patchSiteMasthead();
  patchIndexHtml();
  patchHomePreview();
  patchStripList();
  patchNetlify();
  bumpSitemapStatic();
  console.log('done');
} catch (e) {
  console.error(e.message);
  process.exitCode = 1;
}
