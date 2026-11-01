import { containsBadWords } from '../comment-filter.js';

const cases = [
  ['18', true],
  [' 18 ', true],
  ['18!', true],
  ['야 18', true],
  ['181818', true],
  ['18새끼', true],
  ['18살', false],
  ['나는 18세', false],
  ['2018년', false],
  ['69', false],
  ['hello', false],
];

let fail = 0;
for (const [t, w] of cases) {
  const g = containsBadWords(t);
  if (g !== w) fail += 1;
  console.log(g === w ? 'OK' : 'FAIL', JSON.stringify(t), g, 'want', w);
}
console.log(fail ? 'FAILS ' + fail : 'ALL PASS');
