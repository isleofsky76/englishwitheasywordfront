/* 영어작문 쇼츠
 * 1) 예문 + 주요 단어 한글만 표시
 * 2) 번호 순서: 예문 밑줄 → 한글 읽기 → 영어 노출 → 영어 읽기
 * 3) 영작을 키보드 속도로 친 뒤 영어 읽기
 */

const PHRASE_COLORS = ["#3ee0c8", "#f0a090", "#f2b48a", "#f0d060", "#8ec8ff", "#d4b4f0"];

/** 영어 음성. 1번이 지금 목소리(기본). 번호만 바꾸면 바뀝니다 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Umbriel",
  2: "en-US-Chirp3-HD-Enceladus",
  3: "en-GB-Wavenet-N",
  4: "en-US-Chirp3-HD-Despina",
  5: "en-US-Chirp3-HD-Gacrux",
  6: "en-US-Chirp3-HD-Algenib",
  7: "en-GB-Chirp-HD-D",
};

/** 한글 음성. 1번이 지금 목소리(기본) */
const KO_TTS_VOICE_IDS = {
  // 1: "ko-KR-Chirp3-HD-Zephyr",
  1: "ko-KR-Neural2-C",
  3: "ko-KR-Chirp3-HD-Achernar",
  4: "ko-KR-Chirp3-HD-Achird",
  5: "ko-KR-Chirp3-HD-Vindemiatrix",
  6: "ko-KR-Chirp3-HD-Zubenelgenubi",
  7: "ko-KR-Chirp3-HD-Charon",
  8: "ko-KR-Chirp3-HD-Gacrux",
  9: "ko-KR",
};

/** 영어·한글 목소리 선택. 1이 기본 */
const TTS_CONFIG = {
  enVoice: 1,
  koVoice: 1,
};

function voiceByNumber(map, raw) {
  const n = Number(raw);
  if (Number.isFinite(n) && map[n]) return map[n];
  return map[1];
}

function enVoice() {
  return voiceByNumber(EN_TTS_VOICE_IDS, TTS_CONFIG.enVoice);
}

function koVoice() {
  return voiceByNumber(KO_TTS_VOICE_IDS, TTS_CONFIG.koVoice);
}

/** 글자 크기(px) — 여기 숫자만 바꾸면 화면에 반영됩니다 */
const FONT_SIZE = {
  headBadge: 38,
  date: 44,
  title: 70,
  source: 44,
  badge: 28,
  example: 48,
  phraseKo: 48,
  phraseEn: 50,
  fullEn: 48,
  progress: 38,
};

/** 화면 위 제목·출처는 한 번만. 문장이 바뀌어도 유지
 *  [강조]=노랑, (강조)=흰색, 그 밖=라임. 줄은 title 배열 한 칸
 */
const PAGE = {
  badge: "영어작문",
  date: "Nov. 07, 2026",
  title: [
    "[공화당은 패배의 원인을 이스라엘] <br>(탓으로 돌린다) #핵심어휘",
  ],
  source: "출처 : The Economist",
  sourceMark: "",
};

/** 영작 조립 순서(enOrder)는 phrases 인덱스. 없으면 번호 순서 */
const SENTENCES = [
 
  {
    hint: ["relationship", "fundamentally", "change"],
    phrases: [
      { ko: "그 관계는", en: "The relationship" },
      { ko: "근본적으로", en: "fundamentally" },
      { ko: "변했다.", en: "has changed" },
    ],
    enOrder: [0, 1, 2],
  },
  {
    hint: ["alliance", "become", "brittle"],
    phrases: [
      { ko: "동맹은", en: "The alliance" },
      { ko: "더 취약해", en: "more brittle" },
      { ko: "지고 있다.", en: "is becoming" },
    ],
    enOrder: [0, 2, 1],
  },
  {
    hint: ["American", "aid", "blow", "hole", "finances"],
    phrases: [
      { ko: "미국 원조의 종료는", en: "An end to American aid" },
      { ko: "향후 2년 안에", en: "in the next two years." },
      { ko: "이스라엘 재정에", en: "in Israel’s finances" },
      { ko: "70억 달러의 구멍을", en: "a $7bn hole" },
      { ko: "낼 것이다.", en: "would blow" },
    ],
    enOrder: [0, 4, 3, 2, 1],
  },
 
];

/** 문장 재생이 끝난 뒤 1문제. en=질문, choices=4지선다, answer=정답 */
const QUIZ = [
  {
    en: 'What is the term for "easily damaged or destroyed ; becoming fragile"?',
    answer: "brittle",
    answerKo: "취약한, 부서지기 쉬운",
    choices: ["brittle", "durable", "flexible", "stable"],
  },
];

const QUIZ_COUNTDOWN_SEC = 5;
const QUIZ_ANSWER_HOLD_MS = 900;
const QUIZ_CHOICE_KEYS = ["A", "B", "C", "D"];

const TYPE_MS = 62;

const $ = (id) => document.getElementById(id);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function colorAt(i) {
  return PHRASE_COLORS[i % PHRASE_COLORS.length];
}

function fitStage() {
  const stage = $("stage");
  if (!stage) return;
  const scale = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
  stage.style.transform = "scale(" + scale + ")";
}

const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

const ttsCache = new Map();

function ttsUrl(text, voice) {
  let raw = String(text || "").trim();
  if (voice === koVoice()) raw = raw.replace(/[~～〜]/g, "");
  if (!raw) return "";
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(voice)}`;
}

function waitForAudio(audio) {
  return new Promise((resolve, reject) => {
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }
    const ok = () => { cleanup(); resolve(); };
    const bad = () => { cleanup(); reject(new Error("audio")); };
    const cleanup = () => {
      audio.removeEventListener("canplay", ok);
      audio.removeEventListener("error", bad);
    };
    audio.addEventListener("canplay", ok, { once: true });
    audio.addEventListener("error", bad, { once: true });
  });
}

async function loadTTS(text, voice) {
  const url = ttsUrl(text, voice);
  if (!url) return null;
  if (ttsCache.has(url)) return ttsCache.get(url);
  const job = (async () => {
    const res = await fetch(url);
    if (!res.ok) throw new Error("TTS " + res.status);
    const blob = await res.blob();
    const audio = new Audio(URL.createObjectURL(blob));
    audio.preload = "auto";
    await waitForAudio(audio);
    return audio;
  })().catch((err) => {
    ttsCache.delete(url);
    throw err;
  });
  ttsCache.set(url, job);
  return job;
}

async function playTTS(text, voice) {
  const raw = String(text || "").trim();
  if (!raw) return;
  try {
    const audio = await loadTTS(raw, voice);
    if (!audio) return;
    if (window.__shortsCurrentAudio) {
      try { window.__shortsCurrentAudio.pause(); } catch (_) {}
    }
    window.__shortsCurrentAudio = audio;
    audio.currentTime = 0;
    await audio.play();
    await new Promise((resolve) => {
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
    });
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  } catch (err) {
    console.warn("[sentence] TTS", err);
  }
}

function enPieces(sentence) {
  const phrases = sentence.phrases || [];
  const order = Array.isArray(sentence.enOrder) && sentence.enOrder.length
    ? sentence.enOrder
    : phrases.map((_, i) => i);
  return order
    .map((idx) => {
      const p = phrases[idx];
      if (!p) return null;
      return { index: idx, text: String(p.en || "").trim(), color: colorAt(idx) };
    })
    .filter((p) => p && p.text);
}

function fullEnText(sentence) {
  const parts = enPieces(sentence).map((p) => p.text);
  if (!parts.length) return "";
  let text = parts.join(" ");
  if (!/[.!?]$/.test(text)) text += ".";
  return text;
}

function applyFontSize() {
  const stage = $("stage");
  if (!stage) return;
  Object.keys(FONT_SIZE).forEach((key) => {
    const n = Number(FONT_SIZE[key]);
    if (!Number.isFinite(n)) return;
    stage.style.setProperty("--fs-" + key, n + "px");
  });
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

/** [강조] → 노랑, (강조) → 흰색. 괄호는 화면에서 제거 */
function formatTitleMarks(text) {
  const raw = String(text || "");
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const openSq = raw.indexOf("[", i);
    const openParen = raw.indexOf("(", i);
    let open = -1;
    let closeCh = "";
    let cls = "";
    if (openSq >= 0 && (openParen < 0 || openSq <= openParen)) {
      open = openSq;
      closeCh = "]";
      cls = "title-hl";
    } else if (openParen >= 0) {
      open = openParen;
      closeCh = ")";
      cls = "title-plain";
    }
    if (open < 0) {
      out += escapeHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf(closeCh, open + 1);
    if (close < 0) {
      out += escapeHtml(raw.slice(i));
      break;
    }
    out += escapeHtml(raw.slice(i, open));
    out += `<span class="${cls}">${escapeHtml(raw.slice(open + 1, close))}</span>`;
    i = close + 1;
  }
  return out;
}

function titleLinesFrom(value, baseSize) {
  const items = Array.isArray(value) ? value : [value];
  const lines = [];
  items.forEach((line) => {
    let text = "";
    let size = baseSize;
    if (typeof line === "string") {
      text = line;
    } else if (line) {
      text = line.text || line.hl || "";
      const n = Number(line.size);
      if (Number.isFinite(n) && n > 0) size = n;
    }
    String(text).split(/<br\s*\/?>/i).forEach((part) => {
      const piece = part.trim();
      if (piece) lines.push({ text: piece, size });
    });
  });
  return lines;
}

function renderPageHeader() {
  const badge = $("badge");
  if (badge) badge.textContent = PAGE.badge || "영어작문";
  const date = $("dateLabel");
  if (date) date.textContent = PAGE.date || "";

  const titleEl = $("title");
  const baseSize = Number(FONT_SIZE.title) || 70;
  titleEl.innerHTML = titleLinesFrom(PAGE.title, baseSize)
    .map((line) => (
      `<span class="title-line" style="font-size:${line.size}px">${formatTitleMarks(line.text)}</span>`
    ))
    .join("");

  const source = $("sourceLabel");
  if (source) source.textContent = PAGE.source || "";
  const mark = $("sourceMark");
  if (mark) {
    const label = String(PAGE.sourceMark || "").trim();
    mark.textContent = label;
    mark.hidden = !label;
  }
}

function renderSentence(sentence, index) {
  $("progress").textContent = (index + 1) + " / " + SENTENCES.length;

  const example = $("example");
  example.textContent = "";
  (sentence.phrases || []).forEach((p, i) => {
    if (i > 0 && !p.tight) example.appendChild(document.createTextNode(" "));
    const span = document.createElement("span");
    span.className = "ex-part";
    span.dataset.index = String(i);
    span.textContent = p.ko || "";
    example.appendChild(span);
  });

  const words = (Array.isArray(sentence.hint) ? sentence.hint : [])
    .map((w) => String(w || "").trim())
    .filter(Boolean)
    .slice(0, 5);
  if (words.length) {
    const hint = document.createElement("span");
    hint.className = "example-hint";
    hint.appendChild(document.createTextNode(" "));
    const open = document.createElement("span");
    open.className = "example-hint-paren";
    open.textContent = "(";
    hint.appendChild(open);
    hint.appendChild(document.createTextNode("hint : " + words.join(" / ")));
    const close = document.createElement("span");
    close.className = "example-hint-paren";
    close.textContent = ")";
    hint.appendChild(close);
    example.appendChild(hint);
  }

  const list = $("phrases");
  list.textContent = "";
  (sentence.phrases || []).forEach((p, i) => {
    const li = document.createElement("li");
    li.className = "phrase";
    li.dataset.index = String(i);
    const ko = document.createElement("p");
    ko.className = "phrase-ko";
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = (i + 1) + ".";
    num.style.color = colorAt(i);
    ko.appendChild(num);
    ko.appendChild(document.createTextNode(p.ko || ""));
    li.appendChild(ko);
    if (String(p.en || "").trim()) {
      const en = document.createElement("p");
      en.className = "phrase-en";
      en.style.color = colorAt(i);
      en.textContent = p.en;
      li.appendChild(en);
    }
    list.appendChild(li);
  });

  const full = $("full-en");
  full.classList.remove("is-done");
  full.textContent = "";
}

function setUnderline(index) {
  document.querySelectorAll(".ex-part").forEach((el) => {
    el.classList.toggle("is-on", Number(el.dataset.index) === index);
  });
}

function clearUnderline() {
  document.querySelectorAll(".ex-part.is-on").forEach((el) => el.classList.remove("is-on"));
}

function revealPhraseEn(index) {
  const li = document.querySelector('.phrase[data-index="' + index + '"]');
  if (!li) return;
  const en = li.querySelector(".phrase-en");
  if (en) en.classList.add("is-on");
}

async function typeFullEn(sentence) {
  const box = $("full-en");
  box.classList.remove("is-done");
  box.textContent = "";
  const caret = document.createElement("span");
  caret.className = "caret";
  caret.setAttribute("aria-hidden", "true");
  box.appendChild(caret);

  const pieces = enPieces(sentence);
  for (let i = 0; i < pieces.length; i += 1) {
    const piece = pieces[i];
    const span = document.createElement("span");
    span.className = "chunk";
    span.style.color = piece.color;
    box.insertBefore(span, caret);
    const chars = Array.from(piece.text);
    for (let c = 0; c < chars.length; c += 1) {
      span.textContent += chars[c];
      const gap = chars[c] === " " ? 28 : TYPE_MS + ((c % 4) * 6);
      await sleep(gap);
    }
    const tail = i === pieces.length - 1 ? "." : " ";
    span.textContent += tail;
    await sleep(tail === " " ? 36 : 80);
  }
  box.classList.add("is-done");
}

function preloadSentence(sentence) {
  (sentence.phrases || []).forEach((p) => {
    if (p.ko) loadTTS(p.ko, koVoice()).catch(() => {});
    if (p.en) loadTTS(p.en, enVoice()).catch(() => {});
  });
  const full = fullEnText(sentence);
  if (full) loadTTS(full, enVoice()).catch(() => {});
}

async function playSentence(sentence, index) {
  renderSentence(sentence, index);
  preloadSentence(sentence);
  await sleep(700);

  const phrases = sentence.phrases || [];
  for (let i = 0; i < phrases.length; i += 1) {
    setUnderline(i);
    await playTTS(phrases[i].ko, koVoice());
    if (String(phrases[i].en || "").trim()) {
      revealPhraseEn(i);
      await playTTS(phrases[i].en, enVoice());
    }
    await sleep(550);
  }
  clearUnderline();
  await sleep(280);
  await typeFullEn(sentence);
  await sleep(200);
  await playTTS(fullEnText(sentence), enVoice());
  await sleep(900);
}

async function runAll() {
  const btn = $("autoplay");
  if (btn) btn.remove();
  for (let i = 0; i < SENTENCES.length; i += 1) {
    await playSentence(SENTENCES[i], i);
  }
  await startReviewQuiz();
}

function quizList() {
  return QUIZ.filter((q) => q && q.en && q.answer && Array.isArray(q.choices) && q.choices.length >= 2);
}

function normalizeQuizChoices(q) {
  const ans = String(q.answer || "").trim();
  const uniq = [];
  (q.choices || []).forEach((c) => {
    const text = String(c || "").trim();
    if (!text) return;
    if (!uniq.some((x) => x.toLowerCase() === text.toLowerCase())) uniq.push(text);
  });
  if (ans && !uniq.some((x) => x.toLowerCase() === ans.toLowerCase())) uniq.unshift(ans);
  return uniq.slice(0, 4);
}

function quizPhraseHtml(en) {
  const words = String(en || "").trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "";
  const chunks = [];
  for (let i = 0; i < words.length; i += 4) chunks.push(words.slice(i, i + 4).join(" "));
  return chunks.map((chunk) => `<span class="ex-phrase">${escapeHtml(chunk)}</span>`).join(" ");
}

function quizChoicesHtml(choices, revealAnswer) {
  const ans = String(revealAnswer || "").trim().toLowerCase();
  return choices.slice(0, 4).map((choice, i) => {
    const text = String(choice || "").trim();
    const isCorrect = ans && text.toLowerCase() === ans;
    const cls = ["rv-choice", isCorrect ? "is-correct" : "", ans && !isCorrect ? "is-dim" : ""]
      .filter(Boolean)
      .join(" ");
    const key = QUIZ_CHOICE_KEYS[i] || String(i + 1);
    return (
      `<div class="${cls}" role="listitem">` +
      `<span class="rv-choice-key">${key}</span>` +
      `<span class="rv-choice-text">${escapeHtml(text)}</span>` +
      `</div>`
    );
  }).join("");
}

function fillReviewQuizCard(q, index, total, reveal) {
  const ans = String(q.answer || "").trim();
  const titleEl = $("rv-title");
  const enEl = $("rv-en");
  const choicesEl = $("rv-choices");
  const koEl = $("rv-ko");
  if (titleEl) titleEl.textContent = "Review " + (index + 1) + "/" + total;
  if (enEl) enEl.innerHTML = quizPhraseHtml(q.en);
  if (choicesEl) choicesEl.innerHTML = quizChoicesHtml(normalizeQuizChoices(q), reveal ? ans : "");
  if (koEl) {
    const meaning = String(q.answerKo || "").trim();
    koEl.innerHTML = meaning
      ? `<span class="rv-ko-hl">${escapeHtml(ans)}</span> — ${escapeHtml(meaning)}`
      : `<span class="rv-ko-hl">${escapeHtml(ans)}</span>`;
    koEl.classList.toggle("is-revealed", Boolean(reveal));
  }
}

function countdownEls() {
  return {
    wrap: $("countdown-wrap"),
    num: $("countdown-num"),
    ring: $("countdown-ring-progress"),
  };
}

function setCountdownRing(sec, total) {
  const { ring } = countdownEls();
  if (!ring) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  ring.style.strokeDashoffset = String(Math.min(100, Math.max(0, spent)));
}

async function runCountdown(seconds) {
  const { wrap, num, ring } = countdownEls();
  if (!wrap || !num) return;
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  if (ring) ring.style.transition = "";
  wrap.hidden = false;
  setCountdownRing(total, total);
  try {
    for (let sec = total; sec >= 0; sec -= 1) {
      num.textContent = String(sec);
      setCountdownRing(sec, total);
      num.classList.remove("is-anim");
      void num.offsetWidth;
      num.classList.add("is-anim");
      await sleep(1000);
    }
  } finally {
    num.textContent = "";
    num.classList.remove("is-anim");
    if (ring) {
      ring.style.transition = "none";
      ring.style.strokeDashoffset = "100";
    }
    wrap.hidden = true;
  }
}

async function speakQuizQuestion(text) {
  const enEl = $("rv-en");
  const phraseEls = enEl ? [...enEl.querySelectorAll(".ex-phrase")] : [];
  const raw = String(text || "").trim();
  if (!raw) return;
  enEl?.classList.add("is-reading-example");
  try {
    const audio = await loadTTS(raw, enVoice());
    if (!audio) return;
    if (window.__shortsCurrentAudio) {
      try { window.__shortsCurrentAudio.pause(); } catch (_) {}
    }
    window.__shortsCurrentAudio = audio;
    audio.currentTime = 0;
    const mark = () => {
      if (!phraseEls.length || !audio.duration) return;
      const i = Math.min(
        phraseEls.length - 1,
        Math.floor((audio.currentTime / audio.duration) * phraseEls.length)
      );
      phraseEls.forEach((el, n) => el.classList.toggle("is-reading", n === i));
    };
    audio.ontimeupdate = mark;
    await audio.play();
    await new Promise((resolve) => {
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
    });
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  } catch (err) {
    console.warn("[sentence] quiz TTS", err);
  } finally {
    enEl?.classList.remove("is-reading-example");
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
  }
}

async function startReviewQuiz() {
  const quizzes = quizList();
  const root = $("review-root");
  if (!quizzes.length || !root) return;

  quizzes.forEach((q) => {
    const question = String(q.en || "").trim();
    const answer = String(q.answer || "").trim();
    if (question) loadTTS(question, enVoice()).catch(() => {});
    if (answer) loadTTS(answer, enVoice()).catch(() => {});
  });

  await sleep(200);
  fillReviewQuizCard(quizzes[0], 0, quizzes.length, false);
  root.hidden = false;
  root.classList.add("is-entering");
  await sleep(900);
  root.classList.remove("is-entering");

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    if (i > 0) fillReviewQuizCard(q, i, quizzes.length, false);
    await speakQuizQuestion(q.en);
    await sleep(280);
    await runCountdown(QUIZ_COUNTDOWN_SEC);
    await sleep(1000);
    fillReviewQuizCard(q, i, quizzes.length, true);
    if (q.answer) await playTTS(q.answer, enVoice());
    await sleep(QUIZ_ANSWER_HOLD_MS);
  }
  root.hidden = false;
}

window.addEventListener("resize", fitStage);
fitStage();
applyFontSize();
renderPageHeader();
if (SENTENCES[0]) renderSentence(SENTENCES[0], 0);

const autoplay = $("autoplay");
if (autoplay) {
  autoplay.addEventListener("click", () => {
    runAll().catch((err) => console.warn("[sentence] autoplay", err));
  });
}
