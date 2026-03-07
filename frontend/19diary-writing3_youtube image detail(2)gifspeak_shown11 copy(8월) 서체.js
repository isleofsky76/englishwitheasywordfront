const words = [
    {
        "korean": "거짓말을 했다고 비난받자, 그는 사실이 자기 편이라고 반박했다.",
        "english": "When accused of lying, he retorted that the facts were on his side.",
        "explanation": "1. 거짓말을 했다고 비난받자 (When accused of lying) / 2. 그는 반박했다 (he retorted) / 3. 사실이 자기 편이라고 (that the facts were on his side.)",
        "language": "en-GB",
        "key_words": ["retorted", "반박했다"]
      },
      {
        "korean": "그녀의 영리한 반박은 방 전체를 조용하게 만들었다.",
        "english": "Her clever retort silenced the entire room.",
        "explanation": "1. 그녀의 영리한 반박은 (Her clever retort) / 2. 방 전체를 조용하게 만들었다 (silenced the entire room.)",
        "language": "en-GB",
        "key_words": ["clever retort", "silenced"]
      },
      {
        "image": "retort_meaning1.webp",
        "description": "쏘아붙이다, 응수, 반박",
        "secondDescription": "retort",
        "speaker": "Teacher",
        "language": "en-GB",
    
        "explanation1": "Retort can be a verb or a noun. As a verb, it means to reply quickly and sharply, often in defense.",
        "explanation1Image": "retort_basic.webp",
    
        "explanation2": "For example: 'When accused of lying, he retorted that the facts were on his side.'",
        "explanation2Image": "retort_argument.webp",
    
        "explanation3": "Here, retort means he answered back strongly to defend himself.",
        "explanation3Image": "retort_defense.webp",
    
        "explanation4": "As a noun, retort means a quick, clever, or angry reply.",
        "explanation4Image": "retort_noun.webp",
    
        "explanation5": "For example: 'Her clever retort silenced the entire room.'",
        "explanation5Image": "retort_clever.webp",
    
        "explanation6": "So, retort is used when someone makes a sharp comeback, either to defend or to shut down criticism.",
        "explanation6Image": "retort_summary.webp"
      },
      {
        "type": "summary",
        "title": "retort 관련 단어 정리",
        "similar_words": [
          {
            "word": "rebut",
            "past": "rebutted",
            "past_participle": "rebutted",
            "meaning": "반박하다",
            "explanation": "Rebut means to argue against something by giving evidence or reasoning.",
            "example": "The lawyer rebutted the witness’s claim."
          },
          {
            "word": "counter",
            "past": "countered",
            "past_participle": "countered",
            "meaning": "맞서다, 반격하다",
            "explanation": "Counter means to respond in opposition to something.",
            "example": "She countered his criticism with solid arguments."
          },
          {
            "word": "comeback",
            "past": "—",
            "past_participle": "—",
            "meaning": "재치 있는 말대꾸",
            "explanation": "Comeback means a witty or clever reply in conversation.",
            "example": "His funny comeback made everyone laugh."
          }
   
    ],
    // "thank_you_message": "Thank you for watching. If you enjoy this video, please subscribe and click the like button. It will be a great help for creating more content."
    }
];





let currentPairIndex = 0;
let currentAudioSource = null;
let isStopped = false;

// 타이핑 효과 함수
async function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    for (let i = 0; i < text.length; i++) {
        if (isStopped) break;
        element.innerHTML += text[i];
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('auto-play').addEventListener('click', autoPlay);
    document.getElementById('stop-pronouncing').addEventListener('click', stopPronouncing);

    preloadFirstWord();
});

function preloadFirstWord() {
    const word = words[0];

    // 한국어 문장 먼저 표시
    document.getElementById('word-definition').innerHTML = highlightKeywords(word.korean, word.key_words || [], []);
    document.getElementById('word-image').style.display = "none";

    // 영어 문장 영역 초기화 (비어있는 상태로 시작)
    const pronunciationElement = document.getElementById('word-pronunciation');
    pronunciationElement.innerHTML = '';

    // 설명 표시
    if (word.explanation) {
        const explanationElement = document.getElementById('word-explanation');
        explanationElement.innerHTML = formatExplanation(word.explanation);
    }
}

function formatExplanation(text) {
    const explanationParts = text.split('/').map(part => part.trim());
    const colors = ['#7df8df', '#FFB6C1', '#98FB98']; // explanation과 동일한 색상 배열

    // 영어 문장 전체를 저장할 변수
    let fullEnglishText = '';

    const formattedParts = explanationParts.map((part, index) => {
        const match = part.match(/^(\d+)\.\s*(.+?)\s*\(([^)]+)\)/);
        if (!match) return '';

        const number = match[1];
        const korean = match[2];
        const english = match[3];
        const currentColor = colors[index % 3];

        // 영어 문장 부분 저장
        fullEnglishText += english + ' ';

        let highlightedEnglish = english;

        // secondary_keywords에 대한 색상 적용
        if (words[0].secondary_keywords) {
            words[0].secondary_keywords.forEach((keyword, idx) => {
                const regex = new RegExp(`(${keyword})`, 'gi');
                // 현재 부분에 해당하는 키워드인 경우에만 색상 적용
                if (english.toLowerCase().includes(keyword.toLowerCase())) {
                    highlightedEnglish = highlightedEnglish.replace(
                        regex,
                        `<span style="text-decoration: underline; text-decoration-color: ${currentColor} !important; text-underline-offset: 7px; color: ${currentColor};">$1</span>`
                    );
                }
            });
        }

        // key_words에 대한 노란색 밑줄 적용 (secondary_keywords 처리 후에 적용)
        if (words[0].key_words) {
            words[0].key_words.forEach(keyword => {
                const regex = new RegExp(`(${keyword})`, 'gi');
                // 현재 부분에 해당하는 키워드인 경우에만 노란색 적용
                if (english.toLowerCase().includes(keyword.toLowerCase())) {
                    highlightedEnglish = highlightedEnglish.replace(
                        regex,
                        `<span style="text-decoration: underline; text-decoration-color: #FFD700 !important; text-underline-offset: 7px; color: #FFD700;">$1</span>`
                    );
                }
            });
        }

        return `
                            <p style="margin-bottom: 10px; position: relative; top: 20px;">
                    <span style="padding-left: 15px; display: inline-block; line-height: 1.25; margin-bottom: 0; margin-right: 5px;">${korean} :</span>
                    <span class="indented hidden-eng" style="color: ${currentColor}; display: inline-block; width: auto; text-indent: 0; padding-left: 20px; margin-left: 0; margin-top: 0; margin-bottom: 0; text-align: left; padding: 5px 20px; line-height: 1.25;">${highlightedEnglish}</span>
                </p>
        `;
    }).join('');

    // 영어 문장 전체에 밑줄 적용을 위한 준비만 하고, 화면에는 표시하지 않음
    let highlightedFullEnglish = words[0].english;
    explanationParts.forEach((part, index) => {
        const match = part.match(/^(\d+)\.\s*(.+?)\s*\(([^)]+)\)/);
        if (!match) return;

        const english = match[3].trim();
        const currentColor = colors[index % 3];
        const regex = new RegExp(`(${english})`, 'gi');
        
        highlightedFullEnglish = highlightedFullEnglish.replace(
            regex,
            `<span style="color: white;">$1</span>`
        );
    });

    // 영어 문장은 나중에 표시되므로 여기서는 빈 문자열로 설정
    const englishText = document.getElementById('word-pronunciation');
    if (englishText) {
        englishText.innerHTML = '';
    }

    return formattedParts;
}

// ✅ `no-audio` 태그가 있는 부분은 음성 재생을 제외하는 함수
function removeNoAudioText(text) {
    return text.replace(/<span class='no-audio'>.*?<\/span>/g, '').trim();
}

function autoPlay() {
    isStopped = false;
    setTimeout(() => {
        if (!isStopped) {
            pronouncePair();
        }
    }, 2000); // 3초 대기 후 읽기 시작
}

async function pronounceFirstPair() {
    console.log('Starting pronounceFirstPair');
    try {
        const word = words[currentPairIndex];
        if (!word) {
            console.error('No word data found');
            return;
        }

        // 1. 먼저 explanation 처리
        console.log('Starting explanation parts');
        await handleExplanationParts(word);
        console.log('Completed explanation parts');

        // 2. 영어 텍스트 표시 및 음성 재생 (US, UK 순서로)
        console.log('Setting up English text display');
        const englishText = document.getElementById('word-pronunciation');
        if (!englishText) {
            console.error('Could not find word-pronunciation element');
            return;
        }

        // 영어 텍스트 표시 (간단한 방식)
        console.log('Original English:', word.english);
        console.log('Key words:', word.key_words);
        console.log('Setting up English text display for JSON 1');
        englishText.style.display = 'block';
        englishText.style.visibility = 'visible';
        englishText.innerHTML = `<span id="english-sentence" style="color: white; font-family: 'Poppins', sans-serif; font-size: 26px; font-weight: 400; line-height: 1.4;"></span>`;
        const englishSpan = document.getElementById('english-sentence');
        
        // english-sentence에 강력한 우선순위로 스타일 설정
        if (englishSpan) {
            englishSpan.style.setProperty('margin-top', '70px', 'important');
            englishSpan.style.setProperty('display', 'block', 'important');
            englishSpan.style.setProperty('position', 'relative', 'important');
            englishSpan.style.setProperty('z-index', '1000', 'important');
        }
        
        // 타이핑 효과로 영어 텍스트 표시 (키워드만 노란색)
        console.log('Starting typing effect for English text');
        const highlightedEnglish = highlightKeywords(word.english, word.key_words || [], []);
        await typeText(englishSpan, word.english, 50);
        englishSpan.innerHTML = highlightedEnglish;
        console.log('English text typing completed for JSON 1:', word.english);

        // 핵심 문장 표시 (연한 민트색, 16px)
        console.log('Checking for key_sentence:', word.key_sentence);
        if (word.key_sentence) {
            console.log('Creating key sentence div');
            const keySentenceDiv = document.createElement('div');
            keySentenceDiv.id = 'key-sentence';
            keySentenceDiv.style.cssText = `
                color: #7df8df;
                font-size: 16px;
                margin-top: 10px;
                text-align: center;
                opacity: 1;
                display: block;
                visibility: visible;
                position: relative;
                z-index: 1000;
            `;
            keySentenceDiv.textContent = word.key_sentence;
            
            // word-pronunciation 요소 다음에 추가
            const wordPronunciation = document.getElementById('word-pronunciation');
            if (wordPronunciation && wordPronunciation.parentNode) {
                wordPronunciation.parentNode.insertBefore(keySentenceDiv, wordPronunciation.nextSibling);
                console.log('Key sentence div inserted after word-pronunciation');
            } else {
                document.body.appendChild(keySentenceDiv);
                console.log('Key sentence div added to body');
            }
            
            console.log('Key sentence text:', keySentenceDiv.textContent);
            console.log('Key sentence div added to DOM');
        } else {
            console.log('No key_sentence found in word data');
        }

        // US 발음 재생 (노란색)
        console.log('Fetching US audio');
        const usAudioFirst = await fetchAudio(word.english, 'en-US-Chirp-HD-D');
        if (!usAudioFirst) {
            console.error('Failed to create US audio');
            return;
        }
        console.log('US audio created');

        console.log('Starting US audio playback');
        try {
        await usAudioFirst.play();
        await new Promise(resolve => usAudioFirst.onended = resolve);
        console.log('US audio completed');
        } catch (error) {
            console.error('Error playing US audio:', error);
        }

        // 0.2초 대기
        console.log('Waiting 0.2 seconds before UK audio');
        await new Promise(resolve => setTimeout(resolve, 200));

        // UK 발음 재생 (흰색 유지)
        console.log('Fetching UK audio');
        // if (englishSpan) {
        //     englishSpan.style.color = '#7df8df'; // 연한 민트색으로 변경
        // }
        const ukAudio = await fetchAudio(word.english, 'en-US-Chirp-HD-D');
        if (!ukAudio) {
            console.error('Failed to create UK audio');
            return;
        }
        console.log('UK audio created');

        console.log('Starting UK audio playback');
        try {
        await ukAudio.play();
        await new Promise(resolve => ukAudio.onended = resolve);
        console.log('UK audio completed');
        } catch (error) {
            console.error('Error playing UK audio:', error);
        }

        // 2초 대기 후 다음 JSON으로 이동
        console.log('Waiting 2 seconds before moving to next JSON');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 다음 JSON으로 이동은 updatePair에서 처리
        console.log('pronounceFirstPair completed');

    } catch (error) {
        console.error('Error in pronounceFirstPair:', error);
    }
}

/////////////////////////////////////////////////////////////////////////////////////////
function updatePair() {
    // ✅ 첫 번째 항목이면 화면을 지우지 말고 그대로 유지
    if (currentPairIndex !== 0) {
        clearText();
    }

    if (currentPairIndex >= words.length) {
        console.log("✅ 모든 JSON이 실행 완료됨. 자동 종료.");
        stopPronouncing();
        return;
    }

    const word = words[currentPairIndex];
    console.log(`Processing JSON ${currentPairIndex + 1}:`, word);

    // walking person 이미지 설정
    const walkingPerson1 = document.getElementById('walking-person-1');
    const walkingPerson2 = document.getElementById('walking-person-2');
    const walkingPerson3 = document.getElementById('walking-person-3');

    // 모든 walking person 이미지 숨기기
    if (walkingPerson1) walkingPerson1.style.display = "none";
    if (walkingPerson2) walkingPerson2.style.display = "none";
    if (walkingPerson3) walkingPerson3.style.display = "none";

    // 이미지 관련 요소들 초기화
    const wordImage = document.getElementById('word-image');
    const displayedImage = document.getElementById('displayed-image');
    const imageDescription = document.getElementById('image-description');
    
    if (wordImage) {
        wordImage.style.display = "none";
        wordImage.style.visibility = "hidden";
    }
    if (displayedImage) {
        displayedImage.src = "";
        displayedImage.style.display = "none";
        displayedImage.style.visibility = "hidden";
    }
    if (imageDescription) {
        imageDescription.innerHTML = "";
        imageDescription.style.display = "none";
        imageDescription.style.visibility = "hidden";
    }

    // ── JSON 1 only ──
    if (currentPairIndex === 0 && word.korean && !word.image && !word.vocabulary && !word.summary) {
        console.log("✅ JSON 1 실행 (일반 문장)");
        
        // 한국어와 explanation만 표시
        document.getElementById('word-definition').innerHTML = `<span style="color: white; font-size: 26px; font-weight: 400; line-height: 1.35;">${word.korean}</span>`;
        document.getElementById('word-explanation').innerHTML = formatExplanation(word.explanation);
        
        // 영어 문장 영역은 나중에 표시되므로 비워두기
        document.getElementById('word-pronunciation').innerHTML = '';
        
        // ✅ 이전 JSON 2에서 남아있는 이미지 숨기기
        document.getElementById('word-image').style.display = "none";

        // JSON 1의 경우 pronounceFirstPair 함수를 사용하여 explanation 순서에 따라 영작
        setTimeout(() => {
            pronounceFirstPair();
            // pronounceFirstPair 완료 후 다음 JSON으로 이동
            setTimeout(() => {
                currentPairIndex++;
                updatePair();
            }, 5000); // 5초 후 다음 JSON으로 이동
        }, 1000);
        return;
    }

    // ── JSON 2 & 3 ──
    else if (currentPairIndex > 0 && word.korean && !word.image && !word.vocabulary && !word.summary) {
        console.log(`✅ JSON ${currentPairIndex + 1} 실행 (일반 문장)`);
        
        // 한국어와 explanation만 표시
        document.getElementById('word-definition').innerHTML = `<span style="color: white; font-size: 26px; font-weight: 400; line-height: 1.4;">${word.korean}</span>`;
        document.getElementById('word-explanation').innerHTML = formatExplanation(word.explanation);
        
        // 영어 문장 영역은 나중에 표시되므로 비워두기
        document.getElementById('word-pronunciation').innerHTML = '';
        
        // ✅ 이전 JSON에서 남아있는 이미지 숨기기
        document.getElementById('word-image').style.display = "none";

        // JSON 2, 3은 pronouncePair에서 처리
        console.log(`JSON ${currentPairIndex + 1}은 pronouncePair에서 처리됨`);
        setTimeout(() => {
            pronouncePair();
        }, 1000);
        return;
    }

    // ✅ JSON 4 실행 (이미지 포함 설명) - image 필드가 있는 경우
   if (word.image) {
        console.log(`✅ JSON 4 실행 (이미지 포함 설명): ${word.image}`);
        
        // 영어작문 JSON이 끝나고 이미지 JSON이 시작될 때 vocab-section 숨기기
        const vocabSection = document.querySelector('.word-box.vocab-section');
        if (vocabSection) {
            vocabSection.style.opacity = '0';
            setTimeout(() => {
                vocabSection.style.display = 'none';
            }, 300);
        }
    
    // walking person 이미지들 모두 숨기기
    const walkingPerson1 = document.getElementById('walking-person-1');
    const walkingPerson2 = document.getElementById('walking-person-2');
    const walkingPerson3 = document.getElementById('walking-person-3');
    
    if (walkingPerson1) walkingPerson1.style.display = "none";
    if (walkingPerson2) walkingPerson2.style.display = "none";
    if (walkingPerson3) walkingPerson3.style.display = "none";
    
    const descEl = document.getElementById('word-definition');
    const secondDescEl = document.getElementById('image-description');
    const imageElement = document.getElementById('displayed-image');
    const imageContainer = document.getElementById('word-image');

    // 이미지 요소 존재 확인
    if (!imageElement) {
        console.error('displayed-image element not found');
        return;
    }
    if (!imageContainer) {
        console.error('word-image element not found');
        return;
    }

    const sanitizedDescription = word.description.replace(/<span class='no-audio'>.*?<\/span>/g, '').trim();
    const sanitizedSecondDescription = word.secondDescription.replace(/<span class='no-audio'>.*?<\/span>/g, '').trim();

    // speaker 필드에 따라 한 명이 두 설명을 모두 말하도록 수정
    const speaker = word.speaker || "Daniel";
    const isMale = speaker === "Daniel";
    const dialogueClass = isMale ? "daniel-dialogue" : "olivia-dialogue";

    // 첫 번째 설명
    descEl.innerHTML = `
        <div class="dialogue-paragraph ${dialogueClass}" style="text-align: center; display: flex; justify-content: center; align-items: center; width: 100%; margin-left: -15px; position: relative; top: -20px;">
            <span class="dialogue-text" style="font-size: 40px; font-weight: 600; text-align: center; white-space: pre-line;"> ${sanitizedDescription.replace('손가락을 깍지 끼라고 명령했다', '손가락을 깍지 끼라고\n명령했다')}</span>
        </div>
    `;

    // 두 번째 설명도 같은 화자가 말함 (처음에는 숨김)
    secondDescEl.innerHTML = `
        <div class="dialogue-paragraph ${dialogueClass}" style="text-align: center; display: flex; justify-content: center; align-items: center; width: 100%; margin-left: -70px; margin-top: -260px; visibility: hidden;">
                <span class="dialogue-text" style="font-size: 40px; font-weight: 600; text-align: center;"> ${highlightSecondDescriptionWords(sanitizedSecondDescription)}</span>
        </div>
    `;
  
    // 이미지 설정 및 표시
    console.log(`Setting image source to: ${word.image}`);
    
    // 이미지 경로 확인 및 수정
    let imagePath = word.image;
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
        imagePath = `./${imagePath}`;
    }
    
    imageElement.src = imagePath;
    imageElement.style.display = "block";
    imageElement.style.visibility = "visible";
    imageElement.style.width = "450px";
    imageElement.style.height = "300px";
    imageElement.style.objectFit = "contain";

    imageContainer.style.display = "block";
    imageContainer.style.visibility = "visible";
    
    // image-description 요소도 표시
    secondDescEl.style.display = "block";
    secondDescEl.style.visibility = "visible";
    
    // 이미지 로딩 확인
    imageElement.onload = () => {
        console.log(`Image loaded successfully: ${imagePath}`);
    };
    
    imageElement.onerror = () => {
        console.error(`Failed to load image: ${imagePath}`);
        // 이미지 로드 실패 시 기본 이미지 또는 플레이스홀더 표시
        imageElement.style.backgroundColor = "#f0f0f0";
        imageElement.style.display = "flex";
        imageElement.style.alignItems = "center";
        imageElement.style.justifyContent = "center";
        imageElement.style.fontSize = "16px";
        imageElement.style.color = "#666";
        imageElement.innerHTML = `이미지를 찾을 수 없습니다: ${word.image}`;
        console.log('Image load failed, showing placeholder');
    };
    
    document.querySelectorAll('.no-audio').forEach(el => {
        el.style.display = 'inline';
        el.style.fontStyle = 'normal';
    });

    // 👇 이 부분이 하이라이트 효과 코드입니다
    function highlightActive(el) {
        el.classList.add('highlighted-dialogue');
        el.style.color = '#FFD700'; // 노란색으로 변경
    }

    function removeHighlight(el) {
        el.classList.remove('highlighted-dialogue');
        el.style.color = 'white'; // 원래 색상으로 복원
    }

    // ✅ 이미지 설명은 한 번만 재생되도록 수정
    // highlightActive(descEl); // 첫 번째 대화 하이라이트 제거

    // JSON 4에 따른 언어 설정
    let firstLanguage = 'ko-KR-Chirp3-HD-Kore';  // 한국어 여성
            let secondLanguage = 'en-US-Chirp-HD-D'; // 영어 GB

    fetchAudio(sanitizedDescription, firstLanguage).then(audio1 => {
        if (!audio1) return;

            try {
                audio1.play();
        audio1.onended = () => {
            // removeHighlight(descEl); // 첫 번째 대화 하이라이트 제거 (이미 제거됨)
            
            // 영어 텍스트를 보이게 하고 하이라이트
            const englishDiv = secondDescEl.querySelector('.dialogue-paragraph');
            if (englishDiv) {
                englishDiv.style.visibility = 'visible';
            }
            // highlightActive(secondDescEl); // 두 번째 대화 하이라이트 제거

            // 타이핑 효과로 영어 텍스트 표시
            const englishSpan = secondDescEl.querySelector('.dialogue-text');
            if (englishSpan) {
                englishSpan.innerHTML = ''; // 초기화
                typeText(englishSpan, sanitizedSecondDescription, 120).then(() => {
                            // 타이핑 완료 후 음성 3번 반복 재생
                            const playSecondAudio = async () => {
                                const colors = ['#FFD700', '#4ECDC4', '#FF8C42']; // 노란색, 청록색, 주황색
                                
                                for (let i = 0; i < 3; i++) {
                                    console.log(`Playing secondDescription audio round ${i + 1}/3`);
                                    
                                    // 현재 반복에 맞는 색으로 텍스트 변경
                                    const englishSpan = secondDescEl.querySelector('.dialogue-text');
                                    if (englishSpan) {
                                        const color = colors[i];
                                        englishSpan.innerHTML = `<span style="color: ${color}; font-weight: normal;">${sanitizedSecondDescription}</span>`;
                                    }
                                    
                                    const audio2 = await fetchAudio(sanitizedSecondDescription, secondLanguage);
                                    if (!audio2) continue;

                                    try {
                                        await audio2.play();
                                        await new Promise(resolve => audio2.onended = resolve);
                                        console.log(`SecondDescription audio round ${i + 1} completed`);
                                        
                                        // 마지막 반복이 아니면 0.5초 대기
                                        if (i < 2) {
                                            await new Promise(resolve => setTimeout(resolve, 200));
                                        }
                                    } catch (error) {
                                        console.error('Error playing second audio:', error);
                                    }
                                }
                                
                                // 3번 재생 완료 후 secondDescription 숨기기
                                const englishSpan = secondDescEl.querySelector('.dialogue-text');
                                if (englishSpan) {
                                    englishSpan.style.opacity = '0';
                                    setTimeout(() => {
                                        englishSpan.style.display = 'none';
                                    }, 300);
                                }
                                
                                // 3번 재생 완료 후 explanation 처리
                    setTimeout(() => {
                        // explanation1과 explanation2 처리
                        if (word.explanation1 || word.explanation2) {
                            handleExplanations(word);
                        } else {
                            setTimeout(() => {
                                // JSON 4 (마지막 JSON)이면 다음으로 이동하지 않음
                                if (currentPairIndex < words.length - 1) {
                                    currentPairIndex++;
                                    updatePair(); // 다음 JSON 실행
                                } else {
                                    console.log("✅ JSON 4 완료. 화면 유지.");
                                    stopPronouncing(); // 자동 종료 (텍스트는 유지)
                                }
                            }, 1000);
                        }
                                }, 500); // 0.7초 + 0.5초 대기 (총 1.2초)
                        };
                            
                            playSecondAudio();
                });
            }
        };
            } catch (error) {
                console.error('Error playing first audio:', error);
            }
    });

    return;
    }

    // ✅ JSON 3 실행 (단어장) - vocabulary 필드가 있는 경우
    if (word.vocabulary) {
        console.log("✅ JSON 3 실행 (단어장)");
        
        const vocabContainer = document.getElementById('word-definition');
        vocabContainer.innerHTML = "<strong class='word-list-title'>📌Summary:</strong><ul>";
    
        word.vocabulary.forEach(item => {
            vocabContainer.innerHTML += `
                <li class="vocab-item">
                    <span>${item.korean}</span> 
                    <br>
                    <span class="hidden-english vocab-english">
                        ${highlightKeywords(
                            item.english,
                            item.key_words || [],
                            item.secondary_keywords || []
                        )}
                    </span>
                </li>`;
        });
    
        vocabContainer.innerHTML += "</ul>";
    
        readVocabularyListWithReveal(word.vocabulary);
        return;
    }
    
    // ✅ summary 처리 - summary 필드가 있는 경우
    if (word.summary) {
        console.log("✅ Summary 실행");
        
        // 이미지 관련 요소들 모두 숨기기
        const wordImage = document.getElementById('word-image');
        const displayedImage = document.getElementById('displayed-image');
        const imageDescription = document.getElementById('image-description');
        
        if (wordImage) {
            wordImage.style.display = "none";
            wordImage.style.visibility = "hidden";
        }
        if (displayedImage) {
            displayedImage.src = "";
            displayedImage.style.display = "none";
            displayedImage.style.visibility = "hidden";
        }
        if (imageDescription) {
            imageDescription.innerHTML = "";
            imageDescription.style.display = "none";
            imageDescription.style.visibility = "hidden";
        }

        // walking person GIF도 숨기기
        if (walkingPerson1) {
            walkingPerson1.style.display = "none";
            walkingPerson1.style.visibility = "hidden";
        }
        if (walkingPerson2) {
            walkingPerson2.style.display = "none";
            walkingPerson2.style.visibility = "hidden";
        }
        if (walkingPerson3) {
            walkingPerson3.style.display = "none";
            walkingPerson3.style.visibility = "hidden";
        }

        const summaryContainer = document.getElementById('word-definition');
        summaryContainer.innerHTML = "<strong class='summary-title'>📝 Scene:</strong><ul>";
    
        word.summary.forEach(item => {
            summaryContainer.innerHTML += `
                  <li class="summary-item">
                    <span class="summary-english" style="color: white; line-height: 2;">
                        ${highlightKeywords(item.english, [], [])}
                    </span>
                 </li>`;
        });
    
        readSummaryList(word.summary);
        return;
    }
    
    // ✅ summary 타입 처리 - type이 "summary"인 경우
    if (word.type === 'summary') {
        console.log("✅ Summary 타입 실행");
        
        // 기존 방식으로 텍스트 표시
        const wordDefinition = document.getElementById('word-definition');
        const wordExplanation = document.getElementById('word-explanation');
        const wordPronunciation = document.getElementById('word-pronunciation');
        
        // 자막 완전히 숨기기
        const subtitleDiv = document.getElementById('subtitle');
        if (subtitleDiv) {
            subtitleDiv.style.opacity = '0';
            subtitleDiv.style.display = 'none';
            subtitleDiv.textContent = '';
        }
        
        // subtitle-div도 숨기기
        const subtitleDiv2 = document.getElementById('subtitle-div');
        if (subtitleDiv2) {
            subtitleDiv2.style.opacity = '0';
            subtitleDiv2.style.display = 'none';
            subtitleDiv2.textContent = '';
        }
        
        // Similar Words 섹션 표시
        if (word.similar_words && word.similar_words.length > 0) {
            let similarWordsHTML = '<div style="color: #FFD700; font-size: 28px; font-weight: bold; margin-bottom: 40px;">유의어</div>';
            
                        // 모든 단어를 먼저 표시
            word.similar_words.forEach((wordItem, index) => {
                const number = index + 1;
                similarWordsHTML += `
                    <div style="margin-bottom: 35px;">
                        <span style="color: #FFD700; font-size: 25px; font-weight: bold;">${number}. </span>
                        <strong style="color: #FFD700; font-size: 25px;" data-word-index="${index}">${wordItem.word}</strong> 
                        <span style="color: #FFD700; font-size: 25px;"> : </span>
                        <span style="color: #FFB6C1; font-size: 25px;">${wordItem.meaning}</span>
                        <br><span style="color: #87CEEB; font-size: 20px;">(${wordItem.past || ''}, ${wordItem.past_participle || ''})</span>
                        ${wordItem.example ? `<br><span style="color: #98FB98; font-style: italic; font-size: 25px;">${wordItem.example}</span>` : ''}
                    </div>
                `;
            });
            
            // 모든 단어를 한번에 표시
            wordDefinition.innerHTML = similarWordsHTML;
            
            // 그 다음에 각 단어의 설명을 순차적으로 음성 재생
            async function playExplanationsSequentially() {
                for (let index = 0; index < word.similar_words.length; index++) {
                    const wordItem = word.similar_words[index];
                    
                    // 현재 단어에 밑줄 추가
                    const currentWordElement = document.querySelector(`[data-word-index="${index}"]`);
                    if (currentWordElement) {
                        currentWordElement.style.textDecoration = 'underline';
                        currentWordElement.style.textDecorationColor = '#FFD700';
                        currentWordElement.style.textDecorationThickness = '3px';
                        currentWordElement.style.textUnderlineOffset = '8px';
                    }
                    
                    // 영어 설명 음성 재생 (문장별로 나누어서 재생)
                    if (wordItem.explanation) {
                        const sentences = wordItem.explanation.split('. ').filter(sentence => sentence.trim() !== '');
                        
                        for (let i = 0; i < sentences.length; i++) {
                            const sentence = sentences[i].trim();
                            if (sentence) {
                                // 마침표가 없으면 추가
                                const sentenceWithPeriod = sentence.endsWith('.') ? sentence : sentence + '.';
                                const explanationAudio = await fetchAudio(sentenceWithPeriod, 'en-US-Chirp-HD-D');
                                
                                if (explanationAudio) {
                                    try {
                                        await explanationAudio.play();
                                        await new Promise(resolve => explanationAudio.onended = resolve);
                                        
                                        // 마지막 문장이 아니면 0.8초 대기
                                        if (i < sentences.length - 1) {
                                            await new Promise(resolve => setTimeout(resolve, 800));
                                        }
                                    } catch (error) {
                                        console.error('Error playing explanation audio:', error);
                                    }
                                }
                            }
                        }
                    }
                    
                    // 현재 단어의 밑줄 제거
                    if (currentWordElement) {
                        currentWordElement.style.textDecoration = 'none';
                    }
                    
                    // 다음 단어로 넘어가기 전 0.2초 대기
                    if (index < word.similar_words.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 200));
                    }
                }
            }
            
            // 0.5초 후에 설명 음성 재생 시작
            setTimeout(async () => {
                await playExplanationsSequentially();
                
                // 3번 explanation 완료 후 0.5초 대기
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // 모든 설명 완료 후 감사 메시지 재생
                if (word.thank_you_message) {
                    const thankYouAudio = await fetchAudio(word.thank_you_message, 'en-US-Chirp-HD-D');
                    if (thankYouAudio) {
                        try {
                            await thankYouAudio.play();
                            await new Promise(resolve => thankYouAudio.onended = resolve);
                            

                            
                        } catch (error) {
                            console.error('Error playing thank you message:', error);
                        }
                    }
                }
            }, 500);
        }
        
        // 0.5초 후 다음 JSON으로 진행
        setTimeout(() => {
            currentPairIndex++;
            if (currentPairIndex < words.length) {
                clearText();
                pronouncePair();
            }
        }, 500);
        
        return;
    }

    // ✅ 기본 처리 (fallback)
    console.log("✅ 기본 처리 실행");
    document.getElementById('word-definition').innerHTML = highlightKeywords(word.korean, [], []);
    document.getElementById('word-image').style.display = "none";

    // english 필드가 있으면 handleEnglishPronunciation 실행
    if (word.english && word.english.trim() !== "") {
        setTimeout(() => {
            handleEnglishPronunciation(word);
        }, 1000);
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////
// 단어장을 읽으면서 영어 단어를 하나씩 노출하는 함수
// ✅ 단어장 자동 음성 실행 함수 (단어별로 음성 실행)
async function readVocabularyListWithReveal(vocabulary) {
    const vocabContainer = document.getElementById('word-definition');
    const listItems = vocabContainer.querySelectorAll("li");

    for (let i = 0; i < vocabulary.length; i++) {
        if (isStopped) return;

        const item = vocabulary[i];
        const englishSpan = listItems[i].querySelector(".hidden-english");

        // 현재 문장을 흰색으로 변경
        if (englishSpan) {
            englishSpan.style.visibility = "visible";
            englishSpan.style.color = "white";
        }

        // 한글 단어 음성 실행
        if (item.korean && item.korean.trim() !== "") {
            const koreanAudio = await fetchAudio(item.korean, 'ko-KR-Chirp3-HD-Kore');
            if (koreanAudio) {
                try {
                    await koreanAudio.play();
                await new Promise(resolve => koreanAudio.onended = resolve);
                } catch (error) {
                    console.error('Error playing Korean audio:', error);
                }
            }
        }

        // 영어 단어 음성 실행 (UK만)
        if (item.english && item.english.trim() !== "") {
            const englishAudio = await fetchAudio(item.english, 'en-US-Chirp-HD-D');
            if (englishAudio) {
                try {
                    await englishAudio.play();
                await new Promise(resolve => englishAudio.onended = resolve);
                } catch (error) {
                    console.error('Error playing English audio:', error);
                }
            }
        }

        // 현재 문장을 다시 흰색으로 변경
        if (englishSpan) {
            englishSpan.style.color = "white";
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("Vocabulary list reading completed.");
    setTimeout(moveToNextPair, 1000);
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function pronouncePair() {
    if (isStopped) return;
    const word = words[currentPairIndex];

    // summary 타입인 경우 updatePair에서 처리
    if (word.type === 'summary') {
        console.log('pronouncePair에서 summary 타입 발견, updatePair 호출');
        updatePair();
        return;
    }

    // JSON 4인 경우에만 updatePair 호출
    if (word.image) {
        updatePair();
        return;
    }

    setTimeout(async () => {
        // ✅ JSON 1, 2, 3인 경우 (korean 필드가 있고 image, vocabulary, summary가 없는 경우)
        if (word.korean && !word.image && !word.vocabulary && !word.summary) {
            console.log(`✅ pronouncePair에서 JSON ${currentPairIndex + 1} 처리`);
            
            // JSON 1, 2, 3의 경우 updatePair에서 이미 처리되므로 여기서는 음성만 처리
            if (!isStopped && word.explanation) {
                // 영어 문장 영역 초기화
                const englishText = document.getElementById('word-pronunciation');
                if (englishText) {
                    englishText.innerHTML = '';
                }

                // explanation 처리
                await handleExplanationParts(word);

                // ✅ 마지막으로 english 전체 문장 음성 재생 추가
                if (!isStopped && word.english && word.english.trim() !== "") {
                    try {
                        // 영어 문장 표시 (타이핑 효과)
                        console.log(`Setting up English text display for JSON ${currentPairIndex + 1}`);
                        englishText.style.display = 'block';
                        englishText.style.visibility = 'visible';
                        englishText.innerHTML = `<span id="english-sentence" style="color: white; font-family: 'Poppins', sans-serif; font-size: 26px; font-weight: 400; line-height: 1.4;"></span>`;
                        const englishSpan = document.getElementById('english-sentence');
                        
                        // english-sentence에 강력한 우선순위로 스타일 설정
                        if (englishSpan) {
                            englishSpan.style.setProperty('margin-top', '20px', 'important');
                            englishSpan.style.setProperty('display', 'block', 'important');
                            englishSpan.style.setProperty('position', 'relative', 'important');
                            englishSpan.style.setProperty('z-index', '1000', 'important');
                        }
                        
                        // 타이핑 효과로 영어 텍스트 표시 (키워드만 노란색)
                        console.log('Starting typing effect for English text');
                        const highlightedEnglish = highlightKeywords(word.english, word.key_words || [], []);
                        await typeText(englishSpan, word.english, 50);
                        englishSpan.innerHTML = highlightedEnglish;
                        console.log(`English text typing completed for JSON ${currentPairIndex + 1}:`, word.english);

                        // UK 발음 재생 (흰색)
                        console.log('Starting UK audio for English text');
                        const ukAudio = await fetchAudio(word.english, 'en-US-Chirp-HD-D');
                        if (!ukAudio) {
                            console.error('Failed to create UK audio');
                            return;
                        }
                        console.log('UK audio created');

                        console.log('Starting UK audio playback');
                        try {
                        await ukAudio.play();
                        await new Promise(resolve => ukAudio.onended = resolve);
                        console.log('UK audio completed');
                        } catch (error) {
                            console.error('Error playing UK audio:', error);
                        }

                        // 0.5초 대기
                        console.log('Waiting 0.5 seconds before US audio');
                        await new Promise(resolve => setTimeout(resolve, 500));

                        // US 발음 재생 (흰색)
                        console.log('Starting US audio for English text');
                        const usAudio = await fetchAudio(word.english, 'en-US-Chirp-HD-D');
                        if (!usAudio) {
                            console.error('Failed to create US audio');
                            return;
                        }
                        console.log('US audio created');

                        console.log('Starting US audio playback');
                        try {
                        await usAudio.play();
                        await new Promise(resolve => usAudio.onended = resolve);
                        console.log('US audio completed');
                        } catch (error) {
                            console.error('Error playing US audio:', error);
                        }
                    } catch (error) {
                        console.error('Error playing English audio:', error);
                    }
                }

                // 다음으로 이동
                console.log(`JSON ${currentPairIndex + 1} 완료, 다음 JSON으로 이동`);
                currentPairIndex++;
                updatePair();
            }
        } else {
            // JSON 4인 경우 기존 로직 처리
            const koreanAudio = await fetchAudio(word.korean, 'ko-KR-Chirp3-HD-Kore');
            if (koreanAudio) {
                try {
                    await koreanAudio.play();
                koreanAudio.onended = async () => {
                    if (!isStopped && word.explanation) {
                        await handleExplanationParts(word);
                    }
                };
                } catch (error) {
                    console.error('Error playing Korean audio:', error);
                }
            }
        }
    }, 500); // 간격 유지
}


//////////////////////////////////////////////////////////////////////////////////
// Explanation을 동적으로 추가하고 들여쓰기 적용하는 함수
async function handleExplanationParts(word) {
    const explanationParts = word.explanation.split('/');
    let engSpans = document.querySelectorAll('.hidden-eng');
    const koreanText = document.getElementById('word-definition');
    const englishText = document.getElementById('word-pronunciation');
    let index = 0;

    console.log(`Found ${engSpans.length} engSpans elements`);
    engSpans.forEach((span, i) => {
        console.log(`engSpan[${i}]:`, span);
    });

    // 만약 engSpans가 없으면 잠시 대기 후 다시 시도
    if (engSpans.length === 0) {
        console.log('No engSpans found, waiting for DOM update...');
        await new Promise(resolve => setTimeout(resolve, 100));
        engSpans = document.querySelectorAll('.hidden-eng');
        console.log(`After waiting, found ${engSpans.length} engSpans elements`);
    }

    // 초기 한국어 텍스트 저장
    const originalKoreanText = koreanText.innerHTML;
    const colors = ['#7df8df', '#FFB6C1', '#98FB98'];

    // 영어 문장 전체에 밑줄 적용을 위한 준비
    let highlightedFullEnglish = word.english;
    explanationParts.forEach((part, index) => {
        const match = part.match(/^(\d+)\.\s*(.+?)\s*\(([^)]+)\)/);
        if (!match) return;

        const english = match[3].trim();
        const currentColor = colors[index % 3];
        const regex = new RegExp(`(${english})`, 'gi');
        
        highlightedFullEnglish = highlightedFullEnglish.replace(
            regex,
            `<span style="color: white;">$1</span>`
        );
    });

    for (let part of explanationParts) {
        if (isStopped) break;

        const match = part.trim().match(/^(\d+)\.\s*(.+?)\s*\(([^)]+)\)\.?$/);
        if (!match) continue;

        const number = match[1];
        const koreanPart = match[2].trim();
        const englishPart = match[3].trim();
        const currentColor = colors[index % 3];

        // 한국어 텍스트에 밑줄 추가
        if (koreanPart) {
            console.log(`Highlighting Korean part: "${koreanPart}" with color: ${currentColor}`);
            let highlightedKorean = originalKoreanText;
            
            // 정규식에서 특수문자 이스케이프
            const escapedKoreanPart = koreanPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedKoreanPart})`, 'g');
            
            highlightedKorean = highlightedKorean.replace(
                regex,
                `<span style="color: white; text-decoration: underline; text-decoration-color: ${currentColor}; text-underline-offset: 7px; text-decoration-thickness: 2px;">$1</span>`
            );
            koreanText.innerHTML = highlightedKorean;
            console.log('Korean text highlighted successfully');

            // 한국어 음성 재생
            const koreanAudio = await fetchAudio(koreanPart, 'ko-KR-Chirp3-HD-Kore');
            if (koreanAudio) {
                await koreanAudio.play();
                await new Promise(resolve => koreanAudio.onended = resolve);
            }
        }

        if (isStopped) break;

        // 영어 표시 및 음성
        if (englishPart) {
            console.log(`Processing English part ${index + 1}: "${englishPart}"`);

            if (engSpans[index]) {
                console.log(`Found engSpan[${index}], displaying English text`);
                engSpans[index].classList.add('visible');
                engSpans[index].style.color = currentColor;
                engSpans[index].innerHTML = ''; // 초기화
                
                // 타이핑 효과로 영어 텍스트 표시
                await typeText(engSpans[index], englishPart, 50); // 50ms 간격으로 타이핑
            } else {
                console.warn(`engSpan[${index}] not found`);
            }

            // UK 발음만 재생
            console.log(`Fetching UK audio for: "${englishPart}"`);
            const ukAudio = await fetchAudio(englishPart, 'en-US-Chirp-HD-D');
            if (ukAudio) {
                console.log('UK audio created, starting playback');
                try {
                await ukAudio.play();
                await new Promise(resolve => ukAudio.onended = resolve);
                    console.log('UK audio completed');
                } catch (error) {
                    console.error('Error playing UK audio:', error);
                }
            } else {
                console.error('Failed to create UK audio');
            }

            index++;
        }

        // 다음 explanation으로 넘어가기 전에 밑줄 제거 (즉시)
        koreanText.innerHTML = originalKoreanText;
    }

    // explanation이 모두 끝난 후 영어 텍스트 표시 제거 (pronouncePair에서 처리)
    // if (!isStopped) {
    //     await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 대기 후 영어 문장 표시
        
    //     console.log('Displaying full English text after explanation parts');
    //     englishText.style.display = 'block';
    //     englishText.style.visibility = 'visible';
    //     englishText.innerHTML = `<span id="english-sentence" style="color: white; font-size: 25px;"></span>`;
    //     const englishSpan = document.getElementById('english-sentence');
        
    //     // 타이핑 효과로 전체 영어 텍스트 표시
    //     console.log('Starting typing effect for full English text');
    //     await typeText(englishSpan, word.english, 50);
    //     console.log('Full English text typing completed:', word.english);
    // }
}

// 타이핑 효과 함수
async function typeText(element, text, speed = 50) {
    let currentText = '';
    
    // secondDescription인지 확인 (element의 부모가 secondDescEl인지 확인)
    const isSecondDescription = element.closest('#image-description') !== null;
    
    for (let i = 0; i < text.length; i++) {
        if (isStopped) break;
        
        const char = text[i];
        currentText += char;
        
        // 타이핑 중에는 색을 적용하지 않고 원본 텍스트만 표시
        element.innerHTML = currentText;
        
        // 글자 사이 간격
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    // 타이핑 완료 후 secondDescription인 경우 색을 적용
    if (isSecondDescription) {
        element.innerHTML = highlightSecondDescriptionWords(text);
    }
}

// explanation1과 explanation2를 자막으로 표시하고 음성 재생하는 함수
async function handleExplanations(word) {
    try {
        // ✅ 자막 초기화 (이전 secondDescription 제거)
        const existingSubtitle = document.getElementById('subtitle-div');
        if (existingSubtitle) {
            existingSubtitle.textContent = '';
            existingSubtitle.style.opacity = '0';
            existingSubtitle.style.display = 'none';
        }
        
        // 자막을 표시할 div 생성
        let subtitleDiv = document.getElementById('subtitle-div');
        if (!subtitleDiv) {
            subtitleDiv = document.createElement('div');
            subtitleDiv.id = 'subtitle-div';
            document.body.appendChild(subtitleDiv);
        }
        
        // 스타일 업데이트 (기존 자막이 있어도 스타일 적용)
        // ... existing code ...
        subtitleDiv.style.cssText = `
            position: fixed;
            left: 50%;
            bottom: 250px;
            transform: translateX(-50%) translateY(20px);
            background: rgba(0, 0, 0, 0.7);
            color: #FFFFFF;
            padding-top: 20px;        /* 위쪽 패딩 */
            padding-right: 30px;      /* 오른쪽 패딩 */
            padding-bottom: 20px;     /* 아래쪽 패딩 */
            padding-left: 30px;       /* 왼쪽 패딩 */
            font-size: 24px;
            font-family: 'Inter', 'SF Pro Display', 'Segoe UI', sans-serif;
            font-weight: 400;
            letter-spacing: 0.5px;
            width: 100vw;
            height: auto;
            min-height: 110px;
            max-height: 180px;
            text-align: center;
            z-index: 1000;
            display: block;
            visibility: visible;
            line-height: 1.4;
            word-wrap: break-word;
            overflow-wrap: break-word;
            transition: all 0.3s ease-in-out;
            opacity: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
            border-radius: 5px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 0, 0, 0.2);
        `;
// ... existing code ...

        // JSON 번호에 따라 자막 표시 제어
        const shouldShowSubtitle = true; // 모든 JSON에서 자막 표시

        // 최초 이미지 표시 (word.image 사용)
        if (word.image) {
            const imageElement = document.getElementById('displayed-image');
            if (imageElement) {
                imageElement.src = word.image;
                imageElement.style.display = "block";
                imageElement.style.visibility = "visible";
                console.log('최초 이미지 표시됨:', word.image);
            }
        }

        // explanation1 처리
        if (word.explanation1) {
            if (shouldShowSubtitle) {
                // ✅ 이전 secondDescription 자막 완전 초기화
                subtitleDiv.textContent = '';
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.display = 'none';
                
                // ✅ 새로운 explanation1 자막 표시
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation1;
                    subtitleDiv.style.display = 'block';
                    subtitleDiv.style.opacity = '1';
                    subtitleDiv.style.position = 'relative';
                    subtitleDiv.style.top = '0px';
                }, 200);
                
                console.log('자막 표시됨:', word.explanation1);
                console.log('subtitleDiv text content:', subtitleDiv.textContent);
                console.log('subtitleDiv display style:', subtitleDiv.style.display);
                console.log('subtitleDiv visibility:', subtitleDiv.style.visibility);
                console.log('currentPairIndex:', currentPairIndex);
                console.log('shouldShowSubtitle:', shouldShowSubtitle);
                
                // explanation1에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation1Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        console.log('explanation1 이미지 변경 시작:', word.explanation1Image);
                        // CSS transition 추가
                        imageElement.style.transition = 'all 0.5s ease-in-out';
                        
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            const newImageSrc = `${word.explanation1Image}?t=${timestamp}`;
                            console.log('새 이미지 경로:', newImageSrc);
                            imageElement.src = newImageSrc;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 이미지 로드 확인
                            imageElement.onload = () => {
                                console.log('explanation1 이미지 로드 성공:', word.explanation1Image);
                                // 페이드 인
                                setTimeout(() => {
                                    imageElement.style.opacity = '1';
                                }, 100);
                            };
                            
                            imageElement.onerror = () => {
                                console.error('explanation1 이미지 로드 실패:', word.explanation1Image);
                                // 이미지 로드 실패해도 프로그램 계속 진행
                                console.log('Continuing despite explanation1 image load failure');
                            };
                            
                            console.log('이미지 표시됨:', word.explanation1Image);
                        }, 250);
                    } else {
                        console.error('displayed-image 요소를 찾을 수 없습니다');
                    }
                } else {
                    console.log('explanation1Image가 정의되지 않음');
                }
            } else {
                console.log('자막 숨김됨 - currentPairIndex:', currentPairIndex);
            }
            
            // explanation1 음성 재생 (영국 GB 남성 음성 사용)
            const explanation1Audio = await fetchAudio(word.explanation1, 'en-US-Chirp-HD-D');
            if (explanation1Audio) {
                try {
                    await explanation1Audio.play();
                    await new Promise(resolve => explanation1Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation1Audio.pause();
                    explanation1Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation1 audio:', error);
                }
            }
        }

        // explanation2 처리
        if (word.explanation2) {
            if (shouldShowSubtitle) {
            subtitleDiv.textContent = word.explanation2;
            subtitleDiv.style.display = 'block';
            subtitleDiv.style.opacity = '1';
            subtitleDiv.style.position = 'relative';
            subtitleDiv.style.top = '0px';
                
                // explanation2에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation2Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation2Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation2Image);
                        }, 250);
                    }
                }
            }
            
            // explanation2 음성 재생 (영국 GB 남성 음성 사용)
            const explanation2Audio = await fetchAudio(word.explanation2, 'en-US-Chirp-HD-D');
            if (explanation2Audio) {
                try {
                    await explanation2Audio.play();
                    await new Promise(resolve => explanation2Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation2Audio.pause();
                    explanation2Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation2 audio:', error);
                }
            }
        }

        // explanation3 처리
        if (word.explanation3) {
            if (shouldShowSubtitle) {
            subtitleDiv.textContent = word.explanation3;
            subtitleDiv.style.display = 'block';
            subtitleDiv.style.opacity = '1';
                
                // explanation3에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation3Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation3Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation3Image);
                        }, 250);
                    }
                }
            }
            
            // explanation3 음성 재생 (영국 GB 남성 음성 사용)
            const explanation3Audio = await fetchAudio(word.explanation3, 'en-US-Chirp-HD-D');
            if (explanation3Audio) {
                try {
                    await explanation3Audio.play();
                    await new Promise(resolve => explanation3Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation3Audio.pause();
                    explanation3Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation3 audio:', error);
                }
            }
        }

        // explanation4 처리
        if (word.explanation4) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation4;
                subtitleDiv.style.display = 'block';
                subtitleDiv.style.opacity = '1';
                
                // explanation4에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation4Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation4Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation4Image);
                        }, 250);
                    }
                }
            }
            
            // explanation4 음성 재생 (영국 GB 남성 음성 사용)
            const explanation4Audio = await fetchAudio(word.explanation4, 'en-US-Chirp-HD-D');
            if (explanation4Audio) {
                try {
                    await explanation4Audio.play();
                    await new Promise(resolve => explanation4Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation4Audio.pause();
                    explanation4Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation4 audio:', error);
                }
            }
        }

        // explanation5 처리
        if (word.explanation5) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation5;
                subtitleDiv.style.display = 'block';
                subtitleDiv.style.opacity = '1';
                
                // explanation5에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation5Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation5Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation5Image);
                        }, 250);
                    }
                }
            }
            
            // explanation5 음성 재생 (영국 GB 남성 음성 사용)
            const explanation5Audio = await fetchAudio(word.explanation5, 'en-US-Chirp-HD-D');
            if (explanation5Audio) {
                try {
                    await explanation5Audio.play();
                    await new Promise(resolve => explanation5Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation5Audio.pause();
                    explanation5Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation5 audio:', error);
                }
            }
        }

        // explanation6 처리
        if (word.explanation6) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation6;
                subtitleDiv.style.display = 'block';
                
                // explanation6에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation6Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation6Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation6Image);
                        }, 250);
                    }
                }
            }
            
            // explanation6 음성 재생 (영국 GB 남성 음성 사용)
            const explanation6Audio = await fetchAudio(word.explanation6, 'en-US-Chirp-HD-D');
            if (explanation6Audio) {
                try {
                    await explanation6Audio.play();
                    await new Promise(resolve => explanation6Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation6Audio.pause();
                    explanation6Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation6 audio:', error);
                }
            }
        }

        // explanation7 처리
        if (word.explanation7) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation7;
                subtitleDiv.style.display = 'block';
                subtitleDiv.style.opacity = '1';
                
                // explanation7에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation7Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation7Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation7Image);
                        }, 250);
                    }
                }
            }
            
            // explanation7 음성 재생 (영국 GB 남성 음성 사용)
            const explanation7Audio = await fetchAudio(word.explanation7, 'en-US-Chirp-HD-D');
            if (explanation7Audio) {
                try {
                    await explanation7Audio.play();
                    await new Promise(resolve => explanation7Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation7Audio.pause();
                    explanation7Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation7 audio:', error);
                }
            }
        }

        // explanation8 처리
        if (word.explanation8) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation8;
                subtitleDiv.style.display = 'block';
                
                // explanation8에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation8Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation8Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation8Image);
                        }, 250);
                    }
                }
            }
            
            // explanation8 음성 재생 (영국 GB 남성 음성 사용)
            const explanation8Audio = await fetchAudio(word.explanation8, 'en-US-Chirp-HD-D');
            if (explanation8Audio) {
                try {
                    await explanation8Audio.play();
                    await new Promise(resolve => explanation8Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation8Audio.pause();
                    explanation8Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation8 audio:', error);
                }
            }
        }

        // explanation9 처리
        if (word.explanation9) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation9;
                subtitleDiv.style.display = 'block';
                
                // explanation9에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation9Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation9Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation9Image);
                        }, 250);
                    }
                }
            }
            
            // explanation9 음성 재생 (영국 GB 남성 음성 사용)
            const explanation9Audio = await fetchAudio(word.explanation9, 'en-US-Chirp-HD-D');
            if (explanation9Audio) {
                try {
                    await explanation9Audio.play();
                    await new Promise(resolve => explanation9Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation9Audio.pause();
                    explanation9Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation9 audio:', error);
                }
            }
        }

        // explanation10 처리
        if (word.explanation10) {
            if (shouldShowSubtitle) {
                subtitleDiv.textContent = word.explanation10;
                subtitleDiv.style.display = 'block';
                
                // explanation10에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation10Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation10Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation10Image);
                        }, 250);
                    }
                }
            }
            
            // explanation10 음성 재생 (미국 US 남성 음성 사용)
            const explanation10Audio = await fetchAudio(word.explanation10, 'en-US-Chirp-HD-D');
            if (explanation10Audio) {
                try {
                    await explanation10Audio.play();
                    await new Promise(resolve => explanation10Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation10Audio.pause();
                    explanation10Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation10 audio:', error);
                }
            }
        }

        // explanation11 처리
        if (word.explanation11) {
            if (shouldShowSubtitle) {
                // 이전 자막 페이드아웃
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation11;
                    subtitleDiv.style.display = 'block';
                    
                    // 새로운 자막 페이드인
                    setTimeout(() => {
                        subtitleDiv.style.opacity = '1';
                        subtitleDiv.style.transform = 'translateX(-50%) translateY(0)';
                    }, 50);
                }, 300);
                
                // explanation11에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation11Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation11Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation11Image);
                        }, 250);
                    }
                }
            }
            
            // explanation11 음성 재생 (미국 US 남성 음성 사용)
            const explanation11Audio = await fetchAudio(word.explanation11, 'en-US-Chirp-HD-D');
            if (explanation11Audio) {
                try {
                    await explanation11Audio.play();
                    await new Promise(resolve => explanation11Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation11Audio.pause();
                    explanation11Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation11 audio:', error);
                }
            }
        }

        // explanation12 처리
        if (word.explanation12) {
            if (shouldShowSubtitle) {
                // 이전 자막 페이드아웃
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation12;
                    subtitleDiv.style.display = 'block';
                    
                    // 새로운 자막 페이드인
                    setTimeout(() => {
                        subtitleDiv.style.opacity = '1';
                        subtitleDiv.style.transform = 'translateX(-50%) translateY(0)';
                    }, 50);
                }, 300);
                
                // explanation12에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation12Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation12Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation12Image);
                        }, 250);
                    }
                }
            }
            
            // explanation12 음성 재생 (미국 US 남성 음성 사용)
            const explanation12Audio = await fetchAudio(word.explanation12, 'en-US-Chirp-HD-D');
            if (explanation12Audio) {
                try {
                    await explanation12Audio.play();
                    await new Promise(resolve => explanation12Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation12Audio.pause();
                    explanation12Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation12 audio:', error);
                }
            }
        }

        // explanation13 처리
        if (word.explanation13) {
            if (shouldShowSubtitle) {
                // 이전 자막 페이드아웃
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation13;
                    subtitleDiv.style.display = 'block';
                    
                    // 새로운 자막 페이드인
                    setTimeout(() => {
                        subtitleDiv.style.opacity = '1';
                        subtitleDiv.style.transform = 'translateX(-50%) translateY(0)';
                    }, 50);
                }, 300);
                
                // explanation13에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation13Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation13Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation13Image);
                        }, 250);
                    }
                }
            }
            
            // explanation13 음성 재생 (미국 US 남성 음성 사용)
            const explanation13Audio = await fetchAudio(word.explanation13, 'en-US-Chirp-HD-D');
            if (explanation13Audio) {
                try {
                    await explanation13Audio.play();
                    await new Promise(resolve => explanation13Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation13Audio.pause();
                    explanation13Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation13 audio:', error);
                }
            }
        }

        // explanation14 처리
        if (word.explanation14) {
            if (shouldShowSubtitle) {
                // 이전 자막 페이드아웃
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation14;
                    subtitleDiv.style.display = 'block';
                    
                    // 새로운 자막 페이드인
                    setTimeout(() => {
                        subtitleDiv.style.opacity = '1';
                        subtitleDiv.style.transform = 'translateX(-50%) translateY(0)';
                    }, 50);
                }, 300);
                
                // explanation14에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation14Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation14Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation14Image);
                        }, 250);
                    }
                }
            }
            
            // explanation14 음성 재생 (미국 US 남성 음성 사용)
            const explanation14Audio = await fetchAudio(word.explanation14, 'en-US-Chirp-HD-D');
            if (explanation14Audio) {
                try {
                    await explanation14Audio.play();
                    await new Promise(resolve => explanation14Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation14Audio.pause();
                    explanation14Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation14 audio:', error);
                }
            }
        }

        // explanation15 처리
        if (word.explanation15) {
            if (shouldShowSubtitle) {
                // 이전 자막 페이드아웃
                subtitleDiv.style.opacity = '0';
                subtitleDiv.style.transform = 'translateX(-50%) translateY(20px)';
                
                setTimeout(() => {
                    subtitleDiv.textContent = word.explanation15;
                    subtitleDiv.style.display = 'block';
                    
                    // 새로운 자막 페이드인
                    setTimeout(() => {
                        subtitleDiv.style.opacity = '1';
                        subtitleDiv.style.transform = 'translateX(-50%) translateY(0)';
                    }, 50);
                }, 300);
                
                // explanation15에 해당하는 이미지 표시 (부드러운 전환 효과)
                if (word.explanation15Image) {
                    const imageElement = document.getElementById('displayed-image');
                    if (imageElement) {
                        // 페이드 아웃 → 이미지 변경 → 페이드 인
                        imageElement.style.opacity = '0';
                        setTimeout(() => {
                            // 캐시 방지를 위해 타임스탬프 추가
                            const timestamp = new Date().getTime();
                            imageElement.src = `${word.explanation15Image}?t=${timestamp}`;
                            imageElement.style.display = "block";
                            imageElement.style.visibility = "visible";
                            
                            // 페이드 인
                            setTimeout(() => {
                                imageElement.style.opacity = '1';
                            }, 100);
                            
                            console.log('이미지 표시됨:', word.explanation15Image);
                        }, 250);
                    }
                }
            }
            
            // explanation15 음성 재생 (미국 US 남성 음성 사용)
            const explanation15Audio = await fetchAudio(word.explanation15, 'en-US-Chirp-HD-D');
            if (explanation15Audio) {
                try {
                    await explanation15Audio.play();
                    await new Promise(resolve => explanation15Audio.onended = resolve);
                    // 오디오 완료 후 정리
                    explanation15Audio.pause();
                    explanation15Audio.currentTime = 0;
                } catch (error) {
                    console.error('Error playing explanation15 audio:', error);
                }
            }
        }

        // 자막 숨기지 않음 (계속 표시)
        // if (currentPairIndex === 1) {
        //     subtitleDiv.style.display = 'none';
        //     subtitleDiv.style.visibility = 'hidden';
        // }

        // 다음으로 이동 (모든 오디오 재생 완료 후)
        setTimeout(() => {
            if (currentPairIndex < words.length - 1) {
                currentPairIndex++;
                const nextWord = words[currentPairIndex];
                if (nextWord && nextWord.english) {
                    handleEnglishPronunciation(nextWord);
                } else {
                    updatePair();
                }
            } else {
                console.log("✅ JSON 4 완료. 화면 유지.");
                stopPronouncing();
            }
        }, 1500); // 3초 → 5초로 변경 (2초 추가)

    } catch (error) {
        console.error('Error playing explanations audio:', error);
        // 오류가 발생해도 다음으로 진행
        setTimeout(() => {
            if (currentPairIndex < words.length - 1) {
                currentPairIndex++;
                const nextWord = words[currentPairIndex];
                if (nextWord && nextWord.english) {
                    handleEnglishPronunciation(nextWord);
                } else {
                    updatePair();
                }
            } else {
                console.log("✅ JSON 4 완료. 화면 유지.");
                stopPronouncing();
            }
        }, 5000); // 3초 → 5초로 변경 (2초 추가)
    }
}




// ✅ 줄br로 변경함 원문, 예문 "english" 필드에서도 자동 줄 바꿈 추가
async function handleEnglishPronunciation(word) {
    console.log('Starting handleEnglishPronunciation');
    
    if (!word || !word.english) {
        console.warn('No word or english text provided');
        moveToNextPair();
        return;
    }

    const englishText = word.english;
    console.log(`Processing English text: "${englishText}"`);

    const textContainer = document.getElementById('english-text-container');
    const container = textContainer?.parentElement;

    if (!textContainer || !container) {
        console.warn('Missing textContainer or container element');
        moveToNextPair();
        return;
    }

    try {
        // 영어 텍스트를 흰색으로 표시하고 키워드 하이라이트
        const highlightedText = highlightKeywords(englishText, ['curry favor', 'decision', 'cancel', 'show'], ['believe', 'made', 'them']);
        textContainer.innerHTML = `<span style="color: white;">${highlightedText}</span>`;
        console.log('English text displayed');

        // US, UK 아이콘 생성 (가운데 정렬)
        const accentContainer = document.createElement('div');
        accentContainer.style.display = 'flex';
        accentContainer.style.justifyContent = 'center';
        accentContainer.style.alignItems = 'center';
        accentContainer.style.gap = '20px';
        accentContainer.style.marginTop = '20px';

        const usStyle = `
            color: #FFA500;
            font-size: 32px;
            padding: 5px 10px;
            transition: all 0.3s ease;
            opacity: 0.5;
        `;
        const ukStyle = `
            color: #FFD700;
            font-size: 32px;
            padding: 5px 10px;
            opacity: 0.5;
            transition: all 0.3s ease;
        `;

        accentContainer.innerHTML = `
            <span id="us-accent" style="${usStyle}">ⓊⓈ</span>
            <span id="uk-accent" style="${ukStyle}">ⓊⓀ</span>
        `;
        container.appendChild(accentContainer);
        console.log('Accent icons created');

        // US 음성 3번 반복 재생
        for (let i = 0; i < 3; i++) {
            console.log(`Starting US audio playback round ${i + 1}/3`);
            
            const usAudio = await fetchAudio(englishText, 'en-US-Chirp-HD-D');
        if (usAudio) {
            const usAccent = document.getElementById('us-accent');
            const ukAccent = document.getElementById('uk-accent');
            
            if (usAccent && ukAccent) {
                usAccent.style.color = '#FFA500';
                usAccent.style.opacity = '1';
                ukAccent.style.opacity = '0.5';
            }

            console.log('Starting US audio playback');
                try {
            await usAudio.play();
            await new Promise(resolve => usAudio.onended = resolve);
            console.log('US audio completed');
                } catch (error) {
                    console.error('Error playing US audio:', error);
                }
        } else {
            console.warn('Failed to create US audio');
        }

            // 마지막 반복이 아니면 0.5초 대기
            if (i < 2) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        // 1초 대기
        await new Promise(resolve => setTimeout(resolve, 1000));

        // US 음성 3번 반복 재생 (두 번째 세트)
        for (let i = 0; i < 3; i++) {
            console.log(`Starting US audio playback round ${i + 1}/3 (second set)`);
            
            const usAudio = await fetchAudio(englishText, 'en-US-Chirp-HD-D');
        if (usAudio) {
            const usAccent = document.getElementById('us-accent');
            const ukAccent = document.getElementById('uk-accent');
            
            if (usAccent && ukAccent) {
                usAccent.style.color = '#FFA500';
                usAccent.style.opacity = '1';
                ukAccent.style.opacity = '0.5';
            }

            console.log('Starting US audio playback');
                try {
            await usAudio.play();
            await new Promise(resolve => usAudio.onended = resolve);
            console.log('US audio completed');
                } catch (error) {
                    console.error('Error playing US audio:', error);
                }
        } else {
            console.warn('Failed to create US audio');
        }

            // 마지막 반복이 아니면 0.5초 대기
            if (i < 2) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }

        console.log('handleEnglishPronunciation completed successfully');
    } catch (error) {
        console.error('Error in handleEnglishPronunciation:', error);
    } finally {
        moveToNextPair();
    }
}



// ✅ JSON이 끝나면 종료 (더 이상 다음 JSON이 없을 때)
function moveToNextPair() {
    setTimeout(() => {
        console.log('moveToNextPair 호출됨, currentPairIndex:', currentPairIndex, 'words.length:', words.length);
        
        if (currentPairIndex >= words.length - 1) {
            console.log("✅ 마지막 JSON 도달. 다음 JSON 확인 중...");
            
            // 마지막 JSON이 summary 타입인지 확인
            const lastWord = words[words.length - 1];
            if (lastWord && lastWord.type === 'summary') {
                console.log('마지막 JSON이 summary 타입이므로 진행');
                clearText();
                currentPairIndex++;
                showSummaryPage(lastWord);
                return;
            } else {
                console.log("✅ 모든 JSON이 실행 완료됨. 텍스트 유지.");
                
                // ✅ 자막 숨기기
                const subtitleDiv = document.getElementById('subtitle');
                if (subtitleDiv) {
                    subtitleDiv.style.opacity = '0';
                    setTimeout(() => {
                        subtitleDiv.style.display = 'none';
                    }, 300);
                }
                
                // ✅ word-box vocab-section 숨기기
                const vocabSection = document.querySelector('.word-box.vocab-section');
                if (vocabSection) {
                    vocabSection.style.opacity = '0';
                    setTimeout(() => {
                        vocabSection.style.display = 'none';
                    }, 300);
                }
                
                stopPronouncing(); // ✅ 자동 종료 (텍스트는 유지)
                return;
            }
        }

        clearText(); // ✅ 마지막 JSON이 아니면 텍스트 삭제
        currentPairIndex++;
        
        // 다음 JSON으로 진행
        const nextWord = words[currentPairIndex];
        console.log('다음 JSON 확인:', nextWord);
        console.log('일반 JSON, pronouncePair 호출');
        pronouncePair();
    }, 300);
}



function clearText() {
    document.getElementById('word-definition').innerHTML = "";
    document.getElementById('word-explanation').innerHTML = "";
    document.getElementById('word-pronunciation').innerHTML = "";
    
    // 예문 초기화
    const korExampleElement = document.getElementById('kor-example');
    const engExampleElement = document.getElementById('eng-example');
    
    if (korExampleElement) {
        korExampleElement.innerHTML = "";
        korExampleElement.style.display = "none";
    }
    if (engExampleElement) {
        engExampleElement.innerHTML = "";
        engExampleElement.style.display = "none";
        engExampleElement.style.color = "#7df8df"; // 색상 초기화
    }
    
    // 이미지 관련 요소들 모두 초기화
    const wordImage = document.getElementById('word-image');
    const displayedImage = document.getElementById('displayed-image');
    const imageDescription = document.getElementById('image-description');
    
    if (wordImage) {
        wordImage.style.display = "none";
        wordImage.style.visibility = "hidden";
    }
    if (displayedImage) {
        displayedImage.src = "";
        displayedImage.style.display = "none";
        displayedImage.style.visibility = "hidden";
    }
    if (imageDescription) {
        imageDescription.innerHTML = "";
        imageDescription.style.display = "none";
        imageDescription.style.visibility = "hidden";
    }
    
    // ✅ 자막 숨기기
    const subtitleDiv = document.getElementById('subtitle');
    if (subtitleDiv) {
        subtitleDiv.style.opacity = '0';
        subtitleDiv.style.display = 'none';
        subtitleDiv.textContent = '';
    }
}



///////////////////////////////////////////////////////////////////////////////////////////

function autoPlay() {
    isStopped = false;
    
    // 4초 대기 후 바로 JSON 콘텐츠 시작 (영어작문 연습 읽기 건너뛰기)
    setTimeout(() => {
        if (!isStopped) {
            console.log('🚀 Autoplay: 4초 후 바로 JSON 콘텐츠 시작');
            pronouncePair();
        }
    }, 4000);
}



///////////////////////////////////////////////////////////////////////////////////////////////
// ✅ `stopPronouncing()` 수정: 자동 종료 시 `currentPairIndex` 초기화
function stopPronouncing() {
    isStopped = true;
    if (currentAudioSource) currentAudioSource.stop();
    currentAudioSource = null;

    // ✅ 자막 숨기기
    const subtitleDiv = document.getElementById('subtitle');
    if (subtitleDiv) {
        subtitleDiv.style.opacity = '0';
        subtitleDiv.style.display = 'none';
        subtitleDiv.textContent = '';
    }

    // ✅ 마지막 JSON이면 currentPairIndex를 고정하여 텍스트 유지
    if (currentPairIndex >= words.length - 1) {
        console.log("⏹️ 자동 실행이 멈췄습니다. 텍스트를 유지합니다.");
        return;
    }

    currentPairIndex = words.length; // ✅ 모든 JSON이 실행 완료되었음을 표시
}

// ✅ `fetchAudio()` 호출 전 `no-audio` 부분 제거
async function fetchAudio(text, language) {
    console.log(`Fetching audio for text: "${text}" in language: ${language}`);
    
    try {
        if (!text || text.trim() === "") {
            console.warn('Empty text provided to fetchAudio');
            return null;
        }

        // ✅ `no-audio` 태그 제거 후 텍스트 변환
        const cleanText = removeNoAudioText(text);
        console.log(`Cleaned text: "${cleanText}"`);

        const url = `http://localhost:3002/generate-audio?text=${encodeURIComponent(cleanText)}&language=${language}`;
        console.log(`Fetching from URL: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Server responded with status: ${response.status}`);
            return null;
        }

        console.log('Received audio data, creating audio element...');
        const blob = await response.blob();
        const audioUrl = URL.createObjectURL(blob);
        
        const audio = new Audio(audioUrl);
        
        // 오디오 로드 완료 대기
        await new Promise((resolve, reject) => {
            audio.addEventListener('canplaythrough', resolve, { once: true });
            audio.addEventListener('error', reject, { once: true });
            audio.load();
        });
        
        console.log('Audio element created successfully');
        return audio;
    } catch (error) {
        console.error("Error in fetchAudio:", error);
        return null;
    }
}




// function highlightKeywords(text, keywords) {
//     keywords.forEach(keyword => {
//         const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(keyword); // 한글 포함 여부 확인 
//         const color = isKorean ? "#FAD02E" : "#FAD02E"; // 한글: 주황색, 영어: 밝은 하늘색 #FFD700 #FFA500 #04fab0; #FFEB3B;  #00FFFF"; #B0E0E6

//         const regex = new RegExp(`(${keyword})`, 'gi');
//         // text = text.replace(regex, `<span style="border-bottom: 2.5px solid ${color}; color: ${color};">$1</span>`);
  
//         // text = text.replace(regex, `<span style="border-bottom: 2.5px solid ${color}; color: ${color};">${keyword}</span>`);
//         text = text.replace(regex, `<span style="text-decoration: underline; text-decoration-color: #7df8df; text-underline-offset: 7px;">$1</span>`);
//         // text = text.replace(regex, `<span style="border-bottom: 2px solid currentColor;">${keyword}</span>`);

//     });
//     return text;
// }


// function highlightKeywords(text, primaryKeywords = [], secondaryKeywords = []) {
//     // 노란색 (기본)
//     primaryKeywords.forEach(keyword => {
//       const regex = new RegExp(`(${keyword})`, 'gi');
//       text = text.replace(
//         regex,
//         `<span style="text-decoration: underline; text-decoration-color: #ffd166; text-underline-offset: 7px;">$1</span>`
//       );
//     });
  
//     // 노란색 (보조)
//     secondaryKeywords.forEach(keyword => {
//       const regex = new RegExp(`(${keyword})`, 'gi');
//       text = text.replace(
//         regex,
//         `<span style="text-decoration: underline; text-decoration-color: #ffd166; text-underline-offset: 7px;">$1</span>`
//       );
//     });
  
//     return text;
//   }


function highlightSecondDescriptionWords(text) {
    const colors = ['#FFD700', '#4ECDC4', '#45B7D1']; // 노란색, 청록색, 파란색
    
    // 하나의 단어를 3개 부분으로 나누어 각각 다른 색으로 표시
    const word = text.trim();
    if (word === '') return text;
    
    const length = word.length;
    const partLength = Math.floor(length / 3);
    
    let result = '';
    for (let i = 0; i < length; i++) {
        let colorIndex;
        if (i < partLength) {
            colorIndex = 0; // 첫 번째 부분: 노란색
        } else if (i < partLength * 2) {
            colorIndex = 1; // 두 번째 부분: 청록색
        } else {
            colorIndex = 2; // 세 번째 부분: 파란색
        }
        const color = colors[colorIndex];
        result += `<span style="color: ${color}; font-weight: normal;">${word[i]}</span>`;
    }
    
    return result;
}

function highlightKeywords(text, primaryKeywords = [], secondaryKeywords = []) {
    const colors = ['#7df8df', '#FFB6C1', '#98FB98']; // explanation과 동일한 색상 배열

    // 1️⃣ 1차 키워드: 노란색으로 표시
    primaryKeywords.forEach(keyword => {
        // 정규식에서 특수문자 이스케이프
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        text = text.replace(
            regex,
            `<span style="color: #FFD700;">$1</span>`
        );
    });

    // 2️⃣ 2차 키워드: 흰색으로 표시
    secondaryKeywords.forEach(keyword => {
        // 정규식에서 특수문자 이스케이프
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');
        text = text.replace(
            regex,
            `<span style="color: white;">$1</span>`
        );
    });

    return text;
}

// summary 읽기 함수
async function readSummaryList(summary) {
    const summaryContainer = document.getElementById('word-definition');
    const listItems = summaryContainer.querySelectorAll("li");

    for (let i = 0; i < summary.length; i++) {
        if (isStopped) return;

        const item = summary[i];
        const englishSpan = listItems[i].querySelector(".summary-english");

        // 현재 문장을 노란색으로 변경
        if (englishSpan) {
            englishSpan.style.color = "#FFD700";
        }

        if (item.english && item.english.trim() !== "") {
            // scene 3(세 번째 JSON)인 경우 한 번만 읽기
            if (currentPairIndex === 2) {
                const ukAudio = await fetchAudio(item.english, 'en-US-Chirp-HD-D');
                if (ukAudio) {
                    await ukAudio.play();
                    await new Promise(resolve => ukAudio.onended = resolve);
                }
            } else {
                // UK 발음 재생
                const ukAudio = await fetchAudio(item.english, 'en-US-Chirp-HD-D');
                if (ukAudio) {
                    await ukAudio.play();
                    await new Promise(resolve => ukAudio.onended = resolve);
                }

                // 1초 대기
                await new Promise(resolve => setTimeout(resolve, 1000));

                // US 발음 재생
                const usAudio = await fetchAudio(item.english, 'en-US-Chirp-HD-D');
                if (usAudio) {
                    await usAudio.play();
                    await new Promise(resolve => usAudio.onended = resolve);
                }
            }
        }

        // 다시 흰색으로 변경
        if (englishSpan) {
            englishSpan.style.color = "white";
        }

        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log("Summary reading completed.");
    setTimeout(moveToNextPair, 1000);
}
