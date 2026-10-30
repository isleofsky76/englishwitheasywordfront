/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '유럽은 미국 위성 의존에서 벗어나야 한다',

  slug: 'folly-capricious-malign-egregious-hobble-related-words',

  metaDescription:
    'The Economist 기사에서 추출한 시사 영단어. folly, capricious, malign, egregious, hobble, hamper, alternative, autonomy, trounce, interoperable, infighting, exemplify.',

  password: 'seed_defense_folly-capricious-malign-egregious-hobble',

  datePublished: '2026-10-22',

  intro: [
    '유럽은 미국 위성 의존에서 벗어나야 한다 주제를 다룬 The Economist 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. the folly of relying too much (**folly**) / 너무 많이 의존하는 어리석음 cf. folly: 어리석음, 우행 (명)',
      ],
    },
    {
      narrative: [
        '2. a capricious private citizen named Elon Musk. (**capricious**) / 일론 머스크라는 변덕스러운 민간인 cf. capricious: 변덕스러운 (형)',
      ],
    },
    {
      narrative: [
        '3. That had two malign effects. (**malign**) / 그것은 두 가지 해로운 결과를 낳았다. cf. malign: 해로운, 악의적인 (형)',
      ],
    },
    {
      narrative: [
        '4. egregious favour to the Kremlin (**egregious**) / 크렘린에 대한 터무니없는 호의 cf. egregious: 터무니없는, 얼토당토않은 (형)',
      ],
    },
    {
      narrative: [
        '5. ...hobbling of his satellite-internet service inside Ukraine. (**hobble**) / …우크라이나 내 위성 인터넷 서비스를 방해한 것 cf. hobble: 절뚝거리게 하다, 방해하다 (동)',
      ],
    },
    {
      narrative: [
        '6. It hampered Ukraine’s already limited ability to defend its cities... (**hamper**) / 그것은 우크라이나가 도시를 방어하는 이미 제한된 능력에 지장을 주었다… cf. hamper: 방해하다, 지장을 주다 (동)',
      ],
    },
    {
      narrative: [
        '7. The problem, alas, is that no adequate home-grown alternative exists. (**alternative**) / 문제는, 아쉽게도, 충분한 자체 대안이 없다는 것이다. cf. alternative: 대안, 대체 수단 (명)',
      ],
    },
    {
      narrative: [
        '8. Europe talks a good game of trying to achieve “autonomy in space” (**autonomy**) / 유럽은 ‘우주 자립’을 이루겠다고 말은 잘한다 cf. autonomy: 자율성, 자립 (명)',
      ],
    },
    {
      narrative: [
        '9. Small wonder it has been trounced by SpaceX... (**trounce**) / SpaceX에 참패당한 것도 당연하다… cf. trounce: 참패시키다, 완파하다 (동)',
      ],
    },
    {
      narrative: [
        '10. ...so that they are interoperable. (**interoperable**) / …상호 운용이 가능하도록 cf. interoperable: 상호 운용이 가능한 (형)',
      ],
    },
    {
      narrative: [
        '11. ...infighting and duplication that have weighed down its space efforts. (**infighting**) / …우주 노력을 짓눌러 온 내분과 중복 cf. infighting: 내분, 내부 다툼 (명)',
      ],
    },
    {
      narrative: [
        '12. Europe’s rocket programme exemplifies flaws of its space ventures. (**exemplify**) / 유럽의 로켓 프로그램은 우주 사업의 결함을 전형적으로 보여준다. cf. exemplify: 전형적으로 보여주다, 예시가 되다 (동)',
      ],
    },
  ],

  wordMeta: [
    { num: 1, expression: 'folly', meaning: '어리석음, 우행', exampleEn: 'the folly of relying too much', exampleKo: '' },
    { num: 2, expression: 'capricious', meaning: '변덕스러운', exampleEn: 'a capricious private citizen named Elon Musk.', exampleKo: '' },
    { num: 3, expression: 'malign', meaning: '해로운, 악의적인', exampleEn: 'That had two malign effects.', exampleKo: '' },
    { num: 4, expression: 'egregious', meaning: '터무니없는, 얼토당토않은', exampleEn: 'egregious favour to the Kremlin', exampleKo: '' },
    { num: 5, expression: 'hobble', meaning: '절뚝거리게 하다, 방해하다', exampleEn: '...hobbling of his satellite-internet service inside Ukraine.', exampleKo: '' },
    { num: 6, expression: 'hamper', meaning: '방해하다, 지장을 주다', exampleEn: 'It hampered Ukraine’s already limited ability to defend its cities...', exampleKo: '' },
    { num: 7, expression: 'alternative', meaning: '대안, 대체 수단', exampleEn: 'The problem, alas, is that no adequate home-grown alternative exists.', exampleKo: '' },
    { num: 8, expression: 'autonomy', meaning: '자율성, 자립', exampleEn: 'Europe talks a good game of trying to achieve “autonomy in space”', exampleKo: '' },
    { num: 9, expression: 'trounce', meaning: '참패시키다, 완파하다', exampleEn: 'Small wonder it has been trounced by SpaceX...', exampleKo: '' },
    { num: 10, expression: 'interoperable', meaning: '상호 운용이 가능한', exampleEn: '...so that they are interoperable.', exampleKo: '' },
    { num: 11, expression: 'infighting', meaning: '내분, 내부 다툼', exampleEn: '...infighting and duplication that have weighed down its space efforts.', exampleKo: '' },
    { num: 12, expression: 'exemplify', meaning: '전형적으로 보여주다, 예시가 되다', exampleEn: 'Europe’s rocket programme exemplifies flaws of its space ventures.', exampleKo: '' },
  ],

  source: {
    text: 'The Economist | Europe must escape its reliance on American satellites | Oct 22nd 2026',
    url: 'https://www.economist.com/leaders/2026/10/22/europe-must-escape-its-reliance-on-american-satellites',
  },

  youtube: 'https://www.youtube.com/shorts/1vZOaAJNCQk',
  videoId: '1vZOaAJNCQk',
};
// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
