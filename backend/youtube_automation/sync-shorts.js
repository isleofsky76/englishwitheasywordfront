/**
 * @istudyeng 최신 Shorts → data/youtube-shorts.json
 *
 * 유튜브 제목 규칙 (권장):
 *   국제 | 항공기 허위 폭탄 테러
 *   연관단어 | 묵인하다 Acquiesce
 *
 * 사용법:
 *   node backend/youtube_automation/sync-shorts.js
 *   node backend/youtube_automation/sync-shorts.js --limit 6
 *   node backend/youtube_automation/sync-shorts.js --today          # D-day(한국시간 오늘)만
 *   node backend/youtube_automation/sync-shorts.js --dry-run
 *
 * API 키 불필요 — YouTube 채널 Atom RSS
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

/** 제목 앞 카테고리 → 홈 라벨·목록 링크 */
const CATEGORY_MAP = {
  국제: { label: '국제', href: 'news-voca-list.html' },
  한국: { label: '한국', href: 'korea-news-list.html' },
  국방: { label: '국방', href: 'defense-news-list.html' },
  경제: { label: '경제', href: 'economy-news-list.html' },
  스포츠: { label: '스포츠', href: 'sports-news-list.html' },
  미국: { label: '미국', href: 'us-news-list.html' },
  산업: { label: '산업', href: 'industry-news-list.html' },
  유통: { label: '유통', href: 'retail-news-list.html' },
  여행: { label: '여행', href: 'travel-news-list.html' },
  컬쳐: { label: '컬쳐', href: 'culture-voca-list.html' },
  문화: { label: '컬쳐', href: 'culture-voca-list.html' },
  요리: { label: '요리', href: 'cooking-voca-list.html' },
  연관단어: { label: '연관단어', href: 'english-synonym-list.html' },
  유의어: { label: '연관단어', href: 'english-synonym-list.html' },
  문장: { label: '문장', href: 'one-sentence.html' },
  퀴즈: { label: '퀴즈', href: 'vocabulary-quiz-list.html' },
  단어장: { label: '단어장', href: 'word-of-the-day-list.html' },
  표현: { label: '이럴 땐 영어로?', href: 'popular-voca-list.html' },
  상황: { label: '상황', href: 'situational-english-list.html' },
  포토: { label: '포토', href: 'photo-english-list.html' },
  오피니언: { label: '오피니언', href: 'english-opinions-list.html' },
};

function parseArgs(argv) {
  const args = { limit: 6, out: DEFAULT_OUT, dryRun: false, todayOnly: false };
  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--dry-run') args.dryRun = true;
    else if (a === '--today' || a === '--dday') args.todayOnly = true;
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

function mapCategory(categoryKey) {
  const key = String(categoryKey || '').replace(/\s+/g, '').trim();
  const mapped = CATEGORY_MAP[key] || null;
  return {
    category: key,
    categoryKey: key,
    label: mapped ? mapped.label : key,
    href: mapped ? mapped.href : '',
  };
}

/** "국제 | 제목" / "국제|제목" / "국제｜제목" — 없으면 #연관단어 등 해시태그 보조 */
export function parseCategoryTitle(rawTitle) {
  const raw = String(rawTitle || '').trim();
  const m = raw.match(/^([^|｜\n]{1,20})\s*[|｜]\s*(.+)$/);
  if (m) {
    const meta = mapCategory(m[1]);
    return {
      ...meta,
      title: m[2].trim() || raw,
      rawTitle: raw,
    };
  }

  /* 보조: 제목 끝 #연관단어 #국제 등 */
  const hash = raw.match(/#([^\s#]{1,20})\s*$/);
  if (hash && CATEGORY_MAP[hash[1].replace(/\s+/g, '')]) {
    const meta = mapCategory(hash[1]);
    const title = raw.replace(/\s*#[^\s#]+\s*$/, '').trim() || raw;
    return {
      ...meta,
      title,
      rawTitle: raw,
    };
  }

  return {
    category: '',
    categoryKey: '',
    label: '',
    href: '',
    title: raw,
    rawTitle: raw,
  };
}

function kstDateKey(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(d);
}

function todayKstKey() {
  return kstDateKey(new Date().toISOString());
}

function toItem(video) {
  const videoId = String(video.videoId || '').trim();
  if (!videoId) return null;
  const publishedAt = String(video.published || video.updated || '').trim();
  const parsed = parseCategoryTitle(video.title);
  return {
    videoId,
    category: parsed.categoryKey || '',
    label: parsed.label || '',
    href: parsed.href || '',
    title: parsed.title,
    rawTitle: parsed.rawTitle,
    publishedAt,
    publishedKst: kstDateKey(publishedAt),
    thumbnail:
      String(video.thumbnail || '').trim() ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    url: `https://www.youtube.com/shorts/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };
}

function fingerprint(payload) {
  const items = Array.isArray(payload?.items) ? payload.items : [];
  return items
    .map((x) =>
      [x.videoId, x.category || '', x.label || '', x.title || '', x.rawTitle || ''].join('\t')
    )
    .join('\n');
}

function stableStringify(obj) {
  return `${JSON.stringify(obj, null, 2)}\n`;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(`Usage:
  node backend/youtube_automation/sync-shorts.js [--limit N] [--today] [--out path] [--dry-run]

Title format:
  국제 | 제목
  연관단어 | 제목`);
    process.exit(0);
  }

  const feed = await fetchChannelVideos({
    channelId: process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID,
    enrich: false,
  });

  let items = (feed.videos || []).map(toItem).filter(Boolean);

  if (args.todayOnly) {
    const today = todayKstKey();
    items = items.filter((it) => it.publishedKst === today);
    console.log(`[filter] D-day KST ${today} → ${items.length} shorts`);
  }

  items = items.slice(0, args.limit);

  const payload = {
    updatedAt: new Date().toISOString(),
    channelId: feed.channelId || DEFAULT_CHANNEL_ID,
    handle: feed.handle || DEFAULT_HANDLE,
    source: feed.source || '',
    titleFormat: '카테고리 | 제목',
    timezone: 'Asia/Seoul',
    todayOnly: Boolean(args.todayOnly),
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

  let prevFp = '';
  try {
    prevFp = fingerprint(JSON.parse(prev));
  } catch {
    prevFp = '';
  }
  if (prev && prevFp === fingerprint(payload)) {
    console.log(`[skip] unchanged (${items.length} shorts) → ${path.relative(REPO_ROOT, args.out)}`);
    process.exit(0);
  }

  fs.writeFileSync(args.out, next, 'utf8');
  console.log(`[ok] wrote ${items.length} shorts → ${path.relative(REPO_ROOT, args.out)}`);
  items.forEach((it, i) => {
    const tag = it.label ? `[${it.label}] ` : '';
    console.log(`  ${i + 1}. ${it.videoId}  ${tag}${it.title}`);
  });
}

main().catch((err) => {
  console.error('[error]', err.message || err);
  process.exit(1);
});
