import { execSync } from 'child_process';
import fs from 'fs';

const files = [
  'korea-news-list.html', 'defense-news-list.html', 'culture-voca-list.html', 'ranking-news-list.html',
  'english-opinions-list.html', 'english-synonym-list.html', 'word-of-the-day-list.html', 'popular-voca-list.html',
  'situational-english-list.html', 'pros-cons-list.html', 'photo-english-list.html', 'calm-mind-list.html',
  'english-quotes-list.html'
];

for (const f of files) {
  let old = '';
  try {
    old = execSync(`git show HEAD:${f}`, { encoding: 'utf8' });
  } catch {
    console.log('no', f);
    continue;
  }
  const desc = (old.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const ogDesc = (old.match(/<meta property="og:description" content="([^"]*)"/) || [])[1] || desc;
  const ogImage = (old.match(/<meta property="og:image" content="([^"]*)"/) || [])[1] || '';
  let html = fs.readFileSync(f, 'utf8');
  if (desc && !/name="description"/.test(html)) {
    html = html.replace('<meta name="robots"', `<meta name="description" content="${desc}">\n    <meta name="robots"`);
  }
  if (ogDesc && !/og:description/.test(html)) {
    html = html.replace(/(<meta property="og:title"[^>]*>)/, `$1\n    <meta property="og:description" content="${ogDesc}">`);
  }
  if (ogImage && !/og:image/.test(html)) {
    html = html.replace(/(<meta property="og:url"[^>]*>)/, `$1\n    <meta property="og:image" content="${ogImage}">`);
  }
  fs.writeFileSync(f, html);
  console.log(f, desc ? 'desc-ok' : 'no-desc');
}
