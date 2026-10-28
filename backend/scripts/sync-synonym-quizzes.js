/**
 * 연관단어(english-synonym) SEO 페이지 → vocabulary-quiz (track 양식) 일괄 생성
 *
 *   cd backend && node scripts/sync-synonym-quizzes.js
 *   cd backend && node scripts/sync-synonym-quizzes.js --only ask-request-seek-solicit-petition-related-words
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';
import { toIsoDateOnly } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SYN_DIR = path.join(ROOT, 'english-synonym');
const DRAFTS_DIR = path.join(__dirname, 'youtube-drafts');

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitMeanings(ko) {
  return String(ko || '')
    .replace(/^\d+\.\s*/, '')
    .split(/[,，、/;；·･・|]+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function pairsFromSynonymHtml(html) {
  const pairs = [];
  const sectionRe =
    /<section[^>]*nv-word-section[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<mark[^>]*>([\s\S]*?)<\/mark>/gi;
  let m;
  while ((m = sectionRe.exec(html))) {
    const ko = stripTags(m[1]).replace(/^\d+\.\s*/, '').trim();
    const en = stripTags(m[2]).trim();
    if (en && ko) pairs.push({ en, ko });
  }
  return pairs;
}

function youtubeFromHtml(html) {
  const m =
    html.match(/href="(https?:\/\/(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)[^"]+)"/i) ||
    html.match(/https?:\/\/(?:www\.)?youtube\.com\/(?:shorts\/|watch\?v=)[a-zA-Z0-9_-]+/);
  if (!m) return '';
  return (m[1] || m[0] || '').replace(/&amp;/g, '&');
}

function titleFromHtml(html, fallback) {
  const og = html.match(/property="og:title"\s+content="([^"]+)"/i);
  if (og) return og[1].trim();
  const h1 = html.match(/id="post-title"[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return stripTags(h1[1]);
  return fallback;
}

function dateFromHtml(html) {
  const m = html.match(/datetime="(\d{4}-\d{2}-\d{2})"/);
  return m ? m[1] : toIsoDateOnly();
}

function quizFromDraft(draft) {
  const meta = Array.isArray(draft.wordMeta) ? draft.wordMeta : [];
  const pairs = [];
  const seen = new Set();
  for (const w of meta) {
    const en = String(w.expression || '').trim();
    const ko = String(w.meaning || '').replace(/\s+/g, ' ').trim();
    if (!en || !ko) continue;
    const k = en.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    pairs.push({ en, ko });
  }
  if (pairs.length < 3) return null;
  const baseTitle = String(draft.title || '')
    .replace(/#연관단어/g, '')
    .replace(/#\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const baseSlug = String(draft.slug || '')
    .replace(/-related-words$/i, '')
    .replace(/-quiz$/i, '')
    .trim();
  const slug = `${baseSlug || 'synonym'}-quiz`.slice(0, 80);
  const wordList = pairs
    .slice(0, 8)
    .map((p) => p.en)
    .join(', ');
  return {
    format: 'reveal',
    directions: ['en-ko', 'ko-en'],
    title: `${baseTitle || '연관단어'} 퀴즈`,
    slug,
    metaDescription: `${baseTitle} 연관단어 퀴즈. ${wordList}${wordList ? ' 등.' : ''}`.slice(0, 160),
    sourceUrl: draft.youtube || '',
    sourceLabel: draft.youtube ? '유튜브 보기' : '',
    datePublished: draft.datePublished || toIsoDateOnly(),
    section1Title: '영어 → 한글',
    section2Title: '한글 → 영어',
    pairs,
    eyebrow: 'Vocabulary Quiz · Related Words',
    hint: '',
    password: `seed_vocabulary_quiz_${slug.slice(0, 48)}`,
  };
}

function quizFromSeoPage(slug) {
  const file = path.join(SYN_DIR, slug, 'index.html');
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  const pairs = pairsFromSynonymHtml(html);
  if (pairs.length < 3) return null;
  const titleRaw = titleFromHtml(html, slug).replace(/#연관단어/g, '').trim();
  const baseSlug = slug.replace(/-related-words$/i, '').replace(/-synonyms$/i, '').replace(/-quiz$/i, '');
  const quizSlug = `${baseSlug}-quiz`.slice(0, 80);
  const wordList = pairs
    .slice(0, 8)
    .map((p) => p.en)
    .join(', ');
  const yt = youtubeFromHtml(html);
  return {
    format: 'reveal',
    directions: ['en-ko', 'ko-en'],
    title: /퀴즈$/.test(titleRaw) ? titleRaw : `${titleRaw} 퀴즈`,
    slug: quizSlug,
    metaDescription: `${titleRaw} 연관단어 퀴즈. ${wordList}${wordList ? ' 등.' : ''}`.slice(0, 160),
    sourceUrl: yt,
    sourceLabel: yt ? '유튜브 보기' : '',
    datePublished: dateFromHtml(html),
    section1Title: '영어 → 한글',
    section2Title: '한글 → 영어',
    pairs,
    eyebrow: 'Vocabulary Quiz · Related Words',
    hint: '',
    password: `seed_vocabulary_quiz_${quizSlug.slice(0, 48)}`,
  };
}

function listSynonymSlugs() {
  if (!fs.existsSync(SYN_DIR)) return [];
  return fs
    .readdirSync(SYN_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(SYN_DIR, name, 'index.html')));
}

function draftBySlug(slug) {
  if (!fs.existsSync(DRAFTS_DIR)) return null;
  for (const f of fs.readdirSync(DRAFTS_DIR).filter((x) => x.endsWith('.json'))) {
    try {
      const d = JSON.parse(fs.readFileSync(path.join(DRAFTS_DIR, f), 'utf8'));
      if (d.board === 'english-synonym' && d.slug === slug) return d;
    } catch {
      /* ignore */
    }
  }
  return null;
}

async function main() {
  const only = [];
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--only') only.push(String(argv[++i] || '').trim());
  }

  let slugs = listSynonymSlugs();
  if (only.length) slugs = slugs.filter((s) => only.includes(s));

  console.log(`연관단어 SEO ${slugs.length}개 → 퀴즈 생성`);
  let ok = 0;
  let skip = 0;
  for (const slug of slugs) {
    const draft = draftBySlug(slug);
    const quiz = (draft && quizFromDraft(draft)) || quizFromSeoPage(slug);
    if (!quiz) {
      console.log(`- skip (단어 부족): ${slug}`);
      skip += 1;
      continue;
    }
    console.log(`\n→ [${quiz.slug}] ${quiz.title} (${quiz.pairs.length}단어)`);
    try {
      await uploadVocabularyQuiz(quiz, API_BASE);
      ok += 1;
    } catch (err) {
      console.warn(`  실패: ${err.message || err}`);
    }
  }
  console.log(`\n완료: 성공 ${ok}, 생략 ${skip}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
