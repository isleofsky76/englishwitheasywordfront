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


const lungeSet = [
  {
  en: 'lunge',
  pron: '런지',
  ipa: '/lʌndʒ/',
  meaning: '갑자기 치닫다, 돌진하다',
  short: '돌진하다',
  enExample: 'He now professes to lunge from exhilaration to terror within a single day.',
  koExample: '그는 이제 하루 안에 흥분에서 공포로 급격히 달려든다고 고백합니다.'
  },
  {
  en: 'thrust',
  pron: '쓰러스트',
  ipa: '/θrʌst/',
  meaning: '억지로 …시키다, 거칠게 밀다',
  short: '떠맡기다',
  enExample: 'The education ministry has been thrust upon a man already responsible for renewable energy.',
  koExample: '교육부가 이미 재생에너지를 담당하고 있는 한 남자에게 떠맡겨졌습니다.'
  },
  {
  en: 'pounce',
  pron: '파운스',
  ipa: '/paʊns/',
  meaning: '달려들다, 즉각 덮치다',
  short: '달려들다',
  enExample: 'Twitchy censors are quick to pounce on works that fail to promote "positive energy".',
  koExample: '초조한 검열관들은 "긍정적 에너지"를 홍보하지 못하는 작품에 즉각 덮쳐듭니다.'
  },
  {
  en: 'lurch',
  pron: '러치',
  ipa: '/lɜːrtʃ/',
  meaning: '급격한 변화, 갑작스러운 쏠림',
  short: '급격한 쏠림',
  enExample: 'Rightward lurch.',
  koExample: '오른쪽으로의 급격한 쏠림.'
  },
  {
  en: 'nudge',
  pron: '너지',
  ipa: '/nʌdʒ/',
  meaning: '살짝 유도하다, 부추기다',
  short: '살짝 유도하다',
  enExample: 'Nudge people into doing everything from saving to donating.',
  koExample: '사람들을 저축부터 기부까지 모든 것을 하도록 살짝 유도하다.'
  }
  ];

  const posts = [
  {
  title: 'lunge 돌진하다 연관 단어 정리',
  slug: 'lunge-related-words',
  metaDescription:
  'lunge(돌진하다), thrust(떠맡기다·밀다), pounce(달려들다), lurch(급격한 쏠림), nudge(살짝 유도하다) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  message: buildSynonymMessage({
  words: lungeSet,
  youtube: 'https://youtube.com/shorts/xGfOus3ULcg'
  }),
  nickname: 'admin',
  password: 'seed_synonym_lunge-related-words'
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
