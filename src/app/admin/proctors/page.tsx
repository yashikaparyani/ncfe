import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import AdminProctors from '@/components/portal/admin/AdminProctors';

export const metadata: Metadata = buildMetadata({
  title: 'Proctors',
  path: '/admin/proctors',
  noindex: true,
});

export default function AdminProctorsPage() {
  return <AdminProctors />;
}
