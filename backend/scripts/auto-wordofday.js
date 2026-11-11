/**
 * Word of the Day 자동 게시
 *
 * 준비: resources/ 에 이미지 넣기 (예: resources/smitten.jpg)
 * 입력: 단어 + 이미지(+ 예문은 선택). 뜻·발음 등은 GPT가 채움.
 *
 * 사용법 (backend 폴더):
 *   node scripts/send-wordofday-entry.js --auto --list
 *   node scripts/send-wordofday-entry.js --auto --word smitten
 *     → resources/smitten.jpg|png|webp|gif 중 1개 자동 선택
 *   node scripts/send-wordofday-entry.js --auto --word smitten --image smitten.webp
 *   node scripts/send-wordofday-entry.js --auto --word smitten --example "He was smitten with her." --example-ko "그는 그녀에게 홀딱 반했다."
 *   node scripts/send-wordofday-entry.js --auto --from scripts/wotd-batch.sample.json
 *   node scripts/send-wordofday-entry.js --auto --dry-run --word smitten
 *   node scripts/send-wordofday-entry.js --auto --no-git --word smitten
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import OpenAI from 'openai';
import { API_BASE, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';
import {
  buildWordofdayMessage,
  buildTitle,
  buildMetaDescription,
  imageSrcFromFilename,
  toSlug,
} from './wordofday-format.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const RESOURCES_DIR = path.join(REPO_ROOT, 'resources');
const GITHUB_REPO =
  process.env.GITHUB_RESOURCES_REPO || 'isleofsky76/englishwitheasywordfront';
const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

/** 풍경·로고·색상 등 단어 카드로 쓰지 않을 파일 */
const SKIP_BASENAMES = new Set([
  'eng',
  'background',
  'logo',
  'beach',
  'bike',
  'blue',
  'red',
  'green',
  'yellow',
  'orange',
  'purple',
  'light-blue',
  'concert',
  'crash',
  'friend',
  'flag',
  'hug',
  'park',
  'spain',
  'place',
  'dating-spreadsheet',
  'harbor_cafe_fishermen',
  'bicycle-couple-terrace',
  'ice-cream-couple',
  'london street',
  'london-street',
  'norway-viking-row',
  'ponte-vecchio-woman',
  'rainy-city-street',
  'strawberry-cake-couple',
  'train-couple-sweet-moment',
  'workers-preparing-stadium-grass',
  'heatwave-summer-storm',
  'building-safety',
  'baby-bump',
  'robo taxi',
  'street_cafe',
  'lunch-break',
  'cafefrance',
  'fray2',
  'pernicious2',
  'braggadoci',
  'wordly',
  'order',
  'flowy',
  'blurt_out',
  'dont_fall_for_it',
  'haste_makes_waste',
  'if_you_say_so',
  'pass_the_buck',
  'run_out_of_steam',
  'crocodile_tears',
  'order_in',
  'to_go',
  'true_colours',
]);

const EXT_PRIORITY = { '.jpg': 1, '.jpeg': 2, '.png': 3, '.webp': 4, '.gif': 5 };

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  if (i === -1) return null;
  const next = process.argv[i + 1];
  if (!next || next.startsWith('--')) return null;
  return next;
}

function argValues(flag) {
  const out = [];
  for (let i = 0; i < process.argv.length; i += 1) {
    if (process.argv[i] !== flag) continue;
    const next = process.argv[i + 1];
    if (!next || next.startsWith('--')) continue;
    out.push(next);
  }
  return out;
}

function hasFlag(flag) {
  return process.argv.includes(flag);
}

/** CLI --example / --example-ko 쌍 → [{en,ko}] */
function examplesFromCli() {
  const ens = argValues('--example');
  const kos = argValues('--example-ko');
  if (!ens.length) return [];
  return ens.map((en, i) => ({
    en: String(en || '').trim(),
    ko: String(kos[i] || '').trim(),
  })).filter((ex) => ex.en);
}

/** 확장자 우선순위: jpg → jpeg → png → webp → gif 중 하나만 */
const EXT_ORDER = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function stemVariants(raw) {
  const s = String(raw || '')
    .replace(/^\/?resources\//, '')
    .trim();
  if (!s) return [];
  const base = path.basename(s, path.extname(s) || undefined);
  const cleaned = base.replace(/['’]/g, '');
  const set = new Set([
    cleaned,
    cleaned.toLowerCase(),
    cleaned.replace(/\s+/g, '-'),
    cleaned.replace(/\s+/g, '_'),
    cleaned.toLowerCase().replace(/\s+/g, '-'),
    cleaned.toLowerCase().replace(/\s+/g, '_'),
    cleaned.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
  ]);
  return [...set].filter(Boolean);
}

/**
 * resources/ 에서 단어·파일명으로 jpg/png/webp/gif 조회 후 1개 선택.
 * --image smitten.jpg / smitten.webp / smitten (확장자 없음) / --word smitten 모두 가능.
 */
function resolveLocalImage(filenameOrWord) {
  const raw = String(filenameOrWord || '').replace(/^\/?resources\//, '').trim();
  if (!raw) throw new Error('이미지 또는 단어가 필요합니다. 예: --image smitten.jpg 또는 --word smitten');

  const exact = path.basename(raw);
  const exactFull = path.join(RESOURCES_DIR, exact);
  if (path.extname(exact) && fs.existsSync(exactFull)) return exact;

  const stems = stemVariants(raw);
  const hits = [];
  for (const stem of stems) {
    for (const ext of EXT_ORDER) {
      const name = stem + ext;
      if (fs.existsSync(path.join(RESOURCES_DIR, name))) hits.push(name);
    }
  }
  if (!hits.length) {
    throw new Error(
      `resources/ 에 이미지가 없습니다: ${raw} (조회: ${stems.join(', ')} + ${EXT_ORDER.join('/')})`
    );
  }
  /* 같은 stem이면 EXT_ORDER 우선, 이미 hits가 그 순서로 쌓임 */
  const picked = hits[0];
  if (hits.length > 1) {
    console.log(`  이미지 후보 ${hits.length}개 중 선택: ${picked}  (다른 후보: ${hits.slice(1).join(', ')})`);
  }
  return picked;
}

function loadBatchFile(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  if (!fs.existsSync(abs)) throw new Error(`배치 파일이 없습니다: ${abs}`);
  const raw = JSON.parse(fs.readFileSync(abs, 'utf8'));
  const list = Array.isArray(raw) ? raw : Array.isArray(raw.items) ? raw.items : [raw];
  return list.map((item, idx) => {
    const word = String(item.word || '').trim();
    const image = String(item.image || item.filename || word || '').trim();
    if (!word) throw new Error(`배치 ${idx + 1}번째: word 가 없습니다.`);
    if (!image) throw new Error(`배치 ${idx + 1}번째 (${word}): image 또는 word 로 찾을 파일이 없습니다.`);
    const examples = Array.isArray(item.examples)
      ? item.examples
          .map((ex) => ({
            en: String(ex?.en || ex?.example || '').trim(),
            ko: String(ex?.ko || ex?.meaning || '').trim(),
          }))
          .filter((ex) => ex.en)
      : [];
    return { word, image, examples };
  });
}

export function normalizeWord(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[_-]+/g, ' ')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function basenameToWord(basename) {
  return basename.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function wordsFromTitle(title) {
  const t = String(title || '');
  const found = new Set();
  const beforePipe = t.split('|')[0].trim();
  if (/^[a-zA-Z]/.test(beforePipe)) found.add(normalizeWord(beforePipe));
  const paren = t.match(/\(([^)]+)\)/g) || [];
  for (const p of paren) found.add(normalizeWord(p.slice(1, -1)));
  found.add(normalizeWord(t));
  return [...found].filter(Boolean);
}

function usedKeysFromEntries(entries) {
  const keys = new Set();
  for (const e of entries) {
    if (e?.slug) keys.add(normalizeWord(e.slug));
    for (const w of wordsFromTitle(e?.title)) keys.add(w);
    const msg = String(e?.message || '');
    for (const m of msg.matchAll(/\/resources\/([^"'>\s]+)/g)) {
      try {
        const file = decodeURIComponent(m[1]);
        const base = path.parse(file).name;
        keys.add(normalizeWord(base));
        keys.add(normalizeWord(basenameToWord(base)));
      } catch {
        /* ignore */
      }
    }
  }
  return keys;
}

async function fetchWordofdayEntries() {
  const res = await fetch(`${API_BASE}/wordofday`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data.entries || data.data || (Array.isArray(data) ? data : []);
}

function listLocalResourceFiles() {
  if (!fs.existsSync(RESOURCES_DIR)) return [];
  return fs
    .readdirSync(RESOURCES_DIR)
    .filter((name) => IMAGE_EXTS.has(path.extname(name).toLowerCase()));
}

async function listGithubResourceFiles() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/resources`;
  const headers = {
    'User-Agent': 'english-easy-study-wordofday',
    Accept: 'application/vnd.github+json',
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub resources ${res.status}: ${text.slice(0, 180)}`);
  }
  const items = await res.json();
  if (!Array.isArray(items)) throw new Error('GitHub contents 응답이 배열이 아닙니다.');
  return items
    .filter((it) => it?.type === 'file' && IMAGE_EXTS.has(path.extname(it.name || '').toLowerCase()))
    .map((it) => it.name);
}

function toCandidates(filenames) {
  const byKey = new Map();
  for (const filename of filenames) {
    const ext = path.extname(filename).toLowerCase();
    const base = path.basename(filename, ext);
    if (SKIP_BASENAMES.has(base)) continue;
    const word = basenameToWord(base);
    const key = normalizeWord(word);
    if (!key || key.length < 3) continue;
    const prev = byKey.get(key);
    const rank = EXT_PRIORITY[ext] || 9;
    if (!prev || rank < prev.rank) {
      byKey.set(key, { key, word, filename, rank });
    }
  }
  return [...byKey.values()];
}

export async function listResourceCandidates() {
  let names = [];
  let source = 'local';
  try {
    names = await listGithubResourceFiles();
    source = 'github';
  } catch (err) {
    console.warn('  GitHub 이미지 목록 실패, 로컬 resources/ 사용:', err.message);
    names = listLocalResourceFiles();
    source = 'local';
  }
  if (!names.length) {
    names = listLocalResourceFiles();
    source = 'local';
  }
  return { source, candidates: toCandidates(names) };
}

function pickCandidate(candidates, usedKeys, forcedWord) {
  if (forcedWord) {
    const key = normalizeWord(forcedWord);
    const hit = candidates.find((c) => c.key === key || c.word.toLowerCase() === forcedWord.toLowerCase());
    if (!hit) {
      throw new Error(`resources/ 에 "${forcedWord}" 이미지가 없습니다.`);
    }
    return hit;
  }
  const unused = candidates.filter((c) => !usedKeys.has(c.key));
  if (!unused.length) throw new Error('아직 안 올린 단어 이미지가 없습니다.');
  return unused[Math.floor(Math.random() * unused.length)];
}

async function generateEntryContent(word) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY 가 .env 에 없습니다.');
  const openai = new OpenAI({ apiKey });
  const userPrompt = `Create a SHORT Word of the Day card for: "${word}".
Audience: Korean adults. Keep it minimal — do NOT pad with extra examples or long synonym essays.
Return JSON with exactly these keys:
{
  "word": "canonical English form, usually lowercase unless a proper noun",
  "ipa": "IPA with slashes like /prɪˈkɔːʃən/",
  "ipaKo": "Korean approximation, hangul only",
  "pos": "품사 in Korean (명사/동사/형용사/부사/숙어 등)",
  "meaning": "short primary Korean meaning (max ~20 chars if possible)",
  "meaningExtra": "optional one short extra gloss, or empty string",
  "core": "one short Korean core-meaning sentence (no HTML)",
  "collocations": [
    {"en": "natural collocation containing the word", "ko": "짧은 한국어 뜻"}
  ],
  "compares": [
    {"en": "near synonym or contrast word", "ko": "짧은 비교 설명", "active": false},
    {"en": "${word}", "ko": "이 단어의 핵심 뉘앙스", "active": true}
  ],
  "nuance": "ONE short Korean sentence on nuance. No HTML. No synonym dictionary dump.",
  "examples": [
    {"en": "one natural example sentence", "ko": "한국어 번역"}
  ],
  "endef": ["1-2 short English definition sentences for learners"],
  "takeaway": "ONE short Korean takeaway line",
  "synonyms": ["up to 3 English synonym words only, no Korean glosses"],
  "antonyms": ["up to 3 English antonym words only"],
  "where": "짧은 사용 맥락 (예: 뉴스·일상)",
  "metaDescription": "Korean SEO: '{word} 뜻과 예문. meaning.'"
}
Rules:
- collocations: exactly 2–3 items
- examples: 1–2 items (natural, not textbooky)
- synonyms/antonyms: bare English words only
- Do not use HTML tags
- Keep everything concise; avoid repeating the same idea`;
  const models = [process.env.WOTD_MODEL, 'gpt-4o-mini', 'gpt-3.5-turbo'].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );
  let raw;
  let lastErr;
  for (const model of models) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        ...(model === 'gpt-3.5-turbo' ? {} : { response_format: { type: 'json_object' } }),
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content:
              'You are an English teacher writing Korean Word-of-the-Day posts for adult learners. Reply with JSON only.',
          },
          { role: 'user', content: userPrompt },
        ],
      });
      raw = completion.choices[0]?.message?.content;
      if (raw) break;
    } catch (err) {
      lastErr = err;
      console.warn(`  모델 ${model} 실패, 다음 시도:`, err.message);
    }
  }
  if (!raw && lastErr) throw lastErr;
  if (!raw) throw new Error('GPT 응답이 비었습니다.');
  const jsonText = String(raw)
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  const data = JSON.parse(jsonText);
  if (!data.word || !data.meaning || !Array.isArray(data.examples) || data.examples.length < 1) {
    throw new Error('GPT JSON 형식이 올바르지 않습니다.');
  }
  if (!Array.isArray(data.collocations) || data.collocations.length < 1) {
    throw new Error('GPT collocations 가 없습니다.');
  }
  data.examples = data.examples.slice(0, 3);
  data.collocations = data.collocations.slice(0, 3);
  if (Array.isArray(data.synonyms)) {
    data.synonyms = data.synonyms
      .map((s) => String(s || '').trim())
      .filter(Boolean)
      .slice(0, 3);
  } else {
    data.synonyms = [];
  }
  if (Array.isArray(data.antonyms)) {
    data.antonyms = data.antonyms
      .map((s) => String(s || '').trim())
      .filter(Boolean)
      .slice(0, 3);
  } else {
    data.antonyms = [];
  }
  if (!Array.isArray(data.compares)) data.compares = [];
  if (!Array.isArray(data.endef) && data.endef) data.endef = [String(data.endef)];
  if (!Array.isArray(data.endef)) data.endef = [];
  return data;
}

async function deleteMatching({ title, slug, password }) {
  const list = await fetchWordofdayEntries();
  const targets = list.filter((e) => e?._id && (e.title === title || (slug && e.slug === slug)));
  let deleted = 0;
  for (const e of targets) {
    const delRes = await fetch(`${API_BASE}/wordofday-deletepost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e._id, password }),
    });
    if (delRes.ok) {
      deleted += 1;
      console.log(`  삭제: "${e.title}"`);
    }
  }
  if (deleted > 0) console.log(`기존 글 ${deleted}건 삭제됨.`);
  else console.log('  삭제할 기존 글 없음.');
  return deleted;
}

function git(cmd) {
  return execSync(cmd, { cwd: REPO_ROOT, stdio: 'inherit', encoding: 'utf8' });
}

function gitPull() {
  git('git pull origin main --no-edit');
}

function gitCommitAndPush(slug, word) {
  const seoDir = path.join('word-of-the-day', slug).replace(/\\/g, '/');
  git(`git add "${seoDir}" sitemap.xml`);
  try {
    git(`git commit -m "Add word of the day: ${word}"`);
  } catch (err) {
    const msg = `${err.stdout || ''}${err.stderr || ''}${err.message || ''}`;
    if (/nothing to commit/i.test(msg)) {
      console.log('  git: 커밋할 변경 없음.');
      return;
    }
    throw err;
  }
  git('git push origin main');
}

async function publishOne({ word: inputWord, image, examples = [], dryRun, noGit, usedKeys }) {
  const filename = resolveLocalImage(image || inputWord);
  const pickedWord = String(inputWord || basenameToWord(path.basename(filename, path.extname(filename)))).trim();
  console.log(`\n── ${pickedWord}`);
  console.log(`  이미지: /resources/${filename}`);
  if (examples.length) console.log(`  예문(사용자): ${examples.length}개`);

  const generated = await generateEntryContent(pickedWord);
  if (examples.length) {
    generated.examples = examples.slice(0, 3);
  }
  const word = generated.word || pickedWord;
  const slug = toSlug(word);
  const imageSrc = imageSrcFromFilename(filename);
  const title = buildTitle(word, generated.meaning);
  const message = buildWordofdayMessage({
    ...generated,
    word,
    imageSrc,
  });
  const metaDescription = buildMetaDescription({ ...generated, word, examples: generated.examples });
  const password = `seed_password_${slug}`;
  const datePublished = toIsoDateOnly();

  console.log(`  제목: ${title}`);
  console.log(`  slug: ${slug}`);

  if (usedKeys) {
    usedKeys.add(normalizeWord(word));
    usedKeys.add(normalizeWord(slug));
  }

  if (dryRun) {
    console.log('  [dry-run] API/git 생략. 본문 미리보기 (앞 360자):');
    console.log(message.slice(0, 360));
    return { title, slug, dryRun: true };
  }

  if (!noGit) {
    console.log('  Git pull...');
    gitPull();
  }

  await deleteMatching({ title, slug, password });

  const res = await fetch(`${API_BASE}/wordofday`, {
    method: 'POST',
    headers: writeAuthHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify({
      title,
      message,
      nickname: 'admin',
      password,
      isSecret: false,
      slug,
      metaDescription,
    }),
  });
  const data = await res.json();
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    return { title, slug, error: data.error || res.status };
  }
  console.log('  추가됨:', title);

  const seo = applySeoAfterUpload('word-of-the-day', {
    title,
    slug,
    metaDescription,
    datePublished,
    message,
  });
  if (seo?.seoPath) console.log('  SEO page:', seo.seoPath);
  if (seo?.sitemapPath) console.log('  sitemap:', seo.sitemapPath);
  console.log(`  URL: ${seo?.url || `${SITE_ORIGIN}/word-of-the-day/${encodeURIComponent(slug)}/`}`);

  if (noGit) {
    console.log('  Git 생략. 나중에:');
    console.log(
      `  cd C:\\langchain; git add word-of-the-day/${slug}/ sitemap.xml resources/${filename}; git commit -m "Add word of the day: ${word}"; git push origin main`
    );
  } else {
    console.log('  Git 배포 중...');
    const seoDir = path.join('word-of-the-day', slug).replace(/\\/g, '/');
    const imgRel = path.join('resources', filename).replace(/\\/g, '/');
    try {
      git(`git add "${seoDir}" sitemap.xml "${imgRel}"`);
    } catch {
      git(`git add "${seoDir}" sitemap.xml`);
    }
    try {
      git(`git commit -m "Add word of the day: ${word}"`);
      git('git push origin main');
      console.log('  git push 완료.');
    } catch (err) {
      const msg = `${err.stdout || ''}${err.stderr || ''}${err.message || ''}`;
      if (/nothing to commit/i.test(msg)) console.log('  git: 커밋할 변경 없음.');
      else throw err;
    }
  }

  return { title, slug, url: seo?.url };
}

export async function runAuto() {
  const dryRun = hasFlag('--dry-run');
  const listOnly = hasFlag('--list');
  const noGit = hasFlag('--no-git') || dryRun;
  const forcedWord = argValue('--word');
  const forcedImage = argValue('--image');
  const fromFile = argValue('--from');
  const cliExamples = examplesFromCli();

  console.log('Word of the Day 자동 처리...', API_BASE);

  const entries = await fetchWordofdayEntries();
  const usedKeys = usedKeysFromEntries(entries);
  const { source, candidates } = await listResourceCandidates();
  const unused = candidates.filter((c) => !usedKeys.has(c.key));

  console.log(`  이미지 출처: ${source} (${candidates.length}개 단어 후보, 미게시 ${unused.length}개)`);
  console.log(`  기존 글: ${entries.length}건`);

  if (listOnly) {
    console.log('\n미게시 후보:');
    for (const c of unused.sort((a, b) => a.word.localeCompare(b.word))) {
      console.log(`  - ${c.word}  (${c.filename})`);
    }
    return;
  }

  /** 배치 파일 */
  if (fromFile) {
    const batch = loadBatchFile(fromFile);
    console.log(`  배치: ${batch.length}건 (${fromFile})`);
    const results = [];
    for (const item of batch) {
      const r = await publishOne({
        word: item.word,
        image: item.image,
        examples: item.examples,
        dryRun,
        noGit,
        usedKeys,
      });
      results.push(r);
    }
    console.log('\n완료.', results.length, '건');
    return results;
  }

  /** 단일: --word/--image 또는 미게시 랜덤
   *  이미지 확장자는 jpg/png/webp/gif 아무거나 → 이름만 맞으면 1개 자동 선택 */
  let word = forcedWord;
  let image = forcedImage;
  if (!image && !word) {
    const picked = pickCandidate(candidates, usedKeys, null);
    word = picked.word;
    image = picked.filename;
  } else if (!image && word) {
    image = word; /* resolveLocalImage 가 확장자별 조회 */
  } else if (image && !word) {
    const resolved = resolveLocalImage(image);
    word = basenameToWord(path.basename(resolved, path.extname(resolved)));
    image = resolved;
  }

  const result = await publishOne({
    word,
    image,
    examples: cliExamples,
    dryRun,
    noGit,
    usedKeys,
  });
  console.log('\n완료.');
  return result;
}

if (process.argv[1] && path.normalize(process.argv[1]) === path.normalize(__filename)) {
  runAuto().catch((e) => {
    console.error('  오류:', e.message);
    process.exit(1);
  });
}
