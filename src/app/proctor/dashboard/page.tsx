import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import ProctorDashboard from '@/components/portal/dashboards/ProctorDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Proctoring Dashboard',
  path: '/proctor/dashboard',
  noindex: true,
});

export default function ProctorDashboardPage() {
  return <ProctorDashboard />;
}
