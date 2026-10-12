# 🚀 뉴스 어휘 글 추가 빠른 시작

## 단계별 가이드

### 1단계: MongoDB 확인
```bash
# MongoDB가 실행 중인지 확인
ps aux | grep mongod
```

### 2단계: backend 폴더로 이동
```bash
cd backend
```

### 3단계: .env 파일 확인/생성
```bash
# .env 파일이 없으면 생성
echo "MONGO_URI=mongodb://localhost:27017/englisheasystudy" > .env
```

### 4단계: 글 추가 스크립트 실행
```bash
# 대화형 메뉴 사용 (가장 쉬운 방법)
./publish-news-voca.sh

# 또는 직접 실행
node add-news-voca-article.js "$(cat article-example-lindsay-clancy.json)"
```

## 📝 새 글 작성하기

### 템플릿 수정 방법

1. `article-template.json` 파일 열기
2. 다음 필드 수정:
   - `title`: 글 제목
   - `slug`: URL 주소 (예: `my-article-bbc`)
   - `password`: 글 수정/삭제용 비밀번호
   - `metaDescription`: 요약 설명 (160자 이내)
   - `message`: HTML 형식의 본문

3. 저장 후 실행:
```bash
./publish-news-voca.sh
# 메뉴에서 2번 선택
```

## 💡 실전 예제

### 예제 1: 테스트 글 추가
```bash
cd backend
./publish-news-voca.sh
# 1번 선택 - 예제 글 추가
```

### 예제 2: Lindsay Clancy 기사 추가
```bash
cd backend
./publish-news-voca.sh
# 4번 선택 - Lindsay Clancy 예제
```

### 예제 3: 나만의 글 추가
1. `article-template.json` 복사
```bash
cp article-template.json my-article.json
```

2. `my-article.json` 수정 (에디터 사용)

3. 글 추가
```bash
./publish-news-voca.sh
# 3번 선택
# 경로 입력: my-article.json
```

## ✅ 결과 확인

글이 추가되면 다음과 같이 확인:

1. **콘솔 출력 확인**
```
✅ Article created successfully!
   View at: https://englisheasystudy.com/news-voca.html?slug=your-slug
   SEO URL: https://englisheasystudy.com/news-voca/your-slug/
```

2. **폴더 확인**
```bash
ls -la ../news-voca/your-slug/
# index.html이 생성되었는지 확인
```

3. **MongoDB 확인**
```bash
mongo
use englisheasystudy
db.guestbookentries.findOne({slug: "your-slug"})
```

## 🔧 문제 해결

### MongoDB 연결 오류
```bash
# MongoDB 실행
sudo systemctl start mongod
# 또는
brew services start mongodb-community
```

### 패키지 없음 오류
```bash
npm install
```

### 권한 오류
```bash
chmod +x publish-news-voca.sh
```

## 📚 더 알아보기

- 상세 가이드: `README_KO.md`
- 영문 가이드: `NEWS_VOCA_GUIDE.md`
- 템플릿: `article-template.json`
- 예제: `article-example-lindsay-clancy.json`

---

**Happy Publishing! 📝✨**
