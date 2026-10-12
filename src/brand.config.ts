/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Envoltorio de la configuración: los datos editables viven en src/data/brand.json.
 * Los componentes siguen importando brandConfig desde este archivo.
 */

import brandJson from './data/brand.json' with { type: 'json' };
import { getDemoLegend } from './demoBanner.config.ts';
import type { BrandConfig } from './generated/brand.types.ts';

export type { BrandConfig };

export const brandConfig: BrandConfig = {
  ...(brandJson as BrandConfig),
  footer: {
    ...brandJson.footer,
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

  const parts = [getShowroomAddressText(), brandConfig.contact.address.city].filter(Boolean);
  return `https://maps.google.com/?q=${encodeURIComponent(parts.join(', '))}`;
}

export function getShowroomHoursText(): string[] {
  return brandConfig.contact.hours.lines;
}

export function getWhatsAppUrl(customMessage?: string): string {
  const cleanNumber = brandConfig.contact.whatsapp.number.replace(/\D/g, '');
  const message = customMessage ?? brandConfig.contact.whatsapp.messages.default;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
