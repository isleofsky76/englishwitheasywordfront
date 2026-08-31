/**
 * Opinions (오피니언 / opinions) 글 추가 (+ slug SEO)
 *
 * - slug·metaDescription → /english-opinions/{slug}/ 정적 페이지 + sitemap
 * - 글마다 password를 다르게 적으면 다른 오피니언 글은 유지되고, 같은 slug만 교체됨
 * 사용법: 백엔드 서버 실행 후 → node scripts/seed-opinions.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

const NUM = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

function highlightWord(sentence, word) {
  const re = new RegExp(`\\b(${word})\\b`, 'i');
  return String(sentence).replace(
    re,
    '<span style="color:#2F80ED;"><strong>$1</strong></span>'
  );
}

function wordHtml(item, index) {
  const n = NUM[index] || `${index + 1}.`;
  return `<h3>${n} <span style="color:#2F80ED;"><strong>${item.en}</strong></span> ${item.ipa} (${item.pron}) : ${item.meaning}</h3>
<p>
${highlightWord(item.enExample, item.en)}
<br>해석: ${item.koExample}
</p>`;
}

function summaryHtml(words) {
  const bits = words.map(
    (w) => `<span style="color:#2F80ED;"><strong>${w.en}</strong></span> (${w.short})`
  );
  return `<h2>한 줄 요약</h2>
<p style="padding:12px; border-radius:8px;">
${bits.join(',\n')}
</p>`;
}

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

function buildRelatedLinksHtml(youtube, source) {
  const lines = [];
  if (youtube) {
    lines.push(
      `<p><a href="${escapeHtmlAttr(youtube)}" target="_blank" rel="noopener noreferrer">📺 유튜브 보기</a></p>`
    );
  }
  if (source) {
    lines.push(
      `<p><a href="${escapeHtmlAttr(source)}" target="_blank" rel="noopener noreferrer">📰 신문 보기</a></p>`
    );
  }
  if (!lines.length) return '';
  return `<div>\n${lines.join('\n')}\n</div>`;
}

function buildOpinionMessage({ words, youtube, source }) {
  const body = words.map(wordHtml).join('\n\n');
  const links = buildRelatedLinksHtml(youtube, source);
  return `\n${body}\n\n${summaryHtml(words)}${links ? `\n${links}` : ''}\n`;
}


const opinionSet = [
  {
    en: 'uniquely',
    pron: '유니클리',
    ipa: '/juˈniːkli/',
    meaning: '독특하게, 유례없이, 고유하게',
    short: '독특하게',
    enExample:
      'We have abandoned the uniquely American idea that you must earn what you get.',
    koExample:
      '우리는 자신이 얻는 것은 노력으로 획득해야 한다는(you must earn what you get) 미국 특유의 사고방식을(the uniquely American idea) 저버렸습니다(have abandoned).'
  },
  {
    en: 'immigrate',
    pron: '이미그레이트',
    ipa: '/ˈɪmɪɡreɪt/',
    meaning: '이주해 오다, 이민 오다',
    short: '이민 오다',
    enExample:
      'They had immigrated to become Americans—that was the whole point.',
    koExample:
      '그들은 미국인이 되기 위해(to become Americans) 이민을 왔고(had immigrated), 그것이 바로 핵심이었습니다(that was the whole point).'
  },
  {
    en: 'scramble',
    pron: '스크램블',
    ipa: '/ˈskræmbəl/',
    meaning: '고군분투하다, 필사적으로 애쓰다',
    short: '고군분투하다',
    enExample:
      'My father came back from war and scrambled to find work.',
    koExample:
      '아버지는 전쟁에서 돌아와(came back from war) 일자리를 구하려고(to find work) 필사적으로 애쓰셨습니다(scrambled).'
  },
  {
    en: 'obligation',
    pron: '아블리게이션',
    ipa: '/ˌɑːblɪˈɡeɪʃən/',
    meaning: '의무, 책임',
    short: '의무',
    enExample:
      'You reached for it, you used it, and you honored the obligation.',
    koExample:
      '기회를 향해 손을 뻗고(reached for it), 그 기회를 활용하며(used it), 그에 따른 의무와 책임을 다해야 했습니다(honored the obligation).'
  },
  {
    en: 'affluent',
    pron: '애플루언트',
    ipa: '/ˈæfluənt/',
    meaning: '부유한, 풍족한',
    short: '부유한',
    enExample:
      'Most of my colleagues grew up with educated parents, affluent households and connections.',
    koExample:
      '내 동료들 대부분은(Most of my colleagues) 교육받은 부모와(educated parents), 부유한 집안(affluent households), 든든한 인맥 속에서(connections) 자랐습니다(grew up).'
  },
  {
    en: 'entitlement',
    pron: '인타이틀먼트',
    ipa: '/ɪnˈtaɪtəlmənt/',
    meaning: '공식적인 권리, 당연히 누려야 한다는 권리의식',
    short: '권리의식',
    enExample:
      'The difference shapes whether you see success as an entitlement or as yours to create.',
    koExample:
      '그 차이는(The difference) 성공을 당연히 누려야 할 권리로 보는지(see success as an entitlement), 아니면 스스로 만들어야 할 것으로 보는지(as yours to create)에 대한 시각을 결정합니다(shapes).'
  },
  {
    en: 'catastrophic',
    pron: '캐터스트로픽',
    ipa: '/ˌkætəˈstrɑːfɪk/',
    meaning: '파멸적인, 비극적인, 대재앙의',
    short: '재앙적인',
    enExample:
      'My generation—the baby boomers—made a catastrophic mistake.',
    koExample:
      '우리 세대, 즉 베이비부머들은(My generation—the baby boomers) 치명적이고 재앙적인 실수를 저질렀습니다(made a catastrophic mistake).'
  },
  {
    en: 'deprive',
    pron: '디프라이브',
    ipa: '/dɪˈpraɪv/',
    meaning: '박탈하다, 빼앗다',
    short: '박탈하다',
    enExample:
      'But in freeing them of the need to struggle, we deprived them of something essential.',
    koExample:
      '그러나 아이들에게 고군분투해야 할 필요성을 없애줌으로써(in freeing them of the need to struggle), 우리는 아이들에게서 본질적으로 중요한 무언가를(something essential) 빼앗았습니다(deprived them of).'
  },
  {
    en: 'grievance',
    pron: '그리번스',
    ipa: '/ˈɡriːvəns/',
    meaning: '불만, 고충, 피해의식',
    short: '불만',
    enExample:
      'They’re about grievance, redistribution and the conviction that your own failures are the result of someone else’s success.',
    koExample:
      '그 운동들은 불만과 피해의식(grievance), 재분배(redistribution), 그리고 자신의 실패가 타인의 성공 때문에 생겼다는 확신(the conviction that your own failures are the result of someone else’s success)에 기반합니다.'
  },
  {
    en: 'rigged',
    pron: '리그드',
    ipa: '/rɪɡd/',
    meaning: '조작된, 부정하게 꾸며진, 불공정한',
    short: '조작된',
    enExample:
      'The system is rigged, the deck is stacked, someone else has too much.',
    koExample:
      '시스템은 조작되어 불공정하고(The system is rigged), 판은 애초에 불리하게 짜여 있으며(the deck is stacked), 다른 누군가는 너무 많은 것을 가졌다는 식입니다(someone else has too much).'
  },
  {
    en: 'condescension',
    pron: '칸디센션',
    ipa: '/ˌkɑːndɪˈsenʃən/',
    meaning: '오만, 잘난 체함, 은혜를 베푸는 듯한 태도',
    short: '오만',
    enExample:
      'It is condescension packaged as solidarity.',
    koExample:
      '그것은 연대라는 이름으로 포장된(packaged as solidarity) 오만하고 우월감 어린 태도입니다(condescension).'
  },
  {
    en: 'incidental',
    pron: '인시덴털',
    ipa: '/ˌɪnsɪˈdentəl/',
    meaning: '부수적인, 우연적인, 곁다리의',
    short: '부수적인',
    enExample:
      'But what came out of that hardship—the self-reliance, the drive, the refusal to accept helplessness—wasn’t incidental to who they were.',
    koExample:
      '하지만 그 고난에서 생겨난 것들(what came out of that hardship), 즉 자립심과(self-reliance) 추진력(the drive), 무력감을 받아들이지 않는 태도(the refusal to accept helplessness)는 그들이 어떤 사람이 되었는지를 규정하는 데 부수적인 요소가 아니었습니다(wasn’t incidental to who they were).'
  }
];

const posts = [
  {
    title: '셀카 세대는 베이비부머 세대가 저지른 실수다',
    slug: 'uniquely-related-words',
    metaDescription:
      'uniquely(독특하게), immigrate(이민 오다), scramble(고군분투하다), obligation(의무), affluent(부유한), entitlement(권리의식), catastrophic(재앙적인), deprive(박탈하다), grievance(불만), rigged(조작된), condescension(오만), incidental(부수적인) 뜻·발음·예문을 정리한 오피니언 어휘 학습입니다.',
    message: buildOpinionMessage({
      words: opinionSet,
      youtube:
        'https://www.youtube.com/watch?v=-7t8B_2QEhk&list=PLA-OHa20ZsGA&index=3',
      source:
        'https://www.wsj.com/opinion/the-selfie-generation-is-the-baby-boomers-mistake-4b75d1d1?mod=opinion_trendingnow_article_pos4'
    }),
    nickname: 'admin',
    password: 'seed_opinions_uniquely-related-words'
  }
];


async function seed() {
  console.log('Opinions 글 추가 중...', API_BASE);

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    try {
      const listRes = await fetch(`${API_BASE}/opinions`);
      const listData = await listRes.json();
      const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
      const matches = entries.filter((entry) =>
        entry?._id && (entry.slug === post.slug || entry.title === post.title)
      );

      let deleted = 0;
      for (const entry of matches) {
        const delRes = await fetch(`${API_BASE}/opinions/deletepost`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: entry._id, password: post.password }),
        });
        if (delRes.ok) deleted++;
      }
      if (deleted > 0) console.log(`  같은 slug/제목 기존 글 ${deleted}개 교체`);

      const res = await fetch(`${API_BASE}/opinions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`  ${i + 1}. "${post.title}" 추가됨`);
        if (post.slug) console.log(`     slug: ${post.slug}`);
        if (post.slug && post.metaDescription) {
          const seo = applySeoAfterUpload('english-opinions', {
            title: post.title,
            slug: post.slug,
            metaDescription: post.metaDescription,
            datePublished: toIsoDateOnly(),
          });
          if (seo?.seoPath) console.log(`     SEO page: ${seo.seoPath}`);
          if (seo?.url) console.log(`     URL: ${seo.url}`);
          else console.log(`     URL: ${SITE_ORIGIN}/english-opinions/${encodeURIComponent(post.slug)}/`);
        }
      } else console.log(`  ${i + 1}. 실패:`, data.error || res.status);
    } catch (e) {
      console.log(`  ${i + 1}. 오류:`, e.message);
    }
  }
  console.log('완료.');
}

seed();
