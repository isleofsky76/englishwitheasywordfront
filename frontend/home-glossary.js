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
  var SAVE_KEY = 'home-glossary-saved-v1';
  var CMT_BOARD = 'home-glossary';
  var commentsAssetsPromise = null;

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

  function letterOf(word) {
    var ch = String(word || '').trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  function isSingleWord(word) {
    var w = String(word || '').trim();
    if (!w || /\s/.test(w) || /[.!?:,;]/.test(w) || /[가-힣]/.test(w)) return false;
    return /^[A-Za-z][A-Za-z'’\-]*$/.test(w) && w.length <= 40;
  }

  function shortenGloss(part) {
    var p = String(part || '').replace(/\s+/g, ' ').trim();
    if (!p) return '';
    p = p.split(/[A-Za-z\/\[\{]|📺|유튜브|출처|원문|cf\./i)[0].trim();
    p = p.replace(/\([^)]{0,16}\)/g, ' ').replace(/\s+/g, ' ').trim();
    if (!/[가-힣]/.test(p)) return '';
    var m = p.match(/^([가-힣]+(?:하다|되다|시키다|지다|리다|기다|나다|이다|우다|키다|내다|주다|받다|보다|가다|오다|쓰다))/);
    if (m) return m[1];
    m = p.match(/^([가-힣]+(?:한|운|은|인|된|는|임|음|기|성|력|감|자)(?:\s+[가-힣]{1,8}(?:한|운|은|인|된|는)?)?)/);
    if (m && m[1].length <= 24) return m[1].trim();
    var toks = p.split(/\s+/).filter(function (t) { return /^[가-힣0-9~\-·]+$/.test(t); });
    if (!toks.length) return '';
    var out = toks[0];
    if (toks[1] && (out + ' ' + toks[1]).length <= 16) out += ' ' + toks[1];
    if (out.length > 20) out = out.slice(0, 20);
    return out.trim();
  }

  function cleanMeaning(raw) {
    var s = String(raw || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    s = s.split(/\s*cf\./i)[0];
    s = s.split(/📺|유튜브|출처|원문/)[0];
    s = s.replace(/\((?:명|동|형|부|숙|관|감|명사|동사|형용사|부사)[^)]{0,8}\)/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    var parts = s.split(/[,，、·]/);
    var glosses = [];
    for (var i = 0; i < parts.length; i++) {
      var g = shortenGloss(parts[i]);
      if (!g || glosses.indexOf(g) !== -1) continue;
      glosses.push(g);
      if (glosses.length >= 2) break;
    }
    return glosses.join(', ');
  }

  function normalizeWords(raw) {
    return (Array.isArray(raw) ? raw : [])
      .map(function (item) {
        if (!item || !item.word) return null;
        var word = String(item.word).trim();
        if (!isSingleWord(word)) return null;
        var meaning = cleanMeaning(item.meaning);
        if (!meaning) return null;
        return {
          word: word,
          pos: String(item.pos || '').trim(),
          meaning: meaning,
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

  function loadSaved() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function writeSaved(list) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(list));
    } catch (e) { /* ignore */ }
  }

  function isSaved(word) {
    var key = String(word || '').toLowerCase();
    return loadSaved().some(function (x) {
      return String(x.word || '').toLowerCase() === key;
    });
  }

  function toggleSave(word, meaning) {
    var key = String(word || '').toLowerCase();
    var list = loadSaved();
    var idx = list.findIndex(function (x) {
      return String(x.word || '').toLowerCase() === key;
    });
    if (idx >= 0) list.splice(idx, 1);
    else list.push({ word: word, meaning: meaning || '', at: Date.now() });
    writeSaved(list);
    return idx < 0;
  }

  function downloadText(filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function wordKey(word) {
    return String(word || '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-']/g, '');
  }

  function renderWordRow(w) {
    var chips = (w.sections || []).map(function (sec) {
      var href = SECTION_HREF[sec] || '#rd-glossary';
      return '<a class="rd-gloss-sec" href="' + href + '">' + escapeHtml(sec) + '</a>';
    }).join('');
    var saved = isSaved(w.word);
    return (
      '<li class="rd-gloss-row" data-gloss-word="' + escapeAttr(w.word) + '" data-gloss-meaning="' + escapeAttr(w.meaning) + '">' +
        '<div class="rd-gloss-row-main">' +
          '<span class="rd-gloss-word">' + escapeHtml(w.word) + '</span>' +
          (w.pos ? '<span class="rd-gloss-pos">' + escapeHtml(w.pos) + '</span>' : '') +
        '</div>' +
        '<p class="rd-gloss-meaning">' + escapeHtml(w.meaning) + '</p>' +
        (chips
          ? '<div class="rd-gloss-secs"><span class="rd-gloss-secs-label">사용 섹션</span>' + chips + '</div>'
          : '') +
        '<div class="rd-gloss-tools">' +
          '<button type="button" class="rd-gloss-tool" data-gloss-cmt>댓글</button>' +
          '<button type="button" class="rd-gloss-tool" data-gloss-write>글쓰기</button>' +
          '<button type="button" class="rd-gloss-tool' + (saved ? ' is-on' : '') + '" data-gloss-save aria-pressed="' + (saved ? 'true' : 'false') + '">' +
            (saved ? '저장됨' : '저장') +
          '</button>' +
          '<button type="button" class="rd-gloss-tool" data-gloss-dl>다운로드</button>' +
        '</div>' +
        '<div class="rd-gloss-cmt-host" data-gloss-cmt-host hidden></div>' +
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

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (window.BoardComments) return resolve();
        existing.addEventListener('load', function () { resolve(); });
        existing.addEventListener('error', reject);
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.async = true;
      s.onload = function () { resolve(); };
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function loadCssOnce(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureCommentAssets() {
    if (window.BoardComments) return Promise.resolve();
    if (commentsAssetsPromise) return commentsAssetsPromise;
    var ver = '20261109gloss8';
    loadCssOnce('board-comments.css?v=' + ver);
    commentsAssetsPromise = loadScriptOnce('board-comments.js?v=' + ver).catch(function (e) {
      commentsAssetsPromise = null;
      throw e;
    });
    return commentsAssetsPromise;
  }

  async function ensureRowComments(row) {
    var host = row.querySelector('[data-gloss-cmt-host]');
    if (!host) return null;
    if (host.getAttribute('data-gloss-cmt-ready') === '1') {
      host.hidden = false;
      return host;
    }
    await ensureCommentAssets();
    if (!window.BoardComments || typeof window.BoardComments.mount !== 'function') return null;
    var word = row.getAttribute('data-gloss-word') || '';
    await window.BoardComments.mount({
      board: CMT_BOARD,
      contentKey: wordKey(word) || word.toLowerCase(),
      title: word,
      word: word,
      root: host
    });
    host.setAttribute('data-gloss-cmt-ready', '1');
    host.hidden = false;
    return host;
  }

  function bindRowActions(root) {
    root.addEventListener('click', function (e) {
      var row = e.target.closest('.rd-gloss-row');
      if (!row || !root.contains(row)) return;
      var word = row.getAttribute('data-gloss-word') || '';
      var meaning = row.getAttribute('data-gloss-meaning') || '';

      var saveBtn = e.target.closest('[data-gloss-save]');
      if (saveBtn) {
        var on = toggleSave(word, meaning);
        saveBtn.classList.toggle('is-on', on);
        saveBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        saveBtn.textContent = on ? '저장됨' : '저장';
        return;
      }

      var dlBtn = e.target.closest('[data-gloss-dl]');
      if (dlBtn) {
        downloadText(word + '.txt', word + '\t' + meaning + '\n');
        return;
      }

      var cmtBtn = e.target.closest('[data-gloss-cmt]');
      var writeBtn = e.target.closest('[data-gloss-write]');
      if (cmtBtn || writeBtn) {
        ensureRowComments(row).then(function (host) {
          if (!host) return;
          var real = host.querySelector(writeBtn ? '[data-os-cmt-write]' : '[data-os-cmt-toggle]');
          if (real) real.click();
        }).catch(function (err) {
          console.warn('[home-glossary] comments failed', err);
        });
      }
    });
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
    bindRowActions(root);

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
