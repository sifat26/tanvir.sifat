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

  console.log('Generating authentic portfolio portraits from original photo...');

  // 1. Hero 4:5 portrait (800 x 1000) preserving 100% of the authentic photograph
  const hero45 = await sharp(MASTER_ORIGINAL)
    .resize(800, 1000, { fit: 'cover', position: 'top' })
    .toBuffer();

  await sharp(hero45)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(PUBLIC, 'portrait-hero.webp'));

  await sharp(hero45)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'portrait-hero.jpg'));

  console.log('✓ portrait-hero.webp / .jpg (800x1000 4:5) generated from authentic original');

  // 2. Square avatar (800 x 800)
  const square = await sharp(MASTER_ORIGINAL)
    .extract({ left: 0, top: 0, width: 816, height: 816 })
    .resize(800, 800)
    .toBuffer();

  await sharp(square)
    .webp({ quality: 95, effort: 6 })
    .toFile(path.join(PUBLIC, 'portrait-square.webp'));

  await sharp(square)
    .jpeg({ quality: 95, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'portrait-square.jpg'));

  console.log('✓ portrait-square.webp / .jpg (800x800 square) generated from authentic original');
  console.log('Done building portraits.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
