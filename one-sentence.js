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
    return {
      id: raw._id || '',
      word: word,
      pos: String(raw.pos || '').trim(),
      meaning: String(raw.meaning || '').trim(),
      ko: String(raw.ko || '').trim(),
      en: en,
      highlight: String(raw.highlight || word).trim(),
      ipa: String(raw.ipa || '').trim(),
      ipaKo: String(raw.ipaKo || '').trim(),
      cf: normalizeCfList(raw.cf),
      date: raw.date || null
    };
  }

  function wordAnchorId(word) {
    return 'os-w-' + String(word || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
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

  function renderItem(item) {
    var aid = wordAnchorId(item.word);
    var pos = String(item.pos || '').trim();
    var meaning = String(item.meaning || '').trim();
    return (
      '<article class="os-item" id="' + escapeAttr(aid) + '" data-word="' + escapeAttr(item.word) + '">' +
        '<p class="os-head">' +
          '<span class="os-head-en">' + escapeHtml(item.word) + '</span>' +
          renderPron(item) +
          (pos ? ' <span class="os-head-pos">' + escapeHtml(pos) + '</span>' : '') +
          (meaning ? ' <span class="os-head-ko">' + escapeHtml(meaning) + '</span>' : '') +
        '</p>' +
        renderCfLines(item.cf) +
        (item.ko ? '<p class="os-ko">' + escapeHtml(item.ko) + '</p>' : '') +
        '<div class="os-en-row">' +
          '<p class="os-en">' + highlightEn(item.en, item.highlight || item.word) + '</p>' +
          '<button type="button" class="os-tts" data-os-tts="' + escapeAttr(item.en) +
            '" aria-label="' + escapeAttr(item.word + ' 문장 듣기') + '">' + SPEAKER_SVG + '</button>' +
        '</div>' +
      '</article>'
    );
  }

  function letterOf(word) {
    var ch = String(word || '').trim().charAt(0).toUpperCase();
    return /[A-Z]/.test(ch) ? ch : '#';
  }

  function sortByWord(items) {
    return items.slice().sort(function (a, b) {
      var aw = String(a.word || '').toLowerCase();
      var bw = String(b.word || '').toLowerCase();
      if (aw < bw) return -1;
      if (aw > bw) return 1;
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

  function uniqueWords(items) {
    var seen = Object.create(null);
    var out = [];
    sortByWord(items).forEach(function (it) {
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
      tags.setAttribute('hidden', '');
      tags.innerHTML = '';
      return;
    }
    tags.removeAttribute('hidden');
    var html = '';
    var lastLetter = '';
    words.forEach(function (w) {
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
        '">' +
        escapeHtml(w) +
        '</button>';
    });
    tags.innerHTML = html;
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
    var index = document.getElementById('os-alpha');
    if (!feed) return;
    if (!items.length) {
      feed.innerHTML = '<p class="os-empty">아직 등록된 문장이 없습니다.</p>';
      if (index) {
        index.hidden = true;
        index.innerHTML = '';
      }
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
        index.innerHTML = groups
          .map(function (g) {
            return (
              '<a class="os-alpha-link" href="#os-letter-' +
              escapeAttr(g.letter) +
              '">' +
              escapeHtml(g.letter) +
              '</a>'
            );
          })
          .join('');
      }
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
        var btn = e.target.closest('[data-os-jump]');
        if (!btn || !tags.contains(btn)) return;
        var word = btn.getAttribute('data-os-jump') || '';
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
    var tags = document.getElementById('os-tags');
    var all = [];

    function refresh() {
      var visible = filterItems(all, input ? input.value : '');
      renderFeed(visible);
      renderTags(all);
    }

    if (tags) tags._osRefresh = refresh;

    if (input) {
      input.addEventListener('input', refresh);
    }

    renderFeed([]);
    renderTags([]);
    var count = document.getElementById('os-count');
    if (count) count.textContent = '불러오는 중…';

    function applyItems(items) {
      all = items;
      refresh();
    }

    loadFeedFromApi()
      .then(function (items) {
        applyItems(items.length ? items : FALLBACK_FEED.map(normalizeEntry).filter(Boolean));
      })
      .catch(function (err) {
        console.warn('[one-sentence] API 로드 실패, 로컬 폴백:', err);
        applyItems(FALLBACK_FEED.map(normalizeEntry).filter(Boolean));
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
