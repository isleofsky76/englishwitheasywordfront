document.getElementById('startButton').addEventListener('click', startQuiz);
document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
document.getElementById('showAnswer').addEventListener('click', showAnswer);
document.getElementById('nextQuiz').addEventListener('click', startQuiz);
document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

async function startQuiz() {
    try {
        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz', {  // 백엔드 서버 엔드포인트를 업데이트하십시오.
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);  // 디버그를 위해 추가
        const question = data.quiz;

        document.getElementById('quiz').style.display = 'block';
        document.getElementById('question').innerText = question;
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('result').innerText = ''; // Clear previous result
        document.getElementById('answerInput').value = ''; // Clear previous answer
    } catch (error) {
        console.error('Error starting quiz:', error);  // 에러를 캐치하기 위해 추가
        document.getElementById('result').innerText = `Error: ${error.message}`;
    }
}

async function submitAnswer() {
    try {
        const userAnswer = document.getElementById('answerInput').value;
        const question = document.getElementById('question').innerText;

        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz/check', {  // 백엔드 서버 엔드포인트를 업데이트하십시오.
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

        const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz/show', {
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

