import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateHtmlMessage } from './generate-html-format.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORD_DATA = {
  word: 'palpable',
  pronunciation: '/ˈpæl.pə.bəl/',
  partOfSpeech: 'adjective',
  
  koreanMeaning: '명백한, 확연한, 만져서 느낄 수 있는',
  
  englishDefinition: 'so obvious that it can easily be seen or known, or (of a feeling) so strong that it seems as if it can be touched or physically felt',
  
  examples: [
    {
      en: 'There was a palpable sense of relief when the exam was finally over.',
      ko: '시험이 드디어 끝났을 때 확연한 안도감이 있었다.'
    },
    {
      en: 'The tension in the room was palpable as we waited for the results.',
      ko: '결과를 기다리는 동안 방 안의 긴장감이 명백히 느껴졌다.'
    },
    {
      en: 'Her disappointment was palpable when she heard the news.',
      ko: '그녀가 그 소식을 들었을 때 그녀의 실망감은 확연했다.'
    },
    {
      en: 'There was palpable excitement in the air before the concert started.',
      ko: '콘서트가 시작되기 전 공기 중에 확연한 흥분이 있었다.'
    }
  ],
  
  keyPhrases: [
    {
      phrase: 'palpable sense',
      meaning: '명백한 느낌'
    },
    {
      phrase: 'palpable tension',
      meaning: '명백히 느껴지는 긴장'
    },
    {
      phrase: 'palpable relief',
      meaning: '확연한 안도감'
    }
  ],
  
  synonyms: ['obvious', 'clear', 'evident', 'tangible', 'noticeable', 'perceptible'],
  
  slug: 'palpable',
  metaDescription: 'palpable 뜻과 예문. 명백한, 확연한, 만져서 느낄 수 있는, palpable sense, palpable tension, palpable relief.',
  
  nickname: 'admin',
  password: 'english2024',
  
  imageFile: null,
  imageIsUrl: false
};

function generateStaticHtml(data, htmlContent) {
  const ogImageTag = data.imageFile ? `
    <meta property="og:image" content="${data.imageFile}">
    <meta name="twitter:image" content="${data.imageFile}">
    <meta name="twitter:card" content="summary_large_image">` : `
    <meta name="twitter:card" content="summary">`;

  return `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.word} | ${data.koreanMeaning} | Word of the Day · English Easy Study</title>
    <meta name="description" content="${data.metaDescription}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="English Easy Study">
    <link rel="canonical" href="https://englisheasystudy.com/word-of-the-day/${data.slug}">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="English Easy Study">
    <meta property="og:title" content="${data.word} | ${data.koreanMeaning}">
    <meta property="og:description" content="${data.metaDescription}">
    <meta property="og:url" content="https://englisheasystudy.com/word-of-the-day/${data.slug}">${ogImageTag}
    <meta name="twitter:title" content="${data.word} | ${data.koreanMeaning}">
    <meta name="twitter:description" content="${data.metaDescription}">
    <meta name="google-adsense-account" content="ca-pub-6108574897789788">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108574897789788" crossorigin="anonymous"></script>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${data.word} | ${data.koreanMeaning}","description":"${data.metaDescription}","author":{"@type":"Organization","name":"English Easy Study"},"publisher":{"@type":"Organization","name":"English Easy Study","url":"https://englisheasystudy.com"},"datePublished":"${new Date().toISOString().split('T')[0]}","dateModified":"${new Date().toISOString().split('T')[0]}","mainEntityOfPage":{"@type":"WebPage","@id":"https://englisheasystudy.com/word-of-the-day/${data.slug}"},"inLanguage":["ko","en"]${data.imageFile ? `,"image":"${data.imageFile}"` : ''}}</script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../page30_viewpost.css?v=20260628">
    <link rel="stylesheet" href="../../page30_viewpost_wordofday.css?v=20260908ratio">
    <link rel="stylesheet" href="../../title-text-sharp.css?v=20260610">
    <link rel="stylesheet" href="../../viewpost-like.css?v=20260906gray">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260617">
    <link rel="stylesheet" href="../../navbar-unified.css?v=20260612c">
    <link rel="stylesheet" href="../../weather-banner.css?v=20260612g">
    <link rel="stylesheet" href="../../world-clock.css?v=20260612g">
</head>
<body data-nv-slug="${data.slug}" data-nv-board="word-of-the-day">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="주 메뉴">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../word-of-the-day-list.html">Word of the Day</a>
            <div data-nav-home-menu class="nav-home-menu-slot ms-auto"></div>
        </div>
    </nav>
    <main id="post-container" role="main">
        <header id="post-header">
            <h1 id="post-title"></h1>
            <p id="post-meta"></p>
        </header>
        <article id="post-content">
            <div id="post-message" class="post-message-body"></div>
        </article>
    </main>
    <script src="../../page30-api-config.js"></script>
    <script src="../../viewpost-seo.js?v=20260622a"></script>
    <script src="../../viewpost-meta.js?v=20260627"></script>
    <script src="../../viewpost-like.js?v=20260906gray"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../nav-home-menu.js?v=20260720a"></script>
    <script src="../../page30_viewpost_wordofday.js?v=20260908tts"></script>
    <script src="../../weather-banner.js?v=20260612e" defer></script>
    <script src="../../world-clock.js?v=20260612g" defer></script>
</body>
</html>`;
}

function createWordDirectory(data) {
  const wordDir = path.join(__dirname, '../../word-of-the-day', data.slug);
  
  if (fs.existsSync(wordDir)) {
    console.log(`⚠️  디렉토리가 이미 존재합니다: ${wordDir}`);
    return false;
  }
  
  fs.mkdirSync(wordDir, { recursive: true });
  console.log(`✅ 디렉토리 생성됨: ${wordDir}`);
  
  const staticHtml = generateStaticHtml(data, '');
  
  const htmlPath = path.join(wordDir, 'index.html');
  fs.writeFileSync(htmlPath, staticHtml, 'utf8');
  console.log(`✅ index.html 생성됨: ${htmlPath}`);
  
  return true;
}

function generateApiData(data) {
  const htmlMessage = generateHtmlMessage(data);
  
  return {
    title: `${data.word} | ${data.koreanMeaning}`,
    message: htmlMessage,
    nickname: data.nickname,
    password: data.password,
    isSecret: false,
    slug: data.slug,
    metaDescription: data.metaDescription
  };
}

function main() {
  console.log('📝 Word of the Day: palpable\n');
  console.log(`단어: ${WORD_DATA.word}`);
  console.log(`발음: ${WORD_DATA.pronunciation}`);
  console.log(`뜻: ${WORD_DATA.koreanMeaning}\n`);
  
  const created = createWordDirectory(WORD_DATA);
  
  if (!created) {
    console.log('\n❌ 파일 생성 실패');
    return;
  }
  
  const apiData = generateApiData(WORD_DATA);
  const apiDataPath = path.join(__dirname, `${WORD_DATA.slug}-api-data.json`);
  fs.writeFileSync(apiDataPath, JSON.stringify(apiData, null, 2), 'utf8');
  console.log(`✅ API 데이터 저장됨: ${apiDataPath}`);
  
  console.log('\n✅ 모든 작업 완료!');
  console.log(`\n📁 생성된 파일:`);
  console.log(`   - HTML: /workspace/word-of-the-day/${WORD_DATA.slug}/index.html`);
  console.log(`   - API 데이터: ${apiDataPath}`);
  
  console.log('\n📤 API에 전송하려면:');
  console.log(`   node scripts/post-word-to-api.js ${WORD_DATA.slug}`);
  
  console.log('\n🌐 접속 URL (API 전송 후):');
  console.log(`   https://englisheasystudy.com/word-of-the-day.html?slug=${WORD_DATA.slug}&api=prod`);
}

main();
