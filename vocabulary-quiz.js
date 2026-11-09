(function () {
  "use strict";

  /**
   * API/?slug= 진입용. 클릭 공개형(reveal) UI는 제거됨.
   * reveal-section 데이터 → track 입력 퀴즈(유사 정답 · EN↔KO)만 렌더.
   */
  var TRACK_VER = "20261109mc2";

  /** "출산 퀴즈" → "출산 시사 어휘 퀴즈" (이미 시사 어휘 퀴즈면 유지) */
  function formatQuizTitle(title) {
    var t = String(title || "").trim();
    if (!t) return "시사 어휘 퀴즈";
    if (/시사\s*어휘\s*퀴즈\s*$/.test(t)) {
      return t.replace(/\s*시사\s*어휘\s*퀴즈\s*$/, " 시사 어휘 퀴즈").replace(/^\s+/, "");
    }
    if (/\s*퀴즈\s*$/.test(t)) {
      return t.replace(/\s*퀴즈\s*$/, "") + " 시사 어휘 퀴즈";
    }
    return t;
  }

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function getApiBase() {
    if (typeof window.getPage30ApiBaseUrl === "function") {
      return window.getPage30ApiBaseUrl();
    }
    return window.PAGE30_PRODUCTION_API_BASE || "";
  }

  function rootAsset(file) {
    return "/" + String(file || "").replace(/^\//, "");
  }

  function ensureStylesheet(href) {
    var pathOnly = href.split("?")[0];
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      var cur = links[i].getAttribute("href") || "";
      if (cur.indexOf(pathOnly) !== -1 || (links[i].href || "").indexOf(pathOnly) !== -1) {
        return;
      }
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function ensureFonts() {
    if (document.getElementById("vq-track-fonts")) return;
    var link = document.createElement("link");
    link.id = "vq-track-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Noto+Sans+KR:wght@400;500;700&family=IBM+Plex+Mono:wght@500&display=swap";
    document.head.appendChild(link);
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var key = src.split("?")[0];
      var existing = document.querySelector('script[src*="' + key + '"]');
      if (existing && typeof window.initVocabQuizTrack === "function") {
        resolve();
        return;
      }
      if (existing) {
        existing.addEventListener("load", function () {
          resolve();
        });
        existing.addEventListener("error", reject);
        return;
      }
      var s = document.createElement("script");
      s.src = src;
      s.onload = function () {
        resolve();
      };
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function splitMeanings(ko) {
    return String(ko || "")
      .split(/[,，、/;；·･・|]+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function trackWordsFromQuizzes(quizzes) {
    var words = [];
    var seen = Object.create(null);

    (quizzes || []).forEach(function (q) {
      if (!q || q.type !== "reveal-section" || !Array.isArray(q.items)) return;
      var dir = String(q.direction || "").trim();

      q.items.forEach(function (it) {
        if (!it) return;
        var show = String(it.show || it.en || "").trim();
        var hide = String(it.hide || it.ko || "").trim();
        if (!show || !hide) return;

        var en;
        var ko;
        if (dir === "ko-en" || (!dir && !/[A-Za-z]/.test(show))) {
          ko = show;
          en = hide;
        } else {
          en = show;
          ko = hide;
        }
        if (!/[A-Za-z]/.test(en)) return;

        var key = en.toLowerCase();
        if (seen[key]) return;
        seen[key] = true;
        words.push({
          en: [en],
          ko: splitMeanings(ko),
        });
      });
    });

    return words.filter(function (w) {
      return w.en.length && w.ko.length;
    });
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function youtubeButtonHtml(url, label) {
    if (!url) return "";
    return (
      '<p class="vq-youtube">' +
      '<a class="vq-youtube-btn" href="' +
      escapeHtml(url) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<svg class="vq-youtube-icon" viewBox="0 0 28 20" aria-hidden="true" focusable="false">' +
      '<path fill="#FF0000" d="M27.33 3.12A3.5 3.5 0 0 0 24.86.65C22.7 0 14 0 14 0S5.3 0 3.14.65A3.5 3.5 0 0 0 .67 3.12 36.7 36.7 0 0 0 0 10a36.7 36.7 0 0 0 .67 6.88 3.5 3.5 0 0 0 2.47 2.47C5.3 20 14 20 14 20s8.7 0 10.86-.65a3.5 3.5 0 0 0 2.47-2.47A36.7 36.7 0 0 0 28 10a36.7 36.7 0 0 0-.67-6.88z"/>' +
      '<path fill="#fff" d="M11.2 14.3V5.7L18.5 10l-7.3 4.3z"/>' +
      "</svg>" +
      "<span>" +
      escapeHtml(label || "유튜브 보기") +
      "</span></a></p>"
    );
  }

  function renderTrackShell(entry) {
    var title = formatQuizTitle(entry.title || "시사 어휘 퀴즈");
    var yt = youtubeButtonHtml(entry.sourceUrl, entry.sourceLabel);
    try {
      document.title = title + " | 시사 어휘 퀴즈 · 시사영단어";
    } catch (e) { /* ignore */ }
    return (
      '<main class="vq-track" id="vq-track">' +
      '<header class="vq-header">' +
      '<span class="vq-eyebrow">시사 어휘 퀴즈</span>' +
      '<h1 class="vq-title">' +
      escapeHtml(title) +
      "</h1>" +
      '<p class="vq-sub">뜻을 입력한 뒤 키보드의 이동/완료를 누르거나, 아래 <b>정답 보기</b>를 탭하세요.</p>' +
      yt +
      "</header>" +
      '<div class="vq-bar">' +
      '<div class="vq-seg" role="group" aria-label="퀴즈 방향">' +
      '<button type="button" id="m-en" aria-pressed="true">영어 → 한글</button>' +
      '<button type="button" id="m-ko" aria-pressed="false">한글 → 영어</button>' +
      '<button type="button" id="m-mc" aria-pressed="false">객관식</button>' +
      "</div>" +
      '<div class="vq-score"><b id="sc">0</b> / <span id="tot">0</span> 정답</div>' +
      "</div>" +
      '<div class="vq-progress"><i id="prog"></i></div>' +
      '<ol class="vq-list" id="list"></ol>' +
      '<div class="vq-actions">' +
      '<button type="button" class="vq-btn primary" id="checkAll">전체 채점</button>' +
      '<button type="button" class="vq-btn" id="reveal">정답 보기</button>' +
      '<button type="button" class="vq-btn" id="reset">다시 하기</button>' +
      "</div>" +
      '<p class="vq-hint" id="vq-hint">유사·대체 표현도 정답으로 인정합니다. 모바일: 입력 후 다음 칸으로 넘어가면 자동 채점. 뜻이 여러 개면 하나만 맞아도 O.</p>' +
      "</main>"
    );
  }

  async function mountTrackQuiz(container, entry, words) {
    document.body.classList.remove("rd-quiz");
    document.body.classList.add("rd-quiz-track");
    ensureFonts();
    ensureStylesheet(rootAsset("vocabulary-quiz-track.css?v=" + TRACK_VER));

    window.VOCAB_QUIZ_TRACK_WORDS = words;
    container.innerHTML = renderTrackShell(entry);

    await loadScriptOnce(rootAsset("vocabulary-quiz-track.js?v=" + TRACK_VER));
    if (typeof window.initVocabQuizTrack === "function") {
      window.initVocabQuizTrack();
    }
  }

  function listHref() {
    return "/vocabulary-quiz-list.html";
  }

  function resolveSlug() {
    var params = new URLSearchParams(window.location.search);
    var fromQuery = (params.get("slug") || "").trim();
    if (fromQuery) return fromQuery;
    var fromBody = document.body && document.body.dataset.nvSlug;
    if (fromBody) return String(fromBody).trim();
    var parts = (window.location.pathname || "").replace(/\/+$/, "").split("/");
    var last = parts[parts.length - 1] || "";
    if (last && last !== "vocabulary-quiz.html" && last !== "vocabulary-quiz") {
      return decodeURIComponent(last);
    }
    return "";
  }

  async function fetchEntry() {
    var params = new URLSearchParams(window.location.search);
    var slug = resolveSlug();
    var indexParam = params.get("index");
    var apiBase = getApiBase();

    if (slug) {
      var bySlug = await fetch(
        apiBase + "/vocabulary-quiz/by-slug/" + encodeURIComponent(slug),
        { cache: "no-store" }
      );
      if (!bySlug.ok) throw new Error("HTTP " + bySlug.status);
      var slugData = await bySlug.json();
      return slugData.entry || null;
    }

    var listRes = await fetch(apiBase + "/vocabulary-quiz", { cache: "no-store" });
    if (!listRes.ok) throw new Error("HTTP " + listRes.status);
    var listData = await listRes.json();
    var entries = Array.isArray(listData) ? listData : listData.entries || [];

    if (indexParam !== null && indexParam !== "") {
      var index = parseInt(indexParam, 10);
      if (!isNaN(index) && index >= 0 && index < entries.length) {
        return entries[index];
      }
    }

    return null;
  }

  async function init() {
    document.body.classList.add("rd-quiz");
    var container = document.getElementById("vocabulary-quiz-entries");
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    if (!resolveSlug() && params.get("index") === null) {
      window.location.replace(listHref());
      return;
    }

    container.appendChild(createElement("p", "quiz-loading", "퀴즈를 불러오는 중..."));
    try {
      var entry = await fetchEntry();
      container.replaceChildren();
      if (!entry) {
        container.appendChild(
          createElement("p", "quiz-empty", "퀴즈를 찾을 수 없습니다.")
        );
        var back = createElement("p", "quiz-source");
        var backLink = createElement("a", "", "목록으로");
        backLink.href = listHref();
        back.appendChild(backLink);
        container.appendChild(back);
        return;
      }

      if (entry.title) document.title = entry.title + " | 시사영단어";

      var trackWords = trackWordsFromQuizzes(entry.quizzes);
      if (!trackWords.length) {
        container.appendChild(
          createElement(
            "p",
            "quiz-error",
            "이 퀴즈는 입력형(track) 데이터가 없어 표시할 수 없습니다."
          )
        );
        console.error("[vocabulary-quiz] track words empty — reveal/MCQ UI removed");
        return;
      }

      await mountTrackQuiz(container, entry, trackWords);
    } catch (error) {
      container.replaceChildren(
        createElement(
          "p",
          "quiz-error",
          "퀴즈를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."
        )
      );
      console.error("[vocabulary-quiz]", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
