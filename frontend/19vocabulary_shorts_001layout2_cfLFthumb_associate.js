const PAGE_TITLE_MAIN = "신문기사에서 배우는 어휘";
/** 제목(부제) — 줄별로 수정. LINE2 비우면 layout2처럼 자동 2줄 분할. [단어]는 주황 강조 */
const PAGE_TITLE_SUB_LINE1 = "CXMT, 스마트폰 및 AI 기술 발전과  ";
const PAGE_TITLE_SUB_LINE2 = " 시장 점유율 상승세 강조";
const PAGE_TITLE_PUBLISHER = "The Wall Street Journal";
const PAGE_TITLE_DATE = "2026/09/07";
/** 부제 최대 글자 크기 (autofit이 이 값 이하로 맞춤) */
const PAGE_TITLE_SUB_FONT_PX = 34;
/** 부제 상자 높이(px) — 38px 2줄 + line-height 맞춤용 */
const PAGE_TITLE_SUB_BOX_HEIGHT_PX = 90;

/** 쇼츠 thumb 전용 — cfLF 대비 제목·en·ko·cf.영어 각 +4px */
const THUMB_FONT_BOOST_PX = 4;
const THUMB_TITLE_MAIN_FONT_PX = 15 + THUMB_FONT_BOOST_PX;
const THUMB_EN_MAIN_EXTRA_PX = 1 + THUMB_FONT_BOOST_PX;
const THUMB_KO_EXTRA_PX = THUMB_FONT_BOOST_PX;
const THUMB_CF_EN_EXTRA_PX = 4 + THUMB_FONT_BOOST_PX;

/** 쇼츠 상단 배너 (cfLFthumb 전용) */
const SHORTS_BANNER_PART_A = "시사";
const SHORTS_BANNER_PART_B = "영단어";


// "[트럼프 대통령], 암살 피하려 기내식 [트럭에 숨어] 군용기 갈아타";
// const PAGE_TITLE_META = "(BBC / WSJ | 2026/08/11)";
// const PAGE_TITLE_MAIN = "신문기사에서 배우는 어휘";
// /** 제목(부제) — `[단어]`는 주황 강조 (대괄호는 화면에서 제거) */
// const PAGE_TITLE_SUB =
//   "25,000달러의 피해를 입힌 [‘배심원 소환’ 사기 극]";
// const PAGE_TITLE_META = "(The Wall Street Journal | 2026/08/08)";



function escapeTitleHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `[강조할 단어]` → title-hl span (대괄호는 화면에서 제거) */
function formatTitleLineMarks(text) {
  const raw = String(text || "");
  let out = "";
  let i = 0;
  while (i < raw.length) {
    const open = raw.indexOf("[", i);
    if (open < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf("]", open + 1);
    if (close < 0) {
      out += escapeTitleHtml(raw.slice(i));
      break;
    }
    out += escapeTitleHtml(raw.slice(i, open));
    const marked = raw.slice(open + 1, close);
    out += `<span class="title-hl">${escapeTitleHtml(marked)}</span>`;
    i = close + 1;
  }
  return out;
}

/** 라틴/한글 혼용 제목의 시각 폭 추정 (칸 위·아래 균등 분할용) */
function estimateTitleCharWidth(ch) {
  if (!ch || /\s/.test(ch)) return 0.35;
  if (/[A-Za-z0-9]/.test(ch)) return 0.62;
  if (/[()[\]{}.,'":;!?/\\-]/.test(ch)) return 0.4;
  return 1;
}

/** 제목 부제를 위·아래 시각 폭이 균등하도록 항상 2줄로 나눔 (layout2와 동일) */
function splitTitleSubIntoTwoLines(raw) {
  const text = String(raw || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return ["", ""];

  const chars = Array.from(text);
  const n = chars.length;
  if (n <= 2) return [text, ""];

  const widths = chars.map(estimateTitleCharWidth);
  const totalW = widths.reduce((a, b) => a + b, 0);
  const prefixW = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i += 1) prefixW[i + 1] = prefixW[i] + widths[i];

  const depthBefore = new Array(n + 1).fill(0);
  let depth = 0;
  for (let i = 0; i < n; i += 1) {
    depthBefore[i] = depth;
    const ch = chars[i];
    if (ch === "(" || ch === "[" || ch === "{") depth += 1;
    else if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
  }
  depthBefore[n] = depth;

  const lo = Math.max(1, Math.floor(n * 0.28));
  const hi = Math.min(n - 1, Math.ceil(n * 0.72));

  const softBreaks = [];
  for (let i = lo; i <= hi; i += 1) {
    const prev = chars[i - 1] || "";
    const curr = chars[i] || "";
    const afterSpace = /\s/.test(prev);
    const afterPunct = /[,?!.，。？！、…'")\]]/.test(prev);
    const beforeSpace = /\s/.test(curr);
    if (!(afterSpace || afterPunct || beforeSpace)) continue;
    let idx = beforeSpace && !afterSpace ? i + 1 : i;
    if (idx < 1 || idx >= n) idx = i;
    if (depthBefore[idx] > 0) continue;
    softBreaks.push(idx);
  }

  const pickBest = (indices) => {
    let bestIdx = Math.floor(n / 2);
    let bestScore = Infinity;
    for (const i of indices) {
      const score = Math.abs(prefixW[i] - (totalW - prefixW[i]));
      if (score < bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }
    return bestIdx;
  };

  const bestIdx = softBreaks.length
    ? pickBest(softBreaks)
    : pickBest(Array.from({ length: hi - lo + 1 }, (_, k) => lo + k));

  const line1 = chars.slice(0, bestIdx).join("").replace(/\s+/g, " ").trim();
  const line2 = chars.slice(bestIdx).join("").replace(/\s+/g, " ").trim();
  if (!line2) {
    const mid = Math.floor(n / 2);
    return [
      chars.slice(0, mid).join("").trim(),
      chars.slice(mid).join("").trim()
    ];
  }
  return [line1, line2];
}

function resolveTitleSubLines() {
  const manual1 = String(PAGE_TITLE_SUB_LINE1 || "").trim();
  const manual2 = String(PAGE_TITLE_SUB_LINE2 || "").trim();
  if (manual1 && manual2) return [manual1, manual2];
  if (manual1) return splitTitleSubIntoTwoLines(manual1);
  if (manual2) return splitTitleSubIntoTwoLines(manual2);
  return ["", ""];
}

function buildPageTitleMeta() {
  const publisher = formatTitleLineMarks(String(PAGE_TITLE_PUBLISHER || "").trim());
  const date = escapeTitleHtml(String(PAGE_TITLE_DATE || "").trim());
  if (!publisher && !date) return "";
  if (publisher && date) return `(${publisher} | ${date})`;
  return `(${publisher || date})`;
}

function buildPageTitleHtml() {
  const [raw1, raw2] = resolveTitleSubLines();
  const line1 = formatTitleLineMarks(raw1);
  const line2 = formatTitleLineMarks(raw2);
  const meta = buildPageTitleMeta();
  const subHtml = raw2
    ? `<span class="title-line">${line1}</span><span class="title-line">${line2}</span>`
    : `<span class="title-line">${line1}</span>`;
  const metaHtml = meta ? `<span class="title-meta">${meta}</span>` : "";
  return `<span class="title-main">${PAGE_TITLE_MAIN}</span>
<span class="title-sub-box" aria-hidden="false">
  <span class="title-accent title-sub">${subHtml}</span>
</span>${metaHtml}
<span class="progress-wrap" aria-live="polite">
  <span class="progress-label" id="progress-label">진행도 0 / 5</span>
  <span class="progress-track">
    <span class="progress-fill" id="progress-fill">
      <span class="progress-runner" id="progress-runner" data-motion="scooter" aria-hidden="true">🛵</span>
      <span class="progress-pct" id="progress-pct">0%</span>
    </span>
  </span>
</span>`;
}

/** 글자 크기·상자 높이에 맞는 부제 line-height (2줄이 잘리지 않게) */
function resolveTitleSubLineHeight(fontPx, lineCount, boxHeight) {
  const size = Math.max(10, Number(fontPx) || 24);
  const lines = Math.max(1, Number(lineCount) || 1);
  const boxH = Number(boxHeight) || 0;
  if (boxH > 0) {
    const target = (boxH - 4) / (size * lines);
    return Math.min(1.22, Math.max(1.06, Math.round(target * 1000) / 1000));
  }
  if (size >= 36) return 1.08;
  if (size >= 32) return 1.1;
  if (size >= 28) return 1.14;
  return 1.22;
}

/** 보이지 않는 2줄 상자에 맞춰 title-sub 글자 크기·line-height 자동 조절 */
function fitTitleSubToBox() {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  if (!box || !sub) return;

  const lines = Array.from(sub.querySelectorAll(".title-line"));
  if (!lines.length) return;

  const boxHeightPx = Math.max(
    56,
    Number(PAGE_TITLE_SUB_BOX_HEIGHT_PX) ||
      Number.parseFloat(getComputedStyle(box).height) ||
      84
  );
  box.style.height = `${boxHeightPx}px`;

  const maxPx = Math.max(
    10,
    Number(PAGE_TITLE_SUB_FONT_PX) ||
      Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-max-size")) ||
      34
  );
  const minPx =
    Number.parseFloat(getComputedStyle(box).getPropertyValue("--title-sub-min-size")) || 15;
  box.style.setProperty("--title-sub-max-size", String(maxPx));

  const applySubMetrics = (size) => {
    const lh = resolveTitleSubLineHeight(size, lines.length, boxHeightPx);
    sub.style.fontSize = `${size}px`;
    sub.style.lineHeight = String(lh);
    box.style.setProperty("--title-sub-line-height", String(lh));
  };

  const fits = (size) => {
    applySubMetrics(size);
    void sub.offsetWidth;
    const boxW = box.clientWidth;
    const boxH = box.clientHeight;
    if (boxH > 0 && sub.scrollHeight > boxH + 1) return false;
    return lines.every((line) => line.scrollWidth <= boxW + 1);
  };

  let lo = minPx;
  let hi = maxPx;
  let best = minPx;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (fits(mid)) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  applySubMetrics(best);
}

function applyPageTitle() {
  const bannerTitle = document.querySelector(".shorts-banner__title");
  if (bannerTitle) {
    bannerTitle.innerHTML =
      `<span class="shorts-banner__part">${escapeTitleHtml(SHORTS_BANNER_PART_A)}</span>` +
      `<span class="shorts-banner__word">${escapeTitleHtml(SHORTS_BANNER_PART_B)}</span>`;
  }
  if (!pageTitleEl) return;
  titleFxOriginalSubHtml = "";
  pageTitleEl.innerHTML = buildPageTitleHtml();
  requestAnimationFrame(() => {
    fitTitleSubToBox();
    requestAnimationFrame(() => {
      fitTitleSubToBox();
      if (titleFxSampleReady) playTitleFx(titleFxCurrent, { skipFit: true });
    });
  });
}

const TITLE_FX_HOOK_TEXT = "전쟁 자금";
const TITLE_FX_SAMPLES = [
  { id: "off", name: "off" },
  { id: "type", name: "1. 타자" },
  { id: "words", name: "2. 단어 낙하" },
  { id: "punch", name: "3. 펀치라인 ★" },
  { id: "wipe", name: "4. 와이프" },
  { id: "hook", name: "5. 훅 단어 ★" },
  { id: "paint", name: "6. 페인트" },
  { id: "slam", name: "7. 슬램" },
  { id: "glitch", name: "8. 글리치" },
  { id: "neon", name: "9. 네온" },
  { id: "smoke", name: "10. 번/스모크" },
  { id: "blur", name: "11. 블러→선명" },
  { id: "pulse", name: "12. 펄스" }
];

let titleFxSampleReady = false;
let titleFxCurrent = "off";
let titleFxOriginalSubHtml = "";
const titleFxTimers = [];

function clearTitleFxTimers() {
  titleFxTimers.forEach((id) => window.clearTimeout(id));
  titleFxTimers.length = 0;
}

function titleFxLater(ms, fn) {
  const id = window.setTimeout(fn, ms);
  titleFxTimers.push(id);
  return id;
}

function splitTitleFxChars(node, into, inHl) {
  if (node.nodeType === Node.TEXT_NODE) {
    Array.from(node.textContent || "").forEach((ch) => {
      const s = document.createElement("span");
      s.className = "title-fx-ch";
      if (inHl) s.classList.add("title-hl");
      if (/\s/.test(ch)) s.classList.add("is-space");
      s.textContent = ch;
      into.append(s);
    });
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const hl = inHl || node.classList.contains("title-hl");
  Array.from(node.childNodes).forEach((child) => splitTitleFxChars(child, into, hl));
}

function prepareTitleFxMarkup() {
  const lines = document.querySelectorAll(".page-header .title-sub .title-line");
  lines.forEach((line, idx) => {
    line.classList.toggle("l1", idx === 0);
    line.classList.toggle("l2", idx === 1);
    const chars = document.createElement("span");
    Array.from(line.childNodes).forEach((n) => splitTitleFxChars(n, chars, false));
    const inner = document.createElement("span");
    inner.className = "title-fx-inner";
    let word = null;
    Array.from(chars.childNodes).forEach((ch) => {
      if (ch.classList.contains("is-space")) {
        word = null;
        inner.append(ch);
        return;
      }
      if (!word) {
        word = document.createElement("span");
        word.className = "title-fx-word";
        inner.append(word);
      }
      word.append(ch);
    });
    line.replaceChildren(inner);
  });
}

function resetTitleFxBox(box, sub) {
  box.classList.remove("title-fx-open", "is-fx-hook", "settle", "show", "go");
  sub.className = "title-accent title-sub";
  box.querySelector(".title-fx-hook")?.remove();
  sub.querySelector(".title-fx-caret")?.remove();
}

function playTitleFx(id, opts = {}) {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  if (!box || !sub) return;

  clearTitleFxTimers();
  if (!titleFxOriginalSubHtml) titleFxOriginalSubHtml = sub.innerHTML;
  else sub.innerHTML = titleFxOriginalSubHtml;
  resetTitleFxBox(box, sub);
  titleFxCurrent = id;

  if (!opts.skipFit) fitTitleSubToBox();
  if (id === "off") {
    box.classList.remove("is-title-fx-hold");
    return;
  }
  prepareTitleFxMarkup();
  box.classList.add("title-fx-open");

  const run = {
    type: playTitleFxType,
    words: playTitleFxWords,
    punch: playTitleFxPunch,
    wipe: playTitleFxWipe,
    hook: playTitleFxHook,
    paint: playTitleFxPaint,
    slam: playTitleFxSlam,
    glitch: playTitleFxGlitch,
    neon: playTitleFxNeon,
    smoke: playTitleFxSmoke,
    blur: playTitleFxBlur,
    pulse: playTitleFxPulse
  }[id];
  if (run) run(box, sub);
  box.classList.remove("is-title-fx-hold");
}

function getTitleFxDurationMs(id, sub) {
  if (id === "off") return 0;
  if (id === "type") {
    const n = sub?.querySelectorAll(".title-fx-ch").length || 28;
    return 180 + n * 32 + 220;
  }
  if (id === "words") {
    const n = sub?.querySelectorAll(".title-fx-word").length || 6;
    return 90 + n * 110 + 360;
  }
  return (
    {
      punch: 980,
      wipe: 820,
      hook: 1320,
      paint: 1280,
      slam: 720,
      glitch: 1080,
      neon: 1280,
      smoke: 1220,
      blur: 1480,
      pulse: 880
    }[id] || 900
  );
}

function setTitleFxDockHidden(hidden) {
  const dock = document.getElementById("title-fx-dock");
  if (dock) dock.hidden = hidden;
}

function holdTitleFxForAutoplay() {
  const box = document.querySelector(".page-header .title-sub-box");
  const sub = box?.querySelector(".title-sub");
  clearTitleFxTimers();
  if (sub && titleFxOriginalSubHtml) sub.innerHTML = titleFxOriginalSubHtml;
  if (box && sub) resetTitleFxBox(box, sub);
  box?.classList.add("is-title-fx-hold");
  fitTitleSubToBox();
}

async function playSelectedTitleFxForAutoplay() {
  const box = document.querySelector(".page-header .title-sub-box");
  playTitleFx(titleFxCurrent);
  const sub = box?.querySelector(".title-sub");
  await sleep(getTitleFxDurationMs(titleFxCurrent, sub));
}

function playTitleFxType(_box, sub) {
  sub.classList.add("is-fx-type");
  const chars = Array.from(sub.querySelectorAll(".title-fx-ch"));
  const caret = document.createElement("span");
  caret.className = "title-fx-caret";
  let i = 0;
  const tick = () => {
    if (i >= chars.length) {
      caret.remove();
      return;
    }
    const ch = chars[i];
    ch.classList.add("is-on");
    ch.after(caret);
    i += 1;
    titleFxLater(i === 1 ? 80 : 32, tick);
  };
  titleFxLater(180, tick);
}

function playTitleFxWords(_box, sub) {
  sub.classList.add("is-fx-words");
  const words = Array.from(sub.querySelectorAll(".title-fx-word"));
  words.forEach((word, idx) => {
    titleFxLater(90 + idx * 110, () => word.classList.add("is-on"));
  });
}

function playTitleFxPunch(_box, sub) {
  sub.classList.add("is-fx-punch");
  titleFxLater(420, () => sub.classList.add("show"));
}

function playTitleFxWipe(_box, sub) {
  sub.classList.add("is-fx-wipe");
  requestAnimationFrame(() => {
    requestAnimationFrame(() => sub.classList.add("go"));
  });
}

function playTitleFxHook(box, sub) {
  box.classList.add("is-fx-hook");
  const hook = document.createElement("span");
  hook.className = "title-fx-hook";
  hook.textContent = TITLE_FX_HOOK_TEXT;
  const fitted = Number.parseFloat(getComputedStyle(sub).fontSize) || 34;
  hook.style.fontSize = `${Math.round(fitted * 1.22)}px`;
  box.append(hook);
  titleFxLater(80, () => hook.classList.add("show"));
  titleFxLater(720, () => box.classList.add("settle"));
}

function playTitleFxPaint(_box, sub) {
  sub.classList.add("is-fx-paint");
  titleFxLater(120, () => sub.classList.add("go"));
}

function playTitleFxSlam(_box, sub) {
  sub.classList.add("is-fx-slam");
  titleFxLater(60, () => sub.classList.add("go"));
}

function playTitleFxGlitch(_box, sub) {
  sub.classList.add("is-fx-glitch");
  titleFxLater(50, () => sub.classList.add("go"));
}

function playTitleFxNeon(_box, sub) {
  sub.classList.add("is-fx-neon");
  titleFxLater(80, () => sub.classList.add("go"));
}

function playTitleFxSmoke(_box, sub) {
  sub.classList.add("is-fx-smoke");
  titleFxLater(70, () => sub.classList.add("go"));
}

function playTitleFxBlur(_box, sub) {
  sub.classList.add("is-fx-blur");
  titleFxLater(90, () => sub.classList.add("go"));
}

function playTitleFxPulse(_box, sub) {
  sub.classList.add("is-fx-pulse");
  titleFxLater(50, () => sub.classList.add("go"));
}

function initTitleFxSample() {
  const list = document.getElementById("title-fx-list");
  const replay = document.getElementById("title-fx-replay");
  if (!list) return;
  titleFxSampleReady = true;
  list.replaceChildren();
  TITLE_FX_SAMPLES.forEach((fx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "title-fx-dock__btn" + (fx.id === titleFxCurrent ? " is-on" : "");
    btn.textContent = fx.name;
    btn.addEventListener("click", () => {
      list.querySelectorAll(".title-fx-dock__btn").forEach((el) => {
        el.classList.toggle("is-on", el === btn);
      });
      playTitleFx(fx.id);
    });
    list.append(btn);
  });
  replay?.addEventListener("click", () => playTitleFx(titleFxCurrent));
}

function applyThumbTypography() {
  const styleId = "cflf-thumb-typography";
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement("style");
    style.id = styleId;
    document.head.appendChild(style);
  }
  style.textContent = `
    body.shorts-thumb .page-header .title-main {
      font-size: ${THUMB_TITLE_MAIN_FONT_PX}px !important;
    }
    body.shorts-thumb .en-main-text,
    body.shorts-thumb .en-preview {
      font-size: calc(1em + ${THUMB_EN_MAIN_EXTRA_PX}px);
      color: var(--color-en-warm);
      text-shadow: var(--shadow-en-warm);
    }
    body.shorts-thumb .ko-text {
      font-size: calc(0.88em + ${THUMB_KO_EXTRA_PX}px);
      color: var(--color-ko-word);
      text-shadow: var(--shadow-ko-word);
    }
    body.shorts-thumb .pron-row .pron-text,
    body.shorts-thumb .pron-row .pron-ipa {
      color: var(--color-progress-label);
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.35);
    }
    body.shorts-thumb .word-line,
    body.shorts-thumb .word-line .en-row,
    body.shorts-thumb .word-line .ko-text,
    body.shorts-thumb .pron-row {
      line-height: 1.2;
    }
    body.shorts-thumb .pron-line {
      margin-top: 0.08em;
      color: var(--color-en-warm);
      text-shadow: var(--shadow-en-warm);
    }
    body.shorts-thumb .cf-note {
      font-size: calc(0.82em + ${THUMB_CF_EN_EXTRA_PX}px);
      line-height: 1.5;
      color: var(--color-en-warm);
      margin-left: 0;
      position: relative;
    }
    body.shorts-thumb .cf-note .cf-abbr {
      position: absolute;
      left: 0;
      top: 0;
      transform: translateX(calc(-100% - 0.28em));
      white-space: nowrap;
    }
    body.shorts-thumb .cf-note .cf-body {
      margin-left: 0;
    }
    body.shorts-thumb .cf-note .cf-abbr,
    body.shorts-thumb .cf-note .cf-en-paren,
    body.shorts-thumb .cf-note .cf-en-word {
      color: var(--color-en-warm);
      text-shadow: var(--shadow-en-warm);
    }
    body.shorts-thumb .cf-note .cf-ko-paren,
    body.shorts-thumb .cf-note .cf-source {
      font-size: calc(1em + 2px - 2px);
      line-height: 1.5;
      letter-spacing: -0.01em;
      color: #C9D6E4;
      font-weight: 400;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }
    body.shorts-thumb .cf-note .cf-ko-paren .cf-inline-en-paren {
      color: #F3B4C6;
      font-weight: inherit;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
    }
    body.shorts-thumb .cf-note .cf-gloss-paren,
    body.shorts-thumb .cf-note .cf-en-paren .cf-gloss-paren {
      display: inline;
      color: #C9D6E4;
      font-weight: 400;
      font-size: calc(1em + 2px - 4px);
      line-height: inherit;
      letter-spacing: -0.01em;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }
  `;
}

const VISIBLE_COUNT = 9;
/** 영어 미리보기: 앞 N글자 공개, 나머지는 _ */
const EN_PREVIEW_LETTERS = 3;
/** 진행 바 테마 — bar마다 이모지 1개, autoplay마다 랜덤 */
const PROGRESS_BAR_THEMES = [
  {
    id: "scooter",
    stages: [
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"],
      ["🛵", "scooter"]
    ]
  },
  {
    id: "car",
    stages: [
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"],
      ["🚗", "car"]
    ]
  },
  {
    id: "train",
    stages: [
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"],
      ["🚂", "train"]
    ]
  },
  
];
let activeProgressBarTheme = PROGRESS_BAR_THEMES[0];

// ============================================================
// 패스 / BGM (json1 바로 위 — 여기서 수동 조정)
//   EN_KO_PASS_COUNT:
//     1 = 1패스(한글→영어)만 하고 바로 Review 퀴즈
//     2 = 1패스 후 2패스(영어→한글)까지 하고 퀴즈
//   BGM_ENABLED: false=음악 끔 / true=켬
//   BGM_START_SEC: 초 단위.  80=1:20  90=1:30  100=1:40  110=1:50
//   null 이면 예문 수 자동 (6개→1:20, 1개 늘면 -10초 / 줄면 +10초)
// ============================================================
const EN_KO_PASS_COUNT = 1; // ← 1=퀴즈 바로 / 2=2패스까지
const BGM_ENABLED = false; // ← 기본 off / true=켬 (화면 BGM 버튼으로도 토글)
const BGM_START_SEC = 63; // ← 현재 시작: 0:45이 70개 단어 용입니다. 5분 55초 5분 영상에 70단어면 단어당 약 4초. 
const BGM_AUTO_BASE_WORDS = 6;
const BGM_AUTO_BASE_SEC = 80; // 1:20 @ 6단어
const BGM_AUTO_SEC_PER_WORD = 10;
/** 런타임 BGM on/off — 기본값은 BGM_ENABLED */
let bgmEnabled = BGM_ENABLED;

///영어 단어 1회 + cf 예문 읽기 (cf는 enRepeat 횟수만큼)
// 가독성을 위해 cf 내부는 영어 구문 (한글 번역) 형태로 직관적으로 매칭  "cfSpeakRates": [1.0, 0.85],
// cf 발음 반복 (단어마다 지정):
//   "enRepeat": 2              → cf 정상 속도로 2번  "enRepeat": 5,
//   "enRepeat": 0              → cf 읽지 않음
//   "cfSpeakRates": [1, 0.85]  → cf 1번 + 느리게 1번 (배열 길이 = 횟수)
// cf 추가 밑줄 (단어 en 자동 밑줄과 별도):
//   "cfUnderline": "has been thrust upon"
//   "cfUnderline": ["has been thrust upon", "thrust upon"]
// 단어 전환 swipe (없으면 단어마다 랜덤):
//   "swipe": "swipe-up" | "swipe-left" | "flip-h" | "flip-v" | "pop" | "zoom" | "glitch"
const json1 = 

[
  { "title1": "" },
 
  
  {
    "en": "reaffirm",
    "ko": "재확인하다, 다시 확고히 밝히다",
    "hint": "",
    "pronunciation": "리어펌",
    "ipa": "/ˌriːəˈfɜːrm/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Executives reaffirmed plans to invest in next-generation technologies. (경영진은 차세대 기술에 투자할 계획을 재확인했습니다(reaffirmed).)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "cyclical",
    "ko": "경기순환의, 주기적으로 변동하는",
    "hint": "",
    "pronunciation": "시클리컬",
    "ipa": "/ˈsɪklɪkəl/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The company seeks to move beyond the highly cyclical commodity memory market. (회사는 경기 변동성이 매우 큰 (the highly cyclical) 범용 메모리 시장을 벗어나려 하고 있습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "battleground",
    "ko": "싸움터",
    "hint": "",
    "pronunciation": "배틀그라운드",
    "ipa": "/ˈbætəlɡraʊnd/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The smartphone memory market is increasingly viewed as a key battleground for AI-enabled devices. (스마트폰 메모리 시장은 AI 기기의 핵심 격전지로 (as a key battleground)로 점점 더 여겨지고 있습니다(increasingly viewed).)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "deployment",
    "ko": "배치, 도입",
    "hint": "",
    "pronunciation": "디플로이먼트",
    "ipa": "/dɪˈplɔɪmənt/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "Xiaomi’s adoption marks one of the first commercial deployments of the technology. (샤오미의 채택은 이 기술의 최초의 상업적 도입 사례들 중 하나로 (one of the first commercial deployments) 기록됩니다.)",
    "cf2": "",
    "image": ""
  },
 
  {
    "en": "tangible",
    "ko": "실질적인, 뚜렷한",
    "hint": "",
    "pronunciation": "탠저블",
    "ipa": "/ˈtændʒəbəl/",
    "pos": "형",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "CXMT is making tangible progress in advanced DRAM. (CXMT는 첨단 DRAM 분야에서 실질적인(tangible) 진전을 이루고 있습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "threshold",
    "ko": "문턱, 기준점",
    "hint": "",
    "pronunciation": "쓰레숄드",
    "ipa": "/ˈθreʃhoʊld/",
    "pos": "명",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "CXMT reached the double-digit threshold in global DRAM market share. (CXMT는 글로벌 DRAM 시장점유율에서 두 자릿수 문턱(threshold)에 도달했습니다.)",
    "cf2": "",
    "image": ""
  },
  {
    "en": "translate into",
    "ko": "~라는 결과로 이어지다, ~로 전환되다",
    "hint": "",
    "pronunciation": "트랜슬레이트 인투",
    "ipa": "/trænzˈleɪt ˈɪntuː/",
    "pos": "동",
    "stars": 5,
    "enRepeat": 1,
    "exampleEn": "",
    "exampleKo": "",
    "cf": "The company’s technological progress is beginning to translate into gains in market share. (회사의 기술 발전이 시장점유율 상승이라는 성과로 이어지기(translate into) 시작하고 있습니다.)",
    "cf2": "",
    "image": ""
  },


  ];
  
  /**
   * 학습 종료 후 Review 퀴즈
   */
  // const REVIEW_QUIZ = [
  
    
    
    // {
    //   // lauded(6) → lau___
    //   en: "Michigan students lau___ the new policy.",
    //   ko: "미시간 학생들은 새로운 정책을 (칭찬/칭송) 했습니다.",
    //   answer: "lauded",
    //   answerKo: "칭찬했다·높이 평가했다"
    // },
    // {
    //   // explore(7) → exp____
    //   en: "He believes the move is generally beneficial because it will give students a chance to exp____ subjects more freely.",
    //   ko: "그는 이 조치가 학생들에게 과목을 더 자유롭게 (탐구할) 기회를 줄 것이기 때문에 전반적으로 유익하다고 생각합니다.",
    //   answer: "explore",
    //   answerKo: "탐구하다·살펴보다"
    // },
  
  // ];




const REVIEW_FADE_MS = 520;
const COUNTDOWN_SEC = 3;
const COUNTDOWN_MODES = ["pop", "ring", "bars"];
const COUNTDOWN_TICK_FALLBACK_SRC = "resources/mixkit-tick-tock-clock-timer-1045.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;
const REVIEW_COUNTDOWN_TICK = "resources/mixkit-bell-tick-tock-timer-1046.wav";
let countdownTickAudio = null;

const tickerEl = document.getElementById("ticker");
const autoplayBtn = document.getElementById("autoplay-btn");
const pageTitleEl = document.getElementById("page-title");
const wordFlashImgEl = document.getElementById("word-flash-img");
const wordFlashVideoEl = document.getElementById("word-flash-video");
let isAutoplayRunning = false;
let bgmAudio = null;
const ITEM_TRANSITION_MS = 560;
/** 위 단어: 흐릿하게 천천히 페이드 */
const ITEM_FADE_MS = 720;
/** 페이드 후 자리 접히며 아래가 올라옴 */
const ITEM_COLLAPSE_MS = 400;
/** 단어 전환 swipe — json1.swipe 없거나 "random"이면 단어마다 랜덤 */
const SWIPE_STYLE_IDS = ["swipe-up", "swipe-left", "flip-h", "flip-v", "pop", "zoom", "glitch"];
const SWIPE_STYLE_TIMING = {
  "swipe-up": { outMs: 680, collapseMs: 520, inMs: 520 },
  "swipe-left": { outMs: 560, collapseMs: 480, inMs: 480 },
  "flip-h": { outMs: 620, collapseMs: 500, inMs: 500 },
  "flip-v": { outMs: 620, collapseMs: 500, inMs: 500 },
  pop: { outMs: 560, collapseMs: 480, inMs: 560 },
  zoom: { outMs: 560, collapseMs: 480, inMs: 520 },
  glitch: { outMs: 480, collapseMs: 420, inMs: 480 }
};
/** EN 읽기 후 → cf 읽기 시작 전 대기 (ms) */
const EN_TO_CF_GAP_MS = 700;
/** EN 읽기 후 → 다음 단어로 넘어가기 전 대기 (ms) */
const CF_READ_PAUSE_MS = 2000;
/** cf 없을 때 — 다음 단어 전 대기 (ms) */
const PRON_HOLD_MS = 3000;
const WORD_FLASH_IMAGE_DIR = "resources/";
/** 배경 단색 — mark3read_page_bg_picker 기본값 (화면 좌상단 팔레트·?bg=#hex 로 변경) */
const PAGE_BG_COLOR_DEFAULT = "#2F3543";
const PAGE_BG_IMAGE = "";
const BGM_SRC = "resources/Canon.mp3";
const BGM_VOLUME = 0.02;
const WORD_FLASH_FADE_IN_MS = 500;
const WORD_FLASH_DISPLAY_MS = 900;
const WORD_FLASH_FADE_OUT_MS = 550;
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
  2: "ko-KR-Chirp3-HD-Achird", // 여 · 밝은 톤
  3: "ko-KR-Chirp3-HD-Achernar", // 여 · 차분
  4: "ko-KR-Chirp3-HD-Zephyr", // 여 · 부드러운
  5: "ko-KR-Chirp3-HD-Vindemiatrix" // 여 · 성숙
};
/** exampleKo 긴 해설 — Chirp3-HD Zephyr (여 · 부드러운) */
const EXAMPLE_KO_TTS_VOICE = 4;
/** 영어 TTS: autoplay 시작 시 허스키 여 2 · 남 2 중 랜덤 */
const EN_TTS_VOICE = 1;
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp3-HD-Sulafat", // 여 · 허스키
  2: "en-US-Chirp3-HD-Gacrux", // 여 · 허스키
  3: "en-US-Chirp3-HD-Algenib", // 남 · 허스키
  4: "en-US-Chirp3-HD-Enceladus" // 남 · 허스키
};
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[EN_TTS_VOICE];

function pickRandomEnTtsVoice() {
  const voices = Object.values(EN_TTS_VOICE_IDS);
  activeEnTtsVoiceId = voices[Math.floor(Math.random() * voices.length)];
  return activeEnTtsVoiceId;
}

function getTitleInfo(item) {
  if (!item || typeof item !== "object") return null;
  const key = Object.keys(item).find((k) => /^title\d+$/i.test(k));
  if (!key) return null;
  const num = parseInt(key.replace(/^title/i, ""), 10);
  return { key, num, text: String(item[key] || "").trim() };
}

function isTitleItem(item) {
  return getTitleInfo(item) !== null;
}

function isWordItem(item) {
  return Boolean(item && typeof item.en === "string");
}

function escapeRegExp(text) {
  return String(text || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 불규칙 과거·과거분사 (학습 단어 → cf에서 찾을 형태) */
const IRREGULAR_VERB_FORMS = {
  bring: ["brought"],
};

function generateEnglishForms(word) {
  const forms = new Set();
  const w = String(word || "").trim();
  if (!w) return [];

  if (/\s/.test(w)) {
    const parts = w.split(/\s+/);
    const headForms = generateEnglishForms(parts[0]);
    const tail = parts.slice(1).join(" ");
    headForms.forEach((head) => forms.add(tail ? `${head} ${tail}` : head));
    return [...forms];
  }

  forms.add(w);
  const lower = w.toLowerCase();

  if (/[sxz]$/.test(lower) || /[cs]h$/.test(lower)) {
    forms.add(`${w}es`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ies`);
  } else {
    forms.add(`${w}s`);
  }

  if (/ie$/.test(lower)) {
    forms.add(`${w.slice(0, -2)}ying`);
  } else if (/e$/.test(lower) && !/ee$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ing`);
  } else {
    forms.add(`${w}ing`);
  }
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(lower) && !/e$/.test(lower)) {
    forms.add(`${w}${w.slice(-1)}ing`);
  }

  (IRREGULAR_VERB_FORMS[lower] || []).forEach((form) => forms.add(form));

  if (/e$/.test(lower)) {
    forms.add(`${w}d`);
  } else if (/[^aeiou]y$/.test(lower)) {
    forms.add(`${w.slice(0, -1)}ied`);
  } else {
    forms.add(`${w}ed`);
  }
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(lower) && !/e$/.test(lower) && !/y$/.test(lower)) {
    forms.add(`${w}${w.slice(-1)}ed`);
  }

  return [...forms];
}

/** 이미 <u>…</u> 된 구간은 건드리지 않고 나머지에만 mapper 적용 */
function mapCfTextOutsideUnderline(text, mapper) {
  const parts = String(text || "").split(/(<u>[\s\S]*?<\/u>)/gi);
  return parts
    .map((part) => (/^<u>/i.test(part) ? part : mapper(part)))
    .join("");
}

/** item.cfUnderline: 문자열 또는 문자열 배열 → 추가 밑줄 구문 목록 */
function getCfUnderlinePhrases(item) {
  const raw = item?.cfUnderline;
  if (Array.isArray(raw)) {
    return raw.map((s) => String(s || "").trim()).filter(Boolean);
  }
  const one = String(raw || "").trim();
  return one ? [one] : [];
}

function splitCfEnglishHeadAndKoreanTail(cfText) {
  const text = String(cfText || "");
  const trailingParen = findTrailingTopLevelParen(text);
  if (
    trailingParen &&
    /^\s*$/.test(text.slice(trailingParen.end)) &&
    (isCfKoreanParenInner(trailingParen.inner) || isCfGlossParenInner(trailingParen.inner))
  ) {
    return {
      head: text.slice(0, trailingParen.start),
      tail: text.slice(trailingParen.start)
    };
  }
  return { head: text, tail: "" };
}

/** 지정 구문(여러 단어 가능)을 긴 것부터 밑줄. 공백은 유연 매칭 */
function underlinePhrasesInCf(cfText, phrases) {
  const { head, tail } = splitCfEnglishHeadAndKoreanTail(cfText);
  let text = String(head || "");
  const sorted = [...(phrases || [])]
    .map((p) => String(p || "").trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  for (const phrase of sorted) {
    const parts = phrase.split(/\s+/).map(escapeRegExp).filter(Boolean);
    if (!parts.length) continue;
    const re = new RegExp(`\\b${parts.join("\\s+")}\\b`, "gi");
    text = mapCfTextOutsideUnderline(text, (chunk) =>
      chunk.replace(re, (match) => `<u>${match}</u>`)
    );
  }
  return text + tail;
}

function underlineTargetInCf(cfText, targetWord) {
  const { head, tail } = splitCfEnglishHeadAndKoreanTail(cfText);
  const text = String(head || "").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return String(cfText || "").trim();

  const forms = generateEnglishForms(target)
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp);
  if (!forms.length) return text + tail;

  const re = new RegExp(`\\b(${forms.join("|")})\\b`, "gi");
  return mapCfTextOutsideUnderline(text, (chunk) =>
    chunk.replace(re, (match) => `<u>${match}</u>`)
  ) + tail;
}

/** cfUnderline 구문 먼저 → 그다음 표제어(en) 형태 밑줄 */
function applyCfUnderlines(cfText, targetWord, extraPhrases) {
  const withPhrases = underlinePhrasesInCf(cfText, extraPhrases);
  return underlineTargetInCf(withPhrases, targetWord);
}

function wrapCfEnglishWords(innerHtml) {
  const temp = document.createElement("span");
  temp.innerHTML = String(innerHtml || "");
  const wrapTextNode = (node) => {
    const text = node.nodeValue;
    if (!text) return;
    const frag = document.createDocumentFragment();
    const tokens = text.split(/(\s+)/);
    for (const tok of tokens) {
      if (!tok) continue;
      if (/^\s+$/.test(tok) || !/[A-Za-z0-9]/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        continue;
      }
      const span = document.createElement("span");
      span.className = "cf-en-word";
      span.textContent = tok;
      frag.appendChild(span);
    }
    node.parentNode.replaceChild(frag, node);
  };
  const walk = (parent) => {
    Array.from(parent.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) wrapTextNode(n);
      else if (n.nodeType === Node.ELEMENT_NODE) walk(n);
    });
  };
  walk(temp);
  return temp.innerHTML;
}

/** 괄호/* 안이 언론사·날짜 출처인지 */
function looksLikeCfSource(text) {
  const t = String(text || "").trim();
  if (!t) return false;
  if (/^출처\s*:/i.test(t) || /^source\s*:/i.test(t)) return true;
  if (/\d{4}\s*[\/.\-]/.test(t)) return true;
  if (/^(BBC|NPR|Time|WSJ|CNN|Reuters|AP|NYT|Yahoo|Economist|Slate|Guardian|FT|Forbes|Bloomberg|Politico|Axios|WaPo|Washington Post|LA Times|Los Angeles Times|NY Times|New York Times|The\s)/i.test(t)) {
    return true;
  }
  const words = t.split(/\s+/);
  return (
    words.length <= 4 &&
    t.length <= 40 &&
    words.every((w) => /^[A-Z0-9][A-Za-z0-9.&'-]*$/.test(w))
  );
}

/** 문장 / 출처 분리: "... (Economist)" 또는 "... *WSJ, 2026/08/11" */
function splitCfBodyAndSource(cfText) {
  const text = String(cfText || "").trim();
  if (!text) return { body: "", source: "" };
  const m = text.match(/^(.*?)\s*(?:\(([^)]+)\)|\*([^*\n]+))\s*$/);
  if (!m) return { body: text, source: "" };
  const candidate = String(m[2] || m[3] || "").trim();
  if (!looksLikeCfSource(candidate)) return { body: text, source: "" };
  return { body: String(m[1] || "").trim(), source: candidate };
}

function isPrimarilyKorean(text) {
  const t = String(text || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\(([^()]*)\)/g, (full, inner) => {
      const innerText = String(inner || "").trim();
      if (/[A-Za-z]/.test(innerText) && !/[\uAC00-\uD7A3\u3131-\u318E]/.test(innerText)) {
        return " ";
      }
      return full;
    })
    .trim();
  if (!t) return false;
  const ko = (t.match(/[\uAC00-\uD7A3\u3131-\u318E]/g) || []).length;
  const en = (t.match(/[A-Za-z]/g) || []).length;
  return ko > 0 && ko >= en;
}

/** 괄호 안이 용어 gloss(영어 = 한글)인지 — TTS·노란 영어 표기 대상 아님 */
function isCfGlossParenInner(inner) {
  const plain = String(inner || "").replace(/<[^>]+>/g, "").trim();
  if (!plain) return false;
  if (looksLikeCfSource(plain)) return false;
  if (!/[=＝]/.test(plain)) return false;
  if (!/[\uAC00-\uD7A3\u3131-\u318E]/.test(plain)) return false;
  if (!/[A-Za-z]/.test(plain)) return false;
  return /[A-Za-z][^=()]*[=＝]\s*[\uAC00-\uD7A3\u3131-\u318E]/.test(plain) || /^어원/.test(plain);
}

function formatCfGlossParenHtml(inner) {
  const plain = String(inner || "").trim();
  if (!plain) return "";
  return `<span class="cf-gloss-paren">(${escapeEnHtml(plain)})</span>`;
}

/** 괄호 안이 한글 번역인지 */
function isCfKoreanParenInner(inner) {
  const plain = String(inner || "").replace(/<[^>]+>/g, "").trim();
  if (!plain) return false;
  if (isCfGlossParenInner(plain)) return false;
  if (!/[\uAC00-\uD7A3\u3131-\u318E]/.test(plain)) return false;
  if (looksLikeCfSource(plain)) return false;
  if (/[A-Za-z]/.test(plain) && !isPrimarilyKorean(plain)) return false;
  return true;
}

/** cf TTS용 — gloss·한글 번역 괄호·한글 글자 제거, 영어 본문만 */
function stripCfKoreanForSpeak(text) {
  let t = String(text || "");
  const glossTail = findTrailingTopLevelParen(t);
  if (glossTail && isCfGlossParenInner(glossTail.inner)) {
    t = t.slice(0, glossTail.start).trim();
  }
  t = t.replace(/\([^)]*[=＝][^)]*[\uAC00-\uD7A3\u3131-\u318E][^)]*\)/g, " ");
  t = t.replace(/\*[^*\n]*[=＝][^*\n]*[\uAC00-\uD7A3\u3131-\u318E][^*\n]*/g, " ");
  t = t.replace(/\([^)]*[\uAC00-\uD7A3\u3131-\u318E][^)]*\)/g, " ");
  t = t.replace(/（[^）]*[\uAC00-\uD7A3\u3131-\u318E][^）]*）/g, " ");
  t = t.replace(/[\uAC00-\uD7A3\u3131-\u318E]+/g, " ");
  t = t.replace(/\s+/g, " ").replace(/^[,.;:\s]+|[,.;:\s]+$/g, "").trim();
  return t;
}

function forEachTopLevelParen(text, fn, open = "(", close = ")") {
  const s = String(text || "");
  let i = 0;
  while (i < s.length) {
    if (s[i] !== open) {
      i += 1;
      continue;
    }
    let depth = 0;
    let j = i;
    for (; j < s.length; j += 1) {
      if (s[j] === open) depth += 1;
      else if (s[j] === close) {
        depth -= 1;
        if (depth === 0) {
          j += 1;
          break;
        }
      }
    }
    if (depth !== 0) break;
    fn(s.slice(i, j), s.slice(i + open.length, j - close.length), i, j);
    i = j;
  }
}

/** 문자열 끝의 최상위 괄호 (...) — idio(개인의) 같은 중첩 괄호 지원 */
function findTrailingTopLevelParen(text) {
  const s = String(text || "");
  const trimmedEnd = s.replace(/\s+$/, "");
  if (!trimmedEnd.endsWith(")")) return null;
  const closeAt = trimmedEnd.length - 1;
  let depth = 0;
  for (let i = closeAt; i >= 0; i -= 1) {
    const ch = trimmedEnd[i];
    if (ch === ")") depth += 1;
    else if (ch === "(") {
      depth -= 1;
      if (depth === 0) {
        if (s.slice(closeAt + 1).trim()) return null;
        const start = i;
        return {
          start,
          end: closeAt + 1,
          inner: trimmedEnd.slice(start + 1, closeAt),
          full: s.slice(start, closeAt + 1)
        };
      }
    }
  }
  return null;
}

/** 한글 번역 괄호 안의 (incentives) 같은 영어 병기만 분홍 표시 */
function wrapInlineEnglishParens(html) {
  return String(html || "").replace(/\(([^()]*)\)/g, (full, inner) => {
    const plain = String(inner || "").replace(/<[^>]+>/g, "").trim();
    if (!/[A-Za-z]/.test(plain) || /[\uAC00-\uD7A3\u3131-\u318E]/.test(plain)) return full;
    return `<span class="cf-inline-en-paren">(${escapeEnHtml(plain)})</span>`;
  });
}

/** cf 영어 문장(+출처)을 span으로 감싸 읽기 중 단어별 하이라이트용. 출처는 괄호로 표시 */
function wrapCfParenEnglish(cfHtml) {
  const raw = String(cfHtml || "");
  const { body, source } = splitCfBodyAndSource(raw.replace(/<[^>]+>/g, ""));
  if (source) {
    const bodyHtml = raw.replace(/\s*(?:\([^)]+\)|\*[^*\n]+)\s*$/, "").trim();
    const wrapped = /[A-Za-z]/.test(body)
      ? `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(bodyHtml)}</span>`
      : bodyHtml;
    return `${wrapped} <span class="cf-source">(${escapeEnHtml(source)})</span>`;
  }

  const starAt = raw.search(/\*/);
  let beforeCite = (starAt >= 0 ? raw.slice(0, starAt) : raw).trim();
  let cite = starAt >= 0 ? raw.slice(starAt) : "";
  if (starAt >= 0) {
    const citeInner = raw.slice(starAt + 1).trim();
    if (isCfGlossParenInner(citeInner)) cite = formatCfGlossParenHtml(citeInner);
  }

  // 끝 한글 번역·gloss 괄호는 중첩 (한글(english)) 포함해 먼저 분리
  let koTail = "";
  let glossTail = "";
  const trailingParen = findTrailingTopLevelParen(beforeCite);
  if (trailingParen && /^\s*$/.test(beforeCite.slice(trailingParen.end))) {
    if (isCfGlossParenInner(trailingParen.inner)) {
      glossTail = formatCfGlossParenHtml(trailingParen.inner);
      beforeCite = beforeCite.slice(0, trailingParen.start).trim();
    } else if (isCfKoreanParenInner(trailingParen.inner)) {
      koTail = `<span class="cf-ko-paren">${wrapInlineEnglishParens(trailingParen.full)}</span>`;
      beforeCite = beforeCite.slice(0, trailingParen.start).trim();
    }
  }

  let idx = 0;
  let englishHtml = "";
  let last = 0;
  forEachTopLevelParen(beforeCite, (full, inner, start, end) => {
    englishHtml += beforeCite.slice(last, start);
    if (isCfGlossParenInner(inner)) {
      englishHtml += formatCfGlossParenHtml(inner);
    } else if (
      looksLikeCfSource(inner) ||
      isCfKoreanParenInner(inner) ||
      !/[A-Za-z]/.test(inner)
    ) {
      englishHtml += full;
    } else {
      englishHtml += `<span class="cf-en-paren" data-cf-index="${idx}">(${wrapCfEnglishWords(inner)})</span>`;
      idx += 1;
    }
    last = end;
  });
  englishHtml += beforeCite.slice(last);

  const tails = `${koTail ? ` ${koTail}` : ""}${glossTail ? ` ${glossTail}` : ""}${cite ? ` ${cite}` : ""}`;
  if (idx > 0) return `${englishHtml}${tails}`;
  if (beforeCite && /[A-Za-z]/.test(beforeCite)) {
    return `<span class="cf-en-paren" data-cf-index="0">${wrapCfEnglishWords(beforeCite)}</span>${tails}`;
  }
  return `${englishHtml || beforeCite}${tails}`;
}

function createTitleElement(item, globalIndex, mode = "normal") {
  const titleInfo = getTitleInfo(item);
  const el = document.createElement("article");
  el.className = "ticker-item group-title-item";
  el.dataset.index = String(globalIndex);
  el.dataset.itemType = "title";
  const initialText = titleInfo?.text || "";
  const attr = String(initialText).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  el.innerHTML = `
    <div class="group-title-banner">
      <span class="group-title-text" data-full-title="${attr}">${escapeEnHtml(initialText)}</span>
    </div>
  `;
  return el;
}

function createEntryElement(item, globalIndex, mode = "normal") {
  if (isTitleItem(item)) return createTitleElement(item, globalIndex, mode);
  return createItemElement(item, globalIndex, mode);
}

/** "opulence" → "opu_____" (앞 3글자 공개, 나머지 글자는 _) */
function buildEnPreviewMask(en, previewLetters = EN_PREVIEW_LETTERS) {
  const text = String(en || "");
  let shown = 0;
  let out = "";
  for (const ch of text) {
    if (/[A-Za-z0-9]/.test(ch)) {
      if (shown < previewLetters) {
        out += ch;
        shown += 1;
      } else {
        out += "_";
      }
    } else if (/\s/.test(ch)) {
      out += " ";
    } else {
      out += shown < previewLetters ? ch : "_";
    }
  }
  return out;
}

/** 미리보기에 이미 공개된 앞부분 / 손글씨로 쓸 나머지 */
function getEnPreviewSplit(en, previewLetters = EN_PREVIEW_LETTERS) {
  const text = String(en || "");
  const mask = buildEnPreviewMask(text, previewLetters);
  let splitAt = text.length;
  for (let i = 0; i < mask.length; i += 1) {
    if (mask[i] === "_") {
      splitAt = i;
      break;
    }
  }
  return {
    prefix: text.slice(0, splitAt),
    rest: text.slice(splitAt)
  };
}

function escapeEnHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildGroups() {
  const groups = [];
  let current = null;
  json1.forEach((item, index) => {
    if (isTitleItem(item)) {
      current = { titleIndex: index, titleItem: item, wordIndices: [] };
      groups.push(current);
    } else if (isWordItem(item)) {
      if (!current) {
        current = { titleIndex: -1, titleItem: null, wordIndices: [] };
        groups.push(current);
      }
      current.wordIndices.push(index);
    }
  });
  return groups;
}

/** title은 그룹핑만 하고 화면에는 노출하지 않음 → 슬롯 전부 단어로 채움 */
const WORDS_PER_PAGE = Math.max(1, VISIBLE_COUNT);

function getAllWordIndices() {
  const indices = [];
  for (let i = 0; i < json1.length; i += 1) {
    if (isWordItem(json1[i])) indices.push(i);
  }
  return indices;
}

function getVisibleTitleIndices() {
  const indices = [];
  for (let i = 0; i < json1.length; i += 1) {
    const info = getTitleInfo(json1[i]);
    if (info && info.text) indices.push(i);
  }
  return indices;
}

/** 연속 피드: startIndex부터 VISIBLE_COUNT개 표시. 맨 앞에 title1 노출 */
function renderWordFeed(wordIndices, startIndex = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  if (startIndex === 0) {
    getVisibleTitleIndices().forEach((titleIndex) => {
      const el = createTitleElement(json1[titleIndex], titleIndex, mode);
      if (animateIn) el.classList.add("slide-in");
      tickerEl.appendChild(el);
    });
  }
  wordIndices.slice(startIndex, startIndex + VISIBLE_COUNT).forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
  });
  scheduleFitWordLines();
}

const swipeStyleByIndex = new Map();

function pickRandomSwipeStyle(excludeId = "") {
  const ids = SWIPE_STYLE_IDS.filter((id) => id !== excludeId);
  const pool = ids.length ? ids : SWIPE_STYLE_IDS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** json 단어마다 swipe 배정. "random"/없음 → 연속 중복 없이 랜덤, 고정값은 그대로 */
function assignSwipeStyles() {
  swipeStyleByIndex.clear();
  let prev = "";
  json1.forEach((item, index) => {
    if (!isWordItem(item)) return;
    const specified = String(item.swipe || "random").trim();
    const id =
      specified && specified !== "random" && SWIPE_STYLE_TIMING[specified]
        ? specified
        : pickRandomSwipeStyle(prev);
    swipeStyleByIndex.set(index, id);
    prev = id;
  });
}

function getItemSwipeStyle(globalIndex) {
  return swipeStyleByIndex.get(globalIndex) || pickRandomSwipeStyle();
}

/** 위 단어는 해당 json.swipe 효과로 사라진 뒤 자리만 접혀 아래가 올라옴 */
async function swipeUpWordAndAppend(completedGlobalIndex, nextGlobalIndex, mode = "normal") {
  const style = getItemSwipeStyle(completedGlobalIndex);
  const timing = SWIPE_STYLE_TIMING[style] || SWIPE_STYLE_TIMING["swipe-up"];
  const completedEl = tickerEl.querySelector(`.ticker-item[data-index="${completedGlobalIndex}"]`);

  const appendNext = () => {
    if (nextGlobalIndex == null || nextGlobalIndex < 0) return;
    if (!isWordItem(json1[nextGlobalIndex])) return;
    if (tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`)) return;
    const el = createEntryElement(json1[nextGlobalIndex], nextGlobalIndex, mode);
    el.style.setProperty("--swipe-in-ms", `${timing.inMs || timing.collapseMs}ms`);
    el.classList.add("is-swiping-in", `swipe-in-${style}`);
    tickerEl.appendChild(el);
    scheduleFitWordLines();
  };

  if (!completedEl) {
    appendNext();
    return;
  }

  completedEl.classList.remove("slide-in", "is-swiping-in", "slide-out", "is-fading-out", "is-collapsing");
  Array.from(completedEl.classList).forEach((cls) => {
    if (cls.startsWith("swipe-in-") || cls.startsWith("swipe-out-")) {
      completedEl.classList.remove(cls);
    }
  });
  completedEl.classList.add("is-swiping-out", `swipe-out-${style}`);
  completedEl.style.setProperty("--swipe-out-ms", `${timing.outMs}ms`);
  completedEl.style.setProperty("--swipe-collapse-ms", `${timing.collapseMs}ms`);
  const penFade =
    typeof window.fadeClearPenDrawings === "function"
      ? window.fadeClearPenDrawings(timing.outMs)
      : Promise.resolve();
  await Promise.all([sleep(timing.outMs), penFade]);
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  // 2) 자리만 접기 → 아래 항목이 부드럽게 올라옴
  const gap = Number.parseFloat(getComputedStyle(tickerEl).rowGap) || 0;
  const height = completedEl.getBoundingClientRect().height;
  completedEl.style.boxSizing = "border-box";
  completedEl.style.overflow = "hidden";
  completedEl.style.flexShrink = "0";
  completedEl.style.height = `${height}px`;
  completedEl.style.marginBottom = "0px";
  void completedEl.offsetHeight;

  completedEl.classList.add("is-collapsing");
  completedEl.style.height = "0px";
  completedEl.style.paddingTop = "0px";
  completedEl.style.paddingBottom = "0px";
  completedEl.style.marginBottom = `-${gap}px`;

  appendNext();
  await sleep(timing.collapseMs);
  completedEl.remove();
}

/** 현재 슬롯 수에서 VISIBLE_COUNT까지, startAfterGlobalIndex 다음 json 항목으로 채움 */
function appendFillUntilVisible(startAfterGlobalIndex, animateIn, mode, currentCount) {
  let count = currentCount;
  for (let i = startAfterGlobalIndex + 1; i < json1.length && count < VISIBLE_COUNT; i += 1) {
    const item = json1[i];
    if (isTitleItem(item) || !isWordItem(item)) continue;
    const el = createEntryElement(item, i, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  }
  scheduleFitWordLines();
}

function renderGroupWindow(group, wordStartInGroup = 0, animateIn = false, mode = "normal") {
  tickerEl.innerHTML = "";
  let count = 0;

  const wordSlice = group.wordIndices.slice(
    wordStartInGroup,
    wordStartInGroup + WORDS_PER_PAGE
  );
  wordSlice.forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    if (animateIn) el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  });

  const lastIndex = wordSlice.length
    ? wordSlice[wordSlice.length - 1]
    : group.titleIndex;
  appendFillUntilVisible(lastIndex, animateIn, mode, count);
  scheduleFitWordLines();
}

async function shiftGroupWordsDown(group, nextWordStartInGroup, mode = "normal") {
  const leaving = Array.from(tickerEl.children);
  leaving.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  leaving.forEach((el) => el.remove());

  let count = 0;
  const wordSlice = group.wordIndices.slice(
    nextWordStartInGroup,
    nextWordStartInGroup + WORDS_PER_PAGE
  );
  wordSlice.forEach((globalIndex) => {
    const el = createEntryElement(json1[globalIndex], globalIndex, mode);
    el.classList.add("slide-in");
    tickerEl.appendChild(el);
    count += 1;
  });

  const lastIndex = wordSlice.length
    ? wordSlice[wordSlice.length - 1]
    : group.titleIndex;
  appendFillUntilVisible(lastIndex, true, mode, count);
  scheduleFitWordLines();
}

async function shiftToNextGroup(group, mode = "normal") {
  const oldItems = Array.from(tickerEl.querySelectorAll(".ticker-item"));
  oldItems.forEach((el) => el.classList.add("slide-out"));
  await sleep(ITEM_TRANSITION_MS);
  renderGroupWindow(group, 0, true, mode);
}

function burstProgressConfetti() {
  const track = document.querySelector(".progress-track");
  if (!track) return;

  const rect = track.getBoundingClientRect();
  const colors = ["#ff8fab", "#ffd24d", "#9fe8d8", "#adff2f", "#f5efe7"];

  const burstOnce = (burstIndex) => {
    const layer = document.createElement("div");
    layer.className = "progress-confetti";
    layer.setAttribute("aria-hidden", "true");
    const xOffset = (burstIndex - 2) * 7;
    const yOffset = burstIndex % 2 === 0 ? 0 : -8;
    layer.style.setProperty("--confetti-x", `${rect.right - 8 + xOffset}px`);
    layer.style.setProperty("--confetti-y", `${rect.top + rect.height / 2 + yOffset}px`);

    for (let i = 0; i < 22; i += 1) {
      const piece = document.createElement("i");
      const angle = Math.random() * Math.PI * 2;
      const distance = 55 + Math.random() * 105;
      piece.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
      piece.style.setProperty("--dy", `${Math.sin(angle) * distance - 28}px`);
      piece.style.setProperty("--rot", `${Math.round(Math.random() * 540 - 270)}deg`);
      piece.style.setProperty("--delay", `${Math.random() * 70}ms`);
      piece.style.setProperty("--piece-color", colors[(i + burstIndex) % colors.length]);
      layer.appendChild(piece);
    }

    document.body.appendChild(layer);
    window.setTimeout(() => layer.remove(), 1500);
  };

  for (let burstIndex = 0; burstIndex < 5; burstIndex += 1) {
    window.setTimeout(() => burstOnce(burstIndex), burstIndex * 260);
  }
}

function pickRandomProgressBarTheme() {
  const i = Math.floor(Math.random() * PROGRESS_BAR_THEMES.length);
  return PROGRESS_BAR_THEMES[i] || PROGRESS_BAR_THEMES[0];
}

let progressDisplayPct = 0;
let progressTargetPct = 0;
let progressAnimRaf = null;
let progressLabelCurrent = 0;
let progressLabelTotal = 0;

function applyProgressVisual(pct) {
  const fill = document.getElementById("progress-fill");
  const pctEl = document.getElementById("progress-pct");
  const label = document.getElementById("progress-label");
  const shown = Math.max(0, Math.min(100, pct));
  const rounded = Math.round(shown);

  if (fill) {
    fill.style.width = `${shown}%`;
    fill.classList.toggle("has-pct", shown > 0.05);
    if (shown >= 99.5 && fill.dataset.confettiDone !== "true") {
      fill.dataset.confettiDone = "true";
      burstProgressConfetti();
    } else if (shown < 99.5) {
      fill.dataset.confettiDone = "false";
    }
  }
  if (pctEl) pctEl.textContent = `${rounded}%`;
  if (label && progressLabelTotal > 0) {
    label.textContent = `진행도 ${progressLabelCurrent} / ${progressLabelTotal}`;
  }
  updateProgressRunner(shown);
}

function ensureProgressAnim() {
  if (progressAnimRaf) return;
  const tick = () => {
    const diff = progressTargetPct - progressDisplayPct;
    if (Math.abs(diff) < 0.08) {
      progressDisplayPct = progressTargetPct;
      applyProgressVisual(progressDisplayPct);
      progressAnimRaf = null;
      return;
    }
    // 남은 거리의 일부씩 따라가며 끊김 없이 전진
    progressDisplayPct += diff * 0.085;
    applyProgressVisual(progressDisplayPct);
    progressAnimRaf = requestAnimationFrame(tick);
  };
  progressAnimRaf = requestAnimationFrame(tick);
}

function setProgressTargetPct(pct) {
  progressTargetPct = Math.max(0, Math.min(100, pct));
  ensureProgressAnim();
}

/** 단어 처리 중: 다음 칸의 중간쯤까지 살짝 미리 전진 */
function nudgeProgressSoft(doneCount, total = getProgressTotal()) {
  const safeTotal = Math.max(1, total);
  const soft = Math.min(doneCount + 0.55, safeTotal);
  setProgressTargetPct((soft / safeTotal) * 100);
}

function updateProgressRunner(pct) {
  const runner = document.getElementById("progress-runner");
  if (!runner) return;

  let stageIndex = 0;
  if (pct >= 100) stageIndex = 5;
  else if (pct > 80) stageIndex = 4;
  else if (pct > 60) stageIndex = 4;
  else if (pct > 40) stageIndex = 3;
  else if (pct > 20) stageIndex = 2;
  else if (pct > 0) stageIndex = 1;

  const theme = activeProgressBarTheme || PROGRESS_BAR_THEMES[0];
  const stage = theme.stages[stageIndex] || theme.stages[0];
  runner.textContent = stage[0];
  runner.dataset.motion = stage[1];
  runner.dataset.barTheme = theme.id;
}

function getTotalWordCount() {
  return json1.filter(isWordItem).length;
}

/** 진행도 total = JSON 단어 수 × 반복(패스) 횟수 */
function getProgressTotal() {
  return getTotalWordCount() * Math.max(1, EN_KO_PASS_COUNT);
}

function updateProgress(current, total = getProgressTotal()) {
  const safeTotal = Math.max(0, total);
  const safeCurrent = Math.max(0, Math.min(current, safeTotal));
  progressLabelCurrent = safeCurrent;
  progressLabelTotal = safeTotal;
  const pct = safeTotal > 0 ? (safeCurrent / safeTotal) * 100 : 0;
  if (safeCurrent === 0) {
    progressDisplayPct = 0;
    progressTargetPct = 0;
    if (progressAnimRaf) {
      cancelAnimationFrame(progressAnimRaf);
      progressAnimRaf = null;
    }
    applyProgressVisual(0);
    return;
  }
  setProgressTargetPct(pct);
}

function renderStaticList() {
  assignSwipeStyles();
  const wordIndices = getAllWordIndices();
  if (!wordIndices.length) return;
  renderWordFeed(wordIndices, 0, false, "second-pass");
  showKoAsDefault();
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
  updateProgress(0);
}

async function markWordAsRead(_globalIndex, _animate = true) {
  // 읽음 표시(비스듬한 V 체크) 없음
}

function getWordDisplayNumber(globalIndex) {
  let n = 0;
  for (let i = 0; i <= globalIndex && i < json1.length; i += 1) {
    if (isWordItem(json1[i])) n += 1;
  }
  return n;
}

function countEnSpellLetters(en) {
  return (String(en || "").match(/[A-Za-z]/g) || []).length;
}

function countKoChars(ko) {
  return (String(ko || "").match(/[가-힣]/g) || []).length;
}

/** 영어 스펠링 수 + 한글 글자 수 ≥ 25 이면 2줄 배치 */
function shouldStackWordLine(en, ko) {
  return countEnSpellLetters(en) + countKoChars(ko) >= 25;
}

function createItemElement(item, globalIndex, mode = "normal") {
  const el = document.createElement("article");
  el.className = "ticker-item";
  if (mode === "second-pass") el.classList.add("ko-first-mode", "second-pass-mode");
  el.dataset.itemType = "word";
  el.dataset.en = item.en;
  el.dataset.ko = item.ko;
  el.dataset.index = String(globalIndex);
  const escapeAttr = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const showPreview = mode === "second-pass";
  const enHiddenClass = showPreview ? " hidden-en-main" : "";
  const previewHiddenClass = showPreview ? "" : " hidden-en-preview";
  const mask = buildEnPreviewMask(item.en);
  const koHiddenClass = mode === "second-pass" ? "" : " hidden-ko";
  const koContent = mode === "second-pass" ? (item.ko || "") : "";
  const num = getWordDisplayNumber(globalIndex);
  const enMainHtml = `<span class="en-main" data-full-en="${escapeAttr(item.en)}"><span class="en-preview${previewHiddenClass}">${escapeEnHtml(mask)}</span><span class="en-main-text${enHiddenClass}">${escapeEnHtml(item.en)}</span></span>`;
  const koHtml = `<span class="ko-text${koHiddenClass}" data-full-ko="${escapeAttr(item.ko)}">${escapeEnHtml(koContent)}</span>`;
  const stack = shouldStackWordLine(item.en, item.ko);
  const enWithColon = `<span class="en-pair">${enMainHtml}<span class="en-colon">:</span></span>`;
  const wordLine = stack
    ? `<span class="en-row">${enWithColon}</span>${koHtml}`
    : `${enWithColon}${koHtml}`;
  const wordLineClass = stack ? "word-line word-line-stack" : "word-line";
  const cfText = String(item.cf || "").trim();
  const targetWord = String(item.en || "").trim();
  const cfTextWithUnderline = wrapCfParenEnglish(underlineTargetInCf(cfText, targetWord));
  const cfHtml = cfText
    ? `<span class="cf-note hidden-cf"><span class="cf-abbr">cf.</span><span class="cf-body">${cfTextWithUnderline}</span></span>`
    : "";
  if (cfText) el.classList.add("has-cf");
  const enRepeatBannerCount = getEnRepeatBannerCount(item);
  const enRepeatBannerHtml = enRepeatBannerCount > 0
    ? `<span class="en-repeat-banner" data-en-repeat="${enRepeatBannerCount}" aria-hidden="true"><span class="en-repeat-count">${formatEnRepeatCountdown(1)}</span></span>`
    : "";
  // 발음·IPA·cf는 같은 줄에 노출 (처음엔 숨김)
  const pronunciation = String(item.pronunciation || "").trim();
  const ipa = String(item.ipa || "").trim();
  const pronHtmlParts = [];
  const pronPlainParts = [];
  if (pronunciation) {
    pronHtmlParts.push(`|${pronunciation}|`);
    pronPlainParts.push(`|${pronunciation}|`);
  }
  if (ipa) {
    pronHtmlParts.push(`<span class="pron-ipa">${escapeEnHtml(ipa)}</span>`);
    pronPlainParts.push(ipa);
  }
  const pronDisplay = pronHtmlParts.join(" ");
  const pronPlain = pronPlainParts.join(" ");
  const pronTextHtml = pronDisplay
    ? `<span class="pron-text hidden-pron-text" data-full-pron="${escapeAttr(pronPlain)}" data-full-pron-html="${escapeAttr(pronDisplay)}">${pronDisplay}</span>`
    : "";
  const exampleKoText = String(item.exampleKo || "").trim();
  const exampleKoHtml = exampleKoText
    ? `<div class="example-ko hidden-example-ko">${escapeEnHtml(exampleKoText)}</div>`
    : "";
  const pronLine = (pronTextHtml || cfHtml || exampleKoHtml)
    ? `<div class="pron-line"><div class="pron-row">${pronTextHtml}${cfHtml}</div>${exampleKoHtml}</div>`
    : "";
  el.innerHTML = `
    <div class="word-row word-row-no-num">
      <span class="order-num" aria-hidden="true">${num}.</span>
      <div class="word-content">
        ${enRepeatBannerHtml}
        <div class="${wordLineClass}">${wordLine}</div>
        ${pronLine}
      </div>
    </div>
  `;
  return el;
}

function fitWordLineToBox(itemEl) {
  const line = itemEl?.querySelector(".word-line");
  if (!line) return;
  const box = itemEl.querySelector(".word-content") || itemEl;
  const maxW = box.clientWidth;
  if (maxW <= 0) return;

  if (!line.dataset.maxFont) {
    line.dataset.maxFont = String(Number.parseFloat(getComputedStyle(line).fontSize) || 44);
  }
  const maxPx = Number(line.dataset.maxFont) || 44;
  const minPx = 16;

  const overflows = (size) => {
    line.style.fontSize = `${size}px`;
    void line.offsetWidth;
    return line.scrollWidth > maxW + 1;
  };

  if (!overflows(maxPx)) {
    line.style.fontSize = `${maxPx}px`;
    return;
  }

  let lo = minPx;
  let hi = maxPx;
  let best = minPx;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (!overflows(mid)) {
      best = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }
  line.style.fontSize = `${best}px`;
}

function fitAllWordLines() {
  if (!tickerEl) return;
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach(fitWordLineToBox);
}

function scheduleFitWordLines() {
  requestAnimationFrame(() => {
    fitAllWordLines();
    requestAnimationFrame(fitAllWordLines);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getWordFlashImageSrc(wordIndex) {
  const item = json1[wordIndex];
  if (!isWordItem(item)) return null;
  const file = String(item?.image || "").trim();
  if (!file) return null;
  return `${WORD_FLASH_IMAGE_DIR}${file}`;
}

function resolvePageBgColor() {
  if (window.Mark3readPageBg && typeof window.Mark3readPageBg.getPageBgColor === "function") {
    return window.Mark3readPageBg.getPageBgColor();
  }
  return PAGE_BG_COLOR_DEFAULT;
}

function initSharedPageBgPicker() {
  if (!window.Mark3readPageBg) return;
  window.Mark3readPageBg.configure({
    defaultHex: PAGE_BG_COLOR_DEFAULT,
    onApply: applyPageBackground,
  });
  window.Mark3readPageBg.mountPageBgColorPicker();
}

function applyPageBackground() {
  const pageBgColor = resolvePageBgColor();

  document.documentElement.style.setProperty("--page-bg-color", pageBgColor);
  document.documentElement.style.setProperty("--page-bg-base-image", "none");
  document.documentElement.style.setProperty("--page-bg-image", "none");
  document.documentElement.style.setProperty("background-color", pageBgColor, "important");
  document.documentElement.style.setProperty("background-image", "none", "important");

  if (document.body) {
    document.body.style.setProperty("background-color", "transparent", "important");
    document.body.style.setProperty("background-image", "none", "important");
  }

  const bgEl = document.getElementById("page-bg");
  if (bgEl) {
    bgEl.style.backgroundImage = "none";
    bgEl.style.setProperty("--page-bg-color", pageBgColor);
    bgEl.hidden = true;
  }
}

function resetWordFlashImage() {
  if (!wordFlashImgEl) return;
  wordFlashImgEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashImgEl.style.clipPath = "";
}

function resetWordFlashVideo() {
  if (!wordFlashVideoEl) return;
  wordFlashVideoEl.classList.remove("is-fading-in", "is-visible", "is-fading-out");
  wordFlashVideoEl.pause();
  wordFlashVideoEl.currentTime = 0;
}

async function canLoadImage(src) {
  return new Promise((resolve) => {
    const probe = new Image();
    probe.onload = () => resolve(true);
    probe.onerror = () => resolve(false);
    probe.src = src;
  });
}

function isVideoFile(src) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

async function showWordFlashVideo(src) {
  if (!wordFlashVideoEl) return;
  resetWordFlashVideo();
  resetWordFlashImage();

  wordFlashVideoEl.volume = 0.2;
  wordFlashVideoEl.src = src;
  wordFlashVideoEl.load();
  await new Promise((resolve) => {
    wordFlashVideoEl.oncanplay = resolve;
    wordFlashVideoEl.onerror = resolve;
  });

  void wordFlashVideoEl.offsetWidth;
  wordFlashVideoEl.classList.add("is-fading-in");
  wordFlashVideoEl.play();
  await sleep(WORD_FLASH_FADE_IN_MS);
  wordFlashVideoEl.classList.remove("is-fading-in");
  wordFlashVideoEl.classList.add("is-visible");

  await new Promise((resolve) => {
    wordFlashVideoEl.onended = resolve;
    wordFlashVideoEl.onerror = resolve;
  });

  wordFlashVideoEl.classList.remove("is-visible");
  wordFlashVideoEl.classList.add("is-fading-out");
  await sleep(WORD_FLASH_FADE_OUT_MS);
  resetWordFlashVideo();
}

async function showWordFlashImage(wordIndex) {
  const src = getWordFlashImageSrc(wordIndex);
  if (!src) return;

  if (isVideoFile(src)) {
    await showWordFlashVideo(src);
    return;
  }

  if (!wordFlashImgEl) return;
  resetWordFlashImage();
  resetWordFlashVideo();
  if (!(await canLoadImage(src))) return;

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

function resolveExampleKoTtsVoiceId() {
  try {
    const qp = new URLSearchParams(window.location.search || "");
    const raw = qp.get("kovo");
    if (raw) {
      const n = Number(raw);
      if (KO_TTS_VOICE_IDS[n]) return KO_TTS_VOICE_IDS[n];
      if (/^ko-KR/i.test(raw)) return raw;
    }
  } catch (_) {}
  return KO_TTS_VOICE_IDS[Number(EXAMPLE_KO_TTS_VOICE)] || KO_TTS_VOICE_IDS[4];
}

function resolveEnTtsVoiceId(langKey) {
  const values = Object.values(EN_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  const isEn = langKey === "en" || langKey === "en-US" || (typeof langKey === "string" && /^en-/i.test(langKey));
  if (!isEn) return langKey;
  return activeEnTtsVoiceId || EN_TTS_VOICE_IDS[Number(EN_TTS_VOICE)] || EN_TTS_VOICE_IDS[1];
}

function getTTSUrl(text, languageKey) {
  const raw = String(text || "").trim();
  if (!raw) return "";
  const normalizedLang = String(languageKey || "").trim();
  const isEn = normalizedLang === "en" || normalizedLang === "en-US" || /^en-/i.test(normalizedLang);
  const langParam = isEn ? resolveEnTtsVoiceId(normalizedLang) : resolveKoTtsVoiceId(normalizedLang);
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(raw)}&language=${encodeURIComponent(langParam)}`;
}

function getKoSpeakText(rawKo) {
  const text = String(rawKo || "").trim();
  if (!text) return "";
  // "단어/단어", "단어, 단어" 형태는 앞 항목만 읽기
  const beforeSlash = text.split("/")[0].trim();
  const firstExpr = beforeSlash.split(",")[0].trim();
  // 물결표(~): TTS용 — ~로→무엇으로(무엇으+로), 그 외→무엇
  return firstExpr
    .replace(/~(?=로)/g, "무엇으")
    .replace(/~/g, "무엇");
}

/** exampleKo TTS — 따옴표 제거·한국어 발음 보정 (화면 표시용 exampleKo와 분리) */
function prepareExampleKoForTts(text) {
  let t = String(text || "").trim();
  if (!t) return "";
  t = t.replace(/[''""「」『』]/g, "");
  t = t.replace(/~(?=로)/g, "무엇으").replace(/~/g, "무엇");
  t = t.replace(/([가-힣]{2,})의(?=\s+[가-힣])/g, "$1 의");
  t = t.replace(/\s+/g, " ").trim();
  return t;
}

/** exampleKo 전문 TTS용 — 슬래시·쉼표 분할 없이 전체 읽기 */
function getExampleKoSpeakText(word) {
  const text = String(word?.exampleKo || "").trim();
  if (!text) return "";
  return prepareExampleKoForTts(text);
}

function getEnSpeakText(word) {
  if (!word) return "";
  return String(word.enTts || word.en || "").trim();
}

/** EN 단어는 항상 1회만 재생 */
function getEnSpeakRates(_word) {
  return [1];
}

/** cfRepeat/cfSpeakRates로 2회 이상일 때만 배너용 횟수 (그 외 0) */
function getEnRepeatBannerCount(word) {
  const n = getCfSpeakRates(word).length;
  return n > 1 ? n : 0;
}

/** readNum=1 → "×1" (하나씩 표기: ×1 → ×2 → … → ×n → 숨김) */
function formatEnRepeatCountdown(readNum) {
  const n = Math.floor(Number(readNum));
  if (!Number.isFinite(n) || n < 1) return "";
  return `×${n}`;
}

function updateEnRepeatBanner(itemEl, remaining, total = 0) {
  const banner = itemEl?.querySelector?.(".en-repeat-banner");
  if (!banner) return;
  const countEl = banner.querySelector(".en-repeat-count");
  const totalNum = Number(total) || Number(banner.dataset.enRepeat) || 0;
  if (remaining > 0 && totalNum > 0) {
    const readNum = totalNum - remaining + 1;
    banner.classList.add("is-active");
    if (countEl) {
      countEl.textContent = formatEnRepeatCountdown(readNum);
      countEl.classList.remove("is-tick");
      void countEl.offsetWidth;
      countEl.classList.add("is-tick");
    }
  } else {
    banner.classList.remove("is-active");
    if (countEl) countEl.textContent = "";
  }
}

/**
 * cf TTS 횟수/속도
 * - cfSpeakRates: [1, 0.85] → 배열 길이만큼
 * - enRepeat: n → 정상 속도로 n번
 * - enRepeat: 0 → cf 읽지 않음
 * - 없으면 1번
 */
function getCfSpeakRates(word) {
  if (Array.isArray(word?.cfSpeakRates) && word.cfSpeakRates.length) {
    const rates = word.cfSpeakRates.map(Number).filter((r) => Number.isFinite(r) && r > 0);
    if (rates.length) return rates;
  }
  if (word?.enRepeat != null && String(word.enRepeat).trim() !== "") {
    const n = Math.floor(Number(word.enRepeat));
    if (Number.isFinite(n) && n <= 0) return [];
    if (Number.isFinite(n) && n >= 1) {
      return Array.from({ length: Math.min(n, 10) }, () => 1);
    }
  }
  return [1];
}

/** cf 영어 문장 배열. 끝 한글 번역·출처는 제외하고 영어 본문만 사용 */
function extractCfParenEnglishParts(cfText) {
  const text = String(cfText || "");
  const { body, source } = splitCfBodyAndSource(text);
  if (source) {
    const spoken = stripCfKoreanForSpeak(body.replace(/[.,;:\s]+$/g, "").trim());
    return spoken && /[A-Za-z]/.test(spoken) ? [spoken] : [];
  }

  let beforeCite = text.split(/\*/)[0].trim();
  const trailingParen = findTrailingTopLevelParen(beforeCite);
  if (trailingParen && /^\s*$/.test(beforeCite.slice(trailingParen.end)) && (isCfKoreanParenInner(trailingParen.inner) || isCfGlossParenInner(trailingParen.inner))) {
    beforeCite = beforeCite.slice(0, trailingParen.start).trim();
  }
  beforeCite = beforeCite.replace(/\s+[—–]\s*[A-Za-z].*$/, "").trim();
  const spoken = stripCfKoreanForSpeak(beforeCite);
  if (spoken && /[A-Za-z]/.test(spoken)) return [spoken];

  const parts = [];
  forEachTopLevelParen(beforeCite, (_full, inner) => {
    if (
      !inner ||
      isCfKoreanParenInner(inner) ||
      isCfGlossParenInner(inner) ||
      looksLikeCfSource(inner)
    ) {
      return;
    }
    if (/[A-Za-z]/.test(inner)) {
      const part = stripCfKoreanForSpeak(inner);
      if (part) parts.push(part);
    }
  });
  return parts;
}

function normalizeCfSpeakToken(text) {
  return String(text || "").replace(/[^a-zA-Z0-9']/g, "").toLowerCase();
}

/**
 * 전체 영어 문장에서 학습 단어가 들어 있는 핵심 절만 추출.
 * 예: 콤마 절, when/because 등 종속절 우선.
 */
function extractCfCoreEnglish(fullEn, targetWord) {
  const text = String(fullEn || "").replace(/\s+/g, " ").trim();
  const target = String(targetWord || "").trim();
  if (!text || !target) return text;

  const forms = generateEnglishForms(target).sort((a, b) => b.length - a.length);
  if (!forms.length) return text;
  const formRe = new RegExp(`\\b(${forms.map(escapeRegExp).join("|")})\\b`, "i");
  const hit = formRe.exec(text);
  if (!hit) return text;

  const cleanClause = (clause) => String(clause || "")
    .replace(/^(and|but|or|so)\s+/i, "")
    .replace(/^[,;\s]+|[,;\s]+$/g, "")
    .trim();

  const byComma = text.split(/[,;]\s+/);
  if (byComma.length > 1) {
    const clause = byComma.find((c) => formRe.test(c));
    if (clause) {
      const core = cleanClause(clause);
      if (core) return core;
    }
  }

  const before = text.slice(0, hit.index);
  const subWordRe = /\b(when|while|where|because|although|though|if|unless|since|after|before)\b/gi;
  let lastSub = -1;
  let sm;
  while ((sm = subWordRe.exec(before)) !== null) lastSub = sm.index;
  if (lastSub >= 0) {
    const core = cleanClause(text.slice(lastSub));
    if (core) return core;
  }

  const after = text.slice(hit.index + hit[0].length);
  const nextSub = /\b(when|while|where|because|although|though|if|unless|since|after|before)\b/i.exec(after);
  if (nextSub) {
    const core = cleanClause(text.slice(0, hit.index + hit[0].length + nextSub.index));
    if (core) return core;
  }

  return text;
}

/** 핵심 문장 TTS에 맞춰 하이라이트할 .cf-en-word 구간만 고름 */
function getWordElsMatchingSpeakText(wordEls, speakText) {
  const els = Array.from(wordEls || []);
  const want = String(speakText || "")
    .split(/\s+/)
    .map(normalizeCfSpeakToken)
    .filter(Boolean);
  if (!els.length || !want.length) return els;

  const have = els.map((el) => normalizeCfSpeakToken(el.textContent));
  outer: for (let start = 0; start <= have.length - want.length; start += 1) {
    for (let i = 0; i < want.length; i += 1) {
      if (have[start + i] !== want[i]) continue outer;
    }
    return els.slice(start, start + want.length);
  }
  return els;
}

/** 괄호 안 영어 구문이 있고 enRepeat/cfSpeakRates가 0이 아니면 cf 영어를 읽음 */
function shouldSpeakCfEnglish(word) {
  if (!getCfSpeakRates(word).length) return false;
  return extractCfParenEnglishParts(word?.cf).length > 0;
}

function getCfEnglishSpeakParts(word) {
  if (!shouldSpeakCfEnglish(word)) return [];
  return extractCfParenEnglishParts(word?.cf);
}

/** 구문별로 TTS 재생 — enRepeat(또는 cfSpeakRates) 횟수만큼 (cf 하이라이트 없음) */
async function playCfEnglishWithHighlight(itemEl, word, ratesOverride = null, options = null) {
  const parts = getCfEnglishSpeakParts(word);
  if (!parts.length || !itemEl) return;
  const coreOnly = Boolean(options?.coreOnly);
  const rates = Array.isArray(ratesOverride) && ratesOverride.length
    ? ratesOverride
    : getCfSpeakRates(word);
  const onRepeatTick = typeof options?.onRepeatTick === "function" ? options.onRepeatTick : null;
  const cfNoteEl = itemEl.querySelector(".cf-note");
  if (cfNoteEl) revealCfNote(cfNoteEl);

  for (let i = 0; i < parts.length; i += 1) {
    const speakText = stripCfKoreanForSpeak(
      coreOnly ? extractCfCoreEnglish(parts[i], word?.en) : parts[i]
    );
    if (!String(speakText || "").trim() || !/[A-Za-z]/.test(speakText)) continue;
    await playEnTTS(speakText, rates, null, onRepeatTick);
    if (i < parts.length - 1) await sleep(120);
  }
}

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;
const TTS_FADE_IN_SEC = 0.04;
let ttsAudioCtx = null;
let ttsActiveSource = null;

function getTtsAudioContext() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!ttsAudioCtx) ttsAudioCtx = new Ctx();
  return ttsAudioCtx;
}

async function unlockTtsAudioContext() {
  const ctx = getTtsAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    try {
      await ctx.resume();
    } catch (_) {}
  }
}

function stopTtsSource() {
  if (!ttsActiveSource) return;
  try {
    ttsActiveSource.stop();
  } catch (_) {}
  ttsActiveSource = null;
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}
  window.__shortsCurrentAudio = null;
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
  const arr = await response.arrayBuffer();
  const ctx = getTtsAudioContext();
  if (ctx) {
    await unlockTtsAudioContext();
    const buffer = await ctx.decodeAudioData(arr.slice(0));
    return { buffer };
  }
  const audio = new Audio(URL.createObjectURL(new Blob([arr])));
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
  if (!enText) return;
  loadBackendTTSAudio(enText, resolveEnTtsVoiceId("en-US")).catch(() => {});
}

async function playEnTTS(text, rates = [1], wordEls = null, onRepeatTick = null) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const rateList = Array.isArray(rates) && rates.length ? rates : [1];
  try {
    for (let i = 0; i < rateList.length; i += 1) {
      const remaining = rateList.length - i;
      if (typeof onRepeatTick === "function") onRepeatTick(remaining, rateList.length);
      if (i > 0) await sleep(160);
      await playBackendTTS(enText, resolveEnTtsVoiceId("en-US"), rateList[i], wordEls);
    }
  } finally {
    if (typeof onRepeatTick === "function") onRepeatTick(0, rateList.length);
  }
}

function preloadKoTTS(word) {
  if (!word) return;
  const koText = getKoSpeakText(word.ko || word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveKoTtsVoiceId("ko-KR")).catch(() => {});
}

function preloadExampleKoTTS(word) {
  if (!word) return;
  const koText = getExampleKoSpeakText(word);
  if (!koText) return;
  loadBackendTTSAudio(koText, resolveExampleKoTtsVoiceId()).catch(() => {});
}

function preloadCfEnglishTTS(word) {
  if (!word) return;
  const voice = resolveEnTtsVoiceId("en-US");
  getCfEnglishSpeakParts(word).forEach((part) => {
    const text = stripCfKoreanForSpeak(part);
    if (!text) return;
    loadBackendTTSAudio(text, voice).catch(() => {});
  });
}

function preloadWordTTS(word, globalIndex = -1) {
  preloadEnTTS(word);
  preloadExampleKoTTS(word);
  preloadCfEnglishTTS(word);
}

async function playExampleKoTTS(word) {
  const koText = getExampleKoSpeakText(word);
  if (!koText) return;
  await playBackendTTS(koText, resolveExampleKoTtsVoiceId());
}

function preloadWordsAhead(startIndex, count) {
  let loaded = 0;
  for (let i = startIndex; i < json1.length && loaded < count; i += 1) {
    if (!isWordItem(json1[i])) continue;
    preloadWordTTS(json1[i], i);
    loaded += 1;
  }
}

/** 숫자 → 영어 발화형 (하이라이트 가중치용; TTS와 비슷한 길이) */
const HIGHLIGHT_ONES = [
  "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
  "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"
];
const HIGHLIGHT_TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
];

function numberToSpokenWordsEn(n) {
  const num = parseInt(n, 10);
  if (!Number.isFinite(num) || num < 0) return "";
  if (num === 0) return "zero";
  if (num < 20) return HIGHLIGHT_ONES[num];
  if (num < 100) {
    return HIGHLIGHT_TENS[Math.floor(num / 10)] + (num % 10 ? "-" + HIGHLIGHT_ONES[num % 10] : "");
  }
  if (num < 1000) {
    return HIGHLIGHT_ONES[Math.floor(num / 100)] + " hundred"
      + (num % 100 ? " " + numberToSpokenWordsEn(num % 100) : "");
  }
  if (num < 1e6) {
    return numberToSpokenWordsEn(Math.floor(num / 1000)) + " thousand"
      + (num % 1000 ? " " + numberToSpokenWordsEn(num % 1000) : "");
  }
  if (num < 1e9) {
    return numberToSpokenWordsEn(Math.floor(num / 1e6)) + " million"
      + (num % 1e6 ? " " + numberToSpokenWordsEn(num % 1e6) : "");
  }
  return String(num);
}

function amountNumToSpokenWordsEn(numStr) {
  const cleaned = String(numStr || "").replace(/,/g, "").trim();
  if (!cleaned) return "";
  if (!/\./.test(cleaned)) {
    const n = parseInt(cleaned, 10);
    return Number.isFinite(n) ? numberToSpokenWordsEn(n) : "";
  }
  const [intPart, fracPart = ""] = cleaned.split(".");
  const intN = parseInt(intPart, 10);
  if (!Number.isFinite(intN)) return "";
  let spoken = numberToSpokenWordsEn(intN);
  const fracDigits = fracPart.replace(/\D/g, "");
  if (fracDigits) {
    const digitWords = [...fracDigits].map((ch) => {
      const d = parseInt(ch, 10);
      return Number.isFinite(d) ? (d === 0 ? "zero" : HIGHLIGHT_ONES[d]) : "";
    }).filter(Boolean);
    if (digitWords.length) spoken += " point " + digitWords.join(" ");
  }
  return spoken;
}

function spokenTextLetterWeight(spoken) {
  return Math.max(1, String(spoken || "").replace(/[^A-Za-z']/g, "").length);
}

/**
 * TTS 하이라이트 가중치.
 * $135 은 글자 4지만 실제로는 "one hundred thirty-five dollars"처럼 길게 읽히므로
 * 통화·소수·퍼센트는 발화형 글자 수로 맞춘다.
 */
function estimateSpokenHighlightWeight(text) {
  const raw = String(text || "").trim();
  if (!raw) return 1;

  let weight = 0;
  let remaining = raw;

  remaining = remaining.replace(/\$[\d,]+(?:\.\d+)?/g, (m) => {
    const spoken = amountNumToSpokenWordsEn(m.slice(1));
    weight += spokenTextLetterWeight(spoken ? `${spoken} dollars` : m);
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\s*%/g, (m) => {
    const num = m.replace(/[^\d.,]/g, "");
    const spoken = amountNumToSpokenWordsEn(num);
    weight += spokenTextLetterWeight(spoken ? `${spoken} percent` : m);
    return " ";
  });
  remaining = remaining.replace(/\b[\d,]+(?:\.\d+)?\b/g, (m) => {
    const spoken = amountNumToSpokenWordsEn(m);
    weight += spokenTextLetterWeight(spoken || m);
    return " ";
  });
  weight += remaining.replace(/[^A-Za-z0-9']/g, "").length;
  return Math.max(1, weight);
}

function startWordHighlightSync(audio, wordEls) {
  if (!audio || !Array.isArray(wordEls) || !wordEls.length) return () => {};
  const weights = wordEls.map((el) => estimateSpokenHighlightWeight(el.textContent));
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  let current = -1;
  let raf = 0;

  const setActive = (idx) => {
    if (idx === current) return;
    if (current >= 0 && wordEls[current]) wordEls[current].classList.remove("is-speaking");
    current = idx;
    if (current >= 0 && wordEls[current]) wordEls[current].classList.add("is-speaking");
  };

  const clear = () => {
    wordEls.forEach((el) => el.classList.remove("is-speaking"));
    current = -1;
  };

  const update = () => {
    const dur = audio.duration;
    if (Number.isFinite(dur) && dur > 0) {
      const progress = Math.min(1, Math.max(0, audio.currentTime / dur));
      let cum = 0;
      let idx = wordEls.length - 1;
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

async function playTtsBuffer(entry, playbackRate = 1, wordEls = null) {
  const ctx = getTtsAudioContext();
  if (!ctx || !entry?.buffer) return false;
  await unlockTtsAudioContext();
  stopTtsSource();

  const rate = Number(playbackRate);
  const safeRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  const source = ctx.createBufferSource();
  source.buffer = entry.buffer;
  source.playbackRate.value = safeRate;
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(1, now + TTS_FADE_IN_SEC);
  source.connect(gain);
  gain.connect(ctx.destination);
  ttsActiveSource = source;

  const duration = entry.buffer.duration / safeRate;
  const startedAt = ctx.currentTime;
  let stopped = false;
  const clock = {
    get duration() {
      return duration;
    },
    get currentTime() {
      return Math.min(duration, Math.max(0, ctx.currentTime - startedAt));
    },
    get paused() {
      return stopped;
    },
    get ended() {
      return stopped;
    },
    pause() {
      if (stopped) return;
      stopped = true;
      try {
        source.stop();
      } catch (_) {}
      if (ttsActiveSource === source) ttsActiveSource = null;
    }
  };
  window.__shortsCurrentAudio = clock;
  const stopHighlight = startWordHighlightSync(clock, wordEls);

  await new Promise((resolve) => {
    source.onended = () => resolve();
    try {
      source.start(0);
    } catch (_) {
      resolve();
    }
  });

  stopped = true;
  if (ttsActiveSource === source) ttsActiveSource = null;
  stopHighlight();
  if (window.__shortsCurrentAudio === clock) window.__shortsCurrentAudio = null;
  return true;
}

async function playAudioElement(audio, playbackRate = 1, wordEls = null) {
  if (audio?.buffer) {
    return playTtsBuffer(audio, playbackRate, wordEls);
  }

  stopTtsSource();
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
  audio.volume = 0;
  audio.currentTime = 0;

  const stopHighlight = startWordHighlightSync(audio, wordEls);

  try {
    await audio.play();
  } catch (_) {
    stopHighlight();
    if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
    return false;
  }

  const fadeMs = TTS_FADE_IN_SEC * 1000;
  const fadeStart = performance.now();
  await new Promise((resolve) => {
    const step = () => {
      if (window.__shortsCurrentAudio !== audio) {
        resolve();
        return;
      }
      const p = Math.min(1, (performance.now() - fadeStart) / fadeMs);
      audio.volume = p;
      if (p < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });

  await new Promise((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
  });

  stopHighlight();
  if (window.__shortsCurrentAudio === audio) window.__shortsCurrentAudio = null;
  return true;
}

async function playBackendTTS(text, languageKey, playbackRate = 1, wordEls = null) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate, wordEls);
  } catch (_) {}
}

function hideAllKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .ko-text').forEach((el) => {
    el.classList.add("hidden-ko");
    el.classList.remove("ko-reserving", "ko-hand", "ko-writing");
    el.style.removeProperty("--ko-write-p");
    el.textContent = "";
  });
}

/** EN 재생 전에 한글 폭만큼 자리를 잡아 ✍️ 최종 위치 고정 (손은 왼쪽에서 대기) */
function reserveKoSlot(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (text) koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-writing");
  koTextEl.style.setProperty("--ko-write-p", "0");
  koTextEl.classList.add("ko-reserving", "ko-hand");
}

function revealKoText(koTextEl, fallback = "") {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  if (text) koTextEl.textContent = text;
  koTextEl.classList.remove("hidden-ko", "ko-reserving", "ko-writing");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.add("ko-hand");
}

/** 손이 왼쪽→오른쪽으로 이동하며 한글이 드러남 — 실제 필기처럼 불규칙한 속도 */
async function writeKoWithHand(koTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!koTextEl) return;
  const text = koTextEl.dataset.fullKo || fallback || "";
  // 한글 손글씨 시작과 동시에 발음·IPA·cf 한꺼번에 노출
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
  if (!text) {
    revealKoText(koTextEl, fallback);
    return;
  }

  const escapeHtml = (s) => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  koTextEl.classList.remove("hidden-ko", "ko-reserving");
  koTextEl.classList.add("ko-hand", "ko-writing");
  koTextEl.innerHTML = `<span class="ko-write-ink">${escapeHtml(text)}</span>`;
  koTextEl.style.setProperty("--ko-write-p", "0");
  void koTextEl.offsetWidth;

  const letters = text.replace(/\s/g, "").length;
  const duration = Math.min(1800, Math.max(550, letters * 110));
  const curve = makeIrregularHandwriteCurve(Math.max(letters, text.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      koTextEl.style.setProperty("--ko-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  koTextEl.textContent = text;
  koTextEl.classList.remove("ko-writing");
  koTextEl.style.removeProperty("--ko-write-p");
  koTextEl.classList.add("ko-hand");
}

function clearKoHand(koTextEl) {
  koTextEl?.classList.remove("ko-hand", "ko-reserving", "ko-writing");
  koTextEl?.style.removeProperty("--ko-write-p");
}

/** 한글 읽기 직후: 현재 손 제거 → 피드의 다음 단어에 손 미리 배치 */
function moveKoHandToNext(wordIndices, wordIndex) {
  const currentGlobalIndex = wordIndices[wordIndex];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  clearKoHand(currentItem?.querySelector(".ko-text"));

  const nextWordIndex = wordIndex + 1;
  if (nextWordIndex >= wordIndices.length) return;

  const nextGlobalIndex = wordIndices[nextWordIndex];
  const nextItem = tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`);
  if (!nextItem || nextItem.dataset.itemType !== "word") return;

  const nextKoTextEl = nextItem.querySelector(".ko-text");
  reserveKoSlot(nextKoTextEl, nextItem.dataset.ko || "");
}

function hideAllEnText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const enMain = item.querySelector(".en-main");
    const enTextEl = item.querySelector(".en-main-text");
    if (!enTextEl) return;
    const fullEn = enMain?.dataset.fullEn || item.dataset.en || "";
    enTextEl.classList.add("hidden-en-main");
    enTextEl.classList.remove("en-reserving", "en-hand", "en-writing", "en-partial-preview");
    enTextEl.style.removeProperty("--en-write-p");
    if (fullEn) enTextEl.textContent = fullEn;

    let preview = enMain?.querySelector(".en-preview");
    if (!preview && enMain) {
      preview = document.createElement("span");
      preview.className = "en-preview";
      enMain.insertBefore(preview, enTextEl);
    }
    if (preview) {
      preview.textContent = buildEnPreviewMask(fullEn);
      preview.classList.remove("hidden-en-preview");
    }
  });
}

function hideEnPreview(enTextEl) {
  const preview = enTextEl?.closest(".en-main")?.querySelector(".en-preview");
  if (preview) preview.classList.add("hidden-en-preview");
}

/** KO 재생 중: 미리보기 공개분은 보이고, 나머지는 폭만 잡고 손은 그 앞에서 대기 */
function reserveEnSlot(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);
  enTextEl.classList.remove("hidden-en-main", "en-writing");
  enTextEl.style.removeProperty("--en-write-p");
  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.add("en-reserving", "en-hand");
    return;
  }
  enTextEl.classList.add("en-reserving", "en-hand", "en-partial-preview");
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">${escapeEnHtml(rest)}</span>`;
}

/** 손글씨처럼 불규칙한 진행 곡선 (0→1) — 망설임/빠른 획/느린 획이 섞임 */
function makeIrregularHandwriteCurve(charCount) {
  const n = Math.max(16, Math.round(charCount * 5));
  const speeds = [];
  for (let i = 0; i < n; i += 1) {
    const r = Math.random();
    let s;
    if (r < 0.14) s = 0.18 + Math.random() * 0.22; // 망설임/멈칫
    else if (r < 0.32) s = 1.55 + Math.random() * 0.95; // 빠른 획
    else if (r < 0.48) s = 0.45 + Math.random() * 0.25; // 느린 획
    else s = 0.75 + Math.random() * 0.55;
    speeds.push(s);
  }
  const sum = speeds.reduce((a, b) => a + b, 0) || 1;
  const curve = [0];
  let acc = 0;
  for (const s of speeds) {
    acc += s / sum;
    curve.push(Math.min(1, acc));
  }
  curve[curve.length - 1] = 1;
  return curve;
}

function sampleHandwriteCurve(curve, t) {
  const x = Math.min(1, Math.max(0, t)) * (curve.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = curve[i] ?? 0;
  const b = curve[Math.min(i + 1, curve.length - 1)] ?? 1;
  return a + (b - a) * f;
}

/** 손이 왼쪽→오른쪽으로 이동하며 영어가 드러남 — 앞글자는 유지, 나머지만 불규칙하게 씀
 *  발음·IPA·cf는 손글씨 시작과 동시에 한꺼번에 노출
 */
async function writeEnWithHand(enTextEl, fallback = "", pronTextEl = null, cfNoteEl = null) {
  if (!enTextEl) return;
  const text = enTextEl.closest(".en-main")?.dataset.fullEn || fallback || "";
  // 발음·IPA·cf는 시작 시 한 번에 전체 노출 (타이핑 연출 없음)
  revealPronText(pronTextEl);
  revealCfNote(cfNoteEl);
  if (!text) {
    revealEnText(enTextEl, fallback);
    return;
  }

  const { prefix, rest } = getEnPreviewSplit(text);
  hideEnPreview(enTextEl);

  if (!rest) {
    enTextEl.textContent = text;
    enTextEl.classList.remove("hidden-en-main", "en-reserving", "en-writing", "en-partial-preview");
    enTextEl.classList.add("en-hand");
    enTextEl.style.removeProperty("--en-write-p");
    return;
  }

  enTextEl.classList.remove("hidden-en-main", "en-reserving");
  enTextEl.classList.add("en-hand", "en-writing", "en-partial-preview");
  enTextEl.innerHTML =
    `<span class="en-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="en-write-ink-wrap" data-hand-host="1">` +
    `<span class="en-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  enTextEl.style.setProperty("--en-write-p", "0");
  void enTextEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = Math.min(1800, Math.max(450, letters * 110));
  const curve = makeIrregularHandwriteCurve(Math.max(letters, rest.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      enTextEl.style.setProperty("--en-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  enTextEl.textContent = text;
  enTextEl.classList.remove("en-writing", "en-partial-preview");
  enTextEl.style.removeProperty("--en-write-p");
  enTextEl.classList.add("en-hand");
}

function preparePronForWriting(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  const html = pronTextEl.dataset.fullPronHtml;
  pronTextEl.classList.remove("hidden-pron-text");
  pronTextEl.classList.add("pron-writing");
  if (html) {
    pronTextEl.innerHTML = `<span class="pron-write-ink">${html}</span>`;
  }
}

function finishPronWriting(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  pronTextEl.classList.remove("pron-writing");
  pronTextEl.style.removeProperty("--en-write-p");
}

function revealPronText(pronTextEl) {
  if (!pronTextEl) return;
  restorePronHtml(pronTextEl);
  pronTextEl.classList.remove("hidden-pron-text", "pron-writing");
  pronTextEl.style.removeProperty("--en-write-p");
}

function clearEnHand(enTextEl) {
  enTextEl?.classList.remove("en-hand", "en-reserving", "en-writing", "en-partial-preview");
  enTextEl?.style.removeProperty("--en-write-p");
}

/** 영어 읽기 직후: 현재 손 제거 → 피드의 다음 단어 영어에 손 미리 배치 */
function moveEnHandToNext(wordIndices, wordIndex) {
  const currentGlobalIndex = wordIndices[wordIndex];
  const currentItem = tickerEl.querySelector(`.ticker-item[data-index="${currentGlobalIndex}"]`);
  clearEnHand(currentItem?.querySelector(".en-main-text"));

  const nextWordIndex = wordIndex + 1;
  if (nextWordIndex >= wordIndices.length) return;

  const nextGlobalIndex = wordIndices[nextWordIndex];
  const nextItem = tickerEl.querySelector(`.ticker-item[data-index="${nextGlobalIndex}"]`);
  if (!nextItem || nextItem.dataset.itemType !== "word") return;

  const nextEnTextEl = nextItem.querySelector(".en-main-text");
  reserveEnSlot(nextEnTextEl, nextItem.dataset.en || "");
}

function hideAllPronText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .pron-text').forEach((el) => {
    el.classList.add("hidden-pron-text");
    el.classList.remove("pron-writing");
    el.style.removeProperty("--en-write-p");
    restorePronHtml(el);
  });
}

function restorePronHtml(pronTextEl) {
  if (!pronTextEl) return;
  const html = pronTextEl.dataset.fullPronHtml;
  if (html) pronTextEl.innerHTML = html;
  else pronTextEl.textContent = pronTextEl.dataset.fullPron || "";
}

function showKoAsDefault() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"]').forEach((item) => {
    const koTextEl = item.querySelector(".ko-text");
    const ko = item.dataset.ko || "";
    if (!koTextEl) return;
    koTextEl.classList.remove("hidden-ko", "ko-reserving");
    koTextEl.textContent = ko;
  });
}

function revealEnText(enTextEl, fallback = "") {
  if (!enTextEl) return;
  const enMain = enTextEl.closest(".en-main");
  const text = enMain?.dataset.fullEn || fallback || "";
  if (text) enTextEl.textContent = text;
  enTextEl.classList.remove("hidden-en-main", "en-partial-preview");
  hideEnPreview(enTextEl);
}

function hideAllCfText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .cf-note').forEach((el) => {
    el.classList.add("hidden-cf");
  });
}

function hideAllExampleKoText() {
  tickerEl.querySelectorAll('.ticker-item[data-item-type="word"] .example-ko').forEach((el) => {
    el.classList.add("hidden-example-ko");
  });
}

function revealCfNote(cfNoteEl) {
  if (!cfNoteEl) return;
  cfNoteEl.classList.remove("hidden-cf");
  cfNoteEl.style.animation = "none";
  void cfNoteEl.offsetWidth;
  cfNoteEl.style.animation = "";
}

function revealExampleKo(exampleKoEl) {
  if (!exampleKoEl) return;
  exampleKoEl.classList.remove("hidden-example-ko");
}

function ensureBgmAudio() {
  if (bgmAudio) return bgmAudio;
  bgmAudio = new Audio(encodeURI(BGM_SRC));
  bgmAudio.loop = false;
  bgmAudio.preload = "auto";
  bgmAudio.volume = BGM_VOLUME;
  return bgmAudio;
}

function getAutoBgmStartSec(wordCount = getTotalWordCount()) {
  const count = Math.max(0, Number(wordCount) || 0);
  return Math.max(0, BGM_AUTO_BASE_SEC + (BGM_AUTO_BASE_WORDS - count) * BGM_AUTO_SEC_PER_WORD);
}

/** json1 위 BGM_START_SEC 우선. null이면 예문 수 자동 */
function getBgmStartSec(wordCount = getTotalWordCount()) {
  if (BGM_START_SEC != null && Number.isFinite(Number(BGM_START_SEC))) {
    return Math.max(0, Math.round(Number(BGM_START_SEC)));
  }
  return getAutoBgmStartSec(wordCount);
}

async function startBgm() {
  if (!bgmEnabled) {
    stopBgm();
    return;
  }
  const audio = ensureBgmAudio();
  audio.volume = BGM_VOLUME;
  try {
    if (audio.readyState < HTMLMediaElement.HAVE_METADATA) {
      await new Promise((resolve, reject) => {
        const onLoaded = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.removeEventListener("error", onError);
          resolve();
        };
        const onError = () => {
          audio.removeEventListener("loadedmetadata", onLoaded);
          audio.removeEventListener("error", onError);
          reject(new Error("bgm load failed"));
        };
        audio.addEventListener("loadedmetadata", onLoaded, { once: true });
        audio.addEventListener("error", onError, { once: true });
        audio.load();
      });
    }
    const duration = Number(audio.duration);
    let startSec = getBgmStartSec();
    // 시작 초가 곡 길이를 넘으면 재생이 안 됨 → 끝 직전으로 보정
    if (Number.isFinite(duration) && duration > 1) {
      startSec = Math.max(0, Math.min(startSec, duration - 1));
    }
    audio.currentTime = startSec;
    await audio.play();
  } catch (_) {
    // 브라우저 자동재생 정책 등으로 실패해도 TTS는 진행
  }
}

function stopBgm() {
  if (!bgmAudio) return;
  try {
    bgmAudio.pause();
    const duration = Number(bgmAudio.duration);
    let startSec = getBgmStartSec();
    if (Number.isFinite(duration) && duration > 1) {
      startSec = Math.max(0, Math.min(startSec, duration - 1));
    }
    bgmAudio.currentTime = startSec;
  } catch (_) {}
}

function syncBgmButton() {
  const btn = document.getElementById("bgm-btn");
  if (!btn) return;
  btn.classList.toggle("is-on", bgmEnabled);
  btn.classList.toggle("is-off", !bgmEnabled);
  btn.setAttribute("aria-pressed", bgmEnabled ? "true" : "false");
  btn.title = bgmEnabled ? "BGM on (클릭=끔)" : "BGM off (클릭=켬)";
  btn.textContent = bgmEnabled ? "BGM on" : "BGM off";
}

async function toggleBgm() {
  bgmEnabled = !bgmEnabled;
  syncBgmButton();
  if (bgmEnabled) {
    // 버튼 클릭 = 사용자 제스처 → autoplay 전이라도 바로 재생
    await startBgm();
  } else {
    stopBgm();
  }
  const btn = document.getElementById("bgm-btn");
  if (btn) btn.hidden = true;
}

async function runAutoplay() {
  if (isAutoplayRunning) return;
  window.Mark3readPageBg?.hidePageBgPicker?.();
  isAutoplayRunning = true;
  autoplayBtn.disabled = true;
  autoplayBtn.textContent = "playing...";
  const bgmBtn = document.getElementById("bgm-btn");
  if (bgmBtn) bgmBtn.hidden = true;
  pickRandomEnTtsVoice();
  activeProgressBarTheme = pickRandomProgressBarTheme();

  const wordIndices = getAllWordIndices();
  const progressTotal = getProgressTotal();
  let doneCount = 0;
  updateProgress(0, progressTotal);

  if (!wordIndices.length) {
    autoplayBtn.textContent = "auto play";
    autoplayBtn.disabled = false;
    isAutoplayRunning = false;
    return;
  }

  const skipTitleFx = titleFxCurrent === "off";
  const titleFxAt = skipTitleFx ? 0 : Date.now() + 3000;
  setTitleFxDockHidden(true);
  if (!skipTitleFx) holdTitleFxForAutoplay();

  assignSwipeStyles();
  await unlockTtsAudioContext();
  await startBgm();

  // 시작: 연속 피드로 VISIBLE_COUNT개 표시 (5개씩 장면 전환 없음)
  renderWordFeed(wordIndices, 0, false, "second-pass");
  showKoAsDefault();
  hideAllEnText();
  hideAllPronText();
  hideAllCfText();
  hideAllExampleKoText();
  preloadWordsAhead(0, json1.length);

  if (!skipTitleFx) {
    const titleWait = titleFxAt - Date.now();
    if (titleWait > 0) await sleep(titleWait);
    await playSelectedTitleFxForAutoplay();
  }

  // 1패스: 한글 먼저 노출 → 영어 손 쓰기 → EN 읽기 → swipe up
  for (let i = 0; i < wordIndices.length; i += 1) {
    const globalIndex = wordIndices[i];
    preloadWordsAhead(globalIndex + 1, VISIBLE_COUNT);

    const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
    if (!item || item.dataset.itemType !== "word") continue;

    const enTextEl = item.querySelector(".en-main-text");

    item.classList.add("is-word-active");
    // 선은 단어 페이드 때 fadeClearPenDrawings로 지움 (여기서 즉시 지우면 늦게 느껴짐)
    if (typeof window.placePenNearWord === "function") {
      window.placePenNearWord(item);
    }
    nudgeProgressSoft(doneCount, progressTotal);
    preloadWordTTS(json1[globalIndex], globalIndex);
    reserveEnSlot(enTextEl, item.dataset.en || "");
    // 한글은 노출만 → 영어·발음·cf 손 쓰기 동시 → EN 읽기
    const pronTextEl = item.querySelector(".pron-text");
    const cfNoteEl = item.querySelector(".cf-note");
    const exampleKoEl = item.querySelector(".example-ko");
    await writeEnWithHand(enTextEl, item.dataset.en || "", pronTextEl, cfNoteEl);
    enTextEl?.classList.add("is-speaking");
    const wordData = json1[globalIndex];
    try {
      await playEnTTS(getEnSpeakText(wordData), getEnSpeakRates(wordData));
    } finally {
      enTextEl?.classList.remove("is-speaking");
    }

    if (exampleKoEl && getExampleKoSpeakText(wordData)) {
      revealExampleKo(exampleKoEl);
      exampleKoEl.classList.add("is-speaking");
      try {
        await playExampleKoTTS(wordData);
      } finally {
        exampleKoEl.classList.remove("is-speaking");
      }
    }

    if (shouldSpeakCfEnglish(wordData)) {
      await sleep(EN_TO_CF_GAP_MS);
      try {
        await playCfEnglishWithHighlight(
          item,
          wordData,
          getCfSpeakRates(wordData),
          { onRepeatTick: (remaining, total) => updateEnRepeatBanner(item, remaining, total) }
        );
      } finally {
        updateEnRepeatBanner(item, 0);
      }
    }

    if (cfNoteEl) await sleep(CF_READ_PAUSE_MS);
    else await sleep(PRON_HOLD_MS);

    doneCount += 1;
    updateProgress(doneCount, progressTotal);
    moveEnHandToNext(wordIndices, i);

    const nextFill = i + VISIBLE_COUNT < wordIndices.length ? wordIndices[i + VISIBLE_COUNT] : null;
    if (i < wordIndices.length - 1) {
      await swipeUpWordAndAppend(globalIndex, nextFill, "second-pass");
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();

  // 2패스: 영어 먼저 읽기 → 한글 손 쓰기 노출 → swipe up (cf TTS 없음)
  if (EN_KO_PASS_COUNT >= 2) {
    await sleep(700);

    renderWordFeed(wordIndices, 0, true, "normal");
    hideAllKoText();
    hideAllPronText();
    hideAllCfText();
    hideAllExampleKoText();

    for (let i = 0; i < wordIndices.length; i += 1) {
      const globalIndex = wordIndices[i];
      preloadWordsAhead(globalIndex + 1, VISIBLE_COUNT);

      const item = tickerEl.querySelector(`.ticker-item[data-index="${globalIndex}"]`);
      if (!item || item.dataset.itemType !== "word") continue;

      const ko = item.dataset.ko || "";
      const koTextEl = item.querySelector(".ko-text");
      const pronTextEl = item.querySelector(".pron-text");

      item.classList.add("is-word-active");
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord(item);
      }
      nudgeProgressSoft(doneCount, progressTotal);
      reserveKoSlot(koTextEl, ko);
      const cfNoteEl = item.querySelector(".cf-note");
      const enMainEl = item.querySelector(".en-main-text");
      if (enMainEl) enMainEl.classList.add("is-speaking");
      try {
        const wordData = json1[globalIndex];
        await playEnTTS(getEnSpeakText(wordData), getEnSpeakRates(wordData));
      } finally {
        if (enMainEl) enMainEl.classList.remove("is-speaking");
      }
      if (koTextEl) {
        // 한글 손글씨 시작 때 발음·IPA·cf 한꺼번에 노출
        await writeKoWithHand(koTextEl, ko, pronTextEl, cfNoteEl);
      }
      moveKoHandToNext(wordIndices, i);
      await showWordFlashImage(globalIndex);
      await markWordAsRead(globalIndex);
      doneCount += 1;
      updateProgress(doneCount, progressTotal);
      if (cfNoteEl) await sleep(CF_READ_PAUSE_MS);
      else await sleep(PRON_HOLD_MS);

      const nextFill = i + VISIBLE_COUNT < wordIndices.length ? wordIndices[i + VISIBLE_COUNT] : null;
      if (i < wordIndices.length - 1) {
        await swipeUpWordAndAppend(globalIndex, nextFill, "normal");
      }
    }
  }

  resetWordFlashImage();
  resetWordFlashVideo();
  stopBgm();
  if (typeof window.clearPenDrawings === "function") {
    window.clearPenDrawings();
  }

  await startReviewQuiz();

  setTitleFxDockHidden(false);
  autoplayBtn.textContent = "auto play";
  autoplayBtn.disabled = false;
  isAutoplayRunning = false;
}

/** 정답 → 앞 3글자 + 나머지 글자 수만큼 _ (붙여쓰기). 폭은 정답 sizer로 고정 */
function buildReviewBlankHtml(answer) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);
  const marks = rest ? "_".repeat(rest.length) : "";
  const marksHtml = marks
    ? `<span class="rv-blank-marks">${escapeEnHtml(marks)}</span>`
    : "";
  return (
    `<span class="rv-blank" data-answer="${escapeEnHtml(ans)}">` +
    `<span class="rv-blank-sizer" aria-hidden="true">${escapeEnHtml(ans)}</span>` +
    `<span class="rv-blank-face">` +
    `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>` +
    marksHtml +
    `</span></span>`
  );
}

function formatReviewEnHtml(en, answer) {
  const blankHtml = buildReviewBlankHtml(answer);
  let html = escapeEnHtml(String(en || ""));
  if (blankHtml) {
    const replaced = html.replace(/[A-Za-z]{1,3}_{2,}/g, blankHtml);
    if (replaced !== html) return replaced;
    return html.replace(/_{2,}/g, blankHtml);
  }
  return html;
}

/** 첫 낭독용: 빈칸은 항상 "blank"로만 읽음 (정답·접두 힌트 미포함) */
function buildReviewSpeakText(en) {
  return String(en || "")
    .replace(/[A-Za-z]{1,3}_{2,}/g, "blank")
    .replace(/_{2,}/g, "blank")
    .replace(/\s+/g, " ")
    .trim();
}

/** 문장 빈칸에 ✍️ 손으로 정답 쓰기 — 앞글자(접두)는 두고 빈 곳만 채움. 폭은 sizer로 고정 */
async function writeReviewAnswerInBlank(enEl, answer) {
  if (!enEl) return;
  const ans = String(answer || "").trim();
  if (!ans) return;

  let blankEl = enEl.querySelector(".rv-blank");
  if (!blankEl) {
    blankEl = document.createElement("span");
    blankEl.className = "rv-blank";
    blankEl.dataset.answer = ans;
    enEl.appendChild(blankEl);
  }

  let sizerEl = blankEl.querySelector(".rv-blank-sizer");
  let faceEl = blankEl.querySelector(".rv-blank-face");
  if (!sizerEl || !faceEl) {
    blankEl.innerHTML =
      `<span class="rv-blank-sizer" aria-hidden="true">${escapeEnHtml(ans)}</span>` +
      `<span class="rv-blank-face"></span>`;
    sizerEl = blankEl.querySelector(".rv-blank-sizer");
    faceEl = blankEl.querySelector(".rv-blank-face");
  }
  sizerEl.textContent = ans;

  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);

  blankEl.classList.add("rv-blank-hand", "rv-blank-writing", "rv-blank-partial");
  if (!rest) {
    faceEl.innerHTML = `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>`;
    blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
    blankEl.classList.add("rv-blank-filled");
    return;
  }

  faceEl.innerHTML =
    `<span class="rv-blank-prefix rv-write-done">${escapeEnHtml(prefix)}</span>` +
    `<span class="rv-write-ink-wrap" data-hand-host="1">` +
    `<span class="rv-write-ink">${escapeEnHtml(rest)}</span>` +
    `</span>`;
  blankEl.style.setProperty("--rv-write-p", "0");
  void blankEl.offsetWidth;

  const letters = rest.replace(/\s/g, "").length;
  const duration = Math.min(1800, Math.max(450, letters * 110));
  const curve = makeIrregularHandwriteCurve(Math.max(letters, rest.length));
  const start = performance.now();

  await new Promise((resolve) => {
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const p = sampleHandwriteCurve(curve, t);
      blankEl.style.setProperty("--rv-write-p", String(p));
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    };
    requestAnimationFrame(tick);
  });

  faceEl.innerHTML =
    `<span class="rv-blank-prefix">${escapeEnHtml(prefix)}</span>` +
    `<span class="rv-blank-rest">${escapeEnHtml(rest)}</span>`;
  blankEl.classList.remove("rv-blank-writing", "rv-blank-partial");
  blankEl.classList.add("rv-blank-filled", "rv-blank-hand");
  blankEl.style.removeProperty("--rv-write-p");
}

function ensureReviewRoot() {
  let root = document.getElementById("review-root");
  if (root) return root;
  root = document.createElement("div");
  root.id = "review-root";
  root.hidden = true;
  root.innerHTML = `
    <div class="rv-panel">
      <div class="rv-countdown-slot">
        <div class="countdown-wrap" id="countdown-wrap" hidden>
          <div class="countdown-stage" data-mode="ring">
            <svg class="countdown-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle class="countdown-ring-track" cx="60" cy="60" r="52"></circle>
              <circle class="countdown-ring-progress" id="countdown-ring-progress" cx="60" cy="60" r="52"
                pathLength="100" stroke-dasharray="100" stroke-dashoffset="0"></circle>
            </svg>
            <span class="countdown-num" id="countdown-num" aria-hidden="true">3</span>
            <div class="countdown-bars" id="countdown-bars" aria-hidden="true">
              <i></i><i></i><i></i><i></i><i></i>
            </div>
          </div>
        </div>
      </div>
      <div id="rv-title"></div>
      <div id="rv-en"></div>
      <div id="rv-ko"></div>
    </div>
  `;
  document.body.appendChild(root);
  return root;
}

function getReviewCountdownEls() {
  const wrap = document.getElementById("countdown-wrap");
  return {
    wrap,
    num: document.getElementById("countdown-num"),
    ring: document.getElementById("countdown-ring-progress"),
    bars: document.getElementById("countdown-bars"),
    stage: wrap ? wrap.querySelector(".countdown-stage") : null
  };
}

function getCountdownStyle(item, index = 0) {
  const style = String(item?.countdownStyle || "").trim().toLowerCase();
  if (COUNTDOWN_MODES.includes(style)) return style;
  return "ring";
}

function setCountdownRing(sec, total) {
  const { ring } = getReviewCountdownEls();
  if (!ring) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  ring.style.strokeDashoffset = String(Math.min(100, Math.max(0, spent)));
}

function setCountdownBars(sec) {
  const { bars } = getReviewCountdownEls();
  if (!bars) return;
  [...bars.querySelectorAll("i")].forEach((bar, idx) => {
    bar.classList.toggle("is-on", idx < sec);
  });
}

function bumpCountdownAnim() {
  const { num } = getReviewCountdownEls();
  if (!num) return;
  num.classList.remove("is-anim");
  void num.offsetWidth;
  num.classList.add("is-anim");
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
  const { stage } = getReviewCountdownEls();
  if (stage) stage.dataset.mode = mode;
}

async function runCountdown(seconds, mode = "ring", tickSrc = "") {
  const { wrap, num } = getReviewCountdownEls();
  if (!wrap || !num) return;
  const style = COUNTDOWN_MODES.includes(mode) ? mode : "ring";
  setCountdownMode(style);
  wrap.hidden = false;
  startCountdownTickSound(tickSrc);

  if (style === "ring") setCountdownRing(seconds, seconds);
  if (style === "bars") setCountdownBars(seconds);

  try {
    for (let sec = seconds; sec >= 0; sec -= 1) {
      if (!isAutoplayRunning) break;
      num.textContent = String(sec);
      if (style === "ring") setCountdownRing(sec, seconds);
      if (style === "bars") setCountdownBars(sec);
      bumpCountdownAnim();
      await sleep(1000);
    }
  } finally {
    stopCountdownTickSound();
    wrap.hidden = true;
    num.classList.remove("is-anim");
  }
}

async function fadeReviewIn(root, wrapper) {
  document.body.classList.add("is-review-mode");
  if (wrapper) {
    wrapper.classList.add("is-fading-out");
    await sleep(REVIEW_FADE_MS);
    wrapper.style.visibility = "hidden";
    wrapper.classList.remove("is-fading-out");
  }
  root.hidden = false;
  root.classList.remove("is-visible");
  void root.offsetWidth;
  root.classList.add("is-visible");
  await sleep(REVIEW_FADE_MS);
}

async function startReviewQuiz() {
  const quizzes = Array.isArray(REVIEW_QUIZ)
    ? REVIEW_QUIZ.filter((q) => q && q.en && q.answer)
    : [];
  if (!quizzes.length) return;

  const root = ensureReviewRoot();
  const titleEl = document.getElementById("rv-title");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  const panelEl = root.querySelector(".rv-panel");
  const wrapper = document.querySelector("main.wrapper");

  const renderQuiz = (q, index) => {
    if (titleEl) titleEl.textContent = `Review ${index + 1}/${quizzes.length}`;
    if (enEl) enEl.innerHTML = formatReviewEnHtml(q.en, q.answer);
    if (koEl) koEl.textContent = String(q.ko || "").trim();
  };

  renderQuiz(quizzes[0], 0);
  await fadeReviewIn(root, wrapper);
  if (typeof window.placePenNearWord === "function") {
    window.placePenNearWord(enEl || panelEl);
  }

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    if (i > 0) {
      if (typeof window.clearPenDrawings === "function") {
        window.clearPenDrawings();
      }
      if (panelEl) {
        panelEl.classList.add("is-switching");
        await sleep(REVIEW_FADE_MS * 0.55);
      }
      renderQuiz(q, i);
      if (panelEl) {
        panelEl.classList.remove("is-switching");
        void panelEl.offsetWidth;
        panelEl.classList.add("is-shown");
        await sleep(REVIEW_FADE_MS * 0.55);
        panelEl.classList.remove("is-shown");
      }
      if (typeof window.placePenNearWord === "function") {
        window.placePenNearWord(enEl || panelEl);
      }
    }

    const speakText = buildReviewSpeakText(q.en);
    if (speakText) {
      try {
        await playEnTTS(speakText);
      } catch (_) {}
    }
    await sleep(400);

    await runCountdown(
      COUNTDOWN_SEC,
      getCountdownStyle(q, i),
      q.countdownTick || REVIEW_COUNTDOWN_TICK
    );

    await writeReviewAnswerInBlank(enEl, q.answer);
    if (q.answer) {
      try {
        await playEnTTS(q.answer);
      } catch (_) {}
    }
    await sleep(1800);
  }

  stopCountdownTickSound();
  const { wrap } = getReviewCountdownEls();
  if (wrap) wrap.hidden = true;
  // 마지막 문제 후 Review 화면에 그대로 종료
}

applyPageBackground();
initSharedPageBgPicker();
applyThumbTypography();

window.CFLF_THUMB = {
  SHORTS_BANNER_PART_A,
  SHORTS_BANNER_PART_B,
  THUMB_FONT_BOOST_PX,
  THUMB_TITLE_MAIN_FONT_PX,
  THUMB_EN_MAIN_EXTRA_PX,
  THUMB_KO_EXTRA_PX,
  THUMB_CF_EN_EXTRA_PX,
  PAGE_BG_COLOR_DEFAULT,
  PAGE_TITLE_MAIN,
  PAGE_TITLE_SUB_LINE1,
  PAGE_TITLE_SUB_LINE2,
  PAGE_TITLE_PUBLISHER,
  PAGE_TITLE_DATE,
  PAGE_TITLE_SUB_FONT_PX,
  PAGE_TITLE_SUB_BOX_HEIGHT_PX,
  json1,
  buildPageTitleHtml,
  buildPageTitleMeta,
  formatTitleLineMarks,
  resolveTitleSubLines,
  fitTitleSubToBox,
  escapeTitleHtml,
  isWordItem,
  isTitleItem,
  getWordDisplayNumber,
  createItemElement
};

const CFLF_THUMB_ONLY = document.documentElement.dataset.cflfMode === "thumb";

if (!CFLF_THUMB_ONLY) {
if (pageTitleEl) {
  initTitleFxSample();
  applyPageTitle();
  window.addEventListener("resize", () => {
    fitTitleSubToBox();
    fitAllWordLines();
  });
}
renderStaticList();
syncBgmButton();
autoplayBtn?.addEventListener("click", runAutoplay);
document.getElementById("bgm-btn")?.addEventListener("click", () => {
  void toggleBgm();
});
initPenDraw();
}

/** 펜: 탭=켜기/끄기 · 길게=빨강↔노랑 · 두번탭=전체 지우기 (gmgreen과 동일) */
function initPenDraw() {
  const canvas = document.getElementById("pen-canvas");
  const btn = document.getElementById("pen-btn");
  let pointer = document.getElementById("pen-pointer");
  if (!canvas || !btn) return;

  if (!pointer) {
    pointer = document.createElement("div");
    pointer.id = "pen-pointer";
    pointer.className = "pen-pointer";
    pointer.setAttribute("aria-hidden", "true");
    document.body.appendChild(pointer);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const COLORS = {
    red: "#ff2d2d",
    yellow: "#ffd400"
  };
  let colorKey = "red";
  let drawingEnabled = false;
  let isStroke = false;
  let lastX = 0;
  let lastY = 0;
  let longPressTimer = null;
  let longPressFired = false;
  let lastTapAt = 0;

  const syncSize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  };

  const movePointer = (x, y) => {
    pointer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const setColor = (key) => {
    colorKey = key === "yellow" ? "yellow" : "red";
    btn.dataset.color = colorKey;
    pointer.dataset.color = colorKey;
    btn.style.setProperty("--pen-color", COLORS[colorKey]);
    pointer.style.setProperty("--pen-color", COLORS[colorKey]);
  };

  const setDrawing = (on) => {
    drawingEnabled = Boolean(on);
    canvas.classList.toggle("is-drawing", drawingEnabled);
    btn.classList.toggle("is-on", drawingEnabled);
    pointer.classList.toggle("is-on", drawingEnabled);
    document.body.classList.toggle("is-pen-drawing", drawingEnabled);
    canvas.setAttribute("aria-hidden", drawingEnabled ? "false" : "true");
    if (!drawingEnabled) {
      movePointer(-100, -100);
    }
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  /** 단어 페이드와 동일 타이밍으로 선이 서서히 사라진 뒤 버퍼 비움 */
  const fadeClearPenDrawings = (durationMs = ITEM_FADE_MS) => {
    const ms = Math.max(0, Number(durationMs) || ITEM_FADE_MS);
    return new Promise((resolve) => {
      canvas.style.transition = `opacity ${ms}ms ease`;
      void canvas.offsetWidth;
      canvas.style.opacity = "0";
      window.setTimeout(() => {
        clearCanvas();
        canvas.style.transition = "none";
        canvas.style.opacity = "1";
        resolve();
      }, ms);
    });
  };

  const pointFromEvent = (e) => {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    if (e.changedTouches && e.changedTouches[0]) {
      return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  };

  const beginStroke = (e) => {
    if (!drawingEnabled) return;
    if (e.target === btn) return;
    const p = pointFromEvent(e);
    isStroke = true;
    lastX = p.x;
    lastY = p.y;
    movePointer(p.x, p.y);
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(lastX + 0.01, lastY + 0.01);
    ctx.stroke();
    e.preventDefault();
  };

  const moveStroke = (e) => {
    if (!drawingEnabled) return;
    const p = pointFromEvent(e);
    movePointer(p.x, p.y);
    if (!isStroke) return;
    ctx.strokeStyle = COLORS[colorKey];
    ctx.lineWidth = colorKey === "yellow" ? 4.5 : 3.5;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    lastX = p.x;
    lastY = p.y;
    e.preventDefault();
  };

  const endStroke = () => {
    isStroke = false;
  };

  const placePenNearWord = () => {
    // "시사 영단어" 전체 오른쪽 20px
    const anchor =
      document.querySelector(".shorts-banner__title") ||
      document.querySelector(".page-header .title-main");
    let rect = null;
    if (anchor) {
      try {
        const range = document.createRange();
        range.selectNodeContents(anchor);
        const textRect = range.getBoundingClientRect();
        if (textRect.width > 0 && textRect.height > 0) rect = textRect;
      } catch (_) {
        /* ignore */
      }
      if (!rect) rect = anchor.getBoundingClientRect();
    }
    btn.style.setProperty("position", "fixed", "important");
    btn.style.setProperty("right", "auto", "important");
    btn.style.setProperty("bottom", "auto", "important");
    btn.style.setProperty("transform", "translateY(-50%)", "important");
    btn.style.setProperty("z-index", "100110", "important");
    btn.style.setProperty("pointer-events", "auto", "important");
    canvas.style.setProperty("z-index", "100100", "important");
    pointer.style.setProperty("z-index", "100120", "important");
    if (rect && rect.width > 0 && rect.height > 0) {
      const x = rect.right + 20;
      const y = rect.top + rect.height / 2;
      btn.style.setProperty("left", `${Math.max(8, x)}px`, "important");
      btn.style.setProperty("top", `${y}px`, "important");
    } else {
      btn.style.setProperty("left", "auto", "important");
      btn.style.setProperty("right", "12px", "important");
      btn.style.setProperty("top", "30%", "important");
    }
  };

  window.clearPenDrawings = clearCanvas;
  window.fadeClearPenDrawings = fadeClearPenDrawings;
  window.placePenNearWord = placePenNearWord;

  syncSize();
  setColor("red");
  setDrawing(false);
  placePenNearWord();
  window.addEventListener("resize", () => {
    syncSize();
    placePenNearWord();
  });
  window.addEventListener("scroll", () => placePenNearWord(), { passive: true });
  window.setTimeout(() => placePenNearWord(), 100);
  window.setTimeout(() => placePenNearWord(), 500);
  window.setTimeout(() => placePenNearWord(), 1200);

  canvas.addEventListener("pointerdown", beginStroke, { passive: false });
  canvas.addEventListener("pointermove", moveStroke, { passive: false });
  canvas.addEventListener("pointerup", endStroke);
  canvas.addEventListener("pointercancel", endStroke);
  canvas.addEventListener("pointerleave", endStroke);

  btn.addEventListener("pointerdown", (e) => {
    longPressFired = false;
    longPressTimer = window.setTimeout(() => {
      longPressFired = true;
      setColor(colorKey === "red" ? "yellow" : "red");
      if (!drawingEnabled) setDrawing(true);
      btn.animate(
        [
          { transform: "translateY(-50%) scale(1)" },
          { transform: "translateY(-50%) scale(1.18)" },
          { transform: "translateY(-50%) scale(1.08)" }
        ],
        { duration: 220 }
      );
    }, 480);
    e.preventDefault();
  });

  const cancelLongPress = () => {
    if (longPressTimer) {
      window.clearTimeout(longPressTimer);
      longPressTimer = null;
    }
  };

  btn.addEventListener("pointerup", (e) => {
    cancelLongPress();
    if (longPressFired) {
      longPressFired = false;
      e.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastTapAt < 320) {
      clearCanvas();
      lastTapAt = 0;
      e.preventDefault();
      return;
    }
    lastTapAt = now;
    setDrawing(!drawingEnabled);
    e.preventDefault();
  });

  btn.addEventListener("pointercancel", cancelLongPress);
  btn.addEventListener("pointerleave", cancelLongPress);
  btn.addEventListener("contextmenu", (e) => e.preventDefault());
}
