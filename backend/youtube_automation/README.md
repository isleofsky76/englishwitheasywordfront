# YouTube Shorts → 카테고리 게시글 동기화

**프로젝트명:** `youtube_automation`  
**목표:** `@istudyeng` Shorts의 **설명란(출처·원문 링크·단어)** 과 주소를 파싱해, 기존 `news-voca` / `us-news` / `economy-news` / `english-synonym` 등과 **동일한 글 양식**으로 게시한다.  
**핵심 스크립트:** `backend/scripts/youtube-sync.js` (+ `youtube-description-parse.js`)  
**관련 브랜드:** 시사영단어 · News English Lab

> 홈/목록에 YouTube 링크만 거는 방식이 **아닙니다.**  
> Contents(설명란) 메모 + 원문 URL → 기존 seed/upload 파이프라인으로 **게시글을 올립니다.**

---

## 1. 올바른 흐름

```
유튜브 업로드
  제목:  국제 | 항공기 허위 폭탄 테러
  설명:  출처 / 기사 제목 / 원본 링크 / 1. word — 뜻 …
        │
        ▼
  node scripts/youtube-sync.js --draft
        │  설명란 파싱 → youtube-drafts/<videoId>.json
        ▼
  node scripts/youtube-sync.js --upload <videoId>
  (또는 --upload-drafts)
        │
        ▼
  해당 보드 API + 정적 HTML
  국제 → news-voca-list
  미국 → us-news-list
  경제 → economy-news-list
  연관단어 → english-synonym-list (+ 퀴즈)
```

| 제목 카테고리 | board | 목록 |
|---------------|-------|------|
| 국제 | news-voca | news-voca-list.html |
| 한국 | korea-news | korea-news-list.html |
| 국방 | defense-news | defense-news-list.html |
| 경제 | economy-news | economy-news-list.html |
| 스포츠 | sports-news | sports-news-list.html |
| 미국 | us-news | us-news-list.html |
| 산업 | industry-news | industry-news-list.html |
| 유통 | retail-news | retail-news-list.html |
| 컬쳐 / 문화 | culture-voca | culture-voca-list.html |
| 여행 | travel-news | travel-news-list.html |
| 건강 | health-news | health-news-list.html |
| 연관단어 / #연관단어 | english-synonym | english-synonym-list.html |
| (그 외 `… \| 제목`) | news-voca | news-voca-list.html |

---

## 2. 운영 명령 (backend 폴더)

```bash
cd backend
node scripts/youtube-sync.js --list --limit 10
node scripts/youtube-sync.js --draft --limit 5
node scripts/youtube-sync.js --upload <videoId>
node scripts/youtube-sync.js --upload-drafts
```

- 설명란에서 단어를 못 찾으면 초안을 건너뜁니다.
- 연관단어 업로드 시 vocabulary-quiz도 함께 생성 (`--no-quiz`로 생략).
- 초안: `backend/scripts/youtube-drafts/`
- 상태: `backend/scripts/youtube-sync-state.json`

상세: `backend/scripts/youtube-drafts/README.md`

---

## 3. 유튜브 설명란(Contents) 양식

기존과 동일해야 파서가 글을 만듭니다.

```
출처 : The Wall Street Journal
기사 제목 : ...
원본 링크 : https://...
저자 : By ...

1. **expression — 뜻**
영문 예문
한글 예문
2. **...**
...
#연관단어   ← 연관단어 보드일 때
```

제목은 `카테고리 | 제목` (예: `국제 | …`, `미국 | …`, `연관단어 | …`).

---

## 4. 보조: RSS → JSON (갤러리용, 선택)

`sync-shorts.js` / `data/youtube-shorts.json` 은 **피드 스냅샷**용입니다.  
사이트 게시의 정본은 항상 **`youtube-sync.js` 업로드**입니다.

```bash
node backend/youtube_automation/sync-shorts.js --limit 12
```

GitHub Actions `sync-youtube-shorts.yml`도 JSON만 갱신하며, 게시글 업로드는 하지 않습니다.

---

## 5. 채널

| 항목 | 값 |
|------|-----|
| 핸들 | `@istudyeng` |
| 채널 ID | `UC4LbF7X56QIHL3Oejt8kuyw` |

관련 코드: `youtube-rss.js`, `youtube-description-parse.js`, `*-format.js` 업로더들.
