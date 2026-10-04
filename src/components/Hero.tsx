/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, ArrowDown, Headphones, Truck, CheckCircle2 } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';

export const Hero: React.FC = () => {
  const [bgError, setBgError] = useState(false);
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);

  const bgSrc = bgError && brandConfig.hero.backgroundImage.fallback
    ? brandConfig.hero.backgroundImage.fallback
    : brandConfig.hero.backgroundImage.src;

  return (
    <section className="relative w-full min-h-[94vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-brand-surface-dim">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url('${bgSrc}')` }}
      >
        {/* Hidden img tag to catch error if url fails to load */}
        <img
          src={brandConfig.hero.backgroundImage.src}
          alt={brandConfig.hero.backgroundImage.alt}
          onError={() => setBgError(true)}
          className="hidden"
          width={brandConfig.hero.backgroundImage.width}
          height={brandConfig.hero.backgroundImage.height}
        />
      </div>

      {/* Editorial Scrim Gradients for Flawless Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-on-surface/90 via-brand-on-surface/60 to-brand-on-surface/45" />
      <div className="absolute inset-0 bg-brand-primary/15 mix-blend-multiply pointer-events-none" />

      {/* Content Box */}
      <div className="relative z-10 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-6 sm:mt-10">
        
        {/* Badge with pulse dot */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-surface-bright/95 backdrop-blur-md shadow-md text-brand-on-surface mb-6 border border-white/40">
          <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
          <span className="text-[11px] uppercase tracking-wider text-brand-primary font-bold">
            {brandConfig.hero.eyebrowBadge}
          </span>
        </div>

        {/* Main Headline (Playfair Display) */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-[56px] lg:leading-[64px] text-white max-w-4xl tracking-tight leading-tight mb-6 font-semibold">
          {brandConfig.hero.headline}
        </h1>

        {/* Positioning Subheadline */}
        <p className="text-base sm:text-lg text-slate-100 max-w-2xl font-normal leading-relaxed mb-10">
          {brandConfig.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-primary text-white text-base sm:text-lg font-semibold shadow-xl hover:bg-brand-primary-hover transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            <MessageCircle className="w-5 h-5 shrink-0" />
            <span>{brandConfig.hero.primaryCta.label}</span>
          </a>

          <a
            href={`#${brandConfig.hero.secondaryCta.targetSectionId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/20 hover:bg-brand-surface-bright text-white hover:text-brand-on-surface backdrop-blur-md border border-white/30 transition-all text-base sm:text-lg font-semibold"
          >
            <span>{brandConfig.hero.secondaryCta.label}</span>
            <ArrowDown className="w-5 h-5 shrink-0" />
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-sm border border-white/20">
          {brandConfig.hero.trustBadges.map((badge) => {
            let IconComp = Headphones;
            if (badge.iconType === 'shipping') IconComp = Truck;
            if (badge.iconType === 'check') IconComp = CheckCircle2;

            return (
              <div key={badge.id} className="flex items-center justify-center gap-3 text-white">
                <IconComp className="w-6 h-6 text-brand-secondary-fixed shrink-0" />
                <span className="text-sm sm:text-base font-medium text-left">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
