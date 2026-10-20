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
// redesign-word 시안용: .wotd-word / .wotd-core / .wotd-ex / .wotd-col …

const imageSrc = '/resources/thwart.jpg';

const entry = {
  title: 'thwart | 좌절시키다, 방해하다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="thwart" loading="lazy"><span class="wotd-ipa">/θwɔːrt/</span><span class="wotd-ipa-ko">스워트</span><div class="wotd-pos" data-pos="동사" data-primary="1"><span class="wotd-meaning">좌절시키다, 방해하다</span><span class="wotd-meaning-sub">(계획·시도·공격 등을) 가로막다</span></div><p class="wotd-core">누군가의 계획·행동·효과가 <em class="wotd-core-em">뜻대로 되지 못하게</em> 막거나 무산시키다</p><p class="wotd-nuance">thwart는 단순한 ‘막다(stop)’보다, 상대의 목적 달성을 <mark>좌절·무산시킨다</mark>는 뉘앙스가 강합니다. 시위 차단, 치료 방해, 공격 방어처럼 ‘상대가 하려던 것을 가로막는’ 뉴스·과학·설명문에서 자주 나옵니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">stop</span><span class="wotd-cmp-ko">멈추다 · 일상적, 중립적</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">thwart</span><span class="wotd-cmp-ko">좌절시키다 · 목적 달성을 가로막음</span></div><div class="wotd-col"><span class="wotd-col-en">thwart protesters</span><span class="wotd-col-ko">시위대를 가로막다</span></div><div class="wotd-col"><span class="wotd-col-en">thwart efforts</span><span class="wotd-col-ko">노력을 저해하다, 무산시키다</span></div><div class="wotd-col"><span class="wotd-col-en">thwart attackers</span><span class="wotd-col-ko">공격자를 좌절시키다</span></div><section class="wotd-ex" data-tag="뉴스 예문"><p class="wotd-ex-en">Police refused them permission to protest and unprecedented curbs were in place to <mark>thwart</mark> the protesters from reaching the venue.</p><p class="wotd-ex-ko">경찰은 시위 허가를 거부했고, 시위대가 행사장에 도달하지 못하도록 전례 없는 통제가 시행되었다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">New research suggests that using vitamins can <mark>thwart</mark> cancer-fighting efforts.</p><p class="wotd-ex-ko">새로운 연구결과는 비타민을 사용하는 것이 항암효과를 저해시킬 수 있다는 점을 보여준다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">This combative guy shoots the barbs of stinging hairs to <mark>thwart</mark> its attackers.</p><p class="wotd-ex-ko">이 전투적인 녀석은 이러한 날카로운 끝을 가진 따끔한 털을 쏘아내서 공격자를 좌절시킨다.</p></section><p class="wotd-takeaway">thwart는 ‘막는다’보다 ‘상대의 목적을 좌절시킨다’에 가깝다. from ~ing와 함께 쓰면 ‘~하지 못하게 가로막다’로 자주 쓰인다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>동사</dd></div><div><dt>비슷한 말</dt><dd>foil, hinder, frustrate</dd></div><div><dt>반대 말</dt><dd>aid, facilitate, enable</dd></div><div><dt>자주 나오는 곳</dt><dd>뉴스·과학·설명문</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_thwart',

  isSecret: false,

  slug: 'thwart',

  metaDescription:
    'thwart 뜻과 예문. 좌절시키다, 방해하다의 의미와 thwart protesters, thwart efforts, thwart attackers 표현.',

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
