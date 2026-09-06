/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '클랜시 재판 논란',

  slug: 'lindsay-clancy-murder-trial-victim-or-criminal-bbc',

  metaDescription:
    'BBC 기사에서 추출한 클랜시 재판 관련 문장. transfixed and divided, postpartum psychosis, declared a mistrial, mirrored the wider discourse, precluded criminal liability, railed against toxic empathy.',

  password: 'password_seed_lindsay_clancy_murder_trial_victim_or_criminal_bbc',

  datePublished: '2026-09-05',

  intro: [
    '클랜시 재판이 미국 사회에서 정신질환과 형사 책임을 둘러싼 논쟁을 불러일으켰다는 BBC 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 그 재판은 클랜시가 피해자인지 감옥에 가야 하는 범죄자인지에 대해(**whether Clancy was a victim or a criminal who deserved to be behind bars**) 전국의 시선을 사로잡았고 국민을 분열시켰습니다(**transfixed and divided the nation**).',
      ],
    },
    {
      narrative: [
        '2. 36세 간호사의 변호인단은 그녀가 산후 정신병을 앓고 있었다고 주장했습니다(**had been suffering from postpartum psychosis**).',
      ],
    },
    {
      narrative: [
        '3. 판사는 배심원들이 만장일치 판단에 실패한 후(**after jurors failed to come to a unanimous decision**) 금요일 심리 무효를 선언했습니다(**declared a mistrial**).',
      ],
    },
    {
      narrative: [
        '4. 그들이 합의하지 못한 상황은(**Their inability to agree**) 이 재판을 둘러싼 더 넓은 사회적 논쟁을 그대로 반영했습니다(**mirrored the wider discourse around the trial**).',
      ],
    },
    {
      narrative: [
        '5. 하지만 그들 중 일부는 산후 정신병이 클랜시의 형사 책임을 배제한다는 주장(**postpartum psychosis precluded Clancy from criminal liability**)에 이의를 제기하는 듯했습니다(**seemed to dispute**).',
      ],
    },
    {
      narrative: [
        '6. 하지만 텍사스의 한 어머니 러셀과 같은 다른 부모들은 “해로운 공감”을 격렬하게 비난했습니다(**railed against "toxic empathy"**).',
      ],
    },
    {
      narrative: [
        '7. 많은 사용자들은 그 사건이 언급되지 않는 플랫폼을 찾는 데 애를 먹었습니다(**being hard-pressed to find a platform where the case was not being mentioned**).',
      ],
    },
  ],

  source: {
    text: 'BBC | Lindsay Clancy murder trial has divided US on whether she is victim or criminal | By Ana Faguy, Brandon Drenon and Sheila Flynn',
    url: 'https://www.bbc.com/news/articles/cx2z0xnw2d6o',
  },

  youtube: 'https://youtube.com/shorts/m3MTOEwThPw',
};

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
