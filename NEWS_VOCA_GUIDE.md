# 뉴스 어휘 글 추가하기 (News Voca Article Guide)

## 📋 준비사항

1. **MongoDB 설정**: 환경 변수 설정이 필요합니다
2. **Node.js 패키지**: backend 디렉토리의 패키지들이 설치되어야 합니다

## 🚀 빠른 시작

### 1단계: backend 디렉토리로 이동

```bash
cd backend
```

### 2단계: MongoDB URI 설정

`.env` 파일을 생성하거나 환경 변수를 설정하세요:

```bash
# .env 파일 생성
echo "MONGO_URI=mongodb://localhost:27017/englisheasystudy" > .env
```

또는 환경 변수로 설정:

```bash
export MONGO_URI="mongodb://localhost:27017/englisheasystudy"
# 또는 클라우드 MongoDB
export MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/englisheasystudy"
```

### 3단계: 패키지 설치 (최초 1회만)

```bash
npm install
```

### 4단계: 글 작성

`article-template.json` 파일을 수정하여 원하는 내용을 작성하세요.

### 5단계: 글 추가 실행

```bash
# 쉬운 방법: 대화형 스크립트 사용
./publish-news-voca.sh

# 또는 직접 실행
# 템플릿 파일 사용
node add-news-voca-article.js "$(cat article-template.json)"

# 또는 예제 데이터로 테스트
node add-news-voca-article.js
```

## 📝 글 작성 가이드

### 필수 필드

- **title**: 글 제목 (한글 또는 영문)
- **slug**: URL에 사용될 고유 식별자 (영문-소문자-하이픈, 예: `lindsay-clancy-murder-trial-victim-or-criminal-bbc`)
- **nickname**: 작성자 이름
- **password**: 글 수정/삭제용 비밀번호 (안전하게 보관하세요!)
- **metaDescription**: SEO용 요약 설명 (160자 이내 권장)
- **message**: 글 본문 (HTML 형식)

### 글 본문 (message) 작성 예시

```html
<article>
  <header>
    <h1>뉴스 제목</h1>
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
    <p><strong>학습 포인트:</strong> 주요 학습 포인트 설명</p>
  </footer>
</article>
```

## 🎯 Slug 명명 규칙

slug는 다음 규칙을 따라야 합니다:
- 모두 소문자
- 단어 사이는 하이픈(-)으로 연결
- 영문과 숫자만 사용
- 출처 포함 권장 (예: `-bbc`, `-cnn`, `-wsj`)

예시:
- `lindsay-clancy-murder-trial-victim-or-criminal-bbc`
- `ai-companies-race-for-power-amazon-google-have-lead-wsj`
- `capybara-on-the-lam-english-countryside-wsj`

## 🔍 결과 확인

글이 추가되면 다음 URL에서 확인할 수 있습니다:

- **동적 URL**: `https://englisheasystudy.com/news-voca.html?slug=당신의-slug`
- **SEO URL**: `https://englisheasystudy.com/news-voca/당신의-slug/`
- **목록**: `https://englisheasystudy.com/news-voca-list.html`

## 🔧 트러블슈팅

### MongoDB 연결 실패

```bash
# MongoDB가 실행 중인지 확인
mongod --version

# 로컬 MongoDB 시작 (Mac/Linux)
brew services start mongodb-community
# 또는
sudo systemctl start mongod
```

### 패키지 설치 오류

```bash
# node_modules 삭제 후 재설치
cd backend
rm -rf node_modules package-lock.json
npm install
```

### 권한 오류

```bash
# 실행 권한 추가
chmod +x add-news-voca-article.js
```

## 📚 참고 자료

기존 글 예시를 참고하세요:
- `/workspace/news-voca/lindsay-clancy-murder-trial-victim-or-criminal-bbc/`
- `/workspace/news-voca/capybara-on-the-lam-english-countryside-wsj/`

## 💡 팁

1. **HTML 이스케이프**: 특수문자는 자동으로 처리되지만, 직접 입력 시 주의하세요
2. **이미지 추가**: `<img>` 태그 사용 가능
3. **스타일링**: 기존 CSS 클래스를 활용하세요 (`vocab-item`, `pronunciation`, `korean-meaning` 등)
4. **백업**: 중요한 글은 별도로 백업해두세요

## ❓ 문제가 있나요?

스크립트 실행 중 오류가 발생하면:
1. MongoDB URI가 올바른지 확인
2. 필수 필드가 모두 입력되었는지 확인
3. slug가 중복되지 않았는지 확인
4. JSON 형식이 올바른지 확인
