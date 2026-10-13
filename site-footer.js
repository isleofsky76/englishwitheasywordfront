/**
 * 사이트 공통 푸터 — About / 개인정보처리방침 / 이용약관
 * nav-home-menu.js 또는 페이지에서 직접 로드
 */
(function () {
  'use strict';

  if (window.__eesSiteFooterLoaded) return;
  window.__eesSiteFooterLoaded = true;

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

  function rootPrefix() {
    var parts = (window.location.pathname || '/')
      .split('/')
      .filter(function (p) {
        return p && p.length;
      });
    if (parts.length && /\.html?$/i.test(parts[parts.length - 1])) {
      parts.pop();
    }
    if (!parts.length) return '';
    return '../'.repeat(parts.length);
  }

  function ensureCss() {
    if (document.querySelector('link[href*="site-footer.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = scriptBase() + 'site-footer.css?v=20261013a';
    document.head.appendChild(link);
  }

  function buildFooterHtml(prefix) {
    var year = new Date().getFullYear();
    return (
      '<footer class="site-legal-footer" role="contentinfo" aria-label="사이트 정보">' +
      '<div class="site-legal-footer-inner">' +
      '<nav aria-label="법적 고지">' +
      '<ul class="site-legal-footer-nav">' +
      '<li><a href="' + prefix + 'about.html">사이트 소개</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="' + prefix + 'privacy.html">개인정보처리방침</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="' + prefix + 'terms.html">이용약관</a></li>' +
      '<li class="sep" aria-hidden="true">·</li>' +
      '<li><a href="mailto:everydayalittlehelp@gmail.com">문의</a></li>' +
      '</ul></nav>' +
      '<p class="site-legal-footer-copy">© ' +
      year +
      ' 시사영단어 · News English Lab. All rights reserved.</p>' +
      '</div></footer>'
    );
  }

  function injectFooter() {
    if (document.getElementById('site-legal-footer') || document.querySelector('.site-legal-footer')) {
      return;
    }
    ensureCss();
    var wrap = document.createElement('div');
    wrap.id = 'site-legal-footer';
    wrap.innerHTML = buildFooterHtml(rootPrefix());
    document.body.appendChild(wrap.firstChild);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectFooter);
  } else {
    injectFooter();
  }
})();
