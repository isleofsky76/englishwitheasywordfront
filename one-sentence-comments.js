/**
 * 문장으로 익히는 단어 — 단어별 익명 댓글
 */
(function () {
  'use strict';

  var counts = Object.create(null);
  var badwords = { blocked: [], blockedHangulJamo: [], allowlist: [] };
  var listCache = Object.create(null);
  var POLICY_WARN = '사이트 규정에 어긋난 글은 관리자가 임의로 삭제할 수 있습니다.';

  var DIGIT_MAP = {
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '@': 'a',
    $: 's',
  };

  function apiBase() {
    if (window.OneSentencePage && typeof window.OneSentencePage.apiBase === 'function') {
      return window.OneSentencePage.apiBase();
    }
    if (typeof window.getPage30ApiBaseUrl === 'function') return window.getPage30ApiBaseUrl();
    return 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
  }

  function isAdmin() {
    return !!(window.OneSentencePage && window.OneSentencePage.isAdminUnlocked && window.OneSentencePage.isAdminUnlocked());
  }

  function hasLink(text) {
    return /https?:\/\/|www\./i.test(String(text || ''));
  }

  function normalizeForFilter(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[0-9@$]/g, function (ch) {
        return DIGIT_MAP[ch] || ch;
      })
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]+/gi, '');
  }

  function stripAllowlist(text) {
    var t = String(text || '').toLowerCase();
    (badwords.allowlist || []).forEach(function (a) {
      var needle = String(a || '')
        .toLowerCase()
        .trim();
      if (!needle) return;
      t = t.split(needle).join(' ');
    });
    return t;
  }

  function englishWordBoundaryHit(originalLower, word) {
    var w = String(word || '')
      .toLowerCase()
      .trim();
    if (!w || /[^a-z]/.test(w)) return false;
    var re = new RegExp('(?:^|[^a-z])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:[^a-z]|$)', 'i');
    return re.test(originalLower);
  }

  function containsBadWords(text) {
    var originalLower = stripAllowlist(text);
    var compact = normalizeForFilter(originalLower);
    var blocked = badwords.blocked || [];
    var jamo = badwords.blockedHangulJamo || [];
    var i;
    for (i = 0; i < blocked.length; i += 1) {
      var term = String(blocked[i] || '').trim();
      if (!term) continue;
      var tLower = term.toLowerCase();
      if (/^[a-z]+$/i.test(term)) {
        if (englishWordBoundaryHit(originalLower, tLower)) return true;
        if (compact.indexOf(normalizeForFilter(tLower)) !== -1) return true;
      } else if (originalLower.indexOf(tLower) !== -1 || compact.indexOf(normalizeForFilter(tLower)) !== -1) {
        return true;
      }
    }
    for (i = 0; i < jamo.length; i += 1) {
      var j = String(jamo[i] || '').trim();
      if (!j) continue;
      if (compact.indexOf(normalizeForFilter(j)) !== -1 || String(text || '').replace(/\s+/g, '').indexOf(j) !== -1) {
        return true;
      }
    }
    return false;
  }

  function clientValidate(nickname, body, password) {
    var nick = String(nickname || '').trim();
    var text = String(body || '').trim();
    var pw = String(password || '');
    if (!text) return '댓글 내용을 입력해 주세요.';
    if (text.length > 100) return '댓글은 100자까지 입력할 수 있어요.';
    if (nick.length > 10) return '닉네임은 10자까지 입력할 수 있어요.';
    if (!pw || pw.length > 14 || /\s/.test(pw)) return '비밀번호는 1~14자로 입력해 주세요. (공백 불가)';
    if (hasLink(text) || hasLink(nick)) return '링크는 포함할 수 없어요.';
    if (containsBadWords(text) || containsBadWords(nick)) return '사용할 수 없는 표현이 포함되어 있어요.';
    return '';
  }

  function formatDate(d) {
    var dt = d ? new Date(d) : null;
    if (!dt || isNaN(dt.getTime())) return '';
    var y = dt.getFullYear();
    var m = String(dt.getMonth() + 1).padStart(2, '0');
    var day = String(dt.getDate()).padStart(2, '0');
    return y + '.' + m + '.' + day;
  }

  async function fetchJson(url, opts) {
    var res = await fetch(url, opts);
    var data = null;
    try {
      data = await res.json();
    } catch (e) {
      data = null;
    }
    if (!res.ok) {
      var err = new Error((data && data.error) || 'HTTP ' + res.status);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  async function loadBadwords() {
    try {
      var res = await fetch('comment-badwords.json?v=20261101c1', { cache: 'no-store' });
      if (!res.ok) return;
      badwords = await res.json();
    } catch (e) {
      console.warn('[os-comments] badwords load failed', e);
    }
  }

  async function loadCounts() {
    try {
      var data = await fetchJson(apiBase().replace(/\/$/, '') + '/onesentence/comments/counts', {
        cache: 'no-store',
      });
      counts = data && data.counts ? data.counts : {};
    } catch (e) {
      console.warn('[os-comments] counts load failed', e);
      counts = {};
    }
  }

  function setToggleLabel(btn, n) {
    var count = Number(n) || 0;
    btn.textContent = count > 0 ? '댓글 ' + count : '댓글';
    btn.classList.toggle('is-empty', count === 0);
    btn.setAttribute('aria-expanded', btn.getAttribute('aria-expanded') === 'true' ? 'true' : 'false');
  }

  function renderCommentList(listEl, comments, wordKey) {
    listEl.textContent = '';
    if (!comments || !comments.length) {
      var empty = document.createElement('p');
      empty.className = 'os-cmt-empty';
      empty.textContent = '아직 댓글이 없습니다.';
      listEl.appendChild(empty);
      return;
    }
    comments.forEach(function (c) {
      var row = document.createElement('div');
      row.className = 'os-cmt-item';
      row.setAttribute('data-cmt-id', c.id);

      var meta = document.createElement('div');
      meta.className = 'os-cmt-meta';
      var nick = document.createElement('span');
      nick.className = 'os-cmt-nick';
      nick.textContent = c.nickname && String(c.nickname).trim() ? String(c.nickname).trim() : '익명';
      var date = document.createElement('span');
      date.className = 'os-cmt-date';
      date.textContent = formatDate(c.date);
      meta.appendChild(nick);
      meta.appendChild(date);

      var body = document.createElement('p');
      body.className = 'os-cmt-body';
      body.textContent = c.body || '';

      var actions = document.createElement('div');
      actions.className = 'os-cmt-actions';

      var delBtn = document.createElement('button');
      delBtn.type = 'button';
      delBtn.className = 'os-cmt-del';
      delBtn.textContent = '삭제';
      delBtn.addEventListener('click', function () {
        openDeleteUi(actions, c.id, wordKey, false);
      });
      actions.appendChild(delBtn);

      if (isAdmin()) {
        var adminDel = document.createElement('button');
        adminDel.type = 'button';
        adminDel.className = 'os-cmt-del os-cmt-admin-del';
        adminDel.textContent = '관리자 삭제';
        adminDel.addEventListener('click', function () {
          adminDeleteComment(c.id, wordKey);
        });
        actions.appendChild(adminDel);
      }

      row.appendChild(meta);
      row.appendChild(body);
      row.appendChild(actions);
      listEl.appendChild(row);
    });
  }

  function openDeleteUi(actionsEl, commentId, wordKey) {
    actionsEl.textContent = '';
    var wrap = document.createElement('div');
    wrap.className = 'os-cmt-del-form';

    var input = document.createElement('input');
    input.type = 'password';
    input.maxLength = 14;
    input.placeholder = '1~14자';
    input.className = 'os-cmt-del-pw';
    input.setAttribute('aria-label', '삭제 비밀번호');
    input.autocomplete = 'new-password';

    var msg = document.createElement('p');
    msg.className = 'os-cmt-msg';

    var ok = document.createElement('button');
    ok.type = 'button';
    ok.className = 'os-cmt-btn';
    ok.textContent = '확인';
    ok.addEventListener('click', async function () {
      var pw = input.value;
      if (!pw || pw.length > 14 || /\s/.test(pw)) {
        msg.textContent = '비밀번호는 1~14자로 입력해 주세요. (공백 불가)';
        return;
      }
      ok.disabled = true;
      try {
        await fetchJson(apiBase().replace(/\/$/, '') + '/onesentence/comments/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: commentId, password: pw }),
        });
        delete listCache[wordKey];
        counts[wordKey] = Math.max(0, (counts[wordKey] || 1) - 1);
        await refreshPanel(wordKey);
      } catch (err) {
        msg.textContent = err && err.message ? err.message : '삭제에 실패했어요.';
        ok.disabled = false;
      }
    });

    var cancel = document.createElement('button');
    cancel.type = 'button';
    cancel.className = 'os-cmt-btn os-cmt-btn-ghost';
    cancel.textContent = '취소';
    cancel.addEventListener('click', async function () {
      delete listCache[wordKey];
      await refreshPanel(wordKey);
    });

    wrap.appendChild(input);
    wrap.appendChild(ok);
    wrap.appendChild(cancel);
    wrap.appendChild(msg);
    actionsEl.appendChild(wrap);
    input.focus();
  }

  async function adminDeleteComment(commentId, wordKey) {
    var pw = window.prompt('관리자 비밀번호를 입력하세요:');
    if (pw == null || !String(pw).trim()) return;
    try {
      await fetchJson(apiBase().replace(/\/$/, '') + '/onesentence/comments/admin/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: commentId, adminPasswordInput: String(pw) }),
      });
      delete listCache[wordKey];
      counts[wordKey] = Math.max(0, (counts[wordKey] || 1) - 1);
      await refreshPanel(wordKey);
    } catch (err) {
      window.alert(err && err.message ? err.message : '삭제 실패');
    }
  }

  async function loadComments(wordKey) {
    if (listCache[wordKey]) return listCache[wordKey];
    var data = await fetchJson(
      apiBase().replace(/\/$/, '') + '/onesentence/comments?wordKey=' + encodeURIComponent(wordKey),
      { cache: 'no-store' }
    );
    var list = (data && data.comments) || [];
    listCache[wordKey] = list;
    counts[wordKey] = list.length;
    return list;
  }

  function findCommentsRoot(wordKey) {
    var items = document.querySelectorAll('.os-item[data-word-key]');
    for (var i = 0; i < items.length; i += 1) {
      if (items[i].getAttribute('data-word-key') === wordKey) {
        return items[i].querySelector('[data-os-comments-root]');
      }
    }
    return null;
  }

  async function refreshPanel(wordKey) {
    var root = findCommentsRoot(wordKey);
    if (!root) return;
    var btn = root.querySelector('[data-os-cmt-toggle]');
    var panel = root.querySelector('[data-os-cmt-panel]');
    var listEl = root.querySelector('[data-os-cmt-list]');
    if (btn) setToggleLabel(btn, counts[wordKey] || 0);
    if (panel && !panel.hidden && listEl) {
      try {
        var list = await loadComments(wordKey);
        renderCommentList(listEl, list, wordKey);
        if (btn) setToggleLabel(btn, list.length);
      } catch (e) {
        listEl.textContent = '';
        var err = document.createElement('p');
        err.className = 'os-cmt-msg';
        err.textContent = '댓글을 불러오지 못했어요.';
        listEl.appendChild(err);
      }
    } else if (btn) {
      setToggleLabel(btn, counts[wordKey] || 0);
    }
  }

  function buildPanel(itemEl) {
    var wordKey = itemEl.getAttribute('data-word-key') || '';
    var word = itemEl.getAttribute('data-word') || '';
    var pos = itemEl.getAttribute('data-pos') || '';
    var root = itemEl.querySelector('[data-os-comments-root]');
    if (!root || !wordKey) return;
    root.textContent = '';

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'os-cmt-toggle';
    toggle.setAttribute('data-os-cmt-toggle', '');
    toggle.setAttribute('aria-expanded', 'false');
    setToggleLabel(toggle, counts[wordKey] || 0);

    var panel = document.createElement('div');
    panel.className = 'os-cmt-panel';
    panel.setAttribute('data-os-cmt-panel', '');
    panel.hidden = true;

    var warn = document.createElement('p');
    warn.className = 'os-cmt-policy';
    warn.textContent = POLICY_WARN;

    var listEl = document.createElement('div');
    listEl.className = 'os-cmt-list';
    listEl.setAttribute('data-os-cmt-list', '');

    var form = document.createElement('form');
    form.className = 'os-cmt-form';
    form.setAttribute('autocomplete', 'off');

    var nickLabel = document.createElement('label');
    nickLabel.className = 'os-cmt-field';
    var nickSpan = document.createElement('span');
    nickSpan.textContent = '닉네임 (선택)';
    var nickInput = document.createElement('input');
    nickInput.type = 'text';
    nickInput.maxLength = 10;
    nickInput.placeholder = '익명';
    nickInput.name = 'nickname';
    nickLabel.appendChild(nickSpan);
    nickLabel.appendChild(nickInput);

    var bodyLabel = document.createElement('label');
    bodyLabel.className = 'os-cmt-field';
    var bodySpan = document.createElement('span');
    bodySpan.textContent = '댓글';
    var bodyInput = document.createElement('textarea');
    bodyInput.rows = 2;
    bodyInput.maxLength = 100;
    bodyInput.required = true;
    bodyInput.name = 'body';
    bodyInput.placeholder = '한 줄 메모처럼 남겨 보세요';
    var counter = document.createElement('span');
    counter.className = 'os-cmt-counter';
    counter.textContent = '0/100';
    bodyInput.addEventListener('input', function () {
      counter.textContent = String(bodyInput.value.length) + '/100';
    });
    bodyLabel.appendChild(bodySpan);
    bodyLabel.appendChild(bodyInput);
    bodyLabel.appendChild(counter);

    var pwLabel = document.createElement('label');
    pwLabel.className = 'os-cmt-field';
    var pwSpan = document.createElement('span');
    pwSpan.textContent = '비밀번호 (1~14자, 영문·숫자·특수문자)';
    var pwInput = document.createElement('input');
    pwInput.type = 'password';
    pwInput.maxLength = 14;
    pwInput.required = true;
    pwInput.name = 'password';
    pwInput.placeholder = '삭제 시 필요';
    pwInput.autocomplete = 'new-password';
    pwInput.addEventListener('input', function () {
      pwInput.value = pwInput.value.replace(/\s/g, '').slice(0, 14);
    });
    pwLabel.appendChild(pwSpan);
    pwLabel.appendChild(pwInput);

    var formMsg = document.createElement('p');
    formMsg.className = 'os-cmt-msg';
    formMsg.setAttribute('aria-live', 'polite');

    var submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'os-cmt-submit';
    submit.textContent = '등록';

    form.appendChild(nickLabel);
    form.appendChild(bodyLabel);
    form.appendChild(pwLabel);
    form.appendChild(formMsg);
    form.appendChild(submit);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var err = clientValidate(nickInput.value, bodyInput.value, pwInput.value);
      if (err) {
        formMsg.textContent = err;
        return;
      }
      submit.disabled = true;
      formMsg.textContent = '등록 중…';
      try {
        await fetchJson(apiBase().replace(/\/$/, '') + '/onesentence/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            wordKey: wordKey,
            word: word,
            pos: pos,
            nickname: nickInput.value,
            body: bodyInput.value,
            password: pwInput.value,
          }),
        });
        nickInput.value = '';
        bodyInput.value = '';
        pwInput.value = '';
        counter.textContent = '0/100';
        formMsg.textContent = '';
        delete listCache[wordKey];
        counts[wordKey] = (counts[wordKey] || 0) + 1;
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'true');
        await refreshPanel(wordKey);
      } catch (ex) {
        formMsg.textContent = ex && ex.message ? ex.message : '등록에 실패했어요.';
      } finally {
        submit.disabled = false;
      }
    });

    toggle.addEventListener('click', async function () {
      var open = panel.hidden;
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        listEl.textContent = '';
        var loading = document.createElement('p');
        loading.className = 'os-cmt-empty';
        loading.textContent = '불러오는 중…';
        listEl.appendChild(loading);
        try {
          var list = await loadComments(wordKey);
          renderCommentList(listEl, list, wordKey);
          setToggleLabel(toggle, list.length);
        } catch (err) {
          listEl.textContent = '';
          var fail = document.createElement('p');
          fail.className = 'os-cmt-msg';
          fail.textContent = '댓글을 불러오지 못했어요.';
          listEl.appendChild(fail);
        }
      }
    });

    panel.appendChild(warn);
    panel.appendChild(listEl);
    panel.appendChild(form);
    root.appendChild(toggle);
    root.appendChild(panel);
  }

  function mountAll() {
    document.querySelectorAll('.os-item[data-word-key]').forEach(buildPanel);
  }

  async function init() {
    await loadBadwords();
    await loadCounts();
    mountAll();
  }

  window.OsComments = {
    mountAll: mountAll,
    refreshCounts: loadCounts,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
