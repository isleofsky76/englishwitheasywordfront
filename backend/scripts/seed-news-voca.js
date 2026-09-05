/**
 * News Voca (guestbook) 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[WSJ] 동물이 먼저인 갈라파고스 제도 | 이구아나 때문에 멈추는 공항버스',

  slug: 'galapagos-islands-animals-come-first-wsj',

  metaDescription:
    'WSJ 기사에서 추출한 갈라파고스 문장. approaching the front desk, painful news, three hours early, iguana incident.',

  password: 'password_seed_galapagos_islands_animals_come_first_wsj',

  datePublished: '2026-07-13',

  intro: [
    '동물이 언제나 최우선인 섬들이라는 월스트리트 저널의 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 갈라파고스 제도 산타크루즈 섬에서 호텔 프런트 데스크에 다가갔을 때(**approaching our hotel\'s front desk**), 제 여행 동반자인 기돈 오펙과 저는 다소 고통스러운 소식을 들었습니다(**received some painful news**).',
      ],
    },
    {
      narrative: [
        '2. 오전 9시 비행기를 타려면 무려 세 시간이나 일찍(**a full three hours early**) 떠나야 한다는 것이었습니다(**we needed to leave**).',
      ],
    },
    {
      narrative: [
        '3. 접수 담당자는 지연 이유를 부드럽게 설명했습니다(**gently explained**).',
      ],
    },
    {
      narrative: [
        '4. 차에 치인 이구아나와 관련된 사고 때문에(**due to an incident involving a run-over iguana**) 운행하는 버스가 한 대 줄었다는 것이었습니다.',
      ],
    },
  ],

  source: {
    text: 'WSJ | The Islands Where Animals Always Come First | By Jenna Belhumeur',
    url: 'https://www.wsj.com/lifestyle/travel/galapagos-islands-animals-constitution-ecuador-2e2be959',
  },

  youtube: 'https://www.youtube.com/watch?v=dVlmAFLq2og',
};

// ===============================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
