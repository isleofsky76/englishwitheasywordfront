/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '우크라이나가 러시아를 상대로 공중전을 대폭 강화하는 이유는?',

  slug: 'household-name-related-words',

  metaDescription:
    'WSJ 방송에서 추출한 표현. household name, indebted, fragile, tactical, stagnant, onslaught, jury-rig 등.',

  password: 'seed_defense_household-name-related-words',

  datePublished: '2026-08-31',

  intro: [
    '이 표현들은 WSJ 방송 "우크라이나가 러시아를 상대로 공중전을 대폭 강화하는 이유는?"에서 추출한 표현들입니다.',
  ],

  words: [
    {
      title: '1. household name',
      narrative: [
        'household name(ˌhaʊshoʊld ˈneɪm / 하우스홀드 네임)은 **누구나 아는 유명한 이름**',

        "*Wildberries is one of Russia's most important household names.*",

        '**Wildberries is** Wildberries는',
        "**one of Russia's most important household names** 러시아에서 가장 중요하고 누구나 아는 이름 중 하나이다.",
      ],
    },
    {
      title: '2. indebted',
      narrative: [
        'indebted(ɪnˈdetɪd / 인데티드)는 **부채가 있는**, **빚을 진**',

        "*It's actually incredibly indebted to Russian state banks.*",

        "**It's actually incredibly indebted** 그것은 실제로 엄청난 빚을 지고 있다",
        '**to Russian state banks** 러시아 국영은행들에.',
      ],
    },
    {
      title: '3. fragile',
      narrative: [
        'fragile(ˈfrædʒəl / 프래절)은 **취약한**, **불안정한**',

        '*The Russian banking system which is already quite fragile.*',

        '**The Russian banking system** 러시아 은행 시스템은',
        '**which is already quite fragile** 이미 상당히 취약하다.',
      ],
    },
    {
      title: '4. perception',
      narrative: [
        'perception(pərˈsepʃən / 퍼셉션)은 **인식**, **관점**',

        "*Shifting Russians' perceptions of the war.*",

        '**Shifting** 바꾸는 것',
        "**Russians' perceptions of the war** 전쟁에 대한 러시아인들의 인식을.",
      ],
    },
    {
      title: '5. tactical',
      narrative: [
        'tactical(ˈtæktɪkəl / 택티컬)은 **전술적인**',

        '*Wildberries is selling tactical gear, night vision goggles, helmets.*',

        '**Wildberries is selling** Wildberries는 판매하고 있다',
        '**tactical gear** 전술 장비와',
        '**night vision goggles, helmets** 야간투시경, 헬멧을.',
      ],
    },
    {
      title: '6. distribution',
      narrative: [
        'distribution(ˌdɪstrɪˈbjuːʃən / 디스트리뷰션)은 **분포**',

        '*Its distribution of warehouses around the country.*',

        '**Its distribution of warehouses** 그것의 창고 분포',
        '**around the country** 전국에 걸친.',
      ],
    },
    {
      title: '7. bring home',
      narrative: [
        'bring home(brɪŋ hoʊm / 브링 홈)은 **실감하게 하다**, **절실히 깨닫게 하다**',

        '*Really brings home the war to many people.*',

        '**Really brings home the war** 전쟁을 실제로 실감하게 한다',
        '**to many people** 많은 사람에게.',
      ],
    },
    {
      title: '8. shelter',
      narrative: [
        'shelter(ˈʃeltər / 셸터)는 **보호하다**',

        "*Whereas up to now, they've been very sheltered from the war in a lot of ways.*",

        '**Whereas up to now** 반면 지금까지',
        "**they've been very sheltered from the war** 그들은 전쟁으로부터 크게 보호받아 왔다",
        '**in a lot of ways** 여러 면에서.',
      ],
    },
    {
      title: '9. stagnant',
      narrative: [
        'stagnant(ˈstæɡnənt / 스태그넌트)는 **정체된**, **변화가 거의 없는**',

        "*The front line... It's still very stagnant.*",

        '**The front line** 최전선은…',
        "**It's still very stagnant** 여전히 매우 정체되어 있다.",
      ],
    },
    {
      title: '10. crunch',
      narrative: [
        'crunch(krʌntʃ / 크런치)는 **심각한 부족**, **압박**',

        '*Feel a certain crunch when it comes to manpower.*',

        '**Feel a certain crunch** 어느 정도의 심각한 부족을 느끼다',
        '**when it comes to manpower** 병력 문제에 있어서는.',
      ],
    },
    {
      title: '11. onslaught',
      narrative: [
        'onslaught(ˈɑːnslɔːt / 온슬로트)는 **맹공격**, **맹습**',

        '*Protect themselves from the onslaught of Ukrainian drones.*',

        '**Protect themselves** 자신들을 보호하다',
        '**from the onslaught of Ukrainian drones** 우크라이나 드론의 맹공격으로부터.',
      ],
    },
    {
      title: '12. jury-rig',
      narrative: [
        'jury-rig(ˈdʒʊri rɪɡ / 주리 리그)는 **임시방편으로 만들다**, **임시로 설치하다**',

        '*Some have tried to jury-rig their own air defense systems.*',

        '**Some have tried** 일부는 시도했다',
        '**to jury-rig** 임시방편으로 만드는 것을',
        '**their own air defense systems** 자체 방공 시스템을.',
      ],
    },
    {
      title: '13. rally around',
      narrative: [
        'rally around(ˈræli əˈraʊnd / 랠리 어라운드)는 **~을 중심으로 결집하다**, **단결하다**',

        '*What it has to lose is getting Russians to rally around Putin.*',

        '**What it has to lose is** 그것이 잃을 수 있는 것은',
        '**getting Russians to rally around Putin** 러시아인들이 푸틴을 중심으로 결집하게 하는 것이다.',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=YRkonl-h41U',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
