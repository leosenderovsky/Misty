/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * BRAND CONFIGURATION WRAPPER
 * 
 * Este archivo es un envoltorio limpio sobre los datos JSON en src/data/brand.json
 * Solo agrega campos dinámicos que no pueden vivir en JSON.
 * SIN mapeos de compatibilidad, SIN valores escritos a mano.
 */

import { getDemoLegend } from './demoBanner.config.ts';
import rawBrandData from './data/brand.json' with { type: 'json' };
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

// Configuración final exportada con campos dinámicos
export const brandConfig: BrandConfig = {
  ...rawBrandData,
  footer: {
    ...rawBrandData.footer,
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

