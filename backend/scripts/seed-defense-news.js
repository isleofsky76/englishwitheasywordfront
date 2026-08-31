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
  title: 'destroyer 구축함 연관 단어 정리 | adrift · casualty · morale · consequential',

  slug: 'destroyer-related-words',

  metaDescription:
    'destroyer(구축함), adrift(표류하는), strain(부담), casualty(뜻하지 않은 사고), galley(선박의 주방), morale(사기), consequential(중대한) 등 미 해군 관련 시사 어휘를 정리합니다.',

  password: 'seed_defense_destroyer-related-words',

  datePublished: '2026-08-31',

  intro: [
    '미 해군 구축함의 표류 사고와 장기 파병, 승조원들의 근무 환경을 다룬 기사에서 사용된 국방·해군 관련 시사 어휘를 정리합니다.',

    '**Source:** The Guardian. All rights belong to the original creator.',
  ],

  words: [
    {
      title: '1. destroyer',
      narrative: [
        'destroyer(dɪˈstrɔɪər / 디스트로이어)는 **구축함**이라는 뜻입니다.',

        '*A US guided-missile destroyer.*',

        '**A US guided-missile destroyer** 미국의 유도미사일 구축함.',
      ],
    },

    {
      title: '2. adrift',
      narrative: [
        'adrift(əˈdrɪft / 어드리프트)는 **표류하는**, **동력을 잃고 떠도는**이라는 뜻입니다.',

        '*Reportedly spent four days adrift.*',

        '**Reportedly spent** 보도에 따르면 보냈다 / **four days adrift** 표류한 채 나흘을.',
      ],
    },

    {
      title: '3. strain',
      narrative: [
        'strain(streɪn / 스트레인)은 **부담**, **압박**이라는 뜻입니다.',

        '*Furthering concerns about strain being placed on deployed military members.*',

        '**Furthering concerns** 우려를 더욱 키우며 / **about strain being placed** 부담이 가해지는 것에 대한 / **on deployed military members** 파병된 군인들에게.',
      ],
    },

    {
      title: '4. casualty',
      narrative: [
        'casualty(ˈkæʒuəlti / 캐주얼티)는 **뜻하지 않은 사고**, **사상자**라는 뜻입니다.',

        '*An engineering casualty involving its generators.*',

        '**An engineering casualty** 기관 설비 사고 / **involving its generators** 발전기와 관련된.',
      ],
    },

    {
      title: '5. galley',
      narrative: [
        'galley(ˈɡæli / 갤리)는 **선박의 주방**이라는 뜻입니다.',

        '*That loss of power meant sailors were without galley services, toilets and air conditioning.*',

        '**That loss of power meant** 그 전력 상실은 의미했다 / **sailors were without galley services** 선원들이 주방 서비스를 이용하지 못하고 / **toilets and air conditioning** 화장실과 냉방 시설도 이용하지 못했다는 것을.',
      ],
    },

    {
      title: '6. grit',
      narrative: [
        'grit(ɡrɪt / 그릿)은 **투지**, **끈기**라는 뜻입니다.',
      ],
    },

    {
      title: '7. account',
      narrative: [
        'account(əˈkaʊnt / 어카운트)는 **기사**, **설명**, **진술**, **보도 내용**이라는 뜻입니다.',

        '*Hegseth has rejected the accounts, calling them “completely misrepresented”.*',

        '**Hegseth has rejected the accounts** 헤그세스는 해당 보도 내용을 부인했다 / **calling them “completely misrepresented”** 그것이 “완전히 잘못 전달됐다”고 말하며.',
      ],
    },

    {
      title: '8. stretch',
      narrative: [
        'stretch(stretʃ / 스트레치)는 **잡아 늘이다**, **잡아당기다**라는 뜻입니다.',
      ],
    },

    {
      title: '9. relieve',
      narrative: [
        'relieve(rɪˈliːv / 릴리브)는 **교대하다**, **부담을 덜어주다**라는 뜻입니다.',

        '*To relieve the USS Abraham Lincoln.*',

        '**To relieve** 교대하기 위해 / **the USS Abraham Lincoln** USS 에이브러햄 링컨함을.',
      ],
    },

    {
      title: '10. deployment',
      narrative: [
        'deployment(dɪˈplɔɪmənt / 디플로이먼트)는 **파병**, **배치**라는 뜻입니다.',

        '*Extended deployments.*',

        '**Extended deployments** 연장된 파병.',
      ],
    },

    {
      title: '11. recount',
      narrative: [
        'recount(rɪˈkaʊnt / 리카운트)는 **자세히 이야기하다**라는 뜻입니다.',

        '*A retired admiral who recounted being on ships for “much longer”.*',

        '**A retired admiral** 한 퇴역 제독은 / **who recounted being on ships** 함정에 있었다고 자세히 이야기했다 / **for “much longer”** “훨씬 더 오랫동안”.',
      ],
    },

    {
      title: '12. morale',
      narrative: [
        'morale(məˈræl / 머랠)는 **사기**, **의욕**이라는 뜻입니다.',

        '*Poor morale.*',

        '**Poor morale** 저하된 사기.',
      ],
    },

    {
      title: '13. austere',
      narrative: [
        'austere(ɔːˈstɪr / 오스티어)는 **금욕적인**, **내핍 생활을 하는**이라는 뜻입니다.',

        '*Austere conditions.*',

        '**Austere conditions** 열악하고 엄격한 생활 환경.',
      ],
    },

    {
      title: '14. ideation',
      narrative: [
        'ideation(ˌaɪdiˈeɪʃən / 아이디에이션)은 **관념 작용**, **상상하기**라는 뜻입니다.',
      ],
    },

    {
      title: '15. consequential',
      narrative: [
        'consequential(ˌkɑːnsəˈkwenʃəl / 칸서퀜셜)은 **중대한**이라는 뜻입니다.',

        '*History will record this deployment as one of the most consequential of the modern era.*',

        '**History will record this deployment** 역사는 이번 파병을 기록할 것이다 / **as one of the most consequential** 가장 중대한 사례 중 하나로 / **of the modern era** 현대의.',
      ],
    },

    {
      title: '16. stressor',
      narrative: [
        'stressor(ˈstresər / 스트레서)는 **스트레스 요인**, **압박 요인**이라는 뜻입니다.',
      ],
    },
  ],

  source:
    'https://www.theguardian.com/us-news/2026/aug/17/us-navy-destroyer-south-china-sea',

  youtube:
    'https://www.youtube.com/watch?v=ICkppDs5-CE&list=PLSlq2Lkls6sY&index=7',
};

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
