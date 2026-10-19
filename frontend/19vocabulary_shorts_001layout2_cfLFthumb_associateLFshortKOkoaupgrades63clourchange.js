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
   koVoice        : 한글 TTS 음성 선택 (autoplay 전체 세션에 고정)
                    숫자 1~8 또는 음성 ID 문자열, "random"이면 랜덤
                    1: ko-KR-Chirp3-HD-Zephyr           (여 · 부드러운)
                    2: ko-KR-Neural2-C                  (남 · Neural2)
                    3: ko-KR-Chirp3-HD-Achernar         (여 · 차분)
                    4: ko-KR-Chirp3-HD-Achird           (여 · 밝은)
                    5: ko-KR-Chirp3-HD-Vindemiatrix     (여 · 성숙)
                    6: ko-KR-Chirp3-HD-Zubenelgenubi    (남 · Chirp3)
                    7: ko-KR-Chirp3-HD-Charon           (남 · Chirp3)
                    8: ko-KR                            (기본)

   [단어 항목 설명]
   en          : 영단어 (autoplay 시 enRepeat회 낭독)
   ko          : 뜻 (줄바꿈은 <br>) — autoplay 시 영단어보다 먼저 1회 낭독
   pos         : 품사 (형 / 명 / 동 / 동/명 ...)
   reading     : 한글 발음
   ipa         : 발음기호
   defs        : 뜻풀이 목록 (배열)
   star        : true면 첫 뜻풀이 앞에 ★
   example     : 예문
   enRepeat    : 영단어·예문 낭독 횟수 (1|2|3, 기본 1). 읽을 때마다 테두리 색 변경
   texts       : translation 아래 노출 [{ text: "even", ko: "심지어" }, ...]
                 enRepeat만큼 예문 낭독 뒤, 한 항목씩 표시 (낭독 없음)
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

const HEADLINE_FONT_PX_DEFAULT = 34; /* upgrades62 제목과 동일 */

const cardData = {
  tag: "출처 : The Guardian",
  category: "시사 영단어",
  headline: "[예멘 전투 격화],<br>(생필품 부족)·시장 불안",
  headIcon: "📰",
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

  /*
   * 한글 음성 (koVoice) — 숫자 1~8 또는 "random"
   * 1: ko-KR-Chirp3-HD-Zephyr           (여 · 부드러운)
   * 2: ko-KR-Neural2-C                  (남 · Neural2)
   * 3: ko-KR-Chirp3-HD-Achernar         (여 · 차분)
   * 4: ko-KR-Chirp3-HD-Achird           (여 · 밝은)
   * 5: ko-KR-Chirp3-HD-Vindemiatrix     (여 · 성숙)
   * 6: ko-KR-Chirp3-HD-Zubenelgenubi    (남 · Chirp3)
   * 7: ko-KR-Chirp3-HD-Charon           (남 · Chirp3)
   * 8: ko-KR                            (기본)
   */
  koVoice: 3,

  

    words: [
      {
        en: "following",
        ko: "~의 이후에",
        pos: "전치사, 형용사, 명사",
        reading: "팔로잉",
        ipa: "/ˈfɑːloʊɪŋ/",
        defs: ["~후에, 그 다음의, 추종자(팬)들"],
        example: "Yemen’s prime minister, Shaya al-Zindani, and cabinet members were safe following the attack.",
        enRepeat: 2,
        highlight: "following",
        translation: "예멘의 샤야 알진다니 총리와 내각 구성원들은<br>공격 이후 무사했다.",
        image: "resources/following.png",
        icon: "🕒",
        spark: "yellow",
        note: {
          phrase: "following<br>the attack",
          text: "공격<br>이후에"
        }
      },
      {
        en: "complicate",
        ko: "복잡하게 만들다, 어렵게 하다",
        pos: "동",
        reading: "캄플리케이트",
        ipa: "/ˈkɑːmplɪkeɪt/",
        defs: ["상황이나 문제를 더 복잡하게 만들다", "일의 진행이나 해결을 어렵게 하다"],
        example: "The clashes have complicated efforts to end the wider Iran war.",
        enRepeat: 2,
        highlight: "complicated",
        translation: "이번 충돌은 더 광범위한 이란 전쟁을<br>끝내려는 노력을 어렵게 만들었다.",
        image: "resources/complicate.jpg",
        icon: "🧩",
        spark: "red",
        note: {
          phrase: "complicate efforts<br>to end the war",
          text: "전쟁을 끝내려는 <br> 노력을 어렵게 만들다"
        }
      },
      
      {
        en: "besieged",
        ko: "포위된",
        pos: "형(과거분사)",
        reading: "비시지드",
        ipa: "/bɪˈsiːdʒd/",
        defs: ["besiege 포위하다, besieged 포위된"],
        example: "One focus of alarm is the Houthi-besieged city of Taiz, Yemen’s third-largest city, where residents were running short of basic necessities.",
        enRepeat: 2,
        highlight: "besieged",
        translation: "주요 우려 지역 중 하나는 예멘 제3의 도시인 타이즈로, 후티 반군에 포위된 이곳의 주민들은 필수 생필품 부족을 겪고 있다.",
        image: "resources/besieged.png",
        icon: "🏙️",
        spark: "red",
        note: {
          phrase: "the Houthi-besieged<br>city of Taiz",
          text: "후티 반군에 포위된<br>타이즈시"
        }
      },
      
      {
        en: "disrupt",
        ko: "방해하다, 지장을 주다",
        pos: "동",
        reading: "디스럽트",
        ipa: "/dɪsˈrʌpt/",
        defs: ["정상적인 진행이나 작동을 방해하다", "운항이나 서비스에 차질을 일으키다"],
        example: "Thousands of flights across the kingdom have been disrupted.",
        enRepeat: 2,
        highlight: "disrupted",
        translation: "사우디아라비아 전역에서<br>수천 편의 항공편 운항에 차질이 발생했다.",
        image: "resources/disrupt.png",
        icon: "✈️",
        spark: "red",
        note: {
          phrase: "flights have<br>been disrupted",
          text: "항공편 운항에<br>차질이 발생했다"
        }
      },
      {
        en: "rattle",
        ko: "불안하게 만들다, 동요시키다",
        pos: "동",
        reading: "래틀",
        ipa: "/ˈrætəl/",
        defs: ["충격이나 불확실성으로 불안하게 만들다", "자신감이나 안정감을 흔들다"],
        example: "Repeated attacks on Saudi Arabia have rattled global markets.",
        enRepeat: 2,
        highlight: "rattled",
        translation: "사우디아라비아에 대한 반복적인 공격이 세계 금융시장을 불안하게 만들었다.",
        image: "resources/rattle.png",
        icon: "📉",
        spark: "red",
        note: {
          phrase: "rattle<br>global markets",
          text: "세계 시장을<br>동요시키다"
        }
      },
      {
        en: "devastating",
        ko: "파괴적인",
        pos: "형",
        reading: "데버스테이팅",
        ipa: "/ˈdevəsteɪtɪŋ/",
        defs: ["막대한 피해나 파괴를 초래하는", "극심한 고통과 충격을 주는"],
        example: "Inside Yemen, the fighting has revived a devastating civil war after four years of relative calm.",
        enRepeat: 2,
        highlight: "devastating",
        translation: "예멘 내부에서는 4년간의 상대적 평온 이후<br>이번 전투로 참혹한 내전이 재연됐다.",
        image: "resources/devastating.png",
        icon: "🏚️",
        spark: "red",
        note: {
          phrase: "a devastating<br>civil war",
          text: "막대한 피해를 초래하는 참혹한 내전"
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

/** 품사 — 콤마 앞 첫 단어만 아래쪽 파스텔 분홍 하이라이트 */
function renderPosHtml(pos) {
  const s = String(pos || "");
  const m = s.match(/^([^,，]+)([,，].*)?$/);
  if (!m) return `〈${s}〉`;
  const first = m[1];
  const rest = m[2] || "";
  return `〈<span class="pos-hl">${first}</span>${rest}〉`;
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
 * texts[] 매칭 구문은 하이라이트용 래퍼만 (ko는 translation 아래에 별도 표시)
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
        matched = { gi: pat.gi, covered };
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
        `</span>`;
      i = matched.covered[matched.covered.length - 1] + 1;
    } else {
      out += `<span class="ex-phrase">${highlightSentence(units[i], target)}</span>`;
      i += 1;
    }
  }

  return out;
}

/** texts[] — translation 아래 노출용 HTML */
function renderTextsBelow(word) {
  const glosses = getExampleTextGlosses(word);
  if (!glosses.length) return "";
  const items = glosses
    .map(
      (g, i) =>
        `<p class="texts-item is-revealed" data-text-index="${i}">` +
        (g.text ? `<span class="texts-en">${g.text}</span>` : "") +
        (g.ko ? `<span class="texts-ko">${g.ko}</span>` : "") +
        `</p>`
    )
    .join("");
  return `<div class="texts-below">${items}</div>`;
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

      <p class="meta"><span class="pos">${renderPosHtml(word.pos)}</span>&nbsp;<span class="meta-body">${word.reading} <span class="ipa">${word.ipa}</span></span></p>

      <div class="body">
        <div class="left">
          <ul class="defs">${defs}</ul>
          <p class="example"><span class="example-inner">${renderExampleHtml(word.example, word.highlight || word.en, getExampleTextGlosses(word))}</span></p>
          <p class="trans"><span class="trans-text">${word.translation}</span></p>
          ${renderTextsBelow(word)}
        </div>
      </div>
      <div class="pic">
        <div class="pic-media">
          <div class="photo">${visual}</div>
          <span class="ai-image-label">AI Image</span>
        </div>
        ${note}
        ${caption}
      </div>
    </article>`;
}

/** 한 화면에 보일 단어 수 */
const WORDS_PER_SCREEN = 1;

function escapeHeadlineHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `[강조]` → title-hl(노랑), `(강조)` → title-plain(미백). 괄호는 화면에서 제거 */
function formatHeadlineMarks(text) {
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
      out += escapeHeadlineHtml(raw.slice(i));
      break;
    }
    const close = raw.indexOf(closeCh, open + 1);
    if (close < 0) {
      out += escapeHeadlineHtml(raw.slice(i));
      break;
    }
    out += escapeHeadlineHtml(raw.slice(i, open));
    out += `<span class="${cls}">${escapeHeadlineHtml(raw.slice(open + 1, close))}</span>`;
    i = close + 1;
  }
  return out;
}

/** 제목 — `<br>` 2줄 + upgrades3 3색 마크 */
function formatHeadline(raw) {
  const text = String(raw || "").trim();
  if (!text) return "";
  return text
    .split(/<br\s*\/?>/i)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<span class="headline-line">${formatHeadlineMarks(line)}</span>`)
    .join("<br>");
}

/** 제목 font-size(px) — HEADLINE_FONT_PX_DEFAULT 기준, 긴 제목만 축소 */
function resolveHeadlineFontPx(data) {
  const raw = data?.headlineFontPx;
  if (raw !== "auto" && raw != null && String(raw).trim() !== "") {
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  const text = String(data?.headline || "")
    .replace(/<br\s*\/?>/gi, "")
    .replace(/[\[\]()]/g, "")
    .replace(/\s+/g, "")
    .trim();
  const len = Array.from(text).length;
  const base = HEADLINE_FONT_PX_DEFAULT;
  if (len >= 36) return Math.max(26, base - 12);
  if (len >= 30) return Math.max(28, base - 10);
  if (len >= 24) return Math.max(30, base - 8);
  return base;
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
    `<path class="summary-check-right" pathLength="100" stroke="url(#${gid})" d="M7 28L21.2 1.4"/>` +
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
          <span class="en">${en}</span>
          <span class="ko">${ko}${summaryCheckSvg(index)}</span>
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
  syncKoWrapGaps();
  fitAllExampleFonts();
  /* 새로고침·스크롤 복원으로 마지막(8번) 화면이 위에 뜨지 않게 무조건 1번부터 */
  const screensEl = document.getElementById("screens");
  if (screensEl) {
    screensEl.scrollTop = 0;
    requestAnimationFrame(() => {
      screensEl.scrollTop = 0;
      syncKoWrapGaps();
      fitAllExampleFonts();
    });
  }
}

/** EN+KO 글자 수 20 초과일 때만 다음 줄 — 기본은 `영어 한글` 한 줄 */
const EN_KO_WRAP_CHAR_LIMIT = 20;

function enKoCharCount(enEl, koEl) {
  const en = String(enEl?.textContent || "").trim();
  const ko = String(koEl?.textContent || "").trim();
  return en.length + ko.length;
}

function syncKoWrapGaps() {
  const syncWrap = (wrap) => {
    const en = wrap.querySelector(".en");
    const ko = wrap.querySelector(".ko");
    if (!en || !ko) {
      wrap.classList.remove("is-ko-wrapped");
      return;
    }
    const wrapped = enKoCharCount(en, ko) > EN_KO_WRAP_CHAR_LIMIT;
    wrap.classList.toggle("is-ko-wrapped", wrapped);
  };
  document.querySelectorAll(".word-titles").forEach(syncWrap);
  document.querySelectorAll(".summary-titles").forEach(syncWrap);
}

/** 예문 상자 — 고정 높이 없이 글자 줄 수에 맞게 자동 */
function fitExampleFontSize(el) {
  if (!el) return;
  const cs0 = getComputedStyle(el);
  const maxPx = parseFloat(cs0.getPropertyValue("--ex-size")) || 24;
  el.style.fontSize = `${maxPx}px`;
  el.style.height = "auto";
  el.style.minHeight = "";
  el.style.maxHeight = "";
  el.style.overflow = "visible";
}

function fitAllExampleFonts() {
  document.querySelectorAll(".example").forEach(fitExampleFontSize);
}

let koWrapResizeTimer = 0;
window.addEventListener("resize", () => {
  window.clearTimeout(koWrapResizeTimer);
  koWrapResizeTimer = window.setTimeout(() => {
    syncKoWrapGaps();
    fitAllExampleFonts();
  }, 80);
});

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
  screensEl.classList.add("is-paging");
  screensEl.scrollTo({ top: Math.max(0, summary.offsetTop), behavior: "smooth" });
  await waitAfterPageChange();
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
   BGM: With You - Everet Almond (upgrades3와 동일)
   BGM_ENABLED: false=끔 / true=켬 (화면 BGM 버튼으로도 토글, 기본 on)
   BGM_START_SEC: 시작 초 — 수동 설정 (구 BGM_AUTO_BASE_SEC). 화면 start로도 변경 가능
   ===================================================================== */

const BGM_ENABLED = true; // ← 기본 on
const BGM_START_SEC = 20; // ← 수동 시작 초 (예: 20 = 0:20부터 재생)
const BGM_SRC = "resources/With You - Everet Almond.mp3";
const BGM_VOLUME = 0.02;
/** 런타임 BGM on/off — 기본값은 BGM_ENABLED */
let bgmEnabled = BGM_ENABLED;
/** 런타임 시작 초 — 기본값은 BGM_START_SEC */
let bgmStartSec = Math.max(0, Math.round(Number(BGM_START_SEC) || 0));
let bgmAudio = null;

const AUTOPLAY_START_WAIT_MS = 3000;
const EN_TTS_GAP_MS = 280;
const WORD_TO_EXAMPLE_GAP_MS = 420;
const BETWEEN_WORDS_GAP_MS = 520;
const EXAMPLE_REPEAT_GAP_MS = 380;
/** 예문(문장) 낭독 종료 후 다음 단어로 넘어가기 전 대기 */
const AFTER_SENTENCE_WAIT_MS = 3500;
/** 화면(1단어 단위) 전환 스크롤 시간 + 전환 후 낭독 전 대기 */
const PAGE_SCROLL_MS = 650;
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

/* 실제 사용 음성은 cardData.enVoice / koVoice 가 결정 (아래 줄은 초기값일 뿐, autoplay 시 덮어씀) */
let activeEnTtsVoiceId = EN_TTS_VOICE_IDS[Number(cardData.enVoice)] || EN_TTS_VOICE_IDS[1];

/** 한글 TTS 음성 목록 — cardData.koVoice 로 선택 */
const KO_TTS_VOICE_IDS = {
  1: "ko-KR-Chirp3-HD-Zephyr", // 여 · 부드러운
  2: "ko-KR-Neural2-C", // 남 · Neural2
  3: "ko-KR-Chirp3-HD-Achernar", // 여 · 차분
  4: "ko-KR-Chirp3-HD-Achird", // 여 · 밝은
  5: "ko-KR-Chirp3-HD-Vindemiatrix", // 여 · 성숙
  6: "ko-KR-Chirp3-HD-Zubenelgenubi", // 남 · Chirp3
  7: "ko-KR-Chirp3-HD-Charon", // 남 · Chirp3
  8: "ko-KR" // 기본
};
let activeKoTtsVoiceId = KO_TTS_VOICE_IDS[Number(cardData.koVoice)] || KO_TTS_VOICE_IDS[1];
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
  console.info("[upgrades63clourchange] EN voice (random)", activeEnTtsVoiceId);
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
      console.info("[upgrades63clourchange] EN voice (json)", Number(raw), id);
      return id;
    }
  }
  const name = String(raw).trim();
  const known = Object.values(EN_TTS_VOICE_IDS);
  if (known.includes(name) || /^en-/i.test(name)) {
    activeEnTtsVoiceId = name;
    console.info("[upgrades63clourchange] EN voice (json)", name);
    return name;
  }
  console.warn("[upgrades63clourchange] unknown enVoice, fallback random:", raw);
  return pickRandomEnTtsVoice();
}

function pickRandomKoTtsVoice() {
  const voices = Object.values(KO_TTS_VOICE_IDS);
  activeKoTtsVoiceId = pickRandomVoiceFromPool(voices, activeKoTtsVoiceId);
  console.info("[upgrades63clourchange] KO voice (random)", activeKoTtsVoiceId);
  return activeKoTtsVoiceId;
}

/** cardData.koVoice — 1~8 / 음성ID / "random" */
function resolveConfiguredKoVoice() {
  const raw = cardData?.koVoice;
  if (raw === "random" || raw === "auto" || raw == null || raw === "") {
    return pickRandomKoTtsVoice();
  }
  if (typeof raw === "number" || /^\d+$/.test(String(raw).trim())) {
    const id = KO_TTS_VOICE_IDS[Number(raw)];
    if (id) {
      activeKoTtsVoiceId = id;
      console.info("[upgrades63clourchange] KO voice (json)", Number(raw), id);
      return id;
    }
  }
  const name = String(raw).trim();
  const known = Object.values(KO_TTS_VOICE_IDS);
  if (known.includes(name) || /^ko-/i.test(name)) {
    activeKoTtsVoiceId = name;
    console.info("[upgrades63clourchange] KO voice (json)", name);
    return name;
  }
  console.warn("[upgrades63clourchange] unknown koVoice, fallback random:", raw);
  return pickRandomKoTtsVoice();
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
  if (typeof langKey === "string" && /^ko-KR-Chirp3-HD-/i.test(langKey)) return langKey;
  if (typeof langKey === "string" && /^ko-KR-Neural2-/i.test(langKey)) return langKey;
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

/** 영문 알파벳 이름 발화 길이 (K→kay=3, F→eff=3 …) — ALL-CAPS 약어 TTS용 */
const LETTER_NAME_WEIGHT = {
  A: 3, B: 3, C: 3, D: 3, E: 2, F: 3, G: 3, H: 5, I: 2, J: 3, K: 3, L: 2, M: 2,
  N: 2, O: 2, P: 3, Q: 3, R: 2, S: 3, T: 3, U: 3, V: 3, W: 7, X: 3, Y: 3, Z: 3
};

/**
 * TTS 하이라이트용 발화 길이 추정.
 * KFC 같은 ALL-CAPS 약어는 글자 수(3)가 아니라 "kay eff see"처럼 알파벳 이름으로 읽히므로
 * 글자별 발화 가중치를 합산한다.
 */
function estimateSpokenHighlightWeight(text) {
  const raw = String(text || "").trim();
  if (!raw) return 1;
  const core = raw.replace(/[^A-Za-z0-9']/g, "");
  if (!core) return 1;
  /* ALL-CAPS 2글자 이상 (KFC, USA …) — 보통 한 글자씩 읽음 */
  if (/^[A-Z]{2,}$/.test(core)) {
    return Math.max(
      1,
      [...core].reduce((sum, ch) => sum + (LETTER_NAME_WEIGHT[ch] || 3), 0)
    );
  }
  return Math.max(1, core.length);
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
  const voice = activeKoTtsVoiceId || resolveKoTtsVoiceId("ko-KR");
  await playBackendTTS(koText, voice, 1);
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
  const enVoice = activeEnTtsVoiceId || resolveEnTtsVoiceId("en-US");
  const koVoice = activeKoTtsVoiceId || resolveKoTtsVoiceId("ko-KR");
  (words || []).forEach((word) => {
    const en = stripHtml(word?.en);
    const example = stripHtml(word?.example);
    const ko = getKoSpeakText(word?.ko);
    if (en) loadBackendTTSAudio(en, enVoice).catch(() => {});
    if (example) loadBackendTTSAudio(example, enVoice).catch(() => {});
    if (ko) loadBackendTTSAudio(ko, koVoice).catch(() => {});
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

function ensureBgmAudio() {
  if (bgmAudio) return bgmAudio;
  bgmAudio = new Audio(encodeURI(BGM_SRC));
  bgmAudio.loop = false;
  bgmAudio.preload = "auto";
  bgmAudio.volume = BGM_VOLUME;
  return bgmAudio;
}

function getBgmStartSec() {
  return Math.max(0, Math.round(Number(bgmStartSec) || 0));
}

function clampBgmStartSec(sec, duration) {
  let startSec = Math.max(0, Math.round(Number(sec) || 0));
  if (Number.isFinite(duration) && duration > 1) {
    startSec = Math.max(0, Math.min(startSec, duration - 1));
  }
  return startSec;
}

function formatBgmStartLabel(sec) {
  const total = Math.max(0, Math.round(Number(sec) || 0));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function syncBgmStartInput() {
  const input = document.getElementById("bgm-start-sec");
  const label = document.getElementById("bgm-start-label");
  const value = getBgmStartSec();
  if (input && document.activeElement !== input) {
    input.value = String(value);
  }
  if (label) label.textContent = formatBgmStartLabel(value);
}

function setBgmStartSecFromInput(rawValue, { restartIfPlaying = true } = {}) {
  const parsed = Number(rawValue);
  if (!Number.isFinite(parsed) || parsed < 0) {
    syncBgmStartInput();
    return;
  }
  bgmStartSec = Math.max(0, Math.round(parsed));
  syncBgmStartInput();
  if (!bgmAudio) return;
  try {
    const startSec = clampBgmStartSec(bgmStartSec, Number(bgmAudio.duration));
    const wasPlaying = !bgmAudio.paused && !bgmAudio.ended;
    bgmAudio.currentTime = startSec;
    if (restartIfPlaying && wasPlaying && bgmEnabled) {
      void bgmAudio.play().catch(() => {});
    }
  } catch (_) {}
}

function hideBgmControls() {
  const bgmBtn = document.getElementById("bgm-btn");
  const startWrap = document.getElementById("bgm-start-wrap");
  if (bgmBtn) bgmBtn.hidden = true;
  if (startWrap) {
    startWrap.hidden = true;
    startWrap.style.display = "none";
  }
}

/** 녹화용 — auto play / BGM / start / 배경 조절 전부 숨김 */
function hidePlaybackControls() {
  const controls = document.querySelector(".controls");
  if (controls) {
    controls.hidden = true;
    controls.style.display = "none";
  }
  if (autoplayBtn) autoplayBtn.hidden = true;
  hideAutoplayButton();
  hideBgmControls();
  const adjust = document.getElementById("paper-bg-adjust");
  if (adjust) adjust.hidden = true;
  window.Mark3readPageBg?.hidePageBgPicker?.();
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
    audio.currentTime = clampBgmStartSec(getBgmStartSec(), Number(audio.duration));
    await audio.play();
  } catch (_) {
    // 브라우저 자동재생 정책 등으로 실패해도 TTS는 진행
  }
}

function stopBgm() {
  if (!bgmAudio) return;
  try {
    bgmAudio.pause();
    bgmAudio.currentTime = clampBgmStartSec(getBgmStartSec(), Number(bgmAudio.duration));
  } catch (_) {}
}

function syncBgmButton() {
  const btn = document.getElementById("bgm-btn");
  if (!btn) return;
  btn.classList.toggle("is-on", bgmEnabled);
  btn.classList.toggle("is-off", !bgmEnabled);
  btn.setAttribute("aria-pressed", bgmEnabled ? "true" : "false");
  btn.title = bgmEnabled
    ? "With You - Everet Almond on (클릭=끔)"
    : "With You - Everet Almond off (클릭=켬)";
  btn.textContent = bgmEnabled ? "BGM on" : "BGM off";
  syncBgmStartInput();
}

async function toggleBgm() {
  bgmEnabled = !bgmEnabled;
  syncBgmButton();
  if (bgmEnabled) {
    await startBgm();
  } else {
    stopBgm();
  }
}

function getWordPageIndex(wordIndex) {
  return Math.floor(Number(wordIndex) / WORDS_PER_SCREEN);
}

/** 낭독 대상 표시 + 필요 시 화면 부드럽게 이동 */
function setSpeakingWord(index) {
  document.querySelectorAll(".word.is-speaking").forEach((el) => el.classList.remove("is-speaking"));
  const wordEls = document.querySelectorAll(".word");
  const el = wordEls[index];
  if (!el) return { pageChanged: false, scrolled: false };

  el.classList.add("is-speaking");
  const screen = el.closest(".screen");
  const screensEl = document.getElementById("screens");
  if (!screen || !screensEl) return { pageChanged: false, scrolled: false };

  /* gap 있으면 이전 화면 하단 이미지가 비침 */
  const targetTop = Math.max(0, screen.offsetTop);
  const needScroll = Math.abs(screensEl.scrollTop - targetTop) > 12;
  if (needScroll) {
    screensEl.classList.add("is-paging");
    screensEl.scrollTo({ top: targetTop, behavior: "smooth" });
  }
  return { pageChanged: needScroll, scrolled: needScroll };
}

async function waitAfterPageChange() {
  await sleep(PAGE_SCROLL_MS);
  document.getElementById("screens")?.classList.remove("is-paging");
  await sleep(PAGE_CHANGE_WAIT_MS);
}

/** enRepeat: 1|2|3 — 예문 낭독 횟수 */
function getExampleRepeatCount(word) {
  const n = Number(word?.enRepeat);
  if (!Number.isFinite(n)) return EXAMPLE_REPEAT_DEFAULT;
  return Math.max(1, Math.min(3, Math.round(n)));
}

function getWordEnEl(wordIndex) {
  return document.querySelectorAll(".word")[wordIndex]?.querySelector(".word-head .en") || null;
}

function setEnPass(wordIndex, pass) {
  const enEl = getWordEnEl(wordIndex);
  if (!enEl) return;
  enEl.classList.add("is-en-highlight");
  enEl.setAttribute("data-en-pass", String(pass));
}

function clearEnPass(wordIndex) {
  const enEl = getWordEnEl(wordIndex);
  if (!enEl) return;
  enEl.classList.remove("is-en-highlight");
  enEl.removeAttribute("data-en-pass");
}

/** en 단어 낭독 — enRepeat회, 회차마다 테두리 3색, 종료 후 테두리 제거 */
async function playEnWordWithHighlight(wordIndex, text, times = EN_WORD_REPEAT_DEFAULT) {
  const enText = stripHtml(text);
  if (!enText) return;
  const n = Math.max(1, Math.min(3, Math.round(Number(times)) || EN_WORD_REPEAT_DEFAULT));
  for (let pass = 1; pass <= n; pass += 1) {
    if (!isAutoplayRunning) break;
    setEnPass(wordIndex, pass);
    await playEnTTS(enText, [1]);
    if (pass < n && isAutoplayRunning) await sleep(EN_TTS_GAP_MS);
  }
  clearEnPass(wordIndex);
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
  /* is-revealed 는 유지 — 한 번 보인 texts는 계속 표시 */
  wordEl?.querySelectorAll(".ex-gloss.is-active").forEach((el) => el.classList.remove("is-active"));
  wordEl?.querySelectorAll(".texts-item.is-active").forEach((el) => el.classList.remove("is-active"));
}

function setExampleTextActive(wordIndex, textIndex) {
  const wordEl = document.querySelectorAll(".word")[wordIndex];
  if (!wordEl) return;
  wordEl.querySelectorAll(".ex-gloss").forEach((el) => {
    el.classList.toggle("is-active", Number(el.dataset.textIndex) === textIndex);
  });
  wordEl.querySelectorAll(".texts-item").forEach((el) => {
    el.classList.toggle("is-active", Number(el.dataset.textIndex) === textIndex);
  });
}

/**
 * 예문 enRepeat 낭독 후: texts[] 자막 강조만 (처음부터 노출되어 있음)
 */
async function playExampleTextGlosses(wordIndex, word) {
  const glosses = getExampleTextGlosses(word);
  if (!glosses.length) return;

  for (let i = 0; i < glosses.length; i += 1) {
    if (!isAutoplayRunning) break;
    setExampleTextActive(wordIndex, i);
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

  const enVoice = resolveConfiguredEnVoice();
  const koVoice = resolveConfiguredKoVoice();
  preloadAutoplayAudio(words);
  if (autoplayBtn) autoplayBtn.title = `en: ${enVoice} · ko: ${koVoice}`;

  /* 버튼 숨김 → BGM on이면 재생 → 3초 뒤 낭독 */
  hidePlaybackControls();
  if (bgmEnabled) {
    await startBgm();
  } else {
    stopBgm();
  }
  await sleep(AUTOPLAY_START_WAIT_MS);

  let lastPage = -1;
  try {
    for (let i = 0; i < words.length; i += 1) {
      if (!isAutoplayRunning) break;
      const word = words[i];
      const page = getWordPageIndex(i);
      const pageChanged = page !== lastPage;

      const { scrolled } = setSpeakingWord(i);

      /* 화면이 바뀔 때: 부드럽게 이동 후 대기하고 낭독 */
      if (pageChanged && lastPage >= 0 && scrolled) {
        await waitAfterPageChange();
      } else if (pageChanged && lastPage >= 0) {
        await sleep(PAGE_CHANGE_WAIT_MS);
      }
      lastPage = page;
      if (!isAutoplayRunning) break;

      const en = stripHtml(word.en);
      const example = stripHtml(word.example);
      const enTimes = getExampleRepeatCount(word);

      /* ko 1회 → en enRepeat회 → 예문 */
      setKoVisible(i, true);
      if (word.ko) await playKoTTS(word.ko);
      if (!isAutoplayRunning) break;
      if (word.ko && en) await sleep(WORD_TO_EXAMPLE_GAP_MS);

      if (en) await playEnWordWithHighlight(i, en, enTimes);
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
    document.querySelectorAll(".texts-item.is-active").forEach((el) => {
      el.classList.remove("is-active");
    });
    document.querySelectorAll(".en.is-en-highlight").forEach((el) => {
      el.classList.remove("is-en-highlight");
      el.removeAttribute("data-en-pass");
    });
    document.querySelectorAll(".example.is-reading-example").forEach((el) => {
      el.classList.remove("is-reading-example");
      el.removeAttribute("data-example-pass");
    });
    document.getElementById("screens")?.classList.remove("is-paging");
    isAutoplayRunning = false;
    /* 종료 후에도 autoplay·BGM 버튼은 숨김 유지 (BGM은 계속 재생) */
    hidePlaybackControls();
  }
}

/* =====================================================================
   배경색 — upgrades2 mark3read_page_bg_picker + 연하게/진하게
   ===================================================================== */
const PAGE_BG_COLOR_DEFAULT = "#2F3543"; /* 현재 --paper 기본 */
const PAGE_BG_ADJUST_STEP = 0.1; /* 연하게·진하게 한 번에 10% */

function normalizeHexColor(raw) {
  const s = String(raw || "").trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
  return `#${s.toLowerCase()}`;
}

function resolvePageBgColor() {
  if (window.Mark3readPageBg && typeof window.Mark3readPageBg.getPageBgColor === "function") {
    return window.Mark3readPageBg.getPageBgColor();
  }
  return PAGE_BG_COLOR_DEFAULT;
}

function hexToRgb(hex) {
  const n = normalizeHexColor(hex);
  if (!n) return null;
  return {
    r: parseInt(n.slice(1, 3), 16),
    g: parseInt(n.slice(3, 5), 16),
    b: parseInt(n.slice(5, 7), 16)
  };
}

function rgbToHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** amount 0~1 — towardHex(#fff 연하게 / #000 진하게) 쪽으로 섞기 */
function mixHexToward(hex, towardHex, amount) {
  const a = hexToRgb(hex);
  const b = hexToRgb(towardHex);
  if (!a || !b) return normalizeHexColor(hex) || PAGE_BG_COLOR_DEFAULT;
  const t = Math.max(0, Math.min(1, Number(amount) || 0));
  return rgbToHex(
    a.r + (b.r - a.r) * t,
    a.g + (b.g - a.g) * t,
    a.b + (b.b - a.b) * t
  );
}

function syncPaperBgHexLabel() {
  const el = document.getElementById("paper-bg-hex");
  if (el) el.textContent = resolvePageBgColor().toUpperCase();
}

function applyPageBackground() {
  const pageBgColor = resolvePageBgColor();
  document.documentElement.style.setProperty("--paper", pageBgColor);
  document.documentElement.style.setProperty("background-color", pageBgColor);
  if (document.body) {
    document.body.style.setProperty("background-color", pageBgColor);
  }
  syncPaperBgHexLabel();
}

function setPageBgDirect(hex) {
  if (window.Mark3readPageBg?.setPageBgColor) {
    window.Mark3readPageBg.setPageBgColor(hex, true, { skipTextTheme: true });
    return;
  }
  const color = normalizeHexColor(hex) || PAGE_BG_COLOR_DEFAULT;
  document.documentElement.style.setProperty("--paper", color);
  document.documentElement.style.setProperty("background-color", color);
  if (document.body) document.body.style.setProperty("background-color", color);
  syncPaperBgHexLabel();
}

function adjustPageBgLighter() {
  setPageBgDirect(mixHexToward(resolvePageBgColor(), "#ffffff", PAGE_BG_ADJUST_STEP));
}

function adjustPageBgDarker() {
  setPageBgDirect(mixHexToward(resolvePageBgColor(), "#000000", PAGE_BG_ADJUST_STEP));
}

function initSharedPageBgPicker() {
  if (!window.Mark3readPageBg) {
    applyPageBackground();
    return;
  }
  window.Mark3readPageBg.configure({
    defaultHex: PAGE_BG_COLOR_DEFAULT,
    onApply: applyPageBackground
  });
  window.Mark3readPageBg.mountPageBgColorPicker();
  applyPageBackground();
}

renderCard(cardData);
syncBgmButton();
initSharedPageBgPicker();
autoplayBtn?.addEventListener("click", runAutoplay);
document.getElementById("bgm-btn")?.addEventListener("click", () => {
  void toggleBgm();
});
document.getElementById("paper-bg-lighter")?.addEventListener("click", adjustPageBgLighter);
document.getElementById("paper-bg-darker")?.addEventListener("click", adjustPageBgDarker);
const bgmStartInput = document.getElementById("bgm-start-sec");
if (bgmStartInput) {
  bgmStartInput.addEventListener("change", () => {
    setBgmStartSecFromInput(bgmStartInput.value);
  });
  bgmStartInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setBgmStartSecFromInput(bgmStartInput.value);
      bgmStartInput.blur();
    }
  });
}
