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

const imageSrc = '/resources/tackle.jpg';

const entry = {
  title: 'tackle | 다루다, 맞서다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="tackle" loading="lazy"><span class="wotd-ipa">/ˈtækəl/</span><span class="wotd-ipa-ko">태클</span><div class="wotd-pos" data-pos="동사" data-primary="1"><span class="wotd-meaning">다루다, 맞서다</span><span class="wotd-meaning-sub">(문제·과제에) 달려들다</span></div><div class="wotd-pos" data-pos="명사"><span class="wotd-meaning">태클</span></div><p class="wotd-core">어렵거나 큰 문제·과제에 <em class="wotd-core-em">정면으로 맞서</em> 다루기 시작하다</p><p class="wotd-nuance">tackle은 스포츠의 ‘태클’에서 확장되어, 사회·정책·업무상의 난제에 적극적으로 달려드는 동사로 자주 쓰입니다. 단순한 ‘다루다(handle)’보다 <mark>해결을 위해 뛰어든다</mark>는 능동적 뉘앙스가 강해요. 명사로는 미식축구·럭비의 태클을 뜻합니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">handle</span><span class="wotd-cmp-ko">처리하다 · 중립적, 일상적</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">tackle</span><span class="wotd-cmp-ko">맞서 다루다 · 능동적, 의지</span></div><div class="wotd-col"><span class="wotd-col-en">tackle a problem</span><span class="wotd-col-ko">문제를 다루다, 해결에 나서다</span></div><div class="wotd-col"><span class="wotd-col-en">tackle hunger</span><span class="wotd-col-ko">기아 문제 해결에 나서다</span></div><div class="wotd-col"><span class="wotd-col-en">step up to tackle</span><span class="wotd-col-ko">나서서 해결하다</span></div><section class="wotd-ex" data-tag="뉴스 예문"><p class="wotd-ex-en">He had called on billionaires to “step up now, on a one-time basis” to <mark>tackle</mark> global hunger.</p><p class="wotd-ex-ko">그는 억만장자들에게 세계 기아 문제 해결을 위해 “지금, 일회성으로라도 나서 달라”고 요청한 바 있다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">We need to <mark>tackle</mark> the housing shortage head-on.</p><p class="wotd-ex-ko">우리는 주택 부족 문제에 정면으로 맞서야 한다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">She <mark>tackled</mark> the assignment as soon as she got home.</p><p class="wotd-ex-ko">그녀는 집에 도착하자마자 그 과제에 달라붙었다.</p></section><p class="wotd-takeaway">문제로 ‘손을 대기’보다, 어렵더라도 정면으로 맞서서 해결에 착수한다는 뜻이 강함. step up과 함께 쓰면 ‘책임을 지고 나서다’는 의미가 더해짐.</p><div class="wotd-glance"><div><dt>품사</dt><dd>동사 · 명사</dd></div><div><dt>비슷한 말</dt><dd>address, confront</dd></div><div><dt>반대 말</dt><dd>avoid, ignore</dd></div><div><dt>자주 나오는 곳</dt><dd>정책·경제 뉴스</dd></div></div></div>`,

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
