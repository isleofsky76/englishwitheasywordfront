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

const article = {
  title: '스페인 포도원 테라스 · Spanish vineyard terrace',

  slug: 'spanish-vineyard-terrace',

  metaDescription:
    '중세풍 돌담과 포도원이 펼쳐진 스페인 시골 마을의 야외 테라스 풍경. 여행자와 현지인들이 한적한 분위기 속에서 대화하고 쉬는 모습을 담은 쇼츠용 배경 이미지입니다.',

  password: 'seed_shorts_spanish-vineyard-terrace',

  datePublished: '2026-08-31',

  /** GitHub: resources/spain.jpg (send_photo와 동일) — frontend/resources/에 두어도 push 시 resources/로 복사 */
  image: '/resources/spain.jpg',

  sections: [
    {
      heading: '전체적인 분위기 (Overall Scene)',

      body: `포도원 : vineyard (vineyard /ˈvɪnjərd/ 명사 포도원)

언덕 : hill

자갈 포장길 : cobblestone path

풍경 / 경치 : scenery

시골 : countryside

분위기 : ambiance (ambiance /ˈæmbiəns/ (장소 등의) 분위기)

중세의 : medieval 

울퉁불퉁한 : uneven

햇살이 드는 : sunlit

목가적인 / 소박한 : rustic (rustic /ˈrʌstɪk/ 형용사 시골풍의·소박한)

평온한 / 한적한 : tranquil 

펼쳐지다 : unfold

그림자를 드리우다 : cast a shadow

둘러싸다 / 감싸다 : surround`,
    },

    {
      heading: '좌측 전경 (Left Foreground)',

      body: `탁자 / 테이블 : table



의자 : chair

셔츠 : shirt

음료 : beverage (

덩굴 식물 : ivy (ivy /ˈaɪvi/ 명사 담쟁이덩굴)

화분 : pot

허브 : herb

둥근 : round

나무로 된 : wooden

엮은 : woven (woven /ˈwoʊvən/ 형용사 엮어서 만든)

소매를 걷어 올린 : with rolled-up sleeves

차가운 음료 : iced beverage

앉다 : sit

대화하다 / 담소하다 : converse (converse /kənˈvɜːrs/ 동사 격식 (~와) 대화[이야기]를 나누다)

팔을 기대다 / 괴다 : rest one’s arm

마주보다 : face each other

자라다 : grow`,
    },

    {
      heading: '중앙 풍경 (Center Scene)',

      body: `직원 / 서빙원 : server

앞치마 : apron 

주문 : order

수첩 : notepad

등산객 / 여행자 : hiker

배낭 : backpack

메뉴판 : menu

야외의 : outdoor

주의 깊은 : attentive 

바깥쪽의 : exterior 

주문을 받다 : take an order

주문을 적다 : write down an order

배낭을 메다 : carry a backpack

메뉴를 둘러보다 : browse the menu 

기다리다 : wait`,
    },

    {
      heading: '우측 전경 (Right Foreground)',

      body: `신문 : newspaper

담배 : cigarette

재떨이 : ashtray

잔 / 글라스 : glass

와인 : wine

핸드백 : purse

자전거 : bicycle

돌담 : stone wall

고전적인 / 빈티지의 : vintage 

가죽의 : leather

따뜻한 : warm

중년의 : middle-aged

여유로운 : relaxing

들다 / 잡다 : hold

조금씩 마시다 : sip (sip /sɪp/ 동사 조금씩 마시다)

담배를 피우다 : smoke a cigarette

기대어 놓다 : prop against (prop /prɑːp/ 동사 기대어 세워 놓다)

쉬다 : relax`,
    },
  ],
};

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

// ========== 여기만 수정 ==========

uploadShortsBgImage(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
