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

const imageSrc = '/resources/smitten.jpg';

const entry = {
  title: 'smitten | 홀딱 반한, 푹 빠진',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="smitten" loading="lazy"><span class="wotd-ipa">/ˈsmɪtn/</span><span class="wotd-ipa-ko">스미튼</span><div class="wotd-pos" data-pos="형용사" data-primary="1"><span class="wotd-meaning">홀딱 반한, 푹 빠진</span><span class="wotd-meaning-sub">(사람·아이·아이디어에) 매료된</span></div><p class="wotd-core">누군가·무언가에 <em class="wotd-core-em">강하게 마음이 끌려</em> 반하거나 푹 빠진 상태. 보통 be smitten with/by</p><p class="wotd-nuance">smitten은 연애의 ‘한눈에 반하다’뿐 아니라, 손주·비전처럼 <mark>애정·매혹에 푹 빠진</mark> 느낌에도 씁니다. be in love보다 가볍고 생생한 뉘앙스예요.</p><div class="wotd-compare"><span class="wotd-cmp-en">in love</span><span class="wotd-cmp-ko">사랑에 빠진 · 더 진지·지속적</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">smitten</span><span class="wotd-cmp-ko">홀딱 반한 · 강렬·즉각적</span></div><div class="wotd-col"><span class="wotd-col-en">smitten with</span><span class="wotd-col-ko">~에게 홀딱 반하다</span></div><div class="wotd-col"><span class="wotd-col-en">completely smitten</span><span class="wotd-col-ko">완전히 푹 빠진</span></div><div class="wotd-col"><span class="wotd-col-en">smitten by</span><span class="wotd-col-ko">~에 매료된</span></div><section class="wotd-ex"><p class="wotd-ex-en">He was <mark>smitten</mark> with her from the moment they met.</p><p class="wotd-ex-ko">그는 그녀를 처음 만난 순간부터 홀딱 반했다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">My father is completely <mark>smitten</mark> with his first granddaughter.</p><p class="wotd-ex-ko">아버지는 첫 손녀에게 완전히 푹 빠지셨다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">Investors were <mark>smitten</mark> by the company’s bold vision, but the profits never came.</p><p class="wotd-ex-ko">투자자들은 그 회사의 대담한 비전에 매료됐지만, 수익은 끝내 나지 않았다.</p></section><p class="wotd-takeaway">smitten은 ‘홀딱 반한·푹 빠진’ 상태로, smitten with/by와 함께 사람·애정·아이디어에 두루 쓴다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>형용사</dd></div><div><dt>비슷한 말</dt><dd>infatuated, captivated, enamored</dd></div><div><dt>반대 말</dt><dd>indifferent, unmoved, cold</dd></div><div><dt>자주 나오는 곳</dt><dd>일상·관계·비즈니스 비유</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_smitten',

  isSecret: false,

  slug: 'smitten',

  metaDescription:
    'smitten 뜻과 예문. 홀딱 반한, 푹 빠지다의 의미와 smitten with, completely smitten, smitten by 표현.',

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
