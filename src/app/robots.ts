import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';

/**
 * robots.txt (served at /robots.txt). Public marketing pages are crawlable;
 * authenticated areas and APIs are disallowed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/candidate/',
          '/entity/',
          '/proctor/',
          '/invigilator/',
          '/resources',
          '/login',
          '/staff-login',
          '/forgot-password',
          '/change-password-first-login',
          '/security/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
