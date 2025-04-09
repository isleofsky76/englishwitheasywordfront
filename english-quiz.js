document.getElementById('startButton').addEventListener('click', startQuiz);
        document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
        document.getElementById('showAnswer').addEventListener('click', showAnswer);
        document.getElementById('nextQuiz').addEventListener('click', startQuiz);
        document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

        async function startQuiz() {
            try {
                document.getElementById('submitAnswer').disabled = true; // 초기 비활성화
        
                const response = await fetch('http://localhost:3000/quiz', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
        
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
        
                const data = await response.json();
                const question = data.quiz;
        
                document.getElementById('quiz').style.display = 'block';
                document.getElementById('question').innerText = question;
                document.getElementById('startButton').style.display = 'none';
                document.getElementById('result').innerText = '';
                document.getElementById('answerInput').value = '';
        
                document.getElementById('submitAnswer').disabled = false; // 퀴즈 로딩 완료 후 다시 활성화
            } catch (error) {
                console.error('Error starting quiz:', error);
                document.getElementById('result').innerText = `Error: ${error.message}`;
            }
        }
        

        async function submitAnswer() {
            try {
                const userAnswer = document.getElementById('answerInput').value;
                const question = document.getElementById('question').innerText;



                const response = await fetch('http://localhost:3000/quiz/check', {  // 백엔드 서버 엔드포인트를 업데이트하십시오.
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: question,
                        answer: userAnswer
                    })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);  // 디버그를 위해 추가
                const result = data.result;

                // Display the result directly
                document.getElementById('result').innerText = result;
            } catch (error) {
                console.error('Error submitting answer:', error);  // 에러를 캐치하기 위해 추가
                document.getElementById('result').innerText = `Error: ${error.message}`;
            }
        }

        async function showAnswer() {
            try {
                const question = document.getElementById('question').innerText;

                const response = await fetch('http://localhost:3000/quiz/show', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question: question })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
                const correctAnswer = data.answer;

                document.getElementById('result').innerText = `${correctAnswer}`;
            } catch (error) {
                console.error('Error showing answer:', error);
                document.getElementById('result').innerText = `Error: ${error.message}`;
            }
        }

// 자동 실행: 페이지가 로드되면 퀴즈 시작
window.onload = function () {
    startQuiz(); // 자동 퀴즈 시작
};
