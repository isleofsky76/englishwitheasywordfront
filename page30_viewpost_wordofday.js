// Word of the Day view post - uses /wordofday API (베이스 URL은 page30-api-config.js)
const urlParams = new URLSearchParams(window.location.search);
const apiMode = urlParams.get('api');
const API_BASE_URL = typeof getPage30ApiBaseUrl === 'function'
    ? getPage30ApiBaseUrl()
    : window.PAGE30_PRODUCTION_API_BASE || 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';

window.VIEWPOST_SEO = {
    boardPath: 'word-of-the-day',
    boardLabel: 'Word of the Day',
    fallbackHtml: 'word-of-the-day.html',
    listPath: '/wordofday',
    bySlugPath: '/wordofday/by-slug',
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
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'img', 'article', 'section', 'h2', 'h3', 'ul', 'ol', 'li', 'footer', 'button', 'header'];
    // Word of the Day 전용 카드(wotd-card 등)를 위해 class 속성 허용
    const allowedAttributes = ['class', 'style', 'href', 'target', 'rel', 'src', 'alt', 'loading', 'decoding', 'onerror', 'type', 'aria-label', 'title', 'data-wotd-tts', 'aria-hidden'];
    div.querySelectorAll('*').forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            // 태그 제거해도 자식 HTML은 유지 (textContent로 통째로 평탄화하지 않음)
            el.replaceWith(...el.childNodes);
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
    // 속성값(href/src 등) 안의 URL은 건드리지 않음 — 본문 텍스트 URL만 변환
    const urlPattern = /(?<![=("'"])(https?:\/\/[^\s<>"'\n\r()]+)/g;
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
        console.warn('WordOfDay TTS:', e);
    }
}

function wotdBindTtsButtons(container) {
    if (!container || !window.speechSynthesis) return;
    container.querySelectorAll('.wotd-tts-btn, .wotd-word-card[data-wotd-tts]').forEach((btn) => {
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
            container.querySelectorAll('.wotd-tts-playing').forEach((b) =>
                b.classList.remove('wotd-tts-playing')
            );
            btn.classList.add('wotd-tts-playing');
            wotdStartEnglishTTS(raw, btn);
        });
    });
}

function wotdFormatPublishDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    const y = d.getFullYear();
    const m = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return y + '.' + m + '.' + day;
}

function wotdParseWordLine(text) {
    const raw = String(text || '').replace(/\s+/g, ' ').trim();
    if (!raw) return null;
    const parts = raw.split('|').map((s) => s.trim()).filter(Boolean);
    if (parts.length < 4) return null;
    const ipaIdx = parts.findIndex((p) => /^\/.+\/$/.test(p));
    if (ipaIdx < 1 || ipaIdx >= parts.length - 1) return null;
    const head = parts.slice(0, ipaIdx - 1).join(' | ') || parts[0];
    const pron = parts[ipaIdx - 1];
    const ipa = parts[ipaIdx];
    const ko = parts.slice(ipaIdx + 1).join(' | ');
    const emojiMatch = head.match(/^(\p{Extended_Pictographic}(?:\uFE0F)?(?:\u200D\p{Extended_Pictographic}(?:\uFE0F)?)*)\s*(.+)$/u);
    const emoji = emojiMatch ? emojiMatch[1] : '';
    const en = (emojiMatch ? emojiMatch[2] : head).trim();
    if (!en || !/[A-Za-z]/.test(en) || !ko) return null;
    return { emoji: emoji || '📝', en, pron, ipa, ko };
}

function wotdBuildWordCardsHtml(words) {
    const cards = words.map((w) => {
        return '<button type="button" class="wotd-word-card" data-wotd-tts="' + wotdEscapeAttr(w.en) + '" aria-label="' + wotdEscapeAttr(w.en + ' 발음 듣기') + '">' +
            '<span class="wotd-word-card-top">' +
            '<span class="wotd-word-emoji" aria-hidden="true">' + w.emoji + '</span>' +
            '<span class="wotd-word-pron-wrap"><span class="wotd-word-pron-label">발음</span> ' +
            '<span class="wotd-word-ipa">' + escapeHtml(w.ipa) + '</span></span>' +
            '</span>' +
            '<span class="wotd-word-en">' + escapeHtml(w.en) + '</span>' +
            '<span class="wotd-word-ko">' + escapeHtml(w.ko) + '</span>' +
            '</button>';
    }).join('');
    return '<section class="wotd-words-section">' +
        '<header class="wotd-words-header">' +
        '<h3 class="wotd-words-title"><span aria-hidden="true">📘</span> 오늘의 단어</h3>' +
        '<span class="wotd-words-count">' + words.length + '개 단어</span>' +
        '</header>' +
        '<div class="wotd-words-grid">' + cards + '</div>' +
        '<div class="wotd-listen-banner">' +
        '<span class="wotd-listen-icon" aria-hidden="true">🎧</span>' +
        '<div class="wotd-listen-text">' +
        '<strong>단어 발음 듣기</strong>' +
        '<p>각 카드를 클릭하면 원어민 발음을 들을 수 있습니다</p>' +
        '</div></div></section>';
}

function wotdGuessSourceName(text, href) {
    const t = String(text || '');
    if (/wall street journal|\bwsj\b/i.test(t) || /wsj\.com/i.test(href || '')) return 'Wall Street Journal';
    if (/\bcnn\b/i.test(t) || /cnn\.com/i.test(href || '')) return 'CNN';
    if (/\bbbc\b/i.test(t) || /bbc\./i.test(href || '')) return 'BBC';
    const m = t.match(/([A-Za-z][A-Za-z0-9 .&'-]{2,40})\s*\|/);
    if (m) return m[1].trim();
    return '원문 기사';
}

function wotdBuildMoreAndInfoHtml({ youtubeUrl, sourceName, sourceUrl, publishDate, aiNote }) {
    const ytHref = youtubeUrl || '';
    const srcHref = sourceUrl || '';
    const srcLabel = sourceName || '원문 기사';
    const more = '<section class="wotd-more-section">' +
        '<h3 class="wotd-more-title"><span aria-hidden="true">🔗</span> 더 보기</h3>' +
        '<div class="wotd-more-grid">' +
        (ytHref
            ? '<a class="wotd-more-card" href="' + wotdEscapeAttr(ytHref) + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="wotd-more-main"><span class="wotd-more-icon" aria-hidden="true">📺</span> 유튜브 영상 보기</span></a>'
            : '') +
        (srcHref
            ? '<a class="wotd-more-card" href="' + wotdEscapeAttr(srcHref) + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="wotd-more-main"><span class="wotd-more-icon" aria-hidden="true">📰</span> 원문 기사 바로 가기</span></a>'
            : '') +
        '</div></section>';

    const info = aiNote
        ? ('<aside class="wotd-info-banner">' +
            '<span class="wotd-info-icon" aria-hidden="true">ℹ</span>' +
            '<div class="wotd-info-text">' +
            '<p>' + escapeHtml(aiNote) + '</p>' +
            '</div></aside>')
        : '';
    return more + info;
}

function enhanceWordOfDayLayout(post) {
    const container = document.getElementById('post-message');
    if (!container || container.querySelector('.wotd-words-grid')) return;

    const root = container.firstElementChild && container.firstElementChild.tagName === 'DIV'
        ? container.firstElementChild
        : container;

    const wordItems = [];
    const removeNodes = [];
    let youtubeUrl = '';
    let sourceUrl = '';
    let sourceName = '';
    let aiNote = '이 콘텐츠는 AI 음성과 이미지를 사용했습니다.';
    let sawWordsHeading = false;

    Array.from(root.querySelectorAll('p, a, .video-preview-container')).forEach((node) => {
        if (node.matches && node.matches('.video-preview-container')) {
            const a = node.querySelector('a[href]');
            if (a && /youtu(\.be|be\.com)/i.test(a.href)) {
                youtubeUrl = a.href;
                removeNodes.push(node);
            }
            return;
        }
        if (node.tagName === 'A') {
            const href = node.getAttribute('href') || '';
            if (/youtu(\.be|be\.com)/i.test(href)) youtubeUrl = youtubeUrl || href;
            else if (/^https?:\/\//i.test(href) && !/englisheasystudy\.com/i.test(href)) {
                sourceUrl = sourceUrl || href;
                sourceName = sourceName || wotdGuessSourceName(node.textContent, href);
            }
            return;
        }

        const text = (node.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text) return;

        if (/^오늘의\s*단어$/.test(text)) {
            sawWordsHeading = true;
            removeNodes.push(node);
            return;
        }
        if (/유튜브/.test(text) && text.length < 20) {
            removeNodes.push(node);
            return;
        }
        if (/AI\s*음성/.test(text)) {
            aiNote = '이 콘텐츠는 AI 음성과 이미지를 사용했습니다.';
            removeNodes.push(node);
            return;
        }
        if (/^출처/.test(text)) {
            sourceName = sourceName || wotdGuessSourceName(text, sourceUrl);
            removeNodes.push(node);
            return;
        }
        if (/^https?:\/\//i.test(text)) {
            if (/youtu(\.be|be\.com)/i.test(text)) youtubeUrl = youtubeUrl || text;
            else sourceUrl = sourceUrl || text;
            removeNodes.push(node);
            return;
        }

        const parsed = wotdParseWordLine(text);
        if (parsed) {
            wordItems.push(parsed);
            removeNodes.push(node);
        }
    });

    // source box wrapper cleanup
    Array.from(root.querySelectorAll('div')).forEach((div) => {
        const t = (div.textContent || '').trim();
        if (/^출처/.test(t) || (sourceUrl && t.indexOf(sourceUrl) !== -1 && t.length < 400)) {
            const link = div.querySelector('a[href]');
            if (link && !/youtu/i.test(link.href)) {
                sourceUrl = sourceUrl || link.href;
                sourceName = sourceName || wotdGuessSourceName(div.textContent, link.href);
            }
            if (div !== root) removeNodes.push(div);
        }
    });

    if (!wordItems.length) return;

    removeNodes.forEach((n) => {
        if (n && n.parentNode) n.parentNode.removeChild(n);
    });

    // remove leftover "오늘의 단어"/youtube headings if any empty wrappers
    Array.from(root.querySelectorAll('p')).forEach((p) => {
        const t = (p.textContent || '').replace(/\s+/g, ' ').trim();
        if (!t || /^오늘의\s*단어$/.test(t) || (/유튜브/.test(t) && t.length < 20)) {
            p.remove();
        }
    });

    const publishDate = wotdFormatPublishDate(post && (post.datePublished || post.date));
    const enhanced = wotdBuildWordCardsHtml(wordItems) +
        wotdBuildMoreAndInfoHtml({
            youtubeUrl,
            sourceName,
            sourceUrl,
            publishDate,
            aiNote
        });

    const wrap = document.createElement('div');
    wrap.innerHTML = enhanced;
    while (wrap.firstChild) root.appendChild(wrap.firstChild);

    wotdBindTtsButtons(container);
}

function attachWordOfDayWebTTS() {
    const container = document.getElementById('post-message');
    if (!container || !window.speechSynthesis) return;
    try {
        speechSynthesis.getVoices();
    } catch (_) {}

    // 새 카드 UI가 있으면 카드 TTS만 사용
    if (container.querySelector('.wotd-word-card')) {
        wotdBindTtsButtons(container);
        return;
    }

    const nodes = container.querySelectorAll('p, div, span');
    nodes.forEach((node) => {
        if (node.getAttribute('data-wotd-tts') === '1') return;
        if (node.closest && node.closest('.wotd-word-card, .wotd-more-section, .wotd-info-banner')) return;

        const lines = (node.innerHTML || '').split(/<br\s*\/?>/i);
        if (lines.length === 0) return;

        let changed = false;
        const newLines = lines.map((lineHtml) => {
            if (/class\s*=\s*["'][^"']*(wotd-tts-btn|wotd-inline-speaker)/i.test(lineHtml)) return lineHtml;
            const plain = wotdStripTagsToText(lineHtml);
            if (!plain) return lineHtml;
            if (!wotdIsMostlyEnglish(plain)) return lineHtml;
            if (/^Source\b/i.test(plain) || /^출처\b/.test(plain) || /^WSJ\s*\|/i.test(plain) || /^https?:\/\//i.test(plain)) return lineHtml;
            const speak = plain
                .replace(/\s*🔊\s*$/u, '')
                .replace(/\p{Extended_Pictographic}/gu, '')
                .replace(/\s+/g, ' ')
                .trim();
            if (!speak) return lineHtml;
            changed = true;
            return wotdAppendTtsInlineAfterEnglish(lineHtml, speak);
        });

        if (changed) {
            node.innerHTML = newLines.join('<br>');
        }
        node.setAttribute('data-wotd-tts', '1');
    });

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
            <button class="btn btn-primary mt-3" onclick="window.location.href='/word-of-the-day-list.html${apiParam}'">목록으로 돌아가기</button>
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
            const viewResponse = await fetch(`${API_BASE_URL}/wordofday/${post._id}/view`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
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
        enhanceWordOfDayLayout(post);
        // 영어 줄 뒤에 개별 스피커 아이콘 추가
        attachWordOfDayWebTTS();

        if (typeof initViewpostLike === 'function') {
            initViewpostLike({
                entryId: post._id,
                likes: post.likes,
                apiBaseUrl: API_BASE_URL,
                board: 'wordofday'
            });
        }
    } catch (error) {
        showError('게시글을 불러올 수 없습니다', error.message);
    }
}

loadPost();
