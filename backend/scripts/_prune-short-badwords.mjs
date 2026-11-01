import fs from 'fs';

const files = ['backend/comment-badwords.json', 'comment-badwords.json'];
/** CSV 통째 반영 시 오탐 심한 1글자·과도하게 짧은 조각 제거 (은어 18은 패턴으로 차단) */
const DROP = new Set([
  '년',
  '놈',
  '련',
  '뇬',
  '새',
  '개',
  '야',
  '18년', // 연도·기간 문맥 — 단독 18은 패턴 차단
]);

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const before = data.blockedA.length;
  data.blockedA = data.blockedA.filter((t) => {
    const x = String(t || '').trim();
    if (!x) return false;
    if (DROP.has(x.toLowerCase()) || DROP.has(x)) return false;
    if (x.length === 1) return false;
    return true;
  });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log(file, before, '->', data.blockedA.length);
}
