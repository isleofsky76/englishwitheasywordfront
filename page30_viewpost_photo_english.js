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
    prepared: { ipa: '/prɪˈperd/', meaning: '준비된, 준비되다', example: 'The room is prepared for guests.' },
    preparing: { ipa: '/prɪˈperɪŋ/', meaning: '준비하는', example: 'They are preparing dinner.' },
    roll: { ipa: '/roʊl/', meaning: '롤, 두루마리', example: 'a roll of paper' },
    rolls: { ipa: '/roʊlz/', meaning: '롤들, 말린 것', example: 'Workers carried long rolls of grass.' },
    grass: { ipa: '/ɡræs/', meaning: '잔디, 풀', example: 'The grass looks fresh and green.' },
    carefully: { ipa: '/ˈkerfəli/', meaning: '조심스럽게', example: 'Please open the box carefully.' },
    place: { ipa: '/pleɪs/', meaning: '놓다, 두다', example: 'Place the book on the table.' },
    field: { ipa: '/fiːld/', meaning: '경기장, 들판', example: 'Players ran onto the field.' },
    stadium: { ipa: '/ˈsteɪdiəm/', meaning: '경기장', example: 'The stadium was full of fans.' },
    match: { ipa: '/mætʃ/', meaning: '경기, 시합', example: 'They won the match.' },
    worker: { ipa: '/ˈwɜːrkər/', meaning: '작업자', example: 'The workers finished early.' },
    workers: { ipa: '/ˈwɜːrkərz/', meaning: '작업자들', example: 'Workers are fixing the road.' },
    carrying: { ipa: '/ˈkæriɪŋ/', meaning: '나르는, 옮기는', example: 'He is carrying a heavy box.' },
    covered: { ipa: '/ˈkʌvərd/', meaning: '덮인, 덮이다', example: 'The ground is covered with snow.' },
    pushing: { ipa: '/ˈpʊʃɪŋ/', meaning: '미는', example: 'She is pushing the door.' },
    checking: { ipa: '/ˈtʃekɪŋ/', meaning: '확인하는', example: 'He is checking the list.' },
    flatten: { ipa: '/ˈflætn/', meaning: '평평하게 하다', example: 'Flatten the dough with a roller.' },
    smooth: { ipa: '/smuːð/', meaning: '매끄러운', example: 'The surface feels smooth.' },
    safe: { ipa: '/seɪf/', meaning: '안전한', example: 'Keep the kids safe.' },
    even: { ipa: '/ˈiːvn/', meaning: '고른, 평평한', example: 'Make the surface even.' },
    ready: { ipa: '/ˈredi/', meaning: '준비된', example: 'Are you ready for class?' },
    machine: { ipa: '/məˈʃiːn/', meaning: '기계', example: 'This machine helps a lot.' },
    position: { ipa: '/pəˈzɪʃn/', meaning: '위치, 자리', example: 'Move it into the right position.' },
    edges: { ipa: '/ˈedʒɪz/', meaning: '가장자리들', example: 'Check the edges carefully.' },
    players: { ipa: '/ˈpleɪərz/', meaning: '선수들', example: 'The players practiced hard.' },
    soccer: { ipa: '/ˈsɑːkər/', meaning: '축구', example: 'Soccer is popular worldwide.' },
    game: { ipa: '/ɡeɪm/', meaning: '경기, 게임', example: 'The game starts at seven.' }
};

const PE_DISTRACTORS = [
    'pieces', 'bundles', 'strips', 'layers', 'boards', 'bags', 'boxes', 'tools',
    'quickly', 'slowly', 'suddenly', 'quietly', 'put', 'drop', 'lift', 'move',
    'floor', 'ground', 'court', 'track', 'ready', 'build', 'cover', 'fix'
];

const PE_BADGE_CLASS = ['pe-badge--1', 'pe-badge--2', 'pe-badge--3'];

function peSpeak(text, btn) {
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
            if (btn) btn.classList.remove('is-playing', 'wotd-tts-playing');
        };
        u.onend = done;
        u.onerror = done;
        speechSynthesis.speak(u);
    } catch (e) {
        if (btn) btn.classList.remove('is-playing', 'wotd-tts-playing');
        console.warn('photo-english TTS:', e);
    }
}

function peLemma(word) {
    const w = String(word || '').toLowerCase();
    if (PE_VOCAB_DICT[w]) return w;
    if (w.endsWith('ies') && w.length > 4) return w.slice(0, -3) + 'y';
    if (w.endsWith('ing') && w.length > 5) {
        const base = w.slice(0, -3);
        if (PE_VOCAB_DICT[base]) return base;
        if (PE_VOCAB_DICT[base + 'e']) return base + 'e';
    }
    if (w.endsWith('ed') && w.length > 4) {
        const a = w.slice(0, -2);
        const b = w.slice(0, -1);
        if (PE_VOCAB_DICT[a]) return a;
        if (PE_VOCAB_DICT[b]) return b;
        if (PE_VOCAB_DICT[a + 'e']) return a + 'e';
    }
    if (w.endsWith('s') && w.length > 3 && !w.endsWith('ss')) {
        const singular = w.slice(0, -1);
        if (PE_VOCAB_DICT[singular]) return singular;
    }
    return w;
}

function peVocabMeta(word) {
    const raw = String(word || '').toLowerCase();
    const key = peLemma(raw);
    const hit = PE_VOCAB_DICT[raw] || PE_VOCAB_DICT[key];
    if (hit) {
        return {
            word: raw,
            display: raw,
            ipa: hit.ipa,
            meaning: hit.meaning,
            example: hit.example
        };
    }
    return {
        word: raw,
        display: raw,
        ipa: '',
        meaning: '이 문장에서 사용된 핵심 단어입니다.',
        example: ''
    };
}

function pePickKeywords(sentences, limit) {
    const counts = {};
    const order = [];
    sentences.forEach((s) => {
        const parts = String(s.en || '').match(/[A-Za-z']+/g) || [];
        parts.forEach((p) => {
            const lower = p.toLowerCase();
            if (lower.length < 4 || PE_STOP[lower]) return;
            if (!counts[lower]) {
                counts[lower] = 0;
                order.push(lower);
            }
            counts[lower] += 1;
        });
    });
    const scored = order
        .map((w) => ({
            w,
            score: (PE_VOCAB_DICT[w] || PE_VOCAB_DICT[peLemma(w)] ? 5 : 0) + counts[w] + Math.min(w.length, 8) * 0.1
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
        '<button type="button" class="pe-blank" data-pe-word="' + wotdEscapeAttr(hidden.word) +
        '" data-pe-surface="' + wotdEscapeAttr(surface) +
        '" data-pe-sentence="' + sentenceIndex +
        '" aria-label="빈칸" title="클릭하면 단어 힌트"></button>' +
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
        const en = enEl ? (enEl.textContent || '').replace(/\s*🔊\s*$/u, '').trim() : '';
        const ko = koEl ? (koEl.textContent || '').trim() : '';
        if (en) sentences.push({ en, ko });
    });
    const aiNoteEl = card.querySelector('.pe-ai-note');
    const aiNote = aiNoteEl ? (aiNoteEl.textContent || '').trim() : '';
    return { imageSrc, imageAlt, sentences, aiNote };
}

function peBuildLessonHtml(data, title) {
    const captionKo = String(title || '').split('|')[0].trim() || '사진으로 배우는 영어';
    const focus = data.sentences.slice(0, 3);
    const sourceSentences = focus.length ? focus : data.sentences;
    const hiddenVerbs = pePickHiddenVerbsPerSentence(sourceSentences);
    const keywords = pePickKeywords(sourceSentences, 6);
    const vocab = keywords.map(peVocabMeta);

    const sentenceCards = data.sentences.map((s, idx) => {
        const isInteractive = idx < focus.length;
        const badgeClass = idx < PE_BADGE_CLASS.length ? PE_BADGE_CLASS[idx] : PE_BADGE_CLASS[2];
        const enHtml = isInteractive ? peRenderSentenceWithBlanks(s.en, hiddenVerbs[idx], idx) : escapeHtml(s.en);
        return (
            '<article class="pe-scard">' +
              '<div class="pe-scard-top">' +
                '<span class="pe-badge ' + badgeClass + '">Sentence ' + (idx + 1) + '</span>' +
                '<button type="button" class="pe-tts-btn" data-pe-tts="' + wotdEscapeAttr(s.en) + '" aria-label="문장 읽기">🔊</button>' +
              '</div>' +
              '<p class="pe-en' + (isInteractive ? ' pe-en--interactive' : '') + '">' + enHtml + '</p>' +
              '<p class="pe-ko-line">' + escapeHtml(s.ko) + '</p>' +
            '</article>'
        );
    }).join('');

    const vocabCards = vocab.map((v) => (
        '<details class="pe-vocab-card" data-pe-vocab="' + wotdEscapeAttr(v.word) + '">' +
          '<summary class="pe-vocab-summary">' +
            '<span class="pe-vocab-word">' + escapeHtml(v.display) + '</span>' +
            '<span class="pe-vocab-chevron" aria-hidden="true">▾</span>' +
          '</summary>' +
          '<div class="pe-vocab-body">' +
            '<div class="pe-vocab-ipa-row">' +
              (v.ipa ? '<span class="pe-vocab-ipa">' + escapeHtml(v.ipa) + '</span>' : '') +
              '<button type="button" class="pe-tts-btn" data-pe-tts="' + wotdEscapeAttr(v.display) + '" aria-label="단어 발음">🔊 발음</button>' +
            '</div>' +
            '<p class="pe-vocab-meaning">' + escapeHtml(v.meaning) + '</p>' +
            (v.example ? '<p class="pe-vocab-example">' + escapeHtml(v.example) + '</p>' : '') +
          '</div>' +
        '</details>'
    )).join('');

    const quizBank = [];
    (hiddenVerbs || []).forEach((h) => {
        if (!h) return;
        const escapedSurface = String(h.surface || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const re = new RegExp('\\b(' + escapedSurface + ')\\b', 'i');
        const m = String(h.full || '').match(re);
        const surface = m ? m[1] : h.surface;
        const prompt = String(h.full || '').replace(re, '________');
        quizBank.push({
            word: h.word, // vocab-card / blank key
            surface,
            prompt,
            choices: peShuffle([surface].concat(peBuildDistractors(surface, keywords))),
            full: h.full
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
                  '<p class="pe-quiz-guide">아래 문장을 완성하세요:</p>' +
                  '<p class="pe-quiz-prompt" data-pe-quiz-prompt></p>' +
                  '<div class="pe-quiz-choices" data-pe-quiz-choices></div>' +
                  '<p class="pe-quiz-feedback" data-pe-quiz-feedback aria-live="polite"></p>' +
                '</div>' +
                '<button type="button" class="pe-quiz-next" data-pe-quiz-next disabled>다음 문제로 → (점수 +10 XP)</button>' +
              '</section>' +
              '<section class="pe-vocab-section">' +
                '<h3 class="pe-section-title"><span class="pe-section-icon" aria-hidden="true">📚</span> 주요 단어</h3>' +
                '<div class="pe-vocab-grid">' + vocabCards + '</div>' +
              '</section>' +
              (data.aiNote ? '<p class="pe-ai-note">' + escapeHtml(data.aiNote) + '</p>' : '') +
            '</div>'
        ),
        quizBank,
        keywords
    };
}

function peRevealWord(root, word, opts) {
    const key = String(word || '').toLowerCase();
    if (!root || !key) return;
    root.querySelectorAll('.pe-blank[data-pe-word="' + key + '"]').forEach((btn) => {
        if (btn.classList.contains('is-revealed')) return;
        const surface = btn.getAttribute('data-pe-surface') || key;
        btn.classList.add('is-revealed');
        btn.textContent = surface;
        btn.setAttribute('aria-label', '정답: ' + surface);
    });
    if (opts && opts.openVocab) {
        const card =
            root.querySelector('.pe-vocab-card[data-pe-vocab="' + key + '"]') ||
            root.querySelector('.pe-vocab-card[data-pe-vocab="' + peLemma(key) + '"]');
        if (card) card.open = true;
    }
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
        btn.addEventListener('click', () => {
            const word = btn.getAttribute('data-pe-word') || '';
            const surface = btn.getAttribute('data-pe-surface') || word;
            // 힌트만: 단어 카드 펼침 + 발음 (문장 빈칸은 퀴즈 정답 시에만 채움)
            const card = root.querySelector('.pe-vocab-card[data-pe-vocab="' + word + '"]');
            if (card) {
                card.open = true;
                try { card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); } catch (_) {}
            }
            peSpeak(surface, null);
        });
    });

    const quizSection = root.querySelector('[data-pe-quiz]');
    if (!quizSection || !quizBank || !quizBank.length) return;

    quizSection.hidden = false;
    let qi = 0;
    let answered = false;
    const promptEl = quizSection.querySelector('[data-pe-quiz-prompt]');
    const choicesEl = quizSection.querySelector('[data-pe-quiz-choices]');
    const feedbackEl = quizSection.querySelector('[data-pe-quiz-feedback]');
    const nextBtn = quizSection.querySelector('[data-pe-quiz-next]');

    function renderQuiz() {
        const q = quizBank[qi];
        if (!q) {
            promptEl.textContent = '모든 문제를 완료했습니다!';
            choicesEl.innerHTML = '';
            feedbackEl.textContent = '오늘 학습 XP: ' + peGetXp();
            nextBtn.disabled = true;
            nextBtn.textContent = '완료 🎉';
            return;
        }
        answered = false;
        // 빈칸은 처음엔 비어 있음 (밑줄만)
        const blankToken = '___BLANK___';
        const promptWithToken = String(q.prompt).replace('________', blankToken);
        promptEl.innerHTML = escapeHtml(promptWithToken).replace(
            blankToken,
            '<span class="pe-quiz-blank" data-pe-quiz-blank aria-label="빈칸"></span>'
        );
        feedbackEl.textContent = '';
        feedbackEl.className = 'pe-quiz-feedback';
        nextBtn.disabled = true;
        nextBtn.textContent = qi < quizBank.length - 1
            ? '다음 문제로 → (점수 +10 XP)'
            : '완료하기 → (점수 +10 XP)';

        choicesEl.innerHTML = q.choices.map((c) => (
            '<button type="button" class="pe-choice" data-pe-choice="' + wotdEscapeAttr(c) + '">' +
            escapeHtml(c) +
            '</button>'
        )).join('');

        choicesEl.querySelectorAll('.pe-choice').forEach((btn) => {
            btn.addEventListener('click', () => {
                if (answered) return;
                const val = btn.getAttribute('data-pe-choice') || '';
                const correct = val.toLowerCase() === String(q.surface).toLowerCase();
                if (!correct) {
                    btn.classList.add('is-wrong');
                    feedbackEl.textContent = '다시 생각해 보세요.';
                    feedbackEl.className = 'pe-quiz-feedback is-wrong';
                    return;
                }
                answered = true;
                btn.classList.add('is-correct');
                btn.textContent = val + ' ✓';
                choicesEl.querySelectorAll('.pe-choice').forEach((b) => {
                    b.disabled = true;
                    if ((b.getAttribute('data-pe-choice') || '').toLowerCase() === String(q.surface).toLowerCase()) {
                        b.classList.add('is-correct');
                    }
                });
                const blank = promptEl.querySelector('[data-pe-quiz-blank]');
                if (blank) {
                    blank.textContent = q.surface;
                    blank.classList.add('is-filled');
                }
                peRevealWord(root, q.word, { openVocab: true });
                peAddXp(10);
                updateXp();
                feedbackEl.textContent = '정답! +10 XP';
                feedbackEl.className = 'pe-quiz-feedback is-correct';
                nextBtn.disabled = false;
                peSpeak(q.full, null);
            });
        });
    }

    nextBtn.addEventListener('click', () => {
        if (!answered) return;
        qi += 1;
        renderQuiz();
    });

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
