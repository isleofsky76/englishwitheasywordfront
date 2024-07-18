const words = [
    // Travel and Airports
    { korean: "체크인 카운터는 어디인가요?", english: "Where is the check-in counter?", pronunciation: "[wɛər ɪz ðə tʃɛk-ɪn kaʊntər]" },
    { korean: "여권과 티켓을 보여주시겠어요?", english: "Can I see your passport and ticket?", pronunciation: "[kæn aɪ siː jʊr pæspɔrt ənd tɪkɪt]" },
    { korean: "수하물 맡길 것이 있으신가요?", english: "Do you have any luggage to check?", pronunciation: "[du juː hæv ɛni lʌɡɪdʒ tu tʃɛk]" },
    { korean: "이 기내 반입 가방을 가지고 탈 수 있나요?", english: "Can I keep this carry-on bag with me?", pronunciation: "[kæn aɪ kiːp ðɪs kæri-ɒn bæɡ wɪð mi]" },
    { korean: "보안 검색대는 어디인가요?", english: "Where is the security checkpoint?", pronunciation: "[wɛər ɪz ðə sɪˈkjʊərəti tʃɛkpɔɪnt]" },
    { korean: "보안 검사 시 신발을 벗어야 하나요?", english: "Do I need to remove my shoes for security?", pronunciation: "[du aɪ niːd tu rɪˈmuːv maɪ ʃuːz fɔr sɪˈkjʊərəti]" },
    { korean: "출입국 관리소는 어디인가요?", english: "Where is the immigration office?", pronunciation: "[wɛər ɪz ði ˌɪmɪˈɡreɪʃən ɒfɪs]" },
    { korean: "출입국 신고서를 작성해야 하나요?", english: "Do I need to fill out an immigration form?", pronunciation: "[du aɪ niːd tu fɪl aʊt æn ˌɪmɪˈɡreɪʃən fɔrm]" },
    { korean: "면세점은 어디인가요?", english: "Where is the duty-free shop?", pronunciation: "[wɛər ɪz ðə ˈdjuːti-fri ʃɒp]" },
    { korean: "이 항공편의 탑승 시간은 언제인가요?", english: "What is the boarding time for this flight?", pronunciation: "[wɒt ɪz ðə bɔːrdɪŋ taɪm fɔr ðɪs flaɪt]" },
    { korean: "통로 쪽 좌석을 받을 수 있나요?", english: "Can I get an aisle seat?", pronunciation: "[kæn aɪ ɡɛt æn aɪl siːt]" },
    { korean: "탑승구는 어디인가요?", english: "Where is the boarding gate?", pronunciation: "[wɛər ɪz ðə bɔːrdɪŋ ɡeɪt]" },
    { korean: "항공편이 제시간에 출발하나요?", english: "Is the flight on time?", pronunciation: "[ɪz ðə flaɪt ɒn taɪm]" },
    { korean: "수하물 찾는 곳이 어디인가요?", english: "Where do I claim my baggage?", pronunciation: "[wɛər du aɪ kleɪm maɪ bægɪdʒ]" },
    { korean: "세관에서 신고할 것이 있나요?", english: "Do I need to declare anything at customs?", pronunciation: "[du aɪ niːd tu dɪˈkleər ɛniθɪŋ æt ˈkʌstəmz]" },
    { korean: "어디서 환전할 수 있나요?", english: "Where can I exchange currency?", pronunciation: "[wɛər kæn aɪ ɪksˈtʃeɪndʒ ˈkʌrənsi]" },
    { korean: "공항에 무료 와이파이가 있나요?", english: "Is there free Wi-Fi at the airport?", pronunciation: "[ɪz ðɛər friː ˈwaɪfaɪ æt ði ˈɛərpɔrt]" },
    { korean: "어디서 핸드폰을 충전할 수 있나요?", english: "Where can I charge my phone?", pronunciation: "[wɛər kæn aɪ tʃɑːrdʒ maɪ fəʊn]" },
    { korean: "택시 승차장은 어디인가요?", english: "Where is the taxi stand?", pronunciation: "[wɛər ɪz ðə ˈtæksi stænd]" },
    { korean: "공항 셔틀버스를 타려면 어떻게 가야 하나요?", english: "How do I get to the airport shuttle?", pronunciation: "[haʊ du aɪ ɡɛt tu ði ˈɛərpɔrt ˈʃʌtəl]" },
    { korean: "안내 데스크는 어디인가요?", english: "Where is the information desk?", pronunciation: "[wɛər ɪz ði ˌɪnfərˈmeɪʃən dɛsk]" },
    { korean: "지금 현지 시각은 몇 시인가요?", english: "What is the local time now?", pronunciation: "[wɒt ɪz ðə ˈloʊkəl taɪm naʊ]" },
    { korean: "어디서 SIM 카드를 살 수 있나요?", english: "Where can I buy a SIM card?", pronunciation: "[wɛər kæn aɪ baɪ ə sɪm kɑrd]" },
    { korean: "구매 영수증을 받을 수 있나요?", english: "Can I get a receipt for my purchase?", pronunciation: "[kæn aɪ ɡɛt ə rɪˈsiːt fɔr maɪ ˈpɜrtʃəs]" },
    { korean: "가장 가까운 화장실은 어디인가요?", english: "Where is the nearest restroom?", pronunciation: "[wɛər ɪz ðə ˈnɪərɪst ˈrɛstruːm]" },
    { korean: "장애인 승객을 위한 도움을 받을 수 있나요?", english: "Can I get assistance for a disabled passenger?", pronunciation: "[kæn aɪ ɡɛt əˈsɪstəns fɔr ə dɪsˈeɪbəld ˈpæsɪndʒər]" },
    { korean: "어디서 수하물 카트를 찾을 수 있나요?", english: "Where can I find a luggage cart?", pronunciation: "[wɛər kæn aɪ faɪnd ə ˈlʌɡɪdʒ kɑrt]" },
    { korean: "제 비행기는 어느 게이트에서 출발하나요?", english: "What gate is my flight departing from?", pronunciation: "[wɒt ɡeɪt ɪz maɪ flaɪt dɪˈpɑrtɪŋ frɒm]" },
    { korean: "어디서 잡지를 살 수 있나요?", english: "Where can I buy a magazine?", pronunciation: "[wɛər kæn aɪ baɪ ə ˈmæɡəˌzin]" },
    { korean: "근처에 식당이 있나요?", english: "Is there a restaurant nearby?", pronunciation: "[ɪz ðɛər ə ˈrɛstərɒnt ˈnɪərbaɪ]" },
    { korean: "에스컬레이터는 어디인가요?", english: "Where is the escalator?", pronunciation: "[wɛər ɪz ði ˈɛskəˌleɪtər]" },
    { korean: "엘리베이터는 어디인가요?", english: "Where is the elevator?", pronunciation: "[wɛər ɪz ði ˈɛləˌveɪtər]" },
    { korean: "비행 시간은 얼마나 걸리나요?", english: "How long is the flight?", pronunciation: "[haʊ lɒŋ ɪz ðə flaɪt]" },
    { korean: "공항 지도를 어디서 찾을 수 있나요?", english: "Where can I find a map of the airport?", pronunciation: "[wɛər kæn aɪ faɪnd ə mæp əv ði ˈɛərpɔrt]" },
    { korean: "공항 와이파이에 어떻게 연결하나요?", english: "How do I connect to the airport Wi-Fi?", pronunciation: "[haʊ du aɪ kəˈnɛkt tu ði ˈɛərpɔrt ˈwaɪfaɪ]" },
    { korean: "좌석을 업그레이드할 수 있나요?", english: "Can I upgrade my seat?", pronunciation: "[kæn aɪ ˈʌpɡreɪd maɪ siːt]" },
    { korean: "자동 체크인 기기를 어떻게 사용하나요?", english: "How do I use the automated check-in kiosk?", pronunciation: "[haʊ du aɪ juz ði ˈɔːtəˌmeɪtɪd tʃɛk-ɪn ˈkiˌɒsk]" },
    { korean: "탑승권을 어디서 출력할 수 있나요?", english: "Where can I print my boarding pass?", pronunciation: "[wɛər kæn aɪ prɪnt maɪ ˈbɔrdɪŋ pæs]" },
    { korean: "분실물 보관소는 어디인가요?", english: "Where is the lost and found?", pronunciation: "[wɛər ɪz ðə lɔst ənd faʊnd]" },
    { korean: "이 항공편의 수하물 허용 한도는 어떻게 되나요?", english: "What is the baggage allowance for this flight?", pronunciation: "[wɒt ɪz ðə ˈbæɡɪdʒ əˈlaʊəns fɔr ðɪs flaɪt]" },
    { korean: "터미널 2로 가려면 어떻게 해야 하나요?", english: "How do I get to Terminal 2?", pronunciation: "[haʊ du aɪ ɡɛt tu ˈtɜrmɪnl tu]" },
    { korean: "주차 요금은 어디서 지불하나요?", english: "Where do I pay for parking?", pronunciation: "[wɛər du aɪ peɪ fɔr ˈpɑrkɪŋ]" },
    { korean: "공항에서 쇼핑은 어디서 하나요?", english: "Where can I shop at the airport?", pronunciation: "[wɛər kæn aɪ ʃɑp æt ði ˈɛərpɔrt]" }
];


    
    
let currentWordIndex = 0;
let pronounceInterval;
let synth = window.speechSynthesis;
let autoPlayInterval;

function updateWord() {
    document.getElementById('word-korean').innerText = words[currentWordIndex].korean;
    document.getElementById('word-english').innerText = words[currentWordIndex].english;
    document.getElementById('word-pronunciation').innerText = words[currentWordIndex].pronunciation;
}

function pronounceWord(times, callback) {
    let count = 0;

    function speak() {
        if (count < times) {
            let koreanUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].korean);
            koreanUtterance.lang = 'ko-KR'; // 한국어 발음 설정
            koreanUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            let englishUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].english);
            englishUtterance.lang = 'en-US'; // 영어 발음 설정
            englishUtterance.rate = 1; // 발음 속도 설정 (1배 빠르게)

            koreanUtterance.onend = () => {
                setTimeout(() => {
                    synth.speak(englishUtterance);
                }, 1000); // 1초 지연
            };

            englishUtterance.onend = () => {
                count++;
                if (count < times) {
                    speak();
                } else if (callback) {
                    callback();
                }
            };

            synth.speak(koreanUtterance);
        }
    }

    speak();
}

function stopPronouncing() {
    clearInterval(pronounceInterval);
    clearInterval(autoPlayInterval);
    synth.cancel();
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    updateWord();
    pronounceWord(1);
}

function autoPlay() {
    stopPronouncing();

    function playNextWord() {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0;
            }
        });
    }

    playNextWord(); // 첫 단어를 즉시 재생

    autoPlayInterval = setInterval(() => {
        playNextWord(); // 8초 간격으로 다음 단어 재생
    }, 8000);
}

updateWord();

// 단어 목록을 화면에 표시하는 함수
function showWordList() {
    const wordList = document.getElementById('word-list');
    words.forEach(word => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = `<strong>${word.korean}</strong><br>${word.english}<em><br>${word.pronunciation}</em><br><br>`;
        wordList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateWord();
    showWordList(); // 페이지 로드 시 단어 목록 표시
});
