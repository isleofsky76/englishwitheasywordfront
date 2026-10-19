/**
 * 프론트엔드 TTS 음성 카탈로그
 * - 01black2 / 한문장 / layout / 01g / 0g / grandom / news 등에서 수집
 * - language 파라미터는 /generate-audio?language= 값
 */

const SAMPLE_EN = "They have been coy about the glove change.";
const SAMPLE_KO = "그들은 글러브를 바꾼 것에 대해 말을 아끼고 있다.";

/** @type {{ key: string, title: string, voices: object[] }[]} */
const VOICE_SECTIONS = [
  {
    key: "en-black2",
    title: "영어 · black2 / layout 계열",
    voices: [
      {
        id: "en-US-Chirp3-HD-Despina",
        label: "Despina",
        family: "Chirp3 HD · US",
        note: "black2 기본 · 랜덤 후보",
        highlight: true,
        usedIn: ["01black2", "01black2한문장", "01black", "01amlostblack", "001layout", "001layout2", "01g"]
      },
      {
        id: "en-US-Chirp3-HD-Gacrux",
        label: "Gacrux",
        family: "Chirp3 HD · US",
        note: "랜덤 후보",
        usedIn: ["01black2", "01black2한문장", "01black", "01amlostblack", "001layout", "001layout2", "01g"]
      },
      {
        id: "en-US-Chirp3-HD-Pulcherrima",
        label: "Pulcherrima",
        family: "Chirp3 HD · US",
        note: "01g 추가 랜덤",
        usedIn: ["01g"]
      },
      {
        id: "en-US-Chirp3-HD-Vindemiatrix",
        label: "Vindemiatrix",
        family: "Chirp3 HD · US",
        note: "01g 추가 랜덤",
        usedIn: ["01g"]
      }
    ]
  },
  {
    key: "en-other",
    title: "영어 · 0g / grouping / grandom / news",
    voices: [
      {
        id: "en-US-Chirp-HD-D",
        label: "Chirp-HD-D",
        family: "Chirp HD · US 남성",
        note: "0g·grouping 기본 · news 풀 #1",
        usedIn: ["0g", "grouping2", "grandom", "20/22news_sentence", "20photoenglishmp4"]
      },
      {
        id: "en-US-Chirp-HD-F",
        label: "Chirp-HD-F",
        family: "Chirp HD · US 여성",
        note: "news 풀 #2",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-US-News-N",
        label: "News-N",
        family: "News · US 여성",
        note: "news 풀 #3",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-US-Wavenet-C",
        label: "Wavenet-C",
        family: "Wavenet · US",
        note: "grandom #2",
        usedIn: ["grandom"]
      },
      {
        id: "en-GB-Chirp-HD-D",
        label: "Chirp-HD-D",
        family: "Chirp HD · GB 남성",
        note: "0g·grouping #2 · grandom #3",
        usedIn: ["0g", "grouping2", "grandom"]
      },
      {
        id: "en-GB-News-M",
        label: "News-M",
        family: "News · GB 남성",
        note: "news 풀 #4 (language=en-GB)",
        languageParam: "en-GB",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-GB-News-H",
        label: "News-H",
        family: "News · GB 여성",
        note: "news 풀 #5 (language=en-GB)",
        languageParam: "en-GB",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-GB-Neural2-B",
        label: "Neural2-B",
        family: "Neural2 · GB 남성",
        note: "news 풀 #6 (language=en-GB)",
        languageParam: "en-GB",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-GB-Chirp3-HD-Zubenelgenubi",
        label: "Zubenelgenubi",
        family: "Chirp3 HD · GB",
        note: "news 풀 #7",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-GB-News-I",
        label: "News-I",
        family: "News · GB 여성",
        note: "news 풀 #8 (language=en-GB)",
        languageParam: "en-GB",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-GB-Wavenet-N",
        label: "Wavenet-N",
        family: "Wavenet · GB 여성",
        note: "news 풀 #9",
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "en-AU-News-G",
        label: "News-G",
        family: "News · AU",
        note: "news 풀 #10 (language=en-AU)",
        languageParam: "en-AU",
        usedIn: ["20/22news_sentence"]
      }
    ]
  },
  {
    key: "ko",
    title: "한국어",
    voices: [
      {
        id: "ko-KR",
        label: "ko-KR 기본",
        family: "Neural2-C (백엔드 기본)",
        note: "shorts KO_TTS_VOICE=1 · language=ko-KR",
        sample: SAMPLE_KO,
        usedIn: ["001layout", "001layout2", "01g", "0g", "01black", "grouping2", "grandom", "news"]
      },
      {
        id: "ko-KR-Neural2-C",
        label: "Neural2-C",
        family: "Neural2 · KR",
        note: "news KO_TTS_VOICE_NAMES #1",
        sample: SAMPLE_KO,
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "ko-KR-Chirp3-HD-Achird",
        label: "Achird",
        family: "Chirp3 HD · KR",
        note: "KO_TTS_VOICE=2",
        sample: SAMPLE_KO,
        usedIn: ["001layout", "001layout2", "01g", "0g", "01black", "grouping2", "grandom", "news"]
      },
      {
        id: "ko-KR-Chirp3-HD-Achernar",
        label: "Achernar",
        family: "Chirp3 HD · KR",
        note: "KO_TTS_VOICE=3",
        sample: SAMPLE_KO,
        usedIn: ["001layout", "001layout2", "01g", "0g", "01black", "grouping2", "grandom", "news"]
      },
      {
        id: "ko-KR-Chirp3-HD-Zephyr",
        label: "Zephyr",
        family: "Chirp3 HD · KR",
        note: "news KO 풀",
        sample: SAMPLE_KO,
        usedIn: ["20/22news_sentence"]
      },
      {
        id: "ko-KR-Chirp3-HD-Vindemiatrix",
        label: "Vindemiatrix",
        family: "Chirp3 HD · KR",
        note: "news KO 풀",
        sample: SAMPLE_KO,
        usedIn: ["20/22news_sentence"]
      }
    ]
  }
];

const BACKEND_PORT = 3000;
const voiceRootEl = document.getElementById("voice-root");
const sectionNavEl = document.getElementById("section-nav");
const statusEl = document.getElementById("status");
const audioCache = new Map();
let currentAudio = null;
let activeFilter = "all";

const backendBaseUrl = (() => {
  const protocol = window.location.protocol === "file:" ? "http:" : window.location.protocol;
  const hostname = window.location.hostname || "localhost";
  return `${protocol}//${hostname}:${BACKEND_PORT}`;
})();

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setStatus(text) {
  if (statusEl) statusEl.textContent = text || "";
}

function resolveLanguageParam(voice) {
  if (voice.languageParam) return voice.languageParam;
  return voice.id;
}

function resolveSample(voice) {
  if (voice.sample) return voice.sample;
  if (/^ko-/i.test(voice.id) || voice.id === "ko-KR") return SAMPLE_KO;
  return SAMPLE_EN;
}

function getAudioUrl(text, languageKey) {
  return `${backendBaseUrl}/generate-audio?text=${encodeURIComponent(text)}&language=${encodeURIComponent(languageKey)}`;
}

async function loadAudio(text, languageKey) {
  const url = getAudioUrl(text, languageKey);
  if (audioCache.has(url)) return audioCache.get(url);

  const promise = (async () => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TTS HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const audio = new Audio(objectUrl);
    audio.preload = "auto";
    return audio;
  })();

  audioCache.set(url, promise);
  return promise;
}

function stopCurrent() {
  if (!currentAudio) return;
  currentAudio.pause();
  currentAudio.currentTime = 0;
  currentAudio = null;
}

async function playVoice(voice) {
  const text = resolveSample(voice);
  const languageKey = resolveLanguageParam(voice);
  stopCurrent();
  setStatus(`재생 중… ${languageKey}`);

  try {
    const audio = await loadAudio(text, languageKey);
    currentAudio = audio;
    audio.currentTime = 0;
    await audio.play();
    await new Promise((resolve) => {
      audio.onended = resolve;
      audio.onerror = resolve;
    });
    if (currentAudio === audio) currentAudio = null;
    setStatus(`완료 · ${voice.id}`);
  } catch (_) {
    setStatus(`재생 실패 · 백엔드(${BACKEND_PORT}) 확인 · ${languageKey}`);
  }
}

function countVoices() {
  return VOICE_SECTIONS.reduce((n, s) => n + s.voices.length, 0);
}

function renderNav() {
  if (!sectionNavEl) return;
  const buttons = [
    { key: "all", label: "전체" },
    ...VOICE_SECTIONS.map((s) => ({ key: s.key, label: s.title.split("·")[0].trim() }))
  ];

  sectionNavEl.innerHTML = buttons
    .map(
      (b) =>
        `<button type="button" class="nav-btn${activeFilter === b.key ? " is-active" : ""}" data-filter="${b.key}">${escapeHtml(b.label)}</button>`
    )
    .join("");

  sectionNavEl.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeFilter = btn.getAttribute("data-filter") || "all";
      renderAll();
    });
  });
}

function renderVoiceCard(voice, index) {
  const used = (voice.usedIn || []).map((u) => `<span class="used-tag">${escapeHtml(u)}</span>`).join("");
  const langParam = resolveLanguageParam(voice);
  const showLangNote =
    langParam !== voice.id
      ? `<p class="voice-lang">API language=<code>${escapeHtml(langParam)}</code></p>`
      : "";

  return `
    <article class="voice-card${voice.highlight ? " is-default" : ""}">
      <div class="voice-top">
        <span class="voice-num">#${index}</span>
        ${voice.highlight ? '<span class="voice-badge">BLACK2</span>' : ""}
      </div>
      <h3 class="voice-name">${escapeHtml(voice.label)}</h3>
      <p class="voice-family">${escapeHtml(voice.family || "")}</p>
      <code class="voice-id">${escapeHtml(voice.id)}</code>
      ${showLangNote}
      <p class="voice-note">${escapeHtml(voice.note || "")}</p>
      <div class="used-list">${used}</div>
      <button type="button" class="play-btn" data-play-id="${escapeHtml(voice.id)}">미리듣기</button>
    </article>
  `;
}

function renderAll() {
  renderNav();
  if (!voiceRootEl) return;

  const sections =
    activeFilter === "all"
      ? VOICE_SECTIONS
      : VOICE_SECTIONS.filter((s) => s.key === activeFilter);

  let globalIndex = 0;
  const voiceById = new Map();

  voiceRootEl.innerHTML = sections
    .map((section) => {
      const cards = section.voices
        .map((voice) => {
          globalIndex += 1;
          voiceById.set(voice.id, voice);
          return renderVoiceCard(voice, globalIndex);
        })
        .join("");
      return `
        <section class="voice-section">
          <h2 class="section-title">${escapeHtml(section.title)}</h2>
          <div class="voice-list">${cards}</div>
        </section>
      `;
    })
    .join("");

  // filter가 all이 아니면 인덱스를 섹션 기준으로 다시
  if (activeFilter !== "all") {
    let i = 0;
    voiceRootEl.querySelectorAll(".voice-num").forEach((el) => {
      i += 1;
      el.textContent = `#${i}`;
    });
  }

  voiceRootEl.querySelectorAll("[data-play-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-play-id");
      const voice = voiceById.get(id);
      if (voice) playVoice(voice);
    });
  });

  setStatus(`등록 음성 ${countVoices()}개 · 표시 ${sections.reduce((n, s) => n + s.voices.length, 0)}개`);
}

renderAll();
