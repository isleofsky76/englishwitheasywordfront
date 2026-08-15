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




const coalesceSet = [
  {
  en: 'coalesce',
  pron: '코얼레스',
  ipa: '/ˌkoʊəˈles/',
  meaning: '합치다, 합체하다',
  short: '합치다',
  enExample: 'Viral trends coalesce around certain titles.',
  koExample: '바이럴 트렌드는 특정 제목들 주위에 모여든다.'
  },
  {
  en: 'amalgamate',
  pron: '어맬거메이트',
  ipa: '/əˈmælɡəmeɪt/',
  meaning: '합병하다, 통합하다',
  short: '통합하다',
  enExample: 'Something similar might help amalgamate knowledge from the AI labs, research groups and foreign bodies such as AISI.',
  koExample: '유사한 것이 AI 랩, 연구 그룹 및 AISI 같은 외부 기관의 지식을 통합하는 데 도움이 될 수 있다.'
  },
  {
  en: 'fuse',
  pron: '퓨즈',
  ipa: '/fjuːz/',
  meaning: '융합하다, 결합되다',
  short: '융합하다',
  enExample: 'Sometimes mitochondria fuse together into large interconnected networks.',
  koExample: '때로 미토콘드리아는 함께 융합하여 크고 상호연결된 네트워크를 형성한다.'
  },
  {
  en: 'merge',
  pron: '머지',
  ipa: '/mɜːrdʒ/',
  meaning: '합병하다, 합쳐지다',
  short: '합병하다',
  enExample: 'The banks are set to merge next year.',
  koExample: '그 은행들은 내년에 합병할 예정이다.'
  },
  {
  en: 'coalition',
  pron: '코얼리션',
  ipa: '/ˌkoʊəˈlɪʃən/',
  meaning: '연합, 연립',
  short: '연합',
  enExample: 'Three of the six global soccer confederations formalized their coalition by signing an open letter that called for change at the top of FIFA.',
  koExample: '전 세계 6개 축구 연맹 중 3개가 FIFA 최고층의 변화를 요구하는 공개 편지에 서명하여 연합을 공식화했다.'
  },
  {
  en: 'blend',
  pron: '블렌드',
  ipa: '/blend/',
  meaning: '섞이다, 조화를 이루다',
  short: '섞이다',
  enExample: 'We must all blend together and get mixed up after a while.',
  koExample: '우리는 모두 함께 어우러지고 시간이 지나면 섞여야 한다.'
  }
  ];

  const posts = [
  {
  title: 'coalesce 합치다 유의어 정리',
  slug: 'coalesce-synonyms',
  metaDescription:
  'coalesce(합치다), amalgamate(통합하다), fuse(융합하다), merge(합병하다), coalition(연합), blend(섞이다) 뜻·발음·예문을 정리한 유의어 학습입니다.',
  message: buildSynonymMessage({
  words: coalesceSet,
  youtube: 'https://youtube.com/shorts/baedHLPW8zE'
  }),
  nickname: 'admin',
  password: 'seed_synonym_coalesce-synonyms'
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
