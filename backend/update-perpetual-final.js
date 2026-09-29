import https from 'https';

const ENTRY_ID = '6abb827eaa69259dc1586038';
const API_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday-updatepost';

// precaution과 동일한 HTML 형식으로 작성
const message = `<div style="max-width:36rem;width:100%;margin:0 auto;box-sizing:border-box;color:#374151;font-size:0.95rem;line-height:2.05;"><p style="margin:0 0 0.85rem;padding:0;font-size:1.35rem;font-weight:700;color:#1a365d;line-height:1.6;">perpetual</p><p style="margin:0 0 0.35rem;padding:0;">발음: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">/pərˈpetʃ.u.əl/</span></p><p style="margin:0 0 0.85rem;padding:0;">adjective: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">영구적인, 끊임없는, 지속적인</span></p><p style="margin:0 0 0.35rem;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual motion</span>: 영구 운동, 끊임없는 움직임</p><p style="margin:0 0 0.35rem;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual calendar</span>: 만년 달력</p><p style="margin:0 0 1rem;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">in perpetual fear</span>: 끊임없는 두려움에</p><p style="margin:0 0 0.55rem;padding:0;">📌 의미: <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">continuing forever or for a long time without stopping</span></p><p style="margin:0 0 1rem;padding:0;">→ <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">perpetual</span>은 끊임없이 계속되는 상태를 의미함. <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual motion</span> (영구 운동), <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">in perpetual fear</span> (끊임없는 두려움에) 형태로 자주 사용됨.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 1</p><p style="margin:0 0 0.2rem;padding:0;">She lives in <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual fear</span> of being discovered.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그녀는 발각될까 봐 끊임없는 두려움 속에 살고 있다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 2</p><p style="margin:0 0 0.2rem;padding:0;">The <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual noise</span> from the construction site was annoying.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">공사장에서 나는 끊임없는 소음이 짜증스러웠다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 3</p><p style="margin:0 0 0.2rem;padding:0;">He seemed to be in a state of <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual confusion</span>.</p><p style="margin:0 0 0.85rem;padding:0;color:#4b5563;">그는 끊임없이 혼란스러운 상태에 있는 것 같았다.</p><p style="margin:0 0 0.45rem;padding:0;font-weight:700;color:#1a365d;">예문 4</p><p style="margin:0 0 0.2rem;padding:0;">The garden requires <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">perpetual care</span> and attention.</p><p style="margin:0 0 1rem;padding:0;color:#4b5563;">정원은 지속적인 관리와 관심이 필요하다.</p><p style="margin:0 0 0.55rem;padding:0;">💡 핵심 뉘앙스:</p><p style="margin:0;padding:0;"><span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:#ffe566;">perpetual</span> → 영구적인, 끊임없는, 지속적인을 의미하며, <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">continuous</span>, <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">constant</span>, <span style="font-weight:700;color:#1a1a1a;padding:0.06em 0.2em;border-radius:3px;background:rgba(255,229,102,0.72);border-bottom:2.5px solid #f0b429;">endless</span> 등과 유사한 의미로 사용됩니다.</p><p style="margin:0.85rem 0 0;padding:0;"><strong>유의어:</strong> continuous, constant, endless, eternal, everlasting, permanent</p></div>`;

const updateData = {
  id: ENTRY_ID,
  password: 'english2024',
  title: 'perpetual | 영구적인, 끊임없는, 지속적인',
  message: message,
  nickname: 'admin',
  isSecret: false,
  slug: 'perpetual',
  metaDescription: 'perpetual 뜻과 예문. 영구적인, 끊임없는, 지속적인, perpetual motion, perpetual calendar, in perpetual fear.'
};

const jsonData = JSON.stringify(updateData);
const url = new URL(API_URL);
const options = {
  hostname: url.hostname,
  port: url.port || 443,
  path: url.pathname,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonData)
  }
};

console.log('🎨 Perpetual을 precaution 형식으로 업데이트 중...\n');

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ 완전한 HTML 형식으로 업데이트 완료!\n');
      console.log('📌 노란색 하이라이트 추가');
      console.log('📌 밑줄 스타일 추가');
      console.log('📌 Precaution과 동일한 스타일 적용');
      console.log('\n🌐 확인: https://englisheasystudy.com/word-of-the-day.html?slug=perpetual&api=prod');
    } else {
      console.error(`❌ 업데이트 실패: HTTP ${res.statusCode}`);
      console.error('응답:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 오류 발생:', error.message);
});

req.write(jsonData);
req.end();
