import React from 'react';
import { assetPath } from '../utils/assetPath';

export const BrandLogo = ({
  variant = 'full', // 'full', 'inverted', 'mark-only', 'dark-brown'
  type = 'horizontal', // 'horizontal', 'vertical'
  size = 100,
  className = ''
}) => {
  // On dark backgrounds use the same image but with a brightness/invert filter
  // so the logo is always legible.
  // Filters removed to preserve original logo colors (orange sun, etc)

  const logoFile = type === 'vertical' ? 'advithiya_logo_white_vertical.png' : 'advithiya_logo_horizontal.png';

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <img
        src={assetPath(`images/${logoFile}`)}
        alt="Advithiya – Crafting Possibilities"
        style={{
          height: `${size}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default BrandLogo;
