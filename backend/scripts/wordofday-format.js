/**
 * Word of the Day 본문 HTML — send-wordofday-entry.js 와 동일한 레이아웃
 */

export function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const hl = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${escapeHtml(text)}</span>`;

export const hlSoft = (text) =>
  `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${escapeHtml(text)}</span>`;

function highlightPhrases(text, { word, collocations = [] }) {
  const tokens = [
    [word, 'hard'],
    ...collocations.map((c) => [c, 'soft']),
  ]
    .filter(([p]) => String(p || '').trim())
    .sort((a, b) => b[0].length - a[0].length);

  const src = String(text || '');
  if (!tokens.length) return escapeHtml(src);

  const escaped = tokens.map(([p]) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${escaped.join('|')})`, 'gi');
  let last = 0;
  let out = '';
  let m;
  while ((m = re.exec(src))) {
    out += escapeHtml(src.slice(last, m.index));
    const matched = m[1];
    const kind = tokens.find(([p]) => p.toLowerCase() === matched.toLowerCase())?.[1];
    out += kind === 'soft' ? hlSoft(matched) : hl(matched);
    last = m.index + matched.length;
  }
  out += escapeHtml(src.slice(last));
  return out;
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
  return `/resources/${encodeURIComponent(filename)}`;
}

export function buildWordofdayMessage(d) {
  const word = d.word;
  const collocations = Array.isArray(d.collocations) ? d.collocations.slice(0, 2) : [];
  const examples = Array.isArray(d.examples) ? d.examples.slice(0, 1) : [];
  const synonyms = Array.isArray(d.synonyms)
    ? d.synonyms.map((s) => String(s || '').trim()).filter(Boolean).slice(0, 3)
    : [];
  const extra = d.meaningExtra ? `, ${escapeHtml(d.meaningExtra)}` : '';
  const phrases = { word, collocations: collocations.map((c) => c.en).filter(Boolean) };

  const collocationHtml = collocations
    .map((c, i) => {
      const margin = i === collocations.length - 1 ? '0 0 0.85rem' : '0 0 0.35rem';
      return `<p style="margin:${margin};padding:0;">${hlSoft(c.en)}: ${escapeHtml(c.ko)}</p>`;
    })
    .join('');

  const exampleHtml = examples
    .map((ex) => {
      return `<p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문</p><p style="margin:0 0 0.2rem;padding:0;">${escapeHtml(ex.en)}</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">${escapeHtml(ex.ko)}</p>`;
    })
    .join('');

  const synonymHtml = synonyms.length
    ? `<p style="margin:0;padding:0;"><strong>유의어:</strong> ${escapeHtml(synonyms.join(', '))}</p>`
    : '';

  const nuanceLine = d.nuance
    ? `<p style="margin:0 0 0.85rem;padding:0;">→ ${highlightPhrases(d.nuance, phrases)}</p>`
    : '';

  return `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0;padding:0;text-align:left;"><img src="${d.imageSrc}" alt="${escapeHtml(word)}" loading="lazy" class="wotd-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.85rem 0;"></p><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">${escapeHtml(word)}</p><p style="margin:0 0 0.35rem;padding:0;">발음: ${hl(d.ipa)} (${escapeHtml(d.ipaKo)})</p><p style="margin:0 0 0.85rem;padding:0;">${escapeHtml(d.pos)}: ${hl(d.meaning)}${extra}</p>${collocationHtml}${nuanceLine}${exampleHtml}${synonymHtml}</div>`;
}

export function buildTitle(word, meaning) {
  return `${word} | ${meaning}`;
}

export function buildMetaDescription(d) {
  if (d.metaDescription) return d.metaDescription;
  const collos = (d.collocations || []).map((c) => c.en).filter(Boolean).join(', ');
  return `${d.word} 뜻과 예문. ${d.meaning}${d.meaningExtra ? `, ${d.meaningExtra}` : ''}${collos ? `, ${collos}` : ''}.`;
}
