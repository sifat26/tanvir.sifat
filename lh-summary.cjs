const r = require('./lh-report.json');
const a = r.audits;

console.log('--- SCORES ---');
for (const [k, v] of Object.entries(r.categories)) {
  console.log(k.padEnd(18), Math.round(v.score * 100));
}

console.log('\n--- METRICS ---');
const metrics = [
  'first-contentful-paint',
  'largest-contentful-paint',
  'total-blocking-time',
  'cumulative-layout-shift',
  'speed-index',
];
for (const k of metrics) {
  console.log(k.padEnd(28), a[k] && a[k].displayValue);
}

console.log('\n--- FAILING / IMPERFECT AUDITS ---');
for (const [id, aud] of Object.entries(a)) {
  if (aud.score === null || aud.score >= 1) continue;
  if (aud.scoreDisplayMode === 'informative' || aud.scoreDisplayMode === 'notApplicable') continue;
  const saving = aud.details && aud.details.overallSavingsMs;
  console.log(
    `[${String(Math.round(aud.score * 100)).padStart(3)}] ${id}` + (saving ? ` — ~${Math.round(saving)}ms` : ''),
  );
}
