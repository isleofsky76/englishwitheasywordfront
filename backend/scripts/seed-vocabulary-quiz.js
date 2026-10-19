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
  title: '조깅 부상 관련 어휘',
  slug: 'jogging-injury-vocabulary',
  /** 기존 오늘의 퀴즈 URL 정리 */
  deleteSlugs: ['daily-vocabulary-quiz-01'],
  metaDescription:
    '조깅·러닝 부상 관련 영어 어휘. overuse, ache, kneecap, stress fracture 등을 클릭해서 뜻을 확인하는 퀴즈입니다.',
  sourceUrl: 'https://youtube.com/shorts/Awc28hBniog',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-19',
  section1Title: '1. 영어 → 한글 (숨긴 한글을 클릭해 확인)',
  section2Title: '2. 한글 → 영어 (숨긴 영어를 클릭해 확인)',
  pairs: [
    { en: 'overuse', ko: '과사용 (과도한 사용)' },
    { en: 'ache', ko: '쑤심 (통증)' },
    { en: 'knee pain', ko: '무릎 통증' },
    { en: 'kneecap', ko: '슬개골 (무릎뼈)' },
    { en: 'twinge', ko: '찌릿한 통증' },
    { en: 'stress fracture', ko: '피로골절' },
    { en: 'cartilage', ko: '연골' },
    { en: 'arthritis', ko: '관절염' },
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
