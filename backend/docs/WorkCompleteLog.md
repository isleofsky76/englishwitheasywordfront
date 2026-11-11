# 작업완료 목록 (Work Complete Log)

규칙: 문서·기능 작업이 **완료되면** 이 표에 한 줄 추가한다.  
컬럼: **번호 | action | 상태 | 완료일 | remark**

상태 값: `완료` / `부분완료` / `보류` / `취소`

관련 계획: [Homepageredesignplan.md](./Homepageredesignplan.md)

---

| 번호 | action | 상태 | 완료일 | remark |
|------|--------|------|--------|--------|
| 1 | 오늘의 단어·퀴즈·최신 어휘 유입 방식 점검, JS-only 영역 목록 | 완료 | 2026-10-23 | 30일 계획 1주차 |
| 2 | 구글 서치 콘솔·네이버 서치어드바이저 등록, 사이트맵 제출 | 완료 | 2026-10-26 | 30일 계획 1주차 |
| 3 | `Homepageredesignplan.md` 사업계획서로 전면 교체 (홈·30일·Pain·체크리스트 100) | 완료 | 2026-11-10 | 쇼츠(20sentence) 초안 대체 |
| 4 | 01~05 메뉴 불일치 진단 (뉴스만 `NEWS_TABS`, 단어/표현 `tabs:null`) | 완료 | 2026-11-10 | 모바일·목록 탭 일관성 |
| 5 | `VOCAB_TABS` / `EXPRESS_TABS` 추가 및 연관단어·퀴즈 보드 연결 | 완료 | 2026-11-10 | `board-list-config.js`, cache `?v=20261110tabs1` |
| 6 | `renderTabs` — 기존 `?` 있는 href에 api 쿼리 중복 방지 | 완료 | 2026-11-10 | 단어장 `?api=prod` 깨짐 방지 |
| 7 | `WorkCompleteLog.md` 신설 (번호·action·상태·완료일·remark) | 완료 | 2026-11-10 | docs 작업완료 시 이 표에 추가 |
| 8 | 요청 작업 항상 커밋·푸시 규칙 확정 + 탭/문서 `main` 배포 | 완료 | 2026-11-10 | `ebfe0b0d` / `49826641` → origin/main (Netlify) |
| 9 | 홈 개선 #1 신청 박스 우선순위 철회 → 콘텐츠(PDF) 선행으로 재배치 | 완료 | 2026-11-10 | 박스는 개선 10번·11/14 PDF #1 이후. 검색·오타 등이 앞순위 |
| 10 | 학습 경로 재배치: 02 단어=연관단어·문장·단어장, 퀴즈=05, 한눈에=06 | 완료 | 2026-11-10 | VOCAB_TABS 3개, QUIZ_TABS, index/masthead |
| 11 | 05 퀴즈 chips를 1개(시사 어휘 퀴즈)로 축소 | 완료 | 2026-11-10 | 퀴즈 목록/오늘의 퀴즈 중복 제거 |
| 12 | 목록 히어로: 영문 kicker만 남기고 +2px, 한글 대형 제목 제거 | 완료 | 2026-11-10 | 모바일 우측 여백 축소 `?v=20261110hero1` |
| 13 | 모바일 키워드 목록 카드: 섬네일 50% 가로형 + 제목 우측 4줄 | 완료 | 2026-11-10 | `.rd-list-card--kw` only ≤767px, `?v=20261110kwcard1`, `b7b3e486` deployed |
| 14 | 규칙 재확인: 요청 작업은 같은 턴에 항상 커밋+푸시(배포) | 완료 | 2026-11-10 | always-deploy preference 강화 |
| 15 | PC 키워드 섬네일: 긴 영단어 cqw+fit JS로 상자 맞춤 | 완료 | 2026-11-10 | `?v=20261110fit1` vulnerability 줄바꿈 삐침 방지 |
| 16 | 홈 TODAY'S QUIZ 배너 제거 (05 시사 어휘 퀴즈와 중복) | 완료 | 2026-11-10 | index `rd-quiz-banner-wrap` 삭제 |
| 17 | 모바일 가로형 섬네일 뜻(+2px, 11→13) | 완료 | 2026-11-10 | `.rd-list-card--kw .rd-kw-sub`, `?v=20261110sub13` |
| 18 | 뉴스 목록: 0번→1번 색 통일, 페이지 제거·전체 스크롤, 처음으로 고정 | 완료 | 2026-11-10 | `navGroup=news`, `?v=20261110scroll1` |
| 19 | 목록 섬네일: `nv-en`/`nv-ko` 중요단어 포맷 파싱 추가 | 완료 | 2026-11-10 | FI/돌 폴백 → rescind 등, `?v=20261110nven1` |
| 20 | 이전 글 섬네일: `nv-vocab`·주요표현·레거시 어휘정리·영문 highlight 파싱 | 완료 | 2026-11-10 | qualify/plunge 등, `?v=20261110legacy1` |
| 21 | 목록 JS: `#message` 없는 페이지에서 editor null addEventListener 크래시 가드 | 완료 | 2026-11-10 | defense/korea/news-voca/culture, `?v=20261110editor1` |
| 22 | 단어 다지기 탭(연관단어·문장·단어장) 문장·단어장에도 상시 노출 | 완료 | 2026-11-10 | `mountBoardSiblingTabs`, `?v=20261110vocabbar1` |
| 23 | 단어장·연관단어: 페이지 제거·전체 스크롤 + 처음으로 고정 | 완료 | 2026-11-10 | `navGroup=vocab`, `?v=20261110wotdscroll1` |
| 24 | 단어장 카드: 이미지 아래 카테고리·태그 제거, 영어 표제어만 | 완료 | 2026-11-10 | `isLemmaOnlyCard`, `?v=20261110wotdmeta1` |
| 25 | 홈 01 탭명 통일: `뉴스 영단어`/`뉴스 영어` → `시사 영단어` | 완료 | 2026-11-11 | index·masthead·board-list-config, `?v=20261111sisa1` |
| 26 | 사이트 검색 통합 인덱스 + smitten 오탐 수정 | 완료 | 2026-11-11 | `site-search-index.json`(1592), build script, badwords 검색 완화, `?v=20261111search1` |
| 27 | 한국 보드 YouTube 자동화 업로드 2건 | 완료 | 2026-11-11 | `micI6bp9HRw`(남준잉), `odv-z2mwqR8`(호르무즈) |
| 28 | 연관단어 표제어 동사원형 복구 | 완료 | 2026-11-11 | `cf.` lemma 우선, synonym 재업로드(pillory), `?v=20261111lemma1` |
| 29 | 연관단어 TTS 예문·cast blame·예문만 읽기 | 완료 | 2026-11-11 | 단어 TTS 덮어쓰기 수정, 구동사 활용형, 하단 예문만 읽기, `?v=20261111tts3` |
| 30 | 문의 페이지 /contact + 푸터 연결 | 완료 | 2026-11-11 | `contact.html`, Netlify `/contact`, 푸터 문의 링크 |
| 31 | 목록 작성일 + Article JSON-LD 보강 | 완료 | 2026-11-11 | 목록 카드 날짜, viewpost-seo Article 통일, `?v=20261111date1` |
| 32 | GSC 404·중복URL 코드 수정 | 완료 | 2026-11-11 | 절대 `/` + `.html` 제거, nested list 301, `?v=20261111abs1`; 콘솔 검증은 배포 후 |
| 33 | 단어뜻 페이지 보강 (WOTD·용어집) | 완료 | 2026-11-11 | canonical clean, glossary SSR, WOTD 미니퀴즈·관련링크, `?v=20261111ssr1`/`wotd2` |
| 34 | WOTD 미니퀴즈·관련링크 제거 | 완료 | 2026-11-11 | 품질 이슈·불필요로 롤백, `?v=20261111wotd3` |
| 35 | 키워드 목록 날짜를 섬네일 아래로 | 완료 | 2026-11-11 | 모바일 가로 배치 공백 해소, `?v=20261111dateunder1` |
| 36 | WOTD 자동 업로드 CLI 정리 | 완료 | 2026-11-11 | `--word/--image/--example`, `--from` 배치, wotd-* 본문 포맷 |
| 37 | 단어 다지기: SSR 텍스트 깜빡임 제거 + 탭 순서 단어장·연관단어·문장 | 완료 | 2026-11-11 | `.rd-list-ssr` 숨김·목록 밖 이동, `VOCAB_TABS`/`index`/`masthead`, `?v=20261111vocaborder1` |
| 38 | WOTD 상세 상단 공백 축소 + 목록 섬네일 1:1 | 완료 | 2026-11-11 | `rd-word-hero` 패딩·갭, `rd-list--wotd` 1:1 cover, `?v=20261111wotdspace1` |

---

## 사용 방법

1. 작업이 끝나면 **맨 아래 번호 +1** 로 행을 추가한다.  
2. `Homepageredesignplan.md` 체크박스를 `[x]`로 바꾼 뒤, **같은 날** 이 로그에도 남긴다.  
3. 부분만 끝냈으면 상태 `부분완료`, remark에 남은 일을 적는다.  
4. 배포가 필요하면 remark에 커밋/캐시 버전을 적는다.

## 다음 후보 (아직 미완료 — 끝나면 위로 옮김)

| 예정 action | remark |
|-------------|--------|
| 표현·단어장 목록 리디자인 + `EXPRESS_TABS`/`VOCAB_TABS` 노출 | 구형 Bootstrap navbar |
| `one-sentence`·`daily-english`·`english-writing` 탭 스트립 | 공통 partial |
| 햄버거 `mobileDup` 중복 정리 | 개선 10가지 #8 |
| 사이트 검색 JSON + `search.html` | 개선 1순위 |
| 홈 퀴즈 오타 물락→몰락 | 5분 |
| 주간 복습 PDF #1 콘텐츠 | 신청 박스 **선행 조건** |
| 무료 자료 신청 박스 UI | PDF #1 완료 후 |
