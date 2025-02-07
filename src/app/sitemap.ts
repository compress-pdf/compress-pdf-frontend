import { MetadataRoute } from 'next';

import { toolsData } from '@/constants/toolsData';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static sitemap entries
  const staticUrls = [
    {
      url: 'https://compresspdf.to',
      lastModified: currentDate,
      priority: 1,
    },
    {
      url: 'https://compresspdf.to/about',
      lastModified: currentDate,
      priority: 0.8,
    },
  ];

  // Dynamic sitemap entries for toolsData
  const dynamicToolUrls = toolsData.map(tool => ({
    url: `https://compresspdf.to/${tool.url}`,
    lastModified: currentDate,
    priority: 0.5,
  }));

  // Combine static and dynamic entries
  return [...staticUrls, ...dynamicToolUrls];
}
