const words = [
    { korean: "오븐", english: "oven", pronunciation: "[ˈʌvən]" },
    { korean: "전자레인지", english: "microwave", pronunciation: "[ˈmaɪkrəˌweɪv]" },
    { korean: "냉장고", english: "refrigerator", pronunciation: "[rɪˈfrɪdʒəˌreɪtər]" },
    { korean: "싱크대", english: "sink", pronunciation: "[sɪŋk]" },
    { korean: "스토브", english: "stove", pronunciation: "[stoʊv]" },
    { korean: "식기세척기", english: "dishwasher", pronunciation: "[ˈdɪʃˌwɑːʃər]" },
    { korean: "프라이팬", english: "frying pan", pronunciation: "[ˈfraɪɪŋ pæn]" },
    { korean: "냄비", english: "pot", pronunciation: "[pɒt]" },
    { korean: "주걱", english: "spatula", pronunciation: "[ˈspætʃələ]" },
    { korean: "믹서기", english: "blender", pronunciation: "[ˈblɛndər]" },
    { korean: "토스터", english: "toaster", pronunciation: "[ˈtoʊstər]" },
    { korean: "도마", english: "cutting board", pronunciation: "[ˈkʌtɪŋ bɔːrd]" },
    { korean: "칼", english: "knife", pronunciation: "[naɪf]" },
    { korean: "포크", english: "fork", pronunciation: "[fɔrk]" },
    { korean: "숟가락", english: "spoon", pronunciation: "[spun]" },
    { korean: "접시", english: "plate", pronunciation: "[pleɪt]" },
    { korean: "그릇", english: "bowl", pronunciation: "[boʊl]" },
    { korean: "컵", english: "cup", pronunciation: "[kʌp]" },
    { korean: "머그컵", english: "mug", pronunciation: "[mʌɡ]" },
    { korean: "유리컵", english: "glass", pronunciation: "[ɡlæs]" },
    { korean: "계량컵", english: "measuring cup", pronunciation: "[ˈmɛʒərɪŋ kʌp]" },
    { korean: "계량스푼", english: "measuring spoon", pronunciation: "[ˈmɛʒərɪŋ spun]" },
    { korean: "소쿠리", english: "colander", pronunciation: "[ˈkɒləndər]" },
    { korean: "거품기", english: "whisk", pronunciation: "[wɪsk]" },
    { korean: "강판", english: "grater", pronunciation: "[ˈɡreɪtər]" },
    { korean: "교사", english: "teacher", pronunciation: "[ˈtiːtʃər]" },
    { korean: "의사", english: "doctor", pronunciation: "[ˈdɑːktər]" },
    { korean: "간호사", english: "nurse", pronunciation: "[nɜrs]" },
    { korean: "엔지니어", english: "engineer", pronunciation: "[ˌɛnʤɪˈnɪr]" },
    { korean: "경찰관", english: "police officer", pronunciation: "[pəˈlis ˈɔfɪsər]" },
    { korean: "소방관", english: "firefighter", pronunciation: "[ˈfaɪərˌfaɪtər]" },
    { korean: "요리사", english: "chef", pronunciation: "[ʃɛf]" },
    { korean: "예술가", english: "artist", pronunciation: "[ˈɑːrtɪst]" },
    { korean: "음악가", english: "musician", pronunciation: "[mjuˈzɪʃən]" },
    { korean: "배우", english: "actor", pronunciation: "[ˈæktər]" },
    { korean: "작가", english: "writer", pronunciation: "[ˈraɪtər]" },
    { korean: "과학자", english: "scientist", pronunciation: "[ˈsaɪəntɪst]" },
    { korean: "조종사", english: "pilot", pronunciation: "[ˈpaɪlət]" },
    { korean: "정비사", english: "mechanic", pronunciation: "[məˈkænɪk]" },
    { korean: "변호사", english: "lawyer", pronunciation: "[ˈlɔːjər]" },
    { korean: "회계사", english: "accountant", pronunciation: "[əˈkaʊntənt]" },
    { korean: "건축가", english: "architect", pronunciation: "[ˈɑːrkɪˌtɛkt]" },
    { korean: "치과의사", english: "dentist", pronunciation: "[ˈdɛntɪst]" },
    { korean: "약사", english: "pharmacist", pronunciation: "[ˈfɑrməsɪst]" },
    { korean: "수의사", english: "veterinarian", pronunciation: "[ˌvɛtərəˈnɛriən]" },
    { korean: "기자", english: "journalist", pronunciation: "[ˈʤɜrnəlɪst]" },
    { korean: "사진사", english: "photographer", pronunciation: "[fəˈtɑːɡrəfər]" },
    { korean: "개미", english: "ant", pronunciation: "[ænt]" },
    { korean: "벌", english: "bee", pronunciation: "[bi]" },
    { korean: "나비", english: "butterfly", pronunciation: "[ˈbʌtərˌflaɪ]" },
    { korean: "바퀴벌레", english: "cockroach", pronunciation: "[ˈkɒkˌroʊʧ]" },
    { korean: "귀뚜라미", english: "cricket", pronunciation: "[ˈkrɪkɪt]" },
    { korean: "잠자리", english: "dragonfly", pronunciation: "[ˈdræɡənˌflaɪ]" },
    { korean: "파리", english: "fly", pronunciation: "[flaɪ]" },
    { korean: "메뚜기", english: "grasshopper", pronunciation: "[ˈɡræsˌhɒpər]" },
    { korean: "무당벌레", english: "ladybug", pronunciation: "[ˈleɪdiˌbʌɡ]" },
    { korean: "모기", english: "mosquito", pronunciation: "[məˈskiːtoʊ]" },
    { korean: "거미", english: "spider", pronunciation: "[ˈspaɪdər]" },
    { korean: "흰개미", english: "termite", pronunciation: "[ˈtɜrˌmaɪt]" },
    { korean: "말벌", english: "wasp", pronunciation: "[wɑsp]" },
    { korean: "딱정벌레", english: "beetle", pronunciation: "[ˈbiːtl]" },
    { korean: "애벌레", english: "caterpillar", pronunciation: "[ˈkætərˌpɪlər]" },
    { korean: "나방", english: "moth", pronunciation: "[mɔθ]" },
    { korean: "벼룩", english: "flea", pronunciation: "[fli]" },
    { korean: "뱀파이어", english: "vampire", pronunciation: "[ˈvæmˌpaɪər]" },
    { korean: "늑대인간", english: "werewolf", pronunciation: "[ˈwɛrˌwʊlf]" },
    { korean: "좀비", english: "zombie", pronunciation: "[ˈzɑmbi]" },
    { korean: "마녀", english: "witch", pronunciation: "[wɪʧ]" },
    { korean: "유령", english: "ghost", pronunciation: "[ɡoʊst]" },
    { korean: "미라", english: "mummy", pronunciation: "[ˈmʌmi]" },
    { korean: "소금", english: "salt", pronunciation: "[sɔːlt]" },
    { korean: "설탕", english: "sugar", pronunciation: "[ˈʃʊɡər]" },
    { korean: "우유", english: "milk", pronunciation: "[mɪlk]" },
    { korean: "버터", english: "butter", pronunciation: "[ˈbʌtər]" },
    { korean: "요구르트", english: "yogurt", pronunciation: "[ˈjoʊɡərt]" },
    { korean: "치즈", english: "cheese", pronunciation: "[ʧiːz]" },
    { korean: "계란", english: "egg", pronunciation: "[ɛɡ]" },
    { korean: "빵", english: "bread", pronunciation: "[brɛd]" },
    { korean: "쌀", english: "rice", pronunciation: "[raɪs]" },
    { korean: "면", english: "noodle", pronunciation: "[ˈnuːdl]" },
    { korean: "파스타", english: "pasta", pronunciation: "[ˈpæstə]" },
    { korean: "피자", english: "pizza", pronunciation: "[ˈpiːtsə]" },
    { korean: "햄버거", english: "hamburger", pronunciation: "[ˈhæmbɜːrɡər]" },
    { korean: "감자", english: "potato", pronunciation: "[pəˈteɪtoʊ]" },
    { korean: "당근", english: "carrot", pronunciation: "[ˈkærət]" },
    { korean: "오이", english: "cucumber", pronunciation: "[ˈkjuːˌkʌmbər]" },
    { korean: "상추", english: "lettuce", pronunciation: "[ˈlɛtɪs]" },
    { korean: "토마토", english: "tomato", pronunciation: "[təˈmeɪtoʊ]" },
    { korean: "양상추", english: "spinach", pronunciation: "[ˈspɪnɪtʃ]" },
    { korean: "고추", english: "chili", pronunciation: "[ˈtʃɪli]" },
    { korean: "파", english: "green onion", pronunciation: "[ɡriːn ˈʌnjən]" },
    { korean: "마늘", english: "garlic", pronunciation: "[ˈɡɑrlɪk]" },
    { korean: "생강", english: "ginger", pronunciation: "[ˈdʒɪndʒər]" },
    { korean: "양파", english: "onion", pronunciation: "[ˈʌnjən]" },
    { korean: "버섯", english: "mushroom", pronunciation: "[ˈmʌʃrʊm]" },
    { korean: "감자튀김", english: "French fries", pronunciation: "[frɛntʃ fraɪz]" },
    { korean: "어니언링", english: "onion rings", pronunciation: "[ˈʌnjən rɪŋz]" },
    { korean: "치킨", english: "chicken", pronunciation: "[ˈʧɪkɪn]" },
    { korean: "소고기", english: "beef", pronunciation: "[biːf]" },
    { korean: "돼지고기", english: "pork", pronunciation: "[pɔːrk]" },
    { korean: "생선", english: "fish", pronunciation: "[fɪʃ]" },
    { korean: "새우", english: "shrimp", pronunciation: "[ʃrɪmp]" },
    { korean: "전복", english: "abalone", pronunciation: "[ˈæbəˌloʊn]" },
    { korean: "오징어", english: "squid", pronunciation: "[skwɪd]" },
    { korean: "문어", english: "octopus", pronunciation: "[ˈɑːktəpəs]" },
    { korean: "새우튀김", english: "tempura shrimp", pronunciation: "[ˈtɛmpjʊr ʃrɪmp]" },
    { korean: "삼겹살", english: "pork belly", pronunciation: "[pɔːrk ˈbɛli]" },
    { korean: "불고기", english: "bulgogi", pronunciation: "[bʊlˈɡoʊɡi]" },
    { korean: "갈비", english: "galbi", pronunciation: "[ˈɡɑːlbi]" },
    { korean: "막걸리", english: "makgeolli", pronunciation: "[ˈmækˌɡʌli]" },
    { korean: "소주", english: "soju", pronunciation: "[ˈsoʊdʒuː]" },
    { korean: "맥주", english: "beer", pronunciation: "[bɪr]" },
    { korean: "와인", english: "wine", pronunciation: "[waɪn]" },
    { korean: "소다", english: "soda", pronunciation: "[ˈsoʊdə]" },
    { korean: "커피", english: "coffee", pronunciation: "[ˈkɒfi]" },
    { korean: "차", english: "tea", pronunciation: "[tiː]" },
    { korean: "쥬스", english: "juice", pronunciation: "[dʒuːs]" },
    { korean: "물", english: "water", pronunciation: "[ˈwɔːtər]" },
    { korean: "우유", english: "milk", pronunciation: "[mɪlk]" },
    { korean: "오렌지주스", english: "orange juice", pronunciation: "[ˈɔrɪndʒ dʒuːs]" },
    { korean: "사과주스", english: "apple juice", pronunciation: "[ˈæpl dʒuːs]" },
    { korean: "포도주스", english: "grape juice", pronunciation: "[ˈɡreɪp dʒuːs]" },
    { korean: "딸기주스", english: "strawberry juice", pronunciation: "[ˈstrɔːbɛri dʒuːs]" },
    { korean: "바나나주스", english: "banana juice", pronunciation: "[bəˈnænə dʒuːs]" },
    { korean: "사과", english: "apple", pronunciation: "[ˈæpl]" },
    { korean: "바나나", english: "banana", pronunciation: "[bəˈnænə]" },
    { korean: "포도", english: "grape", pronunciation: "[ɡreɪp]" },
    { korean: "딸기", english: "strawberry", pronunciation: "[ˈstrɔːbɛri]" },
    { korean: "토마토", english: "tomato", pronunciation: "[təˈmeɪtoʊ]" },
    { korean: "키위", english: "kiwi", pronunciation: "[ˈkiwi]" },
    { korean: "망고", english: "mango", pronunciation: "[ˈmæŋɡoʊ]" },
    { korean: "파인애플", english: "pineapple", pronunciation: "[ˈpaɪnˌæpl]" },
    { korean: "수박", english: "watermelon", pronunciation: "[ˈwɔːtərˌmɛlən]" },
    { korean: "참외", english: "oriental melon", pronunciation: "[ˌɔːriˈɛntl ˈmɛlən]" },
    { korean: "메론", english: "melon", pronunciation: "[ˈmɛlən]" },
    { korean: "배", english: "pear", pronunciation: "[pɛr]" },
    { korean: "복숭아", english: "peach", pronunciation: "[piːtʃ]" },
    { korean: "체리", english: "cherry", pronunciation: "[ˈʧɛri]" },
    { korean: "블루베리", english: "blueberry", pronunciation: "[ˈbluˌbɛri]" },
    { korean: "라즈베리", english: "raspberry", pronunciation: "[ˈræzˌbɛri]" },
    { korean: "딸기잼", english: "strawberry jam", pronunciation: "[ˈstrɔːbɛri ʤæm]" },
    { korean: "오렌지잼", english: "orange jam", pronunciation: "[ˈɔrɪndʒ ʤæm]" },
    { korean: "사과잼", english: "apple jam", pronunciation: "[ˈæpl ʤæm]" },
    { korean: "포도잼", english: "grape jam", pronunciation: "[ɡreɪp ʤæm]" },
    { korean: "블루베리잼", english: "blueberry jam", pronunciation: "[ˈbluˌbɛri ʤæm]" },
    { korean: "라즈베리잼", english: "raspberry jam", pronunciation: "[ˈræzˌbɛri ʤæm]" },
    { korean: "밥", english: "rice", pronunciation: "[raɪs]" },
    { korean: "김", english: "seaweed", pronunciation: "[ˈsiˌwid]" },
    { korean: "간장", english: "soy sauce", pronunciation: "[sɔɪ sɔːs]" },
    { korean: "된장", english: "soybean paste", pronunciation: "[ˈsoʊbɪn peɪst]" },
    { korean: "고추장", english: "red pepper paste", pronunciation: "[rɛd ˈpɛpər peɪst]" },
    { korean: "참기름", english: "sesame oil", pronunciation: "[ˈsɛsəmi ɔɪl]" },
    { korean: "식초", english: "vinegar", pronunciation: "[ˈvɪnɪɡər]" },
    { korean: "설탕", english: "sugar", pronunciation: "[ˈʃʊɡər]" },
    { korean: "소금", english: "salt", pronunciation: "[sɔːlt]" },
    { korean: "마요네즈", english: "mayonnaise", pronunciation: "[ˈmeɪəˌneɪz]" },
    { korean: "케첩", english: "ketchup", pronunciation: "[ˈkɛʧəp]" },
    { korean: "머스터드", english: "mustard", pronunciation: "[ˈmʌstərd]" },
    { korean: "올리브오일", english: "olive oil", pronunciation: "[ˈɑːlɪv ɔɪl]" },
    { korean: "피클", english: "pickle", pronunciation: "[ˈpɪkəl]" },
    { korean: "토마토페이스트", english: "tomato paste", pronunciation: "[təˈmeɪtoʊ peɪst]" },
    { korean: "물엿", english: "corn syrup", pronunciation: "[kɔːrn sɪrəp]" },
    { korean: "백설탕", english: "white sugar", pronunciation: "[waɪt ˈʃʊɡər]" },
    { korean: "갈색설탕", english: "brown sugar", pronunciation: "[braʊn ˈʃʊɡər]" },
    { korean: "몰래스", english: "molasses", pronunciation: "[məˈlæsɪz]" },
    { korean: "허니", english: "honey", pronunciation: "[ˈhʌni]" },
    { korean: "향신료", english: "spice", pronunciation: "[spaɪs]" },
    { korean: "후추", english: "black pepper", pronunciation: "[blæk ˈpɛpər]" },
    { korean: "소금", english: "salt", pronunciation: "[sɔːlt]" },
    { korean: "설탕", english: "sugar", pronunciation: "[ˈʃʊɡər]" },
    { korean: "시나몬", english: "cinnamon", pronunciation: "[ˈsɪnəmən]" },
    { korean: "생강", english: "ginger", pronunciation: "[ˈdʒɪndʒər]" },
    { korean: "허브", english: "herb", pronunciation: "[ɜːrb]" },
    { korean: "바질", english: "basil", pronunciation: "[ˈbeɪzəl]" },
    { korean: "로즈마리", english: "rosemary", pronunciation: "[ˈroʊzmɛri]" },
    { korean: "파슬리", english: "parsley", pronunciation: "[ˈpɑːrsli]" },
    { korean: "민트", english: "mint", pronunciation: "[mɪnt]" },
    { korean: "올리브", english: "olive", pronunciation: "[ˈɑːlɪv]" },
    { korean: "콩", english: "bean", pronunciation: "[biːn]" },
    { korean: "깨", english: "sesame", pronunciation: "[ˈsɛsmi]" },
    { korean: "땅콩", english: "peanut", pronunciation: "[ˈpiːnʌt]" },
    { korean: "호두", english: "walnut", pronunciation: "[ˈwɔːlnʌt]" },
    { korean: "아몬드", english: "almond", pronunciation: "[ˈɑːmənd]" },
    { korean: "피스타치오", english: "pistachio", pronunciation: "[pɪˈstɑːʃioʊ]" },
    { korean: "캐슈넛", english: "cashew nut", pronunciation: "[ˈkæʃu nʌt]" },
    { korean: "잣", english: "pine nut", pronunciation: "[paɪn nʌt]" },
    { korean: "밤", english: "chestnut", pronunciation: "[ˈtʃɛsnʌt]" },
    { korean: "마카다미아넛", english: "macadamia nut", pronunciation: "[ˌmækəˈdeɪmiə nʌt]" },
    { korean: "피칸", english: "pecan", pronunciation: "[ˈpiːkæn]" },
    { korean: "버터", english: "butter", pronunciation: "[ˈbʌtər]" },
    { korean: "쉬폰", english: "chiffon", pronunciation: "[ˈʃɪfɑːn]" },
    { korean: "스폰지", english: "sponge", pronunciation: "[spʌndʒ]" },
    { korean: "생크림", english: "whipped cream", pronunciation: "[wɪpt krim]" },
    { korean: "젤리", english: "jelly", pronunciation: "[ˈʤɛli]" },
    { korean: "아이스크림", english: "ice cream", pronunciation: "[ˈaɪs ˌkrim]" },
    { korean: "아이스", english: "ice", pronunciation: "[aɪs]" },
    { korean: "펀치", english: "punch", pronunciation: "[pʌntʃ]" },
    { korean: "스무디", english: "smoothie", pronunciation: "[ˈsmuːði]" },
    { korean: "프로즌요거트", english: "frozen yogurt", pronunciation: "[ˈfroʊzən ˈjoʊɡərt]" },
    { korean: "푸딩", english: "pudding", pronunciation: "[ˈpʊdɪŋ]" },
    { korean: "젤라틴", english: "gelatin", pronunciation: "[ˈʤɛlətɪn]" },
    { korean: "화이트초콜릿", english: "white chocolate", pronunciation: "[waɪt ˈtʃɔːklət]" },
    { korean: "다크초콜릿", english: "dark chocolate", pronunciation: "[dɑːrk ˈtʃɔːklət]" },
    { korean: "밀가루", english: "flour", pronunciation: "[ˈflaʊər]" },
    { korean: "박력분", english: "strong flour", pronunciation: "[strɔːŋ flaʊər]" },
    { korean: "중력분", english: "medium flour", pronunciation: "[ˈmidiəm flaʊər]" },
    { korean: "소프트분", english: "soft flour", pronunciation: "[sɔːft flaʊər]" },
    { korean: "코코아가루", english: "cocoa powder", pronunciation: "[ˈkoʊkoʊə ˈpaʊdər]" },
    { korean: "베이킹파우더", english: "baking powder", pronunciation: "[ˈbeɪkɪŋ ˈpaʊdər]" },
    { korean: "베이킹소다", english: "baking soda", pronunciation: "[ˈbeɪkɪŋ ˈsoʊdə]" },
    { korean: "잼", english: "jam", pronunciation: "[ʤæm]" },
    { korean: "크림", english: "cream", pronunciation: "[krim]" },
    { korean: "글루텐", english: "gluten", pronunciation: "[ˈɡluːtən]" },
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
            koreanUtterance.lang = 'ko-KR';
            koreanUtterance.rate = 1;

            let englishUtterance = new SpeechSynthesisUtterance(words[currentWordIndex].english);
            englishUtterance.lang = 'en-US';
            englishUtterance.rate = 1;

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
        playNextWord();
    }, 8000); // 8초 간격으로 다음 단어 재생
}

updateWord();

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

