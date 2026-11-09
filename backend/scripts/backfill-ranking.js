import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { registerRankingApi } from '../ranking-api.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
await mongoose.connect(uri);

const oneSentenceCommentSchema = new mongoose.Schema(
  { wordKey: String, word: String, body: String, date: Date },
  { collection: 'onesentencecomments' }
);
const OneSentenceComment =
  mongoose.models.OneSentenceComment ||
  mongoose.model('OneSentenceComment', oneSentenceCommentSchema);

const api = registerRankingApi({ get: () => {}, post: () => {} }, {});
const n = await api.rebuildCommentEventsFromViewedWords({ OneSentenceComment });
console.log({ rebuiltFromViewedWords: n });
await mongoose.disconnect();
