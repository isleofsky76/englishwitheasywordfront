// 금지된 단어 리스트
const forbiddenWords = [
    "sex", "sexual", "rape", "molest", "violence", "murder", "fuck", "gore", "drugs", "narcotics", 
    "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
    "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
    "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
];

// 금지된 단어 검사 함수
function containsForbiddenWords(text) {
    const lowerText = text.toLowerCase(); // 대소문자 구분 없이 검사
    return forbiddenWords.some(word => lowerText.includes(word));
}

// 영어채팅하기====================================================
let chatHistory = [];  // Array to store chat messages

// Function to display message
function displayMessage(content, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'ai-message';
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (!isUser) {
        const sentences = content.split(/(?<=[.?!])\s+/); // Split by sentence
        sentences.forEach((sentence, index) => {
            setTimeout(() => {
                const sentenceElement = document.createElement('div');
                sentenceElement.textContent = sentence.trim();
                messageElement.appendChild(sentenceElement);

                // Add space between sentences
                const spacerElement = document.createElement('div');
                spacerElement.innerHTML = '&nbsp;'; // Non-breaking space for spacing
                messageElement.appendChild(spacerElement);

                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, index * 10000); // Adjust delay as needed (2000ms = 2 seconds per sentence)
        });
    } else {
        messageElement.textContent = content;
    }

    // Save messages in chat history without altering
    chatHistory.push({ sender: isUser ? 'User' : 'AI', message: content });
}

async function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value.trim();

    if (inputMessage) {
        if (containsForbiddenWords(inputMessage)) {
            alert("The input contains forbidden words. Please remove them and try again (입력이 금지된 단어입니다. 다시 입력해주세요).");
            return;
        }
    
        displayMessage('I: ' + inputMessage, true);
        document.getElementById('inputMessage').value = '';

        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/english-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputMessage: inputMessage })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            displayMessage('Tutor: ' + data.response, false);
        } catch (error) {
            console.error('Error sending message:', error);
            displayMessage('Error: Unable to send message.', false);
        }
    } else {
        console.warn("Empty message, not sending.");
    }
}

const typingSpeed = 500; // Adjust typing speed (milliseconds per character) for a more human-like typing speed

function simulateTyping(message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'ai-message';
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    let index = 0;

    function typeCharacter() {
        if (index < message.length) {
            messageElement.textContent += message[index];
            index++;
            setTimeout(typeCharacter, typingSpeed);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    typeCharacter();
}

function downloadChatHistory() {
    if (chatHistory.length === 0) {
        alert("No chat history to download.");
        return;
    }

    let dataString = "English Chatting History\n\n";

    chatHistory.forEach((item) => {
        dataString += `${item.message}\n`;
    });

    const blob = new Blob([dataString], { type: 'text/plain' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'english_chat_history.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function clearAllMessages() {
    chatHistory = [];
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    console.log('All messages have been deleted.');
}

//sepaktext
function speakText2() {
    let Voices = speechSynthesis.getVoices();

    // 음성 로딩을 확인하고 로딩되지 않았다면 대기
    if (Voices.length === 0) {
        speechSynthesis.onvoiceschanged = function() {
            Voices = speechSynthesis.getVoices();
            processMessages(Voices);
        };
    } else {
        processMessages(Voices);
    }
}

function processMessages(voices) {
    const chatMessages = document.getElementById('chatMessages').children;
    console.log(chatMessages);  // Check what's being selected

    Array.from(chatMessages).forEach((chatMessage) => {
        const messageText = chatMessage.textContent.trim(); // 텍스트 내 공백 제거
        
        if (messageText) { // 텍스트가 비어 있지 않은 경우에만 처리
            const englishText = extractEnglishText(messageText);

            if (englishText) { // 영어 텍스트가 비어 있지 않은 경우에만 처리
                const utterance = new SpeechSynthesisUtterance(englishText);
                const voice = voices.find(voice => voice.lang === 'en-GB') || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
                utterance.voice = voice;
                utterance.rate = 1;
                utterance.pitch = 1;

                utterance.onend = function(event) {
                    console.log('Speech complete');
                };

                utterance.onerror = function(event) {
                    console.error('SpeechSynthesisUtterance.onerror', event.error);
                };

                speechSynthesis.speak(utterance);
            }
        }
    });
}

// Text-to-Speech functions
function extractEnglishText(text) {
    // Match English sentences including numbers and specified punctuation
    const englishTextParts = text.match(/[a-zA-Z0-9\s,.'?!]+/g);
    if (!englishTextParts) return ''; 

     // 문자열을 결합하고 "I", "tutor", ".", "?"을 제거 
     const cleanedText = englishTextParts.join(' ')
     .replace(/\b(I|tutor)\b/gi, '') // "I"와 "tutor" 제거
     .replace(/[.?]/g, '')           // "."와 "?" 제거
     .replace(/\s{2,}/g, ' ')        // 여러 개의 공백을 단일 공백으로 대체
     .trim();                        // 앞뒤 공백 제거
 
    return cleanedText;
}

function stopSpeech() {
    speechSynthesis.cancel(); // Cancel the speech synthesis
}




// Adjust the chatMessages container height on focus and blur events
const inputMessage = document.getElementById('inputMessage');
const chatMessages = document.getElementById('chatMessages');

inputMessage.addEventListener('focus', function () {
    chatMessages.style.height = '50vh';
});

inputMessage.addEventListener('blur', function () {
    chatMessages.style.height = 'calc(100vh - 150px)';
});

inputMessage.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action
        chatMessages.style.height = '50vh';
        sendMessage(); // Call the send message function
        inputMessage.focus(); // Keep the input focused
    }
});

document.getElementById('submitButton').addEventListener('click', function () {
    chatMessages.style.height = '50vh';
    sendMessage();
    inputMessage.focus(); // Keep the input focused
});

function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value.trim();
    if (inputMessage) {
        displayMessage('I: ' + inputMessage, true);
        document.getElementById('inputMessage').value = '';
        // Simulate response for demonstration purposes
        setTimeout(() => {
            displayMessage('Tutor: Hello! How can I help you today?', false);
        }, 1000);
    }
}

function displayMessage(content, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'ai-message';
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

