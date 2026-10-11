/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRAND CONFIGURATION WRAPPER
 * 
 * Este archivo es un envoltorio sobre los datos JSON en src/data/brand.json
 * Mantiene la interfaz original para compatibilidad con todos los componentes existentes
 * Agrega campos y funciones auxiliares que no pueden vivir en JSON
 */

import { getDemoLegend } from './demoBanner.config.ts';
import rawBrandData from './data/brand.json';
import type { BrandConfig } from './generated/brand.types.ts';

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  fallback?: string;
  badgeCategory?: string;
  badgeTitle?: string;
}

// Datos base cargados desde JSON + campos virtuales
const baseConfig = rawBrandData as unknown as BrandConfig;

// Configuración final exportada con campos dinámicos
export const brandConfig: BrandConfig = {
  ...baseConfig,

  // Campos para compatibilidad con API antigua - mapeo
  identity: {
    ...baseConfig.identity,
    logoUrl: baseConfig.logo.src,
    faviconUrl: baseConfig.logo.favicon32,
    appleTouchIconUrl: baseConfig.logo.appleTouchIcon,
    iconCrop: baseConfig.logo.iconCrop,
  },

  contact: {
    ...baseConfig.contact,
    whatsapp: {
      ...baseConfig.contact.whatsapp,
      defaultMessage: baseConfig.contact.whatsapp.messages.default,
      wholesaleMessage: baseConfig.contact.whatsapp.messages.wholesale,
    },
    instagram: {
      ...baseConfig.contact.instagram,
    },
    email: {
      display: baseConfig.contact.email,
    },
    showroom: {
      title: baseConfig.contactSection.showroomCard.title,
      badge: 'Flores, Buenos Aires',
      addressDisplay: baseConfig.contact.address.full,
      hoursWeekdays: baseConfig.contact.hours.lines[0],
      hoursSaturdays: baseConfig.contact.hours.lines[1],
      googleMapsUrl: baseConfig.contact.address.mapsUrl,
      buttonText: baseConfig.contactSection.mapCallout.buttonText,
    },
  },

  typography: {
    ...baseConfig.typography,
    headings: baseConfig.typography.headingFont,
    body: baseConfig.typography.bodyFont,
  },

  footer: {
    ...baseConfig.footer,
    demonstrationDisclaimer: getDemoLegend(),
  },
};

export function getInstagramUrl(): string {
  return brandConfig.contact.instagram.url;
}

export function getShowroomAddressText(): string {
  return brandConfig.contact.address.full;
}

export function getShowroomMapsUrl(): string {
  if (brandConfig.contact.address.mapsUrl) {
    return brandConfig.contact.address.mapsUrl;
  }
  const address = `${getShowroomAddressText()}, ${brandConfig.contact.address.city}`;
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`;
}

export function getShowroomHoursText(): string[] {
  return brandConfig.contact.hours.lines;
}

/**
 * Función auxiliar para generar el enlace dinámico a WhatsApp
 * a partir de la configuración centralizada.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = brandConfig.contact.whatsapp.number.replace(/\D/g, "");
  const message = customMessage ?? brandConfig.contact.whatsapp.messages.default;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

