/**
 * 한국뉴스 업로드 (국방 / 국제)
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-korea-news.js
 * category: '국방' | '국제'  (제목에 [국방]/[국제] 자동 접두)
 */
import { API_BASE } from './loadEnv.js';
import { uploadKoreaNews } from './korea-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '유튜브 먹방 규제 강화',

  slug: 'youtube-mukbang-eating-disorders-monetization-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 유튜브 먹방 규제 관련 문장. tightens restrictions, eating disorders, monetize content, limit advertising revenue, curb monetization, sanctions, monetization suspended.',

  password: 'password_seed_youtube_mukbang_eating_disorders_monetization_koreaherald',

  datePublished: '2026-09-25',

  intro: [
    '유튜브의 섭식장애 관련 콘텐츠 규제가 한국 먹방 크리에이터들의 수익 창출에 미치는 영향을 다룬 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 유튜브가 섭식장애와 관련된 콘텐츠에 대한 규제를 강화하면서(**tightens restrictions on content related to eating disorders**), 특히 많은 양을 먹는 것으로 알려진(**known for their large appetites**) 한국 먹방 크리에이터들이 우려를 나타내고 있습니다(**are voicing concerns**).',
      ],
    },
    {
      narrative: [
        '2. 유튜브의 더 엄격해진 정책(**YouTube’s stricter policy**)이 일부 먹방 유튜버들이 콘텐츠로 수익을 창출하는 능력에(**ability to monetize their content**) 영향을 미칠 수 있다는 우려가 제기됐습니다(**raising concerns**).',
      ],
    },
    {
      narrative: [
        '3. 유튜브는 섭식장애를 조장하거나 모방하게 할 수 있는 신호가 포함된 콘텐츠(**content containing signals that may encourage or imitate eating disorders**)에 대해 광고 수익을 제한하겠다고(**limit advertising revenue**) 밝혔습니다.',
      ],
    },
   
  ],

  source: {
    text: 'The Korea Herald | Is YouTube ending the mukbang era? | By Song Seung-hyun',
    url: 'https://www.koreaherald.com/article/10884608',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
