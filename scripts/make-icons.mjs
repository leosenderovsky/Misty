import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { brandConfig } from '../src/brand.config.ts';

const logoPath = fileURLToPath(new URL('../public/assets/logo/logo.png', import.meta.url));
const iconPath = fileURLToPath(new URL('../public/assets/logo/apple-touch-icon.png', import.meta.url));
const background = brandConfig.theme.surface;
const backgroundMatch = /^#([0-9a-f]{6})$/i.exec(background);
if (!backgroundMatch) {
  throw new Error(`Expected a six-digit hex theme surface color, received "${background}"`);
}
const backgroundRgb = backgroundMatch[1].match(/.{2}/g).map((channel) => Number.parseInt(channel, 16));

const logo = sharp(logoPath);
const { width, height } = await logo.metadata();
if (!width || !height || width < 190 || height < 100) {
  throw new Error(`Logo is too small to extract its emblem: ${width}x${height}`);
}

const emblem = await logo
  .extract({
    left: Math.round(width * 0.085),
    top: Math.round(height * 0.08),
    width: Math.round(width * 0.29),
    height: Math.round(height * 0.84),
  })
  .resize(132, 132, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 180,
    height: 180,
    channels: 4,
    background: {
      r: backgroundRgb[0],
      g: backgroundRgb[1],
      b: backgroundRgb[2],
      alpha: 1,
    },
  },
})
  .composite([{ input: emblem, gravity: 'centre' }])
  .png()
  .toFile(iconPath);

console.log(`Generated ${iconPath} with a solid ${background} background.`);
