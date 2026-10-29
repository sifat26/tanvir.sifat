/**
 * Master Studio Portrait Builder
 * Builds high-fidelity, fringe-free portrait assets for hero section and avatars.
 * Sourced from clean photographic studio master files (no white halo or cutout artifacts).
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC = path.join(__dirname, '..', 'public');
const ASSETS = path.join(__dirname, 'assets');

const MASTER_HERO = path.join(ASSETS, 'master-hero.jpg');
const MASTER_SQUARE = path.join(ASSETS, 'master-square.jpg');

async function build() {
  console.log('Generating crisp, fringe-free portfolio portraits...');

  // 1. Hero 16:10 (1200 x 750)
  if (fs.existsSync(MASTER_HERO)) {
    const hero = await sharp(MASTER_HERO)
      .resize(1200, 750, { fit: 'cover', position: 'center' })
      .toBuffer();

    await sharp(hero).webp({ quality: 92 }).toFile(path.join(PUBLIC, 'portrait-hero.webp'));
    await sharp(hero).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(PUBLIC, 'portrait-hero.jpg'));
    console.log('✓ portrait-hero.webp / .jpg (1200x750) generated');
  }

  // 2. Square 1:1 (800 x 800)
  if (fs.existsSync(MASTER_SQUARE)) {
    const square = await sharp(MASTER_SQUARE)
      .resize(800, 800, { fit: 'cover', position: 'center' })
      .toBuffer();

    await sharp(square).webp({ quality: 92 }).toFile(path.join(PUBLIC, 'portrait-square.webp'));
    await sharp(square).jpeg({ quality: 92, mozjpeg: true }).toFile(path.join(PUBLIC, 'portrait-square.jpg'));
    console.log('✓ portrait-square.webp / .jpg (800x800) generated');
  }

  console.log('Done building portraits.');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});
