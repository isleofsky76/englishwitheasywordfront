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

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

const article = {
  title: '도심 거리 카페와 신문 가판대 · Urban street cafe and newsstand',
  slug: 'urban-street-cafe-newsstand',
  metaDescription:
    '신문 가판대와 노천카페, 자전거와 택시가 어우러진 활기차고 여유로운 도심 거리의 일상을 담은 쇼츠용 배경 이미지입니다.',
  password: 'seed_shorts_urban-street-cafe-newsstand',
  datePublished: '2026-08-31',

  /** GitHub: resources/street_cafe.jpg (send_photo와 동일) — frontend/resources/에 두어도 push 시 resources/로 복사 */
  image: '/resources/street_cafe.jpg',

  sections: [
    {
      heading: '전체적인 분위기 (Overall Scene)',
      body: `거리 : street
(창이나 문 위의) 차양, 비[해] 가리개 : awning
자갈길 : cobblestone road
택시 : taxi
건물 : building
일상 : daily life
풍경 : scenery
도심의 : urban
활기찬 : lively
전통적인 : traditional
여유로운 : relaxed
따뜻한 : warm
지나가다 : pass
머무르다 : stay
교차하다 : intersect`,
    },
    {
      heading: '좌측 가판대 풍경 (Left Foreground & Kiosk)',
      body: `가판대 : kiosk / newsstand
신문 : newspaper
잡지 : magazine
부츠 : boots
가방 : bag
스툴 / 의자 : stool
펼쳐진 : unfolded
진열된 : displayed
단정한 : neat
나무로 된 : wooden
읽다 : read
훑어보다 : browse
앉다 : sit
기다리다 : wait`,
    },
    {
      heading: '중앙 카페 및 도로 풍경 (Center Scene & Street)',
      body: `자전거 : bicycle
바구니 : basket
카페 : cafe
출입구 : entrance
보도 : sidewalk
차도 : roadway
줄무늬의 : striped
짧은 : short
타다 : ride
페달을 밟다 : pedal
서다 : stand
대화하다 : talk`,
    },
    {
      heading: '우측 계단 풍경 (Right Foreground)',
      body: `계단 : steps / stairs
모퉁이 : corner
커피잔 : coffee cup
스마트폰 : smartphone
걸터앉은 : perched
캐주얼한 : casual
친근한 : friendly
걸터앉다 : perch
미소 짓다 : smile
들다 : hold
바라보다 : gaze`,
    },
  ],
};

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

uploadShortsBgImage(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
