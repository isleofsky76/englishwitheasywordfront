/**
 * 수동: 아래 entry 수정 후
 *   cd C:\langchain\backend; node scripts/send-englishquotes-entry.js
 *   cd C:\langchain; git pull origin main --no-edit; git add english-quotes/{slug}/ sitemap.xml backend/scripts/send-englishquotes-entry.js; git commit -m "Add english quote: {slug}"; git push origin main
 *
 * 삭제만: node scripts/send-englishquotes-entry.js --delete-only
 *
 * English Quotes 글 1개 추가 (+ slug SEO)
 * - 같은 title 또는 slug + 비밀번호가 맞으면 기존 글 삭제 후 추가
 * - slug·metaDescription 있으면 /english-quotes/{slug}/ + sitemap 갱신
 *
 * 주의: HTML 태그 사이 빈 줄/개행은 viewpost가 <br>로 바꿔 간격이 벌어지니 붙일 것
 */

import { API_BASE, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

// ========== 여기만 수정 ==========

const imageSrc = '/resources/new-vigor.png';

const quote = {
  title: '여행이 주는 활력: 세네카가 전하는 장소의 힘',
  intro:
    '같은 자리, 같은 루틴에 오래 머물다 보면 생각도 굳어지기 쉽습니다. 그때 마음에 새겨두면 좋은 문장이 있습니다.',
  en: 'Travel and change of place impart new vigor to the mind.',
  ko: '여행과 장소의 변화는 정신에 활력을 준다.',
  authorKo: '세네카 (Seneca)',
  originTitle: '명언 속 배경: 스토아 철학자 세네카',
  originBody:
    '이 문장은 로마의 스토아 철학자 세네카(Lucius Annaeus Seneca)의 사상과 맞닿아 있는 말로 알려져 있습니다. 그는 마음의 평정을 중시하면서도, 환경을 바꾸는 경험이 사고를 깨우고 시선을 새롭게 한다고 보았습니다. 여행은 단순한 이동이 아니라, 정신에 다시 힘을 불어넣는 자극이 될 수 있다는 뜻입니다.',
  classic: 'Travel · Change of place · New vigor',
  classicKo: '장소를 바꾸는 여행이 마음에 새로운 활력을 불어넣는다.',
  closing:
    '멀리 떠나지 못해도 좋습니다. 익숙한 길 대신 다른 골목을 걷거나, 잠시 풍경을 바꿔 보는 것만으로도 생각이 환기될 수 있습니다. 변화는 도피가 아니라, 정신을 다시 깨우는 한 방법이 될 수 있습니다.',
  tip: '이번 주에는 평소와 다른 장소에서 잠시 머물러 보며 마음에 활력을 더해 보세요!',
};

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildQuoteMessage(q) {
  return (
    `<div class="eq-card">` +
    `<p style="margin:0;padding:0;text-align:left;"><img src="${imageSrc}" alt="${escapeHtml(q.en)}" loading="lazy" class="eq-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p>` +
    `<p class="eq-title" style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">${escapeHtml(q.title)}</p>` +
    `<p class="eq-intro" style="margin:0 0 1rem;padding:0;color:#374151;line-height:1.85;">${escapeHtml(q.intro)}</p>` +
    `<blockquote class="eq-quote-block" style="margin:0 0 1rem;padding:0.85rem 1rem;border-left:4px solid #cbd5e1;background:#f8fafc;border-radius:0 8px 8px 0;">` +
    `<p class="eq-quote" style="margin:0 0 0.35rem;padding:0;font-size:1.2rem;font-weight:700;color:#1a365d;line-height:1.7;">“${escapeHtml(q.en)}”</p>` +
    `<p class="eq-meaning" style="margin:0 0 0.45rem;padding:0;color:#4b5563;">(${escapeHtml(q.ko)})</p>` +
    `<p class="eq-author" style="margin:0;padding:0;color:#4b5563;font-weight:600;">— ${escapeHtml(q.authorKo)}</p>` +
    `</blockquote>` +
    `<p class="eq-section-title" style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">${escapeHtml(q.originTitle)}</p>` +
    `<p class="eq-origin" style="margin:0 0 0.85rem;padding:0;color:#374151;line-height:1.85;">${escapeHtml(q.originBody)}</p>` +
    `<blockquote class="eq-classic-block" style="margin:0 0 1rem;padding:0.85rem 1rem;border-left:4px solid #f0b429;background:#fffbeb;border-radius:0 8px 8px 0;">` +
    `<p class="eq-classic" style="margin:0 0 0.35rem;padding:0;font-weight:700;color:#1a1a1a;">${escapeHtml(q.classic)}</p>` +
    `<p class="eq-classic-ko" style="margin:0;padding:0;color:#4b5563;">“${escapeHtml(q.classicKo)}”</p>` +
    `</blockquote>` +
    `<p class="eq-closing" style="margin:0 0 1rem;padding:0;color:#374151;line-height:1.85;">${escapeHtml(q.closing)}</p>` +
    `<p class="eq-tip" style="margin:0 0 1rem;padding:0.85rem 1rem;border-radius:10px;background:#fff7ed;border:1px solid #fed7aa;color:#9a3412;">✨ ${escapeHtml(q.tip)}</p>` +
    `<p class="eq-ai-note" style="margin:0;padding:0.65rem 0 0;border-top:1px dashed #cbd5e1;font-size:0.88rem;line-height:1.6;color:#64748b;">*AI로 생성한 후에 관리자 리뷰를 거쳐 게시되었습니다.</p>` +
    `</div>`
  );
}

const entry = {
  title: quote.title,

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: buildQuoteMessage(quote),

  nickname: 'admin',

  password: 'seed_password_travel-new-vigor',

  isSecret: false,

  slug: 'travel-new-vigor',

  metaDescription:
    'Travel and change of place impart new vigor to the mind. Seneca 영어 명언 뜻과 여행·장소 변화의 힘 해설.',

  datePublished: '2016-07-13',
};
// =================================

const API_PATH = '/english-quotes';
const BOARD_PATH = 'english-quotes';

async function deleteMatching({ title, slug, password }) {
  const listRes = await fetch(`${API_BASE}${API_PATH}`);
  const listData = await listRes.json();
  const list = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  const targets = list.filter(
    (e) => e?._id && (e.title === title || (slug && e.slug === slug))
  );

  let deleted = 0;
  for (const e of targets) {
    const delRes = await fetch(`${API_BASE}${API_PATH}/deletepost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e._id, password }),
    });
    if (delRes.ok) {
      deleted++;
      console.log(`  삭제: "${e.title}"`);
    }
  }

  if (deleted > 0) console.log(`기존 글 ${deleted}건 삭제됨.`);
  else console.log('  삭제할 기존 글 없음.');
  return deleted;
}

async function run() {
  const { title, message, nickname, password, isSecret, slug, metaDescription, datePublished } = entry;
  const deleteOnly = process.argv.includes('--delete-only');

  console.log('English Quotes 처리 중...', API_BASE);

  try {
    await deleteMatching({ title, slug, password });
    if (deleteOnly) {
      console.log('완료. (--delete-only)');
      return;
    }

    const res = await fetch(`${API_BASE}${API_PATH}`, {
      method: 'POST',
      headers: writeAuthHeaders({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ title, message, nickname, password, isSecret, slug, metaDescription }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log('  실패:', data.error || res.status);
      return;
    }

    console.log('  추가됨:', title);
    if (slug) console.log('  slug:', slug);

    if (slug && metaDescription) {
      const seo = applySeoAfterUpload(BOARD_PATH, {
        title,
        slug,
        metaDescription,
        datePublished: datePublished || toIsoDateOnly(),
        message,
      });
      if (seo?.seoPath) console.log('  SEO page:', seo.seoPath);
      if (seo?.sitemapPath) console.log('  sitemap:', seo.sitemapPath);
      if (seo?.url) console.log('  URL:', seo.url);
      else console.log(`  URL: ${SITE_ORIGIN}/${BOARD_PATH}/${encodeURIComponent(slug)}/`);
    }
  } catch (e) {
    console.error('  오류:', e.message);
  }

  console.log('완료.');
}

run();
