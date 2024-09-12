'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import SunIcon from '@/assets/icons/svgs/SunIcon';
import MoonIcon from '@/assets/icons/svgs/MoonIcon';

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="text-gray-800 dark:text-white rounded-md text-sm font-medium"
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
