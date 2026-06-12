import type { Metadata } from 'next';
import { siteConfig, SITE_URL } from '@/config/site';

/**
 * Build a fully-formed `Metadata` object for a page, merging sensible
 * site-wide defaults with per-page overrides. Use this in every
 * `generateMetadata` / exported `metadata` so SEO tags stay consistent.
 */
export function buildMetadata(options: {
  title?: string;
  description?: string;
  /** Path beginning with "/", used for the canonical URL. */
  path?: string;
  keywords?: readonly string[];
  /** Set true on pages that must not be indexed (auth, dashboards, etc.). */
  noindex?: boolean;
  ogImage?: string;
} = {}): Metadata {
  const {
    title,
    description = siteConfig.description,
    path = '/',
    keywords,
    noindex = false,
    ogImage = siteConfig.ogImage,
  } = options;

  const canonical = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const absoluteOg = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : [...siteConfig.keywords],
    alternates: { canonical },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      url: canonical,
      title: title ?? `${siteConfig.name} — ${siteConfig.legalName}`,
      description,
      images: [{ url: absoluteOg, width: 1200, height: 630, alt: siteConfig.legalName }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ?? `${siteConfig.name} — ${siteConfig.legalName}`,
      description,
      images: [absoluteOg],
    },
  };
}
