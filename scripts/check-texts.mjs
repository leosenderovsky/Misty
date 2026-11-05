#!/usr/bin/env node
/**
 * Garantiza que TODO texto visible del sitio sea editable desde src/data/brand.json.
 * Renderiza App.tsx en el servidor (sin banner ni leyenda de demostración), extrae el texto visible y los
 * atributos accesibles (aria-label, alt, title, placeholder) y falla si queda algún fragmento que no provenga de brand.json.
 */
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { parse } from '@babel/parser';
import fsSync from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const textConfig = JSON.parse(fsSync.readFileSync(path.join(ROOT, 'scripts/check-texts.config.json'), 'utf8'));
const excludedFiles = new Set(textConfig.excludeFiles ?? []);
const usedByTooling = textConfig.usedByTooling ?? [];
const decode = (t) => t
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const data = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/brand.json'), 'utf8'));
const schema = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/brand.schema.json'), 'utf8'));

const ARRAY_STRING_MEMBERS = new Set([
  'at', 'charAt', 'charCodeAt', 'codePointAt', 'concat', 'copyWithin', 'entries', 'every', 'fill',
  'filter', 'find', 'findIndex', 'findLast', 'findLastIndex', 'flat', 'flatMap', 'forEach',
  'includes', 'indexOf', 'join', 'keys', 'lastIndexOf', 'length', 'localeCompare', 'map',
  'match', 'matchAll', 'normalize', 'padEnd', 'padStart', 'pop', 'push', 'reduce', 'reduceRight',
  'repeat', 'replace', 'replaceAll', 'reverse', 'search', 'shift', 'slice', 'some', 'sort',
  'splice', 'split', 'startsWith', 'substring', 'toLocaleLowerCase', 'toLocaleUpperCase',
  'toLowerCase', 'toString', 'toUpperCase', 'trim', 'trimEnd', 'trimStart', 'unshift', 'values',
]);

const brandReferences = new Set();
const completeObjectReferences = new Map();
const unusedKeyFindings = [];
const resolvePath = (object, fieldPath) => fieldPath.split('.').reduce((value, key) => value?.[key], object);

for (const entry of usedByTooling) {
  if (!entry || typeof entry.path !== 'string' || typeof entry.reason !== 'string' || !entry.reason.trim()) {
    throw new Error('scripts/check-texts.config.json: cada usedByTooling debe tener path y un motivo.');
  }
  if (resolvePath(data, entry.path) === undefined) {
    throw new Error(`scripts/check-texts.config.json: usedByTooling "${entry.path}" no existe en brand.json.`);
  }
}

function normalizeBrandReference(reference) {
  const finalProperty = reference.at(-1);
  return finalProperty && ARRAY_STRING_MEMBERS.has(finalProperty) ? reference.slice(0, -1) : reference;
}

function getBrandReference(node, aliases) {
  if (!node || typeof node !== 'object') return undefined;
  if (node.type === 'Identifier') {
    if (['brandConfig', 'brandJson'].includes(node.name)) return [];
    return aliases.get(node.name);
  }
  if (node.type !== 'MemberExpression' && node.type !== 'OptionalMemberExpression') return undefined;
  const parent = getBrandReference(node.object, aliases);
  if (!parent) return undefined;
  const property = node.computed
    ? node.property?.type === 'StringLiteral' ? node.property.value : undefined
    : node.property?.name;
  return property ? [...parent, property] : parent;
}

function isObjectReference(reference) {
  const value = reference.reduce((current, key) => current?.[key], data);
  return value !== null && typeof value === 'object';
}

function isWholeObjectContext(node, parent, grandParent) {
  if (parent?.type === 'SpreadElement' && parent.argument === node) return true;
  if (parent?.type === 'JSXSpreadAttribute' && parent.argument === node) return true;
  if (parent?.type === 'CallExpression' && parent.arguments.includes(node)) return true;
  return parent?.type === 'JSXExpressionContainer'
    && grandParent?.type === 'JSXAttribute'
    && grandParent.value === parent;
}

function addBrandReference(reference, node, rel, asCompleteObject = false) {
  const fieldPath = reference.join('.');
  brandReferences.add(fieldPath);
  if (asCompleteObject) {
    const key = `${rel}:${node.loc.start.line}:${fieldPath}`;
    completeObjectReferences.set(key, { rel, line: node.loc.start.line, fieldPath: fieldPath || '(raíz brandConfig)' });
  }
}

function bindPattern(pattern, reference, aliases) {
  if (!pattern || !reference) return;
  if (pattern.type === 'Identifier') { aliases.set(pattern.name, reference); return; }
  if (pattern.type === 'AssignmentPattern') { bindPattern(pattern.left, reference, aliases); return; }
  if (pattern.type === 'RestElement') { bindPattern(pattern.argument, reference, aliases); return; }
  if (pattern.type === 'ObjectPattern') {
    for (const property of pattern.properties) {
      if (property.type === 'RestElement') { bindPattern(property.argument, reference, aliases); continue; }
      const key = property.computed
        ? property.key?.type === 'StringLiteral' ? property.key.value : undefined
        : property.key?.name ?? property.key?.value;
      if (key !== undefined) bindPattern(property.value, [...reference, String(key)], aliases);
    }
    return;
  }
  if (pattern.type === 'ArrayPattern') pattern.elements.forEach((element, index) => {
    if (element) bindPattern(element, [...reference, String(index)], aliases);
  });
}

function clearPattern(pattern, aliases) {
  if (!pattern) return;
  if (pattern.type === 'Identifier') { aliases.delete(pattern.name); return; }
  if (pattern.type === 'AssignmentPattern' || pattern.type === 'RestElement') {
    clearPattern(pattern.left ?? pattern.argument, aliases); return;
  }
  if (pattern.type === 'ObjectPattern') pattern.properties.forEach((property) => {
    clearPattern(property.type === 'RestElement' ? property.argument : property.value, aliases);
  });
  if (pattern.type === 'ArrayPattern') pattern.elements.forEach((element) => clearPattern(element, aliases));
}

function collectBrandReferences(root, rel) {
  function visit(node, parent, grandParent, aliases) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'VariableDeclarator') {
      clearPattern(node.id, aliases);
      const reference = getBrandReference(node.init, aliases);
      if (reference !== undefined) bindPattern(node.id, normalizeBrandReference(reference), aliases);
      else visit(node.init, node, parent, aliases);
      return;
    }
    if (node.type === 'MemberExpression' || node.type === 'OptionalMemberExpression') {
      if ((parent?.type === 'MemberExpression' || parent?.type === 'OptionalMemberExpression') && parent.object === node) return;
      const reference = getBrandReference(node, aliases);
      if (reference !== undefined) {
        const normalized = normalizeBrandReference(reference);
        addBrandReference(normalized, node, rel, isWholeObjectContext(node, parent, grandParent) && isObjectReference(normalized));
        return;
      }
    } else if (node.type === 'Identifier') {
      const reference = getBrandReference(node, aliases);
      if (reference !== undefined && !((parent?.type === 'MemberExpression' || parent?.type === 'OptionalMemberExpression') && parent.property === node && !parent.computed)) {
        const complete = isWholeObjectContext(node, parent, grandParent) && isObjectReference(reference);
        if (!['brandConfig', 'brandJson'].includes(node.name) || complete) addBrandReference(reference, node, rel, complete);
        return;
      }
    }
    if (node.type === 'Program' || node.type === 'BlockStatement' || node.type === 'FunctionDeclaration'
      || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression' || node.type === 'CatchClause') aliases = new Map(aliases);
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') {
      clearPattern(node.id, aliases); node.params.forEach((parameter) => clearPattern(parameter, aliases));
    }
    if (node.type === 'CatchClause') clearPattern(node.param, aliases);
    for (const [key, value] of Object.entries(node)) {
      if (['loc', 'leadingComments', 'trailingComments'].includes(key)) continue;
      if (Array.isArray(value)) value.forEach((child) => visit(child, node, parent, aliases));
      else if (value && typeof value === 'object') visit(value, node, parent, aliases);
    }
  }
  visit(root, null, null, new Map());
}

function collectTextFields(schemaNode, dataNode, fieldPath = '', inheritedWidget = '') {
  if (schemaNode?.$ref?.startsWith('#/definitions/')) schemaNode = schema.definitions[schemaNode.$ref.slice('#/definitions/'.length)];
  if (!schemaNode || dataNode === undefined || dataNode === null || schemaNode['x-skipMarkers']) return;
  const widget = schemaNode['x-widget'] ?? inheritedWidget;
  if (schemaNode.type === 'object' && typeof dataNode === 'object' && !Array.isArray(dataNode)) {
    for (const [key, childData] of Object.entries(dataNode)) collectTextFields(schemaNode.properties?.[key], childData, fieldPath ? `${fieldPath}.${key}` : key);
    return;
  }
  if (schemaNode.type === 'array' && Array.isArray(dataNode)) {
    dataNode.forEach((item, index) => collectTextFields(schemaNode.items, item, `${fieldPath}[${index}]`, widget));
    return;
  }
  if (typeof dataNode !== 'string' || !['text', 'textarea', 'whatsapp', 'list'].includes(widget)) return;
  const coversPath = (references) => [...references].some((reference) => !reference || fieldPath === reference || fieldPath.startsWith(`${reference}.`) || fieldPath.startsWith(`${reference}[`));
  if (!coversPath(brandReferences) && !coversPath(new Set(usedByTooling.map((entry) => entry.path)))) unusedKeyFindings.push(fieldPath);
}

function reportUnschematizedText(schemaNode, dataNode, fieldPath = '') {
  if (schemaNode?.$ref?.startsWith('#/definitions/')) schemaNode = schema.definitions[schemaNode.$ref.slice('#/definitions/'.length)];
  if (dataNode === null || dataNode === undefined) return;
  if (Array.isArray(dataNode)) {
    dataNode.forEach((item, index) => reportUnschematizedText(schemaNode?.items, item, `${fieldPath}[${index}]`));
    return;
  }
  if (typeof dataNode === 'object') {
    for (const [key, value] of Object.entries(dataNode)) {
      reportUnschematizedText(schemaNode?.properties?.[key], value, fieldPath ? `${fieldPath}.${key}` : key);
    }
    return;
  }
  if (typeof dataNode === 'string' && !schemaNode) unusedKeyFindings.push(`${fieldPath} (clave sin esquema)`);
}

function runBrandReferenceCheck() {
  const files = [];
  (function walk(directory) {
    for (const entry of fsSync.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(file); else if (/\.(tsx?|jsx?)$/.test(entry.name)) files.push(file);
    }
  })(path.join(ROOT, 'src'));
  for (const file of files) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/');
    if (excludedFiles.has(rel)) continue;
    const ast = parse(fsSync.readFileSync(file, 'utf8'), { sourceType: 'module', plugins: ['typescript', 'jsx'] });
    collectBrandReferences(ast.program, rel);
  }
  collectTextFields(schema, data);
  reportUnschematizedText(schema, data);
  console.log(`check:texts - ${files.length - [...excludedFiles].filter((file) => file.startsWith('src/')).length} archivos AST revisados`);
  if (completeObjectReferences.size) {
    console.log('Referencias a objeto completo (revisar):');
    for (const reference of completeObjectReferences.values()) console.log(`  ${reference.rel}:${reference.line} [referencia a objeto completo] "${reference.fieldPath}"`);
  }
  if (unusedKeyFindings.length) {
    console.error('Claves sin uso agrupadas por ruta:');
    const grouped = new Map();
    for (const fieldPath of unusedKeyFindings) {
      const [route, ...rest] = fieldPath.split('.');
      if (!grouped.has(route)) grouped.set(route, []);
      grouped.get(route).push(rest.join('.') || '(raíz)');
    }
    for (const [route, keys] of grouped) console.error(`  ${route}: ${keys.join(', ')}`);
    exitCode = 1;
  }
}

const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
let exitCode = 0;
try {
  const config = await server.ssrLoadModule('/src/brand.config.ts');
  // El banner y la leyenda de demostración se borran al entregar el sitio: no se evalúan acá.
  config.brandConfig.demo.showPrototypeBanner = false;
  config.brandConfig.footer.demonstrationDisclaimer = '';
  const app = await server.ssrLoadModule('/src/App.tsx');
  const html = renderToString(React.createElement(app.default)).replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '');

  const visible = new Set();
  for (const m of html.matchAll(/>([^<>]+)</g)) { const t = decode(m[1]).replace(/\s+/g, ' ').trim(); if (t) visible.add(`texto|${t}`); }
  for (const m of html.matchAll(/\b(aria-label|alt|title|placeholder)="([^"]*)"/g)) { const t = decode(m[2]).replace(/\s+/g, ' ').trim(); if (t) visible.add(`${m[1]}|${t}`); }

  // Textos conocidos: todas las cadenas de brand.json (con sus marcadores {name} y {address} resueltos) y los textos derivados.
  const known = new Set();
  const name = data.identity?.name ?? '';
  const address = config.getShowroomAddressText?.() ?? '';
  const addKnown = (v) => {
    const s = String(v).trim();
    if (!s || /^(\/|https?:|#[0-9a-f]{3,8}$)/i.test(s)) return;
    known.add(s);
    if (s.includes('{')) known.add(s.replaceAll('{name}', name).replaceAll('{address}', address));
  };
  (function walk(o) { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === 'object') Object.values(o).forEach(walk); else if (typeof o === 'string') addKnown(o); })(data);
  addKnown(address);
  (config.getShowroomHoursText?.() ?? []).forEach(addKnown);
  const knownSorted = [...known].sort((a, b) => b.length - a.length);

  const findings = [];
  for (const entry of visible) {
    const [kind, text] = entry.split('|');
    let rest = text;
    for (const k of knownSorted) if (k.length >= 2 && rest.includes(k)) rest = rest.split(k).join(' ');
    rest = rest.replace(/[\d\s:.,;·|&()¿?¡!/\-—–✦+@#%'"“”]+/g, ' ').trim();
    if (/[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]{3,}/.test(rest)) findings.push({ kind, text, rest });
  }
  console.log(`check:texts - ${visible.size} textos visibles revisados`);
  if (findings.length) {
    findings.forEach((f) => console.error(`  ERROR [${f.kind}] "${f.text.slice(0, 90)}" contiene texto que no sale de brand.json: "${f.rest.slice(0, 60)}"`));
    console.error(`\n${findings.length} texto(s) escrito(s) en el código. Movelos a src/data/brand.json (y al esquema) para que sean editables.`);
    exitCode = 1;
  } else console.log('Todos los textos visibles salen de brand.json.');
} catch (error) {
  console.error(`check:texts ERROR - ${error?.message}`);
  exitCode = 1;
}
runBrandReferenceCheck();
await server.close();
process.exit(exitCode);
