/**
 * 영어 단어 퀴즈 시드
 *
 * 사용법: 아래 article 수정 →
 *   cd backend && node scripts/seed-vocabulary-quiz.js
 *
 * 클릭 공개형: format: 'reveal' + pairs[{ en, ko }]
 * 객관식형: quizzes[{ question, choices, answer, meaning, en, ko }]
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

// ========== 여기만 수정 ==========

const article = {
  format: 'reveal',
  title: '테슬라 로드스터 뉴스 단어',
  slug: 'tesla-roadster-vocabulary',
  metaDescription:
    '테슬라 로드스터 뉴스 영어 어휘. spectacle, thruster, reiterate, formidable 등을 클릭해서 뜻을 확인하는 퀴즈입니다.',
  sourceUrl: 'https://www.youtube.com/watch?v=81s7MWKgUl0',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-19',
  section1Title: '1. 영어 → 한글',
  section2Title: '2. 한글 → 영어',
  pairs: [
    { en: 'spectacle', ko: '장관 (광경)' },
    { en: 'thruster', ko: '추진장치' },
    { en: 'reiterate', ko: '재확인하다' },
    { en: 'formidable', ko: '막강한' },
    { en: 'upend', ko: '뒤흔들다 (뒤집다)' },
    { en: 'commoditize', ko: '범용 상품으로 만들다' },
    { en: 'bolster', ko: '강화하다 (뒷받침하다)' },
    { en: 'stoke', ko: '(기대·감정을) 고조시키다' },
  ],
};

// ========== 여기만 수정 ==========

uploadVocabularyQuiz(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log('상세:', `${API_BASE.includes('localhost') ? 'http://localhost' : 'https://englisheasystudy.com'}/vocabulary-quiz.html?slug=${article.slug}`);
  })
  .catch((err) => {
    console.error('실패:', err.message || err);
    process.exit(1);
  });
