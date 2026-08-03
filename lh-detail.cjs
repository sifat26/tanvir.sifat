const r = require('./lh-report.json');
const a = r.audits;

const show = (id) => {
  const aud = a[id];
  if (!aud) return console.log(`\n### ${id}: (not present)`);
  console.log(`\n### ${id} — score ${aud.score}`);
  if (aud.explanation) console.log('explanation:', aud.explanation);
  const items = aud.details && aud.details.items;
  if (!items) return;
  console.log(JSON.stringify(items.slice(0, 6), null, 1).slice(0, 2200));
};

['color-contrast', 'label-content-name-mismatch', 'charset', 'robots-txt', 'prioritize-lcp-image', 'largest-contentful-paint-element', 'render-blocking-resources', 'modern-image-formats'].forEach(show);
