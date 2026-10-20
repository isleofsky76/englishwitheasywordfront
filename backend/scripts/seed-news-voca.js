/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '프랑스는 왜 불타고 있는가',

  slug: 'unleash-maneuver-woes-runoff-ostensibly-detached-related-words',

  metaDescription:
    'WSJ Opinion 기사에서 추출한 프랑스 시위·정치 위기·대통령 선거 관련 시사 영단어. unleash, maneuver, woes, runoff, ostensibly, detached 등.',

  password: 'seed_politics_france-burning-related-words',

  datePublished: '2026-10-18',

  intro: [
    '프랑스에서 발생한 시위와 폭동, 공공서비스 악화, 재정·정치적 위기 및 차기 대통령 선거를 둘러싼 정치권의 움직임을 다룬 월스트리트저널(WSJ) 사설에서 주요 시사 영단어를 정리합니다. 프랑스 의회의 예산안 처리 교착 상태와 장뤼크 멜랑숑의 시위 관련 발언, 대통령 선거를 앞둔 정치적 계산 등을 살펴봅니다.',
  ],

  words: [
    {
      narrative: [
        '1. 극좌 정당 대표 장뤼크 멜랑숑은 약탈과 방화를 규탄하면서도 경찰이 시위대에 폭력을 퍼부었다(**unleashing**)고 비난했다. cf. unleash: 억제된 힘·감정·폭력 등을 터뜨리다, 퍼붓다',
      ],
    },
    {
      narrative: [
        '2. 프랑스 정당들이 내년 대통령 선거를 앞두고 유리한 위치를 차지하기 위해 책략을 쓰는(**maneuver**) 가운데, 하원은 교착 상태에 빠져 연간 예산안조차 통과시키지 못하고 있다. cf. maneuver: 유리한 위치를 차지하려 책략을 쓰다',
      ],
    },
    {
      narrative: [
        '3. 프랑스 위기의 근본적인 재정·정치적 문제들(**woes**)은 이미 알려져 있지만, 이번에는 극좌 후보 멜랑숑의 선거 전 정치적 승부수가 주목받고 있다. cf. woes: 고충, 심각한 문제들',
      ],
    },
    {
      narrative: [
        '4. 프랑스 대통령 선거에서 관건은 누가 1차 투표를 통과해 르펜과 맞붙을 가능성이 있는 양자 결선투표(**runoff**)에 진출하느냐다. cf. runoff: 결선투표',
      ],
    },
    {
      narrative: [
        '5. 프랑스의 폭동은 표면적으로는(**ostensibly**) 공공서비스 악화에 대한 불만 때문이지만, WSJ 사설은 내년 4월 대통령 선거를 고려한 정치적 계산도 작용하고 있다고 분석했다. cf. ostensibly: 표면적으로는, 겉보기에는',
      ],
    },
    {
      narrative: [
        '6. 지금까지 극좌 정당 ‘굴복하지 않는 프랑스’의 대표 멜랑숑은 시위에 다소 거리를 두는(**detached**) 태도를 취해 왔다. cf. detached: 거리를 둔, 초연한',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal Opinion | Why France Is Burning | By The Editorial Board',
    url: 'https://www.wsj.com/opinion/why-france-is-burning-f0b964e9',
  },

  youtube: 'https://youtube.com/shorts/KgMg_F2mO-w',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
