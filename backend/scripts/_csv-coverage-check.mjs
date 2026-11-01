import fs from 'fs';

const j = JSON.parse(fs.readFileSync('comment-badwords.json', 'utf8'));
const set = new Set(j.blockedA.map((t) => String(t).toLowerCase()));
const slang = fs
  .readFileSync('backend/scripts/_profanity-ref/slang.csv', 'utf8')
  .split(/\r?\n/)
  .map((s) => s.trim().replace(/["',]/g, '').toLowerCase())
  .filter(Boolean);
const uniq = [...new Set(slang)];
const intentional = new Set(['18', '69', '6969', '18년', '년', '놈', '련', '뇬', 'slang']);
const inList = uniq.filter((t) => set.has(t));
const missing = uniq.filter((t) => !set.has(t) && !intentional.has(t) && t.length > 1);

console.log('slang unique', uniq.length);
console.log('blockedA', j.blockedA.length);
console.log('csv terms in blockedA', inList.length);
console.log('intentional exclusions present in csv', uniq.filter((t) => intentional.has(t)));
console.log('other missing count', missing.length);
console.log('other missing sample', missing.slice(0, 20));
