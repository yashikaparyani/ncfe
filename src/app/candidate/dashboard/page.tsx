import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import CandidateDashboard from '@/components/portal/dashboards/CandidateDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Candidate Dashboard',
  path: '/candidate/dashboard',
  noindex: true,
});

export default function CandidateDashboardPage() {
  return <CandidateDashboard />;
}
