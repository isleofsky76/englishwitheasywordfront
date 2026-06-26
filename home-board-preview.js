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

  function getPreviewBoards(apiMode) {
    var isProdHost = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    var wordofdayApiMode = apiMode || (isProdHost ? 'prod' : null);
    return [
      { path: '/wordofday', page: 'word-of-the-day.html', label: '오늘의 단어', apiMode: wordofdayApiMode },
      { path: '/guestbook', page: 'news-voca.html', label: '뉴스 어휘' },
      { path: '/vocabulary', page: 'english-synonym.html', label: '유의어' },
      { path: '/easy-voca', page: 'popular-voca.html', label: '인기 어휘' },
      { path: '/situational-english', page: 'situational-english.html', label: '상황 영어' },
      { path: '/cooking-voca', page: 'cooking-voca.html', label: '요리 영어' },
      { path: '/culture-voca', page: 'culture-voca.html', label: '컬쳐 어휘' },
      { path: '/ranking-news', page: 'ranking-news.html', label: '랭킹 뉴스' },
      { path: '/photo-english', page: 'photo-english.html', label: '포토 영어' },
      { path: '/pros-cons', page: 'pros-cons.html', label: 'Pros & Cons' }
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
            views: entry.views || 0,
            date: entry.date,
            href: board.page + '?index=' + index + apiParam,
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

  function buildRecentPreviewRow(dateStr, label, title, views, href) {
    var safeDate = formatPreviewDate(dateStr);
    var safeLabel = escapeHtml(label);
    var safeTitle = escapeHtml(title || '제목 없음');
    var viewsHtml = views ? '<span class="preview-views">[' + views + ']</span>' : '';
    return '<li><a href="' + href + '">' +
      '<span class="preview-title"><span class="preview-date">' + safeDate + '</span> | ' +
      safeLabel + ' | ' + safeTitle + viewsHtml + '</span></a></li>';
  }

  function buildBestPreviewRow(number, label, title, views, href) {
    var safeLabel = escapeHtml(label);
    var safeTitle = escapeHtml(title || '제목 없음');
    var viewsHtml = views ? '<span class="preview-views">[' + views + ']</span>' : '';
    return '<li><a href="' + href + '"><span class="preview-num">' + number + '</span>' +
      '<span class="preview-title">' + safeLabel + ' | ' + safeTitle + viewsHtml + '</span></a></li>';
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
      var rows = preview.map(function (item, idx) {
        return buildBestPreviewRow(idx + 1, item.label, item.title, item.views, item.href);
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
      var rows = preview.map(function (item) {
        return buildRecentPreviewRow(item.date, item.label, item.title, item.views, item.href);
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

  window.HomeBoardPreview = {
    loadBest: loadBest,
    loadRecent: loadRecent,
    loadNavPreviews: loadNavPreviews,
    buildPreviewListHtml: buildPreviewListHtml
  };
})();
