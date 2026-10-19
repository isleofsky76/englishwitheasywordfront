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
  title: 'AI 투자 경고 기사 추출 어휘',
  slug: 'ai-investment-warning-vocabulary',
  metaDescription:
    'AI 투자 경고 기사 영어 어휘. be alive to, mirage, drastically, deflate 등을 클릭해서 뜻을 확인하는 퀴즈입니다.',
  sourceUrl: 'https://youtube.com/shorts/tkwXENfK-KU',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-19',
  section1Title: '1. 영어 → 한글',
  section2Title: '2. 한글 → 영어',
  pairs: [
    { en: 'be alive to', ko: '~을 인식하다 (알아차리다)' },
    { en: 'mirage', ko: '신기루 (환상)' },
    { en: 'drastically', ko: '급격하게 (대폭)' },
    { en: 'deflate', ko: '줄어들다 (거품이 빠지다)' },
    { en: 'materialize', ko: '현실화되다 (실제로 이루어지다)' },
    { en: 'interlude', ko: '막간 (일시적인 조정)' },
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
