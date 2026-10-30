/**
 * 유의어(연관단어) 업로드
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-synonym.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadSynonym } from './synonym-format.js';

// ========== 여기만 수정 ==========
const article = {
  title: '끓이다 · 우리다 · 꾸미다 #연관단어',

  slug: 'brew-boil-steep-ferment-bland-related-words',

  metaDescription:
    'brew, boil, steep, ferment, bland, develop, plot, erupt, contrive 뜻·발음 연관단어 모음.',

  password: 'seed_synonym_brew-boil-steep-ferment-bland',

  datePublished: '2026-10-30',

  intro: [
    '끓이다 · 우리다 · 꾸미다 연관단어를 정리합니다. *AI 음성과 이미지를 사용했습니다.',
  ],

  words: [
    {
      title: '1. 끓이다, 양조하다, 꾸미다',
      narrative: ['**brew**(bruː / 브루)'],
    },
    {
      title: '2. 끓이다, 끓다',
      narrative: ['**boil**(bɔɪl / 보일)'],
    },
    {
      title: '3. 우리다, 담가 두다',
      narrative: ['**steep**(stiːp / 스티프)'],
    },
    {
      title: '4. 발효하다, 발효시키다',
      narrative: ['**ferment**(fərˈment / 퍼멘트)'],
    },
    {
      title: '5. 싱거운, 맛이 밋밋한',
      narrative: ['**bland**(blænd / 블랜드)'],
    },
    {
      title: '6. 형성되다, 발전하다',
      narrative: ['**develop**(dɪˈveləp / 디벨럽)'],
    },
    {
      title: '7. 음모를 꾸미다',
      narrative: ['**plot**(plɑːt / 플랏)'],
    },
    {
      title: '8. 폭발하다, 갑자기 터져 나오다',
      narrative: ['**erupt**(ɪˈrʌpt / 이러프트)'],
    },
    {
      title: '9. 꾀하다, 고안하다',
      narrative: ['**contrive**(kənˈtraɪv / 컨트라이브)'],
    },
  ],

  wordMeta: [
    { num: 1, expression: 'brew', meaning: '끓이다, 양조하다, 꾸미다', exampleEn: 'She brews a pot of tea every morning.', exampleKo: '' },
    { num: 2, expression: 'boil', meaning: '끓이다, 끓다', exampleEn: 'Boil the water before you make the tea.', exampleKo: '' },
    { num: 3, expression: 'steep', meaning: '우리다, 담가 두다', exampleEn: 'Let the tea leaves steep for three minutes.', exampleKo: '' },
    { num: 4, expression: 'ferment', meaning: '발효하다, 발효시키다', exampleEn: 'The beer ferments for two weeks.', exampleKo: '' },
    { num: 5, expression: 'bland', meaning: '싱거운, 맛이 밋밋한', exampleEn: 'The soup tastes a little bland.', exampleKo: '' },
    { num: 6, expression: 'develop', meaning: '형성되다, 발전하다', exampleEn: 'A storm is developing over the sea.', exampleKo: '' },
    { num: 7, expression: 'plot', meaning: '음모를 꾸미다', exampleEn: 'They plotted to steal the money.', exampleKo: '' },
    { num: 8, expression: 'erupt', meaning: '폭발하다, 갑자기 터져 나오다', exampleEn: 'Anger erupted in the meeting room.', exampleKo: '' },
    { num: 9, expression: 'contrive', meaning: '꾀하다, 고안하다', exampleEn: 'He contrived a way to escape.', exampleKo: '' },
  ],

  youtube: 'https://www.youtube.com/shorts/XdMBQPrWvDQ',
  videoId: 'XdMBQPrWvDQ',
};
// ===============================

uploadSynonym(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
