/**
 * 생활 영어 한 줄 — GPT로 표현 품질 검수
 *
 * 사용:
 *   node backend/scripts/review-expressions-ai.js
 *   node backend/scripts/review-expressions-ai.js --status=draft
 *   node backend/scripts/review-expressions-ai.js --apply   # pass만 published
 *
 * 검수 기준: 한국어 자연스러움, 영어 자연스러움, 예문·번역 대응, 샘플/플레이스홀더 여부
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
const apiKey = process.env.OPENAI_API_KEY;
if (!uri) {
  console.error('MONGODB_URI 없음');
  process.exit(1);
}
if (!apiKey) {
  console.error('OPENAI_API_KEY 없음');
  process.exit(1);
}

const args = process.argv.slice(2);
const apply = args.includes('--apply');
const statusArg = (args.find((a) => a.startsWith('--status=')) || '--status=draft').split('=')[1];
const BATCH = 12;
const MODEL = process.env.EXPRESSIONS_REVIEW_MODEL || 'gpt-4o-mini';

const openai = new OpenAI({ apiKey });

const SYSTEM = `당신은 한국인 학습자용 생활 영어 콘텐츠 검수자입니다.
각 항목을 검수하고 JSON만 반환하세요.

판정:
- pass: 공개해도 됨 (자연스러운 한국어·영어, 예문·번역이 대응, 플레이스홀더 아님)
- fail: 공개하면 안 됨 (어색함, 오역, 샘플/더미, 빈 필드, 부적절)

응답 형식 (JSON only):
{
  "results": [
    {
      "id": "EXP000001",
      "verdict": "pass" | "fail",
      "score": 1-5,
      "issues": ["짧은 한국어 이슈"],
      "note": "한 줄 요약"
    }
  ]
}`;

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

async function reviewBatch(items) {
  const payload = items.map((it) => ({
    id: it.id,
    ko: it.ko,
    en: it.en,
    example: it.example || '',
    translation: it.translation || '',
  }));
  const completion = await openai.chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: SYSTEM },
      {
        role: 'user',
        content:
          '다음 생활 영어 표현들을 검수하세요.\n' + JSON.stringify({ items: payload }, null, 2),
      },
    ],
  });
  const raw = completion.choices?.[0]?.message?.content || '{}';
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('JSON parse failed: ' + raw.slice(0, 200));
  }
  const results = Array.isArray(parsed.results) ? parsed.results : [];
  return results;
}

async function main() {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  const col = mongoose.connection.db.collection('expressions');
  const filter = statusArg === 'all' ? {} : { status: statusArg };
  const docs = await col.find(filter).sort({ id: 1 }).toArray();
  console.log(`검수 대상: ${docs.length}개 (status=${statusArg}, model=${MODEL})`);

  if (!docs.length) {
    await mongoose.disconnect();
    return;
  }

  const all = [];
  const batches = chunk(docs, BATCH);
  for (let i = 0; i < batches.length; i += 1) {
    process.stdout.write(`batch ${i + 1}/${batches.length}… `);
    const part = await reviewBatch(batches[i]);
    all.push(...part);
    console.log(`ok (${part.length})`);
  }

  const byId = new Map(all.map((r) => [r.id, r]));
  const report = docs.map((d) => {
    const r = byId.get(d.id) || {
      id: d.id,
      verdict: 'fail',
      score: 1,
      issues: ['AI 응답 누락'],
      note: 'missing',
    };
    return {
      id: d.id,
      ko: d.ko,
      en: d.en,
      verdict: r.verdict === 'pass' ? 'pass' : 'fail',
      score: r.score,
      issues: r.issues || [],
      note: r.note || '',
    };
  });

  const passes = report.filter((r) => r.verdict === 'pass');
  const fails = report.filter((r) => r.verdict === 'fail');
  console.log(`결과: pass ${passes.length} / fail ${fails.length}`);
  if (fails.length) {
    console.log('fail 목록:');
    fails.slice(0, 40).forEach((f) => {
      console.log(`  ${f.id} | ${f.ko} | ${f.en} | ${(f.issues || []).join('; ') || f.note}`);
    });
  }

  const outDir = path.join(__dirname, '..', 'data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `expressions-review-${Date.now()}.json`);
  fs.writeFileSync(outPath, JSON.stringify({ model: MODEL, statusFilter: statusArg, report }, null, 2), 'utf8');
  console.log('리포트:', outPath);

  if (apply && passes.length) {
    const ids = passes.map((p) => p.id);
    const r = await col.updateMany(
      { id: { $in: ids } },
      { $set: { status: 'published', updatedAt: new Date() } }
    );
    console.log(`published 반영: matched=${r.matchedCount} modified=${r.modifiedCount}`);
  } else if (apply) {
    console.log('--apply 이지만 pass 없음');
  } else {
    console.log('DB 미변경. 공개하려면 --apply 추가');
  }

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
