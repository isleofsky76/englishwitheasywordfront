document.addEventListener('DOMContentLoaded', function() {
    // 서버 URL 설정
    cconst SERVER_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';  // 백엔드 서버 주소로 변경
    
    document.getElementById('startButton').addEventListener('click', startQuiz);
    document.getElementById('showAnswer').addEventListener('click', showAnswer);
    document.getElementById('nextQuiz').addEventListener('click', startQuiz);
    document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

    async function startQuiz() {
        try {
            console.log('Starting quiz...');
    
            const response = await fetch(`${SERVER_URL}/quiz`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Received quiz data:', data);
            const question = data.quiz;
    
            document.getElementById('quiz').style.display = 'block';
            document.getElementById('question').innerText = question;
            document.getElementById('startButton').style.display = 'none';
            document.getElementById('result').innerText = '';
        } catch (error) {
            console.error('Error starting quiz:', error);
            document.getElementById('result').innerHTML = `
                <div class="quiz-result">
                    <div class="result-section">
                        <p class="error-message">⚠️ 오류가 발생했습니다. Next Quiz 버튼을 눌러주세요.</p>
                    </div>
                </div>
            `;
        }
    }

    async function showAnswer() {
        try {
            const question = document.getElementById('question').innerText;
            console.log('Showing answer for question:', question);

            const response = await fetch(`${SERVER_URL}/quiz/show`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ question: question })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Received answer:', data);
            const correctAnswer = data.answer;

            document.getElementById('result').innerHTML = `
                <div class="quiz-result">
                    <div class="result-section">
                        <p class="answer">${correctAnswer}</p>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error showing answer:', error);
            document.getElementById('result').innerHTML = `
                <div class="quiz-result">
                    <div class="result-section">
                        <p class="error-message">⚠️ 오류가 발생했습니다. Next Quiz 버튼을 눌러주세요.</p>
                    </div>
                </div>
            `;
        }
    }
});

// // 자동 실행: 페이지가 로드되면 퀴즈 시작
// window.onload = function () {
//     startQuiz(); // 자동 퀴즈 시작
// };
