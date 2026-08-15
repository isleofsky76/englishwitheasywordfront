/**
 * Synonym (유의어 / vocabulary) 글 추가 (+ slug SEO)
 *
 * - slug·metaDescription → /english-synonym/{slug}/ 정적 페이지 + sitemap
 * 사용법: 백엔드 서버 실행 후 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

const password = 'password_seed_joke_5523';
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

const brookSet = [
  {
  en: 'brook',
  pron: '브룩',
  ipa: '/brʊk/',
  meaning: '용납하다, 참다',
  short: '용납하다',
  enExample: 'An absence of questions may indicate a culture that does not brook them.',
  koExample: '질문이 없는 것은 그런 질문을 용납하지 않는 문화를 의미할 수 있다.'
  },
  {
  en: 'tolerate',
  pron: '탈러레이트',
  ipa: '/ˈtɑːləreɪt/',
  meaning: '용인하다, 참다',
  short: '용인하다',
  enExample: 'Shipowners would probably tolerate transit fees so long as they did not fall foul of sanctions.',
  koExample: '선주들은 제재를 위반하지 않는 한 아마 통행료를 감수할 것이다.'
  },
  {
  en: 'abide',
  pron: '어바이드',
  ipa: '/əˈbaɪd/',
  meaning: '준수하다, 따르다',
  short: '준수하다',
  enExample: 'Millions of people visit the Lake District every year, but not all of them abide by the Countryside Code\'s plea to "leave no trace".',
  koExample: '매년 수백만 명이 Lake District를 방문하지만, 그들 모두가 "흔적을 남기지 말라"는 Countryside Code의 요청을 따르는 것은 아니다.'
  },
  {
  en: 'stomach',
  pron: '스터먹',
  ipa: '/ˈstʌmək/',
  meaning: '참다, 견디다',
  short: '견디다',
  enExample: 'I can\'t stomach violent films.',
  koExample: '나는 도저히 폭력적인 영화를 견딜 수 없다.'
  },
  {
  en: 'countenance',
  pron: '카운터넌스',
  ipa: '/ˈkaʊntənəns/',
  meaning: '찬성하다, 허용하다',
  short: '허용하다',
  enExample: 'The committee refused to countenance his proposals.',
  koExample: '위원회는 그의 제안들을 받아들이기를 거부했다.'
  }
  ];
  
  const posts = [
  {
  title: 'brook 용납하다 유의어 정리',
  slug: 'brook-synonyms',
  metaDescription:
  'brook(용납하다), tolerate(용인하다), abide(준수하다), stomach(견디다), countenance(허용하다) 뜻·발음·예문을 정리한 유의어 학습입니다.',
  message: buildSynonymMessage({
  words: brookSet,
  youtube: 'https://youtube.com/shorts/FqxeoDF7lbU'
  }),
  nickname: 'admin',
  password
  }
  ];


async function seed() {
  console.log('Synonym 글 추가 중...', API_BASE);
  try {
    // 같은 비밀번호로 작성된 기존 유의어 글 선삭제
    const listRes = await fetch(`${API_BASE}/vocabulary`);
    const listData = await listRes.json();
    const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);

    let deleted = 0;
    for (const entry of entries) {
      if (!entry?._id) continue;
      try {
        const delRes = await fetch(`${API_BASE}/vocabulary/deletepost`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: entry._id, password }),
        });
        if (delRes.ok) deleted++;
      } catch (_) {
        // 개별 삭제 실패는 무시하고 계속 진행
      }
    }
    if (deleted > 0) {
      console.log(`  기존 글 ${deleted}개 삭제됨(동일 비밀번호).`);
    }
  } catch (e) {
    console.log('  기존 글 조회/삭제 중 오류:', e.message);
  }

  for (let i = 0; i < posts.length; i++) {
    try {
      const res = await fetch(`${API_BASE}/vocabulary`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(posts[i]),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`  ${i + 1}. "${posts[i].title}" 추가됨`);
        if (posts[i].slug) console.log(`     slug: ${posts[i].slug}`);
        if (posts[i].slug && posts[i].metaDescription) {
          const seo = applySeoAfterUpload('english-synonym', {
            title: posts[i].title,
            slug: posts[i].slug,
            metaDescription: posts[i].metaDescription,
            datePublished: toIsoDateOnly(),
          });
          if (seo?.seoPath) console.log(`     SEO page: ${seo.seoPath}`);
          if (seo?.url) console.log(`     URL: ${seo.url}`);
          else console.log(`     URL: ${SITE_ORIGIN}/english-synonym/${encodeURIComponent(posts[i].slug)}/`);
        }
      } else console.log(`  ${i + 1}. 실패:`, data.error || res.status);
    } catch (e) {
      console.log(`  ${i + 1}. 오류:`, e.message);
    }
  }
  console.log('완료.');
}

seed();
