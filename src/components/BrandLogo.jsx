import React from 'react';
import { assetPath } from '../utils/assetPath';

export const BrandLogo = ({
  variant = 'full', // 'full', 'inverted', 'mark-only', 'dark-brown'
  size = 100,
  className = ''
}) => {
  // On dark backgrounds use the same image but with a brightness/invert filter
  // so the logo is always legible.
  let filterStyle = {};
  if (variant === 'inverted') {
    filterStyle = { filter: 'brightness(0) invert(1)' };
  } else if (variant === 'dark-brown') {
    // Filter to turn the logo into roughly #4A3428
    filterStyle = { filter: 'brightness(0) invert(21%) sepia(13%) saturate(1394%) hue-rotate(345deg) brightness(97%) contrast(92%)' };
  }

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
