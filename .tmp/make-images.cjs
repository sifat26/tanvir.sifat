// Renders a generated HTML page in headless Chrome to produce resized
// WebP/JPEG variants of the portrait, then writes them into public/.
//
// The source image is inlined as a data URI: loading it via file:// taints the
// canvas under Chrome's origin rules, which makes toDataURL() throw.
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const ROOT = process.cwd();
const srcB64 = fs.readFileSync(path.join('.tmp', 'portrait-new.png')).toString('base64');

const variants = [
  { out: 'portrait-hero.webp', w: 960, q: 0.82, type: 'image/webp', square: false },
  { out: 'portrait-hero.jpg', w: 960, q: 0.82, type: 'image/jpeg', square: false },
  { out: 'portrait-square.webp', w: 520, q: 0.82, type: 'image/webp', square: true },
  { out: 'portrait-square.jpg', w: 520, q: 0.82, type: 'image/jpeg', square: true },
];

for (const v of variants) {
  const html = `<!doctype html><html><head><meta charset="utf-8"></head><body><pre id="out">PENDING</pre>
<script>
const img = new Image();
img.onload = () => {
  const c = document.createElement('canvas');
  const x = c.getContext('2d');
  const square = ${v.square};
  const target = ${v.w};
  if (square) {
    c.width = target; c.height = target;
    const side = Math.min(img.width, img.height);
    const sx = (img.width - side) / 2;
    const sy = Math.max(0, (img.height - side) / 2 - img.height * 0.06);
    x.drawImage(img, sx, sy, side, side, 0, 0, target, target);
  } else {
    const ratio = 10 / 16;
    c.width = target; c.height = Math.round(target * ratio);
    const cropH = Math.min(img.height, img.width * ratio);
    const sy = Math.max(0, (img.height - cropH) / 2 - img.height * 0.1);
    x.drawImage(img, 0, sy, img.width, cropH, 0, 0, c.width, c.height);
  }
  document.getElementById('out').textContent = c.toDataURL('${v.type}', ${v.q});
};
img.onerror = () => { document.getElementById('out').textContent = 'ERROR'; };
img.src = 'data:image/png;base64,${srcB64}';
</script></body></html>`;

  const pagePath = path.join('.tmp', `page-${v.out}.html`);
  fs.writeFileSync(pagePath, html);
  const url = 'file:///' + path.join(ROOT, pagePath).replace(/\\/g, '/');

  const dump = execFileSync(
    CHROME,
    ['--headless', '--disable-gpu', '--no-sandbox', '--virtual-time-budget=10000', '--dump-dom', url],
    { encoding: 'utf8', maxBuffer: 1024 * 1024 * 128 },
  );
  const m = dump.match(/data:image\/[a-z]+;base64,([A-Za-z0-9+/=]+)/);
  if (!m) {
    console.log(`${v.out}: FAILED`);
    continue;
  }
  const buf = Buffer.from(m[1], 'base64');
  fs.writeFileSync(path.join('public', v.out), buf);
  console.log(`${v.out}: ${(buf.length / 1024).toFixed(1)} KB`);
}
