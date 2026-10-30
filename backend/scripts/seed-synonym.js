/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '르네상스 · 청동 예술 #연관단어',

  slug: 'roundel-candelabra-drapery-alloy-relief-related-words',

  metaDescription:
    '르네상스 청동 예술 연관단어. roundel, candelabra, drapery, alloy, relief, recline, slender, modulate, palpable, chiaroscuro, sumptuous.',

  password: 'seed_synonym_roundel-candelabra-drapery-alloy-relief',

  datePublished: '2026-10-28',

  intro: [
    '르네상스 · 청동 예술 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      title: '1. 원형 부조, 원형 장식물',
      narrative: ['**roundel**(ˈraʊndl / 라운들)'],
    },
    {
      title: '2. 여러 갈래의 촛대',
      narrative: ['**candelabra**(ˌkændəˈlɑːbrə / 캔들라브라)'],
    },
    {
      title: '3. 옷자락, 옷이나 천의 주름 표현',
      narrative: ['**drapery**(ˈdreɪpəri / 드레이퍼리)'],
    },
    {
      title: '4. 합금',
      narrative: ['**alloy**(ˈælɔɪ / 앨로이)'],
    },
    {
      title: '5. 부조, 돋을새김',
      narrative: ['**relief**(rɪˈliːf / 릴리프)'],
    },
    {
      title: '6. 몸을 기대거나 누워 있는',
      narrative: ['**recline**(rɪˈklaɪn / 리클라인)'],
    },
    {
      title: '7. 가늘고 호리호리한',
      narrative: ['**slender**(ˈslendər / 슬렌더)'],
    },
    {
      title: '8. 미묘하게 조절하다, 조형하다',
      narrative: ['**modulate**(ˈmɑːdʒəleɪt / 마줄레이트)'],
    },
    {
      title: '9. 손에 만져질 듯한, 생생하게 느껴지는',
      narrative: ['**palpable**(ˈpælpəbl / 펄퍼블)'],
    },
    {
      title: '10. 명암법, 명암 대조법',
      narrative: ['**chiaroscuro**(kiˌɑːrəˈskʊəroʊ / 키아로스쿠로)'],
    },
    {
      title: '11. 호화로운, 눈부시게 화려한',
      narrative: ['**sumptuous**(ˈsʌmptʃuəs / 섬추어스)'],
    },
  ],

  wordMeta: [
    { num: 1, expression: 'roundel', meaning: '원형 부조, 원형 장식물', exampleEn: 'roundels of half-length saints', exampleKo: '성인들의 반신상을 담은 원형 부조들' },
    { num: 2, expression: 'candelabra', meaning: '여러 갈래의 촛대', exampleEn: 'candelabra, bells and the like', exampleKo: '여러 갈래 촛대, 종 등' },
    { num: 3, expression: 'drapery', meaning: '옷자락, 옷이나 천의 주름 표현', exampleEn: 'the windblown drapery of Minerva and Juno', exampleKo: '바람에 날리는 미네르바와 유노의 옷자락' },
    { num: 4, expression: 'alloy', meaning: '합금', exampleEn: 'the expensive, technically demanding alloy', exampleKo: '값비싸고 기술적으로 다루기 까다로운 합금' },
    { num: 5, expression: 'relief', meaning: '부조, 돋을새김', exampleEn: 'The exhibition’s compelling reliefs', exampleKo: '전시의 매력적인 부조 작품들' },
    { num: 6, expression: 'recline', meaning: '몸을 기대거나 누워 있는', exampleEn: 'a three-dimensional reclining figure', exampleKo: '누워 있는 입체 인물상' },
    { num: 7, expression: 'slender', meaning: '가늘고 호리호리한', exampleEn: 'a slender Jesus', exampleKo: '호리호리한 예수상' },
    { num: 8, expression: 'modulate', meaning: '미묘하게 조절하다, 조형하다', exampleEn: 'an exquisitely modulated', exampleKo: '더없이 정교하게 조형된' },
    { num: 9, expression: 'palpable', meaning: '손에 만져질 듯한, 생생하게 느껴지는', exampleEn: 'making palpable the air', exampleKo: '공기까지 실감 나게 표현하며' },
    { num: 10, expression: 'chiaroscuro', meaning: '명암법, 명암 대조법', exampleEn: 'Leonardo da Vinci’s chiaroscuro', exampleKo: '레오나르도 다빈치의 명암법' },
    { num: 11, expression: 'sumptuous', meaning: '호화로운, 눈부시게 화려한', exampleEn: 'visually sumptuous and exhilarating', exampleKo: '시각적으로 화려하고 짜릿한 감동을 주는' },
  ],

  source: {
    text: 'The Wall Street Journal | ‘Siena: The Art of Bronze, 1450-1500’ Review: Magic in Metal | By Karen Wilkin | Oct. 28, 2026',
    url: 'https://www.wsj.com/arts-culture/fine-art/siena-the-art-of-bronze-1450-1500-review-magic-in-metal-afd37602?mod=arts-culture_lead_story',
  },

  youtube: 'https://www.youtube.com/shorts/9H0hqxyuO04',
  videoId: '9H0hqxyuO04',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
