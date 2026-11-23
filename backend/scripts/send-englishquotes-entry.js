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

const imageSrc = '/resources/perfect.png';

const quote = {
  title: '완벽한 연습만이 완벽을 만든다: 빈스 롬바르디',
  intro:
    '같은 동작을 그저 많이 반복한다고 해서 실력이 늘지는 않습니다. 그럴 때 마음에 새겨두면 좋은 문장이 있습니다.',
  en: 'Practice does not make perfect. Only perfect practice makes perfect.',
  ko: '연습이 완벽함을 만들어주지는 않습니다. 완벽한 연습만이 완벽하게 해줍니다.',
  authorKo: '빈스 롬바르디 (Vince Lombardi)',
  originTitle: '명언 속 배경: 전설의 미식축구 코치 빈스 롬바르디',
  originBody:
    '이 문장은 미국 미식축구 코치 빈스 롬바르디(Vince Lombardi)의 말로 알려져 있습니다. 그는 그린베이 패커스를 이끌며 엄격한 훈련과 정확한 실행을 강조했습니다. 연습의 양이 아니라, 올바른 방식으로 반복하는 질이 실력을 만든다는 점이 이 문장의 핵심입니다.',
  classic: 'Practice alone → Not enough | Perfect practice → Perfect',
  classicKo: '그냥 반복만으로는 부족하다. 제대로 한 연습만이 완벽으로 이어진다.',
  closing:
    '공부든 운동이든, “얼마나 했느냐”보다 “어떻게 했느냐”가 결과를 가릅니다. 대충 여러 번 하는 연습은 나쁜 습관만 굳힐 수 있습니다. 한 번을 하더라도 집중해서, 올바른 방식으로 연습하는 편이 더 멀리 갑니다.',
  tip: '오늘 연습할 때, 횟수보다 한 번의 정확도에 먼저 집중해 보세요!',
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
    `<p style="margin:0;padding:0;text-align:left;"><img src="${imageSrc}" alt="${escapeHtml(q.en)}" loading="eager" fetchpriority="high" class="eq-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p>` +
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

  password: 'seed_password_perfect-practice',

  isSecret: false,

  slug: 'perfect-practice',

  metaDescription:
    'Practice does not make perfect. Only perfect practice makes perfect. Vince Lombardi 영어 명언 뜻과 완벽한 연습의 힘 해설.',

  datePublished: '2026-11-23',
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
