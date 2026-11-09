/*!
 * dict-lookup.js — 영어 단어에 마우스를 올리면 뜻 팝업을 띄웁니다.
 *  1순위: 내 사이트 단어 데이터(window.DICT_WORDS)의 뜻 + "자세히 보기" + "단어장에 저장"
 *  2순위: 팝업 아래쪽의 사전 링크(네이버 · Cambridge)
 * 터치 기기에서는 단어를 길게 눌러 선택하면 같은 팝업이 뜹니다. 의존성 없음.
 *
 * 사용법 (</body> 바로 위):
 *   <script src="/words-data.js"></script>        ← 단어 데이터
 *   <script src="/dict-lookup.js" defer></script> ← 이 파일
 * 설정을 바꾸려면 두 줄보다 먼저 window.DICT_CONFIG = { container: '.sentence-list' } 처럼 넣으세요.
 */
(function () {
  'use strict';

  /* ===== 설정 (window.DICT_CONFIG로 덮어쓰기 가능) ===== */
  const CONFIG = Object.assign({
    container: null,                    // 팝업을 켤 영역. null = 페이지 전체
    hoverDelay: 350,                    // 마우스를 올리고 팝업이 뜨기까지(ms)
    hideDelay: 250,                     // 벗어난 뒤 사라지기까지(ms)
    maxWords: 4,                        // 터치 선택 시 최대 단어 수
    wordUrl: (w) => '/word/' + encodeURIComponent(w),   // 내 사이트 단어 페이지 주소
    storageKey: 'dl-saved-words',
    dictionaries: [
      { label: '네이버', url: (q) => 'https://en.dict.naver.com/#/search?query=' + encodeURIComponent(q) },
      { label: 'Cambridge', url: (q) => 'https://dictionary.cambridge.org/dictionary/english-korean/' + encodeURIComponent(q.toLowerCase().replace(/ /g, '-')) },
    ],
  }, window.DICT_CONFIG || {});

  const WORDS = window.DICT_WORDS || {};
  const IRREGULAR = window.DICT_IRREGULAR || {};
  const WORD_CHAR = /[A-Za-z'’\-]/;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasHighlight = typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight !== 'undefined';

  /* ===== 단어 원형 찾기 (decided → decide, prices → price …) ===== */
  function findEntry(raw) {
    const w = raw.toLowerCase();
    const tries = [w];
    if (IRREGULAR[w]) tries.push(IRREGULAR[w]);
    if (/ies$/.test(w)) tries.push(w.slice(0, -3) + 'y');
    if (/ied$/.test(w)) tries.push(w.slice(0, -3) + 'y');
    if (/es$/.test(w)) tries.push(w.slice(0, -2));
    if (/s$/.test(w)) tries.push(w.slice(0, -1));
    if (/ed$/.test(w)) { tries.push(w.slice(0, -2), w.slice(0, -1)); if (/(.)\1ed$/.test(w)) tries.push(w.slice(0, -3)); }
    if (/ing$/.test(w)) { tries.push(w.slice(0, -3), w.slice(0, -3) + 'e'); if (/(.)\1ing$/.test(w)) tries.push(w.slice(0, -4)); }
    for (const t of tries) if (WORDS[t]) return { lemma: t, ...WORDS[t] };
    return null;
  }

  /* ===== 저장한 단어 (이 브라우저에만 저장) ===== */
  // 저장 형식: [{ word, pos, meaning, sentence, at }]
  function loadSaved() {
    try {
      const list = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      return list.map((x) => (typeof x === 'string' ? { word: x } : x));
    } catch (e) { return []; }
  }
  function writeSaved(list) {
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(list)); } catch (e) { /* 저장 불가 환경 */ }
  }
  let saved = loadSaved();
  const isSaved = (w) => saved.some((x) => x.word === w);

  function sentenceOf(node) {
    const e = node && (node.nodeType === 1 ? node : node.parentElement);
    const block = e && e.closest('p, li, blockquote, td, h1, h2, h3, article, section, div');
    return block ? block.textContent.replace(/\s+/g, ' ').trim() : '';
  }

  /* ===== 텍스트로 내보내기 ===== */
  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function exportText() {
    const lines = ['시사영단어 · 내 단어장 (' + today() + ', ' + saved.length + '개)', ''];
    saved.forEach((x, i) => {
      const entry = WORDS[x.word] || {};
      const pos = x.pos || entry.pos || '';
      const meaning = x.meaning || entry.meaning || '';
      lines.push((i + 1) + '. ' + x.word + (pos ? '  [' + pos + ']' : '') + (meaning ? '  ' + meaning : ''));
      if (x.sentence) lines.push('   ' + x.sentence);
      lines.push('');
    });
    return lines.join('\r\n');
  }
  function downloadText() {
    const blob = new Blob(['﻿' + exportText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '내단어장-' + today() + '.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ===== 스타일 ===== */
  const style = document.createElement('style');
  style.textContent = `
    :root{--dl-bg:#fdfbf5;--dl-foot:#f6f1e4;--dl-line:#d9cfb6;--dl-rule:#ebe3cf;--dl-ink:#2a241a;--dl-muted:#6f6656;--dl-link:#6b4a17;--dl-link-hi:#3b2a0e;--dl-dot:#c9bd9f;--dl-mark:#f6efdc;--dl-shadow:rgba(60,45,20,.14)}
    @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--dl-bg:#26221a;--dl-foot:#1f1c15;--dl-line:#4a4232;--dl-rule:#3a3427;--dl-ink:#efe8d8;--dl-muted:#ada390;--dl-link:#e0bb76;--dl-link-hi:#f3d59c;--dl-dot:#5c533f;--dl-mark:#3d3320;--dl-shadow:rgba(0,0,0,.45)}}
    :root[data-theme="dark"]{--dl-bg:#26221a;--dl-foot:#1f1c15;--dl-line:#4a4232;--dl-rule:#3a3427;--dl-ink:#efe8d8;--dl-muted:#ada390;--dl-link:#e0bb76;--dl-link-hi:#f3d59c;--dl-dot:#5c533f;--dl-mark:#3d3320;--dl-shadow:rgba(0,0,0,.45)}

    .dl-bubble{position:fixed;z-index:2147483000;display:none;flex-direction:column;align-items:center;
      padding-top:8px;transform:translateX(-50%);opacity:0;transition:opacity .15s ease;text-align:left}
    .dl-bubble.dl-show{display:flex}
    .dl-bubble.dl-in{opacity:1}
    .dl-bubble.dl-above{flex-direction:column-reverse;padding-top:0;padding-bottom:8px}
    .dl-arrow{width:9px;height:9px;background:var(--dl-bg);border:1px solid var(--dl-line);border-right:0;border-bottom:0;
      transform:rotate(45deg);margin-bottom:-5px;position:relative;z-index:1}
    .dl-above .dl-arrow{transform:rotate(225deg);margin:-5px 0 0}
    .dl-card{width:min(288px,calc(100vw - 24px));box-sizing:border-box;display:flex;flex-direction:column;
      background:var(--dl-bg);border:1px solid var(--dl-line);border-radius:6px;box-shadow:0 8px 22px var(--dl-shadow);
      font-family:"Source Serif 4",Georgia,"Times New Roman",serif;line-height:1.4;color:var(--dl-ink)}
    .dl-sans{font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif}
    .dl-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;padding:12px 16px 8px}
    .dl-word{font-size:20px;font-style:italic;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .dl-pos{font-size:11px;letter-spacing:.06em;color:var(--dl-muted);white-space:nowrap}
    .dl-body{display:flex;flex-direction:column;gap:10px;padding:0 16px 12px}
    .dl-meaning{font-size:15px;font-weight:500}
    .dl-lemma{font-size:12px;color:var(--dl-muted)}
    .dl-actions{display:flex;align-items:center;justify-content:space-between;gap:8px}
    .dl-more{font-size:13px;font-weight:700;color:var(--dl-link);text-decoration:none;padding:6px 0}
    .dl-more:hover,.dl-more:focus-visible{color:var(--dl-link-hi);text-decoration:underline;text-underline-offset:3px;outline:none}
    .dl-save{font:12px/1 inherit;color:var(--dl-link);background:transparent;border:1px solid var(--dl-line);border-radius:4px;padding:7px 10px;cursor:pointer}
    .dl-save:hover,.dl-save:focus-visible{border-color:var(--dl-link);outline:none}
    .dl-save[aria-pressed="true"]{background:var(--dl-mark);border-color:var(--dl-link)}
    .dl-foot{display:flex;align-items:center;flex-wrap:wrap;gap:2px;padding:7px 10px 8px 11px;border-top:1px solid var(--dl-rule);
      background:var(--dl-foot);border-radius:0 0 6px 6px;font-size:13px}
    .dl-foot a{padding:4px 5px;color:var(--dl-link);text-decoration:none;border-radius:3px}
    .dl-foot a:hover,.dl-foot a:focus-visible{color:var(--dl-link-hi);text-decoration:underline;text-underline-offset:3px;outline:none}
    .dl-dot{color:var(--dl-dot)}
    ::highlight(dl-word){background-color:var(--dl-mark)}
    @media (prefers-reduced-motion: reduce){.dl-bubble{transition:none}}
  `;
  document.head.appendChild(style);

  /* ===== 팝업 뼈대 ===== */
  const bubble = document.createElement('div');
  bubble.className = 'dl-bubble';
  bubble.innerHTML =
    '<div class="dl-arrow" aria-hidden="true"></div>' +
    '<div class="dl-card" role="dialog" aria-label="단어 뜻">' +
      '<div class="dl-head"><span class="dl-word"></span><span class="dl-pos dl-sans"></span></div>' +
      '<div class="dl-body dl-sans">' +
        '<div class="dl-meaning"></div><div class="dl-lemma"></div>' +
        '<div class="dl-actions"><a class="dl-more" href="#">예문·뜻 자세히 보기 →</a>' +
        '<button type="button" class="dl-save dl-sans" aria-pressed="false">단어장에 저장</button></div>' +
      '</div>' +
      '<div class="dl-foot"></div>' +
    '</div>';
  const $ = (s) => bubble.querySelector(s);
  const el = {
    word: $('.dl-word'), pos: $('.dl-pos'), body: $('.dl-body'), meaning: $('.dl-meaning'),
    lemma: $('.dl-lemma'), more: $('.dl-more'), save: $('.dl-save'), foot: $('.dl-foot'),
  };
  const extLinks = CONFIG.dictionaries.map((d, i) => {
    if (i > 0) {
      const dot = document.createElement('span');
      dot.className = 'dl-dot'; dot.setAttribute('aria-hidden', 'true'); dot.textContent = '·';
      el.foot.appendChild(dot);
    }
    const a = document.createElement('a');
    a.textContent = d.label; a.target = '_blank'; a.rel = 'noopener noreferrer';
    el.foot.appendChild(a);
    return a;
  });
  bubble.addEventListener('mousedown', (e) => { if (e.target.tagName !== 'A') e.preventDefault(); });
  document.body.appendChild(bubble);

  let current = null;   // { word, entry }
  let showTimer = null;
  let hideTimer = null;

  function emit(name, detail) {
    const ev = new CustomEvent(name, { detail, cancelable: true });
    document.dispatchEvent(ev);
    return ev;
  }

  function renderSave() {
    const on = !!(current && current.entry && isSaved(current.entry.lemma));
    el.save.setAttribute('aria-pressed', String(on));
    el.save.textContent = on ? '저장됨 ✓' : '단어장에 저장';
  }

  el.save.addEventListener('click', () => {
    if (!current || !current.entry) return;
    const e = current.entry;
    saved = isSaved(e.lemma)
      ? saved.filter((x) => x.word !== e.lemma)
      : saved.concat({ word: e.lemma, pos: e.pos || '', meaning: e.meaning || '', sentence: current.sentence || '', at: today() });
    writeSaved(saved);
    renderSave();
    emit('dict:saved', { word: e.lemma, saved: isSaved(e.lemma), list: saved.slice() });
  });

  el.more.addEventListener('click', (e) => {
    if (!current || !current.entry) return;
    const ev = emit('dict:open-word', { word: current.entry.lemma, url: el.more.getAttribute('href') });
    if (ev.defaultPrevented) e.preventDefault();
  });

  extLinks.forEach((a, i) => a.addEventListener('click', () => {
    if (current) emit('dict:external', { word: current.word, dictionary: CONFIG.dictionaries[i].label, url: a.href });
  }));

  function show(word, rect, sentence) {
    clearTimeout(hideTimer);
    const entry = findEntry(word);
    current = { word, entry, sentence };

    el.word.textContent = word.toLowerCase();
    el.pos.textContent = entry ? entry.pos || '' : '';
    el.body.hidden = !entry;
    if (entry) {
      el.meaning.textContent = entry.meaning;
      el.lemma.textContent = entry.lemma !== word.toLowerCase() ? '기본형 ' + entry.lemma : '';
      el.lemma.hidden = !el.lemma.textContent;
      el.more.href = CONFIG.wordUrl(entry.lemma);
      renderSave();
    }
    const q = entry ? entry.lemma : word.toLowerCase();
    CONFIG.dictionaries.forEach((d, i) => { extLinks[i].href = d.url(q); });

    bubble.classList.remove('dl-above', 'dl-in');
    bubble.classList.add('dl-show');
    const bh = bubble.offsetHeight;
    const bw = bubble.offsetWidth;
    const vw = document.documentElement.clientWidth;
    let top = rect.bottom;
    if (top + bh > window.innerHeight - 8) { bubble.classList.add('dl-above'); top = rect.top - bh; }
    const left = Math.max(bw / 2 + 8, Math.min(vw - bw / 2 - 8, rect.left + rect.width / 2));
    bubble.style.top = Math.max(8, top) + 'px';
    bubble.style.left = left + 'px';
    requestAnimationFrame(() => bubble.classList.add('dl-in'));
    emit('dict:show', { word, found: !!entry });
  }

  function hide() {
    clearTimeout(showTimer); clearTimeout(hideTimer);
    bubble.classList.remove('dl-show', 'dl-in');
    current = null;
    if (hasHighlight) CSS.highlights.delete('dl-word');
  }
  function scheduleHide() { clearTimeout(hideTimer); hideTimer = setTimeout(hide, CONFIG.hideDelay); }

  function isAllowed(node) {
    const e = node.nodeType === 1 ? node : node.parentElement;
    if (!e) return false;
    if (e.closest('input, textarea, select, button, a, code, pre, [contenteditable=""], [contenteditable="true"], .dl-bubble')) return false;
    if (CONFIG.container && !e.closest(CONFIG.container)) return false;
    return true;
  }

  /* ===== 마우스 오버 ===== */
  function caretAt(x, y) {
    if (document.caretPositionFromPoint) {
      const p = document.caretPositionFromPoint(x, y);
      return p ? { node: p.offsetNode, offset: p.offset } : null;
    }
    if (document.caretRangeFromPoint) {
      const r = document.caretRangeFromPoint(x, y);
      return r ? { node: r.startContainer, offset: r.startOffset } : null;
    }
    return null;
  }

  function wordAtPoint(x, y) {
    const c = caretAt(x, y);
    if (!c || !c.node || c.node.nodeType !== 3 || !isAllowed(c.node)) return null;
    const text = c.node.data;
    let s = c.offset, e = c.offset;
    while (s > 0 && WORD_CHAR.test(text[s - 1])) s--;
    while (e < text.length && WORD_CHAR.test(text[e])) e++;
    while (s < e && !/[A-Za-z]/.test(text[s])) s++;
    while (e > s && !/[A-Za-z]/.test(text[e - 1])) e--;
    const word = text.slice(s, e);
    if (!/^[A-Za-z][A-Za-z'’\-]*$/.test(word)) return null;
    const range = document.createRange();
    range.setStart(c.node, s); range.setEnd(c.node, e);
    const hit = Array.from(range.getClientRects()).find(
      (r) => x >= r.left - 1 && x <= r.right + 1 && y >= r.top - 1 && y <= r.bottom + 1
    );
    return hit ? { word: word.replace(/’/g, "'"), range, rect: hit } : null;
  }

  if (canHover) {
    let pending = null;
    let last = 0;
    document.addEventListener('mousemove', (ev) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      if (bubble.contains(ev.target)) { clearTimeout(hideTimer); clearTimeout(showTimer); pending = null; return; }

      const found = wordAtPoint(ev.clientX, ev.clientY);
      if (!found) {
        clearTimeout(showTimer); pending = null;
        if (current) scheduleHide();
        return;
      }
      if (current && found.word === current.word) { clearTimeout(hideTimer); return; }
      if (pending && pending.word === found.word) return;

      pending = found;
      clearTimeout(showTimer);
      showTimer = setTimeout(() => {
        if (hasHighlight) CSS.highlights.set('dl-word', new Highlight(found.range));
        show(found.word, found.rect, sentenceOf(found.range.startContainer));
        pending = null;
      }, current ? 120 : CONFIG.hoverDelay);
    }, { passive: true });
    bubble.addEventListener('mouseleave', scheduleHide);
    document.documentElement.addEventListener('mouseleave', scheduleHide);
  } else {
    /* ===== 터치: 길게 눌러 선택 ===== */
    let t;
    document.addEventListener('selectionchange', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
        const text = sel.toString().replace(/\s+/g, ' ').trim().replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '');
        if (!text || !/^[A-Za-z][A-Za-z'’\- ]*$/.test(text) || text.split(' ').length > CONFIG.maxWords) return;
        const range = sel.getRangeAt(0);
        if (!isAllowed(range.commonAncestorContainer)) return;
        const rect = range.getBoundingClientRect();
        if (rect.width || rect.height) show(text.replace(/’/g, "'"), rect, sentenceOf(range.commonAncestorContainer));
      }, 250);
    });
    document.addEventListener('touchstart', (ev) => { if (!bubble.contains(ev.target)) hide(); }, { passive: true });
  }

  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') hide(); });

  // 데모나 다른 스크립트에서 쓸 수 있게
  // 단어장 페이지나 버튼에서 쓸 수 있게:
  //   <button onclick="DictLookup.downloadText()">텍스트로 내려받기</button>
  window.DictLookup = {
    getSaved: () => saved.slice(),
    exportText,
    downloadText,
    remove(word) {
      saved = saved.filter((x) => x.word !== word);
      writeSaved(saved);
      if (current) renderSave();
      emit('dict:saved', { word, saved: false, list: saved.slice() });
    },
    findEntry,
  };
})();
