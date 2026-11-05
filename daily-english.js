/**
 * 생활 영어 한 줄 — 카테고리 스크롤 · 검색 · 뜻/저장/다운로드 · BoardComments
 */
(function () {
  'use strict';

  var PAGE_SIZE = 100;
  var DEBOUNCE_MS = 300;
  var BOARD = 'expressions';
  var SAVED_KEY = 'de-saved-expressions-session';
  var HIDE_MEANING_KEY = 'de-hide-meaning';

  var state = {
    q: '',
    activeCategory: '',
    loading: false,
    requestId: 0,
    items: [],
    total: 0,
    categories: [],
  };

  var catObserver = null;

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

  function catSlug(category) {
    return encodeURIComponent(String(category || ''))
      .replace(/%/g, '_')
      .replace(/[^a-zA-Z0-9_\-가-힣]/g, '-');
  }

  function catSectionId(category) {
    return 'de-cat-' + catSlug(category);
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
      if (v === null) return true;
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function applyHideMeaning(on) {
    var hide = !!on;
    document.body.classList.toggle('de-hide-meaning', hide);
    try {
      localStorage.setItem(HIDE_MEANING_KEY, hide ? '1' : '0');
    } catch (e) { /* ignore */ }
    document.querySelectorAll('.de-item.is-meaning-shown, .de-item.is-meaning-hidden').forEach(function (el) {
      el.classList.remove('is-meaning-shown', 'is-meaning-hidden');
    });
    var cb = document.getElementById('de-hide-meaning');
    if (cb && cb.checked !== hide) cb.checked = hide;
    var label = document.querySelector('.de-hide-meaning-label');
    if (label) label.textContent = hide ? '전체 뜻 해제하기' : '전체 뜻 가리기';
    var wrap = document.querySelector('.de-hide-meaning-toggle');
    if (wrap) {
      wrap.title = hide ? '체크 해제하면 뜻이 보입니다' : '체크하면 뜻을 가립니다';
    }
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
    btn.hidden = !isSaved(id);
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
    if (state.q) {
      el.textContent = '검색 결과 ' + state.total + '개';
    } else {
      el.textContent = '총 ' + state.total + '개';
    }
  }

  function renderItem(item, listIndex) {
    var hasEx = Boolean(String(item.example || '').trim() || String(item.translation || '').trim());
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
      escapeHtml(String(listIndex + 1)) +
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

  function bindItemChrome(root) {
    if (!root) return;
    root.querySelectorAll('.de-item').forEach(function (node) {
      var id = node.getAttribute('data-id') || '';
      syncMeaningButton(node.querySelector('[data-de-meaning-toggle]'), node);
      syncSaveButton(node.querySelector('[data-de-save-toggle]'), id);
      syncItemDownload(node, id);
      mountComments(node);
    });
  }

  function groupItems(items) {
    var order = [];
    var map = Object.create(null);
    var catOrder = (state.categories || [])
      .map(function (c) {
        return c && c.category;
      })
      .filter(Boolean);

    catOrder.forEach(function (cat) {
      if (!map[cat]) {
        map[cat] = [];
        order.push(cat);
      }
    });

    (items || []).forEach(function (it) {
      var cat = String((it && it.category) || '기타').trim() || '기타';
      if (!map[cat]) {
        map[cat] = [];
        order.push(cat);
      }
      map[cat].push(it);
    });

    return order
      .filter(function (cat) {
        return map[cat] && map[cat].length;
      })
      .map(function (cat) {
        return { category: cat, items: map[cat] };
      });
  }

  function renderGroupedFeed(items) {
    var feed = document.getElementById('de-feed');
    if (!feed) return;
    var groups = groupItems(items);
    if (!groups.length) {
      feed.innerHTML = '<p class="de-empty">표시할 표현이 없습니다.</p>';
      return;
    }

    var html = '';
    var index = 0;
    groups.forEach(function (g) {
      var sid = catSectionId(g.category);
      html +=
        '<section class="de-cat-group" id="' +
        escapeAttr(sid) +
        '" data-de-category="' +
        escapeAttr(g.category) +
        '">' +
        '<h2 class="de-cat-head">' +
        escapeHtml(g.category) +
        ' <span class="de-cat-head-n">' +
        g.items.length +
        '</span></h2>';
      g.items.forEach(function (it) {
        html += renderItem(it, index);
        index += 1;
      });
      html += '</section>';
    });
    feed.innerHTML = html;
    bindItemChrome(feed);
    observeCategoryGroups();
    syncBackTopVisibility();
  }

  function getCatsScrollOffset() {
    var nav = document.getElementById('de-cats');
    var h = nav && !nav.hidden ? nav.offsetHeight : 0;
    return h + 12;
  }

  function scrollToCategory(category) {
    var cat = String(category || '').trim();
    if (!cat) {
      scrollToTop();
      setActiveCategory('');
      return;
    }
    var target = document.getElementById(catSectionId(cat));
    if (!target) return;
    setActiveCategory(cat);
    var y = target.getBoundingClientRect().top + window.scrollY - getCatsScrollOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function scrollToTop() {
    var hero = document.querySelector('.de-hero') || document.getElementById('main-content');
    if (!hero) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var y = hero.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function setActiveCategory(category) {
    state.activeCategory = String(category || '');
    var nav = document.getElementById('de-cats');
    if (!nav) return;
    nav.querySelectorAll('[data-de-cat]').forEach(function (btn) {
      var cat = btn.getAttribute('data-de-cat') || '';
      var on = state.activeCategory ? cat === state.activeCategory : cat === '';
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function observeCategoryGroups() {
    if (catObserver) {
      catObserver.disconnect();
      catObserver = null;
    }
    if (!('IntersectionObserver' in window)) return;
    var groups = document.querySelectorAll('.de-cat-group');
    if (!groups.length) return;
    catObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) {
            return e.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (!visible.length) return;
        var cat = visible[0].target.getAttribute('data-de-category') || '';
        if (cat) setActiveCategory(cat);
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0, 0.1, 0.25],
      }
    );
    groups.forEach(function (g) {
      catObserver.observe(g);
    });
  }

  function syncBackTopVisibility() {
    var nav = document.getElementById('de-cats');
    var btn = document.getElementById('de-back-top');
    var visible = Boolean(nav && !nav.hidden);
    if (btn) btn.hidden = !visible;
    var h = visible && nav ? nav.offsetHeight : 0;
    document.documentElement.style.setProperty('--de-cats-h', h + 'px');
  }

  function renderCategoryNav() {
    var nav = document.getElementById('de-cats');
    if (!nav) return;
    var cats = Array.isArray(state.categories) ? state.categories : [];
    if (!cats.length) {
      nav.hidden = true;
      nav.innerHTML = '';
      syncBackTopVisibility();
      return;
    }
    var totalAll = cats.reduce(function (sum, c) {
      return sum + (c && c.count ? c.count : 0);
    }, 0);
    if (state.q && state.items.length) {
      totalAll = state.items.length;
    }
    var html =
      '<div class="de-cats-inner">' +
      '<button type="button" class="de-cat-chip' +
      (!state.activeCategory ? ' is-active' : '') +
      '" data-de-cat="" aria-pressed="' +
      (!state.activeCategory ? 'true' : 'false') +
      '">전체' +
      (totalAll ? ' <span class="de-cat-n">' + totalAll + '</span>' : '') +
      '</button>';

    var present = Object.create(null);
    if (state.q) {
      state.items.forEach(function (it) {
        if (it && it.category) present[it.category] = (present[it.category] || 0) + 1;
      });
    }

    cats.forEach(function (c) {
      if (!c || !c.category) return;
      if (state.q && !present[c.category]) return;
      var count = state.q ? present[c.category] : c.count;
      var active = state.activeCategory === c.category;
      html +=
        '<button type="button" class="de-cat-chip' +
        (active ? ' is-active' : '') +
        '" data-de-cat="' +
        escapeAttr(c.category) +
        '" aria-pressed="' +
        (active ? 'true' : 'false') +
        '">' +
        escapeHtml(c.category) +
        (count ? ' <span class="de-cat-n">' + count + '</span>' : '') +
        '</button>';
    });
    html += '</div>';
    nav.innerHTML = html;
    nav.hidden = false;
    syncBackTopVisibility();
  }

  async function loadCategories() {
    var fromApi = null;
    try {
      var res = await fetch(apiBase().replace(/\/$/, '') + '/api/expressions/categories', {
        credentials: 'omit',
      });
      if (res.ok) {
        var data = await res.json();
        if (Array.isArray(data.categories) && data.categories.length) fromApi = data.categories;
      }
    } catch (e) { /* fallback */ }

    if (!fromApi) {
      try {
        var local = await fetch('daily-english-categories.json?v=20261105cat2', {
          credentials: 'omit',
        });
        if (local.ok) {
          var parsed = await local.json();
          if (Array.isArray(parsed) && parsed.length) fromApi = parsed;
        }
      } catch (e2) { /* ignore */ }
    }

    state.categories = fromApi || [];
    renderCategoryNav();
  }

  async function fetchAllMatching(q) {
    var items = [];
    var cursor = null;
    var total = 0;
    var guard = 0;
    while (guard < 40) {
      guard += 1;
      var params = new URLSearchParams();
      params.set('limit', String(PAGE_SIZE));
      if (q) params.set('q', q);
      if (cursor) params.set('cursor', cursor);
      var res = await fetch(apiBase().replace(/\/$/, '') + '/api/expressions?' + params.toString(), {
        credentials: 'omit',
      });
      var data = await res.json().catch(function () {
        return {};
      });
      if (!res.ok) throw new Error(data.error || 'load failed');
      var incoming = Array.isArray(data.items) ? data.items : [];
      incoming.forEach(function (it) {
        if (it && it.id) items.push(it);
      });
      total = typeof data.total === 'number' ? data.total : items.length;
      cursor = data.nextCursor || null;
      if (!data.hasMore || !cursor || !incoming.length) break;
    }
    return { items: items, total: total };
  }

  async function reloadList() {
    if (state.loading) {
      state.requestId += 1;
    }
    state.loading = true;
    var reqId = ++state.requestId;
    state.activeCategory = '';
    setStatus('불러오는 중…');
    setRetryVisible(false);

    try {
      var result = await fetchAllMatching(state.q);
      if (reqId !== state.requestId) return;
      state.items = result.items;
      state.total = result.total;
      renderCategoryNav();
      renderGroupedFeed(state.items);
      updateCount();
      syncDownloadBar();
      setStatus(state.items.length ? '' : '표시할 표현이 없습니다.');
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
    reloadList();
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

  function bindCategories() {
    var nav = document.getElementById('de-cats');
    if (!nav || nav._deBound) return;
    nav._deBound = true;
    nav.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-de-cat]');
      if (!btn) return;
      scrollToCategory(btn.getAttribute('data-de-cat') || '');
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
      if (dl) downloadSaved();
    });
  }

  function bindGlobalHideMeaning() {
    var wrap = document.querySelector('.de-hide-meaning-toggle');
    if (!wrap || wrap._deBound) return;
    wrap._deBound = true;
    wrap.addEventListener('change', function (e) {
      var cb = e.target.closest('.de-hide-meaning-input');
      if (!cb) return;
      applyHideMeaning(cb.checked);
    });
  }

  function bindChrome() {
    bindGlobalHideMeaning();
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
        reloadList();
      });
    }
    var back = document.getElementById('de-back-top');
    if (back && !back._deBound) {
      back._deBound = true;
      back.addEventListener('click', function () {
        setActiveCategory('');
        scrollToTop();
      });
    }
    window.addEventListener('resize', syncBackTopVisibility, { passive: true });
    syncBackTopVisibility();
  }

  function boot() {
    applyHideMeaning(isHideMeaningOn());
    bindSearch();
    bindCategories();
    bindFeedClicks();
    bindChrome();
    syncDownloadBar();
    loadCategories().then(reloadList);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.DailyEnglishPage = {
    apiBase: apiBase,
    startSearch: startSearch,
    scrollToCategory: scrollToCategory,
  };
})();
