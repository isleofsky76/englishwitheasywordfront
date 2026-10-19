const PAGE_TITLE_HTML = `<span class="title-main">단어장</span>
<span class="title-accent title-sub">트럼프 내각의 모든 구성원이 <br>사우어크라우트를 먹고 있다</span><br><br>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 3;


const json1 = 
[

{ "en": "heaping portions", "ko": "수북한 양", "pronunciation": "히핑 포션즈", "pos": "명", "cf": "그 식단에는 사우어크라우트를 수북하게 먹는 것이 포함된다(it involves heaping portions of sauerkraut).", "image": "" },
{ "en": "sauerkraut", "ko": "독일식 김치", "pronunciation": "사워크라우트", "pos": "명", "cf": "그 식단에는 사우어크라우트를 수북하게 먹는 것이 포함된다(it involves heaping portions of sauerkraut).", "image": "" },
{ "en": "sulfurous odors", "ko": "유황 냄새", "pronunciation": "설퍼러스 오더즈", "pos": "명", "cf": "그들은 건강상 이점이 약간의 유황 냄새보다 크다고 판단한 듯하다(the slightly sulfurous odors).", "image": "" },

{ "en": "fermented foods", "ko": "발효식품", "pronunciation": "퍼멘티드 푸즈", "pos": "명", "cf": "O’Mara는 사우어크라우트와 김치 같은 발효식품을 먹으라고 조언한다(eat fermented foods such as sauerkraut and kimchi).", "image": "" },
{ "en": "grass-fed steak", "ko": "목초 사육 소고기 스테이크", "pronunciation": "그래스 페드 스테이크", "pos": "명", "cf": "O’Mara는 발효식품과 함께 목초 사육 스테이크를 먹으라고 조언한다(alongside grass-fed steak).", "image": "" },
{ "en": "visceral fat", "ko": "내장지방", "pronunciation": "비서럴 팻", "pos": "명", "cf": "O’Mara는 그 식단이 내장지방 감소로 이어진다고 말한다(the diet leads to a reduction in visceral fat).", "image": "" },

{ "en": "robust microbiome", "ko": "건강한 장내 미생물군", "pronunciation": "로버스트 마이크로바이옴", "pos": "명", "cf": "O’Mara는 그 식단이 더 건강한 장내 미생물군으로 이어진다고 말한다(a more robust microbiome).", "image": "" },
{ "en": "tangy", "ko": "톡 쏘는", "pronunciation": "탱기", "pos": "형", "cf": "Kennedy는 때때로 사우어크라우트의 톡 쏘고 강한 맛에 거부감을 느낀다(the tangy and pungent taste of sauerkraut).", "image": "" },
{ "en": "pungent", "ko": "강한 냄새가 나는, 자극적인", "pronunciation": "펀전트", "pos": "형", "cf": "Kennedy는 때때로 사우어크라우트의 톡 쏘고 강한 맛에 거부감을 느낀다(the tangy and pungent taste of sauerkraut).", "image": "" },

{ "en": "shed fat", "ko": "지방을 빼다", "pronunciation": "셰드 팻", "pos": "구", "cf": "Kennedy는 그 식단이 지방을 빼는 데 도움이 됐다고 느꼈다(he found the diet helped him shed fat).", "image": "" },
{ "en": "atrial fibrillations", "ko": "심방세동", "pronunciation": "에이트리얼 피브릴레이션즈", "pos": "명", "cf": "Kennedy는 그 식단이 자신이 겪던 심방세동을 없앴다고 믿는다(eliminating the atrial fibrillations he had been experiencing).", "image": "" },
{ "en": "metabolic syndrome", "ko": "대사증후군", "pronunciation": "메터볼릭 신드롬", "pos": "명", "cf": "전신 MRI는 제2형 당뇨병, 심장병, 대사증후군의 위험 요인이 될 수 있는 지방을 찾는다(metabolic syndrome).", "image": "" },

{ "en": "old world cheese", "ko": "전통 방식 치즈", "pronunciation": "올드 월드 치즈", "pos": "명", "cf": "O’Mara는 간식으로 전통 방식 치즈를 추천한다(For snacking, O’Mara recommends “old world cheese”).", "image": "" },
{ "en": "stash", "ko": "비축분, 챙겨 다니는 것", "pronunciation": "스태시", "pos": "명", "cf": "Kennedy는 종종 사우어크라우트를 챙겨 여행한다(Kennedy often travels with a stash of sauerkraut).", "image": "" },
{ "en": "living microbes", "ko": "살아 있는 미생물", "pronunciation": "리빙 마이크로브즈", "pos": "명", "cf": "냉장고 뒤쪽은 영양소와 살아 있는 미생물을 손상시킬 수 있는 빛이 적다고 설명된다(the living microbes).", "image": "" },




]
  
  
  
    ;


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 900;
const WORD_FLASH_IMAGE_DIR = "resources/";
const PAGE_BG_IMAGE = "resources/bg.jpeg";
const WORD_FLASH_FADE_IN_MS = 950;
const WORD_FLASH_DISPLAY_MS = 1800;
const WORD_FLASH_FADE_OUT_MS = 1100;
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
  json1.slice(0, VISIBLE_COUNT).forEach((item, idx) => {
    const el = createItemElement(item, idx + 1, idx);
    tickerEl.appendChild(el);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordFlashImageSrc(wordIndex) {
  const item = json1[wordIndex];
  const file = String(item?.image || "").trim();
  if (!file) return null;
  return `${WORD_FLASH_IMAGE_DIR}${file}`;
}

function applyPageBackground() {
  const bgSrc = new URL(PAGE_BG_IMAGE, document.baseURI).href;
  document.documentElement.style.setProperty("--page-bg-image", `url("${bgSrc}")`);
  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = `url("${bgSrc}")`;
  }
}

function resetWordFlashImage() {
  if (!wordFlashImgEl) return;
  wordFlashImgEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashImgEl.style.clipPath = "";
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
  resetWordFlashImage();
  if (!src || !(await canLoadImage(src))) return;

  wordFlashImgEl.src = src;
  void wordFlashImgEl.offsetWidth;
  wordFlashImgEl.classList.add("is-fading-in");
  await sleep(WORD_FLASH_FADE_IN_MS);
  wordFlashImgEl.classList.remove("is-fading-in");
  wordFlashImgEl.classList.add("is-visible");
  await sleep(WORD_FLASH_DISPLAY_MS);
  wordFlashImgEl.classList.remove("is-visible");
  wordFlashImgEl.classList.add("is-fading-out");
  await sleep(WORD_FLASH_FADE_OUT_MS);
  resetWordFlashImage();
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
  for (let i = startIndex; i < startIndex + count && i < json1.length; i += 1) {
    preloadWordTTS(json1[i], pass);
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
  json1.slice(startIndex, startIndex + VISIBLE_COUNT).forEach((item, idx) => {
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
  preloadWordsAhead(0, json1.length, "first");
  await sleep(4000);

  let currentPageStart = 0;
  for (let i = 0; i < json1.length; i += 1) {
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

    preloadKoTTS(json1[i], "first");
    await playBackendTTS(getEnSpeakText(json1[i]), EN_TTS_LANG);
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

  resetWordFlashImage();

  // 2차: 첫번째와 동일 레이아웃, 순서만 반대로 (KO -> EN) — 이미지 없음
  renderPage(0, false, "second-pass");
  showKoAsDefault();
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
  preloadWordsAhead(0, json1.length, "second");
  for (let i = 0; i < json1.length; i += 1) {
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

    preloadEnTTS(json1[i]);
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
    await playBackendTTS(getEnSpeakText(json1[i]), EN_TTS_LANG);
    await sleep(300);
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

applyPageBackground();
renderStaticList();
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
