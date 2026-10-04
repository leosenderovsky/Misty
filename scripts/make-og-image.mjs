import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const sourcePath = path.join(projectRoot, 'public/assets/hero/hero-1.jpg');
const outputPath = path.join(projectRoot, 'public/assets/misc/og-image.jpg');
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
