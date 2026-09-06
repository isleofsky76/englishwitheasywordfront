/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '평범한 사업의 백만장자들',

  slug: 'american-dream-minting-millionaires-main-street-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 평범한 사업과 백만장자 관련 문장. beaver-themed paraphernalia, tactile Main Street industries, incremental innovation, competence nor grit, prerequisite, staggeringly high.',

  password: 'password_seed_american_dream_minting_millionaires_main_street_wsj',

  datePublished: '2026-09-04',

  intro: [
    '평범한 지역 사업에서도 점진적 혁신과 끈기로 큰 부를 만들 수 있다는 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 버키스 여행자 센터들은 바비큐와 화장실, 비버 테마의 용품들(**beaver-themed paraphernalia**)로 높이 평가받고 있습니다(**are revered for**).',
      ],
    },
    {
      narrative: [
        '2. 분석에 따르면(**According to our analysis**), 미국의 총 31조 달러 규모 민간 사업 자산 중 거의 절반은(**nearly half**) 촉각을 이용한 메인 스트리트 산업(**tactile, Main Street industries**)에 있습니다.',
      ],
    },
    {
      narrative: [
        '3. 경제 성장의 핵심인 변혁적 혁신과는 달리(**Unlike the transformational innovation central to economic growth**), 일상 속 백만장자들의 혁신은 대개 더 점진적입니다(**often more incremental**).',
      ],
    },
    {
      narrative: [
        '4. 능력도 투지도(**Neither competence nor grit**) 은행 계좌처럼 안정적으로 물려줄 수는 없습니다(**can be passed down as reliably as a bank account**).',
      ],
    },
    {
      narrative: [
        "5. 엘리트 학위는 막대한 부를 쌓기 위한 필수 전제 조건이 아닙니다(**aren't a prerequisite for building massive wealth**).",
      ],
    },
    {
      narrative: [
        '6. 그 고객들의 갱신율은 믿기 힘들 정도로 높아서(**was staggeringly high**), 반복적으로 발생하는 수익 기반을 보장했습니다(**ensuring a recurring base of revenue**).',
      ],
    },
  ],

  source: {
    text: "WSJ | The American Dream Is Alive. And It's Minting Millionaires. | By Eric Zwick and Owen Zidar",
    url: 'https://www.wsj.com/business/entrepreneurship/the-american-dream-is-alive-and-its-minting-millionaires-3903775b?mod=hp_featst_pos3',
  },

  youtube: 'https://youtube.com/shorts/IqhbzjgZ6C8',
};
// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
