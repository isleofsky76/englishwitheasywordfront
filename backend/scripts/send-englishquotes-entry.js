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

import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

// ========== 여기만 수정 ==========

const quote = {
  en: 'A journey of a thousand miles begins with a single step.',
  author: 'Lao Tzu',
  ko: '천 리 길도 한 걸음부터 시작된다.',
  tip: '이번 주도 작은 한 걸음부터 가볍게 시작해 보세요!',
};

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildQuoteMessage({ en, author, ko, tip }) {
  return `<div class="eq-card"><p class="eq-quote">🌞 “${escapeHtml(en)}”</p><p class="eq-author">— ${escapeHtml(author)}</p><p class="eq-meaning">💬 한국어 뜻: ${escapeHtml(ko)}</p><p class="eq-tip">✨ ${escapeHtml(tip)}</p></div>`;
}

const entry = {
  title: `${quote.en} | ${quote.author}`,

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: buildQuoteMessage(quote),

  nickname: 'admin',

  password: 'seed_password_journey-of-a-thousand-miles',

  isSecret: false,

  slug: 'journey-of-a-thousand-miles',

  metaDescription:
    'A journey of a thousand miles begins with a single step. Lao Tzu 영어 명언과 한국어 뜻. 천 리 길도 한 걸음부터.',

  datePublished: '2026-10-13',
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
      headers: { 'Content-Type': 'application/json' },
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
