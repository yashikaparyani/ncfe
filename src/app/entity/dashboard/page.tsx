import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import EntityDashboard from '@/components/portal/dashboards/EntityDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Entity Dashboard',
  path: '/entity/dashboard',
  noindex: true,
});

export default function EntityDashboardPage() {
  return <EntityDashboard />;
}
