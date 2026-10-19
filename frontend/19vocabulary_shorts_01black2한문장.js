/** 상단·질문 문구 — 여기서 한꺼번에 수정 */
const PAGE_META = {
  headerMain: "신문기사에서 배우는 어휘",
  headerIssue: "",
  questionPrompt: "무슨 뜻일까요?"
};

const COUNTDOWN_SEC = 5;
const COUNTDOWN_MODES = ["pop", "ring", "bars"];
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;

/**
 * 예문만 바뀌는 버전 — 단어 1개 + 예문/이미지 여러 개
 * 예문이 바뀔 때마다 insertImage도 함께 변경
 */
const WORD_LESSON = {
  word: "reignite",
  wordQuestion: "reignite",
  prompt: "무슨 뜻일까요?",
  meaning: "다시 불붙이다, 재점화하다",
  definitionEn: "reignite means to cause something, especially interest or debate, to become active again.",
  countdownStyle: "ring",
  countdownTick: "resources/mixkit-bell-tick-tock-timer-1046.wav",
  hold: 2800,
  answerSpeech: [
    "reignite means to cause something, especially interest or debate, to become active again."
  ],
  examples: [
    {
      phraseEn: "Now BTS's decision not to submit its new music is reigniting debate.",
      phraseKo: "이제 BTS가 신곡을 출품하지 않기로 한 결정이 논쟁에 다시 불을 붙이고 있다.",
      highlightWord: "reigniting",
      insertImage: "resources/1.jpg",
      insertImageAlt: "BTS의 결정으로 다시 불붙은 논쟁"
    },
    {
      phraseEn: "The announcement reignited hopes for a comeback tour.",
      phraseKo: "그 발표는 컴백 투어에 대한 희망을 다시 불붙였다.",
      highlightWord: "reignited",
      insertImage: "resources/2.jpg",
      insertImageAlt: "컴백 투어 희망이 다시 살아난 장면"
    },
    {
      phraseEn: "Social media posts reignited the debate overnight.",
      phraseKo: "소셜미디어 게시물들이 하룻밤 사이에 논쟁에 다시 불을 붙였다.",
      highlightWord: "reignited",
      insertImage: "resources/3.jpg",
      insertImageAlt: "온라인에서 다시 불붙은 논쟁"
    }
  ]
};

/** WORD_LESSON examples 기준 TTS preload 목록 */
function getLessonSpeechTexts(lesson = WORD_LESSON) {
  const texts = [];
  const word = lesson.wordQuestion || lesson.word;
  if (word) texts.push(word);
  (lesson.answerSpeech || []).forEach((t) => texts.push(t));
  if (lesson.definitionEn) texts.push(lesson.definitionEn);
  (lesson.examples || []).forEach((ex) => {
    if (ex.phraseEn) texts.push(ex.phraseEn);
  });
  return texts;
}

const TRANSITION_MS = 280;
const EXAMPLE_HOLD_MS = 900;
const IMAGE_CROSSFADE_MS = 560;
const BACKEND_PORT = 3000;

const slideHeaderEl = document.getElementById("slide-header");
const questionPromptEl = document.getElementById("question-prompt");
const stageEl = document.getElementById("stage");
const insertImageWrapEl = document.getElementById("insert-image-wrap");
const insertImageAEl = document.getElementById("insert-image-a");
const insertImageBEl = document.getElementById("insert-image-b");
const countdownWrapEl = document.getElementById("countdown-wrap");
const countdownNumEl = document.getElementById("countdown-num");
const countdownRingProgressEl = document.getElementById("countdown-ring-progress");
const countdownBarsEl = document.getElementById("countdown-bars");
const countdownStageEl = countdownWrapEl
  ? countdownWrapEl.querySelector(".countdown-stage")
  : null;
const autoplayBtn = document.getElementById("autoplay-btn");
const audioCache = new Map();

let isPlaying = false;
/** 영어 TTS: autoplay 시작 시 EN_TTS_VOICE_IDS 중 하나를 랜덤 선택 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Despina",
  2: "en-US-Chirp3-HD-Gacrux"
};
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[EN_TTS_VOICE];
let countdownTickAudio = null;

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = voices[Math.floor(Math.random() * voices.length)];
  return activeEnTtsVoiceId;
}

const backendBaseUrl = (() => {
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

function sleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function highlightPhrase(phraseEn, highlightWord) {
  const phrase = String(phraseEn || "");
  const word = String(highlightWord || "").trim();
  if (!word) return escapeHtml(phrase);
  const re = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i");
  return escapeHtml(phrase).replace(re, '<span class="hl">$1</span>');
}

function getAudioUrl(text) {
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(text)}&language=${encodeURIComponent(activeEnTtsVoiceId)}`;
}

async function loadAudio(text) {
  const url = getAudioUrl(text);
  if (audioCache.has(url)) return audioCache.get(url);

  const promise = fetch(url)
    .then((response) => {
      if (!response.ok) throw new Error(`TTS HTTP ${response.status}`);
      return response.blob();
    })
    .then((blob) => {
      const audio = new Audio(URL.createObjectURL(blob));
      audio.preload = "auto";
      return audio;
    })
    .catch((error) => {
      audioCache.delete(url);
      throw error;
    });

  audioCache.set(url, promise);
  return promise;
}

function preloadSpeech() {
  getLessonSpeechTexts().forEach((text) => {
    loadAudio(text).catch(() => {});
  });
}

async function playSpeech(text) {
  try {
    const audio = await loadAudio(text);
    audio.currentTime = 0;
    await audio.play();
    await new Promise((resolve) => {
      audio.onended = resolve;
      audio.onerror = resolve;
    });
  } catch (_) {
    // 화면 재생은 TTS 서버 상태와 무관하게 계속한다.
  }
}

function getCountdownStyle(item, index = 0) {
  const style = String(item?.countdownStyle || "").trim().toLowerCase();
  if (COUNTDOWN_MODES.includes(style)) return style;
  return COUNTDOWN_MODES[index % COUNTDOWN_MODES.length];
}

function setCountdownRing(sec, total) {
  if (!countdownRingProgressEl) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  countdownRingProgressEl.style.strokeDashoffset = String(
    Math.min(100, Math.max(0, spent))
  );
}

function setCountdownBars(sec) {
  if (!countdownBarsEl) return;
  const bars = [...countdownBarsEl.querySelectorAll("i")];
  bars.forEach((bar, idx) => {
    bar.classList.toggle("is-on", idx < sec);
  });
}

function bumpCountdownAnim() {
  if (!countdownNumEl) return;
  countdownNumEl.classList.remove("is-anim");
  void countdownNumEl.offsetWidth;
  countdownNumEl.classList.add("is-anim");
}

function stopCountdownTickSound() {
  if (!countdownTickAudio) return;
  try {
    countdownTickAudio.pause();
    countdownTickAudio.currentTime = 0;
  } catch (_) {}
  countdownTickAudio = null;
}

function startCountdownTickSound(src) {
  stopCountdownTickSound();
  const tickSrc = String(src || "").trim() || COUNTDOWN_TICK_FALLBACK_SRC;
  try {
    countdownTickAudio = new Audio(tickSrc);
    countdownTickAudio.loop = true;
    countdownTickAudio.volume = COUNTDOWN_TICK_VOLUME;
    countdownTickAudio.preload = "auto";
    const playPromise = countdownTickAudio.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  } catch (_) {}
}

function setCountdownMode(mode) {
  if (countdownStageEl) countdownStageEl.dataset.mode = mode;
}

function positionCountdownBetweenQuestionAndPhrase() {
  if (!countdownWrapEl || !stageEl) return;
  const wordEl = stageEl.querySelector(".word-question");
  const phraseEl = stageEl.querySelector(".phrase-en");
  const wrapperEl = countdownWrapEl.closest(".wrapper");
  if (!wordEl || !phraseEl || !wrapperEl) return;

  const wordRect = wordEl.getBoundingClientRect();
  const phraseRect = phraseEl.getBoundingClientRect();
  const wrapperRect = wrapperEl.getBoundingClientRect();
  const midpoint = (wordRect.bottom + phraseRect.top) / 2 - wrapperRect.top;
  countdownWrapEl.style.top = `${midpoint}px`;
}

async function runCountdown(seconds, mode = "ring", tickSrc = "") {
  if (!countdownWrapEl || !countdownNumEl) return;
  const style = COUNTDOWN_MODES.includes(mode) ? mode : "ring";
  setCountdownMode(style);
  positionCountdownBetweenQuestionAndPhrase();
  countdownWrapEl.hidden = false;
  startCountdownTickSound(tickSrc);

  if (style === "ring") setCountdownRing(seconds, seconds);
  if (style === "bars") setCountdownBars(seconds);

  try {
    for (let sec = seconds; sec >= 0; sec -= 1) {
      if (!isPlaying) break;
      countdownNumEl.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, seconds);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
  } finally {
    stopCountdownTickSound();
    countdownWrapEl.hidden = true;
    if (countdownNumEl) countdownNumEl.classList.remove("is-anim");
  }
}

function typingDelayForChar(ch, index, text) {
  if (ch === "\n") return 220 + Math.floor(Math.random() * 80);
  if (/[.,!?;:…]/.test(ch)) return 160 + Math.floor(Math.random() * 120);
  if (ch === " " || ch === "\u00a0") return 70 + Math.floor(Math.random() * 50);
  if (/[,\u3001]/.test(ch)) return 120 + Math.floor(Math.random() * 80);
  if (Math.random() < 0.08) return 140 + Math.floor(Math.random() * 160);
  if (Math.random() < 0.12) return 95 + Math.floor(Math.random() * 55);
  return 55 + Math.floor(Math.random() * 45);
}

/** meaning / phraseKo — 손글씨 대신 실제 타이핑 속도 + | 커서 */
async function typeKoLikeHuman(textEl) {
  if (!textEl) return;
  const text = String(textEl.textContent || "").trim();
  if (!text) {
    textEl.classList.remove("is-hidden");
    return;
  }

  textEl.classList.remove("is-hidden", "ko-hand", "ko-writing");
  textEl.classList.add("is-typing");
  textEl.innerHTML =
    `<span class="type-ink"></span><span class="type-caret" aria-hidden="true">|</span>`;
  const inkEl = textEl.querySelector(".type-ink");
  if (!inkEl) return;

  for (let i = 0; i < text.length; i += 1) {
    if (!isPlaying) break;
    inkEl.textContent += text[i];
    await sleep(typingDelayForChar(text[i], i, text));
  }

  inkEl.textContent = text;
  await sleep(280);
  textEl.classList.remove("is-typing");
  textEl.textContent = text;
}

async function revealWordAnswer() {
  stageEl.classList.add("is-revealed");
  const meaningEl = stageEl.querySelector(".answer-meaning");
  await typeKoLikeHuman(meaningEl);
}

function preloadImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve();
      return;
    }
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

function sameImageSrc(el, src) {
  if (!el || !src) return false;
  try {
    return el.src === new URL(src, window.location.href).href;
  } catch (_) {
    return el.getAttribute("src") === src;
  }
}

/** 이미지 크로스페이드 — 단어/스테이지는 건드리지 않음 */
async function setInsertImage(example, { immediate = false } = {}) {
  if (!insertImageWrapEl || !insertImageAEl || !insertImageBEl) return;

  const src = example?.insertImage || "";
  const alt = example?.insertImageAlt || "";

  if (!src) {
    insertImageWrapEl.classList.add("is-hidden");
    return;
  }

  insertImageWrapEl.classList.remove("is-hidden");

  const visible =
    insertImageAEl.classList.contains("is-visible") ? insertImageAEl : insertImageBEl;
  const hidden = visible === insertImageAEl ? insertImageBEl : insertImageAEl;

  if (sameImageSrc(visible, src)) {
    visible.alt = alt;
    return;
  }

  await preloadImage(src);

  if (immediate || !visible.getAttribute("src")) {
    visible.src = src;
    visible.alt = alt;
    visible.classList.add("is-visible");
    hidden.classList.remove("is-visible");
    hidden.removeAttribute("src");
    return;
  }

  hidden.src = src;
  hidden.alt = alt;
  // 다음 프레임에 visible 토글 → 크로스페이드
  await sleep(16);
  hidden.classList.add("is-visible");
  visible.classList.remove("is-visible");
  await sleep(IMAGE_CROSSFADE_MS);
}

function ensureLessonShell(lesson) {
  const word = lesson.wordQuestion || lesson.word;
  const existing = stageEl.querySelector(".word-question");
  if (existing && existing.dataset.word === (lesson.word || word)) {
    return false;
  }
  stageEl.innerHTML = `
    <h2 class="word-question" data-word="${escapeHtml(lesson.word || word)}">${escapeHtml(word)}</h2>
    <p class="answer-meaning is-hidden"></p>
    <div class="accent-divider" aria-hidden="true"></div>
    <p class="phrase-en"></p>
    <p class="phrase-ko is-hidden"></p>
  `;
  return true;
}

function updateLessonContent(lesson, example, { meaningVisible = false, phraseKoVisible = false } = {}) {
  ensureLessonShell(lesson);

  const meaningEl = stageEl.querySelector(".answer-meaning");
  const phraseEnEl = stageEl.querySelector(".phrase-en");
  const phraseKoEl = stageEl.querySelector(".phrase-ko");

  if (meaningEl) {
    meaningEl.textContent = lesson.meaning || "";
    meaningEl.classList.toggle("is-hidden", !meaningVisible);
    meaningEl.classList.remove("is-typing", "ko-hand", "ko-writing");
  }
  if (phraseEnEl) {
    phraseEnEl.innerHTML = highlightPhrase(example?.phraseEn || "", example?.highlightWord);
    phraseEnEl.classList.remove("is-speaking");
  }
  if (phraseKoEl) {
    phraseKoEl.textContent = example?.phraseKo || "";
    phraseKoEl.classList.toggle("is-hidden", !phraseKoVisible);
    phraseKoEl.classList.remove("is-typing", "ko-hand", "ko-writing");
  }
}

async function showLessonFrame(lesson, example, options = {}) {
  const {
    immediate = false,
    meaningVisible = false,
    phraseKoVisible = false,
    hidePrompt = false,
    softPhrase = true
  } = options;

  if (questionPromptEl) {
    questionPromptEl.textContent = lesson.prompt || PAGE_META.questionPrompt;
    questionPromptEl.classList.toggle("is-hidden", hidePrompt);
  }
  if (slideHeaderEl) slideHeaderEl.classList.remove("is-hidden");

  stageEl.classList.add("is-question");
  stageEl.classList.remove("is-answer", "is-review");
  stageEl.classList.toggle("is-revealed", meaningVisible);

  const shellCreated = ensureLessonShell(lesson);

  // 단어는 고정 — 예문만 soft fade
  if (!immediate && softPhrase && !shellCreated) {
    stageEl.classList.add("is-changing");
    await sleep(TRANSITION_MS);
  }

  updateLessonContent(lesson, example, { meaningVisible, phraseKoVisible });
  await setInsertImage(example, { immediate: immediate || shellCreated });

  if (countdownWrapEl) countdownWrapEl.hidden = true;
  stageEl.classList.remove("is-changing");
}

async function revealPhraseKo() {
  const phraseKoEl = stageEl.querySelector(".phrase-ko");
  if (!phraseKoEl) return;
  phraseKoEl.classList.remove("is-hidden", "is-typing", "ko-hand", "ko-writing");
}

async function playPhraseEnWithGlow(text) {
  const phraseEnEl = stageEl.querySelector(".phrase-en");
  phraseEnEl?.classList.add("is-speaking");
  try {
    await playSpeech(text);
  } finally {
    phraseEnEl?.classList.remove("is-speaking");
  }
}

/**
 * 1) 영어 예문1→이미지1, 예문2→이미지2, 예문3→이미지3
 * 2) 한글(뜻) 노출
 * 3) 정답(정의) + 예문·이미지를 다시 순서대로 노출
 */
async function playLesson(lesson = WORD_LESSON) {
  const examples = Array.isArray(lesson.examples) ? lesson.examples : [];
  if (!examples.length) return;

  // 이미지 미리 로드 → 전환 끊김 방지
  await Promise.all(examples.map((ex) => preloadImage(ex.insertImage)));

  const first = examples[0];

  // 단어 표시 (이후 프레임 전환에도 단어 DOM 유지)
  await showLessonFrame(lesson, first, {
    immediate: true,
    meaningVisible: false,
    phraseKoVisible: false,
    hidePrompt: false
  });
  await playSpeech(lesson.wordQuestion || lesson.word);
  await sleep(200);

  // --- Pass 1: 영어 예문 읽기 + 이미지 전환 ---
  for (let i = 0; i < examples.length; i += 1) {
    if (!isPlaying) return;
    const ex = examples[i];
    if (i > 0) {
      await showLessonFrame(lesson, ex, {
        immediate: false,
        meaningVisible: false,
        phraseKoVisible: false,
        hidePrompt: true
      });
    }
    if (ex.phraseEn) {
      await playPhraseEnWithGlow(ex.phraseEn);
    }
    await sleep(EXAMPLE_HOLD_MS);
  }

  // 카운트다운 후 한글(뜻) 노출
  await runCountdown(
    COUNTDOWN_SEC,
    getCountdownStyle(lesson, 0),
    lesson.countdownTick
  );
  if (!isPlaying) return;

  if (questionPromptEl) questionPromptEl.classList.add("is-hidden");
  await revealWordAnswer();

  // 정답(영어 정의) 읽기
  const answerLines = (lesson.answerSpeech && lesson.answerSpeech.length)
    ? lesson.answerSpeech
    : [lesson.definitionEn].filter(Boolean);
  for (const text of answerLines) {
    if (!isPlaying) return;
    await playSpeech(text);
    await sleep(180);
  }

  // --- Pass 2: 정답 공개 후 예문·이미지 다시 순서대로 ---
  for (let i = 0; i < examples.length; i += 1) {
    if (!isPlaying) return;
    const ex = examples[i];
    await showLessonFrame(lesson, ex, {
      immediate: false,
      meaningVisible: true,
      phraseKoVisible: false,
      hidePrompt: true
    });
    if (ex.phraseEn) {
      await playPhraseEnWithGlow(ex.phraseEn);
      await sleep(180);
    }
    if (ex.phraseKo) {
      await revealPhraseKo();
    }
    await sleep(lesson.hold || 2000);
  }
}

async function runAutoplay() {
  if (isPlaying) return;
  isPlaying = true;
  autoplayBtn.disabled = true;
  pickRandomEnTtsVoice();
  audioCache.clear();
  preloadSpeech();

  try {
    await playLesson(WORD_LESSON);
  } finally {
    stopCountdownTickSound();
    if (countdownWrapEl) countdownWrapEl.hidden = true;
    isPlaying = false;
    autoplayBtn.disabled = false;
  }
}

function applyPageMeta() {
  const mainEl = slideHeaderEl?.querySelector("[data-meta='headerMain']");
  const issueEl = slideHeaderEl?.querySelector("[data-meta='headerIssue']");
  if (mainEl) mainEl.textContent = PAGE_META.headerMain;
  if (issueEl) issueEl.textContent = PAGE_META.headerIssue;
  if (questionPromptEl) questionPromptEl.textContent = PAGE_META.questionPrompt;
}

applyPageMeta();
preloadSpeech();
showLessonFrame(WORD_LESSON, WORD_LESSON.examples[0], {
  immediate: true,
  meaningVisible: false,
  phraseKoVisible: false,
  hidePrompt: false
});
autoplayBtn.addEventListener("click", runAutoplay);
