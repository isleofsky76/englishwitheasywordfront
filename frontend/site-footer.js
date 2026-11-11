/**
 * 사이트 공통 푸터 — 사이트 소개 / 개인정보처리방침 / 이용약관 / 문의
 * 페이지별(.rd-footer, .rd-word-footer 등) 다른 푸터는 제거하고 이 마크업으로 통일
 */
(function () {
  'use strict';

  if (window.__eesSiteFooterLoaded) return;
  window.__eesSiteFooterLoaded = true;

  var FOOTER_VER = '20261112footer1';

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
    if (document.querySelector('link[href*="site-footer.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = scriptBase() + 'site-footer.css?v=' + FOOTER_VER;
    document.head.appendChild(link);
  }

  function buildFooterHtml() {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-legal-footer" id="site-legal-footer" role="contentinfo" aria-label="사이트 정보">' +
      '<div class="site-legal-footer-inner">' +
      '<nav aria-label="법적 고지">' +
      '<ul class="site-legal-footer-nav">' +
      '<li><a href="' + toSitePath('about.html') + '">사이트 소개</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="' + toSitePath('privacy.html') + '">개인정보처리방침</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="' + toSitePath('terms.html') + '">이용약관</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="' + toSitePath('contact') + '">문의</a></li>' +
      '</ul></nav>' +
      '<p class="site-legal-footer-copy">© ' +
      year +
      ' 시사영단어 · News English Lab. All rights reserved.</p>' +
      '</div></footer>'
    );
  }

  function removeLegacyFooters() {
    document.querySelectorAll('.rd-footer, .rd-word-footer').forEach(function (el) {
      el.parentNode && el.parentNode.removeChild(el);
    });
  }

  var injecting = false;

  function injectFooter() {
    if (injecting) return;
    injecting = true;
    try {
      ensureCss();
      var hadLegacy = !!document.querySelector('.rd-footer, .rd-word-footer');
      removeLegacyFooters();

      var existing = document.getElementById('site-legal-footer') || document.querySelector('.site-legal-footer');
      if (existing) {
        /* 문의 링크 없는 옛 푸터만 교체 */
        var needsContact = !existing.querySelector('a[href*="contact"]');
        if (!needsContact && !hadLegacy) return;
        var wrap = document.createElement('div');
        wrap.innerHTML = buildFooterHtml();
        existing.parentNode.replaceChild(wrap.firstChild, existing);
        return;
      }

      var wrap = document.createElement('div');
      wrap.innerHTML = buildFooterHtml();
      document.body.appendChild(wrap.firstChild);
    } finally {
      injecting = false;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }

  /* 단어장 등이 나중에 커스텀 푸터를 넣으면 다시 통일 */
  try {
    var mo = new MutationObserver(function () {
      if (document.querySelector('.rd-footer, .rd-word-footer')) injectFooter();
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (e) {
    /* ignore */
  }
})();
