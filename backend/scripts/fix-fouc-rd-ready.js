/**
 * One-shot: fix SEO FOUC guard + inject viewpost-rd-ready / bump pins
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');

const oldRe =
  /<style id="rd-fouc-guard">[\s\S]*?<\/style>\s*<noscript><style>body\[data-nv-board\] #post-container\{visibility:visible!important\}<\/style><\/noscript>/;

const neu = `    <style id="rd-fouc-guard">
      /* SEO 구형 본문이 redesign 전에 깜빡이지 않도록 (!important 금지: 키프레임 fallback이 무시됨) */
      body[data-nv-board]:not(.rd-ready) #post-container {
        visibility: hidden;
      }
      /* QUICK REVIEW 배너 강제 숨김 */
      .rd-review { display: none !important; }
    </style>
    <script>
    (function () {
      function rdReady() {
        document.documentElement.classList.add('rd-ready');
        if (document.body) document.body.classList.add('rd-ready');
      }
      /* header-only 보드가 rd-ready를 안 켜도 본문이 영구 숨김되지 않게 */
      setTimeout(rdReady, 1200);
    })();
    </script>
    <noscript><style>body[data-nv-board] #post-container{visibility:visible!important}</style></noscript>`;

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name === '.git' || ent.name === 'record-lf3') continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name === 'index.html') out.push(p);
  }
  return out;
}

let n = 0;
let n2 = 0;
for (const p of walk(root)) {
  let t = fs.readFileSync(p, 'utf8');
  if (!t.includes('rd-fouc-guard') || !t.includes('visibility: hidden !important')) continue;
  if (!oldRe.test(t)) continue;
  t = t.replace(oldRe, neu);
  fs.writeFileSync(p, t);
  n += 1;
}

const boards = [
  'word-of-the-day',
  'popular-voca',
  'photo-english',
  'calm-mind',
  'english-quotes',
  'shorts-bg-image',
  'pros-cons',
  'situational-english'
];
for (const b of boards) {
  for (const p of walk(path.join(root, b))) {
    let t = fs.readFileSync(p, 'utf8');
    const o = t;
    if (!t.includes('viewpost-rd-ready')) {
      t = t.replace(
        '<script src="../../viewpost-like.js?v=20260906gray"></script>',
        '<script src="../../viewpost-like.js?v=20260906gray"></script>\n    <script src="../../viewpost-rd-ready.js?v=20261020rd24"></script>'
      );
    }
    t = t.replaceAll(
      'page30_viewpost_wordofday.js?v=20260908tts',
      'page30_viewpost_wordofday.js?v=20261020rd24'
    );
    t = t.replaceAll(
      'page30_viewpost_v_easy.js?v=20260903d',
      'page30_viewpost_v_easy.js?v=20261020rd24'
    );
    t = t.replaceAll(
      'page30_viewpost_photo_english.js?v=20260903d',
      'page30_viewpost_photo_english.js?v=20261020rd24'
    );
    if (t !== o) {
      fs.writeFileSync(p, t);
      n2 += 1;
    }
  }
}

console.log(`foucUpdated=${n} pinUpdated=${n2}`);
