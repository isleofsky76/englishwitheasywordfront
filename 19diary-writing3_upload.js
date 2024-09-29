const words = [
    {
        "korean": "그는/ 밖에서 피어나는/ 하얀 목련에 경이로움을 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 밖에서 피어나는 (blooming outside) / 3. 하얀 목련에 경이로움을 느꼈다 (was awestruck by the white magnolias).",
        "english": "He was awestruck by the white magnolias blooming outside. (He felt amazed by the beauty of the white magnolias blossoming outdoors.)",
        "key_words": ["Awestruck", "경이로움을"]
    },
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. / (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    
    
];

let currentWordIndex = 0;
let currentAudioSource = null;
let isStopped = false;
let speakTimeouts = [];
let autoPlayInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateWord();  // Update the word when the page loads

    // Add event listeners for pronunciation and controls
    document.getElementById('pronounce-1').addEventListener('click', () => {
        handlePronunciation();
    });

    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);
    document.getElementById('next-word').addEventListener('click', handleNextWord);
    document.getElementById('auto-play').addEventListener('click', autoPlay);
});

function updateWord() {
    const word = words[currentWordIndex];
    document.getElementById('word-definition').innerHTML = highlightKeywords(word.korean, word.key_words);
    document.getElementById('word-explanation').innerHTML = "";
    document.getElementById('word-pronunciation').innerHTML = "";
}

function highlightKeywords(text, keywords) {
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        text = text.replace(regex, '<span style="color: orange;">$1</span>'); // Highlight key words
    });
    return text;
}

function stripNumbers(text) {
    return text.replace(/\d+\.\s*/g, '');
}

function getAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}

async function fetchAudio(text, language) {
    const response = await fetch(`http://localhost:3000/generate-audio?text=${encodeURIComponent(text)}&language=${language}`);
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.onended = () => currentAudioSource = null;
    return source;
}

function resumeAudioContext() {
    const audioContext = getAudioContext();
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed.');
        });
    }
}

async function pronounceWord() {
    resumeAudioContext();
    if (!isStopped && currentAudioSource) currentAudioSource.stop();

    const word = words[currentWordIndex];
    const koreanAudio = await fetchAudio(word.korean, 'ko-KR');
    if (koreanAudio) {
        currentAudioSource = koreanAudio;
        koreanAudio.start();
        koreanAudio.onended = async () => {
            if (isStopped) return;
            await handleExplanationParts(word);
        };
    }
}

async function handleExplanationParts(word) {
    const explanationParts = word.explanation.split('/');
    let currentPartIndex = 0;

    async function showNextPart() {
        if (currentPartIndex < explanationParts.length) {
            const part = explanationParts[currentPartIndex].trim();
            const koreanPart = part.split('(')[0].trim();
            const englishPart = part.match(/\(([^)]+)\)/)[1];

            const explanationElement = document.createElement('p');
            explanationElement.innerHTML = `${highlightKeywords(koreanPart, word.key_words)} <span>(${highlightKeywords(englishPart, word.key_words)})</span>`;
            document.getElementById('word-explanation').appendChild(explanationElement);

            const koreanPartAudio = await fetchAudio(stripNumbers(koreanPart), 'ko-KR');
            if (koreanPartAudio) {
                koreanPartAudio.start();
                koreanPartAudio.onended = async () => {
                    if (isStopped) return;

                    const englishPartAudio = await fetchAudio(stripNumbers(englishPart), 'en-GB');
                    if (englishPartAudio) {
                        englishPartAudio.start();
                        englishPartAudio.onended = async () => {
                            currentPartIndex++;
                            await showNextPart();
                        };
                    }
                };
            }
        } else {
            await handleEnglishPronunciation(word);
        }
    }

    await showNextPart();
}

async function handleEnglishPronunciation(word) {
    const englishText = word.english;
    const element = document.getElementById('word-pronunciation');
    element.innerHTML = ""; 

    let charArray = [...englishText]; 
    let index = 0;

    function typeWriter() {
        if (index < charArray.length) {
            element.innerHTML += charArray[index];
            index++;
            setTimeout(typeWriter, 100); 
        } else {
            element.innerHTML = highlightKeywords(englishText, word.key_words);
            fetchAudio(englishText, 'en-GB').then(englishAudio => {
                if (englishAudio) {
                    currentAudioSource = englishAudio;
                    englishAudio.start();
                }
            });
        }
    }

    typeWriter();
}

function handlePronunciation() {
    stopPronouncing();
    pronounceWord();
}

function handleNextWord() {
    stopPronouncing();
    nextWord();
}

function stopPronouncing() {
    isStopped = true;
    if (currentAudioSource) {
        currentAudioSource.stop();
    }
    currentAudioSource = null;
    speakTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    speakTimeouts = [];
    clearTimeout(autoPlayInterval);
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    setTimeout(() => pronounceWord(), 500);
}

function autoPlay() {
    stopPronouncing();
    isStopped = false;

    function playNextWord() {
        if (isStopped) return;
        updateWord();
        pronounceWord(() => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
            autoPlayInterval = setTimeout(playNextWord, 500);
        });
    }

    autoPlayInterval = setTimeout(playNextWord, 500);
}
