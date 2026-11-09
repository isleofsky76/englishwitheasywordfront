/**
 * 홈 05 — 단어 한눈에 보기
 * 데이터: home-glossary-words.js → window.HOME_GLOSSARY_WORDS
 */
(function () {
  'use strict';

  var SECTION_HREF = {
    '01': 'index.html#rd-path-01',
    '02': 'index.html#rd-path-02',
    '03': 'index.html#rd-path-03',
    '04': 'index.html#rd-path-04',
    '05': 'home-glossary.html'
  };

  var LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function letterOf(word) {
    var ch = String(word || '').trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  function isSingleWord(word) {
    var w = String(word || '').trim();
    if (!w || /\s/.test(w) || /[.!?:,;]/.test(w) || /[가-힣]/.test(w)) return false;
    return /^[A-Za-z][A-Za-z'’\-]*$/.test(w) && w.length <= 40;
  }

  function normalizeWords(raw) {
    return (Array.isArray(raw) ? raw : [])
      .map(function (item) {
        if (!item || !item.word) return null;
        var word = String(item.word).trim();
        if (!isSingleWord(word)) return null;
        return {
          word: word,
          pos: String(item.pos || '').trim(),
          meaning: String(item.meaning || '').trim(),
          sections: Array.isArray(item.sections)
            ? item.sections.map(function (s) { return String(s).padStart(2, '0'); })
            : []
        };
      })
      .filter(Boolean)
      .sort(function (a, b) {
        return a.word.localeCompare(b.word, 'en', { sensitivity: 'base' });
      });
  }

  function groupByLetter(words) {
    var map = Object.create(null);
    words.forEach(function (w) {
      var L = letterOf(w.word);
      if (!map[L]) map[L] = [];
      map[L].push(w);
    });
    return map;
  }

  function matchesQuery(w, q) {
    if (!q) return true;
    var hay = (w.word + ' ' + w.meaning + ' ' + w.pos).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function renderWordRow(w) {
    var chips = (w.sections || []).map(function (sec) {
      var href = SECTION_HREF[sec] || '#rd-glossary';
      return '<a class="rd-gloss-sec" href="' + href + '">' + escapeHtml(sec) + '</a>';
    }).join('');
    return (
      '<li class="rd-gloss-row">' +
        '<div class="rd-gloss-row-main">' +
          '<span class="rd-gloss-word">' + escapeHtml(w.word) + '</span>' +
          (w.pos ? '<span class="rd-gloss-pos">' + escapeHtml(w.pos) + '</span>' : '') +
        '</div>' +
        '<p class="rd-gloss-meaning">' + escapeHtml(w.meaning) + '</p>' +
        (chips
          ? '<div class="rd-gloss-secs"><span class="rd-gloss-secs-label">사용 섹션</span>' + chips + '</div>'
          : '') +
      '</li>'
    );
  }

  function renderGroups(groups, activeLetters) {
    return activeLetters.map(function (L) {
      var list = groups[L] || [];
      return (
        '<section class="rd-gloss-letter" id="letter-' + L + '" aria-labelledby="letter-title-' + L + '">' +
          '<div class="rd-gloss-letter-head">' +
            '<h3 class="rd-gloss-letter-title" id="letter-title-' + L + '">' + L + '</h3>' +
            '<span class="rd-gloss-letter-count">' + list.length + '개 단어</span>' +
          '</div>' +
          '<ul class="rd-gloss-rows">' +
            list.map(renderWordRow).join('') +
          '</ul>' +
        '</section>'
      );
    }).join('');
  }

  function mount() {
    var root = document.getElementById('rd-glossary');
    if (!root) return;

    var all = normalizeWords(window.HOME_GLOSSARY_WORDS);
    var body = root.querySelector('[data-rd-gloss-body]');
    var stats = root.querySelector('[data-rd-gloss-stats]');
    var search = root.querySelector('#rd-gloss-search');
    var empty = root.querySelector('[data-rd-gloss-empty]');
    var topBtn = document.getElementById('rd-gloss-top');

    function paint(query) {
      var q = String(query || '').trim().toLowerCase();
      var filtered = all.filter(function (w) { return matchesQuery(w, q); });
      var groups = groupByLetter(filtered);
      var activeLetters = [];
      LETTERS.forEach(function (L) {
        if (groups[L] && groups[L].length) activeLetters.push(L);
      });

      if (stats) {
        stats.innerHTML =
          '<span>전체 단어 <b>' + filtered.length + '</b></span>' +
          '<span>알파벳 <b>' + activeLetters.length + '</b>/26</span>';
      }

      if (!filtered.length) {
        if (body) body.innerHTML = '';
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;
      if (body) body.innerHTML = renderGroups(groups, activeLetters);
    }

    paint('');

    if (search) {
      search.addEventListener('input', function () {
        paint(search.value);
      });
    }

    if (topBtn) {
      var ticking = false;
      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          var show = window.scrollY > 480;
          topBtn.classList.toggle('is-visible', show);
          topBtn.setAttribute('aria-hidden', show ? 'false' : 'true');
          topBtn.tabIndex = show ? 0 : -1;
        });
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      topBtn.addEventListener('click', function () {
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
