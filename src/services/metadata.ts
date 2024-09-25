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
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      type: 'website',
      url: t('openGraph.url'),
      images: t.raw('openGraph.images'),
    },
    twitter: {
      title: t('twitter.title'),
      description: t('twitter.description'),
      card: 'summary_large_image',
      creator: t('twitter.title'),
      images: t.raw('twitter.images'),
    },
  };
}
