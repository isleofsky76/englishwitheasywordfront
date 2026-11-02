/**
 * vocabulary-quiz SEO가 입력형(track)인지 검사.
 * 클릭 공개형·API 셸(vocabulary-quiz.js)이 있으면 실패.
 *
 *   cd backend && npm run assert:quiz-track
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_DIR = path.resolve(__dirname, '../../vocabulary-quiz');

const FORBIDDEN = [
  {
    re: /src=["'][^"']*vocabulary-quiz\.js/i,
    why: 'API 셸(vocabulary-quiz.js) — 정적 track 페이지여야 함',
  },
  { re: /quiz-reveal-/i, why: '클릭 공개형(quiz-reveal) 마크업' },
  {
    re: /class=["'][^"']*\brd-quiz\b(?!-track)/i,
    why: '구형 body.rd-quiz (rd-quiz-track 필요)',
  },
];

const REQUIRED = [
  { re: /VOCAB_QUIZ_TRACK_WORDS/, why: 'VOCAB_QUIZ_TRACK_WORDS' },
  { re: /vocabulary-quiz-track\.js/i, why: 'vocabulary-quiz-track.js' },
  { re: /id=["']m-en["']/, why: '영어 → 한글 버튼' },
  { re: /id=["']m-ko["']/, why: '한글 → 영어 버튼' },
];

function listIndexHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => path.join(dir, d.name, 'index.html'))
    .filter((p) => fs.existsSync(p));
}

function main() {
  const files = listIndexHtml(QUIZ_DIR);
  if (!files.length) {
    console.error(`[assert-quiz-track] ${QUIZ_DIR} 에 퀴즈 페이지가 없습니다.`);
    process.exit(1);
  }

  const failures = [];
  for (const file of files) {
    const html = fs.readFileSync(file, 'utf8');
    const slug = path.basename(path.dirname(file));
    for (const f of FORBIDDEN) {
      if (f.re.test(html)) failures.push(`${slug}: 금지 — ${f.why}`);
    }
    for (const r of REQUIRED) {
      if (!r.re.test(html)) failures.push(`${slug}: 누락 — ${r.why}`);
    }
  }

  if (failures.length) {
    console.error('[assert-quiz-track] 실패 — track 입력 퀴즈만 허용됩니다.\n');
    failures.forEach((line) => console.error(`  - ${line}`));
    console.error(`\n복구: cd backend && npm run regenerate:quiz-seo`);
    process.exit(1);
  }

  console.log(`[assert-quiz-track] OK — ${files.length}개 퀴즈 모두 track 형식`);
}

main();
