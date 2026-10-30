/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '인도네시아 포퓰리스트 대통령은 매력을 잃어가고 있다',

  slug: 'hold-back-court-erratic-gimmick-malady-loggerheads-dissident-assailant-populous',

  metaDescription:
    'The Economist 기사에서 추출한 시사 영단어. hold back, court, erratic, gimmick, malady, loggerhead, dissident, assailant, populous.',

  password: 'seed_news_voca_hold-back-court-erratic-gimmick-malady-loggerheads',

  datePublished: '2026-10-22',

  intro: [
    '인도네시아 포퓰리스트 대통령은 매력을 잃어가고 있다 주제를 다룬 The Economist 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. Prabowo Subianto’s erratic policies are holding back his country (**hold back**) / 프라보워 수비안토의 변덕스러운 정책이 나라를 가로막고 있다 cf. hold back: 저지하다, 발전을 가로막다 (동)',
      ],
    },
    {
      narrative: [
        '2. Flows of foreign direct investment (FDI), which soared... as he (Jokowi) courted Chinese miners, have been disappointing. (**court**) / 조코위가 중국 광산업계의 지지를 얻으려 할 때 치솟았던 FDI가 기대에 못 미치고 있다 cf. court: 구애하다, 지지를 얻으려 하다 (동)',
      ],
    },
    {
      narrative: [
        '3. Mr Prabowo’s erratic rule is making Indonesia a tricky place to do business. (**erratic**) / 프라보워의 변덕스러운 통치가 인도네시아를 사업하기 까다로운 곳으로 만들고 있다 cf. erratic: 변덕스러운, 종잡을 수 없는 (형)',
      ],
    },
    {
      narrative: [
        '4. Such gimmicks(무상급식 등) used to be popular... (**gimmick**) / 그런 술수(무상급식 등)는 한때 인기가 있었다 cf. gimmick: 술수, 눈길을 끌기 위한 수법 (명)',
      ],
    },
    {
      narrative: [
        '5. Mr Prabowo has done little to cure underlying economic maladies. (**malady**) / 프라보워는 근본적인 경제 병폐를 거의 고치지 못했다 cf. malady: 병폐, 고질적인 문제 (명)',
      ],
    },
    {
      narrative: [
        '6. be at loggerheads. (**loggerhead**) / 갈등 상태에 있다 · loggerhead: 긴 자루 끝에 둥근 쇠뭉치가 달린 쇠 도구 (명) · be at loggerheads: 갈등 상태에 있는',
      ],
    },
    {
      narrative: [
        '7. Some fear he will be tempted to use dirty tricks to suppress dissent again. (**dissident**) / 일부는 그가 다시 반대를 억압하기 위해 더러운 수단을 쓸까 봐 두려워한다 cf. dissident: 반체제 인사 (명) ※ 예문 속 dissent는 명사/동사 ‘반대, 이견’',
      ],
    },
    {
      narrative: [
        '8. Assailants beat up one of the protest’s main organisers. (**assailant**) / 괴한들이 시위의 주요 주최자 중 한 명을 폭행했다 cf. assailant: 공격자, 습격자, 괴한 (명)',
      ],
    },
    {
      narrative: [
        '9. Indonesia, the world’s fourth-most-populous country. (**populous**) / 세계 인구 4위의 나라 인도네시아 cf. populous: 인구가 많은 (형)',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'hold back',
      meaning: '저지하다, 발전을 가로막다',
      exampleEn: 'Prabowo Subianto’s erratic policies are holding back his country',
      exampleKo: '',
    },
    {
      num: 2,
      expression: 'court',
      meaning: '구애하다, 지지를 얻으려 하다',
      exampleEn:
        'Flows of foreign direct investment (FDI), which soared... as he (Jokowi) courted Chinese miners, have been disappointing.',
      exampleKo: '',
    },
    {
      num: 3,
      expression: 'erratic',
      meaning: '변덕스러운, 종잡을 수 없는',
      exampleEn: 'Mr Prabowo’s erratic rule is making Indonesia a tricky place to do business.',
      exampleKo: '',
    },
    {
      num: 4,
      expression: 'gimmick',
      meaning: '술수, 눈길을 끌기 위한 수법',
      exampleEn: 'Such gimmicks(무상급식 등) used to be popular...',
      exampleKo: '',
    },
    {
      num: 5,
      expression: 'malady',
      meaning: '병폐, 고질적인 문제',
      exampleEn: 'Mr Prabowo has done little to cure underlying economic maladies.',
      exampleKo: '',
    },
    {
      num: 6,
      expression: 'loggerhead',
      meaning: '긴 자루 끝에 둥근 쇠뭉치가 달린 쇠 도구 (be at loggerheads: 갈등 상태에 있는)',
      exampleEn: 'be at loggerheads',
      exampleKo: '',
    },
    {
      num: 7,
      expression: 'dissident',
      meaning: '반체제 인사 (예문 dissent = 반대·이견)',
      exampleEn: 'Some fear he will be tempted to use dirty tricks to suppress dissent again.',
      exampleKo: '',
    },
    {
      num: 8,
      expression: 'assailant',
      meaning: '공격자, 습격자, 괴한',
      exampleEn: 'Assailants beat up one of the protest’s main organisers.',
      exampleKo: '',
    },
    {
      num: 9,
      expression: 'populous',
      meaning: '인구가 많은',
      exampleEn: 'Indonesia, the world’s fourth-most-populous country.',
      exampleKo: '',
    },
  ],

  source: {
    text: "The Economist | Indonesia’s populist president is losing his charm | Oct 22nd 2026",
    url: 'https://www.economist.com/leaders/2026/10/22/indonesias-populist-president-is-losing-his-charm',
  },

  youtube: 'https://www.youtube.com/shorts/opd3lVItmd4',
  videoId: 'opd3lVItmd4',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
