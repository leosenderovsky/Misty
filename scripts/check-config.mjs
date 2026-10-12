import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const dataDir = path.join(projectRoot, 'src/data');
const publicDir = path.join(projectRoot, 'public');
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

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const markersRaw = await readFile(path.join(dataDir, 'prototype-markers.json'), 'utf8');
const markers = JSON.parse(markersRaw);

const files = await readdir(dataDir);
const jsonFiles = files.filter((f) => f.endsWith('.json') && !f.endsWith('.schema.json') && f !== 'prototype-markers.json');

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

  // Verificar imágenes referenciadas en public/
  async function checkImages(node, currentPath = '') {
    if (!node || typeof node !== 'object') return;
    for (const [key, value] of Object.entries(node)) {
      const fieldPath = currentPath ? `${currentPath}.${key}` : key;
      if (typeof value === 'string' && (value.startsWith('/assets/') || /\.(png|jpe?g|svg|webp|avif)$/i.test(value))) {
        const publicPath = path.join(publicDir, value.startsWith('/') ? value.slice(1) : value);
        try {
          await stat(publicPath);
        } catch {
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

    function checkMarkers(node, currentPath = '') {
      if (!node) return;
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
