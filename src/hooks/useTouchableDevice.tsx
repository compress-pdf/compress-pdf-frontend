'use client';
import { useEffect, useState } from 'react';

const useTouchableDevice = () => {
  const [isTouchable, setIsTouchable] = useState(false);

  useEffect(() => {
    const touchSupported =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchable(touchSupported);
  }, []);

  return { isTouchable };
};

export default useTouchableDevice;
