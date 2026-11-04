# YouTube Shorts → 홈페이지 자동 동기화

**프로젝트명:** `youtube_automation`  
**목표:** `@istudyeng` 채널에 새 Shorts가 공개되면, **englisheasystudy.com 홈**에 「최신 영어 Shorts」 섹션이 자동으로 갱신되게 한다.  
**상태:** Phase 1~2 구현됨 (RSS → JSON → 홈 섹션 + GitHub Actions)  
**관련 브랜드:** 시사영단어 · News English Lab

---

## 1. 배경 · 왜 필요한가

지금은 홈의 YouTube 진입점이 상단 배너(`@istudyeng/shorts` 링크) 수준이다.  
영상이 올라올 때마다 `index.html`을 손으로 고치지 않고, **최신 Shorts 썸네일·제목**이 홈에 보이면:

- 방문자가 사이트에서 바로 새 학습 영상을 발견한다
- Shorts → 뉴스 어휘 / 문장 / 연관단어 학습 페이지로 이어가기 쉽다
- 운영자가 배포 없이도 홈 콘텐츠가 최신으로 유지된다

기존 「최신 뉴스 어휘」「이럴 땐 영어로?」「WORD OF THE DAY」 섹션은 **유지**하고,  
그 옆(또는 아래)에 **「최신 영어 Shorts」** 섹션을 **추가**하는 방향을 권장한다.

---

## 2. 채널 · 대상 데이터

| 항목 | 값 |
|------|-----|
| 채널 핸들 | `@istudyeng` |
| 채널 ID | `UC4LbF7X56QIHL3Oejt8kuyw` |
| Shorts URL 패턴 | `https://www.youtube.com/shorts/{videoId}` |
| 수집 필드 | `videoId`, `category`, `label`, `title`, `thumbnail`, `publishedAt`, `url` |
| 홈 노출 개수(초안) | 최근 **6개** (설정으로 변경 가능) |
| 제목 규칙 | `카테고리 \| 제목` (예: `국제 \| …`, `연관단어 \| …`) |
| 자동 동기화 | **매일 오후 9시(KST)** GitHub Actions |
| 수동(D-day) | `node …/sync-shorts.js --today` 또는 Actions에서 `today_only=true` |

---

## 3. 유튜브 제목 규칙 (카테고리 인식)

업로드 제목을 아래처럼 쓰면 홈 카드에 **카테고리 배지**가 붙고, 이후 학습 글 연결에도 쓸 수 있다.

```
국제 | 항공기 허위 폭탄 테러
연관단어 | 묵인하다 Acquiesce
경제 | 유럽 연금 사회계약
```

| 제목 앞 단어 | 홈 라벨 | (예비) 목록 링크 |
|--------------|---------|-----------------|
| 국제 | 국제 | news-voca-list.html |
| 한국 / 국방 / 경제 / 스포츠 / 미국 / 산업 | 동일 | 각 보드 리스트 |
| 연관단어 / 유의어 | 연관단어 | english-synonym-list.html |
| 컬쳐 / 문화 | 컬쳐 | culture-voca-list.html |
| 문장 / 퀴즈 / 단어장 / 표현 / 상황 / 포토 | 동일 | 각 페이지 |

구분자는 `|` 또는 `｜` (전각) 모두 허용.  
규칙이 없으면 `category`는 빈 값이고, 제목 전체를 그대로 표시한다.

## 4. 추천 자동화 구조

```
유튜브 업로드 제목:  국제 | 제목
        │
        ▼
  매일 21:00 KST  (또는 수동 --today)
  RSS 동기화 → category/title 파싱
        │
        ▼
  data/youtube-shorts.json
        │
        ▼
  홈 「최신 영어 Shorts」
  [국제] 제목 + 썸네일
```

- **수동으로 `index.html`에 영상 HTML을 넣지 않는다.**
- **D-day만:** `node backend/youtube_automation/sync-shorts.js --today`
- **저녁 일괄:** Actions가 매일 21:00 KST에 최근 6개 갱신
- 클릭 시: Shorts 페이지로 이동(1차)

---

## 5. 구현 방법 비교

| 방법 | 반영 시점 | 난이도 | 특징 |
|------|-----------|--------|------|
| **A. YouTube API/RSS + 브라우저 JS** | 방문 시 조회 | 낮음~중간 | 구현 빠름. API 키를 프론트에 두면 위험. RSS면 키 불필요 |
| **B. GitHub Actions + RSS → JSON** | **매일 21:00 KST** (+ 수동) | 중간 | **현재 채택.** 제목 카테고리 파싱 |
| **C. YouTube Webhook + 서버** | 거의 실시간 | 높음 | 별도 수신 서버 필요 |

### 운영 선택 (현재)

- **평소:** 하루 한 번(저녁 9시) 자동 동기화 — 그날 올린 영상이 홈에 모임
- **당장 반영:** 로컬/`Actions` 수동 실행, 필요 시 `--today`로 D-day만

### 보완 옵션

- **B + RSS 우선:** 이미 레포에 `backend/scripts/youtube-rss.js`가 있어 **API 키 없이** 채널 피드를 가져올 수 있다. Actions에서도 RSS만으로 1차 구현 가능.
- **A를 보조:** JSON이 없을 때만 클라이언트에서 RSS/프록시로 폴백.
- **C는 트래픽·실시간 요구가 커지면** 백엔드(`/youtube/...`)로 확장.

---

## 5. 홈 UI 스케치

**섹션 제목:** 최신 영어 Shorts  
**정렬:** 최근 업로드 순  
**카드 예시:**

| Shorts 1 | Shorts 2 | Shorts 3 |
|----------|----------|----------|
| 썸네일 | 썸네일 | 썸네일 |
| 영상 제목 | 영상 제목 | 영상 제목 |

- 데스크톱: 3열 / 모바일: 가로 스크롤 또는 2열
- 기존 학습 섹션과 톤 맞춤 (`rd-section` 패턴)
- 상단 YouTube 빌보드 바는 유지해도 됨 (채널 바로가기)

**배치 후보 (권장):**  
「최신 뉴스 어휘」 바로 위 또는 「WORD OF THE DAY」 아래 — 학습 동선이 끊기지 않게.

---

## 6. Shorts 판별

YouTube Data API / RSS에는 **「이 영상이 Shorts인가」 전용 필터가 없다.**  
실무적으로 아래를 조합한다.

1. URL이 `/shorts/{id}` 형태로 열리는지 (리다이렉트·oEmbed·페이지 확인)
2. 영상 길이 ≤ 60초 (Data API `contentDetails.duration` — API 사용 시)
3. 제목/설명에 Shorts 표기가 있는 경우(보조 신호)

RSS만 쓸 경우: 채널이 Shorts 위주라면 **최근 N개를 Shorts로 간주**하고,  
이후 API로 duration 필터를 추가하는 2단계도 가능.

---

## 7. 산출물 · 파일 설계 (구현 시)

이 폴더(`backend/youtube_automation/`)에 점진적으로 둘 예정:

```
backend/youtube_automation/
  README.md                 ← 본 설명서
  sync-shorts.js            ← (예정) 피드 조회 → JSON 생성
  youtube-shorts.schema.json← (예정) 필드 정의
  .env.example              ← (예정) YOUTUBE_API_KEY 등

# 사이트 정적 산출물 (프론트에서 fetch)
/data/youtube-shorts.json   또는  /youtube-shorts.json
```

**JSON 예시:**

```json
{
  "updatedAt": "2026-11-04T07:00:00.000Z",
  "channelId": "UC4LbF7X56QIHL3Oejt8kuyw",
  "handle": "@istudyeng",
  "items": [
    {
      "videoId": "XXXXXXXXXXX",
      "title": "오늘의 핵심 영단어",
      "publishedAt": "2026-11-04T01:00:00.000Z",
      "thumbnail": "https://i.ytimg.com/vi/XXXXXXXXXXX/hqdefault.jpg",
      "url": "https://www.youtube.com/shorts/XXXXXXXXXXX"
    }
  ]
}
```

**GitHub Actions (초안):**

- 트리거: `schedule` (예: `*/15 * * * *`) + `workflow_dispatch`
- 단계: sync 스크립트 실행 → JSON diff 있으면 commit/push → Netlify 자동 배포
- secrets: `YOUTUBE_API_KEY`(API 사용 시), `GITHUB_TOKEN`(기본)

---

## 8. 기존 코드와의 관계

이미 레포에 **Shorts → 뉴스 글 초안/업로드** 파이프라인이 있다.

| 경로 | 역할 |
|------|------|
| `backend/scripts/youtube-rss.js` | 채널 RSS 파싱 (채널 ID 기본값 = 위와 동일) |
| `backend/scripts/youtube-sync.js` | Shorts → News Voca 등 **게시글 초안/업로드** |
| `backend/scripts/youtube-drafts/` | 초안 JSON 보관 |
| `site-masthead.js` | 홈 YouTube 빌보드 링크 |

본 프로젝트(`youtube_automation`)는 그와 **목적이 다르다.**

| | `youtube-sync.js` (기존) | `youtube_automation` (본 프로젝트) |
|--|-------------------------|-------------------------------------|
| 출력 | 학습 게시글 / 초안 | 홈 **Shorts 갤러리 JSON** |
| 사용자 행동 | 글로 단어 학습 | 최신 영상 시청·채널 유입 |
| 자동화 | 운영자 draft/upload | Actions로 JSON 주기 갱신 |

장기적으로는 Shorts 카드 → 해당 `news-voca` / `one-sentence` 글로 **딥링크**를 연결할 수 있다  
(`youtube-sync`가 만든 slug와 `videoId`를 매핑).

---

## 9. 구현 단계 (로드맵)

### Phase 0 — 설명서 · 합의

- [x] 목표·방식·UI 방향 문서화
- [x] 홈 위치: 「최신 뉴스 어휘」 위 / 카드 6개 / 클릭 시 Shorts로 이동

### Phase 1 — JSON 파이프라인 (최소 동작)

1. [x] `sync-shorts.js`: RSS로 최근 영상 N개 수집
2. [x] `data/youtube-shorts.json` 생성
3. [x] GitHub Actions (15분) + 변경 시 커밋 — `.github/workflows/sync-youtube-shorts.yml`
4. [x] 로컬에서 JSON 생성 확인

```bash
# 최근 6개 (저녁 자동과 동일)
node backend/youtube_automation/sync-shorts.js --limit 6

# 한국시간 오늘 업로드분만
node backend/youtube_automation/sync-shorts.js --today --limit 6
```

### Phase 2 — 홈 UI

1. [x] `index.html` 「최신 영어 Shorts」 섹션
2. [x] `home-redesign.js` → `renderShortsFeed()`
3. [x] 로딩 스켈레톤 / 빈·오류 메시지
4. [x] 모바일 가로 스크롤

### Phase 3 — 품질

1. Shorts 판별 강화 (duration 등)
2. 캐시 버스팅 (`?v=` 또는 `updatedAt`)
3. 중복·비공개·삭제 영상 정리
4. (선택) 임베드 플레이어 / 관련 학습 글 링크

### Phase 4 — 학습 연결 (선택)

1. `videoId` ↔ 게시글 slug 매핑 테이블
2. Shorts 카드에 「이 영상 단어 공부」 CTA

---

## 10. 실제 구현 체크리스트 (운영)

1. **Google Cloud** — YouTube Data API 키 발급 (RSS만 쓰면 생략 가능)
2. **채널 영상 조회** — ID·제목·썸네일·게시일
3. **Shorts 선별** — 길이/URL 규칙
4. **GitHub Actions** — 10~15분 주기 + secrets
5. **홈 수정** — JSON 기반 최근 6개 자동 배치
6. **배포 확인** — Netlify 반영 후 홈에서 썸네일·링크 점검

---

## 11. 리스크 · 주의

- Actions 스케줄은 **지연·스킵**될 수 있음 → “실시간” 문구는 쓰지 말 것
- YouTube API **일일 할당량** — RSS 우선 시 할당량 부담 감소
- 썸네일·제목은 YouTube 정책·저작권 범위 안에서 링크 아웃이 안전
- API 키를 `index.html` / 공개 JS에 넣지 말 것
- Netlify 캐시: HTML은 이미 revalidate, JSON도 `Cache-Control` 짧게

---

## 12. 성공 기준

- [ ] 새 Shorts 공개 후 **약 15분 이내**(스케줄 기준) 홈 섹션에 카드 등장
- [ ] 홈에서 기존 학습 섹션 레이아웃이 깨지지 않음
- [ ] `index.html`에 영상 ID를 수동으로 넣지 않아도 됨
- [ ] 모바일에서도 썸네일·제목이 읽기 쉬움

---

## 13. 운영 · 다음 액션

**수동 갱신**

```bash
node backend/youtube_automation/sync-shorts.js --limit 6
# 또는 D-day만
node backend/youtube_automation/sync-shorts.js --today

git add data/youtube-shorts.json && git commit -m "chore: sync latest YouTube Shorts for home" && git push
```

**Actions:** GitHub → Actions → “Sync YouTube Shorts” → Run workflow  
(`today_only=true` 선택 가능)

**남은 개선 (Phase 3+)**

- Shorts duration 판별 강화
- 인페이지 임베드 재생
- Shorts ↔ News Voca 딥링크
