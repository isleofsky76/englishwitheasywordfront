import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 기존 게시물 ID (이전에 전송한 것)
const ENTRY_ID = '6abb827eaa69259dc1586038';
const API_URL = `https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday-updatepost`;

// 새로운 데이터 읽기
const apiDataPath = path.join(__dirname, 'scripts/perpetual-api-data.json');
const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf8'));

// 업데이트 요청 데이터
const updateData = {
  id: ENTRY_ID,
  password: apiData.password,
  title: apiData.title,
  message: apiData.message,
  nickname: apiData.nickname,
  isSecret: apiData.isSecret,
  slug: apiData.slug,
  metaDescription: apiData.metaDescription
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

console.log('📝 Perpetual 게시물 업데이트 중...\n');

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
        console.log('응답:', JSON.stringify(parsed, null, 2));
      } catch (e) {
        console.log('응답:', responseData);
      }
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
