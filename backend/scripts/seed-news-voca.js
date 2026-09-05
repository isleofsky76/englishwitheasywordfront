/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '이란 휴전 종료 선언',

  slug: 'trump-iran-ceasefire-over-naval-blockade-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 이란 휴전 종료 관련 문장. scum, vicious people, reimposing a naval blockade, ramp up economic pressure, full-blown war.',

  password: 'password_seed_trump_iran_ceasefire_over_naval_blockade_wsj',

  datePublished: '2026-07-08',

  intro: [
    '트럼프 대통령이 이란과의 휴전 종료와 해상 봉쇄 가능성을 언급한 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 그는 이란의 지도자들을 “쓰레기”(**scum**), “거짓말쟁이들”(**liars**), 그리고 “잔인하고 폭력적인 사람들”(**vicious, violent people**)이라고 불렀습니다.',
      ],
    },
    {
      narrative: [
        '2. 트럼프는 경제적 압박을 강화하기 위해(**to ramp up economic pressure**) 이란에 대한 해상 봉쇄를 다시 도입하는 것(**reimposing a naval blockade on Iran**)을 고려하고 있다고 말했습니다.',
      ],
    },
    {
      narrative: [
        '3. 그는 전력 시설과 담수화 시설 같은 민간 기반 시설을 표적으로 삼을 가능성도 제기했습니다(**raised the prospect of targeting civilian infrastructure such as electricity and desalination plants**).',
      ],
    },
    {
      narrative: [
        '4. 하지만 나중에 그는 전면전으로 다시 돌아갈 가능성(**a return to full-blown war**)은 낮다고 생각한다고 말했습니다.',
      ],
    },
  ],

  source: {
    text: 'WSJ | Trump Says Ceasefire With Iran Is Over After Latest Attacks | By Robbie Gramer, Brian Schwartz and Jared Malsin',
    url: 'https://www.wsj.com/world/trump-says-ceasefire-with-iran-is-over-6cf9675e?mod=hp_trendingnow_article_pos3',
  },

  youtube: 'https://www.youtube.com/watch?v=9KxY7BNiWKw',
};

// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
