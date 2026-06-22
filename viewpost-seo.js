/**
 * 게시판 글 상세 — 공통 SEO (slug URL, meta, JSON-LD)
 * 디자인 변경 없음. 각 viewpost JS는 VIEWPOST_SEO 만 설정하면 됩니다.
 */
(function () {
    const SITE_ORIGIN = 'https://englisheasystudy.com';

    const BOARD_PATHS = {
        'news-voca.html': 'news-voca',
        'cooking-voca.html': 'cooking-voca',
        'culture-voca.html': 'culture-voca',
        'ranking-news.html': 'ranking-news',
        'english-synonym.html': 'english-synonym',
        'popular-voca.html': 'popular-voca',
        'situational-english.html': 'situational-english',
        'pros-cons.html': 'pros-cons',
        'word-of-the-day.html': 'word-of-the-day',
        'photo-english.html': 'photo-english',
    };

    function plainText(html, maxLen) {
        const d = document.createElement('div');
        d.innerHTML = html || '';
        const t = (d.textContent || '').replace(/\s+/g, ' ').trim();
        if (t.length <= maxLen) return t;
        return t.slice(0, maxLen - 1).trim() + '…';
    }

    function setMeta(attr, value, useProperty) {
        if (!value) return;
        const key = useProperty ? 'property' : 'name';
        let el = document.querySelector('meta[' + key + '="' + attr + '"]');
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(key, attr);
            document.head.appendChild(el);
        }
        el.setAttribute('content', value);
    }

    function setCanonical(url) {
        let link = document.querySelector('link[rel="canonical"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'canonical';
            document.head.appendChild(link);
        }
        link.href = url;
    }

    function resolveBoardPath(cfg) {
        if (cfg && cfg.boardPath) return cfg.boardPath;
        const bodyBoard = document.body && document.body.dataset.nvBoard;
        if (bodyBoard) return bodyBoard;
        const file = (window.location.pathname.split('/').pop() || '').split('?')[0];
        return BOARD_PATHS[file] || null;
    }

    function resolveSlug(cfg) {
        const bodySlug = document.body && document.body.dataset.nvSlug;
        if (bodySlug) return bodySlug;
        const boardPath = resolveBoardPath(cfg);
        if (boardPath) {
            const m = window.location.pathname.match(new RegExp('/' + boardPath + '/([^/]+)/?$'));
            if (m) return decodeURIComponent(m[1]);
        }
        return new URLSearchParams(window.location.search).get('slug') || '';
    }

    function postPageUrl(post, cfg, index) {
        const boardPath = resolveBoardPath(cfg);
        const fallback = (cfg && cfg.fallbackHtml) || 'news-voca.html';
        if (post && post.slug && boardPath) {
            return SITE_ORIGIN + '/' + boardPath + '/' + post.slug;
        }
        const idx = index != null ? index : new URLSearchParams(window.location.search).get('index');
        if (idx != null && idx !== '') {
            return SITE_ORIGIN + '/' + fallback + '?index=' + idx;
        }
        return SITE_ORIGIN + '/' + fallback;
    }

    function injectArticleJsonLd(post, isoDate, description, cfg) {
        const id = 'nv-article-jsonld';
        const old = document.getElementById(id);
        if (old) old.remove();
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        const pageUrl = postPageUrl(post, cfg);
        const headline = (post.title || (cfg && cfg.defaultTitle) || 'Article')
            .replace(/^\[(AP|CNN|BBC)\]\s*/i, '')
            .trim();
        const payload = {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: headline,
            description: description,
            datePublished: isoDate || undefined,
            dateModified: isoDate || undefined,
            author: { '@type': 'Organization', name: 'English Easy Study' },
            publisher: {
                '@type': 'Organization',
                name: 'English Easy Study',
                url: SITE_ORIGIN,
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
            inLanguage: ['ko', 'en'],
        };
        script.textContent = JSON.stringify(payload);
        document.head.appendChild(script);
    }

    function updatePageSeo(post, cfg) {
        cfg = cfg || window.VIEWPOST_SEO || {};
        const title = (post.title || cfg.defaultTitle || 'Article').trim();
        const desc =
            (post.metaDescription || '').trim() ||
            plainText(post.message, 155);
        const label = cfg.boardLabel || 'English Easy Study';
        const fullTitle = title + ' | ' + label + ' · English Easy Study';

        document.title = fullTitle;
        setMeta('description', desc);
        setMeta('og:title', title, true);
        setMeta('og:description', desc, true);
        setMeta('twitter:title', title);
        setMeta('twitter:description', desc);

        const canonical = postPageUrl(post, cfg);
        setCanonical(canonical);
        setMeta('og:url', canonical, true);

        let isoDate;
        if (post.date) {
            const d = new Date(post.date);
            if (!isNaN(d.getTime())) isoDate = d.toISOString();
        }
        injectArticleJsonLd(post, isoDate, desc, cfg);
    }

    function normalizeEntries(messages) {
        if (Array.isArray(messages)) return messages;
        if (messages && messages.entries) return messages.entries;
        if (messages && messages.data) return messages.data;
        return null;
    }

    async function fetchPostBySlugOrIndex(apiBase, cfg, options) {
        options = options || {};
        const slug = resolveSlug(cfg);
        let index = new URLSearchParams(window.location.search).get('index');
        if (!slug && (index == null || index === '') && options.defaultIndex != null) {
            index = String(options.defaultIndex);
        }
        const listPath = cfg.listPath || '/guestbook';
        const bySlugPath = cfg.bySlugPath || listPath + '/by-slug';

        if (!slug && !index) {
            return { error: 'missing-param' };
        }

        if (slug) {
            const slugUrl = apiBase + bySlugPath + '/' + encodeURIComponent(slug);
            const slugRes = await fetch(slugUrl);
            if (slugRes.ok) {
                const slugData = await slugRes.json();
                return { post: slugData.entry, slug: slug };
            }
            if (!index) {
                return { error: 'slug-not-found', slug: slug };
            }
        }

        const response = await fetch(apiBase + listPath);
        if (!response.ok) {
            return { error: 'http', status: response.status };
        }

        const entries = normalizeEntries(await response.json());
        if (!entries) {
            return { error: 'bad-format' };
        }

        const indexNum = parseInt(index, 10);
        if (isNaN(indexNum) || indexNum < 0 || indexNum >= entries.length) {
            return { error: 'bad-index', index: index };
        }

        window.currentIndex = indexNum;
        return { post: entries[indexNum], index: indexNum };
    }

    window.ViewpostSeo = {
        SITE_ORIGIN: SITE_ORIGIN,
        BOARD_PATHS: BOARD_PATHS,
        resolveSlug: resolveSlug,
        resolveBoardPath: resolveBoardPath,
        postPageUrl: postPageUrl,
        updatePageSeo: updatePageSeo,
        fetchPostBySlugOrIndex: fetchPostBySlugOrIndex,
        plainText: plainText,
    };
})();
