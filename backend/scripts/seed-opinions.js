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

function buildOpinionMessage({ words, youtube }) {
  const body = words.map(wordHtml).join('\n\n');
  const yt = youtube
    ? `\n<p><strong>유튜브로 보기</strong><br>${youtube}</p>`
    : '';
  return `\n${body}\n\n${summaryHtml(words)}${yt}\n`;
}

const opinionSet = [
  {
    en: 'raucous',
    pron: '로커스',
    ipa: '/ˈrɔːkəs/',
    meaning: '소란스러운, 떠들썩한',
    short: '소란스러운',
    enExample: 'The atmosphere at his home was wild, fun, and raucous.',
    koExample: '그의 집 분위기는 난장판 같고, 신나고, 시끄러웠습니다.'
  },
  {
    en: 'exuberant',
    pron: '이그주버런트',
    ipa: '/ɪɡˈzuːbərənt/',
    meaning: '활기 넘치는, 생기가 넘치는',
    short: '활기 넘치는',
    enExample: 'As an exuberant father, he was full of energy and loved nature.',
    koExample: '활기 넘치는 아버지로서 그는 에너지가 넘쳤고 자연을 사랑했습니다.'
  },
  {
    en: 'jubilant',
    pron: '주벌런트',
    ipa: '/ˈdʒuːbɪlənt/',
    meaning: '환희에 찬, 크게 기뻐하는',
    short: '환희에 찬',
    enExample: 'The telegram that arrived at his home was jubilant and happy.',
    koExample: '그의 집에 도착한 전보는 환희에 차 있고 기쁜 내용이었습니다.'
  },
  {
    en: 'mar',
    pron: '마르',
    ipa: '/mɑːr/',
    meaning: '망치다, 손상시키다',
    short: '망치다',
    enExample: 'Sadly, the joyful event was soon marred by bad news.',
    koExample: '안타깝게도 그 즐거운 행사는 나쁜 소식으로 곧 망쳐졌습니다.'
  },
  {
    en: 'distraught',
    pron: '디스트롯',
    ipa: '/dɪˈstrɔːt/',
    meaning: '몹시 심란한, 극도의 불안·슬픔에 빠진',
    short: '몹시 심란한',
    enExample: 'Feeling deeply distraught, he decided to alter his future plans.',
    koExample: '몹시 심란함을 느낀 그는 자신의 미래 계획을 바꾸기로 결정했습니다.'
  },
  {
    en: 'retrograde',
    pron: '레트러그레이드',
    ipa: '/ˈretrəɡreɪd/',
    meaning: '퇴보적인, 진보에 역행하는',
    short: '퇴보적인',
    enExample: 'He viewed their civilization as retrograde rather than advanced.',
    koExample: '그는 그들의 문명을 발전된 것이 아니라 퇴보적인 것으로 보았습니다.'
  },
  {
    en: 'conspicuous',
    pron: '컨스피큐어스',
    ipa: '/kənˈspɪkjuəs/',
    meaning: '눈에 띄는, 두드러진',
    short: '눈에 띄는',
    enExample: 'Roosevelt was one of the few conspicuous heroes of the war.',
    koExample: '루스벨트는 그 전쟁에서 몇 안 되는 눈에 띄는 영웅 중 한 명이었습니다.'
  },
  {
    en: 'gallantry',
    pron: '갤런트리',
    ipa: '/ˈɡæləntri/',
    meaning: '용맹, 용기와 명예를 동반한 행동',
    short: '용맹',
    enExample: 'The public highly praised Roosevelt for his gallantry in battle.',
    koExample: '대중은 전투에서 보여준 루스벨트의 용맹함을 높이 평가했습니다.'
  }
];

const posts = [
  {
    title: 'raucous 소란스러운 연관 단어 정리',
    slug: 'raucous-related-words',
    metaDescription:
      'raucous(소란스러운), exuberant(활기 넘치는), jubilant(환희에 찬), mar(망치다), distraught(몹시 심란한), retrograde(퇴보적인), conspicuous(눈에 띄는), gallantry(용맹) 뜻·발음·예문을 정리한 오피니언 어휘 학습입니다.',
    message: buildOpinionMessage({
      words: opinionSet,
      youtube: 'https://www.youtube.com/watch?v=7vNOLEyGggo&list=PLA-OHa20ZsGA&index=8'
    }),
    nickname: 'admin',
    password: 'seed_opinions_raucous-related-words'
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
