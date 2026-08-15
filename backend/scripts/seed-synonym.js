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


const contradictionSet = [
  {
  en: 'contradiction',
  pron: '칸트러딕션',
  ipa: '/ˌkɑːntrəˈdɪkʃən/',
  meaning: '모순, 상충',
  short: '모순',
  enExample: 'There is a contradiction between the two sets of figures.',
  koExample: '두 수치 세트 사이에는 모순이 있다.'
  },
  {
  en: 'incongruity',
  pron: '인컨그루어티',
  ipa: '/ˌɪnkənˈɡruːəti/',
  meaning: '부조화, 불일치',
  short: '부조화',
  enExample: 'There are several reasons for the incongruity.',
  koExample: '그 부조화에는 여러 가지 이유가 있다.'
  },
  {
  en: 'oxymoron',
  pron: '악시모론',
  ipa: '/ˌɑːksɪˈmɔːrɑːn/',
  meaning: '모순어법, 모순된 표현',
  short: '모순어법',
  enExample: 'Mindset means reconciling John Maynard Keynes\'s social model and Joseph Schumpeter\'s creative destruction. This is not an oxymoron.',
  koExample: '마인드셋은 존 메이너드 케인즈의 사회 모델과 조셉 슘페터의 창조적 파괴를 조화시키는 것을 의미한다. 이것은 모순어법이 아니다.'
  },
  {
  en: 'hyperbole',
  pron: '하이퍼벌리',
  ipa: '/haɪˈpɜːrbəli/',
  meaning: '과장, 과장법',
  short: '과장',
  enExample: 'HUD dismissed that claim as \'an exercise in rhetoric, speculation, and dramatic hyperbole, not law.\'',
  koExample: '주택도시개발부는 그 주장을 \'수사학, 추측, 극적인 과장의 연습일 뿐 법이 아니다\'고 일축했다.'
  },
  {
  en: 'euphemism',
  pron: '유퍼미즘',
  ipa: '/ˈjuːfəmɪzəm/',
  meaning: '완곡어법, 완곡한 표현',
  short: '완곡어법',
  enExample: 'If Orwell were writing today, he would find plenty of euphemisms to complain about.',
  koExample: '오웰이 오늘날 글을 쓰고 있다면 불평할 완곡한 표현이 많이 있을 것이다.'
  },
  {
  en: 'analogy',
  pron: '어낼러지',
  ipa: '/əˈnælədʒi/',
  meaning: '비유, 유추',
  short: '비유',
  enExample: 'A swimming pool might be a reasonable analogy for the money supply.',
  koExample: '수영장은 통화 공급에 대한 합리적인 비유가 될 수 있다.'
  }
  ];

  const posts = [
  {
  title: 'contradiction 모순 연관 단어 정리',
  slug: 'contradiction-related-words',
  metaDescription:
  'contradiction(모순), incongruity(부조화), oxymoron(모순어법), hyperbole(과장), euphemism(완곡어법), analogy(비유) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  message: buildSynonymMessage({
  words: contradictionSet,
  youtube: 'https://youtube.com/shorts/DgnZ_E_IXog'
  }),
  nickname: 'admin',
  password: 'seed_synonym_contradiction-related-words'
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
