const words = [
        { korean: "경제성장", english: "Economic Growth", pronunciation: "[ɪˌkɑːnəmɪk ɡroʊθ]" },
        { korean: "물가상승률", english: "Inflation Rate", pronunciation: "[ɪnˈfleɪʃən reɪt]" },
        { korean: "실업률", english: "Unemployment Rate", pronunciation: "[ˌʌnɪmˈplɔɪmənt reɪt]" },
        { korean: "국내총생산", english: "Gross Domestic Product (GDP)", pronunciation: "[ɡroʊs dəˈmɛstɪk ˈprɒdʌkt]" },
        { korean: "수요와 공급", english: "Supply and Demand", pronunciation: "[səˈplaɪ ənd dɪˈmænd]" },
        { korean: "이자율", english: "Interest Rate", pronunciation: "[ˈɪntərɪst reɪt]" },
        { korean: "국제무역", english: "International Trade", pronunciation: "[ˌɪntərˈnæʃənl treɪd]" },
        { korean: "통화정책", english: "Monetary Policy", pronunciation: "[ˈmɑːnɪteri ˈpɑːləsi]" },
        { korean: "재정정책", english: "Fiscal Policy", pronunciation: "[ˈfɪskl ˈpɑːləsi]" },
        { korean: "통화량", english: "Money Supply", pronunciation: "[ˈmʌni səˈplaɪ]" },
        { korean: "인플레이션", english: "Inflation", pronunciation: "[ɪnˈfleɪʃən]" },
        { korean: "디플레이션", english: "Deflation", pronunciation: "[dɪˈfleɪʃən]" },
        { korean: "스태그플레이션", english: "Stagflation", pronunciation: "[stæɡˈfleɪʃən]" },
        { korean: "자산", english: "Assets", pronunciation: "[ˈæsɛts]" },
        { korean: "부채", english: "Liabilities", pronunciation: "[ˌlaɪəˈbɪlɪtiz]" },
        { korean: "자본", english: "Capital", pronunciation: "[ˈkæpɪtl]" },
        { korean: "주식", english: "Stocks", pronunciation: "[stɒks]" },
        { korean: "채권", english: "Bonds", pronunciation: "[bɒndz]" },
        { korean: "재정적자", english: "Budget Deficit", pronunciation: "[ˈbʌdʒɪt ˈdɛfɪsɪt]" },
        { korean: "재정흑자", english: "Budget Surplus", pronunciation: "[ˈbʌdʒɪt ˈsɜːrpləs]" },
        { korean: "국채", english: "Government Bonds", pronunciation: "[ˈɡʌvərnmənt bɒndz]" },
        { korean: "무역수지", english: "Trade Balance", pronunciation: "[treɪd ˈbæləns]" },
        { korean: "경상수지", english: "Current Account Balance", pronunciation: "[ˈkɜːrənt əˈkaʊnt ˈbæləns]" },
        { korean: "금리", english: "Interest Rate", pronunciation: "[ˈɪntərɪst reɪt]" },
        { korean: "환율", english: "Exchange Rate", pronunciation: "[ɪksˈtʃeɪndʒ reɪt]" },
        { korean: "외환보유고", english: "Foreign Exchange Reserves", pronunciation: "[ˈfɔːrən ɪksˈtʃeɪndʒ rɪˈzɜːrvz]" },
        { korean: "환율변동", english: "Exchange Rate Fluctuation", pronunciation: "[ɪksˈtʃeɪndʒ reɪt ˌflʌktʃuˈeɪʃən]" },
        { korean: "금융시장", english: "Financial Market", pronunciation: "[faɪˈnænʃl ˈmɑːrkɪt]" },
        { korean: "자본시장", english: "Capital Market", pronunciation: "[ˈkæpɪtl ˈmɑːrkɪt]" },
        { korean: "주식시장", english: "Stock Market", pronunciation: "[stɒk ˈmɑːrkɪt]" },
        { korean: "채권시장", english: "Bond Market", pronunciation: "[bɒnd ˈmɑːrkɪt]" },
        { korean: "부동산시장", english: "Real Estate Market", pronunciation: "[ˈriːəl ɪˈsteɪt ˈmɑːrkɪt]" },
        { korean: "소비자물가지수", english: "Consumer Price Index (CPI)", pronunciation: "[kənˈsjuːmər praɪs ˈɪndɛks]" },
        { korean: "생산자물가지수", english: "Producer Price Index (PPI)", pronunciation: "[prəˈdjuːsər praɪs ˈɪndɛks]" },
        { korean: "경제지표", english: "Economic Indicators", pronunciation: "[ɪˌkɑːnəmɪk ˈɪndɪkeɪtərz]" },
        { korean: "경기침체", english: "Recession", pronunciation: "[rɪˈsɛʃən]" },
        { korean: "경기회복", english: "Economic Recovery", pronunciation: "[ɪˌkɑːnəmɪk rɪˈkʌvəri]" },
        { korean: "자본이득", english: "Capital Gains", pronunciation: "[ˈkæpɪtl ɡeɪnz]" },
        { korean: "배당", english: "Dividends", pronunciation: "[ˈdɪvɪdɛndz]" },
        { korean: "기업인수합병", english: "Mergers and Acquisitions (M&A)", pronunciation: "[ˈmɜːrdʒərz ənd ˌækwɪˈzɪʃənz]" },
        { korean: "독점", english: "Monopoly", pronunciation: "[məˈnɒpəli]" },
        { korean: "과점", english: "Oligopoly", pronunciation: "[ˌɒlɪˈɡɒpəli]" },
        { korean: "경쟁", english: "Competition", pronunciation: "[ˌkɒmpɪˈtɪʃən]" },
        { korean: "시장경제", english: "Market Economy", pronunciation: "[ˈmɑːrkɪt ɪˈkɑːnəmi]" },
        { korean: "혼합경제", english: "Mixed Economy", pronunciation: "[mɪkst ɪˈkɑːnəmi]" },
        { korean: "계획경제", english: "Planned Economy", pronunciation: "[plænd ɪˈkɑːnəmi]" },
        { korean: "소비", english: "Consumption", pronunciation: "[kənˈsʌmpʃən]" },
        { korean: "저축", english: "Savings", pronunciation: "[ˈseɪvɪŋz]" },
        { korean: "투자", english: "Investment", pronunciation: "[ɪnˈvɛstmənt]" },
        { korean: "외국인직접투자", english: "Foreign Direct Investment (FDI)", pronunciation: "[ˈfɔːrən dəˈrɛkt ɪnˈvɛstmənt]" },
        { korean: "정부지출", english: "Government Spending", pronunciation: "[ˈɡʌvərnmənt ˈspɛndɪŋ]" },
        { korean: "민간지출", english: "Private Spending", pronunciation: "[ˈpraɪvət ˈspɛndɪŋ]" },
        { korean: "공공재", english: "Public Goods", pronunciation: "[ˈpʌblɪk ɡʊdz]" },
        { korean: "민간재", english: "Private Goods", pronunciation: "[ˈpraɪvət ɡʊdz]" },
        { korean: "소득재분배", english: "Income Redistribution", pronunciation: "[ˈɪnkʌm ˌriːdɪstrɪˈbjuːʃən]" },
        { korean: "세금", english: "Taxes", pronunciation: "[ˈtæksɪz]" },
        { korean: "법인세", english: "Corporate Tax", pronunciation: "[ˈkɔːrpərət tæks]" },
        { korean: "소득세", english: "Income Tax", pronunciation: "[ˈɪnkʌm tæks]" },
        { korean: "부가가치세", english: "Value Added Tax (VAT)", pronunciation: "[ˈvælju ˈædɪd tæks]" },
        { korean: "관세", english: "Tariffs", pronunciation: "[ˈtærɪfs]" },
        { korean: "무역장벽", english: "Trade Barriers", pronunciation: "[treɪd ˈbæriərz]" },
        { korean: "자유무역", english: "Free Trade", pronunciation: "[friː treɪd]" },
        { korean: "보호무역", english: "Protectionism", pronunciation: "[prəˈtɛkʃənɪzəm]" },
        { korean: "자유시장", english: "Free Market", pronunciation: "[friː ˈmɑːrkɪt]" },
        { korean: "경쟁우위", english: "Competitive Advantage", pronunciation: "[kəmˈpɛtɪtɪv ədˈvæntɪdʒ]" },
        { korean: "비교우위", english: "Comparative Advantage", pronunciation: "[kəmˈpærətɪv ədˈvæntɪdʒ]" },
        { korean: "무역적자", english: "Trade Deficit", pronunciation: "[treɪd ˈdɛfɪsɪt]" },
        { korean: "무역흑자", english: "Trade Surplus", pronunciation: "[treɪd ˈsɜːrpləs]" },
        { korean: "수출", english: "Exports", pronunciation: "[ˈɛkspɔːrts]" },
        { korean: "수입", english: "Imports", pronunciation: "[ˈɪmpɔːrts]" },
        { korean: "경상수지", english: "Current Account Balance", pronunciation: "[ˈkɜːrənt əˈkaʊnt ˈbæləns]" },
        { korean: "자본수지", english: "Capital Account Balance", pronunciation: "[ˈkæpɪtl əˈkaʊnt ˈbæləns]" },
        { korean: "통화스왑", english: "Currency Swap", pronunciation: "[ˈkɜːrənsi swɑːp]" },
        { korean: "외환시장", english: "Foreign Exchange Market", pronunciation: "[ˈfɔːrən ɪksˈtʃeɪndʒ ˈmɑːrkɪt]" },
        { korean: "기준금리", english: "Base Interest Rate", pronunciation: "[beɪs ˈɪntərɪst reɪt]" },
        { korean: "중앙은행", english: "Central Bank", pronunciation: "[ˈsɛntrəl bæŋk]" },
        { korean: "화폐정책", english: "Currency Policy", pronunciation: "[ˈkɜːrənsi ˈpɑːləsi]" },
        { korean: "금융자산", english: "Financial Assets", pronunciation: "[faɪˈnænʃl ˈæsɛts]" },
        { korean: "부동산자산", english: "Real Estate Assets", pronunciation: "[ˈriːəl ɪˈsteɪt ˈæsɛts]" },
        { korean: "주택담보대출", english: "Mortgage Loan", pronunciation: "[ˈmɔːrɡɪdʒ loʊn]" },
        { korean: "기업대출", english: "Corporate Loan", pronunciation: "[ˈkɔːrpərət loʊn]" },
        { korean: "소비자대출", english: "Consumer Loan", pronunciation: "[kənˈsjuːmər loʊn]" },
        { korean: "국제금융", english: "International Finance", pronunciation: "[ˌɪntərˈnæʃənl faɪˈnæns]" },
        { korean: "주식거래", english: "Stock Trading", pronunciation: "[stɒk ˈtreɪdɪŋ]" },
        { korean: "파생상품", english: "Derivatives", pronunciation: "[dɪˈrɪvətɪvz]" },
        { korean: "헤지펀드", english: "Hedge Fund", pronunciation: "[hɛdʒ fʌnd]" },
        { korean: "투자은행", english: "Investment Bank", pronunciation: "[ɪnˈvɛstmənt bæŋk]" },
        { korean: "상업은행", english: "Commercial Bank", pronunciation: "[kəˈmɜːrʃl bæŋk]" },
        { korean: "신용평가", english: "Credit Rating", pronunciation: "[ˈkrɛdɪt ˈreɪtɪŋ]" },
        { korean: "리스크관리", english: "Risk Management", pronunciation: "[rɪsk ˈmænɪdʒmənt]" },
        { korean: "재무제표", english: "Financial Statements", pronunciation: "[faɪˈnænʃl ˈsteɪtmənts]" },
        { korean: "손익계산서", english: "Income Statement", pronunciation: "[ˈɪnkʌm ˈsteɪtmənt]" },
        { korean: "대차대조표", english: "Balance Sheet", pronunciation: "[ˈbæləns ʃiːt]" },
        { korean: "현금흐름표", english: "Cash Flow Statement", pronunciation: "[kæʃ floʊ ˈsteɪtmənt]" }
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
                synth.speak(englishUtterance);
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
        playNextWord();
    }, 8000); // 8초 간격으로 다음 단어 재생
}

updateWord();

function startSandClock() {
    const sandClock = document.querySelector('.sand-clock');
    sandClock.style.display = 'block';
    setTimeout(() => {
        sandClock.style.display = 'none';
    }, 300000); // 5분 후 숨김
}


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
