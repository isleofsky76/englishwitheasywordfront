/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[WSJ] 돌이킬 수 없다 - 유럽과 미국의 결별에 얽힌 내막',
  slug: 'europe-rupture-with-america-flattery-diplomacy-wsj',
  metaDescription:
  '유럽 정상들이 트럼프 행정부의 관세, 그린란드 위협, NATO 압박 속에서 미국과의 관계를 다시 고민하고 있습니다. 이 글에서는 placate, pithy, splinter 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_europe_rupture_with_america_flattery_diplomacy_wsj',
  datePublished: '2026-07-05',
  
  intro: [
  '기사는 유럽 정상들이 트럼프 행정부의 관세, 그린란드 위협, NATO 방위비 압박을 겪으며 미국에 대한 의존을 줄이고 독자적인 안보·기술·외교 전략을 모색하게 됐다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. placate',
  word: { en: 'placate', ko: '달래다, 진정시키다', pron: '플러케이트' },
  example: {
  en: 'For a year, America’s closest allies had tried to placate Trump with a mix of flattery and concessions on mutual-defense and trade issues, hoping to buy time.',
  ko: '1년 동안 미국의 가장 가까운 동맹국들은 시간을 벌기를 바라며, 상호 방위 및 무역 문제에서 아첨과 양보를 섞어 트럼프를 달래려고 노력해 왔습니다.',
  },
  phrases: [
  { en: 'For a year', ko: '1년 동안' },
  { en: 'America’s closest allies', ko: '미국의 가장 가까운 동맹국들은' },
  { en: 'had tried to placate Trump', ko: '트럼프를 달래려고 노력해 왔습니다' },
  { en: 'with a mix of flattery and concessions', ko: '아첨과 양보를 섞어서' },
  { en: 'on mutual-defense and trade issues', ko: '상호 방위 및 무역 문제에서' },
  { en: 'hoping to buy time', ko: '시간을 벌기를 바라며' },
  ],
  },
  {
  title: '중요 단어 2. pithy',
  word: { en: 'pithy', ko: '간결하면서 핵심을 찌르는', pron: '피씨' },
  example: {
  en: 'Over lunch, Rutte offered a pithy proposal that would become his go-to strategy: Give Trump a win.',
  ko: '점심 식사를 하며 뤼터는 자신의 핵심 전략이 될 간결한 제안을 내놓았습니다. 트럼프에게 승리를 안겨주라는 것이었습니다.',
  },
  phrases: [
  { en: 'Over lunch', ko: '점심 식사를 하며' },
  { en: 'Rutte', ko: '뤼터는' },
  { en: 'offered', ko: '내놓았습니다' },
  { en: 'a pithy proposal', ko: '간결한 제안을' },
  { en: 'that would become', ko: '~이 될' },
  { en: 'his go-to strategy', ko: '그의 핵심 전략이' },
  { en: 'Give Trump a win', ko: '트럼프에게 승리를 안겨주라는 것' },
  ],
  },
  {
  title: '중요 단어 3. splinter',
  word: { en: 'splinter', ko: '갈라지다, 분열되다', pron: '스플린터' },
  example: {
  en: 'The fragile consensus on flattery was starting to splinter, a trend captured by Britain’s MI6.',
  ko: '아첨을 둘러싼 취약한 합의는 분열되기 시작했고, 영국 비밀정보부 MI6도 이러한 흐름을 포착했습니다.',
  },
  phrases: [
  { en: 'The fragile consensus', ko: '취약한 합의는' },
  { en: 'on flattery', ko: '아첨을 둘러싼' },
  { en: 'was starting to splinter', ko: '분열되기 시작했습니다' },
  { en: 'a trend', ko: '그 흐름은' },
  { en: 'captured by Britain’s MI6', ko: '영국 MI6에 의해 포착된' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | ‘There Is No Going Back’: The Inside Story of Europe’s Rupture With America | By Joe Parkinson, Drew Hinshaw and Daniel Michaels',
  url: 'https://www.wsj.com/world/europe/european-rupture-with-america-e3a9bb3c?mod=hp_lead_pos1',
  },
  
  youtube: 'https://youtube.com/shorts/SXaeW4wfkCc',
  };



// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
