/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '튼튼한, 원기 왕성한',

  slug: 'robust-related-words',

  metaDescription:
    'robust, sturdy, solid, durable, rugged, hardwearing, resilient, resistant, enduring, persistent, strong, powerful, potent, mighty, forceful, vigorous, energetic, healthy, hearty, vibrant, lively, muscular, brawny, burly, beefy, strapping, well-built, rigid, stiff, unyielding, tight 뜻·발음 유의어 모음.',

  password: 'seed_synonym_robust-related-words',

  datePublished: '2026-09-05',

  intro: [
    '무언가를 **단단하고**, **오래가며**, **힘 있게** 말할 때 자주 나오는 단어들을 모아 봤습니다. 뜻은 비슷해도 쓰이는 장면이 조금씩 다릅니다.',
  ],

  words: [
    {
      title: '1. 견고한·튼튼한',
      narrative: [
        '**robust**(roʊˈbʌst / 로버스트) — 탄탄한, 견고한',
        '**sturdy**(ˈstɜːrdi / 스터디) — 튼튼한, 견고한',
        '**solid**(ˈsɑːlɪd / 솔리드) — 견조한, 탄탄한',
        '**durable**(ˈdʊrəbəl / 듀러블) — 내구성이 강한',
        '**rugged**(ˈrʌɡɪd / 러기드) — 거친 환경에도 견디는',
        '**hardwearing**(ˌhɑːrdˈwerɪŋ / 하드웨어링) — 쉽게 닳지 않는, 내구성 강한',
      ],
    },

    {
      title: '2. 회복력·지속성',
      narrative: [
        '**resilient**(rɪˈzɪliənt / 리질리언트) — 회복력이 강한',
        '**resistant**(rɪˈzɪstənt / 리지스턴트) — 저항력이 있는',
        '**enduring**(ɪnˈdʊrɪŋ / 인듀어링) — 오래 지속되는',
        '**persistent**(pərˈsɪstənt / 퍼시스턴트) — 끈질기게 지속되는',
      ],
    },

    {
      title: '3. 강력한·영향력 있는',
      narrative: [
        '**strong**(strɔːŋ / 스트롱) — 강한',
        '**powerful**(ˈpaʊərfəl / 파워풀) — 강력한, 영향력 있는',
        '**potent**(ˈpoʊtənt / 포우턴트) — 강력한, 효과가 강한',
        '**mighty**(ˈmaɪti / 마이티) — 막강한',
        '**forceful**(ˈfɔːrsfəl / 포스풀) — 강력한, 힘 있는',
      ],
    },

    {
      title: '4. 활기찬·건강한',
      narrative: [
        '**vigorous**(ˈvɪɡərəs / 비거러스) — 활발한, 활기찬',
        '**energetic**(ˌenərˈdʒetɪk / 에너제틱) — 활기찬, 에너지 넘치는',
        '**healthy**(ˈhelθi / 헬시) — 건전한, 건강한',
        '**hearty**(ˈhɑːrti / 하티) — 원기 왕성한, 푸짐한',
        '**vibrant**(ˈvaɪbrənt / 바이브런트) — 활기 넘치는',
        '**lively**(ˈlaɪvli / 라이블리) — 활발한, 생기 있는',
      ],
    },

    {
      title: '5. 건장한·육체적으로 튼튼한',
      narrative: [
        '**muscular**(ˈmʌskjələr / 머스큘러) — 근육질의, 강력한',
        '**brawny**(ˈbrɔːni / 브로니) — 근육이 우람한',
        '**burly**(ˈbɜːrli / 벌리) — 몸집이 크고 건장한',
        '**beefy**(ˈbiːfi / 비피) — 두툼하고 튼튼한, 건장한',
        '**strapping**(ˈstræpɪŋ / 스트래핑) — 키 크고 건장한',
        '**well-built**(ˌwel ˈbɪlt / 웰 빌트) — 체격이 좋은',
      ],
    },

    {
      title: '6. 경직된·완강한·빡빡한',
      narrative: [
        '**rigid**(ˈrɪdʒɪd / 리지드) — 경직된, 융통성 없는',
        '**stiff**(stɪf / 스티프) — 강한, 치열한 / 뻣뻣한',
        '**unyielding**(ʌnˈjiːldɪŋ / 언일딩) — 완강한, 굽히지 않는',
        '**tight**(taɪt / 타이트) — 빠듯한, 여유가 없는',
      ],
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=eyR2w5rPvvg',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
