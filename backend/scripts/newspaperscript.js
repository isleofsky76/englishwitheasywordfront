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
  title: '엑상프로방스 시장 광장 · Aix-en-Provence market square',

  slug: 'aix-en-provence-market-square',

  metaDescription:
    '프랑스 엑상프로방스 야외 시장 광장 풍경을 담은 쇼츠용 배경 이미지. market, fountain, cobblestone, peach, bouquet 등 관련 영어 표현.',

  password: 'seed_shorts_aix-en-provence-market-square',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/Aix-en-Provence.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `market : 시장
square : 광장
cobblestone : 조약돌 길
awning : 차양
shade : 그늘
sunlit : 햇살 가득한
bustling : 활기찬
leafy : 잎이 무성한
ochre : 황토색의
shutter : 덧문
clocktower : 시계탑
browse : 둘러보다
gather : 모이다
stroll : 거닐다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `crate : 상자
peach : 복숭아
produce : 농산물
chalkboard : 칠판
stall : 가판대
umbrella : 우산
customer : 손님
vendor : 상인
fresh : 신선한
pile : 쌓다
weigh : 달다
pick : 고르다
display : 진열하다
bargain : 흥정하다`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `fountain : 분수
moss : 이끼
newspaper : 신문
bench : 긴 의자
stroller : 유모차
leash : 목줄
dog : 개
couple : 두 사람
edge : 가장자리
sleep : 자다
sniff : 냄새 맡다
read : 읽다
sit : 앉다
chat : 이야기하다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `bouquet : 꽃다발
peony : 작약
bloom : 꽃
bread : 빵
staircase : 계단
teenager : 십 대
snack : 간식
elder : 어르신
hold : 들다
stand : 서 있다
climb : 오르다
sell : 팔다
buy : 사다
admire : 감상하다`,
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
