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

export async function fetchChannelVideos(opts = {}) {
  const url = feedUrl(opts);
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
  };
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
