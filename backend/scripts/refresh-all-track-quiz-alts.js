/**
 * vocabulary-quiz 하위 track 퀴즈 HTML 전부 갱신
 * - 기존 복수 정답 유지
 * - 묶음 유사 뜻 + QUIZ_ANSWER_ALTS 보강
 * - track css/js 버전 갱신
 *
 *   cd backend && node scripts/refresh-all-track-quiz-alts.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { enrichExistingTrackWords } from './quiz-answer-alts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_DIR = path.resolve(__dirname, '../../vocabulary-quiz');
const TRACK_VER = '20261029alt1';

function extractTrackWords(html) {
  const m = html.match(/window\.VOCAB_QUIZ_TRACK_WORDS\s*=\s*(\[[\s\S]*?\]);/);
  if (!m) return null;
  try {
    return JSON.parse(m[1]);
  } catch {
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return (${m[1]});`)();
    } catch {
      return null;
    }
  }
}

function rewriteHtml(html, words) {
  let out = html;
  out = out.replace(/vocabulary-quiz-track\.css\?v=[^"']+/g, `vocabulary-quiz-track.css?v=${TRACK_VER}`);
  out = out.replace(/vocabulary-quiz-track\.js\?v=[^"']+/g, `vocabulary-quiz-track.js?v=${TRACK_VER}`);

  const json = JSON.stringify(words, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : `      ${line}`))
    .join('\n');

  const block = `window.VOCAB_QUIZ_TRACK_WORDS = ${json};`;
  if (/window\.VOCAB_QUIZ_TRACK_WORDS\s*=/.test(out)) {
    out = out.replace(/window\.VOCAB_QUIZ_TRACK_WORDS\s*=\s*\[[\s\S]*?\];/, block);
  }
  if (!/유사·대체 표현도 정답/.test(out) && /vq-hint/.test(out)) {
    out = out.replace(
      /(<p class="vq-hint">)([\s\S]*?)(<\/p>)/,
      (full, a, mid, c) => {
        if (/유사·대체/.test(mid)) return full;
        const cleaned = mid.replace(/\s+$/, '');
        return `${a}${cleaned} 유사·대체 표현도 정답으로 인정합니다.${c}`;
      }
    );
  }
  return out;
}

function main() {
  if (!fs.existsSync(QUIZ_DIR)) {
    console.error('vocabulary-quiz 폴더 없음');
    process.exit(1);
  }
  const dirs = fs
    .readdirSync(QUIZ_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let ok = 0;
  let skip = 0;
  for (const name of dirs) {
    const file = path.join(QUIZ_DIR, name, 'index.html');
    if (!fs.existsSync(file)) {
      skip += 1;
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    if (!/VOCAB_QUIZ_TRACK_WORDS/.test(html)) {
      console.log(`- skip (track 아님): ${name}`);
      skip += 1;
      continue;
    }
    const original = extractTrackWords(html);
    if (!original || !original.length) {
      console.log(`- skip (파싱 실패): ${name}`);
      skip += 1;
      continue;
    }
    const merged = enrichExistingTrackWords(original);
    const next = rewriteHtml(html, merged);
    fs.writeFileSync(file, next, 'utf8');
    const before = original.reduce((n, w) => n + (w.ko?.length || 0) + (w.en?.length || 0), 0);
    const after = merged.reduce((n, w) => n + w.ko.length + w.en.length, 0);
    console.log(`✓ ${name}  (${original.length}문항, 정답후보 ${before} → ${after})`);
    ok += 1;
  }
  console.log(`\n완료: 업데이트 ${ok}, 생략 ${skip}`);
}

main();
