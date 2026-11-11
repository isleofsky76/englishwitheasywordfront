/**

 * Navbar Home — 학습 메뉴 드롭다운

 * [data-nav-home-menu] 슬롯에 메뉴 삽입 (Bootstrap 5 필요)

 */

(function () {

    var NAV_HOME_MENU_VERSION = '20261111abs1';

    /** SEO 하위 경로에서도 깨지지 않게 /로 시작하는 주소로 통일 */
    function toSitePath(href) {
        var h = String(href || '').trim();
        if (!h) return h;
        if (/^(https?:|mailto:|tel:|#)/i.test(h)) return h;
        var hash = '';
        var q = '';
        var hm = h.match(/#.*$/);
        if (hm) { hash = hm[0]; h = h.slice(0, -hash.length); }
        var qm = h.match(/\?.*$/);
        if (qm) { q = qm[0]; h = h.slice(0, -q.length); }
        h = h.replace(/\\/g, '/').replace(/^\.\//, '').replace(/^(\.\.\/)+/, '');
        if (h.charAt(0) === '/') h = h.slice(1);
        if (!h || h === 'index.html') return '/' + q + hash;
        h = h.replace(/\.html$/i, '');
        return '/' + h + q + hash;
    }

    var PRIMARY_BAR_HREFS = {
        'index.html': true,
        '/': true,
        'word-of-the-day-list.html': true,
        '/word-of-the-day-list': true,
        'vocabulary-quiz.html': true,
        '/vocabulary-quiz': true,
        'english-synonym-list.html': true,
        '/english-synonym-list': true,
        'calm-mind-list.html': true,
        '/calm-mind-list': true,
        'english-quotes-list.html': true,
        '/english-quotes-list': true
    };

    var HOME_SECTION_LINKS = [
        { href: 'index.html#home-best', label: 'Best 조회수', hash: 'home-best' },
        { href: 'index.html#home-recent', label: '최신 업데이트', hash: 'home-recent' }
    ];



    /* site-masthead EXTRA와 동일 — 뉴스 → 단어 → 표현 → 읽을거리 → 기타 */
    var MENU_ITEMS = [
        { href: 'index.html', label: '홈', pages: ['index.html', ''] },
        { href: 'news-voca-list.html', label: '국제', pages: ['news-voca-list.html', 'news-voca.html'] },
        { href: 'korea-news-list.html', label: '한국', pages: ['korea-news-list.html', 'korea-news.html'] },
        { href: 'defense-news-list.html', label: '국방', pages: ['defense-news-list.html', 'defense-news.html'] },
        { href: 'economy-news-list.html', label: '경제', pages: ['economy-news-list.html', 'economy-news.html'] },
        { href: 'travel-news-list.html', label: '여행', pages: ['travel-news-list.html', 'travel-news.html'] },
        { href: 'sports-news-list.html', label: '스포츠', pages: ['sports-news-list.html', 'sports-news.html'] },
        { href: 'us-news-list.html', label: '미국', pages: ['us-news-list.html', 'us-news.html'] },
        { href: 'industry-news-list.html', label: '산업', pages: ['industry-news-list.html', 'industry-news.html'] },
        { href: 'culture-voca-list.html', label: '컬쳐', pages: ['culture-voca-list.html', 'culture-voca.html'] },
        { href: 'health-news-list.html', label: '건강', pages: ['health-news-list.html', 'health-news.html'] },
        { href: 'english-synonym-list.html', label: '연관단어', pages: ['english-synonym-list.html', 'english-synonym.html'] },
        { href: 'daily-english.html', label: '생활 영어 한 줄', pages: ['daily-english.html'] },
        { href: 'english-writing.html', label: '영작', pages: ['english-writing.html'] },
        { href: 'situational-english-list.html', label: '상황', pages: ['situational-english-list.html', 'situational-english.html'] },
        { href: 'pros-cons-list.html', label: 'Pros & Cons', pages: ['pros-cons-list.html', 'pros-cons.html'] },
        { href: 'shorts-bg-image-list.html', label: '신문읽는 이미지', pages: ['shorts-bg-image-list.html', 'shorts-bg-image.html'] },
        { href: 'english-opinions-list.html', label: '오피니언', pages: ['english-opinions-list.html', 'english-opinions.html'] },
        { href: 'calm-mind-list.html', label: '마음글', pages: ['calm-mind-list.html', 'calm-mind.html'] },
        { href: 'photo-english-list.html', label: '포토', pages: ['photo-english-list.html', 'photo-english.html'] },
        { href: 'english-quotes-list.html', label: '영어 명언', pages: ['english-quotes-list.html', 'english-quotes.html'] },
        { href: 'english-directory.html', label: '학습사이트', pages: ['english-directory.html'] },
        { href: 'free-books.html', label: '무료 영어 원서', pages: ['free-books.html'] },
        { href: 'dashboard.html', label: '대시보드', pages: ['dashboard.html', 'word-ranking.html'] }
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
            return '<li><a class="' + cls + '" href="' + toSitePath(item.href) + '"' + aria + '>' + item.label + '</a></li>';
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

            return '<li><a class="' + cls + '" href="' + toSitePath(item.href) + '"' + aria + '>' + item.label + '</a></li>';

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

    function scriptDirBase() {
        var scripts = document.querySelectorAll('script[src]');
        for (var i = 0; i < scripts.length; i += 1) {
            var src = scripts[i].getAttribute('src') || '';
            if (src.indexOf('nav-home-menu.js') !== -1) {
                return src.replace(/[^/]+$/, '');
            }
        }
        return '';
    }

    var MASTHEAD_CSS_VER = '20261108wx4';
    var MASTHEAD_JS_VER = '20261111abs1';

    /** FOUC 방지: 파싱 즉시 클래스·CSS 선적용 (DOMContentLoaded 기다리지 않음) */
    function injectMastheadCssEarly() {
        var base = scriptDirBase();
        document.documentElement.classList.add('has-site-masthead');
        if (!document.querySelector('link[href*="redesign-tokens.css"]')) {
            var tokens = document.createElement('link');
            tokens.rel = 'stylesheet';
            tokens.href = base + 'redesign-tokens.css?v=20261019rd4';
            document.head.appendChild(tokens);
        }
        if (!document.querySelector('link[href*="site-masthead.css"]')) {
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = base + 'site-masthead.css?v=' + MASTHEAD_CSS_VER;
            document.head.appendChild(link);
        }
    }

    function loadSiteMasthead() {
        var base = scriptDirBase();
        document.documentElement.classList.add('has-site-masthead');
        if (!document.querySelector('script[src*="site-masthead.js"]')) {
            var s = document.createElement('script');
            s.src = base + 'site-masthead.js?v=' + MASTHEAD_JS_VER;
            document.head.appendChild(s);
        }
        if (!document.querySelector('script[src*="site-footer.js"]')) {
            var f = document.createElement('script');
            f.src = base + 'site-footer.js?v=20261111abs1';
            document.head.appendChild(f);
        }
    }

    injectMastheadCssEarly();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSiteMasthead);
    } else {
        loadSiteMasthead();
    }

})();


