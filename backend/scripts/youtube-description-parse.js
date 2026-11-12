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

/**
 * 제목 `카테고리 | 제목` 앞부분 → 게시판
 * 사이트 01 시사 영단어: 국제·한국·국방·경제·여행·스포츠·미국·산업·컬쳐·건강
 * 유튜브 권장 접두사: 국제·한국·국방·경제·스포츠·미국·산업·컬쳐
 * 맵에 없는 접두사 → news-voca (아래 boardFromTitlePrefix)
 */
const TITLE_CATEGORY_BOARD = {
  국제: 'news-voca',
  한국: 'korea-news',
  국방: 'defense-news',
  경제: 'economy-news',
  여행: 'travel-news',
  스포츠: 'sports-news',
  미국: 'us-news',
  산업: 'industry-news',
  컬쳐: 'culture-voca',
  문화: 'culture-voca',
  건강: 'health-news',
  연관단어: 'english-synonym',
  유의어: 'english-synonym',
  영작: 'english-writing',
  영어작문: 'english-writing',
};

const BOARD_RULES = [
  { board: 'english-synonym', re: /#연관단어|연관\s*단어/i },
  { board: 'sports-news', re: /sport|football|ballon|축구|야구|올림픽|선수|경기/i },
  { board: 'defense-news', re: /defense|military|국방|무기|함정|미사일|nato/i },
  { board: 'economy-news', re: /금리|인플레|주식|경기침체|fed\b|job.?hop|career|이직|적자|티켓 가격/i },
  { board: 'industry-news', re: /iphone|apple|반도체|산업|제조|gadget|hinge/i },
  { board: 'travel-news', re: /travel|여행|관광|roadtrip|peloponnese/i },
  { board: 'korea-news', re: /korea|한국|seoul|서울|herald|koreatimes/i },
  { board: 'us-news', re: /\bus\b|미국|trump|트럼프|white house|백악관/i },
  { board: 'culture-voca', re: /buffet|food|cook|art|museum|전시|뷔페|bts|\brm\b|미술/i },
];

function boardFromTitlePrefix(title) {
  const m = String(title || '').match(/^\s*([^|｜]{1,20})\s*[|｜]\s*/);
  if (!m) return '';
  const key = m[1].replace(/\s+/g, '').trim();
  if (!key) return '';
  if (TITLE_CATEGORY_BOARD[key]) return TITLE_CATEGORY_BOARD[key];
  /* 분류에 없는 접두사 → 시사 영단어 */
  return 'news-voca';
}

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
  /* 번호 없는 연관단어 목록: conceive — 임신하다 */
  if (!words.length) {
    const looseRe =
      /^(?:\*\*)?([A-Za-z][A-Za-z0-9\-'\s]{0,48}?)(?:\*\*)?\s+[—–\-]\s+(?:\*\*)?([^\n]+?)(?:\*\*)?\s*$/gm;
    let n = 0;
    while ((m = looseRe.exec(text)) !== null) {
      const expression = m[1].replace(/\*\*/g, '').trim();
      const meaning = m[2].replace(/\*\*/g, '').trim();
      if (!expression || !meaning) continue;
      if (/^(출처|기사|원본|저자|게시|All rights)/i.test(expression)) continue;
      n += 1;
      words.push({ num: n, expression, meaning, exampleEn: '', exampleKo: '' });
    }
  }
  return words;
}

/** 단일 단어 활용형 — blame→blamed, spur→spurred, cast→casting */
function singleWordInflections(word) {
  const e = String(word || '').trim();
  if (!e || /\s/.test(e)) return e ? [e] : [];
  const out = new Set([e]);
  const add = (x) => {
    if (x && x.length > 1) out.add(x);
  };
  add(`${e}s`);
  add(`${e}es`);
  add(`${e}ed`);
  add(`${e}ing`);
  add(`${e}er`);
  add(`${e}est`);
  add(`${e}ly`);
  if (/e$/i.test(e)) {
    add(`${e}d`); /* blame → blamed */
    add(`${e.slice(0, -1)}ing`); /* blame → blaming */
  }
  if (/[bcdfghjklmnpqrstvwxyz]$/i.test(e)) {
    const c = e.slice(-1);
    add(`${e}${c}ed`); /* spur → spurred */
    add(`${e}${c}ing`);
  }
  if (/y$/i.test(e) && e.length > 2 && !/[aeiou]y$/i.test(e)) {
    add(`${e.slice(0, -1)}ies`);
    add(`${e.slice(0, -1)}ied`);
  }
  return [...out];
}

/** blame→blamed, cast blame→casting blame 등 — 예문 활용형 하이라이트용 */
function inflectionAlternates(expression) {
  const e = String(expression || '').trim();
  if (!e) return [];
  const out = new Set([e]);
  const parts = e.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    singleWordInflections(e).forEach((x) => out.add(x));
  } else {
    /* 구(cast blame): 첫 동사만 활용 → casting blame */
    const rest = parts.slice(1).join(' ');
    singleWordInflections(parts[0]).forEach((form) => {
      if (form) out.add(`${form} ${rest}`);
    });
  }
  return [...out].sort((a, b) => b.length - a.length);
}

/**
 * 뉴스 서술형(dearer 양식): 예문 안에 **표제어** 하이라이트.
 * 끝에 (**lemma**)를 붙이면 redesign이 발음줄로 오인해 예문이 사라지므로 쓰지 않음.
 * 활용형(blamed/spurred/gloated)도 표제어 원형으로 매칭.
 */
function lemmaAnnotation(sentence, expression) {
  const exp = String(expression || '').trim();
  let s = String(sentence || '')
    .trim()
    .replace(/\*\*/g, '');
  if (!exp) return s;
  if (!s) return `**${exp}**`;
  const esc = exp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  /* 구형 꼬리 (**lemma**) / (lemma) 제거 */
  s = s.replace(new RegExp(`\\s*\\(\\*\\*${esc}\\*\\*\\)\\s*$`, 'i'), '').trim();
  s = s.replace(new RegExp(`\\s*\\(${esc}\\)\\s*$`, 'i'), '').trim();

  for (const form of inflectionAlternates(exp)) {
    const formEsc = form.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(^|[^A-Za-z*])(${formEsc})(?![A-Za-z*])`, 'i');
    if (re.test(s)) {
      return s.replace(re, (_, pre, word) => `${pre}**${word}**`);
    }
  }
  return s;
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
 * 연관단어 seed 양식:
 *   예문 있음 (뉴스영어와 동일):
 *     title: '1. 무자녀 상태 (명)'
 *     narrative: ['**Childlessness** is … / 무자녀는 …']
 *   예문 없음:
 *     title: '1. 마구 뒤지다·난장판으로 만들다'
 *     narrative: ['**ransack**(ˈrænˌsæk / 랜색)']
 */
export function wordsToSynonymSections(words, pronunciations = {}) {
  return (words || []).map((w, i) => {
    const n = w.num || i + 1;
    const expression = String(w.expression || '').trim();
    const meaning = String(w.meaning || '').trim() || expression;
    const exampleEn = String(w.exampleEn || '').trim();
    const exampleKo = String(w.exampleKo || '').trim();

    /* 예문 있으면 뉴스영어처럼: 번호.뜻 → 예문 → 번역 → cf. 원형
       (예문 mark는 pilloried 등 활용형일 수 있어, 표제어는 cf. lemma로 고정) */
    if (exampleEn) {
      const en = lemmaAnnotation(exampleEn, expression);
      const cf = `cf. ${expression}: ${meaning}`;
      return {
        title: `${n}. ${meaning}`,
        narrative: exampleKo ? [`${en} / ${exampleKo} ${cf}`] : [`${en} ${cf}`],
      };
    }

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
  /* 1) 제목 `국제 | …` / `미국 | …` 등 카테고리 우선 */
  const fromPrefix = boardFromTitlePrefix(title);
  if (fromPrefix) return fromPrefix;

  /* 2) 푸터(Economist 언급 등)로 오분류되지 않게 제목·해시태그·출처만 사용 */
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
    .replace(/^\s*[^|｜]{1,20}\s*[|｜]\s*/, '')
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
  /* 보드가 연관단어일 때만 연관단어 양식 — 설명란 해시태그 #연관단어만으로는 뉴스 양식을 덮지 않음 */
  const isSynonym = board === 'english-synonym';

  let metaDescription;
  let intro;
  if (isSynonym || !hasSource) {
    metaDescription = `${topic} 연관단어${wordList ? `. ${wordList} 등.` : '.'}`.slice(0, 160);
    intro = [`${topic} 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.`];
  } else {
    metaDescription = `${sourceLabel} 기사에서 추출한 시사 영단어. ${wordList}${
      wordList ? ' 등.' : ''
    }`.slice(0, 160);
    intro = [
      `${topic} 주제를 다룬 ${sourceLabel} 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.`,
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
    description,
    title: topic,
    rawTitle: title,
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
