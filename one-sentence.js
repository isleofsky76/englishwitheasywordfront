/**
 * 문장으로 익히는 단어 — DB(/onesentence) 누적 피드 + 검색 + TTS
 * 데이터 추가: backend/scripts/append-one-sentence.js
 */
(function () {
  'use strict';

  var SPEAKER_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a10 10 0 0 1 0 14"></path></svg>';

  /** API 실패 시 잠깐 보일 로컬 폴백 (배포 직후 등) */
  var FALLBACK_FEED = Array.isArray(window.ONE_SENTENCE_FEED) ? window.ONE_SENTENCE_FEED.slice() : [];

  function apiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') {
      return window.getPage30ApiBaseUrl();
    }
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
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

  function speakText(text, btn) {
    if (!window.speechSynthesis || !text) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.rate = 0.95;
      if (btn) {
        btn.classList.add('is-playing');
        u.onend = function () { btn.classList.remove('is-playing'); };
        u.onerror = function () { btn.classList.remove('is-playing'); };
      }
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  function normalizeEntry(raw) {
    if (!raw) return null;
    var word = String(raw.word || '').trim();
    var en = String(raw.en || '').trim();
    if (!word || !en) return null;
    return {
      id: raw._id || '',
      word: word,
      pos: String(raw.pos || '').trim(),
      meaning: String(raw.meaning || '').trim(),
      ko: String(raw.ko || '').trim(),
      en: en,
      highlight: String(raw.highlight || word).trim(),
      date: raw.date || null
    };
  }

  function wordAnchorId(word) {
    return 'os-w-' + String(word || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function renderItem(item) {
    var aid = wordAnchorId(item.word);
    return (
      '<article class="os-item" id="' + escapeAttr(aid) + '" data-word="' + escapeAttr(item.word) + '">' +
        '<div class="os-word-row">' +
          '<span class="os-chip">' +
            '<span class="os-chip-en">' + escapeHtml(item.word) + '</span>' +
            (item.pos ? '<span class="os-chip-pos">' + escapeHtml(item.pos) + '</span>' : '') +
          '</span>' +
          (item.meaning ? '<span class="os-meaning">' + escapeHtml(item.meaning) + '</span>' : '') +
        '</div>' +
        (item.ko ? '<p class="os-ko">' + escapeHtml(item.ko) + '</p>' : '') +
        '<div class="os-en-row">' +
          '<p class="os-en">' + highlightEn(item.en, item.highlight || item.word) + '</p>' +
          '<button type="button" class="os-tts" data-os-tts="' + escapeAttr(item.en) +
            '" aria-label="' + escapeAttr(item.word + ' 문장 듣기') + '">' + SPEAKER_SVG + '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function uniqueWords(items) {
    var seen = Object.create(null);
    var out = [];
    items.forEach(function (it) {
      var key = String(it.word || '').toLowerCase();
      if (!key || seen[key]) return;
      seen[key] = true;
      out.push(it.word);
    });
    return out;
  }

  function renderTags(items) {
    var tags = document.getElementById('os-tags');
    if (!tags) return;
    var words = uniqueWords(items);
    if (!words.length) {
      tags.hidden = true;
      tags.innerHTML = '';
      return;
    }
    tags.hidden = false;
    tags.innerHTML = words.map(function (w) {
      return (
        '<a class="os-tag" href="#' + escapeAttr(wordAnchorId(w)) + '" data-os-jump="' +
          escapeAttr(w) + '">#' + escapeHtml(w) + '</a>'
      );
    }).join(' ');
  }

  function filterItems(items, q) {
    var needle = String(q || '').trim().toLowerCase();
    if (!needle) return items.slice();
    return items.filter(function (it) {
      var blob = [it.word, it.pos, it.meaning, it.ko, it.en].join(' ').toLowerCase();
      return blob.indexOf(needle) !== -1;
    });
  }

  function renderFeed(items) {
    var feed = document.getElementById('os-feed');
    var count = document.getElementById('os-count');
    if (!feed) return;
    if (!items.length) {
      feed.innerHTML = '<p class="os-empty">아직 등록된 문장이 없습니다.</p>';
    } else {
      feed.innerHTML = items.map(renderItem).join('');
    }
    if (count) count.textContent = '총 ' + items.length + '개';
  }

  function scrollToWord(word) {
    var el = document.getElementById(wordAnchorId(word));
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.classList.add('os-item-flash');
    window.setTimeout(function () {
      el.classList.remove('os-item-flash');
    }, 1200);
  }

  function bindFeed() {
    var feed = document.getElementById('os-feed');
    if (feed && !feed._osBound) {
      feed._osBound = true;
      feed.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-os-tts]');
        if (!btn || !feed.contains(btn)) return;
        speakText(btn.getAttribute('data-os-tts') || '', btn);
      });
    }

    var tags = document.getElementById('os-tags');
    if (tags && !tags._osBound) {
      tags._osBound = true;
      tags.addEventListener('click', function (e) {
        var a = e.target.closest('[data-os-jump]');
        if (!a || !tags.contains(a)) return;
        e.preventDefault();
        var word = a.getAttribute('data-os-jump') || '';
        var input = document.getElementById('os-search-input');
        if (input && input.value) {
          input.value = '';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          window.setTimeout(function () { scrollToWord(word); }, 40);
        } else {
          scrollToWord(word);
        }
      });
    }
  }

  async function loadFeedFromApi() {
    var url = apiBase().replace(/\/$/, '') + '/onesentence';
    var res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    var data = await res.json();
    var list = Array.isArray(data.entries) ? data.entries : (Array.isArray(data) ? data : []);
    return list.map(normalizeEntry).filter(Boolean);
  }

  function init() {
    bindFeed();
    var input = document.getElementById('os-search-input');
    var all = [];

    function refresh() {
      var visible = filterItems(all, input ? input.value : '');
      renderFeed(visible);
      renderTags(all);
    }

    if (input) {
      input.addEventListener('input', refresh);
    }

    renderFeed([]);
    var count = document.getElementById('os-count');
    if (count) count.textContent = '불러오는 중…';

    loadFeedFromApi()
      .then(function (items) {
        all = items.length ? items : FALLBACK_FEED.map(normalizeEntry).filter(Boolean);
        refresh();
      })
      .catch(function (err) {
        console.warn('[one-sentence] API 로드 실패, 로컬 폴백:', err);
        all = FALLBACK_FEED.map(normalizeEntry).filter(Boolean);
        refresh();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
