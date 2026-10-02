/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { brandConfig, getShowroomAddressText } from '../brand.config';

export const MarqueeBar: React.FC = () => {
  const items = [...(brandConfig.marquee?.items || []), `Showroom: ${getShowroomAddressText()}`];
  if (items.length === 0) return null;

  return (
    <section className="w-full bg-brand-secondary-dark text-white py-4 px-4 sm:px-6 lg:px-8 border-y border-brand-secondary-dark/40 shadow-inner">
      <div className="max-w-[1360px] mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-4 text-xs sm:text-[13px] font-semibold tracking-wide">
          {items.map((item: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-brand-secondary-fixed">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Mobile View: Horizontal Scroll / Ticker */}
        <div className="flex md:hidden overflow-x-auto no-scrollbar gap-8 py-0.5 whitespace-nowrap text-xs font-semibold tracking-wide">
          {items.concat(items).map((item: string, index: number) => (
            <div key={index} className="inline-flex items-center gap-2 shrink-0">
              <span className="text-brand-secondary-fixed">✦</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
