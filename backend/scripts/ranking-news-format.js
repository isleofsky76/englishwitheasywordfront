/**
 * 랭킹 뉴스 — 메모장 텍스트 → HTML + SEO
 *
 * slug, metaDescription — seed 시 SEO 페이지·sitemap 자동 생성
 *
 * text 한 블록:
 *   · 빈 줄 = 문단 나눔
 *   · **텍스트** = 노란 형광펜
 *   · 순위 줄: 순위 | 국가(제목) | 점수
 *   · "출처" 로 시작하는 줄부터 = 출처
 */
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function parseInline(text) {
  const src = String(text ?? '');
  let out = '';
  let i = 0;
  while (i < src.length) {
    const open = src.indexOf('**', i);
    if (open === -1) {
      out += escapeHtml(src.slice(i));
      break;
    }
    out += escapeHtml(src.slice(i, open));
    const close = src.indexOf('**', open + 2);
    if (close === -1) {
      out += escapeHtml(src.slice(open));
      break;
    }
    out += `<mark class="rn-hl">${escapeHtml(src.slice(open + 2, close))}</mark>`;
    i = close + 2;
  }
  return out;
}

function isRankLine(line) {
  const t = line.trim();
  return /^\d+\s*[\.\|]/.test(t) || /^\d+\s+\S/.test(t);
}

function isSourceStart(line) {
  return /^출처\s*[:：]?/i.test(line.trim());
}

/** "1 | A | B | C" 또는 "1. A — B — C" → "1 | A | B | C" */
function normalizeRankLine(line) {
  let t = line.trim();

  if (/^\d+\./.test(t) && /—/.test(t)) {
    const m = t.match(/^(\d+)\.\s*(.+)$/);
    if (m) {
      const parts = m[2].split(/\s*—\s*/).map((s) => s.trim()).filter(Boolean);
      return `${m[1]} | ${parts.join(' | ')}`;
    }
  }

  if (t.includes('|')) {
    const parts = t.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
    if (parts.length >= 2) {
      const rank = parts[0].replace(/\.$/, '');
      return `${rank} | ${parts.slice(1).join(' | ')}`;
    }
  }

  return t;
}

function parseTextBody(text) {
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const parts = [];
  let paragraph = [];
  let sourceLines = [];
  let inSource = false;
  let rankBlockStarted = false;

  const flushParagraph = () => {
    const joined = paragraph.join(' ').trim();
    if (joined) parts.push({ type: 'p', text: joined });
    paragraph = [];
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const trimmed = line.trim();

    if (inSource) {
      if (trimmed) sourceLines.push(trimmed);
      continue;
    }

    if (isSourceStart(trimmed)) {
      flushParagraph();
      inSource = true;
      sourceLines.push(trimmed.replace(/^출처\s*[:：]?\s*/i, ''));
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    if (isRankLine(trimmed)) {
      if (paragraph.length === 1) {
        parts.push({ type: 'heading', text: paragraph[0] });
        paragraph = [];
      } else {
        flushParagraph();
      }
      rankBlockStarted = true;
      parts.push({ type: 'rank', text: normalizeRankLine(trimmed) });
      continue;
    }

    if (rankBlockStarted && parts.length && parts[parts.length - 1].type === 'rank') {
      parts.push({ type: 'heading', text: trimmed });
      rankBlockStarted = false;
      continue;
    }

    if (!rankBlockStarted && parts.some((p) => p.type === 'rank')) {
      parts.push({ type: 'heading', text: trimmed });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  return { parts, sourceLines };
}

function isChangeText(text) {
  return /단계\s*(상승|하락)|순위\s*유지|^유지$|increase|decrease|steady/i.test(String(text).trim());
}

const CHANGE_ICON = {
  up: 'images/rn-change-up.svg',
  down: 'images/rn-change-down.svg',
  steady: 'images/rn-change-steady.svg',
};

function changeToImageHtml(text) {
  const t = String(text).trim();
  let type = 'steady';
  let steps = '';
  let label = t;

  let m = t.match(/(\d+)단계\s*상승/i);
  if (m) {
    type = 'up';
    steps = m[1];
    label = `${steps}단계 상승`;
  } else if ((m = t.match(/(\d+)단계\s*하락/i))) {
    type = 'down';
    steps = m[1];
    label = `${steps}단계 하락`;
  } else if (/순위\s*유지|^유지$/i.test(t)) {
    type = 'steady';
    label = '순위 유지';
  } else if ((m = t.match(/increase\s+(\d+)/i))) {
    type = 'up';
    steps = m[1];
    label = t;
  } else if ((m = t.match(/decrease\s+(\d+)/i))) {
    type = 'down';
    steps = m[1];
    label = t;
  } else if (/steady/i.test(t)) {
    type = 'steady';
    label = t;
  } else {
    return parseInline(t);
  }

  const stepsHtml = steps
    ? `<span class="rn-change-steps">${escapeHtml(steps)}</span>`
    : '';
  return `<span class="rn-change rn-change-${type}" title="${escapeHtml(label)}">${stepsHtml}<img class="rn-change-img" src="${CHANGE_ICON[type]}" alt="${escapeHtml(label)}" width="14" height="14" loading="lazy" decoding="async"></span>`;
}

function formatCountryName(text) {
  const t = String(text).trim();
  const m = t.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (m) {
    return `<span class="rn-name-en">${parseInline(m[1].trim())}</span><span class="rn-name-ko">(${parseInline(m[2].trim())})</span>`;
  }
  return `<span class="rn-name-en">${parseInline(t)}</span>`;
}

function rankTierClass(rankNum) {
  if (rankNum === 1) return 'rn-rank-gold';
  if (rankNum === 2) return 'rn-rank-silver';
  if (rankNum === 3) return 'rn-rank-bronze';
  return '';
}

function formatRankLineHtml(line) {
  let parts = line.split(/\s*\|\s*/).map((p) => p.trim()).filter(Boolean);
  if (parts.length === 4 && isChangeText(parts[2])) {
    parts = [parts[0], parts[1], parts[3]];
  }
  if (parts.length < 2) return parseInline(line);

  const rankNum = parseInt(parts[0], 10) || 0;
  const tier = rankTierClass(rankNum);
  const name = parts.length === 3 ? parts[1] : parts.slice(1, -1).join(' | ');
  const score = parts.length >= 3 ? parts[parts.length - 1] : '';

  let html = `<span class="rn-col-num ${tier}">${parseInline(parts[0])}</span>`;
  html += `<span class="rn-col-name ${tier}">${formatCountryName(name)}</span>`;
  if (score) html += `<span class="rn-col-score ${tier}">${parseInline(score)}</span>`;
  return html;
}

function buildSourceHtml(sourceLines, sourceUrl) {
  if (!sourceLines.length && !sourceUrl) return '';

  const text = sourceLines.join(' ').trim();
  const urlMatch = sourceLines.find((l) => /^https?:\/\//i.test(l));
  const url = sourceUrl || urlMatch || '';
  const textWithoutUrl = sourceLines
    .filter((l) => l !== urlMatch)
    .join(' ')
    .trim();

  let body = parseInline(textWithoutUrl || text);
  if (url) {
    const link = `<a href="${escapeHtml(url)}" rel="noopener noreferrer" target="_blank">${parseInline(url)}</a>`;
    body = textWithoutUrl
      ? `${body}<br>${link}`
      : link;
  }

  return `<footer class="rn-source-block">
  <p class="rn-source-label">출처</p>
  <p class="rn-source-text">${body}</p>
</footer>`;
}

function buildHtmlFromParts(parts) {
  const out = [];
  let i = 0;
  while (i < parts.length) {
    if (parts[i].type === 'rank') {
      out.push('<div class="rn-rank-list">');
      while (i < parts.length && parts[i].type === 'rank') {
        const rankNum = parseInt(parts[i].text, 10) || 0;
        const tier = rankTierClass(rankNum);
        out.push(`<p class="rn-rank-line ${tier}">${formatRankLineHtml(parts[i].text)}</p>`);
        i++;
      }
      out.push('</div>');
      continue;
    }
    const part = parts[i++];
    if (part.type === 'p') out.push(`<p class="rn-body">${parseInline(part.text)}</p>`);
    else if (part.type === 'heading') out.push(`<p class="rn-rank-heading">${parseInline(part.text)}</p>`);
  }
  return out.join('\n');
}

export function buildRankingNewsMessage(config) {
  const text = config.text ?? [
    config.content,
    config.table?.caption,
    config.table?.rows,
    config.source?.label
      ? `출처: ${config.source.label}${config.source.note ? ` — ${config.source.note}` : ''}${config.source.url ? `\n${config.source.url}` : ''}`
      : typeof config.source === 'string' ? config.source : '',
  ]
    .filter(Boolean)
    .join('\n\n');

  const { parts, sourceLines } = parseTextBody(text);
  const bodyHtml = buildHtmlFromParts(parts);
  const sourceHtml = buildSourceHtml(sourceLines, config.source?.url);

  const rankLines = parts.filter((p) => p.type === 'rank');

  return `<article class="rn-text" itemscope itemtype="https://schema.org/Article">
<div class="rn-text-body">
${bodyHtml}
</div>
${sourceHtml}
</article>`;
}

export function parseTableRows(rows) {
  if (Array.isArray(rows)) {
    return rows.map((row) => (Array.isArray(row) ? row : []));
  }
  return String(rows ?? '')
    .trim()
    .split('\n')
    .filter((line) => line.trim())
    .map((line) => line.split(/\s*\|\s*/).map((c) => c.trim()));
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
      '/ranking-news API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export async function uploadRankingNews(config, apiBase) {
  const message = buildRankingNewsMessage(config);
  const rankCount = (message.match(/rn-rank-line/g) || []).length;

  const post = {
    title: config.title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
  };

  console.log('랭킹 뉴스 업로드 중...', apiBase);
  console.log(`  title: ${post.title}`);
  console.log(`  rank lines: ${rankCount}`);

  const listRes = await fetch(`${apiBase}/ranking-news`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /ranking-news');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    try {
      const delRes = await fetch(`${apiBase}/ranking-news-deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password: config.password }),
      });
      if (delRes.ok) deleted++;
    } catch (_) {}
  }
  if (deleted > 0) console.log(`  기존 글(동일 비밀번호) ${deleted}개 삭제됨.`);

  const res = await fetch(`${apiBase}/ranking-news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
  });
  const data = await parseApiJson(res, 'POST /ranking-news');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  console.log(`  "${post.title}" 추가됨`);
  const seo = applySeoAfterUpload('ranking-news', {
    title: config.title,
    slug: config.slug,
    metaDescription: config.metaDescription,
    datePublished: config.datePublished || toIsoDateOnly(),
    message: post.message,
  });
  if (seo) {
    console.log(`  SEO 페이지: ${seo.seoPath}`);
    console.log(`  URL: ${seo.url}`);
  }
}
