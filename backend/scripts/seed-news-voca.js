/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '조부모님들은 아프신 곳이 많지만 손주들을 위해 쓸 돈은 더 많다',

  slug: 'aches-and-pains-caregiver-grandparenthood-milestone-ailment-related-words',

  metaDescription:
    'WSJ 기사에서 추출한 고령 조부모·손주·건강·돌봄 관련 시사 영단어. aches and pains, caregiver, degenerative spine condition, grandparenthood, child care, median age, milestone, healthy life expectancy, arthritis, cataract, ailment, walker, back brace, stroller, health scare 등.',

  password: 'seed_news_aches-and-pains-caregiver-grandparenthood-related-words',

  datePublished: '2026-10-24',

  intro: [
    '조부모가 되는 시기가 늦어지면서 건강 부담은 커지지만 손주를 위한 경제적 지원은 늘었다는 월스트리트저널(WSJ) 기사에서 주요 시사 영단어를 정리합니다. 돌봄, 건강수명, 관절염·백내장 등 질환과 관련된 표현을 살펴봅니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. 나이가 많은 조부모는 몸 여기저기의 쑤심과 통증(**aches and pains**)이 더 많지만, 손주를 위해 쓸 돈도 더 많다. cf. aches and pains: 몸 여기저기의 쑤심과 통증',
      ],
    },
    {
      narrative: [
        '2. 성인들은 종종 중요한 돌봄 역할(**caregivers**)을 맡는다. cf. caregiver: 돌보는 사람',
      ],
    },
    {
      narrative: [
        '3. 그는 함께하는 시간을 제한할지도 모른다고 걱정한 퇴행성 척추 질환(**degenerative spine condition**)이 있었다. cf. degenerative spine condition: 퇴행성 척추 질환',
      ],
    },
    {
      narrative: [
        '4. 조부모가 되는 시기가 늦어지면(**Delayed grandparenthood**) 손주 삶에 활발히 참여할 수 있는 건강한 기간이 줄어들 수 있다. cf. grandparenthood: 조부모가 되는 것, 조부모로서의 삶',
      ],
    },
    {
      narrative: [
        '5. 무료 육아(**child care**) 제공을 포함한 지원이 이뤄진다. cf. child care: 육아, 아이 돌봄',
      ],
    },
    {
      narrative: [
        '6. 할머니가 되는 중위 연령(**median age**)은 44세였다. cf. median age: 중위 연령',
      ],
    },
    {
      narrative: [
        '7. 그 중요한 단계(**milestone**)는 이제 57세로 건너뛴다. cf. milestone: 중요한 단계·사건',
      ],
    },
    {
      narrative: [
        '8. 건강수명(**healthy life expectancy**)이 늘어난 점을 감안해도, 손주와 보내는 건강한 해는 약 3분의 1 줄어든다. cf. healthy life expectancy: 건강수명',
      ],
    },
    {
      narrative: [
        '9. 그는 무릎 관절염(**arthritis**)과 최근 백내장 수술을 관리하면서도 손주와 시간을 보낸다. cf. arthritis: 관절염',
      ],
    },
    {
      narrative: [
        '10. 최근 백내장(**cataract**) 수술을 받은 상태였다. cf. cataract: 백내장',
      ],
    },
    {
      narrative: [
        '11. 질환(**ailments**) 때문에 원하는 만큼 깊게 관여하기 어려워질 수 있다. cf. ailment: 질환, 몸의 불편',
      ],
    },
    {
      narrative: [
        '12. David Andrus는 보행 보조기(**walker**)와 허리 보조기를 사용한다. cf. walker: 보행 보조기',
      ],
    },
    {
      narrative: [
        '13. 그는 보행 보조기와 허리·등 보조기(**back brace**)를 사용한다. cf. back brace: 허리·등 보조기',
      ],
    },
    {
      narrative: [
        '14. 앞마당에서 유모차(**stroller**)의 아기를 돌본다. cf. stroller: 유모차',
      ],
    },
    {
      narrative: [
        '15. 건강 문제로 크게 걱정하게 되는 일(**health scares**)이 있어도, David와 Martha는 조부모가 된 것이 인생에서 가장 행복한 순간을 만들었다고 했다. cf. health scare: 건강 문제로 크게 걱정하게 되는 일',
      ],
    },
  ],

  source: {
    text: 'The Wall Street Journal | Older Grandparents Have More Aches and Pains—and More Money for Grandkids | By Rachel Wolfe',
    url: 'https://www.wsj.com/lifestyle/relationships/older-grandparents-have-more-aches-and-painsand-more-money-for-grandkids-d1c4f76d',
  },

  youtube: 'https://youtube.com/shorts/sTzUOIMuHwE',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
