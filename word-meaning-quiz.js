/**
 * 영단어 복습 — EN → KO 4지선다
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wmq-session-id';
  var LEVEL_KEY = 'wmq-level';
  /* one-sentence 페이지와 같은 탭 저장 목록 공유 */
  var SAVED_WORDS_KEY = 'os-saved-words-session';

  function apiBase() {
    if (typeof window.getPage30ApiBaseUrl === 'function') {
      return window.getPage30ApiBaseUrl().replace(/\/$/, '');
    }
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function isMobile() {
    return window.matchMedia('(max-width: 719px)').matches;
  }

  function wordAnchorId(word, pos) {
    var base =
      'os-w-' +
      String(word || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    var p = String(pos || '')
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return p ? base + '-' + p : base;
  }

  function readSavedMap() {
    try {
      var raw = sessionStorage.getItem(SAVED_WORDS_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeSavedMap(map) {
    try {
      sessionStorage.setItem(SAVED_WORDS_KEY, JSON.stringify(map || {}));
    } catch (e) {
      /* ignore quota */
    }
  }

  function syncSaveToggleButton(btn, wordKey) {
    if (!btn) return;
    var on = Boolean(wordKey && readSavedMap()[wordKey]);
    btn.textContent = on ? '저장됨' : '저장';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.title = on ? '저장 취소' : '이 탭에만 잠시 저장';
  }

  function syncItemDownloadButton(itemEl, wordKey) {
    if (!itemEl) return;
    var btn = itemEl.querySelector('[data-os-item-download]');
    if (!btn) return;
    var on = Boolean(wordKey && readSavedMap()[wordKey]);
    btn.hidden = !on;
    btn.title = on ? '저장한 단어 전체 다운로드' : '';
  }

  function toggleSaveCurrentWord() {
    var itemEl = $('wmq-os-item');
    if (!itemEl || itemEl.hidden) return;
    var wordKey = itemEl.getAttribute('data-word-key') || '';
    if (!wordKey) return;
    var map = readSavedMap();
    if (map[wordKey]) {
      delete map[wordKey];
    } else {
      var q = state.questions[state.index] || {};
      map[wordKey] = {
        word: String(q.word || itemEl.getAttribute('data-word') || '').trim(),
        pos: String(q.posSource || itemEl.getAttribute('data-pos') || '').trim(),
        meaning: String(q.correctMeaning || '').trim(),
        ipa: '',
        ipaKo: '',
        en: String(q.example || '').trim(),
        ko: String(q.exampleKo || '').trim(),
        savedAt: Date.now(),
      };
    }
    writeSavedMap(map);
    syncSaveToggleButton(itemEl.querySelector('[data-os-save-toggle]'), wordKey);
    syncItemDownloadButton(itemEl, wordKey);
  }

  function downloadSavedWords() {
    var map = readSavedMap();
    var keys = Object.keys(map);
    if (!keys.length) return;
    keys.sort(function (a, b) {
      return String(map[a].word || '').localeCompare(String(map[b].word || ''), 'en', {
        sensitivity: 'base',
      });
    });
    if (window.SiteStats && typeof window.SiteStats.trackDownload === 'function') {
      window.SiteStats.trackDownload(
        keys.map(function (k) {
          return (map[k] && map[k].word) || '';
        }),
        'word-meaning-quiz'
      );
    }
    var lines = ['단어\t품사\t뜻\t발음\t예문\t해석'];
    keys.forEach(function (k) {
      var it = map[k] || {};
      var pron = [it.ipa, it.ipaKo].filter(Boolean).join(' ');
      lines.push(
        [
          it.word || '',
          it.pos || '',
          it.meaning || '',
          pron,
          String(it.en || '')
            .replace(/\s+/g, ' ')
            .trim(),
          String(it.ko || '')
            .replace(/\s+/g, ' ')
            .trim(),
        ]
          .map(function (cell) {
            return String(cell).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
          })
          .join('\t')
      );
    });
    var stamp = new Date();
    var y = stamp.getFullYear();
    var m = String(stamp.getMonth() + 1).padStart(2, '0');
    var d = String(stamp.getDate()).padStart(2, '0');
    var blob = new Blob(['\uFEFF' + lines.join('\n') + '\n'], {
      type: 'text/tab-separated-values;charset=utf-8',
    });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'one-sentence-saved-' + y + m + d + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function syncWordFoot(q) {
    var itemEl = $('wmq-os-item');
    if (!itemEl || !q) return;
    var pos = String(q.posSource || '').trim();
    var word = String(q.word || '').trim();
    var wordKey = wordAnchorId(word, pos);
    itemEl.hidden = !word;
    itemEl.setAttribute('data-word', word);
    itemEl.setAttribute('data-pos', pos);
    itemEl.setAttribute('data-word-key', wordKey);
    syncSaveToggleButton(itemEl.querySelector('[data-os-save-toggle]'), wordKey);
    syncItemDownloadButton(itemEl, wordKey);
    if (window.OsComments && typeof window.OsComments.mountAll === 'function') {
      window.OsComments.mountAll();
    }
  }

  function bindWordFoot() {
    var itemEl = $('wmq-os-item');
    if (!itemEl || itemEl.dataset.bound === '1') return;
    itemEl.dataset.bound = '1';
    itemEl.addEventListener('click', function (e) {
      var saveBtn = e.target.closest('[data-os-save-toggle]');
      if (saveBtn) {
        e.preventDefault();
        toggleSaveCurrentWord();
        return;
      }
      var dlBtn = e.target.closest('[data-os-item-download]');
      if (dlBtn) {
        e.preventDefault();
        downloadSavedWords();
      }
    });
  }

  async function fetchJson(url, options) {
    var res = await fetch(url, options);
    var data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    if (!res.ok) {
      var err = new Error((data && data.error) || '요청 실패');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  var state = {
    meta: null,
    level: 'all',
    sessionId: null,
    total: 0,
    questions: [],
    index: 0,
    answered: false,
    lastAnswer: null,
  };

  function saveSessionId(id) {
    try {
      if (id) sessionStorage.setItem(STORAGE_KEY, id);
      else sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
  }

  function loadSessionId() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || '';
    } catch (e) {
      return '';
    }
  }

  function saveLevel(level) {
    try {
      sessionStorage.setItem(LEVEL_KEY, level);
    } catch (e) { /* ignore */ }
  }

  function loadLevel() {
    try {
      return sessionStorage.getItem(LEVEL_KEY) || 'all';
    } catch (e) {
      return 'all';
    }
  }

  function showPanel(name) {
    ['wmq-start-panel', 'wmq-quiz-panel', 'wmq-result-panel'].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      el.hidden = id !== name;
    });
  }

  function renderLevels(containerId, selected, onPick) {
    var box = $(containerId);
    if (!box || !state.meta) return;
    box.innerHTML = '';
    (state.meta.levels || []).forEach(function (lv) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = containerId.indexOf('rd-') === 0 ? 'rd-wmq-level' : 'wmq-level-btn';
      btn.setAttribute('aria-pressed', lv.id === selected ? 'true' : 'false');
      btn.disabled = !lv.available;
      var label = document.createElement('span');
      label.textContent = lv.label;
      btn.appendChild(label);
      if (!lv.available) {
        var prep = document.createElement('span');
        prep.className = containerId.indexOf('rd-') === 0 ? 'prep' : 'wmq-prep';
        prep.textContent = lv.readyLabel || '준비 중';
        btn.appendChild(prep);
      }
      btn.addEventListener('click', function () {
        if (!lv.available) return;
        onPick(lv.id);
      });
      box.appendChild(btn);
    });
  }

  function setProgress() {
    var cur = Math.min(state.index + 1, state.total);
    var label = $('wmq-progress-text');
    var bar = $('wmq-progress-fill');
    var levelEl = $('wmq-level-label');
    if (label) label.textContent = cur + ' / ' + state.total;
    if (bar) bar.style.width = (state.total ? (cur / state.total) * 100 : 0) + '%';
    if (levelEl) {
      var metaLv = (state.meta && state.meta.levels || []).find(function (l) {
        return l.id === state.level;
      });
      levelEl.textContent = metaLv ? metaLv.label : '전체';
    }
  }

  function renderQuestion() {
    var q = state.questions[state.index];
    if (!q) return;
    state.answered = Boolean(q.answered);
    state.lastAnswer = q.answered
      ? {
          correct: q.correct,
          correctKey: q.correctKey,
          correctMeaning: q.correctMeaning,
          contentUrl: q.contentUrl,
          chosenKey: q.chosenKey,
        }
      : null;

    setProgress();
    var wordEl = $('wmq-word');
    var opts = $('wmq-options');
    var fb = $('wmq-feedback');
    var detail = $('wmq-detail');

    if (wordEl) {
      wordEl.textContent = q.word;
      wordEl.removeAttribute('href');
      if (wordEl.tagName === 'A') {
        var span = document.createElement('div');
        span.id = 'wmq-word';
        span.className = 'wmq-word';
        span.textContent = q.word;
        wordEl.replaceWith(span);
        wordEl = span;
      }
    }

    if (opts) {
      opts.innerHTML = '';
      (q.options || []).forEach(function (opt, i) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'wmq-option';
        btn.dataset.key = opt.key;
        btn.innerHTML =
          '<span class="wmq-num">' +
          (i + 1) +
          '</span><span class="wmq-opt-text">' +
          escapeHtml(opt.text) +
          '</span>';
        btn.addEventListener('click', function () {
          answer(opt.key, btn);
        });
        opts.appendChild(btn);
      });
    }

    if (fb) {
      fb.textContent = '';
      fb.className = 'wmq-feedback';
    }
    if (detail) {
      detail.hidden = true;
      detail.innerHTML = '';
    }

    if (state.answered && state.lastAnswer) {
      applyAnswerUi(state.lastAnswer);
    } else {
      syncNavButtons();
    }

    syncWordFoot(q);

    var panel = $('wmq-quiz-panel');
    if (panel) panel.scrollIntoView({ block: 'start' });
  }

  function syncNavButtons() {
    var prevBtn = $('wmq-prev');
    var nextBtn = $('wmq-next');
    if (prevBtn) {
      prevBtn.disabled = state.index <= 0;
    }
    if (nextBtn) {
      nextBtn.disabled = !state.answered;
      nextBtn.textContent = state.index >= state.total - 1 ? '결과 보기' : '다음 문제';
    }
  }

  function applyAnswerUi(ans) {
    var opts = $('wmq-options');
    var fb = $('wmq-feedback');
    var detail = $('wmq-detail');
    var wordEl = $('wmq-word');
    if (!opts) return;

    Array.prototype.forEach.call(opts.querySelectorAll('.wmq-option'), function (btn) {
      btn.disabled = true;
      var key = btn.dataset.key;
      if (key === ans.correctKey) btn.classList.add('is-correct');
      else if (key === ans.chosenKey && !ans.correct) btn.classList.add('is-wrong');
      else btn.classList.add('is-dim');
    });

    if (fb) {
      fb.className = 'wmq-feedback ' + (ans.correct ? 'is-ok' : 'is-bad');
      fb.textContent = ans.correct
        ? '정답입니다'
        : '오답입니다. 정답: ' + (ans.correctMeaning || '');
    }

    var q = state.questions[state.index];
    if (wordEl && ans.contentUrl) {
      var a = document.createElement('a');
      a.id = 'wmq-word';
      a.className = 'wmq-word';
      a.textContent = q.word;
      a.href = ans.contentUrl;
      if (!isMobile()) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      wordEl.replaceWith(a);
    }

    if (detail) {
      if (ans.contentUrl) {
        detail.hidden = false;
        detail.innerHTML =
          '<a class="wmq-detail-link" href="' +
          escapeHtml(ans.contentUrl) +
          '"' +
          (isMobile() ? '' : ' target="_blank" rel="noopener noreferrer"') +
          '>이 단어 자세히 보기 →</a>';
      } else {
        detail.hidden = true;
      }
    }
    state.answered = true;
    syncNavButtons();
  }

  async function answer(key, btn) {
    if (state.answered) return;
    var opts = $('wmq-options');
    if (opts) {
      Array.prototype.forEach.call(opts.querySelectorAll('.wmq-option'), function (b) {
        b.disabled = true;
      });
    }
    if (btn) btn.classList.add('is-loading');
    try {
      var data = await fetchJson(apiBase() + '/api/word-meaning-quiz/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: state.sessionId,
          index: state.index,
          key: key,
        }),
      });
      var q = state.questions[state.index];
      q.answered = true;
      q.correct = data.correct;
      q.correctKey = data.correctKey;
      q.correctMeaning = data.correctMeaning;
      q.contentUrl = data.contentUrl;
      q.chosenKey = key;
      state.lastAnswer = data;
      applyAnswerUi(data);
      syncWordFoot(q);
    } catch (err) {
      showQuizError(err.message || '연결이 불안정해요', true);
      if (opts) {
        Array.prototype.forEach.call(opts.querySelectorAll('.wmq-option'), function (b) {
          b.disabled = false;
          b.classList.remove('is-loading');
        });
      }
    }
  }

  function showQuizError(msg, retry) {
    var box = $('wmq-error');
    if (!box) return;
    box.hidden = false;
    box.innerHTML =
      '<p>' +
      escapeHtml(msg) +
      '</p>' +
      (retry
        ? '<button type="button" class="wmq-btn wmq-btn-secondary" id="wmq-retry">다시 시도</button>'
        : '');
    var r = $('wmq-retry');
    if (r) {
      r.addEventListener('click', function () {
        box.hidden = true;
      });
    }
  }

  async function startQuiz(level) {
    state.level = level || 'all';
    saveLevel(state.level);
    var errBox = $('wmq-start-error');
    if (errBox) {
      errBox.hidden = true;
      errBox.textContent = '';
    }
    try {
      var data = await fetchJson(apiBase() + '/api/word-meaning-quiz/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: state.level }),
      });
      state.sessionId = data.sessionId;
      state.total = data.total;
      state.questions = data.questions || [];
      state.index = 0;
      saveSessionId(state.sessionId);
      showPanel('wmq-quiz-panel');
      renderQuestion();
    } catch (err) {
      var msg =
        (err.data && err.data.error) || err.message || '아직 문제를 만들 단어가 부족해요';
      showPanel('wmq-start-panel');
      if (errBox) {
        errBox.hidden = false;
        errBox.textContent = msg;
      } else {
        window.alert(msg);
      }
    }
  }

  async function resumeSession(sessionId) {
    try {
      var data = await fetchJson(
        apiBase() + '/api/word-meaning-quiz/session/' + encodeURIComponent(sessionId)
      );
      state.sessionId = data.sessionId;
      state.total = data.total;
      state.level = data.level || 'all';
      state.questions = data.questions || [];
      saveSessionId(state.sessionId);
      if (data.done) {
        await showResult();
        return;
      }
      state.index = data.nextIndex || 0;
      showPanel('wmq-quiz-panel');
      renderQuestion();
    } catch (e) {
      saveSessionId('');
      showPanel('wmq-start-panel');
    }
  }

  async function showResult() {
    try {
      var data = await fetchJson(
        apiBase() +
          '/api/word-meaning-quiz/result?sessionId=' +
          encodeURIComponent(state.sessionId)
      );
      showPanel('wmq-result-panel');
      var score = $('wmq-result-score');
      if (score) {
        score.textContent =
          data.correctCount +
          ' / ' +
          data.total +
          ' 정답 · 정답률 ' +
          data.rate +
          '%';
      }
      var list = $('wmq-result-list');
      if (list) {
        list.innerHTML = '';
        (data.items || []).forEach(function (it, i) {
          var li = document.createElement('li');
          li.className = 'wmq-result-item';
          var wordHtml = it.contentUrl
            ? '<a href="' +
              escapeHtml(it.contentUrl) +
              '"' +
              (isMobile() ? '' : ' target="_blank" rel="noopener noreferrer"') +
              '>' +
              escapeHtml(it.word) +
              '</a>'
            : escapeHtml(it.word);
          li.innerHTML =
            '<div class="wmq-ri-head"><span>' +
            (i + 1) +
            '. ' +
            wordHtml +
            '</span><span>' +
            (it.correct ? 'O' : 'X') +
            '</span></div>' +
            '<div>정답: ' +
            escapeHtml(it.correctMeaning || '') +
            '</div>' +
            '<div>내 답: ' +
            escapeHtml(it.myMeaning || '—') +
            '</div>';
          list.appendChild(li);
        });
      }
    } catch (err) {
      window.alert(err.message || '결과를 불러오지 못했습니다.');
    }
  }

  function bindQuizKeys() {
    document.addEventListener('keydown', function (e) {
      var panel = $('wmq-quiz-panel');
      if (!panel || panel.hidden) return;
      if (e.target && /input|textarea|select/i.test(e.target.tagName)) return;
      if (!state.answered && e.key >= '1' && e.key <= '4') {
        var idx = Number(e.key) - 1;
        var btn = $('wmq-options') && $('wmq-options').querySelectorAll('.wmq-option')[idx];
        if (btn && !btn.disabled) btn.click();
      }
      if (state.answered && e.key === 'Enter') {
        var next = $('wmq-next');
        if (next && !next.disabled) next.click();
      }
    });
  }

  async function initPage() {
    var params = new URLSearchParams(window.location.search);
    var resume = params.get('resume') === '1';
    var autostart = params.get('autostart') === '1';
    var levelQ = params.get('level');
    var sid = loadSessionId();

    /* 난이도 UI 미사용 — 항상 전체(또는 URL level) */
    state.level = levelQ || 'all';
    saveLevel(state.level);
    var levelsBox = $('wmq-levels');
    if (levelsBox) {
      levelsBox.hidden = true;
      levelsBox.innerHTML = '';
    }

    /* autostart/resume 시 시작 화면(난이도) 깜빡임 방지 */
    if (!(autostart || (resume && sid))) {
      showPanel('wmq-start-panel');
    }

    try {
      state.meta = await fetchJson(apiBase() + '/api/word-meaning-quiz/meta');
    } catch (e) {
      state.meta = {
        levels: [{ id: 'all', label: '전체', available: true, readyLabel: null }],
      };
    }

    var startBtn = $('wmq-start');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        startQuiz(state.level || 'all');
      });
    }
    var resumeBtn = $('wmq-resume');
    if (resumeBtn) {
      if (sid) {
        resumeBtn.hidden = false;
        resumeBtn.addEventListener('click', function () {
          resumeSession(sid);
        });
      } else {
        resumeBtn.hidden = true;
      }
    }
    var prevBtn = $('wmq-prev');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        if (state.index <= 0) return;
        state.index -= 1;
        renderQuestion();
      });
    }
    var nextBtn = $('wmq-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        if (!state.answered) return;
        if (state.index >= state.total - 1) {
          showResult();
          return;
        }
        state.index += 1;
        renderQuestion();
      });
    }
    var again = $('wmq-again');
    if (again) {
      again.addEventListener('click', function () {
        startQuiz(state.level || 'all');
      });
    }
    var changeLv = $('wmq-change-level');
    if (changeLv) {
      changeLv.addEventListener('click', function () {
        saveSessionId('');
        showPanel('wmq-start-panel');
      });
    }

    bindQuizKeys();
    bindWordFoot();

    if (resume && sid) {
      await resumeSession(sid);
    } else if (autostart) {
      await startQuiz(state.level || 'all');
    } else {
      showPanel('wmq-start-panel');
    }
  }

  /** index 홈 섹션 — 레벨 선택 UI 없음(전체만) */
  async function initHomeSection() {
    var root = document.getElementById('rd-wmq');
    if (!root) return;
    state.level = 'all';
    var levelsBox = document.getElementById('rd-wmq-levels');
    if (levelsBox) {
      levelsBox.hidden = true;
      levelsBox.innerHTML = '';
    }

    var start = document.getElementById('rd-wmq-start');
    if (start) {
      start.classList.remove('is-disabled');
      start.setAttribute('aria-disabled', 'false');
      start.href = 'word-meaning-quiz.html?level=all&autostart=1';
    }

    try {
      state.meta = await fetchJson(apiBase() + '/api/word-meaning-quiz/meta');
      var allLv = (state.meta.levels || []).find(function (x) {
        return x.id === 'all';
      });
      if (start && allLv && !allLv.available) {
        start.classList.add('is-disabled');
        start.setAttribute('aria-disabled', 'true');
        start.href = 'word-meaning-quiz.html';
      }
    } catch (e) {
      /* 시작 링크는 유지 */
    }

    var resume = document.getElementById('rd-wmq-resume');
    var sid = loadSessionId();
    if (resume) {
      if (!sid) {
        resume.hidden = true;
        return;
      }
      resume.hidden = false;
      resume.href = 'word-meaning-quiz.html?resume=1';
      fetchJson(apiBase() + '/api/word-meaning-quiz/session/' + encodeURIComponent(sid))
        .then(function (data) {
          var n = (data.nextIndex || 0) + 1;
          var total = data.total || 10;
          if (data.done) {
            resume.textContent = '결과 보기';
          } else {
            resume.textContent = '이어서 풀기 (' + n + ' / ' + total + ')';
          }
        })
        .catch(function () {
          resume.hidden = true;
          saveSessionId('');
        });
    }
  }

  if (document.body && document.body.classList.contains('wmq-page')) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPage);
    } else {
      initPage();
    }
  } else {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initHomeSection);
    } else {
      initHomeSection();
    }
  }
})();
