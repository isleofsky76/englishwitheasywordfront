/**
 * 생활 영어 한 줄 시드 — 로컬/스테이징용
 * 사용: node backend/scripts/seed-expressions.js
 * 기존 id는 건너뛰고 신규만 삽입. 운영 반영은 승인 후.
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.mongo_uri;
if (!uri) {
  console.error('MONGODB_URI 없음');
  process.exit(1);
}

const expressionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    ko: { type: String, required: true },
    en: { type: String, required: true },
    example: { type: String, default: '' },
    translation: { type: String, default: '' },
    category: { type: String, default: '일상 표현' },
    tags: { type: [String], default: [] },
    level: { type: String, default: 'B1' },
    status: { type: String, default: 'draft', enum: ['draft', 'published'] },
  },
  { collection: 'expressions', timestamps: true }
);

const Expression = mongoose.models.Expression || mongoose.model('Expression', expressionSchema);

async function main() {
  const dataPath = path.join(__dirname, '..', 'data', 'expressions-seed-100.json');
  if (!fs.existsSync(dataPath)) {
    console.error('시드 파일 없음. 먼저: node backend/scripts/generate-expressions-seed.js');
    process.exit(1);
  }
  const rows = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 20000 });
  let inserted = 0;
  let skipped = 0;
  for (const row of rows) {
    try {
      await Expression.create(row);
      inserted += 1;
    } catch (e) {
      if (e && e.code === 11000) skipped += 1;
      else throw e;
    }
  }
  console.log({ inserted, skipped, total: rows.length });
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
