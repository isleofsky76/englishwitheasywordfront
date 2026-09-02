/**
 * 글 상세 — 같은 섹션의 다른 글 (이어서 읽기)
 * initViewpostRelated({ apiBaseUrl, board })
 */
(function () {
    var ENABLED_BOARDS = {
        'calm-mind': {
            heading: '다른 마음 다스리는 글',
            listHtml: 'calm-mind-list.html',
            listPath: '/calm-mind',
            limit: 5,
        },
    };

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

    function postHref(board, slug) {
        return '/' + encodeURIComponent(board) + '/' + encodeURIComponent(slug) + '/';
    }

    function ensureStylesheet() {
        if (document.querySelector('link[data-viewpost-related-css]')) return;
        var likeLink = document.querySelector('link[href*="viewpost-like"]');
        var href = likeLink
            ? likeLink.href.replace(/viewpost-like[^/]*\.css[^/]*/, 'viewpost-related.css?v=20260903a')
            : '/viewpost-related.css?v=20260903a';
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

    function renderRelated(row, config, entries, currentSlug) {
        var items = entries
            .filter(function (entry) {
                return entry && String(entry.slug || '').trim() && String(entry.slug).trim() !== currentSlug;
            })
            .sort(function (a, b) {
                return entryDateMs(b) - entryDateMs(a);
            })
            .slice(0, config.limit);

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
                    escapeHtml(postHref(config.board, slug)) +
                    '">' +
                    title +
                    '</a></li>'
                );
            })
            .join('');

        row.hidden = false;
        row.innerHTML =
            '<h2 class="viewpost-related-heading">' +
            escapeHtml(config.heading) +
            '</h2>' +
            '<ul class="viewpost-related-list">' +
            listHtml +
            '</ul>' +
            '<p class="viewpost-related-more">' +
            '<a class="viewpost-related-more-link" href="../../' +
            escapeHtml(config.listHtml) +
            '">전체 목록 보기</a>' +
            '</p>';
    }

    window.initViewpostRelated = function (options) {
        options = options || {};
        var board = String(options.board || (document.body && document.body.dataset.nvBoard) || '').trim();
        var config = ENABLED_BOARDS[board];
        if (!config) return;

        var apiBase = String(options.apiBaseUrl || '').replace(/\/$/, '');
        if (!apiBase) return;

        var currentSlug = resolveCurrentSlug();
        var row = mountRelatedRow();
        if (!row) return;

        ensureStylesheet();
        row.hidden = false;
        row.innerHTML = '<p class="viewpost-related-loading">다른 글 불러오는 중…</p>';

        fetch(apiBase + config.listPath, { headers: { Accept: 'application/json' } })
            .then(function (res) {
                if (!res.ok) throw new Error('list fetch failed');
                return res.json();
            })
            .then(function (data) {
                renderRelated(
                    row,
                    {
                        board: board,
                        heading: config.heading,
                        listHtml: config.listHtml,
                        limit: config.limit,
                    },
                    normalizeEntries(data),
                    currentSlug
                );
            })
            .catch(function (err) {
                console.error('다른 글 목록 불러오기 실패:', err);
                row.innerHTML = '';
                row.hidden = true;
            });
    };

    document.dispatchEvent(new CustomEvent('viewpost-related-ready'));
})();
