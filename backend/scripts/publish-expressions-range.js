/**
 * id 범위 공개 (검수 후). 예: node backend/scripts/publish-expressions-range.js EXP000001 EXP000030
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const fromId = process.argv[2] || 'EXP000001';
const toId = process.argv[3] || 'EXP000030';
const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error('MONGODB_URI 없음');
  process.exit(1);
}

await mongoose.connect(uri);
const r = await mongoose.connection.db.collection('expressions').updateMany(
  { id: { $gte: fromId, $lte: toId } },
  { $set: { status: 'published', updatedAt: new Date() } }
);
console.log({ fromId, toId, matched: r.matchedCount, modified: r.modifiedCount });
await mongoose.disconnect();
