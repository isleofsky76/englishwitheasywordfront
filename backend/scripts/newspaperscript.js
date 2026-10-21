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
  title: '이스탄불 보스포루스 부두 · Istanbul Bosphorus waterfront',

  slug: 'istanbul-bosphorus-waterfront',

  metaDescription:
    '이스탄불 보스포루스 부두의 비 오는 날 풍경을 담은 쇼츠용 배경 이미지. ferry, mosque, fisherman, seagull, newsstand 등 관련 영어 표현.',

  password: 'seed_shorts_istanbul-bosphorus-waterfront',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/istanbul.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `waterfront : 물가
ferry : 여객선
mosque : 이슬람 사원
dome : 둥근 지붕
minaret : 첨탑
overcast : 잔뜩 흐린
rainy : 비 오는
wet : 젖은
skyline : 도시 실루엣
harbor : 항구
gray : 회색의
calm : 잔잔한
historic : 역사적인
overlook : 내려다보다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `vendor : 장사꾼
cart : 손수레
sesame : 참깨
ring : 고리
bread : 빵
glove : 장갑
student : 학생
uniform : 교복
step : 계단
yawn : 하품하다
screen : 화면
eat : 먹다
reach : 손을 뻗다
pile : 쌓다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `fisherman : 낚시꾼
rod : 낚싯대
railing : 난간
seagull : 갈매기
bench : 긴 의자
umbrella : 우산
couple : 두 사람
cast : 던지다
feed : 먹이를 주다
gather : 모이다
lean : 기대다
watch : 바라보다
pass : 지나가다
hold : 잡다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `newsstand : 신문 가판대
newspaper : 신문
tea : 차
glass : 잔
stool : 의자
beanie : 털모자
rusty : 녹슨
booth : 매점
cat : 고양이
crate : 상자
sip : 홀짝이다
read : 읽다
sit : 앉다
weathered : 낡은`,
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
