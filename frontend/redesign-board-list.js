/**
 * 목록 페이지 시안 렌더러 — design/redesign-list.html
 * 사용: renderRedesignBoardList(container, messages, { boardKey, apiMode, pageSize })
 */
(function (global) {
  'use strict';

  var PAGE_SIZE_DEFAULT = 12;

  /** 카테고리 포인트 색 — 국제/경제/사회/기타 */
  var CATEGORY_COLORS = {
    '국제': '#A8321C',
    '경제': '#1F4E8C',
    '사회': '#2E6B4F',
    '한국': '#2E6B4F',
    '미국': '#1F4E8C',
    '연관단어': '#6B4F2E',
    '기타': '#B5651D'
  };

  function categoryColor(label) {
    var key = String(label || '').trim();
    return CATEGORY_COLORS[key] || CATEGORY_COLORS['기타'];
  }

  function usesKeywordCards(cfg) {
    if (!cfg) return false;
    return cfg.navGroup === 'news' || cfg.key === 'english-synonym';
  }

  function trackSelectContent(itemId) {
    var id = String(itemId || '').trim();
    if (!id) return;
    try {
      if (typeof global.gtag === 'function') {
        global.gtag('event', 'select_content', {
          content_type: 'post_card',
          item_id: id
        });
      }
    } catch (e) { /* ignore */ }
  }

  function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/"/g, '&quot;');
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
      var d = new Date(dateStr);
      if (isNaN(d.getTime())) return '';
      var y = d.getFullYear();
      var m = ('0' + (d.getMonth() + 1)).slice(-2);
      var day = ('0' + d.getDate()).slice(-2);
      return y + '.' + m + '.' + day;
    } catch (e) {
      return '';
    }
  }

  function stripHtml(html) {
    if (!html) return '';
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim();
  }

  function buildHref(entry, originalIndex, cfg, apiMode) {
    var apiParam = apiMode ? (apiMode.indexOf('api=') === 0 ? apiMode : 'api=' + apiMode) : '';
    var slug = entry && String(entry.slug || '').trim();
    if (slug && cfg.postPath) {
      var href = cfg.postPath + '/' + encodeURIComponent(slug) + '/';
      if (apiParam) href += '?' + apiParam;
      return href;
    }
    if (slug) {
      return cfg.postPage + '?slug=' + encodeURIComponent(slug) + (apiParam ? '&' + apiParam : '');
    }
    return cfg.postPage + '?index=' + originalIndex + (apiParam ? '&' + apiParam : '');
  }

  function youtubeThumbFromUrl(url) {
    var s = String(url || '');
    if (!s) return '';
    var m = s.match(/(?:img\.youtube|i\.ytimg)\.com\/vi\/([a-zA-Z0-9_-]+)\//i) ||
      s.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i) ||
      s.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i) ||
      s.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i);
    return m ? 'https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg' : '';
  }

  /**
   * 목록 미리보기 — 유튜브 썸네일을 항상 최우선.
   * (뉴스·국제 등은 유튜브만 쓰도록 업로드 시 thumbnail을 i.ytimg로 고정)
   */
  function extractThumb(entry) {
    if (entry && entry.thumbnail) {
      var fromField = youtubeThumbFromUrl(entry.thumbnail);
      if (fromField) return fromField;
      if (/(?:img\.youtube|i\.ytimg)\.com\/vi\//i.test(String(entry.thumbnail))) {
        return String(entry.thumbnail);
      }
    }
    /* 퀴즈 등 — sourceUrl 유튜브 썸네일 */
    var fromSource = youtubeThumbFromUrl(entry && entry.sourceUrl);
    if (fromSource) return fromSource;
    var msg = entry && entry.message ? String(entry.message) : '';
    if (!msg) return '';
    var fromMsg = youtubeThumbFromUrl(msg);
    if (fromMsg) return fromMsg;
    /* i.ytimg / img.youtube 커버 */
    var ytimg = msg.match(/https?:\/\/(?:i\.ytimg|img\.youtube)\.com\/vi\/[a-zA-Z0-9_-]+\/[a-z0-9.]+\.jpg/i);
    if (ytimg) return ytimg[0];
    var cover = msg.match(/class=["'][^"']*nv-cover-img[^"']*["'][^>]*src=["']([^"']+)["']/i) ||
      msg.match(/src=["']([^"']+)["'][^>]*class=["'][^"']*nv-cover-img[^"']*["']/i);
    if (cover && cover[1]) {
      var fromCover = youtubeThumbFromUrl(cover[1]);
      if (fromCover) return fromCover;
      if (/(?:img\.youtube|i\.ytimg)\.com\/vi\//i.test(cover[1])) return cover[1];
    }
    /* 유튜브가 없을 때만 일반 이미지 (포토 보드 등) */
    if (cover && cover[1] && !/data:image\//i.test(cover[1])) return cover[1];
    var resImg = msg.match(/<img[^>]+src=["'](\/resources\/[^"']+)["']/i);
    if (resImg && resImg[1]) return resImg[1];
    var img = msg.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (img && img[1] && !/data:image\//i.test(img[1]) &&
        !/(?:img\.youtube|i\.ytimg)\.com\/vi\//i.test(img[1])) {
      /* 본문 일반 이미지는 뉴스 미리보기로 쓰지 않음 — 유튜브 없을 때만 */
      return '';
    }
    return '';
  }

  function extractSummary(entry) {
    if (entry && entry.summary) return String(entry.summary).trim();
    if (entry && entry.metaDescription) return String(entry.metaDescription).trim();
    var msg = entry && entry.message ? String(entry.message) : '';
    if (!msg) return '';
    var lead = msg.match(/class=["'][^"']*nv-lead-text[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
    if (lead) {
      var t = stripHtml(lead[1]);
      if (t) return t.length > 160 ? t.slice(0, 157) + '…' : t;
    }
    /* 요리 어휘 등 단어 나열형은 요약 대신 태그로 보여 줌 */
    if (/cv-en|cv-word|make-ahead|finger food/i.test(msg) ||
        (msg.match(/[A-Za-z][A-Za-z0-9'\/.\s-]{0,40}\s+[가-힣]/g) || []).length >= 4) {
      return '';
    }
    var plain = stripHtml(msg);
    if (!plain) return '';
    return plain.length > 160 ? plain.slice(0, 157) + '…' : plain;
  }

  function pushTag(tags, seen, word, limit) {
    var en = String(word || '').replace(/\s+/g, ' ').trim();
    var key = en.toLowerCase();
    if (!en || seen[key] || en.length > 48 || tags.length >= limit) return;
    if (!/[A-Za-z]/.test(en)) return;
    seen[key] = true;
    tags.push(en);
  }

  function extractTags(entry, limit) {
    limit = limit || 4;
    var tags = [];
    var seen = {};
    if (entry && Array.isArray(entry.tags)) {
      entry.tags.forEach(function (t) {
        pushTag(tags, seen, t, limit);
      });
    }
    /* vocabulary-quiz reveal items */
    if (entry && Array.isArray(entry.quizzes) && tags.length < limit) {
      entry.quizzes.forEach(function (section) {
        (section && section.items ? section.items : []).forEach(function (item) {
          if (tags.length >= limit) return;
          var show = String((item && item.show) || '').trim();
          if (/^[A-Za-z]/.test(show)) pushTag(tags, seen, show, limit);
        });
      });
    }
    if (tags.length >= limit || !entry || !entry.message) return tags.slice(0, limit);

    var msg = String(entry.message);
    var m;
    var re = /<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>/gi;
    while ((m = re.exec(msg)) && tags.length < limit) {
      pushTag(tags, seen, stripHtml(m[1]), limit);
    }

    /* 요리 어휘: <span class="cv-en">make-ahead</span> */
    if (tags.length < limit) {
      var cvRe = /class=["'][^"']*cv-en[^"']*["'][^>]*>([\s\S]*?)<\/(?:span|div|strong|b)>/gi;
      while ((m = cvRe.exec(msg)) && tags.length < limit) {
        pushTag(tags, seen, stripHtml(m[1]), limit);
      }
    }

    /* 신문읽는 이미지: 항구 : harbor → harbor */
    if (tags.length < limit) {
      var lineRe = /(?:^|\n)\s*[^:\n가-힣]*[가-힣][^:\n]*\s*:\s*([A-Za-z][A-Za-z0-9'\/.\s-]{0,40})/g;
      while ((m = lineRe.exec(msg)) && tags.length < limit) {
        pushTag(tags, seen, m[1], limit);
      }
    }

    /* 영어 : 뜻 / 영어 뜻 (요리 어휘 평문) */
    if (tags.length < limit) {
      var plain = stripHtml(msg);
      var enKoRe = /(?:^|\n)\s*([A-Za-z][A-Za-z0-9'\/.\s-]{0,42}?)\s*[:：]?\s+[가-힣]/g;
      while ((m = enKoRe.exec(plain)) && tags.length < limit) {
        pushTag(tags, seen, m[1], limit);
      }
    }

    return tags.slice(0, limit);
  }

  /**
   * 대표 단어 + 뜻/발음(선택). 기존 글 구조는 유지하고 message/wordMeta에서만 파싱.
   * @returns {{expression:string, meaning:string, ipa:string}[]}
   */
  function extractWordItems(entry, limit) {
    limit = limit || 3;
    var items = [];
    var seen = {};

    function push(expr, meaning, ipa) {
      var en = String(expr || '').replace(/\s+/g, ' ').trim();
      var key = en.toLowerCase();
      if (!en || seen[key] || en.length > 48 || items.length >= limit) return;
      if (!/[A-Za-z]/.test(en)) return;
      seen[key] = true;
      items.push({
        expression: en,
        meaning: String(meaning || '').replace(/\s+/g, ' ').trim(),
        ipa: String(ipa || '').replace(/^\/+|\/+$/g, '').trim()
      });
    }

    if (entry && Array.isArray(entry.wordMeta)) {
      entry.wordMeta.forEach(function (w) {
        if (!w) return;
        var ipa = w.ipa || w.phonetic || '';
        if (!ipa && w.pronunciation && typeof w.pronunciation === 'object') {
          ipa = w.pronunciation.ipa || '';
        }
        push(w.expression || w.en || w.word, w.meaning || w.ko || w.meaningKo, ipa);
      });
    }
    if (entry && Array.isArray(entry.words) && items.length < limit) {
      entry.words.forEach(function (w) {
        if (!w) return;
        if (typeof w === 'string') push(w, '', '');
        else push(w.expression || w.en || w.word, w.meaning || w.ko, w.ipa || w.phonetic || '');
      });
    }
    if (entry && Array.isArray(entry.keywords) && items.length < limit) {
      entry.keywords.forEach(function (w) {
        if (typeof w === 'string') push(w, '', '');
        else if (w) push(w.expression || w.en || w.word, w.meaning || w.ko, w.ipa || '');
      });
    }

    var msg = entry && entry.message ? String(entry.message) : '';
    var m;

    /* 핵심 3문장형: <li class="nv-vocab-item"><strong>qualify</strong> - 뜻</li> */
    if (msg && items.length < limit) {
      var vocabItemRe = /<li[^>]*class=["'][^"']*nv-vocab-item[^"']*["'][^>]*>\s*<strong>([\s\S]*?)<\/strong>\s*[-–—:：]\s*([^<]+)/gi;
      while ((m = vocabItemRe.exec(msg)) && items.length < limit) {
        push(stripHtml(m[1]), stripHtml(m[2]), '');
      }
    }

    /* 중요 단어 섹션: <span class="nv-en">rescind</span><span class="nv-ko">취소하다</span> */
    if (msg && items.length < limit) {
      var enKoRe = /<span[^>]*class=["'][^"']*\bnv-en\b[^"']*["'][^>]*>([\s\S]*?)<\/span>\s*<span[^>]*class=["'][^"']*\bnv-ko\b[^"']*["'][^>]*>([\s\S]*?)<\/span>/gi;
      while ((m = enKoRe.exec(msg)) && items.length < limit) {
        push(stripHtml(m[1]), stripHtml(m[2]), '');
      }
    }

    /* h2 제목만 있는 경우: 중요 단어 1. rescind */
    if (msg && items.length < limit) {
      var titleWordRe = /<h2[^>]*class=["'][^"']*nv-section-title[^"']*["'][^>]*>\s*(?:중요\s*단어\s*)?\d+\.\s*([^<]+?)\s*<\/h2>/gi;
      while ((m = titleWordRe.exec(msg)) && items.length < limit) {
        push(stripHtml(m[1]), '', '');
      }
    }

    /* 3문장/레거시: 🟡 주요 표현 · suggest : 시사하다 */
    if (msg && items.length < limit) {
      var bulletRe = /(?:^|[\n>•]|<br\s*\/?>)\s*([A-Za-z][A-Za-z0-9'’\-\s]{0,36}?)\s*[:：]\s*([가-힣][^<\n]{0,60})/g;
      while ((m = bulletRe.exec(msg)) && items.length < limit) {
        push(m[1], m[2], '');
      }
    }

    /* 레거시 어휘 정리: Uptick (업틱)<br> - 소폭 증가 */
    if (msg && items.length < limit) {
      var legacyParenRe = /([A-Za-z][A-Za-z0-9'’\-\s]{0,36}?)\s*\([^)]{0,40}\)\s*(?:<br\s*\/?>|\n)\s*[-–—]\s*([가-힣][^<\n]{0,60})/g;
      while ((m = legacyParenRe.exec(msg)) && items.length < limit) {
        push(m[1], m[2], '');
      }
    }

    /* 레거시 어휘 정리: Crude oil surplus – 원유 공급 과잉 */
    if (msg && items.length < limit) {
      var legacyDashRe = /([A-Za-z][A-Za-z0-9'’\-\s]{0,36}?)\s*[–—]\s*([가-힣][^<\n]{0,60})/g;
      while ((m = legacyDashRe.exec(msg)) && items.length < limit) {
        push(m[1], m[2], '');
      }
    }

    /* 연관단어 narrative: h2 뜻 → mark 영어 */
    if (msg && items.length < limit) {
      var secRe = /<h2[^>]*class=["'][^"']*nv-section-title[^"']*["'][^>]*>\s*(?:\d+\.\s*)?([^<]+?)\s*<\/h2>[\s\S]{0,900}?<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>/gi;
      while ((m = secRe.exec(msg)) && items.length < limit) {
        var meaning = stripHtml(m[1] || '').replace(/\([^)]*\)\s*$/, '').trim();
        push(stripHtml(m[2]), meaning, '');
      }
    }
    if (msg && items.length < limit) {
      var cfRe = /cf\.\s*([^:<（(]+?)\s*[:：]\s*([^<\n]+)/gi;
      while ((m = cfRe.exec(msg)) && items.length < limit) {
        push(stripHtml(m[1]), stripHtml(m[2]), '');
      }
    }
    if (msg && items.length < limit) {
      var glossRe = /<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>\s*\(([^)]+)\)/gi;
      while ((m = glossRe.exec(msg)) && items.length < limit) {
        var raw = stripHtml(m[2] || '');
        var ipaPart = '';
        var meaningPart = '';
        var slash = raw.split(/\s*\/\s*/);
        if (slash.length >= 2 && /[ˈˌɪəɔʊɑæʌθðʃʒŋ]/.test(slash[0])) {
          ipaPart = slash[0].trim();
          meaningPart = '';
        }
        push(stripHtml(m[1]), meaningPart, ipaPart);
      }
    }
    if (msg && items.length < limit) {
      var re = /<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>/gi;
      while ((m = re.exec(msg)) && items.length < limit) {
        push(stripHtml(m[1]), '', '');
      }
    }

    /* 폴백: 영문 핵심 문장의 nv-highlight만 (한글 mark 제외) */
    if (msg && items.length < limit) {
      var enSentRe = /<p[^>]*class=["'][^"']*nv-sentence-en[^"']*["'][^>]*>([\s\S]*?)<\/p>/gi;
      var markHlRe = /<mark[^>]*class=["'][^"']*nv-highlight[^"']*["'][^>]*>([\s\S]*?)<\/mark>/gi;
      var sent;
      while ((sent = enSentRe.exec(msg)) && items.length < limit) {
        markHlRe.lastIndex = 0;
        while ((m = markHlRe.exec(sent[1])) && items.length < limit) {
          var phrase = stripHtml(m[1]);
          if (!/^[A-Za-z]/.test(phrase)) continue;
          if ((phrase.match(/[A-Za-z]+/g) || []).length > 4) continue;
          push(phrase, '', '');
        }
      }
    }

    return items.slice(0, limit);
  }

  function keywordMeaningLine(word) {
    if (!word || !word.meaning) return '';
    return '<p class="rd-kw-sub">' + escapeHtml(word.meaning) + '</p>';
  }

  /** 썸네일: 대표 단어 1개 + 뜻만 */
  function keywordCardThumbHtml(item, cfg) {
    var words = (item && item.keywordWords) || [];
    var hero = words[0] || null;
    var cat = (cfg && cfg.categoryLabel) || '기타';
    var color = categoryColor(cat);

    return (
      '<div class="rd-kw-thumb" style="--rd-kw-accent:' + escapeAttr(color) + '">' +
        '<div class="rd-kw-hero">' +
          (hero
            ? '<p class="rd-kw-word">' + escapeHtml(hero.expression) + '</p>' + keywordMeaningLine(hero)
            : '<p class="rd-kw-word rd-kw-word--fallback">' + escapeHtml(monoFromTitle(item) || 'NEWS') + '</p>') +
        '</div>' +
      '</div>'
    );
  }

  function titleHtml(item, className, opts) {
    opts = opts || {};
    var prefix = (opts.index != null)
      ? '<span class="rd-list-index-prefix" aria-hidden="true">' + escapeHtml(String(opts.index) + '. ') + '</span>'
      : '';
    if (item && item.bilingual && item.titleEn && item.titleKo) {
      return (
        '<span class="' + className + ' rd-list-title-bi">' +
          prefix +
          '<span class="rd-list-title-en">' + escapeHtml(item.titleEn) + '</span>' +
          '<span class="rd-list-title-sep" aria-hidden="true"> : </span>' +
          '<span class="rd-list-title-ko">' + escapeHtml(item.titleKo) + '</span>' +
        '</span>'
      );
    }
    return '<span class="' + className + '">' + prefix + escapeHtml(item.title) + '</span>';
  }

  function monoFromTitle(item) {
    var src = (item && (item.titleEn || item.title)) || '';
    var words = String(src).replace(/[^A-Za-z\s]/g, ' ').trim().split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
    }
    if (words[0]) return words[0].slice(0, 2).toUpperCase();
    var ko = String((item && item.titleKo) || src).trim();
    return ko ? ko.charAt(0) : '·';
  }

  function optsEmptyBadge(cfg) {
    if (!cfg) return 'NEWS';
    if (cfg.quiz || cfg.key === 'vocabulary-quiz' || /quiz/i.test(cfg.postPath || '')) return 'QUIZ';
    return 'NEWS';
  }

  function isYoutubeThumb(url) {
    return /(?:img\.youtube|i\.ytimg)\.com\/vi\//i.test(String(url || ''));
  }

  function imgHtml(src, className, placeholder, opts) {
    opts = opts || {};
    if (src) {
      var play = opts.youtube
        ? '<span class="rd-list-yt-badge" aria-hidden="true">' +
          '<svg viewBox="0 0 28 20" width="28" height="20" focusable="false">' +
          '<rect x="0.5" y="0.5" width="27" height="19" rx="5.5" fill="#fff"/>' +
          '<path fill="#e11d1d" d="M11.2 5.4v9.2L19.2 10 11.2 5.4z"/>' +
          '</svg></span>'
        : '';
      return (
        '<div class="' + className + (opts.youtube ? ' has-yt' : '') + '">' +
          '<img src="' + escapeAttr(src) + '" alt="" loading="lazy" decoding="async">' +
          play +
        '</div>'
      );
    }
    return (
      '<div class="' + className + ' rd-list-img-empty" aria-hidden="true">' +
        '<span class="rd-list-empty-badge">' + escapeHtml(opts.emptyBadge || 'NEWS') + '</span>' +
        '<span class="rd-list-empty-letter">' + escapeHtml(placeholder || '') + '</span>' +
      '</div>'
    );
  }

  function currentPageFromHash() {
    var m = (window.location.hash || '').match(/page=(\d+)/i);
    if (m) return Math.max(1, parseInt(m[1], 10) || 1);
    try {
      var q = new URLSearchParams(window.location.search).get('page');
      if (q) return Math.max(1, parseInt(q, 10) || 1);
    } catch (e) { /* ignore */ }
    return 1;
  }

  function pageHref(page) {
    var url = new URL(window.location.href);
    if (page <= 1) url.searchParams.delete('page');
    else url.searchParams.set('page', String(page));
    return url.pathname + url.search + url.hash;
  }

  /** 뉴스 영어(국제·한국·국방…)는 글 수가 적어 페이지 없이 전체 스크롤 */
  function usesContinuousScroll(cfg) {
    return !!(cfg && cfg.navGroup === 'news');
  }

  function renderPager(page, totalPages) {
    if (totalPages <= 1) return '';
    var html = '<nav class="rd-list-pager" aria-label="페이지">';
    var prevCls = page <= 1 ? ' is-disabled' : '';
    html += '<a class="' + prevCls.trim() + '" href="' + escapeAttr(pageHref(Math.max(1, page - 1))) + '" aria-label="이전">이전</a>';
    var start = Math.max(1, page - 2);
    var end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    for (var i = start; i <= end; i += 1) {
      if (i === page) {
        html += '<span class="is-active" aria-current="page">' + i + '</span>';
      } else {
        html += '<a href="' + escapeAttr(pageHref(i)) + '">' + i + '</a>';
      }
    }
    var nextCls = page >= totalPages ? ' is-disabled' : '';
    html += '<a class="' + nextCls.trim() + '" href="' + escapeAttr(pageHref(Math.min(totalPages, page + 1))) + '" aria-label="다음">다음</a>';
    html += '</nav>';
    return html;
  }

  function renderBackToTop() {
    return (
      '<button type="button" class="rd-list-top" id="rd-list-top" aria-label="처음으로">' +
        '처음으로' +
      '</button>'
    );
  }

  function bindBackToTop(container) {
    var btn = container && container.querySelector('#rd-list-top');
    if (!btn || btn.getAttribute('data-bound') === '1') return;
    btn.setAttribute('data-bound', '1');
    btn.addEventListener('click', function () {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    });
  }

  function normalizeEntries(messages) {
    if (!messages) return [];
    if (Array.isArray(messages)) return messages.slice();
    if (Array.isArray(messages.entries)) return messages.entries.slice();
    return [];
  }

  function enrich(entry, index, total, cfg, apiMode) {
    var Config = global.BoardListConfig;
    var originalIndex = total - 1 - index;
    var cleaned = Config.cleanTitle(entry, cfg && cfg.key);
    var bi = typeof Config.splitBilingualTitle === 'function'
      ? Config.splitBilingualTitle(cleaned)
      : { display: cleaned, en: '', ko: '', bilingual: false };
    var keywordWords = usesKeywordCards(cfg) ? extractWordItems(entry, 3) : [];
    var tags = keywordWords.length
      ? keywordWords.map(function (w) { return w.expression; })
      : extractTags(entry, 4);
    return {
      entry: entry,
      id: String((entry && (entry._id || entry.id || entry.slug)) || '').trim(),
      href: buildHref(entry, originalIndex, cfg, apiMode),
      title: bi.bilingual ? bi.display : cleaned,
      titleEn: bi.en || '',
      titleKo: bi.ko || '',
      bilingual: !!bi.bilingual,
      source: Config.resolveSource(entry),
      date: formatDate(entry.date),
      thumb: extractThumb(entry),
      summary: extractSummary(entry),
      tags: tags,
      keywordWords: keywordWords
    };
  }

  function cardAnalyticsAttrs(item) {
    return ' data-content-type="post_card" data-item-id="' + escapeAttr(item.id || '') + '"';
  }

  function renderFeature(item, cfg) {
    if (!item) return '';
    var kw = usesKeywordCards(cfg);
    var metaParts = kw
      ? [cfg.categoryLabel]
      : [cfg.categoryLabel, item.source, item.date].filter(Boolean);
    var tags = (!kw && item.tags) ? item.tags.map(function (t) {
      return '<span class="rd-list-tag">' + escapeHtml(t) + '</span>';
    }).join('') : '';
    var media = kw
      ? keywordCardThumbHtml(item, cfg)
      : imgHtml(item.thumb, 'rd-list-feature-img', monoFromTitle(item), {
          youtube: isYoutubeThumb(item.thumb),
          emptyBadge: optsEmptyBadge(cfg)
        });
    var sub = kw
      ? ''
      : (item.summary ? '<span class="rd-list-feature-summary">' + escapeHtml(item.summary) + '</span>' : '');
    return (
      '<a class="rd-list-feature' + (kw ? ' rd-list-feature--kw' : '') + '" href="' + escapeAttr(item.href) + '"' +
        cardAnalyticsAttrs(item) + '>' +
        media +
        (metaParts.length && !kw
          ? '<span class="rd-list-feature-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>'
          : '') +
        titleHtml(item, 'rd-list-feature-title', { index: 1 }) +
        sub +
        (!kw && tags ? '<div class="rd-list-tags">' + tags + '</div>' : '') +
      '</a>'
    );
  }

  function renderSide(items) {
    if (!items.length) return '';
    var rows = items.map(function (item, i) {
      return (
        '<a class="rd-list-side-item" href="' + escapeAttr(item.href) + '">' +
          '<span class="rd-list-side-num">' + (i + 2) + '</span>' +
          '<span class="rd-list-side-body">' +
            (item.source ? '<span class="rd-list-side-source">' + escapeHtml(item.source) + '</span>' : '') +
            titleHtml(item, 'rd-list-side-title') +
          '</span>' +
        '</a>'
      );
    }).join('');
    return (
      '<div class="rd-list-side">' +
        '<span class="rd-list-side-label">최신 글</span>' +
        rows +
      '</div>'
    );
  }

  function renderCard(item, cfg) {
    var kw = usesKeywordCards(cfg);
    var metaParts = kw
      ? [cfg.categoryLabel]
      : [cfg.categoryLabel, item.source].filter(Boolean);
    var media = kw
      ? keywordCardThumbHtml(item, cfg)
      : imgHtml(item.thumb, 'rd-list-card-img', monoFromTitle(item), {
          youtube: isYoutubeThumb(item.thumb),
          emptyBadge: optsEmptyBadge(cfg)
        });
    return (
      '<a class="rd-list-card' + (kw ? ' rd-list-card--kw' : '') + '" href="' + escapeAttr(item.href) + '"' +
        cardAnalyticsAttrs(item) + '>' +
        media +
        (metaParts.length && !kw
          ? '<span class="rd-list-card-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>'
          : '') +
        titleHtml(item, 'rd-list-card-title') +
        (!kw && item.tags && item.tags.length
          ? '<div class="rd-list-tags rd-list-card-tags">' +
            item.tags.slice(0, 3).map(function (t) {
              return '<span class="rd-list-tag">' + escapeHtml(t) + '</span>';
            }).join('') +
            '</div>'
          : '') +
      '</a>'
    );
  }

  function bindCardAnalytics(container) {
    if (!container || container.getAttribute('data-rd-analytics') === '1') return;
    container.setAttribute('data-rd-analytics', '1');
    container.addEventListener('click', function (e) {
      var a = e.target.closest('a[data-content-type="post_card"]');
      if (!a || !container.contains(a)) return;
      trackSelectContent(a.getAttribute('data-item-id'));
    });
  }

  function renderTabs(cfg, apiMode) {
    if (!cfg.tabs || !cfg.tabs.length) return '';
    var links = cfg.tabs.map(function (tab) {
      var active = tab.key === cfg.key ? ' is-active' : '';
      var href = String(tab.href || '');
      /* 이미 ?api=prod 등이 있으면 붙이지 않음 (단어장 탭 깨짐 방지) */
      if (apiMode && href.indexOf('?') === -1) {
        href += '?api=' + encodeURIComponent(apiMode);
      }
      return '<a class="rd-list-tab' + active + '" href="' + escapeAttr(href) + '"' +
        (active ? ' aria-current="page"' : '') + '>' + escapeHtml(tab.label) + '</a>';
    }).join('');
    return '<div class="rd-list-tabs-wrap"><nav class="rd-list-tabs" aria-label="카테고리">' + links + '</nav></div>';
  }

  function renderRedesignBoardList(container, messages, options) {
    if (!container) return;
    options = options || {};
    document.body.classList.add('rd-list');

    var Config = global.BoardListConfig;
    if (!Config) {
      container.innerHTML = '<div class="rd-list-empty">목록 설정을 불러오지 못했습니다.</div>';
      return;
    }
    var cfg = Config.get(options.boardKey);
    if (!cfg) {
      container.innerHTML = '<div class="rd-list-empty">알 수 없는 게시판입니다.</div>';
      return;
    }

    var keywordMode = usesKeywordCards(cfg);
    document.body.classList.toggle('rd-list--keyword-cards', keywordMode);
    if (cfg.key) document.body.setAttribute('data-rd-board', cfg.key);

    var apiMode = options.apiMode || null;
    var continuous = usesContinuousScroll(cfg);
    var pageSize = continuous ? Number.MAX_SAFE_INTEGER : (options.pageSize || PAGE_SIZE_DEFAULT);
    var raw = normalizeEntries(messages);
    var newestFirst = raw.slice().reverse();
    var total = newestFirst.length;

    if (!total) {
      container.innerHTML =
        '<div class="rd-list-wrap">' +
          '<div class="rd-list-hero">' +
            '<h1 class="rd-list-kicker">' + escapeHtml(cfg.labelEn) + '</h1>' +
          '</div>' +
          renderTabs(cfg, apiMode) +
          '<div class="rd-list-empty">게시글이 없습니다.</div>' +
          (continuous ? renderBackToTop() : '') +
        '</div>';
      bindBackToTop(container);
      fitKwWordsInThumbs(container);
      return;
    }

    var items = newestFirst.map(function (entry, idx) {
      return enrich(entry, idx, total, cfg, apiMode);
    });

    var feature = items[0];
    var side = items.slice(1, 5);
    var page = continuous ? 1 : currentPageFromHash();
    var totalPages = continuous ? 1 : Math.max(1, Math.ceil(items.length / pageSize));
    if (page > totalPages) page = totalPages;
    var start = continuous ? 0 : (page - 1) * pageSize;
    var gridItems = continuous ? items : items.slice(start, start + pageSize);

    container.innerHTML =
      '<div class="rd-list-wrap' + (continuous ? ' rd-list-wrap--continuous' : '') + '">' +
        '<div class="rd-list-hero">' +
          '<h1 class="rd-list-kicker">' + escapeHtml(cfg.labelEn) + '</h1>' +
        '</div>' +
        renderTabs(cfg, apiMode) +
        '<div class="rd-list-featured">' +
          renderFeature(feature, cfg) +
          renderSide(side) +
        '</div>' +
        '<div class="rd-list-grid-wrap">' +
          '<div class="rd-list-grid-head"><h2>전체 글</h2><span>최신순</span></div>' +
          '<div class="rd-list-grid">' +
            gridItems.map(function (it) { return renderCard(it, cfg); }).join('') +
          '</div>' +
        '</div>' +
        (continuous ? '' : renderPager(page, totalPages)) +
        (continuous ? renderBackToTop() : '') +
      '</div>';

    bindCardAnalytics(container);
    bindBackToTop(container);
    fitKwWordsInThumbs(container);
  }

  /** 섬네일 안 영단어가 상자 너비·높이를 넘치면 font-size를 줄임 (PC 긴 단어 대응) */
  function fitKwWordsInThumbs(root) {
    if (!root || !root.querySelectorAll) return;
    var words = root.querySelectorAll('.rd-kw-thumb .rd-kw-word');
    if (!words.length) return;

    Array.prototype.forEach.call(words, function (el) {
      var thumb = el.closest('.rd-kw-thumb');
      if (!thumb) return;
      el.style.fontSize = '';
      var padX = 8;
      var maxW = Math.max(40, thumb.clientWidth - padX * 2);
      var hero = el.parentElement;
      var sub = hero ? hero.querySelector('.rd-kw-sub') : null;
      var maxH = Math.max(24, thumb.clientHeight - (sub ? sub.offsetHeight + 16 : 16));
      var size = parseFloat(window.getComputedStyle(el).fontSize) || 40;
      var min = 12;
      var guard = 40;
      while (guard-- > 0 && size > min && (el.scrollWidth > maxW + 1 || el.scrollHeight > maxH + 1)) {
        size -= 1;
        el.style.fontSize = size + 'px';
      }
    });
  }

  var kwFitTimer = null;
  function scheduleKwFit() {
    if (kwFitTimer) clearTimeout(kwFitTimer);
    kwFitTimer = setTimeout(function () {
      var root = document.querySelector('.rd-list-wrap');
      if (root) fitKwWordsInThumbs(root);
    }, 120);
  }
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', scheduleKwFit);
  }

  global.renderRedesignBoardList = renderRedesignBoardList;
  global.fitKwWordsInThumbs = fitKwWordsInThumbs;
})(typeof window !== 'undefined' ? window : globalThis);
