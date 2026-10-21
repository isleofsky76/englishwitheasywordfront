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
  title: '리스본 노란 트램 거리 · Lisbon yellow tram street',

  slug: 'lisbon-yellow-tram-street',

  metaDescription:
    '리스본 언덕길과 노란 트램(28번) 풍경을 담은 쇼츠용 배경 이미지. tram, cobblestone, azulejo, pastel de nata, fado 등 관련 영어 표현.',

  password: 'seed_shorts_lisbon-yellow-tram-street',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/lisbon.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `tram : 트램
cobblestone : 조약돌 포장
hill : 언덕
azulejo : 아줄레주(타일)
facade : 건물 정면
balcony : 발코니
rooftop : 지붕
harbor : 항구
bridge : 다리
sunlit : 햇살 가득한
steep : 가파른
picturesque : 그림 같은
bustling : 활기찬
descend : 내려가다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `gentleman : 신사
fedora : 중절모
newspaper : 신문
espresso : 에스프레소
pastel : 에그타르트
marble : 대리석
cafe : 카페
table : 탁자
glasses : 안경
waiter : 웨이터
tray : 쟁반
guitar : 기타
musician : 연주자
read : 읽다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `yellow : 노란색의
track : 선로
passenger : 승객
tourist : 관광객
photo : 사진
skirt : 치마
sidewalk : 보도
crowd : 사람들
window : 창문
lean : 기대다
observe : 바라보다
walk : 걷다
snap : 사진을 찍다
approach : 다가오다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `boy : 소년
scooter : 킥보드
sidewalk : 보도
cat : 고양이
tabby : 줄무늬 고양이
curl : 몸을 둥글게 말다
asleep : 잠든
step : 계단
stone : 돌
ride : 타다
nap : 낮잠 자다
rest : 쉬다
nearby : 근처의
sunny : 햇볕이 드는`,
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
