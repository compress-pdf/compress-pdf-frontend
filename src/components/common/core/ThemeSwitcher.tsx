'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import lightIcon from '@assets/icons/pngs/header/light-icon.png';
import darkIcon from '@assets/icons/pngs/header/dark-icon.png';

type Props = {
  text: boolean;
};

export default function ThemeSwitcher({ text }: Props) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="flex items-center justify-center"
    >
      {resolvedTheme === 'dark' ? (
        !text ? (
          <Image src={lightIcon} alt="light" className="h-4 w-4" />
        ) : (
          <div className="flex items-center gap-2">
            <Image src={lightIcon} alt="light" className="h-3 w-3" />{' '}
            <span className="text-[8px]">Light Mode</span>
          </div>
        )
      ) : !text ? (
        <Image src={darkIcon} alt="dark" className="w-4 h-4 " />
      ) : (
        <div className="flex items-center gap-2">
          <Image src={darkIcon} alt="dark" className="h-3 w-3" />{' '}
          <span className="text-[8px] text-[#163B45]">Dark Mode</span>
        </div>
      )}
    </button>
  );
}
