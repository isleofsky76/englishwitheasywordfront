/*!
 * dict-lookup.js — 영어 단어 마우스 오버 시 한글 뜻 + 네이버/Cambridge 링크
 * 의존성 없음. CSS는 이 파일에서 <style>로 주입합니다.
 *
 * 뜻 소스: window.DICT_WORDS 또는 closest .os-item 의 뜻
 * 사용법:
 *   <script>window.DICT_CONFIG = { container: '.os-en' };</script>
 *   <script src="/dict-lookup.js" defer></script>
 */
(function () {
  'use strict';

  const CONFIG = Object.assign(
    {
      container: null,
      hoverDelay: 350,
      switchDelay: 120,
      hideDelay: 250,
      maxWords: 4,
      dictionaries: [
        {
          label: 'Naver',
          url: function (q) {
            return 'https://en.dict.naver.com/#/search?query=' + encodeURIComponent(q);
          },
        },
        {
          label: 'Cambridge',
          url: function (q) {
            return (
              'https://dictionary.cambridge.org/dictionary/english-korean/' +
              encodeURIComponent(String(q).toLowerCase().replace(/ /g, '-'))
            );
          },
        },
      ],
    },
    window.DICT_CONFIG || {}
  );

  const WORD_CHAR = /[A-Za-z'’\-]/;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasHighlight =
    typeof CSS !== 'undefined' && CSS.highlights && typeof Highlight !== 'undefined';

  function wordsMap() {
    return window.DICT_WORDS && typeof window.DICT_WORDS === 'object' ? window.DICT_WORDS : {};
  }

  function findEntry(raw) {
    const WORDS = wordsMap();
    const w = String(raw || '').toLowerCase().replace(/’/g, "'");
    const tries = [w];
    if (w.length > 3) {
      if (/ies$/.test(w)) tries.push(w.slice(0, -3) + 'y');
      if (/ied$/.test(w)) tries.push(w.slice(0, -3) + 'y');
      if (/ves$/.test(w)) tries.push(w.slice(0, -3) + 'f', w.slice(0, -3) + 'fe');
      if (/es$/.test(w)) tries.push(w.slice(0, -2), w.slice(0, -1));
      else if (/s$/.test(w)) tries.push(w.slice(0, -1));
      if (/ed$/.test(w)) {
        tries.push(w.slice(0, -2), w.slice(0, -1));
        if (/(.)\1ed$/.test(w)) tries.push(w.slice(0, -3));
      }
      if (/ing$/.test(w)) {
        tries.push(w.slice(0, -3), w.slice(0, -3) + 'e');
        if (/(.)\1ing$/.test(w)) tries.push(w.slice(0, -4));
      }
    }
    for (let i = 0; i < tries.length; i += 1) {
      const t = tries[i];
      if (WORDS[t] && WORDS[t].meaning) {
        return { lemma: t, meaning: WORDS[t].meaning, pos: WORDS[t].pos || '' };
      }
    }
    return null;
  }

  function cleanCfMeaning(raw) {
    let s = String(raw || '').replace(/\s+/g, ' ').trim();
    if (!s) return '';
    s = s.split(/\s*cf\./i)[0];
    s = s.split(/※/)[0];
    s = s.split(/\s+\d{1,2}\.\s+/)[0];
    const withPos = s.match(
      /^(.*?)(?:\s*[\(（]\s*(?:명|동|형|부|숙|관|감|형용사|동사|명사|부사)[^\)）]*[\)）])/
    );
    if (withPos) s = withPos[1];
    else s = s.replace(/\s*[\(（][^\)）]{0,12}[\)）]\s*$/u, '');
    return s.replace(/^[,，、.\s]+|[,，、.\s]+$/g, '').trim();
  }

  function meaningFromNewsCard(node, hoveredWord) {
    const e = node && (node.nodeType === 1 ? node : node.parentElement);
    if (!e) return '';
    const card = e.closest('.rd-expr, .nv-word-section');
    if (!card) return '';
    const hw = String(hoveredWord || '')
      .toLowerCase()
      .replace(/’/g, "'")
      .trim();
    if (!hw) return '';
    const exprEl = card.querySelector('.rd-expr-word, mark.nv-hl, .nv-hl');
    const meaningEl = card.querySelector('.rd-expr-meaning');
    const expr = String((exprEl && exprEl.textContent) || '')
      .toLowerCase()
      .replace(/’/g, "'")
      .replace(/\s+/g, ' ')
      .trim();
    let meaning = meaningEl ? String(meaningEl.textContent || '').trim() : '';
    if (!meaning) {
      const blob = String(card.textContent || '');
      const escaped = expr
        ? expr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        : '[^:：]+';
      const cf = blob.match(
        new RegExp('cf\\.\\s*(?:' + escaped + ')\\s*[:：]\\s*(.+)$', 'i')
      );
      if (cf) meaning = cf[1];
    }
    meaning = cleanCfMeaning(meaning);
    if (!meaning) return '';
    if (!expr) return meaning;
    /* 해당 카드의 표제어와 일치할 때만 */
    if (expr === hw || expr.split(/[\s/]+/).indexOf(hw) !== -1) return meaning;
    return '';
  }

  function meaningForWord(hoveredWord, node) {
    const mapped = findEntry(hoveredWord);
    if (mapped && mapped.meaning) return mapped.meaning;
    return meaningFromNewsCard(node, hoveredWord);
  }

  const style = document.createElement('style');
  style.textContent = `
    :root{--dl-bg:#fdfbf5;--dl-foot:#f6f1e4;--dl-line:#d9cfb6;--dl-rule:#ebe3cf;--dl-ink:#2a241a;--dl-link:#6b4a17;--dl-link-hi:#3b2a0e;--dl-dot:#c9bd9f;--dl-mark:#f6efdc;--dl-shadow:rgba(60,45,20,.12)}
    @media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--dl-bg:#26221a;--dl-foot:#1f1c15;--dl-line:#4a4232;--dl-rule:#3a3427;--dl-ink:#efe8d8;--dl-link:#e0bb76;--dl-link-hi:#f3d59c;--dl-dot:#5c533f;--dl-mark:#3d3320;--dl-shadow:rgba(0,0,0,.45)}}
    :root[data-theme="dark"]{--dl-bg:#26221a;--dl-foot:#1f1c15;--dl-line:#4a4232;--dl-rule:#3a3427;--dl-ink:#efe8d8;--dl-link:#e0bb76;--dl-link-hi:#f3d59c;--dl-dot:#5c533f;--dl-mark:#3d3320;--dl-shadow:rgba(0,0,0,.45)}

    .dl-bubble{position:fixed;z-index:2147483000;display:none;flex-direction:column;align-items:center;
      padding-top:8px;transform:translateX(-50%);opacity:0;transition:opacity .15s ease;text-align:left}
    .dl-bubble.dl-show{display:flex}
    .dl-bubble.dl-in{opacity:1}
    .dl-bubble.dl-above{flex-direction:column-reverse;padding-top:0;padding-bottom:8px}
    .dl-arrow{width:9px;height:9px;background:var(--dl-bg);border:1px solid var(--dl-line);border-right:0;border-bottom:0;
      transform:rotate(45deg);margin-bottom:-5px;position:relative;z-index:1}
    .dl-above .dl-arrow{transform:rotate(225deg);margin:-5px 0 0}
    .dl-card{width:max-content;max-width:min(260px,calc(100vw - 24px));box-sizing:border-box;display:flex;flex-direction:column;align-items:center;
      background:var(--dl-bg);border:1px solid var(--dl-line);border-radius:6px;box-shadow:0 8px 22px var(--dl-shadow);
      line-height:1.4;color:var(--dl-ink);text-align:center}
    .dl-meaning{padding:10px 12px 8px;font-size:14px;font-weight:500;text-align:center;
      font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;
      word-break:keep-all;overflow-wrap:anywhere}
    .dl-meaning[hidden]{display:none !important}
    .dl-foot{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:0;padding:6px 10px 8px;border-top:1px solid var(--dl-rule);
      background:var(--dl-foot);border-radius:0 0 6px 6px;font-size:12px;line-height:1.35;width:100%;box-sizing:border-box;
      font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif;color:var(--dl-ink)}
    .dl-card.dl-links-only .dl-foot{border-top:0;border-radius:6px;padding:8px 10px}
    .dl-foot-label{color:var(--dl-ink);margin-right:2px;white-space:nowrap}
    .dl-foot a{padding:0 1px;color:var(--dl-link);text-decoration:none;border-radius:2px;white-space:nowrap}
    .dl-foot a:hover,.dl-foot a:focus-visible{color:var(--dl-link-hi);text-decoration:underline;text-underline-offset:2px;outline:none}
    .dl-sep{color:var(--dl-dot);margin:0 1px}
    ::highlight(dl-word){background-color:var(--dl-mark)}
    @media (prefers-reduced-motion: reduce){.dl-bubble{transition:none}}
  `;
  document.head.appendChild(style);

  const bubble = document.createElement('div');
  bubble.className = 'dl-bubble';
  bubble.innerHTML =
    '<div class="dl-arrow" aria-hidden="true"></div>' +
    '<div class="dl-card" role="dialog" aria-label="단어 뜻">' +
    '<div class="dl-meaning"></div>' +
    '<div class="dl-foot"><span class="dl-foot-label">영어사전 :</span></div>' +
    '</div>';

  const elCard = bubble.querySelector('.dl-card');
  const elMeaning = bubble.querySelector('.dl-meaning');
  const elFoot = bubble.querySelector('.dl-foot');
  const extLinks = CONFIG.dictionaries.map(function (d, i) {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'dl-sep';
      sep.setAttribute('aria-hidden', 'true');
      sep.textContent = ',';
      elFoot.appendChild(sep);
    } else {
      elFoot.appendChild(document.createTextNode(' '));
    }
    const a = document.createElement('a');
    a.textContent = d.label;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    elFoot.appendChild(a);
    return a;
  });

  bubble.addEventListener('mousedown', function (e) {
    if (e.target.tagName !== 'A') e.preventDefault();
  });
  document.body.appendChild(bubble);

  let current = null;
  let showTimer = null;
  let hideTimer = null;

  function show(word, rect, node) {
    clearTimeout(hideTimer);
    current = { word: word };
    const q = String(word).toLowerCase();
    const meaning = meaningForWord(word, node);
    if (meaning) {
      elMeaning.hidden = false;
      elMeaning.textContent = meaning;
      elCard.classList.remove('dl-links-only');
    } else {
      elMeaning.hidden = true;
      elMeaning.textContent = '';
      elCard.classList.add('dl-links-only');
    }
    CONFIG.dictionaries.forEach(function (d, i) {
      extLinks[i].href = d.url(q);
    });

    bubble.classList.remove('dl-above', 'dl-in');
    bubble.classList.add('dl-show');
    const bh = bubble.offsetHeight;
    const bw = bubble.offsetWidth;
    const vw = document.documentElement.clientWidth;
    let top = rect.bottom;
    if (top + bh > window.innerHeight - 8) {
      bubble.classList.add('dl-above');
      top = rect.top - bh;
    }
    const left = Math.max(bw / 2 + 8, Math.min(vw - bw / 2 - 8, rect.left + rect.width / 2));
    bubble.style.top = Math.max(8, top) + 'px';
    bubble.style.left = left + 'px';
    requestAnimationFrame(function () {
      bubble.classList.add('dl-in');
    });
  }

  function hide() {
    clearTimeout(showTimer);
    clearTimeout(hideTimer);
    bubble.classList.remove('dl-show', 'dl-in');
    current = null;
    if (hasHighlight) CSS.highlights.delete('dl-word');
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hide, CONFIG.hideDelay);
  }

  function isAllowed(node) {
    const e = node.nodeType === 1 ? node : node.parentElement;
    if (!e) return false;
    if (
      e.closest(
        'input, textarea, select, button, a, code, pre, [contenteditable=""], [contenteditable="true"], .dl-bubble'
      )
    ) {
      return false;
    }
    if (CONFIG.container && !e.closest(CONFIG.container)) return false;
    return true;
  }

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
    let s = c.offset;
    let e = c.offset;
    while (s > 0 && WORD_CHAR.test(text[s - 1])) s -= 1;
    while (e < text.length && WORD_CHAR.test(text[e])) e += 1;
    while (s < e && !/[A-Za-z]/.test(text[s])) s += 1;
    while (e > s && !/[A-Za-z]/.test(text[e - 1])) e -= 1;
    const word = text.slice(s, e);
    if (!/^[A-Za-z][A-Za-z'’\-]*$/.test(word)) return null;
    const range = document.createRange();
    range.setStart(c.node, s);
    range.setEnd(c.node, e);
    const hit = Array.from(range.getClientRects()).find(function (r) {
      return x >= r.left - 1 && x <= r.right + 1 && y >= r.top - 1 && y <= r.bottom + 1;
    });
    return hit ? { word: word.replace(/’/g, "'"), range: range, rect: hit, node: c.node } : null;
  }

  if (canHover) {
    let pending = null;
    let last = 0;
    document.addEventListener(
      'mousemove',
      function (ev) {
        const now = performance.now();
        if (now - last < 40) return;
        last = now;
        if (bubble.contains(ev.target)) {
          clearTimeout(hideTimer);
          clearTimeout(showTimer);
          pending = null;
          return;
        }

        const found = wordAtPoint(ev.clientX, ev.clientY);
        if (!found) {
          clearTimeout(showTimer);
          pending = null;
          if (current) scheduleHide();
          return;
        }
        if (current && found.word === current.word) {
          clearTimeout(hideTimer);
          return;
        }
        if (pending && pending.word === found.word) return;

        pending = found;
        clearTimeout(showTimer);
        showTimer = setTimeout(
          function () {
            if (hasHighlight) CSS.highlights.set('dl-word', new Highlight(found.range));
            show(found.word, found.rect, found.node);
            pending = null;
          },
          current ? CONFIG.switchDelay : CONFIG.hoverDelay
        );
      },
      { passive: true }
    );
    bubble.addEventListener('mouseleave', scheduleHide);
    document.documentElement.addEventListener('mouseleave', scheduleHide);
  } else {
    let t;
    document.addEventListener('selectionchange', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;
        const text = sel
          .toString()
          .replace(/\s+/g, ' ')
          .trim()
          .replace(/^[^A-Za-z]+|[^A-Za-z]+$/g, '');
        if (
          !text ||
          !/^[A-Za-z][A-Za-z'’\- ]*$/.test(text) ||
          text.split(' ').length > CONFIG.maxWords
        ) {
          return;
        }
        const range = sel.getRangeAt(0);
        if (!isAllowed(range.commonAncestorContainer)) return;
        const rect = range.getBoundingClientRect();
        if (rect.width || rect.height) {
          show(text.replace(/’/g, "'"), rect, range.commonAncestorContainer);
        }
      }, 250);
    });
    document.addEventListener(
      'touchstart',
      function (ev) {
        if (!bubble.contains(ev.target)) hide();
      },
      { passive: true }
    );
  }

  window.addEventListener('scroll', hide, { passive: true });
  window.addEventListener('resize', hide);
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') hide();
  });
})();
