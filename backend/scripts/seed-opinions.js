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

function escapeHtmlAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;');
}

function buildRelatedLinksHtml(youtube, source) {
  const lines = [];
  if (youtube) {
    lines.push(
      `<p><a href="${escapeHtmlAttr(youtube)}" target="_blank" rel="noopener noreferrer">📺 유튜브 보기</a></p>`
    );
  }
  if (source) {
    lines.push(
      `<p><a href="${escapeHtmlAttr(source)}" target="_blank" rel="noopener noreferrer">📰 신문 보기</a></p>`
    );
  }
  if (!lines.length) return '';
  return `<div>\n${lines.join('\n')}\n</div>`;
}

function buildOpinionMessage({ words, youtube, source }) {
  const body = words.map(wordHtml).join('\n\n');
  const links = buildRelatedLinksHtml(youtube, source);
  return `\n${body}\n\n${summaryHtml(words)}${links ? `\n${links}` : ''}\n`;
}


const opinionSet = [
  {
    en: 'purge',
    pron: '퍼지',
    ipa: '/pɜːrdʒ/',
    meaning: '제거하다, 숙청하다',
    short: '제거하다',
    enExample:
      'One of the better causes of the second Trump Administration is its effort to purge the progressive political takeover of America’s national cultural institutions.',
    koExample:
      '2기 트럼프 행정부의 더 나은 명분 중 하나는(causes) 미국의 국립 문화 기관들을(national cultural institutions) 진보 세력이 정치적으로 장악한 것을(progressive political takeover) 제거하려는(purge) 노력입니다.'
  },
  
  {
    en: 'pejorative',
    pron: '퍼조러티브',
    ipa: '/pɪˈdʒɔːrətɪv/',
    meaning: '경멸적인, 비난투의',
    short: '경멸적인',
    enExample:
      'Nationalism? That’s a needlessly pejorative edge. How about patriotism?',
    koExample:
      '민족주의라고요(Nationalism)? 그것은 불필요하게(needlessly) 경멸적이고 비난조의 뉘앙스입니다(pejorative edge). 애국심은 어떤가요(patriotism)?'
  },
  {
    en: 'favor',
    pron: '페이버',
    ipa: '/ˈfeɪvər/',
    meaning: '지지하다, 선호하다',
    short: '지지하다',
    enExample:
      'Speaking at Brown University in 2016, the report says, Smithsonian Under Secretary for Museums and Culture Kevin Gover said he favors replacing Columbus Day with Indigenous Peoples’ Day, because Christopher Columbus was a “slaver” and “killer.”',
    koExample:
      '보고서에 따르면(the report says), 케빈 고버 스미스소니언 박물관·문화 담당 차관은 2016년 브라운대학교 연설에서(Speaking at Brown University) 크리스토퍼 콜럼버스가 노예상이자 살인자였기 때문에(a “slaver” and “killer”) 콜럼버스의 날을 원주민의 날로 대체하는 것을(replacing Columbus Day with Indigenous Peoples’ Day) 지지한다고(favors) 말했습니다.'
  },
  {
    en: 'plaything',
    pron: '플레이씽',
    ipa: '/ˈpleɪθɪŋ/',
    meaning: '장난감, 놀잇감, 마음대로 이용하는 대상',
    short: '놀잇감',
    enExample:
      'It isn’t the plaything of today’s dominant progressive academics.',
    koExample:
      '그곳은 오늘날 주류를 이루는 진보 학자들의(today’s dominant progressive academics) 전유물이나 놀잇감이 아닙니다(isn’t the plaything of).'
  },
  {
    en: 'whitewash',
    pron: '화이트워시',
    ipa: '/ˈwaɪtwɑːʃ/',
    meaning: '잘못을 은폐하다, 미화하다, 눈가림하다',
    short: '은폐하다',
    enExample:
      'The Trump Administration’s suggestion that the museum offer a less biased approach to American history isn’t an attempt to whitewash the country’s complexity or its difficult chapters.',
    koExample:
      '박물관이 미국 역사를 덜 편향된 방식으로 다루어야 한다는(a less biased approach) 트럼프 행정부의 제안은 국가의 복잡성이나 어두운 역사를(the country’s complexity or its difficult chapters) 은폐하거나 미화하려는 시도가 아닙니다(isn’t an attempt to whitewash).'
  },
  {
    en: 'whitewash',
    pron: '화이트워시',
    ipa: '/ˈwaɪtwɑːʃ/',
    meaning: '눈가림, 은폐, 미화',
    short: '눈가림',
    enExample:
      'That’s not a whitewash of America’s complicated history. It’s an embrace of it.',
    koExample:
      '그것은 미국의 복잡한 역사를(America’s complicated history) 눈가림하거나 은폐하는 것이 아닙니다(not a whitewash). 오히려 그 역사를 온전히 받아들이는 것입니다(an embrace of it).'
  }
];

const posts = [
  {
    title: '스미스소니언은 어떻게 미국의 큰 줄거리(본질적 이야기)를 놓쳐버렸는가?',
    slug: 'purge-related-words',
    metaDescription:
      'purge(제거하다), inheritance(유산), pejorative(경멸적인), downplay(경시하다), favor(지지하다), acknowledgement(인정), foundational(근간이 되는), bend one’s knee to(굴복하다), patriarchal(가부장적인), plaything(놀잇감), whitewash(은폐하다) 뜻·발음·예문을 정리한 오피니언 어휘 학습입니다.',
    message: buildOpinionMessage({
      words: opinionSet,
      youtube: 'https://www.youtube.com/watch?v=Z4euF9AFW9E&list=PLA-OHa20ZsGA',
      source:
        'https://www.wsj.com/opinion/how-the-smithsonian-lost-americas-plot-622709db?mod=opinion_trendingnow_article_pos2',
    }),
    nickname: 'admin',
    password: 'seed_opinions_purge-related-words'
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
