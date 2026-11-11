/**
 * 사이트 공통 푸터 — 검은색 브랜드 + YouTube/X + 소개/개인정보/약관/문의
 * 페이지별(.rd-footer, .rd-word-footer 등) 다른 푸터는 제거하고 이 마크업으로 통일
 */
(function () {
  'use strict';

  if (window.__eesSiteFooterLoaded) return;
  window.__eesSiteFooterLoaded = true;

  var FOOTER_VER = '20261112dark1';

  function toSitePath(href) {
    var h = String(href || '').trim();
    if (!h) return h;
    if (/^(https?:|mailto:|tel:|#)/i.test(h)) return h;
    var hash = '';
    var q = '';
    var hm = h.match(/#.*$/);
    if (hm) {
      hash = hm[0];
      h = h.slice(0, -hash.length);
    }
    var qm = h.match(/\?.*$/);
    if (qm) {
      q = qm[0];
      h = h.slice(0, -q.length);
    }
    h = h.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^(\.\.\/)+/, '');
    if (h.charAt(0) === '/') h = h.slice(1);
    if (!h || h === 'index.html') return '/' + q + hash;
    h = h.replace(/\.html$/i, '');
    return '/' + h + q + hash;
  }

  function scriptBase() {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (src.indexOf('site-footer.js') !== -1 || src.indexOf('nav-home-menu.js') !== -1) {
        return src.replace(/[^/]+$/, '');
      }
    }
    return '';
  }

  function ensureCss() {
    var existing = document.querySelector('link[href*="site-footer.css"]');
    var href = scriptBase() + 'site-footer.css?v=' + FOOTER_VER;
    if (existing) {
      if ((existing.getAttribute('href') || '').indexOf(FOOTER_VER) === -1) {
        existing.setAttribute('href', href);
      }
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function buildFooterHtml() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-legal-footer" id="site-legal-footer" role="contentinfo" aria-label="사이트 정보">' +
      '<div class="site-legal-footer-inner">' +
      '<div class="site-legal-footer-brand">' +
      '<span class="name">시사영단어</span>' +
      '<span class="desc">뉴스로 배우는 시사 영어. 뉴스 어휘, 오늘의 단어, 유의어, 퀴즈를 무료로.</span>' +
      '</div>' +
      '<nav aria-label="사이트 링크">' +
      '<ul class="site-legal-footer-nav">' +
      '<li><a href="https://www.youtube.com/@istudyeng" target="_blank" rel="noopener noreferrer">YouTube</a></li>' +
      '<li><a href="https://x.com/istudyengli" target="_blank" rel="noopener noreferrer">X</a></li>' +
      '<li><a href="' + toSitePath('about.html') + '">사이트 소개</a></li>' +
      '<li><a href="' + toSitePath('privacy.html') + '">개인정보처리방침</a></li>' +
      '<li><a href="' + toSitePath('terms.html') + '">이용약관</a></li>' +
      '<li><a href="' + toSitePath('contact') + '">문의</a></li>' +
      '</ul></nav>' +
      '</div>' +
      '<p class="site-legal-footer-copy">© ' +
      year +
      ' 시사영단어 · News English Lab. All rights reserved.</p>' +
      '</footer>'
    );
  }

  function removeLegacyFooters() {
    document.querySelectorAll('.rd-footer, .rd-word-footer').forEach(function (el) {
      el.parentNode && el.parentNode.removeChild(el);
    });
  }

  var injecting = false;

  function needsUpgrade(el) {
    if (!el) return true;
    if (!el.querySelector('.site-legal-footer-brand')) return true;
    if (!el.querySelector('a[href*="youtube.com"]')) return true;
    if (!el.querySelector('a[href*="contact"]')) return true;
    return false;
  }

  function injectFooter() {
    if (injecting) return;
    injecting = true;
    try {
      ensureCss();
      removeLegacyFooters();

      var existing = document.getElementById('site-legal-footer') || document.querySelector('.site-legal-footer');
      var wrap = document.createElement('div');
      wrap.innerHTML = buildFooterHtml();
      var next = wrap.firstChild;

      if (existing) {
        if (!needsUpgrade(existing)) return;
        existing.parentNode.replaceChild(next, existing);
        return;
      }

      document.body.appendChild(next);
    } finally {
      injecting = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }

  try {
    var mo = new MutationObserver(function () {
      if (document.querySelector('.rd-footer, .rd-word-footer')) injectFooter();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
    /* ignore */
  }
})();
