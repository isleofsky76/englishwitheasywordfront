import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const WORD_DATA = {
  word: 'perpetual',
  pronunciation: '/pərˈpetʃ.u.əl/',
  partOfSpeech: 'adjective',
  
  koreanMeaning: '영구적인, 끊임없는, 지속적인',
  
  englishDefinition: 'continuing forever or for a long time without stopping',
  
  examples: [
    {
      en: 'She lives in perpetual fear of being discovered.',
      ko: '그녀는 발각될까 봐 끊임없는 두려움 속에 살고 있다.'
    },
    {
      en: 'The perpetual noise from the construction site was annoying.',
      ko: '공사장에서 나는 끊임없는 소음이 짜증스러웠다.'
    },
    {
      en: 'He seemed to be in a state of perpetual confusion.',
      ko: '그는 끊임없이 혼란스러운 상태에 있는 것 같았다.'
    },
    {
      en: 'The garden requires perpetual care and attention.',
      ko: '정원은 지속적인 관리와 관심이 필요하다.'
    }
  ],
  
  keyPhrases: [
    {
      phrase: 'perpetual motion',
      meaning: '영구 운동, 끊임없는 움직임'
    },
    {
      phrase: 'perpetual calendar',
      meaning: '만년 달력'
    },
    {
      phrase: 'in perpetual fear',
      meaning: '끊임없는 두려움에'
    }
  ],
  
  synonyms: ['continuous', 'constant', 'endless', 'eternal', 'everlasting', 'permanent'],
  
  slug: 'perpetual',
  metaDescription: 'perpetual 뜻과 예문. 영구적인, 끊임없는, 지속적인, perpetual motion, perpetual calendar, in perpetual fear.',
  
  nickname: 'English Easy Study',
  password: 'english2024',
  
  // Imgur 이미지 URL (무한 루프, 시계, 영구적인 것을 상징하는 이미지)
  imageFile: 'https://i.imgur.com/8rKCJQX.jpg',  // 예시 URL - 실제 이미지로 교체 필요
  imageIsUrl: true
};

function generateTextContent(data) {
  // 기존 precaution 양식과 동일한 단순 텍스트 형식
  
  const keyPhrasesText = data.keyPhrases.map(phrase => 
    `${phrase.phrase}: ${phrase.meaning}`
  ).join('\n');
  
  const examplesText = data.examples.map((ex, idx) => 
    `예문 ${idx + 1}\n${ex.en}\n${ex.ko}`
  ).join('\n\n');
  
  return `
${data.word}

발음: ${data.pronunciation}

${data.partOfSpeech}: ${data.koreanMeaning}

${keyPhrasesText}

📌 의미:
${data.englishDefinition}

${examplesText}

💡 핵심 뉘앙스:
${data.word} → ${data.koreanMeaning}을 의미하며, ${data.synonyms.slice(0, 3).join(', ')} 등과 유사한 의미로 사용됩니다.

유의어: ${data.synonyms.join(', ')}
`.trim();
}

function generateStaticHtml(data) {
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

function createWordDirectory(data) {
  const wordDir = path.join(__dirname, '../../word-of-the-day', data.slug);
  
  if (fs.existsSync(wordDir)) {
    console.log(`⚠️  디렉토리가 이미 존재합니다: ${wordDir}`);
    return false;
  }
  
  fs.mkdirSync(wordDir, { recursive: true });
  console.log(`✅ 디렉토리 생성됨: ${wordDir}`);
  
  const staticHtml = generateStaticHtml(data);
  
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

function main() {
  console.log('📝 Word of the Day: perpetual\n');
  console.log(`단어: ${WORD_DATA.word}`);
  console.log(`발음: ${WORD_DATA.pronunciation}`);
  console.log(`뜻: ${WORD_DATA.koreanMeaning}`);
  console.log(`이미지: ${WORD_DATA.imageFile}\n`);
  
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
  console.log(`   - 이미지: ${WORD_DATA.imageFile} (Imgur URL)`);
  console.log(`   - API 데이터: ${apiDataPath}`);
  
  console.log('\n📤 API에 전송하려면:');
  console.log(`   node scripts/post-word-to-api.js ${WORD_DATA.slug}`);
  
  console.log('\n🌐 접속 URL (API 전송 후):');
  console.log(`   https://englisheasystudy.com/word-of-the-day.html?slug=${WORD_DATA.slug}&api=prod`);
}

main();
