# 🖼️ 이미지 최적화 가이드

## 문제: 일부 이미지가 너무 큽니다

현재 큰 이미지들:
- laudable.png: 8.1MB ❌
- satiate.jpg: 3.2MB ❌
- feat.png: 3.0MB ❌

**목표: 각 이미지 200-500KB 이하**

---

## 방법 1: TinyPNG 사용 (가장 쉬움!)

### 절차:
1. https://tinypng.com 방문
2. 이미지 파일 드래그 앤 드롭 (최대 20개)
3. "Download All" 클릭
4. 압축된 파일로 교체

### 효과:
- 8.1MB → 약 200-300KB
- 화질 거의 동일!
- 무료 (월 500장까지)

---

## 방법 2: Squoosh 사용 (세밀한 조정)

### 절차:
1. https://squoosh.app 방문
2. 이미지 업로드
3. 오른쪽에서 설정:
   - Format: WebP (최고의 압축률)
   - Quality: 75-85
4. 다운로드

### 효과:
- PNG → WebP로 변환하면 50-80% 용량 감소
- 화질 유지

---

## 방법 3: 자동화 (여러 이미지 한번에)

### ImageOptim (Mac)
- https://imageoptim.com
- 폴더 전체 드래그 앤 드롭
- 자동 최적화

### XnConvert (Windows/Mac/Linux)
- https://www.xnview.com/en/xnconvert/
- 일괄 처리 가능

---

## 권장 설정

### Word of the Day 이미지
- **크기**: 1200×630px
- **형식**: WebP (또는 JPG)
- **품질**: 80-85
- **파일 크기**: 200-500KB

### 변환 예시:
```
Before:
- laudable.png: 8.1MB, 4000×3000px

After:
- laudable.webp: 250KB, 1200×630px
- 화질: 육안으로 차이 없음
- 로딩 속도: 32배 빠름!
```

---

## 압축 후 해야 할 일

```bash
# 1. 압축된 이미지로 교체
cp ~/Downloads/laudable-compressed.webp resources/laudable.webp

# 2. 기존 파일 삭제 (선택)
rm resources/laudable.png

# 3. Git 커밋
git add resources/
git commit -m "Optimize images for faster loading"
git push
```

---

## 체크리스트

큰 이미지들 (2MB 이상):
- [ ] laudable.png (8.1MB) → 압축
- [ ] satiate.jpg (3.2MB) → 압축
- [ ] feat.png (3.0MB) → 압축
- [ ] infuriate.jpg (2.9MB) → 압축
- [ ] abstruse.png (2.9MB) → 압축
- [ ] spool.jpg (2.5MB) → 압축
- [ ] congregate.png (2.4MB) → 압축
- [ ] convene.png (2.3MB) → 압축
- [ ] slink.png (2.2MB) → 압축
- [ ] page24.png (2.2MB) → 압축

---

## 예상 효과

**현재:**
- 큰 이미지 10개: 약 30MB
- 로딩 시간: 느림

**압축 후:**
- 같은 이미지 10개: 약 2-3MB
- 로딩 시간: 10배 빠름!
- GitHub 용량: 27MB 절약

---

## 추천 순서

1. **먼저**: 5MB 이상 이미지만 압축 (급한 것)
2. **다음**: 2MB 이상 이미지 압축
3. **마지막**: 1MB 이상 이미지 압축

**TinyPNG 하나면 충분합니다!** 🎉
