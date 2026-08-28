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
  title: '한국 사회가 차갑게 느껴질 때 | 법륜 스님 즉문즉설',

  slug: 'when-korean-society-feels-cold',

  metaDescription:
    '법륜스님 즉문즉설을 듣고 정리한 글. 호주에서 7년을 살다 한국으로 돌아온 질문자의 고민을 통해, 현실에 대한 기대, 노력과 결과의 관계, 현재 조건을 받아들이는 태도와 사회를 바꾸는 방법에 대해 생각해 봅니다.',

  password: 'seed_calm_mind_when-korean-society-feels-cold',

  nickname: 'admin',

  datePublished: '2026-08-28',

  message: `<div class="cm-source-box"><p><strong>출처</strong> — 이 글은 법륜스님 즉문즉설 영상 내용을 근거로, 기억하고 싶은 말을 <strong>개인 목적</strong>으로 남긴 것입니다.</p><p><a class="cm-yt-link" href="https://www.youtube.com/watch?v=0pfQOw-nO98" target="_blank" rel="noopener noreferrer">📺 법륜스님 즉문즉설 바로가기</a></p></div>

<p>질문자는 호주에서 7년을 살다가 한국으로 돌아온 뒤, 현실이 차갑고 적응하기 어렵다고 느꼈습니다. 호주에서는 열심히 일하면 경제적인 대가를 받고 미래를 조금씩 그려 갈 수 있었는데, 한국에서는 그런 미래를 꿈꾸기가 어렵다고 말했습니다.</p>

<p>스님은 먼저 <span class="cm-hl cm-hl--paint">“현실이 차가울까요, 내가 차갑게 느낄까요?”</span>라고 물으셨습니다. 이어 “내가 원하는 대로 안 되면 찬가요?”라고 하시며, 막연히 현실이 차갑다고 말하기보다 무엇을 두고 차갑다고 하는지 구체적으로 봐야 한다고 말씀하셨습니다.</p>

<p>질문자는 좋아하는 일을 열심히 하면 어느 정도 경제적인 보상이 주어져야 하고, 그래야 미래를 꿈꿀 수 있는 것 아니냐고 말했습니다. 그러자 스님은 <u class="cm-underline">“노력하면 경제적인 대가가 주어져야 된다는 법칙이 있습니까?”</u>라고 되물으셨습니다.</p>

<p>스님은 남녀 관계를 예로 드셨습니다. 내가 어떤 여자를 좋아하면 그 여자가 나를 좋아할 확률은 높아질 수 있지만, <span class="cm-hl cm-hl--marker">“내가 좋아하면 그 여자도 나를 좋아한다”는 것은 없다는 것입니다.</span></p>

<p>노력도 마찬가지라고 하셨습니다. 게으른 것보다 노력하는 것이 성공할 확률은 높일 수 있지만, <strong>“내가 부지런하면 성공한다”는 법칙은 없다</strong>는 것입니다. 노력과 결과를 반드시 하나로 연결해서 생각하면 기대만큼 결과가 나오지 않았을 때 실망하게 된다는 뜻으로 들렸습니다.</p>

<p>스님은 질문자가 대한민국을 너무 좋게 평가해 놓고, 기대했던 만큼 결과가 나오지 않으니 스스로 실망한 것일 수도 있다고 말씀하셨습니다.</p>

<p>이어 한국과 호주의 차이를 숫자로 설명하셨습니다. 한국에서 100을 노력해 50의 대가가 나오고, 호주에서는 100을 노력해 60이 나온다고 느낀다면, 호주에서 살다 한국에 돌아온 사람에게는 한국이 차갑게 느껴질 수 있다는 것입니다.</p>

<p><span class="cm-hl cm-hl--box">“그것이 자기가 느끼는 거지 한국 사회가 차다, 따뜻하다 할 것은 아니다.”</span> 60이 나오던 사회에서 50이 나오는 사회로 왔기 때문에 상대적으로 그렇게 느끼는 것이라고 설명하셨습니다.</p>

<p>반대의 경우도 말씀하셨습니다. 100을 노력해서 30 정도의 대가를 얻던 나라에서 한국으로 온 사람은, 한국에서 50을 얻는 것만으로도 “노력한 대가를 보상하는 좋은 사회”라고 느낄 수 있습니다.</p>

<p>동남아시아 노동자나 중국 조선족도 한국에 와서 차별이나 여러 불리한 조건을 겪지만, 자기 나라보다 노동의 대가가 더 나오기 때문에 한국에 온다고 설명하셨습니다. 같은 한국 사회라도 이전에 어떤 조건에서 살았느냐에 따라 전혀 다르게 느껴질 수 있다는 것입니다.</p>

<p>질문자가 호주로 다시 돌아가고 싶지만 개인적인 사정 때문에 어렵다고 하자, 스님은 등산을 예로 드셨습니다. 산에 올라가다가 다리를 다쳤다면 아무리 정상에 올라가고 싶어도 내려와야 합니다.</p>

<p><span class="cm-hl cm-hl--wave">“다리만 안 다쳤으면” 하고 생각하는 것은 아무 의미가 없습니다. “그게 현실이니까.”</span> 이미 주어진 현실을 놓고 과거의 조건만 생각하는 것은 도움이 되지 않는다는 뜻입니다.</p>

<p>그러니 호주에서 젊을 때 7년을 살아본 것만 해도 <strong>“참 많은 경험을 했다, 다행이다”</strong>라고 생각하고, 한국에 돌아온 뒤에는 말이 통하고 친구가 있고 음식이 맞으며 차별을 덜 받는 좋은 점도 보라고 말씀하셨습니다.</p>

<p>대신 한국은 노동에 대한 대가가 호주보다 떨어질 수 있다는 점은 감수해야 한다고 하셨습니다. 좋은 점만 갖고 나쁜 조건은 하나도 없는 사회를 기대하기보다는, 자신이 선택한 현실의 장점과 단점을 함께 봐야 한다는 것입니다.</p>

<p>질문자는 다시 결혼도 하고 사랑하는 가족들과 좋은 환경에서 살고 싶은데, 한국에서는 5년 뒤는커녕 내년조차 미래를 그리기 어렵다고 말했습니다. 호주에서는 한발 한발 앞으로 나아가고 이루어 가는 느낌이 있었지만, 한국에서는 그런 그림을 그리기가 어렵다는 고민이었습니다.</p>

<p>스님은 <span class="cm-hl cm-hl--box-round">“호주에 있을 때 그렸던 것하고 한국 사회가 다른데 동일하게 그리니까 이런 절감이 들죠.”</span>라고 말씀하셨습니다. 그리고 “여기는 여기에 수익에 맞게 그려야 되겠죠”라고 하셨습니다.</p>

<p>첫 번째 선택은 현재 한국의 소득과 조건에 맞게 생활의 그림을 다시 그리는 것입니다. 호주에 있을 때의 소득과 조건을 기준으로 한국에서도 같은 삶을 기대하면 현실적이지 않다고 하셨습니다.</p>

<p>스님은 그런 상태를 <strong>“옛날의 꿈에 젖어 있다. 이미 지나가 버린 옛 영화에 눈물 짓고 있다.”</strong>고 표현하셨습니다.</p>

<p>두 번째 선택은 한국 사회 자체를 젊은이들이 꿈을 잃지 않는 사회로 바꾸는 것입니다.</p>

<p>하지만 사람들이 원하는 것처럼 월급 200만 원, 300만 원을 받는 좋은 직장을 충분히 많이 만드는 데에는 현실적인 한계가 있다고 설명하셨습니다. <span class="cm-hl cm-hl--dash">“갈수록 직장은 더 줄어듭니다.”</span></p>

<p>특히 “단순한 지식이나 단순한 기술은 앞으로 갈수록 다 기계가 대체하게 돼요. 인공지능이 자꾸 나오기 때문에”라고 말씀하시며, 자동화와 인공지능 때문에 일자리는 앞으로 더 줄어들 수밖에 없다고 설명하셨습니다.</p>

<p>한국에는 저임금 일자리는 많이 있지만 사람이 부족해 외국인 노동자들이 채우고 있고, 반대로 고임금 일자리도 인력이 부족하지만 기업이 원하는 창조적인 인재가 부족한 상황이라고 말씀하셨습니다.</p>

<p>스님은 그 이유 중 하나로 한국의 교육을 들었습니다. 현재 학교 교육은 <strong>“모방 교육”</strong> 중심인데, 높은 임금을 받는 일자리는 창조적인 인력을 요구하기 때문에 교육과 일자리 사이에 차이가 생긴다는 것입니다.</p>

<p>현재 교육을 받고도 써먹을 수 있으면서 임금도 괜찮은 대표적인 직장이 공무원이기 때문에 사람들이 공무원에 몰리지만, 이런 직장 역시 앞으로 자동화로 인해 줄어들 수 있다고 설명하셨습니다.</p>

<p>그래서 모든 사람의 월급을 높이는 것만 생각해서는 안 되고, <span class="cm-hl cm-hl--oval-slant">적은 월급을 가지고도 “작은 꿈을 실현할 수 있는 조건”을 사회가 만들어 줘야 한다</span>고 말씀하셨습니다.</p>

<p>첫 번째는 주택 문제입니다. 한국에서 주택은 재산 가치의 의미가 강한데, 앞으로는 단순한 주거용으로 바뀌어야 한다고 하셨습니다.</p>

<p>예를 들어 월급 150만 원을 받으면 15만 원, 180만 원을 받으면 18만 원 정도의 월세만 내고 살 수 있는 저비용 정부 임대 아파트나 공공임대아파트가 많이 지어져야 한다고 말씀하셨습니다.</p>

<p>두 번째는 결혼과 육아 문제입니다. 아이가 세 살 정도까지는 부모가 직접 키울 수 있도록 유급휴가를 보장하고, 네 살부터는 어린이집과 유치원을 국공립 중심으로 전환해 중학교까지 무료교육, 무상교육이 가능한 시스템으로 가야 한다고 하셨습니다.</p>

<p>교육도 <strong>“모방 교육이 아니라 창조 교육”</strong>으로 바뀌어야 하며, <strong>“사교육이 필요 없는 교육 시스템”</strong>을 만들어야 한다고 말씀하셨습니다.</p>

<p>그렇게 해야 젊은 사람들이 월급이 조금 적은 직장을 가지고도 결혼하고 아이를 키우며 자신의 작은 꿈을 실현할 수 있다는 것입니다.</p>

<p>마지막으로 스님은 젊은이들이 이런 사회를 원한다면 직접 <strong>“요구”</strong>해야 한다고 말씀하셨습니다. 그런 정책을 보고 찍고, 요구하고, 사회개혁에 힘을 모아야 한다는 것입니다.</p>

<p>아니면 주어진 한국 사회에 맞춰 살아가는 선택을 해야 합니다. <span class="cm-hl cm-hl--paint">“자기처럼 이렇게 호주를 그리워하고만 있는 것은 아무 도움이 안 돼요.”</span></p>

<p>살기 좋은 곳만 찾아 전 세계를 돌아다니거나 한국을 비난하는 데 머물 것이 아니라, 지금 대한민국이 아직 원하는 수준이 아니라면 그 사회를 직접 바꾸는 데 참여해야 한다는 것입니다.</p>

<p><span class="cm-hl cm-hl--box"><strong>“비난만 한다고 되는 게 아니라, 우리가 그런 세상을 만들자.”</strong></span> 현재의 현실을 인정하면서도 더 나은 사회를 원한다면 요구하고 참여하는 적극적인 자세가 필요하다는 것이 이 말씀의 핵심으로 들렸습니다.</p>

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
