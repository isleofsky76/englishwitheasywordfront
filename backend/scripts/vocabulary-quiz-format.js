/**
 * 영어 단어 퀴즈 업로드 (vocabulary-quiz)
 * - 기존 객관식(quizzes[]) 또는 클릭 공개형(format: 'reveal') 지원
 */
import { API_BASE, getSeedPassword, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

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

function buildRevealQuizzes(config) {
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

  /* directions: ['en-ko'] | ['ko-en'] | ['en-ko','ko-en'] (기본 둘 다) */
  const dirs = Array.isArray(config.directions) && config.directions.length
    ? config.directions.map((d) => String(d || '').trim())
    : ['en-ko', 'ko-en'];

  const sections = [];
  if (dirs.includes('en-ko')) {
    sections.push({
      type: 'reveal-section',
      title: config.section1Title || '영어 → 뜻',
      direction: 'en-ko',
      items: enKoItems,
    });
  }
  if (dirs.includes('ko-en')) {
    sections.push({
      type: 'reveal-section',
      title: config.section2Title || '뜻 → 영어',
      direction: 'ko-en',
      items: koEnItems,
    });
  }
  if (!sections.length) throw new Error('directions 에 en-ko 또는 ko-en 이 필요합니다.');
  return sections;
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
  const quizzes =
    config.format === 'reveal' || Array.isArray(config.pairs)
      ? buildRevealQuizzes(config)
      : config.quizzes;

  if (!Array.isArray(quizzes) || !quizzes.length) {
    throw new Error('quizzes 또는 pairs 가 필요합니다.');
  }

  console.log('Vocabulary Quiz 업로드 중...', apiBase);
  await deleteBySlugOrId(apiBase, config, password);

  /* 목록 섬네일 — 항상 유튜브 미리보기 (기사 URL보다 youtube 우선) */
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
      pairs: config.pairs,
      trackWords: config.trackWords,
      sourceUrl: post.sourceUrl,
      sourceLabel: post.sourceLabel,
      youtube: youtube || config.youtube || '',
      thumbnail,
      eyebrow: config.eyebrow || '',
      hint: config.hint || '',
    });
    if (seo) {
      if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
      console.log(`  URL: ${seo.url}`);
    }
  }

  return data.entry;
}
