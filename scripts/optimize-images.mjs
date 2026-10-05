import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const originalsDirectory = path.join(projectRoot, '.image-originals');
const imageRules = [
  { relativePath: 'public/assets/hero/hero-1.jpg', maxBytes: 250 * 1024, quality: 78 },
  { relativePath: 'public/assets/misc/sobre-marca-1.jpg', maxBytes: 180 * 1024, quality: 80 },
  { relativePath: 'public/assets/misc/sobre-marca-2.jpg', maxBytes: 180 * 1024, quality: 80 },
];

for (const rule of imageRules) {
  const imagePath = path.join(projectRoot, rule.relativePath);
  const relativeAssetPath = path.relative(path.join(projectRoot, 'public/assets'), imagePath);
  const originalPath = path.join(originalsDirectory, relativeAssetPath);
  try {
    await stat(originalPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const imageInfo = await stat(imagePath);
    if (imageInfo.size <= rule.maxBytes) {
      console.log(`${rule.relativePath}: ya optimizada (${(imageInfo.size / 1024).toFixed(1)} KB).`);
      continue;
    }
    await mkdir(path.dirname(originalPath), { recursive: true });
    await copyFile(imagePath, originalPath);
  }

  const original = await readFile(originalPath);
  const sourceMetadata = await sharp(original).metadata();
  let quality = rule.quality;
  let optimized;
  do {
    optimized = await sharp(original).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (optimized.length <= rule.maxBytes || quality <= 64) break;
    quality -= 2;
  } while (quality >= 64);

  if (optimized.length > rule.maxBytes) {
    throw new Error(`${rule.relativePath} no alcanza el objetivo de ${(rule.maxBytes / 1024).toFixed(0)} KB a calidad 64.`);
  }

  const optimizedMetadata = await sharp(optimized).metadata();
  if (optimizedMetadata.width !== sourceMetadata.width || optimizedMetadata.height !== sourceMetadata.height) {
    throw new Error(`La optimización alteró las dimensiones de ${rule.relativePath}.`);
  }
  await writeFile(imagePath, optimized);
  console.log(
    `${rule.relativePath}: ${(original.length / 1024).toFixed(1)} KB → ${(optimized.length / 1024).toFixed(1)} KB `
    + `(${sourceMetadata.width} × ${sourceMetadata.height}, calidad ${quality})`,
  );
}
