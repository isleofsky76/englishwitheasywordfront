/**
 * 수동: 아래 entry 수정 후
 *   cd C:\langchain\backend; node scripts/send-wordofday-entry.js
 *   cd C:\langchain; git pull origin main --no-edit; git add word-of-the-day/{slug}/ sitemap.xml backend/scripts/send-wordofday-entry.js; git commit -m "Add word of the day: {word}"; git push origin main
 *
 * 자동 (단어 선택 + GitHub resources 이미지 + 업로드 + 배포):
 *   cd C:\langchain\backend; node scripts/send-wordofday-entry.js --auto
 *
 * 미리보기만: node scripts/send-wordofday-entry.js --auto --dry-run
 * 미게시 목록: node scripts/send-wordofday-entry.js --auto --list
 * 단어 지정:   node scripts/send-wordofday-entry.js --auto --word admonish
 * Git 생략:    node scripts/send-wordofday-entry.js --auto --no-git
 * 삭제만:      node scripts/send-wordofday-entry.js --delete-only
 *
 * Word of the Day 글 1개 추가 (+ slug SEO)
 * - 같은 title 또는 slug + 비밀번호가 맞으면 기존 글 삭제 후 추가
 * - slug·metaDescription 있으면 /word-of-the-day/{slug}/ + sitemap 갱신
 *
 * 주의: 유튜브·원문 URL은 href/src에 넣지 말고 본문 텍스트로만 둠
 *       HTML 태그 사이 빈 줄/개행은 viewpost가 <br>로 바꿔 간격이 벌어지니 붙일 것
 */

import { API_BASE, writeAuthHeaders } from './loadEnv.js';

import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';


// ========== 여기만 수정 ==========

const hl = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${text}</span>`;

const hlSoft = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${text}</span>`;

// 실제 업로드한 이미지 경로로 변경
const imageSrc = '/resources/tackle.jpg';

const entry = {
  title: 'tackle | 다루다, 맞서다',

  // 태그 사이 빈 줄/개행 넣지 말 것 — 이미지 맨 위, 글은 아래
  message: `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0;padding:0;text-align:left;"><img src="${imageSrc}" alt="tackle" loading="lazy" class="wotd-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">tackle</p><p style="margin:0 0 0.35rem;padding:0;">발음: ${hl('/ˈtækəl/')} (태클)</p><p style="margin:0 0 0.85rem;padding:0;">동사: ${hl('다루다, 맞서다')}, (문제·과제에) 달려들다; 명사: 태클</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('tackle a problem')}: 문제를 다루다, 해결에 나서다</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('tackle hunger')}: 기아 문제 해결에 나서다</p><p style="margin:0 0 1rem;padding:0;">${hlSoft('step up to tackle')}: 나서서 해결하다</p><p style="margin:0 0 0.55rem;padding:0;">📌 의미: ${hl('어렵거나 큰 문제·과제에 정면으로 맞서 다루기 시작하다')}</p><p style="margin:0 0 1rem;padding:0;">→ tackle은 스포츠의 ‘태클’에서 확장되어, 사회·정책·업무상의 난제에 적극적으로 달려드는 동사로 자주 쓰임. 단순한 ‘다루다(handle)’보다 ${hl('해결을 위해 뛰어든다')}는 능동적 뉘앙스가 강함. 명사로는 미식축구·럭비의 태클을 뜻함.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 1</p><p style="margin:0 0 0.2rem;padding:0;">He had called on billionaires to “step up now, on a one-time basis” to tackle global hunger.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그는 억만장자들에게 세계 기아 문제 해결을 위해 “지금, 일회성으로라도 나서 달라”고 요청한 바 있다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 2</p><p style="margin:0 0 0.2rem;padding:0;">We need to tackle the housing shortage head-on.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">우리는 주택 부족 문제에 정면으로 맞서야 한다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 3</p><p style="margin:0 0 0.2rem;padding:0;">She tackled the assignment as soon as she got home.</p><p style="margin:0 0 1rem;padding:0;color:#4b5563;">그녀는 집에 도착하자마자 그 과제에 달라붙었다.</p><p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p><p style="margin:0;padding:0;">${hl('tackle')} → 문제로 ‘손을 대기’보다, 어렵더라도 ${hlSoft('정면으로 맞서서 해결에 착수한다')}는 뜻이 강함. 예문 1의 ${hlSoft('to tackle global hunger')}는 세계 기아라는 거대한 과제에 나서서 대응하라는 호소임. ${hlSoft('step up')}과 함께 쓰이면 ‘책임을 지고 나서다’는 의미가 더해짐.</p></div>`,

  nickname: 'admin',

  password: 'seed_password_tackle',

  isSecret: false,

  slug: 'tackle',

  metaDescription:
    'tackle 뜻과 예문. 다루다, 맞서다의 의미와 tackle a problem, tackle hunger, step up to tackle 표현.',

  datePublished: '2026-10-20',
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

      const seo = applySeoAfterUpload('word-of-the-day', {

        title,

        slug,

        metaDescription,

        datePublished: datePublished || toIsoDateOnly(),

        message,

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



if (process.argv.includes('--auto') || process.argv.includes('--list')) {
  const { runAuto } = await import('./auto-wordofday.js');
  try {
    await runAuto();
  } catch (e) {
    console.error('  오류:', e.message);
    process.exit(1);
  }
} else {
  run();
}
