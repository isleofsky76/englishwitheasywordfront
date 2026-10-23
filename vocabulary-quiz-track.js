(function () {
  "use strict";

  var WORDS = Array.isArray(window.VOCAB_QUIZ_TRACK_WORDS)
    ? window.VOCAB_QUIZ_TRACK_WORDS
    : [];

  function $(id) {
    return document.getElementById(id);
  }

  var mode = "en"; // en: 영어 문제 → 한글 입력

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

  /** 여러 뜻 중 하나만 맞아도 true (입력에 여러 개를 적어도 그중 하나면 OK) */
  function matchesAny(userValue, answerList) {
    var answers = expandAnswers(answerList);
    if (!answers.length) return false;
    var parts = expandAnswers([userValue]);
    if (!parts.length) parts = [String(userValue || "").trim()].filter(Boolean);
    return parts.some(function (part) {
      var n = norm(part);
      return answers.some(function (a) {
        return norm(a) === n;
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

  function render() {
    var list = $("list");
    var tot = $("tot");
    if (!list) return;

    list.innerHTML = WORDS.map(function (w, i) {
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
        '" placeholder="' +
        escapeHtml(ph) +
        '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' +
        escapeHtml(q) +
        ' 정답">' +
        '<span class="vq-mark" aria-live="polite"></span>' +
        "</li>"
      );
    }).join("");

    if (tot) tot.textContent = String(WORDS.length);
    updateScore();
  }

  function answerListFor(i) {
    var raw = mode === "en" ? WORDS[i].ko : WORDS[i].en;
    return expandAnswers(raw);
  }

  function setAnswerLine(li, answers, ok) {
    var prev = li.querySelector(".vq-ans");
    if (prev) prev.remove();
    var d = document.createElement("span");
    d.className = "vq-ans" + (ok ? " is-ok" : "");
    d.textContent = (ok ? "인정 답: " : "정답: ") + answers.join(", ");
    li.appendChild(d);
  }

  function check(i, showAnswer) {
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
    WORDS.forEach(function (_, i) {
      check(i, true);
    });
  }

  function updateScore() {
    var n = document.querySelectorAll("#list li.ok").length;
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
    if (mEn) mEn.setAttribute("aria-pressed", m === "en" ? "true" : "false");
    if (mKo) mKo.setAttribute("aria-pressed", m === "ko" ? "true" : "false");
    render();
  }

  function bind() {
    var list = $("list");
    if (!list) return;

    list.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" || !e.target.dataset.i) return;
      var i = +e.target.dataset.i;
      check(i, false);
      var next = $("in" + (i + 1));
      if (next) next.focus();
    });

    list.addEventListener("input", function (e) {
      var li = e.target.closest("li");
      if (!li || !li.className) return;
      li.className = "";
      var mark = li.querySelector(".vq-mark");
      if (mark) mark.textContent = "";
      var ans = li.querySelector(".vq-ans");
      if (ans) ans.remove();
      updateScore();
    });

    var checkAll = $("checkAll");
    var reveal = $("reveal");
    var reset = $("reset");
    var mEn = $("m-en");
    var mKo = $("m-ko");

    if (checkAll) {
      checkAll.onclick = function () {
        WORDS.forEach(function (_, i) {
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
        render();
        var first = $("in0");
        if (first) first.focus();
      };
    }
    if (mEn) mEn.onclick = function () {
      setMode("en");
    };
    if (mKo) mKo.onclick = function () {
      setMode("ko");
    };
  }

  function init() {
    if (!WORDS.length) {
      console.warn("[vocabulary-quiz-track] VOCAB_QUIZ_TRACK_WORDS is empty");
    }
    bind();
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
