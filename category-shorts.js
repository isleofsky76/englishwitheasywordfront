/**
 * 카테고리 목록 페이지용 YouTube Shorts 블록
 * - data-category 와 매칭되는 항목만 표시 (예: 국제 → news-voca-list)
 * - 목록 히어로/탭 아래, 피처드 위에 삽입
 */
(function () {
  var root = document.getElementById('category-shorts');
  if (!root) return;

  var category = String(root.getAttribute('data-category') || '').trim();
  if (!category) return;

  var feedUrl = root.getAttribute('data-feed') || 'data/youtube-shorts.json';
  var max = Math.max(1, parseInt(root.getAttribute('data-limit') || '8', 10) || 8);
  var aliases = String(root.getAttribute('data-aliases') || '')
    .split(',')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
  var matchSet = {};
  matchSet[category] = 1;
  aliases.forEach(function (a) { matchSet[a] = 1; });

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function matches(item) {
    var lab = String(item.label || item.category || '').trim();
    return !!matchSet[lab];
  }

  function cardHtml(item) {
    var href = esc(item.url || item.watchUrl || '#');
    var title = esc(item.title || item.rawTitle || 'Shorts');
    var thumb = esc(item.thumbnail || '');
    var id = esc(item.videoId || '');
    return (
      '<a class="cat-shorts-card" href="' + href + '" target="_blank" rel="noopener noreferrer" data-video-id="' + id + '">' +
        '<span class="cat-shorts-thumb">' +
          (thumb ? '<img src="' + thumb + '" alt="" loading="lazy" decoding="async">' : '') +
          '<span class="cat-shorts-play" aria-hidden="true"></span>' +
        '</span>' +
        '<span class="cat-shorts-title">' + title + '</span>' +
      '</a>'
    );
  }

  function buildHtml(items) {
    return (
      '<div class="cat-shorts-inner">' +
        '<div class="cat-shorts-head">' +
          '<h2 class="cat-shorts-heading">' + esc(category) + ' Shorts</h2>' +
          '<a class="cat-shorts-channel" href="https://www.youtube.com/@istudyeng/shorts" target="_blank" rel="noopener noreferrer">채널 →</a>' +
        '</div>' +
        '<div class="cat-shorts-grid">' +
          items.map(cardHtml).join('') +
        '</div>' +
      '</div>'
    );
  }

  function placeIntoList() {
    var wrap = document.querySelector('.rd-list-wrap');
    if (!wrap || !root.parentNode) return false;
    if (root.parentNode === wrap) return true;
    var tabs = wrap.querySelector('.rd-list-tabs-wrap');
    var featured = wrap.querySelector('.rd-list-featured');
    var grid = wrap.querySelector('.rd-list-grid-wrap');
    if (tabs) {
      wrap.insertBefore(root, tabs.nextSibling);
    } else if (featured) {
      wrap.insertBefore(root, featured);
    } else if (grid) {
      wrap.insertBefore(root, grid);
    } else {
      wrap.appendChild(root);
    }
    return true;
  }

  function waitAndPlace(tries) {
    if (placeIntoList()) return;
    if (tries <= 0) return;
    setTimeout(function () { waitAndPlace(tries - 1); }, 120);
  }

  function show(items) {
    if (!items.length) {
      root.hidden = true;
      root.innerHTML = '';
      return;
    }
    root.className = 'cat-shorts';
    root.setAttribute('aria-label', category + ' Shorts');
    root.innerHTML = buildHtml(items.slice(0, max));
    root.hidden = false;
    waitAndPlace(40);
  }

  fetch(feedUrl + (feedUrl.indexOf('?') >= 0 ? '&' : '?') + 't=' + Date.now(), { cache: 'no-store' })
    .then(function (r) {
      if (!r.ok) throw new Error('shorts feed HTTP ' + r.status);
      return r.json();
    })
    .then(function (data) {
      var items = Array.isArray(data && data.items) ? data.items : [];
      show(items.filter(matches));
    })
    .catch(function (err) {
      console.warn('category-shorts load error', err);
      root.hidden = true;
    });
})();
