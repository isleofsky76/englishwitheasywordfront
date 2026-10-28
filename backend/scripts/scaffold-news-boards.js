/**
 * sports-news 템플릿으로 뉴스 보드 일괄 생성
 * 사용: node scripts/scaffold-news-boards.js
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '../..');

export const NEW_BOARDS = [
  {
    key: 'us-news',
    label: '미국',
    labelFull: '미국뉴스',
    labelEn: 'US NEWS',
    titleEn: 'US News',
    title: '미국 뉴스',
    description: '미국 정치·사회·경제 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'usnews',
    model: 'UsNewsEntry',
    viewPrefix: 'usn_',
    metaDesc: '미국 관련 영문 뉴스에서 쓰는 영어 단어, 발음, 예문을 정리한 미국뉴스 학습 페이지입니다.',
    keywords: 'US news, 미국뉴스, America vocabulary, politics, society',
  },
  {
    key: 'weather-news',
    label: '날씨/환경',
    labelFull: '날씨환경뉴스',
    labelEn: 'WEATHER & ENVIRONMENT',
    titleEn: 'Weather & Environment',
    title: '날씨·환경 뉴스',
    description: '날씨·기후·환경 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'weathernews',
    model: 'WeatherNewsEntry',
    viewPrefix: 'wtn_',
    metaDesc: '날씨·기후·환경 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'weather, climate, environment vocabulary, 날씨, 환경',
  },
  {
    key: 'retail-news',
    label: '유통',
    labelFull: '유통뉴스',
    labelEn: 'RETAIL NEWS',
    titleEn: 'Retail News',
    title: '유통 뉴스',
    description: '유통·리테일·소비 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'retailnews',
    model: 'RetailNewsEntry',
    viewPrefix: 'rtn_',
    metaDesc: '유통·리테일 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'retail, commerce, distribution vocabulary, 유통',
  },
  {
    key: 'literature-news',
    label: '문학',
    labelFull: '문학뉴스',
    labelEn: 'LITERATURE',
    titleEn: 'Literature',
    title: '문학',
    description: '문학·책·작가 관련 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'literaturenews',
    model: 'LiteratureNewsEntry',
    viewPrefix: 'ltn_',
    metaDesc: '문학·도서 관련 영문 기사에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'literature, books, authors vocabulary, 문학',
  },
  {
    key: 'health-news',
    label: '헬스',
    labelFull: '헬스뉴스',
    labelEn: 'HEALTH NEWS',
    titleEn: 'Health News',
    title: '헬스 뉴스',
    description: '건강·의료·웰빙 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'healthnews',
    model: 'HealthNewsEntry',
    viewPrefix: 'htn_',
    metaDesc: '건강·의료 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'health, medical, wellness vocabulary, 헬스',
  },
  {
    key: 'politics-news',
    label: '정치',
    labelFull: '정치뉴스',
    labelEn: 'POLITICS NEWS',
    titleEn: 'Politics News',
    title: '정치 뉴스',
    description: '정치·선거·외교 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'politicsnews',
    model: 'PoliticsNewsEntry',
    viewPrefix: 'pln_',
    metaDesc: '정치·선거 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'politics, election, diplomacy vocabulary, 정치',
  },
  {
    key: 'industry-news',
    label: '산업',
    labelFull: '산업뉴스',
    labelEn: 'INDUSTRY NEWS',
    titleEn: 'Industry News',
    title: '산업 뉴스',
    description: '산업·제조·에너지 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'industrynews',
    model: 'IndustryNewsEntry',
    viewPrefix: 'idn_',
    metaDesc: '산업·제조 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'industry, manufacturing, energy vocabulary, 산업',
  },
  {
    key: 'ai-news',
    label: '인공지능',
    labelFull: '인공지능뉴스',
    labelEn: 'AI NEWS',
    titleEn: 'AI News',
    title: '인공지능 뉴스',
    description: '인공지능·기술 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'ainews',
    model: 'AiNewsEntry',
    viewPrefix: 'ain_',
    metaDesc: '인공지능·기술 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'AI, artificial intelligence, tech vocabulary, 인공지능',
  },
  {
    key: 'incident-news',
    label: '사건과 사고',
    labelFull: '사건사고뉴스',
    labelEn: 'INCIDENT NEWS',
    titleEn: 'Incident News',
    title: '사건·사고 뉴스',
    description: '사건·사고 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'incidentnews',
    model: 'IncidentNewsEntry',
    viewPrefix: 'icn_',
    metaDesc: '사건·사고 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'incident, accident, crime vocabulary, 사건사고',
  },
  {
    key: 'ukraine-news',
    label: '우크라이나/러시아',
    labelFull: '우크라이나러시아뉴스',
    labelEn: 'UKRAINE / RUSSIA',
    titleEn: 'Ukraine / Russia',
    title: '우크라이나·러시아 뉴스',
    description: '우크라이나·러시아 관련 영문 기사의 핵심 표현을 원문과 함께 읽습니다.',
    collection: 'ukrainenews',
    model: 'UkraineNewsEntry',
    viewPrefix: 'ukn_',
    metaDesc: '우크라이나·러시아 관련 영문 뉴스에서 쓰는 영어 단어와 예문을 정리한 학습 페이지입니다.',
    keywords: 'Ukraine, Russia, war vocabulary, 우크라이나, 러시아',
  },
];

function pascalFromKey(key) {
  return key
    .split('-')
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join('');
}

function replaceAll(src, pairs) {
  let out = src;
  for (const [from, to] of pairs) out = out.split(from).join(to);
  return out;
}

function scaffoldBoard(board) {
  const boardPascal = pascalFromKey(board.key);
  const uploadFn = `upload${boardPascal}`;
  const buildFn = `build${boardPascal}Message`;

  const pairs = [
    ['sports-news', board.key],
    ['SportsNews', boardPascal],
    ['uploadSportsNews', uploadFn],
    ['buildSportsNewsMessage', buildFn],
    ['Sports News', board.titleEn],
    ['스포츠뉴스', board.labelFull],
    ['스포츠 뉴스', board.title],
    ['스포츠·축구', board.label],
    ['축구·스포츠 영문 기사의 핵심 표현을 원문과 함께 읽습니다.', board.description],
    ['spn_', board.viewPrefix],
    ['20261028sports1', '20261028cat1'],
    [
      'sports English, football vocabulary, Ballon dOr, Premier League',
      board.keywords,
    ],
  ];

  const outs = [
    ['sports-news.html', `${board.key}.html`],
    ['sports-news-list.html', `${board.key}-list.html`],
    ['sports-news.js', `${board.key}.js`],
    ['sports-news-list.js', `${board.key}-list.js`],
    ['backend/scripts/sports-news-format.js', `backend/scripts/${board.key}-format.js`],
  ];

  for (const [srcRel, destRel] of outs) {
    const raw = fs.readFileSync(path.join(ROOT, srcRel), 'utf8');
    let content = replaceAll(raw, pairs);
    content = content.replace(
      /content="[^"]*스포츠[^"]*학습[^"]*"/g,
      `content="${board.metaDesc}"`
    );
    content = content.replace(
      /content="스포츠뉴스 · 발음 · 예문"/g,
      `content="${board.labelFull} · 발음 · 예문"`
    );
    content = content.replace(
      /content="스포츠 뉴스 어휘 \| 시사영단어"/g,
      `content="${board.title} 어휘 | 시사영단어"`
    );
    fs.writeFileSync(path.join(ROOT, destRel), content, 'utf8');
    console.log('wrote', destRel);
  }

  const feedDir = path.join(ROOT, board.key);
  fs.mkdirSync(feedDir, { recursive: true });
  fs.writeFileSync(
    path.join(feedDir, 'feed.json'),
    JSON.stringify({ entries: [] }, null, 2) + '\n',
    'utf8'
  );

  const seed = `/**
 * ${board.labelFull} 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-${board.key}.js
 */
import { API_BASE } from './loadEnv.js';
import { ${uploadFn} } from './${board.key}-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '',

  slug: '',

  metaDescription: '',

  password: 'seed_${board.key}_',

  datePublished: '2026-10-28',

  intro: [
    '',
  ],

  words: [
    {
      narrative: [
        '1. ',
      ],
    },
  ],

  source: {
    text: '',
    url: '',
  },

  youtube: '',
};
// ===============================

${uploadFn}(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
`;
  const seedRel = `backend/scripts/seed-${board.key}.js`;
  fs.writeFileSync(path.join(ROOT, seedRel), seed, 'utf8');
  console.log('wrote', seedRel);
}

function main() {
  for (const board of NEW_BOARDS) {
    console.log('\n===', board.key, '===');
    scaffoldBoard(board);
  }
  fs.writeFileSync(
    path.join(ROOT, 'backend/scripts/new-boards.json'),
    JSON.stringify(NEW_BOARDS, null, 2) + '\n',
    'utf8'
  );
  console.log('\nwrote backend/scripts/new-boards.json');
}

main();
