import { stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const svgPath = fileURLToPath(new URL('../public/assets/logo/logo.svg', import.meta.url));
try {
  await stat(svgPath);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('No hay public/assets/logo/logo.svg. Falta vectorizar el logo: ver docs/IMAGENES.md');
    process.exit(1);
  }
  throw error;
}

const checkPath = fileURLToPath(new URL('./check-logo.mjs', import.meta.url));
const check = spawnSync(process.execPath, [checkPath], { stdio: 'inherit' });
if (check.error) throw check.error;
if (check.status !== 0) {
  console.error('No se generó logo.png: primero debe pasar `npm run check:logo`.');
  process.exit(check.status ?? 1);
}

const pngPath = fileURLToPath(new URL('../public/assets/logo/logo.png', import.meta.url));
await sharp(svgPath)
  .resize(1600, 406, { fit: 'fill' })
  .png()
  .toFile(pngPath);

console.log(`Generado ${pngPath} (1600 × 406 px, fondo transparente).`);
