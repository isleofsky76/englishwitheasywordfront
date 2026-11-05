/**
 * 학습 대시보드 — 댓글 / 다운로드 / 검색어 랭킹
 */
(function () {
  'use strict';

  var PERIOD_LABEL = {
    today: '오늘',
    '7d': '최근 7일',
    '30d': '최근 30일',
    all: '전체',
  };

  var state = { period: '7d', loading: false };

  function apiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') return window.getPage30ApiBaseUrl();
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(s) {
    return escapeHtml(s).replace(/'/g, '&#39;');
  }

  function fmt(n) {
    return Number(n || 0).toLocaleString('en-US');
  }

  /** 단일 표제어 → 문장 / 구·표현 → 생활 영어 한 줄 */
  function termHref(term, kind) {
    var t = String(term == null ? '' : term).trim();
    if (!t) return 'one-sentence.html';
    var isPhrase = /\s/.test(t) || t.length > 24;
    if (kind === 'download' || kind === 'search') {
      if (isPhrase) return 'daily-english.html?q=' + encodeURIComponent(t);
    }
    if (isPhrase) return 'daily-english.html?q=' + encodeURIComponent(t);
    return 'one-sentence.html?q=' + encodeURIComponent(t);
  }

  function setStatus(text) {
    var el = document.getElementById('db-status');
    if (el) el.textContent = text || '';
  }

  function renderStats(stats) {
    var map = {
      'db-stat-comments': stats.comments,
      'db-stat-words': stats.uniqueWords,
      'db-stat-downloads': stats.downloads,
      'db-stat-searches': stats.searches,
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.textContent = fmt(map[id]);
    });
    var learners = document.getElementById('db-stat-learners');
    if (learners) learners.textContent = fmt(stats.learners);
    var today = document.getElementById('db-stat-today');
    if (today) today.textContent = fmt(stats.todayComments);
  }

  function renderTable(tbodyId, emptyId, rows, kind) {
    var tbody = document.getElementById(tbodyId);
    var empty = document.getElementById(emptyId);
    if (!tbody) return;
    if (!rows || !rows.length) {
      tbody.innerHTML = '';
      if (empty) empty.hidden = false;
      return;
    }
    if (empty) empty.hidden = true;
    tbody.innerHTML = rows
      .map(function (r) {
        return (
          '<tr>' +
          '<td class="db-rank">' +
          escapeHtml(String(r.rank)) +
          '</td>' +
          '<td><a class="db-term" href="' +
          escapeAttr(termHref(r.term, kind)) +
          '">' +
          escapeHtml(r.term) +
          '</a></td>' +
          '<td class="db-count">' +
          escapeHtml(fmt(r.count)) +
          '</td>' +
          '</tr>'
        );
      })
      .join('');
  }

  function syncPeriodButtons() {
    document.querySelectorAll('[data-db-period]').forEach(function (btn) {
      var on = btn.getAttribute('data-db-period') === state.period;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    var sub = PERIOD_LABEL[state.period] || state.period;
    document.querySelectorAll('[data-db-period-label]').forEach(function (el) {
      el.textContent = sub;
    });
  }

  async function loadDashboard() {
    if (state.loading) return;
    state.loading = true;
    setStatus('불러오는 중…');
    syncPeriodButtons();
    try {
      var res = await fetch(
        apiBase().replace(/\/$/, '') +
          '/api/stats/dashboard?period=' +
          encodeURIComponent(state.period) +
          '&limit=20',
        { credentials: 'omit' }
      );
      var data = await res.json().catch(function () {
        return {};
      });
      if (!res.ok) throw new Error(data.error || 'load failed');
      renderStats(data.stats || {});
      var ranks = data.rankings || {};
      renderTable('db-tbody-comments', 'db-empty-comments', ranks.comments || [], 'comment');
      renderTable('db-tbody-downloads', 'db-empty-downloads', ranks.downloads || [], 'download');
      renderTable('db-tbody-searches', 'db-empty-searches', ranks.searches || [], 'search');
      setStatus('');
    } catch (err) {
      console.error(err);
      setStatus('통계를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      state.loading = false;
    }
  }

  function boot() {
    document.querySelectorAll('[data-db-period]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var p = btn.getAttribute('data-db-period') || '7d';
        if (p === state.period) return;
        state.period = p;
        loadDashboard();
      });
    });
    loadDashboard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
