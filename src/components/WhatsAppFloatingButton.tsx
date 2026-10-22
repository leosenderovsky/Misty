/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { brandConfig, getWhatsAppUrl, hasText } from '../brand.config';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const floating = brandConfig.ui.whatsappFloating;
  const waUrl = getWhatsAppUrl(brandConfig.contact.whatsapp.messages.default);

  if (floating.enabled === false) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
      {/* Tooltip prompt */}
      {showTooltip && hasText(floating.tooltip) && (
        <div className="hidden sm:flex items-center gap-2 bg-brand-surface-bright px-3.5 py-2 rounded-full shadow-lg border border-brand-outline-variant text-xs font-semibold text-brand-primary animate-in fade-in slide-in-from-right-4 duration-300">
          <span>{floating.tooltip}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full focus-visible:outline-2 focus-visible:outline-brand-outline"
            aria-label={floating.closeTooltipLabel}
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
        aria-label={floating.buttonLabel}
        className="w-14 h-14 rounded-full bg-brand-primary hover:bg-brand-secondary-dark text-white flex items-center justify-center shadow-xl shadow-brand-primary/30 active:scale-95 transition-all group"
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
      </a>
    </div>
  );
};
