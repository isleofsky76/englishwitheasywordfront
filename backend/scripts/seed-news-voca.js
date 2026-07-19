/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 동물이 먼저인 갈라파고스 제도 | 이구아나 때문에 멈추는 공항버스',
  slug: 'galapagos-islands-animals-come-first-wsj',
  metaDescription:
  '갈라파고스 제도에서는 토착 동물을 보호하기 위해 교통과 일상 운영까지 조정됩니다. 이 글에서는 companion, incident, endemic 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_galapagos_islands_animals_come_first_wsj',
  datePublished: '2026-07-13',
  
  intro: [
  '기사는 갈라파고스 제도에서 토착 동물을 보호하기 위해 공항버스 운행까지 조정될 정도로 동물 보호가 일상과 교통 시스템에 깊이 반영되어 있다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. companion',
  word: { en: 'companion', ko: '동반자, 함께 가는 사람', pron: '컴패니언' },
  example: {
  en: 'Approaching our hotel’s front desk while on the Galápagos island of Santa Cruz, my travel companion Gidon Ofek and I received some painful news: we needed to leave for our 9 am flight a full three hours early.',
  ko: '갈라파고스 제도 산타크루즈 섬에서 호텔 프런트 데스크에 다가갔을 때, 제 여행 동반자인 기돈 오펙과 저는 다소 고통스러운 소식을 들었습니다. 오전 9시 비행기를 타려면 무려 세 시간이나 일찍 떠나야 한다는 것이었습니다.',
  },
  phrases: [
  { en: 'Approaching our hotel’s front desk', ko: '호텔 프런트 데스크에 다가갔을 때' },
  { en: 'while on the Galápagos island of Santa Cruz', ko: '갈라파고스 제도 산타크루즈 섬에 있는 동안' },
  { en: 'my travel companion Gidon Ofek and I', ko: '제 여행 동반자인 기돈 오펙과 저는' },
  { en: 'received some painful news', ko: '다소 고통스러운 소식을 들었습니다' },
  { en: 'we needed to leave', ko: '우리가 떠나야 한다는 것이었습니다' },
  { en: 'for our 9 am flight', ko: '오전 9시 비행기를 위해' },
  { en: 'a full three hours early', ko: '무려 세 시간이나 일찍' },
  ],
  },
  {
  title: '중요 단어 2. incident',
  word: { en: 'incident', ko: '사건, 사고', pron: '인시던트' },
  example: {
  en: 'The receptionist gently explained the delay: There was one less bus running due to an incident involving a run-over iguana.',
  ko: '접수 담당자는 지연 이유를 부드럽게 설명했습니다. 차에 치인 이구아나와 관련된 사고 때문에 운행하는 버스가 한 대 줄었다는 것이었습니다.',
  },
  phrases: [
  { en: 'The receptionist', ko: '접수 담당자는' },
  { en: 'gently explained', ko: '부드럽게 설명했습니다' },
  { en: 'the delay', ko: '지연 이유를' },
  { en: 'There was one less bus running', ko: '운행하는 버스가 한 대 줄었습니다' },
  { en: 'due to an incident', ko: '한 사고 때문에' },
  { en: 'involving a run-over iguana', ko: '차에 치인 이구아나와 관련된' },
  ],
  },
  {
  title: '중요 단어 3. endemic',
  word: { en: 'endemic', ko: '특정 지역 고유의, 토착의', pron: '엔데믹' },
  example: {
  en: 'Under the islands’ penal code, a single fender-bender with an endemic animal can carry severe consequences.',
  ko: '이 섬들의 형법에 따르면, 토착 동물과 단 한 번의 가벼운 접촉 사고만 내도 심각한 결과를 초래할 수 있습니다.',
  },
  phrases: [
  { en: 'Under the islands’ penal code', ko: '이 섬들의 형법에 따르면' },
  { en: 'a single fender-bender', ko: '단 한 번의 가벼운 접촉 사고도' },
  { en: 'with an endemic animal', ko: '토착 동물과의' },
  { en: 'can carry', ko: '초래할 수 있습니다' },
  { en: 'severe consequences', ko: '심각한 결과를' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | The Islands Where Animals Always Come First | By Jenna Belhumeur',
  url: 'https://www.wsj.com/lifestyle/travel/galapagos-islands-animals-constitution-ecuador-2e2be959',
  },
  
  youtube: 'https://youtube.com/shorts/dVlmAFLq2og',
  };

// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
