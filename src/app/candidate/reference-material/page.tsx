import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ReferenceMaterial from '@/components/portal/candidate/ReferenceMaterial';

export const metadata: Metadata = buildMetadata({
  title: 'Reference Material',
  path: '/candidate/reference-material',
  noindex: true,
});

export default function CandidateReferenceMaterialPage() {
  return <ReferenceMaterial />;
}
