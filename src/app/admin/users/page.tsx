import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminUsers from '@/components/portal/admin/AdminUsers';

export const metadata: Metadata = buildMetadata({
  title: 'Admin Users',
  path: '/admin/users',
  noindex: true,
});

export default function AdminUsersPage() {
  return <AdminUsers />;
}
