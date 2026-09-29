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
  // OG 이미지 메타 태그 추가
  const ogImageTag = data.imageFile ? `
    <meta property="og:image" content="https://englisheasystudy.com/word-of-the-day/${data.slug}/${data.imageFile}">
    <meta name="twitter:image" content="https://englisheasystudy.com/word-of-the-day/${data.slug}/${data.imageFile}">
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
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${data.word} | ${data.koreanMeaning}","description":"${data.metaDescription}","author":{"@type":"Organization","name":"English Easy Study"},"publisher":{"@type":"Organization","name":"English Easy Study","url":"https://englisheasystudy.com"},"datePublished":"${new Date().toISOString().split('T')[0]}","dateModified":"${new Date().toISOString().split('T')[0]}","mainEntityOfPage":{"@type":"WebPage","@id":"https://englisheasystudy.com/word-of-the-day/${data.slug}"},"inLanguage":["ko","en"]${data.imageFile ? `,"image":"https://englisheasystudy.com/word-of-the-day/${data.slug}/${data.imageFile}"` : ''}}</script>
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
    <style>
    .wotd-image-section {
      margin: 1.5rem 0;
      text-align: center;
    }
    .wotd-main-image {
      max-width: 100%;
      height: auto;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-height: 400px;
      object-fit: cover;
    }
    </style>
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
  console.log('\n📝 Word of the Day 생성 (이미지 포함)\n');
  console.log('각 항목을 입력하세요:\n');
  
  const data = {};
  
  // 기본 정보
  data.word = await question('단어 (영어): ');
  data.pronunciation = await question('발음 기호 (예: /ˈel.ə.kwənt/): ');
  data.partOfSpeech = await question('품사 (예: noun, verb, adjective): ');
  data.koreanMeaning = await question('한글 뜻: ');
  data.englishDefinition = await question('영어 정의: ');
  
  // 이미지 파일
  console.log('\n📷 이미지 파일 (선택사항):');
  console.log('   방법 1: 이미지 파일 경로 입력 (예: /path/to/image.jpg)');
  console.log('   방법 2: 이미지 URL 입력 (예: https://example.com/image.jpg)');
  console.log('   방법 3: 나중에 수동으로 추가 (빈 칸)');
  const imageInput = await question('이미지: ');
  
  if (imageInput.trim()) {
    if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
      // URL인 경우
      data.imageFile = imageInput;
      data.imageIsUrl = true;
    } else if (fs.existsSync(imageInput)) {
      // 로컬 파일인 경우
      data.imageSourcePath = imageInput;
      const ext = path.extname(imageInput);
      data.imageFile = `${data.word.toLowerCase()}${ext}`;
      data.imageIsUrl = false;
    } else {
      console.log('⚠️  파일을 찾을 수 없습니다. 이미지 없이 진행합니다.');
      data.imageFile = null;
    }
  } else {
    data.imageFile = null;
  }
  
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
  
  // 이미지 파일 복사 (로컬 파일인 경우)
  if (data.imageSourcePath && !data.imageIsUrl) {
    try {
      const destPath = path.join(wordDir, data.imageFile);
      fs.copyFileSync(data.imageSourcePath, destPath);
      console.log(`✅ 이미지 복사됨: ${destPath}`);
    } catch (error) {
      console.log(`⚠️  이미지 복사 실패: ${error.message}`);
      data.imageFile = null;
    }
  }
  
    const staticHtml = generateStaticHtml(data, '');
  
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

async function main() {
  try {
    const data = await collectWordData();
    
    console.log('\n📊 입력된 데이터:');
    console.log(JSON.stringify({
      ...data,
      password: '***',
      imageSourcePath: data.imageSourcePath ? '(경로 생략)' : undefined
    }, null, 2));
    
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
    if (data.imageFile && !data.imageIsUrl) {
      console.log(`   - 이미지: /workspace/word-of-the-day/${data.slug}/${data.imageFile}`);
    }
    console.log(`   - API 데이터: ${apiDataPath}`);
    
    if (data.imageFile && !data.imageIsUrl) {
      console.log('\n📤 다음 명령어로 GitHub에 푸시하세요:');
      console.log(`   git add word-of-the-day/${data.slug}/`);
      console.log(`   git commit -m "Add Word of the Day: ${data.word}"`);
      console.log(`   git push`);
    }
    
    console.log('\n📤 API에 전송하려면:');
    console.log(`   node scripts/post-word-to-api.js ${data.slug}`);
    
    rl.close();
  } catch (error) {
    console.error('❌ 오류 발생:', error);
    rl.close();
  }
}

main();
