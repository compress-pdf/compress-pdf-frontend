'use client';

// import { useTranslations } from 'next-intl'; // External imports

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing'; // Alias imports
import Logo from '@/assets/icons/svgs/Logo';

import LanguageSwitcher from '../core/LanguageSwitcher';
import Hamburger from '../core/Hamburger';
import ThemeSwitcher from '../core/ThemeSwitcher'; // Relative imports
import SectionContainer from '../containers/SectionContainer';

export default function Navbar() {
  const t = useTranslations('common.header');

  const menus = t.raw('menu');

  return (
    <div className="relative w-full">
      <nav className="fixed top-0 w-full bg-[#FAFAFA] dark:bg-[#232323] shadow-md z-50 left-0 right-0">
        <SectionContainer className="my-0 md:my-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-semibold text-blue-600 dark:text-white leading-none"
              >
                <Logo />
              </Link>
            </div>

            <div className="flex gap-2 items-center">
              <div className="hidden md:block">
                <div className="flex items-center space-x-2">
                  {menus
                    .slice(0, 2)
                    .map((menu: { label: string; path: string }) => (
                      <Link
                        key={menu.label}
                        href={menu.path}
                        className="text-gray-800 dark:text-white rounded-md text-base font-medium"
                      >
                        {menu.label}
                      </Link>
                    ))}
                </div>
              </div>
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Hamburger />
            </div>
          </div>
        </SectionContainer>
      </nav>

      <div className="inline-block mt-14"></div>
    </div>
  );
}
