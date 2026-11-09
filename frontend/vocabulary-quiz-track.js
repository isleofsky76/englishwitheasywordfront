(function () {
  "use strict";

  function getWords() {
    return Array.isArray(window.VOCAB_QUIZ_TRACK_WORDS)
      ? window.VOCAB_QUIZ_TRACK_WORDS
      : [];
  }

  function $(id) {
    return document.getElementById(id);
  }

  var mode = "en"; // en | ko | mc
  var bound = false;
  /** 객관식 보기 캐시 — 모드 유지 중엔 섞지 않음, 다시 하기에서만 갱신 */
  var mcCache = null;
  /** 다른 vocabulary-quiz 항목의 한글 뜻 풀 (동의어 퀴즈 오답용) */
  var globalMcPool = null;
  var globalMcPoolPromise = null;
  /** 뉴스영어 등 임베드 옵션 */
  var trackOptions = {
    comments: true,
    hideModeTabs: false,
    forceMode: "",
    skipDocumentTitle: false,
  };

  function norm(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[\s\-./·･・，、;；]+/g, "");
  }

  /** 배열·쉼표/슬래시로 이은 여러 뜻을 개별 정답으로 펼침 */
  function expandAnswers(list) {
    var out = [];
    var seen = Object.create(null);
    (Array.isArray(list) ? list : [list]).forEach(function (item) {
      String(item || "")
        .split(/[,，、/;；·･・|/]+/)
        .map(function (p) {
          return p.trim();
        })
        .filter(Boolean)
        .forEach(function (p) {
          var key = norm(p);
          if (!key || seen[key]) return;
          seen[key] = true;
          out.push(p);
        });
    });
    return out;
  }

  /** 포함 관계도 허용 (짧은 오답 남발 방지를 위해 최소 길이) */
  function softMatch(userNorm, answerNorm) {
    if (!userNorm || !answerNorm) return false;
    if (userNorm === answerNorm) return true;
    var minLen = /[a-z]/.test(userNorm) ? 4 : 2;
    if (userNorm.length < minLen || answerNorm.length < minLen) return false;
    return answerNorm.indexOf(userNorm) !== -1 || userNorm.indexOf(answerNorm) !== -1;
  }

  /** 여러 뜻 중 하나만 맞아도 true (유사·대체 표현 / 부분 일치 포함) */
  function matchesAny(userValue, answerList) {
    var answers = expandAnswers(answerList);
    if (!answers.length) return false;
    var parts = expandAnswers([userValue]);
    if (!parts.length) parts = [String(userValue || "").trim()].filter(Boolean);
    return parts.some(function (part) {
      var n = norm(part);
      return answers.some(function (a) {
        return softMatch(n, norm(a));
      });
    });
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function mulberry32(a) {
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleWith(rng, arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i -= 1) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function getApiBase() {
    if (typeof window.getPage30ApiBaseUrl === "function") {
      return window.getPage30ApiBaseUrl();
    }
    return window.PAGE30_PRODUCTION_API_BASE || "";
  }

  function currentQuizSlug() {
    var bodySlug = document.body && document.body.dataset.nvSlug;
    if (bodySlug) return String(bodySlug).trim();
    try {
      var q = new URLSearchParams(window.location.search).get("slug");
      if (q) return String(q).trim();
    } catch (e) { /* ignore */ }
    var parts = (window.location.pathname || "").replace(/\/+$/, "").split("/");
    var last = parts[parts.length - 1] || "";
    if (last && last !== "vocabulary-quiz.html" && last !== "vocabulary-quiz") {
      try {
        return decodeURIComponent(last);
      } catch (e2) {
        return last;
      }
    }
    return "";
  }

  function cleanKoLabel(label) {
    return String(label || "")
      .replace(/\s*\((?:형|명|동|부|관|감|전|접)\)\s*$/g, "")
      .trim();
  }

  /** 객관식 보기용 — 한글 뜻만 허용 (영단어·영문 구 제외) */
  function isKoOptionLabel(label) {
    var s = cleanKoLabel(label);
    if (!s || s.length < 2) return false;
    if (!/[가-힣]/.test(s)) return false;
    /* 라틴 문자가 한글보다 많으면 영어 위주 라벨로 보고 제외 */
    var latin = (s.match(/[A-Za-z]/g) || []).join("").length;
    var hangul = (s.match(/[가-힣]/g) || []).join("").length;
    if (latin > 0 && latin >= hangul) return false;
    return true;
  }

  function conflictsWithAny(label, forbidden) {
    var n = norm(label);
    if (!n) return true;
    return forbidden.some(function (f) {
      return softMatch(n, norm(f));
    });
  }

  function pushUniqueLabel(pool, seen, label) {
    var cleaned = cleanKoLabel(label) || String(label || "").trim();
    if (!isKoOptionLabel(cleaned)) return;
    var key = norm(cleaned);
    if (!key || key.length < 2 || seen[key]) return;
    seen[key] = true;
    pool.push(cleaned);
  }

  /** 퀴즈 아이템에서 한글 뜻만 추출 (en-ko → hide, ko-en → show) */
  function koreanLabelsFromItem(qz, it) {
    if (!it) return [];
    var dir = String((qz && qz.direction) || "").toLowerCase();
    var raw = "";
    if (dir === "ko-en") raw = it.show || "";
    else if (dir === "en-ko") raw = it.hide || "";
    else {
      /* direction 없으면 한글이 있는 쪽 */
      var hide = String(it.hide || "");
      var show = String(it.show || "");
      raw = /[가-힣]/.test(hide) ? hide : /[가-힣]/.test(show) ? show : hide;
    }
    return expandAnswers([raw]).filter(isKoOptionLabel);
  }

  /** 다른 시사 어휘 퀴즈들의 한글 뜻 — 동의어 묶음 퀴즈에서 오답이 비슷해지는 문제 완화 */
  function ensureGlobalMcPool() {
    if (globalMcPool && globalMcPool.length) return Promise.resolve(globalMcPool);
    if (globalMcPoolPromise) return globalMcPoolPromise;
    var apiBase = getApiBase();
    if (!apiBase) {
      globalMcPool = [];
      return Promise.resolve(globalMcPool);
    }
    var slug = currentQuizSlug();
    globalMcPoolPromise = fetch(apiBase + "/vocabulary-quiz", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        var entries = Array.isArray(data) ? data : data.entries || [];
        var seen = Object.create(null);
        var pool = [];
        entries.forEach(function (entry) {
          if (!entry) return;
          if (slug && entry.slug && String(entry.slug) === slug) return;
          (entry.quizzes || []).forEach(function (qz) {
            (qz.items || []).forEach(function (it) {
              koreanLabelsFromItem(qz, it).forEach(function (label) {
                pushUniqueLabel(pool, seen, label);
              });
            });
          });
        });
        globalMcPool = pool;
        return globalMcPool;
      })
      .catch(function (err) {
        console.warn("[vocabulary-quiz-track] global MC pool load failed", err);
        globalMcPool = globalMcPool || [];
        return globalMcPool;
      });
    return globalMcPoolPromise;
  }

  /**
   * 객관식 보기: 정답 1 + 오답 최대 3.
   * 오답은 다른 vocabulary-quiz 뜻 풀을 우선 사용(유사 동의어 퀴즈에서 보기가 너무 비슷·쉬운 문제 방지).
   * 풀이 부족할 때만 같은 퀴즈의 비유사 뜻을 보조로 채움.
   */
  function buildMcOptions(words, correctIndex, sessionSeed, externalPool) {
    var w = words[correctIndex];
    if (!w) return { choices: [], correctNorm: "" };
    var koAnswers = expandAnswers(w.ko).map(cleanKoLabel).filter(isKoOptionLabel);
    var correctLabel = koAnswers[0] || cleanKoLabel((w.ko && w.ko[0]) || "");
    if (!isKoOptionLabel(correctLabel)) {
      return { choices: [], correctNorm: "", correctLabel: correctLabel };
    }
    var correctNorm = norm(correctLabel);
    var forbidden = koAnswers.slice();
    if (forbidden.indexOf(correctLabel) === -1) forbidden.unshift(correctLabel);

    var seen = Object.create(null);
    if (correctNorm) seen[correctNorm] = true;

    var primary = [];
    (externalPool || []).forEach(function (label) {
      if (!isKoOptionLabel(label) || conflictsWithAny(label, forbidden)) return;
      pushUniqueLabel(primary, seen, label);
    });

    var local = [];
    words.forEach(function (other, idx) {
      if (idx === correctIndex || !other) return;
      expandAnswers(other.ko).forEach(function (label) {
        if (!isKoOptionLabel(label) || conflictsWithAny(label, forbidden)) return;
        pushUniqueLabel(local, seen, label);
      });
    });

    var need = 3;
    var rng = mulberry32((sessionSeed ^ ((correctIndex + 1) * 2654435761)) >>> 0);
    var distractors = shuffleWith(rng, primary).slice(0, need);
    if (distractors.length < need) {
      distractors = distractors.concat(
        shuffleWith(rng, local).slice(0, need - distractors.length)
      );
    }
    var choices = shuffleWith(rng, [correctLabel].concat(distractors).filter(isKoOptionLabel));
    return { choices: choices, correctNorm: correctNorm, correctLabel: correctLabel };
  }

  function ensureMcCache(force) {
    var WORDS = getWords();
    if (!force && mcCache && mcCache.length === WORDS.length) {
      return Promise.resolve(mcCache);
    }
    return ensureGlobalMcPool().then(function (pool) {
      var seed = (Date.now() ^ (WORDS.length * 9973) ^ ((pool && pool.length) || 0)) >>> 0;
      mcCache = WORDS.map(function (_, i) {
        return buildMcOptions(WORDS, i, seed, pool || []);
      });
      return mcCache;
    });
  }

  function updateChrome() {
    var sub = document.querySelector(".vq-sub");
    var hint = $("vq-hint");
    if (mode === "mc") {
      if (sub) {
        sub.innerHTML = "영어 단어를 보고 알맞은 뜻을 고르세요.";
      }
      if (hint) {
        hint.textContent = "";
        hint.hidden = true;
      }
    } else {
      if (sub) {
        sub.innerHTML =
          "뜻을 입력한 뒤 키보드의 이동/완료를 누르거나, 아래 <b>정답 보기</b>를 탭하세요.";
      }
      if (hint) {
        hint.hidden = false;
        hint.textContent =
          "유사·대체 표현도 정답으로 인정합니다. 모바일: 입력 후 다음 칸으로 넘어가면 자동 채점. 뜻이 여러 개면 하나만 맞아도 O.";
      }
    }
  }

  var SAY_SVG =
    '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>';

  function speakEn(text) {
    if (!("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text || ""));
      u.lang = "en-US";
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }

  function renderMcItem(w, i, opt) {
    var q = w.en[0];
    var choices = (opt && opt.choices) || [];
    var buttons = choices
      .map(function (label, ci) {
        return (
          '<button type="button" class="vq-choice" data-i="' +
          i +
          '" data-c="' +
          ci +
          '" data-v="' +
          escapeHtml(label) +
          '">' +
          '<span class="vq-choice-key">' +
          (ci + 1) +
          ".</span>" +
          '<span class="vq-choice-text">' +
          escapeHtml(label) +
          "</span>" +
          '<span class="vq-choice-ox" aria-hidden="true"></span>' +
          "</button>"
        );
      })
      .join("");

    return (
      '<li class="is-mc" id="r' +
      i +
      '">' +
      '<div class="vq-mc-head">' +
      '<span class="vq-n">' +
      String(i + 1).padStart(2, "0") +
      "</span>" +
      '<span class="vq-q">' +
      escapeHtml(q) +
      "</span>" +
      '<button type="button" class="vq-say" data-say="' +
      escapeHtml(q) +
      '" aria-label="' +
      escapeHtml(q) +
      ' 발음 듣기">' +
      SAY_SVG +
      "</button>" +
      "</div>" +
      '<span class="vq-mark" aria-live="polite"></span>' +
      '<div class="vq-choices" role="radiogroup" aria-label="' +
      escapeHtml(q) +
      ' 뜻 고르기">' +
      buttons +
      "</div>" +
      "</li>"
    );
  }

  function renderInputItem(w, i) {
    var q = mode === "en" ? w.en[0] : w.ko[0];
    var ph = mode === "en" ? "한글 뜻 입력" : "영어 단어 입력";
    return (
      '<li id="r' +
      i +
      '">' +
      '<span class="vq-n">' +
      String(i + 1).padStart(2, "0") +
      "</span>" +
      '<span class="vq-q">' +
      escapeHtml(q) +
      "</span>" +
      '<input id="in' +
      i +
      '" data-i="' +
      i +
      '" type="text" enterkeyhint="go" inputmode="text" placeholder="' +
      escapeHtml(ph) +
      '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' +
      escapeHtml(q) +
      ' 정답">' +
      '<span class="vq-mark" aria-live="polite"></span>' +
      "</li>"
    );
  }

  function render() {
    var list = $("list");
    var tot = $("tot");
    var WORDS = getWords();
    if (!list) return;

    updateChrome();

    if (mode === "mc") {
      var cache = mcCache || [];
      list.innerHTML = WORDS.map(function (w, i) {
        return renderMcItem(w, i, cache[i]);
      }).join("");
    } else {
      list.innerHTML = WORDS.map(function (w, i) {
        return renderInputItem(w, i);
      }).join("");
    }

    if (tot) tot.textContent = String(WORDS.length);
    updateScore();
  }

  function setAnswerLine(li, answers, ok) {
    var prev = li.querySelector(".vq-ans");
    if (prev) prev.remove();
    var d = document.createElement("span");
    d.className = "vq-ans" + (ok ? " is-ok" : "");
    d.textContent = (ok ? "인정 답: " : "정답: ") + answers.join(", ");
    li.appendChild(d);
  }

  function checkMc(i, showAnswer) {
    var WORDS = getWords();
    var li = $("r" + i);
    var opt = mcCache && mcCache[i];
    if (!li || !WORDS[i] || !opt) return;

    var selected = li.querySelector(".vq-choice.is-selected");
    var mark = li.querySelector(".vq-mark");
    var ansEl = li.querySelector(".vq-ans");
    if (ansEl) ansEl.remove();

    var answers = expandAnswers(WORDS[i].ko);

    function oxOf(btn) {
      return btn.querySelector(".vq-choice-ox");
    }

    if (!selected && !showAnswer) {
      li.className = "is-mc";
      if (mark) {
        mark.textContent = "";
        mark.className = "vq-mark";
      }
      li.querySelectorAll(".vq-choice").forEach(function (btn) {
        btn.classList.remove("is-correct", "is-wrong", "is-selected");
        btn.disabled = false;
        var ox = oxOf(btn);
        if (ox) ox.textContent = "";
      });
      updateScore();
      return;
    }

    var ok = selected
      ? norm(selected.getAttribute("data-v")) === opt.correctNorm ||
        matchesAny(selected.getAttribute("data-v"), WORDS[i].ko)
      : false;

    if (!selected && showAnswer) {
      li.className = "is-mc is-revealed done";
      if (mark) {
        mark.textContent = "";
        mark.className = "vq-mark";
      }
      li.querySelectorAll(".vq-choice").forEach(function (btn) {
        btn.disabled = true;
        var ox = oxOf(btn);
        if (norm(btn.getAttribute("data-v")) === opt.correctNorm) {
          btn.classList.add("is-correct");
          if (ox) ox.textContent = "O";
        }
      });
      setAnswerLine(li, answers, false);
      updateScore();
      return;
    }

    li.className = "is-mc done " + (ok ? "ok" : "bad");
    if (mark) {
      mark.textContent = ok ? "O" : "X";
      mark.className = "vq-mark " + (ok ? "is-o" : "is-x");
    }
    li.querySelectorAll(".vq-choice").forEach(function (btn) {
      btn.disabled = true;
      var isRight = norm(btn.getAttribute("data-v")) === opt.correctNorm;
      var ox = oxOf(btn);
      if (isRight) {
        btn.classList.add("is-correct");
        if (ox) ox.textContent = "O";
      }
      if (btn.classList.contains("is-selected") && !isRight) {
        btn.classList.add("is-wrong");
        if (ox) ox.textContent = "X";
      }
    });
    if (showAnswer || selected) setAnswerLine(li, answers, ok);
    updateScore();
  }

  function check(i, showAnswer) {
    if (mode === "mc") {
      checkMc(i, showAnswer);
      return;
    }

    var WORDS = getWords();
    var li = $("r" + i);
    var inp = $("in" + i);
    if (!li || !inp || !WORDS[i]) return;

    var v = inp.value.trim();
    var rawAnswers = mode === "en" ? WORDS[i].ko : WORDS[i].en;
    var answers = expandAnswers(rawAnswers);
    var ansEl = li.querySelector(".vq-ans");
    if (ansEl) ansEl.remove();

    if (!v && !showAnswer) {
      li.className = "";
      var markClear = li.querySelector(".vq-mark");
      if (markClear) markClear.textContent = "";
      updateScore();
      return;
    }

    var ok = v ? matchesAny(v, rawAnswers) : false;
    var mark = li.querySelector(".vq-mark");

    if (!v && showAnswer) {
      /* 입력 없이 정답 보기 — X 없이 정답만 전체 표시 */
      li.className = "is-revealed";
      if (mark) mark.textContent = "";
      setAnswerLine(li, answers, false);
      updateScore();
      return;
    }

    li.className = ok ? "ok" : "bad";
    if (mark) mark.textContent = ok ? "O" : "X";
    if (showAnswer || v) setAnswerLine(li, answers, ok);
    updateScore();
  }

  /** 입력 여부와 관계없이 모든 문항 정답 표시 */
  function revealAll() {
    getWords().forEach(function (_, i) {
      check(i, true);
    });
  }

  function updateScore() {
    var WORDS = getWords();
    var list = $("list");
    var n = list ? list.querySelectorAll("li.ok").length : 0;
    var sc = $("sc");
    var prog = $("prog");
    if (sc) sc.textContent = String(n);
    if (prog) {
      prog.style.width =
        WORDS.length > 0 ? (n / WORDS.length) * 100 + "%" : "0%";
    }
  }

  function setMode(m) {
    mode = m;
    var mEn = $("m-en");
    var mKo = $("m-ko");
    var mMc = $("m-mc");
    if (mEn) mEn.setAttribute("aria-pressed", m === "en" ? "true" : "false");
    if (mKo) mKo.setAttribute("aria-pressed", m === "ko" ? "true" : "false");
    if (mMc) mMc.setAttribute("aria-pressed", m === "mc" ? "true" : "false");
    if (m === "mc") {
      ensureMcCache(false).then(function () {
        if (mode === "mc") render();
      });
      return;
    }
    render();
  }

  function bind() {
    if (bound) return;
    var list = $("list");
    if (!list) return;
    bound = true;

    list.addEventListener("keydown", function (e) {
      if (mode === "mc") return;
      if (e.key !== "Enter" || !e.target.dataset.i) return;
      e.preventDefault();
      var i = +e.target.dataset.i;
      check(i, false);
      var next = $("in" + (i + 1));
      if (next) next.focus();
      else e.target.blur();
    });

    /* 모바일: Next로만 넘어가도, 칸을 떠날 때 입력값이 있으면 채점 */
    list.addEventListener(
      "blur",
      function (e) {
        if (mode === "mc") return;
        if (!e.target || !e.target.dataset || e.target.dataset.i == null) return;
        if (!String(e.target.value || "").trim()) return;
        check(+e.target.dataset.i, false);
      },
      true
    );

    list.addEventListener("input", function (e) {
      if (mode === "mc") return;
      var li = e.target.closest("li");
      if (!li || !li.className) return;
      li.className = "";
      var mark = li.querySelector(".vq-mark");
      if (mark) mark.textContent = "";
      var ans = li.querySelector(".vq-ans");
      if (ans) ans.remove();
      updateScore();
    });

    list.addEventListener("click", function (e) {
      var say = e.target.closest(".vq-say");
      if (say) {
        e.preventDefault();
        speakEn(say.getAttribute("data-say") || "");
        return;
      }
      var btn = e.target.closest(".vq-choice");
      if (!btn || mode !== "mc") return;
      if (btn.disabled) return;
      var i = +btn.getAttribute("data-i");
      var li = $("r" + i);
      if (!li || li.classList.contains("done") || li.classList.contains("ok") || li.classList.contains("bad")) {
        return;
      }
      li.querySelectorAll(".vq-choice").forEach(function (b) {
        b.classList.remove("is-selected");
      });
      btn.classList.add("is-selected");
      checkMc(i, false);
    });

    var checkAll = $("checkAll");
    var reveal = $("reveal");
    var reset = $("reset");
    var mEn = $("m-en");
    var mKo = $("m-ko");
    var mMc = $("m-mc");

    if (checkAll) {
      checkAll.onclick = function () {
        getWords().forEach(function (_, i) {
          check(i, false);
        });
      };
    }
    if (reveal) {
      reveal.onclick = function () {
        revealAll();
      };
    }
    if (reset) {
      reset.onclick = function () {
        if (mode === "mc") {
          ensureMcCache(true).then(function () {
            render();
          });
          return;
        }
        render();
        var first = $("in0");
        if (first) first.focus();
      };
    }
    if (mEn) {
      mEn.onclick = function () {
        setMode("en");
      };
    }
    if (mKo) {
      mKo.onclick = function () {
        setMode("ko");
      };
    }
    if (mMc) {
      mMc.onclick = function () {
        setMode("mc");
      };
    }
  }

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

  function normalizePageTitles() {
    var h1 = document.querySelector(".vq-title");
    if (h1) {
      var next = formatQuizTitle(h1.textContent);
      if (next && next !== h1.textContent.trim()) h1.textContent = next;
    }
    var eye = document.querySelector(".vq-eyebrow");
    if (eye && !trackOptions.hideModeTabs) eye.textContent = "시사 어휘 퀴즈";
    if (trackOptions.skipDocumentTitle) return;
    var cur = document.title || "";
    var main = cur.split("|")[0].trim();
    var formatted = formatQuizTitle(main);
    if (formatted) {
      document.title = formatted + " | 시사 어휘 퀴즈 · 시사영단어";
    }
  }

  function applyModeChrome() {
    var track = document.getElementById("vq-track") || document.querySelector(".vq-track");
    if (!track) return;
    if (trackOptions.hideModeTabs) track.classList.add("vq-track--mc-only");
    else track.classList.remove("vq-track--mc-only");
    var seg = track.querySelector(".vq-seg");
    if (seg) seg.hidden = !!trackOptions.hideModeTabs;
  }

  function renderEmbedShell(title) {
    return (
      '<div class="vq-track vq-track--embed' +
      (trackOptions.hideModeTabs ? " vq-track--mc-only" : "") +
      '" id="vq-track">' +
      '<header class="vq-header">' +
      '<span class="vq-eyebrow">단어퀴즈</span>' +
      '<h2 class="vq-title">' +
      escapeHtml(title || "이 글 복습 퀴즈") +
      "</h2>" +
      '<p class="vq-sub">영어 단어를 보고 알맞은 뜻을 고르세요.</p>' +
      "</header>" +
      '<div class="vq-bar">' +
      '<div class="vq-seg" role="group" aria-label="퀴즈 방향"' +
      (trackOptions.hideModeTabs ? " hidden" : "") +
      ">" +
      '<button type="button" id="m-en" aria-pressed="false">영어 → 한글</button>' +
      '<button type="button" id="m-ko" aria-pressed="false">한글 → 영어</button>' +
      '<button type="button" id="m-mc" aria-pressed="true">객관식</button>' +
      "</div>" +
      '<div class="vq-score"><b id="sc">0</b> / <span id="tot">0</span> 정답</div>' +
      "</div>" +
      '<div class="vq-progress"><i id="prog"></i></div>' +
      '<ol class="vq-list" id="list"></ol>' +
      '<div class="vq-actions" id="vq-actions">' +
      '<button type="button" class="vq-btn primary" id="checkAll">전체 채점</button>' +
      '<button type="button" class="vq-btn" id="reveal">정답 보기</button>' +
      '<button type="button" class="vq-btn" id="reset">다시 하기</button>' +
      "</div>" +
      '<p class="vq-hint" id="vq-hint" hidden></p>' +
      "</div>"
    );
  }

  function assetBase() {
    var scripts = document.querySelectorAll("script[src]");
    for (var i = 0; i < scripts.length; i += 1) {
      var src = scripts[i].getAttribute("src") || "";
      if (/vocabulary-quiz-track\.js/.test(src)) {
        return src.replace(/[^/]+$/, "");
      }
    }
    return "/";
  }

  function ensureStylesheet(href) {
    var pathOnly = href.split("?")[0];
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i += 1) {
      var cur = links[i].getAttribute("href") || "";
      if (cur.indexOf(pathOnly) !== -1) return Promise.resolve();
    }
    return new Promise(function (resolve) {
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.onload = function () {
        resolve();
      };
      link.onerror = function () {
        resolve();
      };
      document.head.appendChild(link);
      setTimeout(resolve, 800);
    });
  }

  function loadScriptOnce(src) {
    return new Promise(function (resolve, reject) {
      var key = src.split("?")[0];
      var existing = document.querySelector('script[src*="' + key.replace(/^\//, "") + '"]');
      if (existing) {
        if (window.BoardComments) {
          resolve();
          return;
        }
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

  function quizContentKey() {
    var bodySlug = document.body && document.body.dataset.nvSlug;
    if (bodySlug) return String(bodySlug).trim();
    try {
      var q = new URLSearchParams(window.location.search).get("slug");
      if (q) return String(q).trim();
    } catch (e) { /* ignore */ }
    var parts = (window.location.pathname || "").replace(/\/+$/, "").split("/");
    var last = parts[parts.length - 1] || "";
    if (last && last !== "vocabulary-quiz.html" && last !== "vocabulary-quiz") {
      try {
        return decodeURIComponent(last);
      } catch (e2) {
        return last;
      }
    }
    return "vocabulary-quiz";
  }

  function ensureCommentsHost() {
    var host = document.getElementById("vq-comments");
    if (host) return host;
    var actions = document.getElementById("vq-actions") || document.querySelector(".vq-actions");
    host = document.createElement("div");
    host.id = "vq-comments";
    host.className = "vq-quiz-comments board-comments-root";
    host.setAttribute("data-board-comments-root", "");
    if (actions && actions.parentNode) {
      actions.parentNode.insertBefore(host, actions.nextSibling);
    } else {
      var track = document.getElementById("vq-track") || document.querySelector(".vq-track");
      if (track) track.appendChild(host);
    }
    return host;
  }

  function placeCommentButtonsInActions(host) {
    var actions = document.getElementById("vq-actions") || document.querySelector(".vq-actions");
    if (!actions || !host) return;
    var toggle = host.querySelector(".os-cmt-toggle");
    var write = host.querySelector(".os-cmt-write");
    if (toggle) {
      toggle.classList.add("vq-btn");
      actions.appendChild(toggle);
    }
    if (write) {
      write.classList.add("vq-btn");
      actions.appendChild(write);
    }
    var bar = host.querySelector(".os-cmt-bar");
    if (bar && !bar.children.length) bar.style.display = "none";
  }

  async function mountQuizComments() {
    var host = ensureCommentsHost();
    var base = assetBase();
    var ver = "20261109cmt1";
    try {
      await ensureStylesheet(base + "board-comments.css?v=" + ver);
      await loadScriptOnce(base + "board-comments.js?v=" + ver);
    } catch (e) {
      console.warn("[vocabulary-quiz-track] board-comments load failed", e);
      return;
    }
    if (!window.BoardComments || typeof window.BoardComments.mount !== "function") return;
    var titleEl = document.querySelector(".vq-title");
    var title = titleEl ? titleEl.textContent.trim() : "시사 어휘 퀴즈";
    try {
      await window.BoardComments.mount({
        board: "vocabulary-quiz",
        contentKey: quizContentKey(),
        title: title,
        root: host,
      });
      placeCommentButtonsInActions(host);
    } catch (err) {
      console.warn("[vocabulary-quiz-track] comments mount failed", err);
    }
  }

  function init(opts) {
    opts = opts || {};
    trackOptions = {
      comments: opts.comments !== false,
      hideModeTabs: !!opts.hideModeTabs,
      forceMode: String(opts.forceMode || opts.mode || "").trim(),
      skipDocumentTitle: !!opts.skipDocumentTitle,
    };
    if (Array.isArray(opts.words) && opts.words.length) {
      window.VOCAB_QUIZ_TRACK_WORDS = opts.words;
    }
    if (!getWords().length) {
      console.warn("[vocabulary-quiz-track] VOCAB_QUIZ_TRACK_WORDS is empty");
    }
    normalizePageTitles();
    applyModeChrome();
    bound = false;
    mcCache = null;
    bind();
    var startMode = trackOptions.forceMode || "en";
    if (startMode !== "en" && startMode !== "ko" && startMode !== "mc") startMode = "en";
    setMode(startMode);
    ensureGlobalMcPool();
    if (trackOptions.comments) mountQuizComments();
  }

  /**
   * 뉴스영어 등 페이지에 객관식 퀴즈 임베드.
   * opts: { root, words, title, mode='mc', comments=false, hideModeTabs=true }
   */
  function mount(opts) {
    opts = opts || {};
    var root = opts.root;
    if (!root) return Promise.reject(new Error("mount root required"));
    var words = Array.isArray(opts.words) ? opts.words : [];
    if (!words.length) return Promise.reject(new Error("mount words empty"));
    root.innerHTML = renderEmbedShell(opts.title || "이 글 복습 퀴즈");
    root.hidden = false;
    root.removeAttribute("hidden");
    init({
      words: words,
      forceMode: opts.mode || opts.forceMode || "mc",
      hideModeTabs: opts.hideModeTabs !== false,
      comments: opts.comments === true,
      skipDocumentTitle: true,
    });
    return ensureMcCache(false).then(function () {
      if (mode === "mc") render();
      return root;
    });
  }

  window.initVocabQuizTrack = init;
  window.mountVocabQuizTrack = mount;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else if ($("list")) {
    init();
  }
})();
