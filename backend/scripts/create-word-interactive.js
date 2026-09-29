import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function generateHtmlContent(data) {
  const examplesHtml = data.examples.map((ex, idx) => `
    <div class="wotd-example">
      <div class="example-number">${idx + 1}</div>
      <div class="example-text">
        <div class="example-en">${ex.en}</div>
        <div class="example-ko">${ex.ko}</div>
      </div>
    </div>
  `).join('\n');

  const keyPhrasesHtml = data.keyPhrases.map(phrase => `
    <li><strong>${phrase.phrase}</strong> - ${phrase.meaning}</li>
  `).join('\n');

  const synonymsHtml = data.synonyms.map(syn => `<span class="synonym-tag">${syn}</span>`).join(' ');

  return `<article class="wotd-card">
  <header class="wotd-header">
    <h1 class="wotd-word">${data.word}</h1>
    <div class="wotd-pronunciation">
      <button class="tts-button" data-wotd-tts="${data.word}" type="button" aria-label="발음 듣기" title="발음 듣기">
        🔊
      </button>
      <span class="pronunciation-text">${data.pronunciation}</span>
    </div>
    <span class="wotd-pos">${data.partOfSpeech}</span>
  </header>

  <section class="wotd-meaning">
    <h2 class="section-title">뜻</h2>
    <div class="meaning-ko">${data.koreanMeaning}</div>
    <div class="meaning-en">${data.englishDefinition}</div>
  </section>

  <section class="wotd-examples">
    <h2 class="section-title">예문</h2>
    ${examplesHtml}
  </section>

  <section class="wotd-phrases">
    <h2 class="section-title">주요 표현</h2>
    <ul class="phrases-list">
      ${keyPhrasesHtml}
    </ul>
  </section>

  <section class="wotd-synonyms">
    <h2 class="section-title">유의어</h2>
    <div class="synonyms-container">
      ${synonymsHtml}
    </div>
  </section>

  <footer class="wotd-footer">
    <p>💡 오늘의 단어를 활용하여 영어 실력을 향상시켜보세요!</p>
  </footer>
</article>`;
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

async function collectWordData() {
  console.log('\n📝 Word of the Day 생성\n');
  console.log('각 항목을 입력하세요 (여러 줄 입력은 빈 줄로 종료):\n');
  
  const data = {};
  
  // 기본 정보
  data.word = await question('단어 (영어): ');
  data.pronunciation = await question('발음 기호 (예: /ˈel.ə.kwənt/): ');
  data.partOfSpeech = await question('품사 (예: noun, verb, adjective): ');
  data.koreanMeaning = await question('한글 뜻: ');
  data.englishDefinition = await question('영어 정의: ');
  
  // 예문
  console.log('\n예문을 입력하세요 (최소 3개):');
  data.examples = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`\n예문 ${i}:`);
    const en = await question('  영어: ');
    const ko = await question('  한글: ');
    data.examples.push({ en, ko });
  }
  
  const moreExamples = await question('\n더 많은 예문을 추가하시겠습니까? (y/n): ');
  if (moreExamples.toLowerCase() === 'y') {
    let i = 4;
    while (true) {
      console.log(`\n예문 ${i} (빈 줄로 종료):`);
      const en = await question('  영어: ');
      if (!en.trim()) break;
      const ko = await question('  한글: ');
      data.examples.push({ en, ko });
      i++;
    }
  }
  
  // 주요 표현
  console.log('\n주요 표현을 입력하세요 (최소 3개):');
  data.keyPhrases = [];
  for (let i = 1; i <= 3; i++) {
    console.log(`\n표현 ${i}:`);
    const phrase = await question('  표현: ');
    const meaning = await question('  뜻: ');
    data.keyPhrases.push({ phrase, meaning });
  }
  
  // 유의어
  console.log('\n유의어를 입력하세요 (쉼표로 구분):');
  const synonymsInput = await question('유의어: ');
  data.synonyms = synonymsInput.split(',').map(s => s.trim()).filter(s => s);
  
  // 메타 정보
  data.slug = await question('\nSlug (URL용, 예: eloquent): ') || data.word.toLowerCase();
  
  // 메타 설명 자동 생성
  const phrasesList = data.keyPhrases.map(p => p.phrase).join(', ');
  data.metaDescription = `${data.word} 뜻과 예문. ${data.koreanMeaning}, ${phrasesList}.`;
  const confirmMeta = await question(`\nMeta Description (Enter로 기본값 사용):\n[${data.metaDescription}]\n수정: `);
  if (confirmMeta.trim()) {
    data.metaDescription = confirmMeta;
  }
  
  // 작성자 정보
  data.nickname = 'English Easy Study';
  data.password = await question('\n비밀번호 (게시물 관리용): ');
  
  return data;
}

function createWordDirectory(data) {
  const wordDir = path.join(__dirname, '../../word-of-the-day', data.slug);
  
  if (fs.existsSync(wordDir)) {
    console.log(`\n⚠️  디렉토리가 이미 존재합니다: ${wordDir}`);
    return false;
  }
  
  fs.mkdirSync(wordDir, { recursive: true });
  console.log(`\n✅ 디렉토리 생성됨: ${wordDir}`);
  
  const htmlContent = generateHtmlContent(data);
  const staticHtml = generateStaticHtml(data, htmlContent);
  
  const htmlPath = path.join(wordDir, 'index.html');
  fs.writeFileSync(htmlPath, staticHtml, 'utf8');
  console.log(`✅ index.html 생성됨: ${htmlPath}`);
  
  return true;
}

function generateApiData(data) {
  const htmlContent = generateHtmlContent(data);
  
  return {
    title: `${data.word} | ${data.koreanMeaning}`,
    message: htmlContent,
    nickname: data.nickname,
    password: data.password,
    isSecret: false,
    slug: data.slug,
    metaDescription: data.metaDescription
  };
}

async function main() {
  try {
    const data = await collectWordData();
    
    console.log('\n📊 입력된 데이터:');
    console.log(JSON.stringify(data, null, 2));
    
    const confirm = await question('\n이 데이터로 파일을 생성하시겠습니까? (y/n): ');
    if (confirm.toLowerCase() !== 'y') {
      console.log('취소되었습니다.');
      rl.close();
      return;
    }
    
    const created = createWordDirectory(data);
    
    if (!created) {
      console.log('\n❌ 파일 생성 실패');
      rl.close();
      return;
    }
    
    const apiData = generateApiData(data);
    const apiDataPath = path.join(__dirname, `${data.slug}-api-data.json`);
    fs.writeFileSync(apiDataPath, JSON.stringify(apiData, null, 2), 'utf8');
    console.log(`✅ API 데이터 저장됨: ${apiDataPath}`);
    
    console.log('\n✅ 모든 작업 완료!');
    console.log(`\n📁 생성된 파일:`);
    console.log(`   - HTML: /workspace/word-of-the-day/${data.slug}/index.html`);
    console.log(`   - API 데이터: ${apiDataPath}`);
    
    console.log('\n📤 API에 전송하려면:');
    console.log(`   node scripts/post-word-to-api.js ${data.slug}`);
    
    rl.close();
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    rl.close();
  }
}

main();
