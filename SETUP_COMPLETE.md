# 뉴스 어휘 게시 도구 완성! ✅

## 📦 생성된 도구

Lindsay Clancy 기사와 같은 뉴스 어휘 글을 쉽게 게시할 수 있는 자동화 도구를 만들었습니다!

### 🎯 핵심 기능

1. **자동 글 게시**: MongoDB 저장 + SEO 폴더 자동 생성
2. **템플릿 제공**: 쉽게 수정해서 사용 가능
3. **대화형 스크립트**: 메뉴에서 선택만 하면 됩니다
4. **예제 포함**: Lindsay Clancy 기사 예제 포함

## 🚀 사용 방법 (3단계)

### 1단계: backend 폴더로 이동
```bash
cd backend
```

### 2단계: 대화형 스크립트 실행
```bash
./publish-news-voca.sh
```

### 3단계: 메뉴에서 선택
```
1) 예제 글 추가 (테스트용)
2) 템플릿으로 새 글 추가
3) 커스텀 JSON 파일로 글 추가
4) Lindsay Clancy 예제 글 추가
```

## 📝 새 글 작성하기

### 방법 1: 템플릿 사용 (권장)

1. `backend/article-template.json` 파일 열기
2. 내용 수정:
   ```json
   {
     "title": "새로운 뉴스 기사 제목",
     "slug": "my-article-slug-bbc",
     "nickname": "Admin",
     "password": "your-password",
     "metaDescription": "기사 요약 (160자 이내)",
     "message": "<article>...HTML 내용...</article>"
   }
   ```
3. 저장 후 스크립트 실행 → 메뉴에서 2번 선택

### 방법 2: 예제 복사해서 수정

```bash
cd backend
cp article-example-lindsay-clancy.json my-article.json
# my-article.json 파일 수정
./publish-news-voca.sh
# 메뉴에서 3번 선택하고 my-article.json 입력
```

## 📚 글 본문 작성 가이드

HTML 형식으로 작성하세요:

```html
<article>
  <header>
    <h1>기사 제목</h1>
    <p class="article-meta">Source: BBC News | Date: 2026-09-29</p>
  </header>

  <section class="vocabulary-section">
    <h2>📚 핵심 어휘</h2>
    
    <div class="vocab-item">
      <h3>1. 단어/표현</h3>
      <p class="pronunciation">[발음기호]</p>
      <p class="korean-meaning">한글 뜻</p>
      <p class="example"><strong>Example:</strong> 영문 예문</p>
      <p class="example-korean">한글 번역</p>
    </div>
    
    <!-- 더 많은 단어 추가 -->
  </section>

  <section class="article-content">
    <h2>📰 원문 발췌</h2>
    <blockquote>
      <p>원문 내용...</p>
    </blockquote>
  </section>

  <footer class="article-footer">
    <p><strong>출처:</strong> BBC News</p>
    <p><strong>학습 포인트:</strong> 주요 학습 내용</p>
  </footer>
</article>
```

## ✅ 테스트 완료

이미 Lindsay Clancy 기사 예제로 테스트를 완료했습니다:

```bash
# 실행 결과:
✅ Connected to MongoDB
✅ Article saved to database
   ID: 6abb7f7f6a3b6e5430fb7c7d
   Slug: lindsay-clancy-murder-trial-victim-or-criminal-bbc
✅ Created SEO directory and index.html at: /workspace/news-voca/lindsay-clancy-murder-trial-victim-or-criminal-bbc

✅ Article created successfully!
   View at: https://englisheasystudy.com/news-voca.html?slug=lindsay-clancy-murder-trial-victim-or-criminal-bbc
   SEO URL: https://englisheasystudy.com/news-voca/lindsay-clancy-murder-trial-victim-or-criminal-bbc/
```

생성된 파일 확인:
- ✅ MongoDB에 데이터 저장됨
- ✅ `/news-voca/lindsay-clancy-murder-trial-victim-or-criminal-bbc/index.html` 생성됨
- ✅ 완전한 SEO 메타데이터 포함

## 🎁 제공되는 파일

### 실행 스크립트
- `backend/add-news-voca-article.js` - 메인 스크립트
- `backend/publish-news-voca.sh` - 대화형 도구

### 템플릿 & 예제
- `backend/article-template.json` - 빈 템플릿
- `backend/article-example-lindsay-clancy.json` - 완성된 예제

### 문서
- `README_KO.md` - 한국어 완전 가이드
- `NEWS_VOCA_GUIDE.md` - 영문 가이드
- `backend/QUICK_START_KO.md` - 빠른 시작 가이드

### 설정
- `backend/.env` - MongoDB 설정 파일

## 🔧 환경 설정

### MongoDB URI 설정

처음 실행 시 자동으로 물어봅니다. 또는 수동으로 설정:

```bash
cd backend
echo "MONGO_URI=mongodb://localhost:27017/englisheasystudy" > .env
```

클라우드 MongoDB 사용 시:
```bash
echo "MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/englisheasystudy" > .env
```

## 📖 상세 가이드

### 빠른 시작
→ `backend/QUICK_START_KO.md` 참고

### 완전 가이드
→ `README_KO.md` 참고

### 트러블슈팅
→ `NEWS_VOCA_GUIDE.md` 참고

## 🎯 Slug 명명 규칙

Slug는 URL 주소로 사용됩니다:

✅ **좋은 예:**
- `lindsay-clancy-murder-trial-victim-or-criminal-bbc`
- `ai-companies-race-for-power-wsj`
- `europe-heatwaves-drownings-cnn`

❌ **나쁜 예:**
- `Lindsay Clancy Murder Trial` (대문자, 공백)
- `클랜시-재판-논란` (한글)
- `article_2026_09_29` (언더스코어)

**규칙:**
- 모두 소문자
- 단어 사이 하이픈(-)
- 영문과 숫자만
- 출처 포함 권장 (`-bbc`, `-cnn`, `-wsj`)

## 🔗 Pull Request

PR이 생성되었습니다!
- **PR #3**: https://github.com/isleofsky76/englishwitheasywordfront/pull/3
- **Branch**: `cursor/add-news-voca-publisher-tool-3ce6`

## 💡 다음 단계

1. **테스트해보기**
   ```bash
   cd backend
   ./publish-news-voca.sh
   # 메뉴에서 1번 선택 (예제 글 추가)
   ```

2. **자신의 글 작성하기**
   - `article-template.json` 수정
   - 스크립트 실행

3. **웹에서 확인하기**
   - 로컬: `http://localhost:5500/news-voca.html?slug=your-slug`
   - 프로덕션: `https://englisheasystudy.com/news-voca.html?slug=your-slug`

## 🎉 완료!

이제 Lindsay Clancy 기사처럼 뉴스 어휘 글을 쉽게 추가할 수 있습니다!

궁금한 점이 있으면 문서를 참고하시거나 질문해주세요.

---

**Happy Writing! 📝✨**
