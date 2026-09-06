/**
 * 마음 다스리는 글 (calm-mind) 업로드 (+ slug SEO)
 *
 * 사용법: 아래 article 수정 → node scripts/seed-calm-mind.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';



// ========== 여기만 수정 ==========
//cd c:\langchain\backend
// node scripts/seed-calm-mind.js
// cd c:\langchain
// git pull origin main --no-edit
// git add calm-mind/how-to-become-a-wise-adult/ sitemap.xml
// git commit -m "Add calm mind: 지혜로운 어른이 되려면 | 법륜스님 즉문즉설"
// git push origin main
// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '고생을 많이 하면 정말 법륜스님처럼 현명해지나요? | 법륜스님 즉문즉설',

  slug: 'does-suffering-make-you-wise',

  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 고행이나 극단적인 결심보다 있는 그대로 알아차리고, 작은 것부터 가볍게 시도하며, 안 되는 것은 수용하는 태도에 관한 내용을 담았습니다.',

  password: 'seed_wisdom_does-suffering-make-you-wise',

  nickname: 'admin',

  datePublished: '2026-09-06',

  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=XDTPFNUft74&t=4s" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div>

<p><span class="cm-hl cm-hl--paint">고행이나 극단적인 결심이 답이 아니다.</span></p>

<p>무언가를 억지로 결심하거나 고행하듯 밀어붙이면 오래가지 못하고(작심삼일), 뜻대로 안 될 때 자책과 자학으로 이어지기 쉽다.</p>

<p>남의 멋진 모습(스님의 삶, 의사의 죽음, 화려한 결혼 등)을 보고 무작정 따라 하려는 것은 수행이 아니라 <span class="cm-hl cm-hl--marker">또 다른 '욕망'에 불과하다.</span></p>

<p><span class="cm-hl cm-hl--box-round">판단 없이 있는 그대로 '알아차리기'(너 자신을 알라)가 중요하다.</span></p>

<p>즐겁거나 괴로운 감정, 좁은 마음, 화나 짜증이 일어날 때 “이러면 안 된다”, “왜 나는 이럴까” 하고 옳고 그름을 따지거나 자책하지 말 것.</p>

<p>의사가 환자를 치료하기 전 병을 먼저 진단하듯, 내가 어떤 상황에서 화를 내고 질투하는지 <span class="cm-hl cm-hl--box">제3자의 눈으로 자기 상태를 가만히 관찰하고 파악하는 것이 우선.</span></p>

<p><span class="cm-hl cm-hl--marker">욕심내지 말고 '작은 것 하나만' 시도하기.</span></p>

<p>모든 것을 한 번에 다 고치려 들면 실패할 수밖에 없다.</p>

<p>개선하고 싶은 부분이 있다면 딱 한두 가지만 정해 가볍게 시도.</p>

<p><span class="cm-hl cm-hl--oval-slant">안 되는 것은 '그대로 수용하기'(과보 받아들이기).</span></p>

<p>만약 노력해도 잘 고쳐지지 않는다면 자학하지 말고 “내 습(습관)의 뿌리가 깊구나” 하고 인정하면 된다.</p>

<p><span class="cm-hl cm-hl--box-round"><strong>고칠 수 있는 것은 가볍게 고쳐보고, 안 되는 것은 있는 그대로 받아들이는 것(수용)이 진정한 마음의 평화로 가는 길이다.</strong></span></p>

<p class="cm-disclaimer"><strong>Disclaimer</strong><br>저작권에 문제가 될 경우 게시글을 삭제하겠습니다.<br>메일 주소: <a href="mailto:everydayalittlehelp@gmail.com">everydayalittlehelp@gmail.com</a></p>`,
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
