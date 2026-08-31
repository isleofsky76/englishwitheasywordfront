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
  title: 'brusque 무뚝뚝한 연관 단어 정리 | gruff · blunt · cantankerous · spiky',

  slug: 'brusque-related-words',

  metaDescription:
    'brusque(무뚝뚝한·퉁명스러운), gruff(거친·퉁명스러운), blunt(직설적인), cantankerous(성미가 고약한), spiky(까칠한), matter-of-fact(담담한·사무적인)의 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',

  password: 'seed_synonym_brusque-related-words',

  datePublished: '2026-08-31',

  intro: [
    '사람의 말투나 성격이 **부드럽지 않거나 감정을 거의 드러내지 않을 때** 사용할 수 있는 표현을 묶어 봤습니다. brusque를 중심으로 gruff, blunt, cantankerous, spiky, matter-of-fact가 각각 어떤 뉘앙스로 쓰이는지 예문과 함께 정리합니다.',
  ],

words: [
  {
    title: '1. brusque',
    narrative: [
      'brusque(brʌsk / 브러스크)는 **무뚝뚝한**, **퉁명스러운**이라는 뜻입니다.',

      '*A brusque businessman wants to see his mother, ostensibly because an important document is missing.*',

      '**A brusque businessman** 한 무뚝뚝한 사업가가 / **wants to see his mother** 어머니를 만나고 싶어 한다 / **ostensibly because** 표면적으로는 / **an important document is missing** 중요한 서류가 없어졌기 때문에.',
    ],
  },

  {
    title: '2. gruff',
    narrative: [
      'gruff(ɡrʌf / 그러프)는 목소리가 **걸걸한**, 태도나 말투가 **거친**, **퉁명스러운**이라는 뜻입니다.',

      '*Roy Kent (Brett Goldstein) remains pleasingly gruff and foul-mouthed.*',

      '**Roy Kent (Brett Goldstein)** 로이 켄트는 / **remains pleasingly gruff** 여전히 기분 좋게 퉁명스럽고 / **and foul-mouthed** 입이 거칠다.',
    ],
  },

  {
    title: '3. blunt',
    narrative: [
      'blunt(blʌnt / 블런트)는 **직설적인**, **퉁명스러운**이라는 뜻입니다.',

      '*A handful of Republicans on Capitol Hill are blunt in their assessments.*',

      '**A handful of Republicans on Capitol Hill** 미국 의회 내 소수의 공화당 의원들은 / **are blunt** 매우 직설적이다 / **in their assessments** 자신들의 평가에 있어.',
    ],
  },

  {
    title: '4. cantankerous',
    narrative: [
      'cantankerous(kænˈtæŋkərəs / 캔탱커러스)는 **성미가 고약한**, **괴팍한**, **불평이 많은**이라는 뜻입니다.',

      '*The cantankerous Irishman annoys EU-wallahs by railing against regulation.*',

      '**The cantankerous Irishman** 그 괴팍한 아일랜드인은 / **annoys EU-wallahs** EU 관료들을 짜증나게 만든다 / **by railing against regulation** 규제를 맹렬히 비난함으로써.',
    ],
  },

  {
    title: '5. spiky',
    narrative: [
      'spiky(ˈspaɪki / 스파이키)는 **까칠한**, **날카로운**, **공격적인**이라는 뜻입니다.',

      '*Recently, filmmakers have favored spiky female roles over passive victims.*',

      '**Recently** 최근 / **filmmakers have favored** 영화 제작자들은 선호해 왔다 / **spiky female roles** 날카롭고 강인한 여성 역할을 / **over passive victims** 수동적인 피해자 역할보다.',
    ],
  },

  {
    title: '6. matter-of-fact',
    narrative: [
      'matter-of-fact(ˌmætər əv ˈfækt / 매터 어브 팩트)는 **담담한**, **감정을 드러내지 않는**, **사무적인**이라는 뜻입니다.',

      '*She told us the news of his death in a very matter-of-fact way.*',

      '**She told us** 그녀는 우리에게 전했다 / **the news of his death** 그의 사망 소식을 / **in a very matter-of-fact way** 매우 담담하고 사실적인 태도로.',
    ],
  },
],

  youtube: 'https://www.youtube.com/shorts/_rmid16JetI',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });