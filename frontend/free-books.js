/**
 * 무료 영어 원서 — 작가별/장르별 · 제목/작가 검색 · 처음으로
 * 링크는 https://www.gutenberg.org/ebooks/{id} 만 사용
 */
(function () {
  'use strict';

  var DATA_URL = 'data/free-books.json?v=20261105n100';
  var COVER_TONES = ['alice', 'oz', 'pride', 'frank'];
  var DEBOUNCE_MS = 200;
  var state = { mode: 'genre', q: '', books: [] };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function norm(s) {
    return String(s || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function ebookUrl(id) {
    var n = String(id || '').trim();
    if (!/^\d+$/.test(n)) return '';
    return 'https://www.gutenberg.org/ebooks/' + n;
  }

  function coverTone(seed) {
    var s = String(seed || '');
    var sum = 0;
    for (var i = 0; i < s.length; i += 1) sum += s.charCodeAt(i);
    return COVER_TONES[sum % COVER_TONES.length];
  }

  function bookCard(book) {
    var href = ebookUrl(book.id);
    if (!href) return '';
    var title = String(book.title || '').trim();
    var author = String(book.author || '').trim();
    var tone = coverTone(book.id + title);
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
  }

  function filteredBooks() {
    var q = norm(state.q);
    var list = state.books.slice(0, 100);
    if (!q) return list;
    return list.filter(function (b) {
      var title = norm(b.title);
      var author = norm(b.author);
      return title.indexOf(q) !== -1 || author.indexOf(q) !== -1;
    });
  }

  function groupBy(books, key) {
    var map = Object.create(null);
    books.forEach(function (b) {
      var k = String((b && b[key]) || '기타').trim() || '기타';
      if (!map[k]) map[k] = [];
      map[k].push(b);
    });
    return Object.keys(map)
      .sort(function (a, b) {
        return a.localeCompare(b, 'ko');
      })
      .map(function (name) {
        var items = map[name].slice().sort(function (a, b) {
          return String(a.title || '').localeCompare(String(b.title || ''), 'en');
        });
        return { name: name, items: items };
      });
  }

  function render() {
    var root = document.getElementById('fb-catalog');
    var countEl = document.getElementById('fb-count');
    if (!root) return;
    var books = filteredBooks();
    if (countEl) {
      countEl.textContent = state.q
        ? '검색 결과 ' + books.length + '권'
        : '총 ' + books.length + '권';
    }
    if (!books.length) {
      root.innerHTML = '<p class="fb-empty">검색 결과가 없습니다.</p>';
      return;
    }
    var groups = groupBy(books, state.mode === 'author' ? 'author' : 'genre');
    root.innerHTML = groups
      .map(function (g) {
        return (
          '<section class="fb-group" aria-label="' +
          esc(g.name) +
          '">' +
          '<h2 class="fb-group-title">' +
          esc(g.name) +
          ' <span class="fb-group-n">' +
          g.items.length +
          '</span></h2>' +
          '<ul class="rd-free-books-grid">' +
          g.items.map(bookCard).join('') +
          '</ul>' +
          '</section>'
        );
      })
      .join('');
  }

  function syncUrl() {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('view', state.mode);
      if (state.q) url.searchParams.set('q', state.q);
      else url.searchParams.delete('q');
      var qs = url.searchParams.toString();
      history.replaceState(null, '', url.pathname + (qs ? '?' + qs : '') + url.hash);
    } catch (e) { /* ignore */ }
  }

  function setMode(mode) {
    state.mode = mode === 'author' ? 'author' : 'genre';
    document.querySelectorAll('[data-fb-mode]').forEach(function (btn) {
      var on = btn.getAttribute('data-fb-mode') === state.mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    syncUrl();
    render();
  }

  function setQuery(q) {
    state.q = String(q || '').trim().slice(0, 80);
    var input = document.getElementById('fb-search-input');
    if (input && input.value !== state.q) input.value = state.q;
    syncUrl();
    render();
  }

  function bindMode() {
    var bar = document.getElementById('fb-view-toggle');
    if (!bar || bar._bound) return;
    bar._bound = true;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-fb-mode]');
      if (!btn) return;
      setMode(btn.getAttribute('data-fb-mode'));
    });
  }

  function bindSearch() {
    var input = document.getElementById('fb-search-input');
    if (!input || input._bound) return;
    input._bound = true;
    var timer = null;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        setQuery(input.value);
      }, DEBOUNCE_MS);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        input.value = '';
        setQuery('');
        input.blur();
      }
    });
  }

  function bindBackTop() {
    var btn = document.getElementById('fb-back-top');
    if (!btn || btn._bound) return;
    btn._bound = true;
    function sync() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      btn.hidden = y < 320;
    }
    window.addEventListener('scroll', sync, { passive: true });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    sync();
  }

  function readFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      var v = params.get('view');
      var q = params.get('q') || '';
      return {
        mode: v === 'author' || v === 'genre' ? v : 'genre',
        q: String(q).trim().slice(0, 80),
      };
    } catch (e) {
      return { mode: 'genre', q: '' };
    }
  }

  async function boot() {
    bindMode();
    bindSearch();
    bindBackTop();
    var status = document.getElementById('fb-status');
    if (status) status.textContent = '불러오는 중…';
    try {
      var res = await fetch(DATA_URL, { credentials: 'omit', cache: 'no-store' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      var data = await res.json();
      var list = Array.isArray(data && data.books) ? data.books : [];
      state.books = list
        .filter(function (b) {
          return b && /^\d+$/.test(String(b.id || '')) && b.title && b.author;
        })
        .slice(0, 100);
      if (status) status.textContent = '';
      var initial = readFromUrl();
      state.q = initial.q;
      var input = document.getElementById('fb-search-input');
      if (input && state.q) input.value = state.q;
      setMode(initial.mode);
    } catch (err) {
      console.error(err);
      if (status) status.textContent = '목록을 불러오지 못했습니다.';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
