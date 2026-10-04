import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { brandConfig } from './src/brand.config.ts';

function brandMetadataPlugin(siteUrl: string, socialImage: string): Plugin {
  const canonicalUrl = siteUrl ? new URL('/', siteUrl).href : '/';
  const title = `${brandConfig.identity.name} — ${brandConfig.seo.titleSuffix}`;
  const replacements: Record<string, string> = {
    __BRAND_TITLE__: title,
    __BRAND_DESCRIPTION__: brandConfig.seo.description,
    __BRAND_IMAGE__: siteUrl
      ? new URL(socialImage, siteUrl).href
      : socialImage,
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
  const siteUrl = env.VITE_SITE_URL?.trim()
    || process.env.DEPLOY_PRIME_URL?.trim()
    || process.env.URL?.trim()
    || '';
  const configuredSocialImage = brandConfig.seo.socialImage;
  const socialImage = existsSync(path.resolve(process.cwd(), 'public', configuredSocialImage.slice(1)))
    ? configuredSocialImage
    : brandConfig.hero.backgroundImage.src;

  if (socialImage !== configuredSocialImage) {
    console.warn(
      `[brand-metadata] Social image "${configuredSocialImage}" was not found; using "${socialImage}" instead.`,
    );
  }

  return {
    plugins: [react(), tailwindcss(), brandMetadataPlugin(siteUrl, socialImage)],
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    },
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
