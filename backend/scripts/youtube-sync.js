/**
 * @istudyeng 최신 Shorts → 사이트 글 초안/업로드
 *
 * 사용법 (backend 폴더):
 *   node scripts/youtube-sync.js --list
 *   node scripts/youtube-sync.js --draft
 *   node scripts/youtube-sync.js --draft --limit 3
 *   node scripts/youtube-sync.js --upload <videoId>
 *   node scripts/youtube-sync.js --upload-drafts
 *   node scripts/youtube-sync.js --playlist PL.... --list
 *
 * 기본: 새 영상만 초안 JSON 생성 (자동 공개 업로드 안 함)
 * --upload / --upload-drafts 로 검수 후 게시
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import OpenAI from 'openai';
import { API_BASE } from './loadEnv.js';
import { fetchChannelVideos } from './youtube-rss.js';
import {
  parseYoutubeDescription,
  applySynonymWordFormat,
} from './youtube-description-parse.js';
import { hangulForExpression, ipaForExpression } from './ipa-to-hangul.js';
import { uploadNewsVoca } from './news-voca-format.js';
import { uploadCultureVoca } from './culture-voca-format.js';
import { uploadSportsNews } from './sports-news-format.js';
import { uploadIndustryNews } from './industry-news-format.js';
import { uploadEconomyNews } from './economy-news-format.js';
import { uploadDefenseNews } from './defense-news-format.js';
import { uploadTravelNews } from './travel-news-format.js';
import { uploadKoreaNews } from './korea-news-format.js';
import { uploadSynonym } from './synonym-format.js';
import { uploadUsNews } from './us-news-format.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const STATE_PATH = path.join(__dirname, 'youtube-sync-state.json');
const DRAFTS_DIR = path.join(__dirname, 'youtube-drafts');

const UPLOADERS = {
  'news-voca': uploadNewsVoca,
  'culture-voca': uploadCultureVoca,
  'sports-news': uploadSportsNews,
  'industry-news': uploadIndustryNews,
  'economy-news': uploadEconomyNews,
  'defense-news': uploadDefenseNews,
  'travel-news': uploadTravelNews,
  'korea-news': uploadKoreaNews,
  'english-synonym': uploadSynonym,
  'us-news': uploadUsNews,
};

function parseArgs(argv) {
  const args = {
    list: false,
    draft: false,
    upload: '',
    uploadDrafts: false,
    limit: 10,
    playlist: '',
    includeSeen: false,
    markSeen: false,
    ids: [],
    board: '',
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--list') args.list = true;
    else if (a === '--draft') args.draft = true;
    else if (a === '--upload-drafts') args.uploadDrafts = true;
    else if (a === '--include-seen') args.includeSeen = true;
    else if (a === '--mark-seen') args.markSeen = true;
    else if (a === '--upload') args.upload = String(argv[++i] || '').trim();
    else if (a === '--limit') args.limit = Math.max(1, Number(argv[++i]) || 10);
    else if (a === '--playlist') args.playlist = String(argv[++i] || '').trim();
    else if (a === '--board') args.board = String(argv[++i] || '').trim();
    else if (a === '--ids') {
      args.ids = String(argv[++i] || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (a === '--help' || a === '-h') args.help = true;
  }
  if (!args.list && !args.draft && !args.upload && !args.uploadDrafts && !args.markSeen) {
    args.list = true;
  }
  return args;
}

function loadState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { seenVideoIds: {}, uploadedVideoIds: {}, updatedAt: '' };
  }
  try {
    return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  } catch {
    return { seenVideoIds: {}, uploadedVideoIds: {}, updatedAt: '' };
  }
}

function saveState(state) {
  state.updatedAt = new Date().toISOString();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
}

/** 이미 사이트/시드에 연결된 영상 ID 수집 */
function discoverKnownVideoIds() {
  const ids = new Set();
  const re = /(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/gi;
  const scanDirs = [
    path.join(__dirname),
    path.join(REPO_ROOT, 'news-voca'),
    path.join(REPO_ROOT, 'culture-voca'),
    path.join(REPO_ROOT, 'sports-news'),
    path.join(REPO_ROOT, 'industry-news'),
    path.join(REPO_ROOT, 'economy-news'),
    path.join(REPO_ROOT, 'defense-news'),
    path.join(REPO_ROOT, 'travel-news'),
    path.join(REPO_ROOT, 'korea-news'),
  ];
  for (const dir of scanDirs) {
    if (!fs.existsSync(dir)) continue;
    const walk = (p, depth = 0) => {
      if (depth > 3) return;
      let entries;
      try {
        entries = fs.readdirSync(p, { withFileTypes: true });
      } catch {
        return;
      }
      for (const ent of entries) {
        const full = path.join(p, ent.name);
        if (ent.isDirectory()) {
          if (ent.name === 'node_modules' || ent.name === 'youtube-drafts') continue;
          walk(full, depth + 1);
        } else if (/\.(js|html|json|md)$/i.test(ent.name)) {
          let text = '';
          try {
            text = fs.readFileSync(full, 'utf8');
          } catch {
            continue;
          }
          let m;
          while ((m = re.exec(text)) !== null) ids.add(m[1]);
        }
      }
    };
    walk(dir);
  }
  return ids;
}

function ensureDraftsDir() {
  if (!fs.existsSync(DRAFTS_DIR)) fs.mkdirSync(DRAFTS_DIR, { recursive: true });
}

function draftPath(videoId) {
  return path.join(DRAFTS_DIR, `${videoId}.json`);
}

function writeDraft(article) {
  ensureDraftsDir();
  const file = draftPath(article.videoId);
  const payload = {
    ...article,
    status: 'draft',
    createdAt: new Date().toISOString(),
  };
  fs.writeFileSync(file, JSON.stringify(payload, null, 2), 'utf8');
  return file;
}

function readDraft(videoId) {
  const file = draftPath(videoId);
  if (!fs.existsSync(file)) throw new Error(`초안 없음: ${file}`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function stripIpaSlashes(ipa) {
  return String(ipa || '')
    .replace(/^\/+|\/+$/g, '')
    .trim();
}

/** 무료 사전 API로 IPA (한글 근사는 OpenAI가 있을 때만) */
async function fetchPronunciationFromDictionary(expression) {
  const head = String(expression || '')
    .trim()
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/[^a-z'-]/g, '');
  if (!head) return null;
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(head)}`, {
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const entry = Array.isArray(data) ? data[0] : null;
    if (!entry) return null;
    let ipa = stripIpaSlashes(entry.phonetic || '');
    if (!ipa && Array.isArray(entry.phonetics)) {
      for (const p of entry.phonetics) {
        const t = stripIpaSlashes(p?.text || '');
        if (t) {
          ipa = t;
          break;
        }
      }
    }
    if (!ipa) return null;
    return { ipa, ipaKo: '' };
  } catch {
    return null;
  }
}

async function fetchPronunciationsViaOpenAI(list) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return {};
  const openai = new OpenAI({ apiKey });
  const models = [process.env.YOUTUBE_SYNC_MODEL, 'gpt-4o-mini'].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );
  const prompt = `For each English word/phrase below, return JSON object mapping the exact lowercase expression to {"ipa":"IPA without surrounding slashes","ipaKo":"Korean hangul approximation only"}.
Expressions:
${list.map((e) => `- ${e}`).join('\n')}
Rules: reply JSON only; keys must match expressions lowercased; IPA like ˈrænˌsæk not /ˈrænˌsæk/.`;
  for (const model of models) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        response_format: { type: 'json_object' },
        temperature: 0.2,
        messages: [
          {
            role: 'system',
            content: 'You are a pronunciation helper for Korean English learners. Reply with JSON only.',
          },
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
      const out = {};
      for (const exp of list) {
        const hit = data[exp] || data[exp.toLowerCase()];
        if (hit && (hit.ipa || hit.ipaKo)) {
          out[exp.toLowerCase()] = {
            ipa: stripIpaSlashes(hit.ipa),
            ipaKo: String(hit.ipaKo || '').trim(),
          };
        }
      }
      return out;
    } catch (err) {
      console.warn(`  발음 모델 ${model} 실패:`, err.message);
    }
  }
  return {};
}

/** 연관단어용 IPA + 한글 발음 (기존 ransack 양식) */
async function fetchPronunciations(expressions) {
  const list = (expressions || []).map((e) => String(e || '').trim()).filter(Boolean);
  if (!list.length) return {};

  let out = await fetchPronunciationsViaOpenAI(list);
  const missing = list.filter((e) => !out[e.toLowerCase()]?.ipa);
  if (missing.length) {
    console.log(`  사전 API로 발음 보강... (${missing.length}개)`);
    for (const exp of missing) {
      const hit = await fetchPronunciationFromDictionary(exp);
      if (hit?.ipa) out[exp.toLowerCase()] = hit;
      await new Promise((r) => setTimeout(r, 120));
    }
  }
  return out;
}

function fillHangulPronunciations(pronunciations, expressions) {
  const out = { ...(pronunciations || {}) };
  for (const exp of expressions || []) {
    const key = String(exp || '').trim().toLowerCase();
    if (!key) continue;
    const cur = out[key] || {};
    const ipa = ipaForExpression(exp, cur.ipa);
    let ipaKo = String(cur.ipaKo || '').trim();
    if (!ipaKo) ipaKo = hangulForExpression(exp, ipa);
    out[key] = { ipa, ipaKo };
  }
  return out;
}

async function prepareArticle(article) {
  let next = { ...article };
  if (next.board === 'english-synonym') {
    const expressions = (next.wordMeta || []).map((w) => w.expression);
    console.log(`  연관단어 발음 생성 중... (${expressions.length}개)`);
    let pronunciations = await fetchPronunciations(expressions);
    pronunciations = fillHangulPronunciations(pronunciations, expressions);
    next = applySynonymWordFormat(next, pronunciations);
    next.pronunciations = pronunciations;
  }
  return next;
}

async function uploadArticle(article) {
  const prepared = await prepareArticle(article);
  const board = prepared.board || 'news-voca';
  const upload = UPLOADERS[board];
  if (!upload) {
    throw new Error(`보드 "${board}" 업로더가 없습니다. news-voca 등으로 board를 수정하세요.`);
  }
  if (!prepared.parsedWordCount && !(prepared.words || []).length) {
    throw new Error('단어가 비어 있어 업로드할 수 없습니다. 설명란 파싱을 확인하세요.');
  }
  console.log(`\n업로드: [${board}] ${prepared.title} (${prepared.videoId})`);
  await upload(prepared, API_BASE);
  const file = draftPath(prepared.videoId);
  fs.writeFileSync(
    file,
    JSON.stringify({ ...prepared, status: 'uploaded', uploadedAt: new Date().toISOString() }, null, 2),
    'utf8'
  );
}

function printHelp() {
  console.log(`YouTube → 시사영단어 동기화

  node scripts/youtube-sync.js --list
  node scripts/youtube-sync.js --draft [--limit 5]
  node scripts/youtube-sync.js --upload <videoId>
  node scripts/youtube-sync.js --upload-drafts
  node scripts/youtube-sync.js --playlist <PLAYLIST_ID> --list
  node scripts/youtube-sync.js --mark-seen   # 현재 채널 최신을 모두 본 것으로 표시

상태: ${STATE_PATH}
초안: ${DRAFTS_DIR}
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const state = loadState();
  const known = discoverKnownVideoIds();
  for (const id of known) {
    if (!state.seenVideoIds[id]) state.seenVideoIds[id] = { via: 'repo-scan', at: new Date().toISOString() };
    if (!state.uploadedVideoIds[id]) state.uploadedVideoIds[id] = { via: 'repo-scan', at: new Date().toISOString() };
  }

  if (args.upload) {
    const draft = readDraft(args.upload);
    await uploadArticle(draft);
    state.uploadedVideoIds[args.upload] = { at: new Date().toISOString(), board: draft.board };
    state.seenVideoIds[args.upload] = state.seenVideoIds[args.upload] || { at: new Date().toISOString() };
    saveState(state);
    console.log('완료.');
    return;
  }

  if (args.uploadDrafts) {
    ensureDraftsDir();
    const files = fs.readdirSync(DRAFTS_DIR).filter((f) => f.endsWith('.json'));
    let n = 0;
    for (const f of files) {
      const draft = JSON.parse(fs.readFileSync(path.join(DRAFTS_DIR, f), 'utf8'));
      if (draft.status === 'uploaded') continue;
      if (state.uploadedVideoIds[draft.videoId]) continue;
      await uploadArticle(draft);
      state.uploadedVideoIds[draft.videoId] = { at: new Date().toISOString(), board: draft.board };
      state.seenVideoIds[draft.videoId] = state.seenVideoIds[draft.videoId] || { at: new Date().toISOString() };
      n += 1;
    }
    saveState(state);
    console.log(`업로드 ${n}건 완료.`);
    return;
  }

  const feed = await fetchChannelVideos({
    playlistId: args.playlist || process.env.YOUTUBE_PLAYLIST_ID || '',
    /* list는 빠르게, draft/upload 전에만 watch 설명 보강 */
    enrich: Boolean(args.draft || args.upload || args.uploadDrafts),
  });
  console.log(`채널 ${feed.handle || ''} RSS: ${feed.videos.length}개 (최신순)`);
  if (feed.playlistId) console.log(`플레이리스트: ${feed.playlistId}`);

  let candidates = feed.videos.filter((v) => {
    if (args.ids.length) return args.ids.includes(v.videoId);
    if (args.includeSeen) return true;
    return !state.uploadedVideoIds[v.videoId];
  });
  if (args.ids.length) {
    const missing = args.ids.filter((id) => !feed.videos.some((v) => v.videoId === id));
    if (missing.length) console.warn('RSS에 없음(최신 15개 밖일 수 있음):', missing.join(', '));
  }

  if (args.markSeen) {
    for (const v of feed.videos) {
      state.seenVideoIds[v.videoId] = { at: new Date().toISOString(), title: v.title };
    }
    saveState(state);
    console.log(`본 것으로 표시: ${feed.videos.length}개`);
    return;
  }

  if (args.list) {
    const rows = candidates.slice(0, args.limit);
    if (!rows.length) {
      console.log('새 영상 없음 (이미 업로드/시드된 항목). --include-seen 으로 전체 표시 가능.');
      saveState(state);
      return;
    }
    for (const v of rows) {
      const article = parseYoutubeDescription(v);
      if (args.board) article.board = args.board;
      const flag = state.seenVideoIds[v.videoId] ? 'seen' : 'NEW';
      const skip = !article.parsedWordCount ? ' skip=단어없음' : '';
      console.log(
        `- [${flag}] ${v.videoId} | ${v.published?.slice(0, 10) || ''} | board=${article.board} words=${article.parsedWordCount}${skip} | ${v.title}`
      );
      if (!article.parsedWordCount) console.log('    ⚠️ 설명에서 단어를 못 찾음');
      if (article.board !== 'english-synonym' && !article.source?.url) {
        console.log('    ⚠️ 원문 링크 없음');
      }
    }
    saveState(state);
    return;
  }

  if (args.draft) {
    const rows = candidates.slice(0, args.limit);
    if (!rows.length) {
      console.log('초안 만들 새 영상 없음.');
      saveState(state);
      return;
    }
    let made = 0;
    for (const v of rows) {
      const article = parseYoutubeDescription(v);
      if (args.board) {
        article.board = args.board;
        article.password = `seed_${args.board.replace(/-/g, '_')}_${article.slug.slice(0, 48)}`;
      }
      state.seenVideoIds[v.videoId] = { at: new Date().toISOString(), title: v.title };
      if (!article.parsedWordCount) {
        console.log(`건너뜀(단어없음): ${v.videoId} | ${v.title}`);
        continue;
      }
      if (!UPLOADERS[article.board]) {
        console.log(`건너뜀(업로더 없음: ${article.board}): ${v.videoId} | ${v.title}`);
        continue;
      }
      const prepared = await prepareArticle(article);
      const file = writeDraft(prepared);
      made += 1;
      console.log(
        `초안: ${path.relative(REPO_ROOT, file)} | [${prepared.board}] words=${prepared.parsedWordCount} | ${prepared.title}`
      );
    }
    saveState(state);
    console.log(`\n초안 ${made}건 생성.`);
    console.log(`검수 후 업로드: node scripts/youtube-sync.js --upload <videoId>`);
    console.log(`또는 초안 일괄: node scripts/youtube-sync.js --upload-drafts`);
  }
}

main().catch((err) => {
  console.error('오류:', err.message || err);
  process.exitCode = 1;
});
