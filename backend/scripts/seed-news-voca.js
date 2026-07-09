/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 메시가 페널티킥에 약한 이유 | 천재성을 제한하는 단 한 번의 터치',
  slug: 'messi-penalty-kicks-argentina-world-cup-wsj',
  metaDescription:
  '리오넬 메시는 역사상 최고의 축구 선수로 평가받지만, 페널티킥에서는 드리블과 방향 전환, 섬세한 터치 같은 장점이 제한됩니다. 이 글에서는 strip, blur, deceive 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_messi_penalty_kicks_argentina_world_cup_wsj',
  datePublished: '2026-07-08',
  
  intro: [
  '기사는 리오넬 메시가 축구 역사상 최고의 선수로 평가받지만, 페널티킥 상황에서는 드리블, 방향 전환, 섬세한 터치 같은 장점이 사라지기 때문에 상대적으로 덜 위협적으로 보일 수 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. strip',
  word: { en: 'strip', ko: '빼앗다, 벗겨 내다, 제거하다', pron: '스트립' },
  example: {
  en: 'The very exercise of the penalty kick strips away many parts of the game where Messi usually flexes his genius.',
  ko: '페널티킥이라는 바로 그 행위 자체는 메시가 평소 자신의 천재성을 발휘하는 경기의 많은 요소를 빼앗아 버립니다.',
  },
  phrases: [
  { en: 'The very exercise', ko: '바로 그 행위 자체는' },
  { en: 'of the penalty kick', ko: '페널티킥이라는' },
  { en: 'strips away', ko: '빼앗아 버립니다' },
  { en: 'many parts of the game', ko: '경기의 많은 요소를' },
  { en: 'where Messi usually flexes his genius', ko: '메시가 평소 자신의 천재성을 발휘하는' },
  ],
  },
  {
  title: '중요 단어 2. blur',
  word: { en: 'blur', ko: '흐릿한 움직임, 흐릿한 형체', pron: '블러' },
  example: {
  en: "There's no dribbling here, no sudden change of direction, or blur of delicate touches.",
  ko: '여기에는 드리블도 없고, 갑작스러운 방향 전환도 없으며, 섬세한 터치로 인한 흐릿한 움직임도 없습니다.',
  },
  phrases: [
  { en: "There's no dribbling here", ko: '여기에는 드리블도 없습니다' },
  { en: 'no sudden change of direction', ko: '갑작스러운 방향 전환도 없습니다' },
  { en: 'or blur', ko: '또는 흐릿한 움직임도 없습니다' },
  { en: 'of delicate touches', ko: '섬세한 터치로 인한' },
  ],
  },
  {
  title: '중요 단어 3. deceive',
  word: { en: 'deceive', ko: '속이다, 기만하다', pron: '디시브' },
  example: {
  en: 'Messi still has a wide array of tricks available to deceive the goalkeeper, but he is distinctly less terrifying when all he can do is touch the ball one time.',
  ko: '메시에게는 골키퍼를 속이는 데 이용할 수 있는 매우 다양한 기술들이 여전히 있지만, 그가 할 수 있는 전부가 공을 한 번 터치하는 것일 때 그는 확실히 덜 위협적입니다.',
  },
  phrases: [
  { en: 'Messi still has', ko: '메시에게는 여전히 있습니다' },
  { en: 'a wide array of tricks', ko: '매우 다양한 기술들이' },
  { en: 'available to deceive the goalkeeper', ko: '골키퍼를 속이는 데 이용할 수 있는' },
  { en: 'but he is distinctly less terrifying', ko: '하지만 그는 확실히 덜 위협적입니다' },
  { en: 'when all he can do', ko: '그가 할 수 있는 전부가' },
  { en: 'is touch the ball one time', ko: '공을 한 번 터치하는 것일 때' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | Lionel Messi Is the Greatest Player Ever. Why Is He So Bad at Penalty Kicks?',
  url: 'https://www.wsj.com/sports/soccer/messi-penalty-kicks-argentina-world-cup-9e29a4aa?mod=hp_listb_pos2',
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
