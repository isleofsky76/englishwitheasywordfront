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
            const response = await fetch('http://localhost:3000/generate-short-text', {
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

            const text = data.text || data.shortText || data.content || data.message;
            
            if (text) {
                shortTextElement.textContent = text;
                document.querySelector('.text-container').style.display = 'block';
                document.querySelector('.action-buttons').style.display = 'flex';
            } else {
                console.error("Unexpected response structure:", data);
                throw new Error('No text content found in server response');
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

        currentUtterance = new SpeechSynthesisUtterance(text);
        currentUtterance.lang = 'en-US';

        currentUtterance.onstart = function() {
            console.log('Speech started');
            readButton.disabled = true;
            stopButton.disabled = false;
        };

        currentUtterance.onend = function() {
            console.log('Speech ended');
            readButton.disabled = false;
            stopButton.disabled = true;
        };

        currentUtterance.onerror = function(event) {
            console.error('Speech error', event.error);
            readButton.disabled = false;
            stopButton.disabled = true;
        };

        speechSynthesis.speak(currentUtterance);
    }

    // Function to stop reading
    function stopReading() {
        if (currentUtterance) {
            speechSynthesis.cancel();
            currentUtterance = null;
            readButton.disabled = false;
            stopButton.disabled = true;
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

