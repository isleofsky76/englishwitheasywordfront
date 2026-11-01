/**
 * 문장 피드 DB(onesentence)에 1건 추가 — 누적 표시
 *
 *   cd C:\langchain\backend
 *   node scripts/append-one-sentence.js --word smitten --pos 형용사 --meaning "홀딱 반한, 푹 빠진" --ko "그는…" --en "He was smitten…" --highlight smitten
 *
 * --seed   : 샘플 3건을 한 번에 넣기 (이미 있으면 스킵)
 * --direct : HTTP API 대신 MONGO_URI로 컬렉션에 직접 기록 (Cloudtype 미배포 시)
 * --dry-run: 전송 안 함
 */
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { API_BASE, writeAuthHeaders } from './loadEnv.js';

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

const SEED_ITEMS = [
  {
    word: 'smitten',
    pos: '형용사',
    meaning: '홀딱 반한, 푹 빠진',
    ko: '그는 그녀를 처음 만난 순간부터 홀딱 반했다.',
    en: 'He was smitten with her from the moment they met.',
    highlight: 'smitten',
  },
  {
    word: 'requite',
    pos: '동사',
    meaning: '보답하다, 갚다',
    ko: '그녀는 그의 친절을 잊지 않았고, 몇 년 뒤 그 은혜를 갚았다.',
    en: 'She never forgot his kindness and requited it years later.',
    highlight: 'requited',
  },
  {
    word: 'weathered',
    pos: '형용사',
    meaning: '풍화된, 햇볕·바람에 그을린',
    ko: '바위들이 풍화되어 기이하고 멋진 형태로 변해 있다.',
    en: 'The rocks are weathered into fantastic forms.',
    highlight: 'weathered',
  },
];

const oneSentenceEntrySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    pos: { type: String, default: '' },
    meaning: { type: String, default: '' },
    ko: { type: String, default: '' },
    en: { type: String, required: true },
    highlight: { type: String, default: '' },
    nickname: String,
    password: String,
    date: { type: Date, default: Date.now },
  },
  { collection: 'onesentence' }
);

function seedPasswordFor(word) {
  return `seed_password_onesentence_${String(word || 'x')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')}`;
}

function sameItem(a, b) {
  return (
    String(a.word || '').toLowerCase() === String(b.word || '').toLowerCase() &&
    String(a.en || '').trim() === String(b.en || '').trim()
  );
}

async function listEntriesHttp() {
  const res = await fetch(`${API_BASE}/onesentence`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data.entries || [];
}

async function postEntryHttp(item) {
  const body = {
    word: item.word,
    pos: item.pos || '',
    meaning: item.meaning || '',
    ko: item.ko || '',
    en: item.en,
    highlight: item.highlight || item.word,
    nickname: 'admin',
    password: seedPasswordFor(item.word),
  };
  const res = await fetch(`${API_BASE}/onesentence`, {
    method: 'POST',
    headers: writeAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.detail || `HTTP ${res.status}`);
  return data.entry;
}

async function withDirectDb(fn) {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('.env에 MONGO_URI가 없습니다.');
  const OneSentenceEntry =
    mongoose.models.OneSentenceEntry ||
    mongoose.model('OneSentenceEntry', oneSentenceEntrySchema);
  await mongoose.connect(uri);
  try {
    return await fn(OneSentenceEntry);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

async function listEntriesDirect() {
  return withDirectDb(async (OneSentenceEntry) => {
    return OneSentenceEntry.find().sort({ date: 1, _id: 1 }).lean();
  });
}

async function postEntryDirect(item) {
  return withDirectDb(async (OneSentenceEntry) => {
    const hashedPassword = await bcrypt.hash(seedPasswordFor(item.word), 10);
    const entry = await OneSentenceEntry.create({
      word: String(item.word).trim(),
      pos: String(item.pos || '').trim(),
      meaning: String(item.meaning || '').trim(),
      ko: String(item.ko || '').trim(),
      en: String(item.en).trim(),
      highlight: String(item.highlight || item.word).trim(),
      nickname: 'admin',
      password: hashedPassword,
    });
    return entry.toObject();
  });
}

async function listEntries() {
  if (hasFlag('--direct')) return listEntriesDirect();
  return listEntriesHttp();
}

async function postEntry(item) {
  if (hasFlag('--direct')) return postEntryDirect(item);
  return postEntryHttp(item);
}

async function runSeed() {
  console.log('One Sentence 시드…', hasFlag('--direct') ? 'MONGO direct' : API_BASE);
  const existing = await listEntries();
  console.log(`  기존 ${existing.length}건`);
  let added = 0;
  for (const item of SEED_ITEMS) {
    if (existing.some((e) => sameItem(e, item))) {
      console.log(`  스킵(이미 있음): ${item.word}`);
      continue;
    }
    if (hasFlag('--dry-run')) {
      console.log('  [dry-run] 추가 예정:', item.word);
      continue;
    }
    const entry = await postEntry(item);
    added += 1;
    console.log(`  추가: ${entry.word} (${entry._id})`);
  }
  console.log(`완료. +${added}`);
}

async function runOne() {
  const word = argValue('--word');
  const en = argValue('--en');
  if (!word || !en) {
    console.error('필수: --word, --en  (또는 --seed)');
    process.exit(1);
  }
  const item = {
    word,
    pos: argValue('--pos') || '',
    meaning: argValue('--meaning') || '',
    ko: argValue('--ko') || '',
    en,
    highlight: argValue('--highlight') || word,
  };
  console.log('One Sentence 추가…', hasFlag('--direct') ? 'MONGO direct' : API_BASE);
  if (hasFlag('--dry-run')) {
    console.log('[dry-run]', item);
    return;
  }
  const existing = await listEntries();
  if (existing.some((e) => sameItem(e, item))) {
    console.log('이미 같은 문장이 있어 스킵합니다.');
    return;
  }
  const entry = await postEntry(item);
  console.log('추가됨:', entry.word, entry._id);
  console.log(`현재 총 ${existing.length + 1}건 (대략)`);
}

if (hasFlag('--seed')) {
  runSeed().catch((e) => {
    console.error('오류:', e.message);
    process.exit(1);
  });
} else {
  runOne().catch((e) => {
    console.error('오류:', e.message);
    process.exit(1);
  });
}
