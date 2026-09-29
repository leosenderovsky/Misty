/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { brandConfig } from '../brand.config';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
  variant = 'dark',
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light';

  const heights = {
    sm: 'h-9 w-auto max-w-[170px]',
    md: 'h-10 sm:h-11 w-auto max-w-[170px] sm:max-w-[210px]',
    lg: 'h-12 w-auto max-w-[220px]',
  };

  const ribbonDark = isLight ? '#acedff' : brandConfig.theme.primary;
  const ribbonMid = isLight ? '#ffffff' : '#3d7887';
  const ribbonLight = isLight ? '#d2ecf4' : '#a3cfdb';
  const textColor = isLight ? '#ffffff' : brandConfig.theme.primary;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {brandConfig.identity.logoUrl && !imgError ? (
        <img
          src={brandConfig.identity.logoUrl}
          alt={brandConfig.identity.name}
          className={`${heights[size]} object-contain shrink-0`}
          onError={() => setImgError(true)}
        />
      ) : (
        /* Vector fallback matching the folded ribbon identity */
        <svg
          className={`${heights[size]} w-auto shrink-0`}
          viewBox="0 0 280 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={`${brandConfig.identity.name} Logo`}
        >
          <g id="ribbon-mark" transform="translate(6, 4)">
            <path
              d="M26 12 C18 20 12 36 12 50 C12 66 22 72 32 64 C36 60 40 50 44 38 C40 46 36 56 30 60 C24 64 18 60 18 48 C18 36 24 24 30 16 Z"
              fill={ribbonLight}
              opacity="0.9"
            />
            <path
              d="M28 8 C14 22 8 42 10 58 C11 68 18 74 27 70 C34 66 41 54 48 38 C54 26 62 16 70 12 C78 8 84 12 80 24 C76 34 68 46 62 58 C58 66 58 72 64 72 C70 72 78 64 88 48 C85 55 76 68 67 69 C61 70 59 64 62 55 C68 43 75 31 78 22 C81 14 76 11 69 14 C62 18 55 28 49 40 C43 54 36 67 28 68 C22 69 16 63 15 54 C13 40 18 22 30 10 Z"
              fill={ribbonDark}
            />
            <path
              d="M34 16 C30 26 34 40 44 48 C50 53 58 54 63 48 C67 44 68 38 65 32 C60 24 48 18 34 16 Z"
              fill={ribbonMid}
              opacity="0.45"
            />
            <path
              d="M48 38 C56 22 66 16 73 20 C78 24 75 36 68 47 C60 60 52 68 45 66 C42 65 42 56 48 38 Z"
              fill="#ffffff"
              opacity="0.85"
            />
            <path
              d="M15 58 C18 64 24 68 30 67 C24 68 18 66 14 62 Z"
              fill={ribbonDark}
            />
          </g>
          <text
            x="96"
            y="56"
            fill={textColor}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '48px',
              letterSpacing: '-0.02em',
            }}
          >
            {brandConfig.identity.name}
          </text>
        </svg>
      )}

      {showTagline && (
        <div className="hidden sm:flex flex-col border-l border-[#c0cdd2]/60 pl-3">
          <span className="font-serif text-[19px] tracking-tight text-[#16272e] leading-none">
            {brandConfig.identity.name}
          </span>
          <span className="text-[10.5px] uppercase tracking-wider text-[#468a9b] mt-0.5 font-bold">
            {brandConfig.identity.niche}
          </span>
        </div>
      )}
    </div>
  );
};
