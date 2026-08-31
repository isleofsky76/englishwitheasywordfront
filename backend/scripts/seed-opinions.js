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
      `<p><a href="${escapeHtmlAttr(source)}" target="_blank" rel="noopener noreferrer">📰 기사 출처</a></p>`
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
    en: 'low-key',
    pron: '로우키',
    ipa: '/ˌloʊ ˈkiː/',
    meaning: '절제된, 소박한, 요란하지 않은',
    short: '소박한',
    enExample:
      'These are low-key affairs in someone’s home or a restaurant, not fancy parties or far-flung cruises.',
    koExample:
      '이 모임들은(affairs) 화려한 파티나(fancy parties) 멀리 떠나는 크루즈 여행이 아니라(far-flung cruises), 누군가의 집이나 식당에서 갖는 소박하고 차분한 자리입니다(low-key affairs).'
  },
  {
    en: 'decibel',
    pron: '데서벨',
    ipa: '/ˈdesɪbel/',
    meaning: '데시벨, 소음의 정도',
    short: '소음 정도',
    enExample:
      'We gather in sixes and eights for dinner at places chosen more for their decibels than their desserts.',
    koExample:
      '우리는 여섯 명이나 여덟 명씩 모여(gather in sixes and eights) 저녁을 먹는데, 디저트보다는(their desserts) 소음 정도를 더 고려해(for their decibels) 고른 장소에서 만납니다.'
  },
  {
    en: 'ritualistic',
    pron: '리추얼리스틱',
    ipa: '/ˌrɪtʃuəˈlɪstɪk/',
    meaning: '의식적인, 의례적인, 정해진 절차를 따르는',
    short: '의례적인',
    enExample:
      'Seating is more ritualistic than a state dinner.',
    koExample:
      '자리 배치는(Seating) 국빈 만찬보다(a state dinner) 더 의례적이고 정해진 절차를 따릅니다(more ritualistic).'
  },
  {
    en: 'license',
    pron: '라이선스',
    ipa: '/ˈlaɪsəns/',
    meaning: '자유, 파격, 허가',
    short: '자유',
    enExample:
      'Because we are turning 70 and have license to let loose, we order a single dessert with six forks.',
    koExample:
      '우리는 이제 일흔 살이 되었고(are turning 70) 긴장을 풀고 마음껏 즐길 자유가 있으므로(have license to let loose), 디저트 하나를 시켜(a single dessert) 포크 여섯 개로 나누어 먹습니다(with six forks).'
  },
  {
    en: 'divulge',
    pron: '디벌지',
    ipa: '/daɪˈvʌldʒ/',
    meaning: '비밀이나 사적인 정보를 털어놓다, 밝히다',
    short: '털어놓다',
    enExample:
      'Downsizing and condo strategies are divulged.',
    koExample:
      '집의 규모를 줄이는 방법과(Downsizing) 콘도 장만 전략이(condo strategies) 서로 공유되고 공개됩니다(are divulged).'
  },
  {
    en: 'holy grail',
    pron: '홀리 그레일',
    ipa: '/ˌhoʊli ˈɡreɪl/',
    meaning: '성배, 모두가 간절히 바라는 것',
    short: '최고의 조건',
    enExample:
      'First-floor master bedrooms are the holy grail in hilly Pittsburgh.',
    koExample:
      '언덕이 많은 피츠버그에서는(hilly Pittsburgh) 1층에 있는 안방이(First-floor master bedrooms) 모두가 간절히 바라는 최고의 조건입니다(the holy grail).'
  },
  {
    en: 'grudge',
    pron: '그러지',
    ipa: '/ɡrʌdʒ/',
    meaning: '원한, 앙금, 유감',
    short: '앙금',
    enExample:
      'Our hard drives being full, we can vaguely remember that we had some grudge but not what it was about or who it was against.',
    koExample:
      '우리 머릿속의 하드 드라이브가 꽉 차서(Our hard drives being full), 예전에 어떤 앙금이 있었다는 것은(had some grudge) 어렴풋이 기억하지만(vaguely remember), 그것이 무슨 일 때문이었는지(what it was about), 누구를 향한 것이었는지는(who it was against) 기억하지 못합니다.'
  },
  {
    en: 'gratuitous',
    pron: '그러투어터스',
    ipa: '/ɡrəˈtuːɪtəs/',
    meaning: '불필요한, 쓸데없는, 이유 없이 과한',
    short: '불필요한',
    enExample:
      'I see why parents would name their kid A$AP Rocky, but did they really need the dollar sign? Seems gratuitous.',
    koExample:
      '부모가 아이 이름을 에이셉 라키라고 짓는 이유는 알겠지만(name their kid A$AP Rocky), 정말 달러 기호까지 필요했을까요(need the dollar sign)? 불필요하고 과해 보입니다(Seems gratuitous).'
  },
  {
    en: 'archivist',
    pron: '아커비스트',
    ipa: '/ˈɑːrkɪvɪst/',
    meaning: '기록 보관 담당자, 기록 관리 전문가',
    short: '기록 보관자',
    enExample:
      'A trained art conservator, she is the unofficial archivist for our grade-school class.',
    koExample:
      '전문 교육을 받은 미술품 복원가인 그녀는(A trained art conservator) 우리 초등학교 동창들의(our grade-school class) 비공식 기록 보관자입니다(the unofficial archivist).'
  },
  {
    en: 'unfold',
    pron: '언폴드',
    ipa: '/ʌnˈfoʊld/',
    meaning: '전개되다, 펼쳐지다, 밝혀지다',
    short: '전개되다',
    enExample:
      'Without hesitation, I named everyone but stopped short as I realized that we now knew how many of their life stories unfolded.',
    koExample:
      '나는 망설임 없이(Without hesitation) 모두의 이름을 댔지만(named everyone), 이제는 그들의 인생 이야기가 어떻게 펼쳐졌는지(how their life stories unfolded) 많이 알고 있다는 사실을 깨닫고(as I realized) 순간 말을 멈췄습니다(stopped short).'
  },
  {
    en: 'meander',
    pron: '미앤더',
    ipa: '/miˈændər/',
    meaning: '느긋하게 나아가다, 거닐다, 구불구불 이어지다',
    short: '느긋하게 나아가다',
    enExample:
      'To paraphrase Monty Python, we’re not dead yet, but as we meander through our 70-year events the birth class of ’56 is mainly happy to have made it this far, leading productive and meaningful lives and remembering those whose lives were cut short.',
    koExample:
      '몬티 파이튼의 말을 바꾸어 표현하자면(To paraphrase Monty Python), 우리는 아직 죽지 않았습니다(we’re not dead yet). 칠순 행사들을 느긋하게 하나씩 치러가면서(meander through our 70-year events), 1956년생 동기들은(the birth class of ’56) 생산적이고 의미 있는 삶을 살아왔으며(leading productive and meaningful lives), 일찍 생을 마감한 친구들을 기억하면서(remembering those whose lives were cut short) 지금까지 살아온 것을 기쁘게 여깁니다(happy to have made it this far).'
  },
  {
    en: 'marbles',
    pron: '마블즈',
    ipa: '/ˈmɑːrbəlz/',
    meaning: '이성, 분별력, 온전한 정신',
    short: '온전한 정신',
    enExample:
      'The Hebrew blessing on a birthday is that you should live to 120 (Moses’ age when he died in good shape with all of his marbles).',
    koExample:
      '유대인의 생일 축복은(The Hebrew blessing on a birthday) 120세까지 살라는 것입니다(you should live to 120). 이는 모세가 건강한 몸과(in good shape) 온전한 정신을 유지한 채(with all of his marbles) 세상을 떠났을 때의 나이입니다(Moses’ age when he died).'
  }
];

const posts = [
  {
    title: 'When Your Friends All Turn 70',
    slug: 'low-key-related-words',
    metaDescription:
      'low-key(소박한), decibel(소음 정도), ritualistic(의례적인), license(자유), divulge(털어놓다), holy grail(최고의 조건), grudge(앙금), gratuitous(불필요한), archivist(기록 보관자), unfold(전개되다), meander(느긋하게 나아가다), marbles(온전한 정신) 뜻·발음·예문을 정리한 오피니언 어휘 학습입니다.',
    source:
      'https://www.wsj.com/opinion/when-your-friends-all-turn-70-ff4daff4?mod=hp_opin_pos_6',
    message: buildOpinionMessage({
      words: opinionSet,
      youtube:
        'https://www.youtube.com/watch?v=7HHhzNGQDZo&list=PLA-OHa20ZsGA&index=2'
    }),
    nickname: 'admin',
    password: 'seed_opinions_low-key-related-words'
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
