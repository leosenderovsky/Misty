/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Txt } from './Txt';
import { MessageCircle, Instagram, Mail, Store, Clock, BadgeCheck } from 'lucide-react';
import {
  brandConfig,
  getInstagramUrl,
  getShowroomAddressText,
  getShowroomHoursText,
  getWhatsAppUrl,
  hasText,
} from '../brand.config';
import { BrandLogo } from './BrandLogo';

const GRID_COLUMNS: Record<number, string> = {
  1: 'lg:grid-cols-1',
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
};

export const Footer: React.FC = () => {
  const { footer, contact } = brandConfig;
  const waUrl = getWhatsAppUrl(contact.whatsapp.messages.default);
  const showroomHours = getShowroomHoursText();

  // Cada texto vacío oculta su elemento; una columna sin contenido se oculta entera.
  const showChannels = hasText(contact.instagram.handle) || hasText(footer.whatsappLabel) || hasText(contact.email);
  const showLegal = hasText(footer.legalTitle) || hasText(footer.legalNotice);
  const showBottomBar = hasText(footer.copyrightText) || hasText(footer.demonstrationDisclaimer) || hasText(footer.variantTag);
  const visibleColumns = 2 + (showChannels ? 1 : 0) + (showLegal ? 1 : 0);

  return (
    <footer className="w-full bg-brand-surface-container-low text-brand-on-surface shadow-sm border-t border-brand-surface-container-highest">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* 4-Columns Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${GRID_COLUMNS[visibleColumns]} gap-8 mb-12`}>
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <BrandLogo size="sm" />
            <Txt as="p" className="text-xs sm:text-sm text-brand-on-surface-variant max-w-xs leading-relaxed" value={brandConfig.footer.brandDescription} />
            {hasText(footer.trustBadge) && (
              <div className="flex items-center gap-1.5 mt-1 text-brand-secondary font-medium text-xs">
                <BadgeCheck className="w-4 h-4 shrink-0 text-brand-primary" />
                <Txt as="span" className="uppercase tracking-wider font-semibold" value={footer.trustBadge} />
              </div>
            )}
          </div>

          {/* Col 2: Showroom & Horarios */}
          <div className="flex flex-col gap-2">
            <Txt as="span" className="text-base font-semibold text-brand-on-surface mb-1" value={brandConfig.footer.showroomTitle} />
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
          {showChannels && (
          <div className="flex flex-col gap-2">
            <Txt as="span" className="text-base font-semibold text-brand-on-surface mb-1" value={brandConfig.footer.channelsTitle} />
            {hasText(contact.instagram.handle) && (
            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-brand-primary shrink-0" />
              <Txt as="span" value={brandConfig.contact.instagram.handle} />
            </a>
            )}
            {hasText(footer.whatsappLabel) && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-brand-on-surface-variant hover:text-brand-primary transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-brand-secondary shrink-0" />
              <span>{footer.whatsappLabel}</span>
            </a>
            )}
            {hasText(contact.email) && (
            <div className="text-xs sm:text-sm text-brand-on-surface-variant flex items-center gap-2 mt-0.5">
              <Mail className="w-4 h-4 text-brand-primary shrink-0" />
              <Txt as="span" value={brandConfig.contact.email} />
            </div>
            )}
          </div>
          )}

          {/* Col 4: Información Legal */}
          {showLegal && (
          <div className="flex flex-col gap-2">
            <Txt as="span" className="text-base font-semibold text-brand-on-surface mb-1" value={brandConfig.footer.legalTitle} />
            <Txt as="p" className="text-xs text-brand-on-surface-variant leading-relaxed" value={brandConfig.footer.legalNotice} />
          </div>
          )}

        </div>

        {/* Bottom Bar */}
        {showBottomBar && (
        <div className="pt-6 border-t border-brand-surface-container-highest/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-on-surface-variant">
          <Txt as="p" value={brandConfig.footer.copyrightText} />
          
          {/* Obligatory Demonstration Disclaimer from requirement #4 */}
          <Txt as="p" className="text-xs text-brand-secondary-dark font-semibold bg-brand-surface-bright/70 px-3.5 py-1 rounded-full border border-brand-outline-variant/60" value={brandConfig.footer.demonstrationDisclaimer} />

          <Txt as="p" className="text-brand-on-surface-variant" value={brandConfig.footer.variantTag} />
        </div>
        )}

      </div>
    </footer>
  );
};
