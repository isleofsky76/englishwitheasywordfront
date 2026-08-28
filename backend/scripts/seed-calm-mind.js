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

const article = {
  title: '한국 사회가 차갑게 느껴질 때 | 법륜 스님 즉문즉설',

  slug: 'when-korean-society-feels-cold',

  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 호주에서 7년을 살다 한국으로 돌아온 질문자의 고민을 통해, 노력과 결과의 관계, 현실을 받아들이는 태도, 젊은이들이 꿈을 꿀 수 있는 사회에 대해 생각해 봅니다.',

  password: 'seed_calm_mind_when-korean-society-feels-cold',

  nickname: 'admin',

  datePublished: '2026-08-28',

  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=0pfQOw-nO98" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div>

<p><strong>질문자는 호주에서 7년을 거주하고 한국으로 돌아온 뒤, 현실이 차갑고 적응하기 어렵다고 느꼈습니다.</strong></p>

<p>호주에서는 열심히 일하면 경제적인 대가를 받고 미래를 조금씩 그려 갈 수 있었는데, 한국에서는 그런 미래를 꿈꾸기가 어렵다는 고민이었습니다.</p>

<p>스님은 먼저 <span class="cm-hl cm-hl--paint">“현실이 차가운 것인지, 내가 차갑게 느끼는 것인지”</span>를 보라고 합니다.</p>

<p>자기가 대한민국을 너무 좋게 평가해 놓고, 기대한 만큼 되지 않으니 자기가 실망한 것일 수도 있다는 것입니다.</p>

<p>남녀 관계를 예로 들면, 내가 어떤 여자를 좋아할수록 그 여자가 나를 좋아할 확률은 높아질 수 있습니다.</p>

<p>하지만 <span class="cm-hl cm-hl--marker">내가 좋아한다고 해서 그 여자도 반드시 나를 좋아하는 것은 아닙니다.</span></p>

<p>노력도 마찬가지입니다.</p>

<p>게으른 것보다 노력하는 것이 성공할 확률은 높일 수 있지만, <strong>내가 부지런하면 반드시 성공한다는 법칙은 없습니다.</strong></p>

<p>한국에서 100을 노력해 50의 대가가 나오고, 호주에서는 100을 노력해 60이 나온다고 생각하니 사람들이 호주로 가는 것입니다.</p>

<p>호주에서 살다가 한국으로 돌아온 사람에게 한국이 차갑게 느껴지는 것은 당연할 수 있습니다.</p>

<p>질문자는 그 차이를 두고 한국 사회가 차갑다고 느낀 것입니다.</p>

<p><span class="cm-hl cm-hl--box">하지만 사회 자체가 차갑거나 따뜻한 것은 아니라는 것이 스님의 설명입니다.</span></p>

<p>반대로 100을 노력해서 30 정도의 대가를 얻던 나라에서 한국으로 온 사람은, 한국에서 50을 얻는 것만으로도 “노력한 대가를 보상하는 좋은 사회”라고 느낄 수 있습니다.</p>

<p>그 사람에게는 같은 한국이 좋은 사회가 됩니다.</p>

<p>한국 사회는 똑같은데 어디에서 왔느냐에 따라 느끼는 것이 달라지는 것입니다.</p>

<p>중국 조선족도 한국에서 차별을 느끼지만, 중국에서보다 노력한 대가가 더 주어진다고 생각하기 때문에 한국을 선택합니다.</p>

<p><u class="cm-underline">질문자가 그렇게 느끼는 것은 이해할 수 있지만, 그것은 자기가 그렇게 느끼는 것이지 한국 사회 자체가 차다, 따뜻하다 할 문제는 아니라는 것입니다.</u></p>

<p><strong>질문자의 또 다른 고민은 한국에서는 미래를 그리기 어렵다는 점입니다.</strong></p>

<p>호주에서 그렸던 삶을 한국에서도 똑같이 그리려고 하니 좌절감이 생긴 것입니다.</p>

<p>스님은 <span class="cm-hl cm-hl--box-round">“여기는 여기에 수입에 맞게 삶을 그려야 되겠죠.”</span>라고 말합니다.</p>

<p>호주로 다시 돌아가기 어려운 현실에 대해서는 등산을 예로 듭니다.</p>

<p>등산하다 다리를 다쳤다면 아무리 올라가고 싶어도 내려와야 합니다.</p>

<p>“다리만 안 다쳤으면” 하고 생각하는 것은 아무 의미가 없습니다.</p>

<p><span class="cm-hl cm-hl--wave">“그게 현실이니까.”</span></p>

<p>그러니 호주에서 젊을 때 7년을 살아본 것만 해도 <strong>“참 많은 경험을 했다, 다행이다”</strong>라고 받아들이면 됩니다.</p>

<p>한국에서는 말도 통하고, 친구도 있고, 음식도 맞고, 차별도 덜 받는 좋은 점을 볼 수 있습니다.</p>

<p>대신 한국 사회는 호주보다 노동에 대한 대가가 조금 떨어지는 사회라는 점은 감수해야 합니다.</p>

<p><strong>두 가지 선택이 가능합니다.</strong></p>

<p>첫째, 지금의 소득에 맞게 생활의 그림을 다시 그리는 것입니다.</p>

<p>호주에서의 소득과 조건에 맞춘 꿈을 계속 붙들고 있으면 <span class="cm-hl cm-hl--dash">“지나가 버린 옛 영화에 눈물 짓고 있다”</span>고 볼 수 있습니다.</p>

<p>둘째, 한국 사회를 젊은이들이 꿈을 잃지 않는 사회로 바꾸는 것입니다.</p>

<p>다만 좋은 일자리만 늘리는 데에는 한계가 있습니다.</p>

<p>한국에는 저임금 일자리는 많지만 사람이 부족해서 외국인 노동자들이 채우고 있습니다.</p>

<p>반대로 고임금 일자리는 창조적인 인력을 요구하지만, 한국 교육은 <strong>“모방 교육”</strong> 중심이라 그런 인재를 충분히 길러내지 못합니다.</p>

<p>그래서 현재 교육을 받고도 배운 것을 활용할 수 있고 임금도 괜찮은 공무원이나 그에 준하는 직장에 사람들이 몰립니다.</p>

<p>하지만 인공지능과 자동화가 발전하면 이런 일자리도 갈수록 줄어들 수밖에 없습니다.</p>

<p><span class="cm-hl cm-hl--oval-slant">그래서 모든 사람의 월급을 높이는 것만 생각할 것이 아니라, 월급이 150만 원 정도여도 작은 꿈을 실현할 수 있는 조건을 사회가 만들어야 합니다.</span></p>

<p><strong>첫 번째는 주택 문제입니다.</strong></p>

<p>주택을 재산 가치의 수단이 아니라 단순한 주거용으로 바꿔야 합니다.</p>

<p>월급 150만 원이면 15만 원, 180만 원이면 18만 원 정도만 내고 살 수 있는 공공임대주택이 필요합니다.</p>

<p><strong>두 번째는 결혼과 육아 문제입니다.</strong></p>

<p>아이를 세 살까지 부모가 직접 키울 수 있도록 유급휴가를 보장해야 합니다.</p>

<p>네 살부터는 국공립 어린이집과 유치원을 확대하고, 중학교까지 무상교육이 가능하도록 해야 합니다.</p>

<p>교육도 <strong>“모방 교육이 아니라 창조 교육”</strong>, <strong>“사교육이 필요 없는 교육 시스템”</strong>으로 바뀌어야 합니다.</p>

<p>그래야 젊은이들이 적은 월급으로도 결혼하고 아이를 키우며 작은 꿈을 실현할 수 있습니다.</p>

<p>마지막으로 스님은 이런 사회를 원한다면 젊은이들이 직접 그런 정책을 <strong>“요구”</strong>해야 한다고 말합니다.</p>

<p>그런 정책을 보고 찍고, 요구하고, 사회개혁에 힘을 모으는 것입니다.</p>

<p>아니면 주어진 한국 사회의 조건에 맞춰 살아가는 선택을 해야 합니다.</p>

<p><span class="cm-hl cm-hl--paint">“호주를 그리워하고만 있는 것은 아무 도움이 안 돼요.”</span></p>

<p><span class="cm-hl cm-hl--box"><strong>“비난만 한다고 되는 게 아니라, 우리가 그런 세상을 만들자.”</strong></span></p>

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
