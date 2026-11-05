/**
 * @istudyeng 채널/플레이리스트 RSS 조회 (API 키 불필요)
 */
const DEFAULT_CHANNEL_ID = 'UC4LbF7X56QIHL3Oejt8kuyw';
const DEFAULT_HANDLE = '@istudyeng';

function decodeXml(s) {
  return String(s || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function feedUrl({ channelId, playlistId } = {}) {
  if (playlistId) {
    return `https://www.youtube.com/feeds/videos.xml?playlist_id=${encodeURIComponent(playlistId)}`;
  }
  return `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(
    channelId || process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID
  )}`;
}

export function parseAtomFeed(xml) {
  const entries = [];
  const blocks = String(xml || '').match(/<entry>[\s\S]*?<\/entry>/g) || [];
  for (const block of blocks) {
    const pick = (re) => {
      const m = block.match(re);
      return m ? decodeXml(m[1].trim()) : '';
    };
    const videoId = pick(/<yt:videoId>([^<]+)<\/yt:videoId>/i);
    if (!videoId) continue;
    entries.push({
      videoId,
      title: pick(/<media:title>([\s\S]*?)<\/media:title>/i) || pick(/<title>([\s\S]*?)<\/title>/i),
      published: pick(/<published>([^<]+)<\/published>/i),
      updated: pick(/<updated>([^<]+)<\/updated>/i),
      description: pick(/<media:description>([\s\S]*?)<\/media:description>/i),
      url: `https://www.youtube.com/shorts/${videoId}`,
      watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  }
  return entries;
}

function extractWatchDescription(html) {
  const patterns = [
    /"shortDescription":"((?:\\.|[^"\\])*)"/,
    /"description":\{"simpleText":"((?:\\.|[^"\\])*)"\}/,
  ];
  for (const re of patterns) {
    const m = String(html || '').match(re);
    if (!m) continue;
    try {
      return JSON.parse(`"${m[1]}"`);
    } catch {
      return m[1]
        .replace(/\\n/g, '\n')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\');
    }
  }
  return '';
}

/** RSS 설명이 잘린 경우 watch 페이지에서 보강 */
export async function enrichVideoDescription(video) {
  if (!video?.videoId) return video;
  const current = String(video.description || '');
  if (current.length > 2500 && /\n\d+\.\s/.test(current)) return video;
  try {
    const res = await fetch(video.watchUrl || `https://www.youtube.com/watch?v=${video.videoId}`, {
      headers: { 'Accept-Language': 'ko-KR,en;q=0.8' },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) return video;
    const full = extractWatchDescription(await res.text());
    if (full && full.length > current.length) {
      return { ...video, description: full, descriptionSource: 'watch' };
    }
  } catch {
    /* keep RSS */
  }
  return video;
}

const YT_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

function extractYtInitialData(html) {
  const patterns = [
    /ytInitialData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/,
    /var ytInitialData = (\{[\s\S]*?\});/,
  ];
  for (const re of patterns) {
    const m = String(html || '').match(re);
    if (!m) continue;
    try {
      return JSON.parse(m[1]);
    } catch {
      /* continue */
    }
  }
  return null;
}

function collectShortsFromInitialData(data) {
  const out = [];
  const seen = new Set();
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (node.reelItemRenderer || node.shortsLockupViewModel) {
      const s = JSON.stringify(node.reelItemRenderer || node.shortsLockupViewModel);
      const idM = s.match(/"videoId":"([\w-]{11})"/) || s.match(/\/shorts\/([\w-]{11})/);
      if (idM && !seen.has(idM[1])) {
        seen.add(idM[1]);
        out.push({
          videoId: idM[1],
          title: '',
          published: '',
          updated: '',
          description: '',
          url: `https://www.youtube.com/shorts/${idM[1]}`,
          watchUrl: `https://www.youtube.com/watch?v=${idM[1]}`,
          thumbnail: `https://i.ytimg.com/vi/${idM[1]}/hqdefault.jpg`,
        });
      }
    }
    for (const v of Object.values(node)) walk(v);
  };
  walk(data);
  return out;
}

/** Atom RSS가 404일 때 @handle/shorts 페이지로 최신 목록 확보 */
export async function fetchChannelVideosViaShortsPage(opts = {}) {
  const handle = String(opts.handle || process.env.YOUTUBE_HANDLE || DEFAULT_HANDLE).replace(/^@/, '');
  const pageUrl = `https://www.youtube.com/@${handle}/shorts`;
  const res = await fetch(pageUrl, {
    headers: { 'Accept-Language': 'ko-KR,en;q=0.8', 'User-Agent': YT_UA },
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`Shorts 페이지 HTTP ${res.status}: ${pageUrl}`);
  const html = await res.text();
  const data = extractYtInitialData(html);
  let videos = data ? collectShortsFromInitialData(data) : [];
  if (!videos.length) {
    const seen = new Set();
    for (const m of html.matchAll(/\/shorts\/([\w-]{11})/g)) {
      if (seen.has(m[1])) continue;
      seen.add(m[1]);
      videos.push({
        videoId: m[1],
        title: '',
        published: '',
        updated: '',
        description: '',
        url: `https://www.youtube.com/shorts/${m[1]}`,
        watchUrl: `https://www.youtube.com/watch?v=${m[1]}`,
        thumbnail: `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`,
      });
    }
  }
  /* watch 페이지에서 제목·게시일·설명 보강 (항상) */
  const limit = Math.min(videos.length, Number(opts.scrapeLimit) || 24);
  const head = videos.slice(0, limit);
  const enriched = [];
  for (const v of head) {
    enriched.push(await enrichVideoMetaFromWatch(v));
  }
  return {
    source: pageUrl,
    channelId: opts.channelId || process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID,
    handle: `@${handle}`,
    playlistId: '',
    videos: enriched,
    via: 'shorts-page',
  };
}

async function enrichVideoMetaFromWatch(video) {
  if (!video?.videoId) return video;
  try {
    const res = await fetch(video.watchUrl || `https://www.youtube.com/watch?v=${video.videoId}`, {
      headers: { 'Accept-Language': 'ko-KR,en;q=0.8', 'User-Agent': YT_UA },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) return video;
    const html = await res.text();
    const titleM = html.match(/"title":\{"runs":\[\{"text":"((?:\\.|[^"\\])*)"\}/);
    const pubM =
      html.match(/"publishDate":"([^"]+)"/) ||
      html.match(/"uploadDate":"([^"]+)"/);
    let title = video.title;
    if (titleM) {
      try {
        title = JSON.parse(`"${titleM[1]}"`);
      } catch {
        /* keep */
      }
    }
    const description = extractWatchDescription(html) || video.description || '';
    return {
      ...video,
      title: title || video.title,
      published: pubM ? pubM[1] : video.published || '',
      updated: pubM ? pubM[1] : video.updated || '',
      description,
      descriptionSource: description ? 'watch' : video.descriptionSource || '',
    };
  } catch {
    return video;
  }
}

export async function fetchChannelVideos(opts = {}) {
  const url = feedUrl(opts);
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/atom+xml,application/xml,text/xml,*/*' },
      signal: AbortSignal.timeout(60000),
    });
    if (!res.ok) throw new Error(`YouTube RSS HTTP ${res.status}: ${url}`);
    const xml = await res.text();
    let videos = parseAtomFeed(xml);
    if (opts.enrich !== false) {
      videos = await Promise.all(videos.map((v) => enrichVideoDescription(v)));
    }
    return {
      source: url,
      channelId: opts.channelId || process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID,
      handle: process.env.YOUTUBE_HANDLE || DEFAULT_HANDLE,
      playlistId: opts.playlistId || '',
      videos,
      via: 'rss',
    };
  } catch (err) {
    /* 2026-11: Atom RSS 가 404를 반환하는 경우 → Shorts 페이지 폴백 */
    console.warn(`[youtube-rss] RSS 실패 → Shorts 페이지 폴백: ${err.message || err}`);
    return fetchChannelVideosViaShortsPage(opts);
  }
}

export async function resolveChannelIdFromHandle(handle = DEFAULT_HANDLE) {
  const h = String(handle || '').replace(/^@/, '');
  const res = await fetch(`https://www.youtube.com/@${h}`, {
    headers: { 'Accept-Language': 'en-US' },
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) throw new Error(`채널 페이지 HTTP ${res.status}`);
  const html = await res.text();
  const m =
    html.match(/browseId":"(UC[\w-]{22})"/) ||
    html.match(/channel_id=(UC[\w-]{22})/) ||
    html.match(/\/channel\/(UC[\w-]{22})/);
  if (!m) throw new Error('채널 ID를 찾지 못했습니다.');
  return m[1];
}

export { DEFAULT_CHANNEL_ID, DEFAULT_HANDLE };
