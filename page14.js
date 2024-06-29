let recognition;

document.getElementById('startRecognition').onclick = function() {
    const selectedLanguage = document.getElementById('languageSelect').value;

    // Check if the browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Your browser does not support speech recognition. Please use Google Chrome or another supported browser.");
        return;
    }

    // Check if recognition instance already exists and is running, if so, stop it
    if (recognition) {
        recognition.stop();
    }

    recognition = new SpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.interimResults = true;  // Enable interim results to get partial results
    recognition.continuous = true;      // Keep recognition running

    let finalTranscript = '';
    let silenceTimer;

    recognition.onresult = function(event) {
        clearTimeout(silenceTimer);

        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            } else {
                interimTranscript += event.results[i][0].transcript;
            }
        }

        document.getElementById('result').innerText = 'You said: ' + finalTranscript + interimTranscript;

        // Reset the silence timer
        silenceTimer = setTimeout(() => {
            recognition.stop();
            if (finalTranscript.trim()) {
                document.getElementById('result').innerText = 'You said: ' + finalTranscript;
                addChatMessage('You said: ' + finalTranscript, 'user-message');
                sendToServer(finalTranscript);
            }
        }, 5000);  // 5 seconds of silence
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        alert('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = function() {
        clearTimeout(silenceTimer);
    };

    recognition.start();
};

function addChatMessage(message, messageType) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', messageType);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendToServer(text) {
    fetch('http://localhost:3000/speaking-practice2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spokenText: text })
    })
    .then(response => response.json())
    .then(data => {
        const chatgptResponse = data.response;
        document.getElementById('chatgpt-response').innerText = chatgptResponse;
        addChatMessage('ChatGPT: ' + chatgptResponse, 'assistant-message');
        speakResponse(chatgptResponse);
    })
    .catch(error => console.error('Error:', error));
}

function speakResponse(text) {
    const selectedLanguage = document.getElementById('languageSelect').value;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    synth.speak(utterance);
}
