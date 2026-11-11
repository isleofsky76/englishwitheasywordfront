/**
 * Word of the Day 구형 본문 → 최신 wotd-* 구조 변환
 *
 *   cd C:\langchain\backend
 *   node scripts/migrate-wotd-to-latest.mjs --dry-run --limit 3
 *   node scripts/migrate-wotd-to-latest.mjs --limit 10
 *   node scripts/migrate-wotd-to-latest.mjs
 *   node scripts/migrate-wotd-to-latest.mjs --word deliberate
 */
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import './loadEnv.js';
import { generateEntryContent } from './auto-wordofday.js';
import {
  buildWordofdayMessage,
  buildTitle,
  buildMetaDescription,
  toSlug,
  imageSrcFromFilename,
} from './wordofday-format.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

const dryRun = process.argv.includes('--dry-run');
const noGit = process.argv.includes('--no-git') || dryRun;
const limitIdx = process.argv.indexOf('--limit');
const limit = limitIdx >= 0 ? Number(process.argv[limitIdx + 1]) || 0 : 0;
const wordIdx = process.argv.indexOf('--word');
const onlyWord = wordIdx >= 0 ? String(process.argv[wordIdx + 1] || '').trim().toLowerCase() : '';
const concurrency = Math.max(1, Number(process.env.WOTD_MIGRATE_CONCURRENCY || 3));

const wordOfDayEntrySchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    nickname: String,
    password: String,
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    isSecret: { type: Boolean, default: false },
    slug: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
  },
  { collection: 'wordofday' }
);

function stripTags(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function decodeBasic(s) {
  return String(s || '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

function extractWord(entry) {
  const title = String(entry.title || '').trim();
  const parenEn = title.match(/\(([A-Za-z][A-Za-z'’\- ]{0,40})\)\s*$/);
  if (parenEn) return parenEn[1].trim().toLowerCase();

  const titleWord = title.split('|')[0].trim();
  if (titleWord && /^[A-Za-z][A-Za-z'’\- ]{0,40}$/.test(titleWord) && titleWord.split(/\s+/).length <= 4) {
    return titleWord.toLowerCase();
  }
  const msg = String(entry.message || '');
  const alt = msg.match(/alt=["']([^"']+)["']/i);
  if (alt && /^[A-Za-z]/.test(alt[1])) return alt[1].trim().toLowerCase();
  const strong = msg.match(/<strong[^>]*>\s*([A-Za-z][A-Za-z'’\-]*)\s*</i);
  if (strong) return strong[1].toLowerCase();
  if (entry.slug) return String(entry.slug).replace(/-/g, ' ').toLowerCase();
  return titleWord.toLowerCase();
}

function extractImageSrc(message, word) {
  const msg = String(message || '');
  const m =
    msg.match(/src=["']([^"']*\/?resources\/[^"']+)["']/i) ||
    msg.match(/src=["'](resources\/[^"']+)["']/i);
  if (m) {
    let src = decodeBasic(m[1]).replace(/^\.\.\//, '');
    if (!src.startsWith('/')) src = `/${src.replace(/^\/+/, '')}`;
    if (!src.startsWith('/resources/')) {
      src = `/resources/${src.replace(/^\/?resources\//, '')}`;
    }
    return src;
  }
  const RESOURCES = path.join(REPO_ROOT, 'resources');
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp', '.gif']) {
    const name = `${String(word || '').replace(/\s+/g, '-')}${ext}`;
    if (fs.existsSync(path.join(RESOURCES, name))) return imageSrcFromFilename(name);
    const spaced = `${String(word || '')}${ext}`;
    if (fs.existsSync(path.join(RESOURCES, spaced))) return imageSrcFromFilename(spaced);
  }
  return '';
}

function extractExamples(message) {
  const text = String(message || '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');
  const plain = stripTags(text);
  const examples = [];

  // "예문 N" blocks
  const re = /예문\s*\d+\s*([\s\S]*?)(?=예문\s*\d+|형용사 유의어|유의어:|💡|📌|$)/gi;
  let m;
  while ((m = re.exec(plain))) {
    const block = m[1].trim();
    const lines = block
      .split(/\n+/)
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) continue;
    const en = lines.find((l) => /[A-Za-z]/.test(l)) || lines[0];
    const ko = lines.find((l) => /[가-힣]/.test(l) && l !== en) || '';
    if (en && /[A-Za-z]/.test(en)) examples.push({ en: en.replace(/^→\s*/, ''), ko });
  }

  if (examples.length) return examples.slice(0, 3);

  // fallback: EN line then KO line pairs after first meaning
  const lines = plain
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
  for (let i = 0; i < lines.length - 1 && examples.length < 3; i += 1) {
    const a = lines[i];
    const b = lines[i + 1];
    if (/[A-Za-z]{3,}/.test(a) && /[가-힣]/.test(b) && a.length > 20) {
      examples.push({ en: a, ko: b });
      i += 1;
    }
  }
  return examples.slice(0, 3);
}

function extractMeaning(message, title) {
  const fromTitle = String(title || '').includes('|')
    ? String(title).split('|').slice(1).join('|').trim()
    : '';
  if (fromTitle) return { meaning: fromTitle.split(',')[0].trim().slice(0, 40), meaningExtra: fromTitle };

  const plain = stripTags(message);
  const glossRe = /(?:명사|동사|형용사|부사|noun|verb|adjective|adverb)\s*[:：]\s*([^./|📌💡예문]{2,60})/gi;
  const parts = [];
  let gm;
  while ((gm = glossRe.exec(plain)) && parts.length < 3) {
    const g = gm[1].replace(/\s*\/\/.*$/, '').trim();
    if (g) parts.push(g.slice(0, 40));
  }
  if (parts.length) {
    const joined = parts.join(' · ');
    return { meaning: parts[0].slice(0, 40), meaningExtra: joined.slice(0, 80) };
  }

  // "단어<br>뜻줄"
  const m = String(message || '').match(
    /<strong[^>]*>\s*[A-Za-z][^<]*<\/strong>\s*<br\s*\/?>\s*([^<]+)/i
  );
  if (m) {
    const line = stripTags(m[1]).replace(/\s*\/\/\s*/g, ' · ');
    return { meaning: line.split(/[·,，]/)[0].trim().slice(0, 40), meaningExtra: line.slice(0, 80) };
  }

  const ipaLine = plain.match(/발음\s*[:：]\s*(\/[^\s/]+\/)/);
  void ipaLine;
  return { meaning: '', meaningExtra: '' };
}

function extractIpa(message) {
  const m = String(message || '').match(/\/[^/\n<>]{2,40}\//);
  return m ? m[0] : '';
}

function extractSynonyms(message) {
  const plain = stripTags(message);
  const m = plain.match(/유의어\s*[:：]\s*([^\n]+)/i);
  if (!m) return [];
  return m[1]
    .split(/[,，]/)
    .map((s) => s.replace(/형용사|동사|명사/g, '').trim())
    .filter((s) => /^[A-Za-z][A-Za-z\- ]*$/.test(s))
    .slice(0, 5);
}

function needsMigrate(entry) {
  return !String(entry.message || '').includes('class="wotd-word"');
}

async function mapPool(items, size, fn) {
  const results = new Array(items.length);
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i;
      i += 1;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, () => worker()));
  return results;
}

async function migrateOne(WordOfDayEntry, entry) {
  const word = extractWord(entry);
  if (!word) throw new Error('word 추출 실패');
  const imageSrc = extractImageSrc(entry.message, word);
  const { meaning, meaningExtra } = extractMeaning(entry.message, entry.title);
  const examples = extractExamples(entry.message);
  const ipaHint = extractIpa(entry.message);
  const synHints = extractSynonyms(entry.message);

  const generated = await generateEntryContent(word, {
    meaning,
    meaningExtra,
    examples,
  });
  if (examples.length) generated.examples = examples.slice(0, 3);
  if (meaning) generated.meaning = meaning;
  if (meaningExtra) generated.meaningExtra = meaningExtra;
  if (ipaHint && !generated.ipa) generated.ipa = ipaHint;
  if (synHints.length && (!generated.synonyms || !generated.synonyms.length)) {
    generated.synonyms = synHints.slice(0, 3);
  }

  const finalWord = generated.word || word;
  const slug = toSlug(finalWord);
  const title = buildTitle(finalWord, generated.meaning);
  const message = buildWordofdayMessage({
    ...generated,
    word: finalWord,
    imageSrc,
  });
  const metaDescription = buildMetaDescription({
    ...generated,
    word: finalWord,
    examples: generated.examples,
  });

  if (dryRun) {
    return { id: entry._id, word: finalWord, title, dryRun: true, imageSrc };
  }

  await WordOfDayEntry.updateOne(
    { _id: entry._id },
    {
      $set: {
        title,
        message,
        slug,
        metaDescription,
        nickname: entry.nickname || 'admin',
      },
    }
  );

  applySeoAfterUpload('word-of-the-day', {
    title,
    slug,
    metaDescription,
    datePublished: toIsoDateOnly(entry.date),
    message,
  });

  return { id: entry._id, word: finalWord, title, slug, imageSrc };
}

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
  if (!uri) throw new Error('MONGODB_URI 없음');

  console.log('WOTD 최신 구조 마이그레이션', { dryRun, limit: limit || 'all', onlyWord, concurrency });
  await mongoose.connect(uri);
  const WordOfDayEntry =
    mongoose.models.WordOfDayEntry || mongoose.model('WordOfDayEntry', wordOfDayEntrySchema);

  let entries = await WordOfDayEntry.find({}).lean();
  entries = entries.filter(needsMigrate);
  if (onlyWord) {
    entries = entries.filter((e) => extractWord(e) === onlyWord || String(e.slug || '') === onlyWord);
  }
  if (limit > 0) entries = entries.slice(0, limit);

  console.log(`대상 ${entries.length}건`);
  if (!entries.length) {
    await mongoose.disconnect();
    return;
  }

  const ok = [];
  const fail = [];
  await mapPool(entries, concurrency, async (entry, idx) => {
    const label = extractWord(entry) || entry.title;
    process.stdout.write(`[${idx + 1}/${entries.length}] ${label} ... `);
    try {
      const r = await migrateOne(WordOfDayEntry, entry);
      console.log(dryRun ? 'dry-ok' : 'ok', r.title);
      ok.push(r);
    } catch (err) {
      console.log('FAIL', err.message);
      fail.push({ title: entry.title, error: err.message });
    }
  });

  console.log('\n완료', { ok: ok.length, fail: fail.length });
  if (fail.length) {
    console.log('실패 목록:');
    for (const f of fail) console.log(' -', f.title, f.error);
  }

  if (!noGit && ok.length) {
    console.log('Git 배포...');
    try {
      execSync('git add word-of-the-day sitemap.xml', { cwd: REPO_ROOT, stdio: 'inherit' });
      execSync(
        `git commit -m "Migrate ${ok.length} Word of the Day posts to latest wotd structure"`,
        { cwd: REPO_ROOT, stdio: 'inherit' }
      );
      execSync('git push origin HEAD', { cwd: REPO_ROOT, stdio: 'inherit' });
      console.log('git push 완료');
    } catch (err) {
      console.warn('git:', err.message);
    }
  }

  await mongoose.disconnect();
  if (fail.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
