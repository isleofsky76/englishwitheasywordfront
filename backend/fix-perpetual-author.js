import https from 'https';

// 기존 게시물 ID
const ENTRY_ID = '6abb827eaa69259dc1586038';
const API_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday-updatepost';

// admin 계정으로 업데이트
const updateData = {
  id: ENTRY_ID,
  password: 'english2024',
  title: 'perpetual | 영구적인, 끊임없는, 지속적인',
  message: `perpetual

발음: /pərˈpetʃ.u.əl/

adjective: 영구적인, 끊임없는, 지속적인

perpetual motion: 영구 운동, 끊임없는 움직임
perpetual calendar: 만년 달력
in perpetual fear: 끊임없는 두려움에

📌 의미:
continuing forever or for a long time without stopping

예문 1
She lives in perpetual fear of being discovered.
그녀는 발각될까 봐 끊임없는 두려움 속에 살고 있다.

예문 2
The perpetual noise from the construction site was annoying.
공사장에서 나는 끊임없는 소음이 짜증스러웠다.

예문 3
He seemed to be in a state of perpetual confusion.
그는 끊임없이 혼란스러운 상태에 있는 것 같았다.

예문 4
The garden requires perpetual care and attention.
정원은 지속적인 관리와 관심이 필요하다.

💡 핵심 뉘앙스:
perpetual → 영구적인, 끊임없는, 지속적인을 의미하며, continuous, constant, endless 등과 유사한 의미로 사용됩니다.

유의어: continuous, constant, endless, eternal, everlasting, permanent`,
  nickname: 'admin',  // ← 변경!
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

console.log('📝 작성자를 admin으로 변경 중...\n');

const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ 업데이트 성공!\n');
      try {
        const parsed = JSON.parse(responseData);
        console.log('작성자:', parsed.entry.nickname);
        console.log('\n🌐 확인: https://englisheasystudy.com/word-of-the-day.html?slug=perpetual&api=prod');
      } catch (e) {
        console.log('응답:', responseData);
      }
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
