#!/usr/bin/env node
/**
 * Garantiza que TODO texto visible del sitio sea editable desde src/data/brand.json.
 * Renderiza App.tsx en el servidor (sin banner ni leyenda de demostración), extrae el texto visible y los
 * atributos accesibles (aria-label, alt, title, placeholder) y falla si queda algún fragmento que no provenga de brand.json.
 */
import { createServer } from 'vite';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const decode = (t) => t
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#x27;|&#39;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const data = JSON.parse(await fs.readFile(path.join(ROOT, 'src/data/brand.json'), 'utf8'));
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
await server.close();
process.exit(exitCode);
