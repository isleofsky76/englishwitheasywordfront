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
      /* sendBeacon+application/json 은 교차출처에서 자주 실패 → fetch keepalive */
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: body,
        credentials: 'omit',
        mode: 'cors',
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

  function trackView(terms, source) {
    postEvent('view', terms, source || 'view');
  }

  global.SiteStats = {
    trackSearch: trackSearch,
    trackDownload: trackDownload,
    trackView: trackView,
  };
})(window);
