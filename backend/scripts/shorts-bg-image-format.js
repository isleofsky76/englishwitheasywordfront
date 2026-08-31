/**
 * 쇼츠 배경 이미지 — JSON → HTML + sitemap
 *
 * 본문 구조:
 *   1. 이미지 (9:16)
 *   2. 이미지 아래 영어 풍경 묘사
 */
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

function sectionsSummary(config) {
  const first = Array.isArray(config.sections) ? config.sections[0]?.body : '';
  return String(first || config.descriptionEn || config.description || '').slice(0, 155);
}

export function buildShortsBgImageMessage(config) {
  const image = String(config.image || '').trim();
  if (!image) {
    throw new Error('image 경로가 필요합니다. (예: /resources/beach.jpg)');
  }

  const sections = Array.isArray(config.sections) ? config.sections.filter((s) => s?.body) : [];
  const fallbackText = String(config.descriptionEn || config.description || config.sceneEn || '').trim();
  if (!sections.length && !fallbackText) {
    throw new Error('sections 또는 description(풍경 묘사)가 필요합니다.');
  }

  const altSource =
    config.alt ||
    sections[0]?.body ||
    fallbackText ||
    config.title ||
    'Shorts background';
  const alt = escapeHtmlAttr(String(altSource).slice(0, 120));
  const src = escapeHtmlAttr(image);

  const bodyHtml = sections.length
    ? sections
        .map(
          (section) => `<section class="sbgi-section">
  <h3 class="sbgi-section-title">${escapeHtml(section.heading || '')}</h3>
  <p class="sbgi-scene">${escapeHtml(section.body)}</p>
</section>`
        )
        .join('\n')
    : `<p class="sbgi-scene">${escapeHtml(fallbackText)}</p>`;

  return `<div class="sbgi-image-wrap">
  <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
</div>
<div class="sbgi-scenes">
${bodyHtml}
</div>
<p class="sbgi-ai-note">*Google Gemini로 생성된 글과 이미지입니다. 관리자 리뷰 후에 게시 되었습니다.</p>`;
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(
      `${label}: JSON이 아닌 응답 (HTTP ${res.status}). ` +
        '/shorts-bg-image API 배포 여부를 확인하거나 API_BASE=http://localhost:3000 으로 로컬 실행하세요.'
    );
  }
  return JSON.parse(text);
}

export async function uploadShortsBgImage(config, apiBase) {
  const message = buildShortsBgImageMessage(config);
  const datePublished = config.datePublished || toIsoDateOnly();

  const post = {
    title: config.title,
    message,
    nickname: config.nickname || 'admin',
    password: config.password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || sectionsSummary(config) || '',
  };

  console.log('쇼츠 배경 이미지 업로드 중...', apiBase);
  if (/localhost|127\.0\.0\.1/.test(apiBase)) {
    console.warn(
      '  ⚠️ localhost에만 올라갑니다. englisheasystudy.com 에 반영하려면 .env 의 API_BASE 를 Cloudtype URL로 바꾸고 다시 실행하세요.'
    );
  }

  console.log(`  title: ${post.title}`);
  if (post.slug) console.log(`  slug: ${post.slug}`);
  console.log(`  image: ${config.image}`);

  const t0 = Date.now();
  const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

  if (config.slug) {
    console.log('  기존 글 삭제 중 (slug)...');
    try {
      const delRes = await fetch(`${apiBase}/shorts-bg-image/delete-by-slug`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ slug: config.slug, password: config.password }),
        signal: AbortSignal.timeout(60000),
      });
      const delData = await parseApiJson(delRes, 'POST /shorts-bg-image/delete-by-slug');
      if (!delRes.ok) {
        throw new Error(delData.error || `HTTP ${delRes.status}`);
      }
      if (delData.deleted > 0) {
        console.log(`  기존 글 ${delData.deleted}개 삭제됨. (${elapsed()})`);
      } else {
        console.log(`  삭제할 기존 글 없음. (${elapsed()})`);
      }
    } catch (e) {
      if (/JSON이 아닌 응답/.test(e.message)) {
        console.warn('  ⚠️ delete-by-slug API 미배포 — 목록에서 같은 slug를 찾아 삭제합니다.');
        await deleteMatchingEntries(apiBase, config);
      } else {
        throw e;
      }
    }
  } else {
    await deleteMatchingEntries(apiBase, config);
  }

  const res = await fetch(`${apiBase}/shorts-bg-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
    signal: AbortSignal.timeout(180000),
  });

  const data = await parseApiJson(res, 'POST /shorts-bg-image');
  if (!res.ok) {
    console.log('  실패:', data.error || res.status);
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  console.log(`  "${post.title}" 추가됨 (${elapsed()})`);

  if (config.slug && config.metaDescription) {
    const seo = applySeoAfterUpload('shorts-bg-image', {
      title: config.title,
      slug: config.slug,
      metaDescription: config.metaDescription,
      datePublished,
    });
    if (seo) {
      if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
      console.log(`  sitemap: ${seo.sitemapPath}`);
      console.log(`  URL: ${seo.url}`);
    }
  }
}

async function deleteMatchingEntries(apiBase, config) {
  const listRes = await fetch(`${apiBase}/shorts-bg-image`, { headers: { Accept: 'application/json' } });
  const listData = await parseApiJson(listRes, 'GET /shorts-bg-image');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    const sameSlug = config.slug && entry.slug === config.slug;
    const sameTitle = entry.title === config.title;
    if (config.slug && !sameSlug) continue;
    if (!config.slug && !sameTitle) continue;
    try {
      const delRes = await fetch(`${apiBase}/shorts-bg-image-deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password: config.password }),
      });
      if (delRes.ok) deleted++;
    } catch (_) {}
  }
  if (deleted > 0) console.log(`  기존 글 ${deleted}개 삭제됨.`);
}
