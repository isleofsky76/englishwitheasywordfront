/**
 * Replace plain adminPassword !== checks with requireAdmin(req, res).
 */
import fs from 'fs';

const file = new URL('../index.js', import.meta.url);
let src = fs.readFileSync(file, 'utf8');
const before = src;

const patterns = [
  // indented factory style
  [
    /const \{ id, adminPasswordInput \} = req\.body;\r?\n\s*if \(adminPasswordInput !== adminPassword\) \{\r?\n\s*return res\.status\(403\)\.json\(\{ error: 'Invalid admin password' \}\);\r?\n\s*\}/g,
    "if (!requireAdmin(req, res)) return;\n    const { id } = req.body;",
  ],
  // top-level with optional blank line after destructure
  [
    /const \{ id, adminPasswordInput \} = req\.body;\r?\n\r?\n?\s*if \(adminPasswordInput !== adminPassword\) \{\r?\n\s*return res\.status\(403\)\.json\(\{ error: 'Invalid admin password' \}\);\r?\n\s*\}\r?\n/g,
    "if (!requireAdmin(req, res)) return;\n  const { id } = req.body;\n",
  ],
];

for (const [re, rep] of patterns) {
  src = src.replace(re, rep);
}

// Alias onesentence helper
src = src.replace(
  /function requireOneSentenceAdmin\(req, res\) \{\r?\n  const ip = getRequestIp\(req\);\r?\n  if \(rejectIfIpAuthLocked\(ip, res\)\) return false;\r?\n  const \{ adminPasswordInput \} = req\.body \|\| \{\};\r?\n  if \(!adminPassword \|\| !safeEqualString\(adminPasswordInput, adminPassword\)\) \{\r?\n    recordIpAuthFail\(ip, \{ maxFails: AUTH_ADMIN_MAX_FAILS, lockMs: AUTH_LOCK_MS \}\);\r?\n    res\.status\(403\)\.json\(\{ error: 'Invalid admin password' \}\);\r?\n    return false;\r?\n  \}\r?\n  clearIpAuthFail\(ip\);\r?\n  return true;\r?\n\}/,
  'function requireOneSentenceAdmin(req, res) {\n  return requireAdmin(req, res);\n}'
);

// Remove unused legacy public delete route (FE uses /onesentence/admin/deletepost)
src = src.replace(
  /\r?\napp\.post\('\/onesentence-deletepost', async \(req, res\) => \{[\s\S]*?\n\}\);\r?\n/,
  '\n'
);

// Prefer getAdminPassword() for remaining reserved-nick checks that still read adminPassword const
// Keep `const adminPassword = ...` for any leftover references.

fs.writeFileSync(file, src);
const left = (src.match(/adminPasswordInput !== adminPassword/g) || []).length;
const reqCount = (src.match(/requireAdmin\(req, res\)/g) || []).length;
console.log('changed', src !== before);
console.log('plain compares left', left);
console.log('requireAdmin calls', reqCount);
console.log('legacy onesentence-deletepost', src.includes('/onesentence-deletepost'));
