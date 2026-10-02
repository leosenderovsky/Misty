/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, MessagesSquare, CheckCheck } from 'lucide-react';
import { brandConfig } from '../brand.config';

export const ProcessSection: React.FC = () => {
  return (
    <section className="w-full bg-surface-container-high py-16 px-4 sm:px-6 lg:px-8 border-y border-surface-container-highest/60">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] uppercase tracking-wider text-secondary font-bold block">
            {brandConfig.processSection.eyebrowBadge}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-on-surface mt-1">
            {brandConfig.processSection.title}
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2">
            {brandConfig.processSection.subtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {brandConfig.processSection.steps.map((step) => {
            let IconComp = BookOpen;
            let iconBg = 'bg-secondary-container text-secondary-dark';

            if (step.iconType === 'chat') {
              IconComp = MessagesSquare;
              iconBg = 'bg-secondary-fixed text-primary';
            } else if (step.iconType === 'mail') {
              IconComp = CheckCheck;
              iconBg = 'bg-surface-container text-primary';
            }

            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-surface-bright shadow-sm flex flex-col items-start relative border border-surface-container-highest/60"
              >
                {/* Large watermark number */}
                <span className="font-serif text-4xl text-outline-variant/40 absolute top-4 right-6 font-bold select-none pointer-events-none">
                  {step.number}
                </span>

                <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mb-4`}>
                  <IconComp className="w-5 h-5" />
                </div>

                <h4 className="text-base sm:text-lg font-semibold text-on-surface mb-2">
                  {step.title}
                </h4>

                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
