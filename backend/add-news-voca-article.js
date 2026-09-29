#!/usr/bin/env node
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Guestbook Entry Schema (same as backend)
const guestbookEntrySchema = new mongoose.Schema({
  title: String,
  message: String,
  nickname: String,
  password: String,
  slug: { type: String, default: '' },
  isSecret: { type: Boolean, default: false },
  metaDescription: { type: String, default: '' },
  date: { type: Date, default: Date.now },
});

const GuestbookEntry = mongoose.model('GuestbookEntry', guestbookEntrySchema);

// Helper function to create SEO directory and index.html
function createSeoDirectory(slug, title, metaDescription, publishDate) {
  const dirPath = path.join(__dirname, '..', 'news-voca', slug);
  
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const indexHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | News Voca · English Easy Study</title>
    <meta name="description" content="${metaDescription}">
    <meta name="robots" content="index, follow">
    <meta name="author" content="English Easy Study">
    <link rel="canonical" href="https://englisheasystudy.com/news-voca/${slug}/">
    <meta property="og:type" content="article">
    <meta property="og:locale" content="ko_KR">
    <meta property="og:site_name" content="English Easy Study">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${metaDescription}">
    <meta property="og:url" content="https://englisheasystudy.com/news-voca/${slug}/">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${metaDescription}">
    <meta name="google-adsense-account" content="ca-pub-6108574897789788">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6108574897789788" crossorigin="anonymous"></script>
    <script type="application/ld+json">{"@context":"https://schema.org","@type":"Article","headline":"${title}","description":"${metaDescription}","author":{"@type":"Organization","name":"English Easy Study"},"publisher":{"@type":"Organization","name":"English Easy Study","url":"https://englisheasystudy.com"},"datePublished":"${publishDate}","dateModified":"${publishDate}","mainEntityOfPage":{"@type":"WebPage","@id":"https://englisheasystudy.com/news-voca/${slug}/"},"inLanguage":["ko","en"]}</script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../page30_viewpost.css?v=20260702e">
    <link rel="stylesheet" href="../../news-voca.css?v=20260926barun">
    <link rel="stylesheet" href="../../title-text-sharp.css?v=20260610">
    <link rel="stylesheet" href="../../viewpost-like.css?v=20260625">
    <link rel="stylesheet" href="../../nav-home-menu.css?v=20260617">
    <link rel="stylesheet" href="../../navbar-unified.css?v=20260612c">
    <link rel="stylesheet" href="../../weather-banner.css?v=20260612g">
    <link rel="stylesheet" href="../../world-clock.css?v=20260612g">
</head>
<body data-nv-slug="${slug}">
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" aria-label="주 메뉴">
        <div class="container-fluid">
            <a class="navbar-brand" href="../../news-voca-list.html">뉴스 어휘</a>
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
    <script src="../../viewpost-meta.js?v=20260627"></script>
    <script src="../../viewpost-like.js?v=20260906heart"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../../nav-home-menu.js?v=20260618"></script>
    <script src="../../news-voca.js?v=20260702e"></script>
    <script src="../../weather-banner.js?v=20260612e" defer></script>
    <script src="../../world-clock.js?v=20260612g" defer></script>
</body>
</html>`;

  fs.writeFileSync(path.join(dirPath, 'index.html'), indexHtml);
    console.log(`✅ Created SEO directory and index.html at: ${dirPath}`);
  } catch (error) {
    console.error(`❌ Error creating SEO directory: ${error.message}`);
    throw error;
  }
}

// Main function to add article
async function addArticle(articleData) {
  const MONGO_URI = process.env.MONGO_URI;
  
  if (!MONGO_URI) {
    console.error('❌ Error: MONGO_URI environment variable is not set.');
    console.log('Please set MONGO_URI in a .env file or as an environment variable.');
    console.log('Example: MONGO_URI=mongodb://localhost:27017/englisheasystudy');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 20000 });
    console.log('✅ Connected to MongoDB');

    // Hash the password
    const hashedPassword = await bcrypt.hash(articleData.password, 10);

    // Create new entry
    const newEntry = new GuestbookEntry({
      title: articleData.title,
      message: articleData.message,
      nickname: articleData.nickname,
      password: hashedPassword,
      slug: articleData.slug,
      isSecret: articleData.isSecret || false,
      metaDescription: articleData.metaDescription || '',
      date: articleData.date || new Date(),
    });

    await newEntry.save();
    console.log('✅ Article saved to database');
    console.log(`   ID: ${newEntry._id}`);
    console.log(`   Slug: ${newEntry.slug}`);

    // Create SEO directory
    const publishDate = newEntry.date.toISOString().split('T')[0];
    createSeoDirectory(articleData.slug, articleData.title, articleData.metaDescription, publishDate);

    console.log('\n✅ Article created successfully!');
    console.log(`   View at: https://englisheasystudy.com/news-voca.html?slug=${articleData.slug}`);
    console.log(`   SEO URL: https://englisheasystudy.com/news-voca/${articleData.slug}/`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

// Example article data (you can modify this)
const exampleArticle = {
  title: '새로운 뉴스 어휘 예제',
  slug: 'example-news-article-slug',
  nickname: 'Admin',
  password: 'your-secure-password',
  metaDescription: 'BBC 기사에서 추출한 핵심 문장. 주요 단어와 예문을 정리했습니다.',
  message: `
<article>
  <header>
    <h1>Article Title</h1>
    <p class="article-meta">Source: BBC News | Date: 2026-09-29</p>
  </header>

  <section class="vocabulary-section">
    <h2>📚 핵심 어휘</h2>
    
    <div class="vocab-item">
      <h3>1. transfixed and divided</h3>
      <p class="pronunciation">[trænsˈfɪkst ənd dɪˈvaɪdɪd]</p>
      <p class="korean-meaning">완전히 사로잡혔으면서도 의견이 나뉘어진</p>
      <p class="example"><strong>Example:</strong> The case has left the nation transfixed and divided.</p>
      <p class="example-korean">그 사건은 국민들을 완전히 사로잡으면서도 의견을 나누게 만들었다.</p>
    </div>

    <div class="vocab-item">
      <h3>2. declared a mistrial</h3>
      <p class="pronunciation">[dɪˈklɛrd ə ˈmɪsˌtraɪəl]</p>
      <p class="korean-meaning">무효 재판을 선언하다</p>
      <p class="example"><strong>Example:</strong> The judge declared a mistrial due to jury disagreement.</p>
      <p class="example-korean">판사는 배심원들의 의견 불일치로 무효 재판을 선언했다.</p>
    </div>

    <div class="vocab-item">
      <h3>3. postpartum psychosis</h3>
      <p class="pronunciation">[ˌpoʊstˈpɑrtəm saɪˈkoʊsɪs]</p>
      <p class="korean-meaning">산후 정신병</p>
      <p class="example"><strong>Example:</strong> She was diagnosed with postpartum psychosis after giving birth.</p>
      <p class="example-korean">그녀는 출산 후 산후 정신병 진단을 받았다.</p>
    </div>
  </section>

  <section class="article-content">
    <h2>📰 원문 발췌</h2>
    <blockquote>
      <p>The trial has transfixed and divided the nation, with heated debates about mental health, criminal liability, and the limits of empathy.</p>
    </blockquote>
  </section>

  <footer class="article-footer">
    <p><strong>출처:</strong> BBC News</p>
    <p><strong>학습 포인트:</strong> 법률 관련 어휘, 정신 건강 관련 표현, 의견 대립을 나타내는 표현</p>
  </footer>
</article>
  `.trim(),
};

// Check if running with command line arguments
if (process.argv.length > 2) {
  // Parse command line JSON
  try {
    const articleData = JSON.parse(process.argv[2]);
    addArticle(articleData);
  } catch (error) {
    console.error('❌ Error parsing article data:', error.message);
    console.log('\nUsage: node add-news-voca-article.js \'{"title":"...","slug":"...","nickname":"...","password":"...","metaDescription":"...","message":"..."}\'');
  }
} else {
  // Use example article
  console.log('📝 Using example article data...');
  console.log('To use custom data, pass JSON as argument:');
  console.log('node add-news-voca-article.js \'{"title":"...","slug":"...","nickname":"...","password":"...","metaDescription":"...","message":"..."}\'');
  console.log('');
  addArticle(exampleArticle);
}
