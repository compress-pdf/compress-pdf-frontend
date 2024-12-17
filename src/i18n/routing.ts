import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en'],
  localePrefix: 'as-needed',
  defaultLocale: 'en',

  pathnames: {
    '/about': {
      en: '/about/',
      // de: '/ueber/',
      // fr: '/a-propos/',
    },
    '/cookie-policy': {
      en: '/cookie-policy/',
      // de: '/cookie-richtlinie/',
      // fr: '/politique-de-cookies/',
    },
    '/privacy-policy': {
      en: '/privacy-policy/',
      // de: '/datenschutzrichtlinie/',
      // fr: '/politique-de-confidentialite/',
    },
    '/terms-and-conditions': {
      en: '/terms-and-conditions/',
      // de: '/geschaftsbedingungen/',
      // fr: '/termes-et-conditions/',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
