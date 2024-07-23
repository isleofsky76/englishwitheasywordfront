const words = [
    {
        "definition": "Used to indicate inclusion within space, a place, or limits.<br><br>(공간, 장소 또는 한계 내에 포함됨을 나타내는 데 사용됨)",
        "examples": [
            "The book is in the bag (책이 가방 안에 있다).",
            "She is in the room (그녀는 방 안에 있다).",
            "The keys are in the drawer (열쇠가 서랍 안에 있다)."
        ]
    },
    {
        "definition": "Used to indicate a state or condition.<br><br>(상태 또는 조건을 나타내는 데 사용됨)",
        "examples": [
            "He is in good health (그는 건강 상태가 좋다).",
            "She is in a hurry (그녀는 급하다).",
            "They are in trouble (그들은 곤경에 처해 있다)."
        ]
    },
    {
        "definition": "Used to indicate a period of time.<br><br>(시간의 기간을 나타내는 데 사용됨)",
        "examples": [
            "I will finish in an hour (나는 한 시간 안에 끝낼 것이다).",
            "She was born in 1990 (그녀는 1990년에 태어났다).",
            "We will meet in the morning (우리는 아침에 만날 것이다)."
        ]
    },
    {
        "definition": "Used to indicate occupation or involvement.<br><br>(직업 또는 참여를 나타내는 데 사용됨)",
        "examples": [
            "He is in politics (그는 정치에 종사하고 있다).",
            "She works in education (그녀는 교육 분야에서 일한다).",
            "They are involved in the project (그들은 그 프로젝트에 참여하고 있다)."
        ]
    },
    {
        "definition": "Used to indicate manner, means, or method.<br><br>(방식, 수단 또는 방법을 나타내는 데 사용됨)",
        "examples": [
            "Please write in pencil (연필로 써주세요).",
            "She delivered the speech in English (그녀는 영어로 연설을 했다).",
            "They traveled in silence (그들은 침묵 속에서 여행했다)."
        ]
    },
    {
        "definition": "Used to indicate a relationship.<br><br>(관계를 나타내는 데 사용됨)",
        "examples": [
            "She is in love (그녀는 사랑에 빠졌다).",
            "They are in competition (그들은 경쟁 중이다).",
            "He is in contact with her (그는 그녀와 연락 중이다)."
        ]
    },
    {
        "definition": "Used to indicate a position within a larger context.<br><br>(더 큰 맥락 내에서의 위치를 나타내는 데 사용됨)",
        "examples": [
            "He is in the top 10 (그는 상위 10위 안에 든다).",
            "She is in the list of winners (그녀는 수상자 명단에 있다).",
            "They are in the group of finalists (그들은 결선 진출자 그룹에 있다)."
        ]
    },
    {
        "definition": "Used to indicate a transformation or change.<br><br>(변화나 변환을 나타내는 데 사용됨)",
        "examples": [
            "The water turned into ice (물이 얼음으로 변했다).",
            "She transformed in an instant (그녀는 순식간에 변했다).",
            "They grew in confidence (그들은 자신감이 생겼다)."
        ]
    },
    {
        "definition": "Used to indicate direction or movement.<br><br>(방향 또는 움직임을 나타내는 데 사용됨)",
        "examples": [
            "She walked in the park (그녀는 공원에서 걸었다).",
            "They traveled in the north (그들은 북쪽으로 여행했다).",
            "He is moving in a new direction (그는 새로운 방향으로 나아가고 있다)."
        ]
    },
    {
        "definition": "Used to indicate means or medium.<br><br>(수단 또는 매체를 나타내는 데 사용됨)",
        "examples": [
            "She spoke in a whisper (그녀는 속삭이듯 말했다).",
            "He painted in watercolors (그는 수채화로 그림을 그렸다).",
            "They communicated in sign language (그들은 수화로 의사소통했다)."
        ]
    },
    

];




let currentWordIndex = 0;
let autoPlayInterval;
let currentAudioSource = null;
let isStopped = false;
let speakTimeouts = [];
let ofRead = false;  // "of"가 한 번 읽혔는지 여부를 추적하는 변수

document.addEventListener('DOMContentLoaded', function() {
    const exampleList = document.getElementById('example-list');

    function updateWord() {
        const word = words[currentWordIndex];
        document.getElementById('word-definition').innerHTML = word.definition; // Use innerHTML to keep the <br> tags

        exampleList.innerHTML = '';
        word.examples.forEach(example => {
        const listItem = document.createElement('li');
        listItem.innerHTML = example.replace('(', '<br>('); // 영어 다음에 <br> 태그 추가
        exampleList.appendChild(listItem);
      });
    }

    async function fetchAudio(text, language) {
        console.log('request Audio for:', text, 'in', language);

        try {
            const response = await fetch(`http://localhost:3000/generate-audio?text=${encodeURIComponent(text)}&language=${language}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                console.error('Failed to fetch audio data');
                return;
            }

            const arrayBuffer = await response.arrayBuffer();
            const audioContext = getAudioContext();
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const source = audioContext.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.destination);
            source.onended = () => currentAudioSource = null; // 오디오 종료 시 currentAudioSource 초기화
            return source;
        } catch (error) {
            console.error('Error fetching audio data:', error);
        }
    }

    function getAudioContext() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        return new AudioContext();
    }

    async function pronounceWord(times, callback) {
        let count = 0;
        const word = words[currentWordIndex];
        const { definition, examples } = word;

        async function speak() {
            if (count < times && !isStopped) {
                if (currentAudioSource) {
                    currentAudioSource.stop();
                }

                const definitionText = definition.split('<br>')[0]; // 정의 부분만 가져오기
                const definitionAudio = await fetchAudio(definitionText, 'en-GB');
                if (!definitionAudio) {
                    console.error('Failed to fetch Definition audio URL');
                    return;
                }
                currentAudioSource = definitionAudio;
                definitionAudio.onended = async () => {
                    if (isStopped) return;
                    let exampleIndex = 0;
                    async function speakExample() {
                        if (exampleIndex < examples.length && !isStopped) {
                            if (currentAudioSource) {
                                currentAudioSource.stop();
                            }
                            const englishExample = examples[exampleIndex].split(' (')[0]; // 영어 부분만 가져오기
                            const exampleAudio = await fetchAudio(englishExample, 'en-GB');
                            if (!exampleAudio) {
                                console.error('Failed to fetch Example audio URL');
                                return;
                            }
                            currentAudioSource = exampleAudio;
                            exampleAudio.onended = () => {
                                if (isStopped) return;
                                exampleIndex++;
                                if (exampleIndex < examples.length) {
                                    const timeoutId = setTimeout(speakExample, 2000); // 예문 사이에 2초 지연
                                    speakTimeouts.push(timeoutId);
                                } else {
                                    count++;
                                    if (count < times) {
                                        const timeoutId = setTimeout(speak, 2000); // 단어 사이에 2초 지연
                                        speakTimeouts.push(timeoutId);
                                    } else if (callback) {
                                        const timeoutId = setTimeout(callback, 2000); // 전체 반복 사이에 2초 지연
                                        speakTimeouts.push(timeoutId);
                                    }
                                }
                            };
                            exampleAudio.start();
                        }
                    }
                    const timeoutId = setTimeout(speakExample, 2000); // 정의와 첫 번째 예문 사이에 2초 지연
                    speakTimeouts.push(timeoutId);
                };
                definitionAudio.start();
            }
        }
        speak();
    }

    function stopPronouncing() {
        isStopped = true;
        if (currentAudioSource) {
            currentAudioSource.stop();
        }
        currentAudioSource = null; // currentAudioSource 초기화
        speakTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
        speakTimeouts = []; // 모든 예약된 setTimeout 콜백 제거
        clearInterval(autoPlayInterval); // 자동 재생 멈추기
    }

    function nextWord() {
        currentWordIndex = (currentWordIndex + 1) % words.length;
        while (words[currentWordIndex].english === "of" && ofRead) {
            currentWordIndex = (currentWordIndex + 1) % words.length;
        }
        updateWord();
        setTimeout(() => pronounceWord(1), 2000); // 2초 지연
    }

    function autoPlay() {
        stopPronouncing(); // 자동 재생 시작 전에 현재 재생 중인 오디오 멈추기
        isStopped = false;

        function playNextWord() {
            if (isStopped) return;
            updateWord();
            pronounceWord(1, () => {
                currentWordIndex++;
                while (words[currentWordIndex].english === "of" && ofRead) {
                    currentWordIndex = (currentWordIndex + 1) % words.length;
                }
                if (currentWordIndex >= words.length) {
                    currentWordIndex = 0;
                }
                autoPlayInterval = setTimeout(playNextWord, 2000); // 다음 단어 재생 전에 2초 지연
            });
        }

        autoPlayInterval = setTimeout(playNextWord, 2000); // 첫 단어 재생 전에 2초 지연
    }

    document.getElementById('pronounce-1').addEventListener('click', () => {
        stopPronouncing();
        pronounceWord(1);
    });
    document.getElementById('pronounce-5').addEventListener('click', () => {
        stopPronouncing();
        pronounceWord(5);
    });
    document.getElementById('pronounce-10').addEventListener('click', () => {
        stopPronouncing();
        pronounceWord(10);
    });
    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);
    document.getElementById('next-word').addEventListener('click', () => {
        stopPronouncing();
        nextWord();
    });
    document.getElementById('auto-play').addEventListener('click', autoPlay);

    updateWord();
    setTimeout(() => pronounceWord(1), 2000); // 페이지 로드 후 2초 지연

    // Display the list of words in the #words-list div
    const wordsListContainer = document.getElementById('words-list');
    words.forEach(word => {
        const wordItem = document.createElement('p');
        wordItem.textContent = word.english;
        wordsListContainer.appendChild(wordItem);
    });
});

