/**

 * 포토영어 컬렉션에 글 1개 추가 (+ slug SEO)

 * - 같은 title 또는 slug + 비밀번호가 맞으면 기존 글 삭제 후 추가

 * - slug·metaDescription 있으면 /photo-english/{slug}/ + sitemap 갱신

 *

 * 사용법: backend 폴더에서

 *   node scripts/send_photo.js

 * 삭제만:

 *   node scripts/send_photo.js --delete-only

 *

 * 포맷: 제목 = "한글 제목 | English title"

 *       본문 = 이미지(맨 위) + 영어·한글 문장 목록 (번호 없음)

 */



import { API_BASE } from './loadEnv.js';

import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';



const HERO_IMG_STYLE =

  'max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.15rem 0;';



function buildPhotoMessage(imageSrc, imageAlt, sentences) {

  const items = sentences.map((s) => `

    <div class="pe-sentence">

      <p class="pe-en">${s.en}</p>

      <p class="pe-ko-line">${s.ko}</p>

    </div>`).join('');



  return `<div class="photo-english-card">

  <p class="pe-hero" style="margin:0;padding:0;text-align:left;"><img class="wotd-hero-image pe-hero-img" src="${imageSrc}" alt="${imageAlt}" loading="lazy" style="${HERO_IMG_STYLE}"></p>

  <div class="pe-sentences">${items}

  </div>

  <p class="pe-ai-note">Google Gemini를 이용해 생성되었으며 웹사이트 담당자의 검수를 거쳤습니다.</p>

  </div>`;

}



// ========== 여기만 수정 포토영어는 인스타에서 매력적인 사진 또는 오늘 화제가 된 사진으로 할 것. 로맨스 연애 스포츠 등 예쁜 것으로, gpt 소설, 홈페이지 , 핀터레스트 감동 장면. 유명사진 등등. ==========
const entry = {
  title: '데이트 분석 | Dating with a Spreadsheet',
  message: buildPhotoMessage(
    '/resources/dating-spreadsheet.jpg',
    'A woman reviewing dating information and compatibility data in a spreadsheet with her friends',
    [
      {
        en: 'Emma was smitten with someone she met, but decided to track her dates in a spreadsheet with her friends.',
        ko: '엠마는 만난 사람에게 푹 빠졌지만, 친구들과 함께 데이트 내용을 스프레드시트에 기록하기로 했다.',
      },
      {
        en: 'She crunched the numbers to assess their compatibility objectively.',
        ko: '그녀는 두 사람의 궁합을 객관적으로 평가하기 위해 수치를 분석했다.',
      },
      {
        en: 'The data revealed that she had compromised on her core values simply because she was tired of searching.',
        ko: '데이터는 그녀가 상대를 찾는 데 지친 나머지 자신의 핵심 가치에 타협했다는 사실을 보여주었다.',
      },
      {
        en: 'Several red flags appeared when she reviewed the spreadsheet carefully.',
        ko: '그녀가 스프레드시트를 자세히 검토하자 여러 위험 신호가 드러났다.',
      },
      {
        en: 'She realized that she had been minimizing her own needs and numbing herself to her doubts.',
        ko: '그녀는 자신의 필요를 축소하고 마음속 의심을 애써 무시해 왔다는 것을 깨달았다.',
      },
      {
        en: 'The tracker revealed clear patterns in what she actually wanted from a relationship.',
        ko: '추적 기록은 그녀가 관계에서 실제로 원하는 것이 무엇인지 분명한 패턴을 보여주었다.',
      },
      {
        en: 'He checked all the boxes on paper, but his laid-back attitude concerned her.',
        ko: '그는 조건상으로는 모든 기준을 충족했지만, 지나치게 느긋한 태도가 그녀를 걱정하게 했다.',
      },
      {
        en: 'She widened her search filters and began dating people with different backgrounds and profiles.',
        ko: '그녀는 검색 조건을 넓히고 서로 다른 배경과 특성을 지닌 사람들을 만나기 시작했다.',
      },
      {
        en: 'Over time, she discovered that the spreadsheet helped her understand her own dating patterns better.',
        ko: '시간이 지나면서 그녀는 스프레드시트가 자신의 연애 패턴을 더 잘 이해하는 데 도움이 된다는 것을 알게 되었다.',
      },
      {
        en: 'When she met someone truly compatible, the data confirmed what she already felt.',
        ko: '그녀가 정말 잘 맞는 사람을 만났을 때, 데이터는 그녀가 이미 느끼고 있던 감정을 확인해 주었다.',
      },
    ]
  ),
  nickname: 'admin',
  password: 'seed_password_dating_spreadsheet',
  isSecret: false,
};
// =================================



async function deleteMatching({ title, slug, password }) {

  const listRes = await fetch(`${API_BASE}/photo-english`);

  const listData = await listRes.json();

  const list = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

  const targets = list.filter(

    (e) => e?._id && (e.title === title || (slug && e.slug === slug))

  );



  let deleted = 0;

  for (const e of targets) {

    const delRes = await fetch(`${API_BASE}/photo-english-deletepost`, {

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

  const { title, message, nickname, password, isSecret, slug, metaDescription, datePublished } =

    entry;

  const deleteOnly = process.argv.includes('--delete-only');



  console.log('포토영어 처리 중...', API_BASE);



  try {

    await deleteMatching({ title, slug, password });

    if (deleteOnly) {

      console.log('완료. (--delete-only)');

      return;

    }



    const res = await fetch(`${API_BASE}/photo-english`, {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

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

      const seo = applySeoAfterUpload('photo-english', {

        title,

        slug,

        metaDescription,

        datePublished: datePublished || toIsoDateOnly(),

        message,

      });

      if (seo?.seoPath) console.log('  SEO page:', seo.seoPath);

      if (seo?.sitemapPath) console.log('  sitemap:', seo.sitemapPath);

      if (seo?.url) console.log('  URL:', seo.url);

      else console.log(`  URL: ${SITE_ORIGIN}/photo-english/${encodeURIComponent(slug)}/`);

    }

  } catch (e) {

    console.error('  오류:', e.message);

  }

  console.log('완료.');

}



run();

