/**
 * 퀴즈 복수 정답 보강
 * - 연관단어 묶음: 한글 의미 토큰이 겹치면 en/ko 정답을 서로 공유
 * - 단어별 수동 대체 답 (사전식 유사어)
 */

/** 수동 대체 답 (소문자 키) */
export const QUIZ_ANSWER_ALTS = {
  stalemate: {
    ko: ['교착 상태', '교착상태', '막다른 골목', '궁지', '교착', '막힘', '정체'],
    en: ['deadlock', 'impasse', 'standstill', 'gridlock'],
  },
  deadlock: {
    ko: ['교착 상태', '교착상태', '완전한 교착상태', '막다른 골목', '궁지', '교착'],
    en: ['stalemate', 'impasse', 'standstill'],
  },
  impasse: {
    ko: ['교착 상태', '교착상태', '막다른 교착상태', '막다른 골목', '궁지', '막힘'],
    en: ['stalemate', 'deadlock', 'standstill'],
  },
  gridlock: {
    ko: ['교착', '교통 체증', '정치적 교착', '교착상태', '마비'],
    en: ['stalemate', 'deadlock', 'standstill'],
  },
  standstill: {
    ko: ['정지', '완전한 중단', '멈춤', '정체', '교착'],
    en: ['stalemate', 'deadlock', 'impasse'],
  },
  stagnant: {
    ko: ['정체된', '변화가 없는', '고인', '침체된', '정체'],
    en: [],
  },
  ask: {
    ko: ['부탁하다', '해 달라고 부탁하다', '묻다', '요청하다'],
    en: ['request', 'seek'],
  },
  request: {
    ko: ['요청하다', '공식적으로 요청하다', '부탁하다', '요구하다'],
    en: ['ask', 'seek'],
  },
  beg: {
    ko: ['애원하다', '간청하다', '빌다'],
    en: ['plead', 'implore', 'entreat', 'beseech'],
  },
  plead: {
    ko: ['간청하다', '애원하다', '호소하다'],
    en: ['beg', 'implore', 'entreat', 'beseech'],
  },
  implore: {
    ko: ['애원하다', '간청하다', '호소하다'],
    en: ['beg', 'plead', 'entreat', 'beseech'],
  },
  demand: {
    ko: ['요구하다', '강하게 요구하다', '요구'],
    en: ['insist', 'call for'],
  },
  bug: {
    ko: ['버그', '오류', '결함', '소프트웨어 오류', '프로그램 오류'],
    en: ['flaw'],
  },
  flaw: {
    ko: ['결함', '허점', '약점', '흠', '결점', '버그'],
    en: ['bug', 'vulnerability'],
  },
  vulnerability: {
    ko: ['취약점', '보안 취약점', '취약성', '허점'],
    en: ['flaw'],
  },
  quit: {
    ko: ['그만두다', '사직하다', '그만하다', '끊다', '포기하다'],
    en: ['resign', 'give up'],
  },
  resign: {
    ko: ['사임하다', '사직하다', '물러나다'],
    en: ['quit', 'step down'],
  },
  abandon: {
    ko: ['버리다', '포기하다', '방기하다', '떠나다'],
    en: ['desert', 'forsake', 'give up'],
  },
  calligraphy: {
    ko: ['서예', '붓글씨', '캘리그래피'],
    en: [],
  },
  juxtaposed: {
    ko: [
      '나란히 놓인',
      '나란히 배치된',
      '대조되도록 놓인',
      '비교되도록 나란히 놓인',
      '병치된',
      '대조적으로 배치된',
    ],
    en: ['juxtapose'],
  },
  scholarly: {
    ko: ['학문적인', '학술적인', '전문적인', '학자다운', '학술적'],
    en: [],
  },
  intuitive: {
    ko: ['직관적인', '직관적', '감으로 아는', '본능적인'],
    en: [],
  },
  diaristic: {
    ko: ['일기식의', '일기체의', '일기 형식의', '일기처럼 쓴', '일기체'],
    en: [],
  },
  formidable: {
    ko: ['대단한', '뛰어난', '막강한', '가공할', '무시무시한', '감탄할 만큼 뛰어난', 'formidable한'],
    en: [],
  },
  'loom large': {
    ko: ['크게 부각되다', '크게 다가오다', '두드러지다', '크게 느껴지다', '압도적으로 다가오다'],
    en: ['loom'],
  },
  dedication: {
    ko: ['헌신', '열성', '전념', '헌신적 노력', '몰두', '애정'],
    en: [],
  },
  commemorate: {
    ko: ['기념하다', '기리다', '추모하다', '특별한 일을 기념하다', '기억하다'],
    en: [],
  },
  'one-off': {
    ko: ['일회성', '일회성 사례', '단 한 번', '단 한 번 있는 일', '일회적인 것', '단발성'],
    en: ['one off', 'oneoff'],
  },
  deficit: {
    ko: ['적자', '부족', '결손', '재정적자', '부족분'],
    en: [],
  },
  'usher in': {
    ko: ['열다', '시대를 열다', '새로운 흐름을 열다', '불러오다', '시작하다', '도입하다'],
    en: ['usher'],
  },
};

function uniq(list) {
  const seen = new Set();
  const out = [];
  for (const raw of list || []) {
    const s = String(raw || '').trim();
    if (!s) continue;
    const k = s.toLowerCase().replace(/\s+/g, '');
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  return out;
}

export function splitQuizMeanings(ko) {
  return String(ko || '')
    .replace(/^\d+\.\s*/, '')
    .split(/[,，、/;；·･・|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function hangulTokens(text) {
  const found = String(text || '').match(/[가-힣]{2,}/g) || [];
  return uniq(found);
}

function tokensOverlap(a, b) {
  if (!a.length || !b.length) return false;
  return a.some((t) => b.some((o) => o.includes(t) || t.includes(o)));
}

/** 너무 흔해서 묶음 병합에 쓰면 안 되는 토큰 */
const WEAK_KO_TOKENS = new Set([
  '하다',
  '되다',
  '있는',
  '없는',
  '같은',
  '다른',
  '위한',
  '대한',
  '관련',
  '상태',
  '완전한',
  '공식적으로',
]);

function strongTokens(text) {
  return hangulTokens(text).filter((t) => t.length >= 3 && !WEAK_KO_TOKENS.has(t));
}

/**
 * @param {{en:string, ko:string}[]} pairs
 * @param {{ siblingMerge?: boolean }} [options]
 * @returns {{en:string[], ko:string[]}[]}
 */
export function enrichQuizTrackWords(pairs, options = {}) {
  const siblingMerge = options.siblingMerge !== false;
  const base = (pairs || [])
    .map((p) => ({
      en: String(p.en || '').trim(),
      ko: String(p.ko || '').trim(),
    }))
    .filter((p) => p.en && p.ko);

  const withTokens = base.map((p) => ({
    ...p,
    koParts: splitQuizMeanings(p.ko),
    tokens: strongTokens(p.ko),
  }));

  return withTokens.map((p) => {
    const en = new Set([p.en]);
    const ko = new Set(p.koParts);

    /* 같은 묶음: 강한 한글 토큰이 겹칠 때만 정답 공유 */
    if (siblingMerge) {
      for (const other of withTokens) {
        if (other.en === p.en) continue;
        if (!tokensOverlap(p.tokens, other.tokens)) continue;
        en.add(other.en);
        other.koParts.forEach((k) => ko.add(k));
      }
    }

    const alts = QUIZ_ANSWER_ALTS[p.en.toLowerCase()];
    if (alts) {
      (alts.en || []).forEach((e) => en.add(e));
      (alts.ko || []).forEach((k) => ko.add(k));
    }

    /* 공백 유무 변형 */
    for (const k of [...ko]) {
      const packed = k.replace(/\s+/g, '');
      if (packed && packed !== k) ko.add(packed);
    }

    return {
      en: uniq([...en]),
      ko: uniq([...ko]),
    };
  });
}

/** 기존 track 문항 배열을 보강 (원본 유지 + alts/공백/선택적 묶음 병합) */
export function enrichExistingTrackWords(original, options = {}) {
  const items = (original || []).map((w) => ({
    enAll: Array.isArray(w.en) ? w.en.map(String) : [String(w.en || '')],
    koAll: Array.isArray(w.ko) ? w.ko.map(String) : [String(w.ko || '')],
  }));
  const avgKo = items.length
    ? items.reduce((n, w) => n + w.koAll.length, 0) / items.length
    : 0;
  /* 이미 복수 정답이 많은 퀴즈는 묶음 병합 생략 (과도한 교차 인정 방지) */
  const siblingMerge = options.siblingMerge ?? avgKo < 2.5;

  const pairs = items.map((w) => ({
    en: String(w.enAll[0] || '').trim(),
    ko: w.koAll.join(', '),
  }));
  const enriched = enrichQuizTrackWords(pairs, { siblingMerge });

  return items.map((w, i) => {
    const e = enriched[i] || { en: w.enAll, ko: w.koAll };
    let en = uniq([...w.enAll, ...(e.en || [])]);
    let ko = uniq([...w.koAll, ...(e.ko || [])]);
    for (const form of [...en]) {
      const alts = QUIZ_ANSWER_ALTS[String(form || '').toLowerCase()];
      if (!alts) continue;
      en = uniq([...en, ...(alts.en || [])]);
      ko = uniq([...ko, ...(alts.ko || [])]);
    }
    return { en, ko };
  });
}
