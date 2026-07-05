/**
 * News Voca (guestbook) 샘플 글 1개 추가 + SEO
 *
 * 사용법: 아래 article JSON 수정 → node scripts/seed-news-voca.js
 */
import { API_BASE } from './loadEnv.js';
import { uploadNewsVoca } from './news-voca-format.js';

// ========== 여기만 수정 ==========

const article = {
  title: '[CNN] 월드컵 심판은 어떻게 뽑힐까? | 결승전 심판이 되기까지의 긴 여정',
  slug: 'world-cup-referee-selection-final-cnn',
  metaDescription:
  '월드컵 심판들은 수년간의 평가, 체력 테스트, 국제대회 경험, 경기 운영 능력을 거쳐 선발됩니다. 이 글에서는 grueling, contingent, scrutiny 세 가지 핵심 영어 단어를 예문과 구문별 번역으로 정리합니다.',
  password: 'password_seed_world_cup_referee_selection_final_cnn',
  datePublished: '2026-07-03',
  
  intro: [
  '기사는 월드컵 심판들이 체력 테스트, 국제대회 경험, 경기 평가, 개인적 희생을 거쳐 선발되며, 결승전 심판이 되기까지 엄청난 압박과 책임을 감당해야 한다는 내용을 다룹니다.',
  ],
  
  words: [
  {
  title: '중요 단어 1. grueling',
  word: { en: 'grueling', ko: '몹시 힘든, 고된', pron: '그루얼링' },
  example: {
  en: 'World Cup referees go through a grueling selection process before reaching the tournament.',
  ko: '월드컵 심판들은 대회에 도달하기 전 몹시 힘든 선발 과정을 거칩니다.',
  },
  phrases: [
  { en: 'World Cup referees', ko: '월드컵 심판들은' },
  { en: 'go through', ko: '거칩니다' },
  { en: 'a grueling selection process', ko: '몹시 힘든 선발 과정을' },
  { en: 'before reaching', ko: '도달하기 전에' },
  { en: 'the tournament', ko: '그 대회에' },
  ],
  },
  {
  title: '중요 단어 2. contingent',
  word: { en: 'contingent', ko: '대표단, 파견단, 특정 집단', pron: '컨틴전트' },
  example: {
  en: 'The referee contingent is the largest in World Cup history.',
  ko: '그 심판단은 월드컵 역사상 가장 큰 규모입니다.',
  },
  phrases: [
  { en: 'The referee contingent', ko: '그 심판단은' },
  { en: 'is', ko: '~입니다' },
  { en: 'the largest', ko: '가장 큰 규모' },
  { en: 'in World Cup history', ko: '월드컵 역사상' },
  ],
  },
  {
  title: '중요 단어 3. scrutiny',
  word: { en: 'scrutiny', ko: '정밀한 조사, 엄격한 감시', pron: '스크루터니' },
  example: {
  en: 'VAR has put referees’ decisions under sharper scrutiny.',
  ko: 'VAR은 심판들의 판정을 더 엄격한 감시 아래 놓이게 했습니다.',
  },
  phrases: [
  { en: 'VAR', ko: 'VAR은' },
  { en: 'has put', ko: '놓이게 했습니다' },
  { en: 'referees’ decisions', ko: '심판들의 판정을' },
  { en: 'under sharper scrutiny', ko: '더 엄격한 감시 아래에' },
  ],
  },
  ],
  
  source: {
  text: 'CNN | What it takes to be chosen as a World Cup referee – and how to ref the final | By Reagan Yip',
  url: 'https://edition.cnn.com/2026/07/03/sport/world-cup-referee-how-to-become-one?iid=cnn_buildContentRecirc_end_recirc&recs_exp=up-next-article-end&tenant_id=related.en',
  },
  
  };


// =================================

uploadNewsVoca(article, API_BASE)
  .then(() => console.log('완료.'))
  .catch((e) => {
    console.error('  오류:', e.message);
    process.exitCode = 1;
  });
