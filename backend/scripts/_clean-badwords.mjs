import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const files = [
  path.join(__dirname, '..', 'comment-badwords.json'),
  path.join(__dirname, '..', '..', 'comment-badwords.json'),
];

function cleanTerm(t) {
  return String(t || '')
    .trim()
    .replace(/["',]+/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const seen = new Set();
  const cleaned = [];
  for (const raw of data.blockedA || []) {
    const t = cleanTerm(raw);
    if (!t || t.length < 2 || t.length > 24) continue;
    if (seen.has(t)) continue;
    // drop lone fragments that are too broad for learning comments
    if (['18새', '10새', '개새', '새끼', '미친', '야'].includes(t)) continue;
    seen.add(t);
    cleaned.push(t);
  }
  cleaned.sort((a, b) => a.localeCompare(b, 'ko'));
  data.blockedA = cleaned;
  data._sources = [
    'local curated',
    'Tanat05/korean-profanity-resources slang.csv + LoL filter (curated KEEP_RE subset)',
    'LDNOOBW Korean list (curated)',
  ];
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(path.basename(file), 'blockedA', cleaned.length);
  console.log('has dirty quote?', cleaned.some((t) => t.includes('"')));
  console.log('sample', cleaned.filter((t) => /10새|18|tlqkf|씨발|개새/.test(t)).slice(0, 20));
}
