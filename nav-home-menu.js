/**
 * Navbar Home — 학습 메뉴 드롭다운
 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)
 */
(function () {
    var MENU_HTML =
        '<div class="dropdown nav-home-dropdown">' +
        '<button type="button" class="nav-home-toggle dropdown-toggle" ' +
        'data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">Home</button>' +
        '<ul class="dropdown-menu dropdown-menu-end nav-home-dropdown-menu" aria-labelledby="navHomeMenuToggle">' +
        '<li><a class="dropdown-item" href="index.html">처음으로</a></li>' +
        '<li><a class="dropdown-item" href="word-of-the-day-list.html">오늘의 단어</a></li>' +
        '<li><a class="dropdown-item" href="news-voca-list.html">뉴스 어휘</a></li>' +
        '<li><a class="dropdown-item" href="popular-voca-list.html">인기 어휘</a></li>' +
        '<li><a class="dropdown-item" href="english-synonym-list.html">유의어</a></li>' +
        '<li><a class="dropdown-item" href="pros-cons-list.html">Pros & Cons</a></li>' +
        '<li><a class="dropdown-item" href="learning-site.html">학습 사이트</a></li>' +
        '</ul></div>';

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
            slot.innerHTML = MENU_HTML;
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

