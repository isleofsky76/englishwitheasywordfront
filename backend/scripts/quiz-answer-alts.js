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

/**
 * @param {{en:string, ko:string}[]} pairs
 * @returns {{en:string[], ko:string[]}[]}
 */
export function enrichQuizTrackWords(pairs) {
  const base = (pairs || [])
    .map((p) => ({
      en: String(p.en || '').trim(),
      ko: String(p.ko || '').trim(),
    }))
    .filter((p) => p.en && p.ko);

  const withTokens = base.map((p) => ({
    ...p,
    koParts: splitQuizMeanings(p.ko),
    tokens: hangulTokens(p.ko),
  }));

  return withTokens.map((p) => {
    const en = new Set([p.en]);
    const ko = new Set(p.koParts);

    /* 같은 연관단어 묶음에서 한글 의미 토큰이 겹치면 정답 공유 */
    for (const other of withTokens) {
      if (other.en === p.en) continue;
      if (!tokensOverlap(p.tokens, other.tokens)) continue;
      en.add(other.en);
      other.koParts.forEach((k) => ko.add(k));
    }

    const alts = QUIZ_ANSWER_ALTS[p.en.toLowerCase()];
    if (alts) {
      (alts.en || []).forEach((e) => en.add(e));
      (alts.ko || []).forEach((k) => ko.add(k));
    }

    /* 공백 유무 변형도 정답으로 등록 */
    for (const k of [...ko]) {
      const packed = k.replace(/\s+/g, '');
      const spaced = k.replace(/([가-힣])([가-힣])/g, '$1 $2'); // light — skip heavy
      if (packed && packed !== k) ko.add(packed);
      void spaced;
    }

    return {
      en: uniq([...en]),
      ko: uniq([...ko]),
    };
  });
}
