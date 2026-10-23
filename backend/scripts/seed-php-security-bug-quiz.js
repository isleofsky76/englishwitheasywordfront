/**
 * PHP 보안 버그 어휘 퀴즈 시드 (WSJ)
 *   cd backend && node scripts/seed-php-security-bug-quiz.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

const article = {
  format: 'reveal',
  directions: ['en-ko', 'ko-en'],
  title: 'PHP 보안 버그 뉴스 어휘',
  slug: 'php-security-bug-vocabulary',
  metaDescription:
    'WSJ PHP 보안 취약점 기사 어휘. bug, flaw, vulnerability, exploit, Bugmageddon 등을 입력·채점하는 퀴즈입니다.',
  sourceUrl: 'https://youtube.com/shorts/eZ8AcdFbnfI',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-21',
  section1Title: '영어 → 한글',
  section2Title: '한글 → 영어',
  pairs: [
    { en: 'bug', ko: '버그, 소프트웨어 오류' },
    { en: 'flaw', ko: '결함, 허점' },
    { en: 'vulnerability', ko: '취약점' },
    { en: 'risky', ko: '위험한' },
    { en: 'severe', ko: '매우 심각한' },
    { en: 'critical', ko: '중대한, 치명적인' },
    { en: 'unauthorized', ko: '허가받지 않은' },
    { en: 'exploit', ko: '악용하다' },
    { en: 'steal', ko: '훔치다' },
    { en: 'launch', ko: '공격을 개시하다' },
    { en: 'trigger', ko: '촉발하다' },
    { en: 'Bugmageddon', ko: '버그 대재앙' },
  ],
};

uploadVocabularyQuiz(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(
      '상세:',
      `https://englisheasystudy.com/vocabulary-quiz/${article.slug}/`
    );
  })
  .catch((err) => {
    console.error('실패:', err.message || err);
    process.exit(1);
  });
