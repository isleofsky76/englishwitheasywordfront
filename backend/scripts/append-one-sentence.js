/**
 * one-sentence-data.js 피드에 항목 1개 추가 (배열 맨 아래 = 다음 번호)
 *
 *   cd C:\langchain\backend
 *   node scripts/append-one-sentence.js --word smitten --pos 형용사 --meaning "홀딱 반한, 푹 빠진" --ko "그는…" --en "He was smitten…" --highlight smitten
 *
 * --prepend  : 맨 위(001)에 삽입
 * --dry-run  : 파일 미기록, 미리보기만
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_PATH = path.resolve(__dirname, '..', '..', 'one-sentence-data.js');

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  const next = process.argv[i + 1];
  if (!next || next.startsWith('--')) return null;
  return next;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

function jsString(s) {
  return JSON.stringify(String(s ?? ''));
}

function buildEntryObject({ word, pos, meaning, ko, en, highlight }) {
  return (
    '  {\n' +
    `    word: ${jsString(word)},\n` +
    `    pos: ${jsString(pos)},\n` +
    `    meaning: ${jsString(meaning)},\n` +
    `    ko: ${jsString(ko)},\n` +
    `    en: ${jsString(en)},\n` +
    `    highlight: ${jsString(highlight || word)}\n` +
    '  }'
  );
}

function main() {
  const word = argValue('--word');
  const pos = argValue('--pos') || '';
  const meaning = argValue('--meaning') || '';
  const ko = argValue('--ko') || '';
  const en = argValue('--en');
  const highlight = argValue('--highlight') || word || '';
  const prepend = hasFlag('--prepend');
  const dryRun = hasFlag('--dry-run');

  if (!word || !en) {
    console.error('필수: --word, --en');
    process.exit(1);
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const marker = 'window.ONE_SENTENCE_FEED = [';
  const start = raw.indexOf(marker);
  if (start === -1) {
    console.error('ONE_SENTENCE_FEED 배열을 찾지 못했습니다:', DATA_PATH);
    process.exit(1);
  }
  const arrStart = start + marker.length;
  const end = raw.indexOf('\n];', arrStart);
  if (end === -1) {
    console.error('배열 끝을 찾지 못했습니다.');
    process.exit(1);
  }

  const inside = raw.slice(arrStart, end).trim();
  const entry = buildEntryObject({ word, pos, meaning, ko, en, highlight });
  let nextInside;
  if (!inside) {
    nextInside = '\n' + entry + '\n';
  } else if (prepend) {
    nextInside = '\n' + entry + ',\n' + inside.replace(/^\n?/, '') + (inside.endsWith('\n') ? '' : '\n');
  } else {
    const trimmed = inside.replace(/,?\s*$/, '');
    nextInside = trimmed + ',\n' + entry + '\n';
  }

  const out = raw.slice(0, arrStart) + nextInside + raw.slice(end);
  console.log(prepend ? '맨 위(001)에 추가:' : '맨 아래에 추가:');
  console.log(entry);

  if (dryRun) {
    console.log('[dry-run] 파일 미기록');
    return;
  }
  fs.writeFileSync(DATA_PATH, out, 'utf8');
  console.log('저장:', DATA_PATH);
  console.log('배포: git add one-sentence-data.js && git commit -m "Add one-sentence: ' + word + '" && git push');
}

main();
