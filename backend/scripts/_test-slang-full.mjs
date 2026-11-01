import { containsBadWords } from '../comment-filter.js';
import fs from 'fs';

const j = JSON.parse(fs.readFileSync(new URL('../../comment-badwords.json', import.meta.url)));
console.log('blockedA', j.blockedA.length);
console.log('has 씨발', j.blockedA.includes('씨발'));
console.log('has lone 18', j.blockedA.includes('18'));
console.log('has lone 69', j.blockedA.includes('69'));

const cases = [
  ['18', true], // 은어 단독 — 패턴 차단 (목록에는 없음)
  ['69', false],
  ['6969', false],
  ['181818', true],
  ['씨발', true],
  ['tlqkf', true],
  ['10새끼', true],
  ['개새끼', true],
  ['hello', false],
  ['2018년', false],
  ['18살', false],
];
let fail = 0;
for (const [t, w] of cases) {
  const g = containsBadWords(t);
  if (g !== w) fail += 1;
  console.log(g === w ? 'OK' : 'FAIL', JSON.stringify(t), g, 'want', w);
}
console.log(fail ? 'FAILS ' + fail : 'ALL PASS');
