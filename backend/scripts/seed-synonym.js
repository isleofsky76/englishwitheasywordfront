/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========
// ========== 여기만 수정 ==========
const article = {
  title: 'impetuous 충동적인 연관 단어 정리 | impudent · insolent · impertinent',
  slug: 'impetuous-related-words',
  metaDescription:
    'impetuous(충동적인·성급한), impudent(뻔뻔한·건방진), insolent(오만불손한·무례한), impertinent(버릇없는·주제넘은), presumptuous(주제넘은·지나치게 나서는) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  password: 'seed_synonym_impetuous-related-words',
  datePublished: '2026-08-21',

  intro: [
    '행동이 **성급하거나**, 태도가 **뻔뻔하고 무례하거나**, 자신의 권한을 넘어 **주제넘게 행동할 때** 쓰이는 고급 표현을 묶어 봤습니다. impetuous를 시작으로 impudent, insolent, impertinent, presumptuous의 의미와 뉘앙스를 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. impetuous',
      narrative: [
        'impetuous는 **충동적인**, **성급한**이라는 뜻입니다. /ɪmˈpetʃuəs/ (임페추어스). 충분히 생각하지 않고 감정이나 순간적인 충동에 따라 빠르게 행동하거나 결정하는 모습을 나타냅니다.',
        '*The boss\'s insecurity can lead to a series of impetuous decisions.*',
        '**The boss\'s insecurity** 상사의 불안감은 **can lead to** 이어질 수 있다 **a series of impetuous decisions** 일련의 충동적인 결정으로.',
      ],
    },
    {
      title: '2. impudent',
      narrative: [
        'impudent는 **뻔뻔한**, **건방진**이라는 뜻입니다. /ˈɪmpjədənt/ (임퓨던트). 상대에 대한 존중이 부족하면서도 부끄러워하거나 거리끼는 기색 없이 무례하게 행동하는 태도를 나타냅니다.',
        '*Ms Kim called the president impudent and a flunky beggar.*',
        '**Ms Kim** 김 씨는 **called the president** 대통령을 불렀다 **impudent and a flunky beggar** 뻔뻔하고 비굴한 아첨꾼 거지라고.',
      ],
    },
    {
      title: '3. insolent',
      narrative: [
        'insolent는 **오만불손한**, **무례한**이라는 뜻입니다. /ˈɪnsələnt/ (인설런트). 권위자나 다른 사람을 존중하지 않고 거만하거나 무례하게 행동하는 태도에 주로 사용됩니다.',
        '*A child was treated as insolent and lazy for falling asleep in class.*',
        '**A child** 한 아이는 **was treated as insolent and lazy** 오만불손하고 게으른 아이로 취급받았다 **for falling asleep in class** 수업 중 잠이 들었다는 이유로.',
      ],
    },
    {
      title: '4. impertinent',
      narrative: [
        'impertinent는 **버릇없는**, **주제넘은**, **무례하게 참견하는**이라는 뜻입니다. /ɪmˈpɜːrtənənt/ (임퍼티넌트). 상대방의 영역이나 권한을 넘어서는 질문이나 발언이 무례하다고 느껴질 때 자주 쓰입니다.',
        '*China expects the UN to praise its economy, not ask impertinent questions about repression.*',
        '**China expects the UN** 중국은 UN이 그러기를 기대한다 **to praise its economy** 자국 경제를 칭찬하고 **not ask impertinent questions about repression** 억압에 대해 주제넘은 질문을 하지 않기를.',
      ],
    },
    {
      title: '5. presumptuous',
      narrative: [
        'presumptuous는 **주제넘은**, **지나치게 나서는**이라는 뜻입니다. /prɪˈzʌmptʃuəs/ (프리점프추어스). 자신에게 그런 권한이나 자격이 있다고 지나치게 당연시하며 행동하는 태도를 나타냅니다.',
        '*It was presumptuous of him to make the decision without asking anyone.*',
        '**It was presumptuous of him** 그것은 그의 주제넘은 행동이었다 **to make the decision** 결정을 내린 것은 **without asking anyone** 누구에게도 묻지 않고.',
      ],
    },
  ],

  youtube: '',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });