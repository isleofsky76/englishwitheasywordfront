/* =====================================================================
   🔊 TTS 음성 설정 (제일 위)
   ---------------------------------------------------------------------
   enVoice / koVoice : 숫자(고정) 또는 "sequential" / "random"
   "sequential" (기본) → 1→2→3… 번호 순서, 한 바퀴 끝나면 다시 1부터
   "random" → 목록을 섞은 뒤 순서대로 (한 바퀴 끝나면 다시 섞음)
   ===================================================================== */

/** 영어 TTS 음성 목록 */
const EN_TTS_VOICE_IDS = {
  1: "en-US-Chirp-HD-D",                 // 남 · 미국
  2: "en-US-Chirp3-HD-Algenib",          // 남 · 미국 허스키
  3: "en-US-Chirp3-HD-Enceladus",        // 남 · 미국 허스키
  4: "en-US-Chirp-HD-F",                 // 여 · 미국
  5: "en-US-Chirp3-HD-Despina",          // 여 · 미국
  6: "en-US-Chirp3-HD-Gacrux",           // 여 · 미국 허스키
  7: "en-GB-Chirp3-HD-Zubenelgenubi",    // 남 · 영국
  8: "en-GB-Chirp-HD-D",                 // 남 · 영국
  9: "en-GB-Neural2-B",                  // 남 · 영국
  10: "en-GB-Wavenet-N",                 // 여 · 영국
};

/** 한글 TTS 음성 목록 */
const KO_TTS_VOICE_IDS = {
  1: "ko-KR-Chirp3-HD-Zephyr",           // 여 · 부드러운
  2: "ko-KR-Neural2-C",                  // 남 · Neural2
  3: "ko-KR-Chirp3-HD-Achernar",         // 여 · 차분
  4: "ko-KR-Chirp3-HD-Achird",           // 여 · 밝은
  5: "ko-KR-Chirp3-HD-Vindemiatrix",     // 여 · 성숙
  6: "ko-KR-Chirp3-HD-Zubenelgenubi",    // 남 · Chirp3
  7: "ko-KR-Chirp3-HD-Charon",           // 남 · Chirp3
  8: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  9: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  10: "ko-KR-Chirp3-HD-Gacrux",           // 여 · 차분
  11: "ko-KR",                            // 기본
};

/**
 * 영어 음성 — 1~10 또는 "sequential" / "random"
 * 한글 음성 — 1~8 또는 "sequential" / "random"
 */
const TTS_CONFIG = {
  enVoice: "sequential",
  koVoice: "sequential",
};

/**
 * 화면 표시
 * wordsPerPage — v2 고정 1 (유사 예문 3개 구조)
 */
const DISPLAY_CONFIG = {
  wordsPerPage: 1, // 고정 — 변경하지 않음
};

/**
 * 학습 패스 on/off
 * pass1 — true: 한글 숨김 → 영어 읽기 → 한글 노출·읽기
 * pass2 — true: 영어 숨김 → 한글 읽기 → 영어(+발음·예문) 노출·읽기
 * 둘 다 true면 1 → 2 순서로 진행
 */
const PASS_CONFIG = {
  pass1: true,
  pass2: false,
};

/* =====================================================================
   ✏️ 콘텐츠 — colourchange words[] + upgrades6 REVIEW_QUIZ 동일 JSON
   ---------------------------------------------------------------------
   페이지 공통: badge / title / source / sourceMark / outro
   단어 항목: en, ko, pos, reading, ipa, defs, example, highlight,
              translation, image, icon, spark, note
   퀴즈 quiz[]: { en, ko, answer, answerKo, image } — upgrades6과 동일
   ===================================================================== */
const WORDS = {
  badge: "시사 영단어",

  title: [
    { hl: "독일 스테이크하우스 상속녀의 납치 혐의 대형 간첩 사건으로 번지다" },
    { hl: "" },
  ],

  source: "출처 : BBC",
  sourceMark: "추출 어휘",
  outro: "오늘의 단어 {n}개 끝! ☺",

  /*
   * words 항목:
   * example — 기사 원문 예문
   * examplesMore — 쉬운 유사 예문 3개 [{ en, ko }]
   */
  words: [
    {
      en: "abduction",
      ko: "납치, 유괴",
      pos: "명",
      reading: "앱덕션",
      ipa: "/æbˈdʌkʃən/",
      defs: ["사람을 강제로 데려가는 행위", "납치나 유괴"],
      example: "the violent abduction of her children from Denmark.(덴마크에서 발생한 그녀의 자녀들에 대한 폭력적인 납치)",
      examplesMore: [
        { en: "Police are investigating the abduction.", ko: "경찰이 납치 사건을 수사하고 있다." },
        { en: "He was accused of abduction.", ko: "그는 납치 혐의를 받았다." },
        { en: "The abduction shocked the town.", ko: "그 납치 사건은 마을에 충격을 주었다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "abduction",
      translation: "유명 스테이크하우스 체인의 상속녀 크리스티나 블록은<br>전남편과의 격렬한 양육권 분쟁 끝에 이스라엘 보안업체에<br>덴마크에 있던 자녀들을 폭력적으로 납치하도록 지시한 혐의를 받고 있다.",
      image: "resources/abduction.png",
      icon: "🚨",
      spark: "red",
      note: {
        phrase: "the violent abduction<br>of her children",
        text: "그녀의 자녀들에 대한<br>폭력적인 납치",
      },
    },
   
    {
      en: "unlawfully",
      ko: "불법적으로",
      pos: "부",
      reading: "언로펄리",
      ipa: "/ʌnˈlɔːfəli/",
      defs: ["법을 위반하여", "법적으로 허용되지 않는 방식으로"],
      example: "The boy and the girl had been brought to Denmark unlawfully.(소년과 소녀는 불법적으로 덴마크로 끌려왔다.)",
      examplesMore: [
        { en: "They entered the building unlawfully.", ko: "그들은 건물에 불법적으로 들어갔다." },
        { en: "The money was obtained unlawfully.", ko: "그 돈은 불법적으로 취득되었다." },
        { en: "He was unlawfully detained.", ko: "그는 불법적으로 구금되었다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "unlawfully",
      translation: "그러나 2023년 2월 덴마크 법원은<br>두 자녀가 불법적으로 덴마크에 데려와졌지만,<br>다시 독일로 데려갈 수는 없다고 판결했다.",
      image: "resources/unlawfully.png",
      icon: "⚖️",
      spark: "red",
      note: {
        phrase: "brought to Denmark<br>unlawfully",
        text: "불법적으로<br>덴마크에 데려와진",
      },
    },
  
  
    {
      en: "grievous bodily harm",
      ko: "법률 중상해죄",
      pos: "형",
      reading: "그리버스 바디리 하름",
      ipa: "/ˈɡriːvəs/",
      defs: ["피해나 고통이 매우 심각한", "결과가 중대하거나 비통한"],
      example: "Christina Block, Andreas Costard and Jonathan G are charged with the abduction of minors, grievous bodily harm(중상해죄) and unlawful detention.",
      examplesMore: [
        { en: "He was charged with grievous bodily harm.", ko: "그는 중상해 혐의로 기소됐다." },
        { en: "The attack caused grievous bodily harm.", ko: "그 공격은 중상해를 초래했다." },
        { en: "They face charges of grievous bodily harm.", ko: "그들은 중상해 혐의에 직면했다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "grievous bodily harm",
      translation: "크리스티나 블록, 안드레아스 코스타르트, 조너선 G는<br>미성년자 납치, 중대한 신체 상해,<br>불법 감금 혐의로 기소됐다.",
      image: "resources/grievous.png",
      icon: "⚖️",
      spark: "red",
      note: {
        phrase: "grievous<br>bodily harm",
        text: "중대한<br>신체 상해",
      },
    },
    {
      en: "wrongdoing",
      ko: "부정행위",
      pos: "명",
      reading: "롱두잉",
      ipa: "/ˈrɒŋˌduːɪŋ/",
      defs: ["불법적이거나 부정한 행동", "도덕적으로 잘못된 행위"],
      example: "All of them deny wrongdoing, except for Jonathan G, who has admitted his involvement.",
      examplesMore: [
        { en: "The company denied any wrongdoing.", ko: "회사는 어떠한 부정행위도 없었다고 부인했다." },
        { en: "She reported the wrongdoing.", ko: "그녀는 그 부정행위를 신고했다." },
        { en: "There was no evidence of wrongdoing.", ko: "위법행위의 증거는 없었다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "wrongdoing",
      translation: "자신의 관여 사실을 인정한 조너선 G를 제외하고,<br>모든 피고인은 잘못을 부인하고 있다.",
      image: "resources/wrongdoing.png",
      icon: "🚫",
      spark: "yellow",
      note: {
        phrase: "deny<br>wrongdoing",
        text: "부정행위나 잘못을<br>부인하다",
      },
    },
    
       {
      en: "stumble across",
      ko: "우연히 발견하다",
      pos: "동사구",
      reading: "스텀블 어크로스",
      ipa: "/ˈstʌmbəl əˈkrɒs/",
      defs: ["찾으려 하지 않았던 것을 우연히 발견하다", "뜻밖에 마주치다"],
      example: "In the latest twist, investigators in the case stumbled across evidence that has led to Germany's former intelligence chief, August Hanning, being arrested this month for treason and espionage.(납치 사건을 수사하던 중 국가기밀 유출 증거가 발견, 전직 정보기관 수장이 간첩 혐의로 체포 됨)",
      examplesMore: [
        { en: "I stumbled across an old photo.", ko: "나는 오래된 사진을 우연히 발견했다." },
        { en: "She stumbled across a useful website.", ko: "그녀는 유용한 웹사이트를 우연히 발견했다." },
        { en: "They stumbled across new evidence.", ko: "그들은 새로운 증거를 우연히 발견했다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "stumbled across",
      translation: "사건이 최근 새로운 국면을 맞은 가운데, 수사관들이 우연히 발견한 증거로<br>독일 전직 정보기관 수장 아우구스트 하닝이<br>이번 달 반역 및 간첩행위 혐의로 체포됐다.",
      image: "resources/stumble-across.png",
      icon: "🔍",
      spark: "yellow",
      note: {
        phrase: "stumbled across<br>evidence",
        text: "증거를<br>우연히 발견했다",
      },
    },
    {
      en: "treasonous",
      ko: "반역적인",
      pos: "형",
      reading: "트리저너스",
      ipa: "/ˈtriːzənəs/",
      defs: ["국가를 배신하는 행위와 관련된", "반역죄에 해당하는"],
      example: "Now 80, Hanning is in custody charged with treasonous espionage.(현재 80세인 하닝은(전직 독일 정보기관 수장) 반역적 간첩행위 혐의로 기소돼 구금 중이다)",
      examplesMore: [
        { en: "He was accused of treasonous acts.", ko: "그는 반역 행위를 했다는 혐의를 받았다." },
        { en: "They investigated his treasonous activities.", ko: "그들은 그의 반역 활동을 수사했다." },
        { en: "The plot was considered treasonous.", ko: "그 음모는 반역적인 것으로 여겨졌다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "treasonous",
      translation: "현재 80세인 하닝은<br>반역적 간첩행위 혐의로 기소돼 구금 중이다.",
      image: "resources/treasonous.png",
      icon: "🕵️",
      spark: "red",
      note: {
        phrase: "treasonous<br>espionage",
        text: "반역적<br>간첩행위",
      },
    },
    {
      en: "unfounded",
      ko: "근거 없는",
      pos: "형",
      reading: "언파운디드",
      ipa: "/ʌnˈfaʊndɪd/",
      defs: ["주장이나 의혹을 뒷받침할 근거가 없는", "사실이나 증거에 기반하지 않은"],
      example: "His lawyer says he is being \"unjustly persecuted\" and that the charges are \"unfounded\".(그의 변호인은 하닝이 ‘부당하게 박해받고’ 있으며,<br>혐의는 ‘근거가 없다’고 주장한다)",
      examplesMore: [
        { en: "The rumours were unfounded.", ko: "그 소문들은 근거가 없었다." },
        { en: "Her fears proved unfounded.", ko: "그녀의 걱정은 근거 없는 것으로 드러났다." },
        { en: "He denied the unfounded allegations.", ko: "그는 근거 없는 의혹들을 부인했다." },
      ],
      cf: "",
      enRepeat: 2,
      highlight: "unfounded",
      translation: "그의 변호인은 하닝이 ‘부당하게 박해받고’ 있으며,<br>혐의는 ‘근거가 없다’고 주장한다.",
      image: "resources/unfounded.png",
      icon: "🔎",
      spark: "yellow",
      note: {
        phrase: "the charges<br>are unfounded",
        text: "제기된 혐의는<br>근거가 없다",
      },
    },
  ],

  quiz: [
    {
      en: "Police are investigating the abd_____.",
      ko: "경찰이 (납치) 사건을 수사하고 있다.",
      answer: "abduction",
      answerKo: "납치, 유괴",
      image: "abduction.png",
    },
   
  ],
};

const WORD_COLORS = ["#e06a4f", "#3e6fd8", "#3a9a6b", "#c23b3b", "#8b5cf6", "#0d9488"];

const ARROW_SVG =
  '<svg class="arrow" width="34" height="24" viewBox="0 0 34 24" aria-hidden="true">' +
  '<path d="M3 12 H 28 M20 4 L 29 12 L 20 20" fill="none" stroke="#2d4f9e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

/** 영어가 공백 기준 2단어 이상(합성어·구)인지 */
function isMultiWordEn(en) {
  return String(en || "").trim().split(/\s+/).filter(Boolean).length >= 2;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 예문 — highlight 단어 mark (문자열·배열·| 구분, 긴 구부터) */
function highlightSentence(sentence, target) {
  const raw = String(sentence || "").trim();
  if (!raw) return "";
  let out = escapeHtml(raw);
  const targets = (Array.isArray(target) ? target : String(target || "").split("|"))
    .map((t) => String(t || "").trim())
    .filter(Boolean)
    .sort((a, b) => b.length - a.length);
  if (!targets.length) return out;
  targets.forEach((t) => {
    const re = new RegExp(`\\b(${escapeRegExp(t)})\\b`, "gi");
    out = out.replace(re, "<mark>$1</mark>");
  });
  return out;
}

/** 예문 괄호 안 한글 — 영어보다 4px 작게 */
function wrapExampleKoParens(html) {
  return String(html || "").replace(
    /\(([^)]*[\uAC00-\uD7A3][^)]*)\)/g,
    '<span class="ex-ko">($1)</span>'
  );
}

function getWordList() {
  return Array.isArray(WORDS.words) ? WORDS.words : [];
}

function renderHoles() {
  const holes = document.getElementById("holes");
  for (let i = 0; i < 14; i++) holes.appendChild(document.createElement("span"));
}

function renderHead() {
  const badge = document.getElementById("badge");
  if (badge) badge.textContent = WORDS.badge || "시사 영단어";

  const source = document.getElementById("sourceLabel");
  if (source) source.textContent = WORDS.source || "";

  const mark = document.getElementById("sourceMark");
  if (mark) mark.textContent = WORDS.sourceMark || "";
}

function renderTitle() {
  const titleEl = document.getElementById("title");
  if (!titleEl) return;
  titleEl.textContent = "";

  (WORDS.title || []).forEach((line, i) => {
    if (i > 0) titleEl.appendChild(document.createElement("br"));
    if (line.hl) {
      titleEl.appendChild(el("span", "hl", line.hl));
    }
    if (line.after) {
      titleEl.appendChild(document.createTextNode(line.after));
    }
    if (line.text && !line.hl) {
      titleEl.appendChild(document.createTextNode(line.text));
    }
  });
}

function getWordsPerPage() {
  /* v2: 유사 예문 구조라 페이지당 단어 1개 고정 */
  return 1;
}

function showWordPage(wordEls, pageIndex) {
  const pageSize = getWordsPerPage();
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  wordEls.forEach((wordEl, i) => {
    wordEl.classList.toggle("is-page-hidden", i < start || i >= end);
  });
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

function showAllWords(wordEls) {
  wordEls.forEach((wordEl) => wordEl.classList.remove("is-page-hidden"));
}

function renderWords() {
  const list = document.getElementById("words");
  if (!list) return;
  list.textContent = "";

  const pageSize = getWordsPerPage();
  getWordList().forEach((w, i) => {
    const li = el("li", "word");
    /* 처음엔 1~n만 표시 */
    if (i >= pageSize) li.classList.add("is-page-hidden");

    const row = el("div", "word-row");
    const num = el("span", "num", String(i + 1));
    num.style.background = w.color || WORD_COLORS[i % WORD_COLORS.length];
    row.appendChild(num);

    const hlClass = w.hl || (i % 2 === 0 ? "hl" : "hlpink");
    /* 하이라이트는 낭독 시 칠해짐 — 처음엔 미도포 */
    row.appendChild(el("span", "en " + hlClass, w.en));
    if (isMultiWordEn(w.en)) {
      /* 2단어 이상 합성어 — 한글 뜻을 영어 아래에 */
      row.classList.add("is-compound");
      li.classList.add("is-compound");
      const meaningRow = el("div", "word-meaning-row");
      meaningRow.insertAdjacentHTML("beforeend", ARROW_SVG);
      meaningRow.appendChild(el("span", "meaning", w.ko));
      row.appendChild(meaningRow);
    } else {
      row.insertAdjacentHTML("beforeend", ARROW_SVG);
      row.appendChild(el("span", "meaning", w.ko));
    }
    li.appendChild(row);

    const pron = el("div", "pron");
    pron.appendChild(el("span", null, "[" + (w.reading || "") + "]"));
    pron.appendChild(el("span", "ipa", w.ipa || ""));
    if (w.pos) {
      pron.appendChild(el("span", "pos", "〈" + w.pos + "〉"));
    }
    li.appendChild(pron);

    /* 발음 바로 아래 — ex. + 기사 원문 example */
    if (w.example) {
      const exBlock = el("div", "example-block");
      const ex = el("p", "example");
      const label = el("span", "ex-label", "ex. ");
      const inner = el("span", "example-inner");
      inner.innerHTML = wrapExampleKoParens(
        highlightSentence(w.example, w.highlight || w.en)
      );
      ex.appendChild(label);
      ex.appendChild(inner);
      exBlock.appendChild(ex);
      li.appendChild(exBlock);
    }

    /* 쉬운 유사 예문 3개 */
    const moreList = Array.isArray(w.examplesMore) ? w.examplesMore.filter((x) => x && x.en) : [];
    if (moreList.length) {
      const moreBlock = el("div", "examples-more");
      moreBlock.appendChild(el("div", "examples-more-title", "추가 예문"));
      const total = Math.max(1, Math.round(EXAMPLES_MORE_READ_SEC));
      const meter = el("div", "examples-more-meter");
      const segsHtml = Array.from({ length: total }, () =>
        `<span class="examples-more-seg" aria-hidden="true"></span>`
      ).join("");
      meter.innerHTML =
        `<div class="examples-more-meter-head">` +
          `<span class="examples-more-sec" aria-live="polite">${total}초</span>` +
        `</div>` +
        `<div class="examples-more-segs">${segsHtml}</div>`;
      moreBlock.appendChild(meter);
      const ol = el("ol", "examples-more-list");
      moreList.slice(0, 3).forEach((item) => {
        const liMore = el("li", "examples-more-item");
        const enLine = el("div", "examples-more-en");
        enLine.innerHTML = highlightSentence(item.en, w.highlight || w.en || "");
        liMore.appendChild(enLine);
        if (item.ko) {
          liMore.appendChild(el("div", "examples-more-ko", item.ko));
        }
        ol.appendChild(liMore);
      });
      moreBlock.appendChild(ol);
      li.appendChild(moreBlock);
      /* 0초 완료 — 카드 아래 비스듬한 V만 */
      const done = el("div", "examples-more-done");
      done.hidden = true;
      done.innerHTML =
        `<svg class="examples-more-done-v" viewBox="0 0 22 32" aria-hidden="true">` +
        `<defs><linearGradient id="ex-more-done-grad" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse">` +
        `<stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/>` +
        `<stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs>` +
        `<path class="examples-more-done-v-left" pathLength="100" stroke="url(#ex-more-done-grad)" d="M3.4 20.3L7 28"/>` +
        `<path class="examples-more-done-v-right" pathLength="100" stroke="url(#ex-more-done-grad)" d="M7 28L21.2 1.4"/>` +
        `</svg>`;
      li.appendChild(done);
    }

    list.appendChild(li);
  });
}

/** 추가 예문 — 주황 칸 바(좌→우 1초씩) + N초 카운트 (TTS 없음) */
async function runExamplesMoreCountdown(wordEl) {
  const more = wordEl?.querySelector(".examples-more");
  const meter = more?.querySelector(".examples-more-meter");
  const secEl = meter?.querySelector(".examples-more-sec");
  const segs = meter ? Array.from(meter.querySelectorAll(".examples-more-seg")) : [];
  const done = wordEl?.querySelector(".examples-more-done");
  if (!more || !meter || !secEl || !segs.length) return;

  const total = segs.length;
  if (done) done.hidden = true;
  more.classList.remove("is-urgent", "is-done");
  more.classList.add("is-reading");
  segs.forEach((seg) => {
    seg.classList.remove("is-shrinking", "is-gone");
  });
  secEl.classList.remove("is-blink");
  secEl.textContent = `${total}초`;

  try {
    for (let sec = total; sec >= 1; sec -= 1) {
      secEl.textContent = `${sec}초`;
      if (sec <= 3) {
        more.classList.add("is-urgent");
        secEl.classList.add("is-blink");
      }
      const seg = segs[total - sec]; /* 왼쪽(0)부터 → 오른쪽으로 */
      if (seg) {
        seg.classList.remove("is-shrinking", "is-gone");
        void seg.offsetWidth;
        seg.classList.add("is-shrinking");
      }
      await sleep(1000);
      if (seg) {
        seg.classList.remove("is-shrinking");
        seg.classList.add("is-gone");
      }
    }
    secEl.textContent = "0초";
    secEl.classList.remove("is-blink");
    more.classList.remove("is-urgent");
    more.classList.add("is-done");
    if (done) {
      done.hidden = false;
      done.classList.remove("is-drawing");
      void done.offsetWidth;
      done.classList.add("is-drawing");
    }
    await sleep(700);
  } finally {
    more.classList.remove("is-reading", "is-urgent");
  }
}

/** 해당 단어를 아래에서 위로 스와이프하며 사라지게 */
function swipeWordOutUp(wordEl) {
  return new Promise((resolve) => {
    if (!wordEl || wordEl.classList.contains("is-gone")) {
      resolve();
      return;
    }
    const style = wordEl.dataset.swipeStyle || "swipe-rise";
    wordEl.classList.add("is-swiping-out", style);

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      wordEl.classList.remove("is-swiping-out", style);
      wordEl.classList.add("is-gone");
      wordEl.removeEventListener("animationend", done);
      resolve();
    };
    wordEl.addEventListener("animationend", done);
    setTimeout(done, 900);
  });
}

/** 마지막 — 동일 디자인으로 위에서 아래로 부드럽게 하나씩 재노출 */
function revealWordDown(wordEl) {
  return new Promise((resolve) => {
    if (!wordEl) {
      resolve();
      return;
    }
    wordEl.classList.remove("is-gone", "is-swiping-out");
    wordEl.classList.add("is-revealed", "is-finale-pending");
    void wordEl.offsetWidth;
    wordEl.classList.remove("is-finale-pending");
    wordEl.classList.add("is-revealing-down");

    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      wordEl.classList.remove("is-revealing-down");
      wordEl.classList.add("is-finale-in");
      wordEl.removeEventListener("animationend", done);
      resolve();
    };
    wordEl.addEventListener("animationend", done);
    setTimeout(done, 900);
  });
}

/** 상단(뱃지·제목·출처·추출 어휘)은 유지, 단어 목록만 숨김 */
function hideWordsOnly() {
  const words = document.getElementById("words");
  if (!words) return;
  words.classList.remove("is-fading-out");
  words.style.visibility = "hidden";
}

/** 마지막 단어 페이지 — summary처럼 서서히 흐려진 뒤 숨김 */
async function fadeOutWordsOnly() {
  const words = document.getElementById("words");
  if (!words || words.style.visibility === "hidden") return;
  words.classList.add("is-fading-out");
  await sleep(WORDS_FADE_OUT_MS);
  words.style.visibility = "hidden";
  words.classList.remove("is-fading-out");
}

/** quiz/summary 오버레이가 헤더 아래에서 시작하도록 top 동기화 */
function syncOverlayTop() {
  const stage = document.getElementById("stage");
  const content = document.querySelector(".content");
  const head = document.getElementById("content-head");
  if (!stage || !content || !head) return;
  const top = content.offsetTop + head.offsetTop + head.offsetHeight + 20;
  stage.style.setProperty("--overlay-top", `${Math.max(320, top)}px`);
}

function formatSummaryKo(ko) {
  return String(ko || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 비스듬한 V 체크 — colourchange와 동일 (짧은 획 → 긴 획) */
function summaryCheckSvg(index) {
  const gid = `summary-check-grad-${index}`;
  return (
    `<svg class="summary-check" viewBox="0 0 22 32" aria-hidden="true">` +
    `<defs><linearGradient id="${gid}" x1="2" y1="30" x2="20" y2="2" gradientUnits="userSpaceOnUse">` +
    `<stop offset="0%" stop-color="#ff4f6b"/><stop offset="52%" stop-color="#ff2f43"/>` +
    `<stop offset="100%" stop-color="#b70f1f"/></linearGradient></defs>` +
    `<path class="summary-check-left" pathLength="100" stroke="url(#${gid})" d="M3.4 20.3L7 28"/>` +
    `<path class="summary-check-right" pathLength="100" stroke="url(#${gid})" d="M7 28L21.2 1.4"/>` +
    `</svg>`
  );
}

const EN_KO_WRAP_CHAR_LIMIT = 20;
const SUMMARY_CHECK_DRAW_MS = 640;
const SUMMARY_CHECK_GAP_MS = 300; /* 리듬: 500→300 */

function syncSummaryKoWrap() {
  document.querySelectorAll("#summary-list .summary-titles").forEach((wrap) => {
    const en = wrap.querySelector(".en");
    const ko = wrap.querySelector(".ko");
    if (!en || !ko) {
      wrap.classList.remove("is-ko-wrapped");
      return;
    }
    const count =
      String(en.textContent || "").trim().length +
      String(ko.textContent || "").replace(/\s+/g, "").length;
    wrap.classList.toggle("is-ko-wrapped", count > EN_KO_WRAP_CHAR_LIMIT);
  });
}

function renderSummaryList(words) {
  const listEl = document.getElementById("summary-list");
  if (!listEl) return;
  const list = Array.isArray(words) ? words : [];
  listEl.innerHTML = list
    .map((word, index) => {
      const en = String(word?.en || "").trim();
      const ko = formatSummaryKo(word?.ko);
      const color = word?.color || WORD_COLORS[index % WORD_COLORS.length];
      return (
        `<div class="summary-row" data-summary-index="${index}">` +
        `<span class="num" style="background:${color}">${index + 1}</span>` +
        `<div class="summary-titles">` +
        `<span class="en">${en}</span>` +
        `<span class="ko">${ko}${summaryCheckSvg(index)}</span>` +
        `</div></div>`
      );
    })
    .join("");
  syncSummaryKoWrap();
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

async function paintSummaryChecks(words) {
  const rows = document.querySelectorAll("#summary-list .summary-row");
  if (!rows.length) return;
  const list = Array.isArray(words) ? words : [];

  /* 한글·V 미노출 → EN 낭독 → 한글 노출 → 비스듬한 V */
  rows.forEach((row) => {
    row.classList.remove(
      "is-checked",
      "is-drawing-check",
      "is-check-done",
      "is-active",
      "is-ko-revealed"
    );
  });

  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const en = stripHtml(list[i]?.en);

    row.classList.add("is-active");
    try {
      row.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } catch (_) {}

    /* 1) 영어 낭독 (한글은 아직 숨김) */
    if (en) await playEnTTS(en);

    /* 2) 한글 노출 */
    row.classList.add("is-ko-revealed");
    await sleep(280);

    /* 3) 비스듬한 V */
    row.classList.add("is-checked");
    row.classList.remove("is-check-done");
    void row.offsetWidth;
    row.classList.add("is-drawing-check");
    await sleep(SUMMARY_CHECK_DRAW_MS);
    row.classList.remove("is-drawing-check");
    row.classList.add("is-check-done");

    row.classList.remove("is-active");
    if (i < rows.length - 1) await sleep(SUMMARY_CHECK_GAP_MS);
  }
}

/** 요약 — 상단 헤더 고정, colourchange 스타일, 화면 유지 */
async function playSummaryScreen({ animateChecks = true } = {}) {
  const root = document.getElementById("summary-root");
  const review = document.getElementById("review-root");
  const words = getWordList();
  if (!root) return;

  hideWordsOnly();
  syncOverlayTop();
  if (review) review.hidden = true;
  renderSummaryList(words);
  root.classList.remove("is-fading-out");
  root.hidden = false;
  void root.offsetWidth;
  await sleep(300);
  if (animateChecks) {
    await paintSummaryChecks(words);
  } else {
    /* quiz 후 재표시 — 한글·V 이미 완료 상태 */
    document.querySelectorAll("#summary-list .summary-row").forEach((row) => {
      row.classList.add("is-ko-revealed", "is-checked", "is-check-done");
    });
  }
  /* 요약은 사라지지 않음 · 헤더(출처·추출 어휘)는 그대로 */
}

/** summary 서서히 흐려진 뒤 숨김 */
async function fadeOutSummary() {
  const root = document.getElementById("summary-root");
  if (!root || root.hidden) return;
  root.classList.add("is-fading-out");
  await sleep(SUMMARY_FADE_OUT_MS);
  root.hidden = true;
  root.classList.remove("is-fading-out");
}

function renderMeta() {
  const outro = document.getElementById("outro");
  if (!outro) return;
  const n = getWordList().length;
  outro.textContent = String(WORDS.outro || "").replace("{n}", String(n));
  outro.classList.remove("is-visible");
}

/** 마지막 — outro 가운데 노출 */
function showOutro() {
  const outro = document.getElementById("outro");
  if (!outro) return;
  const n = getWordList().length;
  outro.textContent = String(WORDS.outro || "").replace("{n}", String(n));
  outro.classList.remove("is-visible");
  void outro.offsetWidth;
  outro.classList.add("is-visible");
}

/** 오늘 날짜 — 매번 현재 시각 기준 자동 */
function today() {
  const d = new Date();
  const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}

function renderDate() {
  const el = document.getElementById("dateLabel");
  if (el) el.textContent = today() + " · Vocab Note";
}

function fitStage() {
  const stage = document.getElementById("stage");
  const scale = Math.min(window.innerWidth / 1080, window.innerHeight / 1920);
  stage.style.transform = "scale(" + scale + ")";
  requestAnimationFrame(() => fitVisibleMeaningFonts());
}

/** 한글 뜻 — 남은 가로 폭에 맞게 font-size 축소 */
const MEANING_FONT_MAX = 58;
const MEANING_FONT_MIN = 28;
function fitMeaningFontSize(meaningEl, maxPx, minPx) {
  if (!meaningEl) return;
  const max = Number(maxPx) || MEANING_FONT_MAX;
  const min = Number(minPx) || MEANING_FONT_MIN;
  meaningEl.style.fontSize = `${max}px`;

  const row = meaningEl.parentElement;
  if (!row) return;
  const rowW = row.clientWidth;
  if (rowW <= 0) return;

  let used = 0;
  const children = [...row.children];
  children.forEach((child) => {
    if (child === meaningEl) return;
    used += child.getBoundingClientRect().width;
  });
  const style = getComputedStyle(row);
  const gap = parseFloat(style.columnGap || style.gap) || 0;
  const gapTotal = Math.max(0, children.length - 1) * gap;
  const avail = Math.floor(rowW - used - gapTotal);
  if (avail <= 0) return;

  meaningEl.style.maxWidth = `${avail}px`;

  let size = max;
  while (size > min && meaningEl.scrollWidth > avail + 1) {
    size -= 1;
    meaningEl.style.fontSize = `${size}px`;
  }
}

function fitVisibleMeaningFonts() {
  /* 학습 단어 뜻만 폭에 맞춤 — 요약 en/ko 는 CSS 고정 크기 유지 */
  document.querySelectorAll(".word:not(.is-page-hidden) .meaning").forEach((el) => {
    fitMeaningFontSize(el, MEANING_FONT_MAX, MEANING_FONT_MIN);
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* =====================================================================
   TTS 엔진 — 백엔드 generate-audio · TTS_CONFIG 기반
   ===================================================================== */
const BACKEND_PORT = 3000;
const backendBaseUrl = (() => {
  if (typeof window === "undefined") return `http://localhost:${BACKEND_PORT}`;
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[1];
let activeKoTtsVoiceId = KO_TTS_VOICE_IDS[1];
/** autoplay 시작 시 처음 잡힌 EN 음성 — quiz에서 동일하게 사용 */
let firstEnTtsVoiceId = EN_TTS_VOICE_IDS[1];
let enVoiceCycleMode = true;
let koVoiceCycleMode = true;
let enVoiceShuffleMode = false;
let koVoiceShuffleMode = false;
let enVoiceQueue = [];
let koVoiceQueue = [];
let enVoiceCursor = 0;
let koVoiceCursor = 0;

const ttsAudioCache = new Map();
const TTS_MAX_RETRIES = 3;
const TTS_RETRY_BASE_MS = 800;

/* ---------- 리듬 타이밍 (빈 대기만 짧게, TTS는 그대로) ---------- */
const AUTOPLAY_START_WAIT_MS = 1900;
const EN_TO_KO_GAP_MS = 250;
const WORD_GAP_MS = 200;
const MEANING_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const EN_REVEAL_WAIT_MS = 0; /* 노출과 동시에 읽기 */
const PAGE_ENTER_FIRST_MS = 200;
const PAGE_ENTER_MS = 350;
/** 1–3 → 4–6 → 7–9 페이지 넘김 대기 */
const PAGE_DONE_MS = 1500;
const PASS_GAP_MS = 400;
const SECTION_GAP_MS = 320;
/** summary 끝난 뒤 quiz 시작 전 대기 */
const SUMMARY_TO_QUIZ_MS = 1500;
/** summary → quiz 페이드아웃 */
const SUMMARY_FADE_OUT_MS = 1100;
/** 마지막 단어 → summary 페이드아웃 (summary와 동일 리듬) */
const WORDS_FADE_OUT_MS = 1100;
/** 추가 예문 읽기 시간(초) — 주황 칸 바 + N초 */
const EXAMPLES_MORE_READ_SEC = 10;

function stripHtml(text) {
  return String(text || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function getKoSpeakText(rawKo) {
  const text = stripHtml(rawKo);
  if (!text) return "";
  const beforeSlash = text.split("/")[0].trim();
  const firstExpr = beforeSlash.split(",")[0].trim();
  return firstExpr
    .replace(/~(?=로)/g, "무엇으")
    .replace(/~/g, "무엇");
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

/** Fisher–Yates shuffle */
function shuffleList(list) {
  const arr = Array.isArray(list) ? list.slice() : [];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}

function isCyclingVoiceSetting(raw) {
  return (
    raw === "sequential" ||
    raw === "sequence" ||
    raw === "random" ||
    raw === "auto" ||
    raw == null ||
    raw === ""
  );
}

function isRandomVoiceSetting(raw) {
  return raw === "random" || raw === "auto";
}

function resolveVoiceIdFromSetting(raw, voiceMap, fallbackId) {
  if (typeof raw === "number" || /^\d+$/.test(String(raw).trim())) {
    const id = voiceMap[Number(raw)];
    if (id) return id;
  }
  const name = String(raw || "").trim();
  const known = Object.values(voiceMap);
  if (known.includes(name)) return name;
  if (/^(en|ko)-/i.test(name)) return name;
  return fallbackId;
}

/** 번호 키 오름차순(1,2,3…) 목록 */
function voiceIdsInNumberOrder(voiceMap) {
  return Object.keys(voiceMap)
    .map(Number)
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b)
    .map((n) => voiceMap[n])
    .filter(Boolean);
}

function refillEnVoiceQueue() {
  const ordered = voiceIdsInNumberOrder(EN_TTS_VOICE_IDS);
  enVoiceQueue = enVoiceShuffleMode ? shuffleList(ordered) : ordered;
  enVoiceCursor = 0;
  console.info("[63voca] EN voice queue", enVoiceShuffleMode ? "(shuffled)" : "(1→N)", enVoiceQueue);
}

function refillKoVoiceQueue() {
  const ordered = voiceIdsInNumberOrder(KO_TTS_VOICE_IDS);
  koVoiceQueue = koVoiceShuffleMode ? shuffleList(ordered) : ordered;
  koVoiceCursor = 0;
  console.info("[63voca] KO voice queue", koVoiceShuffleMode ? "(shuffled)" : "(1→N)", koVoiceQueue);
}

/** sequential/random: 큐에서 다음 음성 / 고정: 항상 같은 음성 */
function nextEnVoice() {
  if (!enVoiceCycleMode) return activeEnTtsVoiceId;
  if (!enVoiceQueue.length || enVoiceCursor >= enVoiceQueue.length) refillEnVoiceQueue();
  activeEnTtsVoiceId = enVoiceQueue[enVoiceCursor];
  enVoiceCursor += 1;
  console.info("[63voca] EN voice →", activeEnTtsVoiceId);
  return activeEnTtsVoiceId;
}

function nextKoVoice() {
  if (!koVoiceCycleMode) return activeKoTtsVoiceId;
  if (!koVoiceQueue.length || koVoiceCursor >= koVoiceQueue.length) refillKoVoiceQueue();
  activeKoTtsVoiceId = koVoiceQueue[koVoiceCursor];
  koVoiceCursor += 1;
  console.info("[63voca] KO voice →", activeKoTtsVoiceId);
  return activeKoTtsVoiceId;
}

function resolveConfiguredEnVoice() {
  const raw = TTS_CONFIG?.enVoice;
  enVoiceCycleMode = isCyclingVoiceSetting(raw);
  enVoiceShuffleMode = isRandomVoiceSetting(raw);
  if (enVoiceCycleMode) {
    refillEnVoiceQueue();
    activeEnTtsVoiceId = enVoiceQueue[0] || EN_TTS_VOICE_IDS[1];
    firstEnTtsVoiceId = activeEnTtsVoiceId;
    console.info("[63voca] EN voice mode=", enVoiceShuffleMode ? "random" : "sequential", "· first=", activeEnTtsVoiceId);
    return activeEnTtsVoiceId;
  }
  enVoiceCycleMode = false;
  activeEnTtsVoiceId = resolveVoiceIdFromSetting(raw, EN_TTS_VOICE_IDS, EN_TTS_VOICE_IDS[1]);
  firstEnTtsVoiceId = activeEnTtsVoiceId;
  console.info("[63voca] EN voice (fixed)", activeEnTtsVoiceId);
  return activeEnTtsVoiceId;
}

function resolveConfiguredKoVoice() {
  const raw = TTS_CONFIG?.koVoice;
  koVoiceCycleMode = isCyclingVoiceSetting(raw);
  koVoiceShuffleMode = isRandomVoiceSetting(raw);
  if (koVoiceCycleMode) {
    refillKoVoiceQueue();
    activeKoTtsVoiceId = koVoiceQueue[0] || KO_TTS_VOICE_IDS[1];
    console.info("[63voca] KO voice mode=", koVoiceShuffleMode ? "random" : "sequential", "· first=", activeKoTtsVoiceId);
    return activeKoTtsVoiceId;
  }
  koVoiceCycleMode = false;
  activeKoTtsVoiceId = resolveVoiceIdFromSetting(raw, KO_TTS_VOICE_IDS, KO_TTS_VOICE_IDS[1]);
  console.info("[63voca] KO voice (fixed)", activeKoTtsVoiceId);
  return activeKoTtsVoiceId;
}

function resolveEnTtsVoiceId(langKey) {
  const values = Object.values(EN_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  const isEn = langKey === "en" || langKey === "en-US" || (typeof langKey === "string" && /^en-/i.test(langKey));
  if (!isEn) return langKey;
  return activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
}

function resolveKoTtsVoiceId(langKey) {
  const values = Object.values(KO_TTS_VOICE_IDS);
  if (typeof langKey === "string" && values.includes(langKey)) return langKey;
  if (typeof langKey === "string" && /^ko-KR-/i.test(langKey)) return langKey;
  const isKo = langKey === "ko" || langKey === "ko-KR" || (typeof langKey === "string" && /^ko-/i.test(langKey));
  if (!isKo) return langKey;
  return activeKoTtsVoiceId || KO_TTS_VOICE_IDS[1];
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

async function playAudioElement(audio, playbackRate = 1) {
  try {
    if (window.__shortsCurrentAudio && typeof window.__shortsCurrentAudio.pause === "function") {
      window.__shortsCurrentAudio.pause();
    }
  } catch (_) {}

  window.__shortsCurrentAudio = audio;
  const rate = Number(playbackRate);
  audio.playbackRate = Number.isFinite(rate) && rate > 0 ? rate : 1;
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

async function playBackendTTS(text, languageKey, playbackRate = 1) {
  try {
    const audio = await loadBackendTTSAudio(text, languageKey);
    if (!audio) return;
    await playAudioElement(audio, playbackRate);
  } catch (err) {
    console.warn("[63voca] TTS play failed", err);
  }
}

async function playEnTTS(text) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = nextEnVoice() || activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  await playBackendTTS(enText, voice, 1);
}

/** quiz 전용 — autoplay 첫 EN 음성과 동일 (큐 소비 없음) */
async function playEnTTSQuiz(text) {
  const enText = String(text || "").trim();
  if (!enText) return;
  const voice = firstEnTtsVoiceId || activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1];
  console.info("[63voca] quiz EN voice (locked first)=", voice);
  await playBackendTTS(enText, voice, 1);
}

async function playKoTTS(rawKo) {
  const koText = getKoSpeakText(rawKo);
  if (!koText) return;
  const voice = nextKoVoice() || activeKoTtsVoiceId || resolveKoTtsVoiceId("ko-KR");
  await playBackendTTS(koText, voice, 1);
}

function preloadAutoplayAudio(words) {
  /* random이면 섞인 큐 순서대로 미리 받아 둠 (커서 소비 없음) */
  const enPool = enVoiceCycleMode && enVoiceQueue.length
    ? enVoiceQueue
    : [activeEnTtsVoiceId || EN_TTS_VOICE_IDS[1]];
  const koPool = koVoiceCycleMode && koVoiceQueue.length
    ? koVoiceQueue
    : [activeKoTtsVoiceId || KO_TTS_VOICE_IDS[1]];

  (words || []).forEach((word, i) => {
    const en = stripHtml(word?.en);
    const ko = getKoSpeakText(word?.ko);
    const enVoice = enPool[i % enPool.length];
    const koVoice = koPool[i % koPool.length];
    if (en) {
      loadBackendTTSAudio(en, enVoice).catch(() => {});
      /* 2회차에서도 같은 en 텍스트를 다시 읽으므로 다음 음성도 워밍 */
      if (enPool.length > 1) {
        loadBackendTTSAudio(en, enPool[(i + words.length) % enPool.length]).catch(() => {});
      }
    }
    if (ko) {
      loadBackendTTSAudio(ko, koVoice).catch(() => {});
      if (koPool.length > 1) {
        loadBackendTTSAudio(ko, koPool[(i + words.length) % koPool.length]).catch(() => {});
      }
    }
  });
}

/** 1회차용: 영어 낭독 + 하이라이트 칠하기 */
async function paintAndSpeakEn(wordEl, en) {
  const enEl = wordEl.querySelector(".en");
  wordEl.classList.add("is-speaking");
  if (enEl) {
    enEl.classList.remove("is-hl-on", "is-hl-painting");
    void enEl.offsetWidth;
    enEl.classList.add("is-hl-painting");
  }
  await playEnTTS(en);
  if (enEl) {
    enEl.classList.remove("is-hl-painting");
    enEl.classList.add("is-hl-on");
  }
  wordEl.classList.remove("is-speaking");
}

/** 한글 뜻 공개 애니메이션 */
function revealMeaning(wordEl) {
  const meaningEl = wordEl.querySelector(".meaning");
  wordEl.classList.add("is-revealed");
  if (!meaningEl) return;
  meaningEl.classList.remove("is-meaning-swipe");
  void meaningEl.offsetWidth;
  meaningEl.classList.add("is-meaning-swipe");
}

/** 2회차용: 숨겼던 영어 + 발음기호(ipa/pron) 함께 노출 */
function revealEnWithIpa(wordEl) {
  /* revealing 먼저 건 뒤 hidden 제거 — 한 프레임 영어 깜빡임 방지 */
  wordEl.classList.add("is-en-revealing");
  void wordEl.offsetWidth;
  wordEl.classList.remove("is-en-hidden", "is-pron-hidden");
  const enEl = wordEl.querySelector(".en");
  if (enEl && !enEl.classList.contains("is-hl-on")) {
    enEl.classList.add("is-hl-on");
  }
}

/** 2회차 시작 전 — 한글 보임, 영어·발음 숨김 (화살표 → 유지) */
function prepareSecondPass(wordEls) {
  const stage = document.getElementById("stage");
  stage?.classList.remove("hide-meaning");
  wordEls.forEach((wordEl) => {
    wordEl.classList.remove(
      "is-gone",
      "is-swiping-out",
      "is-finale-pending",
      "is-revealing-down",
      "is-finale-in",
      "is-en-revealing"
    );
    wordEl.classList.add("is-revealed", "is-en-hidden", "is-pron-hidden", "is-finale-in");
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-painting");
    /* 하이라이트는 유지하되, 숨김 상태에서 보이지 않음 */
  });
}

/** 페이지(최대 5개) 1회차: 한글 숨김 → 영어 → 한글 (자리 유지) */
async function runPass1OnPage(pageEls, pageItems) {
  const stage = document.getElementById("stage");
  stage?.classList.add("hide-meaning");
  pageEls.forEach((wordEl) => {
    wordEl.classList.remove("is-revealed", "is-en-hidden", "is-pron-hidden", "is-en-revealing");
    const enEl = wordEl.querySelector(".en");
    enEl?.classList.remove("is-hl-on", "is-hl-painting");
  });

  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    /* EN 낭독 시작과 동시에 추가 예문 바 카운트 시작 */
    const moreCountdown = wordEl.querySelector(".examples-more")
      ? runExamplesMoreCountdown(wordEl)
      : Promise.resolve();

    await paintAndSpeakEn(wordEl, en);
    await sleep(EN_TO_KO_GAP_MS);

    /* 한글 노출과 동시에 낭독 */
    revealMeaning(wordEl);
    if (MEANING_REVEAL_WAIT_MS > 0) await sleep(MEANING_REVEAL_WAIT_MS);
    await playKoTTS(ko);
    await moreCountdown; /* 남은 읽기 시간까지 대기 */
    await sleep(WORD_GAP_MS);
  }
}

/** 페이지(최대 5개) 2회차: 영어는 이미 숨긴 상태 → 한글 → 영어(+발음) */
async function runPass2OnPage(pageEls, pageItems) {
  /* EN 숨김은 페이지 표시 전에 prepareSecondPass(전체)로 처리됨 */
  for (let i = 0; i < pageEls.length; i += 1) {
    const wordEl = pageEls[i];
    const item = pageItems[i] || {};
    const en = item.en || wordEl.querySelector(".en")?.textContent || "";
    const ko = item.ko || wordEl.querySelector(".meaning")?.textContent || "";

    await playKoTTS(ko);
    await sleep(EN_TO_KO_GAP_MS);

    /* 영어·발음·예문 노출과 동시에 낭독 */
    revealEnWithIpa(wordEl);
    if (EN_REVEAL_WAIT_MS > 0) await sleep(EN_REVEAL_WAIT_MS);
    wordEl.classList.add("is-speaking");
    await playEnTTS(en);
    wordEl.classList.remove("is-speaking");
    await sleep(WORD_GAP_MS);
  }
}

async function runAutoplay() {
  const btn = document.getElementById("autoplay");
  if (btn) {
    btn.hidden = true;
    btn.remove();
  }

  const stage = document.getElementById("stage");
  stage.classList.add("hide-meaning");

  resolveConfiguredEnVoice();
  resolveConfiguredKoVoice();
  preloadAutoplayAudio(getWordList());

  await sleep(AUTOPLAY_START_WAIT_MS);

  const wordEls = Array.from(stage.querySelectorAll(".word"));
  const items = getWordList();
  const pageSize = getWordsPerPage();
  const pageCount = Math.max(1, Math.ceil(wordEls.length / pageSize));

  const doPass1 = PASS_CONFIG?.pass1 !== false;
  const doPass2 = PASS_CONFIG?.pass2 !== false;

  /* path1: 한글 숨김 → EN → KO */
  if (doPass1) {
    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      showWordPage(wordEls, page);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass1OnPage(pageEls, pageItems);
      await sleep(PAGE_DONE_MS);
    }
  }

  /* path2: 영어 숨김 → KO → EN(+발음·예문) */
  if (doPass2) {
    if (doPass1) await sleep(PASS_GAP_MS);

    /* 페이지를 띄우기 전에 전체 영어·발음 숨김 */
    prepareSecondPass(wordEls);
    await sleep(SECTION_GAP_MS);

    for (let page = 0; page < pageCount; page += 1) {
      const start = page * pageSize;
      const end = Math.min(start + pageSize, wordEls.length);
      const pageEls = wordEls.slice(start, end);
      const pageItems = items.slice(start, end);

      prepareSecondPass(pageEls);
      showWordPage(wordEls, page);
      await sleep(page === 0 ? PAGE_ENTER_FIRST_MS : PAGE_ENTER_MS);
      await runPass2OnPage(pageEls, pageItems);
      await sleep(PAGE_DONE_MS);
    }
  }

  /* 마지막 단어 부드럽게 페이드 → 요약 → quiz(종료 후 유지) */
  await fadeOutWordsOnly();
  syncOverlayTop();
  await sleep(SECTION_GAP_MS);

  await playSummaryScreen({ animateChecks: true });

  await sleep(SUMMARY_TO_QUIZ_MS);
  await fadeOutSummary();
  await startReviewQuiz();
  /* quiz 화면 유지 — 더 이상 넘어가지 않음 */
}

const QUIZ_COUNTDOWN_SEC = 3;
const QUIZ_ANSWER_HOLD_MS = 900;
/** 카운터 틱 소리 — false면 완전 무음 */
const COUNTDOWN_TICK_ENABLED = false;
const COUNTDOWN_TICK_SRC = "resources/mixkit-bell-tick-tock-timer-1046.wav";
const COUNTDOWN_TICK_VOLUME = 0.275;

let countdownTickAudio = null;

function getQuizList() {
  return Array.isArray(WORDS.quiz)
    ? WORDS.quiz.filter((q) => q && q.en && q.answer)
    : [];
}

function getReviewCountdownEls() {
  const wrap = document.getElementById("countdown-wrap");
  return {
    wrap,
    num: document.getElementById("countdown-num"),
    ring: document.getElementById("countdown-ring-progress"),
  };
}

function setCountdownRing(sec, total) {
  const { ring } = getReviewCountdownEls();
  if (!ring) return;
  const span = Math.max(1, total);
  const spent = ((span - Math.max(0, sec)) / span) * 100;
  ring.style.strokeDashoffset = String(Math.min(100, Math.max(0, spent)));
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
  if (!COUNTDOWN_TICK_ENABLED) {
    stopCountdownTickSound();
    return;
  }
  stopCountdownTickSound();
  const tickSrc = String(src || "").trim() || COUNTDOWN_TICK_SRC;
  try {
    countdownTickAudio = new Audio(tickSrc);
    countdownTickAudio.loop = true;
    countdownTickAudio.volume = COUNTDOWN_TICK_VOLUME;
    countdownTickAudio.preload = "auto";
    const playPromise = countdownTickAudio.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  } catch (_) {}
}

function hideCountdownUi() {
  const { wrap, num, ring } = getReviewCountdownEls();
  stopCountdownTickSound();
  if (num) {
    num.textContent = "";
    num.classList.remove("is-anim");
  }
  if (ring) {
    ring.style.transition = "none";
    ring.style.strokeDashoffset = "100";
  }
  /* wrap만 숨김 — 슬롯 높이는 유지해서 예문이 위로 안 올라옴 */
  if (wrap) {
    wrap.hidden = true;
    wrap.style.display = "none";
    wrap.setAttribute("hidden", "");
  }
}

function showCountdownUi() {
  const { wrap, ring } = getReviewCountdownEls();
  if (ring) ring.style.transition = "";
  if (wrap) {
    wrap.style.display = "";
    wrap.removeAttribute("hidden");
    wrap.hidden = false;
  }
}

async function runCountdown(seconds, onTick = null) {
  const { wrap, num } = getReviewCountdownEls();
  if (!wrap || !num) return;
  const total = Math.max(0, Math.round(Number(seconds) || 0));
  showCountdownUi();
  /* 카운트 틱 소리 없음 — 숫자·링만 */
  stopCountdownTickSound();
  setCountdownRing(total, total);

  try {
    /* 3 → 2 → 1 → 0 각 1초씩 전부 센 뒤 사라짐 */
    for (let sec = total; sec >= 0; sec -= 1) {
      num.textContent = String(sec);
      setCountdownRing(sec, total);
      bumpCountdownAnim();
      if (typeof onTick === "function") {
        try {
          onTick(sec, total);
        } catch (_) {}
      }
      await sleep(1000);
    }
  } finally {
    hideCountdownUi();
  }
}

function escapeQuizHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** 앞글자(pro) 고정 + 나머지 슬롯 폭 예약 → 문장 레이아웃 흔들림 방지 */
function buildQuizBlankHtml(answer, restRevealed, { revealRest = false } = {}) {
  const ans = String(answer || "").trim();
  if (!ans) return "";
  const prefixLen = Math.min(3, ans.length);
  const prefix = ans.slice(0, prefixLen);
  const rest = ans.slice(prefixLen);
  const n = revealRest
    ? rest.length
    : Math.max(0, Math.min(rest.length, Number(restRevealed) || 0));
  const shown = rest.slice(0, n);
  const hidden = rest.slice(n);
  const layerInner = revealRest
    ? `<span class="rv-blank-rest is-revealing">${escapeQuizHtml(rest)}</span>`
    : (shown ? `<span class="rv-blank-rest">${escapeQuizHtml(shown)}</span>` : "") +
      (hidden ? `<span class="rv-blank-marks">${"_".repeat(hidden.length)}</span>` : "");
  return (
    `<span class="rv-blank${revealRest ? " rv-blank-final" : ""}">` +
    `<span class="rv-blank-prefix">${escapeQuizHtml(prefix)}</span>` +
    `<span class="rv-blank-rest-slot">` +
    `<span class="rv-blank-rest-ghost" aria-hidden="true">${escapeQuizHtml(rest || "\u00a0")}</span>` +
    `<span class="rv-blank-rest-layer">${layerInner}</span>` +
    `</span>` +
    `</span>`
  );
}

/** escape 후 &lt;br&gt; 만 실제 줄바꿈 태그로 복원 (화면에 &lt;br&gt; 문자 노출 없음) */
function allowQuizBreakTags(escapedHtml) {
  return String(escapedHtml || "").replace(/&lt;br\s*\/?&gt;/gi, "<br>");
}

/** dou_ / ham_____ 등 — 밑줄(_)이 1개 이상 있으면 blank 토큰 */
const QUIZ_BLANK_TOKEN_RE = /[A-Za-z]{1,3}_{1,}/g;
const QUIZ_BLANK_ONLY_RE = /_{1,}/g;

function replaceQuizBlankToken(text, replacement) {
  const src = String(text || "");
  const replaced = src.replace(QUIZ_BLANK_TOKEN_RE, replacement);
  return replaced !== src ? replaced : src.replace(QUIZ_BLANK_ONLY_RE, replacement);
}

function formatQuizEnHtml(en, answer, restRevealed) {
  const blankHtml = buildQuizBlankHtml(answer, restRevealed);
  let html = allowQuizBreakTags(escapeQuizHtml(String(en || "")));
  if (!blankHtml) return html;
  return replaceQuizBlankToken(html, blankHtml);
}

function formatQuizKoHtml(ko) {
  return allowQuizBreakTags(escapeQuizHtml(String(ko || "").trim())).replace(
    /\(([^)]+)\)/g,
    '(<span class="rv-ko-hl">$1</span>)'
  );
}

function buildQuizSpeakText(en) {
  return replaceQuizBlankToken(
    String(en || "").replace(/<br\s*\/?>/gi, " "),
    "blank"
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** 빈칸에 정답을 넣은 전체 문장 (TTS용) */
function buildQuizFullSentenceSpeak(en, answer) {
  const ans = String(answer || "").trim();
  let text = String(en || "").replace(/<br\s*\/?>/gi, " ");
  if (ans) text = replaceQuizBlankToken(text, ans);
  return text.replace(/\s+/g, " ").trim();
}

/** 마지막 — 앞글자 유지, 남은 글자(____)만 자연스럽게 노출 */
function formatQuizEnFinalHtml(en, answer) {
  const answerHtml = buildQuizBlankHtml(answer, 0, { revealRest: true });
  let html = allowQuizBreakTags(escapeQuizHtml(String(en || "")));
  if (!answerHtml) return html;
  return replaceQuizBlankToken(html, answerHtml);
}

/** upgrades6 startReviewQuiz — 상단 헤더(출처·추출 어휘) 고정 */
async function startReviewQuiz() {
  const quizzes = getQuizList();
  if (!quizzes.length) return;

  const root = document.getElementById("review-root");
  const summary = document.getElementById("summary-root");
  const titleEl = document.getElementById("rv-title");
  const enEl = document.getElementById("rv-en");
  const koEl = document.getElementById("rv-ko");
  if (!root || !enEl || !koEl) return;

  hideWordsOnly();
  syncOverlayTop();
  if (summary && !summary.hidden) {
    summary.hidden = true;
    summary.classList.remove("is-fading-out");
  }
  root.hidden = false;

  for (let i = 0; i < quizzes.length; i += 1) {
    const q = quizzes[i];
    const ans = String(q.answer || "").trim();

    if (titleEl) titleEl.textContent = `Review ${i + 1}/${quizzes.length}`;
    if (koEl) koEl.innerHTML = formatQuizKoHtml(q.ko);
    /* 카운트 동안 빈칸 유지 */
    enEl.innerHTML = formatQuizEnHtml(q.en, ans, 0);

    const speakText = buildQuizSpeakText(q.en);
    if (speakText) await playEnTTSQuiz(speakText);
    await sleep(280); /* -20% from 350 */

    /* 3→2→1→0 전부 센 뒤 1초 대기 → 정답 노출 */
    await runCountdown(QUIZ_COUNTDOWN_SEC);
    await sleep(1000);

    enEl.innerHTML = formatQuizEnFinalHtml(q.en, ans);
    const fullSpeak = buildQuizFullSentenceSpeak(q.en, ans);
    if (fullSpeak) await playEnTTSQuiz(fullSpeak);
    await sleep(QUIZ_ANSWER_HOLD_MS);
  }

  hideCountdownUi();
  /* 마지막 정답 문장 노출 상태로 quiz 화면 유지 */
  root.hidden = false;
}

function setupAutoplay() {
  const btn = document.getElementById("autoplay");
  if (!btn) return;
  btn.addEventListener(
    "click",
    () => {
      runAutoplay().catch((err) => console.warn("autoplay error", err));
    },
    { once: true }
  );
}

renderHoles();
renderHead();
renderTitle();
renderWords();
renderMeta();
renderDate();
setupAutoplay();
fitStage();
syncOverlayTop();
requestAnimationFrame(() => fitVisibleMeaningFonts());
window.addEventListener("resize", () => {
  fitStage();
  syncOverlayTop();
});
