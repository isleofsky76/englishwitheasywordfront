const PAGE_TITLE_HTML = `<span class="title-main">단어장</span>
<span class="title-accent title-sub">폭동과 인종차별<br> 영국이 불타오르는 이유는 무엇일까?</span><br><br>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 3;


const words = [

  { "en": "thuggery", "ko": "폭력 행위, 깡패짓", "pronunciation": "써거리", "pos": "명", "cf": "사우샘프턴 법원이 폭력 사태를 다루기 시작했다(an outbreak of thuggery)" },
  { "en": "assailant", "ko": "공격자, 가해자", "pronunciation": "어세일런트", "pos": "명", "cf": "흑인 공격자가 백인 피해자를 찌르는 장면이 폭동의 계기가 됐다(a black assailant)" },
  { "en": "supine", "ko": "누워 있는, 반듯이 누운", "pronunciation": "수파인", "pos": "형", "cf": "피해자가 누운 상태에서 공격당하는 이미지가 퍼졌다(his supine white victim)" },
  
  { "en": "erroneously", "ko": "잘못되게, 틀리게", "pronunciation": "이로니어슬리", "pos": "부", "cf": "18세 학생이 잘못 체포되고 수갑이 채워졌다(erroneously arrested and handcuffed)" },
  { "en": "false claims", "ko": "허위 주장", "pronunciation": "폴스 클레임즈", "pos": "명", "cf": "피해자는 허위 인종차별 주장 때문에 체포됐다(false racism claims)" },
  { "en": "bay", "ko": "(특히 사냥 중에) 으르렁거리다", "pronunciation": "베이", "pos": "명", "cf": "" },
  
  { "en": "baying mob", "ko": "고함치는 폭도들", "pronunciation": "베잉 맙", "pos": "명", "cf": "경찰들이 고함치는 폭도들에게 둘러싸였다(a baying mob)" },
  { "en": "populist narratives", "ko": "포퓰리즘식 서사, 대중영합적 주장", "pronunciation": "파퓰리스트 내러티브즈", "pos": "명", "cf": "사실은 포퓰리즘식 서사를 뒷받침하지 않는다고 지적됐다(populist narratives)" },
  { "en": "keenly contested", "ko": "치열하게 논쟁되는", "pronunciation": "킨리 컨테스티드", "pos": "형", "cf": "최근 폭동의 의미를 둘러싼 분석은 치열하게 논쟁되고 있다(keenly contested)" },
  
  { "en": "white victimhood", "ko": "백인 피해자 의식", "pronunciation": "화이트 빅팀후드", "pos": "명", "cf": "백인 피해자 의식이 강력한 동원 불만으로 작용한다고 분석됐다(white victimhood)" },
  { "en": "toxic rhetoric", "ko": "유해한 선동적 수사", "pronunciation": "톡식 레터릭", "pos": "명", "cf": "반이민 수사가 정상화됐다고 지적됐다(toxic anti-immigrant rhetoric)" },
  { "en": "hate attacks", "ko": "증오 공격", "pronunciation": "헤이트 어택스", "pos": "명", "cf": "브렉시트 이후 인종·민족 관련 증오 공격이 급증했다고 설명했다(hate attacks around race and ethnicity)" },
  
  
 ];


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 900;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_IMAGE = `${WORD_FLASH_IMAGE_DIR}bg.jpg`;
const WORD_FLASH_DISPLAY_MS = 1400;
const WORD_FLASH_FADE_MS = 350;
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};
/** 영어 읽기: 미국 남성 (Google Cloud TTS — en-US-Chirp-HD-D) */
const EN_TTS_LANG = "en-US";
const EN_TTS_VOICE_ID = "en-US-Chirp-HD-D";

function createItemElement(item, order, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("second-pass-mode");
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const wordLine = `<span class="en-main" data-full-en="${item.en}">${item.en}</span> : <span class="ko-text hidden-ko" data-full-ko="${item.ko}"></span>`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const escapedTargetWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cfTextWithUnderline = (cfText && targetWord)
    ? cfText.replace(new RegExp(`\\b${escapedTargetWord}\\b`, "gi"), (match) => `<u>${match}</u>`)
    : cfText;
  const cfHtml = cfText ? `<span class="cf-note hidden-cf">cf. ${cfTextWithUnderline}</span>` : "";
  const pronHiddenClass = mode === "second-pass" ? " hidden-pron-text" : "";
  const pronLine = `<div class="pron-line"><span class="pron-text${pronHiddenClass}" data-full-pron="|${item.pronunciation}|">|${item.pronunciation}|</span>${cfHtml}</div>`;
  el.innerHTML = `
    <div class="word-row">
      <span class="order-num">${order}.</span>
      <div class="word-content">
        <div class="word-line">${wordLine}</div>
        ${pronLine}
      </div>
    </div>
  `;
  return el;
}

function renderStaticList() {
  tickerEl.innerHTML = "";
  words.slice(0, VISIBLE_COUNT).forEach((item, idx) => {
    const el = createItemElement(item, idx + 1, idx);
    tickerEl.appendChild(el);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordFlashImageSrc(wordIndex) {
  return `${WORD_FLASH_IMAGE_DIR}${wordIndex + 1}.jpg`;
}

function applyPageBackground() {
  const bgEl = document.getElementById("page-bg");
  if (!bgEl) return;
  const bgSrc = new URL(PAGE_BG_IMAGE, document.baseURI).href;
  bgEl.style.backgroundImage = `url("${bgSrc}")`;
}

function hideWordFlashImage() {
  if (!wordFlashImgEl) return;
  wordFlashImgEl.classList.remove("is-visible");
}

async function canLoadImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

async function showWordFlashImage(wordIndex) {
  if (!wordFlashImgEl) return;
  const src = getWordFlashImageSrc(wordIndex);
  hideWordFlashImage();
  if (!(await canLoadImage(src))) return;

  wordFlashImgEl.src = src;
  wordFlashImgEl.classList.add("is-visible");
  await sleep(WORD_FLASH_DISPLAY_MS);
  hideWordFlashImage();
  await sleep(WORD_FLASH_FADE_MS);
}

function resolveKoTtsVoiceId(langKey) {
  if (typeof langKey === "string" && /^ko-KR-Chirp3-HD-/i.test(langKey)) return langKey;
  const isKo = langKey === "ko" || langKey === "ko-KR" || (typeof langKey === "string" && /^ko-/i.test(langKey));
  if (!isKo) return langKey;
  return KO_TTS_VOICE_IDS[Number(KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[1];
}

function getTTSUrl(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  const langParam = isEn ? EN_TTS_VOICE_ID : resolveKoTtsVoiceId(normalizedLang);
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

function getKoSpeakText(rawKo) {
  const text = String(rawKo || "").trim();
  if (!text) return "";
  // "단어/단어", "단어, 단어" 형태는 앞 항목만 읽기
  const beforeSlash = text.split("/")[0].trim();
  return beforeSlash.split(",")[0].trim();
}

function getEnSpeakText(word) {
  if (!word) return "";
  return String(word.enTts || word.en || "").trim();
}

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;

function waitForAudioReady(audio) {
  return new Promise((resolve, reject) => {
    if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      resolve();
      return;
    }
    const onReady = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error("Audio load error"));
    };
    const cleanup = () => {
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("error", onError);
    };
    audio.addEventListener("canplay", onReady, { once: true });
    audio.addEventListener("error", onError, { once: true });
  });
}

function isNonRetryableTTSError(err) {
  const msg = String(err?.message || err || "");
  return /quota exhausted|RESOURCE_EXHAUSTED/i.test(msg);
}

async function fetchTTSAudio(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    const quotaHit = response.status === 429 || /RESOURCE_EXHAUSTED|quota/i.test(detail);
    throw new Error(quotaHit ? "TTS quota exhausted" : `TTS HTTP ${response.status}`);
  }
  const blob = await response.blob();
  const audio = new Audio(URL.createObjectURL(blob));
  audio.preload = "auto";
  await waitForAudioReady(audio);
  return audio;
}

async function loadBackendTTSAudio(text, languageKey) {
  const url = getTTSUrl(text, languageKey);
  if (!url) return null;

  if (ttsAudioCache.has(url)) {
    return ttsAudioCache.get(url);
  }

  const loadPromise = (async () => {
    let lastErr;
    for (let attempt = 0; attempt < TTS_MAX_RETRIES; attempt += 1) {
      try {
        return await fetchTTSAudio(url);
      } catch (err) {
        lastErr = err;
        if (isNonRetryableTTSError(err) || attempt >= TTS_MAX_RETRIES - 1) {
          throw err;
        }
        await sleep(TTS_RETRY_BASE_MS * (attempt + 1));
      }
    }
    throw lastErr;
  })().catch((err) => {
    ttsAudioCache.delete(url);
    throw err;
  });

  ttsAudioCache.set(url, loadPromise);
  return loadPromise;
}

function preloadEnTTS(word) {
  if (!word) return;
  const enText = getEnSpeakText(word);
  if (enText) loadBackendTTSAudio(enText, EN_TTS_LANG).catch(() => {});
}

function preloadKoTTS(word, pass = "first") {
  if (!word) return;
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  const koLang = pass === "second" ? "ko-KR-Chirp3-HD-Achernar" : "ko-KR";
  loadBackendTTSAudio(koText, koLang).catch(() => {});
}

function preloadWordTTS(word, pass = "first") {
  preloadEnTTS(word);
  preloadKoTTS(word, pass);
}

function preloadWordsAhead(startIndex, count, pass = "first") {
  for (let i = startIndex; i < startIndex + count && i < words.length; i += 1) {
    preloadWordTTS(words[i], pass);
  }
}

async function playAudioElement(audio) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  audio.currentTime = 0;

  try {
    await audio.play();
  } catch (_) {
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

function renderPage(startIndex, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  words.slice(startIndex, startIndex + VISIBLE_COUNT).forEach((item, idx) => {
    const globalIndex = startIndex + idx;
    const el = createItemElement(item, globalIndex + 1, globalIndex, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
  });
}

async function shiftPageDown(nextStartIndex, mode = "normal") {
  const oldItems = Array.from(tickerEl.querySelectorAll(".ticker-item"));
  oldItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  renderPage(nextStartIndex, true, mode);
}

async function playBackendTTS(text, languageKey) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio);
  } catch (_) {}
}

function hideAllKoText() {
  tickerEl.querySelectorAll(".ko-text").forEach((el) => {
    el.classList.add("hidden-ko");
    el.textContent = "";
  });
}

function hideAllCfText() {
  tickerEl.querySelectorAll(".cf-note").forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

async function typeKoLikeHuman(koTextEl, text) {
  if (!koTextEl) return;
  koTextEl.classList.remove("hidden-ko");
  koTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    koTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }
}

function hideAllEnText() {
  tickerEl.querySelectorAll(".en-main").forEach((el) => {
    el.classList.add("hidden-en-main");
    el.textContent = el.dataset.fullEn || "";
  });
}

function hideAllPronText() {
  tickerEl.querySelectorAll(".pron-text").forEach((el) => {
    el.classList.add("hidden-pron-text");
    el.textContent = el.dataset.fullPron || "";
  });
}

function showKoAsDefault() {
  tickerEl.querySelectorAll(".ticker-item").forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const cfNoteEl = item.querySelector(".cf-note");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.remove("hidden-ko");
    koTextEl.textContent = ko;
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
  });
}

async function typeEnLikeHuman(enTextEl, text) {
  if (!enTextEl) return;
  enTextEl.classList.remove("hidden-en-main");
  enTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    enTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }
}

async function typePronLikeHuman(pronTextEl, text) {
  if (!pronTextEl) return;
  pronTextEl.classList.remove("hidden-pron-text");
  pronTextEl.textContent = "";

  for (let i = 0; i < text.length; i += 1) {
    pronTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "(", "|"].includes(ch);
    const delay = isPauseChar
      ? 150 + Math.floor(Math.random() * 110)
      : 72 + Math.floor(Math.random() * 62);
    await sleep(delay);
  }
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";

  hideAllKoText();
  hideAllCfText();
  preloadWordsAhead(0, words.length, "first");
  await sleep(4000);

  let currentPageStart = 0;
  for (let i = 0; i < words.length; i += 1) {
    preloadWordsAhead(i + 1, VISIBLE_COUNT, "first");
    if (i !== 0 && i % VISIBLE_COUNT === 0) {
      currentPageStart = i;
      await shiftPageDown(currentPageStart);
    }
    const item = tickerEl.querySelector(`.ticker-item[data-index="${i}"]`);
    if (!item) continue;

    const en = item.dataset.en || "";
    const ko = item.dataset.ko || "";
    const koTextEl = item.querySelector(".ko-text");

    preloadKoTTS(words[i], "first");
    await playBackendTTS(getEnSpeakText(words[i]), EN_TTS_LANG);
    if (koTextEl) {
      koTextEl.textContent = ko;
      koTextEl.classList.remove("hidden-ko");
    }
    const cfNoteEl = item.querySelector(".cf-note");
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
    await sleep(120);
    await playBackendTTS(getKoSpeakText(ko), "ko-KR");
    await showWordFlashImage(i);
    await sleep(300);
  }

  hideWordFlashImage();

  // 2차: 첫번째와 동일 레이아웃, 순서만 반대로 (KO -> EN)
  renderPage(0, false, "second-pass");
  showKoAsDefault();
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
  preloadWordsAhead(0, words.length, "second");
  for (let i = 0; i < words.length; i += 1) {
    preloadWordsAhead(i + 1, VISIBLE_COUNT, "second");
    if (i !== 0 && i % VISIBLE_COUNT === 0) {
      await shiftPageDown(i, "second-pass");
      showKoAsDefault();
      hideAllEnText();
      hideAllPronText();
      hideAllCfText();
    }
    const item = tickerEl.querySelector(`.ticker-item[data-index="${i}"]`);
    if (!item) continue;
    const ko = item.dataset.ko || "";
    const en = item.dataset.en || "";
    const enTextEl = item.querySelector(".en-main");
    const pronTextEl = item.querySelector(".pron-text");

    preloadEnTTS(words[i]);
    await playBackendTTS(getKoSpeakText(ko), "ko-KR-Chirp3-HD-Achernar");
    if (enTextEl) {
      enTextEl.textContent = en;
      enTextEl.classList.remove("hidden-en-main");
    }
    if (pronTextEl) {
      pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
      pronTextEl.classList.remove("hidden-pron-text");
    }
    const cfNoteEl = item.querySelector(".cf-note");
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
    await sleep(120);
    await playBackendTTS(getEnSpeakText(words[i]), EN_TTS_LANG);
    await sleep(300);
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
preloadWordsAhead(0, Math.min(VISIBLE_COUNT * 2, words.length), "first");
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
