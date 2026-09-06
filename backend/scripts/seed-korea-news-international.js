/**
 * 한국뉴스 — 국제 카테고리 샘플 시드
 * 사용법: node scripts/seed-korea-news-international.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadKoreaNews } from './korea-news-format.js';

const article = {
  category: '국제',

  title: '한반도 외교와 대화 모색',

  slug: 'korea-diplomacy-dialogue-sample',

  metaDescription:
    '한국 국제 외교 관련 뉴스에서 추출한 문장 샘플. diplomacy, dialogue, de-escalation, talks.',

  password: 'password_seed_korea_news_diplomacy_sample',

  datePublished: '2026-09-06',

  intro: [
    '한반도 외교와 대화 모색을 다룬 기사에서 추출한 문장 샘플입니다. (양식 확인용)',
  ],

  words: [
    {
      narrative: [
        '1. 외교관들은 긴장을 완화하기 위해(**to ease tensions**) 대화를 모색하고 있습니다(**are seeking dialogue**).',
      ],
    },
    {
      narrative: [
        '2. 당국은 단계적 외교가(**phased diplomacy**) 탈고조(**de-escalation**)에 도움이 될 수 있다고 말했습니다.',
      ],
    },
    {
      narrative: [
        '3. 실무급 회담이(**working-level talks**) 조만간 열릴 수 있다는 관측도 나왔습니다(**may take place soon**).',
      ],
    },
  ],

  source: {
    text: 'Sample | Korea News (International) seed',
    url: 'https://englisheasystudy.com/korea-news-list.html',
  },

  youtube: '',
};

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
