/**
 * 글 상세 — 댓글 · 글쓰기 · 조회 · 추천
 * initViewpostLike({ entryId, likes, views, apiBaseUrl, board, commentsBoard, contentKey, title })
 */
(function () {
    var ENGAGE_VER = '20261115engage5';
    var COMMENTS_JS = 'board-comments.js?v=20261108pw25';
    var COMMENTS_CSS = 'board-comments.css?v=' + ENGAGE_VER;
    var ARTICLE_CSS = 'redesign-article.css?v=' + ENGAGE_VER;

    function isValidObjectId(id) {
        return /^[a-f0-9]{24}$/i.test(String(id || ''));
    }

    function hasUserLiked(entryId) {
        return localStorage.getItem('gb-like-' + entryId) === '1';
    }

    function assetBase() {
        var likeScript = document.querySelector('script[src*="viewpost-like"]');
        if (likeScript && likeScript.src) {
            return likeScript.src.replace(/[^/]+$/, '');
        }
        return '/';
    }

    function ensureCss(href) {
        var file = String(href || '').split('?')[0].replace(/^.*\//, '');
        if (!file) return;
        if (document.querySelector('link[href*="' + file + '"]')) return;
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            var name = src.replace(/^.*\//, '').split('?')[0];
            if (document.querySelector('script[src*="' + name + '"]')) {
                resolve();
                return;
            }
            var s = document.createElement('script');
            s.src = src;
            s.onload = function () { resolve(); };
            s.onerror = function () { reject(new Error(src)); };
            document.head.appendChild(s);
        });
    }

    function resolveRelatedScriptSrc() {
        var likeScript = document.querySelector('script[src*="viewpost-like"]');
        if (likeScript && likeScript.src) {
            return likeScript.src.replace(/viewpost-like[^/]*\.js(\?.*)?$/, 'viewpost-related.js?v=20261019norel');
        }
        return '/viewpost-related.js?v=20261019norel';
    }

    function loadRelatedPosts(options) {
        var board = String((options && options.board) || '').trim();
        var seoBoard = document.body && document.body.dataset.nvBoard;
        if (!board && !seoBoard) return;

        function run() {
            if (typeof window.initViewpostRelated === 'function') {
                window.initViewpostRelated(options);
            }
        }

        if (typeof window.initViewpostRelated === 'function') {
            run();
            return;
        }

        if (document.querySelector('script[data-viewpost-related]')) {
            document.addEventListener('viewpost-related-ready', function onReady() {
                document.removeEventListener('viewpost-related-ready', onReady);
                run();
            });
            return;
        }

        var script = document.createElement('script');
        script.src = resolveRelatedScriptSrc();
        script.dataset.viewpostRelated = '1';
        script.onload = run;
        script.onerror = function () {
            console.error('viewpost-related.js 로드 실패');
        };
        document.body.appendChild(script);
    }

    function readViews(options) {
        var n = parseInt(options && options.views, 10);
        if (Number.isFinite(n) && n >= 0) return n;
        var meta = document.querySelector('#post-meta .post-meta-views-num, [data-rd-views]');
        if (meta) {
            var m = parseInt(meta.textContent, 10);
            if (Number.isFinite(m) && m >= 0) return m;
        }
        return 0;
    }

    function resolveContentKey(options) {
        var key = String((options && options.contentKey) || '').trim();
        if (key) return key;
        if (document.body && document.body.dataset.nvSlug) {
            return String(document.body.dataset.nvSlug).trim();
        }
        if (document.body && document.body.dataset.vpEngageKey) {
            return String(document.body.dataset.vpEngageKey).trim();
        }
        var entryId = String((options && options.entryId) || '').trim();
        return entryId;
    }

    function resolveCommentsBoard(options) {
        var b = String((options && (options.commentsBoard || options.boardKey)) || '').trim();
        if (b) return b;
        if (document.body && document.body.dataset.nvBoard) {
            return String(document.body.dataset.nvBoard).trim();
        }
        if (document.body && document.body.dataset.vpEngageBoard) {
            return String(document.body.dataset.vpEngageBoard).trim();
        }
        return String((options && options.board) || '').trim();
    }

    function findMountParent() {
        return (
            document.getElementById('post-container') ||
            document.getElementById('post-content') ||
            document.querySelector('[data-vp-engage-host]') ||
            document.querySelector('main') ||
            document.body
        );
    }

    /** 없으면 본문 맨 끝에 댓글·조회·추천 줄 생성 */
    function ensureEngagementShell(options) {
        ensureCss(assetBase() + ARTICLE_CSS);
        ensureCss(assetBase() + COMMENTS_CSS);

        var engagement = document.getElementById('rd-engagement-host');
        if (engagement) {
            var viewsEl = engagement.querySelector('[data-rd-views]');
            if (viewsEl && !viewsEl.textContent.trim()) {
                viewsEl.textContent = String(readViews(options));
            }
            return engagement;
        }

        var tools = document.querySelector('[data-vp-engage-bar]');
        if (!tools) {
            var parent = findMountParent();
            if (!parent) return null;
            tools = document.createElement('div');
            tools.className = 'rd-article-action-tools vp-engage-bar';
            tools.setAttribute('data-vp-engage-bar', '');
            parent.appendChild(tools);
        } else {
            tools.classList.add('rd-article-action-tools', 'vp-engage-bar');
        }

        var commentsHost =
            tools.querySelector('[data-board-comments-root]') ||
            document.getElementById('vp-comments-host');
        if (!commentsHost) {
            commentsHost = document.createElement('div');
            commentsHost.id = 'vp-comments-host';
            commentsHost.className = 'board-comments-root';
            commentsHost.setAttribute('data-board-comments-root', '');
            tools.appendChild(commentsHost);
        }

        engagement = document.createElement('div');
        engagement.className = 'rd-article-stats';
        engagement.id = 'rd-engagement-host';
        engagement.setAttribute('aria-label', '조회와 추천');
        engagement.innerHTML =
            '<span class="rd-article-stat">조회 <strong class="rd-stat-views" data-rd-views>' +
            readViews(options) +
            '</strong></span>' +
            '<div class="viewpost-like-row rd-article-stats-like">' +
            '<div id="viewpost-like-box" class="viewpost-like-box" aria-live="polite"></div>' +
            '</div>' +
            '<span class="post-meta-likes-num" hidden>' +
            (parseInt(options && options.likes, 10) || 0) +
            '</span>';

        tools.appendChild(engagement);
        return engagement;
    }

    function mountLikeBox(engagement) {
        var host = engagement || document.getElementById('rd-engagement-host');
        if (!host) return null;

        var row = host.querySelector('.viewpost-like-row');
        if (!row) {
            row = document.createElement('div');
            row.className = 'viewpost-like-row rd-article-stats-like';
            host.appendChild(row);
        }

        var container = row.querySelector('#viewpost-like-box');
        if (!container) {
            container = document.createElement('div');
            container.id = 'viewpost-like-box';
            container.className = 'viewpost-like-box';
            container.setAttribute('aria-live', 'polite');
            row.appendChild(container);
        }

        var external = document.body.querySelector(
            ':scope > .text-center #viewpost-like-box, :scope > #viewpost-like-box'
        );
        if (external && external !== container) {
            var wrap = external.closest('.text-center');
            if (wrap) wrap.remove();
            else external.remove();
        }

        return container;
    }

    function mountComments(options) {
        var commentsBoard = resolveCommentsBoard(options);
        var contentKey = resolveContentKey(options);
        if (!commentsBoard || !contentKey) return;

        var root =
            document.getElementById('vp-comments-host') ||
            document.getElementById('rd-word-comments-host') ||
            document.querySelector(
              '.rd-article-action-tools [data-board-comments-root], .exam-action-tools [data-board-comments-root], [data-board-comments-root]'
            );
        if (!root) return;
        if (root.getAttribute('data-vp-comments-mounted') === '1') return;
        if (root.querySelector('.os-cmt-bar, .os-cmt-toggle')) return;

        var base = assetBase();
        ensureCss(base + COMMENTS_CSS);
        var ready = window.BoardComments
            ? Promise.resolve()
            : loadScript(base + COMMENTS_JS);

        ready
            .then(function () {
                if (!window.BoardComments || typeof window.BoardComments.mount !== 'function') return null;
                root.setAttribute('data-vp-comments-mounted', '1');
                return window.BoardComments.mount({
                    board: commentsBoard,
                    contentKey: contentKey,
                    root: root,
                    title: (options && options.title) || document.title || contentKey
                });
            })
            .catch(function (err) {
                console.warn('board comments mount skipped', err);
            });
    }

    window.initViewpostLike = function (options) {
        options = options || {};
        var engagement = ensureEngagementShell(options);
        mountComments(options);

        var container = mountLikeBox(engagement);
        if (!container) return;

        var entryId = String(options.entryId || '');
        var apiBase = options.apiBaseUrl || '';
        var board = options.board || 'guestbook';
        var canLike = isValidObjectId(entryId);
        var liked = canLike && hasUserLiked(entryId);
        var count = parseInt(options.likes, 10) || 0;

        var viewsEl = document.querySelector('#rd-engagement-host [data-rd-views]');
        if (viewsEl) viewsEl.textContent = String(readViews(options));

        container.innerHTML =
            '<button type="button" class="vp-like-btn' + (liked ? ' is-active' : '') + '"' +
            ' aria-label="추천"' + ((liked || !canLike) ? ' disabled' : '') + '>' +
            '<span class="vp-like-icon" aria-hidden="true">♥</span>' +
            '<span class="vp-like-label">추천</span>' +
            '<strong class="vp-like-count">' + count + '</strong>' +
            '</button>';

        loadRelatedPosts({ apiBaseUrl: apiBase, board: board });

        var btn = container.querySelector('.vp-like-btn');
        var countEl = container.querySelector('.vp-like-count');
        if (!btn || !canLike || !apiBase) return;

        function applyLikedState(likes) {
            localStorage.setItem('gb-like-' + entryId, '1');
            btn.classList.add('is-active');
            btn.disabled = true;
            if (countEl) countEl.textContent = likes;
            document.querySelectorAll('#post-meta .post-meta-likes-num, #rd-engagement-host .post-meta-likes-num').forEach(function (el) {
                el.textContent = likes;
            });
        }

        btn.addEventListener('click', function () {
            if (btn.disabled || hasUserLiked(entryId)) return;
            btn.disabled = true;

            fetch(apiBase + '/' + board + '/' + entryId + '/like', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(function (res) {
                    return res.json().then(function (data) {
                        return { ok: res.ok, data: data };
                    });
                })
                .then(function (result) {
                    if (!result.ok) {
                        throw new Error((result.data && result.data.error) || 'Like request failed');
                    }
                    var likes = result.data.likes != null ? result.data.likes : count + 1;
                    applyLikedState(likes);
                })
                .catch(function (err) {
                    console.error('추천 저장 실패:', err);
                    btn.disabled = false;
                    alert('추천을 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
                });
        });
    };

    /** 정적 페이지: body[data-vp-engage-page] 가 있으면 맨 아래 자동 장착 */
    function bootStaticEngage() {
        var body = document.body;
        if (!body || body.getAttribute('data-vp-engage-page') !== '1') return;
        if (document.getElementById('rd-engagement-host')) return;
        window.initViewpostLike({
            entryId: '',
            likes: 0,
            views: 0,
            board: body.dataset.vpEngageBoard || 'page',
            commentsBoard: body.dataset.vpEngageBoard || 'page',
            contentKey: body.dataset.vpEngageKey || (location.pathname.replace(/\/+$/, '') || '/'),
            title: document.title
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bootStaticEngage);
    } else {
        bootStaticEngage();
    }
})();
