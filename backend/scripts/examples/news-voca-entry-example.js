/**
 * 뉴스 어휘(및 동형 상세) 새 글 작성용 데이터 예시
 *
 * 선택 필드:
 * - meaning   : 표현의 뜻 (없으면 상세 카드에서 뜻 줄 숨김)
 * - source    : 출처 표기 (없으면 slug 끝 -wsj/-cnn 등에서 추출)
 * - thumbnail : 목록·대표 이미지 URL
 * - summary   : 목록·상세 요약 문단
 *
 * 업로드는 기존 seed/format 스크립트 흐름을 따릅니다.
 */
module.exports = {
  title: 'AI 음악에 흔들리는 음반업계',
  slug: 'ai-music-streaming-fraudulent-royalties-economist',
  metaDescription: '스트리밍 플랫폼의 저품질 AI 음악과 부정 로열티 이슈를 핵심 표현과 함께 읽습니다.',
  password: 'CHANGE_ME',
  datePublished: '2026-10-19',
  // 선택 메타 (목록·상세 리디자인에서 사용)
  source: 'Economist',
  thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg',
  summary: '스트리밍 플랫폼에 저품질 AI 음악이 쏟아지고, 부정 로열티를 노리는 봇 팜까지 등장했습니다.',
  intro: [
    '스트리밍 플랫폼에 저품질 AI 음악이 쏟아지고, 부정 로열티를 노리는 봇 팜까지 등장했습니다. 흔들리는 음반업계 이야기를 핵심 표현과 함께 읽어봅니다.'
  ],
  youtube: 'https://www.youtube.com/watch?v=VIDEO_ID',
  sourceUrl: 'https://www.economist.com/',
  words: [
    {
      // 표현 카드형 (권장)
      word: { en: 'fraudulent royalties', ko: '부정 로열티', meaning: '부정 로열티' },
      meaning: '부정 로열티',
      example: {
        en: 'Bot farms hope to harvest fraudulent royalties.',
        ko: '봇 팜은 부정 로열티를 가로채려 합니다.'
      }
    },
    {
      // 내러티브형 (기존 글과 동일 — 한글 문장 안에 **하이라이트**)
      narrative: [
        'AI가 만든 음악은 이미 **zeitgeist** 속에서 존재감을 드러내고 있습니다.'
      ]
    }
  ]
};
