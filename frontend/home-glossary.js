/**
 * 홈 06 — 단어 한눈에 보기
 * 데이터: home-glossary-words.js → window.HOME_GLOSSARY_WORDS
 */
(function () {
  'use strict';

  var SECTION_HREF = {
    '01': 'index.html#rd-path-01',
    '02': 'index.html#rd-path-02',
    '03': 'index.html#rd-path-03',
    '04': 'index.html#rd-path-04',
    '05': 'index.html#rd-path-05',
    '06': 'home-glossary.html'
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

  /** 검수된 뜻은 글자수로 중간 절단하지 않음. 숫자·오염만 제거. */
  function cleanMeaning(raw) {
    var s = String(raw || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    s = s.split(/\s*cf\./i)[0];
    s = s.split(/📺|유튜브|출처|원문/)[0];
    s = s.replace(/\((?:명|동|형|부|숙|관|감|명사|동사|형용사|부사)[^)]{0,8}\)/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    /* 뜻 끝·중간 단독 숫자 혼입 제거 (소비 8, 비탈면 11) */
    s = s.replace(/\s+\d+(?=\s*[,，、]|$)/g, '');
    s = s.replace(/\s+/g, ' ').trim();
    if (!/[가-힣]/.test(s)) return '';

    var parts = s.split(/[,，、]/).map(function (p) {
      return String(p || '').replace(/\s+/g, ' ').trim();
    }).filter(Boolean);

    var glosses = [];
    for (var i = 0; i < parts.length; i++) {
      var g = parts[i]
        .replace(/[A-Za-z\/\[\{].*$/, '')
        .replace(/\s+/g, ' ')
        .trim();
      if (!g || !/[가-힣]/.test(g)) continue;
      if (glosses.indexOf(g) !== -1) continue;
      glosses.push(g);
      if (glosses.length >= 3) break;
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

  function loadSavedList() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function writeSavedList(list) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(list));
    } catch (e) { /* ignore */ }
  }

  function isListSaved(words) {
    var saved = loadSavedList();
    if (!words.length || saved.length !== words.length) return false;
    var map = Object.create(null);
    saved.forEach(function (x) {
      map[String(x.word || '').toLowerCase()] = true;
    });
    return words.every(function (w) {
      return map[String(w.word || '').toLowerCase()];
    });
  }

  function toggleSaveList(words) {
    if (isListSaved(words)) {
      writeSavedList([]);
      return false;
    }
    writeSavedList(
      words.map(function (w) {
        return { word: w.word, meaning: w.meaning || '', at: Date.now() };
      })
    );
    return true;
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

  function renderFooterTools(savedOn) {
    return (
      '<div class="rd-gloss-footer-tools" data-rd-gloss-footer-tools>' +
        '<div class="rd-gloss-tools">' +
          '<button type="button" class="rd-gloss-tool" data-gloss-cmt>댓글</button>' +
          '<button type="button" class="rd-gloss-tool" data-gloss-write>글쓰기</button>' +
          '<button type="button" class="rd-gloss-tool' + (savedOn ? ' is-on' : '') + '" data-gloss-save aria-pressed="' + (savedOn ? 'true' : 'false') + '">' +
            (savedOn ? '저장됨' : '저장') +
          '</button>' +
          '<button type="button" class="rd-gloss-tool" data-gloss-dl>다운로드</button>' +
        '</div>' +
        '<div class="rd-gloss-cmt-host" data-gloss-cmt-host hidden></div>' +
      '</div>'
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

  function renderRail(present) {
    return LETTERS.map(function (L) {
      if (present[L]) {
        return '<a class="rd-gloss-rail-btn" href="#letter-' + L + '" data-rail-letter="' + L + '">' + L + '</a>';
      }
      return '<span class="rd-gloss-rail-btn is-empty" aria-disabled="true">' + L + '</span>';
    }).join('');
  }

  function updateRailActive(rail) {
    if (!rail) return;
    var sections = document.querySelectorAll('.rd-gloss-letter');
    if (!sections.length) return;
    var marker = (window.innerHeight || 0) * 0.28;
    var current = '';
    for (var i = 0; i < sections.length; i++) {
      var rect = sections[i].getBoundingClientRect();
      if (rect.top <= marker) current = sections[i].id.replace('letter-', '');
    }
    if (!current && sections[0]) current = sections[0].id.replace('letter-', '');
    rail.querySelectorAll('[data-rail-letter]').forEach(function (btn) {
      btn.classList.toggle('is-current', btn.getAttribute('data-rail-letter') === current);
    });
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

  async function ensurePageComments(host) {
    if (!host) return null;
    if (host.getAttribute('data-gloss-cmt-ready') === '1') {
      host.hidden = false;
      return host;
    }
    await ensureCommentAssets();
    if (!window.BoardComments || typeof window.BoardComments.mount !== 'function') return null;
    await window.BoardComments.mount({
      board: CMT_BOARD,
      contentKey: 'glossary',
      title: '단어 한눈에 보기',
      root: host
    });
    host.setAttribute('data-gloss-cmt-ready', '1');
    host.hidden = false;
    return host;
  }

  function bindFooterActions(root, getWords) {
    root.addEventListener('click', function (e) {
      var footer = e.target.closest('[data-rd-gloss-footer-tools]');
      if (!footer || !root.contains(footer)) return;
      var words = typeof getWords === 'function' ? getWords() : [];

      var saveBtn = e.target.closest('[data-gloss-save]');
      if (saveBtn) {
        var on = toggleSaveList(words);
        saveBtn.classList.toggle('is-on', on);
        saveBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        saveBtn.textContent = on ? '저장됨' : '저장';
        return;
      }

      var dlBtn = e.target.closest('[data-gloss-dl]');
      if (dlBtn) {
        var list = loadSavedList();
        if (!list.length) list = words;
        var text = list
          .map(function (w) {
            return String(w.word || '') + '\t' + String(w.meaning || '');
          })
          .join('\n') + '\n';
        downloadText('home-glossary.txt', text);
        return;
      }

      var cmtBtn = e.target.closest('[data-gloss-cmt]');
      var writeBtn = e.target.closest('[data-gloss-write]');
      if (cmtBtn || writeBtn) {
        var host = footer.querySelector('[data-gloss-cmt-host]');
        ensurePageComments(host).then(function (h) {
          if (!h) return;
          var real = h.querySelector(writeBtn ? '[data-os-cmt-write]' : '[data-os-cmt-toggle]');
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
    var rail = document.getElementById('rd-gloss-rail') || document.querySelector('[data-rd-gloss-rail]');

    var currentWords = all.slice();

    function paint(query) {
      var q = String(query || '').trim().toLowerCase();
      var filtered = all.filter(function (w) { return matchesQuery(w, q); });
      currentWords = filtered;
      var groups = groupByLetter(filtered);
      var present = Object.create(null);
      var activeLetters = [];
      LETTERS.forEach(function (L) {
        if (groups[L] && groups[L].length) {
          present[L] = true;
          activeLetters.push(L);
        }
      });

      if (stats) {
        stats.innerHTML =
          '<span>전체 단어 <b>' + filtered.length + '</b></span>' +
          '<span>알파벳 <b>' + activeLetters.length + '</b>/26</span>';
      }

      if (rail) {
        if (!filtered.length) {
          rail.hidden = true;
          rail.innerHTML = '';
        } else {
          rail.hidden = false;
          rail.innerHTML = renderRail(present);
          updateRailActive(rail);
        }
      }

      if (!filtered.length) {
        if (body) body.innerHTML = '';
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;
      if (body) {
        body.innerHTML =
          renderGroups(groups, activeLetters) +
          renderFooterTools(isListSaved(filtered));
      }
      updateRailActive(rail);
    }

    paint('');
    bindFooterActions(root, function () { return currentWords; });

    if (rail) {
      var railTick = false;
      window.addEventListener('scroll', function () {
        if (railTick) return;
        railTick = true;
        requestAnimationFrame(function () {
          railTick = false;
          updateRailActive(rail);
        });
      }, { passive: true });
      rail.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-rail-letter]');
        if (!btn) return;
        var target = document.getElementById('letter-' + btn.getAttribute('data-rail-letter'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }

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
