/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 영국 시골을 탈출한 카피바라 | 삼바를 찾는 지역 주민들',
  slug: 'capybara-on-the-lam-english-countryside-wsj',
  metaDescription:
  '영국 햄프셔의 동물원에서 카피바라 삼바가 탈출하면서 지역 주민, 드론 조종사, 학생들까지 수색에 참여하고 있습니다. 이 글에서는 shimmy, loose, dragnet 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_capybara_on_the_lam_english_countryside_wsj',
  datePublished: '2026-07-14',
  
  intro: [
  '기사는 영국 햄프셔의 마웰 동물원에서 어린 카피바라 삼바가 울타리 틈으로 탈출한 뒤, 지역 주민들과 드론 조종사, 학교, 공항까지 수색에 참여하며 화제가 되고 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. shimmy',
  word: { en: 'shimmy', ko: '몸을 흔들며 움직이다, 비집고 빠져나가다', pron: '쉬미' },
  example: {
  en: 'Her name was Samba, and she was a 9-month-old capybara who five days earlier had shimmied out of a small gap in her fence at the local Marwell Zoo.',
  ko: '그녀의 이름은 삼바였고, 그녀는 생후 9개월 된 카피바라였으며, 닷새 전 지역의 마웰 동물원에서 울타리에 난 작은 틈으로 몸을 흔들어 빠져나갔습니다.',
  },
  phrases: [
  { en: 'Her name was Samba', ko: '그녀의 이름은 삼바였습니다' },
  { en: 'and she was a 9-month-old capybara', ko: '그리고 그녀는 생후 9개월 된 카피바라였습니다' },
  { en: 'who five days earlier', ko: '닷새 전에' },
  { en: 'had shimmied out of', ko: '몸을 흔들어 빠져나갔던' },
  { en: 'a small gap', ko: '작은 틈으로' },
  { en: 'in her fence', ko: '그녀의 울타리에 난' },
  { en: 'at the local Marwell Zoo', ko: '지역의 마웰 동물원에서' },
  ],
  },
  {
  title: '중요 단어 2. loose',
  word: { en: 'loose', ko: '풀려난, 잡히지 않은, 자유롭게 돌아다니는', pron: '루스' },
  example: {
  en: 'While zookeepers immediately found and recaptured Tango, Samba is still on the loose.',
  ko: '동물원 사육사들이 탱고를 즉시 찾아 다시 붙잡았지만, 삼바는 아직 잡히지 않고 돌아다니고 있습니다.',
  },
  phrases: [
  { en: 'While zookeepers', ko: '동물원 사육사들이 ~했지만' },
  { en: 'immediately found', ko: '즉시 찾아냈고' },
  { en: 'and recaptured Tango', ko: '탱고를 다시 붙잡았지만' },
  { en: 'Samba is still', ko: '삼바는 아직도 ~입니다' },
  { en: 'on the loose', ko: '잡히지 않고 돌아다니는 상태입니다' },
  ],
  },
  {
  title: '중요 단어 3. dragnet',
  word: { en: 'dragnet', ko: '대대적인 수색망, 포위 수사망', pron: '드래그넷' },
  example: {
  en: 'Paddick and her children, Sid and Minnie, are among thousands of Hampshire residents caught up in the dragnet.',
  ko: '패딕과 그녀의 아이들인 시드와 미니는 그 수색망에 휘말린 수천 명의 햄프셔 주민들 가운데 있습니다.',
  },
  phrases: [
  { en: 'Paddick and her children', ko: '패딕과 그녀의 아이들은' },
  { en: 'Sid and Minnie', ko: '시드와 미니인' },
  { en: 'are among thousands of Hampshire residents', ko: '수천 명의 햄프셔 주민들 가운데 있습니다' },
  { en: 'caught up in', ko: '휘말린' },
  { en: 'the dragnet', ko: '그 대대적인 수색망에' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | A Capybara Is on the Lam in the English Countryside, and Locals Are Going Wild | By Julia Amann',
  url: 'https://www.wsj.com/world/uk/a-capybara-is-on-the-lam-in-the-english-countryside-and-locals-are-going-wild-51da31e2',
  },
  
  youtube: 'https://youtube.com/shorts/AYPfBGqY2as',
  };

// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
