(function () {
  "use strict";

  var urlParams = new URLSearchParams(window.location.search);
  var apiMode = urlParams.get("api");
  var API_BASE_URL =
    typeof getPage30ApiBaseUrl === "function"
      ? getPage30ApiBaseUrl()
      : window.PAGE30_PRODUCTION_API_BASE ||
        "https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app";

  async function loadMessages() {
    var list = document.getElementById("guestbook-list");
    if (!list) return;

    list.innerHTML = '<p class="text-muted p-3">목록을 불러오는 중...</p>';

    try {
      var response = await fetch(API_BASE_URL + "/vocabulary-quiz", { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      var data = await response.json();
      var messages = Array.isArray(data)
        ? { entries: data }
        : { entries: data.entries || [] };
      renderGuestbookTable(list, messages, {
        postPage: "vocabulary-quiz.html",
        apiMode: apiMode,
        board: "vocabulary-quiz",
        apiBaseUrl: API_BASE_URL,
        hideViewsAndLikes: true
      });
    } catch (error) {
      console.error("[vocabulary-quiz-list]", error);
      list.innerHTML =
        '<p class="text-danger p-3">게시글을 불러올 수 없습니다. 잠시 후 다시 시도해 주세요.</p>';
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadMessages);
  } else {
    loadMessages();
  }
})();
