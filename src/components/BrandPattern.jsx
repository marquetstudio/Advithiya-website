import React from 'react';
import { assetPath } from '../utils/assetPath';
export const BrandPattern = ({ opacity = 0.05, className = '' }) => {
  return (
    <div
      className={`brand-pattern-bg ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: opacity,
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      <img 
        src={assetPath('images/advithiya_logo_monogram.png')} 
        alt="" 
        style={{
          width: '120%',
          height: '120%',
          objectFit: 'contain',
          objectPosition: 'center',
          transform: 'translate(0, 0)'
        }} 
      />
    </div>
  );
};

export default BrandPattern;
