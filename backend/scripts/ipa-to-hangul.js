/**
 * IPA / 영어 단어 → 한국어 발음 근사
 * 목표 양식: brook(brʊk / 브룩)
 */

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function syl(cho, jung, jong = '') {
  const ci = CHO.indexOf(cho);
  const ji = JUNG.indexOf(jung);
  const oi = JONG.indexOf(jong || '');
  if (ci < 0 || ji < 0 || oi < 0) return '';
  return String.fromCharCode(0xac00 + ci * 21 * 28 + ji * 28 + oi);
}

const HANGUL_OVERRIDES = {
  brook: '브룩',
  delay: '딜레이',
  deferral: '디퍼럴',
  postponement: '포스트폰먼트',
  interruption: '인터럽션',
  adjournment: '어전먼트',
  suspension: '서스펜션',
  pause: '포즈',
  hesitation: '헤지테이션',
  setback: '셋백',
  holdup: '홀드업',
  lag: '래그',
  respite: '레스피트',
  ransack: '랜색',
  tolerate: '탈러레이트',
  abide: '어바이드',
  stomach: '스터먹',
  countenance: '카운터넌스',
  see: '씨',
  look: '룩',
  watch: '워치',
  glimpse: '글림프스',
  notice: '노티스',
  spot: '스팟',
  glance: '글랜스',
  peek: '픽',
  peep: '핍',
  peer: '피어',
  gaze: '게이지',
  stare: '스테어',
  gawk: '곡',
  glare: '글레어',
  glower: '글라우어',
};

/** 사전 API에 IPA가 비는 단어 보완 */
const IPA_OVERRIDES = {
  look: 'lʊk',
  watch: 'wɒtʃ',
  postponement: 'pəˈspəʊnmənt',
  adjournment: 'əˈdʒɜːnmənt',
  holdup: 'ˈhəʊldʌp',
  peek: 'piːk',
  peep: 'piːp',
  peer: 'pɪə',
  gaze: 'ɡeɪz',
  stare: 'steə',
  gawk: 'ɡɔːk',
  glare: 'ɡleə',
  glower: 'ˈɡlaʊə',
  glance: 'ɡlɑːns',
};

export function ipaForExpression(expression, fallbackIpa = '') {
  const key = String(expression || '').trim().toLowerCase();
  if (IPA_OVERRIDES[key]) return IPA_OVERRIDES[key];
  return String(fallbackIpa || '')
    .replace(/^\/+|\/+$/g, '')
    .trim();
}

const CLUSTER = {
  br: '브', bl: '블', pr: '프', pl: '플', tr: '트', dr: '드', kr: '크', kl: '클',
  gr: '그', gl: '글', fr: '프', fl: '플', θr: '스', st: '스', sp: '스', sk: '스',
  sm: '스', sn: '스', sl: '슬', sw: '스', tw: '트', kw: '쿠',
};

const ONSET = {
  b: 'ㅂ', p: 'ㅍ', d: 'ㄷ', t: 'ㅌ', g: 'ㄱ', k: 'ㅋ', m: 'ㅁ', n: 'ㄴ',
  l: 'ㄹ', r: 'ㄹ', ɹ: 'ㄹ', f: 'ㅍ', v: 'ㅂ', s: 'ㅅ', z: 'ㅈ', h: 'ㅎ',
  ʃ: 'ㅅ', ʒ: 'ㅈ', tʃ: 'ㅊ', dʒ: 'ㅈ', θ: 'ㅅ', ð: 'ㄷ', w: 'ㅇ', j: 'ㅇ', ŋ: 'ㅇ',
};

const VOWEL = {
  æ: 'ㅐ', ʌ: 'ㅓ', ɑ: 'ㅏ', 'ɑː': 'ㅏ', ɔ: 'ㅗ', 'ɔː': 'ㅗ', ɒ: 'ㅗ',
  ʊ: 'ㅜ', u: 'ㅜ', 'uː': 'ㅜ', ɪ: 'ㅣ', i: 'ㅣ', 'iː': 'ㅣ',
  e: 'ㅔ', ɛ: 'ㅔ', ə: 'ㅓ', 'ɜː': 'ㅓ', ɝ: 'ㅓ', ɚ: 'ㅓ', o: 'ㅗ', a: 'ㅏ',
  eɪ: 'EI', aɪ: 'AI', aʊ: 'AU', ɔɪ: 'OI', oʊ: 'OU', əʊ: 'OU',
};

const CODA = {
  k: 'ㄱ', p: 'ㅂ', t: 'ㅅ', b: 'ㅂ', d: 'ㅅ', g: 'ㄱ', m: 'ㅁ', n: 'ㄴ',
  ŋ: 'ㅇ', l: 'ㄹ', s: 'ㅅ', f: 'ㅍ', v: 'ㅂ', z: 'ㅈ', ʃ: 'ㅅ',
};

const TOKEN_ORDER = [
  'tʃ','dʒ','θr','aɪ','aʊ','ɔɪ','eɪ','oʊ','əʊ',
  'ɑː','ɔː','uː','iː','ɜː','br','bl','pr','pl','tr','dr','kr','kl','gr','gl','fr','fl',
  'st','sp','sk','sm','sn','sl','sw','tw','kw',
  'θ','ð','ʃ','ʒ','ŋ','ɝ','ɚ','æ','ʌ','ɑ','ɔ','ɒ','ʊ','u','ɪ','i','e','ɛ','ə','o','a',
  'b','p','d','t','g','k','m','n','l','r','ɹ','f','v','s','z','h','w','j',
];

function tokenizeIpa(ipa) {
  let s = String(ipa || '')
    .replace(/[\/ˈˌ.̥̃̚()]/g, '')
    .replace(/\s+/g, '');
  const out = [];
  while (s) {
    let found = '';
    for (const tok of TOKEN_ORDER) {
      if (s.startsWith(tok)) {
        found = tok;
        break;
      }
    }
    if (found) {
      out.push(found);
      s = s.slice(found.length);
    } else s = s.slice(1);
  }
  return out;
}

function isVowel(tok) {
  return Object.prototype.hasOwnProperty.call(VOWEL, tok);
}

function diphthongHangul(code, onsetCho) {
  const map = {
    EI: ['ㅔ', '이'],
    AI: ['ㅏ', '이'],
    AU: ['ㅏ', '우'],
    OI: ['ㅗ', '이'],
    OU: ['ㅗ', '우'],
  };
  const pair = map[code];
  if (!pair) return syl(onsetCho || 'ㅇ', 'ㅓ');
  return syl(onsetCho || 'ㅇ', pair[0]) + pair[1];
}

export function ipaToHangulApprox(ipa) {
  const toks = tokenizeIpa(ipa);
  let i = 0;
  let out = '';
  while (i < toks.length) {
    const t = toks[i];

    if (CLUSTER[t]) {
      out += CLUSTER[t];
      i += 1;
      continue;
    }

    let cho = 'ㅇ';
    if (!isVowel(t)) {
      cho = ONSET[t] || 'ㅇ';
      i += 1;
      if (i >= toks.length) {
        out += syl(cho, 'ㅡ');
        break;
      }
    }

    if (!isVowel(toks[i])) {
      out += syl(cho, 'ㅡ');
      continue;
    }

    const v = VOWEL[toks[i]];
    i += 1;

    if (['EI', 'AI', 'AU', 'OI', 'OU'].includes(v)) {
      out += diphthongHangul(v, cho);
      continue;
    }

    let jong = '';
    if (i < toks.length && !isVowel(toks[i]) && !CLUSTER[toks[i]]) {
      const onlyCoda = i + 1 >= toks.length || isVowel(toks[i + 1]);
      // take coda when last phone, or when next is vowel (then this C is coda of current - actually if next vowel, C is onset)
      if (i + 1 >= toks.length) {
        jong = CODA[toks[i]] || '';
        i += 1;
      } else if (!isVowel(toks[i + 1]) && !CLUSTER[toks[i]]) {
        jong = CODA[toks[i]] || '';
        i += 1;
      }
      void onlyCoda;
    }

    out += syl(cho, v, jong);
  }
  return out;
}

export function hangulForExpression(expression, ipa = '') {
  const key = String(expression || '').trim().toLowerCase();
  if (HANGUL_OVERRIDES[key]) return HANGUL_OVERRIDES[key];
  if (/\s/.test(key)) {
    return key
      .split(/\s+/)
      .map((w) => hangulForExpression(w, ''))
      .filter(Boolean)
      .join('');
  }
  return ipaToHangulApprox(ipa) || '';
}
