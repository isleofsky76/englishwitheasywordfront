/**
 * 마음 다스리는 글 (calm-mind) 업로드 (+ slug SEO)
 *
 * 사용법: 아래 article 수정 → node scripts/seed-calm-mind.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';



// ========== 여기만 수정 ==========
const article = {
  title: '불안에서 빨리 벗어나고 싶어요 | 법륜 스님 즉문즉설',
  slug: 'accept-results-and-let-go-of-regret',
  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 백내장 수술 후 생긴 불안과 후회를 통해, 이미 한 선택의 결과를 받아들이고 지금 할 수 있는 대응에 집중하는 마음 다스림 메모입니다.',
  password: 'seed_calm_mind_accept-results-and-let-go-of-regret',
  nickname: 'admin',
  datePublished: '2026-08-21',
  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=2KCVaikwsQ4" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div><p><strong>질문자는 백내장 수술을 하면서 렌즈를 넣었는데</strong>, 이후 눈이 아프자 <span class="cm-hl cm-hl--paint">“괜히 렌즈를 넣었나” 하는 후회와 불안.</span></p><p>스님은 먼저 <u class="cm-underline">불안이 올라오는 것을 알아차리는 것</u>, 즉 “내가 지금 불안해하는구나” 하고 보는 것이 중요하다고 말씀.</p><p><span class="cm-hl cm-hl--marker">어떤 행위를 하든 그 행위에는 과보, 결과가 따른다.</span></p><p><strong>결혼을 해도 좋은 점과 나쁜 점이 함께 생긴다.</strong> 나쁜 결과가 있다고 해서 “괜히 결혼했나” 하고 후회하는 것은 <span class="cm-hl cm-hl--ink">선택의 결과를 받아들이지 않는 것.</span></p><p><span class="cm-hl cm-hl--box">후회는 내가 한 선택에 대해 책임을 지지 않으려는 마음에서 생긴다.</span></p><p>렌즈도 <strong>내가 넣기로 선택했으면 그 결과를 받아들여야 한다.</strong> “괜히 넣었나” 하는 것은 결과를 받아들이지 않으려는 마음.</p><p>그런데 실제 눈 통증의 원인은 렌즈가 아니라 <span class="cm-hl cm-hl--wave">안구건조증</span>이었다. 원인을 알고 나니 마음이 편안해짐.</p><p>스님 말씀. <span class="cm-hl cm-hl--box-round">“지은 인연을 알면 원망할 일이 없다.”</span> 원인을 알면 과거 선택이나 다른 사람을 원망할 이유가 줄어든다.</p><p>원인을 모르더라도 <span class="cm-hl cm-hl--oval-slant">이미 한 행위의 결과는 받아들이면 된다.</span> 이상하면 검사하고, 원인을 조사하면 된다.</p><p><span class="cm-hl cm-hl--dash">“괜히 했나, 안 했어야 했나” 후회할 필요가 없다.</span> 이미 한 선택은 받아들이고, 문제가 있으면 지금 원인을 찾아 대응하면 된다.</p><p class="cm-disclaimer"><strong>Disclaimer</strong><br>저작권에 문제가 될 경우 게시글을 삭제하겠습니다.<br>메일 주소: <a href="mailto:everydayalittlehelp@gmail.com">everydayalittlehelp@gmail.com</a></p>`,
};
// ===============================

async function deleteMatching(apiBase, config) {
  const listRes = await fetch(`${apiBase}/calm-mind`, { headers: { Accept: 'application/json' } });
  const listData = await listRes.json();
  const entries = listData.entries || [];
  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    const sameSlug = config.slug && entry.slug === config.slug;
    const sameTitle = entry.title === config.title;
    if (config.slug ? !sameSlug : !sameTitle) continue;
    const delRes = await fetch(`${apiBase}/calm-mind/deletepost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: entry._id, password: config.password }),
    });
    if (delRes.ok) deleted++;
  }
  if (deleted > 0) console.log(`  기존 글 ${deleted}개 삭제됨.`);
  else console.log('  삭제할 기존 글 없음.');
}

async function main() {
  console.log('마음 다스리는 글 업로드 중...', API_BASE);
  await deleteMatching(API_BASE, article);

  const post = {
    title: article.title,
    message: article.message,
    nickname: article.nickname || 'admin',
    password: article.password,
    isSecret: false,
    slug: article.slug || '',
    metaDescription: article.metaDescription || '',
  };

  const res = await fetch(`${API_BASE}/calm-mind`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  console.log(`  "${post.title}" 추가됨`);

  const seo = applySeoAfterUpload('calm-mind', {
    title: article.title,
    slug: article.slug,
    metaDescription: article.metaDescription,
    datePublished: article.datePublished || toIsoDateOnly(),
  });
  if (seo) {
    if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
    console.log(`  sitemap: ${seo.sitemapPath}`);
    console.log(`  URL: ${seo.url}`);
  }
}

main()
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
