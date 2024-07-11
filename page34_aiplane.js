document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            // 자리 문의할 때
            "Can I switch seats with someone?(다른 사람과 자리를 바꿀 수 있을까요?)",
            "Is this seat taken?(이 자리에 사람이 앉았나요?)",
            "Can you help me find my seat?(제 좌석을 찾는 것을 도와주시겠어요?)",
            "Is there an empty seat available?(빈 자리가 있나요?)",
            
            // 기내식 주문할 때
            "What meals are available?(어떤 기내식이 있나요?)",
            "Can I have the chicken meal, please?(치킨 기내식을 주세요.)",
            "Do you have a vegetarian option?(채식 메뉴가 있나요?)",
            "Can I get a special meal? (e.g., gluten-free, kosher)(특별 기내식을 받을 수 있나요? 예: 글루텐 프리, 코셔)",
            
            // 간식 요청할 때
            "Can I have some snacks, please?(간식을 좀 주세요.)",
            "Do you have any chips or cookies?(칩이나 쿠키가 있나요?)",
            "Can I get some nuts?(견과류를 좀 주세요.)",
            "Is there any fruit available?(과일이 있나요?)",
            
            // 기내 용품 요청할 때
            "Can I have a blanket, please?(담요를 주시겠어요?)",
            "Can I get a pillow?(베개를 받을 수 있나요?)",
            "May I have some earplugs?(귀마개를 주시겠어요?)",
            "Can I get an eye mask?(안대 좀 주시겠어요?)",
            
            // 양식 작성 도움 요청할 때
            "Can you help me fill out this form?(이 양식을 작성하는 것을 도와주시겠어요?)",
            "What information do I need to fill in here?(여기에 어떤 정보를 작성해야 하나요?)",
            "Do I need to sign this form?(이 양식에 서명해야 하나요?)",
            "Is this form mandatory?(이 양식은 필수인가요?)",
            
            // 면세품 주문할 때
            "Can I see the duty-free catalog?(면세품 카탈로그를 볼 수 있을까요?)",
            "How can I order duty-free items?(면세품을 어떻게 주문하나요?)",
            "Is this item available for purchase?(이 상품을 구매할 수 있나요?)",
            "Can I pay with a credit card?(신용카드로 결제할 수 있나요?)",
            
            // 기기/시설 문의할 때
            "How do I use the in-flight entertainment system?(기내 엔터테인먼트 시스템을 어떻게 사용하나요?)",
            "Is there a power outlet at my seat?(제 좌석에 전원 콘센트가 있나요?)",
            "Can you show me how to recline the seat?(좌석을 뒤로 젖히는 방법을 알려주시겠어요?)",
            "How do I connect to the in-flight Wi-Fi?(기내 와이파이에 어떻게 연결하나요?)",
            
            // 다른 승객에게 요청할 때
            "Can you please pass me the magazine?(잡지를 건네주시겠어요?)",
            "Would you mind switching seats with me?(자리를 바꿔주시겠어요?)",
            "Can I borrow your pen for a moment?(펜을 잠시 빌릴 수 있을까요?)",
            "Could you help me put this in the overhead bin?(이것을 머리 위 짐칸에 넣는 것을 도와주시겠어요?)"
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