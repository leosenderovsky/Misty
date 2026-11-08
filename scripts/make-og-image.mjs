import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { brandConfig } from '../src/brand.config.ts';
import { publicAssetPath } from './public-asset-path.mjs';

const sourcePath = publicAssetPath(brandConfig.hero.backgroundImage.src);
const outputPath = publicAssetPath(brandConfig.seo.socialImage);
const maxBytes = 200 * 1024;
await mkdir(path.dirname(outputPath), { recursive: true });

let quality = 80;
let output;
do {
  output = await sharp(sourcePath)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality, mozjpeg: true })
    .toBuffer();
  if (output.length <= maxBytes || quality <= 60) break;
  quality -= 2;
} while (quality >= 60);

if (output.length > maxBytes) {
  throw new Error(`og-image.jpg supera 200 KB incluso a calidad ${quality}.`);
}

await writeFile(outputPath, output);
console.log(`Generada ${outputPath}: 1200 × 630 px, ${(output.length / 1024).toFixed(1)} KB (calidad ${quality}).`);
