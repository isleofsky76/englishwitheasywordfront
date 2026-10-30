/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '중국에서 가장 성공한 애스트로터프 작전: 풀뿌리 축구',

  slug: 'astroturf-steed-charge-fluffed-shot-excruciating-related-words',

  metaDescription:
    'The Economist 기사에서 추출한 시사 영단어. Astroturf, steed, charge, fluffed shot, excruciating, perennially, belt out, clad, penumbra, mar, scalper, wend one’s way.',

  password: 'seed_news_voca_astroturf-steed-charge-fluffed-shot',

  datePublished: '2026-10-26',

  intro: [
    '중국에서 가장 성공한 애스트로터프 작전: 풀뿌리 축구 주제를 다룬 The Economist 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. China’s most successful Astroturf operation: grassroots football (**Astroturf**) / 중국에서 가장 성공한 애스트로터프 작전: 풀뿌리 축구 cf. Astroturf: 인조 잔디; (비유) 가짜 풀뿌리 운동 (명)',
      ],
    },
    {
      narrative: [
        '2. mounted his black steed and charged around a stadium. (**steed**) / 검은 말을 타고 경기장 안을 돌진했다. cf. steed: 말, 준마 (명)',
      ],
    },
    {
      narrative: [
        '3. charged around a stadium. (**charge**) / 경기장 안을 돌진했다. cf. charge: 돌진하다, 돌격하다 (동)',
      ],
    },
    {
      narrative: [
        '4. missed passes, fluffed shots (**fluffed shot**) / 패스 실수, 헛찬 슛 cf. fluffed shot: 실축, 헛찬 슛 (명)',
      ],
    },
    {
      narrative: [
        '5. a goal review that took 11 excruciating minutes. (**excruciating**) / 11분이나 걸린 견디기 힘든 골 판독 cf. excruciating: 극도로 고통스러운, 견디기 힘든 (형)',
      ],
    },
    {
      narrative: [
        '6. China’s perennially inept national team. (**perennially**) / 중국의 늘 무기력한 국가대표팀 cf. perennially: 늘, 만성적으로 (부)',
      ],
    },
    {
      narrative: [
        '7. Superfans gathered early to bang on drums, wave oversized flags and belt out their chants. (**belt out**) / 열성 팬들이 일찍 모여 북을 치고 거대한 깃발을 흔들며 응원가를 목청껏 불렀다. cf. belt out: 목청껏 부르다 (동)',
      ],
    },
    {
      narrative: [
        '8. they were clad in ankle-length Chinese opera-style robes. (**clad**) / 그들은 발목까지 오는 중국 전통극 스타일 도포를 입고 있었다. cf. clad: ~을 입은 (형)',
      ],
    },
    {
      narrative: [
        '9. ...the penumbra of China’s property downturn is visible (**penumbra**) / …중국 부동산 침체의 영향권 가장자리가 보인다 cf. penumbra: 반그림자, 영향권의 가장자리 (명)',
      ],
    },
    {
      narrative: [
        '10. ... marred by match-fixing scandals. (**mar**) / …승부조작 스캔들로 훼손된 cf. mar: 훼손하다, 망치다 (동)',
      ],
    },
    {
      narrative: [
        '11. When scalpers muscled in, authorities introduced facial-recognition turnstiles (**scalper**) / 암표상들이 끼어들자 당국은 안면인식 개찰구를 도입했다 cf. scalper: 암표상 (명)',
      ],
    },
    {
      narrative: [
        '12. Money is starting to wend its way into the local leagues. (**wend one’s way**) / 돈이 지방 리그로 서서히 흘러들기 시작했다. ※ Leo wended his way home through the wet streets. / 레오는 젖은 거리를 지나 천천히 집으로 향했다. cf. wend one’s way: 천천히 나아가다, 길을 잡다 (동)',
      ],
    },
  ],

  wordMeta: [
    { num: 1, expression: 'Astroturf', meaning: '인조 잔디; (비유) 가짜 풀뿌리 운동', exampleEn: 'China’s most successful Astroturf operation: grassroots football', exampleKo: '' },
    { num: 2, expression: 'steed', meaning: '말, 준마', exampleEn: 'mounted his black steed and charged around a stadium.', exampleKo: '' },
    { num: 3, expression: 'charge', meaning: '돌진하다, 돌격하다', exampleEn: 'charged around a stadium.', exampleKo: '' },
    { num: 4, expression: 'fluffed shot', meaning: '실축, 헛찬 슛', exampleEn: 'missed passes, fluffed shots', exampleKo: '' },
    { num: 5, expression: 'excruciating', meaning: '극도로 고통스러운, 견디기 힘든', exampleEn: 'a goal review that took 11 excruciating minutes.', exampleKo: '' },
    { num: 6, expression: 'perennially', meaning: '늘, 만성적으로', exampleEn: 'China’s perennially inept national team.', exampleKo: '' },
    { num: 7, expression: 'belt out', meaning: '목청껏 부르다', exampleEn: 'Superfans gathered early to bang on drums, wave oversized flags and belt out their chants.', exampleKo: '' },
    { num: 8, expression: 'clad', meaning: '~을 입은', exampleEn: 'they were clad in ankle-length Chinese opera-style robes.', exampleKo: '' },
    { num: 9, expression: 'penumbra', meaning: '반그림자, 영향권의 가장자리', exampleEn: '...the penumbra of China’s property downturn is visible', exampleKo: '' },
    { num: 10, expression: 'mar', meaning: '훼손하다, 망치다', exampleEn: '... marred by match-fixing scandals.', exampleKo: '' },
    { num: 11, expression: 'scalper', meaning: '암표상', exampleEn: 'When scalpers muscled in, authorities introduced facial-recognition turnstiles', exampleKo: '' },
    { num: 12, expression: 'wend one’s way', meaning: '천천히 나아가다, 길을 잡다', exampleEn: 'Money is starting to wend its way into the local leagues.', exampleKo: '' },
  ],

  source: {
    text: "The Economist | China’s most successful Astroturf operation: grassroots football | Oct 26th 2026",
    url: 'https://www.economist.com/china/2026/10/26/chinas-most-successful-astroturf-operation-grassroots-football',
  },

  youtube: 'https://www.youtube.com/shorts/cuUz5gO41gM',
  videoId: 'cuUz5gO41gM',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
