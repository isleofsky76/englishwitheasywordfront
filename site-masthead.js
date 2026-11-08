/**
 * 전 페이지 공통 헤더 (제목 · 검색 · 메뉴 · 날씨 · 시간 · YouTube)
 * 문서 흐름에 두어 스크롤하면 자연스럽게 사라짐
 * nav-home-menu.js 가 로드함
 */
(function () {
    var VERSION = '20261108wx5';

  var DICT_LOOKUP_VER = '20261104dict1';
  var DICT_LOOKUP_CONTAINERS = [
    '.os-en',
    '#onesentence-feed',
    '#post-message',
    '.post-message-body',
    '.rd-article-cards',
    '.nv-body',
    '.nv-text',
    '.rd-expr',
    '.rd-news-cards',
    '.rd-news-list',
    '.rd-hero-example',
    '.rd-phrases',
    '.rd-list-feature',
    '.rd-list-card',
    '.rd-list-side',
    '.rd-read-col',
    '.vq-card',
    '.vq-prompt',
    'article#post-content',
    '#word-detail',
    '.wotd-body'
  ].join(', ');

  function ensureSiteDictLookup(base) {
    var prev = window.DICT_CONFIG || {};
    window.DICT_CONFIG = Object.assign(
      { container: DICT_LOOKUP_CONTAINERS },
      prev
    );
    if (document.querySelector('script[data-dict-lookup="1"]')) return;
    var s = document.createElement('script');
    s.src = (base || '') + 'dict-lookup.js?v=' + DICT_LOOKUP_VER;
    s.defer = true;
    s.setAttribute('data-dict-lookup', '1');
    document.body.appendChild(s);
  }
  /* 시안 주 메뉴 — groupLabel은 모바일 그룹 제목 (index 경로 카드와 동일) */
  var PRIMARY_NAV_ITEMS = [
    {
      href: 'news-voca-list.html',
      label: '뉴스 영어',
      groupLabel: '뉴스로 배우기',
      tone: 'news',
      pages: [
        'news-voca-list.html', 'news-voca.html',
        'korea-news-list.html', 'korea-news.html',
        'defense-news-list.html', 'defense-news.html',
        'economy-news-list.html', 'economy-news.html',
        'travel-news-list.html', 'travel-news.html',
        'sports-news-list.html', 'sports-news.html',
        'us-news-list.html', 'us-news.html',
        'weather-news-list.html', 'weather-news.html',
        'retail-news-list.html', 'retail-news.html',
        'literature-news-list.html', 'literature-news.html',
        'health-news-list.html', 'health-news.html',
        'politics-news-list.html', 'politics-news.html',
        'industry-news-list.html', 'industry-news.html',
        'ai-news-list.html', 'ai-news.html',
        'incident-news-list.html', 'incident-news.html',
        'ukraine-news-list.html', 'ukraine-news.html',
        'culture-voca-list.html', 'culture-voca.html',
        'ranking-news-list.html', 'ranking-news.html'
      ],
      children: [
        { href: 'news-voca-list.html', label: '국제', tone: 'news', pages: ['news-voca-list.html', 'news-voca.html'] },
        { href: 'korea-news-list.html', label: '한국', tone: 'defense', pages: ['korea-news-list.html', 'korea-news.html'] },
        { href: 'defense-news-list.html', label: '국방', tone: 'defense', pages: ['defense-news-list.html', 'defense-news.html'] },
        { href: 'economy-news-list.html', label: '경제', tone: 'news', pages: ['economy-news-list.html', 'economy-news.html'] },
        { href: 'sports-news-list.html', label: '스포츠', tone: 'news', pages: ['sports-news-list.html', 'sports-news.html'] },
        { href: 'us-news-list.html', label: '미국', tone: 'news', pages: ['us-news-list.html', 'us-news.html'] },
        { href: 'industry-news-list.html', label: '산업', tone: 'news', pages: ['industry-news-list.html', 'industry-news.html'] },
        { href: 'culture-voca-list.html', label: '컬쳐', tone: 'culture', pages: ['culture-voca-list.html', 'culture-voca.html'] }
      ]
    },
    {
      href: 'word-of-the-day-list.html?api=prod',
      label: '단어장',
      groupLabel: '단어 다지기',
      tone: 'wotd',
      pages: [
        'word-of-the-day-list.html', 'word-of-the-day.html',
        'english-synonym-list.html', 'english-synonym.html',
        'one-sentence.html',
        'vocabulary-quiz-list.html', 'vocabulary-quiz.html'
      ],
      children: [
        { href: 'english-synonym-list.html', label: '연관단어', tone: 'syn', pages: ['english-synonym-list.html', 'english-synonym.html'] },
        { href: 'one-sentence.html', label: '문장', tone: 'osent', pages: ['one-sentence.html'] },
        { href: 'vocabulary-quiz-list.html', label: '퀴즈', tone: 'quiz', pages: ['vocabulary-quiz-list.html', 'vocabulary-quiz.html'] },
        { href: 'word-of-the-day-list.html?api=prod', label: '단어장', tone: 'wotd', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] }
      ]
    },
    {
      href: 'popular-voca-list.html',
      label: '표현',
      groupLabel: '표현 익히기',
      tone: 'popular',
      pages: [
        'popular-voca-list.html', 'popular-voca.html',
        'daily-english.html',
        'english-writing.html',
        'situational-english-list.html', 'situational-english.html',
        'pros-cons-list.html', 'pros-cons.html',
        'photo-english-list.html', 'photo-english.html'
      ],
      children: [
        { href: 'popular-voca-list.html', label: '이럴 땐 영어로?', tone: 'popular', pages: ['popular-voca-list.html', 'popular-voca.html'] },
        { href: 'daily-english.html', label: '생활 영어 한 줄', tone: 'daily', pages: ['daily-english.html'] },
        { href: 'english-writing.html', label: '영작', tone: 'daily', pages: ['english-writing.html'] },
        { href: 'situational-english-list.html', label: '상황', tone: 'sit', pages: ['situational-english-list.html', 'situational-english.html'] },
        { href: 'pros-cons-list.html', label: 'Pros & Cons', tone: 'pros', pages: ['pros-cons-list.html', 'pros-cons.html'] },
        { href: 'photo-english-list.html', label: '포토', tone: 'photo', pages: ['photo-english-list.html', 'photo-english.html'] }
      ]
    },
    {
      href: 'english-directory.html',
      label: '학습사이트',
      tone: 'dir',
      pages: ['english-directory.html'],
      desktopOnly: true
    },
    {
      href: 'dashboard.html',
      label: '대시보드',
      tone: 'dash',
      pages: ['dashboard.html', 'word-ranking.html'],
      desktopOnly: true
    }
  ];
  /* 더보기 — 데스크톱용. mobileDup는 모바일 하위메뉴와 겹침 */
  var EXTRA_NAV_ITEMS = [
    { href: 'english-synonym-list.html', label: '연관단어', tone: 'syn', pages: ['english-synonym-list.html', 'english-synonym.html'], mobileDup: true },
    { href: 'one-sentence.html', label: '문장', tone: 'osent', pages: ['one-sentence.html'], mobileDup: true },
    { href: 'vocabulary-quiz-list.html', label: '퀴즈', tone: 'quiz', pages: ['vocabulary-quiz-list.html', 'vocabulary-quiz.html'], mobileDup: true },
    { href: 'shorts-bg-image-list.html', label: '신문읽는 이미지', tone: 'sbgi', pages: ['shorts-bg-image-list.html', 'shorts-bg-image.html'], group: '천천히 읽을거리' },
    { href: 'english-opinions-list.html', label: '오피니언', tone: 'opine', pages: ['english-opinions-list.html', 'english-opinions.html'], group: '천천히 읽을거리' },
    { href: 'calm-mind-list.html', label: '마음글', tone: 'calm', pages: ['calm-mind-list.html', 'calm-mind.html'], group: '천천히 읽을거리' },
    { href: 'english-quotes-list.html', label: '영어 명언', tone: 'quote', pages: ['english-quotes-list.html', 'english-quotes.html'], group: '천천히 읽을거리' },
    { href: 'index.html', label: '홈', tone: 'home', pages: ['index.html', ''], group: '기타' },
    { href: 'english-directory.html', label: '학습사이트', tone: 'dir', pages: ['english-directory.html'], group: '기타', mobileOnly: true },
    { href: 'dashboard.html', label: '대시보드', tone: 'dash', pages: ['dashboard.html', 'word-ranking.html'], group: '기타', mobileOnly: true },
    { href: 'free-books.html', label: '무료 영어 원서', tone: 'books', pages: ['free-books.html'], group: '기타' }
  ];
  var NAV_ITEMS = PRIMARY_NAV_ITEMS.concat(EXTRA_NAV_ITEMS);

  function assetBase() {
    var scripts = document.querySelectorAll('script[src]');
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].getAttribute('src') || '';
      if (/nav-home-menu\.js|site-masthead\.js/.test(src)) {
        return src.replace(/[^/]+$/, '');
      }
    }
    return '';
  }

  function currentPageKey() {
    var parts = (window.location.pathname || '').replace(/\\/g, '/').split('/').filter(Boolean);
    var last = parts[parts.length - 1] || 'index.html';
    var folderMap = {
      'news-voca': 'news-voca.html',
      'defense-news': 'defense-news.html',
      'economy-news': 'economy-news.html',
      'travel-news': 'travel-news.html',
      'sports-news': 'sports-news.html',
      'us-news': 'us-news.html',
      'weather-news': 'weather-news.html',
      'retail-news': 'retail-news.html',
      'literature-news': 'literature-news.html',
      'health-news': 'health-news.html',
      'politics-news': 'politics-news.html',
      'industry-news': 'industry-news.html',
      'ai-news': 'ai-news.html',
      'incident-news': 'incident-news.html',
      'ukraine-news': 'ukraine-news.html',
      'korea-news': 'korea-news.html',
      'word-of-the-day': 'word-of-the-day.html',
      'popular-voca': 'popular-voca.html',
      'english-synonym': 'english-synonym.html',
      'cooking-voca': 'cooking-voca.html',
      'situational-english': 'situational-english.html',
      'pros-cons': 'pros-cons.html',
      'culture-voca': 'culture-voca.html',
      'ranking-news': 'ranking-news.html',
      'photo-english': 'photo-english.html',
      'english-opinions': 'english-opinions.html',
      'shorts-bg-image': 'shorts-bg-image.html',
      'calm-mind': 'calm-mind.html',
      'vocabulary-quiz': 'vocabulary-quiz.html'
    };
    /* /board/slug/ 또는 /board/slug/index.html → board html 키 */
    if (last === 'index.html' || last === '' || !/\.html?$/i.test(last)) {
      var folder = (last === 'index.html' || last === '')
        ? (parts[parts.length - 2] || '')
        : (parts[parts.length - 2] || parts[parts.length - 1] || '');
      if (folderMap[folder]) return folderMap[folder];
      if (folderMap[last]) return folderMap[last];
      if (last === 'index.html' || last === '') return 'index.html';
    }
    return last.split('?')[0];
  }

  function isActive(item, page) {
    return item.pages.indexOf(page) !== -1;
  }

  /** masthead CSS가 적용된 뒤에 YouTube 바를 넣기 위해 onload 대기 */
  function ensureCss(base, done) {
    ensureLink(base + 'redesign-tokens.css?v=' + VERSION);
    var existing = document.querySelector('link[href*="site-masthead.css"]');
    if (existing) {
      if (done) done();
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = base + 'site-masthead.css?v=' + VERSION;
    var settled = false;
    var finish = function () {
      if (settled) return;
      settled = true;
      if (done) done();
    };
    link.onload = finish;
    link.onerror = finish;
    document.head.appendChild(link);
    /* 캐시 히트 등으로 onload가 안 오는 경우 대비 */
    setTimeout(finish, 120);
  }

  function ensureScript(src, done) {
    var name = src.replace(/^.*\//, '').split('?')[0];
    if (name === 'home-board-preview.js' && window.HomeBoardPreview) {
      done();
      return;
    }
    if (document.querySelector('script[src*="' + name + '"]')) {
      var wait = function () {
        if (name !== 'home-board-preview.js' || window.HomeBoardPreview) done();
        else setTimeout(wait, 40);
      };
      wait();
      return;
    }
    var s = document.createElement('script');
    s.src = src;
    s.onload = done;
    s.onerror = done;
    document.head.appendChild(s);
  }

  function ensureLink(href) {
    var name = href.replace(/^.*\//, '').split('?')[0];
    if (document.querySelector('link[href*="' + name + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureWeather(base) {
    ensureLink(base + 'weather-banner.css?v=' + VERSION);
    ensureLink(base + 'world-clock.css?v=' + VERSION);
    if (!document.querySelector('script[src*="weather-banner.js"]')) {
      var w = document.createElement('script');
      w.src = base + 'weather-banner.js?v=' + VERSION;
      document.head.appendChild(w);
    }
    if (!document.querySelector('script[src*="world-clock.js"]')) {
      var c = document.createElement('script');
      c.src = base + 'world-clock.js?v=' + VERSION;
      document.head.appendChild(c);
    }
  }

  function navItemHtml(base, page, item) {
    var active = isActive(item, page);
    var cls = 'nav-link nav-tone-' + item.tone + (active ? ' active' : '');
    if (item.mobileDup) cls += ' nav-dup';
    if (item.desktopOnly) cls += ' nav-desktop-only';
    if (item.mobileOnly) cls += ' nav-mobile-only';
    var aria = active ? ' aria-current="page"' : '';
    return '<a class="' + cls + '" href="' + base + item.href + '"' + aria + '>' + item.label + '</a>';
  }

  function navChildrenHtml(base, page, children) {
    if (!children || !children.length) return '';
    return (
      '<ul class="nav-sub">' +
      children.map(function (child) {
        return '<li class="nav-sub-item">' + navItemHtml(base, page, child) + '</li>';
      }).join('') +
      '</ul>'
    );
  }

  function navGroupLabelHtml(text) {
    if (!text) return '';
    return '<span class="nav-group-label">' + text + '</span>';
  }

  /** 더보기 목록 — 그룹 헤더를 끼워 넣음 */
  function buildExtraMenuHtml(base, page, extra) {
    var html = '';
    var lastGroup = null;
    extra.forEach(function (item) {
      var g = item.group || '';
      if (g && g !== lastGroup) {
        html += '<li class="nav-more-group" role="presentation">' + navGroupLabelHtml(g) + '</li>';
        lastGroup = g;
      }
      html +=
        '<li' + (item.mobileDup ? ' class="nav-dup-item"' : '') + '>' +
          navItemHtml(base, page, item) +
        '</li>';
    });
    return html;
  }

  function buildNavHtml(base, page) {
    var primary = PRIMARY_NAV_ITEMS;
    var extra = EXTRA_NAV_ITEMS;
    var html = primary.map(function (item) {
      var hasSub = item.children && item.children.length;
      return (
        '<li class="nav-item' + (hasSub ? ' has-subnav' : '') + (item.groupLabel ? ' nav-group' : '') + '">' +
          navGroupLabelHtml(item.groupLabel) +
          navItemHtml(base, page, item) +
          navChildrenHtml(base, page, item.children) +
        '</li>'
      );
    }).join('');
    if (!extra.length) return html;
    var extraActive = extra.some(function (item) { return isActive(item, page); });
    html +=
      '<li class="nav-item nav-more' + (extraActive ? ' has-active' : '') + '">' +
        '<button type="button" class="nav-more-toggle" aria-expanded="false" aria-haspopup="true" aria-label="더보기">' +
          '<span class="nav-more-icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
        '</button>' +
        '<ul class="nav-more-menu" hidden>' +
          buildExtraMenuHtml(base, page, extra) +
        '</ul>' +
      '</li>';
    return html;
  }

  function mastheadHtml(base, page) {
    return (
      '<div class="site-masthead-bar">' +
        '<div class="site-masthead-brand">' +
          '<a href="' + base + 'index.html">' +
            '<span class="site-title-ko">시사영단어</span>' +
            '<span class="site-title-en">News English Lab</span>' +
          '</a>' +
        '</div>' +
        '<button type="button" class="site-masthead-mobile-toggle" aria-expanded="false" aria-controls="site-masthead-nav" aria-label="메뉴">' +
          '<span></span><span></span><span></span>' +
        '</button>' +
        '<div class="site-masthead-nav-wrap" id="site-masthead-nav">' +
          '<ul class="navbar-nav site-primary-nav">' + buildNavHtml(base, page) + '</ul>' +
        '</div>' +
        '<div class="site-masthead-search">' +
          '<form class="site-search-form" id="site-search-form" role="search">' +
            '<label for="site-search-input" class="visually-hidden">단어 검색</label>' +
            '<input class="site-search-input" id="site-search-input" type="search" name="q" placeholder="단어나 표현 검색" autocomplete="off" enterkeyhint="search">' +
            '<button class="site-search-submit" type="submit" aria-label="검색">검색</button>' +
          '</form>' +
          '<ul class="site-search-results" id="site-search-results" hidden></ul>' +
        '</div>' +
      '</div>'
    );
  }

  function syncNavbarHeight() {
    var nav = document.querySelector('.navbar.fixed-top');
    if (!nav) return;
    var h = Math.ceil(nav.getBoundingClientRect().height);
    if (h > 0) document.documentElement.style.setProperty('--navbar-height', h + 'px');
  }

  function injectYoutubeBar() {
    var inFlow = document.querySelector('main .yt-billboard');
    if (inFlow) inFlow.remove();
    if (document.getElementById('yt-billboard-bar')) return;
    var bar = document.createElement('a');
    bar.id = 'yt-billboard-bar';
    bar.href = 'https://www.youtube.com/@istudyeng/shorts';
    bar.target = '_blank';
    bar.rel = 'noopener noreferrer';
    bar.setAttribute('aria-label', 'YouTube Shorts istudyeng 바로가기');
    /* width/height·inline style: CSS 로드 전에 SVG가 화면 전체로 커지는 FOUC 방지 */
    bar.innerHTML =
      '<span class="yt-billboard__inner">' +
        '<span class="yt-billboard__icon" aria-hidden="true" style="display:inline-flex;width:22px;height:16px;flex-shrink:0;overflow:hidden;">' +
          '<svg width="22" height="16" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" focusable="false" style="width:22px;height:16px;display:block;">' +
            '<path fill="#FF0000" d="M27.33 3.12A3.5 3.5 0 0 0 24.86.65C22.7 0 14 0 14 0S5.3 0 3.14.65A3.5 3.5 0 0 0 .67 3.12 36.7 36.7 0 0 0 0 10a36.7 36.7 0 0 0 .67 6.88 3.5 3.5 0 0 0 2.47 2.47C5.3 20 14 20 14 20s8.7 0 10.86-.65a3.5 3.5 0 0 0 2.47-2.47A36.7 36.7 0 0 0 28 10a36.7 36.7 0 0 0-.67-6.88z"/>' +
            '<path fill="#fff" d="M11.2 14.3V5.7L18.5 10l-7.3 4.3z"/>' +
          '</svg>' +
        '</span>' +
        '<span class="yt-billboard__title">YouTube로 공부하기</span>' +
        '<span class="yt-billboard__handle">@istudyeng</span>' +
      '</span>';
    var slot = document.getElementById('yt-billboard-slot');
    if (slot) {
      slot.replaceWith(bar);
      document.documentElement.classList.add('has-yt-billboard');
      return;
    }
    var nav = document.querySelector('.site-masthead') ||
      document.querySelector('#navbar') ||
      document.querySelector('.navbar.fixed-top') ||
      document.querySelector('.navbar');
    if (nav) nav.insertAdjacentElement('afterend', bar);
    else document.body.insertBefore(bar, document.body.firstChild);
    document.documentElement.classList.add('has-yt-billboard');
  }

  function initSearch(base) {
    var form = document.getElementById('site-search-form');
    var input = document.getElementById('site-search-input');
    var list = document.getElementById('site-search-results');
    if (!form || !input || !list || form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    var debounceId = 0;
    var activeIndex = -1;
    var homePreviews = document.getElementById('home-previews');
    var searchPage = document.getElementById('site-search-page');
    var searchPageList = document.getElementById('site-search-page-list');
    var onHome = currentPageKey() === 'index.html';

    function hideSuggest() {
      list.hidden = true;
      list.innerHTML = '';
      activeIndex = -1;
    }

    function escapeSuggestText(s) {
      return String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    function renderHitLink(item, opts) {
      opts = opts || {};
      var word = escapeSuggestText(item.previewWord || item.slug || '');
      var meaning = escapeSuggestText(item.previewMeaning || '');
      var snippet = escapeSuggestText(item.previewSnippet || '');
      var title = escapeSuggestText(item.title || '제목 없음');
      var label = escapeSuggestText(item.label || '');
      var href = String(item.href || '#');
      var cls = opts.active ? ' class="is-active"' : '';
      var labelHtml = label
        ? '<span class="site-search-label">' + label + '</span>'
        : '';
      var head = word
        ? '<span class="site-search-word">' + word + '</span>'
        : '<span class="site-search-title">' + title + '</span>';
      var meaningHtml = meaning
        ? '<span class="site-search-meaning">' + meaning + '</span>'
        : (!word ? '' : '<span class="site-search-title">' + title + '</span>');
      var snipHtml = snippet
        ? '<span class="site-search-snippet">' + snippet + '</span>'
        : '';
      return '<li><a href="' + href + '"' + cls + '>' +
        labelHtml +
        head +
        meaningHtml +
        snipHtml +
        '</a></li>';
    }

    function isWordSearchHit(item) {
      if (!item) return false;
      if (item.searchOnly) return true;
      var label = String(item.label || '');
      return label === '문장' || label === '단어장';
    }

    function renderSuggest(hits, emptyText) {
      activeIndex = hits && hits.length ? 0 : -1;
      if (!hits || !hits.length) {
        list.innerHTML = '<li class="site-search-empty">' + emptyText + '</li>';
        list.hidden = false;
        return;
      }
      list.innerHTML = hits.map(function (item, idx) {
        return renderHitLink(item, { active: idx === 0 });
      }).join('');
      list.hidden = false;
    }

    function setHomeSearchMode(on) {
      var wrap = document.getElementById('rd-home');
      if (wrap) wrap.classList.toggle('is-search-mode', !!on);
      document.body.classList.toggle('home-search-active', !!on);
    }

    function revealSearchPage(hits, emptyText) {
      if (homePreviews) homePreviews.hidden = true;
      setHomeSearchMode(true);
      if (searchPage) {
        searchPage.hidden = false;
        searchPage.setAttribute('tabindex', '-1');
      }
      if (!searchPageList) return;
      var q = String(input.value || '').trim();
      var heading = q
        ? '<h1 class="site-search-page-title">‘' + q.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '’ 검색 결과</h1>'
        : '<h1 class="site-search-page-title">검색 결과</h1>';
      if (!hits || !hits.length) {
        searchPageList.innerHTML = heading + '<p class="site-search-empty">' + emptyText + '</p>';
      } else {
        var wordHits = hits.filter(isWordSearchHit);
        var postHits = hits.filter(function (item) { return !isWordSearchHit(item); });
        function section(title, items) {
          if (!items.length) return '';
          return '<h2 class="site-search-section-title">' + escapeSuggestText(title) +
            ' <span class="site-search-section-count">' + items.length + '</span></h2>' +
            '<ul class="site-search-page-list">' + items.map(function (item) {
              return renderHitLink(item);
            }).join('') + '</ul>';
        }
        searchPageList.innerHTML = heading +
          section('단어 · 문장', wordHits) +
          section('관련 글', postHits);
      }
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (err) {
        window.scrollTo(0, 0);
      }
      if (searchPage && typeof searchPage.focus === 'function') {
        try { searchPage.focus({ preventScroll: true }); } catch (e2) { searchPage.focus(); }
      }
    }

    function renderPage(hits, emptyText) {
      hideSuggest();
      if (!onHome) {
        window.location.href = base + 'index.html?q=' + encodeURIComponent(input.value.trim());
        return;
      }
      revealSearchPage(hits, emptyText);
    }

    function trackSiteSearch(q, source) {
      if (!window.SiteStats || typeof window.SiteStats.trackSearch !== 'function') return;
      var term = String(q || '').trim();
      if (term.length < 2) return;
      window.SiteStats.trackSearch(term, source || 'site-search');
    }

    function searchBlockMsg(q) {
      if (window.CommentBadwords && typeof window.CommentBadwords.searchBlockMessage === 'function') {
        return window.CommentBadwords.searchBlockMessage(q) || '';
      }
      return '';
    }

    function showBlocked(msg) {
      list.innerHTML = '<li class="site-search-empty site-search-blocked">' + escapeSuggestText(msg) + '</li>';
      list.hidden = false;
      activeIndex = -1;
      if (onHome && searchPageList) {
        setHomeSearchMode(true);
        if (searchPage) searchPage.hidden = false;
        searchPageList.innerHTML =
          '<h1 class="site-search-page-title">검색</h1>' +
          '<p class="site-search-empty site-search-blocked">' + escapeSuggestText(msg) + '</p>';
      }
    }

    function previewSearch(q) {
      var blocked = searchBlockMsg(q);
      if (blocked) {
        showBlocked(blocked);
        return;
      }
      if (!window.HomeBoardPreview) return;
      HomeBoardPreview.search(q, 16).then(function (hits) {
        renderSuggest(hits, '일치하는 단어가 없습니다.');
      }).catch(function () {
        renderSuggest([], '검색 결과를 불러올 수 없습니다.');
      });
    }

    input.addEventListener('input', function () {
      clearTimeout(debounceId);
      var q = String(input.value || '').trim();
      if (!q) {
        hideSuggest();
        return;
      }
      debounceId = setTimeout(function () { previewSearch(q); }, 180);
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = String(input.value || '').trim();
      if (!q) return;
      var blocked = searchBlockMsg(q);
      if (blocked) {
        showBlocked(blocked);
        return;
      }
      trackSiteSearch(q, 'site-search-submit');
      if (!onHome || !window.HomeBoardPreview) {
        window.location.href = base + 'index.html?q=' + encodeURIComponent(q);
        return;
      }
      HomeBoardPreview.search(q, 0).then(function (hits) {
        renderPage(hits, '정확히 일치하는 결과가 없습니다.');
      }).catch(function () {
        renderPage([], '검색 결과를 불러올 수 없습니다.');
      });
    });

    input.addEventListener('keydown', function (e) {
      var links = list.querySelectorAll('a');
      if (e.key === 'Escape') hideSuggest();
      if (!links.length || list.hidden) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(links.length - 1, activeIndex + 1);
        links.forEach(function (el, i) { el.classList.toggle('is-active', i === activeIndex); });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(0, activeIndex - 1);
        links.forEach(function (el, i) { el.classList.toggle('is-active', i === activeIndex); });
      } else if (e.key === 'Enter' && activeIndex >= 0 && links[activeIndex]) {
        e.preventDefault();
        var blockEnter = searchBlockMsg(input.value);
        if (blockEnter) {
          showBlocked(blockEnter);
          return;
        }
        trackSiteSearch(input.value, 'site-search-suggest');
        window.location.href = links[activeIndex].href;
      }
    });

    list.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a) return;
      if (searchBlockMsg(input.value)) {
        e.preventDefault();
        showBlocked(searchBlockMsg(input.value));
        return;
      }
      trackSiteSearch(input.value, 'site-search-suggest');
    });

    document.addEventListener('click', function (e) {
      if (!form.contains(e.target) && !list.contains(e.target)) hideSuggest();
    });

    var q0 = new URLSearchParams(window.location.search).get('q');
    if (q0 && onHome && window.HomeBoardPreview) {
      input.value = q0;
      var blocked0 = searchBlockMsg(q0);
      if (blocked0) {
        showBlocked(blocked0);
      } else {
        trackSiteSearch(q0, 'site-search-url');
        HomeBoardPreview.search(q0, 0).then(function (hits) {
          renderPage(hits, '정확히 일치하는 결과가 없습니다.');
        });
      }
    }
  }

  function isMobileNav() {
    return window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
  }

  function bindMoreMenu(nav) {
    var more = nav.querySelector('.nav-more');
    if (!more || more.dataset.bound === '1') return;
    more.dataset.bound = '1';
    var toggle = more.querySelector('.nav-more-toggle');
    var menu = more.querySelector('.nav-more-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
      more.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      /* 모바일에서는 CSS로 항상 펼치므로 hidden만 데스크톱 드롭다운에 사용 */
      menu.hidden = isMobileNav() ? false : !open;
    }

    function syncMobileMore() {
      if (isMobileNav()) setOpen(true);
      else if (!more.classList.contains('is-open')) menu.hidden = true;
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (isMobileNav()) return; /* 모바일은 상단 햄버거만 사용 */
      setOpen(menu.hidden);
    });

    document.addEventListener('click', function (e) {
      if (isMobileNav()) return;
      if (!more.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !isMobileNav()) setOpen(false);
    });

    window.addEventListener('resize', syncMobileMore);
    syncMobileMore();
    more._syncMobileMore = syncMobileMore;
  }

  function bindMobileToggle(nav) {
    var btn = nav.querySelector('.site-masthead-mobile-toggle');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-nav-open');
      nav.classList.toggle('is-nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var more = nav.querySelector('.nav-more');
      if (more && typeof more._syncMobileMore === 'function') more._syncMobileMore();
      syncNavbarHeight();
    });
  }

  function mountNavbar(base) {
    var nav = document.querySelector('.navbar.fixed-top') || document.querySelector('.site-masthead');
    if (!nav) return;
    if (!nav.id) nav.id = 'navbar';
    nav.classList.add('site-masthead', 'navbar-expand');
    nav.classList.remove('navbar-dark', 'bg-primary');
    /* 시안형 마크업으로 항상 갱신 (검색 바인딩은 initSearch가 담당) */
    nav.innerHTML = mastheadHtml(base, currentPageKey());
    bindMoreMenu(nav);
    bindMobileToggle(nav);
    syncNavbarHeight();
    window.addEventListener('resize', syncNavbarHeight);
    window.addEventListener('load', syncNavbarHeight);
    requestAnimationFrame(syncNavbarHeight);
  }

  /** 문서 순서: 헤더 → YouTube → 날씨 → 시계 */
  function placeUtilityBars() {
    var nav = document.querySelector('.site-masthead') || document.querySelector('#navbar');
    var yt = document.getElementById('yt-billboard-bar');
    var weather = document.getElementById('weather-banner');
    var clock = document.getElementById('world-clock-bar');
    if (!nav) return false;
    if (yt && yt.previousElementSibling !== nav) {
      nav.insertAdjacentElement('afterend', yt);
    }
    var afterNav = yt || nav;
    if (weather && weather.previousElementSibling !== afterNav) {
      afterNav.insertAdjacentElement('afterend', weather);
    }
    var afterWeather = weather || afterNav;
    if (clock && clock.previousElementSibling !== afterWeather) {
      afterWeather.insertAdjacentElement('afterend', clock);
    }
    return !!(yt || weather || clock);
  }

  function mount() {
    document.documentElement.classList.add('has-site-masthead');
    var base = assetBase();
    /* 홈(index)만 날씨/시계 제외 — free-books 등 rd-home 레이아웃은 적용 */
    var skipWeather =
      document.body.classList.contains('rd-home') &&
      !document.body.classList.contains('fb-page');
    if (!skipWeather) {
      ensureWeather(base);
    }
    mountNavbar(base);
    ensureScript(base + 'comment-badwords-client.js?v=' + VERSION, function () {
      if (window.CommentBadwords && window.CommentBadwords.load) {
        window.CommentBadwords.load();
      }
      ensureScript(base + 'site-stats.js?v=' + VERSION, function () {
        ensureScript(base + 'home-board-preview.js?v=' + VERSION, function () {
          initSearch(base);
        });
      });
    });
    ensureSiteDictLookup(base);
    /* CSS 적용 후에만 YouTube 바 삽입 — 빨간 아이콘 거대화 FOUC 방지 */
    ensureCss(base, function () {
      injectYoutubeBar();
      placeUtilityBars();
      syncNavbarHeight();
    });
    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      if (!document.getElementById('yt-billboard-bar')) injectYoutubeBar();
      var ready = placeUtilityBars();
      syncNavbarHeight();
      if ((ready && document.getElementById('weather-banner')) || tries > 20) {
        clearInterval(timer);
      }
    }, 200);
  }

  window.SiteMasthead = { mount: mount };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
