# 🖼️ Imgur 이미지 URL 교체 가이드

## perpetual 단어에 적합한 이미지 찾기

### 추천 검색어:
1. **Unsplash** (https://unsplash.com)
   - "infinity"
   - "eternal"  
   - "clock"
   - "endless loop"
   - "perpetual motion"

2. **Pexels** (https://pexels.com)
   - "continuous"
   - "forever"

### 이미지 업로드 단계

#### 1단계: 이미지 다운로드
- Unsplash나 Pexels에서 마음에 드는 이미지 다운로드

#### 2단계: Imgur 업로드
1. https://imgur.com 방문
2. 오른쪽 상단 "New post" 클릭
3. 이미지 드래그 앤 드롭
4. "Upload" 클릭

#### 3단계: 링크 복사
1. 업로드된 이미지 클릭
2. 오른쪽에서 "Copy link" 클릭
3. **직접 링크 형식 확인:**
   ```
   ✅ 올바른 형식: https://i.imgur.com/abc123.jpg
   ❌ 잘못된 형식: https://imgur.com/abc123
   ```

4. 직접 링크가 아니면:
   - 이미지 우클릭 → "이미지 주소 복사"
   - 또는 URL 끝에 `.jpg` 추가

#### 4단계: 스크립트에서 URL 교체

`backend/scripts/create-perpetual.js` 파일 수정:

```javascript
// 이 줄 찾기:
imageFile: 'https://i.imgur.com/8rKCJQX.jpg',

// 새 URL로 교체:
imageFile: 'https://i.imgur.com/YOUR_ID.jpg',  // ← 여기!
```

#### 5단계: 다시 생성

```bash
# 기존 폴더 삭제
rm -rf /workspace/word-of-the-day/perpetual

# 다시 실행
cd /workspace/backend
node scripts/create-perpetual.js
```

---

## 🎨 perpetual에 어울리는 이미지

### 개념:
- 끊임없이 계속되는 것
- 영원한 것
- 반복되는 것

### 추천 이미지 타입:
1. **무한대 기호 (∞)**
   - 영원함을 상징
   - 미니멀한 디자인

2. **시계/시간**
   - 끊임없이 흐르는 시간
   - 시계바늘

3. **파도/물결**
   - 끊임없이 밀려오는 파도
   - 순환하는 자연

4. **회전하는 것**
   - 물레방아
   - 회전목마
   - 기어

5. **우주/별**
   - 영원한 우주
   - 별들의 순환

---

## 예시 URL (테스트용)

직접 사용 가능한 무료 이미지 URL:

### 옵션 1: 무한대 기호
```
https://images.unsplash.com/photo-1501139083538-0139583c060f
```

### 옵션 2: 시계
```
https://images.unsplash.com/photo-1495364141860-b0d03eccd065
```

### 옵션 3: 파도
```
https://images.unsplash.com/photo-1505142468610-359e7d316be0
```

**주의:** Unsplash 이미지를 직접 링크하면 URL이 변경될 수 있습니다.
**추천:** 다운로드 후 Imgur에 업로드하는 것이 안전합니다!

---

## 빠른 교체 방법

### 파일에서 직접 수정:

```bash
# create-perpetual.js 파일 열기
nano backend/scripts/create-perpetual.js

# imageFile 줄 찾아서 URL 수정
# Ctrl+O (저장), Ctrl+X (종료)

# 기존 폴더 삭제 후 재생성
rm -rf word-of-the-day/perpetual
node backend/scripts/create-perpetual.js
```

---

## ✅ 완료 체크리스트

- [ ] Unsplash/Pexels에서 이미지 다운로드
- [ ] Imgur에 업로드
- [ ] 직접 링크 URL 복사 (i.imgur.com)
- [ ] create-perpetual.js에서 URL 교체
- [ ] 스크립트 재실행
- [ ] 이미지 확인
- [ ] Git 커밋 & 푸시
- [ ] API에 전송

---

**도움이 필요하시면 말씀해주세요!** 🎉
