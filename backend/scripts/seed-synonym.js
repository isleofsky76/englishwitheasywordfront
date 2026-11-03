/**
 * 유의어(연관단어) 업로드 — 독재·권위주의 관련어
 *
 *   cd backend && node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

const article = {
  title: '독재자 · 독재 정치 #연관단어',

  slug: 'autocrat-dictator-despot-authoritarian-kleptocracy-related-words',

  metaDescription:
    '독재·권위주의 관련 연관단어. autocrat, dictator, despot, authoritarian, autocratic, autocracy, kleptocracy, baleful, avarice, braggart.',

  password: 'seed_synonym_autocrat-dictator-despot-authoritarian',

  datePublished: '2026-11-03',

  intro: [
    '독재자·독재 정치·권위주의와 관련된 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. The **autocrat** ruled the country with absolute power. / 그 독재자는 절대적인 권력으로 나라를 통치했다. cf. autocrat: 독재자, 전제 군주 (명)',
      ],
    },
    {
      narrative: [
        '2. The **dictator** suppressed political opposition. / 그 독재자는 정치적 반대 세력을 탄압했다. cf. dictator: 독재자 (명)',
      ],
    },
    {
      narrative: [
        '3. The cruel **despot** ruled through fear. / 그 잔혹한 폭군은 공포로 나라를 다스렸다. cf. despot: 폭군, 전제 군주 (명)',
      ],
    },
    {
      narrative: [
        '4. The **authoritarian** government restricted civil liberties. / 그 권위주의 정부는 시민의 자유를 제한했다. cf. authoritarian: 권위주의적인, 권위주의자 (형/명)',
      ],
    },
    {
      narrative: [
        '5. His **autocratic** leadership left little room for dissent. / 그의 독재적인 지도 방식은 반대 의견을 거의 허용하지 않았다. cf. autocratic: 독재적인, 전제적인 (형)',
      ],
    },
    {
      narrative: [
        '6. The country shifted from democracy to **autocracy**. / 그 나라는 민주주의에서 독재 정치로 전환되었다. cf. autocracy: 독재 정치, 전제 정치 (명)',
      ],
    },
    {
      narrative: [
        '7. The regime became a **kleptocracy** under corrupt leaders. / 그 정권은 부패한 지도자들 아래 도둑 정치 체제로 변했다. cf. kleptocracy: 도둑 정치, 부패한 지배 체제 (명)',
      ],
    },
    {
      narrative: [
        '8. The ruler cast a **baleful** glance at his opponents. / 그 통치자는 반대자들에게 위협적인 눈길을 보냈다. cf. baleful: 해로운, 불길한, 위협적인 (형)',
      ],
    },
    {
      narrative: [
        "9. The ruler's **avarice** drained the nation's wealth. / 그 통치자의 탐욕은 국가의 부를 고갈시켰다. cf. avarice: 탐욕, 재물욕 (명)",
      ],
    },
    {
      narrative: [
        '10. The **braggart** constantly boasted about his achievements. / 그 허풍쟁이는 끊임없이 자신의 업적을 자랑했다. cf. braggart: 허풍쟁이, 자랑만 늘어놓는 사람 (명)',
      ],
    },
  ],

  source: {
    text:
      'All sentences are sourced from global news outlets for English practice. They do not reflect my personal views or financial/political advice. We constantly provide content featuring key English vocabulary from the latest issues of major news outlets such as The Guardian, BBC, CNN, WSJ, and The Economist. | englisheasystudy.com',
    url: 'https://englisheasystudy.com',
  },

  youtube: 'https://youtube.com/shorts/Hp5mjB-T9XA',
  videoId: 'Hp5mjB-T9XA',
};

uploadSynonym(article, API_BASE)
  .then(() => {
    console.log('완료.');
    console.log(`상세: https://englisheasystudy.com/english-synonym/${article.slug}/`);
  })
  .catch((e) => {
    console.error('오류:', e.message || e);
    process.exitCode = 1;
  });
