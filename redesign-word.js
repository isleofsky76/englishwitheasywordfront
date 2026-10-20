/**
 * Word of the Day 상세 시안 렌더러 — frontend/redesign-word.html
 * mountRedesignWord(container, post, { boardKey, apiBaseUrl, convertedMessage })
 */
(function (global) {
  'use strict';

  var ASSET_VER = '20261020rd30';
  var SPEAKER_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path></svg>';
  var SPEAKER_FULL_SVG =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5L6 9H2v6h4l5 4V5z"></path><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a10 10 0 0 1 0 14"></path></svg>';
  var YT_PLAY_SVG =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" aria-hidden="true"><path d="M8 5v14l11-7z"></path></svg>';

  function markReady() {
    try {
      document.documentElement.classList.add('rd-ready');
      document.body.classList.add('rd-ready');
    } catch (e) { /* ignore */ }
  }

  function assetBase() {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].getAttribute('src') || '';
      if (/redesign-word\.js|page30_viewpost_wordofday\.js/.test(src)) {
        return src.replace(/[^/]+$/, '');
      }
    }
    return '';
  }

  function ensureCss() {
    var base = assetBase();
    [
      'redesign-tokens.css?v=' + ASSET_VER,
      'redesign-word.css?v=' + ASSET_VER,
      'site-masthead.css?v=' + ASSET_VER
    ].forEach(function (href) {
      var file = href.split('?')[0];
      if (document.querySelector('link[rel="stylesheet"][href*="' + file + '"]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + href;
      document.head.appendChild(link);
    });
  }

  function ensureScript(file) {
    return new Promise(function (resolve) {
      var name = file.split('?')[0];
      if (document.querySelector('script[src*="' + name + '"]')) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.src = assetBase() + file;
      s.onload = function () { resolve(); };
      s.onerror = function () { resolve(); };
      document.head.appendChild(s);
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

  function padNum(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function stripTags(html) {
    var d = document.createElement('div');
    d.innerHTML = html || '';
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
  }

  function allowSafeHtml(html) {
    var d = document.createElement('div');
    d.innerHTML = html || '';
    d.querySelectorAll('*').forEach(function (el) {
      var tag = el.tagName.toLowerCase();
      if (tag !== 'mark' && tag !== 'em' && tag !== 'strong' && tag !== 'b' && tag !== 'i' && tag !== 'span' && tag !== 'br') {
        el.replaceWith.apply(el, el.childNodes);
        return;
      }
      Array.from(el.attributes).forEach(function (attr) {
        if (attr.name !== 'class') el.removeAttribute(attr.name);
      });
      if (tag === 'mark') el.className = 'rd-word-hl';
      if (tag === 'em' || (tag === 'span' && /wotd-core-em|rd-word-em/.test(el.className))) {
        el.className = 'rd-word-em';
      }
    });
    return d.innerHTML;
  }

  function parseWordPayload(html) {
    var root = document.createElement('div');
    root.innerHTML = html || '';
    var box = root.querySelector('.wotd-word') || root;

    var img = box.querySelector('img.wotd-hero-image, img[src*="/resources/"]');
    var imageSrc = img ? (img.getAttribute('src') || '') : '';

    var ipaEl = box.querySelector('.wotd-ipa');
    var ipaKoEl = box.querySelector('.wotd-ipa-ko');
    var ipa = ipaEl ? stripTags(ipaEl.innerHTML) : '';
    var ipaKo = ipaKoEl ? stripTags(ipaKoEl.innerHTML) : '';

    var pos = Array.from(box.querySelectorAll('.wotd-pos')).map(function (el) {
      var meaning = el.querySelector('.wotd-meaning');
      var sub = el.querySelector('.wotd-meaning-sub');
      return {
        pos: el.getAttribute('data-pos') || '',
        primary: el.getAttribute('data-primary') === '1',
        meaning: meaning ? stripTags(meaning.innerHTML) : stripTags(el.innerHTML),
        sub: sub ? stripTags(sub.innerHTML) : ''
      };
    }).filter(function (p) { return p.pos || p.meaning; });

    var coreEl = box.querySelector('.wotd-core');
    var coreHtml = coreEl ? allowSafeHtml(coreEl.innerHTML) : '';

    var nuanceEl = box.querySelector('.wotd-nuance');
    var nuanceHtml = nuanceEl ? allowSafeHtml(nuanceEl.innerHTML) : '';

    var compares = Array.from(box.querySelectorAll('.wotd-compare')).map(function (el) {
      var en = el.querySelector('.wotd-cmp-en');
      var ko = el.querySelector('.wotd-cmp-ko');
      return {
        en: en ? stripTags(en.innerHTML) : '',
        ko: ko ? stripTags(ko.innerHTML) : '',
        active: el.getAttribute('data-active') === '1'
      };
    }).filter(function (c) { return c.en; });

    var collocations = Array.from(box.querySelectorAll('.wotd-col')).map(function (el) {
      var en = el.querySelector('.wotd-col-en');
      var ko = el.querySelector('.wotd-col-ko');
      return {
        en: en ? stripTags(en.innerHTML) : '',
        ko: ko ? stripTags(ko.innerHTML) : ''
      };
    }).filter(function (c) { return c.en; });

    var examples = Array.from(box.querySelectorAll('.wotd-ex, section.nv-word-section')).map(function (el) {
      var en = el.querySelector('.wotd-ex-en, .nv-ex-en');
      var ko = el.querySelector('.wotd-ex-ko, .nv-ex-ko');
      return {
        enHtml: en ? allowSafeHtml(en.innerHTML) : '',
        ko: ko ? stripTags(ko.innerHTML) : '',
        tag: el.getAttribute('data-tag') || ''
      };
    }).filter(function (ex) { return ex.enHtml; });

    var takeawayEl = box.querySelector('.wotd-takeaway');
    var takeaway = takeawayEl ? stripTags(takeawayEl.innerHTML) : '';

    var glance = Array.from(box.querySelectorAll('.wotd-glance > div, .wotd-glance-row')).map(function (el) {
      var dt = el.querySelector('dt, .wotd-gl-k');
      var dd = el.querySelector('dd, .wotd-gl-v');
      return {
        k: dt ? stripTags(dt.innerHTML) : '',
        v: dd ? stripTags(dd.innerHTML) : ''
      };
    }).filter(function (g) { return g.k && g.v; });

    return {
      imageSrc: imageSrc,
      ipa: ipa,
      ipaKo: ipaKo,
      pos: pos,
      coreHtml: coreHtml,
      nuanceHtml: nuanceHtml,
      compares: compares,
      collocations: collocations,
      examples: examples,
      takeaway: takeaway,
      glance: glance,
      capable: !!(coreHtml || examples.length || pos.length)
    };
  }

  function wordHead(post) {
    var Config = global.BoardListConfig;
    var raw = Config ? Config.cleanTitle(post) : String((post && post.title) || '');
    var bi = Config && Config.splitBilingualTitle ? Config.splitBilingualTitle(raw) : null;
    if (bi && bi.bilingual && bi.en) return bi.en;
    if (post && post.slug) return String(post.slug);
    return raw.split(/\s*[|｜]\s*/)[0].trim() || raw;
  }

  function wordGloss(post) {
    var Config = global.BoardListConfig;
    var raw = Config ? Config.cleanTitle(post) : String((post && post.title) || '');
    var bi = Config && Config.splitBilingualTitle ? Config.splitBilingualTitle(raw) : null;
    if (bi && bi.bilingual && bi.ko) return bi.ko;
    var parts = raw.split(/\s*[|｜]\s*/);
    return parts.length > 1 ? parts[1].trim() : '';
  }

  function entryHref(entry, cfg) {
    var slug = String((entry && entry.slug) || '').trim();
    if (slug && cfg && cfg.postPath) {
      return '/' + String(cfg.postPath).replace(/^\/+|\/+$/g, '') + '/' + encodeURIComponent(slug) + '/';
    }
    return '/' + String((cfg && cfg.postPage) || 'word-of-the-day.html').replace(/^\//, '') +
      (slug ? ('?slug=' + encodeURIComponent(slug)) : '');
  }

  function mapNavEntry(entry) {
    return {
      href: '',
      word: wordHead(entry),
      gloss: wordGloss(entry),
      entry: entry
    };
  }

  function speakText(text, btn) {
    if (!global.speechSynthesis || !text) return;
    try {
      if (global.__rdWordUtter && speechSynthesis.speaking) {
        speechSynthesis.cancel();
        if (global.__rdWordBtn) global.__rdWordBtn.classList.remove('is-playing');
        if (global.__rdWordBtn === btn) {
          global.__rdWordUtter = null;
          global.__rdWordBtn = null;
          return;
        }
      }
      var u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US';
      u.onend = function () {
        if (btn) btn.classList.remove('is-playing');
        global.__rdWordUtter = null;
        global.__rdWordBtn = null;
      };
      u.onerror = u.onend;
      global.__rdWordUtter = u;
      global.__rdWordBtn = btn;
      if (btn) btn.classList.add('is-playing');
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  function bindTts(root) {
    root.querySelectorAll('[data-rd-tts]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        speakText(btn.getAttribute('data-rd-tts') || '', btn);
      });
    });
  }

  function renderFooter() {
    return (
      '<div class="rd-word-spacer"></div>' +
      '<footer class="rd-word-footer" role="contentinfo">' +
        '<div class="rd-word-footer-inner">' +
          '<div class="rd-word-footer-brand">' +
            '<span class="name">시사영단어</span>' +
            '<span class="desc">뉴스로 배우는 시사 영어. 뉴스 어휘, 오늘의 단어, 유의어, 퀴즈를 무료로.</span>' +
          '</div>' +
          '<div class="rd-word-footer-links">' +
            '<a href="https://www.youtube.com/@istudyeng">YouTube</a>' +
            '<a href="https://x.com/istudyengli">X</a>' +
            '<a href="/about.html">사이트 소개</a>' +
            '<a href="/privacy.html">개인정보처리방침</a>' +
            '<a href="/terms.html">이용약관</a>' +
          '</div>' +
        '</div>' +
        '<div class="rd-word-footer-copy">© 2026 시사영단어 · News English Lab</div>' +
      '</footer>'
    );
  }

  function renderWordPage(container, post, data, options) {
    options = options || {};
    var cfg = global.BoardListConfig && global.BoardListConfig.get(options.boardKey || 'word-of-the-day');
    var word = wordHead(post);
    var listHref = (cfg && cfg.breadcrumbParent && cfg.breadcrumbParent.href) || 'word-of-the-day-list.html?api=prod';
    if (listHref.indexOf('/') !== 0 && listHref.indexOf('http') !== 0) listHref = '/' + listHref;

    var posHtml = data.pos.map(function (p, i) {
      var primary = p.primary || (i === 0 && data.pos.length);
      return (
        '<div class="rd-word-pos-row' + (primary ? '' : ' is-secondary') + '">' +
          '<span class="rd-word-pos-badge' + (primary ? '' : ' is-outline') + '">' + escapeHtml(p.pos) + '</span>' +
          '<span class="rd-word-pos-main">' + escapeHtml(p.meaning) + '</span>' +
          (p.sub ? '<span class="rd-word-pos-sub">' + escapeHtml(p.sub) + '</span>' : '') +
        '</div>'
      );
    }).join('');

    var mediaHtml = data.imageSrc
      ? '<img src="' + escapeAttr(data.imageSrc) + '" alt="' + escapeAttr(word) + '" loading="lazy">'
      : '<span class="ph">단어 대표 이미지</span>';

    var compareHtml = data.compares.length
      ? '<div class="rd-word-grid">' + data.compares.map(function (c) {
          return (
            '<div class="rd-word-card is-compare' + (c.active ? ' is-active' : '') + '">' +
              '<span class="rd-word-card-en">' + escapeHtml(c.en) + '</span>' +
              '<span class="rd-word-card-ko">' + escapeHtml(c.ko) + '</span>' +
            '</div>'
          );
        }).join('') + '</div>'
      : '';

    var colHtml = data.collocations.length
      ? '<div class="rd-word-section">' +
          '<h2 class="rd-word-h2">자주 쓰는 표현</h2>' +
          '<div class="rd-word-grid">' + data.collocations.map(function (c) {
            return (
              '<div class="rd-word-card">' +
                '<span class="rd-word-card-en">' + escapeHtml(c.en) + '</span>' +
                '<span class="rd-word-card-ko">' + escapeHtml(c.ko) + '</span>' +
              '</div>'
            );
          }).join('') + '</div></div>'
      : '';

    var exHtml = data.examples.length
      ? '<div class="rd-word-section">' +
          '<h2 class="rd-word-h2">예문으로 익히기</h2>' +
          data.examples.map(function (ex, i) {
            var speak = stripTags(ex.enHtml);
            return (
              '<div class="rd-word-ex">' +
                '<span class="rd-word-ex-num">' + padNum(i + 1) + '</span>' +
                '<div class="rd-word-ex-body">' +
                  '<p class="rd-word-ex-en">' + ex.enHtml + '</p>' +
                  (ex.ko ? '<p class="rd-word-ex-ko">' + escapeHtml(ex.ko) + '</p>' : '') +
                  (ex.tag ? '<span class="rd-word-ex-tag">' + escapeHtml(ex.tag) + '</span>' : '') +
                '</div>' +
                '<button type="button" class="rd-word-tts" data-rd-tts="' + escapeAttr(speak) + '" aria-label="예문 ' + (i + 1) + ' 듣기">' + SPEAKER_SVG + '</button>' +
              '</div>'
            );
          }).join('') +
        '</div>'
      : '';

    var glanceHtml = data.glance.length
      ? '<div class="rd-word-glance">' +
          '<span class="rd-word-glance-title">한눈에 보기</span>' +
          '<dl>' + data.glance.map(function (g) {
            return (
              '<div class="rd-word-glance-row">' +
                '<dt>' + escapeHtml(g.k) + '</dt>' +
                '<dd>' + escapeHtml(g.v) + '</dd>' +
              '</div>'
            );
          }).join('') + '</dl></div>'
      : '';

    var prev = options.prev;
    var next = options.next;
    var navHtml = (prev || next)
      ? '<div class="rd-word-nav">' +
          (prev
            ? '<a href="' + escapeAttr(prev.href) + '"><span class="dir">← 이전 단어</span><span class="word">' +
              escapeHtml(prev.word) + (prev.gloss ? ' <span class="gloss">' + escapeHtml(prev.gloss) + '</span>' : '') +
              '</span></a>'
            : '<span></span>') +
          (next
            ? '<a class="is-next" href="' + escapeAttr(next.href) + '"><span class="dir">다음 단어 →</span><span class="word">' +
              escapeHtml(next.word) + (next.gloss ? ' <span class="gloss">' + escapeHtml(next.gloss) + '</span>' : '') +
              '</span></a>'
            : '') +
        '</div>'
      : '';

    var recent = Array.isArray(options.recent) ? options.recent : [];
    var recentHtml = recent.length
      ? '<div class="rd-word-recent">' +
          '<div class="rd-word-recent-title">최근 단어</div>' +
          recent.map(function (r) {
            return (
              '<a href="' + escapeAttr(r.href) + '">' +
                '<span class="en">' + escapeHtml(r.word) + '</span>' +
                '<span class="ko">' + escapeHtml(r.gloss || '') + '</span>' +
              '</a>'
            );
          }).join('') +
        '</div>'
      : '';

    container.innerHTML =
      '<div class="rd-word-page">' +
        '<div class="rd-word-hero">' +
          '<nav class="rd-word-crumb" aria-label="위치">' +
            '<a href="/index.html">홈</a><span aria-hidden="true">/</span>' +
            '<a href="' + escapeAttr(listHref) + '">단어장</a><span aria-hidden="true">/</span>' +
            '<span class="is-current">' + escapeHtml(word) + '</span>' +
          '</nav>' +
          '<div class="rd-word-hero-row">' +
            '<div class="rd-word-hero-copy">' +
              '<span class="rd-word-kicker">WORD OF THE DAY · 단어장</span>' +
              '<h1 class="rd-word-title" id="post-title">' + escapeHtml(word) + '</h1>' +
              (data.ipa
                ? '<div><button type="button" class="rd-word-ipa-btn" data-rd-tts="' + escapeAttr(word) + '" aria-label="' + escapeAttr(word) + ' 발음 듣기">' +
                    SPEAKER_FULL_SVG +
                    '<span>' + escapeHtml(data.ipa) + '</span>' +
                    (data.ipaKo ? '<span class="ko">' + escapeHtml(data.ipaKo) + '</span>' : '') +
                  '</button></div>'
                : '') +
              (posHtml ? '<div class="rd-word-pos-block">' + posHtml + '</div>' : '') +
            '</div>' +
            '<div class="rd-word-hero-media">' + mediaHtml + '</div>' +
          '</div>' +
        '</div>' +
        (data.coreHtml
          ? '<div class="rd-word-core"><div class="rd-word-core-inner">' +
              '<span class="rd-word-core-label">핵심 의미</span>' +
              '<p class="rd-word-core-text">' + data.coreHtml + '</p>' +
            '</div></div>'
          : '') +
        '<div class="rd-word-body">' +
          '<div class="rd-word-main" id="post-content">' +
            '<div id="post-message" hidden></div>' +
            (data.nuanceHtml
              ? '<div class="rd-word-section">' +
                  '<h2 class="rd-word-h2">어떤 느낌의 단어일까?</h2>' +
                  '<p class="rd-word-nuance">' + data.nuanceHtml + '</p>' +
                  compareHtml +
                '</div>'
              : '') +
            colHtml +
            exHtml +
            (data.takeaway
              ? '<div class="rd-word-takeaway">' +
                  '<span class="rd-word-takeaway-label">핵심 뉘앙스 한 줄 정리</span>' +
                  '<p class="rd-word-takeaway-text">' + escapeHtml(data.takeaway) + '</p>' +
                '</div>'
              : '') +
            '<div id="rd-word-nav-host">' + navHtml + '</div>' +
          '</div>' +
          '<aside class="rd-word-side">' +
            glanceHtml +
            '<div id="rd-word-recent-host">' + recentHtml + '</div>' +
            '<a class="rd-word-yt" href="https://www.youtube.com/@istudyeng" target="_blank" rel="noopener noreferrer" aria-label="시사영단어 유튜브 채널 @istudyeng 바로가기">' +
              '<div class="rd-word-yt-play">' + YT_PLAY_SVG + '</div>' +
              '<div>' +
                '<div class="rd-word-yt-kicker">YOUTUBE</div>' +
                '<div class="rd-word-yt-title">유튜브로 학습하기</div>' +
                '<div class="rd-word-yt-handle">@istudyeng</div>' +
              '</div>' +
              '<span class="rd-word-yt-cta">채널 보러 가기 ↗</span>' +
            '</a>' +
          '</aside>' +
        '</div>' +
        renderFooter() +
      '</div>';

    bindTts(container);
  }

  function fillNavAndRecent(container, post, cfg, entries) {
    if (!cfg || !entries || !entries.length) return;
    var newest = entries.slice().reverse();
    var idx = -1;
    for (var i = 0; i < newest.length; i += 1) {
      if (newest[i] && newest[i]._id === post._id) { idx = i; break; }
    }
    var prevEntry = idx > 0 ? newest[idx - 1] : null;
    var nextEntry = idx >= 0 && idx < newest.length - 1 ? newest[idx + 1] : null;

    function toLink(entry) {
      if (!entry) return null;
      var m = mapNavEntry(entry);
      m.href = entryHref(entry, cfg);
      return m;
    }

    var prev = toLink(prevEntry);
    var next = toLink(nextEntry);
    var navHost = container.querySelector('#rd-word-nav-host');
    if (navHost) {
      navHost.innerHTML = (prev || next)
        ? '<div class="rd-word-nav">' +
            (prev
              ? '<a href="' + escapeAttr(prev.href) + '"><span class="dir">← 이전 단어</span><span class="word">' +
                escapeHtml(prev.word) + (prev.gloss ? ' <span class="gloss">' + escapeHtml(prev.gloss) + '</span>' : '') +
                '</span></a>'
              : '<span></span>') +
            (next
              ? '<a class="is-next" href="' + escapeAttr(next.href) + '"><span class="dir">다음 단어 →</span><span class="word">' +
                escapeHtml(next.word) + (next.gloss ? ' <span class="gloss">' + escapeHtml(next.gloss) + '</span>' : '') +
                '</span></a>'
              : '') +
          '</div>'
        : '';
    }

    var recent = newest
      .filter(function (e) { return e && e._id !== post._id; })
      .slice(0, 4)
      .map(function (e) {
        var m = mapNavEntry(e);
        m.href = entryHref(e, cfg);
        return m;
      });
    var recentHost = container.querySelector('#rd-word-recent-host');
    if (recentHost && recent.length) {
      recentHost.innerHTML =
        '<div class="rd-word-recent">' +
          '<div class="rd-word-recent-title">최근 단어</div>' +
          recent.map(function (r) {
            return (
              '<a href="' + escapeAttr(r.href) + '">' +
                '<span class="en">' + escapeHtml(r.word) + '</span>' +
                '<span class="ko">' + escapeHtml(r.gloss || '') + '</span>' +
              '</a>'
            );
          }).join('') +
        '</div>';
    }
  }

  async function mountRedesignWord(container, post, options) {
    options = options || {};
    var cfg = global.BoardListConfig && global.BoardListConfig.get(options.boardKey || 'word-of-the-day');
    if (!cfg || cfg.articleLayout !== 'word-detail') return false;
    if (!container || !post) return false;

    var html = post.message || options.convertedMessage || '';
    var data = parseWordPayload(html);
    if (!data.capable) return false;

    ensureCss();
    document.body.classList.add('rd-word');
    document.body.classList.remove('rd-article', 'rd-article--header-only', 'rd-article-like-hidden');

    renderWordPage(container, post, data, options);
    markReady();

    ensureScript('site-masthead.js?v=' + ASSET_VER).then(function () {
      if (global.SiteMasthead && typeof global.SiteMasthead.mount === 'function') {
        try { global.SiteMasthead.mount(); } catch (e) { /* ignore */ }
      }
    });

    if (options.apiBaseUrl && cfg.apiPath) {
      fetch(options.apiBaseUrl + cfg.apiPath, { cache: 'no-store' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (payload) {
          if (!payload) return;
          var entries = Array.isArray(payload) ? payload : (payload.entries || []);
          fillNavAndRecent(container, post, cfg, entries);
        })
        .catch(function () { /* ignore */ });
    }

    return true;
  }

  global.mountRedesignWord = mountRedesignWord;
  global.parseWotdWordPayload = parseWordPayload;
})(typeof window !== 'undefined' ? window : globalThis);
