/**
 * 요리 어휘 — JSON / text → HTML + sitemap
 *
 * JSON (seed-cooking-voca.js):
 *   title, slug, metaDescription, password, datePublished
 *   intro[]
 *   words[] — narrative (서술형, 국제·컬쳐와 동일 nv-* 마크업)
 *   source{text,url}, youtube
 *
 * text 한 블록(레거시):
 *   · 단어 줄: 영어 | 발음 | 발음기호
 *   · 예문 / 출처 섹션
 */
import { buildNewsVocaMessage } from './news-voca-format.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isWordLine(line) {
  const parts = line.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
  return parts.length >= 3 && !/^(예문|출처)/i.test(parts[0]);
}

function isNoteLine(line) {
  const t = line.trim();
  return /^[※\[]/.test(t);
}

function isExampleStart(line) {
  return /^예문\s*[:：]?$/i.test(line.trim());
}

function isSourceStart(line) {
  return /^출처\s*[:：]?/i.test(line.trim());
}

function parseWordEn(text) {
  const t = String(text).trim();
  const m = t.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  if (m) {
    return {
      en: m[1].trim(),
      ko: m[2].trim(),
    };
  }
  return { en: t, ko: '' };
}

function formatWordHtml(en, ko, pron, ipa) {
  const koHtml = ko
    ? `<span class="cv-ko">${escapeHtml(ko)}</span>`
    : '';
  return `<div class="cv-word">
  <div class="cv-word-main">
    <span class="cv-en">${escapeHtml(en)}</span>${koHtml}
  </div>
  <div class="cv-word-meta">
    <span class="cv-pron">${escapeHtml(pron)}</span>
    <span class="cv-ipa">${escapeHtml(ipa)}</span>
  </div>
</div>`;
}

function parseTextBody(text) {
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const words = [];
  const notes = [];
  const paragraphs = [];
  const examples = [];
  const sourceLines = [];
  let paragraph = [];
  let inExample = false;
  let inSource = false;
  let examplePending = null;
  let notePending = null;

  const flushParagraph = () => {
    const joined = paragraph.join(' ').trim();
    if (joined) paragraphs.push(joined);
    paragraph = [];
  };

  const flushExample = () => {
    if (examplePending) {
      examples.push(examplePending);
      examplePending = null;
    }
  };

  for (const raw of lines) {
    const trimmed = raw.trim();
    if (!trimmed) {
      if (inExample && examplePending?.en && !examplePending.ko) {
        flushExample();
      }
      flushParagraph();
      continue;
    }

    if (isSourceStart(trimmed)) {
      flushParagraph();
      flushExample();
      inExample = false;
      inSource = true;
      const rest = trimmed.replace(/^출처\s*[:：]?\s*/i, '').trim();
      if (rest) sourceLines.push(rest);
      continue;
    }

    if (inSource) {
      sourceLines.push(trimmed);
      continue;
    }

    if (isExampleStart(trimmed)) {
      flushParagraph();
      flushExample();
      inExample = true;
      continue;
    }

    if (inExample) {
      if (!examplePending) {
        examplePending = { en: trimmed, ko: '' };
      } else if (!examplePending.ko) {
        examplePending.ko = trimmed;
        flushExample();
      } else {
        flushExample();
        examplePending = { en: trimmed, ko: '' };
      }
      continue;
    }

    if (isNoteLine(trimmed)) {
      flushParagraph();
      if (notePending) notes.push(notePending);
      notePending = { en: trimmed.replace(/^[※\[]\s*/, '').replace(/\]$/, ''), ko: '' };
      continue;
    }

    if (notePending && !notePending.ko && /[가-힣]/.test(trimmed) && !isWordLine(trimmed)) {
      notePending.ko = trimmed;
      notes.push(notePending);
      notePending = null;
      continue;
    }

    if (isWordLine(trimmed)) {
      flushParagraph();
      const parts = trimmed.split(/\s*\|\s*/).map((s) => s.trim()).filter(Boolean);
      const { en, ko } = parseWordEn(parts[0]);
      words.push({ en, ko, pron: parts[1], ipa: parts[2] });
      continue;
    }

    paragraph.push(trimmed);
  }

  flushParagraph();
  flushExample();
  if (notePending) notes.push(notePending);

  return { words, notes, paragraphs, examples, sourceLines };
}

function buildSourceHtml(sourceLines) {
  if (!sourceLines.length) return '';
  const body = escapeHtml(sourceLines.join(' ').trim());
  return `<footer class="cv-source">
  <p class="cv-source-label">출처</p>
  <p class="cv-source-text">${body}</p>
</footer>`;
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
      '/cooking-voca API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export function buildCookingVocaMessageFromText(config) {
  const text = config.text ?? '';
  const { words, notes, paragraphs, examples, sourceLines } = parseTextBody(text);

  const introHtml = paragraphs
    .map((p) => `<p class="cv-intro">${escapeHtml(p)}</p>`)
    .join('\n');

  const wordsHtml = words.length
    ? `<div class="cv-words">${words.map((w) => formatWordHtml(w.en, w.ko, w.pron, w.ipa)).join('\n')}</div>`
    : '';

  const notesHtml = notes.length
    ? `<div class="cv-notes">${notes
        .map(
          (n) => `<div class="cv-note-block">
  <p class="cv-note">※ ${escapeHtml(n.en)}</p>
  ${n.ko ? `<p class="cv-note-ko">${escapeHtml(n.ko)}</p>` : ''}
</div>`
        )
        .join('\n')}</div>`
    : '';

  const examplesHtml = examples.length
    ? `<section class="cv-examples">
  <h2 class="cv-examples-title">예문</h2>
  ${examples
    .map(
      (ex) => `<div class="cv-example">
    <p class="cv-ex-en">${escapeHtml(ex.en)}</p>
    <p class="cv-ex-ko">${escapeHtml(ex.ko)}</p>
  </div>`
    )
    .join('\n')}
</section>`
    : '';

  const sourceHtml = buildSourceHtml(sourceLines);

  return `<article class="cv-text">
<div class="cv-body">
${introHtml}
${wordsHtml}
${notesHtml}
${examplesHtml}
</div>
${sourceHtml}
</article>`;
}

export function buildCookingVocaMessage(config) {
  if (Array.isArray(config.words) && config.words.length) {
    return buildNewsVocaMessage({ ...config, sourceAtEnd: true });
  }
  return buildCookingVocaMessageFromText(config);
}

export async function uploadCookingVoca(config, apiBase) {
  const message = buildCookingVocaMessage(config);
  const sectionCount = (message.match(/nv-word-section/g) || []).length;
  const wordCount = (message.match(/cv-word/g) || []).length;
  const datePublished = config.datePublished || toIsoDateOnly();

  const post = {
    title: config.title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
  };

  console.log('요리 어휘 업로드 중...', apiBase);
  if (/localhost|127\.0\.0\.1/.test(apiBase)) {
    console.warn(
      '  ⚠️ localhost에만 올라갑니다. englisheasystudy.com 에 반영하려면 .env 의 API_BASE 를 Cloudtype URL로 바꾸고 다시 실행하세요.'
    );
  }

  console.log(`  title: ${post.title}`);
  if (post.slug) console.log(`  slug: ${post.slug}`);
  console.log(`  words: ${sectionCount || wordCount}`);

  const t0 = Date.now();
  const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

  console.log('  기존 글 삭제 중...');
  await deleteMatchingEntries(apiBase, config);

  const payloadKb = (JSON.stringify(post).length / 1024).toFixed(1);
  console.log(`  서버에 업로드 중... (${payloadKb} KB)`);

  const res = await fetch(`${apiBase}/cooking-voca`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
    signal: AbortSignal.timeout(180000),
  });

  const data = await parseApiJson(res, 'POST /cooking-voca');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  console.log(`  "${post.title}" 추가됨 (${elapsed()})`);

  const seo = applySeoAfterUpload('cooking-voca', {
    title: config.title,
    slug: config.slug,
    metaDescription: config.metaDescription,
    datePublished,
    message: post.message,
  });
  if (seo) {
    if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
    console.log(`  sitemap: ${seo.sitemapPath}`);
    console.log(`  URL: ${seo.url}`);
  }
}

async function deleteMatchingEntries(apiBase, config) {
  const listRes = await fetch(`${apiBase}/cooking-voca`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /cooking-voca');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    const sameSlug = config.slug && entry.slug === config.slug;
    const samePassword = config.password && entry.password === config.password;
    if (config.slug) {
      if (!sameSlug) continue;
    } else if (!samePassword) {
      continue;
    }
    try {
      const delRes = await fetch(`${apiBase}/cooking-voca-deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password: config.password }),
      });
      if (delRes.ok) deleted++;
    } catch (_) {}
  }
  if (deleted > 0) console.log(`  기존 글 ${deleted}개 삭제됨.`);
  else console.log('  삭제할 기존 글 없음.');
}
