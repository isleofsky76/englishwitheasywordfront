/**
 * =============================================================================
 * 설정 — 백엔드 `/generate-audio` 의 `language` 쿼리와 동일한 값을 씁니다.
 * =============================================================================
 *
 * ■ 영어(단어·예문): ENGLISH_TTS_VOICE_POOL 을 셔플한 큐에서 카드마다 1개씩 순서대로 사용(비면 재셔플)
 *   + 요청 URL에 nocache 로 브라우저 MP3 캐시 방지. language·voice 쿼리는 백엔드 defaultVoiceMap 과 동일 키.
 *
 * ■ 한국어 뜻 TTS — KO_TTS_VOICE_POOL 셔플 큐(영어와 동일), 미지정 시 KO_TTS_VOICE 상수 폴백
 *
 * 요청 시 `language` 와 함께 `voice` 에 Google 음성 이름을 넣어, 지정한 화자만 쓰이게 합니다.
 * 서버: 백엔드가 `generate-audio?text=...&language=...&voice=...` 를 제공해야 합니다.
 * (19vocabulary_shorts.js / diary voca 와 같은 방식)
 * =============================================================================
 */

const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

/**
 * 영어 TTS 풀 — 미국 → 영국 → 호주, 남·여 교차에 가깝게 1–10번.
 * 각 항목 languageKey = 백엔드 defaultVoiceMap 키 / `voice` 쿼리용 Google 음성 이름.
 */
const ENGLISH_TTS_VOICE_POOL = [
  { id: 1, region: "US", gender: "M", languageKey: "en-US-Chirp-HD-D", voiceName: "en-US-Chirp-HD-D" },
  { id: 2, region: "US", gender: "F", languageKey: "en-US-Chirp-HD-F", voiceName: "en-US-Chirp-HD-F" },
  { id: 3, region: "US", gender: "F", languageKey: "en-US-News-N", voiceName: "en-US-News-N" },
  { id: 4, region: "GB", gender: "M", languageKey: "en-GB-News-M", voiceName: "en-GB-News-M" },
  { id: 5, region: "GB", gender: "F", languageKey: "en-GB-News-H", voiceName: "en-GB-News-H" },
  { id: 6, region: "GB", gender: "M", languageKey: "en-GB-Neural2-B", voiceName: "en-GB-Neural2-B" },
  { id: 7, region: "GB", gender: "F", languageKey: "en-GB-Chirp3-HD-Zubenelgenubi", voiceName: "en-GB-Chirp3-HD-Zubenelgenubi" },
  { id: 8, region: "GB", gender: "F", languageKey: "en-GB-News-I", voiceName: "en-GB-News-I" },
  { id: 9, region: "AU", gender: "F", languageKey: "en-AU-News-G", voiceName: "en-AU-News-G" },
  { id: 10, region: "AU", gender: "F", languageKey: "en-AU-News-G", voiceName: "en-AU-News-G" },
];

/** 연속 카드마다 다른 화자 — 풀을 셔플한 뒤 순서대로 소진, 비면 다시 셔플 */
let __englishVoiceQueue = [];

function refillEnglishVoiceQueue() {
  const pool = [...ENGLISH_TTS_VOICE_POOL];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  __englishVoiceQueue = pool;
}

function pickRandomEnglishVoice() {
  if (__englishVoiceQueue.length === 0) refillEnglishVoiceQueue();
  return __englishVoiceQueue.shift();
}

/** 한국어 폴백(풀 미사용 시): 번호 → 백엔드 키 / Google 음성 이름 */
const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar",
};
const KO_TTS_VOICE_NAMES = {
  1: "ko-KR-Neural2-C",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar",
};

const KO_TTS_VOICE_POOL = [
  { languageKey: "ko-KR", voiceName: "ko-KR-Neural2-C" },
  { languageKey: "ko-KR-Chirp3-HD-Achird", voiceName: "ko-KR-Chirp3-HD-Achird" },
  { languageKey: "ko-KR-Chirp3-HD-Achernar", voiceName: "ko-KR-Chirp3-HD-Achernar" },
  { languageKey: "ko-KR-Chirp3-HD-Zephyr", voiceName: "ko-KR-Chirp3-HD-Zephyr" },
  { languageKey: "ko-KR-Chirp3-HD-Vindemiatrix", voiceName: "ko-KR-Chirp3-HD-Vindemiatrix" },
  { languageKey: "ko-KR-Chirp3-HD-Zubenelgenubi", voiceName: "ko-KR-Chirp3-HD-Zubenelgenubi" },
  { languageKey: "ko-KR-Chirp3-HD-Charon", voiceName: "ko-KR-Chirp3-HD-Charon" },
];

let __koreanVoiceQueue = [];

function refillKoreanVoiceQueue() {
  const pool = [...KO_TTS_VOICE_POOL];
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  __koreanVoiceQueue = pool;
}

function pickRandomKoreanVoice() {
  if (__koreanVoiceQueue.length === 0) refillKoreanVoiceQueue();
  return __koreanVoiceQueue.shift();
}

function getKoVoiceLang() {
  return KO_TTS_VOICE_IDS[Number(KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[1];
}

function getKoVoiceName() {
  return KO_TTS_VOICE_NAMES[Number(KO_TTS_VOICE)] || KO_TTS_VOICE_NAMES[1];
}

/** explicitVoiceName: 영어·한국어 공통 Google 음성 이름; 한국어는 languageKey 도 map 키로 전달 */
function getTtsUrlForText(text, languageKey, explicitVoiceName) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const key = String(languageKey || "").trim();
  const isKo = key === "ko" || key === "ko-KR" || /^ko-/i.test(key);
  const nocache = `&nocache=${encodeURIComponent(`${Date.now()}-${Math.random().toString(36).slice(2, 11)}`)}`;
  if (isKo) {
    const langParam = explicitVoiceName ? key || getKoVoiceLang() : getKoVoiceLang();
    const voiceName = explicitVoiceName || getKoVoiceName();
    const q = `text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}&voice=${encodeURIComponent(voiceName)}${nocache}`;
    return `${backendBaseUrl}/generate-audio?${q}`;
  }
  const langParam = key;
  const voice = String(explicitVoiceName || "").trim();
  const voiceQ = voice ? `&voice=${encodeURIComponent(voice)}` : "";
  const q = `text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}${voiceQ}${nocache}`;
  return `${backendBaseUrl}/generate-audio?${q}`;
}

/** 브라우저 기본 음성 — `languageKey` 마다 캐시 (US/GB·News-I 등 전환 시 화자 섞임 방지) */
const __browserTtsVoiceCache = {};

function browserTtsVoiceCacheId(languageKey) {
  const key = String(languageKey || "").trim();
  if (key === "ko" || key === "ko-KR") return "ko";
  if (/^ko-KR-/i.test(key)) return key;
  if (/^ko-/i.test(key)) return key;
  return key || "en-US";
}

function pickCachedBrowserVoice(languageKey) {
  if (typeof speechSynthesis === "undefined") return null;
  const key = String(languageKey || "").trim();
  const isKo = key === "ko" || key === "ko-KR" || /^ko-/i.test(key);
  const cid = browserTtsVoiceCacheId(languageKey);
  if (__browserTtsVoiceCache[cid]) return __browserTtsVoiceCache[cid];

  const voices = speechSynthesis.getVoices() || [];
  const langPrefix = isKo
    ? "ko"
    : /^en-AU/i.test(key)
      ? "en-AU"
      : /^en-GB/i.test(key)
        ? "en-GB"
        : "en-US";

  const matchesPrefix = (v) =>
    v.lang && v.lang.toLowerCase().replace(/_/g, "-").startsWith(langPrefix.toLowerCase());

  if (isKo) {
    const v = voices.find(matchesPrefix) || voices.find((x) => x.lang && /^ko/i.test(x.lang));
    __browserTtsVoiceCache[cid] = v || null;
    return __browserTtsVoiceCache[cid];
  }

  /** 백엔드 기본에 맞춤: 일반 영어는 남성 우선, News-I·Chirp-HD-F 는 여성 우선 */
  const maleHintUS =
    /Male|David|Guy|Fred|Daniel|Mark|Aaron|Tom|James|John|Richard|Google US English/i;
  const maleHintGB =
    /Male|Daniel|Arthur|Oliver|Thomas|Harry|George|Microsoft George/i;
  const femaleHint =
    /Female|Samantha|Victoria|Karen|Moira|Tessa|Zira|Susan|Linda|Microsoft Sonia|Hazel|Martha/i;
  const maleHint = /^en-GB/i.test(key) ? maleHintGB : /^en-AU/i.test(key) ? maleHintUS : maleHintUS;
  const preferFemale = /News-I|Chirp-HD-F|News-H|News-N|News-G|Zubenelgenubi/i.test(key);

  let v;
  if (preferFemale) {
    v = voices.find((x) => matchesPrefix(x) && femaleHint.test(x.name));
    if (!v) v = voices.find((x) => matchesPrefix(x) && !maleHint.test(x.name));
  } else {
    v = voices.find((x) => matchesPrefix(x) && maleHint.test(x.name) && !femaleHint.test(x.name));
    if (!v) v = voices.find((x) => matchesPrefix(x) && !femaleHint.test(x.name));
  }
  if (!v) v = voices.find(matchesPrefix);
  if (!v) v = voices.find((x) => x.lang && /^en/i.test(x.lang));

  __browserTtsVoiceCache[cid] = v || null;
  return __browserTtsVoiceCache[cid];
}

/** voiceschanged 마다 캐시를 비우면 폴백 TTS 화자가 바뀔 수 있어, 첫 선택을 유지 */

/** 백엔드 오디오가 막힐 때(특히 한국어 끝난 뒤 두 번째·세 번째 play() 차단) 브라우저 내장 TTS로 이어 읽기 */
function speakWithBrowserTTS(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw || typeof speechSynthesis === "undefined") return Promise.resolve();
  const key = String(languageKey || "").trim();
  const isKo = key === "ko" || key === "ko-KR" || /^ko-/i.test(key);
  const lang = isKo ? "ko-KR" : /^en-AU/i.test(key) ? "en-AU" : /^en-GB/i.test(key) ? "en-GB" : "en-US";

  return new Promise((resolve) => {
    try {
      speechSynthesis.cancel();
    } catch (_) {}
    const u = new SpeechSynthesisUtterance(raw);
    u.lang = lang;
    const voice = pickCachedBrowserVoice(languageKey);
    if (voice) u.voice = voice;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    speechSynthesis.speak(u);
  });
}

async function playBackendTTS(text, languageKey, explicitVoiceName) {
  const raw = String(text || "").trim();
  if (!raw) return;

  const url = getTtsUrlForText(raw, languageKey, explicitVoiceName);
  if (!url) return;
  const audio = new Audio();
  audio.src = url;
  audio.preload = "auto";
  try {
    audio.load();
  } catch (_) {}

  try {
    if (window.__vocabShortsCardAudio && typeof window.__vocabShortsCardAudio.pause === "function") {
      window.__vocabShortsCardAudio.pause();
    }
  } catch (_) {}

  window.__vocabShortsCardAudio = audio;

  let loadOk = false;
  await new Promise((resolve, reject) => {
    const done = () => {
      if (loadOk) return;
      loadOk = true;
      resolve();
    };
    audio.oncanplaythrough = done;
    audio.onloadeddata = done;
    audio.onerror = () => reject(new Error("Audio load error"));
  }).catch(() => null);

  if (!loadOk) {
    if (window.__vocabShortsCardAudio === audio) window.__vocabShortsCardAudio = null;
    await speakWithBrowserTTS(raw, languageKey);
    return;
  }

  try {
    await audio.play();
  } catch (_) {
    if (window.__vocabShortsCardAudio === audio) window.__vocabShortsCardAudio = null;
    await speakWithBrowserTTS(raw, languageKey);
    return;
  }

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  if (window.__vocabShortsCardAudio === audio) window.__vocabShortsCardAudio = null;
}

/** 뉴스 어휘 쇼츠 카드 예시 9개 */

const cardData = [
  {
    category: "뉴스어휘",
    word: "rig",
    meaning: "시추 장비 / 굴착 장치",
    sentence: "In fact, shale producers have been reluctant to add new rigs because they aren’t confident the jump in prices will be sustained.",
    highlightWord: "rig",
    highlightWordlines: "add new rigs",
    translationLines: [
      "실제로 셰일 생산업체들은 유가 급등세가 지속될 것이라는 확신이 없기 때문에 신규 시추 장비 투입을 주저하고 있습니다(have been reluctant to add new rigs)."
    ]
  },
  {
    category: "뉴스어휘",
    word: "pitch",
    meaning: "선전하다 / 강매조로 선전하다 / 던지다",
    sentence: "President Trump is pitching a U.S. naval blockade of the Strait of Hormuz as an opportunity for American oil-and-gas exporters.",
    highlightWord: "pitch",
    highlightWordlines: "is pitching a U.S. naval blockade",
    translationLines: [
      "트럼프 대통령은 미 해군의 호르무즈 해협 봉쇄를 미국 석유 및 가스 수출업자들에게 찾아온 기회라고(as an opportunity for American oil-and-gas exporters) 설파하고(내세우고) 있습니다(is pitching)."
    ]
  },
  {
    category: "뉴스어휘",
    word: "omen",
    meaning: "징조 / 전조",
    sentence: "The squeeze on supplies is a bad omen for prices at the pump.",
    highlightWord: "omen",
    highlightWordlines: "a bad omen for prices",
    translationLines: [
      "공급 부족 사태는 주유소(at the pump, 주유기에서, 주유소에서) 휘발유 가격이 오를 것이라는 불길한 징조(a bad omen)입니다."
    ]
  },
  {
    category: "뉴스어휘",
    word: "wrest",
    meaning: "비틀어 빼앗다 / 힘겹게 손에 넣다",
    sentence: "The U.S. plan to wrest control of the key waterway from Iran would potentially cut off the roughly 2 million barrels of oil.",
    highlightWord: "wrest",
    highlightWordlines: "The U.S. plan to wrest control of the key waterway",
    translationLines: [
      "이란으로부터 핵심 수로의 통제권을 탈취하려는(빼앗으려는)(to wrest) 미국의 계획은 잠재적으로 약 200만 배럴의 원유 수송을 차단할(would potentially cut off) 위험이 있습니다."
    ]
  },

  {
    category: "뉴스어휘",
    word: "oceangoing",
    meaning: "원양 항해용의",
    sentence: "The massive oceangoing vessels are designed for long trips, such as the 11,700 nautical miles.",
    highlightWord: "oceangoing",
    highlightWordlines: "massive oceangoing vessels",
    translationLines: [
      "이 거대한 원양 선박들(massive oceangoing vessels)은 11,700해리에(11,700 nautical miles) 달하는 장거리 항해에 최적화되도록 설계되었습니다."
    ]
  },


  {
    category: "뉴스어휘",
    word: "wiggle room",
    meaning: "자유재량권 / 해석의 폭[여지](latitude) , 비격식",
    sentence: "The nation’s four major oil-export facilities have a little wiggle room each month to fill up more tankers — but not much.",
    highlightWord: "wiggle room",
    highlightWordlines: "a little wiggle room each month",
    translationLines: [
      "그 나라의 4대 주요 석유 수출 시설들은 약간의 꿈틀거릴 공간(여유)을 가지고 있다(have a little wiggle room). 매달 더 많은 유조선들을 채울 수 있는(fill up more tankers) — 하지만 많지는 않다(but not much)."
    ]
  },
  {
    category: "뉴스어휘",
    word: "underpin",
    meaning: "뒷받침하다 / 토대를 형성하다",
    sentence: "Unlike the LNG market, which is underpinned largely by 20-year contracts, oil shipments are arranged mostly on the spot market.",
    highlightWord: "underpin",
    highlightWordlines: "which is underpinned largely by 20-year contracts",
    translationLines: [
      "주로 20년 단위의 장기 계약으로 뒷받침되는(안정성을 유지하는)(which is underpinned largely by 20-year contracts) LNG 시장과 달리, 원유 선적은 대부분 현물 시장(Spot Market)을 통해 거래됩니다."
    ]
  },
  {
    category: "뉴스어휘",
    word: "capacity",
    meaning: "수용력 / 생산/가동 능력",
    sentence: "The upper limit of U.S. oil exports is determined by the physical limitations of the nation’s ports, which have run close to their top capacity.",
    highlightWord: "capacity",
    highlightWordlines: "top capacity",
    translationLines: [
      "미국 원유 수출의 상한선은 항구 시설의 물리적 한계에 의해 결정되는데, 현재 이들 항구는 거의 최대 가동 능력(수용량)에 근접한 상태입니다(which have run close to their top capacity)."
    ]
  },
  {
    category: "뉴스어휘",
    word: "churn out",
    meaning: "대량 생산하다 / 잇달아 내다",
    sentence: "The Golden Pass plant will eventually churn out about 18 million metric tons a year in much-needed LNG supplies.",
    highlightWord: "churn out",
    highlightWordlines: "churn out about 18 million metric tons",
    translationLines: [
      "골든 패스 공장은 향후 수급이 절실한 LNG를 연간 약 1,800만 메트릭 톤씩 대량 생산하게 될 것입니다(will eventually churn out)."
    ]
  },
  {
    category: "뉴스어휘",
    word: "defer",
    meaning: "미루다 / 연기하다",
    sentence: "Cheniere Energy has said it is considering deferring maintenance at some of its units to produce more supplies.",
    highlightWord: "defer",
    highlightWordlines: "considering deferring maintenance",
    translationLines: [
      "체니에르 에너지는 공급량을 극대화하기 위해 일부 생산 설비의 유지보수 일정을 연기하는 방안을 검토 중이라고(is considering deferring maintenance) 밝혔습니다."
    ]
  },
 
 
];













///////////////
let currentIndex = 0;

/** `>` 로 자동재생 시작할 때, 첫 카드 읽기 전 대기(ms) */
const SPEAK_DELAY_MS = 3000;
/** 한 JSON(TTS)이 끝난 뒤 다음 카드로 넘어가기 전 간격(ms) — 넘어간 뒤에는 바로 읽기 */
const INTER_CARD_GAP_MS = 2000;
/** 한국어 뜻 TTS 직후 영어로 넘어가기 전 무음(ms) — 앞말이 묻히는 현상 완화 */
const KO_TO_EN_GAP_MS = 420;
/** 영어 단어 단독 발화 후 예문으로 넘어가기 전 무음(ms) — 예문 첫머리·키워드 앞 말이 뭉개지는 현상 완화 */
const EN_WORD_TO_SENTENCE_GAP_MS = 480;

function delay(ms) {
  const n = Math.max(0, Number(ms) || 0);
  return new Promise((resolve) => {
    setTimeout(resolve, n);
  });
}
let speakTimeoutId = null;
let isAutoPlayRunning = false;
/** 첫 카드 그릴 때만 true → 로드 직후에도 단어/예문 가림이 보이게 함(이후 카드 이동·자동재생은 기존 규칙) */
let initialEnglishMaskPending = true;
/** 첫 `showCard` 여부 — 이후 수동 이동이면 예문을 바로 표시 */
let firstShowCardDone = false;
/** 예문 공개 여부: 기본·자동재생 카드는 false(숨김) → 단어 TTS 후 애니메이션으로만 true. 수동으로 넘긴 카드는 true */
let sentenceUnlockedForCurrentCard = false;

function stopEnglishSpeak() {
  try {
    if (window.__vocabShortsCardAudio && typeof window.__vocabShortsCardAudio.pause === "function") {
      window.__vocabShortsCardAudio.pause();
      window.__vocabShortsCardAudio = null;
    }
  } catch (_) {}
  try {
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
  } catch (_) {}
}

function clearSpeakTimer() {
  if (speakTimeoutId !== null) {
    clearTimeout(speakTimeoutId);
    speakTimeoutId = null;
  }
}

function stopAutoPlay() {
  isAutoPlayRunning = false;
  clearSpeakTimer();
  stopEnglishSpeak();
}

function setExampleSplitDimmed(dimmed) {
  const el = document.querySelector(".example-split");
  if (el) el.classList.toggle("example-split--dimmed", Boolean(dimmed));
}

/** 기본·자동재생: 예문·번역은 영어 단어 TTS 뒤 함께 등장. 수동 카드 이동 시에는 이미 공개 */
function revealSentenceAnimated() {
  const sentenceEl = document.getElementById("sentence");
  const translationEl = document.getElementById("translation");
  const hadSentence = sentenceEl?.classList.contains("sentence--concealed");
  const hadTranslation = translationEl?.classList.contains("translation--concealed");
  if (!hadSentence && !hadTranslation) {
    return Promise.resolve();
  }
  const markUnlocked = () => {
    sentenceUnlockedForCurrentCard = true;
  };
  const revealBoth = () => {
    sentenceEl?.classList.remove("sentence--concealed");
    sentenceEl?.removeAttribute("aria-hidden");
    translationEl?.classList.remove("translation--concealed");
    translationEl?.removeAttribute("aria-hidden");
    markUnlocked();
  };
  const animEl = hadSentence ? sentenceEl : translationEl;
  if (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealBoth();
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      revealBoth();
      if (!animEl) {
        resolve();
        return;
      }
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        animEl.removeEventListener("transitionend", onEnd);
        resolve();
      };
      const onEnd = (e) => {
        if (e.target !== animEl) return;
        if (e.propertyName !== "opacity" && e.propertyName !== "transform") return;
        finish();
      };
      animEl.addEventListener("transitionend", onEnd);
      setTimeout(finish, 700);
    });
  });
}

/** preDelayMs 후 meaning의 `/` 앞 구간 전체(ko TTS) → word(en) → sentence(en) 순 재생, 끝나면 콜백 */
function scheduleSpeakCardSequence(card, onDone, preDelayMs = SPEAK_DELAY_MS) {
  clearSpeakTimer();
  stopEnglishSpeak();

  const meaningRaw = String(card?.meaning || "").trim();
  /** `평결/판단` → `평결` 전체; 슬래시 없으면 meaning 전체 */
  const meaningHead = meaningRaw.includes("/")
    ? meaningRaw.split("/")[0].trim()
    : meaningRaw;
  const word = String(card?.word || "").trim();
  const sentence = String(card?.sentence || "").trim();

  speakTimeoutId = setTimeout(() => {
    speakTimeoutId = null;

    let doneCalled = false;
    const done = () => {
      if (doneCalled) return;
      doneCalled = true;
      if (typeof onDone === "function") onDone();
    };

    if (!meaningHead && !word && !sentence) {
      done();
      return;
    }

    let chain = Promise.resolve();
    const enPick = pickRandomEnglishVoice();
    const enLang = enPick.languageKey;
    const enVoice = enPick.voiceName;
    const koPick = pickRandomKoreanVoice();

    if (meaningHead) {
      chain = chain.then(() => playBackendTTS(meaningHead, koPick.languageKey, koPick.voiceName));
      chain = chain.then(() => delay(KO_TO_EN_GAP_MS));
      chain = chain.then(() => {
        revealEnglishContent(card);
      });
    } else {
      chain = chain.then(() => {
        revealEnglishContent(card);
      });
    }

    /** 단어와 예문을 분리 재생 + 사이 간격: 한 덩어리("word. sentence")보다 앞부분·키워드 앞 말이 또렷하게 들림. 동일 카드는 동일 음성 */
    if (word) {
      chain = chain.then(() => playBackendTTS(word, enLang, enVoice));
    }
    /** 영어 단어 재생 후(또는 단어 없으면 곧바로) 번역 선명화 → 예문 페이드 인 → 예문 TTS */
    chain = chain.then(() => {
      setExampleSplitDimmed(false);
    });
    if (sentence) {
      if (word) {
        chain = chain.then(() => delay(EN_WORD_TO_SENTENCE_GAP_MS));
      }
      chain = chain.then(() => revealSentenceAnimated());
      chain = chain.then(() => playBackendTTS(sentence, enLang, enVoice));
    }

    chain.then(done).catch(done);
  }, preDelayMs);
}

function playCurrentAndContinue(preDelayBeforeReadMs = SPEAK_DELAY_MS) {
  if (!isAutoPlayRunning) return;
  const currentCard = cardData[currentIndex];
  if (!currentCard) {
    stopAutoPlay();
    return;
  }

  scheduleSpeakCardSequence(
    currentCard,
    () => {
      if (!isAutoPlayRunning) return;
      if (currentIndex >= cardData.length - 1) {
        stopAutoPlay();
        return;
      }
      speakTimeoutId = setTimeout(() => {
        speakTimeoutId = null;
        if (!isAutoPlayRunning) return;
        showCard(currentIndex + 1);
        playCurrentAndContinue(0);
      }, INTER_CARD_GAP_MS);
    },
    preDelayBeforeReadMs,
  );
}

/** > 클릭: 현재 위치로 넘기지 않고 첫 JSON(인덱스 0)부터 읽고, 이후 자동으로 다음 카드 반복(마지막에서 종료) */
function startAutoPlayFromFirst() {
  stopAutoPlay();
  if (cardData.length === 0) return;

  isAutoPlayRunning = true;
  showCard(0);
  playCurrentAndContinue();
}

function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeHtmlChar(ch) {
  if (ch === "&") return "&amp;";
  if (ch === "<") return "&lt;";
  if (ch === ">") return "&gt;";
  if (ch === '"') return "&quot;";
  if (ch === "'") return "&#039;";
  return ch;
}

/** `word` 칸만: 남은 글자 수 = `_` 개수, `_ _ _` 칸 구분(U+2009 thin, 붙지 않음·일반 공백보다 촘촘) */
const MASK_VISIBLE_WORDS = 3;
const MASK_VISIBLE_SINGLE_TOKEN_CHARS = 3;

/** thin space(U+2009) — `_`가 붙어 보이지 않게, 일반 공백보다는 좁게 */
const MASK_UNDERSCORE_GAP = "\u2009";

/** 풀 단어 표시 — 마스크와 동일 래퍼로 글자 크기·굵기·베이스라인 유지 */
function renderWordLineHtml(plainWord) {
  return `<span class="word-mask-line">${escapeHtml(String(plainWord ?? ""))}</span>`;
}

function renderUnderscoreSlots(n) {
  const count = Math.max(0, Math.floor(Number(n) || 0));
  if (count <= 0) return "";
  const blanks = Array.from({ length: count }, () => "_").join(MASK_UNDERSCORE_GAP);
  return `<span class="word-mask-fill" aria-hidden="true">${escapeHtml(blanks)}</span>`;
}

function renderMaskedWordHtml(text) {
  const raw = String(text || "");
  const re = /\S+/g;
  const tokenTexts = raw.match(re);
  if (!tokenTexts || tokenTexts.length === 0) return escapeHtml(raw);

  let inner;
  if (tokenTexts.length === 1) {
    const t = tokenTexts[0];
    if (t.length <= MASK_VISIBLE_SINGLE_TOKEN_CHARS) return `<span class="word-mask-line">${escapeHtml(t)}</span>`;
    const head = t.slice(0, MASK_VISIBLE_SINGLE_TOKEN_CHARS);
    const remain = t.length - MASK_VISIBLE_SINGLE_TOKEN_CHARS;
    inner = escapeHtml(head) + renderUnderscoreSlots(remain);
  } else {
    let wordIndex = 0;
    inner = "";
    let lastIndex = 0;
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(raw)) !== null) {
      inner += escapeHtml(raw.slice(lastIndex, m.index));
      const tok = m[0];
      if (wordIndex < MASK_VISIBLE_WORDS) {
        inner += escapeHtml(tok);
      } else {
        inner += renderUnderscoreSlots(tok.length);
      }
      wordIndex += 1;
      lastIndex = m.index + tok.length;
    }
    inner += escapeHtml(raw.slice(lastIndex));
  }
  return `<span class="word-mask-line">${inner}</span>`;
}

function renderSentence(sentence, highlightWord, highlightWordlines, dimKeywordInExample = false) {
  const raw = String(sentence || "");
  if (!raw) return "";

  const lowerSentence = raw.toLowerCase();
  const isHighlighted = Array(raw.length).fill(false);
  const isUnderlined = Array(raw.length).fill(false);

  const markRanges = (target, marks) => {
    const text = String(target || "").trim();
    if (!text) return;
    const lowerTarget = text.toLowerCase();
    if (!lowerTarget) return;
    let from = 0;
    while (from < lowerSentence.length) {
      const start = lowerSentence.indexOf(lowerTarget, from);
      if (start === -1) break;
      const end = start + lowerTarget.length;
      for (let i = start; i < end && i < marks.length; i += 1) marks[i] = true;
      from = start + lowerTarget.length;
    }
  };

  markRanges(highlightWord, isHighlighted);

  const underlineTargets = Array.isArray(highlightWordlines)
    ? highlightWordlines
    : [highlightWordlines];
  for (const target of underlineTargets) {
    markRanges(target, isUnderlined);
  }

  const classFor = (idx) => {
    const h = isHighlighted[idx];
    const u = isUnderlined[idx];
    const dim = dimKeywordInExample && h;
    const dimCls = dim ? " highlight--dim" : "";
    const wordlinesCls = u ? " roboto-mono-wordlines" : "";
    if (h && u) return `highlight highlight-underline${dimCls}${wordlinesCls}`;
    if (h) return `highlight${dimCls}`;
    if (u) return `highlight-underline${wordlinesCls}`;
    return "";
  };

  let html = "";
  let currentClass = "";
  for (let i = 0; i < raw.length; i += 1) {
    const nextClass = classFor(i);
    if (nextClass !== currentClass) {
      if (currentClass) html += "</span>";
      if (nextClass) html += `<span class="${nextClass}">`;
      currentClass = nextClass;
    }
    html += escapeHtmlChar(raw[i]);
  }
  if (currentClass) html += "</span>";
  return html;
}

/** `(WSJ : …)` 출처 괄호를 본문과 분리 — 아래 칸·스타일은 `.translation-cite` */
function splitTranslationCitation(line) {
  const s = String(line || "");
  const match = s.match(/\s*\(\s*WSJ\s*:/i);
  if (!match || match.index === undefined) {
    return { main: s.trim(), cite: null };
  }
  let openIdx = -1;
  for (let k = match.index; k < s.length; k += 1) {
    if (s[k] === "(") {
      openIdx = k;
      break;
    }
  }
  if (openIdx < 0) return { main: s.trim(), cite: null };
  let depth = 0;
  let j = openIdx;
  for (; j < s.length; j += 1) {
    const c = s[j];
    if (c === "(") depth += 1;
    else if (c === ")") {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  if (depth !== 0) return { main: s.trim(), cite: null };
  const cite = s.slice(openIdx, j + 1).trim();
  const main = s.slice(0, openIdx).trimEnd();
  return { main, cite };
}

function renderTranslationLineHtml(line) {
  const { main, cite } = splitTranslationCitation(line);
  const mainPart = `<span class="translation-main">${escapeHtml(main)}</span>`;
  if (!cite) {
    return `<span class="small-line">${mainPart}</span>`;
  }
  return `<span class="small-line">${mainPart}<span class="translation-cite">${escapeHtml(cite)}</span></span>`;
}

function revealEnglishContent(data) {
  const wordEl = document.getElementById("word");
  if (wordEl) {
    wordEl.classList.remove("word--masked");
    wordEl.innerHTML = renderWordLineHtml(data.word);
  }
  const sentenceEl = document.getElementById("sentence");
  if (sentenceEl) {
    sentenceEl.innerHTML = renderSentence(
      data.sentence,
      data.highlightWord,
      data.highlightWordlines,
      false,
    );
  }
}

function renderCard(data) {
  document.getElementById("category").textContent = data.category;
  document.getElementById("meaning").textContent = data.meaning;

  const maskEnglish = isAutoPlayRunning || initialEnglishMaskPending;
  const wordEl = document.getElementById("word");
  if (maskEnglish) {
    wordEl.classList.add("word--masked");
    wordEl.innerHTML = renderMaskedWordHtml(data.word);
  } else {
    wordEl.classList.remove("word--masked");
    wordEl.innerHTML = renderWordLineHtml(data.word);
  }
  const sentenceEl = document.getElementById("sentence");
  const hasSentence = String(data.sentence || "").trim().length > 0;
  sentenceEl.innerHTML = renderSentence(
    data.sentence,
    data.highlightWord,
    data.highlightWordlines,
    false,
  );
  if (hasSentence && !sentenceUnlockedForCurrentCard) {
    sentenceEl.classList.add("sentence--concealed");
    sentenceEl.setAttribute("aria-hidden", "true");
  } else {
    sentenceEl.classList.remove("sentence--concealed");
    sentenceEl.removeAttribute("aria-hidden");
  }

  const translationEl = document.getElementById("translation");
  const lines = Array.isArray(data.translationLines)
    ? data.translationLines
    : [data.translationLines];
  const hasTranslation = lines.some((line) => String(line || "").trim().length > 0);
  translationEl.innerHTML = lines.map((line) => renderTranslationLineHtml(line)).join("");

  if (hasTranslation && !sentenceUnlockedForCurrentCard) {
    translationEl.classList.add("translation--concealed");
    translationEl.setAttribute("aria-hidden", "true");
  } else {
    translationEl.classList.remove("translation--concealed");
    translationEl.removeAttribute("aria-hidden");
  }

  /** 예문·번역은 `sentence--concealed` / `translation--concealed`로만 제어 — 흐림(dimmed) 기본값 없음 */
  setExampleSplitDimmed(false);
}

function updateIndexDisplay() {
  const el = document.getElementById("cardIndex");
  if (el) {
    el.textContent = `${currentIndex + 1} / ${cardData.length}`;
  }
}

function showCard(index) {
  const n = cardData.length;
  if (n === 0) return;
  currentIndex = ((index % n) + n) % n;

  if (isAutoPlayRunning) {
    sentenceUnlockedForCurrentCard = false;
  } else if (!firstShowCardDone) {
    sentenceUnlockedForCurrentCard = false;
    firstShowCardDone = true;
  } else {
    sentenceUnlockedForCurrentCard = true;
  }

  renderCard(cardData[currentIndex]);
  if (initialEnglishMaskPending) {
    initialEnglishMaskPending = false;
  }
  updateIndexDisplay();
  /* 카드마다 예문/번역 높이가 달라 스크롤 위치가 남으면 위로 올린 번역이 안 보일 수 있음 */
  const enHalf = document.querySelector(".example-half--en");
  const koHalf = document.querySelector(".example-half--ko");
  if (enHalf) enHalf.scrollTop = 0;
  if (koHalf) koHalf.scrollTop = 0;
}

function goPrev() {
  stopAutoPlay();
  showCard(currentIndex - 1);
}

function goNext() {
  startAutoPlayFromFirst();
}

/** 쇼츠: 좌우 스와이프로 이전/다음 카드 (‹ › 자동재생은 기존과 동일) */
const SHORTS_SWIPE_THRESHOLD_PX = 56;
const SHORTS_SWIPE_MAX_VERTICAL_PX = 88;
const SHORTS_SWIPE_MAX_MS = 650;

function attachShortsSwipe() {
  const frame = document.getElementById("shortsCard");
  if (!frame) return;
  let startX = 0;
  let startY = 0;
  let startT = 0;
  let startTarget = null;

  frame.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches.length !== 1) return;
      startTarget = e.target;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startT = Date.now();
    },
    { passive: true },
  );

  frame.addEventListener(
    "touchend",
    (e) => {
      const t = e.changedTouches[0];
      if (!t || startTarget == null) return;
      if (startTarget.closest && startTarget.closest("button, a, input, textarea, select, label")) {
        startTarget = null;
        return;
      }
      const dt = Date.now() - startT;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      startTarget = null;
      if (dt > SHORTS_SWIPE_MAX_MS) return;
      if (Math.abs(dx) < SHORTS_SWIPE_THRESHOLD_PX) return;
      if (Math.abs(dy) > SHORTS_SWIPE_MAX_VERTICAL_PX && Math.abs(dy) >= Math.abs(dx)) return;
      stopAutoPlay();
      if (dx < 0) showCard(currentIndex + 1);
      else showCard(currentIndex - 1);
    },
    { passive: true },
  );
}

function init() {
  const prev = document.getElementById("prevCard");
  const next = document.getElementById("nextCard");
  if (prev) prev.addEventListener("click", goPrev);
  if (next) next.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  attachShortsSwipe();
  showCard(0);
}

init();
