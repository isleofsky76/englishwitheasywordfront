document.addEventListener('DOMContentLoaded', () => {
    const forbiddenWords = [
        "sex", "sexual", "rape", "molest", "violence", "murder", "gore", "drugs", "narcotics", 
        "prostitute", "prostitution", "pedophile", "pedophilia", "incest", "self-harm", "bully", 
        "bullying", "harassment",  "slavery", "enslave", "exploitation", "trafficking", 
        "slaughter", "genocide","homophobia", "transphobia", "homophobic", "transphobic","suicide"
    ];

    let availableVoices = [];
    let isSpeaking = false; // Flag to track if speech is currently active
    let isTextToSpeech = false;  // Variable to track if text-to-speech functionality is active
    let utterance = null; // Global reference to SpeechSynthesisUtterance object for stopping speech
    let sentenceQueue = []; // Queue to hold sentences that need to be read
    let currentRate = 1.0; // Default speech rate
    let currentVolume = 1.0; // Default volume
    let selectedVoice = 'en-GB'; // Default to British English

    // 금지된 단어 검사 함수
    function containsForbiddenWords(text) {
        const lowerText = text.toLowerCase(); // 대소문자 구분 없이 검사
        return forbiddenWords.some(word => lowerText.includes(word));
    }

    //1.fuction spinner 
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
        // Remove unnecessary punctuation marks but keep numbers
        return text.replace(/[.,?!]/g, '');
    }

    //2.gpt에서 가져오기 
    async function sendRequest() {
        // Check if text-to-speech is active, if so, return early
        if (isTextToSpeech) {
            console.log("Operation aborted due to active text-to-speech");
            return;
        }

        showSpinner(); // Show spinner

        try {
            const inputWord = document.getElementById("inputWord").value.trim().toLowerCase();
            if (inputWord === "") {
                hideSpinner();
                return; // 빈 입력은 무시
            }

            // 금지된 단어 검사
            if (containsForbiddenWords(inputWord)) {
                alert("The input contains forbidden words. Please remove them and try again (입력이 금지된 단어입니다. 다시 입력해주세요).");
                hideSpinner();
                return;
            }

            console.log("Sending request to server with word:", inputWord);

            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/englishstudy', {
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
            hideSpinner(); // 스피너 숨기기
        }
        
        //4.출력물에서 동일한 단어 red로 표기하기
        function highlightWord(text, word) {
            const regex = new RegExp(`(${word})`, 'gi');
            return text.replace(regex, '<span style="color: red;">$1</span>');
        }
    }

    // 5. voice load하기
    function loadVoices() {
        availableVoices = speechSynthesis.getVoices();
        console.log("Voices loaded:", availableVoices); // Log the loaded voices
        if (availableVoices.length === 0) {
            console.error("No voices found. Please check your browser settings or try a different browser.");
        }
    }

    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Initial load of voices

    //7. Start reading text aloud  page1 html ==================================================
    function speakText() {
        // Check if text-to-speech is already active
        if (isTextToSpeech) {
            console.log("Speech synthesis is already active.");
            return; // Prevent concurrent speech synthesis
        }

        // 7-1 Get the text content from the output area
        const text = document.getElementById("outputArea").textContent;
        // Check if there is no text to speak
        if (!text) {
            console.log("No text to speak.");
            return;
        }

        // Extract English sentences only (letters, numbers, and common punctuation)
        const englishTextParts = text.match(/(?:[a-zA-Z]+\s*)+[0-9]*(?:[a-zA-Z0-9\s,.'?!]*)/g);
        if (!englishTextParts || englishTextParts.length === 0) {
            console.log("No English sentences found.");
            return;
        }
        console.log("Extracted sentences:", englishTextParts); // Debugging output

        // Use cleaned sentences directly since 'cleanText' only removes certain punctuation
        sentenceQueue = englishTextParts.map(sentence => cleanText(sentence));
        console.log("Prepared sentences for TTS:", sentenceQueue);

        // Start the text-to-speech process
        isSpeaking = true;
        isTextToSpeech = true;
        processNextSentence();
    }

    function processNextSentence() {
        if (sentenceQueue.length === 0) {
            console.log("All sentences have been read.");
            isSpeaking = false;
            isTextToSpeech = false;
            return; // Stop when no more sentences are left
        }

        const nextSentence = sentenceQueue.shift(); // Remove the next sentence from the queue
        utterance = new SpeechSynthesisUtterance(nextSentence);
        utterance.rate = currentRate; // Set dynamically just before speaking
        utterance.volume = currentVolume; // Set dynamically just before speaking

        const voice = availableVoices.find(voice => voice.lang === selectedVoice) || availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
        utterance.voice = voice || null;

        if (voice) {
            console.log("Using voice:", voice.name, "with language:", voice.lang);
        } else {
            console.error("No suitable voice found.");
        }

        utterance.onend = function () {
            console.log("Finished speaking a sentence.");
            processNextSentence(); // Proceed to the next sentence once this one finishes
        };

        utterance.onerror = function(event) {
            console.error("Speech synthesis error:", event.error);
            isSpeaking = false;
            isTextToSpeech = false;
        };

        speechSynthesis.cancel(); // Cancel any previously speaking utterance
        speechSynthesis.speak(utterance);
    }

    function stopText() {
        if (isSpeaking) {
            try {
                speechSynthesis.cancel(); // Attempt to cancel current speech
            } catch (error) {
                console.error("Failed to stop speech synthesis:", error);
            }
            isSpeaking = false;
            isTextToSpeech = false;
            sentenceQueue = []; // Clear the queue
            console.log("Speech synthesis stopped.");
        }
    }

    // Event listeners for voice selection buttons
    document.getElementById('engUkButton').addEventListener('click', () => {
        selectedVoice = 'en-GB';
        console.log("Selected voice: English UK");
        speakText();
    });

    document.getElementById('engUsButton').addEventListener('click', () => {
        selectedVoice = 'en-US';
        console.log("Selected voice: English US");
        speakText();
    });

    // Add event listener for the stop button
    document.getElementById('stopButton').addEventListener('click', () => {
        stopText();
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

    // Add event listener for the download button
    document.getElementById('downloadButton').addEventListener('click', () => {
        downloadSentences();
    });

    // Function to copy the content of the output area to clipboard
    function copyToClipboard() {
        const outputArea = document.getElementById('outputArea');
        const textToCopy = outputArea.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Add event listener for the copy button
    document.getElementById('copyButton').addEventListener('click', (event) => {
        event.preventDefault(); // Prevent any default form submission behavior
        copyToClipboard();
    });

    function setInput(word) {
        document.getElementById("inputWord").value = word; // Set the input value
        sendRequest(); // Trigger the search
    }

    document.getElementById('inputForm').addEventListener('submit', function(event) {
        event.preventDefault();
        sendRequest();
    });

    // Function to clear the input field and update the word list
    function clearInputField() {
        document.getElementById("inputWord").value = ''; // Clear the input field
    }

    // Add event listener for the clear input button
    document.getElementById('clearButton').addEventListener('click', () => {
        clearInputField();
    });
});

