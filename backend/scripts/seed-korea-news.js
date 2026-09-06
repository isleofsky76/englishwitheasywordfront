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
  title: '서울세계불꽃축제',

  slug: 'seoul-fireworks-show-lights-up-skies-yonhap',

  metaDescription:
    'Yonhap 기사에서 추출한 서울세계불꽃축제 관련 문장. annual fireworks show, cool early autumn night, lighting up the skies, spectators on hand, capped off the night, drawing oohs and aahs, traffic controls.',

  password: 'password_seed_seoul_fireworks_show_lights_up_skies_yonhap',

  datePublished: '2026-09-05',

  intro: [
    '서울세계불꽃축제가 선선한 초가을 밤 서울 하늘을 밝혔다 는 연합뉴스 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 한국 최대 규모의 연례 불꽃놀이(**annual fireworks show**)가 선선한 초가을 밤(**cool early autumn night**) 서울 하늘을 밝혔습니다(**lighting up the skies**).',
      ],
    },
    {
      narrative: [
        '2. 올해 행사는 추석 연휴(**Chuseok fall harvest holiday**) 때문에 예년보다 약 3주 일찍 열렸습니다(**took place about three weeks earlier**).',
      ],
    },
    {
      narrative: [
        '3. 서울세계불꽃축제에는 약 53만 명의 관람객(**spectators**)이 현장에 있었습니다(**on hand**).',
      ],
    },
    {
      narrative: [
        '4. 한국 팀은 마지막 약 20분간 공연하며(**with its show for the final 20 minutes**) 밤을 마무리했고(**capped off the night**), 관람객들의 감탄을 자아냈습니다(**drawing oohs and aahs**).',
      ],
    },
    {
      narrative: [
        '5. 약 6,800명의 인력이 동원돼(**were mobilized**) 인파를 관리하고(**manage crowds**) 비상 상황에 대응했습니다(**handle emergencies**).',
      ],
    },
    {
      narrative: [
        '6. 서울시는 관련 기관들과 함께(**with relevant agencies**) 안전본부를 설치해(**set up a safety headquarters**) 인파와 교통을 관리했습니다(**oversee crowds and traffic**).',
      ],
    },
    {
      narrative: [
        '7. 현장 지휘센터(**operational command centers**)가 응급의료시설을 겸했고(**doubling as emergency medical stations**), 45척의 순찰선(**45 patrol boats**)이 투입됐습니다.',
      ],
    },
    {
      narrative: [
        '8. 교통 통제가 시행됐고(**Traffic controls were also enforced**), 제한 구간의 24개 버스 노선이 일시적으로 우회됐습니다(**were temporarily rerouted**).',
      ],
    },
  ],

  source: {
    text: 'Yonhap | Fireworks show lights up Seoul skies',
    url: 'https://en.yna.co.kr/view/AEN20260905000751315',
  },

 

};

// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
