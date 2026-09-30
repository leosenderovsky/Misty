/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { demoBannerConfig } from '../demoBanner.config';

export const PrototypeBanner: React.FC = () => {
  return (
    <div
      className="w-full bg-amber-400 px-3 py-2 text-center text-xs leading-4 text-gray-900 sm:px-6 md:whitespace-nowrap"
    >
      Esta marca no existe. Este sitio es un prototipo de{' '}
      <a className="font-semibold underline underline-offset-2" href={demoBannerConfig.link}>
        {demoBannerConfig.companyName}
      </a>
      . Si querés un sitio como este para tu negocio, visitanos acá.
    </div>
  );
};