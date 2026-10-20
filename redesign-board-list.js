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

  function extractThumb(entry) {
    if (entry && entry.thumbnail) return String(entry.thumbnail);
    var msg = entry && entry.message ? String(entry.message) : '';
    if (!msg) return '';
    var yt = msg.match(/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\//i);
    if (yt) return 'https://img.youtube.com/vi/' + yt[1] + '/hqdefault.jpg';
    var ytWatch = msg.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i);
    if (ytWatch) return 'https://img.youtube.com/vi/' + ytWatch[1] + '/hqdefault.jpg';
    var img = msg.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (img && img[1] && !/data:image\//i.test(img[1])) return img[1];
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
    var plain = stripHtml(msg);
    if (!plain) return '';
    return plain.length > 160 ? plain.slice(0, 157) + '…' : plain;
  }

  function extractTags(entry, limit) {
    limit = limit || 4;
    var tags = [];
    if (entry && Array.isArray(entry.tags)) {
      tags = entry.tags.map(function (t) { return String(t || '').trim(); }).filter(Boolean);
    }
    if (!tags.length && entry && entry.message) {
      var re = /<mark[^>]*class=["'][^"']*nv-hl[^"']*["'][^>]*>([\s\S]*?)<\/mark>/gi;
      var m;
      var seen = {};
      while ((m = re.exec(entry.message)) && tags.length < limit) {
        var word = stripHtml(m[1]).replace(/\s+/g, ' ').trim();
        var key = word.toLowerCase();
        if (word && !seen[key] && word.length < 48) {
          seen[key] = true;
          tags.push(word);
        }
      }
      /* 신문읽는 이미지: 항구 : harbor → harbor */
      if (!tags.length) {
        var lineRe = /(?:^|\n)\s*[^:\n가-힣]*[가-힣][^:\n]*\s*:\s*([A-Za-z][A-Za-z0-9'\/.\s-]{0,40})/g;
        var lm;
        while ((lm = lineRe.exec(entry.message)) && tags.length < limit) {
          var en = String(lm[1] || '').replace(/\s+/g, ' ').trim();
          var ek = en.toLowerCase();
          if (en && !seen[ek] && en.length < 48) {
            seen[ek] = true;
            tags.push(en);
          }
        }
      }
    }
    return tags.slice(0, limit);
  }

  function imgHtml(src, className, placeholder) {
    if (src) {
      return '<div class="' + className + '"><img src="' + escapeAttr(src) + '" alt="" loading="lazy" decoding="async"></div>';
    }
    return '<div class="' + className + '" aria-hidden="true">' + escapeHtml(placeholder || '') + '</div>';
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
    return {
      entry: entry,
      href: buildHref(entry, originalIndex, cfg, apiMode),
      title: Config.cleanTitle(entry),
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
        imgHtml(item.thumb, 'rd-list-feature-img', '이미지 없음') +
        '<span class="rd-list-feature-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>' +
        '<span class="rd-list-feature-title">' + escapeHtml(item.title) + '</span>' +
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
            '<span class="rd-list-side-title">' + escapeHtml(item.title) + '</span>' +
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
        imgHtml(item.thumb, 'rd-list-card-img', '') +
        (metaParts.length ? '<span class="rd-list-card-meta">' + escapeHtml(metaParts.join(' · ')) + '</span>' : '') +
        '<span class="rd-list-card-title">' + escapeHtml(item.title) + '</span>' +
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
