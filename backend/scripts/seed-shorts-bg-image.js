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

const article = {
  title: '런던 도심 거리와 신문 가판대 · London city street and newsstand',

  slug: 'london-city-street-newsstand',

  metaDescription:
    '빨간 2층 버스와 고전적인 석조 건축물, 노천 카페와 신문 가판대가 어우러진 런던 도심의 흐린 아침 풍경을 담은 쇼츠용 배경 이미지입니다.',

  password: 'seed_shorts_london-city-street-newsstand',

  datePublished: '2026-08-31',

  /** GitHub: resources/london-street.jpg (send_photo와 동일) — frontend/resources/에 두어도 push 시 resources/로 복사 */
  image: '/resources/london-street.jpg',

  sections: [
    {
      heading: '전체적인 분위기 (Overall Scene)',

      body: `런던 도심 거리 : London city street

빨간 2층 버스 : red double-decker bus

자갈길 도로 : cobblestone road 

고전적인 석조 건축물 : classic stone architecture 

흐린 아침 풍경 : overcast morning scene (overcast /ˈoʊvərkæst/ 형용사 흐린)

영국 특유의 분위기 : quintessential British vibe (quintessential /ˌkwɪntɪˈsenʃəl/ 형용사 전형적인·본질적인)

출근길과 일상의 조화 : blend of commute and daily life 

거리의 가판대 : street kiosk`,
    },

    {
      heading: '좌측 거리 및 카페 풍경 (Left Side: Street & Cafe Scene)',

      body: `팔짱을 끼고 걷다 : walk arm in arm

코트 차림 : dressed in coats

가죽 토트백 : leather tote bag 

노천 테이블 : outdoor table

흰색 테이블보 : white tablecloth

신문을 펼쳐 읽다 : read an unfolded newspaper (unfolded /ʌnˈfoʊldɪd/ 형용사 펼쳐진)

커피잔을 들다 : hold a coffee cup

꽃병 장식 : floral centerpiece (floral /ˈflɔːrəl/ 형용사 꽃의·꽃무늬의)

우아한 옷차림 : elegant outfit`,
    },

    {
      heading: '중앙 및 배경 풍경 (Center & Background Scene)',

      body: `웨이터 / 서버 : waiter / server

주문을 받다 : take an order

정장 차림의 직장인들 : office workers in business suits

아침 식사 모임 : breakfast gathering

검은색 철제 펜스 : black wrought-iron fence 

건물 모퉁이 : street corner, building corner`,
    },

    {
      heading: '우측 신문 가판대 풍경 (Right Side: Newsstand Scene)',

      body: `신문 및 잡지 가판대 : newspaper and magazine kiosk

진열된 간행물 : displayed publications 

신문을 훑어보다 : skim through a newspaper (skim /skɪm/ 동사 훑어보다)

크로스백을 메다 : wear a crossbody bag 

신문을 고르다 : select a newspaper`,
    },
  ],
};

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

uploadShortsBgImage(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
