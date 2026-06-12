import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateCertificates from '@/components/portal/candidate/CandidateCertificates';

export const metadata: Metadata = buildMetadata({
  title: 'My Certificates',
  path: '/candidate/certificates',
  noindex: true,
});

export default function CandidateCertificatesPage() {
  return <CandidateCertificates />;
}
