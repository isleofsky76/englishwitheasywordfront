/**
 * SEO 정적 페이지 canonical / og:url / JSON-LD @id 끝 슬래시 통일
 *
 *   cd backend
 *   node scripts/fix-canonical-trailing-slash.js
 */
import fs from 'fs';
import path from 'path';
import { FRONTEND_ROOT, BOARD_SEO } from './voca-seo.js';

function walkHtmlFiles(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtmlFiles(full, out);
    else if (name === 'index.html') out.push(full);
  }
  return out;
}

function fixHtml(html) {
  let next = html;
  // canonical / og:url — .../board/slug" → .../board/slug/"
  next = next.replace(
    /(href|content)="(https:\/\/englisheasystudy\.com\/[a-z0-9-]+\/[a-z0-9-_%]+)(?<!\/)"/gi,
    '$1="$2/"'
  );
  // JSON-LD @id without trailing slash
  next = next.replace(
    /("@id"\s*:\s*")(https:\/\/englisheasystudy\.com\/[a-z0-9-]+\/[a-z0-9-_%]+)(?<!\/)(")/gi,
    '$1$2/$3'
  );
  return next;
}

function main() {
  const boards = Object.keys(BOARD_SEO);
  let files = 0;
  let changed = 0;
  for (const board of boards) {
    const dir = path.join(FRONTEND_ROOT, board);
    for (const file of walkHtmlFiles(dir)) {
      files++;
      const before = fs.readFileSync(file, 'utf8');
      const after = fixHtml(before);
      if (after !== before) {
        fs.writeFileSync(file, after, 'utf8');
        changed++;
      }
    }
  }
  console.log(`✅ scanned ${files} SEO pages, fixed ${changed}`);
}

main();
