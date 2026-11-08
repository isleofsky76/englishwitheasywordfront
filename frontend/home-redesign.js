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

  /** 방문마다 다른 항목 — 원본 인덱스 유지(링크용) */
  function randomIndexed(entries, n) {
    var list = (entries || []).map(function (entry, index) {
      return { entry: entry, index: index };
    });
    if (!list.length) return [];
    return shuffleInPlace(list).slice(0, Math.max(0, Number(n) || 0));
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
    var raw = String(message || '');
    var m = raw.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (!m) m = raw.match(/src=["']([^"']+\.(?:jpg|jpeg|png|webp|gif)[^"']*)["']/i);
    return m ? m[1] : '';
  }

  /** 홈 뉴스 카드용 — 대표 단어 1개 + 뜻 */
  function extractHeroKeyword(entry) {
    var word = '';
    var meaning = '';

    function take(expr, ko) {
      var en = String(expr || '').replace(/\s+/g, ' ').trim();
      if (!en || !/[A-Za-z]/.test(en) || en.length > 48) return false;
      word = en;
      meaning = String(ko || '').replace(/\s+/g, ' ').trim();
      return true;
    }

    if (entry && Array.isArray(entry.wordMeta)) {
      for (var i = 0; i < entry.wordMeta.length; i += 1) {
        var w = entry.wordMeta[i];
        if (w && take(w.expression || w.en || w.word, w.meaning || w.ko || w.meaningKo)) break;
      }
    }
    if (!word && entry && Array.isArray(entry.words)) {
      for (var j = 0; j < entry.words.length; j += 1) {
        var w2 = entry.words[j];
        if (!w2) continue;
        if (typeof w2 === 'string') {
          if (take(w2, '')) break;
        } else if (take(w2.expression || w2.en || w2.word, w2.meaning || w2.ko)) {
          break;
        }
      }
    }

    var msg = entry && entry.message ? String(entry.message) : '';
    if (!word && msg) {
      var cf = /cf\.\s*([^:<（(]+?)\s*[:：]\s*([^<\n]+)/i.exec(msg);
      if (cf) take(stripHtml(cf[1]), stripHtml(cf[2]));
    }
    if (!word && msg) {
      var mark = /<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>/i.exec(msg);
      if (mark) take(stripHtml(mark[1]), '');
    }
    if (!word) return null;
    return { expression: word, meaning: meaning };
  }

  function newsKeywordThumbHtml(item) {
    var word = (item && item.word) || '';
    var meaning = (item && item.meaning) || '';
    if (!word) {
      var title = String((item && item.title) || '');
      var en = title.match(/[A-Za-z][A-Za-z0-9'\/.\s-]{1,40}/);
      word = en ? en[0].trim() : 'NEWS';
    }
    return (
      '<div class="rd-news-kw">' +
        '<p class="rd-news-kw-word">' + esc(word) + '</p>' +
        (meaning ? '<p class="rd-news-kw-sub">' + esc(meaning) + '</p>' : '') +
      '</div>'
    );
  }

  /** 본문 img → slug/단어 resources 경로 순으로 썸네일 후보 */
  function resolveWotdThumb(entry, fields) {
    var f = fields || {};
    var fromMsg = f.image || extractImage(entry && entry.message);
    if (fromMsg) return fromMsg;
    var slug = String((entry && entry.slug) || f.slug || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-');
    var word = String(f.word || '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, '-');
    if (slug) return '/resources/' + slug + '.jpg';
    if (word) return '/resources/' + word + '.jpg';
    return '';
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
      'economy-news': { page: 'economy-news.html', postPath: 'economy-news', label: '경제' },
      'travel-news': { page: 'travel-news.html', postPath: 'travel-news', label: '여행' },
      wordofday: { page: 'word-of-the-day.html', postPath: 'word-of-the-day', label: '단어장' },
      'vocabulary-quiz': { page: 'vocabulary-quiz.html', label: '시사 어휘 퀴즈' },
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
      '</div>';
    renderHeroWotdMedia(entry, index, f, href);
  }

  /** 기사 카드 자리 — 오늘의 단어 이미지 썸네일 → 본문 연결 */
  function renderHeroWotdMedia(entry, index, fields, href) {
    var root = document.getElementById('rd-hero-media');
    if (!root || !entry) return;
    var f = fields || extractWotdFields(entry);
    var link = href || boardHref('wordofday', entry, index);
    var img = resolveWotdThumb(entry, f);
    root.href = link;
    root.setAttribute('aria-label', f.word + ' 자세히 보기');
    if (!img) {
      root.innerHTML =
        '<div class="rd-hero-media-img is-empty"></div>' +
        '<span class="rd-hero-media-cta">단어 자세히 보기 →</span>';
      return;
    }
    root.innerHTML =
      '<div class="rd-hero-media-img">' +
        '<img src="' + esc(img) + '" alt="' + esc(f.word) + '" ' +
          'onerror="this.onerror=null;this.closest(\'.rd-hero-media-img\').classList.add(\'is-empty\');this.remove();">' +
      '</div>';
  }

  function mixNews(intl, korea, defense, economy, travel) {
    var items = [];
    function push(list, label, board, take) {
      reverseSlice(list, take).forEach(function (entry, i) {
        var total = list.length;
        var origIdx = total - 1 - i;
        var parts = parseTitleParts(entry.title);
        var hero = extractHeroKeyword(entry);
        items.push({
          label: label,
          title: parts.title,
          source: sourceFromSlugOrHref(entry.slug, '', parts.source),
          href: boardHref(board, entry, origIdx),
          image: extractImage(entry.message),
          word: hero ? hero.expression : '',
          meaning: hero ? hero.meaning : '',
          date: entry.date
        });
      });
    }
    push(intl, '국제', 'guestbook', 3);
    push(korea, '한국', 'korea-news', 2);
    push(defense, '국방', 'defense-news', 2);
    push(economy, '경제', 'economy-news', 3);
    push(travel || [], '여행', 'travel-news', 2);
    items.sort(function (a, b) {
      return new Date(b.date || 0) - new Date(a.date || 0);
    });
    return items;
  }

  function linkAttrs(href) {
    if (/youtube\.com|youtu\.be/i.test(String(href || ''))) {
      return ' target="_blank" rel="noopener noreferrer"';
    }
    return '';
  }

  function renderNews(items) {
    var cardsEl = document.getElementById('rd-news-cards');
    var listEl = document.getElementById('rd-news-list');
    if (!cardsEl || !listEl) return;
    var cards = items.slice(0, 4);
    var list = items.slice(4, 8);
    cardsEl.innerHTML = cards.map(function (item) {
      return (
        '<a class="rd-news-card rd-news-card--kw" href="' + esc(item.href) + '"' + linkAttrs(item.href) + '>' +
          newsKeywordThumbHtml(item) +
          '<span class="cat">' + esc(item.label) + '</span>' +
          '<span class="title">' + esc(item.title) + '</span>' +
        '</a>'
      );
    }).join('');
    listEl.innerHTML = list.map(function (item) {
      var cat = item.label + (item.source ? ' · ' + item.source : '');
      return (
        '<a href="' + esc(item.href) + '"' + linkAttrs(item.href) + '>' +
          '<span class="cat">' + esc(cat) + '</span>' +
          '<span class="title">' + esc(item.title) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function formatQuizTitle(title) {
    var t = String(title || '').trim();
    if (!t) return '시사 어휘 퀴즈';
    if (/시사\s*어휘\s*퀴즈\s*$/.test(t)) {
      return t.replace(/\s*시사\s*어휘\s*퀴즈\s*$/, ' 시사 어휘 퀴즈').replace(/^\s+/, '');
    }
    if (/\s*퀴즈\s*$/.test(t)) {
      return t.replace(/\s*퀴즈\s*$/, '') + ' 시사 어휘 퀴즈';
    }
    return t;
  }

  function renderQuiz(entries) {
    var root = document.getElementById('rd-quiz-banner');
    if (!root) return;
    var entry = latest(entries);
    var words = '오늘의 시사 어휘 퀴즈';
    var href = 'vocabulary-quiz-list.html';
    if (entry) {
      var parts = parseTitleParts(entry.title);
      words = (parts.title || words).replace(/\s*\|\s*/g, ' · ');
      if (parts.meaning) words = words + ' · ' + parts.meaning.replace(/\s*\|\s*/g, ' · ');
      /* title이 "만병통치약 | 현실도피 | 기진맥진" 형태면 전체를 · 로 */
      words = formatQuizTitle(String(entry.title || words)).replace(/\s*\|\s*/g, ' · ');
      var idx = entries.length - 1;
      href = boardHref('vocabulary-quiz', entry, idx);
    }
    root.innerHTML =
      '<div>' +
        '<span class="label">TODAY\'S QUIZ</span>' +
        '<span class="words">' + esc(words) + '</span>' +
        '<span class="desc">세 단어, 영어로 알고 있나요? 1분이면 확인할 수 있어요.</span>' +
      '</div>' +
      '<a class="rd-btn" href="' + esc(href) + '">시사 어휘 퀴즈 시작</a>';
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

  function expressionsApiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') return window.getPage30ApiBaseUrl();
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://' + window.location.hostname + ':3000';
    }
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function shuffleInPlace(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  /** 방문(로드)마다 다른 N개. 서버 random 지원 시 그대로, 아니면 풀에서 셔플. */
  function fetchDailyExpressions(limit) {
    var n = Number(limit) || 5;
    var base = expressionsApiBase().replace(/\/$/, '');
    return fetch(base + '/api/expressions?limit=' + n + '&random=1', {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    })
      .then(function (r) {
        if (!r.ok) throw new Error('expressions HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var items = Array.isArray(data && data.items) ? data.items.slice() : [];
        if (data && data.random) return items.slice(0, n);
        /* 구 API: 앞쪽 고정 목록만 오므로 더 받아 셔플 */
        if (items.length <= n) {
          return fetch(base + '/api/expressions?limit=100', {
            headers: { Accept: 'application/json' },
            cache: 'no-store'
          })
            .then(function (r2) {
              if (!r2.ok) return items;
              return r2.json();
            })
            .then(function (data2) {
              var pool = Array.isArray(data2 && data2.items) ? data2.items.slice() : items;
              return shuffleInPlace(pool).slice(0, n);
            });
        }
        return shuffleInPlace(items).slice(0, n);
      })
      .catch(function () {
        return [];
      });
  }

  function renderDailyLines(items) {
    var root = document.getElementById('rd-daily-grid');
    if (!root || !items || !items.length) return;
    root.innerHTML = items.slice(0, 5).map(function (it) {
      var ko = String((it && it.ko) || '').trim() || '표현';
      var en = String((it && it.en) || '').trim() || ko;
      var href = 'daily-english.html?q=' + encodeURIComponent(en || ko);
      return (
        '<a class="rd-phrase-card" href="' + esc(href) + '">' +
          '<span class="ko">' + esc(ko) + '</span>' +
          '<span class="en">' + esc(en) + '</span>' +
        '</a>'
      );
    }).join('');
  }

  function renderReadingCol(elId, listHref, label, entries, board) {
    var root = document.getElementById(elId);
    if (!root) return;
    var list = randomIndexed(entries, 2);
    var items = list.map(function (row) {
      var entry = row.entry;
      var origIdx = row.index;
      var parts = parseTitleParts(entry.title);
      var cls = board === 'english-quotes' ? 'item quote-en' : 'item';
      return '<a class="' + cls + '" href="' + esc(boardHref(board, entry, origIdx)) + '">' + esc(parts.title) + '</a>';
    }).join('');
    root.innerHTML =
      '<a class="col-link" href="' + esc(listHref) + '">' + esc(label) + ' →</a>' +
      items;
  }

  function pickRandom(arr, n) {
    return shuffleInPlace((arr || []).slice()).slice(0, n);
  }

  function siteFavicon(url) {
    try {
      var host = new URL(url).hostname.replace(/^www\./i, '');
      if (!host) return '';
      return 'https://www.google.com/s2/favicons?domain=' + encodeURIComponent(host) + '&sz=64';
    } catch (e) {
      return '';
    }
  }

  /** 방문마다 학습사이트 미리보기 8개 랜덤 */
  function renderDirPreviewRandom() {
    var root = document.getElementById('rd-dir-grid');
    if (!root) return;
    var sites = (window.EnglishDirectory && window.EnglishDirectory.SITES) || [];
    if (!sites.length) {
      var kids = Array.prototype.slice.call(root.children);
      if (kids.length < 2) return;
      shuffleInPlace(kids).forEach(function (el) {
        root.appendChild(el);
      });
      return;
    }
    root.innerHTML = pickRandom(sites, 8)
      .map(function (site) {
        var thumb = siteFavicon(site.url);
        var meta = [site.category, site.level].filter(Boolean).join(' · ');
        return (
          '<a class="rd-dir-item" href="' +
          esc(site.url) +
          '" target="_blank" rel="noopener noreferrer">' +
          (thumb
            ? '<img class="rd-dir-favicon" src="' +
              esc(thumb) +
              '" alt="" width="28" height="28" loading="lazy" decoding="async">'
            : '') +
          '<span class="rd-dir-name">' +
          esc(site.name) +
          '</span>' +
          '<span class="rd-dir-meta">' +
          esc(meta) +
          '</span>' +
          '</a>'
        );
      })
      .join('');
  }

  function freeBookCoverTone(seed) {
    var tones = ['alice', 'oz', 'pride', 'frank'];
    var s = String(seed || '');
    var sum = 0;
    for (var i = 0; i < s.length; i += 1) sum += s.charCodeAt(i);
    return tones[sum % tones.length];
  }

  /** 방문마다 무료 영어 원서 미리보기 4권 랜덤 */
  function renderFreeBooksRandom() {
    var root =
      document.getElementById('rd-free-books-grid') ||
      document.querySelector('.rd-free-books .rd-free-books-grid');
    if (!root) return Promise.resolve();
    return fetch('data/free-books.json?v=20261105n100', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('free-books HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var books = data && Array.isArray(data.books) ? data.books : [];
        if (!books.length) return;
        root.innerHTML = pickRandom(books, 4)
          .map(function (book) {
            var id = String(book.id || '').trim();
            if (!/^\d+$/.test(id)) return '';
            var title = String(book.title || '').trim();
            var author = String(book.author || '').trim();
            var href = 'https://www.gutenberg.org/ebooks/' + id;
            var tone = freeBookCoverTone(id + title);
            return (
              '<li class="rd-free-book">' +
              '<a class="rd-free-book-cover rd-free-book-cover--' +
              tone +
              '" href="' +
              esc(href) +
              '" target="_blank" rel="noopener noreferrer" aria-label="' +
              esc(title) +
              ' - 외부 사이트에서 무료로 읽기">' +
              '<span class="rd-free-book-cover-title">' +
              esc(title) +
              '</span>' +
              '<span class="rd-free-book-cover-author">' +
              esc(author) +
              '</span>' +
              '</a>' +
              '</li>'
            );
          })
          .join('');
      })
      .catch(function () {
        /* 정적 폴백 유지 */
      });
  }

  function boot() {
    fillDateBar();
    renderDirPreviewRandom();
    renderFreeBooksRandom();
    if (!window.HomeBoardPreview) return;

    Promise.all([
      fetchEntries('/wordofday'),
      fetchEntries('/guestbook'),
      fetchEntries('/korea-news'),
      fetchEntries('/defense-news'),
      fetchEntries('/economy-news'),
      fetchEntries('/vocabulary-quiz'),
      fetchEntries('/easy-voca'),
      fetchEntries('/opinions'),
      fetchEntries('/culture-voca'),
      fetchEntries('/calm-mind'),
      fetchEntries('/english-quotes'),
      fetchDailyExpressions(5)
    ]).then(function (results) {
      var wotd = results[0] || [];
      var intl = results[1] || [];
      var korea = results[2] || [];
      var defense = results[3] || [];
      var economy = results[4] || [];
      var quiz = results[5] || [];
      var phrases = results[6] || [];
      var opinions = results[7] || [];
      var culture = results[8] || [];
      var calm = results[9] || [];
      var quotes = results[10] || [];
      var daily = results[11] || [];

      var wPick = randomIndexed(wotd, 1)[0];
      if (wPick) renderHeroWord(wPick.entry, wPick.index);

      renderNews(mixNews(intl, korea, defense, economy, []));
      renderQuiz(quiz);
      renderPhrases(phrases);
      renderDailyLines(daily);
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
