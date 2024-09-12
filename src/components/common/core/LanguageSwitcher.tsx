'use client';

import { useLocale } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;

    router.push(pathname);
    // router.replace('/about', {locale: newLocale});

    // Replacing the current route but changing the locale
    router.replace(pathname, { locale: newLocale as 'en' | 'de' | undefined });
  };

  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="rounded-sm bg-transparent px-1 border border-slate-900 dark:border-slate-400"
        title="locale switcher"
      >
        {['en', 'de'].map(loc => (
          <option
            key={loc}
            value={loc}
            className="bg-blue-300 dark:bg-slate-700 text-slate-800 dark:text-slate-300"
          >
            {loc.toUpperCase()} {/* Display language in uppercase */}
          </option>
        ))}
      </select>
    </div>
  );
}
