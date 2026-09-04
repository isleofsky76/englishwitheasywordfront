/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '미국 국방 예산을 감축하는 것',

  slug: 'defunding-us-military-related-words',

  metaDescription:
    'WSJ 사설에서 추출한 국방·예산 관련 표현. round, press leak, arsenal, dire straits, readiness, compound, defund 등.',

  password: 'seed_defense_defunding-us-military-related-words',

  datePublished: '2026-09-04',

  intro: [
    '미국 군사력이 심각한 자금 부족 상태에 빠져 있음을 지적합니다. 트럼프 행정부가 추진하는 국방력 강화 계획이 의회의 자금 지원 부족으로 제대로 추진되지 못하고 있다는 내용입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 또 한 차례(**round**)의 언론 유출 보도(**press leak**)가 나오면서, 미군의 무기 비축량(**arsenal**)이 심각한 곤경(**dire straits**)에 처해 있다는 경고가 제기됐다.',
      ],
    },
    {
      narrative: [
        '2. 중동에서 작전을 계속하면서 미군의 대비태세(**readiness**)에 드는 부담과 비용이 계속 누적되고 있다(**are compounding**).',
      ],
    },
    {
      narrative: [
        '3. 현재의 흐름이 이어진다면(on present trend ) 의회가 사실상 미군에 대한 재정 지원(**defunding the military**)을 줄이고 있는 셈이다.',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Defunding the U.S. Military | The Editorial Board',
    url: 'https://www.wsj.com/opinion/u-s-military-funding-iran-middle-east-pentagon-ukraine-1b3460f1?mod=opinion_trendingnow_article_pos2',
  },

  youtube: 'https://www.youtube.com/shorts/_DQAJ2M39Vk',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
