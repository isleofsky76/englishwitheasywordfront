import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const files = [
  'news-voca-list.html',
  'korea-news-list.html',
  'defense-news-list.html',
  'economy-news-list.html',
  'travel-news-list.html',
  'sports-news-list.html',
  'culture-voca-list.html',
  'ranking-news-list.html',
];

for (const f of files) {
  const p = path.join(ROOT, f);
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/board-list-config\.js\?v=[^"']+/g, 'board-list-config.js?v=20261028cat1');
  fs.writeFileSync(p, c);
  console.log('bumped', f);
}
