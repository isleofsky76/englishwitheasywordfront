/**
 * Import full Tanat05 slang.csv into comment-badwords.json blockedA.
 * Keeps lone 18 / 69 / 6969 out (context-review / learning content).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const slangPath = path.join(__dirname, '_profanity-ref', 'slang.csv');
const targets = [
  path.join(__dirname, '..', 'comment-badwords.json'),
  path.join(__dirname, '..', '..', 'comment-badwords.json'),
];

/**
 * 목록 자동차단에서 제외:
 * - 단독 18 → comment-filter 패턴으로 은어 차단 (18살/2018은 예외)
 * - 69/6969 → 문맥형, 조합만 패턴 차단
 * - 1글자·과단 조각 → hello/문장 오탐 방지
 */
const EXCLUDE_EXACT = new Set([
  '18',
  '69',
  '6969',
  '18년',
  '년',
  '놈',
  '련',
  '뇬',
  'slang',
  'slang,',
]);

function cleanTerm(t) {
  return String(t || '')
    .trim()
    .replace(/["']/g, '')
    .replace(/,+$/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

function loadSlang() {
  if (!fs.existsSync(slangPath)) {
    throw new Error('Missing ' + slangPath + ' — download slang.csv first');
  }
  return fs
    .readFileSync(slangPath, 'utf8')
    .split(/\r?\n/)
    .map(cleanTerm)
    .filter((t) => t && t.length >= 1 && t.length <= 40)
    .filter((t) => !EXCLUDE_EXACT.has(t));
}

const slang = [...new Set(loadSlang())];
console.log('slang.csv cleaned unique:', slang.length);

for (const target of targets) {
  const data = JSON.parse(fs.readFileSync(target, 'utf8'));
  const seen = new Set();
  const merged = [];

  function add(raw) {
    const t = cleanTerm(raw);
    if (!t || EXCLUDE_EXACT.has(t)) return;
    if (seen.has(t)) return;
    seen.add(t);
    merged.push(t);
  }

  for (const t of data.blockedA || []) add(t);
  for (const t of slang) add(t);

  merged.sort((a, b) => a.localeCompare(b, 'ko'));
  data.blockedA = merged;
  data._sources = [
    'local curated',
    'Tanat05/korean-profanity-resources slang.csv (full, excluding lone 18/69/6969)',
    'Tanat05 LoL filter + LDNOOBW ko (prior curated merge)',
  ];
  data._comment =
    'A=자동차단(slang.csv 전체 포함). 단독 18/69/6969는 제외하고 반복·조합은 comment-filter 패턴으로 차단.';

  fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(path.basename(target), 'blockedA now', merged.length);
}
