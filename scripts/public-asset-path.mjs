import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));

export function publicAssetPath(assetPath) {
  if (typeof assetPath !== 'string' || !assetPath.startsWith('/')) {
    throw new Error(`La ruta pública del recurso no es válida: ${assetPath}`);
  }

  return path.join(projectRoot, 'public', ...assetPath.slice(1).split('/'));
}
