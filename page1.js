document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase();
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    function showSpinner() {
        console.log("Spinner shown");
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('loadingText').style.display = 'block';
    }

    function hideSpinner() {
        console.log("Spinner hidden");
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('loadingText').style.display = 'none';
    }

    function cleanText(text) {
        return text.replace(/[.,?!]/g, '');
    }

    async function sendRequest(event) {
        event.preventDefault();
        
        showSpinner();

        try {
            const inputWord = document.getElementById("inputWord").value.trim().toLowerCase();
            if (inputWord === "") {
                hideSpinner();
                return;
            }

            if (containsForbiddenWords(inputWord)) {
                alert("The input contains forbidden words. Please remove them and try again (입력이 금지된 단어입니다. 다시 입력해주세요).");
                hideSpinner();
                return;
            }

            console.log("Sending request to server with word:", inputWord);

            const response = await fetch('http://localhost:3000/englishstudy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ inputWord })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            const highlightedText = highlightWord(responseData.assistant, inputWord);
            document.getElementById("outputArea").innerHTML = highlightedText.replace(/\n/g, "<br>");
        } catch (error) {
            console.error('Error:', error);
            document.getElementById("outputArea").innerText = 'Failed to fetch data: ' + error.message;
        } finally {
            hideSpinner();
        }
    }

    function highlightWord(text, word) {
        const regex = new RegExp(`(${word})`, 'gi');
        return text.replace(regex, '<span style="color: red;">$1</span>');
    }

    document.getElementById('inputForm').addEventListener('submit', sendRequest);

    let utterance = null;
    let isSpeaking = false;
    let sentenceQueue = [];
    let selectedVoice = null;

    function speakText() {
        if (isSpeaking) {
            console.log("Speech synthesis is already active.");
            return;
        }

        const text = document.getElementById("outputArea").textContent;
        if (!text) {
            console.log("No text to speak.");
            return;
        }

        const englishTextParts = text.match(/(?:[a-zA-Z]+\s*)+[0-9]*(?:[a-zA-Z0-9\s,.'?!]*)/g);
        if (!englishTextParts || englishTextParts.length === 0) {
            console.log("No English sentences found.");
            return;
        }

        sentenceQueue = englishTextParts.map(sentence => cleanText(sentence));
        isSpeaking = true;
        processNextSentence();
    }

    function processNextSentence() {
        if (sentenceQueue.length === 0) {
            console.log("All sentences have been read.");
            isSpeaking = false;
            return;
        }

        const nextSentence = sentenceQueue.shift();
        utterance = new SpeechSynthesisUtterance(nextSentence);

        utterance.rate = 1; // 속도를 조정합니다 (기본값: 1)
        utterance.pitch = 1; // 음조를 조정합니다 (기본값: 1)
        utterance.volume = 1; // 음량을 조정합니다 (기본값: 1)

        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        utterance.onend = function () {
            console.log("Finished speaking a sentence.");
            processNextSentence();
        };

        utterance.onerror = function(event) {
            console.error("Speech synthesis error:", event.error);
            isSpeaking = false;
        };

        speechSynthesis.speak(utterance);
    }

    function stopText() {
        if (isSpeaking) {
            try {
                speechSynthesis.cancel();
            } catch (error) {
                console.error("Failed to stop speech synthesis:", error);
            }
            isSpeaking = false;
            sentenceQueue = [];
            console.log("Speech synthesis stopped.");
        }
    }

    function setVoice(lang) {
        const voices = speechSynthesis.getVoices();
        selectedVoice = voices.find(voice => voice.lang === lang) || voices.find(voice => voice.lang.startsWith('en')) || null;
        if (selectedVoice) {
            console.log(`Selected voice: ${selectedVoice.name} (Language: ${selectedVoice.lang})`);
        } else {
            console.error("No suitable voice found.");
        }
    }

    speechSynthesis.onvoiceschanged = () => {
        setVoice('en-GB'); // 기본 목소리를 설정합니다
    };

    document.getElementById('engUkButton').addEventListener('click', (event) => {
        event.preventDefault();
        setVoice('en-GB');
        speakText();
    });

    document.getElementById('engUsButton').addEventListener('click', (event) => {
        event.preventDefault();
        setVoice('en-US');
        speakText();
    });

    document.getElementById('stopButton').addEventListener('click', (event) => {
        event.preventDefault();
        stopText();
    });

    document.getElementById('downloadButton').addEventListener('click', (event) => {
        event.preventDefault();
        downloadSentences();
    });

    document.getElementById('copyButton').addEventListener('click', (event) => {
        event.preventDefault();
        copyToClipboard();
    });

    document.getElementById('clearButton').addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById("inputWord").value = '';
    });

    function downloadSentences() {
        const outputArea = document.getElementById('outputArea');
        const textToDownload = outputArea.innerText;
        const blob = new Blob([textToDownload], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'example.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function copyToClipboard() {
        const outputArea = document.getElementById('outputArea');
        const textToCopy = outputArea.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }
});

