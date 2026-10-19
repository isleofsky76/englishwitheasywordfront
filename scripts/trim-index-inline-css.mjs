import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const indexPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let h = fs.readFileSync(indexPath, 'utf8');
const start = h.indexOf('    <style>');
const end = h.indexOf('</style>', start);
if (start < 0 || end < 0) throw new Error('style block not found');
const replacement = `    <style>
        /* 홈 리디자인 — 레거시 preview 인라인 제거 */
        body.rd-home { background: var(--page-bg, #F6F3EC); }
        .visually-hidden {
          position: absolute !important; width: 1px !important; height: 1px !important;
          padding: 0 !important; margin: -1px !important; overflow: hidden !important;
          clip: rect(0, 0, 0, 0) !important; border: 0 !important;
        }
        .main-content { padding-top: 0 !important; }
        #weather-banner, #world-clock-bar { display: none !important; }
    </style>`;
h = h.slice(0, start) + replacement + h.slice(end + '</style>'.length);
fs.writeFileSync(indexPath, h);
console.log('Trimmed inline CSS');
