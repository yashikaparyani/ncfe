import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig, SITE_URL } from '@/config/site';
import { organizationJsonLd, websiteJsonLd } from '@/lib/structured-data';
import { isAuthRoute, requiredRoleFor } from '@/lib/auth/config';
import '@/styles/globals.css';

// Self-hosted, preloaded, swap-safe variable font (no external CDN request).
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${siteConfig.name} — ${siteConfig.legalName} | Financial Literacy Assessments`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName, url: SITE_URL }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  referrer: 'strict-origin-when-cross-origin',
  category: 'education',
  alternates: { canonical: SITE_URL },
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
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
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: ['/favicon.svg'],
    apple: [{ url: '/assets/ncfe_logo.png' }],
  },
  openGraph: {
    type: 'website',
    siteName: siteConfig.legalName,
    locale: siteConfig.locale,
    url: SITE_URL,
    title: `${siteConfig.name} — ${siteConfig.legalName}`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.legalName}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b2545',
  colorScheme: 'light',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const requestHeaders = await headers();
  const nonce = requestHeaders.get('x-nonce') ?? undefined;
  const pathname = requestHeaders.get('x-pathname') ?? '/';

  // Auth pages and authenticated dashboard areas bring their own chrome
  // (centered card / sidebar shell), so the public marketing header & footer
  // are omitted on those routes.
  const bareLayout = isAuthRoute(pathname) || requiredRoleFor(pathname) !== null;

  return (
    <html lang="en-IN" className={inter.variable}>
      <head>
        {/* Structured data for rich search results. */}
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </head>
      <body>
        <div className="app">
          {!bareLayout && <Header />}
          <main className="app__main" id="main-content">
            {children}
          </main>
          {!bareLayout && <Footer />}
        </div>
      </body>
    </html>
  );
}
