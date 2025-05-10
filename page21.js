// const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-short-text', {

document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    const inputTopic = document.getElementById('inputTopic');
    const shortTextElement = document.getElementById('shortText');
    const generateTextButton = document.getElementById('generateTextButton');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const readButton = document.getElementById('readButton');
    const stopButton = document.getElementById('stopButton');
    let currentUtterance = null;
    let sentences = [];
    let currentSentenceIndex = 0;

    // Function to check for forbidden words
    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    // Function to toggle loading state
    function toggleLoading(isLoading) {
        generateTextButton.style.display = isLoading ? 'none' : 'flex';
        loadingSpinner.style.display = isLoading ? 'block' : 'none';
    }

    // Function to split text into sentences
    function splitIntoSentences(text) {
        // 문장 구분자: 마침표, 느낌표, 물음표 뒤에 공백이 오는 경우
        return text.match(/[^.!?]+[.!?]+/g) || [text];
    }

    // Function to highlight current sentence
    function highlightCurrentSentence() {
        // 모든 문장의 하이라이트 제거
        const allSentences = shortTextElement.getElementsByClassName('sentence');
        for (let sentence of allSentences) {
            sentence.classList.remove('highlight');
        }

        // 현재 문장 하이라이트
        if (allSentences[currentSentenceIndex]) {
            allSentences[currentSentenceIndex].classList.add('highlight');
            // 현재 문장이 보이도록 스크롤
            allSentences[currentSentenceIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Function to display text with sentence spans
    function displayTextWithSentences(text) {
        sentences = splitIntoSentences(text);
        shortTextElement.innerHTML = sentences
            .map(sentence => `<span class="sentence">${sentence.trim()}</span>`)
            .join(' ');
    }

    // Function to fetch and display short text
    async function generateShortText() {
        console.log("generateShortText called");
        const topic = inputTopic.value.trim();

        if (!topic) {
            alert("Please enter a topic.");
            return;
        }

        if (containsForbiddenWords(topic)) {
            alert("The input contains forbidden words. Please remove them and try again.");
            return;
        }

        toggleLoading(true);

        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-short-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log("Received data:", data);

            // JSON 응답에서 텍스트만 추출
            let text;
            if (typeof data === 'string') {
                text = data;
            } else if (data.text) {
                text = data.text;
            } else if (data.shortText) {
                text = data.shortText;
            } else if (data.content) {
                text = data.content;
            } else if (data.message) {
                text = data.message;
            } else {
                console.error("Unexpected response structure:", data);
                throw new Error('No text content found in server response');
            }

            // JSON 문자열인 경우 파싱 시도
            try {
                const parsedText = JSON.parse(text);
                if (typeof parsedText === 'string') {
                    text = parsedText;
                } else if (parsedText.text) {
                    text = parsedText.text;
                }
            } catch (e) {
                // JSON 파싱 실패 시 원본 텍스트 사용
                console.log("Text is not JSON, using as is");
            }
            
            if (text) {
                // 텍스트에서 JSON 형식 제거
                text = text.replace(/^[{\[]|[}\]]$/g, '').trim();
                displayTextWithSentences(text);
                document.querySelector('.text-container').style.display = 'block';
                document.querySelector('.action-buttons').style.display = 'flex';
            } else {
                throw new Error('Empty text content in server response');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error generating text. Please try again.');
        } finally {
            toggleLoading(false);
        }
    }

    // Function to read text aloud
    function readText() {
        const text = shortTextElement.textContent;
        if (!text) {
            alert('Please generate text first.');
            return;
        }

        if (currentUtterance) {
            speechSynthesis.cancel();
        }

        currentSentenceIndex = 0;
        highlightCurrentSentence();

        // 각 문장을 순차적으로 읽기
        function readNextSentence() {
            if (currentSentenceIndex >= sentences.length) {
                readButton.disabled = false;
                stopButton.disabled = true;
                return;
            }

            const sentence = sentences[currentSentenceIndex];
            currentUtterance = new SpeechSynthesisUtterance(sentence);
            currentUtterance.lang = 'en-US';

            currentUtterance.onstart = function() {
                console.log('Speech started');
                readButton.disabled = true;
                stopButton.disabled = false;
                highlightCurrentSentence();
            };

            currentUtterance.onend = function() {
                console.log('Speech ended');
                currentSentenceIndex++;
                if (currentSentenceIndex < sentences.length) {
                    readNextSentence();
                } else {
                    readButton.disabled = false;
                    stopButton.disabled = true;
                }
            };

            currentUtterance.onerror = function(event) {
                console.error('Speech error', event.error);
                readButton.disabled = false;
                stopButton.disabled = true;
            };

            speechSynthesis.speak(currentUtterance);
        }

        readNextSentence();
    }

    // Function to stop reading
    function stopReading() {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
            readButton.disabled = false;
            stopButton.disabled = true;
            // 하이라이트 제거
            const allSentences = shortTextElement.getElementsByClassName('sentence');
            for (let sentence of allSentences) {
                sentence.classList.remove('highlight');
            }
        }
    }

    // Event listeners
    generateTextButton.addEventListener('click', generateShortText);
    
    inputTopic.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateShortText();
        }
    });

    readButton.addEventListener('click', readText);
    stopButton.addEventListener('click', stopReading);

    // Copy button functionality
    document.getElementById('copyButton').addEventListener('click', async () => {
        const text = shortTextElement.textContent;
        if (!text) {
            alert('Please generate text first.');
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            alert('Text copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text. Please try again.');
        }
    });

    // Download button functionality
    document.getElementById('downloadButton').addEventListener('click', () => {
        const text = shortTextElement.textContent;
        const topic = inputTopic.value.trim();
        
        if (!text) {
            alert('Please generate text first.');
            return;
        }

        // 파일명 생성 (주제 + 타임스탬프)
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `${topic || 'text'}_${timestamp}.txt`;

        // 모바일 기기 감지
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (isMobile) {
            // 모바일에서는 새 창에서 텍스트를 열고 사용자가 직접 저장하도록 함
            const textWindow = window.open('', '_blank');
            textWindow.document.write(`
                <html>
                <head>
                    <title>${filename}</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                            white-space: pre-wrap;
                            word-wrap: break-word;
                        }
                        .instructions {
                            background-color: #f8f9fa;
                            padding: 10px;
                            margin-bottom: 20px;
                            border-radius: 5px;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <div class="instructions">
                        이 텍스트를 저장하려면:<br>
                        1. 텍스트를 길게 누르고<br>
                        2. "복사" 또는 "텍스트 저장"을 선택하세요
                    </div>
                    ${text}
                </body>
                </html>
            `);
            textWindow.document.close();
        } else {
            // 데스크톱에서는 기존 방식대로 다운로드
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        }
    });

    // 초기 상태 설정
    stopButton.disabled = true;
});


       
            
              
