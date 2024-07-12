
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
        // 장소 찾기
        "Where is the nearest restaurant?(가장 가까운 레스토랑은 어디인가요?)",
        "Can you recommend a good restaurant nearby?(근처에 좋은 레스토랑을 추천해 주실 수 있나요?)",
        "Is there a vegetarian restaurant around here?(이 근처에 채식 레스토랑이 있나요?)",
        "What type of cuisine does that restaurant serve?(그 레스토랑은 어떤 종류의 음식을 제공하나요?)",
        "Are there any famous local restaurants? (유명한 지역 레스토랑이 있나요?)",
        "Is there a restaurant with outdoor seating nearby?(근처에 야외 좌석이 있는 레스토랑이 있나요?)",
        
        // 예약
        "I would like to make a reservation for two.(두 명 예약하고 싶습니다.)",
        "Do you have any tables available for tonight?(오늘 밤에 자리가 있나요?)",
        "Can I reserve a table by the window?(창가 자리를 예약할 수 있을까요?)",
        "What time is the reservation for?(예약 시간이 언제인가요?)",
        "Do you accept reservations for large groups?(대규모 그룹 예약을 받으시나요?)",
        "Is there a dress code?(복장 규정이 있나요?)",
        
        // 식당
        "We have a reservation under the name Smith.(스미스라는 이름으로 예약했어요.)",
        "How long is the wait for a table for two?(두 명 자리 기다리는데 얼마나 걸리나요?)",
        "Can we sit at the bar while we wait?(기다리는 동안 바에 앉을 수 있나요?)",
        "Is there a table available outside?(야외에 자리가 있나요?)",
        "Do you have a high chair for a baby?(아기용 의자가 있나요?)",
        "Can you put our names on the waiting list?(대기자 명단에 저희 이름을 올려 주실 수 있나요?)",
        
        // 주문
        "Can I see the menu, please?(메뉴를 볼 수 있을까요?)",
        "What are the specials today?(오늘의 특선 요리는 무엇인가요?)",
        "I’ll have the steak, please.(스테이크로 하겠습니다.)",
        "Can I get this dish without nuts?(이 요리에 견과류를 빼주실 수 있나요?)",
        "What do you recommend?(추천 메뉴는 무엇인가요?)",
        "Can I get a glass of water, please?(물 한 잔 주세요.)",
        
        // 요청사항
        "Can I get some extra napkins?(냅킨 좀 더 주실 수 있나요?)",
        "Could you refill my drink, please?(제 음료를 리필해 주실 수 있나요?)",
        "This dish is excellent!(이 요리는 정말 맛있어요!)",
        "Can we have some more bread, please?(빵을 좀 더 주실 수 있나요?)",
        "Could you bring some salt and pepper?(소금과 후추 좀 가져다 주시겠어요?)",
        "Can I get another fork, please?(포크 하나 더 주실 수 있나요?)",
        
        // 패스트푸드점
        "Can I get a burger and fries?(버거와 감자튀김 주세요.)",
        "Is this for here or to go?(여기서 드실 건가요, 포장해 드릴 건가요?)",
        "Can I have a large soda?(큰 사이즈 소다 주세요.)",
        "What comes with the combo meal?(세트 메뉴에 뭐가 포함되어 있나요?)",
        "Can I add cheese to that?(치즈를 추가할 수 있나요?)",
        "Do you have any vegetarian options?(채식 메뉴가 있나요?)",
        
        // 술 주문 
        "Can I see the wine list?(와인 리스트를 볼 수 있을까요?)",
        "I’ll have a glass of red wine.(레드 와인 한 잔 주세요.)",
        "What beers do you have on tap?(생맥주는 어떤 종류가 있나요?)",
        "Can I get a cocktail menu?(칵테일 메뉴를 볼 수 있을까요?)",
        "Do you have any non-alcoholic drinks?(비알콜 음료가 있나요?)",
        "Can I get a round of shots for the table?(테이블에 샷 한 잔씩 주세요.)",
        
        // 기타 문의 사항
        "Excuse me, but this isn’t what I ordered.(죄송한데, 이건 제가 주문한 게 아니에요.)",
        "Can you take this back? It’s cold.(이거 다시 가져가 주실래요? 차가워요.)",
        "I asked for this to be without onions.(양파 빼달라고 했는데요.)",
        "Can I speak to the manager, please?(매니저와 이야기할 수 있을까요?)",
        "This bill doesn’t seem correct.(계산서가 맞지 않는 것 같아요.)",
        "I’ve been waiting for my food for a long time.(음식이 너무 오래 나오고 있어요.)",
        
        // 계산
        "Can I get the check, please?(계산서 주세요.)",
        "Do you take credit cards?(신용카드 받나요?)",
        "Can we pay separately?(따로 계산할 수 있나요?)",
        "Is service included?(서비스 요금이 포함되어 있나요?)",
        "Can I get a receipt, please?(영수증 주세요.)",
        "Do you have a tip policy?(팁 정책이 어떻게 되나요?)"
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
            const response = await fetch('http://localhost:3000/generate-sentences-routines', {
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