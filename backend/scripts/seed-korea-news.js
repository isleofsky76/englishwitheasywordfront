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
  title: '제주 호텔 염소 가스, 59명 병원 이송',

  slug: 'jeju-grand-josun-chlorine-gas-59-hospitalized-koreaherald',

  metaDescription:
    'The Korea Herald 기사에서 추출한 제주 그랜드 조선 호텔 염소 가스 환자 이송 관련 문장. Fifty-nine guests and employees were hospitalized, evacuated all 85 guests, chlorine gas, face masks.',

  password: 'password_seed_jeju_grand_josun_chlorine_gas_koreaherald',

  datePublished: '2026-10-01',

  intro: [
    '제주 서귀포 그랜드 조선 제주 호텔에서 염소 가스가 퍼져 투숙객과 직원 59명이 병원으로 옮겨진 일을 전한 The Korea Herald 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 목요일 제주 그랜드 조선 제주 호텔에 염소 가스가 퍼지면서 투숙객과 직원 59명이 메스꺼움, 어지럼증 등 증상으로 병원에 이송됐습니다(**Fifty-nine guests and employees were hospitalized Thursday after chlorine gas spread**).',
      ],
    },
    {
      narrative: [
        '2. 소방은 서귀포 중문관광단지 5성급 호텔 투숙객 85명 전원을 대피시킨 뒤(**evacuated all 85 guests**) 59명을 인근 병원으로 옮겼고 중상자는 없었으며(**None was reported to be seriously injured**), 1층 수영장 청소 중 소독제 비율이 잘못돼 염소 가스가 발생한 것으로 보고 있습니다(**mixed in incorrect proportions, generating chlorine gas**).',
      ],
    },
    {
      narrative: [
        '3. 일부 투숙객은 신세계그룹 조선호텔앤리조트가 운영하는 호텔이 곧바로 대피시키지 않고 마스크도 지급하지 않았다고 비판했고(**did not immediately evacuate them and failed to provide face masks**), 호텔 측은 안내 방송과 객실 방문으로 대피를 알렸다고 밝혔습니다(**issued evacuation instructions through announcements and visits to guest rooms**).',
      ],
    },
  ],

  source: {
    text: 'The Korea Herald | 59 hospitalized after chlorine gas spreads in Jeju hotel | By Lee Seung-ku',
    url: 'https://www.koreaherald.com/article/10890993',
  },
};
// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
