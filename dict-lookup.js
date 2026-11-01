/*!
 * dict-lookup.js — 영어 단어 마우스 오버 시 네이버/Cambridge 사전 링크 팝업
 * 의존성 없음. CSS는 이 파일에서 <style>로 주입합니다.
 *
 * 사용법 (</body> 바로 위):
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
          label: '네이버',
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
    .dl-card{width:min(240px,calc(100vw - 24px));box-sizing:border-box;display:flex;flex-direction:column;
      background:var(--dl-bg);border:1px solid var(--dl-line);border-radius:6px;box-shadow:0 8px 22px var(--dl-shadow);
      font-family:"Source Serif 4",Georgia,"Times New Roman",serif;line-height:1.4;color:var(--dl-ink)}
    .dl-word{padding:12px 16px 10px;font-size:19px;font-style:italic;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .dl-foot{display:flex;align-items:center;flex-wrap:wrap;gap:2px;padding:7px 10px 8px 11px;border-top:1px solid var(--dl-rule);
      background:var(--dl-foot);border-radius:0 0 6px 6px;font-size:13px;
      font-family:"Noto Sans KR","Apple SD Gothic Neo","Malgun Gothic",system-ui,sans-serif}
    .dl-foot a{padding:4px 5px;color:var(--dl-link);text-decoration:none;border-radius:3px}
    .dl-foot a:hover,.dl-foot a:focus-visible{color:var(--dl-link-hi);text-decoration:underline;text-underline-offset:3px;outline:none}
    .dl-dot{color:var(--dl-dot)}
    ::highlight(dl-word){background-color:var(--dl-mark)}
    @media (prefers-reduced-motion: reduce){.dl-bubble{transition:none}}
  `;
  document.head.appendChild(style);

  const bubble = document.createElement('div');
  bubble.className = 'dl-bubble';
  bubble.innerHTML =
    '<div class="dl-arrow" aria-hidden="true"></div>' +
    '<div class="dl-card" role="dialog" aria-label="사전 검색">' +
    '<div class="dl-word"></div>' +
    '<div class="dl-foot"></div>' +
    '</div>';

  const elWord = bubble.querySelector('.dl-word');
  const elFoot = bubble.querySelector('.dl-foot');
  const extLinks = CONFIG.dictionaries.map(function (d, i) {
    if (i > 0) {
      const dot = document.createElement('span');
      dot.className = 'dl-dot';
      dot.setAttribute('aria-hidden', 'true');
      dot.textContent = '·';
      elFoot.appendChild(dot);
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

  function show(word, rect) {
    clearTimeout(hideTimer);
    current = { word: word };
    const q = String(word).toLowerCase();
    elWord.textContent = q;
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
    return hit ? { word: word.replace(/’/g, "'"), range: range, rect: hit } : null;
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
            show(found.word, found.rect);
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
        if (rect.width || rect.height) show(text.replace(/’/g, "'"), rect);
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
