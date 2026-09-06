/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '기내 난동 승객 제압',

  slug: 'disruptive-passenger-duct-taped-emergency-landing-cnn',

  metaDescription:
    'CNN 기사에서 추출한 기내 난동 승객 관련 문장. disruptive passenger, restrained with flexible handcuffs, acting up again, belligerent, increasingly agitated, using profanity.',

  password: 'password_seed_disruptive_passenger_duct_taped_emergency_landing_cnn',

  datePublished: '2026-09-04',

  intro: [
    '기내 난동 승객이 제압된 뒤 비행기가 비상 착륙했다는 CNN 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 난동 승객은 유연한 수갑으로 결박되었고(**was restrained with flexible handcuffs**), 좌석에 덕트테이프로 고정됐습니다(**duct-taped to a seat**).',
      ],
    },
    {
      narrative: [
        '2. 그는 그 남성이 다시 말썽을 부리기 시작했기 때문에(**because the man started acting up again**) 서둘러 돌아와야 했습니다(**had to quickly return**).',
      ],
    },
    {
      narrative: [
        '3. 일등석에서 그들보다 두 줄 뒤에 있던 한 남성이(**A man two rows behind them in the first-class section**) 점점 공격적인 태도를 보이기 시작했습니다(**started to become belligerent**).',
      ],
    },
    {
      narrative: [
        '4. 그 남성은 점점 더 흥분했고(**got increasingly agitated**), 옆 승객을 때리기 시작한 뒤(**started to hit the passenger next to him**) 말리려던 여성까지 폭행했습니다(**hit a woman who tried to intervene**).',
      ],
    },
    {
      narrative: [
        '5. 그는 폭력적으로 변하기 시작하고 있었고(**was starting to become abusive**), 욕설도 사용하기 시작했습니다(**started using profanity**).',
      ],
    },
    {
      narrative: [
        '6. 물리적으로 그의 움직임을 확실히 제한하긴 했지만(**Physically it lessened his ability to move for sure**), 문제 자체를 해결하지는 못했습니다(**it did not solve the issue**).',
      ],
    },
  ],

  source: {
    text: 'CNN | Disruptive passenger duct-taped to first-class seat as plane makes emergency landing | By Aaron Cooper and Taylor Galgano',
    url: 'https://edition.cnn.com/2026/09/04/us/disruptive-passenger-duct-tape',
  },

  youtube: 'https://youtube.com/shorts/siyII6zf6SU',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
