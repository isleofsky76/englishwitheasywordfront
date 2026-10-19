const PAGE_TITLE_HTML = `<span class="title-main">단어장</span>
<span class="title-accent title-sub">가정용 로봇이 다가오고 있습니다. 그리고 그 로봇들은 위험할 정도로 귀여울 것입니다.</span><br><br>
<span class="title-note"></span>`;

const VISIBLE_COUNT = 3;


const words = [
  
  { "en": "believed dead", "ko": "사망한 것으로 여겨지는", "pronunciation": "빌리브드 데드", "pos": "구", "cf": "승무원 8명이 사망한 것으로 여겨진다(Eight crew members are believed dead)", "image": "" },
  { "en": "bomber crash", "ko": "폭격기 추락 사고", "pronunciation": "바머 크래시", "pos": "명", "cf": "캘리포니아 공군기지에서 B-52 폭격기 추락 사고가 발생했다(B-52 Bomber Crash at California Air Base)", "image": "" },
  { "en": "shortly after takeoff", "ko": "이륙 직후", "pronunciation": "쇼틀리 애프터 테이크오프", "pos": "구", "cf": "B-52 폭격기는 이륙 직후 추락했다(crashed shortly after takeoff)", "image": "" },
  { "en": "air base", "ko": "공군기지", "pronunciation": "에어 베이스", "pos": "명", "cf": "사고는 에드워즈 공군기지에서 발생했다(at Edwards Air Force Base)", "image": "" },
  { "en": "emergency crews", "ko": "응급 구조대, 긴급 대응팀", "pronunciation": "이머전시 크루즈", "pos": "명", "cf": "긴급 대응팀이 즉시 사고 현장에 출동했다(Emergency crews immediately responded to the crash)", "image": "" },
  { "en": "routine test mission", "ko": "정기 시험 임무", "pronunciation": "루틴 테스트 미션", "pos": "명", "cf": "B-52는 정기 시험 임무 중이었다(carrying eight people on a routine test mission)", "image": "" },
  { "en": "initial indications", "ko": "초기 정황, 초기 징후", "pronunciation": "이니셜 인디케이션스", "pos": "명", "cf": "초기 정황상 생존 가능성이 없는 사고였다고 밝혔다(Initial indications are that the crash was not survivable)", "image": "" },
  { "en": "not survivable", "ko": "생존 가능성이 없는", "pronunciation": "낫 서바이벌블", "pos": "형", "cf": "기지는 사고가 생존 가능성이 없는 것으로 보인다고 밝혔다(the crash was not survivable)", "image": "" },
  { "en": "under investigation", "ko": "조사 중인", "pronunciation": "언더 인베스티게이션", "pos": "구", "cf": "추락 사고는 조사 중이다(The crash is under investigation)", "image": "" },
  { "en": "towering plume", "ko": "높이 치솟는 연기 기둥", "pronunciation": "타워링 플룸", "pos": "명", "cf": "사고 후 기지 상공에 거대한 연기 기둥이 보였다(A towering plume of smoke was seen)", "image": "" },
  { "en": "come into service", "ko": "취역하다, 운용되기 시작하다", "pronunciation": "컴 인투 서비스", "pos": "구", "cf": "B-52는 1952년에 운용되기 시작했다(The B-52, which came into service in 1952)", "image": "" },
  { "en": "staple", "ko": "주력, 핵심 요소", "pronunciation": "스테이플", "pos": "명", "cf": "B-52는 냉전 이후 공군의 주력 항공기였다(has been a staple in the Air Force since the Cold War)", "image": "" },
  { "en": "long-range nuclear strikes", "ko": "장거리 핵공격", "pronunciation": "롱 레인지 뉴클리어 스트라이크스", "pos": "명", "cf": "B-52는 원래 장거리 핵공격용으로 설계됐다(Originally designed for long-range nuclear strikes)", "image": "" },
  { "en": "workhorse", "ko": "주력 장비, 핵심 전력", "pronunciation": "워크호스", "pos": "명", "cf": "B-52는 여러 군사작전에서 핵심 전력으로 사용됐다(the Boeing-made plane has been a workhorse)", "image": "" },
  { "en": "military campaigns", "ko": "군사 작전, 군사 캠페인", "pronunciation": "밀리터리 캠페인스", "pos": "명", "cf": "B-52는 이라크와 아프가니스탄의 장기 군사작전에 사용됐다(during the decadeslong military campaigns in Iraq and Afghanistan)", "image": "" },
  { "en": "test aircraft", "ko": "시험용 항공기", "pronunciation": "테스트 에어크래프트", "pos": "명", "cf": "월요일 추락한 것은 시험용 항공기 중 하나였다(one of the test aircraft that crashed on Monday)", "image": "" },
  { "en": "mothership aircraft", "ko": "모선 항공기", "pronunciation": "마더십 에어크래프트", "pos": "명", "cf": "B-52는 최근 극초음속 무기의 모선 항공기로 사용됐다(as a “mothership” aircraft for hypersonic-weapons)", "image": "" },
  { "en": "hypersonic weapons", "ko": "극초음속 무기", "pronunciation": "하이퍼소닉 웨폰스", "pos": "명", "cf": "B-52는 극초음속 무기 운용에 사용됐다(for hypersonic-weapons)", "image": "" },
  { "en": "fuel-efficient", "ko": "연료 효율이 좋은", "pronunciation": "퓨얼 이피션트", "pos": "형", "cf": "공군은 B-52의 오래된 엔진을 더 연료 효율이 좋은 현대식 엔진으로 교체할 계획이다(modern engines that are more fuel-efficient)", "image": "" },
  { "en": "upgrades", "ko": "성능 개선, 업그레이드", "pronunciation": "업그레이즈", "pos": "명", "cf": "새 엔진과 다른 성능 개선은 B-52의 장기 운용을 위한 것이다(other upgrades, including new radars)", "image": "" },
  { "en": "mark a century", "ko": "100년을 맞다", "pronunciation": "마크 어 센추리", "pos": "구", "cf": "개량 작업은 항공기가 운용 100년을 맞을 때까지 비행하게 하려는 것이다(until the aircraft marks a century in service)", "image": "" },
  { "en": "secretive research", "ko": "비밀 연구", "pronunciation": "시크러티브 리서치", "pos": "명", "cf": "에드워즈 기지는 공군의 가장 비밀스러운 연구 중 일부가 이뤄지는 곳이다(home to some of the Air Force’s most secretive research)", "image": "" },
  { "en": "break the sound barrier", "ko": "음속 장벽을 돌파하다", "pronunciation": "브레이크 더 사운드 배리어", "pos": "구", "cf": "척 예거의 1947년 음속 장벽 돌파 비행은 에드워즈에서 이뤄졌다(Chuck Yeager’s 1947 flight that broke the sound barrier)", "image": "" },
  { "en": "divert", "ko": "우회시키다, 다른 곳으로 돌리다", "pronunciation": "다이버트", "pos": "동", "cf": "기지로 들어오던 모든 항공기는 다른 곳으로 우회했다(all incoming aircraft were diverted elsewhere)", "image": "" },
  { "en": "aging aircraft", "ko": "노후 항공기", "pronunciation": "에이징 에어크래프트", "pos": "명", "cf": "공군은 노후 항공기와 관련해 중대한 어려움을 겪고 있다(significant challenges with respect to aging aircraft)", "image": "" },
  { "en": "underfunding", "ko": "자금 부족, 예산 부족", "pronunciation": "언더펀딩", "pos": "명", "cf": "수십 년간의 예산 부족이 공군 전력 문제의 원인이라고 말했다(a result of decades of underfunding)", "image": "" },
  { "en": "operational demand", "ko": "작전 수요", "pronunciation": "아퍼레이셔널 디맨드", "pos": "명", "cf": "지속적이고 증가한 작전 수요도 문제로 지적됐다(increased operational demand)", "image": "" }
  


];


const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
let isAutoplayRunning = false;
const ITEM_TRANSITION_MS = 900;
const WORD_FLASH_IMAGE_DIR = "resources/";
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

  let koHiddenClass = "";
  let enHiddenClass = "";
  let pronHiddenClass = "";
  let koInitial = item.ko;
  let enInitial = item.en;
  let pronInitial = `|${item.pronunciation}|`;

  if (mode === "normal" || mode === "static") {
    enHiddenClass = " hidden-en-main";
    pronHiddenClass = " hidden-pron-text";
    enInitial = item.en;
    pronInitial = `|${item.pronunciation}|`;
  } else if (mode === "second-pass") {
    koHiddenClass = " hidden-ko";
    koInitial = item.ko;
  }

  const enBlock = `<span class="en-col"><span class="en-main${enHiddenClass}" data-full-en="${item.en}">${enInitial}</span><span class="pron-text${pronHiddenClass}" data-full-pron="|${item.pronunciation}|">${pronInitial}</span></span>`;
  const koBlock = `<span class="ko-text${koHiddenClass}" data-full-ko="${item.ko}">${koInitial}</span>`;
  const wordLine = mode === "second-pass"
    ? `${enBlock}<span class="word-sep"> : </span>${koBlock}`
    : `${koBlock}<span class="word-sep"> : </span>${enBlock}`;
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const escapedTargetWord = targetWord.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const cfTextWithUnderline = (cfText && targetWord)
    ? cfText.replace(new RegExp(`\\b${escapedTargetWord}\\b`, "gi"), (match) => `<u>${match}</u>`)
    : cfText;
  const cfHtml = cfText ? `<div class="cf-line"><span class="cf-note hidden-cf">cf. ${cfTextWithUnderline}</span></div>` : "";
  el.innerHTML = `
    <div class="word-row">
      <span class="order-num">${order}.</span>
      <div class="word-content">
        <div class="word-line">${wordLine}</div>
        ${cfHtml}
      </div>
    </div>
  `;
  return el;
}

function renderStaticList() {
  tickerEl.innerHTML = "";
  words.slice(0, VISIBLE_COUNT).forEach((item, idx) => {
    const el = createItemElement(item, idx + 1, idx, "static");
    tickerEl.appendChild(el);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordFlashImageSrc(wordIndex) {
  return `${WORD_FLASH_IMAGE_DIR}${wordIndex + 1}.jpg`;
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

async function loadBackendTTSAudio(text, languageKey) {
  const url = getTTSUrl(text, languageKey);
  if (!url) return null;

  if (ttsAudioCache.has(url)) {
    return ttsAudioCache.get(url);
  }

  const loadPromise = (async () => {
    const audio = new Audio();
    audio.src = url;
    audio.preload = "auto";
    await waitForAudioReady(audio);
    return audio;
  })().catch((err) => {
    ttsAudioCache.delete(url);
    throw err;
  });

  ttsAudioCache.set(url, loadPromise);
  return loadPromise;
}

function preloadWordTTS(word, pass = "first") {
  if (!word) return;
  const enText = getEnSpeakText(word);
  if (enText) loadBackendTTSAudio(enText, EN_TTS_LANG).catch(() => {});
  const koText = getKoSpeakText(word.ko);
  if (!koText) return;
  const koLang = pass === "second" ? "ko-KR-Chirp3-HD-Achernar" : "ko-KR";
  loadBackendTTSAudio(koText, koLang).catch(() => {});
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
    el.style.minWidth = "";
  });
}

function reserveAllKoSpace() {
  tickerEl.querySelectorAll(".ticker-item").forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.add("hidden-ko");
    koTextEl.textContent = ko;
    koTextEl.style.minWidth = "";
  });
}

function hideAllCfText() {
  tickerEl.querySelectorAll(".cf-note").forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

async function typeKoLikeHuman(koTextEl, text) {
  if (!koTextEl) return;
  const reservedWidth = koTextEl.offsetWidth;
  koTextEl.classList.remove("hidden-ko");
  koTextEl.textContent = "";
  if (reservedWidth > 0) {
    koTextEl.style.minWidth = `${reservedWidth}px`;
  }

  for (let i = 0; i < text.length; i += 1) {
    koTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }

  koTextEl.style.minWidth = "";
}

function hideAllEnText() {
  tickerEl.querySelectorAll(".en-main").forEach((el) => {
    el.classList.add("hidden-en-main");
    el.textContent = "";
  });
}

function hideAllPronText() {
  tickerEl.querySelectorAll(".pron-text").forEach((el) => {
    el.classList.add("hidden-pron-text");
    el.textContent = "";
  });
}

function reserveAllEnPronSpace() {
  tickerEl.querySelectorAll(".ticker-item").forEach((item) => {
    const enTextEl = item.querySelector(".en-main");
    const pronTextEl = item.querySelector(".pron-text");
    const en = item.dataset.en || "";
    if (enTextEl) {
      enTextEl.classList.add("hidden-en-main");
      enTextEl.textContent = en;
      enTextEl.style.minWidth = "";
    }
    if (pronTextEl) {
      pronTextEl.classList.add("hidden-pron-text");
      pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
      pronTextEl.style.minWidth = "";
    }
  });
}

function showEnPronAsDefault() {
  tickerEl.querySelectorAll(".ticker-item").forEach((item) => {
    const enTextEl = item.querySelector(".en-main");
    const pronTextEl = item.querySelector(".pron-text");
    const en = item.dataset.en || "";
    if (enTextEl) {
      enTextEl.classList.remove("hidden-en-main");
      enTextEl.textContent = en;
    }
    if (pronTextEl) {
      pronTextEl.classList.remove("hidden-pron-text");
      pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
    }
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
  const reservedWidth = enTextEl.offsetWidth;
  enTextEl.classList.remove("hidden-en-main");
  enTextEl.textContent = "";
  if (reservedWidth > 0) {
    enTextEl.style.minWidth = `${reservedWidth}px`;
  }

  for (let i = 0; i < text.length; i += 1) {
    enTextEl.textContent += text[i];
    const ch = text[i];
    const isPauseChar = [",", ".", "/", " ", ")", "("].includes(ch);
    const delay = isPauseChar
      ? 120 + Math.floor(Math.random() * 90)
      : 52 + Math.floor(Math.random() * 48);
    await sleep(delay);
  }

  enTextEl.style.minWidth = "";
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

  renderPage(0, false, "normal");
  showKoAsDefault();
  reserveAllEnPronSpace();
  hideAllCfText();
  await sleep(4000);

  let currentPageStart = 0;
  for (let i = 0; i < words.length; i += 1) {
    if (i !== 0 && i % VISIBLE_COUNT === 0) {
      currentPageStart = i;
      await shiftPageDown(currentPageStart, "normal");
      showKoAsDefault();
      reserveAllEnPronSpace();
      hideAllCfText();
    }
    const item = tickerEl.querySelector(`.ticker-item[data-index="${i}"]`);
    if (!item) continue;

    const en = item.dataset.en || "";
    const ko = item.dataset.ko || "";
    const enTextEl = item.querySelector(".en-main");
    const pronTextEl = item.querySelector(".pron-text");

    await playBackendTTS(getKoSpeakText(ko), "ko-KR");
    await typeEnLikeHuman(enTextEl, en);
    if (pronTextEl) {
      pronTextEl.classList.remove("hidden-pron-text");
    }
    const cfNoteEl = item.querySelector(".cf-note");
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
    await sleep(120);
    await playBackendTTS(getEnSpeakText(words[i]), EN_TTS_LANG);
    await showWordFlashImage(i);
    await sleep(300);
  }

  hideWordFlashImage();

  // 2차: 영어+발음 먼저 노출 후 한글 공개
  renderPage(0, false, "second-pass");
  reserveAllKoSpace();
  showEnPronAsDefault();
  hideAllCfText();
  preloadWordsAhead(0, Math.min(VISIBLE_COUNT * 2, words.length), "second");
  for (let i = 0; i < words.length; i += 1) {
    preloadWordsAhead(i + 1, VISIBLE_COUNT, "second");
    if (i !== 0 && i % VISIBLE_COUNT === 0) {
      await shiftPageDown(i, "second-pass");
      reserveAllKoSpace();
      showEnPronAsDefault();
      hideAllCfText();
    }
    const item = tickerEl.querySelector(`.ticker-item[data-index="${i}"]`);
    if (!item) continue;
    const ko = item.dataset.ko || "";
    const koTextEl = item.querySelector(".ko-text");

    await playBackendTTS(getEnSpeakText(words[i]), EN_TTS_LANG);
    await typeKoLikeHuman(koTextEl, ko);
    const cfNoteEl = item.querySelector(".cf-note");
    if (cfNoteEl) cfNoteEl.classList.remove("hidden-cf");
    await sleep(120);
    await playBackendTTS(getKoSpeakText(ko), "ko-KR-Chirp3-HD-Achernar");
    await sleep(300);
  }

  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

renderStaticList();
preloadWordTTS(words[0], "first");
autoplayBtn.addEventListener("click", runAutoplay);
if (pageTitleEl) pageTitleEl.innerHTML = PAGE_TITLE_HTML;
