import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import TrustBanner from '@/components/home/TrustBanner';
import HomeSections from '@/components/home/HomeSections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  // Home uses the layout's default title; just refine the description + canonical.
  description:
    "Take India's leading financial literacy assessments with NCFE. Register for the " +
    'NFLAT and Financial Literacy Quiz (FLQ), get proctored online or at a centre, and ' +
    'earn a verifiable certificate. Built for candidates and entities across India.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <HomeSections />
    </>
  );
}
