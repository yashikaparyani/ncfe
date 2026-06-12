import { siteConfig, SITE_URL } from '@/config/site';

/**
 * Schema.org JSON-LD describing the organisation and website. Injected once
 * in the root layout so search engines get rich, machine-readable context
 * (knowledge-panel eligibility, sitelinks search box, etc.).
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/ncfe_logo.png`,
    foundingDate: siteConfig.organization.foundingDate,
    email: siteConfig.organization.email,
    description: siteConfig.description,
    areaServed: { '@type': 'Country', name: 'India' },
    sameAs: [...siteConfig.organization.sameAs],
  };
}

/**
 * FAQPage JSON-LD — makes Q&A pairs eligible for rich results in search.
 */
export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Renders a JSON-LD <script>. Pass the request nonce so it satisfies the CSP. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.legalName,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/assessments?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
