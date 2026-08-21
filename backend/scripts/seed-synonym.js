/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: 'stalemate 교착상태 연관 단어 정리 | stagnant · deadlock · impasse',
  slug: 'stalemate-related-words',
  metaDescription:
    'stalemate(교착상태), stagnant(정체된), deadlock(완전한 교착상태), impasse(교착 상태), gridlock(정체·교착), standstill(정지·중단) 뜻·발음·예문을 정리한 연관 어휘 학습입니다.',
  password: 'seed_synonym_stalemate-related-words',
  datePublished: '2026-08-21',

  intro: [
    '전쟁·정치·협상·교통처럼 상황이 더 이상 앞으로 나아가지 못할 때 자주 쓰이는 **교착·정체 표현**을 묶어 봤습니다. stalemate를 중심으로 stagnant, deadlock, impasse, gridlock, standstill이 각각 어떤 뉘앙스로 쓰이는지 예문과 함께 정리합니다.',
  ],

  words: [
    {
      title: '1. stalemate',
      narrative:
        'stalemate는 **교착상태**, 더 이상 어느 쪽도 진전하지 못하는 상황이라는 뜻입니다. /ˈsteɪlmeɪt/ (스테일메이트). *"Just like in the first world war we have reached the level of technology that puts us into a stalemate," he says.* — **we have reached** 우리는 도달했고 **the level of technology** 그러한 기술 수준이 **puts us into a stalemate** 우리를 교착상태에 빠뜨린다는 의미입니다.',
    },
    {
      title: '2. stagnant',
      narrative:
        'stagnant는 **정체된**, **발전이나 변화가 없는**이라는 뜻입니다. /ˈstæɡnənt/ (스태그넌트). *The front line in Ukraine really hasn\'t changed very much. It\'s still very stagnant.* — **The front line in Ukraine** 우크라이나 전선은 **hasn\'t changed very much** 크게 변하지 않았고 **still very stagnant** 여전히 매우 정체되어 있다는 의미입니다.',
    },
    {
      title: '3. deadlock',
      narrative:
        'deadlock은 **완전한 교착상태**, 서로 대립해 움직일 수 없는 상황이라는 뜻입니다. /ˈdedlɑːk/ (데드락). *The deadlock has heavily disrupted traffic in the waterway.* — **The deadlock** 그 교착상태가 **traffic in the waterway** 수로의 통행을 **has heavily disrupted** 크게 방해했다는 의미입니다.',
    },
    {
      title: '4. impasse',
      narrative:
        'impasse는 **교착 상태**, **막다른 상황**이라는 뜻입니다. /ˈɪmpæs/ (임패스). 특히 협상이나 외교 문제가 해결되지 못하고 막혀 있을 때 자주 쓰입니다. *From impasse in Iran to still-unresolved conflicts in Gaza and Lebanon, a trend is clear.* — **impasse in Iran** 이란의 교착상태부터 **still-unresolved conflicts** 여전히 해결되지 않은 분쟁까지 이어지는 가운데 **a trend is clear** 하나의 흐름이 분명하다는 의미입니다.',
    },
    {
      title: '5. gridlock',
      narrative:
        'gridlock은 원래 **도로의 극심한 교통 정체**를 뜻하지만 정치에서는 **정치적 교착상태**라는 의미로도 매우 자주 쓰입니다. /ˈɡrɪdlɑːk/ (그리드락). *Congress is in gridlock.* — **Congress** 의회가 **is in gridlock** 교착상태에 빠져 있다는 의미입니다.',
    },
    {
      title: '6. standstill',
      narrative:
        'standstill은 **정지**, **완전한 중단**이라는 뜻입니다. /ˈstændstɪl/ (스탠드스틸). *It would not take many defections to bring Mr Trump\'s agenda to a standstill.* — **not take many defections** 많은 이탈이 필요하지 않고 **bring Mr Trump\'s agenda** 트럼프의 의제를 **to a standstill** 완전히 멈추게 할 수 있다는 의미입니다.',
    },
  ],

  youtube: 'https://www.youtube.com/watch?v=RwPEjicRxCM&list=PLepVNyM8dwWg',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
