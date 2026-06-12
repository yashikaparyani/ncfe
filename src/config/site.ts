/**
 * Single source of truth for site-wide metadata, navigation and SEO.
 * Keep all hard-coded strings about "the site" here so pages stay thin.
 */

const DEFAULT_SITE_URL = 'https://www.ncfe.gov.in';

function normalizeSiteUrl(value: string | undefined): string {
  const candidate = value?.trim().replace(/\/+$/, '');
  if (!candidate) return DEFAULT_SITE_URL;

  try {
    return new URL(candidate).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/** Canonical origin, configurable per environment. No trailing slash. */
export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL,
);

export const siteConfig = {
  name: 'NCFE',
  legalName: 'National Centre for Financial Education',
  shortName: 'NCFE',
  url: SITE_URL,
  locale: 'en_IN',
  /** Default social/OG share image (1200×630 recommended). */
  ogImage: '/assets/hero_bg.png',
  description:
    "NCFE (National Centre for Financial Education) is India's premier platform for " +
    'financial literacy assessments and certification. Take the NFLAT and Financial ' +
    'Literacy Quiz (FLQ), earn verifiable certificates, and build the knowledge to ' +
    'secure your financial future.',
  /** Targeted SEO keywords for the financial-literacy domain. */
  keywords: [
    'NCFE',
    'National Centre for Financial Education',
    'financial literacy',
    'financial education India',
    'financial literacy assessment',
    'NFLAT',
    'National Financial Literacy Assessment Test',
    'Financial Literacy Quiz',
    'FLQ',
    'financial literacy test',
    'financial literacy certification',
    'financial awareness',
    'money management skills',
    'financial education certificate',
    'proctored online assessment',
    'financial literacy for students',
    'RBI financial education',
    'financial inclusion India',
  ],
  organization: {
    email: 'info@ncfe.org.in',
    foundingDate: '2013',
    sameAs: [
      'https://www.facebook.com/NCFEIndia',
      'https://twitter.com/ncfe_india',
      'https://www.linkedin.com/company/ncfe-india',
      'https://www.youtube.com/@ncfeindia',
    ],
  },
} as const;

/** Primary site navigation (header). `to` values are app routes. */
export const mainNav: ReadonlyArray<{ label: string; to: string }> = [
  { label: 'About NCFE', to: '/about' },
  { label: 'Assessments', to: '/assessments' },
  { label: 'For Candidates', to: '/for-candidates' },
  { label: 'For Entities', to: '/for-entities' },
  { label: 'Resources', to: '/resources' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
];

/** Footer link groups — public, production-facing routes only. */
export const footerNav: ReadonlyArray<{
  title: string;
  links: ReadonlyArray<{ label: string; to: string }>;
}> = [
  {
    title: 'Explore',
    links: [
      { label: 'About NCFE', to: '/about' },
      { label: 'Assessment Programs', to: '/assessments' },
      { label: 'Resources', to: '/resources' },
      { label: 'FAQs', to: '/faqs' },
      { label: 'Contact & Help', to: '/contact' },
    ],
  },
  {
    title: 'For Candidates',
    links: [
      { label: 'Why Candidates', to: '/for-candidates' },
      { label: 'Register as Candidate', to: '/candidate/register' },
      { label: 'Candidate Login', to: '/login' },
      { label: 'Results & Certificates', to: '/candidate/results' },
    ],
  },
  {
    title: 'For Entities',
    links: [
      { label: 'Why Entities', to: '/for-entities' },
      { label: 'Register as Entity', to: '/entity/register' },
      { label: 'Entity Login', to: '/login' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms of Use', to: '/terms' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
];

export type SiteConfig = typeof siteConfig;
