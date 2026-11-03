/**
 * 요리 어휘 — 미식·맛 형용사 / WSJ
 *   cd backend && node scripts/seed-cooking-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadCookingVoca } from './cooking-voca-format.js';

const article = {
  title: '가짓수는 적지만 아주 맛있는 메뉴 — 미식 영단어',

  slug: 'delectable-succulent-tangy-crusty-gastronomic-savory-related-words',

  metaDescription:
    'WSJ 미식·맛 표현 어휘. delectable, succulent, tangy, crusty, gastronomic, savory, zesty, creamy, flaky, bland, rich, crisp.',

  password: 'seed_cooking_delectable-succulent-tangy-crusty-gastronomic',

  datePublished: '2026-11-01',

  intro: [
    '프랑스 미식과 맛 표현을 다룬 The Wall Street Journal 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. a concise but **delectable** menu / 가짓수는 적지만 아주 맛있는 메뉴 cf. delectable: 아주 맛있는, 군침 도는 (형)',
      ],
    },
    {
      narrative: [
        '2. a **succulent** shrimp spring roll / 촉촉하고 맛있는 새우 스프링롤 cf. succulent: 즙이 많은, 촉촉하고 맛있는 (형)',
      ],
    },
    {
      narrative: [
        '3. a **tangy** lemon aioli / 새콤한 레몬 아이올리 소스 cf. tangy: 톡 쏘는, 새콤한 (형)',
      ],
    },
    {
      narrative: [
        '4. **crusty** French country bread / 겉이 바삭한 프랑스식 시골 빵 cf. crusty: 겉이 바삭한, 껍질이 단단한 (형)',
      ],
    },
    {
      narrative: [
        '5. an array of Gallic **gastronomic** treats / 다채로운 프랑스 미식 요리 cf. gastronomic: 미식의, 요리의 (형)',
      ],
    },
    {
      narrative: [
        '6. a **savory** beef stew / 감칠맛 나는 소고기 스튜 cf. savory: 맛과 풍미가 좋은, 감칠맛 나는 (형)',
      ],
    },
    {
      narrative: [
        '7. a **zesty** citrus dressing / 상큼하고 톡 쏘는 감귤류 드레싱 cf. zesty: 강한 풍미를 가진, 상큼하고 톡 쏘는 (형)',
      ],
    },
    {
      narrative: [
        '8. a **creamy** mushroom soup / 부드럽고 진한 버섯 수프 cf. creamy: 크림이 많이 든, 크림처럼 부드러운 (형)',
      ],
    },
    {
      narrative: [
        '9. a **flaky** butter croissant / 얇은 결이 바삭하게 부서지는 버터 크루아상 cf. flaky: 얇게 벗겨지는, 겹겹이 바삭한 (형)',
      ],
    },
    {
      narrative: [
        '10. The soup tastes **bland**. / 수프 맛이 밋밋하다. cf. bland: 싱거운, 밋밋한 (형)',
      ],
    },
    {
      narrative: [
        '11. bowls of **rich** onion soup gratinée / 진한 풍미의 양파 그라탱 수프 여러 그릇 cf. rich: 맛이 진하고 풍부한 (형)',
      ],
    },
    {
      narrative: [
        '12. **crisp** baby artichokes / 아삭한 어린 아티초크 cf. crisp: 아삭한, 바삭한 (형)',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Food & gastronomic vocabulary | Nov. 1, 2026',
    url: '',
  },

  youtube: 'https://youtube.com/shorts/juL9WBekg7c',
  videoId: 'juL9WBekg7c',
};

uploadCookingVoca(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/cooking-voca/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
