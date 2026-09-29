/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MessageCircle, Instagram, Mail, Store, Clock, BadgeCheck } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);

  return (
    <footer className="w-full bg-[#eef5f8] text-[#16272e] shadow-[0_-4px_20px_-2px_rgba(22,39,46,0.04)] border-t border-[#d5e3e8]">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        
        {/* 4-Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="flex flex-col gap-3">
            <BrandLogo size="sm" />
            <p className="text-xs sm:text-sm text-[#3e5258] max-w-xs leading-relaxed">
              {brandConfig.footer.brandDescription}
            </p>
            <div className="flex items-center gap-1.5 mt-1 text-[#468a9b] font-medium text-xs">
              <BadgeCheck className="w-4 h-4 shrink-0 text-[#2b6473]" />
              <span className="uppercase tracking-wider font-semibold">
                {brandConfig.footer.trustBadge}
              </span>
            </div>
          </div>

          {/* Col 2: Showroom & Horarios */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#16272e] mb-1">
              {brandConfig.footer.showroomTitle}
            </span>
            {brandConfig.footer.showroomAddresses.map((addr, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-[#3e5258] flex items-start gap-2">
                <Store className="w-4 h-4 text-[#2b6473] shrink-0 mt-0.5" />
                <span>{addr}</span>
              </p>
            ))}
            <div className="text-xs sm:text-sm text-[#3e5258] flex items-start gap-2 mt-1">
              <Clock className="w-4 h-4 text-[#2b6473] shrink-0 mt-0.5" />
              <div>
                {brandConfig.footer.showroomHours.map((hr, idx) => (
                  <p key={idx}>{hr}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Col 3: Canales Directos */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#16272e] mb-1">
              {brandConfig.footer.channelsTitle}
            </span>
            <a
              href={brandConfig.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[#3e5258] hover:text-[#2b6473] transition-colors flex items-center gap-2"
            >
              <Instagram className="w-4 h-4 text-[#2b6473] shrink-0" />
              <span>{brandConfig.contact.instagram.handle}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[#3e5258] hover:text-[#2b6473] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#468a9b] shrink-0" />
              <span>WhatsApp Ventas & Asesoramiento</span>
            </a>
            <div className="text-xs sm:text-sm text-[#3e5258] flex items-center gap-2 mt-0.5">
              <Mail className="w-4 h-4 text-[#2b6473] shrink-0" />
              <span>{brandConfig.contact.email.display}</span>
            </div>
          </div>

          {/* Col 4: Información Legal */}
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#16272e] mb-1">
              {brandConfig.footer.legalTitle}
            </span>
            <p className="text-xs text-[#3e5258] leading-relaxed">
              {brandConfig.footer.legalNotice}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#d5e3e8]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#3e5258]">
          <p>{brandConfig.footer.copyrightText}</p>
          
          {/* Obligatory Demonstration Disclaimer from requirement #4 */}
          <p className="text-xs text-[#144f5c] font-semibold bg-white/70 px-3.5 py-1 rounded-full border border-[#c0cdd2]/60">
            {brandConfig.footer.demonstrationDisclaimer}
          </p>

          <p className="text-[#3e5258]">{brandConfig.footer.variantTag}</p>
        </div>

      </div>
    </footer>
  );
};
