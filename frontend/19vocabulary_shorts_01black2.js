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

/** 장면 데이터 — 슬라이드 PNG 없이 JSON만으로 구성 */
const SLIDES = [
  {
    type: "word",
    word: "coy",
    wordQuestion: "coy",
    prompt: "무슨 뜻일까요?",
    meaning: "얘기를 잘 안 하는, 수줍어하는",
    definitionEn: "coy means deliberately unwilling to reveal information or give a clear answer.",
    phraseEn: "They have been coy about the glove change.",
    phraseKo: "그들은 글러브를 바꾼 것에 대해 말을 아끼는 모습이다/모호한 태도를 보이고 있다.",
    highlightWord: "coy",
    insertImage: "resources/1.jpg",
    insertImageAlt: "커진 글러브에 관해 말을 아끼는 다저스 관계자들",
    questionSpeech: [
      "coy",
      "They have been coy about the glove change."
    ],
    answerSpeech: [
      "coy means not telling or revealing all the information that could be revealed."
    ],
    countdownStyle: "ring",
    countdownTick: "resources/mixkit-bell-tick-tock-timer-1046.wav",
    hold: 3200
  },
  {
    type: "word",
    word: "conceal",
    wordQuestion: "conceal",
    prompt: "무슨 뜻일까요?",
    meaning: "감추다, 숨기다",
    definitionEn: "conceal means to hide something or prevent it from being seen.",
    phraseEn: "It allows him to better conceal the ball from opponents' prying eyes.",
    phraseKo: "그것은 상대 선수들의 엿보는(prying) 시선으로부터 공을 더 잘 감출 수 있게 해준다.",
    highlightWord: "conceal",
    insertImage: "resources/3.jpg",
    insertImageAlt: "큰 글러브로 공을 감추는 사사키",
    questionSpeech: [
      "conceal",
      "It allows him to better conceal the ball from opponents' prying eyes."
    ],
    answerSpeech: [
      "conceal means to hide something or prevent it from being seen."
    ],
    countdownStyle: "ring",
    countdownTick: "resources/mixkit-bell-tick-tock-timer-1046.wav",
    hold: 3200
  },
  
  {
    type: "word",
    word: "tip off",
    wordQuestion: "tip off",
    prompt: "무슨 뜻일까요?",
    meaning: "귀띔해 주다, 알려주다",
    definitionEn: "tip off means to secretly give someone information or unintentionally reveal something.",
    phraseEn: "He was unknowingly tipping off the hitters about what pitch was coming.",
    phraseKo: "그는 자기도 모르게 어떤 구종이 들어올지 타자들에게 정보를 제공하고 있었다.",
    highlightWord: "tipping off",
    insertImage: "resources/2.jpg",
    insertImageAlt: "투구 동작으로 다음 구종을 노출한 사사키",
    questionSpeech: [
      "tip off",
      "He was unknowingly tipping off the hitters about what pitch was coming."
    ],
    answerSpeech: [
      "tip off means to secretly give someone information or unintentionally reveal something."
    ],
    countdownStyle: "ring",
    countdownTick: "resources/mixkit-tick-tock-clock-timer-1045.wav",
    hold: 3200
  },
  // {
  //   type: "review",
  //   kicker: "오늘의 뉴스 어휘 복습",
  //   title: "핵심 단어 3개",
  //   words: [
  //     { en: "coy", ko: "말을 아끼는" },
  //     { en: "tip off", ko: "몰래 알려주다" },
  //     { en: "conceal", ko: "감추다" }
  //   ],
  //   hold: 4800
  // }
];

const TRANSITION_MS = 280;
const BACKEND_PORT = 3000;

const slideHeaderEl = document.getElementById("slide-header");
const questionPromptEl = document.getElementById("question-prompt");
const stageEl = document.getElementById("stage");
const insertImageWrapEl = document.getElementById("insert-image-wrap");
const insertImageEl = document.getElementById("insert-image");
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
  SLIDES.flatMap((slide) => [
    ...(slide.questionSpeech || []),
    ...(slide.answerSpeech || []),
    ...(slide.speech || [])
  ]).forEach((text) => {
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

function buildQuestionHtml(slide) {
  const meaning = escapeHtml(slide.meaning || "");
  const phraseKo = escapeHtml(slide.phraseKo || "");
  return `
    <h2 class="word-question" data-word="${escapeHtml(slide.word || slide.wordQuestion)}">${escapeHtml(slide.wordQuestion || slide.word)}</h2>
    <p class="answer-meaning is-hidden">${meaning}</p>
    <div class="accent-divider" aria-hidden="true"></div>
    <p class="phrase-en">${highlightPhrase(slide.phraseEn, slide.highlightWord)}</p>
    <p class="phrase-ko is-hidden">${phraseKo}</p>
  `;
}

function buildAnswerHtml(slide) {
  return `
    <h2 class="answer-word">${escapeHtml(slide.word)}</h2>
    <p class="answer-meaning">${escapeHtml(slide.meaning)}</p>
    <div class="accent-divider" aria-hidden="true"></div>
    <p class="answer-definition">${escapeHtml(slide.definitionEn || "")}</p>
    <p class="phrase-en">${highlightPhrase(slide.phraseEn, slide.highlightWord)}</p>
    <p class="phrase-ko">${escapeHtml(slide.phraseKo || "")}</p>
  `;
}

function typingDelayForChar(ch, index, text) {
  if (ch === "\n") return 220 + Math.floor(Math.random() * 80);
  if (/[.,!?;:…]/.test(ch)) return 160 + Math.floor(Math.random() * 120);
  if (ch === " " || ch === "\u00a0") return 70 + Math.floor(Math.random() * 50);
  if (/[,\u3001]/.test(ch)) return 120 + Math.floor(Math.random() * 80);
  // 사람 타이핑: 가끔 잠깐 멈칫
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

function buildReviewHtml(slide) {
  const items = (slide.words || [])
    .map(
      (word) => `
      <li>
        <span class="review-en">${escapeHtml(word.en)}</span>
        <span class="review-dot">·</span>
        <span class="review-ko">${escapeHtml(word.ko)}</span>
      </li>`
    )
    .join("");

  const noteHtml = slide.note
    ? `<p class="review-note">${escapeHtml(slide.note)}</p>`
    : "";

  return `
    <div class="review-card">
      <p class="review-kicker">${escapeHtml(slide.kicker || "")}</p>
      <h2 class="review-title">${escapeHtml(slide.title || "")}</h2>
      <div class="accent-divider review-divider" aria-hidden="true"></div>
      <ul class="review-list">${items}</ul>
      ${noteHtml}
    </div>
  `;
}

function renderSlideContent(slide) {
  if (slide.type === "word" || slide.type === "question") return buildQuestionHtml(slide);
  if (slide.type === "answer") return buildAnswerHtml(slide);
  return buildReviewHtml(slide);
}

async function showSlide(index, immediate = false) {
  const slide = SLIDES[index];
  if (!slide) return;

  if (!immediate) {
    stageEl.classList.add("is-changing");
    await sleep(TRANSITION_MS);
  }

  const isQuestion = slide.type === "word" || slide.type === "question";
  const isReview = slide.type === "review";
  if (questionPromptEl) {
    questionPromptEl.textContent = slide.prompt || PAGE_META.questionPrompt;
    questionPromptEl.classList.toggle("is-hidden", !isQuestion);
  }
  if (slideHeaderEl) {
    slideHeaderEl.classList.toggle("is-hidden", isReview);
  }
  stageEl.classList.toggle("is-question", isQuestion);
  stageEl.classList.toggle("is-answer", slide.type === "answer");
  stageEl.classList.toggle("is-review", isReview);
  stageEl.classList.remove("is-revealed");
  stageEl.innerHTML = renderSlideContent(slide);

  if (slide.insertImage && !isReview) {
    insertImageEl.src = slide.insertImage;
    insertImageEl.alt = slide.insertImageAlt || "";
    insertImageWrapEl.classList.remove("is-hidden");
  } else {
    insertImageWrapEl.classList.add("is-hidden");
  }

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

async function playSlide(slide, index) {
  await showSlide(index, index === 0);
  const questionSpeech = slide.questionSpeech || slide.speech || [];
  for (const text of questionSpeech) {
    if (text === slide.phraseEn) {
      await playPhraseEnWithGlow(text);
    } else {
      await playSpeech(text);
    }
    await sleep(180);
  }

  if (slide.type === "word" || slide.type === "question") {
    await runCountdown(
      COUNTDOWN_SEC,
      getCountdownStyle(slide, index),
      slide.countdownTick
    );
  }

  if (slide.type === "word") {
    await revealWordAnswer();
    for (const text of slide.answerSpeech || []) {
      await playSpeech(text);
      await sleep(180);
    }
    if (slide.phraseEn) {
      await playPhraseEnWithGlow(slide.phraseEn);
      await sleep(180);
    }
    if (slide.phraseKo) {
      await revealPhraseKo();
    }
  }

  await sleep(slide.hold || 2000);
}

async function runAutoplay() {
  if (isPlaying) return;
  isPlaying = true;
  autoplayBtn.disabled = true;
  pickRandomEnTtsVoice();
  audioCache.clear();
  preloadSpeech();

  try {
    for (let index = 0; index < SLIDES.length; index += 1) {
      await playSlide(SLIDES[index], index);
    }
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
showSlide(0, true);
autoplayBtn.addEventListener("click", runAutoplay);
