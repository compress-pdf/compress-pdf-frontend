import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

export async function generatePageMetadata(
  translationKey: string
): Promise<Metadata> {
  const t = await getTranslations(translationKey); // Pass the translation key dynamically

  const languages = t
    .raw('alternates.hreflangs')
    .reduce(
      (
        acc: { [hreflang: string]: string },
        { href, hreflang }: { href: string; hreflang: string }
      ) => {
        acc[hreflang] = href;
        return acc;
      },
      {}
    );

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: t('alternates.canonical'),
      languages: languages,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'CompressPDF',
      url: t('alternates.canonical'),
      images: [
        {
          url: t('thumbnail'),
          alt: t('title'),
        },
      ],
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
      images: [
        {
          url: t('thumbnail'),
          alt: t('title'),
        },
      ],
    },
  };
}
