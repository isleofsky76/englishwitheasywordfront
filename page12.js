document.addEventListener('DOMContentLoaded', function () {
    const inputMessage = document.getElementById('inputMessage');
    const chatMessages = document.getElementById('chatMessages');
    const submitButton = document.getElementById('submitButton');

    // 금지된 단어 리스트
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "fuck", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    // 금지된 단어 검사 함수
    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    // Function to display message
    function displayMessage(content, isUser) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'ai-message';
        messageElement.textContent = content;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to display AI message with delay between sentences
    function displayAiMessage(content) {
        const sentences = content.split(/(?<=[.?!])\s+/);
        let currentIndex = 0;

        function displayNextSentence() {
            if (currentIndex < sentences.length) {
                displayMessage('Tutor: ' + sentences[currentIndex], false);
                currentIndex++;
                setTimeout(displayNextSentence, 1000); // Adjust delay as needed (1000ms = 1 second)
            }
        }

        displayNextSentence();
    }

    async function sendMessage(event) {
        if (event) event.preventDefault(); // Prevent default form submission if event is passed
        
        const inputMessageValue = inputMessage.value.trim();

        if (inputMessageValue) {
            if (containsForbiddenWords(inputMessageValue)) {
                alert("The input contains forbidden words. Please remove them and try again (입력이 금지된 단어입니다. 다시 입력해주세요).");
                return;
            }

            displayMessage('I: ' + inputMessageValue, true);
            inputMessage.value = '';

            try {
                const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/english-chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ inputMessage: inputMessageValue })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                displayAiMessage(data.response);
            } catch (error) {
                console.error('Error sending message:', error);
                displayMessage('Error: Unable to send message.', false);
            }
        } else {
            console.warn("Empty message, not sending.");
        }
    }

    if (inputMessage) {
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
    } else {
        console.error('inputMessage element not found');
    }

    if (submitButton) {
        submitButton.addEventListener('click', function () {
            chatMessages.style.height = '50vh';
            sendMessage();
            inputMessage.focus();
        });
    } else {
        console.error('submitButton element not found');
    }
});

