/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  MessageCircle,
  Instagram,
  Store,
  MapPin,
  ExternalLink,
  Send,
  Image,
} from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';

export const ContactLocation: React.FC = () => {
  const [mapImgError, setMapImgError] = useState(false);
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);
  const waWholesaleUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.wholesaleMessage);

  const mapSrc = !mapImgError
    ? brandConfig.contact.showroom.mapImageSrc
    : brandConfig.contact.showroom.mapImageFallback || brandConfig.contact.showroom.mapImageSrc;

  return (
    <section id="contacto" className="w-full py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#f4f8fa] scroll-mt-20">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-wider text-[#468a9b] font-bold">
            {brandConfig.contactSection.eyebrowBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-[#16272e] font-semibold mt-1">
            {brandConfig.contactSection.title}
          </h2>
          <p className="text-base sm:text-lg text-[#3e5258] mt-3 leading-relaxed">
            {brandConfig.contactSection.subtitle}
          </p>
        </div>

        {/* 3 Channels Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: WhatsApp Directo */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-[#d5e3e8]/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#d2ecf4] text-[#144f5c] flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              
              <div className="inline-block px-2.5 py-1 rounded-full bg-[#acedff] text-[#001f26] text-[11px] font-bold uppercase mb-3">
                {brandConfig.contactSection.whatsappCard.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#16272e] mb-2">
                {brandConfig.contactSection.whatsappCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#3e5258] mb-6 leading-relaxed">
                {brandConfig.contactSection.whatsappCard.description}
              </p>

              <p className="text-lg font-semibold text-[#16272e] mb-6">
                {brandConfig.contact.whatsapp.display}
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2b6473] text-white hover:bg-[#468a9b] transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contactSection.whatsappCard.buttonText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Instagram Oficial */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-[#d5e3e8]/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#b4ebfd] text-[#2b6473] flex items-center justify-center mb-6">
                <Instagram className="w-7 h-7" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-full bg-[#e8f1f5] text-[#16272e] text-[11px] font-bold uppercase mb-3">
                {brandConfig.contactSection.instagramCard.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#16272e] mb-2">
                {brandConfig.contactSection.instagramCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#3e5258] mb-6 leading-relaxed">
                {brandConfig.contactSection.instagramCard.description}
              </p>

              <p className="text-lg font-semibold text-[#16272e] mb-6">
                {brandConfig.contact.instagram.handle}
              </p>
            </div>

            <a
              href={brandConfig.contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#e8f1f5] hover:bg-[#d5e3e8] text-[#16272e] transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contactSection.instagramCard.buttonText}</span>
              <Image className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Showroom Comercial */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-white border border-[#d5e3e8]/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-[#e8f1f5] text-[#468a9b] flex items-center justify-center mb-6">
                <Store className="w-7 h-7" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-full bg-[#e8f1f5] text-[#16272e] text-[11px] font-bold uppercase mb-3">
                {brandConfig.contactSection.showroomCard.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#16272e] mb-2">
                {brandConfig.contactSection.showroomCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#3e5258] mb-3 leading-relaxed">
                {brandConfig.contactSection.showroomCard.addressLine1}
                <br />
                {brandConfig.contactSection.showroomCard.addressLine2}
              </p>

              <div className="p-3 rounded-xl bg-[#e8f1f5] text-[#3e5258] text-xs leading-relaxed mb-6">
                <div className="font-bold text-[#16272e] mb-0.5">
                  {brandConfig.contactSection.showroomCard.hoursLabel}
                </div>
                {brandConfig.contactSection.showroomCard.hoursWeekdays}
                <br />
                {brandConfig.contactSection.showroomCard.hoursSaturdays}
              </div>
            </div>

            <a
              href={brandConfig.contact.showroom.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#468a9b] text-white hover:bg-[#2b6473] transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contactSection.showroomCard.buttonText}</span>
              <MapPin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* MAP LOCATION CONTAINER */}
        <div id="ubicacion" className="w-full rounded-2xl overflow-hidden shadow-md bg-[#eef5f8] mb-16 relative border border-[#d5e3e8] scroll-mt-24">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#e8f1f5]">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#468a9b] font-bold block mb-1">
                {brandConfig.contactSection.mapCallout.eyebrow}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#16272e]">
                {brandConfig.contactSection.mapCallout.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#3e5258] mt-1">
                {brandConfig.contactSection.mapCallout.description}
              </p>
            </div>

            <a
              href={brandConfig.contact.showroom.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#16272e] hover:bg-[#dbe8ec] transition-colors shadow-sm text-xs sm:text-sm font-semibold shrink-0 border border-[#d5e3e8]"
            >
              <MapPin className="w-4 h-4 text-[#2b6473]" />
              <span>{brandConfig.contactSection.mapCallout.buttonText}</span>
            </a>
          </div>

          {/* Map Preview Image */}
          <div className="relative w-full h-80 bg-cover bg-center group overflow-hidden">
            <img
              src={mapSrc}
              alt="Ubicación Showroom Flores Misty"
              onError={() => setMapImgError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#c0cdd2]/50 text-xs font-semibold text-[#16272e] flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-[#2b6473]" />
              <span>{brandConfig.contactSection.mapCallout.pinLabel}</span>
            </div>
          </div>
        </div>

        {/* CALLOUT FINAL PARA REVENDEDORAS / COMERCIOS */}
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-[#2b6473] text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#468a9b]/50 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] uppercase tracking-wider mb-4 font-bold border border-white/20">
                {brandConfig.wholesaleCallout.badge}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-tight">
                {brandConfig.wholesaleCallout.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-100 mt-3 leading-relaxed">
                {brandConfig.wholesaleCallout.description}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <a
                href={waWholesaleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#2b6473] text-base font-semibold shadow-lg hover:bg-[#e8f1f5] transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <Send className="w-5 h-5 text-[#468a9b]" />
                <span>{brandConfig.wholesaleCallout.buttonText}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
