(function () {
  'use strict';

  var cachedCombined = null;
  var cachePromise = null;
  var boardEntriesCache = {};
  var searchIndexCache = null;
  var searchIndexPromise = null;
  var SEARCH_INDEX_URL = '/site-search-index.json?v=20261111search1';

  function fetchSiteSearchIndex() {
    if (searchIndexCache) return Promise.resolve(searchIndexCache);
    if (searchIndexPromise) return searchIndexPromise;
    searchIndexPromise = fetch(SEARCH_INDEX_URL, { cache: 'default' })
      .then(function (r) {
        if (!r.ok) throw new Error('search index HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        var words = (data && data.words) || [];
        searchIndexCache = words.map(function (w) {
          return {
            label: w.label || '시사 영단어',
            title: w.meaning ? (w.word + ' — ' + w.meaning) : w.word,
            slug: String(w.word || ''),
            previewWord: String(w.word || ''),
            previewMeaning: String(w.meaning || ''),
            previewSnippet: '',
            views: 0,
            likes: 0,
            date: data.generatedAt || '',
            href: w.href || '#',
            sortTime: 0,
            searchOnly: true,
            searchText: String(w.searchText || [w.word, w.meaning, w.label].filter(Boolean).join(' ')),
            fromSearchIndex: true
          };
        });
        return searchIndexCache;
      })
      .catch(function (err) {
        console.warn('site-search-index load failed', err && err.message);
        searchIndexPromise = null;
        searchIndexCache = [];
        return searchIndexCache;
      });
    return searchIndexPromise;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getApiBase() {
    var urlParams = new URLSearchParams(window.location.search);
    var apiMode = urlParams.get('api');
    if (apiMode === 'prod') {
      return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
    }
    if (apiMode === 'local') {
      return 'http://' + window.location.hostname + ':3000';
    }
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://' + window.location.hostname + ':3000';
    }
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function parseEntries(data) {
    if (Array.isArray(data)) return data;
    if (data && data.entries) return data.entries;
    if (data && data.data) return Array.isArray(data.data) ? data.data : [];
    return [];
  }

  function parseEntrySortTime(entry, index) {
    if (entry && entry.date) {
      var time = new Date(entry.date).getTime();
      if (!isNaN(time)) return time;
    }
    return index;
  }

  function buildEntryHref(board, entry, index, apiParam) {
    if (board.path === '/onesentence') {
      var word = String((entry && (entry.word || entry.highlight)) || '').trim();
      return word
        ? 'one-sentence.html?q=' + encodeURIComponent(word)
        : 'one-sentence.html';
    }
    if (board.page === 'vocabulary-quiz.html' && entry?.slug) {
      return 'vocabulary-quiz.html?slug=' + encodeURIComponent(entry.slug);
    }
    if (entry && entry.href) return String(entry.href);
    if (window.ViewpostSeo && window.ViewpostSeo.buildListPostHref) {
      return window.ViewpostSeo.buildListPostHref(entry, board.page, index, apiParam, board.postPath);
    }
    var slug = entry && String(entry.slug || '').trim();
    if (slug && board.postPath) {
      var href = board.postPath + '/' + encodeURIComponent(slug) + '/';
      if (apiParam) href += '?' + String(apiParam).replace(/^&/, '');
      return href;
    }
    if (slug) return board.page + '?slug=' + encodeURIComponent(slug) + apiParam;
    return board.page + '?index=' + index + apiParam;
  }

  function stripHtmlForSearch(html) {
    return String(html || '')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizePreviewItem(board, entry, index, apiParam) {
    if (board.path === '/onesentence') {
      var word = String((entry && entry.word) || '').trim();
      var meaning = String((entry && entry.meaning) || '').trim();
      var cfWords = Array.isArray(entry && entry.cf)
        ? entry.cf.map(function (c) {
            return [c && c.word, c && c.meaning, c && c.pos]
              .map(function (s) { return String(s || '').trim(); })
              .filter(Boolean)
              .join(' ');
          }).filter(Boolean).join(' ')
        : '';
      var en = String((entry && entry.en) || '').trim();
      var title = meaning ? (word + ' — ' + meaning) : word;
      return {
        label: board.label,
        title: title,
        slug: word,
        previewWord: word,
        previewMeaning: meaning,
        previewSnippet: en,
        views: entry.views || 0,
        likes: entry.likes || 0,
        date: entry.date,
        href: buildEntryHref(board, entry, index, apiParam),
        sortTime: parseEntrySortTime(entry, index),
        searchOnly: true,
        searchText: [word, meaning, entry && entry.ko, en, entry && entry.highlight, entry && entry.pos, cfWords]
          .map(function (s) { return String(s || '').trim(); })
          .filter(Boolean)
          .join(' ')
      };
    }
    var bodyText = stripHtmlForSearch(entry && (entry.message || entry.body || entry.content));
    var titleRaw = String((entry && entry.title) || '').trim();
    return {
      label: board.label,
      title: entry.title,
      slug: entry && entry.slug ? String(entry.slug) : '',
      previewWord: titleRaw,
      previewMeaning: String((entry && (entry.subtitle || entry.summary || entry.metaDescription)) || '').trim(),
      previewSnippet: bodyText.slice(0, 120),
      views: entry.views || 0,
      likes: entry.likes || 0,
      date: entry.date,
      href: buildEntryHref(board, entry, index, apiParam),
      sortTime: parseEntrySortTime(entry, index),
      searchOnly: !!board.searchOnly,
      /* 제목·slug만 색인 — 본문 부분일치는 노이즈 */
      searchText: [
        entry && entry.title,
        entry && entry.slug,
        entry && entry.subtitle
      ].map(function (s) { return String(s || '').trim(); }).filter(Boolean).join(' ')
    };
  }

  function getPreviewBoards(apiMode) {
    var isProdHost = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    var wordofdayApiMode = apiMode || (isProdHost ? 'prod' : null);
    return [
      { path: '/wordofday', page: 'word-of-the-day.html', postPath: 'word-of-the-day', label: '단어장', apiMode: wordofdayApiMode },
      { path: '/guestbook', page: 'news-voca.html', postPath: 'news-voca', label: '국제' },
      { path: '/defense-news', page: 'defense-news.html', postPath: 'defense-news', label: '국방뉴스' },
      { path: '/economy-news', page: 'economy-news.html', postPath: 'economy-news', label: '경제뉴스' },
      { path: '/travel-news', page: 'travel-news.html', postPath: 'travel-news', label: '여행뉴스' },
      { path: '/sports-news', page: 'sports-news.html', postPath: 'sports-news', label: '스포츠뉴스' },
      { path: '/us-news', page: 'us-news.html', postPath: 'us-news', label: '미국뉴스' },
      { path: '/retail-news', page: 'retail-news.html', postPath: 'retail-news', label: '유통뉴스' },
      { path: '/ukraine-news', page: 'ukraine-news.html', postPath: 'ukraine-news', label: '우크라이나/러시아' },
      /* 빈 보드 숨김 — 요청 시 복원: weather/literature/health/politics/ai/incident */
      { path: '/industry-news', page: 'industry-news.html', postPath: 'industry-news', label: '산업뉴스' },
      { path: '/korea-news', page: 'korea-news.html', postPath: 'korea-news', label: '한국뉴스' },
      { path: '/vocabulary-quiz', page: 'vocabulary-quiz.html', label: '퀴즈' },
      { path: '/vocabulary', page: 'english-synonym.html', postPath: 'english-synonym', label: '연관단어' },
      { path: '/opinions', page: 'english-opinions.html', postPath: 'english-opinions', label: '오피니언' },
      { path: '/shorts-bg-image', page: 'shorts-bg-image.html', postPath: 'shorts-bg-image', label: '신문읽는 이미지' },
      { path: '/calm-mind', page: 'calm-mind.html', postPath: 'calm-mind', label: '마음 다스리는 글' },
      { path: '/easy-voca', page: 'popular-voca.html', postPath: 'popular-voca', label: '이럴 땐 영어로?' },
      { path: '/situational-english', page: 'situational-english.html', postPath: 'situational-english', label: '상황' },
      { path: '/cooking-voca', page: 'cooking-voca.html', postPath: 'cooking-voca', label: '요리' },
      { path: '/culture-voca', page: 'culture-voca.html', postPath: 'culture-voca', label: '컬쳐' },
      { path: '/ranking-news', page: 'ranking-news.html', postPath: 'ranking-news', label: '랭킹' },
      { path: '/photo-english', page: 'photo-english.html', postPath: 'photo-english', label: '포토' },
      { path: '/pros-cons', page: 'pros-cons.html', postPath: 'pros-cons', label: 'Pros & Cons' },
      { path: '/english-quotes', page: 'english-quotes.html', postPath: 'english-quotes', label: '영어 명언' },
      /* 홈 best/recent에는 넣지 않고 검색만 — 문장 피드 단어(aback 등) */
      { path: '/onesentence', page: 'one-sentence.html', label: '문장', searchOnly: true }
    ];
  }

  var STATIC_FEED_BY_PATH = {
    '/economy-news': '/economy-news/feed.json',
    '/travel-news': '/travel-news/feed.json',
    '/sports-news': '/sports-news/feed.json',
    '/us-news': '/us-news/feed.json',
    '/weather-news': '/weather-news/feed.json',
    '/retail-news': '/retail-news/feed.json',
    '/literature-news': '/literature-news/feed.json',
    '/health-news': '/health-news/feed.json',
    '/politics-news': '/politics-news/feed.json',
    '/industry-news': '/industry-news/feed.json',
    '/ai-news': '/ai-news/feed.json',
    '/incident-news': '/incident-news/feed.json',
    '/ukraine-news': '/ukraine-news/feed.json'
  };

  function fetchStaticFeedEntries(board) {
    var feedUrl = STATIC_FEED_BY_PATH[board.path];
    if (!feedUrl) return Promise.reject(new Error('no static feed'));
    return fetch(feedUrl, { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('static feed HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        return parseEntries(data);
      });
  }

  function fetchAllPreviewEntries(apiBase, boards, apiMode) {
    return Promise.allSettled(boards.map(function (board) {
      return fetch(apiBase + board.path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          var entries = parseEntries(data);
          boardEntriesCache[board.path] = entries;
          return { board: board, entries: entries };
        })
        .catch(function (err) {
          return fetchStaticFeedEntries(board)
            .then(function (entries) {
              console.warn('home preview: API 실패 → 정적 피드', board.path, err && err.message);
              boardEntriesCache[board.path] = entries;
              return { board: board, entries: entries };
            })
            .catch(function () {
              /* onesentence 등 정적 피드 없는 보드도 검색에서 빠지지 않게 빈 배열로 유지 */
              console.warn('home preview: 보드 로드 실패', board.path, err && err.message);
              boardEntriesCache[board.path] = [];
              return { board: board, entries: [] };
            });
        });
    })).then(function (results) {
      var combined = [];
      results.forEach(function (result) {
        if (result.status !== 'fulfilled') return;
        var board = result.value.board;
        var entries = result.value.entries;
        var boardApiMode = board.apiMode !== undefined ? board.apiMode : apiMode;
        var apiParam = boardApiMode ? '&api=' + boardApiMode : '';
        entries.forEach(function (entry, index) {
          combined.push(normalizePreviewItem(board, entry, index, apiParam));
        });
      });
      return combined;
    });
  }

  function fetchCombined() {
    if (cachedCombined) {
      return Promise.resolve(cachedCombined);
    }
    if (cachePromise) return cachePromise;

    var urlParams = new URLSearchParams(window.location.search);
    var apiMode = urlParams.get('api');
    cachePromise = fetchAllPreviewEntries(getApiBase(), getPreviewBoards(apiMode), apiMode)
      .then(function (combined) {
        cachedCombined = combined;
        return combined;
      })
      .catch(function (err) {
        cachePromise = null;
        boardEntriesCache = {};
        throw err;
      });
    return cachePromise;
  }

  function fetchBoardEntries(apiPath) {
    return fetchCombined().then(function () {
      return boardEntriesCache[apiPath] || [];
    });
  }

  function buildSkeletonListHtml(count, listClass) {
    var n = count || 3;
    var cls = listClass || 'preview-list';
    var items = '';
    for (var i = 0; i < n; i++) {
      items += '<li class="preview-skeleton" aria-hidden="true"><span class="preview-skeleton-line"></span></li>';
    }
    return '<ul class="' + cls + ' preview-list--skeleton">' + items + '</ul>';
  }

  function buildPreviewListHtml(rows, emptyMessage, listClass) {
    var cls = listClass || 'preview-list';
    if (!rows.length) {
      return '<ul class="' + cls + '"><li class="preview-empty">' + emptyMessage + '</li></ul>';
    }
    return '<ul class="' + cls + '">' + rows.join('') + '</ul>';
  }

  function formatPreviewDate(dateStr) {
    if (!dateStr) return '-';
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    var y = d.getFullYear();
    var m = ('0' + (d.getMonth() + 1)).slice(-2);
    var day = ('0' + d.getDate()).slice(-2);
    return y + '.' + m + '.' + day;
  }

  var LABEL_STYLE = {
    '단어장': { badge: 'preview-badge--wordofday', accent: 'preview-accent--wordofday' },
    '국제': { badge: 'preview-badge--news', accent: 'preview-accent--news' },
    '국방뉴스': { badge: 'preview-badge--defense', accent: 'preview-accent--defense' },
    '경제뉴스': { badge: 'preview-badge--news', accent: 'preview-accent--news' },
    '여행뉴스': { badge: 'preview-badge--news', accent: 'preview-accent--news' },
    '한국뉴스': { badge: 'preview-badge--defense', accent: 'preview-accent--defense' },
    '퀴즈': { badge: 'preview-badge--quiz', accent: 'preview-accent--quiz' },
    '유의어': { badge: 'preview-badge--synonym', accent: 'preview-accent--synonym' },
    '연관단어': { badge: 'preview-badge--synonym', accent: 'preview-accent--synonym' },
    '이럴 땐 영어로?': { badge: 'preview-badge--popular', accent: 'preview-accent--popular' },
    '상황': { badge: 'preview-badge--situational', accent: 'preview-accent--situational' },
    '요리': { badge: 'preview-badge--cooking', accent: 'preview-accent--cooking' },
    '컬쳐': { badge: 'preview-badge--culture', accent: 'preview-accent--culture' },
    '랭킹': { badge: 'preview-badge--ranking', accent: 'preview-accent--ranking' },
    '포토': { badge: 'preview-badge--photo', accent: 'preview-accent--photo' },
    'Pros & Cons': { badge: 'preview-badge--proscons', accent: 'preview-accent--proscons' },
    '문장': { badge: 'preview-badge--popular', accent: 'preview-accent--popular' }
  };

  function styleForLabel(label) {
    return LABEL_STYLE[label] || { badge: 'preview-badge--default', accent: 'preview-accent--news' };
  }

  function formatMetaStatsHtml(views, likes) {
    var viewCount = Number(views) || 0;
    var likeCount = parseInt(likes, 10) || 0;
    return '<span class="preview-meta-stats preview-meta-stats--hidden">' +
      '<span class="preview-views"><span class="preview-views-icon" aria-hidden="true">👁</span> ' + viewCount + '</span>' +
      '<span class="preview-sep preview-sep--stats" aria-hidden="true"> </span>' +
      '<span class="preview-likes"><span class="preview-like-heart" aria-hidden="true">♥</span> ' + likeCount + '</span>' +
      '</span>';
  }

  function applyPreviewStatsVisibility(root) {
    var scope = root && root.querySelectorAll ? root : document;
    var cards = scope.querySelectorAll ? scope.querySelectorAll('.preview-list .preview-card a') : [];
    cards.forEach(function (link) {
      var body = link.querySelector('.preview-body');
      var title = link.querySelector('.preview-title');
      var stats = link.querySelector('.preview-meta-stats');
      if (!body || !title || !stats) return;

      stats.classList.add('preview-meta-stats--hidden');

      var prevMaxWidth = title.style.maxWidth;
      title.style.maxWidth = 'none';
      var titleNatural = title.scrollWidth;
      title.style.maxWidth = prevMaxWidth;

      stats.classList.remove('preview-meta-stats--hidden');
      stats.style.visibility = 'hidden';
      stats.style.position = 'absolute';
      stats.style.pointerEvents = 'none';
      var statsWidth = stats.offsetWidth;
      stats.style.visibility = '';
      stats.style.position = '';
      stats.style.pointerEvents = '';
      stats.classList.add('preview-meta-stats--hidden');

      var meta = link.querySelector('.preview-meta');
      var metaWidth = meta ? meta.offsetWidth + 6 : 0;
      if (titleNatural + statsWidth + metaWidth + 8 <= body.clientWidth) {
        stats.classList.remove('preview-meta-stats--hidden');
      }
    });
  }

  function buildPreviewTitleHtml(title, fallbackLabel) {
    var rawTitle = String(title || '제목 없음');
    var sourceMatch = rawTitle.match(/^\[([^\]]+)\]\s*(.*)$/);
    var source = sourceMatch ? sourceMatch[1].trim() : String(fallbackLabel || '').trim();
    var mainTitle = sourceMatch ? (sourceMatch[2] || '').trim() : rawTitle;
    if (!mainTitle) mainTitle = '제목 없음';
    var safeTitle = escapeHtml(mainTitle);
    var safeSource = escapeHtml(source);
    var titleParts = [];
    if (safeSource) {
      titleParts.push('<span class="preview-source">' + safeSource + '</span>');
      titleParts.push('<span class="preview-sep" aria-hidden="true"> | </span>');
    }
    titleParts.push('<span class="preview-title-text">' + safeTitle + '</span>');
    return titleParts.join('');
  }

  function buildRecentPreviewRow(dateStr, label, title, views, href, isNew, likes) {
    var titleHtml = buildPreviewTitleHtml(title, label);
    var newHtml = isNew ? '<span class="preview-new">NEW</span>' : '';
    return '<li class="preview-card preview-card--recent"><a href="' + href + '">' +
      '<span class="preview-body">' +
        (newHtml ? '<span class="preview-meta">' + newHtml + '</span>' : '') +
        '<span class="preview-title">' + titleHtml + '</span>' +
        formatMetaStatsHtml(views, likes) +
      '</span>' +
      '<span class="preview-arrow" aria-hidden="true">›</span>' +
      '</a></li>';
  }

  function buildBestPreviewRow(label, title, views, href, likes, dateStr) {
    var titleHtml = buildPreviewTitleHtml(title, label);
    return '<li class="preview-card"><a href="' + href + '">' +
      '<span class="preview-body">' +
        '<span class="preview-title">' + titleHtml + '</span>' +
        formatMetaStatsHtml(views, likes) +
      '</span>' +
      '<span class="preview-arrow" aria-hidden="true">›</span>' +
      '</a></li>';
  }

  function loadBest(listEl, limit) {
    if (!listEl) return;
    var max = limit || 8;
    if (!listEl.querySelector('.preview-list')) {
      listEl.innerHTML = buildSkeletonListHtml(3, listEl.getAttribute('data-list-class'));
    }
    var fallbackHtml = buildPreviewListHtml([], '인기 글을 불러올 수 없습니다.', listEl.getAttribute('data-list-class'));
    var timeoutId = setTimeout(function () { listEl.innerHTML = fallbackHtml; }, 10000);

    fetchCombined().then(function (combined) {
      clearTimeout(timeoutId);
      var sorted = combined.filter(function (item) { return !item.searchOnly; }).slice().sort(function (a, b) {
        var viewDiff = (b.views || 0) - (a.views || 0);
        if (viewDiff !== 0) return viewDiff;
        return b.sortTime - a.sortTime;
      });
      var preview = sorted.slice(0, max);
      if (!preview.length) {
        listEl.innerHTML = buildPreviewListHtml([], '게시글이 없습니다.', listEl.getAttribute('data-list-class'));
        return;
      }
      var rows = preview.map(function (item) {
        return buildBestPreviewRow(item.label, item.title, item.views, item.href, item.likes, item.date);
      });
      listEl.innerHTML = buildPreviewListHtml(rows, '', listEl.getAttribute('data-list-class'));
      applyPreviewStatsVisibility(listEl);
    }).catch(function () {
      clearTimeout(timeoutId);
      listEl.innerHTML = fallbackHtml;
    });
  }

  function loadRecent(listEl, limit) {
    if (!listEl) return;
    var max = limit || 8;
    var listClass = listEl.getAttribute('data-list-class');
    if (!listEl.querySelector('.preview-list')) {
      listEl.innerHTML = buildSkeletonListHtml(3, listClass);
    }
    var fallbackHtml = buildPreviewListHtml([], '최신 글을 불러올 수 없습니다.', listClass);
    var timeoutId = setTimeout(function () { listEl.innerHTML = fallbackHtml; }, 10000);

    fetchCombined().then(function (combined) {
      clearTimeout(timeoutId);
      var sorted = combined.filter(function (item) { return !item.searchOnly; }).slice().sort(function (a, b) {
        if (b.sortTime !== a.sortTime) return b.sortTime - a.sortTime;
        return 0;
      });
      var preview = sorted.slice(0, max);
      if (!preview.length) {
        listEl.innerHTML = buildPreviewListHtml([], '게시글이 없습니다.', listClass);
        return;
      }
      var rows = preview.map(function (item, idx) {
        return buildRecentPreviewRow(item.date, item.label, item.title, item.views, item.href, idx < 2, item.likes);
      });
      listEl.innerHTML = buildPreviewListHtml(rows, '', listClass);
      applyPreviewStatsVisibility(listEl);
    }).catch(function () {
      clearTimeout(timeoutId);
      listEl.innerHTML = fallbackHtml;
    });
  }

  function loadNavPreviews(bestEl, recentEl, limit) {
    loadBest(bestEl, limit);
    loadRecent(recentEl, limit);
  }

  function isWordCardItem(item) {
    if (!item) return false;
    if (item.searchOnly) return true;
    var label = String(item.label || '');
    return label === '문장' || label === '단어장';
  }

  function primaryWordKey(item) {
    var slug = String((item && item.slug) || '').trim().toLowerCase();
    if (slug) return slug;
    var title = String((item && item.title) || '');
    var dash = title.indexOf('—');
    if (dash > 0) return title.slice(0, dash).trim().toLowerCase();
    return title.trim().toLowerCase();
  }

  function normalizeSearchKey(s) {
    return String(s || '')
      .trim()
      .toLowerCase()
      .replace(/[“”"']/g, "'")
      .replace(/\s+/g, ' ');
  }

  function itemMeaningKey(item) {
    var meaning = String((item && item.previewMeaning) || '').trim();
    if (meaning) return normalizeSearchKey(meaning);
    var title = String((item && item.title) || '');
    var dash = title.indexOf('—');
    if (dash > 0) return normalizeSearchKey(title.slice(dash + 1));
    return '';
  }

  /** slug·표제어를 하이픈/공백 기준 토큰으로 분리 (부분문자열 금지) */
  function wordTokens(s) {
    return normalizeSearchKey(s)
      .split(/[^a-z0-9']+/)
      .filter(Boolean);
  }

  function tokensEqual(tokens, q) {
    for (var i = 0; i < tokens.length; i += 1) {
      if (tokens[i] === q) return true;
    }
    return false;
  }

  function tokensPrefix(tokens, q) {
    for (var i = 0; i < tokens.length; i += 1) {
      if (tokens[i].indexOf(q) === 0) return true;
    }
    return false;
  }

  /**
   * 영어 쿼리: 표제어(헤드워드)만. 본문·예문·긴 slug 토큰 나열 매칭 금지.
   * 한글 쿼리: 뜻 정확 일치(+미리보기 접두)
   */
  function scoreSearchItem(item, q, opts) {
    opts = opts || {};
    if (!q) return 0;
    var slug = normalizeSearchKey(item.slug);
    var word = normalizeSearchKey(primaryWordKey(item));
    var meaning = itemMeaningKey(item);
    var wordCard = isWordCardItem(item);
    var isLatin = /^[a-z0-9' .-]+$/i.test(q);
    /* 헤드워드: slug가 하이픈 나열이면 첫 토큰(또는 표제어 필드)만 */
    var head = word;
    if (!head || head.indexOf('-') !== -1) {
      var slugParts = wordTokens(slug);
      if (slugParts.length === 1) head = slugParts[0];
      else if (word && word.indexOf('-') === -1 && /^[a-z]/i.test(word)) head = word;
      else if (slugParts.length) head = slugParts[0];
    }
    head = normalizeSearchKey(head);
    if (!head && !meaning) return 0;

    var score = 0;
    if (isLatin) {
      if (head === q) score = 100;
      else if (!opts.exactOnly && opts.prefix !== false && head.indexOf(q) === 0) score = 80;
    } else {
      /* 한글: 뜻 정확·포함·접두 매칭 */
      if (meaning && meaning === q) score = 96;
      else if (head === q) score = 100;
      else if (meaning && meaning.indexOf(q) !== -1) score = opts.exactOnly ? 88 : 78;
      else if (!opts.exactOnly && opts.prefix !== false) {
        if (meaning && meaning.indexOf(q) === 0) score = 72;
        else if (head.indexOf(q) === 0) score = 80;
      }
    }

    if (score > 0 && (wordCard || item.fromSearchIndex)) score = Math.min(100, score + 8);
    return score;
  }

  function dedupeSearchHits(items) {
    var seen = Object.create(null);
    var out = [];
    items.forEach(function (item) {
      var key = String((item && (item.href || item.slug || item.title)) || '').toLowerCase();
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push(item);
    });
    return out;
  }

  function search(query, limit) {
    var q = normalizeSearchKey(query);
    var max = Number(limit);
    if (!Number.isFinite(max) || max < 0) max = 0;
    if (!q) return Promise.resolve([]);
    /* limit > 0 → 입력 미리보기(접두 허용) / limit 0 → 결과(정확 일치만) */
    var previewMode = max > 0;
    var scoreOpts = previewMode
      ? { exactOnly: false, prefix: true }
      : { exactOnly: true, prefix: false };
    return Promise.all([fetchSiteSearchIndex(), fetchCombined()]).then(function (parts) {
      var indexItems = parts[0] || [];
      var combined = parts[1] || [];
      /* 통합 인덱스 우선 + 기존 보드 결과 보조 */
      var pool = indexItems.concat(combined);
      var ranked = pool
        .map(function (item) {
          return { item: item, score: scoreSearchItem(item, q, scoreOpts) };
        })
        .filter(function (row) { return row.score > 0; })
        .sort(function (a, b) {
          if (b.score !== a.score) return b.score - a.score;
          var aWord = (isWordCardItem(a.item) || a.item.fromSearchIndex) ? 1 : 0;
          var bWord = (isWordCardItem(b.item) || b.item.fromSearchIndex) ? 1 : 0;
          if (bWord !== aWord) return bWord - aWord;
          return (b.item.views || 0) - (a.item.views || 0);
        })
        .map(function (row) { return row.item; });
      ranked = dedupeSearchHits(ranked);
      if (previewMode) {
        var wordFirst = ranked.filter(function (item) {
          return isWordCardItem(item) || item.fromSearchIndex;
        });
        var rest = ranked.filter(function (item) {
          return !(isWordCardItem(item) || item.fromSearchIndex);
        });
        ranked = wordFirst.concat(rest).slice(0, max);
      }
      return ranked;
    });
  }

  window.HomeBoardPreview = {
    loadBest: loadBest,
    loadRecent: loadRecent,
    loadNavPreviews: loadNavPreviews,
    buildPreviewListHtml: buildPreviewListHtml,
    buildSkeletonListHtml: buildSkeletonListHtml,
    fetchBoardEntries: fetchBoardEntries,
    applyPreviewStatsVisibility: applyPreviewStatsVisibility,
    search: search
  };

  if (document.getElementById('home-previews')) {
    fetchCombined();
  }

  var statsResizeTimer = null;
  window.addEventListener('resize', function () {
    if (statsResizeTimer) clearTimeout(statsResizeTimer);
    statsResizeTimer = setTimeout(function () {
      applyPreviewStatsVisibility(document);
    }, 120);
  });
})();
