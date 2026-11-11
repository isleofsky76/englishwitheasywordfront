/**
 * 댓글·검색 공통 금지어 검사 (one-sentence 글쓰기와 동일 기준)
 */
(function (global) {
  'use strict';

  var MSG = '사용할 수 없는 표현이 포함되어 있어요.';
  /* 루트 절대경로 — /news-voca/... 등 하위 URL에서 상대경로면 HTML(404 SPA)이 내려와 JSON 파싱 실패함 */
  var BADWORDS_URL = '/comment-badwords.json?v=20261101c11';
  var badwords = {
    blockedA: [],
    blockedB: [],
    blockedHangulJamo: [],
    allowlist: [],
  };
  var loadPromise = null;

  var DIGIT_MAP = {
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '@': 'a',
    $: 's',
  };

  var FALLBACK_BLOCK = [
    'sex', 'sexy', 'porn', 'porno', 'xxx', 'fuck', 'fucking', 'dick', 'pussy',
    '섹스', '포르노', '야동',
    'administrator', 'administration', '운영자', '어드민'
  ];

  function normalizeForFilter(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[0-9@$]/g, function (ch) {
        return DIGIT_MAP[ch] || ch;
      })
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/gi, '');
  }

  function stripAllowlist(text) {
    var t = String(text || '').toLowerCase();
    var allows = (badwords.allowlist || []).slice().sort(function (a, b) {
      return String(b).length - String(a).length;
    });
    allows.forEach(function (a) {
      var needle = String(a || '')
        .toLowerCase()
        .trim();
      if (!needle) return;
      if (/\s/.test(needle) || /[^a-z]/i.test(needle)) {
        t = t.split(needle).join(' ');
      } else {
        var re = new RegExp('(?:^|[^a-z])' + needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=[^a-z]|$)', 'gi');
        t = t.replace(re, ' ');
      }
    });
    return t;
  }

  function englishWordBoundaryHit(haystackLower, word) {
    var w = String(word || '')
      .toLowerCase()
      .trim();
    if (!w || /[^a-z]/.test(w)) return false;
    var re = new RegExp('(?:^|[^a-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=[^a-z]|$)', 'i');
    return re.test(haystackLower);
  }

  function phraseHit(haystackLower, phrase) {
    var p = String(phrase || '')
      .toLowerCase()
      .trim();
    if (!p) return false;
    if (/\s/.test(p)) return haystackLower.indexOf(p) !== -1;
    if (/^[a-z]+$/i.test(p)) return englishWordBoundaryHit(haystackLower, p);
    if (haystackLower.indexOf(p) !== -1) return true;
    var needle = normalizeForFilter(p);
    if (!needle || needle.length < 2) return false;
    return normalizeForFilter(haystackLower).indexOf(needle) !== -1;
  }

  function listHits(haystackLower, terms) {
    var i;
    for (i = 0; i < (terms || []).length; i += 1) {
      if (phraseHit(haystackLower, terms[i])) return true;
    }
    return false;
  }

  function isReservedAdminNickname(nickname) {
    var raw = String(nickname || '').trim();
    if (!raw) return false;
    var lower = raw.toLowerCase();
    return lower === 'admin' || raw === '관리자' || raw === '주인장';
  }

  function autoBlockTerms() {
    var a = badwords.blockedA || badwords.blocked || [];
    var b = badwords.blockedB || [];
    var terms = a.concat(b).filter(function (term) {
      return !isReservedAdminNickname(term);
    });
    if (!terms.length) return FALLBACK_BLOCK.slice();
    return terms;
  }

  function normalizeKeepDigits(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/gi, '');
  }

  function isEducationalEighteenContext(text) {
    var raw = String(text || '').toLowerCase();
    if (/(?:19|20)\d{2}/.test(raw)) return true;
    return /18\s*살|18\s*세|18\s*세기|18\s*년|18\s*years|age\s*of\s*18|under\s*18|over\s*18|turned\s*18|18th|18\s*century/i.test(
      raw
    );
  }

  function containsNumericAbusePatterns(text) {
    var raw = String(text || '').trim();
    var c = normalizeKeepDigits(text);
    if (!c) return false;
    if (/(?:18){2,}/.test(c)) return true;
    if (!isEducationalEighteenContext(raw)) {
      if (/^18$/.test(c)) return true;
      if (/(?:^|[^0-9])18(?:[^0-9]|$)/.test(c)) return true;
    }
    if (/(?:18|10|108)(?:놈|넘|새끼|새기|새키|쉐끼|새끼들|뇬|련)/.test(c)) return true;
    if (/18(?:발|팔|섹|쉑)/.test(c)) return true;
    if (/시18|씨18|ㅅㅂ18|tlqkf/.test(c)) return true;
    if (/(?:섹|sex|sexy|porn)69|69(?:섹|sex|sexy|porn)/.test(c)) return true;
    if (/19금|19禁|야동19/.test(c)) return true;
    return false;
  }

  function containsBadWords(text) {
    if (isReservedAdminNickname(text)) return false;
    var originalLower = stripAllowlist(text);
    var compact = normalizeForFilter(originalLower);
    var terms = autoBlockTerms();
    var jamo = badwords.blockedHangulJamo || [];
    var i;
    if (containsNumericAbusePatterns(originalLower)) return true;
    if (listHits(originalLower, terms)) return true;
    for (i = 0; i < terms.length; i += 1) {
      var t = String(terms[i] || '')
        .trim()
        .toLowerCase();
      if (!t || /\s/.test(t)) continue;
      var nt = normalizeForFilter(t);
      if (!nt || nt.length < 2) continue;
      if (/^[a-z]+$/i.test(t)) {
        if (englishWordBoundaryHit(originalLower, t)) return true;
        continue;
      }
      if (/^[a-z0-9]+$/i.test(t) && compact.indexOf(nt) !== -1) {
        if (/[0-9@$]/.test(String(text || '').toLowerCase()) || englishWordBoundaryHit(originalLower, t)) {
          return true;
        }
      }
    }
    for (i = 0; i < jamo.length; i += 1) {
      var j = String(jamo[i] || '').trim();
      if (!j) continue;
      if (compact.indexOf(normalizeForFilter(j)) !== -1 || String(text || '').replace(/\s+/g, '').indexOf(j) !== -1) {
        return true;
      }
    }
    return false;
  }

  function hasLink(text) {
    return /https?:\/\/|www\./i.test(String(text || ''));
  }

  /** 검색창용: 금지어·링크면 안내 문구, 아니면 빈 문자열 */
  function searchBlockMessage(q) {
    var text = String(q || '').trim();
    if (!text) return '';
    if (hasLink(text)) return '링크는 포함할 수 없어요.';
    /*
     * 단일 영단어 검색(smitten 등):
     * sm調教 → normalize 시 "sm"이 되어 부분일치로 오탐하므로
     * ASCII 금칙는 3글자 이상 + 단어 경계만 적용
     */
    if (/^[a-zA-Z][a-zA-Z'-]*$/.test(text) && text.length >= 3) {
      var lower = stripAllowlist(text);
      var terms = autoBlockTerms();
      var i;
      for (i = 0; i < terms.length; i += 1) {
        var ascii = String(terms[i] || '')
          .toLowerCase()
          .replace(/[^a-z]/g, '');
        if (!ascii || ascii.length < 3) continue;
        if (englishWordBoundaryHit(lower, ascii)) return MSG;
      }
      if (containsNumericAbusePatterns(lower)) return MSG;
      return '';
    }
    if (containsBadWords(text)) return MSG;
    return '';
  }

  function load() {
    if (loadPromise) return loadPromise;
    loadPromise = fetch(BADWORDS_URL, { cache: 'no-store' })
      .then(function (res) {
        if (!res.ok) throw new Error('badwords HTTP ' + res.status);
        return res.json();
      })
      .then(function (raw) {
        badwords = {
          blockedA: raw.blockedA || raw.blocked || [],
          blockedB: raw.blockedB || [],
          blockedHangulJamo: raw.blockedHangulJamo || [],
          allowlist: raw.allowlist || [],
        };
        return badwords;
      })
      .catch(function (e) {
        console.warn('[badwords-client] load failed', e);
        return badwords;
      });
    return loadPromise;
  }

  global.CommentBadwords = {
    load: load,
    containsBadWords: containsBadWords,
    searchBlockMessage: searchBlockMessage,
    MESSAGE: MSG,
  };

  load();
})(window);
