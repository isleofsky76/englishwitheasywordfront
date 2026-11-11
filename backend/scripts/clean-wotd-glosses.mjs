/**
 * WOTD 뜻/부제에 섞인 '예문…' 유출·중복 부제 정리
 *   cd C:\langchain\backend
 *   node scripts/clean-wotd-glosses.mjs --dry-run
 *   node scripts/clean-wotd-glosses.mjs
 */
import mongoose from 'mongoose';
import { execSync } from 'child_process';
import './loadEnv.js';
import {
  buildTitle,
  buildMetaDescription,
  toSlug,
} from './wordofday-format.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

const dryRun = process.argv.includes('--dry-run');
const noGit = process.argv.includes('--no-git') || dryRun;

function cleanMeaning(s) {
  let t = String(s || '').trim();
  if (!t) return '';
  t = t.split(/예문\s*\d*/i)[0].trim();
  t = t.split(/📌|💡|→/)[0].trim();
  t = t.replace(/\s*(동사|형용사|명사|부사)\s*[:：].*$/i, '').trim();
  t = t.replace(/\s*[·•|]+\s*$/g, '').trim();
  /* 너무 긴 뜻은 앞 의미만 */
  if (t.length > 42) {
    const cut = t.slice(0, 42);
    const lastSep = Math.max(cut.lastIndexOf('·'), cut.lastIndexOf(','), cut.lastIndexOf('，'));
    t = (lastSep > 12 ? cut.slice(0, lastSep) : cut).trim();
  }
  return t;
}

function cleanSub(meaning, sub) {
  let s = cleanMeaning(sub);
  const m = String(meaning || '').trim();
  if (!s) return '';
  if (m && (s === m || s.indexOf(m) === 0)) return '';
  if (s.length > 48) return '';
  return s;
}

function patchMessage(message) {
  let msg = String(message || '');
  if (!msg.includes('wotd-word')) return { message: msg, changed: false, meaning: '', sub: '' };

  const meaningMatch = msg.match(/<span class="wotd-meaning">([\s\S]*?)<\/span>/);
  const subMatch = msg.match(/<span class="wotd-meaning-sub">([\s\S]*?)<\/span>/);
  const oldMeaning = meaningMatch ? meaningMatch[1] : '';
  const oldSub = subMatch ? subMatch[1] : '';
  const meaning = cleanMeaning(oldMeaning);
  const sub = cleanSub(meaning, oldSub);

  let changed = false;
  if (meaningMatch && meaning && meaning !== oldMeaning) {
    msg = msg.replace(
      /<span class="wotd-meaning">[\s\S]*?<\/span>/,
      `<span class="wotd-meaning">${meaning}</span>`
    );
    changed = true;
  }
  if (subMatch) {
    if (sub) {
      if (sub !== oldSub) {
        msg = msg.replace(
          /<span class="wotd-meaning-sub">[\s\S]*?<\/span>/,
          `<span class="wotd-meaning-sub">${sub}</span>`
        );
        changed = true;
      }
    } else {
      msg = msg.replace(/<span class="wotd-meaning-sub">[\s\S]*?<\/span>/, '');
      changed = true;
    }
  }

  return { message: msg, changed, meaning, sub };
}

function wordFromEntry(e) {
  const t = String(e.title || '');
  const before = t.split('|')[0].trim();
  if (/^[A-Za-z]/.test(before)) return before.toLowerCase();
  const paren = t.match(/\(([A-Za-z][A-Za-z'’\- ]*)\)\s*$/);
  if (paren) return paren[1].toLowerCase();
  return String(e.slug || before).replace(/-/g, ' ').toLowerCase();
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
  const col = mongoose.connection.collection('wordofday');
  const all = await col.find({}).toArray();
  console.log('entries', all.length, dryRun ? '(dry-run)' : '');

  let updated = 0;
  const touched = [];

  for (const e of all) {
    const { message, changed, meaning } = patchMessage(e.message);
    if (!changed && !/예문/.test(String(e.title || ''))) continue;

    const word = wordFromEntry(e);
    const gloss = meaning || cleanMeaning(String(e.title || '').split('|')[1] || '');
    const title = gloss ? buildTitle(word, gloss) : e.title;
    const slug = e.slug || toSlug(word);
    const metaDescription =
      e.metaDescription && !/예문/.test(e.metaDescription)
        ? e.metaDescription
        : buildMetaDescription({ word, meaning: gloss, examples: [] });

    console.log('-', word, '→', gloss);
    updated += 1;
    touched.push({ word, slug, title, message, metaDescription, date: e.date });

    if (!dryRun) {
      await col.updateOne(
        { _id: e._id },
        { $set: { message, title, slug, metaDescription } }
      );
      applySeoAfterUpload('word-of-the-day', {
        title,
        slug,
        metaDescription,
        datePublished: toIsoDateOnly(e.date),
        message,
      });
    }
  }

  console.log('updated', updated);

  if (!noGit && updated) {
    execSync('git add word-of-the-day sitemap.xml', { cwd: 'C:/langchain', stdio: 'inherit' });
    try {
      execSync(
        `git commit -m "Clean polluted WOTD meanings and hide example bleed in glosses"`,
        { cwd: 'C:/langchain', stdio: 'inherit' }
      );
      execSync('git push origin HEAD', { cwd: 'C:/langchain', stdio: 'inherit' });
    } catch (err) {
      console.warn('git', err.message);
    }
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
