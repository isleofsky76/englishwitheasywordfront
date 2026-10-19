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
 *
 * narrative 국방뉴스 일괄:
 *   node scripts/sync-defense-review-quizzes.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

// ========== 여기만 수정 ==========

const article = {
  format: 'reveal',
  directions: ['en-ko'],
  title: '미국 국방 예산을 감축하는 것 — 복습 퀴즈',
  slug: 'defunding-us-military-related-words-quiz',
  metaDescription:
    'WSJ 국방 예산 사설 복습. round, arsenal, dire straits, readiness 등 영어 표현의 뜻을 클릭해 확인합니다.',
  sourceUrl: 'https://englisheasystudy.com/defense-news/defunding-us-military-related-words/',
  sourceLabel: '원문 글 보기',
  datePublished: '2026-09-04',
  section1Title: '영어 : 뜻',
  pairs: [
    { en: 'round', ko: '차례, 한 차례' },
    { en: 'press leak', ko: '언론 유출 보도' },
    { en: 'arsenal', ko: '무기 비축량' },
    { en: 'dire straits', ko: '심각한 곤경' },
    { en: 'readiness', ko: '대비태세' },
    { en: 'are compounding', ko: '누적되고 있다' },
    { en: 'defunding the military', ko: '군 재정 지원을 줄이다, 예산 삭감' },
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
