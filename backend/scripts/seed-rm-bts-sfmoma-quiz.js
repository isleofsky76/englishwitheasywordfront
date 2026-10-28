/**
 * RM·BTS SFMOMA 전시 어휘 퀴즈 (Guardian)
 *   cd backend && node scripts/seed-rm-bts-sfmoma-quiz.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadVocabularyQuiz } from './vocabulary-quiz-format.js';
import { enrichQuizTrackWords } from './quiz-answer-alts.js';

const pairs = [
  { en: 'calligraphy', ko: '서예' },
  { en: 'juxtaposed', ko: '비교·대조되도록 나란히 놓인, 나란히 놓인, 병치된' },
  { en: 'scholarly', ko: '학문적인, 전문적인, 학술적인' },
  { en: 'intuitive', ko: '직관적인, 직관적' },
  { en: 'diaristic', ko: '일기식의, 일기체의, 일기 형식의' },
  { en: 'formidable', ko: '대단한, 감탄할 만큼 뛰어난, 뛰어난' },
  { en: 'loom large', ko: '크게 부각되다, 두드러지다, 크게 다가오다' },
  { en: 'dedication', ko: '헌신, 열성, 전념' },
  { en: 'commemorate', ko: '기념하다, 특별한 일·순간을 기념하다, 기리다' },
  { en: 'one-off', ko: '단 한 번 있는 일, 일회성 사례, 일회성' },
  { en: 'deficit', ko: '적자, 부족, 결손' },
  { en: 'usher in', ko: '새로운 흐름·시대를 열다, 열다, 도입하다' },
];

const trackWords = enrichQuizTrackWords(pairs, { siblingMerge: false });
const wordList = pairs.map((p) => p.en).join(', ');

const article = {
  format: 'reveal',
  directions: ['en-ko', 'ko-en'],
  title: 'BTS RM SFMOMA 전시 어휘 퀴즈',
  slug: 'calligraphy-juxtaposed-scholarly-intuitive-formidable-quiz',
  metaDescription: `The Guardian RM·BTS SFMOMA 전시 기사 어휘 퀴즈. ${wordList} 등.`.slice(0, 160),
  sourceUrl: 'https://www.theguardian.com/artanddesign/2026/oct/24/rm-bts-sfmoma-exhibition',
  sourceLabel: '원문 보기 (The Guardian)',
  datePublished: '2026-10-24',
  section1Title: '영어 → 한글',
  section2Title: '한글 → 영어',
  pairs,
  trackWords,
  eyebrow: 'Vocabulary Quiz · News',
  hint: '유사·대체 표현도 정답으로 인정합니다.',
  password: 'seed_vocabulary_quiz_calligraphy-juxtaposed-scholarly-intuiti',
};

uploadVocabularyQuiz(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/vocabulary-quiz/${article.slug}/`);
  })
  .catch((err) => {
    console.error('실패:', err.message || err);
    process.exit(1);
  });
