// 사이트 내 상대 링크/이미지 경로 검증 (파일시스템 기준)
const fs = require('fs'), path = require('path');
const ROOT = __dirname;
const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(ROOT);

let ok = 0, bad = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const refs = [...html.matchAll(/(?:href|src)\s*=\s*["']([^"']+)["']/g)].map(m => m[1]);
  for (const r of refs) {
    if (/^(https?:|data:|mailto:|javascript:|#)/.test(r)) continue;
    const clean = r.split('#')[0].split('?')[0];
    if (!clean) continue;
    let target = path.resolve(path.dirname(f), decodeURIComponent(clean));
    // 디렉터리 링크(v2/ 등)는 index.html로 해석
    if (clean.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) bad.push(`${path.relative(ROOT, f)} -> ${r}`);
    else ok++;
  }
}
console.log(`checked ${htmlFiles.length} html files, ${ok} refs OK`);
if (bad.length) { console.log('MISSING:'); bad.forEach(b => console.log('  ' + b)); process.exitCode = 1; }
else console.log('no missing refs');
