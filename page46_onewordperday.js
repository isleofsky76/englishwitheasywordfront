const words = [
    // Travel and Airports
    { korean: "비행기", english: "Airplane", pronunciation: "[ˈɛrpleɪn]" },
    { korean: "공항", english: "Airport", pronunciation: "[ˈɛərpɔrt]" },
    { korean: "탑승권", english: "Boarding Pass", pronunciation: "[ˈbɔrdɪŋ pæs]" },
    { korean: "수하물", english: "Baggage", pronunciation: "[ˈbæɡɪdʒ]" },
    { korean: "여권", english: "Passport", pronunciation: "[ˈpæspɔrt]" },
    { korean: "비자", english: "Visa", pronunciation: "[ˈviːzə]" },
    { korean: "출국심사", english: "Immigration Check", pronunciation: "[ˌɪmɪˈɡreɪʃən tʃɛk]" },
    { korean: "기내식", english: "In-flight Meal", pronunciation: "[ɪn-flaɪt mil]" },
    { korean: "출발", english: "Departure", pronunciation: "[dɪˈpɑrtʃər]" },
    { korean: "도착", english: "Arrival", pronunciation: "[əˈraɪvəl]" },
    { korean: "예약", english: "Reservation", pronunciation: "[ˌrɛzərˈveɪʃən]" },
    { korean: "환승", english: "Transfer", pronunciation: "[ˈtrænsfər]" },
    { korean: "직항", english: "Direct Flight", pronunciation: "[dəˈrɛkt flaɪt]" },
    { korean: "탑승구", english: "Gate", pronunciation: "[ɡeɪt]" },
    { korean: "수하물 찾는 곳", english: "Baggage Claim", pronunciation: "[ˈbæɡɪdʒ kleɪm]" },
    { korean: "항공사", english: "Airline", pronunciation: "[ˈɛərˌlaɪn]" },
    { korean: "항공편", english: "Flight", pronunciation: "[flaɪt]" },
    { korean: "지연", english: "Delay", pronunciation: "[dɪˈleɪ]" },
    { korean: "탑승 수속", english: "Check-in", pronunciation: "[tʃɛk ɪn]" },
    { korean: "기내 엔터테인먼트", english: "In-flight Entertainment", pronunciation: "[ɪn-flaɪt ˌɛntərˈteɪnmənt]" },
    { korean: "터미널", english: "Terminal", pronunciation: "[ˈtɜːrmɪnl]" },
    { korean: "경유지", english: "Stopover", pronunciation: "[ˈstɒpoʊvər]" },
    { korean: "환전소", english: "Currency Exchange", pronunciation: "[ˈkɜːrənsi ɪksˈtʃeɪndʒ]" },
    { korean: "세관", english: "Customs", pronunciation: "[ˈkʌstəmz]" },
    { korean: "입국 심사", english: "Entry Inspection", pronunciation: "[ˈɛntri ɪnˈspɛkʃən]" },
    { korean: "기내 수하물", english: "Carry-on Baggage", pronunciation: "[ˈkæri ɒn ˈbæɡɪdʒ]" },
    { korean: "보안 검색", english: "Security Check", pronunciation: "[sɪˈkjʊrəti tʃɛk]" },
    { korean: "기내 방송", english: "In-flight Announcement", pronunciation: "[ɪn-flaɪt əˈnaʊnsmənt]" },
    { korean: "안전 벨트", english: "Seatbelt", pronunciation: "[ˈsiːtbɛlt]" },
    { korean: "긴급 착륙", english: "Emergency Landing", pronunciation: "[ɪˈmɜːrdʒənsi ˈlændɪŋ]" },
    { korean: "지연 안내", english: "Delay Notice", pronunciation: "[dɪˈleɪ ˈnoʊtɪs]" },
    { korean: "탑승구 변경", english: "Gate Change", pronunciation: "[ɡeɪt tʃeɪndʒ]" },
    { korean: "기내 수하물 한도", english: "Carry-on Limit", pronunciation: "[ˈkæri ɒn ˈlɪmɪt]" },
    { korean: "추가 요금", english: "Additional Fee", pronunciation: "[əˈdɪʃənəl fi]" },

    // Accommodation and Restaurants
    { korean: "호텔", english: "Hotel", pronunciation: "[hoʊˈtɛl]" },
    { korean: "모텔", english: "Motel", pronunciation: "[moʊˈtɛl]" },
    { korean: "호스텔", english: "Hostel", pronunciation: "[ˈhɑstəl]" },
    { korean: "예약 확인서", english: "Booking Confirmation", pronunciation: "[ˈbʊkɪŋ ˌkɒnfərˈmeɪʃən]" },
    { korean: "방 키", english: "Room Key", pronunciation: "[rum ki]" },
    { korean: "체크인", english: "Check-in", pronunciation: "[tʃɛk ɪn]" },
    { korean: "체크아웃", english: "Check-out", pronunciation: "[tʃɛk aʊt]" },
    { korean: "룸서비스", english: "Room Service", pronunciation: "[rum ˈsɜrvɪs]" },
    { korean: "레스토랑", english: "Restaurant", pronunciation: "[ˈrɛstərɒnt]" },
    { korean: "메뉴", english: "Menu", pronunciation: "[ˈmɛnju]" },
    { korean: "예약", english: "Reservation", pronunciation: "[ˌrɛzərˈveɪʃən]" },
    { korean: "웨이터", english: "Waiter", pronunciation: "[ˈweɪtər]" },
    { korean: "웨이트리스", english: "Waitress", pronunciation: "[ˈweɪtrəs]" },
    { korean: "팁", english: "Tip", pronunciation: "[tɪp]" },
    { korean: "부페", english: "Buffet", pronunciation: "[bəˈfeɪ]" },
    { korean: "조식", english: "Breakfast", pronunciation: "[ˈbrɛkfəst]" },
    { korean: "중식", english: "Lunch", pronunciation: "[lʌntʃ]" },
    { korean: "석식", english: "Dinner", pronunciation: "[ˈdɪnər]" },
    { korean: "룸", english: "Room", pronunciation: "[rum]" },
    { korean: "침대", english: "Bed", pronunciation: "[bɛd]" },
    { korean: "싱글 룸", english: "Single Room", pronunciation: "[ˈsɪŋɡəl rum]" },
    { korean: "더블 룸", english: "Double Room", pronunciation: "[ˈdʌbəl rum]" },
    { korean: "트윈 룸", english: "Twin Room", pronunciation: "[twɪn rum]" },
    { korean: "스위트 룸", english: "Suite Room", pronunciation: "[swiːt rum]" },
    { korean: "미니바", english: "Minibar", pronunciation: "[ˈmɪnɪˌbɑr]" },
    { korean: "체크인 시간", english: "Check-in Time", pronunciation: "[tʃɛk ɪn taɪm]" },
    { korean: "체크아웃 시간", english: "Check-out Time", pronunciation: "[tʃɛk aʊt taɪm]" },
    { korean: "컨시어지", english: "Concierge", pronunciation: "[kɒnˈsɪərdʒ]" },
    { korean: "청소 서비스", english: "Cleaning Service", pronunciation: "[ˈkliːnɪŋ ˈsɜrvɪs]" },
    { korean: "프런트 데스크", english: "Front Desk", pronunciation: "[frʌnt dɛsk]" },
    { korean: "바다 전망", english: "Sea View", pronunciation: "[siː vjuː]" },
    { korean: "산 전망", english: "Mountain View", pronunciation: "[ˈmaʊntɪn vjuː]" },
    { korean: "와이파이", english: "Wi-Fi", pronunciation: "[ˈwaɪˌfaɪ]" },
    { korean: "조식 포함", english: "Breakfast Included", pronunciation: "[ˈbrɛkfəst ɪnˈkluːdɪd]" },
    { korean: "추가 침대", english: "Extra Bed", pronunciation: "[ˈɛkstrə bɛd]" },
    { korean: "예약 취소", english: "Reservation Cancellation", pronunciation: "[ˌrɛzərˈveɪʃən ˌkænsəˈleɪʃən]" },
    { korean: "금연 객실", english: "Non-smoking Room", pronunciation: "[nɒn ˈsmoʊkɪŋ rum]" },
    { korean: "흡연 객실", english: "Smoking Room", pronunciation: "[ˈsmoʊkɪŋ rum]" },
    { korean: "체육관", english: "Gym", pronunciation: "[dʒɪm]" },
    { korean: "수영장", english: "Swimming Pool", pronunciation: "[ˈswɪmɪŋ pul]" },
    { korean: "사우나", english: "Sauna", pronunciation: "[ˈsɔːnə]" },
    { korean: "세탁 서비스", english: "Laundry Service", pronunciation: "[ˈlɔːndri ˈsɜrvɪs]" },
    { korean: "룸 어메니티", english: "Room Amenities", pronunciation: "[rum əˈmɛnɪtiz]" },

    // Transportation
    { korean: "버스", english: "Bus", pronunciation: "[bʌs]" },
    { korean: "기차", english: "Train", pronunciation: "[treɪn]" },
    { korean: "택시", english: "Taxi", pronunciation: "[ˈtæksi]" },
    { korean: "지하철", english: "Subway", pronunciation: "[ˈsʌbweɪ]" },
    { korean: "자동차", english: "Car", pronunciation: "[kɑr]" },
    { korean: "자전거", english: "Bicycle", pronunciation: "[ˈbaɪsɪkl]" },
    { korean: "오토바이", english: "Motorcycle", pronunciation: "[ˈmoʊtərˌsaɪkl]" },
    { korean: "고속도로", english: "Highway", pronunciation: "[ˈhaɪweɪ]" },
    { korean: "교통 체증", english: "Traffic Jam", pronunciation: "[ˈtræfɪk ʤæm]" },
    { korean: "신호등", english: "Traffic Light", pronunciation: "[ˈtræfɪk laɪt]" },
    { korean: "주차장", english: "Parking Lot", pronunciation: "[ˈpɑrkɪŋ lɒt]" },
    { korean: "표", english: "Ticket", pronunciation: "[ˈtɪkɪt]" },
    { korean: "노선", english: "Route", pronunciation: "[ruːt]" },
    { korean: "정류장", english: "Station", pronunciation: "[ˈsteɪʃən]" },
    { korean: "환승", english: "Transfer", pronunciation: "[ˈtrænsfər]" },
    { korean: "운전", english: "Driving", pronunciation: "[ˈdraɪvɪŋ]" },
    { korean: "면허증", english: "License", pronunciation: "[ˈlaɪsəns]" },
    { korean: "내비게이션", english: "Navigation", pronunciation: "[ˌnævɪˈɡeɪʃən]" },
    { korean: "차선", english: "Lane", pronunciation: "[leɪn]" },
    { korean: "보행자", english: "Pedestrian", pronunciation: "[pəˈdɛstriən]" },
    { korean: "주유소", english: "Gas Station", pronunciation: "[ɡæs ˈsteɪʃən]" },
    { korean: "차량 공유", english: "Car Sharing", pronunciation: "[kɑr ˈʃɛrɪŋ]" },
    { korean: "전기차", english: "Electric Vehicle", pronunciation: "[ɪˈlɛktrɪk ˈviːɪkəl]" },
    { korean: "전기 스쿠터", english: "Electric Scooter", pronunciation: "[ɪˈlɛktrɪk ˈskuːtər]" },
    { korean: "도로 표지판", english: "Road Sign", pronunciation: "[roʊd saɪn]" },
    { korean: "운전 면허 시험", english: "Driving Test", pronunciation: "[ˈdraɪvɪŋ tɛst]" },
    { korean: "고속 철도", english: "High-speed Rail", pronunciation: "[haɪ spiːd reɪl]" },
    { korean: "장거리 버스", english: "Long-distance Bus", pronunciation: "[ˈlɔŋ ˈdɪstəns bʌs]" },
    { korean: "지하철역", english: "Subway Station", pronunciation: "[ˈsʌbweɪ ˈsteɪʃən]" },
    { korean: "주차 요금", english: "Parking Fee", pronunciation: "[ˈpɑrkɪŋ fi]" },
    { korean: "교통 사고", english: "Traffic Accident", pronunciation: "[ˈtræfɪk ˈæksɪdənt]" },
    { korean: "대중교통", english: "Public Transportation", pronunciation: "[ˈpʌblɪk ˌtrænspɔːrˈteɪʃən]" },
    { korean: "운전 규칙", english: "Driving Rules", pronunciation: "[ˈdraɪvɪŋ rulz]" },
    { korean: "도로 작업", english: "Road Work", pronunciation: "[roʊd wɜrk]" },
    { korean: "교통 신호", english: "Traffic Signal", pronunciation: "[ˈtræfɪk ˈsɪɡnəl]" },
    { korean: "통행료", english: "Toll", pronunciation: "[toʊl]" },
    { korean: "고속도로 출구", english: "Highway Exit", pronunciation: "[ˈhaɪweɪ ˈɛksɪt]" },
    { korean: "교통 혼잡", english: "Traffic Congestion", pronunciation: "[ˈtræfɪk kənˈdʒɛstʃən]" },
    { korean: "주차 공간", english: "Parking Space", pronunciation: "[ˈpɑrkɪŋ speɪs]" },
    { korean: "차량 정비", english: "Vehicle Maintenance", pronunciation: "[ˈviːɪkəl ˈmeɪntənəns]" },
    { korean: "운전 습관", english: "Driving Habit", pronunciation: "[ˈdraɪvɪŋ ˈhæbɪt]" },
    { korean: "차량 보험", english: "Car Insurance", pronunciation: "[kɑr ɪnˈʃʊərəns]" },
    { korean: "렌터카", english: "Rental Car", pronunciation: "[ˈrɛntəl kɑr]" },
    { korean: "자동차 검사", english: "Car Inspection", pronunciation: "[kɑr ɪnˈspɛkʃən]" },
    { korean: "차량 등록", english: "Vehicle Registration", pronunciation: "[ˈviːɪkəl ˌrɛdʒɪˈstreɪʃən]" },
    { korean: "차선 변경", english: "Lane Change", pronunciation: "[leɪn tʃeɪndʒ]" },
    { korean: "회전 교차로", english: "Roundabout", pronunciation: "[ˈraʊndəˌbaʊt]" },
    { korean: "교통 규칙", english: "Traffic Rules", pronunciation: "[ˈtræfɪk rulz]" },
    { korean: "운전 시간", english: "Driving Time", pronunciation: "[ˈdraɪvɪŋ taɪm]" },
    { korean: "도로 사고", english: "Road Accident", pronunciation: "[roʊd ˈæksɪdənt]" },
    { korean: "교통 표지", english: "Traffic Sign", pronunciation: "[ˈtræfɪk saɪn]" },
    { korean: "도로 교통법", english: "Traffic Law", pronunciation: "[ˈtræfɪk lɔ]" },
    { korean: "주차장 관리", english: "Parking Management", pronunciation: "[ˈpɑrkɪŋ ˈmænɪdʒmənt]" },
    { korean: "교통사고", english: "Traffic Accident", pronunciation: "[ˈtræfɪk ˈæksɪdənt]" },
    { korean: "차량 흐름", english: "Traffic Flow", pronunciation: "[ˈtræfɪk floʊ]" },
    { korean: "교통 패턴", english: "Traffic Pattern", pronunciation: "[ˈtræfɪk ˈpætərn]" },
    { korean: "도로 상태", english: "Road Condition", pronunciation: "[roʊd kənˈdɪʃən]" },
    { korean: "교통 신호기", english: "Traffic Signal", pronunciation: "[ˈtræfɪk ˈsɪɡnəl]" },
    { korean: "운전 행태", english: "Driving Behavior", pronunciation: "[ˈdraɪvɪŋ bɪˈheɪvjər]" },
    { korean: "보행자 안전", english: "Pedestrian Safety", pronunciation: "[pəˈdɛstriən ˈseɪfti]" },
    { korean: "자전거 도로", english: "Bicycle Lane", pronunciation: "[ˈbaɪsɪkl leɪn]" },
    { korean: "자동차 공유", english: "Car Sharing", pronunciation: "[kɑr ˈʃɛrɪŋ]" },
    { korean: "전기차 충전소", english: "Electric Car Charging Station", pronunciation: "[ɪˈlɛktrɪk kɑr ˈtʃɑrdʒɪŋ ˈsteɪʃən]" },
    { korean: "고속철도역", english: "High-speed Train Station", pronunciation: "[haɪ spiːd treɪn ˈsteɪʃən]" },
    { korean: "도로교통 안전", english: "Road Safety", pronunciation: "[roʊd ˈseɪfti]" },
    { korean: "교통 위반", english: "Traffic Violation", pronunciation: "[ˈtræfɪk vaɪəˈleɪʃən]" },
    { korean: "도로 상태", english: "Road Condition", pronunciation: "[roʊd kənˈdɪʃən]" },
    { korean: "차량 유지보수", english: "Vehicle Maintenance", pronunciation: "[ˈviːɪkəl ˈmeɪntənəns]" },
    { korean: "고속도로 표지판", english: "Highway Sign", pronunciation: "[ˈhaɪweɪ saɪn]" },
    { korean: "주차장", english: "Parking Lot", pronunciation: "[ˈpɑrkɪŋ lɒt]" },
    { korean: "대중교통 이용", english: "Using Public Transportation", pronunciation: "[ˈjuzɪŋ ˈpʌblɪk ˌtrænspɔːrˈteɪʃən]" },
    { korean: "운전 면허", english: "Driver's License", pronunciation: "[ˈdraɪvərz ˈlaɪsəns]" },
    { korean: "자동차 세차", english: "Car Wash", pronunciation: "[kɑr wɒʃ]" },
    { korean: "고속도로 통행료", english: "Highway Toll", pronunciation: "[ˈhaɪweɪ toʊl]" },
    { korean: "교통 혼잡 해결책", english: "Traffic Congestion Solution", pronunciation: "[ˈtræfɪk kənˈdʒɛstʃən səˈluːʃən]" },
    { korean: "차량 공유 서비스", english: "Car Sharing Service", pronunciation: "[kɑr ˈʃɛrɪŋ ˈsɜrvɪs]" },
    { korean: "자전거 대여", english: "Bicycle Rental", pronunciation: "[ˈbaɪsɪkl ˈrɛntəl]" },
    { korean: "주차장 공간", english: "Parking Space", pronunciation: "[ˈpɑrkɪŋ speɪs]" },
    { korean: "자동차 유지보수", english: "Car Maintenance", pronunciation: "[kɑr ˈmeɪntənəns]" },
    { korean: "도로 안전", english: "Road Safety", pronunciation: "[roʊd ˈseɪfti]" },
    { korean: "교통 사고", english: "Traffic Accident", pronunciation: "[ˈtræfɪk ˈæksɪdənt]" },
    { korean: "차량 정비소", english: "Auto Repair Shop", pronunciation: "[ˈɔtoʊ rɪˈpɛr ʃɑp]" },
    { korean: "전기차 충전기", english: "Electric Vehicle Charger", pronunciation: "[ɪˈlɛktrɪk ˈviːɪkəl ˈʧɑrdʒər]" },
    { korean: "대중교통 노선", english: "Public Transport Route", pronunciation: "[ˈpʌblɪk ˈtrænspɔːrt ruːt]" },
    { korean: "교통 관리", english: "Traffic Management", pronunciation: "[ˈtræfɪk ˈmænɪdʒmənt]" },
    { korean: "차선 변경", english: "Lane Change", pronunciation: "[leɪn ʧeɪndʒ]" },
    { korean: "교통사고 대처법", english: "Traffic Accident Response", pronunciation: "[ˈtræfɪk ˈæksɪdənt rɪˈspɒns]" },
    { korean: "운전 매너", english: "Driving Etiquette", pronunciation: "[ˈdraɪvɪŋ ˈɛtɪkət]" },
    { korean: "주차 비용", english: "Parking Fee", pronunciation: "[ˈpɑrkɪŋ fi]" },
    { korean: "도로 표지판", english: "Road Sign", pronunciation: "[roʊd saɪn]" },
    { korean: "대중교통 요금", english: "Public Transport Fare", pronunciation: "[ˈpʌblɪk ˈtrænspɔːrt fɛr]" },
    { korean: "도로공사", english: "Road Construction", pronunciation: "[roʊd kənˈstrʌkʃən]" },
    { korean: "교통사고 보험", english: "Traffic Accident Insurance", pronunciation: "[ˈtræfɪk ˈæksɪdənt ɪnˈʃʊrəns]" },
    { korean: "주차 공간 찾기", english: "Finding Parking Space", pronunciation: "[ˈfaɪndɪŋ ˈpɑrkɪŋ speɪs]" },
    { korean: "자동차 소유", english: "Car Ownership", pronunciation: "[kɑr ˈoʊnərˌʃɪp]" },
    { korean: "운전 면허 발급", english: "Driver's License Issuance", pronunciation: "[ˈdraɪvərz ˈlaɪsəns ˈɪʃuːəns]" },
    { korean: "교통사고 예방", english: "Traffic Accident Prevention", pronunciation: "[ˈtræfɪk ˈæksɪdənt prɪˈvɛnʃən]" },
    { korean: "도로 안전 관리", english: "Road Safety Management", pronunciation: "[roʊd ˈseɪfti ˈmænɪdʒmənt]" },
    { korean: "대중교통 이용 방법", english: "How to Use Public Transportation", pronunciation: "[haʊ tə juz ˈpʌblɪk ˌtrænspɔːrtˈteɪʃən]" }
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
    currentWordIndex = 0; // 처음부터 시작
    autoPlayInterval = setInterval(() => {
        updateWord();
        pronounceWord(1, () => {
            currentWordIndex++;
            if (currentWordIndex >= words.length) {
                currentWordIndex = 0; // 끝에 도달하면 처음으로 돌아가기
            }
        });
    }, 6000); // 6초마다 다음 단어로 넘어가고 발음 (발음 시간 3초 + 대기 시간 3초)
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
