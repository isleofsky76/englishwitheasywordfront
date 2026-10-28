/**
 * 컬쳐 어휘 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-culture-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadCultureVoca } from './culture-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: 'BTS RM SFMOMA 미술 전시에 팬들이 몰리다',

  slug: 'calligraphy-juxtaposed-scholarly-formidable-loom-large-related-words',

  metaDescription:
    'The Guardian 기사에서 추출한 BTS RM SFMOMA 미술 전시·팬덤·큐레이션 관련 시사 영단어. calligraphy, juxtaposed, scholarly, intuitive, diaristic, formidable, loom large, dedication, commemorate, one-off, deficit, usher in 등.',

  password: 'seed_culture_calligraphy-juxtaposed-scholarly-formidable-related-words',

  datePublished: '2026-10-24',

  intro: [
    'BTS 멤버 RM이 큐레이팅한 샌프란시스코 현대미술관(SFMOMA) 전시회에 팬들이 몰린 장면을 다룬 가디언(The Guardian) 기사에서 주요 시사 영단어를 정리합니다. 전시 구성, 팬덤의 열성, 박물관 재정 상황과 셀러브리티 전시의 의미를 살펴봅니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. 전시에는 회화, 서예(**calligraphy**), 조각 등이 포함되어 있다. cf. calligraphy: 서예',
      ],
    },
    {
      narrative: [
        '2. 작품은 마크 로스코의 No. 14 옆에 비교·대조되도록 나란히 놓여(**juxtaposed**) 있다. cf. juxtaposed: 비교·대조되도록 나란히 놓인',
      ],
    },
    {
      narrative: [
        '3. 일부 작품은 학문적인(**scholarly**) 흐름을 따라 전시되어 있다. cf. scholarly: 학문적인, 전문적인',
      ],
    },
    {
      narrative: [
        '4. 다른 큐레이션은 더 직관적으로(**intuitive**) 느껴진다. cf. intuitive: 직관적인',
      ],
    },
    {
      narrative: [
        '5. 일기식의(**diaristic**) 개인적 성찰이 전시 곳곳에 담겨 있다. cf. diaristic: 일기식의, 일기체의',
      ],
    },
    {
      narrative: [
        '6. 컬렉션과 전시 큐레이션은 감탄할 만큼 뛰어나다(**formidable**). cf. formidable: 대단한, 감탄할 만큼 뛰어난',
      ],
    },
    {
      narrative: [
        '7. 그의 유명세가 전시 전반에 크게 부각되지만(**looms large**), 작품 자체도 주목받는다. cf. loom large: 크게 부각되다',
      ],
    },
    {
      narrative: [
        '8. 스스로를 아미(Army)라고 부르는 BTS 팬들의 헌신(**dedication**)이 돋보인다. cf. dedication: 헌신, 열성',
      ],
    },
    {
      narrative: [
        '9. 관람객들이 그가 이 전시를 큐레이팅했다는 특별함을 기념하는(**commemorate**) 일이 중요하다고 한다. cf. commemorate: 특별한 일·순간을 기념하다',
      ],
    },
    {
      narrative: [
        '10. 여러 조건이 겹치면서 이 전시는 단 한 번뿐인(**one-off**) 사례가 될 수도 있다. cf. one-off: 단 한 번 있는 일, 일회성 사례',
      ],
    },
    {
      narrative: [
        '11. SFMOMA는 500만 달러 적자(**deficit**) 속에서 인력의 7.5%를 감원했다. cf. deficit: 적자',
      ],
    },
    {
      narrative: [
        '12. 이 전시가 셀러브리티 전시라는 새로운 흐름을 열지(**ushers in**), 아니면 예외로 남을지가 관심이다. cf. usher in: 새로운 흐름·시대를 열다',
      ],
    },
  ],

  source: {
    text: "The Guardian | ‘Unlike anything we’ve experienced’: fans swarm San Francisco for BTS star’s art exhibition | By Soo Youn",
    url: 'https://www.theguardian.com/artanddesign/2026/oct/24/rm-bts-sfmoma-exhibition',
  },

  youtube: 'https://youtube.com/shorts/9Ko_HUUFd-c',
};
// ===============================

uploadCultureVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
