/**
 * One-off product image preparation.
 *
 * Source: the client's existing product photography (downloaded from
 * ayeshaherbalandbeauty.com/assets/images). Images are resized and converted
 * to WebP for fast delivery; the originals are never modified.
 *
 *   node scripts/prepare-images.mjs <source-folder>
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'client/public/images/products');

const MAP = {
  'bridal-cream.png': 'bridal-cream',
  'night-cream.png': 'night-cream',
  'day-cream.png': 'day-cream',
  'body-whitening-cream.png': 'body-whitening-cream',
  'bridal-soap.png': 'bridal-soap',
  'whitening-soap.png': 'whitening-soap',
  'loofah-tanning-soap.png': 'loofah-tanning-soap',
  'pimple-soap.png': 'pimple-soap',
  'nila-soap.png': 'nila-soap',
  'detan-pack.png': 'detan-pack',
  'face-body-scrub.png': 'face-body-scrub',
  'moroccan-nila-face-wash.png': 'moroccan-nila-face-wash',
  'vitamin-c-face-wash.png': 'vitamin-c-face-wash',
  'hair-oil.png': 'hair-oil',
};

async function main() {
  const src = process.argv[2];
  if (!src) throw new Error('Usage: node scripts/prepare-images.mjs <source-folder>');

  fs.mkdirSync(OUT, { recursive: true });

  for (const [file, slug] of Object.entries(MAP)) {
    const input = path.join(src, file);
    if (!fs.existsSync(input)) {
      console.warn(`missing: ${file}`);
      continue;
    }
    await sharp(input)
      .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 84 })
      .toFile(path.join(OUT, `${slug}.webp`));
    console.log(`✓ ${slug}.webp`);
  }

  const hero = path.join(src, 'hero-products.png');
  if (fs.existsSync(hero)) {
    await sharp(hero)
      .resize({ width: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 86 })
      .toFile(path.join(ROOT, 'client/public/images/hero-products.webp'));
    console.log('✓ hero-products.webp');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
