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

//영어채팅하기====================================================
let chatHistory = [];  // Array to store chat messages

// Function to display message
function displayMessage(content, isUser) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = isUser ? 'user-message' : 'ai-message';
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;

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

document.addEventListener('DOMContentLoaded', function () {
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
            event.preventDefault(); 
            chatMessages.style.height = '50vh'; 
            sendMessage(); 
            inputMessage.focus(); 
        }
    });

    document.getElementById('submitButton').addEventListener('click', function () {
        chatMessages.style.height = '50vh'; 
        sendMessage();
        inputMessage.focus(); 
    });
});

