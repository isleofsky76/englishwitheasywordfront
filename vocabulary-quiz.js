(function () {
  "use strict";

  function createElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function renderChoices(choices) {
    var list = createElement("ul", "quiz-choice-list");
    choices.forEach(function (choice) {
      list.appendChild(createElement("li", "quiz-choice", choice));
    });
    return list;
  }

  function renderQuiz(quiz, index) {
    var card = createElement("section", "vocabulary-quiz-card");
    card.id = "quiz-" + (index + 1);

    card.appendChild(
      createElement("h3", "quiz-question", (index + 1) + ". " + quiz.question)
    );
    card.appendChild(renderChoices(quiz.choices || []));

    var details = createElement("details", "quiz-answer-details");
    details.appendChild(
      createElement("summary", "quiz-answer-toggle", "정답과 설명 펼치기")
    );

    var answer = createElement("div", "quiz-answer-content");
    answer.appendChild(createElement("p", "quiz-answer", "정답: " + quiz.answer));
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
    article.id = entry.id;
    article.appendChild(createElement("h2", "quiz-entry-title", entry.title));
    article.appendChild(createElement("p", "quiz-entry-date", entry.date));

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

  function renderTableOfContents(entries) {
    var list = document.getElementById("quiz-toc-list");
    if (!list) return;
    entries.forEach(function (entry, index) {
      var item = document.createElement("li");
      var link = createElement("a", "", (index + 1) + ". " + entry.title);
      link.href = "#" + entry.id;
      item.appendChild(link);
      list.appendChild(item);
    });
  }

  function init() {
    var entries = Array.isArray(window.VOCABULARY_QUIZ_ENTRIES)
      ? window.VOCABULARY_QUIZ_ENTRIES
      : [];
    var container = document.getElementById("vocabulary-quiz-entries");
    if (!container) return;

    renderTableOfContents(entries);
    if (!entries.length) {
      container.appendChild(createElement("p", "quiz-empty", "등록된 퀴즈가 없습니다."));
      return;
    }
    entries.forEach(function (entry) {
      container.appendChild(renderEntry(entry));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
