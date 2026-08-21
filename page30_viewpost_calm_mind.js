// API 베이스 URL 설정 (로컬/프로덕션 자동 전환)
// URL 파라미터로 강제 설정 가능: ?api=local 또는 ?api=prod
let API_BASE_URL;
const urlParams = new URLSearchParams(window.location.search);
const apiMode = urlParams.get('api'); // 'local' 또는 'prod'로 강제 설정 가능

if (apiMode === 'prod') {
    // URL 파라미터로 프로덕션 강제 지정
    API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
    console.log('🟢 Production 모드 (강제) - API_BASE_URL:', API_BASE_URL);
} else if (apiMode === 'local') {
    // URL 파라미터로 로컬 강제 지정
    API_BASE_URL = `http://${window.location.hostname}:3000`;
    console.log('🔵 Localhost 모드 (강제) - API_BASE_URL:', API_BASE_URL);
} else if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // 자동 감지: 로컬 호스트면 로컬 API 사용
    API_BASE_URL = `http://${window.location.hostname}:3000`;
    // console.log('🔵 Localhost 모드 (자동) - API_BASE_URL:', API_BASE_URL);
    // console.log('💡 프로덕션 API를 사용하려면 URL에 ?api=prod 를 추가하세요');
} else {
    // 자동 감지: 프로덕션 호스트면 프로덕션 API 사용
    API_BASE_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
    console.log('🟢 Production 모드 (자동) - API_BASE_URL:', API_BASE_URL);
}

window.VIEWPOST_SEO = {
    boardPath: 'calm-mind',
    boardLabel: '마음 다스리는 글',
    fallbackHtml: 'calm-mind.html',
    listPath: '/calm-mind',
    bySlugPath: '/calm-mind/by-slug',
};

// HTML 이스케이프 헬퍼 함수 (전역)
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 안전한 HTML 태그만 허용하는 함수
function sanitizeHtml(html) {
    if (!html) return html;
    const div = document.createElement('div');
    div.innerHTML = html;
    
    // 허용된 태그와 속성
    const allowedTags = ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 'span', 'div', 'a', 'img', 'button', 'mark', 'h2', 'h3', 'blockquote', 'hr', 'footer'];
    const allowedAttributes = [
        'style', 'href', 'target', 'rel', 'src', 'alt', 'loading', 'decoding', 'onerror',
        'type', 'class', 'aria-label', 'title', 'data-vv-tts',
    ];
    
    // 위험한 태그 제거
    const allElements = div.querySelectorAll('*');
    allElements.forEach(el => {
        if (!allowedTags.includes(el.tagName.toLowerCase())) {
            el.replaceWith(el.textContent);
        } else {
            // 허용되지 않은 속성 제거
            Array.from(el.attributes).forEach(attr => {
                if (!allowedAttributes.includes(attr.name.toLowerCase())) {
                    el.removeAttribute(attr.name);
                }
            });
            // 스크립트 관련 속성 제거
            if (el.onclick || el.onerror) {
                el.removeAttribute('onclick');
                el.removeAttribute('onerror');
            }
        }
    });
    
    return div.innerHTML;
}

/** Vocabulary View: Web Speech API(브라우저 TTS) */
function vvEscapeAttr(s) {
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function vvStripTagsToText(html) {
    const d = document.createElement('div');
    d.innerHTML = html;
    return (d.textContent || '').replace(/\s+/g, ' ').trim();
}

function vvIsMostlyEnglish(text) {
    const t = String(text || '').trim();
    if (t.length < 8) return false;
    if (/[가-힣]/.test(t)) return false;
    const letters = t.replace(/[^a-zA-Z]/g, '');
    if (letters.length < 6) return false;
    const nonLatin = t.replace(/[a-zA-Z0-9\s.,;:'"!?\-—–…()[\]{}«»‹›\/\\\u2018\u2019\u201c\u201d]/g, '').length;
    return letters.length / (letters.length + nonLatin + 1) > 0.6;
}

function vvPickEnglishVoice() {
    const voices = speechSynthesis.getVoices();
    return (
        voices.find((v) => v.lang && /^en-US/i.test(v.lang)) ||
        voices.find((v) => v.lang && /^en(-|$)/i.test(v.lang)) ||
        null
    );
}

function vvStopTtsQueue(container) {
    if (container) container._vvAllToken = (container._vvAllToken || 0) + 1;
    if (container) {
        const allBtn = container.querySelector('.vv-tts-all-btn');
        if (allBtn) allBtn.classList.remove('vv-tts-playing');
    }
    if (window.speechSynthesis) speechSynthesis.cancel();
}

function vvStartEnglishTTS(text, btn) {
    if (!text || !window.speechSynthesis) return;
    try {
        speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.92;
        u.volume = 1;
        u.pitch = 1;
        const en = vvPickEnglishVoice();
        if (en) u.voice = en;
        const done = () => {
            if (btn) btn.classList.remove('vv-tts-playing');
        };
        u.onend = done;
        u.onerror = done;
        speechSynthesis.speak(u);
    } catch (e) {
        if (btn) btn.classList.remove('vv-tts-playing');
        console.warn('Vocabulary TTS:', e);
    }
}

function vvTtsButtonHtml(speakText) {
    const t = String(speakText || '').trim();
    if (!t) return '';
    const icon =
        '<svg class="vv-tts-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    return `<button type="button" class="vv-tts-btn" data-vv-tts="${vvEscapeAttr(t)}" aria-label="영어 읽기, 다시 누르면 멈춤" title="듣기 / 다시 누르면 멈춤" style="margin-left:6px;border:0;background:transparent;cursor:pointer;vertical-align:middle;color:#2f80ed;padding:0;">${icon}</button>`;
}

function vvAppendTtsInlineAfterEnglish(lineHtml, speak) {
    if (/vv-tts-btn/i.test(lineHtml)) return lineHtml;
    const btn = vvTtsButtonHtml(speak);
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

function vvBindTtsButtons(container) {
    if (!container || !window.speechSynthesis) return;
    container.querySelectorAll('.vv-tts-btn').forEach((btn) => {
        if (btn.dataset.vvTtsListener === '1') return;
        btn.dataset.vvTtsListener = '1';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const raw = btn.getAttribute('data-vv-tts');
            if (!raw) return;

            const playing =
                btn.classList.contains('vv-tts-playing') &&
                (speechSynthesis.speaking || speechSynthesis.pending);
            vvStopTtsQueue(container);
            container.querySelectorAll('.vv-tts-btn.vv-tts-playing').forEach((b) =>
                b.classList.remove('vv-tts-playing')
            );
            if (playing) return;

            btn.classList.add('vv-tts-playing');
            vvStartEnglishTTS(raw, btn);
        });
    });
}

function attachVocabularyWebTTS(container) {
    if (!container || !window.speechSynthesis) return;
    try {
        speechSynthesis.getVoices();
    } catch (_) {}

    const paragraphs = container.querySelectorAll('p');
    paragraphs.forEach((p) => {
        if (p.getAttribute('data-vv-tts') === '1') return;

        const lines = p.innerHTML.split(/<br\s*\/?>/i);
        const newLines = lines.map((lineHtml) => {
            if (/class\s*=\s*["'][^"']*vv-tts-btn/i.test(lineHtml)) return lineHtml;
            const plain = vvStripTagsToText(lineHtml);
            if (!plain) return lineHtml;
            if (!vvIsMostlyEnglish(plain)) return lineHtml;
            if (/^Source\b/i.test(plain) || /^https?:\/\//i.test(plain)) return lineHtml;
            return vvAppendTtsInlineAfterEnglish(lineHtml, plain);
        });

        p.innerHTML = newLines.join('<br>');
        p.setAttribute('data-vv-tts', '1');
    });

    vvBindTtsButtons(container);
    vvAttachPlayAll(container);
}

function vvAttachPlayAll(container) {
    if (!container || !window.speechSynthesis) return;
    if (container.querySelector('.vv-tts-all-btn')) return;
    const sentenceBtns = Array.from(container.querySelectorAll('.vv-tts-btn:not(.vv-tts-all-btn)'));
    if (sentenceBtns.length < 2) return;

    const icon =
        '<svg class="vv-tts-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
    const wrap = document.createElement('p');
    wrap.className = 'vv-tts-all-wrap';
    wrap.innerHTML =
        '<button type="button" class="vv-tts-all-btn" aria-label="영어 예문 모두 듣기, 다시 누르면 멈춤" title="모두 듣기 / 다시 누르면 멈춤" style="display:inline-flex;align-items:center;gap:6px;margin:0 0 16px;border:1px solid #2f80ed;background:#eef5fd;color:#1d4f91;cursor:pointer;border-radius:999px;padding:6px 12px;font-size:14px;font-weight:600;line-height:1.2;">' +
        icon +
        ' 영어 예문 모두 듣기</button>';
    const msg = container.querySelector('#post-message');
    if (msg && msg.parentNode) msg.parentNode.insertBefore(wrap, msg);
    else container.insertBefore(wrap, container.firstChild);

    const allBtn = wrap.querySelector('.vv-tts-all-btn');
    allBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const playing =
            allBtn.classList.contains('vv-tts-playing') &&
            (speechSynthesis.speaking || speechSynthesis.pending);
        vvStopTtsQueue(container);
        container.querySelectorAll('.vv-tts-btn.vv-tts-playing').forEach((b) =>
            b.classList.remove('vv-tts-playing')
        );
        if (playing) return;

        const texts = Array.from(container.querySelectorAll('.vv-tts-btn:not(.vv-tts-all-btn)'))
            .map((b) => b.getAttribute('data-vv-tts'))
            .filter(Boolean);
        if (!texts.length) return;

        allBtn.classList.add('vv-tts-playing');
        const my = container._vvAllToken;
        let i = 0;
        const playNext = () => {
            if (container._vvAllToken !== my) return;
            if (i >= texts.length) {
                allBtn.classList.remove('vv-tts-playing');
                return;
            }
            const u = new SpeechSynthesisUtterance(texts[i]);
            i += 1;
            u.lang = 'en-US';
            u.rate = 0.92;
            u.volume = 1;
            u.pitch = 1;
            const en = vvPickEnglishVoice();
            if (en) u.voice = en;
            u.onend = () => {
                if (container._vvAllToken !== my) return;
                setTimeout(playNext, 420);
            };
            u.onerror = () => {
                if (container._vvAllToken === my) playNext();
            };
            speechSynthesis.speak(u);
        };
        playNext();
    });
}

// 이미지/동영상 링크를 HTML로 변환하는 함수
function convertUrlsInPlainText(text) {
    if (!text) return text;
    const urlPattern = /(https?:\/\/[^\s<>"'\n\r()]+)/g;
    return text.replace(urlPattern, (url) => {
        const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
        const youtubeMatch = url.match(youtubeRegex);
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 8px 0 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 1; line-height: 0;">
                <a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; padding: 0; margin: 0; line-height: 0; -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3); touch-action: manipulation; position: relative; z-index: 10;">
                    <div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;">
                        <img src="${thumbnailUrl}" alt="YouTube Video" loading="lazy" decoding="async" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; margin: 0; object-fit: cover; pointer-events: none;" onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                        <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(23, 35, 34, 0.9); border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s; pointer-events: none; z-index: 2;">
                            <div style="width: 0; height: 0; border-left: 24px solid white; border-top: 14px solid transparent; border-bottom: 14px solid transparent; margin-left: 6px;"></div>
                        </div>
                    </div>
                </a>
            </div>`;
        }

        const vimeoRegex = /vimeo\.com\/(\d+)/;
        const vimeoMatch = url.match(vimeoRegex);
        if (vimeoMatch) {
            const videoId = vimeoMatch[1];
            const vimeoUrl = `https://vimeo.com/${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); z-index: 1;">
                <a href="${vimeoUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block; -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3); touch-action: manipulation; position: relative; z-index: 10;">
                    <div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; display: flex; align-items: center; justify-content: center;">
                        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); pointer-events: none;"></div>
                        <div class="play-button" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 68px; height: 48px; background: rgba(255, 255, 255, 0.9); border-radius: 14px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s; pointer-events: none; z-index: 2;">
                            <div style="width: 0; height: 0; border-left: 20px solid #667eea; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
                        </div>
                        <div style="position: absolute; bottom: 10px; left: 10px; color: white; font-size: 14px; font-weight: 600; pointer-events: none;">Vimeo Video</div>
                    </div>
                </a>
            </div>`;
        }

        if (url.startsWith('data:image/')) {
            return `<img src="${url}" alt="Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;">`;
        }

        const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
        if (imageExtensions.test(url)) {
            return `<img src="${url}" alt="Image" loading="lazy" decoding="async" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;" onerror="this.style.display='none';">`;
        }

        return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 4px 6px; margin: 2px; -webkit-tap-highlight-color: rgba(43, 108, 176, 0.3); touch-action: manipulation; cursor: pointer; position: relative; z-index: 10;">${url}</a>`;
    });
}

function convertMediaLinks(text) {
    if (!text) return text;

    const hasHtml = /<[^>]+>/.test(text);
    let result = hasHtml ? text : escapeHtml(text);

    // HTML 태그(속성) 안 URL은 건드리지 않고, 텍스트 노드만 변환
    result = result.replace(/(<[^>]+>)|([^<]+)/g, (whole, tag, textNode) => {
        if (tag) return tag;
        return convertUrlsInPlainText(textNode);
    });

    // 태그 밖 줄바꿈만 <br>로 (태그 내부 개행은 이미 태그 조각에 포함)
    result = result.replace(/([^>])\n/g, '$1<br>');

    result = sanitizeHtml(result);
    return result;
}

// 로딩 상태 표시 함수
function showLoading() {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p style="margin-top: 15px; color: #666;">게시글을 불러오는 중...</p>
        </div>
    `;
}

// 에러 메시지 표시 함수
function showError(message, details = '', listPage = 'calm-mind-list.html') {
    const postContainer = document.getElementById('post-container');
    const apiParam = apiMode ? `?api=${apiMode}` : '';
    const listUrl = listPage + apiParam;
    postContainer.innerHTML = `
        <div style="text-align: center; padding: 30px; color: #d32f2f; background-color: #ffebee; border-radius: 8px; margin: 20px;">
            <p style="font-size: 1.2em; font-weight: bold; margin-bottom: 10px;">⚠️ ${message}</p>
            ${details ? `<p style="font-size: 0.9em; color: #666; margin-top: 10px;">${details}</p>` : ''}
            <a href="${listUrl}" class="btn btn-primary mt-3">목록으로 돌아가기</a>
        </div>
    `;
}

async function loadPost() {
    showLoading();

    try {
        if (!window.ViewpostSeo) {
            showError('게시글을 불러올 수 없습니다', 'viewpost-seo.js 가 필요합니다.', 'calm-mind-list.html');
            return;
        }
        const result = await window.ViewpostSeo.fetchPostBySlugOrIndex(API_BASE_URL, window.VIEWPOST_SEO);
        if (result.error === 'missing-param') {
            showError('게시글을 찾을 수 없습니다', 'slug 또는 index가 없습니다.', 'calm-mind-list.html');
            return;
        }
        if (result.error === 'slug-not-found') {
            showError('게시글을 찾을 수 없습니다', `slug "${result.slug}" 글이 없습니다.`, 'calm-mind-list.html');
            return;
        }
        if (result.error) {
            showError('게시글을 불러올 수 없습니다', String(result.error), 'calm-mind-list.html');
            return;
        }
        const post = result.post;
        window.ViewpostSeo.updatePageSeo(post, window.VIEWPOST_SEO);

        // 조회수 증가 API 호출
        try {
            const viewResponse = await fetch(`${API_BASE_URL}/calm-mind/${post._id}/view`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (viewResponse.ok) {
                const viewData = await viewResponse.json();
                // 조회수가 업데이트된 경우 게시글 정보 업데이트
                if (viewData.entry && viewData.entry.views !== undefined) {
                    post.views = viewData.entry.views;
                    console.log('👁️ 조회수 업데이트:', post.views);
                }
            }
        } catch (viewError) {
            console.warn('조회수 증가 실패 (무시):', viewError);
            // 조회수 증가 실패해도 게시글은 표시
        }

        console.log('📝 로드된 게시글:', post);
        console.log('📅 게시글 날짜 정보:', post.date, typeof post.date);

        // 게시글 표시 - HTML 구조를 다시 생성
        const postContainer = document.getElementById('post-container');
        
        // 이미지/동영상 링크 변환하여 표시
        const convertedMessage = convertMediaLinks(post.message || '');
        console.log('원본 메시지:', post.message);
        console.log('변환된 메시지:', convertedMessage);

        const metaHtml = typeof buildPostMetaHtml === 'function'
            ? buildPostMetaHtml(post)
            : '';
        // HTML 구조 재생성
        postContainer.innerHTML = `
            <div id="post-header">
                <h2 id="post-title">${escapeHtml(post.title || '제목 없음')}</h2>
                ${metaHtml}
            </div>
            <div id="post-content">
                <div id="post-message" class="post-message-body cm-blog">${convertedMessage || '<span style="color: #999;">내용이 없습니다.</span>'}</div>
            </div>
        `;
        
        // 게시글 내용 복사 시 HTML 태그 제거하고 순수 텍스트만 복사
        const postMessage = document.getElementById('post-message');
        if (postMessage) {
            postMessage.addEventListener('copy', (e) => {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);
                    // 선택된 영역의 순수 텍스트만 추출
                    const selectedText = range.toString();
                    
                    // 클립보드에 순수 텍스트만 넣기
                    e.clipboardData.setData('text/plain', selectedText);
                    e.preventDefault(); // 기본 동작 방지 (HTML 복사 방지)
                }
            });
        }
        const postContent = document.getElementById('post-content');
        if (postContent) attachVocabularyWebTTS(postContent);

        if (typeof initViewpostLike === 'function') {
            initViewpostLike({
                entryId: post._id,
                likes: post.likes,
                apiBaseUrl: API_BASE_URL,
                board: 'calm-mind'
            });
        }

    } catch (error) {
        console.error('❌ Error while loading post:', error);
        showError('게시글을 불러올 수 없습니다', 
            `백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.<br><br>
            <strong>에러 메시지:</strong> ${error.message}`);
    }
}

loadPost();

