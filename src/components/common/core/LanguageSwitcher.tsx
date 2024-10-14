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
    // <div className="flex items-center space-x-2 rounded-sm bg-transparent border border-slate-900 dark:border-slate-400 py-2 px-1">
    //   {/* Global Icon */}
    //   <Image src={GlobalIcon} alt="global-icon" height={20} width={20} />

    //   {/* Custom Select Element */}
    //   <div className="relative w-full">
    //     <select
    //       value={locale}
    //       onChange={changeLocale}
    //       className="w-full appearance-none bg-transparent border-none focus:outline-none px-4"
    //       title="Locale Switcher"
    //     >
    //       {data.map(loc => (
    //         <option key={loc.id} value={loc.value}>
    //           {loc.title}
    //         </option>
    //       ))}
    //     </select>

    //     {/* Dropdown Arrow */}
    //     <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
    //       <svg
    //         className="w-4 h-4 text-slate-600"
    //         fill="none"
    //         stroke="currentColor"
    //         viewBox="0 0 24 24"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <path
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth={2}
    //           d="M19 9l-7 7-7-7"
    //         />
    //       </svg>
    //     </div>
    //   </div>
    // </div>

    <div className="relative inline-block">
      <select
        value={locale}
        onChange={changeLocale}
        className="appearance-none border rounded-md pl-10 pr-8 py-2 text-sm font-semibold text-[#163B45] dark:text-[#FAFAFA] focus:outline-none dark:border-[#424242] border-[#163B45] dark:bg-[#424242]"
        title="Language Selector"
      >
        {data.map(loc => (
          <option
            key={loc.id}
            value={loc.value}
            className="hover:bg-[#FDE9D4] bg-[#FAFAFA] py-4 text-[#163B45] font-serif"
          >
            {loc.title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          className="h-5 w-5 text-gray-400"
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
