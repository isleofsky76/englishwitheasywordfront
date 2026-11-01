import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

dotenv.config();
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const stamp = process.argv[2] || '20261101os23';
await mongoose.connect(process.env.MONGO_URI);
const rows = await mongoose.connection.db
  .collection('onesentence')
  .find({})
  .sort({ date: 1, _id: 1 })
  .toArray();
await mongoose.disconnect();

const items = rows.map((r) => ({
  word: r.word,
  pos: r.pos || '',
  meaning: r.meaning || '',
  ko: r.ko || '',
  en: r.en,
  highlight: r.highlight || r.word,
  cf: Array.isArray(r.cf) ? r.cf : [],
}));
const body = items
  .map((it) => `  ${JSON.stringify(it, null, 2).replace(/\n/g, '\n  ')}`)
  .join(',\n');
fs.writeFileSync(
  path.join(root, 'one-sentence-data.js'),
  `/**
 * 문장 피드 로컬 폴백 (API /onesentence 실패 시에만 사용)
 */
window.ONE_SENTENCE_FEED = [
${body}
];
`,
  'utf8'
);
let html = fs.readFileSync(path.join(root, 'one-sentence.html'), 'utf8');
html = html.replace(
  /(one-sentence(?:-data)?\.(?:css|js)|site-masthead\.js)\?v=[^"']+/g,
  (_, file) => `${file}?v=${stamp}`
);
fs.writeFileSync(path.join(root, 'one-sentence.html'), html, 'utf8');
console.log('synced', items.length, stamp);
