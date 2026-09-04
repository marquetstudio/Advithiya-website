import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #A6462A 0%, #E06C42 50%, #F78E1E 100%)',
        boxShadow: '0 0 10px rgba(247, 142, 30, 0.5), 0 1px 4px rgba(166, 70, 42, 0.4)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ScrollProgressBar;
