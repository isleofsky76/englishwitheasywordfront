/**
 * 홈 index.html 섹션 미리보기 HTML 스냅샷
 *
 *   cd backend
 *   node scripts/rebuild-home-preview.js all
 *   node scripts/rebuild-home-preview.js news
 */
import { API_BASE } from './loadEnv.js';
import {
  HOME_PREVIEW_SECTIONS,
  fetchSectionPreviewHtml,
  fetchCombinedPreviewItems,
  patchIndexHomePreview,
} from './home-preview-html.js';
import { FRONTEND_ROOT } from './voca-seo.js';

function parseArgs(argv) {
  const positional = argv.filter((a) => !a.startsWith('--'));
  return { section: positional[0] || 'all' };
}

async function runOne(apiBase, section, combinedCache) {
  const listHtml = await fetchSectionPreviewHtml(apiBase, section, combinedCache);
  patchIndexHomePreview(section.key, listHtml);
  console.log(`  ✅ #${section.listId} (${section.limit}건)`);
}

async function main() {
  const { section: sectionKey } = parseArgs(process.argv.slice(2));
  const apiBase = (API_BASE || '').replace(/\/$/, '');
  console.log(`홈 미리보기 … API: ${apiBase}`);
  console.log(`index.html: ${FRONTEND_ROOT}`);

  if (sectionKey === 'all') {
    const combined = await fetchCombinedPreviewItems(apiBase);
    for (const section of HOME_PREVIEW_SECTIONS) {
      try {
        await runOne(apiBase, section, combined);
      } catch (err) {
        console.error(`  ❌ ${section.key}: ${err.message}`);
      }
    }
    console.log('완료 (all).');
    return;
  }

  const section = HOME_PREVIEW_SECTIONS.find((s) => s.key === sectionKey);
  if (!section) {
    console.error(`알 수 없는 섹션: ${sectionKey}`);
    console.error('사용 가능: all,', HOME_PREVIEW_SECTIONS.map((s) => s.key).join(', '));
    process.exit(1);
  }

  await runOne(apiBase, section);
  console.log('완료.');
}

main().catch((err) => {
  console.error('❌', err.message);
  process.exit(1);
});
