#!/usr/bin/env tsx
/**
 * SCRIPT TEMPORAL - Restaurar brand.json desde el commit base 350b98b
 * NO MODIFICAR NINGÚN VALOR, solo aplicar las equivalencias definidas
 */

import fs from 'node:fs';
import path from 'node:path';

// Cargar configuración ORIGINAL del worktree base
const basePath = 'C:/tmp/misty-base';
const originalConfigModule = await import(path.join(basePath, 'src/brand.config.ts'));
const originalBrand = originalConfigModule.brandConfig;
const getOriginalInstagramUrl = originalConfigModule.getInstagramUrl;

// Aplicar mapeos EXACTOS según definición del requerimiento
const newBrand = {
  schemaVersion: 1,
  site: 'misty',
  demo: { showPrototypeBanner: true },

  identity: {
    name: originalBrand.identity.name,
    niche: originalBrand.identity.niche,
  },

  logo: {
    src: originalBrand.identity.logoUrl,
    favicon32: originalBrand.identity.faviconUrl,
    appleTouchIcon: originalBrand.identity.appleTouchIconUrl,
    alt: originalBrand.identity.name,
  },

  seo: structuredClone(originalBrand.seo),
  theme: structuredClone(originalBrand.theme),
  navigation: structuredClone(originalBrand.navigation),
  marquee: structuredClone(originalBrand.marquee),
  hero: structuredClone(originalBrand.hero),
  quickWholesaleBar: structuredClone(originalBrand.quickWholesaleBar),
  essenceSection: structuredClone(originalBrand.essenceSection),
  processSection: structuredClone(originalBrand.processSection),
  contactSection: structuredClone(originalBrand.contactSection),
  wholesaleCallout: structuredClone(originalBrand.wholesaleCallout),
  footer: structuredClone(originalBrand.footer),

  typography: {
    headingFont: originalBrand.typography.headings,
    bodyFont: originalBrand.typography.body,
    stylesheetUrl: originalBrand.typography.stylesheetUrl,
  },

  contact: {
    whatsapp: {
      number: originalBrand.contact.whatsapp.number,
      display: originalBrand.contact.whatsapp.display,
      messages: {
        default: originalBrand.contact.whatsapp.defaultMessage,
        wholesale: originalBrand.contact.whatsapp.wholesaleMessage,
      },
    },
    instagram: {
      handle: originalBrand.contact.instagram.handle,
      url: getOriginalInstagramUrl(),
    },
    email: originalBrand.contact.email.display,
    address: {
      full: originalBrand.contact.showroom.addressDisplay,
      mapsUrl: originalBrand.contact.showroom.googleMapsUrl,
      city: 'Flores, Buenos Aires',
    },
    hours: {
      lines: [
        originalBrand.contact.showroom.hoursWeekdays,
        originalBrand.contact.showroom.hoursSaturdays,
      ],
    },
  },
};

// Eliminar campo que se agrega dinámicamente
delete (newBrand.footer as any).demonstrationDisclaimer;

// Escribir archivo final
const outputPath = path.resolve(import.meta.dirname, '../src/data/brand.json');
fs.writeFileSync(outputPath, JSON.stringify(newBrand, null, 2), 'utf8');

console.log(`✅ brand.json generado correctamente desde commit 350b98b`);
console.log(`   Ruta: ${outputPath}`);
console.log(`   Campos movidos: contact.instagram.badge/description/buttonText y contact.showroom.title/badge/buttonText ya estaban correctamente definidos dentro de contactSection, no se usaban en contacto raíz`);
