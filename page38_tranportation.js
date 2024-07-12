
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            "Could you call a taxi for me?(택시를 불러 주실 수 있나요?)",
            "Where can I find a taxi stand?(택시 정류장은 어디에 있나요?)",
            "How much is the fare to the airport?(공항까지 요금이 얼마인가요?)",
            "Can you take me to this address?(이 주소로 가 주실 수 있나요?)",
            "Please stop here.(여기서 세워 주세요.)",
            "Do you accept credit cards?(신용카드 받으시나요?)",
            "How long will it take to get there?(거기까지 얼마나 걸리나요?)",
            "Where is the nearest bus stop?(가장 가까운 버스 정류장은 어디인가요?)",
            "Which bus goes to the city center?(어느 버스가 시내로 가나요?)",
            "How much is the bus fare?(버스 요금이 얼마인가요?)",
            "Do I need exact change for the bus?(버스를 탈 때 잔돈이 필요한가요?)",
            "What time is the next bus?(다음 버스는 언제 오나요?)",
            "Does this bus go to the train station?(이 버스는 기차역으로 가나요?)",
    
            // 열차를 탈 때
            "Where can I buy a train ticket?(기차표는 어디에서 살 수 있나요?)",
            "What platform does the train to London depart from?(런던행 기차는 몇 번 플랫폼에서 출발하나요?)",
            "Is this the right platform for the express train?(이곳이 급행열차 타는 플랫폼이 맞나요?)",
            "How long does the journey take?(여정은 얼마나 걸리나요?)",
            "Do I need to reserve a seat?(좌석을 예약해야 하나요?)",
            "Where is the dining car?(식당차는 어디에 있나요?)",
            "Can you help me with my luggage?(짐을 도와주실 수 있나요?)",
            "Is there a quiet car on this train?(이 열차에 조용한 칸이 있나요?)",
            "What time does the train arrive?(기차는 몇 시에 도착하나요?)",
            "Can I change my ticket to a different time?(표를 다른 시간대로 바꿀 수 있나요?)",
    
            // 지하철 탈 때
            "Which line do I take to get to the museum?(박물관에 가려면 어느 노선을 타야 하나요?)",
            "How much is a subway ticket?(지하철 표는 얼마인가요?)",
            "Where is the nearest subway station?(가장 가까운 지하철역은 어디인가요?)",
            "Do I need to transfer?(환승해야 하나요?)",
            "What time does the last train leave?(마지막 열차는 몇 시에 출발하나요?)",
            "Is this train going uptown or downtown?(이 열차는 시내로 가나요, 시외로 가나요?)",
            "How many stops until my destination?(목적지까지 몇 정거장 남았나요?)",
            "Is there a map of the subway system?(지하철 노선도가 있나요?)",
            "Can you show me how to buy a ticket?(표 사는 방법을 알려주시겠어요?)",
            "Does this train stop at Central Park?(이 열차는 센트럴파크에 정차하나요?)",
    
            // 비행기를 탈 때
            "Where is the check-in counter for this airline?(이 항공사의 체크인 카운터는 어디인가요?)",
            "What time does my flight depart?(제 비행기는 몇 시에 출발하나요?)",
            "Can I get a window seat?(창가 좌석을 받을 수 있나요?)",
            "Where is the boarding gate?(탑승 게이트는 어디인가요?)",
            "How much luggage am I allowed?(수하물 허용량이 얼마나 되나요?)",
            "Is there in-flight Wi-Fi?(기내 Wi-Fi가 있나요?)",
            "Can I get a meal on this flight?(이 비행기에서 식사를 제공하나요?)",
            "What is the gate number for my flight?(제 비행기의 게이트 번호가 뭐죠?)",
            "How early should I arrive at the airport?(공항에 얼마나 일찍 도착해야 하나요?)",
            "Where can I find a luggage cart?(수하물 카트는 어디에서 찾을 수 있나요?)",
    
            // 렌터카
            "Where can I rent a car?(차를 어디에서 렌트할 수 있나요?)",
            "What is the daily rate for a compact car?(소형차의 일일 요금이 얼마인가요?)",
            "Do I need to return the car with a full tank?(차를 반납할 때 연료를 가득 채워야 하나요?)",
            "What kind of insurance is included?(어떤 보험이 포함되어 있나요?)",
            "Can I add an additional driver?(추가 운전자를 등록할 수 있나요?)",
            "Is there a GPS system in the car?(차에 내비게이션이 있나요?)",
            "Are there any mileage limits?(주행 거리 제한이 있나요?)",
            "What is the cost for an additional driver?(추가 운전자의 비용은 얼마인가요?)",
            "Can I drop off the car at a different location?(다른 장소에서 차를 반납할 수 있나요?)",
            "Is there a fee for returning the car late?(차를 늦게 반납하면 추가 요금이 있나요?)",
    
            // 드라이브
            "Let's go for a drive.(드라이브 가자.)",
            "Where is the nearest gas station?(가장 가까운 주유소는 어디인가요?)",
            "How do I get to the highway from here?(여기서 고속도로로 가려면 어떻게 가나요?)",
            "Can you check the oil level?(오일 레벨을 확인해 주실 수 있나요?)",
            "Is there a scenic route we can take?(경치 좋은 길이 있나요?)",
            "Where can we stop for a break?(어디서 휴식을 취할 수 있나요?)",
            "Do you have a map of the area?(이 지역의 지도가 있나요?)",
            "Can we drive along the coast?(해안가를 따라 드라이브할 수 있나요?)",
            "How far is the next rest area?(다음 휴게소는 얼마나 멀리 있나요?)",
            "What’s the speed limit on this road?(이 도로의 제한 속도는 얼마인가요?)",
    
            // 차에 문제가 있을 때
            "My car broke down.(차가 고장 났어요.)",
            "Can you call a tow truck?(견인차를 불러 주실 수 있나요?)",
            "Where is the nearest repair shop?(가장 가까운 정비소는 어디인가요?)",
            "I have a flat tire.(타이어가 펑크 났어요.)",
            "The engine won’t start.(엔진이 시동이 안 걸려요.)",
            "Can you check the battery?(배터리를 확인해 주실 수 있나요?)",
            "I need a mechanic.(정비사가 필요해요.)",
            "How long will the repair take?(수리에 얼마나 걸리나요?)",
            "Can you give me an estimate for the repair?(수리 비용 견적을 알려주실 수 있나요?)",
            "Do you offer emergency roadside assistance?(긴급 출동 서비스가 있나요?)",
            "What should I do if my car overheats?(차가 과열되면 어떻게 해야 하나요?)",
            "Can I get a rental car while mine is being repaired?(내 차가 수리되는 동안 렌터카를 받을 수 있나요?)",
            "Is there a warranty on the repair?(수리에 보증이 있나요?)",
            "Can you tow my car to the nearest garage?(내 차를 가장 가까운 정비소로 견인해 주실 수 있나요?)"
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
