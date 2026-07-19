/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 랍스터 보트로 보는 메인주 해안 | 크루즈가 놓치는 진짜 풍경',
  slug: 'lobster-boat-best-way-see-maine-coast-wsj',
  metaDescription:
  '메인주의 해안은 대형 크루즈선보다 현지인이 운항하는 작은 배를 타고 해수면 가까이에서 볼 때 더 깊이 경험할 수 있습니다. 이 글에서는 draft, aboard, glimpse 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_lobster_boat_best_way_see_maine_coast_wsj',
  datePublished: '2026-07-15',
  
  intro: [
  '기사는 메인주의 울퉁불퉁한 해안과 작은 섬, 외딴 지역의 삶은 대형 크루즈선보다 현지인이 운항하는 작은 배를 타고 해수면 가까이에서 볼 때 더 잘 경험할 수 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. draft',
  word: { en: 'draft', ko: '배의 흘수, 물에 잠긴 선체의 깊이', pron: '드래프트' },
  example: {
  en: 'Cruise travelers visiting Maine might not realize that when their deep-drafted ships steer clear of the craggy shoreline, they avoid more than hidden hazards — they also miss much of what’s special.',
  ko: '메인주를 방문하는 크루즈 여행객들은, 그들이 탄 흘수가 깊은 대형 선박이 울퉁불퉁한 해안선을 피할 때, 숨겨진 위험 요소만 피하는 것이 아니라 특별한 것의 상당 부분도 놓친다는 사실을 깨닫지 못할 수도 있습니다.',
  },
  phrases: [
  { en: 'Cruise travelers visiting Maine', ko: '메인주를 방문하는 크루즈 여행객들은' },
  { en: 'might not realize', ko: '깨닫지 못할 수도 있습니다' },
  { en: 'that when their deep-drafted ships', ko: '그들이 탄 흘수가 깊은 대형 선박이 ~할 때' },
  { en: 'steer clear of the craggy shoreline', ko: '울퉁불퉁한 해안선을 피할 때' },
  { en: 'they avoid more than hidden hazards', ko: '그들은 숨겨진 위험 요소만 피하는 것이 아니라' },
  { en: 'they also miss much of what’s special', ko: '특별한 것의 상당 부분도 놓칩니다' },
  ],
  },
  {
  title: '중요 단어 2. aboard',
  word: { en: 'aboard', ko: '탄, 탑승한, 승선한', pron: '어보드' },
  example: {
  en: 'The state’s coast is best experienced at sea level, aboard smaller boats run by locals rather than from behind the glass of a luxury liner.',
  ko: '메인주의 해안은 호화 여객선의 유리창 너머에서가 아니라, 현지인들이 운항하는 작은 배에 올라타 해수면 높이에서 경험할 때 가장 진가를 느낄 수 있습니다.',
  },
  phrases: [
  { en: 'The state’s coast', ko: '그 주의 해안은' },
  { en: 'is best experienced', ko: '가장 잘 경험됩니다' },
  { en: 'at sea level', ko: '해수면 높이에서' },
  { en: 'aboard smaller boats', ko: '작은 배에 올라타' },
  { en: 'run by locals', ko: '현지인들이 운항하는' },
  { en: 'rather than from behind the glass', ko: '유리창 너머에서가 아니라' },
  { en: 'of a luxury liner', ko: '호화 여객선의' },
  ],
  },
  {
  title: '중요 단어 3. glimpse',
  word: { en: 'glimpse', ko: '잠깐 봄, 흘긋 봄, 엿봄', pron: '글림프스' },
  example: {
  en: 'Joining a mail-boat run offers a glimpse at life in the remote community.',
  ko: '우편선 운항에 참여하면 이 외딴 마을의 삶을 엿볼 수 있습니다.',
  },
  phrases: [
  { en: 'Joining a mail-boat run', ko: '우편선 운항에 참여하는 것은' },
  { en: 'offers', ko: '제공합니다' },
  { en: 'a glimpse', ko: '잠깐 엿볼 기회를' },
  { en: 'at life', ko: '삶을' },
  { en: 'in the remote community', ko: '그 외딴 마을에서의' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | A Trip on a Lobster Boat Is One of the Best Ways to See Maine’s Coast | By Jen Rose Smith',
  url: 'https://www.wsj.com/lifestyle/travel/lobster-boat-mailboat-maine-2a1c0704',
  },
  
  youtube: 'https://youtube.com/shorts/Xcpk2VqGAzA',
  };

// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
