/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Store, Download } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';

export const QuickWholesaleStrip: React.FC = () => {
  const waWholesaleUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.wholesaleMessage);

  return (
    <section className="w-full bg-[#e8f1f5] py-6 px-4 sm:px-6 lg:px-8 border-y border-[#d5e3e8]/60">
      <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Information */}
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <span className="p-2.5 rounded-full bg-[#d2ecf4] text-[#144f5c] flex items-center justify-center shrink-0">
            <Store className="w-5 h-5" />
          </span>
          <div>
            <p className="text-base sm:text-lg font-semibold text-[#16272e]">
              {brandConfig.quickWholesaleBar.title}
            </p>
            <p className="text-xs sm:text-sm text-[#3e5258]">
              {brandConfig.quickWholesaleBar.subtitle}
            </p>
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="flex items-center shrink-0">
          <a
            href={waWholesaleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2b6473] text-white hover:bg-[#468a9b] transition-colors text-xs sm:text-sm font-semibold shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{brandConfig.quickWholesaleBar.buttonText}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
