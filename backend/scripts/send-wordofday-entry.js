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

const imageSrc = '/resources/weathered.jpg';

const entry = {
  title: 'weathered | 풍화된, (위기 등을) 견뎌 낸',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="weathered" loading="lazy"><span class="wotd-ipa">/ˈweðərd/</span><span class="wotd-ipa-ko">웨더드</span><div class="wotd-pos" data-pos="형용사" data-primary="1"><span class="wotd-meaning">풍화된, 햇볕·바람에 그을린</span><span class="wotd-meaning-sub">비바람·세월에 닳고 닳은</span></div><div class="wotd-pos" data-pos="동사"><span class="wotd-meaning">weather — (위기 등을) 견뎌 내다</span><span class="wotd-meaning-sub">원형 weather / weathered / weathered</span></div><p class="wotd-core">바위·얼굴처럼 <em class="wotd-core-em">비바람·햇볕에 닳아</em> 변한 모습(형용사 weathered), 또는 위기·고난을 무사히 통과하다(동사 weather)</p><p class="wotd-nuance">weathered는 자연·외모의 <mark>풍화·그을림</mark>을 나타내는 형용사입니다. 동사 원형은 <mark>weather</mark>로, weather a crisis처럼 <mark>시련을 견뎌 내다</mark>는 뜻으로 씁니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">worn</span><span class="wotd-cmp-ko">닳은 · 일반적, 사용으로</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">weathered</span><span class="wotd-cmp-ko">풍화된 · 자연·세월의 힘</span></div><div class="wotd-col"><span class="wotd-col-en">weathered rock / stone</span><span class="wotd-col-ko">풍화된 바위·돌</span></div><div class="wotd-col"><span class="wotd-col-en">weather a crisis</span><span class="wotd-col-ko">위기를 견뎌 내다</span></div><div class="wotd-col"><span class="wotd-col-en">weathered face / skin</span><span class="wotd-col-ko">햇볕·바람에 그을린 얼굴·피부</span></div><section class="wotd-ex"><p class="wotd-ex-en">The rocks are <mark>weathered</mark> into fantastic forms.</p><p class="wotd-ex-ko">바위들이 풍화되어 기이하고 멋진 형태로 변해 있다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">He <mark>weathered</mark> the crisis like a martyr.</p><p class="wotd-ex-ko">그는 순교자처럼 그 위기를 견뎌 냈다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">Her face was <mark>weathered</mark> by the sun.</p><p class="wotd-ex-ko">그녀의 얼굴은 햇볕에 그을려 거칠어져 있었다.</p></section><p class="wotd-takeaway">weathered는 ‘풍화된·그을린’ 형용사이고, 동사 원형 weather는 ‘(위기 등을) 견뎌 내다’로 함께 익힌다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>weathered 형용사 · weather 동사</dd></div><div><dt>비슷한 말</dt><dd>eroded, worn, endure, survive</dd></div><div><dt>반대 말</dt><dd>fresh, smooth, succumb</dd></div><div><dt>자주 나오는 곳</dt><dd>자연·인물 묘사·뉴스</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_weathered',

  isSecret: false,

  slug: 'weathered',

  metaDescription:
    'weathered 뜻과 예문. 풍화된, 위기를 견뎌 내다의 의미와 weathered rock, weather a crisis, weathered face 표현.',

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
