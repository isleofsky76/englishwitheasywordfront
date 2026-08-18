/**
 * 전 페이지 공통 헤더 (제목 · 검색 · 메뉴 · 날씨 · 시간 · YouTube)
 * 문서 흐름에 두어 스크롤하면 자연스럽게 사라짐
 * nav-home-menu.js 가 로드함
 */
(function () {
    var VERSION = '20260818d';
  var PRIMARY_NAV_COUNT = 6;
  var NAV_ITEMS = [
    { href: 'index.html', label: '홈', tone: 'home', pages: ['index.html', ''] },
    { href: 'english-synonym-list.html', label: '연관단어', tone: 'syn', pages: ['english-synonym-list.html', 'english-synonym.html'] },
    { href: 'defense-news-list.html', label: '국방뉴스', tone: 'defense', pages: ['defense-news-list.html', 'defense-news.html'] },
    { href: 'news-voca-list.html', label: '국제', tone: 'news', pages: ['news-voca-list.html', 'news-voca.html'] },
    { href: 'culture-voca-list.html', label: '컬쳐', tone: 'culture', pages: ['culture-voca-list.html', 'culture-voca.html'] },
    { href: 'english-opinions-list.html', label: '오피니언', tone: 'opine', pages: ['english-opinions-list.html', 'english-opinions.html'] },
    { href: 'word-of-the-day-list.html', label: '단어장', tone: 'wotd', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] },
    { href: 'vocabulary-quiz.html', label: '퀴즈', tone: 'quiz', pages: ['vocabulary-quiz.html', 'vocabulary-quiz-list.html'] },
    { href: 'popular-voca-list.html', label: '인기 어휘', tone: 'popular', pages: ['popular-voca-list.html', 'popular-voca.html'] },
    { href: 'situational-english-list.html', label: '상황', tone: 'sit', pages: ['situational-english-list.html', 'situational-english.html'] },
    { href: 'cooking-voca-list.html', label: '요리', tone: 'cook', pages: ['cooking-voca-list.html', 'cooking-voca.html'] },
    { href: 'ranking-news-list.html', label: '랭킹', tone: 'rank', pages: ['ranking-news-list.html', 'ranking-news.html'] },
    { href: 'photo-english-list.html', label: '포토', tone: 'photo', pages: ['photo-english-list.html', 'photo-english.html'] },
    { href: 'pros-cons-list.html', label: 'Pros & Cons', tone: 'pros', pages: ['pros-cons-list.html', 'pros-cons.html'] },
    { href: 'english-directory.html', label: '학습 사이트', tone: 'dir', pages: ['english-directory.html'] }
  ];

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
    if (last === 'index.html' || last === '') {
      var folder = parts[parts.length - 2] || '';
      var map = {
        'news-voca': 'news-voca.html',
        'defense-news': 'defense-news.html',
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
        'vocabulary-quiz': 'vocabulary-quiz.html'
      };
      return map[folder] || 'index.html';
    }
    return last.split('?')[0];
  }

  function isActive(item, page) {
    return item.pages.indexOf(page) !== -1;
  }

  function ensureCss(base) {
    if (document.querySelector('link[href*="site-masthead.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = base + 'site-masthead.css?v=' + VERSION;
    document.head.appendChild(link);
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
    ensureLink(base + 'weather-banner.css?v=20260612g');
    ensureLink(base + 'world-clock.css?v=20260612g');
    if (!document.querySelector('script[src*="weather-banner.js"]')) {
      var w = document.createElement('script');
      w.src = base + 'weather-banner.js?v=20260612e';
      document.head.appendChild(w);
    }
    if (!document.querySelector('script[src*="world-clock.js"]')) {
      var c = document.createElement('script');
      c.src = base + 'world-clock.js?v=20260612g';
      document.head.appendChild(c);
    }
  }

  function navItemHtml(base, page, item) {
    var active = isActive(item, page);
    var cls = 'nav-link nav-tone-' + item.tone + (active ? ' active' : '');
    var aria = active ? ' aria-current="page"' : '';
    return '<a class="' + cls + '" href="' + base + item.href + '"' + aria + '>' + item.label + '</a>';
  }

  function buildNavHtml(base, page) {
    var primary = NAV_ITEMS.slice(0, PRIMARY_NAV_COUNT);
    var extra = NAV_ITEMS.slice(PRIMARY_NAV_COUNT);
    var html = primary.map(function (item) {
      return '<li class="nav-item">' + navItemHtml(base, page, item) + '</li>';
    }).join('');
    if (!extra.length) return html;
    var extraActive = extra.some(function (item) { return isActive(item, page); });
    html +=
      '<li class="nav-item nav-more' + (extraActive ? ' has-active' : '') + '">' +
        '<button type="button" class="nav-more-toggle" aria-expanded="false" aria-haspopup="true" aria-label="더보기">' +
          '<span class="nav-more-icon" aria-hidden="true"><span></span><span></span><span></span></span>' +
        '</button>' +
        '<ul class="nav-more-menu" hidden>' +
          extra.map(function (item) {
            return '<li>' + navItemHtml(base, page, item) + '</li>';
          }).join('') +
        '</ul>' +
      '</li>';
    return html;
  }

  function mastheadHtml(base, page) {
    return (
      '<div class="site-masthead-brand">' +
        '<a href="' + base + 'index.html">' +
          '<span class="site-title-ko">시사 영단어</span>' +
          '<span class="site-title-en">(News English Lab)</span>' +
        '</a>' +
      '</div>' +
      '<div class="site-masthead-search">' +
        '<form class="site-search-form" id="site-search-form" role="search">' +
          '<input class="site-search-input" id="site-search-input" type="search" name="q" placeholder="단어·제목 검색" autocomplete="off" enterkeyhint="search">' +
          '<button class="site-search-submit" type="submit">검색</button>' +
        '</form>' +
        '<ul class="site-search-results" id="site-search-results" hidden></ul>' +
      '</div>' +
      '<div class="container-fluid">' +
        '<ul class="navbar-nav site-primary-nav">' + buildNavHtml(base, page) + '</ul>' +
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
    bar.innerHTML =
      '<span class="yt-billboard__inner">' +
        '<span class="yt-billboard__icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l12-6.5z"/></svg></span>' +
        '<span class="yt-billboard__title">YouTube로 공부하기</span>' +
        '<span class="yt-billboard__handle">@istudyeng</span>' +
      '</span>';
    var clock = document.getElementById('world-clock-bar');
    var weather = document.getElementById('weather-banner');
    var nav = document.querySelector('.navbar.fixed-top');
    var after = clock || weather || nav;
    if (after) after.insertAdjacentElement('afterend', bar);
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

    function renderSuggest(hits, emptyText) {
      activeIndex = hits && hits.length ? 0 : -1;
      if (!hits || !hits.length) {
        list.innerHTML = '<li class="site-search-empty">' + emptyText + '</li>';
        list.hidden = false;
        return;
      }
      list.innerHTML = hits.map(function (item, idx) {
        var title = String(item.title || '제목 없음').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        var href = String(item.href || '#');
        var cls = idx === 0 ? ' class="is-active"' : '';
        return '<li><a href="' + href + '"' + cls + '><span class="site-search-title">' + title + '</span></a></li>';
      }).join('');
      list.hidden = false;
    }

    function renderPage(hits, emptyText) {
      hideSuggest();
      if (!onHome) {
        window.location.href = base + 'index.html?q=' + encodeURIComponent(input.value.trim());
        return;
      }
      if (homePreviews) homePreviews.hidden = true;
      if (searchPage) searchPage.hidden = false;
      if (!searchPageList) return;
      if (!hits || !hits.length) {
        searchPageList.innerHTML = '<p class="site-search-empty">' + emptyText + '</p>';
        return;
      }
      searchPageList.innerHTML = '<ul class="site-search-page-list">' + hits.map(function (item) {
        var title = String(item.title || '제목 없음').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return '<li><a href="' + String(item.href || '#') + '">' + title + '</a></li>';
      }).join('') + '</ul>';
    }

    function previewSearch(q) {
      if (!window.HomeBoardPreview) return;
      HomeBoardPreview.search(q, 8).then(function (hits) {
        renderSuggest(hits, '검색 결과가 없습니다.');
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
      if (!onHome || !window.HomeBoardPreview) {
        window.location.href = base + 'index.html?q=' + encodeURIComponent(q);
        return;
      }
      HomeBoardPreview.search(q, 0).then(function (hits) {
        renderPage(hits, '검색 결과가 없습니다.');
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
      }
    });

    document.addEventListener('click', function (e) {
      if (!form.contains(e.target) && !list.contains(e.target)) hideSuggest();
    });

    var q0 = new URLSearchParams(window.location.search).get('q');
    if (q0 && onHome && window.HomeBoardPreview) {
      input.value = q0;
      HomeBoardPreview.search(q0, 0).then(function (hits) {
        renderPage(hits, '검색 결과가 없습니다.');
      });
    }
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
      menu.hidden = !open;
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(menu.hidden);
    });

    document.addEventListener('click', function (e) {
      if (!more.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  function mountNavbar(base) {
    var nav = document.querySelector('.navbar.fixed-top');
    if (!nav) return;
    if (!nav.id) nav.id = 'navbar';
    nav.classList.add('site-masthead', 'navbar-expand');
    nav.innerHTML = mastheadHtml(base, currentPageKey());
    bindMoreMenu(nav);
    syncNavbarHeight();
    window.addEventListener('resize', syncNavbarHeight);
    window.addEventListener('load', syncNavbarHeight);
    requestAnimationFrame(syncNavbarHeight);
  }

  function mount() {
    document.documentElement.classList.add('has-site-masthead');
    var base = assetBase();
    ensureCss(base);
    ensureWeather(base);
    mountNavbar(base);
    injectYoutubeBar();
    ensureScript(base + 'home-board-preview.js?v=' + VERSION, function () {
      initSearch(base);
    });
    setTimeout(function () {
      injectYoutubeBar();
      syncNavbarHeight();
    }, 400);
  }

  window.SiteMasthead = { mount: mount };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
