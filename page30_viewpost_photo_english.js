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
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
            return `<div class="video-preview-container" style="position: relative; max-width: 100%; margin: 10px 0; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><a href="${youtubeUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; display: block;"><div class="video-thumbnail" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000;"><img src="${thumbnailUrl}" alt="YouTube Video" loading="eager" fetchpriority="high" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" onload="var p=this.nextElementSibling;if(p)p.style.opacity='1'" onerror="this.onerror=null;this.src='https://img.youtube.com/vi/${videoId}/mqdefault.jpg';var p=this.nextElementSibling;if(p)p.style.opacity='1'"></div></a></div>`;
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

    const photoEnLines = container.querySelectorAll('.photo-english-card .pe-en:not(.pe-en--interactive)');
    if (photoEnLines.length) {
        photoEnLines.forEach(wotdApplyTtsToNode);
    } else if (!container.querySelector('.pe-lesson')) {
        container.querySelectorAll('p, div, span').forEach((node) => {
            if (node.closest('.photo-english-card')) return;
            wotdApplyTtsToNode(node);
        });
    }

    wotdBindTtsButtons(container);
}

/* ===== Photo English 2.0 interactive lesson ===== */

const PE_STOP = {
    a: 1, an: 1, the: 1, is: 1, are: 1, was: 1, were: 1, be: 1, being: 1, been: 1,
    am: 1, of: 1, to: 1, in: 1, on: 1, for: 1, and: 1, or: 1, with: 1, at: 1, by: 1,
    from: 1, as: 1, into: 1, that: 1, this: 1, these: 1, those: 1, they: 1, them: 1,
    their: 1, there: 1, it: 1, its: 1, he: 1, she: 1, we: 1, you: 1, i: 1, my: 1,
    his: 1, her: 1, our: 1, your: 1, will: 1, would: 1, can: 1, could: 1, should: 1,
    must: 1, may: 1, might: 1, have: 1, has: 1, had: 1, do: 1, does: 1, did: 1,
    not: 1, no: 1, yes: 1, so: 1, but: 1, if: 1, than: 1, then: 1, also: 1, just: 1,
    very: 1, more: 1, most: 1, some: 1, any: 1, all: 1, other: 1, others: 1,
    large: 1, small: 1, new: 1, old: 1, long: 1, fresh: 1, right: 1, soon: 1,
    important: 1, green: 1, natural: 1
};

const PE_VOCAB_DICT = {
    prepare: { ipa: '/prɪˈper/', meaning: '준비하다', example: 'I am preparing for the exam.' },
    roll: { ipa: '/roʊl/', meaning: '롤, 두루마리', example: 'a roll of paper' },
    grass: { ipa: '/ɡræs/', meaning: '잔디, 풀', example: 'The grass looks fresh and green.' },
    carefully: { ipa: '/ˈkerfəli/', meaning: '조심스럽게', example: 'Please open the box carefully.' },
    place: { ipa: '/pleɪs/', meaning: '놓다, 두다', example: 'Place the book on the table.' },
    field: { ipa: '/fiːld/', meaning: '경기장, 들판', example: 'Players ran onto the field.' },
    stadium: { ipa: '/ˈsteɪdiəm/', meaning: '경기장', example: 'The stadium was full of fans.' },
    match: { ipa: '/mætʃ/', meaning: '경기, 시합', example: 'They won the match.' },
    worker: { ipa: '/ˈwɜːrkər/', meaning: '작업자', example: 'The workers finished early.' },
    carry: { ipa: '/ˈkæri/', meaning: '나르다, 옮기다', example: 'He is carrying a heavy box.' },
    cover: { ipa: '/ˈkʌvər/', meaning: '덮다', example: 'The ground is covered with snow.' },
    push: { ipa: '/pʊʃ/', meaning: '밀다', example: 'She is pushing the door.' },
    check: { ipa: '/tʃek/', meaning: '확인하다', example: 'He is checking the list.' },
    flatten: { ipa: '/ˈflætn/', meaning: '평평하게 하다', example: 'Flatten the dough with a roller.' },
    smooth: { ipa: '/smuːð/', meaning: '매끄러운', example: 'The surface feels smooth.' },
    safe: { ipa: '/seɪf/', meaning: '안전한', example: 'Keep the kids safe.' },
    even: { ipa: '/ˈiːvn/', meaning: '고른, 평평한', example: 'Make the surface even.' },
    ready: { ipa: '/ˈredi/', meaning: '준비된', example: 'Are you ready for class?' },
    machine: { ipa: '/məˈʃiːn/', meaning: '기계', example: 'This machine helps a lot.' },
    position: { ipa: '/pəˈzɪʃn/', meaning: '위치, 자리', example: 'Move it into the right position.' },
    edge: { ipa: '/edʒ/', meaning: '가장자리', example: 'Check the edges carefully.' },
    player: { ipa: '/ˈpleɪər/', meaning: '선수', example: 'The players practiced hard.' },
    soccer: { ipa: '/ˈsɑːkər/', meaning: '축구', example: 'Soccer is popular worldwide.' },
    game: { ipa: '/ɡeɪm/', meaning: '경기, 게임', example: 'The game starts at seven.' },
    help: { ipa: '/help/', meaning: '돕다', example: 'A machine helps flatten the grass.' },
    try: { ipa: '/traɪ/', meaning: '노력하다, 시도하다', example: 'They are trying to finish on time.' },
    make: { ipa: '/meɪk/', meaning: '만들다', example: 'Make the field safe and even.' }
};

/** 활용형 → 원형 고정 맵 */
const PE_LEMMA_MAP = {
    prepared: 'prepare', preparing: 'prepare', prepares: 'prepare',
    rolls: 'roll', rolling: 'roll', rolled: 'roll',
    carrying: 'carry', carried: 'carry', carries: 'carry',
    covered: 'cover', covering: 'cover', covers: 'cover',
    pushing: 'push', pushed: 'push', pushes: 'push',
    checking: 'check', checked: 'check', checks: 'check',
    workers: 'worker',
    edges: 'edge',
    players: 'player',
    helping: 'help', helped: 'help', helps: 'help',
    trying: 'try', tried: 'try', tries: 'try',
    making: 'make', made: 'make', makes: 'make',
    placing: 'place', placed: 'place', places: 'place',
    flattening: 'flatten', flattened: 'flatten', flattens: 'flatten'
};

const PE_DISTRACTORS = [
    'pieces', 'bundles', 'strips', 'layers', 'boards', 'bags', 'boxes', 'tools',
    'quickly', 'slowly', 'suddenly', 'quietly', 'put', 'drop', 'lift', 'move',
    'floor', 'ground', 'court', 'track', 'ready', 'build', 'cover', 'fix'
];

const PE_BADGE_CLASS = ['pe-badge--1', 'pe-badge--2', 'pe-badge--3'];

function peSpeak(text, btn, onDone) {
    if (!text || !window.speechSynthesis) {
        if (typeof onDone === 'function') onDone();
        return;
    }
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
            if (btn) btn.classList.remove('is-playing', 'wotd-tts-playing');
            if (typeof onDone === 'function') onDone();
        };
        u.onend = done;
        u.onerror = done;
        speechSynthesis.speak(u);
    } catch (e) {
        if (btn) btn.classList.remove('is-playing', 'wotd-tts-playing');
        console.warn('photo-english TTS:', e);
        if (typeof onDone === 'function') onDone();
    }
}

function peLemma(word) {
    const w = String(word || '').toLowerCase();
    if (!w) return w;
    if (PE_LEMMA_MAP[w]) return PE_LEMMA_MAP[w];

    const candidates = [w];
    if (w.endsWith('ies') && w.length > 4) candidates.push(w.slice(0, -3) + 'y');
    if (w.endsWith('ying') && w.length > 5) candidates.push(w.slice(0, -3));
    if (w.endsWith('ing') && w.length > 5) {
        const base = w.slice(0, -3);
        candidates.push(base);
        candidates.push(base + 'e');
        if (/(.)\1$/.test(base)) candidates.push(base.slice(0, -1));
    }
    if (w.endsWith('ied') && w.length > 4) candidates.push(w.slice(0, -3) + 'y');
    if (w.endsWith('ed') && w.length > 4) {
        const a = w.slice(0, -2);
        const b = w.slice(0, -1);
        candidates.push(a, b, a + 'e');
        if (/(.)\1$/.test(a)) candidates.push(a.slice(0, -1));
    }
    if (w.endsWith('es') && w.length > 4) candidates.push(w.slice(0, -2), w.slice(0, -1));
    else if (w.endsWith('s') && w.length > 3 && !w.endsWith('ss')) candidates.push(w.slice(0, -1));

    for (let i = 0; i < candidates.length; i++) {
        const c = candidates[i];
        if (PE_VOCAB_DICT[c]) return c;
    }
    // 사전 없어도 흔한 활용 접미사는 벗겨 원형 후보 반환
    if (w.endsWith('ing') && w.length > 5) {
        const base = w.slice(0, -3);
        if (PE_LEMMA_MAP[w]) return PE_LEMMA_MAP[w];
        if (base.endsWith('y') || base.length >= 3) return base.endsWith('i') ? base.slice(0, -1) + 'y' : base;
    }
    if (w.endsWith('ed') && w.length > 4) return w.slice(0, -2);
    if (w.endsWith('s') && w.length > 3 && !w.endsWith('ss')) return w.slice(0, -1);
    return w;
}

function pePickKeywords(sentences, limit) {
    const counts = {};
    const order = [];
    sentences.forEach((s) => {
        const parts = String(s.en || '').match(/[A-Za-z']+/g) || [];
        parts.forEach((p) => {
            const lower = p.toLowerCase();
            if (lower.length < 4 || PE_STOP[lower]) return;
            const lemma = peLemma(lower);
            if (lemma.length < 3 || PE_STOP[lemma]) return;
            if (!counts[lemma]) {
                counts[lemma] = 0;
                order.push(lemma);
            }
            counts[lemma] += 1;
        });
    });
    const scored = order
        .map((w) => ({
            w,
            score: (PE_VOCAB_DICT[w] ? 5 : 0) + counts[w] + Math.min(w.length, 8) * 0.1
        }))
        .sort((a, b) => b.score - a.score);
    return scored.slice(0, limit || 6).map((x) => x.w);
}

function peIsVerbLike(word) {
    const w = String(word || '').toLowerCase();
    if (w.length < 4 || PE_STOP[w]) return false;
    const meta = PE_VOCAB_DICT[w] || PE_VOCAB_DICT[peLemma(w)];
    if (meta && /하다|하는|되는|된|이다|놓|옮|밀|확인|덮|만들|돕|평평/.test(meta.meaning || '')) return true;
    if (/ing$|ed$/.test(w)) return true;
    const roots = [
        'prepare', 'place', 'cover', 'check', 'push', 'flatten', 'carry', 'move', 'help',
        'make', 'run', 'win', 'start', 'fix', 'try', 'work', 'walk', 'read', 'write',
        'build', 'grow', 'learn', 'teach', 'play', 'watch', 'listen', 'speak', 'open', 'close'
    ];
    return roots.includes(w) || roots.includes(peLemma(w));
}

/** 문장(각 Sentence card)마다 숨길 동사 1개씩 선택 */
function pePickHiddenVerbsPerSentence(sentences) {
    const result = [];
    sentences.forEach((s, sentenceIndex) => {
        const candidates = [];
        const parts = String(s.en || '').match(/[A-Za-z']+/g) || [];
        parts.forEach((surface) => {
            const lower = surface.toLowerCase();
            if (!peIsVerbLike(lower)) return;
            let score = 0;
            if (/ing$|ed$/.test(lower)) score += 3;
            if (PE_VOCAB_DICT[lower] || PE_VOCAB_DICT[peLemma(lower)]) score += 4;
            score += Math.min(lower.length, 10) * 0.1;
            candidates.push({
                word: lower, // vocab-card match key (lower)
                surface, // actual token shown/sounded
                sentenceIndex,
                full: s.en,
                score
            });
        });
        candidates.sort((a, b) => b.score - a.score);
        if (!candidates.length) {
            parts.forEach((surface) => {
                const lower = surface.toLowerCase();
                if (lower.length < 4 || PE_STOP[lower]) return;
                candidates.push({
                    word: lower,
                    surface,
                    sentenceIndex,
                    full: s.en,
                    score: Math.min(lower.length, 10) * 0.1
                });
            });
            candidates.sort((a, b) => b.score - a.score);
        }
        result[sentenceIndex] = candidates[0] || null;
    });
    return result;
}

function peRenderSentenceWithBlanks(en, hidden, sentenceIndex) {
    const text = String(en || '');
    if (!hidden || hidden.sentenceIndex !== sentenceIndex) {
        return escapeHtml(text);
    }
    const escapedSurface = String(hidden.surface || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp('\\b(' + escapedSurface + ')\\b', 'i');
    const m = text.match(re);
    if (!m) return escapeHtml(text);

    const before = text.slice(0, m.index);
    const after = text.slice(m.index + m[0].length);
    const surface = m[1];

    return (
        escapeHtml(before) +
        '<button type="button" class="pe-blank" data-pe-blank-id="s' + sentenceIndex + '"' +
        ' data-pe-surface="' + wotdEscapeAttr(surface) +
        '" data-pe-sentence="' + sentenceIndex +
        '" aria-label="빈칸, 클릭하면 정답 표시" title="클릭하면 정답 표시">' +
          '<span class="pe-blank-answer">' + escapeHtml(surface) + '</span>' +
        '</button>' +
        escapeHtml(after)
    );
}

function peBuildDistractors(answer, pool) {
    const ans = String(answer || '').toLowerCase();
    const out = [];
    const used = { [ans]: true };
    (pool || []).forEach((w) => {
        const lw = String(w).toLowerCase();
        if (used[lw] || lw === ans) return;
        used[lw] = true;
        out.push(w);
    });
    PE_DISTRACTORS.forEach((w) => {
        if (used[w] || w === ans) return;
        used[w] = true;
        out.push(w);
    });
    return out.slice(0, 3);
}

function peShuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
    }
    return a;
}

function peGetXp() {
    try {
        return parseInt(sessionStorage.getItem('pe_xp') || '0', 10) || 0;
    } catch (_) {
        return 0;
    }
}

function peAddXp(n) {
    const next = peGetXp() + (n || 0);
    try {
        sessionStorage.setItem('pe_xp', String(next));
    } catch (_) {}
    return next;
}

function peParsePhotoCard(card) {
    const img = card.querySelector('.pe-hero-img, .wotd-hero-image, .pe-hero img, img');
    const imageSrc = img ? (img.getAttribute('src') || '') : '';
    const imageAlt = img ? (img.getAttribute('alt') || '') : '';
    const sentences = [];
    card.querySelectorAll('.pe-sentence').forEach((node) => {
        const enEl = node.querySelector('.pe-en');
        const koEl = node.querySelector('.pe-ko-line');
        const en = enEl ? (enEl.textContent || '').replace(/\s*🔊\s*/gu, ' ').replace(/\s+/g, ' ').trim() : '';
        const ko = koEl ? (koEl.textContent || '').trim() : '';
        if (en) sentences.push({ en, ko });
    });
    const aiNoteEl = card.querySelector('.pe-ai-note');
    const aiNote = aiNoteEl ? (aiNoteEl.textContent || '').trim() : '';
    return { imageSrc, imageAlt, sentences, aiNote };
}

function peBuildLessonHtml(data, title) {
    const captionKo = String(title || '').split('|')[0].trim() || '사진으로 배우는 영어';
    const allSentences = data.sentences;
    const hiddenVerbs = pePickHiddenVerbsPerSentence(allSentences);
    const keywords = pePickKeywords(allSentences, 6);

    const sentenceCards = allSentences.map((s, idx) => {
        const badgeClass = PE_BADGE_CLASS[idx % PE_BADGE_CLASS.length];
        const enHtml = hiddenVerbs[idx]
            ? peRenderSentenceWithBlanks(s.en, hiddenVerbs[idx], idx)
            : escapeHtml(s.en);
        return (
            '<article class="pe-scard">' +
              '<div class="pe-scard-top">' +
                '<span class="pe-badge ' + badgeClass + '">Sentence ' + (idx + 1) + '</span>' +
                '<button type="button" class="pe-tts-btn" data-pe-tts="' + wotdEscapeAttr(s.en) + '" aria-label="문장 읽기">🔊</button>' +
              '</div>' +
              '<p class="pe-en' + (hiddenVerbs[idx] ? ' pe-en--interactive' : '') + '">' + enHtml + '</p>' +
              '<p class="pe-ko-line">' + escapeHtml(s.ko) + '</p>' +
            '</article>'
        );
    }).join('');

    const quizBank = [];
    (hiddenVerbs || []).forEach((h) => {
        if (!h) return;
        const escapedSurface = String(h.surface || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('\\b(' + escapedSurface + ')\\b', 'i');
        const m = String(h.full || '').match(re);
        const surface = m ? m[1] : h.surface;
        const prompt = String(h.full || '').replace(re, '________');
        quizBank.push({
            word: h.word,
            surface,
            prompt,
            choices: peShuffle([surface].concat(peBuildDistractors(surface, keywords))),
            full: h.full,
            sentenceIndex: h.sentenceIndex
        });
    });

    return {
        html: (
            '<div class="pe-lesson" data-pe-lesson>' +
              '<div class="pe-xp-bar" aria-live="polite">⭐ <span data-pe-xp>' + peGetXp() + '</span> XP</div>' +
              '<div class="pe-lesson-grid">' +
                '<aside class="pe-image-card">' +
                  (data.imageSrc
                    ? '<img class="pe-hero-img" src="' + wotdEscapeAttr(data.imageSrc) + '" alt="' + wotdEscapeAttr(data.imageAlt || captionKo) + '" loading="lazy">'
                    : '<div class="pe-image-placeholder" aria-hidden="true">📷</div>') +
                  '<p class="pe-caption">' + escapeHtml(captionKo) + '</p>' +
                '</aside>' +
                '<div class="pe-sentence-stack">' + sentenceCards + '</div>' +
              '</div>' +
              '<section class="pe-quiz-section" data-pe-quiz hidden>' +
                '<h3 class="pe-quiz-title">🎯 빠른 복습 (Quick Quiz)</h3>' +
                '<div class="pe-quiz-card">' +
                  '<p class="pe-quiz-guide">아래 문장을 완성하세요: <span class="pe-quiz-progress" data-pe-quiz-progress></span></p>' +
                  '<p class="pe-quiz-prompt" data-pe-quiz-prompt></p>' +
                  '<div class="pe-quiz-choices" data-pe-quiz-choices></div>' +
                  '<p class="pe-quiz-feedback" data-pe-quiz-feedback aria-live="polite"></p>' +
                  '<button type="button" class="pe-quiz-listen" data-pe-quiz-listen hidden>🔊 문장 다시 듣기</button>' +
                '</div>' +
                '<div class="pe-quiz-nav">' +
                  '<span class="pe-quiz-nav-item" data-pe-quiz-prev-wrap>' +
                    '<button type="button" class="pe-quiz-prev" data-pe-quiz-prev disabled>← 이전 문제</button>' +
                  '</span>' +
                  '<span class="pe-quiz-nav-item" data-pe-quiz-next-wrap>' +
                    '<button type="button" class="pe-quiz-next" data-pe-quiz-next>다음 문제로 →</button>' +
                  '</span>' +
                '</div>' +
              '</section>' +
              (data.aiNote ? '<p class="pe-ai-note">' + escapeHtml(data.aiNote) + '</p>' : '') +
            '</div>'
        ),
        quizBank,
        keywords
    };
}

function peRevealBlank(btn) {
    if (!btn || btn.classList.contains('is-revealed')) return;
    const surface = btn.getAttribute('data-pe-surface') || '';
    btn.classList.add('is-revealed');
    const ansEl = btn.querySelector('.pe-blank-answer');
    if (ansEl && !ansEl.textContent) ansEl.textContent = surface;
    btn.setAttribute('aria-label', '정답: ' + surface);
}

function peFillQuizBlank(blankEl, surface) {
    if (!blankEl) return;
    blankEl.classList.add('is-filled');
    const ansEl = blankEl.querySelector('.pe-quiz-blank-answer');
    if (ansEl && !ansEl.textContent) ansEl.textContent = surface;
}

function peBindLessonInteractions(root, quizBank) {
    if (!root) return;

    const xpEl = root.querySelector('[data-pe-xp]');
    const updateXp = () => {
        if (xpEl) xpEl.textContent = String(peGetXp());
    };

    root.querySelectorAll('.pe-tts-btn').forEach((btn) => {
        if (btn.dataset.peTtsBound === '1') return;
        btn.dataset.peTtsBound = '1';
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const text = btn.getAttribute('data-pe-tts') || '';
            if (!text || !window.speechSynthesis) return;
            const playing = btn.classList.contains('is-playing') && (speechSynthesis.speaking || speechSynthesis.pending);
            if (playing) {
                speechSynthesis.cancel();
                btn.classList.remove('is-playing');
                return;
            }
            speechSynthesis.cancel();
            root.querySelectorAll('.pe-tts-btn.is-playing').forEach((b) => b.classList.remove('is-playing'));
            btn.classList.add('is-playing');
            peSpeak(text, btn);
        });
    });

    root.querySelectorAll('.pe-blank').forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            peRevealBlank(btn);
        });
    });

    const quizSection = root.querySelector('[data-pe-quiz]');
    if (!quizSection || !quizBank || !quizBank.length) return;

    quizSection.hidden = false;
    let qi = 0;
    const quizState = quizBank.map(function () {
        return { answered: false, selected: '' };
    });
    const promptEl = quizSection.querySelector('[data-pe-quiz-prompt]');
    const choicesEl = quizSection.querySelector('[data-pe-quiz-choices]');
    const feedbackEl = quizSection.querySelector('[data-pe-quiz-feedback]');
    const progressEl = quizSection.querySelector('[data-pe-quiz-progress]');
    const nextBtn = quizSection.querySelector('[data-pe-quiz-next]');
    const prevBtn = quizSection.querySelector('[data-pe-quiz-prev]');
    const prevWrap = quizSection.querySelector('[data-pe-quiz-prev-wrap]');
    const nextWrap = quizSection.querySelector('[data-pe-quiz-next-wrap]');
    const listenBtn = quizSection.querySelector('[data-pe-quiz-listen]');

    function stopQuizSpeech() {
        try { speechSynthesis.cancel(); } catch (_) {}
        if (listenBtn) listenBtn.classList.remove('is-playing');
    }

    function updateNavButtons() {
        const atFirst = qi <= 0;
        const atEnd = qi >= quizBank.length;

        if (prevBtn) prevBtn.disabled = atFirst;
        if (prevWrap) {
            prevWrap.classList.toggle('is-blocked', atFirst);
            prevWrap.setAttribute('data-tip', atFirst ? '여기가 처음입니다 😄' : '');
            if (atFirst) prevWrap.setAttribute('title', '여기가 처음입니다 😄');
            else prevWrap.removeAttribute('title');
        }

        if (!nextBtn) return;
        if (atEnd) {
            nextBtn.disabled = true;
            nextBtn.textContent = '완료 🎉';
            if (nextWrap) {
                nextWrap.classList.add('is-blocked');
                nextWrap.setAttribute('data-tip', '여기가 마지막입니다 😄');
                nextWrap.setAttribute('title', '여기가 마지막입니다 😄');
            }
            return;
        }

        nextBtn.disabled = false;
        nextBtn.textContent = qi < quizBank.length - 1 ? '다음 문제로 →' : '완료하기 →';
        if (nextWrap) {
            nextWrap.classList.remove('is-blocked');
            nextWrap.removeAttribute('data-tip');
            nextWrap.removeAttribute('title');
        }
    }

    function renderQuiz() {
        if (qi >= quizBank.length) {
            promptEl.textContent = '모든 문제를 완료했습니다!';
            choicesEl.innerHTML = '';
            feedbackEl.textContent = '오늘 학습 XP: ' + peGetXp();
            feedbackEl.className = 'pe-quiz-feedback is-correct';
            if (listenBtn) listenBtn.hidden = true;
            if (progressEl) progressEl.textContent = '';
            updateNavButtons();
            return;
        }

        const q = quizBank[qi];
        const state = quizState[qi] || { answered: false, selected: '' };
        if (progressEl) progressEl.textContent = '(' + (qi + 1) + ' / ' + quizBank.length + ')';

        const blankToken = '___BLANK___';
        const promptWithToken = String(q.prompt).replace('________', blankToken);
        promptEl.innerHTML = escapeHtml(promptWithToken).replace(
            blankToken,
            '<span class="pe-quiz-blank" data-pe-quiz-blank aria-label="빈칸">' +
              '<span class="pe-quiz-blank-answer">' + escapeHtml(q.surface) + '</span>' +
            '</span>'
        );

        if (listenBtn) {
            listenBtn.dataset.peTts = q.full;
            listenBtn.hidden = !state.answered;
        }

        if (state.answered) {
            peFillQuizBlank(promptEl.querySelector('[data-pe-quiz-blank]'), q.surface);
            feedbackEl.textContent = '정답! 문장을 읽고 들어 보세요. (또는 다음/이전으로 이동)';
            feedbackEl.className = 'pe-quiz-feedback is-correct';
        } else {
            feedbackEl.textContent = '어려우면 풀지 않고 다음으로 넘겨도 됩니다.';
            feedbackEl.className = 'pe-quiz-feedback';
        }

        choicesEl.innerHTML = q.choices.map(function (c) {
            return (
                '<button type="button" class="pe-choice" data-pe-choice="' + wotdEscapeAttr(c) + '">' +
                escapeHtml(c) +
                '</button>'
            );
        }).join('');

        choicesEl.querySelectorAll('.pe-choice').forEach(function (btn) {
            const val = btn.getAttribute('data-pe-choice') || '';
            if (state.answered) {
                btn.disabled = true;
                if (val.toLowerCase() === String(q.surface).toLowerCase()) {
                    btn.classList.add('is-correct');
                    btn.textContent = val + ' ✓';
                }
            }

            btn.addEventListener('click', function () {
                if (quizState[qi].answered) return;
                const picked = btn.getAttribute('data-pe-choice') || '';
                const correct = picked.toLowerCase() === String(q.surface).toLowerCase();
                if (!correct) {
                    btn.classList.add('is-wrong');
                    feedbackEl.textContent = '다시 생각해 보세요. (어려우면 다음으로 넘겨도 됩니다)';
                    feedbackEl.className = 'pe-quiz-feedback is-wrong';
                    return;
                }

                quizState[qi] = { answered: true, selected: picked };
                btn.classList.add('is-correct');
                btn.textContent = picked + ' ✓';
                choicesEl.querySelectorAll('.pe-choice').forEach(function (b) {
                    b.disabled = true;
                    if ((b.getAttribute('data-pe-choice') || '').toLowerCase() === String(q.surface).toLowerCase()) {
                        b.classList.add('is-correct');
                    }
                });
                peFillQuizBlank(promptEl.querySelector('[data-pe-quiz-blank]'), q.surface);
                peAddXp(10);
                updateXp();
                feedbackEl.textContent = '정답! +10 XP · 문장을 읽고 들어 보세요.';
                feedbackEl.className = 'pe-quiz-feedback is-correct';
                if (listenBtn) listenBtn.hidden = false;
                peSpeak(q.full, listenBtn);
                updateNavButtons();
            });
        });

        updateNavButtons();
    }

    if (listenBtn && listenBtn.dataset.peQuizListenBound !== '1') {
        listenBtn.dataset.peQuizListenBound = '1';
        listenBtn.addEventListener('click', function () {
            const text = listenBtn.dataset.peTts || '';
            if (!text) return;
            peSpeak(text, listenBtn);
        });
    }

    if (prevBtn && prevBtn.dataset.peQuizPrevBound !== '1') {
        prevBtn.dataset.peQuizPrevBound = '1';
        prevBtn.addEventListener('click', function () {
            if (qi <= 0) return;
            stopQuizSpeech();
            qi -= 1;
            renderQuiz();
        });
    }

    if (nextBtn && nextBtn.dataset.peQuizNextBound !== '1') {
        nextBtn.dataset.peQuizNextBound = '1';
        nextBtn.addEventListener('click', function () {
            // 정답을 맞추지 않아도 다음으로 이동 가능
            stopQuizSpeech();
            qi += 1;
            renderQuiz();
        });
    }

    renderQuiz();
    updateXp();
}

function enhancePhotoEnglishLesson(post) {
    const container = document.getElementById('post-message');
    if (!container) return;
    const card = container.querySelector('.photo-english-card');
    if (!card || card.querySelector('[data-pe-lesson]')) return;

    const parsed = peParsePhotoCard(card);
    if (!parsed.sentences.length) return;

    const built = peBuildLessonHtml(parsed, (post && post.title) || '');
    card.innerHTML = built.html;
    card.classList.add('photo-english-card--interactive');
    peBindLessonInteractions(card.querySelector('[data-pe-lesson]'), built.quizBank);
}

function showLoading() {
    document.getElementById('post-container').innerHTML = `
        <div class="vp-skeleton" aria-hidden="true" style="padding: 8px 0 24px;">
            <div style="height: 22px; width: 72%; max-width: 420px; border-radius: 6px; background: #e8edf2; margin-bottom: 14px;"></div>
            <div style="height: 12px; width: 40%; max-width: 180px; border-radius: 6px; background: #eef2f6; margin-bottom: 28px;"></div>
            <div style="height: 12px; width: 100%; border-radius: 6px; background: #eef2f6; margin-bottom: 10px;"></div>
            <div style="height: 12px; width: 96%; border-radius: 6px; background: #eef2f6; margin-bottom: 10px;"></div>
            <div style="height: 12px; width: 88%; border-radius: 6px; background: #eef2f6; margin-bottom: 10px;"></div>
            <div style="height: 12px; width: 92%; border-radius: 6px; background: #eef2f6;"></div>
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

        enhancePhotoEnglishLesson(post);
        // 영어 줄 뒤에 개별 스피커 아이콘 추가 (레거시 레이아웃용)
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
