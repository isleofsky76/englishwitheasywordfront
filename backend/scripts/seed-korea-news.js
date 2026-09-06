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
  title: '이란의 한국 파병 경고',

  slug: 'iran-warns-korea-hormuz-deployment-war-koreatimes',

  metaDescription:
    'The Korea Times 기사에서 추출한 이란의 한국 호르무즈 해협 배치 경고 관련 문장. senior Iranian official, warned against deploying military assets, the Strait of Hormuz, would amount to direct military participation, sacrifice its interests and reputation.',

  password: 'password_seed_iran_warns_korea_hormuz_deployment_war_koreatimes',

  datePublished: '2026-09-06',

  intro: [
    '이란 고위 관리가 한국의 호르무즈 해협 군사 자산 배치 가능성에 경고했다는 The Korea Times 기사에서 추출한 문장입니다.',
  ],

  words: [
    {
      narrative: [
        '1. 한 고위 이란 관리(**senior Iranian official**)는 한국에 호르무즈 해협으로의 군사 자산 배치(**deploying military assets**)를 하지 말라고 경고했습니다(**has warned against**).',
      ],
    },
    {
      narrative: [
        '2. 호르무즈 해협에서 이란에 대항하는 어떠한 한국의 개입도(**Any South Korean involvement**) 이란을 향한 침략과 전쟁에 직접적인 군사적 참여에 해당할 것이라고 했습니다(**would amount to direct military participation**) amount to something  = …와 마찬가지이다[…에 해당하다], (합계가) …에 이르다[달하다]',
      ],
    },
    {
      narrative: [
        '3. 그 관리는 또한 서울에 미국의 군사 작전을 지원함으로써 자국의 이익과 평판을 희생하지 말라고 촉구했습니다(**urged not to sacrifice its interests and reputation**).',
      ],
    },
    {
      narrative: [
        '4. 그 경고는 한국이 워싱턴으로부터의 커지는 압박 속에서(**amid growing pressure from Washington**) 핵심 수로를 확보하기 위한 노력에(**efforts to secure the key waterway**) 가능한 기여를 저울질하고 있는 가운데 나왔습니다(**comes as Korea weighs a possible contribution to**).',
      ],
    },
  ],

  source: {
    text: 'The Korea Times | Iranian official warns Korea Hormuz deployment would mean joining war',
    url: 'https://www.koreatimes.co.kr/world/20260906/iranian-official-warns-koreas-hormuz-deployment-would-mean-joining-war',
  },


};
 



// ===============================

uploadKoreaNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
