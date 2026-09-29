import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://port-0-englishwitheasyword-backend-1272llwoib16o.sel5.cloudtype.app/wordofday';

function postToApi(data) {
  return new Promise((resolve, reject) => {
    const jsonData = JSON.stringify(data);
    
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
    
    const req = https.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(responseData);
            resolve(parsed);
          } catch (e) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    req.write(jsonData);
    req.end();
  });
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error('❌ 사용법: node post-word-to-api.js <slug>');
    console.error('예: node post-word-to-api.js eloquent');
    process.exit(1);
  }
  
  const slug = args[0];
  const apiDataPath = path.join(__dirname, `${slug}-api-data.json`);
  
  if (!fs.existsSync(apiDataPath)) {
    console.error(`❌ API 데이터 파일을 찾을 수 없습니다: ${apiDataPath}`);
    console.error('먼저 create-word-of-day.js를 실행하세요.');
    process.exit(1);
  }
  
  console.log(`📤 API에 데이터 전송 중: ${slug}`);
  
  try {
    const data = JSON.parse(fs.readFileSync(apiDataPath, 'utf8'));
    const response = await postToApi(data);
    
    console.log('✅ 성공적으로 전송되었습니다!');
    console.log('\n응답:');
    console.log(JSON.stringify(response, null, 2));
    
    if (response.entry && response.entry._id) {
      console.log(`\n🔗 게시물 ID: ${response.entry._id}`);
      console.log(`📍 URL: https://englisheasystudy.com/word-of-the-day.html?slug=${slug}&api=prod`);
    }
  } catch (error) {
    console.error('❌ 전송 실패:', error.message);
    process.exit(1);
  }
}

main();
