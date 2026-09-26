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
  title: '북한군 포로 이송 비공개 논란',

  slug: 'kyiv-denies-seoul-north-korean-pow-transfer-confidential-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 북한군 포로 한국 이송 비공개 합의 논란 관련 문장. keep the transfer confidential, no such agreement, conceal the whereabouts, break the agreement, disclose the information, reveal the truth.',

  password: 'password_seed_north_korean_pow_transfer_confidential_koreaherald',

  datePublished: '2026-09-26',

  intro: [
    '북한군 포로 2명의 한국 이송을 비공개로 하기로 합의했다는 한국 정부의 주장에 대해 우크라이나 측이 부인하면서 벌어진 논란을 다룬 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 우크라이나는 양측이 북한군 포로 2명의 최근 한국 이송을(**the recent transfer of two North Korean prisoners-of-war to South Korea**) 비공개로 유지하기로 합의했다는(**agreed to keep ... confidential**) 한국 측의 주장을 부인했습니다(**denied Seoul’s claim**).',
      ],
    },
    {
      narrative: [
        '2. 우크라이나 대통령의 보좌관은 그러한 합의는 없었다며(**There was no such agreement**), 특정 포로들의 소재를 숨기는 것은(**conceal the whereabouts of specific prisoners**) 잘못된 일이라고 밝혔습니다(**it would be wrong**).',
      ],
    },
    {
      narrative: [
        '3. 이재명 대통령은 한국과 우크라이나가 포로 이송을 비공개로 유지하기로 합의했으며(**reached an agreement to keep the POW transfer confidential**), 우크라이나 측이 합의를 깨고(**break the agreement**) 정보를 공개한 것(**disclose the information**)에 깊은 유감을 표했습니다.',
      ],
    },
  
  ],

  source: {
    text: "The Korea Herald | Kyiv denies Seoul's claim of consensus to keep North Korean POW transfer confidential | By Son Ji-hyoung",
    url: 'https://www.koreaherald.com/article/10884823',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
