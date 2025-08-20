

///////////////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
    const inputMessage = document.getElementById('inputMessage');
    const chatMessages = document.getElementById('chatMessages');
    const submitButton = document.getElementById('submitButton');

    const initialMessages = [
        "Hi there!",
    ];

    // Display initial messages
    let messageIndex = 0;
    function displayNextInitialMessage() {
        if (messageIndex < initialMessages.length) {
            displayAiMessage(initialMessages[messageIndex]);
            messageIndex++;
            setTimeout(displayNextInitialMessage, 1000);
        }
    }
    displayNextInitialMessage();

    // Forbidden words check
    const forbiddenWords = [
        // 욕설
        'fuck', 'shit', 'bitch', 'ass', 'damn', 'hell', 'bastard', 'dickhead', 'motherfucker', 'fucker',
        '씨발', '개새끼', '병신', '미친', '좆', '빡대가리', '등신', '멍청이', '바보',
        
        // 성적 표현
        'sex', 'sexual', '자위', '섹스', '성교', '성행위', '포르노', 'porn', 'pornography', 
        'masturbation', 'masturbate', 'penis', 'vagina', 'dick', 'cock', 'pussy', 'boobs', 'tits', 
        'nude', 'naked', 'nude', 'naked', 'blowjob', 'handjob', 'fingering', 'oral', 'anal',
        '검열삭제', '야동', '야사', '에로', '음란', '음탕', '방탕', '음란물', '성인물',
        
        // 약물/담배/음주
        'drug', 'drugs', 'marijuana', 'cocaine', 'heroin', 'weed', 'pot', 'joint', 'bong', 'pipe',
        '담배', '흡연', '음주', '술', '맥주', '와인', '소주', '양주', '술고래', '알코올',
        'cigarette', 'smoke', 'smoking', 'alcohol', 'beer', 'wine', 'vodka', 'whiskey', 'rum',
        '대마', '마약', '코카인', '헤로인', '필로폰', '암페타민', '엑스터시', 'LSD',
        
        // 폭력/범죄
        'kill', 'murder', 'suicide', 'rape', 'rob', 'steal', 'bomb', 'terrorist', 'terrorism',
        '살인', '자살', '자해', '자해행위', '강간', '강도', '절도', '폭력', '폭행', '상해', '협박', '공갈',
        '테러', '폭탄', '총기', '칼', '흉기', '폭주족', '깡패', '조폭', '마피아',
        '왕따', '따돌림', '집단따돌림', '괴롭힘', '괴롭힘당하다', '괴롭힘피해자', '괴롭힘가해자',
        '사이버불링', '사이버괴롭힘', '온라인괴롭힘', '학교폭력', '학폭', '폭력피해', '폭력가해',
        '자살시도', '자살사고', '자살충동', '자살방법', '자살도구', '목매기', '교수형', '독약', '약물중독',
        'overdose', 'OD', 'cutting', 'self-harm', 'self-injury', 'suicidal', 'suicide attempt',
        
        // 차별/혐오
        'racist', 'racism', 'homophobic', 'transphobic', 'sexist', 'discrimination',
        '인종차별', '성차별', '동성애혐오', '성소수자혐오', '장애인차별', '나치', '히틀러',
        
        // 기타 부적절한 표현
        'hate', 'hate speech', 'bully', 'bullying', 'harassment', 'stalking',
        '혐오', '괴롭힘', '따돌림', '스토킹', '성희롱', '성추행'
    ];
    function containsForbiddenWords(text) {
        return forbiddenWords.some(word => {
            const lowerText = text.toLowerCase();
            const lowerWord = word.toLowerCase();
            
            // 한글 단어는 단어 경계 없이 검사
            if (/[가-힣]/.test(lowerWord)) {
                return lowerText.includes(lowerWord);
            } else {
                // 영문 단어는 단어 경계 확인
                const regex = new RegExp(`\\b${lowerWord}\\b`, 'i');
                return regex.test(lowerText);
            }
        });
    }

    // 오타 및 변형 단어 검사 함수
    function containsForbiddenVariations(text) {
        const variations = [
            // 욕설 변형
            { original: 'fuck', variations: ['f*ck', 'f**k', 'f***', 'fck', 'fk', 'fuk', 'fuxk', 'fukk'] },
            { original: 'shit', variations: ['sh*t', 'sh**', 'sht', 's**t', 'sh1t', 'sh!t'] },
            { original: 'bitch', variations: ['b*tch', 'b**ch', 'btch', 'b!tch', 'b1tch'] },
            { original: 'ass', variations: ['a**', 'a*s', 'a$$', 'a**hole', 'a**h0le'] },
            { original: 'damn', variations: ['d*mn', 'd**n', 'dmn', 'd!mn'] },
            { original: 'hell', variations: ['h*ll', 'h**l', 'hll', 'h3ll', 'h3l1'] },
            
            // 성적 표현 변형
            { original: 'sex', variations: ['s*x', 's3x', 's3xual', 's3xual', 's3xual'] },
            { original: 'porn', variations: ['p*rn', 'p0rn', 'pr0n', 'p0rn0', 'p0rn0graphy'] },
            { original: 'dick', variations: ['d*ck', 'd1ck', 'd!ck', 'dck', 'd1k'] },
            { original: 'cock', variations: ['c*ck', 'c0ck', 'c0k', 'c0ck'] },
            { original: 'pussy', variations: ['p*ssy', 'p0ssy', 'p0ss1', 'p0ssy'] },
            
            // 약물 변형
            { original: 'drug', variations: ['dr*g', 'dr0g', 'dr0gs', 'dr*gz'] },
            { original: 'weed', variations: ['w33d', 'w3ed', 'w33d', 'w33d'] },
            
            // 한글 변형
            { original: '씨발', variations: ['씨벌', '시발', '시벌', '씨바', '시바', '씨밸', '시밸'] },
            { original: '개새끼', variations: ['개새기', '개새키', '개새끼', '개새기'] },
            { original: '병신', variations: ['병싱', '병신', '병싱', '병신'] },
            { original: '섹스', variations: ['섹쓰', '섹쓰', '섹쓰', '섹쓰'] },
            { original: '자위', variations: ['자위', '자위', '자위', '자위'] },
            { original: '담배', variations: ['담배', '담배', '담배', '담배'] },
            { original: '술', variations: ['술', '술', '술', '술'] },
            { original: '자살', variations: ['자살', '자살', '자살', '자살'] },
            { original: '왕따', variations: ['왕따', '왕따', '왕따', '왕따'] }
        ];

        const lowerText = text.toLowerCase();
        
        return variations.some(item => {
            // 원본 단어 검사
            if (lowerText.includes(item.original.toLowerCase())) {
                return true;
            }
            // 변형 단어들 검사
            return item.variations.some(variation => 
                lowerText.includes(variation.toLowerCase())
            );
        });
    }

    // Auto-resize textarea
    function autoResize() {
        inputMessage.style.height = 'auto';
        inputMessage.style.height = Math.min(inputMessage.scrollHeight, 200) + 'px';
    }

    // Scroll to bottom function
    function scrollToBottom() {
        const messagesContainer = document.querySelector('.messages-container');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Display user message
    function displayMessage(content, isUser) {
        const messageElement = document.createElement('div');
        messageElement.className = isUser ? 'user-message' : 'ai-message';
        
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        messageElement.appendChild(contentElement);
        chatMessages.appendChild(messageElement);

        if (isUser) {
            contentElement.textContent = content;
        } else {
            // AI message typing effect
            let index = 0;
            const typingSpeed = 30;

            function typeNextChar() {
                if (index < content.length) {
                    contentElement.textContent += content[index];
                    index++;
                    scrollToBottom();
                    setTimeout(typeNextChar, typingSpeed);
                }
            }
            typeNextChar();
        }
        scrollToBottom();
    }

    // Display AI message with sentence-by-sentence typing
    function displayAiMessage(content) {
        const sentences = content.split(/(?<=[.?!])\s+/);
        let currentIndex = 0;
        let isTyping = false;

        function displayNextSentence() {
            if (currentIndex < sentences.length && !isTyping) {
                isTyping = true;
                const messageElement = document.createElement('div');
                messageElement.className = 'ai-message';
                
                const contentElement = document.createElement('div');
                contentElement.className = 'message-content';
                messageElement.appendChild(contentElement);
                chatMessages.appendChild(messageElement);

                let index = 0;
                const typingSpeed = 30;
                const currentSentence = sentences[currentIndex];

                function typeNextChar() {
                    if (index < currentSentence.length) {
                        contentElement.textContent += currentSentence[index];
                        index++;
                        scrollToBottom();
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

    // Display error message
    function displayErrorMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.className = 'error-message';
        const contentElement = document.createElement('div');
        contentElement.className = 'message-content';
        contentElement.textContent = message;
        messageElement.appendChild(contentElement);
        chatMessages.appendChild(messageElement);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.innerHTML = `
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        chatMessages.appendChild(typingElement);
        scrollToBottom();
        return typingElement;
    }

    // Hide typing indicator
    function hideTypingIndicator(typingElement) {
        if (typingElement && typingElement.parentNode) {
            typingElement.parentNode.removeChild(typingElement);
        }
    }

    // Send message function
    async function sendMessage(event) {
        if (event) event.preventDefault();
        const inputMessageValue = inputMessage.value.trim();

        if (inputMessageValue) {
            // Check for forbidden words and variations
            if (containsForbiddenWords(inputMessageValue) || containsForbiddenVariations(inputMessageValue)) {
                displayErrorMessage('Please avoid using inappropriate language.');
                return;
            }

            displayMessage(inputMessageValue, true);
            inputMessage.value = '';
            autoResize(); // Reset textarea height
            
            const typingIndicator = showTypingIndicator();

            try {
                const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/english-chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ inputMessage: inputMessageValue })
                });
                
                hideTypingIndicator(typingIndicator);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                displayAiMessage(data.response);
            } catch (error) {
                hideTypingIndicator(typingIndicator);
                console.error('Error sending message:', error);
                displayErrorMessage('Error: Unable to send message. Please try again.');
            }
        } else {
            console.warn("Empty message, not sending.");
        }
    }

    // Input field event listeners
    if (inputMessage) {
        // Auto-resize on input
        inputMessage.addEventListener('input', autoResize);
        
        // Enter key handling
        inputMessage.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                const message = this.value.trim();
                if (message) {
                    sendMessage();
                }
            }
        });

        // Focus and blur effects
        inputMessage.addEventListener('focus', function () {
            this.parentElement.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        });

        inputMessage.addEventListener('blur', function () {
            this.parentElement.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });

        // Auto-focus on page load
        setTimeout(() => {
            inputMessage.focus();
        }, 1000);
    } else {
        console.error('inputMessage element not found');
    }

    // Send button event listener
    if (submitButton) {
        submitButton.addEventListener('click', function () {
            const message = inputMessage.value.trim();
            if (message) {
                sendMessage();
                inputMessage.focus();
            }
        });
    } else {
        console.error('submitButton element not found');
    }

    // New chat button functionality
    const newChatBtn = document.querySelector('.new-chat-btn');
    if (newChatBtn) {
        newChatBtn.addEventListener('click', function () {
            // Clear chat messages
            chatMessages.innerHTML = '';
            
            // Reset to initial state
            messageIndex = 0;
            displayNextInitialMessage();
            
            // Clear input
            inputMessage.value = '';
            autoResize();
            inputMessage.focus();
        });
    }
});
