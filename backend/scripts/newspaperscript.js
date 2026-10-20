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
  title: '베네치아 운하 카페 · Venice canal-side café',

  slug: 'venice-canal-side-cafe',

  metaDescription:
    '베네치아 운하 옆 카페 풍경을 담은 쇼츠용 배경 이미지. canal, gondola, espresso, gondolier, newspaper 등 관련 영어 표현.',

  password: 'seed_shorts_venice-canal-side-cafe',

  datePublished: '2026-10-20',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/venice.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `canal : 운하
gondola : 곤돌라
bridge : 다리
arch : 아치
facade : 건물 정면
pastel : 파스텔의
romantic : 낭만적인
waterfront : 물가
reflection : 반사
ripple : 물결
glisten : 반짝이다
float : 떠다니다
historic : 역사적인
serene : 고요한`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `couple : 커플
espresso : 에스프레소
saucer : 받침 접시
awning : 차양
striped : 줄무늬의
metal : 철제의
geranium : 제라늄
windowsill : 창턱
balcony : 발코니
cheerful : 쾌활한
laugh : 웃다
chat : 수다 떨다
lean : 기대다
hang : 매달리다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `waiter : 웨이터
vest : 조끼
tray : 쟁반
croissant : 크루아상
gondolier : 뱃사공
oar : 노
hat : 모자
passenger : 승객
elegant : 우아한
skilled : 능숙한
balance : 균형 잡다
row : 노 젓다
glide : 미끄러지다
deliver : 가져다주다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `gentleman : 신사
glasses : 안경
newspaper : 신문
cappuccino : 카푸치노
fedora : 중절모
pigeon : 비둘기
crumb : 부스러기
cane : 지팡이
elderly : 나이 든
absorbed : 몰두한
leisurely : 느긋한
unfold : 펼치다
read : 읽다
peck : 쪼다
linger : 머무르다`,
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
