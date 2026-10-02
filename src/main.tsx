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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
