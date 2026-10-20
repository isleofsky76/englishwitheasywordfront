/**
 * SEO FOUC(rd-ready) 해제 — header-only·classic 보드 공통
 */
(function (global) {
  'use strict';

  function markViewpostReady() {
    if (typeof global.markArticleReady === 'function') {
      global.markArticleReady();
      return;
    }
    document.documentElement.classList.add('rd-ready');
    if (document.body) document.body.classList.add('rd-ready');
  }

  global.markViewpostReady = markViewpostReady;
})(typeof window !== 'undefined' ? window : globalThis);
