import React from 'react';
import { assetPath } from '../utils/assetPath';

export const BrandLogo = ({
  variant = 'full', // 'full', 'inverted', 'mark-only'
  size = 100,
  className = ''
}) => {
  // On dark backgrounds use the same image but with a brightness/invert filter
  // so the logo is always legible.
  const filterStyle = variant === 'inverted'
    ? { filter: 'brightness(0) invert(1)' }
    : {};

  return (
    <div
      className={`brand-logo-container ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      <img
        src={assetPath('images/brand_logo.png')}
        alt="Advithiya – Crafting Possibilities"
        style={{
          height: `${size}px`,
          width: 'auto',
          display: 'block',
          objectFit: 'contain',
          ...filterStyle
        }}
      />
    </div>
  );
};

export default BrandLogo;
