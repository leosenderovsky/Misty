import { copyFile, mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { brandConfig } from '../src/brand.config.ts';
import { publicAssetPath } from './public-asset-path.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const originalsDirectory = path.join(projectRoot, '.image-originals');
const imageRules = [
  { assetPath: brandConfig.hero.backgroundImage.src, maxBytes: 250 * 1024, quality: 78 },
  { assetPath: brandConfig.essenceSection.look1.src, maxBytes: 180 * 1024, quality: 80 },
  { assetPath: brandConfig.essenceSection.look2.src, maxBytes: 180 * 1024, quality: 80 },
];

for (const rule of imageRules) {
  const imagePath = publicAssetPath(rule.assetPath);
  const relativePath = path.join('public', rule.assetPath.slice(1));
  const relativeAssetPath = rule.assetPath.slice('/assets/'.length);
  const originalPath = path.join(originalsDirectory, relativeAssetPath);
  try {
    await stat(originalPath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    const imageInfo = await stat(imagePath);
    if (imageInfo.size <= rule.maxBytes) {
      console.log(`${relativePath}: ya optimizada (${(imageInfo.size / 1024).toFixed(1)} KB).`);
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
    throw new Error(`${relativePath} no alcanza el objetivo de ${(rule.maxBytes / 1024).toFixed(0)} KB a calidad 64.`);
  }

  const optimizedMetadata = await sharp(optimized).metadata();
  if (optimizedMetadata.width !== sourceMetadata.width || optimizedMetadata.height !== sourceMetadata.height) {
    throw new Error(`La optimización alteró las dimensiones de ${relativePath}.`);
  }
  await writeFile(imagePath, optimized);
  console.log(
    `${relativePath}: ${(original.length / 1024).toFixed(1)} KB → ${(optimized.length / 1024).toFixed(1)} KB `
    + `(${sourceMetadata.width} × ${sourceMetadata.height}, calidad ${quality})`,
  );
}
