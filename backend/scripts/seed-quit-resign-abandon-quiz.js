/**
 * 그만두다·물러나다·버리다 연관 단어 퀴즈 시드
 *   cd backend && node scripts/seed-quit-resign-abandon-quiz.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

const article = {
  format: 'reveal',
  directions: ['en-ko', 'ko-en'],
  title: '그만두다·물러나다·버리다 연관 단어',
  slug: 'quit-resign-abandon-related-words',
  metaDescription:
    'quit, resign, abdicate, relinquish, abandon 등 그만두다·물러나다·버리다 관련 영어 표현을 입력·채점하는 퀴즈입니다.',
  sourceUrl: 'https://youtube.com/shorts/nLUgYwMPoE4',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-23',
  section1Title: '영어 → 한글',
  section2Title: '한글 → 영어',
  pairs: [
    { en: 'quit', ko: '그만두다' },
    { en: 'step down', ko: '물러나다' },
    { en: 'vacate', ko: '자리를 비우다, 직책에서 물러나다' },
    { en: 'resign', ko: '사임하다' },
    { en: 'demit', ko: '사직하다, 직책을 내려놓다' },
    { en: 'abdicate', ko: '퇴위하다' },
    { en: 'hand over', ko: '넘겨주다' },
    { en: 'yield', ko: '양보하다, 넘겨주다' },
    { en: 'surrender', ko: '내주다, 포기하다' },
    { en: 'cede', ko: '양도하다, 넘겨주다' },
    { en: 'relinquish', ko: '내려놓다, 포기하다' },
    { en: 'give up', ko: '포기하다' },
    { en: 'waive', ko: '권리를 포기하다' },
    { en: 'renounce', ko: '공식적으로 포기하다' },
    { en: 'abnegate', ko: '스스로 포기하다' },
    { en: 'abandon', ko: '버리다, 포기하다' },
    { en: 'desert', ko: '저버리다, 떠나다' },
    { en: 'forsake', ko: '저버리다' },
    { en: 'disown', ko: '의절하다, 관계를 끊다' },
    { en: 'abjure', ko: '엄숙히 포기하다' },
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
