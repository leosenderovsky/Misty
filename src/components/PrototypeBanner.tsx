/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef } from 'react';
import { brandConfig } from '../brand.config';

export const PrototypeBanner: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        '--prototype-banner-height',
        `${banner.getBoundingClientRect().height}px`,
      );
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(banner);

    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--prototype-banner-height');
    };
  }, []);

  return (
    <div
      ref={bannerRef}
      className="sticky top-0 z-[60] w-full bg-amber-400 px-3 py-2 text-center text-xs leading-4 text-gray-900 sm:px-6 md:whitespace-nowrap"
    >
      Esta marca no existe. Este sitio es un prototipo de{' '}
      <a className="font-semibold underline underline-offset-2" href={brandConfig.demoDisclaimer.link}>
        {brandConfig.demoDisclaimer.companyName}
      </a>
      . Si querés un sitio como este para tu negocio, visitanos acá.
    </div>
  );
};