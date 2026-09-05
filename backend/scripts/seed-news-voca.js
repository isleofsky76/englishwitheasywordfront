/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '메시가 페널티킥에 약한 이유',

  slug: 'messi-penalty-kicks-argentina-world-cup-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 메시 페널티킥 관련 문장. strips away, flexes his genius, no dribbling, wide array of tricks, deceive the goalkeeper.',

  password: 'password_seed_messi_penalty_kicks_argentina_world_cup_wsj',

  datePublished: '2026-07-08',

  intro: [
    '메시가 페널티킥 상황에서 평소의 장점을 충분히 발휘하기 어렵다는 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 페널티킥이라는 바로 그 행위 자체는(**The very exercise of the penalty kick**) 메시가 평소 자신의 천재성을 발휘하는(**where Messi usually flexes his genius**) 경기의 많은 요소를 빼앗아 버립니다(**strips away many parts of the game**).',
      ],
    },
    {
      narrative: [
        '2. 여기에는 드리블도 없고(**There\\'s no dribbling here**), 갑작스러운 방향 전환도 없으며(**no sudden change of direction**), 섬세한 터치로 인한 흐릿한 움직임도 없습니다(**blur of delicate touches**).',
      ],
    },
    {
      narrative: [
        '3. 메시에게는 골키퍼를 속이는 데 이용할 수 있는 매우 다양한 기술들이 여전히 있습니다(**a wide array of tricks available to deceive the goalkeeper**).',
      ],
    },
    {
      narrative: [
        '4. 하지만 그가 할 수 있는 전부가 공을 한 번 터치하는 것일 때(**when all he can do is touch the ball one time**), 그는 확실히 덜 위협적입니다(**distinctly less terrifying**).',
      ],
    },
  ],

  source: {
    text: 'WSJ | Lionel Messi Is the Greatest Player Ever. Why Is He So Bad at Penalty Kicks?',
    url: 'https://www.wsj.com/sports/soccer/messi-penalty-kicks-argentina-world-cup-9e29a4aa?mod=hp_listb_pos2',
  },

  youtube: 'https://youtube.com/shorts/smRtivaoPDk',
};

// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
