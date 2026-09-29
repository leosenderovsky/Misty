/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Palette, Sparkles, Users } from 'lucide-react';
import { brandConfig } from '../brand.config';

export const AboutManifesto: React.FC = () => {
  const [look1Error, setLook1Error] = useState(false);
  const [look2Error, setLook2Error] = useState(false);

  const look1Src = !look1Error
    ? brandConfig.essenceSection.look1.src
    : brandConfig.essenceSection.look1.fallback || brandConfig.essenceSection.look1.src;

  const look2Src = !look2Error
    ? brandConfig.essenceSection.look2.src
    : brandConfig.essenceSection.look2.fallback || brandConfig.essenceSection.look2.src;

  return (
    <section id="nosotros" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#f4f8fa] scroll-mt-20">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-start max-w-2xl mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#468a9b]" />
            <span className="text-[11px] uppercase tracking-wider text-[#468a9b] font-bold">
              {brandConfig.essenceSection.eyebrow}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] lg:leading-[48px] text-[#16272e] tracking-tight leading-tight font-semibold">
            {brandConfig.essenceSection.title}
          </h2>

          <p className="text-base sm:text-lg text-[#3e5258] mt-4 leading-relaxed font-normal">
            {brandConfig.essenceSection.description}
          </p>
        </div>

        {/* Bento / Diptych Grid (12 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Editorial Image 1 (Look 01 - 4 cols) */}
          <div className="lg:col-span-4 relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] bg-[#dfecef] border border-[#d5e3e8]">
              <img
                src={look1Src}
                alt={brandConfig.essenceSection.look1.alt}
                onError={() => setLook1Error(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-[#d5e3e8]">
                <span className="text-[11px] uppercase text-[#468a9b] font-bold tracking-wider block">
                  {brandConfig.essenceSection.look1.badgeCategory}
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#16272e] mt-0.5">
                  {brandConfig.essenceSection.look1.badgeTitle}
                </p>
              </div>
            </div>
          </div>

          {/* Pillars in the Center (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {brandConfig.essenceSection.pillars.map((pillar) => {
              let IconComp = Palette;
              let iconBg = 'bg-[#d2ecf4] text-[#144f5c]';

              if (pillar.iconType === 'precision') {
                IconComp = Sparkles;
                iconBg = 'bg-[#b4ebfd] text-[#2b6473]';
              } else if (pillar.iconType === 'groups') {
                IconComp = Users;
                iconBg = 'bg-[#e8f1f5] text-[#468a9b]';
              }

              return (
                <div
                  key={pillar.id}
                  className="p-6 rounded-2xl bg-white border border-[#d5e3e8]/70 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shrink-0`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-semibold text-[#16272e] mb-1">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#3e5258] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Editorial Image 2 (Look 02 - 3 cols) */}
          <div className="lg:col-span-3 relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-[3/4] bg-[#dfecef] border border-[#d5e3e8]">
              <img
                src={look2Src}
                alt={brandConfig.essenceSection.look2.alt}
                onError={() => setLook2Error(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 backdrop-blur-md shadow-sm border border-[#d5e3e8]">
                <span className="text-[11px] uppercase text-[#468a9b] font-bold tracking-wider block">
                  {brandConfig.essenceSection.look2.badgeCategory}
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#16272e] mt-0.5">
                  {brandConfig.essenceSection.look2.badgeTitle}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
