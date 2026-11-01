/**
 * 문장 피드(onesentence) AI 자동 추가
 *
 * 사이트(오늘의 단어 등) 단어를 참고해, 아직 피드에 없는 연관·유용 단어를 고르고
 * 쉬운 예문(영·한) + 품사·뜻 + (선택) cf. 를 생성해 DB에 넣습니다.
 *
 *   cd C:\langchain\backend
 *   node scripts/auto-onesentence.js --count 1
 *   node scripts/auto-onesentence.js --count 10
 *   node scripts/auto-onesentence.js --count 1 --dry-run
 *   node scripts/auto-onesentence.js --count 1 --no-fallback   # one-sentence-data.js 미수정
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import { API_BASE } from './loadEnv.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const FALLBACK_JS = path.join(REPO_ROOT, 'one-sentence-data.js');
const FALLBACK_HTML = path.join(REPO_ROOT, 'one-sentence.html');

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

const oneSentenceEntrySchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    pos: { type: String, default: '' },
    meaning: { type: String, default: '' },
    ko: { type: String, default: '' },
    en: { type: String, required: true },
    highlight: { type: String, default: '' },
    cf: {
      type: [
        {
          word: { type: String, default: '' },
          pos: { type: String, default: '' },
          meaning: { type: String, default: '' },
        },
      ],
      default: [],
    },
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

function normalizeWordKey(w) {
  return String(w || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, ' ');
}

function normalizeCf(cf) {
  if (!Array.isArray(cf)) return [];
  return cf
    .map((c) => ({
      word: String(c?.word || '').trim(),
      pos: String(c?.pos || '').trim(),
      meaning: String(c?.meaning || '').trim(),
    }))
    .filter((c) => c.word);
}

async function withDb(fn) {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('.env에 MONGO_URI가 없습니다.');
  const Model =
    mongoose.models.OneSentenceEntry ||
    mongoose.model('OneSentenceEntry', oneSentenceEntrySchema);
  await mongoose.connect(uri);
  try {
    return await fn(Model);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
}

async function listExistingEntries() {
  return withDb(async (Model) => Model.find().sort({ date: 1, _id: 1 }).lean());
}

async function saveEntry(item) {
  return withDb(async (Model) => {
    const hashedPassword = await bcrypt.hash(seedPasswordFor(item.word), 10);
    const entry = await Model.create({
      word: String(item.word).trim(),
      pos: String(item.pos || '').trim(),
      meaning: String(item.meaning || '').trim(),
      ko: String(item.ko || '').trim(),
      en: String(item.en).trim(),
      highlight: String(item.highlight || item.word).trim(),
      cf: normalizeCf(item.cf),
      nickname: 'admin',
      password: hashedPassword,
    });
    return entry.toObject();
  });
}

async function fetchSiteWords() {
  const words = new Set();
  const endpoints = ['/wordofday', '/newsvoca', '/synonym', '/culturevoca'];
  for (const ep of endpoints) {
    try {
      const res = await fetch(`${API_BASE}${ep}`);
      if (!res.ok) continue;
      const data = await res.json().catch(() => ({}));
      const list = Array.isArray(data.entries) ? data.entries : Array.isArray(data) ? data : [];
      for (const e of list) {
        const title = String(e.title || e.word || e.slug || '').trim();
        if (!title) continue;
        // "word1 / word2" 형태면 앞 토큰들만
        title
          .split(/[,/|·•]+/)
          .map((t) => t.trim())
          .filter((t) => /^[A-Za-z][A-Za-z' -]{1,40}$/.test(t))
          .forEach((t) => words.add(t.toLowerCase()));
      }
    } catch {
      /* ignore endpoint */
    }
  }
  return [...words];
}

async function generateBatch({ count, siteWords, existingKeys }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY 가 .env 에 없습니다.');
  const openai = new OpenAI({ apiKey });

  const sampleSite = siteWords.sort(() => Math.random() - 0.5).slice(0, 40);
  const existingSample = [...existingKeys].slice(0, 80);

  const userPrompt = `You create short "one sentence one word" cards for Korean adults learning practical English.

Site already has these vocabulary themes/words (sample):
${sampleSite.join(', ') || '(none)'}

Already published on the one-sentence feed (do NOT repeat, case-insensitive):
${existingSample.join(', ') || '(none)'}

Create exactly ${count} NEW English words useful for intermediate learners.
Prefer words related to the site themes above, or high-frequency exam/news/daily words NOT in the published list.
Each item needs a VERY EASY example sentence (A2–B1), natural Korean translation, POS in Korean, short Korean meaning, and optional cf. related lemma.

Return JSON:
{
  "items": [
    {
      "word": "lemma lowercase",
      "pos": "형용사|동사|명사|부사|숙어",
      "meaning": "짧은 한국어 뜻",
      "en": "Easy example sentence containing the word.",
      "ko": "자연스러운 한국어 번역",
      "highlight": "exact form as it appears in en (may be inflected)",
      "cf": [
        { "word": "related lemma", "pos": "동사", "meaning": "짧은 뜻" }
      ]
    }
  ]
}

Rules:
- Exactly ${count} items in items[]
- Easy, concrete sentences. No slang, no sexual/violent content
- meaning: short, dictionary-like Korean
- cf: 0–2 items only when a related form/lemma is genuinely helpful (e.g. weathered → weather). Omit empty cf
- highlight must appear inside en (case-insensitive)
- Do not invent obscure words`;

  const models = [process.env.ONESENTENCE_MODEL, 'gpt-4o-mini', 'gpt-4o'].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );

  let raw;
  let lastErr;
  for (const model of models) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        ...(model === 'gpt-3.5-turbo' ? {} : { response_format: { type: 'json_object' } }),
        temperature: 0.75,
        messages: [
          {
            role: 'system',
            content:
              'You are an English teacher writing easy one-sentence vocabulary cards for Korean adults. Reply with JSON only.',
          },
          { role: 'user', content: userPrompt },
        ],
      });
      raw = completion.choices[0]?.message?.content;
      if (raw) break;
    } catch (err) {
      lastErr = err;
      console.warn(`  모델 ${model} 실패:`, err.message);
    }
  }
  if (!raw && lastErr) throw lastErr;
  if (!raw) throw new Error('GPT 응답이 비었습니다.');

  const jsonText = String(raw)
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  const data = JSON.parse(jsonText);
  const items = Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : [];
  if (!items.length) throw new Error('GPT items 가 비었습니다.');
  return items;
}

function validateItem(item, existingKeys) {
  const word = String(item?.word || '').trim();
  const en = String(item?.en || '').trim();
  const ko = String(item?.ko || '').trim();
  if (!word || !en || !ko) return { ok: false, reason: 'word/en/ko 필수' };
  const key = normalizeWordKey(word);
  if (existingKeys.has(key)) return { ok: false, reason: '이미 있음' };
  const highlight = String(item.highlight || word).trim();
  if (!new RegExp(highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(en)) {
    return { ok: false, reason: 'highlight가 예문에 없음' };
  }
  return {
    ok: true,
    item: {
      word,
      pos: String(item.pos || '').trim(),
      meaning: String(item.meaning || '').trim(),
      ko,
      en,
      highlight,
      cf: normalizeCf(item.cf),
    },
  };
}

function bumpFallbackHtmlCache() {
  if (!fs.existsSync(FALLBACK_HTML)) return;
  let html = fs.readFileSync(FALLBACK_HTML, 'utf8');
  const stamp = `os${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${Date.now().toString(36).slice(-3)}`;
  html = html.replace(/one-sentence(?:-data)?\.(?:js|css)\?v=[^"']+/g, (m) =>
    m.replace(/\?v=[^"']+/, `?v=${stamp}`)
  );
  // also bump script refs that share osN pattern
  html = html.replace(/(one-sentence(?:-data)?\.(?:js|css)\?v=)2026[0-9a-z]+/gi, `$1${stamp}`);
  html = html.replace(/(site-masthead\.js\?v=)2026[0-9a-z]+/gi, `$1${stamp}`);
  fs.writeFileSync(FALLBACK_HTML, html, 'utf8');
  return stamp;
}

function appendFallbackJs(item) {
  if (!fs.existsSync(FALLBACK_JS)) return false;
  let src = fs.readFileSync(FALLBACK_JS, 'utf8');
  const entry = {
    word: item.word,
    pos: item.pos || '',
    meaning: item.meaning || '',
    ko: item.ko,
    en: item.en,
    highlight: item.highlight || item.word,
    cf: item.cf || [],
  };
  const block = `,\n  ${JSON.stringify(entry, null, 2).replace(/\n/g, '\n  ')}\n];`;
  if (!/\];\s*$/.test(src.trimEnd()) && !src.includes('];')) {
    throw new Error('one-sentence-data.js 형식을 파싱할 수 없습니다.');
  }
  // insert before final ];
  const idx = src.lastIndexOf('];');
  if (idx === -1) throw new Error('one-sentence-data.js 끝에 ]; 가 없습니다.');
  const before = src.slice(0, idx).replace(/,\s*$/, '');
  src = `${before}${block}\n`;
  fs.writeFileSync(FALLBACK_JS, src, 'utf8');
  return true;
}

async function main() {
  const count = Math.max(1, Math.min(20, Number(argValue('--count') || 1) || 1));
  const dryRun = hasFlag('--dry-run');
  const noFallback = hasFlag('--no-fallback');

  console.log(`One Sentence AI 자동 추가… count=${count}${dryRun ? ' (dry-run)' : ''}`);

  const existing = await listExistingEntries();
  const existingKeys = new Set(existing.map((e) => normalizeWordKey(e.word)));
  console.log(`  기존 피드 ${existing.length}건`);

  const siteWords = await fetchSiteWords();
  console.log(`  사이트 참고 단어 ${siteWords.length}개`);

  const generated = await generateBatch({ count: count + 2, siteWords, existingKeys });
  console.log(`  GPT 후보 ${generated.length}건`);

  const accepted = [];
  for (const raw of generated) {
    if (accepted.length >= count) break;
    const v = validateItem(raw, existingKeys);
    if (!v.ok) {
      console.log(`  스킵: ${raw?.word || '?'} (${v.reason})`);
      continue;
    }
    existingKeys.add(normalizeWordKey(v.item.word));
    accepted.push(v.item);
  }

  if (!accepted.length) throw new Error('유효한 신규 항목이 없습니다. 다시 실행해 주세요.');

  for (const item of accepted) {
    console.log(`  → ${item.word} | ${item.pos} | ${item.meaning}`);
    console.log(`     EN: ${item.en}`);
    console.log(`     KO: ${item.ko}`);
    if (item.cf?.length) {
      item.cf.forEach((c) => console.log(`     cf. ${c.word} ${c.pos} - ${c.meaning}`));
    }
    if (dryRun) continue;
    const saved = await saveEntry(item);
    console.log(`     저장: ${saved._id}`);
    if (!noFallback) {
      try {
        appendFallbackJs(item);
        console.log('     fallback JS 반영');
      } catch (e) {
        console.warn('     fallback JS 실패:', e.message);
      }
    }
  }

  if (!dryRun && !noFallback && accepted.length) {
    const stamp = bumpFallbackHtmlCache();
    if (stamp) console.log(`  cache bump: ${stamp}`);
  }

  console.log(`완료. ${dryRun ? '생성만' : '저장'} ${accepted.length}건`);
}

main().catch((e) => {
  console.error('오류:', e.message);
  process.exit(1);
});
