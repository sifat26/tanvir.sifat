/**
 * Master Studio Portrait Builder
 * Sourced directly from the user's authentic, original studio photograph.
 * Zero AI face regeneration, zero artificial white halo/spotlight.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const ASSETS = path.join(__dirname, 'assets');
const MASTER_ORIGINAL = path.join(ASSETS, 'user-real-original.png');

async function build() {
  if (!fs.existsSync(MASTER_ORIGINAL)) {
    console.error('Master original image not found at:', MASTER_ORIGINAL);
    process.exit(1);
  }

  console.log('Generating authentic, uncorrupted portfolio portraits from original photo...');

  // 1:1 square crop: 816x816 from top (preserves full head, natural hair, face, collar, tie, and shoulders)
  const squareMaster = await sharp(MASTER_ORIGINAL)
    .extract({ left: 0, top: 0, width: 816, height: 816 })
    .resize(800, 800)
    .toBuffer();

  // 1. Hero portrait (WebP + JPEG fallback)
  await sharp(squareMaster)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(PUBLIC, 'portrait-hero.webp'));

  await sharp(squareMaster)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'portrait-hero.jpg'));

  console.log('✓ portrait-hero.webp / .jpg (800x800) generated from authentic original');

  // 2. Square avatar (WebP + JPEG fallback)
  await sharp(squareMaster)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(PUBLIC, 'portrait-square.webp'));

  await sharp(squareMaster)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'portrait-square.jpg'));

  console.log('✓ portrait-square.webp / .jpg (800x800) generated from authentic original');
  console.log('Done building portraits.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
