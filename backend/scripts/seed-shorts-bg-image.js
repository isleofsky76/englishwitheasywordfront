/**
 * 쇼츠 배경 이미지 업로드
 *
 * 본문 구조: 이미지 → 한글 묘사 (영어 병기)
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

  /** frontend/resources/beach.jpg → GitHub 업로드 후 /resources/beach.jpg */
  image: '/resources/beach.jpg',

  sections: [
    {
      heading: '전체적인 분위기 (Overall Scene)',
      body:
        '이곳은 마치 남유럽(Southern Europe)이나 지중해 연안 마을(Mediterranean seaside town)처럼 보이는, 햇살이 쏟아지는(sun-drenched) 좁은 골목길(narrow alley)이자 자갈길(cobblestone street)입니다. 고풍스러운 석조 건물(historic stone buildings) 사이로 난 길 끝에는 반짝이는 바다(sparkling sea)와 모래사장(sandy beach)이 시원하게 펼쳐져 있습니다(open up to a stunning view). 늦은 오후의 따스한 황금빛 노을(warm golden glow)이 거리 전체를 부드럽게 감싸고 있습니다.',
    },
    {
      heading: '좌측 카페 풍경 (Left Side: Cafe Scene)',
      body:
        '왼편의 노천카페(open-air cafe) 테라스에는 라탄 의자(wicker chairs)와 원형 테이블(round tables)에 앉은 손님들이 느긋한 오후(leisurely afternoon)를 즐기고 있습니다. 한 여성은 노트북으로 작업에 몰두하고(work on a laptop) 있고, 옆 테이블의 사람들은 커피를 홀짝이며(sip coffee) 즐겁게 담소(chat lively)를 나눕니다. 카페의 나무 창틀(wooden-framed windows)과 벽걸이 조명(wall-mounted lantern)이 유럽 특유의 고즈넉한 정취(classic European charm)를 더해줍니다.',
    },
    {
      heading: '우측 가판대 풍경 (Right Side: Newsstand)',
      body:
        '오른편에는 다양한 잡지와 신문(magazines and newspapers)이 진열된 가판대(newsstand / kiosk)가 보입니다. 단발머리(bob haircut)의 젊은 여성이 테이크아웃 컵(takeout cup)을 손에 쥐고 생각에 잠긴 채 서 있고(stand thoughtfully), 의자에 앉은 노신사(elderly gentleman)는 신문을 펼쳐 든 채(holding an unfolded newspaper) 누군가와 대화를 나누듯 시선을 던지고(cast a glance) 있습니다.',
    },
    {
      heading: '배경 및 해변 (Background & Beach)',
      body:
        '골목길 너머로 이어지는 해변가(beachfront)에서는 여름 옷차림(summer outfits)을 한 가족이 맨발로 모래사장을 거닐고(stroll barefoot on the sand) 있습니다. 에메랄드빛 바다(turquoise sea) 위에는 멀리 하얀 돛단배(sailboats)들이 유유히 떠 있어(drift peacefully), 전형적인 여름 휴양지의 여유(laid-back summer getaway)를 완성합니다.',
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
