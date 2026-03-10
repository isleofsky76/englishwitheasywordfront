/**
 * Word of the Day 컬렉션에 글 1개 추가 (deliberate 블로그)
 * 사용법: 백엔드 서버 실행 후 → node scripts/send-wordofday.js
 */
import { API_BASE } from './loadEnv.js';

const password = 'seed_password_deliberate'; // 원하는 비밀번호로 변경

const title = 'deliberate';

// 프로젝트 frontend/images/deliberate.jpg 사용 (GitHub에 올려두면 Live 배포 시 같은 경로로 노출)
const IMG_URL = 'images/deliberate.jpg';

const message = `<p style="margin-bottom:1rem;"><img src="${IMG_URL}" alt="deliberate" style="max-width:100%; height:auto; border-radius:12px; display:block; box-shadow:0 2px 12px rgba(0,0,0,0.1);" loading="lazy"></p>
<p><strong>deliberate</strong></p>
<p>형용사: 고의의, 의도적인, 계획적인, 신중한<br>동사: 숙고하다, 신중히 생각하다</p>
<p><strong>예문 1</strong><br>The speech was a deliberate attempt to embarrass the government.<br>그 연설은 정부를 곤란하게 만들려는 의도적인 시도였다.</p>
<p><strong>예문 2</strong><br>The jury deliberated for five days before finding him guilty.<br>배심원단은 그를 유죄로 판단하기 전에 닷새 동안 숙의했다.</p>`;

async function send() {
  console.log('Word of the Day 추가 중...', API_BASE);
  try {
    const res = await fetch(`${API_BASE}/wordofday`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        message,
        nickname: 'News English Lab',
        password,
        isSecret: false,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      console.log('  추가됨:', title);
    } else {
      console.log('  실패:', data.error || res.status);
    }
  } catch (e) {
    console.error('  오류:', e.message);
  }
  console.log('완료.');
}

send();
