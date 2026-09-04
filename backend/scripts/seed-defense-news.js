/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title:
    '동력을 상실한 미 해군 구축함이 남중국해에서 나흘 동안 표류(US navy destroyer adrift in South China Sea for four days after losing power)',

  slug: 'destroyer-related-words',

  metaDescription:
    'The Guardian 기사에서 추출한 표현. destroyer, adrift, engineering casualty, galley, deployment, morale, consequential 등.',

  password: 'seed_defense_destroyer-related-words',

  datePublished: '2026-08-31',

  intro: [
    '이 표현들은 더 가디언지의 "US navy destroyer adrift in South China Sea for four days after losing power"에서 추출한 표현들입니다.',
  ],

  words: [
    {
      title: '1',
      narrative: [
        '구축함(**destroyer**) USS Benfold가 남중국해에서 동력을 잃고 표류(**adrift**)했다.',
      ],
    },
    {
      title: '2',
      narrative: [
        '기계 사고(**engineering casualty**)로 발전기가 고장 났다.',
      ],
    },
    {
      title: '3',
      narrative: [
        '선원들은 선박 주방(**galley**) 서비스를 사용할 수 없었다.',
      ],
    },
    {
      title: '4',
      narrative: [
        '배가 견인(**towed**)되어 필리핀으로 옮겨졌다.',
      ],
    },
    {
      title: '5',
      narrative: [
        '2일 후 동력이 복구(**restored**)되었다.',
      ],
    },
    {
      title: '6',
      narrative: [
        '파병된 군인들에게 가해지는 부담(**strain being placed**)에 대한 우려가 높아지고 있다.',
      ],
    },
    {
      title: '7',
      narrative: [
        '선원들이 투지(**grit**)와 탄력성(**resilience**)을 보여주었다.',
      ],
    },
    {
      title: '8',
      narrative: [
        '장기 파병(**deployment**)은 선원들과 가족에게 상당한 부담을 준다.',
      ],
    },
    {
      title: '9',
      narrative: [
        'USS Abraham Lincoln의 낮은 사기(**low morale**)가 문제가 되었다.',
      ],
    },
    {
      title: '10',
      narrative: [
        '보도(**accounts**)에 따르면 일부 선원들이 배에서 뛰어내리려 했다.',
      ],
    },
    {
      title: '11',
      narrative: [
        '국방장관은 이러한 보도가 완전히 잘못 표현되었다고 거부(**rejected**)했다.',
      ],
    },
    {
      title: '12',
      narrative: [
        '금욕적인 조건(**austere conditions**)에서 근무하는 선원들은 놀라운 일을 하고 있다.',
      ],
    },
    {
      title: '13',
      narrative: [
        '자살 관념(**suicidal ideation**)이 증가했다는 보고는 없다.',
      ],
    },
    {
      title: '14',
      narrative: [
        '쿠퍼 제독은 이 파병(**deployment**)이 현대사에서 가장 중대한(**consequential**) 임무 중 하나라고 했다.',
      ],
    },
    {
      title: '15',
      narrative: [
        '트럼프는 한국과의 군사훈련을 대폭 축소(**substantially reduce**)하라고 지시했다.',
      ],
    },
    {
      title: '16',
      narrative: [
        '다른 배가 교대(**relieve**)하기 위해 중동으로 향하고 있다.',
      ],
    },
    {
      title: '17',
      narrative: [
        '은퇴한 해병은 더 오래 배에 탔다고 회상(**recounted**)했다.',
      ],
    },
    {
      title: '18',
      narrative: [
        '가족들은 선원 배치(**deployed**)에 대한 트럼프 행정부의 태도에 분노하고 있다.',
      ],
    },
  ],

  source: 'https://www.theguardian.com/us-news/2026/aug/17/us-navy-destroyer-south-china-sea',

  youtube: 'https://www.youtube.com/watch?v=ICkppDs5-CE',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
