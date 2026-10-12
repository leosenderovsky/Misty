// DEMO ONLY. Al entregar el sitio a un cliente real: borrar este archivo, PrototypeBanner.tsx y su import en App.tsx (marcado DEMO ONLY).
// Marca de estos sitios: Tienda ON! (https://tiendaon.com.ar todavía no existe).
const DEFAULT_DEMO_BRAND_NAME = 'Tienda ON!';
const DEFAULT_DEMO_BRAND_URL = ''; // vacía mientras https://tiendaon.com.ar no exista

export const demoBannerConfig = {
  companyName: (import.meta.env?.VITE_DEMO_BRAND_NAME ?? DEFAULT_DEMO_BRAND_NAME).trim(),
  link: (import.meta.env?.VITE_DEMO_BRAND_URL ?? DEFAULT_DEMO_BRAND_URL).trim(),
};

export function getDemoLegend(): string {
  const base = 'Marca, productos y precios de ejemplo — prototipo de demostración';
  const companyName = demoBannerConfig.companyName;
  return companyName && companyName !== '[EMPRESA]' ? `${base} de ${companyName}` : base;
}

if (import.meta.env?.DEV && (!demoBannerConfig.companyName || demoBannerConfig.companyName === '[EMPRESA]')) {
  console.info('Banner DEMO: definí VITE_DEMO_BRAND_NAME (por defecto Tienda ON!) y VITE_DEMO_BRAND_URL cuando exista el sitio.');
}

export function getValidDemoBannerLink(link: string): string | null {
  try {
    const url = new URL(link);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}
