# Word of the Day 생성 도구

이 도구들을 사용하여 새로운 "Word of the Day" 콘텐츠를 쉽게 생성할 수 있습니다.

## 📁 파일 설명

### 1. `create-word-of-day.js`
미리 정의된 데이터로 Word of the Day 콘텐츠를 생성하는 스크립트입니다.

**특징:**
- 스크립트 내부에 단어 데이터를 직접 작성
- 빠른 생성 (수정 후 바로 실행)
- 여러 단어를 한번에 생성할 때 유용

**사용법:**
```bash
cd /workspace/backend
node scripts/create-word-of-day.js
```

**수정 방법:**
파일을 열어서 `WORD_DATA` 객체를 수정하세요:
```javascript
const WORD_DATA = {
  word: 'eloquent',
  pronunciation: '/ˈel.ə.kwənt/',
  partOfSpeech: 'adjective',
  koreanMeaning: '웅변의, 능변의, 설득력 있는',
  // ... 나머지 데이터
};
```

### 2. `create-word-interactive.js`
대화형 인터페이스로 단어 데이터를 입력받아 생성하는 스크립트입니다.

**특징:**
- 단계별 질문에 답하면서 데이터 입력
- 즉석에서 단어 생성
- 코드 수정 불필요

**사용법:**
```bash
cd /workspace/backend
node scripts/create-word-interactive.js
```

**입력 항목:**
1. 단어 (영어)
2. 발음 기호
3. 품사
4. 한글 뜻
5. 영어 정의
6. 예문 (3개 이상)
7. 주요 표현 (3개 이상)
8. 유의어
9. Slug (URL용)
10. 비밀번호

### 3. `post-word-to-api.js`
생성된 데이터를 API에 전송하는 스크립트입니다.

**사용법:**
```bash
cd /workspace/backend
node scripts/post-word-to-api.js <slug>
```

**예시:**
```bash
node scripts/post-word-to-api.js eloquent
```

## 🚀 사용 흐름

### 방법 1: 미리 정의된 데이터 사용

```bash
# 1. create-word-of-day.js 파일을 수정하여 WORD_DATA 입력
nano scripts/create-word-of-day.js

# 2. 스크립트 실행
node scripts/create-word-of-day.js

# 3. API에 전송
node scripts/post-word-to-api.js eloquent
```

### 방법 2: 대화형 인터페이스 사용

```bash
# 1. 대화형 스크립트 실행
node scripts/create-word-interactive.js

# 2. 질문에 답하면서 데이터 입력

# 3. API에 전송
node scripts/post-word-to-api.js <입력한-slug>
```

## 📂 생성되는 파일

스크립트를 실행하면 다음 파일들이 생성됩니다:

1. **정적 HTML 파일**
   - 위치: `/workspace/word-of-the-day/<slug>/index.html`
   - 용도: SEO를 위한 정적 HTML 페이지

2. **API 데이터 파일**
   - 위치: `/workspace/backend/scripts/<slug>-api-data.json`
   - 용도: API 전송용 JSON 데이터

## 📝 데이터 구조

```javascript
{
  word: 'eloquent',                    // 단어
  pronunciation: '/ˈel.ə.kwənt/',     // 발음 기호
  partOfSpeech: 'adjective',          // 품사
  koreanMeaning: '웅변의, 능변의',     // 한글 뜻
  englishDefinition: '...',           // 영어 정의
  
  examples: [                          // 예문
    {
      en: 'She gave an eloquent speech...',
      ko: '그녀는 설득력 있는 연설을...'
    }
  ],
  
  keyPhrases: [                        // 주요 표현
    {
      phrase: 'eloquent speech',
      meaning: '웅변적인 연설'
    }
  ],
  
  synonyms: ['articulate', 'fluent'],  // 유의어
  slug: 'eloquent',                    // URL slug
  metaDescription: '...',              // SEO 설명
  nickname: 'English Easy Study',      // 작성자
  password: '***'                      // 관리 비밀번호
}
```

## 🎨 HTML 구조

생성되는 HTML은 다음 섹션들로 구성됩니다:

1. **Header** (wotd-header)
   - 단어
   - 발음 및 TTS 버튼
   - 품사

2. **Meaning** (wotd-meaning)
   - 한글 뜻
   - 영어 정의

3. **Examples** (wotd-examples)
   - 예문 목록 (영어 + 한글)

4. **Key Phrases** (wotd-phrases)
   - 주요 표현 목록

5. **Synonyms** (wotd-synonyms)
   - 유의어 태그

6. **Footer** (wotd-footer)
   - 학습 격려 메시지

## 🔗 API 엔드포인트

### POST /wordofday
새로운 Word of the Day 엔트리 생성

**요청 본문:**
```json
{
  "title": "eloquent | 웅변의",
  "message": "<article class=\"wotd-card\">...</article>",
  "nickname": "English Easy Study",
  "password": "your-password",
  "isSecret": false,
  "slug": "eloquent",
  "metaDescription": "eloquent 뜻과 예문..."
}
```

**응답:**
```json
{
  "message": "Entry saved successfully",
  "entry": {
    "_id": "...",
    "title": "eloquent | 웅변의",
    "slug": "eloquent",
    ...
  }
}
```

## 🌐 접근 URL

생성된 콘텐츠는 다음 URL로 접근 가능합니다:

1. **동적 페이지 (API 사용)**
   ```
   https://englisheasystudy.com/word-of-the-day.html?slug=eloquent&api=prod
   ```

2. **정적 페이지 (SEO용)**
   ```
   https://englisheasystudy.com/word-of-the-day/eloquent
   ```

## ⚠️ 주의사항

1. **비밀번호 관리**
   - 생성 시 사용한 비밀번호는 안전하게 보관하세요
   - 게시물 수정/삭제 시 필요합니다

2. **Slug 중복**
   - 이미 존재하는 slug를 사용하면 오류가 발생합니다
   - 고유한 slug를 사용하세요

3. **HTML 형식**
   - message 필드는 HTML 형식이어야 합니다
   - 스크립트가 자동으로 생성합니다

## 🐛 문제 해결

### 디렉토리가 이미 존재합니다
```bash
# 기존 디렉토리 삭제 후 재시도
rm -rf /workspace/word-of-the-day/<slug>
```

### API 전송 실패
```bash
# API 데이터 파일 확인
cat /workspace/backend/scripts/<slug>-api-data.json

# curl로 직접 테스트
curl -X POST \
  https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday \
  -H "Content-Type: application/json" \
  -d @<slug>-api-data.json
```

## 📚 예제

### precaution (기존 예제)
```bash
# 기존 precaution 예제를 참고하려면
cat /workspace/word-of-the-day/precaution/index.html
```

이 예제를 참고하여 새로운 단어를 생성하세요!
