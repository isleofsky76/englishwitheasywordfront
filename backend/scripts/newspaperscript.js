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
  title: '트라스테베레 밤거리 · Trastevere night street',

  slug: 'trastevere-night-street',

  metaDescription:
    '로마 트라스테베레 골목의 밤 풍경을 담은 쇼츠용 배경 이미지. cobblestone, string lights, newsstand, scooter, fountain 등 관련 영어 표현.',

  password: 'seed_shorts_trastevere-night-street',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/Trastevere.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `alley : 골목
cobblestone : 조약돌 길
twilight : 황혼
stringlight : 줄조명
glow : 빛
warm : 따뜻한
bustling : 활기찬
narrow : 좁은
ochre : 황토색의
dusk : 해질녘
crowd : 인파
stroll : 거닐다
dine : 식사하다
linger : 머무르다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `shop : 가게
treat : 간식
scoop : 뜨다
fountain : 분수
slice : 조각
group : 무리
laugh : 웃다
share : 나눠 먹다
lean : 기대다
eat : 먹다
gather : 모이다
bright : 밝은
window : 창문
chat : 이야기하다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `couple : 두 사람
tablecloth : 식탁보
checkered : 바둑판무늬의
wine : 포도주
carafe : 물병
plate : 접시
lamp : 등
rider : 타는 사람
cat : 고양이
weave : 비집고 가다
pour : 따르다
sit : 앉다
pass : 지나가다
glow : 빛나다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `newsstand : 신문 가판대
newspaper : 신문
driver : 운전사
car : 차
door : 문
booth : 매점
postcard : 엽서
magazine : 잡지
lean : 기대다
read : 읽다
open : 열다
wait : 기다리다
weathered : 낡은
sell : 팔다`,
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
