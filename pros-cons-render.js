/**
 * Pros & Cons JSON → 번호 목록 + 영어/한글 + 읽기 버튼
 */
(function (global) {
  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  var HANGUL_RE = /[\u3131-\u318E\uAC00-\uD7A3]/;

  function normalizeItem(item) {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      var en = String(item.en || '').trim();
      var ko = String(item.ko || '').trim();
      if (!ko && en) {
        var split = normalizeItem(en);
        return split;
      }
      return { en: en, ko: ko };
    }
    var s = String(item || '').trim();
    var hangulIdx = s.search(HANGUL_RE);
    if (hangulIdx <= 0) {
      return { en: s, ko: '' };
    }
    return {
      en: s.slice(0, hangulIdx).trim(),
      ko: s.slice(hangulIdx).trim()
    };
  }

  function ttsButtonHtml(speakText) {
    var t = String(speakText || '').trim();
    if (!t) return '';
    var icon =
      '<svg class="pv-tts-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" ' +
      'viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
      '<path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    return (
      '<span class="pv-tts-slot">' +
      '<button type="button" class="pv-tts-btn" data-pv-tts="' + escapeAttr(t) + '" ' +
      'aria-label="영어 읽기" title="듣기">' + icon + '</button></span>'
    );
  }

  function itemHtml(item, idx) {
    var row = normalizeItem(item);
    var koHtml = row.ko
      ? '<span class="pros-cons-ko">' + escapeHtml(row.ko) + '</span>'
      : '';

    return (
      '<div class="pros-cons-item">' +
      '<span class="pros-cons-num">' + (idx + 1) + '.</span>' +
      '<span class="pros-cons-en-line">' +
      '<span class="pros-cons-en">' + escapeHtml(row.en) + '</span>' +
      ttsButtonHtml(row.en) +
      '</span>' +
      koHtml +
      '</div>'
    );
  }

  function itemsHtml(list) {
    if (!list.length) {
      return '<div class="pros-cons-item"><em>항목 없음</em></div>';
    }
    return list.map(function (item, idx) {
      return itemHtml(item, idx);
    }).join('');
  }

  function buildProsConsTableHtml(pros, cons) {
    var prosList = Array.isArray(pros) ? pros : [];
    var consList = Array.isArray(cons) ? cons : [];

    return (
      '<div class="pros-cons-wrap">' +
      '<div class="pros-cons-block">' + itemsHtml(prosList) + '</div>' +
      '<div class="pros-cons-block pros-cons-block--cons">' + itemsHtml(consList) + '</div>' +
      '</div>'
    );
  }

  function buildProsConsMessage(pros, cons, footer) {
    var payload = {
      type: 'pros-cons',
      pros: (pros || []).map(normalizeItem),
      cons: (cons || []).map(normalizeItem)
    };
    if (footer) payload.footer = String(footer).trim();
    return JSON.stringify(payload);
  }

  function parseProsConsPayload(message) {
    var trimmed = String(message || '').trim();
    if (!trimmed || trimmed.charAt(0) !== '{') return { data: null, extra: '' };

    try {
      return { data: JSON.parse(trimmed), extra: '' };
    } catch (e1) {
      var end = trimmed.lastIndexOf('}');
      if (end <= 0) return { data: null, extra: trimmed };

      try {
        return {
          data: JSON.parse(trimmed.slice(0, end + 1)),
          extra: trimmed.slice(end + 1).trim()
        };
      } catch (e2) {
        return { data: null, extra: trimmed };
      }
    }
  }

  function footerHtml(data, extra) {
    if (data && data.footer) {
      return (
        '<p class="pros-cons-footer">' + escapeHtml(data.footer) + '</p>'
      );
    }
    if (extra && extra.indexOf('pros-cons-wrap') === -1) {
      return extra;
    }
    return '';
  }

  function renderProsConsMessage(message) {
    if (!message) return '';
    var trimmed = String(message).trim();

    if (trimmed.charAt(0) === '{') {
      var parsed = parseProsConsPayload(trimmed);
      if (parsed.data && parsed.data.type === 'pros-cons') {
        return (
          buildProsConsTableHtml(parsed.data.pros, parsed.data.cons) +
          footerHtml(parsed.data, parsed.extra)
        );
      }
    }

    if (trimmed.indexOf('pros-cons-wrap') !== -1) {
      return trimmed;
    }

    return '<pre class="pros-cons-raw">' + escapeHtml(trimmed) + '</pre>';
  }

  global.buildProsConsTableHtml = buildProsConsTableHtml;
  global.buildProsConsMessage = buildProsConsMessage;
  global.renderProsConsMessage = renderProsConsMessage;
})(typeof window !== 'undefined' ? window : globalThis);
