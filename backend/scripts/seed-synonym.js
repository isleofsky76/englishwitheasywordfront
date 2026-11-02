/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '아는 체하는 사람 · 지적인 · 괴짜 #연관단어',

  slug: 'wiseacre-highbrow-boffin-egghead-prodigy-related-words',

  metaDescription:
    'wiseacre, highbrow, boffin, egghead, prodigy, eccentric, mediocre, mundane 뜻·발음·예문 연관단어 모음.',

  password: 'seed_synonym_wiseacre-highbrow-boffin-egghead',

  datePublished: '2026-11-02',

  intro: [
    '아는 체하는 사람 · 지적인 · 괴짜 관련 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      title: '1. 아는 체하는 사람, 잘난 체하는 사람',
      narrative: [
        '**wiseacre**(ˈwaɪzeɪkər / 와이즈에이커)',
        '"Don\'t stand there with that wiseacre look."',
        '그렇게 잘난 체하는 표정으로 서 있지 마.',
      ],
    },
    {
      title: '2. 지적인, 고상한, 교양 수준이 높은',
      narrative: [
        '**highbrow**(ˈhaɪbraʊ / 하이브라우)',
        '"That\'s pretty highbrow for a book group."',
        '독서 모임치고는 꽤 수준이 높네.',
      ],
    },
    {
      title: '3. 과학자, 기술 전문가, 학구적인 사람 (영국식 비격식)',
      narrative: [
        '**boffin**(ˈbɒfɪn / 보핀)',
        '"It\'ll be fun to see how you boffin types live."',
        '너희 같은 과학자들은 어떻게 사는지 보면 재미있겠네.',
      ],
    },
    {
      title: '4. 지식인, 먹물, 학자 타입의 사람',
      narrative: [
        '**egghead**(ˈɛɡhɛd / 에그헤드)',
        '"Don\'t listen to Egghead."',
        '저 먹물 같은 녀석 말은 듣지 마.',
      ],
    },
    {
      title: '5. 영재, 신동',
      narrative: [
        '**prodigy**(ˈprɒdɪdʒi / 프로디지)',
        '"You\'re a child prodigy playwright."',
        '넌 어린 나이에 뛰어난 재능을 보이는 극작가 신동이야.',
      ],
    },
    {
      title: '6. 별난, 괴짜인 / 괴짜',
      narrative: [
        '**eccentric**(ɪkˈsɛntrɪk / 익센트릭)',
        '"He\'s very eccentric."',
        '그는 아주 별난 사람이야.',
      ],
    },
    {
      title: '7. 그저 그런, 썩 좋지 않은',
      narrative: [
        '**mediocre**(ˌmiːdiˈoʊkər / 미디오커)',
        '"His performances were oftentimes mediocre to sometimes flagrantly incompetent."',
        '그의 업무 수행은 대체로 평범 이하였고, 때로는 노골적으로 무능한 수준이었다.',
      ],
    },
    {
      title: '8. 일상적인, 평범하고 따분한',
      narrative: [
        '**mundane**(mʌnˈdeɪn / 먼데인)',
        '"I always mess up some mundane detail."',
        '나는 항상 사소하고 일상적인 부분에서 실수를 저지른다.',
      ],
    },
  ],

  wordMeta: [
    {
      num: 1,
      expression: 'wiseacre',
      meaning: '아는 체하는 사람, 잘난 체하는 사람',
      exampleEn: "Don't stand there with that wiseacre look.",
      exampleKo: '그렇게 잘난 체하는 표정으로 서 있지 마.',
    },
    {
      num: 2,
      expression: 'highbrow',
      meaning: '지적인, 고상한, 교양 수준이 높은',
      exampleEn: "That's pretty highbrow for a book group.",
      exampleKo: '독서 모임치고는 꽤 수준이 높네.',
    },
    {
      num: 3,
      expression: 'boffin',
      meaning: '과학자, 기술 전문가, 학구적인 사람 (영국식 비격식)',
      exampleEn: "It'll be fun to see how you boffin types live.",
      exampleKo: '너희 같은 과학자들은 어떻게 사는지 보면 재미있겠네.',
    },
    {
      num: 4,
      expression: 'egghead',
      meaning: '지식인, 먹물, 학자 타입의 사람',
      exampleEn: "Don't listen to Egghead.",
      exampleKo: '저 먹물 같은 녀석 말은 듣지 마.',
    },
    {
      num: 5,
      expression: 'prodigy',
      meaning: '영재, 신동',
      exampleEn: "You're a child prodigy playwright.",
      exampleKo: '넌 어린 나이에 뛰어난 재능을 보이는 극작가 신동이야.',
    },
    {
      num: 6,
      expression: 'eccentric',
      meaning: '별난, 괴짜인 / 괴짜',
      exampleEn: "He's very eccentric.",
      exampleKo: '그는 아주 별난 사람이야.',
    },
    {
      num: 7,
      expression: 'mediocre',
      meaning: '그저 그런, 썩 좋지 않은',
      exampleEn:
        'His performances were oftentimes mediocre to sometimes flagrantly incompetent.',
      exampleKo: '그의 업무 수행은 대체로 평범 이하였고, 때로는 노골적으로 무능한 수준이었다.',
    },
    {
      num: 8,
      expression: 'mundane',
      meaning: '일상적인, 평범하고 따분한',
      exampleEn: 'I always mess up some mundane detail.',
      exampleKo: '나는 항상 사소하고 일상적인 부분에서 실수를 저지른다.',
    },
  ],

  youtube: 'https://youtube.com/shorts/m2OnneDc8po',
  videoId: 'm2OnneDc8po',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
