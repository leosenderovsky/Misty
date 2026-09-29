/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, User, Menu, X } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f4f8fa]/90 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(22,39,46,0.06)] border-b border-[#d5e3e8]/60 transition-all">
      <div className="h-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        
        {/* Brand with vertical divider and tagline */}
        <div className="flex items-center">
          <a href="#" className="flex items-center transition-opacity hover:opacity-90" aria-label={brandConfig.identity.name}>
            <BrandLogo size="md" showTagline={true} />
          </a>
        </div>

        {/* Navigation Links (Nosotros, Contacto) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {brandConfig.navigation.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#3e5258] hover:text-[#2b6473] transition-colors py-1 px-3 rounded-full hover:bg-[#e8f1f5]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2b6473] text-white text-xs sm:text-sm font-semibold shadow-[0_4px_16px_-2px_rgba(43,100,115,0.25)] hover:bg-[#468a9b] active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">{brandConfig.navigation.ctaButtonText}</span>
            <span className="sm:hidden">{brandConfig.navigation.ctaButtonTextMobile}</span>
          </a>

          {/* User / Profile Icon Badge */}
          <div className="w-8 h-8 rounded-full bg-[#d2ecf4] text-[#144f5c] flex items-center justify-center shrink-0 shadow-xs">
            <User className="w-4 h-4" />
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-[#16272e] hover:bg-[#e8f1f5] transition-colors ml-1"
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d5e3e8] bg-white px-5 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {brandConfig.navigation.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-xl text-base font-medium text-[#16272e] hover:bg-[#e8f1f5] hover:text-[#2b6473] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
