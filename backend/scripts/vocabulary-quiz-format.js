/**
 * 영어 단어 퀴즈 업로드 (vocabulary-quiz)
 * - UI는 track 입력형만 허용 (유사 정답 · 영어↔한글)
 * - API quizzes[] 는 목록/메타용 reveal-section 페어 저장 (화면 렌더는 track)
 */
import { API_BASE, getSeedPassword, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly, toVocabQuizTrackWords } from './voca-seo.js';
import { enrichExistingTrackWords, enrichQuizTrackWords } from './quiz-answer-alts.js';

function youtubeThumbFromUrl(url) {
  const s = String(url || '');
  const m =
    s.match(/(?:img\.youtube|i\.ytimg)\.com\/vi\/([a-zA-Z0-9_-]+)\//i) ||
    s.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i) ||
    s.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i) ||
    s.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
  return m ? `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg` : '';
}

async function parseApiJson(res, label) {
  const ct = res.headers.get('content-type') || '';
  const text = await res.text();
  if (!ct.includes('application/json')) {
    throw new Error(`${label}: JSON이 아닌 응답 (HTTP ${res.status})`);
  }
  return JSON.parse(text);
}

function pairsFromQuizzes(quizzes) {
  const pairs = [];
  const seen = new Set();
  for (const q of quizzes || []) {
    if (q?.type !== 'reveal-section' || !Array.isArray(q.items)) continue;
    const dir = String(q.direction || '').trim();
    for (const it of q.items) {
      const show = String(it?.show || it?.en || '').trim();
      const hide = String(it?.hide || it?.ko || '').trim();
      if (!show || !hide) continue;
      let en;
      let ko;
      if (dir === 'ko-en' || (!dir && !/[A-Za-z]/.test(show))) {
        ko = show;
        en = hide;
      } else {
        en = show;
        ko = hide;
      }
      if (!/[A-Za-z]/.test(en)) continue;
      const k = en.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      pairs.push({ en, ko });
    }
  }
  return pairs;
}

/** API 저장용 섹션 (UI와 무관 — 단어 쌍 보관) */
function buildPairSections(config) {
  const pairs = Array.isArray(config.pairs) ? config.pairs : [];
  if (!pairs.length) throw new Error('pairs 배열이 필요합니다.');

  const enKoItems = pairs.map((p) => ({
    show: String(p.en || '').trim(),
    hide: String(p.ko || '').trim(),
  }));
  const koEnItems = pairs.map((p) => ({
    show: String(p.ko || '').trim(),
    hide: String(p.en || '').trim(),
  }));

  const dirs = Array.isArray(config.directions) && config.directions.length
    ? config.directions.map((d) => String(d || '').trim())
    : ['en-ko', 'ko-en'];

  const sections = [];
  if (dirs.includes('en-ko')) {
    sections.push({
      type: 'reveal-section',
      title: config.section1Title || '영어 → 한글',
      direction: 'en-ko',
      items: enKoItems,
    });
  }
  if (dirs.includes('ko-en')) {
    sections.push({
      type: 'reveal-section',
      title: config.section2Title || '한글 → 영어',
      direction: 'ko-en',
      items: koEnItems,
    });
  }
  if (!sections.length) throw new Error('directions 에 en-ko 또는 ko-en 이 필요합니다.');
  return sections;
}

function requireTrackPayload(config) {
  let pairs = Array.isArray(config.pairs) ? config.pairs.filter((p) => p?.en && p?.ko) : [];
  if (!pairs.length && Array.isArray(config.quizzes)) {
    pairs = pairsFromQuizzes(config.quizzes);
  }
  if (!pairs.length) {
    throw new Error(
      '[vocabulary-quiz] track UI 전용: pairs[{ en, ko }] 가 필요합니다. 클릭 공개형 SEO/셸은 금지입니다.'
    );
  }

  let trackWords;
  if (Array.isArray(config.trackWords) && config.trackWords.length) {
    trackWords = enrichExistingTrackWords(config.trackWords);
  } else {
    trackWords = enrichExistingTrackWords(
      enrichQuizTrackWords(pairs, { siblingMerge: config.siblingMerge !== false })
    );
  }

  const normalized = toVocabQuizTrackWords({ pairs, trackWords });
  if (!normalized.length) {
    throw new Error('[vocabulary-quiz] trackWords 변환 실패 — SEO를 쓸 수 없습니다.');
  }
  return { pairs, trackWords: normalized };
}

async function deleteBySlugOrId(apiBase, config, password) {
  const listRes = await fetch(`${apiBase}/vocabulary-quiz`, {
    headers: { Accept: 'application/json' },
  });
  const listData = await parseApiJson(listRes, 'GET /vocabulary-quiz');
  const entries = listData.entries || listData.data || (Array.isArray(listData) ? listData : []);
  let deleted = 0;

  const targets = new Set(
    [config.slug, config.replaceSlug, ...(config.deleteSlugs || [])].filter(Boolean)
  );

  for (const entry of entries) {
    if (!entry?._id) continue;
    const hit =
      (targets.size && targets.has(entry.slug)) ||
      (!targets.size && config.title && entry.title === config.title);
    if (!hit) continue;

    const delRes = await fetch(`${apiBase}/vocabulary-quiz-deletepost`, {
      method: 'POST',
      headers: writeAuthHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' }),
      body: JSON.stringify({ id: entry._id, password }),
    });
    const delData = await parseApiJson(delRes, 'POST /vocabulary-quiz-deletepost');
    if (!delRes.ok) {
      console.warn(`  삭제 실패 (${entry.slug || entry._id}):`, delData.error || delRes.status);
      continue;
    }
    deleted += 1;
    console.log(`  삭제됨: ${entry.slug || entry.title}`);
  }
  return deleted;
}

export async function uploadVocabularyQuiz(config, apiBase = API_BASE) {
  const password = config.password || getSeedPassword();
  const datePublished = config.datePublished || toIsoDateOnly();
  const { pairs, trackWords } = requireTrackPayload(config);

  const quizzes =
    config.format === 'reveal' || Array.isArray(config.pairs) || !config.quizzes
      ? buildPairSections({ ...config, pairs })
      : config.quizzes;

  if (!Array.isArray(quizzes) || !quizzes.length) {
    throw new Error('quizzes 또는 pairs 가 필요합니다.');
  }

  console.log('Vocabulary Quiz 업로드 중...', apiBase);
  await deleteBySlugOrId(apiBase, config, password);

  const youtube =
    config.youtube ||
    (/youtube\.com|youtu\.be/i.test(String(config.sourceUrl || '')) ? config.sourceUrl : '') ||
    '';
  const sourceUrl = youtube || config.sourceUrl || '';
  const thumbnail =
    String(config.thumbnail || '').trim() || youtubeThumbFromUrl(youtube || sourceUrl);

  const post = {
    title: config.title,
    quizzes,
    sourceUrl,
    sourceLabel: config.sourceLabel || (sourceUrl ? (youtube ? '유튜브 보기' : '원문 보기') : ''),
    nickname: config.nickname || 'admin',
    password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
    ...(thumbnail ? { thumbnail } : {}),
  };

  const res = await fetch(`${apiBase}/vocabulary-quiz`, {
    method: 'POST',
    headers: writeAuthHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' }),
    body: JSON.stringify(post),
  });
  const data = await parseApiJson(res, 'POST /vocabulary-quiz');
  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  console.log(`  "${post.title}" 추가됨`);
  console.log(`  slug: ${post.slug}`);
  if (youtube) console.log(`  youtube: ${youtube}`);
  if (thumbnail) console.log(`  thumbnail: ${thumbnail}`);

  if (config.slug) {
    const seo = applySeoAfterUpload('vocabulary-quiz', {
      title: config.title,
      slug: config.slug,
      metaDescription: post.metaDescription,
      datePublished,
      message: '',
      pairs,
      trackWords,
      sourceUrl: post.sourceUrl,
      sourceLabel: post.sourceLabel,
      youtube: youtube || config.youtube || '',
      thumbnail,
      eyebrow: config.eyebrow || 'Vocabulary Quiz · Review',
      hint: config.hint || '유사·대체 표현도 정답으로 인정합니다.',
    });
    if (seo) {
      if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
      console.log(`  URL: ${seo.url}`);
    }
  }

  return data.entry;
}
