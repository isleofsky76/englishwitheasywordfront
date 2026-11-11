/**
 * Word of the Day 본문 HTML — redesign-word.js 가 읽는 wotd-* 구조
 */

export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function toSlug(word) {
  return String(word || '')
    .trim()
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function imageSrcFromFilename(filename) {
  const name = String(filename || '').replace(/^\/?resources\//, '');
  return `/resources/${encodeURIComponent(name)}`;
}

function markWord(en, word) {
  const src = String(en || '');
  const w = String(word || '').trim();
  if (!w) return escapeHtml(src);
  const re = new RegExp(`\\b(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
  let out = '';
  let last = 0;
  let m;
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index));
    out += `<mark>${escapeHtml(m[1])}</mark>`;
    last = m.index + m[1].length;
  }
  out += escapeHtml(src.slice(last));
  return out;
}

function asList(arr, max) {
  return (Array.isArray(arr) ? arr : [])
    .map((x) => String(x || '').trim())
    .filter(Boolean)
    .slice(0, max);
}

/**
 * @param {object} d
 * @param {string} d.word
 * @param {string} d.imageSrc
 * @param {string} [d.ipa]
 * @param {string} [d.ipaKo]
 * @param {string} [d.pos]
 * @param {string} d.meaning
 * @param {string} [d.meaningExtra]
 * @param {string} [d.core] 핵심 의미 한 줄
 * @param {string} [d.nuance]
 * @param {Array<{en:string,ko:string,active?:boolean}>} [d.compares]
 * @param {Array<{en:string,ko:string}>} [d.collocations]
 * @param {Array<{en:string,ko:string}>} [d.examples]
 * @param {string|string[]} [d.endef] 영영 정의
 * @param {string} [d.takeaway]
 * @param {string[]} [d.synonyms]
 * @param {string[]} [d.antonyms]
 * @param {string} [d.where] 자주 나오는 곳
 */
export function buildWordofdayMessage(d) {
  const word = String(d.word || '').trim();
  const imageSrc = String(d.imageSrc || '').trim();
  const ipa = String(d.ipa || '').trim();
  const ipaKo = String(d.ipaKo || '').trim();
  const pos = String(d.pos || '단어').trim();
  const meaning = String(d.meaning || '').trim();
  const meaningExtra = String(d.meaningExtra || '').trim();
  const collocations = Array.isArray(d.collocations) ? d.collocations.slice(0, 3) : [];
  const examples = Array.isArray(d.examples) ? d.examples.filter((ex) => ex && ex.en).slice(0, 3) : [];
  const synonyms = asList(d.synonyms, 5);
  const antonyms = asList(d.antonyms, 5);
  const compares = Array.isArray(d.compares) ? d.compares.slice(0, 2) : [];
  const endefParts = Array.isArray(d.endef)
    ? d.endef.map((p) => String(p || '').trim()).filter(Boolean).slice(0, 3)
    : String(d.endef || '').trim()
      ? [String(d.endef).trim()]
      : [];
  const core =
    String(d.core || '').trim() ||
    `${meaning}을/를 나타내는 말` + (collocations[0]?.en ? `. 자주 ${collocations[0].en}` : '');
  const nuance = String(d.nuance || '').trim();
  const takeaway =
    String(d.takeaway || '').trim() ||
    `${word}은/는 ‘${meaning}’의 뜻으로 쓴다.`;
  const where = String(d.where || '뉴스·일상·업무').trim();

  const posHtml =
    `<div class="wotd-pos" data-pos="${escapeHtml(pos)}" data-primary="1">` +
    `<span class="wotd-meaning">${escapeHtml(meaning)}</span>` +
    (meaningExtra ? `<span class="wotd-meaning-sub">${escapeHtml(meaningExtra)}</span>` : '') +
    `</div>`;

  const compareHtml = compares
    .map((c, i) => {
      const active = c.active || i === compares.length - 1 ? ' data-active="1"' : '';
      return (
        `<div class="wotd-compare"${active}>` +
        `<span class="wotd-cmp-en">${escapeHtml(c.en)}</span>` +
        `<span class="wotd-cmp-ko">${escapeHtml(c.ko)}</span>` +
        `</div>`
      );
    })
    .join('');

  const coloHtml = collocations
    .map(
      (c) =>
        `<div class="wotd-col"><span class="wotd-col-en">${escapeHtml(c.en)}</span>` +
        `<span class="wotd-col-ko">${escapeHtml(c.ko)}</span></div>`
    )
    .join('');

  const exHtml = examples
    .map(
      (ex) =>
        `<section class="wotd-ex"><p class="wotd-ex-en">${markWord(ex.en, word)}</p>` +
        (ex.ko ? `<p class="wotd-ex-ko">${escapeHtml(ex.ko)}</p>` : '') +
        `</section>`
    )
    .join('');

  const endefHtml = endefParts.length
    ? `<div class="wotd-endef">${endefParts.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</div>`
    : '';

  const glance =
    `<div class="wotd-glance">` +
    `<div><dt>품사</dt><dd>${escapeHtml(pos)}</dd></div>` +
    (synonyms.length
      ? `<div><dt>비슷한 말</dt><dd>${escapeHtml(synonyms.join(', '))}</dd></div>`
      : '') +
    (antonyms.length
      ? `<div><dt>반대 말</dt><dd>${escapeHtml(antonyms.join(', '))}</dd></div>`
      : '') +
    `<div><dt>자주 나오는 곳</dt><dd>${escapeHtml(where)}</dd></div>` +
    `</div>`;

  return (
    `<div class="wotd-word">` +
    (imageSrc
      ? `<img class="wotd-hero-image" src="${escapeHtml(imageSrc)}" alt="${escapeHtml(word)}" loading="lazy">`
      : '') +
    (ipa ? `<span class="wotd-ipa">${escapeHtml(ipa)}</span>` : '') +
    (ipaKo ? `<span class="wotd-ipa-ko">${escapeHtml(ipaKo)}</span>` : '') +
    posHtml +
    `<p class="wotd-core">${escapeHtml(core)}</p>` +
    (nuance ? `<p class="wotd-nuance">${escapeHtml(nuance)}</p>` : '') +
    compareHtml +
    coloHtml +
    exHtml +
    endefHtml +
    `<p class="wotd-takeaway">${escapeHtml(takeaway)}</p>` +
    glance +
    `</div>`
  );
}

export function buildTitle(word, meaning) {
  return `${word} | ${meaning}`;
}

export function buildMetaDescription(d) {
  if (d.metaDescription) return d.metaDescription;
  const collos = (d.collocations || []).map((c) => c.en).filter(Boolean).join(', ');
  const ex = (d.examples || []).map((e) => e.en).filter(Boolean)[0];
  return `${d.word} 뜻과 예문. ${d.meaning}${d.meaningExtra ? `, ${d.meaningExtra}` : ''}${
    collos ? `, ${collos}` : ''
  }${ex ? `. 예: ${ex}` : ''}`.slice(0, 160);
}
