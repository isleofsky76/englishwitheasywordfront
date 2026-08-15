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



const imbueSet = [
  {
  en: 'imbue',
  pron: '임뷰',
  ipa: '/ɪmˈbjuː/',
  meaning: '불어넣다, 스며들게 하다',
  short: '불어넣다',
  enExample: 'His most impressive talent is his ability to imbue staff with a sense of mission.',
  koExample: '그의 가장 인상적인 재능은 직원들에게 사명감을 불어넣는 능력이다.'
  },
  {
  en: 'infuse',
  pron: '인퓨즈',
  ipa: '/ɪnˈfjuːz/',
  meaning: '스며들게 하다, 가득 채우다',
  short: '스며들게 하다',
  enExample: 'Politics infuses all aspects of our lives.',
  koExample: '정치는 우리 삶의 모든 측면에 스며든다.'
  },
  {
  en: 'immerse',
  pron: '이머스',
  ipa: '/ɪˈmɜːrs/',
  meaning: '몰입시키다, 푹 빠지게 하다',
  short: '몰입시키다',
  enExample: 'It will immerse you in the action, put you in the arena or the stadium.',
  koExample: '그것은 당신을 현장 속에 완전히 몰입시키고 경기장 한가운데 있는 듯하게 만들 것이다.'
  },
  {
  en: 'instill',
  pron: '인스틸',
  ipa: '/ɪnˈstɪl/',
  meaning: '심어주다, 주입하다',
  short: '심어주다',
  enExample: 'At the very least, the president of the United States should instill hope in young children.',
  koExample: '최소한, 미국 대통령은 어린아이들에게 희망을 심어줘야 한다.'
  },
  {
  en: 'impart',
  pron: '임파트',
  ipa: '/ɪmˈpɑːrt/',
  meaning: '전하다, 나누어 주다',
  short: '전하다',
  enExample: 'You can impart some practical, real-world knowledge on this subject.',
  koExample: '당신은 이 주제에 관해 실용적인 현실 세계의 지식을 전할 수 있다.'
  },
  {
  en: 'indoctrinate',
  pron: '인닥트러네이트',
  ipa: '/ɪnˈdɑːktrəneɪt/',
  meaning: '주입시키다, 세뇌하다',
  short: '세뇌하다',
  enExample: 'The key to success is to indoctrinate people with the right attitudes to speed at a very early age.',
  koExample: '성공의 핵심은 아주 어린 나이에 사람들에게 속도에 대한 올바른 태도를 주입하는 것이다.'
  }
  ];

  const posts = [
  {
  title: 'imbue 불어넣다 유의어 정리',
  slug: 'imbue-synonyms',
  metaDescription:
  'imbue(불어넣다), infuse(스며들게 하다), immerse(몰입시키다), instill(심어주다), impart(전하다), indoctrinate(주입시키다·세뇌하다) 뜻·발음·예문을 정리한 유의어 학습입니다.',
  message: buildSynonymMessage({
  words: imbueSet,
  youtube: 'https://youtube.com/shorts/ArJFVz0QUI8'
  }),
  nickname: 'admin',
  password: 'seed_synonym_imbue-synonyms'
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
