/**
 * API vocabulary-quiz → SEO 페이지를 입력형 track UI로 재생성 (업로드 없이 로컬 HTML만)
 *
 *   cd backend && node scripts/regenerate-quiz-seo-track.js
 *   cd backend && npm run regenerate:quiz-seo
 */
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';
import { enrichExistingTrackWords, enrichQuizTrackWords } from './quiz-answer-alts.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function pairsFromQuizzes(quizzes) {
  const pairs = [];
  const seen = new Set();
  for (const q of quizzes || []) {
    if (q?.type !== 'reveal-section' || !Array.isArray(q.items)) continue;
    const dir = String(q.direction || '').trim();
    for (const it of q.items) {
      const show = String(it?.show || it?.en || '').trim();
      const hide = String(it?.hide || it?.ko || '').trim();
      if (!show || !hide) continue;

      let en;
      let ko;
      if (dir === 'ko-en' || (!dir && !/[A-Za-z]/.test(show))) {
        ko = show;
        en = hide;
      } else {
        en = show;
        ko = hide;
      }
      if (!/[A-Za-z]/.test(en)) continue;
      const k = en.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      pairs.push({ en, ko });
    }
  }
  return pairs;
}

async function main() {
  const res = await fetch(`${API_BASE}/vocabulary-quiz`, { headers: { Accept: 'application/json' } });
  const data = await res.json();
  const entries = data.entries || data.data || [];
  console.log(`API 퀴즈 ${entries.length}개`);

  let ok = 0;
  let skip = 0;
  for (const entry of entries) {
    const slug = String(entry.slug || '').trim();
    if (!slug) {
      skip += 1;
      continue;
    }
    const pairs = pairsFromQuizzes(entry.quizzes);
    if (pairs.length < 1) {
      console.log(`- skip (pairs 없음): ${slug}`);
      skip += 1;
      continue;
    }

    const title = String(entry.title || slug).trim();
    const trackWords = enrichExistingTrackWords(
      enrichQuizTrackWords(pairs, { siblingMerge: true })
    );
    const raw = entry.date || entry.createdAt || '';
    const d = raw ? new Date(raw) : new Date();
    const datePublished = Number.isNaN(d.getTime()) ? toIsoDateOnly() : toIsoDateOnly(d);

    const seo = applySeoAfterUpload('vocabulary-quiz', {
      title,
      slug,
      metaDescription: String(entry.metaDescription || `${title} 어휘 퀴즈`).slice(0, 160),
      datePublished,
      pairs,
      trackWords,
      sourceUrl: entry.sourceUrl || '',
      sourceLabel: entry.sourceLabel || (entry.sourceUrl ? '유튜브 보기' : ''),
      youtube: entry.sourceUrl || '',
      eyebrow: 'Vocabulary Quiz · Review',
      hint: '유사·대체 표현도 정답으로 인정합니다.',
    });

    if (seo?.seoPath) {
      console.log(`✓ ${slug} (${pairs.length}단어)`);
      ok += 1;
    } else {
      console.log(`- skip (seo 실패): ${slug}`);
      skip += 1;
    }
  }

  console.log(`\n완료: 재생성 ${ok}, 생략 ${skip}`);

  const check = spawnSync(process.execPath, [path.join(__dirname, 'assert-quiz-track-format.js')], {
    stdio: 'inherit',
  });
  if (check.status !== 0) process.exit(check.status || 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
