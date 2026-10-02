/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  MessageCircle,
  Instagram,
  Store,
  MapPin,
  ExternalLink,
  Send,
  Image,
} from 'lucide-react';
import {
  brandConfig,
  getInstagramUrl,
  getShowroomAddressText,
  getShowroomHoursText,
  getShowroomMapsUrl,
  getWhatsAppUrl,
} from '../brand.config';

export const ContactLocation: React.FC = () => {
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);
  const waWholesaleUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.wholesaleMessage);

  const mapSrc = brandConfig.contact.showroom.mapImageSrc;
  const showroomHours = getShowroomHoursText();
  const showroomMapsUrl = getShowroomMapsUrl();

  return (
    <section id="contacto" className="w-full py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-brand-surface scroll-mt-20">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-wider text-brand-secondary font-bold">
            {brandConfig.contactSection.eyebrowBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-brand-on-surface font-semibold mt-1">
            {brandConfig.contactSection.title}
          </h2>
          <p className="text-base sm:text-lg text-brand-on-surface-variant mt-3 leading-relaxed">
            {brandConfig.contactSection.subtitle}
          </p>
        </div>

        {/* 3 Channels Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: WhatsApp Directo */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-brand-surface-bright border border-brand-surface-container-highest/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary-container text-brand-secondary-dark flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7" />
              </div>
              
              <div className="inline-block px-2.5 py-1 rounded-full bg-brand-secondary-fixed text-brand-on-surface text-[11px] font-bold uppercase mb-3">
                {brandConfig.contactSection.whatsappCard.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-brand-on-surface mb-2">
                {brandConfig.contactSection.whatsappCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-brand-on-surface-variant mb-6 leading-relaxed">
                {brandConfig.contactSection.whatsappCard.description}
              </p>

              <p className="text-lg font-semibold text-brand-on-surface mb-6">
                {brandConfig.contact.whatsapp.display}
              </p>
            </div>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-primary text-white hover:bg-brand-secondary transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contactSection.whatsappCard.buttonText}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Instagram Oficial */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-brand-surface-bright border border-brand-surface-container-highest/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-secondary-fixed text-brand-primary flex items-center justify-center mb-6">
                <Instagram className="w-7 h-7" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-full bg-brand-surface-container text-brand-on-surface text-[11px] font-bold uppercase mb-3">
                {brandConfig.contact.instagram.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-brand-on-surface mb-2">
                {brandConfig.contactSection.instagramCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-brand-on-surface-variant mb-6 leading-relaxed">
                {brandConfig.contact.instagram.description}
              </p>

              <p className="text-lg font-semibold text-brand-on-surface mb-6">
                {brandConfig.contact.instagram.handle}
              </p>
            </div>

            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-surface-container hover:bg-brand-surface-container-highest text-brand-on-surface transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contact.instagram.buttonText}</span>
              <Image className="w-4 h-4" />
            </a>
          </div>

          {/* Card 3: Showroom Comercial */}
          <div className="flex flex-col justify-between p-8 rounded-2xl bg-brand-surface-bright border border-brand-surface-container-highest/80 shadow-sm hover:shadow-md transition-all group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-surface-container text-brand-secondary flex items-center justify-center mb-6">
                <Store className="w-7 h-7" />
              </div>

              <div className="inline-block px-2.5 py-1 rounded-full bg-brand-surface-container text-brand-on-surface text-[11px] font-bold uppercase mb-3">
                {brandConfig.contact.showroom.badge}
              </div>

              <h3 className="font-serif text-2xl font-semibold text-brand-on-surface mb-2">
                {brandConfig.contactSection.showroomCard.title}
              </h3>

              <p className="text-xs sm:text-sm text-brand-on-surface-variant mb-3 leading-relaxed">
                {getShowroomAddressText()}
              </p>

              <div className="p-3 rounded-xl bg-brand-surface-container text-brand-on-surface-variant text-xs leading-relaxed mb-6">
                <div className="font-bold text-brand-on-surface mb-0.5">
                  {brandConfig.contactSection.showroomCard.hoursLabel}
                </div>
                {showroomHours.map((hours) => (
                  <React.Fragment key={hours}>
                    {hours}
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>

            <a
              href={showroomMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-brand-secondary text-white hover:bg-brand-primary transition-all text-xs sm:text-sm font-semibold shadow-sm"
            >
              <span>{brandConfig.contact.showroom.buttonText}</span>
              <MapPin className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* MAP LOCATION CONTAINER */}
        <div id="ubicacion" className="w-full rounded-2xl overflow-hidden shadow-md bg-brand-surface-container-low mb-16 relative border border-brand-surface-container-highest scroll-mt-24">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-brand-surface-container">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-brand-secondary font-bold block mb-1">
                {brandConfig.contactSection.mapCallout.eyebrow}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-brand-on-surface">
                {brandConfig.contact.showroom.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-on-surface-variant mt-1">
                {brandConfig.contactSection.mapCallout.description}
              </p>
            </div>

            <a
              href={showroomMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-surface-bright text-brand-on-surface hover:bg-brand-surface-dim transition-colors shadow-sm text-xs sm:text-sm font-semibold shrink-0 border border-brand-surface-container-highest"
            >
              <MapPin className="w-4 h-4 text-brand-primary" />
              <span>{brandConfig.contactSection.mapCallout.buttonText}</span>
            </a>
          </div>

          {/* Map Preview Image */}
          <div className="relative w-full h-80 bg-cover bg-center group overflow-hidden">
            <img
              src={mapSrc}
              alt={`Ubicación del showroom de ${brandConfig.identity.name} en Flores`}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              decoding="async"
              width={512}
              height={512}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-4 left-4 bg-brand-surface-bright/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-outline-variant/50 text-xs font-semibold text-brand-on-surface flex items-center gap-1.5 shadow">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span>{getShowroomAddressText()}</span>
            </div>
          </div>
        </div>

        {/* CALLOUT FINAL PARA REVENDEDORAS / COMERCIOS */}
        <div className="w-full rounded-3xl p-8 sm:p-12 bg-brand-primary text-white shadow-xl relative overflow-hidden">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-secondary/50 blur-3xl pointer-events-none" />

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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-brand-surface-bright text-brand-primary text-base font-semibold shadow-lg hover:bg-brand-surface-container transition-all hover:scale-[1.02] active:scale-[0.99]"
              >
                <Send className="w-5 h-5 text-brand-secondary" />
                <span>{brandConfig.wholesaleCallout.buttonText}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
