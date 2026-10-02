/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { brandConfig, getWhatsAppUrl } from '../brand.config';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.defaultMessage);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Tooltip prompt */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-surface-bright px-3.5 py-2 rounded-full shadow-lg border border-outline-variant text-xs font-semibold text-primary animate-in fade-in slide-in-from-right-4 duration-300">
          <span>¿Tenés dudas? Escribinos</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full focus-visible:outline-2 focus-visible:outline-outline"
            aria-label="Cerrar sugerencia"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="w-14 h-14 rounded-full bg-primary hover:bg-secondary-dark text-white flex items-center justify-center shadow-xl shadow-primary/30 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
