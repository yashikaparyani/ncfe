import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

type Entry = {
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
};

/**
 * XML sitemap (served at /sitemap.xml). List public, indexable routes here.
 * Add new marketing/info pages as they ship so search engines discover them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: Entry[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/assessments', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/for-candidates', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/for-entities', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/faqs', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/support', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/accessibility', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
