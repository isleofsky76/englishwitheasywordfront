/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: 'USS 에이브러햄 링컨 승조원들의 태국 상륙',

  slug: 'staggered-shore-leave-related-words',

  metaDescription:
    'Guardian 기사에서 추출한 해군·군사 생활 관련 표현. staggered, shore leave, stint, off-limits, abrupt, intermittently, conduct oneself, deteriorating, infamous 등.',

  password: 'seed_defense_staggered-shore-leave-related-words',

  datePublished: '2026-09-04',

  intro: [
    '장기간 해상 작전을 마치고 태국에 도착한 미 항공모함 USS 에이브러햄 링컨 승조원들의 상륙과 생활 여건을 다룬 Guardian 기사에서 사용된 해군·군사 관련 시사 어휘를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 수많은 승조원이 한꺼번에 함정을 떠나지 않도록 여러 그룹으로 나눠 순차적으로(**staggered**) 상륙시키고 있었다.',
      ],
    },
    {
      narrative: [
        '2. 장기간 바다에서 임무를 수행한 승조원들에게 태국 파타야에서의 상륙 허가와 자유시간(**shore leave**)이 주어졌다.',
      ],
    },
    {
      narrative: [
        '3. USS 에이브러햄 링컨 승조원들은 기록적으로 긴 해상 파견 기간(**stint**)을 보낸 뒤 태국에 도착했다.',
      ],
    },
    {
      narrative: [
        '4. 승조원들의 안전과 군 기강을 위해 파타야의 일부 지역은 일몰 이후 출입 금지(**off-limits**) 구역으로 지정됐다.',
      ],
    },
    {
      narrative: [
        '5. 전쟁이 발발하면서 가족과의 통신이 갑작스럽게(**abrupt**) 끊긴 승조원도 있었다.',
      ],
    },
    {
      narrative: [
        '6. 이후 통신이 일부 회복되면서 가족과 간헐적으로(**intermittently**) 연락할 수 있게 됐다.',
      ],
    },
    {
      narrative: [
        '7. 해군은 상륙한 승조원들에게 충분히 휴식하되 미국과 태국의 법률에 맞게 처신할 것(**conduct oneself**)을 요구했다.',
      ],
    },
    {
      narrative: [
        '8. 기록적인 장기 항해가 이어지면서 함정 내 생활 여건이 점차 악화되는(**deteriorating**) 문제도 제기됐다.',
      ],
    },
    {
      narrative: [
        '9. 승조원들이 방문한 파타야에는 세계적으로 악명 높은(**infamous**) 유흥가로 알려진 지역도 있어 출입과 행동에 각별한 주의가 요구됐다.',
      ],
    },
  ],

  source: {
    text: 'The Guardian | ‘It’s a fever dream right now’: sailors of USS Abraham Lincoln voice joy after arriving in Thailand',
    url: 'https://www.theguardian.com/world/2026/sep/02/uss-abraham-lincolns-crew-arrive-thailand-after-record-stint-at-sea',
  },

  youtube: 'https://www.youtube.com/shorts/KQhzinijll4',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
