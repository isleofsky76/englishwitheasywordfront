/* =====================================================================
   ✏️ 여기만 수정하세요 — 데이터를 넣으면 카드가 자동으로 완성됩니다.
   ---------------------------------------------------------------------
   [카드 공통]
   tag / category / headline / headIcon
   headlineFontPx : 제목 글자 크기(px). 예: 34(기본), 긴 제목은 26~30
                    생략하거나 "auto"면 글자 수에 따라 자동 축소
   headline       : 제목 (`<br>`로 줄바꿈 가능)
   enVoice        : 영어 TTS 음성 선택 (autoplay 전체 세션에 고정)
                    숫자 1~10 또는 음성 ID 문자열, "random"이면 랜덤
                    1: en-US-Chirp-HD-D                 (남 · 미국)
                    2: en-US-Chirp3-HD-Algenib          (남 · 미국 허스키)
                    3: en-US-Chirp3-HD-Enceladus        (남 · 미국 허스키)
                    4: en-US-Chirp-HD-F                 (여 · 미국)
                    5: en-US-Chirp3-HD-Despina          (여 · 미국)
                    6: en-US-Chirp3-HD-Gacrux           (여 · 미국 허스키)
                    7: en-GB-Chirp3-HD-Zubenelgenubi    (남 · 영국)
                    8: en-GB-Chirp-HD-D                 (남 · 영국)
                    9: en-GB-Neural2-B                  (남 · 영국)
                   10: en-GB-Wavenet-N                  (여 · 영국)

   [단어 항목 설명]
   en          : 영단어 (autoplay 시 기본 3회 낭독)
   ko          : 뜻 (줄바꿈은 <br>)
   pos         : 품사 (형 / 명 / 동 / 동/명 ...)
   reading     : 한글 발음
   ipa         : 발음기호
   defs        : 뜻풀이 목록 (배열)
   star        : true면 첫 뜻풀이 앞에 ★
   example     : 예문
   enRepeat    : 예문 낭독 횟수 (1|2|3, 기본 1). 읽을 때마다 테두리 색 변경
   texts       : 예문 속 단어 아래 ko 표시 [{ text: "even", ko: "심지어" }, ...]
                 enRepeat만큼 예문 낭독 뒤, 각 항목을 영어→한글 순으로 낭독
   highlight   : 예문에서 강조할 단어 (생략하면 en 그대로 강조)
   translation : 예문 해석
   image       : 이미지 경로 (예: "resources/defiant.jpg") — 있으면 icon 대신 표시. 비우면 resources/{en}.jpg 자동
   icon        : 이미지가 없을 때 보여줄 이모지
   spark       : 그림 옆 강조선 색 ("red" 또는 "yellow")
   caption     : 그림 아래 캡션 (선택)
   note        : 그림 아래 메모 { phrase: "표현", text: "설명" } (선택)
   세로형 이미지로 만들어 주세요. 크기 744x840픽셀, 비율 약 4:5. 주제는 가운데, 배경 단순, 글자·워터마크 없음. 작은 앱 아이콘용(화면에선 더 작게 줄어듦).
   직전에 생성된 마지막 이미지는 1024 × 1024 픽셀의 1:1 정방형(정사각형) 비율입니다.   원래 요청하셨던 372 × 420 픽셀(약 4:5 비율) 규격으로 바로 웹이나 아이콘에 적용하시려면, 가로·세로 비율에 맞춰 리사이징 및 크롭하여 저장해 사용하시면 됩니다.
   ===================================================================== */

const HEADLINE_FONT_PX_DEFAULT = 34;

const cardData = {
  tag: "The Economist 기사에서 추출",
  category: "시사 영단어",
  headline: "밀레니얼 세대를 불쌍하게 여기지 마세요.",
  headIcon: "🏠",
  /*
   * 영어 음성 (enVoice) — 숫자 1~10 또는 "random"
   * 1: en-US-Chirp-HD-D                 (남 · 미국)
   * 2: en-US-Chirp3-HD-Algenib          (남 · 미국 허스키)
   * 3: en-US-Chirp3-HD-Enceladus        (남 · 미국 허스키)
   * 4: en-US-Chirp-HD-F                 (여 · 미국)
   * 5: en-US-Chirp3-HD-Despina          (여 · 미국)
   * 6: en-US-Chirp3-HD-Gacrux           (여 · 미국 허스키)
   * 7: en-GB-Chirp3-HD-Zubenelgenubi    (남 · 영국)
   * 8: en-GB-Chirp-HD-D                 (남 · 영국)
   * 9: en-GB-Neural2-B                  (남 · 영국)
   * 10: en-GB-Wavenet-N                 (여 · 영국)
   */
  enVoice: 1,

  words: [
    {
      en: "gerontocratic",
      ko: "노인이 지배하는",
      pos: "형",
      reading: "제런터크래틱",
      ipa: "/dʒəˌrɑːntəˈkrætɪk/",
      defs: ["Geron(노인, 원로) +" , "cracy(지배, 통치, 권력)"],
      example: "Even in supposedly gerontocratic politics, millennials are doing just fine.",
      enRepeat: 2,
      texts: [

        { text: "Even in supposedly", ko: "소위 ~ 속에서도" },
      
      ],
      highlight: "gerontocratic",
      translation: "소위 노인 지배적인 정치 속에서도, 밀레니얼 세대는 아주 잘 해나가고 있다.",
      image: "resources/gerontocratic.jpg",
      icon: "🏛️",
      spark: "yellow",
      note: {
        phrase: "gerontocratic politics",
        text: "고령층이 권력을 쥔 정치"
      },
    },
    {
      en: "enduring",
      ko: "오래가는",
      pos: "형",
      reading: "인듀어링",
      ipa: "/ɪnˈdʊrɪŋ/",
      defs: ["오래가는[지속되는]"],
      example: "But, across rich countries, an even more enduring stereotype about millennials has stopped fitting the facts.",
      enRepeat: 2,
      texts: [
   
        { text: "fitting", ko: "들어맞다, 적합하다" }
      ],
      highlight: "enduring",
      translation: "하지만 부유한 국가들 전반에서 밀레니얼 세대에 대한 한층 더 오래 지속돼 온 고정관념은 이제 사실과 맞지 않게 됐다.",
      image: "resources/enduring.jpg",
      icon: "⏳",
      spark: "yellow",
      note: {
        phrase: "an enduring stereotype",
        text: "오랫동안 이어져 온 고정관념"
      }
    },
    {
      en: "whack",
      ko: "세게 때리다, 큰 타격을 주다",
      pos: "동사,명사",
      reading: "왝",
      ipa: "/wæk/",
      defs: ["강하게 때리다", "강타, 후려치기; 퍽, 철썩"],
      example: "The financial crisis of 2007-09 whacked them especially hard.",
      enRepeat: 2,
      texts: [

      ],
      highlight: "whacked",
      translation: "2007~2009년 금융위기는 이들에게(millennials) 특히 큰 타격을 줬다.",
      image: "resources/whack.jpg",
      icon: "💥",
      spark: "red",
      note: {
        phrase: "whack someone hard",
        text: "누군가에게 큰 타격을 주다<br>(비격식 표현)"
      }
    },
    {
      en: "demography",
      ko: "인구학, 인구 구조",
      pos: "명",
      reading: "디마그래피",
      ipa: "/ dɪ|mɑːɡrəfi /",
      defs: ["인구 변동[동태]", "인구 통계학"],
      example: "Rising millennial fortunes have two main causes : the economy and demography.",
      enRepeat: 2,
      texts: [
   
      ],
      highlight: "demography",
      translation: "밀레니얼 세대의 경제적 형편이 나아지는 데에는 경제와 인구 구조라는 두 가지 주요 원인이 있다.",
      image: "resources/demography.jpg",
      icon: "👥",
      spark: "yellow",
      note: {
        phrase: "the economy and demography",
        text: "경제와 인구 구조"
      }
    },
 
    {
      en: "bequest",
      ko: "유증, 유산",
      pos: "명",
      reading: "비퀘스트",
      ipa: "/bɪˈkwest/",
      defs: ["유증 (재산), 유산"],
      example: "We estimate that bequests now equal about 10% of GDP across the rich world every year.",
      enRepeat: 2,
      texts: [
     
      ],
      highlight: "bequests",
      translation: "이코노미스트는 현재 부유한 국가들 전반에서 매년 발생하는 유산 상속액이 GDP의 약 10%에 해당한다고 추산한다.",
      image: "resources/bequest.jpg",
      icon: "📜",
      spark: "yellow",
      note: {
        phrase: "leave a bequest",
        text: "유언으로 재산을 남기다"
      }
    },
    
      ]
};

/* =====================================================================
   아래는 렌더링 코드 — 수정할 필요 없습니다.
   ===================================================================== */

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightSentence(sentence, target) {
  if (!target) return sentence;
  const re = new RegExp(`\\b(${escapeRegExp(target)})\\b`, "i");
  return sentence.replace(re, "<mark>$1</mark>");
}

/**
 * 예문을 읽는 단위(단어)로 분할 — 공백은 별도 유지.
 * 하이라이트 sync가 TTS 진행에 맞춰 단어별로 이동.
 */
function splitExampleReadUnits(sentence) {
  const raw = String(sentence || "");
  if (!raw.trim()) return [];
  return raw.match(/\S+|\s+/g) || [raw];
}

/** 토큰에서 양끝 문장부호 제외한 비교용 코어 */
function exampleTokenCore(token) {
  return String(token || "")
    .replace(/^[^\p{L}\p{N}]+/gu, "")
    .replace(/[^\p{L}\p{N}]+$/gu, "")
    .toLowerCase();
}

/** gloss text → 비교용 단어 코어 배열 (다단어 구문 지원) */
function glossTextWordCores(text) {
  return String(text || "")
    .trim()
    .split(/\s+/)
    .map(exampleTokenCore)
    .filter(Boolean);
}

/**
 * 읽는 단위 span + 기존 단어 mark 유지
 * texts[]와 매칭되면 구문/단어 아래에 ko만 표시 (다단어 우선)
 */
function renderExampleHtml(sentence, target, glosses = []) {
  const units = splitExampleReadUnits(sentence);
  if (!units.length) return "";
  const glossList = Array.isArray(glosses) ? glosses : [];
  const patterns = glossList
    .map((g, gi) => ({
      gi,
      words: glossTextWordCores(g.text),
      ko: g.ko
    }))
    .filter((p) => p.words.length && p.ko)
    .sort((a, b) => b.words.length - a.words.length);

  const usedGloss = new Set();
  let out = "";
  let i = 0;

  while (i < units.length) {
    if (/^\s+$/.test(units[i])) {
      out += units[i];
      i += 1;
      continue;
    }

    let matched = null;
    for (const pat of patterns) {
      if (usedGloss.has(pat.gi)) continue;
      const covered = [];
      let ui = i;
      let wi = 0;
      while (wi < pat.words.length && ui < units.length) {
        if (/^\s+$/.test(units[ui])) {
          covered.push(ui);
          ui += 1;
          continue;
        }
        if (exampleTokenCore(units[ui]) !== pat.words[wi]) break;
        covered.push(ui);
        wi += 1;
        ui += 1;
      }
      while (covered.length && /^\s+$/.test(units[covered[covered.length - 1]])) {
        covered.pop();
      }
      if (wi === pat.words.length && covered.length) {
        matched = { gi: pat.gi, ko: pat.ko, covered };
        break;
      }
    }

    if (matched) {
      usedGloss.add(matched.gi);
      const inner = matched.covered
        .map((idx) => {
          if (/^\s+$/.test(units[idx])) return units[idx];
          return `<span class="ex-phrase">${highlightSentence(units[idx], target)}</span>`;
        })
        .join("");
      out +=
        `<span class="ex-gloss" data-text-index="${matched.gi}">` +
        `<span class="ex-gloss-word">${inner}</span>` +
        `<span class="ex-gloss-ko">${matched.ko}</span>` +
        `</span>`;
      i = matched.covered[matched.covered.length - 1] + 1;
    } else {
      out += `<span class="ex-phrase">${highlightSentence(units[i], target)}</span>`;
      i += 1;
    }
  }

  return out;
}

/** image 경로 우선, 없으면 resources/{en}.jpg */
function resolveWordImageSrc(word) {
  const explicit = String(word?.image || "").trim();
  if (explicit) return explicit.includes("/") ? explicit : `resources/${explicit}`;
  const en = String(word?.en || "").trim();
  if (!en) return "";
  return `resources/${en}.jpg`;
}

/** 예문 속 단어 아래 ko — texts: [{ text, ko }, ...] */
function getExampleTextGlosses(word) {
  const list = Array.isArray(word?.texts) ? word.texts : [];
  return list
    .map((item) => ({
      text: stripHtml(item?.text),
      ko: stripHtml(item?.ko)
    }))
    .filter((item) => item.text || item.ko);
}

function renderWord(word, index) {
  const defs = (word.defs || [])
    .map((d, i) => `<li class="${i === 0 && word.star ? "star" : ""}">${d}</li>`)
    .join("");

  const imageSrc = resolveWordImageSrc(word);
  const visual = imageSrc
    ? `<img src="${imageSrc}" alt="${word.en}" loading="lazy" decoding="async">`
    : (word.icon || "");

  const caption = word.caption ? `<span class="caption">${word.caption}</span>` : "";
  const note = word.note
    ? `<p class="note"><b>${word.note.phrase}</b><br>${word.note.text}</p>`
    : "";

  return `
    <article class="word">
      <div class="word-head">
        <span class="num">${index + 1}</span>
        <div class="word-titles">
          <span class="en">${word.en}</span>
          <span class="ko">${word.ko}</span>
        </div>
      </div>

      <p class="meta">
        <span class="pos">〈${word.pos}〉</span>
        <span class="meta-body">${word.reading}<span class="ipa">${word.ipa}</span></span>
      </p>

      <div class="body">
        <div class="left">
          <ul class="defs">${defs}</ul>
          <p class="example">${renderExampleHtml(word.example, word.highlight || word.en, getExampleTextGlosses(word))}</p>
          <p class="trans"><span class="trans-text">${word.translation}</span></p>
        </div>

        <div class="pic">
          <span class="spark ${word.spark || "red"}">⟋<br><span class="spark-mid">—</span><br>⟍</span>
          <div class="photo">${visual}</div>
          ${caption}
          ${note}
        </div>
      </div>
    </article>`;
}

/** 한 화면에 보일 단어 수 */
const WORDS_PER_SCREEN = 1;

/** 제목 — `<br>` / 줄바꿈으로 2줄 표시 */
function formatHeadline(raw) {
  const text = String(raw || "").trim();
  if (!text) return "";
  return text
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<span class="headline-line">${line}</span>`)
    .join("<br>");
}

/** 제목 font-size(px) — cardData.headlineFontPx 또는 길이 기반 auto */
function resolveHeadlineFontPx(data) {
  const raw = data?.headlineFontPx;
  if (raw !== "auto" && raw != null && String(raw).trim() !== "") {
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  const text = String(data?.headline || "")
    .replace(/<br\s*\/?>/gi, "")
    .replace(/\s+/g, "")
    .trim();
  const len = Array.from(text).length;
  if (len >= 36) return 26;
  if (len >= 30) return 28;
  if (len >= 24) return 30;
  if (len >= 18) return 32;
  return HEADLINE_FONT_PX_DEFAULT;
}

function chunkWords(words, size) {
  const list = Array.isArray(words) ? words : [];
  const pages = [];
  for (let i = 0; i < list.length; i += size) {
    pages.push(list.slice(i, i + size));
  }
  return pages;
}

/** 마지막 정리 화면 — 번호. en : ko (기존 en/ko 양식) */
function formatSummaryKo(ko) {
  return String(ko || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 비스듬한 V 체크 — 짧은 획 → 긴 획 순으로 칠해짐 */
function summaryCheckSvg(index) {
  const gid = `summary-check-grad-${index}`;
  return (
    `<svg class="summary-check" viewBox="0 0 22 32" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/>` +
    `<stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs>` +
    `<path class="summary-check-left" pathLength="100" stroke="url(#${gid})" d="M3.4 20.3L7 28"/>` +
    `<path class="summary-check-right" pathLength="100" stroke="url(#${gid})" d="M7 28L19.3 1.7"/>` +
    `</svg>`
  );
}

function renderSummaryScreen(words) {
  const list = Array.isArray(words) ? words : [];
  const rows = list
    .map((word, index) => {
      const en = String(word?.en || "").trim();
      const ko = formatSummaryKo(word?.ko);
      return `<div class="summary-row" data-summary-index="${index}">
        <span class="num">${index + 1}</span>
        <div class="summary-titles">
          <span class="en">${en}${summaryCheckSvg(index)}</span>
          <span class="ko">${ko}</span>
        </div>
      </div>`;
    })
    .join("");

  return `<section class="screen screen-summary" data-page="summary" id="summary-screen">
    <div class="summary-list">${rows}</div>
  </section>`;
}

function renderCard(data) {
  const card = document.getElementById("card");
  if (!card) return;

  const pages = chunkWords(data.words, WORDS_PER_SCREEN);
  const wordPageCount = pages.length || 1;
  const total = wordPageCount + 1; /* 마지막 정리 화면 포함 */

  const headerHtml = `<header class="card-header">
    <div class="top">
      <span class="tag">${data.tag || ""}</span>
      <span class="category">${data.category || ""}</span>
    </div>
    <div class="headline-wrap">
      <h1 class="headline" style="font-size:${resolveHeadlineFontPx(data)}px">${formatHeadline(data.headline)}</h1>
      <span class="head-icon">${data.headIcon || ""}</span>
    </div>
    <div class="page-bar">
      <span class="page-num" id="page-num">1 / ${total}</span>
    </div>
  </header>`;

  const screensHtml =
    pages
      .map((chunk, pageIndex) => {
        const startIndex = pageIndex * WORDS_PER_SCREEN;
        const wordsHtml = chunk.map((w, j) => renderWord(w, startIndex + j)).join("");
        return `<section class="screen" data-page="${pageIndex + 1}">
        <div class="words">${wordsHtml}</div>
      </section>`;
      })
      .join("") + renderSummaryScreen(data.words);

  card.innerHTML = `${headerHtml}<div class="screens" id="screens">${screensHtml}</div>`;
  bindScreenPageIndicator(total);
  /* 새로고침·스크롤 복원으로 마지막(8번) 화면이 위에 뜨지 않게 무조건 1번부터 */
  const screensEl = document.getElementById("screens");
  if (screensEl) {
    screensEl.scrollTop = 0;
    requestAnimationFrame(() => {
      screensEl.scrollTop = 0;
    });
  }
}

if (typeof history !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

function bindScreenPageIndicator(total) {
  const screensEl = document.getElementById("screens");
  const pageNumEl = document.getElementById("page-num");
  if (!screensEl || !pageNumEl) return;

  const update = () => {
    const screens = [...screensEl.querySelectorAll(".screen")];
    if (!screens.length) return;
    const top = screensEl.scrollTop;
    let best = 0;
    let bestDist = Infinity;
    screens.forEach((screen, i) => {
      const dist = Math.abs(screen.offsetTop - top);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    const isSummary = screens[best]?.classList.contains("screen-summary");
    pageNumEl.textContent = isSummary ? `정리 / ${total}` : `${best + 1} / ${total}`;
  };

  screensEl.addEventListener("scroll", update, { passive: true });
  update();
}

async function goToSummaryScreen() {
  const screensEl = document.getElementById("screens");
  const summary = document.getElementById("summary-screen");
  if (!screensEl || !summary) return;
  document.querySelectorAll(".word.is-speaking").forEach((el) => el.classList.remove("is-speaking"));
  await transitionToScreen(summary, { animate: true });
  if (isAutoplayRunning) await sleep(PAGE_CHANGE_WAIT_MS);
}

const SUMMARY_CHECK_DRAW_MS = 640;
const SUMMARY_CHECK_GAP_MS = 500;

/** 정리 화면: 영어만 낭독하면서 en 오른쪽 V를 같이 칠함 */
async function paintSummaryChecks(words) {
  const rows = document.querySelectorAll("#summary-screen .summary-row");
  if (!rows.length) return;
  const list = Array.isArray(words) ? words : [];

  for (let i = 0; i < rows.length; i += 1) {
    if (!isAutoplayRunning) break;
    const row = rows[i];
    const en = stripHtml(list[i]?.en);

    row.classList.add("is-checked");
    row.classList.remove("is-check-done");
    void row.offsetWidth;
    row.classList.add("is-drawing-check");

    const drawDone = sleep(SUMMARY_CHECK_DRAW_MS).then(() => {
      row.classList.remove("is-drawing-check");
      row.classList.add("is-check-done");
    });
    const speakDone = en ? playEnTTS(en, [1]) : Promise.resolve();

    await Promise.all([drawDone, speakDone]);
    if (!isAutoplayRunning) break;
    if (i < rows.length - 1) await sleep(SUMMARY_CHECK_GAP_MS);
  }
}

/* =====================================================================
   TTS / auto play — upgrades4·5와 동일 백엔드·랜덤 음성 1회 고정
   ===================================================================== */

const AUTOPLAY_START_WAIT_MS = 3000;
const EN_TTS_GAP_MS = 280;
const WORD_TO_EXAMPLE_GAP_MS = 420;
const BETWEEN_WORDS_GAP_MS = 520;
const EXAMPLE_REPEAT_GAP_MS = 380;
/** 예문(문장) 낭독 종료 후 다음 단어로 넘어가기 전 대기 */
const AFTER_SENTENCE_WAIT_MS = 3500;
/** 화면 전환: 스와이프 아웃 → 인 + 전환 후 낭독 전 대기 */
const PAGE_LEAVE_MS = 420;
const PAGE_ENTER_MS = 480;
const PAGE_CHANGE_WAIT_MS = 1000;
/** 영단어(en) 낭독 횟수 기본값 */
const EN_WORD_REPEAT_DEFAULT = 3;
/** 예문 낭독 횟수 기본값 (enRepeat 미지정 시) */
const EXAMPLE_REPEAT_DEFAULT = 1;
/** texts[] 영어→한글 사이 / 항목 사이 간격 */
const TEXT_GLOSS_ITEM_GAP_MS = 420;
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

/** 영어 TTS 음성 목록 — cardData.enVoice 로 선택 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D", // 남 · 미국
  2: "en-US-Chirp3-HD-Algenib", // 남 · 미국 허스키
  3: "en-US-Chirp3-HD-Enceladus", // 남 · 미국 허스키
  4: "en-US-Chirp-HD-F", // 여 · 미국
  5: "en-US-Chirp3-HD-Despina", // 여 · 미국
  6: "en-US-Chirp3-HD-Gacrux", // 여 · 미국 허스키
  7: "en-GB-Chirp3-HD-Zubenelgenubi", // 남 · 영국
  8: "en-GB-Chirp-HD-D", // 남 · 영국
  9: "en-GB-Neural2-B", // 남 · 영국
  10: "en-GB-Wavenet-N" // 여 · 영국
};

/* 실제 사용 음성은 cardData.enVoice 가 결정 (아래 줄은 초기값일 뿐, autoplay 시 덮어씀) */
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[Number(cardData.enVoice)] || EN_TTS_VOICE_IDS[1];

const KO_TTS_VOICE = 1;
const KO_TTS_VOICE_IDS = {
  1: "ko-KR",
  2: "ko-KR-Chirp3-HD-Achird",
  3: "ko-KR-Chirp3-HD-Achernar"
};
const EN_TO_KO_GAP_MS = 380;

let isAutoplayRunning = false;

const autoplayBtn = document.getElementById("autoplay-btn");
const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomInt(maxExclusive) {
  const n = Number(maxExclusive) || 0;
  if (n <= 0) return 0;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    return buf[0] % n;
  }
  return Math.floor(Math.random() * n);
}

/** 음성 풀 중 균등 랜덤. 가능하면 직전과 다른 목소리 */
function pickRandomVoiceFromPool(voices, currentId) {
  const list = Array.isArray(voices) ? voices.filter(Boolean) : [];
  if (!list.length) return currentId || "";
  if (list.length === 1) return list[0];
  const others = list.filter((v) => v !== currentId);
  const pool = others.length ? others : list;
  return pool[randomInt(pool.length)];
}

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = pickRandomVoiceFromPool(voices, activeEnTtsVoiceId);
  console.info("[upgrades62_text] EN voice (random)", activeEnTtsVoiceId);
  return activeEnTtsVoiceId;
}

/** cardData.enVoice — 1~10 / 음성ID / "random" */
function resolveConfiguredEnVoice() {
  const raw = cardData?.enVoice;
  if (raw === "random" || raw === "auto" || raw == null || raw === "") {
    return pickRandomEnTtsVoice();
  }
  if (typeof raw === "number" || /^\d+$/.test(String(raw).trim())) {
    const id = EN_TTS_VOICE_IDS[Number(raw)];
    if (id) {
      activeEnTtsVoiceId = id;
      console.info("[upgrades62_text] EN voice (json)", Number(raw), id);
      return id;
    }
  }
  const name = String(raw).trim();
  const known = Object.values(EN_TTS_VOICE_IDS);
  if (known.includes(name) || /^en-/i.test(name)) {
    activeEnTtsVoiceId = name;
    console.info("[upgrades62_text] EN voice (json)", name);
    return name;
  }
  console.warn("[upgrades62_text] unknown enVoice, fallback random:", raw);
  return pickRandomEnTtsVoice();
}

function resolveEnTtsVoiceId(langKey) {
  const values = Object.values(EN_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  const isEn = langKey === "en" || langKey === "en-US" || (typeof langKey === "string" && /^en-/i.test(langKey));
  if (!isEn) return langKey;
  return activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
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
  const langParam = isEn
    ? resolveEnTtsVoiceId(normalizedLang || "en-US")
    : resolveKoTtsVoiceId(normalizedLang || "ko-KR");
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

/** 한글 TTS용 텍스트 — 슬래시·쉼표 앞부분, ~ 치환 */
function getKoSpeakText(rawKo) {
  const text = stripHtml(rawKo);
  if (!text) return "";
  const beforeSlash = text.split("/")[0].trim();
  const firstExpr = beforeSlash.split(",")[0].trim();
  return firstExpr
    .replace(/~(?=로)/g, "무엇으")
    .replace(/~/g, "무엇");
}

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
  if (ttsAudioCache.has(url)) return ttsAudioCache.get(url);

  const loadPromise = (async () => {
    let lastErr;
    for (let attempt = 0; attempt < TTS_MAX_RETRIES; attempt += 1) {
      try {
        return await fetchTTSAudio(url);
      } catch (err) {
        lastErr = err;
        if (isNonRetryableTTSError(err) || attempt >= TTS_MAX_RETRIES - 1) throw err;
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

/** TTS 하이라이트용 발화 길이 추정 (글자·숫자 기준) */
function estimateSpokenHighlightWeight(text) {
  const raw = String(text || "").trim();
  if (!raw) return 1;
  return Math.max(1, raw.replace(/[^A-Za-z0-9']/g, "").length);
}

/** 예문 구문 span을 오디오 재생 진행에 맞춰 순차 하이라이트 */
function startPhraseHighlightSync(audio, phraseEls) {
  if (!audio || !Array.isArray(phraseEls) || !phraseEls.length) return () => {};
  const weights = phraseEls.map((el) => estimateSpokenHighlightWeight(el.textContent));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let current = -1;
  let raf = 0;

  const setActive = (idx) => {
    if (idx === current) return;
    if (current >= 0 && phraseEls[current]) phraseEls[current].classList.remove("is-reading");
    current = idx;
    if (current >= 0 && phraseEls[current]) phraseEls[current].classList.add("is-reading");
  };

  const clear = () => {
    phraseEls.forEach((el) => el.classList.remove("is-reading"));
    current = -1;
  };

  const update = () => {
    const dur = audio.duration;
    if (Number.isFinite(dur) && dur > 0) {
      const progress = Math.min(1, Math.max(0, audio.currentTime / dur));
      let cum = 0;
      let idx = phraseEls.length - 1;
      for (let i = 0; i < weights.length; i += 1) {
        const next = cum + weights[i] / total;
        if (progress < next || i === weights.length - 1) {
          idx = i;
          break;
        }
        cum = next;
      }
      setActive(idx);
    } else if (current < 0) {
      setActive(0);
    }
    if (!audio.paused && !audio.ended) raf = requestAnimationFrame(update);
  };

  clear();
  setActive(0);
  raf = requestAnimationFrame(update);
  return () => {
    cancelAnimationFrame(raf);
    clear();
  };
}

async function playAudioElement(audio, playbackRate = 1, phraseEls = null) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.currentTime = 0;

  const stopHighlight = startPhraseHighlightSync(audio, phraseEls);

  try {
    await audio.play();
  } catch (_) {
    stopHighlight();
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  stopHighlight();
  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

async function playBackendTTS(text, languageKey, playbackRate = 1, phraseEls = null) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate, phraseEls);
  } catch (_) {}
}

async function playEnTTS(text, rates = [1], phraseEls = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  for (let i = 0; i < rateList.length; i += 1) {
    if (i > 0) await sleep(EN_TTS_GAP_MS);
    await playBackendTTS(enText, voice, rateList[i], phraseEls);
  }
}

async function playKoTTS(rawKo) {
  const koText = getKoSpeakText(rawKo);
  if (!koText) return;
  await playBackendTTS(koText, "ko-KR", 1);
}

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function setKoVisible(wordIndex, visible) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  const koEl = wordEl?.querySelector(".ko");
  if (!koEl) return;
  koEl.classList.toggle("is-ko-hidden", !visible);
}

function preloadAutoplayAudio(words) {
  const voice = activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  (words || []).forEach((word) => {
    const en = stripHtml(word?.en);
    const example = stripHtml(word?.example);
    const ko = getKoSpeakText(word?.ko);
    if (en) loadBackendTTSAudio(en, voice).catch(() => {});
    if (example) loadBackendTTSAudio(example, voice).catch(() => {});
    if (ko) loadBackendTTSAudio(ko, "ko-KR").catch(() => {});
  });
}

function hideAutoplayButton() {
  autoplayBtn?.classList.add("is-hidden");
  if (autoplayBtn) {
    autoplayBtn.disabled = true;
    autoplayBtn.setAttribute("aria-hidden", "true");
  }
}

function showAutoplayButton() {
  if (!autoplayBtn) return;
  autoplayBtn.classList.remove("is-hidden");
  autoplayBtn.disabled = false;
  autoplayBtn.textContent = "auto play";
  autoplayBtn.setAttribute("aria-hidden", "false");
}

function getWordPageIndex(wordIndex) {
  return Math.floor(Number(wordIndex) / WORDS_PER_SCREEN);
}

const SCROLL_TOP_GAP = 20;

function clearScreenTransitionClasses() {
  const screensEl = document.getElementById("screens");
  screensEl?.classList.remove(
    "is-paging",
    "is-paging-out",
    "is-paging-hold",
    "is-paging-in"
  );
}

/**
 * 화면 전환: 전체 영역 페이드 아웃 → (안 보일 때) 스크롤 → 페이드 인
 * 옆·아래 화면이 비치지 않음
 */
async function transitionToScreen(nextScreen, { animate = true } = {}) {
  const screensEl = document.getElementById("screens");
  if (!screensEl || !nextScreen) return false;

  const targetTop = Math.max(0, nextScreen.offsetTop - SCROLL_TOP_GAP);
  const needScroll = Math.abs(screensEl.scrollTop - targetTop) > 12;
  if (!needScroll) return false;

  if (!animate) {
    screensEl.scrollTo({ top: targetTop, behavior: "auto" });
    return true;
  }

  screensEl.classList.add("is-paging", "is-paging-out");
  await sleep(PAGE_LEAVE_MS);
  if (!isAutoplayRunning) {
    clearScreenTransitionClasses();
    return true;
  }

  /* 완전히 투명한 동안 위치만 바꿈 */
  screensEl.classList.add("is-paging-hold");
  screensEl.classList.remove("is-paging-out");
  screensEl.scrollTo({ top: targetTop, behavior: "auto" });
  void screensEl.offsetWidth;

  screensEl.classList.remove("is-paging-hold");
  screensEl.classList.add("is-paging-in");
  await sleep(PAGE_ENTER_MS);

  clearScreenTransitionClasses();
  return true;
}

/** 낭독 대상 표시 + 필요 시 제자리 페이드 화면 전환 */
async function setSpeakingWord(index, { animatePage = true } = {}) {
  document.querySelectorAll(".word.is-speaking").forEach((el) => el.classList.remove("is-speaking"));
  const wordEls = document.querySelectorAll(".word");
  const el = wordEls[index];
  if (!el) return { pageChanged: false, scrolled: false };

  el.classList.add("is-speaking");
  const screen = el.closest(".screen");
  if (!screen) return { pageChanged: false, scrolled: false };

  const scrolled = await transitionToScreen(screen, { animate: animatePage });
  return { pageChanged: scrolled, scrolled };
}

/** enRepeat: 1|2|3 — 예문 낭독 횟수 */
function getExampleRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n)) return EXAMPLE_REPEAT_DEFAULT;
  return Math.max(1, Math.min(3, Math.round(n)));
}

function clearExamplePass(wordIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  const exampleEl = wordEl?.querySelector(".example");
  if (!exampleEl) return;
  exampleEl.removeAttribute("data-example-pass");
  exampleEl.classList.remove("is-reading-example");
  exampleEl.querySelectorAll(".ex-phrase.is-reading").forEach((el) => el.classList.remove("is-reading"));
}

function setExamplePass(wordIndex, pass) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  const exampleEl = wordEl?.querySelector(".example");
  if (!exampleEl) return;
  exampleEl.classList.add("is-reading-example");
  exampleEl.setAttribute("data-example-pass", String(pass));
}

function getExamplePhraseEls(wordIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  if (!wordEl) return [];
  return [...wordEl.querySelectorAll(".example .ex-phrase")];
}

/** 예문을 enRepeat회 낭독. 회차마다 테두리 색 변경 + 구문 하이라이트 */
async function playExampleWithRepeats(wordIndex, word) {
  const example = stripHtml(word?.example);
  if (!example) return;
  const times = getExampleRepeatCount(word);
  const phraseEls = getExamplePhraseEls(wordIndex);
  for (let pass = 1; pass <= times; pass += 1) {
    if (!isAutoplayRunning) break;
    setExamplePass(wordIndex, pass);
    await playEnTTS(example, [1], phraseEls);
    if (pass < times && isAutoplayRunning) await sleep(EXAMPLE_REPEAT_GAP_MS);
  }
}

function clearExampleTextActive(wordIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  /* is-revealed 는 유지 — 한 번 보인 ko는 계속 표시 */
  wordEl?.querySelectorAll(".ex-gloss.is-active").forEach((el) => el.classList.remove("is-active"));
}

function setExampleTextActive(wordIndex, textIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  if (!wordEl) return;
  wordEl.querySelectorAll(".ex-gloss").forEach((el) => {
    el.classList.toggle("is-active", Number(el.dataset.textIndex) === textIndex);
  });
}

function revealExampleGloss(wordIndex, textIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  if (!wordEl) return;
  wordEl.querySelectorAll(".ex-gloss").forEach((el) => {
    if (Number(el.dataset.textIndex) === textIndex) el.classList.add("is-revealed");
  });
}

/**
 * 예문 enRepeat 낭독 후: texts[] ko를 한 항목씩 노출만 (낭독 없음)
 */
async function playExampleTextGlosses(wordIndex, word) {
  const glosses = getExampleTextGlosses(word);
  if (!glosses.length) return;

  for (let i = 0; i < glosses.length; i += 1) {
    if (!isAutoplayRunning) break;
    setExampleTextActive(wordIndex, i);
    revealExampleGloss(wordIndex, i);
    await sleep(TEXT_GLOSS_ITEM_GAP_MS);
  }
  clearExampleTextActive(wordIndex);
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  isAutoplayRunning = true;

  const words = Array.isArray(cardData.words) ? cardData.words : [];
  if (!words.length) {
    isAutoplayRunning = false;
    return;
  }

  const voice = resolveConfiguredEnVoice();
  preloadAutoplayAudio(words);
  if (autoplayBtn) autoplayBtn.title = `voice: ${voice}`;

  /* 버튼(bar)은 즉시 숨기고, 3초 뒤 낭독 시작 */
  hideAutoplayButton();
  await sleep(AUTOPLAY_START_WAIT_MS);

  let lastPage = -1;
  try {
    for (let i = 0; i < words.length; i += 1) {
      if (!isAutoplayRunning) break;
      const word = words[i];
      const page = getWordPageIndex(i);
      const pageChanged = page !== lastPage;

      /* 화면 전환: 제자리 페이드 아웃 → 스크롤 → 페이드 인 */
      const { scrolled } = await setSpeakingWord(i, { animatePage: lastPage >= 0 });
      if (pageChanged && lastPage >= 0 && isAutoplayRunning) {
        await sleep(PAGE_CHANGE_WAIT_MS);
      }
      lastPage = page;
      if (!isAutoplayRunning) break;

      const en = stripHtml(word.en);
      const example = stripHtml(word.example);

      /* en 3회 → 한글은 표시만 (낭독 안 함) → 예문 */
      setKoVisible(i, true);

      if (en) {
        const enRates = Array.from({ length: EN_WORD_REPEAT_DEFAULT }, () => 1);
        await playEnTTS(en, enRates);
      }
      if (!isAutoplayRunning) break;

      if (en && example) await sleep(WORD_TO_EXAMPLE_GAP_MS);
      if (example) await playExampleWithRepeats(i, word);
      clearExamplePass(i);

      /* 예문 enRepeat 후: texts[] 영어→한글 한 단어씩 */
      if (isAutoplayRunning && getExampleTextGlosses(word).length) {
        await sleep(WORD_TO_EXAMPLE_GAP_MS);
        if (isAutoplayRunning) await playExampleTextGlosses(i, word);
      }

      /* 문장 끝난 뒤 3.5초 대기 후 다음 단어(또는 정리 화면)로 */
      if (isAutoplayRunning) {
        await sleep(AFTER_SENTENCE_WAIT_MS);
      }
    }

    /* 마지막: 정리 화면 → 영어 낭독과 함께 V 순서대로 칠하기 */
    if (isAutoplayRunning) {
      await goToSummaryScreen();
      if (isAutoplayRunning) await paintSummaryChecks(words);
    }
  } finally {
    document.querySelectorAll(".word.is-speaking").forEach((el) => el.classList.remove("is-speaking"));
    document.querySelectorAll(".ko.is-ko-hidden").forEach((el) => el.classList.remove("is-ko-hidden"));
    document.querySelectorAll(".ex-phrase.is-reading").forEach((el) => el.classList.remove("is-reading"));
    document.querySelectorAll(".ex-gloss.is-active").forEach((el) => el.classList.remove("is-active"));
    document.querySelectorAll(".example.is-reading-example").forEach((el) => {
      el.classList.remove("is-reading-example");
      el.removeAttribute("data-example-pass");
    });
    clearScreenTransitionClasses();
    document.getElementById("screens")?.classList.remove("is-paging");
    isAutoplayRunning = false;
    /* 종료 후에도 autoplay 버튼은 숨김 유지 */
    hideAutoplayButton();
  }
}

renderCard(cardData);
autoplayBtn?.addEventListener("click", runAutoplay);
