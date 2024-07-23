const words = [
    {
        "definition": "Used to indicate belonging, relating, or connection.<br><br>(소속, 관련 또는 연결을 나타내는 데 사용됨)",
        "examples": [
            "The title of the movie is 'Inception' (영화의 제목은 '인셉션'이다).",
            "He is the king of a small country (그는 작은 나라의 왕이다).",
            "The capital of France is Paris (프랑스의 수도는 파리이다)."
        ]
    },
    {
    
        "definition": "Indicating the material or substance used to create something.<br><br>(무언가를 만들기 위해 사용된 재료나 물질을 나타냄)",
        "examples": [
            "The ring is made of gold (그 반지는 금으로 만들어졌다).",
            "The table is built of wood (그 테이블은 나무로 만들어졌다).",
            "The sculpture is composed of bronze (그 조각은 청동으로 구성되어 있다)."
        ]
    },
    {
  
        "definition": "Used to show what something is a part of.<br><br>(무언가의 일부임을 나타내는 데 사용됨)",
        "examples": [
            "A slice of bread (빵 한 조각).",
            "A piece of cake (케이크 한 조각).",
            "A member of the team (팀의 일원)."
        ]
    },
    {
    
        "definition": "Indicating the cause of something.<br><br>(무언가의 원인을 나타내는 데 사용됨)",
        "examples": [
            "She died of cancer (그녀는 암으로 사망했다).",
            "He is tired of waiting (그는 기다리는 것에 지쳤다).",
            "The pain of losing a loved one (사랑하는 사람을 잃는 고통)."
        ]
    },
    {

        "definition": "Used to indicate possession.<br><br>(소유를 나타내는 데 사용됨)",
        "examples": [
            "The book of John (존의 책).",
            "The ideas of the professor (교수님의 아이디어).",
            "The house of my parents (내 부모님의 집)."
        ]
    },
    {
        "definition": "Used to describe an attribute or characteristic.<br><br>(속성이나 특성을 설명하는 데 사용됨)",
        "examples": [
            "A woman of courage (용기의 여인).",
            "A man of wisdom (지혜의 남자).",
            "A story of love (사랑 이야기)."
        ]
    },
    {
        "definition": "Used to indicate the relationship between a direction and a point of reference.<br><br>(방향과 기준점 사이의 관계를 나타내는 데 사용됨)",
        "examples": [
            "North of the city (도시의 북쪽).",
            "To the left of the building (건물의 왼쪽에).",
            "South of the border (국경의 남쪽에)."
        ]
    },
    {
     
        "definition": "Used to indicate time periods or duration.<br><br>(시간 기간이나 지속 기간을 나타내는 데 사용됨)",
        "examples": [
            "The beginning of the year (연초).",
            "The end of the day (하루의 끝).",
            "The middle of the night (한밤중)."
        ]
    },
    {
    
        "definition": "Used to specify measurements or quantities.<br><br>(측정값이나 양을 명시하는 데 사용됨)",
        "examples": [
            "A cup of water (물 한 컵).",
            "A pound of apples (사과 한 파운드).",
            "A liter of milk (우유 한 리터)."
        ]
    },
    {
       
        "definition": "Used to indicate origin or source.<br><br>(기원이나 출처를 나타내는 데 사용됨)",
        "examples": [
            "A native of Brazil (브라질 출신).",
            "The people of Rome (로마 사람들).",
            "The customs of Japan (일본의 관습)."
        ]
    },
    {
        "definition": "Used to indicate specific times or dates.<br><br>(특정한 시간이나 날짜를 나타내는 데 사용됨)",
        "examples": [
            "The first of January (1월 1일).",
            "The morning of the event (행사의 아침).",
            "The evening of the party (파티의 저녁)."
        ]
    },
    {
        "definition": "Used to indicate a category or type.<br><br>(범주 또는 종류를 나타내는 데 사용됨)",
        "examples": [
            "A breed of dog (개의 품종).",
            "A type of music (음악의 한 종류).",
            "A kind of fruit (과일의 한 종류)."
        ]
    },
    {
        "definition": "Used to provide specific examples.<br><br>(구체적인 예를 제공하는 데 사용됨)",
        "examples": [
            "Examples of great leaders (위대한 지도자들의 예).",
            "Instances of good behavior (좋은 행동의 사례).",
            "Cases of flu (독감의 사례)."
        ]
    },
    {
        "definition": "Used to indicate a role or function.<br><br>(역할이나 기능을 나타내는 데 사용됨)",
        "examples": [
            "The function of the heart (심장의 기능).",
            "The role of a teacher (교사의 역할).",
            "The duty of a citizen (시민의 의무)."
        ]
    },
    {
        "definition": "Used to describe nationality or city of origin.<br><br>(국적이나 출신 도시를 설명하는 데 사용됨)",
        "examples": [
            "The people of Canada (캐나다 사람들).",
            "A citizen of New York (뉴욕 시민).",
            "A resident of Paris (파리 주민)."
        ]
    },
    {
        "definition": "Used to describe parts of the body.<br><br>(신체 부위를 설명하는 데 사용됨)",
        "examples": [
            "The leg of the table (테이블의 다리).",
            "The head of the bed (침대의 머리 부분).",
            "The arm of the chair (의자의 팔걸이)."
        ]
    },
    {
        "definition": "Used to indicate a point of reference.<br><br>(기준점을 나타내는 데 사용됨)",
        "examples": [
            "To the right of the door (문의 오른쪽에).",
            "In front of the house (집 앞에).",
            "To the left of the window (창문의 왼쪽에)."
        ]
    },
    {
        "definition": "Used to indicate the time or place of origin.<br><br>(기원의 시간이나 장소를 나타내는 데 사용됨)",
        "examples": [
            "A product of the 1980s (1980년대의 산물).",
            "A relic of the past (과거의 유물).",
            "A tradition of the Middle Ages (중세의 전통)."
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

