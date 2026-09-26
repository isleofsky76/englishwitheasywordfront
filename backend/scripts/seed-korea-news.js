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
  title: '나나 입술 필러 논란',

  slug: 'nana-apologizes-lip-filler-controversy-netflix-the-scandal-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 나나의 넷플릭스 The Scandal 입술 필러 논란 관련 문장. sparked by her appearance, disrupting immersion, made viewers uncomfortable, felt out of place.',

  password: 'password_seed_nana_lip_filler_controversy_netflix_the_scandal_koreaherald',

  datePublished: '2026-09-23',

  intro: [
    '배우 나나가 넷플릭스 The Scandal에서 자신의 외모를 둘러싼 논란에 대해 사과했다는 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 나나는 자신의 외모로 촉발된(**sparked by her appearance**) 논란에 대해(**the controversy**) 사과했습니다(**apologized for**).',
      ],
    },
    {
      narrative: [
        '2. 시청자들은 그녀의 입술 필러로 보이는 것(**apparent lip filler**)이 드라마에 대한 몰입을 방해했다며(**disrupting immersion**) 그녀를 비판했습니다(**criticized her**).',
      ],
    },
    {
      narrative: [
        '3. 나나는 자신의 입술이 시청자들을 불편하게 했다면(**made viewers uncomfortable**) 그것은 자신의 잘못이며(**that was my fault**), 배우로서 자신에게 적절하지 않은 개인적인 선택(**a personal choice that wasn’t the right one for me as an actor**)이었다고 말했습니다.',
      ],
    },
    {
      narrative: [
        '4. 비판하는 사람들은(**Critics**) 그 모습이 시대극 배경에 어울리지 않았으며(**felt out of place for the historical setting**) 그녀의 캐릭터에도 어울리지 않았다고(**did not suit her character**) 말했습니다.',
      ],
    },
  ],

  source: {
    text: "The Korea Herald | Nana apologizes over lip filler controversy in Netflix's 'The Scandal' | By Lee Yoon-seo",
    url: 'https://www.koreaherald.com/article/10883710',
  },
};


// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
