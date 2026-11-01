/**
 * Merge curated Korean profanity terms from Tanat05/korean-profanity-resources
 * (slang.csv, LoL filter, LDNOOBW ko) into comment-badwords.json without
 * blindly importing the entire noisy list.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const refDir = path.join(__dirname, '_profanity-ref');
const targets = [
  path.join(__dirname, '..', 'comment-badwords.json'),
  path.join(__dirname, '..', '..', 'comment-badwords.json'),
];

function readLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs
    .readFileSync(file, 'utf8')
    .split(/\r?\n/)
    .map((s) => s.trim().replace(/^"|"$/g, ''))
    .filter(Boolean);
}

/** Too short / high false-positive risk for an English-learning comment UI */
const SKIP = new Set([
  '미친',
  '또라이',
  '고자',
  'oral',
  'ass',
  'sex', // already handled + allowlist
  'sexy',
  'sexy.',
  '18',
  '69',
  '야',
  '개',
  '년',
  '놈',
  '새끼', // alone too broad when combined wrongly - keep with prefixes
]);

/** Prefer strong Korean insults / sexual / hate / numeric-obfuscation */
const KEEP_RE =
  /(씨발|시발|씨팔|시팔|씹|병신|좆|좇|보지|자지|새끼|섹스|야동|포르노|강간|개새|개자|개좆|니기미|빠구|사까|염병|옘병|창녀|호로|후장|짱깨|쪽바리|계집|쌍놈|쌍년|잡년|지랄|닥쳐|꺼져|후레|화냥|애자|로리|몰카|야사|야애|하드코어|스와핑|딸딸|불알|근친|tlqkf|fuck|shit|bitch|porn|hentai|dildo|10새|10놈|10넘|10발|10팔|10섹|108|18놈|18새|18새끼|ㅅㅂ|ㅂㅅ|ㅈㄹ)/i;

function normalizeTerm(t) {
  return String(t || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '');
}

function usable(term) {
  const t = normalizeTerm(term);
  if (!t) return false;
  if (SKIP.has(t)) return false;
  if (t.length < 2 || t.length > 24) return false;
  // pure digits alone: 1818 repeats only (lone 18/69 left to pattern/context rules)
  if (/^\d+$/.test(t) && !/^(?:18){2,}$/.test(t)) return false;
  // require strong-signal patterns to limit false positives on a learning site
  return KEEP_RE.test(t);
}

const lol = readLines(path.join(refDir, 'lol-filter.txt'));
const slang = readLines(path.join(refDir, 'slang.csv')).filter((s) => s !== 'slang,');
const ld = readLines(path.join(refDir, 'ldnoobw-ko.txt'));

const curatedExtra = [
  // numeric / leetspeak variants (LoL-style)
  '10새끼',
  '10새기',
  '10놈',
  '10넘',
  '108새끼',
  '18새끼',
  '18놈',
  '18년놈',
  '씨발놈',
  '씨발년',
  '씨팔',
  '시팔',
  '시발놈',
  '개새끼',
  '개자식',
  '개좆',
  '니기미',
  '빠구리',
  '염병',
  '옘병',
  '창녀',
  '호로',
  '후장',
  '쌍놈',
  '쌍년',
  '잡년',
  '죽일년',
  '지랄하네',
  '지랄병',
  '꺼져',
  '닥쳐',
  '씹새끼',
  '씹창',
  '씹팔',
  '좆같',
  '좆까',
  '좆만',
  '미친새끼',
  '후레아들',
  '화냥년',
  '애자',
  '로리타',
  '몰카',
  '야사',
  '야애니',
  '하드코어',
  '스와핑',
  '사까시',
  '딸딸이',
  '불알',
  '근친',
  '강간',
  '쪽바리',
  '짱깨',
  '계집년',
  'tlqkf',
  'Tlqkf',
  'sikbal',
  'sibal',
  'sipal',
];

const pool = [...lol, ...slang, ...ld, ...curatedExtra];
const picked = [];
const seen = new Set();
for (const raw of pool) {
  const t = normalizeTerm(raw);
  if (!usable(t)) continue;
  if (seen.has(t)) continue;
  seen.add(t);
  picked.push(t);
}

picked.sort((a, b) => a.localeCompare(b, 'ko'));

for (const target of targets) {
  const data = JSON.parse(fs.readFileSync(target, 'utf8'));
  const existing = new Set(
    [...(data.blockedA || []), ...(data.blockedB || []), ...(data.blockedHangulJamo || [])].map(normalizeTerm)
  );
  let added = 0;
  for (const t of picked) {
    if (existing.has(t)) continue;
    // skip soft educational overlaps already allowlisted conceptually
    if (t === '18살' || t === '18세' || t === '18년') continue;
    data.blockedA.push(t);
    existing.add(t);
    added += 1;
  }
  // jamo extras
  const jamoExtra = ['ㅆㅂ', 'ㅅㅂㄹ', 'ㅄㅋ', 'ㅈㄹㄴ'];
  data.blockedHangulJamo = data.blockedHangulJamo || [];
  for (const j of jamoExtra) {
    if (!data.blockedHangulJamo.includes(j)) data.blockedHangulJamo.push(j);
  }
  // keep allowlist educational entries
  const allowExtra = ['18 years old', 'turned 18', 'since 1869', 'route 66', 'area 69'];
  data.allowlist = data.allowlist || [];
  for (const a of allowExtra) {
    if (!data.allowlist.includes(a)) data.allowlist.push(a);
  }
  data._comment =
    (data._comment || '') +
    ' | supplemented from Tanat05/korean-profanity-resources (slang.csv, LoL filter, LDNOOBW ko) curated subset';
  fs.writeFileSync(target, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(path.basename(path.dirname(target)) + '/' + path.basename(target), 'added', added, 'blockedA now', data.blockedA.length);
}

console.log('picked candidates', picked.length);
console.log('sample', picked.slice(0, 40).join(', '));
