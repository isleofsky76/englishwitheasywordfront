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



const fomentSet = [
  {
  en: 'foment',
  pron: '포멘트',
  ipa: '/foʊˈment/',
  meaning: '부추기다, 조장하다',
  short: '조장하다',
  enExample: 'Their purpose is to foment distrust in America.',
  koExample: '그들의 목적은 미국에 대한 불신을 부추기는 것입니다.'
  },
  {
  en: 'incite',
  pron: '인사이트',
  ipa: '/ɪnˈsaɪt/',
  meaning: '선동하다, 부추기다',
  short: '선동하다',
  enExample: 'Menacing slogans and banners that could incite violence.',
  koExample: '폭력을 선동할 수 있는 위협적인 표어와 깃발.'
  },
  {
  en: 'instigate',
  pron: '인스티게이트',
  ipa: '/ˈɪnstɪɡeɪt/',
  meaning: '착수하게 하다, 부추기다, 선동하다',
  short: '선동하다',
  enExample: 'They should not be used as a pretext to instigate a trade war.',
  koExample: '그것들이 무역 전쟁을 일으키는 구실로 사용되어서는 안 됩니다.'
  },
  {
  en: 'goad',
  pron: '고우드',
  ipa: '/ɡoʊd/',
  meaning: '부추기다, 몰아붙이다',
  short: '부추기다',
  enExample: 'She goaded her teammates into giving their absolute best.',
  koExample: '그녀는 팀원들을 몰아붙여 최선을 다하게 만들었습니다.'
  },
  {
  en: 'galvanize',
  pron: '갤버나이즈',
  ipa: '/ˈɡælvənaɪz/',
  meaning: '고무하다, 행동하도록 자극하다',
  short: '고무하다',
  enExample: 'He asserts that we all know the power of Art, its power to galvanize, stimulate, rouse, exhilarate, soothe and enlighten.',
  koExample: '그는 미술의 힘, 즉 자극하고, 고무하고, 흥분시키고, 위로하고, 계몽하는 힘을 우리 모두가 안다고 주장합니다.'
  },
  {
  en: 'provoke',
  pron: '프로보우크',
  ipa: '/prəˈvoʊk/',
  meaning: '유발하다, 촉발하다',
  short: '촉발하다',
  enExample: 'Such measures tend to provoke faculty resistance.',
  koExample: '그러한 조치는 교수진의 저항을 촉발하는 경향이 있습니다.'
  }
  ];

  const posts = [
  {
  title: 'foment 부추기다 유의어 정리',
  slug: 'foment-synonyms',
  metaDescription:
  'foment(조장하다), incite(선동하다), instigate(부추기다), goad(몰아붙이다), galvanize(고무하다), provoke(촉발하다) 뜻·발음·예문을 정리한 유의어 학습입니다.',
  message: buildSynonymMessage({
  words: fomentSet,
  youtube: 'https://youtube.com/shorts/cwh2b_h0ggM'
  }),
  nickname: 'admin',
  password: 'seed_synonym_foment-synonyms'
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
