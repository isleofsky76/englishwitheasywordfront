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
    recognition.interimResults = false;  // Interim results disabled for final result only
    recognition.continuous = false;      // Recognition stops after one result

    recognition.onresult = function(event) {
        const finalTranscript = event.results[0][0].transcript;
        console.log('Final Transcript:', finalTranscript);  // Debugging
        document.getElementById('result').innerText = 'You said: ' + finalTranscript;
        addChatMessage('You said: ' + finalTranscript, 'user-message');
        sendToServer(finalTranscript);
    };

    recognition.onerror = function(event) {
        console.error('Speech recognition error:', event.error);
        alert('Error occurred in recognition: ' + event.error);
    };

    recognition.onend = function() {
        console.log('Speech recognition service disconnected');
    };

    recognition.start();
    console.log('Speech recognition started');  // Debugging
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
    console.log('Sending text to server:', text);  // Debugging
    fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/speaking-practice2', {  // 실제 백엔드 주소로 변경
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spokenText: text })
    })
    .then(response => {
        console.log('Server response status:', response.status);  // Debugging
        return response.json();
    })
    .then(data => {
        const chatgptResponse = data.response;
        console.log('ChatGPT Response:', chatgptResponse);  // Debugging
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
    console.log('Speaking response:', text);  // Debugging
    synth.speak(utterance);
}
