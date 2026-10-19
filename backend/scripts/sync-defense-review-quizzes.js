/**
 * nv-narrative 국방뉴스만:
 *  - SEO defense-news.js → 20261020rd11
 *  - 복습 퀴즈({slug}-quiz, 영어→뜻) 생성
 *
 *   cd backend && node scripts/sync-defense-review-quizzes.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';
import { toIsoDateOnly } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const DEFENSE_DIR = path.join(ROOT, 'defense-news');
const JS_VER = '20261020rd14';

/** 수동 보정 (자동 추출 실패·애매한 경우) */
const MEANINGS = {
  'pentagon-120-billion-weapon-contract': {
    covert: '은밀한',
    thwart: '방해하다, 저지하다',
    skepticism: '회의적인 태도',
    'subject to further talks': '추가 협상을 거쳐야 하는',
    appropriation: '예산 승인',
    earmark: '특정 용도로 배정하다',
    value: '평가하다, (규모를) 산정하다',
    weaponry: '무기류',
  },
  'defunding-us-military-related-words': {
    round: '차례, 한 차례',
    'press leak': '언론 유출 보도',
    arsenal: '무기 비축량',
    'dire straits': '심각한 곤경',
    readiness: '대비태세',
    'are compounding': '누적되고 있다',
    'defunding the military': '군 재정 지원을 줄이다, 예산 삭감',
  },
  'staggered-shore-leave-related-words': {
    staggered: '시차를 둔, 시차제의',
    'shore leave': '상륙 허가, 육상 휴가',
    stint: '일정 기간 동안의 일·활동',
    'off-limits': '출입 금지의',
    abrupt: '갑작스러운',
    intermittently: '간헐적으로',
    'conduct oneself': '처신하다, 행동하다',
    deteriorating: '악화되는',
    infamous: '악명 높은',
  },
};

function extractMarks(html) {
  const out = [];
  const re = /<mark[^>]*>([\s\S]*?)<\/mark>/gi;
  let m;
  while ((m = re.exec(html))) {
    const w = String(m[1] || '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (w) out.push(w);
  }
  /* mark 누락분: 은밀한(covert) — THAAD 등 짧은 대문자 약어 제외 */
  const plain = String(html || '').replace(/<mark[^>]*>[\s\S]*?<\/mark>/gi, '');
  const parenRe = /\(([A-Za-z][A-Za-z0-9'/.\s-]{0,80})\)/g;
  while ((m = parenRe.exec(plain))) {
    const w = m[1].replace(/\s+/g, ' ').trim();
    if (!w || /^[A-Z0-9]{2,6}$/.test(w)) continue;
    out.push(w);
  }
  const seen = new Set();
  const uniq = [];
  for (const w of out) {
    const k = w.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    uniq.push(w);
  }
  return uniq;
}

function stripTags(s) {
  return String(s || '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 한글(표현) 또는 cf. 에서 뜻 뽑기 */
function meaningFromHtml(html, wordEn) {
  const text = stripTags(html);
  const word = String(wordEn || '').trim();
  if (!text || !word) return '';
  const esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`([가-힣0-9A-Za-z·\\s]{1,40}?)\\(\\s*${esc}\\s*\\)`, 'i');
  const m = text.match(re);
  if (m) {
    const ko = m[1].replace(/^[\d.]+\s*/, '').trim();
    if (ko && ko.toLowerCase() !== word.toLowerCase()) return ko;
  }
  const parenCount = (text.match(/\(/g) || []).length;
  const cf = text.match(/\bcf\.\s*(.+)$/i);
  if (cf && parenCount <= 1) {
    const cfMeaning = cf[1].trim();
    if (cfMeaning && cfMeaning.toLowerCase() !== word.toLowerCase()) return cfMeaning;
  }
  return '';
}

function patchSeoJsVersion(slug) {
  const file = path.join(DEFENSE_DIR, slug, 'index.html');
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, 'utf8');
  if (!/nv-narrative/.test(html)) return false;
  const next = html.replace(
    /defense-news\.js\?v=[^"']+/g,
    `defense-news.js?v=${JS_VER}`
  );
  if (next !== html) {
    fs.writeFileSync(file, next, 'utf8');
    return true;
  }
  return false;
}

async function main() {
  const listRes = await fetch(`${API_BASE}/defense-news`, {
    headers: { Accept: 'application/json' },
  });
  const listData = await listRes.json();
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  let patched = 0;
  let quizzes = 0;
  let skipped = 0;

  for (const entry of entries) {
    const slug = String(entry.slug || '').trim();
    const message = String(entry.message || '');
    if (!slug || !/nv-narrative/.test(message)) continue;

    if (patchSeoJsVersion(slug)) {
      patched += 1;
      console.log(`  SEO js: ${slug}`);
    }

    const marks = extractMarks(message);
    if (!marks.length) {
      skipped += 1;
      continue;
    }

    const meaningMap = MEANINGS[slug] || {};
    const pairs = marks
      .map((en) => {
        const ko =
          meaningMap[en] ||
          meaningMap[en.toLowerCase()] ||
          meaningFromHtml(message, en);
        return ko ? { en, ko } : null;
      })
      .filter(Boolean);

    if (!pairs.length) {
      console.warn(`  skip quiz (no meanings): ${slug}`);
      skipped += 1;
      continue;
    }

    if (pairs.length < marks.length) {
      const missing = marks.filter(
        (en) => !pairs.some((p) => p.en.toLowerCase() === en.toLowerCase())
      );
      console.warn(`  partial quiz ${slug}: missing ${missing.join(', ')}`);
    }

    const title = String(entry.title || slug).replace(/\s+/g, ' ').trim();
    await uploadVocabularyQuiz(
      {
        format: 'reveal',
        directions: ['en-ko'],
        title: `${title} — 복습 퀴즈`,
        slug: `${slug}-quiz`,
        metaDescription: `${title} 핵심 표현 복습. 영어를 보고 뜻을 클릭해 확인합니다.`,
        sourceUrl: `https://englisheasystudy.com/defense-news/${slug}/`,
        sourceLabel: '원문 글 보기',
        datePublished: (() => {
          const raw = entry.date || entry.datePublished;
          if (!raw) return toIsoDateOnly();
          const d = raw instanceof Date ? raw : new Date(raw);
          return Number.isNaN(d.getTime()) ? toIsoDateOnly() : toIsoDateOnly(d);
        })(),
        section1Title: '영어 : 뜻',
        pairs,
      },
      API_BASE
    );
    quizzes += 1;
    console.log(`  quiz ok: ${slug}-quiz (${pairs.length}/${marks.length})`);
  }

  if (fs.existsSync(DEFENSE_DIR)) {
    for (const name of fs.readdirSync(DEFENSE_DIR)) {
      if (patchSeoJsVersion(name)) {
        patched += 1;
        console.log(`  SEO js (local): ${name}`);
      }
    }
  }

  console.log(`완료. SEO patched=${patched}, quizzes=${quizzes}, skipped=${skipped}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
