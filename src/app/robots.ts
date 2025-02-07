import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '?_rsc=', '*_rsc=', '?q=cal', '*q=cal'],
    },
    sitemap: 'https://compresspdf.to/sitemap.xml',
  };
}
