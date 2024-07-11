document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.getElementById('generateButton');
    const loadingSection = document.getElementById('loading');
    const resultsSection = document.getElementById('results');
    const sentenceList = document.getElementById('sentenceList');
    const topicInput = document.getElementById('topicInput');

    const keywords = {
        examples: [
            // 할인점에서
            "Where can I find the sale items?(세일 품목은 어디서 찾을 수 있나요?)",
            "Do you have any discounts on this item?(이 제품에 할인 있나요?)",
            "Is this on sale?(이거 세일 중인가요?)",
            "Can I use this coupon here?(이 쿠폰을 여기서 사용할 수 있나요?)",
            "What's the return policy?(반품 정책은 어떻게 되나요?)",
            "Do you have any buy one get one free offers?(1+1 행사가 있나요?)",
            "Can I get a price match on this item?(이 제품 가격 매칭이 가능한가요?)",
            "Do you offer student discounts?(학생 할인이 있나요?)",
            "Where are the clearance items?(재고 정리 품목은 어디에 있나요?)",
            "Are there any special promotions today?(오늘 특별 프로모션이 있나요?)",
            "Do you have a loyalty card I can use?(사용할 수 있는 멤버십 카드가 있나요?)",
            "Can I return this if it’s defective?(이 제품에 결함이 있으면 반품할 수 있나요?)",
            "Is there a time limit on this sale?(이 세일은 언제까지 하나요?)",
            "Can you hold this item for me?(이 제품을 맡아줄 수 있나요?)",
            "What is the discount percentage?(할인율은 얼마인가요?)",
    
            // 백화점에서
            "Where is the women's clothing section?(여성 의류 코너는 어디인가요?)",
            "Can you help me find a specific brand?(특정 브랜드를 찾는 것을 도와주시겠어요?)",
            "Is there a fitting room available?(피팅룸이 있나요?)",
            "Can I get this gift-wrapped?(이거 선물 포장할 수 있나요?)",
            "What are the store hours?(영업 시간은 어떻게 되나요?)",
            "Do you have a loyalty program?(멤버십 프로그램이 있나요?)",
            "Can I pay with a credit card?(신용카드로 결제할 수 있나요?)",
            "Where is customer service?(고객 서비스 센터는 어디인가요?)",
            "Are there any seasonal sales happening now?(현재 계절 할인 행사가 있나요?)",
            "Do you offer free parking?(무료 주차가 가능한가요?)",
            "Is there a café or restaurant inside the store?(매장 내에 카페나 레스토랑이 있나요?)",
            "Can I get a VAT refund form?(부가가치세 환급 양식을 받을 수 있나요?)",
            "Do you have a personal shopper service?(퍼스널 쇼퍼 서비스가 있나요?)",
            "Where can I find the home appliances section?(가전제품 코너는 어디인가요?)",
            "Can you send my purchase to my hotel?(구매한 물건을 호텔로 배송해줄 수 있나요?)",
    
            // 쇼핑몰에서
            "Where is the nearest restroom?(가장 가까운 화장실은 어디인가요?)",
            "Are there any good restaurants in the mall?(이 쇼핑몰에 괜찮은 레스토랑이 있나요?)",
            "Do you have a map of the mall?(쇼핑몰 지도가 있나요?)",
            "Where can I find the electronics store?(전자제품 매장은 어디에 있나요?)",
            "Is there a food court in the mall?(이 쇼핑몰에 푸드코트가 있나요?)",
            "Can you validate my parking ticket?(주차권을 검증해 주실 수 있나요?)",
            "Are there any events happening in the mall today?(오늘 쇼핑몰에서 어떤 이벤트가 있나요?)",
            "Where is the lost and found?(분실물 센터는 어디인가요?)",
            "Do you offer gift cards?(기프트 카드를 판매하나요?)",
            "Is there a playground for kids?(아이들을 위한 놀이터가 있나요?)",
            "Where can I find the nearest ATM?(가장 가까운 ATM은 어디에 있나요?)",
            "Is there a currency exchange service in the mall?(쇼핑몰에 환전 서비스가 있나요?)",
            "Can I get a directory of all the stores in the mall?(쇼핑몰 내 모든 매장의 안내도를 받을 수 있나요?)",
            "Are there any entertainment options like a cinema or arcade?(영화관이나 오락실 같은 오락 시설이 있나요?)",
            "Where is the mall information desk?(쇼핑몰 안내 데스크는 어디에 있나요?)",
    
            // 슈퍼마켓에서
            "Where can I find the dairy section?(유제품 코너는 어디인가요?)",
            "Do you have organic produce?(유기농 농산물이 있나요?)",
            "Is this gluten-free?(이것은 글루텐 프리인가요?)",
            "Can I get this item in bulk?(이 제품을 대량으로 살 수 있나요?)",
            "Where is the checkout counter?(계산대는 어디에 있나요?)",
            "Do you have a loyalty card?(멤버십 카드가 있나요?)",
            "Can I get a bag for this?(이것을 담을 봉투를 받을 수 있나요?)",
            "What time do you close?(몇 시에 문을 닫나요?)",
            "Do you have any fresh bread?(신선한 빵이 있나요?)",
            "Can I find international foods here?(여기서 국제 음식을 찾을 수 있나요?)",
            "Is there a section for frozen foods?(냉동 식품 코너가 있나요?)",
            "Where are the cleaning supplies?(청소 용품은 어디에 있나요?)",
            "Do you sell alcoholic beverages here?(여기서 주류를 판매하나요?)",
            "Can I find non-dairy milk alternatives here?(여기서 비유제품 우유 대체품을 찾을 수 있나요?)",
            "Where can I find the pet food aisle?(애완동물 사료 코너는 어디에 있나요?)",
    
            // 옷 가게에서
            "Can I try this on?(이거 입어봐도 되나요?)",
            "Do you have this in a different size?(이거 다른 사이즈 있나요?)",
            "Is this available in another color?(이거 다른 색상으로 있나요?)",
            "What's the fabric of this clothing?(이 옷의 소재는 무엇인가요?)",
            "Do you have any new arrivals?(새로 들어온 제품이 있나요?)",
            "Can I get a refund if it doesn't fit?(사이즈가 맞지 않으면 환불 가능한가요?)",
            "Are there any promotions on clothing items?(의류 품목에 프로모션이 있나요?)",
            "Can I exchange this item?(이 제품을 교환할 수 있나요?)",
            "Is there a sale section in the store?(매장에 세일 코너가 있나요?)",
            "Do you offer tailoring services?(재단 서비스를 제공하나요?)",
            "Can I get a fitting recommendation?(어떤 사이즈가 맞을지 추천해 주실 수 있나요?)",
            "Is this material machine washable?(이 소재는 세탁기로 세탁할 수 있나요?)",
            "Do you have matching accessories for this outfit?(이 옷에 맞는 액세서리가 있나요?)",
            "Where is the clearance rack?(재고 정리 코너는 어디에 있나요?)",
            "Can I get this gift-wrapped?(이 제품을 선물 포장할 수 있나요?)"
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