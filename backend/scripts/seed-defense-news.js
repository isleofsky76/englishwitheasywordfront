/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '트럼프, 러시아 대규모 공격 감행한 우크라이나와 젤렌스키 비난',

  slug: 'deteriorate-relieve-acknowledge-halt-related-words',

  metaDescription:
    'CNN 기사에서 추출한 우크라이나·러시아 전쟁과 미국의 외교·경제제재 관련 시사 영단어. deteriorate, relieve, acknowledge, halt, pound, waive, mandate, spark, curtail 등.',

  password: 'seed_politics_deteriorate-relieve-acknowledge-halt-related-words',

  datePublished: '2026-10-19',

  intro: [
    '우크라이나가 러시아를 상대로 대규모 공격을 감행하자 트럼프 대통령이 젤렌스키를 비난했다. 양국의 에너지 시설 공격 중단 합의 논란, 러시아에 대한 미국의 제재 면제 조치, 우크라이나군의 스타링크 접근 제한 등을 다룬 CNN 기사에서 주요 시사 영단어를 정리합니다.',
  ],

  words: [
    {
      narrative: [
        '1. 우크라이나의 러시아 공격은 젤렌스키와 트럼프의 관계가 점차 악화되는(**deteriorating**) 가운데 이루어졌다. cf. deteriorate: 악화되다',
      ],
    },
    {
      narrative: [
        '2. 백악관은 중요한 중간선거를 앞두고 원유와 경유 가격에 가해지는 상승 압력을 완화하려(**relieve**) 하고 있었다. cf. 부담·압박 등을 덜어 주다',
      ],
    },
    {
      narrative: [
        '3. 트럼프는 러시아와 우크라이나가 에너지 시설 공격을 중단하기로 합의했다고 주장했지만, 우크라이나와 러시아 어느 쪽도 그러한 합의를 인정하지(**acknowledge**) 않았다. cf. 사실·존재 등을 인정하다',
      ],
    },
    {
      narrative: [
        '4. 우크라이나는 러시아 에너지 시설에 대한 공격을 잠시 중단했지만(**halted**), 러시아는 우크라이나에 대한 공격을 멈추지 않았다. cf. halt: 중단하다, 멈추다',
      ],
    },
    {
      narrative: [
        '5. 우크라이나가 공격을 잠시 중단한 것과 달리 러시아는 우크라이나의 에너지 시설과 도시들을 계속 맹렬히 공격하고(**pounding**) 있었다. cf. pound: 반복적으로 맹공격하다',
      ],
    },
    {
      narrative: [
        '6. 트럼프는 러시아산 경유 수입에 대한 제재를 면제했으며(**waived**), 러시아를 광범위한 경제적 처벌에서 제외하는 면제 조항도 발동했다. cf. waive: 규정·의무·제재 등의 적용을 면제하다',
      ],
    },
    {
      narrative: [
        '7. 트럼프가 면제한 경제제재는 미국 의회가 법적으로 의무화한(**mandated**) 조치였다. cf. mandate: 법률·권한에 따라 의무화하다',
      ],
    },
    {
      narrative: [
        '8. 트럼프가 러시아에 대한 경제제재 면제 조항을 발동하자 공화당 내부에서조차 비판이 촉발됐다(**sparking**). cf. spark: 논란·비판·사건 등을 촉발하다',
      ],
    },
    {
      narrative: [
        '9. 우크라이나군이 단거리 및 전장용 드론을 유도하는 데 사용하는 스타링크 시스템에 대한 접근은 여전히 제한된(**curtailed**) 상태였다. cf. curtail: 활동·권한·접근 등을 제한하거나 축소하다',
      ],
    },
  ],

  source: {
    text: 'CNN | Trump slams Zelensky after Ukraine defies US president with major attack on Russia | By Tim Lister and Daria Tarasova-Markina',
    url: 'https://edition.cnn.com/2026/10/18/europe/ukraine-russia-drone-attack-trump-intl',
  },

  youtube: 'https://youtube.com/shorts/hT3EwnRcMGg',
};
// ===============================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
