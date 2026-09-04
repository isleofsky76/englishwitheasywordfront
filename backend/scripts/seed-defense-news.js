/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '미 국방부 1200억 달러 무기 계약',

  slug: 'pentagon-120-billion-patriot-missiles-vocabulary',

  metaDescription:
    'WSJ 기사에서 추출한 국방·예산 관련 표현. covert, thwart, skepticism, subject to, appropriation, earmark, value, weaponry 등.',

  password: 'seed_defense_pentagon-120-billion-patriot-missiles-vocabulary',

  datePublished: '2026-08-31',

  intro: [
    '미 국방부가 패트리엇 미사일과 잠수함 등 대규모 무기 조달에 1200억 달러 이상을 투입하기로 한 WSJ 기사에서 사용된 국방·예산 관련 시사 어휘를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 잠수함은 추적이 어렵고 지휘관들이 은밀한(covert) 공격을 감행할 수 있게 해주기 때문에 미군에게 매우 중요.',
      ],
    },
    {
      narrative: [
        '2. 더 큰 탄약으로 탄도 미사일도 방해/저지할(**thwart**) 수 있음.',
      ],
    },
    {
      narrative: [
        '3. 민주당과 일부 공화당 의원들은 대규모 국방 계약과 관련해 회의적인 태도(**skepticism**)를 나타냈다.',
      ],
    },
    {
      narrative: [
        '4. 패트리어트 및 사드(THAAD) 미사일에 대한 최근 계약은 최종 조건에 관한 추가 협상을 거쳐야 하는(**subject to further talks**) 미확정 계약.',
      ],
    },
    {
      narrative: [
        '5. 또한 해당 계약들은 의회의 완전한 예산 승인(**appropriation**)을 받지 못했습니다.',
      ],
    },
    {
      narrative: [
        '6. 미 국방부는 패트리엇 미사일과 잠수함 등 무기 조달을 위해 계약업체에 1200억 달러 이상을 특정 용도로 배정했다(**earmark**).',
      ],
    },
    {
      narrative: [
        '7. 록히드마틴과 체결하는 패트리엇 미사일 계약의 규모는 현재 약 590억 달러로 평가되고 있다(**value**).',
      ],
    },
    {
      narrative: [
        '8. 국방부는 장기간에 걸쳐 미사일과 각종 무기류(**weaponry**)를 안정적으로 공급받기 위해 연간 구매 방식을 확대하고 있다.',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Pentagon Commits Over $120 Billion for Patriot Missiles, Submarines | By Drew FitzGerald and Marcus Weisgerber',
    url: 'https://www.wsj.com/politics/national-security/pentagon-widens-patriot-missile-order-to-nearly-59-billion-b3da2e01',
  },

  youtube: 'https://www.youtube.com/watch?v=5HvLP-bF3Oc',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
