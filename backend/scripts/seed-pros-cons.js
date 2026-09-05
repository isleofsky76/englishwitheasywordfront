/**
 * Pros & Cons 샘플 글 업로드
 * - 동일 비밀번호로 작성된 기존 글만 삭제 후 시드 글 추가
 * - 비밀번호가 다른 글은 유지하고 시드 글을 새로 추가
 * 사용법: 백엔드 실행 후 → node scripts/seed-pros-cons.js
 */
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { API_BASE } from './loadEnv.js';
import { buildProsConsMessage } from './pros-cons-format.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env') });


const password = 'password_seed_ai_generated_copyright_5523';

const SAMPLE_POST = {
title: 'AI가 생성한 창작물도 저작권으로 보호해야 할까?',
message: buildProsConsMessage(
[
{ en: 'AI-generated works should receive copyright protection when a human gives detailed prompts, selects results, and edits the final work.', ko: '인간이 구체적인 프롬프트를 입력하고 결과물을 선택하며 최종 작품을 수정했다면 AI 생성물도 저작권 보호를 받을 수 있어야 한다.' },
{ en: 'Copyright protection can encourage people to use AI as a serious creative tool rather than treating it as a toy.', ko: '저작권 보호는 사람들이 AI를 장난감이 아니라 진지한 창작 도구로 활용하도록 장려할 수 있다.' },
{ en: 'If AI-assisted works are not protected, creators may hesitate to publish designs, music, writing, or images made with AI.', ko: 'AI를 활용한 작품이 보호받지 못하면 창작자는 AI로 만든 디자인, 음악, 글, 이미지를 공개하기 꺼릴 수 있다.' },
{ en: 'A human user often makes many creative decisions, such as choosing a theme, mood, composition, and final version.', ko: 'AI 사용자도 주제, 분위기, 구성, 최종본 선택 등 많은 창의적 결정을 내리는 경우가 많다.' },
{ en: 'Copyright protection can make it easier to sell, license, and distribute AI-assisted creative works legally.', ko: '저작권 보호는 AI 활용 창작물을 합법적으로 판매하고, 이용 허락하고, 배포하는 일을 더 쉽게 만들 수 있다.' },
{ en: 'Many modern works already depend on digital tools, so AI can be seen as another advanced tool in the creative process.', ko: '현대의 많은 작품은 이미 디지털 도구에 의존하므로 AI도 창작 과정에서 사용하는 또 하나의 고급 도구로 볼 수 있다.' },
{ en: 'Protecting AI-assisted works can support new industries in advertising, education, game design, and online content production.', ko: 'AI 활용 창작물 보호는 광고, 교육, 게임 디자인, 온라인 콘텐츠 제작 같은 새로운 산업을 뒷받침할 수 있다.' },
{ en: 'A clear copyright system can reduce disputes between users, platforms, clients, and companies that use AI-generated content.', ko: '명확한 저작권 제도는 AI 생성 콘텐츠를 사용하는 이용자, 플랫폼, 의뢰인, 기업 사이의 분쟁을 줄일 수 있다.' },
{ en: 'Copyright can protect the human contribution while still requiring disclosure that AI was used.', ko: '저작권은 AI 사용 사실을 공개하게 하면서도 인간의 기여 부분을 보호할 수 있다.' },
{ en: 'A balanced rule can protect works with meaningful human creativity while excluding fully automatic machine output.', ko: '균형 잡힌 규칙은 의미 있는 인간의 창의성이 들어간 작품은 보호하고 완전 자동 생성물은 제외할 수 있다.' }
],
[
{ en: 'AI-generated works should not receive copyright protection if no human author actually created the expression.', ko: '실제로 표현을 창작한 인간 저자가 없다면 AI 생성물은 저작권 보호를 받아서는 안 된다.' },
{ en: 'Copyright law is meant to protect human creativity, not the automatic output of a machine.', ko: '저작권법은 기계의 자동 산출물이 아니라 인간의 창의성을 보호하기 위한 제도다.' },
{ en: 'If AI outputs receive copyright too easily, companies could produce massive amounts of protected content at very low cost.', ko: 'AI 결과물에 저작권을 너무 쉽게 인정하면 기업은 매우 낮은 비용으로 막대한 양의 보호 콘텐츠를 생산할 수 있다.' },
{ en: 'This could flood the market and make it harder for human artists, writers, and musicians to earn money.', ko: '그 결과 시장에 콘텐츠가 넘쳐나 인간 화가, 작가, 음악가가 수익을 얻기 더 어려워질 수 있다.' },
{ en: 'AI models are often trained on existing human works, so granting copyright to outputs may reward users while ignoring original creators.', ko: 'AI 모델은 기존 인간 창작물을 학습하는 경우가 많기 때문에 결과물에 저작권을 주면 원작자는 외면되고 사용자만 보상받을 수 있다.' },
{ en: 'It may be difficult to decide who owns the copyright: the prompt writer, the AI company, the editor, or the data providers.', ko: '저작권자가 프롬프트 작성자인지, AI 회사인지, 편집자인지, 데이터 제공자인지 판단하기 어려울 수 있다.' },
{ en: 'Strong protection for AI-generated works may increase lawsuits over images, songs, stories, and designs that look similar.', ko: 'AI 생성물에 강한 보호를 부여하면 비슷해 보이는 이미지, 노래, 이야기, 디자인을 둘러싼 소송이 늘어날 수 있다.' },
{ en: 'Users may claim copyright over works that were mostly produced by the AI system with little personal effort.', ko: '사용자는 개인적 노력이 거의 없고 대부분 AI 시스템이 만든 작품에도 저작권을 주장할 수 있다.' },
{ en: 'Giving copyright to machine-generated content may weaken the social value of authorship and original effort.', ko: '기계가 만든 콘텐츠에 저작권을 주면 저자성과 독창적 노력의 사회적 가치가 약해질 수 있다.' },
{ en: 'A better approach may be to protect only the human-edited parts, while leaving purely AI-generated output unprotected.', ko: '더 나은 방식은 인간이 편집하고 구성한 부분만 보호하고 순수 AI 생성물은 보호하지 않는 것일 수 있다.' }
],
'※ 이 문장들은 AI에 의해 작성되었습니다.'
),
nickname: 'Pros & Cons',
password
};







const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };













async function seed() {
  console.log('Pros & Cons 시드 업로드...', API_BASE);

  let entries = [];
  try {
    const listRes = await fetch(`${API_BASE}/pros-cons`);
    const listData = await listRes.json();
    entries = listData.entries || [];
  } catch (e) {
    console.error('목록 조회 실패:', e.message);
    process.exit(1);
  }

  let deleted = 0;
  for (const entry of entries) {
    if (!entry?._id) continue;
    try {
      const res = await fetch(`${API_BASE}/pros-cons/deletepost`, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({ id: entry._id, password })
      });
      if (res.ok) {
        deleted++;
        console.log(`  삭제 (동일 비밀번호): "${entry.title}"`);
      }
    } catch (_) {
      // 개별 삭제 실패는 무시하고 계속 진행
    }
  }
  if (deleted > 0) {
    console.log(`기존 글 ${deleted}건 삭제됨 (동일 비밀번호).`);
  }

  try {
    const res = await fetch(`${API_BASE}/pros-cons`, {
      method: 'POST',
      headers: JSON_HEADERS,
      body: JSON.stringify(SAMPLE_POST)
    });
    const data = await res.json();
    if (res.ok) {
      console.log(`"${SAMPLE_POST.title}" 추가됨`);
    } else {
      console.log('추가 실패:', data.error || res.status);
      process.exit(1);
    }
  } catch (e) {
    console.error('업로드 오류:', e.message);
    process.exit(1);
  }

  console.log('완료. pros-cons.html?index=0 에서 확인하세요. (Ctrl+Shift+R 새로고침)');
}

seed();
