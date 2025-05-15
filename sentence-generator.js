/// https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app

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
          
            //여기로 변경 const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/englishstudy', {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/englishstudy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ inputWord })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const responseData = await response.json();
            if (!responseData.assistant) {
                throw new Error('Invalid response format from server');
            }

            const highlightedText = highlightWord(responseData.assistant, inputWord);
            document.getElementById("outputArea").innerHTML = highlightedText.replace(/\n/g, "<br>");
        } catch (error) {
            console.error('Error:', error);
            document.getElementById("outputArea").innerText = 'Failed to fetch data: ' + error.message;
            alert('Error: ' + error.message + '\nPlease try again later or contact support if the problem persists.');
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
    let currentAudio = null;  // 현재 재생 중인 Audio 객체를 추적하기 위한 변수 추가

    // speakText 함수 수정
    async function speakText(language = 'en-US') {
        console.log('Starting speakText with language:', language);
        
        if (isSpeaking) {
            console.log("Speech synthesis is already active.");
            return;
        }

        const fullText = document.getElementById("outputArea").textContent;
        if (!fullText) {
            console.log("No text to speak.");
            return;
        }

        // 영어 부분만 추출 (괄호 안의 한글 제외)
        const englishText = fullText.replace(/\([^)]*\)/g, '').trim();
        console.log('English text to speak:', englishText);

        // 텍스트 길이 제한 (1000자)
        if (englishText.length > 1000) {
            alert('텍스트가 너무 깁니다. 1000자 이하로 입력해주세요.');
            return;
        }

        try {
            isSpeaking = true;
            console.log('Sending request to server...');
            
            // localhost 서버로 요청
            const serverUrl = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app';
            const response = await fetch(`${serverUrl}/generate-audio`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    text: englishText,
                    language: language,
                    voice: language === 'en-US' ? 'en-US-Neural2-C' : 'en-GB-Neural2-A'
                })
            });

            console.log('Server response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
                console.error('Server error details:', errorData);
                throw new Error(`Failed to generate audio: ${response.status} - ${errorData.error || 'Unknown error'}`);
            }

            const audioBlob = await response.blob();
            if (audioBlob.size === 0) {
                throw new Error('Received empty audio data');
            }
            
            console.log('Received audio blob:', audioBlob.size, 'bytes');
            
            const audioUrl = URL.createObjectURL(audioBlob);
            currentAudio = new Audio(audioUrl);

            currentAudio.onended = () => {
                console.log('Audio playback ended');
                URL.revokeObjectURL(audioUrl);
                isSpeaking = false;
                currentAudio = null;
            };

            currentAudio.onerror = (error) => {
                console.error('Audio playback error:', error);
                isSpeaking = false;
                currentAudio = null;
            };

            console.log('Starting audio playback...');
            await currentAudio.play();
            console.log('Audio playback started');
        } catch (error) {
            console.error('Error in speakText:', error);
            alert('음성 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            isSpeaking = false;
            currentAudio = null;
        }
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

    // UK/US 버튼 이벤트 리스너 수정
    document.getElementById('engUkButton').addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('UK button clicked');
        await speakText('en-GB');
    });

    document.getElementById('engUsButton').addEventListener('click', async (event) => {
        event.preventDefault();
        console.log('US button clicked');
        await speakText('en-US');
    });

    // stopText 함수 수정
    function stopText() {
        if (isSpeaking && currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            isSpeaking = false;
            currentAudio = null;
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

    // 서버 TTS를 호출하는 함수 추가
    async function fetchServerTTS(text, langCode) {
        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-audio', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text, language: langCode })
            });

            if (!response.ok) {
                throw new Error('Failed to generate audio');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);

            audio.onended = () => {
                URL.revokeObjectURL(audioUrl);
            };

            audio.play();
        } catch (error) {
            console.error('Error fetching server TTS:', error);
        }
    }

    // UK/US 버튼에 서버 TTS 연동
    const ukVoiceBtn = document.getElementById('ukVoiceBtn');
    const usVoiceBtn = document.getElementById('usVoiceBtn');

    if (ukVoiceBtn) {
        ukVoiceBtn.addEventListener('click', () => {
            const text = document.getElementById('outputArea').textContent;
            fetchServerTTS(text, 'en-GB');
        });
    }
    if (usVoiceBtn) {
        usVoiceBtn.addEventListener('click', () => {
            const text = document.getElementById('outputArea').textContent;
            fetchServerTTS(text, 'en-US');
        });
    }

    // 입력 필드에 placeholder 추가
    const inputWord = document.getElementById("inputWord");
    if (inputWord) {
        inputWord.placeholder = "문장 생성을 원하시면 단어를 입력하고 아래 이모티콘을 눌러주세요";
    }
});


