/**
 * 신문읽는 이미지 — 배치 업로드 (AI Vision)
 *
 * 이미지 파일명만 넣으면 GPT가 제목·섹션 단어를 만들고 순서대로 업로드합니다.
 * 이미지는 GitHub resources/ 와 동일 경로 (/resources/{파일명}).
 *
 * 사용법 (backend 폴더):
 *   1) 아래 images 배열에 파일명 추가
 *   2) node scripts/newspaperscript_batch.js
 *
 *   또는 CLI:
 *   node scripts/newspaperscript_batch.js Prague.jpg harbor.jpg
 *
 * 수동으로 단어를 직접 쓸 때: newspaperscript.js
 */
import path from 'path';
import OpenAI from 'openai';
import { API_BASE } from './loadEnv.js';
import { uploadShortsBgImage } from './shorts-bg-image-format.js';
import { SITE_ORIGIN, toIsoDateOnly } from './voca-seo.js';

// ========== 여기만 수정 (이미지 파일명) ==========

const images = [
  'PonteVecchio.jpg',
];

// ===============================================

const SECTION_HEADINGS = [
  '전체 분위기 (Overall Scene)',
  '좌측 전경 (Left Foreground)',
  '중앙 풍경 (Center Scene)',
  '우측 전경 (Right Foreground)',
];

const GITHUB_REPO =
  process.env.GITHUB_RESOURCES_REPO || 'isleofsky76/englishwitheasywordfront';

function normalizeFilename(name) {
  return String(name || '')
    .trim()
    .replace(/^["']|["']$/g, '')
    .replace(/^\/+/, '')
    .replace(/^resources\//i, '');
}

function stemFromFilename(filename) {
  return path.basename(filename, path.extname(filename));
}

function slugify(text) {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function imagePublicUrls(filename) {
  const encoded = filename.split('/').map(encodeURIComponent).join('/');
  return [
    `${SITE_ORIGIN}/resources/${encoded}`,
    `https://raw.githubusercontent.com/${GITHUB_REPO}/main/resources/${encoded}`,
  ];
}

async function resolveImageUrl(filename) {
  for (const url of imagePublicUrls(filename)) {
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(20000) });
      if (res.ok) return url;
    } catch (_) {
      /* try next */
    }
  }
  // HEAD 막힌 경우에도 Vision이 GET 할 수 있도록 사이트 URL 우선 반환
  return imagePublicUrls(filename)[0];
}

function parseJsonContent(raw) {
  const jsonText = String(raw || '')
    .replace(/^\s*```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim();
  return JSON.parse(jsonText);
}

function normalizeSections(sections) {
  const list = Array.isArray(sections) ? sections : [];
  return SECTION_HEADINGS.map((heading, i) => {
    const found =
      list.find((s) => String(s?.heading || '').includes(heading.split(' (')[0])) ||
      list[i] ||
      {};
    const body = String(found.body || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .join('\n');
    if (!body) {
      throw new Error(`섹션 본문 없음: ${heading}`);
    }
    return { heading, body };
  });
}

async function generateArticleFromImage(filename) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY 가 .env 에 없습니다.');

  const imageUrl = await resolveImageUrl(filename);
  console.log(`  Vision 이미지: ${imageUrl}`);

  const openai = new OpenAI({ apiKey });
  const fileStem = stemFromFilename(filename);
  const userPrompt = `You are writing Korean–English vocabulary cards for a canal/café/street scene image (YouTube Shorts background).

Look at the image carefully. Return JSON only with this shape:
{
  "title": "한글 제목 · English title",
  "slug": "english-kebab-case-slug",
  "metaDescription": "한국어 SEO 1~2문장. 장면과 주요 영어 단어를 언급.",
  "sections": [
    {
      "heading": "전체 분위기 (Overall Scene)",
      "body": "word : 한글\\nword : 한글\\n..."
    },
    {
      "heading": "좌측 전경 (Left Foreground)",
      "body": "..."
    },
    {
      "heading": "중앙 풍경 (Center Scene)",
      "body": "..."
    },
    {
      "heading": "우측 전경 (Right Foreground)",
      "body": "..."
    }
  ]
}

Rules:
- Exactly 4 sections with those headings (Korean + English in parentheses).
- Each body: one vocab per line as "english : 한글" (space around colon).
- 12–14 lines per section; mix nouns, adjectives, and verbs visible or implied in that region.
- Prefer concrete scene words over abstract theory.
- Avoid loanwords where Korean is just a transliteration of English (no lemonade/레모네이드, lavender/라벤더, cone/콘, cafe/카페, ice cream/아이스크림, terracotta/테라코타, etc.). Use words with distinct native Korean meanings.
- title format must include " · " between Korean and English.
- slug: lowercase kebab-case, ASCII only; prefer something based on the English title (file stem hint: "${fileStem}").
- No HTML, no markdown fences, JSON only.`;

  const models = [process.env.SBGI_VISION_MODEL, 'gpt-4o', 'gpt-4o-mini'].filter(
    (m, i, arr) => m && arr.indexOf(m) === i
  );

  let raw;
  let lastErr;
  for (const model of models) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        response_format: { type: 'json_object' },
        temperature: 0.6,
        messages: [
          {
            role: 'system',
            content:
              'You write bilingual English–Korean vocabulary lists for adult learners. Reply with JSON only.',
          },
          {
            role: 'user',
            content: [
              { type: 'text', text: userPrompt },
              { type: 'image_url', image_url: { url: imageUrl, detail: 'high' } },
            ],
          },
        ],
      });
      raw = completion.choices[0]?.message?.content;
      if (raw) {
        console.log(`  모델: ${model}`);
        break;
      }
    } catch (err) {
      lastErr = err;
      console.warn(`  모델 ${model} 실패:`, err.message);
    }
  }
  if (!raw && lastErr) throw lastErr;
  if (!raw) throw new Error('Vision 응답이 비었습니다.');

  const data = parseJsonContent(raw);
  const sections = normalizeSections(data.sections);
  const title = String(data.title || '').trim();
  if (!title.includes('·')) {
    throw new Error('title 형식 오류 (한글 · English 필요)');
  }

  const fromFile = slugify(fileStem);
  const fromAi = slugify(data.slug || data.title);
  const slug = fromFile.length >= 3 ? fromFile : fromAi;
  if (!slug) throw new Error('slug 를 만들 수 없습니다.');

  const metaDescription = String(data.metaDescription || '').trim();
  if (!metaDescription) throw new Error('metaDescription 이 비었습니다.');

  return {
    title,
    slug,
    metaDescription,
    password: `seed_shorts_${slug}`,
    datePublished: toIsoDateOnly(),
    image: `/resources/${filename}`,
    sections,
  };
}

function collectFilenames() {
  const fromCli = process.argv.slice(2).map(normalizeFilename).filter(Boolean);
  if (fromCli.length) return fromCli;
  return images.map(normalizeFilename).filter(Boolean);
}

async function main() {
  const list = collectFilenames();
  if (!list.length) {
    console.error(
      '이미지 파일명이 없습니다.\n' +
        '  - newspaperscript_batch.js 상단 images 배열에 추가하거나\n' +
        '  - node scripts/newspaperscript_batch.js foo.jpg bar.jpg'
    );
    process.exitCode = 1;
    return;
  }

  console.log(`배치 업로드 ${list.length}건 → ${API_BASE}`);
  let ok = 0;
  let fail = 0;

  for (let i = 0; i < list.length; i++) {
    const filename = list[i];
    console.log(`\n[${i + 1}/${list.length}] ${filename}`);
    try {
      const article = await generateArticleFromImage(filename);
      console.log(`  title: ${article.title}`);
      console.log(`  slug: ${article.slug}`);
      await uploadShortsBgImage(article, API_BASE);
      ok++;
    } catch (e) {
      fail++;
      console.error(`  오류: ${e.message}`);
    }
  }

  console.log(`\n완료. 성공 ${ok}, 실패 ${fail}`);
  if (fail) process.exitCode = 1;
}

main();
