/**
 * 목록 페이지 시안 렌더러 — design/redesign-list.html
 * 사용: renderRedesignBoardList(container, messages, { boardKey, apiMode, pageSize })
 */
(function (global) {
  'use strict';

  var PAGE_SIZE_DEFAULT = 12;

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

  function titleHtml(item, className) {
    if (item && item.bilingual && item.titleEn && item.titleKo) {
      return (
        '<span class="' + className + ' rd-list-title-bi">' +
          '<span class="rd-list-title-en">' + escapeHtml(item.titleEn) + '</span>' +
          '<span class="rd-list-title-sep" aria-hidden="true"> : </span>' +
          '<span class="rd-list-title-ko">' + escapeHtml(item.titleKo) + '</span>' +
        '</span>'
      );
    }
    return '<span class="' + className + '">' + escapeHtml(item.title) + '</span>';
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

  function normalizeEntries(messages) {
    if (!messages) return [];
    if (Array.isArray(messages)) return messages.slice();
    if (Array.isArray(messages.entries)) return messages.entries.slice();
    return [];
  }

  function enrich(entry, index, total, cfg, apiMode) {
    var Config = global.BoardListConfig;
    var originalIndex = total - 1 - index;
    var cleaned = Config.cleanTitle(entry);
    var bi = typeof Config.splitBilingualTitle === 'function'
      ? Config.splitBilingualTitle(cleaned)
      : { display: cleaned, en: '', ko: '', bilingual: false };
    return {
      entry: entry,
      href: buildHref(entry, originalIndex, cfg, apiMode),
      title: bi.bilingual ? bi.display : cleaned,
      titleEn: bi.en || '',
      titleKo: bi.ko || '',
      bilingual: !!bi.bilingual,
      source: Config.resolveSource(entry),
      date: formatDate(entry.date),
      thumb: extractThumb(entry),
      summary: extractSummary(entry),
      tags: extractTags(entry, 4)
    };
  }

  function renderFeature(item, cfg) {
    if (!item) return '';
    var metaParts = [cfg.categoryLabel, item.source, item.date].filter(Boolean);
    var tags = item.tags.map(function (t) {
      return '<span class="rd-list-tag">' + escapeHtml(t) + '</span>';
    }).join('');
    return (
      '<a class="rd-list-feature" href="' + escapeAttr(item.href) + '">' +
        imgHtml(item.thumb, 'rd-list-feature-img', monoFromTitle(item), {
          youtube: isYoutubeThumb(item.thumb),
          emptyBadge: optsEmptyBadge(cfg)
        }) +
        '<span class="rd-list-feature-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>' +
        titleHtml(item, 'rd-list-feature-title') +
        (item.summary ? '<span class="rd-list-feature-summary">' + escapeHtml(item.summary) + '</span>' : '') +
        (tags ? '<div class="rd-list-tags">' + tags + '</div>' : '') +
      '</a>'
    );
  }

  function renderSide(items) {
    if (!items.length) return '';
    var rows = items.map(function (item, i) {
      return (
        '<a class="rd-list-side-item" href="' + escapeAttr(item.href) + '">' +
          '<span class="rd-list-side-num">' + (i + 1) + '</span>' +
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
    var metaParts = [cfg.categoryLabel, item.source].filter(Boolean);
    return (
      '<a class="rd-list-card" href="' + escapeAttr(item.href) + '">' +
        imgHtml(item.thumb, 'rd-list-card-img', monoFromTitle(item), {
          youtube: isYoutubeThumb(item.thumb),
          emptyBadge: optsEmptyBadge(cfg)
        }) +
        (metaParts.length ? '<span class="rd-list-card-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>' : '') +
        titleHtml(item, 'rd-list-card-title') +
        (item.tags && item.tags.length
          ? '<div class="rd-list-tags rd-list-card-tags">' +
            item.tags.slice(0, 3).map(function (t) {
              return '<span class="rd-list-tag">' + escapeHtml(t) + '</span>';
            }).join('') +
            '</div>'
          : '') +
      '</a>'
    );
  }

  function renderTabs(cfg, apiMode) {
    if (!cfg.tabs || !cfg.tabs.length) return '';
    var apiQ = apiMode ? '?api=' + encodeURIComponent(apiMode) : '';
    var links = cfg.tabs.map(function (tab) {
      var active = tab.key === cfg.key ? ' is-active' : '';
      var href = tab.href + apiQ;
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

    var apiMode = options.apiMode || null;
    var pageSize = options.pageSize || PAGE_SIZE_DEFAULT;
    var raw = normalizeEntries(messages);
    var newestFirst = raw.slice().reverse();
    var total = newestFirst.length;

    if (!total) {
      container.innerHTML =
        '<div class="rd-list-wrap">' +
          '<div class="rd-list-hero">' +
            '<span class="rd-list-kicker">' + escapeHtml(cfg.labelEn) + '</span>' +
            '<h1>' + escapeHtml(cfg.title) + '</h1>' +
            '<p>' + escapeHtml(cfg.description) + '</p>' +
          '</div>' +
          renderTabs(cfg, apiMode) +
          '<div class="rd-list-empty">게시글이 없습니다.</div>' +
        '</div>';
      return;
    }

    var items = newestFirst.map(function (entry, idx) {
      return enrich(entry, idx, total, cfg, apiMode);
    });

    var feature = items[0];
    var side = items.slice(1, 5);
    var page = currentPageFromHash();
    var totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    if (page > totalPages) page = totalPages;
    var start = (page - 1) * pageSize;
    var gridItems = items.slice(start, start + pageSize);

    container.innerHTML =
      '<div class="rd-list-wrap">' +
        '<div class="rd-list-hero">' +
          '<span class="rd-list-kicker">' + escapeHtml(cfg.labelEn) + '</span>' +
          '<h1>' + escapeHtml(cfg.title) + '</h1>' +
          '<p>' + escapeHtml(cfg.description) + '</p>' +
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
        renderPager(page, totalPages) +
      '</div>';
  }

  global.renderRedesignBoardList = renderRedesignBoardList;
})(typeof window !== 'undefined' ? window : globalThis);
