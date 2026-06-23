// 포토영어 view post - uses /photo-english API (베이스 URL은 page30-api-config.js)
const urlParams = new URLSearchParams(window.location.search);
const apiMode = urlParams.get('api');
const API_BASE_URL = typeof getPage30ApiBaseUrl === 'function'
    ? getPage30ApiBaseUrl()
    : window.PAGE30_PRODUCTION_API_BASE || 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';

window.VIEWPOST_SEO = {
    boardPath: 'photo-english',
    boardLabel: 'Photo English',
    fallbackHtml: 'photo-english.html',
    listPath: '/photo-english',
    bySlugPath: '/photo-english/by-slug',
};

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function sanitizeHtml(html) {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'img', 'figure', 'ol', 'li'];
    // 포토영어 전용 카드(wotd-card 등)를 위해 class 속성 허용
    const allowedAttributes = ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'loading', 'decoding', 'onerror'];
    div.querySelectorAll('*').forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            el.replaceWith(el.textContent);
        } else {
            Array.from(el.attributes).forEach(attr => {
                if (!allowedAttributes.includes(attr.name.toLowerCase())) el.removeAttribute(attr.name);
            });
        }
    });
    return div.innerHTML;
}

function preserveLineBreaksInHtml(html) {
    if (!html) return html;
    const root = document.createElement('div');
    root.innerHTML = html;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let current = walker.nextNode();
    while (current) {
        textNodes.push(current);
        current = walker.nextNode();
    }

    textNodes.forEach((node) => {
        const value = node.nodeValue;
        if (!value || !value.includes('\n')) return;

        const parentTag = node.parentElement ? node.parentElement.tagName : '';
        if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return;

        const parts = value.split('\n');
        const frag = document.createDocumentFragment();
        parts.forEach((part, idx) => {
            if (part) frag.appendChild(document.createTextNode(part));
            if (idx < parts.length - 1) frag.appendChild(document.createElement('br'));
        });
        node.parentNode.replaceChild(frag, node);
    });

    return root.innerHTML;
}

function convertMediaLinks(text) {
    if (!text) return text;
    const hasHtml = /<[^>]+>/.test(text);
    const urlPattern = /(https?:\/\/[^\s<>"'\n\r()]+)/g;
    let result = hasHtml ? text : escapeHtml(text);
    result = result.replace(urlPattern, (url) => {
        const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;"><div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;"><img src="${thumbnailUrl}" alt="YouTube Video" loading="lazy" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'"></div></a></div>`;
        }
        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        if (imageExtensions.test(url)) {
            return `<img src="${url}" alt="Image" loading="lazy" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;">`;
        }
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
    // HTML 포함 글도 텍스트 줄바꿈은 보존해야
    // 작성창/DB에서 보인 개행이 라이브에서 붙지 않음
    if (!hasHtml) {
        result = result.replace(/\n/g, '<br>');
    } else {
        result = preserveLineBreaksInHtml(result);
    }
    return sanitizeHtml(result);
}

function wotdEscapeAttr(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function wotdStripTagsToText(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
}

function wotdIsMostlyEnglish(text) {
    const t = String(text || '').trim();
    if (t.length < 8) return false;
    if (/[가-힣]/.test(t)) return false;
    const letters = t.replace(/[^a-zA-Z]/g, '');
    if (letters.length < 6) return false;
    const nonLatin = t.replace(/[a-zA-Z0-9\s.,;:'"!?\-—–…()[\]{}«»‹›\/\\\u2018\u2019\u201c\u201d]/g, '').length;
    return letters.length / (letters.length + nonLatin + 1) > 0.6;
}

function wotdTtsButtonHtml(speakText) {
    const t = String(speakText || '').trim();
    if (!t) return '';
    return `<button type="button" class="wotd-tts-btn" data-wotd-tts="${wotdEscapeAttr(t)}" aria-label="영어 읽기, 다시 누르면 멈춤" title="듣기 / 다시 누르면 멈춤" style="margin-left:6px;border:0;background:transparent;cursor:pointer;vertical-align:middle;color:#2f80ed;padding:0;">🔊</button>`;
}

function wotdAppendTtsInlineAfterEnglish(lineHtml, speak) {
    if (/wotd-tts-btn|wotd-inline-speaker/i.test(lineHtml)) return lineHtml;
    const btn = wotdTtsButtonHtml(speak);
    if (!btn) return lineHtml;
    const s = lineHtml.trimEnd();
    const endRe = /([.!?])((?:\s*<\/[a-zA-Z][a-zA-Z0-9]*\s*>\s*)*)$/;
    const m = s.match(endRe);
    if (m) {
        const prefix = s.slice(0, s.length - m[0].length);
        return prefix + m[1] + btn + m[2];
    }
    return s + btn;
}

function wotdStartEnglishTTS(text, btn) {
    if (!text || !window.speechSynthesis) return;
    try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.92;
        u.volume = 1;
        u.pitch = 1;
        const voices = speechSynthesis.getVoices();
        const en =
            voices.find((v) => v.lang && /^en-US/i.test(v.lang)) ||
            voices.find((v) => v.lang && /^en(-|$)/i.test(v.lang));
        if (en) u.voice = en;
        const done = () => {
            if (btn) btn.classList.remove('wotd-tts-playing');
        };
        u.onend = done;
        u.onerror = done;
        speechSynthesis.speak(u);
    } catch (e) {
        if (btn) btn.classList.remove('wotd-tts-playing');
        console.warn('photo-english TTS:', e);
    }
}

function wotdBindTtsButtons(container) {
    if (!container || !window.speechSynthesis) return;
    container.querySelectorAll('.wotd-tts-btn').forEach((btn) => {
        if (btn.dataset.wotdTtsListener === '1') return;
        btn.dataset.wotdTtsListener = '1';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const raw = btn.getAttribute('data-wotd-tts');
            if (!raw) return;

            const playing =
                btn.classList.contains('wotd-tts-playing') &&
                (speechSynthesis.speaking || speechSynthesis.pending);
            if (playing) {
                speechSynthesis.cancel();
                btn.classList.remove('wotd-tts-playing');
                return;
            }

            speechSynthesis.cancel();
            container.querySelectorAll('.wotd-tts-btn.wotd-tts-playing').forEach((b) =>
                b.classList.remove('wotd-tts-playing')
            );
            btn.classList.add('wotd-tts-playing');
            wotdStartEnglishTTS(raw, btn);
        });
    });
}

function wotdApplyTtsToNode(node) {
    if (!node || node.getAttribute('data-wotd-tts') === '1') return;

    const lines = (node.innerHTML || '').split(/<br\s*\/?>/i);
    if (lines.length === 0) return;

    let changed = false;
    const newLines = lines.map((lineHtml) => {
        if (/class\s*=\s*["'][^"']*(wotd-tts-btn|wotd-inline-speaker)/i.test(lineHtml)) return lineHtml;
        const plain = wotdStripTagsToText(lineHtml);
        if (!plain) return lineHtml;
        if (!wotdIsMostlyEnglish(plain)) return lineHtml;
        if (/^Source\b/i.test(plain) || /^https?:\/\//i.test(plain)) return lineHtml;
        const speak = plain.replace(/\s*🔊\s*$/u, '').trim();
        if (!speak) return lineHtml;
        changed = true;
        return wotdAppendTtsInlineAfterEnglish(lineHtml, speak);
    });

    if (changed) {
        node.innerHTML = newLines.join('<br>');
    }
    node.setAttribute('data-wotd-tts', '1');
}

// 영어 줄 뒤에 개별 스피커 아이콘 추가 (포토영어 전용)
function attachPhotoEnglishWebTTS() {
    const container = document.getElementById('post-message');
    if (!container || !window.speechSynthesis) return;
    try {
        speechSynthesis.getVoices();
    } catch (_) {}

    const photoEnLines = container.querySelectorAll('.photo-english-card .pe-en');
    if (photoEnLines.length) {
        photoEnLines.forEach(wotdApplyTtsToNode);
    } else {
        container.querySelectorAll('p, div, span').forEach((node) => {
            if (node.closest('.photo-english-card')) return;
            wotdApplyTtsToNode(node);
        });
    }

    wotdBindTtsButtons(container);
}

function showLoading() {
    document.getElementById('post-container').innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;"></div>
            <p style="margin-top: 15px; color: #666;">게시글을 불러오는 중...</p>
        </div>`;
}

function showError(message, details = '') {
    const apiParam = apiMode ? `?api=${apiMode}` : '';
    document.getElementById('post-container').innerHTML = `
        <div style="text-align: center; padding: 30px; color: #d32f2f; background-color: #ffebee; border-radius: 8px; margin: 20px;">
            <p style="font-size: 1.2em; font-weight: bold;">⚠️ ${message}</p>
            ${details ? `<p style="font-size: 0.9em; color: #666;">${details}</p>` : ''}
            <button class="btn btn-primary mt-3" onclick="window.location.href='photo-english-list.html${apiParam}'">목록으로 돌아가기</button>
        </div>`;
}

async function loadPost() {
    showLoading();
    try {
        if (!window.ViewpostSeo) {
            showError('게시글을 불러올 수 없습니다', 'viewpost-seo.js 가 필요합니다.');
            return;
        }
        const result = await window.ViewpostSeo.fetchPostBySlugOrIndex(
            API_BASE_URL,
            window.VIEWPOST_SEO,
            { defaultIndex: 0 }
        );
        if (result.error) {
            showError('게시글을 찾을 수 없습니다', String(result.error));
            return;
        }
        const post = result.post;
        if (result.index != null) window.currentIndex = result.index;

        try {
            const viewResponse = await fetch(`${API_BASE_URL}/photo-english/${post._id}/view`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            if (viewResponse.ok) {
                const viewData = await viewResponse.json();
                if (viewData.entry && viewData.entry.views !== undefined) post.views = viewData.entry.views;
            }
        } catch (_) {}

        window.ViewpostSeo.updatePageSeo(post, window.VIEWPOST_SEO);

        const convertedMessage = convertMediaLinks(post.message || '');
        const metaHtml = typeof buildPostMetaHtml === 'function'
            ? buildPostMetaHtml(post)
            : '';

        document.getElementById('post-container').innerHTML = `
            <div id="post-header">
                <h2 id="post-title">${escapeHtml(post.title || '제목 없음')}</h2>
                ${metaHtml}
            </div>
            <div id="post-content">
                <div id="post-message">${convertedMessage || '<span style="color: #999;">내용이 없습니다.</span>'}</div>
            </div>`;
        // 영어 줄 뒤에 개별 스피커 아이콘 추가
        attachPhotoEnglishWebTTS();

        if (typeof initViewpostLike === 'function') {
            initViewpostLike({
                entryId: post._id,
                likes: post.likes,
                apiBaseUrl: API_BASE_URL,
                board: 'photo-english'
            });
        }
    } catch (error) {
        showError('게시글을 불러올 수 없습니다', error.message);
    }
}

loadPost();
