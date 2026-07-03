/**
 * Popular Voca: 기존 글(본 스크립트 비밀번호로 쓴 것만) 삭제 후, 단어 설명 글 추가
 * 저장: /easy-voca API, popularvoca 컬렉션 (myDatabase)
 * 사용법: 백엔드 서버 실행 후 → node scripts/seed-popular-voca-words.js
 * 비밀번호: posts·password 상수와 동일 (이 스크립트 전용)
 *
 * 웹 발음: page30_viewpost_v_easy.js 가 영문 문장 끝(. ! ?) 바로 뒤에 스피커를 붙입니다.
 * message HTML — C·ST 디자인 토큰 (글자색·크기·배경). 키워드만 pvKw·pvKwB 하이라이트.
 * 이미지: frontend/resources/ 에 두면 /resources/파일명.jpg 로 표시 (send-wordofday.js 동일)
 */
import { API_BASE } from './loadEnv.js';
import { writeSeoPage, updateSitemap, toIsoDateOnly, SITE_ORIGIN } from './voca-seo.js';

// 로컬에서 localhost 연결 실패 시 127.0.0.1 사용 (Windows 등)
const base = (API_BASE || '').replace('localhost', '127.0.0.1');


// 디자인 토큰 (popular-voca 페이지 #357abd 톤)
const C = {
  text: '#334155',
  textMuted: '#64748b',
  textEn: '#1e293b',
  bg: '#fafbfc',
  border: '#e2e8f0',
  title: '#1e40af',
  secBg: '#eef4fb',
  secText: '#1e3a5f',
  tipBg: '#eff6ff',
  tipBorder: '#357abd',
  summaryBg: '#f0fdf4',
  summaryBorder: '#22c55e',
};

// 키워드 하이라이트 — 배경 + 글자색
const PV = {
  ko: { bg: '#fce4ec', fg: '#880e4f' },
  en: { bg: '#fff9c4', fg: '#5d4037' },
  vocab: { bg: '#e0f2f1', fg: '#00695c' },
};
const pvKwB = (k, t) =>
  `<strong style="background:${PV[k].bg};color:${PV[k].fg};padding:0.15em 0.35em;border-radius:4px;font-weight:600;">${t}</strong>`;
const pvKw = (k, t) =>
  `<span style="background:${PV[k].bg};color:${PV[k].fg};padding:0.1em 0.3em;border-radius:4px;">${t}</span>`;
const pvB = (t) => `<strong style="color:${C.secText};">${t}</strong>`;

// 레이아웃 스타일
const ST = {
  wrap: `color:${C.text};font-size:0.95rem;line-height:1.55;background:${C.bg};padding:0.75em 0.9em;border-radius:10px;border:1px solid ${C.border};`,
  p: `margin:0.35em 0;padding:0;color:${C.text};`,
  title: `text-align:center;font-size:1.2rem;font-weight:700;color:${C.title};margin:0.4em 0 0.5em;line-height:1.35;`,
  sec: `margin:0.6em 0 0.2em;padding:0.5em 0.65em;background:${C.secBg};border-radius:8px;border-left:3px solid ${C.title};color:${C.secText};font-size:0.98rem;font-weight:600;line-height:1.45;`,
  body: `margin:0.25em 0;padding:0 0.15em;color:${C.text};font-size:0.95rem;line-height:1.55;`,
  summary: `margin:0.6em 0 0.2em;padding:0.55em 0.7em;background:${C.summaryBg};border-radius:8px;border-left:3px solid ${C.summaryBorder};color:${C.secText};font-size:0.98rem;font-weight:600;`,
  tip: `margin:0.5em 0 0;padding:0.55em 0.7em;background:${C.tipBg};border-radius:8px;border-left:3px solid ${C.tipBorder};color:${C.text};font-size:0.94rem;line-height:1.5;`,
};
const pvP = (html, style = ST.p) => `<p style="${style}">${html}</p>`;
const pvEx = (en, ko) =>
  `<span style="color:${C.textEn};font-weight:500;">${en}</span> <span style="color:${C.textMuted};font-size:0.92em;">(${ko})</span>`;
const pvLines = (...items) => items.join('<br><br>');
const pvDivider = `<div style="height:1px;background:${C.border};margin:0.55em 0;"></div>`;
const pvHero = (alt) =>
  `<p style="margin:0;padding:0;"><img src="${IMG_URL}" alt="${alt}" loading="lazy" class="wotd-hero-image" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 0 0.35rem 0;"></p>`;


// 글 상단 히어로 이미지 — frontend/resources/ 에 파일 배치
// cd c:\langchain\backend
// node scripts/seed-popular-voca-words.js

// cd c:\langchain
// git add popular-voca/crocodile-tears/ sitemap.xml backend/scripts/seed-popular-voca-words.js frontend/resources/crocodile_tears.jpg
// git commit -m "Add popular voca: crocodile tears"
// git push
// 글 상단 히어로 이미지 — frontend/resources/ 에 파일 배치

const IMG_URL = '/resources/haste_makes_waste.jpg';

const password = 'seed_password_haste_makes_waste';

function makeSlug(text) {
return String(text || '')
.toLowerCase()
.replace(/[^a-z0-9\s-]/g, '')
.trim()
.replace(/\s+/g, '-')
.replace(/-+/g, '-')
.replace(/^-|-$/g, '');
}

const posts = [
{
title: '급할수록 돌아가세요 영어로?',
slug: makeSlug('haste makes waste'),
metaDescription: '급할수록 돌아가세요는 영어로 Haste makes waste. 상황별 예문으로 자연스럽게 익히는 popular voca 표현입니다.',
message: `<div style="${ST.wrap}">
${pvHero('haste makes waste')}
${pvP('Haste makes waste.', ST.title)}
${pvP('안녕하세요! 오늘은 너무 서두르면 오히려 실수하거나 일을 망칠 때 쓰는 표현을 알아보겠습니다.<br><br>' + pvKwB('ko', '급할수록 돌아가세요') + '와 가장 가까운 영어 표현은 ' + pvKwB('en', 'Haste makes waste') + '입니다', ST.body)}
${pvP(pvB('급할수록 돌아가세요'), ST.sec)}
${pvP(pvLines(
pvEx('Haste makes waste.', '급할수록 돌아가세요.'),
pvEx('Don’t rush it.', '서두르지 마세요.'),
pvEx('Take your time.', '천천히 하세요.'),
pvEx('Slow down and do it right.', '천천히 제대로 하세요.'),
pvEx('If you rush, you will make mistakes.', '서두르면 실수하게 될 거예요.')
), ST.body)}

${pvP(pvB('대화 예시'), ST.sec)}
${pvP(pvLines(
pvEx('A: I need to finish this quickly.', 'A: 이거 빨리 끝내야 해.'),
pvEx('B: Haste makes waste.', 'B: 급할수록 돌아가야 해.'),
pvEx('A: But I am running out of time.', 'A: 하지만 시간이 부족해.'),
pvEx('B: Then slow down and do it right.', 'B: 그럼 더 천천히 제대로 해.'),
'<br>',
pvEx('A: I made another mistake.', 'A: 또 실수했어.'),
pvEx('B: Don’t rush it. Haste makes waste.', 'B: 서두르지 마. 급할수록 돌아가야 해.')
), ST.body)}

${pvP(pvB('참고'), ST.sec)}
${pvP('haste는 “서두름, 성급함”이라는 뜻이고, waste는 “낭비, 헛수고”라는 뜻입니다. Haste makes waste는 직역하면 “성급함은 낭비를 만든다”는 뜻입니다. 즉, 너무 급하게 하려고 하면 실수가 생기고 결국 시간과 노력을 더 낭비하게 된다는 의미입니다.<br><br>비슷한 표현으로 More haste, less speed도 있지만, 일상 학습용 표현으로는 Haste makes waste가 더 간단하고 기억하기 좋습니다.', ST.body)}

${pvP('💡 ' + pvB('한 줄 요약!') + ' ' + pvKw('ko', '급할수록 돌아가세요') + '는 영어로 ' + pvKw('en', 'Haste makes waste') + '라고 하면 자연스럽습니다.', ST.tip)}

</div>`,

nickname: 'admin',
password,

},
];



// https://www.chosun.com/site/data/html_dir/2015/01/22/2015012200141.html 조선일보
//https://m.blog.naver.com/PostList.naver?blogId=eternity9us&tab=1 네이버 블로그 보람셈
//https://www.nilenglish.com/bbs/read.php?sp=4&table=nilenglish_board08&no=643 미국인들표현
////https://blog.naver.com/sry1988/223303521630 명랑소녀 



async function run() {
  console.log('Popular Voca: 기존 글(본 스크립트 비밀번호 글만) 삭제 후 단어 설명 추가합니다.', base);

  // 1. Popular Voca 글 목록 조회 (/easy-voca)
  let list = [];
  try {
    const res = await fetch(`${base}/easy-voca`);
    const data = await res.json();
    list = data.entries || data.data || (Array.isArray(data) ? data : []);
  } catch (e) {
    console.log('목록 조회 실패:', e.message);
  }

  // 2. 목록 각 글에 deletepost 시도 — 비밀번호가 맞을 때만 서버가 삭제
  let deleted = 0;
  for (const entry of list) {
    try {
      const r = await fetch(`${base}/easy-voca/deletepost`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: entry._id, password }),
      });
      if (r.ok) {
        deleted++;
        console.log('  삭제:', entry.title || entry._id);
      }
    } catch (_) {}
  }
  console.log(`기존 글 ${deleted}개 삭제됨.\n`);

  // 3. Popular Voca 단어 설명 추가
  console.log('단어 설명 추가 중...');
  for (let i = 0; i < posts.length; i++) {
    try {
      const res = await fetch(`${base}/easy-voca`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(posts[i]),
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`  ${i + 1}. "${posts[i].title}" 추가됨`);
        if (posts[i].slug && posts[i].metaDescription) {
          const lastmod = toIsoDateOnly();
          const seoPage = writeSeoPage('popular-voca', {
            title: posts[i].title,
            slug: posts[i].slug,
            metaDescription: posts[i].metaDescription,
            datePublished: lastmod,
          });
          updateSitemap({
            boardPath: 'popular-voca',
            slug: posts[i].slug,
            lastmod,
          });
          console.log(`     SEO page: ${seoPage}`);
          console.log(`     URL: ${SITE_ORIGIN}/popular-voca/${encodeURIComponent(posts[i].slug)}/`);
        }
      } else console.log(`  ${i + 1}. 실패:`, data.error || res.status);
    } catch (e) {
      console.log(`  ${i + 1}. 오류:`, e.message, e.cause || '');
    }
  }
  console.log('완료.');
}

run();
