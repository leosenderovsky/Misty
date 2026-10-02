import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { brandConfig } from './src/brand.config.ts';

function brandMetadataPlugin(siteUrl: string): Plugin {
  const canonicalUrl = siteUrl ? new URL('/', siteUrl).href : '/';
  const title = `${brandConfig.identity.name} — ${brandConfig.seo.titleSuffix}`;
  const replacements: Record<string, string> = {
    __BRAND_TITLE__: title,
    __BRAND_DESCRIPTION__: brandConfig.seo.description,
    __BRAND_IMAGE__: siteUrl
      ? new URL(brandConfig.hero.backgroundImage.src, siteUrl).href
      : brandConfig.hero.backgroundImage.src,
    __BRAND_CANONICAL__: canonicalUrl,
    __BRAND_FAVICON_32__: brandConfig.identity.faviconUrl,
    __BRAND_APPLE_ICON__: brandConfig.identity.appleTouchIconUrl,
    __BRAND_FONT_STYLESHEET__: brandConfig.typography.stylesheetUrl,
  };

  return {
    name: 'brand-metadata',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [placeholder, value]) => result.replaceAll(placeholder, value),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(env.VITE_SITE_URL?.trim() ?? '')],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
