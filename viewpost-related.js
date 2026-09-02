/**
 * 글 상세 — 같은 섹션의 다른 글 (이어서 읽기)
 * initViewpostRelated({ apiBaseUrl, board })
 *
 * board: API 경로 (guestbook, opinions, calm-mind …) 또는 SEO boardPath (news-voca …)
 */
(function () {
    var DEFAULT_LIMIT = 5;
    var CACHE_VERSION = '20260903c';

    var BOARD_ROWS = [
        {
            apiBoard: 'guestbook',
            seoBoard: 'news-voca',
            heading: '다른 News Voca',
            listPath: '/guestbook',
            listHtml: 'news-voca-list.html',
        },
        {
            apiBoard: 'wordofday',
            seoBoard: 'word-of-the-day',
            heading: '다른 Word of the Day',
            listPath: '/wordofday',
            listHtml: 'word-of-the-day-list.html',
        },
        {
            apiBoard: 'photo-english',
            seoBoard: 'photo-english',
            heading: '다른 포토영어',
            listPath: '/photo-english',
            listHtml: 'photo-english-list.html',
        },
        {
            apiBoard: 'ranking-news',
            seoBoard: 'ranking-news',
            heading: '다른 Ranking News',
            listPath: '/ranking-news',
            listHtml: 'ranking-news-list.html',
        },
        {
            apiBoard: 'cooking-voca',
            seoBoard: 'cooking-voca',
            heading: '다른 Cooking Voca',
            listPath: '/cooking-voca',
            listHtml: 'cooking-voca-list.html',
        },
        {
            apiBoard: 'culture-voca',
            seoBoard: 'culture-voca',
            heading: '다른 Culture Voca',
            listPath: '/culture-voca',
            listHtml: 'culture-voca-list.html',
        },
        {
            apiBoard: 'defense-news',
            seoBoard: 'defense-news',
            heading: '다른 국방뉴스',
            listPath: '/defense-news',
            listHtml: 'defense-news-list.html',
        },
        {
            apiBoard: 'shorts-bg-image',
            seoBoard: 'shorts-bg-image',
            heading: '다른 신문읽는 이미지',
            listPath: '/shorts-bg-image',
            listHtml: 'shorts-bg-image-list.html',
        },
        {
            apiBoard: 'vocabulary',
            seoBoard: 'english-synonym',
            heading: '다른 유의어',
            listPath: '/vocabulary',
            listHtml: 'english-synonym-list.html',
        },
        {
            apiBoard: 'opinions',
            seoBoard: 'english-opinions',
            heading: '다른 오피니언',
            listPath: '/opinions',
            listHtml: 'english-opinions-list.html',
        },
        {
            apiBoard: 'calm-mind',
            seoBoard: 'calm-mind',
            heading: '다른 마음 다스리는 글',
            listPath: '/calm-mind',
            listHtml: 'calm-mind-list.html',
        },
        {
            apiBoard: 'easy-voca',
            seoBoard: 'popular-voca',
            heading: '다른 Popular Voca',
            listPath: '/easy-voca',
            listHtml: 'popular-voca-list.html',
        },
        {
            apiBoard: 'situational-english',
            seoBoard: 'situational-english',
            heading: '다른 상황별 영어',
            listPath: '/situational-english',
            listHtml: 'situational-english-list.html',
        },
        {
            apiBoard: 'pros-cons',
            seoBoard: 'pros-cons',
            heading: '다른 장단점',
            listPath: '/pros-cons',
            listHtml: 'pros-cons-list.html',
        },
    ];

    var BOARD_BY_API = {};
    var BOARD_BY_SEO = {};
    BOARD_ROWS.forEach(function (row) {
        BOARD_BY_API[row.apiBoard] = row;
        BOARD_BY_SEO[row.seoBoard] = row;
    });

    function escapeHtml(text) {
        return String(text ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function normalizeEntries(data) {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray(data.entries)) return data.entries;
        if (data && Array.isArray(data.data)) return data.data;
        return [];
    }

    function resolveBoardConfig(options) {
        var boardKey = String((options && options.board) || '').trim();
        if (boardKey && BOARD_BY_API[boardKey]) return BOARD_BY_API[boardKey];
        if (boardKey && BOARD_BY_SEO[boardKey]) return BOARD_BY_SEO[boardKey];

        var seoBoard = document.body && document.body.dataset.nvBoard;
        if (seoBoard && BOARD_BY_SEO[String(seoBoard).trim()]) {
            return BOARD_BY_SEO[String(seoBoard).trim()];
        }
        return null;
    }

    function resolveCurrentSlug() {
        var bodySlug = document.body && document.body.dataset.nvSlug;
        if (bodySlug) return String(bodySlug).trim();
        if (window.ViewpostSeo && typeof window.ViewpostSeo.resolveSlug === 'function') {
            return String(window.ViewpostSeo.resolveSlug() || '').trim();
        }
        return '';
    }

    function entryDateMs(entry) {
        if (!entry || !entry.date) return 0;
        var d = new Date(entry.date);
        return Number.isNaN(d.getTime()) ? 0 : d.getTime();
    }

    function postHref(seoBoard, slug) {
        return '/' + encodeURIComponent(seoBoard) + '/' + encodeURIComponent(slug) + '/';
    }

    function ensureStylesheet() {
        if (document.querySelector('link[data-viewpost-related-css]')) return;
        var likeLink = document.querySelector('link[href*="viewpost-like"]');
        var href = likeLink
            ? likeLink.href.replace(/viewpost-like[^/]*\.css[^/]*/, 'viewpost-related.css?v=' + CACHE_VERSION)
            : '/viewpost-related.css?v=' + CACHE_VERSION;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.setAttribute('data-viewpost-related-css', '1');
        document.head.appendChild(link);
    }

    function mountRelatedRow() {
        var postContainer = document.getElementById('post-container');
        if (!postContainer) return null;

        var row = postContainer.querySelector('.viewpost-related-row');
        if (!row) {
            row = document.createElement('section');
            row.className = 'viewpost-related-row';
            row.setAttribute('aria-label', '다른 글');
            postContainer.appendChild(row);
        }
        return row;
    }

    function renderRelated(row, boardConfig, entries, currentSlug) {
        var items = entries
            .filter(function (entry) {
                return entry && String(entry.slug || '').trim() && String(entry.slug).trim() !== currentSlug;
            })
            .sort(function (a, b) {
                return entryDateMs(b) - entryDateMs(a);
            })
            .slice(0, DEFAULT_LIMIT);

        if (!items.length) {
            row.innerHTML = '';
            row.hidden = true;
            return;
        }

        var listHtml = items
            .map(function (entry) {
                var title = escapeHtml((entry.title || '').trim() || '제목 없음');
                var slug = String(entry.slug).trim();
                return (
                    '<li class="viewpost-related-item">' +
                    '<a class="viewpost-related-link" href="' +
                    escapeHtml(postHref(boardConfig.seoBoard, slug)) +
                    '">' +
                    title +
                    '</a></li>'
                );
            })
            .join('');

        row.hidden = false;
        row.innerHTML =
            '<h2 class="viewpost-related-heading">' +
            escapeHtml(boardConfig.heading) +
            '</h2>' +
            '<ul class="viewpost-related-list">' +
            listHtml +
            '</ul>' +
            '<p class="viewpost-related-more">' +
            '<a class="viewpost-related-more-link" href="../../' +
            escapeHtml(boardConfig.listHtml) +
            '">전체 목록 보기</a>' +
            '</p>';
    }

    window.initViewpostRelated = function (options) {
        options = options || {};
        var boardConfig = resolveBoardConfig(options);
        if (!boardConfig) return;

        var apiBase = String(options.apiBaseUrl || '').replace(/\/$/, '');
        if (!apiBase) return;

        var currentSlug = resolveCurrentSlug();
        var row = mountRelatedRow();
        if (!row) return;

        ensureStylesheet();
        row.hidden = false;
        row.innerHTML = '<p class="viewpost-related-loading">다른 글 불러오는 중…</p>';

        fetch(apiBase + boardConfig.listPath, { headers: { Accept: 'application/json' } })
            .then(function (res) {
                if (!res.ok) throw new Error('list fetch failed');
                return res.json();
            })
            .then(function (data) {
                renderRelated(row, boardConfig, normalizeEntries(data), currentSlug);
            })
            .catch(function (err) {
                console.error('다른 글 목록 불러오기 실패:', err);
                row.innerHTML = '';
                row.hidden = true;
            });
    };

    document.dispatchEvent(new CustomEvent('viewpost-related-ready'));
})();
