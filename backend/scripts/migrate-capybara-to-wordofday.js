/**
 * 카피바라 글: guestbook(뉴스 어휘) → wordofday(오늘의 단어장) 이동
 *
 * 사용법:
 *   API_BASE=https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app node scripts/migrate-capybara-to-wordofday.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

const SLUG = 'capybara-on-the-lam-english-countryside-wsj';
const PASSWORD = 'password_seed_capybara_on_the_lam_english_countryside_wsj';

const words = [
  { emoji: '🏃', en: 'shimmy', pron: '쉬미', ko: '몸을 흔들며 움직이다, 비집고 빠져나가다' },
  { emoji: '🆓', en: 'loose', pron: '루스', ko: '풀려난, 잡히지 않은, 자유롭게 돌아다니는' },
  { emoji: '🕸️', en: 'dragnet', pron: '드래그넷', ko: '대대적인 수색망, 포위 수사망' },
];

function buildWordNotes(list) {
  return list
    .map(
      (w) =>
        `<p style="margin:0.4rem 0;padding:0;line-height:2.05;font-size:0.95rem;color:#374151;"><span aria-hidden="true">${w.emoji}</span> ${w.en} | ${w.pron} | ${w.ko}</p>`
    )
    .join('');
}

const entry = {
  title: '[WSJ] 영국 시골을 탈출한 카피바라 | 삼바를 찾는 지역 주민들',
  slug: SLUG,
  metaDescription:
    '영국 햄프셔의 동물원에서 카피바라 삼바가 탈출하면서 지역 주민, 드론 조종사, 학생들까지 수색에 참여하고 있습니다. shimmy, loose, dragnet 세 가지 핵심 영어 단어를 정리합니다.',
  password: PASSWORD,
  datePublished: '2026-07-19',
  message: `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><div style="margin:0 0 1rem;padding:0.7rem 0.85rem;background:#f5f0e6;border:1px solid #e8dfd0;border-radius:10px;box-sizing:border-box;"><p style="margin:0;padding:0;line-height:2.05;color:#3f3a32;font-size:0.92rem;">기사는 영국 햄프셔의 마웰 동물원에서 어린 카피바라 삼바가 울타리 틈으로 탈출한 뒤, 지역 주민들과 드론 조종사, 학교, 공항까지 수색에 참여하며 화제가 되고 있다는 내용을 다룹니다.</p></div><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;line-height:2.05;">오늘의 단어</p>${buildWordNotes(words)}<p style="margin:1.25rem 0 0.35rem;padding:0;font-weight:700;color:#1a365d;line-height:2.05;"><span aria-hidden="true">📺</span> 유튜브</p><p style="margin:0 0 0.55rem;padding:0;line-height:2.05;">https://youtube.com/shorts/AYPfBGqY2as</p><p style="margin:0 0 0.55rem;padding:0;line-height:2.05;color:#6b7280;font-size:0.88rem;">이 콘텐츠에는 AI 음성과 AI 이미지를 사용했습니다.</p><div style="margin:0.55rem 0 0;padding:0.7rem 0.85rem;background:#f5f0e6;border:1px solid #e8dfd0;border-radius:10px;box-sizing:border-box;text-align:left;"><p style="margin:0 0 0.3rem;padding:0;line-height:2.05;text-align:left;"><strong style="color:#1a365d;">출처 :</strong> <span style="color:#4b5563;font-size:0.92rem;">WSJ | A Capybara Is on the Lam in the English Countryside, and Locals Are Going Wild | By Julia Amann</span></p><p style="margin:0;padding:0;line-height:2.05;word-break:break-all;text-align:left;">https://www.wsj.com/world/uk/a-capybara-is-on-the-lam-in-the-english-countryside-and-locals-are-going-wild-51da31e2</p></div></div>`,
  nickname: 'admin',
  isSecret: false,
};

async function deleteFromGuestbook() {
  const res = await fetch(`${API_BASE}/guestbook/delete-by-slug`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ slug: SLUG, password: PASSWORD }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `guestbook delete HTTP ${res.status}`);
  console.log(`  guestbook 삭제: ${data.deleted ?? 0}건`);
}

async function deleteMatchingWordofday({ title, slug, password }) {
  const listRes = await fetch(`${API_BASE}/wordofday`);
  const listData = await listRes.json();
  const list = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  const targets = list.filter((e) => e?._id && (e.title === title || (slug && e.slug === slug)));
  let deleted = 0;
  for (const e of targets) {
    const delRes = await fetch(`${API_BASE}/wordofday-deletepost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: e._id, password }),
    });
    if (delRes.ok) {
      deleted++;
      console.log(`  wordofday 기존 글 삭제: "${e.title}"`);
    }
  }
  return deleted;
}

async function run() {
  const { title, message, nickname, password, isSecret, slug, metaDescription, datePublished } = entry;
  console.log('카피바라 → 오늘의 단어장 이동 중...', API_BASE);

  try {
    await deleteFromGuestbook();
    await deleteMatchingWordofday({ title, slug, password });

    const res = await fetch(`${API_BASE}/wordofday`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message, nickname, password, isSecret, slug, metaDescription }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log('  wordofday 추가 실패:', data.error || res.status);
      return;
    }
    console.log('  wordofday 추가됨:', title);

    const seo = applySeoAfterUpload('word-of-the-day', {
      title,
      slug,
      metaDescription,
      datePublished: datePublished || toIsoDateOnly(),
      message,
    });
    if (seo?.url) console.log('  SEO URL:', seo.url);
    else console.log(`  SEO URL: ${SITE_ORIGIN}/word-of-the-day/${encodeURIComponent(slug)}/`);
  } catch (e) {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  }
  console.log('완료.');
}

run();
