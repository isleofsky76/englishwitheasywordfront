/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[BBC] 카보베르데, 월드컵이 잊지 못할 언더독 | 아르헨티나전 3-2 석패와 감동의 여정',
  slug: 'farewell-cape-verde-world-cup-underdogs-bbc',
  metaDescription:
  '카보베르데는 월드컵의 작은 나라였지만 스페인, 우루과이, 아르헨티나를 상대로 강한 인상을 남기며 전 세계 축구팬들의 마음을 사로잡았습니다. 이 글에서는 underdog, unwavering, Herculean 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_farewell_cape_verde_world_cup_underdogs_bbc',
  datePublished: '2026-07-04',
  
  intro: [
  '기사는 카보베르데가 아르헨티나에 3-2로 패해 월드컵 여정을 마쳤지만, 스페인전 무승부와 우루과이전 득점, 아르헨티나전 투혼을 통해 2026 월드컵에서 가장 인상적인 언더독 이야기로 남았다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. underdog',
  word: { en: 'underdog', ko: '약팀, 이길 가능성이 낮은 팀', pron: '언더도그' },
  example: {
  en: 'Gary Neville called it one of the greatest performances he had ever seen from an underdog.',
  ko: '개리 네빌은 그것을 자신이 본 약팀의 경기 중 가장 위대한 경기력 중 하나라고 말했습니다.',
  },
  phrases: [
  { en: 'Gary Neville', ko: '개리 네빌은' },
  { en: 'called it', ko: '그것을 ~라고 불렀습니다' },
  { en: 'one of the greatest performances', ko: '가장 위대한 경기력 중 하나라고' },
  { en: 'he had ever seen', ko: '그가 지금까지 본' },
  { en: 'from an underdog', ko: '약팀에게서 나온' },
  ],
  },
  {
  title: '중요 단어 2. unwavering',
  word: { en: 'unwavering', ko: '흔들림 없는, 확고한', pron: '언웨이버링' },
  example: {
  en: 'They have shown courage, togetherness, unity and unwavering belief.',
  ko: '그들은 용기, 단결, 통합, 그리고 흔들림 없는 믿음을 보여주었습니다.',
  },
  phrases: [
  { en: 'They', ko: '그들은' },
  { en: 'have shown', ko: '보여주었습니다' },
  { en: 'courage', ko: '용기를' },
  { en: 'togetherness', ko: '함께하는 힘을' },
  { en: 'unity', ko: '단결을' },
  { en: 'and unwavering belief', ko: '그리고 흔들림 없는 믿음을' },
  ],
  },
  {
  title: '중요 단어 3. Herculean',
  word: { en: 'Herculean', ko: '엄청난, 초인적인', pron: '허큘리언' },
  example: {
  en: 'It was a Herculean effort from them.',
  ko: '그것은 그들이 보여준 초인적인 노력이었습니다.',
  },
  phrases: [
  { en: 'It', ko: '그것은' },
  { en: 'was', ko: '~였습니다' },
  { en: 'a Herculean effort', ko: '초인적인 노력' },
  { en: 'from them', ko: '그들에게서 나온' },
  ],
  },
  ],
  
  source: {
  text: 'BBC | Farewell Cape Verde - the underdogs the World Cup will never forget | By Charlotte Coates and Elizabeth Conway',
  url: 'https://www.bbc.com/sport/football/articles/cqj1pd8lqw9o',
  },
  
  };


// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
