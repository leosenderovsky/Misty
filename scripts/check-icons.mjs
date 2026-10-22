import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { brandConfig } from '../src/brand.config.ts';
import { generateIcons } from './make-icons.mjs';

const logoDirectory = new URL('../public/assets/logo/', import.meta.url);
const logoPath = fileURLToPath(new URL('logo.png', logoDirectory));
const generatedIcons = await generateIcons();
const backgroundMatch = /^#([0-9a-f]{6})$/i.exec(brandConfig.theme.surface);
if (!backgroundMatch) {
  throw new Error(`Expected a six-digit hex theme surface color, received "${brandConfig.theme.surface}"`);
}
const backgroundRgb = backgroundMatch[1].match(/.{2}/g).map((channel) => Number.parseInt(channel, 16));
let outdated = false;

for (const [filename, generated] of Object.entries(generatedIcons)) {
  const current = await readFile(fileURLToPath(new URL(filename, logoDirectory)));
  if (!current.equals(generated)) outdated = true;
}

if (outdated) {
  console.error('iconos desactualizados: ejecuta npm run make:icons');
}

function measureContent(data, info) {
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      if (
        data[offset] !== backgroundRgb[0] ||
        data[offset + 1] !== backgroundRgb[1] ||
        data[offset + 2] !== backgroundRgb[2]
      ) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX === -1) {
    return {
      empty: true,
      width: 0,
      height: 0,
      majorAxisRatio: 0,
      touchesOuterBand: false,
    };
  }

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;
  const outerBand = Math.ceil(Math.min(info.width, info.height) * 0.02);

  return {
    empty: false,
    left: minX,
    top: minY,
    right: maxX,
    bottom: maxY,
    width,
    height,
    majorAxisRatio: Math.max(width / info.width, height / info.height),
    touchesOuterBand:
      minX < outerBand ||
      minY < outerBand ||
      maxX >= info.width - outerBand ||
      maxY >= info.height - outerBand,
  };
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

  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function hasAlpha(data, info, x, y) {
  return data[(y * info.width + x) * info.channels + 3] > 0;
}

async function validateManualIconCrop() {
  const iconCrop = brandConfig.logo.iconCrop;
  if (!iconCrop) return;

  const rawLogo = await sharp(logoPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const trim = findAlphaBounds(rawLogo.data, rawLogo.info);
  const trimmedLogo = await sharp(logoPath).ensureAlpha().extract(trim).raw().toBuffer({ resolveWithObject: true });
  const crop = {
    left: Math.round(trimmedLogo.info.width * iconCrop.left),
    top: Math.round(trimmedLogo.info.height * iconCrop.top),
    width: Math.max(1, Math.round(trimmedLogo.info.width * iconCrop.width)),
    height: Math.max(1, Math.round(trimmedLogo.info.height * iconCrop.height)),
  };
  const right = crop.left + crop.width - 1;
  const bottom = crop.top + crop.height - 1;
  let cutsVisiblePixels = false;

  for (let y = crop.top; y <= bottom && !cutsVisiblePixels; y += 1) {
    cutsVisiblePixels =
      (crop.left > 0 && hasAlpha(trimmedLogo.data, trimmedLogo.info, crop.left, y) && hasAlpha(trimmedLogo.data, trimmedLogo.info, crop.left - 1, y)) ||
      (right < trimmedLogo.info.width - 1 &&
        hasAlpha(trimmedLogo.data, trimmedLogo.info, right, y) &&
        hasAlpha(trimmedLogo.data, trimmedLogo.info, right + 1, y));
  }

  for (let x = crop.left; x <= right && !cutsVisiblePixels; x += 1) {
    cutsVisiblePixels =
      (crop.top > 0 && hasAlpha(trimmedLogo.data, trimmedLogo.info, x, crop.top) && hasAlpha(trimmedLogo.data, trimmedLogo.info, x, crop.top - 1)) ||
      (bottom < trimmedLogo.info.height - 1 &&
        hasAlpha(trimmedLogo.data, trimmedLogo.info, x, bottom) &&
        hasAlpha(trimmedLogo.data, trimmedLogo.info, x, bottom + 1));
  }

  if (cutsVisiblePixels) {
    console.error('logo.iconCrop corta pixeles visibles del logo; ajusta el recorte del emblema');
    process.exitCode = 1;
  }
}

async function validateIcon(filename, expectedSize, { requireOpaque = false } = {}) {
  const iconPath = fileURLToPath(new URL(filename, logoDirectory));
  const icon = sharp(iconPath);
  const metadata = await icon.metadata();
  if (metadata.width !== expectedSize || metadata.height !== expectedSize) {
    console.error(`${filename} debe medir ${expectedSize}x${expectedSize}; mide ${metadata.width}x${metadata.height}`);
    process.exitCode = 1;
    return null;
  }

  const { data, info } = await icon.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  if (requireOpaque) {
    let opaque = true;
    for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
      if (data[pixel * info.channels + 3] !== 255) {
        opaque = false;
        break;
      }
    }
    if (!opaque) {
      console.error(`${filename} debe ser opaco`);
      process.exitCode = 1;
    }
  }

  const content = measureContent(data, info);
  if (content.empty) {
    console.error(`${filename} no tiene contenido visible`);
    process.exitCode = 1;
  } else {
    if (content.touchesOuterBand) {
      console.error('el emblema toca el borde del icono: recorte incorrecto, ajusta logo.iconCrop');
      process.exitCode = 1;
    }
    if (content.majorAxisRatio < 0.7 || content.majorAxisRatio > 0.95) {
      console.error(
        `${filename} debe ocupar entre 70% y 95% del lado en el eje mayor; ocupa ${(
          content.majorAxisRatio * 100
        ).toFixed(1)}%`,
      );
      process.exitCode = 1;
    }
  }

  return content;
}

const iconMeasurements = {
  'favicon-32.png': await validateIcon('favicon-32.png', 32),
  'apple-touch-icon.png': await validateIcon('apple-touch-icon.png', 180, { requireOpaque: true }),
};
await validateManualIconCrop();

if (outdated) process.exitCode = 1;
if (!outdated && process.exitCode !== 1) {
  const measurements = Object.entries(iconMeasurements)
    .map(([filename, content]) => `${filename}: ${(content.majorAxisRatio * 100).toFixed(1)}%`)
    .join(', ');
  console.log(`Los iconos estan actualizados; apple-touch-icon.png mide 180x180 y es opaco. Ocupacion: ${measurements}.`);
}
