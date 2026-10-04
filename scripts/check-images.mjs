import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const assetsDirectory = fileURLToPath(new URL('../public/assets/', import.meta.url));
const strict = process.argv.includes('--strict');
const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

async function listImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const images = [];

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      images.push(...await listImages(filePath));
    } else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) {
      images.push(filePath);
    }
  }

  return images;
}

const warnings = [];
for (const imageUrl of await listImages(assetsDirectory)) {
  const relativePath = path.relative(assetsDirectory, imageUrl).replaceAll('\\', '/');
  const isHero = relativePath.startsWith('hero/');
  const isPortrait = /(^|\/)sobre-marca-[^/]+$/i.test(relativePath);
  if (!isHero && !isPortrait) continue;

  const { width, height } = await sharp(imageUrl).metadata();
  const minimumWidth = isHero ? 1600 : 800;
  if (width && width < minimumWidth) {
    warnings.push({ relativePath, width, height, minimumWidth });
  }
}

if (warnings.length === 0) {
  console.log('No low-resolution hero or portrait images found.');
} else {
  console.log('BAJA RESOLUCIÓN:');
  for (const image of warnings) {
    console.log(`- ${image.relativePath}: ${image.width}x${image.height} px (mínimo ${image.minimumWidth} px de ancho)`);
  }
}

if (strict && warnings.length > 0) {
  process.exitCode = 1;
}
