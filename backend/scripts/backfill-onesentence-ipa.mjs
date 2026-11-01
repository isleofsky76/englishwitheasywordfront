/**
 * 기존 onesentence 문서에 ipa / ipaKo 채우기
 *   node scripts/backfill-onesentence-ipa.mjs
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import OpenAI from 'openai';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
const col = mongoose.connection.db.collection('onesentence');
const rows = await col.find({}).sort({ date: 1, _id: 1 }).toArray();
const need = rows.filter((r) => !String(r.ipa || '').trim() || !String(r.ipaKo || '').trim());
console.log(`전체 ${rows.length}건, 채울 대상 ${need.length}건`);

if (!need.length) {
  await mongoose.disconnect();
  process.exit(0);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const words = [...new Set(need.map((r) => String(r.word || '').trim()).filter(Boolean))];

const prompt = `For each English word, provide US IPA and Korean hangul pronunciation approximation.
Words: ${words.join(', ')}

Return JSON:
{
  "items": [
    { "word": "mirth", "ipa": "/mɜːrθ/", "ipaKo": "머스" }
  ]
}
Rules:
- ipa must include slashes
- ipaKo: natural Korean approximation learners use (hangul only)
- Cover every word exactly once`;

const completion = await openai.chat.completions.create({
  model: process.env.ONESENTENCE_MODEL || 'gpt-4o-mini',
  response_format: { type: 'json_object' },
  temperature: 0.2,
  messages: [
    { role: 'system', content: 'You are a pronunciation expert. Reply JSON only.' },
    { role: 'user', content: prompt },
  ],
});

const raw = completion.choices[0]?.message?.content || '';
const data = JSON.parse(
  String(raw)
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()
);
const map = new Map();
for (const it of data.items || []) {
  const w = String(it.word || '').toLowerCase();
  if (!w) continue;
  map.set(w, {
    ipa: String(it.ipa || '').trim(),
    ipaKo: String(it.ipaKo || '').trim(),
  });
}

let updated = 0;
for (const row of need) {
  const hit = map.get(String(row.word || '').toLowerCase());
  if (!hit?.ipa && !hit?.ipaKo) {
    console.log('  없음:', row.word);
    continue;
  }
  await col.updateOne(
    { _id: row._id },
    {
      $set: {
        ipa: hit.ipa || row.ipa || '',
        ipaKo: hit.ipaKo || row.ipaKo || '',
      },
    }
  );
  updated += 1;
  console.log(`  ${row.word}: ${hit.ipa} ${hit.ipaKo}`);
}

await mongoose.disconnect();
console.log(`완료. 업데이트 ${updated}건`);
