document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            // 방 있는지 문의할 때
            "Do you have any rooms available?(방이 있나요?)",
            "Are there any vacancies?(빈 방이 있나요?)",
            "Can I book a room for tonight?(오늘 밤 방을 예약할 수 있을까요?)",
            "Is there a room available for two people?(두 명이 머무를 방이 있나요?)",
            "Can I get a room for the weekend?(주말에 방을 예약할 수 있을까요?)",
            "Do you have any family rooms?(가족실이 있나요?)",
            "Is there a room with a balcony available?(발코니가 있는 방이 있나요?)",
            "Can I reserve a room with a bathtub?(욕조가 있는 방을 예약할 수 있나요?)",
    
            // 원하는 객실 타입 요청할 때
            "Do you have a double room?(더블룸이 있나요?)",
            "Can I book a single room?(싱글룸을 예약할 수 있나요?)",
            "Is there a suite available?(스위트룸이 있나요?)",
            "Do you have rooms with a sea view?(바다 전망이 있는 방이 있나요?)",
            "Can I get a room with two beds?(침대가 두 개 있는 방을 예약할 수 있나요?)",
            "Are there any non-smoking rooms available?(금연 방이 있나요?)",
            "Do you have any pet-friendly rooms?(반려동물 동반 가능한 방이 있나요?)",
            "Is there a room with a kitchen available?(주방이 있는 방이 있나요?)",
    
            // 체크인/아웃 문의할 때
            "What time is check-in?(체크인은 몇 시인가요?)",
            "What time do I need to check out?(체크아웃은 몇 시까지 해야 하나요?)",
            "Can I have a late check-out?(늦은 체크아웃이 가능한가요?)",
            "Is early check-in available?(일찍 체크인할 수 있나요?)",
            "What documents do I need for check-in?(체크인 시 필요한 서류는 무엇인가요?)",
            "Can I check out before 6 AM?(오전 6시 전에 체크아웃할 수 있나요?)",
            "Is it possible to extend my stay?(체류 기간을 연장할 수 있나요?)",
            "Can I check in online?(온라인으로 체크인할 수 있나요?)",
    
            // 이용 시간 문의할 때
            "What are the pool hours?(수영장 운영 시간은 언제인가요?)",
            "When is breakfast served?(아침 식사는 언제 제공되나요?)",
            "What time does the gym open?(체육관은 몇 시에 열리나요?)",
            "How late is the bar open?(바는 몇 시까지 여나요?)",
            "When does room service end?(룸서비스는 언제 끝나나요?)",
            "What are the spa hours?(스파 운영 시간은 언제인가요?)",
            "Is the restaurant open for dinner?(레스토랑은 저녁 식사 시간에 여나요?)",
            "What time is last call at the bar?(바의 마지막 주문 시간은 언제인가요?)",
    
            // 객실 내 문제 해결 요청할 때
            "There is an issue with the air conditioning.(에어컨에 문제가 있어요.)",
            "The TV in my room is not working.(제 방의 TV가 작동하지 않아요.)",
            "Can someone fix the bathroom light?(화장실 전등을 고쳐줄 수 있나요?)",
            "The Wi-Fi signal is weak in my room.(제 방에서 와이파이 신호가 약해요.)",
            "The shower is not working properly.(샤워기가 제대로 작동하지 않아요.)",
            "There is no hot water in my room.(방에 뜨거운 물이 나오지 않아요.)",
            "The room is too noisy.(방이 너무 시끄러워요.)",
            "The mini bar is empty.(미니바가 비어 있어요.)",
    
            // 객실 용품 요청할 때
            "Can I have an extra towel?(여분의 수건을 주시겠어요?)",
            "Could I get some more pillows?(베개를 더 받을 수 있을까요?)",
            "Do you have a toothbrush and toothpaste?(칫솔과 치약이 있나요?)",
            "Can I get a hairdryer in my room?(방에 헤어드라이어를 가져다 주시겠어요?)",
            "May I have an extra blanket?(여분의 담요를 받을 수 있을까요?)",
            "Can I get some more hangers?(옷걸이를 더 받을 수 있나요?)",
            "Do you have any bathrobes?(목욕 가운이 있나요?)",
            "Can I get some bottled water?(생수를 받을 수 있나요?)",
    
            // 셔틀 버스 문의할 때
            "Is there a shuttle bus to the airport?(공항으로 가는 셔틀버스가 있나요?)",
            "What time does the shuttle bus leave?(셔틀버스는 몇 시에 출발하나요?)",
            "Do I need to book the shuttle bus in advance?(셔틀버스를 미리 예약해야 하나요?)",
            "Is the shuttle bus service free?(셔틀버스 서비스는 무료인가요?)",
            "Can I get a shuttle bus schedule?(셔틀버스 일정표를 받을 수 있나요?)",
            "Is there a shuttle to the city center?(도심으로 가는 셔틀버스가 있나요?)",
            "How often does the shuttle bus run?(셔틀버스는 얼마나 자주 운행하나요?)",
            "Where can I catch the shuttle bus?(셔틀버스를 어디서 타나요?)",
    
            // 기타 서비스 요청할 때
            "Can I get a wake-up call at 7 AM?(오전 7시에 모닝콜을 받을 수 있을까요?)",
            "Do you offer room service?(룸서비스가 제공되나요?)",
            "Is there a laundry service available?(세탁 서비스가 있나요?)",
            "Can I leave my luggage here after check-out?(체크아웃 후에 짐을 여기 맡길 수 있나요?)",
            "Do you have a concierge service?(컨시어지 서비스가 있나요?)",
            "Can I get a taxi to the airport?(공항으로 가는 택시를 불러주시겠어요?)",
            "Is there a business center in the hotel?(호텔에 비즈니스 센터가 있나요?)",
            "Can you recommend any nearby restaurants?(근처에 추천할 만한 레스토랑이 있나요?)"
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

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

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
