/**
 * 홈 리디자인 — 시안 섹션을 기존 API 데이터로 채움
 * URL·slug 경로는 ViewpostSeo / HomeBoardPreview 규칙 유지
 */
(function () {
  'use strict';

  var SOURCE_MAP = {
    wsj: 'WSJ',
    economist: 'Economist',
    cnn: 'CNN',
    bbc: 'BBC',
    koreaherald: 'Korea Herald',
    koreatimes: 'Korea Times',
    yonhap: 'Yonhap',
    nyt: 'NYT',
    reuters: 'Reuters',
    ft: 'FT'
  };

  function esc(s) {
    return String(s || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripHtml(html) {
    var d = document.createElement('div');
    d.innerHTML = String(html || '');
    return (d.textContent || d.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function latest(entries) {
    if (!entries || !entries.length) return null;
    return entries[entries.length - 1];
  }

  function reverseSlice(entries, n) {
    if (!entries || !entries.length) return [];
    return entries.slice().reverse().slice(0, n);
  }

  function parseTitleParts(title) {
    var raw = String(title || '').trim();
    var m = raw.match(/^\[([^\]]+)\]\s*(.*)$/);
    if (m) return { source: m[1].trim(), title: (m[2] || '').trim() || raw };
    var pipe = raw.split(/\s*\|\s*/);
    if (pipe.length >= 2) {
      return { source: '', title: pipe[0].trim(), meaning: pipe.slice(1).join(' | ').trim() };
    }
    return { source: '', title: raw, meaning: '' };
  }

  function sourceFromSlugOrHref(slug, href, fallback) {
    var s = String(slug || href || '').toLowerCase();
    var keys = Object.keys(SOURCE_MAP);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (s.indexOf('-' + key) !== -1 || s.indexOf('_' + key) !== -1 || s.endsWith(key)) {
        return SOURCE_MAP[key];
      }
    }
    if (fallback) return fallback;
    return '';
  }

  function extractImage(message) {
    var m = String(message || '').match(/<img[^>]+src=["']([^"']+)["']/i);
    return m ? m[1] : '';
  }

  function extractWotdFields(entry) {
    var parts = parseTitleParts(entry.title);
    var word = parts.title || 'Word';
    var meaning = parts.meaning || '';
    var msg = String(entry.message || '');
    var text = stripHtml(msg);
    if (!meaning) {
      var mm = text.match(/뜻(?:\(명사\)|\(동사\)|\(형용사\)|\(부사\))?\s*[:：]\s*([^\n.]+)/);
      if (!mm) mm = text.match(/명사\s*[:：]\s*([^\n/]+)/);
      if (mm) meaning = mm[1].trim();
    }
    var example = '';
    var ex = msg.match(/예문\s*1[\s\S]*?<p[^>]*>([^<]+)<\/p>/i);
    if (!ex) ex = msg.match(/wotd-example-heading[\s\S]*?<span[^>]*>[\s\S]*?([A-Za-z][^<]{20,160})/i);
    if (ex) example = stripHtml(ex[1] || ex[0]).slice(0, 180);
    if (!example) {
      var enLine = text.match(/\b([A-Z][^.]{30,160}\.)/);
      if (enLine) example = enLine[1];
    }
    var pos = '';
    if (/명사|noun/i.test(text)) pos = 'noun';
    else if (/동사|verb/i.test(text)) pos = 'verb';
    else if (/형용사|adjective/i.test(text)) pos = 'adjective';
    return {
      word: word,
      meaning: meaning || '오늘의 단어',
      pos: pos,
      example: example || '기사와 예문으로 의미를 확인해 보세요.',
      image: extractImage(msg),
      slug: entry.slug || word.toLowerCase().replace(/\s+/g, '-')
    };
  }

  function boardHref(board, entry, index) {
    if (window.HomeBoardPreview && entry && entry.href) return entry.href;
    var boards = {
      guestbook: { page: 'news-voca.html', postPath: 'news-voca', label: '국제' },
      'korea-news': { page: 'korea-news.html', postPath: 'korea-news', label: '한국' },
      'defense-news': { page: 'defense-news.html', postPath: 'defense-news', label: '국방' },
      wordofday: { page: 'word-of-the-day.html', postPath: 'word-of-the-day', label: '단어장' },
      'vocabulary-quiz': { page: 'vocabulary-quiz.html', label: '퀴즈' },
      'easy-voca': { page: 'popular-voca.html', postPath: 'popular-voca', label: '표현' },
      opinions: { page: 'english-opinions.html', postPath: 'english-opinions', label: '오피니언' },
      'culture-voca': { page: 'culture-voca.html', postPath: 'culture-voca', label: '컬쳐' },
      'calm-mind': { page: 'calm-mind.html', postPath: 'calm-mind', label: '마음글' },
      'english-quotes': { page: 'english-quotes.html', postPath: 'english-quotes', label: '명언' }
    };
    var b = boards[board] || { page: 'index.html' };
    var apiParam = '';
    if (board === 'wordofday') apiParam = '&api=prod';
    if (window.ViewpostSeo && window.ViewpostSeo.buildListPostHref) {
      return window.ViewpostSeo.buildListPostHref(entry, b.page, index, apiParam, b.postPath);
    }
    var slug = entry && String(entry.slug || '').trim();
    if (b.page === 'vocabulary-quiz.html' && slug) {
      return 'vocabulary-quiz.html?slug=' + encodeURIComponent(slug);
    }
    if (slug && b.postPath) return b.postPath + '/' + encodeURIComponent(slug) + '/';
    if (slug) return b.page + '?slug=' + encodeURIComponent(slug);
    return b.page + '?index=' + index;
  }

  function fetchEntries(path) {
    if (window.HomeBoardPreview && HomeBoardPreview.fetchBoardEntries) {
      return HomeBoardPreview.fetchBoardEntries(path);
    }
    return Promise.resolve([]);
  }

  function fillDateBar() {
    var el = document.getElementById('rd-date-label');
    if (!el) return;
    var d = new Date();
    var days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    el.textContent =
      d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' +
      days[d.getDay()] + ' · 오늘의 학습';
  }

  function renderHeroWord(entry, index) {
    var root = document.getElementById('rd-hero-word');
    if (!root || !entry) return;
    var f = extractWotdFields(entry);
    var href = boardHref('wordofday', entry, index);
    root.innerHTML =
      '<span class="rd-kicker">WORD OF THE DAY · 오늘의 단어</span>' +
      '<h1>' + esc(f.word) + '</h1>' +
      '<div class="rd-hero-meta">' +
        (f.pos ? '<span class="pos">' + esc(f.pos) + '</span>' : '') +
        '<span class="meaning">' + esc(f.meaning) + '</span>' +
      '</div>' +
      '<p class="rd-hero-example">' + esc(f.example) + '</p>' +
      '<div class="rd-hero-actions">' +
        '<a class="rd-btn rd-btn-solid" href="' + esc(href) + '">단어 자세히 보기</a>' +
        '<a class="rd-btn rd-btn-outline" href="vocabulary-quiz-list.html">오늘의 퀴즈 풀기</a>' +
      '</div>';
  }

  function renderHeroArticle(entry, index, label) {
    var root = document.getElementById('rd-hero-article');
    if (!root || !entry) return;
    var parts = parseTitleParts(entry.title);
    var src = sourceFromSlugOrHref(entry.slug, '', parts.source);
    var href = boardHref('guestbook', entry, index);
    var img = extractImage(entry.message);
    var desc = src
      ? src + ' 기사에서 뽑은 핵심 어휘로 읽어보세요.'
      : '국제 뉴스 어휘와 함께 읽어보세요.';
    root.href = href;
    root.innerHTML =
      '<span class="rd-kicker">오늘의 기사 · ' + esc(label || '국제') + '</span>' +
      '<div class="rd-hero-article-img">' +
        (img ? '<img src="' + esc(img) + '" alt="">' : '[기사 대표 이미지]') +
      '</div>' +
      '<span class="rd-hero-article-title">' + esc(parts.title) + '</span>' +
      '<span class="rd-hero-article-desc">' + esc(desc) + '</span>' +
      '<span class="rd-hero-article-cta">어휘와 함께 읽기 →</span>';
  }

  function mixNews(intl, korea, defense) {
    var items = [];
    function push(list, label, board, take) {
      reverseSlice(list, take).forEach(function (entry, i) {
        var total = list.length;
        var origIdx = total - 1 - i;
        var parts = parseTitleParts(entry.title);
        items.push({
          label: label,
          title: parts.title,
          source: sourceFromSlugOrHref(entry.slug, '', parts.source),
          href: boardHref(board, entry, origIdx),
          image: extractImage(entry.message),
          date: entry.date
        });
      });
    }
    push(intl, '국제', 'guestbook', 4);
    push(korea, '한국', 'korea-news', 3);
    push(defense, '국방', 'defense-news', 3);
    items.sort(function (a, b) {
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
    return items;
  }

  function renderNews(items) {
    var cardsEl = document.getElementById('rd-news-cards');
    var listEl = document.getElementById('rd-news-list');
    if (!cardsEl || !listEl) return;
    var cards = items.slice(0, 4);
    var list = items.slice(4, 8);
    cardsEl.innerHTML = cards.map(function (item) {
      var cat = item.label + (item.source ? ' · ' + item.source : '');
      return (
        '<a class="rd-news-card" href="' + esc(item.href) + '">' +
          '<div class="rd-news-card-img">' +
            (item.image ? '<img src="' + esc(item.image) + '" alt="">' : '[이미지]') +
          '</div>' +
          '<span class="cat">' + esc(cat) + '</span>' +
          '<span class="title">' + esc(item.title) + '</span>' +
        '</a>'
      );
    }).join('');
    listEl.innerHTML = list.map(function (item) {
      var cat = item.label + (item.source ? ' · ' + item.source : '');
      return (
        '<a href="' + esc(item.href) + '">' +
          '<span class="cat">' + esc(cat) + '</span>' +
          '<span class="title">' + esc(item.title) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderQuiz(entries) {
    var root = document.getElementById('rd-quiz-banner');
    if (!root) return;
    var entry = latest(entries);
    var words = '오늘의 단어 퀴즈';
    var href = 'vocabulary-quiz-list.html';
    if (entry) {
      var parts = parseTitleParts(entry.title);
      words = (parts.title || words).replace(/\s*\|\s*/g, ' · ');
      if (parts.meaning) words = words + ' · ' + parts.meaning.replace(/\s*\|\s*/g, ' · ');
      /* title이 "만병통치약 | 현실도피 | 기진맥진" 형태면 전체를 · 로 */
      words = String(entry.title || words).replace(/\s*\|\s*/g, ' · ');
      var idx = entries.length - 1;
      href = boardHref('vocabulary-quiz', entry, idx);
    }
    root.innerHTML =
      '<div>' +
        '<span class="label">TODAY\'S QUIZ</span>' +
        '<span class="words">' + esc(words) + '</span>' +
        '<span class="desc">세 단어, 영어로 알고 있나요? 1분이면 확인할 수 있어요.</span>' +
      '</div>' +
      '<a class="rd-btn" href="' + esc(href) + '">퀴즈 시작하기</a>';
  }

  function slugToPhraseEn(slug) {
    return String(slug || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); })
      .replace(/\bDont\b/g, "Don't")
      .replace(/\bIm\b/g, "I'm");
  }

  function renderPhrases(entries) {
    var root = document.getElementById('rd-phrase-grid');
    if (!root) return;
    var list = reverseSlice(entries, 5);
    root.innerHTML = list.map(function (entry, i) {
      var total = entries.length;
      var origIdx = total - 1 - i;
      var ko = String(entry.title || '').replace(/\s*영어로\??\s*$/i, '').trim() || '표현';
      var en = entry.slug ? slugToPhraseEn(entry.slug) : ko;
      return (
        '<a class="rd-phrase-card" href="' + esc(boardHref('easy-voca', entry, origIdx)) + '">' +
          '<span class="ko">' + esc(ko) + '</span>' +
          '<span class="en">' + esc(en) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderReadingCol(elId, listHref, label, entries, board) {
    var root = document.getElementById(elId);
    if (!root) return;
    var list = reverseSlice(entries, 2);
    var items = list.map(function (entry, i) {
      var total = entries.length;
      var origIdx = total - 1 - i;
      var parts = parseTitleParts(entry.title);
      var cls = board === 'english-quotes' ? 'item quote-en' : 'item';
      return '<a class="' + cls + '" href="' + esc(boardHref(board, entry, origIdx)) + '">' + esc(parts.title) + '</a>';
    }).join('');
    root.innerHTML =
      '<a class="col-link" href="' + esc(listHref) + '">' + esc(label) + ' →</a>' +
      items;
  }

  function boot() {
    fillDateBar();
    if (!window.HomeBoardPreview) return;

    Promise.all([
      fetchEntries('/wordofday'),
      fetchEntries('/guestbook'),
      fetchEntries('/korea-news'),
      fetchEntries('/defense-news'),
      fetchEntries('/vocabulary-quiz'),
      fetchEntries('/easy-voca'),
      fetchEntries('/opinions'),
      fetchEntries('/culture-voca'),
      fetchEntries('/calm-mind'),
      fetchEntries('/english-quotes')
    ]).then(function (results) {
      var wotd = results[0] || [];
      var intl = results[1] || [];
      var korea = results[2] || [];
      var defense = results[3] || [];
      var quiz = results[4] || [];
      var phrases = results[5] || [];
      var opinions = results[6] || [];
      var culture = results[7] || [];
      var calm = results[8] || [];
      var quotes = results[9] || [];

      var w = latest(wotd);
      if (w) renderHeroWord(w, wotd.length - 1);

      var a = latest(intl);
      if (a) renderHeroArticle(a, intl.length - 1, '국제');

      renderNews(mixNews(intl, korea, defense));
      renderQuiz(quiz);
      renderPhrases(phrases);
      renderReadingCol('rd-read-opinions', 'english-opinions-list.html', '오피니언', opinions, 'opinions');
      renderReadingCol('rd-read-culture', 'culture-voca-list.html', '컬쳐', culture, 'culture-voca');
      renderReadingCol('rd-read-calm', 'calm-mind-list.html', '마음 다스리는 글', calm, 'calm-mind');
      renderReadingCol('rd-read-quotes', 'english-quotes-list.html', '영어 명언', quotes, 'english-quotes');
    }).catch(function (err) {
      console.warn('home-redesign load error', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
