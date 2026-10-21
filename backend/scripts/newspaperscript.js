/**
 * 신문읽는 이미지(shorts-bg-image) 업로드 (수동)
 *
 * 사용법: 아래 article 만 수정 → node scripts/newspaperscript.js
 *
 * 노출 양식: 이미지(9:16) + 섹션별 「english : 한글」 단어 목록
 *
 * 이미지 이름만으로 AI 배치 업로드: newspaperscript_batch.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadShortsBgImage } from './shorts-bg-image-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '두브로브니크 항구 풍경 · Dubrovnik harbor scene',

  slug: 'dubrovnik-harbor-scene',

  metaDescription:
    '크로아티아 두브로브니크 항구와 성벽 풍경을 담은 쇼츠용 배경 이미지. harbor, fortress, fisherman, lavender, seagull 등 관련 영어 표현.',

  password: 'seed_shorts_dubrovnik-harbor-scene',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/dodubrovnik.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `harbor : 항구
fortress : 요새
stonewall : 돌담
terracotta : 테라코타
rooftop : 지붕
pier : 부두
turquoise : 청록색의
sunlit : 햇살 가득한
medieval : 중세의
coastal : 해안의
bustling : 활기찬
hillside : 언덕 마을
cablecar : 케이블카
overlook : 내려다보다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `gentleman : 신사
sunglasses : 선글라스
newspaper : 신문
umbrella : 파라솔
lemonade : 레모네이드
olive : 올리브
bread : 빵
basket : 바구니
cafe : 카페
table : 탁자
patio : 테라스
read : 읽다
sip : 홀짝이다
relax : 쉬다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `fisherman : 어부
net : 그물
crate : 상자
bin : 통
fish : 생선
cat : 고양이
tabby : 줄무늬 고양이
sailor : 선원
rope : 밧줄
bollard : 계선주
boat : 배
moor : 배를 매다
mend : 수리하다
watch : 지켜보다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `vendor : 상인
lavender : 라벤더
mushroom : 버섯
stall : 가판대
icecream : 아이스크림
cone : 콘
boy : 소년
cap : 모자
seagull : 갈매기
feed : 먹이를 주다
reach : 손을 뻗다
hand : 건네다
fly : 날다
market : 시장`,
    },
  ],
};

// ===============================

uploadShortsBgImage(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
