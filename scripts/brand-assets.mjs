/**
 * Brand asset pipeline for Ayesha Herbal & Beauty.
 *
 * Source of truth: client/public/brand/ayesha-logo.svg — the roundel recreated
 * from the brand's own packaging (pink disc, crescent, serif wordmark).
 *
 * Produces:
 *   brand/ayesha-logo.png              full-size raster
 *   brand/ayesha-logo-transparent.png  same artwork on transparency
 *   brand/ayesha-logo-trimmed.png      empty padding removed (navbar/footer)
 *   favicon-32.png, favicon-48.png, apple-touch-icon.png
 *   og-image.png                       1200×630 social card
 *
 *   node scripts/brand-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BRAND_DIR = path.join(ROOT, 'client/public/brand');
const PUBLIC_DIR = path.join(ROOT, 'client/public');
const SVG_PATH = path.join(BRAND_DIR, 'ayesha-logo.svg');

const PINK = '#E91E63';
const CREAM = '#FFF0F5';
const BLUSH = '#FFF7FA';
const INK = '#211018';
const GOLD = '#C9A227';

async function main() {
  if (!fs.existsSync(SVG_PATH)) {
    throw new Error(`Brand source missing: ${SVG_PATH}`);
  }

  const svg = fs.readFileSync(SVG_PATH);
  const original = await sharp(svg, { density: 300 }).resize(1024, 1024).png().toBuffer();

  fs.writeFileSync(path.join(BRAND_DIR, 'ayesha-logo.png'), original);

  // The badge already bleeds to the canvas edge; keep a transparent version
  // for flexibility and a tightly trimmed one for small UI slots.
  const transparent = await sharp(svg, { density: 300 }).resize(1024, 1024).png().toBuffer();
  fs.writeFileSync(path.join(BRAND_DIR, 'ayesha-logo-transparent.png'), transparent);

  const trimmed = await sharp(transparent).trim({ threshold: 1 }).png().toBuffer();
  fs.writeFileSync(path.join(BRAND_DIR, 'ayesha-logo-trimmed.png'), trimmed);

  // Favicons: badge on an opaque blush tile so it stays legible in tabs.
  for (const [size, name] of [
    [32, 'favicon-32.png'],
    [48, 'favicon-48.png'],
    [180, 'apple-touch-icon.png'],
  ]) {
    const pad = Math.round(size * 0.06);
    const mark = await sharp(svg, { density: 300 })
      .resize(size - pad * 2, size - pad * 2)
      .png()
      .toBuffer();
    await sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: CREAM,
      },
    })
      .composite([{ input: mark, left: pad, top: pad }])
      .png()
      .toFile(path.join(PUBLIC_DIR, name));
  }

  // Social card — 1200×630, cream ground, roundel left, copy right.
  const mark = await sharp(svg, { density: 300 }).resize(380, 380).png().toBuffer();
  const base = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="${BLUSH}"/>
    <circle cx="1090" cy="70" r="190" fill="${CREAM}"/>
    <circle cx="70" cy="590" r="150" fill="${CREAM}"/>
    <text x="520" y="236" fill="${GOLD}" font-family="Georgia, serif" font-size="19" letter-spacing="6">HERBAL BEAUTY · SELF-CARE</text>
    <text x="516" y="336" fill="${INK}" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700">Ayesha</text>
    <text x="520" y="392" fill="${PINK}" font-family="Georgia, 'Times New Roman', serif" font-size="46" font-style="italic">Herbal &amp; Beauty</text>
    <line x1="520" y1="430" x2="1080" y2="430" stroke="${GOLD}" stroke-opacity="0.65" stroke-width="2"/>
    <text x="520" y="482" fill="#755363" font-family="Georgia, serif" font-size="26">A little care. A lot of glow.</text>
    <text x="520" y="540" fill="#755363" font-family="Arial, sans-serif" font-size="20" letter-spacing="3">ORDER DIRECTLY ON WHATSAPP</text>
  </svg>`);

  await sharp(base)
    .composite([{ input: mark, left: 95, top: 125 }])
    .png()
    .toFile(path.join(PUBLIC_DIR, 'og-image.png'));

  console.log('Brand assets generated:');
  console.log('  client/public/brand/ayesha-logo.png');
  console.log('  client/public/brand/ayesha-logo-transparent.png');
  console.log('  client/public/brand/ayesha-logo-trimmed.png');
  console.log('  client/public/favicon-32.png');
  console.log('  client/public/favicon-48.png');
  console.log('  client/public/apple-touch-icon.png');
  console.log('  client/public/og-image.png');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
