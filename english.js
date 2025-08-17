// 글 데이터
const articles = [
    {
        "date": "August 17th, 2025",
        "title": "My Gym Workout Routine",
        "image": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
        "content": "Today I went to the gym for my regular workout session. I started with a warm-up on the treadmill (러닝머신) for about 10 minutes to get my heart rate up. Then I moved to the weight training area where I did some bench presses (벤치프레스) with dumbbells. The gym was quite crowded (혼잡한) today, so I had to wait a bit for the equipment. I also did some squats (스쿼트) and deadlifts (데드리프트) to work on my lower body strength. My personal trainer (개인 트레이너) gave me some great advice on proper form. After the weights, I did some cardio (유산소 운동) on the elliptical machine (엘립티컬) for 20 minutes. I was feeling really motivated (동기부여된) today, so I pushed myself harder than usual. The workout was quite intense (격렬한), but I feel amazing now!"
    },
    {
        "date": "August 18th, 2025",
        "title": "Group Fitness Class Experience",
        "image": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=400&fit=crop",
        "content": "I decided to try a new group fitness class today called 'Body Pump'. The instructor (강사) was very energetic (활기찬) and encouraging. The class involved using barbells (바벨) and doing various exercises like lunges (런지), shoulder presses (숄더 프레스), and bicep curls (바이셉 컬). The music was really motivating (동기부여하는) and helped keep the energy high throughout the session. I was sweating (땀을 흘리는) a lot, but it felt great! The class was quite challenging (도전적인), but everyone was supportive (지지하는) of each other. I think I'll definitely come back next week. The gym has a great atmosphere (분위기) and the equipment is well-maintained (잘 관리된)."
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
                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" />
                </div>
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
