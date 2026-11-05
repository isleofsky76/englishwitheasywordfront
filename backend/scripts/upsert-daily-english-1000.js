/**
 * frontend/daily_english_1000.csv → expressions upsert (published)
 * 사용: node backend/scripts/upsert-daily-english-1000.js
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
  console.error('MONGODB_URI/MONGO_URI 없음');
  process.exit(1);
}

function parseCsv(text) {
  const src = String(text || '').replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let cell = '';
  let i = 0;
  let inQ = false;
  while (i < src.length) {
    const ch = src[i];
    if (inQ) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          cell += '"';
          i += 2;
          continue;
        }
        inQ = false;
        i += 1;
        continue;
      }
      cell += ch;
      i += 1;
      continue;
    }
    if (ch === '"') {
      inQ = true;
      i += 1;
      continue;
    }
    if (ch === ',') {
      row.push(cell);
      cell = '';
      i += 1;
      continue;
    }
    if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      i += 1;
      continue;
    }
    cell += ch;
    i += 1;
  }
  if (cell.length || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((c) => String(c).trim() !== ''));
}

function padId(n) {
  return 'EXP' + String(n).padStart(6, '0');
}

function tagsFromCategory(category) {
  return String(category || '')
    .split(/[\/·|,]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadRows(csvPath) {
  const raw = fs.readFileSync(csvPath, 'utf8');
  const table = parseCsv(raw);
  if (!table.length) throw new Error('empty csv');
  const headers = table[0].map((h) => String(h || '').trim());
  const idx = Object.fromEntries(headers.map((h, i) => [h, i]));
  const need = ['No', 'Category', 'Korean_Short', 'English_Expression', 'English_Example', 'Korean_Example'];
  for (const h of need) {
    if (idx[h] == null) throw new Error('missing column: ' + h);
  }
  return table.slice(1).map((r) => {
    const no = parseInt(String(r[idx.No] || '').trim(), 10);
    const category = String(r[idx.Category] || '').trim() || '일상 표현';
    const ko = String(r[idx.Korean_Short] || '').trim();
    const en = String(r[idx.English_Expression] || '').trim();
    const example = String(r[idx.English_Example] || '').trim();
    const translation = String(r[idx.Korean_Example] || '').trim();
    if (!Number.isFinite(no) || !ko || !en) return null;
    return {
      id: padId(no),
      ko,
      en,
      example,
      translation,
      category,
      tags: tagsFromCategory(category),
      level: 'B1',
      status: 'published',
      updatedAt: new Date(),
    };
  }).filter(Boolean);
}

async function main() {
  const csvPath = path.join(__dirname, '..', '..', 'frontend', 'daily_english_1000.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('CSV 없음:', csvPath);
    process.exit(1);
  }
  const rows = loadRows(csvPath);
  console.log('rows', rows.length);

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 25000 });
  const col = mongoose.connection.db.collection('expressions');

  let upserted = 0;
  const batchSize = 100;
  for (let i = 0; i < rows.length; i += batchSize) {
    const slice = rows.slice(i, i + batchSize);
    const ops = slice.map((doc) => ({
      updateOne: {
        filter: { id: doc.id },
        update: {
          $set: doc,
          $setOnInsert: { createdAt: new Date() },
        },
        upsert: true,
      },
    }));
    const r = await col.bulkWrite(ops, { ordered: false });
    upserted += (r.upsertedCount || 0) + (r.modifiedCount || 0) + (r.matchedCount || 0);
    process.stdout.write(`\r  bulk ${Math.min(i + batchSize, rows.length)}/${rows.length}`);
  }
  process.stdout.write('\n');

  const published = await col.countDocuments({ status: 'published' });
  const cats = await col.aggregate([
    { $match: { status: 'published' } },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]).toArray();

  const outJson = path.join(__dirname, '..', 'data', 'expressions-daily-1000.json');
  const outCats = path.join(__dirname, '..', '..', 'frontend', 'daily-english-categories.json');
  fs.writeFileSync(outJson, JSON.stringify(rows, null, 2), 'utf8');
  fs.writeFileSync(
    outCats,
    JSON.stringify(
      cats.map((c) => ({ category: c._id || '', count: c.count })),
      null,
      2
    ),
    'utf8'
  );

  console.log({
    csvRows: rows.length,
    published,
    categories: cats.length,
    wrote: outJson,
    catsFile: outCats,
  });
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
