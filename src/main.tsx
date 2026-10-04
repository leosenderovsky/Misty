import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { brandConfig } from './brand.config';

const root = document.documentElement;

for (const [name, value] of Object.entries(brandConfig.theme)) {
  const cssName = name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
  root.style.setProperty(`--brand-${cssName}`, value);
}

root.style.setProperty('--brand-font-headings', brandConfig.typography.headings);
root.style.setProperty('--brand-font-body', brandConfig.typography.body);

const fontStylesheet = document.head.querySelector<HTMLLinkElement>('link[data-brand-fonts]');
if (!fontStylesheet) {
  throw new Error('Missing brand font stylesheet link');
}
fontStylesheet.href = brandConfig.typography.stylesheetUrl;

const siteUrl = import.meta.env.VITE_SITE_URL?.trim() || window.location.origin;
const canonicalUrl = new URL(window.location.pathname, siteUrl).href;
const socialImageMeta = document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]');
if (!socialImageMeta) {
  throw new Error('Missing metadata element: meta[property="og:image"]');
}
const socialImageUrl = new URL(socialImageMeta.content, siteUrl).href;
const pageTitle = `${brandConfig.identity.name} — ${brandConfig.seo.titleSuffix}`;

document.title = pageTitle;

function setMetaContent(selector: string, content: string): void {
  const meta = document.head.querySelector<HTMLMetaElement>(selector);
  if (!meta) {
    throw new Error(`Missing metadata element: ${selector}`);
  }
  meta.content = content;
}

setMetaContent('meta[name="description"]', brandConfig.seo.description);
setMetaContent('meta[property="og:title"]', pageTitle);
setMetaContent('meta[property="og:description"]', brandConfig.seo.description);
setMetaContent('meta[property="og:image"]', socialImageUrl);
setMetaContent('meta[property="og:url"]', canonicalUrl);
setMetaContent('meta[name="twitter:image"]', socialImageUrl);

const favicon = document.head.querySelector<HTMLLinkElement>('link[rel="icon"]');
const appleTouchIcon = document.head.querySelector<HTMLLinkElement>('link[rel="apple-touch-icon"]');
const canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

if (!favicon || !appleTouchIcon || !canonicalLink) {
  throw new Error('Missing favicon or canonical link element');
}

favicon.href = new URL(brandConfig.identity.faviconUrl, siteUrl).href;
appleTouchIcon.href = new URL(brandConfig.identity.appleTouchIconUrl, siteUrl).href;
canonicalLink.href = canonicalUrl;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
