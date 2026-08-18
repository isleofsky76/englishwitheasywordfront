/**
 * 국방뉴스 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-defense-news.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadDefenseNews } from './defense-news-format.js';


// ========== 여기만 수정 ==========
const article = {
  title: '[WSJ 국제영어] 미 국방부 1200억 달러 무기 계약 | covert · thwart · earmark 어휘',
  slug: 'pentagon-120-billion-patriot-missiles-vocabulary',
  metaDescription:
    '미 국방부의 1200억 달러 규모 패트리엇 미사일·잠수함 계약 WSJ 뉴스를 통해 covert, thwart, skepticism, appropriation, earmark 등 핵심 시사영어를 배웁니다.',
  password: 'password_seed_pentagon_120_billion_patriot_missiles_vocabulary',
  datePublished: '2026-08-18',

  intro: [
    '미 국방부가 패트리엇 미사일과 잠수함 등 대규모 무기 조달에 1200억 달러 이상을 투입하기로 했습니다. 이번 WSJ 기사에서 나온 핵심 표현을, 뉴스 카드 형식이 아니라 블로그 글처럼 차근차근 풀어서 정리해 봅니다.',
  ],

  words: [
    {
      title: '1. covert',
      narrative:
        'covert는 **비밀의**, **은밀한** 뜻입니다. covert operation, covert surveillance처럼 쓰입니다. 기사 문장은 *Allow commanders to launch covert strikes.* — **commander** 지휘관들이 **covert** 은밀한 **strikes** 공격을 **to launch** 개시하는 것을 허락했다는 의미입니다.',
    },
    {
      title: '2. thwart',
      narrative:
        'thwart는 **저지하다**, **좌절시키다**는 뜻입니다. *Capable of thwarting ballistic missiles.* — **ballistic missiles** 탄도미사일을 **thwart** 저지할 **capable of** ~할 수 있다는 뜻으로, 미사일 방어 체계가 공격을 막아낼 수 있다는 의미입니다.',
    },
    {
      title: '3. skepticism',
      narrative:
        'skepticism은 **회의론**, **회의적인 태도**라는 뜻입니다. *Democrats and some Republicans have expressed skepticism about.* — **Democrats and some Republicans** 민주당원과 일부 공화당원이 about에 대해 **skepticism** 회의적인 태도를 **expressed** 나타냈다는 의미입니다.',
    },
    {
      title: '4. subject to',
      narrative:
        'subject to는 **~을 조건으로 하는**, **~에 따라 달라지는**이라는 뜻입니다. *Subject to further talks over finalized terms.* — **finalized terms** 최종 조건에 대한 **further talks** 추가 협상을 **subject to** ~을 조건으로 한다는 의미입니다.',
    },
    {
      title: '5. appropriation',
      narrative:
        'appropriation은 **예산 배정**, **세출 승인**이라는 뜻입니다. *Lack full appropriations from Congress.* — **Congress** 의회로부터 **full appropriations** 완전한 예산 배정을 **lack** 받지 못했다는 뜻입니다.',
    },
    {
      title: '6. earmark',
      narrative:
        'earmark는 **특정 목적을 위해 배정하다**는 뜻입니다. *The Pentagon on Wednesday earmarked more than $120 billion for contractors.* — **The Pentagon** 미 국방부가 **on Wednesday** 수요일 **contractors** 계약업체들을 위해 1200억 달러 이상을 **earmarked** 배정했다는 의미입니다.',
    },
    {
      title: '7. value',
      narrative:
        'value는 여기서 **가치·가격을 평가하다**는 뜻입니다. *The Patriot contract with missile maker Lockheed Martin is now valued at nearly $59 billion.* — **The Patriot contract with missile maker Lockheed Martin** 미사일 제조업체 록히드마틴과의 패트리엇 계약이 **now** 현재 약 590억 달러 규모로 **valued at** 평가된다는 의미입니다.',
    },
    {
      title: '8. weaponry',
      narrative:
        'weaponry는 **무기류**, **무기 체계**라는 뜻입니다. *Annual purchases to guarantee a smoother supply of weaponry over time.* — **over time** 장기간에 걸쳐 **weaponry** 무기류를 더 원활하게 공급하기 위해 **guarantee** **annual purchases** 연간 구매를 한다는 의미입니다.',
    },
  ],

  source: {
    text: 'The Wall Street Journal | Pentagon Commits Over $120 Billion for Patriot Missiles, Submarines | By Drew FitzGerald and Marcus Weisgerber',
    url: 'https://www.wsj.com/politics/national-security/pentagon-widens-patriot-missile-order-to-nearly-59-billion-b3da2e01',
  },

  youtube: 'https://www.youtube.com/shorts/5HvLP-bF3Oc',
};

// =================================

uploadDefenseNews(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
