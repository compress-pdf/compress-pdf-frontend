'use client';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

import { Link } from '@/i18n/routing';

type Props = {
  menus: { label: string; path: string }[];
};

export default function MenuModal({ menus }: Props) {
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 text-gray-800 dark:text-white rounded-md font-medium leading-7">
          More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="7"
            viewBox="0 0 13 7"
            fill="none"
          >
            <path
              d="M11.5 1.25004C11.5 1.25004 7.81756 6.24999 6.49996 6.25C5.18237 6.25001 1.5 1.25 1.5 1.25"
              stroke="#163B45"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="white"
            />
          </svg>
        </MenuButton>

        <MenuItems
          transition
          anchor="bottom end"
          className="relative rounded-[10px] bg-white dark:bg-[#232323] px-[40px] pb-6 z-50 border dark:border-none transition duration-100 ease-out shadow-md shadow-slate-900/40"
        >
          <div className="dark:hidden absolute inset-0 bg-gradient-to-r from-[#DCE6FF85] to-[#FFE8CCCC] -z-10"></div>

          <p className="text-[18px] text-[#163B45] font-bold pt-[25px] pb-[16px] dark:text-[#FFF]">
            Compress PDF to
          </p>
          <div className="grid grid-cols-6 gap-x-8 gap-y-5 text-[#163B45]">
            {menus
              .slice(2)
              .map((menu: { label: string; path: string }, index: number) => (
                <MenuItem key={index}>
                  <Link
                    href={menu.path}
                    className="px-3 flex justify-center items-center py-1 text-[#163B45] rounded-md shadow-[0px_4px_4px_0px_#00000040] font-base leading-7 border border-transparent dark:border-gray-50/10 dark:text-[#FFFFFF] bg-[#fbfbfb] dark:bg-[#2f2f2f] dark:border-[#C2C2C22B] hover:text-white dark:hover:text-white hover:bg-orange-500 dark:hover:bg-orange-500 transition-all duration-300 ease-in-out dark:shadow-[0px_4px_4px_0px_#00000040]"
                  >
                    {menu.label}
                  </Link>
                </MenuItem>
              ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
