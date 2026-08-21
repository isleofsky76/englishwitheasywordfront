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
  title: 'crooked 비뚤어진 연관 단어 정리 | wonky · askew · lopsided',
  slug: 'crooked-related-words',
  metaDescription:
    'crooked(구부러진·비뚤어진), wonky(비뚤어진·고르지 않은), askew(한쪽으로 기울어진), lopsided(한쪽으로 치우친), uneven(고르지 않은) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  password: 'seed_synonym_crooked-related-words',
  datePublished: '2026-08-21',

  intro: [
    '모양이나 방향이 **곧지 않거나 균형이 맞지 않을 때** 쓸 수 있는 표현을 묶어 봤습니다. crooked를 중심으로 wonky, askew, lopsided, uneven이 각각 어떤 상황에서 쓰이는지 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. crooked',
      narrative: [
        'crooked는 **구부러진**, **비뚤어진**이라는 뜻입니다. /ˈkrʊkɪd/ (크루키드). 직선이어야 할 것이 휘거나 바르지 않은 모양을 나타낼 때 자주 쓰입니다.',
        '*Straight trees have crooked roots.*',
        '**Straight trees** 곧게 자란 나무도 **have crooked roots** 구불구불한 뿌리를 가지고 있다.',
      ],
    },
    {
      title: '2. wonky',
      narrative: [
        'wonky는 **비뚤어진**, **고르지 않은**, 또는 제대로 균형이 잡히지 않은 상태를 뜻합니다. /ˈwɑːŋki/ (웡키). 일상적인 영국 영어에서 모양이나 상태가 조금 이상하거나 삐뚤어졌을 때 자주 쓰입니다.',
        '*My teeth are wonky, discoloured and gappy.*',
        '**My teeth** 내 치아는 **are wonky** 삐뚤어져 있고 **discoloured and gappy** 변색돼 있으며 사이도 벌어져 있다.',
      ],
    },
    {
      title: '3. askew',
      narrative: [
        'askew는 **비뚤어진**, **한쪽으로 기울어진**이라는 뜻입니다. /əˈskjuː/ (어스큐). 물건이 제 위치에서 살짝 돌아가거나 비스듬하게 놓인 모습을 표현할 때 잘 쓰입니다.',
        '*Her hat was slightly askew.*',
        '**Her hat** 그녀의 모자는 **was slightly askew** 약간 한쪽으로 비뚤어져 있었다.',
      ],
    },
    {
      title: '4. lopsided',
      narrative: [
        'lopsided는 **한쪽으로 치우친**, **불균형한**이라는 뜻입니다. /ˌlɑːpˈsaɪdɪd/ (랍사이디드). 물리적인 모양뿐 아니라 의견·보도·경쟁 등이 한쪽에 지나치게 치우친 경우에도 자주 쓰입니다.',
        '*The article presents a somewhat lopsided view of events.*',
        '**The article** 그 기사는 **presents** 제시한다 **a somewhat lopsided view of events** 사건을 다소 한쪽으로 치우친 시각에서.',
      ],
    },
    {
      title: '5. uneven',
      narrative: [
        'uneven은 **고르지 않은**, **울퉁불퉁한**, **균일하지 않은**이라는 뜻입니다. /ʌnˈiːvən/ (언이븐). 표면의 높낮이가 일정하지 않거나 수준·분포 등이 균등하지 않을 때 폭넓게 사용됩니다.',
        '*The floor felt uneven under his feet.*',
        '**The floor** 바닥이 **felt uneven** 고르지 않게 느껴졌다 **under his feet** 그의 발밑에서.',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=yeKSvY9r_4c&list=PLepVNyM8dwWg&index=2',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
