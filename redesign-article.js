/**
 * 상세 페이지 시안 렌더러 — design/redesign-article.html
 * 사용: renderRedesignArticle(container, post, { boardKey, related, prev, next, convertedMessage })
 */
(function (global) {
  'use strict';

  var ASSET_VER = '20261020rd28';

  /** 캐시된 구버전 JS가 그려도 QUICK REVIEW 즉시 제거 */
  function stripQuickReview() {
    try {
      document.querySelectorAll('.rd-review').forEach(function (el) { el.remove(); });
      document.querySelectorAll('a').forEach(function (a) {
        if (String(a.textContent || '').replace(/\s+/g, ' ').trim() !== '복습 퀴즈 풀기') return;
        var box = a.parentElement;
        while (box && box !== document.body) {
          var t = String(box.textContent || '');
          if (/QUICK REVIEW|방금 읽은 표현/.test(t)) {
            box.remove();
            return;
          }
          box = box.parentElement;
        }
      });
    } catch (e) { /* ignore */ }
  }

  function markArticleReady() {
    try {
      stripQuickReview();
      document.documentElement.classList.add('rd-ready');
      document.body.classList.add('rd-ready');
    } catch (e) { /* ignore */ }
  }

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
      var file = href.split('?')[0];
      /* preload 링크만 있으면 stylesheet 가 안 붙음 → rel=stylesheet 만 검사 */
      if (document.querySelector('link[rel="stylesheet"][href*="' + file + '"]')) return;
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + href;
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

  /** Word of the Day 등 — 본문 히어로 이미지 */
  function extractHeroImage(html) {
    var msg = String(html || '');
    var m = msg.match(/<img[^>]+class=["'][^"']*wotd-hero-image[^"']*["'][^>]+src=["']([^"']+)["']/i) ||
      msg.match(/<img[^>]+src=["']([^"']+)["'][^>]+class=["'][^"']*wotd-hero-image[^"']*["']/i) ||
      msg.match(/<img[^>]+src=["'](\/resources\/[^"']+\.(?:jpg|jpeg|png|webp))["']/i);
    return m ? m[1] : '';
  }

  function extractSourceLink(html) {
    var m = String(html || '').match(
      /class=["'][^"']*nv-related-link--article[^"']*["'][^>]*href=["']([^"']+)["']/i
    ) || String(html || '').match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?신문\s*보기/i) ||
      String(html || '').match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?신문보기/i);
    return m ? m[1] : '';
  }

  function extractSummary(post, root) {
    if (post && post.summary) return String(post.summary).trim();
    if (post && post.metaDescription) return String(post.metaDescription).trim();
    if (!root) return '';
    var lead = root.querySelector('.nv-lead-text, .nv-lead p');
    if (lead) return stripHtml(lead.innerHTML);
    var headings = root.querySelectorAll('h2');
    for (var i = 0; i < headings.length; i += 1) {
      if (!/한\s*줄\s*요약/.test(headings[i].textContent || '')) continue;
      var next = headings[i].nextElementSibling;
      while (next && next.tagName !== 'P' && next.tagName !== 'H2' && next.tagName !== 'H3') {
        next = next.nextElementSibling;
      }
      if (next && next.tagName === 'P') {
        var t = stripHtml(next.innerHTML);
        if (t) return t.length > 200 ? t.slice(0, 197) + '…' : t;
      }
    }
    return '';
  }

  /** mark 없을 때 본문 괄호 영어 추출. THAAD 같은 짧은 대문자 약어는 제외 */
  function extractParenEnglish(koText) {
    var text = String(koText || '');
    var out = [];
    var seen = {};
    var re = /\(([A-Za-z][A-Za-z0-9'/.\s-]{0,80})\)/g;
    var m;
    while ((m = re.exec(text))) {
      var w = m[1].replace(/\s+/g, ' ').trim();
      if (!w) continue;
      if (/^[A-Z0-9]{2,6}$/.test(w)) continue; /* THAAD, WSJ 등 */
      var k = w.toLowerCase();
      if (seen[k]) continue;
      seen[k] = true;
      out.push(w);
    }
    return out;
  }

  /** narrative 본문에서 뜻 추출: 한글(표현) 우선, 단일 표현이면 cf. … */
  function extractNarrativeMeaning(koText, wordEn) {
    var text = String(koText || '').trim();
    var word = String(wordEn || '').trim();
    if (!text || !word) return '';
    var esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    var re = new RegExp('([가-힣0-9A-Za-z·\\s]{1,40}?)\\(\\s*' + esc + '\\s*\\)', 'i');
    var m = text.match(re);
    if (m) {
      var ko = m[1].replace(/^[\d.]+\s*/, '').replace(/\s+/g, ' ').trim();
      if (ko && ko.toLowerCase() !== word.toLowerCase()) return ko;
    }
    var parenCount = (text.match(/\(/g) || []).length;
    var cf = text.match(/\bcf\.\s*(.+)$/i);
    if (cf && parenCount <= 1) {
      var cfMeaning = cf[1].replace(/\s+/g, ' ').trim();
      if (cfMeaning && cfMeaning.toLowerCase() !== word.toLowerCase()) return cfMeaning;
    }
    return '';
  }

  /** 오피니언형: h3(단어 : 뜻) + p(영문 / 해석: 한글) */
  function parseHeadingCards(root) {
    var cards = [];
    if (!root) return cards;
    var headings = root.querySelectorAll('h3');
    headings.forEach(function (h3) {
      var strong = h3.querySelector('strong');
      var expression = strong ? stripHtml(strong.innerHTML).trim() : '';
      var headText = stripHtml(h3.innerHTML).replace(/\s+/g, ' ').trim();
      if (!expression) {
        var bare = headText.replace(/^[0-9]+[.)]\s*/, '').replace(/^[^\w]*\s*/, '');
        var mWord = bare.match(/^([A-Za-z][A-Za-z0-9'\/.\s-]{0,60}?)(?:\s*\/|\s*\(|\s*:)/);
        if (mWord) expression = mWord[1].replace(/\s+/g, ' ').trim();
      }
      if (!expression) return;

      var meaning = '';
      var colon = headText.lastIndexOf(':');
      if (colon >= 0) {
        meaning = headText.slice(colon + 1).replace(/\s+/g, ' ').trim();
      }

      var p = h3.nextElementSibling;
      while (p && p.tagName !== 'P' && p.tagName !== 'H3' && p.tagName !== 'H2') {
        p = p.nextElementSibling;
      }
      var enHtml = '';
      var ko = '';
      if (p && p.tagName === 'P') {
        var html = p.innerHTML || '';
        var split = html.split(/<br\s*\/?>\s*해석\s*:/i);
        var enPart = split[0] || '';
        var koPart = split.length > 1 ? split.slice(1).join(' ') : '';
        if (split.length < 2) {
          var plain = stripHtml(html);
          var idx = plain.indexOf('해석:');
          if (idx >= 0) {
            enPart = plain.slice(0, idx);
            koPart = plain.slice(idx + 3);
          }
        }
        var enPlain = stripHtml(enPart).replace(/\s+/g, ' ').trim();
        enHtml = enPlain ? highlightPhrase(enPlain, expression) : '';
        ko = stripHtml(koPart).replace(/^해석\s*:\s*/i, '').replace(/\s+/g, ' ').trim();
      }

      if (!enHtml && !ko && !meaning) return;
      cards.push({
        expression: expression,
        meaning: meaning,
        moreExprs: [],
        enHtml: enHtml,
        ko: ko
      });
    });
    return cards;
  }

  function parseCards(root) {
    var cards = [];
    if (!root) return cards;
    var sections = root.querySelectorAll('.nv-word-section');
    sections.forEach(function (sec) {
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
      var enEl = sec.querySelector('.nv-en, .nv-phrase-en');
      var titleEl = sec.querySelector('.nv-section-title');
      var koEl = sec.querySelector('.nv-ko, .nv-phrase-ko');
      if (enEl) wordEn = stripHtml(enEl.innerHTML);
      /* 섹션 제목(1. 불어넣다…)은 표현이 아니라 한글 묶음 — 번호는 카드 01과 중복되므로 제거 */
      var titleText = titleEl ? stripLeadingListNum(stripHtml(titleEl.innerHTML)) : '';
      if (!wordEn && titleText) wordEn = titleText;
      if (koEl) wordKo = stripHtml(koEl.innerHTML);

      var meaningEl = sec.querySelector('.nv-meaning-text');
      var meaning = meaningEl ? stripHtml(meaningEl.innerHTML) : (wordKo || '');
      if (!meaning && titleText && wordEn && titleText !== wordEn) meaning = titleText;

      var enEx = sec.querySelector('.nv-ex-en');
      var koEx = sec.querySelector('.nv-ex-ko, .nv-narrative-def, .nv-narrative-text');
      var enHtml = '';
      var koText = '';
      var isNarrative = !!(sec.classList && sec.classList.contains('nv-narrative')) ||
        !!sec.querySelector('.nv-narrative-text, .nv-narrative-def');

      if (enEx) {
        enHtml = enEx.innerHTML;
      }
      /* narrative-only: 표현은 rd-expr-word(01 staggered)에만 두고
         mark를 다시 enHtml로 만들면 staggered 가 두 번 보임 → 생략 */

      if (koEx) koText = stripHtml(koEx.innerHTML);
      else if (sec.querySelector('.nv-narrative-text')) {
        koText = stripHtml(sec.querySelector('.nv-narrative-text').innerHTML);
      }

      /* mark 없으면 은밀한(covert) 형태에서 영어 복구 — '표현' 폴백 방지 */
      if (isNarrative && !wordEn && !unique.length) {
        unique = extractParenEnglish(koText);
      }

      /* 섹션당 카드 1개 — 여러 mark 를 쪼개면 같은 문장이 반복됨 */
      if (!wordEn && unique.length) wordEn = unique[0];
      var moreExprs = unique.length > 1 ? unique.slice(1) : [];
      if (postMeaningHidden(meaning, wordEn)) meaning = wordKo || '';
      if (isNarrative && !meaning && unique.length === 1) {
        meaning = extractNarrativeMeaning(koText, wordEn);
      }

      // Prefer highlighting expression inside English if we have raw English without marks
      if (enEx && wordEn && enHtml.indexOf('<mark') === -1) {
        enHtml = highlightPhrase(enHtml, wordEn);
      }

      /* 단어 없는 narrative 섹션은 카드로 만들지 않음 (가짜 '표현' 금지) */
      if (!wordEn) {
        if (!isNarrative && (koText || enHtml)) {
          cards.push({
            expression: '표현',
            meaning: meaning,
            enHtml: enHtml,
            ko: koText
          });
        }
        return;
      }
      cards.push({
        expression: wordEn,
        meaning: meaning,
        moreExprs: moreExprs,
        enHtml: enHtml,
        ko: koText
      });
    });

    if (!cards.length) {
      cards = parseHeadingCards(root);
    }

    return cards.map(function (card, i) {
      return {
        id: 'rd-expr-' + (i + 1),
        num: padNum(i + 1),
        expression: stripLeadingListNum(card.expression),
        meaning: card.meaning,
        moreExprs: card.moreExprs || [],
        enHtml: card.enHtml,
        ko: card.ko
      };
    });
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

  /** narrative 카드: 본문 앞 번호(1. ) 제거 — 헤더 01 과 중복 방지 */
  function stripLeadingListNum(text) {
    return String(text || '').replace(/^\s*\d+\s*[.)]\s*/, '').trim();
  }

  function wantsExpressionCards(cfg) {
    return !!(cfg && (cfg.articleLayout === 'expression-cards' || cfg.articleLayout === 'auto'));
  }

  function cardsHaveContent(cards) {
    if (!cards || !cards.length) return false;
    for (var i = 0; i < cards.length; i += 1) {
      var c = cards[i];
      if (!c || !c.expression || c.expression === '표현') return false;
      if (!c.ko && !c.enHtml && !c.meaning) return false;
    }
    return true;
  }

  /** staggered형: nv-narrative — 뜻은 옆이 아니라 문장/cf. */
  function isNarrativeCardCapable(parser, cards) {
    if (!parser || !cardsHaveContent(cards)) return false;
    return !!parser.querySelector(
      '.nv-word-section.nv-narrative, .nv-narrative-text, .nv-narrative-def'
    );
  }

  /** auto: narrative 또는 오피니언 h3 카드 구조 */
  function isExpressionCardCapable(parser, cards) {
    if (!cardsHaveContent(cards)) return false;
    if (isNarrativeCardCapable(parser, cards)) return true;
    return !!parser.querySelector('h3 strong, h3');
  }

  function renderCardHtml(card, opts) {
    opts = opts || {};
    var showMeaning = !opts.hideMeaning && card.meaning;
    var ko = card.ko || '';
    if (opts.stripKoNum && ko) ko = stripLeadingListNum(ko);
    var more = Array.isArray(card.moreExprs) ? card.moreExprs.filter(Boolean) : [];
    var moreHtml = more.length
      ? '<p class="rd-expr-more">' + more.map(function (w) {
          return '<span>' + escapeHtml(w) + '</span>';
        }).join('') + '</p>'
      : '';
    return (
      '<article class="rd-expr" id="' + escapeAttr(card.id) + '">' +
        '<div class="rd-expr-top">' +
          '<span class="rd-expr-num">' + escapeHtml(card.num) + '</span>' +
          '<span class="rd-expr-word">' + escapeHtml(card.expression) + '</span>' +
          (showMeaning ? '<span class="rd-expr-meaning">' + escapeHtml(card.meaning) + '</span>' : '') +
        '</div>' +
        moreHtml +
        (card.enHtml ? '<p class="rd-expr-en">' + card.enHtml + '</p>' : '') +
        (ko ? '<p class="rd-expr-ko">' + escapeHtml(ko) + '</p>' : '') +
      '</article>'
    );
  }

  function renderRedesignArticle(container, post, options) {
    if (!container || !post) return false;
    options = options || {};
    var Config = global.BoardListConfig;
    var cfg = Config && Config.get(options.boardKey);
    /* expression-cards / auto 만 카드형 — classic·header-only 는 기존 본문 */
    if (!wantsExpressionCards(cfg)) return false;

    var html = options.convertedMessage != null ? options.convertedMessage : (post.message || '');
    var parser = document.createElement('div');
    parser.innerHTML = html;

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

    /* auto: 카드 파싱 가능한 구조만 redesign, 아니면 classic */
    if (cfg.articleLayout === 'auto' && !isExpressionCardCapable(parser, cards)) return false;
    if (cfg.articleLayout === 'expression-cards' && !cards.length) return false;

    ensureCss();
    document.body.classList.add('rd-article', 'rd-article-like-hidden');

    var title = Config ? Config.cleanTitle(post) : String(post.title || '제목 없음');
    var source = resolveSource(post, cfg);
    var date = formatDate(post.date);
    var summary = extractSummary(post, parser);
    var yt = extractYoutube(html);
    var heroImg = !yt ? extractHeroImage(html) : '';
    var sourceUrl = extractSourceLink(html) || (post.sourceUrl || '');
    var narrativeMode = isNarrativeCardCapable(parser, cards);

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
    } else if (heroImg) {
      ytBlock =
        '<div class="rd-yt rd-yt--photo">' +
          '<img src="' + escapeAttr(heroImg) + '" alt="">' +
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
            (cards.length
              ? cards.map(function (c) {
                  return renderCardHtml(c, {
                    /* narrative: 01 staggered + 문장만 (뜻은 옆이 아니라 cf./문장 안) */
                    hideMeaning: narrativeMode,
                    stripKoNum: narrativeMode
                  });
                }).join('')
              : '<div class="rd-article-fallback">' + html + '</div>') +
          '</div>' +
          actions +
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

    markArticleReady();
    stripQuickReview();
    setTimeout(stripQuickReview, 0);
    setTimeout(stripQuickReview, 300);
    setTimeout(stripQuickReview, 1000);
    return true;
  }

  /**
   * Apply shell tokens/masthead page class for header-only boards
   */
  function applyRedesignChrome(boardKey) {
    document.body.classList.add('rd-article', 'rd-article--header-only');
    if (boardKey) document.body.setAttribute('data-rd-board', boardKey);
  }

  /**
   * Fetch related + render. Returns true if redesign applied.
   */
  function mapRelatedEntries(entries, post, cfg) {
    var newest = (entries || []).slice().reverse();
    return newest
      .filter(function (e) { return e && e._id !== post._id; })
      .slice(0, 3)
      .map(function (e) {
        var slug = String(e.slug || '').trim();
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

  function fillRelatedSidebar(related) {
    if (!related || !related.length) return;
    var host = document.querySelector('.rd-article-side');
    if (!host) return;
    var html = related.slice(0, 3).map(function (r) {
      var thumb = r.thumb
        ? '<div class="rd-side-related-img"><img src="' + escapeAttr(r.thumb) + '" alt=""></div>'
        : '<div class="rd-side-related-img"></div>';
      return '<a href="' + escapeAttr(r.href) + '">' + thumb +
        '<span class="rd-side-related-title">' + escapeHtml(r.title) + '</span></a>';
    }).join('');
    var existing = host.querySelector('.rd-side-related');
    if (existing) {
      existing.innerHTML = html;
      return;
    }
    var tocBlock = host.querySelector('.rd-side-toc');
    var block = document.createElement('div');
    block.className = 'rd-side-block';
    block.innerHTML = '<h2>함께 읽기</h2><div class="rd-side-related">' + html + '</div>';
    if (tocBlock && tocBlock.parentElement) {
      tocBlock.parentElement.insertAdjacentElement('afterend', block);
    } else {
      var ad = host.querySelector('#rd-ad-host');
      if (ad && ad.parentElement) host.insertBefore(block, ad.parentElement);
      else host.appendChild(block);
    }
  }

  async function mountRedesignArticle(container, post, options) {
    options = options || {};
    var cfg = global.BoardListConfig && global.BoardListConfig.get(options.boardKey);
    /* classic: 기존 본문/헤더 유지 (카드형 redesign·chrome 모두 생략) */
    if (cfg && cfg.articleLayout === 'classic') {
      markArticleReady();
      return false;
    }
    /* header-only 등: 크롬만 */
    if (!wantsExpressionCards(cfg)) {
      applyRedesignChrome(options.boardKey);
      markArticleReady();
      return false;
    }
    var related = options.related || [];
    /* 관련글 API는 렌더를 막지 않음 — FOUC/대기 시간 줄이기 */
    var ok = !!renderRedesignArticle(container, post, {
      boardKey: options.boardKey,
      convertedMessage: options.convertedMessage,
      related: related,
      prev: options.prev,
      next: options.next
    });
    if (ok && !related.length && options.apiBaseUrl && cfg && cfg.apiPath) {
      fetch(options.apiBaseUrl + cfg.apiPath, { cache: 'no-store' })
        .then(function (res) { return res.ok ? res.json() : null; })
        .then(function (data) {
          if (!data) return;
          var entries = Array.isArray(data) ? data : (data.entries || []);
          fillRelatedSidebar(mapRelatedEntries(entries, post, cfg));
        })
        .catch(function () { /* ignore */ });
    }
    if (!ok) markArticleReady();
    return ok;
  }

  global.renderRedesignArticle = renderRedesignArticle;
  global.mountRedesignArticle = mountRedesignArticle;
  global.applyRedesignChrome = applyRedesignChrome;
  global.markArticleReady = markArticleReady;
})(typeof window !== 'undefined' ? window : globalThis);
