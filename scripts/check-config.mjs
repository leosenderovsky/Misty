import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { publicAssetPath } from './public-asset-path.mjs';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const dataDir = path.join(projectRoot, 'src/data');
const strict = process.argv.includes('--strict');

function relativeLuminance(hex) {
  const clean = hex.replace('#', '');
  const r8 = Number.parseInt(clean.slice(0, 2), 16) / 255;
  const g8 = Number.parseInt(clean.slice(2, 4), 16) / 255;
  const b8 = Number.parseInt(clean.slice(4, 6), 16) / 255;
  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * toLinear(r8) + 0.7152 * toLinear(g8) + 0.0722 * toLinear(b8);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const errors = [];
const warnings = [];
const validRoles = new Set(['brandName', 'brandShortName', 'legalName']);
const roleCounts = new Map();
const roleFields = [];
const validAssetKeys = new Set(['path', 'minWidth', 'maxWidth', 'ratio', 'ratios', 'ratioTolerance', 'maxKB']);
const ratioPattern = /^\d+:\d+$/;
const cropRequiredPaths = new Set([
  'logo.favicon32',
  'logo.appleTouchIcon',
  'seo.socialImage',
  'definitions.heroImage.src',
  'definitions.lookImage.src',
]);

async function findSchemaFiles(directory, relativeDirectory = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) result.push(...(await findSchemaFiles(absolutePath, relativePath)));
    else if (entry.isFile() && entry.name.endsWith('.schema.json')) result.push({ absolutePath, relativePath: relativePath.replaceAll('\\', '/') });
  }
  return result;
}

function validateAsset(asset, schemaLabel, fieldPath) {
  const prefix = `${schemaLabel} ${fieldPath}`;
  if (!asset || typeof asset !== 'object' || Array.isArray(asset)) {
    errors.push(`${prefix}: x-asset debe ser un objeto`);
    return;
  }
  for (const key of Object.keys(asset)) {
    if (!validAssetKeys.has(key)) errors.push(`${prefix}: clave x-asset no permitida '${key}'`);
  }
  if (typeof asset.path !== 'string' || asset.path.length === 0) {
    errors.push(`${prefix}: falta path obligatorio`);
  } else if (!asset.path.startsWith('/') || asset.path.startsWith('/public/') || asset.path.startsWith('public/')) {
    errors.push(`${prefix}.path: debe empezar con "/" y no con "public/": "${asset.path}"`);
  }
  if ('ratio' in asset && (typeof asset.ratio !== 'string' || !ratioPattern.test(asset.ratio))) errors.push(`${prefix}.ratio: debe ser texto con formato W:H (por ejemplo, 16:9)`);
  if ('ratios' in asset && (!Array.isArray(asset.ratios) || asset.ratios.some((ratio) => typeof ratio !== 'string' || !ratioPattern.test(ratio)))) errors.push(`${prefix}.ratios: debe ser una lista de proporciones con formato W:H`);
  if ('ratio' in asset && 'ratios' in asset) errors.push(`${prefix}: ratio y ratios son excluyentes`);
  if ('ratioTolerance' in asset && (typeof asset.ratioTolerance !== 'number' || !Number.isFinite(asset.ratioTolerance) || asset.ratioTolerance < 0)) errors.push(`${prefix}.ratioTolerance: debe ser un número mayor o igual que 0`);
  for (const key of ['minWidth', 'maxWidth', 'maxKB']) {
    if (key in asset && (typeof asset[key] !== 'number' || !Number.isFinite(asset[key]))) errors.push(`${prefix}.${key}: debe ser un número`);
  }
  if (cropRequiredPaths.has(fieldPath) && !('ratio' in asset) && !('ratios' in asset)) errors.push(`${prefix}: falta ratio o ratios para una imagen recortable`);
}

function inspectRoles(node, schemaLabel, currentPath = '', insideArray = false) {
  if (!node || typeof node !== 'object') return;
  if (Object.hasOwn(node, 'x-role')) {
    const role = node['x-role'];
    const prefix = `${schemaLabel} ${currentPath || '/'}`;
    if (!validRoles.has(role)) {
      errors.push(`${prefix}: x-role inválido '${role}' (valores permitidos: brandName, brandShortName, legalName)`);
    } else {
      roleCounts.set(role, (roleCounts.get(role) || 0) + 1);
      roleFields.push({ role, schemaLabel, fieldPath: currentPath || '/', node });
      if (node.type !== 'string') errors.push(`${prefix}: un campo con x-role requiere type string`);
      if (insideArray) errors.push(`${prefix}: x-role no puede estar dentro de un array`);
      if (node['x-exampleData'] !== true) errors.push(`${prefix}: un campo con x-role requiere x-exampleData: true`);
      if (!Array.isArray(node.examples) || node.examples.length === 0 || typeof node.examples[0] !== 'string' || !node.examples[0]) errors.push(`${prefix}: un campo con x-role requiere examples con el nombre del prototipo`);
    }
  }
  for (const [key, child] of Object.entries(node.properties || {})) inspectRoles(child, schemaLabel, currentPath ? `${currentPath}.${key}` : key, insideArray);
  if (node.definitions && currentPath === '') for (const [name, definition] of Object.entries(node.definitions)) inspectRoles(definition, schemaLabel, `definitions.${name}`, insideArray);
  if (node.items) inspectRoles(node.items, schemaLabel, `${currentPath}[]`, true);
}

function inspectSchema(node, schemaLabel, currentPath = '') {
  if (!node || typeof node !== 'object') return;
  if (Object.hasOwn(node, 'x-asset')) validateAsset(node['x-asset'], schemaLabel, currentPath || '/');
  for (const [key, child] of Object.entries(node.properties || {})) inspectSchema(child, schemaLabel, currentPath ? `${currentPath}.${key}` : key);
  if (node.definitions && currentPath === '') for (const [name, definition] of Object.entries(node.definitions)) inspectSchema(definition, schemaLabel, `definitions.${name}`);
  if (node.items) inspectSchema(node.items, schemaLabel, `${currentPath}[]`);
}

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const markersRaw = await readFile(path.join(dataDir, 'prototype-markers.json'), 'utf8');
const markers = JSON.parse(markersRaw);

const files = await readdir(dataDir);
const jsonFiles = files.filter((f) => f.endsWith('.json') && !f.endsWith('.schema.json') && f !== 'prototype-markers.json');

const schemaFiles = await findSchemaFiles(dataDir);
for (const schemaFile of schemaFiles) {
  try {
    const schema = JSON.parse(await readFile(schemaFile.absolutePath, 'utf8'));
    const schemaLabel = `src/data/${schemaFile.relativePath}`;
    inspectSchema(schema, schemaLabel);
    inspectRoles(schema, schemaLabel);
    if (/^(catalog|size-guide)\.schema\.json$/.test(path.basename(schemaFile.relativePath))) {
      for (const roleField of roleFields.filter(({ schemaLabel: fieldSchema }) => fieldSchema === schemaLabel)) errors.push(`${schemaLabel} ${roleField.fieldPath}: x-role no está permitido en este esquema`);
    }
  } catch (err) {
    errors.push(`${schemaFile.relativePath}: no se pudo validar x-asset: ${err.message}`);
  }
}

for (const role of ['brandName', 'brandShortName', 'legalName']) {
  const count = roleCounts.get(role) || 0;
  if (role === 'brandName' && count === 0) errors.push('src/data: falta exactamente un campo con x-role brandName');
  if (count > 1) {
    const paths = roleFields.filter((field) => field.role === role).map((field) => `${field.schemaLabel} ${field.fieldPath}`).join(', ');
    errors.push(`src/data: x-role ${role} aparece ${count} veces; solo se permite una. Campos: ${paths}`);
  }
}

const brandNameExample = roleFields.find(({ role }) => role === 'brandName')?.node?.examples?.[0];
if (typeof brandNameExample === 'string' && brandNameExample) {
  for (const { role, schemaLabel, fieldPath, node } of roleFields) {
    if ((role === 'brandShortName' || role === 'legalName') && node.examples?.[0]?.toLowerCase().includes(brandNameExample.toLowerCase()) && node['x-exampleData'] !== true) errors.push(`${schemaLabel} ${fieldPath}: contiene el nombre del prototipo y requiere x-exampleData: true`);
  }
}

for (const file of jsonFiles) {
  const schemaFile = file.replace(/\.json$/, '.schema.json');
  const schemaPath = path.join(dataDir, schemaFile);
  const dataPath = path.join(dataDir, file);

  let schema;
  try {
    schema = JSON.parse(await readFile(schemaPath, 'utf8'));
  } catch (err) {
    errors.push(`${file}: no se pudo leer el esquema ${schemaFile}: ${err.message}`);
    continue;
  }

  const data = JSON.parse(await readFile(dataPath, 'utf8'));
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid && validate.errors) {
    for (const err of validate.errors) {
      errors.push(`${file} ${err.instancePath || '/'}: ${err.message}`);
    }
  }

  async function checkAssets(schemaNode, dataNode, currentPath = '') {
    if (!schemaNode || typeof schemaNode !== 'object') return;
    if (schemaNode.$ref?.startsWith('#/definitions/')) {
      const definition = schema.definitions?.[schemaNode.$ref.slice('#/definitions/'.length)];
      await checkAssets(definition, dataNode, currentPath);
      return;
    }

    const asset = schemaNode['x-asset'];
    if (asset) {
      const fieldPath = currentPath || '(raíz)';
      const assetPath = asset.path;
      if (
        typeof assetPath !== 'string' ||
        !assetPath.startsWith('/') ||
        assetPath.startsWith('/public/') ||
        assetPath.startsWith('public/')
      ) {
        errors.push(`${file} ${fieldPath}: x-asset.path debe empezar con "/" y no con "public/": "${assetPath}"`);
        return;
      }

      const hasValue = typeof dataNode === 'string' && dataNode.trim() !== '';
      if (hasValue) {
        if (!assetPath.includes('{id}') && dataNode !== assetPath) {
          errors.push(`${file} ${fieldPath}: el valor "${dataNode}" debe ser exactamente igual al path "${assetPath}"`);
        }

        const fileAssetPath = assetPath.includes('{id}') ? dataNode : assetPath;
        if (!fileAssetPath.startsWith('/') || fileAssetPath.startsWith('/public/') || fileAssetPath.startsWith('public/')) {
          errors.push(`${file} ${fieldPath}: la ruta del recurso debe empezar con "/" y no con "public/": "${fileAssetPath}"`);
          return;
        }
        try {
          const fileInfo = await stat(publicAssetPath(fileAssetPath));
          if (!fileInfo.isFile()) {
            errors.push(`${file} ${fieldPath}: no existe un archivo en public + "${fileAssetPath}"`);
            return;
          }
          if (typeof asset.maxKB === 'number' && fileInfo.size > asset.maxKB * 1024) {
            warnings.push(
              `${file} ${fieldPath}: el archivo "${fileAssetPath}" pesa ${(fileInfo.size / 1024).toFixed(1)} KB `
              + `(máximo recomendado: ${asset.maxKB} KB)`,
            );
          }
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
          errors.push(`${file} ${fieldPath}: no existe el archivo en public + "${fileAssetPath}"`);
        }
      }
      return;
    }

    if (Array.isArray(dataNode)) {
      for (const [index, value] of dataNode.entries()) {
        await checkAssets(schemaNode.items, value, `${currentPath}[${index}]`);
      }
      return;
    }

    if (!dataNode || typeof dataNode !== 'object') return;
    for (const [key, childSchema] of Object.entries(schemaNode.properties || {})) {
      await checkAssets(childSchema, dataNode[key], currentPath ? `${currentPath}.${key}` : key);
    }
  }
  await checkAssets(schema, data);

  // Verificar imágenes referenciadas en public/
  async function checkImages(node, currentPath = '') {
    if (!node || typeof node !== 'object') return;
    for (const [key, value] of Object.entries(node)) {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;
      if (typeof value === 'string' && (value.startsWith('/assets/') || /\.(png|jpe?g|svg|webp|avif)$/i.test(value))) {
        try {
          await stat(publicAssetPath(value.startsWith('/') ? value : `/${value}`));
        } catch (error) {
          if (error.code !== 'ENOENT') throw error;
          errors.push(`${file} ${fieldPath}: imagen no existe en public/: ${value}`);
        }
      } else if (typeof value === 'object' && value !== null) {
        await checkImages(value, fieldPath);
      }
    }
  }
  await checkImages(data);

  // Verificar colores hex y contraste en theme
  if (data.theme && schema.properties?.theme?.properties) {
    const themeProps = schema.properties.theme.properties;
    for (const [token, hex] of Object.entries(data.theme)) {
      if (typeof hex === 'string') {
        if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
          errors.push(`${file} theme.${token}: color inválido '${hex}' (debe ser #RRGGBB)`);
        }
        const tokenSchema = themeProps[token];
        const contrastWith = tokenSchema?.['x-contrastWith'];
        if (contrastWith && data.theme[contrastWith]) {
          const bgHex = data.theme[contrastWith];
          if (/^#[0-9a-fA-F]{6}$/.test(hex) && /^#[0-9a-fA-F]{6}$/.test(bgHex)) {
            const ratio = contrastRatio(hex, bgHex);
            if (ratio < 4.5) {
              warnings.push(
                `${file} theme.${token}: contraste con ${contrastWith} es ${ratio.toFixed(2)}:1 (recomendado >= 4.5:1)`,
              );
            }
          }
        }
      }
    }
  }

  // Verificar WhatsApp solo dígitos
  if (data.contact?.whatsapp?.number) {
    if (!/^\d+$/.test(data.contact.whatsapp.number)) {
      errors.push(`${file} contact.whatsapp.number: debe contener solo dígitos ('${data.contact.whatsapp.number}')`);
    }
  }

  // URLs http(s)
  function checkUrls(node, currentPath = '') {
    if (!node || typeof node !== 'object') return;
    for (const [key, value] of Object.entries(node)) {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;
      if (typeof value === 'string' && (key.endsWith('Url') || key === 'url')) {
        if (value && !/^https?:\/\//i.test(value)) {
          errors.push(`${file} ${fieldPath}: URL debe comenzar con http:// o https:// ('${value}')`);
        }
      } else if (typeof value === 'object' && value !== null) {
        checkUrls(value, fieldPath);
      }
    }
  }
  checkUrls(data);

  // closedWeekdays entre 0 y 6
  if (Array.isArray(data.contact?.hours?.closedWeekdays)) {
    for (const d of data.contact.hours.closedWeekdays) {
      if (!Number.isInteger(d) || d < 0 || d > 6) {
        errors.push(`${file} contact.hours.closedWeekdays: valores deben estar entre 0 y 6 (recibido ${d})`);
      }
    }
  }

  // En modo strict: verificar x-exampleData y marcadores de prototipo
  if (strict) {
    function checkStrictExamples(schemaNode, dataNode, currentPath = '') {
      if (!schemaNode || !dataNode || typeof schemaNode !== 'object') return;
      if (schemaNode['x-exampleData'] && Array.isArray(schemaNode.examples) && schemaNode.examples.length > 0) {
        const exampleVal = schemaNode.examples[0];
        if (JSON.stringify(dataNode) === JSON.stringify(exampleVal)) {
          errors.push(
            `[strict] ${file} ${currentPath}: valor coincide con datos de ejemplo ('${typeof dataNode === 'string' ? dataNode : JSON.stringify(dataNode)}')`,
          );
        }
      }
      if (schemaNode.type === 'object' && schemaNode.properties && typeof dataNode === 'object') {
        for (const [k, childSchema] of Object.entries(schemaNode.properties)) {
          if (dataNode[k] !== undefined) {
            checkStrictExamples(childSchema, dataNode[k], currentPath ? `${currentPath}.${k}` : k);
          }
        }
      }
    }
    checkStrictExamples(schema, data);

    // Campos técnicos que no se reemplazan por datos del cliente (x-skipMarkers en el esquema), p. ej. `site`.
    const skipMarkerPaths = new Set();
    (function collectSkip(schemaNode, currentPath) {
      if (!schemaNode || typeof schemaNode !== 'object') return;
      if (schemaNode['x-skipMarkers'] && currentPath) skipMarkerPaths.add(currentPath);
      for (const [k, child] of Object.entries(schemaNode.properties || {})) {
        collectSkip(child, currentPath ? `${currentPath}.${k}` : k);
      }
    })(schema, '');

    function checkMarkers(node, currentPath = '') {
      if (!node) return;
      if (skipMarkerPaths.has(currentPath)) return;
      if (typeof node === 'string') {
        const lower = node.toLowerCase();
        for (const marker of markers.strings || []) {
          if (lower.includes(marker.toLowerCase())) {
            errors.push(`[strict] ${file} ${currentPath}: contiene marcador de prototipo '${marker}'`);
          }
        }
      } else if (typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
          checkMarkers(v, currentPath ? `${currentPath}.${k}` : k);
        }
      }
    }
    checkMarkers(data);
  }
}

if (warnings.length > 0) {
  console.warn(`\nAdvertencias de configuración (${warnings.length}):`);
  for (const w of warnings) {
    console.warn(`  ⚠ ${w}`);
  }
}

if (errors.length > 0) {
  console.error(`\nErrores de configuración (${errors.length}):`);
  for (const e of errors) {
    console.error(`  ✖ ${e}`);
  }
  process.exit(1);
}

console.log(`\nConfiguración validada exitosamente (${jsonFiles.length} archivo(s), ${strict ? 'modo strict' : 'modo estándar'}).`);
