import { readFile } from 'node:fs/promises';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { generateIcons } from './make-icons.mjs';

const logoDirectory = new URL('../public/assets/logo/', import.meta.url);
const generatedIcons = await generateIcons();
let outdated = false;

for (const [filename, generated] of Object.entries(generatedIcons)) {
  const current = await readFile(fileURLToPath(new URL(filename, logoDirectory)));
  if (!current.equals(generated)) outdated = true;
}

if (outdated) {
  console.error('íconos desactualizados: ejecutá npm run make:icons');
}

const appleIconPath = fileURLToPath(new URL('apple-touch-icon.png', logoDirectory));
const appleIcon = sharp(appleIconPath);
const metadata = await appleIcon.metadata();
if (metadata.width !== 180 || metadata.height !== 180) {
  console.error(`apple-touch-icon.png debe medir 180x180; mide ${metadata.width}x${metadata.height}`);
  process.exitCode = 1;
} else {
  const { data, info } = await appleIcon.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let opaque = true;
  for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
    if (data[pixel * info.channels + 3] !== 255) {
      opaque = false;
      break;
    }
  }
  if (!opaque) {
    console.error('apple-touch-icon.png debe ser opaco');
    process.exitCode = 1;
  }
}

if (outdated) process.exitCode = 1;
if (!outdated && process.exitCode !== 1) {
  console.log('Los íconos están actualizados; apple-touch-icon.png mide 180x180 y es opaco.');
}
