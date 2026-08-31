import React from 'react';

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
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="AdvithiyaLogoPattern" width="120" height="120" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <g fill="none" stroke="#FFFFFF" strokeWidth="1.5">
              <polygon points="60,10 100,85 20,85" />
              <polyline points="40,65 60,35 80,65" />
              <line x1="50" y1="50" x2="70" y2="50" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#AdvithiyaLogoPattern)" />
      </svg>
    </div>
  );
};

export default BrandPattern;
