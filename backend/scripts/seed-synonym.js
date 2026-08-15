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


const glibSet = [
  {
  en: 'glib',
  pron: '글립',
  ipa: '/ɡlɪb/',
  meaning: '말만 번지르르한, 피상적으로 그럴듯한',
  short: '말만 번지르르한',
  enExample: 'This is rather glib.',
  koExample: '이것은 상당히 말만 번지르르하다.'
  },
  {
  en: 'gregarious',
  pron: '그리게리어스',
  ipa: '/ɡrɪˈɡeriəs/',
  meaning: '사교적인, 사람들과 어울리기 좋아하는',
  short: '사교적인',
  enExample: 'A gregarious person has a 50% better chance of surviving than a lonely one.',
  koExample: '사교적인 사람은 외로운 사람보다 생존 확률이 50% 더 높다.'
  },
  {
  en: 'garrulous',
  pron: '개럴러스',
  ipa: '/ˈɡærələs/',
  meaning: '수다스러운, 말이 많은',
  short: '수다스러운',
  enExample: 'The crowd grew garrulous before the speaker arrived.',
  koExample: '연사가 도착하기 전에 군중이 수다스러워졌다.'
  },
  {
  en: 'laconic',
  pron: '러카닉',
  ipa: '/ləˈkɑːnɪk/',
  meaning: '말수가 적은, 간결한',
  short: '말수가 적은',
  enExample: 'True to form, the artist was playfully laconic at the show\'s press conference.',
  koExample: '평소처럼 그 예술가는 전시 기자회견에서 재미있게 말수가 적었다.'
  },
  {
  en: 'facile',
  pron: '패설',
  ipa: '/ˈfæsəl/',
  meaning: '피상적인, 지나치게 손쉬운',
  short: '피상적인',
  enExample: 'Slick, facile and overproduced.',
  koExample: '매끄럽지만 피상적이고 과도하게 제작되었다.'
  },
  {
  en: 'gratuitous',
  pron: '그러투어터스',
  ipa: '/ɡrəˈtuːətəs/',
  meaning: '불필요한, 쓸데없이 과도한',
  short: '불필요한',
  enExample: 'Gratuitous violence on television.',
  koExample: '텔레비전의 불필요한 폭력.'
  },
  {
  en: 'goad',
  pron: '고우드',
  ipa: '/ɡoʊd/',
  meaning: '부추기다, 도발하다',
  short: '부추기다',
  enExample: 'They accused such allies as Saudi Arabia of trying to goad America into fighting Iran on the Arab world\'s behalf.',
  koExample: '그들은 사우디아라비아와 같은 동맹국들이 아랍 세계를 대신해 미국을 이란과의 전쟁으로 부추기려 했다고 비난했다.'
  }
  ];

  const posts = [
  {
  title: 'glib 말만 번지르르한 연관 단어 정리',
  slug: 'glib-related-words',
  metaDescription:
  'glib(말만 번지르르한), gregarious(사교적인), garrulous(수다스러운), laconic(말수가 적은), facile(피상적인), gratuitous(불필요한), goad(부추기다) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  message: buildSynonymMessage({
  words: glibSet,
  youtube: 'https://youtube.com/shorts/lL6H4OptGDE'
  }),
  nickname: 'admin',
  password: 'seed_synonym_glib-related-words'
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
