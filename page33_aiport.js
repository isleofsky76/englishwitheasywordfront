document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples:  [
            "Where is the check-in counter?(체크인 카운터는 어디인가요?)",
            "Can I see your passport and ticket?(여권과 티켓을 보여주시겠어요?)",
            "Do you have any luggage to check?(수하물 맡길 것이 있으신가요?)",
            "Can I keep this carry-on bag with me?(이 기내 반입 가방을 가지고 탈 수 있나요?)",
            "Where is the security checkpoint?(보안 검색대는 어디인가요?)",
            "Do I need to remove my shoes for security?(보안 검사 시 신발을 벗어야 하나요?)",
            "Where is the immigration office?(출입국 관리소는 어디인가요?)",
            "Do I need to fill out an immigration form?(출입국 신고서를 작성해야 하나요?)",
            "Where is the duty-free shop?(면세점은 어디인가요?)",
            "What is the boarding time for this flight?(이 항공편의 탑승 시간은 언제인가요?)",
            "Can I get an aisle seat?(통로 쪽 좌석을 받을 수 있나요?)",
            "Where is the boarding gate?(탑승구는 어디인가요?)",
            "Is the flight on time?(항공편이 제시간에 출발하나요?)",
            "Where do I claim my baggage?(수하물 찾는 곳이 어디인가요?)",
            "Do I need to declare anything at customs?(세관에서 신고할 것이 있나요?)",
            "Where can I exchange currency?(어디서 환전할 수 있나요?)",
            "Is there free Wi-Fi at the airport?(공항에 무료 와이파이가 있나요?)",
            "Where can I charge my phone?(어디서 핸드폰을 충전할 수 있나요?)",
            "Where is the taxi stand?(택시 승차장은 어디인가요?)",
            "How do I get to the airport shuttle?(공항 셔틀버스를 타려면 어떻게 가야 하나요?)",
            "Where is the information desk?(안내 데스크는 어디인가요?)",
            "What is the local time now?(지금 현지 시각은 몇 시인가요?)",
            "Where can I buy a SIM card?(어디서 SIM 카드를 살 수 있나요?)",
            "Can I get a receipt for my purchase?(구매 영수증을 받을 수 있나요?)",
            "Where is the nearest restroom?(가장 가까운 화장실은 어디인가요?)",
            "Can I get assistance for a disabled passenger?(장애인 승객을 위한 도움을 받을 수 있나요?)",
            "Where can I find a luggage cart?(어디서 수하물 카트를 찾을 수 있나요?)",
            "What gate is my flight departing from?(제 비행기는 어느 게이트에서 출발하나요?)",
            "Where can I buy a magazine?(어디서 잡지를 살 수 있나요?)",
            "Is there a restaurant nearby?(근처에 식당이 있나요?)",
            "Where is the escalator?(에스컬레이터는 어디인가요?)",
            "Where is the elevator?(엘리베이터는 어디인가요?)",
            "How long is the flight?(비행 시간은 얼마나 걸리나요?)",
            "Where can I find a map of the airport?(공항 지도를 어디서 찾을 수 있나요?)",
            "Is there a lounge I can wait in?(기다릴 수 있는 라운지가 있나요?)",
            "How do I connect to the airport Wi-Fi?(공항 와이파이에 어떻게 연결하나요?)",
            "Can I upgrade my seat?(좌석을 업그레이드할 수 있나요?)",
            "How do I use the automated check-in kiosk?(자동 체크인 기기를 어떻게 사용하나요?)",
            "Where can I print my boarding pass?(탑승권을 어디서 출력할 수 있나요?)",
            "Where is the lost and found?(분실물 보관소는 어디인가요?)",
            "What is the baggage allowance for this flight?(이 항공편의 수하물 허용 한도는 어떻게 되나요?)",
            "How do I get to Terminal 2?(터미널 2로 가려면 어떻게 해야 하나요?)",
            "Where do I pay for parking?(주차 요금은 어디서 지불하나요?)",
            "Where can I shop at the airport?(공항에서 쇼핑은 어디서 하나요?)"
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

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.sentences;
    } catch (error) {
        console.error('Error generating sentences:', error);
        throw error;
    }
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
