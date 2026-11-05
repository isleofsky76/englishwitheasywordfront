/**
 * 문장으로 익히는 단어 — DB(/onesentence) 누적 피드 + 검색 + TTS
 * 관리자: ?admin=1 로 UI 잠금 해제 (변이 API는 서버 ADMIN_PASSWORD 검증)
 * 데이터 추가: backend/scripts/append-one-sentence.js 또는 페이지 관리자 폼
 */
(function () {
  'use strict';

  var SPEAKER_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a10 10 0 0 1 0 14"></path></svg>';

  /** API 실패 시 잠깐 보일 로컬 폴백 (배포 직후 등) */
  var FALLBACK_FEED = Array.isArray(window.ONE_SENTENCE_FEED) ? window.ONE_SENTENCE_FEED.slice() : [];

  var ADMIN_STORAGE_KEY = 'ees-os-admin';
  var cachedAdminPassword = '';
  var deleteConfirmTimers = Object.create(null);
  var feedAll = [];
  var refreshFeed = function () {};

  function apiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') {
      return window.getPage30ApiBaseUrl();
    }
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function isAdminUnlocked() {
    try {
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function syncAdminUnlockFromUrl() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('admin') === '1') {
      try {
        sessionStorage.setItem(ADMIN_STORAGE_KEY, '1');
      } catch (e) { /* ignore */ }
    }
    if (params.get('admin') === '0') {
      try {
        sessionStorage.removeItem(ADMIN_STORAGE_KEY);
      } catch (e) { /* ignore */ }
      cachedAdminPassword = '';
    }
  }

  function promptAdminPassword() {
    if (cachedAdminPassword) return cachedAdminPassword;
    var pw = window.prompt('관리자 비밀번호를 입력하세요:');
    if (pw == null || !String(pw).trim()) return '';
    return String(pw);
  }

  function rememberAdminPassword(pw) {
    cachedAdminPassword = String(pw || '');
  }

  function clearRememberedPassword() {
    cachedAdminPassword = '';
  }

  function escapeHtml(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/\n/g, ' ');
  }

  function highlightEn(en, highlight) {
    var raw = String(en || '');
    var hl = String(highlight || '').trim();
    if (!hl) return escapeHtml(raw);
    var re;
    try {
      re = new RegExp('(' + hl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'i');
    } catch (e) {
      return escapeHtml(raw);
    }
    var m = raw.match(re);
    if (!m) return escapeHtml(raw);
    var idx = m.index;
    var matched = m[1];
    return (
      escapeHtml(raw.slice(0, idx)) +
      '<mark>' + escapeHtml(matched) + '</mark>' +
      escapeHtml(raw.slice(idx + matched.length))
    );
  }

  var activeTtsBtn = null;

  function clearTtsPlayingState(btn) {
    if (btn) btn.classList.remove('is-playing');
    if (activeTtsBtn === btn) activeTtsBtn = null;
  }

  function speakText(text, btn) {
    if (!window.speechSynthesis || !text) return;
    try {
      var synth = window.speechSynthesis;
      var isThisPlaying =
        btn &&
        btn.classList.contains('is-playing') &&
        (synth.speaking || synth.pending);
      /* 같은 스피커 다시 누르면 정지 */
      if (isThisPlaying) {
        synth.cancel();
        clearTtsPlayingState(btn);
        return;
      }
      synth.cancel();
      if (activeTtsBtn && activeTtsBtn !== btn) {
        activeTtsBtn.classList.remove('is-playing');
      }
      document.querySelectorAll('.os-tts.is-playing').forEach(function (el) {
        el.classList.remove('is-playing');
      });
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.95;
      if (btn) {
        btn.classList.add('is-playing');
        activeTtsBtn = btn;
        u.onend = function () { clearTtsPlayingState(btn); };
        u.onerror = function () { clearTtsPlayingState(btn); };
      }
      synth.speak(u);
    } catch (e) { /* ignore */ }
  }

  function normalizeCfList(raw) {
    var list = Array.isArray(raw) ? raw : (raw && raw.word ? [raw] : []);
    return list
      .map(function (c) {
        return {
          word: String((c && c.word) || '').trim(),
          pos: String((c && c.pos) || '').trim(),
          meaning: String((c && c.meaning) || '').trim()
        };
      })
      .filter(function (c) { return !!c.word; });
  }

  function normalizeEntry(raw) {
    if (!raw) return null;
    var word = String(raw.word || '').trim();
    var en = String(raw.en || '').trim();
    if (!word || !en) return null;
    var id = raw._id != null ? String(raw._id) : (raw.id != null ? String(raw.id) : '');
    return {
      id: id,
      word: word,
      pos: String(raw.pos || '').trim(),
      meaning: String(raw.meaning || '').trim(),
      ko: String(raw.ko || '').trim(),
      en: en,
      highlight: String(raw.highlight || word).trim(),
      ipa: String(raw.ipa || '').trim(),
      ipaKo: String(raw.ipaKo || '').trim(),
      cf: normalizeCfList(raw.cf),
      memo: String(raw.memo || '').trim(),
      date: raw.date || null
    };
  }

  function parseCfLine(raw) {
    var s = String(raw || '').trim();
    if (!s) return [];
    var m = s.match(/^(.+?)\s+(\S+)\s*[-–—]\s*(.+)$/);
    if (m) {
      return [{ word: m[1].trim(), pos: m[2].trim(), meaning: m[3].trim() }];
    }
    return [{ word: s, pos: '', meaning: '' }];
  }

  function wordAnchorId(word, pos) {
    var base = 'os-w-' + String(word || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    var p = String(pos || '')
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return p ? base + '-' + p : base;
  }

  function renderCfLines(cfList) {
    if (!cfList || !cfList.length) return '';
    return cfList.map(function (c) {
      return (
        '<p class="os-cf">' +
          '<span class="os-cf-label">cf.</span> ' +
          '<span class="os-cf-en">' + escapeHtml(c.word) + '</span>' +
          (c.pos ? ' <span class="os-cf-pos">' + escapeHtml(c.pos) + '</span>' : '') +
          (c.meaning ? ' <span class="os-cf-dash">-</span> <span class="os-cf-ko">' + escapeHtml(c.meaning) + '</span>' : '') +
        '</p>'
      );
    }).join('');
  }

  function renderPron(item) {
    var ipa = String(item.ipa || '').trim();
    var ipaKo = String(item.ipaKo || '').trim();
    if (!ipa && !ipaKo) return '';
    var inner = '';
    if (ipa) {
      var shown = /^\//.test(ipa) ? ipa : ('/' + ipa + '/');
      inner += '<span class="os-head-ipa">' + escapeHtml(shown) + '</span>';
    }
    if (ipaKo) {
      if (inner) inner += ' ';
      inner += '<span class="os-head-pron">' + escapeHtml(ipaKo) + '</span>';
    }
    return ' <span class="os-head-sound">' + inner + '</span>';
  }

  function renderMemoBox(memo) {
    var text = String(memo || '').trim();
    if (!text) return '';
    return (
      '<div class="os-memo">' +
        '<span class="os-memo-label">메모</span>' +
        '<p class="os-memo-body">' + escapeHtml(text) + '</p>' +
      '</div>'
    );
  }

  function renderAdminActions(item) {
    if (!isAdminUnlocked() || !item.id) return '';
    return (
      '<div class="os-admin-actions">' +
        '<button type="button" class="os-admin-link" data-os-memo="' +
        escapeAttr(item.id) +
        '">관리자 메모</button>' +
        '<span class="os-admin-sep" aria-hidden="true"> · </span>' +
        '<button type="button" class="os-admin-link" data-os-del="' +
        escapeAttr(item.id) +
        '">삭제</button>' +
      '</div>' +
      '<div class="os-memo-editor" data-os-memo-editor="' +
      escapeAttr(item.id) +
      '" hidden></div>'
    );
  }

  function renderItem(item) {
    var aid = wordAnchorId(item.word, item.pos);
    var pos = String(item.pos || '').trim();
    var meaning = String(item.meaning || '').trim();
    var meta =
      pos || meaning
        ? '<p class="os-meta">' +
          (pos ? '<span class="os-head-pos">' + escapeHtml(pos) + '</span>' : '') +
          (pos && meaning ? ' ' : '') +
          (meaning ? '<span class="os-head-ko">' + escapeHtml(meaning) + '</span>' : '') +
          '</p>'
        : '';
    return (
      '<article class="os-item" id="' +
      escapeAttr(aid) +
      '" data-word="' +
      escapeAttr(item.word) +
      '"' +
      (item.id ? ' data-id="' + escapeAttr(item.id) + '"' : '') +
      ' data-word-key="' +
      escapeAttr(aid) +
      '" data-pos="' +
      escapeAttr(pos) +
      '">' +
        '<p class="os-head">' +
          '<span class="os-head-en">' + escapeHtml(item.word) + '</span>' +
          renderPron(item) +
        '</p>' +
        meta +
        renderCfLines(item.cf) +
        '<div class="os-en-row">' +
          '<p class="os-en">' + highlightEn(item.en, item.highlight || item.word) + '</p>' +
          '<button type="button" class="os-tts" data-os-tts="' + escapeAttr(item.en) +
            '" aria-label="' + escapeAttr(item.word + ' 문장 듣기') + '">' + SPEAKER_SVG + '</button>' +
        '</div>' +
        (item.ko ? '<p class="os-ko">' + escapeHtml(item.ko) + '</p>' : '') +
        renderMemoBox(item.memo) +
        '<div class="os-item-foot">' +
          '<div class="os-comments-root" data-os-comments-root></div>' +
          '<button type="button" class="os-meaning-toggle" data-os-meaning-toggle aria-pressed="false">뜻 보기</button>' +
          '<button type="button" class="os-save-toggle" data-os-save-toggle aria-pressed="false">저장</button>' +
          '<button type="button" class="os-item-download" data-os-item-download hidden>다운로드</button>' +
        '</div>' +
        renderAdminActions(item) +
      '</article>'
    );
  }

  function letterOf(word) {
    var ch = String(word || '').trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  var POS_ORDER = { '명사': 1, '동사': 2, '형용사': 3, '부사': 4, '숙어': 5 };

  function sortByWord(items) {
    return items.slice().sort(function (a, b) {
      var aw = String(a.word || '').toLowerCase();
      var bw = String(b.word || '').toLowerCase();
      if (aw < bw) return -1;
      if (aw > bw) return 1;
      var ap = POS_ORDER[String(a.pos || '').trim()] || 50;
      var bp = POS_ORDER[String(b.pos || '').trim()] || 50;
      if (ap !== bp) return ap - bp;
      return String(a.meaning || '').localeCompare(String(b.meaning || ''), 'ko');
    });
  }

  function groupByLetter(items) {
    var sorted = sortByWord(items);
    var groups = [];
    var cur = null;
    sorted.forEach(function (it) {
      var letter = letterOf(it.word);
      if (!cur || cur.letter !== letter) {
        cur = { letter: letter, items: [] };
        groups.push(cur);
      }
      cur.items.push(it);
    });
    return groups;
  }

  function uniqueWordTags(items) {
    var map = Object.create(null);
    var order = [];
    sortByWord(items).forEach(function (it) {
      var key = String(it.word || '').toLowerCase();
      if (!key) return;
      if (!map[key]) {
        map[key] = { word: it.word, tips: [] };
        order.push(key);
      }
      var tip = [String(it.pos || '').trim(), String(it.meaning || '').trim()]
        .filter(Boolean)
        .join(' · ');
      if (tip && map[key].tips.indexOf(tip) === -1) {
        map[key].tips.push(tip);
      }
    });
    return order.map(function (k) {
      return {
        word: map[k].word,
        tip: map[k].tips.join(' / ')
      };
    });
  }

  function renderTags(items) {
    var tags = document.getElementById('os-tags');
    if (!tags) return;
    var words = uniqueWordTags(items);
    if (!words.length) {
      tags.setAttribute('hidden', '');
      tags.innerHTML = '';
      return;
    }
    tags.removeAttribute('hidden');
    var html =
      '<p class="os-tags-hint">한 번 누르면 뜻이 보이고 · 두 번 누르면 예문으로 이동합니다.</p>';
    var lastLetter = '';
    words.forEach(function (entry) {
      var w = entry.word;
      var tip = entry.tip || '';
      var letter = letterOf(w);
      if (letter !== lastLetter) {
        lastLetter = letter;
        html +=
          '<span class="os-tag-letter" id="os-tag-' +
          escapeAttr(letter) +
          '">' +
          escapeHtml(letter) +
          '</span>';
      }
      html +=
        '<button type="button" class="os-tag" data-os-jump="' +
        escapeAttr(w) +
        '"' +
        (tip
          ? ' data-tip="' + escapeAttr(tip) + '" aria-label="' +
            escapeAttr(w + ' — ' + tip) +
            '"'
          : '') +
        '>' +
        escapeHtml(w) +
        '</button>';
    });
    tags.innerHTML = html;
  }

  function filterItems(items, q) {
    var needle = String(q || '').trim().toLowerCase();
    if (!needle) return items.slice();
    return items.filter(function (it) {
      var blob = [it.word, it.pos, it.meaning, it.ko, it.en, it.memo, it.ipaKo].join(' ').toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
  }

  function renderLoading() {
    var feed = document.getElementById('os-feed');
    var count = document.getElementById('os-count');
    var index = document.getElementById('os-alpha');
    if (feed) feed.innerHTML = '<p class="os-empty" aria-live="polite">글을 불러오는 중입니다.</p>';
    if (count) count.textContent = '글을 불러오는 중입니다.';
    if (index) {
      index.hidden = true;
      index.innerHTML = '';
    }
    syncFixedAlphaLayout();
  }

  function renderFeed(items) {
    var feed = document.getElementById('os-feed');
    var count = document.getElementById('os-count');
    var index = document.getElementById('os-alpha');
    if (!feed) return;
    if (!items.length) {
      feed.innerHTML = '<p class="os-empty">아직 등록된 문장이 없습니다.</p>';
      if (index) {
        index.hidden = true;
        index.innerHTML = '';
      }
      if (alphaObserver) {
        alphaObserver.disconnect();
        alphaObserver = null;
      }
      syncFixedAlphaLayout();
    } else {
      var groups = groupByLetter(items);
      feed.innerHTML = groups
        .map(function (g) {
          return (
            '<section class="os-letter-group" id="os-letter-' +
            escapeAttr(g.letter) +
            '" aria-label="' +
            escapeAttr(g.letter) +
            '">' +
            '<h2 class="os-letter-head">' +
            escapeHtml(g.letter) +
            '</h2>' +
            g.items.map(renderItem).join('') +
            '</section>'
          );
        })
        .join('');
      if (index) {
        index.hidden = false;
        var hideOn = isHideMeaningOn();
        index.innerHTML =
          '<div class="os-alpha-inner">' +
          groups
            .map(function (g) {
              return (
                '<a class="os-alpha-link" href="#os-letter-' +
                escapeAttr(g.letter) +
                '" data-letter="' +
                escapeAttr(g.letter) +
                '">' +
                escapeHtml(g.letter) +
                '</a>'
              );
            })
            .join('') +
          '<label class="os-hide-meaning-toggle" title="' +
          (hideOn ? '체크 해제하면 뜻이 보입니다' : '체크하면 뜻을 가립니다') +
          '">' +
          '<input type="checkbox" class="os-hide-meaning-input" id="os-hide-meaning"' +
          (hideOn ? ' checked' : '') +
          '>' +
          '<span class="os-hide-meaning-label">' +
          (hideOn ? '전체 뜻 해제하기' : '전체 뜻 가리기') +
          '</span>' +
          '</label>' +
          '</div>';
        applyHideMeaning(hideOn);
        if (groups[0]) setActiveAlpha(groups[0].letter);
      }
      observeLetterGroups();
      requestAnimationFrame(syncFixedAlphaLayout);
    }
    if (count) count.textContent = '총 ' + items.length + '개';
    if (window.OsComments && typeof window.OsComments.mountAll === 'function') {
      window.OsComments.mountAll();
    }
    syncAllMeaningToggleButtons();
    syncAllSaveToggleButtons();
    syncDownloadButton();
  }

  function syncFixedAlphaLayout() {
    var alpha = document.getElementById('os-alpha');
    var btn = document.getElementById('os-back-top');
    var visible = Boolean(alpha && !alpha.hidden);
    var h = visible ? alpha.offsetHeight : 0;
    document.documentElement.style.setProperty('--os-alpha-h', h + 'px');
    if (btn) btn.hidden = !visible;
  }

  function getOsScrollOffset() {
    var alpha = document.getElementById('os-alpha');
    var alphaH = alpha && !alpha.hidden ? alpha.offsetHeight : 0;
    return alphaH + 10;
  }

  function scrollToOsAnchor(el) {
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY - getOsScrollOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function scrollToOsTop() {
    var hero = document.querySelector('.os-hero') || document.getElementById('main-content');
    if (!hero) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var y = hero.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function setActiveAlpha(letter) {
    var index = document.getElementById('os-alpha');
    if (!index) return;
    var want = String(letter || '').toUpperCase();
    index.querySelectorAll('.os-alpha-link').forEach(function (link) {
      var L = String(link.getAttribute('data-letter') || link.textContent || '').trim().toUpperCase();
      link.classList.toggle('is-active', Boolean(want) && L === want);
    });
  }

  var alphaObserver = null;
  function observeLetterGroups() {
    if (alphaObserver) {
      alphaObserver.disconnect();
      alphaObserver = null;
    }
    if (!('IntersectionObserver' in window)) return;
    var groups = document.querySelectorAll('.os-letter-group');
    if (!groups.length) return;
    alphaObserver = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return a.boundingClientRect.top - b.boundingClientRect.top; });
        if (!visible.length) return;
        var id = visible[0].target.id || '';
        var letter = id.replace(/^os-letter-/, '');
        if (letter) setActiveAlpha(letter);
      },
      {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25],
      }
    );
    groups.forEach(function (g) { alphaObserver.observe(g); });
  }

  var HIDE_MEANING_KEY = 'os-hide-meaning';
  /* 탭이 열려 있는 동안만 유지 (새로고침해도 같은 탭이면 유지, 탭 닫으면 삭제) */
  var SAVED_WORDS_KEY = 'os-saved-words-session';

  function readSavedMap() {
    try {
      var raw = sessionStorage.getItem(SAVED_WORDS_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeSavedMap(map) {
    try {
      sessionStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(map || {}));
    } catch (e) { /* ignore quota */ }
  }

  function savedCount() {
    return Object.keys(readSavedMap()).length;
  }

  function isWordSaved(wordKey) {
    return Boolean(wordKey && readSavedMap()[wordKey]);
  }

  function findFeedItemByKey(wordKey) {
    var key = String(wordKey || '');
    if (!key) return null;
    for (var i = 0; i < feedAll.length; i += 1) {
      var it = feedAll[i];
      if (!it) continue;
      if (wordAnchorId(it.word, it.pos) === key) return it;
    }
    return null;
  }

  function syncSaveToggleButton(btn, wordKey) {
    if (!btn) return;
    var on = isWordSaved(wordKey);
    btn.textContent = on ? '저장됨' : '저장';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.title = on ? '저장 취소' : '이 탭에만 잠시 저장';
  }

  function syncItemDownloadButton(itemEl, wordKey) {
    if (!itemEl) return;
    var btn = itemEl.querySelector('[data-os-item-download]');
    if (!btn) return;
    var on = isWordSaved(wordKey);
    btn.hidden = !on;
    btn.title = on ? '저장한 단어 전체 다운로드' : '';
  }

  function syncAllSaveToggleButtons() {
    document.querySelectorAll('.os-item').forEach(function (itemEl) {
      var key = itemEl.getAttribute('data-word-key') || '';
      syncSaveToggleButton(itemEl.querySelector('[data-os-save-toggle]'), key);
      syncItemDownloadButton(itemEl, key);
    });
  }

  function syncDownloadButton() {
    var btn = document.getElementById('os-download-saved');
    var countEl = document.getElementById('os-saved-count');
    var n = savedCount();
    if (countEl) countEl.textContent = String(n);
    if (btn) {
      btn.hidden = n === 0;
      btn.disabled = n === 0;
      btn.title =
        n === 0
          ? '저장한 단어가 없습니다 (이 탭에서만 잠시 보관)'
          : '저장한 ' + n + '개 다운로드 (탭을 닫으면 저장 목록도 사라집니다)';
    }
    syncAllSaveToggleButtons();
  }

  function toggleSaveWord(itemEl) {
    if (!itemEl) return;
    var wordKey = itemEl.getAttribute('data-word-key') || '';
    if (!wordKey) return;
    var map = readSavedMap();
    if (map[wordKey]) {
      delete map[wordKey];
    } else {
      var it = findFeedItemByKey(wordKey) || {};
      map[wordKey] = {
        word: String(it.word || itemEl.getAttribute('data-word') || '').trim(),
        pos: String(it.pos || itemEl.getAttribute('data-pos') || '').trim(),
        meaning: String(it.meaning || '').trim(),
        ipa: String(it.ipa || '').trim(),
        ipaKo: String(it.ipaKo || it.reading || '').trim(),
        en: String(it.en || '').trim(),
        ko: String(it.ko || '').trim(),
        savedAt: Date.now(),
      };
    }
    writeSavedMap(map);
    syncSaveToggleButton(itemEl.querySelector('[data-os-save-toggle]'), wordKey);
    syncItemDownloadButton(itemEl, wordKey);
    syncDownloadButton();
  }

  function downloadSavedWords() {
    var map = readSavedMap();
    var keys = Object.keys(map);
    if (!keys.length) return;
    keys.sort(function (a, b) {
      return String(map[a].word || '').localeCompare(String(map[b].word || ''), 'en', {
        sensitivity: 'base',
      });
    });
    if (window.SiteStats && typeof window.SiteStats.trackDownload === 'function') {
      window.SiteStats.trackDownload(
        keys.map(function (k) {
          return (map[k] && map[k].word) || '';
        }),
        'one-sentence'
      );
    }
    var lines = [
      '단어\t품사\t뜻\t발음\t예문\t해석',
    ];
    keys.forEach(function (k) {
      var it = map[k] || {};
      var pron = [it.ipa, it.ipaKo].filter(Boolean).join(' ');
      lines.push(
        [
          it.word || '',
          it.pos || '',
          it.meaning || '',
          pron,
          String(it.en || '').replace(/\s+/g, ' ').trim(),
          String(it.ko || '').replace(/\s+/g, ' ').trim(),
        ]
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
    a.download = 'one-sentence-saved-' + y + m + d + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function bindSavedDownload() {
    var btn = document.getElementById('os-download-saved');
    if (!btn || btn._osBound) return;
    btn._osBound = true;
    btn.addEventListener('click', function () {
      downloadSavedWords();
    });
    syncDownloadButton();
  }

  function isHideMeaningOn() {
    try {
      var v = localStorage.getItem(HIDE_MEANING_KEY);
      if (v === null) return true; /* default: 뜻 가림 */
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function isItemMeaningVisible(itemEl) {
    if (!itemEl) return false;
    var globalHide = document.body.classList.contains('os-hide-meaning');
    if (globalHide) return itemEl.classList.contains('is-meaning-shown');
    return !itemEl.classList.contains('is-meaning-hidden');
  }

  function syncMeaningToggleButton(btn, itemEl) {
    if (!btn || !itemEl) return;
    var shown = isItemMeaningVisible(itemEl);
    btn.textContent = shown ? '뜻 숨기기' : '뜻 보기';
    btn.setAttribute('aria-pressed', shown ? 'true' : 'false');
    btn.title = shown ? '이 단어의 뜻을 가립니다' : '이 단어의 뜻을 봅니다';
  }

  function syncAllMeaningToggleButtons() {
    document.querySelectorAll('.os-item').forEach(function (itemEl) {
      syncMeaningToggleButton(itemEl.querySelector('[data-os-meaning-toggle]'), itemEl);
    });
  }

  function toggleItemMeaning(itemEl) {
    if (!itemEl) return;
    var globalHide = document.body.classList.contains('os-hide-meaning');
    var shown = isItemMeaningVisible(itemEl);
    if (globalHide) {
      itemEl.classList.toggle('is-meaning-shown', !shown);
      itemEl.classList.remove('is-meaning-hidden');
    } else {
      itemEl.classList.toggle('is-meaning-hidden', shown);
      itemEl.classList.remove('is-meaning-shown');
    }
    syncMeaningToggleButton(itemEl.querySelector('[data-os-meaning-toggle]'), itemEl);
  }

  function applyHideMeaning(on) {
    var hide = !!on;
    document.body.classList.toggle('os-hide-meaning', hide);
    try {
      localStorage.setItem(HIDE_MEANING_KEY, hide ? '1' : '0');
    } catch (e) { /* ignore */ }
    /* 전체 모드가 바뀌면 개별 예외는 초기화 */
    document.querySelectorAll('.os-item.is-meaning-shown, .os-item.is-meaning-hidden').forEach(function (el) {
      el.classList.remove('is-meaning-shown', 'is-meaning-hidden');
    });
    var cb = document.getElementById('os-hide-meaning');
    if (cb && cb.checked !== hide) cb.checked = hide;
    var label = document.querySelector('.os-hide-meaning-label');
    if (label) label.textContent = hide ? '전체 뜻 해제하기' : '전체 뜻 가리기';
    var wrap = document.querySelector('.os-hide-meaning-toggle');
    if (wrap) {
      wrap.title = hide ? '체크 해제하면 뜻이 보입니다' : '체크하면 뜻을 가립니다';
    }
    syncAllMeaningToggleButtons();
  }

  function bindAlphaNav() {
    var index = document.getElementById('os-alpha');
    if (!index || index._osBound) return;
    index._osBound = true;
    index.addEventListener('click', function (e) {
      var link = e.target.closest('.os-alpha-link');
      if (!link || !index.contains(link)) return;
      e.preventDefault();
      var letter = String(link.getAttribute('data-letter') || link.textContent || '').trim();
      var target = document.getElementById('os-letter-' + letter);
      if (!target) return;
      setActiveAlpha(letter);
      scrollToOsAnchor(target);
    });
    index.addEventListener('change', function (e) {
      var cb = e.target.closest('.os-hide-meaning-input');
      if (!cb || !index.contains(cb)) return;
      applyHideMeaning(cb.checked);
    });
  }

  function bindBackTop() {
    var btn = document.getElementById('os-back-top');
    if (!btn || btn._osBound) return;
    btn._osBound = true;
    btn.addEventListener('click', function () {
      setActiveAlpha('');
      scrollToOsTop();
    });
    window.addEventListener('resize', syncFixedAlphaLayout, { passive: true });
    syncFixedAlphaLayout();
  }

  function scrollToWord(word) {
    var target = String(word || '').trim().toLowerCase();
    if (!target) return;
    var feed = document.getElementById('os-feed');
    var el = null;
    if (feed) {
      var nodes = feed.querySelectorAll('.os-item[data-word]');
      for (var i = 0; i < nodes.length; i += 1) {
        if (String(nodes[i].getAttribute('data-word') || '').toLowerCase() === target) {
          el = nodes[i];
          break;
        }
      }
    }
    if (!el) el = document.getElementById(wordAnchorId(word));
    if (!el) return;
    scrollToOsAnchor(el);
    el.classList.add('os-item-flash');
    window.setTimeout(function () {
      el.classList.remove('os-item-flash');
    }, 1200);
  }

  async function loadFeedFromApi() {
    var url = apiBase().replace(/\/$/, '') + '/onesentence';
    var res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    var list = Array.isArray(data.entries) ? data.entries : (Array.isArray(data) ? data : []);
    return list.map(normalizeEntry).filter(Boolean);
  }

  async function adminPost(path, body) {
    var url = apiBase().replace(/\/$/, '') + path;
    var res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    var data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    if (!res.ok) {
      var msg = (data && data.error) || ('HTTP ' + res.status);
      var err = new Error(msg);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  function findItemById(id) {
    var sid = String(id || '');
    for (var i = 0; i < feedAll.length; i += 1) {
      if (String(feedAll[i].id) === sid) return feedAll[i];
    }
    return null;
  }

  function openMemoEditor(id) {
    var editor = document.querySelector('[data-os-memo-editor="' + id + '"]');
    if (!editor) return;
    var item = findItemById(id);
    editor.hidden = false;
    editor.textContent = '';

    var ta = document.createElement('textarea');
    ta.className = 'os-memo-textarea';
    ta.rows = 3;
    ta.value = item ? String(item.memo || '') : '';
    ta.setAttribute('aria-label', '관리자 메모');

    var row = document.createElement('div');
    row.className = 'os-memo-editor-actions';

    var btnCancel = document.createElement('button');
    btnCancel.type = 'button';
    btnCancel.className = 'os-memo-btn';
    btnCancel.textContent = '취소';
    btnCancel.addEventListener('click', function () {
      editor.hidden = true;
      editor.textContent = '';
    });

    var btnSave = document.createElement('button');
    btnSave.type = 'button';
    btnSave.className = 'os-memo-btn os-memo-btn-primary';
    btnSave.textContent = '저장';
    btnSave.addEventListener('click', function () {
      saveMemo(id, ta.value, btnSave);
    });

    row.appendChild(btnCancel);
    row.appendChild(btnSave);
    editor.appendChild(ta);
    editor.appendChild(row);
    ta.focus();
  }

  async function saveMemo(id, memoText, btn) {
    var pw = promptAdminPassword();
    if (!pw) return;
    if (btn) {
      btn.disabled = true;
      btn.textContent = '저장 중…';
    }
    try {
      await adminPost('/onesentence/admin/memo', {
        id: id,
        memo: memoText,
        adminPasswordInput: pw,
      });
      rememberAdminPassword(pw);
      var item = findItemById(id);
      if (item) item.memo = String(memoText || '').trim();
      refreshFeed();
    } catch (err) {
      if (err && err.status === 403) clearRememberedPassword();
      window.alert('메모 저장 실패: ' + (err && err.message ? err.message : err));
      if (btn) {
        btn.disabled = false;
        btn.textContent = '저장';
      }
    }
  }

  async function deleteEntry(id, btn) {
    var key = String(id);
    var now = Date.now();
    if (!deleteConfirmTimers[key] || now > deleteConfirmTimers[key]) {
      deleteConfirmTimers[key] = now + 3000;
      if (btn) btn.textContent = '한 번 더 누르면 삭제';
      window.setTimeout(function () {
        if (deleteConfirmTimers[key] && Date.now() >= deleteConfirmTimers[key] - 50) {
          delete deleteConfirmTimers[key];
          if (btn && btn.isConnected) btn.textContent = '삭제';
        }
      }, 3000);
      return;
    }
    delete deleteConfirmTimers[key];
    var pw = promptAdminPassword();
    if (!pw) {
      if (btn) btn.textContent = '삭제';
      return;
    }
    if (btn) {
      btn.disabled = true;
      btn.textContent = '삭제 중…';
    }
    try {
      await adminPost('/onesentence/admin/deletepost', {
        id: id,
        adminPasswordInput: pw,
      });
      rememberAdminPassword(pw);
      feedAll = feedAll.filter(function (it) {
        return String(it.id) !== key;
      });
      refreshFeed();
    } catch (err) {
      if (err && err.status === 403) clearRememberedPassword();
      window.alert('삭제 실패: ' + (err && err.message ? err.message : err));
      if (btn) {
        btn.disabled = false;
        btn.textContent = '삭제';
      }
    }
  }

  function injectAdminForm() {
    if (!isAdminUnlocked()) {
      var old = document.getElementById('os-admin-form');
      if (old) old.remove();
      return;
    }
    if (document.getElementById('os-admin-form')) return;
    var hero = document.querySelector('.os-hero');
    if (!hero) return;

    var form = document.createElement('form');
    form.id = 'os-admin-form';
    form.className = 'os-admin-form';
    form.setAttribute('autocomplete', 'off');

    var title = document.createElement('h2');
    title.className = 'os-admin-form-title';
    title.textContent = '새 단어 추가';
    form.appendChild(title);

    function field(labelText, name, opts) {
      opts = opts || {};
      var wrap = document.createElement('label');
      wrap.className = 'os-admin-field';
      var span = document.createElement('span');
      span.textContent = labelText;
      wrap.appendChild(span);
      var input;
      if (opts.textarea) {
        input = document.createElement('textarea');
        input.rows = opts.rows || 2;
      } else {
        input = document.createElement('input');
        input.type = opts.type || 'text';
      }
      input.name = name;
      input.id = 'os-af-' + name;
      if (opts.required) input.required = true;
      if (opts.placeholder) input.placeholder = opts.placeholder;
      wrap.appendChild(input);
      form.appendChild(wrap);
      return input;
    }

    field('word (단어)', 'word', { required: true });
    field('ipa (발음기호)', 'ipa', { placeholder: '/əˈbæk/' });
    field('ko (한글 발음)', 'ipaKo', { placeholder: '어백' });
    field('pos (품사)', 'pos', { placeholder: '부사' });
    field('def (뜻)', 'meaning', { required: true, placeholder: '(taken aback) 깜짝 놀라, 당황하여' });
    field('cf (참고, 선택)', 'cf', { placeholder: 'taken aback 숙어 - 깜짝 놀라다' });
    field('ex (예문)', 'en', { required: true, textarea: true });
    field('exko (예문 해석)', 'ko', { required: true, textarea: true });
    field('highlight (강조, 선택)', 'highlight', { placeholder: '비우면 단어와 동일' });
    field('memo (관리자 메모, 선택)', 'memo', { textarea: true, rows: 2 });

    var actions = document.createElement('div');
    actions.className = 'os-admin-form-actions';
    var submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'os-admin-submit';
    submit.textContent = '추가';
    var status = document.createElement('p');
    status.className = 'os-admin-status';
    status.setAttribute('aria-live', 'polite');
    actions.appendChild(submit);
    actions.appendChild(status);
    form.appendChild(actions);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var pw = promptAdminPassword();
      if (!pw) return;
      var payload = {
        word: String(fd.get('word') || '').trim(),
        ipa: String(fd.get('ipa') || '').trim(),
        ipaKo: String(fd.get('ipaKo') || '').trim(),
        pos: String(fd.get('pos') || '').trim(),
        meaning: String(fd.get('meaning') || '').trim(),
        en: String(fd.get('en') || '').trim(),
        ko: String(fd.get('ko') || '').trim(),
        highlight: String(fd.get('highlight') || '').trim(),
        memo: String(fd.get('memo') || '').trim(),
        cf: parseCfLine(fd.get('cf')),
        adminPasswordInput: pw,
      };
      if (!payload.word || !payload.en) {
        status.textContent = 'word와 예문(ex)은 필수입니다.';
        return;
      }
      submit.disabled = true;
      status.textContent = '저장 중…';
      adminPost('/onesentence/admin/create', payload)
        .then(function (data) {
          rememberAdminPassword(pw);
          status.textContent = '추가됨';
          form.reset();
          submit.disabled = false;
          var entry = normalizeEntry(data && data.entry);
          if (entry) {
            feedAll = feedAll.concat([entry]);
            refreshFeed();
            window.setTimeout(function () {
              scrollToWord(entry.word);
            }, 80);
          } else {
            return loadFeedFromApi().then(function (items) {
              feedAll = items;
              refreshFeed();
            });
          }
        })
        .catch(function (err) {
          if (err && err.status === 403) clearRememberedPassword();
          status.textContent = '실패: ' + (err && err.message ? err.message : err);
          submit.disabled = false;
        });
    });

    var toolbar = hero.querySelector('.os-toolbar');
    if (toolbar && toolbar.nextSibling) {
      hero.insertBefore(form, toolbar.nextSibling);
    } else {
      hero.appendChild(form);
    }
  }

  function bindFeed() {
    var feed = document.getElementById('os-feed');
    if (feed && !feed._osBound) {
      feed._osBound = true;
      feed.addEventListener('click', function (e) {
        var meaningBtn = e.target.closest('[data-os-meaning-toggle]');
        if (meaningBtn && feed.contains(meaningBtn)) {
          toggleItemMeaning(meaningBtn.closest('.os-item'));
          return;
        }
        var saveBtn = e.target.closest('[data-os-save-toggle]');
        if (saveBtn && feed.contains(saveBtn)) {
          toggleSaveWord(saveBtn.closest('.os-item'));
          return;
        }
        var itemDl = e.target.closest('[data-os-item-download]');
        if (itemDl && feed.contains(itemDl)) {
          downloadSavedWords();
          return;
        }
        var tts = e.target.closest('[data-os-tts]');
        if (tts && feed.contains(tts)) {
          speakText(tts.getAttribute('data-os-tts') || '', tts);
          return;
        }
        var memoBtn = e.target.closest('[data-os-memo]');
        if (memoBtn && feed.contains(memoBtn)) {
          openMemoEditor(memoBtn.getAttribute('data-os-memo') || '');
          return;
        }
        var delBtn = e.target.closest('[data-os-del]');
        if (delBtn && feed.contains(delBtn)) {
          deleteEntry(delBtn.getAttribute('data-os-del') || '', delBtn);
        }
      });
    }

    var tags = document.getElementById('os-tags');
    if (tags && !tags._osBound) {
      tags._osBound = true;
      tags.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-os-jump]');
        if (!btn || !tags.contains(btn)) return;
        var word = btn.getAttribute('data-os-jump') || '';
        var alreadyOpen = btn.classList.contains('is-tip-open');

        /* 1번째 클릭: 뜻 표시 / 2번째 클릭(같은 단어): 예문으로 이동 */
        if (!alreadyOpen) {
          tags.querySelectorAll('.os-tag.is-tip-open').forEach(function (el) {
            el.classList.remove('is-tip-open');
          });
          btn.classList.add('is-tip-open');
          return;
        }

        btn.classList.remove('is-tip-open');
        var input = document.getElementById('os-search-input');
        if (input && input.value) {
          input.value = '';
          if (typeof tags._osRefresh === 'function') tags._osRefresh();
          window.setTimeout(function () { scrollToWord(word); }, 50);
        } else {
          scrollToWord(word);
        }
      });
    }
  }

  function init() {
    applyHideMeaning(isHideMeaningOn());
    syncAdminUnlockFromUrl();
    injectAdminForm();
    bindFeed();
    bindAlphaNav();
    bindBackTop();
    bindSavedDownload();
    var input = document.getElementById('os-search-input');
    var tags = document.getElementById('os-tags');

    var searchTimer = null;
    function refresh() {
      var q = input ? input.value : '';
      var visible = filterItems(feedAll, q);
      renderFeed(visible);
      renderTags(feedAll);
      if (String(q || '').trim().length >= 2 && window.SiteStats && typeof window.SiteStats.trackSearch === 'function') {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          window.SiteStats.trackSearch(q, 'one-sentence');
        }, 600);
      }
    }
    refreshFeed = refresh;

    if (tags) tags._osRefresh = refresh;

    if (input) {
      input.addEventListener('input', refresh);
    }

    renderLoading();
    renderTags([]);

    function publishDictWords(items) {
      var map = Object.create(null);
      (items || []).forEach(function (it) {
        if (!it) return;
        var meaning = String(it.meaning || '').trim();
        if (!meaning) return;
        var pos = String(it.pos || '').trim();
        function put(key) {
          var k = String(key || '')
            .toLowerCase()
            .replace(/’/g, "'")
            .trim();
          if (!k || /[^a-z0-9'’.\- ]/.test(k)) return;
          if (!map[k]) {
            map[k] = { meaning: meaning, pos: pos };
            return;
          }
          /* 같은 표제어·다른 품사면 뜻을 이어 붙임 */
          if (map[k].meaning.indexOf(meaning) === -1) {
            map[k].meaning = map[k].meaning + ' / ' + meaning;
          }
        }
        put(it.word);
        put(it.highlight);
      });
      window.DICT_WORDS = map;
    }

    function applyItems(items) {
      feedAll = items;
      publishDictWords(items);
      refresh();
    }

    function applyQueryFromUrl() {
      var q = new URLSearchParams(window.location.search).get('q');
      if (!q) return;
      q = String(q).trim();
      if (!q) return;
      if (input) {
        input.value = q;
        refresh();
      }
      window.setTimeout(function () {
        scrollToWord(q);
      }, 80);
    }

    loadFeedFromApi()
      .then(function (items) {
        applyItems(items.length ? items : FALLBACK_FEED.map(normalizeEntry).filter(Boolean));
        applyQueryFromUrl();
      })
      .catch(function (err) {
        console.warn('[one-sentence] API 로드 실패, 로컬 폴백:', err);
        applyItems(FALLBACK_FEED.map(normalizeEntry).filter(Boolean));
        applyQueryFromUrl();
      });
  }

  window.OneSentencePage = {
    isAdminUnlocked: isAdminUnlocked,
    apiBase: apiBase,
    wordAnchorId: wordAnchorId,
    afterCommentsMount: function () {
      syncAllMeaningToggleButtons();
      syncAllSaveToggleButtons();
      syncDownloadButton();
    },
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
