'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.replace(pathname, { locale: newLocale as 'en' | 'de' | undefined });
  };

  const data = [
    { id: 1, title: 'English', value: 'en' },
    { id: 2, title: 'German', value: 'de' },
  ];

  return (
    <div className="relative hidden lg:inline-block">
      <select
        value={locale}
        onChange={changeLocale}
        className="appearance-none border rounded-md pl-10 pr-8 py-2 text-[0.875rem] font-bold text-[#163B45] dark:text-[#FAFAFA] focus:outline-none dark:border-[#424242] border-[#163B45] dark:bg-[#424242]"
        title="Language Selector"
      >
        {data.map(loc => (
          <option
            key={loc.id}
            value={loc.value}
            className="hover:bg-[#FDE9D4] bg-[#FAFAFA] py-4 text-[#163B45]"
          >
            {loc.title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
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
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-5 w-5 text-[#16384B] dark:text-slate-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
