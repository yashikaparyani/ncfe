import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * PWA web app manifest (served at /manifest.webmanifest).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.legalName}`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0b2545',
    lang: 'en-IN',
    categories: ['education', 'finance', 'government'],
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/assets/ncfe_logo.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
