import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ResultsList from '@/components/portal/candidate/ResultsList';

export const metadata: Metadata = buildMetadata({
  title: 'Results & Certificates',
  path: '/candidate/results',
  noindex: true,
});

export default function CandidateResultsPage() {
  return <ResultsList />;
}
