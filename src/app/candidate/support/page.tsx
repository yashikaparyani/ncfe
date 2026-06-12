import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateSupport from '@/components/portal/candidate/CandidateSupport';

export const metadata: Metadata = buildMetadata({
  title: 'Support',
  path: '/candidate/support',
  noindex: true,
});

export default function CandidateSupportPage() {
  return <CandidateSupport />;
}
