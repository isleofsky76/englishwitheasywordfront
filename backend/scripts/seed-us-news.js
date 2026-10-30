/**
 * 미국뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-us-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadUsNews } from './us-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '갑자기 모두가 듣고 싶어 하는 하버드의 혹독한 수업',

  slug: 'ungodly-humanities-pace-segue-fever-related-words',

  metaDescription:
    'The Wall Street Journal 기사에서 추출한 시사 영단어. ungodly, humanities, pace, segue, fever, pad, hefty, verboten, canon, frayed, disdain, conceive, lofty, tonic, newness, relish.',

  password: 'seed_us_news_ungodly-humanities-pace-segue-fever',

  datePublished: '2026-10-27',

  intro: [
    '갑자기 모두가 듣고 싶어 하는 하버드의 혹독한 수업 주제를 다룬 The Wall Street Journal 기사에서 주요 시사 영단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      narrative: [
        '1. an ungodly amount of reading (**ungodly**) / 엄청난 양의 독서 cf. ungodly: 터무니없이 많은, 엄청난 (형) ※ 원래 “신을 따르지 않는, 불경한”(un+godly) → “말도 안 되게 많은, 지독한”',
      ],
    },
    {
      narrative: [
        '2. So why are freshmen lining up to get into Humanities 10? (**humanities**) / 그렇다면 왜 신입생들은 ‘인문학 10’을 들으려고 줄을 서는 걸까? cf. humanities: 인문학 (명)',
      ],
    },
    {
      narrative: [
        '3. Samantha Matherne paced as she marked up on a white board... (**pace**) / 사만다 매서른은 화이트보드에 필기하며 왔다 갔다 했다. cf. pace: 서성거리다, 왔다 갔다 하다 (동)',
      ],
    },
    {
      narrative: [
        '4. with segues into Adam Smith and Immanuel Kant (**segue**) / 애덤 스미스와 이마누엘 칸트 이야기로 자연스럽게 넘어가며 cf. segue: 자연스러운 전환 (명)',
      ],
    },
    {
      narrative: [
        "5. It's a fever that even the professors are struggling to explain. (**fever**) / 교수들조차 설명하기 어려워하는 열풍이다. cf. fever: 열풍, 열기 (명)",
      ],
    },
    {
      narrative: [
        '6. The class is definitely not for padding the GPA. (**pad**) / 이 수업은 분명 평균 학점을 손쉽게 높이기 위한 수업이 아니다. cf. pad: 부풀리다, (날조하여) 덧붙이다 (동)',
      ],
    },
    {
      narrative: [
        '7. Students read a hefty book a week (**hefty**) / 학생들은 매주 두툼한 책 한 권을 읽는다. cf. hefty: 많은, 두둑한, 분량이 상당한 (형)',
      ],
    },
    {
      narrative: [
        '8. Digital devices are verboten (**verboten**) / 디지털 기기는 금지된다. cf. verboten: 금지된 (형)',
      ],
    },
    {
      narrative: [
        '9. "Western Civ," "Great Books" and "the canon" (**canon**) / ‘서양 문명’, ‘위대한 저서들’, 그리고 ‘정전’ cf. canon: 주요 문헌[작품] 목록, (음악의) 캐논 (명)',
      ],
    },
    {
      narrative: [
        '10. the need to combat frayed attention spans (**frayed**) / 약해진 집중력에 맞서야 할 필요성 cf. frayed: 닳고 약해진, 흐트러진 (형)',
      ],
    },
    {
      narrative: [
        '11. Several mentioned with disdain (**disdain**) / 몇몇은 경멸하는 태도로 언급했다. cf. disdain: 경멸, 업신여김 (명)',
      ],
    },
    {
      narrative: [
        '12. Hum 10 was conceived as a Harvard twist (**conceive**) / Hum 10은 하버드식 변형으로 구상되었다. cf. conceive: 구상하다, 고안하다 (동)',
      ],
    },
    {
      narrative: [
        "13. Harvard's loftiest faculty members (**lofty**) / 하버드에서 가장 명망 높은 교수들 cf. lofty: 지위나 명성이 높은 (형)",
      ],
    },
    {
      narrative: [
        '14. exposure to first-years is a tonic (**tonic**) / 신입생들을 접하는 것은 활력소다. cf. tonic: 활력을 주는 것, 활력소 (명)',
      ],
    },
    {
      narrative: [
        '15. their enthusiasm and the newness of it all (**newness**) / 그들의 열정과 그 모든 것의 새로움 cf. newness: 새로움 (명)',
      ],
    },
    {
      narrative: [
        '16. students seemed to especially relish debating their classmates (**relish**) / 학생들은 특히 급우들과 토론하는 것을 즐기는 듯했다. cf. relish: 크게 즐기다, 만끽하다 (동)',
      ],
    },
  ],

  wordMeta: [
    { num: 1, expression: 'ungodly', meaning: '터무니없이 많은, 엄청난', exampleEn: 'an ungodly amount of reading', exampleKo: '엄청난 양의 독서' },
    { num: 2, expression: 'humanities', meaning: '인문학', exampleEn: 'So why are freshmen lining up to get into Humanities 10?', exampleKo: "그렇다면 왜 신입생들은 '인문학 10'을 들으려고 줄을 서는 걸까?" },
    { num: 3, expression: 'pace', meaning: '서성거리다, 왔다 갔다 하다', exampleEn: 'Samantha Matherne paced as she marked up on a white board...', exampleKo: '사만다 매서른은 화이트보드에 필기하며 왔다 갔다 했다.' },
    { num: 4, expression: 'segue', meaning: '자연스러운 전환', exampleEn: 'with segues into Adam Smith and Immanuel Kant', exampleKo: '애덤 스미스와 이마누엘 칸트 이야기로 자연스럽게 넘어가며' },
    { num: 5, expression: 'fever', meaning: '열풍, 열기', exampleEn: "It's a fever that even the professors are struggling to explain.", exampleKo: '교수들조차 설명하기 어려워하는 열풍이다.' },
    { num: 6, expression: 'pad', meaning: '부풀리다, (날조하여) 덧붙이다', exampleEn: 'The class is definitely not for padding the GPA.', exampleKo: '이 수업은 분명 평균 학점을 손쉽게 높이기 위한 수업이 아니다.' },
    { num: 7, expression: 'hefty', meaning: '많은, 두둑한, 분량이 상당한', exampleEn: 'Students read a hefty book a week', exampleKo: '학생들은 매주 두툼한 책 한 권을 읽는다.' },
    { num: 8, expression: 'verboten', meaning: '금지된', exampleEn: 'Digital devices are verboten', exampleKo: '디지털 기기는 금지된다.' },
    { num: 9, expression: 'canon', meaning: '주요 문헌[작품] 목록, (음악의) 캐논', exampleEn: '"Western Civ," "Great Books" and "the canon"', exampleKo: "'서양 문명', '위대한 저서들', 그리고 '정전'" },
    { num: 10, expression: 'frayed', meaning: '닳고 약해진, 흐트러진', exampleEn: 'the need to combat frayed attention spans', exampleKo: '약해진 집중력에 맞서야 할 필요성' },
    { num: 11, expression: 'disdain', meaning: '경멸, 업신여김', exampleEn: 'Several mentioned with disdain', exampleKo: '몇몇은 경멸하는 태도로 언급했다.' },
    { num: 12, expression: 'conceive', meaning: '구상하다, 고안하다', exampleEn: 'Hum 10 was conceived as a Harvard twist', exampleKo: 'Hum 10은 하버드식 변형으로 구상되었다.' },
    { num: 13, expression: 'lofty', meaning: '지위나 명성이 높은', exampleEn: "Harvard's loftiest faculty members", exampleKo: '하버드에서 가장 명망 높은 교수들' },
    { num: 14, expression: 'tonic', meaning: '활력을 주는 것, 활력소', exampleEn: 'exposure to first-years is a tonic', exampleKo: '신입생들을 접하는 것은 활력소다.' },
    { num: 15, expression: 'newness', meaning: '새로움', exampleEn: 'their enthusiasm and the newness of it all', exampleKo: '그들의 열정과 그 모든 것의 새로움' },
    { num: 16, expression: 'relish', meaning: '크게 즐기다, 만끽하다', exampleEn: 'students seemed to especially relish debating their classmates', exampleKo: '학생들은 특히 급우들과 토론하는 것을 즐기는 듯했다.' },
  ],

  source: {
    text: 'The Wall Street Journal | The Brutal Harvard Class That Suddenly Everyone Wants to Take | By Pamela Paul | Oct. 27, 2026',
    url: 'https://www.wsj.com/lifestyle/harvard-class-humanities-32e06366?mod=WSJ_home_feature_6_pos_3',
  },

  youtube: 'https://www.youtube.com/shorts/2ThTdQFo2uM',
  videoId: '2ThTdQFo2uM',
};
// ===============================

uploadUsNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
