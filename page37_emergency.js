document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            // 긴급 상황에서
            // 도난과 사고
            "I’ve been robbed!(도난당했어요!)",
            "My wallet has been stolen.(제 지갑이 도난당했어요.)",
            "Can you call the police for me?(경찰을 불러주실 수 있나요?)",
            "Where is the nearest police station?(가장 가까운 경찰서는 어디인가요?)",
            "I need help, there’s been an accident.(도움이 필요해요, 사고가 났어요.)",
            "Can you call an ambulance?(구급차를 불러주실 수 있나요?)",
            "Is there a first aid kit nearby?(근처에 구급상자가 있나요?)",
            "I need assistance, someone is injured.(도움이 필요해요, 누군가 다쳤어요.)",
            "Can you help me contact the embassy?(대사관에 연락할 수 있도록 도와주실 수 있나요?)",
            "Where is the nearest embassy or consulate?(가장 가까운 대사관이나 영사관은 어디인가요?)",
            "My passport has been stolen.(제 여권이 도난당했어요.)",
            "I need to report a theft.(도난 신고를 해야 해요.)",
            "Is there a lost and found office nearby?(근처에 분실물 센터가 있나요?)",
            "Can you translate this for the police?(이걸 경찰에게 번역해 주실 수 있나요?)",
            
            // 의사를 부를 때
            "I need to see a doctor.(의사를 만나야 해요.)",
            "Can you call a doctor for me?(의사를 불러주실 수 있나요?)",
            "Where is the nearest hospital?(가장 가까운 병원은 어디인가요?)",
            "Is there a clinic nearby?(근처에 클리닉이 있나요?)",
            "Is there an English-speaking doctor available?(영어를 할 수 있는 의사가 있나요?)",
            "How soon can the doctor see me?(의사가 언제 저를 볼 수 있나요?)",
            "Is there a medical center open 24 hours?(24시간 운영되는 의료 센터가 있나요?)",
            "Can you recommend a good hospital?(좋은 병원을 추천해 주실 수 있나요?)",
            "Do I need an appointment to see a doctor?(의사를 만나려면 예약이 필요하나요?)",
            
            // 증상을 설명할 때
            "I’m feeling very sick.(매우 아파요.)",
            "I have a fever.(열이 나요.)",
            "I’m having trouble breathing.(호흡이 어려워요.)",
            "I have a severe headache.(심한 두통이 있어요.)",
            "My stomach hurts.(배가 아파요.)",
            "I feel dizzy.(어지러워요.)",
            "I have a rash.(발진이 있어요.)",
            "My chest feels tight.(가슴이 답답해요.)",
            "I have been vomiting.(구토를 했어요.)",
            "I have diarrhea.(설사를 하고 있어요.)",
            "I have a sore throat.(목이 아파요.)",
            "I’ve lost my appetite.(식욕이 없어요.)",
            "I have a persistent cough.(기침이 계속 나요.)",
            "I feel weak and tired.(기운이 없고 피곤해요.)",
            
            // 보험과 약국
            "Do you accept travel insurance?(여행 보험을 받나요?)",
            "How do I file an insurance claim?(보험 청구는 어떻게 하나요?)",
            "Can you help me with my insurance paperwork?(보험 서류 작성을 도와주실 수 있나요?)",
            "Is this treatment covered by insurance?(이 치료는 보험으로 커버되나요?)",
            "Where is the nearest pharmacy?(가장 가까운 약국은 어디인가요?)",
            "I need to buy some medicine.(약을 사야 해요.)",
            "Can you recommend something for a cold?(감기에 좋은 약을 추천해 주실 수 있나요?)",
            "Do I need a prescription for this medication?(이 약은 처방전이 필요한가요?)",
            "Is there an over-the-counter medicine for pain relief?(진통제는 처방전 없이 구매할 수 있나요?)",
            "Can you fill this prescription for me?(이 처방전을 약으로 지어 주실 수 있나요?)",
            "What are the side effects of this medication?(이 약의 부작용은 무엇인가요?)",
            "How often should I take this medicine?(이 약은 얼마나 자주 복용해야 하나요?)",
            "Can I take this medication with food?(이 약을 음식과 함께 복용해도 되나요?)",
            "Do you have any medicine for allergies?(알레르기 약이 있나요?)",
            
            // 영사관과 경찰
            "I need to contact my embassy.(제 대사관에 연락해야 해요.)",
            "Where is the nearest consulate?(가장 가까운 영사관은 어디인가요?)",
            "I need help with my lost passport.(여권을 잃어버렸는데 도움을 받고 싶어요.)",
            "Can the consulate issue a temporary passport?(영사관에서 임시 여권을 발급해 줄 수 있나요?)",
            "How do I get to the embassy from here?(여기서 대사관까지 어떻게 가나요?)",
            "I’ve lost my travel documents.(여행 서류를 잃어버렸어요.)",
            "Can you help me find legal assistance?(법적 도움을 찾을 수 있도록 도와주실 수 있나요?)",
            "I need to make a police report.(경찰 신고를 해야 해요.)",
            "Can someone from the embassy accompany me to the police station?(대사관에서 경찰서까지 동행해 줄 사람이 있나요?)",
            "What should I do if my wallet is stolen?(지갑이 도난당했을 때 어떻게 해야 하나요?)",
            "Can you provide me with emergency contact numbers?(긴급 연락처를 제공해 주실 수 있나요?)",
            "I need an interpreter at the police station.(경찰서에서 통역사가 필요해요.)",
            "How do I replace my stolen credit cards?(도난당한 신용카드를 어떻게 재발급받을 수 있나요?)",
            "Can I get a copy of the police report?(경찰 보고서 사본을 받을 수 있나요?)"
        ]
    };
    
    const keywordList = document.getElementById('keywordList');
    for (const category in keywords) {
        // Create and append the category headline
        const headline = document.createElement('h3');
        headline.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        headline.classList.add('keyword-headline'); // *** Add a class for styling ***
        keywordList.appendChild(headline);

        // Append each keyword under the respective headline
        keywords[category].forEach(keyword => {
            const li = document.createElement('li');
            li.textContent = keyword;
            li.addEventListener('click', async () => {
                topicInput.value = keyword;
                topicInput.scrollIntoView({ behavior: 'smooth' });

                resultsSection.style.display = 'none';
                loadingSection.style.display = 'block';

                try {
                    const sentences = await generateSentences(keyword);
                    displaySentences(sentences);
                } catch (error) {
                    alert('Error generating sentences. Please try again later.');
                } finally {
                    loadingSection.style.display = 'none';
                }
            });
            keywordList.appendChild(li);
        });
    }

    generateButton.addEventListener('click', async function() {
        const topic = topicInput.value.trim();

        if (!topic) {
            alert('Please enter a topic.');
            return;
        }

        document.getElementById('selectedTopic').innerText = topic;
        resultsSection.style.display = 'none';
        loadingSection.style.display = 'block';

        try {
            const sentences = await generateSentences(topic);
            displaySentences(sentences);
        } catch (error) {
            alert('Error generating sentences. Please try again later.');
        } finally {
            loadingSection.style.display = 'none';
        }
    });

    async function generateSentences(topic) {
        try {
            const response = await fetch('https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/generate-sentences-routines', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic })
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            return data.sentences;
        } catch (error) {
            console.error('Error generating sentences:', error);
            throw error;
        }
    }

    function displaySentences(sentences) {
        sentenceList.innerHTML = '';
        sentences.split('\n').forEach(sentence => {
            const li = document.createElement('li');
            li.textContent = sentence;

            const readButton = document.createElement('button');
            readButton.textContent = 'Read';
            readButton.style.marginLeft = '10px';
            readButton.addEventListener('click', () => readSentence(sentence));
            li.appendChild(readButton);

            sentenceList.appendChild(li);
        });
        resultsSection.style.display = 'block';
    }

    function readSentence(sentence) {
        const englishPart = sentence.match(/^[^\(]+/)[0].trim();
        const utterance = new SpeechSynthesisUtterance(englishPart);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    }
});
