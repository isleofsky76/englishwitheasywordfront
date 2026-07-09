/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 트럼프, 이란 휴전 종료 선언 | 해상 봉쇄와 전면전 가능성',
  slug: 'trump-iran-ceasefire-over-naval-blockade-wsj',
  metaDescription:
  '트럼프 대통령이 이란과의 휴전이 끝났다고 밝히며 해상 봉쇄 재개와 경제적 압박 강화를 언급했습니다. 이 글에서는 scum, reimpose, full-blown 세 가지 핵심 영어 표현을 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_trump_iran_ceasefire_over_naval_blockade_wsj',
  datePublished: '2026-07-08',
  
  intro: [
  '기사는 트럼프 대통령이 이란과의 휴전이 끝났다고 말하며 해상 봉쇄 재개와 민간 기반 시설 타격 가능성을 언급했지만, 전면전으로 돌아갈 가능성은 낮다고 본다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. scum',
  word: { en: 'scum', ko: '인간쓰레기, 비열한 사람들', pron: '스컴' },
  example: {
  en: 'He called Iran’s leaders "scum," "liars," and "vicious, violent people."',
  ko: '그는 이란의 지도자들을 “쓰레기”, “거짓말쟁이들”, 그리고 “잔인하고 폭력적인 사람들”이라고 불렀습니다.',
  },
  phrases: [
  { en: 'He', ko: '그는' },
  { en: 'called Iran’s leaders', ko: '이란의 지도자들을 ~라고 불렀습니다' },
  { en: '"scum,"', ko: '“쓰레기”' },
  { en: '"liars,"', ko: '“거짓말쟁이들”' },
  { en: 'and "vicious, violent people"', ko: '그리고 “잔인하고 폭력적인 사람들”이라고' },
  ],
  },
  {
  title: '중요 단어 2. reimpose',
  word: { en: 'reimpose', ko: '다시 부과하다, 재도입하다', pron: '리임포즈' },
  example: {
  en: 'Trump said he was considering reimposing a naval blockade on Iran to ramp up economic pressure and raised the prospect of targeting civilian infrastructure such as electricity and desalination plants.',
  ko: '트럼프는 경제적 압박을 강화하기 위해 이란에 대한 해상 봉쇄를 다시 도입하는 것을 고려하고 있다고 말했으며, 전력 시설과 담수화 시설과 같은 민간 기반 시설을 표적으로 삼을 가능성도 제기했습니다.',
  },
  phrases: [
  { en: 'Trump said', ko: '트럼프는 말했습니다' },
  { en: 'he was considering reimposing', ko: '그가 다시 도입하는 것을 고려하고 있다고' },
  { en: 'a naval blockade on Iran', ko: '이란에 대한 해상 봉쇄를' },
  { en: 'to ramp up economic pressure', ko: '경제적 압박을 강화하기 위해' },
  { en: 'and raised the prospect', ko: '그리고 가능성을 제기했습니다' },
  { en: 'of targeting civilian infrastructure', ko: '민간 기반 시설을 표적으로 삼는' },
  { en: 'such as electricity and desalination plants', ko: '전력 시설과 담수화 시설과 같은' },
  ],
  },
  {
  title: '중요 표현 3. full-blown',
  word: { en: 'full-blown', ko: '전면적인, 본격적인', pron: '풀 블로운' },
  example: {
  en: "But later, he said he didn't think a return to full-blown war was likely.",
  ko: '하지만 나중에 그는 전면전으로 다시 돌아갈 가능성은 낮다고 생각한다고 말했습니다.',
  },
  phrases: [
  { en: 'But later', ko: '하지만 나중에' },
  { en: 'he said', ko: '그는 말했습니다' },
  { en: "he didn't think", ko: '그는 생각하지 않는다고' },
  { en: 'a return', ko: '복귀가' },
  { en: 'to full-blown war', ko: '전면전으로의' },
  { en: 'was likely', ko: '가능성이 높다고' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | Trump Says Ceasefire With Iran Is Over After Latest Attacks | By Robbie Gramer, Brian Schwartz and Jared Malsin',
  url: 'https://www.wsj.com/world/trump-says-ceasefire-with-iran-is-over-6cf9675e?mod=hp_trendingnow_article_pos3',
  },
  
  youtube: 'https://youtube.com/shorts/9KxY7BNiWKw',
  };

// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
