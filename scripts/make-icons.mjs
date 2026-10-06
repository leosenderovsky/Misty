import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { brandConfig } from '../src/brand.config.ts';

const logoPath = fileURLToPath(new URL('../public/assets/logo/logo.png', import.meta.url));
const logoDirectory = new URL('../public/assets/logo/', import.meta.url);
const background = brandConfig.theme.surface;
const backgroundMatch = /^#([0-9a-f]{6})$/i.exec(background);
if (!backgroundMatch) {
  throw new Error(`Expected a six-digit hex theme surface color, received "${background}"`);
}
const backgroundRgb = backgroundMatch[1].match(/.{2}/g).map((channel) => Number.parseInt(channel, 16));

export async function generateIcons() {
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

  const appleTouchIcon = await sharp({
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
    .toBuffer();
  const favicon = await sharp(appleTouchIcon).resize(32, 32).png().toBuffer();

  return {
    'favicon-32.png': favicon,
    'apple-touch-icon.png': appleTouchIcon,
  };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const icons = await generateIcons();
  for (const [filename, contents] of Object.entries(icons)) {
    const iconPath = fileURLToPath(new URL(filename, logoDirectory));
    await writeFile(iconPath, contents);
    console.log(`Generated ${iconPath} with a solid ${background} background.`);
  }
}
