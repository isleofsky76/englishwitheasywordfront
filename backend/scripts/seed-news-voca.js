/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ] 연준이 더 높은 금리를 경고한 이유 | 관세·유가·AI 붐과 인플레이션 압력',
  slug: 'fed-officials-risks-higher-rates-inflation-wsj',
  metaDescription:
  '연준 관계자들이 노동시장, 관세, 유가, AI 붐이 인플레이션에 미칠 위험을 지적하며 더 높은 금리가 필요할 수 있다고 경고했습니다. 이 글에서는 dilemma, instinct, imprint 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_fed_officials_risks_higher_rates_inflation_wsj',
  datePublished: '2026-07-09',
  
  intro: [
  '기사는 노동시장이 인플레이션을 뚜렷하게 낮추지 못하는 가운데, 관세와 유가, AI 붐이 겹치며 물가와 임금 결정 방식에 더 오래 남는 영향을 줄 수 있다는 연준의 우려를 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. dilemma',
  word: { en: 'dilemma', ko: '딜레마, 어려운 선택 상황', pron: '딜레마' },
  example: {
  en: "The Fed faces a dilemma: While the labor market isn't an obvious source of inflationary pressure, it's also not clearly helping to pull inflation down.",
  ko: '연준은 딜레마에 직면해 있습니다. 노동 시장이 물가 상승 압력의 명백한 원인은 아니지만, 그것이 인플레이션을 끌어내리는 데 확실하게 기여하고 있는 것도 아닙니다.',
  },
  phrases: [
  { en: 'The Fed', ko: '연준은' },
  { en: 'faces a dilemma', ko: '딜레마에 직면해 있습니다' },
  { en: "While the labor market isn't", ko: '노동 시장이 ~은 아니지만' },
  { en: 'an obvious source of inflationary pressure', ko: '물가 상승 압력의 명백한 원인' },
  { en: "it's also not clearly helping", ko: '그것이 또한 확실하게 기여하고 있는 것도 아닙니다' },
  { en: 'to pull inflation down', ko: '인플레이션을 끌어내리는 데' },
  ],
  },
  {
  title: '중요 단어 2. instinct',
  word: { en: 'instinct', ko: '본능, 직감, 습성', pron: '인스팅트' },
  example: {
  en: 'Tariffs, then oil, and now the AI boom have hit in overlapping waves, each testing the central-bank instinct to look past a one-time price jump.',
  ko: '관세, 그다음 유가, 그리고 이제는 AI 붐이 겹겹이 밀려오는 파도처럼 타격을 주면서, 일시적인 물가 상승을 간과하려는 중앙은행의 본능을 각각 시험하고 있습니다.',
  },
  phrases: [
  { en: 'Tariffs, then oil, and now the AI boom', ko: '관세, 그다음 유가, 그리고 이제는 AI 붐이' },
  { en: 'have hit', ko: '타격을 주고 있습니다' },
  { en: 'in overlapping waves', ko: '겹겹이 밀려오는 파도처럼' },
  { en: 'each testing', ko: '각각 시험하면서' },
  { en: 'the central-bank instinct', ko: '중앙은행의 본능을' },
  { en: 'to look past a one-time price jump', ko: '일시적인 물가 상승을 간과하려는' },
  ],
  },
  {
  title: '중요 단어 3. imprint',
  word: { en: 'imprint', ko: '흔적, 영향, 각인', pron: '임프린트' },
  example: {
  en: 'They are raising concerns that, stacked together, they leave a more lasting imprint on how households and businesses set wages and prices.',
  ko: '그것들은 한데 쌓이면 가계와 기업이 임금과 가격을 책정하는 방식에 더 지속적인 영향을 미칠 수 있다는 우려를 키우고 있습니다.',
  },
  phrases: [
  { en: 'They', ko: '그것들은' },
  { en: 'are raising concerns', ko: '우려를 키우고 있습니다' },
  { en: 'that, stacked together', ko: '한데 쌓이면' },
  { en: 'they leave', ko: '그것들이 남긴다는' },
  { en: 'a more lasting imprint', ko: '더 지속적인 영향을' },
  { en: 'on how households and businesses set wages and prices', ko: '가계와 기업이 임금과 가격을 책정하는 방식에' },
  ],
  },
  ],
  
  source: {
  text: 'WSJ | Fed Officials Flagged Risks That Would Warrant Higher Rates',
  url: 'https://www.wsj.com/economy/central-banking/fed-officials-flagged-risks-that-would-warrant-higher-rates-6f584cba?mod=lead_feature_below_a_pos3',
  },
  
  youtube: 'https://youtube.com/shorts/T88YmzKltv4',
  };

  
// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
