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

const imageSrc = '/resources/leafy.jpg';

const entry = {
  title: 'leafy | 녹음이 우거진',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="leafy" loading="lazy"><span class="wotd-ipa">/ˈliːfi/</span><span class="wotd-ipa-ko">리피</span><div class="wotd-pos" data-pos="형용사" data-primary="1"><span class="wotd-meaning">녹음이 우거진</span><span class="wotd-meaning-sub">잎이 많은, 나무가 우거진</span></div><p class="wotd-core">나무·풀의 잎이 많아 <em class="wotd-core-em">푸르고 우거진</em> 모습, 또는 잎채소처럼 잎이 많은 상태</p><p class="wotd-nuance">leafy는 도시·거리·그늘을 수식할 때는 <mark>녹음이 우거진, 나무가 많은</mark> 느낌을 주고, leafy green vegetables처럼 쓰면 ‘잎이 많은(엽채류)’라는 뜻입니다. 여행·생활·건강 글에서 자주 나옵니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">green</span><span class="wotd-cmp-ko">녹색의 · 색깔·환경</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">leafy</span><span class="wotd-cmp-ko">잎이 우거진 · 나무·채소의 무성함</span></div><div class="wotd-col"><span class="wotd-col-en">leafy city / street</span><span class="wotd-col-ko">녹음이 우거진 도시·거리</span></div><div class="wotd-col"><span class="wotd-col-en">leafy green vegetables</span><span class="wotd-col-ko">잎이 많은 녹색 채소</span></div><div class="wotd-col"><span class="wotd-col-en">leafy shade</span><span class="wotd-col-ko">무성한 잎이 만드는 그늘</span></div><section class="wotd-ex" data-tag="여행 예문"><p class="wotd-ex-en">I set out by car, leaving Kalamata, the <mark>leafy</mark> port city and gateway to the area, on a coastal road circuit.</p><p class="wotd-ex-ko">나는 녹음이 우거진 항구도시이자 이 지역의 관문인 칼라마타를 떠나 해안도로를 순환하는 자동차 여행에 나섰다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">Eat plenty of <mark>leafy</mark> green vegetables.</p><p class="wotd-ex-ko">잎이 많은 녹색 채소를 충분히 먹어라.</p></section><section class="wotd-ex"><p class="wotd-ex-en">We sat in the <mark>leafy</mark> shade of an oak tree.</p><p class="wotd-ex-ko">우리는 떡갈나무의 무성한 잎이 만드는 그늘 속에 앉아 있었다.</p></section><p class="wotd-takeaway">leafy는 ‘잎이 많다’는 뜻으로, 도시·그늘에는 녹음의 이미지, 채소에는 엽채류의 이미지를 더한다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>형용사</dd></div><div><dt>비슷한 말</dt><dd>lush, verdant, wooded</dd></div><div><dt>반대 말</dt><dd>bare, barren</dd></div><div><dt>자주 나오는 곳</dt><dd>여행·생활·건강</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_leafy',

  isSecret: false,

  slug: 'leafy',

  metaDescription:
    'leafy 뜻과 예문. 녹음이 우거진, 잎이 많다는 의미와 leafy city, leafy green vegetables, leafy shade 표현.',

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
