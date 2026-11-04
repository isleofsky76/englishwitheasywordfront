/**
 * @istudyeng 최신 Shorts → data/youtube-shorts.json
 *
 * 사용법 (repo root 또는 이 폴더):
 *   node backend/youtube_automation/sync-shorts.js
 *   node backend/youtube_automation/sync-shorts.js --limit 8
 *   node backend/youtube_automation/sync-shorts.js --dry-run
 *
 * API 키 불필요 — YouTube 채널 Atom RSS 사용 (youtube-rss.js)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  fetchChannelVideos,
  DEFAULT_CHANNEL_ID,
  DEFAULT_HANDLE,
} from '../scripts/youtube-rss.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..', '..');
const DEFAULT_OUT = path.join(REPO_ROOT, 'data', 'youtube-shorts.json');

function parseArgs(argv) {
  const args = { limit: 6, out: DEFAULT_OUT, dryRun: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--limit' && argv[i + 1]) {
      args.limit = Math.max(1, Number(argv[++i]) || 6);
    } else if (a === '--out' && argv[i + 1]) {
      args.out = path.resolve(argv[++i]);
    } else if (a === '--help' || a === '-h') {
      args.help = true;
    }
  }
  return args;
}

function toItem(video) {
  const videoId = String(video.videoId || '').trim();
  if (!videoId) return null;
  return {
    videoId,
    title: String(video.title || '').trim() || videoId,
    publishedAt: String(video.published || video.updated || '').trim(),
    thumbnail:
      String(video.thumbnail || '').trim() ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    url: `https://www.youtube.com/shorts/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

function stableStringify(obj) {
  return `${JSON.stringify(obj, null, 2)}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(`Usage: node backend/youtube_automation/sync-shorts.js [--limit N] [--out path] [--dry-run]`);
    process.exit(0);
  }

  const feed = await fetchChannelVideos({
    channelId: process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID,
    enrich: false,
  });

  const items = (feed.videos || [])
    .map(toItem)
    .filter(Boolean)
    .slice(0, args.limit);

  const payload = {
    updatedAt: new Date().toISOString(),
    channelId: feed.channelId || DEFAULT_CHANNEL_ID,
    handle: feed.handle || DEFAULT_HANDLE,
    source: feed.source || '',
    items,
  };

  const next = stableStringify(payload);
  if (args.dryRun) {
    console.log(next);
    console.log(`[dry-run] ${items.length} items (not written)`);
    return;
  }

  fs.mkdirSync(path.dirname(args.out), { recursive: true });
  let prev = '';
  try {
    prev = fs.readFileSync(args.out, 'utf8');
  } catch {
    /* first write */
  }

  /* videoId 목록이 같으면 updatedAt만 바뀌는 무의미한 커밋 방지 */
  let prevIds = '';
  try {
    prevIds = JSON.parse(prev)
      .items.map((x) => x.videoId)
      .join(',');
  } catch {
    prevIds = '';
  }
  const nextIds = items.map((x) => x.videoId).join(',');
  if (prev && prevIds === nextIds) {
    console.log(`[skip] unchanged (${items.length} shorts) → ${path.relative(REPO_ROOT, args.out)}`);
    process.exit(0);
  }

  fs.writeFileSync(args.out, next, 'utf8');
  console.log(`[ok] wrote ${items.length} shorts → ${path.relative(REPO_ROOT, args.out)}`);
  items.forEach((it, i) => {
    console.log(`  ${i + 1}. ${it.videoId}  ${it.title}`);
  });
}

main().catch((err) => {
  console.error('[error]', err.message || err);
  process.exit(1);
});
