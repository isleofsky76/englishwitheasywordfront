/**
 * 신문읽는 이미지(shorts-bg-image) 업로드
 *
 * 사용법: 아래 article 만 수정 → node scripts/newspaperscript.js
 *
 * 노출 양식: 이미지(9:16) + 섹션별 「한글 : english」 단어 목록
 * (live: /shorts-bg-image/harbor-cafe-fishermen-sunset/ 과 동일)
 */
import { API_BASE } from './loadEnv.js';
import { uploadShortsBgImage } from './shorts-bg-image-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '항구 카페와 어부들의 저녁 풍경 · Harbor cafe and fishermen at sunset',

  slug: 'harbor-cafe-fishermen-sunset',

  metaDescription:
    '항구 카페와 어부들의 저녁 노을 풍경을 담은 쇼츠용 배경 이미지. harbor, pier, fisherman, sunset 등 관련 영어 표현.',

  password: 'seed_shorts_harbor-cafe-fishermen-sunset',

  datePublished: '2026-09-02',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/harbor_cafe_fishermen.jpg',

  sections: [
    {
      heading: '전체적인 항구 풍경 (Overall Harbor Scene)',
      body: `항구 : harbor
바다 : sea
등대 : lighthouse
부두 : pier / dock
어선 : fishing boat
보트 : boat
해안 : coast
노을 : sunset
잔잔한 : calm
평화로운 : peaceful`,
    },
    {
      heading: '좌측 카페 풍경 (Cafe Area)',
      body: `카페 : cafe
테이블 : table
의자 : chair
신문 : newspaper
커피잔 : coffee cup
책 : book
손님 : customer / patron (단골)
읽다 : read
마시다 : drink
앉다 : sit`,
    },
    {
      heading: '어부와 작업 공간 (Fishermen & Work Area)',
      body: `어부 : fisherman
해산물 : seafood
생선 : fish
장갑 : gloves
작업복 : workwear
(물품 운송용 대형 나무) 상자 : crate
바구니 : basket
그물 : fishing net
나르다 : carry
분류하다 : sort`,
    },
    {
      heading: '부두와 장비 (Dock & Equipment)',
      body: `밧줄 : rope
부표 : buoy
통발 : lobster trap / fishing trap
선착장 : dock
나무 난간 : wooden railing
엔진 : engine
정박하다 : dock / moor ((배를) 계류[정박]하다 (=tie up))
내리다 : unload
쌓다 : stack
작업하다 : work`,
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
