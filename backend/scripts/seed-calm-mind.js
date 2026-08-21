/**
 * 마음 다스리는 글 (calm-mind) 업로드 (+ slug SEO)
 *
 * 사용법: 아래 article 수정 → node scripts/seed-calm-mind.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

// ========== 여기만 수정 ==========
const article = {
  title: '정치적인 이념으로 갈등이 일어날 때 어떻게 해결할까요? | 법륜 스님 즉문 즉설 ',
  slug: 'different-views-not-wrong',
  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 생각이 달라도 상대가 틀린 것은 아니며, 친구는 정치적 동지가 아니라 편안하게 만나는 관계라는 마음 다스림 메모입니다.',
  password: 'seed_calm_mind_different-views-not-wrong',
  nickname: 'admin',
  datePublished: '2026-08-21',
  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=Mr32mAYlcVI" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div><p>내 생각과 다르다고 해서 <span class="cm-hl cm-hl--paint">상대가 틀린 것은 아니다.</span></p><p>“쟤는 저렇게 생각하는구나” 하고 받아들이면 <u class="cm-underline">불편함이 줄어든다.</u></p><p>대한민국 5천만 명 중에는 <span class="cm-hl cm-hl--marker">정치·종교적으로 온갖 견해</span>를 가진 사람이 있다.</p><p>친구는 <strong>정치적인 뜻을 같이하는 동지</strong>가 아니다.</p><p>친구끼리도 <span class="cm-hl cm-hl--ink">정치적 이념과 종교적 믿음</span>은 다를 수 있다.</p><p>자기 신념을 바꿀 필요는 없고, <span class="cm-hl cm-hl--box">자기 신념은 지키면 된다.</span></p><p>동시에 <span class="cm-hl cm-hl--wave">남의 신념도 존중</span>해야 한다.</p><p>자기 생각을 남에게 강요할 필요도 없고, <span class="cm-hl cm-hl--box-round">남의 생각을 강요받을 필요도 없다.</span></p><p>친구를 만났을 때 정치를 앞세우면 친구 관계는 사라지고 <span class="cm-hl cm-hl--oval-slant">정치적 대립만 남는다.</span></p><p>결국 친구는 <span class="cm-hl cm-hl--dash">친구로 편안하게 만나면 된다.</span></p><p class="cm-disclaimer"><strong>Disclaimer</strong><br>저작권에 문제가 될 경우 게시글을 삭제하겠습니다.<br>메일 주소: <a href="mailto:everydayalittlehelp@gmail.com">everydayalittlehelp@gmail.com</a></p>`,
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
