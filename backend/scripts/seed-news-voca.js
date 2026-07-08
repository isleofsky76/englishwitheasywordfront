/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[BBC] 프랑스 사람들이 창문에 분필을 칠하는 이유 | 폭염을 막는 저기술 냉방법',
  slug: 'french-painting-windows-with-chalk-to-beat-heat-bbc',
  metaDescription:
  '프랑스에서 기록적인 폭염이 이어지자 사람들이 창문에 분필 가루를 칠해 열을 반사하는 저기술 냉방법을 사용하고 있습니다. 이 글에서는 sweep, coating, radiation 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_french_painting_windows_with_chalk_to_beat_heat_bbc',
  datePublished: '2026-06-26',
  
  intro: [
  '기사는 프랑스에서 기록적인 폭염이 이어지면서 사람들이 물에 섞은 분필 가루를 창문에 칠해 빛은 일부 들이고 열은 반사하는 저렴한 냉방 방법을 활용하고 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. sweep',
  word: { en: 'sweep', ko: '휩쓸다, 빠르게 퍼지다', pron: '스윕' },
  example: {
  en: 'As record-breaking heat sweeps over France, some shops are running out of crushed chalk.',
  ko: '기록적인 폭염이 프랑스를 휩쓸면서, 일부 상점들은 분필 가루가 바닥나고 있습니다.',
  },
  phrases: [
  { en: 'As record-breaking heat', ko: '기록적인 폭염이' },
  { en: 'sweeps over France', ko: '프랑스를 휩쓸면서' },
  { en: 'some shops', ko: '일부 상점들은' },
  { en: 'are running out of', ko: '바닥나고 있습니다' },
  { en: 'crushed chalk', ko: '분필 가루가' },
  ],
  },
  {
  title: '중요 단어 2. coating',
  word: { en: 'coating', ko: '코팅, 얇게 덮은 막', pron: '코팅' },
  example: {
  en: 'Mixed with water, then painted on glass, the result is a milky, whitish coating that lets in some light but reflects the heat.',
  ko: '물과 섞은 뒤 유리에 칠하면, 그 결과물은 약간의 빛은 들여보내지만 열은 반사하는 우윳빛의 희끄무레한 코팅이 됩니다.',
  },
  phrases: [
  { en: 'Mixed with water', ko: '물과 섞인 뒤' },
  { en: 'then painted on glass', ko: '그다음 유리에 칠해지면' },
  { en: 'the result is', ko: '그 결과물은 ~입니다' },
  { en: 'a milky, whitish coating', ko: '우윳빛의 희끄무레한 코팅' },
  { en: 'that lets in some light', ko: '약간의 빛은 들여보내지만' },
  { en: 'but reflects the heat', ko: '열은 반사하는' },
  ],
  },
  {
  title: '중요 단어 3. radiation',
  word: { en: 'radiation', ko: '복사, 방사선, 방사 에너지', pron: '레이디에이션' },
  example: {
  en: 'Calcium carbonate is not only highly reflective but also resistant to solar radiation.',
  ko: '탄산칼슘은 반사율이 매우 높을 뿐만 아니라 태양 복사에도 강합니다.',
  },
  phrases: [
  { en: 'Calcium carbonate', ko: '탄산칼슘은' },
  { en: 'is not only', ko: '~일 뿐만 아니라' },
  { en: 'highly reflective', ko: '반사율이 매우 높고' },
  { en: 'but also resistant', ko: '또한 강합니다' },
  { en: 'to solar radiation', ko: '태양 복사에' },
  ],
  },
  ],
  
  source: {
  text: 'BBC | Why the French are painting their windows with chalk to beat the heat | By Sophie Hardach',
  url: 'https://www.bbc.com/future/article/20260625-why-the-french-are-painting-chalk-on-their-windows',
  },
  
  youtube: 'https://youtube.com/shorts/L8_o42iBetE',
  };



// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
