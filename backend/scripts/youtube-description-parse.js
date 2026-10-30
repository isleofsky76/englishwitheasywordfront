/**
 * 시사영단어 유튜브 설명란 → seed article JSON
 *
 * 설명 형식 예:
 *   출처 : The Wall Street Journal
 *   기사 제목 : ...
 *   원본 링크 : https://...
 *   저자 : By Adam Chandler
 *   1. **bounty — 풍부함**
 *      Good Time Country Buffet promises a bounty
 */

const SOURCE_ALIASES = [
  { re: /wall street journal|\bwsj\b/i, label: 'The Wall Street Journal', boardHints: ['culture', 'news'] },
  { re: /\bthe guardian\b|\bguardian\b/i, label: 'The Guardian', boardHints: ['culture', 'news'] },
  { re: /\bbbc\b/i, label: 'BBC', boardHints: ['sports', 'news'] },
  { re: /\beconomist\b/i, label: 'The Economist', boardHints: ['economy', 'news'] },
  { re: /korea herald/i, label: 'Korea Herald', boardHints: ['korea'] },
  { re: /korea times/i, label: 'Korea Times', boardHints: ['korea'] },
  { re: /\bnytimes\b|new york times/i, label: 'The New York Times', boardHints: ['news'] },
  { re: /\breuters\b/i, label: 'Reuters', boardHints: ['news'] },
  { re: /\bcnn\b/i, label: 'CNN', boardHints: ['news'] },
];

const BOARD_RULES = [
  { board: 'english-synonym', re: /#연관단어|연관\s*단어/i },
  { board: 'sports-news', re: /sport|football|ballon|축구|야구|올림픽|선수|경기/i },
  { board: 'defense-news', re: /defense|military|국방|무기|함정|미사일|nato/i },
  { board: 'economy-news', re: /금리|인플레|주식|경기침체|fed\b|job.?hop|career|이직|적자|티켓 가격/i },
  { board: 'industry-news', re: /iphone|apple|반도체|산업|제조|gadget|hinge/i },
  { board: 'travel-news', re: /travel|여행|관광|roadtrip|peloponnese/i },
  { board: 'korea-news', re: /korea|한국|seoul|서울|herald|koreatimes/i },
  { board: 'culture-voca', re: /buffet|food|cook|art|museum|전시|뷔페|bts|\brm\b|미술/i },
];

function pick(re, text) {
  const m = String(text || '').match(re);
  return m ? m[1].trim() : '';
}

function normalizeAuthor(raw) {
  return String(raw || '')
    .replace(/^By\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function slugifyWord(w) {
  return String(w || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40);
}

function buildSlug(words) {
  const parts = words
    .map((w) => slugifyWord(w.expression))
    .filter(Boolean)
    .slice(0, 5);
  if (!parts.length) return `yt-${Date.now()}`;
  return `${parts.join('-')}-related-words`;
}

function parseWords(description) {
  const text = String(description || '').replace(/\r\n/g, '\n');
  const words = [];
  /* 구분자는 앞뒤 공백 있는 — / – / - 만 (call-up 같은 하이픈 단어 보호) */
  const blockRe =
    /^(\d+)\.\s*(?:\*\*)?(.+?)(?:\*\*)?\s+[—–\-]\s+(?:\*\*)?(.+?)(?:\*\*)?\s*$/gm;
  let m;
  const starts = [];
  while ((m = blockRe.exec(text)) !== null) {
    starts.push({
      index: m.index,
      num: Number(m[1]),
      expression: m[2].replace(/\*\*/g, '').trim(),
      meaning: m[3].replace(/\*\*/g, '').trim(),
      endOfHeader: m.index + m[0].length,
    });
  }
  for (let i = 0; i < starts.length; i += 1) {
    const cur = starts[i];
    const nextStart = i + 1 < starts.length ? starts[i + 1].index : text.length;
    const body = text.slice(cur.endOfHeader, nextStart).trim();
    const lines = body
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .filter((l) => !/^all rights belong/i.test(l));
    const exampleEn = lines.find((l) => /[A-Za-z]/.test(l) && !/^[가-힣]/.test(l)) || '';
    const exampleKo = lines.find((l) => /[가-힣]/.test(l)) || '';
    words.push({
      num: cur.num,
      expression: cur.expression,
      meaning: cur.meaning,
      exampleEn,
      exampleKo,
    });
  }
  return words;
}

/** 표제어는 항상 사전 원형. 문장 속 변화형은 그대로 두고 끝에 (**lemma**)만 붙인다. */
function lemmaAnnotation(sentence, expression) {
  const s = String(sentence || '')
    .trim()
    .replace(/\*\*/g, '');
  const exp = String(expression || '').trim();
  if (!exp) return s;
  if (!s) return `(**${exp}**)`;
  if (/\(\*\*[^*]+\*\*\)\s*$/.test(s)) return s;
  return `${s} (**${exp}**)`;
}

function wordsToNarratives(words) {
  return words.map((w, i) => {
    const n = w.num || i + 1;
    const en = lemmaAnnotation(w.exampleEn, w.expression);
    const line = w.exampleKo
      ? `${n}. ${en} / ${w.exampleKo} cf. ${w.expression}: ${w.meaning}`
      : `${n}. ${en} cf. ${w.expression}: ${w.meaning}`;
    return { narrative: [line] };
  });
}

/**
 * 기존 연관단어 seed 양식:
 *   title: '1. 마구 뒤지다·난장판으로 만들다'
 *   narrative: ['**ransack**(ˈrænˌsæk / 랜색)']
 */
export function wordsToSynonymSections(words, pronunciations = {}) {
  return (words || []).map((w, i) => {
    const n = w.num || i + 1;
    const expression = String(w.expression || '').trim();
    const meaning = String(w.meaning || '').trim() || expression;
    const key = expression.toLowerCase();
    const p = pronunciations[key] || pronunciations[expression] || {};
    const ipa = String(p.ipa || '')
      .replace(/^\/+|\/+$/g, '')
      .trim();
    const ipaKo = String(p.ipaKo || '').trim();
    /* brook(brʊk / 브룩) 양식 고정 */
    let pron = '';
    if (ipa && ipaKo) pron = `(${ipa} / ${ipaKo})`;
    else if (ipaKo) pron = `(${ipaKo})`;
    else if (ipa) pron = `(${ipa})`;
    return {
      title: `${n}. ${meaning}`,
      narrative: [`**${expression}**${pron}`],
    };
  });
}

export function applySynonymWordFormat(article, pronunciations = {}) {
  if (!article) return article;
  const meta = article.wordMeta || [];
  if (!meta.length) return article;
  return {
    ...article,
    words: wordsToSynonymSections(meta, pronunciations),
  };
}

function inferBoard({ title, description, sourceLabel }) {
  /* 푸터(Economist 언급 등)로 오분류되지 않게 제목·해시태그·출처만 사용 */
  const tags = String(description || '')
    .split('\n')
    .filter((l) => /#/.test(l))
    .slice(0, 5)
    .join(' ');
  const blob = `${title}\n${sourceLabel}\n${tags}`;
  for (const rule of BOARD_RULES) {
    if (rule.re.test(blob)) return rule.board;
  }
  return 'news-voca';
}

function normalizeSourceLabel(raw) {
  const t = String(raw || '').trim();
  if (!t) return '';
  for (const a of SOURCE_ALIASES) {
    if (a.re.test(t)) return a.label;
  }
  return t;
}

function cleanTopicTitle(title) {
  return String(title || '')
    .replace(/#연관단어/g, '')
    .replace(/#\S+/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseYoutubeDescription(video) {
  const description = String(video.description || '');
  const title = String(video.title || '').trim() || '제목 없음';
  const sourceRaw = pick(/출처\s*:\s*(.+)/i, description);
  const articleTitle = pick(/기사\s*제목\s*:\s*(.+)/i, description);
  const sourceUrl = pick(/원본\s*링크\s*:\s*(https?:\/\/\S+)/i, description);
  const author = normalizeAuthor(pick(/저자\s*:\s*(.+)/i, description));
  const sourceLabel = normalizeSourceLabel(sourceRaw);
  const hasSource = Boolean(sourceLabel || sourceUrl || articleTitle);
  const words = parseWords(description);
  const board = inferBoard({ title, description, sourceLabel });
  const slug = buildSlug(words);
  const sourceText = hasSource
    ? [sourceLabel, articleTitle, author ? `By ${author}` : ''].filter(Boolean).join(' | ')
    : '';

  const wordList = words.map((w) => w.expression).filter(Boolean).join(', ');
  const topic = cleanTopicTitle(title) || title;
  const isSynonym = board === 'english-synonym' || /#연관단어/.test(title);

  let metaDescription;
  let intro;
  if (!hasSource || isSynonym) {
    metaDescription = `${topic} 연관단어${wordList ? `. ${wordList} 등.` : '.'}`.slice(0, 160);
    intro = [`${topic} 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.`];
  } else {
    metaDescription = `${sourceLabel} 기사에서 추출한 시사 영단어. ${wordList}${
      wordList ? ' 등.' : ''
    }`.slice(0, 160);
    intro = [
      `${title} 주제를 다룬 ${sourceLabel} 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.`,
    ];
  }

  const datePublished = (video.published || new Date().toISOString()).slice(0, 10);

  const youtube = video.url || `https://youtube.com/shorts/${video.videoId}`;
  const thumbnail =
    video.thumbnail ||
    (video.videoId ? `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg` : '');

  return {
    board,
    videoId: video.videoId,
    title,
    slug,
    metaDescription,
    password: `seed_${board.replace(/-/g, '_')}_${slug.slice(0, 48)}`,
    datePublished,
    intro,
    words: wordsToNarratives(words),
    wordMeta: words,
    source: {
      text: sourceText,
      url: sourceUrl || '',
    },
    youtube,
    thumbnail,
    publishedAt: video.published || '',
    parsedWordCount: words.length,
  };
}

export { inferBoard, parseWords, buildSlug };
