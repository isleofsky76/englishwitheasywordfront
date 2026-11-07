/**
 * 상세 페이지 시안 렌더러 — design/redesign-article.html
 * 사용: renderRedesignArticle(container, post, { boardKey, related, prev, next, convertedMessage })
 */
(function (global) {
  'use strict';

  var ASSET_VER = '20261107syn5';
  var SYN_SAVED_KEY = 'ees-synonym-saved-v1';
  /* v2: 기본값을 뜻 가리기로 재설정 (이전 localStorage=0 무시) */
  var SYN_HIDE_KEY = 'ees-synonym-hide-meaning-v2';

  /** SEO 경로 /board/slug/ 에서 list.html 상대링크가 깨지지 않게 */
  function seoPathPrefix() {
    try {
      var parts = String(window.location.pathname || '')
        .replace(/\\/g, '/')
        .split('/')
        .filter(Boolean);
      if (parts.length && /index\.html$/i.test(parts[parts.length - 1])) parts.pop();
      if (parts.length >= 2 && !/\.html?$/i.test(parts[parts.length - 1])) {
        return '../'.repeat(parts.length);
      }
    } catch (e) { /* ignore */ }
    return '';
  }

  function siteHref(href) {
    var h = String(href || '').trim();
    if (!h) return h;
    if (/^(https?:|mailto:|tel:|#|\/)/i.test(h)) return h;
    if (/^\.\.\//.test(h)) return h;
    return seoPathPrefix() + h.replace(/^\.\//, '');
  }

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
      if (/redesign-article\.js|news-voca\.js|korea-news\.js|defense-news\.js|economy-news\.js|travel-news\.js/.test(src)) {
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

  function extractSourceFull(html) {
    var msg = String(html || '');
    var m = msg.match(/class=["'][^"']*nv-source-text[^"']*["'][^>]*>([\s\S]*?)<\/p>/i) ||
      msg.match(/<p class="nv-source-text">([\s\S]*?)<\/p>/i);
    if (!m) return '';
    return stripHtml(m[1]);
  }

  function shortSourceLabel(full) {
    var t = String(full || '').trim();
    if (!t) return '';
    var parts = t.split(/\s*[|｜]\s*/).map(function (s) { return s.trim(); }).filter(Boolean);
    return parts[0] || t;
  }

  function resolveSource(post, cfg, html) {
    if (post && post.source) return String(post.source).trim();
    var fromHtml = shortSourceLabel(extractSourceFull(html));
    if (fromHtml) return fromHtml;
    if (global.BoardListConfig) return global.BoardListConfig.resolveSource(post);
    return '';
  }

  function extractYoutube(html) {
    var msg = String(html || '');
    var m = msg.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtu\.be\/([a-zA-Z0-9_-]+)/i) ||
      msg.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/i) ||
      msg.match(/(?:img\.youtube|i\.ytimg)\.com\/vi\/([a-zA-Z0-9_-]+)\//i);
    if (!m) return null;
    var id = m[1];
    return {
      id: id,
      watch: 'https://www.youtube.com/watch?v=' + id,
      embed: 'https://www.youtube.com/embed/' + id + '?rel=0&enablejsapi=1&playsinline=1',
      thumb: 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg'
    };
  }

  function trackVideoStart(videoId) {
    var id = String(videoId || '').trim();
    if (!id) return;
    try {
      if (typeof global.gtag === 'function') {
        global.gtag('event', 'video_start', {
          video_id: id,
          video_provider: 'youtube'
        });
      }
    } catch (e) { /* ignore */ }
  }

  function bindLazyYoutube(container) {
    if (!container) return;
    var hosts = container.querySelectorAll('.rd-yt--lazy[data-yt-id]');
    if (!hosts.length) return;

    function onYtMessage(ev) {
      var origin = String(ev && ev.origin || '');
      if (origin.indexOf('youtube.com') === -1) return;
      var data = ev.data;
      if (typeof data === 'string') {
        try { data = JSON.parse(data); } catch (err) { return; }
      }
      if (!data || typeof data !== 'object') return;
      var playing = data.event === 'video-started' ||
        (data.event === 'onStateChange' && Number(data.info) === 1);
      if (!playing) return;
      var frames = document.querySelectorAll('iframe[data-yt-id]');
      for (var i = 0; i < frames.length; i += 1) {
        if (frames[i].contentWindow === ev.source) {
          var vid = frames[i].getAttribute('data-yt-id');
          if (frames[i].getAttribute('data-yt-started') === '1') return;
          frames[i].setAttribute('data-yt-started', '1');
          trackVideoStart(vid);
          return;
        }
      }
    }
    if (!global.__rdYtMsgBound) {
      global.__rdYtMsgBound = true;
      global.addEventListener('message', onYtMessage);
    }

    hosts.forEach(function (host) {
      if (host.getAttribute('data-yt-bound') === '1') return;
      host.setAttribute('data-yt-bound', '1');
      var btn = host.querySelector('[data-yt-play]');
      if (!btn) return;
      btn.addEventListener('click', function () {
        var id = host.getAttribute('data-yt-id') || '';
        var embed = host.getAttribute('data-yt-embed') || '';
        if (!embed) return;
        var playUrl = embed + (embed.indexOf('?') >= 0 ? '&' : '?') + 'autoplay=1';
        host.innerHTML =
          '<iframe src="' + escapeAttr(playUrl) + '"' +
            ' data-yt-id="' + escapeAttr(id) + '"' +
            ' title="YouTube video"' +
            ' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"' +
            ' allowfullscreen loading="lazy"></iframe>';
        /* 재생 시작(클릭→autoplay) 시 GA4 */
        trackVideoStart(id);
        var frame = host.querySelector('iframe');
        if (frame) frame.setAttribute('data-yt-started', '1');
      });
    });
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
    var msg = String(html || '');
    var m = msg.match(/class=["'][^"']*nv-source-link[^"']*["'][^>]*href=["']([^"']+)["']/i) ||
      msg.match(/href=["']([^"']+)["'][^>]*class=["'][^"']*nv-source-link[^"']*["']/i) ||
      msg.match(/class=["'][^"']*nv-related-link--article[^"']*["'][^>]*href=["']([^"']+)["']/i) ||
      msg.match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?원문\s*기사\s*보기/i) ||
      msg.match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?신문\s*보기/i) ||
      msg.match(/href=["'](https?:\/\/[^"']+)["'][^>]*>[\s\S]*?신문보기/i);
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

  /** "folly: 어리석음" → "어리석음" — 표제어와 뜻 앞 영어 중복 제거 */
  function stripLeadingWordFromMeaning(meaning, wordEn) {
    var gloss = String(meaning || '').replace(/\s+/g, ' ').trim();
    var word = String(wordEn || '').trim();
    if (!gloss) return '';
    if (word) {
      var esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      gloss = gloss
        .replace(new RegExp('^cf\\.\\s*', 'i'), '')
        .replace(new RegExp('^' + esc + '\\s*[:：\\-–—]\\s*', 'i'), '')
        .replace(new RegExp('^' + esc + '\\s+', 'i'), '')
        .trim();
    } else {
      gloss = gloss.replace(/^cf\.\s*/i, '').trim();
      var colon = gloss.search(/[:：]/);
      if (colon > 0 && colon < 48 && /^[A-Za-z]/.test(gloss)) {
        gloss = gloss.slice(colon + 1).trim();
      }
    }
    if (!gloss || (word && gloss.toLowerCase() === word.toLowerCase())) return '';
    return gloss;
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
      var cfMeaning = stripLeadingWordFromMeaning(cf[1], word);
      if (cfMeaning) return cfMeaning;
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

  /** 한글 줄이 영어 예문 복제이거나 한글이 없으면 빈 칸 */
  function sanitizeNarrativeKo(koText, enHtml) {
    var ko = String(koText || '').replace(/\s+/g, ' ').trim();
    if (!ko) return '';
    if (!/[가-힣]/.test(ko)) return '';
    var enPlain = stripHtml(enHtml).replace(/\s+/g, ' ').trim().toLowerCase();
    if (enPlain && ko.toLowerCase() === enPlain) return '';
    return ko;
  }

  /** 깨진 `(ipa` + `한글)` → 한 줄 `(ipa / 한글)🔊` */
  function mergeBrokenSynonymPron(enHtml, koClosing) {
    var en = stripAllTtsButtons(enHtml || '');
    var ko = String(koClosing || '').replace(/\s+/g, ' ').trim();
    if (!en || !ko) return '';
    if (!/[가-힣]/.test(ko) || !/\)\s*$/.test(ko)) return '';
    var plain = stripHtml(en).replace(/\s+/g, ' ').trim().replace(/🔊/g, '').trim();
    if (!/\([^)]*$/.test(plain) || /\)/.test(plain)) return '';
    var hangul = ko.replace(/\)\s*$/, '').trim();
    var ipa = plain.match(/\(([^)]*)$/);
    var ipaPart = ipa ? ipa[1].replace(/\s*\/\s*$/, '').trim() : '';
    var markMatch = en.match(/<mark\b[^>]*>[\s\S]*?<\/mark>/i);
    var markHtml = markMatch ? markMatch[0] : '';
    if (!ipaPart) return '';
    return (
      (markHtml || '') +
      '<span class="rd-expr-pron">(' +
      escapeHtml(ipaPart) +
      ' / ' +
      escapeHtml(hangul) +
      ')</span>'
    );
  }

  /**
   * 연관단어 본문: 영어 (ipa / 한글) 🔊 — 표제어는 헤더에만, 줄바꿈 없이
   */
  function stripAllTtsButtons(html) {
    return String(html || '').replace(/<button\b[^>]*class=["'][^"']*vv-tts-btn[^"']*["'][^>]*>[\s\S]*?<\/button>/gi, '');
  }

  function synonymPronLineHtml(enHtml, wordEn) {
    var html = stripAllTtsButtons(enHtml || '');
    if (!html) return '';
    var plain = stripHtml(html).replace(/\s+/g, ' ').trim().replace(/🔊/g, '').trim();
    var pron = '';
    var m = plain.match(/\(([^)]+)\)\s*$/);
    if (m) {
      pron = m[1].trim();
    } else if (/\([^)]*$/.test(plain)) {
      return html;
    }
    /* 뉴스 예문(단어 5개+)은 끝에 (word)가 있어도 발음줄로 접지 않음 */
    if (plain.split(/\s+/).length > 4) return stripAllTtsButtons(enHtml || '');
    if (!pron) return html;
    /* 연관단어 짧은 줄: 표제어는 헤더, 본문은 발음만 — 스피커는 렌더 시 1개만 붙임 */
    void wordEn;
    return '<span class="rd-expr-pron">(' + escapeHtml(pron) + ')</span>';
  }

  /**
   * "영어 / 한글 cf. word: 뜻" 한 줄 → { enHtml, ko, cf }
   * 슬래시+cf. 포맷만 분리. 한글 번역은 선택(없으면 빈 칸).
   */
  function splitNarrativeEnKoCfHtml(html) {
    var raw = String(html || '').trim();
    if (!raw) return null;
    var plain = stripHtml(raw).replace(/\s+/g, ' ').trim();
    if (!/\bcf\./i.test(plain)) return null;

    var enHtml = '';
    var ko = '';
    var cf = '';
    var slashIdx = raw.search(/\s\/\s/);
    if (slashIdx >= 0) {
      enHtml = raw.slice(0, slashIdx).trim().replace(/^\d+\.\s*/, '');
      var restHtml = raw.slice(slashIdx).replace(/^\s\/\s*/, '').trim();
      var restPlain = stripHtml(restHtml).replace(/\s+/g, ' ').trim();
      var cfAt = restPlain.search(/\s+cf\.\s+/i);
      if (cfAt >= 0) {
        ko = restPlain.slice(0, cfAt).trim();
        cf = restPlain.slice(cfAt).replace(/^\s+/, '').trim();
      } else {
        var cfStart = restPlain.match(/^(.*?)(\bcf\.\s+.+)$/i);
        if (!cfStart) return null;
        ko = cfStart[1].trim();
        cf = cfStart[2].trim();
      }
    } else {
      /* "영어 cf. word: 뜻" — 한글 번역 없음 */
      var cfOnly = plain.match(/^(.*?)(\bcf\.\s+.+)$/i);
      if (!cfOnly) return null;
      var head = cfOnly[1].replace(/^\d+\.\s*/, '').trim();
      cf = cfOnly[2].trim();
      if (/[가-힣]/.test(head) && !/[A-Za-z]{3,}/.test(head)) ko = head;
      else enHtml = head;
      /* raw HTML에서 영어 부분만 보존(마크 유지) */
      if (enHtml) {
        var cfHtmlAt = raw.search(/\s+cf\.\s+/i);
        if (cfHtmlAt >= 0) {
          enHtml = raw.slice(0, cfHtmlAt).trim().replace(/^\d+\.\s*/, '');
        }
      }
    }
    ko = sanitizeNarrativeKo(ko, enHtml);
    if (!enHtml || !cf) return null;
    return { enHtml: enHtml, ko: ko, cf: cf };
  }

  /**
   * 구형 내러티브 꼬리 "(word)" / "(<mark>word</mark>)" —
   * 카드 제목·본문 하이라이트와 겹치므로 영어 줄 끝에서만 제거
   */
  function stripTrailingExprTag(html, expression) {
    var s = String(html || '').trim();
    if (!s) return s;
    var word = String(expression || '').trim();
    if (word) {
      var esc = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
      var reWord = new RegExp(
        '\\s*\\(\\s*(?:<mark[^>]*>\\s*)?' + esc + '(?:\\s*<\\/mark>)?\\s*\\)\\s*$',
        'i'
      );
      var next = s.replace(reWord, '').trim();
      if (next !== s) return next;
    }
    /* 표현을 아직 모를 때: 끝의 짧은 (영어표기) 꼬리만 제거 */
    return s.replace(
      /\s*\(\s*(?:<mark[^>]*>\s*)?[A-Za-z][A-Za-z0-9'’.\-]*(?:\s+[A-Za-z][A-Za-z0-9'’.\-]*){0,3}(?:\s*<\/mark>)?\s*\)\s*$/,
      ''
    ).trim();
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
      if (koEl) wordKo = stripHtml(koEl.innerHTML);

      var meaningEl = sec.querySelector('.nv-meaning-text');
      var meaning = meaningEl ? stripHtml(meaningEl.innerHTML) : (wordKo || '');

      var enEx = sec.querySelector('.nv-ex-en, .nv-narrative-quote');
      var koEx = sec.querySelector('.nv-ex-ko');
      var glossLine = sec.querySelector('.nv-narrative-gloss');
      var cfEx = sec.querySelector('.nv-narrative-def');
      var enHtml = '';
      var koText = '';
      var cfText = '';
      var isNarrative = !!(sec.classList && sec.classList.contains('nv-narrative')) ||
        !!sec.querySelector('.nv-narrative-text, .nv-narrative-def');

      if (enEx) {
        enHtml = enEx.innerHTML;
      } else if (glossLine && !koEx) {
        /* 연관단어 한 줄: <mark>word</mark>(ipa / 한글)🔊 */
        enHtml = glossLine.innerHTML;
      }
      /* narrative-only: 표현은 rd-expr-word(01 staggered)에만 두고
         mark를 다시 enHtml로 만들면 staggered 가 두 번 보임 → 생략 */

      if (koEx) koText = stripHtml(koEx.innerHTML);
      if (cfEx) cfText = stripHtml(cfEx.innerHTML);
      var narrTextEl = sec.querySelector('.nv-narrative-text');
      if (!koText && !enHtml && narrTextEl && narrTextEl !== cfEx) {
        /* 구형 한 줄 포맷 폴백 — cf와 같은 노드면 중복 방지 */
        koText = stripHtml(narrTextEl.innerHTML);
      }
      /* 깨진 발음 줄 복구: ...(ipa   +   한글) */
      if (isNarrative && enHtml && koText) {
        var mergedPron = mergeBrokenSynonymPron(enHtml, koText);
        if (mergedPron) {
          enHtml = mergedPron;
          koText = '';
        }
      }
      /* 한글 번역이 없으면 비움 — 영어 예문을 한글 칸에 넣지 않음 */
      koText = sanitizeNarrativeKo(koText, enHtml);

      /* 구형: 한 <p>에 "영어 / 한글 cf." — 포맷 일치할 때만 EN·KO·cf로 분리 */
      if (isNarrative) {
        var combinedHtml = '';
        if (enEx && !koEx && !cfEx) combinedHtml = enEx.innerHTML;
        else if (!enEx && koEx && !cfEx) combinedHtml = koEx.innerHTML;
        else if (!enEx && !koEx && cfEx) combinedHtml = cfEx.innerHTML;
        else if (!enHtml && !koText && cfEx) combinedHtml = cfEx.innerHTML;
        else if (enHtml && !koText && !cfText) combinedHtml = enHtml;
        else if (!enHtml && !koText && narrTextEl) {
          combinedHtml = narrTextEl.innerHTML;
        }
        var splitParts = splitNarrativeEnKoCfHtml(combinedHtml);
        if (splitParts) {
          enHtml = splitParts.enHtml;
          koText = splitParts.ko;
          cfText = splitParts.cf;
        } else if (koText && cfText) {
          var koNorm = koText.replace(/^\d+\.\s*/, '').trim();
          var cfNorm = cfText.replace(/^\d+\.\s*/, '').trim();
          if (koNorm === cfNorm) {
            /* 슬래시 없는 구형: 같은 문장 두 번 표시 방지 */
            koText = '';
          }
        }
        koText = sanitizeNarrativeKo(koText, enHtml);
      }

      /* mark 없으면 은밀한(covert) 형태에서 영어 복구 — '표현' 폴백 방지 */
      if (isNarrative && !wordEn && !unique.length) {
        unique = extractParenEnglish(koText || cfText || stripHtml(enHtml));
      }

      /* 섹션당 카드 1개 — 영어 mark 우선, 한글 제목은 뜻 */
      if (!wordEn && unique.length) wordEn = unique[0];
      if (!wordEn && titleText && !/[가-힣]/.test(titleText)) wordEn = titleText;
      if (!wordEn && titleText) wordEn = titleText;
      var moreExprs = unique.length > 1 ? unique.slice(1) : [];
      if (
        isNarrative &&
        titleText &&
        wordEn &&
        titleText !== wordEn &&
        /[가-힣]/.test(titleText) &&
        /^[A-Za-z]/.test(wordEn)
      ) {
        meaning = titleText;
      }
      if (postMeaningHidden(meaning, wordEn)) meaning = wordKo || '';
      if (!meaning && titleText && wordEn && titleText !== wordEn) meaning = titleText;
      if (isNarrative && !meaning && unique.length === 1) {
        meaning = extractNarrativeMeaning((koText + ' ' + cfText).trim(), wordEn);
      }
      /* 영어 줄 끝 "(word)" 꼬리 먼저 제거 — 발음 접기보다 앞서야 뉴스 예문이 안 사라짐 */
      if (isNarrative && enHtml) {
        enHtml = stripTrailingExprTag(enHtml, wordEn);
      }
      /* 연관단어: 짧은 발음 줄만 접기 (뉴스 예문은 synonymPronLineHtml이 그대로 둠) */
      if (isNarrative && wordEn && enHtml) {
        enHtml = synonymPronLineHtml(enHtml, wordEn);
      }
      if (isNarrative && cfText && !meaning) {
        meaning = stripLeadingWordFromMeaning(cfText, wordEn);
      }
      /* 표제어 옆 뜻에 영어 단어가 또 붙지 않게 */
      meaning = stripLeadingWordFromMeaning(meaning, wordEn);
      /* 뜻을 cf에서 뽑았으면 아래 cf 줄 중복 숨김 */
      if (
        meaning &&
        cfText &&
        new RegExp(
          '\\bcf\\.\\s*' +
            String(wordEn || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') +
            '\\s*[:：]',
          'i'
        ).test(cfText)
      ) {
        cfText = '';
      }

      // Prefer highlighting expression inside English if we have raw English without marks
      if (enEx && wordEn && enHtml.indexOf('<mark') === -1) {
        enHtml = highlightPhrase(enHtml, wordEn);
      }
      if (isNarrative && wordEn && enHtml && enHtml.indexOf('<mark') === -1) {
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
        ko: koText,
        cf: cfText
      });
    });

    if (!cards.length) {
      cards = parseHeadingCards(root);
    }

    return cards.map(function (card, i) {
      var expr = stripLeadingListNum(card.expression);
      return {
        id: 'rd-expr-' + (i + 1),
        num: padNum(i + 1),
        expression: expr,
        meaning: stripLeadingWordFromMeaning(card.meaning, expr),
        moreExprs: card.moreExprs || [],
        enHtml: card.enHtml,
        ko: card.ko,
        cf: card.cf || ''
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
    var synonymMode = !!opts.synonymMode;
    /* 연관단어·뉴스어휘: 영어 옆 뜻 + 가리기/해제하기 토글 */
    var studyMode = !!opts.studyMode || synonymMode;
    var showMeaning = studyMode ? !!card.meaning : (!opts.hideMeaning && card.meaning);
    var ko = card.ko || '';
    if (opts.stripKoNum && ko) ko = stripLeadingListNum(ko);
    var more = Array.isArray(card.moreExprs) ? card.moreExprs.filter(Boolean) : [];
    var moreHtml = more.length
      ? '<p class="rd-expr-more">' + more.map(function (w) {
          return '<span>' + escapeHtml(w) + '</span>';
        }).join('') + '</p>'
      : '';
    var cf = String(card.cf || '').trim();
    var enLine = stripAllTtsButtons(String(card.enHtml || '').trim());
    var isPronOnly = /rd-expr-pron/.test(enLine) || /^\s*\([^)]+\)/.test(stripHtml(enLine));
    var wordKey = String(card.expression || '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-']/g, '');
    var ttsBtn = studyMode && card.expression ? ttsEmojiButtonHtml(card.expression) : '';
    var foot = studyMode
      ? '<div class="rd-expr-foot">' +
          '<button type="button" class="rd-syn-meaning-toggle" data-rd-meaning-toggle aria-pressed="false">뜻 보기</button>' +
          '<button type="button" class="rd-syn-save-toggle" data-rd-save-toggle aria-pressed="false">저장</button>' +
          '<button type="button" class="rd-syn-item-download" data-rd-item-download hidden>다운로드</button>' +
        '</div>'
      : '';
    return (
      '<article class="rd-expr' +
        (studyMode || isPronOnly ? ' rd-expr--synonym' : '') +
        '" id="' + escapeAttr(card.id) + '"' +
        (studyMode
          ? ' data-rd-word-key="' + escapeAttr(wordKey) + '"' +
            ' data-rd-word="' + escapeAttr(card.expression) + '"' +
            ' data-rd-meaning="' + escapeAttr(card.meaning || '') + '"'
          : '') +
        '>' +
        '<div class="rd-expr-top">' +
          '<span class="rd-expr-num">' + escapeHtml(card.num) + '</span>' +
          '<span class="rd-expr-word">' + escapeHtml(card.expression) + '</span>' +
          (showMeaning
            ? (studyMode ? '<span class="rd-expr-colon" aria-hidden="true">:</span>' : '') +
              '<span class="rd-expr-meaning">' + escapeHtml(card.meaning) + '</span>'
            : '') +
        '</div>' +
        moreHtml +
        (enLine || ttsBtn
          ? '<p class="rd-expr-en' + (isPronOnly || synonymMode ? ' rd-expr-en--pron' : '') + '">' +
              enLine + ttsBtn +
            '</p>'
          : '') +
        (ko && !synonymMode ? '<p class="rd-expr-ko">' + escapeHtml(ko) + '</p>' : '') +
        (cf && !synonymMode ? '<p class="rd-expr-cf">' + escapeHtml(cf) + '</p>' : '') +
        foot +
      '</article>'
    );
  }

  function synReadSaved() {
    try {
      var raw = sessionStorage.getItem(SYN_SAVED_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function synWriteSaved(map) {
    try {
      sessionStorage.setItem(SYN_SAVED_KEY, JSON.stringify(map || {}));
    } catch (e) { /* ignore */ }
  }

  function synHideDefault() {
    try {
      var v = localStorage.getItem(SYN_HIDE_KEY);
      if (v === null || v === '') return true; /* default: 뜻 가리기 */
      return v === '1';
    } catch (e) {
      return true;
    }
  }

  function speakEnglishWord(text, btn) {
    var raw = String(text || '').trim();
    if (!raw) return;
    if (!global.speechSynthesis || typeof global.SpeechSynthesisUtterance !== 'function') {
      try { alert('이 브라우저에서는 음성 읽기를 지원하지 않습니다.'); } catch (e) { /* ignore */ }
      return;
    }
    try {
      var synth = global.speechSynthesis;
      synth.cancel();
      if (synth.paused) synth.resume();
      var speak = function () {
        var u = new SpeechSynthesisUtterance(raw);
        u.lang = 'en-US';
        u.rate = 0.92;
        u.volume = 1;
        u.pitch = 1;
        try {
          var voices = synth.getVoices() || [];
          var en =
            voices.find(function (v) { return v.lang && /^en-US/i.test(v.lang); }) ||
            voices.find(function (v) { return v.lang && /^en(-|$)/i.test(v.lang); });
          if (en) u.voice = en;
        } catch (e2) { /* ignore */ }
        var done = function () {
          if (btn) btn.classList.remove('vv-tts-playing');
        };
        u.onend = done;
        u.onerror = done;
        if (btn) btn.classList.add('vv-tts-playing');
        synth.speak(u);
        /* Chrome: idle pause 후 speak가 묵음일 수 있어 resume */
        try { if (synth.paused) synth.resume(); } catch (e3) { /* ignore */ }
      };
      global.setTimeout(speak, 60);
    } catch (e) {
      if (btn) btn.classList.remove('vv-tts-playing');
      console.warn('Article TTS:', e);
    }
  }

  function ttsEmojiButtonHtml(word) {
    var w = String(word || '').trim();
    if (!w) return '';
    return (
      '<button type="button" class="vv-tts-btn" data-vv-tts="' + escapeAttr(w) + '"' +
      ' aria-label="' + escapeAttr(w) + ' 영어 발음 듣기" title="발음 듣기"' +
      ' style="margin-left:4px;padding:0;border:0;background:transparent;box-shadow:none;line-height:1;cursor:pointer;vertical-align:baseline;">🔊</button>'
    );
  }

  /** 카드당 🔊 스피커 정확히 1개 */
  function ensureCardTtsButtons(root) {
    if (!root) return;
    root.querySelectorAll('.rd-expr--synonym').forEach(function (card) {
      var word = (card.getAttribute('data-rd-word') || '').trim();
      if (!word) return;
      var host =
        card.querySelector('.rd-expr-en') ||
        card.querySelector('.rd-expr-word') ||
        card;
      Array.prototype.slice.call(card.querySelectorAll('.vv-tts-btn')).forEach(function (btn) {
        btn.remove();
      });
      host.insertAdjacentHTML('beforeend', ttsEmojiButtonHtml(word));
    });
  }

  function bindArticleTts(root) {
    if (!root || root.getAttribute('data-rd-tts-bound') === '1') return;
    root.setAttribute('data-rd-tts-bound', '1');
    try {
      if (global.speechSynthesis) global.speechSynthesis.getVoices();
    } catch (e) { /* ignore */ }
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('.vv-tts-btn');
      if (!btn || !root.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      var raw = (btn.getAttribute('data-vv-tts') || '').trim();
      if (!raw) {
        var card = btn.closest('.rd-expr--synonym');
        raw = card ? (card.getAttribute('data-rd-word') || '').trim() : '';
      }
      if (!raw) return;
      var playing =
        btn.classList.contains('vv-tts-playing') &&
        global.speechSynthesis &&
        (global.speechSynthesis.speaking || global.speechSynthesis.pending);
      try {
        if (global.speechSynthesis) global.speechSynthesis.cancel();
      } catch (e2) { /* ignore */ }
      root.querySelectorAll('.vv-tts-btn.vv-tts-playing').forEach(function (b) {
        b.classList.remove('vv-tts-playing');
      });
      if (playing) return;
      speakEnglishWord(raw, btn);
    });
  }

  function bindSynonymStudy(root) {
    if (!root || root.getAttribute('data-rd-syn-bound') === '1') return;
    root.setAttribute('data-rd-syn-bound', '1');

    var hideOn = synHideDefault();
    var toolbar =
      '<div class="rd-syn-toolbar" role="toolbar" aria-label="뜻 가리기">' +
        '<label class="rd-syn-hide-all" title="' +
          (hideOn ? '체크 해제하면 뜻이 보입니다' : '체크하면 뜻을 가립니다') +
        '">' +
          '<input type="checkbox" id="rd-syn-hide-meaning"' + (hideOn ? ' checked' : '') + '>' +
          '<span class="rd-syn-hide-label">' +
            (hideOn ? '뜻 해제하기' : '뜻 가리기') +
          '</span>' +
        '</label>' +
        '<button type="button" class="rd-syn-download-all" id="rd-syn-download-saved" hidden disabled>저장 다운로드 (<span id="rd-syn-saved-count">0</span>)</button>' +
      '</div>';
    if (!root.querySelector('.rd-syn-toolbar')) {
      root.insertAdjacentHTML('afterbegin', toolbar);
    }

    function isVisible(card) {
      var globalHide = document.body.classList.contains('rd-syn-hide-meaning');
      if (globalHide) return card.classList.contains('is-meaning-shown');
      return !card.classList.contains('is-meaning-hidden');
    }

    function syncMeaningBtn(card) {
      var btn = card.querySelector('[data-rd-meaning-toggle]');
      if (!btn) return;
      var shown = isVisible(card);
      btn.textContent = shown ? '뜻 숨기기' : '뜻 보기';
      btn.setAttribute('aria-pressed', shown ? 'true' : 'false');
    }

    function syncSaveBtn(card) {
      var key = card.getAttribute('data-rd-word-key') || '';
      var btn = card.querySelector('[data-rd-save-toggle]');
      var dl = card.querySelector('[data-rd-item-download]');
      var on = Boolean(key && synReadSaved()[key]);
      if (btn) {
        btn.textContent = on ? '저장됨' : '저장';
        btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }
      if (dl) dl.hidden = !on;
    }

    /** 이 글에 있는 단어만 집계 — 다른 페이지 저장분이 버튼에 안 뜨게 */
    function pageSavedEntries() {
      var map = synReadSaved();
      var out = [];
      root.querySelectorAll('.rd-expr--synonym[data-rd-word-key]').forEach(function (card) {
        var key = card.getAttribute('data-rd-word-key') || '';
        if (!key || !map[key]) return;
        out.push({ key: key, item: map[key] });
      });
      return out;
    }

    function syncDownloadAll() {
      var saved = pageSavedEntries();
      var n = saved.length;
      var btn = document.getElementById('rd-syn-download-saved');
      var count = document.getElementById('rd-syn-saved-count');
      if (count) count.textContent = String(n);
      if (btn) {
        btn.hidden = n === 0;
        btn.disabled = n === 0;
      }
      root.querySelectorAll('.rd-expr--synonym').forEach(syncSaveBtn);
    }

    function syncHideLabel(on) {
      var hide = !!on;
      var label = root.querySelector('.rd-syn-hide-label');
      if (label) label.textContent = hide ? '뜻 해제하기' : '뜻 가리기';
      var wrap = root.querySelector('.rd-syn-hide-all');
      if (wrap) {
        wrap.title = hide ? '체크 해제하면 뜻이 보입니다' : '체크하면 뜻을 가립니다';
      }
      var cb = document.getElementById('rd-syn-hide-meaning');
      if (cb && cb.checked !== hide) cb.checked = hide;
    }

    function applyHide(on) {
      var hide = !!on;
      document.body.classList.toggle('rd-syn-hide-meaning', hide);
      try {
        localStorage.setItem(SYN_HIDE_KEY, hide ? '1' : '0');
      } catch (e) { /* ignore */ }
      syncHideLabel(hide);
      root.querySelectorAll('.rd-expr--synonym').forEach(function (card) {
        card.classList.remove('is-meaning-shown', 'is-meaning-hidden');
        syncMeaningBtn(card);
      });
    }

    function downloadSaved() {
      var saved = pageSavedEntries();
      if (!saved.length) return;
      if (window.SiteStats && typeof window.SiteStats.trackDownload === 'function') {
        window.SiteStats.trackDownload(
          saved.map(function (row) {
            return (row.item && row.item.word) || row.key;
          }),
          'synonym'
        );
      }
      var lines = saved.map(function (row) {
        var it = row.item || {};
        return (
          String(it.word || row.key) +
          (it.meaning ? ' — ' + it.meaning : '') +
          (it.pron ? '  ' + it.pron : '')
        );
      });
      var blob = new Blob([lines.join('\n') + '\n'], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      var d = new Date();
      a.href = URL.createObjectURL(blob);
      a.download =
        'synonym-saved-' +
        d.getFullYear() +
        String(d.getMonth() + 1).padStart(2, '0') +
        String(d.getDate()).padStart(2, '0') +
        '.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    }

    applyHide(synHideDefault()); /* default: 뜻 가리기 (v2 키로 이전 해제 상태 초기화) */
    syncDownloadAll();
    root.querySelectorAll('.rd-expr--synonym').forEach(syncMeaningBtn);
    ensureCardTtsButtons(root);
    /* TTS 클릭은 page30 attachVocabularyWebTTS / vvBindTtsButtons 한곳에서만 처리 */

    root.addEventListener('click', function (e) {
      if (e.target.closest('.vv-tts-btn')) return;
      var meaningBtn = e.target.closest('[data-rd-meaning-toggle]');
      if (meaningBtn) {
        var card = meaningBtn.closest('.rd-expr--synonym');
        if (!card) return;
        var globalHide = document.body.classList.contains('rd-syn-hide-meaning');
        var shown = isVisible(card);
        if (globalHide) {
          card.classList.toggle('is-meaning-shown', !shown);
          card.classList.remove('is-meaning-hidden');
        } else {
          card.classList.toggle('is-meaning-hidden', shown);
          card.classList.remove('is-meaning-shown');
        }
        syncMeaningBtn(card);
        return;
      }
      var saveBtn = e.target.closest('[data-rd-save-toggle]');
      if (saveBtn) {
        var cardSave = saveBtn.closest('.rd-expr--synonym');
        if (!cardSave) return;
        var key = cardSave.getAttribute('data-rd-word-key') || '';
        if (!key) return;
        var map = synReadSaved();
        if (map[key]) delete map[key];
        else {
          var pronEl = cardSave.querySelector('.rd-expr-pron, .rd-expr-en--pron');
          map[key] = {
            word: cardSave.getAttribute('data-rd-word') || '',
            meaning: cardSave.getAttribute('data-rd-meaning') || '',
            pron: pronEl ? stripHtml(pronEl.innerHTML).replace(/\s+/g, ' ').trim() : '',
            savedAt: Date.now()
          };
        }
        synWriteSaved(map);
        syncDownloadAll();
        return;
      }
      if (e.target.closest('[data-rd-item-download]') || e.target.closest('#rd-syn-download-saved')) {
        downloadSaved();
      }
    });

    var hideInput = document.getElementById('rd-syn-hide-meaning');
    if (hideInput) {
      hideInput.addEventListener('change', function () {
        applyHide(hideInput.checked);
      });
    }
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
    var sourceFull = extractSourceFull(html);
    var source = resolveSource(post, cfg, html) || shortSourceLabel(sourceFull);
    var date = formatDate(post.date);
    var newsBoard = !!(cfg && cfg.navGroup === 'news');
    var synonymMode = cfg.key === 'english-synonym';
    /* 뉴스·연관단어: 아래에 예문/단어 카드가 있어 제목·단어 나열 요약은 생략 */
    var summary = (newsBoard || synonymMode) ? '' : extractSummary(post, parser);
    var yt = extractYoutube(html);
    var heroImg = !yt ? extractHeroImage(html) : '';
    var sourceUrl = extractSourceLink(html) || (post.sourceUrl || '');
    var narrativeMode = isNarrativeCardCapable(parser, cards);
    var hasCardMeanings = cards.some(function (c) { return !!(c && c.meaning); });
    /* 연관단어 + 뉴스어휘(narrative) — 뜻 가리기/해제하기 토글 */
    var studyMode = synonymMode || (narrativeMode && hasCardMeanings && newsBoard);

    var crumb =
      '<nav class="rd-article-crumb" aria-label="위치">' +
        '<a href="' + escapeAttr(siteHref('index.html')) + '">홈</a><span aria-hidden="true">/</span>' +
        '<a href="' + escapeAttr(siteHref(cfg.breadcrumbParent.href)) + '">' + escapeHtml(cfg.breadcrumbParent.label) + '</a>' +
        '<span aria-hidden="true">/</span>' +
        '<span class="is-current">' + escapeHtml(cfg.categoryLabel) + '</span>' +
      '</nav>';

    var metaParts = [];
    if (source) metaParts.push('<span class="rd-source">출처 ' + escapeHtml(source) + '</span>');
    if (date) metaParts.push('<span>' + escapeHtml(date) + '</span>');
    if (cards.length) metaParts.push('<span>핵심 표현 ' + cards.length + '개</span>');

    /* 뉴스·연관단어: 큰 섬네일/임베드 없이 본문 아래 「유튜브로 듣기」만 */
    var ytBlock = '';
    if (!newsBoard && !synonymMode) {
      if (yt) {
        ytBlock =
          '<div class="rd-yt rd-yt--lazy" data-yt-id="' + escapeAttr(yt.id) + '" data-yt-embed="' + escapeAttr(yt.embed) + '">' +
            '<button type="button" class="rd-yt-play-btn" data-yt-play aria-label="영상 재생">' +
              '<img src="' + escapeAttr(yt.thumb) + '" alt="" loading="lazy" decoding="async">' +
              '<span class="rd-yt-play">▶ 영상 보기</span>' +
            '</button>' +
          '</div>';
      } else if (heroImg) {
        ytBlock =
          '<div class="rd-yt rd-yt--photo">' +
            '<img src="' + escapeAttr(heroImg) + '" alt="" loading="lazy" decoding="async">' +
          '</div>';
      }
    }

    /* CTA — 유튜브로 듣기·댓글·글쓰기. 창은 버튼을 눌렀을 때만 연다. 뉴스도 본문 맨 아래 */
    var newsComments = newsBoard;
    var showComments = options.enableComments === true || newsComments;
    var actions = '<div class="rd-article-actions">';
    if (yt) {
      actions += '<a class="rd-btn-solid" href="' + escapeAttr(yt.watch) + '" target="_blank" rel="noopener noreferrer">' +
        ytLogoSvg() + ' 유튜브로 듣기</a>';
    }
    if (showComments) {
      actions += '<div class="board-comments-root" data-board-comments-root></div>';
    }
    actions += '</div>';

    var sourceBlock = '';
    if (sourceFull || sourceUrl) {
      sourceBlock =
        '<aside class="rd-source-block" aria-label="출처">' +
          '<p class="rd-source-block-label">출처</p>' +
          (sourceFull ? '<p class="rd-source-block-text">' + escapeHtml(sourceFull) + '</p>' : '') +
          (sourceUrl
            ? '<p class="rd-source-block-link"><a href="' + escapeAttr(sourceUrl) + '" target="_blank" rel="noopener noreferrer">원문 기사 보기 ↗</a></p>'
            : '') +
        '</aside>';
    }

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
          '<div id="post-message" class="rd-article-cards' + (studyMode ? ' rd-article-cards--synonym' : '') + '">' +
            (cards.length
              ? cards.map(function (c) {
                  return renderCardHtml(c, {
                    /* study: 영어 옆 뜻 + 토글 / synonym: 예문·cf 생략 */
                    hideMeaning: narrativeMode && !studyMode,
                    stripKoNum: narrativeMode,
                    synonymMode: synonymMode,
                    studyMode: studyMode
                  });
                }).join('')
              : '<div class="rd-article-fallback">' + html + '</div>') +
          '</div>' +
          sourceBlock +
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

    if (studyMode) {
      var synRoot = container.querySelector('.rd-article-cards--synonym');
      if (synRoot) bindSynonymStudy(synRoot);
    }

    // Keep a hidden like control so initViewpostLike can still bind if called after
    if (typeof options.onReady === 'function') options.onReady(container);

    bindLazyYoutube(container);

    if (showComments) {
      mountNewsArticleComments(post, options.boardKey);
    }

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

  function redesignAssetBase() {
    var scripts = document.querySelectorAll('script[src]');
    var i;
    for (i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].getAttribute('src') || '';
      if (/redesign-article\.js/.test(src)) return src.replace(/[^/]+$/, '');
    }
    return '';
  }

  function loadRedesignScript(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error(src)); };
      document.head.appendChild(s);
    });
  }

  function loadRedesignCss(href) {
    var name = href.replace(/^.*\//, '').split('?')[0];
    if (document.querySelector('link[href*="' + name + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function mountNewsArticleComments(post, boardKey) {
    var contentKey = String((post && (post.slug || post._id)) || '').trim();
    var board = String(boardKey || '').trim();
    if (!contentKey || !board) return;
    var base = redesignAssetBase();
    loadRedesignCss(base + 'board-comments.css?v=20261107cmt2');
    var commentsSrc = base + 'board-comments.js?v=20261107cmt2';
    var ready = window.BoardComments
      ? Promise.resolve()
      : loadRedesignScript(commentsSrc);
    ready.then(function () {
      if (!window.BoardComments || typeof window.BoardComments.mount !== 'function') return null;
      return window.BoardComments.mount({
        board: board,
        contentKey: contentKey,
        title: (post && post.title) || ''
      });
    }).catch(function (err) {
      console.warn('board comments mount skipped', err);
    });
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
      next: options.next,
      enableComments: options.enableComments
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
