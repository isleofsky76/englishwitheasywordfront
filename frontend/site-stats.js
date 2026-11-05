/**
 * 검색·다운로드 이벤트 → /api/stats/event
 */
(function (global) {
  'use strict';

  var lastSearch = '';
  var lastSearchAt = 0;

  function apiBase() {
    if (typeof global.getPage30ApiBaseUrl === 'function') return global.getPage30ApiBaseUrl();
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function postEvent(kind, terms, source) {
    var list = (Array.isArray(terms) ? terms : [terms])
      .map(function (t) {
        return String(t == null ? '' : t).trim();
      })
      .filter(Boolean)
      .slice(0, 40);
    if (!list.length) return;
    try {
      var body = JSON.stringify({ kind: kind, terms: list, source: source || '' });
      var url = apiBase().replace(/\/$/, '') + '/api/stats/event';
      if (navigator.sendBeacon) {
        var blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
        return;
      }
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
        credentials: 'omit',
        keepalive: true,
      }).catch(function () {});
    } catch (e) { /* ignore */ }
  }

  function trackSearch(q, source) {
    var term = String(q || '').trim();
    if (term.length < 2) return;
    var now = Date.now();
    if (term === lastSearch && now - lastSearchAt < 4000) return;
    lastSearch = term;
    lastSearchAt = now;
    postEvent('search', [term], source || 'search');
  }

  function trackDownload(terms, source) {
    postEvent('download', terms, source || 'download');
  }

  global.SiteStats = {
    trackSearch: trackSearch,
    trackDownload: trackDownload,
  };
})(window);
