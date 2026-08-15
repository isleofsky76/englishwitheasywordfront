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




const invincibleSet = [
  {
  en: 'indomitable',
  pron: '인다머터블',
  ipa: '/ɪnˈdɑːmɪtəbəl/',
  meaning: '불굴의, 꺾이지 않는',
  short: '불굴의',
  enExample: 'The indomitable frontier spirit that drives America.',
  koExample: '미국을 움직이는 불굴의 개척 정신.'
  },
  {
  en: 'invincible',
  pron: '인빈서블',
  ipa: '/ɪnˈvɪnsəbəl/',
  meaning: '천하무적의, 아무도 꺾을 수 없는',
  short: '천하무적의',
  enExample: 'The traditional friendship between China and North Korea is always invincible.',
  koExample: '중국과 북한 사이의 전통적인 우정은 언제나 무적이다.'
  },
  {
  en: 'impregnable',
  pron: '임프레그너블',
  ipa: '/ɪmˈpreɡnəbəl/',
  meaning: '난공불락의, 뚫을 수 없는',
  short: '난공불락의',
  enExample: 'The fortress was impregnable.',
  koExample: '그 요새는 난공불락이었다.'
  },
  {
  en: 'inexorable',
  pron: '이넥서러블',
  ipa: '/ɪnˈeksərəbəl/',
  meaning: '멈출 수 없는, 거침없는',
  short: '멈출 수 없는',
  enExample: 'The never-married rate began an inexorable rise, quadrupling to 25% by 2020.',
  koExample: '평생 미혼율은 멈출 수 없는 상승을 시작했고, 2020년까지 25%로 네 배가 됐다.'
  },
  {
  en: 'unassailable',
  pron: '어너세일러블',
  ipa: '/ˌʌnəˈseɪləbəl/',
  meaning: '난공불락의, 흔들 수 없는',
  short: '흔들 수 없는',
  enExample: 'The party now has an unassailable lead.',
  koExample: '그 정당은 이제 따라잡기 힘든 확고한 선두를 가지고 있다.'
  }
  ];
  
  const posts = [
  {
  title: 'indomitable 불굴의 연관 단어 정리',
  slug: 'indomitable-related-words',
  metaDescription:
  'indomitable(불굴의), invincible(천하무적), impregnable(난공불락), inexorable(멈출 수 없는), unassailable(흔들 수 없는) 뜻·발음·예문을 정리한 유의어 학습입니다.',
  message: buildSynonymMessage({
  words: invincibleSet,
  youtube: 'https://youtube.com/shorts/TVwodMKmkSQ'
  }),
  nickname: 'admin',
  password: 'seed_synonym_indomitable-related-words'
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
