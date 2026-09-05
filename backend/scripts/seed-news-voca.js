/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '랍스터 보트로 보는 메인주 해안',

  slug: 'lobster-boat-best-way-see-maine-coast-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 메인주 해안 여행 문장. deep-drafted ships, steer clear of, craggy shoreline, aboard smaller boats, glimpse at life.',

  password: 'password_seed_lobster_boat_best_way_see_maine_coast_wsj',

  datePublished: '2026-07-15',

  intro: [
    '메인주의 해안은 작은 배를 타고 볼 때 더 잘 경험할 수 있다는 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 메인주를 방문하는 크루즈 여행객들은, 그들이 탄 흘수가 깊은 대형 선박이(**deep-drafted ships**) 울퉁불퉁한 해안선을 피할 때(**steer clear of the craggy shoreline**), 숨겨진 위험 요소만 피하는 것이 아니라 특별한 것의 상당 부분도 놓친다는 사실을 깨닫지 못할 수도 있습니다.',
      ],
    },
    {
      narrative: [
        '2. 메인주의 해안은 호화 여객선의 유리창 너머에서가 아니라(**rather than from behind the glass of a luxury liner**), 현지인들이 운항하는 작은 배에 올라타(**aboard smaller boats run by locals**) 해수면 높이에서(**at sea level**) 경험할 때 가장 진가를 느낄 수 있습니다.',
      ],
    },
    {
      narrative: [
        '3. 이 작은 섬의 절반 정도는 아카디아 국립공원에 속해 있지만(**is part of Acadia National Park**), 약 60명의 주민이 연중 거주하는 곳이기도 합니다(**year-round residents**).',
      ],
    },
    {
      narrative: [
        '4. 우편선 운항에 참여하면(**Joining a mail-boat run**), 이 외딴 마을의 삶을 엿볼 수 있습니다(**offers a glimpse at life in the remote community**).',
      ],
    },
  ],

  source: {
    text: 'WSJ | A Trip on a Lobster Boat Is One of the Best Ways to See Maine’s Coast | By Jen Rose Smith',
    url: 'https://www.wsj.com/lifestyle/travel/lobster-boat-mailboat-maine-2a1c0704',
  },

  youtube: 'https://www.youtube.com/watch?v=Xcpk2VqGAzA',
};

// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
