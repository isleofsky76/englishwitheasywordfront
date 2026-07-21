/**

 * Navbar Home — 학습 메뉴 드롭다운

 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)

 */

(function () {

    var NAV_HOME_MENU_VERSION = '20260721b';

    // SEO slug 페이지(/word-of-the-day/slug/ 등)에서도 동작하도록 루트 절대 경로 사용
    var HOME_SECTION_LINKS = [
        { href: '/index.html#home-best', label: 'Best 조회수', hash: 'home-best' },
        { href: '/index.html#home-recent', label: '최신 업데이트', hash: 'home-recent' }
    ];



    var MENU_ITEMS = [

        { href: '/index.html', label: '처음으로', pages: ['index.html', ''] },

        { href: '/word-of-the-day-list.html', label: '오늘의 단어장', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] },

        { href: '/news-voca-list.html', label: '뉴스 어휘', pages: ['news-voca-list.html', 'news-voca.html'] },

        { href: '/vocabulary-quiz.html', label: '영어 단어 퀴즈', pages: ['vocabulary-quiz.html'] },

        { href: '/popular-voca-list.html', label: '인기 어휘', pages: ['popular-voca-list.html', 'popular-voca.html'] },

        { href: '/situational-english-list.html', label: '상황 영어', pages: ['situational-english-list.html', 'situational-english.html'] },

        { href: '/cooking-voca-list.html', label: '요리 영어', pages: ['cooking-voca-list.html', 'cooking-voca.html'] },

        { href: '/culture-voca-list.html', label: '컬쳐 어휘', pages: ['culture-voca-list.html', 'culture-voca.html'] },

        { href: '/english-synonym-list.html', label: '유의어', pages: ['english-synonym-list.html', 'english-synonym.html'] },

        { href: '/ranking-news-list.html', label: '랭킹 뉴스', pages: ['ranking-news-list.html', 'ranking-news.html'] },

        { href: '/photo-english-list.html', label: '포토영어', pages: ['photo-english-list.html', 'photo-english.html'] },

        { href: '/pros-cons-list.html', label: 'Pros & Cons', pages: ['pros-cons-list.html', 'pros-cons.html'] },

        { href: '/english-directory.html', label: '학습 사이트 디렉터리', pages: ['english-directory.html'] }

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



    function buildMenuHtml() {

        var page = currentPageName();

        var sectionLinksHtml = buildHomeSectionLinksHtml(page);

        var itemsHtml = MENU_ITEMS.map(function (item) {

            var active = isActiveItem(item, page);

            var cls = 'dropdown-item' + (active ? ' active' : '');

            var aria = active ? ' aria-current="page"' : '';

            return '<li><a class="' + cls + '" href="' + item.href + '"' + aria + '>' + item.label + '</a></li>';

        }).join('');



        return (

            '<div class="dropdown nav-home-dropdown">' +

            '<button type="button" class="nav-home-toggle dropdown-toggle" ' +

            'data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Home</button>' +

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

            slot.innerHTML = buildMenuHtml();

            slot.setAttribute('data-nav-home-version', NAV_HOME_MENU_VERSION);

            var toggle = slot.querySelector('.nav-home-toggle');

            var menu = slot.querySelector('.dropdown-menu');

            if (toggle && menu) initToggle(toggle, menu, index);

        });

    }



    pinNavbarWhileOpen();



    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', injectNavHomeMenu);

    } else {

        injectNavHomeMenu();

    }

})();


