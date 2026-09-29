// HTML 형식 생성 함수 (precaution 양식과 동일)
export function generateHtmlMessage(data) {
  const keyPhrasesHtml = data.keyPhrases.map(phrase => 
    `<p style="margin:0 0 0.35rem;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${phrase.phrase}</span>: ${phrase.meaning}</p>`
  ).join('\n');
  
  const examplesHtml = data.examples.map((ex, idx) => {
    // 주요 단어를 하이라이트
    const highlightedEn = ex.en.replace(
      new RegExp(`\\b${data.word}[a-z]*\\b`, 'gi'),
      '<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">$&</span>'
    );
    
    return `<p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 ${idx + 1}</p>
<p style="margin:0 0 0.2rem;padding:0;">${highlightedEn}</p>
<p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">${ex.ko}</p>`;
  }).join('\n');
  
  const synonymsHighlight = data.synonyms.slice(0, 3).map(syn => 
    `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${syn}</span>`
  ).join(', ');
  
  // 주요 표현 예시 (처음 2개)
  const mainPhrases = data.keyPhrases.slice(0, 2).map(p => 
    `<span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">${p.phrase}</span>`
  ).join(', ');
  
  return `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;">
<p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">${data.word}</p>
<p style="margin:0 0 0.35rem;padding:0;">발음: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${data.pronunciation}</span></p>
<p style="margin:0 0 0.85rem;padding:0;">${data.partOfSpeech}: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${data.koreanMeaning}</span></p>
${keyPhrasesHtml}
<p style="margin:0 0 0.55rem;padding:0;">📌 의미: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${data.englishDefinition}</span></p>
<p style="margin:0 0 1rem;padding:0;">→ <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${data.word}</span>은 ${data.koreanMeaning}을 의미함. ${mainPhrases} 형태로 자주 사용됨.</p>
${examplesHtml}
<p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p>
<p style="margin:0;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">${data.word}</span> → ${data.koreanMeaning}을 의미하며, ${synonymsHighlight} 등과 유사한 의미로 사용됩니다.</p>
<p style="margin:0.85rem 0 0;padding:0;"><strong>유의어:</strong> ${data.synonyms.join(', ')}</p>
</div>`;
}
