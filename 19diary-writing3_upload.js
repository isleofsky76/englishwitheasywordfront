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
        "english": "His actions made most at the table flinch. (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    {
        "korean": "그는/ 밖에서 피어나는/ 하얀 목련에 경이로움을 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 밖에서 피어나는 (blooming outside) / 3. 하얀 목련에 경이로움을 느꼈다 (was awestruck by the white magnolias).",
        "english": "He was awestruck by the white magnolias blooming outside. (He felt amazed by the beauty of the white magnolias blossoming outdoors.)",
        "key_words": ["Awestruck", "경이로움을"]
    },
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    {
        "korean": "그는/ 밖에서 피어나는/ 하얀 목련에 경이로움을 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 밖에서 피어나는 (blooming outside) / 3. 하얀 목련에 경이로움을 느꼈다 (was awestruck by the white magnolias).",
        "english": "He was awestruck by the white magnolias blooming outside. (He felt amazed by the beauty of the white magnolias blossoming outdoors.)",
        "key_words": ["Awestruck", "경이로움을"]
    },
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    {
        "korean": "그는/ 밖에서 피어나는/ 하얀 목련에 경이로움을 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 밖에서 피어나는 (blooming outside) / 3. 하얀 목련에 경이로움을 느꼈다 (was awestruck by the white magnolias).",
        "english": "He was awestruck by the white magnolias blooming outside. (He felt amazed by the beauty of the white magnolias blossoming outdoors.)",
        "key_words": ["Awestruck", "경이로움을"]
    },
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
    {
        "korean": "그는/ 밖에서 피어나는/ 하얀 목련에 경이로움을 느꼈다.",
        "explanation": "1. 그는 (He) / 2. 밖에서 피어나는 (blooming outside) / 3. 하얀 목련에 경이로움을 느꼈다 (was awestruck by the white magnolias).",
        "english": "He was awestruck by the white magnolias blooming outside. (He felt amazed by the beauty of the white magnolias blossoming outdoors.)",
        "key_words": ["Awestruck", "경이로움을"]
    },
    {
        "korean": "그의 행동은 / 테이블에 있던 대부분의 사람들을 / 움찔하게 만들었다.",
        "explanation": "1. 그의 행동은 (His actions) / 2. 테이블에 있던 대부분의 사람들을 (most at the table) / 3. 움찔하게 만들었다 (made flinch).",
        "english": "His actions made most at the table flinch. (His behavior caused most people at the table to react with surprise.)",
        "key_words": ["made flinch", "움찔하게 만들었다"]
    },
];

let currentWordIndex = 0;
let currentAudioSource = null;
let isStopped = false;
let autoPlayInterval;

document.addEventListener('DOMContentLoaded', () => {
    updateWord();  // Update the word when the page loads

    // Add event listeners for pronunciation and controls
    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);
    document.getElementById('next-word').addEventListener('click', handleNextWord);
    document.getElementById('auto-play').addEventListener('click', autoPlay);
});

function updateWord() {
    const word = words[currentWordIndex];
    // 업데이트된 word 내용이 화면에 반영됩니다.
    document.getElementById('word-definition').innerHTML = highlightKeywords(word.korean, word.key_words);
    document.getElementById('word-explanation').innerHTML = "";
    document.getElementById('word-pronunciation').innerHTML = "";
    console.log("Updating word:", word.korean);
}

function highlightKeywords(text, keywords) {
    keywords.forEach(keyword => {
        const regex = new RegExp(`(${keyword})`, 'gi');
        text = text.replace(regex, '<span style="color: orange;">$1</span>'); // Highlight key words
    });
    return text;
}

async function fetchAudio(text, language) {
    console.log('Requesting Audio for:', text, 'in', language);

    try {
        const response = await fetch(`http://localhost:3000/generate-audio?text=${encodeURIComponent(text)}&language=${language}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error('Failed to fetch audio data:', response.statusText);
            return null;
        }

        const arrayBuffer = await response.arrayBuffer();
        const audioContext = getAudioContext();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.onended = () => currentAudioSource = null;
        return source;
    } catch (error) {
        console.error('Error fetching audio data:', error);
        return null;
    }
}

function getAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    return new AudioContext();
}
async function pronounceWord() {
    resumeAudioContext();

    if (!isStopped) {
        // 화면의 단어를 먼저 업데이트 (korean text 포함)
        updateWord(); // This updates the text displayed on the screen for the current word

        // Clear the explanation and pronunciation each time the pronunciation starts
        document.getElementById('word-explanation').innerHTML = ""; // Clear previous explanation
        document.getElementById('word-pronunciation').innerHTML = ""; // Clear previous pronunciation

        if (currentAudioSource) {
            currentAudioSource.stop();
        }

        const word = words[currentWordIndex]; // Use currentWordIndex to fetch the correct word data
        console.log("Pronouncing word:", word);

        // Play Korean sentence first
        const koreanAudio = await fetchAudio(word.korean, 'ko-KR');
        if (!koreanAudio) return;
        currentAudioSource = koreanAudio;

        // Wait until the Korean sentence finishes playing
        await playAudio(koreanAudio);

        // After the Korean sentence finishes, handle explanation parts
        await handleExplanationParts(word);

        // Display English translation
        document.getElementById('word-pronunciation').innerHTML = word.english;

        // Play the English sentence
        const englishAudio = await fetchAudio(word.english, 'en-GB');
        if (englishAudio) {
            await playAudio(englishAudio);
        }
    }
}


function playAudio(audioSource) {
    return new Promise((resolve) => {
        audioSource.start();
        audioSource.onended = () => resolve(); // Resolve the promise when the audio finishes playing
    });
}

function resumeAudioContext() {
    const audioContext = getAudioContext();
    if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            console.log('Audio context resumed.');
        });
    }
}
async function handleExplanationParts(word) {
    const explanationParts = word.explanation.split('/');
    let currentPartIndex = 0;

    async function showNextPart() {
        if (isStopped) return; // Ensure that explanation does not continue if stopped

        if (currentPartIndex < explanationParts.length) {
            const part = explanationParts[currentPartIndex].trim();

            // Extract Korean and English parts
            const koreanPartWithNumber = part.split('(')[0].trim(); // Keep number for display
            const koreanPart = koreanPartWithNumber.replace(/^\d+\.\s*/, ''); // Remove number for reading
            const englishPart = part.match(/\(([^)]+)\)/)[1];

            // Display explanation part with number for visual display
            const explanationElement = document.createElement('p');
            explanationElement.innerHTML = `${highlightKeywords(koreanPartWithNumber, word.key_words)} <span>(${highlightKeywords(englishPart, word.key_words)})</span>`;
            document.getElementById('word-explanation').appendChild(explanationElement);

            // Play Korean audio first (without numbering)
            const koreanPartAudio = await fetchAudio(koreanPart, 'ko-KR');
            if (koreanPartAudio) {
                await playAudio(koreanPartAudio);

                // Play English audio after Korean part (without numbering)
                const englishPartAudio = await fetchAudio(englishPart, 'en-GB');
                if (englishPartAudio) {
                    await playAudio(englishPartAudio);
                    currentPartIndex++;
                    await showNextPart();
                }
            }
        }
    }

    await showNextPart();
}



function stopPronouncing() {
    isStopped = true;
    if (currentAudioSource) {
        currentAudioSource.stop();
    }
    currentAudioSource = null;
    clearTimeout(autoPlayInterval);
}

function handleNextWord() {
    stopPronouncing();
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    setTimeout(() => pronounceWord(), 500);
}

function autoPlay() {
    stopPronouncing();
    isStopped = false;

    // Ensure audio context is resumed when autoplay starts
    resumeAudioContext();

    async function playNextWord() {
        if (isStopped) return;

        // First, resume AudioContext to ensure it works on mobile
        resumeAudioContext(); 

        // Play the word's audio
        await pronounceWord();

        // Move to the next word after a delay
        currentWordIndex = (currentWordIndex + 1) % words.length;
        autoPlayInterval = setTimeout(playNextWord, 2000); // 2-second delay between words
    }

    // Manually resume audio context once user interacts with the autoplay button
    playNextWord(); // Start autoplay
}
