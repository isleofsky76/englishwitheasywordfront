/**
 * 컬쳐 어휘 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-culture-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadCultureVoca } from './culture-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '무제한 뷔페가 돌아왔다, 최고의 뷔페는?',

  slug: 'bounty-hearty-savory-zesty-delicacies-skimp-on-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 무제한 뷔페·음식 관련 시사 영단어. bounty, hearty, savory, zesty, flaky, delicacies, cauldron, cast-iron, skewer, skimp on, upcharge, budget-minded, mesmerizing, fabled, stalwart 등.',

  password: 'seed_culture_bounty-hearty-savory-zesty-delicacies-related-words',

  datePublished: '2026-10-25',

  intro: [
    '코로나 이후 다시 주목받는 무제한 뷔페 트렌드와 추천 식당을 다룬 월스트리트저널(WSJ) 기사에서 주요 시사 영단어를 정리합니다. 푸짐한 메인 요리, 별미, 꼬치 구이, 가성비와 추가 요금 등 음식·뷔페 관련 표현을 살펴봅니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. Good Time Country Buffet는 풍성한 음식(**bounty**)을 약속한다. cf. bounty: 풍부함, 풍성하게 마련된 음식',
      ],
    },
    {
      narrative: [
        '2. 메뉴에는 푸짐하고 든든한(**hearty**) 메인 요리가 포함된다. cf. hearty: 푸짐하고 든든한',
      ],
    },
    {
      narrative: [
        '3. 특제 주철 가마솥이 감칠맛 나는(**savory**) 무게감을 더한다. cf. savory: 감칠맛 나는, 풍미 있는',
      ],
    },
    {
      narrative: [
        '4. 강한 풍미를 가진(**zesty**) 링구이사 소시지가 눈에 띈다. cf. zesty: 강한 풍미를 가진',
      ],
    },
    {
      narrative: [
        '5. 얇은 겹이 바삭하게 부서지는(**flaky**) 시금치 뵈레크 페이스트리가 있다. cf. flaky: 얇은 겹이 바삭하게 부서지는',
      ],
    },
    {
      narrative: [
        '6. 우즈베크 별미(**delicacies**)도 뷔페에서 맛볼 수 있다. cf. delicacies: 별미, 진미',
      ],
    },
    {
      narrative: [
        '7. 특제 주철 가마솥(**cauldrons**)이 감칠맛 나는 무게감을 더한다. cf. cauldron: 가마솥',
      ],
    },
    {
      narrative: [
        '8. 특제 주철(**cast-iron**) 가마솥이 사용된다. cf. cast-iron: 주철로 만든',
      ],
    },
    {
      narrative: [
        '9. 닭고기·양고기·소고기 등 불로 구운 고기 십여 가지가 꼬치(**skewers**)에 올려 나온다. cf. skewer: 꼬치',
      ],
    },
    {
      narrative: [
        '10. 이 식당들은 양이나 맛에서 인색하지 않다(**don’t skimp on**). cf. skimp on: 지나치게 아끼다, 충분히 제공하지 않다',
      ],
    },
    {
      narrative: [
        '11. 세 번째 옵션은 겨우 5달러의 추가 요금(**upcharge**)이다. cf. upcharge: 추가 요금',
      ],
    },
    {
      narrative: [
        '12. 이 뷔페들은 지출을 신중히 따지는(**budget-minded**) 대중을 겨냥한다. cf. budget-minded: 지출을 신중하게 따지는',
      ],
    },
    {
      narrative: [
        '13. 닭고기·감자·마요네즈·비트 위에 석류 씨앗이 깔린 시선 사로잡는(**mesmerizing**) 요리가 있다. cf. mesmerizing: 시선을 사로잡는, 매혹적인',
      ],
    },
    {
      narrative: [
        '14. 거대하고 명성이 자자한(**fabled**) 핫바가 자리한다. cf. fabled: 전설적인, 명성이 자자한',
      ],
    },
    {
      narrative: [
        '15. 미국 전역에 약 350개 매장을 둔 Golden Corral 같은 오랜 대표 주자(**stalwarts**)도 있다. cf. stalwart: 오랫동안 자리를 지킨 대표 주자',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | All-You-Can-Eat Buffets Are Back. Here Are Some of the Best. | By Adam Chandler',
    url: 'https://www.wsj.com/arts-culture/food-cooking/all-you-can-eat-buffets-trend-0bac768a',
  },

  youtube: 'https://youtube.com/shorts/5_Dza6e2PDg',
};
// ===============================

uploadCultureVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
