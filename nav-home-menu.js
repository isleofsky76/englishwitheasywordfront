/**
 * Navbar Home — 학습 메뉴 드롭다운
 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)
 */
(function () {
    var MENU_HTML =
        '<div class="dropdown nav-home-dropdown">' +
        '<a class="navbar-brand dropdown-toggle" href="#" role="button" id="navHomeMenuToggle" ' +
        'data-bs-toggle="dropdown" aria-expanded="false">Home</a>' +
        '<ul class="dropdown-menu dropdown-menu-end nav-home-dropdown-menu" data-bs-popper-config=\'{"strategy":"fixed"}\' aria-labelledby="navHomeMenuToggle">' +
        '<li><a class="dropdown-item" href="index.html">처음으로</a></li>' +
        '<li><a class="dropdown-item" href="word-of-the-day-list.html">오늘의 단어</a></li>' +
        '<li><a class="dropdown-item" href="news-voca-list.html">뉴스 어휘</a></li>' +
        '<li><a class="dropdown-item" href="popular-voca-list.html">인기 어휘</a></li>' +
        '<li><a class="dropdown-item" href="learning-site.html">학습 사이트</a></li>' +
        '</ul></div>';

    function injectNavHomeMenu() {
        document.querySelectorAll('[data-nav-home-menu]').forEach(function (slot, index) {
            slot.innerHTML = MENU_HTML;
            var toggle = slot.querySelector('[data-bs-toggle="dropdown"]');
            if (toggle) {
                toggle.id = 'navHomeMenuToggle-' + index;
                var menu = slot.querySelector('.dropdown-menu');
                if (menu) menu.setAttribute('aria-labelledby', toggle.id);
                if (window.bootstrap && bootstrap.Dropdown) {
                    new bootstrap.Dropdown(toggle);
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectNavHomeMenu);
    } else {
        injectNavHomeMenu();
    }
})();
