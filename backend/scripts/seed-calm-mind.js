/**
 * 마음 다스리는 글 (calm-mind) 업로드 (+ slug SEO)
 *
 * 사용법: 아래 article 수정 → node scripts/seed-calm-mind.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';



// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========

const article = {
  title: '한국 사회가 차갑게 느껴질 때 | 법륜 스님 즉문즉설',

  slug: 'when-korean-society-feels-cold',

  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 호주에서 7년을 살다 한국으로 돌아온 질문자의 고민을 통해, 현실에 대한 기대, 노력의 대가, 이전 경험에 따른 체감 차이, 현재 조건을 받아들이는 태도에 대해 생각해 봅니다.',

  password: 'seed_calm_mind_when-korean-society-feels-cold',

  nickname: 'admin',

  datePublished: '2026-08-28',

  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=0pfQOw-nO98" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div>

<p>질문자는 호주에서 7년을 살다가 한국으로 돌아온 뒤, 현실이 차갑고 적응하기 어렵다고 느꼈습니다. 호주에서는 열심히 일하면 경제적인 대가를 받고 미래를 조금씩 그려 갈 수 있었는데, 한국에서는 그런 미래를 꿈꾸기가 어렵다고 말했습니다.</p>

<p>스님은 먼저 <span class="cm-hl cm-hl--paint">“현실이 차가운 걸까요, 내가 차갑게 느끼는 걸까요?”</span>라고 질문하셨습니다. 내가 원하는 대로 되지 않기 때문에 현실을 차갑다고 느끼는 것은 아닌지, 무엇을 두고 차갑다고 하는지 구체적으로 봐야 한다고 말씀하셨습니다.</p>

<p>질문자는 좋아하는 일을 열심히 하면 어느 정도 경제적인 보상이 주어져야 하지 않느냐고 말했습니다. 그러자 스님은 <u class="cm-underline">“노력하면 경제적인 대가가 반드시 주어져야 한다는 법칙이 있습니까?”</u>라고 되물으셨습니다.</p>

<p>스님은 남녀 관계를 예로 드셨습니다. 내가 어떤 여자를 좋아하면 그 여자가 나를 좋아할 확률은 높아질 수 있지만, <span class="cm-hl cm-hl--marker">내가 좋아한다고 해서 상대도 반드시 나를 좋아해야 하는 것은 아닙니다.</span> 노력도 마찬가지입니다. 게으른 것보다 부지런히 노력하면 성공할 확률은 높아질 수 있지만, “내가 부지런하면 반드시 성공한다”는 법칙은 없다는 것입니다.</p>

<p>또 한국에서 100을 노력해 50의 대가를 얻고, 호주에서는 60을 얻는다고 느낀다면 호주에서 살다 돌아온 사람에게 한국은 더 차갑게 느껴질 수 있다고 설명하셨습니다. 반대로 100을 노력해 30을 얻던 나라에서 한국으로 온 사람은 같은 한국을 보고도 노력한 대가가 더 주어지는 좋은 사회라고 느낄 수 있습니다.</p>

<p><span class="cm-hl cm-hl--box">즉 한국 사회 자체가 차갑고 따뜻한 것이 아니라, 이전에 어떤 조건에서 살았느냐에 따라 다르게 느낄 수 있다는 것입니다.</span> 동남아시아 노동자나 중국 조선족이 차별이나 불편을 감수하면서도 한국에 오는 이유 역시 자기 나라보다 노동의 대가가 더 크다고 느끼기 때문이라고 설명하셨습니다.</p>

<p>질문자가 호주로 다시 돌아가고 싶지만 개인적인 사정 때문에 어렵다고 하자, 스님은 등산을 예로 드셨습니다. 산에 올라가다가 다리를 다쳤다면 아무리 정상에 가고 싶어도 내려와야 합니다. <span class="cm-hl cm-hl--wave">“다리만 안 다쳤으면” 하고 생각해 봐야 이미 주어진 현실은 달라지지 않습니다.</span></p>

<p>그러니 호주에서 젊을 때 7년을 살아본 것을 좋은 경험으로 받아들이고, 한국에 돌아와서는 말이 통하고 친구가 있고 음식이 맞으며 차별을 덜 받는 장점도 보라고 말씀하셨습니다. 대신 노동에 대한 대가는 호주보다 떨어질 수 있다는 현실도 감수해야 한다고 설명하셨습니다.</p>

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
