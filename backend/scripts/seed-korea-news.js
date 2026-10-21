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
  title: '교보문고 의심 주문 거절',

  slug: 'kyobo-rejects-suspicious-100000-book-order-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 교보문고 대량 주문 거절 관련 표현. suspicious, bulk order, acquire, recipient, transaction, obtain.',

  password: 'password_seed_kyobo_rejects_suspicious_order_koreaherald',

  datePublished: '2026-10-20',

  /* 목록 썸네일 — 제목만 있는 텍스트 이미지 */
  thumbnail: '/resources/kyobo-rejects-suspicious-order-title.jpg',

  youtube: 'https://youtube.com/shorts/MVmedU2O0m0',

  intro: [
    '교보문고가 AI 저작권 우려 속에서 의심스러운 도서 10만 권 주문을 거절했다는 The Korea Herald 기사에서 추출한 문장입니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      word: { en: 'suspicious', ko: '의심스러운' },
      example: {
        en: 'Kyobo rejects suspicious 100,000-book order amid AI copyright fears',
        ko: '교보문고, AI 저작권 우려 속 의심스러운 도서 10만 권 주문 거절.',
      },
    },
    {
      word: { en: 'bulk order', ko: '대량 주문' },
      example: {
        en: 'The official stated that verifying the intended use and recipient of bulk orders is standard procedure for Kyobo and has not previously been an issue.',
        ko: '관계자는 대량 주문의 사용 목적과 수령인을 확인하는 것이 교보문고의 표준 절차이며, 이전에는 문제가 된 적이 없다고 밝혔다.',
      },
    },
    {
      word: { en: 'acquire', ko: '획득하다, 취득하다' },
      example: {
        en: 'Meanwhile, the Korean Publishers Association plans to survey major bookstores, secondhand booksellers and distributors to assess attempts to acquire books in bulk.',
        ko: '한편 대한출판문화협회는 도서 대량 확보 시도를 파악하기 위해 주요 서점과 중고서점, 유통업체를 대상으로 실태조사를 실시할 계획이다.',
      },
    },
    {
      word: { en: 'recipient', ko: '수령인, 받는 사람' },
      example: {
        en: 'Kyobo attempted to verify the end recipient’s identity but could not obtain enough information to complete the sale.',
        ko: '교보문고는 최종 수령인의 신원을 확인하려 했지만, 거래를 완료할 만큼 충분한 정보를 얻지 못했다.',
      },
    },
    {
      word: { en: 'transaction', ko: '거래' },
      example: {
        en: 'According to a Kyobo Book Center official, the bookstore chain received a request from a foreign company with no prior transaction history to purchase 100,000 books.',
        ko: '교보문고 관계자에 따르면 교보문고는 이전 거래 이력이 없는 해외 기업으로부터 도서 10만 권 구매 요청을 받았다.',
      },
    },
    {
      word: { en: 'obtain', ko: '얻다, 확보하다' },
      example: {
        en: 'However, in this case, the company could not obtain clear answers during verification.',
        ko: '그러나 이번 사례에서는 회사가 확인 과정에서 명확한 답변을 얻지 못했다.',
      },
    },
  ],

  source: {
    text: 'The Korea Herald | Kyobo rejects suspicious 100,000-book order amid AI copyright fears | By Song Seung-hyun | Published : Oct. 20, 2026 - 15:09:46',
    url: 'https://www.koreaherald.com/article/10908784',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
