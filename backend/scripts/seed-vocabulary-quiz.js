/**
 * 영어 단어 퀴즈 시드
 *
 * 사용법: 아래 article 수정 →
 *   cd backend && node scripts/seed-vocabulary-quiz.js
 *
 * 클릭 공개형: format: 'reveal' + pairs[{ en, ko }]
 *   directions: ['en-ko'] 만 쓰면 영어 → 뜻 한 방향
 *
 * 국방뉴스 QUICK REVIEW 연동 규칙:
 *   기사 slug 가 foo 이면 퀴즈 slug 는 foo-quiz
 *   redesign 의 「복습 퀴즈 풀기」가 이 URL로 연결됨
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

// ========== 여기만 수정 ==========

const article = {
  format: 'reveal',
  directions: ['en-ko'],
  title: 'USS 에이브러햄 링컨 상륙 — 복습 퀴즈',
  slug: 'staggered-shore-leave-related-words-quiz',
  metaDescription:
    'USS 에이브러햄 링컨 승조원 파타야 상륙 기사 복습. staggered, shore leave, stint 등 영어 표현의 뜻을 클릭해 확인합니다.',
  sourceUrl: 'https://englisheasystudy.com/defense-news/staggered-shore-leave-related-words/',
  sourceLabel: '원문 글 보기',
  datePublished: '2026-10-20',
  section1Title: '영어 : 뜻',
  pairs: [
    { en: 'staggered', ko: '시차를 둔, 시차제의' },
    { en: 'shore leave', ko: '상륙 허가, 육상 휴가' },
    { en: 'stint', ko: '일정 기간 동안의 일·활동' },
    { en: 'off-limits', ko: '출입 금지의' },
    { en: 'abrupt', ko: '갑작스러운' },
    { en: 'intermittently', ko: '간헐적으로' },
    { en: 'conduct oneself', ko: '처신하다, 행동하다' },
    { en: 'deteriorating', ko: '악화되는' },
    { en: 'infamous', ko: '악명 높은' },
  ],
};

// ========== 여기만 수정 ==========

uploadVocabularyQuiz(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(
      '상세:',
      `${API_BASE.includes('localhost') ? 'http://localhost' : 'https://englisheasystudy.com'}/vocabulary-quiz.html?slug=${article.slug}`
    );
  })
  .catch((err) => {
    console.error('실패:', err.message || err);
    process.exit(1);
  });
