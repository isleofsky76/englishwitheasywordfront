/**
 * 영작 — 유튜브 제목 `영작 | 제목` 의 설명란을 최신 영작으로 저장.
 * 페이지는 GET /english-writing 으로 제목과 본문을 다시 읽는다.
 */
export async function uploadEnglishWriting(config, apiBase) {
  const title = String(config.title || '')
    .replace(/^\s*(?:영작|영어작문)\s*[|｜]\s*/, '')
    .trim();
  const text = String(config.description || '').trim();
  if (!title) throw new Error('영작 제목이 없습니다.');
  if (!text) throw new Error('영작 본문(설명란)이 없습니다.');

  const source = config.source || {};
  const post = {
    title,
    text,
    videoId: config.videoId || '',
    source: source.text || '',
    url: source.url || '',
  };

  console.log('영작 업로드 중...', apiBase);
  console.log(`  title: 영작 | ${title}`);

  const res = await fetch(`${String(apiBase || '').replace(/\/$/, '')}/english-writing`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
    signal: AbortSignal.timeout(60000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `영작 업로드 실패 (HTTP ${res.status})`);
  }
  console.log(`  "영작 | ${title}" 반영됨`);
  return data;
}
