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
  title: '피렌체 폰테베키오 · Florence Ponte Vecchio',

  slug: 'florence-ponte-vecchio',

  metaDescription:
    '피렌체 아르노강과 폰테베키오 다리 풍경을 담은 쇼츠용 배경 이미지. bridge, river, dome, easel, postcard 등 관련 영어 표현.',

  password: 'seed_shorts_florence-ponte-vecchio',

  datePublished: '2026-10-21',

  /** 사이트 루트 기준 경로. resources/ 또는 frontend/resources/ 에 파일 배치 */
  image: '/resources/PonteVecchio.jpg',

  sections: [
    {
      heading: '전체 분위기 (Overall Scene)',
      body: `bridge : 다리
river : 강
dome : 둥근 지붕
belltower : 종탑
skyline : 도시 실루엣
arch : 아치
shop : 가게
sunlit : 햇살 가득한
medieval : 중세의
calm : 잔잔한
ochre : 황토색의
overlook : 내려다보다
span : 가로지르다
gleam : 반짝이다`,
    },
    {
      heading: '좌측 전경 (Left Foreground)',
      body: `artist : 화가
frame : 그림 받침대
watercolor : 수채화
apron : 앞치마
newspaper : 신문
stool : 의자
paint : 그리다
lean : 기대다
finish : 완성작
beard : 수염
read : 읽다
sit : 앉다
display : 진열하다
brush : 붓`,
    },
    {
      heading: '중앙 풍경 (Center Scene)',
      body: `postcard : 엽서
hat : 모자
stand : 가판대
cat : 고양이
tabby : 줄무늬 고양이
bouquet : 꽃다발
sunflower : 해바라기
tote : 손가방
pavement : 돌바닥
browse : 고르다
lie : 눕다
carry : 들다
walk : 걷다
wrap : 싸다`,
    },
    {
      heading: '우측 전경 (Right Foreground)',
      body: `tourist : 관광객
schoolchild : 학생
sunhat : 챙 모자
map : 지도
shade : 그늘
shield : 가리다
group : 무리
couple : 두 사람
gaze : 바라보다
hold : 잡다
approach : 다가오다
point : 가리키다
gather : 모이다
wander : 거닐다`,
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
