import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://compresspdf.to',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://compresspdf.to',
          de: 'https://compresspdf.to/de',
        },
      },
    },
    {
      url: 'https://compresspdf.to/about',
      lastModified: new Date(),
      alternates: {
        languages: {
          en: 'https://compresspdf.to',
          de: 'https://compresspdf.to/de/about',
        },
      },
    },
  ];
}
