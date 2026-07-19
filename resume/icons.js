/**
 * Tiny monochrome PNG icon generator (no dependencies).
 * Renders simple navy glyphs on a transparent canvas so they can be embedded
 * inline in the .docx contact line. Icons are drawn at 96px and scaled down by
 * Word to ~10px, which keeps edges crisp. ATS ignores images and reads the
 * adjacent text (email, URLs) normally.
 */
const zlib = require("zlib");

const NAVY = [31, 58, 95]; // #1F3A5F
const SIZE = 96;

// ── minimal RGBA canvas ──────────────────────────────────────────────────────
function makeCanvas(w = SIZE, h = SIZE) {
  return { w, h, data: new Uint8Array(w * h * 4) };
}
function px(c, x, y, a = 255) {
  x = Math.round(x);
  y = Math.round(y);
  if (x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const i = (y * c.w + x) * 4;
  const na = a / 255;
  const oa = c.data[i + 3] / 255;
  const out = na + oa * (1 - na);
  c.data[i] = NAVY[0];
  c.data[i + 1] = NAVY[1];
  c.data[i + 2] = NAVY[2];
  c.data[i + 3] = Math.max(c.data[i + 3], Math.round(out * 255));
}
function disc(c, cx, cy, r, a = 255) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++)
    for (let x = Math.floor(cx - r); x <= cx + r; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r) px(c, x, y, a);
    }
}
function ring(c, cx, cy, r, t) {
  for (let y = Math.floor(cy - r - t); y <= cy + r + t; y++)
    for (let x = Math.floor(cx - r - t); x <= cx + r + t; x++) {
      const d = Math.hypot(x - cx, y - cy);
      if (d <= r + t / 2 && d >= r - t / 2) px(c, x, y);
    }
}
function line(c, x0, y0, x1, y1, t) {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0)) * 2;
  for (let s = 0; s <= steps; s++) {
    const u = s / steps;
    disc(c, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, t / 2);
  }
}
function rectStroke(c, x0, y0, x1, y1, t) {
  line(c, x0, y0, x1, y0, t);
  line(c, x1, y0, x1, y1, t);
  line(c, x1, y1, x0, y1, t);
  line(c, x0, y1, x0, y0, t);
}
function fillRoundRect(c, x0, y0, x1, y1, r, a = 255) {
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      const cx = Math.min(Math.max(x, x0 + r), x1 - r);
      const cy = Math.min(Math.max(y, y0 + r), y1 - r);
      if (Math.hypot(x - cx, y - cy) <= r) px(c, x, y, a);
    }
}
// knock a shape back out to transparent (for white glyphs on filled tiles)
function clearDisc(c, cx, cy, r) {
  for (let y = Math.floor(cy - r); y <= cy + r; y++)
    for (let x = Math.floor(cx - r); x <= cx + r; x++)
      if (Math.hypot(x - cx, y - cy) <= r) {
        const i = (y * c.w + x) * 4;
        c.data[i + 3] = 0;
      }
}
function clearLine(c, x0, y0, x1, y1, t) {
  const steps = Math.ceil(Math.hypot(x1 - x0, y1 - y0)) * 2;
  for (let s = 0; s <= steps; s++) {
    const u = s / steps;
    clearDisc(c, x0 + (x1 - x0) * u, y0 + (y1 - y0) * u, t / 2);
  }
}
function clearRect(c, x0, y0, x1, y1) {
  for (let y = y0; y <= y1; y++)
    for (let x = x0; x <= x1; x++) {
      const i = (y * c.w + x) * 4;
      c.data[i + 3] = 0;
    }
}

// ── PNG encode ────────────────────────────────────────────────────────────────
function crc32(buf) {
  let crc = ~0;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let k = 0; k < 8; k++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (~crc) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const t = Buffer.from(type, "ascii");
  const body = Buffer.concat([t, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}
function encodePNG(c) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(c.w, 0);
  ihdr.writeUInt32BE(c.h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc((c.w * 4 + 1) * c.h);
  for (let y = 0; y < c.h; y++) {
    raw[y * (c.w * 4 + 1)] = 0; // filter none
    c.data.subarray(y * c.w * 4, (y + 1) * c.w * 4).forEach((v, i) => {
      raw[y * (c.w * 4 + 1) + 1 + i] = v;
    });
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([sig, chunk("IHDR", ihdr), chunk("IDAT", idat), chunk("IEND", Buffer.alloc(0))]);
}

// ── glyphs ────────────────────────────────────────────────────────────────────
function emailIcon() {
  const c = makeCanvas();
  rectStroke(c, 12, 24, 84, 72, 6); // envelope body
  line(c, 14, 26, 48, 52, 6); // flap left
  line(c, 82, 26, 48, 52, 6); // flap right
  return encodePNG(c);
}
function globeIcon() {
  const c = makeCanvas();
  const cx = 48, cy = 48, r = 36;
  ring(c, cx, cy, r, 5); // outer circle
  line(c, cx - r, cy, cx + r, cy, 4); // equator
  // one clean vertical ellipse (meridian foreshortened)
  const ew = r * 0.5;
  for (let t = 0; t <= 360; t += 1.5) {
    const rad = (t * Math.PI) / 180;
    disc(c, cx + ew * Math.sin(rad), cy + r * Math.cos(rad), 2);
  }
  // straight meridian down the middle
  line(c, cx, cy - r, cx, cy + r, 3);
  return encodePNG(c);
}
function linkedinIcon() {
  const c = makeCanvas();
  fillRoundRect(c, 8, 8, 88, 88, 14); // navy tile
  // knock out "in" in white
  clearRect(c, 22, 42, 32, 72); // i stem
  clearDisc(c, 27, 30, 7); // i dot
  // n: stem
  clearRect(c, 44, 42, 54, 72);
  // n: arch + right leg
  clearRect(c, 54, 42, 72, 50);
  clearRect(c, 64, 50, 74, 72);
  return encodePNG(c);
}

module.exports = { emailIcon, globeIcon, linkedinIcon };

if (require.main === module) {
  const fs = require("fs");
  fs.writeFileSync("icon-email.png", emailIcon());
  fs.writeFileSync("icon-globe.png", globeIcon());
  fs.writeFileSync("icon-linkedin.png", linkedinIcon());
  console.log("wrote sample icons");
}
