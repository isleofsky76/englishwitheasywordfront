/**
cd C:\langchain\backend; node scripts/send-wordofday-entry.js; cd C:\langchain; git add word-of-the-day/ sitemap.xml; git commit -m "Add word of the day: scrape"; git push origin main



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

const entry = {

  title: 'scrape | 긁다 · 가까스로 얻다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">scrape</p><p style="margin:0 0 0.35rem;padding:0;">발음: ${hl('/skreɪp/')} (스크레이프)</p><p style="margin:0 0 0.35rem;padding:0;">동사: ${hl('긁다')}, 긁어내다, 긁혀서 상처를 내다</p><p style="margin:0 0 0.85rem;padding:0;">명사: 긁힌 자국, 찰과상</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('scrape a point')}: 가까스로 승점 1점을 얻다</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('scrape mud off')}: 진흙을 긁어내다</p><p style="margin:0 0 1rem;padding:0;">${hlSoft('scrape against')}: ~에 긁히다</p><p style="margin:0 0 0.55rem;padding:0;">📌 의미: ${hl('표면을 긁거나, 힘겹게 어떤 결과를 얻는 것')}</p><p style="margin:0 0 1rem;padding:0;">→ scrape는 기본적으로 바닥이나 표면을 ‘긁다·긁어내다’라는 뜻임. 의자 다리가 바닥을 긁거나, 신발에 묻은 진흙을 긁어낼 때 쓸 수 있음. 또 차나 피부가 어딘가에 긁혀 상처나 흠이 나는 상황에도 쓰임. 스포츠에서는 ${hlSoft('scrape a point')}처럼 ‘간신히 승점 1점을 얻다’라는 뜻으로도 자주 쓰임</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 1</p><p style="margin:0 0 0.2rem;padding:0;">The team managed to scrape a point in the final minutes of the match.🔊</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그 팀은 경기 막판에 가까스로 승점 1점을 얻어냈다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 2</p><p style="margin:0 0 0.2rem;padding:0;">Don’t scrape your chairs on the floor.🔊</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">의자를 바닥에 긁지 마세요.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 3</p><p style="margin:0 0 0.2rem;padding:0;">She scraped the mud off her boots.🔊</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그녀는 부츠에 묻은 진흙을 긁어냈다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 4</p><p style="margin:0 0 0.2rem;padding:0;">I scraped the side of my car against the wall.🔊</p><p style="margin:0 0 1rem;padding:0;color:#4b5563;">차 옆면을 벽에 긁었다.</p><p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p><p style="margin:0;padding:0;">${hl('scrape')} → 단순히 ‘문지르다’가 아니라, 표면이 닿으면서 거칠게 긁히거나 무언가를 긁어내는 느낌이 있음. 축구 기사에서 ${hlSoft('scrape a point')}는 쉽게 얻은 승점이 아니라, 힘든 경기에서 간신히 따낸 승점이라는 뉘앙스가 강함. 일상에서는 scrape the floor, scrape mud off, scrape against the wall처럼 많이 쓰임.</p></div>`,

  nickname: 'admin',

  password: 'seed_password_scrape',

  isSecret: false,

  slug: 'scrape',

  metaDescription:
    'scrape 뜻과 예문. 긁다, 긁어내다, scrape a point(가까스로 승점 1점), scrape mud off, scrape against.',

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
