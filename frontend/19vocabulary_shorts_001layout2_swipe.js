const SWIPE_EXAMPLES = [
  {
    id: "swipe-up",
    emoji: "↑",
    name: "Swipe Up",
    nameKo: "기본",
    desc: "위로 쓸어올리며 사라지는 기본 효과. 가독성 좋음.",
    badge: "현재 사용 중",
    outMs: 560
  },
  {
    id: "swipe-left",
    emoji: "←",
    name: "Swipe Left",
    nameKo: "",
    desc: "좌측으로 슬라이드하며 사라지는 효과. 역동적이고 빠른 느낌.",
    badge: "추천 ⭐",
    outMs: 380
  },
  {
    id: "flip-h",
    emoji: "↔️",
    name: "Flip Horizontal",
    nameKo: "",
    desc: "좌우로 뒤집으며 전환하는 3D 효과. 프리미엄하고 세련됨.",
    badge: "3D",
    outMs: 480
  },
  {
    id: "flip-v",
    emoji: "↕️",
    name: "Flip Vertical",
    nameKo: "",
    desc: "상하로 뒤집으며 전환하는 3D 효과. 독특한 느낌.",
    badge: "3D",
    outMs: 480
  },
  {
    id: "pop",
    emoji: "💥",
    name: "Pop & Bounce",
    nameKo: "",
    desc: "튕기면서 나타나는 경쾌한 효과. 재미있고 생동감 있음.",
    badge: "재미있음",
    outMs: 420
  },
  {
    id: "zoom",
    emoji: "🔍",
    name: "Zoom In",
    nameKo: "",
    desc: "중앙에서 확대하며 나타나는 효과. 포커스 있고 임팩트 있음.",
    badge: "강조",
    outMs: 420
  },
  {
    id: "glitch",
    emoji: "⚡",
    name: "Glitch",
    nameKo: "",
    desc: "버벅거리는 효과. 트렌디하고 에너지 있음. (짧게 사용)",
    badge: "",
    outMs: 280
  }
];

const SAMPLE_CARDS = [
  { en: "bulwark", ko: "보루 · 방벽", cf: "cf. the floating bulwark" },
  { en: "prowess", ko: "뛰어난 능력", cf: "cf. shipbuilding prowess" },
  { en: "eclipse", ko: "능가하다", cf: "cf. were eclipsed by Korea" }
];

const stageEl = document.getElementById("demo-stage");
const listEl = document.getElementById("demo-list");
let cardIndex = 0;
let playing = false;
let activeId = "swipe-up";

function cardHtml(sample) {
  return `<article class="demo-card">
    <div class="en">${sample.en}</div>
    <div class="ko">${sample.ko}</div>
    <div class="cf">${sample.cf}</div>
  </article>`;
}

function showCard(index, enterClass = "") {
  const sample = SAMPLE_CARDS[((index % SAMPLE_CARDS.length) + SAMPLE_CARDS.length) % SAMPLE_CARDS.length];
  stageEl.innerHTML = cardHtml(sample);
  const card = stageEl.querySelector(".demo-card");
  if (enterClass) {
    card.classList.add("is-in", enterClass);
  }
  return card;
}

function renderList() {
  listEl.innerHTML = SWIPE_EXAMPLES.map((item) => `
    <button type="button" class="demo-item${item.id === activeId ? " is-active" : ""}" data-id="${item.id}">
      <span class="emoji">${item.emoji}</span>
      <span class="copy">
        <span class="name">${item.name}${item.nameKo ? ` <em>(${item.nameKo})</em>` : ""}</span>
        <span class="desc">${item.desc}</span>
      </span>
      ${item.badge ? `<span class="badge">${item.badge}</span>` : "<span></span>"}
    </button>
  `).join("");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function playExample(id) {
  if (playing) return;
  const style = SWIPE_EXAMPLES.find((item) => item.id === id);
  if (!style) return;
  playing = true;
  activeId = id;
  renderList();

  const current = stageEl.querySelector(".demo-card") || showCard(cardIndex);
  current.className = `demo-card is-out swipe-out-${id}`;
  await sleep(style.outMs);

  cardIndex += 1;
  showCard(cardIndex, `swipe-in-${id}`);
  playing = false;
}

listEl.addEventListener("click", (event) => {
  const btn = event.target.closest(".demo-item");
  if (!btn) return;
  playExample(btn.dataset.id);
});

renderList();
showCard(0);
