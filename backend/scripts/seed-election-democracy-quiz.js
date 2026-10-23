/**
 * 미국 민주주의·선거 어휘 퀴즈 시드 (The Economist)
 *   cd backend && node scripts/seed-election-democracy-quiz.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';

const article = {
  format: 'reveal',
  directions: ['en-ko', 'ko-en'],
  title: '미국 민주주의·선거 어휘',
  slug: 'american-democracy-election-vocabulary',
  metaDescription:
    'The Economist 미국 민주주의 기사 어휘. doomsayer, complacency, constituency, concede, gerrymander 등을 입력·채점하는 퀴즈입니다.',
  sourceUrl: 'https://youtube.com/shorts/SJ9Oa3BaqMg',
  sourceLabel: '유튜브 보기',
  datePublished: '2026-10-19',
  section1Title: '영어 → 한글',
  section2Title: '한글 → 영어',
  pairs: [
    { en: 'doomsayer', ko: '비관론자' },
    { en: 'complacency', ko: '안일함' },
    { en: 'constituency', ko: '선거구, 지역구 유권자들' },
    { en: 'concede', ko: '패배를 인정하다' },
    { en: 'legitimacy', ko: '정당성' },
    { en: 'rig', ko: '선거를 부정하게 조작하다' },
    { en: 'voter fraud', ko: '부정 투표' },
    { en: 'deck-stacking', ko: '자기편에 유리하게 판을 짜는 행위' },
    { en: 'gerrymander', ko: '특정 정당에 유리한 선거구 조작' },
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
