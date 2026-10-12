import { copyFile, mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const relativePath = 'public/assets/logo/logo.png';
const logoPath = path.join(projectRoot, relativePath);
const originalPath = path.join(projectRoot, '.image-originals/assets/logo/logo.png');
const maxBytes = 120 * 1024;
const maxWidth = 800;

let hasOriginal = false;
try {
  await stat(originalPath);
  hasOriginal = true;
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

const currentInfo = await stat(logoPath);
if (!hasOriginal && currentInfo.size <= maxBytes) {
  console.log(`${relativePath}: ya optimizado (${(currentInfo.size / 1024).toFixed(1)} KB).`);
  process.exit(0);
}

if (!hasOriginal) {
  await mkdir(path.dirname(originalPath), { recursive: true });
  await copyFile(logoPath, originalPath);
}

const source = sharp(originalPath);
const metadata = await source.metadata();
const resize = metadata.width && metadata.width > maxWidth ? { width: maxWidth } : undefined;
const pipeline = resize ? source.resize(resize) : source;
const optimized = await pipeline
  .png({ palette: true, quality: 90, effort: 10 })
  .toBuffer();

await writeFile(logoPath, optimized);
const outMeta = await sharp(optimized).metadata();
console.log(
  `${relativePath}: ${(currentInfo.size / 1024).toFixed(1)} KB → ${(optimized.length / 1024).toFixed(1)} KB `
  + `(${outMeta.width} × ${outMeta.height}, transparencia ${outMeta.hasAlpha ? 'sí' : 'no'})`,
);

if (optimized.length > maxBytes) {
  console.warn(`Advertencia: ${relativePath} sigue por encima de 120 KB.`);
}
