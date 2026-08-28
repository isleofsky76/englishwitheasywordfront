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

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '될 대로 되라며 살아도 될까요? | 법륜 스님 즉문즉설',

  slug: 'do-your-best-without-clinging-to-results',

  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 될 대로 되라는 마음으로 살아도 되는지 고민하는 24살 청년에게, 최선을 다하되 결과에 연연하지 않는 삶의 태도를 설명한 내용을 담았습니다.',

  password: 'seed_calm_mind_do-your-best-without-clinging-to-results',

  nickname: 'admin',

  datePublished: '2026-08-28',

  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p></div>

<p><strong>질문자는 24살 군 전역 후 예전에는 많이 힘들고 우울했던 시기가 있었지만, 법륜스님 말씀을 들으면서 삶을 긍정적으로 보게 되었습니다.</strong></p>

<p>그런데 요즘은 뭐든 <span class="cm-hl cm-hl--paint">“될 대로 되라”</span>는 식으로 너무 가볍게 생각하게 되었습니다.</p>

<p>결혼도 해야 하고 미래도 준비해야 하는데, 이렇게 “될 대로 되라”는 식으로 살아도 되는지가 고민이었습니다.</p>

<p>스님은 어떤 여인이 좋다면 그 여인에게 호의를 베풀 수 있다고 예를 들었습니다.</p>

<p>하지만 <span class="cm-hl cm-hl--marker">그 여인이 나를 좋아할지 안 좋아할지는 그 여인의 권리</span>입니다.</p>

<p>내가 좋아한다고 해서 상대도 반드시 나를 좋아해야 한다고 강요할 수는 없습니다.</p>

<p>노력도 마찬가지입니다.</p>

<p><strong>노력은 하되 되고 안 되는 것은 하늘에 맡기는 것.</strong></p>

<p>옛말로 표현하면 <span class="cm-hl cm-hl--box">“일은 사람이 도모하고 뜻은 하늘이 이룬다.”</span>는 것입니다.</p>

<p>스님은 이것을 수행적 관점에서는 <u class="cm-underline">“최선을 다하되 결과에 연연하지 않는다.”</u>라고 표현했습니다.</p>

<p>최선을 다하지 않으면 게으른 사람입니다.</p>

<p>반대로 최선을 다하면서도 결과가 반드시 내가 원하는 대로 되어야 한다고 붙잡으면 집착하는 사람이 됩니다.</p>

<p><span class="cm-hl cm-hl--oval-slant">내가 할 일은 다 하되, 그 결과가 반드시 내 의도대로 되어야 한다고 집착하지 않는 것.</span></p>

<p>그러므로 “될 대로 되라”는 말은 아무것도 하지 않아도 된다는 뜻이 아닙니다.</p>

<p>미래를 준비하고 할 수 있는 노력은 계속하되, 결과 때문에 안절부절하지 않는다는 뜻입니다.</p>

<p><span class="cm-hl cm-hl--box-round"><strong>최선을 다하되 결과에 연연하지 않는다.</strong></span></p>

<p>되면 다행이고, 안 되면 다시 되도록 노력하면 된다는 것이 스님의 말씀입니다.</p>

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
