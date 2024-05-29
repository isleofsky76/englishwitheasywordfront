// 페이지 로드 시 초기화 함수 호출
window.onload = function() {
    setDefaultExample(); // 페이지 로드 시 예시 화면으로 설정
};

// 예시 화면을 설정하는 함수
function setDefaultExample() {
    const exampleSentences = [
        "1.I got a ticket for BTS concert. <br>비티에스 콘서트 표 샀어요.<br>",
        "2.I need to get some groceries from the store. <br>저는 가게에서 식재료를 사와야 해요.<br>",
        "3.Excuse me, can I get a glass of water please? <br>실례지만 물 한 잔 주실 수 있을까요?<br>",
        "4.We should get going if we want to make it to the movie on time. <br>영화 시간에 맞춰 도착하려면 가는 게 좋겠어요.<br>",
        "5.I'll get the bill, don't worry about it. <br>계산은 저가 할게요, 신경 쓰지 마세요.<br>",
        "6.She got promoted at work for her hard work. <br>그녀는 열심히 일한 덕분에 직급이 올랐어.<br>",
        "7.You need to get a good night's sleep before your exam tomorrow. <br>내일 시험 치기 전에는 충분한 수면을 취해야 해.<br>",
        "8.I can't seem to get this math problem right, can you help me? <br>이 수학 문제를 제대로 못 푸겠어, 도와줄래?<br>",
        "9.What time do you usually get up in the morning?<br>보통 아침에 몇 시에 일어나?<br>",
        "10.Don't forget to get your jacket from the closet before we leave.<br>우리가 떠나기 전에 옷장에서 자켓을 꺼내는 걸 잊지 마세요.<br>",
    ];

    // 예시 문장을 출력 영역에 표시
    const outputArea = document.getElementById("outputArea");
    outputArea.innerHTML = exampleSentences.join("<br>");

    // 입력 필드 초기화
    document.getElementById("inputWord").value = "";
}

// Function to reset the advice display to its default content
function setDefaultAdvice() {
    const exampleSentence = [
        "Don't forget to get your jacket from the closet before we leave.<br>우리가 떠나기 전에 옷장에서 자켓을 꺼내는 걸 잊지 마세요.<br>"
    ];

    // Display the example sentence in the advice display area
    const adviceDisplay = document.getElementById("adviceDisplay");
    if (adviceDisplay) {
        adviceDisplay.innerHTML = exampleSentence.join("<br>");
    }

    // Clear the question input field if needed
    const questionInput = document.getElementById("questionInput");
    if (questionInput) {
        questionInput.value = "";
    }
}