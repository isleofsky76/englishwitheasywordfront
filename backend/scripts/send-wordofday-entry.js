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
// redesign-article expression-cards 용: .nv-word-section / .nv-lead-text / .wotd-hero-image

const imageSrc = '/resources/tackle.jpg';

const entry = {
  title: 'tackle | 다루다, 맞서다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-rd"><p class="nv-lead-text">발음 /ˈtækəl/ (태클). 동사: 다루다, 맞서다, (문제·과제에) 달려들다 · 명사: 태클. 📌 어렵거나 큰 문제·과제에 정면으로 맞서 다루기 시작하다. tackle은 스포츠의 ‘태클’에서 확장되어 사회·정책·업무 난제에 적극적으로 달려드는 동사로, 단순한 handle보다 해결을 위해 뛰어든다는 능동적 뉘앙스가 강합니다. 관련 표현: tackle a problem · tackle hunger · step up to tackle. 💡 문제로 ‘손을 대기’보다 정면으로 맞서서 해결에 착수한다는 뜻이 강하며, step up과 함께 쓰면 ‘책임을 지고 나서다’는 의미가 더해집니다. 명사로는 미식축구·럭비 등 운동 경기에서의 태클을 뜻합니다.</p><p class="wotd-hero-wrap"><img src="${imageSrc}" alt="tackle" loading="lazy" class="wotd-hero-image"></p><section class="nv-word-section"><span class="nv-en">tackle</span><span class="nv-meaning-text">다루다, 맞서다</span><p class="nv-ex-en">He had called on billionaires to “step up now, on a one-time basis” to <mark class="nv-hl">tackle</mark> global hunger.</p><p class="nv-ex-ko">그는 억만장자들에게 세계 기아 문제 해결을 위해 “지금, 일회성으로라도 나서 달라”고 요청한 바 있다.</p></section><section class="nv-word-section"><span class="nv-en">tackle a problem</span><span class="nv-meaning-text">문제를 다루다, 해결에 나서다</span><p class="nv-ex-en">We need to <mark class="nv-hl">tackle</mark> the housing shortage head-on.</p><p class="nv-ex-ko">우리는 주택 부족 문제에 정면으로 맞서야 한다.</p></section><section class="nv-word-section"><span class="nv-en">step up to tackle</span><span class="nv-meaning-text">나서서 해결하다</span><p class="nv-ex-en">She <mark class="nv-hl">tackled</mark> the assignment as soon as she got home.</p><p class="nv-ex-ko">그녀는 집에 도착하자마자 그 과제에 달라붙었다.</p></section></div>`,

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
