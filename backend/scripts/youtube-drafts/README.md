# YouTube 초안

`youtube-sync.js --draft` 실행 시 여기에 `<videoId>.json` 초안이 생깁니다.

경로: `backend/scripts/youtube-drafts/`

```bash
cd backend
node scripts/youtube-sync.js --list
node scripts/youtube-sync.js --draft --limit 3
node scripts/youtube-sync.js --upload <videoId>
# 연관단어면 vocabulary-quiz 동시 생성 (끄려면 --no-quiz)
```
