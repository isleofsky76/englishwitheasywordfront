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
const imageSrc = '/resources/discernment.jpg';

const entry = {
  title: 'discernment | 안목, 분별력',

  // 태그 사이 빈 줄/개행 넣지 말 것 — 이미지 맨 위, 글은 아래
  message: `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0;padding:0;text-align:left;"><img src="${imageSrc}" alt="discernment" loading="lazy" class="wotd-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">discernment</p><p style="margin:0 0 0.35rem;padding:0;">발음: ${hl('/dɪˈsɜːrnmənt/')} (디서른먼트)</p><p style="margin:0 0 0.85rem;padding:0;">명사(불가산): ${hl('안목, 분별력')}, 판단력</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('show discernment')}: 안목이나 분별력을 보여 주다</p><p style="margin:0 0 0.35rem;padding:0;">${hlSoft('a person of discernment')}: 안목이 있는 사람</p><p style="margin:0 0 1rem;padding:0;">${hlSoft('exercise discernment')}: 분별력을 발휘하다</p><p style="margin:0 0 0.55rem;padding:0;">📌 의미: ${hl('겉으로 쉽게 드러나지 않는 차이나 가치를 알아보고 현명하게 판단하는 능력')}</p><p style="margin:0 0 1rem;padding:0;">→ discernment는 사람이나 사물의 본질, 품질, 가치를 세심하게 구별하고 판단하는 능력을 뜻함. 사람이나 작품을 고르는 문맥에서는 ‘안목’, 정보의 진위나 옳고 그름을 판단하는 문맥에서는 ‘분별력’으로 옮기면 자연스러움. 동사 ${hlSoft('discern')}은 ‘알아보다, 분별하다’라는 뜻임.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 1</p><p style="margin:0 0 0.2rem;padding:0;">He shows great discernment in his choice of friends.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그는 친구를 선택할 때 뛰어난 안목을 보여 준다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 2</p><p style="margin:0 0 0.2rem;padding:0;">It is clear that you are a person of discernment.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">당신은 안목이 있는 사람임이 분명합니다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 3</p><p style="margin:0 0 0.2rem;padding:0;">Still, amid the cacophony of influencers, “the sort of expertise and discernment that Vogue represents, still has a place,” he added.</p><p style="margin:0 0 1rem;padding:0;color:#4b5563;">하지만 수많은 인플루언서의 목소리가 뒤섞인 혼란 속에서도 “보그가 대표하는 전문성과 안목은 여전히 설 자리가 있다”고 그는 덧붙였다.</p><p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p><p style="margin:0;padding:0;">${hl('discernment')} → 단순히 취향이 있다는 뜻을 넘어, 미묘한 차이를 알아보고 무엇이 가치 있는지 판단하는 능력을 강조함. 예문 3의 ${hlSoft('expertise and discernment')}는 전문 지식과 더불어 좋은 콘텐츠나 스타일을 가려내는 안목을 뜻함. ‘안목이 있는 사람’은 ${hlSoft('a person of discernment')}로 표현할 수 있음.</p></div>`,

  nickname: 'admin',

  password: 'seed_password_discernment',

  isSecret: false,

  slug: 'discernment',

  metaDescription:
    'discernment 뜻과 예문. 안목, 분별력, 판단력의 의미와 show discernment, a person of discernment, exercise discernment 표현.',

  datePublished: '2026-10-12',
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
