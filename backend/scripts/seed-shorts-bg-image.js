/**
 * 쇼츠 배경 이미지 업로드
 *
 * 본문 구조: 이미지 → 섹션별 단어 : 뜻 (영어)
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-shorts-bg-image.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadShortsBgImage } from './shorts-bg-image-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '지중해 해변 골목 · Mediterranean beach alley',

  slug: 'mediterranean-beach-alley',

  metaDescription:
    '남유럽·지중해 연안 마을 풍의 햇살 가득한 골목길과 해변 배경. 노천 카페, 가판대, 에메랄드빛 바다가 어우러진 쇼츠용 배경 이미지입니다.',

  password: 'seed_shorts_mediterranean-beach-alley',

  datePublished: '2026-08-31',

  /** GitHub: resources/beach.jpg (send_photo 와 동일) — frontend/resources/ 에 두어도 push 시 resources/ 로 복사 */
  image: '/resources/beach.jpg',

  sections: [
    {
      heading: '전체적인 분위기 (Overall Scene)',
      body: `남유럽 : Southern Europe
지중해 연안 마을 : Mediterranean seaside town
햇살이 쏟아지는 : sun-drenched
좁은 골목길 : narrow alley
자갈길 : cobblestone street
고풍스러운 석조 건물 : historic stone buildings
반짝이는 바다 : sparkling sea
모래사장 : sandy beach
시원하게 펼쳐지다 : open up to a stunning view
따스한 황금빛 노을 : warm golden glow`,
    },
    {
      heading: '좌측 카페 풍경 (Left Side: Cafe Scene)',
      body: `노천카페 : open-air cafe
원형 테이블 : round tables
느긋한 오후 : leisurely afternoon
노트북으로 작업하다 : work on a laptop
커피를 홀짝이다 : sip coffee
즐겁게 담소하다 : chat lively
벽걸이 조명 : wall-mounted lantern
고즈넉한 유럽 정취 : classic European charm`,
    },
    {
      heading: '우측 가판대 풍경 (Right Side: Newsstand)',
      body: `잡지와 신문 : magazines and newspapers
가판대 : newsstand / kiosk
단발머리 : bob haircut
테이크아웃 컵 : takeout cup
생각에 잠긴 채 서 있다 : stand thoughtfully
노신사 : elderly gentleman
신문을 펼쳐 든 채 : holding an unfolded newspaper
시선을 던지다 : cast a glance`,
    },
    {
      heading: '배경 및 해변 (Background & Beach)',
      body: `해변가 : beachfront
여름 옷차림 : summer outfits
맨발로 모래사장을 거닐다 : stroll barefoot on the sand
에메랄드빛 바다 : turquoise sea
돛단배 : sailboats
유유히 떠 있다 : drift peacefully`,
    },
  ],
};

// ========== 여기만 수정 ==========

uploadShortsBgImage(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
