/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 백악관의 월드컵 레드카드 뒤집기 | 발로건 징계 취소와 FIFA 논란',
  slug: 'white-house-fifa-balogun-red-card-world-cup-wsj',
  metaDescription:
  '미국 대표팀 공격수 폴라린 발로건의 월드컵 1경기 출전 정지 징계가 FIFA에 의해 취소되면서, 백악관 개입과 스포츠 판정 독립성을 둘러싼 논란이 커졌습니다. 이 글에서는 rescind, controversial, urge 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_white_house_fifa_balogun_red_card_world_cup_wsj',
  datePublished: '2026-07-05',
  
  intro: [
  '기사는 미국 대표팀 공격수 폴라린 발로건의 월드컵 레드카드 징계가 트럼프 행정부의 대응과 FIFA 회장과의 통화 이후 취소되면서, 스포츠 판정에 대한 정치적 개입 논란이 커졌다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. rescind',
  word: { en: 'rescind', ko: '취소하다, 철회하다', pron: '리신드' },
  example: {
  en: 'The decision by FIFA to rescind U.S. striker Folarin Balogun’s one-game suspension followed a rapid response from the Trump administration.',
  ko: '미국 대표팀 공격수 폴라린 발로건의 1경기 출전 정지 징계를 취소한 FIFA의 결정은 트럼프 행정부의 신속한 대응 이후 내려졌습니다.',
  },
  phrases: [
  { en: 'The decision by FIFA', ko: 'FIFA의 결정은' },
  { en: 'to rescind', ko: '취소한' },
  { en: 'U.S. striker Folarin Balogun’s one-game suspension', ko: '미국 대표팀 공격수 폴라린 발로건의 1경기 출전 정지 징계를' },
  { en: 'followed', ko: '~이후 내려졌습니다' },
  { en: 'a rapid response', ko: '신속한 대응' },
  { en: 'from the Trump administration', ko: '트럼프 행정부의' },
  ],
  },
  {
  title: '중요 단어 2. controversial',
  word: { en: 'controversial', ko: '논란의 여지가 있는', pron: '칸트러버셜' },
  example: {
  en: 'Striker Folarin Balogun received a controversial red card during the U.S. team’s victory.',
  ko: '공격수 폴라린 발로건은 미국팀이 승리한 경기 중 논란의 여지가 있는 레드카드를 받았습니다.',
  },
  phrases: [
  { en: 'Striker Folarin Balogun', ko: '공격수 폴라린 발로건은' },
  { en: 'received', ko: '받았습니다' },
  { en: 'a controversial red card', ko: '논란의 여지가 있는 레드카드를' },
  { en: 'during the U.S. team’s victory', ko: '미국팀이 승리한 경기 중에' },
  ],
  },
  {
  title: '중요 단어 3. urge',
  word: { en: 'urge', ko: '촉구하다, 강하게 권하다', pron: '어지' },
  example: {
  en: 'Trump picked up the phone to FIFA president Gianni Infantino and urged him to review the Balogun call.',
  ko: '트럼프 대통령은 FIFA 회장 잔니 인판티노에게 전화를 걸어 발로건에게 내려진 판정을 재검토해 달라고 촉구했습니다.',
  },
  phrases: [
  { en: 'Trump', ko: '트럼프 대통령은' },
  { en: 'picked up the phone', ko: '전화를 걸었습니다' },
  { en: 'to FIFA president Gianni Infantino', ko: 'FIFA 회장 잔니 인판티노에게' },
  { en: 'and urged him', ko: '그리고 그에게 촉구했습니다' },
  { en: 'to review', ko: '재검토하라고' },
  { en: 'the Balogun call', ko: '발로건에게 내려진 판정을' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | Inside the White House Campaign to Overturn a World Cup Red Card | By Brian Schwartz, Natalie Andrews and Joshua Robinson',
  url: 'https://www.wsj.com/sports/soccer/white-house-fifa-balogun-red-card-world-cup-46276fc8?mod=hp_lead_pos7',
  },
  
  youtube: 'https://youtube.com/shorts/7CiwWE6vcfc',
  };

// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
