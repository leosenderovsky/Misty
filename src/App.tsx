/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// DEMO ONLY — borrar este import y esta línea, más PrototypeBanner.tsx
// y demoBanner.config.ts, para pasar este proyecto a un cliente real
import { PrototypeBanner } from './components/PrototypeBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickWholesaleStrip } from './components/QuickWholesaleStrip';
import { AboutManifesto } from './components/AboutManifesto';
import { ProcessSection } from './components/ProcessSection';
import { ContactLocation } from './components/ContactLocation';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-brand-on-surface selection:bg-brand-secondary-fixed selection:text-brand-on-surface">
      <PrototypeBanner />
      {/* 1. Header Minimalista & Chic con Marca y CTA */}
      <Header />

      {/* Main Content Flow */}
      <main className="flex-1 w-full">
        {/* 2. Hero Section: Editorial Lookbook Full Background con Scrim & Trust Badges */}
        <Hero />

        {/* 3. Quick Wholesale / Retail Callout Bar */}
        <QuickWholesaleStrip />

        {/* 4. Nuestra Esencia: Look 01, Pilares Editoriales y Look 02 */}
        <AboutManifesto />

        {/* 5. Experiencia Ágil: Proceso Simple en 3 Pasos */}
        <ProcessSection />

        {/* 6. Canales de Atención, Showroom con Mapa & Callout para Emprendedoras */}
        <ContactLocation />
      </main>

      {/* 7. Footer Institucional */}
      <Footer />

      {/* 8. Botón Flotante Directo de WhatsApp */}
      <WhatsAppFloatingButton />
    </div>
  );
}
