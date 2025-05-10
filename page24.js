document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소
    const elements = {
        wordInput: document.getElementById('wordInput'),
        getFortuneBtn: document.getElementById('getFortuneBtn'),
        spinner: document.getElementById('spinner'),
        fortuneOutput: document.getElementById('fortuneOutput'),
        actionButtons: document.getElementById('actionButtons'),
        readBtn: document.getElementById('readBtn'),
        stopBtn: document.getElementById('stopBtn'),
        copyBtn: document.getElementById('copyBtn')
    };

    // 상태 관리
    const state = {
        isReading: false,
        currentAudio: null
    };

    // 이벤트 리스너 설정
    function setupEventListeners() {
        elements.getFortuneBtn.addEventListener('click', () => {
            getFortune();
        });

        elements.wordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                getFortune();
            }
        });

        elements.readBtn.addEventListener('click', () => {
            readFortune();
        });

        elements.stopBtn.addEventListener('click', () => {
            stopReading();
        });

        elements.copyBtn.addEventListener('click', () => {
            copyToClipboard();
        });
    }

    // 포춘 가져오기
    async function getFortune() {
        const input = elements.wordInput.value.trim();
        if (!input) {
            alert('Please enter your birth date, time, and place.');
            return;
        }

        elements.getFortuneBtn.classList.add('disabled');
        elements.spinner.style.display = 'block';
        elements.fortuneOutput.textContent = '';
        elements.actionButtons.style.display = 'none';

        try {
            const response = await fetch('http://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/get-fortune', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word: input })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            // 영어 부분만 추출
            const englishPart = data.fortune.match(/[A-Za-z0-9\s.,!?'":;()&\-]+/g)?.join(' ').trim() || '';
            elements.fortuneOutput.textContent = englishPart;
            elements.actionButtons.style.display = 'block';
        } catch (error) {
            console.error('Error fetching fortune:', error);
            elements.fortuneOutput.textContent = 'Error fetching fortune. Please try again later.';
        } finally {
            elements.spinner.style.display = 'none';
            elements.getFortuneBtn.classList.remove('disabled');
        }
    }

    // 포춘 읽기
    async function readFortune() {
        if (!elements.fortuneOutput.textContent) {
            return;
        }

        if (state.isReading) {
            return;
        }

        state.isReading = true;
        elements.readBtn.classList.add('disabled');
        elements.stopBtn.classList.remove('disabled');

        try {
            const response = await fetch(`http://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-audio?text=${encodeURIComponent(elements.fortuneOutput.textContent)}&language=en-US&voice=en-US-News-N`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            
            // 현재 재생 중인 오디오 저장
            state.currentAudio = audio;
            
            audio.onended = () => {
                state.isReading = false;
                elements.readBtn.classList.remove('disabled');
                elements.stopBtn.classList.add('disabled');
                URL.revokeObjectURL(audioUrl);
                state.currentAudio = null;
            };

            audio.play();
        } catch (error) {
            console.error('Error reading fortune:', error);
            state.isReading = false;
            elements.readBtn.classList.remove('disabled');
            elements.stopBtn.classList.add('disabled');
            state.currentAudio = null;
        }
    }

    // 읽기 중지
    function stopReading() {
        if (state.isReading && state.currentAudio) {
            state.currentAudio.pause();
            state.currentAudio.currentTime = 0;
            state.isReading = false;
            elements.readBtn.classList.remove('disabled');
            elements.stopBtn.classList.add('disabled');
            state.currentAudio = null;
        }
    }

    // 클립보드에 복사
    function copyToClipboard() {
        const text = elements.fortuneOutput.textContent;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            alert('Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // 초기화
    setupEventListeners();
    elements.stopBtn.classList.add('disabled');
});
        
         
