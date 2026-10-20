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

const imageSrc = '/resources/commit.jpg';

const entry = {
  title: 'commit | 약속하다, 저지르다, 전념하다',

  // 태그 사이 빈 줄/개행 넣지 말 것
  message: `<div class="wotd-word"><img class="wotd-hero-image" src="${imageSrc}" alt="commit" loading="lazy"><span class="wotd-ipa">/kəˈmɪt/</span><span class="wotd-ipa-ko">커밋</span><div class="wotd-pos" data-pos="동사" data-primary="1"><span class="wotd-meaning">약속하다, (자원·주식 등을) 투입하다</span><span class="wotd-meaning-sub">(범죄 등을) 저지르다; (자신·결정에) 전념하다</span></div><p class="wotd-core">돈·시간·주식 등을 <em class="wotd-core-em">공식적으로 내놓거나</em>, 잘못을 저지르거나, 결정에 자신을 묶다</p><p class="wotd-nuance">commit은 문맥에 따라 뜻이 크게 갈립니다. 뉴스·비즈니스에서는 <mark>주식·자금·자원을 출연·투입한다</mark>는 뜻이 흔하고, commit a crime처럼 ‘저지르다’, commit yourself처럼 ‘결정·전념하다’로도 씁니다. 같은 철자라도 목적어를 보면 의미가 바로 갈립니다.</p><div class="wotd-compare"><span class="wotd-cmp-en">promise</span><span class="wotd-cmp-ko">약속하다 · 말의 약속</span></div><div class="wotd-compare" data-active="1"><span class="wotd-cmp-en">commit</span><span class="wotd-cmp-ko">출연·투입·저지름·전념 · 행동·책임이 따름</span></div><div class="wotd-col"><span class="wotd-col-en">commit shares / money</span><span class="wotd-col-ko">주식·자금을 출연하다, 투입하다</span></div><div class="wotd-col"><span class="wotd-col-en">commit a crime</span><span class="wotd-col-ko">범죄를 저지르다</span></div><div class="wotd-col"><span class="wotd-col-en">commit yourself</span><span class="wotd-col-ko">결정하다, 전념하다, 약정하다</span></div><section class="wotd-ex" data-tag="뉴스 예문"><p class="wotd-ex-en">The pledge comes a day after AI competitor Anthropic said it plans to <mark>commit</mark> 5% of its shares to a new “public benefit fund” with the flexibility to make charitable donations or direct money to “specific populations.”</p><p class="wotd-ex-ko">이번 약속은 AI 경쟁사 앤트로픽이 자사 주식의 5%를 자선 기부나 특정 계층 지원에 활용할 수 있는 새로운 공익기금에 출연하겠다는 계획을 밝힌 지 하루 만에 나왔다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">People who <mark>commit</mark> such crimes aren’t normal.</p><p class="wotd-ex-ko">그러한 범죄를 저지르는 사람들은 정상이 아니다.</p></section><section class="wotd-ex"><p class="wotd-ex-en">You don’t have to <mark>commit</mark> yourself now, just think about it.</p><p class="wotd-ex-ko">지금 결정하지 않으셔도 됩니다. 그냥 생각을 해 보세요.</p></section><p class="wotd-takeaway">commit은 ‘약속’보다 한 걸음 더 나아가, 자원 투입·범죄 행위·자기 결정처럼 결과가 따르는 행동을 가리킨다. 목적어(shares, crime, yourself)를 보면 뜻이 갈린다.</p><div class="wotd-glance"><div><dt>품사</dt><dd>동사</dd></div><div><dt>비슷한 말</dt><dd>pledge, perpetrate, dedicate</dd></div><div><dt>반대 말</dt><dd>withdraw, refrain</dd></div><div><dt>자주 나오는 곳</dt><dd>경제·사회·일상 회화</dd></div></div></div>`,

  nickname: 'admin',

  password: 'seed_password_commit',

  isSecret: false,

  slug: 'commit',

  metaDescription:
    'commit 뜻과 예문. 약속하다·저지르다·전념하다의 의미와 commit shares, commit a crime, commit yourself 표현.',

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
