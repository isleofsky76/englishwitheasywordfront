/**
 * Word of the Day 자동 게시
 *
 * 1) 이미 올라간 글은 건너뛰고
 * 2) GitHub(또는 로컬) resources/ 에서 단어 이미지 선택
 * 3) GPT로 뜻·예문 생성
 * 4) prod API 업로드 + SEO 페이지 + git push
 *
 * 사용법 (backend 폴더):
 *   node scripts/send-wordofday-entry.js --auto
 *   node scripts/send-wordofday-entry.js --auto --dry-run
 *   node scripts/send-wordofday-entry.js --auto --no-git
 *   node scripts/send-wordofday-entry.js --auto --word admonish
 *   node scripts/send-wordofday-entry.js --auto --list
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import OpenAI from 'openai';
import { API_BASE } from './loadEnv.js';
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

function hasFlag(flag) {
  return process.argv.includes(flag);
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
  const userPrompt = `Create a Word of the Day lesson for the English word or phrase: "${word}".
Audience: Korean adults studying practical English (news, work, daily life).
Return JSON with exactly these keys:
{
  "word": "canonical English form, usually lowercase unless a proper noun",
  "ipa": "IPA with slashes like /prɪˈkɔːʃən/",
  "ipaKo": "Korean approximation of the pronunciation, hangul only",
  "pos": "품사 in Korean (명사/동사/형용사/부사/숙어 등)",
  "meaning": "short primary Korean meaning",
  "meaningExtra": "one or two extra Korean glosses, comma-separated, no HTML",
  "collocations": [
    {"en": "natural collocation containing the word", "ko": "짧은 한국어 뜻"}
  ],
  "meaningHighlight": "한 줄 핵심 뜻 (한국어)",
  "nuance": "2 sentences in Korean explaining the nuance. Mention the word and 1-2 collocations in plain text (no HTML). Start after an implied '→'. Do not include the '→' character.",
  "examples": [
    {"en": "natural example sentence using the word", "ko": "자연스러운 한국어 번역"}
  ],
  "coreNuance": "1-2 Korean sentences. Start with the English word, then ' → ', then the key nuance, then say that the collocations are commonly used.",
  "metaDescription": "Korean SEO sentence: '{word} 뜻과 예문. meaning, collocations.'"
}
Rules:
- collocations: exactly 3 items, high-frequency, exam/news useful
- examples: exactly 3 items, intermediate, no slang abuse, no sexual/violent content
- Do not use HTML tags
- Keep Korean natural and concise`;
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
  if (!data.word || !data.meaning || !Array.isArray(data.examples) || data.examples.length < 3) {
    throw new Error('GPT JSON 형식이 올바르지 않습니다.');
  }
  if (!Array.isArray(data.collocations) || data.collocations.length < 3) {
    throw new Error('GPT collocations 가 3개 미만입니다.');
  }
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

export async function runAuto() {
  const dryRun = hasFlag('--dry-run');
  const listOnly = hasFlag('--list');
  const noGit = hasFlag('--no-git') || dryRun;
  const forcedWord = argValue('--word');
  const forcedImage = argValue('--image');

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

  let picked;
  if (forcedImage) {
    const filename = path.basename(forcedImage);
    const ext = path.extname(filename);
    const base = path.basename(filename, ext);
    picked = {
      key: normalizeWord(basenameToWord(base)),
      word: forcedWord || basenameToWord(base),
      filename,
    };
  } else {
    picked = pickCandidate(candidates, usedKeys, forcedWord);
  }

  console.log(`  선택 단어: ${picked.word}`);
  console.log(`  선택 이미지: /resources/${picked.filename}`);

  const generated = await generateEntryContent(picked.word);
  const word = generated.word || picked.word;
  const slug = toSlug(word);
  const imageSrc = imageSrcFromFilename(picked.filename);
  const title = buildTitle(word, generated.meaning);
  const message = buildWordofdayMessage({
    ...generated,
    word,
    imageSrc,
  });
  const metaDescription = buildMetaDescription(generated);
  const password = `seed_password_${slug}`;
  const datePublished = toIsoDateOnly();

  console.log(`  제목: ${title}`);
  console.log(`  slug: ${slug}`);

  if (dryRun) {
    console.log('\n[dry-run] API/git 생략. 본문 미리보기 (앞 400자):');
    console.log(message.slice(0, 400));
    return { title, slug, dryRun: true };
  }

  if (!noGit) {
    console.log('\nGit pull...');
    gitPull();
  }

  await deleteMatching({ title, slug, password });

  const res = await fetch(`${API_BASE}/wordofday`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    return;
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
    console.log('\nGit 배포 생략. 직접 배포하려면:');
    console.log(
      `cd C:\\langchain; git pull origin main --no-edit; git add word-of-the-day/${slug}/ sitemap.xml; git commit -m "Add word of the day: ${word}"; git push origin main`
    );
  } else {
    console.log('\nGit 배포 중...');
    gitCommitAndPush(slug, word);
    console.log('  git push 완료. Netlify 배포까지 1~2분 기다리세요.');
  }

  console.log('완료.');
  return { title, slug, url: seo?.url };
}

if (process.argv[1] && path.normalize(process.argv[1]) === path.normalize(__filename)) {
  runAuto().catch((e) => {
    console.error('  오류:', e.message);
    process.exit(1);
  });
}
