/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Send } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';

export const WholesaleBanner: React.FC = () => {
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.wholesaleMessage);

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-brand-surface">
      <div className="max-w-[1360px] mx-auto">
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-brand-primary text-white shadow-xl relative overflow-hidden">
          
          {/* Subtle artistic backdrop glow */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-secondary-dark/60 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] uppercase tracking-wider mb-4 font-bold border border-white/20">
                {brandConfig.wholesaleCallout.badge}
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                {brandConfig.wholesaleCallout.title}
              </h3>
              
              <p className="text-sm sm:text-base text-brand-secondary-container mt-3 leading-relaxed">
                {brandConfig.wholesaleCallout.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-surface-bright text-brand-primary text-base font-semibold shadow-lg hover:bg-brand-surface-container-low transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <Send className="w-5 h-5 text-brand-secondary-dark" />
                <span>{brandConfig.wholesaleCallout.buttonText}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
