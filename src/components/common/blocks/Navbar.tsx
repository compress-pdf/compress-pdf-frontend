import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/routing';

// import LanguageSwitcher from '../core/LanguageSwitcher';
import Hamburger from '../core/Hamburger';
import ThemeSwitcher from '../core/ThemeSwitcher'; // Relative imports
import SectionContainer from '../containers/SectionContainer';
import LogoButton from '../core/LogoButton';

import MenuModal from './MenuModal';

export default function Navbar() {
  const t = useTranslations('common.header');

  const menus = t.raw('menu');

  return (
    <div className="relative w-full">
      <nav className="fixed top-0 w-full bg-[#FAFAFA] dark:bg-[#232323] shadow-md z-50 left-0 right-0">
        <SectionContainer className="my-0 md:my-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <LogoButton />
            </div>

            <div className="flex gap-[19px] items-center text-base">
              <div className="hidden lg:block">
                <div className="flex items-center gap-[19px]">
                  {menus
                    .slice(0, 2)
                    .map((menu: { label: string; path: string }) => (
                      <Link
                        key={menu.label}
                        href={menu.path}
                        className="text-gray-800 dark:text-white rounded-md font-medium leading-7"
                      >
                        {menu.label}
                      </Link>
                    ))}
                  <MenuModal menus={menus} />
                </div>
              </div>
              <ThemeSwitcher text={false} />
              {/* <LanguageSwitcher /> */}
              <Hamburger menus={menus} />
            </div>
          </div>
        </SectionContainer>
      </nav>

      <div className="inline-block mt-14"></div>
    </div>
  );
}
