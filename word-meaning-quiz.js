/**
 * 영단어 복습 — EN → KO 4지선다
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'wmq-session-id';
  var LEVEL_KEY = 'wmq-level';

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
    var nextBtn = $('wmq-next');

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
          '</span><span class="wmq-keyhint" aria-hidden="true">' +
          (i + 1) +
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
    if (nextBtn) {
      nextBtn.disabled = !state.answered;
      nextBtn.textContent = state.index >= state.total - 1 ? '결과 보기' : '다음 문제';
    }

    if (state.answered && state.lastAnswer) {
      applyAnswerUi(state.lastAnswer);
    }

    var panel = $('wmq-quiz-panel');
    if (panel) panel.scrollIntoView({ block: 'start' });
  }

  function applyAnswerUi(ans) {
    var opts = $('wmq-options');
    var fb = $('wmq-feedback');
    var detail = $('wmq-detail');
    var wordEl = $('wmq-word');
    var nextBtn = $('wmq-next');
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
    if (nextBtn) nextBtn.disabled = false;
    state.answered = true;
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
    showPanel('wmq-start-panel');
    try {
      state.meta = await fetchJson(apiBase() + '/api/word-meaning-quiz/meta');
    } catch (e) {
      state.meta = {
        levels: [{ id: 'all', label: '전체', available: false, readyLabel: '준비 중' }],
      };
    }
    state.level = loadLevel();
    var allMeta = (state.meta.levels || []).find(function (l) {
      return l.id === state.level;
    });
    if (!allMeta || !allMeta.available) state.level = 'all';

    function onLevelPick(id) {
      state.level = id;
      saveLevel(id);
      renderLevels('wmq-levels', state.level, onLevelPick);
    }
    renderLevels('wmq-levels', state.level, onLevelPick);

    var startBtn = $('wmq-start');
    if (startBtn) {
      startBtn.addEventListener('click', function () {
        startQuiz(state.level);
      });
    }
    var resumeBtn = $('wmq-resume');
    var sid = loadSessionId();
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
        startQuiz(state.level);
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

    var params = new URLSearchParams(window.location.search);
    var resume = params.get('resume');
    var levelQ = params.get('level');
    if (levelQ) {
      state.level = levelQ;
      saveLevel(levelQ);
      renderLevels('wmq-levels', state.level, onLevelPick);
    }
    if (resume === '1' && sid) {
      resumeSession(sid);
    } else if (params.get('autostart') === '1') {
      startQuiz(state.level);
    }
  }

  /** index 홈 섹션 */
  async function initHomeSection() {
    var root = document.getElementById('rd-wmq');
    if (!root) return;
    try {
      state.meta = await fetchJson(apiBase() + '/api/word-meaning-quiz/meta');
    } catch (e) {
      state.meta = {
        levels: [
          { id: 'all', label: '전체', available: false, readyLabel: '준비 중' },
          { id: 'beginner', label: '초급', available: false, readyLabel: '준비 중' },
          { id: 'intermediate', label: '중급', available: false, readyLabel: '준비 중' },
          { id: 'advanced', label: '고급', available: false, readyLabel: '준비 중' },
        ],
      };
    }
    state.level = 'all';
    var levelsBox = document.getElementById('rd-wmq-levels');
    function paint() {
      if (!levelsBox) return;
      levelsBox.innerHTML = '';
      (state.meta.levels || []).forEach(function (lv) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'rd-wmq-level';
        btn.setAttribute('aria-pressed', lv.id === state.level ? 'true' : 'false');
        btn.disabled = !lv.available;
        btn.innerHTML =
          '<span>' +
          escapeHtml(lv.label) +
          '</span>' +
          (lv.available
            ? ''
            : '<span class="prep">' + escapeHtml(lv.readyLabel || '준비 중') + '</span>');
        btn.addEventListener('click', function () {
          if (!lv.available) return;
          state.level = lv.id;
          paint();
          syncStartHref();
        });
        levelsBox.appendChild(btn);
      });
    }
    function syncStartHref() {
      var a = document.getElementById('rd-wmq-start');
      if (!a) return;
      var lv = (state.meta.levels || []).find(function (x) {
        return x.id === state.level;
      });
      var ok = lv && lv.available;
      a.classList.toggle('is-disabled', !ok);
      a.setAttribute('aria-disabled', ok ? 'false' : 'true');
      a.href = ok
        ? 'word-meaning-quiz.html?level=' + encodeURIComponent(state.level) + '&autostart=1'
        : 'word-meaning-quiz.html';
    }
    paint();
    syncStartHref();

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
