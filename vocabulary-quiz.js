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

  function renderQuiz(quiz, index) {
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
    answer.appendChild(createElement("p", "quiz-example-en", quiz.en));
    answer.appendChild(createElement("p", "quiz-example-ko", quiz.ko));
    details.appendChild(answer);
    card.appendChild(details);
    return card;
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

  async function fetchEntry() {
    var params = new URLSearchParams(window.location.search);
    var slug = (params.get("slug") || "").trim();
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
    if (!params.get("slug") && params.get("index") === null) {
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

      if (entry.title) document.title = entry.title + " | English Easy Study";
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
