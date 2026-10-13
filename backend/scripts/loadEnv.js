/**
 * 공통: .env 로드 (backend 루트의 .env)
 * 시드 스크립트에서 비밀번호 등 환경 변수 사용
 */
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

export function getSeedPassword() {
  const pwd = process.env.SEED_PASSWORD;
  if (!pwd) {
    console.error('❌ .env에 SEED_PASSWORD를 설정해주세요. (예: SEED_PASSWORD=your_password)');
    process.exit(1);
  }
  return pwd;
}

export function getSeedWordPassword() {
  const pwd = process.env.SEED_WORD_PASSWORD;
  if (!pwd) {
    console.error('❌ .env에 SEED_WORD_PASSWORD를 설정해주세요. (예: SEED_WORD_PASSWORD=your_password)');
    process.exit(1);
  }
  return pwd;
}

export function getSeedPasswordDeliberate() {
  const pwd = process.env.SEED_PASSWORD_DELIBERATE;
  if (!pwd) {
    console.error('❌ .env에 SEED_PASSWORD_DELIBERATE를 설정해주세요. (예: SEED_PASSWORD_DELIBERATE=your_password)');
    process.exit(1);
  }
  return pwd;
}

export const API_BASE = process.env.API_BASE || process.env.SEED_API_BASE || 'http://localhost:3000';

/** WRITE_API_TOKEN 이 서버에 설정된 경우 시드/발행 fetch 헤더에 포함 */
export function writeAuthHeaders(extra = {}) {
  const token = process.env.WRITE_API_TOKEN || '';
  const headers = { ...extra };
  if (token) headers['X-Write-Token'] = token;
  return headers;
}
