import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
if (!uri) {
  console.error('MONGODB_URI 없음');
  process.exit(1);
}

await mongoose.connect(uri);
const r = await mongoose.connection.db.collection('expressions').updateMany({}, { $set: { status: 'draft' } });
console.log('set all to draft', { matched: r.matchedCount, modified: r.modifiedCount });
await mongoose.disconnect();
