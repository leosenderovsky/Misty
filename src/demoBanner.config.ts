// DEMO ONLY. Al entregar el sitio a un cliente real: borrar este archivo, PrototypeBanner.tsx y su import en App.tsx (marcado DEMO ONLY).

const DEFAULT_DEMO_BRAND_NAME = 'Tienda ON!';
// TODO: Actualizar URL cuando el sitio oficial de Tienda ON! se encuentre disponible
const DEFAULT_DEMO_BRAND_URL = '';

export const demoBannerConfig = {
  companyName: (import.meta.env?.VITE_DEMO_BRAND_NAME ?? DEFAULT_DEMO_BRAND_NAME).trim(),
  link: (import.meta.env?.VITE_DEMO_BRAND_URL ?? DEFAULT_DEMO_BRAND_URL).trim(),
};

export function getDemoLegend(): string {
  const base = 'Marca, productos y precios de ejemplo — prototipo de demostración';
  const companyName = demoBannerConfig.companyName;
  return companyName && companyName !== DEFAULT_DEMO_BRAND_NAME ? `${base} de ${companyName}` : base;
}

if (import.meta.env?.DEV && demoBannerConfig.link === DEFAULT_DEMO_BRAND_URL) {
  console.info('Banner DEMO: definí VITE_DEMO_BRAND_URL cuando el sitio oficial de Tienda ON! esté publicado.');
}

export function getValidDemoBannerLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}