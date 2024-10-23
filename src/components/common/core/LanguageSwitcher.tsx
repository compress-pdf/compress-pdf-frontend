'use client';

import { Listbox, Transition } from '@headlessui/react';
import { useLocale, useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

import { usePathname, useRouter } from '@/i18n/routing';
import English from '@/assets/icons/svgs/lang/English';
import German from '@/assets/icons/svgs/lang/German';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const t = useTranslations('common.header');
  const languages = t.raw('language');
  const router = useRouter();
  const locale = useLocale();

  const [selectedLocale, setSelectedLocale] = useState(
    languages.find((loc: { value: string }) => loc.value === locale) ||
      languages[0]
  );

  const changeLocale = (newLocale: { label: string; value: string }) => {
    setSelectedLocale(newLocale);
    router.replace(pathname, {
      locale: newLocale.value as 'en' | 'de' | undefined,
    });
  };

  const icons = [<English key="en" />, <German key="de" />];

  return (
    <div className="relative hidden lg:inline-block ">
      <Listbox value={selectedLocale} onChange={changeLocale}>
        <div className="relative">
          <Listbox.Button className="relative w-[136px] cursor-default border  rounded-md text-[0.875rem] font-bold text-[#163B45] dark:text-[#FAFAFA] dark:border-[#424242] border-[#163B45] dark:bg-[#424242] focus:outline-none">
            <span className="block truncate py-[7px]">
              {selectedLocale.label}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                className="stroke-[#163B45] dark:stroke-slate-50"
              >
                <path
                  d="M5.7774 6.29401L8.8374 9.34734L11.8974 6.29401L12.8374 7.23401L8.8374 11.234L4.8374 7.23401L5.7774 6.29401Z"
                  fill="#163B45"
                />
              </svg>
            </span>
          </Listbox.Button>
          <div className="pointer-events-none absolute inset-y-0 pb-1 left-0 flex items-center pl-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              className="stroke-[#163B45] dark:stroke-slate-50"
            >
              <g id="iconoir:language">
                <g id="Group">
                  <path
                    id="Vector"
                    d="M2.98047 12C2.98047 17.523 7.45747 22 12.9805 22C18.5035 22 22.9805 17.523 22.9805 12C22.9805 6.477 18.5035 2 12.9805 2C7.45747 2 2.98047 6.477 2.98047 12Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_2"
                    d="M13.9805 2.0498C13.9805 2.0498 16.9805 5.9998 16.9805 11.9998C16.9805 17.9998 13.9805 21.9498 13.9805 21.9498"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_3"
                    d="M11.9805 21.9498C11.9805 21.9498 8.98047 17.9998 8.98047 11.9998C8.98047 5.9998 11.9805 2.0498 11.9805 2.0498"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_4"
                    d="M3.61035 15.5H22.3504"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    id="Vector_5"
                    d="M3.61035 8.5H22.3504"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </svg>
          </div>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-[136px] mt-3 overflow-auto rounded-md bg-[#FAFAFA] dark:bg-[#232323] text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map(
                (loc: { label: string; value: string }, index: number) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-4 pl-0 ${
                        active
                          ? 'bg-[#FDE9D4] dark:bg-[#3D3D3D] text-[#163B45]dark:text-[##FFFFFF] border-l border-l-[#FF8224]'
                          : 'text-[#163B45] dark:text-[#FAFAFA]'
                      }`
                    }
                    value={loc}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`truncate flex items-center justify-start gap-3 pl-3 ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {icons[index]}
                          <span className="text-md text-[#FFFFF] font-normal leading-6">
                            {loc.label}
                          </span>
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                )
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
