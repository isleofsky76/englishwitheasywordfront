// 글 데이터
const articles = [
    {
        "date": "August 17th, 2024",
        "title": "헬스장 운동 루틴 (My Gym Workout Routine)",
        "content": "오늘은 정기적인 운동 세션을 위해 헬스장에 갔다.<br>I went to the gym for my regular workout session.<br><br>러닝머신에서 10분 정도 워밍업을 시작했다.<br>I started with a warm-up on the treadmill for about 10 minutes.<br><br>그 다음 웨이트 트레이닝 구역으로 이동해서 덤벨로 벤치프레스를 했다.<br>Then I moved to the weight training area where I did some bench presses with dumbbells.<br><br>헬스장이 꽤 혼잡해서 장비를 기다려야 했다.<br>The gym was quite crowded today, so I had to wait a bit for the equipment.<br><br>스쿼트와 데드리프트도 해서 하체 근력을 키웠다.<br>I also did some squats and deadlifts to work on my lower body strength.<br><br>개인 트레이너가 올바른 자세에 대한 좋은 조언을 해줬다.<br>My personal trainer gave me some great advice on proper form.<br><br>웨이트 운동 후에는 엘립티컬 머신에서 20분간 유산소 운동을 했다.<br>After the weights, I did some cardio on the elliptical machine for 20 minutes.<br><br>오늘은 정말 동기부여가 되어서 평소보다 더 열심히 했다.<br>I was feeling really motivated today, so I pushed myself harder than usual.<br><br>운동이 꽤 격렬했지만 지금은 정말 기분이 좋다!<br>The workout was quite intense, but I feel amazing now!"
    },
    {
        "date": "August 18th, 2024",
        "title": "수영장에서 수영하기 (Swimming at the Pool)",
        "content": "오늘은 지역 수영장에 수영하러 갔다.<br>Today I went swimming at the local pool.<br><br>물이 정말 시원하고 수영장이 꽤 넓었다.<br>The water was really refreshing and the pool was quite spacious.<br><br>자유형으로 준비 운동 랩을 시작했다.<br>I started with some warm-up laps using the freestyle stroke.<br><br>구조원이 매우 주의 깊게 지켜보고 모두가 안전한지 확인했다.<br>The lifeguard was very attentive and made sure everyone was safe.<br><br>평영과 배영도 연습해서 기술을 향상시켰다.<br>I also practiced the breaststroke and backstroke to improve my technique.<br><br>수영장에는 다양한 기술 수준에 맞는 레인이 있어서 매우 편리하다.<br>The pool has different lanes for different skill levels, which is very convenient.<br><br>한 시간 정도 수영했고 나중에 정말 활력이 넘쳤다.<br>I swam for about an hour and felt really energized afterwards.<br><br>탈의실은 깨끗하고 잘 관리되고 있었다.<br>The changing rooms were clean and well-maintained.<br><br>수영이 정말 훌륭한 전신 운동이라고 생각한다!<br>I think swimming is such a great full-body workout!"
    },
    {
        "date": "August 19th, 2024",
        "title": "공원에서의 하루 (A Day at the Park)",
        "content": "어제는 도시 공원에서 멋진 오후를 보냈다.<br>Yesterday I spent a wonderful afternoon at the city park.<br><br>날씨가 완벽했고 맑은 하늘과 부드러운 바람이 있었다.<br>The weather was perfect with clear blue skies and a gentle breeze.<br><br>샌드위치와 과일이 든 피크닉 바구니를 가져왔다.<br>I brought a picnic basket with sandwiches and fruit.<br><br>아이들이 그네와 미끄럼틀에서 놀고 있는 많은 가족들이 있었다.<br>There were many families with children playing on the swings and slides.<br><br>큰 참나무 아래에 앉아서 좋아하는 책을 읽었다.<br>I sat under a big oak tree and read my favorite book.<br><br>개를 산책시키는 사람들도 있었고, 다른 사람들은 잔디에서 프리스비를 하고 있었다.<br>Some people were walking their dogs, and others were playing frisbee on the grass.<br><br>호수 근처에서 바베큐를 하는 친구들도 보았다.<br>I also saw a group of friends having a barbecue near the lake.<br><br>공원은 생명과 행복으로 가득했다.<br>The park was full of life and happiness.<br><br>정말 평화롭고 편안했다.<br>I felt so peaceful and relaxed.<br><br>일요일 오후를 보내는 완벽한 방법이었다!<br>It was the perfect way to spend a Sunday afternoon!"
    },
    {
        "date": "August 20th, 2024",
        "title": "저녁 요리하기 (Cooking Dinner)",
        "content": "오늘 밤에는 가족을 위해 저녁을 요리하기로 했다.<br>Tonight I decided to cook dinner for my family.<br><br>모두가 좋아하는 토마토 소스 스파게티를 만들기로 선택했다.<br>I chose to make spaghetti with tomato sauce because it's everyone's favorite.<br><br>먼저 큰 냄비에 물을 끓이고 소금을 넣었다.<br>First, I boiled water in a large pot and added salt.<br><br>그 다음 끓는 물에 스파게티 면을 넣었다.<br>Then I put the spaghetti noodles in the boiling water.<br><br>파스타가 익는 동안 신선한 토마토, 마늘, 허브로 소스를 준비했다.<br>While the pasta was cooking, I prepared the sauce with fresh tomatoes, garlic, and herbs.<br><br>양상추, 오이, 당근으로 간단한 그린 샐러드도 만들었다.<br>I also made a simple green salad with lettuce, cucumber, and carrots.<br><br>요리 냄새로 부엌이 놀라웠다.<br>The kitchen smelled amazing with all the cooking aromas.<br><br>가족들이 내가 만드는 것을 보자 정말 흥분했다.<br>My family was very excited when they saw what I was making.<br><br>우리 모두 식탁에 함께 앉아서 식사를 즐겼다.<br>We all sat together at the dining table and enjoyed the meal.<br><br>다른 사람을 위해 요리하는 것은 정말 보람 있는 경험이다!<br>Cooking for others is such a rewarding experience!"
    },
    {
        "date": "August 21st, 2024",
        "title": "쇼핑몰에서 쇼핑하기 (Shopping at the Mall)",
        "content": "오늘은 가장 친한 친구와 함께 지역 쇼핑몰에 쇼핑하러 갔다.<br>Today I went shopping at the local mall with my best friend.<br><br>다양한 매장에서 옷을 보는 것부터 시작했다.<br>We started by looking at clothes in different stores.<br><br>세일 중인 예쁜 파란색 셔츠를 찾아서 샀다.<br>I found a nice blue shirt that was on sale, so I bought it.<br><br>친구는 여러 드레스를 입어봤지만 어떤 것을 살지 결정하지 못했다.<br>My friend tried on several dresses but couldn't decide which one to get.<br><br>서점도 방문해서 읽을 새 소설을 샀다.<br>We also visited the bookstore where I bought a new novel to read.<br><br>점심에는 푸드코트에서 먹었다.<br>For lunch, we ate at the food court.<br><br>나는 맛있는 버거와 감자튀김을 먹었고, 친구는 피자를 주문했다.<br>I had a delicious burger and fries, and my friend ordered pizza.<br><br>점심 후에는 쇼핑몰을 돌아다니며 쇼윈도우를 구경했다.<br>After lunch, we walked around the mall and looked at the window displays.<br><br>집에 가기 전에 커피숍에 들러서 핫초코를 마셨다.<br>We stopped at the coffee shop for some hot chocolate before heading home.<br><br>좋은 친구와 함께한 재미있는 하루였다!<br>It was a fun day spent with good company!"
    }
];

let currentArticleIndex = 0;

// DOM 요소들
const articleContainer = document.getElementById('article-container');
const wordPopup = document.getElementById('wordPopup');
const popupWord = document.querySelector('.popup-word');
const popupMeaning = document.querySelector('.popup-meaning');
const popupClose = document.querySelector('.popup-close');

// 모든 글 표시
function displayAllArticles() {
    let allArticlesHTML = '';
    
    articles.forEach((article, index) => {
        allArticlesHTML += `
            <div class="article">
                <div class="article-date">${article.date}</div>
                <h2 class="article-title">${article.title}</h2>
                <div class="article-content">${article.content}</div>
            </div>
        `;
    });
    
    articleContainer.innerHTML = allArticlesHTML;
}



// 초기화
function init() {
    displayAllArticles();
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    // 단어장 초기화
    init();
    
    // 팝업 관련 이벤트
    popupClose.addEventListener('click', closePopup);
    
    // 팝업 외부 클릭 시 닫기
    wordPopup.addEventListener('click', function(e) {
        if (e.target === wordPopup) {
            closePopup();
        }
    });
});

// 단어 뜻 가져오기 (실제로는 사전 API 사용)
async function getWordMeaning(word) {
    // 예시 단어 뜻들
    const meanings = {
        'amazing': '놀라운, 훌륭한',
        'beautiful': '아름다운',
        'wonderful': '훌륭한, 멋진',
        'fantastic': '환상적인, 훌륭한',
        'excellent': '훌륭한, 우수한',
        'perfect': '완벽한',
        'great': '훌륭한, 좋은',
        'good': '좋은',
        'nice': '좋은, 멋진',
        'happy': '행복한',
        'sad': '슬픈',
        'angry': '화난',
        'excited': '흥분한',
        'tired': '피곤한',
        'hungry': '배고픈',
        'thirsty': '목마른',
        'library': '도서관',
        'book': '책',
        'read': '읽다',
        'write': '쓰다',
        'study': '공부하다',
        'learn': '배우다',
        'teach': '가르치다',
        'school': '학교',
        'university': '대학교',
        'student': '학생',
        'teacher': '선생님',
        'friend': '친구',
        'family': '가족',
        'home': '집',
        'house': '집',
        'car': '자동차',
        'bus': '버스',
        'train': '기차',
        'plane': '비행기',
        'food': '음식',
        'water': '물',
        'coffee': '커피',
        'tea': '차',
        'breakfast': '아침식사',
        'lunch': '점심식사',
        'dinner': '저녁식사',
        'work': '일하다',
        'job': '직업',
        'money': '돈',
        'time': '시간',
        'day': '하루',
        'night': '밤',
        'morning': '아침',
        'afternoon': '오후',
        'evening': '저녁',
        'week': '주',
        'month': '월',
        'year': '년',
        'today': '오늘',
        'yesterday': '어제',
        'tomorrow': '내일',
        'weather': '날씨',
        'sunny': '맑은',
        'rainy': '비오는',
        'cloudy': '흐린',
        'cold': '추운',
        'hot': '더운',
        'warm': '따뜻한',
        'cool': '시원한'
    };
    
    return meanings[word] || '의미를 찾을 수 없습니다';
}

// 단어 뜻 팝업 표시
function showWordMeaning(event) {
    const word = event.target.dataset.word || event.target.textContent;
    const meaning = event.target.dataset.meaning || getWordMeaning(word);
    
    popupWord.textContent = word;
    popupMeaning.textContent = meaning;
    wordPopup.style.display = 'flex';
}

// 팝업 닫기
function closePopup() {
    wordPopup.style.display = 'none';
}

// 키보드 단축키
document.addEventListener('keydown', function(e) {
    // Escape로 팝업 닫기
    if (e.key === 'Escape') {
        closePopup();
    }
    

});

