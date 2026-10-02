/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { demoBannerConfig, getValidDemoBannerLink } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => {
  const companyName = demoBannerConfig.companyName === '[EMPRESA]' ? '' : demoBannerConfig.companyName;
  const link = companyName ? getValidDemoBannerLink(demoBannerConfig.link) : null;

  return (
    <div
      className="flex min-h-12 w-full items-center justify-center bg-amber-400 px-3 py-2 text-center text-[10px] leading-4 text-gray-900 sm:min-h-8 sm:px-6 md:min-h-0 md:whitespace-nowrap md:text-xs"
    >
      {companyName ? (
        <>
          Esta marca no existe. Este sitio es un prototipo de{' '}
          {link ? (
            <a className="font-semibold underline underline-offset-2" href={link} target="_blank" rel="noopener noreferrer">
              {companyName}
            </a>
          ) : (
            <strong className="font-semibold">{companyName}</strong>
          )}
          .{link && ' Si querés un sitio como este para tu negocio, visitanos acá.'}
        </>
      ) : (
        <>Esta marca no existe. Este sitio es un prototipo de demostración de sitios web para comercios.</>
      )}
    </div>
  );
};