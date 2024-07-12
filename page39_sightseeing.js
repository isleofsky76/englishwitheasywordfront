
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            // 관광 안내소에서
            "Where is the nearest tourist information center?(가장 가까운 관광 안내소는 어디인가요?)",
            "Can you give me a map of the city?(도시 지도를 주실 수 있나요?)",
            "What are the must-see attractions here?(여기서 꼭 봐야 할 명소는 무엇인가요?)",
            "Do you have any brochures for local tours?(현지 투어에 대한 브로셔가 있나요?)",
            "Can you recommend a good restaurant nearby?(근처에 좋은 식당을 추천해 주실 수 있나요?)",
            "Are there any guided tours available?(가이드 투어가 있나요?)",
            
            // 길 묻기
            "How do I get to the nearest subway station?(가장 가까운 지하철역까지 어떻게 가나요?)",
            "Can you show me the way to the museum?(박물관 가는 길을 알려주시겠어요?)",
            "Is it far from here?(여기서 멀어요?)",
            "How long does it take to walk there?(거기까지 걸어서 얼마나 걸리나요?)",
            "Can I get there by bus?(버스로 갈 수 있나요?)",
            "What is the best way to get to the airport?(공항까지 가는 가장 좋은 방법은 무엇인가요?)",
            
            // 관광버스
            "Where can I catch the sightseeing bus?(관광버스를 어디서 탈 수 있나요?)",
            "How much is a ticket for the hop-on hop-off bus?(승하차 자유 버스의 티켓 가격이 얼마인가요?)",
            "What time does the next tour bus leave?(다음 관광버스는 언제 출발하나요?)",
            "Are there any night tours available?(야경 투어가 있나요?)",
            "Can I buy the tickets online?(티켓을 온라인으로 살 수 있나요?)",
            "What are the major stops on this bus route?(이 버스 노선의 주요 정류장은 어디인가요?)",
            
            // 미술관, 박물관에서
            "Where is the entrance to the museum?(박물관 입구는 어디인가요?)",
            "How much is the admission fee?(입장료가 얼마인가요?)",
            "Are there any special exhibitions today?(오늘 특별 전시가 있나요?)",
            "Is there a guided tour available?(가이드 투어가 있나요?)",
            "Can I take pictures inside?(안에서 사진을 찍어도 되나요?)",
            "What time does the museum close?(박물관은 몇 시에 문을 닫나요?)",
            
            // 사진을 찍을 때
            "Can you take a picture of me/us?(제/우리 사진을 찍어 주실 수 있나요?)",
            "Is it okay to take photos here?(여기서 사진을 찍어도 되나요?)",
            "Could you take another one, please?(한 장 더 찍어 주실 수 있나요?)",
            "Do you mind if I take a photo of this?(이것을 사진으로 찍어도 될까요?)",
            "Where is the best spot to take pictures?(사진 찍기 좋은 곳은 어디인가요?)",
            "Is flash photography allowed here?(플래시 촬영이 가능한가요?)",
            
            // 극장, 콘서트
            "Where can I buy tickets for the show?(공연 티켓은 어디서 살 수 있나요?)",
            "What time does the concert start?(콘서트는 몇 시에 시작하나요?)",
            "Is there a dress code for the theater?(극장에 드레스 코드가 있나요?)",
            "Can I choose my seats?(좌석을 선택할 수 있나요?)",
            "How long is the performance?(공연 시간이 얼마나 되나요?)",
            "Are there any intermissions during the show?(공연 중에 휴식 시간이 있나요?)",
            
            // 테니스, 승마, 골프
            "Where can I rent tennis equipment?(테니스 장비는 어디에서 빌릴 수 있나요?)",
            "Is there a riding school nearby?(근처에 승마 학교가 있나요?)",
            "Can I book a tee time for tomorrow?(내일 골프 예약을 할 수 있나요?)",
            "Do you offer tennis lessons?(테니스 레슨을 제공하나요?)",
            "How much does it cost to rent a horse?(말을 빌리는 비용이 얼마인가요?)",
            "Are golf carts available for rent?(골프 카트를 빌릴 수 있나요?)",
            
            // 경기 관람
            "Where can I buy tickets for the game?(경기 티켓은 어디서 살 수 있나요?)",
            "What time does the match start?(경기는 몇 시에 시작하나요?)",
            "Can I bring food and drinks into the stadium?(경기장에 음식과 음료를 가져갈 수 있나요?)",
            "Where is my seat located?(제 좌석은 어디인가요?)",
            "Is there a souvenir shop in the stadium?(경기장에 기념품 가게가 있나요?)",
            "Are there any upcoming games this week?(이번 주에 예정된 경기가 있나요?)",
            
            // 해양 스포츠, 낚시, 배 여행
            "Where can I rent equipment for snorkeling?(스노클링 장비는 어디서 빌릴 수 있나요?)",
            "Are there any fishing tours available?(낚시 투어가 있나요?)",
            "Can I book a boat trip here?(여기서 배 여행을 예약할 수 있나요?)",
            "Is it safe to swim in this area?(이 지역에서 수영해도 안전한가요?)",
            "How much does it cost to rent a kayak?(카약을 빌리는 비용이 얼마인가요?)",
            "Are life jackets provided?(구명조끼가 제공되나요?)",
            
            // 스키, 스케이트
            "Where can I rent ski equipment?(스키 장비는 어디서 빌릴 수 있나요?)",
            "Are there any ice skating rinks nearby?(근처에 아이스 스케이트장이 있나요?)",
            "Can I book a skiing lesson?(스키 강습을 예약할 수 있나요?)",
            "How much is a lift ticket?(리프트 티켓 가격이 얼마인가요?)",
            "Is there a beginner slope here?(여기에 초보자용 슬로프가 있나요?)",
            "Do you have helmets for rent?(헬멧을 빌릴 수 있나요?)"
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
