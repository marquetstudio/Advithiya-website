import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

export const AnimatedCounter = ({ from = 0, to, duration = 1.5, suffix = '' }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = from;
    const end = parseInt(to, 10);
    if (isNaN(end)) return;

    const totalSteps = 40;
    const increment = (end - start) / totalSteps;
    const stepTime = (duration * 1000) / totalSteps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      start += increment;
      if (currentStep >= totalSteps) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref}>
      {isNaN(parseInt(to, 10)) ? to : count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
