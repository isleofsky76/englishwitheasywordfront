/**
 * 상세 페이지 시안 렌더러 — design/redesign-article.html
 * 사용: renderRedesignArticle(container, post, { boardKey, related, prev, next, convertedMessage })
 */
(function (global) {
  'use strict';

  var ASSET_VER = '20261020rd10';

  function assetBase() {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].getAttribute('src') || '';
      if (/redesign-article\.js|news-voca\.js|korea-news\.js|defense-news\.js/.test(src)) {
        return src.replace(/[^/]+$/, '');
      }
    }
    return '';
  }

  function ensureCss() {
    var base = assetBase();
    [
      'redesign-tokens.css?v=' + ASSET_VER,
      'redesign-article.css?v=' + ASSET_VER,
      'site-masthead.css?v=' + ASSET_VER
    ].forEach(function (href) {
      var path = base + href;
      if (document.querySelector('link[href*="' + href.split('?')[0] + '"]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = path;
      document.head.appendChild(link);
    });
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
      return d.getFullYear() + '.' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '.' +
        ('0' + d.getDate()).slice(-2);
    } catch (e) {
      return '';
    }
  }

  function stripHtml(html) {
    if (!html) return '';
    var div = document.createElement('div');
    div.innerHTML = html;
    return (div.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function padNum(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function resolveSource(post, cfg) {
    if (post && post.source) return String(post.source).trim();
    if (global.BoardListConfig) return global.BoardListConfig.resolveSource(post);
    return '';
  }

  function extractYoutube(html) {
    var msg = String(html || '');
    var m = msg.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i) ||
      msg.match(/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\//i);
    if (!m) return null;
    var id = m[1];
    return {
      id: id,
      watch: 'https://www.youtube.com/watch?v=' + id,
      embed: 'https://www.youtube.com/embed/' + id,
      thumb: 'https://img.youtube.com/vi/' + id + '/hqdefault.jpg'
    };
  }

  function extractSourceLink(html) {
    var m = String(html || '').match(
      /class=["'][^"']*nv-related-link--article[^"']*["'][^>]*href=["']([^"']+)["']/i
    ) || String(html || '').match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?신문보기/i);
    return m ? m[1] : '';
  }

  function extractSummary(post, root) {
    if (post && post.summary) return String(post.summary).trim();
    if (post && post.metaDescription) return String(post.metaDescription).trim();
    if (!root) return '';
    var lead = root.querySelector('.nv-lead-text, .nv-lead p');
    if (lead) return stripHtml(lead.innerHTML);
    return '';
  }

  function parseCards(root) {
    var cards = [];
    if (!root) return cards;
    var sections = root.querySelectorAll('.nv-word-section');
    sections.forEach(function (sec, idx) {
      var marks = Array.prototype.map.call(sec.querySelectorAll('mark.nv-hl, .nv-hl, mark'), function (el) {
        return stripHtml(el.innerHTML);
      }).filter(Boolean);
      var unique = [];
      var seen = {};
      marks.forEach(function (w) {
        var k = w.toLowerCase();
        if (!seen[k]) { seen[k] = true; unique.push(w); }
      });

      var wordEn = '';
      var wordKo = '';
      var enEl = sec.querySelector('.nv-en, .nv-phrase-en, .nv-section-title');
      var koEl = sec.querySelector('.nv-ko, .nv-phrase-ko');
      if (enEl) wordEn = stripHtml(enEl.innerHTML);
      if (koEl) wordKo = stripHtml(koEl.innerHTML);
      if (!wordEn && unique.length) wordEn = unique[0];

      var meaningEl = sec.querySelector('.nv-meaning-text');
      var meaning = meaningEl ? stripHtml(meaningEl.innerHTML) : (wordKo || '');
      if (postMeaningHidden(meaning, wordEn)) meaning = wordKo || '';

      var enEx = sec.querySelector('.nv-ex-en');
      var koEx = sec.querySelector('.nv-ex-ko, .nv-narrative-def, .nv-narrative-text');
      var enHtml = '';
      var koText = '';

      if (enEx) {
        enHtml = enEx.innerHTML;
      }
      /* narrative-only: 표현은 rd-expr-word(01 staggered)에만 두고
         mark를 다시 enHtml로 만들면 staggered 가 두 번 보임 → 생략 */

      if (koEx) koText = stripHtml(koEx.innerHTML);
      else if (sec.querySelector('.nv-narrative-text')) {
        koText = stripHtml(sec.querySelector('.nv-narrative-text').innerHTML);
      }

      // Prefer highlighting expression inside English if we have raw English without marks
      if (enEx && wordEn && enHtml.indexOf('<mark') === -1) {
        enHtml = highlightPhrase(enHtml, wordEn);
      }

      if (!wordEn && !koText && !enHtml) return;
      cards.push({
        id: 'rd-expr-' + (idx + 1),
        num: padNum(idx + 1),
        expression: wordEn || ('표현 ' + (idx + 1)),
        meaning: meaning,
        enHtml: enHtml,
        ko: koText
      });
    });
    return cards;
  }

  function postMeaningHidden(meaning, expression) {
    if (!meaning) return true;
    return meaning.toLowerCase() === String(expression || '').toLowerCase();
  }

  function highlightPhrase(html, phrase) {
    var plain = stripHtml(html);
    var p = String(phrase || '').trim();
    if (!p) return escapeHtml(plain);
    var idx = plain.toLowerCase().indexOf(p.toLowerCase());
    if (idx < 0) return escapeHtml(plain);
    return escapeHtml(plain.slice(0, idx)) +
      '<mark>' + escapeHtml(plain.slice(idx, idx + p.length)) + '</mark>' +
      escapeHtml(plain.slice(idx + p.length));
  }

  function ytLogoSvg() {
    return '<svg class="rd-btn-yt-icon" viewBox="0 0 28 20" aria-hidden="true" focusable="false">' +
      '<path fill="#FF0000" d="M27.33 3.12A3.5 3.5 0 0 0 24.86.65C22.7 0 14 0 14 0S5.3 0 3.14.65A3.5 3.5 0 0 0 .67 3.12 36.7 36.7 0 0 0 0 10a36.7 36.7 0 0 0 .67 6.88 3.5 3.5 0 0 0 2.47 2.47C5.3 20 14 20 14 20s8.7 0 10.86-.65a3.5 3.5 0 0 0 2.47-2.47A36.7 36.7 0 0 0 28 10a36.7 36.7 0 0 0-.67-6.88z"/>' +
      '<path fill="#fff" d="M11.2 14.3V5.7L18.5 10l-7.3 4.3z"/>' +
      '</svg>';
  }

  function moveAdsense(into) {
    if (!into) return;
    var existing = document.querySelector('.rd-ad-slot');
    if (existing) return;
    var slot = document.createElement('div');
    slot.className = 'rd-ad-slot';
    slot.setAttribute('aria-label', '광고');
    var ads = document.querySelectorAll('ins.adsbygoogle');
    if (ads.length) {
      var first = ads[0];
      var parent = first.parentElement;
      slot.appendChild(first);
      if (parent && parent !== document.body && !parent.querySelector('ins.adsbygoogle') &&
          parent.children.length === 0) {
        parent.style.display = 'none';
      }
    } else {
      slot.innerHTML = '<ins class="adsbygoogle" style="display:inline-block;width:300px;height:250px" data-ad-client="ca-pub-6108574897789788" data-ad-slot=""></ins>';
    }
    into.appendChild(slot);
    try {
      if (global.adsbygoogle) (global.adsbygoogle = global.adsbygoogle || []).push({});
    } catch (e) { /* ignore */ }
  }

  function renderCardHtml(card) {
    return (
      '<article class="rd-expr" id="' + escapeAttr(card.id) + '">' +
        '<div class="rd-expr-top">' +
          '<span class="rd-expr-num">' + escapeHtml(card.num) + '</span>' +
          '<span class="rd-expr-word">' + escapeHtml(card.expression) + '</span>' +
          (card.meaning ? '<span class="rd-expr-meaning">' + escapeHtml(card.meaning) + '</span>' : '') +
        '</div>' +
        (card.enHtml ? '<p class="rd-expr-en">' + card.enHtml + '</p>' : '') +
        (card.ko ? '<p class="rd-expr-ko">' + escapeHtml(card.ko) + '</p>' : '') +
      '</article>'
    );
  }

  function renderRedesignArticle(container, post, options) {
    if (!container || !post) return false;
    options = options || {};
    var Config = global.BoardListConfig;
    var cfg = Config && Config.get(options.boardKey);
    if (!cfg || cfg.articleLayout === 'header-only') return false;

    ensureCss();
    document.body.classList.add('rd-article', 'rd-article-like-hidden');

    var html = options.convertedMessage != null ? options.convertedMessage : (post.message || '');
    var parser = document.createElement('div');
    parser.innerHTML = html;

    var title = Config ? Config.cleanTitle(post) : String(post.title || '제목 없음');
    var source = resolveSource(post, cfg);
    var date = formatDate(post.date);
    var summary = extractSummary(post, parser);
    var yt = extractYoutube(html);
    var sourceUrl = extractSourceLink(html) || (post.sourceUrl || '');
    var cards = parseCards(parser);
    if (Array.isArray(post.words) && post.words.length && !cards.length) {
      cards = post.words.map(function (w, i) {
        return {
          id: 'rd-expr-' + (i + 1),
          num: padNum(i + 1),
          expression: (w.en || w.expression || w.word || '').trim() || ('표현 ' + (i + 1)),
          meaning: (w.meaning || w.ko || '').trim(),
          enHtml: w.exampleEn ? highlightPhrase(escapeHtml(w.exampleEn), w.en || w.expression || '') : '',
          ko: (w.exampleKo || w.koSentence || '').trim()
        };
      });
    }

    var crumb =
      '<nav class="rd-article-crumb" aria-label="위치">' +
        '<a href="index.html">홈</a><span aria-hidden="true">/</span>' +
        '<a href="' + escapeAttr(cfg.breadcrumbParent.href) + '">' + escapeHtml(cfg.breadcrumbParent.label) + '</a>' +
        '<span aria-hidden="true">/</span>' +
        '<span class="is-current">' + escapeHtml(cfg.categoryLabel) + '</span>' +
      '</nav>';

    var metaParts = [];
    if (source) metaParts.push('<span class="rd-source">출처 ' + escapeHtml(source) + '</span>');
    if (date) metaParts.push('<span>' + escapeHtml(date) + '</span>');
    if (cards.length) metaParts.push('<span>핵심 표현 ' + cards.length + '개</span>');

    var ytBlock = '';
    if (yt) {
      ytBlock =
        '<div class="rd-yt">' +
          '<a href="' + escapeAttr(yt.watch) + '" target="_blank" rel="noopener noreferrer" aria-label="유튜브 영상 보기">' +
            '<img src="' + escapeAttr(yt.thumb) + '" alt="">' +
            '<span class="rd-yt-play">▶ YouTube</span>' +
          '</a>' +
        '</div>';
    }

    var actions = '<div class="rd-article-actions">';
    if (yt) {
      actions += '<a class="rd-btn-solid" href="' + escapeAttr(yt.watch) + '" target="_blank" rel="noopener noreferrer">' +
        ytLogoSvg() + ' 유튜브로 듣기</a>';
    }
    if (sourceUrl) {
      actions += '<a class="rd-btn-outline" href="' + escapeAttr(sourceUrl) + '" target="_blank" rel="noopener noreferrer">원문 기사 보기 ↗</a>';
    }
    actions += '</div>';

    var toc = cards.map(function (c) {
      return '<a href="#' + escapeAttr(c.id) + '"><span class="num">' + escapeHtml(c.num) + '</span>' +
        escapeHtml(c.expression) + '</a>';
    }).join('');

    var related = Array.isArray(options.related) ? options.related : [];
    var relatedHtml = related.slice(0, 3).map(function (r) {
      var thumb = r.thumb
        ? '<div class="rd-side-related-img"><img src="' + escapeAttr(r.thumb) + '" alt=""></div>'
        : '<div class="rd-side-related-img"></div>';
      return '<a href="' + escapeAttr(r.href) + '">' + thumb +
        '<span class="rd-side-related-title">' + escapeHtml(r.title) + '</span></a>';
    }).join('');

    var navHtml = '';
    if (options.prev || options.next) {
      navHtml = '<div class="rd-article-nav">';
      if (options.prev) {
        navHtml += '<a href="' + escapeAttr(options.prev.href) + '"><span class="label">이전 글</span>' +
          '<span class="title">' + escapeHtml(options.prev.title) + '</span></a>';
      }
      if (options.next) {
        navHtml += '<a href="' + escapeAttr(options.next.href) + '"><span class="label">다음 글</span>' +
          '<span class="title">' + escapeHtml(options.next.title) + '</span></a>';
      }
      navHtml += '</div>';
    }

    // Preserve like button hook in a visually hidden form if present
    var likeHost = '<div id="rd-like-host" hidden></div>';

    /* 기사 slug + '-quiz' → vocabulary-quiz 복습 (영어 : 뜻) */
    var articleSlug = String(post.slug || options.slug || '').trim();
    var reviewQuizHref = articleSlug
      ? '/vocabulary-quiz/' + encodeURIComponent(articleSlug + '-quiz') + '/'
      : '/vocabulary-quiz-list.html';

    container.innerHTML =
      '<div class="rd-article-head">' +
        crumb +
        '<h1 id="post-title">' + escapeHtml(title) + '</h1>' +
        '<div class="rd-article-meta" id="post-meta">' + metaParts.join('') + likeHost + '</div>' +
        (summary ? '<p class="rd-article-summary">' + escapeHtml(summary) + '</p>' : '') +
      '</div>' +
      '<div class="rd-article-layout">' +
        '<div class="rd-article-main" id="post-content">' +
          ytBlock +
          '<div id="post-message" class="rd-article-cards">' +
            (cards.length ? cards.map(renderCardHtml).join('') :
              '<div class="rd-article-fallback">' + html + '</div>') +
          '</div>' +
          actions +
          '<div class="rd-review">' +
            '<div><div class="rd-review-kicker">QUICK REVIEW</div>' +
            '<div class="rd-review-title">방금 읽은 표현, 기억나나요?</div></div>' +
            '<a href="' + escapeAttr(reviewQuizHref) + '">복습 퀴즈 풀기</a>' +
          '</div>' +
          navHtml +
        '</div>' +
        '<aside class="rd-article-side">' +
          (toc ? '<div class="rd-side-block"><h2>이 글의 핵심 표현</h2><div class="rd-side-toc">' + toc + '</div></div>' : '') +
          (relatedHtml ? '<div class="rd-side-block"><h2>함께 읽기</h2><div class="rd-side-related">' + relatedHtml + '</div></div>' : '') +
          '<div class="rd-side-block" id="rd-ad-host"></div>' +
        '</aside>' +
      '</div>';

    moveAdsense(container.querySelector('#rd-ad-host'));

    // Keep a hidden like control so initViewpostLike can still bind if called after
    if (typeof options.onReady === 'function') options.onReady(container);

    return true;
  }

  /**
   * Apply shell tokens/masthead page class for header-only boards
   */
  function applyRedesignChrome(boardKey) {
    document.body.classList.add('rd-article');
    if (boardKey) document.body.setAttribute('data-rd-board', boardKey);
  }

  /**
   * Fetch related + render. Returns true if redesign applied.
   */
  async function mountRedesignArticle(container, post, options) {
    options = options || {};
    var cfg = global.BoardListConfig && global.BoardListConfig.get(options.boardKey);
    if (!cfg || cfg.articleLayout !== 'expression-cards') {
      applyRedesignChrome(options.boardKey);
      return false;
    }
    var related = options.related || [];
    if (!related.length && options.apiBaseUrl && cfg.apiPath) {
      try {
        var res = await fetch(options.apiBaseUrl + cfg.apiPath, { cache: 'no-store' });
        if (res.ok) {
          var data = await res.json();
          var entries = Array.isArray(data) ? data : (data.entries || []);
          var newest = entries.slice().reverse();
          related = newest
            .filter(function (e) { return e && e._id !== post._id; })
            .slice(0, 3)
            .map(function (e) {
              var slug = String(e.slug || '').trim();
              /* SEO 상세(/defense-news/foo/)에서도 깨지지 않게 사이트 루트 절대경로 */
              var href = slug && cfg.postPath
                ? '/' + String(cfg.postPath).replace(/^\/+|\/+$/g, '') + '/' + encodeURIComponent(slug) + '/'
                : '/' + String(cfg.postPage || '').replace(/^\//, '') +
                  (slug ? ('?slug=' + encodeURIComponent(slug)) : '');
              var thumbMatch = String(e.message || '').match(/img\.youtube\.com\/vi\/([a-zA-Z0-9_-]+)\//i);
              return {
                href: href,
                title: global.BoardListConfig.cleanTitle(e),
                thumb: thumbMatch ? 'https://img.youtube.com/vi/' + thumbMatch[1] + '/hqdefault.jpg' : ''
              };
            });
        }
      } catch (e) { /* ignore */ }
    }
    return !!renderRedesignArticle(container, post, {
      boardKey: options.boardKey,
      convertedMessage: options.convertedMessage,
      related: related,
      prev: options.prev,
      next: options.next
    });
  }

  global.renderRedesignArticle = renderRedesignArticle;
  global.mountRedesignArticle = mountRedesignArticle;
  global.applyRedesignChrome = applyRedesignChrome;
})(typeof window !== 'undefined' ? window : globalThis);
