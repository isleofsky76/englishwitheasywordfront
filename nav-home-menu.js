/**

 * Navbar Home — 학습 메뉴 드롭다운

 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)

 */

(function () {

    var NAV_HOME_MENU_VERSION = '20260626c';



    var MENU_ITEMS = [

        { href: 'index.html', label: '처음으로', pages: ['index.html', ''] },

        { href: 'word-of-the-day-list.html', label: '오늘의 단어', pages: ['word-of-the-day-list.html', 'word-of-the-day.html'] },

        { href: 'news-voca-list.html', label: '뉴스 어휘', pages: ['news-voca-list.html', 'news-voca.html'] },

        { href: 'popular-voca-list.html', label: '인기 어휘', pages: ['popular-voca-list.html', 'popular-voca.html'] },

        { href: 'situational-english-list.html', label: '상황 영어', pages: ['situational-english-list.html', 'situational-english.html'] },

        { href: 'cooking-voca-list.html', label: '요리 영어', pages: ['cooking-voca-list.html', 'cooking-voca.html'] },

        { href: 'culture-voca-list.html', label: '컬쳐 어휘', pages: ['culture-voca-list.html', 'culture-voca.html'] },

        { href: 'english-synonym-list.html', label: '유의어', pages: ['english-synonym-list.html', 'english-synonym.html'] },

        { href: 'ranking-news-list.html', label: '랭킹 뉴스', pages: ['ranking-news-list.html', 'ranking-news.html'] },

        { href: 'photo-english-list.html', label: '포토영어', pages: ['photo-english-list.html', 'photo-english.html'] },

        { href: 'pros-cons-list.html', label: 'Pros & Cons', pages: ['pros-cons-list.html', 'pros-cons.html'] },

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



    function buildMenuHtml() {

        var page = currentPageName();

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

            '<li class="nav-home-preview-section">' +
            '<div class="nav-home-preview-heading">Best 조회수</div>' +
            '<div class="nav-home-preview-list" data-nav-home-best data-list-class="nav-home-preview-items"></div>' +
            '</li>' +
            '<li><hr class="dropdown-divider nav-home-preview-divider"></li>' +
            '<li class="nav-home-preview-section">' +
            '<div class="nav-home-preview-heading">최신 업데이트</div>' +
            '<div class="nav-home-preview-list" data-nav-home-recent data-list-class="nav-home-preview-items"></div>' +
            '</li>' +
            '<li><hr class="dropdown-divider nav-home-preview-divider"></li>' +

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



    function loadNavHomePreviews(slot) {
        var bestEl = slot.querySelector('[data-nav-home-best]');
        var recentEl = slot.querySelector('[data-nav-home-recent]');
        if (!bestEl && !recentEl) return;

        function render() {
            if (!window.HomeBoardPreview) return;
            window.HomeBoardPreview.loadNavPreviews(bestEl, recentEl, 5);
        }

        if (window.HomeBoardPreview) {
            render();
            return;
        }

        var script = document.querySelector('script[data-home-board-preview]');
        if (!script) {
            script = document.createElement('script');
            script.src = 'home-board-preview.js?v=20260626';
            script.setAttribute('data-home-board-preview', '1');
            script.onload = render;
            script.onerror = function () {
                var failHtml = '<ul class="nav-home-preview-items"><li class="preview-empty">불러올 수 없습니다.</li></ul>';
                if (bestEl) bestEl.innerHTML = failHtml;
                if (recentEl) recentEl.innerHTML = failHtml;
            };
            document.head.appendChild(script);
        } else if (window.HomeBoardPreview) {
            render();
        } else {
            script.addEventListener('load', render);
        }
    }

    function initNavHomePreviewsLazy(slot) {
        if (slot.getAttribute('data-nav-preview-bound') === '1') return;
        slot.setAttribute('data-nav-preview-bound', '1');
        var dropdown = slot.querySelector('.nav-home-dropdown');
        if (!dropdown) return;
        dropdown.addEventListener('show.bs.dropdown', function onFirstOpen() {
            dropdown.removeEventListener('show.bs.dropdown', onFirstOpen);
            loadNavHomePreviews(slot);
        });
    }



    function injectNavHomeMenu() {

        document.querySelectorAll('[data-nav-home-menu]').forEach(function (slot, index) {

            slot.innerHTML = buildMenuHtml();

            slot.setAttribute('data-nav-home-version', NAV_HOME_MENU_VERSION);

            var toggle = slot.querySelector('.nav-home-toggle');

            var menu = slot.querySelector('.dropdown-menu');

            if (toggle && menu) initToggle(toggle, menu, index);

            initNavHomePreviewsLazy(slot);

        });

    }



    pinNavbarWhileOpen();



    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', injectNavHomeMenu);

    } else {

        injectNavHomeMenu();

    }

})();


