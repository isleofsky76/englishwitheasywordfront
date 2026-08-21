/**
 * 마음 다스리는 글 (calm-mind) 업로드 (+ slug SEO)
 *
 * 사용법: 아래 article 수정 → node scripts/seed-calm-mind.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========
const article = {
  title: '에티켓을 안 지키는 사람을 어떻게 대해야 할까요? | 법륜 스님 즉문즉설',
  slug: 'rules-purpose-not-anger',
  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 규칙은 사람들 사이의 충돌과 불편을 줄이기 위해 만들어진 것이며, 잘못은 바로잡되 화·짜증·미움·원망에 빠지지 않는 태도를 정리한 마음 다스림 메모입니다.',
  password: 'seed_calm_mind_rules-purpose-not-anger',
  nickname: 'admin',
  datePublished: '2026-08-21',
  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=Z1qb8SaZ_YY" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div><p>규칙은 처음부터 존재한 절대적인 것이 아니라, <span class="cm-hl cm-hl--paint">사람들 사이의 충돌과 불편을 줄이기 위해 필요에 따라 만들어진 것이다.</span> 교통신호도 차량이 많아지면서 사고를 막기 위해 생겨난 규칙이다.</p><p>규칙은 지키는 것이 기본이지만, <u class="cm-underline">규칙 자체보다 그것을 만든 목적을 이해하는 것이 중요하다.</u> 위급한 환자를 병원에 데려가는 상황처럼 더 중요한 목적이 있다면 예외가 생길 수도 있다.</p><p>누군가 규칙을 어겼다고 해서 곧바로 화를 내거나 <span class="cm-hl cm-hl--marker">그 사람을 나쁜 사람이라고 단정해서는 안 된다.</span> 교통법규를 어긴 사람에게도 우리가 알지 못하는 특별한 사정이 있을 수 있기 때문이다.</p><p>그렇다고 화를 내지 않는 것이 <strong>잘못을 그냥 내버려두라는 뜻은 아니다.</strong> 다른 사람에게 피해를 주는 행동이라면 신고하거나 지적해서 개선하도록 할 필요가 있다.</p><p>에티켓과 관습은 절대적인 기준이 아니라 <span class="cm-hl cm-hl--ink">문화와 환경에 따라 달라질 수 있다.</span> 법당에 신발을 신고 들어온 서양인도 무례해서가 아니라 그곳의 관습을 몰랐을 수 있다.</p><p>상대가 규칙이나 관습을 모른다면 비난하기보다 <span class="cm-hl cm-hl--box">그곳의 규칙을 알려주고 이해하도록 하는 것이 적절하다.</span> 잘못된 행동을 바로잡는 것과 상대를 미워하는 것은 다른 문제다.</p><p>부처님의 가르침은 잘못을 못 본 척하라는 것이 아니라, <span class="cm-hl cm-hl--wave">잘못을 바로잡는 과정에서 화·짜증·미움·원망에 빠지지 말라는 것</span>이다.</p><p>스님은 이를 <span class="cm-hl cm-hl--box-round">수행과 교화로 구분</span>한다. 내가 화를 내지 않고 내 마음을 살피는 것은 수행이고, 상대가 잘못된 행동을 개선하도록 돕는 것은 <span class="cm-hl cm-hl--dash">교화이다.</span></p><p class="cm-disclaimer"><strong>Disclaimer</strong><br>저작권에 문제가 될 경우 게시글을 삭제하겠습니다.<br>메일 주소: <a href="mailto:everydayalittlehelp@gmail.com">everydayalittlehelp@gmail.com</a></p>`,
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
