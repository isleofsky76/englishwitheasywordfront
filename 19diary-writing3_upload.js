const words = [
    {
        "korean": "경찰은/ 지하철 방화 사건을/ 조사 중이다.",
        "explanation": "1. 경찰은 (the police) / 2. 지하철 방화 사건을 (the subway arson) / 3. 조사 중이다 (are investigating)",
        "english": "The police are investigating the subway arson. (The police are currently looking into the subway arson case.)",
        "key_words": ["arson", "방화", "investigating"]
    }
,    
    {
        "korean": "그 부부는/ 경범죄인 절도 혐의로/ 기소되었다.",
        "explanation": "1. 그 부부는 (the couple) / 2. 경범죄인 절도 혐의로 (with petty larceny) / 3. 기소되었다 (were charged)",
        "english": "The couple were charged with petty larceny. (The couple were accused of committing minor theft.)",
        "key_words": ["petty larceny", "경범죄","절도","minor theft"]
    }
,    
    {
        "korean": "세 남자는/ 사기 공모 혐의로/ 기소되었다.",
        "explanation": "1. 세 남자는 (all three men) / 2. 사기 공모 혐의로 (with conspiracy to defraud) / 3. 기소되었다 (were charged)",
        "english": "All three men were charged with conspiracy to defraud. (All three men were accused of being involved in a conspiracy to commit fraud.)",
        "key_words": ["defraud", "사기 공모", "fraud"]
    }
,    
    {
        "korean": "그는/ 평생 모은 돈을/ 사기당했다.",
        "explanation": "1. 그는 (he) / 2. 평생 모은 돈을 (his life savings) / 3. 사기당했다 (was swindled out of)",
        "english": "He was swindled out of his life savings. (He lost his entire life savings due to fraud.)",
        "key_words": ["swindled", "사기당했다", "fraud"]
    }
,    
    {
        "korean": "그 그림은/ 위조품으로/ 선언되었다.",
        "explanation": "1. 그 그림은 (the painting) / 2. 위조품으로 (to be a forgery) / 3. 선언되었다 (was declared)",
        "english": "The painting was declared to be a forgery. (The artwork was officially recognized as a counterfeit.)",
        "key_words": ["forgery", "위조품","counterfeit"]
    }
,    
    {
        "korean": "그는/ 체포되어/ 공갈 혐의로/ 기소되었다.",
        "explanation": "1. 그는 (he) / 2. 체포되어 (was arrested) / 3. 공갈 혐의로 (with extortion) / 4. 기소되었다 (was charged)",
        "english": "He was arrested and charged with extortion. (He was apprehended and accused of extortion.)",
        "key_words": ["extortion", "공갈"]
    }
,    
    {
        "korean": "우리는/ 전통에/ 구속되어 있다.",
        "explanation": "1. 우리는 (we) / 2. 전통에 (by tradition) / 3. 구속되어 있다 (are shackled)",
        "english": "We are shackled by tradition. (We are bound or restricted by tradition.)",
        "key_words": ["shackled", "구속되어", "bound or restricted"]
    }
,    
    {
        "korean": "죄수는/ 벽에/ 수갑이 채워졌다.",
        "explanation": "1. 죄수는 (the prisoner) / 2. 벽에 (to the wall) / 3. 수갑이 (shackled) / 4. 채워졌다 (was fastened)",
        "english": "The prisoner was shackled to the wall. (The prisoner was handcuffed to the wall.)",
        "key_words": ["shackled", "수갑이 채워졌다","handcuffed"]
    }
,    
    {
        "korean": "나는/ 꼭대기 층에서/ 아래를 내려다봤을 때,/ 어지러움을 느꼈다.",
        "explanation": "1. 나는 (I) / 2. 꼭대기 층에서 (from the top floor) / 3. 아래를 내려다봤을 때 (when I looked down) / 4. 어지러움을 느꼈다 (felt giddy)",
        "english": "When I looked down from the top floor, I felt giddy. (I felt dizzy when I looked down from the top floor.)",
        "key_words": ["giddy", "어지러움을", "dizzy"]
    }
,    
    {
        "korean": "가뭄은/ 땅을/ 몹시 메마르고/ 불모지로 만들었다.",
        "explanation": "1. 가뭄은 (the drought) / 2. 땅을 (the land) / 3. 몹시 메마르고 (extremely dry) / 4. 불모지로 만들었다 (made barren)",
        "english": "The drought made the land extremely dry and barren. (The drought caused the land to become severely dry and infertile.)",
        "key_words": ["barren", "불모지","infertile"]
    }
    
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
    await resumeAudioContext();  // Ensure audio context is resumed for mobile

    if (!isStopped) {
        updateWord(); // Update the text for the current word

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

        await playAudio(koreanAudio); // Wait for Korean audio to finish

        await handleExplanationParts(word); // Handle explanation parts

        document.getElementById('word-pronunciation').innerHTML = word.english;

        const englishAudio = await fetchAudio(word.english, 'en-GB');
        if (englishAudio) {
            await playAudio(englishAudio); // Wait for English audio to finish
        }
    }
}

function playAudio(audioSource) {
    return new Promise((resolve) => {
        if (!audioSource) {
            resolve();
        } else {
            audioSource.start();
            audioSource.onended = () => resolve();
        }
    });
}

async function resumeAudioContext() {
    const audioContext = getAudioContext();
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }
}

async function handleExplanationParts(word) {
    const explanationParts = word.explanation.split('/');
    let currentPartIndex = 0;

    async function showNextPart() {
        if (isStopped) return;

        if (currentPartIndex < explanationParts.length) {
            const part = explanationParts[currentPartIndex].trim();

            const koreanPartWithNumber = part.split('(')[0].trim(); // Keep number for display
            const koreanPart = koreanPartWithNumber.replace(/^\d+\.\s*/, ''); // Remove number for reading
            const englishPart = part.match(/\(([^)]+)\)/)[1];

            const explanationElement = document.createElement('p');
            explanationElement.innerHTML = `${highlightKeywords(koreanPartWithNumber, word.key_words)} <span>(${highlightKeywords(englishPart, word.key_words)})</span>`;
            document.getElementById('word-explanation').appendChild(explanationElement);

            const koreanPartAudio = await fetchAudio(koreanPart, 'ko-KR');
            if (koreanPartAudio) {
                await playAudio(koreanPartAudio);

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

    async function playNextWord() {
        if (isStopped) return;
        await pronounceWord();
        currentWordIndex = (currentWordIndex + 1) % words.length;
        autoPlayInterval = setTimeout(playNextWord, 2000); // 2-second delay between words
    }

    playNextWord();
}

