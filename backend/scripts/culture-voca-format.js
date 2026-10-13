/**
 * 컬쳐 어휘 — 텍스트 → HTML + SEO
 *
 * slug, metaDescription — seed 시 SEO 페이지·sitemap 자동 생성
 *
 * text 한 블록:
 *   · 빈 줄 = 구분
 *   · 단어 줄: 영어 | 발음 | 발음기호  (3칸, | 구분)
 *   · ※ 또는 [ 로 시작 = 참고 메모
 *   · "예문" = 예문 섹션 시작
 */
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

function isLikelyKoreanTranslation(text) {
  const t = String(text ?? '').trim();
  if (!t) return false;
  if (!/[가-힣]/.test(t)) return false;
  const latin = (t.match(/[A-Za-z]/g) || []).length;
  const hangul = (t.match(/[가-힣]/g) || []).length;
  return hangul > 0 && latin <= Math.max(3, Math.floor(hangul * 0.2));
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
    ? `<span class="clv-ko">${escapeHtml(ko)}</span>`
    : '';
  return `<div class="clv-word">
  <div class="clv-word-main">
    <span class="clv-en">${escapeHtml(en)}</span>${koHtml}
  </div>
  <div class="clv-word-meta">
    <span class="clv-pron">${escapeHtml(pron)}</span>
    <span class="clv-ipa">${escapeHtml(ipa)}</span>
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
      if (inExample && examplePending?.en && examplePending.ko) {
        flushExample();
      }
      flushParagraph();
      continue;
    }

    if (inSource) {
      sourceLines.push(trimmed);
      continue;
    }

    if (isSourceStart(trimmed)) {
      flushParagraph();
      flushExample();
      inExample = false;
      inSource = true;
      sourceLines.push(trimmed.replace(/^출처\s*[:：]?\s*/i, ''));
      continue;
    }

    if (isExampleStart(trimmed)) {
      flushParagraph();
      inExample = true;
      continue;
    }

    if (inExample) {
      if (!examplePending) {
        examplePending = { en: trimmed, ko: '' };
      } else if (!examplePending.ko) {
        if (isLikelyKoreanTranslation(trimmed)) {
          examplePending.ko = trimmed;
          flushExample();
        } else {
          flushExample();
          examplePending = { en: trimmed, ko: '' };
        }
      } else {
        flushExample();
        examplePending = { en: trimmed, ko: '' };
      }
      continue;
    }

    if (isNoteLine(trimmed)) {
      flushParagraph();
      if (notePending) notes.push(notePending);
      notePending = {
        en: trimmed.replace(/^[※\[]\s*/, '').replace(/\]$/, ''),
        ko: '',
      };
      continue;
    }

    if (notePending) {
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
  return `<footer class="clv-source">
  <p class="clv-source-label">출처</p>
  <p class="clv-source-text">${body}</p>
</footer>`;
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
      '/culture-voca API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export function buildCultureVocaMessage(config) {
  const text = config.text ?? '';
  const { words, notes, paragraphs, examples, sourceLines } = parseTextBody(text);

  const introHtml = paragraphs
    .map((p) => `<p class="clv-intro">${escapeHtml(p)}</p>`)
    .join('\n');

  const wordsHtml = words.length
    ? `<div class="clv-words">${words.map((w) => formatWordHtml(w.en, w.ko, w.pron, w.ipa)).join('\n')}</div>`
    : '';

  const notesHtml = notes.length
    ? `<div class="clv-notes">${notes
        .map(
          (n) => `<div class="clv-note-block">
  <p class="clv-note">※ ${escapeHtml(n.en)}</p>
  ${n.ko ? `<p class="clv-note-ko">${escapeHtml(n.ko)}</p>` : ''}
</div>`
        )
        .join('\n')}</div>`
    : '';

  const examplesHtml = examples.length
    ? `<section class="clv-examples">
  <h2 class="clv-examples-title">예문</h2>
  ${examples
    .map(
      (ex) => `<div class="clv-example">
    <p class="clv-ex-en">${escapeHtml(ex.en)}</p>
    <p class="clv-ex-ko">${escapeHtml(ex.ko)}</p>
  </div>`
    )
    .join('\n')}
</section>`
    : '';

  const sourceHtml = buildSourceHtml(sourceLines);

  return `<article class="clv-text">
<div class="clv-body">
${introHtml}
${wordsHtml}
${notesHtml}
${examplesHtml}
</div>
${sourceHtml}
</article>`;
}

export async function uploadCultureVoca(config, apiBase) {
  const message = buildCultureVocaMessage(config);
  const wordCount = (message.match(/clv-word/g) || []).length;

  const post = {
    title: config.title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
  };

  console.log('컬쳐 어휘 업로드 중...', apiBase);
  console.log(`  title: ${post.title}`);
  console.log(`  words: ${wordCount}`);

  const listRes = await fetch(`${apiBase}/culture-voca`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /culture-voca');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    try {
      const delRes = await fetch(`${apiBase}/culture-voca-deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password: config.password }),
      });
      if (delRes.ok) deleted++;
    } catch (_) {}
  }
  if (deleted > 0) console.log(`  기존 글(동일 비밀번호) ${deleted}개 삭제됨.`);

  const res = await fetch(`${apiBase}/culture-voca`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
  });
  const data = await parseApiJson(res, 'POST /culture-voca');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  console.log(`  "${post.title}" 추가됨`);
  const seo = applySeoAfterUpload('culture-voca', {
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
