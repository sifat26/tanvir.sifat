/**
 * Studio-Grade Portrait Generator
 * Generates modern, cinematic developer portraits with ambient emerald studio rim lighting
 * and smooth bottom blending for both Dark & Light modes.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const ASSET_CUTOUT = path.join(__dirname, 'assets', 'cutout.png');
const ROOT_CUTOUT = path.join(__dirname, '..', 'tmp-cutout.png');
const CUTOUT = fs.existsSync(ASSET_CUTOUT) ? ASSET_CUTOUT : ROOT_CUTOUT;

// Studio lighting palette — matches portfolio obsidian & emerald design system
const DEEP_BASE = '#090D15';
const EMERALD = '#10B981';
const MINT = '#34D399';
const CYAN = '#06B6D4';

if (!fs.existsSync(CUTOUT)) {
  console.error(`Missing cutout at ${CUTOUT}`);
  process.exit(1);
}

// Background layers
const studioBackdrop = (w, h, headX, headY) => Buffer.from(`
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Primary Emerald Studio Halo behind head -->
      <radialGradient id="halo" cx="${headX}" cy="${headY}" r="${Math.round(w * 0.55)}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${EMERALD}" stop-opacity="0.32"/>
        <stop offset="35%" stop-color="${MINT}" stop-opacity="0.16"/>
        <stop offset="70%" stop-color="${CYAN}" stop-opacity="0.05"/>
        <stop offset="100%" stop-color="${DEEP_BASE}" stop-opacity="0"/>
      </radialGradient>

      <!-- Soft secondary rim light on upper left -->
      <radialGradient id="rim" cx="${Math.round(w * 0.25)}" cy="${Math.round(h * 0.2)}" r="${Math.round(w * 0.45)}" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="${CYAN}" stop-opacity="0.18"/>
        <stop offset="60%" stop-color="${EMERALD}" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="${DEEP_BASE}" stop-opacity="0"/>
      </radialGradient>

      <!-- Subtle technical dot grid pattern -->
      <pattern id="dots" width="32" height="32" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#ffffff" fill-opacity="0.045"/>
      </pattern>

      <!-- Bottom fade gradient to blend suit seamlessly -->
      <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${DEEP_BASE}" stop-opacity="0"/>
        <stop offset="75%" stop-color="${DEEP_BASE}" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${DEEP_BASE}" stop-opacity="0.95"/>
      </linearGradient>

      <!-- Ambient edge vignette -->
      <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
        <stop offset="60%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.65"/>
      </radialGradient>
    </defs>

    <!-- Base fill -->
    <rect width="${w}" height="${h}" fill="${DEEP_BASE}"/>
    <!-- Dot pattern -->
    <rect width="${w}" height="${h}" fill="url(#dots)"/>
    <!-- Studio aura -->
    <rect width="${w}" height="${h}" fill="url(#halo)"/>
    <rect width="${w}" height="${h}" fill="url(#rim)"/>
    <!-- Vignette -->
    <rect width="${w}" height="${h}" fill="url(#vignette)"/>
  </svg>
`);

const bottomBlendLayer = (w, h, blendStartY) => Buffer.from(`
  <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${DEEP_BASE}" stop-opacity="0"/>
        <stop offset="50%" stop-color="${DEEP_BASE}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${DEEP_BASE}" stop-opacity="0.98"/>
      </linearGradient>
    </defs>
    <rect y="${blendStartY}" width="${w}" height="${h - blendStartY}" fill="url(#fade)"/>
  </svg>
`);

async function generatePortraits() {
  console.log('Generating studio portraits from cutout...');

  // 1. Transparent Cutout for dynamic modern UI
  const cutoutBase = sharp(CUTOUT);
  const { width: cW, height: cH } = await cutoutBase.metadata();

  // Resize transparent cutout to standard clean dimensions
  const cutoutResized = await sharp(CUTOUT)
    .resize({ height: 900, fit: 'inside' })
    .png()
    .toBuffer();

  await sharp(cutoutResized).webp({ quality: 95, alphaQuality: 100 }).toFile(path.join(PUBLIC, 'portrait-cutout.webp'));
  await sharp(cutoutResized).png({ compressionLevel: 9 }).toFile(path.join(PUBLIC, 'portrait-cutout.png'));
  console.log('✓ portrait-cutout.webp / .png created');

  // 2. 16:10 Hero Image (1200 x 750)
  const W_HERO = 1200;
  const H_HERO = 750;

  // Scale subject to fit comfortably with head in upper third
  const subjectHeroHeight = 720;
  const subjectHero = await sharp(CUTOUT)
    .resize({ height: subjectHeroHeight, fit: 'inside' })
    .png()
    .toBuffer();
  const shMeta = await sharp(subjectHero).metadata();

  const heroLeft = Math.round((W_HERO - shMeta.width) / 2);
  const heroTop = 30; // 30px breathing room above hair

  const heroHeadX = Math.round(heroLeft + shMeta.width * 0.5);
  const heroHeadY = Math.round(heroTop + shMeta.height * 0.35);

  const heroBackdrop = studioBackdrop(W_HERO, H_HERO, heroHeadX, heroHeadY);
  const heroBottomBlend = bottomBlendLayer(W_HERO, H_HERO, H_HERO - 180);

  const composedHero = await sharp(heroBackdrop)
    .composite([
      { input: subjectHero, left: heroLeft, top: heroTop },
      { input: heroBottomBlend, left: 0, top: 0, blend: 'over' },
    ])
    .png()
    .toBuffer();

  await sharp(composedHero).webp({ quality: 90 }).toFile(path.join(PUBLIC, 'portrait-hero.webp'));
  await sharp(composedHero).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(PUBLIC, 'portrait-hero.jpg'));
  console.log('✓ portrait-hero.webp / .jpg (1200x750) created');

  // 3. 1:1 Square Avatar (800 x 800)
  const S = 800;
  const subjectSquareHeight = 740;
  const subjectSquare = await sharp(CUTOUT)
    .resize({ height: subjectSquareHeight, fit: 'inside' })
    .png()
    .toBuffer();
  const sqMeta = await sharp(subjectSquare).metadata();

  const sqLeft = Math.round((S - sqMeta.width) / 2);
  const sqTop = 50;

  const sqHeadX = Math.round(S / 2);
  const sqHeadY = Math.round(sqTop + sqMeta.height * 0.35);

  const sqBackdrop = studioBackdrop(S, S, sqHeadX, sqHeadY);
  const sqBottomBlend = bottomBlendLayer(S, S, S - 160);

  const composedSquare = await sharp(sqBackdrop)
    .composite([
      { input: subjectSquare, left: sqLeft, top: sqTop },
      { input: sqBottomBlend, left: 0, top: 0, blend: 'over' },
    ])
    .png()
    .toBuffer();

  await sharp(composedSquare).webp({ quality: 90 }).toFile(path.join(PUBLIC, 'portrait-square.webp'));
  await sharp(composedSquare).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(PUBLIC, 'portrait-square.jpg'));
  console.log('✓ portrait-square.webp / .jpg (800x800) created');
}

generatePortraits().catch(err => {
  console.error(err);
  process.exit(1);
});
