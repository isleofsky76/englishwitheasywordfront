# 뉴스 어휘 글 게시 가이드

English Easy Study 웹사이트에 뉴스 어휘 글을 게시하는 방법을 안내합니다.

## 🎯 개요

이 프로젝트는 영어 학습 웹사이트의 "뉴스 어휘(News Voca)" 섹션에 새로운 글을 추가할 수 있는 자동화 도구를 제공합니다.

## 📋 시스템 요구사항

- **Node.js** v14 이상
- **MongoDB** (로컬 또는 클라우드)
- **npm** (Node.js와 함께 설치됨)

## 🚀 빠른 시작 (3단계)

### 1️⃣ 스크립트 실행

터미널에서 다음 명령어를 실행하세요:

```bash
./publish-news-voca.sh
```

### 2️⃣ MongoDB URI 입력

처음 실행 시 MongoDB 연결 주소를 입력하라는 메시지가 나타납니다:

```
MongoDB URI: mongodb://localhost:27017/englisheasystudy
```

또는 MongoDB Atlas 클라우드를 사용하는 경우:

```
MongoDB URI: mongodb+srv://username:password@cluster.mongodb.net/englisheasystudy
```

### 3️⃣ 메뉴에서 선택

```
1) 예제 글 추가 (테스트용)
2) 템플릿으로 새 글 추가 (article-template.json 사용)
3) 커스텀 JSON 파일로 글 추가
4) Lindsay Clancy 예제 글 추가
5) 종료
```

## 📝 새 글 작성하기

### 방법 1: 템플릿 수정

1. `article-template.json` 파일을 열기
2. 내용을 원하는 글로 수정
3. 스크립트 실행 후 옵션 2 선택

### 방법 2: 새 JSON 파일 만들기

1. 새 파일 생성 (예: `my-article.json`)
2. 다음 형식으로 작성:

```json
{
  "title": "글 제목",
  "slug": "url-friendly-slug-name",
  "nickname": "작성자명",
  "password": "비밀번호",
  "metaDescription": "SEO용 설명 (160자 이내)",
  "message": "HTML 형식의 글 내용",
  "isSecret": false,
  "date": "2026-09-29T00:00:00.000Z"
}
```

## 🎨 글 내용 작성 가이드

### HTML 구조

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
    
    <!-- 추가 단어들... -->
  </section>

  <section class="article-content">
    <h2>📰 원문 발췌</h2>
    <blockquote>
      <p>원문 내용...</p>
    </blockquote>
  </section>

  <footer class="article-footer">
    <p><strong>출처:</strong> BBC News</p>
    <p><strong>학습 포인트:</strong> 설명...</p>
  </footer>
</article>
```

### 사용 가능한 CSS 클래스

- `vocabulary-section`: 어휘 섹션
- `vocab-item`: 개별 단어 항목
- `pronunciation`: 발음 기호
- `korean-meaning`: 한글 뜻
- `example`: 영문 예문
- `example-korean`: 한글 번역
- `article-content`: 기사 내용
- `article-footer`: 글 하단 정보
- `learning-notes`: 학습 포인트

## 🔑 Slug 명명 규칙

Slug는 URL에 사용되는 고유 식별자입니다:

✅ **올바른 예시:**
- `lindsay-clancy-murder-trial-victim-or-criminal-bbc`
- `ai-companies-race-for-power-amazon-google-wsj`
- `capybara-on-the-lam-english-countryside-wsj`

❌ **잘못된 예시:**
- `Lindsay Clancy Murder Trial` (공백, 대문자)
- `클랜시-재판-논란` (한글)
- `article_2026_09_29` (언더스코어)

**규칙:**
- 모두 소문자
- 단어는 하이픈(-)으로 연결
- 영문과 숫자만 사용
- 출처 포함 권장 (`-bbc`, `-cnn`, `-wsj` 등)

## 🔍 결과 확인

글 추가 후 다음 URL에서 확인:

1. **동적 URL**: `https://englisheasystudy.com/news-voca.html?slug=your-slug`
2. **SEO URL**: `https://englisheasystudy.com/news-voca/your-slug/`
3. **목록 페이지**: `https://englisheasystudy.com/news-voca-list.html`

로컬 테스트:
```
http://localhost:5500/news-voca.html?slug=your-slug
```

## 📁 생성되는 파일

스크립트 실행 시 자동으로 생성되는 파일:

1. **MongoDB 문서**: 데이터베이스에 글 저장
2. **SEO 폴더**: `/news-voca/your-slug/`
3. **index.html**: SEO용 정적 HTML 파일

## 🛠 문제 해결

### MongoDB 연결 실패

```bash
# MongoDB 상태 확인
mongod --version

# MongoDB 실행 (Mac)
brew services start mongodb-community

# MongoDB 실행 (Ubuntu/Linux)
sudo systemctl start mongod

# MongoDB 실행 (Windows)
net start MongoDB
```

### npm 패키지 설치 오류

```bash
cd backend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 권한 오류 (Permission denied)

```bash
chmod +x publish-news-voca.sh
chmod +x add-news-voca-article.js
```

### Slug 중복 오류

각 글은 고유한 slug를 가져야 합니다. slug를 변경하거나 기존 글을 수정/삭제하세요.

## 📚 예제 파일

프로젝트에 포함된 예제 파일:

1. **article-template.json**: 빈 템플릿
2. **article-example-lindsay-clancy.json**: Lindsay Clancy 기사 예제
3. **NEWS_VOCA_GUIDE.md**: 상세 가이드 (영문)

## 🔄 글 수정/삭제

글을 수정하거나 삭제하려면:

1. 웹사이트의 글 페이지에서 수정/삭제 버튼 클릭
2. 글 작성 시 설정한 비밀번호 입력
3. 내용 수정 또는 삭제 진행

## 💡 팁

1. **테스트 먼저**: 옵션 1 또는 4로 예제 글을 먼저 추가해보세요
2. **백업**: 중요한 글은 JSON 파일로 별도 저장
3. **발음 기호**: [IPA 차트](https://www.internationalphoneticalphabet.org/) 참고
4. **HTML 검증**: [W3C Validator](https://validator.w3.org/)로 HTML 검증
5. **이미지**: 상대 경로 또는 절대 URL 사용 가능

## 🆘 도움이 필요하신가요?

### 로그 확인

스크립트 실행 시 출력되는 로그를 확인하세요:
- ✅ 성공 메시지 (녹색)
- ⚠️ 경고 메시지 (노란색)
- ❌ 오류 메시지 (빨간색)

### 디버그 모드

```bash
node add-news-voca-article.js
```

직접 실행하여 상세한 오류 메시지 확인

### 수동 데이터베이스 확인

```bash
# MongoDB 쉘 접속
mongo

# 데이터베이스 선택
use englisheasystudy

# 글 목록 확인
db.guestbookentries.find().pretty()

# 특정 slug로 검색
db.guestbookentries.findOne({slug: "your-slug"})
```

## 📖 추가 자료

- [MongoDB 설치 가이드](https://docs.mongodb.com/manual/installation/)
- [Node.js 공식 문서](https://nodejs.org/)
- [Mongoose 문서](https://mongoosejs.com/)
- [HTML 작성 가이드](https://www.w3schools.com/html/)

## 🎓 학습 단계별 가이드

### 초급: 예제로 시작하기

1. `./publish-news-voca.sh` 실행
2. 옵션 4 선택 (Lindsay Clancy 예제)
3. 생성된 글 확인

### 중급: 템플릿 수정하기

1. `article-template.json` 파일 열기
2. 제목, 단어, 예문 수정
3. 옵션 2로 글 추가

### 고급: 처음부터 작성하기

1. 새 JSON 파일 생성
2. HTML 구조 직접 작성
3. 옵션 3으로 커스텀 파일 사용

## ✨ 성공적인 글 작성을 위한 체크리스트

- [ ] MongoDB가 실행 중인가요?
- [ ] MongoDB URI가 올바른가요?
- [ ] slug가 고유한가요?
- [ ] 모든 필수 필드가 채워졌나요?
- [ ] HTML 형식이 올바른가요?
- [ ] 발음 기호가 정확한가요?
- [ ] 예문과 번역이 일치하나요?
- [ ] metaDescription이 160자 이내인가요?

---

**Happy Learning & Teaching! 📚✨**

문제가 있으면 issue를 등록하거나 문의해주세요.
