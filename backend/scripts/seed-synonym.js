/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========

const article = {
  title: 'junta 군사정권 연관 단어 정리 | cabal · calumny · melee · insurgency',

  slug: 'junta-related-words',

  metaDescription:
    'junta(군사정권·군부 집단), cabal(비밀 파벌), calumny(중상모략), melee(난투극·혼전), insurgency(무장 반란)의 뜻·발음·예문을 정리한 시사 연관 어휘 학습입니다.',

  password: 'seed_synonym_junta-related-words',

  datePublished: '2026-08-31',

  intro: [
    '정치권력과 사회적 충돌을 다룬 뉴스에서 자주 접할 수 있는 표현을 묶어 봤습니다. **군부 집단과 비밀 권력 세력부터 중상모략, 난투극, 무장 반란까지** junta를 중심으로 관련 시사 어휘를 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. junta',
      narrative: [
        'junta는 **군사정권**, **권력을 장악한 군부 집단**이라는 뜻입니다. /ˈhʊntə/ (훈타). 군사 쿠데타 등을 통해 정부를 장악하고 국가를 통치하는 군 지도자 집단을 가리킵니다.',

        '*A military junta is consolidating power in Iran.*',

        '**A military junta** 군부 집단이 **is consolidating power** 권력을 공고히 하고 있다 **in Iran** 이란에서.',
      ],
    },

    {
      title: '2. cabal',
      narrative: [
        'cabal은 **비밀 파벌**, **소수 권력 집단**이라는 뜻입니다. /kəˈbɑːl/ (커발). 정치권이나 조직 내부에서 자신들의 이익을 위해 비밀리에 영향력을 행사하는 소수 집단을 가리킬 때 주로 쓰입니다.',

        "*If Labour's northern faction is to have more success than the London cabal, it will need to be more inclusive.*",

        "**If Labour's northern faction is to have more success** 노동당의 북부 파벌이 더 성공하려면 **than the London cabal** 런던의 비밀스러운 소수 권력 집단보다 **it will need to be more inclusive** 더 포용적이어야 한다.",
      ],
    },

    {
      title: '3. calumny',
      narrative: [
        'calumny는 **중상모략**, **악의적인 비방**이라는 뜻입니다. /ˈkæləmni/ (캘럼니). 다른 사람의 명예를 훼손하기 위해 고의로 퍼뜨리는 거짓 주장이나 비난을 나타내는 격식 있는 표현입니다.',

        '*Mr Sarkozy denounced the allegations against him and Eric Woerth as calumny and lies.*',

        '**Mr Sarkozy denounced** 사르코지는 비난했다 **the allegations against him and Eric Woerth** 자신과 에리크 뵈르트에 대한 의혹을 **as calumny and lies** 중상모략과 거짓말이라고.',
      ],
    },

    {
      title: '4. melee',
      narrative: [
        'melee는 **난투극**, **혼전**, **뒤엉킨 소동**이라는 뜻입니다. /ˈmeɪleɪ/ (메일레이). 여러 사람이 한꺼번에 뒤엉켜 싸우거나 혼란스러운 상황이 벌어졌을 때 사용합니다.',

        "*The melee was a hot topic at Monday night's city council meeting.*",

        '**The melee** 그 난투극은 **was a hot topic** 뜨거운 화제가 됐다 **at Monday night’s city council meeting** 월요일 밤 시의회 회의에서.',
      ],
    },

    {
      title: '5. insurgency',
      narrative: [
        'insurgency는 **반란**, **무장 반정부 활동**이라는 뜻입니다. /ɪnˈsɜːrdʒənsi/ (인서전시). 무장 세력이 기존 정부나 통치 권력에 맞서 지속적으로 벌이는 조직적인 저항 활동을 가리킵니다.',

        "*Their insurgency, now estimated to affect 40% of the country's districts, has in some places become an insurrection.*",

        '**Their insurgency** 그들의 무장 반란은 **now estimated to affect 40% of the country’s districts** 현재 전국 지역의 40%에 영향을 미치는 것으로 추정되며 **has in some places become an insurrection** 일부 지역에서는 본격적인 봉기로 발전했다.',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/shorts/QuPTE5oO5RE',
};

// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });