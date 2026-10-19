(function () {
  "use strict";

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

  function renderChoices(choices) {
    var list = createElement("ul", "quiz-choice-list");
    (choices || []).forEach(function (choice) {
      list.appendChild(createElement("li", "quiz-choice", choice));
    });
    return list;
  }

  function renderRevealRow(item) {
    var row = createElement("div", "quiz-reveal-row");
    var prompt = createElement("span", "quiz-reveal-prompt", item.show || "");
    var answer = createElement("button", "quiz-reveal-answer");
    answer.type = "button";
    answer.setAttribute("aria-expanded", "false");
    answer.setAttribute("aria-label", "정답 보기");
    answer.dataset.answer = item.hide || "";
    answer.innerHTML =
      '<span class="quiz-reveal-mask" aria-hidden="true">????</span>' +
      '<span class="quiz-reveal-text" hidden></span>' +
      '<span class="quiz-reveal-hint">클릭해서 확인</span>';

    answer.addEventListener("click", function () {
      var open = answer.classList.toggle("is-open");
      var mask = answer.querySelector(".quiz-reveal-mask");
      var text = answer.querySelector(".quiz-reveal-text");
      var hint = answer.querySelector(".quiz-reveal-hint");
      if (open) {
        if (mask) mask.hidden = true;
        if (text) {
          text.hidden = false;
          text.textContent = answer.dataset.answer || "";
        }
        if (hint) hint.hidden = true;
        answer.setAttribute("aria-expanded", "true");
        answer.setAttribute("aria-label", "정답 숨기기");
      } else {
        if (mask) mask.hidden = false;
        if (text) {
          text.hidden = true;
          text.textContent = "";
        }
        if (hint) hint.hidden = false;
        answer.setAttribute("aria-expanded", "false");
        answer.setAttribute("aria-label", "정답 보기");
      }
    });

    row.appendChild(prompt);
    row.appendChild(createElement("span", "quiz-reveal-colon", ":"));
    row.appendChild(answer);
    return row;
  }

  function renderRevealSection(section) {
    var card = createElement("section", "vocabulary-quiz-card quiz-reveal-card");
    card.appendChild(
      createElement("h3", "quiz-question", section.title || "클릭해서 정답 확인")
    );
    var list = createElement("div", "quiz-reveal-list");
    (section.items || []).forEach(function (item) {
      if (!item || (!item.show && !item.hide)) return;
      list.appendChild(renderRevealRow(item));
    });
    card.appendChild(list);
    return card;
  }

  function renderQuiz(quiz, index) {
    if (quiz && quiz.type === "reveal-section") {
      return renderRevealSection(quiz);
    }

    var card = createElement("section", "vocabulary-quiz-card");
    card.id = "quiz-" + (index + 1);

    card.appendChild(
      createElement("h3", "quiz-question", index + 1 + ". " + quiz.question)
    );
    card.appendChild(renderChoices(quiz.choices));

    var details = createElement("details", "quiz-answer-details");
    details.appendChild(
      createElement("summary", "quiz-answer-toggle", "정답과 설명 펼치기")
    );

    var answer = createElement("div", "quiz-answer-content");
    answer.appendChild(createElement("p", "quiz-answer-label", "정답 :"));
    answer.appendChild(
      createElement(
        "p",
        "quiz-word-meaning",
        (quiz.icon ? quiz.icon + " " : "") + quiz.answer + " | " + quiz.meaning
      )
    );
    if (quiz.en) answer.appendChild(createElement("p", "quiz-example-en", quiz.en));
    if (quiz.ko) answer.appendChild(createElement("p", "quiz-example-ko", quiz.ko));
    details.appendChild(answer);
    card.appendChild(details);
    return card;
  }

  function renderYoutubeButton(url, label) {
    var wrap = createElement("p", "quiz-youtube");
    var link = createElement("a", "quiz-youtube-btn", label || "유튜브 보기");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.innerHTML =
      '<svg class="quiz-youtube-icon" viewBox="0 0 28 20" aria-hidden="true" focusable="false">' +
      '<path fill="#FF0000" d="M27.33 3.12A3.5 3.5 0 0 0 24.86.65C22.7 0 14 0 14 0S5.3 0 3.14.65A3.5 3.5 0 0 0 .67 3.12 36.7 36.7 0 0 0 0 10a36.7 36.7 0 0 0 .67 6.88 3.5 3.5 0 0 0 2.47 2.47C5.3 20 14 20 14 20s8.7 0 10.86-.65a3.5 3.5 0 0 0 2.47-2.47A36.7 36.7 0 0 0 28 10a36.7 36.7 0 0 0-.67-6.88z"/>' +
      '<path fill="#fff" d="M11.2 14.3V5.7L18.5 10l-7.3 4.3z"/>' +
      "</svg>" +
      "<span>" +
      (label || "유튜브 보기") +
      "</span>";
    wrap.appendChild(link);
    return wrap;
  }

  function renderEntry(entry) {
    var article = createElement("article", "quiz-entry");
    article.id = entry.slug || entry._id || "quiz-entry";
    article.appendChild(createElement("h1", "quiz-entry-title", entry.title));

    var date = entry.date ? new Date(entry.date) : null;
    if (date && !isNaN(date.getTime())) {
      article.appendChild(
        createElement("p", "quiz-entry-date", date.toLocaleDateString("ko-KR"))
      );
    }

    if (entry.sourceUrl) {
      article.appendChild(
        renderYoutubeButton(entry.sourceUrl, entry.sourceLabel || "유튜브 보기")
      );
    }

    (entry.quizzes || []).forEach(function (quiz, index) {
      article.appendChild(renderQuiz(quiz, index));
    });

    if (entry.sourceUrl) {
      var source = createElement("p", "quiz-source");
      source.appendChild(document.createTextNode("출처: "));
      var link = createElement("a", "", entry.sourceLabel || "YouTube");
      link.href = entry.sourceUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      source.appendChild(link);
      article.appendChild(source);
    }
    return article;
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
    var container = document.getElementById("vocabulary-quiz-entries");
    if (!container) return;

    var params = new URLSearchParams(window.location.search);
    if (!resolveSlug() && params.get("index") === null) {
      window.location.replace("vocabulary-quiz-list.html");
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
        backLink.href = "vocabulary-quiz-list.html";
        back.appendChild(backLink);
        container.appendChild(back);
        return;
      }

      if (entry.title) document.title = entry.title + " | 시사영단어";
      container.appendChild(renderEntry(entry));
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
