
document.addEventListener('DOMContentLoaded', function() {
    const jobs = [];
    const jobList = document.getElementById('jobList');
    const synonymsDiv = document.getElementById('synonymsContent');
    const jobInput = document.getElementById('jobInput');
    const submitButton = document.getElementById('submitButton');
    const inputMessage = document.getElementById('inputMessage');
    const chatButton = document.getElementById('chatButton');
    const chatMessages = document.getElementById('chatMessages');
    const spinner = document.getElementById('spinner');

    // 초기 메시지 표시
    const initialMessages = [
        "Hi there! 👋",
        "Please feel free to ask questions"
    ];

    let currentMessageIndex = 0;
    let isTyping = false;

    function displayNextInitialMessage() {
        if (currentMessageIndex < initialMessages.length && !isTyping) {
            isTyping = true;
            const messageElement = document.createElement('div');
            messageElement.className = 'ai-message';
            chatMessages.appendChild(messageElement);

            let index = 0;
            const typingSpeed = 30;
            const currentMessage = 'Tutor: ' + initialMessages[currentMessageIndex];

            function typeNextChar() {
                if (index < currentMessage.length) {
                    messageElement.textContent += currentMessage[index];
                    index++;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    setTimeout(typeNextChar, typingSpeed);
                } else {
                    isTyping = false;
                    currentMessageIndex++;
                    setTimeout(displayNextInitialMessage, 1000);
                }
            }

            typeNextChar();
        }
    }

    // 초기 메시지 표시 시작
    displayNextInitialMessage();

    // Function to display message
    function displayMessage(content, isUser) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'ai-message';
        chatMessages.appendChild(messageElement);

        if (isUser) {
            messageElement.textContent = content;
        } else {
            let index = 0;
            const typingSpeed = 30;

            function typeNextChar() {
                if (index < content.length) {
                    messageElement.textContent += content[index];
                    index++;
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                    setTimeout(typeNextChar, typingSpeed);
                }
            }

            typeNextChar();
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to display AI message with delay between sentences
    function displayAiMessage(content) {
        const sentences = content.split(/(?<=[.?!])\s+/);
        let currentIndex = 0;
        let isTyping = false;

        function displayNextSentence() {
            if (currentIndex < sentences.length && !isTyping) {
                isTyping = true;
                const messageElement = document.createElement('div');
                messageElement.className = 'ai-message';
                chatMessages.appendChild(messageElement);

                let index = 0;
                const typingSpeed = 30;
                const currentSentence = 'Tutor: ' + sentences[currentIndex];

                function typeNextChar() {
                    if (index < currentSentence.length) {
                        messageElement.textContent += currentSentence[index];
                        index++;
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                        setTimeout(typeNextChar, typingSpeed);
                    } else {
                        isTyping = false;
                        currentIndex++;
                        setTimeout(displayNextSentence, 1000);
                    }
                }

                typeNextChar();
            }
        }

        displayNextSentence();
    }

    // Synonyms functionality
    jobs.forEach(job => {
        const button = document.createElement('button');
        button.textContent = job;
        button.classList.add('btn', 'btn-outline-primary');
        button.addEventListener('click', () => {
            jobInput.value = job;
            fetchSynonyms(job);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        jobList.appendChild(button);
    });

    submitButton.addEventListener('click', () => {
        const job = jobInput.value.trim();
        if (job) {
            fetchSynonyms(job);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    async function fetchSynonyms(word) {
        try {
            spinner.style.display = 'block';
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-synonyms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word })
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log('Synonyms received:', data);
            synonymsDiv.innerHTML = formatSynonyms(data.synonyms);
            synonymsDiv.scrollTop = 0;
        } catch (error) {
            console.error('Error fetching synonyms:', error);
            synonymsDiv.textContent = `Error: ${error.message}`;
        } finally {
            spinner.style.display = 'none';
        }
    }

    // Chat functionality
    async function sendMessage(event) {
        if (event) event.preventDefault();
        
        const inputMessageValue = inputMessage.value.trim();

        if (inputMessageValue) {
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
        }
    }

    // Event listeners for chat
    if (inputMessage) {
        inputMessage.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    if (chatButton) {
        chatButton.addEventListener('click', sendMessage);
    }

    function formatSynonyms(synonyms) {
        if (!synonyms) return '';
        return synonyms.replace(/(\d+\.)/g, '<br><br>$1');
    }
});



            
