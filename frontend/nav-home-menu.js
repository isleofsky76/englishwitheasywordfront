/**

 * Navbar Home — 학습 메뉴 드롭다운

 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)

 */

(function () {

    var NAV_HOME_MENU_VERSION = '20260821f';

    var PRIMARY_BAR_HREFS = {
        'index.html': true,
        'word-of-the-day-list.html': true,
        'vocabulary-quiz.html': true,
        'english-synonym-list.html': true,
        'calm-mind-list.html': true
    };

    var HOME_SECTION_LINKS = [
        { href: 'index.html#home-best', label: 'Best 조회수', hash: 'home-best' },
        { href: 'index.html#home-recent', label: '최신 업데이트', hash: 'home-recent' }
    ];



    var MENU_ITEMS = [

        { href: 'index.html', label: '처음으로', pages: ['index.html', ''] },

        { href: 'word-of-the-day-list.html', label: '단어장', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] },

        { href: 'english-synonym-list.html', label: '유의어', pages: ['english-synonym-list.html', 'english-synonym.html'] },

        { href: 'defense-news-list.html', label: '국방뉴스', pages: ['defense-news-list.html', 'defense-news.html'] },

        { href: 'news-voca-list.html', label: '국제', pages: ['news-voca-list.html', 'news-voca.html'] },

        { href: 'vocabulary-quiz.html', label: '퀴즈', pages: ['vocabulary-quiz.html'] },

        { href: 'popular-voca-list.html', label: '이럴 땐 영어로?', pages: ['popular-voca-list.html', 'popular-voca.html'] },

        { href: 'situational-english-list.html', label: '상황', pages: ['situational-english-list.html', 'situational-english.html'] },

        { href: 'cooking-voca-list.html', label: '요리', pages: ['cooking-voca-list.html', 'cooking-voca.html'] },

        { href: 'culture-voca-list.html', label: '컬쳐', pages: ['culture-voca-list.html', 'culture-voca.html'] },

        { href: 'ranking-news-list.html', label: '랭킹', pages: ['ranking-news-list.html', 'ranking-news.html'] },

        { href: 'photo-english-list.html', label: '포토', pages: ['photo-english-list.html', 'photo-english.html'] },

        { href: 'pros-cons-list.html', label: 'Pros & Cons', pages: ['pros-cons-list.html', 'pros-cons.html'] },

        { href: 'english-opinions-list.html', label: '오피니언', pages: ['english-opinions-list.html', 'english-opinions.html'] },

        { href: 'calm-mind-list.html', label: '마음 다스리는 글', pages: ['calm-mind-list.html', 'calm-mind.html'] },

        { href: 'english-directory.html', label: '학습 사이트 디렉터리', pages: ['english-directory.html'] }

    ];



    function currentPageName() {

        var path = window.location.pathname || '';

        var page = path.split('/').pop() || 'index.html';

        if (page === '' || page === '/') return 'index.html';

        return page.split('?')[0];

    }



    function isActiveItem(item, page) {

        return item.pages.indexOf(page) !== -1;

    }



    function buildHomeSectionLinksHtml(page) {
        var hash = (window.location.hash || '').replace(/^#/, '');
        return HOME_SECTION_LINKS.map(function (item) {
            var onIndex = page === 'index.html' || page === '';
            var active = onIndex && hash === item.hash;
            var cls = 'dropdown-item nav-home-section-link' + (active ? ' active' : '');
            var aria = active ? ' aria-current="true"' : '';
            return '<li><a class="' + cls + '" href="' + item.href + '"' + aria + '>' + item.label + '</a></li>';
        }).join('');
    }



    function buildMenuHtml(isBar) {

        var page = currentPageName();

        var sectionLinksHtml = buildHomeSectionLinksHtml(page);

        var itemsHtml = MENU_ITEMS.map(function (item) {

            if (isBar && PRIMARY_BAR_HREFS[item.href]) return '';

            var active = isActiveItem(item, page);

            var cls = 'dropdown-item' + (active ? ' active' : '');

            var aria = active ? ' aria-current="page"' : '';

            return '<li><a class="' + cls + '" href="' + item.href + '"' + aria + '>' + item.label + '</a></li>';

        }).join('');



        var toggleLabel = isBar ? '더보기' : 'Home';

        return (

            '<div class="dropdown nav-home-dropdown">' +

            '<button type="button" class="nav-home-toggle dropdown-toggle" ' +

            'data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">' + toggleLabel + '</button>' +

            '<ul class="dropdown-menu dropdown-menu-end nav-home-dropdown-menu" aria-labelledby="navHomeMenuToggle">' +

            sectionLinksHtml +
            '<li><hr class="dropdown-divider nav-home-section-divider"></li>' +

            itemsHtml +

            '</ul></div>'

        );

    }



    function pinNavbarWhileOpen() {

        document.addEventListener('show.bs.dropdown', function (e) {

            if (!e.target || !e.target.closest('.nav-home-dropdown')) return;

            document.documentElement.classList.add('nav-home-open');

            var nav = document.querySelector('.navbar.fixed-top');

            if (nav) nav.style.top = '0';

        });

        document.addEventListener('hidden.bs.dropdown', function (e) {

            if (!e.target || !e.target.closest('.nav-home-dropdown')) return;

            document.documentElement.classList.remove('nav-home-open');

        });

    }



    function initToggle(toggle, menu, index) {

        var toggleId = 'navHomeMenuToggle-' + index;

        toggle.id = toggleId;

        menu.setAttribute('aria-labelledby', toggleId);



        function createDropdown() {

            if (!window.bootstrap || !bootstrap.Dropdown) {

                setTimeout(createDropdown, 30);

                return;

            }

            bootstrap.Dropdown.getOrCreateInstance(toggle, {

                popperConfig: { strategy: 'fixed' }

            });

        }

        createDropdown();

    }



    function injectNavHomeMenu() {

        document.querySelectorAll('[data-nav-home-menu]').forEach(function (slot, index) {

            var isBar = String(slot.getAttribute('data-nav-home-menu') || '') === 'bar';

            slot.innerHTML = buildMenuHtml(isBar);

            slot.setAttribute('data-nav-home-version', NAV_HOME_MENU_VERSION);

            var toggle = slot.querySelector('.nav-home-toggle');

            var menu = slot.querySelector('.dropdown-menu');

            if (toggle && menu) initToggle(toggle, menu, index);

        });

    }



    pinNavbarWhileOpen();

    function loadSiteMasthead() {
        var scripts = document.querySelectorAll('script[src]');
        var base = '';
        for (var i = 0; i < scripts.length; i += 1) {
            var src = scripts[i].getAttribute('src') || '';
            if (src.indexOf('nav-home-menu.js') !== -1) {
                base = src.replace(/[^/]+$/, '');
                break;
            }
        }
        document.documentElement.classList.add('has-site-masthead');
        if (document.querySelector('script[src*="site-masthead.js"]')) return;
        var s = document.createElement('script');
        s.src = base + 'site-masthead.js?v=20260818a';
        document.head.appendChild(s);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSiteMasthead);
    } else {
        loadSiteMasthead();
    }

})();


