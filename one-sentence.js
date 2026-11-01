/**
 * 문장으로 익히는 단어 — 렌더 / 검색 / TTS
 * 피드 내용은 one-sentence-data.js 의 ONE_SENTENCE_FEED 만 수정하세요.
 */
(function () {
  'use strict';

  var SPEAKER_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a10 10 0 0 1 0 14"></path></svg>';

  function getFeed() {
    var feed = window.ONE_SENTENCE_FEED;
    return Array.isArray(feed) ? feed.slice() : [];
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

  function padNum(n) {
    return String(n).padStart(3, '0');
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

  function renderItem(item, index) {
    var num = padNum(index + 1);
    return (
      '<article class="os-item" data-word="' + escapeAttr(item.word) + '">' +
        '<span class="os-num" aria-hidden="true">' + num + '</span>' +
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
      feed.innerHTML = '<p class="os-empty">검색 결과가 없습니다.</p>';
    } else {
      feed.innerHTML = items.map(renderItem).join('');
    }
    if (count) count.textContent = '총 ' + items.length + '개';
  }

  function bindFeed() {
    var feed = document.getElementById('os-feed');
    if (!feed || feed._osBound) return;
    feed._osBound = true;
    feed.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-os-tts]');
      if (!btn || !feed.contains(btn)) return;
      speakText(btn.getAttribute('data-os-tts') || '', btn);
    });
  }

  function init() {
    bindFeed();
    var input = document.getElementById('os-search-input');
    var all = getFeed();

    function refresh() {
      renderFeed(filterItems(all, input ? input.value : ''));
    }

    if (input) {
      input.addEventListener('input', refresh);
    }
    refresh();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
