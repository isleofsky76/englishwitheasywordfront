/// 글 데이터
const articles = [
    {
        "date": "August 17th, 2024",
        "title": "My Gym Workout Routine",
        "content": "Today I went to the gym for my regular workout session. I started with a warm-up on the treadmill for about 10 minutes to get my heart rate up. Then I moved to the weight training area where I did some bench presses with dumbbells. The gym was quite crowded today, so I had to wait a bit for the equipment. I also did some squats and deadlifts to work on my lower body strength. My personal trainer gave me some great advice on proper form. After the weights, I did some cardio on the elliptical machine for 20 minutes. I was feeling really motivated today, so I pushed myself harder than usual. The workout was quite intense, but I feel amazing now!"
    },
    {
        "date": "August 18th, 2024",
        "title": "Swimming at the Pool",
        "content": "Today I went swimming at the local pool. The water was really refreshing and the pool was quite spacious. I started with some warm-up laps using the freestyle stroke. The lifeguard was very attentive and made sure everyone was safe. I also practiced the breaststroke and backstroke to improve my technique. The pool has different lanes for different skill levels, which is very convenient. I swam for about an hour and felt really energized afterwards. The changing rooms were clean and well-maintained. I think swimming is such a great full-body workout!"
    },
    {
        "date": "August 19th, 2024",
        "title": "A Day at the Park",
        "content": "Yesterday I spent a wonderful afternoon at the city park. The weather was perfect with clear blue skies and a gentle breeze. I brought a picnic basket with sandwiches and fruit. There were many families with children playing on the swings and slides. I sat under a big oak tree and read my favorite book. Some people were walking their dogs, and others were playing frisbee on the grass. I also saw a group of friends having a barbecue near the lake. The park was full of life and happiness. I felt so peaceful and relaxed. It was the perfect way to spend a Sunday afternoon!"
    },
    {
        "date": "August 20th, 2024",
        "title": "Cooking Dinner",
        "content": "Tonight I decided to cook dinner for my family. I chose to make spaghetti with tomato sauce because it's everyone's favorite. First, I boiled water in a large pot and added salt. Then I put the spaghetti noodles in the boiling water. While the pasta was cooking, I prepared the sauce with fresh tomatoes, garlic, and herbs. I also made a simple green salad with lettuce, cucumber, and carrots. The kitchen smelled amazing with all the cooking aromas. My family was very excited when they saw what I was making. We all sat together at the dining table and enjoyed the meal. Cooking for others is such a rewarding experience!"
    },
    {
        "date": "August 21st, 2024",
        "title": "Shopping at the Mall",
        "content": "Today I went shopping at the local mall with my best friend. We started by looking at clothes in different stores. I found a nice blue shirt that was on sale, so I bought it. My friend tried on several dresses but couldn't decide which one to get. We also visited the bookstore where I bought a new novel to read. For lunch, we ate at the food court. I had a delicious burger and fries, and my friend ordered pizza. After lunch, we walked around the mall and looked at the window displays. We stopped at the coffee shop for some hot chocolate before heading home. It was a fun day spent with good company!"
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

