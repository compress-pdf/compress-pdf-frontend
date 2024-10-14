'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import lightIcon from '@assets/icons/pngs/header/light-icon.png';
import darkIcon from '@assets/icons/pngs/header/dark-icon.png';

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
      className="flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Image src={lightIcon} alt="light" className="w-4 h-4" />
      ) : (
        <Image src={darkIcon} alt="dark" className="w-4 h-4" />
      )}
    </button>
  );
}
