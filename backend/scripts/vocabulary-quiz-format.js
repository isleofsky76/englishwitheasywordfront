/**
 * 영어 단어 퀴즈 업로드 (vocabulary-quiz)
 * - 기존 객관식(quizzes[]) 또는 클릭 공개형(format: 'reveal') 지원
 */
import { API_BASE, getSeedPassword, writeAuthHeaders } from './loadEnv.js';
import { applySeoAfterUpload, toIsoDateOnly } from './voca-seo.js';

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

  return [
    {
      type: 'reveal-section',
      title: config.section1Title || '1. 영어 → 한글',
      direction: 'en-ko',
      items: enKoItems,
    },
    {
      type: 'reveal-section',
      title: config.section2Title || '2. 한글 → 영어',
      direction: 'ko-en',
      items: koEnItems,
    },
  ];
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

  const post = {
    title: config.title,
    quizzes,
    sourceUrl: config.sourceUrl || config.youtube || '',
    sourceLabel: config.sourceLabel || (config.sourceUrl || config.youtube ? '유튜브 보기' : ''),
    nickname: config.nickname || 'admin',
    password,
    isSecret: false,
    slug: config.slug || '',
    metaDescription: config.metaDescription || '',
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
  if (post.sourceUrl) console.log(`  youtube: ${post.sourceUrl}`);

  if (config.slug) {
    const seo = applySeoAfterUpload('vocabulary-quiz', {
      title: config.title,
      slug: config.slug,
      metaDescription: post.metaDescription,
      datePublished,
      message: '',
    });
    if (seo) {
      if (seo.seoPath) console.log(`  SEO 페이지: ${seo.seoPath}`);
      console.log(`  URL: ${seo.url}`);
    }
  }

  return data.entry;
}
