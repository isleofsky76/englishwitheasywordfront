/**
 * Pros & Cons · 상황 영어 — slug + metaDescription 백필
 *
 *   cd backend
 *   node scripts/backfill-pros-cons-situational-seo.js
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });

const PROS_CONS_SLUGS = {
  '인류는 다른 행성에 정착해야 할까?  - Pros & Cons': 'colonize-other-planets',
  '청소년의 SNS 사용을 금지해야 할까?': 'ban-teen-social-media',
  '종합격투기(MMA)는 금지되어야 할까?': 'ban-mma',
  '대마초는 합법화되어야 할까?': 'legalize-cannabis',
  'AI 교사는 인간 교사를 대체할 수 있을까?': 'ai-teachers-replace-humans',
  '주 4일 근무제는 도입되어야 할까?': 'four-day-workweek',
  '종교계의 AI 활용, 수용해야 할까?': 'ai-in-religion',
  '설탕세는 도입해야 할까?': 'sugar-tax',
  'AI가 생성한 창작물도 저작권으로 보호해야 할까?': 'ai-generated-works-copyright',
};

const SITUATIONAL_SLUGS = {
  '슈퍼마켓 영어 표현': 'supermarket',
  '호텔에서': 'hotel',
  '식당에서': 'restaurant',
  '약국에서': 'pharmacy',
  '일상에서': 'daily-life',
  '여행에서': 'travel',
  '집안에서': 'at-home',
  '기차역에서': 'train-station',
  '병원에서': 'hospital',
  '자동차 대여소에서': 'car-rental',
  '박물관/미술관에서': 'museum',
};

function plainFromMessage(message, maxLen = 155) {
  const raw = String(message || '');
  if (raw.trim().startsWith('{')) {
    try {
      const data = JSON.parse(raw);
      if (data?.type === 'pros-cons') {
        const first = data.pros?.[0]?.ko || data.pros?.[0]?.en || data.cons?.[0]?.ko || '';
        const t = String(first).replace(/\s+/g, ' ').trim();
        if (t) return t.length <= maxLen ? t : t.slice(0, maxLen - 1).trim() + '…';
      }
    } catch {
      /* fall through */
    }
  }
  const t = raw
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (!t) return '';
  return t.length <= maxLen ? t : t.slice(0, maxLen - 1).trim() + '…';
}

function metaForTitle(title, board, message) {
  const fromMsg = plainFromMessage(message);
  if (fromMsg) return fromMsg;
  if (board === 'pros-cons') {
    return `${title} — Pros와 Cons를 영어로 비교하며 토론·어휘를 익히는 학습 글입니다.`.slice(0, 155);
  }
  return `${title} — 상황별 영어 표현, 예문, 한글 뜻으로 실생활 영어를 학습합니다.`.slice(0, 155);
}

async function backfill(collectionName, slugMap, board) {
  const col = mongoose.connection.db.collection(collectionName);
  const docs = await col.find({}).toArray();
  let updated = 0;
  for (const doc of docs) {
    const title = String(doc.title || '').trim();
    const slug = slugMap[title];
    if (!slug) {
      console.warn(`  ⚠ slug 맵 없음: [${collectionName}] ${title}`);
      continue;
    }
    const metaDescription = metaForTitle(title, board, doc.message);
    await col.updateOne(
      { _id: doc._id },
      { $set: { slug, metaDescription } }
    );
    console.log(`  ✅ ${slug} ← ${title.slice(0, 40)}`);
    updated++;
  }
  return updated;
}

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI missing');
  await mongoose.connect(uri);
  console.log('MongoDB connected');

  const names = (await mongoose.connection.db.listCollections().toArray()).map((c) => c.name);
  const prosCol =
    names.find((n) => /proscons/i.test(n)) ||
    names.find((n) => /pros/i.test(n));
  const sitCol =
    names.find((n) => /situationalenglish/i.test(n)) ||
    names.find((n) => /situational/i.test(n));

  console.log('collections:', { prosCol, sitCol });
  if (!prosCol || !sitCol) {
    throw new Error(`Collection not found. Available: ${names.join(', ')}`);
  }

  console.log('Pros & Cons…');
  const a = await backfill(prosCol, PROS_CONS_SLUGS, 'pros-cons');
  console.log('Situational…');
  const b = await backfill(sitCol, SITUATIONAL_SLUGS, 'situational-english');
  console.log(`완료: pros-cons ${a}건, situational ${b}건`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
