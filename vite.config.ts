import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { brandConfig } from './src/brand.config.ts';

type SiteUrlSource = 'VITE_SITE_URL' | 'URL' | 'DEPLOY_PRIME_URL' | 'none';

interface SiteUrlEnvironment {
  VITE_SITE_URL?: string;
  CONTEXT?: string;
  URL?: string;
  DEPLOY_PRIME_URL?: string;
}

interface SiteUrlResolution {
  url: string;
  source: SiteUrlSource;
}

interface BuildInfo {
  commit: string;
  commitShort: string;
  branch: string;
  context: string;
  deployId: string | null;
  builtAt: string;
  siteUrl: string;
  siteUrlSource: SiteUrlSource;
  env: {
    VITE_SITE_URL: boolean;
    VITE_DEMO_BRAND_NAME: boolean;
    VITE_DEMO_BRAND_URL: boolean;
  };
}

function resolveSiteUrl(env: SiteUrlEnvironment): SiteUrlResolution {
  const viteSiteUrl = env.VITE_SITE_URL?.trim();
  const netlifyUrl = env.URL?.trim();
  const deployPrimeUrl = env.DEPLOY_PRIME_URL?.trim();

  let url = '';
  let source: SiteUrlSource = 'none';

  if (viteSiteUrl) {
    url = viteSiteUrl;
    source = 'VITE_SITE_URL';
  } else if (env.CONTEXT === 'production' && netlifyUrl) {
    url = netlifyUrl;
    source = 'URL';
  } else if (env.CONTEXT !== 'production' && deployPrimeUrl) {
    url = deployPrimeUrl;
    source = 'DEPLOY_PRIME_URL';
  } else if (netlifyUrl) {
    url = netlifyUrl;
    source = 'URL';
  } else if (deployPrimeUrl) {
    url = deployPrimeUrl;
    source = 'DEPLOY_PRIME_URL';
  }

  if (url) new URL(url);
  return { url, source };
}

function getGitValue(args: string[]): string | undefined {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim() || undefined;
  } catch {
    return undefined;
  }
}

function buildInfoPlugin(info: BuildInfo): Plugin {
  return {
    name: 'build-info',
    apply: 'build',
    buildStart() {
      console.info(
        `[build-info] commit=${info.commit} context=${info.context} siteUrl=${info.siteUrl || '(none)'} source=${info.siteUrlSource}`,
      );
      if (!info.env.VITE_SITE_URL) {
        console.warn(
          'VITE_SITE_URL no definida: se usa la URL de Netlify; definila al conectar un dominio propio',
        );
      }
      if (info.siteUrlSource === 'none') {
        console.warn('sin URL pública: og:image y canonical saldrán relativos');
      }
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'build-info.json',
        source: JSON.stringify(info, null, 2),
      });
    },
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: {
          name: 'build-commit',
          content: info.commitShort,
        },
        injectTo: 'head',
      }];
    },
  };
}

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
  const siteUrlResolution = resolveSiteUrl({ ...process.env, ...env });
  const { url: siteUrl } = siteUrlResolution;
  const configuredSocialImage = brandConfig.seo.socialImage;
  const socialImage = existsSync(path.resolve(process.cwd(), 'public', configuredSocialImage.slice(1)))
    ? configuredSocialImage
    : brandConfig.hero.backgroundImage.src;
  const commit = process.env.COMMIT_REF || getGitValue(['rev-parse', 'HEAD']) || 'unknown';
  const branch = process.env.BRANCH || getGitValue(['rev-parse', '--abbrev-ref', 'HEAD']) || 'unknown';
  const buildInfo: BuildInfo = {
    commit,
    commitShort: commit.slice(0, 7),
    branch,
    context: process.env.CONTEXT || 'local',
    deployId: process.env.DEPLOY_ID || null,
    builtAt: new Date().toISOString(),
    siteUrl,
    siteUrlSource: siteUrlResolution.source,
    env: {
      VITE_SITE_URL: Boolean(env.VITE_SITE_URL?.trim()),
      VITE_DEMO_BRAND_NAME: Boolean(env.VITE_DEMO_BRAND_NAME?.trim()),
      VITE_DEMO_BRAND_URL: Boolean(env.VITE_DEMO_BRAND_URL?.trim()),
    },
  };

  if (socialImage !== configuredSocialImage) {
    console.warn(
      `[brand-metadata] Social image "${configuredSocialImage}" was not found; using "${socialImage}" instead.`,
    );
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      brandMetadataPlugin(siteUrl, socialImage),
      buildInfoPlugin(buildInfo),
    ],
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
