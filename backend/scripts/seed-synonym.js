/**
 * Synonym (유의어 / vocabulary) 글 추가 (+ slug SEO)
 *
 * - slug·metaDescription → /english-synonym/{slug}/ 정적 페이지 + sitemap
 * - 글마다 password를 다르게 적으면 다른 유의어는 유지되고, 같은 slug만 교체됨
 * 사용법: 백엔드 서버 실행 후 → node scripts/seed-synonym.js
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

function buildSynonymMessage({ words, youtube }) {
  const body = words.map(wordHtml).join('\n\n');
  const yt = youtube
    ? `\n<p><strong>유튜브로 보기</strong><br>${youtube}</p>`
    : '';
  return `\n${body}\n\n${summaryHtml(words)}${yt}\n`;
}



const fortitudeSet = [
  {
  en: 'fortitude',
  pron: '포터튜드',
  ipa: '/ˈfɔːrtɪtuːd/',
  meaning: '불굴의 용기, 강인함',
  short: '불굴의 용기',
  enExample: 'He will need fortitude for the brawls to come, against Conservative leader Pierre Poilievre and Mr Trump.',
  koExample: '보수당 지도자 피에르 폴리에브르와 트럼프에 대항하기 위해 그는 다가올 싸움에 필요한 불굴의 용기가 필요할 것이다.'
  },
  {
  en: 'perseverance',
  pron: '퍼서비어런스',
  ipa: '/ˌpɜːrsəˈvɪrəns/',
  meaning: '인내, 끈기',
  short: '인내',
  enExample: 'They showed great perseverance in the face of difficulty.',
  koExample: '그들은 어려움 앞에서 위대한 인내심을 보여주었다.'
  },
  {
  en: 'stalwart',
  pron: '스톨워트',
  ipa: '/ˈstɔːlwərt/',
  meaning: '충실한, 굳건한',
  short: '굳건한',
  enExample: 'Many ordinary Israelis revere Mr Trump as their country\'s stalwart friend.',
  koExample: '많은 이스라엘 국민들은 트럼프를 자신들 나라의 굳건한 친구로 숭배한다.'
  },
  {
  en: 'formidable',
  pron: '포미더블',
  ipa: '/ˈfɔːrmɪdəbəl/',
  meaning: '만만치 않은, 엄청난',
  short: '만만치 않은',
  enExample: 'Absorbing this labour force is a formidable economic challenge.',
  koExample: '이 노동력을 흡수하는 것은 엄청난 경제적 과제이다.'
  },
  {
  en: 'homage',
  pron: '하미지',
  ipa: '/ˈhɑːmɪdʒ/',
  meaning: '경의, 찬사',
  short: '경의',
  enExample: 'The state\'s inability to remove such open homage to illegal organisations made public its weakness.',
  koExample: '국가가 불법 조직에 대한 이러한 공개적인 경의를 제거하지 못한 것은 그들의 약점을 드러냈다.'
  },
  {
  en: 'grit',
  pron: '그릿',
  ipa: '/ɡrɪt/',
  meaning: '투지, 끈기, 강인함',
  short: '투지',
  enExample: 'We have the grit and the sisu to chart the path ahead.',
  koExample: '우리는 앞으로의 길을 개척할 투지와 강인함을 가지고 있다.'
  }
  ];

  const posts = [
  {
  title: 'fortitude 불굴의 용기 연관 단어 정리',
  slug: 'fortitude-related-words',
  metaDescription:
  'fortitude(불굴의 용기), perseverance(인내), stalwart(굳건한), formidable(만만치 않은), homage(경의), grit(투지) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  message: buildSynonymMessage({
  words: fortitudeSet,
  youtube: 'https://youtube.com/shorts/N3uIDgXIEj4'
  }),
  nickname: 'admin',
  password: 'seed_synonym_fortitude-related-words'
  }
  ];



async function seed() {
  console.log('Synonym 글 추가 중...', API_BASE);

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    try {
      const listRes = await fetch(`${API_BASE}/vocabulary`);
      const listData = await listRes.json();
      const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
      const matches = entries.filter((entry) =>
        entry?._id && (entry.slug === post.slug || entry.title === post.title)
      );

      let deleted = 0;
      for (const entry of matches) {
        const delRes = await fetch(`${API_BASE}/vocabulary/deletepost`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: entry._id, password: post.password }),
        });
        if (delRes.ok) deleted++;
      }
      if (deleted > 0) console.log(`  같은 slug/제목 기존 글 ${deleted}개 교체`);

      const res = await fetch(`${API_BASE}/vocabulary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`  ${i + 1}. "${post.title}" 추가됨`);
        if (post.slug) console.log(`     slug: ${post.slug}`);
        if (post.slug && post.metaDescription) {
          const seo = applySeoAfterUpload('english-synonym', {
            title: post.title,
            slug: post.slug,
            metaDescription: post.metaDescription,
            datePublished: toIsoDateOnly(),
          });
          if (seo?.seoPath) console.log(`     SEO page: ${seo.seoPath}`);
          if (seo?.url) console.log(`     URL: ${seo.url}`);
          else console.log(`     URL: ${SITE_ORIGIN}/english-synonym/${encodeURIComponent(post.slug)}/`);
        }
      } else console.log(`  ${i + 1}. 실패:`, data.error || res.status);
    } catch (e) {
      console.log(`  ${i + 1}. 오류:`, e.message);
    }
  }
  console.log('완료.');
}

seed();
