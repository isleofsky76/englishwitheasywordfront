///////'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app


document.addEventListener('DOMContentLoaded', function() {
    // 서버 URL 설정
    const SERVER_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';  // 백엔드 서버 주소로 변경
    
    document.getElementById('startButton').addEventListener('click', startQuiz);
    document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
    document.getElementById('showAnswer').addEventListener('click', showAnswer);
    document.getElementById('nextQuiz').addEventListener('click', startQuiz);
    document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

    async function startQuiz() {
        try {
            document.getElementById('submitAnswer').disabled = true;
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
            document.getElementById('answerInput').value = '';
    
            document.getElementById('submitAnswer').disabled = false;
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

    async function submitAnswer() {
        try {
            const userAnswer = document.getElementById('answerInput').value;
            const question = document.getElementById('question').innerText;
            console.log('Submitting answer:', { question, answer: userAnswer });

            const response = await fetch(`${SERVER_URL}/quiz/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
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
            console.log('Received answer check:', data);
            
            // 응답 문자열 파싱
            const resultText = data.result;
            const resultLines = resultText.split('\n');
            
            const resultData = {
                possibleAnswers: [],
                studentAnswer: '',
                feedback: '',
                translation: ''
            };

            let currentSection = '';
            let feedbackLines = [];

            resultLines.forEach(line => {
                if (line.startsWith('Possible Answers:')) {
                    currentSection = 'possibleAnswers';
                } else if (line.startsWith('Student\'s Answer:')) {
                    currentSection = 'studentAnswer';
                    resultData.studentAnswer = line.replace('Student\'s Answer:', '').trim();
                } else if (line.startsWith('Feedback:')) {
                    currentSection = 'feedback';
                } else if (line.startsWith('Translation:')) {
                    currentSection = 'translation';
                    resultData.translation = line.replace('Translation:', '').trim();
                } else if (line.trim() && currentSection === 'possibleAnswers') {
                    resultData.possibleAnswers.push(line.trim());
                } else if (line.trim() && currentSection === 'feedback') {
                    feedbackLines.push(line.trim());
                }
            });

            resultData.feedback = feedbackLines.join('\n');

            // 결과를 HTML로 구조화
            const resultHtml = `
                <div class="quiz-result">
                    <div class="result-section">
                        <h3>Best Answer</h3>
                        <ul class="possible-answers">
                            ${resultData.possibleAnswers.map(answer => {
                                // [BEST]가 포함된 답변만 표시
                                if (answer.includes('[BEST]')) {
                                    const cleanAnswer = answer.replace('[BEST]', '').trim();
                                    return `<li class="best-answer">${cleanAnswer}</li>`;
                                }
                                return '';
                            }).join('')}
                        </ul>
                    </div>
                    <div class="result-section">
                        <h3>Translation</h3>
                        <p class="translation">${resultData.translation}</p>
                    </div>
                </div>
            `;

            document.getElementById('result').innerHTML = resultHtml;
        } catch (error) {
            console.error('Error submitting answer:', error);
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
                        <h3>Correct Answer</h3>
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





///////이전코드 2025 05 19 코드//////////
// document.getElementById('startButton').addEventListener('click', startQuiz);
//         document.getElementById('submitAnswer').addEventListener('click', submitAnswer);
//         document.getElementById('showAnswer').addEventListener('click', showAnswer);
//         document.getElementById('nextQuiz').addEventListener('click', startQuiz);
//         document.getElementById('refreshQuiz').addEventListener('click', () => location.reload());

//         async function startQuiz() {
//             try {
//                 document.getElementById('submitAnswer').disabled = true; // 초기 비활성화
        
//                 const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' }
//                 });
        
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
        
//                 const data = await response.json();
//                 const question = data.quiz;
        
//                 document.getElementById('quiz').style.display = 'block';
//                 document.getElementById('question').innerText = question;
//                 document.getElementById('startButton').style.display = 'none';
//                 document.getElementById('result').innerText = '';
//                 document.getElementById('answerInput').value = '';
        
//                 document.getElementById('submitAnswer').disabled = false; // 퀴즈 로딩 완료 후 다시 활성화
//             } catch (error) {
//                 console.error('Error starting quiz:', error);
//                 document.getElementById('result').innerText = `Error: ${error.message}`;
//             }
//         }
        

//         async function submitAnswer() {
//             try {
//                 const userAnswer = document.getElementById('answerInput').value;
//                 const question = document.getElementById('question').innerText;



//                 const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz/check', {  // 백엔드 서버 엔드포인트를 업데이트하십시오.
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         question: question,
//                         answer: userAnswer
//                     })
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log(data);  // 디버그를 위해 추가
//                 const result = data.result;

//                 // Display the result directly
//                 document.getElementById('result').innerText = result;
//             } catch (error) {
//                 console.error('Error submitting answer:', error);  // 에러를 캐치하기 위해 추가
//                 document.getElementById('result').innerText = `Error: ${error.message}`;
//             }
//         }

//         async function showAnswer() {
//             try {
//                 const question = document.getElementById('question').innerText;

//                 const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/quiz/show', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ question: question })
//                 });

//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }

//                 const data = await response.json();
//                 console.log(data);
//                 const correctAnswer = data.answer;

//                 document.getElementById('result').innerText = `${correctAnswer}`;
//             } catch (error) {
//                 console.error('Error showing answer:', error);
//                 document.getElementById('result').innerText = `Error: ${error.message}`;
//             }
//         }

// // 자동 실행: 페이지가 로드되면 퀴즈 시작
// window.onload = function () {
//     startQuiz(); // 자동 퀴즈 시작
// };
