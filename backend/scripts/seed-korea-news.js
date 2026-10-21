/**
 * 한국뉴스 업로드 (국방 / 국제)
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-korea-news.js
 * category: '국방' | '국제'  (제목에 [국방]/[국제] 자동 접두)
 */
import { API_BASE } from './loadEnv.js';
import { uploadKoreaNews } from './korea-news-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '강남 방화 용의자 특허 사기 주장',

  slug: 'gangnam-arson-suspect-patent-fraud-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 강남 방화 사건 관련 표현. arson, defraud, flammable, blaze, cardiac arrest, laceration.',

  password: 'password_seed_gangnam_arson_suspect_patent_fraud_koreaherald',

  datePublished: '2026-10-20',

  youtube: 'https://youtube.com/shorts/6LkTVDi7JeQ',

  intro: [
    '강남 방화 용의자가 특허 사기 피해를 주장하고 2022년에도 유사 범행을 시도했다는 The Korea Herald 기사에서 추출한 문장입니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      word: { en: 'arson', ko: '방화' },
      example: {
        en: 'Gangnam arson suspect claims patent fraud, had attempted similar attack in 2022',
        ko: '강남 방화 용의자, 특허 사기 피해 주장…2022년에도 유사 범행 시도.',
      },
    },
    {
      word: { en: 'defraud', ko: '사취하다, 사기를 치다' },
      example: {
        en: 'He said a patent law firm had defrauded him over a patent he filed in 2000.',
        ko: '그는 특허법률사무소가 자신이 2000년에 출원한 특허와 관련해 자신에게 사기를 쳤다고 주장했다.',
      },
    },
    {
      word: { en: 'flammable', ko: '인화성의' },
      example: {
        en: 'Surveillance footage showed the man carrying two plastic containers suspected of holding flammable substances near his home in western Seoul and later carrying them into the Shinmyeong Building, according to Yonhap.',
        ko: '연합뉴스에 따르면 CCTV 영상에는 이 남성이 서울 서부의 자택 근처에서 인화성 물질이 담긴 것으로 의심되는 플라스틱 용기 두 개를 들고 있다가 이후 신명빌딩 안으로 가져가는 모습이 담겼다.',
      },
    },
    {
      word: { en: 'blaze', ko: '큰불, 화재' },
      example: {
        en: 'Firefighters extinguished the blaze at the Hanyang Building at 12:35 p.m. and the Shinmyeong Building at 2:20 p.m.',
        ko: '소방관들은 한양빌딩의 화재를 오후 12시 35분에, 신명빌딩의 화재를 오후 2시 20분에 진화했다.',
      },
    },
    {
      word: { en: 'cardiac arrest', ko: '심정지' },
      example: {
        en: 'One person found in cardiac arrest was taken to a hospital and later resumed breathing, according to fire authorities.',
        ko: '소방당국에 따르면 심정지 상태로 발견된 한 명은 병원으로 이송된 뒤 다시 호흡하기 시작했다.',
      },
    },
    {
      word: { en: 'laceration', ko: '열상, 찢어진 상처' },
      example: {
        en: 'Eight people were injured at the Hanyang Building, including three who were classified as seriously injured with breathing difficulties or lacerations.',
        ko: '한양빌딩에서는 8명이 다쳤으며, 이 가운데 3명은 호흡곤란이나 열상으로 중상자로 분류됐다.',
      },
    },
  ],

  source: {
    text: 'The Korea Herald | Gangnam arson suspect claims patent fraud, had attempted similar attack in 2022 | By Moon Joon-hyun | Published : Oct. 20, 2026 - 19:43:09',
    url: 'https://www.koreaherald.com/article/10909100',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
