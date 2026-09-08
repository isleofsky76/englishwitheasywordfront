/**
cd C:\langchain\backend; node scripts/send-wordofday-entry.js; cd C:\langchain; git pull origin main --no-edit; git add word-of-the-day/precaution/ sitemap.xml backend/scripts/send-wordofday-entry.js; git commit -m "Add word of the day: precaution"; git push origin main



 * Word of the Day 글 1개 추가 (+ slug SEO)

 * - 같은 title 또는 slug + 비밀번호가 맞으면 기존 글 삭제 후 추가

 * - slug·metaDescription 있으면 /word-of-the-day/{slug}/ + sitemap 갱신

 *

 * 사용법: node scripts/send-wordofday-entry.js

 * 삭제만: node scripts/send-wordofday-entry.js --delete-only

 *

 * 주의: 유튜브·원문 URL은 href/src에 넣지 말고 본문 텍스트로만 둠

 *       HTML 태그 사이 빈 줄/개행은 viewpost가 <br>로 바꿔 간격이 벌어지니 붙일 것

 */

import { API_BASE } from './loadEnv.js';

import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';


// ========== 여기만 수정 ==========

const hl = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${text}</span>`;

const hlSoft = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${text}</span>`;

const imageSrc = '/resources/robo%20taxi.jpg';

const entry = {
  title: 'precaution | 예방 조치',

  // 태그 사이 빈 줄/개행 넣지 말 것 — 이미지 맨 위, 글은 아래
  message: `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0;padding:0;text-align:left;"><img src="${imageSrc}" alt="precaution" loading="lazy" class="wotd-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">precaution</p><p style="margin:0 0 0.35rem;padding:0;">발음: ${hl('/prɪˈkɔːʃən/')} (프리코션)</p><p style="margin:0 0 0.85rem;padding:0;">명사: ${hl('예방 조치')}, 안전 조치</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('as a precaution')}: 예방 조치로, 만일에 대비해</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('take precautions')}: 예방 조치를 취하다</p><p style="margin:0 0 1rem;padding:0;">${hlSoft('safety precaution')}: 안전 예방 조치</p><p style="margin:0 0 0.55rem;padding:0;">📌 의미: ${hl('위험이나 사고가 생기기 전에 미리 취하는 조치')}</p><p style="margin:0 0 1rem;padding:0;">→ precaution은 문제가 발생한 뒤 대응하는 것이 아니라, 위험이나 사고를 막기 위해 사전에 취하는 조치를 뜻함. ${hlSoft('as a precaution')}은 ‘혹시 모르니 예방 차원에서’라는 뜻으로 뉴스와 일상에서 매우 자주 쓰임.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 1</p><p style="margin:0 0 0.2rem;padding:0;">They'll still have a human driver at the wheel as a safety precaution.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">안전 예방 조치로 운전석에는 여전히 인간 운전자가 탑승합니다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 2</p><p style="margin:0 0 0.2rem;padding:0;">The building was evacuated as a precaution after smoke was detected.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">연기가 감지된 뒤 예방 조치로 건물에서 사람들이 대피했습니다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 3</p><p style="margin:0 0 0.2rem;padding:0;">Doctors advised travelers to take extra precautions against the virus.</p><p style="margin:0 0 1rem;padding:0;color:#4b5563;">의사들은 여행객들에게 바이러스에 대비해 추가 예방 조치를 취하라고 권고했습니다.</p><p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p><p style="margin:0;padding:0;">${hl('precaution')} → 실제 위험이 이미 발생했다는 뜻이 아니라, 혹시 생길 수 있는 위험을 미리 막기 위한 행동이라는 점이 핵심임. 특히 ${hlSoft('as a precaution')}, ${hlSoft('take precautions')}, ${hlSoft('safety precaution')} 형태로 자주 사용됨.</p></div>`,

  nickname: 'admin',

  password: 'seed_password_precaution',

  isSecret: false,

  slug: 'precaution',

  metaDescription:
    'precaution 뜻과 예문. 예방 조치, 안전 조치, as a precaution, take precautions, safety precaution.',

  datePublished: '2026-09-08',
};
// =================================



async function deleteMatching({ title, slug, password }) {

  const listRes = await fetch(`${API_BASE}/wordofday`);

  const listData = await listRes.json();

  const list = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  const targets = list.filter(

    (e) => e?._id && (e.title === title || (slug && e.slug === slug))

  );

  let deleted = 0;



  for (const e of targets) {

    const delRes = await fetch(`${API_BASE}/wordofday-deletepost`, {

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



  console.log('Word of the Day 처리 중...', API_BASE);



  try {

    await deleteMatching({ title, slug, password });

    if (deleteOnly) {

      console.log('완료. (--delete-only)');

      return;

    }



    const res = await fetch(`${API_BASE}/wordofday`, {

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

      const seo = applySeoAfterUpload('word-of-the-day', {

        title,

        slug,

        metaDescription,

        datePublished: datePublished || toIsoDateOnly(),

      });

      if (seo?.seoPath) console.log('  SEO page:', seo.seoPath);

      if (seo?.sitemapPath) console.log('  sitemap:', seo.sitemapPath);

      if (seo?.url) console.log('  URL:', seo.url);

      else console.log(`  URL: ${SITE_ORIGIN}/word-of-the-day/${encodeURIComponent(slug)}/`);

    }

  } catch (e) {

    console.error('  오류:', e.message);

  }

  console.log('완료.');

}



run();
