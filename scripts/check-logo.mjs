import { readFile, stat } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const logoPath = fileURLToPath(new URL('../public/assets/logo/logo.svg', import.meta.url));
const MAX_FILE_SIZE = 30 * 1024;
const TEAL_REFERENCES = [
  { name: '#386878', rgb: [0x38, 0x68, 0x78] },
  { name: '#588898', rgb: [0x58, 0x88, 0x98] },
];
const COLOR_TOLERANCE = 24;
const MIN_MATCHING_PIXELS = 8;

const checks = [];
const report = (name, passed, detail) => {
  checks.push(passed);
  console.log(`${passed ? 'PASS' : 'FAIL'}: ${name} — ${detail}`);
};

let svg;
let fileInfo;
try {
  [svg, fileInfo] = await Promise.all([readFile(logoPath, 'utf8'), stat(logoPath)]);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('Sin logo.svg: se usa logo.png (opcional)');
    process.exit(0);
  }
  throw error;
}

const viewBoxMatch = /\bviewBox=["']\s*(-?[\d.]+)[,\s]+(-?[\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)\s*["']/i.exec(svg);
if (!viewBoxMatch) {
  throw new Error(`No se pudo leer un viewBox válido en ${logoPath}`);
}

const [, viewX, viewY, viewWidth, viewHeight] = viewBoxMatch.map(Number);
const defs = /<defs\b[^>]*>[\s\S]*?<\/defs\s*>/i.exec(svg)?.[0] ?? '';
const pathTags = [...svg.matchAll(/<path\b[^>]*\/?>/gi)].map(([tag]) => tag);
let fullViewBoxPath = null;
const width = String(viewWidth);
const height = String(viewHeight);

for (let index = 0; index < pathTags.length; index += 1) {
  const pathData = /\bd=["']([^"']*)["']/i.exec(pathTags[index])?.[1];
  if (pathData) {
    const compactPath = pathData.replace(/[\s,]+/g, '');
    const fullCanvasRectangle = [
      `M0${height}V0h${width}v${height}H0Z`,
      `M00h${width}v${height}H0Z`,
      `M${width}0h-${width}v${height}H0Z`,
      `M0${height}H${width}V0H0Z`,
    ].some((rectangle) => compactPath.startsWith(rectangle));
    if (fullCanvasRectangle) {
      fullViewBoxPath = index + 1;
      break;
    }
  }

  const pathSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewX} ${viewY} ${viewWidth} ${viewHeight}" width="${viewWidth}" height="${viewHeight}">${defs}${pathTags[index]}</svg>`;
  const { data, info } = await sharp(Buffer.from(pathSvg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let opaquePixels = 0;
  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    if (data[pixel * info.channels + 3] === 255) opaquePixels += 1;
  }
  if (opaquePixels / (info.width * info.height) >= 0.95) {
    fullViewBoxPath = index + 1;
    break;
  }
}

report(
  'Sin trazado de fondo que cubra el viewBox',
  fullViewBoxPath === null,
  fullViewBoxPath === null
    ? 'no se encontró ningún trazado opaco que cubra al menos el 95% del viewBox'
    : `el trazado ${fullViewBoxPath} cubre prácticamente todo el viewBox`,
);

const { data, info } = await sharp(Buffer.from(svg))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
let transparentPixels = 0;
const tealColors = TEAL_REFERENCES.map(() => new Map());

for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
  const offset = pixel * info.channels;
  const alpha = data[offset + 3];
  if (alpha === 0) transparentPixels += 1;
  if (alpha < 128) continue;

  const rgb = [data[offset], data[offset + 1], data[offset + 2]];
  const distances = TEAL_REFERENCES.map(({ rgb: target }) => Math.sqrt(
    rgb.reduce((sum, channel, index) => sum + (channel - target[index]) ** 2, 0),
  ));
  if (distances[0] === distances[1]) continue;

  const closestColorIndex = distances[0] < distances[1] ? 0 : 1;
  const target = TEAL_REFERENCES[closestColorIndex].rgb;
  if (rgb.every((channel, index) => Math.abs(channel - target[index]) <= COLOR_TOLERANCE)) {
    const key = rgb.join(',');
    tealColors[closestColorIndex].set(key, (tealColors[closestColorIndex].get(key) ?? 0) + 1);
  }
}

const transparentRatio = transparentPixels / (info.width * info.height);
report(
  'Más del 60% de transparencia',
  transparentRatio > 0.6,
  `${(transparentRatio * 100).toFixed(1)}% de píxeles transparentes (mínimo: más de 60%)`,
);

const tealMatches = tealColors.map((colors) => [...colors.values()].reduce((sum, count) => sum + count, 0));
const hasBothTeals = tealColors.every((colors) =>
  [...colors.values()].some((count) => count >= MIN_MATCHING_PIXELS));
report(
  'Dos tonos teal de marca',
  hasBothTeals,
  TEAL_REFERENCES.map(({ name }, index) => `${name}: ${tealMatches[index]} píxeles cercanos`).join('; '),
);

report(
  'Menos de 30 KB',
  fileInfo.size < MAX_FILE_SIZE,
  `${(fileInfo.size / 1024).toFixed(1)} KB (máximo: menos de 30 KB)`,
);

if (checks.every(Boolean)) {
  console.log('El logo SVG cumple todas las reglas.');
} else {
  console.error('El logo SVG no es válido. Conservá logo.png como logo activo y reemplazá el SVG según docs/IMAGENES.md.');
  process.exitCode = 1;
}
