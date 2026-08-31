/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '[BBC 국제영어] | 트럼프 대통령 주한미군 훈련 축소 cite · deployment · armistice · defuse',

  slug: 'substantially-related-words',

  metaDescription:
    'substantially(상당히), cite(이유로 들다), hostile(적대적인), deployment(병력 배치), condemn(규탄하다), armistice(정전협정), defuse(긴장을 완화하다) 등 한미 연합훈련 관련 시사 어휘를 정리합니다.',

  password: 'seed_defense_substantially-related-words',

  datePublished: '2026-08-31',

  intro: [
    '트럼프 대통령의 **한미 연합군사훈련 축소 방침과 북한·이란 전쟁·한미동맹 문제**를 다룬 BBC 기사에서 사용된 국방·외교 어휘를 정리합니다.',

    '**Source:** BBC, *Trump says US to scale back South Korea military drills after it stayed out of Iran war* — Brandon Drenon and Jake Kwon, 2026/08/17. All rights belong to the original creator.',
  ],

  words: [
    {
      title: '1. substantially',
      narrative: [
        'substantially(səbˈstænʃəli / 섭스탠셜리)는 **상당히**, **크게**라는 뜻입니다.',

        '*Substantially reduce joint military exercises.*',

        '**Substantially reduce** 상당히 줄이다 / **joint military exercises** 연합군사훈련을.',
      ],
    },

    {
      title: '2. cite',
      narrative: [
        'cite(saɪt / 사잇)는 **이유로 들다**, **사례를 제시하다**, **인용하다**라는 뜻입니다.',

        '*Citing his very good relationship with North Korea’s leader Kim Jong Un.*',

        '**Citing** 이유로 들며 / **his very good relationship** 자신의 매우 좋은 관계를 / **with North Korea’s leader Kim Jong Un** 북한 지도자 김정은과의.',
      ],
    },

    {
      title: '3. inappropriate',
      narrative: [
        'inappropriate(ˌɪnəˈproʊpriət / 이너프로프리엇)는 **부적절한**, **상황에 맞지 않는**이라는 뜻입니다.',

        '*These exercises send a signal that is totally inappropriate and hostile.*',

        '**These exercises** 이러한 훈련은 / **send a signal** 신호를 보낸다 / **that is totally inappropriate and hostile** 완전히 부적절하고 적대적인.',
      ],
    },

    {
      title: '4. hostile',
      narrative: [
        'hostile(ˈhɑːstəl / 하스틀)은 **적대적인**, **적의가 있는**이라는 뜻입니다.',

        '*A hostile military action escalates regional tensions.*',

        '**A hostile military action** 적대적인 군사 행동은 / **escalates** 고조시킨다 / **regional tensions** 지역의 긴장을.',
      ],
    },

    {
      title: '5. deployment',
      narrative: [
        'deployment(dɪˈplɔɪmənt / 디플로이먼트)는 **배치**, **전개**, **병력 파견**이라는 뜻입니다.',

        '*Deployment of troops to aid Russia’s war against Ukraine.*',

        '**Deployment of troops** 병력 배치 / **to aid Russia’s war** 러시아의 전쟁을 지원하기 위한 / **against Ukraine** 우크라이나에 대한.',
      ],
    },

    {
      title: '6. condemn',
      narrative: [
        'condemn(kənˈdem / 컨뎀)은 **강력히 비난하다**, **규탄하다**라는 뜻입니다.',

        '*Condemned the joint military drills.*',

        '**Condemned** 규탄했다 / **the joint military drills** 연합군사훈련을.',
      ],
    },

    {
      title: '7. rehearsal',
      narrative: [
        'rehearsal(rɪˈhɜːrsəl / 리허설)은 **예행연습**, **리허설**이라는 뜻입니다.',

        '*As a rehearsal for an aggressive war.*',

        '**As a rehearsal** 예행연습으로서 / **for an aggressive war** 침략 전쟁을 위한.',
      ],
    },

    {
      title: '8. diplomacy',
      narrative: [
        'diplomacy(dɪˈploʊməsi / 디플로머시)는 **외교**, **외교술**이라는 뜻입니다.',

        '*Kim’s high-profile diplomacy with Trump.*',

        '**Kim’s high-profile diplomacy** 김정은의 고위급 외교 / **with Trump** 트럼프와의.',
      ],
    },

    {
      title: '9. hesitance',
      narrative: [
        'hesitance(ˈhezɪtəns / 헤지턴스)는 **망설임**, **주저함**이라는 뜻입니다.',

        '*Displeasure with other allies for their hesitance to get involved in the conflict.*',

        '**Displeasure with other allies** 다른 동맹국들에 대한 불만 / **for their hesitance** 그들이 주저한다는 이유로 / **to get involved in the conflict** 분쟁에 개입하기를.',
      ],
    },

    {
      title: '10. precedent',
      narrative: [
        'precedent(ˈpresɪdənt / 프레서던트)는 **선례**, **전례**라는 뜻입니다.',

        '*Trump’s move to downsize joint military exercises with South Korea is not without precedent.*',

        '**Trump’s move** 트럼프의 움직임은 / **to downsize joint military exercises with South Korea** 한국과의 연합군사훈련을 축소하려는 / **is not without precedent** 선례가 없는 것은 아니다.',
      ],
    },

    {
      title: '11. suspend',
      narrative: [
        'suspend(səˈspend / 서스펜드)는 **중단하다**, **일시 정지하다**라는 뜻입니다.',

        '*He suspended the exercises entirely in 2018.*',

        '**He suspended** 그는 중단했다 / **the exercises entirely** 훈련을 완전히 / **in 2018** 2018년에.',
      ],
    },

    {
      title: '12. provocative',
      narrative: [
        'provocative(prəˈvɑːkətɪv / 프러바커티브)는 **도발적인**, **화를 유발하는**이라는 뜻입니다.',

        '*At the time that the annual drills were provocative.*',

        '**At the time** 당시 / **that the annual drills were provocative** 연례 군사훈련이 도발적이었다고.',
      ],
    },

    {
      title: '13. armistice',
      narrative: [
        'armistice(ˈɑːrmɪstɪs / 아머스티스)는 **정전**, **휴전협정**이라는 뜻입니다.',

        '*The war is still active since an armistice was signed in 1953.*',

        '**The war is still active** 전쟁은 여전히 끝나지 않은 상태다 / **since an armistice was signed** 정전협정이 체결된 이후에도 / **in 1953** 1953년에.',
      ],
    },

    {
      title: '14. station',
      narrative: [
        'station(ˈsteɪʃən / 스테이션)은 군인이나 장비를 **배치하다**, **주둔시키다**라는 뜻입니다.',

        '*Troops stationed in Korea maintain readiness.*',

        '**Troops stationed in Korea** 한국에 주둔한 병력은 / **maintain readiness** 대비 태세를 유지한다.',
      ],
    },

    {
      title: '15. defuse',
      narrative: [
        'defuse(ˌdiːˈfjuːz / 디퓨즈)는 **긴장을 완화하다**, **위기를 진정시키다**라는 뜻입니다.',

        '*Seoul has tried to defuse the tension this year.*',

        '**Seoul has tried** 한국 정부는 노력해 왔다 / **to defuse the tension** 긴장을 완화하려고 / **this year** 올해.',
      ],
    },

    {
      title: '16. commit',
      narrative: [
        'commit(kəˈmɪt / 커밋)은 **약속하다**, **자금을 투입하기로 하다**라는 뜻입니다.',

        '*Committing $350bn to investing in the US.*',

        '**Committing $350bn** 3,500억 달러를 투입하기로 약속하며 / **to investing in the US** 미국에 투자하는 데.',
      ],
    },
  ],

  source: 'https://www.bbc.com/news/articles/cx2lll7zvn0o',

  youtube:
    'https://www.youtube.com/watch?v=QMJAbMxz-ic&list=PLSlq2Lkls6sY&index=4',
};

// ===============================

// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
