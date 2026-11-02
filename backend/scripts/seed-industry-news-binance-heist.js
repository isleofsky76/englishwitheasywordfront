/**
 * 산업뉴스 — Binance hack / Guardian
 *   cd backend && node scripts/seed-industry-news-binance-heist.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadIndustryNews } from './industry-news-format.js';

const article = {
  title: '북한이 연루된 것으로 지목된 63억 달러 바이낸스 해킹, 사상 최대 암호화폐 강탈',

  slug: 'heist-culprit-outfit-breach-reimburse-custodian-ramification-dampen-related-words',

  metaDescription:
    'Guardian 바이낸스 해킹 기사 어휘. heist, culprit, outfit, breach, reimburse, custodian, ramification, dampen.',

  password: 'seed_industry_heist-culprit-outfit-breach-reimburse',

  datePublished: '2026-10-30',

  intro: [
    '북한이 연루된 것으로 지목된 약 63억 달러 규모 바이낸스 해킹을 다룬 The Guardian 기사에서 핵심 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. North Korean group blamed for $6.3bn Binance hack in biggest ever crypto **heist**. / 사상 최대 규모의 암호화폐 강탈로 기록된 바이낸스 해킹에 북한 조직이 연루된 것으로 지목됐다. cf. heist: 강탈, 대규모 절도 (명)',
      ],
    },
    {
      narrative: [
        '2. ...with experts identifying North Korea as the likely **culprit**. / 전문가들은 북한을 유력한 범인으로 지목했다. cf. culprit: 범인, 장본인 (명)',
      ],
    },
    {
      narrative: [
        '3. Chainalysis, another analysis **outfit**, also attributed the heist to TraderTraitor. / 또 다른 분석 업체인 체인얼리시스도 이번 강탈을 트레이더트레이터의 소행으로 보았다. cf. outfit: 조직, 업체 (명)',
      ],
    },
    {
      narrative: [
        '4. An initial investigation suggested the **breach** may have started with a hacked laptop... / 초기 조사에서는 보안 침해가 해킹된 노트북에서 시작됐을 가능성이 제기됐다. cf. breach: 보안 침해, 위반 (명)',
      ],
    },
    {
      narrative: [
        '5. It later resumed trading and said it would fully **reimburse** affected traders. / 이후 거래가 재개됐고, 피해를 본 거래자들에게 전액 배상하겠다고 밝혔다. cf. reimburse: 배상하다, 돈을 돌려주다 (동)',
      ],
    },
    {
      narrative: [
        '6. it had worked with the cryptocurrency **custodian** BitGo to freeze funds stolen in what it described as a Binance hack. / 바이낸스 해킹으로 도난당한 자금을 동결하기 위해 암호화폐 수탁 기관 빗고와 협력했다고 전했다. cf. custodian: 자산 수탁 기관, 관리인 (명)',
      ],
    },
    {
      narrative: [
        '7. the security breach was likely to have wider **ramification**s for crypto... / 이번 보안 침해는 암호화폐 시장에 더 넓은 파장을 일으킬 가능성이 있다. cf. ramification: 파장, 여파 (명)',
      ],
    },
    {
      narrative: [
        '8. It may further **dampen** risk appetite... / 이는 위험 선호 더 약화시킬 수 있다. cf. dampen: 약화시키다, 꺾다 (동)',
      ],
    },
  ],

  source: {
    text: 'The Guardian | North Korean group blamed for $6.3bn Binance hack in biggest ever crypto heist | By Dan Milmo and agencies | Oct. 30, 2026',
    url: 'https://www.theguardian.com/business/2026/oct/29/binance-crypto-exchange-hack',
  },

  youtube: 'https://www.youtube.com/shorts/JkSIbEqtpfU',
  videoId: 'JkSIbEqtpfU',
};

uploadIndustryNews(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/industry-news/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
