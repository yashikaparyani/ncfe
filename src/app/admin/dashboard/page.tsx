import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminDashboard from '@/components/portal/admin/AdminDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Admin Dashboard',
  path: '/admin/dashboard',
  noindex: true,
});

export default function AdminDashboardPage() {
  return <AdminDashboard />;
}
