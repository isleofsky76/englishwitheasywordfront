/**
 * 전 페이지 공통 헤더 (제목 · 검색 · 메뉴 · 날씨 · 시간 · YouTube)
 * 문서 흐름에 두어 스크롤하면 자연스럽게 사라짐
 * nav-home-menu.js 가 로드함
 */
(function () {
    var VERSION = '20261019rd5';
  /* 시안 주 메뉴 5개 — href는 기존 URL 유지 */
  var PRIMARY_NAV_ITEMS = [
    {
      href: 'news-voca-list.html',
      label: '뉴스 영어',
      tone: 'news',
      pages: [
        'news-voca-list.html', 'news-voca.html',
        'korea-news-list.html', 'korea-news.html',
        'defense-news-list.html', 'defense-news.html',
        'culture-voca-list.html', 'culture-voca.html',
        'ranking-news-list.html', 'ranking-news.html'
      ]
    },
    { href: 'word-of-the-day-list.html?api=prod', label: '단어장', tone: 'wotd', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] },
    {
      href: 'popular-voca-list.html',
      label: '표현',
      tone: 'popular',
      pages: [
        'popular-voca-list.html', 'popular-voca.html',
        'situational-english-list.html', 'situational-english.html',
        'pros-cons-list.html', 'pros-cons.html'
      ]
    },
    { href: 'vocabulary-quiz-list.html', label: '퀴즈', tone: 'quiz', pages: ['vocabulary-quiz-list.html', 'vocabulary-quiz.html'] },
    {
      href: 'english-opinions-list.html',
      label: '읽을거리',
      tone: 'opine',
      pages: [
        'english-opinions-list.html', 'english-opinions.html',
        'calm-mind-list.html', 'calm-mind.html',
        'english-quotes-list.html', 'english-quotes.html'
      ]
    }
  ];
  var EXTRA_NAV_ITEMS = [
    { href: 'index.html', label: '홈', tone: 'home', pages: ['index.html', ''] },
    { href: 'english-synonym-list.html', label: '연관단어', tone: 'syn', pages: ['english-synonym-list.html', 'english-synonym.html'] },
    { href: 'defense-news-list.html', label: '국방뉴스', tone: 'defense', pages: ['defense-news-list.html', 'defense-news.html'] },
    { href: 'korea-news-list.html', label: '한국뉴스', tone: 'defense', pages: ['korea-news-list.html', 'korea-news.html'] },
    { href: 'culture-voca-list.html', label: '컬쳐', tone: 'culture', pages: ['culture-voca-list.html', 'culture-voca.html'] },
    { href: 'shorts-bg-image-list.html', label: '신문읽는 이미지', tone: 'sbgi', pages: ['shorts-bg-image-list.html', 'shorts-bg-image.html'] },
    { href: 'calm-mind-list.html', label: '마음글', tone: 'calm', pages: ['calm-mind-list.html', 'calm-mind.html'] },
    { href: 'situational-english-list.html', label: '상황', tone: 'sit', pages: ['situational-english-list.html', 'situational-english.html'] },
    { href: 'cooking-voca-list.html', label: '요리', tone: 'cook', pages: ['cooking-voca-list.html', 'cooking-voca.html'] },
    { href: 'ranking-news-list.html', label: '랭킹', tone: 'rank', pages: ['ranking-news-list.html', 'ranking-news.html'] },
    { href: 'photo-english-list.html', label: '포토', tone: 'photo', pages: ['photo-english-list.html', 'photo-english.html'] },
    { href: 'pros-cons-list.html', label: 'Pros & Cons', tone: 'pros', pages: ['pros-cons-list.html', 'pros-cons.html'] },
    { href: 'english-quotes-list.html', label: '영어 명언', tone: 'quote', pages: ['english-quotes-list.html', 'english-quotes.html'] },
    { href: 'english-directory.html', label: '학습 사이트', tone: 'dir', pages: ['english-directory.html'] }
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
    if (last === 'index.html' || last === '') {
      var folder = parts[parts.length - 2] || '';
      var map = {
        'news-voca': 'news-voca.html',
        'defense-news': 'defense-news.html',
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
      return map[folder] || 'index.html';
    }
    return last.split('?')[0];
  }

  function isActive(item, page) {
    return item.pages.indexOf(page) !== -1;
  }

  function ensureCss(base) {
    ensureLink(base + 'redesign-tokens.css?v=' + VERSION);
    if (!document.querySelector('link[href*="site-masthead.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = base + 'site-masthead.css?v=' + VERSION;
      document.head.appendChild(link);
    }
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
    var primary = PRIMARY_NAV_ITEMS;
    var extra = EXTRA_NAV_ITEMS;
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
    bar.innerHTML =
      '<span class="yt-billboard__inner">' +
        '<span class="yt-billboard__icon" aria-hidden="true">' +
          '<svg viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg" focusable="false">' +
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

  function bindMobileToggle(nav) {
    var btn = nav.querySelector('.site-masthead-mobile-toggle');
    if (!btn || btn.dataset.bound === '1') return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', function () {
      var open = !nav.classList.contains('is-nav-open');
      nav.classList.toggle('is-nav-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
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
      if (!document.getElementById('yt-billboard-bar')) injectYoutubeBar();
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
