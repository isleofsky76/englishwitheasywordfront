import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Word of the Day 생성 스크립트
 * 
 * 사용법:
 * node scripts/create-word-of-day.js
 * 
 * 이 스크립트는:
 * 1. word-of-the-day 폴더에 새로운 단어 디렉토리와 index.html 생성
 * 2. API에 POST 할 수 있는 데이터 구조 출력
 */

const WORD_DATA = {
  // 단어 정보
  word: 'eloquent',
  pronunciation: '/ˈel.ə.kwənt/',
  partOfSpeech: 'adjective',
  
  // 한글 뜻
  koreanMeaning: '웅변의, 능변의, 설득력 있는',
  
  // 영어 정의
  englishDefinition: 'fluent or persuasive in speaking or writing',
  
  // 예문들
  examples: [
    {
      en: 'She gave an eloquent speech about climate change.',
      ko: '그녀는 기후 변화에 대해 설득력 있는 연설을 했다.'
    },
    {
      en: 'His eloquent words moved the audience to tears.',
      ko: '그의 웅변적인 말이 청중을 눈물짓게 했다.'
    },
    {
      en: 'The lawyer made an eloquent argument in defense of his client.',
      ko: '변호사는 의뢰인을 변호하기 위해 설득력 있는 주장을 했다.'
    }
  ],
  
  // 주요 표현
  keyPhrases: [
    {
      phrase: 'eloquent speech',
      meaning: '웅변적인 연설'
    },
    {
      phrase: 'eloquent writer',
      meaning: '능변의 작가'
    },
    {
      phrase: 'eloquent testimony',
      meaning: '설득력 있는 증언'
    }
  ],
  
  // 유의어
  synonyms: ['articulate', 'fluent', 'persuasive', 'expressive'],
  
  // 메타 정보
  slug: 'eloquent',
  metaDescription: 'eloquent 뜻과 예문. 웅변의, 능변의, 설득력 있는, eloquent speech, eloquent writer, eloquent testimony.',
  
  // 작성자 정보
  nickname: 'admin',
  password: 'your-password-here' // 실제 사용 시 변경 필요
};

function generateTextContent(data) {
  // precaution 양식과 동일한 단순 텍스트 형식 + 노란색 하이라이트
  
  const keyPhrasesText = data.keyPhrases.map(phrase => 
    `<mark>${phrase.phrase}</mark>: ${phrase.meaning}`
  ).join('\n');
  
  const examplesText = data.examples.map((ex, idx) => {
    // 주요 단어를 하이라이트
    const highlightedEn = ex.en.replace(new RegExp(`\\b${data.word}\\b`, 'gi'), '<mark>$&</mark>');
    const highlightedKo = ex.ko.replace(new RegExp(data.koreanMeaning.split(',')[0].trim(), 'g'), '<mark>$&</mark>');
    
    return `예문 ${idx + 1}\n${highlightedEn}\n${highlightedKo}`;
  }).join('\n\n');
  
  return `
${data.word}

발음: ${data.pronunciation}

${data.partOfSpeech}: <mark>${data.koreanMeaning}</mark>

${keyPhrasesText}

📌 의미:
<mark>${data.englishDefinition}</mark>

${examplesText}

💡 핵심 뉘앙스:
<mark>${data.word}</mark> → ${data.koreanMeaning}을 의미하며, <mark>${data.synonyms.slice(0, 3).join(', ')}</mark> 등과 유사한 의미로 사용됩니다.

유의어: ${data.synonyms.join(', ')}
`.trim();
}

function generateStaticHtml(data, htmlContent) {
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
    <meta property="og:url" content="https://englisheasystudy.com/word-of-the-day/${data.slug}">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${data.word} | ${data.koreanMeaning}">
    <meta name="twitter:description" content="${data.metaDescription}">
    <meta name="google-adsense-account" content="ca-pub-6108574897789788">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108574897789788" crossorigin="anonymous"></script>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${data.word} | ${data.koreanMeaning}","description":"${data.metaDescription}","author":{"@type":"Organization","name":"English Easy Study"},"publisher":{"@type":"Organization","name":"English Easy Study","url":"https://englisheasystudy.com"},"datePublished":"${new Date().toISOString().split('T')[0]}","dateModified":"${new Date().toISOString().split('T')[0]}","mainEntityOfPage":{"@type":"WebPage","@id":"https://englisheasystudy.com/word-of-the-day/${data.slug}"},"inLanguage":["ko","en"]}</script>
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
  
  // 디렉토리가 이미 존재하는지 확인
  if (fs.existsSync(wordDir)) {
    console.log(`⚠️  디렉토리가 이미 존재합니다: ${wordDir}`);
    console.log('계속하려면 기존 디렉토리를 삭제하거나 다른 slug를 사용하세요.');
    return false;
  }
  
  // 디렉토리 생성
  fs.mkdirSync(wordDir, { recursive: true });
  console.log(`✅ 디렉토리 생성됨: ${wordDir}`);
  
  // HTML 콘텐츠 생성
  const staticHtml = generateStaticHtml(data, '');
  
  // index.html 파일 작성
  const htmlPath = path.join(wordDir, 'index.html');
  fs.writeFileSync(htmlPath, staticHtml, 'utf8');
  console.log(`✅ index.html 생성됨: ${htmlPath}`);
  
  return true;
}

function generateApiData(data) {
  const textContent = generateTextContent(data);
  
  return {
    title: `${data.word} | ${data.koreanMeaning}`,
    message: textContent,
    nickname: data.nickname,
    password: data.password,
    isSecret: false,
    slug: data.slug,
    metaDescription: data.metaDescription
  };
}

// 메인 실행
function main() {
  console.log('📝 Word of the Day 생성 스크립트\n');
  console.log(`단어: ${WORD_DATA.word}`);
  console.log(`발음: ${WORD_DATA.pronunciation}`);
  console.log(`뜻: ${WORD_DATA.koreanMeaning}\n`);
  
  // 1. 정적 HTML 파일 생성
  console.log('1️⃣ 정적 HTML 파일 생성 중...');
  const created = createWordDirectory(WORD_DATA);
  
  if (!created) {
    console.log('\n❌ 파일 생성 실패');
    return;
  }
  
  // 2. API 데이터 생성
  console.log('\n2️⃣ API 데이터 생성 중...');
  const apiData = generateApiData(WORD_DATA);
  const apiDataPath = path.join(__dirname, `${WORD_DATA.slug}-api-data.json`);
  fs.writeFileSync(apiDataPath, JSON.stringify(apiData, null, 2), 'utf8');
  console.log(`✅ API 데이터 저장됨: ${apiDataPath}`);
  
  // 3. curl 명령어 생성
  console.log('\n3️⃣ API에 데이터를 전송하려면 다음 명령어를 사용하세요:\n');
  console.log('curl -X POST \\');
  console.log('  https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday \\');
  console.log('  -H "Content-Type: application/json" \\');
  console.log(`  -d @${apiDataPath}`);
  
  console.log('\n또는 Node.js로 직접 전송:');
  console.log('\nnode scripts/post-word-to-api.js ' + WORD_DATA.slug);
  
  console.log('\n✅ 모든 작업 완료!');
  console.log(`\n📁 생성된 파일 위치:`);
  console.log(`   - HTML: /workspace/word-of-the-day/${WORD_DATA.slug}/index.html`);
  console.log(`   - API 데이터: ${apiDataPath}`);
}

main();
