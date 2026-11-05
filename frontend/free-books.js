/**
 * 무료 영어 원서 — 작가별/장르별 보기
 * 링크는 https://www.gutenberg.org/ebooks/{id} 만 사용
 */
(function () {
  'use strict';

  var DATA_URL = 'data/free-books.json?v=20261105n100';
  var COVER_TONES = ['alice', 'oz', 'pride', 'frank'];
  var state = { mode: 'genre', books: [] };

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
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
    var books = state.books.slice(0, 100);
    if (countEl) countEl.textContent = '총 ' + books.length + '권';
    var groups = groupBy(books, state.mode === 'author' ? 'author' : 'genre');
    var html = groups
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
    root.innerHTML = html || '<p class="fb-empty">표시할 도서가 없습니다.</p>';
  }

  function setMode(mode) {
    state.mode = mode === 'author' ? 'author' : 'genre';
    document.querySelectorAll('[data-fb-mode]').forEach(function (btn) {
      var on = btn.getAttribute('data-fb-mode') === state.mode;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try {
      var url = new URL(window.location.href);
      url.searchParams.set('view', state.mode);
      history.replaceState(null, '', url.pathname + '?' + url.searchParams.toString() + url.hash);
    } catch (e) { /* ignore */ }
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

  function readModeFromUrl() {
    try {
      var v = new URLSearchParams(window.location.search).get('view');
      if (v === 'author' || v === 'genre') return v;
    } catch (e) { /* ignore */ }
    return 'genre';
  }

  async function boot() {
    bindMode();
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
      setMode(readModeFromUrl());
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
