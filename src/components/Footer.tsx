/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, Instagram, Mail, Store, Clock, BadgeCheck } from 'lucide-react';
import {
  brandConfig,
  getInstagramUrl,
  getShowroomAddressText,
  getShowroomHoursText,
  getWhatsAppUrl,
} from '../brand.config';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);
  const showroomHours = getShowroomHoursText();

  return (
    <footer className="w-full bg-brand-surface-container-low text-brand-on-surface shadow-sm border-t border-brand-surface-container-highest">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <BrandLogo size="sm" />
            <p className="text-xs sm:text-sm text-brand-on-surface-variant max-w-xs leading-relaxed">
              {brandConfig.footer.brandDescription}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-brand-secondary font-medium text-xs">
              <BadgeCheck className="w-4 h-4 shrink-0 text-brand-primary" />
              <span className="uppercase tracking-wider font-semibold">
                {brandConfig.footer.trustBadge}
              </span>
            </div>
          </div>

          {/* Col 2: Showroom & Horarios */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-brand-on-surface mb-1">
              {brandConfig.footer.showroomTitle}
            </span>
            <p className="text-xs sm:text-sm text-brand-on-surface-variant flex items-start gap-2">
              <Store className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <span>{getShowroomAddressText()}</span>
            </p>
            <div className="text-xs sm:text-sm text-brand-on-surface-variant flex items-start gap-2 mt-1">
              <Clock className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                {showroomHours.map((hours) => (
                  <p key={hours}>{hours}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Canales Directos */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-brand-on-surface mb-1">
              {brandConfig.footer.channelsTitle}
            </span>
            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-brand-primary shrink-0" />
              <span>{brandConfig.contact.instagram.handle}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-brand-secondary shrink-0" />
              <span>WhatsApp Ventas & Asesoramiento</span>
            </a>
            <div className="text-xs sm:text-sm text-brand-on-surface-variant flex items-center gap-2 mt-0.5">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <span>{brandConfig.contact.email.display}</span>
            </div>
          </div>

          {/* Col 4: Información Legal */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-brand-on-surface mb-1">
              {brandConfig.footer.legalTitle}
            </span>
            <p className="text-xs text-brand-on-surface-variant leading-relaxed">
              {brandConfig.footer.legalNotice}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-on-surface-variant">
          <p>{brandConfig.footer.copyrightText}</p>
          
          {/* Obligatory Demonstration Disclaimer from requirement #4 */}
          <p className="text-xs text-brand-secondary-dark font-semibold bg-brand-surface-bright/70 px-3.5 py-1 rounded-full border border-brand-outline-variant/60">
            {brandConfig.footer.demonstrationDisclaimer}
          </p>

          <p className="text-brand-on-surface-variant">{brandConfig.footer.variantTag}</p>
        </div>

      </div>
    </footer>
  );
};
