/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] Cyclosporiasis | parasite · food-borne illness 어휘',
  slug: 'cyclosporiasis-symptoms-treatment-diagnosis-wsj',
  metaDescription:
    'WSJ 기사에서 다루는 cyclosporiasis(시클로스포라증) 관련 영어 단어입니다. parasite, food-borne illness, gastrointestinal illness, stool test 등 증상·진단 어휘를 발음과 함께 정리합니다.',
  password: 'password_seed_cyclosporiasis_symptoms_treatment_diagnosis_wsj',
  datePublished: '2026-07-20',

  intro: [
    '기사는 식품으로 전파되는 기생충 감염인 **cyclosporiasis**(시클로스포라증)의 증상, 진단, 치료에 대해 다룹니다. 아래는 기사 이해에 도움이 되는 핵심 어휘입니다.',
  ],

  words: [
    {
      title: '중요 단어 1. parasite',
      word: { en: 'parasite', ko: '기생충', pron: '패러사이트' },
    },
    {
      title: '중요 단어 2. food-borne illness',
      word: { en: 'food-borne illness', ko: '식품 매개 질환', pron: '푸드 본 일니스' },
    },
    {
      title: '중요 단어 3. gastrointestinal illness',
      word: { en: 'gastrointestinal illness', ko: '위장관 질환', pron: '가스트로인테스티널 일니스' },
    },
    {
      title: '중요 단어 4. shredded',
      word: { en: 'shredded', ko: '채를 썬, 갈기갈기 찢긴', pron: '슈레디드' },
    },
    {
      title: '중요 단어 5. microscopic parasite',
      word: { en: 'microscopic parasite', ko: '미세 기생충', pron: '마이크로스코픽 패러사이트' },
    },
    {
      title: '중요 단어 6. infect',
      word: { en: 'infect', ko: '감염시키다', pron: '인펙트' },
    },
    {
      title: '중요 단어 7. spread',
      word: { en: 'spread', ko: '퍼지다, 전파되다', pron: '스프레드' },
    },
    {
      title: '중요 단어 8. irrigation',
      word: { en: 'irrigation', ko: '관개 (물 대기)', pron: '이리게이션' },
    },
    {
      title: '중요 단어 9. gastrointestinal tract',
      word: { en: 'gastrointestinal tract', ko: '위장관', pron: '가스트로인테스티널 트랙' },
    },
    {
      title: '중요 단어 10. inflammation',
      word: { en: 'inflammation', ko: '염증', pron: '인플라메이션' },
    },
    {
      title: '중요 단어 11. immune reaction',
      word: { en: 'immune reaction', ko: '면역 반응', pron: '이뮨 리액션' },
    },
    {
      title: '중요 단어 12. watery',
      word: { en: 'watery', ko: '물 같은, 수분이 많은', pron: '워터리' },
    },
    {
      title: '중요 단어 13. bloating',
      word: { en: 'bloating', ko: '복부 팽만, 부어오름', pron: '블로팅' },
    },
    {
      title: '중요 단어 14. relapsing',
      word: { en: 'relapsing', ko: '재발하는, 반복되는', pron: '릴랩싱' },
    },
    {
      title: '중요 단어 15. stool test',
      word: { en: 'stool test', ko: '대변 검사', pron: '스툴 테스트' },
    },
    {
      title: '중요 단어 16. detect',
      word: { en: 'detect', ko: '감지하다, 찾아내다', pron: '디텍트' },
    },
    {
      title: '중요 단어 17. molecular test',
      word: { en: 'molecular test', ko: '분자 검사', pron: '몰레큘러 테스트' },
    },
    {
      title: '중요 단어 18. complication',
      word: { en: 'complication', ko: '합병증', pron: '컴플리케이션' },
    },
  ],

  source: {
    text: 'WSJ | Cyclosporiasis: Symptoms, Treatment, Diagnosis',
    url: 'https://www.wsj.com/health/wellness/cyclosporiasis-symptoms-treatment-diagnosis-a7885dff?mod=hp_lista_pos1',
  },

  youtube: 'https://youtube.com/shorts/nkCoJez_JuQ',
};
// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
