(function () {
  'use strict';

  var cachedCombined = null;
  var cachePromise = null;

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

  function getPreviewBoards(apiMode) {
    var isProdHost = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    var wordofdayApiMode = apiMode || (isProdHost ? 'prod' : null);
    return [
      { path: '/wordofday', page: 'word-of-the-day.html', postPath: 'word-of-the-day', label: '단어장', apiMode: wordofdayApiMode },
      { path: '/guestbook', page: 'news-voca.html', postPath: 'news-voca', label: '국제' },
      { path: '/defense-news', page: 'defense-news.html', postPath: 'defense-news', label: '국방뉴스' },
      { path: '/vocabulary-quiz', page: 'vocabulary-quiz.html', label: '퀴즈' },
      { path: '/vocabulary', page: 'english-synonym.html', postPath: 'english-synonym', label: '연관단어' },
      { path: '/opinions', page: 'english-opinions.html', postPath: 'english-opinions', label: '오피니언' },
      { path: '/easy-voca', page: 'popular-voca.html', postPath: 'popular-voca', label: '인기 어휘' },
      { path: '/situational-english', page: 'situational-english.html', postPath: 'situational-english', label: '상황' },
      { path: '/cooking-voca', page: 'cooking-voca.html', postPath: 'cooking-voca', label: '요리' },
      { path: '/culture-voca', page: 'culture-voca.html', postPath: 'culture-voca', label: '컬쳐' },
      { path: '/ranking-news', page: 'ranking-news.html', postPath: 'ranking-news', label: '랭킹' },
      { path: '/photo-english', page: 'photo-english.html', postPath: 'photo-english', label: '포토' },
      { path: '/pros-cons', page: 'pros-cons.html', postPath: 'pros-cons', label: 'Pros & Cons' }
    ];
  }

  function fetchAllPreviewEntries(apiBase, boards, apiMode) {
    return Promise.allSettled(boards.map(function (board) {
      return fetch(apiBase + board.path)
        .then(function (r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function (data) {
          return { board: board, entries: parseEntries(data) };
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
          combined.push({
            label: board.label,
            title: entry.title,
            slug: entry && entry.slug ? String(entry.slug) : '',
            views: entry.views || 0,
            likes: entry.likes || 0,
            date: entry.date,
            href: buildEntryHref(board, entry, index, apiParam),
            sortTime: parseEntrySortTime(entry, index)
          });
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
        throw err;
      });
    return cachePromise;
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
    '퀴즈': { badge: 'preview-badge--quiz', accent: 'preview-accent--quiz' },
    '유의어': { badge: 'preview-badge--synonym', accent: 'preview-accent--synonym' },
    '연관단어': { badge: 'preview-badge--synonym', accent: 'preview-accent--synonym' },
    '인기 어휘': { badge: 'preview-badge--popular', accent: 'preview-accent--popular' },
    '상황': { badge: 'preview-badge--situational', accent: 'preview-accent--situational' },
    '요리': { badge: 'preview-badge--cooking', accent: 'preview-accent--cooking' },
    '컬쳐': { badge: 'preview-badge--culture', accent: 'preview-accent--culture' },
    '랭킹': { badge: 'preview-badge--ranking', accent: 'preview-accent--ranking' },
    '포토': { badge: 'preview-badge--photo', accent: 'preview-accent--photo' },
    'Pros & Cons': { badge: 'preview-badge--proscons', accent: 'preview-accent--proscons' }
  };

  function styleForLabel(label) {
    return LABEL_STYLE[label] || { badge: 'preview-badge--default', accent: 'preview-accent--news' };
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
      '</span>' +
      '<span class="preview-arrow" aria-hidden="true">›</span>' +
      '</a></li>';
  }

  function buildBestPreviewRow(label, title, views, href, likes, dateStr) {
    var titleHtml = buildPreviewTitleHtml(title, label);
    return '<li class="preview-card"><a href="' + href + '">' +
      '<span class="preview-body">' +
        '<span class="preview-title">' + titleHtml + '</span>' +
      '</span>' +
      '<span class="preview-arrow" aria-hidden="true">›</span>' +
      '</a></li>';
  }

  function loadBest(listEl, limit) {
    if (!listEl) return;
    var max = limit || 8;
    var loadingHtml = buildPreviewListHtml([], '로딩 중...', listEl.getAttribute('data-list-class'));
    listEl.innerHTML = loadingHtml;
    var fallbackHtml = buildPreviewListHtml([], '인기 글을 불러올 수 없습니다.', listEl.getAttribute('data-list-class'));
    var timeoutId = setTimeout(function () { listEl.innerHTML = fallbackHtml; }, 10000);

    fetchCombined().then(function (combined) {
      clearTimeout(timeoutId);
      var sorted = combined.slice().sort(function (a, b) {
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
    }).catch(function () {
      clearTimeout(timeoutId);
      listEl.innerHTML = fallbackHtml;
    });
  }

  function loadRecent(listEl, limit) {
    if (!listEl) return;
    var max = limit || 8;
    var listClass = listEl.getAttribute('data-list-class');
    listEl.innerHTML = buildPreviewListHtml([], '로딩 중...', listClass);
    var fallbackHtml = buildPreviewListHtml([], '최신 글을 불러올 수 없습니다.', listClass);
    var timeoutId = setTimeout(function () { listEl.innerHTML = fallbackHtml; }, 10000);

    fetchCombined().then(function (combined) {
      clearTimeout(timeoutId);
      var sorted = combined.slice().sort(function (a, b) {
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
    }).catch(function () {
      clearTimeout(timeoutId);
      listEl.innerHTML = fallbackHtml;
    });
  }

  function loadNavPreviews(bestEl, recentEl, limit) {
    loadBest(bestEl, limit);
    loadRecent(recentEl, limit);
  }

  function escapeRegex(str) {
    return String(str || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function scoreSearchItem(item, q) {
    var title = String(item.title || '').toLowerCase();
    if (!q || !title) return 0;
    if (title === q) return 100;
    if (title.indexOf(q) === 0) return 85;
    try {
      if (new RegExp('\\b' + escapeRegex(q) + '\\b', 'i').test(title)) return 75;
    } catch (e) { /* ignore */ }
    if (title.indexOf(q) !== -1) return 55;
    return 0;
  }

  function search(query, limit) {
    var q = String(query || '').trim().toLowerCase();
    var max = Number(limit);
    if (!Number.isFinite(max) || max <= 0) max = 0;
    if (!q) return Promise.resolve([]);
    return fetchCombined().then(function (combined) {
      var ranked = combined
        .map(function (item) {
          return { item: item, score: scoreSearchItem(item, q) };
        })
        .filter(function (row) { return row.score > 0; })
        .sort(function (a, b) {
          if (b.score !== a.score) return b.score - a.score;
          return (b.item.views || 0) - (a.item.views || 0);
        })
        .map(function (row) { return row.item; });
      return max ? ranked.slice(0, max) : ranked;
    });
  }

  window.HomeBoardPreview = {
    loadBest: loadBest,
    loadRecent: loadRecent,
    loadNavPreviews: loadNavPreviews,
    buildPreviewListHtml: buildPreviewListHtml,
    search: search
  };
})();
