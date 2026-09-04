/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '우크라이나가 러시아를 상대로 공중전을 대폭 강화하는 이유는?',

  slug: 'household-name-related-words',

  metaDescription:
    'WSJ 방송(https://www.youtube.com/watch?v=YRkonl-h41U)에서 추출한 표현. household name, indebted, fragile, tactical, stagnant, onslaught, jury-rig 등.',

  password: 'seed_defense_household-name-related-words',

  datePublished: '2026-08-31',

  intro: [
    '이 표현들은 WSJ 방송 "우크라이나가 러시아를 상대로 공중전을 대폭 강화하는 이유는?"에서 추출한 표현들입니다.',
  ],

  words: [
    {
      narrative: [
        '1. Wildberries는 러시아에서 가장 중요한 유명 브랜드(**household name**) 중 하나이다.',
      ],
    },
    {
      narrative: [
        '2. 그것은 실제로 러시아 국영은행에 엄청난 빚을 진(**indebted**) 상태이다.',
      ],
    },
    {
      narrative: [
        '3. 러시아 은행 시스템은 이미 상당히 취약(**fragile**)하다.',
      ],
    },
    {
      narrative: [
        '4. 전쟁에 대한 러시아인들의 인식(**perception**)을 바꾼다.',
      ],
    },
    {
      narrative: [
        '5. Wildberries는 전술(**tactical**) 장비, 야간투시경, 헬멧을 판매하고 있다.',
      ],
    },
    {
      narrative: [
        '6. 전국에 걸친 창고 분포(**distribution**)이다.',
      ],
    },
    {
      narrative: [
        '7. 많은 사람에게 전쟁을 실감하게(**bring home**) 한다.',
      ],
    },
    {
      narrative: [
        '8. 반면 지금까지 그들은 여러 면에서 전쟁으로부터 크게 보호(**shelter**)받아 왔다.',
      ],
    },
    {
      narrative: [
        '9. 최전선은 여전히 매우 정체(**stagnant**)되어 있다.',
      ],
    },
    {
      narrative: [
        '10. 병력 문제에 있어서는 어느 정도의 심각한 부족(**crunch**)을 느낀다.',
      ],
    },
    {
      narrative: [
        '11. 우크라이나 드론의 맹공격(**onslaught**)으로부터 자신들을 보호한다.',
      ],
    },
    {
      narrative: [
        '12. 일부는 자체 방공 시스템을 임시방편으로 만든다(**jury-rig**).',
      ],
    },
    {
      narrative: [
        '13. 그것이 잃을 수 있는 것은 러시아인들이 푸틴을 중심으로 결집(**rally around**)하게 하는 것이다.',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=Cvqe9DvPVKo&list=PLSlq2Lkls6sY&index=6',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
