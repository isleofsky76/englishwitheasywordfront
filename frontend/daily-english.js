/**
 * 생활 영어 한 줄 — 검색 · 무한 스크롤 · 뜻/저장/다운로드 · BoardComments
 */
(function () {
  'use strict';

  var PAGE_SIZE = 50;
  var DEBOUNCE_MS = 300;
  var BOARD = 'expressions';
  var SAVED_KEY = 'de-saved-expressions-session';
  /* 문장 섹션과 동일 — 기본 한글(뜻) blur */
  var HIDE_MEANING_KEY = 'de-hide-meaning';

  var state = {
    q: '',
    cursor: null,
    hasMore: true,
    loading: false,
    requestId: 0,
    seenIds: Object.create(null),
    items: [],
    total: 0,
  };

  function apiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') return window.getPage30ApiBaseUrl();
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function readSavedMap() {
    try {
      var raw = sessionStorage.getItem(SAVED_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeSavedMap(map) {
    try {
      sessionStorage.setItem(SAVED_KEY, JSON.stringify(map || {}));
    } catch (e) { /* ignore */ }
  }

  function savedCount() {
    return Object.keys(readSavedMap()).length;
  }

  function isSaved(id) {
    return Boolean(id && readSavedMap()[id]);
  }

  function isHideMeaningOn() {
    try {
      var v = localStorage.getItem(HIDE_MEANING_KEY);
      if (v === null) return true; /* default: 한글 뜻 blur */
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function applyHideMeaning(on) {
    document.body.classList.toggle('de-hide-meaning', !!on);
    try {
      localStorage.setItem(HIDE_MEANING_KEY, on ? '1' : '0');
    } catch (e) { /* ignore */ }
    document.querySelectorAll('.de-item.is-meaning-shown, .de-item.is-meaning-hidden').forEach(function (el) {
      el.classList.remove('is-meaning-shown', 'is-meaning-hidden');
    });
    syncAllMeaningButtons();
  }

  function isItemMeaningVisible(itemEl) {
    if (!itemEl) return false;
    var globalHide = document.body.classList.contains('de-hide-meaning');
    if (globalHide) return itemEl.classList.contains('is-meaning-shown');
    return !itemEl.classList.contains('is-meaning-hidden');
  }

  function syncMeaningButton(btn, itemEl) {
    if (!btn || !itemEl) return;
    btn.hidden = false;
    var shown = isItemMeaningVisible(itemEl);
    btn.textContent = shown ? '뜻 숨기기' : '뜻 보기';
    btn.setAttribute('aria-pressed', shown ? 'true' : 'false');
    btn.title = shown ? '이 표현의 한글 뜻을 가립니다' : '이 표현의 한글 뜻을 봅니다';
  }

  function syncAllMeaningButtons() {
    document.querySelectorAll('.de-item').forEach(function (itemEl) {
      syncMeaningButton(itemEl.querySelector('[data-de-meaning-toggle]'), itemEl);
    });
  }

  function toggleItemMeaning(itemEl) {
    if (!itemEl) return;
    var globalHide = document.body.classList.contains('de-hide-meaning');
    var shown = isItemMeaningVisible(itemEl);
    if (globalHide) {
      itemEl.classList.toggle('is-meaning-shown', !shown);
      itemEl.classList.remove('is-meaning-hidden');
    } else {
      itemEl.classList.toggle('is-meaning-hidden', shown);
      itemEl.classList.remove('is-meaning-shown');
    }
    syncMeaningButton(itemEl.querySelector('[data-de-meaning-toggle]'), itemEl);
  }

  function syncSaveButton(btn, id) {
    if (!btn) return;
    var on = isSaved(id);
    btn.textContent = on ? '저장됨' : '저장';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.title = on ? '저장 취소' : '이 탭에만 잠시 저장';
  }

  function syncItemDownload(itemEl, id) {
    if (!itemEl) return;
    var btn = itemEl.querySelector('[data-de-item-download]');
    if (!btn) return;
    var on = isSaved(id);
    btn.hidden = !on;
  }

  function syncDownloadBar() {
    var btn = document.getElementById('de-download-saved');
    var countEl = document.getElementById('de-saved-count');
    var n = savedCount();
    if (countEl) countEl.textContent = String(n);
    if (btn) {
      btn.hidden = n === 0;
      btn.disabled = n === 0;
    }
    document.querySelectorAll('.de-item').forEach(function (el) {
      var id = el.getAttribute('data-id') || '';
      syncSaveButton(el.querySelector('[data-de-save-toggle]'), id);
      syncItemDownload(el, id);
    });
  }

  function findItem(id) {
    for (var i = 0; i < state.items.length; i += 1) {
      if (state.items[i] && state.items[i].id === id) return state.items[i];
    }
    return null;
  }

  function toggleSave(itemEl) {
    var id = itemEl && itemEl.getAttribute('data-id');
    if (!id) return;
    var map = readSavedMap();
    if (map[id]) {
      delete map[id];
    } else {
      var it = findItem(id) || {};
      map[id] = {
        id: id,
        ko: String(it.ko || '').trim(),
        en: String(it.en || '').trim(),
        example: String(it.example || '').trim(),
        translation: String(it.translation || '').trim(),
        savedAt: Date.now(),
      };
    }
    writeSavedMap(map);
    syncSaveButton(itemEl.querySelector('[data-de-save-toggle]'), id);
    syncItemDownload(itemEl, id);
    syncDownloadBar();
  }

  function downloadSaved() {
    var map = readSavedMap();
    var keys = Object.keys(map);
    if (!keys.length) return;
    keys.sort(function (a, b) {
      return String(a).localeCompare(String(b), 'en');
    });
    var lines = ['번호\t한국어\t영어\t예문\t번역'];
    keys.forEach(function (k, idx) {
      var it = map[k] || {};
      lines.push(
        [idx + 1, it.ko || '', it.en || '', it.example || '', it.translation || '']
          .map(function (cell) {
            return String(cell).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
          })
          .join('\t')
      );
    });
    var stamp = new Date();
    var y = stamp.getFullYear();
    var m = String(stamp.getMonth() + 1).padStart(2, '0');
    var d = String(stamp.getDate()).padStart(2, '0');
    var blob = new Blob(['\uFEFF' + lines.join('\n') + '\n'], {
      type: 'text/tab-separated-values;charset=utf-8',
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'daily-english-saved-' + y + m + d + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function setStatus(text) {
    var el = document.getElementById('de-status');
    if (el) el.textContent = text || '';
  }

  function setRetryVisible(on) {
    var wrap = document.getElementById('de-retry-wrap');
    if (wrap) wrap.hidden = !on;
  }

  function updateCount() {
    var el = document.getElementById('de-count');
    if (!el) return;
    var q = state.q;
    if (q) {
      el.textContent = '검색 결과 ' + state.total + '개';
    } else {
      el.textContent = '총 ' + state.total + '개';
    }
  }

  function displayIndex(absoluteIndex) {
    return String(absoluteIndex);
  }

  function renderItem(item, listIndex) {
    var hasEx = Boolean(String(item.example || '').trim() || String(item.translation || '').trim());
    var num = displayIndex(listIndex + 1);
    var exampleBlock = hasEx
      ? '<div class="de-example-block">' +
        (item.example ? '<p class="de-example">' + escapeHtml(item.example) + '</p>' : '') +
        (item.translation ? '<p class="de-translation">' + escapeHtml(item.translation) + '</p>' : '') +
        '</div>'
      : '';
    return (
      '<article class="de-item" data-id="' +
      escapeAttr(item.id) +
      '" data-has-example="' +
      (hasEx ? '1' : '0') +
      '">' +
      '<span class="de-num" aria-hidden="true">' +
      escapeHtml(num) +
      '.</span>' +
      '<div class="de-body">' +
      '<p class="de-en">' +
      escapeHtml(item.en) +
      '</p>' +
      '<p class="de-ko">' +
      escapeHtml(item.ko) +
      '</p>' +
      exampleBlock +
      '<div class="de-actions">' +
      '<button type="button" class="de-meaning-toggle" data-de-meaning-toggle aria-pressed="false">뜻 보기</button>' +
      '<button type="button" class="de-save-toggle" data-de-save-toggle aria-pressed="false">저장</button>' +
      '<button type="button" class="de-item-download" data-de-item-download hidden>다운로드</button>' +
      '<div class="de-comments-root" data-de-comments-root></div>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
  }

  async function mountComments(itemEl) {
    if (!window.BoardComments || typeof window.BoardComments.mount !== 'function') return;
    var id = itemEl.getAttribute('data-id');
    var root = itemEl.querySelector('[data-de-comments-root]');
    if (!id || !root || root.getAttribute('data-mounted') === '1') return;
    root.setAttribute('data-mounted', '1');
    try {
      await window.BoardComments.mount({
        board: BOARD,
        contentKey: id,
        title: '',
        root: root,
      });
    } catch (e) {
      console.warn('comments mount skipped', e);
    }
  }

  function appendItems(items, startIndex) {
    var feed = document.getElementById('de-feed');
    if (!feed) return;
    var html = items
      .map(function (it, i) {
        return renderItem(it, startIndex + i);
      })
      .join('');
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var nodes = Array.prototype.slice.call(wrap.children);
    nodes.forEach(function (node) {
      feed.appendChild(node);
      var id = node.getAttribute('data-id') || '';
      syncMeaningButton(node.querySelector('[data-de-meaning-toggle]'), node);
      syncSaveButton(node.querySelector('[data-de-save-toggle]'), id);
      syncItemDownload(node, id);
      mountComments(node);
    });
  }

  function resetList() {
    var feed = document.getElementById('de-feed');
    if (feed) feed.innerHTML = '';
    state.cursor = null;
    state.hasMore = true;
    state.seenIds = Object.create(null);
    state.items = [];
    state.total = 0;
    setRetryVisible(false);
  }

  async function fetchPage() {
    if (state.loading || !state.hasMore) return;
    state.loading = true;
    var reqId = ++state.requestId;
    setStatus(state.items.length ? '불러오는 중…' : '불러오는 중…');
    setRetryVisible(false);

    var params = new URLSearchParams();
    params.set('limit', String(PAGE_SIZE));
    if (state.q) params.set('q', state.q);
    if (state.cursor) params.set('cursor', state.cursor);

    try {
      var res = await fetch(apiBase().replace(/\/$/, '') + '/api/expressions?' + params.toString(), {
        credentials: 'omit',
      });
      var data = await res.json().catch(function () {
        return {};
      });
      if (reqId !== state.requestId) return;
      if (!res.ok) throw new Error(data.error || 'load failed');

      var incoming = Array.isArray(data.items) ? data.items : [];
      var fresh = [];
      incoming.forEach(function (it) {
        if (!it || !it.id || state.seenIds[it.id]) return;
        state.seenIds[it.id] = 1;
        fresh.push(it);
      });

      var startIndex = state.items.length;
      state.items = state.items.concat(fresh);
      state.total = typeof data.total === 'number' ? data.total : state.items.length;
      state.cursor = data.nextCursor || null;
      state.hasMore = Boolean(data.hasMore);

      if (!state.items.length && !fresh.length) {
        var feed = document.getElementById('de-feed');
        if (feed && !feed.children.length) {
          feed.innerHTML = '<p class="de-empty">표시할 표현이 없습니다.</p>';
        }
      } else {
        appendItems(fresh, startIndex);
      }

      updateCount();
      syncDownloadBar();
      setStatus(state.hasMore ? '' : state.items.length ? '모두 불러왔습니다.' : '');
    } catch (err) {
      if (reqId !== state.requestId) return;
      console.error(err);
      setStatus('불러오지 못했습니다.');
      setRetryVisible(true);
    } finally {
      if (reqId === state.requestId) state.loading = false;
    }
  }

  function startSearch(q) {
    state.q = String(q || '').trim().slice(0, 100);
    state.requestId += 1;
    state.loading = false;
    resetList();
    fetchPage();
  }

  function bindSearch() {
    var input = document.getElementById('de-search-input');
    if (!input || input._deBound) return;
    input._deBound = true;
    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        startSearch(input.value);
      }, DEBOUNCE_MS);
    });
  }

  function bindFeedClicks() {
    var feed = document.getElementById('de-feed');
    if (!feed || feed._deBound) return;
    feed._deBound = true;
    feed.addEventListener('click', function (e) {
      var meaning = e.target.closest('[data-de-meaning-toggle]');
      if (meaning) {
        toggleItemMeaning(meaning.closest('.de-item'));
        return;
      }
      var save = e.target.closest('[data-de-save-toggle]');
      if (save) {
        toggleSave(save.closest('.de-item'));
        return;
      }
      var dl = e.target.closest('[data-de-item-download]');
      if (dl) {
        downloadSaved();
      }
    });
  }

  function bindInfiniteScroll() {
    var sentinel = document.getElementById('de-sentinel');
    if (!sentinel || typeof IntersectionObserver !== 'function') {
      window.addEventListener('scroll', function () {
        if (state.loading || !state.hasMore) return;
        var near =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400;
        if (near) fetchPage();
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        if (!entries.some(function (en) {
          return en.isIntersecting;
        }))
          return;
        fetchPage();
      },
      { root: null, rootMargin: '400px 0px', threshold: 0 }
    );
    io.observe(sentinel);
  }

  function bindChrome() {
    var dl = document.getElementById('de-download-saved');
    if (dl && !dl._deBound) {
      dl._deBound = true;
      dl.addEventListener('click', downloadSaved);
    }
    var retry = document.getElementById('de-retry');
    if (retry && !retry._deBound) {
      retry._deBound = true;
      retry.addEventListener('click', function () {
        setRetryVisible(false);
        fetchPage();
      });
    }
    var back = document.getElementById('de-back-top');
    if (back && !back._deBound) {
      back._deBound = true;
      back.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      window.addEventListener(
        'scroll',
        function () {
          back.hidden = window.scrollY < 500;
        },
        { passive: true }
      );
    }
  }

  function boot() {
    applyHideMeaning(isHideMeaningOn());
    bindSearch();
    bindFeedClicks();
    bindInfiniteScroll();
    bindChrome();
    syncDownloadBar();
    fetchPage();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.DailyEnglishPage = {
    apiBase: apiBase,
    startSearch: startSearch,
  };
})();
