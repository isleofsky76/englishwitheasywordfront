/**
 * API 셸 vocabulary-quiz SEO → track 입력 퀴즈로 변환 + 복수 정답 보강
 *
 *   cd backend && node scripts/migrate-api-quizzes-to-track.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';
import { enrichExistingTrackWords, enrichQuizTrackWords } from './quiz-answer-alts.js';
import { toIsoDateOnly } from './voca-seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUIZ_DIR = path.resolve(__dirname, '../../vocabulary-quiz');

function pairsFromQuizzes(quizzes) {
  const pairs = [];
  const seen = new Set();
  for (const q of quizzes || []) {
    if (q?.type === 'reveal-section' && Array.isArray(q.items)) {
      for (const it of q.items) {
        const en = String(it.show || it.en || '').trim();
        const ko = String(it.hide || it.ko || '').trim();
        if (!en || !ko) continue;
        /* en-ko 섹션만 (show가 영어인 경우) */
        if (!/[A-Za-z]/.test(en)) continue;
        const k = en.toLowerCase();
        if (seen.has(k)) continue;
        seen.add(k);
        pairs.push({ en, ko });
      }
    }
  }
  return pairs;
}

async function main() {
  const res = await fetch(`${API_BASE}/vocabulary-quiz`, { headers: { Accept: 'application/json' } });
  const data = await res.json();
  const entries = data.entries || data.data || [];
  console.log(`API 퀴즈 ${entries.length}개 확인`);

  let ok = 0;
  let skip = 0;
  for (const entry of entries) {
    const slug = String(entry.slug || '').trim();
    if (!slug) {
      skip += 1;
      continue;
    }
    const seoPath = path.join(QUIZ_DIR, slug, 'index.html');
    const alreadyTrack =
      fs.existsSync(seoPath) && /VOCAB_QUIZ_TRACK_WORDS/.test(fs.readFileSync(seoPath, 'utf8'));
    if (alreadyTrack) {
      skip += 1;
      continue;
    }

    const pairs = pairsFromQuizzes(entry.quizzes);
    if (pairs.length < 3) {
      console.log(`- skip (pairs 부족): ${slug}`);
      skip += 1;
      continue;
    }

    const trackWords = enrichQuizTrackWords(pairs, { siblingMerge: true });
    const title = String(entry.title || slug).trim();
    const quiz = {
      format: 'reveal',
      directions: ['en-ko', 'ko-en'],
      title: /퀴즈$/.test(title) ? title : `${title}`,
      slug,
      metaDescription: (entry.metaDescription || `${title} 어휘 퀴즈`).slice(0, 160),
      sourceUrl: entry.sourceUrl || '',
      sourceLabel: entry.sourceLabel || (entry.sourceUrl ? '유튜브 보기' : ''),
      datePublished: (() => {
        const raw = entry.date || entry.createdAt || '';
        const d = raw ? new Date(raw) : new Date();
        return Number.isNaN(d.getTime()) ? toIsoDateOnly() : toIsoDateOnly(d);
      })(),
      section1Title: '영어 → 한글',
      section2Title: '한글 → 영어',
      pairs,
      trackWords: enrichExistingTrackWords(trackWords),
      eyebrow: 'Vocabulary Quiz · Review',
      hint: '유사·대체 표현도 정답으로 인정합니다.',
      password: entry.password || `seed_vocabulary_quiz_${slug.slice(0, 48)}`,
    };

    console.log(`\n→ ${slug} (${pairs.length}단어)`);
    try {
      await uploadVocabularyQuiz(quiz, API_BASE);
      ok += 1;
    } catch (err) {
      console.warn(`  실패: ${err.message || err}`);
    }
  }
  console.log(`\n완료: 변환 ${ok}, 생략 ${skip}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
