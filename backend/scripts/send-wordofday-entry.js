/**
 * 수동: 아래 entry 수정 후
 *   cd C:\langchain\backend; node scripts/send-wordofday-entry.js
 *   cd C:\langchain; git pull origin main --no-edit; git add word-of-the-day/{slug}/ sitemap.xml resources/{word}.jpg backend/scripts/send-wordofday-entry.js; git commit -m "Add word of the day: {word}"; git push origin main
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

const imageSrc = '/resources/requite.jpg';

const entry = {
  title: 'requite | 보답하다, 갚다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="requite" loading="lazy"><span class="wotd-ipa">/rɪˈkwaɪt/</span><span class="wotd-ipa-ko">리콰이트</span><div class="wotd-pos" data-pos="동사" data-primary="1"><span class="wotd-meaning">보답하다, 갚다</span><span class="wotd-meaning-sub">(은혜·친절·사랑에) 응답하다</span></div><p class="wotd-core">받은 친절·은혜·감정에 <em class="wotd-core-em">그에 맞는 보답</em>을 하다. 부정형 unrequited는 ‘보답받지 못한’</p><p class="wotd-nuance">requite는 ‘갚다(repay)’보다 격식 있고, 특히 <mark>사랑·호의에 대한 보답</mark> 맥락에서 자주 쓰입니다. 실제로는 unrequited love(짝사랑)처럼 부정형으로 더 흔히 만납니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">repay</span><span class="wotd-cmp-ko">갚다 · 돈·호의, 일상적</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">requite</span><span class="wotd-cmp-ko">보답하다 · 감정·은혜, 격식</span></div><div class="wotd-col"><span class="wotd-col-en">unrequited love</span><span class="wotd-col-ko">짝사랑, 보답받지 못한 사랑</span></div><div class="wotd-col"><span class="wotd-col-en">requite kindness</span><span class="wotd-col-ko">친절에 보답하다</span></div><div class="wotd-col"><span class="wotd-col-en">go unrequited</span><span class="wotd-col-ko">보답받지 못한 채 끝나다</span></div><section class="wotd-ex"><p class="wotd-ex-en">His love for her went <mark>unrequited</mark>.</p><p class="wotd-ex-ko">그녀를 향한 그의 사랑은 끝내 보답받지 못했다. (짝사랑으로 끝났다)</p></section><section class="wotd-ex"><p class="wotd-ex-en">She never forgot his kindness and <mark>requited</mark> it years later.</p><p class="wotd-ex-ko">그녀는 그의 친절을 잊지 않았고, 몇 년 뒤 그 은혜를 갚았다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">Many parents feel their sacrifices are <mark>unrequited</mark> when their adult children rarely call.</p><p class="wotd-ex-ko">다 큰 자녀가 연락을 잘 하지 않을 때, 많은 부모는 자신의 희생이 보답받지 못한다고 느낀다.</p></section><p class="wotd-takeaway">requite는 ‘보답하다’이고, 일상·문학에서는 unrequited(보답받지 못한) 형태로 더 자주 등장한다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>동사</dd></div><div><dt>비슷한 말</dt><dd>repay, return, reciprocate</dd></div><div><dt>반대 말</dt><dd>ignore, spurn, neglect</dd></div><div><dt>자주 나오는 곳</dt><dd>문학·관계·에세이</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_requite',

  isSecret: false,

  slug: 'requite',

  metaDescription:
    'requite 뜻과 예문. 보답하다, 갚다의 의미와 unrequited love, requite kindness, go unrequited 표현.',

  datePublished: '2026-10-31',
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
