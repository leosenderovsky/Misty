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

const transparentBackground = { r: 0, g: 0, b: 0, alpha: 0 };

function assertFractionCrop(crop) {
  const fields = ['left', 'top', 'width', 'height'];
  for (const field of fields) {
    if (!Number.isFinite(crop[field]) || crop[field] < 0 || crop[field] > 1) {
      throw new Error(`logo.iconCrop.${field} must be a fraction from 0 to 1`);
    }
  }
  if (crop.width <= 0 || crop.height <= 0) {
    throw new Error('logo.iconCrop width and height must be greater than 0');
  }
  if (crop.left + crop.width > 1 || crop.top + crop.height > 1) {
    throw new Error('logo.iconCrop must stay inside the trimmed logo bounds');
  }
}

function findAlphaBounds(data, info) {
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > 0) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX === -1) {
    throw new Error('Logo has no visible pixels to extract an emblem from');
  }

  return {
    left: minX,
    top: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

async function trimToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return findAlphaBounds(data, info);
}

async function extractEmblem(logoPath) {
  const flattenedLogo = sharp(logoPath).ensureAlpha().png();
  const logoBuffer = await flattenedLogo.toBuffer();
  const trim = await trimToAlpha(logoBuffer);
  const trimmedLogo = await sharp(logoBuffer).extract(trim).png().toBuffer();
  const iconCrop = brandConfig.logo.iconCrop;

  if (iconCrop) {
    assertFractionCrop(iconCrop);
    return sharp(trimmedLogo)
      .extract({
        left: Math.round(trim.width * iconCrop.left),
        top: Math.round(trim.height * iconCrop.top),
        width: Math.max(1, Math.round(trim.width * iconCrop.width)),
        height: Math.max(1, Math.round(trim.height * iconCrop.height)),
      })
      .png()
      .toBuffer();
  }

  const { data, info } = await sharp(trimmedLogo).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const columnHasContent = Array.from({ length: info.width }, (_, x) => {
    for (let y = 0; y < info.height; y += 1) {
      if (data[(y * info.width + x) * info.channels + 3] > 0) return true;
    }
    return false;
  });
  const minimumGapWidth = Math.ceil(info.width * 0.03);
  let emblemWidth = info.width;
  let gapStart = -1;

  for (let x = 0; x <= columnHasContent.length; x += 1) {
    if (x < columnHasContent.length && !columnHasContent[x]) {
      if (gapStart === -1) gapStart = x;
      continue;
    }

    if (gapStart !== -1) {
      const gapWidth = x - gapStart;
      if (gapStart > 0 && gapWidth >= minimumGapWidth) {
        emblemWidth = gapStart;
        break;
      }
      gapStart = -1;
    }
  }

  const emblem = await sharp(trimmedLogo)
    .extract({ left: 0, top: 0, width: emblemWidth, height: info.height })
    .png()
    .toBuffer();
  const emblemTrim = await trimToAlpha(emblem);
  return sharp(emblem).extract(emblemTrim).png().toBuffer();
}

async function renderIcon(emblem, size, paddingRatio) {
  const padding = Math.floor(size * paddingRatio);
  const transparentIcon = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: transparentBackground,
    },
  })
    .composite([
      {
        input: await sharp(emblem)
          .resize(size - padding * 2, size - padding * 2, {
            fit: 'contain',
            background: transparentBackground,
          })
          .png()
          .toBuffer(),
        gravity: 'centre',
      },
    ])
    .png()
    .toBuffer();

  return sharp(transparentIcon)
    .flatten({
      background: {
        r: backgroundRgb[0],
        g: backgroundRgb[1],
        b: backgroundRgb[2],
      },
    })
    .png()
    .toBuffer();
}

export async function generateIcons() {
  const logo = sharp(logoPath);
  const { width, height } = await logo.metadata();
  if (!width || !height || width < 190 || height < 100) {
    throw new Error(`Logo is too small to extract its emblem: ${width}x${height}`);
  }

  const emblem = await extractEmblem(logoPath);
  const appleTouchIcon = await renderIcon(emblem, 180, 0.08);
  const favicon = await renderIcon(emblem, 32, 0.06);

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
